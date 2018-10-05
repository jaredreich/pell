(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.pell = {})));
}(this, (function (exports) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var exec = function exec(command) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return document.execCommand(command, false, value);
};

var defaultActions = {
  bold: {
    icon: '<b>B</b>',
    title: 'Bold',
    state: function state() {
      return document.queryCommandState('bold');
    },
    result: function result() {
      return exec('bold');
    }
  },
  italic: {
    icon: '<i>I</i>',
    title: 'Italic',
    state: function state() {
      return document.queryCommandState('italic');
    },
    result: function result() {
      return exec('italic');
    }
  },
  underline: {
    icon: '<u>U</u>',
    title: 'Underline',
    state: function state() {
      return document.queryCommandState('underline');
    },
    result: function result() {
      return exec('underline');
    }
  },
  strikethrough: {
    icon: '<strike>S</strike>',
    title: 'Strike-through',
    state: function state() {
      return document.queryCommandState('strikeThrough');
    },
    result: function result() {
      return exec('strikeThrough');
    }
  },
  heading1: {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    result: function result() {
      return exec('formatBlock', '<h1>');
    }
  },
  heading2: {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    result: function result() {
      return exec('formatBlock', '<h2>');
    }
  },
  paragraph: {
    icon: '&#182;',
    title: 'Paragraph',
    result: function result() {
      return exec('formatBlock', '<p>');
    }
  },
  quote: {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    result: function result() {
      return exec('formatBlock', '<blockquote>');
    }
  },
  olist: {
    icon: '&#35;',
    title: 'Ordered List',
    result: function result() {
      return exec('insertOrderedList');
    }
  },
  ulist: {
    icon: '&#8226;',
    title: 'Unordered List',
    result: function result() {
      return exec('insertUnorderedList');
    }
  },
  code: {
    icon: '&lt;/&gt;',
    title: 'Code',
    result: function result() {
      return exec('formatBlock', '<pre>');
    }
  },
  line: {
    icon: '&#8213;',
    title: 'Horizontal Line',
    result: function result() {
      return exec('insertHorizontalRule');
    }
  },
  link: {
    icon: '&#128279;',
    title: 'Link',
    result: function result() {
      var url = window.prompt('Enter the link URL');
      if (url) exec('createLink', url);
    }
  },
  image: {
    icon: '&#128247;',
    title: 'Image',
    result: function result() {
      var url = window.prompt('Enter the image URL');
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
  var settingsActions = settings.actions || Object.keys(defaultActions);
  var actions = settingsActions.map(function (action) {
    if (action + '' === action) return defaultActions[action];else if (defaultActions[action.name]) return _extends({}, defaultActions[action.name]);
    return action;
  });

  var classes = _extends({}, defaultClasses, settings.classes);

  var defaultParagraphSeparator = settings.defaultParagraphSeparator || 'div';

  var content = settings.element.content = document.createElement('div');
  content.contentEditable = true;
  content.className = classes.content;

  var actionbar = document.createElement('div');
  actionbar.className = classes.actionbar;

  var inputHandler = function inputHandler(_ref) {
    var firstChild = _ref.target.firstChild;

    if (firstChild && firstChild.nodeType === 3) exec('formatBlock', '<' + defaultParagraphSeparator + '>');else if (content.innerHTML === '<br>') content.innerHTML = '';
    settings.onChange(content.innerHTML);
  };
  var keydownHandler = function keydownHandler(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
    } else if (event.key === 'Enter' && document.queryCommandValue('formatBlock') === 'blockquote') {
      setTimeout(function () {
        return exec('formatBlock', '<' + defaultParagraphSeparator + '>');
      }, 0);
    }
  };
  var stateHandler = function stateHandler() {
    actions.forEach(function (action) {
      var button = action.state && actionbar.querySelector('[title="' + action.title + '"]');
      button && button.classList[action.state() ? 'add' : 'remove'](classes.selected);
    });
  };

  var actionHandler = function actionHandler(event) {
    var action = actions.find(function (action) {
      return event.target.title === action.title;
    });
    action && action.result.call(content) && content.focus();
    stateHandler();
  };

  content.addEventListener('input', inputHandler);
  content.addEventListener('keydown', keydownHandler);
  content.addEventListener('keyup', stateHandler);
  actionbar.addEventListener('click', actionHandler);

  settings.element.appendChild(actionbar);
  settings.element.appendChild(content);

  actions.forEach(function (action) {
    var button = document.createElement('button');
    button.className = classes.button;
    button.innerHTML = action.icon;
    button.title = action.title;
    button.setAttribute('type', 'button');
    actionbar.appendChild(button);
  });

  if (settings.styleWithCSS) exec('styleWithCSS');
  exec('defaultParagraphSeparator', defaultParagraphSeparator);

  settings.element.destroy = function () {
    content.removeEventListener('input', inputHandler);
    content.removeEventListener('keydown', keydownHandler);
    content.removeEventListener('keyup', stateHandler);
    actionbar.removeEventListener('click', actionHandler);
    settings.element.removeChild(content);
    settings.element.removeChild(actionbar);
  };

  return settings.element;
};

var pell = { exec: exec, init: init };

exports.exec = exec;
exports.init = init;
exports['default'] = pell;

Object.defineProperty(exports, '__esModule', { value: true });

})));
