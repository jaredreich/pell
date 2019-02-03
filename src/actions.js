import {
  exec,
  formatBlock,
  queryCommandState,
} from './utilities'

export const bold = {
  icon: '<b>B</b>',
  result: () => exec('bold'),
  state: () => queryCommandState('bold'),
  title: 'Bold',
}

export const code = {
  icon: '&lt;/&gt;',
  result: () => exec(formatBlock, '<pre>'),
  title: 'Code',
}

export const heading1 = {
  icon: '<b>H<sub>1</sub></b>',
  result: () => exec(formatBlock, '<h1>'),
  title: 'Heading 1',
}

export const heading2 = {
  icon: '<b>H<sub>2</sub></b>',
  result: () => exec(formatBlock, '<h2>'),
  title: 'Heading 2',
}

export const image = {
  icon: '&#128247;',
  result: () => {
    const url = window.prompt('Enter the image URL')
    if (url) exec('insertImage', url)
  },
  title: 'Image',
}

export const italic = {
  icon: '<i>I</i>',
  result: () => exec('italic'),
  state: () => queryCommandState('italic'),
  title: 'Italic',
}

export const line = {
  icon: '&#8213;',
  result: () => exec('insertHorizontalRule'),
  title: 'Horizontal Line',
}

export const link = {
  icon: '&#128279;',
  result: () => {
    const url = window.prompt('Enter the link URL')
    if (url) exec('createLink', url)
  },
  title: 'Link',
}

export const olist = {
  icon: '&#35;',
  result: () => exec('insertOrderedList'),
  title: 'Ordered List',
}

export const paragraph = {
  icon: '&#182;',
  result: () => exec(formatBlock, '<p>'),
  title: 'Paragraph',
}

export const quote = {
  icon: '&#8220; &#8221;',
  result: () => exec(formatBlock, '<blockquote>'),
  title: 'Quote',
}

export const strikethrough = {
  icon: '<strike>S</strike>',
  result: () => exec('strikeThrough'),
  state: () => queryCommandState('strikeThrough'),
  title: 'Strike-through',
}

export const ulist = {
  icon: '&#8226;',
  result: () => exec('insertUnorderedList'),
  title: 'Unordered List',
}

export const underline = {
  icon: '<u>U</u>',
  result: () => exec('underline'),
  state: () => queryCommandState('underline'),
  title: 'Underline',
}

export const defaultActions = {
  bold,
  code,
  heading1,
  heading2,
  image,
  italic,
  line,
  link,
  olist,
  paragraph,
  quote,
  strikethrough,
  ulist,
  underline,
}
