// Type definitions for pell v.1.03
// Project: https://github.com/jaredreich/pell
// Definitions by: Cameron Jensen <https://github.com/skwai/>

export function exec(command: string, value?: string | null): boolean
export function init(settings: Settings): HTMLElement

export interface Action {
  icon: string
  title: string
  state: () => void
  result: () => void
}

export interface ActionTree {
  [key: string]: Action
}

export interface Settings {
  element: HTMLElement
  defaultParagraphSeperator?: string
  actions?: ActionTree
}
