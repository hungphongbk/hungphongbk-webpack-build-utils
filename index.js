module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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

var _incstr = __webpack_require__(1);

var _incstr2 = _interopRequireDefault(_incstr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//region CSS Scope Minify
var createUniqueIdGenerator = function createUniqueIdGenerator() {
    var index = {};

    var generateNextId = _incstr2.default.idGenerator({
        // Removed "d" letter to avoid accidental "ad" construct.
        // @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793
        // NOTE: allow "d" letter due to combination of UPPERCASES-lowercases
        alphabet: 'abcdefghijklmnopqrstuvwxyz0123456789_-'
    });

    return function (name) {
        if (index[name]) {
            return index[name];
        }

        var nextId = void 0;

        do {
            // Class name cannot start with a number.
            nextId = generateNextId();
        } while (/^[0-9_-]/.test(nextId));

        index[name] = generateNextId();
        // console.log(`${name} has id = ${index[name]}`);

        return index[name];
    };
};

var idLocal = createUniqueIdGenerator(),
    idComponent = createUniqueIdGenerator();
var components = {};
var generateScopedName = function generateScopedName(localName, resourcePath) {
    var componentName = resourcePath.split('/').slice(-2).join('/');
    if (!components[componentName]) {
        components[componentName] = true;
        // console.log(componentName[0]+' '+resourcePath);
    }
    if (/^col-/.test(localName)) return 'col-' + idLocal(localName);
    return idComponent(componentName).toUpperCase() + idLocal(localName);
};

var getLocalIdent = function getLocalIdent(context, localIdentName, localName) {
    return generateScopedName(localName, context.resourcePath);
};
//endregion

var cssLoaders = function cssLoaders() {
    var before = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _Object$assign = Object.assign({}, options, {
        modules: false,
        clean: false
    }),
        modules = _Object$assign.modules,
        clean = _Object$assign.clean;

    var loaders = [{
        loader: "css-loader",
        options: {
            autoprefixer: true,
            minimize: true,
            // localIdentName: isProduction ? '[hash:base64:7]' : '[name]__[local]___[hash:base64:5]',
            getLocalIdent: getLocalIdent,
            importLoaders: before.length,
            camelCase: 'only',
            modules: modules
        }
    }];
    if (clean) {
        var ieOff = true;

        loaders.push({
            loader: "clean-css-loader",
            options: {
                level: 2,
                inline: false,
                compatibility: {
                    properties: {
                        iePrefixHack: ieOff,
                        ieSuffixHack: ieOff
                    }
                }
            }
        });
        loaders[0].options.importLoaders++;
    }
    loaders.push.apply(loaders, _toConsumableArray(before));
    return loaders;
};

exports.default = {
    getLocalIdent: getLocalIdent,
    cssLoaders: cssLoaders
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function incstr (str, alph = incstr.alphabet, numlike = incstr.numberlike) {
  if (!str) return alph[0] // if (str === '') is excessive

  // convert to array of digits
  const digs = str.split('').map(ch => alph.indexOf(ch))

  // increment digits starting from the rightmost
  const maxDigit = alph.length - 1
  for (var i = digs.length - 1; i >= 0; i--) { // !!! var not let
    if (digs[i] === -1) throw new RangeError(`Character "${str[i]}" is not in the alphabet "${alph}"`)
    if (digs[i] === maxDigit) {
      digs[i] = 0
      continue
    }
    digs[i]++
    break
  }
  if (i < 0) { digs.unshift(numlike ? 1 : 0) } // add new digit

  // convert back to string
  return digs.map(dig => alph[dig]).join('')
}

incstr.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
incstr.numberlike = false
// prefix and suffix don't make sense here cause str = incstr('id3') will produce 'idid4'

// generator syntax would be too cumbersome 'nextId.next().value'
incstr.idGenerator = function ({ lastId = '',
                                 alphabet = incstr.alphabet,
                                 numberlike = incstr.numberlike,
                                 prefix = '',
                                 suffix = '' } = {}) {
  if (new Set(alphabet).size !== alphabet.length) throw new TypeError('Alphabet contains repeating characters')
  let digs
  const maxDigit = alphabet.length - 1
  function nextId () {
    for (var i = digs.length - 1; i >= 0; i--) { // !!! var not let
      if (digs[i] === -1) throw new RangeError(`Character at index "${i}" is not in the alphabet "${alphabet}"`)
      if (digs[i] === maxDigit) {
        digs[i] = 0
        continue
      }
      digs[i]++
      break
    }
    if (i < 0) { digs.unshift(numberlike ? 1 : 0) } // add new digit
    return prefix + nextId.lastId + suffix
  }
  Object.defineProperty(nextId, 'lastId', {
    get: function () { return digs.map(dig => alphabet[dig]).join('') },
    set: function (val) { digs = val.split('').map(ch => alphabet.indexOf(ch)) }
  })
  nextId.lastId = lastId
  return nextId
}

/* istanbul ignore if */
if (this.window && this === window) this.incstr = incstr
else module.exports = incstr


/***/ })
/******/ ]);