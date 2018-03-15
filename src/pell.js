let actions = {
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    state: () => queryCommandState('bold'),
    result: () => exec('bold')
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    state: () => queryCommandState('italic'),
    result: () => exec('italic')
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    state: () => queryCommandState('underline'),
    result: () => exec('underline')
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    state: () => queryCommandState('strikeThrough'),
    result: () => exec('strikeThrough')
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    result: () => exec(formatBlock, '<h1>')
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    result: () => exec(formatBlock, '<h2>')
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    result: () => exec(formatBlock, '<p>')
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    result: () => exec(formatBlock, '<blockquote>')
  },
  olist: {
    icon: '&#35;',
    title: 'Ordered List',
    result: () => exec('insertOrderedList')
  },
  ulist: {
    icon: '&#8226;',
    title: 'Unordered List',
    result: () => exec('insertUnorderedList')
  },
  code: {
    icon: '&lt;/&gt;',
    title: 'Code',
    result: () => exec(formatBlock, '<pre>')
  },
  line: {
    icon: '&#8213;',
    title: 'Horizontal Line',
    result: () => exec('insertHorizontalRule')
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    result: () => {
      const url = window.prompt('Enter the link URL')
      if (url) exec('createLink', url)
    }
  },
  image: {
    icon: '&#128247;',
    title: 'Image',
    result: () => {
      const url = window.prompt('Enter the image URL')
      if (url) exec('insertImage', url)
    }
  }
}

let classes = {
  actionbar: 'pell-actionbar',
  button: 'pell-button',
  content: 'pell-content',
  selected: 'pell-button-selected'
}

let element = null
let defaultParagraphSeparator = null

const formatBlock = 'formatBlock'
const addEventListener = (parent, type, listener) => parent.addEventListener(type, listener)
const appendChild = (parent, child) => parent.appendChild(child)
const createElement = tag => document.createElement(tag)
const queryCommandState = command => document.queryCommandState(command)
const queryCommandValue = command => document.queryCommandValue(command)

const handleKeyDown = (event, settings) => {
  if (event.key === 'Tab') {
    event.preventDefault()
  } else if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
    setTimeout(() => exec(formatBlock, `<${defaultParagraphSeparator}>`), 0)
  }
}

export const exec = (command, value = null) => document.execCommand(command, false, value)

export const init = settings => {
  element = settings.element
  defaultParagraphSeparator = settings.defaultParagraphSeparator || 'div'

  actions = settings.actions
    ? settings.actions.map(action => {
      if (typeof action === 'string') return actions[action]
      else if (actions[action.name]) return { ...actions[action.name], ...action }
      return action
    })
    : Object.keys(actions).map(action => actions[action])

  classes = { ...classes, ...settings.classes }

  const actionbar = createElement('div')
  actionbar.className = classes.actionbar
  appendChild(element, actionbar)

  const content = element.content = createElement('div')
  content.contentEditable = true
  content.className = classes.content
  content.oninput = ({ target: { firstChild } }) => {
    if (firstChild && firstChild.nodeType === 3) exec(formatBlock, `<${defaultParagraphSeparator}>`)
    else if (content.innerHTML === '<br>') content.innerHTML = ''
    settings.onChange(content.innerHTML)
  }
  content.onkeydown = event => handleKeyDown(event, settings)
  appendChild(element, content)

  actions.forEach(action => {
    const button = createElement('button')
    button.className = classes.button
    button.innerHTML = action.icon
    button.title = action.title
    button.setAttribute('type', 'button')
    button.onclick = () => {
      const selection = window.getSelection().toString()
      action.result(selection)
      content.focus()
    }

    if (action.state) {
      const handler = () => button.classList[action.state() ? 'add' : 'remove'](classes.selected)
      addEventListener(content, 'keyup', handler)
      addEventListener(content, 'mouseup', handler)
      addEventListener(button, 'click', handler)
    }

    appendChild(actionbar, button)
  })

  if (defaultParagraphSeparator) exec('defaultParagraphSeparator', defaultParagraphSeparator)
  if (settings.styleWithCSS) exec('styleWithCSS')

  return element
}

export default { exec, init }
