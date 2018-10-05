export const exec = (command, value = null) => document.execCommand(command, false, value)

const defaultActions = {
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    state: () => document.queryCommandState('bold'),
    result: () => exec('bold')
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    state: () => document.queryCommandState('italic'),
    result: () => exec('italic')
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    state: () => document.queryCommandState('underline'),
    result: () => exec('underline')
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    state: () => document.queryCommandState('strikeThrough'),
    result: () => exec('strikeThrough')
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    result: () => exec('formatBlock', '<h1>')
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    result: () => exec('formatBlock', '<h2>')
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    result: () => exec('formatBlock', '<p>')
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    result: () => exec('formatBlock', '<blockquote>')
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
    result: () => exec('formatBlock', '<pre>')
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

const defaultClasses = {
  actionbar: 'pell-actionbar',
  button: 'pell-button',
  content: 'pell-content',
  selected: 'pell-button-selected'
}

export const init = settings => {
  const settingsActions = settings.actions || Object.keys(defaultActions);
  const actions = settingsActions.map(action => {
    if (action + '' === action) return defaultActions[action]
    else if (defaultActions[action.name]) return { ...defaultActions[action.name] }
    return action
  })

  const classes = { ...defaultClasses, ...settings.classes }

  const defaultParagraphSeparator = settings.defaultParagraphSeparator || 'div'

  const content = settings.element.content = document.createElement('div')
  content.contentEditable = true
  content.className = classes.content

  const actionbar = document.createElement('div')
  actionbar.className = classes.actionbar

  const inputHandler = ({ target: { firstChild } }) => {
    if (firstChild && firstChild.nodeType === 3) exec('formatBlock', `<${defaultParagraphSeparator}>`)
    else if (content.innerHTML === '<br>') content.innerHTML = ''
    settings.onChange(content.innerHTML)
  }
  const keydownHandler = event => {
    if (event.key === 'Tab') {
      event.preventDefault()
    } else if (event.key === 'Enter' && document.queryCommandValue('formatBlock') === 'blockquote') {
      setTimeout(() => exec('formatBlock', `<${defaultParagraphSeparator}>`), 0)
    }
  }
  const stateHandler = () => {
    actions.forEach(action => { 
      const button = action.state && actionbar.querySelector(`[title="${action.title}"]`);
      button && button.classList[action.state() ? 'add' : 'remove'](classes.selected)
    })
  }

  const actionHandler = event => {
    const action = actions.find(action => event.target.title === action.title)
    action && action.result.call(content) && content.focus()
    stateHandler();
  };

  content.addEventListener('input', inputHandler)
  content.addEventListener('keydown', keydownHandler)
  content.addEventListener('keyup', stateHandler)
  actionbar.addEventListener('click', actionHandler)

  settings.element.appendChild(actionbar)
  settings.element.appendChild(content)

  actions.forEach(action => {
    const button = document.createElement('button')
    button.className = classes.button
    button.innerHTML = action.icon
    button.title = action.title
    button.setAttribute('type', 'button')
    actionbar.appendChild(button)
  })

  if (settings.styleWithCSS) exec('styleWithCSS')
  exec('defaultParagraphSeparator', defaultParagraphSeparator)

  settings.element.destroy = () => {
    content.removeEventListener('input', inputHandler)
    content.removeEventListener('keydown', keydownHandler)
    content.removeEventListener('keyup', stateHandler)
    actionbar.removeEventListener('click', actionHandler)
    settings.element.removeChild(content)
    settings.element.removeChild(actionbar)
  }

  return settings.element
}

export default { exec, init }
