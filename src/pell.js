const defaultSettings = {
  classes: {
    actionbar: 'pell-actionbar',
    button: 'pell-button',
    editor: 'pell-editor'
  }
}

const keyCodes = {
  TAB: {
    code: 9,
    symbol: 'Tab'
  },
  CTRL: {
    code: 17,
    symbol: 'Ctrl'
  },
  SHIFT: {
    code: 16,
    symbol: 'Shift'
  },
  ALT: {
    code: 18,
    symbol: 'Alt'
  },
  ONE: {
    code: 49,
    symbol: '1'
  },
  TWO: {
    code: 50,
    symbol: '2'
  },
  SEVEN: {
    code: 55,
    symbol: '7'
  },
  B: {
    code: 66,
    symbol: 'B'
  },
  I: {
    code: 73,
    symbol: 'I'
  },
  K: {
    code: 75,
    symbol: 'K'
  },
  O: {
    code: 79,
    symbol: 'O'
  },
  P: {
    code: 80,
    symbol: 'P'
  },
  Q: {
    code: 81,
    symbol: 'Q'
  },
  S: {
    code: 83,
    symbol: 'S'
  },
  U: {
    code: 85,
    symbol: 'U'
  },
  Z: {
    code: 90,
    symbol: 'Z'
  },
  QUOTE: {
    code: 222,
    symbol: '\''
  }
}

const listener = {
  keys: {},
  add (array, func, className) {
    const hey = this
    const counter = this.stingify(array)
    this.keys[counter] = func
    let collect = []
    document.getElementsByClassName(className)[0].addEventListener('keydown', e => {
      if (e.keyCode === array[collect.length]) {
        collect[collect.length] = e.keyCode
      } else {
        collect = []
      }
      if (collect.length === array.length) {
        collect = []
        hey.keys[counter]()
        e.preventDefault()
      }
    }, false)
  },
  stingify (array) {
    let counter = ''
    for (const x in array) {
      if (x === 0) {
        counter += array[x]
      } else {
        counter += `+${array[x]}`
      }
    }
    return counter
  }
}

const execute = (command, value = null) => {
  document.execCommand(command, false, value)
}

const ensureHTTP = str => /^https?:\/\//.test(str) && str || `http://${str}`

const link = () => {
  const url = window.prompt('Enter the link URL')
  if (url) execute('createLink', ensureHTTP(url))
}

const image = () => {
  const url = window.prompt('Enter the image URL')
  if (url) execute('insertImage', ensureHTTP(url))
}

const actions = {
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    shortcut: [keyCodes.CTRL, keyCodes.B],
    result: () => execute('bold')
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    shortcut: [keyCodes.CTRL, keyCodes.I],
    result: () => execute('italic')
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    shortcut: [keyCodes.CTRL, keyCodes.U],
    result: () => execute('underline')
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    shortcut: [keyCodes.CTRL, keyCodes.S],
    result: () => execute('strikeThrough')
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    shortcut: [keyCodes.CTRL, keyCodes.ONE],
    result: () => execute('formatBlock', '<H1>')
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    shortcut: [keyCodes.CTRL, keyCodes.TWO],
    result: () => execute('formatBlock', '<H2>')
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    shortcut: [keyCodes.CTRL, keyCodes.SEVEN],
    result: () => execute('formatBlock', '<P>')
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    shortcut: [keyCodes.CTRL, keyCodes.QUOTE],
    result: () => execute('formatBlock', '<BLOCKQUOTE>')
  },
  olist: {
    icon: '&#35;',
    title: 'Ordered List',
    shortcut: [keyCodes.CTRL, keyCodes.ALT, keyCodes.O],
    result: () => execute('insertOrderedList')
  },
  ulist: {
    icon: '&#8226;',
    title: 'Unordered List',
    shortcut: [keyCodes.CTRL, keyCodes.ALT, keyCodes.U],
    result: () => execute('insertUnorderedList')
  },
  code: {
    icon: '&lt;/&gt;',
    title: 'Code',
    shortcut: [keyCodes.CTRL, keyCodes.Q],
    result: () => execute('formatBlock', '<PRE>')
  },
  line: {
    icon: '&#8213;',
    title: 'Horizontal Line',
    shortcut: [keyCodes.CTRL, keyCodes.SHIFT, keyCodes.B],
    result: () => execute('insertHorizontalRule', '<PRE>')
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    shortcut: [keyCodes.CTRL, keyCodes.K],
    result: link
  },
  image: {
    icon: '&#128247;',
    title: 'Image',
    shortcut: [keyCodes.CTRL, keyCodes.P],
    result: image
  },
  undo: {
    icon: '&#8634;',
    title: 'Undo',
    shortcut: [keyCodes.CTRL, keyCodes.Z],
    result: () => execute('undo')
  },
  redo: {
    icon: '&#8635;',
    title: 'Redo',
    shortcut: [keyCodes.CTRL, keyCodes.SHIFT, keyCodes.B],
    result: () => execute('redo')
  }
}

export const init = settings => {
  settings.actions = settings.actions
    ? settings.actions.map(action => {
      if (typeof action === 'string') return actions[action]
      return { ...actions[action.name], ...action }
    })
    : Object.keys(actions).map(action => actions[action])

  settings.classes = { ...defaultSettings.classes, ...settings.classes }

  const root = document.getElementById(settings.root)

  const actionbar = document.createElement('div')
  actionbar.className = settings.classes.actionbar
  root.appendChild(actionbar)

  const editor = document.createElement('div')
  editor.contentEditable = true
  editor.className = settings.classes.editor
  editor.oninput = event => settings.onChange && settings.onChange(event.target.innerHTML)
  root.appendChild(editor)

  settings.actions.forEach(action => {
    const button = document.createElement('button')
    button.className = settings.classes.button
    button.innerHTML = action.icon
    const helpText = action.shortcut.map(s => s.symbol).join(' + ')
    button.title = `${action.title} (${helpText})`
    button.onclick = action.result
    actionbar.appendChild(button)
    const codes = action.shortcut.map(s => s.code)
    listener.add(codes, action.result, settings.classes.editor)
  })
  listener.add([keyCodes.TAB.code], () => {
    execute('insertHTML', '\u00a0\u00a0\u00a0\u00a0')
  }, settings.classes.editor)
}

export default { init }
