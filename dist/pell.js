(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.pell = {})));
}(this, (function (exports) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultSettings = {
  classes: {
    actionbar: 'pell-actionbar',
    button: 'pell-button',
    editor: 'pell-editor'
  }
};

var execute = function execute(command) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  document.execCommand(command, false, value);
};

var ensureHTTP = function ensureHTTP(str) {
  return (/^https?:\/\//.test(str) && str || 'http://' + str
  );
};

var link = function link() {
  var url = window.prompt('Enter the link URL');
  if (url) execute('createLink', ensureHTTP(url));
};

var image = function image() {
  var url = window.prompt('Enter the image URL');
  if (url) execute('insertImage', ensureHTTP(url));
};

var actions = {
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    result: function result() {
      return execute('bold');
    }
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    result: function result() {
      return execute('italic');
    }
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    result: function result() {
      return execute('underline');
    }
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    result: function result() {
      return execute('strikeThrough');
    }
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    result: function result() {
      return execute('formatBlock', '<H1>');
    }
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    result: function result() {
      return execute('formatBlock', '<H2>');
    }
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    result: function result() {
      return execute('formatBlock', '<P>');
    }
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    result: function result() {
      return execute('formatBlock', '<BLOCKQUOTE>');
    }
  },
  olist: {
    icon: '&#35;',
    title: 'Ordered List',
    result: function result() {
      return execute('insertOrderedList');
    }
  },
  ulist: {
    icon: '&#8226;',
    title: 'Unordered List',
    result: function result() {
      return execute('insertUnorderedList');
    }
  },
  code: {
    icon: '&lt;/&gt;',
    title: 'Code',
    result: function result() {
      return execute('formatBlock', '<PRE>');
    }
  },
  line: {
    icon: '&#8213;',
    title: 'Horizontal Line',
    result: function result() {
      return execute('insertHorizontalRule', '<PRE>');
    }
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    result: link
  },
  image: {
    icon: '&#128247;',
    title: 'Image',
    result: image
  },
  undo: {
    icon: '&#8634;',
    title: 'Undo',
    result: function result() {
      return execute('undo');
    }
  },
  redo: {
    icon: '&#8635;',
    title: 'Redo',
    result: function result() {
      return execute('redo');
    }
  }
};

var init = function init(settings) {
  settings.actions = settings.actions ? settings.actions.map(function (action) {
    if (typeof action === 'string') return actions[action];
    return _extends({}, actions[action.name], action);
  }) : Object.keys(actions).map(function (action) {
    return actions[action];
  });

  settings.classes = _extends({}, defaultSettings.classes, settings.classes);

  var root = document.getElementById(settings.root);

  var actionbar = document.createElement('div');
  actionbar.className = settings.classes.actionbar;
  root.appendChild(actionbar);

  var editor = document.createElement('div');
  editor.contentEditable = true;
  editor.className = settings.classes.editor;
  editor.oninput = function (event) {
    return settings.onChange && settings.onChange(event.target.innerHTML);
  };
  root.appendChild(editor);

  settings.actions.forEach(function (action) {
    var button = document.createElement('button');
    button.className = settings.classes.button;
    button.innerHTML = action.icon;
    button.title = action.title;
    button.onclick = action.result;
    actionbar.appendChild(button);
  });
};

var pell = { init: init };

exports.init = init;
exports['default'] = pell;

Object.defineProperty(exports, '__esModule', { value: true });

})));
