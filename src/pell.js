const defaultParagraphSeparatorString = 'defaultParagraphSeparator'
const formatBlock = 'formatBlock'

const appendChild = (parent, child) => parent.appendChild(child)
const createElement = tag => document.createElement(tag)
const queryCommandState = command => document.queryCommandState(command)
const queryCommandValue = command => document.queryCommandValue(command)

export const exec = (command, value) => document.execCommand(command, false, value)

const defaultActions = {
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    state: queryCommandState.bind('bold'),
    result: exec.bind(null, 'bold')
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    state: queryCommandState.bind('italic'),
    result: exec.bind(null, 'italic')
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    state: queryCommandState.bind('underline'),
    result: exec.bind(null, 'underline')
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    state: queryCommandState.bind('strikeThrough'),
    result: exec.bind(null, 'strikeThrough')
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    result: exec.bind(null, formatBlock, '<h1>')
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    result: exec.bind(null, formatBlock, '<h2>')
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    result: exec.bind(null, formatBlock, '<p>')
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    result: exec.bind(null, formatBlock, '<blockquote>')
  },
  olist: {
    icon: '&#35;',
    title: 'Ordered List',
    result: exec.bind(null, 'insertOrderedList')
  },
  ulist: {
    icon: '&#8226;',
    title: 'Unordered List',
    result: exec.bind(null, 'insertUnorderedList')
  },
  code: {
    icon: '&lt;/&gt;',
    title: 'Code',
    result: exec.bind(null, formatBlock, '<pre>')
  },
  line: {
    icon: '&#8213;',
    title: 'Horizontal Line',
    result: exec.bind(null, 'insertHorizontalRule')
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    result: () => {
      const url = prompt('Enter the link URL')
      if (url) exec('createLink', url)
    }
  },
  image: {
    icon: '&#128247;',
    title: 'Image',
    result: () => {
      const url = prompt('Enter the image URL')
      if (url) exec('insertImage', url)
    }
  }
}

const defaultClasses = {
  actionbar: 'pell-actionbar',
  button: 'pell-button',
  content: 'pell-content',
  selected: 'pell-button-selected'
}

export const init = settings => {
  const actions = settings.actions
    ? (
      settings.actions.map(action => {
        if (typeof action === 'string') return defaultActions[action]
        if (defaultActions[action.name]) return { ...defaultActions[action.name], ...action }
        return action
      })
    )
    : Object.keys(defaultActions).map(action => defaultActions[action])

  const classes = { ...defaultClasses, ...settings.classes }

  const defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || 'div'

  const actionbar = createElement('div')
  actionbar.className = classes.actionbar
  settings.element.appendChild(actionbar)

  const content = settings.element.content = createElement('div')
  content.contentEditable = true
  content.className = classes.content
  content.oninput = ({ target: { firstChild } }) => {
    if (firstChild && firstChild.nodeType === 3) exec(formatBlock, `<${defaultParagraphSeparator}>`)
    else if (content.innerHTML === '<br>') content.innerHTML = ''
    settings.onChange(content.innerHTML)
  }
  content.onkeydown = event => {
    if (event.key === 'Tab') {
      event.preventDefault()
    } else if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
      setTimeout(() => exec(formatBlock, `<${defaultParagraphSeparator}>`), 0)
    }
  }
  settings.element.appendChild(content)

  actions.forEach(action => {
    const button = createElement('button')
    button.className = classes.button
    button.innerHTML = action.icon
    button.title = action.title
    button.onclick = () => action.result() && content.focus()

    if (action.state) {
      const handler = () => button.classList[action.state() ? 'add' : 'remove'](classes.selected)
      ['keyup', 'mouseup', 'click'].map(e => content.addEventListener(e, handler))
    }

    actionbar.appendChild(button)
  })

  if (settings.styleWithCSS) exec('styleWithCSS')
  exec(defaultParagraphSeparatorString, defaultParagraphSeparator)

  return settings.element
}

export default { exec, init }
