(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.pell = {})));
}(this, (function (exports) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultParagraphSeparatorString = 'defaultParagraphSeparator';
var formatBlock = 'formatBlock';

var createElement = function createElement(tag) {
  return document.createElement(tag);
};
var queryCommandState = function queryCommandState(command) {
  return document.queryCommandState(command);
};
var queryCommandValue = function queryCommandValue(command) {
  return document.queryCommandValue(command);
};

var exec = function exec(command, value) {
  return document.execCommand(command, false, value);
};

var defaultActions = {
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    state: queryCommandState.bind('bold'),
    result: exec.bind(null, 'bold')
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    state: queryCommandState.bind('italic'),
    result: exec.bind(null, 'italic')
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    state: queryCommandState.bind('underline'),
    result: exec.bind(null, 'underline')
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    state: queryCommandState.bind('strikeThrough'),
    result: exec.bind(null, 'strikeThrough')
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    result: exec.bind(null, formatBlock, '<h1>')
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    result: exec.bind(null, formatBlock, '<h2>')
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    result: exec.bind(null, formatBlock, '<p>')
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    result: exec.bind(null, formatBlock, '<blockquote>')
  },
  olist: {
    icon: '&#35;',
    title: 'Ordered List',
    result: exec.bind(null, 'insertOrderedList')
  },
  ulist: {
    icon: '&#8226;',
    title: 'Unordered List',
    result: exec.bind(null, 'insertUnorderedList')
  },
  code: {
    icon: '&lt;/&gt;',
    title: 'Code',
    result: exec.bind(null, formatBlock, '<pre>')
  },
  line: {
    icon: '&#8213;',
    title: 'Horizontal Line',
    result: exec.bind(null, 'insertHorizontalRule')
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    result: function result() {
      var url = prompt('Enter the link URL');
      if (url) exec('createLink', url);
    }
  },
  image: {
    icon: '&#128247;',
    title: 'Image',
    result: function result() {
      var url = prompt('Enter the image URL');
      if (url) exec('insertImage', url);
    }
  }
};

var defaultClasses = {
  actionbar: 'pell-actionbar',
  button: 'pell-button',
  content: 'pell-content',
  selected: 'pell-button-selected'
};

var init = function init(settings) {
  var actions = settings.actions ? settings.actions.map(function (action) {
    if (typeof action === 'string') return defaultActions[action];
    if (defaultActions[action.name]) return _extends({}, defaultActions[action.name], action);
    return action;
  }) : Object.keys(defaultActions).map(function (action) {
    return defaultActions[action];
  });

  var classes = _extends({}, defaultClasses, settings.classes);

  var defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || 'div';

  var actionbar = createElement('div');
  actionbar.className = classes.actionbar;
  settings.element.appendChild(actionbar);

  var content = settings.element.content = createElement('div');
  content.contentEditable = true;
  content.className = classes.content;
  content.oninput = function (_ref) {
    var firstChild = _ref.target.firstChild;

    if (firstChild && firstChild.nodeType === 3) exec(formatBlock, '<' + defaultParagraphSeparator + '>');else if (content.innerHTML === '<br>') content.innerHTML = '';
    settings.onChange(content.innerHTML);
  };
  content.onkeydown = function (event) {
    if (event.key === 'Tab') {
      event.preventDefault();
    } else if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
      setTimeout(function () {
        return exec(formatBlock, '<' + defaultParagraphSeparator + '>');
      }, 0);
    }
  };
  settings.element.appendChild(content);

  actions.forEach(function (action) {
    var button = createElement('button');
    button.className = classes.button;
    button.innerHTML = action.icon;
    button.title = action.title;
    button.onclick = function () {
      return action.result() && content.focus();
    };

    if (action.state) {
      var handler = function handler() {
        return button.classList[action.state() ? 'add' : 'remove'](classes.selected)[('keyup', 'mouseup', 'click')].map(function (e) {
          return content.addEventListener(e, handler);
        });
      };
    }

    actionbar.appendChild(button);
  });

  if (settings.styleWithCSS) exec('styleWithCSS');
  exec(defaultParagraphSeparatorString, defaultParagraphSeparator);

  return settings.element;
};

var pell = { exec: exec, init: init };

exports.exec = exec;
exports.init = init;
exports['default'] = pell;

Object.defineProperty(exports, '__esModule', { value: true });

})));
