```js
// App.js

import React, { Component } from 'react';
import { init } from 'pell';

import 'pell/dist/pell.css'

class App extends Component {
  editor = null

  constructor (props) {
    super(props)
    this.state = { html: null }
  }

  componentDidMount () {
    this.editor = init({
      element: document.getElementById('editor'),
      onChange: html => this.setState({ html }),
      actions: ['bold', 'underline', 'italic'],
    })
  }

  render() {
    return (
      <div className="App">
        <h3>Editor:</h3>
        <div id="editor" className="pell" />
        <h3>HTML Output:</h3>
        <div id="html-output">{this.state.html}</div>
      </div>
    );
  }
}

export default App;
```
