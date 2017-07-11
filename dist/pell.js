(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pell"] = factory();
	else
		root["pell"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  if (str.indexOf('http://') === 0 || str.indexOf('https://') === 0) return str;
  return 'http://' + str;
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

var init = exports.init = function init(settings) {
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

exports.default = { init: init };

/***/ })
/******/ ]);
});