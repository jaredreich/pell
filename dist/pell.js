(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.pell = {})));
}(this, (function (exports) { 'use strict';

function _AwaitValue(value) {
  this.wrapped = value;
}

function _AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume("next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen.return !== "function") {
    this.return = undefined;
  }
}

if (typeof Symbol === "function" && Symbol.asyncIterator) {
  _AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
    return this;
  };
}

_AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

_AsyncGenerator.prototype.throw = function (arg) {
  return this._invoke("throw", arg);
};

_AsyncGenerator.prototype.return = function (arg) {
  return this._invoke("return", arg);
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var addEventListener = function addEventListener(parent, type, listener) {
  return parent.addEventListener(type, listener);
};
var appendChild = function appendChild(parent, child) {
  return parent.appendChild(child);
};
var createElement = function createElement(tag) {
  return document.createElement(tag);
};
var defaultParagraphSeparatorString = 'defaultParagraphSeparator';
var exec = function exec(command) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return document.execCommand(command, false, value);
};
var formatBlock = 'formatBlock';
var queryCommandState = function queryCommandState(command) {
  return document.queryCommandState(command);
};
var queryCommandValue = function queryCommandValue(command) {
  return document.queryCommandValue(command);
};

var bold = {
  icon: '<b>B</b>',
  result: function result() {
    return exec('bold');
  },
  state: function state() {
    return queryCommandState('bold');
  },
  title: 'Bold'
};
var code = {
  icon: '&lt;/&gt;',
  result: function result() {
    return exec(formatBlock, '<pre>');
  },
  title: 'Code'
};
var heading1 = {
  icon: '<b>H<sub>1</sub></b>',
  result: function result() {
    return exec(formatBlock, '<h1>');
  },
  title: 'Heading 1'
};
var heading2 = {
  icon: '<b>H<sub>2</sub></b>',
  result: function result() {
    return exec(formatBlock, '<h2>');
  },
  title: 'Heading 2'
};
var image = {
  icon: '&#128247;',
  result: function result() {
    var url = window.prompt('Enter the image URL');
    if (url) exec('insertImage', url);
  },
  title: 'Image'
};
var italic = {
  icon: '<i>I</i>',
  result: function result() {
    return exec('italic');
  },
  state: function state() {
    return queryCommandState('italic');
  },
  title: 'Italic'
};
var line = {
  icon: '&#8213;',
  result: function result() {
    return exec('insertHorizontalRule');
  },
  title: 'Horizontal Line'
};
var link = {
  icon: '&#128279;',
  result: function result() {
    var url = window.prompt('Enter the link URL');
    if (url) exec('createLink', url);
  },
  title: 'Link'
};
var olist = {
  icon: '&#35;',
  result: function result() {
    return exec('insertOrderedList');
  },
  title: 'Ordered List'
};
var paragraph = {
  icon: '&#182;',
  result: function result() {
    return exec(formatBlock, '<p>');
  },
  title: 'Paragraph'
};
var quote = {
  icon: '&#8220; &#8221;',
  result: function result() {
    return exec(formatBlock, '<blockquote>');
  },
  title: 'Quote'
};
var strikethrough = {
  icon: '<strike>S</strike>',
  result: function result() {
    return exec('strikeThrough');
  },
  state: function state() {
    return queryCommandState('strikeThrough');
  },
  title: 'Strike-through'
};
var ulist = {
  icon: '&#8226;',
  result: function result() {
    return exec('insertUnorderedList');
  },
  title: 'Unordered List'
};
var underline = {
  icon: '<u>U</u>',
  result: function result() {
    return exec('underline');
  },
  state: function state() {
    return queryCommandState('underline');
  },
  title: 'Underline'
};
var defaultActions = {
  bold: bold,
  code: code,
  heading1: heading1,
  heading2: heading2,
  image: image,
  italic: italic,
  line: line,
  link: link,
  olist: olist,
  paragraph: paragraph,
  quote: quote,
  strikethrough: strikethrough,
  ulist: ulist,
  underline: underline
};

var defaultClasses = {
  actionbar: 'pell-actionbar',
  button: 'pell-button',
  content: 'pell-content',
  selected: 'pell-button-selected'
};
var init = function init(settings) {
  var actions = settings.actions ? settings.actions.map(function (action) {
    if (typeof action === 'string') return defaultActions[action];else if (defaultActions[action.name]) return _objectSpread({}, defaultActions[action.name], action);
    return action;
  }) : Object.keys(defaultActions).map(function (action) {
    return defaultActions[action];
  });

  var classes = _objectSpread({}, defaultClasses, settings.classes);

  var defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || 'div';
  var actionbar = createElement('div');
  actionbar.className = classes.actionbar;
  appendChild(settings.element, actionbar);
  var content = settings.element.content = createElement('div');
  content.contentEditable = true;
  content.className = classes.content;

  content.oninput = function (_ref) {
    var firstChild = _ref.target.firstChild;
    if (firstChild && firstChild.nodeType === 3) exec(formatBlock, "<".concat(defaultParagraphSeparator, ">"));else if (content.innerHTML === '<br>') content.innerHTML = '';
    settings.onChange(content.innerHTML);
  };

  content.onkeydown = function (event) {
    if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
      setTimeout(function () {
        return exec(formatBlock, "<".concat(defaultParagraphSeparator, ">"));
      }, 0);
    }
  };

  appendChild(settings.element, content);
  actions.forEach(function (action) {
    var button = createElement('button');
    button.className = classes.button;
    button.innerHTML = action.icon;
    button.title = action.title;
    button.setAttribute('type', 'button');

    button.onclick = function () {
      return action.result() && content.focus();
    };

    if (action.state) {
      var handler = function handler() {
        return button.classList[action.state() ? 'add' : 'remove'](classes.selected);
      };

      addEventListener(content, 'keyup', handler);
      addEventListener(content, 'mouseup', handler);
      addEventListener(button, 'click', handler);
    }

    appendChild(actionbar, button);
  });
  if (settings.styleWithCSS) exec('styleWithCSS');
  exec(defaultParagraphSeparatorString, defaultParagraphSeparator);
  return settings.element;
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
