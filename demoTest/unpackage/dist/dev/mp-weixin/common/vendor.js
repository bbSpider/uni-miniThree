(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"demoUni","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"demoUni","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"demoUni","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"demoUni","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"demoUni","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 4 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 5 */
/*!************************************************!*\
  !*** C:/Users/hyt/Desktop/demoTest/pages.json ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/*!***********************************************************************************************!*\
  !*** C:/Users/hyt/Desktop/demoTest/wxcomponents/miniprogram_npm/threejs-miniprogram/index.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(t,e){
for(var n in e){t[n]=e[n];}
}(exports,function(t){
var e={};

function n(r){
if(e[r])return e[r].exports;
var i=e[r]={
i:r,
l:!1,
exports:{}};

return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports;
}
return n.m=t,n.c=e,n.d=function(t,e,r){
n.o(t,e)||Object.defineProperty(t,e,{
enumerable:!0,
get:r});

},n.r=function(t){
"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{
value:"Module"}),
Object.defineProperty(t,"__esModule",{
value:!0});

},n.t=function(t,e){
if(1&e&&(t=n(t)),8&e)return t;
if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;
var r=Object.create(null);
if(n.r(r),Object.defineProperty(r,"default",{
enumerable:!0,
value:t}),
2&e&&"string"!=typeof t)
for(var i in t){n.d(r,i,function(e){
return t[e];
}.bind(null,i));}
return r;
},n.n=function(t){
var e=t&&t.__esModule?function(){
return t.default;
}:function(){
return t;
};
return n.d(e,"a",e),e;
},n.o=function(t,e){
return Object.prototype.hasOwnProperty.call(t,e);
},n.p="",n(n.s=1);
}([function(t,e){
(function(e){
t.exports=e;
}).call(this,{});
},function(t,e,n){
"use strict";

function r(t,e){
for(var n=0;n<e.length;n++){
var r=e[n];
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);
}
}
n.r(e);
var i=new WeakMap(),
a=function(){
function t(){
!function(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");
}(this,t),i.set(this,{});
}
var e,n,a;
return e=t,(n=[{
key:"addEventListener",
value:function value(t,e){
var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},
r=i.get(this);
r||(r={},i.set(this,r)),r[t]||(r[t]=[]),r[t].push(e),n.capture,n.once,n.passive;
}},
{
key:"removeEventListener",
value:function value(t,e){
var n=i.get(this);
if(n){
var r=n[t];
if(r&&r.length>0)
for(var a=r.length;a--;a>0){
if(r[a]===e){
r.splice(a,1);
break;
}}
}
}},
{
key:"dispatchEvent",
value:function value(){
var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},
e=i.get(this)[t.type];
if(e)
for(var n=0;n<e.length;n++){e[n](t);}
}}])&&
r(e.prototype,n),a&&r(e,a),t;
}();

function o(t){
return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t;
}:function(t){
return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t;
})(t);
}

function s(t,e){
for(var n=0;n<e.length;n++){
var r=e[n];
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);
}
}

function c(t){
return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){
return t.__proto__||Object.getPrototypeOf(t);
})(t);
}

function l(t){
if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return t;
}

function h(t,e){
return(h=Object.setPrototypeOf||function(t,e){
return t.__proto__=e,t;
})(t,e);
}
var u=new WeakMap(),
p=new WeakMap(),
d=new WeakMap();

function f(t){
var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};
e.target=e.target||this,"function"==typeof this["on".concat(t)]&&this["on".concat(t)].call(this,e);
}

function m(t){
var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};
this.readyState=t,e.readyState=t,f.call(this,"readystatechange",e);
}

function v(t){
return!/^(http|https|ftp|wxfile):\/\/.*/i.test(t);
}
var g=function(t){
function e(){
var t;
return function(t,e){
if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");
}(this,e),(t=function(t,e){
return!e||"object"!==o(e)&&"function"!=typeof e?l(t):e;
}(this,c(e).call(this))).onabort=null,t.onerror=null,t.onload=null,t.onloadstart=null,t.onprogress=null,t.ontimeout=null,t.onloadend=null,t.onreadystatechange=null,t.readyState=0,t.response=null,t.responseText=null,t.responseType="text",t.dataType="string",t.responseXML=null,t.status=0,t.statusText="",t.upload={},t.withCredentials=!1,u.set(l(t),{
"content-type":"application/x-www-form-urlencoded"}),
p.set(l(t),{}),t;
}
var n,r,i;
return function(t,e){
if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");
t.prototype=Object.create(e&&e.prototype,{
constructor:{
value:t,
writable:!0,
configurable:!0}}),

e&&h(t,e);
}(e,t),n=e,(r=[{
key:"abort",
value:function value(){
var t=d.get(this);
t&&t.abort();
}},
{
key:"getAllResponseHeaders",
value:function value(){
var t=p.get(this);
return Object.keys(t).map(function(e){
return"".concat(e,": ").concat(t[e]);
}).join("\n");
}},
{
key:"getResponseHeader",
value:function value(t){
return p.get(this)[t];
}},
{
key:"open",
value:function value(t,n){
this._method=t,this._url=n,m.call(this,e.OPENED);
}},
{
key:"overrideMimeType",
value:function value(){}},
{
key:"send",
value:function value(){
var t=this,
n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";
if(this.readyState!==e.OPENED)throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
var r,i=this._url,
a=u.get(this),
o=this.responseType,
s=this.dataType,
c=v(i);
"arraybuffer"===o||(r="utf8"),delete this.response,this.response=null;
var l=function l(n){
var r=n.data,
i=n.statusCode,
a=n.header;
if(i=void 0===i?200:i,"string"!=typeof r&&!(r instanceof ArrayBuffer))try{
r=JSON.stringify(r);
}catch(t){}
t.status=i,a&&p.set(t,a),f.call(t,"loadstart"),m.call(t,e.HEADERS_RECEIVED),m.call(t,e.LOADING),t.response=r,r instanceof ArrayBuffer?Object.defineProperty(t,"responseText",{
enumerable:!0,
configurable:!0,
get:function get(){
throw"InvalidStateError : responseType is "+this.responseType;
}}):
t.responseText=r,m.call(t,e.DONE),f.call(t,"load"),f.call(t,"loadend");
},
h=function h(e){
var n=e.errMsg;-1!==n.indexOf("abort")?f.call(t,"abort"):f.call(t,"error",{
message:n}),
f.call(t,"loadend"),c&&console.warn(n);
};
if(c){
var d=wx.getFileSystemManager(),
g={
filePath:i,
success:l,
fail:h};

return r&&(g.encoding=r),void d.readFile(g);
}
wx.request({
data:n,
url:i,
method:this._method,
header:a,
dataType:s,
responseType:o,
success:l,
fail:h});

}},
{
key:"setRequestHeader",
value:function value(t,e){
var n=u.get(this);
n[t]=e,u.set(this,n);
}},
{
key:"addEventListener",
value:function value(t,e){
var n=this;
"function"==typeof e&&(this["on"+t]=function(){
var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};
t.target=t.target||n,e.call(n,t);
});
}},
{
key:"removeEventListener",
value:function value(t,e){
this["on"+t]===e&&(this["on"+t]=null);
}}])&&
s(n.prototype,r),i&&s(n,i),e;
}(a);

function y(t){
return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t;
}:function(t){
return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t;
})(t);
}

function x(e){
e.style={
width:e.width+"px",
height:e.height+"px"},
e.addEventListener=function(){},e.removeEventListener=function(){};
var r,i,a={
createElementNS:function createElementNS(t,n){
return"canvas"===n?e:"img"===n?e.createImage():void 0;
}},

o={
AudioContext:function AudioContext(){},
addEventListener:function addEventListener(){},
removeEventListener:function removeEventListener(){},
URL:{}},

s=g,
c={};
return r=this,i=function i(t){
function e(){}
void 0===Number.EPSILON&&(Number.EPSILON=Math.pow(2,-52)),void 0===Number.isInteger&&(Number.isInteger=function(t){
return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t;
}),void 0===Math.sign&&(Math.sign=function(t){
return t<0?-1:t>0?1:+t;
}),"name"in Function.prototype==0&&Object.defineProperty(Function.prototype,"name",{
get:function get(){
return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1];
}}),
void 0===Object.assign&&(Object.assign=function(t){
if(null==t)throw new TypeError("Cannot convert undefined or null to object");
for(var e=Object(t),n=1;n<arguments.length;n++){
var r=arguments[n];
if(null!=r)
for(var i in r){Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);}
}
return e;
}),Object.assign(e.prototype,{
addEventListener:function addEventListener(t,e){
void 0===this._listeners&&(this._listeners={});
var n=this._listeners;
void 0===n[t]&&(n[t]=[]),-1===n[t].indexOf(e)&&n[t].push(e);
},
hasEventListener:function hasEventListener(t,e){
if(void 0===this._listeners)return!1;
var n=this._listeners;
return void 0!==n[t]&&-1!==n[t].indexOf(e);
},
removeEventListener:function removeEventListener(t,e){
if(void 0!==this._listeners){
var n=this._listeners[t];
if(void 0!==n){
var r=n.indexOf(e);-1!==r&&n.splice(r,1);
}
}
},
dispatchEvent:function dispatchEvent(t){
if(void 0!==this._listeners){
var e=this._listeners[t.type];
if(void 0!==e){
t.target=this;
for(var n=e.slice(0),r=0,i=n.length;r<i;r++){n[r].call(this,t);}
}
}
}});

for(var n=0,r=1,i=2,c=1,l=2,h=3,u=0,p=1,d=2,f=0,m=1,v=2,g=0,x=1,b=2,w=3,_=4,M=5,S=100,T=101,E=102,A=103,L=104,R=200,P=201,C=202,O=203,D=204,N=205,I=206,z=207,B=208,F=209,G=210,U=0,H=1,V=2,j=3,k=4,W=5,q=6,X=7,Y=0,J=1,Z=2,Q=0,K=1,$=2,tt=3,et=4,nt=5,rt=301,it=302,at=303,ot=304,st=305,ct=306,lt=307,ht=1e3,ut=1001,pt=1002,dt=1003,ft=1004,mt=1005,vt=1006,gt=1007,yt=1008,xt=1009,bt=1010,wt=1011,_t=1012,Mt=1013,St=1014,Tt=1015,Et=1016,At=1017,Lt=1018,Rt=1019,Pt=1020,Ct=1021,Ot=1022,Dt=1023,Nt=1024,It=1025,zt=Dt,Bt=1026,Ft=1027,Gt=1028,Ut=33776,Ht=33777,Vt=33778,jt=33779,kt=35840,Wt=35841,qt=35842,Xt=35843,Yt=36196,Jt=37808,Zt=37809,Qt=37810,Kt=37811,$t=37812,te=37813,ee=37814,ne=37815,re=37816,ie=37817,ae=37818,oe=37819,se=37820,ce=37821,le=2201,he=2400,ue=0,pe=1,de=2,fe=3e3,me=3001,ve=3007,ge=3002,ye=3003,xe=3004,be=3005,we=3006,_e=3200,Me=3201,Se=0,Te=1,Ee=7680,Ae=519,Le=[],Re=0;Re<256;Re++){Le[Re]=(Re<16?"0":"")+Re.toString(16);}
var Pe={
DEG2RAD:Math.PI/180,
RAD2DEG:180/Math.PI,
generateUUID:function generateUUID(){
var t=4294967295*Math.random()|0,
e=4294967295*Math.random()|0,
n=4294967295*Math.random()|0,
r=4294967295*Math.random()|0;
return(Le[255&t]+Le[t>>8&255]+Le[t>>16&255]+Le[t>>24&255]+"-"+Le[255&e]+Le[e>>8&255]+"-"+Le[e>>16&15|64]+Le[e>>24&255]+"-"+Le[63&n|128]+Le[n>>8&255]+"-"+Le[n>>16&255]+Le[n>>24&255]+Le[255&r]+Le[r>>8&255]+Le[r>>16&255]+Le[r>>24&255]).toUpperCase();
},
clamp:function clamp(t,e,n){
return Math.max(e,Math.min(n,t));
},
euclideanModulo:function euclideanModulo(t,e){
return(t%e+e)%e;
},
mapLinear:function mapLinear(t,e,n,r,i){
return r+(t-e)*(i-r)/(n-e);
},
lerp:function lerp(t,e,n){
return(1-n)*t+n*e;
},
smoothstep:function smoothstep(t,e,n){
return t<=e?0:t>=n?1:(t=(t-e)/(n-e))*t*(3-2*t);
},
smootherstep:function smootherstep(t,e,n){
return t<=e?0:t>=n?1:(t=(t-e)/(n-e))*t*t*(t*(6*t-15)+10);
},
randInt:function randInt(t,e){
return t+Math.floor(Math.random()*(e-t+1));
},
randFloat:function randFloat(t,e){
return t+Math.random()*(e-t);
},
randFloatSpread:function randFloatSpread(t){
return t*(.5-Math.random());
},
degToRad:function degToRad(t){
return t*Pe.DEG2RAD;
},
radToDeg:function radToDeg(t){
return t*Pe.RAD2DEG;
},
isPowerOfTwo:function isPowerOfTwo(t){
return 0==(t&t-1)&&0!==t;
},
ceilPowerOfTwo:function ceilPowerOfTwo(t){
return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2));
},
floorPowerOfTwo:function floorPowerOfTwo(t){
return Math.pow(2,Math.floor(Math.log(t)/Math.LN2));
}};


function Ce(t,e){
this.x=t||0,this.y=e||0;
}

function Oe(t,e,n,r){
this._x=t||0,this._y=e||0,this._z=n||0,this._w=void 0!==r?r:1;
}
Object.defineProperties(Ce.prototype,{
width:{
get:function get(){
return this.x;
},
set:function set(t){
this.x=t;
}},

height:{
get:function get(){
return this.y;
},
set:function set(t){
this.y=t;
}}}),

Object.assign(Ce.prototype,{
isVector2:!0,
set:function set(t,e){
return this.x=t,this.y=e,this;
},
setScalar:function setScalar(t){
return this.x=t,this.y=t,this;
},
setX:function setX(t){
return this.x=t,this;
},
setY:function setY(t){
return this.y=t,this;
},
setComponent:function setComponent(t,e){
switch(t){
case 0:
this.x=e;
break;
case 1:
this.y=e;
break;
default:
throw new Error("index is out of range: "+t);}

return this;
},
getComponent:function getComponent(t){
switch(t){
case 0:
return this.x;
case 1:
return this.y;
default:
throw new Error("index is out of range: "+t);}

},
clone:function clone(){
return new this.constructor(this.x,this.y);
},
copy:function copy(t){
return this.x=t.x,this.y=t.y,this;
},
add:function add(t,e){
return void 0!==e?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this);
},
addScalar:function addScalar(t){
return this.x+=t,this.y+=t,this;
},
addVectors:function addVectors(t,e){
return this.x=t.x+e.x,this.y=t.y+e.y,this;
},
addScaledVector:function addScaledVector(t,e){
return this.x+=t.x*e,this.y+=t.y*e,this;
},
sub:function sub(t,e){
return void 0!==e?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this);
},
subScalar:function subScalar(t){
return this.x-=t,this.y-=t,this;
},
subVectors:function subVectors(t,e){
return this.x=t.x-e.x,this.y=t.y-e.y,this;
},
multiply:function multiply(t){
return this.x*=t.x,this.y*=t.y,this;
},
multiplyScalar:function multiplyScalar(t){
return this.x*=t,this.y*=t,this;
},
divide:function divide(t){
return this.x/=t.x,this.y/=t.y,this;
},
divideScalar:function divideScalar(t){
return this.multiplyScalar(1/t);
},
applyMatrix3:function applyMatrix3(t){
var e=this.x,
n=this.y,
r=t.elements;
return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this;
},
min:function min(t){
return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this;
},
max:function max(t){
return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this;
},
clamp:function clamp(t,e){
return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this;
},
clampScalar:function clampScalar(t,e){
return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this;
},
clampLength:function clampLength(t,e){
var n=this.length();
return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)));
},
floor:function floor(){
return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this;
},
ceil:function ceil(){
return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this;
},
round:function round(){
return this.x=Math.round(this.x),this.y=Math.round(this.y),this;
},
roundToZero:function roundToZero(){
return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this;
},
negate:function negate(){
return this.x=-this.x,this.y=-this.y,this;
},
dot:function dot(t){
return this.x*t.x+this.y*t.y;
},
cross:function cross(t){
return this.x*t.y-this.y*t.x;
},
lengthSq:function lengthSq(){
return this.x*this.x+this.y*this.y;
},
length:function length(){
return Math.sqrt(this.x*this.x+this.y*this.y);
},
manhattanLength:function manhattanLength(){
return Math.abs(this.x)+Math.abs(this.y);
},
normalize:function normalize(){
return this.divideScalar(this.length()||1);
},
angle:function angle(){
var t=Math.atan2(this.y,this.x);
return t<0&&(t+=2*Math.PI),t;
},
distanceTo:function distanceTo(t){
return Math.sqrt(this.distanceToSquared(t));
},
distanceToSquared:function distanceToSquared(t){
var e=this.x-t.x,
n=this.y-t.y;
return e*e+n*n;
},
manhattanDistanceTo:function manhattanDistanceTo(t){
return Math.abs(this.x-t.x)+Math.abs(this.y-t.y);
},
setLength:function setLength(t){
return this.normalize().multiplyScalar(t);
},
lerp:function lerp(t,e){
return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this;
},
lerpVectors:function lerpVectors(t,e,n){
return this.subVectors(e,t).multiplyScalar(n).add(t);
},
equals:function equals(t){
return t.x===this.x&&t.y===this.y;
},
fromArray:function fromArray(t,e){
return void 0===e&&(e=0),this.x=t[e],this.y=t[e+1],this;
},
toArray:function toArray(t,e){
return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this.x,t[e+1]=this.y,t;
},
fromBufferAttribute:function fromBufferAttribute(t,e,n){
return void 0!==n&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this;
},
rotateAround:function rotateAround(t,e){
var n=Math.cos(e),
r=Math.sin(e),
i=this.x-t.x,
a=this.y-t.y;
return this.x=i*n-a*r+t.x,this.y=i*r+a*n+t.y,this;
}}),
Object.assign(Oe,{
slerp:function slerp(t,e,n,r){
return n.copy(t).slerp(e,r);
},
slerpFlat:function slerpFlat(t,e,n,r,i,a,o){
var s=n[r+0],
c=n[r+1],
l=n[r+2],
h=n[r+3],
u=i[a+0],
p=i[a+1],
d=i[a+2],
f=i[a+3];
if(h!==f||s!==u||c!==p||l!==d){
var m=1-o,
v=s*u+c*p+l*d+h*f,
g=v>=0?1:-1,
y=1-v*v;
if(y>Number.EPSILON){
var x=Math.sqrt(y),
b=Math.atan2(x,v*g);
m=Math.sin(m*b)/x,o=Math.sin(o*b)/x;
}
var w=o*g;
if(s=s*m+u*w,c=c*m+p*w,l=l*m+d*w,h=h*m+f*w,m===1-o){
var _=1/Math.sqrt(s*s+c*c+l*l+h*h);
s*=_,c*=_,l*=_,h*=_;
}
}
t[e]=s,t[e+1]=c,t[e+2]=l,t[e+3]=h;
}}),
Object.defineProperties(Oe.prototype,{
x:{
get:function get(){
return this._x;
},
set:function set(t){
this._x=t,this._onChangeCallback();
}},

y:{
get:function get(){
return this._y;
},
set:function set(t){
this._y=t,this._onChangeCallback();
}},

z:{
get:function get(){
return this._z;
},
set:function set(t){
this._z=t,this._onChangeCallback();
}},

w:{
get:function get(){
return this._w;
},
set:function set(t){
this._w=t,this._onChangeCallback();
}}}),

Object.assign(Oe.prototype,{
isQuaternion:!0,
set:function set(t,e,n,r){
return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this;
},
clone:function clone(){
return new this.constructor(this._x,this._y,this._z,this._w);
},
copy:function copy(t){
return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this;
},
setFromEuler:function setFromEuler(t,e){
if(!t||!t.isEuler)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
var n=t._x,
r=t._y,
i=t._z,
a=t.order,
o=Math.cos,
s=Math.sin,
c=o(n/2),
l=o(r/2),
h=o(i/2),
u=s(n/2),
p=s(r/2),
d=s(i/2);
return"XYZ"===a?(this._x=u*l*h+c*p*d,this._y=c*p*h-u*l*d,this._z=c*l*d+u*p*h,this._w=c*l*h-u*p*d):"YXZ"===a?(this._x=u*l*h+c*p*d,this._y=c*p*h-u*l*d,this._z=c*l*d-u*p*h,this._w=c*l*h+u*p*d):"ZXY"===a?(this._x=u*l*h-c*p*d,this._y=c*p*h+u*l*d,this._z=c*l*d+u*p*h,this._w=c*l*h-u*p*d):"ZYX"===a?(this._x=u*l*h-c*p*d,this._y=c*p*h+u*l*d,this._z=c*l*d-u*p*h,this._w=c*l*h+u*p*d):"YZX"===a?(this._x=u*l*h+c*p*d,this._y=c*p*h+u*l*d,this._z=c*l*d-u*p*h,this._w=c*l*h-u*p*d):"XZY"===a&&(this._x=u*l*h-c*p*d,this._y=c*p*h-u*l*d,this._z=c*l*d+u*p*h,this._w=c*l*h+u*p*d),!1!==e&&this._onChangeCallback(),this;
},
setFromAxisAngle:function setFromAxisAngle(t,e){
var n=e/2,
r=Math.sin(n);
return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this;
},
setFromRotationMatrix:function setFromRotationMatrix(t){
var e,n=t.elements,
r=n[0],
i=n[4],
a=n[8],
o=n[1],
s=n[5],
c=n[9],
l=n[2],
h=n[6],
u=n[10],
p=r+s+u;
return p>0?(e=.5/Math.sqrt(p+1),this._w=.25/e,this._x=(h-c)*e,this._y=(a-l)*e,this._z=(o-i)*e):r>s&&r>u?(e=2*Math.sqrt(1+r-s-u),this._w=(h-c)/e,this._x=.25*e,this._y=(i+o)/e,this._z=(a+l)/e):s>u?(e=2*Math.sqrt(1+s-r-u),this._w=(a-l)/e,this._x=(i+o)/e,this._y=.25*e,this._z=(c+h)/e):(e=2*Math.sqrt(1+u-r-s),this._w=(o-i)/e,this._x=(a+l)/e,this._y=(c+h)/e,this._z=.25*e),this._onChangeCallback(),this;
},
setFromUnitVectors:function setFromUnitVectors(t,e){
var n=t.dot(e)+1;
return n<1e-6?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize();
},
angleTo:function angleTo(t){
return 2*Math.acos(Math.abs(Pe.clamp(this.dot(t),-1,1)));
},
rotateTowards:function rotateTowards(t,e){
var n=this.angleTo(t);
if(0===n)return this;
var r=Math.min(1,e/n);
return this.slerp(t,r),this;
},
inverse:function inverse(){
return this.conjugate();
},
conjugate:function conjugate(){
return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this;
},
dot:function dot(t){
return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w;
},
lengthSq:function lengthSq(){
return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w;
},
length:function length(){
return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w);
},
normalize:function normalize(){
var t=this.length();
return 0===t?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this;
},
multiply:function multiply(t,e){
return void 0!==e?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,e)):this.multiplyQuaternions(this,t);
},
premultiply:function premultiply(t){
return this.multiplyQuaternions(t,this);
},
multiplyQuaternions:function multiplyQuaternions(t,e){
var n=t._x,
r=t._y,
i=t._z,
a=t._w,
o=e._x,
s=e._y,
c=e._z,
l=e._w;
return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this;
},
slerp:function slerp(t,e){
if(0===e)return this;
if(1===e)return this.copy(t);
var n=this._x,
r=this._y,
i=this._z,
a=this._w,
o=a*t._w+n*t._x+r*t._y+i*t._z;
if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=r,this._z=i,this;
var s=1-o*o;
if(s<=Number.EPSILON){
var c=1-e;
return this._w=c*a+e*this._w,this._x=c*n+e*this._x,this._y=c*r+e*this._y,this._z=c*i+e*this._z,this.normalize(),this._onChangeCallback(),this;
}
var l=Math.sqrt(s),
h=Math.atan2(l,o),
u=Math.sin((1-e)*h)/l,
p=Math.sin(e*h)/l;
return this._w=a*u+this._w*p,this._x=n*u+this._x*p,this._y=r*u+this._y*p,this._z=i*u+this._z*p,this._onChangeCallback(),this;
},
equals:function equals(t){
return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w;
},
fromArray:function fromArray(t,e){
return void 0===e&&(e=0),this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this;
},
toArray:function toArray(t,e){
return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t;
},
_onChange:function _onChange(t){
return this._onChangeCallback=t,this;
},
_onChangeCallback:function _onChangeCallback(){}});

var De=new Ie(),
Ne=new Oe();

function Ie(t,e,n){
this.x=t||0,this.y=e||0,this.z=n||0;
}
Object.assign(Ie.prototype,{
isVector3:!0,
set:function set(t,e,n){
return this.x=t,this.y=e,this.z=n,this;
},
setScalar:function setScalar(t){
return this.x=t,this.y=t,this.z=t,this;
},
setX:function setX(t){
return this.x=t,this;
},
setY:function setY(t){
return this.y=t,this;
},
setZ:function setZ(t){
return this.z=t,this;
},
setComponent:function setComponent(t,e){
switch(t){
case 0:
this.x=e;
break;
case 1:
this.y=e;
break;
case 2:
this.z=e;
break;
default:
throw new Error("index is out of range: "+t);}

return this;
},
getComponent:function getComponent(t){
switch(t){
case 0:
return this.x;
case 1:
return this.y;
case 2:
return this.z;
default:
throw new Error("index is out of range: "+t);}

},
clone:function clone(){
return new this.constructor(this.x,this.y,this.z);
},
copy:function copy(t){
return this.x=t.x,this.y=t.y,this.z=t.z,this;
},
add:function add(t,e){
return void 0!==e?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this);
},
addScalar:function addScalar(t){
return this.x+=t,this.y+=t,this.z+=t,this;
},
addVectors:function addVectors(t,e){
return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this;
},
addScaledVector:function addScaledVector(t,e){
return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this;
},
sub:function sub(t,e){
return void 0!==e?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this);
},
subScalar:function subScalar(t){
return this.x-=t,this.y-=t,this.z-=t,this;
},
subVectors:function subVectors(t,e){
return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this;
},
multiply:function multiply(t,e){
return void 0!==e?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(t,e)):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this);
},
multiplyScalar:function multiplyScalar(t){
return this.x*=t,this.y*=t,this.z*=t,this;
},
multiplyVectors:function multiplyVectors(t,e){
return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this;
},
applyEuler:function applyEuler(t){
return t&&t.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(Ne.setFromEuler(t));
},
applyAxisAngle:function applyAxisAngle(t,e){
return this.applyQuaternion(Ne.setFromAxisAngle(t,e));
},
applyMatrix3:function applyMatrix3(t){
var e=this.x,
n=this.y,
r=this.z,
i=t.elements;
return this.x=i[0]*e+i[3]*n+i[6]*r,this.y=i[1]*e+i[4]*n+i[7]*r,this.z=i[2]*e+i[5]*n+i[8]*r,this;
},
applyMatrix4:function applyMatrix4(t){
var e=this.x,
n=this.y,
r=this.z,
i=t.elements,
a=1/(i[3]*e+i[7]*n+i[11]*r+i[15]);
return this.x=(i[0]*e+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*e+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*e+i[6]*n+i[10]*r+i[14])*a,this;
},
applyQuaternion:function applyQuaternion(t){
var e=this.x,
n=this.y,
r=this.z,
i=t.x,
a=t.y,
o=t.z,
s=t.w,
c=s*e+a*r-o*n,
l=s*n+o*e-i*r,
h=s*r+i*n-a*e,
u=-i*e-a*n-o*r;
return this.x=c*s+u*-i+l*-o-h*-a,this.y=l*s+u*-a+h*-i-c*-o,this.z=h*s+u*-o+c*-a-l*-i,this;
},
project:function project(t){
return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
},
unproject:function unproject(t){
return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
},
transformDirection:function transformDirection(t){
var e=this.x,
n=this.y,
r=this.z,
i=t.elements;
return this.x=i[0]*e+i[4]*n+i[8]*r,this.y=i[1]*e+i[5]*n+i[9]*r,this.z=i[2]*e+i[6]*n+i[10]*r,this.normalize();
},
divide:function divide(t){
return this.x/=t.x,this.y/=t.y,this.z/=t.z,this;
},
divideScalar:function divideScalar(t){
return this.multiplyScalar(1/t);
},
min:function min(t){
return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this;
},
max:function max(t){
return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this;
},
clamp:function clamp(t,e){
return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this;
},
clampScalar:function clampScalar(t,e){
return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this;
},
clampLength:function clampLength(t,e){
var n=this.length();
return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)));
},
floor:function floor(){
return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this;
},
ceil:function ceil(){
return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this;
},
round:function round(){
return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this;
},
roundToZero:function roundToZero(){
return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this;
},
negate:function negate(){
return this.x=-this.x,this.y=-this.y,this.z=-this.z,this;
},
dot:function dot(t){
return this.x*t.x+this.y*t.y+this.z*t.z;
},
lengthSq:function lengthSq(){
return this.x*this.x+this.y*this.y+this.z*this.z;
},
length:function length(){
return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
},
manhattanLength:function manhattanLength(){
return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z);
},
normalize:function normalize(){
return this.divideScalar(this.length()||1);
},
setLength:function setLength(t){
return this.normalize().multiplyScalar(t);
},
lerp:function lerp(t,e){
return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this;
},
lerpVectors:function lerpVectors(t,e,n){
return this.subVectors(e,t).multiplyScalar(n).add(t);
},
cross:function cross(t,e){
return void 0!==e?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(t,e)):this.crossVectors(this,t);
},
crossVectors:function crossVectors(t,e){
var n=t.x,
r=t.y,
i=t.z,
a=e.x,
o=e.y,
s=e.z;
return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this;
},
projectOnVector:function projectOnVector(t){
var e=t.dot(this)/t.lengthSq();
return this.copy(t).multiplyScalar(e);
},
projectOnPlane:function projectOnPlane(t){
return De.copy(this).projectOnVector(t),this.sub(De);
},
reflect:function reflect(t){
return this.sub(De.copy(t).multiplyScalar(2*this.dot(t)));
},
angleTo:function angleTo(t){
var e=this.dot(t)/Math.sqrt(this.lengthSq()*t.lengthSq());
return Math.acos(Pe.clamp(e,-1,1));
},
distanceTo:function distanceTo(t){
return Math.sqrt(this.distanceToSquared(t));
},
distanceToSquared:function distanceToSquared(t){
var e=this.x-t.x,
n=this.y-t.y,
r=this.z-t.z;
return e*e+n*n+r*r;
},
manhattanDistanceTo:function manhattanDistanceTo(t){
return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z);
},
setFromSpherical:function setFromSpherical(t){
return this.setFromSphericalCoords(t.radius,t.phi,t.theta);
},
setFromSphericalCoords:function setFromSphericalCoords(t,e,n){
var r=Math.sin(e)*t;
return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this;
},
setFromCylindrical:function setFromCylindrical(t){
return this.setFromCylindricalCoords(t.radius,t.theta,t.y);
},
setFromCylindricalCoords:function setFromCylindricalCoords(t,e,n){
return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this;
},
setFromMatrixPosition:function setFromMatrixPosition(t){
var e=t.elements;
return this.x=e[12],this.y=e[13],this.z=e[14],this;
},
setFromMatrixScale:function setFromMatrixScale(t){
var e=this.setFromMatrixColumn(t,0).length(),
n=this.setFromMatrixColumn(t,1).length(),
r=this.setFromMatrixColumn(t,2).length();
return this.x=e,this.y=n,this.z=r,this;
},
setFromMatrixColumn:function setFromMatrixColumn(t,e){
return this.fromArray(t.elements,4*e);
},
equals:function equals(t){
return t.x===this.x&&t.y===this.y&&t.z===this.z;
},
fromArray:function fromArray(t,e){
return void 0===e&&(e=0),this.x=t[e],this.y=t[e+1],this.z=t[e+2],this;
},
toArray:function toArray(t,e){
return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t;
},
fromBufferAttribute:function fromBufferAttribute(t,e,n){
return void 0!==n&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this;
}});

var ze,Be=new Ie();

function Fe(){
this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.");
}
Object.assign(Fe.prototype,{
isMatrix3:!0,
set:function set(t,e,n,r,i,a,o,s,c){
var l=this.elements;
return l[0]=t,l[1]=r,l[2]=o,l[3]=e,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this;
},
identity:function identity(){
return this.set(1,0,0,0,1,0,0,0,1),this;
},
clone:function clone(){
return new this.constructor().fromArray(this.elements);
},
copy:function copy(t){
var e=this.elements,
n=t.elements;
return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this;
},
setFromMatrix4:function setFromMatrix4(t){
var e=t.elements;
return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this;
},
applyToBufferAttribute:function applyToBufferAttribute(t){
for(var e=0,n=t.count;e<n;e++){Be.x=t.getX(e),Be.y=t.getY(e),Be.z=t.getZ(e),Be.applyMatrix3(this),t.setXYZ(e,Be.x,Be.y,Be.z);}
return t;
},
multiply:function multiply(t){
return this.multiplyMatrices(this,t);
},
premultiply:function premultiply(t){
return this.multiplyMatrices(t,this);
},
multiplyMatrices:function multiplyMatrices(t,e){
var n=t.elements,
r=e.elements,
i=this.elements,
a=n[0],
o=n[3],
s=n[6],
c=n[1],
l=n[4],
h=n[7],
u=n[2],
p=n[5],
d=n[8],
f=r[0],
m=r[3],
v=r[6],
g=r[1],
y=r[4],
x=r[7],
b=r[2],
w=r[5],
_=r[8];
return i[0]=a*f+o*g+s*b,i[3]=a*m+o*y+s*w,i[6]=a*v+o*x+s*_,i[1]=c*f+l*g+h*b,i[4]=c*m+l*y+h*w,i[7]=c*v+l*x+h*_,i[2]=u*f+p*g+d*b,i[5]=u*m+p*y+d*w,i[8]=u*v+p*x+d*_,this;
},
multiplyScalar:function multiplyScalar(t){
var e=this.elements;
return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this;
},
determinant:function determinant(){
var t=this.elements,
e=t[0],
n=t[1],
r=t[2],
i=t[3],
a=t[4],
o=t[5],
s=t[6],
c=t[7],
l=t[8];
return e*a*l-e*o*c-n*i*l+n*o*s+r*i*c-r*a*s;
},
getInverse:function getInverse(t,e){
t&&t.isMatrix4&&console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");
var n=t.elements,
r=this.elements,
i=n[0],
a=n[1],
o=n[2],
s=n[3],
c=n[4],
l=n[5],
h=n[6],
u=n[7],
p=n[8],
d=p*c-l*u,
f=l*h-p*s,
m=u*s-c*h,
v=i*d+a*f+o*m;
if(0===v){
var g="THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";
if(!0===e)throw new Error(g);
return console.warn(g),this.identity();
}
var y=1/v;
return r[0]=d*y,r[1]=(o*u-p*a)*y,r[2]=(l*a-o*c)*y,r[3]=f*y,r[4]=(p*i-o*h)*y,r[5]=(o*s-l*i)*y,r[6]=m*y,r[7]=(a*h-u*i)*y,r[8]=(c*i-a*s)*y,this;
},
transpose:function transpose(){
var t,e=this.elements;
return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this;
},
getNormalMatrix:function getNormalMatrix(t){
return this.setFromMatrix4(t).getInverse(this).transpose();
},
transposeIntoArray:function transposeIntoArray(t){
var e=this.elements;
return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this;
},
setUvTransform:function setUvTransform(t,e,n,r,i,a,o){
var s=Math.cos(i),
c=Math.sin(i);
this.set(n*s,n*c,-n*(s*a+c*o)+a+t,-r*c,r*s,-r*(-c*a+s*o)+o+e,0,0,1);
},
scale:function scale(t,e){
var n=this.elements;
return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=e,n[4]*=e,n[7]*=e,this;
},
rotate:function rotate(t){
var e=Math.cos(t),
n=Math.sin(t),
r=this.elements,
i=r[0],
a=r[3],
o=r[6],
s=r[1],
c=r[4],
l=r[7];
return r[0]=e*i+n*s,r[3]=e*a+n*c,r[6]=e*o+n*l,r[1]=-n*i+e*s,r[4]=-n*a+e*c,r[7]=-n*o+e*l,this;
},
translate:function translate(t,e){
var n=this.elements;
return n[0]+=t*n[2],n[3]+=t*n[5],n[6]+=t*n[8],n[1]+=e*n[2],n[4]+=e*n[5],n[7]+=e*n[8],this;
},
equals:function equals(t){
for(var e=this.elements,n=t.elements,r=0;r<9;r++){
if(e[r]!==n[r])return!1;}
return!0;
},
fromArray:function fromArray(t,e){
void 0===e&&(e=0);
for(var n=0;n<9;n++){this.elements[n]=t[n+e];}
return this;
},
toArray:function toArray(t,e){
void 0===t&&(t=[]),void 0===e&&(e=0);
var n=this.elements;
return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t;
}});

var Ge={
getDataURL:function getDataURL(t){
var e;
if("undefined"==typeof HTMLCanvasElement)return t.src;
if(t instanceof HTMLCanvasElement)e=t;else
{
void 0===ze&&(ze=a.createElementNS("http://www.w3.org/1999/xhtml","canvas")),ze.width=t.width,ze.height=t.height;
var n=ze.getContext("2d");
t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ze;
}
return e.width>2048||e.height>2048?e.toDataURL("image/jpeg",.6):e.toDataURL("image/png");
}},

Ue=0;

function He(t,e,n,r,i,a,o,s,c,l){
Object.defineProperty(this,"id",{
value:Ue++}),
this.uuid=Pe.generateUUID(),this.name="",this.image=void 0!==t?t:He.DEFAULT_IMAGE,this.mipmaps=[],this.mapping=void 0!==e?e:He.DEFAULT_MAPPING,this.wrapS=void 0!==n?n:ut,this.wrapT=void 0!==r?r:ut,this.magFilter=void 0!==i?i:vt,this.minFilter=void 0!==a?a:yt,this.anisotropy=void 0!==c?c:1,this.format=void 0!==o?o:Dt,this.type=void 0!==s?s:xt,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe(),this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=void 0!==l?l:fe,this.version=0,this.onUpdate=null;
}

function Ve(t,e,n,r){
this.x=t||0,this.y=e||0,this.z=n||0,this.w=void 0!==r?r:1;
}

function je(t,e,n){
this.width=t,this.height=e,this.scissor=new Ve(0,0,t,e),this.scissorTest=!1,this.viewport=new Ve(0,0,t,e),n=n||{},this.texture=new He(void 0,void 0,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.image={},this.texture.image.width=t,this.texture.image.height=e,this.texture.generateMipmaps=void 0!==n.generateMipmaps&&n.generateMipmaps,this.texture.minFilter=void 0!==n.minFilter?n.minFilter:vt,this.depthBuffer=void 0===n.depthBuffer||n.depthBuffer,this.stencilBuffer=void 0===n.stencilBuffer||n.stencilBuffer,this.depthTexture=void 0!==n.depthTexture?n.depthTexture:null;
}

function ke(t,e,n){
je.call(this,t,e,n),this.samples=4;
}
He.DEFAULT_IMAGE=void 0,He.DEFAULT_MAPPING=300,He.prototype=Object.assign(Object.create(e.prototype),{
constructor:He,
isTexture:!0,
updateMatrix:function updateMatrix(){
this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y);
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
return this.name=t.name,this.image=t.image,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this;
},
toJSON:function toJSON(t){
var e=void 0===t||"string"==typeof t;
if(!e&&void 0!==t.textures[this.uuid])return t.textures[this.uuid];
var n={
metadata:{
version:4.5,
type:"Texture",
generator:"Texture.toJSON"},

uuid:this.uuid,
name:this.name,
mapping:this.mapping,
repeat:[this.repeat.x,this.repeat.y],
offset:[this.offset.x,this.offset.y],
center:[this.center.x,this.center.y],
rotation:this.rotation,
wrap:[this.wrapS,this.wrapT],
format:this.format,
type:this.type,
encoding:this.encoding,
minFilter:this.minFilter,
magFilter:this.magFilter,
anisotropy:this.anisotropy,
flipY:this.flipY,
premultiplyAlpha:this.premultiplyAlpha,
unpackAlignment:this.unpackAlignment};

if(void 0!==this.image){
var r=this.image;
if(void 0===r.uuid&&(r.uuid=Pe.generateUUID()),!e&&void 0===t.images[r.uuid]){
var i;
if(Array.isArray(r)){
i=[];
for(var a=0,o=r.length;a<o;a++){i.push(Ge.getDataURL(r[a]));}
}else i=Ge.getDataURL(r);
t.images[r.uuid]={
uuid:r.uuid,
url:i};

}
n.image=r.uuid;
}
return e||(t.textures[this.uuid]=n),n;
},
dispose:function dispose(){
this.dispatchEvent({
type:"dispose"});

},
transformUv:function transformUv(t){
if(300!==this.mapping)return t;
if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){
case ht:
t.x=t.x-Math.floor(t.x);
break;
case ut:
t.x=t.x<0?0:1;
break;
case pt:
1===Math.abs(Math.floor(t.x)%2)?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);}

if(t.y<0||t.y>1)switch(this.wrapT){
case ht:
t.y=t.y-Math.floor(t.y);
break;
case ut:
t.y=t.y<0?0:1;
break;
case pt:
1===Math.abs(Math.floor(t.y)%2)?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);}

return this.flipY&&(t.y=1-t.y),t;
}}),
Object.defineProperty(He.prototype,"needsUpdate",{
set:function set(t){
!0===t&&this.version++;
}}),
Object.defineProperties(Ve.prototype,{
width:{
get:function get(){
return this.z;
},
set:function set(t){
this.z=t;
}},

height:{
get:function get(){
return this.w;
},
set:function set(t){
this.w=t;
}}}),

Object.assign(Ve.prototype,{
isVector4:!0,
set:function set(t,e,n,r){
return this.x=t,this.y=e,this.z=n,this.w=r,this;
},
setScalar:function setScalar(t){
return this.x=t,this.y=t,this.z=t,this.w=t,this;
},
setX:function setX(t){
return this.x=t,this;
},
setY:function setY(t){
return this.y=t,this;
},
setZ:function setZ(t){
return this.z=t,this;
},
setW:function setW(t){
return this.w=t,this;
},
setComponent:function setComponent(t,e){
switch(t){
case 0:
this.x=e;
break;
case 1:
this.y=e;
break;
case 2:
this.z=e;
break;
case 3:
this.w=e;
break;
default:
throw new Error("index is out of range: "+t);}

return this;
},
getComponent:function getComponent(t){
switch(t){
case 0:
return this.x;
case 1:
return this.y;
case 2:
return this.z;
case 3:
return this.w;
default:
throw new Error("index is out of range: "+t);}

},
clone:function clone(){
return new this.constructor(this.x,this.y,this.z,this.w);
},
copy:function copy(t){
return this.x=t.x,this.y=t.y,this.z=t.z,this.w=void 0!==t.w?t.w:1,this;
},
add:function add(t,e){
return void 0!==e?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this);
},
addScalar:function addScalar(t){
return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this;
},
addVectors:function addVectors(t,e){
return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this;
},
addScaledVector:function addScaledVector(t,e){
return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this;
},
sub:function sub(t,e){
return void 0!==e?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this);
},
subScalar:function subScalar(t){
return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this;
},
subVectors:function subVectors(t,e){
return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this;
},
multiplyScalar:function multiplyScalar(t){
return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this;
},
applyMatrix4:function applyMatrix4(t){
var e=this.x,
n=this.y,
r=this.z,
i=this.w,
a=t.elements;
return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*i,this;
},
divideScalar:function divideScalar(t){
return this.multiplyScalar(1/t);
},
setAxisAngleFromQuaternion:function setAxisAngleFromQuaternion(t){
this.w=2*Math.acos(t.w);
var e=Math.sqrt(1-t.w*t.w);
return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this;
},
setAxisAngleFromRotationMatrix:function setAxisAngleFromRotationMatrix(t){
var e,n,r,i,a=t.elements,
o=a[0],
s=a[4],
c=a[8],
l=a[1],
h=a[5],
u=a[9],
p=a[2],
d=a[6],
f=a[10];
if(Math.abs(s-l)<.01&&Math.abs(c-p)<.01&&Math.abs(u-d)<.01){
if(Math.abs(s+l)<.1&&Math.abs(c+p)<.1&&Math.abs(u+d)<.1&&Math.abs(o+h+f-3)<.1)return this.set(1,0,0,0),this;
e=Math.PI;
var m=(o+1)/2,
v=(h+1)/2,
g=(f+1)/2,
y=(s+l)/4,
x=(c+p)/4,
b=(u+d)/4;
return m>v&&m>g?m<.01?(n=0,r=.707106781,i=.707106781):(r=y/(n=Math.sqrt(m)),i=x/n):v>g?v<.01?(n=.707106781,r=0,i=.707106781):(n=y/(r=Math.sqrt(v)),i=b/r):g<.01?(n=.707106781,r=.707106781,i=0):(n=x/(i=Math.sqrt(g)),r=b/i),this.set(n,r,i,e),this;
}
var w=Math.sqrt((d-u)*(d-u)+(c-p)*(c-p)+(l-s)*(l-s));
return Math.abs(w)<.001&&(w=1),this.x=(d-u)/w,this.y=(c-p)/w,this.z=(l-s)/w,this.w=Math.acos((o+h+f-1)/2),this;
},
min:function min(t){
return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this;
},
max:function max(t){
return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this;
},
clamp:function clamp(t,e){
return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this;
},
clampScalar:function clampScalar(t,e){
return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this;
},
clampLength:function clampLength(t,e){
var n=this.length();
return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)));
},
floor:function floor(){
return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this;
},
ceil:function ceil(){
return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this;
},
round:function round(){
return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this;
},
roundToZero:function roundToZero(){
return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this;
},
negate:function negate(){
return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this;
},
dot:function dot(t){
return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w;
},
lengthSq:function lengthSq(){
return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w;
},
length:function length(){
return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);
},
manhattanLength:function manhattanLength(){
return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w);
},
normalize:function normalize(){
return this.divideScalar(this.length()||1);
},
setLength:function setLength(t){
return this.normalize().multiplyScalar(t);
},
lerp:function lerp(t,e){
return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this;
},
lerpVectors:function lerpVectors(t,e,n){
return this.subVectors(e,t).multiplyScalar(n).add(t);
},
equals:function equals(t){
return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w;
},
fromArray:function fromArray(t,e){
return void 0===e&&(e=0),this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this;
},
toArray:function toArray(t,e){
return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t;
},
fromBufferAttribute:function fromBufferAttribute(t,e,n){
return void 0!==n&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this;
}}),
je.prototype=Object.assign(Object.create(e.prototype),{
constructor:je,
isWebGLRenderTarget:!0,
setSize:function setSize(t,e){
this.width===t&&this.height===e||(this.width=t,this.height=e,this.texture.image.width=t,this.texture.image.height=e,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e);
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
return this.width=t.width,this.height=t.height,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.depthTexture=t.depthTexture,this;
},
dispose:function dispose(){
this.dispatchEvent({
type:"dispose"});

}}),
ke.prototype=Object.assign(Object.create(je.prototype),{
constructor:ke,
isWebGLMultisampleRenderTarget:!0,
copy:function copy(t){
return je.prototype.copy.call(this,t),this.samples=t.samples,this;
}});

var We=new Ie(),
qe=new Ke(),
Xe=new Ie(0,0,0),
Ye=new Ie(1,1,1),
Je=new Ie(),
Ze=new Ie(),
Qe=new Ie();

function Ke(){
this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.");
}
Object.assign(Ke.prototype,{
isMatrix4:!0,
set:function set(t,e,n,r,i,a,o,s,c,l,h,u,p,d,f,m){
var v=this.elements;
return v[0]=t,v[4]=e,v[8]=n,v[12]=r,v[1]=i,v[5]=a,v[9]=o,v[13]=s,v[2]=c,v[6]=l,v[10]=h,v[14]=u,v[3]=p,v[7]=d,v[11]=f,v[15]=m,this;
},
identity:function identity(){
return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this;
},
clone:function clone(){
return new Ke().fromArray(this.elements);
},
copy:function copy(t){
var e=this.elements,
n=t.elements;
return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this;
},
copyPosition:function copyPosition(t){
var e=this.elements,
n=t.elements;
return e[12]=n[12],e[13]=n[13],e[14]=n[14],this;
},
extractBasis:function extractBasis(t,e,n){
return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this;
},
makeBasis:function makeBasis(t,e,n){
return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this;
},
extractRotation:function extractRotation(t){
var e=this.elements,
n=t.elements,
r=1/We.setFromMatrixColumn(t,0).length(),
i=1/We.setFromMatrixColumn(t,1).length(),
a=1/We.setFromMatrixColumn(t,2).length();
return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*i,e[5]=n[5]*i,e[6]=n[6]*i,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this;
},
makeRotationFromEuler:function makeRotationFromEuler(t){
t&&t.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
var e=this.elements,
n=t.x,
r=t.y,
i=t.z,
a=Math.cos(n),
o=Math.sin(n),
s=Math.cos(r),
c=Math.sin(r),
l=Math.cos(i),
h=Math.sin(i);
if("XYZ"===t.order){
var u=a*l,
p=a*h,
d=o*l,
f=o*h;
e[0]=s*l,e[4]=-s*h,e[8]=c,e[1]=p+d*c,e[5]=u-f*c,e[9]=-o*s,e[2]=f-u*c,e[6]=d+p*c,e[10]=a*s;
}else if("YXZ"===t.order){
var m=s*l,
v=s*h,
g=c*l,
y=c*h;
e[0]=m+y*o,e[4]=g*o-v,e[8]=a*c,e[1]=a*h,e[5]=a*l,e[9]=-o,e[2]=v*o-g,e[6]=y+m*o,e[10]=a*s;
}else if("ZXY"===t.order)m=s*l,v=s*h,g=c*l,y=c*h,e[0]=m-y*o,e[4]=-a*h,e[8]=g+v*o,e[1]=v+g*o,e[5]=a*l,e[9]=y-m*o,e[2]=-a*c,e[6]=o,e[10]=a*s;else
if("ZYX"===t.order)u=a*l,p=a*h,d=o*l,f=o*h,e[0]=s*l,e[4]=d*c-p,e[8]=u*c+f,e[1]=s*h,e[5]=f*c+u,e[9]=p*c-d,e[2]=-c,e[6]=o*s,e[10]=a*s;else
if("YZX"===t.order){
var x=a*s,
b=a*c,
w=o*s,
_=o*c;
e[0]=s*l,e[4]=_-x*h,e[8]=w*h+b,e[1]=h,e[5]=a*l,e[9]=-o*l,e[2]=-c*l,e[6]=b*h+w,e[10]=x-_*h;
}else"XZY"===t.order&&(x=a*s,b=a*c,w=o*s,_=o*c,e[0]=s*l,e[4]=-h,e[8]=c*l,e[1]=x*h+_,e[5]=a*l,e[9]=b*h-w,e[2]=w*h-b,e[6]=o*l,e[10]=_*h+x);
return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this;
},
makeRotationFromQuaternion:function makeRotationFromQuaternion(t){
return this.compose(Xe,t,Ye);
},
lookAt:function lookAt(t,e,n){
var r=this.elements;
return Qe.subVectors(t,e),0===Qe.lengthSq()&&(Qe.z=1),Qe.normalize(),Je.crossVectors(n,Qe),0===Je.lengthSq()&&(1===Math.abs(n.z)?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),Je.crossVectors(n,Qe)),Je.normalize(),Ze.crossVectors(Qe,Je),r[0]=Je.x,r[4]=Ze.x,r[8]=Qe.x,r[1]=Je.y,r[5]=Ze.y,r[9]=Qe.y,r[2]=Je.z,r[6]=Ze.z,r[10]=Qe.z,this;
},
multiply:function multiply(t,e){
return void 0!==e?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(t,e)):this.multiplyMatrices(this,t);
},
premultiply:function premultiply(t){
return this.multiplyMatrices(t,this);
},
multiplyMatrices:function multiplyMatrices(t,e){
var n=t.elements,
r=e.elements,
i=this.elements,
a=n[0],
o=n[4],
s=n[8],
c=n[12],
l=n[1],
h=n[5],
u=n[9],
p=n[13],
d=n[2],
f=n[6],
m=n[10],
v=n[14],
g=n[3],
y=n[7],
x=n[11],
b=n[15],
w=r[0],
_=r[4],
M=r[8],
S=r[12],
T=r[1],
E=r[5],
A=r[9],
L=r[13],
R=r[2],
P=r[6],
C=r[10],
O=r[14],
D=r[3],
N=r[7],
I=r[11],
z=r[15];
return i[0]=a*w+o*T+s*R+c*D,i[4]=a*_+o*E+s*P+c*N,i[8]=a*M+o*A+s*C+c*I,i[12]=a*S+o*L+s*O+c*z,i[1]=l*w+h*T+u*R+p*D,i[5]=l*_+h*E+u*P+p*N,i[9]=l*M+h*A+u*C+p*I,i[13]=l*S+h*L+u*O+p*z,i[2]=d*w+f*T+m*R+v*D,i[6]=d*_+f*E+m*P+v*N,i[10]=d*M+f*A+m*C+v*I,i[14]=d*S+f*L+m*O+v*z,i[3]=g*w+y*T+x*R+b*D,i[7]=g*_+y*E+x*P+b*N,i[11]=g*M+y*A+x*C+b*I,i[15]=g*S+y*L+x*O+b*z,this;
},
multiplyScalar:function multiplyScalar(t){
var e=this.elements;
return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this;
},
applyToBufferAttribute:function applyToBufferAttribute(t){
for(var e=0,n=t.count;e<n;e++){We.x=t.getX(e),We.y=t.getY(e),We.z=t.getZ(e),We.applyMatrix4(this),t.setXYZ(e,We.x,We.y,We.z);}
return t;
},
determinant:function determinant(){
var t=this.elements,
e=t[0],
n=t[4],
r=t[8],
i=t[12],
a=t[1],
o=t[5],
s=t[9],
c=t[13],
l=t[2],
h=t[6],
u=t[10],
p=t[14];
return t[3]*(+i*s*h-r*c*h-i*o*u+n*c*u+r*o*p-n*s*p)+t[7]*(+e*s*p-e*c*u+i*a*u-r*a*p+r*c*l-i*s*l)+t[11]*(+e*c*h-e*o*p-i*a*h+n*a*p+i*o*l-n*c*l)+t[15]*(-r*o*l-e*s*h+e*o*u+r*a*h-n*a*u+n*s*l);
},
transpose:function transpose(){
var t,e=this.elements;
return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this;
},
setPosition:function setPosition(t,e,n){
var r=this.elements;
return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this;
},
getInverse:function getInverse(t,e){
var n=this.elements,
r=t.elements,
i=r[0],
a=r[1],
o=r[2],
s=r[3],
c=r[4],
l=r[5],
h=r[6],
u=r[7],
p=r[8],
d=r[9],
f=r[10],
m=r[11],
v=r[12],
g=r[13],
y=r[14],
x=r[15],
b=d*y*u-g*f*u+g*h*m-l*y*m-d*h*x+l*f*x,
w=v*f*u-p*y*u-v*h*m+c*y*m+p*h*x-c*f*x,
_=p*g*u-v*d*u+v*l*m-c*g*m-p*l*x+c*d*x,
M=v*d*h-p*g*h-v*l*f+c*g*f+p*l*y-c*d*y,
S=i*b+a*w+o*_+s*M;
if(0===S){
var T="THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";
if(!0===e)throw new Error(T);
return console.warn(T),this.identity();
}
var E=1/S;
return n[0]=b*E,n[1]=(g*f*s-d*y*s-g*o*m+a*y*m+d*o*x-a*f*x)*E,n[2]=(l*y*s-g*h*s+g*o*u-a*y*u-l*o*x+a*h*x)*E,n[3]=(d*h*s-l*f*s-d*o*u+a*f*u+l*o*m-a*h*m)*E,n[4]=w*E,n[5]=(p*y*s-v*f*s+v*o*m-i*y*m-p*o*x+i*f*x)*E,n[6]=(v*h*s-c*y*s-v*o*u+i*y*u+c*o*x-i*h*x)*E,n[7]=(c*f*s-p*h*s+p*o*u-i*f*u-c*o*m+i*h*m)*E,n[8]=_*E,n[9]=(v*d*s-p*g*s-v*a*m+i*g*m+p*a*x-i*d*x)*E,n[10]=(c*g*s-v*l*s+v*a*u-i*g*u-c*a*x+i*l*x)*E,n[11]=(p*l*s-c*d*s-p*a*u+i*d*u+c*a*m-i*l*m)*E,n[12]=M*E,n[13]=(p*g*o-v*d*o+v*a*f-i*g*f-p*a*y+i*d*y)*E,n[14]=(v*l*o-c*g*o-v*a*h+i*g*h+c*a*y-i*l*y)*E,n[15]=(c*d*o-p*l*o+p*a*h-i*d*h-c*a*f+i*l*f)*E,this;
},
scale:function scale(t){
var e=this.elements,
n=t.x,
r=t.y,
i=t.z;
return e[0]*=n,e[4]*=r,e[8]*=i,e[1]*=n,e[5]*=r,e[9]*=i,e[2]*=n,e[6]*=r,e[10]*=i,e[3]*=n,e[7]*=r,e[11]*=i,this;
},
getMaxScaleOnAxis:function getMaxScaleOnAxis(){
var t=this.elements,
e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],
n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],
r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];
return Math.sqrt(Math.max(e,n,r));
},
makeTranslation:function makeTranslation(t,e,n){
return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this;
},
makeRotationX:function makeRotationX(t){
var e=Math.cos(t),
n=Math.sin(t);
return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this;
},
makeRotationY:function makeRotationY(t){
var e=Math.cos(t),
n=Math.sin(t);
return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this;
},
makeRotationZ:function makeRotationZ(t){
var e=Math.cos(t),
n=Math.sin(t);
return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this;
},
makeRotationAxis:function makeRotationAxis(t,e){
var n=Math.cos(e),
r=Math.sin(e),
i=1-n,
a=t.x,
o=t.y,
s=t.z,
c=i*a,
l=i*o;
return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this;
},
makeScale:function makeScale(t,e,n){
return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this;
},
makeShear:function makeShear(t,e,n){
return this.set(1,e,n,0,t,1,n,0,t,e,1,0,0,0,0,1),this;
},
compose:function compose(t,e,n){
var r=this.elements,
i=e._x,
a=e._y,
o=e._z,
s=e._w,
c=i+i,
l=a+a,
h=o+o,
u=i*c,
p=i*l,
d=i*h,
f=a*l,
m=a*h,
v=o*h,
g=s*c,
y=s*l,
x=s*h,
b=n.x,
w=n.y,
_=n.z;
return r[0]=(1-(f+v))*b,r[1]=(p+x)*b,r[2]=(d-y)*b,r[3]=0,r[4]=(p-x)*w,r[5]=(1-(u+v))*w,r[6]=(m+g)*w,r[7]=0,r[8]=(d+y)*_,r[9]=(m-g)*_,r[10]=(1-(u+f))*_,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this;
},
decompose:function decompose(t,e,n){
var r=this.elements,
i=We.set(r[0],r[1],r[2]).length(),
a=We.set(r[4],r[5],r[6]).length(),
o=We.set(r[8],r[9],r[10]).length();
this.determinant()<0&&(i=-i),t.x=r[12],t.y=r[13],t.z=r[14],qe.copy(this);
var s=1/i,
c=1/a,
l=1/o;
return qe.elements[0]*=s,qe.elements[1]*=s,qe.elements[2]*=s,qe.elements[4]*=c,qe.elements[5]*=c,qe.elements[6]*=c,qe.elements[8]*=l,qe.elements[9]*=l,qe.elements[10]*=l,e.setFromRotationMatrix(qe),n.x=i,n.y=a,n.z=o,this;
},
makePerspective:function makePerspective(t,e,n,r,i,a){
void 0===a&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
var o=this.elements,
s=2*i/(e-t),
c=2*i/(n-r),
l=(e+t)/(e-t),
h=(n+r)/(n-r),
u=-(a+i)/(a-i),
p=-2*a*i/(a-i);
return o[0]=s,o[4]=0,o[8]=l,o[12]=0,o[1]=0,o[5]=c,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=u,o[14]=p,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this;
},
makeOrthographic:function makeOrthographic(t,e,n,r,i,a){
var o=this.elements,
s=1/(e-t),
c=1/(n-r),
l=1/(a-i),
h=(e+t)*s,
u=(n+r)*c,
p=(a+i)*l;
return o[0]=2*s,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-u,o[2]=0,o[6]=0,o[10]=-2*l,o[14]=-p,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this;
},
equals:function equals(t){
for(var e=this.elements,n=t.elements,r=0;r<16;r++){
if(e[r]!==n[r])return!1;}
return!0;
},
fromArray:function fromArray(t,e){
void 0===e&&(e=0);
for(var n=0;n<16;n++){this.elements[n]=t[n+e];}
return this;
},
toArray:function toArray(t,e){
void 0===t&&(t=[]),void 0===e&&(e=0);
var n=this.elements;
return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t;
}});

var $e=new Ke(),
tn=new Oe();

function en(t,e,n,r){
this._x=t||0,this._y=e||0,this._z=n||0,this._order=r||en.DefaultOrder;
}

function nn(){
this.mask=1;
}
en.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"],en.DefaultOrder="XYZ",Object.defineProperties(en.prototype,{
x:{
get:function get(){
return this._x;
},
set:function set(t){
this._x=t,this._onChangeCallback();
}},

y:{
get:function get(){
return this._y;
},
set:function set(t){
this._y=t,this._onChangeCallback();
}},

z:{
get:function get(){
return this._z;
},
set:function set(t){
this._z=t,this._onChangeCallback();
}},

order:{
get:function get(){
return this._order;
},
set:function set(t){
this._order=t,this._onChangeCallback();
}}}),

Object.assign(en.prototype,{
isEuler:!0,
set:function set(t,e,n,r){
return this._x=t,this._y=e,this._z=n,this._order=r||this._order,this._onChangeCallback(),this;
},
clone:function clone(){
return new this.constructor(this._x,this._y,this._z,this._order);
},
copy:function copy(t){
return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this;
},
setFromRotationMatrix:function setFromRotationMatrix(t,e,n){
var r=Pe.clamp,
i=t.elements,
a=i[0],
o=i[4],
s=i[8],
c=i[1],
l=i[5],
h=i[9],
u=i[2],
p=i[6],
d=i[10];
return"XYZ"===(e=e||this._order)?(this._y=Math.asin(r(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(p,l),this._z=0)):"YXZ"===e?(this._x=Math.asin(-r(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(s,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,a),this._z=0)):"ZXY"===e?(this._x=Math.asin(r(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,a))):"ZYX"===e?(this._y=Math.asin(-r(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-o,l))):"YZX"===e?(this._z=Math.asin(r(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(s,d))):"XZY"===e?(this._z=Math.asin(-r(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(s,a)):(this._x=Math.atan2(-h,d),this._y=0)):console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: "+e),this._order=e,!1!==n&&this._onChangeCallback(),this;
},
setFromQuaternion:function setFromQuaternion(t,e,n){
return $e.makeRotationFromQuaternion(t),this.setFromRotationMatrix($e,e,n);
},
setFromVector3:function setFromVector3(t,e){
return this.set(t.x,t.y,t.z,e||this._order);
},
reorder:function reorder(t){
return tn.setFromEuler(this),this.setFromQuaternion(tn,t);
},
equals:function equals(t){
return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order;
},
fromArray:function fromArray(t){
return this._x=t[0],this._y=t[1],this._z=t[2],void 0!==t[3]&&(this._order=t[3]),this._onChangeCallback(),this;
},
toArray:function toArray(t,e){
return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t;
},
toVector3:function toVector3(t){
return t?t.set(this._x,this._y,this._z):new Ie(this._x,this._y,this._z);
},
_onChange:function _onChange(t){
return this._onChangeCallback=t,this;
},
_onChangeCallback:function _onChangeCallback(){}}),
Object.assign(nn.prototype,{
set:function set(t){
this.mask=1<<t|0;
},
enable:function enable(t){
this.mask|=1<<t|0;
},
enableAll:function enableAll(){
this.mask=-1;
},
toggle:function toggle(t){
this.mask^=1<<t|0;
},
disable:function disable(t){
this.mask&=~(1<<t|0);
},
disableAll:function disableAll(){
this.mask=0;
},
test:function test(t){
return 0!=(this.mask&t.mask);
}});

var rn=0,
an=new Ie(),
on=new Oe(),
sn=new Ke(),
cn=new Ie(),
ln=new Ie(),
hn=new Ie(),
un=new Oe(),
pn=new Ie(1,0,0),
dn=new Ie(0,1,0),
fn=new Ie(0,0,1),
mn={
type:"added"},

vn={
type:"removed"};


function gn(){
Object.defineProperty(this,"id",{
value:rn++}),
this.uuid=Pe.generateUUID(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gn.DefaultUp.clone();
var t=new Ie(),
e=new en(),
n=new Oe(),
r=new Ie(1,1,1);
e._onChange(function(){
n.setFromEuler(e,!1);
}),n._onChange(function(){
e.setFromQuaternion(n,void 0,!1);
}),Object.defineProperties(this,{
position:{
configurable:!0,
enumerable:!0,
value:t},

rotation:{
configurable:!0,
enumerable:!0,
value:e},

quaternion:{
configurable:!0,
enumerable:!0,
value:n},

scale:{
configurable:!0,
enumerable:!0,
value:r},

modelViewMatrix:{
value:new Ke()},

normalMatrix:{
value:new Fe()}}),

this.matrix=new Ke(),this.matrixWorld=new Ke(),this.matrixAutoUpdate=gn.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new nn(),this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={};
}

function yn(){
gn.call(this),this.type="Scene",this.background=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{
detail:this}));

}
gn.DefaultUp=new Ie(0,1,0),gn.DefaultMatrixAutoUpdate=!0,gn.prototype=Object.assign(Object.create(e.prototype),{
constructor:gn,
isObject3D:!0,
onBeforeRender:function onBeforeRender(){},
onAfterRender:function onAfterRender(){},
applyMatrix:function applyMatrix(t){
this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale);
},
applyQuaternion:function applyQuaternion(t){
return this.quaternion.premultiply(t),this;
},
setRotationFromAxisAngle:function setRotationFromAxisAngle(t,e){
this.quaternion.setFromAxisAngle(t,e);
},
setRotationFromEuler:function setRotationFromEuler(t){
this.quaternion.setFromEuler(t,!0);
},
setRotationFromMatrix:function setRotationFromMatrix(t){
this.quaternion.setFromRotationMatrix(t);
},
setRotationFromQuaternion:function setRotationFromQuaternion(t){
this.quaternion.copy(t);
},
rotateOnAxis:function rotateOnAxis(t,e){
return on.setFromAxisAngle(t,e),this.quaternion.multiply(on),this;
},
rotateOnWorldAxis:function rotateOnWorldAxis(t,e){
return on.setFromAxisAngle(t,e),this.quaternion.premultiply(on),this;
},
rotateX:function rotateX(t){
return this.rotateOnAxis(pn,t);
},
rotateY:function rotateY(t){
return this.rotateOnAxis(dn,t);
},
rotateZ:function rotateZ(t){
return this.rotateOnAxis(fn,t);
},
translateOnAxis:function translateOnAxis(t,e){
return an.copy(t).applyQuaternion(this.quaternion),this.position.add(an.multiplyScalar(e)),this;
},
translateX:function translateX(t){
return this.translateOnAxis(pn,t);
},
translateY:function translateY(t){
return this.translateOnAxis(dn,t);
},
translateZ:function translateZ(t){
return this.translateOnAxis(fn,t);
},
localToWorld:function localToWorld(t){
return t.applyMatrix4(this.matrixWorld);
},
worldToLocal:function worldToLocal(t){
return t.applyMatrix4(sn.getInverse(this.matrixWorld));
},
lookAt:function lookAt(t,e,n){
t.isVector3?cn.copy(t):cn.set(t,e,n);
var r=this.parent;
this.updateWorldMatrix(!0,!1),ln.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sn.lookAt(ln,cn,this.up):sn.lookAt(cn,ln,this.up),this.quaternion.setFromRotationMatrix(sn),r&&(sn.extractRotation(r.matrixWorld),on.setFromRotationMatrix(sn),this.quaternion.premultiply(on.inverse()));
},
add:function add(t){
if(arguments.length>1){
for(var e=0;e<arguments.length;e++){this.add(arguments[e]);}
return this;
}
return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(null!==t.parent&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(mn)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this);
},
remove:function remove(t){
if(arguments.length>1){
for(var e=0;e<arguments.length;e++){this.remove(arguments[e]);}
return this;
}
var n=this.children.indexOf(t);
return-1!==n&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(vn)),this;
},
attach:function attach(t){
return this.updateWorldMatrix(!0,!1),sn.getInverse(this.matrixWorld),null!==t.parent&&(t.parent.updateWorldMatrix(!0,!1),sn.multiply(t.parent.matrixWorld)),t.applyMatrix(sn),t.updateWorldMatrix(!1,!1),this.add(t),this;
},
getObjectById:function getObjectById(t){
return this.getObjectByProperty("id",t);
},
getObjectByName:function getObjectByName(t){
return this.getObjectByProperty("name",t);
},
getObjectByProperty:function getObjectByProperty(t,e){
if(this[t]===e)return this;
for(var n=0,r=this.children.length;n<r;n++){
var i=this.children[n].getObjectByProperty(t,e);
if(void 0!==i)return i;
}
},
getWorldPosition:function getWorldPosition(t){
return void 0===t&&(console.warn("THREE.Object3D: .getWorldPosition() target is now required"),t=new Ie()),this.updateMatrixWorld(!0),t.setFromMatrixPosition(this.matrixWorld);
},
getWorldQuaternion:function getWorldQuaternion(t){
return void 0===t&&(console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"),t=new Oe()),this.updateMatrixWorld(!0),this.matrixWorld.decompose(ln,t,hn),t;
},
getWorldScale:function getWorldScale(t){
return void 0===t&&(console.warn("THREE.Object3D: .getWorldScale() target is now required"),t=new Ie()),this.updateMatrixWorld(!0),this.matrixWorld.decompose(ln,un,t),t;
},
getWorldDirection:function getWorldDirection(t){
void 0===t&&(console.warn("THREE.Object3D: .getWorldDirection() target is now required"),t=new Ie()),this.updateMatrixWorld(!0);
var e=this.matrixWorld.elements;
return t.set(e[8],e[9],e[10]).normalize();
},
raycast:function raycast(){},
traverse:function traverse(t){
t(this);
for(var e=this.children,n=0,r=e.length;n<r;n++){e[n].traverse(t);}
},
traverseVisible:function traverseVisible(t){
if(!1!==this.visible){
t(this);
for(var e=this.children,n=0,r=e.length;n<r;n++){e[n].traverseVisible(t);}
}
},
traverseAncestors:function traverseAncestors(t){
var e=this.parent;
null!==e&&(t(e),e.traverseAncestors(t));
},
updateMatrix:function updateMatrix(){
this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0;
},
updateMatrixWorld:function updateMatrixWorld(t){
this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);
for(var e=this.children,n=0,r=e.length;n<r;n++){e[n].updateMatrixWorld(t);}
},
updateWorldMatrix:function updateWorldMatrix(t,e){
var n=this.parent;
if(!0===t&&null!==n&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),!0===e)
for(var r=this.children,i=0,a=r.length;i<a;i++){r[i].updateWorldMatrix(!1,!0);}
},
toJSON:function toJSON(t){
var e=void 0===t||"string"==typeof t,
n={};
e&&(t={
geometries:{},
materials:{},
textures:{},
images:{},
shapes:{}},
n.metadata={
version:4.5,
type:"Object",
generator:"Object3D.toJSON"});

var r={};

function i(e,n){
return void 0===e[n.uuid]&&(e[n.uuid]=n.toJSON(t)),n.uuid;
}
if(r.uuid=this.uuid,r.type=this.type,""!==this.name&&(r.name=this.name),!0===this.castShadow&&(r.castShadow=!0),!0===this.receiveShadow&&(r.receiveShadow=!0),!1===this.visible&&(r.visible=!1),!1===this.frustumCulled&&(r.frustumCulled=!1),0!==this.renderOrder&&(r.renderOrder=this.renderOrder),"{}"!==JSON.stringify(this.userData)&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),!1===this.matrixAutoUpdate&&(r.matrixAutoUpdate=!1),this.isMesh&&this.drawMode!==ue&&(r.drawMode=this.drawMode),this.isMesh||this.isLine||this.isPoints){
r.geometry=i(t.geometries,this.geometry);
var a=this.geometry.parameters;
if(void 0!==a&&void 0!==a.shapes){
var o=a.shapes;
if(Array.isArray(o))
for(var s=0,c=o.length;s<c;s++){
var l=o[s];
i(t.shapes,l);
}else i(t.shapes,o);
}
}
if(void 0!==this.material)
if(Array.isArray(this.material)){
var h=[];
for(s=0,c=this.material.length;s<c;s++){h.push(i(t.materials,this.material[s]));}
r.material=h;
}else r.material=i(t.materials,this.material);
if(this.children.length>0)
for(r.children=[],s=0;s<this.children.length;s++){r.children.push(this.children[s].toJSON(t).object);}
if(e){
var u=m(t.geometries),
p=m(t.materials),
d=m(t.textures),
f=m(t.images);
o=m(t.shapes),u.length>0&&(n.geometries=u),p.length>0&&(n.materials=p),d.length>0&&(n.textures=d),f.length>0&&(n.images=f),o.length>0&&(n.shapes=o);
}
return n.object=r,n;

function m(t){
var e=[];
for(var n in t){
var r=t[n];
delete r.metadata,e.push(r);
}
return e;
}
},
clone:function clone(t){
return new this.constructor().copy(this,t);
},
copy:function copy(t,e){
if(void 0===e&&(e=!0),this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),!0===e)
for(var n=0;n<t.children.length;n++){
var r=t.children[n];
this.add(r.clone());
}
return this;
}}),
yn.prototype=Object.assign(Object.create(gn.prototype),{
constructor:yn,
isScene:!0,
copy:function copy(t,e){
return gn.prototype.copy.call(this,t,e),null!==t.background&&(this.background=t.background.clone()),null!==t.fog&&(this.fog=t.fog.clone()),null!==t.overrideMaterial&&(this.overrideMaterial=t.overrideMaterial.clone()),this.autoUpdate=t.autoUpdate,this.matrixAutoUpdate=t.matrixAutoUpdate,this;
},
toJSON:function toJSON(t){
var e=gn.prototype.toJSON.call(this,t);
return null!==this.background&&(e.object.background=this.background.toJSON(t)),null!==this.fog&&(e.object.fog=this.fog.toJSON()),e;
},
dispose:function dispose(){
this.dispatchEvent({
type:"dispose"});

}});

var xn=[new Ie(),new Ie(),new Ie(),new Ie(),new Ie(),new Ie(),new Ie(),new Ie()],
bn=new Ie(),
wn=new Ie(),
_n=new Ie(),
Mn=new Ie(),
Sn=new Ie(),
Tn=new Ie(),
En=new Ie(),
An=new Ie(),
Ln=new Ie(),
Rn=new Ie(),
Pn=new Ie();

function Cn(t,e){
this.min=void 0!==t?t:new Ie(1/0,1/0,1/0),this.max=void 0!==e?e:new Ie(-1/0,-1/0,-1/0);
}

function On(t,e,n,r,i){
var a,o;
for(a=0,o=t.length-3;a<=o;a+=3){
Pn.fromArray(t,a);
var s=i.x*Math.abs(Pn.x)+i.y*Math.abs(Pn.y)+i.z*Math.abs(Pn.z),
c=e.dot(Pn),
l=n.dot(Pn),
h=r.dot(Pn);
if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>s)return!1;
}
return!0;
}
Object.assign(Cn.prototype,{
isBox3:!0,
set:function set(t,e){
return this.min.copy(t),this.max.copy(e),this;
},
setFromArray:function setFromArray(t){
for(var e=1/0,n=1/0,r=1/0,i=-1/0,a=-1/0,o=-1/0,s=0,c=t.length;s<c;s+=3){
var l=t[s],
h=t[s+1],
u=t[s+2];
l<e&&(e=l),h<n&&(n=h),u<r&&(r=u),l>i&&(i=l),h>a&&(a=h),u>o&&(o=u);
}
return this.min.set(e,n,r),this.max.set(i,a,o),this;
},
setFromBufferAttribute:function setFromBufferAttribute(t){
for(var e=1/0,n=1/0,r=1/0,i=-1/0,a=-1/0,o=-1/0,s=0,c=t.count;s<c;s++){
var l=t.getX(s),
h=t.getY(s),
u=t.getZ(s);
l<e&&(e=l),h<n&&(n=h),u<r&&(r=u),l>i&&(i=l),h>a&&(a=h),u>o&&(o=u);
}
return this.min.set(e,n,r),this.max.set(i,a,o),this;
},
setFromPoints:function setFromPoints(t){
this.makeEmpty();
for(var e=0,n=t.length;e<n;e++){this.expandByPoint(t[e]);}
return this;
},
setFromCenterAndSize:function setFromCenterAndSize(t,e){
var n=bn.copy(e).multiplyScalar(.5);
return this.min.copy(t).sub(n),this.max.copy(t).add(n),this;
},
setFromObject:function setFromObject(t){
return this.makeEmpty(),this.expandByObject(t);
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
return this.min.copy(t.min),this.max.copy(t.max),this;
},
makeEmpty:function makeEmpty(){
return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this;
},
isEmpty:function isEmpty(){
return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z;
},
getCenter:function getCenter(t){
return void 0===t&&(console.warn("THREE.Box3: .getCenter() target is now required"),t=new Ie()),this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5);
},
getSize:function getSize(t){
return void 0===t&&(console.warn("THREE.Box3: .getSize() target is now required"),t=new Ie()),this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min);
},
expandByPoint:function expandByPoint(t){
return this.min.min(t),this.max.max(t),this;
},
expandByVector:function expandByVector(t){
return this.min.sub(t),this.max.add(t),this;
},
expandByScalar:function expandByScalar(t){
return this.min.addScalar(-t),this.max.addScalar(t),this;
},
expandByObject:function expandByObject(t){
var e,n;
t.updateWorldMatrix(!1,!1);
var r=t.geometry;
if(void 0!==r)
if(r.isGeometry){
var i=r.vertices;
for(e=0,n=i.length;e<n;e++){bn.copy(i[e]),bn.applyMatrix4(t.matrixWorld),this.expandByPoint(bn);}
}else if(r.isBufferGeometry){
var a=r.attributes.position;
if(void 0!==a)
for(e=0,n=a.count;e<n;e++){bn.fromBufferAttribute(a,e).applyMatrix4(t.matrixWorld),this.expandByPoint(bn);}
}
var o=t.children;
for(e=0,n=o.length;e<n;e++){this.expandByObject(o[e]);}
return this;
},
containsPoint:function containsPoint(t){
return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z);
},
containsBox:function containsBox(t){
return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z;
},
getParameter:function getParameter(t,e){
return void 0===e&&(console.warn("THREE.Box3: .getParameter() target is now required"),e=new Ie()),e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z));
},
intersectsBox:function intersectsBox(t){
return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z);
},
intersectsSphere:function intersectsSphere(t){
return this.clampPoint(t.center,bn),bn.distanceToSquared(t.center)<=t.radius*t.radius;
},
intersectsPlane:function intersectsPlane(t){
var e,n;
return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant;
},
intersectsTriangle:function intersectsTriangle(t){
if(this.isEmpty())return!1;
this.getCenter(An),Ln.subVectors(this.max,An),wn.subVectors(t.a,An),_n.subVectors(t.b,An),Mn.subVectors(t.c,An),Sn.subVectors(_n,wn),Tn.subVectors(Mn,_n),En.subVectors(wn,Mn);
var e=[0,-Sn.z,Sn.y,0,-Tn.z,Tn.y,0,-En.z,En.y,Sn.z,0,-Sn.x,Tn.z,0,-Tn.x,En.z,0,-En.x,-Sn.y,Sn.x,0,-Tn.y,Tn.x,0,-En.y,En.x,0];
return!!On(e,wn,_n,Mn,Ln)&&!!On(e=[1,0,0,0,1,0,0,0,1],wn,_n,Mn,Ln)&&(Rn.crossVectors(Sn,Tn),On(e=[Rn.x,Rn.y,Rn.z],wn,_n,Mn,Ln));
},
clampPoint:function clampPoint(t,e){
return void 0===e&&(console.warn("THREE.Box3: .clampPoint() target is now required"),e=new Ie()),e.copy(t).clamp(this.min,this.max);
},
distanceToPoint:function distanceToPoint(t){
return bn.copy(t).clamp(this.min,this.max).sub(t).length();
},
getBoundingSphere:function getBoundingSphere(t){
return void 0===t&&console.error("THREE.Box3: .getBoundingSphere() target is now required"),this.getCenter(t.center),t.radius=.5*this.getSize(bn).length(),t;
},
intersect:function intersect(t){
return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this;
},
union:function union(t){
return this.min.min(t.min),this.max.max(t.max),this;
},
applyMatrix4:function applyMatrix4(t){
return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xn),this);
},
translate:function translate(t){
return this.min.add(t),this.max.add(t),this;
},
equals:function equals(t){
return t.min.equals(this.min)&&t.max.equals(this.max);
}});

var Dn=new Cn();

function Nn(t,e){
this.center=void 0!==t?t:new Ie(),this.radius=void 0!==e?e:0;
}
Object.assign(Nn.prototype,{
set:function set(t,e){
return this.center.copy(t),this.radius=e,this;
},
setFromPoints:function setFromPoints(t,e){
var n=this.center;
void 0!==e?n.copy(e):Dn.setFromPoints(t).getCenter(n);
for(var r=0,i=0,a=t.length;i<a;i++){r=Math.max(r,n.distanceToSquared(t[i]));}
return this.radius=Math.sqrt(r),this;
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
return this.center.copy(t.center),this.radius=t.radius,this;
},
empty:function empty(){
return this.radius<=0;
},
containsPoint:function containsPoint(t){
return t.distanceToSquared(this.center)<=this.radius*this.radius;
},
distanceToPoint:function distanceToPoint(t){
return t.distanceTo(this.center)-this.radius;
},
intersectsSphere:function intersectsSphere(t){
var e=this.radius+t.radius;
return t.center.distanceToSquared(this.center)<=e*e;
},
intersectsBox:function intersectsBox(t){
return t.intersectsSphere(this);
},
intersectsPlane:function intersectsPlane(t){
return Math.abs(t.distanceToPoint(this.center))<=this.radius;
},
clampPoint:function clampPoint(t,e){
var n=this.center.distanceToSquared(t);
return void 0===e&&(console.warn("THREE.Sphere: .clampPoint() target is now required"),e=new Ie()),e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e;
},
getBoundingBox:function getBoundingBox(t){
return void 0===t&&(console.warn("THREE.Sphere: .getBoundingBox() target is now required"),t=new Cn()),t.set(this.center,this.center),t.expandByScalar(this.radius),t;
},
applyMatrix4:function applyMatrix4(t){
return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this;
},
translate:function translate(t){
return this.center.add(t),this;
},
equals:function equals(t){
return t.center.equals(this.center)&&t.radius===this.radius;
}});

var In=new Ie(),
zn=new Ie(),
Bn=new Ie(),
Fn=new Ie(),
Gn=new Ie(),
Un=new Ie(),
Hn=new Ie();

function Vn(t,e){
this.origin=void 0!==t?t:new Ie(),this.direction=void 0!==e?e:new Ie();
}
Object.assign(Vn.prototype,{
set:function set(t,e){
return this.origin.copy(t),this.direction.copy(e),this;
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
return this.origin.copy(t.origin),this.direction.copy(t.direction),this;
},
at:function at(t,e){
return void 0===e&&(console.warn("THREE.Ray: .at() target is now required"),e=new Ie()),e.copy(this.direction).multiplyScalar(t).add(this.origin);
},
lookAt:function lookAt(t){
return this.direction.copy(t).sub(this.origin).normalize(),this;
},
recast:function recast(t){
return this.origin.copy(this.at(t,In)),this;
},
closestPointToPoint:function closestPointToPoint(t,e){
void 0===e&&(console.warn("THREE.Ray: .closestPointToPoint() target is now required"),e=new Ie()),e.subVectors(t,this.origin);
var n=e.dot(this.direction);
return n<0?e.copy(this.origin):e.copy(this.direction).multiplyScalar(n).add(this.origin);
},
distanceToPoint:function distanceToPoint(t){
return Math.sqrt(this.distanceSqToPoint(t));
},
distanceSqToPoint:function distanceSqToPoint(t){
var e=In.subVectors(t,this.origin).dot(this.direction);
return e<0?this.origin.distanceToSquared(t):(In.copy(this.direction).multiplyScalar(e).add(this.origin),In.distanceToSquared(t));
},
distanceSqToSegment:function distanceSqToSegment(t,e,n,r){
zn.copy(t).add(e).multiplyScalar(.5),Bn.copy(e).sub(t).normalize(),Fn.copy(this.origin).sub(zn);
var i,a,o,s,c=.5*t.distanceTo(e),
l=-this.direction.dot(Bn),
h=Fn.dot(this.direction),
u=-Fn.dot(Bn),
p=Fn.lengthSq(),
d=Math.abs(1-l*l);
if(d>0){
if(a=l*h-u,s=c*d,(i=l*u-h)>=0){
if(a>=-s){
if(a<=s){
var f=1/d;
o=(i*=f)*(i+l*(a*=f)+2*h)+a*(l*i+a+2*u)+p;
}else a=c,o=-(i=Math.max(0,-(l*a+h)))*i+a*(a+2*u)+p;}else
a=-c,o=-(i=Math.max(0,-(l*a+h)))*i+a*(a+2*u)+p;}else
a<=-s?o=-(i=Math.max(0,-(-l*c+h)))*i+(a=i>0?-c:Math.min(Math.max(-c,-u),c))*(a+2*u)+p:a<=s?(i=0,o=(a=Math.min(Math.max(-c,-u),c))*(a+2*u)+p):o=-(i=Math.max(0,-(l*c+h)))*i+(a=i>0?c:Math.min(Math.max(-c,-u),c))*(a+2*u)+p;}else
a=l>0?-c:c,o=-(i=Math.max(0,-(l*a+h)))*i+a*(a+2*u)+p;
return n&&n.copy(this.direction).multiplyScalar(i).add(this.origin),r&&r.copy(Bn).multiplyScalar(a).add(zn),o;
},
intersectSphere:function intersectSphere(t,e){
In.subVectors(t.center,this.origin);
var n=In.dot(this.direction),
r=In.dot(In)-n*n,
i=t.radius*t.radius;
if(r>i)return null;
var a=Math.sqrt(i-r),
o=n-a,
s=n+a;
return o<0&&s<0?null:o<0?this.at(s,e):this.at(o,e);
},
intersectsSphere:function intersectsSphere(t){
return this.distanceSqToPoint(t.center)<=t.radius*t.radius;
},
distanceToPlane:function distanceToPlane(t){
var e=t.normal.dot(this.direction);
if(0===e)return 0===t.distanceToPoint(this.origin)?0:null;
var n=-(this.origin.dot(t.normal)+t.constant)/e;
return n>=0?n:null;
},
intersectPlane:function intersectPlane(t,e){
var n=this.distanceToPlane(t);
return null===n?null:this.at(n,e);
},
intersectsPlane:function intersectsPlane(t){
var e=t.distanceToPoint(this.origin);
return 0===e||t.normal.dot(this.direction)*e<0;
},
intersectBox:function intersectBox(t,e){
var n,r,i,a,o,s,c=1/this.direction.x,
l=1/this.direction.y,
h=1/this.direction.z,
u=this.origin;
return c>=0?(n=(t.min.x-u.x)*c,r=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,r=(t.min.x-u.x)*c),l>=0?(i=(t.min.y-u.y)*l,a=(t.max.y-u.y)*l):(i=(t.max.y-u.y)*l,a=(t.min.y-u.y)*l),n>a||i>r?null:((i>n||n!=n)&&(n=i),(a<r||r!=r)&&(r=a),h>=0?(o=(t.min.z-u.z)*h,s=(t.max.z-u.z)*h):(o=(t.max.z-u.z)*h,s=(t.min.z-u.z)*h),n>s||o>r?null:((o>n||n!=n)&&(n=o),(s<r||r!=r)&&(r=s),r<0?null:this.at(n>=0?n:r,e)));
},
intersectsBox:function intersectsBox(t){
return null!==this.intersectBox(t,In);
},
intersectTriangle:function intersectTriangle(t,e,n,r,i){
Gn.subVectors(e,t),Un.subVectors(n,t),Hn.crossVectors(Gn,Un);
var a,o=this.direction.dot(Hn);
if(o>0){
if(r)return null;
a=1;
}else{
if(!(o<0))return null;
a=-1,o=-o;
}
Fn.subVectors(this.origin,t);
var s=a*this.direction.dot(Un.crossVectors(Fn,Un));
if(s<0)return null;
var c=a*this.direction.dot(Gn.cross(Fn));
if(c<0)return null;
if(s+c>o)return null;
var l=-a*Fn.dot(Hn);
return l<0?null:this.at(l/o,i);
},
applyMatrix4:function applyMatrix4(t){
return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this;
},
equals:function equals(t){
return t.origin.equals(this.origin)&&t.direction.equals(this.direction);
}});

var jn=new Ie(),
kn=new Ie(),
Wn=new Ie(),
qn=new Ie(),
Xn=new Ie(),
Yn=new Ie(),
Jn=new Ie(),
Zn=new Ie(),
Qn=new Ie(),
Kn=new Ie();

function $n(t,e,n){
this.a=void 0!==t?t:new Ie(),this.b=void 0!==e?e:new Ie(),this.c=void 0!==n?n:new Ie();
}
Object.assign($n,{
getNormal:function getNormal(t,e,n,r){
void 0===r&&(console.warn("THREE.Triangle: .getNormal() target is now required"),r=new Ie()),r.subVectors(n,e),jn.subVectors(t,e),r.cross(jn);
var i=r.lengthSq();
return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0);
},
getBarycoord:function getBarycoord(t,e,n,r,i){
jn.subVectors(r,e),kn.subVectors(n,e),Wn.subVectors(t,e);
var a=jn.dot(jn),
o=jn.dot(kn),
s=jn.dot(Wn),
c=kn.dot(kn),
l=kn.dot(Wn),
h=a*c-o*o;
if(void 0===i&&(console.warn("THREE.Triangle: .getBarycoord() target is now required"),i=new Ie()),0===h)return i.set(-2,-1,-1);
var u=1/h,
p=(c*s-o*l)*u,
d=(a*l-o*s)*u;
return i.set(1-p-d,d,p);
},
containsPoint:function containsPoint(t,e,n,r){
return $n.getBarycoord(t,e,n,r,qn),qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1;
},
getUV:function getUV(t,e,n,r,i,a,o,s){
return this.getBarycoord(t,e,n,r,qn),s.set(0,0),s.addScaledVector(i,qn.x),s.addScaledVector(a,qn.y),s.addScaledVector(o,qn.z),s;
},
isFrontFacing:function isFrontFacing(t,e,n,r){
return jn.subVectors(n,e),kn.subVectors(t,e),jn.cross(kn).dot(r)<0;
}}),
Object.assign($n.prototype,{
set:function set(t,e,n){
return this.a.copy(t),this.b.copy(e),this.c.copy(n),this;
},
setFromPointsAndIndices:function setFromPointsAndIndices(t,e,n,r){
return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this;
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this;
},
getArea:function getArea(){
return jn.subVectors(this.c,this.b),kn.subVectors(this.a,this.b),.5*jn.cross(kn).length();
},
getMidpoint:function getMidpoint(t){
return void 0===t&&(console.warn("THREE.Triangle: .getMidpoint() target is now required"),t=new Ie()),t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3);
},
getNormal:function getNormal(t){
return $n.getNormal(this.a,this.b,this.c,t);
},
getPlane:function getPlane(t){
return void 0===t&&(console.warn("THREE.Triangle: .getPlane() target is now required"),t=new Ie()),t.setFromCoplanarPoints(this.a,this.b,this.c);
},
getBarycoord:function getBarycoord(t,e){
return $n.getBarycoord(t,this.a,this.b,this.c,e);
},
getUV:function getUV(t,e,n,r,i){
return $n.getUV(t,this.a,this.b,this.c,e,n,r,i);
},
containsPoint:function containsPoint(t){
return $n.containsPoint(t,this.a,this.b,this.c);
},
isFrontFacing:function isFrontFacing(t){
return $n.isFrontFacing(this.a,this.b,this.c,t);
},
intersectsBox:function intersectsBox(t){
return t.intersectsTriangle(this);
},
closestPointToPoint:function closestPointToPoint(t,e){
void 0===e&&(console.warn("THREE.Triangle: .closestPointToPoint() target is now required"),e=new Ie());
var n,r,i=this.a,
a=this.b,
o=this.c;
Xn.subVectors(a,i),Yn.subVectors(o,i),Zn.subVectors(t,i);
var s=Xn.dot(Zn),
c=Yn.dot(Zn);
if(s<=0&&c<=0)return e.copy(i);
Qn.subVectors(t,a);
var l=Xn.dot(Qn),
h=Yn.dot(Qn);
if(l>=0&&h<=l)return e.copy(a);
var u=s*h-l*c;
if(u<=0&&s>=0&&l<=0)return n=s/(s-l),e.copy(i).addScaledVector(Xn,n);
Kn.subVectors(t,o);
var p=Xn.dot(Kn),
d=Yn.dot(Kn);
if(d>=0&&p<=d)return e.copy(o);
var f=p*c-s*d;
if(f<=0&&c>=0&&d<=0)return r=c/(c-d),e.copy(i).addScaledVector(Yn,r);
var m=l*d-p*h;
if(m<=0&&h-l>=0&&p-d>=0)return Jn.subVectors(o,a),r=(h-l)/(h-l+(p-d)),e.copy(a).addScaledVector(Jn,r);
var v=1/(m+f+u);
return n=f*v,r=u*v,e.copy(i).addScaledVector(Xn,n).addScaledVector(Yn,r);
},
equals:function equals(t){
return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c);
}});

var tr={
aliceblue:15792383,
antiquewhite:16444375,
aqua:65535,
aquamarine:8388564,
azure:15794175,
beige:16119260,
bisque:16770244,
black:0,
blanchedalmond:16772045,
blue:255,
blueviolet:9055202,
brown:10824234,
burlywood:14596231,
cadetblue:6266528,
chartreuse:8388352,
chocolate:13789470,
coral:16744272,
cornflowerblue:6591981,
cornsilk:16775388,
crimson:14423100,
cyan:65535,
darkblue:139,
darkcyan:35723,
darkgoldenrod:12092939,
darkgray:11119017,
darkgreen:25600,
darkgrey:11119017,
darkkhaki:12433259,
darkmagenta:9109643,
darkolivegreen:5597999,
darkorange:16747520,
darkorchid:10040012,
darkred:9109504,
darksalmon:15308410,
darkseagreen:9419919,
darkslateblue:4734347,
darkslategray:3100495,
darkslategrey:3100495,
darkturquoise:52945,
darkviolet:9699539,
deeppink:16716947,
deepskyblue:49151,
dimgray:6908265,
dimgrey:6908265,
dodgerblue:2003199,
firebrick:11674146,
floralwhite:16775920,
forestgreen:2263842,
fuchsia:16711935,
gainsboro:14474460,
ghostwhite:16316671,
gold:16766720,
goldenrod:14329120,
gray:8421504,
green:32768,
greenyellow:11403055,
grey:8421504,
honeydew:15794160,
hotpink:16738740,
indianred:13458524,
indigo:4915330,
ivory:16777200,
khaki:15787660,
lavender:15132410,
lavenderblush:16773365,
lawngreen:8190976,
lemonchiffon:16775885,
lightblue:11393254,
lightcoral:15761536,
lightcyan:14745599,
lightgoldenrodyellow:16448210,
lightgray:13882323,
lightgreen:9498256,
lightgrey:13882323,
lightpink:16758465,
lightsalmon:16752762,
lightseagreen:2142890,
lightskyblue:8900346,
lightslategray:7833753,
lightslategrey:7833753,
lightsteelblue:11584734,
lightyellow:16777184,
lime:65280,
limegreen:3329330,
linen:16445670,
magenta:16711935,
maroon:8388608,
mediumaquamarine:6737322,
mediumblue:205,
mediumorchid:12211667,
mediumpurple:9662683,
mediumseagreen:3978097,
mediumslateblue:8087790,
mediumspringgreen:64154,
mediumturquoise:4772300,
mediumvioletred:13047173,
midnightblue:1644912,
mintcream:16121850,
mistyrose:16770273,
moccasin:16770229,
navajowhite:16768685,
navy:128,
oldlace:16643558,
olive:8421376,
olivedrab:7048739,
orange:16753920,
orangered:16729344,
orchid:14315734,
palegoldenrod:15657130,
palegreen:10025880,
paleturquoise:11529966,
palevioletred:14381203,
papayawhip:16773077,
peachpuff:16767673,
peru:13468991,
pink:16761035,
plum:14524637,
powderblue:11591910,
purple:8388736,
rebeccapurple:6697881,
red:16711680,
rosybrown:12357519,
royalblue:4286945,
saddlebrown:9127187,
salmon:16416882,
sandybrown:16032864,
seagreen:3050327,
seashell:16774638,
sienna:10506797,
silver:12632256,
skyblue:8900331,
slateblue:6970061,
slategray:7372944,
slategrey:7372944,
snow:16775930,
springgreen:65407,
steelblue:4620980,
tan:13808780,
teal:32896,
thistle:14204888,
tomato:16737095,
turquoise:4251856,
violet:15631086,
wheat:16113331,
white:16777215,
whitesmoke:16119285,
yellow:16776960,
yellowgreen:10145074},

er={
h:0,
s:0,
l:0},

nr={
h:0,
s:0,
l:0};


function rr(t,e,n){
return void 0===e&&void 0===n?this.set(t):this.setRGB(t,e,n);
}

function ir(t,e,n){
return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+6*(e-t)*(2/3-n):t;
}

function ar(t){
return t<.04045?.0773993808*t:Math.pow(.9478672986*t+.0521327014,2.4);
}

function or(t){
return t<.0031308?12.92*t:1.055*Math.pow(t,.41666)-.055;
}

function sr(t,e,n,r,i,a){
this.a=t,this.b=e,this.c=n,this.normal=r&&r.isVector3?r:new Ie(),this.vertexNormals=Array.isArray(r)?r:[],this.color=i&&i.isColor?i:new rr(),this.vertexColors=Array.isArray(i)?i:[],this.materialIndex=void 0!==a?a:0;
}
Object.assign(rr.prototype,{
isColor:!0,
r:1,
g:1,
b:1,
set:function set(t){
return t&&t.isColor?this.copy(t):"number"==typeof t?this.setHex(t):"string"==typeof t&&this.setStyle(t),this;
},
setScalar:function setScalar(t){
return this.r=t,this.g=t,this.b=t,this;
},
setHex:function setHex(t){
return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(255&t)/255,this;
},
setRGB:function setRGB(t,e,n){
return this.r=t,this.g=e,this.b=n,this;
},
setHSL:function setHSL(t,e,n){
if(t=Pe.euclideanModulo(t,1),e=Pe.clamp(e,0,1),n=Pe.clamp(n,0,1),0===e)this.r=this.g=this.b=n;else
{
var r=n<=.5?n*(1+e):n+e-n*e,
i=2*n-r;
this.r=ir(i,r,t+1/3),this.g=ir(i,r,t),this.b=ir(i,r,t-1/3);
}
return this;
},
setStyle:function setStyle(t){
function e(e){
void 0!==e&&parseFloat(e)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.");
}
var n;
if(n=/^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(t)){
var r,i=n[1],
a=n[2];
switch(i){
case"rgb":
case"rgba":
if(r=/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(r[1],10))/255,this.g=Math.min(255,parseInt(r[2],10))/255,this.b=Math.min(255,parseInt(r[3],10))/255,e(r[5]),this;
if(r=/^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(r[1],10))/100,this.g=Math.min(100,parseInt(r[2],10))/100,this.b=Math.min(100,parseInt(r[3],10))/100,e(r[5]),this;
break;
case"hsl":
case"hsla":
if(r=/^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)){
var o=parseFloat(r[1])/360,
s=parseInt(r[2],10)/100,
c=parseInt(r[3],10)/100;
return e(r[5]),this.setHSL(o,s,c);
}}

}else if(n=/^\#([A-Fa-f0-9]+)$/.exec(t)){
var l,h=(l=n[1]).length;
if(3===h)return this.r=parseInt(l.charAt(0)+l.charAt(0),16)/255,this.g=parseInt(l.charAt(1)+l.charAt(1),16)/255,this.b=parseInt(l.charAt(2)+l.charAt(2),16)/255,this;
if(6===h)return this.r=parseInt(l.charAt(0)+l.charAt(1),16)/255,this.g=parseInt(l.charAt(2)+l.charAt(3),16)/255,this.b=parseInt(l.charAt(4)+l.charAt(5),16)/255,this;
}
return t&&t.length>0&&(void 0!==(l=tr[t])?this.setHex(l):console.warn("THREE.Color: Unknown color "+t)),this;
},
clone:function clone(){
return new this.constructor(this.r,this.g,this.b);
},
copy:function copy(t){
return this.r=t.r,this.g=t.g,this.b=t.b,this;
},
copyGammaToLinear:function copyGammaToLinear(t,e){
return void 0===e&&(e=2),this.r=Math.pow(t.r,e),this.g=Math.pow(t.g,e),this.b=Math.pow(t.b,e),this;
},
copyLinearToGamma:function copyLinearToGamma(t,e){
void 0===e&&(e=2);
var n=e>0?1/e:1;
return this.r=Math.pow(t.r,n),this.g=Math.pow(t.g,n),this.b=Math.pow(t.b,n),this;
},
convertGammaToLinear:function convertGammaToLinear(t){
return this.copyGammaToLinear(this,t),this;
},
convertLinearToGamma:function convertLinearToGamma(t){
return this.copyLinearToGamma(this,t),this;
},
copySRGBToLinear:function copySRGBToLinear(t){
return this.r=ar(t.r),this.g=ar(t.g),this.b=ar(t.b),this;
},
copyLinearToSRGB:function copyLinearToSRGB(t){
return this.r=or(t.r),this.g=or(t.g),this.b=or(t.b),this;
},
convertSRGBToLinear:function convertSRGBToLinear(){
return this.copySRGBToLinear(this),this;
},
convertLinearToSRGB:function convertLinearToSRGB(){
return this.copyLinearToSRGB(this),this;
},
getHex:function getHex(){
return 255*this.r<<16^255*this.g<<8^255*this.b<<0;
},
getHexString:function getHexString(){
return("000000"+this.getHex().toString(16)).slice(-6);
},
getHSL:function getHSL(t){
void 0===t&&(console.warn("THREE.Color: .getHSL() target is now required"),t={
h:0,
s:0,
l:0});

var e,n,r=this.r,
i=this.g,
a=this.b,
o=Math.max(r,i,a),
s=Math.min(r,i,a),
c=(s+o)/2;
if(s===o)e=0,n=0;else
{
var l=o-s;
switch(n=c<=.5?l/(o+s):l/(2-o-s),o){
case r:
e=(i-a)/l+(i<a?6:0);
break;
case i:
e=(a-r)/l+2;
break;
case a:
e=(r-i)/l+4;}

e/=6;
}
return t.h=e,t.s=n,t.l=c,t;
},
getStyle:function getStyle(){
return"rgb("+(255*this.r|0)+","+(255*this.g|0)+","+(255*this.b|0)+")";
},
offsetHSL:function offsetHSL(t,e,n){
return this.getHSL(er),er.h+=t,er.s+=e,er.l+=n,this.setHSL(er.h,er.s,er.l),this;
},
add:function add(t){
return this.r+=t.r,this.g+=t.g,this.b+=t.b,this;
},
addColors:function addColors(t,e){
return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this;
},
addScalar:function addScalar(t){
return this.r+=t,this.g+=t,this.b+=t,this;
},
sub:function sub(t){
return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this;
},
multiply:function multiply(t){
return this.r*=t.r,this.g*=t.g,this.b*=t.b,this;
},
multiplyScalar:function multiplyScalar(t){
return this.r*=t,this.g*=t,this.b*=t,this;
},
lerp:function lerp(t,e){
return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this;
},
lerpHSL:function lerpHSL(t,e){
this.getHSL(er),t.getHSL(nr);
var n=Pe.lerp(er.h,nr.h,e),
r=Pe.lerp(er.s,nr.s,e),
i=Pe.lerp(er.l,nr.l,e);
return this.setHSL(n,r,i),this;
},
equals:function equals(t){
return t.r===this.r&&t.g===this.g&&t.b===this.b;
},
fromArray:function fromArray(t,e){
return void 0===e&&(e=0),this.r=t[e],this.g=t[e+1],this.b=t[e+2],this;
},
toArray:function toArray(t,e){
return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t;
},
toJSON:function toJSON(){
return this.getHex();
}}),
Object.assign(sr.prototype,{
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
this.a=t.a,this.b=t.b,this.c=t.c,this.normal.copy(t.normal),this.color.copy(t.color),this.materialIndex=t.materialIndex;
for(var e=0,n=t.vertexNormals.length;e<n;e++){this.vertexNormals[e]=t.vertexNormals[e].clone();}
for(e=0,n=t.vertexColors.length;e<n;e++){this.vertexColors[e]=t.vertexColors[e].clone();}
return this;
}});

var cr=0;

function lr(){
Object.defineProperty(this,"id",{
value:cr++}),
this.uuid=Pe.generateUUID(),this.name="",this.type="Material",this.fog=!0,this.lights=!0,this.blending=x,this.side=u,this.flatShading=!1,this.vertexTangents=!1,this.vertexColors=f,this.opacity=1,this.transparent=!1,this.blendSrc=D,this.blendDst=N,this.blendEquation=S,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=j,this.depthTest=!0,this.depthWrite=!0,this.stencilFunc=Ae,this.stencilRef=0,this.stencilMask=255,this.stencilFail=Ee,this.stencilZFail=Ee,this.stencilZPass=Ee,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.needsUpdate=!0;
}

function hr(t){
lr.call(this),this.type="MeshBasicMaterial",this.color=new rr(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Y,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.lights=!1,this.setValues(t);
}

function ur(t,e,n){
if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
this.name="",this.array=t,this.itemSize=e,this.count=void 0!==t?t.length/e:0,this.normalized=!0===n,this.dynamic=!1,this.updateRange={
offset:0,
count:-1},
this.version=0;
}

function pr(t,e,n){
ur.call(this,new Int8Array(t),e,n);
}

function dr(t,e,n){
ur.call(this,new Uint8Array(t),e,n);
}

function fr(t,e,n){
ur.call(this,new Uint8ClampedArray(t),e,n);
}

function mr(t,e,n){
ur.call(this,new Int16Array(t),e,n);
}

function vr(t,e,n){
ur.call(this,new Uint16Array(t),e,n);
}

function gr(t,e,n){
ur.call(this,new Int32Array(t),e,n);
}

function yr(t,e,n){
ur.call(this,new Uint32Array(t),e,n);
}

function xr(t,e,n){
ur.call(this,new Float32Array(t),e,n);
}

function br(t,e,n){
ur.call(this,new Float64Array(t),e,n);
}

function wr(){
this.vertices=[],this.normals=[],this.colors=[],this.uvs=[],this.uvs2=[],this.groups=[],this.morphTargets={},this.skinWeights=[],this.skinIndices=[],this.boundingBox=null,this.boundingSphere=null,this.verticesNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.uvsNeedUpdate=!1,this.groupsNeedUpdate=!1;
}

function _r(t){
if(0===t.length)return-1/0;
for(var e=t[0],n=1,r=t.length;n<r;++n){t[n]>e&&(e=t[n]);}
return e;
}
lr.prototype=Object.assign(Object.create(e.prototype),{
constructor:lr,
isMaterial:!0,
onBeforeCompile:function onBeforeCompile(){},
setValues:function setValues(t){
if(void 0!==t)
for(var e in t){
var n=t[e];
if(void 0!==n){
if("shading"!==e){
var r=this[e];
void 0!==r?r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n:console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.");
}else console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=1===n;}else
console.warn("THREE.Material: '"+e+"' parameter is undefined.");
}
},
toJSON:function toJSON(t){
var e=void 0===t||"string"==typeof t;
e&&(t={
textures:{},
images:{}});

var n={
metadata:{
version:4.5,
type:"Material",
generator:"Material.toJSON"}};



function r(t){
var e=[];
for(var n in t){
var r=t[n];
delete r.metadata,e.push(r);
}
return e;
}
if(n.uuid=this.uuid,n.type=this.type,""!==this.name&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),void 0!==this.roughness&&(n.roughness=this.roughness),void 0!==this.metalness&&(n.metalness=this.metalness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&1!==this.emissiveIntensity&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),void 0!==this.shininess&&(n.shininess=this.shininess),void 0!==this.clearcoat&&(n.clearcoat=this.clearcoat),void 0!==this.clearcoatRoughness&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,n.reflectivity=this.reflectivity,n.refractionRatio=this.refractionRatio,void 0!==this.combine&&(n.combine=this.combine),void 0!==this.envMapIntensity&&(n.envMapIntensity=this.envMapIntensity)),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),void 0!==this.size&&(n.size=this.size),void 0!==this.sizeAttenuation&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==x&&(n.blending=this.blending),!0===this.flatShading&&(n.flatShading=this.flatShading),this.side!==u&&(n.side=this.side),this.vertexColors!==f&&(n.vertexColors=this.vertexColors),this.opacity<1&&(n.opacity=this.opacity),!0===this.transparent&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.stencilWrite=this.stencilWrite,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilMask=this.stencilMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation&&0!==this.rotation&&(n.rotation=this.rotation),!0===this.polygonOffset&&(n.polygonOffset=!0),0!==this.polygonOffsetFactor&&(n.polygonOffsetFactor=this.polygonOffsetFactor),0!==this.polygonOffsetUnits&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth&&1!==this.linewidth&&(n.linewidth=this.linewidth),void 0!==this.dashSize&&(n.dashSize=this.dashSize),void 0!==this.gapSize&&(n.gapSize=this.gapSize),void 0!==this.scale&&(n.scale=this.scale),!0===this.dithering&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),!0===this.premultipliedAlpha&&(n.premultipliedAlpha=this.premultipliedAlpha),!0===this.wireframe&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),"round"!==this.wireframeLinecap&&(n.wireframeLinecap=this.wireframeLinecap),"round"!==this.wireframeLinejoin&&(n.wireframeLinejoin=this.wireframeLinejoin),!0===this.morphTargets&&(n.morphTargets=!0),!0===this.morphNormals&&(n.morphNormals=!0),!0===this.skinning&&(n.skinning=!0),!1===this.visible&&(n.visible=!1),!1===this.toneMapped&&(n.toneMapped=!1),"{}"!==JSON.stringify(this.userData)&&(n.userData=this.userData),e){
var i=r(t.textures),
a=r(t.images);
i.length>0&&(n.textures=i),a.length>0&&(n.images=a);
}
return n;
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
this.name=t.name,this.fog=t.fog,this.lights=t.lights,this.blending=t.blending,this.side=t.side,this.flatShading=t.flatShading,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWrite=t.stencilWrite,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilMask=t.stencilMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.premultipliedAlpha=t.premultipliedAlpha,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this.clipShadows=t.clipShadows,this.clipIntersection=t.clipIntersection;
var e=t.clippingPlanes,
n=null;
if(null!==e){
var r=e.length;
n=new Array(r);
for(var i=0;i!==r;++i){n[i]=e[i].clone();}
}
return this.clippingPlanes=n,this.shadowSide=t.shadowSide,this;
},
dispose:function dispose(){
this.dispatchEvent({
type:"dispose"});

}}),
hr.prototype=Object.create(lr.prototype),hr.prototype.constructor=hr,hr.prototype.isMeshBasicMaterial=!0,hr.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this;
},Object.defineProperty(ur.prototype,"needsUpdate",{
set:function set(t){
!0===t&&this.version++;
}}),
Object.assign(ur.prototype,{
isBufferAttribute:!0,
onUploadCallback:function onUploadCallback(){},
setArray:function setArray(t){
if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
return this.count=void 0!==t?t.length/this.itemSize:0,this.array=t,this;
},
setDynamic:function setDynamic(t){
return this.dynamic=t,this;
},
copy:function copy(t){
return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.dynamic=t.dynamic,this;
},
copyAt:function copyAt(t,e,n){
t*=this.itemSize,n*=e.itemSize;
for(var r=0,i=this.itemSize;r<i;r++){this.array[t+r]=e.array[n+r];}
return this;
},
copyArray:function copyArray(t){
return this.array.set(t),this;
},
copyColorsArray:function copyColorsArray(t){
for(var e=this.array,n=0,r=0,i=t.length;r<i;r++){
var a=t[r];
void 0===a&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",r),a=new rr()),e[n++]=a.r,e[n++]=a.g,e[n++]=a.b;
}
return this;
},
copyVector2sArray:function copyVector2sArray(t){
for(var e=this.array,n=0,r=0,i=t.length;r<i;r++){
var a=t[r];
void 0===a&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",r),a=new Ce()),e[n++]=a.x,e[n++]=a.y;
}
return this;
},
copyVector3sArray:function copyVector3sArray(t){
for(var e=this.array,n=0,r=0,i=t.length;r<i;r++){
var a=t[r];
void 0===a&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",r),a=new Ie()),e[n++]=a.x,e[n++]=a.y,e[n++]=a.z;
}
return this;
},
copyVector4sArray:function copyVector4sArray(t){
for(var e=this.array,n=0,r=0,i=t.length;r<i;r++){
var a=t[r];
void 0===a&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",r),a=new Ve()),e[n++]=a.x,e[n++]=a.y,e[n++]=a.z,e[n++]=a.w;
}
return this;
},
set:function set(t,e){
return void 0===e&&(e=0),this.array.set(t,e),this;
},
getX:function getX(t){
return this.array[t*this.itemSize];
},
setX:function setX(t,e){
return this.array[t*this.itemSize]=e,this;
},
getY:function getY(t){
return this.array[t*this.itemSize+1];
},
setY:function setY(t,e){
return this.array[t*this.itemSize+1]=e,this;
},
getZ:function getZ(t){
return this.array[t*this.itemSize+2];
},
setZ:function setZ(t,e){
return this.array[t*this.itemSize+2]=e,this;
},
getW:function getW(t){
return this.array[t*this.itemSize+3];
},
setW:function setW(t,e){
return this.array[t*this.itemSize+3]=e,this;
},
setXY:function setXY(t,e,n){
return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this;
},
setXYZ:function setXYZ(t,e,n,r){
return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this;
},
setXYZW:function setXYZW(t,e,n,r,i){
return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=i,this;
},
onUpload:function onUpload(t){
return this.onUploadCallback=t,this;
},
clone:function clone(){
return new this.constructor(this.array,this.itemSize).copy(this);
},
toJSON:function toJSON(){
return{
itemSize:this.itemSize,
type:this.array.constructor.name,
array:Array.prototype.slice.call(this.array),
normalized:this.normalized};

}}),
pr.prototype=Object.create(ur.prototype),pr.prototype.constructor=pr,dr.prototype=Object.create(ur.prototype),dr.prototype.constructor=dr,fr.prototype=Object.create(ur.prototype),fr.prototype.constructor=fr,mr.prototype=Object.create(ur.prototype),mr.prototype.constructor=mr,vr.prototype=Object.create(ur.prototype),vr.prototype.constructor=vr,gr.prototype=Object.create(ur.prototype),gr.prototype.constructor=gr,yr.prototype=Object.create(ur.prototype),yr.prototype.constructor=yr,xr.prototype=Object.create(ur.prototype),xr.prototype.constructor=xr,br.prototype=Object.create(ur.prototype),br.prototype.constructor=br,Object.assign(wr.prototype,{
computeGroups:function computeGroups(t){
for(var e,n=[],r=void 0,i=t.faces,a=0;a<i.length;a++){
var o=i[a];
o.materialIndex!==r&&(r=o.materialIndex,void 0!==e&&(e.count=3*a-e.start,n.push(e)),e={
start:3*a,
materialIndex:r});

}
void 0!==e&&(e.count=3*a-e.start,n.push(e)),this.groups=n;
},
fromGeometry:function fromGeometry(t){
var e,n=t.faces,
r=t.vertices,
i=t.faceVertexUvs,
a=i[0]&&i[0].length>0,
o=i[1]&&i[1].length>0,
s=t.morphTargets,
c=s.length;
if(c>0){
e=[];
for(var l=0;l<c;l++){e[l]={
name:s[l].name,
data:[]};}

this.morphTargets.position=e;
}
var h,u=t.morphNormals,
p=u.length;
if(p>0){
for(h=[],l=0;l<p;l++){h[l]={
name:u[l].name,
data:[]};}

this.morphTargets.normal=h;
}
var d=t.skinIndices,
f=t.skinWeights,
m=d.length===r.length,
v=f.length===r.length;
for(r.length>0&&0===n.length&&console.error("THREE.DirectGeometry: Faceless geometries are not supported."),l=0;l<n.length;l++){
var g=n[l];
this.vertices.push(r[g.a],r[g.b],r[g.c]);
var y=g.vertexNormals;
if(3===y.length)this.normals.push(y[0],y[1],y[2]);else
{
var x=g.normal;
this.normals.push(x,x,x);
}
var b,w=g.vertexColors;
if(3===w.length)this.colors.push(w[0],w[1],w[2]);else
{
var _=g.color;
this.colors.push(_,_,_);
}!0===a&&(void 0!==(b=i[0][l])?this.uvs.push(b[0],b[1],b[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ",l),this.uvs.push(new Ce(),new Ce(),new Ce()))),!0===o&&(void 0!==(b=i[1][l])?this.uvs2.push(b[0],b[1],b[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ",l),this.uvs2.push(new Ce(),new Ce(),new Ce())));
for(var M=0;M<c;M++){
var S=s[M].vertices;
e[M].data.push(S[g.a],S[g.b],S[g.c]);
}
for(M=0;M<p;M++){
var T=u[M].vertexNormals[l];
h[M].data.push(T.a,T.b,T.c);
}
m&&this.skinIndices.push(d[g.a],d[g.b],d[g.c]),v&&this.skinWeights.push(f[g.a],f[g.b],f[g.c]);
}
return this.computeGroups(t),this.verticesNeedUpdate=t.verticesNeedUpdate,this.normalsNeedUpdate=t.normalsNeedUpdate,this.colorsNeedUpdate=t.colorsNeedUpdate,this.uvsNeedUpdate=t.uvsNeedUpdate,this.groupsNeedUpdate=t.groupsNeedUpdate,null!==t.boundingSphere&&(this.boundingSphere=t.boundingSphere.clone()),null!==t.boundingBox&&(this.boundingBox=t.boundingBox.clone()),this;
}});

var Mr=1,
Sr=new Ke(),
Tr=new gn(),
Er=new Ie(),
Ar=new Cn(),
Lr=new Cn(),
Rr=new Ie();

function Pr(){
Object.defineProperty(this,"id",{
value:Mr+=2}),
this.uuid=Pe.generateUUID(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={
start:0,
count:1/0},
this.userData={};
}
Pr.prototype=Object.assign(Object.create(e.prototype),{
constructor:Pr,
isBufferGeometry:!0,
getIndex:function getIndex(){
return this.index;
},
setIndex:function setIndex(t){
Array.isArray(t)?this.index=new(_r(t)>65535?yr:vr)(t,1):this.index=t;
},
addAttribute:function addAttribute(t,e){
return e&&e.isBufferAttribute||e&&e.isInterleavedBufferAttribute?"index"===t?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(e),this):(this.attributes[t]=e,this):(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.addAttribute(t,new ur(arguments[1],arguments[2])));
},
getAttribute:function getAttribute(t){
return this.attributes[t];
},
removeAttribute:function removeAttribute(t){
return delete this.attributes[t],this;
},
addGroup:function addGroup(t,e,n){
this.groups.push({
start:t,
count:e,
materialIndex:void 0!==n?n:0});

},
clearGroups:function clearGroups(){
this.groups=[];
},
setDrawRange:function setDrawRange(t,e){
this.drawRange.start=t,this.drawRange.count=e;
},
applyMatrix:function applyMatrix(t){
var e=this.attributes.position;
void 0!==e&&(t.applyToBufferAttribute(e),e.needsUpdate=!0);
var n=this.attributes.normal;
void 0!==n&&(new Fe().getNormalMatrix(t).applyToBufferAttribute(n),n.needsUpdate=!0);
var r=this.attributes.tangent;
return void 0!==r&&(new Fe().getNormalMatrix(t).applyToBufferAttribute(r),r.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this;
},
rotateX:function rotateX(t){
return Sr.makeRotationX(t),this.applyMatrix(Sr),this;
},
rotateY:function rotateY(t){
return Sr.makeRotationY(t),this.applyMatrix(Sr),this;
},
rotateZ:function rotateZ(t){
return Sr.makeRotationZ(t),this.applyMatrix(Sr),this;
},
translate:function translate(t,e,n){
return Sr.makeTranslation(t,e,n),this.applyMatrix(Sr),this;
},
scale:function scale(t,e,n){
return Sr.makeScale(t,e,n),this.applyMatrix(Sr),this;
},
lookAt:function lookAt(t){
return Tr.lookAt(t),Tr.updateMatrix(),this.applyMatrix(Tr.matrix),this;
},
center:function center(){
return this.computeBoundingBox(),this.boundingBox.getCenter(Er).negate(),this.translate(Er.x,Er.y,Er.z),this;
},
setFromObject:function setFromObject(t){
var e=t.geometry;
if(t.isPoints||t.isLine){
var n=new xr(3*e.vertices.length,3),
r=new xr(3*e.colors.length,3);
if(this.addAttribute("position",n.copyVector3sArray(e.vertices)),this.addAttribute("color",r.copyColorsArray(e.colors)),e.lineDistances&&e.lineDistances.length===e.vertices.length){
var i=new xr(e.lineDistances.length,1);
this.addAttribute("lineDistance",i.copyArray(e.lineDistances));
}
null!==e.boundingSphere&&(this.boundingSphere=e.boundingSphere.clone()),null!==e.boundingBox&&(this.boundingBox=e.boundingBox.clone());
}else t.isMesh&&e&&e.isGeometry&&this.fromGeometry(e);
return this;
},
setFromPoints:function setFromPoints(t){
for(var e=[],n=0,r=t.length;n<r;n++){
var i=t[n];
e.push(i.x,i.y,i.z||0);
}
return this.addAttribute("position",new xr(e,3)),this;
},
updateFromObject:function updateFromObject(t){
var e,n=t.geometry;
if(t.isMesh){
var r=n.__directGeometry;
if(!0===n.elementsNeedUpdate&&(r=void 0,n.elementsNeedUpdate=!1),void 0===r)return this.fromGeometry(n);
r.verticesNeedUpdate=n.verticesNeedUpdate,r.normalsNeedUpdate=n.normalsNeedUpdate,r.colorsNeedUpdate=n.colorsNeedUpdate,r.uvsNeedUpdate=n.uvsNeedUpdate,r.groupsNeedUpdate=n.groupsNeedUpdate,n.verticesNeedUpdate=!1,n.normalsNeedUpdate=!1,n.colorsNeedUpdate=!1,n.uvsNeedUpdate=!1,n.groupsNeedUpdate=!1,n=r;
}
return!0===n.verticesNeedUpdate&&(void 0!==(e=this.attributes.position)&&(e.copyVector3sArray(n.vertices),e.needsUpdate=!0),n.verticesNeedUpdate=!1),!0===n.normalsNeedUpdate&&(void 0!==(e=this.attributes.normal)&&(e.copyVector3sArray(n.normals),e.needsUpdate=!0),n.normalsNeedUpdate=!1),!0===n.colorsNeedUpdate&&(void 0!==(e=this.attributes.color)&&(e.copyColorsArray(n.colors),e.needsUpdate=!0),n.colorsNeedUpdate=!1),n.uvsNeedUpdate&&(void 0!==(e=this.attributes.uv)&&(e.copyVector2sArray(n.uvs),e.needsUpdate=!0),n.uvsNeedUpdate=!1),n.lineDistancesNeedUpdate&&(void 0!==(e=this.attributes.lineDistance)&&(e.copyArray(n.lineDistances),e.needsUpdate=!0),n.lineDistancesNeedUpdate=!1),n.groupsNeedUpdate&&(n.computeGroups(t.geometry),this.groups=n.groups,n.groupsNeedUpdate=!1),this;
},
fromGeometry:function fromGeometry(t){
return t.__directGeometry=new wr().fromGeometry(t),this.fromDirectGeometry(t.__directGeometry);
},
fromDirectGeometry:function fromDirectGeometry(t){
var e=new Float32Array(3*t.vertices.length);
if(this.addAttribute("position",new ur(e,3).copyVector3sArray(t.vertices)),t.normals.length>0){
var n=new Float32Array(3*t.normals.length);
this.addAttribute("normal",new ur(n,3).copyVector3sArray(t.normals));
}
if(t.colors.length>0){
var r=new Float32Array(3*t.colors.length);
this.addAttribute("color",new ur(r,3).copyColorsArray(t.colors));
}
if(t.uvs.length>0){
var i=new Float32Array(2*t.uvs.length);
this.addAttribute("uv",new ur(i,2).copyVector2sArray(t.uvs));
}
if(t.uvs2.length>0){
var a=new Float32Array(2*t.uvs2.length);
this.addAttribute("uv2",new ur(a,2).copyVector2sArray(t.uvs2));
}
for(var o in this.groups=t.groups,t.morphTargets){
for(var s=[],c=t.morphTargets[o],l=0,h=c.length;l<h;l++){
var u=c[l],
p=new xr(3*u.data.length,3);
p.name=u.name,s.push(p.copyVector3sArray(u.data));
}
this.morphAttributes[o]=s;
}
if(t.skinIndices.length>0){
var d=new xr(4*t.skinIndices.length,4);
this.addAttribute("skinIndex",d.copyVector4sArray(t.skinIndices));
}
if(t.skinWeights.length>0){
var f=new xr(4*t.skinWeights.length,4);
this.addAttribute("skinWeight",f.copyVector4sArray(t.skinWeights));
}
return null!==t.boundingSphere&&(this.boundingSphere=t.boundingSphere.clone()),null!==t.boundingBox&&(this.boundingBox=t.boundingBox.clone()),this;
},
computeBoundingBox:function computeBoundingBox(){
null===this.boundingBox&&(this.boundingBox=new Cn());
var t=this.attributes.position,
e=this.morphAttributes.position;
if(void 0!==t){
if(this.boundingBox.setFromBufferAttribute(t),e)
for(var n=0,r=e.length;n<r;n++){
var i=e[n];
Ar.setFromBufferAttribute(i),this.boundingBox.expandByPoint(Ar.min),this.boundingBox.expandByPoint(Ar.max);
}
}else this.boundingBox.makeEmpty();
(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this);
},
computeBoundingSphere:function computeBoundingSphere(){
null===this.boundingSphere&&(this.boundingSphere=new Nn());
var t=this.attributes.position,
e=this.morphAttributes.position;
if(t){
var n=this.boundingSphere.center;
if(Ar.setFromBufferAttribute(t),e)
for(var r=0,i=e.length;r<i;r++){
var a=e[r];
Lr.setFromBufferAttribute(a),Ar.expandByPoint(Lr.min),Ar.expandByPoint(Lr.max);
}
Ar.getCenter(n);
var o=0;
for(r=0,i=t.count;r<i;r++){Rr.fromBufferAttribute(t,r),o=Math.max(o,n.distanceToSquared(Rr));}
if(e)
for(r=0,i=e.length;r<i;r++){
for(var s=0,c=(a=e[r]).count;s<c;s++){Rr.fromBufferAttribute(a,s),o=Math.max(o,n.distanceToSquared(Rr));}}
this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this);
}
},
computeFaceNormals:function computeFaceNormals(){},
computeVertexNormals:function computeVertexNormals(){
var t=this.index,
e=this.attributes;
if(e.position){
var n=e.position.array;
if(void 0===e.normal)this.addAttribute("normal",new ur(new Float32Array(n.length),3));else

for(var r=e.normal.array,i=0,a=r.length;i<a;i++){r[i]=0;}
var o,s,c,l=e.normal.array,
h=new Ie(),
u=new Ie(),
p=new Ie(),
d=new Ie(),
f=new Ie();
if(t){
var m=t.array;
for(i=0,a=t.count;i<a;i+=3){o=3*m[i+0],s=3*m[i+1],c=3*m[i+2],h.fromArray(n,o),u.fromArray(n,s),p.fromArray(n,c),d.subVectors(p,u),f.subVectors(h,u),d.cross(f),l[o]+=d.x,l[o+1]+=d.y,l[o+2]+=d.z,l[s]+=d.x,l[s+1]+=d.y,l[s+2]+=d.z,l[c]+=d.x,l[c+1]+=d.y,l[c+2]+=d.z;}
}else
for(i=0,a=n.length;i<a;i+=9){h.fromArray(n,i),u.fromArray(n,i+3),p.fromArray(n,i+6),d.subVectors(p,u),f.subVectors(h,u),d.cross(f),l[i]=d.x,l[i+1]=d.y,l[i+2]=d.z,l[i+3]=d.x,l[i+4]=d.y,l[i+5]=d.z,l[i+6]=d.x,l[i+7]=d.y,l[i+8]=d.z;}
this.normalizeNormals(),e.normal.needsUpdate=!0;
}
},
merge:function merge(t,e){
if(t&&t.isBufferGeometry){
void 0===e&&(e=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
var n=this.attributes;
for(var r in n){
if(void 0!==t.attributes[r])
for(var i=n[r].array,a=t.attributes[r],o=a.array,s=a.itemSize*e,c=Math.min(o.length,i.length-s),l=0,h=s;l<c;l++,h++){i[h]=o[l];}}
return this;
}
console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",t);
},
normalizeNormals:function normalizeNormals(){
for(var t=this.attributes.normal,e=0,n=t.count;e<n;e++){Rr.x=t.getX(e),Rr.y=t.getY(e),Rr.z=t.getZ(e),Rr.normalize(),t.setXYZ(e,Rr.x,Rr.y,Rr.z);}
},
toNonIndexed:function toNonIndexed(){
function t(t,e){
for(var n=t.array,r=t.itemSize,i=new n.constructor(e.length*r),a=0,o=0,s=0,c=e.length;s<c;s++){
a=e[s]*r;
for(var l=0;l<r;l++){i[o++]=n[a++];}
}
return new ur(i,r);
}
if(null===this.index)return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."),this;
var e=new Pr(),
n=this.index.array,
r=this.attributes;
for(var i in r){
var a=t(r[i],n);
e.addAttribute(i,a);
}
var o=this.morphAttributes;
for(i in o){
for(var s=[],c=o[i],l=0,h=c.length;l<h;l++){a=t(c[l],n),s.push(a);}
e.morphAttributes[i]=s;
}
for(var u=this.groups,p=(l=0,u.length);l<p;l++){
var d=u[l];
e.addGroup(d.start,d.count,d.materialIndex);
}
return e;
},
toJSON:function toJSON(){
var t={
metadata:{
version:4.5,
type:"BufferGeometry",
generator:"BufferGeometry.toJSON"}};


if(t.uuid=this.uuid,t.type=this.type,""!==this.name&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),void 0!==this.parameters){
var e=this.parameters;
for(var n in e){void 0!==e[n]&&(t[n]=e[n]);}
return t;
}
t.data={
attributes:{}};

var r=this.index;
null!==r&&(t.data.index={
type:r.array.constructor.name,
array:Array.prototype.slice.call(r.array)});

var i=this.attributes;
for(var n in i){
var a=(p=i[n]).toJSON();
""!==p.name&&(a.name=p.name),t.data.attributes[n]=a;
}
var o={},
s=!1;
for(var n in this.morphAttributes){
for(var c=this.morphAttributes[n],l=[],h=0,u=c.length;h<u;h++){
var p;
a=(p=c[h]).toJSON(),""!==p.name&&(a.name=p.name),l.push(a);
}
l.length>0&&(o[n]=l,s=!0);
}
s&&(t.data.morphAttributes=o);
var d=this.groups;
d.length>0&&(t.data.groups=JSON.parse(JSON.stringify(d)));
var f=this.boundingSphere;
return null!==f&&(t.data.boundingSphere={
center:f.center.toArray(),
radius:f.radius}),
t;
},
clone:function clone(){
return new Pr().copy(this);
},
copy:function copy(t){
var e,n,r;
this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=t.name;
var i=t.index;
null!==i&&this.setIndex(i.clone());
var a=t.attributes;
for(e in a){
var o=a[e];
this.addAttribute(e,o.clone());
}
var s=t.morphAttributes;
for(e in s){
var c=[],
l=s[e];
for(n=0,r=l.length;n<r;n++){c.push(l[n].clone());}
this.morphAttributes[e]=c;
}
var h=t.groups;
for(n=0,r=h.length;n<r;n++){
var u=h[n];
this.addGroup(u.start,u.count,u.materialIndex);
}
var p=t.boundingBox;
null!==p&&(this.boundingBox=p.clone());
var d=t.boundingSphere;
return null!==d&&(this.boundingSphere=d.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this;
},
dispose:function dispose(){
this.dispatchEvent({
type:"dispose"});

}});

var Cr=new Ke(),
Or=new Vn(),
Dr=new Nn(),
Nr=new Ie(),
Ir=new Ie(),
zr=new Ie(),
Br=new Ie(),
Fr=new Ie(),
Gr=new Ie(),
Ur=new Ie(),
Hr=new Ie(),
Vr=new Ie(),
jr=new Ce(),
kr=new Ce(),
Wr=new Ce(),
qr=new Ie(),
Xr=new Ie();

function Yr(t,e){
gn.call(this),this.type="Mesh",this.geometry=void 0!==t?t:new Pr(),this.material=void 0!==e?e:new hr({
color:16777215*Math.random()}),
this.drawMode=ue,this.updateMorphTargets();
}

function Jr(t,e,n,r,i,a,o,s){
if(null===(e.side===p?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,e.side!==d,s)))return null;
Xr.copy(s),Xr.applyMatrix4(t.matrixWorld);
var c=n.ray.origin.distanceTo(Xr);
return c<n.near||c>n.far?null:{
distance:c,
point:Xr.clone(),
object:t};

}

function Zr(t,e,n,r,i,a,o,s,c,l,h){
Nr.fromBufferAttribute(i,c),Ir.fromBufferAttribute(i,l),zr.fromBufferAttribute(i,h);
var u=t.morphTargetInfluences;
if(e.morphTargets&&a&&u){
Ur.set(0,0,0),Hr.set(0,0,0),Vr.set(0,0,0);
for(var p=0,d=a.length;p<d;p++){
var f=u[p],
m=a[p];
0!==f&&(Br.fromBufferAttribute(m,c),Fr.fromBufferAttribute(m,l),Gr.fromBufferAttribute(m,h),Ur.addScaledVector(Br.sub(Nr),f),Hr.addScaledVector(Fr.sub(Ir),f),Vr.addScaledVector(Gr.sub(zr),f));
}
Nr.add(Ur),Ir.add(Hr),zr.add(Vr);
}
var v=Jr(t,e,n,r,Nr,Ir,zr,qr);
if(v){
o&&(jr.fromBufferAttribute(o,c),kr.fromBufferAttribute(o,l),Wr.fromBufferAttribute(o,h),v.uv=$n.getUV(qr,Nr,Ir,zr,jr,kr,Wr,new Ce())),s&&(jr.fromBufferAttribute(s,c),kr.fromBufferAttribute(s,l),Wr.fromBufferAttribute(s,h),v.uv2=$n.getUV(qr,Nr,Ir,zr,jr,kr,Wr,new Ce()));
var g=new sr(c,l,h);
$n.getNormal(Nr,Ir,zr,g.normal),v.face=g;
}
return v;
}
Yr.prototype=Object.assign(Object.create(gn.prototype),{
constructor:Yr,
isMesh:!0,
setDrawMode:function setDrawMode(t){
this.drawMode=t;
},
copy:function copy(t){
return gn.prototype.copy.call(this,t),this.drawMode=t.drawMode,void 0!==t.morphTargetInfluences&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),void 0!==t.morphTargetDictionary&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this;
},
updateMorphTargets:function updateMorphTargets(){
var t,e,n,r=this.geometry;
if(r.isBufferGeometry){
var i=r.morphAttributes,
a=Object.keys(i);
if(a.length>0){
var o=i[a[0]];
if(void 0!==o)
for(this.morphTargetInfluences=[],this.morphTargetDictionary={},t=0,e=o.length;t<e;t++){n=o[t].name||String(t),this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=t;}
}
}else{
var s=r.morphTargets;
void 0!==s&&s.length>0&&console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
}
},
raycast:function raycast(t,e){
var n,r=this.geometry,
i=this.material,
a=this.matrixWorld;
if(void 0!==i&&(null===r.boundingSphere&&r.computeBoundingSphere(),Dr.copy(r.boundingSphere),Dr.applyMatrix4(a),!1!==t.ray.intersectsSphere(Dr)&&(Cr.getInverse(a),Or.copy(t.ray).applyMatrix4(Cr),null===r.boundingBox||!1!==Or.intersectsBox(r.boundingBox))))
if(r.isBufferGeometry){
var o,s,c,l,h,u,p,d,f,m=r.index,
v=r.attributes.position,
g=r.morphAttributes.position,
y=r.attributes.uv,
x=r.attributes.uv2,
b=r.groups,
w=r.drawRange;
if(null!==m){
if(Array.isArray(i))
for(l=0,u=b.length;l<u;l++){
for(f=i[(d=b[l]).materialIndex],h=Math.max(d.start,w.start),p=Math.min(d.start+d.count,w.start+w.count);h<p;h+=3){o=m.getX(h),s=m.getX(h+1),c=m.getX(h+2),(n=Zr(this,f,t,Or,v,g,y,x,o,s,c))&&(n.faceIndex=Math.floor(h/3),n.face.materialIndex=d.materialIndex,e.push(n));}}else

for(l=Math.max(0,w.start),u=Math.min(m.count,w.start+w.count);l<u;l+=3){o=m.getX(l),s=m.getX(l+1),c=m.getX(l+2),(n=Zr(this,i,t,Or,v,g,y,x,o,s,c))&&(n.faceIndex=Math.floor(l/3),e.push(n));}}else
if(void 0!==v)
if(Array.isArray(i))
for(l=0,u=b.length;l<u;l++){
for(f=i[(d=b[l]).materialIndex],h=Math.max(d.start,w.start),p=Math.min(d.start+d.count,w.start+w.count);h<p;h+=3){(n=Zr(this,f,t,Or,v,g,y,x,o=h,s=h+1,c=h+2))&&(n.faceIndex=Math.floor(h/3),n.face.materialIndex=d.materialIndex,e.push(n));}}else

for(l=Math.max(0,w.start),u=Math.min(v.count,w.start+w.count);l<u;l+=3){(n=Zr(this,i,t,Or,v,g,y,x,o=l,s=l+1,c=l+2))&&(n.faceIndex=Math.floor(l/3),e.push(n));}
}else if(r.isGeometry){
var _,M,S,T,E=Array.isArray(i),
A=r.vertices,
L=r.faces,
R=r.faceVertexUvs[0];
R.length>0&&(T=R);
for(var P=0,C=L.length;P<C;P++){
var O=L[P],
D=E?i[O.materialIndex]:i;
if(void 0!==D&&(_=A[O.a],M=A[O.b],S=A[O.c],n=Jr(this,D,t,Or,_,M,S,qr))){
if(T&&T[P]){
var N=T[P];
jr.copy(N[0]),kr.copy(N[1]),Wr.copy(N[2]),n.uv=$n.getUV(qr,_,M,S,jr,kr,Wr,new Ce());
}
n.face=O,n.faceIndex=P,e.push(n);
}
}
}
},
clone:function clone(){
return new this.constructor(this.geometry,this.material).copy(this);
}});

var Qr=0,
Kr=new Ke(),
$r=new gn(),
ti=new Ie();

function ei(){
Object.defineProperty(this,"id",{
value:Qr+=2}),
this.uuid=Pe.generateUUID(),this.name="",this.type="Geometry",this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[
[]],
this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.elementsNeedUpdate=!1,this.verticesNeedUpdate=!1,this.uvsNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.lineDistancesNeedUpdate=!1,this.groupsNeedUpdate=!1;
}

function ni(t,e,n,r,i,a){
ei.call(this),this.type="BoxGeometry",this.parameters={
width:t,
height:e,
depth:n,
widthSegments:r,
heightSegments:i,
depthSegments:a},
this.fromBufferGeometry(new ri(t,e,n,r,i,a)),this.mergeVertices();
}

function ri(t,e,n,r,i,a){
Pr.call(this),this.type="BoxBufferGeometry",this.parameters={
width:t,
height:e,
depth:n,
widthSegments:r,
heightSegments:i,
depthSegments:a};

var o=this;
t=t||1,e=e||1,n=n||1,r=Math.floor(r)||1,i=Math.floor(i)||1,a=Math.floor(a)||1;
var s=[],
c=[],
l=[],
h=[],
u=0,
p=0;

function d(t,e,n,r,i,a,d,f,m,v,g){
var y,x,b=a/m,
w=d/v,
_=a/2,
M=d/2,
S=f/2,
T=m+1,
E=v+1,
A=0,
L=0,
R=new Ie();
for(x=0;x<E;x++){
var P=x*w-M;
for(y=0;y<T;y++){
var C=y*b-_;
R[t]=C*r,R[e]=P*i,R[n]=S,c.push(R.x,R.y,R.z),R[t]=0,R[e]=0,R[n]=f>0?1:-1,l.push(R.x,R.y,R.z),h.push(y/m),h.push(1-x/v),A+=1;
}
}
for(x=0;x<v;x++){
for(y=0;y<m;y++){
var O=u+y+T*x,
D=u+y+T*(x+1),
N=u+(y+1)+T*(x+1),
I=u+(y+1)+T*x;
s.push(O,D,I),s.push(D,N,I),L+=6;
}}
o.addGroup(p,L,g),p+=L,u+=A;
}
d("z","y","x",-1,-1,n,e,t,a,i,0),d("z","y","x",1,-1,n,e,-t,a,i,1),d("x","z","y",1,1,t,n,e,r,a,2),d("x","z","y",1,-1,t,n,-e,r,a,3),d("x","y","z",1,-1,t,e,n,r,i,4),d("x","y","z",-1,-1,t,e,-n,r,i,5),this.setIndex(s),this.addAttribute("position",new xr(c,3)),this.addAttribute("normal",new xr(l,3)),this.addAttribute("uv",new xr(h,2));
}

function ii(t){
var e={};
for(var n in t){
for(var r in e[n]={},t[n]){
var i=t[n][r];
i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture)?e[n][r]=i.clone():Array.isArray(i)?e[n][r]=i.slice():e[n][r]=i;
}}
return e;
}

function ai(t){
for(var e={},n=0;n<t.length;n++){
var r=ii(t[n]);
for(var i in r){e[i]=r[i];}
}
return e;
}
ei.prototype=Object.assign(Object.create(e.prototype),{
constructor:ei,
isGeometry:!0,
applyMatrix:function applyMatrix(t){
for(var e=new Fe().getNormalMatrix(t),n=0,r=this.vertices.length;n<r;n++){this.vertices[n].applyMatrix4(t);}
for(n=0,r=this.faces.length;n<r;n++){
var i=this.faces[n];
i.normal.applyMatrix3(e).normalize();
for(var a=0,o=i.vertexNormals.length;a<o;a++){i.vertexNormals[a].applyMatrix3(e).normalize();}
}
return null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this.verticesNeedUpdate=!0,this.normalsNeedUpdate=!0,this;
},
rotateX:function rotateX(t){
return Kr.makeRotationX(t),this.applyMatrix(Kr),this;
},
rotateY:function rotateY(t){
return Kr.makeRotationY(t),this.applyMatrix(Kr),this;
},
rotateZ:function rotateZ(t){
return Kr.makeRotationZ(t),this.applyMatrix(Kr),this;
},
translate:function translate(t,e,n){
return Kr.makeTranslation(t,e,n),this.applyMatrix(Kr),this;
},
scale:function scale(t,e,n){
return Kr.makeScale(t,e,n),this.applyMatrix(Kr),this;
},
lookAt:function lookAt(t){
return $r.lookAt(t),$r.updateMatrix(),this.applyMatrix($r.matrix),this;
},
fromBufferGeometry:function fromBufferGeometry(t){
var e=this,
n=null!==t.index?t.index.array:void 0,
r=t.attributes,
i=r.position.array,
a=void 0!==r.normal?r.normal.array:void 0,
o=void 0!==r.color?r.color.array:void 0,
s=void 0!==r.uv?r.uv.array:void 0,
c=void 0!==r.uv2?r.uv2.array:void 0;
void 0!==c&&(this.faceVertexUvs[1]=[]);
for(var l=0;l<i.length;l+=3){e.vertices.push(new Ie().fromArray(i,l)),void 0!==o&&e.colors.push(new rr().fromArray(o,l));}

function h(t,n,r,i){
var l=void 0===o?[]:[e.colors[t].clone(),e.colors[n].clone(),e.colors[r].clone()],
h=new sr(t,n,r,void 0===a?[]:[new Ie().fromArray(a,3*t),new Ie().fromArray(a,3*n),new Ie().fromArray(a,3*r)],l,i);
e.faces.push(h),void 0!==s&&e.faceVertexUvs[0].push([new Ce().fromArray(s,2*t),new Ce().fromArray(s,2*n),new Ce().fromArray(s,2*r)]),void 0!==c&&e.faceVertexUvs[1].push([new Ce().fromArray(c,2*t),new Ce().fromArray(c,2*n),new Ce().fromArray(c,2*r)]);
}
var u=t.groups;
if(u.length>0)
for(l=0;l<u.length;l++){
for(var p=u[l],d=p.start,f=d,m=d+p.count;f<m;f+=3){void 0!==n?h(n[f],n[f+1],n[f+2],p.materialIndex):h(f,f+1,f+2,p.materialIndex);}}else
if(void 0!==n)
for(l=0;l<n.length;l+=3){h(n[l],n[l+1],n[l+2]);}else

for(l=0;l<i.length/3;l+=3){h(l,l+1,l+2);}
return this.computeFaceNormals(),null!==t.boundingBox&&(this.boundingBox=t.boundingBox.clone()),null!==t.boundingSphere&&(this.boundingSphere=t.boundingSphere.clone()),this;
},
center:function center(){
return this.computeBoundingBox(),this.boundingBox.getCenter(ti).negate(),this.translate(ti.x,ti.y,ti.z),this;
},
normalize:function normalize(){
this.computeBoundingSphere();
var t=this.boundingSphere.center,
e=this.boundingSphere.radius,
n=0===e?1:1/e,
r=new Ke();
return r.set(n,0,0,-n*t.x,0,n,0,-n*t.y,0,0,n,-n*t.z,0,0,0,1),this.applyMatrix(r),this;
},
computeFaceNormals:function computeFaceNormals(){
for(var t=new Ie(),e=new Ie(),n=0,r=this.faces.length;n<r;n++){
var i=this.faces[n],
a=this.vertices[i.a],
o=this.vertices[i.b],
s=this.vertices[i.c];
t.subVectors(s,o),e.subVectors(a,o),t.cross(e),t.normalize(),i.normal.copy(t);
}
},
computeVertexNormals:function computeVertexNormals(t){
var e,n,r,i,a,o;
for(void 0===t&&(t=!0),o=new Array(this.vertices.length),e=0,n=this.vertices.length;e<n;e++){o[e]=new Ie();}
if(t){
var s,c,l,h=new Ie(),
u=new Ie();
for(r=0,i=this.faces.length;r<i;r++){a=this.faces[r],s=this.vertices[a.a],c=this.vertices[a.b],l=this.vertices[a.c],h.subVectors(l,c),u.subVectors(s,c),h.cross(u),o[a.a].add(h),o[a.b].add(h),o[a.c].add(h);}
}else
for(this.computeFaceNormals(),r=0,i=this.faces.length;r<i;r++){o[(a=this.faces[r]).a].add(a.normal),o[a.b].add(a.normal),o[a.c].add(a.normal);}
for(e=0,n=this.vertices.length;e<n;e++){o[e].normalize();}
for(r=0,i=this.faces.length;r<i;r++){
var p=(a=this.faces[r]).vertexNormals;
3===p.length?(p[0].copy(o[a.a]),p[1].copy(o[a.b]),p[2].copy(o[a.c])):(p[0]=o[a.a].clone(),p[1]=o[a.b].clone(),p[2]=o[a.c].clone());
}
this.faces.length>0&&(this.normalsNeedUpdate=!0);
},
computeFlatVertexNormals:function computeFlatVertexNormals(){
var t,e,n;
for(this.computeFaceNormals(),t=0,e=this.faces.length;t<e;t++){
var r=(n=this.faces[t]).vertexNormals;
3===r.length?(r[0].copy(n.normal),r[1].copy(n.normal),r[2].copy(n.normal)):(r[0]=n.normal.clone(),r[1]=n.normal.clone(),r[2]=n.normal.clone());
}
this.faces.length>0&&(this.normalsNeedUpdate=!0);
},
computeMorphNormals:function computeMorphNormals(){
var t,e,n,r,i;
for(n=0,r=this.faces.length;n<r;n++){
for((i=this.faces[n]).__originalFaceNormal?i.__originalFaceNormal.copy(i.normal):i.__originalFaceNormal=i.normal.clone(),i.__originalVertexNormals||(i.__originalVertexNormals=[]),t=0,e=i.vertexNormals.length;t<e;t++){i.__originalVertexNormals[t]?i.__originalVertexNormals[t].copy(i.vertexNormals[t]):i.__originalVertexNormals[t]=i.vertexNormals[t].clone();}}
var a=new ei();
for(a.faces=this.faces,t=0,e=this.morphTargets.length;t<e;t++){
if(!this.morphNormals[t]){
this.morphNormals[t]={},this.morphNormals[t].faceNormals=[],this.morphNormals[t].vertexNormals=[];
var o=this.morphNormals[t].faceNormals,
s=this.morphNormals[t].vertexNormals;
for(n=0,r=this.faces.length;n<r;n++){c=new Ie(),l={
a:new Ie(),
b:new Ie(),
c:new Ie()},
o.push(c),s.push(l);}
}
var c,l,h=this.morphNormals[t];
for(a.vertices=this.morphTargets[t].vertices,a.computeFaceNormals(),a.computeVertexNormals(),n=0,r=this.faces.length;n<r;n++){i=this.faces[n],c=h.faceNormals[n],l=h.vertexNormals[n],c.copy(i.normal),l.a.copy(i.vertexNormals[0]),l.b.copy(i.vertexNormals[1]),l.c.copy(i.vertexNormals[2]);}
}
for(n=0,r=this.faces.length;n<r;n++){(i=this.faces[n]).normal=i.__originalFaceNormal,i.vertexNormals=i.__originalVertexNormals;}
},
computeBoundingBox:function computeBoundingBox(){
null===this.boundingBox&&(this.boundingBox=new Cn()),this.boundingBox.setFromPoints(this.vertices);
},
computeBoundingSphere:function computeBoundingSphere(){
null===this.boundingSphere&&(this.boundingSphere=new Nn()),this.boundingSphere.setFromPoints(this.vertices);
},
merge:function merge(t,e,n){
if(t&&t.isGeometry){
var r,i=this.vertices.length,
a=this.vertices,
o=t.vertices,
s=this.faces,
c=t.faces,
l=this.colors,
h=t.colors;
void 0===n&&(n=0),void 0!==e&&(r=new Fe().getNormalMatrix(e));
for(var u=0,p=o.length;u<p;u++){
var d=o[u].clone();
void 0!==e&&d.applyMatrix4(e),a.push(d);
}
for(u=0,p=h.length;u<p;u++){l.push(h[u].clone());}
for(u=0,p=c.length;u<p;u++){
var f,m,v,g=c[u],
y=g.vertexNormals,
x=g.vertexColors;
(f=new sr(g.a+i,g.b+i,g.c+i)).normal.copy(g.normal),void 0!==r&&f.normal.applyMatrix3(r).normalize();
for(var b=0,w=y.length;b<w;b++){m=y[b].clone(),void 0!==r&&m.applyMatrix3(r).normalize(),f.vertexNormals.push(m);}
for(f.color.copy(g.color),b=0,w=x.length;b<w;b++){v=x[b],f.vertexColors.push(v.clone());}
f.materialIndex=g.materialIndex+n,s.push(f);
}
for(u=0,p=t.faceVertexUvs.length;u<p;u++){
var _=t.faceVertexUvs[u];
for(void 0===this.faceVertexUvs[u]&&(this.faceVertexUvs[u]=[]),b=0,w=_.length;b<w;b++){
for(var M=_[b],S=[],T=0,E=M.length;T<E;T++){S.push(M[T].clone());}
this.faceVertexUvs[u].push(S);
}
}
}else console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.",t);
},
mergeMesh:function mergeMesh(t){
t&&t.isMesh?(t.matrixAutoUpdate&&t.updateMatrix(),this.merge(t.geometry,t.matrix)):console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.",t);
},
mergeVertices:function mergeVertices(){
var t,e,n,r,i,a,o,s,c={},
l=[],
h=[],
u=Math.pow(10,4);
for(n=0,r=this.vertices.length;n<r;n++){t=this.vertices[n],void 0===c[e=Math.round(t.x*u)+"_"+Math.round(t.y*u)+"_"+Math.round(t.z*u)]?(c[e]=n,l.push(this.vertices[n]),h[n]=l.length-1):h[n]=h[c[e]];}
var p=[];
for(n=0,r=this.faces.length;n<r;n++){
(i=this.faces[n]).a=h[i.a],i.b=h[i.b],i.c=h[i.c],a=[i.a,i.b,i.c];
for(var d=0;d<3;d++){
if(a[d]===a[(d+1)%3]){
p.push(n);
break;
}}
}
for(n=p.length-1;n>=0;n--){
var f=p[n];
for(this.faces.splice(f,1),o=0,s=this.faceVertexUvs.length;o<s;o++){this.faceVertexUvs[o].splice(f,1);}
}
var m=this.vertices.length-l.length;
return this.vertices=l,m;
},
setFromPoints:function setFromPoints(t){
this.vertices=[];
for(var e=0,n=t.length;e<n;e++){
var r=t[e];
this.vertices.push(new Ie(r.x,r.y,r.z||0));
}
return this;
},
sortFacesByMaterialIndex:function sortFacesByMaterialIndex(){
for(var t=this.faces,e=t.length,n=0;n<e;n++){t[n]._id=n;}
t.sort(function(t,e){
return t.materialIndex-e.materialIndex;
});
var r,i,a=this.faceVertexUvs[0],
o=this.faceVertexUvs[1];
for(a&&a.length===e&&(r=[]),o&&o.length===e&&(i=[]),n=0;n<e;n++){
var s=t[n]._id;
r&&r.push(a[s]),i&&i.push(o[s]);
}
r&&(this.faceVertexUvs[0]=r),i&&(this.faceVertexUvs[1]=i);
},
toJSON:function toJSON(){
var t={
metadata:{
version:4.5,
type:"Geometry",
generator:"Geometry.toJSON"}};


if(t.uuid=this.uuid,t.type=this.type,""!==this.name&&(t.name=this.name),void 0!==this.parameters){
var e=this.parameters;
for(var n in e){void 0!==e[n]&&(t[n]=e[n]);}
return t;
}
for(var r=[],i=0;i<this.vertices.length;i++){
var a=this.vertices[i];
r.push(a.x,a.y,a.z);
}
var o=[],
s=[],
c={},
l=[],
h={},
u=[],
p={};
for(i=0;i<this.faces.length;i++){
var d=this.faces[i],
f=void 0!==this.faceVertexUvs[0][i],
m=d.normal.length()>0,
v=d.vertexNormals.length>0,
g=1!==d.color.r||1!==d.color.g||1!==d.color.b,
y=d.vertexColors.length>0,
x=0;
if(x=M(x,0,0),x=M(x,1,!0),x=M(x,2,!1),x=M(x,3,f),x=M(x,4,m),x=M(x,5,v),x=M(x,6,g),x=M(x,7,y),o.push(x),o.push(d.a,d.b,d.c),o.push(d.materialIndex),f){
var b=this.faceVertexUvs[0][i];
o.push(E(b[0]),E(b[1]),E(b[2]));
}
if(m&&o.push(S(d.normal)),v){
var w=d.vertexNormals;
o.push(S(w[0]),S(w[1]),S(w[2]));
}
if(g&&o.push(T(d.color)),y){
var _=d.vertexColors;
o.push(T(_[0]),T(_[1]),T(_[2]));
}
}

function M(t,e,n){
return n?t|1<<e:t&~(1<<e);
}

function S(t){
var e=t.x.toString()+t.y.toString()+t.z.toString();
return void 0!==c[e]?c[e]:(c[e]=s.length/3,s.push(t.x,t.y,t.z),c[e]);
}

function T(t){
var e=t.r.toString()+t.g.toString()+t.b.toString();
return void 0!==h[e]?h[e]:(h[e]=l.length,l.push(t.getHex()),h[e]);
}

function E(t){
var e=t.x.toString()+t.y.toString();
return void 0!==p[e]?p[e]:(p[e]=u.length/2,u.push(t.x,t.y),p[e]);
}
return t.data={},t.data.vertices=r,t.data.normals=s,l.length>0&&(t.data.colors=l),u.length>0&&(t.data.uvs=[u]),t.data.faces=o,t;
},
clone:function clone(){
return new ei().copy(this);
},
copy:function copy(t){
var e,n,r,i,a,o;
this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[
[]],
this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.name=t.name;
var s=t.vertices;
for(e=0,n=s.length;e<n;e++){this.vertices.push(s[e].clone());}
var c=t.colors;
for(e=0,n=c.length;e<n;e++){this.colors.push(c[e].clone());}
var l=t.faces;
for(e=0,n=l.length;e<n;e++){this.faces.push(l[e].clone());}
for(e=0,n=t.faceVertexUvs.length;e<n;e++){
var h=t.faceVertexUvs[e];
for(void 0===this.faceVertexUvs[e]&&(this.faceVertexUvs[e]=[]),r=0,i=h.length;r<i;r++){
var u=h[r],
p=[];
for(a=0,o=u.length;a<o;a++){
var d=u[a];
p.push(d.clone());
}
this.faceVertexUvs[e].push(p);
}
}
var f=t.morphTargets;
for(e=0,n=f.length;e<n;e++){
var m={};
if(m.name=f[e].name,void 0!==f[e].vertices)
for(m.vertices=[],r=0,i=f[e].vertices.length;r<i;r++){m.vertices.push(f[e].vertices[r].clone());}
if(void 0!==f[e].normals)
for(m.normals=[],r=0,i=f[e].normals.length;r<i;r++){m.normals.push(f[e].normals[r].clone());}
this.morphTargets.push(m);
}
var v=t.morphNormals;
for(e=0,n=v.length;e<n;e++){
var g={};
if(void 0!==v[e].vertexNormals)
for(g.vertexNormals=[],r=0,i=v[e].vertexNormals.length;r<i;r++){
var y=v[e].vertexNormals[r],
x={};
x.a=y.a.clone(),x.b=y.b.clone(),x.c=y.c.clone(),g.vertexNormals.push(x);
}
if(void 0!==v[e].faceNormals)
for(g.faceNormals=[],r=0,i=v[e].faceNormals.length;r<i;r++){g.faceNormals.push(v[e].faceNormals[r].clone());}
this.morphNormals.push(g);
}
var b=t.skinWeights;
for(e=0,n=b.length;e<n;e++){this.skinWeights.push(b[e].clone());}
var w=t.skinIndices;
for(e=0,n=w.length;e<n;e++){this.skinIndices.push(w[e].clone());}
var _=t.lineDistances;
for(e=0,n=_.length;e<n;e++){this.lineDistances.push(_[e]);}
var M=t.boundingBox;
null!==M&&(this.boundingBox=M.clone());
var S=t.boundingSphere;
return null!==S&&(this.boundingSphere=S.clone()),this.elementsNeedUpdate=t.elementsNeedUpdate,this.verticesNeedUpdate=t.verticesNeedUpdate,this.uvsNeedUpdate=t.uvsNeedUpdate,this.normalsNeedUpdate=t.normalsNeedUpdate,this.colorsNeedUpdate=t.colorsNeedUpdate,this.lineDistancesNeedUpdate=t.lineDistancesNeedUpdate,this.groupsNeedUpdate=t.groupsNeedUpdate,this;
},
dispose:function dispose(){
this.dispatchEvent({
type:"dispose"});

}}),
ni.prototype=Object.create(ei.prototype),ni.prototype.constructor=ni,ri.prototype=Object.create(Pr.prototype),ri.prototype.constructor=ri;
var oi={
clone:ii,
merge:ai},

si="void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
ci="void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";

function li(t){
lr.call(this),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=si,this.fragmentShader=ci,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.extensions={
derivatives:!1,
fragDepth:!1,
drawBuffers:!1,
shaderTextureLOD:!1},
this.defaultAttributeValues={
color:[1,1,1],
uv:[0,0],
uv2:[0,0]},
this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,void 0!==t&&(void 0!==t.attributes&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(t));
}

function hi(){
gn.call(this),this.type="Camera",this.matrixWorldInverse=new Ke(),this.projectionMatrix=new Ke(),this.projectionMatrixInverse=new Ke();
}

function ui(t,e,n,r){
hi.call(this),this.type="PerspectiveCamera",this.fov=void 0!==t?t:50,this.zoom=1,this.near=void 0!==n?n:.1,this.far=void 0!==r?r:2e3,this.focus=10,this.aspect=void 0!==e?e:1,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix();
}
li.prototype=Object.create(lr.prototype),li.prototype.constructor=li,li.prototype.isShaderMaterial=!0,li.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ii(t.uniforms),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.lights=t.lights,this.clipping=t.clipping,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this.extensions=t.extensions,this;
},li.prototype.toJSON=function(t){
var e=lr.prototype.toJSON.call(this,t);
for(var n in e.uniforms={},this.uniforms){
var r=this.uniforms[n].value;
r&&r.isTexture?e.uniforms[n]={
type:"t",
value:r.toJSON(t).uuid}:
r&&r.isColor?e.uniforms[n]={
type:"c",
value:r.getHex()}:
r&&r.isVector2?e.uniforms[n]={
type:"v2",
value:r.toArray()}:
r&&r.isVector3?e.uniforms[n]={
type:"v3",
value:r.toArray()}:
r&&r.isVector4?e.uniforms[n]={
type:"v4",
value:r.toArray()}:
r&&r.isMatrix3?e.uniforms[n]={
type:"m3",
value:r.toArray()}:
r&&r.isMatrix4?e.uniforms[n]={
type:"m4",
value:r.toArray()}:
e.uniforms[n]={
value:r};

}
Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;
var i={};
for(var a in this.extensions){!0===this.extensions[a]&&(i[a]=!0);}
return Object.keys(i).length>0&&(e.extensions=i),e;
},hi.prototype=Object.assign(Object.create(gn.prototype),{
constructor:hi,
isCamera:!0,
copy:function copy(t,e){
return gn.prototype.copy.call(this,t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this;
},
getWorldDirection:function getWorldDirection(t){
void 0===t&&(console.warn("THREE.Camera: .getWorldDirection() target is now required"),t=new Ie()),this.updateMatrixWorld(!0);
var e=this.matrixWorld.elements;
return t.set(-e[8],-e[9],-e[10]).normalize();
},
updateMatrixWorld:function updateMatrixWorld(t){
gn.prototype.updateMatrixWorld.call(this,t),this.matrixWorldInverse.getInverse(this.matrixWorld);
},
clone:function clone(){
return new this.constructor().copy(this);
}}),
ui.prototype=Object.assign(Object.create(hi.prototype),{
constructor:ui,
isPerspectiveCamera:!0,
copy:function copy(t,e){
return hi.prototype.copy.call(this,t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=null===t.view?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this;
},
setFocalLength:function setFocalLength(t){
var e=.5*this.getFilmHeight()/t;
this.fov=2*Pe.RAD2DEG*Math.atan(e),this.updateProjectionMatrix();
},
getFocalLength:function getFocalLength(){
var t=Math.tan(.5*Pe.DEG2RAD*this.fov);
return .5*this.getFilmHeight()/t;
},
getEffectiveFOV:function getEffectiveFOV(){
return 2*Pe.RAD2DEG*Math.atan(Math.tan(.5*Pe.DEG2RAD*this.fov)/this.zoom);
},
getFilmWidth:function getFilmWidth(){
return this.filmGauge*Math.min(this.aspect,1);
},
getFilmHeight:function getFilmHeight(){
return this.filmGauge/Math.max(this.aspect,1);
},
setViewOffset:function setViewOffset(t,e,n,r,i,a){
this.aspect=t/e,null===this.view&&(this.view={
enabled:!0,
fullWidth:1,
fullHeight:1,
offsetX:0,
offsetY:0,
width:1,
height:1}),
this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix();
},
clearViewOffset:function clearViewOffset(){
null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix();
},
updateProjectionMatrix:function updateProjectionMatrix(){
var t=this.near,
e=t*Math.tan(.5*Pe.DEG2RAD*this.fov)/this.zoom,
n=2*e,
r=this.aspect*n,
i=-.5*r,
a=this.view;
if(null!==this.view&&this.view.enabled){
var o=a.fullWidth,
s=a.fullHeight;
i+=a.offsetX*r/o,e-=a.offsetY*n/s,r*=a.width/o,n*=a.height/s;
}
var c=this.filmOffset;
0!==c&&(i+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,e,e-n,t,this.far),this.projectionMatrixInverse.getInverse(this.projectionMatrix);
},
toJSON:function toJSON(t){
var e=gn.prototype.toJSON.call(this,t);
return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,null!==this.view&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e;
}});

var pi=90,
di=1;

function fi(t,e,n,r){
gn.call(this),this.type="CubeCamera";
var i=new ui(pi,di,t,e);
i.up.set(0,-1,0),i.lookAt(new Ie(1,0,0)),this.add(i);
var a=new ui(pi,di,t,e);
a.up.set(0,-1,0),a.lookAt(new Ie(-1,0,0)),this.add(a);
var o=new ui(pi,di,t,e);
o.up.set(0,0,1),o.lookAt(new Ie(0,1,0)),this.add(o);
var s=new ui(pi,di,t,e);
s.up.set(0,0,-1),s.lookAt(new Ie(0,-1,0)),this.add(s);
var c=new ui(pi,di,t,e);
c.up.set(0,-1,0),c.lookAt(new Ie(0,0,1)),this.add(c);
var l=new ui(pi,di,t,e);
l.up.set(0,-1,0),l.lookAt(new Ie(0,0,-1)),this.add(l),r=r||{
format:Ot,
magFilter:vt,
minFilter:vt},
this.renderTarget=new mi(n,n,r),this.renderTarget.texture.name="CubeCamera",this.update=function(t,e){
null===this.parent&&this.updateMatrixWorld();
var n=t.getRenderTarget(),
r=this.renderTarget,
h=r.texture.generateMipmaps;
r.texture.generateMipmaps=!1,t.setRenderTarget(r,0),t.render(e,i),t.setRenderTarget(r,1),t.render(e,a),t.setRenderTarget(r,2),t.render(e,o),t.setRenderTarget(r,3),t.render(e,s),t.setRenderTarget(r,4),t.render(e,c),r.texture.generateMipmaps=h,t.setRenderTarget(r,5),t.render(e,l),t.setRenderTarget(n);
},this.clear=function(t,e,n,r){
for(var i=t.getRenderTarget(),a=this.renderTarget,o=0;o<6;o++){t.setRenderTarget(a,o),t.clear(e,n,r);}
t.setRenderTarget(i);
};
}

function mi(t,e,n){
je.call(this,t,e,n);
}

function vi(t,e,n,r,i,a,o,s,c,l,h,u){
He.call(this,null,a,o,s,c,l,r,i,h,u),this.image={
data:t,
width:e,
height:n},
this.magFilter=void 0!==c?c:dt,this.minFilter=void 0!==l?l:dt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1;
}
fi.prototype=Object.create(gn.prototype),fi.prototype.constructor=fi,mi.prototype=Object.create(je.prototype),mi.prototype.constructor=mi,mi.prototype.isWebGLRenderTargetCube=!0,mi.prototype.fromEquirectangularTexture=function(t,e){
this.texture.type=e.type,this.texture.format=e.format,this.texture.encoding=e.encoding;
var n=new yn(),
r={
uniforms:{
tEquirect:{
value:null}},


vertexShader:["varying vec3 vWorldDirection;","vec3 transformDirection( in vec3 dir, in mat4 matrix ) {","\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );","}","void main() {","\tvWorldDirection = transformDirection( position, modelMatrix );","\t#include <begin_vertex>","\t#include <project_vertex>","}"].join("\n"),
fragmentShader:["uniform sampler2D tEquirect;","varying vec3 vWorldDirection;","#define RECIPROCAL_PI 0.31830988618","#define RECIPROCAL_PI2 0.15915494","void main() {","\tvec3 direction = normalize( vWorldDirection );","\tvec2 sampleUV;","\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;","\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;","\tgl_FragColor = texture2D( tEquirect, sampleUV );","}"].join("\n")},

i=new li({
type:"CubemapFromEquirect",
uniforms:ii(r.uniforms),
vertexShader:r.vertexShader,
fragmentShader:r.fragmentShader,
side:p,
blending:g});

i.uniforms.tEquirect.value=e;
var a=new Yr(new ri(5,5,5),i);
n.add(a);
var o=new fi(1,10,1);
return o.renderTarget=this,o.renderTarget.texture.name="CubeCameraTexture",o.update(t,n),a.geometry.dispose(),a.material.dispose(),this;
},vi.prototype=Object.create(He.prototype),vi.prototype.constructor=vi,vi.prototype.isDataTexture=!0;
var gi=new Ie(),
yi=new Ie(),
xi=new Fe();

function bi(t,e){
this.normal=void 0!==t?t:new Ie(1,0,0),this.constant=void 0!==e?e:0;
}
Object.assign(bi.prototype,{
isPlane:!0,
set:function set(t,e){
return this.normal.copy(t),this.constant=e,this;
},
setComponents:function setComponents(t,e,n,r){
return this.normal.set(t,e,n),this.constant=r,this;
},
setFromNormalAndCoplanarPoint:function setFromNormalAndCoplanarPoint(t,e){
return this.normal.copy(t),this.constant=-e.dot(this.normal),this;
},
setFromCoplanarPoints:function setFromCoplanarPoints(t,e,n){
var r=gi.subVectors(n,e).cross(yi.subVectors(t,e)).normalize();
return this.setFromNormalAndCoplanarPoint(r,t),this;
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
return this.normal.copy(t.normal),this.constant=t.constant,this;
},
normalize:function normalize(){
var t=1/this.normal.length();
return this.normal.multiplyScalar(t),this.constant*=t,this;
},
negate:function negate(){
return this.constant*=-1,this.normal.negate(),this;
},
distanceToPoint:function distanceToPoint(t){
return this.normal.dot(t)+this.constant;
},
distanceToSphere:function distanceToSphere(t){
return this.distanceToPoint(t.center)-t.radius;
},
projectPoint:function projectPoint(t,e){
return void 0===e&&(console.warn("THREE.Plane: .projectPoint() target is now required"),e=new Ie()),e.copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t);
},
intersectLine:function intersectLine(t,e){
void 0===e&&(console.warn("THREE.Plane: .intersectLine() target is now required"),e=new Ie());
var n=t.delta(gi),
r=this.normal.dot(n);
if(0===r)return 0===this.distanceToPoint(t.start)?e.copy(t.start):void 0;
var i=-(t.start.dot(this.normal)+this.constant)/r;
return i<0||i>1?void 0:e.copy(n).multiplyScalar(i).add(t.start);
},
intersectsLine:function intersectsLine(t){
var e=this.distanceToPoint(t.start),
n=this.distanceToPoint(t.end);
return e<0&&n>0||n<0&&e>0;
},
intersectsBox:function intersectsBox(t){
return t.intersectsPlane(this);
},
intersectsSphere:function intersectsSphere(t){
return t.intersectsPlane(this);
},
coplanarPoint:function coplanarPoint(t){
return void 0===t&&(console.warn("THREE.Plane: .coplanarPoint() target is now required"),t=new Ie()),t.copy(this.normal).multiplyScalar(-this.constant);
},
applyMatrix4:function applyMatrix4(t,e){
var n=e||xi.getNormalMatrix(t),
r=this.coplanarPoint(gi).applyMatrix4(t),
i=this.normal.applyMatrix3(n).normalize();
return this.constant=-r.dot(i),this;
},
translate:function translate(t){
return this.constant-=t.dot(this.normal),this;
},
equals:function equals(t){
return t.normal.equals(this.normal)&&t.constant===this.constant;
}});

var wi=new Nn(),
_i=new Ie();

function Mi(t,e,n,r,i,a){
this.planes=[void 0!==t?t:new bi(),void 0!==e?e:new bi(),void 0!==n?n:new bi(),void 0!==r?r:new bi(),void 0!==i?i:new bi(),void 0!==a?a:new bi()];
}
Object.assign(Mi.prototype,{
set:function set(t,e,n,r,i,a){
var o=this.planes;
return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this;
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
for(var e=this.planes,n=0;n<6;n++){e[n].copy(t.planes[n]);}
return this;
},
setFromMatrix:function setFromMatrix(t){
var e=this.planes,
n=t.elements,
r=n[0],
i=n[1],
a=n[2],
o=n[3],
s=n[4],
c=n[5],
l=n[6],
h=n[7],
u=n[8],
p=n[9],
d=n[10],
f=n[11],
m=n[12],
v=n[13],
g=n[14],
y=n[15];
return e[0].setComponents(o-r,h-s,f-u,y-m).normalize(),e[1].setComponents(o+r,h+s,f+u,y+m).normalize(),e[2].setComponents(o+i,h+c,f+p,y+v).normalize(),e[3].setComponents(o-i,h-c,f-p,y-v).normalize(),e[4].setComponents(o-a,h-l,f-d,y-g).normalize(),e[5].setComponents(o+a,h+l,f+d,y+g).normalize(),this;
},
intersectsObject:function intersectsObject(t){
var e=t.geometry;
return null===e.boundingSphere&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld),this.intersectsSphere(wi);
},
intersectsSprite:function intersectsSprite(t){
return wi.center.set(0,0,0),wi.radius=.7071067811865476,wi.applyMatrix4(t.matrixWorld),this.intersectsSphere(wi);
},
intersectsSphere:function intersectsSphere(t){
for(var e=this.planes,n=t.center,r=-t.radius,i=0;i<6;i++){
if(e[i].distanceToPoint(n)<r)return!1;}
return!0;
},
intersectsBox:function intersectsBox(t){
for(var e=this.planes,n=0;n<6;n++){
var r=e[n];
if(_i.x=r.normal.x>0?t.max.x:t.min.x,_i.y=r.normal.y>0?t.max.y:t.min.y,_i.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(_i)<0)return!1;
}
return!0;
},
containsPoint:function containsPoint(t){
for(var e=this.planes,n=0;n<6;n++){
if(e[n].distanceToPoint(t)<0)return!1;}
return!0;
}});

var Si={
alphamap_fragment:"#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif",
alphamap_pars_fragment:"#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
alphatest_fragment:"#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif",
aomap_fragment:"#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif",
aomap_pars_fragment:"#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
begin_vertex:"vec3 transformed = vec3( position );",
beginnormal_vertex:"vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",
bsdfs:"vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\treturn Fr * fresnel + F0;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie(float roughness, float NoH) {\n\tfloat invAlpha  = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125);\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\nfloat V_Neubelt(float NoV, float NoL) {\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif",
bumpmap_pars_fragment:"#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",
clipping_planes_fragment:"#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t#endif\n#endif",
clipping_planes_pars_fragment:"#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( STANDARD ) && ! defined( PHONG ) && ! defined( MATCAP )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
clipping_planes_pars_vertex:"#if NUM_CLIPPING_PLANES > 0 && ! defined( STANDARD ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvarying vec3 vViewPosition;\n#endif",
clipping_planes_vertex:"#if NUM_CLIPPING_PLANES > 0 && ! defined( STANDARD ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif",
color_fragment:"#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
color_pars_fragment:"#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
color_pars_vertex:"#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
color_vertex:"#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",
common:"#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}",
cube_uv_reflection_fragment:"#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV( sampler2D envMap, vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif",
defaultnormal_vertex:"vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = normalMatrix * objectTangent;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif",
displacementmap_pars_vertex:"#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",
displacementmap_vertex:"#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif",
emissivemap_fragment:"#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
emissivemap_pars_fragment:"#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",
encodings_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",
encodings_pars_fragment:"\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}",
envmap_fragment:"#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif",
envmap_common_pars_fragment:"#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif",
envmap_pars_fragment:"#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",
envmap_pars_vertex:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",
envmap_physical_pars_fragment:"#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t  vec3 reflectVec = reflect( -viewDir, normal );\n\t\t  reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t#else\n\t\t  vec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryReflectVec, roughness );\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif",
envmap_vertex:"#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",
fog_vertex:"#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif",
fog_pars_vertex:"#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif",
fog_fragment:"#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
fog_pars_fragment:"#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
gradientmap_pars_fragment:"#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif",
lightmap_fragment:"#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif",
lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
lights_lambert_vertex:"vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif",
lights_pars_begin:"uniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif",
lights_phong_fragment:"BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
lights_phong_pars_fragment:"varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)",
lights_physical_fragment:"PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef REFLECTIVITY\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#endif\n#ifdef CLEARCOAT\n\tmaterial.clearcoat = saturate( clearcoat );\tmaterial.clearcoatRoughness = clamp( clearcoatRoughness, 0.04, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheen;\n#endif",
lights_physical_pars_fragment:"struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tccIrradiance *= PI;\n\t\t#endif\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectDiffuse += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
lights_fragment_begin:"\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\n#ifdef CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
lights_fragment_maps:"#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\t#ifdef CLEARCOAT\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\t#endif\n#endif",
lights_fragment_end:"#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif",
logdepthbuf_fragment:"#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
logdepthbuf_pars_fragment:"#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n#endif",
logdepthbuf_pars_vertex:"#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif",
logdepthbuf_vertex:"#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\tgl_Position.z *= gl_Position.w;\n\t#endif\n#endif",
map_fragment:"#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif",
map_pars_fragment:"#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",
map_particle_fragment:"#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif",
map_particle_pars_fragment:"#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif",
metalnessmap_fragment:"float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",
metalnessmap_pars_fragment:"#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
morphnormal_vertex:"#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif",
morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
morphtarget_vertex:"#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif",
normal_fragment_begin:"#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\tbitangent = bitangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;",
normal_fragment_maps:"#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\t#ifdef USE_TANGENT\n\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, normalScale, normalMap );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif",
normalmap_pars_fragment:"#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec2 normalScale, in sampler2D normalMap ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy *= normalScale;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvec3 NfromST = cross( S, T );\n\t\t\tif( dot( NfromST, N ) > 0.0 ) {\n\t\t\t\tS *= -1.0;\n\t\t\t\tT *= -1.0;\n\t\t\t}\n\t\t#else\n\t\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif",
clearcoat_normal_fragment_begin:"#ifdef CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif",
clearcoat_normal_fragment_maps:"#ifdef USE_CLEARCOAT_NORMALMAP\n\t#ifdef USE_TANGENT\n\t\tmat3 vTBN = mat3( tangent, bitangent, clearcoatNormal );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = clearcoatNormalScale * mapN.xy;\n\t\tclearcoatNormal = normalize( vTBN * mapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatNormalScale, clearcoatNormalMap );\n\t#endif\n#endif",
clearcoat_normalmap_pars_fragment:"#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif",
packing:"vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 encodeHalfRGBA ( vec2 v ) {\n\tvec4 encoded = vec4( 0.0 );\n\tconst vec2 offset = vec2( 1.0 / 255.0, 0.0 );\n\tencoded.xy = vec2( v.x, fract( v.x * 255.0 ) );\n\tencoded.xy = encoded.xy - ( encoded.yy * offset );\n\tencoded.zw = vec2( v.y, fract( v.y * 255.0 ) );\n\tencoded.zw = encoded.zw - ( encoded.ww * offset );\n\treturn encoded;\n}\nvec2 decodeHalfRGBA( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}",
premultiplied_alpha_fragment:"#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",
project_vertex:"vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;",
dithering_fragment:"#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
dithering_pars_fragment:"#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",
roughnessmap_fragment:"float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",
roughnessmap_pars_fragment:"#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
shadowmap_pars_fragment:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn decodeHalfRGBA( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = ( floor( uv * size - 0.5 ) + 0.5 ) * texelSize;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif",
shadowmap_pars_vertex:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",
shadowmap_vertex:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif",
shadowmask_pars_fragment:"float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}",
skinbase_vertex:"#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
skinning_pars_vertex:"#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif",
skinning_vertex:"#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
skinnormal_vertex:"#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",
specularmap_fragment:"float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
specularmap_pars_fragment:"#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
tonemapping_fragment:"#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
tonemapping_pars_fragment:"#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );\n}",
uv_pars_fragment:"#ifdef USE_UV\n\tvarying vec2 vUv;\n#endif",
uv_pars_vertex:"#ifdef USE_UV\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif",
uv_vertex:"#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",
uv2_pars_fragment:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
uv2_pars_vertex:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",
uv2_vertex:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",
worldpos_vertex:"#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif",
background_frag:"uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
background_vert:"varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
cube_frag:"uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
cube_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
depth_frag:"#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}",
depth_vert:"#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}",
distanceRGBA_frag:"#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}",
distanceRGBA_vert:"#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",
equirect_frag:"uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}",
equirect_vert:"varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",
linedashed_frag:"uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
linedashed_vert:"uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
meshbasic_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
meshbasic_vert:"#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",
meshlambert_frag:"uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
meshlambert_vert:"#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
meshmatcap_frag:"#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
meshmatcap_vert:"#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",
meshphong_frag:"#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
meshphong_vert:"#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
meshphysical_frag:"#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSPARENCY\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSPARENCY\n\tuniform float transparency;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSPARENCY\n\t\tdiffuseColor.a *= saturate( 1. - transparency + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) );\n\t#endif\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
meshphysical_vert:"#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
normal_frag:"#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}",
normal_vert:"#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",
points_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
points_vert:"uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",
shadow_frag:"uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}",
shadow_vert:"#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
sprite_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}",
sprite_vert:"uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}"},

Ti={
common:{
diffuse:{
value:new rr(15658734)},

opacity:{
value:1},

map:{
value:null},

uvTransform:{
value:new Fe()},

alphaMap:{
value:null}},


specularmap:{
specularMap:{
value:null}},


envmap:{
envMap:{
value:null},

flipEnvMap:{
value:-1},

reflectivity:{
value:1},

refractionRatio:{
value:.98},

maxMipLevel:{
value:0}},


aomap:{
aoMap:{
value:null},

aoMapIntensity:{
value:1}},


lightmap:{
lightMap:{
value:null},

lightMapIntensity:{
value:1}},


emissivemap:{
emissiveMap:{
value:null}},


bumpmap:{
bumpMap:{
value:null},

bumpScale:{
value:1}},


normalmap:{
normalMap:{
value:null},

normalScale:{
value:new Ce(1,1)}},


displacementmap:{
displacementMap:{
value:null},

displacementScale:{
value:1},

displacementBias:{
value:0}},


roughnessmap:{
roughnessMap:{
value:null}},


metalnessmap:{
metalnessMap:{
value:null}},


gradientmap:{
gradientMap:{
value:null}},


fog:{
fogDensity:{
value:25e-5},

fogNear:{
value:1},

fogFar:{
value:2e3},

fogColor:{
value:new rr(16777215)}},


lights:{
ambientLightColor:{
value:[]},

lightProbe:{
value:[]},

directionalLights:{
value:[],
properties:{
direction:{},
color:{},
shadow:{},
shadowBias:{},
shadowRadius:{},
shadowMapSize:{}}},


directionalShadowMap:{
value:[]},

directionalShadowMatrix:{
value:[]},

spotLights:{
value:[],
properties:{
color:{},
position:{},
direction:{},
distance:{},
coneCos:{},
penumbraCos:{},
decay:{},
shadow:{},
shadowBias:{},
shadowRadius:{},
shadowMapSize:{}}},


spotShadowMap:{
value:[]},

spotShadowMatrix:{
value:[]},

pointLights:{
value:[],
properties:{
color:{},
position:{},
decay:{},
distance:{},
shadow:{},
shadowBias:{},
shadowRadius:{},
shadowMapSize:{},
shadowCameraNear:{},
shadowCameraFar:{}}},


pointShadowMap:{
value:[]},

pointShadowMatrix:{
value:[]},

hemisphereLights:{
value:[],
properties:{
direction:{},
skyColor:{},
groundColor:{}}},


rectAreaLights:{
value:[],
properties:{
color:{},
position:{},
width:{},
height:{}}}},



points:{
diffuse:{
value:new rr(15658734)},

opacity:{
value:1},

size:{
value:1},

scale:{
value:1},

map:{
value:null},

uvTransform:{
value:new Fe()}},


sprite:{
diffuse:{
value:new rr(15658734)},

opacity:{
value:1},

center:{
value:new Ce(.5,.5)},

rotation:{
value:0},

map:{
value:null},

uvTransform:{
value:new Fe()}}},



Ei={
basic:{
uniforms:ai([Ti.common,Ti.specularmap,Ti.envmap,Ti.aomap,Ti.lightmap,Ti.fog]),
vertexShader:Si.meshbasic_vert,
fragmentShader:Si.meshbasic_frag},

lambert:{
uniforms:ai([Ti.common,Ti.specularmap,Ti.envmap,Ti.aomap,Ti.lightmap,Ti.emissivemap,Ti.fog,Ti.lights,{
emissive:{
value:new rr(0)}}]),


vertexShader:Si.meshlambert_vert,
fragmentShader:Si.meshlambert_frag},

phong:{
uniforms:ai([Ti.common,Ti.specularmap,Ti.envmap,Ti.aomap,Ti.lightmap,Ti.emissivemap,Ti.bumpmap,Ti.normalmap,Ti.displacementmap,Ti.gradientmap,Ti.fog,Ti.lights,{
emissive:{
value:new rr(0)},

specular:{
value:new rr(1118481)},

shininess:{
value:30}}]),


vertexShader:Si.meshphong_vert,
fragmentShader:Si.meshphong_frag},

standard:{
uniforms:ai([Ti.common,Ti.envmap,Ti.aomap,Ti.lightmap,Ti.emissivemap,Ti.bumpmap,Ti.normalmap,Ti.displacementmap,Ti.roughnessmap,Ti.metalnessmap,Ti.fog,Ti.lights,{
emissive:{
value:new rr(0)},

roughness:{
value:.5},

metalness:{
value:.5},

envMapIntensity:{
value:1}}]),


vertexShader:Si.meshphysical_vert,
fragmentShader:Si.meshphysical_frag},

matcap:{
uniforms:ai([Ti.common,Ti.bumpmap,Ti.normalmap,Ti.displacementmap,Ti.fog,{
matcap:{
value:null}}]),


vertexShader:Si.meshmatcap_vert,
fragmentShader:Si.meshmatcap_frag},

points:{
uniforms:ai([Ti.points,Ti.fog]),
vertexShader:Si.points_vert,
fragmentShader:Si.points_frag},

dashed:{
uniforms:ai([Ti.common,Ti.fog,{
scale:{
value:1},

dashSize:{
value:1},

totalSize:{
value:2}}]),


vertexShader:Si.linedashed_vert,
fragmentShader:Si.linedashed_frag},

depth:{
uniforms:ai([Ti.common,Ti.displacementmap]),
vertexShader:Si.depth_vert,
fragmentShader:Si.depth_frag},

normal:{
uniforms:ai([Ti.common,Ti.bumpmap,Ti.normalmap,Ti.displacementmap,{
opacity:{
value:1}}]),


vertexShader:Si.normal_vert,
fragmentShader:Si.normal_frag},

sprite:{
uniforms:ai([Ti.sprite,Ti.fog]),
vertexShader:Si.sprite_vert,
fragmentShader:Si.sprite_frag},

background:{
uniforms:{
uvTransform:{
value:new Fe()},

t2D:{
value:null}},


vertexShader:Si.background_vert,
fragmentShader:Si.background_frag},

cube:{
uniforms:{
tCube:{
value:null},

tFlip:{
value:-1},

opacity:{
value:1}},


vertexShader:Si.cube_vert,
fragmentShader:Si.cube_frag},

equirect:{
uniforms:{
tEquirect:{
value:null}},


vertexShader:Si.equirect_vert,
fragmentShader:Si.equirect_frag},

distanceRGBA:{
uniforms:ai([Ti.common,Ti.displacementmap,{
referencePosition:{
value:new Ie()},

nearDistance:{
value:1},

farDistance:{
value:1e3}}]),


vertexShader:Si.distanceRGBA_vert,
fragmentShader:Si.distanceRGBA_frag},

shadow:{
uniforms:ai([Ti.lights,Ti.fog,{
color:{
value:new rr(0)},

opacity:{
value:1}}]),


vertexShader:Si.shadow_vert,
fragmentShader:Si.shadow_frag}};



function Ai(){
var t=null,
e=!1,
n=null;

function r(i,a){
!1!==e&&(n(i,a),t.requestAnimationFrame(r));
}
return{
start:function start(){
!0!==e&&null!==n&&(t.requestAnimationFrame(r),e=!0);
},
stop:function stop(){
e=!1;
},
setAnimationLoop:function setAnimationLoop(t){
n=t;
},
setContext:function setContext(e){
t=e;
}};

}

function Li(t){
var e=new WeakMap();
return{
get:function get(t){
return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t);
},
remove:function remove(n){
n.isInterleavedBufferAttribute&&(n=n.data);
var r=e.get(n);
r&&(t.deleteBuffer(r.buffer),e.delete(n));
},
update:function update(n,r){
n.isInterleavedBufferAttribute&&(n=n.data);
var i=e.get(n);
void 0===i?e.set(n,function(e,n){
var r=e.array,
i=e.dynamic?35048:35044,
a=t.createBuffer();
t.bindBuffer(n,a),t.bufferData(n,r,i),e.onUploadCallback();
var o=5126;
return r instanceof Float32Array?o=5126:r instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):r instanceof Uint16Array?o=5123:r instanceof Int16Array?o=5122:r instanceof Uint32Array?o=5125:r instanceof Int32Array?o=5124:r instanceof Int8Array?o=5120:r instanceof Uint8Array&&(o=5121),{
buffer:a,
type:o,
bytesPerElement:r.BYTES_PER_ELEMENT,
version:e.version};

}(n,r)):i.version<n.version&&(function(e,n,r){
var i=n.array,
a=n.updateRange;
t.bindBuffer(r,e),!1===n.dynamic?t.bufferData(r,i,35044):-1===a.count?t.bufferSubData(r,0,i):0===a.count?console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually."):(t.bufferSubData(r,a.offset*i.BYTES_PER_ELEMENT,i.subarray(a.offset,a.offset+a.count)),a.count=-1);
}(i.buffer,n,r),i.version=n.version);
}};

}

function Ri(t,e,n,r){
ei.call(this),this.type="PlaneGeometry",this.parameters={
width:t,
height:e,
widthSegments:n,
heightSegments:r},
this.fromBufferGeometry(new Pi(t,e,n,r)),this.mergeVertices();
}

function Pi(t,e,n,r){
Pr.call(this),this.type="PlaneBufferGeometry",this.parameters={
width:t,
height:e,
widthSegments:n,
heightSegments:r};

var i,a,o=(t=t||1)/2,
s=(e=e||1)/2,
c=Math.floor(n)||1,
l=Math.floor(r)||1,
h=c+1,
u=l+1,
p=t/c,
d=e/l,
f=[],
m=[],
v=[],
g=[];
for(a=0;a<u;a++){
var y=a*d-s;
for(i=0;i<h;i++){
var x=i*p-o;
m.push(x,-y,0),v.push(0,0,1),g.push(i/c),g.push(1-a/l);
}
}
for(a=0;a<l;a++){
for(i=0;i<c;i++){
var b=i+h*a,
w=i+h*(a+1),
_=i+1+h*(a+1),
M=i+1+h*a;
f.push(b,w,M),f.push(w,_,M);
}}
this.setIndex(f),this.addAttribute("position",new xr(m,3)),this.addAttribute("normal",new xr(v,3)),this.addAttribute("uv",new xr(g,2));
}

function Ci(t,e,n,r){
var i,a,o=new rr(0),
s=0,
c=null,
l=0;

function h(t,n){
e.buffers.color.setClear(t.r,t.g,t.b,n,r);
}
return{
getClearColor:function getClearColor(){
return o;
},
setClearColor:function setClearColor(t,e){
o.set(t),h(o,s=void 0!==e?e:1);
},
getClearAlpha:function getClearAlpha(){
return s;
},
setClearAlpha:function setClearAlpha(t){
h(o,s=t);
},
render:function render(e,r,d,f){
var m=r.background,
v=t.vr,
g=v.getSession&&v.getSession();
if(g&&"additive"===g.environmentBlendMode&&(m=null),null===m?(h(o,s),c=null,l=0):m&&m.isColor&&(h(m,1),f=!0,c=null,l=0),(t.autoClear||f)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),m&&(m.isCubeTexture||m.isWebGLRenderTargetCube)){
void 0===a&&((a=new Yr(new ri(1,1,1),new li({
type:"BackgroundCubeMaterial",
uniforms:ii(Ei.cube.uniforms),
vertexShader:Ei.cube.vertexShader,
fragmentShader:Ei.cube.fragmentShader,
side:p,
depthTest:!1,
depthWrite:!1,
fog:!1}))).
geometry.removeAttribute("normal"),a.geometry.removeAttribute("uv"),a.onBeforeRender=function(t,e,n){
this.matrixWorld.copyPosition(n.matrixWorld);
},Object.defineProperty(a.material,"map",{
get:function get(){
return this.uniforms.tCube.value;
}}),
n.update(a));
var y=m.isWebGLRenderTargetCube?m.texture:m;
a.material.uniforms.tCube.value=y,a.material.uniforms.tFlip.value=m.isWebGLRenderTargetCube?1:-1,c===m&&l===y.version||(a.material.needsUpdate=!0,c=m,l=y.version),e.unshift(a,a.geometry,a.material,0,0,null);
}else m&&m.isTexture&&(void 0===i&&((i=new Yr(new Pi(2,2),new li({
type:"BackgroundMaterial",
uniforms:ii(Ei.background.uniforms),
vertexShader:Ei.background.vertexShader,
fragmentShader:Ei.background.fragmentShader,
side:u,
depthTest:!1,
depthWrite:!1,
fog:!1}))).
geometry.removeAttribute("normal"),Object.defineProperty(i.material,"map",{
get:function get(){
return this.uniforms.t2D.value;
}}),
n.update(i)),i.material.uniforms.t2D.value=m,!0===m.matrixAutoUpdate&&m.updateMatrix(),i.material.uniforms.uvTransform.value.copy(m.matrix),c===m&&l===m.version||(i.material.needsUpdate=!0,c=m,l=m.version),e.unshift(i,i.geometry,i.material,0,0,null));
}};

}

function Oi(t,e,n,r){
var i;
this.setMode=function(t){
i=t;
},this.render=function(e,r){
t.drawArrays(i,e,r),n.update(r,i);
},this.renderInstances=function(a,o,s){
var c,l;
if(r.isWebGL2)c=t,l="drawArraysInstanced";else
if(l="drawArraysInstancedANGLE",null===(c=e.get("ANGLE_instanced_arrays")))return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
c[l](i,o,s,a.maxInstancedCount),n.update(s,i,a.maxInstancedCount);
};
}

function Di(t,e,n){
var r;

function i(e){
if("highp"===e){
if(t.getShaderPrecisionFormat(35633,36338).precision>0&&t.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";
e="mediump";
}
return"mediump"===e&&t.getShaderPrecisionFormat(35633,36337).precision>0&&t.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp";
}
var a="undefined"!=typeof WebGL2RenderingContext&&t instanceof WebGL2RenderingContext,
o=void 0!==n.precision?n.precision:"highp",
s=i(o);
s!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",s,"instead."),o=s);
var c=!0===n.logarithmicDepthBuffer,
l=t.getParameter(34930),
h=t.getParameter(35660),
u=t.getParameter(3379),
p=t.getParameter(34076),
d=t.getParameter(34921),
f=t.getParameter(36347),
m=t.getParameter(36348),
v=t.getParameter(36349),
g=h>0,
y=a||!!e.get("OES_texture_float");
return{
isWebGL2:a,
getMaxAnisotropy:function getMaxAnisotropy(){
if(void 0!==r)return r;
var n=e.get("EXT_texture_filter_anisotropic");
return r=null!==n?t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT):0;
},
getMaxPrecision:i,
precision:o,
logarithmicDepthBuffer:c,
maxTextures:l,
maxVertexTextures:h,
maxTextureSize:u,
maxCubemapSize:p,
maxAttributes:d,
maxVertexUniforms:f,
maxVaryings:m,
maxFragmentUniforms:v,
vertexTextures:g,
floatFragmentTextures:y,
floatVertexTextures:g&&y,
maxSamples:a?t.getParameter(36183):0};

}

function Ni(){
var t=this,
e=null,
n=0,
r=!1,
i=!1,
a=new bi(),
o=new Fe(),
s={
value:null,
needsUpdate:!1};


function c(){
s.value!==e&&(s.value=e,s.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0;
}

function l(e,n,r,i){
var c=null!==e?e.length:0,
l=null;
if(0!==c){
if(l=s.value,!0!==i||null===l){
var h=r+4*c,
u=n.matrixWorldInverse;
o.getNormalMatrix(u),(null===l||l.length<h)&&(l=new Float32Array(h));
for(var p=0,d=r;p!==c;++p,d+=4){a.copy(e[p]).applyMatrix4(u,o),a.normal.toArray(l,d),l[d+3]=a.constant;}
}
s.value=l,s.needsUpdate=!0;
}
return t.numPlanes=c,l;
}
this.uniform=s,this.numPlanes=0,this.numIntersection=0,this.init=function(t,i,a){
var o=0!==t.length||i||0!==n||r;
return r=i,e=l(t,a,0),n=t.length,o;
},this.beginShadows=function(){
i=!0,l(null);
},this.endShadows=function(){
i=!1,c();
},this.setState=function(t,a,o,h,u,p){
if(!r||null===t||0===t.length||i&&!o)i?l(null):c();else
{
var d=i?0:n,
f=4*d,
m=u.clippingState||null;
s.value=m,m=l(t,h,f,p);
for(var v=0;v!==f;++v){m[v]=e[v];}
u.clippingState=m,this.numIntersection=a?this.numPlanes:0,this.numPlanes+=d;
}
};
}

function Ii(t){
var e={};
return{
get:function get(n){
if(void 0!==e[n])return e[n];
var r;
switch(n){
case"WEBGL_depth_texture":
r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");
break;
case"EXT_texture_filter_anisotropic":
r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
break;
case"WEBGL_compressed_texture_s3tc":
r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
break;
case"WEBGL_compressed_texture_pvrtc":
r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
break;
default:
r=t.getExtension(n);}

return null===r&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),e[n]=r,r;
}};

}

function zi(t,e,n){
var r=new WeakMap(),
i=new WeakMap();

function a(t){
var o=t.target,
s=r.get(o);
for(var c in null!==s.index&&e.remove(s.index),s.attributes){e.remove(s.attributes[c]);}
o.removeEventListener("dispose",a),r.delete(o);
var l=i.get(s);
l&&(e.remove(l),i.delete(s)),n.memory.geometries--;
}

function o(t){
var n=[],
r=t.index,
a=t.attributes.position,
o=0;
if(null!==r){
var s=r.array;
o=r.version;
for(var c=0,l=s.length;c<l;c+=3){
var h=s[c+0],
u=s[c+1],
p=s[c+2];
n.push(h,u,u,p,p,h);
}
}else
for(s=a.array,o=a.version,c=0,l=s.length/3-1;c<l;c+=3){h=c+0,u=c+1,p=c+2,n.push(h,u,u,p,p,h);}
var d=new(_r(n)>65535?yr:vr)(n,1);
d.version=o,e.update(d,34963);
var f=i.get(t);
f&&e.remove(f),i.set(t,d);
}
return{
get:function get(t,e){
var i=r.get(e);
return i||(e.addEventListener("dispose",a),e.isBufferGeometry?i=e:e.isGeometry&&(void 0===e._bufferGeometry&&(e._bufferGeometry=new Pr().setFromObject(t)),i=e._bufferGeometry),r.set(e,i),n.memory.geometries++,i);
},
update:function update(t){
var n=t.index,
r=t.attributes;
for(var i in null!==n&&e.update(n,34963),r){e.update(r[i],34962);}
var a=t.morphAttributes;
for(var i in a){
for(var o=a[i],s=0,c=o.length;s<c;s++){e.update(o[s],34962);}}
},
getWireframeAttribute:function getWireframeAttribute(t){
var e=i.get(t);
if(e){
var n=t.index;
null!==n&&e.version<n.version&&o(t);
}else o(t);
return i.get(t);
}};

}

function Bi(t,e,n,r){
var i,a,o;
this.setMode=function(t){
i=t;
},this.setIndex=function(t){
a=t.type,o=t.bytesPerElement;
},this.render=function(e,r){
t.drawElements(i,r,a,e*o),n.update(r,i);
},this.renderInstances=function(s,c,l){
var h,u;
if(r.isWebGL2)h=t,u="drawElementsInstanced";else
if(u="drawElementsInstancedANGLE",null===(h=e.get("ANGLE_instanced_arrays")))return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
h[u](i,l,a,c*o,s.maxInstancedCount),n.update(l,i,s.maxInstancedCount);
};
}

function Fi(t){
var e={
frame:0,
calls:0,
triangles:0,
points:0,
lines:0};

return{
memory:{
geometries:0,
textures:0},

render:e,
programs:null,
autoReset:!0,
reset:function reset(){
e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0;
},
update:function update(t,n,r){
switch(r=r||1,e.calls++,n){
case 4:
e.triangles+=r*(t/3);
break;
case 5:
case 6:
e.triangles+=r*(t-2);
break;
case 1:
e.lines+=r*(t/2);
break;
case 3:
e.lines+=r*(t-1);
break;
case 2:
e.lines+=r*t;
break;
case 0:
e.points+=r*t;
break;
default:
console.error("THREE.WebGLInfo: Unknown draw mode:",n);}

}};

}

function Gi(t,e){
return Math.abs(e[1])-Math.abs(t[1]);
}

function Ui(t){
var e={},
n=new Float32Array(8);
return{
update:function update(r,i,a,o){
var s=r.morphTargetInfluences,
c=s.length,
l=e[i.id];
if(void 0===l){
l=[];
for(var h=0;h<c;h++){l[h]=[h,0];}
e[i.id]=l;
}
var u=a.morphTargets&&i.morphAttributes.position,
p=a.morphNormals&&i.morphAttributes.normal;
for(h=0;h<c;h++){0!==(d=l[h])[1]&&(u&&i.removeAttribute("morphTarget"+h),p&&i.removeAttribute("morphNormal"+h));}
for(h=0;h<c;h++){(d=l[h])[0]=h,d[1]=s[h];}
for(l.sort(Gi),h=0;h<8;h++){
var d;
if(d=l[h]){
var f=d[0],
m=d[1];
if(m){
u&&i.addAttribute("morphTarget"+h,u[f]),p&&i.addAttribute("morphNormal"+h,p[f]),n[h]=m;
continue;
}
}
n[h]=0;
}
o.getUniforms().setValue(t,"morphTargetInfluences",n);
}};

}

function Hi(t,e){
var n={};
return{
update:function update(r){
var i=e.render.frame,
a=r.geometry,
o=t.get(r,a);
return n[o.id]!==i&&(a.isGeometry&&o.updateFromObject(r),t.update(o),n[o.id]=i),o;
},
dispose:function dispose(){
n={};
}};

}

function Vi(t,e,n,r,i,a,o,s,c,l){
t=void 0!==t?t:[],e=void 0!==e?e:rt,o=void 0!==o?o:Ot,He.call(this,t,e,n,r,i,a,o,s,c,l),this.flipY=!1;
}

function ji(t,e,n,r){
He.call(this,null),this.image={
data:t,
width:e,
height:n,
depth:r},
this.magFilter=dt,this.minFilter=dt,this.wrapR=ut,this.generateMipmaps=!1,this.flipY=!1;
}

function ki(t,e,n,r){
He.call(this,null),this.image={
data:t,
width:e,
height:n,
depth:r},
this.magFilter=dt,this.minFilter=dt,this.wrapR=ut,this.generateMipmaps=!1,this.flipY=!1;
}
Ei.physical={
uniforms:ai([Ei.standard.uniforms,{
transparency:{
value:0},

clearcoat:{
value:0},

clearcoatRoughness:{
value:0},

sheen:{
value:new rr(0)},

clearcoatNormalScale:{
value:new Ce(1,1)},

clearcoatNormalMap:{
value:null}}]),


vertexShader:Si.meshphysical_vert,
fragmentShader:Si.meshphysical_frag},
Ri.prototype=Object.create(ei.prototype),Ri.prototype.constructor=Ri,Pi.prototype=Object.create(Pr.prototype),Pi.prototype.constructor=Pi,Vi.prototype=Object.create(He.prototype),Vi.prototype.constructor=Vi,Vi.prototype.isCubeTexture=!0,Object.defineProperty(Vi.prototype,"images",{
get:function get(){
return this.image;
},
set:function set(t){
this.image=t;
}}),
ji.prototype=Object.create(He.prototype),ji.prototype.constructor=ji,ji.prototype.isDataTexture2DArray=!0,ki.prototype=Object.create(He.prototype),ki.prototype.constructor=ki,ki.prototype.isDataTexture3D=!0;
var Wi=new He(),
qi=new ji(),
Xi=new ki(),
Yi=new Vi(),
Ji=[],
Zi=[],
Qi=new Float32Array(16),
Ki=new Float32Array(9),
$i=new Float32Array(4);

function ta(t,e,n){
var r=t[0];
if(r<=0||r>0)return t;
var i=e*n,
a=Ji[i];
if(void 0===a&&(a=new Float32Array(i),Ji[i]=a),0!==e){
r.toArray(a,0);
for(var o=1,s=0;o!==e;++o){s+=n,t[o].toArray(a,s);}
}
return a;
}

function ea(t,e){
if(t.length!==e.length)return!1;
for(var n=0,r=t.length;n<r;n++){
if(t[n]!==e[n])return!1;}
return!0;
}

function na(t,e){
for(var n=0,r=e.length;n<r;n++){t[n]=e[n];}
}

function ra(t,e){
var n=Zi[e];
void 0===n&&(n=new Int32Array(e),Zi[e]=n);
for(var r=0;r!==e;++r){n[r]=t.allocateTextureUnit();}
return n;
}

function ia(t,e){
var n=this.cache;
n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e);
}

function aa(t,e){
var n=this.cache;
if(void 0!==e.x)n[0]===e.x&&n[1]===e.y||(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else
{
if(ea(n,e))return;
t.uniform2fv(this.addr,e),na(n,e);
}
}

function oa(t,e){
var n=this.cache;
if(void 0!==e.x)n[0]===e.x&&n[1]===e.y&&n[2]===e.z||(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else
if(void 0!==e.r)n[0]===e.r&&n[1]===e.g&&n[2]===e.b||(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else
{
if(ea(n,e))return;
t.uniform3fv(this.addr,e),na(n,e);
}
}

function sa(t,e){
var n=this.cache;
if(void 0!==e.x)n[0]===e.x&&n[1]===e.y&&n[2]===e.z&&n[3]===e.w||(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else
{
if(ea(n,e))return;
t.uniform4fv(this.addr,e),na(n,e);
}
}

function ca(t,e){
var n=this.cache,
r=e.elements;
if(void 0===r){
if(ea(n,e))return;
t.uniformMatrix2fv(this.addr,!1,e),na(n,e);
}else{
if(ea(n,r))return;
$i.set(r),t.uniformMatrix2fv(this.addr,!1,$i),na(n,r);
}
}

function la(t,e){
var n=this.cache,
r=e.elements;
if(void 0===r){
if(ea(n,e))return;
t.uniformMatrix3fv(this.addr,!1,e),na(n,e);
}else{
if(ea(n,r))return;
Ki.set(r),t.uniformMatrix3fv(this.addr,!1,Ki),na(n,r);
}
}

function ha(t,e){
var n=this.cache,
r=e.elements;
if(void 0===r){
if(ea(n,e))return;
t.uniformMatrix4fv(this.addr,!1,e),na(n,e);
}else{
if(ea(n,r))return;
Qi.set(r),t.uniformMatrix4fv(this.addr,!1,Qi),na(n,r);
}
}

function ua(t,e,n){
var r=this.cache,
i=n.allocateTextureUnit();
r[0]!==i&&(t.uniform1i(this.addr,i),r[0]=i),n.safeSetTexture2D(e||Wi,i);
}

function pa(t,e,n){
var r=this.cache,
i=n.allocateTextureUnit();
r[0]!==i&&(t.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(e||qi,i);
}

function da(t,e,n){
var r=this.cache,
i=n.allocateTextureUnit();
r[0]!==i&&(t.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(e||Xi,i);
}

function fa(t,e,n){
var r=this.cache,
i=n.allocateTextureUnit();
r[0]!==i&&(t.uniform1i(this.addr,i),r[0]=i),n.safeSetTextureCube(e||Yi,i);
}

function ma(t,e){
var n=this.cache;
n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e);
}

function va(t,e){
var n=this.cache;
ea(n,e)||(t.uniform2iv(this.addr,e),na(n,e));
}

function ga(t,e){
var n=this.cache;
ea(n,e)||(t.uniform3iv(this.addr,e),na(n,e));
}

function ya(t,e){
var n=this.cache;
ea(n,e)||(t.uniform4iv(this.addr,e),na(n,e));
}

function xa(t,e){
t.uniform1fv(this.addr,e);
}

function ba(t,e){
t.uniform1iv(this.addr,e);
}

function wa(t,e){
t.uniform2iv(this.addr,e);
}

function _a(t,e){
t.uniform3iv(this.addr,e);
}

function Ma(t,e){
t.uniform4iv(this.addr,e);
}

function Sa(t,e){
var n=ta(e,this.size,2);
t.uniform2fv(this.addr,n);
}

function Ta(t,e){
var n=ta(e,this.size,3);
t.uniform3fv(this.addr,n);
}

function Ea(t,e){
var n=ta(e,this.size,4);
t.uniform4fv(this.addr,n);
}

function Aa(t,e){
var n=ta(e,this.size,4);
t.uniformMatrix2fv(this.addr,!1,n);
}

function La(t,e){
var n=ta(e,this.size,9);
t.uniformMatrix3fv(this.addr,!1,n);
}

function Ra(t,e){
var n=ta(e,this.size,16);
t.uniformMatrix4fv(this.addr,!1,n);
}

function Pa(t,e,n){
var r=e.length,
i=ra(n,r);
t.uniform1iv(this.addr,i);
for(var a=0;a!==r;++a){n.safeSetTexture2D(e[a]||Wi,i[a]);}
}

function Ca(t,e,n){
var r=e.length,
i=ra(n,r);
t.uniform1iv(this.addr,i);
for(var a=0;a!==r;++a){n.safeSetTextureCube(e[a]||Yi,i[a]);}
}

function Oa(t,e,n){
this.id=t,this.addr=n,this.cache=[],this.setValue=function(t){
switch(t){
case 5126:
return ia;
case 35664:
return aa;
case 35665:
return oa;
case 35666:
return sa;
case 35674:
return ca;
case 35675:
return la;
case 35676:
return ha;
case 35678:
case 36198:
return ua;
case 35679:
return da;
case 35680:
return fa;
case 36289:
return pa;
case 5124:
case 35670:
return ma;
case 35667:
case 35671:
return va;
case 35668:
case 35672:
return ga;
case 35669:
case 35673:
return ya;}

}(e.type);
}

function Da(t,e,n){
this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=function(t){
switch(t){
case 5126:
return xa;
case 35664:
return Sa;
case 35665:
return Ta;
case 35666:
return Ea;
case 35674:
return Aa;
case 35675:
return La;
case 35676:
return Ra;
case 35678:
return Pa;
case 35680:
return Ca;
case 5124:
case 35670:
return ba;
case 35667:
case 35671:
return wa;
case 35668:
case 35672:
return _a;
case 35669:
case 35673:
return Ma;}

}(e.type);
}

function Na(t){
this.id=t,this.seq=[],this.map={};
}
Da.prototype.updateCache=function(t){
var e=this.cache;
t instanceof Float32Array&&e.length!==t.length&&(this.cache=new Float32Array(t.length)),na(e,t);
},Na.prototype.setValue=function(t,e,n){
for(var r=this.seq,i=0,a=r.length;i!==a;++i){
var o=r[i];
o.setValue(t,e[o.id],n);
}
};
var Ia=/([\w\d_]+)(\])?(\[|\.)?/g;

function za(t,e){
t.seq.push(e),t.map[e.id]=e;
}

function Ba(t,e,n){
var r=t.name,
i=r.length;
for(Ia.lastIndex=0;;){
var a=Ia.exec(r),
o=Ia.lastIndex,
s=a[1],
c="]"===a[2],
l=a[3];
if(c&&(s|=0),void 0===l||"["===l&&o+2===i){
za(n,void 0===l?new Oa(s,t,e):new Da(s,t,e));
break;
}
var h=n.map[s];
void 0===h&&za(n,h=new Na(s)),n=h;
}
}

function Fa(t,e){
this.seq=[],this.map={};
for(var n=t.getProgramParameter(e,35718),r=0;r<n;++r){
var i=t.getActiveUniform(e,r);
Ba(i,t.getUniformLocation(e,i.name),this);
}
}

function Ga(t,e,n){
var r=t.createShader(e);
return t.shaderSource(r,n),t.compileShader(r),r;
}
Fa.prototype.setValue=function(t,e,n,r){
var i=this.map[e];
void 0!==i&&i.setValue(t,n,r);
},Fa.prototype.setOptional=function(t,e,n){
var r=e[n];
void 0!==r&&this.setValue(t,n,r);
},Fa.upload=function(t,e,n,r){
for(var i=0,a=e.length;i!==a;++i){
var o=e[i],
s=n[o.id];
!1!==s.needsUpdate&&o.setValue(t,s.value,r);
}
},Fa.seqWithValue=function(t,e){
for(var n=[],r=0,i=t.length;r!==i;++r){
var a=t[r];
a.id in e&&n.push(a);
}
return n;
};
var Ua=0;

function Ha(t){
switch(t){
case fe:
return["Linear","( value )"];
case me:
return["sRGB","( value )"];
case ge:
return["RGBE","( value )"];
case xe:
return["RGBM","( value, 7.0 )"];
case be:
return["RGBM","( value, 16.0 )"];
case we:
return["RGBD","( value, 256.0 )"];
case ve:
return["Gamma","( value, float( GAMMA_FACTOR ) )"];
case ye:
return["LogLuv","( value )"];
default:
throw new Error("unsupported encoding: "+t);}

}

function Va(t,e,n){
var r=t.getShaderParameter(e,35713),
i=t.getShaderInfoLog(e).trim();
return r&&""===i?"":"THREE.WebGLShader: gl.getShaderInfoLog() "+n+"\n"+i+function(t){
for(var e=t.split("\n"),n=0;n<e.length;n++){e[n]=n+1+": "+e[n];}
return e.join("\n");
}(t.getShaderSource(e));
}

function ja(t,e){
var n=Ha(e);
return"vec4 "+t+"( vec4 value ) { return "+n[0]+"ToLinear"+n[1]+"; }";
}

function ka(t,e){
var n;
switch(e){
case K:
n="Linear";
break;
case $:
n="Reinhard";
break;
case tt:
n="Uncharted2";
break;
case et:
n="OptimizedCineon";
break;
case nt:
n="ACESFilmic";
break;
default:
throw new Error("unsupported toneMapping: "+e);}

return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }";
}

function Wa(t){
return""!==t;
}

function qa(t,e){
return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows);
}

function Xa(t,e){
return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection);
}

function Ya(t){
return t.replace(/^[ \t]*#include +<([\w\d./]+)>/gm,function(t,e){
var n=Si[e];
if(void 0===n)throw new Error("Can not resolve #include <"+e+">");
return Ya(n);
});
}

function Ja(t){
return t.replace(/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,function(t,e,n,r){
for(var i="",a=parseInt(e);a<parseInt(n);a++){i+=r.replace(/\[ i \]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);}
return i;
});
}

function Za(t,e,n,r,i,a,o){
var s=t.getContext(),
u=r.defines,
p=i.vertexShader,
d=i.fragmentShader,
f="SHADOWMAP_TYPE_BASIC";
a.shadowMapType===c?f="SHADOWMAP_TYPE_PCF":a.shadowMapType===l?f="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===h&&(f="SHADOWMAP_TYPE_VSM");
var m="ENVMAP_TYPE_CUBE",
v="ENVMAP_MODE_REFLECTION",
g="ENVMAP_BLENDING_MULTIPLY";
if(a.envMap){
switch(r.envMap.mapping){
case rt:
case it:
m="ENVMAP_TYPE_CUBE";
break;
case ct:
case lt:
m="ENVMAP_TYPE_CUBE_UV";
break;
case at:
case ot:
m="ENVMAP_TYPE_EQUIREC";
break;
case st:
m="ENVMAP_TYPE_SPHERE";}

switch(r.envMap.mapping){
case it:
case ot:
v="ENVMAP_MODE_REFRACTION";}

switch(r.combine){
case Y:
g="ENVMAP_BLENDING_MULTIPLY";
break;
case J:
g="ENVMAP_BLENDING_MIX";
break;
case Z:
g="ENVMAP_BLENDING_ADD";}

}
var y,x,b,w,_,M=t.gammaFactor>0?t.gammaFactor:1,
S=o.isWebGL2?"":function(t,e,n){
return[(t=t||{}).derivatives||e.envMapCubeUV||e.bumpMap||e.tangentSpaceNormalMap||e.clearcoatNormalMap||e.flatShading?"#extension GL_OES_standard_derivatives : enable":"",(t.fragDepth||e.logarithmicDepthBuffer)&&n.get("EXT_frag_depth")?"#extension GL_EXT_frag_depth : enable":"",t.drawBuffers&&n.get("WEBGL_draw_buffers")?"#extension GL_EXT_draw_buffers : require":"",(t.shaderTextureLOD||e.envMap)&&n.get("EXT_shader_texture_lod")?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Wa).join("\n");
}(r.extensions,a,e),
T=function(t){
var e=[];
for(var n in t){
var r=t[n];
!1!==r&&e.push("#define "+n+" "+r);
}
return e.join("\n");
}(u),
E=s.createProgram();
if(r.isRawShaderMaterial?((y=[T].filter(Wa).join("\n")).length>0&&(y+="\n"),(x=[S,T].filter(Wa).join("\n")).length>0&&(x+="\n")):(y=["precision "+a.precision+" float;","precision "+a.precision+" int;","highp"===a.precision?"#define HIGH_PRECISION":"","#define SHADER_NAME "+i.name,T,a.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+M,"#define MAX_BONES "+a.maxBones,a.useFog&&a.fog?"#define USE_FOG":"",a.useFog&&a.fogExp2?"#define FOG_EXP2":"",a.map?"#define USE_MAP":"",a.envMap?"#define USE_ENVMAP":"",a.envMap?"#define "+v:"",a.lightMap?"#define USE_LIGHTMAP":"",a.aoMap?"#define USE_AOMAP":"",a.emissiveMap?"#define USE_EMISSIVEMAP":"",a.bumpMap?"#define USE_BUMPMAP":"",a.normalMap?"#define USE_NORMALMAP":"",a.normalMap&&a.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",a.normalMap&&a.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",a.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",a.displacementMap&&a.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",a.specularMap?"#define USE_SPECULARMAP":"",a.roughnessMap?"#define USE_ROUGHNESSMAP":"",a.metalnessMap?"#define USE_METALNESSMAP":"",a.alphaMap?"#define USE_ALPHAMAP":"",a.vertexTangents?"#define USE_TANGENT":"",a.vertexColors?"#define USE_COLOR":"",a.vertexUvs?"#define USE_UV":"",a.flatShading?"#define FLAT_SHADED":"",a.skinning?"#define USE_SKINNING":"",a.useVertexTexture?"#define BONE_TEXTURE":"",a.morphTargets?"#define USE_MORPHTARGETS":"",a.morphNormals&&!1===a.flatShading?"#define USE_MORPHNORMALS":"",a.doubleSided?"#define DOUBLE_SIDED":"",a.flipSided?"#define FLIP_SIDED":"",a.shadowMapEnabled?"#define USE_SHADOWMAP":"",a.shadowMapEnabled?"#define "+f:"",a.sizeAttenuation?"#define USE_SIZEATTENUATION":"",a.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",a.logarithmicDepthBuffer&&(o.isWebGL2||e.get("EXT_frag_depth"))?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#ifdef USE_COLOR","\tattribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","\tattribute vec3 morphTarget0;","\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;","\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif","\n"].filter(Wa).join("\n"),x=[S,"precision "+a.precision+" float;","precision "+a.precision+" int;","highp"===a.precision?"#define HIGH_PRECISION":"","#define SHADER_NAME "+i.name,T,a.alphaTest?"#define ALPHATEST "+a.alphaTest+(a.alphaTest%1?"":".0"):"","#define GAMMA_FACTOR "+M,a.useFog&&a.fog?"#define USE_FOG":"",a.useFog&&a.fogExp2?"#define FOG_EXP2":"",a.map?"#define USE_MAP":"",a.matcap?"#define USE_MATCAP":"",a.envMap?"#define USE_ENVMAP":"",a.envMap?"#define "+m:"",a.envMap?"#define "+v:"",a.envMap?"#define "+g:"",a.lightMap?"#define USE_LIGHTMAP":"",a.aoMap?"#define USE_AOMAP":"",a.emissiveMap?"#define USE_EMISSIVEMAP":"",a.bumpMap?"#define USE_BUMPMAP":"",a.normalMap?"#define USE_NORMALMAP":"",a.normalMap&&a.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",a.normalMap&&a.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",a.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",a.specularMap?"#define USE_SPECULARMAP":"",a.roughnessMap?"#define USE_ROUGHNESSMAP":"",a.metalnessMap?"#define USE_METALNESSMAP":"",a.alphaMap?"#define USE_ALPHAMAP":"",a.sheen?"#define USE_SHEEN":"",a.vertexTangents?"#define USE_TANGENT":"",a.vertexColors?"#define USE_COLOR":"",a.vertexUvs?"#define USE_UV":"",a.gradientMap?"#define USE_GRADIENTMAP":"",a.flatShading?"#define FLAT_SHADED":"",a.doubleSided?"#define DOUBLE_SIDED":"",a.flipSided?"#define FLIP_SIDED":"",a.shadowMapEnabled?"#define USE_SHADOWMAP":"",a.shadowMapEnabled?"#define "+f:"",a.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",a.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",a.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",a.logarithmicDepthBuffer&&(o.isWebGL2||e.get("EXT_frag_depth"))?"#define USE_LOGDEPTHBUF_EXT":"",(r.extensions&&r.extensions.shaderTextureLOD||a.envMap)&&(o.isWebGL2||e.get("EXT_shader_texture_lod"))?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;",a.toneMapping!==Q?"#define TONE_MAPPING":"",a.toneMapping!==Q?Si.tonemapping_pars_fragment:"",a.toneMapping!==Q?ka("toneMapping",a.toneMapping):"",a.dithering?"#define DITHERING":"",a.outputEncoding||a.mapEncoding||a.matcapEncoding||a.envMapEncoding||a.emissiveMapEncoding?Si.encodings_pars_fragment:"",a.mapEncoding?ja("mapTexelToLinear",a.mapEncoding):"",a.matcapEncoding?ja("matcapTexelToLinear",a.matcapEncoding):"",a.envMapEncoding?ja("envMapTexelToLinear",a.envMapEncoding):"",a.emissiveMapEncoding?ja("emissiveMapTexelToLinear",a.emissiveMapEncoding):"",a.outputEncoding?(b="linearToOutputTexel",w=a.outputEncoding,_=Ha(w),"vec4 "+b+"( vec4 value ) { return LinearTo"+_[0]+_[1]+"; }"):"",a.depthPacking?"#define DEPTH_PACKING "+r.depthPacking:"","\n"].filter(Wa).join("\n")),p=Xa(p=qa(p=Ya(p),a),a),d=Xa(d=qa(d=Ya(d),a),a),p=Ja(p),d=Ja(d),o.isWebGL2&&!r.isRawShaderMaterial){
var A=!1,
L=/^\s*#version\s+300\s+es\s*\n/;
r.isShaderMaterial&&null!==p.match(L)&&null!==d.match(L)&&(A=!0,p=p.replace(L,""),d=d.replace(L,"")),y=["#version 300 es\n","#define attribute in","#define varying out","#define texture2D texture"].join("\n")+"\n"+y,x=["#version 300 es\n","#define varying in",A?"":"out highp vec4 pc_fragColor;",A?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join("\n")+"\n"+x;
}
var R,P,C=x+d,
O=Ga(s,35633,y+p),
D=Ga(s,35632,C);
if(s.attachShader(E,O),s.attachShader(E,D),void 0!==r.index0AttributeName?s.bindAttribLocation(E,0,r.index0AttributeName):!0===a.morphTargets&&s.bindAttribLocation(E,0,"position"),s.linkProgram(E),t.debug.checkShaderErrors){
var N=s.getProgramInfoLog(E).trim(),
I=s.getShaderInfoLog(O).trim(),
z=s.getShaderInfoLog(D).trim(),
B=!0,
F=!0;
if(!1===s.getProgramParameter(E,35714)){
B=!1;
var G=Va(s,O,"vertex"),
U=Va(s,D,"fragment");
console.error("THREE.WebGLProgram: shader error: ",s.getError(),"35715",s.getProgramParameter(E,35715),"gl.getProgramInfoLog",N,G,U);
}else""!==N?console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",N):""!==I&&""!==z||(F=!1);
F&&(this.diagnostics={
runnable:B,
material:r,
programLog:N,
vertexShader:{
log:I,
prefix:y},

fragmentShader:{
log:z,
prefix:x}});


}
return s.deleteShader(O),s.deleteShader(D),this.getUniforms=function(){
return void 0===R&&(R=new Fa(s,E)),R;
},this.getAttributes=function(){
return void 0===P&&(P=function(t,e){
for(var n={},r=t.getProgramParameter(e,35721),i=0;i<r;i++){
var a=t.getActiveAttrib(e,i).name;
n[a]=t.getAttribLocation(e,a);
}
return n;
}(s,E)),P;
},this.destroy=function(){
s.deleteProgram(E),this.program=void 0;
},this.name=i.name,this.id=Ua++,this.code=n,this.usedTimes=1,this.program=E,this.vertexShader=O,this.fragmentShader=D,this;
}

function Qa(t,e,n){
var r=[],
i={
MeshDepthMaterial:"depth",
MeshDistanceMaterial:"distanceRGBA",
MeshNormalMaterial:"normal",
MeshBasicMaterial:"basic",
MeshLambertMaterial:"lambert",
MeshPhongMaterial:"phong",
MeshToonMaterial:"phong",
MeshStandardMaterial:"physical",
MeshPhysicalMaterial:"physical",
MeshMatcapMaterial:"matcap",
LineBasicMaterial:"basic",
LineDashedMaterial:"dashed",
PointsMaterial:"points",
ShadowMaterial:"shadow",
SpriteMaterial:"sprite"},

a=["precision","supportsVertexTextures","map","mapEncoding","matcap","matcapEncoding","envMap","envMapMode","envMapEncoding","lightMap","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","objectSpaceNormalMap","tangentSpaceNormalMap","clearcoatNormalMap","displacementMap","specularMap","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","vertexTangents","fog","useFog","fogExp2","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","maxMorphTargets","maxMorphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering","sheen"];

function o(t,e){
var n;
return t?t.isTexture?n=t.encoding:t.isWebGLRenderTarget&&(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),n=t.texture.encoding):n=fe,n===fe&&e&&(n=ve),n;
}
this.getParameters=function(e,r,a,s,c,l,h){
var u=i[e.type],
f=h.isSkinnedMesh?function(t){
var e=t.skeleton.bones;
if(n.floatVertexTextures)return 1024;
var r=n.maxVertexUniforms,
i=Math.floor((r-20)/4),
a=Math.min(i,e.length);
return a<e.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+e.length+" bones. This GPU supports "+a+"."),0):a;
}(h):0,
m=n.precision;
null!==e.precision&&(m=n.getMaxPrecision(e.precision))!==e.precision&&console.warn("THREE.WebGLProgram.getParameters:",e.precision,"not supported, using",m,"instead.");
var v=t.getRenderTarget();
return{
shaderID:u,
precision:m,
supportsVertexTextures:n.vertexTextures,
outputEncoding:o(v?v.texture:null,t.gammaOutput),
map:!!e.map,
mapEncoding:o(e.map,t.gammaInput),
matcap:!!e.matcap,
matcapEncoding:o(e.matcap,t.gammaInput),
envMap:!!e.envMap,
envMapMode:e.envMap&&e.envMap.mapping,
envMapEncoding:o(e.envMap,t.gammaInput),
envMapCubeUV:!!e.envMap&&(e.envMap.mapping===ct||e.envMap.mapping===lt),
lightMap:!!e.lightMap,
aoMap:!!e.aoMap,
emissiveMap:!!e.emissiveMap,
emissiveMapEncoding:o(e.emissiveMap,t.gammaInput),
bumpMap:!!e.bumpMap,
normalMap:!!e.normalMap,
objectSpaceNormalMap:e.normalMapType===Te,
tangentSpaceNormalMap:e.normalMapType===Se,
clearcoatNormalMap:!!e.clearcoatNormalMap,
displacementMap:!!e.displacementMap,
roughnessMap:!!e.roughnessMap,
metalnessMap:!!e.metalnessMap,
specularMap:!!e.specularMap,
alphaMap:!!e.alphaMap,
gradientMap:!!e.gradientMap,
sheen:!!e.sheen,
combine:e.combine,
vertexTangents:e.normalMap&&e.vertexTangents,
vertexColors:e.vertexColors,
vertexUvs:!!(e.map||e.bumpMap||e.normalMap||e.specularMap||e.alphaMap||e.emissiveMap||e.roughnessMap||e.metalnessMap||e.clearcoatNormalMap),
fog:!!s,
useFog:e.fog,
fogExp2:s&&s.isFogExp2,
flatShading:e.flatShading,
sizeAttenuation:e.sizeAttenuation,
logarithmicDepthBuffer:n.logarithmicDepthBuffer,
skinning:e.skinning&&f>0,
maxBones:f,
useVertexTexture:n.floatVertexTextures,
morphTargets:e.morphTargets,
morphNormals:e.morphNormals,
maxMorphTargets:t.maxMorphTargets,
maxMorphNormals:t.maxMorphNormals,
numDirLights:r.directional.length,
numPointLights:r.point.length,
numSpotLights:r.spot.length,
numRectAreaLights:r.rectArea.length,
numHemiLights:r.hemi.length,
numDirLightShadows:r.directionalShadowMap.length,
numPointLightShadows:r.pointShadowMap.length,
numSpotLightShadows:r.spotShadowMap.length,
numClippingPlanes:c,
numClipIntersection:l,
dithering:e.dithering,
shadowMapEnabled:t.shadowMap.enabled&&h.receiveShadow&&a.length>0,
shadowMapType:t.shadowMap.type,
toneMapping:e.toneMapped?t.toneMapping:Q,
physicallyCorrectLights:t.physicallyCorrectLights,
premultipliedAlpha:e.premultipliedAlpha,
alphaTest:e.alphaTest,
doubleSided:e.side===d,
flipSided:e.side===p,
depthPacking:void 0!==e.depthPacking&&e.depthPacking};

},this.getProgramCode=function(e,n){
var r=[];
if(n.shaderID?r.push(n.shaderID):(r.push(e.fragmentShader),r.push(e.vertexShader)),void 0!==e.defines)
for(var i in e.defines){r.push(i),r.push(e.defines[i]);}
for(var o=0;o<a.length;o++){r.push(n[a[o]]);}
return r.push(e.onBeforeCompile.toString()),r.push(t.gammaOutput),r.push(t.gammaFactor),r.join();
},this.acquireProgram=function(i,a,o,s){
for(var c,l=0,h=r.length;l<h;l++){
var u=r[l];
if(u.code===s){
++(c=u).usedTimes;
break;
}
}
return void 0===c&&(c=new Za(t,e,s,i,a,o,n),r.push(c)),c;
},this.releaseProgram=function(t){
if(0==--t.usedTimes){
var e=r.indexOf(t);
r[e]=r[r.length-1],r.pop(),t.destroy();
}
},this.programs=r;
}

function Ka(){
var t=new WeakMap();
return{
get:function get(e){
var n=t.get(e);
return void 0===n&&(n={},t.set(e,n)),n;
},
remove:function remove(e){
t.delete(e);
},
update:function update(e,n,r){
t.get(e)[n]=r;
},
dispose:function dispose(){
t=new WeakMap();
}};

}

function $a(t,e){
return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.program!==e.program?t.program.id-e.program.id:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id;
}

function to(t,e){
return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id;
}

function eo(){
var t=[],
e=0,
n=[],
r=[],
i={
id:-1};


function a(n,r,a,o,s,c){
var l=t[e];
return void 0===l?(l={
id:n.id,
object:n,
geometry:r,
material:a,
program:a.program||i,
groupOrder:o,
renderOrder:n.renderOrder,
z:s,
group:c},
t[e]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=a,l.program=a.program||i,l.groupOrder=o,l.renderOrder=n.renderOrder,l.z=s,l.group=c),e++,l;
}
return{
opaque:n,
transparent:r,
init:function init(){
e=0,n.length=0,r.length=0;
},
push:function push(t,e,i,o,s,c){
var l=a(t,e,i,o,s,c);
(!0===i.transparent?r:n).push(l);
},
unshift:function unshift(t,e,i,o,s,c){
var l=a(t,e,i,o,s,c);
(!0===i.transparent?r:n).unshift(l);
},
sort:function sort(){
n.length>1&&n.sort($a),r.length>1&&r.sort(to);
}};

}

function no(){
var t=new WeakMap();

function e(n){
var r=n.target;
r.removeEventListener("dispose",e),t.delete(r);
}
return{
get:function get(n,r){
var i,a=t.get(n);
return void 0===a?(i=new eo(),t.set(n,new WeakMap()),t.get(n).set(r,i),n.addEventListener("dispose",e)):void 0===(i=a.get(r))&&(i=new eo(),a.set(r,i)),i;
},
dispose:function dispose(){
t=new WeakMap();
}};

}

function ro(){
var t={};
return{
get:function get(e){
if(void 0!==t[e.id])return t[e.id];
var n;
switch(e.type){
case"DirectionalLight":
n={
direction:new Ie(),
color:new rr(),
shadow:!1,
shadowBias:0,
shadowRadius:1,
shadowMapSize:new Ce()};

break;
case"SpotLight":
n={
position:new Ie(),
direction:new Ie(),
color:new rr(),
distance:0,
coneCos:0,
penumbraCos:0,
decay:0,
shadow:!1,
shadowBias:0,
shadowRadius:1,
shadowMapSize:new Ce()};

break;
case"PointLight":
n={
position:new Ie(),
color:new rr(),
distance:0,
decay:0,
shadow:!1,
shadowBias:0,
shadowRadius:1,
shadowMapSize:new Ce(),
shadowCameraNear:1,
shadowCameraFar:1e3};

break;
case"HemisphereLight":
n={
direction:new Ie(),
skyColor:new rr(),
groundColor:new rr()};

break;
case"RectAreaLight":
n={
color:new rr(),
position:new Ie(),
halfWidth:new Ie(),
halfHeight:new Ie()};}


return t[e.id]=n,n;
}};

}
var io=0;

function ao(t,e){
return(e.castShadow?1:0)-(t.castShadow?1:0);
}

function oo(){
for(var t=new ro(),e={
version:0,
hash:{
directionalLength:-1,
pointLength:-1,
spotLength:-1,
rectAreaLength:-1,
hemiLength:-1,
numDirectionalShadows:-1,
numPointShadows:-1,
numSpotShadows:-1},

ambient:[0,0,0],
probe:[],
directional:[],
directionalShadowMap:[],
directionalShadowMatrix:[],
spot:[],
spotShadowMap:[],
spotShadowMatrix:[],
rectArea:[],
point:[],
pointShadowMap:[],
pointShadowMatrix:[],
hemi:[],
numDirectionalShadows:-1,
numPointShadows:-1,
numSpotShadows:-1},
n=0;n<9;n++){e.probe.push(new Ie());}
var r=new Ie(),
i=new Ke(),
a=new Ke();
return{
setup:function setup(n,o,s){
for(var c=0,l=0,h=0,u=0;u<9;u++){e.probe[u].set(0,0,0);}
var p=0,
d=0,
f=0,
m=0,
v=0,
g=0,
y=0,
x=0,
b=s.matrixWorldInverse;
n.sort(ao),u=0;
for(var w=n.length;u<w;u++){
var _=n[u],
M=_.color,
S=_.intensity,
T=_.distance,
E=_.shadow&&_.shadow.map?_.shadow.map.texture:null;
if(_.isAmbientLight)c+=M.r*S,l+=M.g*S,h+=M.b*S;else
if(_.isLightProbe)
for(var A=0;A<9;A++){e.probe[A].addScaledVector(_.sh.coefficients[A],S);}else
if(_.isDirectionalLight){
if((R=t.get(_)).color.copy(_.color).multiplyScalar(_.intensity),R.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(b),R.shadow=_.castShadow,_.castShadow){
var L=_.shadow;
R.shadowBias=L.bias,R.shadowRadius=L.radius,R.shadowMapSize=L.mapSize,e.directionalShadowMap[p]=E,e.directionalShadowMatrix[p]=_.shadow.matrix,g++;
}
e.directional[p]=R,p++;
}else if(_.isSpotLight)(R=t.get(_)).position.setFromMatrixPosition(_.matrixWorld),R.position.applyMatrix4(b),R.color.copy(M).multiplyScalar(S),R.distance=T,R.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(b),R.coneCos=Math.cos(_.angle),R.penumbraCos=Math.cos(_.angle*(1-_.penumbra)),R.decay=_.decay,R.shadow=_.castShadow,_.castShadow&&(L=_.shadow,R.shadowBias=L.bias,R.shadowRadius=L.radius,R.shadowMapSize=L.mapSize,e.spotShadowMap[f]=E,e.spotShadowMatrix[f]=_.shadow.matrix,x++),e.spot[f]=R,f++;else
if(_.isRectAreaLight)(R=t.get(_)).color.copy(M).multiplyScalar(S),R.position.setFromMatrixPosition(_.matrixWorld),R.position.applyMatrix4(b),a.identity(),i.copy(_.matrixWorld),i.premultiply(b),a.extractRotation(i),R.halfWidth.set(.5*_.width,0,0),R.halfHeight.set(0,.5*_.height,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),e.rectArea[m]=R,m++;else
if(_.isPointLight)(R=t.get(_)).position.setFromMatrixPosition(_.matrixWorld),R.position.applyMatrix4(b),R.color.copy(_.color).multiplyScalar(_.intensity),R.distance=_.distance,R.decay=_.decay,R.shadow=_.castShadow,_.castShadow&&(L=_.shadow,R.shadowBias=L.bias,R.shadowRadius=L.radius,R.shadowMapSize=L.mapSize,R.shadowCameraNear=L.camera.near,R.shadowCameraFar=L.camera.far,e.pointShadowMap[d]=E,e.pointShadowMatrix[d]=_.shadow.matrix,y++),e.point[d]=R,d++;else
if(_.isHemisphereLight){
var R;
(R=t.get(_)).direction.setFromMatrixPosition(_.matrixWorld),R.direction.transformDirection(b),R.direction.normalize(),R.skyColor.copy(_.color).multiplyScalar(S),R.groundColor.copy(_.groundColor).multiplyScalar(S),e.hemi[v]=R,v++;
}
}
e.ambient[0]=c,e.ambient[1]=l,e.ambient[2]=h;
var P=e.hash;
P.directionalLength===p&&P.pointLength===d&&P.spotLength===f&&P.rectAreaLength===m&&P.hemiLength===v&&P.numDirectionalShadows===g&&P.numPointShadows===y&&P.numSpotShadows===x||(e.directional.length=p,e.spot.length=f,e.rectArea.length=m,e.point.length=d,e.hemi.length=v,e.directionalShadowMap.length=g,e.pointShadowMap.length=y,e.spotShadowMap.length=x,e.directionalShadowMatrix.length=g,e.pointShadowMatrix.length=y,e.spotShadowMatrix.length=x,P.directionalLength=p,P.pointLength=d,P.spotLength=f,P.rectAreaLength=m,P.hemiLength=v,P.numDirectionalShadows=g,P.numPointShadows=y,P.numSpotShadows=x,e.version=io++);
},
state:e};

}

function so(){
var t=new oo(),
e=[],
n=[];
return{
init:function init(){
e.length=0,n.length=0;
},
state:{
lightsArray:e,
shadowsArray:n,
lights:t},

setupLights:function setupLights(r){
t.setup(e,n,r);
},
pushLight:function pushLight(t){
e.push(t);
},
pushShadow:function pushShadow(t){
n.push(t);
}};

}

function co(){
var t=new WeakMap();

function e(n){
var r=n.target;
r.removeEventListener("dispose",e),t.delete(r);
}
return{
get:function get(n,r){
var i;
return!1===t.has(n)?(i=new so(),t.set(n,new WeakMap()),t.get(n).set(r,i),n.addEventListener("dispose",e)):!1===t.get(n).has(r)?(i=new so(),t.get(n).set(r,i)):i=t.get(n).get(r),i;
},
dispose:function dispose(){
t=new WeakMap();
}};

}

function lo(t){
lr.call(this),this.type="MeshDepthMaterial",this.depthPacking=_e,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.setValues(t);
}

function ho(t){
lr.call(this),this.type="MeshDistanceMaterial",this.referencePosition=new Ie(),this.nearDistance=1,this.farDistance=1e3,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.lights=!1,this.setValues(t);
}
lo.prototype=Object.create(lr.prototype),lo.prototype.constructor=lo,lo.prototype.isMeshDepthMaterial=!0,lo.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.depthPacking=t.depthPacking,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this;
},ho.prototype=Object.create(lr.prototype),ho.prototype.constructor=ho,ho.prototype.isMeshDistanceMaterial=!0,ho.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.referencePosition.copy(t.referencePosition),this.nearDistance=t.nearDistance,this.farDistance=t.farDistance,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this;
};
var uo="uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n  float mean = 0.0;\n  float squared_mean = 0.0;\n  \n\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy  ) / resolution ) );\n  for ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {\n    #ifdef HORIZONAL_PASS\n      vec2 distribution = decodeHalfRGBA ( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );\n      mean += distribution.x;\n      squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n    #else\n      float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0,  i )  * radius ) / resolution ) );\n      mean += depth;\n      squared_mean += depth * depth;\n    #endif\n  }\n  mean = mean * HALF_SAMPLE_RATE;\n  squared_mean = squared_mean * HALF_SAMPLE_RATE;\n  float std_dev = pow( squared_mean - mean * mean, 0.5 );\n  gl_FragColor = encodeHalfRGBA( vec2( mean, std_dev ) );\n}",
po="void main() {\n\tgl_Position = vec4( position, 1.0 );\n}";

function fo(t,e,n){
var r=new Mi(),
i=new Ce(),
a=new Ce(),
o=new Ve(),
s=1,
l=2,
f=1+(s|l),
m=new Array(f),
v=new Array(f),
y={},
x={
0:p,
1:u,
2:d},

b=new li({
defines:{
SAMPLE_RATE:.25,
HALF_SAMPLE_RATE:1/8},

uniforms:{
shadow_pass:{
value:null},

resolution:{
value:new Ce()},

radius:{
value:4}},


vertexShader:po,
fragmentShader:uo}),

w=b.clone();
w.defines.HORIZONAL_PASS=1;
var _=new Pr();
_.addAttribute("position",new ur(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));
for(var M=new Yr(_,b),S=0;S!==f;++S){
var T=0!=(S&s),
E=0!=(S&l),
A=new lo({
depthPacking:Me,
morphTargets:T,
skinning:E});

m[S]=A;
var L=new ho({
morphTargets:T,
skinning:E});

v[S]=L;
}
var R=this;

function P(n,r){
var i=e.update(M);
b.uniforms.shadow_pass.value=n.map.texture,b.uniforms.resolution.value=n.mapSize,b.uniforms.radius.value=n.radius,t.setRenderTarget(n.mapPass),t.clear(),t.renderBufferDirect(r,null,i,b,M,null),w.uniforms.shadow_pass.value=n.mapPass.texture,w.uniforms.resolution.value=n.mapSize,w.uniforms.radius.value=n.radius,t.setRenderTarget(n.map),t.clear(),t.renderBufferDirect(r,null,i,w,M,null);
}

function C(e,n,r,i,a,o){
var c=e.geometry,
u=null,
p=m,
d=e.customDepthMaterial;
if(r.isPointLight&&(p=v,d=e.customDistanceMaterial),d)u=d;else
{
var f=!1;
n.morphTargets&&(c&&c.isBufferGeometry?f=c.morphAttributes&&c.morphAttributes.position&&c.morphAttributes.position.length>0:c&&c.isGeometry&&(f=c.morphTargets&&c.morphTargets.length>0)),e.isSkinnedMesh&&!1===n.skinning&&console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",e);
var g=e.isSkinnedMesh&&n.skinning,
b=0;
f&&(b|=s),g&&(b|=l),u=p[b];
}
if(t.localClippingEnabled&&!0===n.clipShadows&&0!==n.clippingPlanes.length){
var w=u.uuid,
_=n.uuid,
M=y[w];
void 0===M&&(M={},y[w]=M);
var S=M[_];
void 0===S&&(S=u.clone(),M[_]=S),u=S;
}
return u.visible=n.visible,u.wireframe=n.wireframe,u.side=o===h?null!=n.shadowSide?n.shadowSide:n.side:null!=n.shadowSide?n.shadowSide:x[n.side],u.clipShadows=n.clipShadows,u.clippingPlanes=n.clippingPlanes,u.clipIntersection=n.clipIntersection,u.wireframeLinewidth=n.wireframeLinewidth,u.linewidth=n.linewidth,r.isPointLight&&u.isMeshDistanceMaterial&&(u.referencePosition.setFromMatrixPosition(r.matrixWorld),u.nearDistance=i,u.farDistance=a),u;
}

function O(n,i,a,o,s){
if(!1!==n.visible){
if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===h)&&(!n.frustumCulled||r.intersectsObject(n))){
n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);
var c=e.update(n),
l=n.material;
if(Array.isArray(l))
for(var u=c.groups,p=0,d=u.length;p<d;p++){
var f=u[p],
m=l[f.materialIndex];
if(m&&m.visible){
var v=C(n,m,o,a.near,a.far,s);
t.renderBufferDirect(a,null,c,v,n,f);
}
}else l.visible&&(v=C(n,l,o,a.near,a.far,s),t.renderBufferDirect(a,null,c,v,n,null));
}
for(var g=n.children,y=0,x=g.length;y<x;y++){O(g[y],i,a,o,s);}
}
}
this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=c,this.render=function(e,s,c){
if(!1!==R.enabled&&(!1!==R.autoUpdate||!1!==R.needsUpdate)&&0!==e.length){
var l=t.getRenderTarget(),
u=t.getActiveCubeFace(),
p=t.getActiveMipmapLevel(),
d=t.state;
d.setBlending(g),d.buffers.color.setClear(1,1,1,1),d.buffers.depth.setTest(!0),d.setScissorTest(!1);
for(var f=0,m=e.length;f<m;f++){
var v=e[f],
y=v.shadow;
if(void 0!==y){
i.copy(y.mapSize);
var x=y.getFrameExtents();
if(i.multiply(x),a.copy(y.mapSize),(i.x>n||i.y>n)&&(console.warn("THREE.WebGLShadowMap:",v,"has shadow exceeding max texture size, reducing"),i.x>n&&(a.x=Math.floor(n/x.x),i.x=a.x*x.x,y.mapSize.x=a.x),i.y>n&&(a.y=Math.floor(n/x.y),i.y=a.y*x.y,y.mapSize.y=a.y)),null===y.map&&!y.isPointLightShadow&&this.type===h){
var b={
minFilter:vt,
magFilter:vt,
format:Dt};

y.map=new je(i.x,i.y,b),y.map.texture.name=v.name+".shadowMap",y.mapPass=new je(i.x,i.y,b),y.camera.updateProjectionMatrix();
}
null===y.map&&(b={
minFilter:dt,
magFilter:dt,
format:Dt},
y.map=new je(i.x,i.y,b),y.map.texture.name=v.name+".shadowMap",y.camera.updateProjectionMatrix()),t.setRenderTarget(y.map),t.clear();
for(var w=y.getViewportCount(),_=0;_<w;_++){
var M=y.getViewport(_);
o.set(a.x*M.x,a.y*M.y,a.x*M.z,a.y*M.w),d.viewport(o),y.updateMatrices(v,c,_),r=y.getFrustum(),O(s,c,y.camera,v,this.type);
}
y.isPointLightShadow||this.type!==h||P(y,c);
}else console.warn("THREE.WebGLShadowMap:",v,"has no shadow.");
}
R.needsUpdate=!1,t.setRenderTarget(l,u,p);
}
};
}

function mo(t,e,a,o){
var s=new function(){
var e=!1,
n=new Ve(),
r=null,
i=new Ve(0,0,0,0);
return{
setMask:function setMask(n){
r===n||e||(t.colorMask(n,n,n,n),r=n);
},
setLocked:function setLocked(t){
e=t;
},
setClear:function setClear(e,r,a,o,s){
!0===s&&(e*=o,r*=o,a*=o),n.set(e,r,a,o),!1===i.equals(n)&&(t.clearColor(e,r,a,o),i.copy(n));
},
reset:function reset(){
e=!1,r=null,i.set(-1,0,0,0);
}};

}(),
c=new function(){
var e=!1,
n=null,
r=null,
i=null;
return{
setTest:function setTest(t){
t?at(2929):ot(2929);
},
setMask:function setMask(r){
n===r||e||(t.depthMask(r),n=r);
},
setFunc:function setFunc(e){
if(r!==e){
if(e)switch(e){
case U:
t.depthFunc(512);
break;
case H:
t.depthFunc(519);
break;
case V:
t.depthFunc(513);
break;
case j:
t.depthFunc(515);
break;
case k:
t.depthFunc(514);
break;
case W:
t.depthFunc(518);
break;
case q:
t.depthFunc(516);
break;
case X:
t.depthFunc(517);
break;
default:
t.depthFunc(515);}else
t.depthFunc(515);
r=e;
}
},
setLocked:function setLocked(t){
e=t;
},
setClear:function setClear(e){
i!==e&&(t.clearDepth(e),i=e);
},
reset:function reset(){
e=!1,n=null,r=null,i=null;
}};

}(),
l=new function(){
var e=!1,
n=null,
r=null,
i=null,
a=null,
o=null,
s=null,
c=null,
l=null;
return{
setTest:function setTest(t){
e||(t?at(2960):ot(2960));
},
setMask:function setMask(r){
n===r||e||(t.stencilMask(r),n=r);
},
setFunc:function setFunc(e,n,o){
r===e&&i===n&&a===o||(t.stencilFunc(e,n,o),r=e,i=n,a=o);
},
setOp:function setOp(e,n,r){
o===e&&s===n&&c===r||(t.stencilOp(e,n,r),o=e,s=n,c=r);
},
setLocked:function setLocked(t){
e=t;
},
setClear:function setClear(e){
l!==e&&(t.clearStencil(e),l=e);
},
reset:function reset(){
e=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;
}};

}(),
h=t.getParameter(34921),
u=new Uint8Array(h),
f=new Uint8Array(h),
m=new Uint8Array(h),
v={},
y=null,
T=null,
E=null,
A=null,
L=null,
R=null,
P=null,
C=null,
O=null,
D=null,
N=!1,
I=null,
z=null,
B=null,
F=null,
G=null,
Y=t.getParameter(35661),
J=!1,
Z=0,
Q=t.getParameter(7938);-1!==Q.indexOf("WebGL")?(Z=parseFloat(/^WebGL\ ([0-9])/.exec(Q)[1]),J=Z>=1):-1!==Q.indexOf("OpenGL ES")&&(Z=parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(Q)[1]),J=Z>=2);
var K=null,
$={},
tt=new Ve(),
et=new Ve();

function nt(e,n,r){
var i=new Uint8Array(4),
a=t.createTexture();
t.bindTexture(e,a),t.texParameteri(e,10241,9728),t.texParameteri(e,10240,9728);
for(var o=0;o<r;o++){t.texImage2D(n+o,0,6408,1,1,0,6408,5121,i);}
return a;
}
var rt={};

function it(n,r){
u[n]=1,0===f[n]&&(t.enableVertexAttribArray(n),f[n]=1),m[n]!==r&&((o.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[o.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](n,r),m[n]=r);
}

function at(e){
!0!==v[e]&&(t.enable(e),v[e]=!0);
}

function ot(e){
!1!==v[e]&&(t.disable(e),v[e]=!1);
}

function st(e,n,r,i,o,s,c,l){
if(e!==g){
if(E||(at(3042),E=!0),e===M)o=o||n,s=s||r,c=c||i,n===L&&o===C||(t.blendEquationSeparate(a.convert(n),a.convert(o)),L=n,C=o),r===R&&i===P&&s===O&&c===D||(t.blendFuncSeparate(a.convert(r),a.convert(i),a.convert(s),a.convert(c)),R=r,P=i,O=s,D=c),A=e,N=null;else
if(e!==A||l!==N){
if(L===S&&C===S||(t.blendEquation(32774),L=S,C=S),l)switch(e){
case x:
t.blendFuncSeparate(1,771,1,771);
break;
case b:
t.blendFunc(1,1);
break;
case w:
t.blendFuncSeparate(0,0,769,771);
break;
case _:
t.blendFuncSeparate(0,768,0,770);
break;
default:
console.error("THREE.WebGLState: Invalid blending: ",e);}else
switch(e){
case x:
t.blendFuncSeparate(770,771,1,771);
break;
case b:
t.blendFunc(770,1);
break;
case w:
t.blendFunc(0,769);
break;
case _:
t.blendFunc(0,768);
break;
default:
console.error("THREE.WebGLState: Invalid blending: ",e);}

R=null,P=null,O=null,D=null,A=e,N=l;
}
}else E&&(ot(3042),E=!1);
}

function ct(e){
I!==e&&(e?t.frontFace(2304):t.frontFace(2305),I=e);
}

function lt(e){
e!==n?(at(2884),e!==z&&(e===r?t.cullFace(1029):e===i?t.cullFace(1028):t.cullFace(1032))):ot(2884),z=e;
}

function ht(e,n,r){
e?(at(32823),F===n&&G===r||(t.polygonOffset(n,r),F=n,G=r)):ot(32823);
}

function ut(e){
void 0===e&&(e=33984+Y-1),K!==e&&(t.activeTexture(e),K=e);
}
return rt[3553]=nt(3553,3553,1),rt[34067]=nt(34067,34069,6),s.setClear(0,0,0,1),c.setClear(1),l.setClear(0),at(2929),c.setFunc(j),ct(!1),lt(r),at(2884),st(g),{
buffers:{
color:s,
depth:c,
stencil:l},

initAttributes:function initAttributes(){
for(var t=0,e=u.length;t<e;t++){u[t]=0;}
},
enableAttribute:function enableAttribute(t){
it(t,0);
},
enableAttributeAndDivisor:it,
disableUnusedAttributes:function disableUnusedAttributes(){
for(var e=0,n=f.length;e!==n;++e){f[e]!==u[e]&&(t.disableVertexAttribArray(e),f[e]=0);}
},
enable:at,
disable:ot,
getCompressedTextureFormats:function getCompressedTextureFormats(){
if(null===y&&(y=[],e.get("WEBGL_compressed_texture_pvrtc")||e.get("WEBGL_compressed_texture_s3tc")||e.get("WEBGL_compressed_texture_etc1")||e.get("WEBGL_compressed_texture_astc")))
for(var n=t.getParameter(34467),r=0;r<n.length;r++){y.push(n[r]);}
return y;
},
useProgram:function useProgram(e){
return T!==e&&(t.useProgram(e),T=e,!0);
},
setBlending:st,
setMaterial:function setMaterial(t,e){
t.side===d?ot(2884):at(2884);
var n=t.side===p;
e&&(n=!n),ct(n),t.blending===x&&!1===t.transparent?st(g):st(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.premultipliedAlpha),c.setFunc(t.depthFunc),c.setTest(t.depthTest),c.setMask(t.depthWrite),s.setMask(t.colorWrite);
var r=t.stencilWrite;
l.setTest(r),r&&(l.setFunc(t.stencilFunc,t.stencilRef,t.stencilMask),l.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ht(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits);
},
setFlipSided:ct,
setCullFace:lt,
setLineWidth:function setLineWidth(e){
e!==B&&(J&&t.lineWidth(e),B=e);
},
setPolygonOffset:ht,
setScissorTest:function setScissorTest(t){
t?at(3089):ot(3089);
},
activeTexture:ut,
bindTexture:function bindTexture(e,n){
null===K&&ut();
var r=$[K];
void 0===r&&(r={
type:void 0,
texture:void 0},
$[K]=r),r.type===e&&r.texture===n||(t.bindTexture(e,n||rt[e]),r.type=e,r.texture=n);
},
compressedTexImage2D:function compressedTexImage2D(){
try{
t.compressedTexImage2D.apply(t,arguments);
}catch(t){
console.error("THREE.WebGLState:",t);
}
},
texImage2D:function texImage2D(){
try{
t.texImage2D.apply(t,arguments);
}catch(t){
console.error("THREE.WebGLState:",t);
}
},
texImage3D:function texImage3D(){
try{
t.texImage3D.apply(t,arguments);
}catch(t){
console.error("THREE.WebGLState:",t);
}
},
scissor:function scissor(e){
!1===tt.equals(e)&&(t.scissor(e.x,e.y,e.z,e.w),tt.copy(e));
},
viewport:function viewport(e){
!1===et.equals(e)&&(t.viewport(e.x,e.y,e.z,e.w),et.copy(e));
},
reset:function reset(){
for(var e=0;e<f.length;e++){1===f[e]&&(t.disableVertexAttribArray(e),f[e]=0);}
v={},y=null,K=null,$={},T=null,A=null,I=null,z=null,s.reset(),c.reset(),l.reset();
}};

}

function vo(t,e,n,r,i,o,s){
var c,l=new WeakMap(),
h="undefined"!=typeof OffscreenCanvas;

function u(t,e){
return h?new OffscreenCanvas(t,e):a.createElementNS("http://www.w3.org/1999/xhtml","canvas");
}

function p(t,e,n,r){
var i=1;
if((t.width>r||t.height>r)&&(i=r/Math.max(t.width,t.height)),i<1||!0===e){
if("undefined"!=typeof HTMLImageElement&&t instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||"undefined"!=typeof ImageBitmap&&t instanceof ImageBitmap){
var a=e?Pe.floorPowerOfTwo:Math.floor,
o=a(i*t.width),
s=a(i*t.height);
void 0===c&&(c=u(o,s));
var l=n?u(o,s):c;
return l.width=o,l.height=s,l.getContext("2d").drawImage(t,0,0,o,s),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+t.width+"x"+t.height+") to ("+o+"x"+s+")."),l;
}
return"data"in t&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+t.width+"x"+t.height+")."),t;
}
return t;
}

function d(t){
return Pe.isPowerOfTwo(t.width)&&Pe.isPowerOfTwo(t.height);
}

function f(t,e){
return t.generateMipmaps&&e&&t.minFilter!==dt&&t.minFilter!==vt;
}

function m(e,n,i,a){
t.generateMipmap(e),r.get(n).__maxMipLevel=Math.log(Math.max(i,a))*Math.LOG2E;
}

function v(t,n){
if(!i.isWebGL2)return t;
var r=t;
return 6403===t&&(5126===n&&(r=33326),5131===n&&(r=33325),5121===n&&(r=33321)),6407===t&&(5126===n&&(r=34837),5131===n&&(r=34843),5121===n&&(r=32849)),6408===t&&(5126===n&&(r=34836),5131===n&&(r=34842),5121===n&&(r=32856)),33325===r||33326===r||34842===r||34836===r?e.get("EXT_color_buffer_float"):34843!==r&&34837!==r||console.warn("THREE.WebGLRenderer: Floating point textures with RGB format not supported. Please use RGBA instead."),r;
}

function g(t){
return t===dt||t===ft||t===mt?9728:9729;
}

function y(e){
var n=e.target;
n.removeEventListener("dispose",y),
function(e){
var n=r.get(e);
void 0!==n.__webglInit&&(t.deleteTexture(n.__webglTexture),r.remove(e));
}(n),n.isVideoTexture&&l.delete(n),s.memory.textures--;
}

function x(e){
var n=e.target;
n.removeEventListener("dispose",x),
function(e){
var n=r.get(e),
i=r.get(e.texture);
if(e){
if(void 0!==i.__webglTexture&&t.deleteTexture(i.__webglTexture),e.depthTexture&&e.depthTexture.dispose(),e.isWebGLRenderTargetCube)
for(var a=0;a<6;a++){t.deleteFramebuffer(n.__webglFramebuffer[a]),n.__webglDepthbuffer&&t.deleteRenderbuffer(n.__webglDepthbuffer[a]);}else
t.deleteFramebuffer(n.__webglFramebuffer),n.__webglDepthbuffer&&t.deleteRenderbuffer(n.__webglDepthbuffer);
r.remove(e.texture),r.remove(e);
}
}(n),s.memory.textures--;
}
var b=0;

function w(t,e){
var i=r.get(t);
if(t.isVideoTexture&&function(t){
var e=s.render.frame;
l.get(t)!==e&&(l.set(t,e),t.update());
}(t),t.version>0&&i.__version!==t.version){
var a=t.image;
if(void 0===a)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else
{
if(!1!==a.complete)return void E(i,t,e);
console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
}
}
n.activeTexture(33984+e),n.bindTexture(3553,i.__webglTexture);
}

function _(e,a){
if(6===e.image.length){
var s=r.get(e);
if(e.version>0&&s.__version!==e.version){
T(s,e),n.activeTexture(33984+a),n.bindTexture(34067,s.__webglTexture),t.pixelStorei(37440,e.flipY);
for(var c=e&&e.isCompressedTexture,l=e.image[0]&&e.image[0].isDataTexture,h=[],u=0;u<6;u++){h[u]=c||l?l?e.image[u].image:e.image[u]:p(e.image[u],!1,!0,i.maxCubemapSize);}
var g,y=h[0],
x=d(y)||i.isWebGL2,
b=o.convert(e.format),
w=o.convert(e.type),
_=v(b,w);
if(S(34067,e,x),c){
for(u=0;u<6;u++){
g=h[u].mipmaps;
for(var M=0;M<g.length;M++){
var E=g[M];
e.format!==Dt&&e.format!==Ot?n.getCompressedTextureFormats().indexOf(b)>-1?n.compressedTexImage2D(34069+u,M,_,E.width,E.height,0,E.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):n.texImage2D(34069+u,M,_,E.width,E.height,0,b,w,E.data);
}
}
s.__maxMipLevel=g.length-1;
}else{
for(g=e.mipmaps,u=0;u<6;u++){
if(l)
for(n.texImage2D(34069+u,0,_,h[u].width,h[u].height,0,b,w,h[u].data),M=0;M<g.length;M++){
var A=(E=g[M]).image[u].image;
n.texImage2D(34069+u,M+1,_,A.width,A.height,0,b,w,A.data);
}else
for(n.texImage2D(34069+u,0,_,b,w,h[u]),M=0;M<g.length;M++){E=g[M],n.texImage2D(34069+u,M+1,_,b,w,E.image[u]);}}
s.__maxMipLevel=g.length;
}
f(e,x)&&m(34067,e,y.width,y.height),s.__version=e.version,e.onUpdate&&e.onUpdate(e);
}else n.activeTexture(33984+a),n.bindTexture(34067,s.__webglTexture);
}
}

function M(t,e){
n.activeTexture(33984+e),n.bindTexture(34067,r.get(t).__webglTexture);
}

function S(n,a,s){
var c;
if(s?(t.texParameteri(n,10242,o.convert(a.wrapS)),t.texParameteri(n,10243,o.convert(a.wrapT)),32879!==n&&35866!==n||t.texParameteri(n,32882,o.convert(a.wrapR)),t.texParameteri(n,10240,o.convert(a.magFilter)),t.texParameteri(n,10241,o.convert(a.minFilter))):(t.texParameteri(n,10242,33071),t.texParameteri(n,10243,33071),32879!==n&&35866!==n||t.texParameteri(n,32882,33071),a.wrapS===ut&&a.wrapT===ut||console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(n,10240,g(a.magFilter)),t.texParameteri(n,10241,g(a.minFilter)),a.minFilter!==dt&&a.minFilter!==vt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),c=e.get("EXT_texture_filter_anisotropic")){
if(a.type===Tt&&null===e.get("OES_texture_float_linear"))return;
if(a.type===Et&&null===(i.isWebGL2||e.get("OES_texture_half_float_linear")))return;
(a.anisotropy>1||r.get(a).__currentAnisotropy)&&(t.texParameterf(n,c.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy);
}
}

function T(e,n){
void 0===e.__webglInit&&(e.__webglInit=!0,n.addEventListener("dispose",y),e.__webglTexture=t.createTexture(),s.memory.textures++);
}

function E(e,r,a){
var s=3553;
r.isDataTexture2DArray&&(s=35866),r.isDataTexture3D&&(s=32879),T(e,r),n.activeTexture(33984+a),n.bindTexture(s,e.__webglTexture),t.pixelStorei(37440,r.flipY),t.pixelStorei(37441,r.premultiplyAlpha),t.pixelStorei(3317,r.unpackAlignment);
var c=function(t){
return!i.isWebGL2&&(t.wrapS!==ut||t.wrapT!==ut||t.minFilter!==dt&&t.minFilter!==vt);
}(r)&&!1===d(r.image),
l=p(r.image,c,!1,i.maxTextureSize),
h=d(l)||i.isWebGL2,
u=o.convert(r.format),
g=o.convert(r.type),
y=v(u,g);
S(s,r,h);
var x,b=r.mipmaps;
if(r.isDepthTexture){
if(y=6402,r.type===Tt){
if(!i.isWebGL2)throw new Error("Float Depth Texture only supported in WebGL2.0");
y=36012;
}else i.isWebGL2&&(y=33189);
r.format===Bt&&6402===y&&r.type!==_t&&r.type!==St&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),r.type=_t,g=o.convert(r.type)),r.format===Ft&&(y=34041,r.type!==Pt&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),r.type=Pt,g=o.convert(r.type))),n.texImage2D(3553,0,y,l.width,l.height,0,u,g,null);
}else if(r.isDataTexture){
if(b.length>0&&h){
for(var w=0,_=b.length;w<_;w++){x=b[w],n.texImage2D(3553,w,y,x.width,x.height,0,u,g,x.data);}
r.generateMipmaps=!1,e.__maxMipLevel=b.length-1;
}else n.texImage2D(3553,0,y,l.width,l.height,0,u,g,l.data),e.__maxMipLevel=0;}else
if(r.isCompressedTexture){
for(w=0,_=b.length;w<_;w++){x=b[w],r.format!==Dt&&r.format!==Ot?n.getCompressedTextureFormats().indexOf(u)>-1?n.compressedTexImage2D(3553,w,y,x.width,x.height,0,x.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):n.texImage2D(3553,w,y,x.width,x.height,0,u,g,x.data);}
e.__maxMipLevel=b.length-1;
}else if(r.isDataTexture2DArray)n.texImage3D(35866,0,y,l.width,l.height,l.depth,0,u,g,l.data),e.__maxMipLevel=0;else
if(r.isDataTexture3D)n.texImage3D(32879,0,y,l.width,l.height,l.depth,0,u,g,l.data),e.__maxMipLevel=0;else
if(b.length>0&&h){
for(w=0,_=b.length;w<_;w++){x=b[w],n.texImage2D(3553,w,y,u,g,x);}
r.generateMipmaps=!1,e.__maxMipLevel=b.length-1;
}else n.texImage2D(3553,0,y,u,g,l),e.__maxMipLevel=0;
f(r,h)&&m(3553,r,l.width,l.height),e.__version=r.version,r.onUpdate&&r.onUpdate(r);
}

function A(e,i,a,s){
var c=o.convert(i.texture.format),
l=o.convert(i.texture.type),
h=v(c,l);
n.texImage2D(s,0,h,i.width,i.height,0,c,l,null),t.bindFramebuffer(36160,e),t.framebufferTexture2D(36160,a,s,r.get(i.texture).__webglTexture,0),t.bindFramebuffer(36160,null);
}

function L(e,n,r){
if(t.bindRenderbuffer(36161,e),n.depthBuffer&&!n.stencilBuffer){
if(r){
var i=P(n);
t.renderbufferStorageMultisample(36161,i,33189,n.width,n.height);
}else t.renderbufferStorage(36161,33189,n.width,n.height);
t.framebufferRenderbuffer(36160,36096,36161,e);
}else if(n.depthBuffer&&n.stencilBuffer)r?(i=P(n),t.renderbufferStorageMultisample(36161,i,35056,n.width,n.height)):t.renderbufferStorage(36161,34041,n.width,n.height),t.framebufferRenderbuffer(36160,33306,36161,e);else
{
var a=v(o.convert(n.texture.format),o.convert(n.texture.type));
r?(i=P(n),t.renderbufferStorageMultisample(36161,i,a,n.width,n.height)):t.renderbufferStorage(36161,a,n.width,n.height);
}
t.bindRenderbuffer(36161,null);
}

function R(e){
var n=r.get(e),
i=!0===e.isWebGLRenderTargetCube;
if(e.depthTexture){
if(i)throw new Error("target.depthTexture not supported in Cube render targets");
!function(e,n){
if(n&&n.isWebGLRenderTargetCube)throw new Error("Depth Texture with cube render targets is not supported");
if(t.bindFramebuffer(36160,e),!n.depthTexture||!n.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
r.get(n.depthTexture).__webglTexture&&n.depthTexture.image.width===n.width&&n.depthTexture.image.height===n.height||(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),w(n.depthTexture,0);
var i=r.get(n.depthTexture).__webglTexture;
if(n.depthTexture.format===Bt)t.framebufferTexture2D(36160,36096,3553,i,0);else
{
if(n.depthTexture.format!==Ft)throw new Error("Unknown depthTexture format");
t.framebufferTexture2D(36160,33306,3553,i,0);
}
}(n.__webglFramebuffer,e);
}else if(i){
n.__webglDepthbuffer=[];
for(var a=0;a<6;a++){t.bindFramebuffer(36160,n.__webglFramebuffer[a]),n.__webglDepthbuffer[a]=t.createRenderbuffer(),L(n.__webglDepthbuffer[a],e);}
}else t.bindFramebuffer(36160,n.__webglFramebuffer),n.__webglDepthbuffer=t.createRenderbuffer(),L(n.__webglDepthbuffer,e);
t.bindFramebuffer(36160,null);
}

function P(t){
return i.isWebGL2&&t.isWebGLMultisampleRenderTarget?Math.min(i.maxSamples,t.samples):0;
}
var C=!1,
O=!1;
this.allocateTextureUnit=function(){
var t=b;
return t>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+t+" texture units while this GPU supports only "+i.maxTextures),b+=1,t;
},this.resetTextureUnits=function(){
b=0;
},this.setTexture2D=w,this.setTexture2DArray=function(t,e){
var i=r.get(t);
t.version>0&&i.__version!==t.version?E(i,t,e):(n.activeTexture(33984+e),n.bindTexture(35866,i.__webglTexture));
},this.setTexture3D=function(t,e){
var i=r.get(t);
t.version>0&&i.__version!==t.version?E(i,t,e):(n.activeTexture(33984+e),n.bindTexture(32879,i.__webglTexture));
},this.setTextureCube=_,this.setTextureCubeDynamic=M,this.setupRenderTarget=function(e){
var a=r.get(e),
c=r.get(e.texture);
e.addEventListener("dispose",x),c.__webglTexture=t.createTexture(),s.memory.textures++;
var l=!0===e.isWebGLRenderTargetCube,
h=!0===e.isWebGLMultisampleRenderTarget,
u=d(e)||i.isWebGL2;
if(l){
a.__webglFramebuffer=[];
for(var p=0;p<6;p++){a.__webglFramebuffer[p]=t.createFramebuffer();}
}else if(a.__webglFramebuffer=t.createFramebuffer(),h)
if(i.isWebGL2){
a.__webglMultisampledFramebuffer=t.createFramebuffer(),a.__webglColorRenderbuffer=t.createRenderbuffer(),t.bindRenderbuffer(36161,a.__webglColorRenderbuffer);
var g=v(o.convert(e.texture.format),o.convert(e.texture.type)),
y=P(e);
t.renderbufferStorageMultisample(36161,y,g,e.width,e.height),t.bindFramebuffer(36160,a.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(36160,36064,36161,a.__webglColorRenderbuffer),t.bindRenderbuffer(36161,null),e.depthBuffer&&(a.__webglDepthRenderbuffer=t.createRenderbuffer(),L(a.__webglDepthRenderbuffer,e,!0)),t.bindFramebuffer(36160,null);
}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
if(l){
for(n.bindTexture(34067,c.__webglTexture),S(34067,e.texture,u),p=0;p<6;p++){A(a.__webglFramebuffer[p],e,36064,34069+p);}
f(e.texture,u)&&m(34067,e.texture,e.width,e.height),n.bindTexture(34067,null);
}else n.bindTexture(3553,c.__webglTexture),S(3553,e.texture,u),A(a.__webglFramebuffer,e,36064,3553),f(e.texture,u)&&m(3553,e.texture,e.width,e.height),n.bindTexture(3553,null);
e.depthBuffer&&R(e);
},this.updateRenderTargetMipmap=function(t){
var e=t.texture;
if(f(e,d(t)||i.isWebGL2)){
var a=t.isWebGLRenderTargetCube?34067:3553,
o=r.get(e).__webglTexture;
n.bindTexture(a,o),m(a,e,t.width,t.height),n.bindTexture(a,null);
}
},this.updateMultisampleRenderTarget=function(e){
if(e.isWebGLMultisampleRenderTarget)
if(i.isWebGL2){
var n=r.get(e);
t.bindFramebuffer(36008,n.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,n.__webglFramebuffer);
var a=e.width,
o=e.height,
s=16384;
e.depthBuffer&&(s|=256),e.stencilBuffer&&(s|=1024),t.blitFramebuffer(0,0,a,o,0,0,a,o,s,9728);
}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
},this.safeSetTexture2D=function(t,e){
t&&t.isWebGLRenderTarget&&(!1===C&&(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."),C=!0),t=t.texture),w(t,e);
},this.safeSetTextureCube=function(t,e){
t&&t.isWebGLRenderTargetCube&&(!1===O&&(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),O=!0),t=t.texture),t&&t.isCubeTexture||Array.isArray(t.image)&&6===t.image.length?_(t,e):M(t,e);
};
}

function go(t,e,n){
return{
convert:function convert(t){
var r;
if(t===ht)return 10497;
if(t===ut)return 33071;
if(t===pt)return 33648;
if(t===dt)return 9728;
if(t===ft)return 9984;
if(t===mt)return 9986;
if(t===vt)return 9729;
if(t===gt)return 9985;
if(t===yt)return 9987;
if(t===xt)return 5121;
if(t===At)return 32819;
if(t===Lt)return 32820;
if(t===Rt)return 33635;
if(t===bt)return 5120;
if(t===wt)return 5122;
if(t===_t)return 5123;
if(t===Mt)return 5124;
if(t===St)return 5125;
if(t===Tt)return 5126;
if(t===Et){
if(n.isWebGL2)return 5131;
if(null!==(r=e.get("OES_texture_half_float")))return r.HALF_FLOAT_OES;
}
if(t===Ct)return 6406;
if(t===Ot)return 6407;
if(t===Dt)return 6408;
if(t===Nt)return 6409;
if(t===It)return 6410;
if(t===Bt)return 6402;
if(t===Ft)return 34041;
if(t===Gt)return 6403;
if(t===S)return 32774;
if(t===T)return 32778;
if(t===E)return 32779;
if(t===R)return 0;
if(t===P)return 1;
if(t===C)return 768;
if(t===O)return 769;
if(t===D)return 770;
if(t===N)return 771;
if(t===I)return 772;
if(t===z)return 773;
if(t===B)return 774;
if(t===F)return 775;
if(t===G)return 776;
if((t===Ut||t===Ht||t===Vt||t===jt)&&null!==(r=e.get("WEBGL_compressed_texture_s3tc"))){
if(t===Ut)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
if(t===Ht)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
if(t===Vt)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
if(t===jt)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
}
if((t===kt||t===Wt||t===qt||t===Xt)&&null!==(r=e.get("WEBGL_compressed_texture_pvrtc"))){
if(t===kt)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
if(t===Wt)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
if(t===qt)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
if(t===Xt)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
}
if(t===Yt&&null!==(r=e.get("WEBGL_compressed_texture_etc1")))return r.COMPRESSED_RGB_ETC1_WEBGL;
if((t===Jt||t===Zt||t===Qt||t===Kt||t===$t||t===te||t===ee||t===ne||t===re||t===ie||t===ae||t===oe||t===se||t===ce)&&null!==(r=e.get("WEBGL_compressed_texture_astc")))return t;
if(t===A||t===L){
if(n.isWebGL2){
if(t===A)return 32775;
if(t===L)return 32776;
}
if(null!==(r=e.get("EXT_blend_minmax"))){
if(t===A)return r.MIN_EXT;
if(t===L)return r.MAX_EXT;
}
}
if(t===Pt){
if(n.isWebGL2)return 34042;
if(null!==(r=e.get("WEBGL_depth_texture")))return r.UNSIGNED_INT_24_8_WEBGL;
}
return 0;
}};

}

function yo(){
gn.call(this),this.type="Group";
}

function xo(t){
ui.call(this),this.cameras=t||[];
}
yo.prototype=Object.assign(Object.create(gn.prototype),{
constructor:yo,
isGroup:!0}),
xo.prototype=Object.assign(Object.create(ui.prototype),{
constructor:xo,
isArrayCamera:!0});

var bo,wo=new Ie(),
_o=new Ie();

function Mo(t,e,n){
wo.setFromMatrixPosition(e.matrixWorld),_o.setFromMatrixPosition(n.matrixWorld);
var r=wo.distanceTo(_o),
i=e.projectionMatrix.elements,
a=n.projectionMatrix.elements,
o=i[14]/(i[10]-1),
s=i[14]/(i[10]+1),
c=(i[9]+1)/i[5],
l=(i[9]-1)/i[5],
h=(i[8]-1)/i[0],
u=(a[8]+1)/a[0],
p=o*h,
d=o*u,
f=r/(-h+u),
m=f*-h;
e.matrixWorld.decompose(t.position,t.quaternion,t.scale),t.translateX(m),t.translateZ(f),t.matrixWorld.compose(t.position,t.quaternion,t.scale),t.matrixWorldInverse.getInverse(t.matrixWorld);
var v=o+f,
g=s+f,
y=p-m,
x=d+(r-m),
b=c*s/g*v,
w=l*s/g*v;
t.projectionMatrix.makePerspective(y,x,b,w,v,g);
}

function So(t){
var e,n,r=this,
i=null,
a=null,
s=null,
c=[],
l=new Ke(),
h=new Ke(),
u=1,
p="local-floor";
void 0!==o&&"VRFrameData"in o&&(a=new o.VRFrameData(),o.addEventListener("vrdisplaypresentchange",_,!1));
var d=new Ke(),
f=new Oe(),
m=new Ie(),
v=new ui();
v.viewport=new Ve(),v.layers.enable(1);
var g=new ui();
g.viewport=new Ve(),g.layers.enable(2);
var y=new xo([v,g]);

function x(){
return null!==i&&!0===i.isPresenting;
}
y.layers.enable(1),y.layers.enable(2);
var b,w=new Ce();

function _(){
if(x()){
var a=i.getEyeParameters("left");
e=2*a.renderWidth*u,n=a.renderHeight*u,b=t.getPixelRatio(),t.getSize(w),t.setDrawingBufferSize(e,n,1),v.viewport.set(0,0,e/2,n),g.viewport.set(e/2,0,e/2,n),E.start(),r.dispatchEvent({
type:"sessionstart"});

}else r.enabled&&t.setDrawingBufferSize(w.width,w.height,b),E.stop(),r.dispatchEvent({
type:"sessionend"});

}
var M=[];

function S(t){
for(var e=navigator.getGamepads&&navigator.getGamepads(),n=0,r=0,i=e.length;n<i;n++){
var a=e[n];
if(a&&("Daydream Controller"===a.id||"Gear VR Controller"===a.id||"Oculus Go Controller"===a.id||"OpenVR Gamepad"===a.id||a.id.startsWith("Oculus Touch")||a.id.startsWith("HTC Vive Focus")||a.id.startsWith("Spatial Controller"))){
if(r===t)return a;
r++;
}
}
}

function T(t,r){
null!==r&&4===r.length&&t.set(r[0]*e,r[1]*n,r[2]*e,r[3]*n);
}
this.enabled=!1,this.getController=function(t){
var e=c[t];
return void 0===e&&((e=new yo()).matrixAutoUpdate=!1,e.visible=!1,c[t]=e),e;
},this.getDevice=function(){
return i;
},this.setDevice=function(t){
void 0!==t&&(i=t),E.setContext(t);
},this.setFramebufferScaleFactor=function(t){
u=t;
},this.setReferenceSpaceType=function(t){
p=t;
},this.setPoseTarget=function(t){
void 0!==t&&(s=t);
},this.getCamera=function(t){
var e="local-floor"===p?1.6:0;
if(!1===x())return t.position.set(0,e,0),t.rotation.set(0,0,0),t;
if(i.depthNear=t.near,i.depthFar=t.far,i.getFrameData(a),"local-floor"===p){
var n=i.stageParameters;
n?l.fromArray(n.sittingToStandingTransform):l.makeTranslation(0,e,0);
}
var r=a.pose,
o=null!==s?s:t;
o.matrix.copy(l),o.matrix.decompose(o.position,o.quaternion,o.scale),null!==r.orientation&&(f.fromArray(r.orientation),o.quaternion.multiply(f)),null!==r.position&&(f.setFromRotationMatrix(l),m.fromArray(r.position),m.applyQuaternion(f),o.position.add(m)),o.updateMatrixWorld(),v.near=t.near,g.near=t.near,v.far=t.far,g.far=t.far,v.matrixWorldInverse.fromArray(a.leftViewMatrix),g.matrixWorldInverse.fromArray(a.rightViewMatrix),h.getInverse(l),"local-floor"===p&&(v.matrixWorldInverse.multiply(h),g.matrixWorldInverse.multiply(h));
var u=o.parent;
null!==u&&(d.getInverse(u.matrixWorld),v.matrixWorldInverse.multiply(d),g.matrixWorldInverse.multiply(d)),v.matrixWorld.getInverse(v.matrixWorldInverse),g.matrixWorld.getInverse(g.matrixWorldInverse),v.projectionMatrix.fromArray(a.leftProjectionMatrix),g.projectionMatrix.fromArray(a.rightProjectionMatrix),Mo(y,v,g);
var b=i.getLayers();
if(b.length){
var w=b[0];
T(v.viewport,w.leftBounds),T(g.viewport,w.rightBounds);
}
return function(){
for(var t=0;t<c.length;t++){
var e=c[t],
n=S(t);
if(void 0!==n&&void 0!==n.pose){
if(null===n.pose)return;
var r=n.pose;
!1===r.hasPosition&&e.position.set(.2,-.6,-.05),null!==r.position&&e.position.fromArray(r.position),null!==r.orientation&&e.quaternion.fromArray(r.orientation),e.matrix.compose(e.position,e.quaternion,e.scale),e.matrix.premultiply(l),e.matrix.decompose(e.position,e.quaternion,e.scale),e.matrixWorldNeedsUpdate=!0,e.visible=!0;
var i="Daydream Controller"===n.id?0:1;
void 0===M[t]&&(M[t]=!1),M[t]!==n.buttons[i].pressed&&(M[t]=n.buttons[i].pressed,!0===M[t]?e.dispatchEvent({
type:"selectstart"}):(
e.dispatchEvent({
type:"selectend"}),
e.dispatchEvent({
type:"select"})));

}else e.visible=!1;
}
}(),y;
},this.getStandingMatrix=function(){
return l;
},this.isPresenting=x;
var E=new Ai();
this.setAnimationLoop=function(t){
E.setAnimationLoop(t),x()&&E.start();
},this.submitFrame=function(){
x()&&i.submitFrame();
},this.dispose=function(){
void 0!==o&&o.removeEventListener("vrdisplaypresentchange",_);
},this.setFrameOfReferenceType=function(){
console.warn("THREE.WebVRManager: setFrameOfReferenceType() has been deprecated.");
};
}

function To(t,e){
var n=this,
r=null,
i=null,
a="local-floor",
o=null,
s=[],
c=[];

function l(){
return null!==r&&null!==i;
}
var h=new ui();
h.layers.enable(1),h.viewport=new Ve();
var u=new ui();
u.layers.enable(2),u.viewport=new Ve();
var p=new xo([h,u]);

function d(t){
for(var e=0;e<s.length;e++){c[e]===t.inputSource&&s[e].dispatchEvent({
type:t.type});}

}

function f(){
t.setFramebuffer(null),t.setRenderTarget(t.getRenderTarget()),y.stop(),n.dispatchEvent({
type:"sessionend"});

}

function m(t){
i=t,y.setContext(r),y.start(),n.dispatchEvent({
type:"sessionstart"});

}

function v(t,e){
null===e?t.matrixWorld.copy(t.matrix):t.matrixWorld.multiplyMatrices(e.matrixWorld,t.matrix),t.matrixWorldInverse.getInverse(t.matrixWorld);
}
p.layers.enable(1),p.layers.enable(2),this.enabled=!1,this.getController=function(t){
var e=s[t];
return void 0===e&&((e=new yo()).matrixAutoUpdate=!1,e.visible=!1,s[t]=e),e;
},this.setFramebufferScaleFactor=function(t){},this.setReferenceSpaceType=function(t){
a=t;
},this.getSession=function(){
return r;
},this.setSession=function(t){
null!==(r=t)&&(r.addEventListener("select",d),r.addEventListener("selectstart",d),r.addEventListener("selectend",d),r.addEventListener("end",f),r.updateRenderState({
baseLayer:new XRWebGLLayer(r,e)}),
r.requestReferenceSpace(a).then(m),c=r.inputSources,r.addEventListener("inputsourceschange",function(){
c=r.inputSources,console.log(c);
for(var t=0;t<s.length;t++){s[t].userData.inputSource=c[t];}
}));
},this.getCamera=function(t){
if(l()){
var e=t.parent,
n=p.cameras;
v(p,e);
for(var r=0;r<n.length;r++){v(n[r],e);}
t.matrixWorld.copy(p.matrixWorld);
for(var i=t.children,a=(r=0,i.length);r<a;r++){i[r].updateMatrixWorld(!0);}
return Mo(p,h,u),p;
}
return t;
},this.isPresenting=l;
var g=null,
y=new Ai();
y.setAnimationLoop(function(e,n){
if(null!==(o=n.getViewerPose(i))){
var a=o.views,
l=r.renderState.baseLayer;
t.setFramebuffer(l.framebuffer);
for(var h=0;h<a.length;h++){
var u=a[h],
d=l.getViewport(u),
f=u.transform.inverse.matrix,
m=p.cameras[h];
m.matrix.fromArray(f).getInverse(m.matrix),m.projectionMatrix.fromArray(u.projectionMatrix),m.viewport.set(d.x,d.y,d.width,d.height),0===h&&p.matrix.copy(m.matrix);
}
}
for(h=0;h<s.length;h++){
var v=s[h],
y=c[h];
if(y){
var x=n.getPose(y.targetRaySpace,i);
if(null!==x){
v.matrix.fromArray(x.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.visible=!0;
continue;
}
}
v.visible=!1;
}
g&&g(e);
}),this.setAnimationLoop=function(t){
g=t;
},this.dispose=function(){},this.getStandingMatrix=function(){
return console.warn("THREE.WebXRManager: getStandingMatrix() is no longer needed."),new Ke();
},this.getDevice=function(){
console.warn("THREE.WebXRManager: getDevice() has been deprecated.");
},this.setDevice=function(){
console.warn("THREE.WebXRManager: setDevice() has been deprecated.");
},this.setFrameOfReferenceType=function(){
console.warn("THREE.WebXRManager: setFrameOfReferenceType() has been deprecated.");
},this.submitFrame=function(){};
}

function Eo(t){
var e=void 0!==(t=t||{}).canvas?t.canvas:a.createElementNS("http://www.w3.org/1999/xhtml","canvas"),
n=void 0!==t.context?t.context:null,
r=void 0!==t.alpha&&t.alpha,
i=void 0===t.depth||t.depth,
s=void 0===t.stencil||t.stencil,
c=void 0!==t.antialias&&t.antialias,
l=void 0===t.premultipliedAlpha||t.premultipliedAlpha,
h=void 0!==t.preserveDrawingBuffer&&t.preserveDrawingBuffer,
u=void 0!==t.powerPreference?t.powerPreference:"default",
d=void 0!==t.failIfMajorPerformanceCaveat&&t.failIfMajorPerformanceCaveat,
f=null,
m=null;
this.domElement=e,this.debug={
checkShaderErrors:!0},
this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.gammaInput=!1,this.gammaOutput=!1,this.physicallyCorrectLights=!1,this.toneMapping=K,this.toneMappingExposure=1,this.toneMappingWhitePoint=1,this.maxMorphTargets=8,this.maxMorphNormals=4;
var v,g,y,x,b,w,_,M,S,T,E,A,L,R,P,C,O,D,N=this,
I=!1,
z=null,
B=0,
F=0,
G=null,
U=null,
H=-1,
V={
geometry:null,
program:null,
wireframe:!1},

j=null,
k=null,
W=new Ve(),
q=new Ve(),
X=null,
Y=e.width,
J=e.height,
Z=1,
Q=new Ve(0,0,Y,J),
$=new Ve(0,0,Y,J),
tt=!1,
et=new Mi(),
nt=new Ni(),
rt=!1,
it=!1,
at=new Ke(),
ot=new Ie();

function st(){
return null===G?Z:1;
}
try{
var ct={
// alpha: r,
alpha:true,
depth:i,
stencil:s,
antialias:c,
premultipliedAlpha:l,
preserveDrawingBuffer:h,
powerPreference:u,
failIfMajorPerformanceCaveat:d,
xrCompatible:!0};

if(e.addEventListener("webglcontextlost",pt,!1),e.addEventListener("webglcontextrestored",dt,!1),null===(v=n||e.getContext("webgl",ct)||e.getContext("experimental-webgl",ct)))throw null!==e.getContext("webgl")?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.");
void 0===v.getShaderPrecisionFormat&&(v.getShaderPrecisionFormat=function(){
return{
rangeMin:1,
rangeMax:1,
precision:1};

});
}catch(t){
throw console.error("THREE.WebGLRenderer: "+t.message),t;
}

function lt(){
g=new Ii(v),(y=new Di(v,g,t)).isWebGL2||(g.get("WEBGL_depth_texture"),g.get("OES_texture_float"),g.get("OES_texture_half_float"),g.get("OES_texture_half_float_linear"),g.get("OES_standard_derivatives"),g.get("OES_element_index_uint"),g.get("ANGLE_instanced_arrays")),g.get("OES_texture_float_linear"),D=new go(v,g,y),(x=new mo(v,g,D,y)).scissor(q.copy($).multiplyScalar(Z).floor()),x.viewport(W.copy(Q).multiplyScalar(Z).floor()),b=new Fi(v),w=new Ka(),_=new vo(v,g,x,w,y,D,b),M=new Li(v),S=new zi(v,M,b),T=new Hi(S,b),P=new Ui(v),E=new Qa(N,g,y),A=new no(),L=new co(),R=new Ci(N,x,T,l),C=new Oi(v,g,b,y),O=new Bi(v,g,b,y),b.programs=E.programs,N.capabilities=y,N.extensions=g,N.properties=w,N.renderLists=A,N.state=x,N.info=b;
}
lt();
var ht="undefined"!=typeof navigator&&"xr"in navigator&&"supportsSession"in navigator.xr?new To(N,v):new So(N);
this.vr=ht;
var ut=new fo(N,T,y.maxTextureSize);

function pt(t){
t.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0;
}

function dt(){
console.log("THREE.WebGLRenderer: Context Restored."),I=!1,lt();
}

function ft(t){
var e=t.target;
e.removeEventListener("dispose",ft),
function(t){
mt(t),w.remove(t);
}(e);
}

function mt(t){
var e=w.get(t).program;
t.program=void 0,void 0!==e&&E.releaseProgram(e);
}
this.shadowMap=ut,this.getContext=function(){
return v;
},this.getContextAttributes=function(){
return v.getContextAttributes();
},this.forceContextLoss=function(){
var t=g.get("WEBGL_lose_context");
t&&t.loseContext();
},this.forceContextRestore=function(){
var t=g.get("WEBGL_lose_context");
t&&t.restoreContext();
},this.getPixelRatio=function(){
return Z;
},this.setPixelRatio=function(t){
void 0!==t&&(Z=t,this.setSize(Y,J,!1));
},this.getSize=function(t){
return void 0===t&&(console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"),t=new Ce()),t.set(Y,J);
},this.setSize=function(t,n,r){
ht.isPresenting()?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(Y=t,J=n,e.width=Math.floor(t*Z),e.height=Math.floor(n*Z),!1!==r&&(e.style.width=t+"px",e.style.height=n+"px"),this.setViewport(0,0,t,n));
},this.getDrawingBufferSize=function(t){
return void 0===t&&(console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"),t=new Ce()),t.set(Y*Z,J*Z).floor();
},this.setDrawingBufferSize=function(t,n,r){
Y=t,J=n,Z=r,e.width=Math.floor(t*r),e.height=Math.floor(n*r),this.setViewport(0,0,t,n);
},this.getCurrentViewport=function(t){
return void 0===t&&(console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"),t=new Ve()),t.copy(W);
},this.getViewport=function(t){
return t.copy(Q);
},this.setViewport=function(t,e,n,r){
t.isVector4?Q.set(t.x,t.y,t.z,t.w):Q.set(t,e,n,r),x.viewport(W.copy(Q).multiplyScalar(Z).floor());
},this.getScissor=function(t){
return t.copy($);
},this.setScissor=function(t,e,n,r){
t.isVector4?$.set(t.x,t.y,t.z,t.w):$.set(t,e,n,r),x.scissor(q.copy($).multiplyScalar(Z).floor());
},this.getScissorTest=function(){
return tt;
},this.setScissorTest=function(t){
x.setScissorTest(tt=t);
},this.getClearColor=function(){
return R.getClearColor();
},this.setClearColor=function(){
R.setClearColor.apply(R,arguments);
},this.getClearAlpha=function(){
return R.getClearAlpha();
},this.setClearAlpha=function(){
R.setClearAlpha.apply(R,arguments);
},this.clear=function(t,e,n){
var r=0;
(void 0===t||t)&&(r|=16384),(void 0===e||e)&&(r|=256),(void 0===n||n)&&(r|=1024),v.clear(r);
},this.clearColor=function(){
this.clear(!0,!1,!1);
},this.clearDepth=function(){
this.clear(!1,!0,!1);
},this.clearStencil=function(){
this.clear(!1,!1,!0);
},this.dispose=function(){
e.removeEventListener("webglcontextlost",pt,!1),e.removeEventListener("webglcontextrestored",dt,!1),A.dispose(),L.dispose(),w.dispose(),T.dispose(),ht.dispose(),gt.stop();
},this.renderBufferImmediate=function(t,e){
x.initAttributes();
var n=w.get(t);
t.hasPositions&&!n.position&&(n.position=v.createBuffer()),t.hasNormals&&!n.normal&&(n.normal=v.createBuffer()),t.hasUvs&&!n.uv&&(n.uv=v.createBuffer()),t.hasColors&&!n.color&&(n.color=v.createBuffer());
var r=e.getAttributes();
t.hasPositions&&(v.bindBuffer(34962,n.position),v.bufferData(34962,t.positionArray,35048),x.enableAttribute(r.position),v.vertexAttribPointer(r.position,3,5126,!1,0,0)),t.hasNormals&&(v.bindBuffer(34962,n.normal),v.bufferData(34962,t.normalArray,35048),x.enableAttribute(r.normal),v.vertexAttribPointer(r.normal,3,5126,!1,0,0)),t.hasUvs&&(v.bindBuffer(34962,n.uv),v.bufferData(34962,t.uvArray,35048),x.enableAttribute(r.uv),v.vertexAttribPointer(r.uv,2,5126,!1,0,0)),t.hasColors&&(v.bindBuffer(34962,n.color),v.bufferData(34962,t.colorArray,35048),x.enableAttribute(r.color),v.vertexAttribPointer(r.color,3,5126,!1,0,0)),x.disableUnusedAttributes(),v.drawArrays(4,0,t.count),t.count=0;
},this.renderBufferDirect=function(t,e,n,r,i,a){
var o=i.isMesh&&i.matrixWorld.determinant()<0;
x.setMaterial(r,o);
var s=Mt(t,e,r,i),
c=!1;
V.geometry===n.id&&V.program===s.id&&V.wireframe===(!0===r.wireframe)||(V.geometry=n.id,V.program=s.id,V.wireframe=!0===r.wireframe,c=!0),i.morphTargetInfluences&&(P.update(i,n,r,s),c=!0);
var l,h=n.index,
u=n.attributes.position,
p=1;
!0===r.wireframe&&(h=S.getWireframeAttribute(n),p=2);
var d=C;
null!==h&&(l=M.get(h),(d=O).setIndex(l)),c&&(function(t,e,n){
if(n&&n.isInstancedBufferGeometry&&!y.isWebGL2&&null===g.get("ANGLE_instanced_arrays"))console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");else
{
x.initAttributes();
var r=n.attributes,
i=e.getAttributes(),
a=t.defaultAttributeValues;
for(var o in i){
var s=i[o];
if(s>=0){
var c=r[o];
if(void 0!==c){
var l=c.normalized,
h=c.itemSize,
u=M.get(c);
if(void 0===u)continue;
var p=u.buffer,
d=u.type,
f=u.bytesPerElement;
if(c.isInterleavedBufferAttribute){
var m=c.data,
b=m.stride,
w=c.offset;
m&&m.isInstancedInterleavedBuffer?(x.enableAttributeAndDivisor(s,m.meshPerAttribute),void 0===n.maxInstancedCount&&(n.maxInstancedCount=m.meshPerAttribute*m.count)):x.enableAttribute(s),v.bindBuffer(34962,p),v.vertexAttribPointer(s,h,d,l,b*f,w*f);
}else c.isInstancedBufferAttribute?(x.enableAttributeAndDivisor(s,c.meshPerAttribute),void 0===n.maxInstancedCount&&(n.maxInstancedCount=c.meshPerAttribute*c.count)):x.enableAttribute(s),v.bindBuffer(34962,p),v.vertexAttribPointer(s,h,d,l,0,0);
}else if(void 0!==a){
var _=a[o];
if(void 0!==_)switch(_.length){
case 2:
v.vertexAttrib2fv(s,_);
break;
case 3:
v.vertexAttrib3fv(s,_);
break;
case 4:
v.vertexAttrib4fv(s,_);
break;
default:
v.vertexAttrib1fv(s,_);}

}
}
}
x.disableUnusedAttributes();
}
}(r,s,n),null!==h&&v.bindBuffer(34963,l.buffer));
var f=1/0;
null!==h?f=h.count:void 0!==u&&(f=u.count);
var m=n.drawRange.start*p,
b=n.drawRange.count*p,
w=null!==a?a.start*p:0,
_=null!==a?a.count*p:1/0,
T=Math.max(m,w),
E=Math.min(f,m+b,w+_)-1,
A=Math.max(0,E-T+1);
if(0!==A){
if(i.isMesh){
if(!0===r.wireframe)x.setLineWidth(r.wireframeLinewidth*st()),d.setMode(1);else
switch(i.drawMode){
case ue:
d.setMode(4);
break;
case pe:
d.setMode(5);
break;
case de:
d.setMode(6);}}else
if(i.isLine){
var L=r.linewidth;
void 0===L&&(L=1),x.setLineWidth(L*st()),i.isLineSegments?d.setMode(1):i.isLineLoop?d.setMode(2):d.setMode(3);
}else i.isPoints?d.setMode(0):i.isSprite&&d.setMode(4);
n&&n.isInstancedBufferGeometry?n.maxInstancedCount>0&&d.renderInstances(n,T,A):d.render(T,A);
}
},this.compile=function(t,e){
(m=L.get(t,e)).init(),t.traverse(function(t){
t.isLight&&(m.pushLight(t),t.castShadow&&m.pushShadow(t));
}),m.setupLights(e),t.traverse(function(e){
if(e.material)
if(Array.isArray(e.material))
for(var n=0;n<e.material.length;n++){_t(e.material[n],t.fog,e);}else
_t(e.material,t.fog,e);
});
};
var vt=null,
gt=new Ai();

function yt(t,e,n,r){
if(!1!==t.visible){
if(t.layers.test(e.layers))
if(t.isGroup)n=t.renderOrder;else
if(t.isLOD)!0===t.autoUpdate&&t.update(e);else
if(t.isLight)m.pushLight(t),t.castShadow&&m.pushShadow(t);else
if(t.isSprite){
if(!t.frustumCulled||et.intersectsSprite(t)){
r&&ot.setFromMatrixPosition(t.matrixWorld).applyMatrix4(at);
var i=T.update(t);
(a=t.material).visible&&f.push(t,i,a,n,ot.z,null);
}
}else if(t.isImmediateRenderObject)r&&ot.setFromMatrixPosition(t.matrixWorld).applyMatrix4(at),f.push(t,null,t.material,n,ot.z,null);else
if((t.isMesh||t.isLine||t.isPoints)&&(t.isSkinnedMesh&&t.skeleton.update(),!t.frustumCulled||et.intersectsObject(t))){
r&&ot.setFromMatrixPosition(t.matrixWorld).applyMatrix4(at),i=T.update(t);
var a=t.material;
if(Array.isArray(a))
for(var o=i.groups,s=0,c=o.length;s<c;s++){
var l=o[s],
h=a[l.materialIndex];
h&&h.visible&&f.push(t,i,h,n,ot.z,l);
}else a.visible&&f.push(t,i,a,n,ot.z,null);
}
var u=t.children;
for(s=0,c=u.length;s<c;s++){yt(u[s],e,n,r);}
}
}

function bt(t,e,n,r){
for(var i=0,a=t.length;i<a;i++){
var o=t[i],
s=o.object,
c=o.geometry,
l=void 0===r?o.material:r,
h=o.group;
if(n.isArrayCamera){
k=n;
for(var u=n.cameras,p=0,d=u.length;p<d;p++){
var f=u[p];
s.layers.test(f.layers)&&(x.viewport(W.copy(f.viewport)),m.setupLights(f),wt(s,e,f,c,l,h));
}
}else k=null,wt(s,e,n,c,l,h);
}
}

function wt(t,e,n,r,i,a){
if(t.onBeforeRender(N,e,n,r,i,a),m=L.get(e,k||n),t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,t.matrixWorld),t.normalMatrix.getNormalMatrix(t.modelViewMatrix),t.isImmediateRenderObject){
x.setMaterial(i);
var o=Mt(n,e.fog,i,t);
V.geometry=null,V.program=null,V.wireframe=!1,
function(t,e){
t.render(function(t){
N.renderBufferImmediate(t,e);
});
}(t,o);
}else N.renderBufferDirect(n,e.fog,r,i,t,a);
t.onAfterRender(N,e,n,r,i,a),m=L.get(e,k||n);
}

function _t(t,e,n){
var r=w.get(t),
i=m.state.lights,
a=m.state.shadowsArray,
o=i.state.version,
s=E.getParameters(t,i.state,a,e,nt.numPlanes,nt.numIntersection,n),
c=E.getProgramCode(t,s),
l=r.program,
h=!0;
if(void 0===l)t.addEventListener("dispose",ft);else
if(l.code!==c)mt(t);else
if(r.lightsStateVersion!==o)r.lightsStateVersion=o,h=!1;else
{
if(void 0!==s.shaderID)return;
h=!1;
}
if(h){
if(s.shaderID){
var u=Ei[s.shaderID];
r.shader={
name:t.type,
uniforms:ii(u.uniforms),
vertexShader:u.vertexShader,
fragmentShader:u.fragmentShader};

}else r.shader={
name:t.type,
uniforms:t.uniforms,
vertexShader:t.vertexShader,
fragmentShader:t.fragmentShader};

t.onBeforeCompile(r.shader,N),c=E.getProgramCode(t,s),l=E.acquireProgram(t,r.shader,s,c),r.program=l,t.program=l;
}
var p=l.getAttributes();
if(t.morphTargets){
t.numSupportedMorphTargets=0;
for(var d=0;d<N.maxMorphTargets;d++){p["morphTarget"+d]>=0&&t.numSupportedMorphTargets++;}
}
if(t.morphNormals)
for(t.numSupportedMorphNormals=0,d=0;d<N.maxMorphNormals;d++){p["morphNormal"+d]>=0&&t.numSupportedMorphNormals++;}
var f=r.shader.uniforms;
(t.isShaderMaterial||t.isRawShaderMaterial)&&!0!==t.clipping||(r.numClippingPlanes=nt.numPlanes,r.numIntersection=nt.numIntersection,f.clippingPlanes=nt.uniform),r.fog=e,r.lightsStateVersion=o,t.lights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.spotLights.value=i.state.spot,f.rectAreaLights.value=i.state.rectArea,f.pointLights.value=i.state.point,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMap.value=i.state.directionalShadowMap,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotShadowMap.value=i.state.spotShadowMap,f.spotShadowMatrix.value=i.state.spotShadowMatrix,f.pointShadowMap.value=i.state.pointShadowMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix);
var v=r.program.getUniforms(),
g=Fa.seqWithValue(v.seq,f);
r.uniformsList=g;
}

function Mt(t,e,n,r){
_.resetTextureUnits();
var i=w.get(n),
a=m.state.lights;
if(rt&&(it||t!==j)){
var o=t===j&&n.id===H;
nt.setState(n.clippingPlanes,n.clipIntersection,n.clipShadows,t,i,o);
}!1===n.needsUpdate&&(void 0===i.program?n.needsUpdate=!0:n.fog&&i.fog!==e?n.needsUpdate=!0:n.lights&&i.lightsStateVersion!==a.state.version?n.needsUpdate=!0:void 0===i.numClippingPlanes||i.numClippingPlanes===nt.numPlanes&&i.numIntersection===nt.numIntersection||(n.needsUpdate=!0)),n.needsUpdate&&(_t(n,e,r),n.needsUpdate=!1);
var s,c,l=!1,
h=!1,
u=!1,
d=i.program,
f=d.getUniforms(),
g=i.shader.uniforms;
if(x.useProgram(d.program)&&(l=!0,h=!0,u=!0),n.id!==H&&(H=n.id,h=!0),l||j!==t){
if(f.setValue(v,"projectionMatrix",t.projectionMatrix),y.logarithmicDepthBuffer&&f.setValue(v,"logDepthBufFC",2/(Math.log(t.far+1)/Math.LN2)),j!==t&&(j=t,h=!0,u=!0),n.isShaderMaterial||n.isMeshPhongMaterial||n.isMeshStandardMaterial||n.envMap){
var b=f.map.cameraPosition;
void 0!==b&&b.setValue(v,ot.setFromMatrixPosition(t.matrixWorld));
}(n.isMeshPhongMaterial||n.isMeshLambertMaterial||n.isMeshBasicMaterial||n.isMeshStandardMaterial||n.isShaderMaterial||n.skinning)&&f.setValue(v,"viewMatrix",t.matrixWorldInverse);
}
if(n.skinning){
f.setOptional(v,r,"bindMatrix"),f.setOptional(v,r,"bindMatrixInverse");
var M=r.skeleton;
if(M){
var S=M.bones;
if(y.floatVertexTextures){
if(void 0===M.boneTexture){
var T=Math.sqrt(4*S.length);
T=Pe.ceilPowerOfTwo(T),T=Math.max(T,4);
var E=new Float32Array(T*T*4);
E.set(M.boneMatrices);
var A=new vi(E,T,T,Dt,Tt);
A.needsUpdate=!0,M.boneMatrices=E,M.boneTexture=A,M.boneTextureSize=T;
}
f.setValue(v,"boneTexture",M.boneTexture,_),f.setValue(v,"boneTextureSize",M.boneTextureSize);
}else f.setOptional(v,M,"boneMatrices");
}
}
return h&&(f.setValue(v,"toneMappingExposure",N.toneMappingExposure),f.setValue(v,"toneMappingWhitePoint",N.toneMappingWhitePoint),n.lights&&(c=u,(s=g).ambientLightColor.needsUpdate=c,s.lightProbe.needsUpdate=c,s.directionalLights.needsUpdate=c,s.pointLights.needsUpdate=c,s.spotLights.needsUpdate=c,s.rectAreaLights.needsUpdate=c,s.hemisphereLights.needsUpdate=c),e&&n.fog&&function(t,e){
t.fogColor.value.copy(e.color),e.isFog?(t.fogNear.value=e.near,t.fogFar.value=e.far):e.isFogExp2&&(t.fogDensity.value=e.density);
}(g,e),n.isMeshBasicMaterial?St(g,n):n.isMeshLambertMaterial?(St(g,n),function(t,e){
e.emissiveMap&&(t.emissiveMap.value=e.emissiveMap);
}(g,n)):n.isMeshPhongMaterial?(St(g,n),n.isMeshToonMaterial?function(t,e){
At(t,e),e.gradientMap&&(t.gradientMap.value=e.gradientMap);
}(g,n):At(g,n)):n.isMeshStandardMaterial?(St(g,n),n.isMeshPhysicalMaterial?function(t,e){
Lt(t,e),t.reflectivity.value=e.reflectivity,t.clearcoat.value=e.clearcoat,t.clearcoatRoughness.value=e.clearcoatRoughness,e.sheen&&t.sheen.value.copy(e.sheen),e.clearcoatNormalMap&&(t.clearcoatNormalScale.value.copy(e.clearcoatNormalScale),t.clearcoatNormalMap.value=e.clearcoatNormalMap,e.side===p&&t.clearcoatNormalScale.value.negate()),t.transparency.value=e.transparency;
}(g,n):Lt(g,n)):n.isMeshMatcapMaterial?(St(g,n),function(t,e){
e.matcap&&(t.matcap.value=e.matcap),e.bumpMap&&(t.bumpMap.value=e.bumpMap,t.bumpScale.value=e.bumpScale,e.side===p&&(t.bumpScale.value*=-1)),e.normalMap&&(t.normalMap.value=e.normalMap,t.normalScale.value.copy(e.normalScale),e.side===p&&t.normalScale.value.negate()),e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias);
}(g,n)):n.isMeshDepthMaterial?(St(g,n),function(t,e){
e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias);
}(g,n)):n.isMeshDistanceMaterial?(St(g,n),function(t,e){
e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias),t.referencePosition.value.copy(e.referencePosition),t.nearDistance.value=e.nearDistance,t.farDistance.value=e.farDistance;
}(g,n)):n.isMeshNormalMaterial?(St(g,n),function(t,e){
e.bumpMap&&(t.bumpMap.value=e.bumpMap,t.bumpScale.value=e.bumpScale,e.side===p&&(t.bumpScale.value*=-1)),e.normalMap&&(t.normalMap.value=e.normalMap,t.normalScale.value.copy(e.normalScale),e.side===p&&t.normalScale.value.negate()),e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias);
}(g,n)):n.isLineBasicMaterial?(function(t,e){
t.diffuse.value.copy(e.color),t.opacity.value=e.opacity;
}(g,n),n.isLineDashedMaterial&&function(t,e){
t.dashSize.value=e.dashSize,t.totalSize.value=e.dashSize+e.gapSize,t.scale.value=e.scale;
}(g,n)):n.isPointsMaterial?function(t,e){
t.diffuse.value.copy(e.color),t.opacity.value=e.opacity,t.size.value=e.size*Z,t.scale.value=.5*J,t.map.value=e.map,null!==e.map&&(!0===e.map.matrixAutoUpdate&&e.map.updateMatrix(),t.uvTransform.value.copy(e.map.matrix));
}(g,n):n.isSpriteMaterial?function(t,e){
t.diffuse.value.copy(e.color),t.opacity.value=e.opacity,t.rotation.value=e.rotation,t.map.value=e.map,null!==e.map&&(!0===e.map.matrixAutoUpdate&&e.map.updateMatrix(),t.uvTransform.value.copy(e.map.matrix));
}(g,n):n.isShadowMaterial&&(g.color.value.copy(n.color),g.opacity.value=n.opacity),void 0!==g.ltc_1&&(g.ltc_1.value=Ti.LTC_1),void 0!==g.ltc_2&&(g.ltc_2.value=Ti.LTC_2),Fa.upload(v,i.uniformsList,g,_)),n.isShaderMaterial&&!0===n.uniformsNeedUpdate&&(Fa.upload(v,i.uniformsList,g,_),n.uniformsNeedUpdate=!1),n.isSpriteMaterial&&f.setValue(v,"center",r.center),f.setValue(v,"modelViewMatrix",r.modelViewMatrix),f.setValue(v,"normalMatrix",r.normalMatrix),f.setValue(v,"modelMatrix",r.matrixWorld),d;
}

function St(t,e){
var n;
t.opacity.value=e.opacity,e.color&&t.diffuse.value.copy(e.color),e.emissive&&t.emissive.value.copy(e.emissive).multiplyScalar(e.emissiveIntensity),e.map&&(t.map.value=e.map),e.alphaMap&&(t.alphaMap.value=e.alphaMap),e.specularMap&&(t.specularMap.value=e.specularMap),e.envMap&&(t.envMap.value=e.envMap,t.flipEnvMap.value=e.envMap.isCubeTexture?-1:1,t.reflectivity.value=e.reflectivity,t.refractionRatio.value=e.refractionRatio,t.maxMipLevel.value=w.get(e.envMap).__maxMipLevel),e.lightMap&&(t.lightMap.value=e.lightMap,t.lightMapIntensity.value=e.lightMapIntensity),e.aoMap&&(t.aoMap.value=e.aoMap,t.aoMapIntensity.value=e.aoMapIntensity),e.map?n=e.map:e.specularMap?n=e.specularMap:e.displacementMap?n=e.displacementMap:e.normalMap?n=e.normalMap:e.bumpMap?n=e.bumpMap:e.roughnessMap?n=e.roughnessMap:e.metalnessMap?n=e.metalnessMap:e.alphaMap?n=e.alphaMap:e.emissiveMap&&(n=e.emissiveMap),void 0!==n&&(n.isWebGLRenderTarget&&(n=n.texture),!0===n.matrixAutoUpdate&&n.updateMatrix(),t.uvTransform.value.copy(n.matrix));
}

function At(t,e){
t.specular.value.copy(e.specular),t.shininess.value=Math.max(e.shininess,1e-4),e.emissiveMap&&(t.emissiveMap.value=e.emissiveMap),e.bumpMap&&(t.bumpMap.value=e.bumpMap,t.bumpScale.value=e.bumpScale,e.side===p&&(t.bumpScale.value*=-1)),e.normalMap&&(t.normalMap.value=e.normalMap,t.normalScale.value.copy(e.normalScale),e.side===p&&t.normalScale.value.negate()),e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias);
}

function Lt(t,e){
t.roughness.value=e.roughness,t.metalness.value=e.metalness,e.roughnessMap&&(t.roughnessMap.value=e.roughnessMap),e.metalnessMap&&(t.metalnessMap.value=e.metalnessMap),e.emissiveMap&&(t.emissiveMap.value=e.emissiveMap),e.bumpMap&&(t.bumpMap.value=e.bumpMap,t.bumpScale.value=e.bumpScale,e.side===p&&(t.bumpScale.value*=-1)),e.normalMap&&(t.normalMap.value=e.normalMap,t.normalScale.value.copy(e.normalScale),e.side===p&&t.normalScale.value.negate()),e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias),e.envMap&&(t.envMapIntensity.value=e.envMapIntensity);
}
gt.setAnimationLoop(function(t){
ht.isPresenting()||vt&&vt(t);
}),void 0!==o&&gt.setContext(o),this.setAnimationLoop=function(t){
vt=t,ht.setAnimationLoop(t),gt.start();
},this.render=function(t,e){
var n,r;
if(void 0!==arguments[2]&&(console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."),n=arguments[2]),void 0!==arguments[3]&&(console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."),r=arguments[3]),e&&e.isCamera){
if(!I){
V.geometry=null,V.program=null,V.wireframe=!1,H=-1,j=null,!0===t.autoUpdate&&t.updateMatrixWorld(),null===e.parent&&e.updateMatrixWorld(),ht.enabled&&(e=ht.getCamera(e)),(m=L.get(t,e)).init(),t.onBeforeRender(N,t,e,n||G),at.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),et.setFromMatrix(at),it=this.localClippingEnabled,rt=nt.init(this.clippingPlanes,it,e),(f=A.get(t,e)).init(),yt(t,e,0,N.sortObjects),!0===N.sortObjects&&f.sort(),rt&&nt.beginShadows();
var i=m.state.shadowsArray;
ut.render(i,t,e),m.setupLights(e),rt&&nt.endShadows(),this.info.autoReset&&this.info.reset(),void 0!==n&&this.setRenderTarget(n),R.render(f,t,e,r);
var a=f.opaque,
o=f.transparent;
if(t.overrideMaterial){
var s=t.overrideMaterial;
a.length&&bt(a,t,e,s),o.length&&bt(o,t,e,s);
}else a.length&&bt(a,t,e),o.length&&bt(o,t,e);
t.onAfterRender(N,t,e),null!==G&&(_.updateRenderTargetMipmap(G),_.updateMultisampleRenderTarget(G)),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1),ht.enabled&&ht.submitFrame(),f=null,m=null;
}
}else console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
},this.setFramebuffer=function(t){
z!==t&&v.bindFramebuffer(36160,t),z=t;
},this.getActiveCubeFace=function(){
return B;
},this.getActiveMipmapLevel=function(){
return F;
},this.getRenderTarget=function(){
return G;
},this.setRenderTarget=function(t,e,n){
G=t,B=e,F=n,t&&void 0===w.get(t).__webglFramebuffer&&_.setupRenderTarget(t);
var r=z,
i=!1;
if(t){
var a=w.get(t).__webglFramebuffer;
t.isWebGLRenderTargetCube?(r=a[e||0],i=!0):r=t.isWebGLMultisampleRenderTarget?w.get(t).__webglMultisampledFramebuffer:a,W.copy(t.viewport),q.copy(t.scissor),X=t.scissorTest;
}else W.copy(Q).multiplyScalar(Z).floor(),q.copy($).multiplyScalar(Z).floor(),X=tt;
if(U!==r&&(v.bindFramebuffer(36160,r),U=r),x.viewport(W),x.scissor(q),x.setScissorTest(X),i){
var o=w.get(t.texture);
v.framebufferTexture2D(36160,36064,34069+(e||0),o.__webglTexture,n||0);
}
},this.readRenderTargetPixels=function(t,e,n,r,i,a,o){
if(t&&t.isWebGLRenderTarget){
var s=w.get(t).__webglFramebuffer;
if(t.isWebGLRenderTargetCube&&void 0!==o&&(s=s[o]),s){
var c=!1;
s!==U&&(v.bindFramebuffer(36160,s),c=!0);
try{
var l=t.texture,
h=l.format,
u=l.type;
if(h!==Dt&&D.convert(h)!==v.getParameter(35739))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
if(!(u===xt||D.convert(u)===v.getParameter(35738)||u===Tt&&(y.isWebGL2||g.get("OES_texture_float")||g.get("WEBGL_color_buffer_float"))||u===Et&&(y.isWebGL2?g.get("EXT_color_buffer_float"):g.get("EXT_color_buffer_half_float"))))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
36053===v.checkFramebufferStatus(36160)?e>=0&&e<=t.width-r&&n>=0&&n<=t.height-i&&v.readPixels(e,n,r,i,D.convert(h),D.convert(u),a):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.");
}finally{
c&&v.bindFramebuffer(36160,U);
}
}
}else console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
},this.copyFramebufferToTexture=function(t,e,n){
var r=e.image.width,
i=e.image.height,
a=D.convert(e.format);
_.setTexture2D(e,0),v.copyTexImage2D(3553,n||0,a,t.x,t.y,r,i,0);
},this.copyTextureToTexture=function(t,e,n,r){
var i=e.image.width,
a=e.image.height,
o=D.convert(n.format),
s=D.convert(n.type);
_.setTexture2D(n,0),e.isDataTexture?v.texSubImage2D(3553,r||0,t.x,t.y,i,a,o,s,e.image.data):v.texSubImage2D(3553,r||0,t.x,t.y,o,s,e.image);
},"undefined"!=typeof __THREE_DEVTOOLS__&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{
detail:this}));

}

function Ao(t,e){
this.name="",this.color=new rr(t),this.density=void 0!==e?e:25e-5;
}

function Lo(t,e,n){
this.name="",this.color=new rr(t),this.near=void 0!==e?e:1,this.far=void 0!==n?n:1e3;
}

function Ro(t,e){
this.array=t,this.stride=e,this.count=void 0!==t?t.length/e:0,this.dynamic=!1,this.updateRange={
offset:0,
count:-1},
this.version=0;
}

function Po(t,e,n,r){
this.data=t,this.itemSize=e,this.offset=n,this.normalized=!0===r;
}

function Co(t){
lr.call(this),this.type="SpriteMaterial",this.color=new rr(16777215),this.map=null,this.rotation=0,this.sizeAttenuation=!0,this.lights=!1,this.transparent=!0,this.setValues(t);
}
Object.assign(So.prototype,e.prototype),Object.assign(To.prototype,e.prototype),Object.assign(Ao.prototype,{
isFogExp2:!0,
clone:function clone(){
return new Ao(this.color,this.density);
},
toJSON:function toJSON(){
return{
type:"FogExp2",
color:this.color.getHex(),
density:this.density};

}}),
Object.assign(Lo.prototype,{
isFog:!0,
clone:function clone(){
return new Lo(this.color,this.near,this.far);
},
toJSON:function toJSON(){
return{
type:"Fog",
color:this.color.getHex(),
near:this.near,
far:this.far};

}}),
Object.defineProperty(Ro.prototype,"needsUpdate",{
set:function set(t){
!0===t&&this.version++;
}}),
Object.assign(Ro.prototype,{
isInterleavedBuffer:!0,
onUploadCallback:function onUploadCallback(){},
setArray:function setArray(t){
if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
return this.count=void 0!==t?t.length/this.stride:0,this.array=t,this;
},
setDynamic:function setDynamic(t){
return this.dynamic=t,this;
},
copy:function copy(t){
return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.dynamic=t.dynamic,this;
},
copyAt:function copyAt(t,e,n){
t*=this.stride,n*=e.stride;
for(var r=0,i=this.stride;r<i;r++){this.array[t+r]=e.array[n+r];}
return this;
},
set:function set(t,e){
return void 0===e&&(e=0),this.array.set(t,e),this;
},
clone:function clone(){
return new this.constructor().copy(this);
},
onUpload:function onUpload(t){
return this.onUploadCallback=t,this;
}}),
Object.defineProperties(Po.prototype,{
count:{
get:function get(){
return this.data.count;
}},

array:{
get:function get(){
return this.data.array;
}}}),

Object.assign(Po.prototype,{
isInterleavedBufferAttribute:!0,
setX:function setX(t,e){
return this.data.array[t*this.data.stride+this.offset]=e,this;
},
setY:function setY(t,e){
return this.data.array[t*this.data.stride+this.offset+1]=e,this;
},
setZ:function setZ(t,e){
return this.data.array[t*this.data.stride+this.offset+2]=e,this;
},
setW:function setW(t,e){
return this.data.array[t*this.data.stride+this.offset+3]=e,this;
},
getX:function getX(t){
return this.data.array[t*this.data.stride+this.offset];
},
getY:function getY(t){
return this.data.array[t*this.data.stride+this.offset+1];
},
getZ:function getZ(t){
return this.data.array[t*this.data.stride+this.offset+2];
},
getW:function getW(t){
return this.data.array[t*this.data.stride+this.offset+3];
},
setXY:function setXY(t,e,n){
return t=t*this.data.stride+this.offset,this.data.array[t+0]=e,this.data.array[t+1]=n,this;
},
setXYZ:function setXYZ(t,e,n,r){
return t=t*this.data.stride+this.offset,this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this;
},
setXYZW:function setXYZW(t,e,n,r,i){
return t=t*this.data.stride+this.offset,this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this.data.array[t+3]=i,this;
}}),
Co.prototype=Object.create(lr.prototype),Co.prototype.constructor=Co,Co.prototype.isSpriteMaterial=!0,Co.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.color.copy(t.color),this.map=t.map,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this;
};
var Oo=new Ie(),
Do=new Ie(),
No=new Ie(),
Io=new Ce(),
zo=new Ce(),
Bo=new Ke(),
Fo=new Ie(),
Go=new Ie(),
Uo=new Ie(),
Ho=new Ce(),
Vo=new Ce(),
jo=new Ce();

function ko(t){
if(gn.call(this),this.type="Sprite",void 0===bo){
bo=new Pr();
var e=new Ro(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);
bo.setIndex([0,1,2,0,2,3]),bo.addAttribute("position",new Po(e,3,0,!1)),bo.addAttribute("uv",new Po(e,2,3,!1));
}
this.geometry=bo,this.material=void 0!==t?t:new Co(),this.center=new Ce(.5,.5);
}

function Wo(t,e,n,r,i,a){
Io.subVectors(t,n).addScalar(.5).multiply(r),void 0!==i?(zo.x=a*Io.x-i*Io.y,zo.y=i*Io.x+a*Io.y):zo.copy(Io),t.copy(e),t.x+=zo.x,t.y+=zo.y,t.applyMatrix4(Bo);
}
ko.prototype=Object.assign(Object.create(gn.prototype),{
constructor:ko,
isSprite:!0,
raycast:function raycast(t,e){
null===t.camera&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Do.setFromMatrixScale(this.matrixWorld),Bo.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),No.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&!1===this.material.sizeAttenuation&&Do.multiplyScalar(-No.z);
var n,r,i=this.material.rotation;
0!==i&&(r=Math.cos(i),n=Math.sin(i));
var a=this.center;
Wo(Fo.set(-.5,-.5,0),No,a,Do,n,r),Wo(Go.set(.5,-.5,0),No,a,Do,n,r),Wo(Uo.set(.5,.5,0),No,a,Do,n,r),Ho.set(0,0),Vo.set(1,0),jo.set(1,1);
var o=t.ray.intersectTriangle(Fo,Go,Uo,!1,Oo);
if(null!==o||(Wo(Go.set(-.5,.5,0),No,a,Do,n,r),Vo.set(0,1),null!==(o=t.ray.intersectTriangle(Fo,Uo,Go,!1,Oo)))){
var s=t.ray.origin.distanceTo(Oo);
s<t.near||s>t.far||e.push({
distance:s,
point:Oo.clone(),
uv:$n.getUV(Oo,Fo,Go,Uo,Ho,Vo,jo,new Ce()),
face:null,
object:this});

}
},
clone:function clone(){
return new this.constructor(this.material).copy(this);
},
copy:function copy(t){
return gn.prototype.copy.call(this,t),void 0!==t.center&&this.center.copy(t.center),this;
}});

var qo=new Ie(),
Xo=new Ie();

function Yo(){
gn.call(this),this.type="LOD",Object.defineProperties(this,{
levels:{
enumerable:!0,
value:[]}}),

this.autoUpdate=!0;
}

function Jo(t,e){
t&&t.isGeometry&&console.error("THREE.SkinnedMesh no longer supports THREE.Geometry. Use THREE.BufferGeometry instead."),Yr.call(this,t,e),this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new Ke(),this.bindMatrixInverse=new Ke();
}
Yo.prototype=Object.assign(Object.create(gn.prototype),{
constructor:Yo,
isLOD:!0,
copy:function copy(t){
gn.prototype.copy.call(this,t,!1);
for(var e=t.levels,n=0,r=e.length;n<r;n++){
var i=e[n];
this.addLevel(i.object.clone(),i.distance);
}
return this;
},
addLevel:function addLevel(t,e){
void 0===e&&(e=0),e=Math.abs(e);
for(var n=this.levels,r=0;r<n.length&&!(e<n[r].distance);r++){;}
return n.splice(r,0,{
distance:e,
object:t}),
this.add(t),this;
},
getObjectForDistance:function getObjectForDistance(t){
for(var e=this.levels,n=1,r=e.length;n<r&&!(t<e[n].distance);n++){;}
return e[n-1].object;
},
raycast:function raycast(t,e){
qo.setFromMatrixPosition(this.matrixWorld);
var n=t.ray.origin.distanceTo(qo);
this.getObjectForDistance(n).raycast(t,e);
},
update:function update(t){
var e=this.levels;
if(e.length>1){
qo.setFromMatrixPosition(t.matrixWorld),Xo.setFromMatrixPosition(this.matrixWorld);
var n=qo.distanceTo(Xo);
e[0].object.visible=!0;
for(var r=1,i=e.length;r<i&&n>=e[r].distance;r++){e[r-1].object.visible=!1,e[r].object.visible=!0;}
for(;r<i;r++){e[r].object.visible=!1;}
}
},
toJSON:function toJSON(t){
var e=gn.prototype.toJSON.call(this,t);
e.object.levels=[];
for(var n=this.levels,r=0,i=n.length;r<i;r++){
var a=n[r];
e.object.levels.push({
object:a.object.uuid,
distance:a.distance});

}
return e;
}}),
Jo.prototype=Object.assign(Object.create(Yr.prototype),{
constructor:Jo,
isSkinnedMesh:!0,
bind:function bind(t,e){
this.skeleton=t,void 0===e&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.getInverse(e);
},
pose:function pose(){
this.skeleton.pose();
},
normalizeSkinWeights:function normalizeSkinWeights(){
for(var t=new Ve(),e=this.geometry.attributes.skinWeight,n=0,r=e.count;n<r;n++){
t.x=e.getX(n),t.y=e.getY(n),t.z=e.getZ(n),t.w=e.getW(n);
var i=1/t.manhattanLength();
i!==1/0?t.multiplyScalar(i):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w);
}
},
updateMatrixWorld:function updateMatrixWorld(t){
Yr.prototype.updateMatrixWorld.call(this,t),"attached"===this.bindMode?this.bindMatrixInverse.getInverse(this.matrixWorld):"detached"===this.bindMode?this.bindMatrixInverse.getInverse(this.bindMatrix):console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode);
},
clone:function clone(){
return new this.constructor(this.geometry,this.material).copy(this);
}});

var Zo=new Ke(),
Qo=new Ke();

function Ko(t,e){
if(t=t||[],this.bones=t.slice(0),this.boneMatrices=new Float32Array(16*this.bones.length),void 0===e)this.calculateInverses();else
if(this.bones.length===e.length)this.boneInverses=e.slice(0);else
{
console.warn("THREE.Skeleton boneInverses is the wrong length."),this.boneInverses=[];
for(var n=0,r=this.bones.length;n<r;n++){this.boneInverses.push(new Ke());}
}
}

function $o(){
gn.call(this),this.type="Bone";
}

function ts(t){
lr.call(this),this.type="LineBasicMaterial",this.color=new rr(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.lights=!1,this.setValues(t);
}
Object.assign(Ko.prototype,{
calculateInverses:function calculateInverses(){
this.boneInverses=[];
for(var t=0,e=this.bones.length;t<e;t++){
var n=new Ke();
this.bones[t]&&n.getInverse(this.bones[t].matrixWorld),this.boneInverses.push(n);
}
},
pose:function pose(){
var t,e,n;
for(e=0,n=this.bones.length;e<n;e++){(t=this.bones[e])&&t.matrixWorld.getInverse(this.boneInverses[e]);}
for(e=0,n=this.bones.length;e<n;e++){(t=this.bones[e])&&(t.parent&&t.parent.isBone?(t.matrix.getInverse(t.parent.matrixWorld),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale));}
},
update:function update(){
for(var t=this.bones,e=this.boneInverses,n=this.boneMatrices,r=this.boneTexture,i=0,a=t.length;i<a;i++){
var o=t[i]?t[i].matrixWorld:Qo;
Zo.multiplyMatrices(o,e[i]),Zo.toArray(n,16*i);
}
void 0!==r&&(r.needsUpdate=!0);
},
clone:function clone(){
return new Ko(this.bones,this.boneInverses);
},
getBoneByName:function getBoneByName(t){
for(var e=0,n=this.bones.length;e<n;e++){
var r=this.bones[e];
if(r.name===t)return r;
}
}}),
$o.prototype=Object.assign(Object.create(gn.prototype),{
constructor:$o,
isBone:!0}),
ts.prototype=Object.create(lr.prototype),ts.prototype.constructor=ts,ts.prototype.isLineBasicMaterial=!0,ts.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.color.copy(t.color),this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this;
};
var es=new Ie(),
ns=new Ie(),
rs=new Ke(),
is=new Vn(),
as=new Nn();

function os(t,e,n){
1===n&&console.error("THREE.Line: parameter THREE.LinePieces no longer supported. Use THREE.LineSegments instead."),gn.call(this),this.type="Line",this.geometry=void 0!==t?t:new Pr(),this.material=void 0!==e?e:new ts({
color:16777215*Math.random()});

}
os.prototype=Object.assign(Object.create(gn.prototype),{
constructor:os,
isLine:!0,
computeLineDistances:function computeLineDistances(){
var t=this.geometry;
if(t.isBufferGeometry){
if(null===t.index){
for(var e=t.attributes.position,n=[0],r=1,i=e.count;r<i;r++){es.fromBufferAttribute(e,r-1),ns.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=es.distanceTo(ns);}
t.addAttribute("lineDistance",new xr(n,1));
}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");}else
if(t.isGeometry){
var a=t.vertices;
for((n=t.lineDistances)[0]=0,r=1,i=a.length;r<i;r++){n[r]=n[r-1],n[r]+=a[r-1].distanceTo(a[r]);}
}
return this;
},
raycast:function raycast(t,e){
var n=t.linePrecision,
r=this.geometry,
i=this.matrixWorld;
if(null===r.boundingSphere&&r.computeBoundingSphere(),as.copy(r.boundingSphere),as.applyMatrix4(i),as.radius+=n,!1!==t.ray.intersectsSphere(as)){
rs.getInverse(i),is.copy(t.ray).applyMatrix4(rs);
var a=n/((this.scale.x+this.scale.y+this.scale.z)/3),
o=a*a,
s=new Ie(),
c=new Ie(),
l=new Ie(),
h=new Ie(),
u=this&&this.isLineSegments?2:1;
if(r.isBufferGeometry){
var p=r.index,
d=r.attributes.position.array;
if(null!==p)
for(var f=p.array,m=0,v=f.length-1;m<v;m+=u){
var g=f[m],
y=f[m+1];
s.fromArray(d,3*g),c.fromArray(d,3*y),is.distanceSqToSegment(s,c,h,l)>o||(h.applyMatrix4(this.matrixWorld),(w=t.ray.origin.distanceTo(h))<t.near||w>t.far||e.push({
distance:w,
point:l.clone().applyMatrix4(this.matrixWorld),
index:m,
face:null,
faceIndex:null,
object:this}));

}else
for(m=0,v=d.length/3-1;m<v;m+=u){s.fromArray(d,3*m),c.fromArray(d,3*m+3),is.distanceSqToSegment(s,c,h,l)>o||(h.applyMatrix4(this.matrixWorld),(w=t.ray.origin.distanceTo(h))<t.near||w>t.far||e.push({
distance:w,
point:l.clone().applyMatrix4(this.matrixWorld),
index:m,
face:null,
faceIndex:null,
object:this}));}

}else if(r.isGeometry){
var x=r.vertices,
b=x.length;
for(m=0;m<b-1;m+=u){
var w;
is.distanceSqToSegment(x[m],x[m+1],h,l)>o||(h.applyMatrix4(this.matrixWorld),(w=t.ray.origin.distanceTo(h))<t.near||w>t.far||e.push({
distance:w,
point:l.clone().applyMatrix4(this.matrixWorld),
index:m,
face:null,
faceIndex:null,
object:this}));

}
}
}
},
clone:function clone(){
return new this.constructor(this.geometry,this.material).copy(this);
}});

var ss=new Ie(),
cs=new Ie();

function ls(t,e){
os.call(this,t,e),this.type="LineSegments";
}

function hs(t,e){
os.call(this,t,e),this.type="LineLoop";
}

function us(t){
lr.call(this),this.type="PointsMaterial",this.color=new rr(16777215),this.map=null,this.size=1,this.sizeAttenuation=!0,this.morphTargets=!1,this.lights=!1,this.setValues(t);
}
ls.prototype=Object.assign(Object.create(os.prototype),{
constructor:ls,
isLineSegments:!0,
computeLineDistances:function computeLineDistances(){
var t=this.geometry;
if(t.isBufferGeometry){
if(null===t.index){
for(var e=t.attributes.position,n=[],r=0,i=e.count;r<i;r+=2){ss.fromBufferAttribute(e,r),cs.fromBufferAttribute(e,r+1),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+ss.distanceTo(cs);}
t.addAttribute("lineDistance",new xr(n,1));
}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");}else
if(t.isGeometry){
var a=t.vertices;
for(n=t.lineDistances,r=0,i=a.length;r<i;r+=2){ss.copy(a[r]),cs.copy(a[r+1]),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+ss.distanceTo(cs);}
}
return this;
}}),
hs.prototype=Object.assign(Object.create(os.prototype),{
constructor:hs,
isLineLoop:!0}),
us.prototype=Object.create(lr.prototype),us.prototype.constructor=us,us.prototype.isPointsMaterial=!0,us.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.color.copy(t.color),this.map=t.map,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.morphTargets=t.morphTargets,this;
};
var ps=new Ke(),
ds=new Vn(),
fs=new Nn(),
ms=new Ie();

function vs(t,e){
gn.call(this),this.type="Points",this.geometry=void 0!==t?t:new Pr(),this.material=void 0!==e?e:new us({
color:16777215*Math.random()}),
this.updateMorphTargets();
}

function gs(t,e,n,r,i,a,o){
var s=ds.distanceSqToPoint(t);
if(s<n){
var c=new Ie();
ds.closestPointToPoint(t,c),c.applyMatrix4(r);
var l=i.ray.origin.distanceTo(c);
if(l<i.near||l>i.far)return;
a.push({
distance:l,
distanceToRay:Math.sqrt(s),
point:c,
index:e,
face:null,
object:o});

}
}

function ys(t,e,n,r,i,a,o,s,c){
He.call(this,t,e,n,r,i,a,o,s,c),this.format=void 0!==o?o:Ot,this.minFilter=void 0!==a?a:vt,this.magFilter=void 0!==i?i:vt,this.generateMipmaps=!1;
}

function xs(t,e,n,r,i,a,o,s,c,l,h,u){
He.call(this,null,a,o,s,c,l,r,i,h,u),this.image={
width:e,
height:n},
this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1;
}

function bs(t,e,n,r,i,a,o,s,c){
He.call(this,t,e,n,r,i,a,o,s,c),this.needsUpdate=!0;
}

function ws(t,e,n,r,i,a,o,s,c,l){
if((l=void 0!==l?l:Bt)!==Bt&&l!==Ft)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
void 0===n&&l===Bt&&(n=_t),void 0===n&&l===Ft&&(n=Pt),He.call(this,null,r,i,a,o,s,l,n,c),this.image={
width:t,
height:e},
this.magFilter=void 0!==o?o:dt,this.minFilter=void 0!==s?s:dt,this.flipY=!1,this.generateMipmaps=!1;
}

function _s(t){
Pr.call(this),this.type="WireframeGeometry";
var e,n,r,i,a,o,s,c,l,h,u=[],
p=[0,0],
d={},
f=["a","b","c"];
if(t&&t.isGeometry){
var m=t.faces;
for(e=0,r=m.length;e<r;e++){
var v=m[e];
for(n=0;n<3;n++){s=v[f[n]],c=v[f[(n+1)%3]],p[0]=Math.min(s,c),p[1]=Math.max(s,c),void 0===d[l=p[0]+","+p[1]]&&(d[l]={
index1:p[0],
index2:p[1]});}

}
for(l in d){o=d[l],h=t.vertices[o.index1],u.push(h.x,h.y,h.z),h=t.vertices[o.index2],u.push(h.x,h.y,h.z);}
}else if(t&&t.isBufferGeometry){
var g,y,x,b,w,_,M;
if(h=new Ie(),null!==t.index){
for(g=t.attributes.position,y=t.index,0===(x=t.groups).length&&(x=[{
start:0,
count:y.count,
materialIndex:0}]),
i=0,a=x.length;i<a;++i){
for(e=w=(b=x[i]).start,r=w+b.count;e<r;e+=3){
for(n=0;n<3;n++){s=y.getX(e+n),c=y.getX(e+(n+1)%3),p[0]=Math.min(s,c),p[1]=Math.max(s,c),void 0===d[l=p[0]+","+p[1]]&&(d[l]={
index1:p[0],
index2:p[1]});}}}

for(l in d){o=d[l],h.fromBufferAttribute(g,o.index1),u.push(h.x,h.y,h.z),h.fromBufferAttribute(g,o.index2),u.push(h.x,h.y,h.z);}
}else
for(e=0,r=(g=t.attributes.position).count/3;e<r;e++){
for(n=0;n<3;n++){_=3*e+n,h.fromBufferAttribute(g,_),u.push(h.x,h.y,h.z),M=3*e+(n+1)%3,h.fromBufferAttribute(g,M),u.push(h.x,h.y,h.z);}}
}
this.addAttribute("position",new xr(u,3));
}

function Ms(t,e,n){
ei.call(this),this.type="ParametricGeometry",this.parameters={
func:t,
slices:e,
stacks:n},
this.fromBufferGeometry(new Ss(t,e,n)),this.mergeVertices();
}

function Ss(t,e,n){
Pr.call(this),this.type="ParametricBufferGeometry",this.parameters={
func:t,
slices:e,
stacks:n};

var r,i,a=[],
o=[],
s=[],
c=[],
l=new Ie(),
h=new Ie(),
u=new Ie(),
p=new Ie(),
d=new Ie();
t.length<3&&console.error("THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.");
var f=e+1;
for(r=0;r<=n;r++){
var m=r/n;
for(i=0;i<=e;i++){
var v=i/e;
t(v,m,h),o.push(h.x,h.y,h.z),v-1e-5>=0?(t(v-1e-5,m,u),p.subVectors(h,u)):(t(v+1e-5,m,u),p.subVectors(u,h)),m-1e-5>=0?(t(v,m-1e-5,u),d.subVectors(h,u)):(t(v,m+1e-5,u),d.subVectors(u,h)),l.crossVectors(p,d).normalize(),s.push(l.x,l.y,l.z),c.push(v,m);
}
}
for(r=0;r<n;r++){
for(i=0;i<e;i++){
var g=r*f+i,
y=r*f+i+1,
x=(r+1)*f+i+1,
b=(r+1)*f+i;
a.push(g,y,b),a.push(y,x,b);
}}
this.setIndex(a),this.addAttribute("position",new xr(o,3)),this.addAttribute("normal",new xr(s,3)),this.addAttribute("uv",new xr(c,2));
}

function Ts(t,e,n,r){
ei.call(this),this.type="PolyhedronGeometry",this.parameters={
vertices:t,
indices:e,
radius:n,
detail:r},
this.fromBufferGeometry(new Es(t,e,n,r)),this.mergeVertices();
}

function Es(t,e,n,r){
Pr.call(this),this.type="PolyhedronBufferGeometry",this.parameters={
vertices:t,
indices:e,
radius:n,
detail:r},
n=n||1;
var i=[],
a=[];

function o(t,e,n,r){
var i,a,o=Math.pow(2,r),
c=[];
for(i=0;i<=o;i++){
c[i]=[];
var l=t.clone().lerp(n,i/o),
h=e.clone().lerp(n,i/o),
u=o-i;
for(a=0;a<=u;a++){c[i][a]=0===a&&i===o?l:l.clone().lerp(h,a/u);}
}
for(i=0;i<o;i++){
for(a=0;a<2*(o-i)-1;a++){
var p=Math.floor(a/2);
a%2==0?(s(c[i][p+1]),s(c[i+1][p]),s(c[i][p])):(s(c[i][p+1]),s(c[i+1][p+1]),s(c[i+1][p]));
}}
}

function s(t){
i.push(t.x,t.y,t.z);
}

function c(e,n){
var r=3*e;
n.x=t[r+0],n.y=t[r+1],n.z=t[r+2];
}

function l(t,e,n,r){
r<0&&1===t.x&&(a[e]=t.x-1),0===n.x&&0===n.z&&(a[e]=r/2/Math.PI+.5);
}

function h(t){
return Math.atan2(t.z,-t.x);
}!function(t){
for(var n=new Ie(),r=new Ie(),i=new Ie(),a=0;a<e.length;a+=3){c(e[a+0],n),c(e[a+1],r),c(e[a+2],i),o(n,r,i,t);}
}(r=r||0),
function(t){
for(var e=new Ie(),n=0;n<i.length;n+=3){e.x=i[n+0],e.y=i[n+1],e.z=i[n+2],e.normalize().multiplyScalar(t),i[n+0]=e.x,i[n+1]=e.y,i[n+2]=e.z;}
}(n),
function(){
for(var t=new Ie(),e=0;e<i.length;e+=3){
t.x=i[e+0],t.y=i[e+1],t.z=i[e+2];
var n=h(t)/2/Math.PI+.5,
r=(o=t,Math.atan2(-o.y,Math.sqrt(o.x*o.x+o.z*o.z))/Math.PI+.5);
a.push(n,1-r);
}
var o;
(function(){
for(var t=new Ie(),e=new Ie(),n=new Ie(),r=new Ie(),o=new Ce(),s=new Ce(),c=new Ce(),u=0,p=0;u<i.length;u+=9,p+=6){
t.set(i[u+0],i[u+1],i[u+2]),e.set(i[u+3],i[u+4],i[u+5]),n.set(i[u+6],i[u+7],i[u+8]),o.set(a[p+0],a[p+1]),s.set(a[p+2],a[p+3]),c.set(a[p+4],a[p+5]),r.copy(t).add(e).add(n).divideScalar(3);
var d=h(r);
l(o,p+0,t,d),l(s,p+2,e,d),l(c,p+4,n,d);
}
})(),
function(){
for(var t=0;t<a.length;t+=6){
var e=a[t+0],
n=a[t+2],
r=a[t+4],
i=Math.max(e,n,r),
o=Math.min(e,n,r);
i>.9&&o<.1&&(e<.2&&(a[t+0]+=1),n<.2&&(a[t+2]+=1),r<.2&&(a[t+4]+=1));
}
}();
}(),this.addAttribute("position",new xr(i,3)),this.addAttribute("normal",new xr(i.slice(),3)),this.addAttribute("uv",new xr(a,2)),0===r?this.computeVertexNormals():this.normalizeNormals();
}

function As(t,e){
ei.call(this),this.type="TetrahedronGeometry",this.parameters={
radius:t,
detail:e},
this.fromBufferGeometry(new Ls(t,e)),this.mergeVertices();
}

function Ls(t,e){
Es.call(this,[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],t,e),this.type="TetrahedronBufferGeometry",this.parameters={
radius:t,
detail:e};

}

function Rs(t,e){
ei.call(this),this.type="OctahedronGeometry",this.parameters={
radius:t,
detail:e},
this.fromBufferGeometry(new Ps(t,e)),this.mergeVertices();
}

function Ps(t,e){
Es.call(this,[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],t,e),this.type="OctahedronBufferGeometry",this.parameters={
radius:t,
detail:e};

}

function Cs(t,e){
ei.call(this),this.type="IcosahedronGeometry",this.parameters={
radius:t,
detail:e},
this.fromBufferGeometry(new Os(t,e)),this.mergeVertices();
}

function Os(t,e){
var n=(1+Math.sqrt(5))/2,
r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];
Es.call(this,r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],t,e),this.type="IcosahedronBufferGeometry",this.parameters={
radius:t,
detail:e};

}

function Ds(t,e){
ei.call(this),this.type="DodecahedronGeometry",this.parameters={
radius:t,
detail:e},
this.fromBufferGeometry(new Ns(t,e)),this.mergeVertices();
}

function Ns(t,e){
var n=(1+Math.sqrt(5))/2,
r=1/n,
i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];
Es.call(this,i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],t,e),this.type="DodecahedronBufferGeometry",this.parameters={
radius:t,
detail:e};

}

function Is(t,e,n,r,i,a){
ei.call(this),this.type="TubeGeometry",this.parameters={
path:t,
tubularSegments:e,
radius:n,
radialSegments:r,
closed:i},
void 0!==a&&console.warn("THREE.TubeGeometry: taper has been removed.");
var o=new zs(t,e,n,r,i);
this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals,this.fromBufferGeometry(o),this.mergeVertices();
}

function zs(t,e,n,r,i){
Pr.call(this),this.type="TubeBufferGeometry",this.parameters={
path:t,
tubularSegments:e,
radius:n,
radialSegments:r,
closed:i},
e=e||64,n=n||1,r=r||8,i=i||!1;
var a=t.computeFrenetFrames(e,i);
this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;
var o,s,c=new Ie(),
l=new Ie(),
h=new Ce(),
u=new Ie(),
p=[],
d=[],
f=[],
m=[];

function v(i){
u=t.getPointAt(i/e,u);
var o=a.normals[i],
h=a.binormals[i];
for(s=0;s<=r;s++){
var f=s/r*Math.PI*2,
m=Math.sin(f),
v=-Math.cos(f);
l.x=v*o.x+m*h.x,l.y=v*o.y+m*h.y,l.z=v*o.z+m*h.z,l.normalize(),d.push(l.x,l.y,l.z),c.x=u.x+n*l.x,c.y=u.y+n*l.y,c.z=u.z+n*l.z,p.push(c.x,c.y,c.z);
}
}!function(){
for(o=0;o<e;o++){v(o);}
v(!1===i?e:0),
function(){
for(o=0;o<=e;o++){
for(s=0;s<=r;s++){h.x=o/e,h.y=s/r,f.push(h.x,h.y);}}
}(),
function(){
for(s=1;s<=e;s++){
for(o=1;o<=r;o++){
var t=(r+1)*(s-1)+(o-1),
n=(r+1)*s+(o-1),
i=(r+1)*s+o,
a=(r+1)*(s-1)+o;
m.push(t,n,a),m.push(n,i,a);
}}
}();
}(),this.setIndex(m),this.addAttribute("position",new xr(p,3)),this.addAttribute("normal",new xr(d,3)),this.addAttribute("uv",new xr(f,2));
}

function Bs(t,e,n,r,i,a,o){
ei.call(this),this.type="TorusKnotGeometry",this.parameters={
radius:t,
tube:e,
tubularSegments:n,
radialSegments:r,
p:i,
q:a},
void 0!==o&&console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead."),this.fromBufferGeometry(new Fs(t,e,n,r,i,a)),this.mergeVertices();
}

function Fs(t,e,n,r,i,a){
Pr.call(this),this.type="TorusKnotBufferGeometry",this.parameters={
radius:t,
tube:e,
tubularSegments:n,
radialSegments:r,
p:i,
q:a},
t=t||1,e=e||.4,n=Math.floor(n)||64,r=Math.floor(r)||8,i=i||2,a=a||3;
var o,s,c=[],
l=[],
h=[],
u=[],
p=new Ie(),
d=new Ie(),
f=new Ie(),
m=new Ie(),
v=new Ie(),
g=new Ie(),
y=new Ie();
for(o=0;o<=n;++o){
var x=o/n*i*Math.PI*2;
for(A(x,i,a,t,f),A(x+.01,i,a,t,m),g.subVectors(m,f),y.addVectors(m,f),v.crossVectors(g,y),y.crossVectors(v,g),v.normalize(),y.normalize(),s=0;s<=r;++s){
var b=s/r*Math.PI*2,
w=-e*Math.cos(b),
_=e*Math.sin(b);
p.x=f.x+(w*y.x+_*v.x),p.y=f.y+(w*y.y+_*v.y),p.z=f.z+(w*y.z+_*v.z),l.push(p.x,p.y,p.z),d.subVectors(p,f).normalize(),h.push(d.x,d.y,d.z),u.push(o/n),u.push(s/r);
}
}
for(s=1;s<=n;s++){
for(o=1;o<=r;o++){
var M=(r+1)*(s-1)+(o-1),
S=(r+1)*s+(o-1),
T=(r+1)*s+o,
E=(r+1)*(s-1)+o;
c.push(M,S,E),c.push(S,T,E);
}}

function A(t,e,n,r,i){
var a=Math.cos(t),
o=Math.sin(t),
s=n/e*t,
c=Math.cos(s);
i.x=r*(2+c)*.5*a,i.y=r*(2+c)*o*.5,i.z=r*Math.sin(s)*.5;
}
this.setIndex(c),this.addAttribute("position",new xr(l,3)),this.addAttribute("normal",new xr(h,3)),this.addAttribute("uv",new xr(u,2));
}

function Gs(t,e,n,r,i){
ei.call(this),this.type="TorusGeometry",this.parameters={
radius:t,
tube:e,
radialSegments:n,
tubularSegments:r,
arc:i},
this.fromBufferGeometry(new Us(t,e,n,r,i)),this.mergeVertices();
}

function Us(t,e,n,r,i){
Pr.call(this),this.type="TorusBufferGeometry",this.parameters={
radius:t,
tube:e,
radialSegments:n,
tubularSegments:r,
arc:i},
t=t||1,e=e||.4,n=Math.floor(n)||8,r=Math.floor(r)||6,i=i||2*Math.PI;
var a,o,s=[],
c=[],
l=[],
h=[],
u=new Ie(),
p=new Ie(),
d=new Ie();
for(a=0;a<=n;a++){
for(o=0;o<=r;o++){
var f=o/r*i,
m=a/n*Math.PI*2;
p.x=(t+e*Math.cos(m))*Math.cos(f),p.y=(t+e*Math.cos(m))*Math.sin(f),p.z=e*Math.sin(m),c.push(p.x,p.y,p.z),u.x=t*Math.cos(f),u.y=t*Math.sin(f),d.subVectors(p,u).normalize(),l.push(d.x,d.y,d.z),h.push(o/r),h.push(a/n);
}}
for(a=1;a<=n;a++){
for(o=1;o<=r;o++){
var v=(r+1)*a+o-1,
g=(r+1)*(a-1)+o-1,
y=(r+1)*(a-1)+o,
x=(r+1)*a+o;
s.push(v,g,x),s.push(g,y,x);
}}
this.setIndex(s),this.addAttribute("position",new xr(c,3)),this.addAttribute("normal",new xr(l,3)),this.addAttribute("uv",new xr(h,2));
}
vs.prototype=Object.assign(Object.create(gn.prototype),{
constructor:vs,
isPoints:!0,
raycast:function raycast(t,e){
var n=this.geometry,
r=this.matrixWorld,
i=t.params.Points.threshold;
if(null===n.boundingSphere&&n.computeBoundingSphere(),fs.copy(n.boundingSphere),fs.applyMatrix4(r),fs.radius+=i,!1!==t.ray.intersectsSphere(fs)){
ps.getInverse(r),ds.copy(t.ray).applyMatrix4(ps);
var a=i/((this.scale.x+this.scale.y+this.scale.z)/3),
o=a*a;
if(n.isBufferGeometry){
var s=n.index,
c=n.attributes.position.array;
if(null!==s)
for(var l=s.array,h=0,u=l.length;h<u;h++){
var p=l[h];
ms.fromArray(c,3*p),gs(ms,p,o,r,t,e,this);
}else{
h=0;
for(var d=c.length/3;h<d;h++){ms.fromArray(c,3*h),gs(ms,h,o,r,t,e,this);}
}
}else{
var f=n.vertices;
for(h=0,d=f.length;h<d;h++){gs(f[h],h,o,r,t,e,this);}
}
}
},
updateMorphTargets:function updateMorphTargets(){
var t,e,n,r=this.geometry;
if(r.isBufferGeometry){
var i=r.morphAttributes,
a=Object.keys(i);
if(a.length>0){
var o=i[a[0]];
if(void 0!==o)
for(this.morphTargetInfluences=[],this.morphTargetDictionary={},t=0,e=o.length;t<e;t++){n=o[t].name||String(t),this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=t;}
}
}else{
var s=r.morphTargets;
void 0!==s&&s.length>0&&console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.");
}
},
clone:function clone(){
return new this.constructor(this.geometry,this.material).copy(this);
}}),
ys.prototype=Object.assign(Object.create(He.prototype),{
constructor:ys,
isVideoTexture:!0,
update:function update(){
var t=this.image;
t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0);
}}),
xs.prototype=Object.create(He.prototype),xs.prototype.constructor=xs,xs.prototype.isCompressedTexture=!0,bs.prototype=Object.create(He.prototype),bs.prototype.constructor=bs,bs.prototype.isCanvasTexture=!0,ws.prototype=Object.create(He.prototype),ws.prototype.constructor=ws,ws.prototype.isDepthTexture=!0,_s.prototype=Object.create(Pr.prototype),_s.prototype.constructor=_s,Ms.prototype=Object.create(ei.prototype),Ms.prototype.constructor=Ms,Ss.prototype=Object.create(Pr.prototype),Ss.prototype.constructor=Ss,Ts.prototype=Object.create(ei.prototype),Ts.prototype.constructor=Ts,Es.prototype=Object.create(Pr.prototype),Es.prototype.constructor=Es,As.prototype=Object.create(ei.prototype),As.prototype.constructor=As,Ls.prototype=Object.create(Es.prototype),Ls.prototype.constructor=Ls,Rs.prototype=Object.create(ei.prototype),Rs.prototype.constructor=Rs,Ps.prototype=Object.create(Es.prototype),Ps.prototype.constructor=Ps,Cs.prototype=Object.create(ei.prototype),Cs.prototype.constructor=Cs,Os.prototype=Object.create(Es.prototype),Os.prototype.constructor=Os,Ds.prototype=Object.create(ei.prototype),Ds.prototype.constructor=Ds,Ns.prototype=Object.create(Es.prototype),Ns.prototype.constructor=Ns,Is.prototype=Object.create(ei.prototype),Is.prototype.constructor=Is,zs.prototype=Object.create(Pr.prototype),zs.prototype.constructor=zs,zs.prototype.toJSON=function(){
var t=Pr.prototype.toJSON.call(this);
return t.path=this.parameters.path.toJSON(),t;
},Bs.prototype=Object.create(ei.prototype),Bs.prototype.constructor=Bs,Fs.prototype=Object.create(Pr.prototype),Fs.prototype.constructor=Fs,Gs.prototype=Object.create(ei.prototype),Gs.prototype.constructor=Gs,Us.prototype=Object.create(Pr.prototype),Us.prototype.constructor=Us;
var Hs=function Hs(t,e,n){
n=n||2;
var r,i,a,o,s,c,l,h=e&&e.length,
u=h?e[0]*n:t.length,
p=Vs(t,0,u,n,!0),
d=[];
if(!p||p.next===p.prev)return d;
if(h&&(p=function(t,e,n,r){
var i,a,o,s,c,l=[];
for(i=0,a=e.length;i<a;i++){o=e[i]*r,s=i<a-1?e[i+1]*r:t.length,(c=Vs(t,o,s,r,!1))===c.next&&(c.steiner=!0),l.push(Ks(c));}
for(l.sort(Js),i=0;i<l.length;i++){Zs(l[i],n),n=js(n,n.next);}
return n;
}(t,e,p,n)),t.length>80*n){
r=a=t[0],i=o=t[1];
for(var f=n;f<u;f+=n){(s=t[f])<r&&(r=s),(c=t[f+1])<i&&(i=c),s>a&&(a=s),c>o&&(o=c);}
l=0!==(l=Math.max(a-r,o-i))?1/l:0;
}
return ks(p,d,n,r,i,l),d;
};

function Vs(t,e,n,r,i){
var a,o;
if(i===function(t,e,n,r){
for(var i=0,a=e,o=n-r;a<n;a+=r){i+=(t[o]-t[a])*(t[a+1]+t[o+1]),o=a;}
return i;
}(t,e,n,r)>0)
for(a=e;a<n;a+=r){o=oc(a,t[a],t[a+1],o);}else

for(a=n-r;a>=e;a-=r){o=oc(a,t[a],t[a+1],o);}
return o&&nc(o,o.next)&&(sc(o),o=o.next),o;
}

function js(t,e){
if(!t)return t;
e||(e=t);
var n,r=t;
do{
if(n=!1,r.steiner||!nc(r,r.next)&&0!==ec(r.prev,r,r.next))r=r.next;else
{
if(sc(r),(r=e=r.prev)===r.next)break;
n=!0;
}
}while(n||r!==e);
return e;
}

function ks(t,e,n,r,i,a,o){
if(t){
!o&&a&&function(t,e,n,r){
var i=t;
do{
null===i.z&&(i.z=Qs(i.x,i.y,e,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;
}while(i!==t);
i.prevZ.nextZ=null,i.prevZ=null,
function(t){
var e,n,r,i,a,o,s,c,l=1;
do{
for(n=t,t=null,a=null,o=0;n;){
for(o++,r=n,s=0,e=0;e<l&&(s++,r=r.nextZ);e++){;}
for(c=l;s>0||c>0&&r;){0!==s&&(0===c||!r||n.z<=r.z)?(i=n,n=n.nextZ,s--):(i=r,r=r.nextZ,c--),a?a.nextZ=i:t=i,i.prevZ=a,a=i;}
n=r;
}
a.nextZ=null,l*=2;
}while(o>1);
}(i);
}(t,r,i,a);
for(var s,c,l=t;t.prev!==t.next;){
if(s=t.prev,c=t.next,a?qs(t,r,i,a):Ws(t))e.push(s.i/n),e.push(t.i/n),e.push(c.i/n),sc(t),t=c.next,l=c.next;else
if((t=c)===l){
o?1===o?ks(t=Xs(t,e,n),e,n,r,i,a,2):2===o&&Ys(t,e,n,r,i,a):ks(js(t),e,n,r,i,a,1);
break;
}}
}
}

function Ws(t){
var e=t.prev,
n=t,
r=t.next;
if(ec(e,n,r)>=0)return!1;
for(var i=t.next.next;i!==t.prev;){
if($s(e.x,e.y,n.x,n.y,r.x,r.y,i.x,i.y)&&ec(i.prev,i,i.next)>=0)return!1;
i=i.next;
}
return!0;
}

function qs(t,e,n,r){
var i=t.prev,
a=t,
o=t.next;
if(ec(i,a,o)>=0)return!1;
for(var s=i.x<a.x?i.x<o.x?i.x:o.x:a.x<o.x?a.x:o.x,c=i.y<a.y?i.y<o.y?i.y:o.y:a.y<o.y?a.y:o.y,l=i.x>a.x?i.x>o.x?i.x:o.x:a.x>o.x?a.x:o.x,h=i.y>a.y?i.y>o.y?i.y:o.y:a.y>o.y?a.y:o.y,u=Qs(s,c,e,n,r),p=Qs(l,h,e,n,r),d=t.prevZ,f=t.nextZ;d&&d.z>=u&&f&&f.z<=p;){
if(d!==t.prev&&d!==t.next&&$s(i.x,i.y,a.x,a.y,o.x,o.y,d.x,d.y)&&ec(d.prev,d,d.next)>=0)return!1;
if(d=d.prevZ,f!==t.prev&&f!==t.next&&$s(i.x,i.y,a.x,a.y,o.x,o.y,f.x,f.y)&&ec(f.prev,f,f.next)>=0)return!1;
f=f.nextZ;
}
for(;d&&d.z>=u;){
if(d!==t.prev&&d!==t.next&&$s(i.x,i.y,a.x,a.y,o.x,o.y,d.x,d.y)&&ec(d.prev,d,d.next)>=0)return!1;
d=d.prevZ;
}
for(;f&&f.z<=p;){
if(f!==t.prev&&f!==t.next&&$s(i.x,i.y,a.x,a.y,o.x,o.y,f.x,f.y)&&ec(f.prev,f,f.next)>=0)return!1;
f=f.nextZ;
}
return!0;
}

function Xs(t,e,n){
var r=t;
do{
var i=r.prev,
a=r.next.next;
!nc(i,a)&&rc(i,r,r.next,a)&&ic(i,a)&&ic(a,i)&&(e.push(i.i/n),e.push(r.i/n),e.push(a.i/n),sc(r),sc(r.next),r=t=a),r=r.next;
}while(r!==t);
return r;
}

function Ys(t,e,n,r,i,a){
var o=t;
do{
for(var s=o.next.next;s!==o.prev;){
if(o.i!==s.i&&tc(o,s)){
var c=ac(o,s);
return o=js(o,o.next),c=js(c,c.next),ks(o,e,n,r,i,a),void ks(c,e,n,r,i,a);
}
s=s.next;
}
o=o.next;
}while(o!==t);
}

function Js(t,e){
return t.x-e.x;
}

function Zs(t,e){
if(e=function(t,e){
var n,r=e,
i=t.x,
a=t.y,
o=-1/0;
do{
if(a<=r.y&&a>=r.next.y&&r.next.y!==r.y){
var s=r.x+(a-r.y)*(r.next.x-r.x)/(r.next.y-r.y);
if(s<=i&&s>o){
if(o=s,s===i){
if(a===r.y)return r;
if(a===r.next.y)return r.next;
}
n=r.x<r.next.x?r:r.next;
}
}
r=r.next;
}while(r!==e);
if(!n)return null;
if(i===o)return n.prev;
var c,l=n,
h=n.x,
u=n.y,
p=1/0;
for(r=n.next;r!==l;){i>=r.x&&r.x>=h&&i!==r.x&&$s(a<u?i:o,a,h,u,a<u?o:i,a,r.x,r.y)&&((c=Math.abs(a-r.y)/(i-r.x))<p||c===p&&r.x>n.x)&&ic(r,t)&&(n=r,p=c),r=r.next;}
return n;
}(t,e)){
var n=ac(e,t);
js(n,n.next);
}
}

function Qs(t,e,n,r,i){
return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=32767*(t-n)*i)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=32767*(e-r)*i)|e<<8))|e<<4))|e<<2))|e<<1))<<1;
}

function Ks(t){
var e=t,
n=t;
do{
(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;
}while(e!==t);
return n;
}

function $s(t,e,n,r,i,a,o,s){
return(i-o)*(e-s)-(t-o)*(a-s)>=0&&(t-o)*(r-s)-(n-o)*(e-s)>=0&&(n-o)*(a-s)-(i-o)*(r-s)>=0;
}

function tc(t,e){
return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){
var n=t;
do{
if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&rc(n,n.next,t,e))return!0;
n=n.next;
}while(n!==t);
return!1;
}(t,e)&&ic(t,e)&&ic(e,t)&&function(t,e){
var n=t,
r=!1,
i=(t.x+e.x)/2,
a=(t.y+e.y)/2;
do{
n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;
}while(n!==t);
return r;
}(t,e);
}

function ec(t,e,n){
return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y);
}

function nc(t,e){
return t.x===e.x&&t.y===e.y;
}

function rc(t,e,n,r){
return!!(nc(t,n)&&nc(e,r)||nc(t,r)&&nc(n,e))||ec(t,e,n)>0!=ec(t,e,r)>0&&ec(n,r,t)>0!=ec(n,r,e)>0;
}

function ic(t,e){
return ec(t.prev,t,t.next)<0?ec(t,e,t.next)>=0&&ec(t,t.prev,e)>=0:ec(t,e,t.prev)<0||ec(t,t.next,e)<0;
}

function ac(t,e){
var n=new cc(t.i,t.x,t.y),
r=new cc(e.i,e.x,e.y),
i=t.next,
a=e.prev;
return t.next=e,e.prev=t,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r;
}

function oc(t,e,n,r){
var i=new cc(t,e,n);
return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i;
}

function sc(t){
t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ);
}

function cc(t,e,n){
this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1;
}
var lc={
area:function area(t){
for(var e=t.length,n=0,r=e-1,i=0;i<e;r=i++){n+=t[r].x*t[i].y-t[i].x*t[r].y;}
return .5*n;
},
isClockWise:function isClockWise(t){
return lc.area(t)<0;
},
triangulateShape:function triangulateShape(t,e){
var n=[],
r=[],
i=[];
hc(t),uc(n,t);
var a=t.length;
e.forEach(hc);
for(var o=0;o<e.length;o++){r.push(a),a+=e[o].length,uc(n,e[o]);}
var s=Hs(n,r);
for(o=0;o<s.length;o+=3){i.push(s.slice(o,o+3));}
return i;
}};


function hc(t){
var e=t.length;
e>2&&t[e-1].equals(t[0])&&t.pop();
}

function uc(t,e){
for(var n=0;n<e.length;n++){t.push(e[n].x),t.push(e[n].y);}
}

function pc(t,e){
ei.call(this),this.type="ExtrudeGeometry",this.parameters={
shapes:t,
options:e},
this.fromBufferGeometry(new dc(t,e)),this.mergeVertices();
}

function dc(t,e){
Pr.call(this),this.type="ExtrudeBufferGeometry",this.parameters={
shapes:t,
options:e},
t=Array.isArray(t)?t:[t];
for(var n=this,r=[],i=[],a=0,o=t.length;a<o;a++){s(t[a]);}

function s(t){
var a=[],
o=void 0!==e.curveSegments?e.curveSegments:12,
s=void 0!==e.steps?e.steps:1,
c=void 0!==e.depth?e.depth:100,
l=void 0===e.bevelEnabled||e.bevelEnabled,
h=void 0!==e.bevelThickness?e.bevelThickness:6,
u=void 0!==e.bevelSize?e.bevelSize:h-2,
p=void 0!==e.bevelOffset?e.bevelOffset:0,
d=void 0!==e.bevelSegments?e.bevelSegments:3,
f=e.extrudePath,
m=void 0!==e.UVGenerator?e.UVGenerator:fc;
void 0!==e.amount&&(console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."),c=e.amount);
var v,g,y,x,b,w,_,M,S=!1;
f&&(v=f.getSpacedPoints(s),S=!0,l=!1,g=f.computeFrenetFrames(s,!1),y=new Ie(),x=new Ie(),b=new Ie()),l||(d=0,h=0,u=0,p=0);
var T=t.extractPoints(o),
E=T.shape,
A=T.holes;
if(!lc.isClockWise(E))
for(E=E.reverse(),_=0,M=A.length;_<M;_++){w=A[_],lc.isClockWise(w)&&(A[_]=w.reverse());}
var L=lc.triangulateShape(E,A),
R=E;
for(_=0,M=A.length;_<M;_++){w=A[_],E=E.concat(w);}

function P(t,e,n){
return e||console.error("THREE.ExtrudeGeometry: vec does not exist"),e.clone().multiplyScalar(n).add(t);
}
var C,O,D,N,I,z,B=E.length,
F=L.length;

function G(t,e,n){
var r,i,a,o=t.x-e.x,
s=t.y-e.y,
c=n.x-t.x,
l=n.y-t.y,
h=o*o+s*s,
u=o*l-s*c;
if(Math.abs(u)>Number.EPSILON){
var p=Math.sqrt(h),
d=Math.sqrt(c*c+l*l),
f=e.x-s/p,
m=e.y+o/p,
v=((n.x-l/d-f)*l-(n.y+c/d-m)*c)/(o*l-s*c),
g=(r=f+o*v-t.x)*r+(i=m+s*v-t.y)*i;
if(g<=2)return new Ce(r,i);
a=Math.sqrt(g/2);
}else{
var y=!1;
o>Number.EPSILON?c>Number.EPSILON&&(y=!0):o<-Number.EPSILON?c<-Number.EPSILON&&(y=!0):Math.sign(s)===Math.sign(l)&&(y=!0),y?(r=-s,i=o,a=Math.sqrt(h)):(r=o,i=s,a=Math.sqrt(h/2));
}
return new Ce(r/a,i/a);
}
for(var U=[],H=0,V=R.length,j=V-1,k=H+1;H<V;H++,j++,k++){j===V&&(j=0),k===V&&(k=0),U[H]=G(R[H],R[j],R[k]);}
var W,q,X=[],
Y=U.concat();
for(_=0,M=A.length;_<M;_++){
for(w=A[_],W=[],H=0,j=(V=w.length)-1,k=H+1;H<V;H++,j++,k++){j===V&&(j=0),k===V&&(k=0),W[H]=G(w[H],w[j],w[k]);}
X.push(W),Y=Y.concat(W);
}
for(C=0;C<d;C++){
for(D=C/d,N=h*Math.cos(D*Math.PI/2),O=u*Math.sin(D*Math.PI/2)+p,H=0,V=R.length;H<V;H++){Z((I=P(R[H],U[H],O)).x,I.y,-N);}
for(_=0,M=A.length;_<M;_++){
for(w=A[_],W=X[_],H=0,V=w.length;H<V;H++){Z((I=P(w[H],W[H],O)).x,I.y,-N);}}
}
for(O=u+p,H=0;H<B;H++){I=l?P(E[H],Y[H],O):E[H],S?(x.copy(g.normals[0]).multiplyScalar(I.x),y.copy(g.binormals[0]).multiplyScalar(I.y),b.copy(v[0]).add(x).add(y),Z(b.x,b.y,b.z)):Z(I.x,I.y,0);}
for(q=1;q<=s;q++){
for(H=0;H<B;H++){I=l?P(E[H],Y[H],O):E[H],S?(x.copy(g.normals[q]).multiplyScalar(I.x),y.copy(g.binormals[q]).multiplyScalar(I.y),b.copy(v[q]).add(x).add(y),Z(b.x,b.y,b.z)):Z(I.x,I.y,c/s*q);}}
for(C=d-1;C>=0;C--){
for(D=C/d,N=h*Math.cos(D*Math.PI/2),O=u*Math.sin(D*Math.PI/2)+p,H=0,V=R.length;H<V;H++){Z((I=P(R[H],U[H],O)).x,I.y,c+N);}
for(_=0,M=A.length;_<M;_++){
for(w=A[_],W=X[_],H=0,V=w.length;H<V;H++){I=P(w[H],W[H],O),S?Z(I.x,I.y+v[s-1].y,v[s-1].x+N):Z(I.x,I.y,c+N);}}
}

function J(t,e){
var n,r;
for(H=t.length;--H>=0;){
n=H,(r=H-1)<0&&(r=t.length-1);
var i=0,
a=s+2*d;
for(i=0;i<a;i++){
var o=B*i,
c=B*(i+1);
K(e+n+o,e+r+o,e+r+c,e+n+c);
}
}
}

function Z(t,e,n){
a.push(t),a.push(e),a.push(n);
}

function Q(t,e,i){
$(t),$(e),$(i);
var a=r.length/3,
o=m.generateTopUV(n,r,a-3,a-2,a-1);
tt(o[0]),tt(o[1]),tt(o[2]);
}

function K(t,e,i,a){
$(t),$(e),$(a),$(e),$(i),$(a);
var o=r.length/3,
s=m.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);
tt(s[0]),tt(s[1]),tt(s[3]),tt(s[1]),tt(s[2]),tt(s[3]);
}

function $(t){
r.push(a[3*t+0]),r.push(a[3*t+1]),r.push(a[3*t+2]);
}

function tt(t){
i.push(t.x),i.push(t.y);
}!function(){
var t=r.length/3;
if(l){
var e=0,
i=B*e;
for(H=0;H<F;H++){Q((z=L[H])[2]+i,z[1]+i,z[0]+i);}
for(i=B*(e=s+2*d),H=0;H<F;H++){Q((z=L[H])[0]+i,z[1]+i,z[2]+i);}
}else{
for(H=0;H<F;H++){Q((z=L[H])[2],z[1],z[0]);}
for(H=0;H<F;H++){Q((z=L[H])[0]+B*s,z[1]+B*s,z[2]+B*s);}
}
n.addGroup(t,r.length/3-t,0);
}(),
function(){
var t=r.length/3,
e=0;
for(J(R,e),e+=R.length,_=0,M=A.length;_<M;_++){J(w=A[_],e),e+=w.length;}
n.addGroup(t,r.length/3-t,1);
}();
}
this.addAttribute("position",new xr(r,3)),this.addAttribute("uv",new xr(i,2)),this.computeVertexNormals();
}
pc.prototype=Object.create(ei.prototype),pc.prototype.constructor=pc,pc.prototype.toJSON=function(){
var t=ei.prototype.toJSON.call(this);
return mc(this.parameters.shapes,this.parameters.options,t);
},dc.prototype=Object.create(Pr.prototype),dc.prototype.constructor=dc,dc.prototype.toJSON=function(){
var t=Pr.prototype.toJSON.call(this);
return mc(this.parameters.shapes,this.parameters.options,t);
};
var fc={
generateTopUV:function generateTopUV(t,e,n,r,i){
var a=e[3*n],
o=e[3*n+1],
s=e[3*r],
c=e[3*r+1],
l=e[3*i],
h=e[3*i+1];
return[new Ce(a,o),new Ce(s,c),new Ce(l,h)];
},
generateSideWallUV:function generateSideWallUV(t,e,n,r,i,a){
var o=e[3*n],
s=e[3*n+1],
c=e[3*n+2],
l=e[3*r],
h=e[3*r+1],
u=e[3*r+2],
p=e[3*i],
d=e[3*i+1],
f=e[3*i+2],
m=e[3*a],
v=e[3*a+1],
g=e[3*a+2];
return Math.abs(s-h)<.01?[new Ce(o,1-c),new Ce(l,1-u),new Ce(p,1-f),new Ce(m,1-g)]:[new Ce(s,1-c),new Ce(h,1-u),new Ce(d,1-f),new Ce(v,1-g)];
}};


function mc(t,e,n){
if(n.shapes=[],Array.isArray(t))
for(var r=0,i=t.length;r<i;r++){
var a=t[r];
n.shapes.push(a.uuid);
}else n.shapes.push(t.uuid);
return void 0!==e.extrudePath&&(n.options.extrudePath=e.extrudePath.toJSON()),n;
}

function vc(t,e){
ei.call(this),this.type="TextGeometry",this.parameters={
text:t,
parameters:e},
this.fromBufferGeometry(new gc(t,e)),this.mergeVertices();
}

function gc(t,e){
var n=(e=e||{}).font;
if(!n||!n.isFont)return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."),new ei();
var r=n.generateShapes(t,e.size);
e.depth=void 0!==e.height?e.height:50,void 0===e.bevelThickness&&(e.bevelThickness=10),void 0===e.bevelSize&&(e.bevelSize=8),void 0===e.bevelEnabled&&(e.bevelEnabled=!1),dc.call(this,r,e),this.type="TextBufferGeometry";
}

function yc(t,e,n,r,i,a,o){
ei.call(this),this.type="SphereGeometry",this.parameters={
radius:t,
widthSegments:e,
heightSegments:n,
phiStart:r,
phiLength:i,
thetaStart:a,
thetaLength:o},
this.fromBufferGeometry(new xc(t,e,n,r,i,a,o)),this.mergeVertices();
}

function xc(t,e,n,r,i,a,o){
Pr.call(this),this.type="SphereBufferGeometry",this.parameters={
radius:t,
widthSegments:e,
heightSegments:n,
phiStart:r,
phiLength:i,
thetaStart:a,
thetaLength:o},
t=t||1,e=Math.max(3,Math.floor(e)||8),n=Math.max(2,Math.floor(n)||6),r=void 0!==r?r:0,i=void 0!==i?i:2*Math.PI,a=void 0!==a?a:0,o=void 0!==o?o:Math.PI;
var s,c,l=Math.min(a+o,Math.PI),
h=0,
u=[],
p=new Ie(),
d=new Ie(),
f=[],
m=[],
v=[],
g=[];
for(c=0;c<=n;c++){
var y=[],
x=c/n,
b=0;
for(0==c&&0==a?b=.5/e:c==n&&l==Math.PI&&(b=-.5/e),s=0;s<=e;s++){
var w=s/e;
p.x=-t*Math.cos(r+w*i)*Math.sin(a+x*o),p.y=t*Math.cos(a+x*o),p.z=t*Math.sin(r+w*i)*Math.sin(a+x*o),m.push(p.x,p.y,p.z),d.copy(p).normalize(),v.push(d.x,d.y,d.z),g.push(w+b,1-x),y.push(h++);
}
u.push(y);
}
for(c=0;c<n;c++){
for(s=0;s<e;s++){
var _=u[c][s+1],
M=u[c][s],
S=u[c+1][s],
T=u[c+1][s+1];
(0!==c||a>0)&&f.push(_,M,T),(c!==n-1||l<Math.PI)&&f.push(M,S,T);
}}
this.setIndex(f),this.addAttribute("position",new xr(m,3)),this.addAttribute("normal",new xr(v,3)),this.addAttribute("uv",new xr(g,2));
}

function bc(t,e,n,r,i,a){
ei.call(this),this.type="RingGeometry",this.parameters={
innerRadius:t,
outerRadius:e,
thetaSegments:n,
phiSegments:r,
thetaStart:i,
thetaLength:a},
this.fromBufferGeometry(new wc(t,e,n,r,i,a)),this.mergeVertices();
}

function wc(t,e,n,r,i,a){
Pr.call(this),this.type="RingBufferGeometry",this.parameters={
innerRadius:t,
outerRadius:e,
thetaSegments:n,
phiSegments:r,
thetaStart:i,
thetaLength:a},
t=t||.5,e=e||1,i=void 0!==i?i:0,a=void 0!==a?a:2*Math.PI,n=void 0!==n?Math.max(3,n):8;
var o,s,c,l=[],
h=[],
u=[],
p=[],
d=t,
f=(e-t)/(r=void 0!==r?Math.max(1,r):1),
m=new Ie(),
v=new Ce();
for(s=0;s<=r;s++){
for(c=0;c<=n;c++){o=i+c/n*a,m.x=d*Math.cos(o),m.y=d*Math.sin(o),h.push(m.x,m.y,m.z),u.push(0,0,1),v.x=(m.x/e+1)/2,v.y=(m.y/e+1)/2,p.push(v.x,v.y);}
d+=f;
}
for(s=0;s<r;s++){
var g=s*(n+1);
for(c=0;c<n;c++){
var y=o=c+g,
x=o+n+1,
b=o+n+2,
w=o+1;
l.push(y,x,w),l.push(x,b,w);
}
}
this.setIndex(l),this.addAttribute("position",new xr(h,3)),this.addAttribute("normal",new xr(u,3)),this.addAttribute("uv",new xr(p,2));
}

function _c(t,e,n,r){
ei.call(this),this.type="LatheGeometry",this.parameters={
points:t,
segments:e,
phiStart:n,
phiLength:r},
this.fromBufferGeometry(new Mc(t,e,n,r)),this.mergeVertices();
}

function Mc(t,e,n,r){
Pr.call(this),this.type="LatheBufferGeometry",this.parameters={
points:t,
segments:e,
phiStart:n,
phiLength:r},
e=Math.floor(e)||12,n=n||0,r=r||2*Math.PI,r=Pe.clamp(r,0,2*Math.PI);
var i,a,o,s=[],
c=[],
l=[],
h=1/e,
u=new Ie(),
p=new Ce();
for(a=0;a<=e;a++){
var d=n+a*h*r,
f=Math.sin(d),
m=Math.cos(d);
for(o=0;o<=t.length-1;o++){u.x=t[o].x*f,u.y=t[o].y,u.z=t[o].x*m,c.push(u.x,u.y,u.z),p.x=a/e,p.y=o/(t.length-1),l.push(p.x,p.y);}
}
for(a=0;a<e;a++){
for(o=0;o<t.length-1;o++){
var v=i=o+a*t.length,
g=i+t.length,
y=i+t.length+1,
x=i+1;
s.push(v,g,x),s.push(g,y,x);
}}
if(this.setIndex(s),this.addAttribute("position",new xr(c,3)),this.addAttribute("uv",new xr(l,2)),this.computeVertexNormals(),r===2*Math.PI){
var b=this.attributes.normal.array,
w=new Ie(),
_=new Ie(),
M=new Ie();
for(i=e*t.length*3,a=0,o=0;a<t.length;a++,o+=3){w.x=b[o+0],w.y=b[o+1],w.z=b[o+2],_.x=b[i+o+0],_.y=b[i+o+1],_.z=b[i+o+2],M.addVectors(w,_).normalize(),b[o+0]=b[i+o+0]=M.x,b[o+1]=b[i+o+1]=M.y,b[o+2]=b[i+o+2]=M.z;}
}
}

function Sc(t,e){
ei.call(this),this.type="ShapeGeometry","object"===y(e)&&(console.warn("THREE.ShapeGeometry: Options parameter has been removed."),e=e.curveSegments),this.parameters={
shapes:t,
curveSegments:e},
this.fromBufferGeometry(new Tc(t,e)),this.mergeVertices();
}

function Tc(t,e){
Pr.call(this),this.type="ShapeBufferGeometry",this.parameters={
shapes:t,
curveSegments:e},
e=e||12;
var n=[],
r=[],
i=[],
a=[],
o=0,
s=0;
if(!1===Array.isArray(t))l(t);else

for(var c=0;c<t.length;c++){l(t[c]),this.addGroup(o,s,c),o+=s,s=0;}

function l(t){
var o,c,l,h=r.length/3,
u=t.extractPoints(e),
p=u.shape,
d=u.holes;
for(!1===lc.isClockWise(p)&&(p=p.reverse()),o=0,c=d.length;o<c;o++){l=d[o],!0===lc.isClockWise(l)&&(d[o]=l.reverse());}
var f=lc.triangulateShape(p,d);
for(o=0,c=d.length;o<c;o++){l=d[o],p=p.concat(l);}
for(o=0,c=p.length;o<c;o++){
var m=p[o];
r.push(m.x,m.y,0),i.push(0,0,1),a.push(m.x,m.y);
}
for(o=0,c=f.length;o<c;o++){
var v=f[o],
g=v[0]+h,
y=v[1]+h,
x=v[2]+h;
n.push(g,y,x),s+=3;
}
}
this.setIndex(n),this.addAttribute("position",new xr(r,3)),this.addAttribute("normal",new xr(i,3)),this.addAttribute("uv",new xr(a,2));
}

function Ec(t,e){
if(e.shapes=[],Array.isArray(t))
for(var n=0,r=t.length;n<r;n++){
var i=t[n];
e.shapes.push(i.uuid);
}else e.shapes.push(t.uuid);
return e;
}

function Ac(t,e){
Pr.call(this),this.type="EdgesGeometry",this.parameters={
thresholdAngle:e},
e=void 0!==e?e:1;
var n,r,i,a,o=[],
s=Math.cos(Pe.DEG2RAD*e),
c=[0,0],
l={},
h=["a","b","c"];
t.isBufferGeometry?(a=new ei()).fromBufferGeometry(t):a=t.clone(),a.mergeVertices(),a.computeFaceNormals();
for(var u=a.vertices,p=a.faces,d=0,f=p.length;d<f;d++){
for(var m=p[d],v=0;v<3;v++){n=m[h[v]],r=m[h[(v+1)%3]],c[0]=Math.min(n,r),c[1]=Math.max(n,r),void 0===l[i=c[0]+","+c[1]]?l[i]={
index1:c[0],
index2:c[1],
face1:d,
face2:void 0}:
l[i].face2=d;}}
for(i in l){
var g=l[i];
if(void 0===g.face2||p[g.face1].normal.dot(p[g.face2].normal)<=s){
var y=u[g.index1];
o.push(y.x,y.y,y.z),y=u[g.index2],o.push(y.x,y.y,y.z);
}
}
this.addAttribute("position",new xr(o,3));
}

function Lc(t,e,n,r,i,a,o,s){
ei.call(this),this.type="CylinderGeometry",this.parameters={
radiusTop:t,
radiusBottom:e,
height:n,
radialSegments:r,
heightSegments:i,
openEnded:a,
thetaStart:o,
thetaLength:s},
this.fromBufferGeometry(new Rc(t,e,n,r,i,a,o,s)),this.mergeVertices();
}

function Rc(t,e,n,r,i,a,o,s){
Pr.call(this),this.type="CylinderBufferGeometry",this.parameters={
radiusTop:t,
radiusBottom:e,
height:n,
radialSegments:r,
heightSegments:i,
openEnded:a,
thetaStart:o,
thetaLength:s};

var c=this;
t=void 0!==t?t:1,e=void 0!==e?e:1,n=n||1,r=Math.floor(r)||8,i=Math.floor(i)||1,a=void 0!==a&&a,o=void 0!==o?o:0,s=void 0!==s?s:2*Math.PI;
var l=[],
h=[],
u=[],
p=[],
d=0,
f=[],
m=n/2,
v=0;

function g(n){
var i,a,f,g=new Ce(),
y=new Ie(),
x=0,
b=!0===n?t:e,
w=!0===n?1:-1;
for(a=d,i=1;i<=r;i++){h.push(0,m*w,0),u.push(0,w,0),p.push(.5,.5),d++;}
for(f=d,i=0;i<=r;i++){
var _=i/r*s+o,
M=Math.cos(_),
S=Math.sin(_);
y.x=b*S,y.y=m*w,y.z=b*M,h.push(y.x,y.y,y.z),u.push(0,w,0),g.x=.5*M+.5,g.y=.5*S*w+.5,p.push(g.x,g.y),d++;
}
for(i=0;i<r;i++){
var T=a+i,
E=f+i;
!0===n?l.push(E,E+1,T):l.push(E+1,E,T),x+=3;
}
c.addGroup(v,x,!0===n?1:2),v+=x;
}!function(){
var a,g,y=new Ie(),
x=new Ie(),
b=0,
w=(e-t)/n;
for(g=0;g<=i;g++){
var _=[],
M=g/i,
S=M*(e-t)+t;
for(a=0;a<=r;a++){
var T=a/r,
E=T*s+o,
A=Math.sin(E),
L=Math.cos(E);
x.x=S*A,x.y=-M*n+m,x.z=S*L,h.push(x.x,x.y,x.z),y.set(A,w,L).normalize(),u.push(y.x,y.y,y.z),p.push(T,1-M),_.push(d++);
}
f.push(_);
}
for(a=0;a<r;a++){
for(g=0;g<i;g++){
var R=f[g][a],
P=f[g+1][a],
C=f[g+1][a+1],
O=f[g][a+1];
l.push(R,P,O),l.push(P,C,O),b+=6;
}}
c.addGroup(v,b,0),v+=b;
}(),!1===a&&(t>0&&g(!0),e>0&&g(!1)),this.setIndex(l),this.addAttribute("position",new xr(h,3)),this.addAttribute("normal",new xr(u,3)),this.addAttribute("uv",new xr(p,2));
}

function Pc(t,e,n,r,i,a,o){
Lc.call(this,0,t,e,n,r,i,a,o),this.type="ConeGeometry",this.parameters={
radius:t,
height:e,
radialSegments:n,
heightSegments:r,
openEnded:i,
thetaStart:a,
thetaLength:o};

}

function Cc(t,e,n,r,i,a,o){
Rc.call(this,0,t,e,n,r,i,a,o),this.type="ConeBufferGeometry",this.parameters={
radius:t,
height:e,
radialSegments:n,
heightSegments:r,
openEnded:i,
thetaStart:a,
thetaLength:o};

}

function Oc(t,e,n,r){
ei.call(this),this.type="CircleGeometry",this.parameters={
radius:t,
segments:e,
thetaStart:n,
thetaLength:r},
this.fromBufferGeometry(new Dc(t,e,n,r)),this.mergeVertices();
}

function Dc(t,e,n,r){
Pr.call(this),this.type="CircleBufferGeometry",this.parameters={
radius:t,
segments:e,
thetaStart:n,
thetaLength:r},
t=t||1,e=void 0!==e?Math.max(3,e):8,n=void 0!==n?n:0,r=void 0!==r?r:2*Math.PI;
var i,a,o=[],
s=[],
c=[],
l=[],
h=new Ie(),
u=new Ce();
for(s.push(0,0,0),c.push(0,0,1),l.push(.5,.5),a=0,i=3;a<=e;a++,i+=3){
var p=n+a/e*r;
h.x=t*Math.cos(p),h.y=t*Math.sin(p),s.push(h.x,h.y,h.z),c.push(0,0,1),u.x=(s[i]/t+1)/2,u.y=(s[i+1]/t+1)/2,l.push(u.x,u.y);
}
for(i=1;i<=e;i++){o.push(i,i+1,0);}
this.setIndex(o),this.addAttribute("position",new xr(s,3)),this.addAttribute("normal",new xr(c,3)),this.addAttribute("uv",new xr(l,2));
}
vc.prototype=Object.create(ei.prototype),vc.prototype.constructor=vc,gc.prototype=Object.create(dc.prototype),gc.prototype.constructor=gc,yc.prototype=Object.create(ei.prototype),yc.prototype.constructor=yc,xc.prototype=Object.create(Pr.prototype),xc.prototype.constructor=xc,bc.prototype=Object.create(ei.prototype),bc.prototype.constructor=bc,wc.prototype=Object.create(Pr.prototype),wc.prototype.constructor=wc,_c.prototype=Object.create(ei.prototype),_c.prototype.constructor=_c,Mc.prototype=Object.create(Pr.prototype),Mc.prototype.constructor=Mc,Sc.prototype=Object.create(ei.prototype),Sc.prototype.constructor=Sc,Sc.prototype.toJSON=function(){
var t=ei.prototype.toJSON.call(this);
return Ec(this.parameters.shapes,t);
},Tc.prototype=Object.create(Pr.prototype),Tc.prototype.constructor=Tc,Tc.prototype.toJSON=function(){
var t=Pr.prototype.toJSON.call(this);
return Ec(this.parameters.shapes,t);
},Ac.prototype=Object.create(Pr.prototype),Ac.prototype.constructor=Ac,Lc.prototype=Object.create(ei.prototype),Lc.prototype.constructor=Lc,Rc.prototype=Object.create(Pr.prototype),Rc.prototype.constructor=Rc,Pc.prototype=Object.create(Lc.prototype),Pc.prototype.constructor=Pc,Cc.prototype=Object.create(Rc.prototype),Cc.prototype.constructor=Cc,Oc.prototype=Object.create(ei.prototype),Oc.prototype.constructor=Oc,Dc.prototype=Object.create(Pr.prototype),Dc.prototype.constructor=Dc;
var Nc=Object.freeze({
WireframeGeometry:_s,
ParametricGeometry:Ms,
ParametricBufferGeometry:Ss,
TetrahedronGeometry:As,
TetrahedronBufferGeometry:Ls,
OctahedronGeometry:Rs,
OctahedronBufferGeometry:Ps,
IcosahedronGeometry:Cs,
IcosahedronBufferGeometry:Os,
DodecahedronGeometry:Ds,
DodecahedronBufferGeometry:Ns,
PolyhedronGeometry:Ts,
PolyhedronBufferGeometry:Es,
TubeGeometry:Is,
TubeBufferGeometry:zs,
TorusKnotGeometry:Bs,
TorusKnotBufferGeometry:Fs,
TorusGeometry:Gs,
TorusBufferGeometry:Us,
TextGeometry:vc,
TextBufferGeometry:gc,
SphereGeometry:yc,
SphereBufferGeometry:xc,
RingGeometry:bc,
RingBufferGeometry:wc,
PlaneGeometry:Ri,
PlaneBufferGeometry:Pi,
LatheGeometry:_c,
LatheBufferGeometry:Mc,
ShapeGeometry:Sc,
ShapeBufferGeometry:Tc,
ExtrudeGeometry:pc,
ExtrudeBufferGeometry:dc,
EdgesGeometry:Ac,
ConeGeometry:Pc,
ConeBufferGeometry:Cc,
CylinderGeometry:Lc,
CylinderBufferGeometry:Rc,
CircleGeometry:Oc,
CircleBufferGeometry:Dc,
BoxGeometry:ni,
BoxBufferGeometry:ri});


function Ic(t){
lr.call(this),this.type="ShadowMaterial",this.color=new rr(0),this.transparent=!0,this.setValues(t);
}

function zc(t){
li.call(this,t),this.type="RawShaderMaterial";
}

function Bc(t){
lr.call(this),this.defines={
STANDARD:""},
this.type="MeshStandardMaterial",this.color=new rr(16777215),this.roughness=.5,this.metalness=.5,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rr(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Se,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t);
}

function Fc(t){
Bc.call(this),this.defines={
STANDARD:"",
PHYSICAL:""},
this.type="MeshPhysicalMaterial",this.reflectivity=.5,this.clearcoat=0,this.clearcoatRoughness=0,this.sheen=null,this.clearcoatNormalScale=new Ce(1,1),this.clearcoatNormalMap=null,this.transparency=0,this.setValues(t);
}

function Gc(t){
lr.call(this),this.type="MeshPhongMaterial",this.color=new rr(16777215),this.specular=new rr(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rr(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Se,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Y,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t);
}

function Uc(t){
Gc.call(this),this.defines={
TOON:""},
this.type="MeshToonMaterial",this.gradientMap=null,this.setValues(t);
}

function Hc(t){
lr.call(this),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Se,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t);
}

function Vc(t){
lr.call(this),this.type="MeshLambertMaterial",this.color=new rr(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rr(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Y,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t);
}

function jc(t){
lr.call(this),this.defines={
MATCAP:""},
this.type="MeshMatcapMaterial",this.color=new rr(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Se,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.lights=!1,this.setValues(t);
}

function kc(t){
ts.call(this),this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t);
}
Ic.prototype=Object.create(lr.prototype),Ic.prototype.constructor=Ic,Ic.prototype.isShadowMaterial=!0,Ic.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.color.copy(t.color),this;
},zc.prototype=Object.create(li.prototype),zc.prototype.constructor=zc,zc.prototype.isRawShaderMaterial=!0,Bc.prototype=Object.create(lr.prototype),Bc.prototype.constructor=Bc,Bc.prototype.isMeshStandardMaterial=!0,Bc.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.defines={
STANDARD:""},
this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this;
},Fc.prototype=Object.create(Bc.prototype),Fc.prototype.constructor=Fc,Fc.prototype.isMeshPhysicalMaterial=!0,Fc.prototype.copy=function(t){
return Bc.prototype.copy.call(this,t),this.defines={
STANDARD:"",
PHYSICAL:""},
this.reflectivity=t.reflectivity,this.clearcoat=t.clearcoat,this.clearcoatRoughness=t.clearcoatRoughness,t.sheen?this.sheen=(this.sheen||new rr()).copy(t.sheen):this.sheen=null,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.transparency=t.transparency,this;
},Gc.prototype=Object.create(lr.prototype),Gc.prototype.constructor=Gc,Gc.prototype.isMeshPhongMaterial=!0,Gc.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this;
},Uc.prototype=Object.create(Gc.prototype),Uc.prototype.constructor=Uc,Uc.prototype.isMeshToonMaterial=!0,Uc.prototype.copy=function(t){
return Gc.prototype.copy.call(this,t),this.gradientMap=t.gradientMap,this;
},Hc.prototype=Object.create(lr.prototype),Hc.prototype.constructor=Hc,Hc.prototype.isMeshNormalMaterial=!0,Hc.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this;
},Vc.prototype=Object.create(lr.prototype),Vc.prototype.constructor=Vc,Vc.prototype.isMeshLambertMaterial=!0,Vc.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this;
},jc.prototype=Object.create(lr.prototype),jc.prototype.constructor=jc,jc.prototype.isMeshMatcapMaterial=!0,jc.prototype.copy=function(t){
return lr.prototype.copy.call(this,t),this.defines={
MATCAP:""},
this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this;
},kc.prototype=Object.create(ts.prototype),kc.prototype.constructor=kc,kc.prototype.isLineDashedMaterial=!0,kc.prototype.copy=function(t){
return ts.prototype.copy.call(this,t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this;
};
var Wc=Object.freeze({
ShadowMaterial:Ic,
SpriteMaterial:Co,
RawShaderMaterial:zc,
ShaderMaterial:li,
PointsMaterial:us,
MeshPhysicalMaterial:Fc,
MeshStandardMaterial:Bc,
MeshPhongMaterial:Gc,
MeshToonMaterial:Uc,
MeshNormalMaterial:Hc,
MeshLambertMaterial:Vc,
MeshDepthMaterial:lo,
MeshDistanceMaterial:ho,
MeshBasicMaterial:hr,
MeshMatcapMaterial:jc,
LineDashedMaterial:kc,
LineBasicMaterial:ts,
Material:lr}),

qc={
arraySlice:function arraySlice(t,e,n){
return qc.isTypedArray(t)?new t.constructor(t.subarray(e,void 0!==n?n:t.length)):t.slice(e,n);
},
convertArray:function convertArray(t,e,n){
return!t||!n&&t.constructor===e?t:"number"==typeof e.BYTES_PER_ELEMENT?new e(t):Array.prototype.slice.call(t);
},
isTypedArray:function isTypedArray(t){
return ArrayBuffer.isView(t)&&!(t instanceof DataView);
},
getKeyframeOrder:function getKeyframeOrder(t){
for(var e=t.length,n=new Array(e),r=0;r!==e;++r){n[r]=r;}
return n.sort(function(e,n){
return t[e]-t[n];
}),n;
},
sortedArray:function sortedArray(t,e,n){
for(var r=t.length,i=new t.constructor(r),a=0,o=0;o!==r;++a){
for(var s=n[a]*e,c=0;c!==e;++c){i[o++]=t[s+c];}}
return i;
},
flattenJSON:function flattenJSON(t,e,n,r){
for(var i=1,a=t[0];void 0!==a&&void 0===a[r];){a=t[i++];}
if(void 0!==a){
var o=a[r];
if(void 0!==o)
if(Array.isArray(o))
do{
void 0!==(o=a[r])&&(e.push(a.time),n.push.apply(n,o)),a=t[i++];
}while(void 0!==a);else
if(void 0!==o.toArray)
do{
void 0!==(o=a[r])&&(e.push(a.time),o.toArray(n,n.length)),a=t[i++];
}while(void 0!==a);else

do{
void 0!==(o=a[r])&&(e.push(a.time),n.push(o)),a=t[i++];
}while(void 0!==a);
}
}};


function Xc(t,e,n,r){
this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=void 0!==r?r:new e.constructor(n),this.sampleValues=e,this.valueSize=n;
}

function Yc(t,e,n,r){
Xc.call(this,t,e,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0;
}

function Jc(t,e,n,r){
Xc.call(this,t,e,n,r);
}

function Zc(t,e,n,r){
Xc.call(this,t,e,n,r);
}

function Qc(t,e,n,r){
if(void 0===t)throw new Error("THREE.KeyframeTrack: track name is undefined");
if(void 0===e||0===e.length)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);
this.name=t,this.times=qc.convertArray(e,this.TimeBufferType),this.values=qc.convertArray(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation);
}

function Kc(t,e,n){
Qc.call(this,t,e,n);
}

function $c(t,e,n,r){
Qc.call(this,t,e,n,r);
}

function tl(t,e,n,r){
Qc.call(this,t,e,n,r);
}

function el(t,e,n,r){
Xc.call(this,t,e,n,r);
}

function nl(t,e,n,r){
Qc.call(this,t,e,n,r);
}

function rl(t,e,n,r){
Qc.call(this,t,e,n,r);
}

function il(t,e,n,r){
Qc.call(this,t,e,n,r);
}

function al(t,e,n){
this.name=t,this.tracks=n,this.duration=void 0!==e?e:-1,this.uuid=Pe.generateUUID(),this.duration<0&&this.resetDuration();
}

function ol(t){
if(void 0===t.type)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
var e=function(t){
switch(t.toLowerCase()){
case"scalar":
case"double":
case"float":
case"number":
case"integer":
return tl;
case"vector":
case"vector2":
case"vector3":
case"vector4":
return il;
case"color":
return $c;
case"quaternion":
return nl;
case"bool":
case"boolean":
return Kc;
case"string":
return rl;}

throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t);
}(t.type);
if(void 0===t.times){
var n=[],
r=[];
qc.flattenJSON(t.keys,n,r,"value"),t.times=n,t.values=r;
}
return void 0!==e.parse?e.parse(t):new e(t.name,t.times,t.values,t.interpolation);
}
Object.assign(Xc.prototype,{
evaluate:function evaluate(t){
var e=this.parameterPositions,
n=this._cachedIndex,
r=e[n],
i=e[n-1];
t:{
e:{
var a;n:{
r:if(!(t<r)){
for(var o=n+2;;){
if(void 0===r){
if(t<i)break r;
return n=e.length,this._cachedIndex=n,this.afterEnd_(n-1,t,i);
}
if(n===o)break;
if(i=r,t<(r=e[++n]))break e;
}
a=e.length;
break n;
}if(t>=i)break t;
var s=e[1];
for(t<s&&(n=2,i=s),o=n-2;;){
if(void 0===i)return this._cachedIndex=0,this.beforeStart_(0,t,r);
if(n===o)break;
if(r=i,t>=(i=e[--n-1]))break e;
}
a=n,
n=0;
}
for(;n<a;){
var c=n+a>>>1;
t<e[c]?a=c:n=c+1;
}
if(r=e[n],void 0===(i=e[n-1]))return this._cachedIndex=0,this.beforeStart_(0,t,r);
if(void 0===r)return n=e.length,this._cachedIndex=n,this.afterEnd_(n-1,i,t);
}
this._cachedIndex=n,
this.intervalChanged_(n,i,r);
}
return this.interpolate_(n,i,t,r);
},
settings:null,
DefaultSettings_:{},
getSettings_:function getSettings_(){
return this.settings||this.DefaultSettings_;
},
copySampleValue_:function copySampleValue_(t){
for(var e=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=t*r,a=0;a!==r;++a){e[a]=n[i+a];}
return e;
},
interpolate_:function interpolate_(){
throw new Error("call to abstract method");
},
intervalChanged_:function intervalChanged_(){}}),
//!\ DECLARE ALIAS AFTER assign prototype !
Object.assign(Xc.prototype,{
beforeStart_:Xc.prototype.copySampleValue_,
afterEnd_:Xc.prototype.copySampleValue_}),
Yc.prototype=Object.assign(Object.create(Xc.prototype),{
constructor:Yc,
DefaultSettings_:{
endingStart:he,
endingEnd:he},

intervalChanged_:function intervalChanged_(t,e,n){
var r=this.parameterPositions,
i=t-2,
a=t+1,
o=r[i],
s=r[a];
if(void 0===o)switch(this.getSettings_().endingStart){
case 2401:
i=t,o=2*e-n;
break;
case 2402:
o=e+r[i=r.length-2]-r[i+1];
break;
default:
i=t,o=n;}

if(void 0===s)switch(this.getSettings_().endingEnd){
case 2401:
a=t,s=2*n-e;
break;
case 2402:
a=1,s=n+r[1]-r[0];
break;
default:
a=t-1,s=e;}

var c=.5*(n-e),
l=this.valueSize;
this._weightPrev=c/(e-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l;
},
interpolate_:function interpolate_(t,e,n,r){
for(var i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=t*o,c=s-o,l=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,p=this._weightNext,d=(n-e)/(r-e),f=d*d,m=f*d,v=-u*m+2*u*f-u*d,g=(1+u)*m+(-1.5-2*u)*f+(-.5+u)*d+1,y=(-1-p)*m+(1.5+p)*f+.5*d,x=p*m-p*f,b=0;b!==o;++b){i[b]=v*a[l+b]+g*a[c+b]+y*a[s+b]+x*a[h+b];}
return i;
}}),
Jc.prototype=Object.assign(Object.create(Xc.prototype),{
constructor:Jc,
interpolate_:function interpolate_(t,e,n,r){
for(var i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=t*o,c=s-o,l=(n-e)/(r-e),h=1-l,u=0;u!==o;++u){i[u]=a[c+u]*h+a[s+u]*l;}
return i;
}}),
Zc.prototype=Object.assign(Object.create(Xc.prototype),{
constructor:Zc,
interpolate_:function interpolate_(t){
return this.copySampleValue_(t-1);
}}),
Object.assign(Qc,{
toJSON:function toJSON(t){
var e,n=t.constructor;
if(void 0!==n.toJSON)e=n.toJSON(t);else
{
e={
name:t.name,
times:qc.convertArray(t.times,Array),
values:qc.convertArray(t.values,Array)};

var r=t.getInterpolation();
r!==t.DefaultInterpolation&&(e.interpolation=r);
}
return e.type=t.ValueTypeName,e;
}}),
Object.assign(Qc.prototype,{
constructor:Qc,
TimeBufferType:Float32Array,
ValueBufferType:Float32Array,
DefaultInterpolation:2301,
InterpolantFactoryMethodDiscrete:function InterpolantFactoryMethodDiscrete(t){
return new Zc(this.times,this.values,this.getValueSize(),t);
},
InterpolantFactoryMethodLinear:function InterpolantFactoryMethodLinear(t){
return new Jc(this.times,this.values,this.getValueSize(),t);
},
InterpolantFactoryMethodSmooth:function InterpolantFactoryMethodSmooth(t){
return new Yc(this.times,this.values,this.getValueSize(),t);
},
setInterpolation:function setInterpolation(t){
var e;
switch(t){
case 2300:
e=this.InterpolantFactoryMethodDiscrete;
break;
case 2301:
e=this.InterpolantFactoryMethodLinear;
break;
case 2302:
e=this.InterpolantFactoryMethodSmooth;}

if(void 0===e){
var n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;
if(void 0===this.createInterpolant){
if(t===this.DefaultInterpolation)throw new Error(n);
this.setInterpolation(this.DefaultInterpolation);
}
return console.warn("THREE.KeyframeTrack:",n),this;
}
return this.createInterpolant=e,this;
},
getInterpolation:function getInterpolation(){
switch(this.createInterpolant){
case this.InterpolantFactoryMethodDiscrete:
return 2300;
case this.InterpolantFactoryMethodLinear:
return 2301;
case this.InterpolantFactoryMethodSmooth:
return 2302;}

},
getValueSize:function getValueSize(){
return this.values.length/this.times.length;
},
shift:function shift(t){
if(0!==t)
for(var e=this.times,n=0,r=e.length;n!==r;++n){e[n]+=t;}
return this;
},
scale:function scale(t){
if(1!==t)
for(var e=this.times,n=0,r=e.length;n!==r;++n){e[n]*=t;}
return this;
},
trim:function trim(t,e){
for(var n=this.times,r=n.length,i=0,a=r-1;i!==r&&n[i]<t;){++i;}
for(;-1!==a&&n[a]>e;){--a;}
if(++a,0!==i||a!==r){
i>=a&&(i=(a=Math.max(a,1))-1);
var o=this.getValueSize();
this.times=qc.arraySlice(n,i,a),this.values=qc.arraySlice(this.values,i*o,a*o);
}
return this;
},
validate:function validate(){
var t=!0,
e=this.getValueSize();
e-Math.floor(e)!=0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);
var n=this.times,
r=this.values,
i=n.length;
0===i&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);
for(var a=null,o=0;o!==i;o++){
var s=n[o];
if("number"==typeof s&&isNaN(s)){
console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,s),t=!1;
break;
}
if(null!==a&&a>s){
console.error("THREE.KeyframeTrack: Out of order keys.",this,o,s,a),t=!1;
break;
}
a=s;
}
if(void 0!==r&&qc.isTypedArray(r)){
o=0;
for(var c=r.length;o!==c;++o){
var l=r[o];
if(isNaN(l)){
console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;
break;
}
}
}
return t;
},
optimize:function optimize(){
for(var t=this.times,e=this.values,n=this.getValueSize(),r=2302===this.getInterpolation(),i=1,a=t.length-1,o=1;o<a;++o){
var s=!1,
c=t[o];
if(c!==t[o+1]&&(1!==o||c!==c[0]))
if(r)s=!0;else

for(var l=o*n,h=l-n,u=l+n,p=0;p!==n;++p){
var d=e[l+p];
if(d!==e[h+p]||d!==e[u+p]){
s=!0;
break;
}
}
if(s){
if(o!==i){
t[i]=t[o];
var f=o*n,
m=i*n;
for(p=0;p!==n;++p){e[m+p]=e[f+p];}
}++i;
}
}
if(a>0){
for(t[i]=t[a],f=a*n,m=i*n,p=0;p!==n;++p){e[m+p]=e[f+p];}
++i;
}
return i!==t.length&&(this.times=qc.arraySlice(t,0,i),this.values=qc.arraySlice(e,0,i*n)),this;
},
clone:function clone(){
var t=qc.arraySlice(this.times,0),
e=qc.arraySlice(this.values,0),
n=new(0,this.constructor)(this.name,t,e);
return n.createInterpolant=this.createInterpolant,n;
}}),
Kc.prototype=Object.assign(Object.create(Qc.prototype),{
constructor:Kc,
ValueTypeName:"bool",
ValueBufferType:Array,
DefaultInterpolation:2300,
InterpolantFactoryMethodLinear:void 0,
InterpolantFactoryMethodSmooth:void 0}),
$c.prototype=Object.assign(Object.create(Qc.prototype),{
constructor:$c,
ValueTypeName:"color"}),
tl.prototype=Object.assign(Object.create(Qc.prototype),{
constructor:tl,
ValueTypeName:"number"}),
el.prototype=Object.assign(Object.create(Xc.prototype),{
constructor:el,
interpolate_:function interpolate_(t,e,n,r){
for(var i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=t*o,c=(n-e)/(r-e),l=s+o;s!==l;s+=4){Oe.slerpFlat(i,0,a,s-o,a,s,c);}
return i;
}}),
nl.prototype=Object.assign(Object.create(Qc.prototype),{
constructor:nl,
ValueTypeName:"quaternion",
DefaultInterpolation:2301,
InterpolantFactoryMethodLinear:function InterpolantFactoryMethodLinear(t){
return new el(this.times,this.values,this.getValueSize(),t);
},
InterpolantFactoryMethodSmooth:void 0}),
rl.prototype=Object.assign(Object.create(Qc.prototype),{
constructor:rl,
ValueTypeName:"string",
ValueBufferType:Array,
DefaultInterpolation:2300,
InterpolantFactoryMethodLinear:void 0,
InterpolantFactoryMethodSmooth:void 0}),
il.prototype=Object.assign(Object.create(Qc.prototype),{
constructor:il,
ValueTypeName:"vector"}),
Object.assign(al,{
parse:function parse(t){
for(var e=[],n=t.tracks,r=1/(t.fps||1),i=0,a=n.length;i!==a;++i){e.push(ol(n[i]).scale(r));}
return new al(t.name,t.duration,e);
},
toJSON:function toJSON(t){
for(var e=[],n=t.tracks,r={
name:t.name,
duration:t.duration,
tracks:e,
uuid:t.uuid},
i=0,a=n.length;i!==a;++i){e.push(Qc.toJSON(n[i]));}
return r;
},
CreateFromMorphTargetSequence:function CreateFromMorphTargetSequence(t,e,n,r){
for(var i=e.length,a=[],o=0;o<i;o++){
var s=[],
c=[];
s.push((o+i-1)%i,o,(o+1)%i),c.push(0,1,0);
var l=qc.getKeyframeOrder(s);
s=qc.sortedArray(s,1,l),c=qc.sortedArray(c,1,l),r||0!==s[0]||(s.push(i),c.push(c[0])),a.push(new tl(".morphTargetInfluences["+e[o].name+"]",s,c).scale(1/n));
}
return new al(t,-1,a);
},
findByName:function findByName(t,e){
var n=t;
if(!Array.isArray(t)){
var r=t;
n=r.geometry&&r.geometry.animations||r.animations;
}
for(var i=0;i<n.length;i++){
if(n[i].name===e)return n[i];}
return null;
},
CreateClipsFromMorphTargetSequences:function CreateClipsFromMorphTargetSequences(t,e,n){
for(var r={},i=/^([\w-]*?)([\d]+)$/,a=0,o=t.length;a<o;a++){
var s=t[a],
c=s.name.match(i);
if(c&&c.length>1){
var l=r[u=c[1]];
l||(r[u]=l=[]),l.push(s);
}
}
var h=[];
for(var u in r){h.push(al.CreateFromMorphTargetSequence(u,r[u],e,n));}
return h;
},
parseAnimation:function parseAnimation(t,e){
if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;
for(var n=function n(t,e,_n2,r,i){
if(0!==_n2.length){
var a=[],
o=[];
qc.flattenJSON(_n2,a,o,r),0!==a.length&&i.push(new t(e,a,o));
}
},r=[],i=t.name||"default",a=t.length||-1,o=t.fps||30,s=t.hierarchy||[],c=0;c<s.length;c++){
var l=s[c].keys;
if(l&&0!==l.length)
if(l[0].morphTargets){
for(var h={},u=0;u<l.length;u++){
if(l[u].morphTargets)
for(var p=0;p<l[u].morphTargets.length;p++){h[l[u].morphTargets[p]]=-1;}}
for(var d in h){
var f=[],
m=[];
for(p=0;p!==l[u].morphTargets.length;++p){
var v=l[u];
f.push(v.time),m.push(v.morphTarget===d?1:0);
}
r.push(new tl(".morphTargetInfluence["+d+"]",f,m));
}
a=h.length*(o||1);
}else{
var g=".bones["+e[c].name+"]";
n(il,g+".position",l,"pos",r),n(nl,g+".quaternion",l,"rot",r),n(il,g+".scale",l,"scl",r);
}
}
return 0===r.length?null:new al(i,a,r);
}}),
Object.assign(al.prototype,{
resetDuration:function resetDuration(){
for(var t=0,e=0,n=this.tracks.length;e!==n;++e){
var r=this.tracks[e];
t=Math.max(t,r.times[r.times.length-1]);
}
return this.duration=t,this;
},
trim:function trim(){
for(var t=0;t<this.tracks.length;t++){this.tracks[t].trim(0,this.duration);}
return this;
},
validate:function validate(){
for(var t=!0,e=0;e<this.tracks.length;e++){t=t&&this.tracks[e].validate();}
return t;
},
optimize:function optimize(){
for(var t=0;t<this.tracks.length;t++){this.tracks[t].optimize();}
return this;
},
clone:function clone(){
for(var t=[],e=0;e<this.tracks.length;e++){t.push(this.tracks[e].clone());}
return new al(this.name,this.duration,t);
}});

var sl={
enabled:!1,
files:{},
add:function add(t,e){
!1!==this.enabled&&(this.files[t]=e);
},
get:function get(t){
if(!1!==this.enabled)return this.files[t];
},
remove:function remove(t){
delete this.files[t];
},
clear:function clear(){
this.files={};
}};


function cl(t,e,n){
var r=this,
i=!1,
a=0,
o=0,
s=void 0;
this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(t){
o++,!1===i&&void 0!==r.onStart&&r.onStart(t,a,o),i=!0;
},this.itemEnd=function(t){
a++,void 0!==r.onProgress&&r.onProgress(t,a,o),a===o&&(i=!1,void 0!==r.onLoad&&r.onLoad());
},this.itemError=function(t){
void 0!==r.onError&&r.onError(t);
},this.resolveURL=function(t){
return s?s(t):t;
},this.setURLModifier=function(t){
return s=t,this;
};
}
var ll=new cl();

function hl(t){
this.manager=void 0!==t?t:ll,this.crossOrigin="anonymous",this.path="",this.resourcePath="";
}
Object.assign(hl.prototype,{
load:function load(){},
parse:function parse(){},
setCrossOrigin:function setCrossOrigin(t){
return this.crossOrigin=t,this;
},
setPath:function setPath(t){
return this.path=t,this;
},
setResourcePath:function setResourcePath(t){
return this.resourcePath=t,this;
}}),
hl.Handlers={
handlers:[],
add:function add(t,e){
this.handlers.push(t,e);
},
get:function get(t){
for(var e=this.handlers,n=0,r=e.length;n<r;n+=2){
var i=e[n],
a=e[n+1];
if(i.test(t))return a;
}
return null;
}};

var ul={};

function pl(t){
hl.call(this,t);
}

function dl(t){
hl.call(this,t);
}

function fl(t){
hl.call(this,t),this._parser=null;
}

function ml(t){
hl.call(this,t),this._parser=null;
}

function vl(t){
hl.call(this,t);
}

function gl(t){
hl.call(this,t);
}

function yl(t){
hl.call(this,t);
}

function xl(){
this.type="Curve",this.arcLengthDivisions=200;
}

function bl(t,e,n,r,i,a,o,s){
xl.call(this),this.type="EllipseCurve",this.aX=t||0,this.aY=e||0,this.xRadius=n||1,this.yRadius=r||1,this.aStartAngle=i||0,this.aEndAngle=a||2*Math.PI,this.aClockwise=o||!1,this.aRotation=s||0;
}

function wl(t,e,n,r,i,a){
bl.call(this,t,e,n,n,r,i,a),this.type="ArcCurve";
}

function _l(){
var t=0,
e=0,
n=0,
r=0;

function i(i,a,o,s){
t=i,e=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s;
}
return{
initCatmullRom:function initCatmullRom(t,e,n,r,a){
i(e,n,a*(n-t),a*(r-e));
},
initNonuniformCatmullRom:function initNonuniformCatmullRom(t,e,n,r,a,o,s){
var c=(e-t)/a-(n-t)/(a+o)+(n-e)/o,
l=(n-e)/o-(r-e)/(o+s)+(r-n)/s;
i(e,n,c*=o,l*=o);
},
calc:function calc(i){
var a=i*i;
return t+e*i+n*a+r*(a*i);
}};

}
pl.prototype=Object.assign(Object.create(hl.prototype),{
constructor:pl,
load:function load(t,e,n,r){
void 0===t&&(t=""),void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t);
var i=this,
a=sl.get(t);
if(void 0!==a)return i.manager.itemStart(t),setTimeout(function(){
e&&e(a),i.manager.itemEnd(t);
},0),a;
if(void 0===ul[t]){
var o=t.match(/^data:(.*?)(;base64)?,(.*)$/);
if(o){
var c=o[1],
l=!!o[2],
h=o[3];
h=decodeURIComponent(h),l&&(h=atob(h));
try{
var u,p=(this.responseType||"").toLowerCase();
switch(p){
case"arraybuffer":
case"blob":
for(var d=new Uint8Array(h.length),f=0;f<h.length;f++){d[f]=h.charCodeAt(f);}
u="blob"===p?new Blob([d.buffer],{
type:c}):
d.buffer;
break;
case"document":
var m=new DOMParser();
u=m.parseFromString(h,c);
break;
case"json":
u=JSON.parse(h);
break;
default:
u=h;}

setTimeout(function(){
e&&e(u),i.manager.itemEnd(t);
},0);
}catch(e){
setTimeout(function(){
r&&r(e),i.manager.itemError(t),i.manager.itemEnd(t);
},0);
}
}else{
ul[t]=[],ul[t].push({
onLoad:e,
onProgress:n,
onError:r});

var v=new s();
for(var g in v.open("GET",t,!0),v.addEventListener("load",function(e){
var n=this.response;
sl.add(t,n);
var r=ul[t];
if(delete ul[t],200===this.status||0===this.status){
0===this.status&&console.warn("THREE.FileLoader: HTTP Status 0 received.");
for(var a=0,o=r.length;a<o;a++){(s=r[a]).onLoad&&s.onLoad(n);}
i.manager.itemEnd(t);
}else{
for(a=0,o=r.length;a<o;a++){
var s;
(s=r[a]).onError&&s.onError(e);
}
i.manager.itemError(t),i.manager.itemEnd(t);
}
},!1),v.addEventListener("progress",function(e){
for(var n=ul[t],r=0,i=n.length;r<i;r++){
var a=n[r];
a.onProgress&&a.onProgress(e);
}
},!1),v.addEventListener("error",function(e){
var n=ul[t];
delete ul[t];
for(var r=0,a=n.length;r<a;r++){
var o=n[r];
o.onError&&o.onError(e);
}
i.manager.itemError(t),i.manager.itemEnd(t);
},!1),v.addEventListener("abort",function(e){
var n=ul[t];
delete ul[t];
for(var r=0,a=n.length;r<a;r++){
var o=n[r];
o.onError&&o.onError(e);
}
i.manager.itemError(t),i.manager.itemEnd(t);
},!1),void 0!==this.responseType&&(v.responseType=this.responseType),void 0!==this.withCredentials&&(v.withCredentials=this.withCredentials),v.overrideMimeType&&v.overrideMimeType(void 0!==this.mimeType?this.mimeType:"text/plain"),this.requestHeader){v.setRequestHeader(g,this.requestHeader[g]);}
v.send(null);
}
return i.manager.itemStart(t),v;
}
ul[t].push({
onLoad:e,
onProgress:n,
onError:r});

},
setResponseType:function setResponseType(t){
return this.responseType=t,this;
},
setWithCredentials:function setWithCredentials(t){
return this.withCredentials=t,this;
},
setMimeType:function setMimeType(t){
return this.mimeType=t,this;
},
setRequestHeader:function setRequestHeader(t){
return this.requestHeader=t,this;
}}),
dl.prototype=Object.assign(Object.create(hl.prototype),{
constructor:dl,
load:function load(t,e,n,r){
var i=this,
a=new pl(i.manager);
a.setPath(i.path),a.load(t,function(t){
e(i.parse(JSON.parse(t)));
},n,r);
},
parse:function parse(t){
for(var e=[],n=0;n<t.length;n++){
var r=al.parse(t[n]);
e.push(r);
}
return e;
}}),
fl.prototype=Object.assign(Object.create(hl.prototype),{
constructor:fl,
load:function load(t,e,n,r){
var i=this,
a=[],
o=new xs();
o.image=a;
var s=new pl(this.manager);

function c(c){
s.load(t[c],function(t){
var n=i._parser(t,!0);
a[c]={
width:n.width,
height:n.height,
format:n.format,
mipmaps:n.mipmaps},
6===(l+=1)&&(1===n.mipmapCount&&(o.minFilter=vt),o.format=n.format,o.needsUpdate=!0,e&&e(o));
},n,r);
}
if(s.setPath(this.path),s.setResponseType("arraybuffer"),Array.isArray(t))
for(var l=0,h=0,u=t.length;h<u;++h){c(h);}else
s.load(t,function(t){
var n=i._parser(t,!0);
if(n.isCubemap)
for(var r=n.mipmaps.length/n.mipmapCount,s=0;s<r;s++){
a[s]={
mipmaps:[]};

for(var c=0;c<n.mipmapCount;c++){a[s].mipmaps.push(n.mipmaps[s*n.mipmapCount+c]),a[s].format=n.format,a[s].width=n.width,a[s].height=n.height;}
}else o.image.width=n.width,o.image.height=n.height,o.mipmaps=n.mipmaps;
1===n.mipmapCount&&(o.minFilter=vt),o.format=n.format,o.needsUpdate=!0,e&&e(o);
},n,r);
return o;
}}),
ml.prototype=Object.assign(Object.create(hl.prototype),{
constructor:ml,
load:function load(t,e,n,r){
var i=this,
a=new vi(),
o=new pl(this.manager);
return o.setResponseType("arraybuffer"),o.setPath(this.path),o.load(t,function(t){
var n=i._parser(t);
n&&(void 0!==n.image?a.image=n.image:void 0!==n.data&&(a.image.width=n.width,a.image.height=n.height,a.image.data=n.data),a.wrapS=void 0!==n.wrapS?n.wrapS:ut,a.wrapT=void 0!==n.wrapT?n.wrapT:ut,a.magFilter=void 0!==n.magFilter?n.magFilter:vt,a.minFilter=void 0!==n.minFilter?n.minFilter:yt,a.anisotropy=void 0!==n.anisotropy?n.anisotropy:1,void 0!==n.format&&(a.format=n.format),void 0!==n.type&&(a.type=n.type),void 0!==n.mipmaps&&(a.mipmaps=n.mipmaps),1===n.mipmapCount&&(a.minFilter=vt),a.needsUpdate=!0,e&&e(a,n));
},n,r),a;
}}),
vl.prototype=Object.assign(Object.create(hl.prototype),{
constructor:vl,
load:function load(t,e,n,r){
void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t);
var i=this,
o=sl.get(t);
if(void 0!==o)return i.manager.itemStart(t),setTimeout(function(){
e&&e(o),i.manager.itemEnd(t);
},0),o;
var s=a.createElementNS("http://www.w3.org/1999/xhtml","img");

function c(){
s.removeEventListener("load",c,!1),s.removeEventListener("error",l,!1),sl.add(t,this),e&&e(this),i.manager.itemEnd(t);
}

function l(e){
s.removeEventListener("load",c,!1),s.removeEventListener("error",l,!1),r&&r(e),i.manager.itemError(t),i.manager.itemEnd(t);
}
return s.addEventListener("load",c,!1),s.addEventListener("error",l,!1),"data:"!==t.substr(0,5)&&void 0!==this.crossOrigin&&(s.crossOrigin=this.crossOrigin),i.manager.itemStart(t),s.src=t,s;
}}),
gl.prototype=Object.assign(Object.create(hl.prototype),{
constructor:gl,
load:function load(t,e,n,r){
var i=new Vi(),
a=new vl(this.manager);
a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);
var o=0;

function s(n){
a.load(t[n],function(t){
i.images[n]=t,6==++o&&(i.needsUpdate=!0,e&&e(i));
},void 0,r);
}
for(var c=0;c<t.length;++c){s(c);}
return i;
}}),
yl.prototype=Object.assign(Object.create(hl.prototype),{
constructor:yl,
load:function load(t,e,n,r){
var i=new He(),
a=new vl(this.manager);
return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(n){
i.image=n;
var r=t.search(/\.jpe?g($|\?)/i)>0||0===t.search(/^data\:image\/jpeg/);
i.format=r?Ot:Dt,i.needsUpdate=!0,void 0!==e&&e(i);
},n,r),i;
}}),
Object.assign(xl.prototype,{
getPoint:function getPoint(){
return console.warn("THREE.Curve: .getPoint() not implemented."),null;
},
getPointAt:function getPointAt(t,e){
var n=this.getUtoTmapping(t);
return this.getPoint(n,e);
},
getPoints:function getPoints(t){
void 0===t&&(t=5);
for(var e=[],n=0;n<=t;n++){e.push(this.getPoint(n/t));}
return e;
},
getSpacedPoints:function getSpacedPoints(t){
void 0===t&&(t=5);
for(var e=[],n=0;n<=t;n++){e.push(this.getPointAt(n/t));}
return e;
},
getLength:function getLength(){
var t=this.getLengths();
return t[t.length-1];
},
getLengths:function getLengths(t){
if(void 0===t&&(t=this.arcLengthDivisions),this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;
this.needsUpdate=!1;
var e,n,r=[],
i=this.getPoint(0),
a=0;
for(r.push(0),n=1;n<=t;n++){a+=(e=this.getPoint(n/t)).distanceTo(i),r.push(a),i=e;}
return this.cacheArcLengths=r,r;
},
updateArcLengths:function updateArcLengths(){
this.needsUpdate=!0,this.getLengths();
},
getUtoTmapping:function getUtoTmapping(t,e){
var n,r=this.getLengths(),
i=0,
a=r.length;
n=e||t*r[a-1];
for(var o,s=0,c=a-1;s<=c;){
if((o=r[i=Math.floor(s+(c-s)/2)]-n)<0)s=i+1;else
{
if(!(o>0)){
c=i;
break;
}
c=i-1;
}}
if(r[i=c]===n)return i/(a-1);
var l=r[i];
return(i+(n-l)/(r[i+1]-l))/(a-1);
},
getTangent:function getTangent(t){
var e=t-1e-4,
n=t+1e-4;
e<0&&(e=0),n>1&&(n=1);
var r=this.getPoint(e);
return this.getPoint(n).clone().sub(r).normalize();
},
getTangentAt:function getTangentAt(t){
var e=this.getUtoTmapping(t);
return this.getTangent(e);
},
computeFrenetFrames:function computeFrenetFrames(t,e){
var n,r,i,a=new Ie(),
o=[],
s=[],
c=[],
l=new Ie(),
h=new Ke();
for(n=0;n<=t;n++){r=n/t,o[n]=this.getTangentAt(r),o[n].normalize();}
s[0]=new Ie(),c[0]=new Ie();
var u=Number.MAX_VALUE,
p=Math.abs(o[0].x),
d=Math.abs(o[0].y),
f=Math.abs(o[0].z);
for(p<=u&&(u=p,a.set(1,0,0)),d<=u&&(u=d,a.set(0,1,0)),f<=u&&a.set(0,0,1),l.crossVectors(o[0],a).normalize(),s[0].crossVectors(o[0],l),c[0].crossVectors(o[0],s[0]),n=1;n<=t;n++){s[n]=s[n-1].clone(),c[n]=c[n-1].clone(),l.crossVectors(o[n-1],o[n]),l.length()>Number.EPSILON&&(l.normalize(),i=Math.acos(Pe.clamp(o[n-1].dot(o[n]),-1,1)),s[n].applyMatrix4(h.makeRotationAxis(l,i))),c[n].crossVectors(o[n],s[n]);}
if(!0===e)
for(i=Math.acos(Pe.clamp(s[0].dot(s[t]),-1,1)),i/=t,o[0].dot(l.crossVectors(s[0],s[t]))>0&&(i=-i),n=1;n<=t;n++){s[n].applyMatrix4(h.makeRotationAxis(o[n],i*n)),c[n].crossVectors(o[n],s[n]);}
return{
tangents:o,
normals:s,
binormals:c};

},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
return this.arcLengthDivisions=t.arcLengthDivisions,this;
},
toJSON:function toJSON(){
var t={
metadata:{
version:4.5,
type:"Curve",
generator:"Curve.toJSON"}};


return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t;
},
fromJSON:function fromJSON(t){
return this.arcLengthDivisions=t.arcLengthDivisions,this;
}}),
bl.prototype=Object.create(xl.prototype),bl.prototype.constructor=bl,bl.prototype.isEllipseCurve=!0,bl.prototype.getPoint=function(t,e){
for(var n=e||new Ce(),r=2*Math.PI,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<Number.EPSILON;i<0;){i+=r;}
for(;i>r;){i-=r;}
i<Number.EPSILON&&(i=a?0:r),!0!==this.aClockwise||a||(i===r?i=-r:i-=r);
var o=this.aStartAngle+t*i,
s=this.aX+this.xRadius*Math.cos(o),
c=this.aY+this.yRadius*Math.sin(o);
if(0!==this.aRotation){
var l=Math.cos(this.aRotation),
h=Math.sin(this.aRotation),
u=s-this.aX,
p=c-this.aY;
s=u*l-p*h+this.aX,c=u*h+p*l+this.aY;
}
return n.set(s,c);
},bl.prototype.copy=function(t){
return xl.prototype.copy.call(this,t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this;
},bl.prototype.toJSON=function(){
var t=xl.prototype.toJSON.call(this);
return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t;
},bl.prototype.fromJSON=function(t){
return xl.prototype.fromJSON.call(this,t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this;
},wl.prototype=Object.create(bl.prototype),wl.prototype.constructor=wl,wl.prototype.isArcCurve=!0;
var Ml=new Ie(),
Sl=new _l(),
Tl=new _l(),
El=new _l();

function Al(t,e,n,r){
xl.call(this),this.type="CatmullRomCurve3",this.points=t||[],this.closed=e||!1,this.curveType=n||"centripetal",this.tension=r||.5;
}

function Ll(t,e,n,r,i){
var a=.5*(r-e),
o=.5*(i-n),
s=t*t;
return(2*n-2*r+a+o)*(t*s)+(-3*n+3*r-2*a-o)*s+a*t+n;
}

function Rl(t,e,n,r){
return function(t,e){
var n=1-t;
return n*n*e;
}(t,e)+function(t,e){
return 2*(1-t)*t*e;
}(t,n)+function(t,e){
return t*t*e;
}(t,r);
}

function Pl(t,e,n,r,i){
return function(t,e){
var n=1-t;
return n*n*n*e;
}(t,e)+function(t,e){
var n=1-t;
return 3*n*n*t*e;
}(t,n)+function(t,e){
return 3*(1-t)*t*t*e;
}(t,r)+function(t,e){
return t*t*t*e;
}(t,i);
}

function Cl(t,e,n,r){
xl.call(this),this.type="CubicBezierCurve",this.v0=t||new Ce(),this.v1=e||new Ce(),this.v2=n||new Ce(),this.v3=r||new Ce();
}

function Ol(t,e,n,r){
xl.call(this),this.type="CubicBezierCurve3",this.v0=t||new Ie(),this.v1=e||new Ie(),this.v2=n||new Ie(),this.v3=r||new Ie();
}

function Dl(t,e){
xl.call(this),this.type="LineCurve",this.v1=t||new Ce(),this.v2=e||new Ce();
}

function Nl(t,e){
xl.call(this),this.type="LineCurve3",this.v1=t||new Ie(),this.v2=e||new Ie();
}

function Il(t,e,n){
xl.call(this),this.type="QuadraticBezierCurve",this.v0=t||new Ce(),this.v1=e||new Ce(),this.v2=n||new Ce();
}

function zl(t,e,n){
xl.call(this),this.type="QuadraticBezierCurve3",this.v0=t||new Ie(),this.v1=e||new Ie(),this.v2=n||new Ie();
}

function Bl(t){
xl.call(this),this.type="SplineCurve",this.points=t||[];
}
Al.prototype=Object.create(xl.prototype),Al.prototype.constructor=Al,Al.prototype.isCatmullRomCurve3=!0,Al.prototype.getPoint=function(t,e){
var n,r,i,a,o=e||new Ie(),
s=this.points,
c=s.length,
l=(c-(this.closed?0:1))*t,
h=Math.floor(l),
u=l-h;
if(this.closed?h+=h>0?0:(Math.floor(Math.abs(h)/c)+1)*c:0===u&&h===c-1&&(h=c-2,u=1),this.closed||h>0?n=s[(h-1)%c]:(Ml.subVectors(s[0],s[1]).add(s[0]),n=Ml),r=s[h%c],i=s[(h+1)%c],this.closed||h+2<c?a=s[(h+2)%c]:(Ml.subVectors(s[c-1],s[c-2]).add(s[c-1]),a=Ml),"centripetal"===this.curveType||"chordal"===this.curveType){
var p="chordal"===this.curveType?.5:.25,
d=Math.pow(n.distanceToSquared(r),p),
f=Math.pow(r.distanceToSquared(i),p),
m=Math.pow(i.distanceToSquared(a),p);
f<1e-4&&(f=1),d<1e-4&&(d=f),m<1e-4&&(m=f),Sl.initNonuniformCatmullRom(n.x,r.x,i.x,a.x,d,f,m),Tl.initNonuniformCatmullRom(n.y,r.y,i.y,a.y,d,f,m),El.initNonuniformCatmullRom(n.z,r.z,i.z,a.z,d,f,m);
}else"catmullrom"===this.curveType&&(Sl.initCatmullRom(n.x,r.x,i.x,a.x,this.tension),Tl.initCatmullRom(n.y,r.y,i.y,a.y,this.tension),El.initCatmullRom(n.z,r.z,i.z,a.z,this.tension));
return o.set(Sl.calc(u),Tl.calc(u),El.calc(u)),o;
},Al.prototype.copy=function(t){
xl.prototype.copy.call(this,t),this.points=[];
for(var e=0,n=t.points.length;e<n;e++){
var r=t.points[e];
this.points.push(r.clone());
}
return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this;
},Al.prototype.toJSON=function(){
var t=xl.prototype.toJSON.call(this);
t.points=[];
for(var e=0,n=this.points.length;e<n;e++){
var r=this.points[e];
t.points.push(r.toArray());
}
return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t;
},Al.prototype.fromJSON=function(t){
xl.prototype.fromJSON.call(this,t),this.points=[];
for(var e=0,n=t.points.length;e<n;e++){
var r=t.points[e];
this.points.push(new Ie().fromArray(r));
}
return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this;
},Cl.prototype=Object.create(xl.prototype),Cl.prototype.constructor=Cl,Cl.prototype.isCubicBezierCurve=!0,Cl.prototype.getPoint=function(t,e){
var n=e||new Ce(),
r=this.v0,
i=this.v1,
a=this.v2,
o=this.v3;
return n.set(Pl(t,r.x,i.x,a.x,o.x),Pl(t,r.y,i.y,a.y,o.y)),n;
},Cl.prototype.copy=function(t){
return xl.prototype.copy.call(this,t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this;
},Cl.prototype.toJSON=function(){
var t=xl.prototype.toJSON.call(this);
return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t;
},Cl.prototype.fromJSON=function(t){
return xl.prototype.fromJSON.call(this,t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this;
},Ol.prototype=Object.create(xl.prototype),Ol.prototype.constructor=Ol,Ol.prototype.isCubicBezierCurve3=!0,Ol.prototype.getPoint=function(t,e){
var n=e||new Ie(),
r=this.v0,
i=this.v1,
a=this.v2,
o=this.v3;
return n.set(Pl(t,r.x,i.x,a.x,o.x),Pl(t,r.y,i.y,a.y,o.y),Pl(t,r.z,i.z,a.z,o.z)),n;
},Ol.prototype.copy=function(t){
return xl.prototype.copy.call(this,t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this;
},Ol.prototype.toJSON=function(){
var t=xl.prototype.toJSON.call(this);
return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t;
},Ol.prototype.fromJSON=function(t){
return xl.prototype.fromJSON.call(this,t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this;
},Dl.prototype=Object.create(xl.prototype),Dl.prototype.constructor=Dl,Dl.prototype.isLineCurve=!0,Dl.prototype.getPoint=function(t,e){
var n=e||new Ce();
return 1===t?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n;
},Dl.prototype.getPointAt=function(t,e){
return this.getPoint(t,e);
},Dl.prototype.getTangent=function(){
return this.v2.clone().sub(this.v1).normalize();
},Dl.prototype.copy=function(t){
return xl.prototype.copy.call(this,t),this.v1.copy(t.v1),this.v2.copy(t.v2),this;
},Dl.prototype.toJSON=function(){
var t=xl.prototype.toJSON.call(this);
return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t;
},Dl.prototype.fromJSON=function(t){
return xl.prototype.fromJSON.call(this,t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this;
},Nl.prototype=Object.create(xl.prototype),Nl.prototype.constructor=Nl,Nl.prototype.isLineCurve3=!0,Nl.prototype.getPoint=function(t,e){
var n=e||new Ie();
return 1===t?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n;
},Nl.prototype.getPointAt=function(t,e){
return this.getPoint(t,e);
},Nl.prototype.copy=function(t){
return xl.prototype.copy.call(this,t),this.v1.copy(t.v1),this.v2.copy(t.v2),this;
},Nl.prototype.toJSON=function(){
var t=xl.prototype.toJSON.call(this);
return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t;
},Nl.prototype.fromJSON=function(t){
return xl.prototype.fromJSON.call(this,t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this;
},Il.prototype=Object.create(xl.prototype),Il.prototype.constructor=Il,Il.prototype.isQuadraticBezierCurve=!0,Il.prototype.getPoint=function(t,e){
var n=e||new Ce(),
r=this.v0,
i=this.v1,
a=this.v2;
return n.set(Rl(t,r.x,i.x,a.x),Rl(t,r.y,i.y,a.y)),n;
},Il.prototype.copy=function(t){
return xl.prototype.copy.call(this,t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this;
},Il.prototype.toJSON=function(){
var t=xl.prototype.toJSON.call(this);
return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t;
},Il.prototype.fromJSON=function(t){
return xl.prototype.fromJSON.call(this,t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this;
},zl.prototype=Object.create(xl.prototype),zl.prototype.constructor=zl,zl.prototype.isQuadraticBezierCurve3=!0,zl.prototype.getPoint=function(t,e){
var n=e||new Ie(),
r=this.v0,
i=this.v1,
a=this.v2;
return n.set(Rl(t,r.x,i.x,a.x),Rl(t,r.y,i.y,a.y),Rl(t,r.z,i.z,a.z)),n;
},zl.prototype.copy=function(t){
return xl.prototype.copy.call(this,t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this;
},zl.prototype.toJSON=function(){
var t=xl.prototype.toJSON.call(this);
return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t;
},zl.prototype.fromJSON=function(t){
return xl.prototype.fromJSON.call(this,t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this;
},Bl.prototype=Object.create(xl.prototype),Bl.prototype.constructor=Bl,Bl.prototype.isSplineCurve=!0,Bl.prototype.getPoint=function(t,e){
var n=e||new Ce(),
r=this.points,
i=(r.length-1)*t,
a=Math.floor(i),
o=i-a,
s=r[0===a?a:a-1],
c=r[a],
l=r[a>r.length-2?r.length-1:a+1],
h=r[a>r.length-3?r.length-1:a+2];
return n.set(Ll(o,s.x,c.x,l.x,h.x),Ll(o,s.y,c.y,l.y,h.y)),n;
},Bl.prototype.copy=function(t){
xl.prototype.copy.call(this,t),this.points=[];
for(var e=0,n=t.points.length;e<n;e++){
var r=t.points[e];
this.points.push(r.clone());
}
return this;
},Bl.prototype.toJSON=function(){
var t=xl.prototype.toJSON.call(this);
t.points=[];
for(var e=0,n=this.points.length;e<n;e++){
var r=this.points[e];
t.points.push(r.toArray());
}
return t;
},Bl.prototype.fromJSON=function(t){
xl.prototype.fromJSON.call(this,t),this.points=[];
for(var e=0,n=t.points.length;e<n;e++){
var r=t.points[e];
this.points.push(new Ce().fromArray(r));
}
return this;
};
var Fl=Object.freeze({
ArcCurve:wl,
CatmullRomCurve3:Al,
CubicBezierCurve:Cl,
CubicBezierCurve3:Ol,
EllipseCurve:bl,
LineCurve:Dl,
LineCurve3:Nl,
QuadraticBezierCurve:Il,
QuadraticBezierCurve3:zl,
SplineCurve:Bl});


function Gl(){
xl.call(this),this.type="CurvePath",this.curves=[],this.autoClose=!1;
}

function Ul(t){
Gl.call(this),this.type="Path",this.currentPoint=new Ce(),t&&this.setFromPoints(t);
}

function Hl(t){
Ul.call(this,t),this.uuid=Pe.generateUUID(),this.type="Shape",this.holes=[];
}

function Vl(t,e){
gn.call(this),this.type="Light",this.color=new rr(t),this.intensity=void 0!==e?e:1,this.receiveShadow=void 0;
}

function jl(t,e,n){
Vl.call(this,t,n),this.type="HemisphereLight",this.castShadow=void 0,this.position.copy(gn.DefaultUp),this.updateMatrix(),this.groundColor=new rr(e);
}

function kl(t){
this.camera=t,this.bias=0,this.radius=1,this.mapSize=new Ce(512,512),this.map=null,this.mapPass=null,this.matrix=new Ke(),this._frustum=new Mi(),this._frameExtents=new Ce(1,1),this._viewportCount=1,this._viewports=[new Ve(0,0,1,1)];
}

function Wl(){
kl.call(this,new ui(50,1,.5,500));
}

function ql(t,e,n,r,i,a){
Vl.call(this,t,e),this.type="SpotLight",this.position.copy(gn.DefaultUp),this.updateMatrix(),this.target=new gn(),Object.defineProperty(this,"power",{
get:function get(){
return this.intensity*Math.PI;
},
set:function set(t){
this.intensity=t/Math.PI;
}}),
this.distance=void 0!==n?n:0,this.angle=void 0!==r?r:Math.PI/3,this.penumbra=void 0!==i?i:0,this.decay=void 0!==a?a:1,this.shadow=new Wl();
}

function Xl(){
kl.call(this,new ui(90,1,.5,500)),this._frameExtents=new Ce(4,2),this._viewportCount=6,this._viewports=[new Ve(2,1,1,1),new Ve(0,1,1,1),new Ve(3,1,1,1),new Ve(1,1,1,1),new Ve(3,0,1,1),new Ve(1,0,1,1)],this._cubeDirections=[new Ie(1,0,0),new Ie(-1,0,0),new Ie(0,0,1),new Ie(0,0,-1),new Ie(0,1,0),new Ie(0,-1,0)],this._cubeUps=[new Ie(0,1,0),new Ie(0,1,0),new Ie(0,1,0),new Ie(0,1,0),new Ie(0,0,1),new Ie(0,0,-1)];
}

function Yl(t,e,n,r){
Vl.call(this,t,e),this.type="PointLight",Object.defineProperty(this,"power",{
get:function get(){
return 4*this.intensity*Math.PI;
},
set:function set(t){
this.intensity=t/(4*Math.PI);
}}),
this.distance=void 0!==n?n:0,this.decay=void 0!==r?r:1,this.shadow=new Xl();
}

function Jl(t,e,n,r,i,a){
hi.call(this),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=void 0!==t?t:-1,this.right=void 0!==e?e:1,this.top=void 0!==n?n:1,this.bottom=void 0!==r?r:-1,this.near=void 0!==i?i:.1,this.far=void 0!==a?a:2e3,this.updateProjectionMatrix();
}

function Zl(){
kl.call(this,new Jl(-5,5,5,-5,.5,500));
}

function Ql(t,e){
Vl.call(this,t,e),this.type="DirectionalLight",this.position.copy(gn.DefaultUp),this.updateMatrix(),this.target=new gn(),this.shadow=new Zl();
}

function Kl(t,e){
Vl.call(this,t,e),this.type="AmbientLight",this.castShadow=void 0;
}

function $l(t,e,n,r){
Vl.call(this,t,e),this.type="RectAreaLight",this.width=void 0!==n?n:10,this.height=void 0!==r?r:10;
}

function th(t){
hl.call(this,t),this.textures={};
}
Gl.prototype=Object.assign(Object.create(xl.prototype),{
constructor:Gl,
add:function add(t){
this.curves.push(t);
},
closePath:function closePath(){
var t=this.curves[0].getPoint(0),
e=this.curves[this.curves.length-1].getPoint(1);
t.equals(e)||this.curves.push(new Dl(e,t));
},
getPoint:function getPoint(t){
for(var e=t*this.getLength(),n=this.getCurveLengths(),r=0;r<n.length;){
if(n[r]>=e){
var i=n[r]-e,
a=this.curves[r],
o=a.getLength(),
s=0===o?0:1-i/o;
return a.getPointAt(s);
}
r++;
}
return null;
},
getLength:function getLength(){
var t=this.getCurveLengths();
return t[t.length-1];
},
updateArcLengths:function updateArcLengths(){
this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths();
},
getCurveLengths:function getCurveLengths(){
if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;
for(var t=[],e=0,n=0,r=this.curves.length;n<r;n++){e+=this.curves[n].getLength(),t.push(e);}
return this.cacheLengths=t,t;
},
getSpacedPoints:function getSpacedPoints(t){
void 0===t&&(t=40);
for(var e=[],n=0;n<=t;n++){e.push(this.getPoint(n/t));}
return this.autoClose&&e.push(e[0]),e;
},
getPoints:function getPoints(t){
t=t||12;
for(var e,n=[],r=0,i=this.curves;r<i.length;r++){
for(var a=i[r],o=a&&a.isEllipseCurve?2*t:a&&(a.isLineCurve||a.isLineCurve3)?1:a&&a.isSplineCurve?t*a.points.length:t,s=a.getPoints(o),c=0;c<s.length;c++){
var l=s[c];
e&&e.equals(l)||(n.push(l),e=l);
}}
return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n;
},
copy:function copy(t){
xl.prototype.copy.call(this,t),this.curves=[];
for(var e=0,n=t.curves.length;e<n;e++){
var r=t.curves[e];
this.curves.push(r.clone());
}
return this.autoClose=t.autoClose,this;
},
toJSON:function toJSON(){
var t=xl.prototype.toJSON.call(this);
t.autoClose=this.autoClose,t.curves=[];
for(var e=0,n=this.curves.length;e<n;e++){
var r=this.curves[e];
t.curves.push(r.toJSON());
}
return t;
},
fromJSON:function fromJSON(t){
xl.prototype.fromJSON.call(this,t),this.autoClose=t.autoClose,this.curves=[];
for(var e=0,n=t.curves.length;e<n;e++){
var r=t.curves[e];
this.curves.push(new Fl[r.type]().fromJSON(r));
}
return this;
}}),
Ul.prototype=Object.assign(Object.create(Gl.prototype),{
constructor:Ul,
setFromPoints:function setFromPoints(t){
this.moveTo(t[0].x,t[0].y);
for(var e=1,n=t.length;e<n;e++){this.lineTo(t[e].x,t[e].y);}
},
moveTo:function moveTo(t,e){
this.currentPoint.set(t,e);
},
lineTo:function lineTo(t,e){
var n=new Dl(this.currentPoint.clone(),new Ce(t,e));
this.curves.push(n),this.currentPoint.set(t,e);
},
quadraticCurveTo:function quadraticCurveTo(t,e,n,r){
var i=new Il(this.currentPoint.clone(),new Ce(t,e),new Ce(n,r));
this.curves.push(i),this.currentPoint.set(n,r);
},
bezierCurveTo:function bezierCurveTo(t,e,n,r,i,a){
var o=new Cl(this.currentPoint.clone(),new Ce(t,e),new Ce(n,r),new Ce(i,a));
this.curves.push(o),this.currentPoint.set(i,a);
},
splineThru:function splineThru(t){
var e=new Bl([this.currentPoint.clone()].concat(t));
this.curves.push(e),this.currentPoint.copy(t[t.length-1]);
},
arc:function arc(t,e,n,r,i,a){
var o=this.currentPoint.x,
s=this.currentPoint.y;
this.absarc(t+o,e+s,n,r,i,a);
},
absarc:function absarc(t,e,n,r,i,a){
this.absellipse(t,e,n,n,r,i,a);
},
ellipse:function ellipse(t,e,n,r,i,a,o,s){
var c=this.currentPoint.x,
l=this.currentPoint.y;
this.absellipse(t+c,e+l,n,r,i,a,o,s);
},
absellipse:function absellipse(t,e,n,r,i,a,o,s){
var c=new bl(t,e,n,r,i,a,o,s);
if(this.curves.length>0){
var l=c.getPoint(0);
l.equals(this.currentPoint)||this.lineTo(l.x,l.y);
}
this.curves.push(c);
var h=c.getPoint(1);
this.currentPoint.copy(h);
},
copy:function copy(t){
return Gl.prototype.copy.call(this,t),this.currentPoint.copy(t.currentPoint),this;
},
toJSON:function toJSON(){
var t=Gl.prototype.toJSON.call(this);
return t.currentPoint=this.currentPoint.toArray(),t;
},
fromJSON:function fromJSON(t){
return Gl.prototype.fromJSON.call(this,t),this.currentPoint.fromArray(t.currentPoint),this;
}}),
Hl.prototype=Object.assign(Object.create(Ul.prototype),{
constructor:Hl,
getPointsHoles:function getPointsHoles(t){
for(var e=[],n=0,r=this.holes.length;n<r;n++){e[n]=this.holes[n].getPoints(t);}
return e;
},
extractPoints:function extractPoints(t){
return{
shape:this.getPoints(t),
holes:this.getPointsHoles(t)};

},
copy:function copy(t){
Ul.prototype.copy.call(this,t),this.holes=[];
for(var e=0,n=t.holes.length;e<n;e++){
var r=t.holes[e];
this.holes.push(r.clone());
}
return this;
},
toJSON:function toJSON(){
var t=Ul.prototype.toJSON.call(this);
t.uuid=this.uuid,t.holes=[];
for(var e=0,n=this.holes.length;e<n;e++){
var r=this.holes[e];
t.holes.push(r.toJSON());
}
return t;
},
fromJSON:function fromJSON(t){
Ul.prototype.fromJSON.call(this,t),this.uuid=t.uuid,this.holes=[];
for(var e=0,n=t.holes.length;e<n;e++){
var r=t.holes[e];
this.holes.push(new Ul().fromJSON(r));
}
return this;
}}),
Vl.prototype=Object.assign(Object.create(gn.prototype),{
constructor:Vl,
isLight:!0,
copy:function copy(t){
return gn.prototype.copy.call(this,t),this.color.copy(t.color),this.intensity=t.intensity,this;
},
toJSON:function toJSON(t){
var e=gn.prototype.toJSON.call(this,t);
return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,void 0!==this.groundColor&&(e.object.groundColor=this.groundColor.getHex()),void 0!==this.distance&&(e.object.distance=this.distance),void 0!==this.angle&&(e.object.angle=this.angle),void 0!==this.decay&&(e.object.decay=this.decay),void 0!==this.penumbra&&(e.object.penumbra=this.penumbra),void 0!==this.shadow&&(e.object.shadow=this.shadow.toJSON()),e;
}}),
jl.prototype=Object.assign(Object.create(Vl.prototype),{
constructor:jl,
isHemisphereLight:!0,
copy:function copy(t){
return Vl.prototype.copy.call(this,t),this.groundColor.copy(t.groundColor),this;
}}),
Object.assign(kl.prototype,{
_projScreenMatrix:new Ke(),
_lightPositionWorld:new Ie(),
_lookTarget:new Ie(),
getViewportCount:function getViewportCount(){
return this._viewportCount;
},
getFrustum:function getFrustum(){
return this._frustum;
},
updateMatrices:function updateMatrices(t){
var e=this.camera,
n=this.matrix,
r=this._projScreenMatrix,
i=this._lookTarget,
a=this._lightPositionWorld;
a.setFromMatrixPosition(t.matrixWorld),e.position.copy(a),i.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(i),e.updateMatrixWorld(),r.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromMatrix(r),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(e.projectionMatrix),n.multiply(e.matrixWorldInverse);
},
getViewport:function getViewport(t){
return this._viewports[t];
},
getFrameExtents:function getFrameExtents(){
return this._frameExtents;
},
copy:function copy(t){
return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this;
},
clone:function clone(){
return new this.constructor().copy(this);
},
toJSON:function toJSON(){
var t={};
return 0!==this.bias&&(t.bias=this.bias),1!==this.radius&&(t.radius=this.radius),512===this.mapSize.x&&512===this.mapSize.y||(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t;
}}),
Wl.prototype=Object.assign(Object.create(kl.prototype),{
constructor:Wl,
isSpotLightShadow:!0,
updateMatrices:function updateMatrices(t,e,n){
var r=this.camera,
i=2*Pe.RAD2DEG*t.angle,
a=this.mapSize.width/this.mapSize.height,
o=t.distance||r.far;
i===r.fov&&a===r.aspect&&o===r.far||(r.fov=i,r.aspect=a,r.far=o,r.updateProjectionMatrix()),kl.prototype.updateMatrices.call(this,t,e,n);
}}),
ql.prototype=Object.assign(Object.create(Vl.prototype),{
constructor:ql,
isSpotLight:!0,
copy:function copy(t){
return Vl.prototype.copy.call(this,t),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this;
}}),
Xl.prototype=Object.assign(Object.create(kl.prototype),{
constructor:Xl,
isPointLightShadow:!0,
updateMatrices:function updateMatrices(t,e,n){
var r=this.camera,
i=this.matrix,
a=this._lightPositionWorld,
o=this._lookTarget,
s=this._projScreenMatrix;
a.setFromMatrixPosition(t.matrixWorld),r.position.copy(a),o.copy(r.position),o.add(this._cubeDirections[n]),r.up.copy(this._cubeUps[n]),r.lookAt(o),r.updateMatrixWorld(),i.makeTranslation(-a.x,-a.y,-a.z),s.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromMatrix(s);
}}),
Yl.prototype=Object.assign(Object.create(Vl.prototype),{
constructor:Yl,
isPointLight:!0,
copy:function copy(t){
return Vl.prototype.copy.call(this,t),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this;
}}),
Jl.prototype=Object.assign(Object.create(hi.prototype),{
constructor:Jl,
isOrthographicCamera:!0,
copy:function copy(t,e){
return hi.prototype.copy.call(this,t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=null===t.view?null:Object.assign({},t.view),this;
},
setViewOffset:function setViewOffset(t,e,n,r,i,a){
null===this.view&&(this.view={
enabled:!0,
fullWidth:1,
fullHeight:1,
offsetX:0,
offsetY:0,
width:1,
height:1}),
this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix();
},
clearViewOffset:function clearViewOffset(){
null!==this.view&&(this.view.enabled=!1),this.updateProjectionMatrix();
},
updateProjectionMatrix:function updateProjectionMatrix(){
var t=(this.right-this.left)/(2*this.zoom),
e=(this.top-this.bottom)/(2*this.zoom),
n=(this.right+this.left)/2,
r=(this.top+this.bottom)/2,
i=n-t,
a=n+t,
o=r+e,
s=r-e;
if(null!==this.view&&this.view.enabled){
var c=this.zoom/(this.view.width/this.view.fullWidth),
l=this.zoom/(this.view.height/this.view.fullHeight),
h=(this.right-this.left)/this.view.width,
u=(this.top-this.bottom)/this.view.height;
a=(i+=h*(this.view.offsetX/c))+h*(this.view.width/c),s=(o-=u*(this.view.offsetY/l))-u*(this.view.height/l);
}
this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far),this.projectionMatrixInverse.getInverse(this.projectionMatrix);
},
toJSON:function toJSON(t){
var e=gn.prototype.toJSON.call(this,t);
return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,null!==this.view&&(e.object.view=Object.assign({},this.view)),e;
}}),
Zl.prototype=Object.assign(Object.create(kl.prototype),{
constructor:Zl,
isDirectionalLightShadow:!0,
updateMatrices:function updateMatrices(t,e,n){
kl.prototype.updateMatrices.call(this,t,e,n);
}}),
Ql.prototype=Object.assign(Object.create(Vl.prototype),{
constructor:Ql,
isDirectionalLight:!0,
copy:function copy(t){
return Vl.prototype.copy.call(this,t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this;
}}),
Kl.prototype=Object.assign(Object.create(Vl.prototype),{
constructor:Kl,
isAmbientLight:!0}),
$l.prototype=Object.assign(Object.create(Vl.prototype),{
constructor:$l,
isRectAreaLight:!0,
copy:function copy(t){
return Vl.prototype.copy.call(this,t),this.width=t.width,this.height=t.height,this;
},
toJSON:function toJSON(t){
var e=Vl.prototype.toJSON.call(this,t);
return e.object.width=this.width,e.object.height=this.height,e;
}}),
th.prototype=Object.assign(Object.create(hl.prototype),{
constructor:th,
load:function load(t,e,n,r){
var i=this,
a=new pl(i.manager);
a.setPath(i.path),a.load(t,function(t){
e(i.parse(JSON.parse(t)));
},n,r);
},
parse:function parse(t){
var e=this.textures;

function n(t){
return void 0===e[t]&&console.warn("THREE.MaterialLoader: Undefined texture",t),e[t];
}
var r=new Wc[t.type]();
if(void 0!==t.uuid&&(r.uuid=t.uuid),void 0!==t.name&&(r.name=t.name),void 0!==t.color&&r.color.setHex(t.color),void 0!==t.roughness&&(r.roughness=t.roughness),void 0!==t.metalness&&(r.metalness=t.metalness),void 0!==t.emissive&&r.emissive.setHex(t.emissive),void 0!==t.specular&&r.specular.setHex(t.specular),void 0!==t.shininess&&(r.shininess=t.shininess),void 0!==t.clearcoat&&(r.clearcoat=t.clearcoat),void 0!==t.clearcoatRoughness&&(r.clearcoatRoughness=t.clearcoatRoughness),void 0!==t.vertexColors&&(r.vertexColors=t.vertexColors),void 0!==t.fog&&(r.fog=t.fog),void 0!==t.flatShading&&(r.flatShading=t.flatShading),void 0!==t.blending&&(r.blending=t.blending),void 0!==t.combine&&(r.combine=t.combine),void 0!==t.side&&(r.side=t.side),void 0!==t.opacity&&(r.opacity=t.opacity),void 0!==t.transparent&&(r.transparent=t.transparent),void 0!==t.alphaTest&&(r.alphaTest=t.alphaTest),void 0!==t.depthTest&&(r.depthTest=t.depthTest),void 0!==t.depthWrite&&(r.depthWrite=t.depthWrite),void 0!==t.colorWrite&&(r.colorWrite=t.colorWrite),void 0!==t.wireframe&&(r.wireframe=t.wireframe),void 0!==t.wireframeLinewidth&&(r.wireframeLinewidth=t.wireframeLinewidth),void 0!==t.wireframeLinecap&&(r.wireframeLinecap=t.wireframeLinecap),void 0!==t.wireframeLinejoin&&(r.wireframeLinejoin=t.wireframeLinejoin),void 0!==t.rotation&&(r.rotation=t.rotation),1!==t.linewidth&&(r.linewidth=t.linewidth),void 0!==t.dashSize&&(r.dashSize=t.dashSize),void 0!==t.gapSize&&(r.gapSize=t.gapSize),void 0!==t.scale&&(r.scale=t.scale),void 0!==t.polygonOffset&&(r.polygonOffset=t.polygonOffset),void 0!==t.polygonOffsetFactor&&(r.polygonOffsetFactor=t.polygonOffsetFactor),void 0!==t.polygonOffsetUnits&&(r.polygonOffsetUnits=t.polygonOffsetUnits),void 0!==t.skinning&&(r.skinning=t.skinning),void 0!==t.morphTargets&&(r.morphTargets=t.morphTargets),void 0!==t.morphNormals&&(r.morphNormals=t.morphNormals),void 0!==t.dithering&&(r.dithering=t.dithering),void 0!==t.visible&&(r.visible=t.visible),void 0!==t.toneMapped&&(r.toneMapped=t.toneMapped),void 0!==t.userData&&(r.userData=t.userData),void 0!==t.uniforms)
for(var i in t.uniforms){
var a=t.uniforms[i];
switch(r.uniforms[i]={},a.type){
case"t":
r.uniforms[i].value=n(a.value);
break;
case"c":
r.uniforms[i].value=new rr().setHex(a.value);
break;
case"v2":
r.uniforms[i].value=new Ce().fromArray(a.value);
break;
case"v3":
r.uniforms[i].value=new Ie().fromArray(a.value);
break;
case"v4":
r.uniforms[i].value=new Ve().fromArray(a.value);
break;
case"m3":
r.uniforms[i].value=new Fe().fromArray(a.value);
case"m4":
r.uniforms[i].value=new Ke().fromArray(a.value);
break;
default:
r.uniforms[i].value=a.value;}

}
if(void 0!==t.defines&&(r.defines=t.defines),void 0!==t.vertexShader&&(r.vertexShader=t.vertexShader),void 0!==t.fragmentShader&&(r.fragmentShader=t.fragmentShader),void 0!==t.extensions)
for(var o in t.extensions){r.extensions[o]=t.extensions[o];}
if(void 0!==t.shading&&(r.flatShading=1===t.shading),void 0!==t.size&&(r.size=t.size),void 0!==t.sizeAttenuation&&(r.sizeAttenuation=t.sizeAttenuation),void 0!==t.map&&(r.map=n(t.map)),void 0!==t.matcap&&(r.matcap=n(t.matcap)),void 0!==t.alphaMap&&(r.alphaMap=n(t.alphaMap),r.transparent=!0),void 0!==t.bumpMap&&(r.bumpMap=n(t.bumpMap)),void 0!==t.bumpScale&&(r.bumpScale=t.bumpScale),void 0!==t.normalMap&&(r.normalMap=n(t.normalMap)),void 0!==t.normalMapType&&(r.normalMapType=t.normalMapType),void 0!==t.normalScale){
var s=t.normalScale;
!1===Array.isArray(s)&&(s=[s,s]),r.normalScale=new Ce().fromArray(s);
}
return void 0!==t.displacementMap&&(r.displacementMap=n(t.displacementMap)),void 0!==t.displacementScale&&(r.displacementScale=t.displacementScale),void 0!==t.displacementBias&&(r.displacementBias=t.displacementBias),void 0!==t.roughnessMap&&(r.roughnessMap=n(t.roughnessMap)),void 0!==t.metalnessMap&&(r.metalnessMap=n(t.metalnessMap)),void 0!==t.emissiveMap&&(r.emissiveMap=n(t.emissiveMap)),void 0!==t.emissiveIntensity&&(r.emissiveIntensity=t.emissiveIntensity),void 0!==t.specularMap&&(r.specularMap=n(t.specularMap)),void 0!==t.envMap&&(r.envMap=n(t.envMap)),void 0!==t.envMapIntensity&&(r.envMapIntensity=t.envMapIntensity),void 0!==t.reflectivity&&(r.reflectivity=t.reflectivity),void 0!==t.refractionRatio&&(r.refractionRatio=t.refractionRatio),void 0!==t.lightMap&&(r.lightMap=n(t.lightMap)),void 0!==t.lightMapIntensity&&(r.lightMapIntensity=t.lightMapIntensity),void 0!==t.aoMap&&(r.aoMap=n(t.aoMap)),void 0!==t.aoMapIntensity&&(r.aoMapIntensity=t.aoMapIntensity),void 0!==t.gradientMap&&(r.gradientMap=n(t.gradientMap)),void 0!==t.clearcoatNormalMap&&(r.clearcoatNormalMap=n(t.clearcoatNormalMap)),void 0!==t.clearcoatNormalScale&&(r.clearcoatNormalScale=new Ce().fromArray(t.clearcoatNormalScale)),r;
},
setTextures:function setTextures(t){
return this.textures=t,this;
}});

var eh={
decodeText:function decodeText(t){
if("undefined"!=typeof TextDecoder)return new TextDecoder().decode(t);
for(var e="",n=0,r=t.length;n<r;n++){e+=String.fromCharCode(t[n]);}
try{
return decodeURIComponent(escape(e));
}catch(t){
return e;
}
},
extractUrlBase:function extractUrlBase(t){
var e=t.lastIndexOf("/");
return-1===e?"./":t.substr(0,e+1);
}};


function nh(){
Pr.call(this),this.type="InstancedBufferGeometry",this.maxInstancedCount=void 0;
}

function rh(t,e,n,r){
"number"==typeof n&&(r=n,n=!1,console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")),ur.call(this,t,e,n),this.meshPerAttribute=r||1;
}

function ih(t){
hl.call(this,t);
}
nh.prototype=Object.assign(Object.create(Pr.prototype),{
constructor:nh,
isInstancedBufferGeometry:!0,
copy:function copy(t){
return Pr.prototype.copy.call(this,t),this.maxInstancedCount=t.maxInstancedCount,this;
},
clone:function clone(){
return new this.constructor().copy(this);
},
toJSON:function toJSON(){
var t=Pr.prototype.toJSON.call(this);
return t.maxInstancedCount=this.maxInstancedCount,t.isInstancedBufferGeometry=!0,t;
}}),
rh.prototype=Object.assign(Object.create(ur.prototype),{
constructor:rh,
isInstancedBufferAttribute:!0,
copy:function copy(t){
return ur.prototype.copy.call(this,t),this.meshPerAttribute=t.meshPerAttribute,this;
},
toJSON:function toJSON(){
var t=ur.prototype.toJSON.call(this);
return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t;
}}),
ih.prototype=Object.assign(Object.create(hl.prototype),{
constructor:ih,
load:function load(t,e,n,r){
var i=this,
a=new pl(i.manager);
a.setPath(i.path),a.load(t,function(t){
e(i.parse(JSON.parse(t)));
},n,r);
},
parse:function parse(t){
var e=t.isInstancedBufferGeometry?new nh():new Pr(),
n=t.data.index;
if(void 0!==n){
var r=new ah[n.type](n.array);
e.setIndex(new ur(r,1));
}
var i=t.data.attributes;
for(var a in i){
var o=i[a],
s=(r=new ah[o.type](o.array),new(o.isInstancedBufferAttribute?rh:ur)(r,o.itemSize,o.normalized));
void 0!==o.name&&(s.name=o.name),e.addAttribute(a,s);
}
var c=t.data.morphAttributes;
if(c)
for(var a in c){
for(var l=c[a],h=[],u=0,p=l.length;u<p;u++){o=l[u],s=new ur(r=new ah[o.type](o.array),o.itemSize,o.normalized),void 0!==o.name&&(s.name=o.name),h.push(s);}
e.morphAttributes[a]=h;
}
var d=t.data.groups||t.data.drawcalls||t.data.offsets;
if(void 0!==d){
u=0;
for(var f=d.length;u!==f;++u){
var m=d[u];
e.addGroup(m.start,m.count,m.materialIndex);
}
}
var v=t.data.boundingSphere;
if(void 0!==v){
var g=new Ie();
void 0!==v.center&&g.fromArray(v.center),e.boundingSphere=new Nn(g,v.radius);
}
return t.name&&(e.name=t.name),t.userData&&(e.userData=t.userData),e;
}});

var ah={
Int8Array:Int8Array,
Uint8Array:Uint8Array,
Uint8ClampedArray:"undefined"!=typeof Uint8ClampedArray?Uint8ClampedArray:Uint8Array,
Int16Array:Int16Array,
Uint16Array:Uint16Array,
Int32Array:Int32Array,
Uint32Array:Uint32Array,
Float32Array:Float32Array,
Float64Array:Float64Array};


function oh(t){
hl.call(this,t);
}
oh.prototype=Object.assign(Object.create(hl.prototype),{
constructor:oh,
load:function load(t,e,n,r){
var i=this,
a=""===this.path?eh.extractUrlBase(t):this.path;
this.resourcePath=this.resourcePath||a;
var o=new pl(i.manager);
o.setPath(this.path),o.load(t,function(n){
var a=null;
try{
a=JSON.parse(n);
}catch(e){
return void 0!==r&&r(e),void console.error("THREE:ObjectLoader: Can't parse "+t+".",e.message);
}
var o=a.metadata;
void 0!==o&&void 0!==o.type&&"geometry"!==o.type.toLowerCase()?i.parse(a,e):console.error("THREE.ObjectLoader: Can't load "+t);
},n,r);
},


parse:function parse(t,e){
var n=this.parseShape(t.shapes),
r=this.parseGeometries(t.geometries,n),
i=this.parseImages(t.images,function(){
void 0!==e&&e(s);
}),
a=this.parseTextures(t.textures,i),
o=this.parseMaterials(t.materials,a),
s=this.parseObject(t.object,r,o);
return t.animations&&(s.animations=this.parseAnimations(t.animations)),void 0!==t.images&&0!==t.images.length||void 0!==e&&e(s),s;
},
parseShape:function parseShape(t){
var e={};
if(void 0!==t)
for(var n=0,r=t.length;n<r;n++){
var i=new Hl().fromJSON(t[n]);
e[i.uuid]=i;
}
return e;
},
parseGeometries:function parseGeometries(t,e){
var n={};
if(void 0!==t)
for(var r=new ih(),i=0,a=t.length;i<a;i++){
var s,c=t[i];
switch(c.type){
case"PlaneGeometry":
case"PlaneBufferGeometry":
s=new Nc[c.type](c.width,c.height,c.widthSegments,c.heightSegments);
break;
case"BoxGeometry":
case"BoxBufferGeometry":
case"CubeGeometry":
s=new Nc[c.type](c.width,c.height,c.depth,c.widthSegments,c.heightSegments,c.depthSegments);
break;
case"CircleGeometry":
case"CircleBufferGeometry":
s=new Nc[c.type](c.radius,c.segments,c.thetaStart,c.thetaLength);
break;
case"CylinderGeometry":
case"CylinderBufferGeometry":
s=new Nc[c.type](c.radiusTop,c.radiusBottom,c.height,c.radialSegments,c.heightSegments,c.openEnded,c.thetaStart,c.thetaLength);
break;
case"ConeGeometry":
case"ConeBufferGeometry":
s=new Nc[c.type](c.radius,c.height,c.radialSegments,c.heightSegments,c.openEnded,c.thetaStart,c.thetaLength);
break;
case"SphereGeometry":
case"SphereBufferGeometry":
s=new Nc[c.type](c.radius,c.widthSegments,c.heightSegments,c.phiStart,c.phiLength,c.thetaStart,c.thetaLength);
break;
case"DodecahedronGeometry":
case"DodecahedronBufferGeometry":
case"IcosahedronGeometry":
case"IcosahedronBufferGeometry":
case"OctahedronGeometry":
case"OctahedronBufferGeometry":
case"TetrahedronGeometry":
case"TetrahedronBufferGeometry":
s=new Nc[c.type](c.radius,c.detail);
break;
case"RingGeometry":
case"RingBufferGeometry":
s=new Nc[c.type](c.innerRadius,c.outerRadius,c.thetaSegments,c.phiSegments,c.thetaStart,c.thetaLength);
break;
case"TorusGeometry":
case"TorusBufferGeometry":
s=new Nc[c.type](c.radius,c.tube,c.radialSegments,c.tubularSegments,c.arc);
break;
case"TorusKnotGeometry":
case"TorusKnotBufferGeometry":
s=new Nc[c.type](c.radius,c.tube,c.tubularSegments,c.radialSegments,c.p,c.q);
break;
case"TubeGeometry":
case"TubeBufferGeometry":
s=new Nc[c.type](new Fl[c.path.type]().fromJSON(c.path),c.tubularSegments,c.radius,c.radialSegments,c.closed);
break;
case"LatheGeometry":
case"LatheBufferGeometry":
s=new Nc[c.type](c.points,c.segments,c.phiStart,c.phiLength);
break;
case"PolyhedronGeometry":
case"PolyhedronBufferGeometry":
s=new Nc[c.type](c.vertices,c.indices,c.radius,c.details);
break;
case"ShapeGeometry":
case"ShapeBufferGeometry":
for(var l=[],h=0,u=c.shapes.length;h<u;h++){
var p=e[c.shapes[h]];
l.push(p);
}
s=new Nc[c.type](l,c.curveSegments);
break;
case"ExtrudeGeometry":
case"ExtrudeBufferGeometry":
for(l=[],h=0,u=c.shapes.length;h<u;h++){p=e[c.shapes[h]],l.push(p);}
var d=c.options.extrudePath;
void 0!==d&&(c.options.extrudePath=new Fl[d.type]().fromJSON(d)),s=new Nc[c.type](l,c.options);
break;
case"BufferGeometry":
case"InstancedBufferGeometry":
s=r.parse(c);
break;
case"Geometry":
"THREE"in o&&"LegacyJSONLoader"in THREE?s=new THREE.LegacyJSONLoader().parse(c,this.resourcePath).geometry:console.error('THREE.ObjectLoader: You have to import LegacyJSONLoader in order load geometry data of type "Geometry".');
break;
default:
console.warn('THREE.ObjectLoader: Unsupported geometry type "'+c.type+'"');
continue;}

s.uuid=c.uuid,void 0!==c.name&&(s.name=c.name),!0===s.isBufferGeometry&&void 0!==c.userData&&(s.userData=c.userData),n[c.uuid]=s;
}
return n;
},
parseMaterials:function parseMaterials(t,e){
var n={},
r={};
if(void 0!==t){
var i=new th();
i.setTextures(e);
for(var a=0,o=t.length;a<o;a++){
var s=t[a];
if("MultiMaterial"===s.type){
for(var c=[],l=0;l<s.materials.length;l++){
var h=s.materials[l];
void 0===n[h.uuid]&&(n[h.uuid]=i.parse(h)),c.push(n[h.uuid]);
}
r[s.uuid]=c;
}else void 0===n[s.uuid]&&(n[s.uuid]=i.parse(s)),r[s.uuid]=n[s.uuid];
}
}
return r;
},
parseAnimations:function parseAnimations(t){
for(var e=[],n=0;n<t.length;n++){
var r=t[n],
i=al.parse(r);
void 0!==r.uuid&&(i.uuid=r.uuid),e.push(i);
}
return e;
},
parseImages:function parseImages(t,e){
var n=this,
r={};

function i(t){
return n.manager.itemStart(t),a.load(t,function(){
n.manager.itemEnd(t);
},void 0,function(){
n.manager.itemError(t),n.manager.itemEnd(t);
});
}
if(void 0!==t&&t.length>0){
var a=new vl(new cl(e));
a.setCrossOrigin(this.crossOrigin);
for(var o=0,s=t.length;o<s;o++){
var c=t[o],
l=c.url;
if(Array.isArray(l)){
r[c.uuid]=[];
for(var h=0,u=l.length;h<u;h++){
var p=l[h],
d=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(p)?p:n.resourcePath+p;
r[c.uuid].push(i(d));
}
}else d=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c.url)?c.url:n.resourcePath+c.url,r[c.uuid]=i(d);
}
}
return r;
},
parseTextures:function parseTextures(t,e){
function n(t,e){
return"number"==typeof t?t:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",t),e[t]);
}
var r={};
if(void 0!==t)
for(var i=0,a=t.length;i<a;i++){
var o,s=t[i];
void 0===s.image&&console.warn('THREE.ObjectLoader: No "image" specified for',s.uuid),void 0===e[s.image]&&console.warn("THREE.ObjectLoader: Undefined image",s.image),(o=Array.isArray(e[s.image])?new Vi(e[s.image]):new He(e[s.image])).needsUpdate=!0,o.uuid=s.uuid,void 0!==s.name&&(o.name=s.name),void 0!==s.mapping&&(o.mapping=n(s.mapping,ch)),void 0!==s.offset&&o.offset.fromArray(s.offset),void 0!==s.repeat&&o.repeat.fromArray(s.repeat),void 0!==s.center&&o.center.fromArray(s.center),void 0!==s.rotation&&(o.rotation=s.rotation),void 0!==s.wrap&&(o.wrapS=n(s.wrap[0],lh),o.wrapT=n(s.wrap[1],lh)),void 0!==s.format&&(o.format=s.format),void 0!==s.type&&(o.type=s.type),void 0!==s.encoding&&(o.encoding=s.encoding),void 0!==s.minFilter&&(o.minFilter=n(s.minFilter,hh)),void 0!==s.magFilter&&(o.magFilter=n(s.magFilter,hh)),void 0!==s.anisotropy&&(o.anisotropy=s.anisotropy),void 0!==s.flipY&&(o.flipY=s.flipY),void 0!==s.premultiplyAlpha&&(o.premultiplyAlpha=s.premultiplyAlpha),void 0!==s.unpackAlignment&&(o.unpackAlignment=s.unpackAlignment),r[s.uuid]=o;
}
return r;
},
parseObject:function parseObject(t,e,n){
var r;

function i(t){
return void 0===e[t]&&console.warn("THREE.ObjectLoader: Undefined geometry",t),e[t];
}

function a(t){
if(void 0!==t){
if(Array.isArray(t)){
for(var e=[],r=0,i=t.length;r<i;r++){
var a=t[r];
void 0===n[a]&&console.warn("THREE.ObjectLoader: Undefined material",a),e.push(n[a]);
}
return e;
}
return void 0===n[t]&&console.warn("THREE.ObjectLoader: Undefined material",t),n[t];
}
}
switch(t.type){
case"Scene":
r=new yn(),void 0!==t.background&&Number.isInteger(t.background)&&(r.background=new rr(t.background)),void 0!==t.fog&&("Fog"===t.fog.type?r.fog=new Lo(t.fog.color,t.fog.near,t.fog.far):"FogExp2"===t.fog.type&&(r.fog=new Ao(t.fog.color,t.fog.density)));
break;
case"PerspectiveCamera":
r=new ui(t.fov,t.aspect,t.near,t.far),void 0!==t.focus&&(r.focus=t.focus),void 0!==t.zoom&&(r.zoom=t.zoom),void 0!==t.filmGauge&&(r.filmGauge=t.filmGauge),void 0!==t.filmOffset&&(r.filmOffset=t.filmOffset),void 0!==t.view&&(r.view=Object.assign({},t.view));
break;
case"OrthographicCamera":
r=new Jl(t.left,t.right,t.top,t.bottom,t.near,t.far),void 0!==t.zoom&&(r.zoom=t.zoom),void 0!==t.view&&(r.view=Object.assign({},t.view));
break;
case"AmbientLight":
r=new Kl(t.color,t.intensity);
break;
case"DirectionalLight":
r=new Ql(t.color,t.intensity);
break;
case"PointLight":
r=new Yl(t.color,t.intensity,t.distance,t.decay);
break;
case"RectAreaLight":
r=new $l(t.color,t.intensity,t.width,t.height);
break;
case"SpotLight":
r=new ql(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay);
break;
case"HemisphereLight":
r=new jl(t.color,t.groundColor,t.intensity);
break;
case"SkinnedMesh":
console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.");
case"Mesh":
var o=i(t.geometry),
s=a(t.material);
r=o.bones&&o.bones.length>0?new Jo(o,s):new Yr(o,s),void 0!==t.drawMode&&r.setDrawMode(t.drawMode);
break;
case"LOD":
r=new Yo();
break;
case"Line":
r=new os(i(t.geometry),a(t.material),t.mode);
break;
case"LineLoop":
r=new hs(i(t.geometry),a(t.material));
break;
case"LineSegments":
r=new ls(i(t.geometry),a(t.material));
break;
case"PointCloud":
case"Points":
r=new vs(i(t.geometry),a(t.material));
break;
case"Sprite":
r=new ko(a(t.material));
break;
case"Group":
r=new yo();
break;
default:
r=new gn();}

if(r.uuid=t.uuid,void 0!==t.name&&(r.name=t.name),void 0!==t.matrix?(r.matrix.fromArray(t.matrix),void 0!==t.matrixAutoUpdate&&(r.matrixAutoUpdate=t.matrixAutoUpdate),r.matrixAutoUpdate&&r.matrix.decompose(r.position,r.quaternion,r.scale)):(void 0!==t.position&&r.position.fromArray(t.position),void 0!==t.rotation&&r.rotation.fromArray(t.rotation),void 0!==t.quaternion&&r.quaternion.fromArray(t.quaternion),void 0!==t.scale&&r.scale.fromArray(t.scale)),void 0!==t.castShadow&&(r.castShadow=t.castShadow),void 0!==t.receiveShadow&&(r.receiveShadow=t.receiveShadow),t.shadow&&(void 0!==t.shadow.bias&&(r.shadow.bias=t.shadow.bias),void 0!==t.shadow.radius&&(r.shadow.radius=t.shadow.radius),void 0!==t.shadow.mapSize&&r.shadow.mapSize.fromArray(t.shadow.mapSize),void 0!==t.shadow.camera&&(r.shadow.camera=this.parseObject(t.shadow.camera))),void 0!==t.visible&&(r.visible=t.visible),void 0!==t.frustumCulled&&(r.frustumCulled=t.frustumCulled),void 0!==t.renderOrder&&(r.renderOrder=t.renderOrder),void 0!==t.userData&&(r.userData=t.userData),void 0!==t.layers&&(r.layers.mask=t.layers),void 0!==t.children)
for(var c=t.children,l=0;l<c.length;l++){r.add(this.parseObject(c[l],e,n));}
if("LOD"===t.type)
for(var h=t.levels,u=0;u<h.length;u++){
var p=h[u],
d=r.getObjectByProperty("uuid",p.object);
void 0!==d&&r.addLevel(d,p.distance);
}
return r;
}});

var sh,ch={
UVMapping:300,
CubeReflectionMapping:rt,
CubeRefractionMapping:it,
EquirectangularReflectionMapping:at,
EquirectangularRefractionMapping:ot,
SphericalReflectionMapping:st,
CubeUVReflectionMapping:ct,
CubeUVRefractionMapping:lt},

lh={
RepeatWrapping:ht,
ClampToEdgeWrapping:ut,
MirroredRepeatWrapping:pt},

hh={
NearestFilter:dt,
NearestMipmapNearestFilter:ft,
NearestMipmapLinearFilter:mt,
LinearFilter:vt,
LinearMipmapNearestFilter:gt,
LinearMipmapLinearFilter:yt};


function uh(t){
"undefined"==typeof createImageBitmap&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),"undefined"==typeof fetch&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),hl.call(this,t),this.options=void 0;
}

function ph(){
this.type="ShapePath",this.color=new rr(),this.subPaths=[],this.currentPath=null;
}

function dh(t){
this.type="Font",this.data=t;
}

function fh(t,e,n,r,i){
var a=i.glyphs[t]||i.glyphs["?"];
if(a){
var o,s,c,l,h,u,p,d,f=new ph();
if(a.o)
for(var m=a._cachedOutline||(a._cachedOutline=a.o.split(" ")),v=0,g=m.length;v<g;){switch(m[v++]){
case"m":
o=m[v++]*e+n,s=m[v++]*e+r,f.moveTo(o,s);
break;
case"l":
o=m[v++]*e+n,s=m[v++]*e+r,f.lineTo(o,s);
break;
case"q":
c=m[v++]*e+n,l=m[v++]*e+r,h=m[v++]*e+n,u=m[v++]*e+r,f.quadraticCurveTo(h,u,c,l);
break;
case"b":
c=m[v++]*e+n,l=m[v++]*e+r,h=m[v++]*e+n,u=m[v++]*e+r,p=m[v++]*e+n,d=m[v++]*e+r,f.bezierCurveTo(h,u,p,d,c,l);}}

return{
offsetX:a.ha*e,
path:f};

}
console.error('THREE.Font: character "'+t+'" does not exists in font family '+i.familyName+".");
}

function mh(t){
hl.call(this,t);
}
uh.prototype=Object.assign(Object.create(hl.prototype),{
constructor:uh,
setOptions:function setOptions(t){
return this.options=t,this;
},
load:function load(t,e,n,r){
void 0===t&&(t=""),void 0!==this.path&&(t=this.path+t),t=this.manager.resolveURL(t);
var i=this,
a=sl.get(t);
if(void 0!==a)return i.manager.itemStart(t),setTimeout(function(){
e&&e(a),i.manager.itemEnd(t);
},0),a;
fetch(t).then(function(t){
return t.blob();
}).then(function(t){
return void 0===i.options?createImageBitmap(t):createImageBitmap(t,i.options);
}).then(function(n){
sl.add(t,n),e&&e(n),i.manager.itemEnd(t);
}).catch(function(e){
r&&r(e),i.manager.itemError(t),i.manager.itemEnd(t);
}),i.manager.itemStart(t);
}}),
Object.assign(ph.prototype,{
moveTo:function moveTo(t,e){
this.currentPath=new Ul(),this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e);
},
lineTo:function lineTo(t,e){
this.currentPath.lineTo(t,e);
},
quadraticCurveTo:function quadraticCurveTo(t,e,n,r){
this.currentPath.quadraticCurveTo(t,e,n,r);
},
bezierCurveTo:function bezierCurveTo(t,e,n,r,i,a){
this.currentPath.bezierCurveTo(t,e,n,r,i,a);
},
splineThru:function splineThru(t){
this.currentPath.splineThru(t);
},
toShapes:function toShapes(t,e){
function n(t){
for(var e=[],n=0,r=t.length;n<r;n++){
var i=t[n],
a=new Hl();
a.curves=i.curves,e.push(a);
}
return e;
}

function r(t,e){
for(var n=e.length,r=!1,i=n-1,a=0;a<n;i=a++){
var o=e[i],
s=e[a],
c=s.x-o.x,
l=s.y-o.y;
if(Math.abs(l)>Number.EPSILON){
if(l<0&&(o=e[a],c=-c,s=e[i],l=-l),t.y<o.y||t.y>s.y)continue;
if(t.y===o.y){
if(t.x===o.x)return!0;
}else{
var h=l*(t.x-o.x)-c*(t.y-o.y);
if(0===h)return!0;
if(h<0)continue;
r=!r;
}
}else{
if(t.y!==o.y)continue;
if(s.x<=t.x&&t.x<=o.x||o.x<=t.x&&t.x<=s.x)return!0;
}
}
return r;
}
var i=lc.isClockWise,
a=this.subPaths;
if(0===a.length)return[];
if(!0===e)return n(a);
var o,s,c,l=[];
if(1===a.length)return s=a[0],(c=new Hl()).curves=s.curves,l.push(c),l;
var h=!i(a[0].getPoints());
h=t?!h:h;
var u,p,d=[],
f=[],
m=[],
v=0;
f[v]=void 0,m[v]=[];
for(var g=0,y=a.length;g<y;g++){o=i(u=(s=a[g]).getPoints()),(o=t?!o:o)?(!h&&f[v]&&v++,f[v]={
s:new Hl(),
p:u},
f[v].s.curves=s.curves,h&&v++,m[v]=[]):m[v].push({
h:s,
p:u[0]});}

if(!f[0])return n(a);
if(f.length>1){
for(var x=!1,b=[],w=0,_=f.length;w<_;w++){d[w]=[];}
for(w=0,_=f.length;w<_;w++){
for(var M=m[w],S=0;S<M.length;S++){
for(var T=M[S],E=!0,A=0;A<f.length;A++){r(T.p,f[A].p)&&(w!==A&&b.push({
froms:w,
tos:A,
hole:S}),
E?(E=!1,d[A].push(T)):x=!0);}
E&&d[w].push(T);
}}
b.length>0&&(x||(m=d));
}
g=0;
for(var L=f.length;g<L;g++){
c=f[g].s,l.push(c);
for(var R=0,P=(p=m[g]).length;R<P;R++){c.holes.push(p[R].h);}
}
return l;
}}),
Object.assign(dh.prototype,{
isFont:!0,
generateShapes:function generateShapes(t,e){
void 0===e&&(e=100);
for(var n=[],r=function(t,e,n){
for(var r=Array.from?Array.from(t):String(t).split(""),i=e/n.resolution,a=(n.boundingBox.yMax-n.boundingBox.yMin+n.underlineThickness)*i,o=[],s=0,c=0,l=0;l<r.length;l++){
var h=r[l];
if("\n"===h)s=0,c-=a;else
{
var u=fh(h,i,s,c,n);
s+=u.offsetX,o.push(u.path);
}
}
return o;
}(t,e,this.data),i=0,a=r.length;i<a;i++){Array.prototype.push.apply(n,r[i].toShapes());}
return n;
}}),
mh.prototype=Object.assign(Object.create(hl.prototype),{
constructor:mh,
load:function load(t,e,n,r){
var i=this,
a=new pl(this.manager);
a.setPath(this.path),a.load(t,function(t){
var n;
try{
n=JSON.parse(t);
}catch(e){
console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."),n=JSON.parse(t.substring(65,t.length-2));
}
var r=i.parse(n);
e&&e(r);
},n,r);
},
parse:function parse(t){
return new dh(t);
}});

var vh={
getContext:function getContext(){
return void 0===sh&&(sh=new(o.AudioContext||o.webkitAudioContext)()),sh;
},
setContext:function setContext(t){
sh=t;
}};


function gh(t){
hl.call(this,t);
}

function yh(){
this.coefficients=[];
for(var t=0;t<9;t++){this.coefficients.push(new Ie());}
}

function xh(t,e){
Vl.call(this,void 0,e),this.sh=void 0!==t?t:new yh();
}

function bh(t,e,n){
xh.call(this,void 0,n);
var r=new rr().set(t),
i=new rr().set(e),
a=new Ie(r.r,r.g,r.b),
o=new Ie(i.r,i.g,i.b),
s=Math.sqrt(Math.PI),
c=s*Math.sqrt(.75);
this.sh.coefficients[0].copy(a).add(o).multiplyScalar(s),this.sh.coefficients[1].copy(a).sub(o).multiplyScalar(c);
}

function wh(t,e){
xh.call(this,void 0,e);
var n=new rr().set(t);
this.sh.coefficients[0].set(n.r,n.g,n.b).multiplyScalar(2*Math.sqrt(Math.PI));
}
gh.prototype=Object.assign(Object.create(hl.prototype),{
constructor:gh,
load:function load(t,e,n,r){
var i=new pl(this.manager);
i.setResponseType("arraybuffer"),i.setPath(this.path),i.load(t,function(t){
var n=t.slice(0);
vh.getContext().decodeAudioData(n,function(t){
e(t);
});
},n,r);
}}),
Object.assign(yh.prototype,{
isSphericalHarmonics3:!0,
set:function set(t){
for(var e=0;e<9;e++){this.coefficients[e].copy(t[e]);}
return this;
},
zero:function zero(){
for(var t=0;t<9;t++){this.coefficients[t].set(0,0,0);}
return this;
},
getAt:function getAt(t,e){
var n=t.x,
r=t.y,
i=t.z,
a=this.coefficients;
return e.copy(a[0]).multiplyScalar(.282095),e.addScale(a[1],.488603*r),e.addScale(a[2],.488603*i),e.addScale(a[3],.488603*n),e.addScale(a[4],n*r*1.092548),e.addScale(a[5],r*i*1.092548),e.addScale(a[6],.315392*(3*i*i-1)),e.addScale(a[7],n*i*1.092548),e.addScale(a[8],.546274*(n*n-r*r)),e;
},
getIrradianceAt:function getIrradianceAt(t,e){
var n=t.x,
r=t.y,
i=t.z,
a=this.coefficients;
return e.copy(a[0]).multiplyScalar(.886227),e.addScale(a[1],1.023328*r),e.addScale(a[2],1.023328*i),e.addScale(a[3],1.023328*n),e.addScale(a[4],.858086*n*r),e.addScale(a[5],.858086*r*i),e.addScale(a[6],.743125*i*i-.247708),e.addScale(a[7],.858086*n*i),e.addScale(a[8],.429043*(n*n-r*r)),e;
},
add:function add(t){
for(var e=0;e<9;e++){this.coefficients[e].add(t.coefficients[e]);}
return this;
},
scale:function scale(t){
for(var e=0;e<9;e++){this.coefficients[e].multiplyScalar(t);}
return this;
},
lerp:function lerp(t,e){
for(var n=0;n<9;n++){this.coefficients[n].lerp(t.coefficients[n],e);}
return this;
},
equals:function equals(t){
for(var e=0;e<9;e++){
if(!this.coefficients[e].equals(t.coefficients[e]))return!1;}
return!0;
},
copy:function copy(t){
return this.set(t.coefficients);
},
clone:function clone(){
return new this.constructor().copy(this);
},
fromArray:function fromArray(t,e){
void 0===e&&(e=0);
for(var n=this.coefficients,r=0;r<9;r++){n[r].fromArray(t,e+3*r);}
return this;
},
toArray:function toArray(t,e){
void 0===t&&(t=[]),void 0===e&&(e=0);
for(var n=this.coefficients,r=0;r<9;r++){n[r].toArray(t,e+3*r);}
return t;
}}),
Object.assign(yh,{
getBasisAt:function getBasisAt(t,e){
var n=t.x,
r=t.y,
i=t.z;
e[0]=.282095,e[1]=.488603*r,e[2]=.488603*i,e[3]=.488603*n,e[4]=1.092548*n*r,e[5]=1.092548*r*i,e[6]=.315392*(3*i*i-1),e[7]=1.092548*n*i,e[8]=.546274*(n*n-r*r);
}}),
xh.prototype=Object.assign(Object.create(Vl.prototype),{
constructor:xh,
isLightProbe:!0,
copy:function copy(t){
return Vl.prototype.copy.call(this,t),this.sh.copy(t.sh),this.intensity=t.intensity,this;
},
toJSON:function toJSON(t){
return Vl.prototype.toJSON.call(this,t);
}}),
bh.prototype=Object.assign(Object.create(xh.prototype),{
constructor:bh,
isHemisphereLightProbe:!0,
copy:function copy(t){
return xh.prototype.copy.call(this,t),this;
},
toJSON:function toJSON(t){
return xh.prototype.toJSON.call(this,t);
}}),
wh.prototype=Object.assign(Object.create(xh.prototype),{
constructor:wh,
isAmbientLightProbe:!0,
copy:function copy(t){
return xh.prototype.copy.call(this,t),this;
},
toJSON:function toJSON(t){
return xh.prototype.toJSON.call(this,t);
}});

var _h=new Ke(),
Mh=new Ke();

function Sh(){
this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new ui(),this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new ui(),this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={
focus:null,
fov:null,
aspect:null,
near:null,
far:null,
zoom:null,
eyeSep:null};

}

function Th(t){
this.autoStart=void 0===t||t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1;
}
Object.assign(Sh.prototype,{
update:function update(t){
var e=this._cache;
if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){
e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,e.eyeSep=this.eyeSep;
var n,r,i=t.projectionMatrix.clone(),
a=e.eyeSep/2,
o=a*e.near/e.focus,
s=e.near*Math.tan(Pe.DEG2RAD*e.fov*.5)/e.zoom;
Mh.elements[12]=-a,_h.elements[12]=a,n=-s*e.aspect+o,r=s*e.aspect+o,i.elements[0]=2*e.near/(r-n),i.elements[8]=(r+n)/(r-n),this.cameraL.projectionMatrix.copy(i),n=-s*e.aspect-o,r=s*e.aspect-o,i.elements[0]=2*e.near/(r-n),i.elements[8]=(r+n)/(r-n),this.cameraR.projectionMatrix.copy(i);
}
this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(Mh),this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(_h);
}}),
Object.assign(Th.prototype,{
start:function start(){
this.startTime=("undefined"==typeof performance?Date:performance).now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0;
},
stop:function stop(){
this.getElapsedTime(),this.running=!1,this.autoStart=!1;
},
getElapsedTime:function getElapsedTime(){
return this.getDelta(),this.elapsedTime;
},
getDelta:function getDelta(){
var t=0;
if(this.autoStart&&!this.running)return this.start(),0;
if(this.running){
var e=("undefined"==typeof performance?Date:performance).now();
t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t;
}
return t;
}});

var Eh=new Ie(),
Ah=new Oe(),
Lh=new Ie(),
Rh=new Ie();

function Ph(){
gn.call(this),this.type="AudioListener",this.context=vh.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Th();
}

function Ch(t){
gn.call(this),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.startTime=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.sourceType="empty",this.filters=[];
}
Ph.prototype=Object.assign(Object.create(gn.prototype),{
constructor:Ph,
getInput:function getInput(){
return this.gain;
},
removeFilter:function removeFilter(){
return null!==this.filter&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this;
},
getFilter:function getFilter(){
return this.filter;
},
setFilter:function setFilter(t){
return null!==this.filter?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this;
},
getMasterVolume:function getMasterVolume(){
return this.gain.gain.value;
},
setMasterVolume:function setMasterVolume(t){
return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this;
},
updateMatrixWorld:function updateMatrixWorld(t){
gn.prototype.updateMatrixWorld.call(this,t);
var e=this.context.listener,
n=this.up;
if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(Eh,Ah,Lh),Rh.set(0,0,-1).applyQuaternion(Ah),e.positionX){
var r=this.context.currentTime+this.timeDelta;
e.positionX.linearRampToValueAtTime(Eh.x,r),e.positionY.linearRampToValueAtTime(Eh.y,r),e.positionZ.linearRampToValueAtTime(Eh.z,r),e.forwardX.linearRampToValueAtTime(Rh.x,r),e.forwardY.linearRampToValueAtTime(Rh.y,r),e.forwardZ.linearRampToValueAtTime(Rh.z,r),e.upX.linearRampToValueAtTime(n.x,r),e.upY.linearRampToValueAtTime(n.y,r),e.upZ.linearRampToValueAtTime(n.z,r);
}else e.setPosition(Eh.x,Eh.y,Eh.z),e.setOrientation(Rh.x,Rh.y,Rh.z,n.x,n.y,n.z);
}}),
Ch.prototype=Object.assign(Object.create(gn.prototype),{
constructor:Ch,
getOutput:function getOutput(){
return this.gain;
},
setNodeSource:function setNodeSource(t){
return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this;
},
setMediaElementSource:function setMediaElementSource(t){
return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this;
},
setBuffer:function setBuffer(t){
return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this;
},
play:function play(){
if(!0!==this.isPlaying){
if(!1!==this.hasPlaybackControl){
var t=this.context.createBufferSource();
return t.buffer=this.buffer,t.loop=this.loop,t.onended=this.onEnded.bind(this),this.startTime=this.context.currentTime,t.start(this.startTime,this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect();
}
console.warn("THREE.Audio: this Audio has no playback control.");
}else console.warn("THREE.Audio: Audio is already playing.");
},
pause:function pause(){
if(!1!==this.hasPlaybackControl)return!0===this.isPlaying&&(this.source.stop(),this.source.onended=null,this.offset+=(this.context.currentTime-this.startTime)*this.playbackRate,this.isPlaying=!1),this;
console.warn("THREE.Audio: this Audio has no playback control.");
},
stop:function stop(){
if(!1!==this.hasPlaybackControl)return this.source.stop(),this.source.onended=null,this.offset=0,this.isPlaying=!1,this;
console.warn("THREE.Audio: this Audio has no playback control.");
},
connect:function connect(){
if(this.filters.length>0){
this.source.connect(this.filters[0]);
for(var t=1,e=this.filters.length;t<e;t++){this.filters[t-1].connect(this.filters[t]);}
this.filters[this.filters.length-1].connect(this.getOutput());
}else this.source.connect(this.getOutput());
return this;
},
disconnect:function disconnect(){
if(this.filters.length>0){
this.source.disconnect(this.filters[0]);
for(var t=1,e=this.filters.length;t<e;t++){this.filters[t-1].disconnect(this.filters[t]);}
this.filters[this.filters.length-1].disconnect(this.getOutput());
}else this.source.disconnect(this.getOutput());
return this;
},
getFilters:function getFilters(){
return this.filters;
},
setFilters:function setFilters(t){
return t||(t=[]),!0===this.isPlaying?(this.disconnect(),this.filters=t,this.connect()):this.filters=t,this;
},
setDetune:function setDetune(t){
if(this.detune=t,void 0!==this.source.detune)return!0===this.isPlaying&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this;
},
getDetune:function getDetune(){
return this.detune;
},
getFilter:function getFilter(){
return this.getFilters()[0];
},
setFilter:function setFilter(t){
return this.setFilters(t?[t]:[]);
},
setPlaybackRate:function setPlaybackRate(t){
if(!1!==this.hasPlaybackControl)return this.playbackRate=t,!0===this.isPlaying&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this;
console.warn("THREE.Audio: this Audio has no playback control.");
},
getPlaybackRate:function getPlaybackRate(){
return this.playbackRate;
},
onEnded:function onEnded(){
this.isPlaying=!1;
},
getLoop:function getLoop(){
return!1===this.hasPlaybackControl?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop;
},
setLoop:function setLoop(t){
if(!1!==this.hasPlaybackControl)return this.loop=t,!0===this.isPlaying&&(this.source.loop=this.loop),this;
console.warn("THREE.Audio: this Audio has no playback control.");
},
getVolume:function getVolume(){
return this.gain.gain.value;
},
setVolume:function setVolume(t){
return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this;
}});

var Oh=new Ie(),
Dh=new Oe(),
Nh=new Ie(),
Ih=new Ie();

function zh(t){
Ch.call(this,t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain);
}

function Bh(t,e){
this.analyser=t.context.createAnalyser(),this.analyser.fftSize=void 0!==e?e:2048,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser);
}

function Fh(t,e,n){
this.binding=t,this.valueSize=n;
var r,i=Float64Array;
switch(e){
case"quaternion":
r=this._slerp;
break;
case"string":
case"bool":
i=Array,r=this._select;
break;
default:
r=this._lerp;}

this.buffer=new i(4*n),this._mixBufferRegion=r,this.cumulativeWeight=0,this.useCount=0,this.referenceCount=0;
}
zh.prototype=Object.assign(Object.create(Ch.prototype),{
constructor:zh,
getOutput:function getOutput(){
return this.panner;
},
getRefDistance:function getRefDistance(){
return this.panner.refDistance;
},
setRefDistance:function setRefDistance(t){
return this.panner.refDistance=t,this;
},
getRolloffFactor:function getRolloffFactor(){
return this.panner.rolloffFactor;
},
setRolloffFactor:function setRolloffFactor(t){
return this.panner.rolloffFactor=t,this;
},
getDistanceModel:function getDistanceModel(){
return this.panner.distanceModel;
},
setDistanceModel:function setDistanceModel(t){
return this.panner.distanceModel=t,this;
},
getMaxDistance:function getMaxDistance(){
return this.panner.maxDistance;
},
setMaxDistance:function setMaxDistance(t){
return this.panner.maxDistance=t,this;
},
setDirectionalCone:function setDirectionalCone(t,e,n){
return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this;
},
updateMatrixWorld:function updateMatrixWorld(t){
if(gn.prototype.updateMatrixWorld.call(this,t),!0!==this.hasPlaybackControl||!1!==this.isPlaying){
this.matrixWorld.decompose(Oh,Dh,Nh),Ih.set(0,0,1).applyQuaternion(Dh);
var e=this.panner;
if(e.positionX){
var n=this.context.currentTime+this.listener.timeDelta;
e.positionX.linearRampToValueAtTime(Oh.x,n),e.positionY.linearRampToValueAtTime(Oh.y,n),e.positionZ.linearRampToValueAtTime(Oh.z,n),e.orientationX.linearRampToValueAtTime(Ih.x,n),e.orientationY.linearRampToValueAtTime(Ih.y,n),e.orientationZ.linearRampToValueAtTime(Ih.z,n);
}else e.setPosition(Oh.x,Oh.y,Oh.z),e.setOrientation(Ih.x,Ih.y,Ih.z);
}
}}),
Object.assign(Bh.prototype,{
getFrequencyData:function getFrequencyData(){
return this.analyser.getByteFrequencyData(this.data),this.data;
},
getAverageFrequency:function getAverageFrequency(){
for(var t=0,e=this.getFrequencyData(),n=0;n<e.length;n++){t+=e[n];}
return t/e.length;
}}),
Object.assign(Fh.prototype,{
accumulate:function accumulate(t,e){
var n=this.buffer,
r=this.valueSize,
i=t*r+r,
a=this.cumulativeWeight;
if(0===a){
for(var o=0;o!==r;++o){n[i+o]=n[o];}
a=e;
}else{
var s=e/(a+=e);
this._mixBufferRegion(n,i,0,s,r);
}
this.cumulativeWeight=a;
},
apply:function apply(t){
var e=this.valueSize,
n=this.buffer,
r=t*e+e,
i=this.cumulativeWeight,
a=this.binding;
if(this.cumulativeWeight=0,i<1){
var o=3*e;
this._mixBufferRegion(n,r,o,1-i,e);
}
for(var s=e,c=e+e;s!==c;++s){
if(n[s]!==n[s+e]){
a.setValue(n,r);
break;
}}
},
saveOriginalState:function saveOriginalState(){
var t=this.binding,
e=this.buffer,
n=this.valueSize,
r=3*n;
t.getValue(e,r);
for(var i=n,a=r;i!==a;++i){e[i]=e[r+i%n];}
this.cumulativeWeight=0;
},
restoreOriginalState:function restoreOriginalState(){
var t=3*this.valueSize;
this.binding.setValue(this.buffer,t);
},
_select:function _select(t,e,n,r,i){
if(r>=.5)
for(var a=0;a!==i;++a){t[e+a]=t[n+a];}
},
_slerp:function _slerp(t,e,n,r){
Oe.slerpFlat(t,e,t,e,t,n,r);
},
_lerp:function _lerp(t,e,n,r,i){
for(var a=1-r,o=0;o!==i;++o){
var s=e+o;
t[s]=t[s]*a+t[n+o]*r;
}
}});

var Gh=new RegExp("[\\[\\]\\.:\\/]","g"),
Uh="[^"+"\\[\\]\\.:\\/".replace("\\.","")+"]",
Hh=/((?:WC+[\/:])*)/.source.replace("WC","[^\\[\\]\\.:\\/]"),
Vh=/(WCOD+)?/.source.replace("WCOD",Uh),
jh=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC","[^\\[\\]\\.:\\/]"),
kh=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC","[^\\[\\]\\.:\\/]"),
Wh=new RegExp("^"+Hh+Vh+jh+kh+"$"),
qh=["material","materials","bones"];

function Xh(t,e,n){
var r=n||Yh.parseTrackName(e);
this._targetGroup=t,this._bindings=t.subscribe_(e,r);
}

function Yh(t,e,n){
this.path=e,this.parsedPath=n||Yh.parseTrackName(e),this.node=Yh.findNode(t,this.parsedPath.nodeName)||t,this.rootNode=t;
}

function Jh(){
this.uuid=Pe.generateUUID(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;
var t={};
this._indicesByUUID=t;
for(var e=0,n=arguments.length;e!==n;++e){t[arguments[e].uuid]=e;}
this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};
var r=this;
this.stats={
objects:{
get total(){
return r._objects.length;
},
get inUse(){
return this.total-r.nCachedObjects_;
}},

get bindingsPerObject(){
return r._bindings.length;
}};

}

function Zh(t,e,n){
this._mixer=t,this._clip=e,this._localRoot=n||null;
for(var r=e.tracks,i=r.length,a=new Array(i),o={
endingStart:he,
endingEnd:he},
s=0;s!==i;++s){
var c=r[s].createInterpolant(null);
a[s]=c,c.settings=o;
}
this._interpolantSettings=o,this._interpolants=a,this._propertyBindings=new Array(i),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=le,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0;
}

function Qh(t){
this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1;
}

function Kh(t){
"string"==typeof t&&(console.warn("THREE.Uniform: Type parameter is no longer needed."),t=arguments[1]),this.value=t;
}

function $h(t,e,n){
Ro.call(this,t,e),this.meshPerAttribute=n||1;
}

function tu(t,e,n,r){
this.ray=new Vn(t,e),this.near=n||0,this.far=r||1/0,this.camera=null,this.params={
Mesh:{},
Line:{},
LOD:{},
Points:{
threshold:1},

Sprite:{}},
Object.defineProperties(this.params,{
PointCloud:{
get:function get(){
return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."),this.Points;
}}});


}

function eu(t,e){
return t.distance-e.distance;
}

function nu(t,e,n,r){
if(!1!==t.visible&&(t.raycast(e,n),!0===r))
for(var i=t.children,a=0,o=i.length;a<o;a++){nu(i[a],e,n,!0);}
}

function ru(t,e,n){
return this.radius=void 0!==t?t:1,this.phi=void 0!==e?e:0,this.theta=void 0!==n?n:0,this;
}

function iu(t,e,n){
return this.radius=void 0!==t?t:1,this.theta=void 0!==e?e:0,this.y=void 0!==n?n:0,this;
}
Object.assign(Xh.prototype,{
getValue:function getValue(t,e){
this.bind();
var n=this._targetGroup.nCachedObjects_,
r=this._bindings[n];
void 0!==r&&r.getValue(t,e);
},
setValue:function setValue(t,e){
for(var n=this._bindings,r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r){n[r].setValue(t,e);}
},
bind:function bind(){
for(var t=this._bindings,e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e){t[e].bind();}
},
unbind:function unbind(){
for(var t=this._bindings,e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e){t[e].unbind();}
}}),
Object.assign(Yh,{
Composite:Xh,
create:function create(t,e,n){
return t&&t.isAnimationObjectGroup?new Yh.Composite(t,e,n):new Yh(t,e,n);
},
sanitizeNodeName:function sanitizeNodeName(t){
return t.replace(/\s/g,"_").replace(Gh,"");
},
parseTrackName:function parseTrackName(t){
var e=Wh.exec(t);
if(!e)throw new Error("PropertyBinding: Cannot parse trackName: "+t);
var n={
nodeName:e[2],
objectName:e[3],
objectIndex:e[4],
propertyName:e[5],
propertyIndex:e[6]},

r=n.nodeName&&n.nodeName.lastIndexOf(".");
if(void 0!==r&&-1!==r){
var i=n.nodeName.substring(r+1);-1!==qh.indexOf(i)&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=i);
}
if(null===n.propertyName||0===n.propertyName.length)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);
return n;
},
findNode:function findNode(t,e){
if(!e||""===e||"root"===e||"."===e||-1===e||e===t.name||e===t.uuid)return t;
if(t.skeleton){
var n=t.skeleton.getBoneByName(e);
if(void 0!==n)return n;
}
if(t.children){
var r=function t(n){
for(var r=0;r<n.length;r++){
var i=n[r];
if(i.name===e||i.uuid===e)return i;
var a=t(i.children);
if(a)return a;
}
return null;
}(t.children);
if(r)return r;
}
return null;
}}),
Object.assign(Yh.prototype,{
_getValue_unavailable:function _getValue_unavailable(){},
_setValue_unavailable:function _setValue_unavailable(){},
BindingType:{
Direct:0,
EntireArray:1,
ArrayElement:2,
HasFromToArray:3},

Versioning:{
None:0,
NeedsUpdate:1,
MatrixWorldNeedsUpdate:2},

GetterByBindingType:[function(t,e){
t[e]=this.node[this.propertyName];
},function(t,e){
for(var n=this.resolvedProperty,r=0,i=n.length;r!==i;++r){t[e++]=n[r];}
},function(t,e){
t[e]=this.resolvedProperty[this.propertyIndex];
},function(t,e){
this.resolvedProperty.toArray(t,e);
}],
SetterByBindingTypeAndVersioning:[
[function(t,e){
this.targetObject[this.propertyName]=t[e];
},function(t,e){
this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0;
},function(t,e){
this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0;
}],
[function(t,e){
for(var n=this.resolvedProperty,r=0,i=n.length;r!==i;++r){n[r]=t[e++];}
},function(t,e){
for(var n=this.resolvedProperty,r=0,i=n.length;r!==i;++r){n[r]=t[e++];}
this.targetObject.needsUpdate=!0;
},function(t,e){
for(var n=this.resolvedProperty,r=0,i=n.length;r!==i;++r){n[r]=t[e++];}
this.targetObject.matrixWorldNeedsUpdate=!0;
}],
[function(t,e){
this.resolvedProperty[this.propertyIndex]=t[e];
},function(t,e){
this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0;
},function(t,e){
this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0;
}],
[function(t,e){
this.resolvedProperty.fromArray(t,e);
},function(t,e){
this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0;
},function(t,e){
this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0;
}]],

getValue:function getValue(t,e){
this.bind(),this.getValue(t,e);
},
setValue:function setValue(t,e){
this.bind(),this.setValue(t,e);
},
bind:function bind(){
var t=this.node,
e=this.parsedPath,
n=e.objectName,
r=e.propertyName,
i=e.propertyIndex;
if(t||(t=Yh.findNode(this.rootNode,e.nodeName)||this.rootNode,this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,t){
if(n){
var a=e.objectIndex;
switch(n){
case"materials":
if(!t.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);
if(!t.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);
t=t.material.materials;
break;
case"bones":
if(!t.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);
t=t.skeleton.bones;
for(var o=0;o<t.length;o++){
if(t[o].name===a){
a=o;
break;
}}
break;
default:
if(void 0===t[n])return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);
t=t[n];}

if(void 0!==a){
if(void 0===t[a])return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);
t=t[a];
}
}
var s=t[r];
if(void 0!==s){
var c=this.Versioning.None;
this.targetObject=t,void 0!==t.needsUpdate?c=this.Versioning.NeedsUpdate:void 0!==t.matrixWorldNeedsUpdate&&(c=this.Versioning.MatrixWorldNeedsUpdate);
var l=this.BindingType.Direct;
if(void 0!==i){
if("morphTargetInfluences"===r){
if(!t.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);
if(t.geometry.isBufferGeometry){
if(!t.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);
for(o=0;o<this.node.geometry.morphAttributes.position.length;o++){
if(t.geometry.morphAttributes.position[o].name===i){
i=o;
break;
}}
}else{
if(!t.geometry.morphTargets)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.",this);
for(o=0;o<this.node.geometry.morphTargets.length;o++){
if(t.geometry.morphTargets[o].name===i){
i=o;
break;
}}
}
}
l=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=i;
}else void 0!==s.fromArray&&void 0!==s.toArray?(l=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(l=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=r;
this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c];
}else{
var h=e.nodeName;
console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+r+" but it wasn't found.",t);
}
}else console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");
},
unbind:function unbind(){
this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound;
}}),
//!\ DECLARE ALIAS AFTER assign prototype !
Object.assign(Yh.prototype,{
_getValue_unbound:Yh.prototype.getValue,
_setValue_unbound:Yh.prototype.setValue}),
Object.assign(Jh.prototype,{
isAnimationObjectGroup:!0,
add:function add(){
for(var t=this._objects,e=t.length,n=this.nCachedObjects_,r=this._indicesByUUID,i=this._paths,a=this._parsedPaths,o=this._bindings,s=o.length,c=void 0,l=0,h=arguments.length;l!==h;++l){
var u=arguments[l],
p=u.uuid,
d=r[p];
if(void 0===d){
d=e++,r[p]=d,t.push(u);
for(var f=0,m=s;f!==m;++f){o[f].push(new Yh(u,i[f],a[f]));}
}else if(d<n){
c=t[d];
var v=--n,
g=t[v];
for(r[g.uuid]=d,t[d]=g,r[p]=v,t[v]=u,f=0,m=s;f!==m;++f){
var y=o[f],
x=y[v],
b=y[d];
y[d]=x,void 0===b&&(b=new Yh(u,i[f],a[f])),y[v]=b;
}
}else t[d]!==c&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.");
}
this.nCachedObjects_=n;
},
remove:function remove(){
for(var t=this._objects,e=this.nCachedObjects_,n=this._indicesByUUID,r=this._bindings,i=r.length,a=0,o=arguments.length;a!==o;++a){
var s=arguments[a],
c=s.uuid,
l=n[c];
if(void 0!==l&&l>=e){
var h=e++,
u=t[h];
n[u.uuid]=l,t[l]=u,n[c]=h,t[h]=s;
for(var p=0,d=i;p!==d;++p){
var f=r[p],
m=f[h],
v=f[l];
f[l]=m,f[h]=v;
}
}
}
this.nCachedObjects_=e;
},
uncache:function uncache(){
for(var t=this._objects,e=t.length,n=this.nCachedObjects_,r=this._indicesByUUID,i=this._bindings,a=i.length,o=0,s=arguments.length;o!==s;++o){
var c=arguments[o],
l=c.uuid,
h=r[l];
if(void 0!==h)
if(delete r[l],h<n){
var u=--n,
p=t[u],
d=t[y=--e];
r[p.uuid]=h,t[h]=p,r[d.uuid]=u,t[u]=d,t.pop();
for(var f=0,m=a;f!==m;++f){
var v=(x=i[f])[u],
g=x[y];
x[h]=v,x[u]=g,x.pop();
}
}else{
var y;
for(r[(d=t[y=--e]).uuid]=h,t[h]=d,t.pop(),f=0,m=a;f!==m;++f){
var x;
(x=i[f])[h]=x[y],x.pop();
}
}
}
this.nCachedObjects_=n;
},
subscribe_:function subscribe_(t,e){
var n=this._bindingsIndicesByPath,
r=n[t],
i=this._bindings;
if(void 0!==r)return i[r];
var a=this._paths,
o=this._parsedPaths,
s=this._objects,
c=s.length,
l=this.nCachedObjects_,
h=new Array(c);
r=i.length,n[t]=r,a.push(t),o.push(e),i.push(h);
for(var u=l,p=s.length;u!==p;++u){
var d=s[u];
h[u]=new Yh(d,t,e);
}
return h;
},
unsubscribe_:function unsubscribe_(t){
var e=this._bindingsIndicesByPath,
n=e[t];
if(void 0!==n){
var r=this._paths,
i=this._parsedPaths,
a=this._bindings,
o=a.length-1,
s=a[o];
e[t[o]]=n,a[n]=s,a.pop(),i[n]=i[o],i.pop(),r[n]=r[o],r.pop();
}
}}),
Object.assign(Zh.prototype,{
play:function play(){
return this._mixer._activateAction(this),this;
},
stop:function stop(){
return this._mixer._deactivateAction(this),this.reset();
},
reset:function reset(){
return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping();
},
isRunning:function isRunning(){
return this.enabled&&!this.paused&&0!==this.timeScale&&null===this._startTime&&this._mixer._isActiveAction(this);
},
isScheduled:function isScheduled(){
return this._mixer._isActiveAction(this);
},
startAt:function startAt(t){
return this._startTime=t,this;
},
setLoop:function setLoop(t,e){
return this.loop=t,this.repetitions=e,this;
},
setEffectiveWeight:function setEffectiveWeight(t){
return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading();
},
getEffectiveWeight:function getEffectiveWeight(){
return this._effectiveWeight;
},
fadeIn:function fadeIn(t){
return this._scheduleFading(t,0,1);
},
fadeOut:function fadeOut(t){
return this._scheduleFading(t,1,0);
},
crossFadeFrom:function crossFadeFrom(t,e,n){
if(t.fadeOut(e),this.fadeIn(e),n){
var r=this._clip.duration,
i=t._clip.duration,
a=i/r,
o=r/i;
t.warp(1,a,e),this.warp(o,1,e);
}
return this;
},
crossFadeTo:function crossFadeTo(t,e,n){
return t.crossFadeFrom(this,e,n);
},
stopFading:function stopFading(){
var t=this._weightInterpolant;
return null!==t&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this;
},
setEffectiveTimeScale:function setEffectiveTimeScale(t){
return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping();
},
getEffectiveTimeScale:function getEffectiveTimeScale(){
return this._effectiveTimeScale;
},
setDuration:function setDuration(t){
return this.timeScale=this._clip.duration/t,this.stopWarping();
},
syncWith:function syncWith(t){
return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping();
},
halt:function halt(t){
return this.warp(this._effectiveTimeScale,0,t);
},
warp:function warp(t,e,n){
var r=this._mixer,
i=r.time,
a=this._timeScaleInterpolant,
o=this.timeScale;
null===a&&(a=r._lendControlInterpolant(),this._timeScaleInterpolant=a);
var s=a.parameterPositions,
c=a.sampleValues;
return s[0]=i,s[1]=i+n,c[0]=t/o,c[1]=e/o,this;
},
stopWarping:function stopWarping(){
var t=this._timeScaleInterpolant;
return null!==t&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this;
},
getMixer:function getMixer(){
return this._mixer;
},
getClip:function getClip(){
return this._clip;
},
getRoot:function getRoot(){
return this._localRoot||this._mixer._root;
},
_update:function _update(t,e,n,r){
if(this.enabled){
var i=this._startTime;
if(null!==i){
var a=(t-i)*n;
if(a<0||0===n)return;
this._startTime=null,e=n*a;
}
e*=this._updateTimeScale(t);
var o=this._updateTime(e),
s=this._updateWeight(t);
if(s>0)
for(var c=this._interpolants,l=this._propertyBindings,h=0,u=c.length;h!==u;++h){c[h].evaluate(o),l[h].accumulate(r,s);}
}else this._updateWeight(t);
},
_updateWeight:function _updateWeight(t){
var e=0;
if(this.enabled){
e=this.weight;
var n=this._weightInterpolant;
if(null!==n){
var r=n.evaluate(t)[0];
e*=r,t>n.parameterPositions[1]&&(this.stopFading(),0===r&&(this.enabled=!1));
}
}
return this._effectiveWeight=e,e;
},
_updateTimeScale:function _updateTimeScale(t){
var e=0;
if(!this.paused){
e=this.timeScale;
var n=this._timeScaleInterpolant;
null!==n&&(e*=n.evaluate(t)[0],t>n.parameterPositions[1]&&(this.stopWarping(),0===e?this.paused=!0:this.timeScale=e));
}
return this._effectiveTimeScale=e,e;
},
_updateTime:function _updateTime(t){
var e=this.time+t,
n=this._clip.duration,
r=this.loop,
i=this._loopCount,
a=2202===r;
if(0===t)return-1===i?e:a&&1==(1&i)?n-e:e;
if(2200===r){
-1===i&&(this._loopCount=0,this._setEndings(!0,!0,!1));
t:{
if(e>=n)e=n;else
{
if(!(e<0)){
this.time=e;
break t;
}
e=0;
}
this.clampWhenFinished?this.paused=!0:this.enabled=!1,
this.time=e,
this._mixer.dispatchEvent({
type:"finished",
action:this,
direction:t<0?-1:1});

}
}else{
if(-1===i&&(t>=0?(i=0,this._setEndings(!0,0===this.repetitions,a)):this._setEndings(0===this.repetitions,!0,a)),e>=n||e<0){
var o=Math.floor(e/n);
e-=n*o,i+=Math.abs(o);
var s=this.repetitions-i;
if(s<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,e=t>0?n:0,this.time=e,this._mixer.dispatchEvent({
type:"finished",
action:this,
direction:t>0?1:-1});else

{
if(1===s){
var c=t<0;
this._setEndings(c,!c,a);
}else this._setEndings(!1,!1,a);
this._loopCount=i,this.time=e,this._mixer.dispatchEvent({
type:"loop",
action:this,
loopDelta:o});

}
}else this.time=e;
if(a&&1==(1&i))return n-e;
}
return e;
},
_setEndings:function _setEndings(t,e,n){
var r=this._interpolantSettings;
n?(r.endingStart=2401,r.endingEnd=2401):(r.endingStart=t?this.zeroSlopeAtStart?2401:he:2402,r.endingEnd=e?this.zeroSlopeAtEnd?2401:he:2402);
},
_scheduleFading:function _scheduleFading(t,e,n){
var r=this._mixer,
i=r.time,
a=this._weightInterpolant;
null===a&&(a=r._lendControlInterpolant(),this._weightInterpolant=a);
var o=a.parameterPositions,
s=a.sampleValues;
return o[0]=i,s[0]=e,o[1]=i+t,s[1]=n,this;
}}),
Qh.prototype=Object.assign(Object.create(e.prototype),{
constructor:Qh,
_bindAction:function _bindAction(t,e){
var n=t._localRoot||this._root,
r=t._clip.tracks,
i=r.length,
a=t._propertyBindings,
o=t._interpolants,
s=n.uuid,
c=this._bindingsByRootAndName,
l=c[s];
void 0===l&&(l={},c[s]=l);
for(var h=0;h!==i;++h){
var u=r[h],
p=u.name,
d=l[p];
if(void 0!==d)a[h]=d;else
{
if(void 0!==(d=a[h])){
null===d._cacheIndex&&(++d.referenceCount,this._addInactiveBinding(d,s,p));
continue;
}
var f=e&&e._propertyBindings[h].binding.parsedPath;
++(d=new Fh(Yh.create(n,p,f),u.ValueTypeName,u.getValueSize())).referenceCount,this._addInactiveBinding(d,s,p),a[h]=d;
}
o[h].resultBuffer=d.buffer;
}
},
_activateAction:function _activateAction(t){
if(!this._isActiveAction(t)){
if(null===t._cacheIndex){
var e=(t._localRoot||this._root).uuid,
n=t._clip.uuid,
r=this._actionsByClip[n];
this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,n,e);
}
for(var i=t._propertyBindings,a=0,o=i.length;a!==o;++a){
var s=i[a];
0==s.useCount++&&(this._lendBinding(s),s.saveOriginalState());
}
this._lendAction(t);
}
},
_deactivateAction:function _deactivateAction(t){
if(this._isActiveAction(t)){
for(var e=t._propertyBindings,n=0,r=e.length;n!==r;++n){
var i=e[n];
0==--i.useCount&&(i.restoreOriginalState(),this._takeBackBinding(i));
}
this._takeBackAction(t);
}
},
_initMemoryManager:function _initMemoryManager(){
this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;
var t=this;
this.stats={
actions:{
get total(){
return t._actions.length;
},
get inUse(){
return t._nActiveActions;
}},

bindings:{
get total(){
return t._bindings.length;
},
get inUse(){
return t._nActiveBindings;
}},

controlInterpolants:{
get total(){
return t._controlInterpolants.length;
},
get inUse(){
return t._nActiveControlInterpolants;
}}};


},
_isActiveAction:function _isActiveAction(t){
var e=t._cacheIndex;
return null!==e&&e<this._nActiveActions;
},
_addInactiveAction:function _addInactiveAction(t,e,n){
var r=this._actions,
i=this._actionsByClip,
a=i[e];
if(void 0===a)a={
knownActions:[t],
actionByRoot:{}},
t._byClipCacheIndex=0,i[e]=a;else
{
var o=a.knownActions;
t._byClipCacheIndex=o.length,o.push(t);
}
t._cacheIndex=r.length,r.push(t),a.actionByRoot[n]=t;
},
_removeInactiveAction:function _removeInactiveAction(t){
var e=this._actions,
n=e[e.length-1],
r=t._cacheIndex;
n._cacheIndex=r,e[r]=n,e.pop(),t._cacheIndex=null;
var i=t._clip.uuid,
a=this._actionsByClip,
o=a[i],
s=o.knownActions,
c=s[s.length-1],
l=t._byClipCacheIndex;
c._byClipCacheIndex=l,s[l]=c,s.pop(),t._byClipCacheIndex=null,delete o.actionByRoot[(t._localRoot||this._root).uuid],0===s.length&&delete a[i],this._removeInactiveBindingsForAction(t);
},
_removeInactiveBindingsForAction:function _removeInactiveBindingsForAction(t){
for(var e=t._propertyBindings,n=0,r=e.length;n!==r;++n){
var i=e[n];
0==--i.referenceCount&&this._removeInactiveBinding(i);
}
},
_lendAction:function _lendAction(t){
var e=this._actions,
n=t._cacheIndex,
r=this._nActiveActions++,
i=e[r];
t._cacheIndex=r,e[r]=t,i._cacheIndex=n,e[n]=i;
},
_takeBackAction:function _takeBackAction(t){
var e=this._actions,
n=t._cacheIndex,
r=--this._nActiveActions,
i=e[r];
t._cacheIndex=r,e[r]=t,i._cacheIndex=n,e[n]=i;
},
_addInactiveBinding:function _addInactiveBinding(t,e,n){
var r=this._bindingsByRootAndName,
i=r[e],
a=this._bindings;
void 0===i&&(i={},r[e]=i),i[n]=t,t._cacheIndex=a.length,a.push(t);
},
_removeInactiveBinding:function _removeInactiveBinding(t){
var e=this._bindings,
n=t.binding,
r=n.rootNode.uuid,
i=n.path,
a=this._bindingsByRootAndName,
o=a[r],
s=e[e.length-1],
c=t._cacheIndex;
s._cacheIndex=c,e[c]=s,e.pop(),delete o[i],0===Object.keys(o).length&&delete a[r];
},
_lendBinding:function _lendBinding(t){
var e=this._bindings,
n=t._cacheIndex,
r=this._nActiveBindings++,
i=e[r];
t._cacheIndex=r,e[r]=t,i._cacheIndex=n,e[n]=i;
},
_takeBackBinding:function _takeBackBinding(t){
var e=this._bindings,
n=t._cacheIndex,
r=--this._nActiveBindings,
i=e[r];
t._cacheIndex=r,e[r]=t,i._cacheIndex=n,e[n]=i;
},
_lendControlInterpolant:function _lendControlInterpolant(){
var t=this._controlInterpolants,
e=this._nActiveControlInterpolants++,
n=t[e];
return void 0===n&&((n=new Jc(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer)).__cacheIndex=e,t[e]=n),n;
},
_takeBackControlInterpolant:function _takeBackControlInterpolant(t){
var e=this._controlInterpolants,
n=t.__cacheIndex,
r=--this._nActiveControlInterpolants,
i=e[r];
t.__cacheIndex=r,e[r]=t,i.__cacheIndex=n,e[n]=i;
},
_controlInterpolantsResultBuffer:new Float32Array(1),
clipAction:function clipAction(t,e){
var n=e||this._root,
r=n.uuid,
i="string"==typeof t?al.findByName(n,t):t,
a=null!==i?i.uuid:t,
o=this._actionsByClip[a],
s=null;
if(void 0!==o){
var c=o.actionByRoot[r];
if(void 0!==c)return c;
s=o.knownActions[0],null===i&&(i=s._clip);
}
if(null===i)return null;
var l=new Zh(this,i,e);
return this._bindAction(l,s),this._addInactiveAction(l,a,r),l;
},
existingAction:function existingAction(t,e){
var n=e||this._root,
r=n.uuid,
i="string"==typeof t?al.findByName(n,t):t,
a=i?i.uuid:t,
o=this._actionsByClip[a];
return void 0!==o&&o.actionByRoot[r]||null;
},
stopAllAction:function stopAllAction(){
var t=this._actions,
e=this._nActiveActions,
n=this._bindings,
r=this._nActiveBindings;
this._nActiveActions=0,this._nActiveBindings=0;
for(var i=0;i!==e;++i){t[i].reset();}
for(i=0;i!==r;++i){n[i].useCount=0;}
return this;
},
update:function update(t){
t*=this.timeScale;
for(var e=this._actions,n=this._nActiveActions,r=this.time+=t,i=Math.sign(t),a=this._accuIndex^=1,o=0;o!==n;++o){e[o]._update(r,t,i,a);}
var s=this._bindings,
c=this._nActiveBindings;
for(o=0;o!==c;++o){s[o].apply(a);}
return this;
},
getRoot:function getRoot(){
return this._root;
},
uncacheClip:function uncacheClip(t){
var e=this._actions,
n=t.uuid,
r=this._actionsByClip,
i=r[n];
if(void 0!==i){
for(var a=i.knownActions,o=0,s=a.length;o!==s;++o){
var c=a[o];
this._deactivateAction(c);
var l=c._cacheIndex,
h=e[e.length-1];
c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=l,e[l]=h,e.pop(),this._removeInactiveBindingsForAction(c);
}
delete r[n];
}
},
uncacheRoot:function uncacheRoot(t){
var e=t.uuid,
n=this._actionsByClip;
for(var r in n){
var i=n[r].actionByRoot[e];
void 0!==i&&(this._deactivateAction(i),this._removeInactiveAction(i));
}
var a=this._bindingsByRootAndName[e];
if(void 0!==a)
for(var o in a){
var s=a[o];
s.restoreOriginalState(),this._removeInactiveBinding(s);
}
},
uncacheAction:function uncacheAction(t,e){
var n=this.existingAction(t,e);
null!==n&&(this._deactivateAction(n),this._removeInactiveAction(n));
}}),
Kh.prototype.clone=function(){
return new Kh(void 0===this.value.clone?this.value:this.value.clone());
},$h.prototype=Object.assign(Object.create(Ro.prototype),{
constructor:$h,
isInstancedInterleavedBuffer:!0,
copy:function copy(t){
return Ro.prototype.copy.call(this,t),this.meshPerAttribute=t.meshPerAttribute,this;
}}),
Object.assign(tu.prototype,{
linePrecision:1,
set:function set(t,e){
this.ray.set(t,e);
},
setFromCamera:function setFromCamera(t,e){
e&&e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e&&e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type.");
},
intersectObject:function intersectObject(t,e,n){
var r=n||[];
return nu(t,this,r,e),r.sort(eu),r;
},
intersectObjects:function intersectObjects(t,e,n){
var r=n||[];
if(!1===Array.isArray(t))return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."),r;
for(var i=0,a=t.length;i<a;i++){nu(t[i],this,r,e);}
return r.sort(eu),r;
}}),
Object.assign(ru.prototype,{
set:function set(t,e,n){
return this.radius=t,this.phi=e,this.theta=n,this;
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this;
},
makeSafe:function makeSafe(){
return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this;
},
setFromVector3:function setFromVector3(t){
return this.setFromCartesianCoords(t.x,t.y,t.z);
},
setFromCartesianCoords:function setFromCartesianCoords(t,e,n){
return this.radius=Math.sqrt(t*t+e*e+n*n),0===this.radius?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Pe.clamp(e/this.radius,-1,1))),this;
}}),
Object.assign(iu.prototype,{
set:function set(t,e,n){
return this.radius=t,this.theta=e,this.y=n,this;
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this;
},
setFromVector3:function setFromVector3(t){
return this.setFromCartesianCoords(t.x,t.y,t.z);
},
setFromCartesianCoords:function setFromCartesianCoords(t,e,n){
return this.radius=Math.sqrt(t*t+n*n),this.theta=Math.atan2(t,n),this.y=e,this;
}});

var au=new Ce();

function ou(t,e){
this.min=void 0!==t?t:new Ce(1/0,1/0),this.max=void 0!==e?e:new Ce(-1/0,-1/0);
}
Object.assign(ou.prototype,{
set:function set(t,e){
return this.min.copy(t),this.max.copy(e),this;
},
setFromPoints:function setFromPoints(t){
this.makeEmpty();
for(var e=0,n=t.length;e<n;e++){this.expandByPoint(t[e]);}
return this;
},
setFromCenterAndSize:function setFromCenterAndSize(t,e){
var n=au.copy(e).multiplyScalar(.5);
return this.min.copy(t).sub(n),this.max.copy(t).add(n),this;
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
return this.min.copy(t.min),this.max.copy(t.max),this;
},
makeEmpty:function makeEmpty(){
return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this;
},
isEmpty:function isEmpty(){
return this.max.x<this.min.x||this.max.y<this.min.y;
},
getCenter:function getCenter(t){
return void 0===t&&(console.warn("THREE.Box2: .getCenter() target is now required"),t=new Ce()),this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5);
},
getSize:function getSize(t){
return void 0===t&&(console.warn("THREE.Box2: .getSize() target is now required"),t=new Ce()),this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min);
},
expandByPoint:function expandByPoint(t){
return this.min.min(t),this.max.max(t),this;
},
expandByVector:function expandByVector(t){
return this.min.sub(t),this.max.add(t),this;
},
expandByScalar:function expandByScalar(t){
return this.min.addScalar(-t),this.max.addScalar(t),this;
},
containsPoint:function containsPoint(t){
return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y);
},
containsBox:function containsBox(t){
return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y;
},
getParameter:function getParameter(t,e){
return void 0===e&&(console.warn("THREE.Box2: .getParameter() target is now required"),e=new Ce()),e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y));
},
intersectsBox:function intersectsBox(t){
return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y);
},
clampPoint:function clampPoint(t,e){
return void 0===e&&(console.warn("THREE.Box2: .clampPoint() target is now required"),e=new Ce()),e.copy(t).clamp(this.min,this.max);
},
distanceToPoint:function distanceToPoint(t){
return au.copy(t).clamp(this.min,this.max).sub(t).length();
},
intersect:function intersect(t){
return this.min.max(t.min),this.max.min(t.max),this;
},
union:function union(t){
return this.min.min(t.min),this.max.max(t.max),this;
},
translate:function translate(t){
return this.min.add(t),this.max.add(t),this;
},
equals:function equals(t){
return t.min.equals(this.min)&&t.max.equals(this.max);
}});

var su=new Ie(),
cu=new Ie();

function lu(t,e){
this.start=void 0!==t?t:new Ie(),this.end=void 0!==e?e:new Ie();
}

function hu(t){
gn.call(this),this.material=t,this.render=function(){};
}
Object.assign(lu.prototype,{
set:function set(t,e){
return this.start.copy(t),this.end.copy(e),this;
},
clone:function clone(){
return new this.constructor().copy(this);
},
copy:function copy(t){
return this.start.copy(t.start),this.end.copy(t.end),this;
},
getCenter:function getCenter(t){
return void 0===t&&(console.warn("THREE.Line3: .getCenter() target is now required"),t=new Ie()),t.addVectors(this.start,this.end).multiplyScalar(.5);
},
delta:function delta(t){
return void 0===t&&(console.warn("THREE.Line3: .delta() target is now required"),t=new Ie()),t.subVectors(this.end,this.start);
},
distanceSq:function distanceSq(){
return this.start.distanceToSquared(this.end);
},
distance:function distance(){
return this.start.distanceTo(this.end);
},
at:function at(t,e){
return void 0===e&&(console.warn("THREE.Line3: .at() target is now required"),e=new Ie()),this.delta(e).multiplyScalar(t).add(this.start);
},
closestPointToPointParameter:function closestPointToPointParameter(t,e){
su.subVectors(t,this.start),cu.subVectors(this.end,this.start);
var n=cu.dot(cu),
r=cu.dot(su)/n;
return e&&(r=Pe.clamp(r,0,1)),r;
},
closestPointToPoint:function closestPointToPoint(t,e,n){
var r=this.closestPointToPointParameter(t,e);
return void 0===n&&(console.warn("THREE.Line3: .closestPointToPoint() target is now required"),n=new Ie()),this.delta(n).multiplyScalar(r).add(this.start);
},
applyMatrix4:function applyMatrix4(t){
return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this;
},
equals:function equals(t){
return t.start.equals(this.start)&&t.end.equals(this.end);
}}),
hu.prototype=Object.create(gn.prototype),hu.prototype.constructor=hu,hu.prototype.isImmediateRenderObject=!0;
var uu=new Ie(),
pu=new Ie(),
du=new Fe(),
fu=["a","b","c"];

function mu(t,e,n,r){
this.object=t,this.size=void 0!==e?e:1;
var i=void 0!==n?n:16711680,
a=void 0!==r?r:1,
o=0,
s=this.object.geometry;
s&&s.isGeometry?o=3*s.faces.length:s&&s.isBufferGeometry&&(o=s.attributes.normal.count);
var c=new Pr(),
l=new xr(2*o*3,3);
c.addAttribute("position",l),ls.call(this,c,new ts({
color:i,
linewidth:a})),
this.matrixAutoUpdate=!1,this.update();
}
mu.prototype=Object.create(ls.prototype),mu.prototype.constructor=mu,mu.prototype.update=function(){
this.object.updateMatrixWorld(!0),du.getNormalMatrix(this.object.matrixWorld);
var t=this.object.matrixWorld,
e=this.geometry.attributes.position,
n=this.object.geometry;
if(n&&n.isGeometry)
for(var r=n.vertices,i=n.faces,a=0,o=0,s=i.length;o<s;o++){
for(var c=i[o],l=0,h=c.vertexNormals.length;l<h;l++){
var u=r[c[fu[l]]],
p=c.vertexNormals[l];
uu.copy(u).applyMatrix4(t),pu.copy(p).applyMatrix3(du).normalize().multiplyScalar(this.size).add(uu),e.setXYZ(a,uu.x,uu.y,uu.z),a+=1,e.setXYZ(a,pu.x,pu.y,pu.z),a+=1;
}}else if(n&&n.isBufferGeometry){
var d=n.attributes.position,
f=n.attributes.normal;
for(a=0,l=0,h=d.count;l<h;l++){uu.set(d.getX(l),d.getY(l),d.getZ(l)).applyMatrix4(t),pu.set(f.getX(l),f.getY(l),f.getZ(l)),pu.applyMatrix3(du).normalize().multiplyScalar(this.size).add(uu),e.setXYZ(a,uu.x,uu.y,uu.z),a+=1,e.setXYZ(a,pu.x,pu.y,pu.z),a+=1;}
}
e.needsUpdate=!0;
};
var vu=new Ie();

function gu(t,e){
gn.call(this),this.light=t,this.light.updateMatrixWorld(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=e;
for(var n=new Pr(),r=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1],i=0,a=1;i<32;i++,a++){
var o=i/32*Math.PI*2,
s=a/32*Math.PI*2;
r.push(Math.cos(o),Math.sin(o),1,Math.cos(s),Math.sin(s),1);
}
n.addAttribute("position",new xr(r,3));
var c=new ts({
fog:!1});

this.cone=new ls(n,c),this.add(this.cone),this.update();
}
gu.prototype=Object.create(gn.prototype),gu.prototype.constructor=gu,gu.prototype.dispose=function(){
this.cone.geometry.dispose(),this.cone.material.dispose();
},gu.prototype.update=function(){
this.light.updateMatrixWorld();
var t=this.light.distance?this.light.distance:1e3,
e=t*Math.tan(this.light.angle);
this.cone.scale.set(e,e,t),vu.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(vu),void 0!==this.color?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color);
};
var yu=new Ie(),
xu=new Ke(),
bu=new Ke();

function wu(t){
for(var e=function t(e){
var n=[];
e&&e.isBone&&n.push(e);
for(var r=0;r<e.children.length;r++){n.push.apply(n,t(e.children[r]));}
return n;
}(t),n=new Pr(),r=[],i=[],a=new rr(0,0,1),o=new rr(0,1,0),s=0;s<e.length;s++){
var c=e[s];
c.parent&&c.parent.isBone&&(r.push(0,0,0),r.push(0,0,0),i.push(a.r,a.g,a.b),i.push(o.r,o.g,o.b));
}
n.addAttribute("position",new xr(r,3)),n.addAttribute("color",new xr(i,3));
var l=new ts({
vertexColors:v,
depthTest:!1,
depthWrite:!1,
transparent:!0});

ls.call(this,n,l),this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1;
}

function _u(t,e,n){
this.light=t,this.light.updateMatrixWorld(),this.color=n;
var r=new xc(e,4,2),
i=new hr({
wireframe:!0,
fog:!1});

Yr.call(this,r,i),this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update();
}

function Mu(t,e){
this.type="RectAreaLightHelper",this.light=t,this.color=e;
var n=new Pr();
n.addAttribute("position",new xr([1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],3)),n.computeBoundingSphere();
var r=new ts({
fog:!1});

os.call(this,n,r);
var i=new Pr();
i.addAttribute("position",new xr([1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],3)),i.computeBoundingSphere(),this.add(new Yr(i,new hr({
side:p,
fog:!1}))),
this.update();
}
wu.prototype=Object.create(ls.prototype),wu.prototype.constructor=wu,wu.prototype.updateMatrixWorld=function(t){
var e=this.bones,
n=this.geometry,
r=n.getAttribute("position");
bu.getInverse(this.root.matrixWorld);
for(var i=0,a=0;i<e.length;i++){
var o=e[i];
o.parent&&o.parent.isBone&&(xu.multiplyMatrices(bu,o.matrixWorld),yu.setFromMatrixPosition(xu),r.setXYZ(a,yu.x,yu.y,yu.z),xu.multiplyMatrices(bu,o.parent.matrixWorld),yu.setFromMatrixPosition(xu),r.setXYZ(a+1,yu.x,yu.y,yu.z),a+=2);
}
n.getAttribute("position").needsUpdate=!0,gn.prototype.updateMatrixWorld.call(this,t);
},_u.prototype=Object.create(Yr.prototype),_u.prototype.constructor=_u,_u.prototype.dispose=function(){
this.geometry.dispose(),this.material.dispose();
},_u.prototype.update=function(){
void 0!==this.color?this.material.color.set(this.color):this.material.color.copy(this.light.color);
},Mu.prototype=Object.create(os.prototype),Mu.prototype.constructor=Mu,Mu.prototype.update=function(){
if(this.scale.set(.5*this.light.width,.5*this.light.height,1),void 0!==this.color)this.material.color.set(this.color),this.children[0].material.color.set(this.color);else
{
this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
var t=this.material.color,
e=Math.max(t.r,t.g,t.b);
e>1&&t.multiplyScalar(1/e),this.children[0].material.color.copy(this.material.color);
}
},Mu.prototype.dispose=function(){
this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose();
};
var Su=new Ie(),
Tu=new rr(),
Eu=new rr();

function Au(t,e,n){
gn.call(this),this.light=t,this.light.updateMatrixWorld(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n;
var r=new Ps(e);
r.rotateY(.5*Math.PI),this.material=new hr({
wireframe:!0,
fog:!1}),
void 0===this.color&&(this.material.vertexColors=v);
var i=r.getAttribute("position"),
a=new Float32Array(3*i.count);
r.addAttribute("color",new ur(a,3)),this.add(new Yr(r,this.material)),this.update();
}

function Lu(t,e){
this.lightProbe=t,this.size=e;
var n={
GAMMA_OUTPUT:""},

r=new li({
defines:n,
uniforms:{
sh:{
value:this.lightProbe.sh.coefficients},

intensity:{
value:this.lightProbe.intensity}},


vertexShader:["varying vec3 vNormal;","void main() {","\tvNormal = normalize( normalMatrix * normal );","\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),
fragmentShader:["#define RECIPROCAL_PI 0.318309886","vec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {","\t// matrix is assumed to be orthogonal","\treturn normalize( ( vec4( normal, 0.0 ) * matrix ).xyz );","}","vec3 linearToOutput( in vec3 a ) {","\t#ifdef GAMMA_OUTPUT","\t\treturn pow( a, vec3( 1.0 / float( GAMMA_FACTOR ) ) );","\t#else","\t\treturn a;","\t#endif","}","// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf","vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {","\t// normal is assumed to have unit length","\tfloat x = normal.x, y = normal.y, z = normal.z;","\t// band 0","\tvec3 result = shCoefficients[ 0 ] * 0.886227;","\t// band 1","\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;","\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;","\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;","\t// band 2","\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;","\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;","\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );","\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;","\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );","\treturn result;","}","uniform vec3 sh[ 9 ]; // sh coefficients","uniform float intensity; // light probe intensity","varying vec3 vNormal;","void main() {","\tvec3 normal = normalize( vNormal );","\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );","\tvec3 irradiance = shGetIrradianceAt( worldNormal, sh );","\tvec3 outgoingLight = RECIPROCAL_PI * irradiance * intensity;","\toutgoingLight = linearToOutput( outgoingLight );","\tgl_FragColor = vec4( outgoingLight, 1.0 );","}"].join("\n")}),

i=new xc(1,32,16);
Yr.call(this,i,r),this.onBeforeRender();
}

function Ru(t,e,n,r){
t=t||10,e=e||10,n=new rr(void 0!==n?n:4473924),r=new rr(void 0!==r?r:8947848);
for(var i=e/2,a=t/e,o=t/2,s=[],c=[],l=0,h=0,u=-o;l<=e;l++,u+=a){
s.push(-o,0,u,o,0,u),s.push(u,0,-o,u,0,o);
var p=l===i?n:r;
p.toArray(c,h),h+=3,p.toArray(c,h),h+=3,p.toArray(c,h),h+=3,p.toArray(c,h),h+=3;
}
var d=new Pr();
d.addAttribute("position",new xr(s,3)),d.addAttribute("color",new xr(c,3));
var f=new ts({
vertexColors:v});

ls.call(this,d,f);
}

function Pu(t,e,n,r,i,a){
t=t||10,e=e||16,n=n||8,r=r||64,i=new rr(void 0!==i?i:4473924),a=new rr(void 0!==a?a:8947848);
var o,s,c,l,h,u,p,d=[],
f=[];
for(l=0;l<=e;l++){c=l/e*(2*Math.PI),o=Math.sin(c)*t,s=Math.cos(c)*t,d.push(0,0,0),d.push(o,0,s),p=1&l?i:a,f.push(p.r,p.g,p.b),f.push(p.r,p.g,p.b);}
for(l=0;l<=n;l++){
for(p=1&l?i:a,u=t-t/n*l,h=0;h<r;h++){c=h/r*(2*Math.PI),o=Math.sin(c)*u,s=Math.cos(c)*u,d.push(o,0,s),f.push(p.r,p.g,p.b),c=(h+1)/r*(2*Math.PI),o=Math.sin(c)*u,s=Math.cos(c)*u,d.push(o,0,s),f.push(p.r,p.g,p.b);}}
var m=new Pr();
m.addAttribute("position",new xr(d,3)),m.addAttribute("color",new xr(f,3));
var g=new ts({
vertexColors:v});

ls.call(this,m,g);
}

function Cu(t,e,n,r){
this.audio=t,this.range=e||1,this.divisionsInnerAngle=n||16,this.divisionsOuterAngle=r||2;
var i=new Pr(),
a=this.divisionsInnerAngle+2*this.divisionsOuterAngle,
o=new Float32Array(3*(3*a+3));
i.addAttribute("position",new ur(o,3));
var s=new ts({
color:65280}),

c=new ts({
color:16776960});

os.call(this,i,[c,s]),this.update();
}
Au.prototype=Object.create(gn.prototype),Au.prototype.constructor=Au,Au.prototype.dispose=function(){
this.children[0].geometry.dispose(),this.children[0].material.dispose();
},Au.prototype.update=function(){
var t=this.children[0];
if(void 0!==this.color)this.material.color.set(this.color);else
{
var e=t.geometry.getAttribute("color");
Tu.copy(this.light.color),Eu.copy(this.light.groundColor);
for(var n=0,r=e.count;n<r;n++){
var i=n<r/2?Tu:Eu;
e.setXYZ(n,i.r,i.g,i.b);
}
e.needsUpdate=!0;
}
t.lookAt(Su.setFromMatrixPosition(this.light.matrixWorld).negate());
},Lu.prototype=Object.create(Yr.prototype),Lu.prototype.constructor=Lu,Lu.prototype.dispose=function(){
this.geometry.dispose(),this.material.dispose();
},Lu.prototype.onBeforeRender=function(){
this.position.copy(this.lightProbe.position),this.scale.set(1,1,1).multiplyScalar(this.size),this.material.uniforms.intensity.value=this.lightProbe.intensity;
},Ru.prototype=Object.assign(Object.create(ls.prototype),{
constructor:Ru,
copy:function copy(t){
return ls.prototype.copy.call(this,t),this.geometry.copy(t.geometry),this.material.copy(t.material),this;
},
clone:function clone(){
return new this.constructor().copy(this);
}}),
Pu.prototype=Object.create(ls.prototype),Pu.prototype.constructor=Pu,Cu.prototype=Object.create(os.prototype),Cu.prototype.constructor=Cu,Cu.prototype.update=function(){
var t,e,n=this.audio,
r=this.range,
i=this.divisionsInnerAngle,
a=this.divisionsOuterAngle,
o=Pe.degToRad(n.panner.coneInnerAngle),
s=Pe.degToRad(n.panner.coneOuterAngle),
c=o/2,
l=s/2,
h=0,
u=0,
p=this.geometry,
d=p.attributes.position;

function f(n,i,a,o){
var s=(i-n)/a;
for(d.setXYZ(h,0,0,0),u++,t=n;t<i;t+=s){e=h+u,d.setXYZ(e,Math.sin(t)*r,0,Math.cos(t)*r),d.setXYZ(e+1,Math.sin(Math.min(t+s,i))*r,0,Math.cos(Math.min(t+s,i))*r),d.setXYZ(e+2,0,0,0),u+=3;}
p.addGroup(h,u,o),h+=u,u=0;
}
p.clearGroups(),f(-l,-c,a,0),f(-c,c,i,1),f(c,l,a,0),d.needsUpdate=!0,o===s&&(this.material[0].visible=!1);
},Cu.prototype.dispose=function(){
this.geometry.dispose(),this.material[0].dispose(),this.material[1].dispose();
};
var Ou=new Ie(),
Du=new Ie(),
Nu=new Fe();

function Iu(t,e,n,r){
this.object=t,this.size=void 0!==e?e:1;
var i=void 0!==n?n:16776960,
a=void 0!==r?r:1,
o=0,
s=this.object.geometry;
s&&s.isGeometry?o=s.faces.length:console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");
var c=new Pr(),
l=new xr(2*o*3,3);
c.addAttribute("position",l),ls.call(this,c,new ts({
color:i,
linewidth:a})),
this.matrixAutoUpdate=!1,this.update();
}
Iu.prototype=Object.create(ls.prototype),Iu.prototype.constructor=Iu,Iu.prototype.update=function(){
this.object.updateMatrixWorld(!0),Nu.getNormalMatrix(this.object.matrixWorld);
for(var t=this.object.matrixWorld,e=this.geometry.attributes.position,n=this.object.geometry,r=n.vertices,i=n.faces,a=0,o=0,s=i.length;o<s;o++){
var c=i[o],
l=c.normal;
Ou.copy(r[c.a]).add(r[c.b]).add(r[c.c]).divideScalar(3).applyMatrix4(t),Du.copy(l).applyMatrix3(Nu).normalize().multiplyScalar(this.size).add(Ou),e.setXYZ(a,Ou.x,Ou.y,Ou.z),a+=1,e.setXYZ(a,Du.x,Du.y,Du.z),a+=1;
}
e.needsUpdate=!0;
};
var zu=new Ie(),
Bu=new Ie(),
Fu=new Ie();

function Gu(t,e,n){
gn.call(this),this.light=t,this.light.updateMatrixWorld(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,void 0===e&&(e=1);
var r=new Pr();
r.addAttribute("position",new xr([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));
var i=new ts({
fog:!1});

this.lightPlane=new os(r,i),this.add(this.lightPlane),(r=new Pr()).addAttribute("position",new xr([0,0,0,0,0,1],3)),this.targetLine=new os(r,i),this.add(this.targetLine),this.update();
}
Gu.prototype=Object.create(gn.prototype),Gu.prototype.constructor=Gu,Gu.prototype.dispose=function(){
this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose();
},Gu.prototype.update=function(){
zu.setFromMatrixPosition(this.light.matrixWorld),Bu.setFromMatrixPosition(this.light.target.matrixWorld),Fu.subVectors(Bu,zu),this.lightPlane.lookAt(Bu),void 0!==this.color?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(Bu),this.targetLine.scale.z=Fu.length();
};
var Uu=new Ie(),
Hu=new hi();

function Vu(t){
var e=new Pr(),
n=new ts({
color:16777215,
vertexColors:m}),

r=[],
i=[],
a={},
o=new rr(16755200),
s=new rr(16711680),
c=new rr(43775),
l=new rr(16777215),
h=new rr(3355443);

function u(t,e,n){
p(t,n),p(e,n);
}

function p(t,e){
r.push(0,0,0),i.push(e.r,e.g,e.b),void 0===a[t]&&(a[t]=[]),a[t].push(r.length/3-1);
}
u("n1","n2",o),u("n2","n4",o),u("n4","n3",o),u("n3","n1",o),u("f1","f2",o),u("f2","f4",o),u("f4","f3",o),u("f3","f1",o),u("n1","f1",o),u("n2","f2",o),u("n3","f3",o),u("n4","f4",o),u("p","n1",s),u("p","n2",s),u("p","n3",s),u("p","n4",s),u("u1","u2",c),u("u2","u3",c),u("u3","u1",c),u("c","t",l),u("p","c",h),u("cn1","cn2",h),u("cn3","cn4",h),u("cf1","cf2",h),u("cf3","cf4",h),e.addAttribute("position",new xr(r,3)),e.addAttribute("color",new xr(i,3)),ls.call(this,e,n),this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();
}

function ju(t,e,n,r,i,a,o){
Uu.set(i,a,o).unproject(r);
var s=e[t];
if(void 0!==s)
for(var c=n.getAttribute("position"),l=0,h=s.length;l<h;l++){c.setXYZ(s[l],Uu.x,Uu.y,Uu.z);}
}
Vu.prototype=Object.create(ls.prototype),Vu.prototype.constructor=Vu,Vu.prototype.update=function(){
var t=this.geometry,
e=this.pointMap;
Hu.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),ju("c",e,t,Hu,0,0,-1),ju("t",e,t,Hu,0,0,1),ju("n1",e,t,Hu,-1,-1,-1),ju("n2",e,t,Hu,1,-1,-1),ju("n3",e,t,Hu,-1,1,-1),ju("n4",e,t,Hu,1,1,-1),ju("f1",e,t,Hu,-1,-1,1),ju("f2",e,t,Hu,1,-1,1),ju("f3",e,t,Hu,-1,1,1),ju("f4",e,t,Hu,1,1,1),ju("u1",e,t,Hu,.7,1.1,-1),ju("u2",e,t,Hu,-.7,1.1,-1),ju("u3",e,t,Hu,0,2,-1),ju("cf1",e,t,Hu,-1,0,1),ju("cf2",e,t,Hu,1,0,1),ju("cf3",e,t,Hu,0,-1,1),ju("cf4",e,t,Hu,0,1,1),ju("cn1",e,t,Hu,-1,0,-1),ju("cn2",e,t,Hu,1,0,-1),ju("cn3",e,t,Hu,0,-1,-1),ju("cn4",e,t,Hu,0,1,-1),t.getAttribute("position").needsUpdate=!0;
};
var ku=new Cn();

function Wu(t,e){
this.object=t,void 0===e&&(e=16776960);
var n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),
r=new Float32Array(24),
i=new Pr();
i.setIndex(new ur(n,1)),i.addAttribute("position",new ur(r,3)),ls.call(this,i,new ts({
color:e})),
this.matrixAutoUpdate=!1,this.update();
}

function qu(t,e){
this.type="Box3Helper",this.box=t,e=e||16776960;
var n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),
r=new Pr();
r.setIndex(new ur(n,1)),r.addAttribute("position",new xr([1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],3)),ls.call(this,r,new ts({
color:e})),
this.geometry.computeBoundingSphere();
}

function Xu(t,e,n){
this.type="PlaneHelper",this.plane=t,this.size=void 0===e?1:e;
var r=void 0!==n?n:16776960,
i=new Pr();
i.addAttribute("position",new xr([1,-1,1,-1,1,1,-1,-1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,1,0,0,1,0,0,0],3)),i.computeBoundingSphere(),os.call(this,i,new ts({
color:r}));

var a=new Pr();
a.addAttribute("position",new xr([1,1,1,-1,1,1,-1,-1,1,1,1,1,-1,-1,1,1,-1,1],3)),a.computeBoundingSphere(),this.add(new Yr(a,new hr({
color:r,
opacity:.2,
transparent:!0,
depthWrite:!1})));

}
Wu.prototype=Object.create(ls.prototype),Wu.prototype.constructor=Wu,Wu.prototype.update=function(t){
if(void 0!==t&&console.warn("THREE.BoxHelper: .update() has no longer arguments."),void 0!==this.object&&ku.setFromObject(this.object),!ku.isEmpty()){
var e=ku.min,
n=ku.max,
r=this.geometry.attributes.position,
i=r.array;
i[0]=n.x,i[1]=n.y,i[2]=n.z,i[3]=e.x,i[4]=n.y,i[5]=n.z,i[6]=e.x,i[7]=e.y,i[8]=n.z,i[9]=n.x,i[10]=e.y,i[11]=n.z,i[12]=n.x,i[13]=n.y,i[14]=e.z,i[15]=e.x,i[16]=n.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=n.x,i[22]=e.y,i[23]=e.z,r.needsUpdate=!0,this.geometry.computeBoundingSphere();
}
},Wu.prototype.setFromObject=function(t){
return this.object=t,this.update(),this;
},Wu.prototype.copy=function(t){
return ls.prototype.copy.call(this,t),this.object=t.object,this;
},Wu.prototype.clone=function(){
return new this.constructor().copy(this);
},qu.prototype=Object.create(ls.prototype),qu.prototype.constructor=qu,qu.prototype.updateMatrixWorld=function(t){
var e=this.box;
e.isEmpty()||(e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(.5),gn.prototype.updateMatrixWorld.call(this,t));
},Xu.prototype=Object.create(os.prototype),Xu.prototype.constructor=Xu,Xu.prototype.updateMatrixWorld=function(t){
var e=-this.plane.constant;
Math.abs(e)<1e-8&&(e=1e-8),this.scale.set(.5*this.size,.5*this.size,e),this.children[0].material.side=e<0?p:u,this.lookAt(this.plane.normal),gn.prototype.updateMatrixWorld.call(this,t);
};
var Yu,Ju,Zu=new Ie();

function Qu(t,e,n,r,i,a){
gn.call(this),void 0===t&&(t=new Ie(0,0,1)),void 0===e&&(e=new Ie(0,0,0)),void 0===n&&(n=1),void 0===r&&(r=16776960),void 0===i&&(i=.2*n),void 0===a&&(a=.2*i),void 0===Yu&&((Yu=new Pr()).addAttribute("position",new xr([0,0,0,0,1,0],3)),(Ju=new Rc(0,.5,1,5,1)).translate(0,-.5,0)),this.position.copy(e),this.line=new os(Yu,new ts({
color:r})),
this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Yr(Ju,new hr({
color:r})),
this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,i,a);
}

function Ku(t){
var e=[0,0,0,t=t||1,0,0,0,0,0,0,t,0,0,0,0,0,0,t],
n=new Pr();
n.addAttribute("position",new xr(e,3)),n.addAttribute("color",new xr([1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],3));
var r=new ts({
vertexColors:v});

ls.call(this,n,r);
}

function $u(t){
console.warn("THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."),Al.call(this,t),this.type="catmullrom",this.closed=!0;
}

function tp(t){
console.warn("THREE.SplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."),Al.call(this,t),this.type="catmullrom";
}

function ep(t){
console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead."),Al.call(this,t),this.type="catmullrom";
}
Qu.prototype=Object.create(gn.prototype),Qu.prototype.constructor=Qu,Qu.prototype.setDirection=function(t){
if(t.y>.99999)this.quaternion.set(0,0,0,1);else
if(t.y<-.99999)this.quaternion.set(1,0,0,0);else
{
Zu.set(t.z,0,-t.x).normalize();
var e=Math.acos(t.y);
this.quaternion.setFromAxisAngle(Zu,e);
}
},Qu.prototype.setLength=function(t,e,n){
void 0===e&&(e=.2*t),void 0===n&&(n=.2*e),this.line.scale.set(1,Math.max(0,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix();
},Qu.prototype.setColor=function(t){
this.line.material.color.set(t),this.cone.material.color.set(t);
},Qu.prototype.copy=function(t){
return gn.prototype.copy.call(this,t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this;
},Qu.prototype.clone=function(){
return new this.constructor().copy(this);
},Ku.prototype=Object.create(ls.prototype),Ku.prototype.constructor=Ku,xl.create=function(t,e){
return console.log("THREE.Curve.create() has been deprecated"),t.prototype=Object.create(xl.prototype),t.prototype.constructor=t,t.prototype.getPoint=e,t;
},Object.assign(Gl.prototype,{
createPointsGeometry:function createPointsGeometry(t){
console.warn("THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
var e=this.getPoints(t);
return this.createGeometry(e);
},
createSpacedPointsGeometry:function createSpacedPointsGeometry(t){
console.warn("THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
var e=this.getSpacedPoints(t);
return this.createGeometry(e);
},
createGeometry:function createGeometry(t){
console.warn("THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
for(var e=new ei(),n=0,r=t.length;n<r;n++){
var i=t[n];
e.vertices.push(new Ie(i.x,i.y,i.z||0));
}
return e;
}}),
Object.assign(Ul.prototype,{
fromPoints:function fromPoints(t){
console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."),this.setFromPoints(t);
}}),
$u.prototype=Object.create(Al.prototype),tp.prototype=Object.create(Al.prototype),ep.prototype=Object.create(Al.prototype),Object.assign(ep.prototype,{
initFromArray:function initFromArray(){
console.error("THREE.Spline: .initFromArray() has been removed.");
},
getControlPointsArray:function getControlPointsArray(){
console.error("THREE.Spline: .getControlPointsArray() has been removed.");
},
reparametrizeByArcLength:function reparametrizeByArcLength(){
console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.");
}}),
Ru.prototype.setColors=function(){
console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.");
},wu.prototype.update=function(){
console.error("THREE.SkeletonHelper: update() no longer needs to be called.");
},Object.assign(hl.prototype,{
extractUrlBase:function extractUrlBase(t){
return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."),eh.extractUrlBase(t);
}}),
Object.assign(oh.prototype,{
setTexturePath:function setTexturePath(t){
return console.warn("THREE.ObjectLoader: .setTexturePath() has been renamed to .setResourcePath()."),this.setResourcePath(t);
}}),
Object.assign(ou.prototype,{
center:function center(t){
return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."),this.getCenter(t);
},
empty:function empty(){
return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."),this.isEmpty();
},
isIntersectionBox:function isIntersectionBox(t){
return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(t);
},
size:function size(t){
return console.warn("THREE.Box2: .size() has been renamed to .getSize()."),this.getSize(t);
}}),
Object.assign(Cn.prototype,{
center:function center(t){
return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."),this.getCenter(t);
},
empty:function empty(){
return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),this.isEmpty();
},
isIntersectionBox:function isIntersectionBox(t){
return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(t);
},
isIntersectionSphere:function isIntersectionSphere(t){
return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(t);
},
size:function size(t){
return console.warn("THREE.Box3: .size() has been renamed to .getSize()."),this.getSize(t);
}}),
lu.prototype.center=function(t){
return console.warn("THREE.Line3: .center() has been renamed to .getCenter()."),this.getCenter(t);
},Object.assign(Pe,{
random16:function random16(){
return console.warn("THREE.Math: .random16() has been deprecated. Use Math.random() instead."),Math.random();
},
nearestPowerOfTwo:function nearestPowerOfTwo(t){
return console.warn("THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo()."),Pe.floorPowerOfTwo(t);
},
nextPowerOfTwo:function nextPowerOfTwo(t){
return console.warn("THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo()."),Pe.ceilPowerOfTwo(t);
}}),
Object.assign(Fe.prototype,{
flattenToArrayOffset:function flattenToArrayOffset(t,e){
return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(t,e);
},
multiplyVector3:function multiplyVector3(t){
return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."),t.applyMatrix3(this);
},
multiplyVector3Array:function multiplyVector3Array(){
console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.");
},
applyToBuffer:function applyToBuffer(t){
return console.warn("THREE.Matrix3: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead."),this.applyToBufferAttribute(t);
},
applyToVector3Array:function applyToVector3Array(){
console.error("THREE.Matrix3: .applyToVector3Array() has been removed.");
}}),
Object.assign(Ke.prototype,{
extractPosition:function extractPosition(t){
return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(t);
},
flattenToArrayOffset:function flattenToArrayOffset(t,e){
return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(t,e);
},
getPosition:function getPosition(){
return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."),new Ie().setFromMatrixColumn(this,3);
},
setRotationFromQuaternion:function setRotationFromQuaternion(t){
return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."),this.makeRotationFromQuaternion(t);
},
multiplyToArray:function multiplyToArray(){
console.warn("THREE.Matrix4: .multiplyToArray() has been removed.");
},
multiplyVector3:function multiplyVector3(t){
return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."),t.applyMatrix4(this);
},
multiplyVector4:function multiplyVector4(t){
return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."),t.applyMatrix4(this);
},
multiplyVector3Array:function multiplyVector3Array(){
console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.");
},
rotateAxis:function rotateAxis(t){
console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."),t.transformDirection(this);
},
crossVector:function crossVector(t){
return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."),t.applyMatrix4(this);
},
translate:function translate(){
console.error("THREE.Matrix4: .translate() has been removed.");
},
rotateX:function rotateX(){
console.error("THREE.Matrix4: .rotateX() has been removed.");
},
rotateY:function rotateY(){
console.error("THREE.Matrix4: .rotateY() has been removed.");
},
rotateZ:function rotateZ(){
console.error("THREE.Matrix4: .rotateZ() has been removed.");
},
rotateByAxis:function rotateByAxis(){
console.error("THREE.Matrix4: .rotateByAxis() has been removed.");
},
applyToBuffer:function applyToBuffer(t){
return console.warn("THREE.Matrix4: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead."),this.applyToBufferAttribute(t);
},
applyToVector3Array:function applyToVector3Array(){
console.error("THREE.Matrix4: .applyToVector3Array() has been removed.");
},
makeFrustum:function makeFrustum(t,e,n,r,i,a){
return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."),this.makePerspective(t,e,r,n,i,a);
}}),
bi.prototype.isIntersectionLine=function(t){
return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."),this.intersectsLine(t);
},Oe.prototype.multiplyVector3=function(t){
return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."),t.applyQuaternion(this);
},Object.assign(Vn.prototype,{
isIntersectionBox:function isIntersectionBox(t){
return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(t);
},
isIntersectionPlane:function isIntersectionPlane(t){
return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."),this.intersectsPlane(t);
},
isIntersectionSphere:function isIntersectionSphere(t){
return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(t);
}}),
Object.assign($n.prototype,{
area:function area(){
return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."),this.getArea();
},
barycoordFromPoint:function barycoordFromPoint(t,e){
return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),this.getBarycoord(t,e);
},
midpoint:function midpoint(t){
return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."),this.getMidpoint(t);
},
normal:function normal(t){
return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),this.getNormal(t);
},
plane:function plane(t){
return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."),this.getPlane(t);
}}),
Object.assign($n,{
barycoordFromPoint:function barycoordFromPoint(t,e,n,r,i){
return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),$n.getBarycoord(t,e,n,r,i);
},
normal:function normal(t,e,n,r){
return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),$n.getNormal(t,e,n,r);
}}),
Object.assign(Hl.prototype,{
extractAllPoints:function extractAllPoints(t){
return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."),this.extractPoints(t);
},
extrude:function extrude(t){
return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."),new pc(this,t);
},
makeGeometry:function makeGeometry(t){
return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."),new Sc(this,t);
}}),
Object.assign(Ce.prototype,{
fromAttribute:function fromAttribute(t,e,n){
return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(t,e,n);
},
distanceToManhattan:function distanceToManhattan(t){
return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(t);
},
lengthManhattan:function lengthManhattan(){
return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength();
}}),
Object.assign(Ie.prototype,{
setEulerFromRotationMatrix:function setEulerFromRotationMatrix(){
console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.");
},
setEulerFromQuaternion:function setEulerFromQuaternion(){
console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.");
},
getPositionFromMatrix:function getPositionFromMatrix(t){
return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."),this.setFromMatrixPosition(t);
},
getScaleFromMatrix:function getScaleFromMatrix(t){
return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."),this.setFromMatrixScale(t);
},
getColumnFromMatrix:function getColumnFromMatrix(t,e){
return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."),this.setFromMatrixColumn(e,t);
},
applyProjection:function applyProjection(t){
return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."),this.applyMatrix4(t);
},
fromAttribute:function fromAttribute(t,e,n){
return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(t,e,n);
},
distanceToManhattan:function distanceToManhattan(t){
return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(t);
},
lengthManhattan:function lengthManhattan(){
return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength();
}}),
Object.assign(Ve.prototype,{
fromAttribute:function fromAttribute(t,e,n){
return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(t,e,n);
},
lengthManhattan:function lengthManhattan(){
return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength();
}}),
Object.assign(ei.prototype,{
computeTangents:function computeTangents(){
console.error("THREE.Geometry: .computeTangents() has been removed.");
},
computeLineDistances:function computeLineDistances(){
console.error("THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead.");
}}),
Object.assign(gn.prototype,{
getChildByName:function getChildByName(t){
return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."),this.getObjectByName(t);
},
renderDepth:function renderDepth(){
console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.");
},
translate:function translate(t,e){
return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."),this.translateOnAxis(e,t);
},
getWorldRotation:function getWorldRotation(){
console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.");
}}),
Object.defineProperties(gn.prototype,{
eulerOrder:{
get:function get(){
return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order;
},
set:function set(t){
console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order=t;
}},

useQuaternion:{
get:function get(){
console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.");
},
set:function set(){
console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.");
}}}),

Object.defineProperties(Yo.prototype,{
objects:{
get:function get(){
return console.warn("THREE.LOD: .objects has been renamed to .levels."),this.levels;
}}}),

Object.defineProperty(Ko.prototype,"useVertexTexture",{
get:function get(){
console.warn("THREE.Skeleton: useVertexTexture has been removed.");
},
set:function set(){
console.warn("THREE.Skeleton: useVertexTexture has been removed.");
}}),
Jo.prototype.initBones=function(){
console.error("THREE.SkinnedMesh: initBones() has been removed.");
},Object.defineProperty(xl.prototype,"__arcLengthDivisions",{
get:function get(){
return console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."),this.arcLengthDivisions;
},
set:function set(t){
console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions."),this.arcLengthDivisions=t;
}}),
ui.prototype.setLens=function(t,e){
console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."),void 0!==e&&(this.filmGauge=e),this.setFocalLength(t);
},Object.defineProperties(Vl.prototype,{
onlyShadow:{
set:function set(){
console.warn("THREE.Light: .onlyShadow has been removed.");
}},

shadowCameraFov:{
set:function set(t){
console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."),this.shadow.camera.fov=t;
}},

shadowCameraLeft:{
set:function set(t){
console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."),this.shadow.camera.left=t;
}},

shadowCameraRight:{
set:function set(t){
console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."),this.shadow.camera.right=t;
}},

shadowCameraTop:{
set:function set(t){
console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."),this.shadow.camera.top=t;
}},

shadowCameraBottom:{
set:function set(t){
console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."),this.shadow.camera.bottom=t;
}},

shadowCameraNear:{
set:function set(t){
console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."),this.shadow.camera.near=t;
}},

shadowCameraFar:{
set:function set(t){
console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."),this.shadow.camera.far=t;
}},

shadowCameraVisible:{
set:function set(){
console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.");
}},

shadowBias:{
set:function set(t){
console.warn("THREE.Light: .shadowBias is now .shadow.bias."),this.shadow.bias=t;
}},

shadowDarkness:{
set:function set(){
console.warn("THREE.Light: .shadowDarkness has been removed.");
}},

shadowMapWidth:{
set:function set(t){
console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."),this.shadow.mapSize.width=t;
}},

shadowMapHeight:{
set:function set(t){
console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."),this.shadow.mapSize.height=t;
}}}),

Object.defineProperties(ur.prototype,{
length:{
get:function get(){
return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."),this.array.length;
}},

copyIndicesArray:function copyIndicesArray(){
console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.");
}}),
Object.assign(Pr.prototype,{
addIndex:function addIndex(t){
console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."),this.setIndex(t);
},
addDrawCall:function addDrawCall(t,e,n){
void 0!==n&&console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."),console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."),this.addGroup(t,e);
},
clearDrawCalls:function clearDrawCalls(){
console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."),this.clearGroups();
},
computeTangents:function computeTangents(){
console.warn("THREE.BufferGeometry: .computeTangents() has been removed.");
},
computeOffsets:function computeOffsets(){
console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.");
}}),
Object.defineProperties(Pr.prototype,{
drawcalls:{
get:function get(){
return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."),this.groups;
}},

offsets:{
get:function get(){
return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."),this.groups;
}}}),

Object.assign(dc.prototype,{
getArrays:function getArrays(){
console.error("THREE.ExtrudeBufferGeometry: .getArrays() has been removed.");
},
addShapeList:function addShapeList(){
console.error("THREE.ExtrudeBufferGeometry: .addShapeList() has been removed.");
},
addShape:function addShape(){
console.error("THREE.ExtrudeBufferGeometry: .addShape() has been removed.");
}}),
Object.defineProperties(Kh.prototype,{
dynamic:{
set:function set(){
console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.");
}},

onUpdate:{
value:function value(){
return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."),this;
}}}),

Object.defineProperties(lr.prototype,{
wrapAround:{
get:function get(){
console.warn("THREE.Material: .wrapAround has been removed.");
},
set:function set(){
console.warn("THREE.Material: .wrapAround has been removed.");
}},

overdraw:{
get:function get(){
console.warn("THREE.Material: .overdraw has been removed.");
},
set:function set(){
console.warn("THREE.Material: .overdraw has been removed.");
}},

wrapRGB:{
get:function get(){
return console.warn("THREE.Material: .wrapRGB has been removed."),new rr();
}},

shading:{
get:function get(){
console.error("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead.");
},
set:function set(t){
console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=1===t;
}}}),

Object.defineProperties(Gc.prototype,{
metal:{
get:function get(){
return console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."),!1;
},
set:function set(){
console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead");
}}}),

Object.defineProperties(li.prototype,{
derivatives:{
get:function get(){
return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives;
},
set:function set(t){
console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives=t;
}}}),

Object.assign(Eo.prototype,{
clearTarget:function clearTarget(t,e,n,r){
console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."),this.setRenderTarget(t),this.clear(e,n,r);
},
animate:function animate(t){
console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."),this.setAnimationLoop(t);
},
getCurrentRenderTarget:function getCurrentRenderTarget(){
return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."),this.getRenderTarget();
},
getMaxAnisotropy:function getMaxAnisotropy(){
return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."),this.capabilities.getMaxAnisotropy();
},
getPrecision:function getPrecision(){
return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."),this.capabilities.precision;
},
resetGLState:function resetGLState(){
return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."),this.state.reset();
},
supportsFloatTextures:function supportsFloatTextures(){
return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."),this.extensions.get("OES_texture_float");
},
supportsHalfFloatTextures:function supportsHalfFloatTextures(){
return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."),this.extensions.get("OES_texture_half_float");
},
supportsStandardDerivatives:function supportsStandardDerivatives(){
return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."),this.extensions.get("OES_standard_derivatives");
},
supportsCompressedTextureS3TC:function supportsCompressedTextureS3TC(){
return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."),this.extensions.get("WEBGL_compressed_texture_s3tc");
},
supportsCompressedTexturePVRTC:function supportsCompressedTexturePVRTC(){
return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."),this.extensions.get("WEBGL_compressed_texture_pvrtc");
},
supportsBlendMinMax:function supportsBlendMinMax(){
return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."),this.extensions.get("EXT_blend_minmax");
},
supportsVertexTextures:function supportsVertexTextures(){
return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."),this.capabilities.vertexTextures;
},
supportsInstancedArrays:function supportsInstancedArrays(){
return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."),this.extensions.get("ANGLE_instanced_arrays");
},
enableScissorTest:function enableScissorTest(t){
console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."),this.setScissorTest(t);
},
initMaterial:function initMaterial(){
console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.");
},
addPrePlugin:function addPrePlugin(){
console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.");
},
addPostPlugin:function addPostPlugin(){
console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.");
},
updateShadowMap:function updateShadowMap(){
console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.");
},
setFaceCulling:function setFaceCulling(){
console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.");
},
allocTextureUnit:function allocTextureUnit(){
console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.");
},
setTexture:function setTexture(){
console.warn("THREE.WebGLRenderer: .setTexture() has been removed.");
},
setTexture2D:function setTexture2D(){
console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.");
},
setTextureCube:function setTextureCube(){
console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.");
},
getActiveMipMapLevel:function getActiveMipMapLevel(){
return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."),this.getActiveMipmapLevel();
}}),
Object.defineProperties(Eo.prototype,{
shadowMapEnabled:{
get:function get(){
return this.shadowMap.enabled;
},
set:function set(t){
console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."),this.shadowMap.enabled=t;
}},

shadowMapType:{
get:function get(){
return this.shadowMap.type;
},
set:function set(t){
console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."),this.shadowMap.type=t;
}},

shadowMapCullFace:{
get:function get(){
console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.");
},
set:function set(){
console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.");
}},

context:{
get:function get(){
return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."),this.getContext();
}}}),

Object.defineProperties(fo.prototype,{
cullFace:{
get:function get(){
console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.");
},
set:function set(){
console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.");
}},

renderReverseSided:{
get:function get(){
console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.");
},
set:function set(){
console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.");
}},

renderSingleSided:{
get:function get(){
console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.");
},
set:function set(){
console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.");
}}}),

Object.defineProperties(mi.prototype,{
activeCubeFace:{
set:function set(){
console.warn("THREE.WebGLRenderTargetCube: .activeCubeFace has been removed. It is now the second parameter of WebGLRenderer.setRenderTarget().");
}},

activeMipMapLevel:{
set:function set(){
console.warn("THREE.WebGLRenderTargetCube: .activeMipMapLevel has been removed. It is now the third parameter of WebGLRenderer.setRenderTarget().");
}}}),

Object.defineProperties(je.prototype,{
wrapS:{
get:function get(){
return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS;
},
set:function set(t){
console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS=t;
}},

wrapT:{
get:function get(){
return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT;
},
set:function set(t){
console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT=t;
}},

magFilter:{
get:function get(){
return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter;
},
set:function set(t){
console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter=t;
}},

minFilter:{
get:function get(){
return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter;
},
set:function set(t){
console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter=t;
}},

anisotropy:{
get:function get(){
return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy;
},
set:function set(t){
console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy=t;
}},

offset:{
get:function get(){
return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset;
},
set:function set(t){
console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset=t;
}},

repeat:{
get:function get(){
return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat;
},
set:function set(t){
console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat=t;
}},

format:{
get:function get(){
return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format;
},
set:function set(t){
console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format=t;
}},

type:{
get:function get(){
return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type;
},
set:function set(t){
console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type=t;
}},

generateMipmaps:{
get:function get(){
return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps;
},
set:function set(t){
console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps=t;
}}}),

Object.defineProperties(So.prototype,{
standing:{
set:function set(){
console.warn("THREE.WebVRManager: .standing has been removed.");
}},

userHeight:{
set:function set(){
console.warn("THREE.WebVRManager: .userHeight has been removed.");
}}}),

Ch.prototype.load=function(t){
console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");
var e=this;
return new gh().load(t,function(t){
e.setBuffer(t);
}),this;
},Bh.prototype.getData=function(){
return console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."),this.getFrequencyData();
},fi.prototype.updateCubeMap=function(t,e){
return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),this.update(t,e);
};
var np={
merge:function merge(t,e,n){
var r;
console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead."),e.isMesh&&(e.matrixAutoUpdate&&e.updateMatrix(),r=e.matrix,e=e.geometry),t.merge(e,r,n);
},
center:function center(t){
return console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."),t.center();
}};

Ge.crossOrigin=void 0,Ge.loadTexture=function(t,e,n,r){
console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
var i=new yl();
i.setCrossOrigin(this.crossOrigin);
var a=i.load(t,n,void 0,r);
return e&&(a.mapping=e),a;
},Ge.loadTextureCube=function(t,e,n,r){
console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
var i=new gl();
i.setCrossOrigin(this.crossOrigin);
var a=i.load(t,n,void 0,r);
return e&&(a.mapping=e),a;
},Ge.loadCompressedTexture=function(){
console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.");
},Ge.loadCompressedTextureCube=function(){
console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.");
};
var rp={
createMultiMaterialObject:function createMultiMaterialObject(){
console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js");
},
detach:function detach(){
console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js");
},
attach:function attach(){
console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js");
}};

t.ACESFilmicToneMapping=nt,t.AddEquation=S,t.AddOperation=Z,t.AdditiveBlending=b,t.AlphaFormat=Ct,t.AlwaysDepth=H,t.AlwaysStencilFunc=Ae,t.AmbientLight=Kl,t.AmbientLightProbe=wh,t.AnimationClip=al,t.AnimationLoader=dl,t.AnimationMixer=Qh,t.AnimationObjectGroup=Jh,t.AnimationUtils=qc,t.ArcCurve=wl,t.ArrayCamera=xo,t.ArrowHelper=Qu,t.Audio=Ch,t.AudioAnalyser=Bh,t.AudioContext=vh,t.AudioListener=Ph,t.AudioLoader=gh,t.AxesHelper=Ku,t.AxisHelper=function(t){
return console.warn("THREE.AxisHelper has been renamed to THREE.AxesHelper."),new Ku(t);
},t.BackSide=p,t.BasicDepthPacking=_e,t.BasicShadowMap=0,t.BinaryTextureLoader=function(t){
return console.warn("THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader."),new ml(t);
},t.Bone=$o,t.BooleanKeyframeTrack=Kc,t.BoundingBoxHelper=function(t,e){
return console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead."),new Wu(t,e);
},t.Box2=ou,t.Box3=Cn,t.Box3Helper=qu,t.BoxBufferGeometry=ri,t.BoxGeometry=ni,t.BoxHelper=Wu,t.BufferAttribute=ur,t.BufferGeometry=Pr,t.BufferGeometryLoader=ih,t.ByteType=bt,t.Cache=sl,t.Camera=hi,t.CameraHelper=Vu,t.CanvasRenderer=function(){
console.error("THREE.CanvasRenderer has been removed");
},t.CanvasTexture=bs,t.CatmullRomCurve3=Al,t.CineonToneMapping=et,t.CircleBufferGeometry=Dc,t.CircleGeometry=Oc,t.ClampToEdgeWrapping=ut,t.Clock=Th,t.ClosedSplineCurve3=$u,t.Color=rr,t.ColorKeyframeTrack=$c,t.CompressedTexture=xs,t.CompressedTextureLoader=fl,t.ConeBufferGeometry=Cc,t.ConeGeometry=Pc,t.CubeCamera=fi,t.CubeGeometry=ni,t.CubeReflectionMapping=rt,t.CubeRefractionMapping=it,t.CubeTexture=Vi,t.CubeTextureLoader=gl,t.CubeUVReflectionMapping=ct,t.CubeUVRefractionMapping=lt,t.CubicBezierCurve=Cl,t.CubicBezierCurve3=Ol,t.CubicInterpolant=Yc,t.CullFaceBack=r,t.CullFaceFront=i,t.CullFaceFrontBack=3,t.CullFaceNone=n,t.Curve=xl,t.CurvePath=Gl,t.CustomBlending=M,t.CylinderBufferGeometry=Rc,t.CylinderGeometry=Lc,t.Cylindrical=iu,t.DataTexture=vi,t.DataTexture2DArray=ji,t.DataTexture3D=ki,t.DataTextureLoader=ml,t.DecrementStencilOp=7683,t.DecrementWrapStencilOp=34056,t.DefaultLoadingManager=ll,t.DepthFormat=Bt,t.DepthStencilFormat=Ft,t.DepthTexture=ws,t.DirectionalLight=Ql,t.DirectionalLightHelper=Gu,t.DirectionalLightShadow=Zl,t.DiscreteInterpolant=Zc,t.DodecahedronBufferGeometry=Ns,t.DodecahedronGeometry=Ds,t.DoubleSide=d,t.DstAlphaFactor=I,t.DstColorFactor=B,t.DynamicBufferAttribute=function(t,e){
return console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead."),new ur(t,e).setDynamic(!0);
},t.EdgesGeometry=Ac,t.EdgesHelper=function(t,e){
return console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead."),new ls(new Ac(t.geometry),new ts({
color:void 0!==e?e:16777215}));

},t.EllipseCurve=bl,t.EqualDepth=k,t.EqualStencilFunc=514,t.EquirectangularReflectionMapping=at,t.EquirectangularRefractionMapping=ot,t.Euler=en,t.EventDispatcher=e,t.ExtrudeBufferGeometry=dc,t.ExtrudeGeometry=pc,t.Face3=sr,t.Face4=function(t,e,n,r,i,a,o){
return console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."),new sr(t,e,n,i,a,o);
},t.FaceColors=m,t.FaceNormalsHelper=Iu,t.FileLoader=pl,t.FlatShading=1,t.Float32Attribute=function(t,e){
return console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead."),new xr(t,e);
},t.Float32BufferAttribute=xr,t.Float64Attribute=function(t,e){
return console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead."),new br(t,e);
},t.Float64BufferAttribute=br,t.FloatType=Tt,t.Fog=Lo,t.FogExp2=Ao,t.Font=dh,t.FontLoader=mh,t.FrontFaceDirectionCCW=1,t.FrontFaceDirectionCW=0,t.FrontSide=u,t.Frustum=Mi,t.GammaEncoding=ve,t.Geometry=ei,t.GeometryUtils=np,t.GreaterDepth=q,t.GreaterEqualDepth=W,t.GreaterEqualStencilFunc=518,t.GreaterStencilFunc=516,t.GridHelper=Ru,t.Group=yo,t.HalfFloatType=Et,t.HemisphereLight=jl,t.HemisphereLightHelper=Au,t.HemisphereLightProbe=bh,t.IcosahedronBufferGeometry=Os,t.IcosahedronGeometry=Cs,t.ImageBitmapLoader=uh,t.ImageLoader=vl,t.ImageUtils=Ge,t.ImmediateRenderObject=hu,t.IncrementStencilOp=7682,t.IncrementWrapStencilOp=34055,t.InstancedBufferAttribute=rh,t.InstancedBufferGeometry=nh,t.InstancedInterleavedBuffer=$h,t.Int16Attribute=function(t,e){
return console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead."),new mr(t,e);
},t.Int16BufferAttribute=mr,t.Int32Attribute=function(t,e){
return console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead."),new gr(t,e);
},t.Int32BufferAttribute=gr,t.Int8Attribute=function(t,e){
return console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead."),new pr(t,e);
},t.Int8BufferAttribute=pr,t.IntType=Mt,t.InterleavedBuffer=Ro,t.InterleavedBufferAttribute=Po,t.Interpolant=Xc,t.InterpolateDiscrete=2300,t.InterpolateLinear=2301,t.InterpolateSmooth=2302,t.InvertStencilOp=5386,t.JSONLoader=function(){
console.error("THREE.JSONLoader has been removed.");
},t.KeepStencilOp=Ee,t.KeyframeTrack=Qc,t.LOD=Yo,t.LatheBufferGeometry=Mc,t.LatheGeometry=_c,t.Layers=nn,t.LensFlare=function(){
console.error("THREE.LensFlare has been moved to /examples/js/objects/Lensflare.js");
},t.LessDepth=V,t.LessEqualDepth=j,t.LessEqualStencilFunc=515,t.LessStencilFunc=513,t.Light=Vl,t.LightProbe=xh,t.LightProbeHelper=Lu,t.LightShadow=kl,t.Line=os,t.Line3=lu,t.LineBasicMaterial=ts,t.LineCurve=Dl,t.LineCurve3=Nl,t.LineDashedMaterial=kc,t.LineLoop=hs,t.LinePieces=1,t.LineSegments=ls,t.LineStrip=0,t.LinearEncoding=fe,t.LinearFilter=vt,t.LinearInterpolant=Jc,t.LinearMipMapLinearFilter=1008,t.LinearMipMapNearestFilter=1007,t.LinearMipmapLinearFilter=yt,t.LinearMipmapNearestFilter=gt,t.LinearToneMapping=K,t.Loader=hl,t.LoaderUtils=eh,t.LoadingManager=cl,t.LogLuvEncoding=ye,t.LoopOnce=2200,t.LoopPingPong=2202,t.LoopRepeat=le,t.LuminanceAlphaFormat=It,t.LuminanceFormat=Nt,t.MOUSE={
LEFT:0,
MIDDLE:1,
RIGHT:2,
ROTATE:0,
DOLLY:1,
PAN:2},
t.Material=lr,t.MaterialLoader=th,t.Math=Pe,t.Matrix3=Fe,t.Matrix4=Ke,t.MaxEquation=L,t.Mesh=Yr,t.MeshBasicMaterial=hr,t.MeshDepthMaterial=lo,t.MeshDistanceMaterial=ho,t.MeshFaceMaterial=function(t){
return console.warn("THREE.MeshFaceMaterial has been removed. Use an Array instead."),t;
},t.MeshLambertMaterial=Vc,t.MeshMatcapMaterial=jc,t.MeshNormalMaterial=Hc,t.MeshPhongMaterial=Gc,t.MeshPhysicalMaterial=Fc,t.MeshStandardMaterial=Bc,t.MeshToonMaterial=Uc,t.MinEquation=A,t.MirroredRepeatWrapping=pt,t.MixOperation=J,t.MultiMaterial=function(t){
return void 0===t&&(t=[]),console.warn("THREE.MultiMaterial has been removed. Use an Array instead."),t.isMultiMaterial=!0,t.materials=t,t.clone=function(){
return t.slice();
},t;
},t.MultiplyBlending=_,t.MultiplyOperation=Y,t.NearestFilter=dt,t.NearestMipMapLinearFilter=1005,t.NearestMipMapNearestFilter=1004,t.NearestMipmapLinearFilter=mt,t.NearestMipmapNearestFilter=ft,t.NeverDepth=U,t.NeverStencilFunc=512,t.NoBlending=g,t.NoColors=f,t.NoToneMapping=Q,t.NormalBlending=x,t.NotEqualDepth=X,t.NotEqualStencilFunc=517,t.NumberKeyframeTrack=tl,t.Object3D=gn,t.ObjectLoader=oh,t.ObjectSpaceNormalMap=Te,t.OctahedronBufferGeometry=Ps,t.OctahedronGeometry=Rs,t.OneFactor=P,t.OneMinusDstAlphaFactor=z,t.OneMinusDstColorFactor=F,t.OneMinusSrcAlphaFactor=N,t.OneMinusSrcColorFactor=O,t.OrthographicCamera=Jl,t.PCFShadowMap=c,t.PCFSoftShadowMap=l,t.ParametricBufferGeometry=Ss,t.ParametricGeometry=Ms,t.Particle=function(t){
return console.warn("THREE.Particle has been renamed to THREE.Sprite."),new ko(t);
},t.ParticleBasicMaterial=function(t){
return console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial."),new us(t);
},t.ParticleSystem=function(t,e){
return console.warn("THREE.ParticleSystem has been renamed to THREE.Points."),new vs(t,e);
},t.ParticleSystemMaterial=function(t){
return console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial."),new us(t);
},t.Path=Ul,t.PerspectiveCamera=ui,t.Plane=bi,t.PlaneBufferGeometry=Pi,t.PlaneGeometry=Ri,t.PlaneHelper=Xu,t.PointCloud=function(t,e){
return console.warn("THREE.PointCloud has been renamed to THREE.Points."),new vs(t,e);
},t.PointCloudMaterial=function(t){
return console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial."),new us(t);
},t.PointLight=Yl,t.PointLightHelper=_u,t.Points=vs,t.PointsMaterial=us,t.PolarGridHelper=Pu,t.PolyhedronBufferGeometry=Es,t.PolyhedronGeometry=Ts,t.PositionalAudio=zh,t.PositionalAudioHelper=Cu,t.PropertyBinding=Yh,t.PropertyMixer=Fh,t.QuadraticBezierCurve=Il,t.QuadraticBezierCurve3=zl,t.Quaternion=Oe,t.QuaternionKeyframeTrack=nl,t.QuaternionLinearInterpolant=el,t.REVISION="108",t.RGBADepthPacking=Me,t.RGBAFormat=Dt,t.RGBA_ASTC_10x10_Format=oe,t.RGBA_ASTC_10x5_Format=re,t.RGBA_ASTC_10x6_Format=ie,t.RGBA_ASTC_10x8_Format=ae,t.RGBA_ASTC_12x10_Format=se,t.RGBA_ASTC_12x12_Format=ce,t.RGBA_ASTC_4x4_Format=Jt,t.RGBA_ASTC_5x4_Format=Zt,t.RGBA_ASTC_5x5_Format=Qt,t.RGBA_ASTC_6x5_Format=Kt,t.RGBA_ASTC_6x6_Format=$t,t.RGBA_ASTC_8x5_Format=te,t.RGBA_ASTC_8x6_Format=ee,t.RGBA_ASTC_8x8_Format=ne,t.RGBA_PVRTC_2BPPV1_Format=Xt,t.RGBA_PVRTC_4BPPV1_Format=qt,t.RGBA_S3TC_DXT1_Format=Ht,t.RGBA_S3TC_DXT3_Format=Vt,t.RGBA_S3TC_DXT5_Format=jt,t.RGBDEncoding=we,t.RGBEEncoding=ge,t.RGBEFormat=zt,t.RGBFormat=Ot,t.RGBM16Encoding=be,t.RGBM7Encoding=xe,t.RGB_ETC1_Format=Yt,t.RGB_PVRTC_2BPPV1_Format=Wt,t.RGB_PVRTC_4BPPV1_Format=kt,t.RGB_S3TC_DXT1_Format=Ut,t.RawShaderMaterial=zc,t.Ray=Vn,t.Raycaster=tu,t.RectAreaLight=$l,t.RectAreaLightHelper=Mu,t.RedFormat=Gt,t.ReinhardToneMapping=$,t.RepeatWrapping=ht,t.ReplaceStencilOp=7681,t.ReverseSubtractEquation=E,t.RingBufferGeometry=wc,t.RingGeometry=bc,t.Scene=yn,t.SceneUtils=rp,t.ShaderChunk=Si,t.ShaderLib=Ei,t.ShaderMaterial=li,t.ShadowMaterial=Ic,t.Shape=Hl,t.ShapeBufferGeometry=Tc,t.ShapeGeometry=Sc,t.ShapePath=ph,t.ShapeUtils=lc,t.ShortType=wt,t.Skeleton=Ko,t.SkeletonHelper=wu,t.SkinnedMesh=Jo,t.SmoothShading=2,t.Sphere=Nn,t.SphereBufferGeometry=xc,t.SphereGeometry=yc,t.Spherical=ru,t.SphericalHarmonics3=yh,t.SphericalReflectionMapping=st,t.Spline=ep,t.SplineCurve=Bl,t.SplineCurve3=tp,t.SpotLight=ql,t.SpotLightHelper=gu,t.SpotLightShadow=Wl,t.Sprite=ko,t.SpriteMaterial=Co,t.SrcAlphaFactor=D,t.SrcAlphaSaturateFactor=G,t.SrcColorFactor=C,t.StereoCamera=Sh,t.StringKeyframeTrack=rl,t.SubtractEquation=T,t.SubtractiveBlending=w,t.TOUCH={
ROTATE:0,
PAN:1,
DOLLY_PAN:2,
DOLLY_ROTATE:3},
t.TangentSpaceNormalMap=Se,t.TetrahedronBufferGeometry=Ls,t.TetrahedronGeometry=As,t.TextBufferGeometry=gc,t.TextGeometry=vc,t.Texture=He,t.TextureLoader=yl,t.TorusBufferGeometry=Us,t.TorusGeometry=Gs,t.TorusKnotBufferGeometry=Fs,t.TorusKnotGeometry=Bs,t.Triangle=$n,t.TriangleFanDrawMode=de,t.TriangleStripDrawMode=pe,t.TrianglesDrawMode=ue,t.TubeBufferGeometry=zs,t.TubeGeometry=Is,t.UVMapping=300,t.Uint16Attribute=function(t,e){
return console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead."),new vr(t,e);
},t.Uint16BufferAttribute=vr,t.Uint32Attribute=function(t,e){
return console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead."),new yr(t,e);
},t.Uint32BufferAttribute=yr,t.Uint8Attribute=function(t,e){
return console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead."),new dr(t,e);
},t.Uint8BufferAttribute=dr,t.Uint8ClampedAttribute=function(t,e){
return console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead."),new fr(t,e);
},t.Uint8ClampedBufferAttribute=fr,t.Uncharted2ToneMapping=tt,t.Uniform=Kh,t.UniformsLib=Ti,t.UniformsUtils=oi,t.UnsignedByteType=xt,t.UnsignedInt248Type=Pt,t.UnsignedIntType=St,t.UnsignedShort4444Type=At,t.UnsignedShort5551Type=Lt,t.UnsignedShort565Type=Rt,t.UnsignedShortType=_t,t.VSMShadowMap=h,t.Vector2=Ce,t.Vector3=Ie,t.Vector4=Ve,t.VectorKeyframeTrack=il,t.Vertex=function(t,e,n){
return console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead."),new Ie(t,e,n);
},t.VertexColors=v,t.VertexNormalsHelper=mu,t.VideoTexture=ys,t.WebGLMultisampleRenderTarget=ke,t.WebGLRenderTarget=je,t.WebGLRenderTargetCube=mi,t.WebGLRenderer=Eo,t.WebGLUtils=go,t.WireframeGeometry=_s,t.WireframeHelper=function(t,e){
return console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead."),new ls(new _s(t.geometry),new ts({
color:void 0!==e?e:16777215}));

},t.WrapAroundEnding=2402,t.XHRLoader=function(t){
return console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader."),new pl(t);
},t.ZeroCurvatureEnding=he,t.ZeroFactor=R,t.ZeroSlopeEnding=2401,t.ZeroStencilOp=0,t.sRGBEncoding=me,Object.defineProperty(t,"__esModule",{
value:!0});

},"object"===y(c)&&void 0!==t?i(c): true&&n(0)?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (i),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):i((r=r||self).THREE={}),c;
}
g.UNSEND=0,g.OPENED=1,g.HEADERS_RECEIVED=2,g.LOADING=3,g.DONE=4,n.d(e,"createScopedThreejs",function(){
return x;
});
}]));

/***/ }),
/* 19 */
/*!*************************************************************************!*\
  !*** C:/Users/hyt/Desktop/demoTest/wxcomponents/loaders/gltf-loader.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.registerGLTFLoader = registerGLTFLoader;function registerGLTFLoader(THREE) {

  /**
                                                                                                                                                                * @author Rich Tibbett / https://github.com/richtr
                                                                                                                                                                * @author mrdoob / http://mrdoob.com/
                                                                                                                                                                * @author Tony Parisi / http://www.tonyparisi.com/
                                                                                                                                                                * @author Takahiro / https://github.com/takahirox
                                                                                                                                                                * @author Don McCurdy / https://www.donmccurdy.com
                                                                                                                                                                */

  THREE.GLTFLoader = function () {

    function GLTFLoader(manager) {

      this.manager = manager !== undefined ? manager : THREE.DefaultLoadingManager;
      this.dracoLoader = null;
      this.ddsLoader = null;

    }

    GLTFLoader.prototype = {

      constructor: GLTFLoader,

      crossOrigin: 'anonymous',


      load: function load(url, onLoad, onPageStatus, onProgress, onError) {
        // load: function (url, onLoad, onProgress, onError) {   

        var scope = this;
        var app = getApp();

        var parameter;

        var resourcePath;
        var page = 0; // 全局的3d页面标志
        // var page = app.globalData.page; // 全局的3d页面标志
        var status = 0; //退出页面的页面标志
        if (onPageStatus != undefined) {
          page = onPageStatus();
          status = onPageStatus();
          // console.log("return...." + "page：" + page + "status:" + status)
        }
        // return

        // console.log("status:" + status);
        // if (onProgress != undefined){
        //   status = onProgress();
        // }

        // 获取退出3d界面状态（退出界面后，不执行模型下载操作）
        // if (onPageStatus != undefined) {
        //   status = onPageStatus();
        //   console.log("status1:" + status + " page:" + page);
        //   if (status !== page) {
        //     console.log("结束：" + status);
        //     scope.manager.itemEnd(url);
        //     return
        //   }
        // }

        var date = new Date();
        var threeStartTime = date.getTime();
        // console.log("threeStartTime:" + threeStartTime)

        if (this.resourcePath !== undefined) {

          resourcePath = this.resourcePath;

        } else if (this.path !== undefined) {

          resourcePath = this.path;

        } else {

          resourcePath = THREE.LoaderUtils.extractUrlBase(url);

        }

        var date0 = new Date();
        var threeEndTime = date0.getTime();
        // console.log("开始下载前：", (threeEndTime - threeStartTime) / 1000 + "s");

        // Tells the LoadingManager to track an extra item, which resolves after
        // the model is fully loaded. This means the count of items loaded will
        // be incorrect, but ensures manager.onLoad() does not fire early.
        scope.manager.itemStart(url);

        var date1 = new Date();
        var threeEndTime1 = date1.getTime();
        // console.log("调用开始下载后：", (threeEndTime1 - threeStartTime) / 1000 + "s");

        // console.log("开始下载")
        var _onError = function _onError(e) {

          if (onError) {

            onError(e);

          } else {

            console.error(e);

          }

          scope.manager.itemError(url);
          scope.manager.itemEnd(url);

        };

        var loader = new THREE.FileLoader(scope.manager); //FileLoader 文件下载类

        var date4 = new Date();
        var threeEndTime4 = date4.getTime();
        // console.log("调用文件下载类：", (threeEndTime4 - threeStartTime) / 1000 + "s");


        loader.setPath(this.path);
        loader.setResponseType('arraybuffer');


        if (scope.crossOrigin === 'use-credentials') {

          loader.setWithCredentials(true);

          var date6 = new Date();
          var threeEndTime6 = date6.getTime();
          // console.log("文件下载类判断后：", (threeEndTime6 - threeStartTime) / 1000 + "s");

        }

        var date5 = new Date();
        var threeEndTime5 = date5.getTime();
        // console.log("文件下载类设置地址类型：", (threeEndTime5 - threeStartTime) / 1000 + "s");


        // 获取退出3d界面状态（退出界面后，不执行模型下载操作）
        // if (onPageStatus != undefined) {
        //   status = onPageStatus();
        //   console.log("status2:" + status + "  page:" + page);
        //   if (status !== page) {
        //     console.log("不去下载模型：" + status);
        //     scope.manager.itemEnd(url);
        //     return
        //   }
        // }

        // 最耗时的地方 对数据进行处理
        loader.load(url, function (data) {

          var date2 = new Date();
          var threeEndTime2 = date2.getTime();
          // console.log("调用下载：", (threeEndTime2 - threeStartTime) / 1000 + "s");

          // 获取退出3d界面状态（退出界面后，不执行模型下载操作）
          if (onPageStatus != undefined) {
            status = onPageStatus();
            // console.log("status3:" + status + " page:" + page);
            if (status !== page) {
              // console.log("不下载模型：" + "status:" + status + " page:" + page);
              scope.manager.itemEnd(url);
              return;
            }
          }

          try {

            scope.parse(data, resourcePath, function (gltf) {

              // 获取退出3d界面状态（退出界面后，不执行模型下载操作）
              if (onPageStatus != undefined) {
                status = onPageStatus();
                // console.log("status4:" + status + " page:" + page);
                if (status !== page) {
                  // console.log("不下载模型：" + status);
                  scope.manager.itemEnd(url);
                  return;
                }
              }

              var date7 = new Date();
              var threeEndTime7 = date7.getTime();
              // console.log("下载转换类型：", (threeEndTime7 - threeStartTime) / 1000 + "s");

              onLoad(gltf);

              var date8 = new Date();
              var threeEndTime8 = date8.getTime();
              // console.log("下载模型：", (threeEndTime8 - threeStartTime) / 1000 + "s");

              scope.manager.itemEnd(url);

              var date3 = new Date();
              var threeEndTime3 = date3.getTime();
              // console.log("下载完成后：", (threeEndTime3 - threeStartTime) / 1000 + "s");

              // console.log("下载完成")
            }, _onError);

          } catch (e) {

            _onError(e);

          }

        }, onProgress, _onError);

      },

      setCrossOrigin: function setCrossOrigin(value) {

        this.crossOrigin = value;
        return this;

      },

      setPath: function setPath(value) {

        this.path = value;
        return this;

      },

      setResourcePath: function setResourcePath(value) {

        this.resourcePath = value;
        return this;

      },

      setDRACOLoader: function setDRACOLoader(dracoLoader) {

        this.dracoLoader = dracoLoader;
        return this;

      },

      setDDSLoader: function setDDSLoader(ddsLoader) {

        this.ddsLoader = ddsLoader;
        return this;

      },

      parse: function parse(data, path, onLoad, onError) {

        var content;
        var extensions = {};

        if (typeof data === 'string') {

          content = data;

        } else {


          var magic = THREE.LoaderUtils.decodeText(new Uint8Array(data, 0, 4));

          if (magic === BINARY_EXTENSION_HEADER_MAGIC) {

            try {

              extensions[EXTENSIONS.KHR_BINARY_GLTF] = new GLTFBinaryExtension(data);

            } catch (error) {

              if (onError) onError(error);
              return;

            }

            content = extensions[EXTENSIONS.KHR_BINARY_GLTF].content;

          } else {

            content = THREE.LoaderUtils.decodeText(new Uint8Array(data));

          }

        }

        var json = JSON.parse(content);

        // var json = JSON.parse(content);
        // console.log("json:", json)
        // console.log("json:", json[1])

        if (json.asset === undefined || json.asset.version[0] < 2) {

          if (onError) onError(new Error('THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported. Use LegacyGLTFLoader instead.'));
          return;

        }

        if (json.extensionsUsed) {

          for (var i = 0; i < json.extensionsUsed.length; ++i) {

            var extensionName = json.extensionsUsed[i];
            var extensionsRequired = json.extensionsRequired || [];

            switch (extensionName) {

              case EXTENSIONS.KHR_LIGHTS_PUNCTUAL:
                extensions[extensionName] = new GLTFLightsExtension(json);
                break;

              case EXTENSIONS.KHR_MATERIALS_UNLIT:
                extensions[extensionName] = new GLTFMaterialsUnlitExtension();
                break;

              case EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
                extensions[extensionName] = new GLTFMaterialsPbrSpecularGlossinessExtension();
                break;

              case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
                extensions[extensionName] = new GLTFDracoMeshCompressionExtension(json, this.dracoLoader);
                break;

              case EXTENSIONS.MSFT_TEXTURE_DDS:
                extensions[EXTENSIONS.MSFT_TEXTURE_DDS] = new GLTFTextureDDSExtension(this.ddsLoader);
                break;

              case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
                extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM] = new GLTFTextureTransformExtension();
                break;

              default:

                if (extensionsRequired.indexOf(extensionName) >= 0) {

                  console.warn('THREE.GLTFLoader: Unknown extension "' + extensionName + '".');

                }}



          }

        }

        var parser = new GLTFParser(json, extensions, {

          path: path || this.resourcePath || '',
          crossOrigin: this.crossOrigin,
          manager: this.manager });



        parser.parse(onLoad, onError);

      } };



    /* GLTFREGISTRY */

    function GLTFRegistry() {

      var objects = {};

      return {

        get: function get(key) {

          return objects[key];

        },

        add: function add(key, object) {

          objects[key] = object;

        },

        remove: function remove(key) {

          delete objects[key];

        },

        removeAll: function removeAll() {

          objects = {};

        } };



    }

    /*********************************/
    /********** EXTENSIONS ***********/
    /*********************************/

    var EXTENSIONS = {
      KHR_BINARY_GLTF: 'KHR_binary_glTF',
      KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
      KHR_LIGHTS_PUNCTUAL: 'KHR_lights_punctual',
      KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: 'KHR_materials_pbrSpecularGlossiness',
      KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
      KHR_TEXTURE_TRANSFORM: 'KHR_texture_transform',
      MSFT_TEXTURE_DDS: 'MSFT_texture_dds' };


    /**
                                               * DDS Texture Extension
                                               *
                                               * Specification:
                                               * https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_texture_dds
                                               *
                                               */
    function GLTFTextureDDSExtension(ddsLoader) {

      if (!ddsLoader) {

        throw new Error('THREE.GLTFLoader: Attempting to load .dds texture without importing THREE.DDSLoader');

      }

      this.name = EXTENSIONS.MSFT_TEXTURE_DDS;
      this.ddsLoader = ddsLoader;

    }

    /**
       * Lights Extension
       *
       * Specification: PENDING
       */
    function GLTFLightsExtension(json) {

      this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;

      var extension = json.extensions && json.extensions[EXTENSIONS.KHR_LIGHTS_PUNCTUAL] || {};
      this.lightDefs = extension.lights || [];

    }

    GLTFLightsExtension.prototype.loadLight = function (lightIndex) {

      var lightDef = this.lightDefs[lightIndex];
      var lightNode;

      var color = new THREE.Color(0xffffff);
      if (lightDef.color !== undefined) color.fromArray(lightDef.color);

      var range = lightDef.range !== undefined ? lightDef.range : 0;

      switch (lightDef.type) {

        case 'directional':
          lightNode = new THREE.DirectionalLight(color);
          lightNode.target.position.set(0, 0, -1);
          lightNode.add(lightNode.target);
          break;

        case 'point':
          lightNode = new THREE.PointLight(color);
          lightNode.distance = range;
          break;

        case 'spot':
          lightNode = new THREE.SpotLight(color);
          lightNode.distance = range;
          // Handle spotlight properties.
          lightDef.spot = lightDef.spot || {};
          lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== undefined ? lightDef.spot.innerConeAngle : 0;
          lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== undefined ? lightDef.spot.outerConeAngle : Math.PI / 4.0;
          lightNode.angle = lightDef.spot.outerConeAngle;
          lightNode.penumbra = 1.0 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
          lightNode.target.position.set(0, 0, -1);
          lightNode.add(lightNode.target);
          break;

        default:
          throw new Error('THREE.GLTFLoader: Unexpected light type, "' + lightDef.type + '".');}



      // Some lights (e.g. spot) default to a position other than the origin. Reset the position
      // here, because node-level parsing will only override position if explicitly specified.
      lightNode.position.set(0, 0, 0);

      lightNode.decay = 2;

      if (lightDef.intensity !== undefined) lightNode.intensity = lightDef.intensity;

      lightNode.name = lightDef.name || 'light_' + lightIndex;

      return Promise.resolve(lightNode);

    };

    /**
        * Unlit Materials Extension (pending)
        *
        * PR: https://github.com/KhronosGroup/glTF/pull/1163
        */
    function GLTFMaterialsUnlitExtension() {

      this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;

    }

    GLTFMaterialsUnlitExtension.prototype.getMaterialType = function () {

      return THREE.MeshBasicMaterial;

    };

    GLTFMaterialsUnlitExtension.prototype.extendParams = function (materialParams, materialDef, parser) {

      var pending = [];

      materialParams.color = new THREE.Color(1.0, 1.0, 1.0);
      materialParams.opacity = 1.0;

      var metallicRoughness = materialDef.pbrMetallicRoughness;

      if (metallicRoughness) {

        if (Array.isArray(metallicRoughness.baseColorFactor)) {

          var array = metallicRoughness.baseColorFactor;

          materialParams.color.fromArray(array);
          materialParams.opacity = array[3];

        }

        if (metallicRoughness.baseColorTexture !== undefined) {

          pending.push(parser.assignTexture(materialParams, 'map', metallicRoughness.baseColorTexture));

        }

      }

      return Promise.all(pending);

    };

    /* BINARY EXTENSION */
    var BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
    var BINARY_EXTENSION_HEADER_LENGTH = 12;
    var BINARY_EXTENSION_CHUNK_TYPES = {
      JSON: 0x4E4F534A,
      BIN: 0x004E4942 };


    function GLTFBinaryExtension(data) {

      this.name = EXTENSIONS.KHR_BINARY_GLTF;
      this.content = null;
      this.body = null;

      var headerView = new DataView(data, 0, BINARY_EXTENSION_HEADER_LENGTH);

      this.header = {
        magic: THREE.LoaderUtils.decodeText(new Uint8Array(data.slice(0, 4))),
        version: headerView.getUint32(4, true),
        length: headerView.getUint32(8, true) };


      if (this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC) {

        throw new Error('THREE.GLTFLoader: Unsupported glTF-Binary header.');

      } else if (this.header.version < 2.0) {

        throw new Error('THREE.GLTFLoader: Legacy binary file detected. Use LegacyGLTFLoader instead.');

      }

      var chunkView = new DataView(data, BINARY_EXTENSION_HEADER_LENGTH);
      var chunkIndex = 0;

      while (chunkIndex < chunkView.byteLength) {

        var chunkLength = chunkView.getUint32(chunkIndex, true);
        chunkIndex += 4;

        var chunkType = chunkView.getUint32(chunkIndex, true);
        chunkIndex += 4;

        if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON) {

          var contentArray = new Uint8Array(data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength);
          this.content = THREE.LoaderUtils.decodeText(contentArray);

        } else if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN) {

          var byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
          this.body = data.slice(byteOffset, byteOffset + chunkLength);

        }

        // Clients must ignore chunks with unknown types.

        chunkIndex += chunkLength;

      }

      if (this.content === null) {

        throw new Error('THREE.GLTFLoader: JSON content not found.');

      }

    }

    /**
       * DRACO Mesh Compression Extension
       *
       * Specification: https://github.com/KhronosGroup/glTF/pull/874
       */
    function GLTFDracoMeshCompressionExtension(json, dracoLoader) {

      if (!dracoLoader) {

        throw new Error('THREE.GLTFLoader: No DRACOLoader instance provided.');

      }

      this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
      this.json = json;
      this.dracoLoader = dracoLoader;

    }

    GLTFDracoMeshCompressionExtension.prototype.decodePrimitive = function (primitive, parser) {

      var json = this.json;
      var dracoLoader = this.dracoLoader;
      var bufferViewIndex = primitive.extensions[this.name].bufferView;
      var gltfAttributeMap = primitive.extensions[this.name].attributes;
      var threeAttributeMap = {};
      var attributeNormalizedMap = {};
      var attributeTypeMap = {};

      for (var attributeName in gltfAttributeMap) {

        var threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();

        threeAttributeMap[threeAttributeName] = gltfAttributeMap[attributeName];

      }

      for (attributeName in primitive.attributes) {

        var threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();

        if (gltfAttributeMap[attributeName] !== undefined) {

          var accessorDef = json.accessors[primitive.attributes[attributeName]];
          var componentType = WEBGL_COMPONENT_TYPES[accessorDef.componentType];

          attributeTypeMap[threeAttributeName] = componentType;
          attributeNormalizedMap[threeAttributeName] = accessorDef.normalized === true;

        }

      }

      return parser.getDependency('bufferView', bufferViewIndex).then(function (bufferView) {

        return new Promise(function (resolve) {

          dracoLoader.decodeDracoFile(bufferView, function (geometry) {

            for (var attributeName in geometry.attributes) {

              var attribute = geometry.attributes[attributeName];
              var normalized = attributeNormalizedMap[attributeName];

              if (normalized !== undefined) attribute.normalized = normalized;

            }

            resolve(geometry);

          }, threeAttributeMap, attributeTypeMap);

        });

      });

    };

    /**
        * Texture Transform Extension
        *
        * Specification:
        */
    function GLTFTextureTransformExtension() {

      this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;

    }

    GLTFTextureTransformExtension.prototype.extendTexture = function (texture, transform) {

      texture = texture.clone();

      if (transform.offset !== undefined) {

        texture.offset.fromArray(transform.offset);

      }

      if (transform.rotation !== undefined) {

        texture.rotation = transform.rotation;

      }

      if (transform.scale !== undefined) {

        texture.repeat.fromArray(transform.scale);

      }

      if (transform.texCoord !== undefined) {

        console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.');

      }

      texture.needsUpdate = true;

      return texture;

    };

    /**
        * Specular-Glossiness Extension
        *
        * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness
        */
    function GLTFMaterialsPbrSpecularGlossinessExtension() {

      return {

        name: EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,

        specularGlossinessParams: [
        'color',
        'map',
        'lightMap',
        'lightMapIntensity',
        'aoMap',
        'aoMapIntensity',
        'emissive',
        'emissiveIntensity',
        'emissiveMap',
        'bumpMap',
        'bumpScale',
        'normalMap',
        'displacementMap',
        'displacementScale',
        'displacementBias',
        'specularMap',
        'specular',
        'glossinessMap',
        'glossiness',
        'alphaMap',
        'envMap',
        'envMapIntensity',
        'refractionRatio'],


        getMaterialType: function getMaterialType() {

          return THREE.ShaderMaterial;

        },

        extendParams: function extendParams(materialParams, materialDef, parser) {

          var pbrSpecularGlossiness = materialDef.extensions[this.name];

          var shader = THREE.ShaderLib['standard'];

          var uniforms = THREE.UniformsUtils.clone(shader.uniforms);

          var specularMapParsFragmentChunk = [
          '#ifdef USE_SPECULARMAP',
          '	uniform sampler2D specularMap;',
          '#endif'].
          join('\n');

          var glossinessMapParsFragmentChunk = [
          '#ifdef USE_GLOSSINESSMAP',
          '	uniform sampler2D glossinessMap;',
          '#endif'].
          join('\n');

          var specularMapFragmentChunk = [
          'vec3 specularFactor = specular;',
          '#ifdef USE_SPECULARMAP',
          '	vec4 texelSpecular = texture2D( specularMap, vUv );',
          '	texelSpecular = sRGBToLinear( texelSpecular );',
          '	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture',
          '	specularFactor *= texelSpecular.rgb;',
          '#endif'].
          join('\n');

          var glossinessMapFragmentChunk = [
          'float glossinessFactor = glossiness;',
          '#ifdef USE_GLOSSINESSMAP',
          '	vec4 texelGlossiness = texture2D( glossinessMap, vUv );',
          '	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture',
          '	glossinessFactor *= texelGlossiness.a;',
          '#endif'].
          join('\n');

          var lightPhysicalFragmentChunk = [
          'PhysicalMaterial material;',
          'material.diffuseColor = diffuseColor.rgb;',
          'material.specularRoughness = clamp( 1.0 - glossinessFactor, 0.04, 1.0 );',
          'material.specularColor = specularFactor.rgb;'].
          join('\n');

          var fragmentShader = shader.fragmentShader.
          replace('uniform float roughness;', 'uniform vec3 specular;').
          replace('uniform float metalness;', 'uniform float glossiness;').
          replace('#include <roughnessmap_pars_fragment>', specularMapParsFragmentChunk).
          replace('#include <metalnessmap_pars_fragment>', glossinessMapParsFragmentChunk).
          replace('#include <roughnessmap_fragment>', specularMapFragmentChunk).
          replace('#include <metalnessmap_fragment>', glossinessMapFragmentChunk).
          replace('#include <lights_physical_fragment>', lightPhysicalFragmentChunk);

          delete uniforms.roughness;
          delete uniforms.metalness;
          delete uniforms.roughnessMap;
          delete uniforms.metalnessMap;

          uniforms.specular = {
            value: new THREE.Color().setHex(0x111111) };

          uniforms.glossiness = {
            value: 0.5 };

          uniforms.specularMap = {
            value: null };

          uniforms.glossinessMap = {
            value: null };


          materialParams.vertexShader = shader.vertexShader;
          materialParams.fragmentShader = fragmentShader;
          materialParams.uniforms = uniforms;
          materialParams.defines = {
            'STANDARD': '' };


          materialParams.color = new THREE.Color(1.0, 1.0, 1.0);
          materialParams.opacity = 1.0;

          var pending = [];

          if (Array.isArray(pbrSpecularGlossiness.diffuseFactor)) {

            var array = pbrSpecularGlossiness.diffuseFactor;

            materialParams.color.fromArray(array);
            materialParams.opacity = array[3];

          }

          if (pbrSpecularGlossiness.diffuseTexture !== undefined) {

            pending.push(parser.assignTexture(materialParams, 'map', pbrSpecularGlossiness.diffuseTexture));

          }

          materialParams.emissive = new THREE.Color(0.0, 0.0, 0.0);
          materialParams.glossiness = pbrSpecularGlossiness.glossinessFactor !== undefined ? pbrSpecularGlossiness.glossinessFactor : 1.0;
          materialParams.specular = new THREE.Color(1.0, 1.0, 1.0);

          if (Array.isArray(pbrSpecularGlossiness.specularFactor)) {

            materialParams.specular.fromArray(pbrSpecularGlossiness.specularFactor);

          }

          if (pbrSpecularGlossiness.specularGlossinessTexture !== undefined) {

            var specGlossMapDef = pbrSpecularGlossiness.specularGlossinessTexture;
            pending.push(parser.assignTexture(materialParams, 'glossinessMap', specGlossMapDef));
            pending.push(parser.assignTexture(materialParams, 'specularMap', specGlossMapDef));

          }

          return Promise.all(pending);

        },

        createMaterial: function createMaterial(params) {

          // setup material properties based on MeshStandardMaterial for Specular-Glossiness

          var material = new THREE.ShaderMaterial({
            defines: params.defines,
            vertexShader: params.vertexShader,
            fragmentShader: params.fragmentShader,
            uniforms: params.uniforms,
            fog: true,
            lights: true,
            opacity: params.opacity,
            transparent: params.transparent });


          material.isGLTFSpecularGlossinessMaterial = true;

          material.color = params.color;

          material.map = params.map === undefined ? null : params.map;

          material.lightMap = null;
          material.lightMapIntensity = 1.0;

          material.aoMap = params.aoMap === undefined ? null : params.aoMap;
          material.aoMapIntensity = 1.0;

          material.emissive = params.emissive;
          material.emissiveIntensity = 1.0;
          material.emissiveMap = params.emissiveMap === undefined ? null : params.emissiveMap;

          material.bumpMap = params.bumpMap === undefined ? null : params.bumpMap;
          material.bumpScale = 1;

          material.normalMap = params.normalMap === undefined ? null : params.normalMap;

          if (params.normalScale) material.normalScale = params.normalScale;

          material.displacementMap = null;
          material.displacementScale = 1;
          material.displacementBias = 0;

          material.specularMap = params.specularMap === undefined ? null : params.specularMap;
          material.specular = params.specular;

          material.glossinessMap = params.glossinessMap === undefined ? null : params.glossinessMap;
          material.glossiness = params.glossiness;

          material.alphaMap = null;

          material.envMap = params.envMap === undefined ? null : params.envMap;
          material.envMapIntensity = 1.0;

          material.refractionRatio = 0.98;

          material.extensions.derivatives = true;

          return material;

        },

        /**
            * Clones a GLTFSpecularGlossinessMaterial instance. The ShaderMaterial.copy() method can
            * copy only properties it knows about or inherits, and misses many properties that would
            * normally be defined by MeshStandardMaterial.
            *
            * This method allows GLTFSpecularGlossinessMaterials to be cloned in the process of
            * loading a glTF model, but cloning later (e.g. by the user) would require these changes
            * AND also updating `.onBeforeRender` on the parent mesh.
            *
            * @param  {THREE.ShaderMaterial} source
            * @return {THREE.ShaderMaterial}
            */
        cloneMaterial: function cloneMaterial(source) {

          var target = source.clone();

          target.isGLTFSpecularGlossinessMaterial = true;

          var params = this.specularGlossinessParams;

          for (var i = 0, il = params.length; i < il; i++) {

            var value = source[params[i]];
            target[params[i]] = value && value.isColor ? value.clone() : value;

          }

          return target;

        },

        // Here's based on refreshUniformsCommon() and refreshUniformsStandard() in WebGLRenderer.
        refreshUniforms: function refreshUniforms(renderer, scene, camera, geometry, material) {

          if (material.isGLTFSpecularGlossinessMaterial !== true) {

            return;

          }

          var uniforms = material.uniforms;
          var defines = material.defines;

          uniforms.opacity.value = material.opacity;

          uniforms.diffuse.value.copy(material.color);
          uniforms.emissive.value.copy(material.emissive).multiplyScalar(material.emissiveIntensity);

          uniforms.map.value = material.map;
          uniforms.specularMap.value = material.specularMap;
          uniforms.alphaMap.value = material.alphaMap;

          uniforms.lightMap.value = material.lightMap;
          uniforms.lightMapIntensity.value = material.lightMapIntensity;

          uniforms.aoMap.value = material.aoMap;
          uniforms.aoMapIntensity.value = material.aoMapIntensity;

          // uv repeat and offset setting priorities
          // 1. color map
          // 2. specular map
          // 3. normal map
          // 4. bump map
          // 5. alpha map
          // 6. emissive map

          var uvScaleMap;

          if (material.map) {

            uvScaleMap = material.map;

          } else if (material.specularMap) {

            uvScaleMap = material.specularMap;

          } else if (material.displacementMap) {

            uvScaleMap = material.displacementMap;

          } else if (material.normalMap) {

            uvScaleMap = material.normalMap;

          } else if (material.bumpMap) {

            uvScaleMap = material.bumpMap;

          } else if (material.glossinessMap) {

            uvScaleMap = material.glossinessMap;

          } else if (material.alphaMap) {

            uvScaleMap = material.alphaMap;

          } else if (material.emissiveMap) {

            uvScaleMap = material.emissiveMap;

          }

          if (uvScaleMap !== undefined) {

            // backwards compatibility
            if (uvScaleMap.isWebGLRenderTarget) {

              uvScaleMap = uvScaleMap.texture;

            }

            if (uvScaleMap.matrixAutoUpdate === true) {

              uvScaleMap.updateMatrix();

            }

            uniforms.uvTransform.value.copy(uvScaleMap.matrix);

          }

          if (material.envMap) {

            uniforms.envMap.value = material.envMap;
            uniforms.envMapIntensity.value = material.envMapIntensity;

            // don't flip CubeTexture envMaps, flip everything else:
            //  WebGLRenderTargetCube will be flipped for backwards compatibility
            //  WebGLRenderTargetCube.texture will be flipped because it's a Texture and NOT a CubeTexture
            // this check must be handled differently, or removed entirely, if WebGLRenderTargetCube uses a CubeTexture in the future
            uniforms.flipEnvMap.value = material.envMap.isCubeTexture ? -1 : 1;

            uniforms.reflectivity.value = material.reflectivity;
            uniforms.refractionRatio.value = material.refractionRatio;

            uniforms.maxMipLevel.value = renderer.properties.get(material.envMap).__maxMipLevel;

          }

          uniforms.specular.value.copy(material.specular);
          uniforms.glossiness.value = material.glossiness;

          uniforms.glossinessMap.value = material.glossinessMap;

          uniforms.emissiveMap.value = material.emissiveMap;
          uniforms.bumpMap.value = material.bumpMap;
          uniforms.normalMap.value = material.normalMap;

          uniforms.displacementMap.value = material.displacementMap;
          uniforms.displacementScale.value = material.displacementScale;
          uniforms.displacementBias.value = material.displacementBias;

          if (uniforms.glossinessMap.value !== null && defines.USE_GLOSSINESSMAP === undefined) {

            defines.USE_GLOSSINESSMAP = '';
            // set USE_ROUGHNESSMAP to enable vUv
            defines.USE_ROUGHNESSMAP = '';

          }

          if (uniforms.glossinessMap.value === null && defines.USE_GLOSSINESSMAP !== undefined) {

            delete defines.USE_GLOSSINESSMAP;
            delete defines.USE_ROUGHNESSMAP;

          }

        } };



    }

    /*********************************/
    /********** INTERPOLATION ********/
    /*********************************/

    // Spline Interpolation
    // Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation
    function GLTFCubicSplineInterpolant(parameterPositions, sampleValues, sampleSize, resultBuffer) {

      THREE.Interpolant.call(this, parameterPositions, sampleValues, sampleSize, resultBuffer);

    }

    GLTFCubicSplineInterpolant.prototype = Object.create(THREE.Interpolant.prototype);
    GLTFCubicSplineInterpolant.prototype.constructor = GLTFCubicSplineInterpolant;

    GLTFCubicSplineInterpolant.prototype.copySampleValue_ = function (index) {

      // Copies a sample value to the result buffer. See description of glTF
      // CUBICSPLINE values layout in interpolate_() function below.

      var result = this.resultBuffer,
      values = this.sampleValues,
      valueSize = this.valueSize,
      offset = index * valueSize * 3 + valueSize;

      for (var i = 0; i !== valueSize; i++) {

        result[i] = values[offset + i];

      }

      return result;

    };

    GLTFCubicSplineInterpolant.prototype.beforeStart_ = GLTFCubicSplineInterpolant.prototype.copySampleValue_;

    GLTFCubicSplineInterpolant.prototype.afterEnd_ = GLTFCubicSplineInterpolant.prototype.copySampleValue_;

    GLTFCubicSplineInterpolant.prototype.interpolate_ = function (i1, t0, t, t1) {

      var result = this.resultBuffer;
      var values = this.sampleValues;
      var stride = this.valueSize;

      var stride2 = stride * 2;
      var stride3 = stride * 3;

      var td = t1 - t0;

      var p = (t - t0) / td;
      var pp = p * p;
      var ppp = pp * p;

      var offset1 = i1 * stride3;
      var offset0 = offset1 - stride3;

      var s2 = -2 * ppp + 3 * pp;
      var s3 = ppp - pp;
      var s0 = 1 - s2;
      var s1 = s3 - pp + p;

      // Layout of keyframe output values for CUBICSPLINE animations:
      //   [ inTangent_1, splineVertex_1, outTangent_1, inTangent_2, splineVertex_2, ... ]
      for (var i = 0; i !== stride; i++) {

        var p0 = values[offset0 + i + stride]; // splineVertex_k
        var m0 = values[offset0 + i + stride2] * td; // outTangent_k * (t_k+1 - t_k)
        var p1 = values[offset1 + i + stride]; // splineVertex_k+1
        var m1 = values[offset1 + i] * td; // inTangent_k+1 * (t_k+1 - t_k)

        result[i] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;

      }

      return result;

    };

    /*********************************/
    /********** INTERNALS ************/
    /*********************************/

    /* CONSTANTS */

    var WEBGL_CONSTANTS = {
      FLOAT: 5126,
      //FLOAT_MAT2: 35674,
      FLOAT_MAT3: 35675,
      FLOAT_MAT4: 35676,
      FLOAT_VEC2: 35664,
      FLOAT_VEC3: 35665,
      FLOAT_VEC4: 35666,
      LINEAR: 9729,
      REPEAT: 10497,
      SAMPLER_2D: 35678,
      POINTS: 0,
      LINES: 1,
      LINE_LOOP: 2,
      LINE_STRIP: 3,
      TRIANGLES: 4,
      TRIANGLE_STRIP: 5,
      TRIANGLE_FAN: 6,
      UNSIGNED_BYTE: 5121,
      UNSIGNED_SHORT: 5123 };


    var WEBGL_COMPONENT_TYPES = {
      5120: Int8Array,
      5121: Uint8Array,
      5122: Int16Array,
      5123: Uint16Array,
      5125: Uint32Array,
      5126: Float32Array };


    var WEBGL_FILTERS = {
      9728: THREE.NearestFilter,
      9729: THREE.LinearFilter,
      9984: THREE.NearestMipmapNearestFilter,
      9985: THREE.LinearMipmapNearestFilter,
      9986: THREE.NearestMipmapLinearFilter,
      9987: THREE.LinearMipmapLinearFilter };


    var WEBGL_WRAPPINGS = {
      33071: THREE.ClampToEdgeWrapping,
      33648: THREE.MirroredRepeatWrapping,
      10497: THREE.RepeatWrapping };


    var WEBGL_TYPE_SIZES = {
      'SCALAR': 1,
      'VEC2': 2,
      'VEC3': 3,
      'VEC4': 4,
      'MAT2': 4,
      'MAT3': 9,
      'MAT4': 16 };


    var ATTRIBUTES = {
      POSITION: 'position',
      NORMAL: 'normal',
      TANGENT: 'tangent',
      TEXCOORD_0: 'uv',
      TEXCOORD_1: 'uv2',
      COLOR_0: 'color',
      WEIGHTS_0: 'skinWeight',
      JOINTS_0: 'skinIndex' };


    var PATH_PROPERTIES = {
      scale: 'scale',
      translation: 'position',
      rotation: 'quaternion',
      weights: 'morphTargetInfluences' };


    var INTERPOLATION = {
      CUBICSPLINE: undefined, // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
      // keyframe track will be initialized with a default interpolation type, then modified.
      LINEAR: THREE.InterpolateLinear,
      STEP: THREE.InterpolateDiscrete };


    var ALPHA_MODES = {
      OPAQUE: 'OPAQUE',
      MASK: 'MASK',
      BLEND: 'BLEND' };


    var MIME_TYPE_FORMATS = {
      'image/png': THREE.RGBAFormat,
      'image/jpeg': THREE.RGBFormat };


    /* UTILITY FUNCTIONS */

    function resolveURL(url, path) {

      // Invalid URL
      if (typeof url !== 'string' || url === '') return '';

      // Host Relative URL
      if (/^https?:\/\//i.test(path) && /^\//.test(url)) {

        path = path.replace(/(^https?:\/\/[^\/]+).*/i, '$1');

      }

      // Absolute URL http://,https://,//
      if (/^(https?:)?\/\//i.test(url)) return url;

      // Data URI
      if (/^data:.*,.*$/i.test(url)) return url;

      // Blob URL
      if (/^blob:.*$/i.test(url)) return url;

      // Relative URL
      return path + url;

    }

    var defaultMaterial;

    /**
                          * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#default-material
                          */
    function createDefaultMaterial() {

      defaultMaterial = defaultMaterial || new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        emissive: 0x000000,
        metalness: 1,
        roughness: 1,
        transparent: false,
        depthTest: true,
        side: THREE.FrontSide });


      return defaultMaterial;

    }

    function addUnknownExtensionsToUserData(knownExtensions, object, objectDef) {

      // Add unknown glTF extensions to an object's userData.

      for (var name in objectDef.extensions) {

        if (knownExtensions[name] === undefined) {

          object.userData.gltfExtensions = object.userData.gltfExtensions || {};
          object.userData.gltfExtensions[name] = objectDef.extensions[name];

        }

      }

    }

    /**
       * @param {THREE.Object3D|THREE.Material|THREE.BufferGeometry} object
       * @param {GLTF.definition} gltfDef
       */
    function assignExtrasToUserData(object, gltfDef) {

      if (gltfDef.extras !== undefined) {

        if (typeof gltfDef.extras === 'object') {

          Object.assign(object.userData, gltfDef.extras);

        } else {

          console.warn('THREE.GLTFLoader: Ignoring primitive type .extras, ' + gltfDef.extras);

        }

      }

    }

    /**
       * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets
       *
       * @param {THREE.BufferGeometry} geometry
       * @param {Array<GLTF.Target>} targets
       * @param {GLTFParser} parser
       * @return {Promise<THREE.BufferGeometry>}
       */
    function addMorphTargets(geometry, targets, parser) {

      var hasMorphPosition = false;
      var hasMorphNormal = false;

      for (var i = 0, il = targets.length; i < il; i++) {

        var target = targets[i];

        if (target.POSITION !== undefined) hasMorphPosition = true;
        if (target.NORMAL !== undefined) hasMorphNormal = true;

        if (hasMorphPosition && hasMorphNormal) break;

      }

      if (!hasMorphPosition && !hasMorphNormal) return Promise.resolve(geometry);

      var pendingPositionAccessors = [];
      var pendingNormalAccessors = [];

      for (var i = 0, il = targets.length; i < il; i++) {

        var target = targets[i];

        if (hasMorphPosition) {

          var pendingAccessor = target.POSITION !== undefined ?
          parser.getDependency('accessor', target.POSITION) :
          geometry.attributes.position;

          pendingPositionAccessors.push(pendingAccessor);

        }

        if (hasMorphNormal) {

          var pendingAccessor = target.NORMAL !== undefined ?
          parser.getDependency('accessor', target.NORMAL) :
          geometry.attributes.normal;

          pendingNormalAccessors.push(pendingAccessor);

        }

      }

      return Promise.all([
      Promise.all(pendingPositionAccessors),
      Promise.all(pendingNormalAccessors)]).
      then(function (accessors) {

        var morphPositions = accessors[0];
        var morphNormals = accessors[1];

        // Clone morph target accessors before modifying them.

        for (var i = 0, il = morphPositions.length; i < il; i++) {

          if (geometry.attributes.position === morphPositions[i]) continue;

          morphPositions[i] = cloneBufferAttribute(morphPositions[i]);

        }

        for (var i = 0, il = morphNormals.length; i < il; i++) {

          if (geometry.attributes.normal === morphNormals[i]) continue;

          morphNormals[i] = cloneBufferAttribute(morphNormals[i]);

        }

        for (var i = 0, il = targets.length; i < il; i++) {

          var target = targets[i];
          var attributeName = 'morphTarget' + i;

          if (hasMorphPosition) {

            // Three.js morph position is absolute value. The formula is
            //   basePosition
            //     + weight0 * ( morphPosition0 - basePosition )
            //     + weight1 * ( morphPosition1 - basePosition )
            //     ...
            // while the glTF one is relative
            //   basePosition
            //     + weight0 * glTFmorphPosition0
            //     + weight1 * glTFmorphPosition1
            //     ...
            // then we need to convert from relative to absolute here.

            if (target.POSITION !== undefined) {

              var positionAttribute = morphPositions[i];
              positionAttribute.name = attributeName;

              var position = geometry.attributes.position;

              for (var j = 0, jl = positionAttribute.count; j < jl; j++) {

                positionAttribute.setXYZ(
                j,
                positionAttribute.getX(j) + position.getX(j),
                positionAttribute.getY(j) + position.getY(j),
                positionAttribute.getZ(j) + position.getZ(j));


              }

            }

          }

          if (hasMorphNormal) {

            // see target.POSITION's comment

            if (target.NORMAL !== undefined) {

              var normalAttribute = morphNormals[i];
              normalAttribute.name = attributeName;

              var normal = geometry.attributes.normal;

              for (var j = 0, jl = normalAttribute.count; j < jl; j++) {

                normalAttribute.setXYZ(
                j,
                normalAttribute.getX(j) + normal.getX(j),
                normalAttribute.getY(j) + normal.getY(j),
                normalAttribute.getZ(j) + normal.getZ(j));


              }

            }

          }

        }

        if (hasMorphPosition) geometry.morphAttributes.position = morphPositions;
        if (hasMorphNormal) geometry.morphAttributes.normal = morphNormals;

        return geometry;

      });

    }

    /**
       * @param {THREE.Mesh} mesh
       * @param {GLTF.Mesh} meshDef
       */
    function updateMorphTargets(mesh, meshDef) {

      mesh.updateMorphTargets();

      if (meshDef.weights !== undefined) {

        for (var i = 0, il = meshDef.weights.length; i < il; i++) {

          mesh.morphTargetInfluences[i] = meshDef.weights[i];

        }

      }

      // .extras has user-defined data, so check that .extras.targetNames is an array.
      if (meshDef.extras && Array.isArray(meshDef.extras.targetNames)) {

        var targetNames = meshDef.extras.targetNames;

        if (mesh.morphTargetInfluences.length === targetNames.length) {

          mesh.morphTargetDictionary = {};

          for (var i = 0, il = targetNames.length; i < il; i++) {

            mesh.morphTargetDictionary[targetNames[i]] = i;

          }

        } else {

          console.warn('THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.');

        }

      }

    }

    function createPrimitiveKey(primitiveDef) {

      var dracoExtension = primitiveDef.extensions && primitiveDef.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION];
      var geometryKey;

      if (dracoExtension) {

        geometryKey = 'draco:' + dracoExtension.bufferView +
        ':' + dracoExtension.indices +
        ':' + createAttributesKey(dracoExtension.attributes);

      } else {

        geometryKey = primitiveDef.indices + ':' + createAttributesKey(primitiveDef.attributes) + ':' + primitiveDef.mode;

      }

      return geometryKey;

    }

    function createAttributesKey(attributes) {

      var attributesKey = '';

      var keys = Object.keys(attributes).sort();

      for (var i = 0, il = keys.length; i < il; i++) {

        attributesKey += keys[i] + ':' + attributes[keys[i]] + ';';

      }

      return attributesKey;

    }

    function cloneBufferAttribute(attribute) {

      if (attribute.isInterleavedBufferAttribute) {

        var count = attribute.count;
        var itemSize = attribute.itemSize;
        var array = attribute.array.slice(0, count * itemSize);

        for (var i = 0, j = 0; i < count; ++i) {

          array[j++] = attribute.getX(i);
          if (itemSize >= 2) array[j++] = attribute.getY(i);
          if (itemSize >= 3) array[j++] = attribute.getZ(i);
          if (itemSize >= 4) array[j++] = attribute.getW(i);

        }

        return new THREE.BufferAttribute(array, itemSize, attribute.normalized);

      }

      return attribute.clone();

    }

    /* GLTF PARSER */

    function GLTFParser(json, extensions, options) {

      this.json = json || {};
      this.extensions = extensions || {};
      this.options = options || {};

      // loader object cache
      this.cache = new GLTFRegistry();

      // BufferGeometry caching
      this.primitiveCache = {};

      this.textureLoader = new THREE.TextureLoader(this.options.manager);
      this.textureLoader.setCrossOrigin(this.options.crossOrigin);

      this.fileLoader = new THREE.FileLoader(this.options.manager);
      this.fileLoader.setResponseType('arraybuffer');

      if (this.options.crossOrigin === 'use-credentials') {

        this.fileLoader.setWithCredentials(true);

      }

    }

    GLTFParser.prototype.parse = function (onLoad, onError) {

      var parser = this;
      var json = this.json;
      var extensions = this.extensions;

      // Clear the loader cache
      this.cache.removeAll();

      // Mark the special nodes/meshes in json for efficient parse
      this.markDefs();

      Promise.all([

      this.getDependencies('scene'),
      this.getDependencies('animation'),
      this.getDependencies('camera')]).

      then(function (dependencies) {

        var result = {
          scene: dependencies[0][json.scene || 0],
          scenes: dependencies[0],
          animations: dependencies[1],
          cameras: dependencies[2],
          asset: json.asset,
          parser: parser,
          userData: {} };


        addUnknownExtensionsToUserData(extensions, result, json);

        assignExtrasToUserData(result, json);

        onLoad(result);

      }).catch(onError);

    };

    /**
        * Marks the special nodes/meshes in json for efficient parse.
        */
    GLTFParser.prototype.markDefs = function () {

      var nodeDefs = this.json.nodes || [];
      var skinDefs = this.json.skins || [];
      var meshDefs = this.json.meshes || [];

      var meshReferences = {};
      var meshUses = {};

      // Nothing in the node definition indicates whether it is a Bone or an
      // Object3D. Use the skins' joint references to mark bones.
      for (var skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex++) {

        var joints = skinDefs[skinIndex].joints;

        for (var i = 0, il = joints.length; i < il; i++) {

          nodeDefs[joints[i]].isBone = true;

        }

      }

      // Meshes can (and should) be reused by multiple nodes in a glTF asset. To
      // avoid having more than one THREE.Mesh with the same name, count
      // references and rename instances below.
      //
      // Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
      for (var nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {

        var nodeDef = nodeDefs[nodeIndex];

        if (nodeDef.mesh !== undefined) {

          if (meshReferences[nodeDef.mesh] === undefined) {

            meshReferences[nodeDef.mesh] = meshUses[nodeDef.mesh] = 0;

          }

          meshReferences[nodeDef.mesh]++;

          // Nothing in the mesh definition indicates whether it is
          // a SkinnedMesh or Mesh. Use the node's mesh reference
          // to mark SkinnedMesh if node has skin.
          if (nodeDef.skin !== undefined) {

            meshDefs[nodeDef.mesh].isSkinnedMesh = true;

          }

        }

      }

      this.json.meshReferences = meshReferences;
      this.json.meshUses = meshUses;

    };

    /**
        * Requests the specified dependency asynchronously, with caching.
        * @param {string} type
        * @param {number} index
        * @return {Promise<THREE.Object3D|THREE.Material|THREE.Texture|THREE.AnimationClip|ArrayBuffer|Object>}
        */
    GLTFParser.prototype.getDependency = function (type, index) {

      var cacheKey = type + ':' + index;
      var dependency = this.cache.get(cacheKey);

      if (!dependency) {

        switch (type) {

          case 'scene':
            dependency = this.loadScene(index);
            break;

          case 'node':
            dependency = this.loadNode(index);
            break;

          case 'mesh':
            dependency = this.loadMesh(index);
            break;

          case 'accessor':
            dependency = this.loadAccessor(index);
            break;

          case 'bufferView':
            dependency = this.loadBufferView(index);
            break;

          case 'buffer':
            dependency = this.loadBuffer(index);
            break;

          case 'material':
            dependency = this.loadMaterial(index);
            break;

          case 'texture':
            dependency = this.loadTexture(index);
            break;

          case 'skin':
            dependency = this.loadSkin(index);
            break;

          case 'animation':
            dependency = this.loadAnimation(index);
            break;

          case 'camera':
            dependency = this.loadCamera(index);
            break;

          case 'light':
            dependency = this.extensions[EXTENSIONS.KHR_LIGHTS_PUNCTUAL].loadLight(index);
            break;

          default:
            throw new Error('Unknown type: ' + type);}



        this.cache.add(cacheKey, dependency);

      }

      return dependency;

    };

    /**
        * Requests all dependencies of the specified type asynchronously, with caching.
        * @param {string} type
        * @return {Promise<Array<Object>>}
        */
    GLTFParser.prototype.getDependencies = function (type) {

      var dependencies = this.cache.get(type);

      if (!dependencies) {

        var parser = this;
        var defs = this.json[type + (type === 'mesh' ? 'es' : 's')] || [];

        dependencies = Promise.all(defs.map(function (def, index) {

          return parser.getDependency(type, index);

        }));

        this.cache.add(type, dependencies);

      }

      return dependencies;

    };

    /**
        * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
        * @param {number} bufferIndex
        * @return {Promise<ArrayBuffer>}
        */
    GLTFParser.prototype.loadBuffer = function (bufferIndex) {

      var bufferDef = this.json.buffers[bufferIndex];
      var loader = this.fileLoader;

      if (bufferDef.type && bufferDef.type !== 'arraybuffer') {

        throw new Error('THREE.GLTFLoader: ' + bufferDef.type + ' buffer type is not supported.');

      }

      // If present, GLB container is required to be the first buffer.
      if (bufferDef.uri === undefined && bufferIndex === 0) {

        return Promise.resolve(this.extensions[EXTENSIONS.KHR_BINARY_GLTF].body);

      }

      var options = this.options;

      return new Promise(function (resolve, reject) {

        loader.load(resolveURL(bufferDef.uri, options.path), resolve, undefined, function () {

          reject(new Error('THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".'));

        });

      });

    };

    /**
        * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
        * @param {number} bufferViewIndex
        * @return {Promise<ArrayBuffer>}
        */
    GLTFParser.prototype.loadBufferView = function (bufferViewIndex) {

      var bufferViewDef = this.json.bufferViews[bufferViewIndex];

      return this.getDependency('buffer', bufferViewDef.buffer).then(function (buffer) {

        var byteLength = bufferViewDef.byteLength || 0;
        var byteOffset = bufferViewDef.byteOffset || 0;
        return buffer.slice(byteOffset, byteOffset + byteLength);

      });

    };

    /**
        * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
        * @param {number} accessorIndex
        * @return {Promise<THREE.BufferAttribute|THREE.InterleavedBufferAttribute>}
        */
    GLTFParser.prototype.loadAccessor = function (accessorIndex) {

      var parser = this;
      var json = this.json;

      var accessorDef = this.json.accessors[accessorIndex];

      if (accessorDef.bufferView === undefined && accessorDef.sparse === undefined) {

        // Ignore empty accessors, which may be used to declare runtime
        // information about attributes coming from another source (e.g. Draco
        // compression extension).
        return Promise.resolve(null);

      }

      var pendingBufferViews = [];

      if (accessorDef.bufferView !== undefined) {

        pendingBufferViews.push(this.getDependency('bufferView', accessorDef.bufferView));

      } else {

        pendingBufferViews.push(null);

      }

      if (accessorDef.sparse !== undefined) {

        pendingBufferViews.push(this.getDependency('bufferView', accessorDef.sparse.indices.bufferView));
        pendingBufferViews.push(this.getDependency('bufferView', accessorDef.sparse.values.bufferView));

      }

      return Promise.all(pendingBufferViews).then(function (bufferViews) {

        var bufferView = bufferViews[0];

        var itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
        var TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];

        // For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.
        var elementBytes = TypedArray.BYTES_PER_ELEMENT;
        var itemBytes = elementBytes * itemSize;
        var byteOffset = accessorDef.byteOffset || 0;
        var byteStride = accessorDef.bufferView !== undefined ? json.bufferViews[accessorDef.bufferView].byteStride : undefined;
        var normalized = accessorDef.normalized === true;
        var array, bufferAttribute;

        // The buffer is not interleaved if the stride is the item size in bytes.
        if (byteStride && byteStride !== itemBytes) {

          // Each "slice" of the buffer, as defined by 'count' elements of 'byteStride' bytes, gets its own InterleavedBuffer
          // This makes sure that IBA.count reflects accessor.count properly
          var ibSlice = Math.floor(byteOffset / byteStride);
          var ibCacheKey = 'InterleavedBuffer:' + accessorDef.bufferView + ':' + accessorDef.componentType + ':' + ibSlice + ':' + accessorDef.count;
          var ib = parser.cache.get(ibCacheKey);

          if (!ib) {

            array = new TypedArray(bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes);

            // Integer parameters to IB/IBA are in array elements, not bytes.
            ib = new THREE.InterleavedBuffer(array, byteStride / elementBytes);

            parser.cache.add(ibCacheKey, ib);

          }

          bufferAttribute = new THREE.InterleavedBufferAttribute(ib, itemSize, byteOffset % byteStride / elementBytes, normalized);

        } else {

          if (bufferView === null) {

            array = new TypedArray(accessorDef.count * itemSize);

          } else {

            array = new TypedArray(bufferView, byteOffset, accessorDef.count * itemSize);

          }

          bufferAttribute = new THREE.BufferAttribute(array, itemSize, normalized);

        }

        // https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#sparse-accessors
        if (accessorDef.sparse !== undefined) {

          var itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
          var TypedArrayIndices = WEBGL_COMPONENT_TYPES[accessorDef.sparse.indices.componentType];

          var byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
          var byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;

          var sparseIndices = new TypedArrayIndices(bufferViews[1], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices);
          var sparseValues = new TypedArray(bufferViews[2], byteOffsetValues, accessorDef.sparse.count * itemSize);

          if (bufferView !== null) {

            // Avoid modifying the original ArrayBuffer, if the bufferView wasn't initialized with zeroes.
            bufferAttribute.setArray(bufferAttribute.array.slice());

          }

          for (var i = 0, il = sparseIndices.length; i < il; i++) {

            var index = sparseIndices[i];

            bufferAttribute.setX(index, sparseValues[i * itemSize]);
            if (itemSize >= 2) bufferAttribute.setY(index, sparseValues[i * itemSize + 1]);
            if (itemSize >= 3) bufferAttribute.setZ(index, sparseValues[i * itemSize + 2]);
            if (itemSize >= 4) bufferAttribute.setW(index, sparseValues[i * itemSize + 3]);
            if (itemSize >= 5) throw new Error('THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.');

          }

        }

        return bufferAttribute;

      });

    };

    /**
        * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
        * @param {number} textureIndex
        * @return {Promise<THREE.Texture>}
        */
    GLTFParser.prototype.loadTexture = function (textureIndex) {

      var parser = this;
      var json = this.json;
      var options = this.options;
      var textureLoader = this.textureLoader;

      var URL = window.URL || window.webkitURL;

      var textureDef = json.textures[textureIndex];

      var textureExtensions = textureDef.extensions || {};

      var source;

      if (textureExtensions[EXTENSIONS.MSFT_TEXTURE_DDS]) {

        source = json.images[textureExtensions[EXTENSIONS.MSFT_TEXTURE_DDS].source];

      } else {

        source = json.images[textureDef.source];

      }

      var sourceURI = source.uri;
      var isObjectURL = false;

      if (source.bufferView !== undefined) {

        // Load binary image data from bufferView, if provided.

        sourceURI = parser.getDependency('bufferView', source.bufferView).then(function (bufferView) {

          isObjectURL = true;
          var blob = new Blob([bufferView], {
            type: source.mimeType });

          sourceURI = URL.createObjectURL(blob);
          return sourceURI;

        });

      }

      return Promise.resolve(sourceURI).then(function (sourceURI) {

        // Load Texture resource.

        var loader = THREE.Loader.Handlers.get(sourceURI);

        if (!loader) {

          loader = textureExtensions[EXTENSIONS.MSFT_TEXTURE_DDS] ?
          parser.extensions[EXTENSIONS.MSFT_TEXTURE_DDS].ddsLoader :
          textureLoader;

        }

        return new Promise(function (resolve, reject) {

          loader.load(resolveURL(sourceURI, options.path), resolve, undefined, reject);

        });

      }).then(function (texture) {

        // Clean up resources and configure Texture.

        if (isObjectURL === true) {

          URL.revokeObjectURL(sourceURI);

        }

        texture.flipY = false;

        if (textureDef.name !== undefined) texture.name = textureDef.name;

        // Ignore unknown mime types, like DDS files.
        if (source.mimeType in MIME_TYPE_FORMATS) {

          texture.format = MIME_TYPE_FORMATS[source.mimeType];

        }

        var samplers = json.samplers || {};
        var sampler = samplers[textureDef.sampler] || {};

        texture.magFilter = WEBGL_FILTERS[sampler.magFilter] || THREE.LinearFilter;
        texture.minFilter = WEBGL_FILTERS[sampler.minFilter] || THREE.LinearMipmapLinearFilter;
        texture.wrapS = WEBGL_WRAPPINGS[sampler.wrapS] || THREE.RepeatWrapping;
        texture.wrapT = WEBGL_WRAPPINGS[sampler.wrapT] || THREE.RepeatWrapping;

        return texture;

      });

    };

    /**
        * Asynchronously assigns a texture to the given material parameters.
        * @param {Object} materialParams
        * @param {string} mapName
        * @param {Object} mapDef
        * @return {Promise}
        */
    GLTFParser.prototype.assignTexture = function (materialParams, mapName, mapDef) {

      var parser = this;

      return this.getDependency('texture', mapDef.index).then(function (texture) {

        if (!texture.isCompressedTexture) {

          switch (mapName) {

            case 'aoMap':
            case 'emissiveMap':
            case 'metalnessMap':
            case 'normalMap':
            case 'roughnessMap':
              texture.format = THREE.RGBFormat;
              break;}



        }

        if (parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]) {

          var transform = mapDef.extensions !== undefined ? mapDef.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM] : undefined;

          if (transform) {

            texture = parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM].extendTexture(texture, transform);

          }

        }

        materialParams[mapName] = texture;

      });

    };

    /**
        * Assigns final material to a Mesh, Line, or Points instance. The instance
        * already has a material (generated from the glTF material options alone)
        * but reuse of the same glTF material may require multiple threejs materials
        * to accomodate different primitive types, defines, etc. New materials will
        * be created if necessary, and reused from a cache.
        * @param  {THREE.Object3D} mesh Mesh, Line, or Points instance.
        */
    GLTFParser.prototype.assignFinalMaterial = function (mesh) {

      var geometry = mesh.geometry;
      var material = mesh.material;
      var extensions = this.extensions;

      var useVertexTangents = geometry.attributes.tangent !== undefined;
      var useVertexColors = geometry.attributes.color !== undefined;
      var useFlatShading = geometry.attributes.normal === undefined;
      var useSkinning = mesh.isSkinnedMesh === true;
      var useMorphTargets = Object.keys(geometry.morphAttributes).length > 0;
      var useMorphNormals = useMorphTargets && geometry.morphAttributes.normal !== undefined;

      if (mesh.isPoints) {

        var cacheKey = 'PointsMaterial:' + material.uuid;

        var pointsMaterial = this.cache.get(cacheKey);

        if (!pointsMaterial) {

          pointsMaterial = new THREE.PointsMaterial();
          THREE.Material.prototype.copy.call(pointsMaterial, material);
          pointsMaterial.color.copy(material.color);
          pointsMaterial.map = material.map;
          pointsMaterial.lights = false; // PointsMaterial doesn't support lights yet
          pointsMaterial.sizeAttenuation = false; // glTF spec says points should be 1px

          this.cache.add(cacheKey, pointsMaterial);

        }

        material = pointsMaterial;

      } else if (mesh.isLine) {

        var cacheKey = 'LineBasicMaterial:' + material.uuid;

        var lineMaterial = this.cache.get(cacheKey);

        if (!lineMaterial) {

          lineMaterial = new THREE.LineBasicMaterial();
          THREE.Material.prototype.copy.call(lineMaterial, material);
          lineMaterial.color.copy(material.color);
          lineMaterial.lights = false; // LineBasicMaterial doesn't support lights yet

          this.cache.add(cacheKey, lineMaterial);

        }

        material = lineMaterial;

      }

      // Clone the material if it will be modified
      if (useVertexTangents || useVertexColors || useFlatShading || useSkinning || useMorphTargets) {

        var cacheKey = 'ClonedMaterial:' + material.uuid + ':';

        if (material.isGLTFSpecularGlossinessMaterial) cacheKey += 'specular-glossiness:';
        if (useSkinning) cacheKey += 'skinning:';
        if (useVertexTangents) cacheKey += 'vertex-tangents:';
        if (useVertexColors) cacheKey += 'vertex-colors:';
        if (useFlatShading) cacheKey += 'flat-shading:';
        if (useMorphTargets) cacheKey += 'morph-targets:';
        if (useMorphNormals) cacheKey += 'morph-normals:';

        var cachedMaterial = this.cache.get(cacheKey);

        if (!cachedMaterial) {

          cachedMaterial = material.isGLTFSpecularGlossinessMaterial ?
          extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].cloneMaterial(material) :
          material.clone();

          if (useSkinning) cachedMaterial.skinning = true;
          if (useVertexTangents) cachedMaterial.vertexTangents = true;
          if (useVertexColors) cachedMaterial.vertexColors = THREE.VertexColors;
          if (useFlatShading) cachedMaterial.flatShading = true;
          if (useMorphTargets) cachedMaterial.morphTargets = true;
          if (useMorphNormals) cachedMaterial.morphNormals = true;

          this.cache.add(cacheKey, cachedMaterial);

        }

        material = cachedMaterial;

      }

      // workarounds for mesh and geometry

      if (material.aoMap && geometry.attributes.uv2 === undefined && geometry.attributes.uv !== undefined) {

        console.log('THREE.GLTFLoader: Duplicating UVs to support aoMap.');
        geometry.addAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));

      }

      if (material.isGLTFSpecularGlossinessMaterial) {

        // for GLTFSpecularGlossinessMaterial(ShaderMaterial) uniforms runtime update
        mesh.onBeforeRender = extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].refreshUniforms;

      }

      mesh.material = material;

    };

    /**
        * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
        * @param {number} materialIndex
        * @return {Promise<THREE.Material>}
        */
    GLTFParser.prototype.loadMaterial = function (materialIndex) {

      var parser = this;
      var json = this.json;
      var extensions = this.extensions;
      var materialDef = json.materials[materialIndex];

      var materialType;
      var materialParams = {};
      var materialExtensions = materialDef.extensions || {};

      var pending = [];

      if (materialExtensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {

        var sgExtension = extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
        materialType = sgExtension.getMaterialType();
        pending.push(sgExtension.extendParams(materialParams, materialDef, parser));

      } else if (materialExtensions[EXTENSIONS.KHR_MATERIALS_UNLIT]) {

        var kmuExtension = extensions[EXTENSIONS.KHR_MATERIALS_UNLIT];
        materialType = kmuExtension.getMaterialType();
        pending.push(kmuExtension.extendParams(materialParams, materialDef, parser));

      } else {

        // Specification:
        // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material

        materialType = THREE.MeshStandardMaterial;

        var metallicRoughness = materialDef.pbrMetallicRoughness || {};

        materialParams.color = new THREE.Color(1.0, 1.0, 1.0);
        materialParams.opacity = 1.0;

        if (Array.isArray(metallicRoughness.baseColorFactor)) {

          var array = metallicRoughness.baseColorFactor;

          materialParams.color.fromArray(array);
          materialParams.opacity = array[3];

        }

        if (metallicRoughness.baseColorTexture !== undefined) {

          pending.push(parser.assignTexture(materialParams, 'map', metallicRoughness.baseColorTexture));

        }

        materialParams.metalness = metallicRoughness.metallicFactor !== undefined ? metallicRoughness.metallicFactor : 1.0;
        materialParams.roughness = metallicRoughness.roughnessFactor !== undefined ? metallicRoughness.roughnessFactor : 1.0;

        if (metallicRoughness.metallicRoughnessTexture !== undefined) {

          pending.push(parser.assignTexture(materialParams, 'metalnessMap', metallicRoughness.metallicRoughnessTexture));
          pending.push(parser.assignTexture(materialParams, 'roughnessMap', metallicRoughness.metallicRoughnessTexture));

        }

      }

      if (materialDef.doubleSided === true) {

        materialParams.side = THREE.DoubleSide;

      }

      var alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;

      if (alphaMode === ALPHA_MODES.BLEND) {

        materialParams.transparent = true;

      } else {

        materialParams.transparent = false;

        if (alphaMode === ALPHA_MODES.MASK) {

          materialParams.alphaTest = materialDef.alphaCutoff !== undefined ? materialDef.alphaCutoff : 0.5;

        }

      }

      if (materialDef.normalTexture !== undefined && materialType !== THREE.MeshBasicMaterial) {

        pending.push(parser.assignTexture(materialParams, 'normalMap', materialDef.normalTexture));

        materialParams.normalScale = new THREE.Vector2(1, 1);

        if (materialDef.normalTexture.scale !== undefined) {

          materialParams.normalScale.set(materialDef.normalTexture.scale, materialDef.normalTexture.scale);

        }

      }

      if (materialDef.occlusionTexture !== undefined && materialType !== THREE.MeshBasicMaterial) {

        pending.push(parser.assignTexture(materialParams, 'aoMap', materialDef.occlusionTexture));

        if (materialDef.occlusionTexture.strength !== undefined) {

          materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;

        }

      }

      if (materialDef.emissiveFactor !== undefined && materialType !== THREE.MeshBasicMaterial) {

        materialParams.emissive = new THREE.Color().fromArray(materialDef.emissiveFactor);

      }

      if (materialDef.emissiveTexture !== undefined && materialType !== THREE.MeshBasicMaterial) {

        pending.push(parser.assignTexture(materialParams, 'emissiveMap', materialDef.emissiveTexture));

      }

      return Promise.all(pending).then(function () {

        var material;

        if (materialType === THREE.ShaderMaterial) {

          material = extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(materialParams);

        } else {

          material = new materialType(materialParams);

        }

        if (materialDef.name !== undefined) material.name = materialDef.name;

        // baseColorTexture, emissiveTexture, and specularGlossinessTexture use sRGB encoding.
        if (material.map) material.map.encoding = THREE.sRGBEncoding;
        if (material.emissiveMap) material.emissiveMap.encoding = THREE.sRGBEncoding;
        if (material.specularMap) material.specularMap.encoding = THREE.sRGBEncoding;

        assignExtrasToUserData(material, materialDef);

        if (materialDef.extensions) addUnknownExtensionsToUserData(extensions, material, materialDef);

        return material;

      });

    };

    /**
        * @param {THREE.BufferGeometry} geometry
        * @param {GLTF.Primitive} primitiveDef
        * @param {GLTFParser} parser
        * @return {Promise<THREE.BufferGeometry>}
        */
    function addPrimitiveAttributes(geometry, primitiveDef, parser) {

      var attributes = primitiveDef.attributes;

      var pending = [];

      function assignAttributeAccessor(accessorIndex, attributeName) {

        return parser.getDependency('accessor', accessorIndex).
        then(function (accessor) {

          geometry.addAttribute(attributeName, accessor);

        });

      }

      for (var gltfAttributeName in attributes) {

        var threeAttributeName = ATTRIBUTES[gltfAttributeName] || gltfAttributeName.toLowerCase();

        // Skip attributes already provided by e.g. Draco extension.
        if (threeAttributeName in geometry.attributes) continue;

        pending.push(assignAttributeAccessor(attributes[gltfAttributeName], threeAttributeName));

      }

      if (primitiveDef.indices !== undefined && !geometry.index) {

        var accessor = parser.getDependency('accessor', primitiveDef.indices).then(function (accessor) {

          geometry.setIndex(accessor);

        });

        pending.push(accessor);

      }

      assignExtrasToUserData(geometry, primitiveDef);

      return Promise.all(pending).then(function () {

        return primitiveDef.targets !== undefined ?
        addMorphTargets(geometry, primitiveDef.targets, parser) :
        geometry;

      });

    }

    /**
       * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
       *
       * Creates BufferGeometries from primitives.
       *
       * @param {Array<GLTF.Primitive>} primitives
       * @return {Promise<Array<THREE.BufferGeometry>>}
       */
    GLTFParser.prototype.loadGeometries = function (primitives) {

      var parser = this;
      var extensions = this.extensions;
      var cache = this.primitiveCache;

      function createDracoPrimitive(primitive) {

        return extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION].
        decodePrimitive(primitive, parser).
        then(function (geometry) {

          return addPrimitiveAttributes(geometry, primitive, parser);

        });

      }

      var pending = [];

      for (var i = 0, il = primitives.length; i < il; i++) {

        var primitive = primitives[i];
        var cacheKey = createPrimitiveKey(primitive);

        // See if we've already created this geometry
        var cached = cache[cacheKey];

        if (cached) {

          // Use the cached geometry if it exists
          pending.push(cached.promise);

        } else {

          var geometryPromise;

          if (primitive.extensions && primitive.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]) {

            // Use DRACO geometry if available
            geometryPromise = createDracoPrimitive(primitive);

          } else {

            // Otherwise create a new geometry
            geometryPromise = addPrimitiveAttributes(new THREE.BufferGeometry(), primitive, parser);

          }

          // Cache this geometry
          cache[cacheKey] = {
            primitive: primitive,
            promise: geometryPromise };


          pending.push(geometryPromise);

        }

      }

      return Promise.all(pending);

    };

    /**
        * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
        * @param {number} meshIndex
        * @return {Promise<THREE.Group|THREE.Mesh|THREE.SkinnedMesh>}
        */
    GLTFParser.prototype.loadMesh = function (meshIndex) {

      var parser = this;
      var json = this.json;

      var meshDef = json.meshes[meshIndex];
      var primitives = meshDef.primitives;

      var pending = [];

      for (var i = 0, il = primitives.length; i < il; i++) {

        var material = primitives[i].material === undefined ?
        createDefaultMaterial() :
        this.getDependency('material', primitives[i].material);

        pending.push(material);

      }

      return Promise.all(pending).then(function (originalMaterials) {

        return parser.loadGeometries(primitives).then(function (geometries) {

          var meshes = [];

          for (var i = 0, il = geometries.length; i < il; i++) {

            var geometry = geometries[i];
            var primitive = primitives[i];

            // 1. create Mesh

            var mesh;

            var material = originalMaterials[i];

            if (primitive.mode === WEBGL_CONSTANTS.TRIANGLES ||
            primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ||
            primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ||
            primitive.mode === undefined) {

              // .isSkinnedMesh isn't in glTF spec. See .markDefs()
              mesh = meshDef.isSkinnedMesh === true ?
              new THREE.SkinnedMesh(geometry, material) :
              new THREE.Mesh(geometry, material);

              if (mesh.isSkinnedMesh === true && !mesh.geometry.attributes.skinWeight.normalized) {

                // we normalize floating point skin weight array to fix malformed assets (see #15319)
                // it's important to skip this for non-float32 data since normalizeSkinWeights assumes non-normalized inputs
                mesh.normalizeSkinWeights();

              }

              if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP) {

                mesh.drawMode = THREE.TriangleStripDrawMode;

              } else if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN) {

                mesh.drawMode = THREE.TriangleFanDrawMode;

              }

            } else if (primitive.mode === WEBGL_CONSTANTS.LINES) {

              mesh = new THREE.LineSegments(geometry, material);

            } else if (primitive.mode === WEBGL_CONSTANTS.LINE_STRIP) {

              mesh = new THREE.Line(geometry, material);

            } else if (primitive.mode === WEBGL_CONSTANTS.LINE_LOOP) {

              mesh = new THREE.LineLoop(geometry, material);

            } else if (primitive.mode === WEBGL_CONSTANTS.POINTS) {

              mesh = new THREE.Points(geometry, material);

            } else {

              throw new Error('THREE.GLTFLoader: Primitive mode unsupported: ' + primitive.mode);

            }

            if (Object.keys(mesh.geometry.morphAttributes).length > 0) {

              updateMorphTargets(mesh, meshDef);

            }

            mesh.name = meshDef.name || 'mesh_' + meshIndex;

            if (geometries.length > 1) mesh.name += '_' + i;

            assignExtrasToUserData(mesh, meshDef);

            parser.assignFinalMaterial(mesh);

            meshes.push(mesh);

          }

          if (meshes.length === 1) {

            return meshes[0];

          }

          var group = new THREE.Group();

          for (var i = 0, il = meshes.length; i < il; i++) {

            group.add(meshes[i]);

          }

          return group;

        });

      });

    };

    /**
        * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
        * @param {number} cameraIndex
        * @return {Promise<THREE.Camera>}
        */
    GLTFParser.prototype.loadCamera = function (cameraIndex) {

      var camera;
      var cameraDef = this.json.cameras[cameraIndex];
      var params = cameraDef[cameraDef.type];

      if (!params) {

        console.warn('THREE.GLTFLoader: Missing camera parameters.');
        return;

      }

      if (cameraDef.type === 'perspective') {

        camera = new THREE.PerspectiveCamera(THREE.Math.radToDeg(params.yfov), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6);

      } else if (cameraDef.type === 'orthographic') {

        camera = new THREE.OrthographicCamera(params.xmag / -2, params.xmag / 2, params.ymag / 2, params.ymag / -2, params.znear, params.zfar);

      }

      if (cameraDef.name !== undefined) camera.name = cameraDef.name;

      assignExtrasToUserData(camera, cameraDef);

      return Promise.resolve(camera);

    };

    /**
        * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
        * @param {number} skinIndex
        * @return {Promise<Object>}
        */
    GLTFParser.prototype.loadSkin = function (skinIndex) {

      var skinDef = this.json.skins[skinIndex];

      var skinEntry = {
        joints: skinDef.joints };


      if (skinDef.inverseBindMatrices === undefined) {

        return Promise.resolve(skinEntry);

      }

      return this.getDependency('accessor', skinDef.inverseBindMatrices).then(function (accessor) {

        skinEntry.inverseBindMatrices = accessor;

        return skinEntry;

      });

    };

    /**
        * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
        * @param {number} animationIndex
        * @return {Promise<THREE.AnimationClip>}
        */
    GLTFParser.prototype.loadAnimation = function (animationIndex) {

      var json = this.json;

      var animationDef = json.animations[animationIndex];

      var pendingNodes = [];
      var pendingInputAccessors = [];
      var pendingOutputAccessors = [];
      var pendingSamplers = [];
      var pendingTargets = [];

      for (var i = 0, il = animationDef.channels.length; i < il; i++) {

        var channel = animationDef.channels[i];
        var sampler = animationDef.samplers[channel.sampler];
        var target = channel.target;
        var name = target.node !== undefined ? target.node : target.id; // NOTE: target.id is deprecated.
        var input = animationDef.parameters !== undefined ? animationDef.parameters[sampler.input] : sampler.input;
        var output = animationDef.parameters !== undefined ? animationDef.parameters[sampler.output] : sampler.output;

        pendingNodes.push(this.getDependency('node', name));
        pendingInputAccessors.push(this.getDependency('accessor', input));
        pendingOutputAccessors.push(this.getDependency('accessor', output));
        pendingSamplers.push(sampler);
        pendingTargets.push(target);

      }

      return Promise.all([

      Promise.all(pendingNodes),
      Promise.all(pendingInputAccessors),
      Promise.all(pendingOutputAccessors),
      Promise.all(pendingSamplers),
      Promise.all(pendingTargets)]).

      then(function (dependencies) {

        var nodes = dependencies[0];
        var inputAccessors = dependencies[1];
        var outputAccessors = dependencies[2];
        var samplers = dependencies[3];
        var targets = dependencies[4];

        var tracks = [];

        for (var i = 0, il = nodes.length; i < il; i++) {

          var node = nodes[i];
          var inputAccessor = inputAccessors[i];
          var outputAccessor = outputAccessors[i];
          var sampler = samplers[i];
          var target = targets[i];

          if (node === undefined) continue;

          node.updateMatrix();
          node.matrixAutoUpdate = true;

          var TypedKeyframeTrack;

          switch (PATH_PROPERTIES[target.path]) {

            case PATH_PROPERTIES.weights:

              TypedKeyframeTrack = THREE.NumberKeyframeTrack;
              break;

            case PATH_PROPERTIES.rotation:

              TypedKeyframeTrack = THREE.QuaternionKeyframeTrack;
              break;

            case PATH_PROPERTIES.position:
            case PATH_PROPERTIES.scale:
            default:

              TypedKeyframeTrack = THREE.VectorKeyframeTrack;
              break;}



          var targetName = node.name ? node.name : node.uuid;

          var interpolation = sampler.interpolation !== undefined ? INTERPOLATION[sampler.interpolation] : THREE.InterpolateLinear;

          var targetNames = [];

          if (PATH_PROPERTIES[target.path] === PATH_PROPERTIES.weights) {

            // Node may be a THREE.Group (glTF mesh with several primitives) or a THREE.Mesh.
            node.traverse(function (object) {

              if (object.isMesh === true && object.morphTargetInfluences) {

                targetNames.push(object.name ? object.name : object.uuid);

              }

            });

          } else {

            targetNames.push(targetName);

          }

          var outputArray = outputAccessor.array;

          if (outputAccessor.normalized) {

            var scale;

            if (outputArray.constructor === Int8Array) {

              scale = 1 / 127;

            } else if (outputArray.constructor === Uint8Array) {

              scale = 1 / 255;

            } else if (outputArray.constructor == Int16Array) {

              scale = 1 / 32767;

            } else if (outputArray.constructor === Uint16Array) {

              scale = 1 / 65535;

            } else {

              throw new Error('THREE.GLTFLoader: Unsupported output accessor component type.');

            }

            var scaled = new Float32Array(outputArray.length);

            for (var j = 0, jl = outputArray.length; j < jl; j++) {

              scaled[j] = outputArray[j] * scale;

            }

            outputArray = scaled;

          }

          for (var j = 0, jl = targetNames.length; j < jl; j++) {

            var track = new TypedKeyframeTrack(
            targetNames[j] + '.' + PATH_PROPERTIES[target.path],
            inputAccessor.array,
            outputArray,
            interpolation);


            // Override interpolation with custom factory method.
            if (sampler.interpolation === 'CUBICSPLINE') {

              track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline(result) {

                // A CUBICSPLINE keyframe in glTF has three output values for each input value,
                // representing inTangent, splineVertex, and outTangent. As a result, track.getValueSize()
                // must be divided by three to get the interpolant's sampleSize argument.

                return new GLTFCubicSplineInterpolant(this.times, this.values, this.getValueSize() / 3, result);

              };

              // Mark as CUBICSPLINE. `track.getInterpolation()` doesn't support custom interpolants.
              track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;

            }

            tracks.push(track);

          }

        }

        var name = animationDef.name !== undefined ? animationDef.name : 'animation_' + animationIndex;

        return new THREE.AnimationClip(name, undefined, tracks);

      });

    };

    /**
        * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
        * @param {number} nodeIndex
        * @return {Promise<THREE.Object3D>}
        */
    GLTFParser.prototype.loadNode = function (nodeIndex) {

      var json = this.json;
      var extensions = this.extensions;
      var parser = this;

      var meshReferences = json.meshReferences;
      var meshUses = json.meshUses;

      var nodeDef = json.nodes[nodeIndex];

      return function () {

        var pending = [];

        if (nodeDef.mesh !== undefined) {

          pending.push(parser.getDependency('mesh', nodeDef.mesh).then(function (mesh) {

            var node;

            if (meshReferences[nodeDef.mesh] > 1) {

              var instanceNum = meshUses[nodeDef.mesh]++;

              node = mesh.clone();
              node.name += '_instance_' + instanceNum;

              // onBeforeRender copy for Specular-Glossiness
              node.onBeforeRender = mesh.onBeforeRender;

              for (var i = 0, il = node.children.length; i < il; i++) {

                node.children[i].name += '_instance_' + instanceNum;
                node.children[i].onBeforeRender = mesh.children[i].onBeforeRender;

              }

            } else {

              node = mesh;

            }

            // if weights are provided on the node, override weights on the mesh.
            if (nodeDef.weights !== undefined) {

              node.traverse(function (o) {

                if (!o.isMesh) return;

                for (var i = 0, il = nodeDef.weights.length; i < il; i++) {

                  o.morphTargetInfluences[i] = nodeDef.weights[i];

                }

              });

            }

            return node;

          }));

        }

        if (nodeDef.camera !== undefined) {

          pending.push(parser.getDependency('camera', nodeDef.camera));

        }

        if (nodeDef.extensions &&
        nodeDef.extensions[EXTENSIONS.KHR_LIGHTS_PUNCTUAL] &&
        nodeDef.extensions[EXTENSIONS.KHR_LIGHTS_PUNCTUAL].light !== undefined) {

          pending.push(parser.getDependency('light', nodeDef.extensions[EXTENSIONS.KHR_LIGHTS_PUNCTUAL].light));

        }

        return Promise.all(pending);

      }().then(function (objects) {

        var node;

        // .isBone isn't in glTF spec. See .markDefs
        if (nodeDef.isBone === true) {

          node = new THREE.Bone();

        } else if (objects.length > 1) {

          node = new THREE.Group();

        } else if (objects.length === 1) {

          node = objects[0];

        } else {

          node = new THREE.Object3D();

        }

        if (node !== objects[0]) {

          for (var i = 0, il = objects.length; i < il; i++) {

            node.add(objects[i]);

          }

        }

        if (nodeDef.name !== undefined) {

          node.userData.name = nodeDef.name;
          node.name = THREE.PropertyBinding.sanitizeNodeName(nodeDef.name);

        }

        assignExtrasToUserData(node, nodeDef);

        if (nodeDef.extensions) addUnknownExtensionsToUserData(extensions, node, nodeDef);

        if (nodeDef.matrix !== undefined) {

          var matrix = new THREE.Matrix4();
          matrix.fromArray(nodeDef.matrix);
          node.applyMatrix(matrix);

        } else {

          if (nodeDef.translation !== undefined) {

            node.position.fromArray(nodeDef.translation);

          }

          if (nodeDef.rotation !== undefined) {

            node.quaternion.fromArray(nodeDef.rotation);

          }

          if (nodeDef.scale !== undefined) {

            node.scale.fromArray(nodeDef.scale);

          }

        }

        return node;

      });

    };

    /**
        * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
        * @param {number} sceneIndex
        * @return {Promise<THREE.Scene>}
        */
    GLTFParser.prototype.loadScene = function () {

      // scene node hierachy builder

      function buildNodeHierachy(nodeId, parentObject, json, parser) {

        var nodeDef = json.nodes[nodeId];

        return parser.getDependency('node', nodeId).then(function (node) {

          if (nodeDef.skin === undefined) return node;

          // build skeleton here as well

          var skinEntry;

          return parser.getDependency('skin', nodeDef.skin).then(function (skin) {

            skinEntry = skin;

            var pendingJoints = [];

            for (var i = 0, il = skinEntry.joints.length; i < il; i++) {

              pendingJoints.push(parser.getDependency('node', skinEntry.joints[i]));

            }

            return Promise.all(pendingJoints);

          }).then(function (jointNodes) {

            node.traverse(function (mesh) {

              if (!mesh.isMesh) return;

              var bones = [];
              var boneInverses = [];

              for (var j = 0, jl = jointNodes.length; j < jl; j++) {

                var jointNode = jointNodes[j];

                if (jointNode) {

                  bones.push(jointNode);

                  var mat = new THREE.Matrix4();

                  if (skinEntry.inverseBindMatrices !== undefined) {

                    mat.fromArray(skinEntry.inverseBindMatrices.array, j * 16);

                  }

                  boneInverses.push(mat);

                } else {

                  console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', skinEntry.joints[j]);

                }

              }

              mesh.bind(new THREE.Skeleton(bones, boneInverses), mesh.matrixWorld);

            });

            return node;

          });

        }).then(function (node) {

          // build node hierachy

          parentObject.add(node);

          var pending = [];

          if (nodeDef.children) {

            var children = nodeDef.children;

            for (var i = 0, il = children.length; i < il; i++) {

              var child = children[i];
              pending.push(buildNodeHierachy(child, node, json, parser));

            }

          }

          return Promise.all(pending);

        });

      }

      return function loadScene(sceneIndex) {

        var json = this.json;
        var extensions = this.extensions;
        var sceneDef = this.json.scenes[sceneIndex];
        var parser = this;

        var scene = new THREE.Scene();
        if (sceneDef.name !== undefined) scene.name = sceneDef.name;

        assignExtrasToUserData(scene, sceneDef);

        if (sceneDef.extensions) addUnknownExtensionsToUserData(extensions, scene, sceneDef);

        var nodeIds = sceneDef.nodes || [];

        var pending = [];

        for (var i = 0, il = nodeIds.length; i < il; i++) {

          pending.push(buildNodeHierachy(nodeIds[i], scene, json, parser));

        }

        return Promise.all(pending).then(function () {

          return scene;

        });

      };

    }();

    return GLTFLoader;

  }();
}

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map