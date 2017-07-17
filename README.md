<img src="./logo.png" width="256" alt="Logo">

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> pell is the simplest and smallest WYSIWYG text editor for web, with no dependencies

Live demo: [https://jaredreich.com/pell](https://jaredreich.com/pell)

[![Live demo](/demo.gif?raw=true "Demo")](https://jaredreich.com/pell)

## Comparisons

| library       | size (min+gzip) | size (min) | jquery | bootstrap |
|---------------|-----------------|------------|--------|-----------|
| pell          | 1.11kB          | 2.85kB     |        |           |
| medium-editor | 27kB            | 105kB      |        |           |
| quill         | 43kB            | 205kB      |        |           |
| ckeditor      | 163kB           | 551kB      |        |           |
| summernote    | 26kB            | 93kB       | x      | x         |
| froala        | 52kB            | 186kB      | x      |           |
| tinymce       | 157kB           | 491kB      | x      |           |

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
- Undo
- Redo

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
    .pell-content {
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

#### API

```js
// ES6
import pell from 'pell'
// or
import { exec, init } from 'pell'
```

```js
// Browser
pell
// or
window.pell
```

```js
// Initialize pell on an HTMLElement
pell.init({
  // <HTMLElement>, required
  element: document.getElementById('some-id'),

  // <Function>, required
  // Use the output html, triggered by element's `oninput` event
  onChange: html => console.log(html),

  // <boolean>, optional, default = false
  // Outputs <span style="font-weight: bold;"></span> instead of <b></b>
  styleWithCSS: false,

  // <Array[string | Object]>, string if overwriting, object if customizing/creating
  // action.name<string> (only required if overwriting)
  // action.icon<string> (optional if overwriting, required if custom action)
  // action.title<string> (optional)
  // action.result<Function> (required)
  // Specify the actions you specifically want (in order)
  actions: [
    'bold',
    {
      name: 'custom',
      icon: 'C',
      title: 'Custom Action',
      result: () => console.log('YOLO')
    },
    'underline'
  ],

  // classes<Array[string]> (optional)
  // Choose your custom class names
  classes: {
    actionbar: 'pell-actionbar',
    button: 'pell-button',
    content: 'pell-content'
  }
})

// Execute a document command, see reference:
// https://developer.mozilla.org/en/docs/Web/API/Document/execCommand
// this is just `document.execCommand(command, false, value)`
pell.exec(command<string>, value<string>)
```

#### List of overwriteable action names
- bold
- italic
- underline
- strikethrough
- heading1
- heading2
- paragraph
- quote
- olist
- ulist
- code
- line
- link
- image

#### Example

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
const editor = pell.init({
  element: document.getElementById('pell'),
  onChange: html => {
    document.getElementById('text-output').innerHTML = html
    document.getElementById('html-output').textContent = html
  },
  styleWithCSS: true,
  actions: [
    'bold',
    'underline',
    {
      name: 'italic',
      result: () => window.pell.exec('italic')
    },
    {
      name: 'custom',
      icon: '<b><u><i>C</i></u></b>',
      title: 'Custom Action',
      result: () => console.log('YOLO')
    },
    {
      name: 'image',
      result: () => {
        const url = window.prompt('Enter the image URL')
        if (url) window.pell.exec('insertImage', ensureHTTP(url))
      }
    },
    {
      name: 'link',
      result: () => {
        const url = window.prompt('Enter the link URL')
        if (url) window.pell.exec('createLink', ensureHTTP(url))
      }
    }
  ],
  classes: {
    actionbar: 'pell-actionbar-custom-name',
    button: 'pell-button-custom-name',
    content: 'pell-content-custom-name'
  }
})

// editor.content<HTMLElement>
// To change the editor's content:
editor.content.innerHTML = '<b><u><i>Initial content!</i></u></b>'
```

## Custom Styles

#### SCSS

```scss
$pell-content-height: 400px;
// See all overwriteable variables in src/pell.scss

// Then import pell.scss into styles:
@import '../../node_modules/pell/src/pell';
```

#### CSS

```css
/* After pell styles are applied to DOM: */
.pell-content {
  height: 400px;
}
```

## License

MIT
