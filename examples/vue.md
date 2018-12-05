```vue
<template>
  <div>
    <h6>Editor:</h6>
    <div id="pell" class="pell" />
    <h6>HTML Output:</h6>
    <pre id="pell-html-output"></pre>
  </div>
</template>

<script>
import pell from 'pell'

export default {
  methods: {
    ensureHTTP: str => /^https?:\/\//.test(str) && str || `http://${str}`
  },
  mounted () {
    pell.init({
      element: document.getElementById('pell'),
      onChange: html => {
        window.document.getElementById('pell-html-output').textContent = html
      },
      actions: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'heading1',
        'heading2',
        'paragraph',
        'quote',
        'olist',
        'ulist',
        'code',
        'line',
        {
          name: 'image',
          result: () => {
            const url = window.prompt('Enter the image URL')
            if (url) pell.exec('insertImage', this.ensureHTTP(url))
          }
        },
        {
          name: 'link',
          result: () => {
            const url = window.prompt('Enter the link URL')
            if (url) pell.exec('createLink', this.ensureHTTP(url))
          }
        }
      ]
    })
  }
}
</script>

<style>
.pell {
  border: 2px solid #000;
  border-radius: 0;
  box-shadow: none;
}

#pell-html-output {
  margin: 0;
  white-space: pre-wrap;
}
</style>
```
