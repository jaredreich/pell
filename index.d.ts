// Type definitions for pell v.1.03
// Project: https://github.com/jaredreich/pell
// Definitions by: Cameron Jensen <https://github.com/skwai/>

export function exec(command: string, value?: string | null): boolean
export function init(settings: Settings): HTMLElement

export interface Action {
  name: string
  icon?: string
  title?: string
  result: () => void
}

export interface Settings {
  // The element to render to
  element: HTMLElement

  // Use the output html, triggered by element's `oninput` event
  onChange: (html: string) => void

  // Instructs the editor which element to inject via the return key
  defaultParagraphSeparator?: string

  // Outputs <span style="font-weight: bold;"></span> instead of <b></b>
  styleWithCSS?: boolean

  // Specify the actions you specifically want (in order)
  actions?: Array<Action | string>

  // Choose your custom class names
  classes?: {
    [key: 'actionbar' | 'button' | 'content' | 'selected']: string
  }
}
