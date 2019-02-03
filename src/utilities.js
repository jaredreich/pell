export const addEventListener = (parent, type, listener) => parent.addEventListener(type, listener)

export const appendChild = (parent, child) => parent.appendChild(child)

export const createElement = tag => document.createElement(tag)

export const defaultParagraphSeparatorString = 'defaultParagraphSeparator'

export const exec = (command, value = null) => document.execCommand(command, false, value)

export const formatBlock = 'formatBlock'

export const queryCommandState = command => document.queryCommandState(command)

export const queryCommandValue = command => document.queryCommandValue(command)
