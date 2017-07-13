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

var keyCodes = {
  TAB: {
    code: 9,
    symbol: 'Tab'
  },
  CTRL: {
    code: 17,
    symbol: 'Ctrl'
  },
  SHIFT: {
    code: 16,
    symbol: 'Shift'
  },
  ALT: {
    code: 18,
    symbol: 'Alt'
  },
  ONE: {
    code: 49,
    symbol: '1'
  },
  TWO: {
    code: 50,
    symbol: '2'
  },
  SEVEN: {
    code: 55,
    symbol: '7'
  },
  B: {
    code: 66,
    symbol: 'B'
  },
  I: {
    code: 73,
    symbol: 'I'
  },
  K: {
    code: 75,
    symbol: 'K'
  },
  O: {
    code: 79,
    symbol: 'O'
  },
  P: {
    code: 80,
    symbol: 'P'
  },
  Q: {
    code: 81,
    symbol: 'Q'
  },
  S: {
    code: 83,
    symbol: 'S'
  },
  U: {
    code: 85,
    symbol: 'U'
  },
  Z: {
    code: 90,
    symbol: 'Z'
  },
  QUOTE: {
    code: 222,
    symbol: '\''
  }
};

var listener = {
  keys: {},
  add: function add(array, func, className) {
    var hey = this;
    var counter = this.stingify(array);
    this.keys[counter] = func;
    var collect = [];
    document.getElementsByClassName(className)[0].addEventListener('keydown', function (e) {
      if (e.keyCode === array[collect.length]) {
        collect[collect.length] = e.keyCode;
      } else {
        collect = [];
      }
      if (collect.length === array.length) {
        collect = [];
        hey.keys[counter]();
        e.preventDefault();
      }
    }, false);
  },
  stingify: function stingify(array) {
    var counter = '';
    for (var x in array) {
      if (x === 0) {
        counter += array[x];
      } else {
        counter += '+' + array[x];
      }
    }
    return counter;
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
    shortcut: [keyCodes.CTRL, keyCodes.B],
    result: function result() {
      return execute('bold');
    }
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    shortcut: [keyCodes.CTRL, keyCodes.I],
    result: function result() {
      return execute('italic');
    }
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    shortcut: [keyCodes.CTRL, keyCodes.U],
    result: function result() {
      return execute('underline');
    }
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    shortcut: [keyCodes.CTRL, keyCodes.S],
    result: function result() {
      return execute('strikeThrough');
    }
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    shortcut: [keyCodes.CTRL, keyCodes.ONE],
    result: function result() {
      return execute('formatBlock', '<H1>');
    }
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    shortcut: [keyCodes.CTRL, keyCodes.TWO],
    result: function result() {
      return execute('formatBlock', '<H2>');
    }
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    shortcut: [keyCodes.CTRL, keyCodes.SEVEN],
    result: function result() {
      return execute('formatBlock', '<P>');
    }
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    shortcut: [keyCodes.CTRL, keyCodes.QUOTE],
    result: function result() {
      return execute('formatBlock', '<BLOCKQUOTE>');
    }
  },
  olist: {
    icon: '&#35;',
    title: 'Ordered List',
    shortcut: [keyCodes.CTRL, keyCodes.ALT, keyCodes.O],
    result: function result() {
      return execute('insertOrderedList');
    }
  },
  ulist: {
    icon: '&#8226;',
    title: 'Unordered List',
    shortcut: [keyCodes.CTRL, keyCodes.ALT, keyCodes.U],
    result: function result() {
      return execute('insertUnorderedList');
    }
  },
  code: {
    icon: '&lt;/&gt;',
    title: 'Code',
    shortcut: [keyCodes.CTRL, keyCodes.Q],
    result: function result() {
      return execute('formatBlock', '<PRE>');
    }
  },
  line: {
    icon: '&#8213;',
    title: 'Horizontal Line',
    shortcut: [keyCodes.CTRL, keyCodes.SHIFT, keyCodes.B],
    result: function result() {
      return execute('insertHorizontalRule', '<PRE>');
    }
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    shortcut: [keyCodes.CTRL, keyCodes.K],
    result: link
  },
  image: {
    icon: '&#128247;',
    title: 'Image',
    shortcut: [keyCodes.CTRL, keyCodes.P],
    result: image
  },
  undo: {
    icon: '&#8634;',
    title: 'Undo',
    shortcut: [keyCodes.CTRL, keyCodes.Z],
    result: function result() {
      return execute('undo');
    }
  },
  redo: {
    icon: '&#8635;',
    title: 'Redo',
    shortcut: [keyCodes.CTRL, keyCodes.SHIFT, keyCodes.B],
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
    var helpText = action.shortcut.map(function (s) {
      return s.symbol;
    }).join(' + ');
    button.title = action.title + ' (' + helpText + ')';
    button.onclick = action.result;
    actionbar.appendChild(button);
    var codes = action.shortcut.map(function (s) {
      return s.code;
    });
    listener.add(codes, action.result, settings.classes.editor);
  });
  listener.add([keyCodes.TAB.code], function () {
    execute('insertHTML', '\xA0\xA0\xA0\xA0');
  }, settings.classes.editor);
};

var pell = { init: init };

exports.init = init;
exports['default'] = pell;

Object.defineProperty(exports, '__esModule', { value: true });

})));
