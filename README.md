<img src="./logo.png" width="256" alt="Logo">

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> pell is the simplest and smallest WYSIWYG text editor for web, with no dependencies

Live demo: [https://jaredreich.com/pell](https://jaredreich.com/pell)

![Alt text](/demo.gif?raw=true "Demo")

## Comparisons

| library       | size (min+gzip) | size (min) | jquery | bootstrap |
|---------------|-----------------|------------|--------|-----------|
| pell          | 1.64kB          | 4.29kB     |        |           |
| medium-editor | 27kB            | 105kB      |        |           |
| quill         | 43kB            | 205kB      |        |           |
| summernote    | 26kB            | 93kB       | x      | x         |
| froala        | 52kB            | 186kB      | x      |           |
| tinymce       | 157kB           | 491kB      | x      |           |
| ckeditor      | 163kB           | 551kB      | x      |           |

## Features

* Pure JavaScript, no dependencies, written in ES6
* Easily customizable with the sass file (pell.scss) or overwrite the CSS

Current actions:
- Bold
- Italic
- Underline
- Strike-through
- Heading 1
- Heading 2
- Paragraph
- Quote
- Ordered List
- Unordered List
- Code
- Horizontal Rule
- Link
- Image
- Undo
- Redo

Other possible future actions:
- Justify Center
- Justify Full
- Justify Left
- Justify Right
- Subscript
- Superscript
- Font Name
- Font Size
- Indent
- Outdent
- Clear Formatting

## Browser Support

* IE 9+
* Chrome 5+
* Firefox 4+
* Safari 5+
* Opera 11.6+

## Installation

#### npm:

```bash
npm install --save pell
```

#### HTML:

```html
<head>
  ...
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/pell/dist/pell.min.css">
  <style>
    /* override styles here */
    .pell-editor {
      background-color: pink;
    }
  </style>
</head>
<body>
  ...
  <!-- Bottom of body -->
  <script src="https://unpkg.com/pell"></script>
</body>
```

## Usage

```js
// ES6
import pell from 'pell'
// or
import { init } from 'pell'
```

```js
// Browser
pell
// or
window.pell
```

#### Example:

```html
<div id="pell"></div>
<div>
  Text output:
  <div id="text-output"></div>
  HTML output:
  <pre id="html-output"></pre>
</div>
```

```js
pell.init({
  actions: [
    'bold',
    { name: 'italic', icon: '&#9786;', title: 'Zitalic' },
    'underline'
  ],
  classes: {
    actionbar: 'pell-actionbar',
    button: 'pell-button',
    editor: 'pell-editor'
  },
  onChange: html => {
    document.getElementById('text-output').innerHTML = html
    document.getElementById('html-output').textContent = html
  },
  root: 'pell'
})
```

## Custom Styles

#### SCSS:

```scss
$pell-editor-height: 400px;
// See all overwriteable variables in src/pell.scss

// Then import pell.scss into styles:
@import '../../node_modules/pell/src/pell';
```

#### CSS:

```css
/* After pell styles are applied to DOM: */
.pell-editor {
  height: 400px;
}
```

## License

MIT
