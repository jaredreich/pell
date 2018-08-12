import { JSDOM } from 'jsdom'
import * as pell from './pell'

describe('pell', () => {

  let window = null

  beforeEach(() => {
    window = (new JSDOM('<!doctype html><html><body></body></html>')).window
    global.document = window.document
    document.commands = []
    document.execCommand = (cmd, defaultUI, value) => {
      document.commands.push({ cmd, defaultUI, value })
    }
  })

  it('should init', () => {
    const root = document.createElement('div')
    const editor = pell.init({ element: root })
    expect(root.contains(editor)).toEqual(true)
    const actionBar = editor.querySelector('.pell-actionbar')
    expect(actionBar).not.toBeNull()
    expect(editor.querySelector('.pell-content')).not.toBeNull()
    expect([].slice.call(actionBar.childNodes).map(b => b.innerHTML))
      .toMatchObject([
        "<b>B</b>",
        "<i>I</i>",
        "<u>U</u>",
        "<strike>S</strike>",
        "<b>H<sub>1</sub></b>",
        "<b>H<sub>2</sub></b>",
        "¶",
        "“ ”",
        "#",
        "•",
        "&lt;/&gt;",
        "―",
        "🔗",
        "📷",
      ])
    expect(document.commands).toMatchObject([
      { cmd: 'defaultParagraphSeparator', defaultUI: false, value: 'div' }
    ])
  })

  //TODO continue testing

})
