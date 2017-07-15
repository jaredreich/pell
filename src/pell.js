const actions = {
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    result: () => exec('bold')
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    result: () => exec('italic')
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    result: () => exec('underline')
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    result: () => exec('strikeThrough')
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    result: () => exec('formatBlock', '<H1>')
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    result: () => exec('formatBlock', '<H2>')
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    result: () => exec('formatBlock', '<P>')
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    result: () => exec('formatBlock', '<BLOCKQUOTE>')
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
    result: () => exec('formatBlock', '<PRE>')
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

const classes = {
  actionbar: 'pell-actionbar',
  button: 'pell-button',
  content: 'pell-content'
}

export const exec = (command, value = null) => {
  document.execCommand(command, false, value)
}

const preventTab = event => {
  if (event.which === 9) event.preventDefault()
}

export const init = settings => {
  settings.actions = settings.actions
    ? settings.actions.map(action => {
      if (typeof action === 'string') return actions[action]
      else if (actions[action.name]) return { ...actions[action.name], ...action }
      return action
    })
    : Object.keys(actions).map(action => actions[action])

  settings.classes = { ...classes, ...settings.classes }

  const actionbar = document.createElement('div')
  actionbar.className = settings.classes.actionbar
  settings.element.appendChild(actionbar)

  settings.element.content = document.createElement('div')
  settings.element.content.contentEditable = true
  settings.element.content.className = settings.classes.content
  settings.element.content.oninput = event => settings.onChange(event.target.innerHTML)
  settings.element.content.onkeydown = preventTab
  settings.element.appendChild(settings.element.content)

  settings.actions.forEach(action => {
    const button = document.createElement('button')
    button.className = settings.classes.button
    button.innerHTML = action.icon
    button.title = action.title
    button.onclick = action.result
    actionbar.appendChild(button)
  })

  if (settings.styleWithCSS) exec('styleWithCSS')

  return settings.element
}

export default { exec, init }
