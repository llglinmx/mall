(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

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
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

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

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


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
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


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
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
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
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
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
      var returnValue = wx[options.name || methodName].apply(wx, args);
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
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

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
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

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
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
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

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

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
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
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

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

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
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
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

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
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

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
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

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 11:
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

/***/ 12:
/*!********************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/static/js/components.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  token: '',
  UserInfo: {},
  isLogin: false };exports.default = _default;

/***/ }),

/***/ 13:
/*!***********************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/store/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    sortIndex: -1,
    CollectionList: [], // 收藏列表
    ShoppingList: [], // 购物车列表
    SortListData: [], // 分类列表数据
    OrderListData: [] // 订单列表
  },
  mutations: {
    // 分类菜单点击
    ClikSortIndex: function ClikSortIndex(state, data) {
      state.sortIndex = data;
    },

    // 收藏列表方法
    VuexCollectionList: function VuexCollectionList(state, data) {
      state.CollectionList = data; // 赋值
      state.CollectionList.forEach(function (item, index) {
        if (!item.isCheck) {
          state.CollectionList.splice(index, 1);
        }
      });

      // console.log(state.CollectionList)
    },

    // 购物车列表
    VuexShoppingList: function VuexShoppingList(state, data) {
      state.ShoppingList = data; // 赋值
    },
    // 分类类列表数据
    VuexSortListData: function VuexSortListData(state, data) {
      state.SortListData = data; // 赋值
    },
    // 订单列表
    VuexOrderList: function VuexOrderList(state, data) {
      state.OrderListData = data; // 赋值
    } },



  actions: {} });var _default =

store;exports.default = _default;

/***/ }),

/***/ 14:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
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
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
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
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
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
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
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
                    if (currentValue != pre[key]) {
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
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
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
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
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
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
    var app = getApp();
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 21:
/*!***************************************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/components/mescroll-uni/mescroll-mixins.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // mescroll-body 和 mescroll-uni 通用

// import MescrollUni from "./mescroll-uni.vue";
// import MescrollBody from "./mescroll-body.vue";

var MescrollMixin = {
  // components: { // 非H5端无法通过mixin注册组件, 只能在main.js中注册全局组件或具体界面中注册
  // 	MescrollUni,
  // 	MescrollBody
  // },
  data: function data() {
    return {
      mescroll: null //mescroll实例对象
    };
  },
  // 注册系统自带的下拉刷新 (配置down.native为true时生效, 还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
  onPullDownRefresh: function onPullDownRefresh() {
    this.mescroll && this.mescroll.onPullDownRefresh();
  },
  // 注册列表滚动事件,用于判定在顶部可下拉刷新,在指定位置可显示隐藏回到顶部按钮 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onPageScroll: function onPageScroll(e) {
    this.mescroll && this.mescroll.onPageScroll(e);
  },
  // 注册滚动到底部的事件,用于上拉加载 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onReachBottom: function onReachBottom() {
    this.mescroll && this.mescroll.onReachBottom();
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit: function mescrollInit(mescroll) {
      this.mescroll = mescroll;
      this.mescrollInitByRef(); // 兼容字节跳动小程序
    },
    // 以ref的方式初始化mescroll对象 (兼容字节跳动小程序: http://www.mescroll.com/qa.html?v=20200107#q26)
    mescrollInitByRef: function mescrollInitByRef() {
      if (!this.mescroll || !this.mescroll.resetUpScroll) {
        var mescrollRef = this.$refs.mescrollRef;
        if (mescrollRef) this.mescroll = mescrollRef.mescroll;
      }
    },
    // 下拉刷新的回调 (mixin默认resetUpScroll)
    downCallback: function downCallback() {var _this = this;
      if (this.mescroll.optUp.use) {
        this.mescroll.resetUpScroll();
      } else {
        setTimeout(function () {
          _this.mescroll.endSuccess();
        }, 500);
      }
    },
    // 上拉加载的回调
    upCallback: function upCallback() {var _this2 = this;
      // mixin默认延时500自动结束加载
      setTimeout(function () {
        _this2.mescroll.endErr();
      }, 500);
    } },

  mounted: function mounted() {
    this.mescrollInitByRef(); // 兼容字节跳动小程序, 避免未设置@init或@init此时未能取到ref的情况
  } };var _default =



MescrollMixin;exports.default = _default;

/***/ }),

/***/ 225:
/*!****************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/static/js/images.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function imageUtil(originalWidth, originalHeight) {
  var imageSize = {};
  wx.getSystemInfo({
    success: function success(res) {
      var windowWidth = res.windowWidth;
      imageSize.x = 0;
      imageSize.y = 0;
      imageSize.windowWidth = windowWidth;
      imageSize.imageWidth = originalWidth;
      imageSize.imageHeight = originalHeight;
      if (originalWidth > windowWidth) {
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = windowWidth * originalHeight / originalWidth;
      } else {
        imageSize.x = (windowWidth - originalWidth) / 2;
      }
    } });

  return imageSize;
}

module.exports = {
  imageUtil: imageUtil };

/***/ }),

/***/ 297:
/*!************************************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/components/mescroll-uni/mescroll-uni.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = MeScroll; /* mescroll
                                                                                                        * version 1.3.0
                                                                                                        * 2020-07-10 wenju
                                                                                                        * http://www.mescroll.com
                                                                                                        */

function MeScroll(options, isScrollBody) {
  var me = this;
  me.version = '1.3.0'; // mescroll版本号
  me.options = options || {}; // 配置
  me.isScrollBody = isScrollBody || false; // 滚动区域是否为原生页面滚动; 默认为scroll-view

  me.isDownScrolling = false; // 是否在执行下拉刷新的回调
  me.isUpScrolling = false; // 是否在执行上拉加载的回调
  var hasDownCallback = me.options.down && me.options.down.callback; // 是否配置了down的callback

  // 初始化下拉刷新
  me.initDownScroll();
  // 初始化上拉加载,则初始化
  me.initUpScroll();

  // 自动加载
  setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
    // 自动触发下拉刷新 (只有配置了down的callback才自动触发下拉刷新)
    if ((me.optDown.use || me.optDown.native) && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll(); // 显示下拉进度,执行下拉回调
      } else {
        me.optDown.callback && me.optDown.callback(me); // 不显示下拉进度,直接执行下拉回调
      }
    }
    // 自动触发上拉加载
    if (!me.isUpAutoLoad) {// 部分小程序(头条小程序)emit是异步, 会导致isUpAutoLoad判断有误, 先延时确保先执行down的callback,再执行up的callback
      setTimeout(function () {
        me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
      }, 100);
    }
  }, 30); // 需让me.optDown.inited和me.optUp.inited先执行
}

/* 配置参数:下拉刷新 */
MeScroll.prototype.extendDownScroll = function (optDown) {
  // 下拉刷新的配置
  MeScroll.extend(optDown, {
    use: true, // 是否启用下拉刷新; 默认true
    auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
    native: false, // 是否使用系统自带的下拉刷新; 默认false; 仅mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
    autoShowLoading: false, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
    isLock: false, // 是否锁定下拉刷新,默认false;
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    startTop: 100, // scroll-view快速滚动到顶部时,此时的scroll-top可能大于0, 此值用于控制最大的误差
    inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    bottomOffset: 20, // 当手指touchmove位置在距离body底部20px范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
    minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
    textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
    inited: null, // 下拉刷新初始化完毕的回调
    inOffset: null, // 下拉的距离进入offset范围内那一刻的回调
    outOffset: null, // 下拉的距离大于offset那一刻的回调
    onMoving: null, // 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
    beforeLoading: null, // 准备触发下拉刷新的回调: 如果return true,将不触发showLoading和callback回调; 常用来完全自定义下拉刷新, 参考案例【淘宝 v6.8.0】
    showLoading: null, // 显示下拉刷新进度的回调
    afterLoading: null, // 显示下拉刷新进度的回调之后,马上要执行的代码 (如: 在wxs中使用)
    beforeEndDownScroll: null, // 准备结束下拉的回调. 返回结束下拉的延时执行时间,默认0ms; 常用于结束下拉之前再显示另外一小段动画,才去隐藏下拉刷新的场景, 参考案例【dotJump】
    endDownScroll: null, // 结束下拉刷新的回调
    afterEndDownScroll: null, // 结束下拉刷新的回调,马上要执行的代码 (如: 在wxs中使用)
    callback: function callback(mescroll) {
      // 下拉刷新的回调;默认重置上拉加载列表为第一页
      mescroll.resetUpScroll();
    } });

};

/* 配置参数:上拉加载 */
MeScroll.prototype.extendUpScroll = function (optUp) {
  // 上拉加载的配置
  MeScroll.extend(optUp, {
    use: true, // 是否启用上拉加载; 默认true
    auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
    isLock: false, // 是否锁定上拉加载,默认false;
    isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
    callback: null, // 上拉加载的回调;function(page,mescroll){ }
    page: {
      num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
      size: 10, // 每页数据的数量
      time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
    },
    noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
    offset: 80, // 距底部多远时,触发upCallback
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '-- END --', // 没有更多数据的提示文本
    bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorBottom)
    textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
    inited: null, // 初始化完毕的回调
    showLoading: null, // 显示加载中的回调
    showNoMore: null, // 显示无更多数据的回调
    hideUpScroll: null, // 隐藏上拉加载的回调
    errDistance: 60, // endErr的时候需往上滑动一段距离,使其往下滑动时再次触发onReachBottom,仅mescroll-body生效
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: null, // 图片路径,默认null (绝对路径或网络图)
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300, // 回到顶部的动画时长,默认300ms (当值为0或300则使用系统自带回到顶部,更流畅; 其他值则通过step模拟,部分机型可能不够流畅,所以非特殊情况不建议修改此项)
      btnClick: null, // 点击按钮的回调
      onShow: null, // 是否显示的回调
      zIndex: 9990, // fixed定位z-index值
      left: null, // 到左边的距离, 默认null. 此项有值时,right不生效. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      right: 20, // 到右边的距离, 默认20 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      bottom: 120, // 到底部的距离, 默认120 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      safearea: false, // bottom的偏移量是否加上底部安全区的距离, 默认false, 需要适配iPhoneX时使用 (具体的界面如果不配置此项,则取本vue的safearea值)
      width: 72, // 回到顶部图标的宽度, 默认72 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      radius: "50%" // 圆角, 默认"50%" (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    },
    empty: {
      use: true, // 是否显示空布局
      icon: null, // 图标路径
      tip: '~ 暂无相关数据 ~', // 提示
      btnText: '', // 按钮
      btnClick: null, // 点击按钮的回调
      onShow: null, // 是否显示的回调
      fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
      top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
      zIndex: 99 // fixed定位z-index值
    },
    onScroll: false // 是否监听滚动事件
  });
};

/* 配置参数 */
MeScroll.extend = function (userOption, defaultOption) {
  if (!userOption) return defaultOption;
  for (var key in defaultOption) {
    if (userOption[key] == null) {
      var def = defaultOption[key];
      if (def != null && typeof def === 'object') {
        userOption[key] = MeScroll.extend({}, def); // 深度匹配
      } else {
        userOption[key] = def;
      }
    } else if (typeof userOption[key] === 'object') {
      MeScroll.extend(userOption[key], defaultOption[key]); // 深度匹配
    }
  }
  return userOption;
};

/* 简单判断是否配置了颜色 (非透明,非白色) */
MeScroll.prototype.hasColor = function (color) {
  if (!color) return false;
  var c = color.toLowerCase();
  return c != "#fff" && c != "#ffffff" && c != "transparent" && c != "white";
};

/* -------初始化下拉刷新------- */
MeScroll.prototype.initDownScroll = function () {
  var me = this;
  // 配置参数
  me.optDown = me.options.down || {};
  if (!me.optDown.textColor && me.hasColor(me.optDown.bgColor)) me.optDown.textColor = "#fff"; // 当bgColor有值且textColor未设置,则textColor默认白色
  me.extendDownScroll(me.optDown);

  // 如果是mescroll-body且配置了native,则禁止自定义的下拉刷新
  if (me.isScrollBody && me.optDown.native) {
    me.optDown.use = false;
  } else {
    me.optDown.native = false; // 仅mescroll-body支持,mescroll-uni不支持
  }

  me.downHight = 0; // 下拉区域的高度

  // 在页面中加入下拉布局
  if (me.optDown.use && me.optDown.inited) {
    // 初始化完毕的回调
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optDown.inited(me);
    }, 0);
  }
};

/* 列表touchstart事件 */
MeScroll.prototype.touchstartEvent = function (e) {
  if (!this.optDown.use) return;

  this.startPoint = this.getPoint(e); // 记录起点
  this.startTop = this.getScrollTop(); // 记录此时的滚动条位置
  this.startAngle = 0; // 初始角度
  this.lastPoint = this.startPoint; // 重置上次move的点
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset; // 手指触摸的最大范围(写在touchstart避免body获取高度为0的情况)
  this.inTouchend = false; // 标记不是touchend
};

/* 列表touchmove事件 */
MeScroll.prototype.touchmoveEvent = function (e) {
  if (!this.optDown.use) return;
  var me = this;

  var scrollTop = me.getScrollTop(); // 当前滚动条的距离
  var curPoint = me.getPoint(e); // 当前点

  var moveY = curPoint.y - me.startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉

  // 向下拉 && 在顶部
  // mescroll-body,直接判定在顶部即可
  // scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
  // scroll-view滚动到顶部时,scrollTop不一定为0,也有可能大于0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
  if (moveY > 0 && (
  me.isScrollBody && scrollTop <= 0 ||

  !me.isScrollBody && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop)))
  {
    // 可下拉的条件
    if (!me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling &&
    me.optUp.isBoth)) {

      // 下拉的初始角度是否在配置的范围内
      if (!me.startAngle) me.startAngle = me.getAngle(me.lastPoint, curPoint); // 两点之间的角度,区间 [0,90]
      if (me.startAngle < me.optDown.minAngle) return; // 如果小于配置的角度,则不往下执行下拉刷新

      // 如果手指的位置超过配置的距离,则提前结束下拉,避免Webview嵌套导致touchend无法触发
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true; // 标记执行touchend
        me.touchendEvent(); // 提前触发touchend
        return;
      }

      me.preventDefault(e); // 阻止默认事件

      var diff = curPoint.y - me.lastPoint.y; // 和上次比,移动的距离 (大于0向下,小于0向上)

      // 下拉距离  < 指定距离
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1; // 加入标记,保证只执行一次
          me.optDown.inOffset && me.optDown.inOffset(me); // 进入指定距离范围内那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        me.downHight += diff * me.optDown.inOffsetRate; // 越往下,高度变化越小

        // 指定距离  <= 下拉距离
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2; // 加入标记,保证只执行一次
          me.optDown.outOffset && me.optDown.outOffset(me); // 下拉超过指定距离那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        if (diff > 0) {// 向下拉
          me.downHight += diff * me.optDown.outOffsetRate; // 越往下,高度变化越小
        } else {// 向上收
          me.downHight += diff; // 向上收回高度,则向上滑多少收多少高度
        }
      }

      me.downHight = Math.round(me.downHight); // 取整
      var rate = me.downHight / me.optDown.offset; // 下拉区域当前高度与指定距离的比值
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight); // 下拉过程中的回调,一直在执行
    }
  }

  me.lastPoint = curPoint; // 记录本次移动的点
};

/* 列表touchend事件 */
MeScroll.prototype.touchendEvent = function (e) {
  if (!this.optDown.use) return;
  // 如果下拉区域高度已改变,则需重置回来
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      // 符合触发刷新的条件
      this.triggerDownScroll();
    } else {
      // 不符合的话 则重置
      this.downHight = 0;
      this.endDownScrollCall(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (!this.isScrollBody && this.getScrollTop() === this.startTop) {// scroll-view到顶/左/右/底的滑动事件
    var isScrollUp = this.getPoint(e).y - this.startPoint.y < 0; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
    // 上滑
    if (isScrollUp) {
      // 需检查滑动的角度
      var angle = this.getAngle(this.getPoint(e), this.startPoint); // 两点之间的角度,区间 [0,90]
      if (angle > 80) {
        // 检查并触发上拉
        this.triggerUpScroll(true);
      }
    }
  }
};

/* 根据点击滑动事件获取第一个手指的坐标 */
MeScroll.prototype.getPoint = function (e) {
  if (!e) {
    return {
      x: 0,
      y: 0 };

  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY };

  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY };

  } else {
    return {
      x: e.clientX,
      y: e.clientY };

  }
};

/* 计算两点之间的角度: 区间 [0,90]*/
MeScroll.prototype.getAngle = function (p1, p2) {
  var x = Math.abs(p1.x - p2.x);
  var y = Math.abs(p1.y - p2.y);
  var z = Math.sqrt(x * x + y * y);
  var angle = 0;
  if (z !== 0) {
    angle = Math.asin(y / z) / Math.PI * 180;
  }
  return angle;
};

/* 触发下拉刷新 */
MeScroll.prototype.triggerDownScroll = function () {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this)) {
    //return true则处于完全自定义状态
  } else {
    this.showDownScroll(); // 下拉刷新中...
    !this.optDown.native && this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示下拉进度布局 */
MeScroll.prototype.showDownScroll = function () {
  this.isDownScrolling = true; // 标记下拉中
  if (this.optDown.native) {
    uni.startPullDownRefresh(); // 系统自带的下拉刷新
    this.showDownLoadingCall(0); // 仍触发showLoading,因为上拉加载用到
  } else {
    this.downHight = this.optDown.offset; // 更新下拉区域高度
    this.showDownLoadingCall(this.downHight); // 下拉刷新中...
  }
};

MeScroll.prototype.showDownLoadingCall = function (downHight) {
  this.optDown.showLoading && this.optDown.showLoading(this, downHight); // 下拉刷新中...
  this.optDown.afterLoading && this.optDown.afterLoading(this, downHight); // 下拉刷新中...触发之后马上要执行的代码
};

/* 显示系统自带的下拉刷新时需要处理的业务 */
MeScroll.prototype.onPullDownRefresh = function () {
  this.isDownScrolling = true; // 标记下拉中
  this.showDownLoadingCall(0); // 仍触发showLoading,因为上拉加载用到
  this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
};

/* 结束下拉刷新 */
MeScroll.prototype.endDownScroll = function () {
  if (this.optDown.native) {// 结束原生下拉刷新
    this.isDownScrolling = false;
    this.endDownScrollCall(this);
    uni.stopPullDownRefresh();
    return;
  }
  var me = this;
  // 结束下拉刷新的方法
  var endScroll = function endScroll() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.endDownScrollCall(me);
    if (!me.isScrollBody) {
      me.setScrollHeight(0); // scroll-view重置滚动区域,使数据不满屏时仍可检查触发翻页
      me.scrollTo(0, 0); // scroll-view需重置滚动条到顶部,避免startTop大于0时,对下拉刷新的影响
    }
  };
  // 结束下拉刷新时的回调
  var delay = 0;
  if (me.optDown.beforeEndDownScroll) delay = me.optDown.beforeEndDownScroll(me); // 结束下拉刷新的延时,单位ms
  if (typeof delay === 'number' && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};

MeScroll.prototype.endDownScrollCall = function () {
  this.optDown.endDownScroll && this.optDown.endDownScroll(this);
  this.optDown.afterEndDownScroll && this.optDown.afterEndDownScroll(this);
};

/* 锁定下拉刷新:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockDownScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optDown.isLock = isLock;
};

/* 锁定上拉加载:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockUpScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optUp.isLock = isLock;
};

/* -------初始化上拉加载------- */
MeScroll.prototype.initUpScroll = function () {
  var me = this;
  // 配置参数
  me.optUp = me.options.up || { use: false };
  if (!me.optUp.textColor && me.hasColor(me.optUp.bgColor)) me.optUp.textColor = "#fff"; // 当bgColor有值且textColor未设置,则textColor默认白色
  me.extendUpScroll(me.optUp);

  if (me.optUp.use === false) return; // 配置不使用上拉加载时,则不初始化上拉布局
  me.optUp.hasNext = true; // 如果使用上拉,则默认有下一页
  me.startNum = me.optUp.page.num + 1; // 记录page开始的页码

  // 初始化完毕的回调
  if (me.optUp.inited) {
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optUp.inited(me);
    }, 0);
  }
};

/*滚动到底部的事件 (仅mescroll-body生效)*/
MeScroll.prototype.onReachBottom = function () {
  if (this.isScrollBody && !this.isUpScrolling) {// 只能支持下拉刷新的时候同时可以触发上拉加载,否则滚动到底部就需要上滑一点才能触发onReachBottom
    if (!this.optUp.isLock && this.optUp.hasNext) {
      this.triggerUpScroll();
    }
  }
};

/*列表滚动事件 (仅mescroll-body生效)*/
MeScroll.prototype.onPageScroll = function (e) {
  if (!this.isScrollBody) return;

  // 更新滚动条的位置 (主要用于判断下拉刷新时,滚动条是否在顶部)
  this.setScrollTop(e.scrollTop);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
};

/*列表滚动事件*/
MeScroll.prototype.scroll = function (e, onScroll) {
  // 更新滚动条的位置
  this.setScrollTop(e.scrollTop);
  // 更新滚动内容高度
  this.setScrollHeight(e.scrollHeight);

  // 向上滑还是向下滑动
  if (this.preScrollY == null) this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;

  // 上滑 && 检查并触发上拉
  this.isScrollUp && this.triggerUpScroll(true);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }

  // 滑动监听
  this.optUp.onScroll && onScroll && onScroll();
};

/* 触发上拉加载 */
MeScroll.prototype.triggerUpScroll = function (isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    // 是否校验在底部; 默认不校验
    if (isCheck === true) {
      var canUp = false;
      // 还有下一页 && 没有锁定 && 不在下拉中
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {// 到底部
          canUp = true; // 标记可上拉
        }
      }
      if (canUp === false) return;
    }
    this.showUpScroll(); // 上拉加载中...
    this.optUp.page.num++; // 预先加一页,如果失败则减回
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = this.optUp.page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = this.optUp.page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = this.optUp.page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示上拉加载中 */
MeScroll.prototype.showUpScroll = function () {
  this.isUpScrolling = true; // 标记上拉加载中
  this.optUp.showLoading && this.optUp.showLoading(this); // 回调
};

/* 显示上拉无更多数据 */
MeScroll.prototype.showNoMore = function () {
  this.optUp.hasNext = false; // 标记无更多数据
  this.optUp.showNoMore && this.optUp.showNoMore(this); // 回调
};

/* 隐藏上拉区域**/
MeScroll.prototype.hideUpScroll = function () {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this); // 回调
};

/* 结束上拉加载 */
MeScroll.prototype.endUpScroll = function (isShowNoMore) {
  if (isShowNoMore != null) {// isShowNoMore=null,不处理下拉状态,下拉刷新的时候调用
    if (isShowNoMore) {
      this.showNoMore(); // isShowNoMore=true,显示无更多数据
    } else {
      this.hideUpScroll(); // isShowNoMore=false,隐藏上拉加载
    }
  }
  this.isUpScrolling = false; // 标记结束上拉加载
};

/* 重置上拉加载列表为第一页
    *isShowLoading 是否显示进度布局;
    * 1.默认null,不传参,则显示上拉加载的进度布局
    * 2.传参true, 则显示下拉刷新的进度布局
    * 3.传参false,则不显示上拉和下拉的进度 (常用于静默更新列表数据)
    */
MeScroll.prototype.resetUpScroll = function (isShowLoading) {
  if (this.optUp && this.optUp.use) {
    var page = this.optUp.page;
    this.prePageNum = page.num; // 缓存重置前的页码,加载失败可退回
    this.prePageTime = page.time; // 缓存重置前的时间,加载失败可退回
    page.num = this.startNum; // 重置为第一页
    page.time = null; // 重置时间为空
    if (!this.isDownScrolling && isShowLoading !== false) {// 如果不是下拉刷新触发的resetUpScroll并且不配置列表静默更新,则显示进度;
      if (isShowLoading == null) {
        this.removeEmpty(); // 移除空布局
        this.showUpScroll(); // 不传参,默认显示上拉加载的进度布局
      } else {
        this.showDownScroll(); // 传true,显示下拉刷新的进度布局,不清空列表
      }
    }
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback && this.optUp.callback(this); // 执行上拉回调
  }
};

/* 设置page.num的值 */
MeScroll.prototype.setPageNum = function (num) {
  this.optUp.page.num = num - 1;
};

/* 设置page.size的值 */
MeScroll.prototype.setPageSize = function (size) {
  this.optUp.page.size = size;
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalPage: 总页数(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endByPage = function (dataSize, totalPage, systime) {
  var hasNext;
  if (this.optUp.use && totalPage != null) hasNext = this.optUp.page.num < totalPage; // 是否还有下一页
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalSize: 列表所有数据总数量(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endBySize = function (dataSize, totalSize, systime) {
  var hasNext;
  if (this.optUp.use && totalSize != null) {
    var loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize; // 已加载的数据总数
    hasNext = loadSize < totalSize; // 是否还有下一页
  }
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据个数(不是所有页的数据总和),用于上拉加载判断是否还有下一页.如果不传,则会判断还有下一页
    * hasNext: 是否还有下一页,布尔类型;用来解决这个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据dataSize判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
    * systime: 服务器时间(可空);用来解决这个小问题:当准备翻下一页时,数据库新增了几条记录,此时翻下一页,前面的几条数据会和上一页的重复;这里传入了systime,那么upCallback的page.time就会有值,把page.time传给服务器,让后台过滤新加入的那几条记录
    */
MeScroll.prototype.endSuccess = function (dataSize, hasNext, systime) {
  var me = this;
  // 结束下拉刷新
  if (me.isDownScrolling) me.endDownScroll();

  // 结束上拉加载
  if (me.optUp.use) {
    var isShowNoMore; // 是否已无更多数据
    if (dataSize != null) {
      var pageNum = me.optUp.page.num; // 当前页码
      var pageSize = me.optUp.page.size; // 每页长度
      // 如果是第一页
      if (pageNum === 1) {
        if (systime) me.optUp.page.time = systime; // 设置加载列表数据第一页的时间
      }
      if (dataSize < pageSize || hasNext === false) {
        // 返回的数据不满一页时,则说明已无更多数据
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          // 如果第一页无任何数据且配置了空布局
          isShowNoMore = false;
          me.showEmpty();
        } else {
          // 总列表数少于配置的数量,则不显示无更多数据
          var allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty(); // 移除空布局
        }
      } else {
        // 还有下一页
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty(); // 移除空布局
      }
    }

    // 隐藏上拉
    me.endUpScroll(isShowNoMore);
  }
};

/* 回调失败,结束下拉刷新和上拉加载 */
MeScroll.prototype.endErr = function (errDistance) {
  // 结束下拉,回调失败重置回原来的页码和时间
  if (this.isDownScrolling) {
    var page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
  }
  // 结束上拉,回调失败重置回原来的页码
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
    // 如果是mescroll-body,则需往回滚一定距离
    if (this.isScrollBody && errDistance !== 0) {// 不处理0
      if (!errDistance) errDistance = this.optUp.errDistance; // 不传,则取默认
      this.scrollTo(this.getScrollTop() - errDistance, 0); // 往上回滚的距离
    }
  }
};

/* 显示空布局 */
MeScroll.prototype.showEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};

/* 移除空布局 */
MeScroll.prototype.removeEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};

/* 显示回到顶部的按钮 */
MeScroll.prototype.showTopBtn = function () {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};

/* 隐藏回到顶部的按钮 */
MeScroll.prototype.hideTopBtn = function () {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};

/* 获取滚动条的位置 */
MeScroll.prototype.getScrollTop = function () {
  return this.scrollTop || 0;
};

/* 记录滚动条的位置 */
MeScroll.prototype.setScrollTop = function (y) {
  this.scrollTop = y;
};

/* 滚动到指定位置 */
MeScroll.prototype.scrollTo = function (y, t) {
  this.myScrollTo && this.myScrollTo(y, t); // scrollview需自定义回到顶部方法
};

/* 自定义scrollTo */
MeScroll.prototype.resetScrollTo = function (myScrollTo) {
  this.myScrollTo = myScrollTo;
};

/* 滚动条到底部的距离 */
MeScroll.prototype.getScrollBottom = function () {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};

/* 计步器
    star: 开始值
    end: 结束值
    callback(step,timer): 回调step值,计步器timer,可自行通过window.clearInterval(timer)结束计步器;
    t: 计步时长,传0则直接回调end值;不传则默认300ms
    rate: 周期;不传则默认30ms计步一次
    * */
MeScroll.prototype.getStep = function (star, end, callback, t, rate) {
  var diff = end - star; // 差值
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300; // 时长 300ms
  rate = rate || 30; // 周期 30ms
  var count = t / rate; // 次数
  var step = diff / count; // 步长
  var i = 0; // 计数
  var timer = setInterval(function () {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer); // 最后一次直接设置end,避免计算误差
      clearInterval(timer);
    }
  }, rate);
};

/* 滚动容器的高度 */
MeScroll.prototype.getClientHeight = function (isReal) {
  var h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {// 未获取到容器的高度,可临时取body的高度 (可能会有误差)
    h = this.getBodyHeight();
  }
  return h;
};
MeScroll.prototype.setClientHeight = function (h) {
  this.clientHeight = h;
};

/* 滚动内容的高度 */
MeScroll.prototype.getScrollHeight = function () {
  return this.scrollHeight || 0;
};
MeScroll.prototype.setScrollHeight = function (h) {
  this.scrollHeight = h;
};

/* body的高度 */
MeScroll.prototype.getBodyHeight = function () {
  return this.bodyHeight || 0;
};
MeScroll.prototype.setBodyHeight = function (h) {
  this.bodyHeight = h;
};

/* 阻止浏览器默认滚动事件 */
MeScroll.prototype.preventDefault = function (e) {
  // 小程序不支持e.preventDefault, 已在wxs中禁止
  // app的bounce只能通过配置pages.json的style.app-plus.bounce为"none"来禁止, 或使用renderjs禁止
  // cancelable:是否可以被禁用; defaultPrevented:是否已经被禁用
  if (e && e.cancelable && !e.defaultPrevented) e.preventDefault();
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 298:
/*!*******************************************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/components/mescroll-uni/mescroll-uni-option.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 全局配置
// mescroll-body 和 mescroll-uni 通用
var GlobalOption = {
  down: {
    // 其他down的配置参数也可以写,这里只展示了常用的配置:
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    native: false // 是否使用系统自带的下拉刷新; 默认false; 仅在mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
  },
  up: {
    // 其他up的配置参数也可以写,这里只展示了常用的配置:
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '-- END --', // 没有更多数据的提示文本
    offset: 80, // 距底部多远时,触发upCallback
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: "http://www.mescroll.com/img/mescroll-totop.png?v=1", // 图片路径 (建议放入static目录, 如 /static/img/mescroll-totop.png )
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000px
      right: 20, // 到右边的距离, 默认20 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
      bottom: 120, // 到底部的距离, 默认120 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
      width: 72 // 回到顶部图标的宽度, 默认72 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
    },
    empty: {
      use: true, // 是否显示空布局
      icon: "http://www.mescroll.com/img/mescroll-empty.png?v=1", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
      tip: '~ 空空如也 ~' // 提示
    } } };var _default =



GlobalOption;exports.default = _default;

/***/ }),

/***/ 299:
/*!**********************************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/components/mescroll-uni/wxs/mixins.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 定义在wxs (含renderjs) 逻辑层的数据和方法, 与视图层相互通信
var WxsMixin = {
  data: function data() {
    return {
      // 传入wxs视图层的数据 (响应式)
      wxsProp: {
        optDown: {}, // 下拉刷新的配置
        scrollTop: 0, // 滚动条的距离
        bodyHeight: 0, // body的高度
        isDownScrolling: false, // 是否正在下拉刷新中
        isUpScrolling: false, // 是否正在上拉加载中
        isScrollBody: true, // 是否为mescroll-body滚动
        isUpBoth: true, // 上拉加载时,是否同时可以下拉刷新
        t: 0 // 数据更新的标记 (只有数据更新了,才会触发wxs的Observer)
      },

      // 标记调用wxs视图层的方法
      callProp: {
        callType: '', // 方法名
        t: 0 // 数据更新的标记 (只有数据更新了,才会触发wxs的Observer)
      },

      // 不用wxs的平台使用此处的wxsBiz对象,抹平wxs的写法 (微信小程序和APP使用的wxsBiz对象是./wxs/wxs.wxs)



















      // 不用renderjs的平台使用此处的renderBiz对象,抹平renderjs的写法 (app 和 h5 使用的renderBiz对象是./wxs/renderjs.js)

      renderBiz: {
        propObserver: function propObserver() {} // 抹平renderjs的写法
      } };


  },
  methods: {
    // wxs视图层调用逻辑层的回调
    wxsCall: function wxsCall(msg) {
      if (msg.type === 'setWxsProp') {
        // 更新wxsProp数据 (值改变才触发更新)
        this.wxsProp = {
          optDown: this.mescroll.optDown,
          scrollTop: this.mescroll.getScrollTop(),
          bodyHeight: this.mescroll.getBodyHeight(),
          isDownScrolling: this.mescroll.isDownScrolling,
          isUpScrolling: this.mescroll.isUpScrolling,
          isUpBoth: this.mescroll.optUp.isBoth,
          isScrollBody: this.mescroll.isScrollBody,
          t: Date.now() };

      } else if (msg.type === 'setLoadType') {
        // 设置inOffset,outOffset的状态
        this.downLoadType = msg.downLoadType;
      } else if (msg.type === 'triggerDownScroll') {
        // 主动触发下拉刷新
        this.mescroll.triggerDownScroll();
      } else if (msg.type === 'endDownScroll') {
        // 结束下拉刷新
        this.mescroll.endDownScroll();
      } else if (msg.type === 'triggerUpScroll') {
        // 主动触发上拉加载
        this.mescroll.triggerUpScroll(true);
      }
    } },

  mounted: function mounted() {var _this = this;

    // 配置主动触发wxs显示加载进度的回调
    this.mescroll.optDown.afterLoading = function () {
      _this.callProp = { callType: "showLoading", t: Date.now() }; // 触发wxs的方法 (值改变才触发更新)
    };
    // 配置主动触发wxs隐藏加载进度的回调
    this.mescroll.optDown.afterEndDownScroll = function () {
      _this.callProp = { callType: "endDownScroll", t: Date.now() }; // 触发wxs的方法 (值改变才触发更新)
      setTimeout(function () {
        if (_this.downLoadType === 4 || _this.downLoadType === 0) {
          _this.callProp = { callType: "clearTransform", t: Date.now() }; // 触发wxs的方法 (值改变才触发更新)
        }
      }, 320);
    };
    // 初始化wxs的数据
    this.wxsCall({ type: 'setWxsProp' });

  } };var _default =


WxsMixin;exports.default = _default;

/***/ }),

/***/ 3:
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

/***/ 30:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 31);

/***/ }),

/***/ 31:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 32);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 32:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 323:
/*!**************************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/components/uni-popup/popup.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 324));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config };

  },
  mixins: [_message.default] };exports.default = _default;

/***/ }),

/***/ 324:
/*!****************************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/components/uni-popup/message.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  created: function created() {
    if (this.type === 'message') {
      // 不显示遮罩
      this.maskShow = false;
      // 获取子组件对象
      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    } } };exports.default = _default;

/***/ }),

/***/ 379:
/*!**************************************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/components/uni-swipe-action-item/mpwxs.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  data: function data() {
    return {
      position: [],
      button: {},
      btn: "[]" };

  },
  // computed: {
  // 	pos() {
  // 		return JSON.stringify(this.position)
  // 	},
  // 	btn() {
  // 		return JSON.stringify(this.button)
  // 	}
  // },
  watch: {
    button: {
      handler: function handler(newVal) {
        this.btn = JSON.stringify(newVal);
      },
      deep: true },

    show: function show(newVal) {
      if (this.autoClose) return;
      if (!this.button) {
        this.init();
        return;
      }
      this.button.show = newVal;
    },
    leftOptions: function leftOptions() {
      this.init();
    },
    rightOptions: function rightOptions() {
      this.init();
    } },

  created: function created() {
    if (this.swipeaction.children !== undefined) {
      this.swipeaction.children.push(this);
    }
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {var _this = this;
    this.swipeaction.children.forEach(function (item, index) {
      if (item === _this) {
        _this.swipeaction.children.splice(index, 1);
      }
    });
  },
  methods: {
    init: function init() {var _this2 = this;
      clearTimeout(this.swipetimer);
      this.swipetimer = setTimeout(function () {
        _this2.getButtonSize();
      }, 50);
    },
    closeSwipe: function closeSwipe(e) {
      if (!this.autoClose) return;
      this.swipeaction.closeOther(this);
    },

    change: function change(e) {
      this.$emit('change', e.open);
      var show = this.button.show;
      if (show !== e.open) {
        this.button.show = e.open;
      }

    },

    appTouchStart: function appTouchStart(e) {var

      clientX =
      e.changedTouches[0].clientX;
      this.clientX = clientX;
      this.timestamp = new Date().getTime();
    },
    appTouchEnd: function appTouchEnd(e, index, item, position) {var

      clientX =
      e.changedTouches[0].clientX;
      // fixed by xxxx 模拟点击事件，解决 ios 13 点击区域错位的问题
      var diff = Math.abs(this.clientX - clientX);
      var time = new Date().getTime() - this.timestamp;
      if (diff < 40 && time < 300) {
        this.$emit('click', {
          content: item,
          index: index,
          position: position });

      }
    },
    getButtonSize: function getButtonSize() {var _this3 = this;
      var views = uni.createSelectorQuery().in(this);
      views.
      selectAll('.uni-swipe_button-group').
      boundingClientRect(function (data) {
        var show = 'none';
        if (_this3.autoClose) {
          show = 'none';
        } else {
          show = _this3.show;
        }
        _this3.button = {
          data: data,
          show: show };

      }).
      exec();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 4:
/*!*******************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/pages.json ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 487:
/*!********************************************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/components/simple-address/city-data/province.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "firstLetter": "b",
  "id": "110000000000",
  "jianpin": "bjs",
  "level": 1,
  "name": "北京市",
  "pinyin": "beijingshi" },
{
  "firstLetter": "t",
  "id": "120000000000",
  "jianpin": "tjs",
  "level": 1,
  "name": "天津市",
  "pinyin": "tianjinshi" },
{
  "firstLetter": "h",
  "id": "130000000000",
  "jianpin": "hbs",
  "level": 1,
  "name": "河北省",
  "pinyin": "hebeisheng" },
{
  "firstLetter": "s",
  "id": "140000000000",
  "jianpin": "sxs",
  "level": 1,
  "name": "山西省",
  "pinyin": "shanxisheng" },
{
  "firstLetter": "n",
  "id": "150000000000",
  "jianpin": "nmgzzq",
  "level": 1,
  "name": "内蒙古自治区",
  "pinyin": "neimengguzizhiqu" },
{
  "firstLetter": "l",
  "id": "210000000000",
  "jianpin": "lns",
  "level": 1,
  "name": "辽宁省",
  "pinyin": "liaoningsheng" },
{
  "firstLetter": "j",
  "id": "220000000000",
  "jianpin": "jls",
  "level": 1,
  "name": "吉林省",
  "pinyin": "jilinsheng" },
{
  "firstLetter": "h",
  "id": "230000000000",
  "jianpin": "hljs",
  "level": 1,
  "name": "黑龙江省",
  "pinyin": "heilongjiangsheng" },
{
  "firstLetter": "s",
  "id": "310000000000",
  "jianpin": "shs",
  "level": 1,
  "name": "上海市",
  "pinyin": "shanghaishi" },
{
  "firstLetter": "j",
  "id": "320000000000",
  "jianpin": "jss",
  "level": 1,
  "name": "江苏省",
  "pinyin": "jiangsusheng" },
{
  "firstLetter": "z",
  "id": "330000000000",
  "jianpin": "zjs",
  "level": 1,
  "name": "浙江省",
  "pinyin": "zhejiangsheng" },
{
  "firstLetter": "a",
  "id": "340000000000",
  "jianpin": "ahs",
  "level": 1,
  "name": "安徽省",
  "pinyin": "anhuisheng" },
{
  "firstLetter": "f",
  "id": "350000000000",
  "jianpin": "fjs",
  "level": 1,
  "name": "福建省",
  "pinyin": "fujiansheng" },
{
  "firstLetter": "j",
  "id": "360000000000",
  "jianpin": "jxs",
  "level": 1,
  "name": "江西省",
  "pinyin": "jiangxisheng" },
{
  "firstLetter": "s",
  "id": "370000000000",
  "jianpin": "sds",
  "level": 1,
  "name": "山东省",
  "pinyin": "shandongsheng" },
{
  "firstLetter": "h",
  "id": "410000000000",
  "jianpin": "hns",
  "level": 1,
  "name": "河南省",
  "pinyin": "henansheng" },
{
  "firstLetter": "h",
  "id": "420000000000",
  "jianpin": "hbs",
  "level": 1,
  "name": "湖北省",
  "pinyin": "hubeisheng" },
{
  "firstLetter": "h",
  "id": "430000000000",
  "jianpin": "hns",
  "level": 1,
  "name": "湖南省",
  "pinyin": "hunansheng" },
{
  "firstLetter": "g",
  "id": "440000000000",
  "jianpin": "gds",
  "level": 1,
  "name": "广东省",
  "pinyin": "guangdongsheng" },
{
  "firstLetter": "g",
  "id": "450000000000",
  "jianpin": "gxzzzzq",
  "level": 1,
  "name": "广西壮族自治区",
  "pinyin": "guangxizhuangzuzizhiqu" },
{
  "firstLetter": "h",
  "id": "460000000000",
  "jianpin": "hns",
  "level": 1,
  "name": "海南省",
  "pinyin": "hainansheng" },
{
  "firstLetter": "z",
  "id": "500000000000",
  "jianpin": "zqs",
  "level": 1,
  "name": "重庆市",
  "pinyin": "zhongqingshi" },
{
  "firstLetter": "s",
  "id": "510000000000",
  "jianpin": "scs",
  "level": 1,
  "name": "四川省",
  "pinyin": "sichuansheng" },
{
  "firstLetter": "g",
  "id": "520000000000",
  "jianpin": "gzs",
  "level": 1,
  "name": "贵州省",
  "pinyin": "guizhousheng" },
{
  "firstLetter": "y",
  "id": "530000000000",
  "jianpin": "yns",
  "level": 1,
  "name": "云南省",
  "pinyin": "yunnansheng" },
{
  "firstLetter": "x",
  "id": "540000000000",
  "jianpin": "xzzzq",
  "level": 1,
  "name": "西藏自治区",
  "pinyin": "xizangzizhiqu" },
{
  "firstLetter": "s",
  "id": "610000000000",
  "jianpin": "sxs",
  "level": 1,
  "name": "陕西省",
  "pinyin": "shanxisheng" },
{
  "firstLetter": "g",
  "id": "620000000000",
  "jianpin": "gss",
  "level": 1,
  "name": "甘肃省",
  "pinyin": "gansusheng" },
{
  "firstLetter": "q",
  "id": "630000000000",
  "jianpin": "qhs",
  "level": 1,
  "name": "青海省",
  "pinyin": "qinghaisheng" },
{
  "firstLetter": "n",
  "id": "640000000000",
  "jianpin": "nxhzzzq",
  "level": 1,
  "name": "宁夏回族自治区",
  "pinyin": "ningxiahuizuzizhiqu" },
{
  "firstLetter": "x",
  "id": "650000000000",
  "jianpin": "xjwwezzq",
  "level": 1,
  "name": "新疆维吾尔自治区",
  "pinyin": "xinjiangweiwuerzizhiqu" }];var _default =


provinceData;exports.default = _default;

/***/ }),

/***/ 488:
/*!****************************************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/components/simple-address/city-data/city.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var cityData = [
[{
  "firstLetter": "s",
  "id": "110100000000",
  "jianpin": "sxq",
  "level": 2,
  "name": "市辖区",
  "pid": "110000000000",
  "pinyin": "shixiaqu" }],

[{
  "firstLetter": "s",
  "id": "120100000000",
  "jianpin": "sxq",
  "level": 2,
  "name": "市辖区",
  "pid": "120000000000",
  "pinyin": "shixiaqu" }],


[{
  "firstLetter": "s",
  "id": "130100000000",
  "jianpin": "sjzs",
  "level": 2,
  "name": "石家庄市",
  "pid": "130000000000",
  "pinyin": "shijiazhuangshi" },
{
  "firstLetter": "t",
  "id": "130200000000",
  "jianpin": "tss",
  "level": 2,
  "name": "唐山市",
  "pid": "130000000000",
  "pinyin": "tangshanshi" },
{
  "firstLetter": "q",
  "id": "130300000000",
  "jianpin": "qhds",
  "level": 2,
  "name": "秦皇岛市",
  "pid": "130000000000",
  "pinyin": "qinhuangdaoshi" },
{
  "firstLetter": "h",
  "id": "130400000000",
  "jianpin": "hds",
  "level": 2,
  "name": "邯郸市",
  "pid": "130000000000",
  "pinyin": "handanshi" },
{
  "firstLetter": "x",
  "id": "130500000000",
  "jianpin": "xts",
  "level": 2,
  "name": "邢台市",
  "pid": "130000000000",
  "pinyin": "xingtaishi" },
{
  "firstLetter": "b",
  "id": "130600000000",
  "jianpin": "bds",
  "level": 2,
  "name": "保定市",
  "pid": "130000000000",
  "pinyin": "baodingshi" },
{
  "firstLetter": "z",
  "id": "130700000000",
  "jianpin": "zjks",
  "level": 2,
  "name": "张家口市",
  "pid": "130000000000",
  "pinyin": "zhangjiakoushi" },
{
  "firstLetter": "c",
  "id": "130800000000",
  "jianpin": "cds",
  "level": 2,
  "name": "承德市",
  "pid": "130000000000",
  "pinyin": "chengdeshi" },
{
  "firstLetter": "c",
  "id": "130900000000",
  "jianpin": "czs",
  "level": 2,
  "name": "沧州市",
  "pid": "130000000000",
  "pinyin": "cangzhoushi" },
{
  "firstLetter": "l",
  "id": "131000000000",
  "jianpin": "lfs",
  "level": 2,
  "name": "廊坊市",
  "pid": "130000000000",
  "pinyin": "langfangshi" },
{
  "firstLetter": "h",
  "id": "131100000000",
  "jianpin": "hss",
  "level": 2,
  "name": "衡水市",
  "pid": "130000000000",
  "pinyin": "hengshuishi" }],


[{
  "firstLetter": "t",
  "id": "140100000000",
  "jianpin": "tys",
  "level": 2,
  "name": "太原市",
  "pid": "140000000000",
  "pinyin": "taiyuanshi" },
{
  "firstLetter": "d",
  "id": "140200000000",
  "jianpin": "dts",
  "level": 2,
  "name": "大同市",
  "pid": "140000000000",
  "pinyin": "datongshi" },
{
  "firstLetter": "y",
  "id": "140300000000",
  "jianpin": "yqs",
  "level": 2,
  "name": "阳泉市",
  "pid": "140000000000",
  "pinyin": "yangquanshi" },
{
  "firstLetter": "z",
  "id": "140400000000",
  "jianpin": "zzs",
  "level": 2,
  "name": "长治市",
  "pid": "140000000000",
  "pinyin": "zhangzhishi" },
{
  "firstLetter": "j",
  "id": "140500000000",
  "jianpin": "jcs",
  "level": 2,
  "name": "晋城市",
  "pid": "140000000000",
  "pinyin": "jinchengshi" },
{
  "firstLetter": "s",
  "id": "140600000000",
  "jianpin": "szs",
  "level": 2,
  "name": "朔州市",
  "pid": "140000000000",
  "pinyin": "shuozhoushi" },
{
  "firstLetter": "j",
  "id": "140700000000",
  "jianpin": "jzs",
  "level": 2,
  "name": "晋中市",
  "pid": "140000000000",
  "pinyin": "jinzhongshi" },
{
  "firstLetter": "y",
  "id": "140800000000",
  "jianpin": "ycs",
  "level": 2,
  "name": "运城市",
  "pid": "140000000000",
  "pinyin": "yunchengshi" },
{
  "firstLetter": "x",
  "id": "140900000000",
  "jianpin": "xzs",
  "level": 2,
  "name": "忻州市",
  "pid": "140000000000",
  "pinyin": "xinzhoushi" },
{
  "firstLetter": "l",
  "id": "141000000000",
  "jianpin": "lfs",
  "level": 2,
  "name": "临汾市",
  "pid": "140000000000",
  "pinyin": "linfenshi" },
{
  "firstLetter": "l",
  "id": "141100000000",
  "jianpin": "lls",
  "level": 2,
  "name": "吕梁市",
  "pid": "140000000000",
  "pinyin": "lu:liangshi" }],


[{
  "firstLetter": "h",
  "id": "150100000000",
  "jianpin": "hhhts",
  "level": 2,
  "name": "呼和浩特市",
  "pid": "150000000000",
  "pinyin": "huhehaoteshi" },

{
  "firstLetter": "b",
  "id": "150200000000",
  "jianpin": "bts",
  "level": 2,
  "name": "包头市",
  "pid": "150000000000",
  "pinyin": "baotoushi" },

{
  "firstLetter": "w",
  "id": "150300000000",
  "jianpin": "whs",
  "level": 2,
  "name": "乌海市",
  "pid": "150000000000",
  "pinyin": "wuhaishi" },

{
  "firstLetter": "c",
  "id": "150400000000",
  "jianpin": "cfs",
  "level": 2,
  "name": "赤峰市",
  "pid": "150000000000",
  "pinyin": "chifengshi" },

{
  "firstLetter": "t",
  "id": "150500000000",
  "jianpin": "tls",
  "level": 2,
  "name": "通辽市",
  "pid": "150000000000",
  "pinyin": "tongliaoshi" },

{
  "firstLetter": "e",
  "id": "150600000000",
  "jianpin": "eedss",
  "level": 2,
  "name": "鄂尔多斯市",
  "pid": "150000000000",
  "pinyin": "eerduosishi" },

{
  "firstLetter": "h",
  "id": "150700000000",
  "jianpin": "hlbes",
  "level": 2,
  "name": "呼伦贝尔市",
  "pid": "150000000000",
  "pinyin": "hulunbeiershi" },

{
  "firstLetter": "b",
  "id": "150800000000",
  "jianpin": "bynes",
  "level": 2,
  "name": "巴彦淖尔市",
  "pid": "150000000000",
  "pinyin": "bayannaoershi" },

{
  "firstLetter": "w",
  "id": "150900000000",
  "jianpin": "wlcbs",
  "level": 2,
  "name": "乌兰察布市",
  "pid": "150000000000",
  "pinyin": "wulanchabushi" },

{
  "firstLetter": "x",
  "id": "152200000000",
  "jianpin": "xam",
  "level": 2,
  "name": "兴安盟",
  "pid": "150000000000",
  "pinyin": "xinganmeng" },

{
  "firstLetter": "x",
  "id": "152500000000",
  "jianpin": "xlglm",
  "level": 2,
  "name": "锡林郭勒盟",
  "pid": "150000000000",
  "pinyin": "xilinguolemeng" },

{
  "firstLetter": "a",
  "id": "152900000000",
  "jianpin": "alsm",
  "level": 2,
  "name": "阿拉善盟",
  "pid": "150000000000",
  "pinyin": "alashanmeng" }],



[{
  "firstLetter": "s",
  "id": "210100000000",
  "jianpin": "sys",
  "level": 2,
  "name": "沈阳市",
  "pid": "210000000000",
  "pinyin": "shenyangshi" },
{
  "firstLetter": "d",
  "id": "210200000000",
  "jianpin": "dls",
  "level": 2,
  "name": "大连市",
  "pid": "210000000000",
  "pinyin": "dalianshi" },
{
  "firstLetter": "a",
  "id": "210300000000",
  "jianpin": "ass",
  "level": 2,
  "name": "鞍山市",
  "pid": "210000000000",
  "pinyin": "anshanshi" },
{
  "firstLetter": "f",
  "id": "210400000000",
  "jianpin": "fss",
  "level": 2,
  "name": "抚顺市",
  "pid": "210000000000",
  "pinyin": "fushunshi" },
{
  "firstLetter": "b",
  "id": "210500000000",
  "jianpin": "bxs",
  "level": 2,
  "name": "本溪市",
  "pid": "210000000000",
  "pinyin": "benxishi" },
{
  "firstLetter": "d",
  "id": "210600000000",
  "jianpin": "dds",
  "level": 2,
  "name": "丹东市",
  "pid": "210000000000",
  "pinyin": "dandongshi" },
{
  "firstLetter": "j",
  "id": "210700000000",
  "jianpin": "jzs",
  "level": 2,
  "name": "锦州市",
  "pid": "210000000000",
  "pinyin": "jinzhoushi" },
{
  "firstLetter": "y",
  "id": "210800000000",
  "jianpin": "yks",
  "level": 2,
  "name": "营口市",
  "pid": "210000000000",
  "pinyin": "yingkoushi" },
{
  "firstLetter": "f",
  "id": "210900000000",
  "jianpin": "fxs",
  "level": 2,
  "name": "阜新市",
  "pid": "210000000000",
  "pinyin": "fuxinshi" },
{
  "firstLetter": "l",
  "id": "211000000000",
  "jianpin": "lys",
  "level": 2,
  "name": "辽阳市",
  "pid": "210000000000",
  "pinyin": "liaoyangshi" },
{
  "firstLetter": "p",
  "id": "211100000000",
  "jianpin": "pjs",
  "level": 2,
  "name": "盘锦市",
  "pid": "210000000000",
  "pinyin": "panjinshi" },
{
  "firstLetter": "t",
  "id": "211200000000",
  "jianpin": "tls",
  "level": 2,
  "name": "铁岭市",
  "pid": "210000000000",
  "pinyin": "tielingshi" },
{
  "firstLetter": "c",
  "id": "211300000000",
  "jianpin": "cys",
  "level": 2,
  "name": "朝阳市",
  "pid": "210000000000",
  "pinyin": "chaoyangshi" },
{
  "firstLetter": "h",
  "id": "211400000000",
  "jianpin": "hlds",
  "level": 2,
  "name": "葫芦岛市",
  "pid": "210000000000",
  "pinyin": "huludaoshi" }],

[{
  "firstLetter": "z",
  "id": "220100000000",
  "jianpin": "zcs",
  "level": 2,
  "name": "长春市",
  "pid": "220000000000",
  "pinyin": "zhangchunshi" },
{
  "firstLetter": "j",
  "id": "220200000000",
  "jianpin": "jls",
  "level": 2,
  "name": "吉林市",
  "pid": "220000000000",
  "pinyin": "jilinshi" },
{
  "firstLetter": "s",
  "id": "220300000000",
  "jianpin": "sps",
  "level": 2,
  "name": "四平市",
  "pid": "220000000000",
  "pinyin": "sipingshi" },
{
  "firstLetter": "l",
  "id": "220400000000",
  "jianpin": "lys",
  "level": 2,
  "name": "辽源市",
  "pid": "220000000000",
  "pinyin": "liaoyuanshi" },
{
  "firstLetter": "t",
  "id": "220500000000",
  "jianpin": "ths",
  "level": 2,
  "name": "通化市",
  "pid": "220000000000",
  "pinyin": "tonghuashi" },
{
  "firstLetter": "b",
  "id": "220600000000",
  "jianpin": "bss",
  "level": 2,
  "name": "白山市",
  "pid": "220000000000",
  "pinyin": "baishanshi" },
{
  "firstLetter": "s",
  "id": "220700000000",
  "jianpin": "sys",
  "level": 2,
  "name": "松原市",
  "pid": "220000000000",
  "pinyin": "songyuanshi" },
{
  "firstLetter": "b",
  "id": "220800000000",
  "jianpin": "bcs",
  "level": 2,
  "name": "白城市",
  "pid": "220000000000",
  "pinyin": "baichengshi" },
{
  "firstLetter": "y",
  "id": "222400000000",
  "jianpin": "ybcxzzzz",
  "level": 2,
  "name": "延边朝鲜族自治州",
  "pid": "220000000000",
  "pinyin": "yanbianchaoxianzuzizhizhou" }],

[{
  "firstLetter": "h",
  "id": "230100000000",
  "jianpin": "hebs",
  "level": 2,
  "name": "哈尔滨市",
  "pid": "230000000000",
  "pinyin": "haerbinshi" },

{
  "firstLetter": "q",
  "id": "230200000000",
  "jianpin": "qqhes",
  "level": 2,
  "name": "齐齐哈尔市",
  "pid": "230000000000",
  "pinyin": "qiqihaershi" },

{
  "firstLetter": "j",
  "id": "230300000000",
  "jianpin": "jxs",
  "level": 2,
  "name": "鸡西市",
  "pid": "230000000000",
  "pinyin": "jixishi" },

{
  "firstLetter": "h",
  "id": "230400000000",
  "jianpin": "hgs",
  "level": 2,
  "name": "鹤岗市",
  "pid": "230000000000",
  "pinyin": "hegangshi" },

{
  "firstLetter": "s",
  "id": "230500000000",
  "jianpin": "syss",
  "level": 2,
  "name": "双鸭山市",
  "pid": "230000000000",
  "pinyin": "shuangyashanshi" },

{
  "firstLetter": "d",
  "id": "230600000000",
  "jianpin": "dqs",
  "level": 2,
  "name": "大庆市",
  "pid": "230000000000",
  "pinyin": "daqingshi" },

{
  "firstLetter": "y",
  "id": "230700000000",
  "jianpin": "ycs",
  "level": 2,
  "name": "伊春市",
  "pid": "230000000000",
  "pinyin": "yichunshi" },

{
  "firstLetter": "j",
  "id": "230800000000",
  "jianpin": "jmss",
  "level": 2,
  "name": "佳木斯市",
  "pid": "230000000000",
  "pinyin": "jiamusishi" },

{
  "firstLetter": "q",
  "id": "230900000000",
  "jianpin": "qths",
  "level": 2,
  "name": "七台河市",
  "pid": "230000000000",
  "pinyin": "qitaiheshi" },

{
  "firstLetter": "m",
  "id": "231000000000",
  "jianpin": "mdjs",
  "level": 2,
  "name": "牡丹江市",
  "pid": "230000000000",
  "pinyin": "mudanjiangshi" },

{
  "firstLetter": "h",
  "id": "231100000000",
  "jianpin": "hhs",
  "level": 2,
  "name": "黑河市",
  "pid": "230000000000",
  "pinyin": "heiheshi" },

{
  "firstLetter": "s",
  "id": "231200000000",
  "jianpin": "shs",
  "level": 2,
  "name": "绥化市",
  "pid": "230000000000",
  "pinyin": "suihuashi" },

{
  "firstLetter": "d",
  "id": "232700000000",
  "jianpin": "dxaldq",
  "level": 2,
  "name": "大兴安岭地区",
  "pid": "230000000000",
  "pinyin": "daxinganlingdiqu" }],


[{
  "firstLetter": "s",
  "id": "310100000000",
  "jianpin": "sxq",
  "level": 2,
  "name": "市辖区",
  "pid": "310000000000",
  "pinyin": "shixiaqu" }],

[{
  "firstLetter": "n",
  "id": "320100000000",
  "jianpin": "njs",
  "level": 2,
  "name": "南京市",
  "pid": "320000000000",
  "pinyin": "nanjingshi" },

{
  "firstLetter": "w",
  "id": "320200000000",
  "jianpin": "wxs",
  "level": 2,
  "name": "无锡市",
  "pid": "320000000000",
  "pinyin": "wuxishi" },

{
  "firstLetter": "x",
  "id": "320300000000",
  "jianpin": "xzs",
  "level": 2,
  "name": "徐州市",
  "pid": "320000000000",
  "pinyin": "xuzhoushi" },

{
  "firstLetter": "c",
  "id": "320400000000",
  "jianpin": "czs",
  "level": 2,
  "name": "常州市",
  "pid": "320000000000",
  "pinyin": "changzhoushi" },

{
  "firstLetter": "s",
  "id": "320500000000",
  "jianpin": "szs",
  "level": 2,
  "name": "苏州市",
  "pid": "320000000000",
  "pinyin": "suzhoushi" },

{
  "firstLetter": "n",
  "id": "320600000000",
  "jianpin": "nts",
  "level": 2,
  "name": "南通市",
  "pid": "320000000000",
  "pinyin": "nantongshi" },

{
  "firstLetter": "l",
  "id": "320700000000",
  "jianpin": "lygs",
  "level": 2,
  "name": "连云港市",
  "pid": "320000000000",
  "pinyin": "lianyungangshi" },

{
  "firstLetter": "h",
  "id": "320800000000",
  "jianpin": "has",
  "level": 2,
  "name": "淮安市",
  "pid": "320000000000",
  "pinyin": "huaianshi" },

{
  "firstLetter": "y",
  "id": "320900000000",
  "jianpin": "ycs",
  "level": 2,
  "name": "盐城市",
  "pid": "320000000000",
  "pinyin": "yanchengshi" },

{
  "firstLetter": "y",
  "id": "321000000000",
  "jianpin": "yzs",
  "level": 2,
  "name": "扬州市",
  "pid": "320000000000",
  "pinyin": "yangzhoushi" },

{
  "firstLetter": "z",
  "id": "321100000000",
  "jianpin": "zjs",
  "level": 2,
  "name": "镇江市",
  "pid": "320000000000",
  "pinyin": "zhenjiangshi" },

{
  "firstLetter": "t",
  "id": "321200000000",
  "jianpin": "tzs",
  "level": 2,
  "name": "泰州市",
  "pid": "320000000000",
  "pinyin": "taizhoushi" },

{
  "firstLetter": "s",
  "id": "321300000000",
  "jianpin": "sqs",
  "level": 2,
  "name": "宿迁市",
  "pid": "320000000000",
  "pinyin": "suqianshi" }],



[{
  "firstLetter": "h",
  "id": "330100000000",
  "jianpin": "hzs",
  "level": 2,
  "name": "杭州市",
  "pid": "330000000000",
  "pinyin": "hangzhoushi" },
{
  "firstLetter": "n",
  "id": "330200000000",
  "jianpin": "nbs",
  "level": 2,
  "name": "宁波市",
  "pid": "330000000000",
  "pinyin": "ningboshi" },
{
  "firstLetter": "w",
  "id": "330300000000",
  "jianpin": "wzs",
  "level": 2,
  "name": "温州市",
  "pid": "330000000000",
  "pinyin": "wenzhoushi" },
{
  "firstLetter": "j",
  "id": "330400000000",
  "jianpin": "jxs",
  "level": 2,
  "name": "嘉兴市",
  "pid": "330000000000",
  "pinyin": "jiaxingshi" },
{
  "firstLetter": "h",
  "id": "330500000000",
  "jianpin": "hzs",
  "level": 2,
  "name": "湖州市",
  "pid": "330000000000",
  "pinyin": "huzhoushi" },
{
  "firstLetter": "s",
  "id": "330600000000",
  "jianpin": "sxs",
  "level": 2,
  "name": "绍兴市",
  "pid": "330000000000",
  "pinyin": "shaoxingshi" },
{
  "firstLetter": "j",
  "id": "330700000000",
  "jianpin": "jhs",
  "level": 2,
  "name": "金华市",
  "pid": "330000000000",
  "pinyin": "jinhuashi" },
{
  "firstLetter": "q",
  "id": "330800000000",
  "jianpin": "qzs",
  "level": 2,
  "name": "衢州市",
  "pid": "330000000000",
  "pinyin": "quzhoushi" },
{
  "firstLetter": "z",
  "id": "330900000000",
  "jianpin": "zss",
  "level": 2,
  "name": "舟山市",
  "pid": "330000000000",
  "pinyin": "zhoushanshi" },
{
  "firstLetter": "t",
  "id": "331000000000",
  "jianpin": "tzs",
  "level": 2,
  "name": "台州市",
  "pid": "330000000000",
  "pinyin": "taizhoushi" },
{
  "firstLetter": "l",
  "id": "331100000000",
  "jianpin": "lss",
  "level": 2,
  "name": "丽水市",
  "pid": "330000000000",
  "pinyin": "lishuishi" }],

[{
  "firstLetter": "h",
  "id": "340100000000",
  "jianpin": "hfs",
  "level": 2,
  "name": "合肥市",
  "pid": "340000000000",
  "pinyin": "hefeishi" },
{
  "firstLetter": "w",
  "id": "340200000000",
  "jianpin": "whs",
  "level": 2,
  "name": "芜湖市",
  "pid": "340000000000",
  "pinyin": "wuhushi" },
{
  "firstLetter": "b",
  "id": "340300000000",
  "jianpin": "bbs",
  "level": 2,
  "name": "蚌埠市",
  "pid": "340000000000",
  "pinyin": "bangbushi" },
{
  "firstLetter": "h",
  "id": "340400000000",
  "jianpin": "hns",
  "level": 2,
  "name": "淮南市",
  "pid": "340000000000",
  "pinyin": "huainanshi" },
{
  "firstLetter": "m",
  "id": "340500000000",
  "jianpin": "mass",
  "level": 2,
  "name": "马鞍山市",
  "pid": "340000000000",
  "pinyin": "maanshanshi" },
{
  "firstLetter": "h",
  "id": "340600000000",
  "jianpin": "hbs",
  "level": 2,
  "name": "淮北市",
  "pid": "340000000000",
  "pinyin": "huaibeishi" },
{
  "firstLetter": "t",
  "id": "340700000000",
  "jianpin": "tls",
  "level": 2,
  "name": "铜陵市",
  "pid": "340000000000",
  "pinyin": "tonglingshi" },
{
  "firstLetter": "a",
  "id": "340800000000",
  "jianpin": "aqs",
  "level": 2,
  "name": "安庆市",
  "pid": "340000000000",
  "pinyin": "anqingshi" },
{
  "firstLetter": "h",
  "id": "341000000000",
  "jianpin": "hss",
  "level": 2,
  "name": "黄山市",
  "pid": "340000000000",
  "pinyin": "huangshanshi" },
{
  "firstLetter": "c",
  "id": "341100000000",
  "jianpin": "czs",
  "level": 2,
  "name": "滁州市",
  "pid": "340000000000",
  "pinyin": "chuzhoushi" },
{
  "firstLetter": "f",
  "id": "341200000000",
  "jianpin": "fys",
  "level": 2,
  "name": "阜阳市",
  "pid": "340000000000",
  "pinyin": "fuyangshi" },
{
  "firstLetter": "s",
  "id": "341300000000",
  "jianpin": "szs",
  "level": 2,
  "name": "宿州市",
  "pid": "340000000000",
  "pinyin": "suzhoushi" },
{
  "firstLetter": "l",
  "id": "341500000000",
  "jianpin": "las",
  "level": 2,
  "name": "六安市",
  "pid": "340000000000",
  "pinyin": "liuanshi" },
{
  "firstLetter": "b",
  "id": "341600000000",
  "jianpin": "bzs",
  "level": 2,
  "name": "亳州市",
  "pid": "340000000000",
  "pinyin": "bozhoushi" },
{
  "firstLetter": "c",
  "id": "341700000000",
  "jianpin": "czs",
  "level": 2,
  "name": "池州市",
  "pid": "340000000000",
  "pinyin": "chizhoushi" },
{
  "firstLetter": "x",
  "id": "341800000000",
  "jianpin": "xcs",
  "level": 2,
  "name": "宣城市",
  "pid": "340000000000",
  "pinyin": "xuanchengshi" }],

[{
  "firstLetter": "f",
  "id": "350100000000",
  "jianpin": "fzs",
  "level": 2,
  "name": "福州市",
  "pid": "350000000000",
  "pinyin": "fuzhoushi" },

{
  "firstLetter": "s",
  "id": "350200000000",
  "jianpin": "sms",
  "level": 2,
  "name": "厦门市",
  "pid": "350000000000",
  "pinyin": "shamenshi" },

{
  "firstLetter": "p",
  "id": "350300000000",
  "jianpin": "pts",
  "level": 2,
  "name": "莆田市",
  "pid": "350000000000",
  "pinyin": "putianshi" },

{
  "firstLetter": "s",
  "id": "350400000000",
  "jianpin": "sms",
  "level": 2,
  "name": "三明市",
  "pid": "350000000000",
  "pinyin": "sanmingshi" },

{
  "firstLetter": "q",
  "id": "350500000000",
  "jianpin": "qzs",
  "level": 2,
  "name": "泉州市",
  "pid": "350000000000",
  "pinyin": "quanzhoushi" },

{
  "firstLetter": "z",
  "id": "350600000000",
  "jianpin": "zzs",
  "level": 2,
  "name": "漳州市",
  "pid": "350000000000",
  "pinyin": "zhangzhoushi" },

{
  "firstLetter": "n",
  "id": "350700000000",
  "jianpin": "nps",
  "level": 2,
  "name": "南平市",
  "pid": "350000000000",
  "pinyin": "nanpingshi" },

{
  "firstLetter": "l",
  "id": "350800000000",
  "jianpin": "lys",
  "level": 2,
  "name": "龙岩市",
  "pid": "350000000000",
  "pinyin": "longyanshi" },

{
  "firstLetter": "n",
  "id": "350900000000",
  "jianpin": "nds",
  "level": 2,
  "name": "宁德市",
  "pid": "350000000000",
  "pinyin": "ningdeshi" }],


[{
  "firstLetter": "n",
  "id": "360100000000",
  "jianpin": "ncs",
  "level": 2,
  "name": "南昌市",
  "pid": "360000000000",
  "pinyin": "nanchangshi" },

{
  "firstLetter": "j",
  "id": "360200000000",
  "jianpin": "jdzs",
  "level": 2,
  "name": "景德镇市",
  "pid": "360000000000",
  "pinyin": "jingdezhenshi" },

{
  "firstLetter": "p",
  "id": "360300000000",
  "jianpin": "pxs",
  "level": 2,
  "name": "萍乡市",
  "pid": "360000000000",
  "pinyin": "pingxiangshi" },

{
  "firstLetter": "j",
  "id": "360400000000",
  "jianpin": "jjs",
  "level": 2,
  "name": "九江市",
  "pid": "360000000000",
  "pinyin": "jiujiangshi" },

{
  "firstLetter": "x",
  "id": "360500000000",
  "jianpin": "xys",
  "level": 2,
  "name": "新余市",
  "pid": "360000000000",
  "pinyin": "xinyushi" },

{
  "firstLetter": "y",
  "id": "360600000000",
  "jianpin": "yts",
  "level": 2,
  "name": "鹰潭市",
  "pid": "360000000000",
  "pinyin": "yingtanshi" },

{
  "firstLetter": "g",
  "id": "360700000000",
  "jianpin": "gzs",
  "level": 2,
  "name": "赣州市",
  "pid": "360000000000",
  "pinyin": "ganzhoushi" },

{
  "firstLetter": "j",
  "id": "360800000000",
  "jianpin": "jas",
  "level": 2,
  "name": "吉安市",
  "pid": "360000000000",
  "pinyin": "jianshi" },

{
  "firstLetter": "y",
  "id": "360900000000",
  "jianpin": "ycs",
  "level": 2,
  "name": "宜春市",
  "pid": "360000000000",
  "pinyin": "yichunshi" },

{
  "firstLetter": "f",
  "id": "361000000000",
  "jianpin": "fzs",
  "level": 2,
  "name": "抚州市",
  "pid": "360000000000",
  "pinyin": "fuzhoushi" },

{
  "firstLetter": "s",
  "id": "361100000000",
  "jianpin": "srs",
  "level": 2,
  "name": "上饶市",
  "pid": "360000000000",
  "pinyin": "shangraoshi" }],


[{
  "firstLetter": "j",
  "id": "370100000000",
  "jianpin": "jns",
  "level": 2,
  "name": "济南市",
  "pid": "370000000000",
  "pinyin": "jinanshi" },

{
  "firstLetter": "q",
  "id": "370200000000",
  "jianpin": "qds",
  "level": 2,
  "name": "青岛市",
  "pid": "370000000000",
  "pinyin": "qingdaoshi" },

{
  "firstLetter": "z",
  "id": "370300000000",
  "jianpin": "zbs",
  "level": 2,
  "name": "淄博市",
  "pid": "370000000000",
  "pinyin": "ziboshi" },

{
  "firstLetter": "z",
  "id": "370400000000",
  "jianpin": "zzs",
  "level": 2,
  "name": "枣庄市",
  "pid": "370000000000",
  "pinyin": "zaozhuangshi" },

{
  "firstLetter": "d",
  "id": "370500000000",
  "jianpin": "dys",
  "level": 2,
  "name": "东营市",
  "pid": "370000000000",
  "pinyin": "dongyingshi" },

{
  "firstLetter": "y",
  "id": "370600000000",
  "jianpin": "yts",
  "level": 2,
  "name": "烟台市",
  "pid": "370000000000",
  "pinyin": "yantaishi" },

{
  "firstLetter": "w",
  "id": "370700000000",
  "jianpin": "wfs",
  "level": 2,
  "name": "潍坊市",
  "pid": "370000000000",
  "pinyin": "weifangshi" },

{
  "firstLetter": "j",
  "id": "370800000000",
  "jianpin": "jns",
  "level": 2,
  "name": "济宁市",
  "pid": "370000000000",
  "pinyin": "jiningshi" },

{
  "firstLetter": "t",
  "id": "370900000000",
  "jianpin": "tas",
  "level": 2,
  "name": "泰安市",
  "pid": "370000000000",
  "pinyin": "taianshi" },

{
  "firstLetter": "w",
  "id": "371000000000",
  "jianpin": "whs",
  "level": 2,
  "name": "威海市",
  "pid": "370000000000",
  "pinyin": "weihaishi" },

{
  "firstLetter": "r",
  "id": "371100000000",
  "jianpin": "rzs",
  "level": 2,
  "name": "日照市",
  "pid": "370000000000",
  "pinyin": "rizhaoshi" },

{
  "firstLetter": "l",
  "id": "371200000000",
  "jianpin": "lws",
  "level": 2,
  "name": "莱芜市",
  "pid": "370000000000",
  "pinyin": "laiwushi" },

{
  "firstLetter": "l",
  "id": "371300000000",
  "jianpin": "lys",
  "level": 2,
  "name": "临沂市",
  "pid": "370000000000",
  "pinyin": "linyishi" },

{
  "firstLetter": "d",
  "id": "371400000000",
  "jianpin": "dzs",
  "level": 2,
  "name": "德州市",
  "pid": "370000000000",
  "pinyin": "dezhoushi" },

{
  "firstLetter": "l",
  "id": "371500000000",
  "jianpin": "lcs",
  "level": 2,
  "name": "聊城市",
  "pid": "370000000000",
  "pinyin": "liaochengshi" },

{
  "firstLetter": "b",
  "id": "371600000000",
  "jianpin": "bzs",
  "level": 2,
  "name": "滨州市",
  "pid": "370000000000",
  "pinyin": "binzhoushi" },

{
  "firstLetter": "h",
  "id": "371700000000",
  "jianpin": "hzs",
  "level": 2,
  "name": "菏泽市",
  "pid": "370000000000",
  "pinyin": "hezeshi" }],


[{
  "firstLetter": "z",
  "id": "410100000000",
  "jianpin": "zzs",
  "level": 2,
  "name": "郑州市",
  "pid": "410000000000",
  "pinyin": "zhengzhoushi" },

{
  "firstLetter": "k",
  "id": "410200000000",
  "jianpin": "kfs",
  "level": 2,
  "name": "开封市",
  "pid": "410000000000",
  "pinyin": "kaifengshi" },

{
  "firstLetter": "l",
  "id": "410300000000",
  "jianpin": "lys",
  "level": 2,
  "name": "洛阳市",
  "pid": "410000000000",
  "pinyin": "luoyangshi" },

{
  "firstLetter": "p",
  "id": "410400000000",
  "jianpin": "pdss",
  "level": 2,
  "name": "平顶山市",
  "pid": "410000000000",
  "pinyin": "pingdingshanshi" },

{
  "firstLetter": "a",
  "id": "410500000000",
  "jianpin": "ays",
  "level": 2,
  "name": "安阳市",
  "pid": "410000000000",
  "pinyin": "anyangshi" },

{
  "firstLetter": "h",
  "id": "410600000000",
  "jianpin": "hbs",
  "level": 2,
  "name": "鹤壁市",
  "pid": "410000000000",
  "pinyin": "hebishi" },

{
  "firstLetter": "x",
  "id": "410700000000",
  "jianpin": "xxs",
  "level": 2,
  "name": "新乡市",
  "pid": "410000000000",
  "pinyin": "xinxiangshi" },

{
  "firstLetter": "j",
  "id": "410800000000",
  "jianpin": "jzs",
  "level": 2,
  "name": "焦作市",
  "pid": "410000000000",
  "pinyin": "jiaozuoshi" },

{
  "firstLetter": "p",
  "id": "410900000000",
  "jianpin": "pys",
  "level": 2,
  "name": "濮阳市",
  "pid": "410000000000",
  "pinyin": "puyangshi" },

{
  "firstLetter": "x",
  "id": "411000000000",
  "jianpin": "xcs",
  "level": 2,
  "name": "许昌市",
  "pid": "410000000000",
  "pinyin": "xuchangshi" },

{
  "firstLetter": "l",
  "id": "411100000000",
  "jianpin": "lhs",
  "level": 2,
  "name": "漯河市",
  "pid": "410000000000",
  "pinyin": "luoheshi" },

{
  "firstLetter": "s",
  "id": "411200000000",
  "jianpin": "smxs",
  "level": 2,
  "name": "三门峡市",
  "pid": "410000000000",
  "pinyin": "sanmenxiashi" },

{
  "firstLetter": "n",
  "id": "411300000000",
  "jianpin": "nys",
  "level": 2,
  "name": "南阳市",
  "pid": "410000000000",
  "pinyin": "nanyangshi" },

{
  "firstLetter": "s",
  "id": "411400000000",
  "jianpin": "sqs",
  "level": 2,
  "name": "商丘市",
  "pid": "410000000000",
  "pinyin": "shangqiushi" },

{
  "firstLetter": "x",
  "id": "411500000000",
  "jianpin": "xys",
  "level": 2,
  "name": "信阳市",
  "pid": "410000000000",
  "pinyin": "xinyangshi" },

{
  "firstLetter": "z",
  "id": "411600000000",
  "jianpin": "zks",
  "level": 2,
  "name": "周口市",
  "pid": "410000000000",
  "pinyin": "zhoukoushi" },

{
  "firstLetter": "z",
  "id": "411700000000",
  "jianpin": "zmds",
  "level": 2,
  "name": "驻马店市",
  "pid": "410000000000",
  "pinyin": "zhumadianshi" },

{
  "firstLetter": "s",
  "id": "419000000000",
  "jianpin": "szxxjxzqh",
  "level": 2,
  "name": "省直辖县级行政区划",
  "pid": "410000000000",
  "pinyin": "shengzhixiaxianjixingzhengquhua" }],


[{
  "firstLetter": "w",
  "id": "420100000000",
  "jianpin": "whs",
  "level": 2,
  "name": "武汉市",
  "pid": "420000000000",
  "pinyin": "wuhanshi" },

{
  "firstLetter": "h",
  "id": "420200000000",
  "jianpin": "hss",
  "level": 2,
  "name": "黄石市",
  "pid": "420000000000",
  "pinyin": "huangshishi" },

{
  "firstLetter": "s",
  "id": "420300000000",
  "jianpin": "sys",
  "level": 2,
  "name": "十堰市",
  "pid": "420000000000",
  "pinyin": "shiyanshi" },

{
  "firstLetter": "y",
  "id": "420500000000",
  "jianpin": "ycs",
  "level": 2,
  "name": "宜昌市",
  "pid": "420000000000",
  "pinyin": "yichangshi" },

{
  "firstLetter": "x",
  "id": "420600000000",
  "jianpin": "xys",
  "level": 2,
  "name": "襄阳市",
  "pid": "420000000000",
  "pinyin": "xiangyangshi" },

{
  "firstLetter": "e",
  "id": "420700000000",
  "jianpin": "ezs",
  "level": 2,
  "name": "鄂州市",
  "pid": "420000000000",
  "pinyin": "ezhoushi" },

{
  "firstLetter": "j",
  "id": "420800000000",
  "jianpin": "jms",
  "level": 2,
  "name": "荆门市",
  "pid": "420000000000",
  "pinyin": "jingmenshi" },

{
  "firstLetter": "x",
  "id": "420900000000",
  "jianpin": "xgs",
  "level": 2,
  "name": "孝感市",
  "pid": "420000000000",
  "pinyin": "xiaoganshi" },

{
  "firstLetter": "j",
  "id": "421000000000",
  "jianpin": "jzs",
  "level": 2,
  "name": "荆州市",
  "pid": "420000000000",
  "pinyin": "jingzhoushi" },

{
  "firstLetter": "h",
  "id": "421100000000",
  "jianpin": "hgs",
  "level": 2,
  "name": "黄冈市",
  "pid": "420000000000",
  "pinyin": "huanggangshi" },

{
  "firstLetter": "x",
  "id": "421200000000",
  "jianpin": "xns",
  "level": 2,
  "name": "咸宁市",
  "pid": "420000000000",
  "pinyin": "xianningshi" },

{
  "firstLetter": "s",
  "id": "421300000000",
  "jianpin": "szs",
  "level": 2,
  "name": "随州市",
  "pid": "420000000000",
  "pinyin": "suizhoushi" },

{
  "firstLetter": "e",
  "id": "422800000000",
  "jianpin": "estjzmzzzz",
  "level": 2,
  "name": "恩施土家族苗族自治州",
  "pid": "420000000000",
  "pinyin": "enshitujiazumiaozuzizhizhou" },

{
  "firstLetter": "s",
  "id": "429000000000",
  "jianpin": "szxxjxzqh",
  "level": 2,
  "name": "省直辖县级行政区划",
  "pid": "420000000000",
  "pinyin": "shengzhixiaxianjixingzhengquhua" }],



[{
  "firstLetter": "z",
  "id": "430100000000",
  "jianpin": "zss",
  "level": 2,
  "name": "长沙市",
  "pid": "430000000000",
  "pinyin": "zhangshashi" },

{
  "firstLetter": "z",
  "id": "430200000000",
  "jianpin": "zzs",
  "level": 2,
  "name": "株洲市",
  "pid": "430000000000",
  "pinyin": "zhuzhoushi" },

{
  "firstLetter": "x",
  "id": "430300000000",
  "jianpin": "xts",
  "level": 2,
  "name": "湘潭市",
  "pid": "430000000000",
  "pinyin": "xiangtanshi" },

{
  "firstLetter": "h",
  "id": "430400000000",
  "jianpin": "hys",
  "level": 2,
  "name": "衡阳市",
  "pid": "430000000000",
  "pinyin": "hengyangshi" },

{
  "firstLetter": "s",
  "id": "430500000000",
  "jianpin": "sys",
  "level": 2,
  "name": "邵阳市",
  "pid": "430000000000",
  "pinyin": "shaoyangshi" },

{
  "firstLetter": "y",
  "id": "430600000000",
  "jianpin": "yys",
  "level": 2,
  "name": "岳阳市",
  "pid": "430000000000",
  "pinyin": "yueyangshi" },

{
  "firstLetter": "c",
  "id": "430700000000",
  "jianpin": "cds",
  "level": 2,
  "name": "常德市",
  "pid": "430000000000",
  "pinyin": "changdeshi" },

{
  "firstLetter": "z",
  "id": "430800000000",
  "jianpin": "zjjs",
  "level": 2,
  "name": "张家界市",
  "pid": "430000000000",
  "pinyin": "zhangjiajieshi" },

{
  "firstLetter": "y",
  "id": "430900000000",
  "jianpin": "yys",
  "level": 2,
  "name": "益阳市",
  "pid": "430000000000",
  "pinyin": "yiyangshi" },

{
  "firstLetter": "c",
  "id": "431000000000",
  "jianpin": "czs",
  "level": 2,
  "name": "郴州市",
  "pid": "430000000000",
  "pinyin": "chenzhoushi" },

{
  "firstLetter": "y",
  "id": "431100000000",
  "jianpin": "yzs",
  "level": 2,
  "name": "永州市",
  "pid": "430000000000",
  "pinyin": "yongzhoushi" },

{
  "firstLetter": "h",
  "id": "431200000000",
  "jianpin": "hhs",
  "level": 2,
  "name": "怀化市",
  "pid": "430000000000",
  "pinyin": "huaihuashi" },

{
  "firstLetter": "l",
  "id": "431300000000",
  "jianpin": "lds",
  "level": 2,
  "name": "娄底市",
  "pid": "430000000000",
  "pinyin": "loudishi" },

{
  "firstLetter": "x",
  "id": "433100000000",
  "jianpin": "xxtjzmzzzz",
  "level": 2,
  "name": "湘西土家族苗族自治州",
  "pid": "430000000000",
  "pinyin": "xiangxitujiazumiaozuzizhizhou" }],


[{
  "firstLetter": "g",
  "id": "440100000000",
  "jianpin": "gzs",
  "level": 2,
  "name": "广州市",
  "pid": "440000000000",
  "pinyin": "guangzhoushi" },

{
  "firstLetter": "s",
  "id": "440200000000",
  "jianpin": "sgs",
  "level": 2,
  "name": "韶关市",
  "pid": "440000000000",
  "pinyin": "shaoguanshi" },

{
  "firstLetter": "s",
  "id": "440300000000",
  "jianpin": "szs",
  "level": 2,
  "name": "深圳市",
  "pid": "440000000000",
  "pinyin": "shenzhenshi" },

{
  "firstLetter": "z",
  "id": "440400000000",
  "jianpin": "zhs",
  "level": 2,
  "name": "珠海市",
  "pid": "440000000000",
  "pinyin": "zhuhaishi" },

{
  "firstLetter": "s",
  "id": "440500000000",
  "jianpin": "sts",
  "level": 2,
  "name": "汕头市",
  "pid": "440000000000",
  "pinyin": "shantoushi" },

{
  "firstLetter": "f",
  "id": "440600000000",
  "jianpin": "fss",
  "level": 2,
  "name": "佛山市",
  "pid": "440000000000",
  "pinyin": "foshanshi" },

{
  "firstLetter": "j",
  "id": "440700000000",
  "jianpin": "jms",
  "level": 2,
  "name": "江门市",
  "pid": "440000000000",
  "pinyin": "jiangmenshi" },

{
  "firstLetter": "z",
  "id": "440800000000",
  "jianpin": "zjs",
  "level": 2,
  "name": "湛江市",
  "pid": "440000000000",
  "pinyin": "zhanjiangshi" },

{
  "firstLetter": "m",
  "id": "440900000000",
  "jianpin": "mms",
  "level": 2,
  "name": "茂名市",
  "pid": "440000000000",
  "pinyin": "maomingshi" },

{
  "firstLetter": "z",
  "id": "441200000000",
  "jianpin": "zqs",
  "level": 2,
  "name": "肇庆市",
  "pid": "440000000000",
  "pinyin": "zhaoqingshi" },

{
  "firstLetter": "h",
  "id": "441300000000",
  "jianpin": "hzs",
  "level": 2,
  "name": "惠州市",
  "pid": "440000000000",
  "pinyin": "huizhoushi" },

{
  "firstLetter": "m",
  "id": "441400000000",
  "jianpin": "mzs",
  "level": 2,
  "name": "梅州市",
  "pid": "440000000000",
  "pinyin": "meizhoushi" },

{
  "firstLetter": "s",
  "id": "441500000000",
  "jianpin": "sws",
  "level": 2,
  "name": "汕尾市",
  "pid": "440000000000",
  "pinyin": "shanweishi" },

{
  "firstLetter": "h",
  "id": "441600000000",
  "jianpin": "hys",
  "level": 2,
  "name": "河源市",
  "pid": "440000000000",
  "pinyin": "heyuanshi" },

{
  "firstLetter": "y",
  "id": "441700000000",
  "jianpin": "yjs",
  "level": 2,
  "name": "阳江市",
  "pid": "440000000000",
  "pinyin": "yangjiangshi" },

{
  "firstLetter": "q",
  "id": "441800000000",
  "jianpin": "qys",
  "level": 2,
  "name": "清远市",
  "pid": "440000000000",
  "pinyin": "qingyuanshi" },

{
  "firstLetter": "d",
  "id": "441900000000",
  "jianpin": "dgs",
  "level": 2,
  "name": "东莞市",
  "pid": "440000000000",
  "pinyin": "dongguanshi" },

{
  "firstLetter": "z",
  "id": "442000000000",
  "jianpin": "zss",
  "level": 2,
  "name": "中山市",
  "pid": "440000000000",
  "pinyin": "zhongshanshi" },

{
  "firstLetter": "c",
  "id": "445100000000",
  "jianpin": "czs",
  "level": 2,
  "name": "潮州市",
  "pid": "440000000000",
  "pinyin": "chaozhoushi" },

{
  "firstLetter": "j",
  "id": "445200000000",
  "jianpin": "jys",
  "level": 2,
  "name": "揭阳市",
  "pid": "440000000000",
  "pinyin": "jieyangshi" },

{
  "firstLetter": "y",
  "id": "445300000000",
  "jianpin": "yfs",
  "level": 2,
  "name": "云浮市",
  "pid": "440000000000",
  "pinyin": "yunfushi" }],



[{
  "firstLetter": "n",
  "id": "450100000000",
  "jianpin": "nns",
  "level": 2,
  "name": "南宁市",
  "pid": "450000000000",
  "pinyin": "nanningshi" },
{
  "firstLetter": "l",
  "id": "450200000000",
  "jianpin": "lzs",
  "level": 2,
  "name": "柳州市",
  "pid": "450000000000",
  "pinyin": "liuzhoushi" },
{
  "firstLetter": "g",
  "id": "450300000000",
  "jianpin": "gls",
  "level": 2,
  "name": "桂林市",
  "pid": "450000000000",
  "pinyin": "guilinshi" },
{
  "firstLetter": "w",
  "id": "450400000000",
  "jianpin": "wzs",
  "level": 2,
  "name": "梧州市",
  "pid": "450000000000",
  "pinyin": "wuzhoushi" },
{
  "firstLetter": "b",
  "id": "450500000000",
  "jianpin": "bhs",
  "level": 2,
  "name": "北海市",
  "pid": "450000000000",
  "pinyin": "beihaishi" },
{
  "firstLetter": "f",
  "id": "450600000000",
  "jianpin": "fcgs",
  "level": 2,
  "name": "防城港市",
  "pid": "450000000000",
  "pinyin": "fangchenggangshi" },
{
  "firstLetter": "q",
  "id": "450700000000",
  "jianpin": "qzs",
  "level": 2,
  "name": "钦州市",
  "pid": "450000000000",
  "pinyin": "qinzhoushi" },
{
  "firstLetter": "g",
  "id": "450800000000",
  "jianpin": "ggs",
  "level": 2,
  "name": "贵港市",
  "pid": "450000000000",
  "pinyin": "guigangshi" },
{
  "firstLetter": "y",
  "id": "450900000000",
  "jianpin": "yls",
  "level": 2,
  "name": "玉林市",
  "pid": "450000000000",
  "pinyin": "yulinshi" },
{
  "firstLetter": "b",
  "id": "451000000000",
  "jianpin": "bss",
  "level": 2,
  "name": "百色市",
  "pid": "450000000000",
  "pinyin": "baiseshi" },
{
  "firstLetter": "h",
  "id": "451100000000",
  "jianpin": "hzs",
  "level": 2,
  "name": "贺州市",
  "pid": "450000000000",
  "pinyin": "hezhoushi" },
{
  "firstLetter": "h",
  "id": "451200000000",
  "jianpin": "hcs",
  "level": 2,
  "name": "河池市",
  "pid": "450000000000",
  "pinyin": "hechishi" },
{
  "firstLetter": "l",
  "id": "451300000000",
  "jianpin": "lbs",
  "level": 2,
  "name": "来宾市",
  "pid": "450000000000",
  "pinyin": "laibinshi" },
{
  "firstLetter": "c",
  "id": "451400000000",
  "jianpin": "czs",
  "level": 2,
  "name": "崇左市",
  "pid": "450000000000",
  "pinyin": "chongzuoshi" }],

[{
  "firstLetter": "h",
  "id": "460100000000",
  "jianpin": "hks",
  "level": 2,
  "name": "海口市",
  "pid": "460000000000",
  "pinyin": "haikoushi" },

{
  "firstLetter": "s",
  "id": "460200000000",
  "jianpin": "sys",
  "level": 2,
  "name": "三亚市",
  "pid": "460000000000",
  "pinyin": "sanyashi" },

{
  "firstLetter": "s",
  "id": "460300000000",
  "jianpin": "sss",
  "level": 2,
  "name": "三沙市",
  "pid": "460000000000",
  "pinyin": "sanshashi" },

{
  "firstLetter": "d",
  "id": "460400000000",
  "jianpin": "dzs",
  "level": 2,
  "name": "儋州市",
  "pid": "460000000000",
  "pinyin": "danzhoushi" },

{
  "firstLetter": "s",
  "id": "469000000000",
  "jianpin": "szxxjxzqh",
  "level": 2,
  "name": "省直辖县级行政区划",
  "pid": "460000000000",
  "pinyin": "shengzhixiaxianjixingzhengquhua" }],


[{
  "firstLetter": "s",
  "id": "500100000000",
  "jianpin": "sxq",
  "level": 2,
  "name": "市辖区",
  "pid": "500000000000",
  "pinyin": "shixiaqu" },

{
  "firstLetter": "x",
  "id": "500200000000",
  "jianpin": "x",
  "level": 2,
  "name": "县",
  "pid": "500000000000",
  "pinyin": "xian" }],


[{
  "firstLetter": "c",
  "id": "510100000000",
  "jianpin": "cds",
  "level": 2,
  "name": "成都市",
  "pid": "510000000000",
  "pinyin": "chengdoushi" },

{
  "firstLetter": "z",
  "id": "510300000000",
  "jianpin": "zgs",
  "level": 2,
  "name": "自贡市",
  "pid": "510000000000",
  "pinyin": "zigongshi" },

{
  "firstLetter": "p",
  "id": "510400000000",
  "jianpin": "pzhs",
  "level": 2,
  "name": "攀枝花市",
  "pid": "510000000000",
  "pinyin": "panzhihuashi" },

{
  "firstLetter": "l",
  "id": "510500000000",
  "jianpin": "lzs",
  "level": 2,
  "name": "泸州市",
  "pid": "510000000000",
  "pinyin": "luzhoushi" },

{
  "firstLetter": "d",
  "id": "510600000000",
  "jianpin": "dys",
  "level": 2,
  "name": "德阳市",
  "pid": "510000000000",
  "pinyin": "deyangshi" },

{
  "firstLetter": "m",
  "id": "510700000000",
  "jianpin": "mys",
  "level": 2,
  "name": "绵阳市",
  "pid": "510000000000",
  "pinyin": "mianyangshi" },

{
  "firstLetter": "g",
  "id": "510800000000",
  "jianpin": "gys",
  "level": 2,
  "name": "广元市",
  "pid": "510000000000",
  "pinyin": "guangyuanshi" },

{
  "firstLetter": "s",
  "id": "510900000000",
  "jianpin": "sns",
  "level": 2,
  "name": "遂宁市",
  "pid": "510000000000",
  "pinyin": "suiningshi" },

{
  "firstLetter": "n",
  "id": "511000000000",
  "jianpin": "njs",
  "level": 2,
  "name": "内江市",
  "pid": "510000000000",
  "pinyin": "neijiangshi" },

{
  "firstLetter": "l",
  "id": "511100000000",
  "jianpin": "lss",
  "level": 2,
  "name": "乐山市",
  "pid": "510000000000",
  "pinyin": "leshanshi" },

{
  "firstLetter": "n",
  "id": "511300000000",
  "jianpin": "ncs",
  "level": 2,
  "name": "南充市",
  "pid": "510000000000",
  "pinyin": "nanchongshi" },

{
  "firstLetter": "m",
  "id": "511400000000",
  "jianpin": "mss",
  "level": 2,
  "name": "眉山市",
  "pid": "510000000000",
  "pinyin": "meishanshi" },

{
  "firstLetter": "y",
  "id": "511500000000",
  "jianpin": "ybs",
  "level": 2,
  "name": "宜宾市",
  "pid": "510000000000",
  "pinyin": "yibinshi" },

{
  "firstLetter": "g",
  "id": "511600000000",
  "jianpin": "gas",
  "level": 2,
  "name": "广安市",
  "pid": "510000000000",
  "pinyin": "guanganshi" },

{
  "firstLetter": "d",
  "id": "511700000000",
  "jianpin": "dzs",
  "level": 2,
  "name": "达州市",
  "pid": "510000000000",
  "pinyin": "dazhoushi" },

{
  "firstLetter": "y",
  "id": "511800000000",
  "jianpin": "yas",
  "level": 2,
  "name": "雅安市",
  "pid": "510000000000",
  "pinyin": "yaanshi" },

{
  "firstLetter": "b",
  "id": "511900000000",
  "jianpin": "bzs",
  "level": 2,
  "name": "巴中市",
  "pid": "510000000000",
  "pinyin": "bazhongshi" },

{
  "firstLetter": "z",
  "id": "512000000000",
  "jianpin": "zys",
  "level": 2,
  "name": "资阳市",
  "pid": "510000000000",
  "pinyin": "ziyangshi" },

{
  "firstLetter": "a",
  "id": "513200000000",
  "jianpin": "abzzqzzzz",
  "level": 2,
  "name": "阿坝藏族羌族自治州",
  "pid": "510000000000",
  "pinyin": "abazangzuqiangzuzizhizhou" },

{
  "firstLetter": "g",
  "id": "513300000000",
  "jianpin": "gzzzzzz",
  "level": 2,
  "name": "甘孜藏族自治州",
  "pid": "510000000000",
  "pinyin": "ganzizangzuzizhizhou" },

{
  "firstLetter": "l",
  "id": "513400000000",
  "jianpin": "lsyzzzz",
  "level": 2,
  "name": "凉山彝族自治州",
  "pid": "510000000000",
  "pinyin": "liangshanyizuzizhizhou" }],


[{
  "firstLetter": "g",
  "id": "520100000000",
  "jianpin": "gys",
  "level": 2,
  "name": "贵阳市",
  "pid": "520000000000",
  "pinyin": "guiyangshi" },

{
  "firstLetter": "l",
  "id": "520200000000",
  "jianpin": "lpss",
  "level": 2,
  "name": "六盘水市",
  "pid": "520000000000",
  "pinyin": "liupanshuishi" },

{
  "firstLetter": "z",
  "id": "520300000000",
  "jianpin": "zys",
  "level": 2,
  "name": "遵义市",
  "pid": "520000000000",
  "pinyin": "zunyishi" },

{
  "firstLetter": "a",
  "id": "520400000000",
  "jianpin": "ass",
  "level": 2,
  "name": "安顺市",
  "pid": "520000000000",
  "pinyin": "anshunshi" },

{
  "firstLetter": "b",
  "id": "520500000000",
  "jianpin": "bjs",
  "level": 2,
  "name": "毕节市",
  "pid": "520000000000",
  "pinyin": "bijieshi" },

{
  "firstLetter": "t",
  "id": "520600000000",
  "jianpin": "trs",
  "level": 2,
  "name": "铜仁市",
  "pid": "520000000000",
  "pinyin": "tongrenshi" },

{
  "firstLetter": "q",
  "id": "522300000000",
  "jianpin": "qxnbyzmzzzz",
  "level": 2,
  "name": "黔西南布依族苗族自治州",
  "pid": "520000000000",
  "pinyin": "qianxinanbuyizumiaozuzizhizhou" },

{
  "firstLetter": "q",
  "id": "522600000000",
  "jianpin": "qdnmzdzzzz",
  "level": 2,
  "name": "黔东南苗族侗族自治州",
  "pid": "520000000000",
  "pinyin": "qiandongnanmiaozudongzuzizhizhou" },

{
  "firstLetter": "q",
  "id": "522700000000",
  "jianpin": "qnbyzmzzzz",
  "level": 2,
  "name": "黔南布依族苗族自治州",
  "pid": "520000000000",
  "pinyin": "qiannanbuyizumiaozuzizhizhou" }],


[{
  "firstLetter": "k",
  "id": "530100000000",
  "jianpin": "kms",
  "level": 2,
  "name": "昆明市",
  "pid": "530000000000",
  "pinyin": "kunmingshi" },

{
  "firstLetter": "q",
  "id": "530300000000",
  "jianpin": "qjs",
  "level": 2,
  "name": "曲靖市",
  "pid": "530000000000",
  "pinyin": "qujingshi" },

{
  "firstLetter": "y",
  "id": "530400000000",
  "jianpin": "yxs",
  "level": 2,
  "name": "玉溪市",
  "pid": "530000000000",
  "pinyin": "yuxishi" },

{
  "firstLetter": "b",
  "id": "530500000000",
  "jianpin": "bss",
  "level": 2,
  "name": "保山市",
  "pid": "530000000000",
  "pinyin": "baoshanshi" },

{
  "firstLetter": "z",
  "id": "530600000000",
  "jianpin": "zts",
  "level": 2,
  "name": "昭通市",
  "pid": "530000000000",
  "pinyin": "zhaotongshi" },

{
  "firstLetter": "l",
  "id": "530700000000",
  "jianpin": "ljs",
  "level": 2,
  "name": "丽江市",
  "pid": "530000000000",
  "pinyin": "lijiangshi" },

{
  "firstLetter": "p",
  "id": "530800000000",
  "jianpin": "pes",
  "level": 2,
  "name": "普洱市",
  "pid": "530000000000",
  "pinyin": "puershi" },

{
  "firstLetter": "l",
  "id": "530900000000",
  "jianpin": "lcs",
  "level": 2,
  "name": "临沧市",
  "pid": "530000000000",
  "pinyin": "lincangshi" },

{
  "firstLetter": "c",
  "id": "532300000000",
  "jianpin": "cxyzzzz",
  "level": 2,
  "name": "楚雄彝族自治州",
  "pid": "530000000000",
  "pinyin": "chuxiongyizuzizhizhou" },

{
  "firstLetter": "h",
  "id": "532500000000",
  "jianpin": "hhhnzyzzzz",
  "level": 2,
  "name": "红河哈尼族彝族自治州",
  "pid": "530000000000",
  "pinyin": "honghehanizuyizuzizhizhou" },

{
  "firstLetter": "w",
  "id": "532600000000",
  "jianpin": "wszzmzzzz",
  "level": 2,
  "name": "文山壮族苗族自治州",
  "pid": "530000000000",
  "pinyin": "wenshanzhuangzumiaozuzizhizhou" },

{
  "firstLetter": "x",
  "id": "532800000000",
  "jianpin": "xsbndzzzz",
  "level": 2,
  "name": "西双版纳傣族自治州",
  "pid": "530000000000",
  "pinyin": "xishuangbannadaizuzizhizhou" },

{
  "firstLetter": "d",
  "id": "532900000000",
  "jianpin": "dlbzzzz",
  "level": 2,
  "name": "大理白族自治州",
  "pid": "530000000000",
  "pinyin": "dalibaizuzizhizhou" },

{
  "firstLetter": "d",
  "id": "533100000000",
  "jianpin": "dhdzjpzzzz",
  "level": 2,
  "name": "德宏傣族景颇族自治州",
  "pid": "530000000000",
  "pinyin": "dehongdaizujingpozuzizhizhou" },

{
  "firstLetter": "n",
  "id": "533300000000",
  "jianpin": "njlszzzz",
  "level": 2,
  "name": "怒江傈僳族自治州",
  "pid": "530000000000",
  "pinyin": "nujianglisuzuzizhizhou" },

{
  "firstLetter": "d",
  "id": "533400000000",
  "jianpin": "dqzzzzz",
  "level": 2,
  "name": "迪庆藏族自治州",
  "pid": "530000000000",
  "pinyin": "diqingzangzuzizhizhou" }],


[{
  "firstLetter": "l",
  "id": "540100000000",
  "jianpin": "lss",
  "level": 2,
  "name": "拉萨市",
  "pid": "540000000000",
  "pinyin": "lasashi" },

{
  "firstLetter": "r",
  "id": "540200000000",
  "jianpin": "rkzs",
  "level": 2,
  "name": "日喀则市",
  "pid": "540000000000",
  "pinyin": "rikazeshi" },

{
  "firstLetter": "c",
  "id": "540300000000",
  "jianpin": "cds",
  "level": 2,
  "name": "昌都市",
  "pid": "540000000000",
  "pinyin": "changdoushi" },

{
  "firstLetter": "l",
  "id": "540400000000",
  "jianpin": "lzs",
  "level": 2,
  "name": "林芝市",
  "pid": "540000000000",
  "pinyin": "linzhishi" },

{
  "firstLetter": "s",
  "id": "540500000000",
  "jianpin": "sns",
  "level": 2,
  "name": "山南市",
  "pid": "540000000000",
  "pinyin": "shannanshi" },

{
  "firstLetter": "n",
  "id": "542400000000",
  "jianpin": "nqdq",
  "level": 2,
  "name": "那曲地区",
  "pid": "540000000000",
  "pinyin": "neiqudiqu" },

{
  "firstLetter": "a",
  "id": "542500000000",
  "jianpin": "aldq",
  "level": 2,
  "name": "阿里地区",
  "pid": "540000000000",
  "pinyin": "alidiqu" }],


[{
  "firstLetter": "x",
  "id": "610100000000",
  "jianpin": "xas",
  "level": 2,
  "name": "西安市",
  "pid": "610000000000",
  "pinyin": "xianshi" },
{
  "firstLetter": "t",
  "id": "610200000000",
  "jianpin": "tcs",
  "level": 2,
  "name": "铜川市",
  "pid": "610000000000",
  "pinyin": "tongchuanshi" },
{
  "firstLetter": "b",
  "id": "610300000000",
  "jianpin": "bjs",
  "level": 2,
  "name": "宝鸡市",
  "pid": "610000000000",
  "pinyin": "baojishi" },
{
  "firstLetter": "x",
  "id": "610400000000",
  "jianpin": "xys",
  "level": 2,
  "name": "咸阳市",
  "pid": "610000000000",
  "pinyin": "xianyangshi" },
{
  "firstLetter": "w",
  "id": "610500000000",
  "jianpin": "wns",
  "level": 2,
  "name": "渭南市",
  "pid": "610000000000",
  "pinyin": "weinanshi" },
{
  "firstLetter": "y",
  "id": "610600000000",
  "jianpin": "yas",
  "level": 2,
  "name": "延安市",
  "pid": "610000000000",
  "pinyin": "yananshi" },
{
  "firstLetter": "h",
  "id": "610700000000",
  "jianpin": "hzs",
  "level": 2,
  "name": "汉中市",
  "pid": "610000000000",
  "pinyin": "hanzhongshi" },
{
  "firstLetter": "y",
  "id": "610800000000",
  "jianpin": "yls",
  "level": 2,
  "name": "榆林市",
  "pid": "610000000000",
  "pinyin": "yulinshi" },
{
  "firstLetter": "a",
  "id": "610900000000",
  "jianpin": "aks",
  "level": 2,
  "name": "安康市",
  "pid": "610000000000",
  "pinyin": "ankangshi" },
{
  "firstLetter": "s",
  "id": "611000000000",
  "jianpin": "sls",
  "level": 2,
  "name": "商洛市",
  "pid": "610000000000",
  "pinyin": "shangluoshi" }],

[{
  "firstLetter": "l",
  "id": "620100000000",
  "jianpin": "lzs",
  "level": 2,
  "name": "兰州市",
  "pid": "620000000000",
  "pinyin": "lanzhoushi" },
{
  "firstLetter": "j",
  "id": "620200000000",
  "jianpin": "jygs",
  "level": 2,
  "name": "嘉峪关市",
  "pid": "620000000000",
  "pinyin": "jiayuguanshi" },
{
  "firstLetter": "j",
  "id": "620300000000",
  "jianpin": "jcs",
  "level": 2,
  "name": "金昌市",
  "pid": "620000000000",
  "pinyin": "jinchangshi" },
{
  "firstLetter": "b",
  "id": "620400000000",
  "jianpin": "bys",
  "level": 2,
  "name": "白银市",
  "pid": "620000000000",
  "pinyin": "baiyinshi" },
{
  "firstLetter": "t",
  "id": "620500000000",
  "jianpin": "tss",
  "level": 2,
  "name": "天水市",
  "pid": "620000000000",
  "pinyin": "tianshuishi" },
{
  "firstLetter": "w",
  "id": "620600000000",
  "jianpin": "wws",
  "level": 2,
  "name": "武威市",
  "pid": "620000000000",
  "pinyin": "wuweishi" },
{
  "firstLetter": "z",
  "id": "620700000000",
  "jianpin": "zys",
  "level": 2,
  "name": "张掖市",
  "pid": "620000000000",
  "pinyin": "zhangyeshi" },
{
  "firstLetter": "p",
  "id": "620800000000",
  "jianpin": "pls",
  "level": 2,
  "name": "平凉市",
  "pid": "620000000000",
  "pinyin": "pingliangshi" },
{
  "firstLetter": "j",
  "id": "620900000000",
  "jianpin": "jqs",
  "level": 2,
  "name": "酒泉市",
  "pid": "620000000000",
  "pinyin": "jiuquanshi" },
{
  "firstLetter": "q",
  "id": "621000000000",
  "jianpin": "qys",
  "level": 2,
  "name": "庆阳市",
  "pid": "620000000000",
  "pinyin": "qingyangshi" },
{
  "firstLetter": "d",
  "id": "621100000000",
  "jianpin": "dxs",
  "level": 2,
  "name": "定西市",
  "pid": "620000000000",
  "pinyin": "dingxishi" },
{
  "firstLetter": "l",
  "id": "621200000000",
  "jianpin": "lns",
  "level": 2,
  "name": "陇南市",
  "pid": "620000000000",
  "pinyin": "longnanshi" },
{
  "firstLetter": "l",
  "id": "622900000000",
  "jianpin": "lxhzzzz",
  "level": 2,
  "name": "临夏回族自治州",
  "pid": "620000000000",
  "pinyin": "linxiahuizuzizhizhou" },
{
  "firstLetter": "g",
  "id": "623000000000",
  "jianpin": "gnzzzzz",
  "level": 2,
  "name": "甘南藏族自治州",
  "pid": "620000000000",
  "pinyin": "gannanzangzuzizhizhou" }],

[{
  "firstLetter": "x",
  "id": "630100000000",
  "jianpin": "xns",
  "level": 2,
  "name": "西宁市",
  "pid": "630000000000",
  "pinyin": "xiningshi" },
{
  "firstLetter": "h",
  "id": "630200000000",
  "jianpin": "hds",
  "level": 2,
  "name": "海东市",
  "pid": "630000000000",
  "pinyin": "haidongshi" },
{
  "firstLetter": "h",
  "id": "632200000000",
  "jianpin": "hbzzzzz",
  "level": 2,
  "name": "海北藏族自治州",
  "pid": "630000000000",
  "pinyin": "haibeizangzuzizhizhou" },
{
  "firstLetter": "h",
  "id": "632300000000",
  "jianpin": "hnzzzzz",
  "level": 2,
  "name": "黄南藏族自治州",
  "pid": "630000000000",
  "pinyin": "huangnanzangzuzizhizhou" },
{
  "firstLetter": "h",
  "id": "632500000000",
  "jianpin": "hnzzzzz",
  "level": 2,
  "name": "海南藏族自治州",
  "pid": "630000000000",
  "pinyin": "hainanzangzuzizhizhou" },
{
  "firstLetter": "g",
  "id": "632600000000",
  "jianpin": "glzzzzz",
  "level": 2,
  "name": "果洛藏族自治州",
  "pid": "630000000000",
  "pinyin": "guoluozangzuzizhizhou" },
{
  "firstLetter": "y",
  "id": "632700000000",
  "jianpin": "yszzzzz",
  "level": 2,
  "name": "玉树藏族自治州",
  "pid": "630000000000",
  "pinyin": "yushuzangzuzizhizhou" },
{
  "firstLetter": "h",
  "id": "632800000000",
  "jianpin": "hxmgzzzzzz",
  "level": 2,
  "name": "海西蒙古族藏族自治州",
  "pid": "630000000000",
  "pinyin": "haiximengguzuzangzuzizhizhou" }],

[{
  "firstLetter": "y",
  "id": "640100000000",
  "jianpin": "ycs",
  "level": 2,
  "name": "银川市",
  "pid": "640000000000",
  "pinyin": "yinchuanshi" },
{
  "firstLetter": "s",
  "id": "640200000000",
  "jianpin": "szss",
  "level": 2,
  "name": "石嘴山市",
  "pid": "640000000000",
  "pinyin": "shizuishanshi" },
{
  "firstLetter": "w",
  "id": "640300000000",
  "jianpin": "wzs",
  "level": 2,
  "name": "吴忠市",
  "pid": "640000000000",
  "pinyin": "wuzhongshi" },
{
  "firstLetter": "g",
  "id": "640400000000",
  "jianpin": "gys",
  "level": 2,
  "name": "固原市",
  "pid": "640000000000",
  "pinyin": "guyuanshi" },
{
  "firstLetter": "z",
  "id": "640500000000",
  "jianpin": "zws",
  "level": 2,
  "name": "中卫市",
  "pid": "640000000000",
  "pinyin": "zhongweishi" }],

[{
  "firstLetter": "w",
  "id": "650100000000",
  "jianpin": "wlmqs",
  "level": 2,
  "name": "乌鲁木齐市",
  "pid": "650000000000",
  "pinyin": "wulumuqishi" },
{
  "firstLetter": "k",
  "id": "650200000000",
  "jianpin": "klmys",
  "level": 2,
  "name": "克拉玛依市",
  "pid": "650000000000",
  "pinyin": "kelamayishi" },
{
  "firstLetter": "t",
  "id": "650400000000",
  "jianpin": "tlfs",
  "level": 2,
  "name": "吐鲁番市",
  "pid": "650000000000",
  "pinyin": "tulufanshi" },
{
  "firstLetter": "h",
  "id": "650500000000",
  "jianpin": "hms",
  "level": 2,
  "name": "哈密市",
  "pid": "650000000000",
  "pinyin": "hamishi" },
{
  "firstLetter": "c",
  "id": "652300000000",
  "jianpin": "cjhzzzz",
  "level": 2,
  "name": "昌吉回族自治州",
  "pid": "650000000000",
  "pinyin": "changjihuizuzizhizhou" },
{
  "firstLetter": "b",
  "id": "652700000000",
  "jianpin": "betlmgzzz",
  "level": 2,
  "name": "博尔塔拉蒙古自治州",
  "pid": "650000000000",
  "pinyin": "boertalamengguzizhizhou" },
{
  "firstLetter": "b",
  "id": "652800000000",
  "jianpin": "byglmgzzz",
  "level": 2,
  "name": "巴音郭楞蒙古自治州",
  "pid": "650000000000",
  "pinyin": "bayinguolengmengguzizhizhou" },
{
  "firstLetter": "a",
  "id": "652900000000",
  "jianpin": "aksdq",
  "level": 2,
  "name": "阿克苏地区",
  "pid": "650000000000",
  "pinyin": "akesudiqu" },
{
  "firstLetter": "k",
  "id": "653000000000",
  "jianpin": "kzlskekzzzz",
  "level": 2,
  "name": "克孜勒苏柯尔克孜自治州",
  "pid": "650000000000",
  "pinyin": "kezilesukeerkezizizhizhou" },
{
  "firstLetter": "k",
  "id": "653100000000",
  "jianpin": "ksdq",
  "level": 2,
  "name": "喀什地区",
  "pid": "650000000000",
  "pinyin": "kashendiqu" },
{
  "firstLetter": "h",
  "id": "653200000000",
  "jianpin": "htdq",
  "level": 2,
  "name": "和田地区",
  "pid": "650000000000",
  "pinyin": "hetiandiqu" },
{
  "firstLetter": "y",
  "id": "654000000000",
  "jianpin": "ylhskzzz",
  "level": 2,
  "name": "伊犁哈萨克自治州",
  "pid": "650000000000",
  "pinyin": "yilihasakezizhizhou" },
{
  "firstLetter": "t",
  "id": "654200000000",
  "jianpin": "tcdq",
  "level": 2,
  "name": "塔城地区",
  "pid": "650000000000",
  "pinyin": "tachengdiqu" },
{
  "firstLetter": "a",
  "id": "654300000000",
  "jianpin": "altdq",
  "level": 2,
  "name": "阿勒泰地区",
  "pid": "650000000000",
  "pinyin": "aletaidiqu" },
{
  "firstLetter": "z",
  "id": "659000000000",
  "jianpin": "zzqzxxjxzqh",
  "level": 2,
  "name": "自治区直辖县级行政区划",
  "pid": "650000000000",
  "pinyin": "zizhiquzhixiaxianjixingzhengquhua" }]];var _default =


cityData;exports.default = _default;

/***/ }),

/***/ 489:
/*!****************************************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/components/simple-address/city-data/area.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;/* eslint-disable */
var areaData=[
[
[{
"firstLetter":"d",
"id":"110101000000",
"jianpin":"dcq",
"level":3,
"name":"东城区",
"pid":"110100000000",
"pinyin":"dongchengqu"},
{
"firstLetter":"x",
"id":"110102000000",
"jianpin":"xcq",
"level":3,
"name":"西城区",
"pid":"110100000000",
"pinyin":"xichengqu"},
{
"firstLetter":"c",
"id":"110105000000",
"jianpin":"cyq",
"level":3,
"name":"朝阳区",
"pid":"110100000000",
"pinyin":"chaoyangqu"},
{
"firstLetter":"f",
"id":"110106000000",
"jianpin":"ftq",
"level":3,
"name":"丰台区",
"pid":"110100000000",
"pinyin":"fengtaiqu"},
{
"firstLetter":"s",
"id":"110107000000",
"jianpin":"sjsq",
"level":3,
"name":"石景山区",
"pid":"110100000000",
"pinyin":"shijingshanqu"},
{
"firstLetter":"h",
"id":"110108000000",
"jianpin":"hdq",
"level":3,
"name":"海淀区",
"pid":"110100000000",
"pinyin":"haidianqu"},
{
"firstLetter":"m",
"id":"110109000000",
"jianpin":"mtgq",
"level":3,
"name":"门头沟区",
"pid":"110100000000",
"pinyin":"mentougouqu"},
{
"firstLetter":"f",
"id":"110111000000",
"jianpin":"fsq",
"level":3,
"name":"房山区",
"pid":"110100000000",
"pinyin":"fangshanqu"},
{
"firstLetter":"t",
"id":"110112000000",
"jianpin":"tzq",
"level":3,
"name":"通州区",
"pid":"110100000000",
"pinyin":"tongzhouqu"},
{
"firstLetter":"s",
"id":"110113000000",
"jianpin":"syq",
"level":3,
"name":"顺义区",
"pid":"110100000000",
"pinyin":"shunyiqu"},
{
"firstLetter":"c",
"id":"110114000000",
"jianpin":"cpq",
"level":3,
"name":"昌平区",
"pid":"110100000000",
"pinyin":"changpingqu"},
{
"firstLetter":"d",
"id":"110115000000",
"jianpin":"dxq",
"level":3,
"name":"大兴区",
"pid":"110100000000",
"pinyin":"daxingqu"},
{
"firstLetter":"h",
"id":"110116000000",
"jianpin":"hrq",
"level":3,
"name":"怀柔区",
"pid":"110100000000",
"pinyin":"huairouqu"},
{
"firstLetter":"p",
"id":"110117000000",
"jianpin":"pgq",
"level":3,
"name":"平谷区",
"pid":"110100000000",
"pinyin":"pingguqu"},
{
"firstLetter":"m",
"id":"110118000000",
"jianpin":"myq",
"level":3,
"name":"密云区",
"pid":"110100000000",
"pinyin":"miyunqu"},
{
"firstLetter":"y",
"id":"110119000000",
"jianpin":"yqq",
"level":3,
"name":"延庆区",
"pid":"110100000000",
"pinyin":"yanqingqu"}]],



[
[{
"firstLetter":"h",
"id":"120101000000",
"jianpin":"hpq",
"level":3,
"name":"和平区",
"pid":"120100000000",
"pinyin":"hepingqu"},
{
"firstLetter":"h",
"id":"120102000000",
"jianpin":"hdq",
"level":3,
"name":"河东区",
"pid":"120100000000",
"pinyin":"hedongqu"},
{
"firstLetter":"h",
"id":"120103000000",
"jianpin":"hxq",
"level":3,
"name":"河西区",
"pid":"120100000000",
"pinyin":"hexiqu"},
{
"firstLetter":"n",
"id":"120104000000",
"jianpin":"nkq",
"level":3,
"name":"南开区",
"pid":"120100000000",
"pinyin":"nankaiqu"},
{
"firstLetter":"h",
"id":"120105000000",
"jianpin":"hbq",
"level":3,
"name":"河北区",
"pid":"120100000000",
"pinyin":"hebeiqu"},
{
"firstLetter":"h",
"id":"120106000000",
"jianpin":"hqq",
"level":3,
"name":"红桥区",
"pid":"120100000000",
"pinyin":"hongqiaoqu"},
{
"firstLetter":"d",
"id":"120110000000",
"jianpin":"dlq",
"level":3,
"name":"东丽区",
"pid":"120100000000",
"pinyin":"dongliqu"},
{
"firstLetter":"x",
"id":"120111000000",
"jianpin":"xqq",
"level":3,
"name":"西青区",
"pid":"120100000000",
"pinyin":"xiqingqu"},
{
"firstLetter":"j",
"id":"120112000000",
"jianpin":"jnq",
"level":3,
"name":"津南区",
"pid":"120100000000",
"pinyin":"jinnanqu"},
{
"firstLetter":"b",
"id":"120113000000",
"jianpin":"bcq",
"level":3,
"name":"北辰区",
"pid":"120100000000",
"pinyin":"beichenqu"},
{
"firstLetter":"w",
"id":"120114000000",
"jianpin":"wqq",
"level":3,
"name":"武清区",
"pid":"120100000000",
"pinyin":"wuqingqu"},
{
"firstLetter":"b",
"id":"120115000000",
"jianpin":"bcq",
"level":3,
"name":"宝坻区",
"pid":"120100000000",
"pinyin":"baochiqu"},
{
"firstLetter":"b",
"id":"120116000000",
"jianpin":"bhxq",
"level":3,
"name":"滨海新区",
"pid":"120100000000",
"pinyin":"binhaixinqu"},
{
"firstLetter":"n",
"id":"120117000000",
"jianpin":"nhq",
"level":3,
"name":"宁河区",
"pid":"120100000000",
"pinyin":"ninghequ"},
{
"firstLetter":"j",
"id":"120118000000",
"jianpin":"jhq",
"level":3,
"name":"静海区",
"pid":"120100000000",
"pinyin":"jinghaiqu"},
{
"firstLetter":"j",
"id":"120119000000",
"jianpin":"jzq",
"level":3,
"name":"蓟州区",
"pid":"120100000000",
"pinyin":"jizhouqu"}],

[{
"firstLetter":"s",
"id":"130201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"130202000000",
"jianpin":"lnq",
"level":3,
"name":"路南区",
"pid":"130200000000",
"pinyin":"lunanqu"},
{
"firstLetter":"l",
"id":"130203000000",
"jianpin":"lbq",
"level":3,
"name":"路北区",
"pid":"130200000000",
"pinyin":"lubeiqu"},
{
"firstLetter":"g",
"id":"130204000000",
"jianpin":"gyq",
"level":3,
"name":"古冶区",
"pid":"130200000000",
"pinyin":"guyequ"},
{
"firstLetter":"k",
"id":"130205000000",
"jianpin":"kpq",
"level":3,
"name":"开平区",
"pid":"130200000000",
"pinyin":"kaipingqu"},
{
"firstLetter":"f",
"id":"130207000000",
"jianpin":"fnq",
"level":3,
"name":"丰南区",
"pid":"130200000000",
"pinyin":"fengnanqu"},
{
"firstLetter":"f",
"id":"130208000000",
"jianpin":"frq",
"level":3,
"name":"丰润区",
"pid":"130200000000",
"pinyin":"fengrunqu"},
{
"firstLetter":"c",
"id":"130209000000",
"jianpin":"cfdq",
"level":3,
"name":"曹妃甸区",
"pid":"130200000000",
"pinyin":"caofeidianqu"},
{
"firstLetter":"l",
"id":"130223000000",
"jianpin":"lx",
"level":3,
"name":"滦县",
"pid":"130200000000",
"pinyin":"luanxian"},
{
"firstLetter":"l",
"id":"130224000000",
"jianpin":"lnx",
"level":3,
"name":"滦南县",
"pid":"130200000000",
"pinyin":"luannanxian"},
{
"firstLetter":"l",
"id":"130225000000",
"jianpin":"ltx",
"level":3,
"name":"乐亭县",
"pid":"130200000000",
"pinyin":"letingxian"},
{
"firstLetter":"q",
"id":"130227000000",
"jianpin":"qxx",
"level":3,
"name":"迁西县",
"pid":"130200000000",
"pinyin":"qianxixian"},
{
"firstLetter":"y",
"id":"130229000000",
"jianpin":"ytx",
"level":3,
"name":"玉田县",
"pid":"130200000000",
"pinyin":"yutianxian"},
{
"firstLetter":"t",
"id":"130271000000",
"jianpin":"tssltjjjskfq",
"level":3,
"name":"唐山市芦台经济技术开发区",
"pid":"130200000000",
"pinyin":"tangshanshilutaijingjijishukaifaqu"},
{
"firstLetter":"t",
"id":"130272000000",
"jianpin":"tsshgglq",
"level":3,
"name":"唐山市汉沽管理区",
"pid":"130200000000",
"pinyin":"tangshanshihanguguanliqu"},
{
"firstLetter":"t",
"id":"130273000000",
"jianpin":"tsgxjscykfq",
"level":3,
"name":"唐山高新技术产业开发区",
"pid":"130200000000",
"pinyin":"tangshangaoxinjishuchanyekaifaqu"},
{
"firstLetter":"h",
"id":"130274000000",
"jianpin":"hbtshgjjkfq",
"level":3,
"name":"河北唐山海港经济开发区",
"pid":"130200000000",
"pinyin":"hebeitangshanhaigangjingjikaifaqu"},
{
"firstLetter":"z",
"id":"130281000000",
"jianpin":"zhs",
"level":3,
"name":"遵化市",
"pid":"130200000000",
"pinyin":"zunhuashi"},
{
"firstLetter":"q",
"id":"130283000000",
"jianpin":"qas",
"level":3,
"name":"迁安市",
"pid":"130200000000",
"pinyin":"qiananshi"}],

[{
"firstLetter":"s",
"id":"130301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"130302000000",
"jianpin":"hgq",
"level":3,
"name":"海港区",
"pid":"130300000000",
"pinyin":"haigangqu"},
{
"firstLetter":"s",
"id":"130303000000",
"jianpin":"shgq",
"level":3,
"name":"山海关区",
"pid":"130300000000",
"pinyin":"shanhaiguanqu"},
{
"firstLetter":"b",
"id":"130304000000",
"jianpin":"bdhq",
"level":3,
"name":"北戴河区",
"pid":"130300000000",
"pinyin":"beidaihequ"},
{
"firstLetter":"f",
"id":"130306000000",
"jianpin":"fnq",
"level":3,
"name":"抚宁区",
"pid":"130300000000",
"pinyin":"funingqu"},
{
"firstLetter":"q",
"id":"130321000000",
"jianpin":"qlmzzzx",
"level":3,
"name":"青龙满族自治县",
"pid":"130300000000",
"pinyin":"qinglongmanzuzizhixian"},
{
"firstLetter":"c",
"id":"130322000000",
"jianpin":"clx",
"level":3,
"name":"昌黎县",
"pid":"130300000000",
"pinyin":"changlixian"},
{
"firstLetter":"l",
"id":"130324000000",
"jianpin":"llx",
"level":3,
"name":"卢龙县",
"pid":"130300000000",
"pinyin":"lulongxian"},
{
"firstLetter":"q",
"id":"130371000000",
"jianpin":"qhdsjjjskfq",
"level":3,
"name":"秦皇岛市经济技术开发区",
"pid":"130300000000",
"pinyin":"qinhuangdaoshijingjijishukaifaqu"},
{
"firstLetter":"b",
"id":"130372000000",
"jianpin":"bdhxq",
"level":3,
"name":"北戴河新区",
"pid":"130300000000",
"pinyin":"beidaihexinqu"}],

[{
"firstLetter":"s",
"id":"130401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"130402000000",
"jianpin":"hsq",
"level":3,
"name":"邯山区",
"pid":"130400000000",
"pinyin":"hanshanqu"},
{
"firstLetter":"c",
"id":"130403000000",
"jianpin":"ctq",
"level":3,
"name":"丛台区",
"pid":"130400000000",
"pinyin":"congtaiqu"},
{
"firstLetter":"f",
"id":"130404000000",
"jianpin":"fxq",
"level":3,
"name":"复兴区",
"pid":"130400000000",
"pinyin":"fuxingqu"},
{
"firstLetter":"f",
"id":"130406000000",
"jianpin":"ffkq",
"level":3,
"name":"峰峰矿区",
"pid":"130400000000",
"pinyin":"fengfengkuangqu"},
{
"firstLetter":"f",
"id":"130407000000",
"jianpin":"fxq",
"level":3,
"name":"肥乡区",
"pid":"130400000000",
"pinyin":"feixiangqu"},
{
"firstLetter":"y",
"id":"130408000000",
"jianpin":"ynq",
"level":3,
"name":"永年区",
"pid":"130400000000",
"pinyin":"yongnianqu"},
{
"firstLetter":"l",
"id":"130423000000",
"jianpin":"lzx",
"level":3,
"name":"临漳县",
"pid":"130400000000",
"pinyin":"linzhangxian"},
{
"firstLetter":"c",
"id":"130424000000",
"jianpin":"cax",
"level":3,
"name":"成安县",
"pid":"130400000000",
"pinyin":"chenganxian"},
{
"firstLetter":"d",
"id":"130425000000",
"jianpin":"dmx",
"level":3,
"name":"大名县",
"pid":"130400000000",
"pinyin":"damingxian"},
{
"firstLetter":"s",
"id":"130426000000",
"jianpin":"sx",
"level":3,
"name":"涉县",
"pid":"130400000000",
"pinyin":"shexian"},
{
"firstLetter":"c",
"id":"130427000000",
"jianpin":"cx",
"level":3,
"name":"磁县",
"pid":"130400000000",
"pinyin":"cixian"},
{
"firstLetter":"q",
"id":"130430000000",
"jianpin":"qx",
"level":3,
"name":"邱县",
"pid":"130400000000",
"pinyin":"qiuxian"},
{
"firstLetter":"j",
"id":"130431000000",
"jianpin":"jzx",
"level":3,
"name":"鸡泽县",
"pid":"130400000000",
"pinyin":"jizexian"},
{
"firstLetter":"g",
"id":"130432000000",
"jianpin":"gpx",
"level":3,
"name":"广平县",
"pid":"130400000000",
"pinyin":"guangpingxian"},
{
"firstLetter":"g",
"id":"130433000000",
"jianpin":"gtx",
"level":3,
"name":"馆陶县",
"pid":"130400000000",
"pinyin":"guantaoxian"},
{
"firstLetter":"w",
"id":"130434000000",
"jianpin":"wx",
"level":3,
"name":"魏县",
"pid":"130400000000",
"pinyin":"weixian"},
{
"firstLetter":"q",
"id":"130435000000",
"jianpin":"qzx",
"level":3,
"name":"曲周县",
"pid":"130400000000",
"pinyin":"quzhouxian"},
{
"firstLetter":"h",
"id":"130471000000",
"jianpin":"hdjjjskfq",
"level":3,
"name":"邯郸经济技术开发区",
"pid":"130400000000",
"pinyin":"handanjingjijishukaifaqu"},
{
"firstLetter":"h",
"id":"130473000000",
"jianpin":"hdjnxq",
"level":3,
"name":"邯郸冀南新区",
"pid":"130400000000",
"pinyin":"handanjinanxinqu"},
{
"firstLetter":"w",
"id":"130481000000",
"jianpin":"was",
"level":3,
"name":"武安市",
"pid":"130400000000",
"pinyin":"wuanshi"}],

[{
"firstLetter":"s",
"id":"130501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"q",
"id":"130502000000",
"jianpin":"qdq",
"level":3,
"name":"桥东区",
"pid":"130500000000",
"pinyin":"qiaodongqu"},
{
"firstLetter":"q",
"id":"130503000000",
"jianpin":"qxq",
"level":3,
"name":"桥西区",
"pid":"130500000000",
"pinyin":"qiaoxiqu"},
{
"firstLetter":"x",
"id":"130521000000",
"jianpin":"xtx",
"level":3,
"name":"邢台县",
"pid":"130500000000",
"pinyin":"xingtaixian"},
{
"firstLetter":"l",
"id":"130522000000",
"jianpin":"lcx",
"level":3,
"name":"临城县",
"pid":"130500000000",
"pinyin":"linchengxian"},
{
"firstLetter":"n",
"id":"130523000000",
"jianpin":"nqx",
"level":3,
"name":"内丘县",
"pid":"130500000000",
"pinyin":"neiqiuxian"},
{
"firstLetter":"b",
"id":"130524000000",
"jianpin":"bxx",
"level":3,
"name":"柏乡县",
"pid":"130500000000",
"pinyin":"boxiangxian"},
{
"firstLetter":"l",
"id":"130525000000",
"jianpin":"lyx",
"level":3,
"name":"隆尧县",
"pid":"130500000000",
"pinyin":"longyaoxian"},
{
"firstLetter":"r",
"id":"130526000000",
"jianpin":"rx",
"level":3,
"name":"任县",
"pid":"130500000000",
"pinyin":"renxian"},
{
"firstLetter":"n",
"id":"130527000000",
"jianpin":"nhx",
"level":3,
"name":"南和县",
"pid":"130500000000",
"pinyin":"nanhexian"},
{
"firstLetter":"n",
"id":"130528000000",
"jianpin":"njx",
"level":3,
"name":"宁晋县",
"pid":"130500000000",
"pinyin":"ningjinxian"},
{
"firstLetter":"j",
"id":"130529000000",
"jianpin":"jlx",
"level":3,
"name":"巨鹿县",
"pid":"130500000000",
"pinyin":"juluxian"},
{
"firstLetter":"x",
"id":"130530000000",
"jianpin":"xhx",
"level":3,
"name":"新河县",
"pid":"130500000000",
"pinyin":"xinhexian"},
{
"firstLetter":"g",
"id":"130531000000",
"jianpin":"gzx",
"level":3,
"name":"广宗县",
"pid":"130500000000",
"pinyin":"guangzongxian"},
{
"firstLetter":"p",
"id":"130532000000",
"jianpin":"pxx",
"level":3,
"name":"平乡县",
"pid":"130500000000",
"pinyin":"pingxiangxian"},
{
"firstLetter":"w",
"id":"130533000000",
"jianpin":"wx",
"level":3,
"name":"威县",
"pid":"130500000000",
"pinyin":"weixian"},
{
"firstLetter":"q",
"id":"130534000000",
"jianpin":"qhx",
"level":3,
"name":"清河县",
"pid":"130500000000",
"pinyin":"qinghexian"},
{
"firstLetter":"l",
"id":"130535000000",
"jianpin":"lxx",
"level":3,
"name":"临西县",
"pid":"130500000000",
"pinyin":"linxixian"},
{
"firstLetter":"h",
"id":"130571000000",
"jianpin":"hbxtjjkfq",
"level":3,
"name":"河北邢台经济开发区",
"pid":"130500000000",
"pinyin":"hebeixingtaijingjikaifaqu"},
{
"firstLetter":"n",
"id":"130581000000",
"jianpin":"ngs",
"level":3,
"name":"南宫市",
"pid":"130500000000",
"pinyin":"nangongshi"},
{
"firstLetter":"s",
"id":"130582000000",
"jianpin":"shs",
"level":3,
"name":"沙河市",
"pid":"130500000000",
"pinyin":"shaheshi"}],

[{
"firstLetter":"s",
"id":"130601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"130602000000",
"jianpin":"jxq",
"level":3,
"name":"竞秀区",
"pid":"130600000000",
"pinyin":"jingxiuqu"},
{
"firstLetter":"l",
"id":"130606000000",
"jianpin":"lcq",
"level":3,
"name":"莲池区",
"pid":"130600000000",
"pinyin":"lianchiqu"},
{
"firstLetter":"m",
"id":"130607000000",
"jianpin":"mcq",
"level":3,
"name":"满城区",
"pid":"130600000000",
"pinyin":"manchengqu"},
{
"firstLetter":"q",
"id":"130608000000",
"jianpin":"qyq",
"level":3,
"name":"清苑区",
"pid":"130600000000",
"pinyin":"qingyuanqu"},
{
"firstLetter":"x",
"id":"130609000000",
"jianpin":"xsq",
"level":3,
"name":"徐水区",
"pid":"130600000000",
"pinyin":"xushuiqu"},
{
"firstLetter":"l",
"id":"130623000000",
"jianpin":"lsx",
"level":3,
"name":"涞水县",
"pid":"130600000000",
"pinyin":"laishuixian"},
{
"firstLetter":"f",
"id":"130624000000",
"jianpin":"fpx",
"level":3,
"name":"阜平县",
"pid":"130600000000",
"pinyin":"fupingxian"},
{
"firstLetter":"d",
"id":"130626000000",
"jianpin":"dxx",
"level":3,
"name":"定兴县",
"pid":"130600000000",
"pinyin":"dingxingxian"},
{
"firstLetter":"t",
"id":"130627000000",
"jianpin":"tx",
"level":3,
"name":"唐县",
"pid":"130600000000",
"pinyin":"tangxian"},
{
"firstLetter":"g",
"id":"130628000000",
"jianpin":"gyx",
"level":3,
"name":"高阳县",
"pid":"130600000000",
"pinyin":"gaoyangxian"},
{
"firstLetter":"r",
"id":"130629000000",
"jianpin":"rcx",
"level":3,
"name":"容城县",
"pid":"130600000000",
"pinyin":"rongchengxian"},
{
"firstLetter":"l",
"id":"130630000000",
"jianpin":"lyx",
"level":3,
"name":"涞源县",
"pid":"130600000000",
"pinyin":"laiyuanxian"},
{
"firstLetter":"w",
"id":"130631000000",
"jianpin":"wdx",
"level":3,
"name":"望都县",
"pid":"130600000000",
"pinyin":"wangdouxian"},
{
"firstLetter":"a",
"id":"130632000000",
"jianpin":"axx",
"level":3,
"name":"安新县",
"pid":"130600000000",
"pinyin":"anxinxian"},
{
"firstLetter":"y",
"id":"130633000000",
"jianpin":"yx",
"level":3,
"name":"易县",
"pid":"130600000000",
"pinyin":"yixian"},
{
"firstLetter":"q",
"id":"130634000000",
"jianpin":"qyx",
"level":3,
"name":"曲阳县",
"pid":"130600000000",
"pinyin":"quyangxian"},
{
"firstLetter":"l",
"id":"130635000000",
"jianpin":"lx",
"level":3,
"name":"蠡县",
"pid":"130600000000",
"pinyin":"lixian"},
{
"firstLetter":"s",
"id":"130636000000",
"jianpin":"spx",
"level":3,
"name":"顺平县",
"pid":"130600000000",
"pinyin":"shunpingxian"},
{
"firstLetter":"b",
"id":"130637000000",
"jianpin":"byx",
"level":3,
"name":"博野县",
"pid":"130600000000",
"pinyin":"boyexian"},
{
"firstLetter":"x",
"id":"130638000000",
"jianpin":"xx",
"level":3,
"name":"雄县",
"pid":"130600000000",
"pinyin":"xiongxian"},
{
"firstLetter":"b",
"id":"130671000000",
"jianpin":"bdgxjscykfq",
"level":3,
"name":"保定高新技术产业开发区",
"pid":"130600000000",
"pinyin":"baodinggaoxinjishuchanyekaifaqu"},
{
"firstLetter":"b",
"id":"130672000000",
"jianpin":"bdbgxc",
"level":3,
"name":"保定白沟新城",
"pid":"130600000000",
"pinyin":"baodingbaigouxincheng"},
{
"firstLetter":"z",
"id":"130681000000",
"jianpin":"zzs",
"level":3,
"name":"涿州市",
"pid":"130600000000",
"pinyin":"zhuozhoushi"},
{
"firstLetter":"d",
"id":"130682000000",
"jianpin":"dzs",
"level":3,
"name":"定州市",
"pid":"130600000000",
"pinyin":"dingzhoushi"},
{
"firstLetter":"a",
"id":"130683000000",
"jianpin":"ags",
"level":3,
"name":"安国市",
"pid":"130600000000",
"pinyin":"anguoshi"},
{
"firstLetter":"g",
"id":"130684000000",
"jianpin":"gbds",
"level":3,
"name":"高碑店市",
"pid":"130600000000",
"pinyin":"gaobeidianshi"}],

[{
"firstLetter":"s",
"id":"130701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"q",
"id":"130702000000",
"jianpin":"qdq",
"level":3,
"name":"桥东区",
"pid":"130700000000",
"pinyin":"qiaodongqu"},
{
"firstLetter":"q",
"id":"130703000000",
"jianpin":"qxq",
"level":3,
"name":"桥西区",
"pid":"130700000000",
"pinyin":"qiaoxiqu"},
{
"firstLetter":"x",
"id":"130705000000",
"jianpin":"xhq",
"level":3,
"name":"宣化区",
"pid":"130700000000",
"pinyin":"xuanhuaqu"},
{
"firstLetter":"x",
"id":"130706000000",
"jianpin":"xhyq",
"level":3,
"name":"下花园区",
"pid":"130700000000",
"pinyin":"xiahuayuanqu"},
{
"firstLetter":"w",
"id":"130708000000",
"jianpin":"wqq",
"level":3,
"name":"万全区",
"pid":"130700000000",
"pinyin":"wanquanqu"},
{
"firstLetter":"c",
"id":"130709000000",
"jianpin":"clq",
"level":3,
"name":"崇礼区",
"pid":"130700000000",
"pinyin":"chongliqu"},
{
"firstLetter":"z",
"id":"130722000000",
"jianpin":"zbx",
"level":3,
"name":"张北县",
"pid":"130700000000",
"pinyin":"zhangbeixian"},
{
"firstLetter":"k",
"id":"130723000000",
"jianpin":"kbx",
"level":3,
"name":"康保县",
"pid":"130700000000",
"pinyin":"kangbaoxian"},
{
"firstLetter":"g",
"id":"130724000000",
"jianpin":"gyx",
"level":3,
"name":"沽源县",
"pid":"130700000000",
"pinyin":"guyuanxian"},
{
"firstLetter":"s",
"id":"130725000000",
"jianpin":"syx",
"level":3,
"name":"尚义县",
"pid":"130700000000",
"pinyin":"shangyixian"},
{
"firstLetter":"y",
"id":"130726000000",
"jianpin":"yx",
"level":3,
"name":"蔚县",
"pid":"130700000000",
"pinyin":"yuxian"},
{
"firstLetter":"y",
"id":"130727000000",
"jianpin":"yyx",
"level":3,
"name":"阳原县",
"pid":"130700000000",
"pinyin":"yangyuanxian"},
{
"firstLetter":"h",
"id":"130728000000",
"jianpin":"hax",
"level":3,
"name":"怀安县",
"pid":"130700000000",
"pinyin":"huaianxian"},
{
"firstLetter":"h",
"id":"130730000000",
"jianpin":"hlx",
"level":3,
"name":"怀来县",
"pid":"130700000000",
"pinyin":"huailaixian"},
{
"firstLetter":"z",
"id":"130731000000",
"jianpin":"zlx",
"level":3,
"name":"涿鹿县",
"pid":"130700000000",
"pinyin":"zhuoluxian"},
{
"firstLetter":"c",
"id":"130732000000",
"jianpin":"ccx",
"level":3,
"name":"赤城县",
"pid":"130700000000",
"pinyin":"chichengxian"},
{
"firstLetter":"z",
"id":"130771000000",
"jianpin":"zjksgxjscykfq",
"level":3,
"name":"张家口市高新技术产业开发区",
"pid":"130700000000",
"pinyin":"zhangjiakoushigaoxinjishuchanyekaifaqu"},
{
"firstLetter":"z",
"id":"130772000000",
"jianpin":"zjkscbglq",
"level":3,
"name":"张家口市察北管理区",
"pid":"130700000000",
"pinyin":"zhangjiakoushichabeiguanliqu"},
{
"firstLetter":"z",
"id":"130773000000",
"jianpin":"zjkssbglq",
"level":3,
"name":"张家口市塞北管理区",
"pid":"130700000000",
"pinyin":"zhangjiakoushisaibeiguanliqu"}],

[{
"firstLetter":"s",
"id":"130801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"130802000000",
"jianpin":"sqq",
"level":3,
"name":"双桥区",
"pid":"130800000000",
"pinyin":"shuangqiaoqu"},
{
"firstLetter":"s",
"id":"130803000000",
"jianpin":"slq",
"level":3,
"name":"双滦区",
"pid":"130800000000",
"pinyin":"shuangluanqu"},
{
"firstLetter":"y",
"id":"130804000000",
"jianpin":"ysyzkq",
"level":3,
"name":"鹰手营子矿区",
"pid":"130800000000",
"pinyin":"yingshouyingzikuangqu"},
{
"firstLetter":"c",
"id":"130821000000",
"jianpin":"cdx",
"level":3,
"name":"承德县",
"pid":"130800000000",
"pinyin":"chengdexian"},
{
"firstLetter":"x",
"id":"130822000000",
"jianpin":"xlx",
"level":3,
"name":"兴隆县",
"pid":"130800000000",
"pinyin":"xinglongxian"},
{
"firstLetter":"l",
"id":"130824000000",
"jianpin":"lpx",
"level":3,
"name":"滦平县",
"pid":"130800000000",
"pinyin":"luanpingxian"},
{
"firstLetter":"l",
"id":"130825000000",
"jianpin":"lhx",
"level":3,
"name":"隆化县",
"pid":"130800000000",
"pinyin":"longhuaxian"},
{
"firstLetter":"f",
"id":"130826000000",
"jianpin":"fnmzzzx",
"level":3,
"name":"丰宁满族自治县",
"pid":"130800000000",
"pinyin":"fengningmanzuzizhixian"},
{
"firstLetter":"k",
"id":"130827000000",
"jianpin":"kcmzzzx",
"level":3,
"name":"宽城满族自治县",
"pid":"130800000000",
"pinyin":"kuanchengmanzuzizhixian"},
{
"firstLetter":"w",
"id":"130828000000",
"jianpin":"wcmzmgzzzx",
"level":3,
"name":"围场满族蒙古族自治县",
"pid":"130800000000",
"pinyin":"weichangmanzumengguzuzizhixian"},
{
"firstLetter":"c",
"id":"130871000000",
"jianpin":"cdgxjscykfq",
"level":3,
"name":"承德高新技术产业开发区",
"pid":"130800000000",
"pinyin":"chengdegaoxinjishuchanyekaifaqu"},
{
"firstLetter":"p",
"id":"130881000000",
"jianpin":"pqs",
"level":3,
"name":"平泉市",
"pid":"130800000000",
"pinyin":"pingquanshi"}],

[{
"firstLetter":"s",
"id":"130901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"130902000000",
"jianpin":"xhq",
"level":3,
"name":"新华区",
"pid":"130900000000",
"pinyin":"xinhuaqu"},
{
"firstLetter":"y",
"id":"130903000000",
"jianpin":"yhq",
"level":3,
"name":"运河区",
"pid":"130900000000",
"pinyin":"yunhequ"},
{
"firstLetter":"c",
"id":"130921000000",
"jianpin":"cx",
"level":3,
"name":"沧县",
"pid":"130900000000",
"pinyin":"cangxian"},
{
"firstLetter":"q",
"id":"130922000000",
"jianpin":"qx",
"level":3,
"name":"青县",
"pid":"130900000000",
"pinyin":"qingxian"},
{
"firstLetter":"d",
"id":"130923000000",
"jianpin":"dgx",
"level":3,
"name":"东光县",
"pid":"130900000000",
"pinyin":"dongguangxian"},
{
"firstLetter":"h",
"id":"130924000000",
"jianpin":"hxx",
"level":3,
"name":"海兴县",
"pid":"130900000000",
"pinyin":"haixingxian"},
{
"firstLetter":"y",
"id":"130925000000",
"jianpin":"ysx",
"level":3,
"name":"盐山县",
"pid":"130900000000",
"pinyin":"yanshanxian"},
{
"firstLetter":"s",
"id":"130926000000",
"jianpin":"snx",
"level":3,
"name":"肃宁县",
"pid":"130900000000",
"pinyin":"suningxian"},
{
"firstLetter":"n",
"id":"130927000000",
"jianpin":"npx",
"level":3,
"name":"南皮县",
"pid":"130900000000",
"pinyin":"nanpixian"},
{
"firstLetter":"w",
"id":"130928000000",
"jianpin":"wqx",
"level":3,
"name":"吴桥县",
"pid":"130900000000",
"pinyin":"wuqiaoxian"},
{
"firstLetter":"x",
"id":"130929000000",
"jianpin":"xx",
"level":3,
"name":"献县",
"pid":"130900000000",
"pinyin":"xianxian"},
{
"firstLetter":"m",
"id":"130930000000",
"jianpin":"mchzzzx",
"level":3,
"name":"孟村回族自治县",
"pid":"130900000000",
"pinyin":"mengcunhuizuzizhixian"},
{
"firstLetter":"h",
"id":"130971000000",
"jianpin":"hbczjjkfq",
"level":3,
"name":"河北沧州经济开发区",
"pid":"130900000000",
"pinyin":"hebeicangzhoujingjikaifaqu"},
{
"firstLetter":"c",
"id":"130972000000",
"jianpin":"czgxjscykfq",
"level":3,
"name":"沧州高新技术产业开发区",
"pid":"130900000000",
"pinyin":"cangzhougaoxinjishuchanyekaifaqu"},
{
"firstLetter":"c",
"id":"130973000000",
"jianpin":"czbhxq",
"level":3,
"name":"沧州渤海新区",
"pid":"130900000000",
"pinyin":"cangzhoubohaixinqu"},
{
"firstLetter":"b",
"id":"130981000000",
"jianpin":"bts",
"level":3,
"name":"泊头市",
"pid":"130900000000",
"pinyin":"botoushi"},
{
"firstLetter":"r",
"id":"130982000000",
"jianpin":"rqs",
"level":3,
"name":"任丘市",
"pid":"130900000000",
"pinyin":"renqiushi"},
{
"firstLetter":"h",
"id":"130983000000",
"jianpin":"hhs",
"level":3,
"name":"黄骅市",
"pid":"130900000000",
"pinyin":"huanghuashi"},
{
"firstLetter":"h",
"id":"130984000000",
"jianpin":"hjs",
"level":3,
"name":"河间市",
"pid":"130900000000",
"pinyin":"hejianshi"}],

[{
"firstLetter":"s",
"id":"131001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"131000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"a",
"id":"131002000000",
"jianpin":"acq",
"level":3,
"name":"安次区",
"pid":"131000000000",
"pinyin":"anciqu"},
{
"firstLetter":"g",
"id":"131003000000",
"jianpin":"gyq",
"level":3,
"name":"广阳区",
"pid":"131000000000",
"pinyin":"guangyangqu"},
{
"firstLetter":"g",
"id":"131022000000",
"jianpin":"gax",
"level":3,
"name":"固安县",
"pid":"131000000000",
"pinyin":"guanxian"},
{
"firstLetter":"y",
"id":"131023000000",
"jianpin":"yqx",
"level":3,
"name":"永清县",
"pid":"131000000000",
"pinyin":"yongqingxian"},
{
"firstLetter":"x",
"id":"131024000000",
"jianpin":"xhx",
"level":3,
"name":"香河县",
"pid":"131000000000",
"pinyin":"xianghexian"},
{
"firstLetter":"d",
"id":"131025000000",
"jianpin":"dcx",
"level":3,
"name":"大城县",
"pid":"131000000000",
"pinyin":"dachengxian"},
{
"firstLetter":"w",
"id":"131026000000",
"jianpin":"wax",
"level":3,
"name":"文安县",
"pid":"131000000000",
"pinyin":"wenanxian"},
{
"firstLetter":"d",
"id":"131028000000",
"jianpin":"dchzzzx",
"level":3,
"name":"大厂回族自治县",
"pid":"131000000000",
"pinyin":"dachanghuizuzizhixian"},
{
"firstLetter":"l",
"id":"131071000000",
"jianpin":"lfjjjskfq",
"level":3,
"name":"廊坊经济技术开发区",
"pid":"131000000000",
"pinyin":"langfangjingjijishukaifaqu"},
{
"firstLetter":"b",
"id":"131081000000",
"jianpin":"bzs",
"level":3,
"name":"霸州市",
"pid":"131000000000",
"pinyin":"bazhoushi"},
{
"firstLetter":"s",
"id":"131082000000",
"jianpin":"shs",
"level":3,
"name":"三河市",
"pid":"131000000000",
"pinyin":"sanheshi"}],

[{
"firstLetter":"s",
"id":"131101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"131100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"t",
"id":"131102000000",
"jianpin":"tcq",
"level":3,
"name":"桃城区",
"pid":"131100000000",
"pinyin":"taochengqu"},
{
"firstLetter":"j",
"id":"131103000000",
"jianpin":"jzq",
"level":3,
"name":"冀州区",
"pid":"131100000000",
"pinyin":"jizhouqu"},
{
"firstLetter":"z",
"id":"131121000000",
"jianpin":"zqx",
"level":3,
"name":"枣强县",
"pid":"131100000000",
"pinyin":"zaoqiangxian"},
{
"firstLetter":"w",
"id":"131122000000",
"jianpin":"wyx",
"level":3,
"name":"武邑县",
"pid":"131100000000",
"pinyin":"wuyixian"},
{
"firstLetter":"w",
"id":"131123000000",
"jianpin":"wqx",
"level":3,
"name":"武强县",
"pid":"131100000000",
"pinyin":"wuqiangxian"},
{
"firstLetter":"r",
"id":"131124000000",
"jianpin":"ryx",
"level":3,
"name":"饶阳县",
"pid":"131100000000",
"pinyin":"raoyangxian"},
{
"firstLetter":"a",
"id":"131125000000",
"jianpin":"apx",
"level":3,
"name":"安平县",
"pid":"131100000000",
"pinyin":"anpingxian"},
{
"firstLetter":"g",
"id":"131126000000",
"jianpin":"gcx",
"level":3,
"name":"故城县",
"pid":"131100000000",
"pinyin":"guchengxian"},
{
"firstLetter":"j",
"id":"131127000000",
"jianpin":"jx",
"level":3,
"name":"景县",
"pid":"131100000000",
"pinyin":"jingxian"},
{
"firstLetter":"f",
"id":"131128000000",
"jianpin":"fcx",
"level":3,
"name":"阜城县",
"pid":"131100000000",
"pinyin":"fuchengxian"},
{
"firstLetter":"h",
"id":"131171000000",
"jianpin":"hbhsjjkfq",
"level":3,
"name":"河北衡水经济开发区",
"pid":"131100000000",
"pinyin":"hebeihengshuijingjikaifaqu"},
{
"firstLetter":"h",
"id":"131172000000",
"jianpin":"hsbhxq",
"level":3,
"name":"衡水滨湖新区",
"pid":"131100000000",
"pinyin":"hengshuibinhuxinqu"},
{
"firstLetter":"s",
"id":"131182000000",
"jianpin":"szs",
"level":3,
"name":"深州市",
"pid":"131100000000",
"pinyin":"shenzhoushi"}]],



[
[{
"firstLetter":"s",
"id":"130101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"z",
"id":"130102000000",
"jianpin":"zaq",
"level":3,
"name":"长安区",
"pid":"130100000000",
"pinyin":"zhanganqu"},
{
"firstLetter":"q",
"id":"130104000000",
"jianpin":"qxq",
"level":3,
"name":"桥西区",
"pid":"130100000000",
"pinyin":"qiaoxiqu"},
{
"firstLetter":"x",
"id":"130105000000",
"jianpin":"xhq",
"level":3,
"name":"新华区",
"pid":"130100000000",
"pinyin":"xinhuaqu"},
{
"firstLetter":"j",
"id":"130107000000",
"jianpin":"jxkq",
"level":3,
"name":"井陉矿区",
"pid":"130100000000",
"pinyin":"jingxingkuangqu"},
{
"firstLetter":"y",
"id":"130108000000",
"jianpin":"yhq",
"level":3,
"name":"裕华区",
"pid":"130100000000",
"pinyin":"yuhuaqu"},
{
"firstLetter":"g",
"id":"130109000000",
"jianpin":"gcq",
"level":3,
"name":"藁城区",
"pid":"130100000000",
"pinyin":"gaochengqu"},
{
"firstLetter":"l",
"id":"130110000000",
"jianpin":"lqq",
"level":3,
"name":"鹿泉区",
"pid":"130100000000",
"pinyin":"luquanqu"},
{
"firstLetter":"l",
"id":"130111000000",
"jianpin":"lcq",
"level":3,
"name":"栾城区",
"pid":"130100000000",
"pinyin":"luanchengqu"},
{
"firstLetter":"j",
"id":"130121000000",
"jianpin":"jxx",
"level":3,
"name":"井陉县",
"pid":"130100000000",
"pinyin":"jingxingxian"},
{
"firstLetter":"z",
"id":"130123000000",
"jianpin":"zdx",
"level":3,
"name":"正定县",
"pid":"130100000000",
"pinyin":"zhengdingxian"},
{
"firstLetter":"x",
"id":"130125000000",
"jianpin":"xtx",
"level":3,
"name":"行唐县",
"pid":"130100000000",
"pinyin":"xingtangxian"},
{
"firstLetter":"l",
"id":"130126000000",
"jianpin":"lsx",
"level":3,
"name":"灵寿县",
"pid":"130100000000",
"pinyin":"lingshouxian"},
{
"firstLetter":"g",
"id":"130127000000",
"jianpin":"gyx",
"level":3,
"name":"高邑县",
"pid":"130100000000",
"pinyin":"gaoyixian"},
{
"firstLetter":"s",
"id":"130128000000",
"jianpin":"szx",
"level":3,
"name":"深泽县",
"pid":"130100000000",
"pinyin":"shenzexian"},
{
"firstLetter":"z",
"id":"130129000000",
"jianpin":"zhx",
"level":3,
"name":"赞皇县",
"pid":"130100000000",
"pinyin":"zanhuangxian"},
{
"firstLetter":"w",
"id":"130130000000",
"jianpin":"wjx",
"level":3,
"name":"无极县",
"pid":"130100000000",
"pinyin":"wujixian"},
{
"firstLetter":"p",
"id":"130131000000",
"jianpin":"psx",
"level":3,
"name":"平山县",
"pid":"130100000000",
"pinyin":"pingshanxian"},
{
"firstLetter":"y",
"id":"130132000000",
"jianpin":"ysx",
"level":3,
"name":"元氏县",
"pid":"130100000000",
"pinyin":"yuanshixian"},
{
"firstLetter":"z",
"id":"130133000000",
"jianpin":"zx",
"level":3,
"name":"赵县",
"pid":"130100000000",
"pinyin":"zhaoxian"},
{
"firstLetter":"s",
"id":"130171000000",
"jianpin":"sjzgxjscykfq",
"level":3,
"name":"石家庄高新技术产业开发区",
"pid":"130100000000",
"pinyin":"shijiazhuanggaoxinjishuchanyekaifaqu"},
{
"firstLetter":"s",
"id":"130172000000",
"jianpin":"sjzxhhgyq",
"level":3,
"name":"石家庄循环化工园区",
"pid":"130100000000",
"pinyin":"shijiazhuangxunhuanhuagongyuanqu"},
{
"firstLetter":"x",
"id":"130181000000",
"jianpin":"xjs",
"level":3,
"name":"辛集市",
"pid":"130100000000",
"pinyin":"xinjishi"},
{
"firstLetter":"j",
"id":"130183000000",
"jianpin":"jzs",
"level":3,
"name":"晋州市",
"pid":"130100000000",
"pinyin":"jinzhoushi"},
{
"firstLetter":"x",
"id":"130184000000",
"jianpin":"xls",
"level":3,
"name":"新乐市",
"pid":"130100000000",
"pinyin":"xinleshi"}],


[{
"firstLetter":"s",
"id":"130201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"130202000000",
"jianpin":"lnq",
"level":3,
"name":"路南区",
"pid":"130200000000",
"pinyin":"lunanqu"},
{
"firstLetter":"l",
"id":"130203000000",
"jianpin":"lbq",
"level":3,
"name":"路北区",
"pid":"130200000000",
"pinyin":"lubeiqu"},
{
"firstLetter":"g",
"id":"130204000000",
"jianpin":"gyq",
"level":3,
"name":"古冶区",
"pid":"130200000000",
"pinyin":"guyequ"},
{
"firstLetter":"k",
"id":"130205000000",
"jianpin":"kpq",
"level":3,
"name":"开平区",
"pid":"130200000000",
"pinyin":"kaipingqu"},
{
"firstLetter":"f",
"id":"130207000000",
"jianpin":"fnq",
"level":3,
"name":"丰南区",
"pid":"130200000000",
"pinyin":"fengnanqu"},
{
"firstLetter":"f",
"id":"130208000000",
"jianpin":"frq",
"level":3,
"name":"丰润区",
"pid":"130200000000",
"pinyin":"fengrunqu"},
{
"firstLetter":"c",
"id":"130209000000",
"jianpin":"cfdq",
"level":3,
"name":"曹妃甸区",
"pid":"130200000000",
"pinyin":"caofeidianqu"},
{
"firstLetter":"l",
"id":"130223000000",
"jianpin":"lx",
"level":3,
"name":"滦县",
"pid":"130200000000",
"pinyin":"luanxian"},
{
"firstLetter":"l",
"id":"130224000000",
"jianpin":"lnx",
"level":3,
"name":"滦南县",
"pid":"130200000000",
"pinyin":"luannanxian"},
{
"firstLetter":"l",
"id":"130225000000",
"jianpin":"ltx",
"level":3,
"name":"乐亭县",
"pid":"130200000000",
"pinyin":"letingxian"},
{
"firstLetter":"q",
"id":"130227000000",
"jianpin":"qxx",
"level":3,
"name":"迁西县",
"pid":"130200000000",
"pinyin":"qianxixian"},
{
"firstLetter":"y",
"id":"130229000000",
"jianpin":"ytx",
"level":3,
"name":"玉田县",
"pid":"130200000000",
"pinyin":"yutianxian"},
{
"firstLetter":"t",
"id":"130271000000",
"jianpin":"tssltjjjskfq",
"level":3,
"name":"唐山市芦台经济技术开发区",
"pid":"130200000000",
"pinyin":"tangshanshilutaijingjijishukaifaqu"},
{
"firstLetter":"t",
"id":"130272000000",
"jianpin":"tsshgglq",
"level":3,
"name":"唐山市汉沽管理区",
"pid":"130200000000",
"pinyin":"tangshanshihanguguanliqu"},
{
"firstLetter":"t",
"id":"130273000000",
"jianpin":"tsgxjscykfq",
"level":3,
"name":"唐山高新技术产业开发区",
"pid":"130200000000",
"pinyin":"tangshangaoxinjishuchanyekaifaqu"},
{
"firstLetter":"h",
"id":"130274000000",
"jianpin":"hbtshgjjkfq",
"level":3,
"name":"河北唐山海港经济开发区",
"pid":"130200000000",
"pinyin":"hebeitangshanhaigangjingjikaifaqu"},
{
"firstLetter":"z",
"id":"130281000000",
"jianpin":"zhs",
"level":3,
"name":"遵化市",
"pid":"130200000000",
"pinyin":"zunhuashi"},
{
"firstLetter":"q",
"id":"130283000000",
"jianpin":"qas",
"level":3,
"name":"迁安市",
"pid":"130200000000",
"pinyin":"qiananshi"}],

[{
"firstLetter":"s",
"id":"130301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"130302000000",
"jianpin":"hgq",
"level":3,
"name":"海港区",
"pid":"130300000000",
"pinyin":"haigangqu"},
{
"firstLetter":"s",
"id":"130303000000",
"jianpin":"shgq",
"level":3,
"name":"山海关区",
"pid":"130300000000",
"pinyin":"shanhaiguanqu"},
{
"firstLetter":"b",
"id":"130304000000",
"jianpin":"bdhq",
"level":3,
"name":"北戴河区",
"pid":"130300000000",
"pinyin":"beidaihequ"},
{
"firstLetter":"f",
"id":"130306000000",
"jianpin":"fnq",
"level":3,
"name":"抚宁区",
"pid":"130300000000",
"pinyin":"funingqu"},
{
"firstLetter":"q",
"id":"130321000000",
"jianpin":"qlmzzzx",
"level":3,
"name":"青龙满族自治县",
"pid":"130300000000",
"pinyin":"qinglongmanzuzizhixian"},
{
"firstLetter":"c",
"id":"130322000000",
"jianpin":"clx",
"level":3,
"name":"昌黎县",
"pid":"130300000000",
"pinyin":"changlixian"},
{
"firstLetter":"l",
"id":"130324000000",
"jianpin":"llx",
"level":3,
"name":"卢龙县",
"pid":"130300000000",
"pinyin":"lulongxian"},
{
"firstLetter":"q",
"id":"130371000000",
"jianpin":"qhdsjjjskfq",
"level":3,
"name":"秦皇岛市经济技术开发区",
"pid":"130300000000",
"pinyin":"qinhuangdaoshijingjijishukaifaqu"},
{
"firstLetter":"b",
"id":"130372000000",
"jianpin":"bdhxq",
"level":3,
"name":"北戴河新区",
"pid":"130300000000",
"pinyin":"beidaihexinqu"}],

[{
"firstLetter":"s",
"id":"130401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"130402000000",
"jianpin":"hsq",
"level":3,
"name":"邯山区",
"pid":"130400000000",
"pinyin":"hanshanqu"},
{
"firstLetter":"c",
"id":"130403000000",
"jianpin":"ctq",
"level":3,
"name":"丛台区",
"pid":"130400000000",
"pinyin":"congtaiqu"},
{
"firstLetter":"f",
"id":"130404000000",
"jianpin":"fxq",
"level":3,
"name":"复兴区",
"pid":"130400000000",
"pinyin":"fuxingqu"},
{
"firstLetter":"f",
"id":"130406000000",
"jianpin":"ffkq",
"level":3,
"name":"峰峰矿区",
"pid":"130400000000",
"pinyin":"fengfengkuangqu"},
{
"firstLetter":"f",
"id":"130407000000",
"jianpin":"fxq",
"level":3,
"name":"肥乡区",
"pid":"130400000000",
"pinyin":"feixiangqu"},
{
"firstLetter":"y",
"id":"130408000000",
"jianpin":"ynq",
"level":3,
"name":"永年区",
"pid":"130400000000",
"pinyin":"yongnianqu"},
{
"firstLetter":"l",
"id":"130423000000",
"jianpin":"lzx",
"level":3,
"name":"临漳县",
"pid":"130400000000",
"pinyin":"linzhangxian"},
{
"firstLetter":"c",
"id":"130424000000",
"jianpin":"cax",
"level":3,
"name":"成安县",
"pid":"130400000000",
"pinyin":"chenganxian"},
{
"firstLetter":"d",
"id":"130425000000",
"jianpin":"dmx",
"level":3,
"name":"大名县",
"pid":"130400000000",
"pinyin":"damingxian"},
{
"firstLetter":"s",
"id":"130426000000",
"jianpin":"sx",
"level":3,
"name":"涉县",
"pid":"130400000000",
"pinyin":"shexian"},
{
"firstLetter":"c",
"id":"130427000000",
"jianpin":"cx",
"level":3,
"name":"磁县",
"pid":"130400000000",
"pinyin":"cixian"},
{
"firstLetter":"q",
"id":"130430000000",
"jianpin":"qx",
"level":3,
"name":"邱县",
"pid":"130400000000",
"pinyin":"qiuxian"},
{
"firstLetter":"j",
"id":"130431000000",
"jianpin":"jzx",
"level":3,
"name":"鸡泽县",
"pid":"130400000000",
"pinyin":"jizexian"},
{
"firstLetter":"g",
"id":"130432000000",
"jianpin":"gpx",
"level":3,
"name":"广平县",
"pid":"130400000000",
"pinyin":"guangpingxian"},
{
"firstLetter":"g",
"id":"130433000000",
"jianpin":"gtx",
"level":3,
"name":"馆陶县",
"pid":"130400000000",
"pinyin":"guantaoxian"},
{
"firstLetter":"w",
"id":"130434000000",
"jianpin":"wx",
"level":3,
"name":"魏县",
"pid":"130400000000",
"pinyin":"weixian"},
{
"firstLetter":"q",
"id":"130435000000",
"jianpin":"qzx",
"level":3,
"name":"曲周县",
"pid":"130400000000",
"pinyin":"quzhouxian"},
{
"firstLetter":"h",
"id":"130471000000",
"jianpin":"hdjjjskfq",
"level":3,
"name":"邯郸经济技术开发区",
"pid":"130400000000",
"pinyin":"handanjingjijishukaifaqu"},
{
"firstLetter":"h",
"id":"130473000000",
"jianpin":"hdjnxq",
"level":3,
"name":"邯郸冀南新区",
"pid":"130400000000",
"pinyin":"handanjinanxinqu"},
{
"firstLetter":"w",
"id":"130481000000",
"jianpin":"was",
"level":3,
"name":"武安市",
"pid":"130400000000",
"pinyin":"wuanshi"}],

[{
"firstLetter":"s",
"id":"130501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"q",
"id":"130502000000",
"jianpin":"qdq",
"level":3,
"name":"桥东区",
"pid":"130500000000",
"pinyin":"qiaodongqu"},
{
"firstLetter":"q",
"id":"130503000000",
"jianpin":"qxq",
"level":3,
"name":"桥西区",
"pid":"130500000000",
"pinyin":"qiaoxiqu"},
{
"firstLetter":"x",
"id":"130521000000",
"jianpin":"xtx",
"level":3,
"name":"邢台县",
"pid":"130500000000",
"pinyin":"xingtaixian"},
{
"firstLetter":"l",
"id":"130522000000",
"jianpin":"lcx",
"level":3,
"name":"临城县",
"pid":"130500000000",
"pinyin":"linchengxian"},
{
"firstLetter":"n",
"id":"130523000000",
"jianpin":"nqx",
"level":3,
"name":"内丘县",
"pid":"130500000000",
"pinyin":"neiqiuxian"},
{
"firstLetter":"b",
"id":"130524000000",
"jianpin":"bxx",
"level":3,
"name":"柏乡县",
"pid":"130500000000",
"pinyin":"boxiangxian"},
{
"firstLetter":"l",
"id":"130525000000",
"jianpin":"lyx",
"level":3,
"name":"隆尧县",
"pid":"130500000000",
"pinyin":"longyaoxian"},
{
"firstLetter":"r",
"id":"130526000000",
"jianpin":"rx",
"level":3,
"name":"任县",
"pid":"130500000000",
"pinyin":"renxian"},
{
"firstLetter":"n",
"id":"130527000000",
"jianpin":"nhx",
"level":3,
"name":"南和县",
"pid":"130500000000",
"pinyin":"nanhexian"},
{
"firstLetter":"n",
"id":"130528000000",
"jianpin":"njx",
"level":3,
"name":"宁晋县",
"pid":"130500000000",
"pinyin":"ningjinxian"},
{
"firstLetter":"j",
"id":"130529000000",
"jianpin":"jlx",
"level":3,
"name":"巨鹿县",
"pid":"130500000000",
"pinyin":"juluxian"},
{
"firstLetter":"x",
"id":"130530000000",
"jianpin":"xhx",
"level":3,
"name":"新河县",
"pid":"130500000000",
"pinyin":"xinhexian"},
{
"firstLetter":"g",
"id":"130531000000",
"jianpin":"gzx",
"level":3,
"name":"广宗县",
"pid":"130500000000",
"pinyin":"guangzongxian"},
{
"firstLetter":"p",
"id":"130532000000",
"jianpin":"pxx",
"level":3,
"name":"平乡县",
"pid":"130500000000",
"pinyin":"pingxiangxian"},
{
"firstLetter":"w",
"id":"130533000000",
"jianpin":"wx",
"level":3,
"name":"威县",
"pid":"130500000000",
"pinyin":"weixian"},
{
"firstLetter":"q",
"id":"130534000000",
"jianpin":"qhx",
"level":3,
"name":"清河县",
"pid":"130500000000",
"pinyin":"qinghexian"},
{
"firstLetter":"l",
"id":"130535000000",
"jianpin":"lxx",
"level":3,
"name":"临西县",
"pid":"130500000000",
"pinyin":"linxixian"},
{
"firstLetter":"h",
"id":"130571000000",
"jianpin":"hbxtjjkfq",
"level":3,
"name":"河北邢台经济开发区",
"pid":"130500000000",
"pinyin":"hebeixingtaijingjikaifaqu"},
{
"firstLetter":"n",
"id":"130581000000",
"jianpin":"ngs",
"level":3,
"name":"南宫市",
"pid":"130500000000",
"pinyin":"nangongshi"},
{
"firstLetter":"s",
"id":"130582000000",
"jianpin":"shs",
"level":3,
"name":"沙河市",
"pid":"130500000000",
"pinyin":"shaheshi"}],


[{
"firstLetter":"s",
"id":"130601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"130602000000",
"jianpin":"jxq",
"level":3,
"name":"竞秀区",
"pid":"130600000000",
"pinyin":"jingxiuqu"},
{
"firstLetter":"l",
"id":"130606000000",
"jianpin":"lcq",
"level":3,
"name":"莲池区",
"pid":"130600000000",
"pinyin":"lianchiqu"},
{
"firstLetter":"m",
"id":"130607000000",
"jianpin":"mcq",
"level":3,
"name":"满城区",
"pid":"130600000000",
"pinyin":"manchengqu"},
{
"firstLetter":"q",
"id":"130608000000",
"jianpin":"qyq",
"level":3,
"name":"清苑区",
"pid":"130600000000",
"pinyin":"qingyuanqu"},
{
"firstLetter":"x",
"id":"130609000000",
"jianpin":"xsq",
"level":3,
"name":"徐水区",
"pid":"130600000000",
"pinyin":"xushuiqu"},
{
"firstLetter":"l",
"id":"130623000000",
"jianpin":"lsx",
"level":3,
"name":"涞水县",
"pid":"130600000000",
"pinyin":"laishuixian"},
{
"firstLetter":"f",
"id":"130624000000",
"jianpin":"fpx",
"level":3,
"name":"阜平县",
"pid":"130600000000",
"pinyin":"fupingxian"},
{
"firstLetter":"d",
"id":"130626000000",
"jianpin":"dxx",
"level":3,
"name":"定兴县",
"pid":"130600000000",
"pinyin":"dingxingxian"},
{
"firstLetter":"t",
"id":"130627000000",
"jianpin":"tx",
"level":3,
"name":"唐县",
"pid":"130600000000",
"pinyin":"tangxian"},
{
"firstLetter":"g",
"id":"130628000000",
"jianpin":"gyx",
"level":3,
"name":"高阳县",
"pid":"130600000000",
"pinyin":"gaoyangxian"},
{
"firstLetter":"r",
"id":"130629000000",
"jianpin":"rcx",
"level":3,
"name":"容城县",
"pid":"130600000000",
"pinyin":"rongchengxian"},
{
"firstLetter":"l",
"id":"130630000000",
"jianpin":"lyx",
"level":3,
"name":"涞源县",
"pid":"130600000000",
"pinyin":"laiyuanxian"},
{
"firstLetter":"w",
"id":"130631000000",
"jianpin":"wdx",
"level":3,
"name":"望都县",
"pid":"130600000000",
"pinyin":"wangdouxian"},
{
"firstLetter":"a",
"id":"130632000000",
"jianpin":"axx",
"level":3,
"name":"安新县",
"pid":"130600000000",
"pinyin":"anxinxian"},
{
"firstLetter":"y",
"id":"130633000000",
"jianpin":"yx",
"level":3,
"name":"易县",
"pid":"130600000000",
"pinyin":"yixian"},
{
"firstLetter":"q",
"id":"130634000000",
"jianpin":"qyx",
"level":3,
"name":"曲阳县",
"pid":"130600000000",
"pinyin":"quyangxian"},
{
"firstLetter":"l",
"id":"130635000000",
"jianpin":"lx",
"level":3,
"name":"蠡县",
"pid":"130600000000",
"pinyin":"lixian"},
{
"firstLetter":"s",
"id":"130636000000",
"jianpin":"spx",
"level":3,
"name":"顺平县",
"pid":"130600000000",
"pinyin":"shunpingxian"},
{
"firstLetter":"b",
"id":"130637000000",
"jianpin":"byx",
"level":3,
"name":"博野县",
"pid":"130600000000",
"pinyin":"boyexian"},
{
"firstLetter":"x",
"id":"130638000000",
"jianpin":"xx",
"level":3,
"name":"雄县",
"pid":"130600000000",
"pinyin":"xiongxian"},
{
"firstLetter":"b",
"id":"130671000000",
"jianpin":"bdgxjscykfq",
"level":3,
"name":"保定高新技术产业开发区",
"pid":"130600000000",
"pinyin":"baodinggaoxinjishuchanyekaifaqu"},
{
"firstLetter":"b",
"id":"130672000000",
"jianpin":"bdbgxc",
"level":3,
"name":"保定白沟新城",
"pid":"130600000000",
"pinyin":"baodingbaigouxincheng"},
{
"firstLetter":"z",
"id":"130681000000",
"jianpin":"zzs",
"level":3,
"name":"涿州市",
"pid":"130600000000",
"pinyin":"zhuozhoushi"},
{
"firstLetter":"d",
"id":"130682000000",
"jianpin":"dzs",
"level":3,
"name":"定州市",
"pid":"130600000000",
"pinyin":"dingzhoushi"},
{
"firstLetter":"a",
"id":"130683000000",
"jianpin":"ags",
"level":3,
"name":"安国市",
"pid":"130600000000",
"pinyin":"anguoshi"},
{
"firstLetter":"g",
"id":"130684000000",
"jianpin":"gbds",
"level":3,
"name":"高碑店市",
"pid":"130600000000",
"pinyin":"gaobeidianshi"}],

[{
"firstLetter":"s",
"id":"130701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"q",
"id":"130702000000",
"jianpin":"qdq",
"level":3,
"name":"桥东区",
"pid":"130700000000",
"pinyin":"qiaodongqu"},
{
"firstLetter":"q",
"id":"130703000000",
"jianpin":"qxq",
"level":3,
"name":"桥西区",
"pid":"130700000000",
"pinyin":"qiaoxiqu"},
{
"firstLetter":"x",
"id":"130705000000",
"jianpin":"xhq",
"level":3,
"name":"宣化区",
"pid":"130700000000",
"pinyin":"xuanhuaqu"},
{
"firstLetter":"x",
"id":"130706000000",
"jianpin":"xhyq",
"level":3,
"name":"下花园区",
"pid":"130700000000",
"pinyin":"xiahuayuanqu"},
{
"firstLetter":"w",
"id":"130708000000",
"jianpin":"wqq",
"level":3,
"name":"万全区",
"pid":"130700000000",
"pinyin":"wanquanqu"},
{
"firstLetter":"c",
"id":"130709000000",
"jianpin":"clq",
"level":3,
"name":"崇礼区",
"pid":"130700000000",
"pinyin":"chongliqu"},
{
"firstLetter":"z",
"id":"130722000000",
"jianpin":"zbx",
"level":3,
"name":"张北县",
"pid":"130700000000",
"pinyin":"zhangbeixian"},
{
"firstLetter":"k",
"id":"130723000000",
"jianpin":"kbx",
"level":3,
"name":"康保县",
"pid":"130700000000",
"pinyin":"kangbaoxian"},
{
"firstLetter":"g",
"id":"130724000000",
"jianpin":"gyx",
"level":3,
"name":"沽源县",
"pid":"130700000000",
"pinyin":"guyuanxian"},
{
"firstLetter":"s",
"id":"130725000000",
"jianpin":"syx",
"level":3,
"name":"尚义县",
"pid":"130700000000",
"pinyin":"shangyixian"},
{
"firstLetter":"y",
"id":"130726000000",
"jianpin":"yx",
"level":3,
"name":"蔚县",
"pid":"130700000000",
"pinyin":"yuxian"},
{
"firstLetter":"y",
"id":"130727000000",
"jianpin":"yyx",
"level":3,
"name":"阳原县",
"pid":"130700000000",
"pinyin":"yangyuanxian"},
{
"firstLetter":"h",
"id":"130728000000",
"jianpin":"hax",
"level":3,
"name":"怀安县",
"pid":"130700000000",
"pinyin":"huaianxian"},
{
"firstLetter":"h",
"id":"130730000000",
"jianpin":"hlx",
"level":3,
"name":"怀来县",
"pid":"130700000000",
"pinyin":"huailaixian"},
{
"firstLetter":"z",
"id":"130731000000",
"jianpin":"zlx",
"level":3,
"name":"涿鹿县",
"pid":"130700000000",
"pinyin":"zhuoluxian"},
{
"firstLetter":"c",
"id":"130732000000",
"jianpin":"ccx",
"level":3,
"name":"赤城县",
"pid":"130700000000",
"pinyin":"chichengxian"},
{
"firstLetter":"z",
"id":"130771000000",
"jianpin":"zjksgxjscykfq",
"level":3,
"name":"张家口市高新技术产业开发区",
"pid":"130700000000",
"pinyin":"zhangjiakoushigaoxinjishuchanyekaifaqu"},
{
"firstLetter":"z",
"id":"130772000000",
"jianpin":"zjkscbglq",
"level":3,
"name":"张家口市察北管理区",
"pid":"130700000000",
"pinyin":"zhangjiakoushichabeiguanliqu"},
{
"firstLetter":"z",
"id":"130773000000",
"jianpin":"zjkssbglq",
"level":3,
"name":"张家口市塞北管理区",
"pid":"130700000000",
"pinyin":"zhangjiakoushisaibeiguanliqu"}],

[{
"firstLetter":"s",
"id":"130801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"130802000000",
"jianpin":"sqq",
"level":3,
"name":"双桥区",
"pid":"130800000000",
"pinyin":"shuangqiaoqu"},
{
"firstLetter":"s",
"id":"130803000000",
"jianpin":"slq",
"level":3,
"name":"双滦区",
"pid":"130800000000",
"pinyin":"shuangluanqu"},
{
"firstLetter":"y",
"id":"130804000000",
"jianpin":"ysyzkq",
"level":3,
"name":"鹰手营子矿区",
"pid":"130800000000",
"pinyin":"yingshouyingzikuangqu"},
{
"firstLetter":"c",
"id":"130821000000",
"jianpin":"cdx",
"level":3,
"name":"承德县",
"pid":"130800000000",
"pinyin":"chengdexian"},
{
"firstLetter":"x",
"id":"130822000000",
"jianpin":"xlx",
"level":3,
"name":"兴隆县",
"pid":"130800000000",
"pinyin":"xinglongxian"},
{
"firstLetter":"l",
"id":"130824000000",
"jianpin":"lpx",
"level":3,
"name":"滦平县",
"pid":"130800000000",
"pinyin":"luanpingxian"},
{
"firstLetter":"l",
"id":"130825000000",
"jianpin":"lhx",
"level":3,
"name":"隆化县",
"pid":"130800000000",
"pinyin":"longhuaxian"},
{
"firstLetter":"f",
"id":"130826000000",
"jianpin":"fnmzzzx",
"level":3,
"name":"丰宁满族自治县",
"pid":"130800000000",
"pinyin":"fengningmanzuzizhixian"},
{
"firstLetter":"k",
"id":"130827000000",
"jianpin":"kcmzzzx",
"level":3,
"name":"宽城满族自治县",
"pid":"130800000000",
"pinyin":"kuanchengmanzuzizhixian"},
{
"firstLetter":"w",
"id":"130828000000",
"jianpin":"wcmzmgzzzx",
"level":3,
"name":"围场满族蒙古族自治县",
"pid":"130800000000",
"pinyin":"weichangmanzumengguzuzizhixian"},
{
"firstLetter":"c",
"id":"130871000000",
"jianpin":"cdgxjscykfq",
"level":3,
"name":"承德高新技术产业开发区",
"pid":"130800000000",
"pinyin":"chengdegaoxinjishuchanyekaifaqu"},
{
"firstLetter":"p",
"id":"130881000000",
"jianpin":"pqs",
"level":3,
"name":"平泉市",
"pid":"130800000000",
"pinyin":"pingquanshi"}],

[{
"firstLetter":"s",
"id":"130901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"130900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"130902000000",
"jianpin":"xhq",
"level":3,
"name":"新华区",
"pid":"130900000000",
"pinyin":"xinhuaqu"},
{
"firstLetter":"y",
"id":"130903000000",
"jianpin":"yhq",
"level":3,
"name":"运河区",
"pid":"130900000000",
"pinyin":"yunhequ"},
{
"firstLetter":"c",
"id":"130921000000",
"jianpin":"cx",
"level":3,
"name":"沧县",
"pid":"130900000000",
"pinyin":"cangxian"},
{
"firstLetter":"q",
"id":"130922000000",
"jianpin":"qx",
"level":3,
"name":"青县",
"pid":"130900000000",
"pinyin":"qingxian"},
{
"firstLetter":"d",
"id":"130923000000",
"jianpin":"dgx",
"level":3,
"name":"东光县",
"pid":"130900000000",
"pinyin":"dongguangxian"},
{
"firstLetter":"h",
"id":"130924000000",
"jianpin":"hxx",
"level":3,
"name":"海兴县",
"pid":"130900000000",
"pinyin":"haixingxian"},
{
"firstLetter":"y",
"id":"130925000000",
"jianpin":"ysx",
"level":3,
"name":"盐山县",
"pid":"130900000000",
"pinyin":"yanshanxian"},
{
"firstLetter":"s",
"id":"130926000000",
"jianpin":"snx",
"level":3,
"name":"肃宁县",
"pid":"130900000000",
"pinyin":"suningxian"},
{
"firstLetter":"n",
"id":"130927000000",
"jianpin":"npx",
"level":3,
"name":"南皮县",
"pid":"130900000000",
"pinyin":"nanpixian"},
{
"firstLetter":"w",
"id":"130928000000",
"jianpin":"wqx",
"level":3,
"name":"吴桥县",
"pid":"130900000000",
"pinyin":"wuqiaoxian"},
{
"firstLetter":"x",
"id":"130929000000",
"jianpin":"xx",
"level":3,
"name":"献县",
"pid":"130900000000",
"pinyin":"xianxian"},
{
"firstLetter":"m",
"id":"130930000000",
"jianpin":"mchzzzx",
"level":3,
"name":"孟村回族自治县",
"pid":"130900000000",
"pinyin":"mengcunhuizuzizhixian"},
{
"firstLetter":"h",
"id":"130971000000",
"jianpin":"hbczjjkfq",
"level":3,
"name":"河北沧州经济开发区",
"pid":"130900000000",
"pinyin":"hebeicangzhoujingjikaifaqu"},
{
"firstLetter":"c",
"id":"130972000000",
"jianpin":"czgxjscykfq",
"level":3,
"name":"沧州高新技术产业开发区",
"pid":"130900000000",
"pinyin":"cangzhougaoxinjishuchanyekaifaqu"},
{
"firstLetter":"c",
"id":"130973000000",
"jianpin":"czbhxq",
"level":3,
"name":"沧州渤海新区",
"pid":"130900000000",
"pinyin":"cangzhoubohaixinqu"},
{
"firstLetter":"b",
"id":"130981000000",
"jianpin":"bts",
"level":3,
"name":"泊头市",
"pid":"130900000000",
"pinyin":"botoushi"},
{
"firstLetter":"r",
"id":"130982000000",
"jianpin":"rqs",
"level":3,
"name":"任丘市",
"pid":"130900000000",
"pinyin":"renqiushi"},
{
"firstLetter":"h",
"id":"130983000000",
"jianpin":"hhs",
"level":3,
"name":"黄骅市",
"pid":"130900000000",
"pinyin":"huanghuashi"},
{
"firstLetter":"h",
"id":"130984000000",
"jianpin":"hjs",
"level":3,
"name":"河间市",
"pid":"130900000000",
"pinyin":"hejianshi"}],

[{
"firstLetter":"s",
"id":"131001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"131000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"a",
"id":"131002000000",
"jianpin":"acq",
"level":3,
"name":"安次区",
"pid":"131000000000",
"pinyin":"anciqu"},
{
"firstLetter":"g",
"id":"131003000000",
"jianpin":"gyq",
"level":3,
"name":"广阳区",
"pid":"131000000000",
"pinyin":"guangyangqu"},
{
"firstLetter":"g",
"id":"131022000000",
"jianpin":"gax",
"level":3,
"name":"固安县",
"pid":"131000000000",
"pinyin":"guanxian"},
{
"firstLetter":"y",
"id":"131023000000",
"jianpin":"yqx",
"level":3,
"name":"永清县",
"pid":"131000000000",
"pinyin":"yongqingxian"},
{
"firstLetter":"x",
"id":"131024000000",
"jianpin":"xhx",
"level":3,
"name":"香河县",
"pid":"131000000000",
"pinyin":"xianghexian"},
{
"firstLetter":"d",
"id":"131025000000",
"jianpin":"dcx",
"level":3,
"name":"大城县",
"pid":"131000000000",
"pinyin":"dachengxian"},
{
"firstLetter":"w",
"id":"131026000000",
"jianpin":"wax",
"level":3,
"name":"文安县",
"pid":"131000000000",
"pinyin":"wenanxian"},
{
"firstLetter":"d",
"id":"131028000000",
"jianpin":"dchzzzx",
"level":3,
"name":"大厂回族自治县",
"pid":"131000000000",
"pinyin":"dachanghuizuzizhixian"},
{
"firstLetter":"l",
"id":"131071000000",
"jianpin":"lfjjjskfq",
"level":3,
"name":"廊坊经济技术开发区",
"pid":"131000000000",
"pinyin":"langfangjingjijishukaifaqu"},
{
"firstLetter":"b",
"id":"131081000000",
"jianpin":"bzs",
"level":3,
"name":"霸州市",
"pid":"131000000000",
"pinyin":"bazhoushi"},
{
"firstLetter":"s",
"id":"131082000000",
"jianpin":"shs",
"level":3,
"name":"三河市",
"pid":"131000000000",
"pinyin":"sanheshi"}],

[{
"firstLetter":"s",
"id":"131101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"131100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"t",
"id":"131102000000",
"jianpin":"tcq",
"level":3,
"name":"桃城区",
"pid":"131100000000",
"pinyin":"taochengqu"},
{
"firstLetter":"j",
"id":"131103000000",
"jianpin":"jzq",
"level":3,
"name":"冀州区",
"pid":"131100000000",
"pinyin":"jizhouqu"},
{
"firstLetter":"z",
"id":"131121000000",
"jianpin":"zqx",
"level":3,
"name":"枣强县",
"pid":"131100000000",
"pinyin":"zaoqiangxian"},
{
"firstLetter":"w",
"id":"131122000000",
"jianpin":"wyx",
"level":3,
"name":"武邑县",
"pid":"131100000000",
"pinyin":"wuyixian"},
{
"firstLetter":"w",
"id":"131123000000",
"jianpin":"wqx",
"level":3,
"name":"武强县",
"pid":"131100000000",
"pinyin":"wuqiangxian"},
{
"firstLetter":"r",
"id":"131124000000",
"jianpin":"ryx",
"level":3,
"name":"饶阳县",
"pid":"131100000000",
"pinyin":"raoyangxian"},
{
"firstLetter":"a",
"id":"131125000000",
"jianpin":"apx",
"level":3,
"name":"安平县",
"pid":"131100000000",
"pinyin":"anpingxian"},
{
"firstLetter":"g",
"id":"131126000000",
"jianpin":"gcx",
"level":3,
"name":"故城县",
"pid":"131100000000",
"pinyin":"guchengxian"},
{
"firstLetter":"j",
"id":"131127000000",
"jianpin":"jx",
"level":3,
"name":"景县",
"pid":"131100000000",
"pinyin":"jingxian"},
{
"firstLetter":"f",
"id":"131128000000",
"jianpin":"fcx",
"level":3,
"name":"阜城县",
"pid":"131100000000",
"pinyin":"fuchengxian"},
{
"firstLetter":"h",
"id":"131171000000",
"jianpin":"hbhsjjkfq",
"level":3,
"name":"河北衡水经济开发区",
"pid":"131100000000",
"pinyin":"hebeihengshuijingjikaifaqu"},
{
"firstLetter":"h",
"id":"131172000000",
"jianpin":"hsbhxq",
"level":3,
"name":"衡水滨湖新区",
"pid":"131100000000",
"pinyin":"hengshuibinhuxinqu"},
{
"firstLetter":"s",
"id":"131182000000",
"jianpin":"szs",
"level":3,
"name":"深州市",
"pid":"131100000000",
"pinyin":"shenzhoushi"}]],



[
[{
"firstLetter":"s",
"id":"140101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"140100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"140105000000",
"jianpin":"xdq",
"level":3,
"name":"小店区",
"pid":"140100000000",
"pinyin":"xiaodianqu"},
{
"firstLetter":"y",
"id":"140106000000",
"jianpin":"yzq",
"level":3,
"name":"迎泽区",
"pid":"140100000000",
"pinyin":"yingzequ"},
{
"firstLetter":"x",
"id":"140107000000",
"jianpin":"xhlq",
"level":3,
"name":"杏花岭区",
"pid":"140100000000",
"pinyin":"xinghualingqu"},
{
"firstLetter":"j",
"id":"140108000000",
"jianpin":"jcpq",
"level":3,
"name":"尖草坪区",
"pid":"140100000000",
"pinyin":"jiancaopingqu"},
{
"firstLetter":"w",
"id":"140109000000",
"jianpin":"wblq",
"level":3,
"name":"万柏林区",
"pid":"140100000000",
"pinyin":"wanbolinqu"},
{
"firstLetter":"j",
"id":"140110000000",
"jianpin":"jyq",
"level":3,
"name":"晋源区",
"pid":"140100000000",
"pinyin":"jinyuanqu"},
{
"firstLetter":"q",
"id":"140121000000",
"jianpin":"qxx",
"level":3,
"name":"清徐县",
"pid":"140100000000",
"pinyin":"qingxuxian"},
{
"firstLetter":"y",
"id":"140122000000",
"jianpin":"yqx",
"level":3,
"name":"阳曲县",
"pid":"140100000000",
"pinyin":"yangquxian"},
{
"firstLetter":"l",
"id":"140123000000",
"jianpin":"lfx",
"level":3,
"name":"娄烦县",
"pid":"140100000000",
"pinyin":"loufanxian"},
{
"firstLetter":"s",
"id":"140171000000",
"jianpin":"sxzxzhggsfq",
"level":3,
"name":"山西转型综合改革示范区",
"pid":"140100000000",
"pinyin":"shanxizhuanxingzonghegaigeshifanqu"},
{
"firstLetter":"g",
"id":"140181000000",
"jianpin":"gjs",
"level":3,
"name":"古交市",
"pid":"140100000000",
"pinyin":"gujiaoshi"}],

[{
"firstLetter":"s",
"id":"140201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"140200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"140202000000",
"jianpin":"cq",
"level":3,
"name":"城区",
"pid":"140200000000",
"pinyin":"chengqu"},
{
"firstLetter":"k",
"id":"140203000000",
"jianpin":"kq",
"level":3,
"name":"矿区",
"pid":"140200000000",
"pinyin":"kuangqu"},
{
"firstLetter":"n",
"id":"140211000000",
"jianpin":"njq",
"level":3,
"name":"南郊区",
"pid":"140200000000",
"pinyin":"nanjiaoqu"},
{
"firstLetter":"x",
"id":"140212000000",
"jianpin":"xrq",
"level":3,
"name":"新荣区",
"pid":"140200000000",
"pinyin":"xinrongqu"},
{
"firstLetter":"y",
"id":"140221000000",
"jianpin":"ygx",
"level":3,
"name":"阳高县",
"pid":"140200000000",
"pinyin":"yanggaoxian"},
{
"firstLetter":"t",
"id":"140222000000",
"jianpin":"tzx",
"level":3,
"name":"天镇县",
"pid":"140200000000",
"pinyin":"tianzhenxian"},
{
"firstLetter":"g",
"id":"140223000000",
"jianpin":"glx",
"level":3,
"name":"广灵县",
"pid":"140200000000",
"pinyin":"guanglingxian"},
{
"firstLetter":"l",
"id":"140224000000",
"jianpin":"lqx",
"level":3,
"name":"灵丘县",
"pid":"140200000000",
"pinyin":"lingqiuxian"},
{
"firstLetter":"h",
"id":"140225000000",
"jianpin":"hyx",
"level":3,
"name":"浑源县",
"pid":"140200000000",
"pinyin":"hunyuanxian"},
{
"firstLetter":"z",
"id":"140226000000",
"jianpin":"zyx",
"level":3,
"name":"左云县",
"pid":"140200000000",
"pinyin":"zuoyunxian"},
{
"firstLetter":"d",
"id":"140227000000",
"jianpin":"dtx",
"level":3,
"name":"大同县",
"pid":"140200000000",
"pinyin":"datongxian"},
{
"firstLetter":"s",
"id":"140271000000",
"jianpin":"sxdtjjkfq",
"level":3,
"name":"山西大同经济开发区",
"pid":"140200000000",
"pinyin":"shanxidatongjingjikaifaqu"}],

[{
"firstLetter":"s",
"id":"140301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"140300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"140302000000",
"jianpin":"cq",
"level":3,
"name":"城区",
"pid":"140300000000",
"pinyin":"chengqu"},
{
"firstLetter":"k",
"id":"140303000000",
"jianpin":"kq",
"level":3,
"name":"矿区",
"pid":"140300000000",
"pinyin":"kuangqu"},
{
"firstLetter":"j",
"id":"140311000000",
"jianpin":"jq",
"level":3,
"name":"郊区",
"pid":"140300000000",
"pinyin":"jiaoqu"},
{
"firstLetter":"p",
"id":"140321000000",
"jianpin":"pdx",
"level":3,
"name":"平定县",
"pid":"140300000000",
"pinyin":"pingdingxian"},
{
"firstLetter":"y",
"id":"140322000000",
"jianpin":"yx",
"level":3,
"name":"盂县",
"pid":"140300000000",
"pinyin":"yuxian"},
{
"firstLetter":"s",
"id":"140371000000",
"jianpin":"sxyqjjkfq",
"level":3,
"name":"山西阳泉经济开发区",
"pid":"140300000000",
"pinyin":"shanxiyangquanjingjikaifaqu"}],

[{
"firstLetter":"s",
"id":"140401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"140400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"140402000000",
"jianpin":"cq",
"level":3,
"name":"城区",
"pid":"140400000000",
"pinyin":"chengqu"},
{
"firstLetter":"j",
"id":"140411000000",
"jianpin":"jq",
"level":3,
"name":"郊区",
"pid":"140400000000",
"pinyin":"jiaoqu"},
{
"firstLetter":"z",
"id":"140421000000",
"jianpin":"zzx",
"level":3,
"name":"长治县",
"pid":"140400000000",
"pinyin":"zhangzhixian"},
{
"firstLetter":"x",
"id":"140423000000",
"jianpin":"xyx",
"level":3,
"name":"襄垣县",
"pid":"140400000000",
"pinyin":"xiangyuanxian"},
{
"firstLetter":"t",
"id":"140424000000",
"jianpin":"tlx",
"level":3,
"name":"屯留县",
"pid":"140400000000",
"pinyin":"tunliuxian"},
{
"firstLetter":"p",
"id":"140425000000",
"jianpin":"psx",
"level":3,
"name":"平顺县",
"pid":"140400000000",
"pinyin":"pingshunxian"},
{
"firstLetter":"l",
"id":"140426000000",
"jianpin":"lcx",
"level":3,
"name":"黎城县",
"pid":"140400000000",
"pinyin":"lichengxian"},
{
"firstLetter":"h",
"id":"140427000000",
"jianpin":"hgx",
"level":3,
"name":"壶关县",
"pid":"140400000000",
"pinyin":"huguanxian"},
{
"firstLetter":"z",
"id":"140428000000",
"jianpin":"zzx",
"level":3,
"name":"长子县",
"pid":"140400000000",
"pinyin":"zhangzixian"},
{
"firstLetter":"w",
"id":"140429000000",
"jianpin":"wxx",
"level":3,
"name":"武乡县",
"pid":"140400000000",
"pinyin":"wuxiangxian"},
{
"firstLetter":"q",
"id":"140430000000",
"jianpin":"qx",
"level":3,
"name":"沁县",
"pid":"140400000000",
"pinyin":"qinxian"},
{
"firstLetter":"q",
"id":"140431000000",
"jianpin":"qyx",
"level":3,
"name":"沁源县",
"pid":"140400000000",
"pinyin":"qinyuanxian"},
{
"firstLetter":"s",
"id":"140471000000",
"jianpin":"sxzzgxjscyyq",
"level":3,
"name":"山西长治高新技术产业园区",
"pid":"140400000000",
"pinyin":"shanxizhangzhigaoxinjishuchanyeyuanqu"},
{
"firstLetter":"l",
"id":"140481000000",
"jianpin":"lcs",
"level":3,
"name":"潞城市",
"pid":"140400000000",
"pinyin":"luchengshi"}],

[{
"firstLetter":"s",
"id":"140501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"140500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"140502000000",
"jianpin":"cq",
"level":3,
"name":"城区",
"pid":"140500000000",
"pinyin":"chengqu"},
{
"firstLetter":"q",
"id":"140521000000",
"jianpin":"qsx",
"level":3,
"name":"沁水县",
"pid":"140500000000",
"pinyin":"qinshuixian"},
{
"firstLetter":"y",
"id":"140522000000",
"jianpin":"ycx",
"level":3,
"name":"阳城县",
"pid":"140500000000",
"pinyin":"yangchengxian"},
{
"firstLetter":"l",
"id":"140524000000",
"jianpin":"lcx",
"level":3,
"name":"陵川县",
"pid":"140500000000",
"pinyin":"lingchuanxian"},
{
"firstLetter":"z",
"id":"140525000000",
"jianpin":"zzx",
"level":3,
"name":"泽州县",
"pid":"140500000000",
"pinyin":"zezhouxian"},
{
"firstLetter":"g",
"id":"140581000000",
"jianpin":"gps",
"level":3,
"name":"高平市",
"pid":"140500000000",
"pinyin":"gaopingshi"}],

[{
"firstLetter":"s",
"id":"140601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"140600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"140602000000",
"jianpin":"scq",
"level":3,
"name":"朔城区",
"pid":"140600000000",
"pinyin":"shuochengqu"},
{
"firstLetter":"p",
"id":"140603000000",
"jianpin":"plq",
"level":3,
"name":"平鲁区",
"pid":"140600000000",
"pinyin":"pingluqu"},
{
"firstLetter":"s",
"id":"140621000000",
"jianpin":"syx",
"level":3,
"name":"山阴县",
"pid":"140600000000",
"pinyin":"shanyinxian"},
{
"firstLetter":"y",
"id":"140622000000",
"jianpin":"yx",
"level":3,
"name":"应县",
"pid":"140600000000",
"pinyin":"yingxian"},
{
"firstLetter":"y",
"id":"140623000000",
"jianpin":"yyx",
"level":3,
"name":"右玉县",
"pid":"140600000000",
"pinyin":"youyuxian"},
{
"firstLetter":"h",
"id":"140624000000",
"jianpin":"hrx",
"level":3,
"name":"怀仁县",
"pid":"140600000000",
"pinyin":"huairenxian"},
{
"firstLetter":"s",
"id":"140671000000",
"jianpin":"sxszjjkfq",
"level":3,
"name":"山西朔州经济开发区",
"pid":"140600000000",
"pinyin":"shanxishuozhoujingjikaifaqu"}],

[{
"firstLetter":"s",
"id":"140701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"140700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"140702000000",
"jianpin":"ycq",
"level":3,
"name":"榆次区",
"pid":"140700000000",
"pinyin":"yuciqu"},
{
"firstLetter":"y",
"id":"140721000000",
"jianpin":"ysx",
"level":3,
"name":"榆社县",
"pid":"140700000000",
"pinyin":"yushexian"},
{
"firstLetter":"z",
"id":"140722000000",
"jianpin":"zqx",
"level":3,
"name":"左权县",
"pid":"140700000000",
"pinyin":"zuoquanxian"},
{
"firstLetter":"h",
"id":"140723000000",
"jianpin":"hsx",
"level":3,
"name":"和顺县",
"pid":"140700000000",
"pinyin":"heshunxian"},
{
"firstLetter":"x",
"id":"140724000000",
"jianpin":"xyx",
"level":3,
"name":"昔阳县",
"pid":"140700000000",
"pinyin":"xiyangxian"},
{
"firstLetter":"s",
"id":"140725000000",
"jianpin":"syx",
"level":3,
"name":"寿阳县",
"pid":"140700000000",
"pinyin":"shouyangxian"},
{
"firstLetter":"t",
"id":"140726000000",
"jianpin":"tgx",
"level":3,
"name":"太谷县",
"pid":"140700000000",
"pinyin":"taiguxian"},
{
"firstLetter":"q",
"id":"140727000000",
"jianpin":"qx",
"level":3,
"name":"祁县",
"pid":"140700000000",
"pinyin":"qixian"},
{
"firstLetter":"p",
"id":"140728000000",
"jianpin":"pyx",
"level":3,
"name":"平遥县",
"pid":"140700000000",
"pinyin":"pingyaoxian"},
{
"firstLetter":"l",
"id":"140729000000",
"jianpin":"lsx",
"level":3,
"name":"灵石县",
"pid":"140700000000",
"pinyin":"lingshixian"},
{
"firstLetter":"j",
"id":"140781000000",
"jianpin":"jxs",
"level":3,
"name":"介休市",
"pid":"140700000000",
"pinyin":"jiexiushi"}],

[{
"firstLetter":"s",
"id":"140801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"140800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"140802000000",
"jianpin":"yhq",
"level":3,
"name":"盐湖区",
"pid":"140800000000",
"pinyin":"yanhuqu"},
{
"firstLetter":"l",
"id":"140821000000",
"jianpin":"lyx",
"level":3,
"name":"临猗县",
"pid":"140800000000",
"pinyin":"linyixian"},
{
"firstLetter":"w",
"id":"140822000000",
"jianpin":"wrx",
"level":3,
"name":"万荣县",
"pid":"140800000000",
"pinyin":"wanrongxian"},
{
"firstLetter":"w",
"id":"140823000000",
"jianpin":"wxx",
"level":3,
"name":"闻喜县",
"pid":"140800000000",
"pinyin":"wenxixian"},
{
"firstLetter":"j",
"id":"140824000000",
"jianpin":"jsx",
"level":3,
"name":"稷山县",
"pid":"140800000000",
"pinyin":"jishanxian"},
{
"firstLetter":"x",
"id":"140825000000",
"jianpin":"xjx",
"level":3,
"name":"新绛县",
"pid":"140800000000",
"pinyin":"xinjiangxian"},
{
"firstLetter":"j",
"id":"140826000000",
"jianpin":"jx",
"level":3,
"name":"绛县",
"pid":"140800000000",
"pinyin":"jiangxian"},
{
"firstLetter":"y",
"id":"140827000000",
"jianpin":"yqx",
"level":3,
"name":"垣曲县",
"pid":"140800000000",
"pinyin":"yuanquxian"},
{
"firstLetter":"x",
"id":"140828000000",
"jianpin":"xx",
"level":3,
"name":"夏县",
"pid":"140800000000",
"pinyin":"xiaxian"},
{
"firstLetter":"p",
"id":"140829000000",
"jianpin":"plx",
"level":3,
"name":"平陆县",
"pid":"140800000000",
"pinyin":"pingluxian"},
{
"firstLetter":"r",
"id":"140830000000",
"jianpin":"rcx",
"level":3,
"name":"芮城县",
"pid":"140800000000",
"pinyin":"ruichengxian"},
{
"firstLetter":"y",
"id":"140881000000",
"jianpin":"yjs",
"level":3,
"name":"永济市",
"pid":"140800000000",
"pinyin":"yongjishi"},
{
"firstLetter":"h",
"id":"140882000000",
"jianpin":"hjs",
"level":3,
"name":"河津市",
"pid":"140800000000",
"pinyin":"hejinshi"}],

[{
"firstLetter":"s",
"id":"140901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"140900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"140902000000",
"jianpin":"xfq",
"level":3,
"name":"忻府区",
"pid":"140900000000",
"pinyin":"xinfuqu"},
{
"firstLetter":"d",
"id":"140921000000",
"jianpin":"dxx",
"level":3,
"name":"定襄县",
"pid":"140900000000",
"pinyin":"dingxiangxian"},
{
"firstLetter":"w",
"id":"140922000000",
"jianpin":"wtx",
"level":3,
"name":"五台县",
"pid":"140900000000",
"pinyin":"wutaixian"},
{
"firstLetter":"d",
"id":"140923000000",
"jianpin":"dx",
"level":3,
"name":"代县",
"pid":"140900000000",
"pinyin":"daixian"},
{
"firstLetter":"f",
"id":"140924000000",
"jianpin":"fzx",
"level":3,
"name":"繁峙县",
"pid":"140900000000",
"pinyin":"fanzhixian"},
{
"firstLetter":"n",
"id":"140925000000",
"jianpin":"nwx",
"level":3,
"name":"宁武县",
"pid":"140900000000",
"pinyin":"ningwuxian"},
{
"firstLetter":"j",
"id":"140926000000",
"jianpin":"jlx",
"level":3,
"name":"静乐县",
"pid":"140900000000",
"pinyin":"jinglexian"},
{
"firstLetter":"s",
"id":"140927000000",
"jianpin":"scx",
"level":3,
"name":"神池县",
"pid":"140900000000",
"pinyin":"shenchixian"},
{
"firstLetter":"w",
"id":"140928000000",
"jianpin":"wzx",
"level":3,
"name":"五寨县",
"pid":"140900000000",
"pinyin":"wuzhaixian"},
{
"firstLetter":"k",
"id":"140929000000",
"jianpin":"klx",
"level":3,
"name":"岢岚县",
"pid":"140900000000",
"pinyin":"kelanxian"},
{
"firstLetter":"h",
"id":"140930000000",
"jianpin":"hqx",
"level":3,
"name":"河曲县",
"pid":"140900000000",
"pinyin":"hequxian"},
{
"firstLetter":"b",
"id":"140931000000",
"jianpin":"bdx",
"level":3,
"name":"保德县",
"pid":"140900000000",
"pinyin":"baodexian"},
{
"firstLetter":"p",
"id":"140932000000",
"jianpin":"pgx",
"level":3,
"name":"偏关县",
"pid":"140900000000",
"pinyin":"pianguanxian"},
{
"firstLetter":"w",
"id":"140971000000",
"jianpin":"wtsfjmsq",
"level":3,
"name":"五台山风景名胜区",
"pid":"140900000000",
"pinyin":"wutaishanfengjingmingshengqu"},
{
"firstLetter":"y",
"id":"140981000000",
"jianpin":"yps",
"level":3,
"name":"原平市",
"pid":"140900000000",
"pinyin":"yuanpingshi"}],

[{
"firstLetter":"s",
"id":"141001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"141000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"141002000000",
"jianpin":"ydq",
"level":3,
"name":"尧都区",
"pid":"141000000000",
"pinyin":"yaodouqu"},
{
"firstLetter":"q",
"id":"141021000000",
"jianpin":"qwx",
"level":3,
"name":"曲沃县",
"pid":"141000000000",
"pinyin":"quwoxian"},
{
"firstLetter":"y",
"id":"141022000000",
"jianpin":"ycx",
"level":3,
"name":"翼城县",
"pid":"141000000000",
"pinyin":"yichengxian"},
{
"firstLetter":"x",
"id":"141023000000",
"jianpin":"xfx",
"level":3,
"name":"襄汾县",
"pid":"141000000000",
"pinyin":"xiangfenxian"},
{
"firstLetter":"h",
"id":"141024000000",
"jianpin":"hdx",
"level":3,
"name":"洪洞县",
"pid":"141000000000",
"pinyin":"hongdongxian"},
{
"firstLetter":"g",
"id":"141025000000",
"jianpin":"gx",
"level":3,
"name":"古县",
"pid":"141000000000",
"pinyin":"guxian"},
{
"firstLetter":"a",
"id":"141026000000",
"jianpin":"azx",
"level":3,
"name":"安泽县",
"pid":"141000000000",
"pinyin":"anzexian"},
{
"firstLetter":"f",
"id":"141027000000",
"jianpin":"fsx",
"level":3,
"name":"浮山县",
"pid":"141000000000",
"pinyin":"fushanxian"},
{
"firstLetter":"j",
"id":"141028000000",
"jianpin":"jx",
"level":3,
"name":"吉县",
"pid":"141000000000",
"pinyin":"jixian"},
{
"firstLetter":"x",
"id":"141029000000",
"jianpin":"xnx",
"level":3,
"name":"乡宁县",
"pid":"141000000000",
"pinyin":"xiangningxian"},
{
"firstLetter":"d",
"id":"141030000000",
"jianpin":"dnx",
"level":3,
"name":"大宁县",
"pid":"141000000000",
"pinyin":"daningxian"},
{
"firstLetter":"x",
"id":"141031000000",
"jianpin":"xx",
"level":3,
"name":"隰县",
"pid":"141000000000",
"pinyin":"xixian"},
{
"firstLetter":"y",
"id":"141032000000",
"jianpin":"yhx",
"level":3,
"name":"永和县",
"pid":"141000000000",
"pinyin":"yonghexian"},
{
"firstLetter":"p",
"id":"141033000000",
"jianpin":"px",
"level":3,
"name":"蒲县",
"pid":"141000000000",
"pinyin":"puxian"},
{
"firstLetter":"f",
"id":"141034000000",
"jianpin":"fxx",
"level":3,
"name":"汾西县",
"pid":"141000000000",
"pinyin":"fenxixian"},
{
"firstLetter":"h",
"id":"141081000000",
"jianpin":"hms",
"level":3,
"name":"侯马市",
"pid":"141000000000",
"pinyin":"houmashi"},
{
"firstLetter":"h",
"id":"141082000000",
"jianpin":"hzs",
"level":3,
"name":"霍州市",
"pid":"141000000000",
"pinyin":"huozhoushi"}],

[{
"firstLetter":"s",
"id":"141101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"141100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"141102000000",
"jianpin":"lsq",
"level":3,
"name":"离石区",
"pid":"141100000000",
"pinyin":"lishiqu"},
{
"firstLetter":"w",
"id":"141121000000",
"jianpin":"wsx",
"level":3,
"name":"文水县",
"pid":"141100000000",
"pinyin":"wenshuixian"},
{
"firstLetter":"j",
"id":"141122000000",
"jianpin":"jcx",
"level":3,
"name":"交城县",
"pid":"141100000000",
"pinyin":"jiaochengxian"},
{
"firstLetter":"x",
"id":"141123000000",
"jianpin":"xx",
"level":3,
"name":"兴县",
"pid":"141100000000",
"pinyin":"xingxian"},
{
"firstLetter":"l",
"id":"141124000000",
"jianpin":"lx",
"level":3,
"name":"临县",
"pid":"141100000000",
"pinyin":"linxian"},
{
"firstLetter":"l",
"id":"141125000000",
"jianpin":"llx",
"level":3,
"name":"柳林县",
"pid":"141100000000",
"pinyin":"liulinxian"},
{
"firstLetter":"s",
"id":"141126000000",
"jianpin":"slx",
"level":3,
"name":"石楼县",
"pid":"141100000000",
"pinyin":"shilouxian"},
{
"firstLetter":"l",
"id":"141127000000",
"jianpin":"lx",
"level":3,
"name":"岚县",
"pid":"141100000000",
"pinyin":"lanxian"},
{
"firstLetter":"f",
"id":"141128000000",
"jianpin":"fsx",
"level":3,
"name":"方山县",
"pid":"141100000000",
"pinyin":"fangshanxian"},
{
"firstLetter":"z",
"id":"141129000000",
"jianpin":"zyx",
"level":3,
"name":"中阳县",
"pid":"141100000000",
"pinyin":"zhongyangxian"},
{
"firstLetter":"j",
"id":"141130000000",
"jianpin":"jkx",
"level":3,
"name":"交口县",
"pid":"141100000000",
"pinyin":"jiaokouxian"},
{
"firstLetter":"x",
"id":"141181000000",
"jianpin":"xys",
"level":3,
"name":"孝义市",
"pid":"141100000000",
"pinyin":"xiaoyishi"},
{
"firstLetter":"f",
"id":"141182000000",
"jianpin":"fys",
"level":3,
"name":"汾阳市",
"pid":"141100000000",
"pinyin":"fenyangshi"}]],



[
[{
"firstLetter":"s",
"id":"150101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"150100000000",
"pinyin":"shixiaqu"},

{
"firstLetter":"x",
"id":"150102000000",
"jianpin":"xcq",
"level":3,
"name":"新城区",
"pid":"150100000000",
"pinyin":"xinchengqu"},

{
"firstLetter":"h",
"id":"150103000000",
"jianpin":"hmq",
"level":3,
"name":"回民区",
"pid":"150100000000",
"pinyin":"huiminqu"},

{
"firstLetter":"y",
"id":"150104000000",
"jianpin":"yqq",
"level":3,
"name":"玉泉区",
"pid":"150100000000",
"pinyin":"yuquanqu"},

{
"firstLetter":"s",
"id":"150105000000",
"jianpin":"shq",
"level":3,
"name":"赛罕区",
"pid":"150100000000",
"pinyin":"saihanqu"},

{
"firstLetter":"t",
"id":"150121000000",
"jianpin":"tmtzq",
"level":3,
"name":"土默特左旗",
"pid":"150100000000",
"pinyin":"tumotezuoqi"},

{
"firstLetter":"t",
"id":"150122000000",
"jianpin":"tktx",
"level":3,
"name":"托克托县",
"pid":"150100000000",
"pinyin":"tuoketuoxian"},

{
"firstLetter":"h",
"id":"150123000000",
"jianpin":"hlgex",
"level":3,
"name":"和林格尔县",
"pid":"150100000000",
"pinyin":"helingeerxian"},

{
"firstLetter":"q",
"id":"150124000000",
"jianpin":"qshx",
"level":3,
"name":"清水河县",
"pid":"150100000000",
"pinyin":"qingshuihexian"},

{
"firstLetter":"w",
"id":"150125000000",
"jianpin":"wcx",
"level":3,
"name":"武川县",
"pid":"150100000000",
"pinyin":"wuchuanxian"},

{
"firstLetter":"h",
"id":"150171000000",
"jianpin":"hhhtjhgyyq",
"level":3,
"name":"呼和浩特金海工业园区",
"pid":"150100000000",
"pinyin":"huhehaotejinhaigongyeyuanqu"},

{
"firstLetter":"h",
"id":"150172000000",
"jianpin":"hhhtjjjskfq",
"level":3,
"name":"呼和浩特经济技术开发区",
"pid":"150100000000",
"pinyin":"huhehaotejingjijishukaifaqu"}],


[{
"firstLetter":"s",
"id":"150201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"150200000000",
"pinyin":"shixiaqu"},

{
"firstLetter":"d",
"id":"150202000000",
"jianpin":"dhq",
"level":3,
"name":"东河区",
"pid":"150200000000",
"pinyin":"donghequ"},

{
"firstLetter":"k",
"id":"150203000000",
"jianpin":"kdlq",
"level":3,
"name":"昆都仑区",
"pid":"150200000000",
"pinyin":"kundoulunqu"},

{
"firstLetter":"q",
"id":"150204000000",
"jianpin":"qsq",
"level":3,
"name":"青山区",
"pid":"150200000000",
"pinyin":"qingshanqu"},

{
"firstLetter":"s",
"id":"150205000000",
"jianpin":"sgq",
"level":3,
"name":"石拐区",
"pid":"150200000000",
"pinyin":"shiguaiqu"},

{
"firstLetter":"b",
"id":"150206000000",
"jianpin":"byebkq",
"level":3,
"name":"白云鄂博矿区",
"pid":"150200000000",
"pinyin":"baiyunebokuangqu"},

{
"firstLetter":"j",
"id":"150207000000",
"jianpin":"jyq",
"level":3,
"name":"九原区",
"pid":"150200000000",
"pinyin":"jiuyuanqu"},

{
"firstLetter":"t",
"id":"150221000000",
"jianpin":"tmtyq",
"level":3,
"name":"土默特右旗",
"pid":"150200000000",
"pinyin":"tumoteyouqi"},

{
"firstLetter":"g",
"id":"150222000000",
"jianpin":"gyx",
"level":3,
"name":"固阳县",
"pid":"150200000000",
"pinyin":"guyangxian"},

{
"firstLetter":"d",
"id":"150223000000",
"jianpin":"dehmmalhq",
"level":3,
"name":"达尔罕茂明安联合旗",
"pid":"150200000000",
"pinyin":"daerhanmaominganlianheqi"},

{
"firstLetter":"b",
"id":"150271000000",
"jianpin":"btxtgxjscykfq",
"level":3,
"name":"包头稀土高新技术产业开发区",
"pid":"150200000000",
"pinyin":"baotouxitugaoxinjishuchanyekaifaqu"}],


[{
"firstLetter":"s",
"id":"150301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"150300000000",
"pinyin":"shixiaqu"},

{
"firstLetter":"h",
"id":"150302000000",
"jianpin":"hbwq",
"level":3,
"name":"海勃湾区",
"pid":"150300000000",
"pinyin":"haibowanqu"},

{
"firstLetter":"h",
"id":"150303000000",
"jianpin":"hnq",
"level":3,
"name":"海南区",
"pid":"150300000000",
"pinyin":"hainanqu"},

{
"firstLetter":"w",
"id":"150304000000",
"jianpin":"wdq",
"level":3,
"name":"乌达区",
"pid":"150300000000",
"pinyin":"wudaqu"}],


[{
"firstLetter":"s",
"id":"150401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"150400000000",
"pinyin":"shixiaqu"},

{
"firstLetter":"h",
"id":"150402000000",
"jianpin":"hsq",
"level":3,
"name":"红山区",
"pid":"150400000000",
"pinyin":"hongshanqu"},

{
"firstLetter":"y",
"id":"150403000000",
"jianpin":"ybsq",
"level":3,
"name":"元宝山区",
"pid":"150400000000",
"pinyin":"yuanbaoshanqu"},

{
"firstLetter":"s",
"id":"150404000000",
"jianpin":"ssq",
"level":3,
"name":"松山区",
"pid":"150400000000",
"pinyin":"songshanqu"},

{
"firstLetter":"a",
"id":"150421000000",
"jianpin":"alkeqq",
"level":3,
"name":"阿鲁科尔沁旗",
"pid":"150400000000",
"pinyin":"alukeerqinqi"},

{
"firstLetter":"b",
"id":"150422000000",
"jianpin":"blzq",
"level":3,
"name":"巴林左旗",
"pid":"150400000000",
"pinyin":"balinzuoqi"},

{
"firstLetter":"b",
"id":"150423000000",
"jianpin":"blyq",
"level":3,
"name":"巴林右旗",
"pid":"150400000000",
"pinyin":"balinyouqi"},

{
"firstLetter":"l",
"id":"150424000000",
"jianpin":"lxx",
"level":3,
"name":"林西县",
"pid":"150400000000",
"pinyin":"linxixian"},

{
"firstLetter":"k",
"id":"150425000000",
"jianpin":"ksktq",
"level":3,
"name":"克什克腾旗",
"pid":"150400000000",
"pinyin":"keshenketengqi"},

{
"firstLetter":"w",
"id":"150426000000",
"jianpin":"wntq",
"level":3,
"name":"翁牛特旗",
"pid":"150400000000",
"pinyin":"wengniuteqi"},

{
"firstLetter":"k",
"id":"150428000000",
"jianpin":"klqq",
"level":3,
"name":"喀喇沁旗",
"pid":"150400000000",
"pinyin":"kalaqinqi"},

{
"firstLetter":"n",
"id":"150429000000",
"jianpin":"ncx",
"level":3,
"name":"宁城县",
"pid":"150400000000",
"pinyin":"ningchengxian"},

{
"firstLetter":"a",
"id":"150430000000",
"jianpin":"ahq",
"level":3,
"name":"敖汉旗",
"pid":"150400000000",
"pinyin":"aohanqi"}],


[{
"firstLetter":"s",
"id":"150501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"150500000000",
"pinyin":"shixiaqu"},

{
"firstLetter":"k",
"id":"150502000000",
"jianpin":"keqq",
"level":3,
"name":"科尔沁区",
"pid":"150500000000",
"pinyin":"keerqinqu"},

{
"firstLetter":"k",
"id":"150521000000",
"jianpin":"keqzyzq",
"level":3,
"name":"科尔沁左翼中旗",
"pid":"150500000000",
"pinyin":"keerqinzuoyizhongqi"},

{
"firstLetter":"k",
"id":"150522000000",
"jianpin":"keqzyhq",
"level":3,
"name":"科尔沁左翼后旗",
"pid":"150500000000",
"pinyin":"keerqinzuoyihouqi"},

{
"firstLetter":"k",
"id":"150523000000",
"jianpin":"klx",
"level":3,
"name":"开鲁县",
"pid":"150500000000",
"pinyin":"kailuxian"},

{
"firstLetter":"k",
"id":"150524000000",
"jianpin":"klq",
"level":3,
"name":"库伦旗",
"pid":"150500000000",
"pinyin":"kulunqi"},

{
"firstLetter":"n",
"id":"150525000000",
"jianpin":"nmq",
"level":3,
"name":"奈曼旗",
"pid":"150500000000",
"pinyin":"naimanqi"},

{
"firstLetter":"z",
"id":"150526000000",
"jianpin":"zltq",
"level":3,
"name":"扎鲁特旗",
"pid":"150500000000",
"pinyin":"zhaluteqi"},

{
"firstLetter":"t",
"id":"150571000000",
"jianpin":"tljjjskfq",
"level":3,
"name":"通辽经济技术开发区",
"pid":"150500000000",
"pinyin":"tongliaojingjijishukaifaqu"},

{
"firstLetter":"h",
"id":"150581000000",
"jianpin":"hlgls",
"level":3,
"name":"霍林郭勒市",
"pid":"150500000000",
"pinyin":"huolinguoleshi"}],


[{
"firstLetter":"s",
"id":"150601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"150600000000",
"pinyin":"shixiaqu"},

{
"firstLetter":"d",
"id":"150602000000",
"jianpin":"dsq",
"level":3,
"name":"东胜区",
"pid":"150600000000",
"pinyin":"dongshengqu"},

{
"firstLetter":"k",
"id":"150603000000",
"jianpin":"kbsq",
"level":3,
"name":"康巴什区",
"pid":"150600000000",
"pinyin":"kangbashenqu"},

{
"firstLetter":"d",
"id":"150621000000",
"jianpin":"dltq",
"level":3,
"name":"达拉特旗",
"pid":"150600000000",
"pinyin":"dalateqi"},

{
"firstLetter":"z",
"id":"150622000000",
"jianpin":"zgeq",
"level":3,
"name":"准格尔旗",
"pid":"150600000000",
"pinyin":"zhungeerqi"},

{
"firstLetter":"e",
"id":"150623000000",
"jianpin":"etkqq",
"level":3,
"name":"鄂托克前旗",
"pid":"150600000000",
"pinyin":"etuokeqianqi"},

{
"firstLetter":"e",
"id":"150624000000",
"jianpin":"etkq",
"level":3,
"name":"鄂托克旗",
"pid":"150600000000",
"pinyin":"etuokeqi"},

{
"firstLetter":"h",
"id":"150625000000",
"jianpin":"hjq",
"level":3,
"name":"杭锦旗",
"pid":"150600000000",
"pinyin":"hangjinqi"},

{
"firstLetter":"w",
"id":"150626000000",
"jianpin":"wsq",
"level":3,
"name":"乌审旗",
"pid":"150600000000",
"pinyin":"wushenqi"},

{
"firstLetter":"y",
"id":"150627000000",
"jianpin":"yjhlq",
"level":3,
"name":"伊金霍洛旗",
"pid":"150600000000",
"pinyin":"yijinhuoluoqi"}],



[{
"firstLetter":"s",
"id":"150701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"150700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"150702000000",
"jianpin":"hleq",
"level":3,
"name":"海拉尔区",
"pid":"150700000000",
"pinyin":"hailaerqu"},
{
"firstLetter":"z",
"id":"150703000000",
"jianpin":"zlneq",
"level":3,
"name":"扎赉诺尔区",
"pid":"150700000000",
"pinyin":"zhalainuoerqu"},
{
"firstLetter":"a",
"id":"150721000000",
"jianpin":"arq",
"level":3,
"name":"阿荣旗",
"pid":"150700000000",
"pinyin":"arongqi"},
{
"firstLetter":"m",
"id":"150722000000",
"jianpin":"mldwdwezzzq",
"level":3,
"name":"莫力达瓦达斡尔族自治旗",
"pid":"150700000000",
"pinyin":"molidawadawoerzuzizhiqi"},
{
"firstLetter":"e",
"id":"150723000000",
"jianpin":"elczzq",
"level":3,
"name":"鄂伦春自治旗",
"pid":"150700000000",
"pinyin":"elunchunzizhiqi"},
{
"firstLetter":"e",
"id":"150724000000",
"jianpin":"ewkzzzq",
"level":3,
"name":"鄂温克族自治旗",
"pid":"150700000000",
"pinyin":"ewenkezuzizhiqi"},
{
"firstLetter":"c",
"id":"150725000000",
"jianpin":"cbehq",
"level":3,
"name":"陈巴尔虎旗",
"pid":"150700000000",
"pinyin":"chenbaerhuqi"},
{
"firstLetter":"x",
"id":"150726000000",
"jianpin":"xbehzq",
"level":3,
"name":"新巴尔虎左旗",
"pid":"150700000000",
"pinyin":"xinbaerhuzuoqi"},
{
"firstLetter":"x",
"id":"150727000000",
"jianpin":"xbehyq",
"level":3,
"name":"新巴尔虎右旗",
"pid":"150700000000",
"pinyin":"xinbaerhuyouqi"},
{
"firstLetter":"m",
"id":"150781000000",
"jianpin":"mzls",
"level":3,
"name":"满洲里市",
"pid":"150700000000",
"pinyin":"manzhoulishi"},
{
"firstLetter":"y",
"id":"150782000000",
"jianpin":"ykss",
"level":3,
"name":"牙克石市",
"pid":"150700000000",
"pinyin":"yakeshishi"},
{
"firstLetter":"z",
"id":"150783000000",
"jianpin":"zlts",
"level":3,
"name":"扎兰屯市",
"pid":"150700000000",
"pinyin":"zhalantunshi"},
{
"firstLetter":"e",
"id":"150784000000",
"jianpin":"eegns",
"level":3,
"name":"额尔古纳市",
"pid":"150700000000",
"pinyin":"eergunashi"},
{
"firstLetter":"g",
"id":"150785000000",
"jianpin":"ghs",
"level":3,
"name":"根河市",
"pid":"150700000000",
"pinyin":"genheshi"}],

[{
"firstLetter":"s",
"id":"150801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"150800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"150802000000",
"jianpin":"lhq",
"level":3,
"name":"临河区",
"pid":"150800000000",
"pinyin":"linhequ"},
{
"firstLetter":"w",
"id":"150821000000",
"jianpin":"wyx",
"level":3,
"name":"五原县",
"pid":"150800000000",
"pinyin":"wuyuanxian"},
{
"firstLetter":"d",
"id":"150822000000",
"jianpin":"dkx",
"level":3,
"name":"磴口县",
"pid":"150800000000",
"pinyin":"dengkouxian"},
{
"firstLetter":"w",
"id":"150823000000",
"jianpin":"wltqq",
"level":3,
"name":"乌拉特前旗",
"pid":"150800000000",
"pinyin":"wulateqianqi"},
{
"firstLetter":"w",
"id":"150824000000",
"jianpin":"wltzq",
"level":3,
"name":"乌拉特中旗",
"pid":"150800000000",
"pinyin":"wulatezhongqi"},
{
"firstLetter":"w",
"id":"150825000000",
"jianpin":"wlthq",
"level":3,
"name":"乌拉特后旗",
"pid":"150800000000",
"pinyin":"wulatehouqi"},
{
"firstLetter":"h",
"id":"150826000000",
"jianpin":"hjhq",
"level":3,
"name":"杭锦后旗",
"pid":"150800000000",
"pinyin":"hangjinhouqi"}],

[{
"firstLetter":"s",
"id":"150901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"150900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"150902000000",
"jianpin":"jnq",
"level":3,
"name":"集宁区",
"pid":"150900000000",
"pinyin":"jiningqu"},
{
"firstLetter":"z",
"id":"150921000000",
"jianpin":"zzx",
"level":3,
"name":"卓资县",
"pid":"150900000000",
"pinyin":"zhuozixian"},
{
"firstLetter":"h",
"id":"150922000000",
"jianpin":"hdx",
"level":3,
"name":"化德县",
"pid":"150900000000",
"pinyin":"huadexian"},
{
"firstLetter":"s",
"id":"150923000000",
"jianpin":"sdx",
"level":3,
"name":"商都县",
"pid":"150900000000",
"pinyin":"shangdouxian"},
{
"firstLetter":"x",
"id":"150924000000",
"jianpin":"xhx",
"level":3,
"name":"兴和县",
"pid":"150900000000",
"pinyin":"xinghexian"},
{
"firstLetter":"l",
"id":"150925000000",
"jianpin":"lcx",
"level":3,
"name":"凉城县",
"pid":"150900000000",
"pinyin":"liangchengxian"},
{
"firstLetter":"c",
"id":"150926000000",
"jianpin":"cheyyqq",
"level":3,
"name":"察哈尔右翼前旗",
"pid":"150900000000",
"pinyin":"chahaeryouyiqianqi"},
{
"firstLetter":"c",
"id":"150927000000",
"jianpin":"cheyyzq",
"level":3,
"name":"察哈尔右翼中旗",
"pid":"150900000000",
"pinyin":"chahaeryouyizhongqi"},
{
"firstLetter":"c",
"id":"150928000000",
"jianpin":"cheyyhq",
"level":3,
"name":"察哈尔右翼后旗",
"pid":"150900000000",
"pinyin":"chahaeryouyihouqi"},
{
"firstLetter":"s",
"id":"150929000000",
"jianpin":"szwq",
"level":3,
"name":"四子王旗",
"pid":"150900000000",
"pinyin":"siziwangqi"},
{
"firstLetter":"f",
"id":"150981000000",
"jianpin":"fzs",
"level":3,
"name":"丰镇市",
"pid":"150900000000",
"pinyin":"fengzhenshi"}],

[{
"firstLetter":"w",
"id":"152201000000",
"jianpin":"wlhts",
"level":3,
"name":"乌兰浩特市",
"pid":"152200000000",
"pinyin":"wulanhaoteshi"},
{
"firstLetter":"a",
"id":"152202000000",
"jianpin":"aess",
"level":3,
"name":"阿尔山市",
"pid":"152200000000",
"pinyin":"aershanshi"},
{
"firstLetter":"k",
"id":"152221000000",
"jianpin":"keqyyqq",
"level":3,
"name":"科尔沁右翼前旗",
"pid":"152200000000",
"pinyin":"keerqinyouyiqianqi"},
{
"firstLetter":"k",
"id":"152222000000",
"jianpin":"keqyyzq",
"level":3,
"name":"科尔沁右翼中旗",
"pid":"152200000000",
"pinyin":"keerqinyouyizhongqi"},
{
"firstLetter":"z",
"id":"152223000000",
"jianpin":"zltq",
"level":3,
"name":"扎赉特旗",
"pid":"152200000000",
"pinyin":"zhalaiteqi"},
{
"firstLetter":"t",
"id":"152224000000",
"jianpin":"tqx",
"level":3,
"name":"突泉县",
"pid":"152200000000",
"pinyin":"tuquanxian"}],

[{
"firstLetter":"e",
"id":"152501000000",
"jianpin":"elhts",
"level":3,
"name":"二连浩特市",
"pid":"152500000000",
"pinyin":"erlianhaoteshi"},
{
"firstLetter":"x",
"id":"152502000000",
"jianpin":"xlhts",
"level":3,
"name":"锡林浩特市",
"pid":"152500000000",
"pinyin":"xilinhaoteshi"},
{
"firstLetter":"a",
"id":"152522000000",
"jianpin":"abgq",
"level":3,
"name":"阿巴嘎旗",
"pid":"152500000000",
"pinyin":"abagaqi"},
{
"firstLetter":"s",
"id":"152523000000",
"jianpin":"sntzq",
"level":3,
"name":"苏尼特左旗",
"pid":"152500000000",
"pinyin":"sunitezuoqi"},
{
"firstLetter":"s",
"id":"152524000000",
"jianpin":"sntyq",
"level":3,
"name":"苏尼特右旗",
"pid":"152500000000",
"pinyin":"suniteyouqi"},
{
"firstLetter":"d",
"id":"152525000000",
"jianpin":"dwzmqq",
"level":3,
"name":"东乌珠穆沁旗",
"pid":"152500000000",
"pinyin":"dongwuzhumuqinqi"},
{
"firstLetter":"x",
"id":"152526000000",
"jianpin":"xwzmqq",
"level":3,
"name":"西乌珠穆沁旗",
"pid":"152500000000",
"pinyin":"xiwuzhumuqinqi"},
{
"firstLetter":"t",
"id":"152527000000",
"jianpin":"tpsq",
"level":3,
"name":"太仆寺旗",
"pid":"152500000000",
"pinyin":"taipusiqi"},
{
"firstLetter":"x",
"id":"152528000000",
"jianpin":"xhq",
"level":3,
"name":"镶黄旗",
"pid":"152500000000",
"pinyin":"xianghuangqi"},
{
"firstLetter":"z",
"id":"152529000000",
"jianpin":"zxbq",
"level":3,
"name":"正镶白旗",
"pid":"152500000000",
"pinyin":"zhengxiangbaiqi"},
{
"firstLetter":"z",
"id":"152530000000",
"jianpin":"zlq",
"level":3,
"name":"正蓝旗",
"pid":"152500000000",
"pinyin":"zhenglanqi"},
{
"firstLetter":"d",
"id":"152531000000",
"jianpin":"dlx",
"level":3,
"name":"多伦县",
"pid":"152500000000",
"pinyin":"duolunxian"},
{
"firstLetter":"w",
"id":"152571000000",
"jianpin":"wlggwh",
"level":3,
"name":"乌拉盖管委会",
"pid":"152500000000",
"pinyin":"wulagaiguanweihui"}],

[{
"firstLetter":"a",
"id":"152921000000",
"jianpin":"alszq",
"level":3,
"name":"阿拉善左旗",
"pid":"152900000000",
"pinyin":"alashanzuoqi"},
{
"firstLetter":"a",
"id":"152922000000",
"jianpin":"alsyq",
"level":3,
"name":"阿拉善右旗",
"pid":"152900000000",
"pinyin":"alashanyouqi"},
{
"firstLetter":"e",
"id":"152923000000",
"jianpin":"ejnq",
"level":3,
"name":"额济纳旗",
"pid":"152900000000",
"pinyin":"ejinaqi"},
{
"firstLetter":"n",
"id":"152971000000",
"jianpin":"nmgalsjjkfq",
"level":3,
"name":"内蒙古阿拉善经济开发区",
"pid":"152900000000",
"pinyin":"neimenggualashanjingjikaifaqu"}]],



[
[{
"firstLetter":"s",
"id":"210101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"210100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"210102000000",
"jianpin":"hpq",
"level":3,
"name":"和平区",
"pid":"210100000000",
"pinyin":"hepingqu"},
{
"firstLetter":"s",
"id":"210103000000",
"jianpin":"shq",
"level":3,
"name":"沈河区",
"pid":"210100000000",
"pinyin":"shenhequ"},
{
"firstLetter":"d",
"id":"210104000000",
"jianpin":"ddq",
"level":3,
"name":"大东区",
"pid":"210100000000",
"pinyin":"dadongqu"},
{
"firstLetter":"h",
"id":"210105000000",
"jianpin":"hgq",
"level":3,
"name":"皇姑区",
"pid":"210100000000",
"pinyin":"huangguqu"},
{
"firstLetter":"t",
"id":"210106000000",
"jianpin":"txq",
"level":3,
"name":"铁西区",
"pid":"210100000000",
"pinyin":"tiexiqu"},
{
"firstLetter":"s",
"id":"210111000000",
"jianpin":"sjtq",
"level":3,
"name":"苏家屯区",
"pid":"210100000000",
"pinyin":"sujiatunqu"},
{
"firstLetter":"h",
"id":"210112000000",
"jianpin":"hnq",
"level":3,
"name":"浑南区",
"pid":"210100000000",
"pinyin":"hunnanqu"},
{
"firstLetter":"s",
"id":"210113000000",
"jianpin":"sbxq",
"level":3,
"name":"沈北新区",
"pid":"210100000000",
"pinyin":"shenbeixinqu"},
{
"firstLetter":"y",
"id":"210114000000",
"jianpin":"yhq",
"level":3,
"name":"于洪区",
"pid":"210100000000",
"pinyin":"yuhongqu"},
{
"firstLetter":"l",
"id":"210115000000",
"jianpin":"lzq",
"level":3,
"name":"辽中区",
"pid":"210100000000",
"pinyin":"liaozhongqu"},
{
"firstLetter":"k",
"id":"210123000000",
"jianpin":"kpx",
"level":3,
"name":"康平县",
"pid":"210100000000",
"pinyin":"kangpingxian"},
{
"firstLetter":"f",
"id":"210124000000",
"jianpin":"fkx",
"level":3,
"name":"法库县",
"pid":"210100000000",
"pinyin":"fakuxian"},
{
"firstLetter":"x",
"id":"210181000000",
"jianpin":"xms",
"level":3,
"name":"新民市",
"pid":"210100000000",
"pinyin":"xinminshi"}],

[{
"firstLetter":"s",
"id":"210201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"210200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"z",
"id":"210202000000",
"jianpin":"zsq",
"level":3,
"name":"中山区",
"pid":"210200000000",
"pinyin":"zhongshanqu"},
{
"firstLetter":"x",
"id":"210203000000",
"jianpin":"xgq",
"level":3,
"name":"西岗区",
"pid":"210200000000",
"pinyin":"xigangqu"},
{
"firstLetter":"s",
"id":"210204000000",
"jianpin":"shkq",
"level":3,
"name":"沙河口区",
"pid":"210200000000",
"pinyin":"shahekouqu"},
{
"firstLetter":"g",
"id":"210211000000",
"jianpin":"gjzq",
"level":3,
"name":"甘井子区",
"pid":"210200000000",
"pinyin":"ganjingziqu"},
{
"firstLetter":"l",
"id":"210212000000",
"jianpin":"lskq",
"level":3,
"name":"旅顺口区",
"pid":"210200000000",
"pinyin":"lu:shunkouqu"},
{
"firstLetter":"j",
"id":"210213000000",
"jianpin":"jzq",
"level":3,
"name":"金州区",
"pid":"210200000000",
"pinyin":"jinzhouqu"},
{
"firstLetter":"p",
"id":"210214000000",
"jianpin":"pldq",
"level":3,
"name":"普兰店区",
"pid":"210200000000",
"pinyin":"pulandianqu"},
{
"firstLetter":"z",
"id":"210224000000",
"jianpin":"zhx",
"level":3,
"name":"长海县",
"pid":"210200000000",
"pinyin":"zhanghaixian"},
{
"firstLetter":"w",
"id":"210281000000",
"jianpin":"wfds",
"level":3,
"name":"瓦房店市",
"pid":"210200000000",
"pinyin":"wafangdianshi"},
{
"firstLetter":"z",
"id":"210283000000",
"jianpin":"zhs",
"level":3,
"name":"庄河市",
"pid":"210200000000",
"pinyin":"zhuangheshi"}],

[{
"firstLetter":"s",
"id":"210301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"210300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"t",
"id":"210302000000",
"jianpin":"tdq",
"level":3,
"name":"铁东区",
"pid":"210300000000",
"pinyin":"tiedongqu"},
{
"firstLetter":"t",
"id":"210303000000",
"jianpin":"txq",
"level":3,
"name":"铁西区",
"pid":"210300000000",
"pinyin":"tiexiqu"},
{
"firstLetter":"l",
"id":"210304000000",
"jianpin":"lsq",
"level":3,
"name":"立山区",
"pid":"210300000000",
"pinyin":"lishanqu"},
{
"firstLetter":"q",
"id":"210311000000",
"jianpin":"qsq",
"level":3,
"name":"千山区",
"pid":"210300000000",
"pinyin":"qianshanqu"},
{
"firstLetter":"t",
"id":"210321000000",
"jianpin":"tax",
"level":3,
"name":"台安县",
"pid":"210300000000",
"pinyin":"taianxian"},
{
"firstLetter":"x",
"id":"210323000000",
"jianpin":"xymzzzx",
"level":3,
"name":"岫岩满族自治县",
"pid":"210300000000",
"pinyin":"xiuyanmanzuzizhixian"},
{
"firstLetter":"h",
"id":"210381000000",
"jianpin":"hcs",
"level":3,
"name":"海城市",
"pid":"210300000000",
"pinyin":"haichengshi"}],

[{
"firstLetter":"s",
"id":"210401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"210400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"210402000000",
"jianpin":"xfq",
"level":3,
"name":"新抚区",
"pid":"210400000000",
"pinyin":"xinfuqu"},
{
"firstLetter":"d",
"id":"210403000000",
"jianpin":"dzq",
"level":3,
"name":"东洲区",
"pid":"210400000000",
"pinyin":"dongzhouqu"},
{
"firstLetter":"w",
"id":"210404000000",
"jianpin":"whq",
"level":3,
"name":"望花区",
"pid":"210400000000",
"pinyin":"wanghuaqu"},
{
"firstLetter":"s",
"id":"210411000000",
"jianpin":"scq",
"level":3,
"name":"顺城区",
"pid":"210400000000",
"pinyin":"shunchengqu"},
{
"firstLetter":"f",
"id":"210421000000",
"jianpin":"fsx",
"level":3,
"name":"抚顺县",
"pid":"210400000000",
"pinyin":"fushunxian"},
{
"firstLetter":"x",
"id":"210422000000",
"jianpin":"xbmzzzx",
"level":3,
"name":"新宾满族自治县",
"pid":"210400000000",
"pinyin":"xinbinmanzuzizhixian"},
{
"firstLetter":"q",
"id":"210423000000",
"jianpin":"qymzzzx",
"level":3,
"name":"清原满族自治县",
"pid":"210400000000",
"pinyin":"qingyuanmanzuzizhixian"}],

[{
"firstLetter":"s",
"id":"210501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"210500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"p",
"id":"210502000000",
"jianpin":"psq",
"level":3,
"name":"平山区",
"pid":"210500000000",
"pinyin":"pingshanqu"},
{
"firstLetter":"x",
"id":"210503000000",
"jianpin":"xhq",
"level":3,
"name":"溪湖区",
"pid":"210500000000",
"pinyin":"xihuqu"},
{
"firstLetter":"m",
"id":"210504000000",
"jianpin":"msq",
"level":3,
"name":"明山区",
"pid":"210500000000",
"pinyin":"mingshanqu"},
{
"firstLetter":"n",
"id":"210505000000",
"jianpin":"nfq",
"level":3,
"name":"南芬区",
"pid":"210500000000",
"pinyin":"nanfenqu"},
{
"firstLetter":"b",
"id":"210521000000",
"jianpin":"bxmzzzx",
"level":3,
"name":"本溪满族自治县",
"pid":"210500000000",
"pinyin":"benximanzuzizhixian"},
{
"firstLetter":"h",
"id":"210522000000",
"jianpin":"hrmzzzx",
"level":3,
"name":"桓仁满族自治县",
"pid":"210500000000",
"pinyin":"huanrenmanzuzizhixian"}],

[{
"firstLetter":"s",
"id":"210601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"210600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"210602000000",
"jianpin":"ybq",
"level":3,
"name":"元宝区",
"pid":"210600000000",
"pinyin":"yuanbaoqu"},
{
"firstLetter":"z",
"id":"210603000000",
"jianpin":"zxq",
"level":3,
"name":"振兴区",
"pid":"210600000000",
"pinyin":"zhenxingqu"},
{
"firstLetter":"z",
"id":"210604000000",
"jianpin":"zaq",
"level":3,
"name":"振安区",
"pid":"210600000000",
"pinyin":"zhenanqu"},
{
"firstLetter":"k",
"id":"210624000000",
"jianpin":"kdmzzzx",
"level":3,
"name":"宽甸满族自治县",
"pid":"210600000000",
"pinyin":"kuandianmanzuzizhixian"},
{
"firstLetter":"d",
"id":"210681000000",
"jianpin":"dgs",
"level":3,
"name":"东港市",
"pid":"210600000000",
"pinyin":"donggangshi"},
{
"firstLetter":"f",
"id":"210682000000",
"jianpin":"fcs",
"level":3,
"name":"凤城市",
"pid":"210600000000",
"pinyin":"fengchengshi"}],

[{
"firstLetter":"s",
"id":"210701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"210700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"g",
"id":"210702000000",
"jianpin":"gtq",
"level":3,
"name":"古塔区",
"pid":"210700000000",
"pinyin":"gutaqu"},
{
"firstLetter":"l",
"id":"210703000000",
"jianpin":"lhq",
"level":3,
"name":"凌河区",
"pid":"210700000000",
"pinyin":"linghequ"},
{
"firstLetter":"t",
"id":"210711000000",
"jianpin":"thq",
"level":3,
"name":"太和区",
"pid":"210700000000",
"pinyin":"taihequ"},
{
"firstLetter":"h",
"id":"210726000000",
"jianpin":"hsx",
"level":3,
"name":"黑山县",
"pid":"210700000000",
"pinyin":"heishanxian"},
{
"firstLetter":"y",
"id":"210727000000",
"jianpin":"yx",
"level":3,
"name":"义县",
"pid":"210700000000",
"pinyin":"yixian"},
{
"firstLetter":"l",
"id":"210781000000",
"jianpin":"lhs",
"level":3,
"name":"凌海市",
"pid":"210700000000",
"pinyin":"linghaishi"},
{
"firstLetter":"b",
"id":"210782000000",
"jianpin":"bzs",
"level":3,
"name":"北镇市",
"pid":"210700000000",
"pinyin":"beizhenshi"}],

[{
"firstLetter":"s",
"id":"210801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"210800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"z",
"id":"210802000000",
"jianpin":"zqq",
"level":3,
"name":"站前区",
"pid":"210800000000",
"pinyin":"zhanqianqu"},
{
"firstLetter":"x",
"id":"210803000000",
"jianpin":"xsq",
"level":3,
"name":"西市区",
"pid":"210800000000",
"pinyin":"xishiqu"},
{
"firstLetter":"b",
"id":"210804000000",
"jianpin":"byqq",
"level":3,
"name":"鲅鱼圈区",
"pid":"210800000000",
"pinyin":"bayuquanqu"},
{
"firstLetter":"l",
"id":"210811000000",
"jianpin":"lbq",
"level":3,
"name":"老边区",
"pid":"210800000000",
"pinyin":"laobianqu"},
{
"firstLetter":"g",
"id":"210881000000",
"jianpin":"gzs",
"level":3,
"name":"盖州市",
"pid":"210800000000",
"pinyin":"gaizhoushi"},
{
"firstLetter":"d",
"id":"210882000000",
"jianpin":"dsqs",
"level":3,
"name":"大石桥市",
"pid":"210800000000",
"pinyin":"dashiqiaoshi"}],

[{
"firstLetter":"s",
"id":"210901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"210900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"210902000000",
"jianpin":"hzq",
"level":3,
"name":"海州区",
"pid":"210900000000",
"pinyin":"haizhouqu"},
{
"firstLetter":"x",
"id":"210903000000",
"jianpin":"xqq",
"level":3,
"name":"新邱区",
"pid":"210900000000",
"pinyin":"xinqiuqu"},
{
"firstLetter":"t",
"id":"210904000000",
"jianpin":"tpq",
"level":3,
"name":"太平区",
"pid":"210900000000",
"pinyin":"taipingqu"},
{
"firstLetter":"q",
"id":"210905000000",
"jianpin":"qhmq",
"level":3,
"name":"清河门区",
"pid":"210900000000",
"pinyin":"qinghemenqu"},
{
"firstLetter":"x",
"id":"210911000000",
"jianpin":"xhq",
"level":3,
"name":"细河区",
"pid":"210900000000",
"pinyin":"xihequ"},
{
"firstLetter":"f",
"id":"210921000000",
"jianpin":"fxmgzzzx",
"level":3,
"name":"阜新蒙古族自治县",
"pid":"210900000000",
"pinyin":"fuxinmengguzuzizhixian"},
{
"firstLetter":"z",
"id":"210922000000",
"jianpin":"zwx",
"level":3,
"name":"彰武县",
"pid":"210900000000",
"pinyin":"zhangwuxian"}],

[{
"firstLetter":"s",
"id":"211001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"211000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"b",
"id":"211002000000",
"jianpin":"btq",
"level":3,
"name":"白塔区",
"pid":"211000000000",
"pinyin":"baitaqu"},
{
"firstLetter":"w",
"id":"211003000000",
"jianpin":"wsq",
"level":3,
"name":"文圣区",
"pid":"211000000000",
"pinyin":"wenshengqu"},
{
"firstLetter":"h",
"id":"211004000000",
"jianpin":"hwq",
"level":3,
"name":"宏伟区",
"pid":"211000000000",
"pinyin":"hongweiqu"},
{
"firstLetter":"g",
"id":"211005000000",
"jianpin":"gzlq",
"level":3,
"name":"弓长岭区",
"pid":"211000000000",
"pinyin":"gongzhanglingqu"},
{
"firstLetter":"t",
"id":"211011000000",
"jianpin":"tzhq",
"level":3,
"name":"太子河区",
"pid":"211000000000",
"pinyin":"taizihequ"},
{
"firstLetter":"l",
"id":"211021000000",
"jianpin":"lyx",
"level":3,
"name":"辽阳县",
"pid":"211000000000",
"pinyin":"liaoyangxian"},
{
"firstLetter":"d",
"id":"211081000000",
"jianpin":"dts",
"level":3,
"name":"灯塔市",
"pid":"211000000000",
"pinyin":"dengtashi"}],

[{
"firstLetter":"s",
"id":"211101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"211100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"211102000000",
"jianpin":"stzq",
"level":3,
"name":"双台子区",
"pid":"211100000000",
"pinyin":"shuangtaiziqu"},
{
"firstLetter":"x",
"id":"211103000000",
"jianpin":"xltq",
"level":3,
"name":"兴隆台区",
"pid":"211100000000",
"pinyin":"xinglongtaiqu"},
{
"firstLetter":"d",
"id":"211104000000",
"jianpin":"dwq",
"level":3,
"name":"大洼区",
"pid":"211100000000",
"pinyin":"dawaqu"},
{
"firstLetter":"p",
"id":"211122000000",
"jianpin":"psx",
"level":3,
"name":"盘山县",
"pid":"211100000000",
"pinyin":"panshanxian"}],

[{
"firstLetter":"s",
"id":"211201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"211200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"211202000000",
"jianpin":"yzq",
"level":3,
"name":"银州区",
"pid":"211200000000",
"pinyin":"yinzhouqu"},
{
"firstLetter":"q",
"id":"211204000000",
"jianpin":"qhq",
"level":3,
"name":"清河区",
"pid":"211200000000",
"pinyin":"qinghequ"},
{
"firstLetter":"t",
"id":"211221000000",
"jianpin":"tlx",
"level":3,
"name":"铁岭县",
"pid":"211200000000",
"pinyin":"tielingxian"},
{
"firstLetter":"x",
"id":"211223000000",
"jianpin":"xfx",
"level":3,
"name":"西丰县",
"pid":"211200000000",
"pinyin":"xifengxian"},
{
"firstLetter":"c",
"id":"211224000000",
"jianpin":"ctx",
"level":3,
"name":"昌图县",
"pid":"211200000000",
"pinyin":"changtuxian"},
{
"firstLetter":"d",
"id":"211281000000",
"jianpin":"dbss",
"level":3,
"name":"调兵山市",
"pid":"211200000000",
"pinyin":"diaobingshanshi"},
{
"firstLetter":"k",
"id":"211282000000",
"jianpin":"kys",
"level":3,
"name":"开原市",
"pid":"211200000000",
"pinyin":"kaiyuanshi"}],

[{
"firstLetter":"s",
"id":"211301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"211300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"211302000000",
"jianpin":"stq",
"level":3,
"name":"双塔区",
"pid":"211300000000",
"pinyin":"shuangtaqu"},
{
"firstLetter":"l",
"id":"211303000000",
"jianpin":"lcq",
"level":3,
"name":"龙城区",
"pid":"211300000000",
"pinyin":"longchengqu"},
{
"firstLetter":"c",
"id":"211321000000",
"jianpin":"cyx",
"level":3,
"name":"朝阳县",
"pid":"211300000000",
"pinyin":"chaoyangxian"},
{
"firstLetter":"j",
"id":"211322000000",
"jianpin":"jpx",
"level":3,
"name":"建平县",
"pid":"211300000000",
"pinyin":"jianpingxian"},
{
"firstLetter":"k",
"id":"211324000000",
"jianpin":"klqzymgzzzx",
"level":3,
"name":"喀喇沁左翼蒙古族自治县",
"pid":"211300000000",
"pinyin":"kalaqinzuoyimengguzuzizhixian"},
{
"firstLetter":"b",
"id":"211381000000",
"jianpin":"bps",
"level":3,
"name":"北票市",
"pid":"211300000000",
"pinyin":"beipiaoshi"},
{
"firstLetter":"l",
"id":"211382000000",
"jianpin":"lys",
"level":3,
"name":"凌源市",
"pid":"211300000000",
"pinyin":"lingyuanshi"}],

[{
"firstLetter":"s",
"id":"211401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"211400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"211402000000",
"jianpin":"lsq",
"level":3,
"name":"连山区",
"pid":"211400000000",
"pinyin":"lianshanqu"},
{
"firstLetter":"l",
"id":"211403000000",
"jianpin":"lgq",
"level":3,
"name":"龙港区",
"pid":"211400000000",
"pinyin":"longgangqu"},
{
"firstLetter":"n",
"id":"211404000000",
"jianpin":"npq",
"level":3,
"name":"南票区",
"pid":"211400000000",
"pinyin":"nanpiaoqu"},
{
"firstLetter":"s",
"id":"211421000000",
"jianpin":"szx",
"level":3,
"name":"绥中县",
"pid":"211400000000",
"pinyin":"suizhongxian"},
{
"firstLetter":"j",
"id":"211422000000",
"jianpin":"jcx",
"level":3,
"name":"建昌县",
"pid":"211400000000",
"pinyin":"jianchangxian"},
{
"firstLetter":"x",
"id":"211481000000",
"jianpin":"xcs",
"level":3,
"name":"兴城市",
"pid":"211400000000",
"pinyin":"xingchengshi"}]],



[
[{
"firstLetter":"s",
"id":"220101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"220100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"n",
"id":"220102000000",
"jianpin":"ngq",
"level":3,
"name":"南关区",
"pid":"220100000000",
"pinyin":"nanguanqu"},
{
"firstLetter":"k",
"id":"220103000000",
"jianpin":"kcq",
"level":3,
"name":"宽城区",
"pid":"220100000000",
"pinyin":"kuanchengqu"},
{
"firstLetter":"c",
"id":"220104000000",
"jianpin":"cyq",
"level":3,
"name":"朝阳区",
"pid":"220100000000",
"pinyin":"chaoyangqu"},
{
"firstLetter":"e",
"id":"220105000000",
"jianpin":"edq",
"level":3,
"name":"二道区",
"pid":"220100000000",
"pinyin":"erdaoqu"},
{
"firstLetter":"l",
"id":"220106000000",
"jianpin":"lyq",
"level":3,
"name":"绿园区",
"pid":"220100000000",
"pinyin":"lu:yuanqu"},
{
"firstLetter":"s",
"id":"220112000000",
"jianpin":"syq",
"level":3,
"name":"双阳区",
"pid":"220100000000",
"pinyin":"shuangyangqu"},
{
"firstLetter":"j",
"id":"220113000000",
"jianpin":"jtq",
"level":3,
"name":"九台区",
"pid":"220100000000",
"pinyin":"jiutaiqu"},
{
"firstLetter":"n",
"id":"220122000000",
"jianpin":"nax",
"level":3,
"name":"农安县",
"pid":"220100000000",
"pinyin":"nonganxian"},
{
"firstLetter":"z",
"id":"220171000000",
"jianpin":"zcjjjskfq",
"level":3,
"name":"长春经济技术开发区",
"pid":"220100000000",
"pinyin":"zhangchunjingjijishukaifaqu"},
{
"firstLetter":"z",
"id":"220172000000",
"jianpin":"zcjygxjscykfq",
"level":3,
"name":"长春净月高新技术产业开发区",
"pid":"220100000000",
"pinyin":"zhangchunjingyuegaoxinjishuchanyekaifaqu"},
{
"firstLetter":"z",
"id":"220173000000",
"jianpin":"zcgxjscykfq",
"level":3,
"name":"长春高新技术产业开发区",
"pid":"220100000000",
"pinyin":"zhangchungaoxinjishuchanyekaifaqu"},
{
"firstLetter":"z",
"id":"220174000000",
"jianpin":"zcqcjjjskfq",
"level":3,
"name":"长春汽车经济技术开发区",
"pid":"220100000000",
"pinyin":"zhangchunqichejingjijishukaifaqu"},
{
"firstLetter":"y",
"id":"220182000000",
"jianpin":"yss",
"level":3,
"name":"榆树市",
"pid":"220100000000",
"pinyin":"yushushi"},
{
"firstLetter":"d",
"id":"220183000000",
"jianpin":"dhs",
"level":3,
"name":"德惠市",
"pid":"220100000000",
"pinyin":"dehuishi"}],

[{
"firstLetter":"s",
"id":"220201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"220200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"220202000000",
"jianpin":"cyq",
"level":3,
"name":"昌邑区",
"pid":"220200000000",
"pinyin":"changyiqu"},
{
"firstLetter":"l",
"id":"220203000000",
"jianpin":"ltq",
"level":3,
"name":"龙潭区",
"pid":"220200000000",
"pinyin":"longtanqu"},
{
"firstLetter":"c",
"id":"220204000000",
"jianpin":"cyq",
"level":3,
"name":"船营区",
"pid":"220200000000",
"pinyin":"chuanyingqu"},
{
"firstLetter":"f",
"id":"220211000000",
"jianpin":"fmq",
"level":3,
"name":"丰满区",
"pid":"220200000000",
"pinyin":"fengmanqu"},
{
"firstLetter":"y",
"id":"220221000000",
"jianpin":"yjx",
"level":3,
"name":"永吉县",
"pid":"220200000000",
"pinyin":"yongjixian"},
{
"firstLetter":"j",
"id":"220271000000",
"jianpin":"jljjkfq",
"level":3,
"name":"吉林经济开发区",
"pid":"220200000000",
"pinyin":"jilinjingjikaifaqu"},
{
"firstLetter":"j",
"id":"220272000000",
"jianpin":"jlgxjscykfq",
"level":3,
"name":"吉林高新技术产业开发区",
"pid":"220200000000",
"pinyin":"jilingaoxinjishuchanyekaifaqu"},
{
"firstLetter":"j",
"id":"220273000000",
"jianpin":"jlzgxjpspq",
"level":3,
"name":"吉林中国新加坡食品区",
"pid":"220200000000",
"pinyin":"jilinzhongguoxinjiaposhipinqu"},
{
"firstLetter":"j",
"id":"220281000000",
"jianpin":"jhs",
"level":3,
"name":"蛟河市",
"pid":"220200000000",
"pinyin":"jiaoheshi"},
{
"firstLetter":"h",
"id":"220282000000",
"jianpin":"hds",
"level":3,
"name":"桦甸市",
"pid":"220200000000",
"pinyin":"huadianshi"},
{
"firstLetter":"s",
"id":"220283000000",
"jianpin":"sls",
"level":3,
"name":"舒兰市",
"pid":"220200000000",
"pinyin":"shulanshi"},
{
"firstLetter":"p",
"id":"220284000000",
"jianpin":"pss",
"level":3,
"name":"磐石市",
"pid":"220200000000",
"pinyin":"panshishi"}],

[{
"firstLetter":"s",
"id":"220301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"220300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"t",
"id":"220302000000",
"jianpin":"txq",
"level":3,
"name":"铁西区",
"pid":"220300000000",
"pinyin":"tiexiqu"},
{
"firstLetter":"t",
"id":"220303000000",
"jianpin":"tdq",
"level":3,
"name":"铁东区",
"pid":"220300000000",
"pinyin":"tiedongqu"},
{
"firstLetter":"l",
"id":"220322000000",
"jianpin":"lsx",
"level":3,
"name":"梨树县",
"pid":"220300000000",
"pinyin":"lishuxian"},
{
"firstLetter":"y",
"id":"220323000000",
"jianpin":"ytmzzzx",
"level":3,
"name":"伊通满族自治县",
"pid":"220300000000",
"pinyin":"yitongmanzuzizhixian"},
{
"firstLetter":"g",
"id":"220381000000",
"jianpin":"gzls",
"level":3,
"name":"公主岭市",
"pid":"220300000000",
"pinyin":"gongzhulingshi"},
{
"firstLetter":"s",
"id":"220382000000",
"jianpin":"sls",
"level":3,
"name":"双辽市",
"pid":"220300000000",
"pinyin":"shuangliaoshi"}],

[{
"firstLetter":"s",
"id":"220401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"220400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"220402000000",
"jianpin":"lsq",
"level":3,
"name":"龙山区",
"pid":"220400000000",
"pinyin":"longshanqu"},
{
"firstLetter":"x",
"id":"220403000000",
"jianpin":"xaq",
"level":3,
"name":"西安区",
"pid":"220400000000",
"pinyin":"xianqu"},
{
"firstLetter":"d",
"id":"220421000000",
"jianpin":"dfx",
"level":3,
"name":"东丰县",
"pid":"220400000000",
"pinyin":"dongfengxian"},
{
"firstLetter":"d",
"id":"220422000000",
"jianpin":"dlx",
"level":3,
"name":"东辽县",
"pid":"220400000000",
"pinyin":"dongliaoxian"}],

[{
"firstLetter":"s",
"id":"220501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"220500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"220502000000",
"jianpin":"dcq",
"level":3,
"name":"东昌区",
"pid":"220500000000",
"pinyin":"dongchangqu"},
{
"firstLetter":"e",
"id":"220503000000",
"jianpin":"edjq",
"level":3,
"name":"二道江区",
"pid":"220500000000",
"pinyin":"erdaojiangqu"},
{
"firstLetter":"t",
"id":"220521000000",
"jianpin":"thx",
"level":3,
"name":"通化县",
"pid":"220500000000",
"pinyin":"tonghuaxian"},
{
"firstLetter":"h",
"id":"220523000000",
"jianpin":"hnx",
"level":3,
"name":"辉南县",
"pid":"220500000000",
"pinyin":"huinanxian"},
{
"firstLetter":"l",
"id":"220524000000",
"jianpin":"lhx",
"level":3,
"name":"柳河县",
"pid":"220500000000",
"pinyin":"liuhexian"},
{
"firstLetter":"m",
"id":"220581000000",
"jianpin":"mhks",
"level":3,
"name":"梅河口市",
"pid":"220500000000",
"pinyin":"meihekoushi"},
{
"firstLetter":"j",
"id":"220582000000",
"jianpin":"jas",
"level":3,
"name":"集安市",
"pid":"220500000000",
"pinyin":"jianshi"}],

[{
"firstLetter":"s",
"id":"220601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"220600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"220602000000",
"jianpin":"hjq",
"level":3,
"name":"浑江区",
"pid":"220600000000",
"pinyin":"hunjiangqu"},
{
"firstLetter":"j",
"id":"220605000000",
"jianpin":"jyq",
"level":3,
"name":"江源区",
"pid":"220600000000",
"pinyin":"jiangyuanqu"},
{
"firstLetter":"f",
"id":"220621000000",
"jianpin":"fsx",
"level":3,
"name":"抚松县",
"pid":"220600000000",
"pinyin":"fusongxian"},
{
"firstLetter":"j",
"id":"220622000000",
"jianpin":"jyx",
"level":3,
"name":"靖宇县",
"pid":"220600000000",
"pinyin":"jingyuxian"},
{
"firstLetter":"z",
"id":"220623000000",
"jianpin":"zbcxzzzx",
"level":3,
"name":"长白朝鲜族自治县",
"pid":"220600000000",
"pinyin":"zhangbaichaoxianzuzizhixian"},
{
"firstLetter":"l",
"id":"220681000000",
"jianpin":"ljs",
"level":3,
"name":"临江市",
"pid":"220600000000",
"pinyin":"linjiangshi"}],

[{
"firstLetter":"s",
"id":"220701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"220700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"n",
"id":"220702000000",
"jianpin":"njq",
"level":3,
"name":"宁江区",
"pid":"220700000000",
"pinyin":"ningjiangqu"},
{
"firstLetter":"q",
"id":"220721000000",
"jianpin":"qgelsmgzzzx",
"level":3,
"name":"前郭尔罗斯蒙古族自治县",
"pid":"220700000000",
"pinyin":"qianguoerluosimengguzuzizhixian"},
{
"firstLetter":"z",
"id":"220722000000",
"jianpin":"zlx",
"level":3,
"name":"长岭县",
"pid":"220700000000",
"pinyin":"zhanglingxian"},
{
"firstLetter":"q",
"id":"220723000000",
"jianpin":"qax",
"level":3,
"name":"乾安县",
"pid":"220700000000",
"pinyin":"qiananxian"},
{
"firstLetter":"j",
"id":"220771000000",
"jianpin":"jlsyjjkfq",
"level":3,
"name":"吉林松原经济开发区",
"pid":"220700000000",
"pinyin":"jilinsongyuanjingjikaifaqu"},
{
"firstLetter":"f",
"id":"220781000000",
"jianpin":"fys",
"level":3,
"name":"扶余市",
"pid":"220700000000",
"pinyin":"fuyushi"}],

[{
"firstLetter":"s",
"id":"220801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"220800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"t",
"id":"220802000000",
"jianpin":"tbq",
"level":3,
"name":"洮北区",
"pid":"220800000000",
"pinyin":"taobeiqu"},
{
"firstLetter":"z",
"id":"220821000000",
"jianpin":"zlx",
"level":3,
"name":"镇赉县",
"pid":"220800000000",
"pinyin":"zhenlaixian"},
{
"firstLetter":"t",
"id":"220822000000",
"jianpin":"tyx",
"level":3,
"name":"通榆县",
"pid":"220800000000",
"pinyin":"tongyuxian"},
{
"firstLetter":"j",
"id":"220871000000",
"jianpin":"jlbcjjkfq",
"level":3,
"name":"吉林白城经济开发区",
"pid":"220800000000",
"pinyin":"jilinbaichengjingjikaifaqu"},
{
"firstLetter":"t",
"id":"220881000000",
"jianpin":"tns",
"level":3,
"name":"洮南市",
"pid":"220800000000",
"pinyin":"taonanshi"},
{
"firstLetter":"d",
"id":"220882000000",
"jianpin":"das",
"level":3,
"name":"大安市",
"pid":"220800000000",
"pinyin":"daanshi"}],

[{
"firstLetter":"y",
"id":"222401000000",
"jianpin":"yjs",
"level":3,
"name":"延吉市",
"pid":"222400000000",
"pinyin":"yanjishi"},
{
"firstLetter":"t",
"id":"222402000000",
"jianpin":"tms",
"level":3,
"name":"图们市",
"pid":"222400000000",
"pinyin":"tumenshi"},
{
"firstLetter":"d",
"id":"222403000000",
"jianpin":"dhs",
"level":3,
"name":"敦化市",
"pid":"222400000000",
"pinyin":"dunhuashi"},
{
"firstLetter":"h",
"id":"222404000000",
"jianpin":"hcs",
"level":3,
"name":"珲春市",
"pid":"222400000000",
"pinyin":"hunchunshi"},
{
"firstLetter":"l",
"id":"222405000000",
"jianpin":"ljs",
"level":3,
"name":"龙井市",
"pid":"222400000000",
"pinyin":"longjingshi"},
{
"firstLetter":"h",
"id":"222406000000",
"jianpin":"hls",
"level":3,
"name":"和龙市",
"pid":"222400000000",
"pinyin":"helongshi"},
{
"firstLetter":"w",
"id":"222424000000",
"jianpin":"wqx",
"level":3,
"name":"汪清县",
"pid":"222400000000",
"pinyin":"wangqingxian"},
{
"firstLetter":"a",
"id":"222426000000",
"jianpin":"atx",
"level":3,
"name":"安图县",
"pid":"222400000000",
"pinyin":"antuxian"}]],



[
[{
"firstLetter":"s",
"id":"230101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"230100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"230102000000",
"jianpin":"dlq",
"level":3,
"name":"道里区",
"pid":"230100000000",
"pinyin":"daoliqu"},
{
"firstLetter":"n",
"id":"230103000000",
"jianpin":"ngq",
"level":3,
"name":"南岗区",
"pid":"230100000000",
"pinyin":"nangangqu"},
{
"firstLetter":"d",
"id":"230104000000",
"jianpin":"dwq",
"level":3,
"name":"道外区",
"pid":"230100000000",
"pinyin":"daowaiqu"},
{
"firstLetter":"p",
"id":"230108000000",
"jianpin":"pfq",
"level":3,
"name":"平房区",
"pid":"230100000000",
"pinyin":"pingfangqu"},
{
"firstLetter":"s",
"id":"230109000000",
"jianpin":"sbq",
"level":3,
"name":"松北区",
"pid":"230100000000",
"pinyin":"songbeiqu"},
{
"firstLetter":"x",
"id":"230110000000",
"jianpin":"xfq",
"level":3,
"name":"香坊区",
"pid":"230100000000",
"pinyin":"xiangfangqu"},
{
"firstLetter":"h",
"id":"230111000000",
"jianpin":"hlq",
"level":3,
"name":"呼兰区",
"pid":"230100000000",
"pinyin":"hulanqu"},
{
"firstLetter":"a",
"id":"230112000000",
"jianpin":"acq",
"level":3,
"name":"阿城区",
"pid":"230100000000",
"pinyin":"achengqu"},
{
"firstLetter":"s",
"id":"230113000000",
"jianpin":"scq",
"level":3,
"name":"双城区",
"pid":"230100000000",
"pinyin":"shuangchengqu"},
{
"firstLetter":"y",
"id":"230123000000",
"jianpin":"ylx",
"level":3,
"name":"依兰县",
"pid":"230100000000",
"pinyin":"yilanxian"},
{
"firstLetter":"f",
"id":"230124000000",
"jianpin":"fzx",
"level":3,
"name":"方正县",
"pid":"230100000000",
"pinyin":"fangzhengxian"},
{
"firstLetter":"b",
"id":"230125000000",
"jianpin":"bx",
"level":3,
"name":"宾县",
"pid":"230100000000",
"pinyin":"binxian"},
{
"firstLetter":"b",
"id":"230126000000",
"jianpin":"byx",
"level":3,
"name":"巴彦县",
"pid":"230100000000",
"pinyin":"bayanxian"},
{
"firstLetter":"m",
"id":"230127000000",
"jianpin":"mlx",
"level":3,
"name":"木兰县",
"pid":"230100000000",
"pinyin":"mulanxian"},
{
"firstLetter":"t",
"id":"230128000000",
"jianpin":"thx",
"level":3,
"name":"通河县",
"pid":"230100000000",
"pinyin":"tonghexian"},
{
"firstLetter":"y",
"id":"230129000000",
"jianpin":"ysx",
"level":3,
"name":"延寿县",
"pid":"230100000000",
"pinyin":"yanshouxian"},
{
"firstLetter":"s",
"id":"230183000000",
"jianpin":"szs",
"level":3,
"name":"尚志市",
"pid":"230100000000",
"pinyin":"shangzhishi"},
{
"firstLetter":"w",
"id":"230184000000",
"jianpin":"wcs",
"level":3,
"name":"五常市",
"pid":"230100000000",
"pinyin":"wuchangshi"}],

[{
"firstLetter":"s",
"id":"230201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"230200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"230202000000",
"jianpin":"lsq",
"level":3,
"name":"龙沙区",
"pid":"230200000000",
"pinyin":"longshaqu"},
{
"firstLetter":"j",
"id":"230203000000",
"jianpin":"jhq",
"level":3,
"name":"建华区",
"pid":"230200000000",
"pinyin":"jianhuaqu"},
{
"firstLetter":"t",
"id":"230204000000",
"jianpin":"tfq",
"level":3,
"name":"铁锋区",
"pid":"230200000000",
"pinyin":"tiefengqu"},
{
"firstLetter":"a",
"id":"230205000000",
"jianpin":"aaxq",
"level":3,
"name":"昂昂溪区",
"pid":"230200000000",
"pinyin":"angangxiqu"},
{
"firstLetter":"f",
"id":"230206000000",
"jianpin":"flejq",
"level":3,
"name":"富拉尔基区",
"pid":"230200000000",
"pinyin":"fulaerjiqu"},
{
"firstLetter":"n",
"id":"230207000000",
"jianpin":"nzsq",
"level":3,
"name":"碾子山区",
"pid":"230200000000",
"pinyin":"nianzishanqu"},
{
"firstLetter":"m",
"id":"230208000000",
"jianpin":"mlsdwezq",
"level":3,
"name":"梅里斯达斡尔族区",
"pid":"230200000000",
"pinyin":"meilisidawoerzuqu"},
{
"firstLetter":"l",
"id":"230221000000",
"jianpin":"ljx",
"level":3,
"name":"龙江县",
"pid":"230200000000",
"pinyin":"longjiangxian"},
{
"firstLetter":"y",
"id":"230223000000",
"jianpin":"yax",
"level":3,
"name":"依安县",
"pid":"230200000000",
"pinyin":"yianxian"},
{
"firstLetter":"t",
"id":"230224000000",
"jianpin":"tlx",
"level":3,
"name":"泰来县",
"pid":"230200000000",
"pinyin":"tailaixian"},
{
"firstLetter":"g",
"id":"230225000000",
"jianpin":"gnx",
"level":3,
"name":"甘南县",
"pid":"230200000000",
"pinyin":"gannanxian"},
{
"firstLetter":"f",
"id":"230227000000",
"jianpin":"fyx",
"level":3,
"name":"富裕县",
"pid":"230200000000",
"pinyin":"fuyuxian"},
{
"firstLetter":"k",
"id":"230229000000",
"jianpin":"ksx",
"level":3,
"name":"克山县",
"pid":"230200000000",
"pinyin":"keshanxian"},
{
"firstLetter":"k",
"id":"230230000000",
"jianpin":"kdx",
"level":3,
"name":"克东县",
"pid":"230200000000",
"pinyin":"kedongxian"},
{
"firstLetter":"b",
"id":"230231000000",
"jianpin":"bqx",
"level":3,
"name":"拜泉县",
"pid":"230200000000",
"pinyin":"baiquanxian"},
{
"firstLetter":"n",
"id":"230281000000",
"jianpin":"nhs",
"level":3,
"name":"讷河市",
"pid":"230200000000",
"pinyin":"neheshi"}],

[{
"firstLetter":"s",
"id":"230301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"230300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"230302000000",
"jianpin":"jgq",
"level":3,
"name":"鸡冠区",
"pid":"230300000000",
"pinyin":"jiguanqu"},
{
"firstLetter":"h",
"id":"230303000000",
"jianpin":"hsq",
"level":3,
"name":"恒山区",
"pid":"230300000000",
"pinyin":"hengshanqu"},
{
"firstLetter":"d",
"id":"230304000000",
"jianpin":"ddq",
"level":3,
"name":"滴道区",
"pid":"230300000000",
"pinyin":"didaoqu"},
{
"firstLetter":"l",
"id":"230305000000",
"jianpin":"lsq",
"level":3,
"name":"梨树区",
"pid":"230300000000",
"pinyin":"lishuqu"},
{
"firstLetter":"c",
"id":"230306000000",
"jianpin":"czhq",
"level":3,
"name":"城子河区",
"pid":"230300000000",
"pinyin":"chengzihequ"},
{
"firstLetter":"m",
"id":"230307000000",
"jianpin":"msq",
"level":3,
"name":"麻山区",
"pid":"230300000000",
"pinyin":"mashanqu"},
{
"firstLetter":"j",
"id":"230321000000",
"jianpin":"jdx",
"level":3,
"name":"鸡东县",
"pid":"230300000000",
"pinyin":"jidongxian"},
{
"firstLetter":"h",
"id":"230381000000",
"jianpin":"hls",
"level":3,
"name":"虎林市",
"pid":"230300000000",
"pinyin":"hulinshi"},
{
"firstLetter":"m",
"id":"230382000000",
"jianpin":"mss",
"level":3,
"name":"密山市",
"pid":"230300000000",
"pinyin":"mishanshi"}],

[{
"firstLetter":"s",
"id":"230401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"230400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"230402000000",
"jianpin":"xyq",
"level":3,
"name":"向阳区",
"pid":"230400000000",
"pinyin":"xiangyangqu"},
{
"firstLetter":"g",
"id":"230403000000",
"jianpin":"gnq",
"level":3,
"name":"工农区",
"pid":"230400000000",
"pinyin":"gongnongqu"},
{
"firstLetter":"n",
"id":"230404000000",
"jianpin":"nsq",
"level":3,
"name":"南山区",
"pid":"230400000000",
"pinyin":"nanshanqu"},
{
"firstLetter":"x",
"id":"230405000000",
"jianpin":"xaq",
"level":3,
"name":"兴安区",
"pid":"230400000000",
"pinyin":"xinganqu"},
{
"firstLetter":"d",
"id":"230406000000",
"jianpin":"dsq",
"level":3,
"name":"东山区",
"pid":"230400000000",
"pinyin":"dongshanqu"},
{
"firstLetter":"x",
"id":"230407000000",
"jianpin":"xsq",
"level":3,
"name":"兴山区",
"pid":"230400000000",
"pinyin":"xingshanqu"},
{
"firstLetter":"l",
"id":"230421000000",
"jianpin":"lbx",
"level":3,
"name":"萝北县",
"pid":"230400000000",
"pinyin":"luobeixian"},
{
"firstLetter":"s",
"id":"230422000000",
"jianpin":"sbx",
"level":3,
"name":"绥滨县",
"pid":"230400000000",
"pinyin":"suibinxian"}],

[{
"firstLetter":"s",
"id":"230501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"230500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"230502000000",
"jianpin":"jsq",
"level":3,
"name":"尖山区",
"pid":"230500000000",
"pinyin":"jianshanqu"},
{
"firstLetter":"l",
"id":"230503000000",
"jianpin":"ldq",
"level":3,
"name":"岭东区",
"pid":"230500000000",
"pinyin":"lingdongqu"},
{
"firstLetter":"s",
"id":"230505000000",
"jianpin":"sftq",
"level":3,
"name":"四方台区",
"pid":"230500000000",
"pinyin":"sifangtaiqu"},
{
"firstLetter":"b",
"id":"230506000000",
"jianpin":"bsq",
"level":3,
"name":"宝山区",
"pid":"230500000000",
"pinyin":"baoshanqu"},
{
"firstLetter":"j",
"id":"230521000000",
"jianpin":"jxx",
"level":3,
"name":"集贤县",
"pid":"230500000000",
"pinyin":"jixianxian"},
{
"firstLetter":"y",
"id":"230522000000",
"jianpin":"yyx",
"level":3,
"name":"友谊县",
"pid":"230500000000",
"pinyin":"youyixian"},
{
"firstLetter":"b",
"id":"230523000000",
"jianpin":"bqx",
"level":3,
"name":"宝清县",
"pid":"230500000000",
"pinyin":"baoqingxian"},
{
"firstLetter":"r",
"id":"230524000000",
"jianpin":"rhx",
"level":3,
"name":"饶河县",
"pid":"230500000000",
"pinyin":"raohexian"}],

[{
"firstLetter":"s",
"id":"230601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"230600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"230602000000",
"jianpin":"setq",
"level":3,
"name":"萨尔图区",
"pid":"230600000000",
"pinyin":"saertuqu"},
{
"firstLetter":"l",
"id":"230603000000",
"jianpin":"lfq",
"level":3,
"name":"龙凤区",
"pid":"230600000000",
"pinyin":"longfengqu"},
{
"firstLetter":"r",
"id":"230604000000",
"jianpin":"rhlq",
"level":3,
"name":"让胡路区",
"pid":"230600000000",
"pinyin":"ranghuluqu"},
{
"firstLetter":"h",
"id":"230605000000",
"jianpin":"hgq",
"level":3,
"name":"红岗区",
"pid":"230600000000",
"pinyin":"honggangqu"},
{
"firstLetter":"d",
"id":"230606000000",
"jianpin":"dtq",
"level":3,
"name":"大同区",
"pid":"230600000000",
"pinyin":"datongqu"},
{
"firstLetter":"z",
"id":"230621000000",
"jianpin":"zzx",
"level":3,
"name":"肇州县",
"pid":"230600000000",
"pinyin":"zhaozhouxian"},
{
"firstLetter":"z",
"id":"230622000000",
"jianpin":"zyx",
"level":3,
"name":"肇源县",
"pid":"230600000000",
"pinyin":"zhaoyuanxian"},
{
"firstLetter":"l",
"id":"230623000000",
"jianpin":"ldx",
"level":3,
"name":"林甸县",
"pid":"230600000000",
"pinyin":"lindianxian"},
{
"firstLetter":"d",
"id":"230624000000",
"jianpin":"debtmgzzzx",
"level":3,
"name":"杜尔伯特蒙古族自治县",
"pid":"230600000000",
"pinyin":"duerbotemengguzuzizhixian"},
{
"firstLetter":"d",
"id":"230671000000",
"jianpin":"dqgxjscykfq",
"level":3,
"name":"大庆高新技术产业开发区",
"pid":"230600000000",
"pinyin":"daqinggaoxinjishuchanyekaifaqu"}],

[{
"firstLetter":"s",
"id":"230701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"230700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"230702000000",
"jianpin":"ycq",
"level":3,
"name":"伊春区",
"pid":"230700000000",
"pinyin":"yichunqu"},
{
"firstLetter":"n",
"id":"230703000000",
"jianpin":"ncq",
"level":3,
"name":"南岔区",
"pid":"230700000000",
"pinyin":"nanchaqu"},
{
"firstLetter":"y",
"id":"230704000000",
"jianpin":"yhq",
"level":3,
"name":"友好区",
"pid":"230700000000",
"pinyin":"youhaoqu"},
{
"firstLetter":"x",
"id":"230705000000",
"jianpin":"xlq",
"level":3,
"name":"西林区",
"pid":"230700000000",
"pinyin":"xilinqu"},
{
"firstLetter":"c",
"id":"230706000000",
"jianpin":"clq",
"level":3,
"name":"翠峦区",
"pid":"230700000000",
"pinyin":"cuiluanqu"},
{
"firstLetter":"x",
"id":"230707000000",
"jianpin":"xqq",
"level":3,
"name":"新青区",
"pid":"230700000000",
"pinyin":"xinqingqu"},
{
"firstLetter":"m",
"id":"230708000000",
"jianpin":"mxq",
"level":3,
"name":"美溪区",
"pid":"230700000000",
"pinyin":"meixiqu"},
{
"firstLetter":"j",
"id":"230709000000",
"jianpin":"jstq",
"level":3,
"name":"金山屯区",
"pid":"230700000000",
"pinyin":"jinshantunqu"},
{
"firstLetter":"w",
"id":"230710000000",
"jianpin":"wyq",
"level":3,
"name":"五营区",
"pid":"230700000000",
"pinyin":"wuyingqu"},
{
"firstLetter":"w",
"id":"230711000000",
"jianpin":"wmhq",
"level":3,
"name":"乌马河区",
"pid":"230700000000",
"pinyin":"wumahequ"},
{
"firstLetter":"t",
"id":"230712000000",
"jianpin":"twhq",
"level":3,
"name":"汤旺河区",
"pid":"230700000000",
"pinyin":"tangwanghequ"},
{
"firstLetter":"d",
"id":"230713000000",
"jianpin":"dlq",
"level":3,
"name":"带岭区",
"pid":"230700000000",
"pinyin":"dailingqu"},
{
"firstLetter":"w",
"id":"230714000000",
"jianpin":"wylq",
"level":3,
"name":"乌伊岭区",
"pid":"230700000000",
"pinyin":"wuyilingqu"},
{
"firstLetter":"h",
"id":"230715000000",
"jianpin":"hxq",
"level":3,
"name":"红星区",
"pid":"230700000000",
"pinyin":"hongxingqu"},
{
"firstLetter":"s",
"id":"230716000000",
"jianpin":"sglq",
"level":3,
"name":"上甘岭区",
"pid":"230700000000",
"pinyin":"shangganlingqu"},
{
"firstLetter":"j",
"id":"230722000000",
"jianpin":"jyx",
"level":3,
"name":"嘉荫县",
"pid":"230700000000",
"pinyin":"jiayinxian"},
{
"firstLetter":"t",
"id":"230781000000",
"jianpin":"tls",
"level":3,
"name":"铁力市",
"pid":"230700000000",
"pinyin":"tielishi"}],

[{
"firstLetter":"s",
"id":"230801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"230800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"230803000000",
"jianpin":"xyq",
"level":3,
"name":"向阳区",
"pid":"230800000000",
"pinyin":"xiangyangqu"},
{
"firstLetter":"q",
"id":"230804000000",
"jianpin":"qjq",
"level":3,
"name":"前进区",
"pid":"230800000000",
"pinyin":"qianjinqu"},
{
"firstLetter":"d",
"id":"230805000000",
"jianpin":"dfq",
"level":3,
"name":"东风区",
"pid":"230800000000",
"pinyin":"dongfengqu"},
{
"firstLetter":"j",
"id":"230811000000",
"jianpin":"jq",
"level":3,
"name":"郊区",
"pid":"230800000000",
"pinyin":"jiaoqu"},
{
"firstLetter":"h",
"id":"230822000000",
"jianpin":"hnx",
"level":3,
"name":"桦南县",
"pid":"230800000000",
"pinyin":"huananxian"},
{
"firstLetter":"h",
"id":"230826000000",
"jianpin":"hcx",
"level":3,
"name":"桦川县",
"pid":"230800000000",
"pinyin":"huachuanxian"},
{
"firstLetter":"t",
"id":"230828000000",
"jianpin":"tyx",
"level":3,
"name":"汤原县",
"pid":"230800000000",
"pinyin":"tangyuanxian"},
{
"firstLetter":"t",
"id":"230881000000",
"jianpin":"tjs",
"level":3,
"name":"同江市",
"pid":"230800000000",
"pinyin":"tongjiangshi"},
{
"firstLetter":"f",
"id":"230882000000",
"jianpin":"fjs",
"level":3,
"name":"富锦市",
"pid":"230800000000",
"pinyin":"fujinshi"},
{
"firstLetter":"f",
"id":"230883000000",
"jianpin":"fys",
"level":3,
"name":"抚远市",
"pid":"230800000000",
"pinyin":"fuyuanshi"}],

[{
"firstLetter":"s",
"id":"230901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"230900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"230902000000",
"jianpin":"xxq",
"level":3,
"name":"新兴区",
"pid":"230900000000",
"pinyin":"xinxingqu"},
{
"firstLetter":"t",
"id":"230903000000",
"jianpin":"tsq",
"level":3,
"name":"桃山区",
"pid":"230900000000",
"pinyin":"taoshanqu"},
{
"firstLetter":"q",
"id":"230904000000",
"jianpin":"qzhq",
"level":3,
"name":"茄子河区",
"pid":"230900000000",
"pinyin":"qiezihequ"},
{
"firstLetter":"b",
"id":"230921000000",
"jianpin":"blx",
"level":3,
"name":"勃利县",
"pid":"230900000000",
"pinyin":"bolixian"}],

[{
"firstLetter":"s",
"id":"231001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"231000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"231002000000",
"jianpin":"daq",
"level":3,
"name":"东安区",
"pid":"231000000000",
"pinyin":"donganqu"},
{
"firstLetter":"y",
"id":"231003000000",
"jianpin":"ymq",
"level":3,
"name":"阳明区",
"pid":"231000000000",
"pinyin":"yangmingqu"},
{
"firstLetter":"a",
"id":"231004000000",
"jianpin":"amq",
"level":3,
"name":"爱民区",
"pid":"231000000000",
"pinyin":"aiminqu"},
{
"firstLetter":"x",
"id":"231005000000",
"jianpin":"xaq",
"level":3,
"name":"西安区",
"pid":"231000000000",
"pinyin":"xianqu"},
{
"firstLetter":"l",
"id":"231025000000",
"jianpin":"lkx",
"level":3,
"name":"林口县",
"pid":"231000000000",
"pinyin":"linkouxian"},
{
"firstLetter":"m",
"id":"231071000000",
"jianpin":"mdjjjjskfq",
"level":3,
"name":"牡丹江经济技术开发区",
"pid":"231000000000",
"pinyin":"mudanjiangjingjijishukaifaqu"},
{
"firstLetter":"s",
"id":"231081000000",
"jianpin":"sfhs",
"level":3,
"name":"绥芬河市",
"pid":"231000000000",
"pinyin":"suifenheshi"},
{
"firstLetter":"h",
"id":"231083000000",
"jianpin":"hls",
"level":3,
"name":"海林市",
"pid":"231000000000",
"pinyin":"hailinshi"},
{
"firstLetter":"n",
"id":"231084000000",
"jianpin":"nas",
"level":3,
"name":"宁安市",
"pid":"231000000000",
"pinyin":"ninganshi"},
{
"firstLetter":"m",
"id":"231085000000",
"jianpin":"mls",
"level":3,
"name":"穆棱市",
"pid":"231000000000",
"pinyin":"mulengshi"},
{
"firstLetter":"d",
"id":"231086000000",
"jianpin":"dns",
"level":3,
"name":"东宁市",
"pid":"231000000000",
"pinyin":"dongningshi"}],

[{
"firstLetter":"s",
"id":"231101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"231100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"a",
"id":"231102000000",
"jianpin":"ahq",
"level":3,
"name":"爱辉区",
"pid":"231100000000",
"pinyin":"aihuiqu"},
{
"firstLetter":"n",
"id":"231121000000",
"jianpin":"njx",
"level":3,
"name":"嫩江县",
"pid":"231100000000",
"pinyin":"nenjiangxian"},
{
"firstLetter":"x",
"id":"231123000000",
"jianpin":"xkx",
"level":3,
"name":"逊克县",
"pid":"231100000000",
"pinyin":"xunkexian"},
{
"firstLetter":"s",
"id":"231124000000",
"jianpin":"swx",
"level":3,
"name":"孙吴县",
"pid":"231100000000",
"pinyin":"sunwuxian"},
{
"firstLetter":"b",
"id":"231181000000",
"jianpin":"bas",
"level":3,
"name":"北安市",
"pid":"231100000000",
"pinyin":"beianshi"},
{
"firstLetter":"w",
"id":"231182000000",
"jianpin":"wdlcs",
"level":3,
"name":"五大连池市",
"pid":"231100000000",
"pinyin":"wudalianchishi"}],

[{
"firstLetter":"s",
"id":"231201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"231200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"b",
"id":"231202000000",
"jianpin":"blq",
"level":3,
"name":"北林区",
"pid":"231200000000",
"pinyin":"beilinqu"},
{
"firstLetter":"w",
"id":"231221000000",
"jianpin":"wkx",
"level":3,
"name":"望奎县",
"pid":"231200000000",
"pinyin":"wangkuixian"},
{
"firstLetter":"l",
"id":"231222000000",
"jianpin":"lxx",
"level":3,
"name":"兰西县",
"pid":"231200000000",
"pinyin":"lanxixian"},
{
"firstLetter":"q",
"id":"231223000000",
"jianpin":"qgx",
"level":3,
"name":"青冈县",
"pid":"231200000000",
"pinyin":"qinggangxian"},
{
"firstLetter":"q",
"id":"231224000000",
"jianpin":"qax",
"level":3,
"name":"庆安县",
"pid":"231200000000",
"pinyin":"qinganxian"},
{
"firstLetter":"m",
"id":"231225000000",
"jianpin":"msx",
"level":3,
"name":"明水县",
"pid":"231200000000",
"pinyin":"mingshuixian"},
{
"firstLetter":"s",
"id":"231226000000",
"jianpin":"slx",
"level":3,
"name":"绥棱县",
"pid":"231200000000",
"pinyin":"suilengxian"},
{
"firstLetter":"a",
"id":"231281000000",
"jianpin":"ads",
"level":3,
"name":"安达市",
"pid":"231200000000",
"pinyin":"andashi"},
{
"firstLetter":"z",
"id":"231282000000",
"jianpin":"zds",
"level":3,
"name":"肇东市",
"pid":"231200000000",
"pinyin":"zhaodongshi"},
{
"firstLetter":"h",
"id":"231283000000",
"jianpin":"hls",
"level":3,
"name":"海伦市",
"pid":"231200000000",
"pinyin":"hailunshi"}],

[{
"firstLetter":"j",
"id":"232701000000",
"jianpin":"jgdqq",
"level":3,
"name":"加格达奇区",
"pid":"232700000000",
"pinyin":"jiagedaqiqu"},
{
"firstLetter":"s",
"id":"232702000000",
"jianpin":"slq",
"level":3,
"name":"松岭区",
"pid":"232700000000",
"pinyin":"songlingqu"},
{
"firstLetter":"x",
"id":"232703000000",
"jianpin":"xlq",
"level":3,
"name":"新林区",
"pid":"232700000000",
"pinyin":"xinlinqu"},
{
"firstLetter":"h",
"id":"232704000000",
"jianpin":"hzq",
"level":3,
"name":"呼中区",
"pid":"232700000000",
"pinyin":"huzhongqu"},
{
"firstLetter":"h",
"id":"232721000000",
"jianpin":"hmx",
"level":3,
"name":"呼玛县",
"pid":"232700000000",
"pinyin":"humaxian"},
{
"firstLetter":"t",
"id":"232722000000",
"jianpin":"thx",
"level":3,
"name":"塔河县",
"pid":"232700000000",
"pinyin":"tahexian"},
{
"firstLetter":"m",
"id":"232723000000",
"jianpin":"mhx",
"level":3,
"name":"漠河县",
"pid":"232700000000",
"pinyin":"mohexian"}]],



[
[{
"firstLetter":"h",
"id":"310101000000",
"jianpin":"hpq",
"level":3,
"name":"黄浦区",
"pid":"310100000000",
"pinyin":"huangpuqu"},
{
"firstLetter":"x",
"id":"310104000000",
"jianpin":"xhq",
"level":3,
"name":"徐汇区",
"pid":"310100000000",
"pinyin":"xuhuiqu"},
{
"firstLetter":"z",
"id":"310105000000",
"jianpin":"znq",
"level":3,
"name":"长宁区",
"pid":"310100000000",
"pinyin":"zhangningqu"},
{
"firstLetter":"j",
"id":"310106000000",
"jianpin":"jaq",
"level":3,
"name":"静安区",
"pid":"310100000000",
"pinyin":"jinganqu"},
{
"firstLetter":"p",
"id":"310107000000",
"jianpin":"ptq",
"level":3,
"name":"普陀区",
"pid":"310100000000",
"pinyin":"putuoqu"},
{
"firstLetter":"h",
"id":"310109000000",
"jianpin":"hkq",
"level":3,
"name":"虹口区",
"pid":"310100000000",
"pinyin":"hongkouqu"},
{
"firstLetter":"y",
"id":"310110000000",
"jianpin":"ypq",
"level":3,
"name":"杨浦区",
"pid":"310100000000",
"pinyin":"yangpuqu"},
{
"firstLetter":"m",
"id":"310112000000",
"jianpin":"mxq",
"level":3,
"name":"闵行区",
"pid":"310100000000",
"pinyin":"minxingqu"},
{
"firstLetter":"b",
"id":"310113000000",
"jianpin":"bsq",
"level":3,
"name":"宝山区",
"pid":"310100000000",
"pinyin":"baoshanqu"},
{
"firstLetter":"j",
"id":"310114000000",
"jianpin":"jdq",
"level":3,
"name":"嘉定区",
"pid":"310100000000",
"pinyin":"jiadingqu"},
{
"firstLetter":"p",
"id":"310115000000",
"jianpin":"pdxq",
"level":3,
"name":"浦东新区",
"pid":"310100000000",
"pinyin":"pudongxinqu"},
{
"firstLetter":"j",
"id":"310116000000",
"jianpin":"jsq",
"level":3,
"name":"金山区",
"pid":"310100000000",
"pinyin":"jinshanqu"},
{
"firstLetter":"s",
"id":"310117000000",
"jianpin":"sjq",
"level":3,
"name":"松江区",
"pid":"310100000000",
"pinyin":"songjiangqu"},
{
"firstLetter":"q",
"id":"310118000000",
"jianpin":"qpq",
"level":3,
"name":"青浦区",
"pid":"310100000000",
"pinyin":"qingpuqu"},
{
"firstLetter":"f",
"id":"310120000000",
"jianpin":"fxq",
"level":3,
"name":"奉贤区",
"pid":"310100000000",
"pinyin":"fengxianqu"},
{
"firstLetter":"c",
"id":"310151000000",
"jianpin":"cmq",
"level":3,
"name":"崇明区",
"pid":"310100000000",
"pinyin":"chongmingqu"}]],



[
[{
"firstLetter":"s",
"id":"320101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"320100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"320102000000",
"jianpin":"xwq",
"level":3,
"name":"玄武区",
"pid":"320100000000",
"pinyin":"xuanwuqu"},
{
"firstLetter":"q",
"id":"320104000000",
"jianpin":"qhq",
"level":3,
"name":"秦淮区",
"pid":"320100000000",
"pinyin":"qinhuaiqu"},
{
"firstLetter":"j",
"id":"320105000000",
"jianpin":"jyq",
"level":3,
"name":"建邺区",
"pid":"320100000000",
"pinyin":"jianyequ"},
{
"firstLetter":"g",
"id":"320106000000",
"jianpin":"glq",
"level":3,
"name":"鼓楼区",
"pid":"320100000000",
"pinyin":"gulouqu"},
{
"firstLetter":"p",
"id":"320111000000",
"jianpin":"pkq",
"level":3,
"name":"浦口区",
"pid":"320100000000",
"pinyin":"pukouqu"},
{
"firstLetter":"q",
"id":"320113000000",
"jianpin":"qxq",
"level":3,
"name":"栖霞区",
"pid":"320100000000",
"pinyin":"qixiaqu"},
{
"firstLetter":"y",
"id":"320114000000",
"jianpin":"yhtq",
"level":3,
"name":"雨花台区",
"pid":"320100000000",
"pinyin":"yuhuataiqu"},
{
"firstLetter":"j",
"id":"320115000000",
"jianpin":"jnq",
"level":3,
"name":"江宁区",
"pid":"320100000000",
"pinyin":"jiangningqu"},
{
"firstLetter":"l",
"id":"320116000000",
"jianpin":"lhq",
"level":3,
"name":"六合区",
"pid":"320100000000",
"pinyin":"liuhequ"},
{
"firstLetter":"l",
"id":"320117000000",
"jianpin":"lsq",
"level":3,
"name":"溧水区",
"pid":"320100000000",
"pinyin":"lishuiqu"},
{
"firstLetter":"g",
"id":"320118000000",
"jianpin":"gcq",
"level":3,
"name":"高淳区",
"pid":"320100000000",
"pinyin":"gaochunqu"}],

[{
"firstLetter":"s",
"id":"320201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"320200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"320205000000",
"jianpin":"xsq",
"level":3,
"name":"锡山区",
"pid":"320200000000",
"pinyin":"xishanqu"},
{
"firstLetter":"h",
"id":"320206000000",
"jianpin":"hsq",
"level":3,
"name":"惠山区",
"pid":"320200000000",
"pinyin":"huishanqu"},
{
"firstLetter":"b",
"id":"320211000000",
"jianpin":"bhq",
"level":3,
"name":"滨湖区",
"pid":"320200000000",
"pinyin":"binhuqu"},
{
"firstLetter":"l",
"id":"320213000000",
"jianpin":"lxq",
"level":3,
"name":"梁溪区",
"pid":"320200000000",
"pinyin":"liangxiqu"},
{
"firstLetter":"x",
"id":"320214000000",
"jianpin":"xwq",
"level":3,
"name":"新吴区",
"pid":"320200000000",
"pinyin":"xinwuqu"},
{
"firstLetter":"j",
"id":"320281000000",
"jianpin":"jys",
"level":3,
"name":"江阴市",
"pid":"320200000000",
"pinyin":"jiangyinshi"},
{
"firstLetter":"y",
"id":"320282000000",
"jianpin":"yxs",
"level":3,
"name":"宜兴市",
"pid":"320200000000",
"pinyin":"yixingshi"}],

[{
"firstLetter":"s",
"id":"320301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"320300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"g",
"id":"320302000000",
"jianpin":"glq",
"level":3,
"name":"鼓楼区",
"pid":"320300000000",
"pinyin":"gulouqu"},
{
"firstLetter":"y",
"id":"320303000000",
"jianpin":"ylq",
"level":3,
"name":"云龙区",
"pid":"320300000000",
"pinyin":"yunlongqu"},
{
"firstLetter":"j",
"id":"320305000000",
"jianpin":"jwq",
"level":3,
"name":"贾汪区",
"pid":"320300000000",
"pinyin":"jiawangqu"},
{
"firstLetter":"q",
"id":"320311000000",
"jianpin":"qsq",
"level":3,
"name":"泉山区",
"pid":"320300000000",
"pinyin":"quanshanqu"},
{
"firstLetter":"t",
"id":"320312000000",
"jianpin":"tsq",
"level":3,
"name":"铜山区",
"pid":"320300000000",
"pinyin":"tongshanqu"},
{
"firstLetter":"f",
"id":"320321000000",
"jianpin":"fx",
"level":3,
"name":"丰县",
"pid":"320300000000",
"pinyin":"fengxian"},
{
"firstLetter":"p",
"id":"320322000000",
"jianpin":"px",
"level":3,
"name":"沛县",
"pid":"320300000000",
"pinyin":"peixian"},
{
"firstLetter":"s",
"id":"320324000000",
"jianpin":"snx",
"level":3,
"name":"睢宁县",
"pid":"320300000000",
"pinyin":"suiningxian"},
{
"firstLetter":"x",
"id":"320371000000",
"jianpin":"xzjjjskfq",
"level":3,
"name":"徐州经济技术开发区",
"pid":"320300000000",
"pinyin":"xuzhoujingjijishukaifaqu"},
{
"firstLetter":"x",
"id":"320381000000",
"jianpin":"xys",
"level":3,
"name":"新沂市",
"pid":"320300000000",
"pinyin":"xinyishi"},
{
"firstLetter":"p",
"id":"320382000000",
"jianpin":"pzs",
"level":3,
"name":"邳州市",
"pid":"320300000000",
"pinyin":"pizhoushi"}],

[{
"firstLetter":"s",
"id":"320401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"320400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"t",
"id":"320402000000",
"jianpin":"tnq",
"level":3,
"name":"天宁区",
"pid":"320400000000",
"pinyin":"tianningqu"},
{
"firstLetter":"z",
"id":"320404000000",
"jianpin":"zlq",
"level":3,
"name":"钟楼区",
"pid":"320400000000",
"pinyin":"zhonglouqu"},
{
"firstLetter":"x",
"id":"320411000000",
"jianpin":"xbq",
"level":3,
"name":"新北区",
"pid":"320400000000",
"pinyin":"xinbeiqu"},
{
"firstLetter":"w",
"id":"320412000000",
"jianpin":"wjq",
"level":3,
"name":"武进区",
"pid":"320400000000",
"pinyin":"wujinqu"},
{
"firstLetter":"j",
"id":"320413000000",
"jianpin":"jtq",
"level":3,
"name":"金坛区",
"pid":"320400000000",
"pinyin":"jintanqu"},
{
"firstLetter":"l",
"id":"320481000000",
"jianpin":"lys",
"level":3,
"name":"溧阳市",
"pid":"320400000000",
"pinyin":"liyangshi"}],

[{
"firstLetter":"s",
"id":"320501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"320500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"320505000000",
"jianpin":"hqq",
"level":3,
"name":"虎丘区",
"pid":"320500000000",
"pinyin":"huqiuqu"},
{
"firstLetter":"w",
"id":"320506000000",
"jianpin":"wzq",
"level":3,
"name":"吴中区",
"pid":"320500000000",
"pinyin":"wuzhongqu"},
{
"firstLetter":"x",
"id":"320507000000",
"jianpin":"xcq",
"level":3,
"name":"相城区",
"pid":"320500000000",
"pinyin":"xiangchengqu"},
{
"firstLetter":"g",
"id":"320508000000",
"jianpin":"gsq",
"level":3,
"name":"姑苏区",
"pid":"320500000000",
"pinyin":"gusuqu"},
{
"firstLetter":"w",
"id":"320509000000",
"jianpin":"wjq",
"level":3,
"name":"吴江区",
"pid":"320500000000",
"pinyin":"wujiangqu"},
{
"firstLetter":"s",
"id":"320571000000",
"jianpin":"szgyyq",
"level":3,
"name":"苏州工业园区",
"pid":"320500000000",
"pinyin":"suzhougongyeyuanqu"},
{
"firstLetter":"c",
"id":"320581000000",
"jianpin":"css",
"level":3,
"name":"常熟市",
"pid":"320500000000",
"pinyin":"changshushi"},
{
"firstLetter":"z",
"id":"320582000000",
"jianpin":"zjgs",
"level":3,
"name":"张家港市",
"pid":"320500000000",
"pinyin":"zhangjiagangshi"},
{
"firstLetter":"k",
"id":"320583000000",
"jianpin":"kss",
"level":3,
"name":"昆山市",
"pid":"320500000000",
"pinyin":"kunshanshi"},
{
"firstLetter":"t",
"id":"320585000000",
"jianpin":"tcs",
"level":3,
"name":"太仓市",
"pid":"320500000000",
"pinyin":"taicangshi"}],

[{
"firstLetter":"s",
"id":"320601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"320600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"320602000000",
"jianpin":"ccq",
"level":3,
"name":"崇川区",
"pid":"320600000000",
"pinyin":"chongchuanqu"},
{
"firstLetter":"g",
"id":"320611000000",
"jianpin":"gzq",
"level":3,
"name":"港闸区",
"pid":"320600000000",
"pinyin":"gangzhaqu"},
{
"firstLetter":"t",
"id":"320612000000",
"jianpin":"tzq",
"level":3,
"name":"通州区",
"pid":"320600000000",
"pinyin":"tongzhouqu"},
{
"firstLetter":"h",
"id":"320621000000",
"jianpin":"hax",
"level":3,
"name":"海安县",
"pid":"320600000000",
"pinyin":"haianxian"},
{
"firstLetter":"r",
"id":"320623000000",
"jianpin":"rdx",
"level":3,
"name":"如东县",
"pid":"320600000000",
"pinyin":"rudongxian"},
{
"firstLetter":"n",
"id":"320671000000",
"jianpin":"ntjjjskfq",
"level":3,
"name":"南通经济技术开发区",
"pid":"320600000000",
"pinyin":"nantongjingjijishukaifaqu"},
{
"firstLetter":"q",
"id":"320681000000",
"jianpin":"qds",
"level":3,
"name":"启东市",
"pid":"320600000000",
"pinyin":"qidongshi"},
{
"firstLetter":"r",
"id":"320682000000",
"jianpin":"rgs",
"level":3,
"name":"如皋市",
"pid":"320600000000",
"pinyin":"rugaoshi"},
{
"firstLetter":"h",
"id":"320684000000",
"jianpin":"hms",
"level":3,
"name":"海门市",
"pid":"320600000000",
"pinyin":"haimenshi"}],

[{
"firstLetter":"s",
"id":"320701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"320700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"320703000000",
"jianpin":"lyq",
"level":3,
"name":"连云区",
"pid":"320700000000",
"pinyin":"lianyunqu"},
{
"firstLetter":"h",
"id":"320706000000",
"jianpin":"hzq",
"level":3,
"name":"海州区",
"pid":"320700000000",
"pinyin":"haizhouqu"},
{
"firstLetter":"g",
"id":"320707000000",
"jianpin":"gyq",
"level":3,
"name":"赣榆区",
"pid":"320700000000",
"pinyin":"ganyuqu"},
{
"firstLetter":"d",
"id":"320722000000",
"jianpin":"dhx",
"level":3,
"name":"东海县",
"pid":"320700000000",
"pinyin":"donghaixian"},
{
"firstLetter":"g",
"id":"320723000000",
"jianpin":"gyx",
"level":3,
"name":"灌云县",
"pid":"320700000000",
"pinyin":"guanyunxian"},
{
"firstLetter":"g",
"id":"320724000000",
"jianpin":"gnx",
"level":3,
"name":"灌南县",
"pid":"320700000000",
"pinyin":"guannanxian"},
{
"firstLetter":"l",
"id":"320771000000",
"jianpin":"lygjjjskfq",
"level":3,
"name":"连云港经济技术开发区",
"pid":"320700000000",
"pinyin":"lianyungangjingjijishukaifaqu"},
{
"firstLetter":"l",
"id":"320772000000",
"jianpin":"lyggxjscykfq",
"level":3,
"name":"连云港高新技术产业开发区",
"pid":"320700000000",
"pinyin":"lianyunganggaoxinjishuchanyekaifaqu"}],

[{
"firstLetter":"s",
"id":"320801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"320800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"320803000000",
"jianpin":"haq",
"level":3,
"name":"淮安区",
"pid":"320800000000",
"pinyin":"huaianqu"},
{
"firstLetter":"h",
"id":"320804000000",
"jianpin":"hyq",
"level":3,
"name":"淮阴区",
"pid":"320800000000",
"pinyin":"huaiyinqu"},
{
"firstLetter":"q",
"id":"320812000000",
"jianpin":"qjpq",
"level":3,
"name":"清江浦区",
"pid":"320800000000",
"pinyin":"qingjiangpuqu"},
{
"firstLetter":"h",
"id":"320813000000",
"jianpin":"hzq",
"level":3,
"name":"洪泽区",
"pid":"320800000000",
"pinyin":"hongzequ"},
{
"firstLetter":"l",
"id":"320826000000",
"jianpin":"lsx",
"level":3,
"name":"涟水县",
"pid":"320800000000",
"pinyin":"lianshuixian"},
{
"firstLetter":"x",
"id":"320830000000",
"jianpin":"xyx",
"level":3,
"name":"盱眙县",
"pid":"320800000000",
"pinyin":"xuyixian"},
{
"firstLetter":"j",
"id":"320831000000",
"jianpin":"jhx",
"level":3,
"name":"金湖县",
"pid":"320800000000",
"pinyin":"jinhuxian"},
{
"firstLetter":"h",
"id":"320871000000",
"jianpin":"hajjjskfq",
"level":3,
"name":"淮安经济技术开发区",
"pid":"320800000000",
"pinyin":"huaianjingjijishukaifaqu"}],

[{
"firstLetter":"s",
"id":"320901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"320900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"t",
"id":"320902000000",
"jianpin":"thq",
"level":3,
"name":"亭湖区",
"pid":"320900000000",
"pinyin":"tinghuqu"},
{
"firstLetter":"y",
"id":"320903000000",
"jianpin":"ydq",
"level":3,
"name":"盐都区",
"pid":"320900000000",
"pinyin":"yandouqu"},
{
"firstLetter":"d",
"id":"320904000000",
"jianpin":"dfq",
"level":3,
"name":"大丰区",
"pid":"320900000000",
"pinyin":"dafengqu"},
{
"firstLetter":"x",
"id":"320921000000",
"jianpin":"xsx",
"level":3,
"name":"响水县",
"pid":"320900000000",
"pinyin":"xiangshuixian"},
{
"firstLetter":"b",
"id":"320922000000",
"jianpin":"bhx",
"level":3,
"name":"滨海县",
"pid":"320900000000",
"pinyin":"binhaixian"},
{
"firstLetter":"f",
"id":"320923000000",
"jianpin":"fnx",
"level":3,
"name":"阜宁县",
"pid":"320900000000",
"pinyin":"funingxian"},
{
"firstLetter":"s",
"id":"320924000000",
"jianpin":"syx",
"level":3,
"name":"射阳县",
"pid":"320900000000",
"pinyin":"sheyangxian"},
{
"firstLetter":"j",
"id":"320925000000",
"jianpin":"jhx",
"level":3,
"name":"建湖县",
"pid":"320900000000",
"pinyin":"jianhuxian"},
{
"firstLetter":"y",
"id":"320971000000",
"jianpin":"ycjjjskfq",
"level":3,
"name":"盐城经济技术开发区",
"pid":"320900000000",
"pinyin":"yanchengjingjijishukaifaqu"},
{
"firstLetter":"d",
"id":"320981000000",
"jianpin":"dts",
"level":3,
"name":"东台市",
"pid":"320900000000",
"pinyin":"dongtaishi"}],

[{
"firstLetter":"s",
"id":"321001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"321000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"g",
"id":"321002000000",
"jianpin":"glq",
"level":3,
"name":"广陵区",
"pid":"321000000000",
"pinyin":"guanglingqu"},
{
"firstLetter":"h",
"id":"321003000000",
"jianpin":"hjq",
"level":3,
"name":"邗江区",
"pid":"321000000000",
"pinyin":"hanjiangqu"},
{
"firstLetter":"j",
"id":"321012000000",
"jianpin":"jdq",
"level":3,
"name":"江都区",
"pid":"321000000000",
"pinyin":"jiangdouqu"},
{
"firstLetter":"b",
"id":"321023000000",
"jianpin":"byx",
"level":3,
"name":"宝应县",
"pid":"321000000000",
"pinyin":"baoyingxian"},
{
"firstLetter":"y",
"id":"321071000000",
"jianpin":"yzjjjskfq",
"level":3,
"name":"扬州经济技术开发区",
"pid":"321000000000",
"pinyin":"yangzhoujingjijishukaifaqu"},
{
"firstLetter":"y",
"id":"321081000000",
"jianpin":"yzs",
"level":3,
"name":"仪征市",
"pid":"321000000000",
"pinyin":"yizhengshi"},
{
"firstLetter":"g",
"id":"321084000000",
"jianpin":"gys",
"level":3,
"name":"高邮市",
"pid":"321000000000",
"pinyin":"gaoyoushi"}],

[{
"firstLetter":"s",
"id":"321101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"321100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"321102000000",
"jianpin":"jkq",
"level":3,
"name":"京口区",
"pid":"321100000000",
"pinyin":"jingkouqu"},
{
"firstLetter":"r",
"id":"321111000000",
"jianpin":"rzq",
"level":3,
"name":"润州区",
"pid":"321100000000",
"pinyin":"runzhouqu"},
{
"firstLetter":"d",
"id":"321112000000",
"jianpin":"dtq",
"level":3,
"name":"丹徒区",
"pid":"321100000000",
"pinyin":"dantuqu"},
{
"firstLetter":"z",
"id":"321171000000",
"jianpin":"zjxq",
"level":3,
"name":"镇江新区",
"pid":"321100000000",
"pinyin":"zhenjiangxinqu"},
{
"firstLetter":"d",
"id":"321181000000",
"jianpin":"dys",
"level":3,
"name":"丹阳市",
"pid":"321100000000",
"pinyin":"danyangshi"},
{
"firstLetter":"y",
"id":"321182000000",
"jianpin":"yzs",
"level":3,
"name":"扬中市",
"pid":"321100000000",
"pinyin":"yangzhongshi"},
{
"firstLetter":"j",
"id":"321183000000",
"jianpin":"jrs",
"level":3,
"name":"句容市",
"pid":"321100000000",
"pinyin":"jurongshi"}],

[{
"firstLetter":"s",
"id":"321201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"321200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"321202000000",
"jianpin":"hlq",
"level":3,
"name":"海陵区",
"pid":"321200000000",
"pinyin":"hailingqu"},
{
"firstLetter":"g",
"id":"321203000000",
"jianpin":"ggq",
"level":3,
"name":"高港区",
"pid":"321200000000",
"pinyin":"gaogangqu"},
{
"firstLetter":"j",
"id":"321204000000",
"jianpin":"jyq",
"level":3,
"name":"姜堰区",
"pid":"321200000000",
"pinyin":"jiangyanqu"},
{
"firstLetter":"t",
"id":"321271000000",
"jianpin":"tzyygxjscykfq",
"level":3,
"name":"泰州医药高新技术产业开发区",
"pid":"321200000000",
"pinyin":"taizhouyiyaogaoxinjishuchanyekaifaqu"},
{
"firstLetter":"x",
"id":"321281000000",
"jianpin":"xhs",
"level":3,
"name":"兴化市",
"pid":"321200000000",
"pinyin":"xinghuashi"},
{
"firstLetter":"j",
"id":"321282000000",
"jianpin":"jjs",
"level":3,
"name":"靖江市",
"pid":"321200000000",
"pinyin":"jingjiangshi"},
{
"firstLetter":"t",
"id":"321283000000",
"jianpin":"txs",
"level":3,
"name":"泰兴市",
"pid":"321200000000",
"pinyin":"taixingshi"}],

[{
"firstLetter":"s",
"id":"321301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"321300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"321302000000",
"jianpin":"scq",
"level":3,
"name":"宿城区",
"pid":"321300000000",
"pinyin":"suchengqu"},
{
"firstLetter":"s",
"id":"321311000000",
"jianpin":"syq",
"level":3,
"name":"宿豫区",
"pid":"321300000000",
"pinyin":"suyuqu"},
{
"firstLetter":"s",
"id":"321322000000",
"jianpin":"syx",
"level":3,
"name":"沭阳县",
"pid":"321300000000",
"pinyin":"shuyangxian"},
{
"firstLetter":"s",
"id":"321323000000",
"jianpin":"syx",
"level":3,
"name":"泗阳县",
"pid":"321300000000",
"pinyin":"siyangxian"},
{
"firstLetter":"s",
"id":"321324000000",
"jianpin":"shx",
"level":3,
"name":"泗洪县",
"pid":"321300000000",
"pinyin":"sihongxian"},
{
"firstLetter":"s",
"id":"321371000000",
"jianpin":"sqjjjskfq",
"level":3,
"name":"宿迁经济技术开发区",
"pid":"321300000000",
"pinyin":"suqianjingjijishukaifaqu"}]],



[
[{
"firstLetter":"s",
"id":"330101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"330100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"330102000000",
"jianpin":"scq",
"level":3,
"name":"上城区",
"pid":"330100000000",
"pinyin":"shangchengqu"},
{
"firstLetter":"x",
"id":"330103000000",
"jianpin":"xcq",
"level":3,
"name":"下城区",
"pid":"330100000000",
"pinyin":"xiachengqu"},
{
"firstLetter":"j",
"id":"330104000000",
"jianpin":"jgq",
"level":3,
"name":"江干区",
"pid":"330100000000",
"pinyin":"jiangganqu"},
{
"firstLetter":"g",
"id":"330105000000",
"jianpin":"gsq",
"level":3,
"name":"拱墅区",
"pid":"330100000000",
"pinyin":"gongshuqu"},
{
"firstLetter":"x",
"id":"330106000000",
"jianpin":"xhq",
"level":3,
"name":"西湖区",
"pid":"330100000000",
"pinyin":"xihuqu"},
{
"firstLetter":"b",
"id":"330108000000",
"jianpin":"bjq",
"level":3,
"name":"滨江区",
"pid":"330100000000",
"pinyin":"binjiangqu"},
{
"firstLetter":"x",
"id":"330109000000",
"jianpin":"xsq",
"level":3,
"name":"萧山区",
"pid":"330100000000",
"pinyin":"xiaoshanqu"},
{
"firstLetter":"y",
"id":"330110000000",
"jianpin":"yhq",
"level":3,
"name":"余杭区",
"pid":"330100000000",
"pinyin":"yuhangqu"},
{
"firstLetter":"f",
"id":"330111000000",
"jianpin":"fyq",
"level":3,
"name":"富阳区",
"pid":"330100000000",
"pinyin":"fuyangqu"},
{
"firstLetter":"l",
"id":"330112000000",
"jianpin":"laq",
"level":3,
"name":"临安区",
"pid":"330100000000",
"pinyin":"linanqu"},
{
"firstLetter":"t",
"id":"330122000000",
"jianpin":"tlx",
"level":3,
"name":"桐庐县",
"pid":"330100000000",
"pinyin":"tongluxian"},
{
"firstLetter":"c",
"id":"330127000000",
"jianpin":"cax",
"level":3,
"name":"淳安县",
"pid":"330100000000",
"pinyin":"chunanxian"},
{
"firstLetter":"j",
"id":"330182000000",
"jianpin":"jds",
"level":3,
"name":"建德市",
"pid":"330100000000",
"pinyin":"jiandeshi"}],

[{
"firstLetter":"s",
"id":"330201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"330200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"330203000000",
"jianpin":"hsq",
"level":3,
"name":"海曙区",
"pid":"330200000000",
"pinyin":"haishuqu"},
{
"firstLetter":"j",
"id":"330205000000",
"jianpin":"jbq",
"level":3,
"name":"江北区",
"pid":"330200000000",
"pinyin":"jiangbeiqu"},
{
"firstLetter":"b",
"id":"330206000000",
"jianpin":"blq",
"level":3,
"name":"北仑区",
"pid":"330200000000",
"pinyin":"beilunqu"},
{
"firstLetter":"z",
"id":"330211000000",
"jianpin":"zhq",
"level":3,
"name":"镇海区",
"pid":"330200000000",
"pinyin":"zhenhaiqu"},
{
"firstLetter":"y",
"id":"330212000000",
"jianpin":"yzq",
"level":3,
"name":"鄞州区",
"pid":"330200000000",
"pinyin":"yinzhouqu"},
{
"firstLetter":"f",
"id":"330213000000",
"jianpin":"fhq",
"level":3,
"name":"奉化区",
"pid":"330200000000",
"pinyin":"fenghuaqu"},
{
"firstLetter":"x",
"id":"330225000000",
"jianpin":"xsx",
"level":3,
"name":"象山县",
"pid":"330200000000",
"pinyin":"xiangshanxian"},
{
"firstLetter":"n",
"id":"330226000000",
"jianpin":"nhx",
"level":3,
"name":"宁海县",
"pid":"330200000000",
"pinyin":"ninghaixian"},
{
"firstLetter":"y",
"id":"330281000000",
"jianpin":"yys",
"level":3,
"name":"余姚市",
"pid":"330200000000",
"pinyin":"yuyaoshi"},
{
"firstLetter":"c",
"id":"330282000000",
"jianpin":"cxs",
"level":3,
"name":"慈溪市",
"pid":"330200000000",
"pinyin":"cixishi"}],

[{
"firstLetter":"s",
"id":"330301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"330300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"330302000000",
"jianpin":"lcq",
"level":3,
"name":"鹿城区",
"pid":"330300000000",
"pinyin":"luchengqu"},
{
"firstLetter":"l",
"id":"330303000000",
"jianpin":"lwq",
"level":3,
"name":"龙湾区",
"pid":"330300000000",
"pinyin":"longwanqu"},
{
"firstLetter":"o",
"id":"330304000000",
"jianpin":"ohq",
"level":3,
"name":"瓯海区",
"pid":"330300000000",
"pinyin":"ouhaiqu"},
{
"firstLetter":"d",
"id":"330305000000",
"jianpin":"dtq",
"level":3,
"name":"洞头区",
"pid":"330300000000",
"pinyin":"dongtouqu"},
{
"firstLetter":"y",
"id":"330324000000",
"jianpin":"yjx",
"level":3,
"name":"永嘉县",
"pid":"330300000000",
"pinyin":"yongjiaxian"},
{
"firstLetter":"p",
"id":"330326000000",
"jianpin":"pyx",
"level":3,
"name":"平阳县",
"pid":"330300000000",
"pinyin":"pingyangxian"},
{
"firstLetter":"c",
"id":"330327000000",
"jianpin":"cnx",
"level":3,
"name":"苍南县",
"pid":"330300000000",
"pinyin":"cangnanxian"},
{
"firstLetter":"w",
"id":"330328000000",
"jianpin":"wcx",
"level":3,
"name":"文成县",
"pid":"330300000000",
"pinyin":"wenchengxian"},
{
"firstLetter":"t",
"id":"330329000000",
"jianpin":"tsx",
"level":3,
"name":"泰顺县",
"pid":"330300000000",
"pinyin":"taishunxian"},
{
"firstLetter":"w",
"id":"330371000000",
"jianpin":"wzjjjskfq",
"level":3,
"name":"温州经济技术开发区",
"pid":"330300000000",
"pinyin":"wenzhoujingjijishukaifaqu"},
{
"firstLetter":"r",
"id":"330381000000",
"jianpin":"ras",
"level":3,
"name":"瑞安市",
"pid":"330300000000",
"pinyin":"ruianshi"},
{
"firstLetter":"l",
"id":"330382000000",
"jianpin":"lqs",
"level":3,
"name":"乐清市",
"pid":"330300000000",
"pinyin":"leqingshi"}],

[{
"firstLetter":"s",
"id":"330401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"330400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"n",
"id":"330402000000",
"jianpin":"nhq",
"level":3,
"name":"南湖区",
"pid":"330400000000",
"pinyin":"nanhuqu"},
{
"firstLetter":"x",
"id":"330411000000",
"jianpin":"xzq",
"level":3,
"name":"秀洲区",
"pid":"330400000000",
"pinyin":"xiuzhouqu"},
{
"firstLetter":"j",
"id":"330421000000",
"jianpin":"jsx",
"level":3,
"name":"嘉善县",
"pid":"330400000000",
"pinyin":"jiashanxian"},
{
"firstLetter":"h",
"id":"330424000000",
"jianpin":"hyx",
"level":3,
"name":"海盐县",
"pid":"330400000000",
"pinyin":"haiyanxian"},
{
"firstLetter":"h",
"id":"330481000000",
"jianpin":"hns",
"level":3,
"name":"海宁市",
"pid":"330400000000",
"pinyin":"hainingshi"},
{
"firstLetter":"p",
"id":"330482000000",
"jianpin":"phs",
"level":3,
"name":"平湖市",
"pid":"330400000000",
"pinyin":"pinghushi"},
{
"firstLetter":"t",
"id":"330483000000",
"jianpin":"txs",
"level":3,
"name":"桐乡市",
"pid":"330400000000",
"pinyin":"tongxiangshi"}],

[{
"firstLetter":"s",
"id":"330501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"330500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"330502000000",
"jianpin":"wxq",
"level":3,
"name":"吴兴区",
"pid":"330500000000",
"pinyin":"wuxingqu"},
{
"firstLetter":"n",
"id":"330503000000",
"jianpin":"nxq",
"level":3,
"name":"南浔区",
"pid":"330500000000",
"pinyin":"nanxunqu"},
{
"firstLetter":"d",
"id":"330521000000",
"jianpin":"dqx",
"level":3,
"name":"德清县",
"pid":"330500000000",
"pinyin":"deqingxian"},
{
"firstLetter":"z",
"id":"330522000000",
"jianpin":"zxx",
"level":3,
"name":"长兴县",
"pid":"330500000000",
"pinyin":"zhangxingxian"},
{
"firstLetter":"a",
"id":"330523000000",
"jianpin":"ajx",
"level":3,
"name":"安吉县",
"pid":"330500000000",
"pinyin":"anjixian"}],

[{
"firstLetter":"s",
"id":"330601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"330600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"330602000000",
"jianpin":"ycq",
"level":3,
"name":"越城区",
"pid":"330600000000",
"pinyin":"yuechengqu"},
{
"firstLetter":"k",
"id":"330603000000",
"jianpin":"kqq",
"level":3,
"name":"柯桥区",
"pid":"330600000000",
"pinyin":"keqiaoqu"},
{
"firstLetter":"s",
"id":"330604000000",
"jianpin":"syq",
"level":3,
"name":"上虞区",
"pid":"330600000000",
"pinyin":"shangyuqu"},
{
"firstLetter":"x",
"id":"330624000000",
"jianpin":"xcx",
"level":3,
"name":"新昌县",
"pid":"330600000000",
"pinyin":"xinchangxian"},
{
"firstLetter":"z",
"id":"330681000000",
"jianpin":"zjs",
"level":3,
"name":"诸暨市",
"pid":"330600000000",
"pinyin":"zhujishi"},
{
"firstLetter":"s",
"id":"330683000000",
"jianpin":"szs",
"level":3,
"name":"嵊州市",
"pid":"330600000000",
"pinyin":"shengzhoushi"}],

[{
"firstLetter":"s",
"id":"330701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"330700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"330702000000",
"jianpin":"wcq",
"level":3,
"name":"婺城区",
"pid":"330700000000",
"pinyin":"wuchengqu"},
{
"firstLetter":"j",
"id":"330703000000",
"jianpin":"jdq",
"level":3,
"name":"金东区",
"pid":"330700000000",
"pinyin":"jindongqu"},
{
"firstLetter":"w",
"id":"330723000000",
"jianpin":"wyx",
"level":3,
"name":"武义县",
"pid":"330700000000",
"pinyin":"wuyixian"},
{
"firstLetter":"p",
"id":"330726000000",
"jianpin":"pjx",
"level":3,
"name":"浦江县",
"pid":"330700000000",
"pinyin":"pujiangxian"},
{
"firstLetter":"p",
"id":"330727000000",
"jianpin":"pax",
"level":3,
"name":"磐安县",
"pid":"330700000000",
"pinyin":"pananxian"},
{
"firstLetter":"l",
"id":"330781000000",
"jianpin":"lxs",
"level":3,
"name":"兰溪市",
"pid":"330700000000",
"pinyin":"lanxishi"},
{
"firstLetter":"y",
"id":"330782000000",
"jianpin":"yws",
"level":3,
"name":"义乌市",
"pid":"330700000000",
"pinyin":"yiwushi"},
{
"firstLetter":"d",
"id":"330783000000",
"jianpin":"dys",
"level":3,
"name":"东阳市",
"pid":"330700000000",
"pinyin":"dongyangshi"},
{
"firstLetter":"y",
"id":"330784000000",
"jianpin":"yks",
"level":3,
"name":"永康市",
"pid":"330700000000",
"pinyin":"yongkangshi"}],

[{
"firstLetter":"s",
"id":"330801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"330800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"k",
"id":"330802000000",
"jianpin":"kcq",
"level":3,
"name":"柯城区",
"pid":"330800000000",
"pinyin":"kechengqu"},
{
"firstLetter":"q",
"id":"330803000000",
"jianpin":"qjq",
"level":3,
"name":"衢江区",
"pid":"330800000000",
"pinyin":"qujiangqu"},
{
"firstLetter":"c",
"id":"330822000000",
"jianpin":"csx",
"level":3,
"name":"常山县",
"pid":"330800000000",
"pinyin":"changshanxian"},
{
"firstLetter":"k",
"id":"330824000000",
"jianpin":"khx",
"level":3,
"name":"开化县",
"pid":"330800000000",
"pinyin":"kaihuaxian"},
{
"firstLetter":"l",
"id":"330825000000",
"jianpin":"lyx",
"level":3,
"name":"龙游县",
"pid":"330800000000",
"pinyin":"longyouxian"},
{
"firstLetter":"j",
"id":"330881000000",
"jianpin":"jss",
"level":3,
"name":"江山市",
"pid":"330800000000",
"pinyin":"jiangshanshi"}],

[{
"firstLetter":"s",
"id":"330901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"330900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"330902000000",
"jianpin":"dhq",
"level":3,
"name":"定海区",
"pid":"330900000000",
"pinyin":"dinghaiqu"},
{
"firstLetter":"p",
"id":"330903000000",
"jianpin":"ptq",
"level":3,
"name":"普陀区",
"pid":"330900000000",
"pinyin":"putuoqu"},
{
"firstLetter":"d",
"id":"330921000000",
"jianpin":"dsx",
"level":3,
"name":"岱山县",
"pid":"330900000000",
"pinyin":"daishanxian"},
{
"firstLetter":"s",
"id":"330922000000",
"jianpin":"ssx",
"level":3,
"name":"嵊泗县",
"pid":"330900000000",
"pinyin":"shengsixian"}],

[{
"firstLetter":"s",
"id":"331001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"331000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"331002000000",
"jianpin":"jjq",
"level":3,
"name":"椒江区",
"pid":"331000000000",
"pinyin":"jiaojiangqu"},
{
"firstLetter":"h",
"id":"331003000000",
"jianpin":"hyq",
"level":3,
"name":"黄岩区",
"pid":"331000000000",
"pinyin":"huangyanqu"},
{
"firstLetter":"l",
"id":"331004000000",
"jianpin":"lqq",
"level":3,
"name":"路桥区",
"pid":"331000000000",
"pinyin":"luqiaoqu"},
{
"firstLetter":"s",
"id":"331022000000",
"jianpin":"smx",
"level":3,
"name":"三门县",
"pid":"331000000000",
"pinyin":"sanmenxian"},
{
"firstLetter":"t",
"id":"331023000000",
"jianpin":"ttx",
"level":3,
"name":"天台县",
"pid":"331000000000",
"pinyin":"tiantaixian"},
{
"firstLetter":"x",
"id":"331024000000",
"jianpin":"xjx",
"level":3,
"name":"仙居县",
"pid":"331000000000",
"pinyin":"xianjuxian"},
{
"firstLetter":"w",
"id":"331081000000",
"jianpin":"wls",
"level":3,
"name":"温岭市",
"pid":"331000000000",
"pinyin":"wenlingshi"},
{
"firstLetter":"l",
"id":"331082000000",
"jianpin":"lhs",
"level":3,
"name":"临海市",
"pid":"331000000000",
"pinyin":"linhaishi"},
{
"firstLetter":"y",
"id":"331083000000",
"jianpin":"yhs",
"level":3,
"name":"玉环市",
"pid":"331000000000",
"pinyin":"yuhuanshi"}],

[{
"firstLetter":"s",
"id":"331101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"331100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"331102000000",
"jianpin":"ldq",
"level":3,
"name":"莲都区",
"pid":"331100000000",
"pinyin":"liandouqu"},
{
"firstLetter":"q",
"id":"331121000000",
"jianpin":"qtx",
"level":3,
"name":"青田县",
"pid":"331100000000",
"pinyin":"qingtianxian"},
{
"firstLetter":"j",
"id":"331122000000",
"jianpin":"jyx",
"level":3,
"name":"缙云县",
"pid":"331100000000",
"pinyin":"jinyunxian"},
{
"firstLetter":"s",
"id":"331123000000",
"jianpin":"scx",
"level":3,
"name":"遂昌县",
"pid":"331100000000",
"pinyin":"suichangxian"},
{
"firstLetter":"s",
"id":"331124000000",
"jianpin":"syx",
"level":3,
"name":"松阳县",
"pid":"331100000000",
"pinyin":"songyangxian"},
{
"firstLetter":"y",
"id":"331125000000",
"jianpin":"yhx",
"level":3,
"name":"云和县",
"pid":"331100000000",
"pinyin":"yunhexian"},
{
"firstLetter":"q",
"id":"331126000000",
"jianpin":"qyx",
"level":3,
"name":"庆元县",
"pid":"331100000000",
"pinyin":"qingyuanxian"},
{
"firstLetter":"j",
"id":"331127000000",
"jianpin":"jnszzzx",
"level":3,
"name":"景宁畲族自治县",
"pid":"331100000000",
"pinyin":"jingningshezuzizhixian"},
{
"firstLetter":"l",
"id":"331181000000",
"jianpin":"lqs",
"level":3,
"name":"龙泉市",
"pid":"331100000000",
"pinyin":"longquanshi"}]],



[
[{
"firstLetter":"s",
"id":"340101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"340100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"340102000000",
"jianpin":"yhq",
"level":3,
"name":"瑶海区",
"pid":"340100000000",
"pinyin":"yaohaiqu"},
{
"firstLetter":"l",
"id":"340103000000",
"jianpin":"lyq",
"level":3,
"name":"庐阳区",
"pid":"340100000000",
"pinyin":"luyangqu"},
{
"firstLetter":"s",
"id":"340104000000",
"jianpin":"ssq",
"level":3,
"name":"蜀山区",
"pid":"340100000000",
"pinyin":"shushanqu"},
{
"firstLetter":"b",
"id":"340111000000",
"jianpin":"bhq",
"level":3,
"name":"包河区",
"pid":"340100000000",
"pinyin":"baohequ"},
{
"firstLetter":"z",
"id":"340121000000",
"jianpin":"zfx",
"level":3,
"name":"长丰县",
"pid":"340100000000",
"pinyin":"zhangfengxian"},
{
"firstLetter":"f",
"id":"340122000000",
"jianpin":"fdx",
"level":3,
"name":"肥东县",
"pid":"340100000000",
"pinyin":"feidongxian"},
{
"firstLetter":"f",
"id":"340123000000",
"jianpin":"fxx",
"level":3,
"name":"肥西县",
"pid":"340100000000",
"pinyin":"feixixian"},
{
"firstLetter":"l",
"id":"340124000000",
"jianpin":"ljx",
"level":3,
"name":"庐江县",
"pid":"340100000000",
"pinyin":"lujiangxian"},
{
"firstLetter":"h",
"id":"340171000000",
"jianpin":"hfgxjscykfq",
"level":3,
"name":"合肥高新技术产业开发区",
"pid":"340100000000",
"pinyin":"hefeigaoxinjishuchanyekaifaqu"},
{
"firstLetter":"h",
"id":"340172000000",
"jianpin":"hfjjjskfq",
"level":3,
"name":"合肥经济技术开发区",
"pid":"340100000000",
"pinyin":"hefeijingjijishukaifaqu"},
{
"firstLetter":"h",
"id":"340173000000",
"jianpin":"hfxzgxjscykfq",
"level":3,
"name":"合肥新站高新技术产业开发区",
"pid":"340100000000",
"pinyin":"hefeixinzhangaoxinjishuchanyekaifaqu"},
{
"firstLetter":"c",
"id":"340181000000",
"jianpin":"chs",
"level":3,
"name":"巢湖市",
"pid":"340100000000",
"pinyin":"chaohushi"}],

[{
"firstLetter":"s",
"id":"340201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"340200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"340202000000",
"jianpin":"jhq",
"level":3,
"name":"镜湖区",
"pid":"340200000000",
"pinyin":"jinghuqu"},
{
"firstLetter":"y",
"id":"340203000000",
"jianpin":"yjq",
"level":3,
"name":"弋江区",
"pid":"340200000000",
"pinyin":"yijiangqu"},
{
"firstLetter":"j",
"id":"340207000000",
"jianpin":"jjq",
"level":3,
"name":"鸠江区",
"pid":"340200000000",
"pinyin":"jiujiangqu"},
{
"firstLetter":"s",
"id":"340208000000",
"jianpin":"ssq",
"level":3,
"name":"三山区",
"pid":"340200000000",
"pinyin":"sanshanqu"},
{
"firstLetter":"w",
"id":"340221000000",
"jianpin":"whx",
"level":3,
"name":"芜湖县",
"pid":"340200000000",
"pinyin":"wuhuxian"},
{
"firstLetter":"f",
"id":"340222000000",
"jianpin":"fcx",
"level":3,
"name":"繁昌县",
"pid":"340200000000",
"pinyin":"fanchangxian"},
{
"firstLetter":"n",
"id":"340223000000",
"jianpin":"nlx",
"level":3,
"name":"南陵县",
"pid":"340200000000",
"pinyin":"nanlingxian"},
{
"firstLetter":"w",
"id":"340225000000",
"jianpin":"wwx",
"level":3,
"name":"无为县",
"pid":"340200000000",
"pinyin":"wuweixian"},
{
"firstLetter":"w",
"id":"340271000000",
"jianpin":"whjjjskfq",
"level":3,
"name":"芜湖经济技术开发区",
"pid":"340200000000",
"pinyin":"wuhujingjijishukaifaqu"},
{
"firstLetter":"a",
"id":"340272000000",
"jianpin":"ahwhzjdqjjkfq",
"level":3,
"name":"安徽芜湖长江大桥经济开发区",
"pid":"340200000000",
"pinyin":"anhuiwuhuzhangjiangdaqiaojingjikaifaqu"}],

[{
"firstLetter":"s",
"id":"340301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"340300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"340302000000",
"jianpin":"lzhq",
"level":3,
"name":"龙子湖区",
"pid":"340300000000",
"pinyin":"longzihuqu"},
{
"firstLetter":"b",
"id":"340303000000",
"jianpin":"bsq",
"level":3,
"name":"蚌山区",
"pid":"340300000000",
"pinyin":"bangshanqu"},
{
"firstLetter":"y",
"id":"340304000000",
"jianpin":"yhq",
"level":3,
"name":"禹会区",
"pid":"340300000000",
"pinyin":"yuhuiqu"},
{
"firstLetter":"h",
"id":"340311000000",
"jianpin":"hsq",
"level":3,
"name":"淮上区",
"pid":"340300000000",
"pinyin":"huaishangqu"},
{
"firstLetter":"h",
"id":"340321000000",
"jianpin":"hyx",
"level":3,
"name":"怀远县",
"pid":"340300000000",
"pinyin":"huaiyuanxian"},
{
"firstLetter":"w",
"id":"340322000000",
"jianpin":"whx",
"level":3,
"name":"五河县",
"pid":"340300000000",
"pinyin":"wuhexian"},
{
"firstLetter":"g",
"id":"340323000000",
"jianpin":"gzx",
"level":3,
"name":"固镇县",
"pid":"340300000000",
"pinyin":"guzhenxian"},
{
"firstLetter":"b",
"id":"340371000000",
"jianpin":"bbsgxjskfq",
"level":3,
"name":"蚌埠市高新技术开发区",
"pid":"340300000000",
"pinyin":"bangbushigaoxinjishukaifaqu"},
{
"firstLetter":"b",
"id":"340372000000",
"jianpin":"bbsjjkfq",
"level":3,
"name":"蚌埠市经济开发区",
"pid":"340300000000",
"pinyin":"bangbushijingjikaifaqu"}],

[{
"firstLetter":"s",
"id":"340401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"340400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"340402000000",
"jianpin":"dtq",
"level":3,
"name":"大通区",
"pid":"340400000000",
"pinyin":"datongqu"},
{
"firstLetter":"t",
"id":"340403000000",
"jianpin":"tjaq",
"level":3,
"name":"田家庵区",
"pid":"340400000000",
"pinyin":"tianjiaanqu"},
{
"firstLetter":"x",
"id":"340404000000",
"jianpin":"xjjq",
"level":3,
"name":"谢家集区",
"pid":"340400000000",
"pinyin":"xiejiajiqu"},
{
"firstLetter":"b",
"id":"340405000000",
"jianpin":"bgsq",
"level":3,
"name":"八公山区",
"pid":"340400000000",
"pinyin":"bagongshanqu"},
{
"firstLetter":"p",
"id":"340406000000",
"jianpin":"pjq",
"level":3,
"name":"潘集区",
"pid":"340400000000",
"pinyin":"panjiqu"},
{
"firstLetter":"f",
"id":"340421000000",
"jianpin":"ftx",
"level":3,
"name":"凤台县",
"pid":"340400000000",
"pinyin":"fengtaixian"},
{
"firstLetter":"s",
"id":"340422000000",
"jianpin":"sx",
"level":3,
"name":"寿县",
"pid":"340400000000",
"pinyin":"shouxian"}],

[{
"firstLetter":"s",
"id":"340501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"340500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"340503000000",
"jianpin":"hsq",
"level":3,
"name":"花山区",
"pid":"340500000000",
"pinyin":"huashanqu"},
{
"firstLetter":"y",
"id":"340504000000",
"jianpin":"ysq",
"level":3,
"name":"雨山区",
"pid":"340500000000",
"pinyin":"yushanqu"},
{
"firstLetter":"b",
"id":"340506000000",
"jianpin":"bwq",
"level":3,
"name":"博望区",
"pid":"340500000000",
"pinyin":"bowangqu"},
{
"firstLetter":"d",
"id":"340521000000",
"jianpin":"dtx",
"level":3,
"name":"当涂县",
"pid":"340500000000",
"pinyin":"dangtuxian"},
{
"firstLetter":"h",
"id":"340522000000",
"jianpin":"hsx",
"level":3,
"name":"含山县",
"pid":"340500000000",
"pinyin":"hanshanxian"},
{
"firstLetter":"h",
"id":"340523000000",
"jianpin":"hx",
"level":3,
"name":"和县",
"pid":"340500000000",
"pinyin":"hexian"}],

[{
"firstLetter":"s",
"id":"340601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"340600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"340602000000",
"jianpin":"djq",
"level":3,
"name":"杜集区",
"pid":"340600000000",
"pinyin":"dujiqu"},
{
"firstLetter":"x",
"id":"340603000000",
"jianpin":"xsq",
"level":3,
"name":"相山区",
"pid":"340600000000",
"pinyin":"xiangshanqu"},
{
"firstLetter":"l",
"id":"340604000000",
"jianpin":"lsq",
"level":3,
"name":"烈山区",
"pid":"340600000000",
"pinyin":"lieshanqu"},
{
"firstLetter":"s",
"id":"340621000000",
"jianpin":"sxx",
"level":3,
"name":"濉溪县",
"pid":"340600000000",
"pinyin":"suixixian"}],

[{
"firstLetter":"s",
"id":"340701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"340700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"t",
"id":"340705000000",
"jianpin":"tgq",
"level":3,
"name":"铜官区",
"pid":"340700000000",
"pinyin":"tongguanqu"},
{
"firstLetter":"y",
"id":"340706000000",
"jianpin":"yaq",
"level":3,
"name":"义安区",
"pid":"340700000000",
"pinyin":"yianqu"},
{
"firstLetter":"j",
"id":"340711000000",
"jianpin":"jq",
"level":3,
"name":"郊区",
"pid":"340700000000",
"pinyin":"jiaoqu"},
{
"firstLetter":"z",
"id":"340722000000",
"jianpin":"zyx",
"level":3,
"name":"枞阳县",
"pid":"340700000000",
"pinyin":"zongyangxian"}],

[{
"firstLetter":"s",
"id":"340801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"340800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"340802000000",
"jianpin":"yjq",
"level":3,
"name":"迎江区",
"pid":"340800000000",
"pinyin":"yingjiangqu"},
{
"firstLetter":"d",
"id":"340803000000",
"jianpin":"dgq",
"level":3,
"name":"大观区",
"pid":"340800000000",
"pinyin":"daguanqu"},
{
"firstLetter":"y",
"id":"340811000000",
"jianpin":"yxq",
"level":3,
"name":"宜秀区",
"pid":"340800000000",
"pinyin":"yixiuqu"},
{
"firstLetter":"h",
"id":"340822000000",
"jianpin":"hnx",
"level":3,
"name":"怀宁县",
"pid":"340800000000",
"pinyin":"huainingxian"},
{
"firstLetter":"q",
"id":"340824000000",
"jianpin":"qsx",
"level":3,
"name":"潜山县",
"pid":"340800000000",
"pinyin":"qianshanxian"},
{
"firstLetter":"t",
"id":"340825000000",
"jianpin":"thx",
"level":3,
"name":"太湖县",
"pid":"340800000000",
"pinyin":"taihuxian"},
{
"firstLetter":"s",
"id":"340826000000",
"jianpin":"ssx",
"level":3,
"name":"宿松县",
"pid":"340800000000",
"pinyin":"susongxian"},
{
"firstLetter":"w",
"id":"340827000000",
"jianpin":"wjx",
"level":3,
"name":"望江县",
"pid":"340800000000",
"pinyin":"wangjiangxian"},
{
"firstLetter":"y",
"id":"340828000000",
"jianpin":"yxx",
"level":3,
"name":"岳西县",
"pid":"340800000000",
"pinyin":"yuexixian"},
{
"firstLetter":"a",
"id":"340871000000",
"jianpin":"ahaqjjkfq",
"level":3,
"name":"安徽安庆经济开发区",
"pid":"340800000000",
"pinyin":"anhuianqingjingjikaifaqu"},
{
"firstLetter":"t",
"id":"340881000000",
"jianpin":"tcs",
"level":3,
"name":"桐城市",
"pid":"340800000000",
"pinyin":"tongchengshi"}],

[{
"firstLetter":"s",
"id":"341001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"341000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"t",
"id":"341002000000",
"jianpin":"txq",
"level":3,
"name":"屯溪区",
"pid":"341000000000",
"pinyin":"tunxiqu"},
{
"firstLetter":"h",
"id":"341003000000",
"jianpin":"hsq",
"level":3,
"name":"黄山区",
"pid":"341000000000",
"pinyin":"huangshanqu"},
{
"firstLetter":"h",
"id":"341004000000",
"jianpin":"hzq",
"level":3,
"name":"徽州区",
"pid":"341000000000",
"pinyin":"huizhouqu"},
{
"firstLetter":"s",
"id":"341021000000",
"jianpin":"sx",
"level":3,
"name":"歙县",
"pid":"341000000000",
"pinyin":"shexian"},
{
"firstLetter":"x",
"id":"341022000000",
"jianpin":"xnx",
"level":3,
"name":"休宁县",
"pid":"341000000000",
"pinyin":"xiuningxian"},
{
"firstLetter":"y",
"id":"341023000000",
"jianpin":"yx",
"level":3,
"name":"黟县",
"pid":"341000000000",
"pinyin":"yixian"},
{
"firstLetter":"q",
"id":"341024000000",
"jianpin":"qmx",
"level":3,
"name":"祁门县",
"pid":"341000000000",
"pinyin":"qimenxian"}],

[{
"firstLetter":"s",
"id":"341101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"341100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"341102000000",
"jianpin":"lyq",
"level":3,
"name":"琅琊区",
"pid":"341100000000",
"pinyin":"langyaqu"},
{
"firstLetter":"n",
"id":"341103000000",
"jianpin":"nqq",
"level":3,
"name":"南谯区",
"pid":"341100000000",
"pinyin":"nanqiaoqu"},
{
"firstLetter":"l",
"id":"341122000000",
"jianpin":"lax",
"level":3,
"name":"来安县",
"pid":"341100000000",
"pinyin":"laianxian"},
{
"firstLetter":"q",
"id":"341124000000",
"jianpin":"qjx",
"level":3,
"name":"全椒县",
"pid":"341100000000",
"pinyin":"quanjiaoxian"},
{
"firstLetter":"d",
"id":"341125000000",
"jianpin":"dyx",
"level":3,
"name":"定远县",
"pid":"341100000000",
"pinyin":"dingyuanxian"},
{
"firstLetter":"f",
"id":"341126000000",
"jianpin":"fyx",
"level":3,
"name":"凤阳县",
"pid":"341100000000",
"pinyin":"fengyangxian"},
{
"firstLetter":"s",
"id":"341171000000",
"jianpin":"scxdcyy",
"level":3,
"name":"苏滁现代产业园",
"pid":"341100000000",
"pinyin":"suchuxiandaichanyeyuan"},
{
"firstLetter":"c",
"id":"341172000000",
"jianpin":"czjjjskfq",
"level":3,
"name":"滁州经济技术开发区",
"pid":"341100000000",
"pinyin":"chuzhoujingjijishukaifaqu"},
{
"firstLetter":"t",
"id":"341181000000",
"jianpin":"tzs",
"level":3,
"name":"天长市",
"pid":"341100000000",
"pinyin":"tianzhangshi"},
{
"firstLetter":"m",
"id":"341182000000",
"jianpin":"mgs",
"level":3,
"name":"明光市",
"pid":"341100000000",
"pinyin":"mingguangshi"}],

[{
"firstLetter":"s",
"id":"341201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"341200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"341202000000",
"jianpin":"yzq",
"level":3,
"name":"颍州区",
"pid":"341200000000",
"pinyin":"yingzhouqu"},
{
"firstLetter":"y",
"id":"341203000000",
"jianpin":"ydq",
"level":3,
"name":"颍东区",
"pid":"341200000000",
"pinyin":"yingdongqu"},
{
"firstLetter":"y",
"id":"341204000000",
"jianpin":"yqq",
"level":3,
"name":"颍泉区",
"pid":"341200000000",
"pinyin":"yingquanqu"},
{
"firstLetter":"l",
"id":"341221000000",
"jianpin":"lqx",
"level":3,
"name":"临泉县",
"pid":"341200000000",
"pinyin":"linquanxian"},
{
"firstLetter":"t",
"id":"341222000000",
"jianpin":"thx",
"level":3,
"name":"太和县",
"pid":"341200000000",
"pinyin":"taihexian"},
{
"firstLetter":"f",
"id":"341225000000",
"jianpin":"fnx",
"level":3,
"name":"阜南县",
"pid":"341200000000",
"pinyin":"funanxian"},
{
"firstLetter":"y",
"id":"341226000000",
"jianpin":"ysx",
"level":3,
"name":"颍上县",
"pid":"341200000000",
"pinyin":"yingshangxian"},
{
"firstLetter":"f",
"id":"341271000000",
"jianpin":"fyhfxdcyyq",
"level":3,
"name":"阜阳合肥现代产业园区",
"pid":"341200000000",
"pinyin":"fuyanghefeixiandaichanyeyuanqu"},
{
"firstLetter":"f",
"id":"341272000000",
"jianpin":"fyjjjskfq",
"level":3,
"name":"阜阳经济技术开发区",
"pid":"341200000000",
"pinyin":"fuyangjingjijishukaifaqu"},
{
"firstLetter":"j",
"id":"341282000000",
"jianpin":"jss",
"level":3,
"name":"界首市",
"pid":"341200000000",
"pinyin":"jieshoushi"}],

[{
"firstLetter":"s",
"id":"341301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"341300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"q",
"id":"341302000000",
"jianpin":"qq",
"level":3,
"name":"埇桥区",
"pid":"341300000000",
"pinyin":"qiaoqu"},
{
"firstLetter":"d",
"id":"341321000000",
"jianpin":"dsx",
"level":3,
"name":"砀山县",
"pid":"341300000000",
"pinyin":"dangshanxian"},
{
"firstLetter":"x",
"id":"341322000000",
"jianpin":"xx",
"level":3,
"name":"萧县",
"pid":"341300000000",
"pinyin":"xiaoxian"},
{
"firstLetter":"l",
"id":"341323000000",
"jianpin":"lbx",
"level":3,
"name":"灵璧县",
"pid":"341300000000",
"pinyin":"lingbixian"},
{
"firstLetter":"s",
"id":"341324000000",
"jianpin":"sx",
"level":3,
"name":"泗县",
"pid":"341300000000",
"pinyin":"sixian"},
{
"firstLetter":"s",
"id":"341371000000",
"jianpin":"szmasxdcyyq",
"level":3,
"name":"宿州马鞍山现代产业园区",
"pid":"341300000000",
"pinyin":"suzhoumaanshanxiandaichanyeyuanqu"},
{
"firstLetter":"s",
"id":"341372000000",
"jianpin":"szjjjskfq",
"level":3,
"name":"宿州经济技术开发区",
"pid":"341300000000",
"pinyin":"suzhoujingjijishukaifaqu"}],

[{
"firstLetter":"s",
"id":"341501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"341500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"341502000000",
"jianpin":"jaq",
"level":3,
"name":"金安区",
"pid":"341500000000",
"pinyin":"jinanqu"},
{
"firstLetter":"y",
"id":"341503000000",
"jianpin":"yaq",
"level":3,
"name":"裕安区",
"pid":"341500000000",
"pinyin":"yuanqu"},
{
"firstLetter":"y",
"id":"341504000000",
"jianpin":"yjq",
"level":3,
"name":"叶集区",
"pid":"341500000000",
"pinyin":"yejiqu"},
{
"firstLetter":"h",
"id":"341522000000",
"jianpin":"hqx",
"level":3,
"name":"霍邱县",
"pid":"341500000000",
"pinyin":"huoqiuxian"},
{
"firstLetter":"s",
"id":"341523000000",
"jianpin":"scx",
"level":3,
"name":"舒城县",
"pid":"341500000000",
"pinyin":"shuchengxian"},
{
"firstLetter":"j",
"id":"341524000000",
"jianpin":"jzx",
"level":3,
"name":"金寨县",
"pid":"341500000000",
"pinyin":"jinzhaixian"},
{
"firstLetter":"h",
"id":"341525000000",
"jianpin":"hsx",
"level":3,
"name":"霍山县",
"pid":"341500000000",
"pinyin":"huoshanxian"}],

[{
"firstLetter":"s",
"id":"341601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"341600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"q",
"id":"341602000000",
"jianpin":"qcq",
"level":3,
"name":"谯城区",
"pid":"341600000000",
"pinyin":"qiaochengqu"},
{
"firstLetter":"w",
"id":"341621000000",
"jianpin":"wyx",
"level":3,
"name":"涡阳县",
"pid":"341600000000",
"pinyin":"woyangxian"},
{
"firstLetter":"m",
"id":"341622000000",
"jianpin":"mcx",
"level":3,
"name":"蒙城县",
"pid":"341600000000",
"pinyin":"mengchengxian"},
{
"firstLetter":"l",
"id":"341623000000",
"jianpin":"lxx",
"level":3,
"name":"利辛县",
"pid":"341600000000",
"pinyin":"lixinxian"}],

[{
"firstLetter":"s",
"id":"341701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"341700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"g",
"id":"341702000000",
"jianpin":"gcq",
"level":3,
"name":"贵池区",
"pid":"341700000000",
"pinyin":"guichiqu"},
{
"firstLetter":"d",
"id":"341721000000",
"jianpin":"dzx",
"level":3,
"name":"东至县",
"pid":"341700000000",
"pinyin":"dongzhixian"},
{
"firstLetter":"s",
"id":"341722000000",
"jianpin":"stx",
"level":3,
"name":"石台县",
"pid":"341700000000",
"pinyin":"shitaixian"},
{
"firstLetter":"q",
"id":"341723000000",
"jianpin":"qyx",
"level":3,
"name":"青阳县",
"pid":"341700000000",
"pinyin":"qingyangxian"}],

[{
"firstLetter":"s",
"id":"341801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"341800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"341802000000",
"jianpin":"xzq",
"level":3,
"name":"宣州区",
"pid":"341800000000",
"pinyin":"xuanzhouqu"},
{
"firstLetter":"l",
"id":"341821000000",
"jianpin":"lxx",
"level":3,
"name":"郎溪县",
"pid":"341800000000",
"pinyin":"langxixian"},
{
"firstLetter":"g",
"id":"341822000000",
"jianpin":"gdx",
"level":3,
"name":"广德县",
"pid":"341800000000",
"pinyin":"guangdexian"},
{
"firstLetter":"j",
"id":"341823000000",
"jianpin":"jx",
"level":3,
"name":"泾县",
"pid":"341800000000",
"pinyin":"jingxian"},
{
"firstLetter":"j",
"id":"341824000000",
"jianpin":"jxx",
"level":3,
"name":"绩溪县",
"pid":"341800000000",
"pinyin":"jixixian"},
{
"firstLetter":"j",
"id":"341825000000",
"jianpin":"jdx",
"level":3,
"name":"旌德县",
"pid":"341800000000",
"pinyin":"jingdexian"},
{
"firstLetter":"x",
"id":"341871000000",
"jianpin":"xcsjjkfq",
"level":3,
"name":"宣城市经济开发区",
"pid":"341800000000",
"pinyin":"xuanchengshijingjikaifaqu"},
{
"firstLetter":"n",
"id":"341881000000",
"jianpin":"ngs",
"level":3,
"name":"宁国市",
"pid":"341800000000",
"pinyin":"ningguoshi"}]],



[
[{
"firstLetter":"s",
"id":"350101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"350100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"g",
"id":"350102000000",
"jianpin":"glq",
"level":3,
"name":"鼓楼区",
"pid":"350100000000",
"pinyin":"gulouqu"},
{
"firstLetter":"t",
"id":"350103000000",
"jianpin":"tjq",
"level":3,
"name":"台江区",
"pid":"350100000000",
"pinyin":"taijiangqu"},
{
"firstLetter":"c",
"id":"350104000000",
"jianpin":"csq",
"level":3,
"name":"仓山区",
"pid":"350100000000",
"pinyin":"cangshanqu"},
{
"firstLetter":"m",
"id":"350105000000",
"jianpin":"mwq",
"level":3,
"name":"马尾区",
"pid":"350100000000",
"pinyin":"maweiqu"},
{
"firstLetter":"j",
"id":"350111000000",
"jianpin":"jaq",
"level":3,
"name":"晋安区",
"pid":"350100000000",
"pinyin":"jinanqu"},
{
"firstLetter":"m",
"id":"350121000000",
"jianpin":"mhx",
"level":3,
"name":"闽侯县",
"pid":"350100000000",
"pinyin":"minhouxian"},
{
"firstLetter":"l",
"id":"350122000000",
"jianpin":"ljx",
"level":3,
"name":"连江县",
"pid":"350100000000",
"pinyin":"lianjiangxian"},
{
"firstLetter":"l",
"id":"350123000000",
"jianpin":"lyx",
"level":3,
"name":"罗源县",
"pid":"350100000000",
"pinyin":"luoyuanxian"},
{
"firstLetter":"m",
"id":"350124000000",
"jianpin":"mqx",
"level":3,
"name":"闽清县",
"pid":"350100000000",
"pinyin":"minqingxian"},
{
"firstLetter":"y",
"id":"350125000000",
"jianpin":"ytx",
"level":3,
"name":"永泰县",
"pid":"350100000000",
"pinyin":"yongtaixian"},
{
"firstLetter":"p",
"id":"350128000000",
"jianpin":"ptx",
"level":3,
"name":"平潭县",
"pid":"350100000000",
"pinyin":"pingtanxian"},
{
"firstLetter":"f",
"id":"350181000000",
"jianpin":"fqs",
"level":3,
"name":"福清市",
"pid":"350100000000",
"pinyin":"fuqingshi"},
{
"firstLetter":"z",
"id":"350182000000",
"jianpin":"zls",
"level":3,
"name":"长乐市",
"pid":"350100000000",
"pinyin":"zhangleshi"}],

[{
"firstLetter":"s",
"id":"350201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"350200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"350203000000",
"jianpin":"smq",
"level":3,
"name":"思明区",
"pid":"350200000000",
"pinyin":"simingqu"},
{
"firstLetter":"h",
"id":"350205000000",
"jianpin":"hcq",
"level":3,
"name":"海沧区",
"pid":"350200000000",
"pinyin":"haicangqu"},
{
"firstLetter":"h",
"id":"350206000000",
"jianpin":"hlq",
"level":3,
"name":"湖里区",
"pid":"350200000000",
"pinyin":"huliqu"},
{
"firstLetter":"j",
"id":"350211000000",
"jianpin":"jmq",
"level":3,
"name":"集美区",
"pid":"350200000000",
"pinyin":"jimeiqu"},
{
"firstLetter":"t",
"id":"350212000000",
"jianpin":"taq",
"level":3,
"name":"同安区",
"pid":"350200000000",
"pinyin":"tonganqu"},
{
"firstLetter":"x",
"id":"350213000000",
"jianpin":"xaq",
"level":3,
"name":"翔安区",
"pid":"350200000000",
"pinyin":"xianganqu"}],

[{
"firstLetter":"s",
"id":"350301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"350300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"350302000000",
"jianpin":"cxq",
"level":3,
"name":"城厢区",
"pid":"350300000000",
"pinyin":"chengxiangqu"},
{
"firstLetter":"h",
"id":"350303000000",
"jianpin":"hjq",
"level":3,
"name":"涵江区",
"pid":"350300000000",
"pinyin":"hanjiangqu"},
{
"firstLetter":"l",
"id":"350304000000",
"jianpin":"lcq",
"level":3,
"name":"荔城区",
"pid":"350300000000",
"pinyin":"lichengqu"},
{
"firstLetter":"x",
"id":"350305000000",
"jianpin":"xyq",
"level":3,
"name":"秀屿区",
"pid":"350300000000",
"pinyin":"xiuyuqu"},
{
"firstLetter":"x",
"id":"350322000000",
"jianpin":"xyx",
"level":3,
"name":"仙游县",
"pid":"350300000000",
"pinyin":"xianyouxian"}],

[{
"firstLetter":"s",
"id":"350401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"350400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"m",
"id":"350402000000",
"jianpin":"mlq",
"level":3,
"name":"梅列区",
"pid":"350400000000",
"pinyin":"meiliequ"},
{
"firstLetter":"s",
"id":"350403000000",
"jianpin":"syq",
"level":3,
"name":"三元区",
"pid":"350400000000",
"pinyin":"sanyuanqu"},
{
"firstLetter":"m",
"id":"350421000000",
"jianpin":"mxx",
"level":3,
"name":"明溪县",
"pid":"350400000000",
"pinyin":"mingxixian"},
{
"firstLetter":"q",
"id":"350423000000",
"jianpin":"qlx",
"level":3,
"name":"清流县",
"pid":"350400000000",
"pinyin":"qingliuxian"},
{
"firstLetter":"n",
"id":"350424000000",
"jianpin":"nhx",
"level":3,
"name":"宁化县",
"pid":"350400000000",
"pinyin":"ninghuaxian"},
{
"firstLetter":"d",
"id":"350425000000",
"jianpin":"dtx",
"level":3,
"name":"大田县",
"pid":"350400000000",
"pinyin":"datianxian"},
{
"firstLetter":"y",
"id":"350426000000",
"jianpin":"yxx",
"level":3,
"name":"尤溪县",
"pid":"350400000000",
"pinyin":"youxixian"},
{
"firstLetter":"s",
"id":"350427000000",
"jianpin":"sx",
"level":3,
"name":"沙县",
"pid":"350400000000",
"pinyin":"shaxian"},
{
"firstLetter":"j",
"id":"350428000000",
"jianpin":"jlx",
"level":3,
"name":"将乐县",
"pid":"350400000000",
"pinyin":"jianglexian"},
{
"firstLetter":"t",
"id":"350429000000",
"jianpin":"tnx",
"level":3,
"name":"泰宁县",
"pid":"350400000000",
"pinyin":"tainingxian"},
{
"firstLetter":"j",
"id":"350430000000",
"jianpin":"jnx",
"level":3,
"name":"建宁县",
"pid":"350400000000",
"pinyin":"jianningxian"},
{
"firstLetter":"y",
"id":"350481000000",
"jianpin":"yas",
"level":3,
"name":"永安市",
"pid":"350400000000",
"pinyin":"yonganshi"}],

[{
"firstLetter":"s",
"id":"350501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"350500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"350502000000",
"jianpin":"lcq",
"level":3,
"name":"鲤城区",
"pid":"350500000000",
"pinyin":"lichengqu"},
{
"firstLetter":"f",
"id":"350503000000",
"jianpin":"fzq",
"level":3,
"name":"丰泽区",
"pid":"350500000000",
"pinyin":"fengzequ"},
{
"firstLetter":"l",
"id":"350504000000",
"jianpin":"ljq",
"level":3,
"name":"洛江区",
"pid":"350500000000",
"pinyin":"luojiangqu"},
{
"firstLetter":"q",
"id":"350505000000",
"jianpin":"qgq",
"level":3,
"name":"泉港区",
"pid":"350500000000",
"pinyin":"quangangqu"},
{
"firstLetter":"h",
"id":"350521000000",
"jianpin":"hax",
"level":3,
"name":"惠安县",
"pid":"350500000000",
"pinyin":"huianxian"},
{
"firstLetter":"a",
"id":"350524000000",
"jianpin":"axx",
"level":3,
"name":"安溪县",
"pid":"350500000000",
"pinyin":"anxixian"},
{
"firstLetter":"y",
"id":"350525000000",
"jianpin":"ycx",
"level":3,
"name":"永春县",
"pid":"350500000000",
"pinyin":"yongchunxian"},
{
"firstLetter":"d",
"id":"350526000000",
"jianpin":"dhx",
"level":3,
"name":"德化县",
"pid":"350500000000",
"pinyin":"dehuaxian"},
{
"firstLetter":"j",
"id":"350527000000",
"jianpin":"jmx",
"level":3,
"name":"金门县",
"pid":"350500000000",
"pinyin":"jinmenxian"},
{
"firstLetter":"s",
"id":"350581000000",
"jianpin":"sss",
"level":3,
"name":"石狮市",
"pid":"350500000000",
"pinyin":"shishishi"},
{
"firstLetter":"j",
"id":"350582000000",
"jianpin":"jjs",
"level":3,
"name":"晋江市",
"pid":"350500000000",
"pinyin":"jinjiangshi"},
{
"firstLetter":"n",
"id":"350583000000",
"jianpin":"nas",
"level":3,
"name":"南安市",
"pid":"350500000000",
"pinyin":"nananshi"}],

[{
"firstLetter":"s",
"id":"350601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"350600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"350602000000",
"jianpin":"xcq",
"level":3,
"name":"芗城区",
"pid":"350600000000",
"pinyin":"xiangchengqu"},
{
"firstLetter":"l",
"id":"350603000000",
"jianpin":"lwq",
"level":3,
"name":"龙文区",
"pid":"350600000000",
"pinyin":"longwenqu"},
{
"firstLetter":"y",
"id":"350622000000",
"jianpin":"yxx",
"level":3,
"name":"云霄县",
"pid":"350600000000",
"pinyin":"yunxiaoxian"},
{
"firstLetter":"z",
"id":"350623000000",
"jianpin":"zpx",
"level":3,
"name":"漳浦县",
"pid":"350600000000",
"pinyin":"zhangpuxian"},
{
"firstLetter":"z",
"id":"350624000000",
"jianpin":"zax",
"level":3,
"name":"诏安县",
"pid":"350600000000",
"pinyin":"zhaoanxian"},
{
"firstLetter":"z",
"id":"350625000000",
"jianpin":"ztx",
"level":3,
"name":"长泰县",
"pid":"350600000000",
"pinyin":"zhangtaixian"},
{
"firstLetter":"d",
"id":"350626000000",
"jianpin":"dsx",
"level":3,
"name":"东山县",
"pid":"350600000000",
"pinyin":"dongshanxian"},
{
"firstLetter":"n",
"id":"350627000000",
"jianpin":"njx",
"level":3,
"name":"南靖县",
"pid":"350600000000",
"pinyin":"nanjingxian"},
{
"firstLetter":"p",
"id":"350628000000",
"jianpin":"phx",
"level":3,
"name":"平和县",
"pid":"350600000000",
"pinyin":"pinghexian"},
{
"firstLetter":"h",
"id":"350629000000",
"jianpin":"hax",
"level":3,
"name":"华安县",
"pid":"350600000000",
"pinyin":"huaanxian"},
{
"firstLetter":"l",
"id":"350681000000",
"jianpin":"lhs",
"level":3,
"name":"龙海市",
"pid":"350600000000",
"pinyin":"longhaishi"}],

[{
"firstLetter":"s",
"id":"350701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"350700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"350702000000",
"jianpin":"ypq",
"level":3,
"name":"延平区",
"pid":"350700000000",
"pinyin":"yanpingqu"},
{
"firstLetter":"j",
"id":"350703000000",
"jianpin":"jyq",
"level":3,
"name":"建阳区",
"pid":"350700000000",
"pinyin":"jianyangqu"},
{
"firstLetter":"s",
"id":"350721000000",
"jianpin":"scx",
"level":3,
"name":"顺昌县",
"pid":"350700000000",
"pinyin":"shunchangxian"},
{
"firstLetter":"p",
"id":"350722000000",
"jianpin":"pcx",
"level":3,
"name":"浦城县",
"pid":"350700000000",
"pinyin":"puchengxian"},
{
"firstLetter":"g",
"id":"350723000000",
"jianpin":"gzx",
"level":3,
"name":"光泽县",
"pid":"350700000000",
"pinyin":"guangzexian"},
{
"firstLetter":"s",
"id":"350724000000",
"jianpin":"sxx",
"level":3,
"name":"松溪县",
"pid":"350700000000",
"pinyin":"songxixian"},
{
"firstLetter":"z",
"id":"350725000000",
"jianpin":"zhx",
"level":3,
"name":"政和县",
"pid":"350700000000",
"pinyin":"zhenghexian"},
{
"firstLetter":"s",
"id":"350781000000",
"jianpin":"sws",
"level":3,
"name":"邵武市",
"pid":"350700000000",
"pinyin":"shaowushi"},
{
"firstLetter":"w",
"id":"350782000000",
"jianpin":"wyss",
"level":3,
"name":"武夷山市",
"pid":"350700000000",
"pinyin":"wuyishanshi"},
{
"firstLetter":"j",
"id":"350783000000",
"jianpin":"jos",
"level":3,
"name":"建瓯市",
"pid":"350700000000",
"pinyin":"jianoushi"}],

[{
"firstLetter":"s",
"id":"350801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"350800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"350802000000",
"jianpin":"xlq",
"level":3,
"name":"新罗区",
"pid":"350800000000",
"pinyin":"xinluoqu"},
{
"firstLetter":"y",
"id":"350803000000",
"jianpin":"ydq",
"level":3,
"name":"永定区",
"pid":"350800000000",
"pinyin":"yongdingqu"},
{
"firstLetter":"z",
"id":"350821000000",
"jianpin":"ztx",
"level":3,
"name":"长汀县",
"pid":"350800000000",
"pinyin":"zhangtingxian"},
{
"firstLetter":"s",
"id":"350823000000",
"jianpin":"shx",
"level":3,
"name":"上杭县",
"pid":"350800000000",
"pinyin":"shanghangxian"},
{
"firstLetter":"w",
"id":"350824000000",
"jianpin":"wpx",
"level":3,
"name":"武平县",
"pid":"350800000000",
"pinyin":"wupingxian"},
{
"firstLetter":"l",
"id":"350825000000",
"jianpin":"lcx",
"level":3,
"name":"连城县",
"pid":"350800000000",
"pinyin":"lianchengxian"},
{
"firstLetter":"z",
"id":"350881000000",
"jianpin":"zps",
"level":3,
"name":"漳平市",
"pid":"350800000000",
"pinyin":"zhangpingshi"}],

[{
"firstLetter":"s",
"id":"350901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"350900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"350902000000",
"jianpin":"jcq",
"level":3,
"name":"蕉城区",
"pid":"350900000000",
"pinyin":"jiaochengqu"},
{
"firstLetter":"x",
"id":"350921000000",
"jianpin":"xpx",
"level":3,
"name":"霞浦县",
"pid":"350900000000",
"pinyin":"xiapuxian"},
{
"firstLetter":"g",
"id":"350922000000",
"jianpin":"gtx",
"level":3,
"name":"古田县",
"pid":"350900000000",
"pinyin":"gutianxian"},
{
"firstLetter":"p",
"id":"350923000000",
"jianpin":"pnx",
"level":3,
"name":"屏南县",
"pid":"350900000000",
"pinyin":"pingnanxian"},
{
"firstLetter":"s",
"id":"350924000000",
"jianpin":"snx",
"level":3,
"name":"寿宁县",
"pid":"350900000000",
"pinyin":"shouningxian"},
{
"firstLetter":"z",
"id":"350925000000",
"jianpin":"znx",
"level":3,
"name":"周宁县",
"pid":"350900000000",
"pinyin":"zhouningxian"},
{
"firstLetter":"z",
"id":"350926000000",
"jianpin":"zrx",
"level":3,
"name":"柘荣县",
"pid":"350900000000",
"pinyin":"zherongxian"},
{
"firstLetter":"f",
"id":"350981000000",
"jianpin":"fas",
"level":3,
"name":"福安市",
"pid":"350900000000",
"pinyin":"fuanshi"},
{
"firstLetter":"f",
"id":"350982000000",
"jianpin":"fds",
"level":3,
"name":"福鼎市",
"pid":"350900000000",
"pinyin":"fudingshi"}]],



[
[{
"firstLetter":"s",
"id":"360101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"360100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"360102000000",
"jianpin":"dhq",
"level":3,
"name":"东湖区",
"pid":"360100000000",
"pinyin":"donghuqu"},
{
"firstLetter":"x",
"id":"360103000000",
"jianpin":"xhq",
"level":3,
"name":"西湖区",
"pid":"360100000000",
"pinyin":"xihuqu"},
{
"firstLetter":"q",
"id":"360104000000",
"jianpin":"qypq",
"level":3,
"name":"青云谱区",
"pid":"360100000000",
"pinyin":"qingyunpuqu"},
{
"firstLetter":"w",
"id":"360105000000",
"jianpin":"wlq",
"level":3,
"name":"湾里区",
"pid":"360100000000",
"pinyin":"wanliqu"},
{
"firstLetter":"q",
"id":"360111000000",
"jianpin":"qshq",
"level":3,
"name":"青山湖区",
"pid":"360100000000",
"pinyin":"qingshanhuqu"},
{
"firstLetter":"x",
"id":"360112000000",
"jianpin":"xjq",
"level":3,
"name":"新建区",
"pid":"360100000000",
"pinyin":"xinjianqu"},
{
"firstLetter":"n",
"id":"360121000000",
"jianpin":"ncx",
"level":3,
"name":"南昌县",
"pid":"360100000000",
"pinyin":"nanchangxian"},
{
"firstLetter":"a",
"id":"360123000000",
"jianpin":"ayx",
"level":3,
"name":"安义县",
"pid":"360100000000",
"pinyin":"anyixian"},
{
"firstLetter":"j",
"id":"360124000000",
"jianpin":"jxx",
"level":3,
"name":"进贤县",
"pid":"360100000000",
"pinyin":"jinxianxian"}],

[{
"firstLetter":"s",
"id":"360201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"360200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"360202000000",
"jianpin":"cjq",
"level":3,
"name":"昌江区",
"pid":"360200000000",
"pinyin":"changjiangqu"},
{
"firstLetter":"z",
"id":"360203000000",
"jianpin":"zsq",
"level":3,
"name":"珠山区",
"pid":"360200000000",
"pinyin":"zhushanqu"},
{
"firstLetter":"f",
"id":"360222000000",
"jianpin":"flx",
"level":3,
"name":"浮梁县",
"pid":"360200000000",
"pinyin":"fuliangxian"},
{
"firstLetter":"l",
"id":"360281000000",
"jianpin":"lps",
"level":3,
"name":"乐平市",
"pid":"360200000000",
"pinyin":"lepingshi"}],

[{
"firstLetter":"s",
"id":"360301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"360300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"a",
"id":"360302000000",
"jianpin":"ayq",
"level":3,
"name":"安源区",
"pid":"360300000000",
"pinyin":"anyuanqu"},
{
"firstLetter":"x",
"id":"360313000000",
"jianpin":"xdq",
"level":3,
"name":"湘东区",
"pid":"360300000000",
"pinyin":"xiangdongqu"},
{
"firstLetter":"l",
"id":"360321000000",
"jianpin":"lhx",
"level":3,
"name":"莲花县",
"pid":"360300000000",
"pinyin":"lianhuaxian"},
{
"firstLetter":"s",
"id":"360322000000",
"jianpin":"slx",
"level":3,
"name":"上栗县",
"pid":"360300000000",
"pinyin":"shanglixian"},
{
"firstLetter":"l",
"id":"360323000000",
"jianpin":"lxx",
"level":3,
"name":"芦溪县",
"pid":"360300000000",
"pinyin":"luxixian"}],

[{
"firstLetter":"s",
"id":"360401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"360400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"360402000000",
"jianpin":"lxq",
"level":3,
"name":"濂溪区",
"pid":"360400000000",
"pinyin":"lianxiqu"},
{
"firstLetter":"x",
"id":"360403000000",
"jianpin":"xyq",
"level":3,
"name":"浔阳区",
"pid":"360400000000",
"pinyin":"xunyangqu"},
{
"firstLetter":"c",
"id":"360404000000",
"jianpin":"csq",
"level":3,
"name":"柴桑区",
"pid":"360400000000",
"pinyin":"chaisangqu"},
{
"firstLetter":"w",
"id":"360423000000",
"jianpin":"wnx",
"level":3,
"name":"武宁县",
"pid":"360400000000",
"pinyin":"wuningxian"},
{
"firstLetter":"x",
"id":"360424000000",
"jianpin":"xsx",
"level":3,
"name":"修水县",
"pid":"360400000000",
"pinyin":"xiushuixian"},
{
"firstLetter":"y",
"id":"360425000000",
"jianpin":"yxx",
"level":3,
"name":"永修县",
"pid":"360400000000",
"pinyin":"yongxiuxian"},
{
"firstLetter":"d",
"id":"360426000000",
"jianpin":"dax",
"level":3,
"name":"德安县",
"pid":"360400000000",
"pinyin":"deanxian"},
{
"firstLetter":"d",
"id":"360428000000",
"jianpin":"dcx",
"level":3,
"name":"都昌县",
"pid":"360400000000",
"pinyin":"douchangxian"},
{
"firstLetter":"h",
"id":"360429000000",
"jianpin":"hkx",
"level":3,
"name":"湖口县",
"pid":"360400000000",
"pinyin":"hukouxian"},
{
"firstLetter":"p",
"id":"360430000000",
"jianpin":"pzx",
"level":3,
"name":"彭泽县",
"pid":"360400000000",
"pinyin":"pengzexian"},
{
"firstLetter":"r",
"id":"360481000000",
"jianpin":"rcs",
"level":3,
"name":"瑞昌市",
"pid":"360400000000",
"pinyin":"ruichangshi"},
{
"firstLetter":"g",
"id":"360482000000",
"jianpin":"gqcs",
"level":3,
"name":"共青城市",
"pid":"360400000000",
"pinyin":"gongqingchengshi"},
{
"firstLetter":"l",
"id":"360483000000",
"jianpin":"lss",
"level":3,
"name":"庐山市",
"pid":"360400000000",
"pinyin":"lushanshi"}],

[{
"firstLetter":"s",
"id":"360501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"360500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"360502000000",
"jianpin":"ysq",
"level":3,
"name":"渝水区",
"pid":"360500000000",
"pinyin":"yushuiqu"},
{
"firstLetter":"f",
"id":"360521000000",
"jianpin":"fyx",
"level":3,
"name":"分宜县",
"pid":"360500000000",
"pinyin":"fenyixian"}],

[{
"firstLetter":"s",
"id":"360601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"360600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"360602000000",
"jianpin":"yhq",
"level":3,
"name":"月湖区",
"pid":"360600000000",
"pinyin":"yuehuqu"},
{
"firstLetter":"y",
"id":"360622000000",
"jianpin":"yjx",
"level":3,
"name":"余江县",
"pid":"360600000000",
"pinyin":"yujiangxian"},
{
"firstLetter":"g",
"id":"360681000000",
"jianpin":"gxs",
"level":3,
"name":"贵溪市",
"pid":"360600000000",
"pinyin":"guixishi"}],

[{
"firstLetter":"s",
"id":"360701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"360700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"z",
"id":"360702000000",
"jianpin":"zgq",
"level":3,
"name":"章贡区",
"pid":"360700000000",
"pinyin":"zhanggongqu"},
{
"firstLetter":"n",
"id":"360703000000",
"jianpin":"nkq",
"level":3,
"name":"南康区",
"pid":"360700000000",
"pinyin":"nankangqu"},
{
"firstLetter":"g",
"id":"360704000000",
"jianpin":"gxq",
"level":3,
"name":"赣县区",
"pid":"360700000000",
"pinyin":"ganxianqu"},
{
"firstLetter":"x",
"id":"360722000000",
"jianpin":"xfx",
"level":3,
"name":"信丰县",
"pid":"360700000000",
"pinyin":"xinfengxian"},
{
"firstLetter":"d",
"id":"360723000000",
"jianpin":"dyx",
"level":3,
"name":"大余县",
"pid":"360700000000",
"pinyin":"dayuxian"},
{
"firstLetter":"s",
"id":"360724000000",
"jianpin":"syx",
"level":3,
"name":"上犹县",
"pid":"360700000000",
"pinyin":"shangyouxian"},
{
"firstLetter":"c",
"id":"360725000000",
"jianpin":"cyx",
"level":3,
"name":"崇义县",
"pid":"360700000000",
"pinyin":"chongyixian"},
{
"firstLetter":"a",
"id":"360726000000",
"jianpin":"ayx",
"level":3,
"name":"安远县",
"pid":"360700000000",
"pinyin":"anyuanxian"},
{
"firstLetter":"l",
"id":"360727000000",
"jianpin":"lnx",
"level":3,
"name":"龙南县",
"pid":"360700000000",
"pinyin":"longnanxian"},
{
"firstLetter":"d",
"id":"360728000000",
"jianpin":"dnx",
"level":3,
"name":"定南县",
"pid":"360700000000",
"pinyin":"dingnanxian"},
{
"firstLetter":"q",
"id":"360729000000",
"jianpin":"qnx",
"level":3,
"name":"全南县",
"pid":"360700000000",
"pinyin":"quannanxian"},
{
"firstLetter":"n",
"id":"360730000000",
"jianpin":"ndx",
"level":3,
"name":"宁都县",
"pid":"360700000000",
"pinyin":"ningdouxian"},
{
"firstLetter":"y",
"id":"360731000000",
"jianpin":"ydx",
"level":3,
"name":"于都县",
"pid":"360700000000",
"pinyin":"yudouxian"},
{
"firstLetter":"x",
"id":"360732000000",
"jianpin":"xgx",
"level":3,
"name":"兴国县",
"pid":"360700000000",
"pinyin":"xingguoxian"},
{
"firstLetter":"h",
"id":"360733000000",
"jianpin":"hcx",
"level":3,
"name":"会昌县",
"pid":"360700000000",
"pinyin":"huichangxian"},
{
"firstLetter":"x",
"id":"360734000000",
"jianpin":"xwx",
"level":3,
"name":"寻乌县",
"pid":"360700000000",
"pinyin":"xunwuxian"},
{
"firstLetter":"s",
"id":"360735000000",
"jianpin":"scx",
"level":3,
"name":"石城县",
"pid":"360700000000",
"pinyin":"shichengxian"},
{
"firstLetter":"r",
"id":"360781000000",
"jianpin":"rjs",
"level":3,
"name":"瑞金市",
"pid":"360700000000",
"pinyin":"ruijinshi"}],

[{
"firstLetter":"s",
"id":"360801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"360800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"360802000000",
"jianpin":"jzq",
"level":3,
"name":"吉州区",
"pid":"360800000000",
"pinyin":"jizhouqu"},
{
"firstLetter":"q",
"id":"360803000000",
"jianpin":"qyq",
"level":3,
"name":"青原区",
"pid":"360800000000",
"pinyin":"qingyuanqu"},
{
"firstLetter":"j",
"id":"360821000000",
"jianpin":"jax",
"level":3,
"name":"吉安县",
"pid":"360800000000",
"pinyin":"jianxian"},
{
"firstLetter":"j",
"id":"360822000000",
"jianpin":"jsx",
"level":3,
"name":"吉水县",
"pid":"360800000000",
"pinyin":"jishuixian"},
{
"firstLetter":"x",
"id":"360823000000",
"jianpin":"xjx",
"level":3,
"name":"峡江县",
"pid":"360800000000",
"pinyin":"xiajiangxian"},
{
"firstLetter":"x",
"id":"360824000000",
"jianpin":"xgx",
"level":3,
"name":"新干县",
"pid":"360800000000",
"pinyin":"xinganxian"},
{
"firstLetter":"y",
"id":"360825000000",
"jianpin":"yfx",
"level":3,
"name":"永丰县",
"pid":"360800000000",
"pinyin":"yongfengxian"},
{
"firstLetter":"t",
"id":"360826000000",
"jianpin":"thx",
"level":3,
"name":"泰和县",
"pid":"360800000000",
"pinyin":"taihexian"},
{
"firstLetter":"s",
"id":"360827000000",
"jianpin":"scx",
"level":3,
"name":"遂川县",
"pid":"360800000000",
"pinyin":"suichuanxian"},
{
"firstLetter":"w",
"id":"360828000000",
"jianpin":"wax",
"level":3,
"name":"万安县",
"pid":"360800000000",
"pinyin":"wananxian"},
{
"firstLetter":"a",
"id":"360829000000",
"jianpin":"afx",
"level":3,
"name":"安福县",
"pid":"360800000000",
"pinyin":"anfuxian"},
{
"firstLetter":"y",
"id":"360830000000",
"jianpin":"yxx",
"level":3,
"name":"永新县",
"pid":"360800000000",
"pinyin":"yongxinxian"},
{
"firstLetter":"j",
"id":"360881000000",
"jianpin":"jgss",
"level":3,
"name":"井冈山市",
"pid":"360800000000",
"pinyin":"jinggangshanshi"}],

[{
"firstLetter":"s",
"id":"360901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"360900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"360902000000",
"jianpin":"yzq",
"level":3,
"name":"袁州区",
"pid":"360900000000",
"pinyin":"yuanzhouqu"},
{
"firstLetter":"f",
"id":"360921000000",
"jianpin":"fxx",
"level":3,
"name":"奉新县",
"pid":"360900000000",
"pinyin":"fengxinxian"},
{
"firstLetter":"w",
"id":"360922000000",
"jianpin":"wzx",
"level":3,
"name":"万载县",
"pid":"360900000000",
"pinyin":"wanzaixian"},
{
"firstLetter":"s",
"id":"360923000000",
"jianpin":"sgx",
"level":3,
"name":"上高县",
"pid":"360900000000",
"pinyin":"shanggaoxian"},
{
"firstLetter":"y",
"id":"360924000000",
"jianpin":"yfx",
"level":3,
"name":"宜丰县",
"pid":"360900000000",
"pinyin":"yifengxian"},
{
"firstLetter":"j",
"id":"360925000000",
"jianpin":"jax",
"level":3,
"name":"靖安县",
"pid":"360900000000",
"pinyin":"jinganxian"},
{
"firstLetter":"t",
"id":"360926000000",
"jianpin":"tgx",
"level":3,
"name":"铜鼓县",
"pid":"360900000000",
"pinyin":"tongguxian"},
{
"firstLetter":"f",
"id":"360981000000",
"jianpin":"fcs",
"level":3,
"name":"丰城市",
"pid":"360900000000",
"pinyin":"fengchengshi"},
{
"firstLetter":"z",
"id":"360982000000",
"jianpin":"zss",
"level":3,
"name":"樟树市",
"pid":"360900000000",
"pinyin":"zhangshushi"},
{
"firstLetter":"g",
"id":"360983000000",
"jianpin":"gas",
"level":3,
"name":"高安市",
"pid":"360900000000",
"pinyin":"gaoanshi"}],

[{
"firstLetter":"s",
"id":"361001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"361000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"361002000000",
"jianpin":"lcq",
"level":3,
"name":"临川区",
"pid":"361000000000",
"pinyin":"linchuanqu"},
{
"firstLetter":"d",
"id":"361003000000",
"jianpin":"dxq",
"level":3,
"name":"东乡区",
"pid":"361000000000",
"pinyin":"dongxiangqu"},
{
"firstLetter":"n",
"id":"361021000000",
"jianpin":"ncx",
"level":3,
"name":"南城县",
"pid":"361000000000",
"pinyin":"nanchengxian"},
{
"firstLetter":"l",
"id":"361022000000",
"jianpin":"lcx",
"level":3,
"name":"黎川县",
"pid":"361000000000",
"pinyin":"lichuanxian"},
{
"firstLetter":"n",
"id":"361023000000",
"jianpin":"nfx",
"level":3,
"name":"南丰县",
"pid":"361000000000",
"pinyin":"nanfengxian"},
{
"firstLetter":"c",
"id":"361024000000",
"jianpin":"crx",
"level":3,
"name":"崇仁县",
"pid":"361000000000",
"pinyin":"chongrenxian"},
{
"firstLetter":"l",
"id":"361025000000",
"jianpin":"lax",
"level":3,
"name":"乐安县",
"pid":"361000000000",
"pinyin":"leanxian"},
{
"firstLetter":"y",
"id":"361026000000",
"jianpin":"yhx",
"level":3,
"name":"宜黄县",
"pid":"361000000000",
"pinyin":"yihuangxian"},
{
"firstLetter":"j",
"id":"361027000000",
"jianpin":"jxx",
"level":3,
"name":"金溪县",
"pid":"361000000000",
"pinyin":"jinxixian"},
{
"firstLetter":"z",
"id":"361028000000",
"jianpin":"zxx",
"level":3,
"name":"资溪县",
"pid":"361000000000",
"pinyin":"zixixian"},
{
"firstLetter":"g",
"id":"361030000000",
"jianpin":"gcx",
"level":3,
"name":"广昌县",
"pid":"361000000000",
"pinyin":"guangchangxian"}],

[{
"firstLetter":"s",
"id":"361101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"361100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"361102000000",
"jianpin":"xzq",
"level":3,
"name":"信州区",
"pid":"361100000000",
"pinyin":"xinzhouqu"},
{
"firstLetter":"g",
"id":"361103000000",
"jianpin":"gfq",
"level":3,
"name":"广丰区",
"pid":"361100000000",
"pinyin":"guangfengqu"},
{
"firstLetter":"s",
"id":"361121000000",
"jianpin":"srx",
"level":3,
"name":"上饶县",
"pid":"361100000000",
"pinyin":"shangraoxian"},
{
"firstLetter":"y",
"id":"361123000000",
"jianpin":"ysx",
"level":3,
"name":"玉山县",
"pid":"361100000000",
"pinyin":"yushanxian"},
{
"firstLetter":"q",
"id":"361124000000",
"jianpin":"qsx",
"level":3,
"name":"铅山县",
"pid":"361100000000",
"pinyin":"qianshanxian"},
{
"firstLetter":"h",
"id":"361125000000",
"jianpin":"hfx",
"level":3,
"name":"横峰县",
"pid":"361100000000",
"pinyin":"hengfengxian"},
{
"firstLetter":"y",
"id":"361126000000",
"jianpin":"yyx",
"level":3,
"name":"弋阳县",
"pid":"361100000000",
"pinyin":"yiyangxian"},
{
"firstLetter":"y",
"id":"361127000000",
"jianpin":"ygx",
"level":3,
"name":"余干县",
"pid":"361100000000",
"pinyin":"yuganxian"},
{
"firstLetter":"p",
"id":"361128000000",
"jianpin":"pyx",
"level":3,
"name":"鄱阳县",
"pid":"361100000000",
"pinyin":"poyangxian"},
{
"firstLetter":"w",
"id":"361129000000",
"jianpin":"wnx",
"level":3,
"name":"万年县",
"pid":"361100000000",
"pinyin":"wannianxian"},
{
"firstLetter":"w",
"id":"361130000000",
"jianpin":"wyx",
"level":3,
"name":"婺源县",
"pid":"361100000000",
"pinyin":"wuyuanxian"},
{
"firstLetter":"d",
"id":"361181000000",
"jianpin":"dxs",
"level":3,
"name":"德兴市",
"pid":"361100000000",
"pinyin":"dexingshi"}]],



[
[{
"firstLetter":"s",
"id":"370101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"370100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"370102000000",
"jianpin":"lxq",
"level":3,
"name":"历下区",
"pid":"370100000000",
"pinyin":"lixiaqu"},
{
"firstLetter":"s",
"id":"370103000000",
"jianpin":"szq",
"level":3,
"name":"市中区",
"pid":"370100000000",
"pinyin":"shizhongqu"},
{
"firstLetter":"h",
"id":"370104000000",
"jianpin":"hyq",
"level":3,
"name":"槐荫区",
"pid":"370100000000",
"pinyin":"huaiyinqu"},
{
"firstLetter":"t",
"id":"370105000000",
"jianpin":"tqq",
"level":3,
"name":"天桥区",
"pid":"370100000000",
"pinyin":"tianqiaoqu"},
{
"firstLetter":"l",
"id":"370112000000",
"jianpin":"lcq",
"level":3,
"name":"历城区",
"pid":"370100000000",
"pinyin":"lichengqu"},
{
"firstLetter":"z",
"id":"370113000000",
"jianpin":"zqq",
"level":3,
"name":"长清区",
"pid":"370100000000",
"pinyin":"zhangqingqu"},
{
"firstLetter":"z",
"id":"370114000000",
"jianpin":"zqq",
"level":3,
"name":"章丘区",
"pid":"370100000000",
"pinyin":"zhangqiuqu"},
{
"firstLetter":"p",
"id":"370124000000",
"jianpin":"pyx",
"level":3,
"name":"平阴县",
"pid":"370100000000",
"pinyin":"pingyinxian"},
{
"firstLetter":"j",
"id":"370125000000",
"jianpin":"jyx",
"level":3,
"name":"济阳县",
"pid":"370100000000",
"pinyin":"jiyangxian"},
{
"firstLetter":"s",
"id":"370126000000",
"jianpin":"shx",
"level":3,
"name":"商河县",
"pid":"370100000000",
"pinyin":"shanghexian"},
{
"firstLetter":"j",
"id":"370171000000",
"jianpin":"jngxjscykfq",
"level":3,
"name":"济南高新技术产业开发区",
"pid":"370100000000",
"pinyin":"jinangaoxinjishuchanyekaifaqu"}],

[{
"firstLetter":"s",
"id":"370201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"370200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"370202000000",
"jianpin":"snq",
"level":3,
"name":"市南区",
"pid":"370200000000",
"pinyin":"shinanqu"},
{
"firstLetter":"s",
"id":"370203000000",
"jianpin":"sbq",
"level":3,
"name":"市北区",
"pid":"370200000000",
"pinyin":"shibeiqu"},
{
"firstLetter":"h",
"id":"370211000000",
"jianpin":"hdq",
"level":3,
"name":"黄岛区",
"pid":"370200000000",
"pinyin":"huangdaoqu"},
{
"firstLetter":"l",
"id":"370212000000",
"jianpin":"lsq",
"level":3,
"name":"崂山区",
"pid":"370200000000",
"pinyin":"laoshanqu"},
{
"firstLetter":"l",
"id":"370213000000",
"jianpin":"lcq",
"level":3,
"name":"李沧区",
"pid":"370200000000",
"pinyin":"licangqu"},
{
"firstLetter":"c",
"id":"370214000000",
"jianpin":"cyq",
"level":3,
"name":"城阳区",
"pid":"370200000000",
"pinyin":"chengyangqu"},
{
"firstLetter":"j",
"id":"370215000000",
"jianpin":"jmq",
"level":3,
"name":"即墨区",
"pid":"370200000000",
"pinyin":"jimoqu"},
{
"firstLetter":"q",
"id":"370271000000",
"jianpin":"qdgxjscykfq",
"level":3,
"name":"青岛高新技术产业开发区",
"pid":"370200000000",
"pinyin":"qingdaogaoxinjishuchanyekaifaqu"},
{
"firstLetter":"j",
"id":"370281000000",
"jianpin":"jzs",
"level":3,
"name":"胶州市",
"pid":"370200000000",
"pinyin":"jiaozhoushi"},
{
"firstLetter":"p",
"id":"370283000000",
"jianpin":"pds",
"level":3,
"name":"平度市",
"pid":"370200000000",
"pinyin":"pingdushi"},
{
"firstLetter":"l",
"id":"370285000000",
"jianpin":"lxs",
"level":3,
"name":"莱西市",
"pid":"370200000000",
"pinyin":"laixishi"}],

[{
"firstLetter":"s",
"id":"370301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"370300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"z",
"id":"370302000000",
"jianpin":"zcq",
"level":3,
"name":"淄川区",
"pid":"370300000000",
"pinyin":"zichuanqu"},
{
"firstLetter":"z",
"id":"370303000000",
"jianpin":"zdq",
"level":3,
"name":"张店区",
"pid":"370300000000",
"pinyin":"zhangdianqu"},
{
"firstLetter":"b",
"id":"370304000000",
"jianpin":"bsq",
"level":3,
"name":"博山区",
"pid":"370300000000",
"pinyin":"boshanqu"},
{
"firstLetter":"l",
"id":"370305000000",
"jianpin":"lzq",
"level":3,
"name":"临淄区",
"pid":"370300000000",
"pinyin":"linziqu"},
{
"firstLetter":"z",
"id":"370306000000",
"jianpin":"zcq",
"level":3,
"name":"周村区",
"pid":"370300000000",
"pinyin":"zhoucunqu"},
{
"firstLetter":"h",
"id":"370321000000",
"jianpin":"htx",
"level":3,
"name":"桓台县",
"pid":"370300000000",
"pinyin":"huantaixian"},
{
"firstLetter":"g",
"id":"370322000000",
"jianpin":"gqx",
"level":3,
"name":"高青县",
"pid":"370300000000",
"pinyin":"gaoqingxian"},
{
"firstLetter":"y",
"id":"370323000000",
"jianpin":"yyx",
"level":3,
"name":"沂源县",
"pid":"370300000000",
"pinyin":"yiyuanxian"}],

[{
"firstLetter":"s",
"id":"370401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"370400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"370402000000",
"jianpin":"szq",
"level":3,
"name":"市中区",
"pid":"370400000000",
"pinyin":"shizhongqu"},
{
"firstLetter":"x",
"id":"370403000000",
"jianpin":"xcq",
"level":3,
"name":"薛城区",
"pid":"370400000000",
"pinyin":"xuechengqu"},
{
"firstLetter":"y",
"id":"370404000000",
"jianpin":"ycq",
"level":3,
"name":"峄城区",
"pid":"370400000000",
"pinyin":"yichengqu"},
{
"firstLetter":"t",
"id":"370405000000",
"jianpin":"tezq",
"level":3,
"name":"台儿庄区",
"pid":"370400000000",
"pinyin":"taierzhuangqu"},
{
"firstLetter":"s",
"id":"370406000000",
"jianpin":"stq",
"level":3,
"name":"山亭区",
"pid":"370400000000",
"pinyin":"shantingqu"},
{
"firstLetter":"t",
"id":"370481000000",
"jianpin":"tzs",
"level":3,
"name":"滕州市",
"pid":"370400000000",
"pinyin":"tengzhoushi"}],

[{
"firstLetter":"s",
"id":"370501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"370500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"370502000000",
"jianpin":"dyq",
"level":3,
"name":"东营区",
"pid":"370500000000",
"pinyin":"dongyingqu"},
{
"firstLetter":"h",
"id":"370503000000",
"jianpin":"hkq",
"level":3,
"name":"河口区",
"pid":"370500000000",
"pinyin":"hekouqu"},
{
"firstLetter":"k",
"id":"370505000000",
"jianpin":"klq",
"level":3,
"name":"垦利区",
"pid":"370500000000",
"pinyin":"kenliqu"},
{
"firstLetter":"l",
"id":"370522000000",
"jianpin":"ljx",
"level":3,
"name":"利津县",
"pid":"370500000000",
"pinyin":"lijinxian"},
{
"firstLetter":"g",
"id":"370523000000",
"jianpin":"grx",
"level":3,
"name":"广饶县",
"pid":"370500000000",
"pinyin":"guangraoxian"},
{
"firstLetter":"d",
"id":"370571000000",
"jianpin":"dyjjjskfq",
"level":3,
"name":"东营经济技术开发区",
"pid":"370500000000",
"pinyin":"dongyingjingjijishukaifaqu"},
{
"firstLetter":"d",
"id":"370572000000",
"jianpin":"dygjjkfq",
"level":3,
"name":"东营港经济开发区",
"pid":"370500000000",
"pinyin":"dongyinggangjingjikaifaqu"}],

[{
"firstLetter":"s",
"id":"370601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"370600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"z",
"id":"370602000000",
"jianpin":"zfq",
"level":3,
"name":"芝罘区",
"pid":"370600000000",
"pinyin":"zhifuqu"},
{
"firstLetter":"f",
"id":"370611000000",
"jianpin":"fsq",
"level":3,
"name":"福山区",
"pid":"370600000000",
"pinyin":"fushanqu"},
{
"firstLetter":"m",
"id":"370612000000",
"jianpin":"mpq",
"level":3,
"name":"牟平区",
"pid":"370600000000",
"pinyin":"moupingqu"},
{
"firstLetter":"l",
"id":"370613000000",
"jianpin":"lsq",
"level":3,
"name":"莱山区",
"pid":"370600000000",
"pinyin":"laishanqu"},
{
"firstLetter":"z",
"id":"370634000000",
"jianpin":"zdx",
"level":3,
"name":"长岛县",
"pid":"370600000000",
"pinyin":"zhangdaoxian"},
{
"firstLetter":"y",
"id":"370671000000",
"jianpin":"ytgxjscykfq",
"level":3,
"name":"烟台高新技术产业开发区",
"pid":"370600000000",
"pinyin":"yantaigaoxinjishuchanyekaifaqu"},
{
"firstLetter":"y",
"id":"370672000000",
"jianpin":"ytjjjskfq",
"level":3,
"name":"烟台经济技术开发区",
"pid":"370600000000",
"pinyin":"yantaijingjijishukaifaqu"},
{
"firstLetter":"l",
"id":"370681000000",
"jianpin":"lks",
"level":3,
"name":"龙口市",
"pid":"370600000000",
"pinyin":"longkoushi"},
{
"firstLetter":"l",
"id":"370682000000",
"jianpin":"lys",
"level":3,
"name":"莱阳市",
"pid":"370600000000",
"pinyin":"laiyangshi"},
{
"firstLetter":"l",
"id":"370683000000",
"jianpin":"lzs",
"level":3,
"name":"莱州市",
"pid":"370600000000",
"pinyin":"laizhoushi"},
{
"firstLetter":"p",
"id":"370684000000",
"jianpin":"pls",
"level":3,
"name":"蓬莱市",
"pid":"370600000000",
"pinyin":"penglaishi"},
{
"firstLetter":"z",
"id":"370685000000",
"jianpin":"zys",
"level":3,
"name":"招远市",
"pid":"370600000000",
"pinyin":"zhaoyuanshi"},
{
"firstLetter":"q",
"id":"370686000000",
"jianpin":"qxs",
"level":3,
"name":"栖霞市",
"pid":"370600000000",
"pinyin":"qixiashi"},
{
"firstLetter":"h",
"id":"370687000000",
"jianpin":"hys",
"level":3,
"name":"海阳市",
"pid":"370600000000",
"pinyin":"haiyangshi"}],

[{
"firstLetter":"s",
"id":"370701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"370700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"370702000000",
"jianpin":"wcq",
"level":3,
"name":"潍城区",
"pid":"370700000000",
"pinyin":"weichengqu"},
{
"firstLetter":"h",
"id":"370703000000",
"jianpin":"htq",
"level":3,
"name":"寒亭区",
"pid":"370700000000",
"pinyin":"hantingqu"},
{
"firstLetter":"f",
"id":"370704000000",
"jianpin":"fzq",
"level":3,
"name":"坊子区",
"pid":"370700000000",
"pinyin":"fangziqu"},
{
"firstLetter":"k",
"id":"370705000000",
"jianpin":"kwq",
"level":3,
"name":"奎文区",
"pid":"370700000000",
"pinyin":"kuiwenqu"},
{
"firstLetter":"l",
"id":"370724000000",
"jianpin":"lqx",
"level":3,
"name":"临朐县",
"pid":"370700000000",
"pinyin":"linquxian"},
{
"firstLetter":"c",
"id":"370725000000",
"jianpin":"clx",
"level":3,
"name":"昌乐县",
"pid":"370700000000",
"pinyin":"changlexian"},
{
"firstLetter":"w",
"id":"370772000000",
"jianpin":"wfbhjjjskfq",
"level":3,
"name":"潍坊滨海经济技术开发区",
"pid":"370700000000",
"pinyin":"weifangbinhaijingjijishukaifaqu"},
{
"firstLetter":"q",
"id":"370781000000",
"jianpin":"qzs",
"level":3,
"name":"青州市",
"pid":"370700000000",
"pinyin":"qingzhoushi"},
{
"firstLetter":"z",
"id":"370782000000",
"jianpin":"zcs",
"level":3,
"name":"诸城市",
"pid":"370700000000",
"pinyin":"zhuchengshi"},
{
"firstLetter":"s",
"id":"370783000000",
"jianpin":"sgs",
"level":3,
"name":"寿光市",
"pid":"370700000000",
"pinyin":"shouguangshi"},
{
"firstLetter":"a",
"id":"370784000000",
"jianpin":"aqs",
"level":3,
"name":"安丘市",
"pid":"370700000000",
"pinyin":"anqiushi"},
{
"firstLetter":"g",
"id":"370785000000",
"jianpin":"gms",
"level":3,
"name":"高密市",
"pid":"370700000000",
"pinyin":"gaomishi"},
{
"firstLetter":"c",
"id":"370786000000",
"jianpin":"cys",
"level":3,
"name":"昌邑市",
"pid":"370700000000",
"pinyin":"changyishi"}],

[{
"firstLetter":"s",
"id":"370801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"370800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"r",
"id":"370811000000",
"jianpin":"rcq",
"level":3,
"name":"任城区",
"pid":"370800000000",
"pinyin":"renchengqu"},
{
"firstLetter":"y",
"id":"370812000000",
"jianpin":"yzq",
"level":3,
"name":"兖州区",
"pid":"370800000000",
"pinyin":"yanzhouqu"},
{
"firstLetter":"w",
"id":"370826000000",
"jianpin":"wsx",
"level":3,
"name":"微山县",
"pid":"370800000000",
"pinyin":"weishanxian"},
{
"firstLetter":"y",
"id":"370827000000",
"jianpin":"ytx",
"level":3,
"name":"鱼台县",
"pid":"370800000000",
"pinyin":"yutaixian"},
{
"firstLetter":"j",
"id":"370828000000",
"jianpin":"jxx",
"level":3,
"name":"金乡县",
"pid":"370800000000",
"pinyin":"jinxiangxian"},
{
"firstLetter":"j",
"id":"370829000000",
"jianpin":"jxx",
"level":3,
"name":"嘉祥县",
"pid":"370800000000",
"pinyin":"jiaxiangxian"},
{
"firstLetter":"w",
"id":"370830000000",
"jianpin":"wsx",
"level":3,
"name":"汶上县",
"pid":"370800000000",
"pinyin":"wenshangxian"},
{
"firstLetter":"s",
"id":"370831000000",
"jianpin":"ssx",
"level":3,
"name":"泗水县",
"pid":"370800000000",
"pinyin":"sishuixian"},
{
"firstLetter":"l",
"id":"370832000000",
"jianpin":"lsx",
"level":3,
"name":"梁山县",
"pid":"370800000000",
"pinyin":"liangshanxian"},
{
"firstLetter":"j",
"id":"370871000000",
"jianpin":"jngxjscykfq",
"level":3,
"name":"济宁高新技术产业开发区",
"pid":"370800000000",
"pinyin":"jininggaoxinjishuchanyekaifaqu"},
{
"firstLetter":"q",
"id":"370881000000",
"jianpin":"qfs",
"level":3,
"name":"曲阜市",
"pid":"370800000000",
"pinyin":"qufushi"},
{
"firstLetter":"z",
"id":"370883000000",
"jianpin":"zcs",
"level":3,
"name":"邹城市",
"pid":"370800000000",
"pinyin":"zouchengshi"}],

[{
"firstLetter":"s",
"id":"370901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"370900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"t",
"id":"370902000000",
"jianpin":"tsq",
"level":3,
"name":"泰山区",
"pid":"370900000000",
"pinyin":"taishanqu"},
{
"firstLetter":"d",
"id":"370911000000",
"jianpin":"dyq",
"level":3,
"name":"岱岳区",
"pid":"370900000000",
"pinyin":"daiyuequ"},
{
"firstLetter":"n",
"id":"370921000000",
"jianpin":"nyx",
"level":3,
"name":"宁阳县",
"pid":"370900000000",
"pinyin":"ningyangxian"},
{
"firstLetter":"d",
"id":"370923000000",
"jianpin":"dpx",
"level":3,
"name":"东平县",
"pid":"370900000000",
"pinyin":"dongpingxian"},
{
"firstLetter":"x",
"id":"370982000000",
"jianpin":"xts",
"level":3,
"name":"新泰市",
"pid":"370900000000",
"pinyin":"xintaishi"},
{
"firstLetter":"f",
"id":"370983000000",
"jianpin":"fcs",
"level":3,
"name":"肥城市",
"pid":"370900000000",
"pinyin":"feichengshi"}],

[{
"firstLetter":"s",
"id":"371001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"371000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"371002000000",
"jianpin":"hcq",
"level":3,
"name":"环翠区",
"pid":"371000000000",
"pinyin":"huancuiqu"},
{
"firstLetter":"w",
"id":"371003000000",
"jianpin":"wdq",
"level":3,
"name":"文登区",
"pid":"371000000000",
"pinyin":"wendengqu"},
{
"firstLetter":"w",
"id":"371071000000",
"jianpin":"whhjgjscykfq",
"level":3,
"name":"威海火炬高技术产业开发区",
"pid":"371000000000",
"pinyin":"weihaihuojugaojishuchanyekaifaqu"},
{
"firstLetter":"w",
"id":"371072000000",
"jianpin":"whjjjskfq",
"level":3,
"name":"威海经济技术开发区",
"pid":"371000000000",
"pinyin":"weihaijingjijishukaifaqu"},
{
"firstLetter":"w",
"id":"371073000000",
"jianpin":"whlgjjjskfq",
"level":3,
"name":"威海临港经济技术开发区",
"pid":"371000000000",
"pinyin":"weihailingangjingjijishukaifaqu"},
{
"firstLetter":"r",
"id":"371082000000",
"jianpin":"rcs",
"level":3,
"name":"荣成市",
"pid":"371000000000",
"pinyin":"rongchengshi"},
{
"firstLetter":"r",
"id":"371083000000",
"jianpin":"rss",
"level":3,
"name":"乳山市",
"pid":"371000000000",
"pinyin":"rushanshi"}],

[{
"firstLetter":"s",
"id":"371101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"371100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"371102000000",
"jianpin":"dgq",
"level":3,
"name":"东港区",
"pid":"371100000000",
"pinyin":"donggangqu"},
{
"firstLetter":"l",
"id":"371103000000",
"jianpin":"lsq",
"level":3,
"name":"岚山区",
"pid":"371100000000",
"pinyin":"lanshanqu"},
{
"firstLetter":"w",
"id":"371121000000",
"jianpin":"wlx",
"level":3,
"name":"五莲县",
"pid":"371100000000",
"pinyin":"wulianxian"},
{
"firstLetter":"j",
"id":"371122000000",
"jianpin":"jx",
"level":3,
"name":"莒县",
"pid":"371100000000",
"pinyin":"juxian"},
{
"firstLetter":"r",
"id":"371171000000",
"jianpin":"rzjjjskfq",
"level":3,
"name":"日照经济技术开发区",
"pid":"371100000000",
"pinyin":"rizhaojingjijishukaifaqu"},
{
"firstLetter":"r",
"id":"371172000000",
"jianpin":"rzgjhyc",
"level":3,
"name":"日照国际海洋城",
"pid":"371100000000",
"pinyin":"rizhaoguojihaiyangcheng"}],

[{
"firstLetter":"s",
"id":"371201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"371200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"371202000000",
"jianpin":"lcq",
"level":3,
"name":"莱城区",
"pid":"371200000000",
"pinyin":"laichengqu"},
{
"firstLetter":"g",
"id":"371203000000",
"jianpin":"gcq",
"level":3,
"name":"钢城区",
"pid":"371200000000",
"pinyin":"gangchengqu"}],

[{
"firstLetter":"s",
"id":"371301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"371300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"371302000000",
"jianpin":"lsq",
"level":3,
"name":"兰山区",
"pid":"371300000000",
"pinyin":"lanshanqu"},
{
"firstLetter":"l",
"id":"371311000000",
"jianpin":"lzq",
"level":3,
"name":"罗庄区",
"pid":"371300000000",
"pinyin":"luozhuangqu"},
{
"firstLetter":"h",
"id":"371312000000",
"jianpin":"hdq",
"level":3,
"name":"河东区",
"pid":"371300000000",
"pinyin":"hedongqu"},
{
"firstLetter":"y",
"id":"371321000000",
"jianpin":"ynx",
"level":3,
"name":"沂南县",
"pid":"371300000000",
"pinyin":"yinanxian"},
{
"firstLetter":"t",
"id":"371322000000",
"jianpin":"tcx",
"level":3,
"name":"郯城县",
"pid":"371300000000",
"pinyin":"tanchengxian"},
{
"firstLetter":"y",
"id":"371323000000",
"jianpin":"ysx",
"level":3,
"name":"沂水县",
"pid":"371300000000",
"pinyin":"yishuixian"},
{
"firstLetter":"l",
"id":"371324000000",
"jianpin":"llx",
"level":3,
"name":"兰陵县",
"pid":"371300000000",
"pinyin":"lanlingxian"},
{
"firstLetter":"f",
"id":"371325000000",
"jianpin":"fx",
"level":3,
"name":"费县",
"pid":"371300000000",
"pinyin":"feixian"},
{
"firstLetter":"p",
"id":"371326000000",
"jianpin":"pyx",
"level":3,
"name":"平邑县",
"pid":"371300000000",
"pinyin":"pingyixian"},
{
"firstLetter":"j",
"id":"371327000000",
"jianpin":"jnx",
"level":3,
"name":"莒南县",
"pid":"371300000000",
"pinyin":"junanxian"},
{
"firstLetter":"m",
"id":"371328000000",
"jianpin":"myx",
"level":3,
"name":"蒙阴县",
"pid":"371300000000",
"pinyin":"mengyinxian"},
{
"firstLetter":"l",
"id":"371329000000",
"jianpin":"lsx",
"level":3,
"name":"临沭县",
"pid":"371300000000",
"pinyin":"linshuxian"},
{
"firstLetter":"l",
"id":"371371000000",
"jianpin":"lygxjscykfq",
"level":3,
"name":"临沂高新技术产业开发区",
"pid":"371300000000",
"pinyin":"linyigaoxinjishuchanyekaifaqu"},
{
"firstLetter":"l",
"id":"371372000000",
"jianpin":"lyjjjskfq",
"level":3,
"name":"临沂经济技术开发区",
"pid":"371300000000",
"pinyin":"linyijingjijishukaifaqu"},
{
"firstLetter":"l",
"id":"371373000000",
"jianpin":"lylgjjkfq",
"level":3,
"name":"临沂临港经济开发区",
"pid":"371300000000",
"pinyin":"linyilingangjingjikaifaqu"}],

[{
"firstLetter":"s",
"id":"371401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"371400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"371402000000",
"jianpin":"dcq",
"level":3,
"name":"德城区",
"pid":"371400000000",
"pinyin":"dechengqu"},
{
"firstLetter":"l",
"id":"371403000000",
"jianpin":"lcq",
"level":3,
"name":"陵城区",
"pid":"371400000000",
"pinyin":"lingchengqu"},
{
"firstLetter":"n",
"id":"371422000000",
"jianpin":"njx",
"level":3,
"name":"宁津县",
"pid":"371400000000",
"pinyin":"ningjinxian"},
{
"firstLetter":"q",
"id":"371423000000",
"jianpin":"qyx",
"level":3,
"name":"庆云县",
"pid":"371400000000",
"pinyin":"qingyunxian"},
{
"firstLetter":"l",
"id":"371424000000",
"jianpin":"lyx",
"level":3,
"name":"临邑县",
"pid":"371400000000",
"pinyin":"linyixian"},
{
"firstLetter":"q",
"id":"371425000000",
"jianpin":"qhx",
"level":3,
"name":"齐河县",
"pid":"371400000000",
"pinyin":"qihexian"},
{
"firstLetter":"p",
"id":"371426000000",
"jianpin":"pyx",
"level":3,
"name":"平原县",
"pid":"371400000000",
"pinyin":"pingyuanxian"},
{
"firstLetter":"x",
"id":"371427000000",
"jianpin":"xjx",
"level":3,
"name":"夏津县",
"pid":"371400000000",
"pinyin":"xiajinxian"},
{
"firstLetter":"w",
"id":"371428000000",
"jianpin":"wcx",
"level":3,
"name":"武城县",
"pid":"371400000000",
"pinyin":"wuchengxian"},
{
"firstLetter":"d",
"id":"371471000000",
"jianpin":"dzjjjskfq",
"level":3,
"name":"德州经济技术开发区",
"pid":"371400000000",
"pinyin":"dezhoujingjijishukaifaqu"},
{
"firstLetter":"d",
"id":"371472000000",
"jianpin":"dzyhjjkfq",
"level":3,
"name":"德州运河经济开发区",
"pid":"371400000000",
"pinyin":"dezhouyunhejingjikaifaqu"},
{
"firstLetter":"l",
"id":"371481000000",
"jianpin":"lls",
"level":3,
"name":"乐陵市",
"pid":"371400000000",
"pinyin":"lelingshi"},
{
"firstLetter":"y",
"id":"371482000000",
"jianpin":"ycs",
"level":3,
"name":"禹城市",
"pid":"371400000000",
"pinyin":"yuchengshi"}],

[{
"firstLetter":"s",
"id":"371501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"371500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"371502000000",
"jianpin":"dcfq",
"level":3,
"name":"东昌府区",
"pid":"371500000000",
"pinyin":"dongchangfuqu"},
{
"firstLetter":"y",
"id":"371521000000",
"jianpin":"ygx",
"level":3,
"name":"阳谷县",
"pid":"371500000000",
"pinyin":"yangguxian"},
{
"firstLetter":"x",
"id":"371522000000",
"jianpin":"xx",
"level":3,
"name":"莘县",
"pid":"371500000000",
"pinyin":"xinxian"},
{
"firstLetter":"c",
"id":"371523000000",
"jianpin":"cpx",
"level":3,
"name":"茌平县",
"pid":"371500000000",
"pinyin":"chipingxian"},
{
"firstLetter":"d",
"id":"371524000000",
"jianpin":"dax",
"level":3,
"name":"东阿县",
"pid":"371500000000",
"pinyin":"dongaxian"},
{
"firstLetter":"g",
"id":"371525000000",
"jianpin":"gx",
"level":3,
"name":"冠县",
"pid":"371500000000",
"pinyin":"guanxian"},
{
"firstLetter":"g",
"id":"371526000000",
"jianpin":"gtx",
"level":3,
"name":"高唐县",
"pid":"371500000000",
"pinyin":"gaotangxian"},
{
"firstLetter":"l",
"id":"371581000000",
"jianpin":"lqs",
"level":3,
"name":"临清市",
"pid":"371500000000",
"pinyin":"linqingshi"}],

[{
"firstLetter":"s",
"id":"371601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"371600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"b",
"id":"371602000000",
"jianpin":"bcq",
"level":3,
"name":"滨城区",
"pid":"371600000000",
"pinyin":"binchengqu"},
{
"firstLetter":"z",
"id":"371603000000",
"jianpin":"zhq",
"level":3,
"name":"沾化区",
"pid":"371600000000",
"pinyin":"zhanhuaqu"},
{
"firstLetter":"h",
"id":"371621000000",
"jianpin":"hmx",
"level":3,
"name":"惠民县",
"pid":"371600000000",
"pinyin":"huiminxian"},
{
"firstLetter":"y",
"id":"371622000000",
"jianpin":"yxx",
"level":3,
"name":"阳信县",
"pid":"371600000000",
"pinyin":"yangxinxian"},
{
"firstLetter":"w",
"id":"371623000000",
"jianpin":"wdx",
"level":3,
"name":"无棣县",
"pid":"371600000000",
"pinyin":"wudixian"},
{
"firstLetter":"b",
"id":"371625000000",
"jianpin":"bxx",
"level":3,
"name":"博兴县",
"pid":"371600000000",
"pinyin":"boxingxian"},
{
"firstLetter":"z",
"id":"371626000000",
"jianpin":"zpx",
"level":3,
"name":"邹平县",
"pid":"371600000000",
"pinyin":"zoupingxian"}],

[{
"firstLetter":"s",
"id":"371701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"371700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"m",
"id":"371702000000",
"jianpin":"mdq",
"level":3,
"name":"牡丹区",
"pid":"371700000000",
"pinyin":"mudanqu"},
{
"firstLetter":"d",
"id":"371703000000",
"jianpin":"dtq",
"level":3,
"name":"定陶区",
"pid":"371700000000",
"pinyin":"dingtaoqu"},
{
"firstLetter":"c",
"id":"371721000000",
"jianpin":"cx",
"level":3,
"name":"曹县",
"pid":"371700000000",
"pinyin":"caoxian"},
{
"firstLetter":"d",
"id":"371722000000",
"jianpin":"dx",
"level":3,
"name":"单县",
"pid":"371700000000",
"pinyin":"danxian"},
{
"firstLetter":"c",
"id":"371723000000",
"jianpin":"cwx",
"level":3,
"name":"成武县",
"pid":"371700000000",
"pinyin":"chengwuxian"},
{
"firstLetter":"j",
"id":"371724000000",
"jianpin":"jyx",
"level":3,
"name":"巨野县",
"pid":"371700000000",
"pinyin":"juyexian"},
{
"firstLetter":"y",
"id":"371725000000",
"jianpin":"ycx",
"level":3,
"name":"郓城县",
"pid":"371700000000",
"pinyin":"yunchengxian"},
{
"firstLetter":"j",
"id":"371726000000",
"jianpin":"jcx",
"level":3,
"name":"鄄城县",
"pid":"371700000000",
"pinyin":"juanchengxian"},
{
"firstLetter":"d",
"id":"371728000000",
"jianpin":"dmx",
"level":3,
"name":"东明县",
"pid":"371700000000",
"pinyin":"dongmingxian"},
{
"firstLetter":"h",
"id":"371771000000",
"jianpin":"hzjjjskfq",
"level":3,
"name":"菏泽经济技术开发区",
"pid":"371700000000",
"pinyin":"hezejingjijishukaifaqu"},
{
"firstLetter":"h",
"id":"371772000000",
"jianpin":"hzgxjskfq",
"level":3,
"name":"菏泽高新技术开发区",
"pid":"371700000000",
"pinyin":"hezegaoxinjishukaifaqu"}]],



[
[{
"firstLetter":"s",
"id":"410101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"410100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"z",
"id":"410102000000",
"jianpin":"zyq",
"level":3,
"name":"中原区",
"pid":"410100000000",
"pinyin":"zhongyuanqu"},
{
"firstLetter":"e",
"id":"410103000000",
"jianpin":"eqq",
"level":3,
"name":"二七区",
"pid":"410100000000",
"pinyin":"erqiqu"},
{
"firstLetter":"g",
"id":"410104000000",
"jianpin":"gchzq",
"level":3,
"name":"管城回族区",
"pid":"410100000000",
"pinyin":"guanchenghuizuqu"},
{
"firstLetter":"j",
"id":"410105000000",
"jianpin":"jsq",
"level":3,
"name":"金水区",
"pid":"410100000000",
"pinyin":"jinshuiqu"},
{
"firstLetter":"s",
"id":"410106000000",
"jianpin":"sjq",
"level":3,
"name":"上街区",
"pid":"410100000000",
"pinyin":"shangjiequ"},
{
"firstLetter":"h",
"id":"410108000000",
"jianpin":"hjq",
"level":3,
"name":"惠济区",
"pid":"410100000000",
"pinyin":"huijiqu"},
{
"firstLetter":"z",
"id":"410122000000",
"jianpin":"zmx",
"level":3,
"name":"中牟县",
"pid":"410100000000",
"pinyin":"zhongmouxian"},
{
"firstLetter":"z",
"id":"410171000000",
"jianpin":"zzjjjskfq",
"level":3,
"name":"郑州经济技术开发区",
"pid":"410100000000",
"pinyin":"zhengzhoujingjijishukaifaqu"},
{
"firstLetter":"z",
"id":"410172000000",
"jianpin":"zzgxjscykfq",
"level":3,
"name":"郑州高新技术产业开发区",
"pid":"410100000000",
"pinyin":"zhengzhougaoxinjishuchanyekaifaqu"},
{
"firstLetter":"z",
"id":"410173000000",
"jianpin":"zzhkgjjzhsyq",
"level":3,
"name":"郑州航空港经济综合实验区",
"pid":"410100000000",
"pinyin":"zhengzhouhangkonggangjingjizongheshiyanqu"},
{
"firstLetter":"g",
"id":"410181000000",
"jianpin":"gys",
"level":3,
"name":"巩义市",
"pid":"410100000000",
"pinyin":"gongyishi"},
{
"firstLetter":"y",
"id":"410182000000",
"jianpin":"yys",
"level":3,
"name":"荥阳市",
"pid":"410100000000",
"pinyin":"yingyangshi"},
{
"firstLetter":"x",
"id":"410183000000",
"jianpin":"xms",
"level":3,
"name":"新密市",
"pid":"410100000000",
"pinyin":"xinmishi"},
{
"firstLetter":"x",
"id":"410184000000",
"jianpin":"xzs",
"level":3,
"name":"新郑市",
"pid":"410100000000",
"pinyin":"xinzhengshi"},
{
"firstLetter":"d",
"id":"410185000000",
"jianpin":"dfs",
"level":3,
"name":"登封市",
"pid":"410100000000",
"pinyin":"dengfengshi"}],

[{
"firstLetter":"s",
"id":"410201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"410200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"410202000000",
"jianpin":"ltq",
"level":3,
"name":"龙亭区",
"pid":"410200000000",
"pinyin":"longtingqu"},
{
"firstLetter":"s",
"id":"410203000000",
"jianpin":"shhzq",
"level":3,
"name":"顺河回族区",
"pid":"410200000000",
"pinyin":"shunhehuizuqu"},
{
"firstLetter":"g",
"id":"410204000000",
"jianpin":"glq",
"level":3,
"name":"鼓楼区",
"pid":"410200000000",
"pinyin":"gulouqu"},
{
"firstLetter":"y",
"id":"410205000000",
"jianpin":"ywtq",
"level":3,
"name":"禹王台区",
"pid":"410200000000",
"pinyin":"yuwangtaiqu"},
{
"firstLetter":"x",
"id":"410212000000",
"jianpin":"xfq",
"level":3,
"name":"祥符区",
"pid":"410200000000",
"pinyin":"xiangfuqu"},
{
"firstLetter":"q",
"id":"410221000000",
"jianpin":"qx",
"level":3,
"name":"杞县",
"pid":"410200000000",
"pinyin":"qixian"},
{
"firstLetter":"t",
"id":"410222000000",
"jianpin":"txx",
"level":3,
"name":"通许县",
"pid":"410200000000",
"pinyin":"tongxuxian"},
{
"firstLetter":"w",
"id":"410223000000",
"jianpin":"wsx",
"level":3,
"name":"尉氏县",
"pid":"410200000000",
"pinyin":"weishixian"},
{
"firstLetter":"l",
"id":"410225000000",
"jianpin":"lkx",
"level":3,
"name":"兰考县",
"pid":"410200000000",
"pinyin":"lankaoxian"}],

[{
"firstLetter":"s",
"id":"410301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"410300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"410302000000",
"jianpin":"lcq",
"level":3,
"name":"老城区",
"pid":"410300000000",
"pinyin":"laochengqu"},
{
"firstLetter":"x",
"id":"410303000000",
"jianpin":"xgq",
"level":3,
"name":"西工区",
"pid":"410300000000",
"pinyin":"xigongqu"},
{
"firstLetter":"e",
"id":"410304000000",
"jianpin":"ehhzq",
"level":3,
"name":"瀍河回族区",
"pid":"410300000000",
"pinyin":"ehehuizuqu"},
{
"firstLetter":"j",
"id":"410305000000",
"jianpin":"jxq",
"level":3,
"name":"涧西区",
"pid":"410300000000",
"pinyin":"jianxiqu"},
{
"firstLetter":"j",
"id":"410306000000",
"jianpin":"jlq",
"level":3,
"name":"吉利区",
"pid":"410300000000",
"pinyin":"jiliqu"},
{
"firstLetter":"l",
"id":"410311000000",
"jianpin":"llq",
"level":3,
"name":"洛龙区",
"pid":"410300000000",
"pinyin":"luolongqu"},
{
"firstLetter":"m",
"id":"410322000000",
"jianpin":"mjx",
"level":3,
"name":"孟津县",
"pid":"410300000000",
"pinyin":"mengjinxian"},
{
"firstLetter":"x",
"id":"410323000000",
"jianpin":"xax",
"level":3,
"name":"新安县",
"pid":"410300000000",
"pinyin":"xinanxian"},
{
"firstLetter":"l",
"id":"410324000000",
"jianpin":"lcx",
"level":3,
"name":"栾川县",
"pid":"410300000000",
"pinyin":"luanchuanxian"},
{
"firstLetter":"s",
"id":"410325000000",
"jianpin":"sx",
"level":3,
"name":"嵩县",
"pid":"410300000000",
"pinyin":"songxian"},
{
"firstLetter":"r",
"id":"410326000000",
"jianpin":"ryx",
"level":3,
"name":"汝阳县",
"pid":"410300000000",
"pinyin":"ruyangxian"},
{
"firstLetter":"y",
"id":"410327000000",
"jianpin":"yyx",
"level":3,
"name":"宜阳县",
"pid":"410300000000",
"pinyin":"yiyangxian"},
{
"firstLetter":"l",
"id":"410328000000",
"jianpin":"lnx",
"level":3,
"name":"洛宁县",
"pid":"410300000000",
"pinyin":"luoningxian"},
{
"firstLetter":"y",
"id":"410329000000",
"jianpin":"ycx",
"level":3,
"name":"伊川县",
"pid":"410300000000",
"pinyin":"yichuanxian"},
{
"firstLetter":"l",
"id":"410371000000",
"jianpin":"lygxjscykfq",
"level":3,
"name":"洛阳高新技术产业开发区",
"pid":"410300000000",
"pinyin":"luoyanggaoxinjishuchanyekaifaqu"},
{
"firstLetter":"y",
"id":"410381000000",
"jianpin":"yss",
"level":3,
"name":"偃师市",
"pid":"410300000000",
"pinyin":"yanshishi"}],

[{
"firstLetter":"s",
"id":"410401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"410400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"410402000000",
"jianpin":"xhq",
"level":3,
"name":"新华区",
"pid":"410400000000",
"pinyin":"xinhuaqu"},
{
"firstLetter":"w",
"id":"410403000000",
"jianpin":"wdq",
"level":3,
"name":"卫东区",
"pid":"410400000000",
"pinyin":"weidongqu"},
{
"firstLetter":"s",
"id":"410404000000",
"jianpin":"slq",
"level":3,
"name":"石龙区",
"pid":"410400000000",
"pinyin":"shilongqu"},
{
"firstLetter":"z",
"id":"410411000000",
"jianpin":"zhq",
"level":3,
"name":"湛河区",
"pid":"410400000000",
"pinyin":"zhanhequ"},
{
"firstLetter":"b",
"id":"410421000000",
"jianpin":"bfx",
"level":3,
"name":"宝丰县",
"pid":"410400000000",
"pinyin":"baofengxian"},
{
"firstLetter":"y",
"id":"410422000000",
"jianpin":"yx",
"level":3,
"name":"叶县",
"pid":"410400000000",
"pinyin":"yexian"},
{
"firstLetter":"l",
"id":"410423000000",
"jianpin":"lsx",
"level":3,
"name":"鲁山县",
"pid":"410400000000",
"pinyin":"lushanxian"},
{
"firstLetter":"j",
"id":"410425000000",
"jianpin":"jx",
"level":3,
"name":"郏县",
"pid":"410400000000",
"pinyin":"jiaxian"},
{
"firstLetter":"p",
"id":"410471000000",
"jianpin":"pdsgxjscykfq",
"level":3,
"name":"平顶山高新技术产业开发区",
"pid":"410400000000",
"pinyin":"pingdingshangaoxinjishuchanyekaifaqu"},
{
"firstLetter":"p",
"id":"410472000000",
"jianpin":"pdssxcq",
"level":3,
"name":"平顶山市新城区",
"pid":"410400000000",
"pinyin":"pingdingshanshixinchengqu"},
{
"firstLetter":"w",
"id":"410481000000",
"jianpin":"wgs",
"level":3,
"name":"舞钢市",
"pid":"410400000000",
"pinyin":"wugangshi"},
{
"firstLetter":"r",
"id":"410482000000",
"jianpin":"rzs",
"level":3,
"name":"汝州市",
"pid":"410400000000",
"pinyin":"ruzhoushi"}],

[{
"firstLetter":"s",
"id":"410501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"410500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"410502000000",
"jianpin":"wfq",
"level":3,
"name":"文峰区",
"pid":"410500000000",
"pinyin":"wenfengqu"},
{
"firstLetter":"b",
"id":"410503000000",
"jianpin":"bgq",
"level":3,
"name":"北关区",
"pid":"410500000000",
"pinyin":"beiguanqu"},
{
"firstLetter":"y",
"id":"410505000000",
"jianpin":"ydq",
"level":3,
"name":"殷都区",
"pid":"410500000000",
"pinyin":"yindouqu"},
{
"firstLetter":"l",
"id":"410506000000",
"jianpin":"laq",
"level":3,
"name":"龙安区",
"pid":"410500000000",
"pinyin":"longanqu"},
{
"firstLetter":"a",
"id":"410522000000",
"jianpin":"ayx",
"level":3,
"name":"安阳县",
"pid":"410500000000",
"pinyin":"anyangxian"},
{
"firstLetter":"t",
"id":"410523000000",
"jianpin":"tyx",
"level":3,
"name":"汤阴县",
"pid":"410500000000",
"pinyin":"tangyinxian"},
{
"firstLetter":"h",
"id":"410526000000",
"jianpin":"hx",
"level":3,
"name":"滑县",
"pid":"410500000000",
"pinyin":"huaxian"},
{
"firstLetter":"n",
"id":"410527000000",
"jianpin":"nhx",
"level":3,
"name":"内黄县",
"pid":"410500000000",
"pinyin":"neihuangxian"},
{
"firstLetter":"a",
"id":"410571000000",
"jianpin":"aygxjscykfq",
"level":3,
"name":"安阳高新技术产业开发区",
"pid":"410500000000",
"pinyin":"anyanggaoxinjishuchanyekaifaqu"},
{
"firstLetter":"l",
"id":"410581000000",
"jianpin":"lzs",
"level":3,
"name":"林州市",
"pid":"410500000000",
"pinyin":"linzhoushi"}],

[{
"firstLetter":"s",
"id":"410601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"410600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"410602000000",
"jianpin":"hsq",
"level":3,
"name":"鹤山区",
"pid":"410600000000",
"pinyin":"heshanqu"},
{
"firstLetter":"s",
"id":"410603000000",
"jianpin":"scq",
"level":3,
"name":"山城区",
"pid":"410600000000",
"pinyin":"shanchengqu"},
{
"firstLetter":"q",
"id":"410611000000",
"jianpin":"qbq",
"level":3,
"name":"淇滨区",
"pid":"410600000000",
"pinyin":"qibinqu"},
{
"firstLetter":"j",
"id":"410621000000",
"jianpin":"jx",
"level":3,
"name":"浚县",
"pid":"410600000000",
"pinyin":"junxian"},
{
"firstLetter":"q",
"id":"410622000000",
"jianpin":"qx",
"level":3,
"name":"淇县",
"pid":"410600000000",
"pinyin":"qixian"},
{
"firstLetter":"h",
"id":"410671000000",
"jianpin":"hbjjjskfq",
"level":3,
"name":"鹤壁经济技术开发区",
"pid":"410600000000",
"pinyin":"hebijingjijishukaifaqu"}],

[{
"firstLetter":"s",
"id":"410701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"410700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"410702000000",
"jianpin":"hqq",
"level":3,
"name":"红旗区",
"pid":"410700000000",
"pinyin":"hongqiqu"},
{
"firstLetter":"w",
"id":"410703000000",
"jianpin":"wbq",
"level":3,
"name":"卫滨区",
"pid":"410700000000",
"pinyin":"weibinqu"},
{
"firstLetter":"f",
"id":"410704000000",
"jianpin":"fqq",
"level":3,
"name":"凤泉区",
"pid":"410700000000",
"pinyin":"fengquanqu"},
{
"firstLetter":"m",
"id":"410711000000",
"jianpin":"myq",
"level":3,
"name":"牧野区",
"pid":"410700000000",
"pinyin":"muyequ"},
{
"firstLetter":"x",
"id":"410721000000",
"jianpin":"xxx",
"level":3,
"name":"新乡县",
"pid":"410700000000",
"pinyin":"xinxiangxian"},
{
"firstLetter":"h",
"id":"410724000000",
"jianpin":"hjx",
"level":3,
"name":"获嘉县",
"pid":"410700000000",
"pinyin":"huojiaxian"},
{
"firstLetter":"y",
"id":"410725000000",
"jianpin":"yyx",
"level":3,
"name":"原阳县",
"pid":"410700000000",
"pinyin":"yuanyangxian"},
{
"firstLetter":"y",
"id":"410726000000",
"jianpin":"yjx",
"level":3,
"name":"延津县",
"pid":"410700000000",
"pinyin":"yanjinxian"},
{
"firstLetter":"f",
"id":"410727000000",
"jianpin":"fqx",
"level":3,
"name":"封丘县",
"pid":"410700000000",
"pinyin":"fengqiuxian"},
{
"firstLetter":"z",
"id":"410728000000",
"jianpin":"zyx",
"level":3,
"name":"长垣县",
"pid":"410700000000",
"pinyin":"zhangyuanxian"},
{
"firstLetter":"x",
"id":"410771000000",
"jianpin":"xxgxjscykfq",
"level":3,
"name":"新乡高新技术产业开发区",
"pid":"410700000000",
"pinyin":"xinxianggaoxinjishuchanyekaifaqu"},
{
"firstLetter":"x",
"id":"410772000000",
"jianpin":"xxjjjskfq",
"level":3,
"name":"新乡经济技术开发区",
"pid":"410700000000",
"pinyin":"xinxiangjingjijishukaifaqu"},
{
"firstLetter":"x",
"id":"410773000000",
"jianpin":"xxspycxythsfq",
"level":3,
"name":"新乡市平原城乡一体化示范区",
"pid":"410700000000",
"pinyin":"xinxiangshipingyuanchengxiangyitihuashifanqu"},
{
"firstLetter":"w",
"id":"410781000000",
"jianpin":"whs",
"level":3,
"name":"卫辉市",
"pid":"410700000000",
"pinyin":"weihuishi"},
{
"firstLetter":"h",
"id":"410782000000",
"jianpin":"hxs",
"level":3,
"name":"辉县市",
"pid":"410700000000",
"pinyin":"huixianshi"}],

[{
"firstLetter":"s",
"id":"410801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"410800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"410802000000",
"jianpin":"jfq",
"level":3,
"name":"解放区",
"pid":"410800000000",
"pinyin":"jiefangqu"},
{
"firstLetter":"z",
"id":"410803000000",
"jianpin":"zzq",
"level":3,
"name":"中站区",
"pid":"410800000000",
"pinyin":"zhongzhanqu"},
{
"firstLetter":"m",
"id":"410804000000",
"jianpin":"mcq",
"level":3,
"name":"马村区",
"pid":"410800000000",
"pinyin":"macunqu"},
{
"firstLetter":"s",
"id":"410811000000",
"jianpin":"syq",
"level":3,
"name":"山阳区",
"pid":"410800000000",
"pinyin":"shanyangqu"},
{
"firstLetter":"x",
"id":"410821000000",
"jianpin":"xwx",
"level":3,
"name":"修武县",
"pid":"410800000000",
"pinyin":"xiuwuxian"},
{
"firstLetter":"b",
"id":"410822000000",
"jianpin":"bax",
"level":3,
"name":"博爱县",
"pid":"410800000000",
"pinyin":"boaixian"},
{
"firstLetter":"w",
"id":"410823000000",
"jianpin":"wzx",
"level":3,
"name":"武陟县",
"pid":"410800000000",
"pinyin":"wuzhixian"},
{
"firstLetter":"w",
"id":"410825000000",
"jianpin":"wx",
"level":3,
"name":"温县",
"pid":"410800000000",
"pinyin":"wenxian"},
{
"firstLetter":"j",
"id":"410871000000",
"jianpin":"jzcxythsfq",
"level":3,
"name":"焦作城乡一体化示范区",
"pid":"410800000000",
"pinyin":"jiaozuochengxiangyitihuashifanqu"},
{
"firstLetter":"q",
"id":"410882000000",
"jianpin":"qys",
"level":3,
"name":"沁阳市",
"pid":"410800000000",
"pinyin":"qinyangshi"},
{
"firstLetter":"m",
"id":"410883000000",
"jianpin":"mzs",
"level":3,
"name":"孟州市",
"pid":"410800000000",
"pinyin":"mengzhoushi"}],

[{
"firstLetter":"s",
"id":"410901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"410900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"410902000000",
"jianpin":"hlq",
"level":3,
"name":"华龙区",
"pid":"410900000000",
"pinyin":"hualongqu"},
{
"firstLetter":"q",
"id":"410922000000",
"jianpin":"qfx",
"level":3,
"name":"清丰县",
"pid":"410900000000",
"pinyin":"qingfengxian"},
{
"firstLetter":"n",
"id":"410923000000",
"jianpin":"nlx",
"level":3,
"name":"南乐县",
"pid":"410900000000",
"pinyin":"nanlexian"},
{
"firstLetter":"f",
"id":"410926000000",
"jianpin":"fx",
"level":3,
"name":"范县",
"pid":"410900000000",
"pinyin":"fanxian"},
{
"firstLetter":"t",
"id":"410927000000",
"jianpin":"tqx",
"level":3,
"name":"台前县",
"pid":"410900000000",
"pinyin":"taiqianxian"},
{
"firstLetter":"p",
"id":"410928000000",
"jianpin":"pyx",
"level":3,
"name":"濮阳县",
"pid":"410900000000",
"pinyin":"puyangxian"},
{
"firstLetter":"h",
"id":"410971000000",
"jianpin":"hnpygyyq",
"level":3,
"name":"河南濮阳工业园区",
"pid":"410900000000",
"pinyin":"henanpuyanggongyeyuanqu"},
{
"firstLetter":"p",
"id":"410972000000",
"jianpin":"pyjjjskfq",
"level":3,
"name":"濮阳经济技术开发区",
"pid":"410900000000",
"pinyin":"puyangjingjijishukaifaqu"}],

[{
"firstLetter":"s",
"id":"411001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"411000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"411002000000",
"jianpin":"wdq",
"level":3,
"name":"魏都区",
"pid":"411000000000",
"pinyin":"weidouqu"},
{
"firstLetter":"j",
"id":"411003000000",
"jianpin":"jaq",
"level":3,
"name":"建安区",
"pid":"411000000000",
"pinyin":"jiananqu"},
{
"firstLetter":"y",
"id":"411024000000",
"jianpin":"ylx",
"level":3,
"name":"鄢陵县",
"pid":"411000000000",
"pinyin":"yanlingxian"},
{
"firstLetter":"x",
"id":"411025000000",
"jianpin":"xcx",
"level":3,
"name":"襄城县",
"pid":"411000000000",
"pinyin":"xiangchengxian"},
{
"firstLetter":"x",
"id":"411071000000",
"jianpin":"xcjjjskfq",
"level":3,
"name":"许昌经济技术开发区",
"pid":"411000000000",
"pinyin":"xuchangjingjijishukaifaqu"},
{
"firstLetter":"y",
"id":"411081000000",
"jianpin":"yzs",
"level":3,
"name":"禹州市",
"pid":"411000000000",
"pinyin":"yuzhoushi"},
{
"firstLetter":"z",
"id":"411082000000",
"jianpin":"zgs",
"level":3,
"name":"长葛市",
"pid":"411000000000",
"pinyin":"zhanggeshi"}],

[{
"firstLetter":"s",
"id":"411101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"411100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"411102000000",
"jianpin":"yhq",
"level":3,
"name":"源汇区",
"pid":"411100000000",
"pinyin":"yuanhuiqu"},
{
"firstLetter":"y",
"id":"411103000000",
"jianpin":"ycq",
"level":3,
"name":"郾城区",
"pid":"411100000000",
"pinyin":"yanchengqu"},
{
"firstLetter":"z",
"id":"411104000000",
"jianpin":"zlq",
"level":3,
"name":"召陵区",
"pid":"411100000000",
"pinyin":"zhaolingqu"},
{
"firstLetter":"w",
"id":"411121000000",
"jianpin":"wyx",
"level":3,
"name":"舞阳县",
"pid":"411100000000",
"pinyin":"wuyangxian"},
{
"firstLetter":"l",
"id":"411122000000",
"jianpin":"lyx",
"level":3,
"name":"临颍县",
"pid":"411100000000",
"pinyin":"linyingxian"},
{
"firstLetter":"l",
"id":"411171000000",
"jianpin":"lhjjjskfq",
"level":3,
"name":"漯河经济技术开发区",
"pid":"411100000000",
"pinyin":"luohejingjijishukaifaqu"}],

[{
"firstLetter":"s",
"id":"411201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"411200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"411202000000",
"jianpin":"hbq",
"level":3,
"name":"湖滨区",
"pid":"411200000000",
"pinyin":"hubinqu"},
{
"firstLetter":"s",
"id":"411203000000",
"jianpin":"szq",
"level":3,
"name":"陕州区",
"pid":"411200000000",
"pinyin":"shanzhouqu"},
{
"firstLetter":"m",
"id":"411221000000",
"jianpin":"mcx",
"level":3,
"name":"渑池县",
"pid":"411200000000",
"pinyin":"mianchixian"},
{
"firstLetter":"l",
"id":"411224000000",
"jianpin":"lsx",
"level":3,
"name":"卢氏县",
"pid":"411200000000",
"pinyin":"lushixian"},
{
"firstLetter":"h",
"id":"411271000000",
"jianpin":"hnsmxjjkfq",
"level":3,
"name":"河南三门峡经济开发区",
"pid":"411200000000",
"pinyin":"henansanmenxiajingjikaifaqu"},
{
"firstLetter":"y",
"id":"411281000000",
"jianpin":"yms",
"level":3,
"name":"义马市",
"pid":"411200000000",
"pinyin":"yimashi"},
{
"firstLetter":"l",
"id":"411282000000",
"jianpin":"lbs",
"level":3,
"name":"灵宝市",
"pid":"411200000000",
"pinyin":"lingbaoshi"}],

[{
"firstLetter":"s",
"id":"411301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"411300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"411302000000",
"jianpin":"wcq",
"level":3,
"name":"宛城区",
"pid":"411300000000",
"pinyin":"wanchengqu"},
{
"firstLetter":"w",
"id":"411303000000",
"jianpin":"wlq",
"level":3,
"name":"卧龙区",
"pid":"411300000000",
"pinyin":"wolongqu"},
{
"firstLetter":"n",
"id":"411321000000",
"jianpin":"nzx",
"level":3,
"name":"南召县",
"pid":"411300000000",
"pinyin":"nanzhaoxian"},
{
"firstLetter":"f",
"id":"411322000000",
"jianpin":"fcx",
"level":3,
"name":"方城县",
"pid":"411300000000",
"pinyin":"fangchengxian"},
{
"firstLetter":"x",
"id":"411323000000",
"jianpin":"xxx",
"level":3,
"name":"西峡县",
"pid":"411300000000",
"pinyin":"xixiaxian"},
{
"firstLetter":"z",
"id":"411324000000",
"jianpin":"zpx",
"level":3,
"name":"镇平县",
"pid":"411300000000",
"pinyin":"zhenpingxian"},
{
"firstLetter":"n",
"id":"411325000000",
"jianpin":"nxx",
"level":3,
"name":"内乡县",
"pid":"411300000000",
"pinyin":"neixiangxian"},
{
"firstLetter":"x",
"id":"411326000000",
"jianpin":"xcx",
"level":3,
"name":"淅川县",
"pid":"411300000000",
"pinyin":"xichuanxian"},
{
"firstLetter":"s",
"id":"411327000000",
"jianpin":"sqx",
"level":3,
"name":"社旗县",
"pid":"411300000000",
"pinyin":"sheqixian"},
{
"firstLetter":"t",
"id":"411328000000",
"jianpin":"thx",
"level":3,
"name":"唐河县",
"pid":"411300000000",
"pinyin":"tanghexian"},
{
"firstLetter":"x",
"id":"411329000000",
"jianpin":"xyx",
"level":3,
"name":"新野县",
"pid":"411300000000",
"pinyin":"xinyexian"},
{
"firstLetter":"t",
"id":"411330000000",
"jianpin":"tbx",
"level":3,
"name":"桐柏县",
"pid":"411300000000",
"pinyin":"tongboxian"},
{
"firstLetter":"n",
"id":"411371000000",
"jianpin":"nygxjscykfq",
"level":3,
"name":"南阳高新技术产业开发区",
"pid":"411300000000",
"pinyin":"nanyanggaoxinjishuchanyekaifaqu"},
{
"firstLetter":"n",
"id":"411372000000",
"jianpin":"nyscxythsfq",
"level":3,
"name":"南阳市城乡一体化示范区",
"pid":"411300000000",
"pinyin":"nanyangshichengxiangyitihuashifanqu"},
{
"firstLetter":"d",
"id":"411381000000",
"jianpin":"dzs",
"level":3,
"name":"邓州市",
"pid":"411300000000",
"pinyin":"dengzhoushi"}],

[{
"firstLetter":"s",
"id":"411401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"411400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"411402000000",
"jianpin":"lyq",
"level":3,
"name":"梁园区",
"pid":"411400000000",
"pinyin":"liangyuanqu"},
{
"firstLetter":"s",
"id":"411403000000",
"jianpin":"syq",
"level":3,
"name":"睢阳区",
"pid":"411400000000",
"pinyin":"suiyangqu"},
{
"firstLetter":"m",
"id":"411421000000",
"jianpin":"mqx",
"level":3,
"name":"民权县",
"pid":"411400000000",
"pinyin":"minquanxian"},
{
"firstLetter":"s",
"id":"411422000000",
"jianpin":"sx",
"level":3,
"name":"睢县",
"pid":"411400000000",
"pinyin":"suixian"},
{
"firstLetter":"n",
"id":"411423000000",
"jianpin":"nlx",
"level":3,
"name":"宁陵县",
"pid":"411400000000",
"pinyin":"ninglingxian"},
{
"firstLetter":"z",
"id":"411424000000",
"jianpin":"zcx",
"level":3,
"name":"柘城县",
"pid":"411400000000",
"pinyin":"zhechengxian"},
{
"firstLetter":"y",
"id":"411425000000",
"jianpin":"ycx",
"level":3,
"name":"虞城县",
"pid":"411400000000",
"pinyin":"yuchengxian"},
{
"firstLetter":"x",
"id":"411426000000",
"jianpin":"xyx",
"level":3,
"name":"夏邑县",
"pid":"411400000000",
"pinyin":"xiayixian"},
{
"firstLetter":"y",
"id":"411471000000",
"jianpin":"ydzhwlcyjjq",
"level":3,
"name":"豫东综合物流产业聚集区",
"pid":"411400000000",
"pinyin":"yudongzonghewuliuchanyejujiqu"},
{
"firstLetter":"h",
"id":"411472000000",
"jianpin":"hnsqjjkfq",
"level":3,
"name":"河南商丘经济开发区",
"pid":"411400000000",
"pinyin":"henanshangqiujingjikaifaqu"},
{
"firstLetter":"y",
"id":"411481000000",
"jianpin":"ycs",
"level":3,
"name":"永城市",
"pid":"411400000000",
"pinyin":"yongchengshi"}],

[{
"firstLetter":"s",
"id":"411501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"411500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"f",
"id":"411502000000",
"jianpin":"fy",
"level":3,
"name":"浉河区",
"pid":"411500000000",
"pinyin":"fuyou"},
{
"firstLetter":"p",
"id":"411503000000",
"jianpin":"pqq",
"level":3,
"name":"平桥区",
"pid":"411500000000",
"pinyin":"pingqiaoqu"},
{
"firstLetter":"l",
"id":"411521000000",
"jianpin":"lsx",
"level":3,
"name":"罗山县",
"pid":"411500000000",
"pinyin":"luoshanxian"},
{
"firstLetter":"g",
"id":"411522000000",
"jianpin":"gsx",
"level":3,
"name":"光山县",
"pid":"411500000000",
"pinyin":"guangshanxian"},
{
"firstLetter":"x",
"id":"411523000000",
"jianpin":"xx",
"level":3,
"name":"新县",
"pid":"411500000000",
"pinyin":"xinxian"},
{
"firstLetter":"s",
"id":"411524000000",
"jianpin":"scx",
"level":3,
"name":"商城县",
"pid":"411500000000",
"pinyin":"shangchengxian"},
{
"firstLetter":"g",
"id":"411525000000",
"jianpin":"gsx",
"level":3,
"name":"固始县",
"pid":"411500000000",
"pinyin":"gushixian"},
{
"firstLetter":"h",
"id":"411526000000",
"jianpin":"hcx",
"level":3,
"name":"潢川县",
"pid":"411500000000",
"pinyin":"huangchuanxian"},
{
"firstLetter":"h",
"id":"411527000000",
"jianpin":"hbx",
"level":3,
"name":"淮滨县",
"pid":"411500000000",
"pinyin":"huaibinxian"},
{
"firstLetter":"x",
"id":"411528000000",
"jianpin":"xx",
"level":3,
"name":"息县",
"pid":"411500000000",
"pinyin":"xixian"},
{
"firstLetter":"x",
"id":"411571000000",
"jianpin":"xygxjscykfq",
"level":3,
"name":"信阳高新技术产业开发区",
"pid":"411500000000",
"pinyin":"xinyanggaoxinjishuchanyekaifaqu"}],

[{
"firstLetter":"s",
"id":"411601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"411600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"411602000000",
"jianpin":"chq",
"level":3,
"name":"川汇区",
"pid":"411600000000",
"pinyin":"chuanhuiqu"},
{
"firstLetter":"f",
"id":"411621000000",
"jianpin":"fgx",
"level":3,
"name":"扶沟县",
"pid":"411600000000",
"pinyin":"fugouxian"},
{
"firstLetter":"x",
"id":"411622000000",
"jianpin":"xhx",
"level":3,
"name":"西华县",
"pid":"411600000000",
"pinyin":"xihuaxian"},
{
"firstLetter":"s",
"id":"411623000000",
"jianpin":"ssx",
"level":3,
"name":"商水县",
"pid":"411600000000",
"pinyin":"shangshuixian"},
{
"firstLetter":"s",
"id":"411624000000",
"jianpin":"sqx",
"level":3,
"name":"沈丘县",
"pid":"411600000000",
"pinyin":"shenqiuxian"},
{
"firstLetter":"d",
"id":"411625000000",
"jianpin":"dcx",
"level":3,
"name":"郸城县",
"pid":"411600000000",
"pinyin":"danchengxian"},
{
"firstLetter":"h",
"id":"411626000000",
"jianpin":"hyx",
"level":3,
"name":"淮阳县",
"pid":"411600000000",
"pinyin":"huaiyangxian"},
{
"firstLetter":"t",
"id":"411627000000",
"jianpin":"tkx",
"level":3,
"name":"太康县",
"pid":"411600000000",
"pinyin":"taikangxian"},
{
"firstLetter":"l",
"id":"411628000000",
"jianpin":"lyx",
"level":3,
"name":"鹿邑县",
"pid":"411600000000",
"pinyin":"luyixian"},
{
"firstLetter":"h",
"id":"411671000000",
"jianpin":"hnzkjjkfq",
"level":3,
"name":"河南周口经济开发区",
"pid":"411600000000",
"pinyin":"henanzhoukoujingjikaifaqu"},
{
"firstLetter":"x",
"id":"411681000000",
"jianpin":"xcs",
"level":3,
"name":"项城市",
"pid":"411600000000",
"pinyin":"xiangchengshi"}],

[{
"firstLetter":"s",
"id":"411701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"411700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"411702000000",
"jianpin":"ycq",
"level":3,
"name":"驿城区",
"pid":"411700000000",
"pinyin":"yichengqu"},
{
"firstLetter":"x",
"id":"411721000000",
"jianpin":"xpx",
"level":3,
"name":"西平县",
"pid":"411700000000",
"pinyin":"xipingxian"},
{
"firstLetter":"s",
"id":"411722000000",
"jianpin":"scx",
"level":3,
"name":"上蔡县",
"pid":"411700000000",
"pinyin":"shangcaixian"},
{
"firstLetter":"p",
"id":"411723000000",
"jianpin":"pyx",
"level":3,
"name":"平舆县",
"pid":"411700000000",
"pinyin":"pingyuxian"},
{
"firstLetter":"z",
"id":"411724000000",
"jianpin":"zyx",
"level":3,
"name":"正阳县",
"pid":"411700000000",
"pinyin":"zhengyangxian"},
{
"firstLetter":"q",
"id":"411725000000",
"jianpin":"qsx",
"level":3,
"name":"确山县",
"pid":"411700000000",
"pinyin":"queshanxian"},
{
"firstLetter":"m",
"id":"411726000000",
"jianpin":"myx",
"level":3,
"name":"泌阳县",
"pid":"411700000000",
"pinyin":"miyangxian"},
{
"firstLetter":"r",
"id":"411727000000",
"jianpin":"rnx",
"level":3,
"name":"汝南县",
"pid":"411700000000",
"pinyin":"runanxian"},
{
"firstLetter":"s",
"id":"411728000000",
"jianpin":"spx",
"level":3,
"name":"遂平县",
"pid":"411700000000",
"pinyin":"suipingxian"},
{
"firstLetter":"x",
"id":"411729000000",
"jianpin":"xcx",
"level":3,
"name":"新蔡县",
"pid":"411700000000",
"pinyin":"xincaixian"},
{
"firstLetter":"h",
"id":"411771000000",
"jianpin":"hnzmdjjkfq",
"level":3,
"name":"河南驻马店经济开发区",
"pid":"411700000000",
"pinyin":"henanzhumadianjingjikaifaqu"}],

[{
"firstLetter":"j",
"id":"419001000000",
"jianpin":"jys",
"level":3,
"name":"济源市",
"pid":"419000000000",
"pinyin":"jiyuanshi"}]],



[
[{
"firstLetter":"s",
"id":"420101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"420100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"420102000000",
"jianpin":"jaq",
"level":3,
"name":"江岸区",
"pid":"420100000000",
"pinyin":"jianganqu"},
{
"firstLetter":"j",
"id":"420103000000",
"jianpin":"jhq",
"level":3,
"name":"江汉区",
"pid":"420100000000",
"pinyin":"jianghanqu"},
{
"firstLetter":"~",
"id":"420104000000",
"jianpin":"~kq",
"level":3,
"name":"硚口区",
"pid":"420100000000",
"pinyin":"~kouqu"},
{
"firstLetter":"h",
"id":"420105000000",
"jianpin":"hyq",
"level":3,
"name":"汉阳区",
"pid":"420100000000",
"pinyin":"hanyangqu"},
{
"firstLetter":"w",
"id":"420106000000",
"jianpin":"wcq",
"level":3,
"name":"武昌区",
"pid":"420100000000",
"pinyin":"wuchangqu"},
{
"firstLetter":"q",
"id":"420107000000",
"jianpin":"qsq",
"level":3,
"name":"青山区",
"pid":"420100000000",
"pinyin":"qingshanqu"},
{
"firstLetter":"h",
"id":"420111000000",
"jianpin":"hsq",
"level":3,
"name":"洪山区",
"pid":"420100000000",
"pinyin":"hongshanqu"},
{
"firstLetter":"d",
"id":"420112000000",
"jianpin":"dxhq",
"level":3,
"name":"东西湖区",
"pid":"420100000000",
"pinyin":"dongxihuqu"},
{
"firstLetter":"h",
"id":"420113000000",
"jianpin":"hnq",
"level":3,
"name":"汉南区",
"pid":"420100000000",
"pinyin":"hannanqu"},
{
"firstLetter":"c",
"id":"420114000000",
"jianpin":"cdq",
"level":3,
"name":"蔡甸区",
"pid":"420100000000",
"pinyin":"caidianqu"},
{
"firstLetter":"j",
"id":"420115000000",
"jianpin":"jxq",
"level":3,
"name":"江夏区",
"pid":"420100000000",
"pinyin":"jiangxiaqu"},
{
"firstLetter":"h",
"id":"420116000000",
"jianpin":"hpq",
"level":3,
"name":"黄陂区",
"pid":"420100000000",
"pinyin":"huangpoqu"},
{
"firstLetter":"x",
"id":"420117000000",
"jianpin":"xzq",
"level":3,
"name":"新洲区",
"pid":"420100000000",
"pinyin":"xinzhouqu"}],

[{
"firstLetter":"s",
"id":"420201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"420200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"420202000000",
"jianpin":"hsgq",
"level":3,
"name":"黄石港区",
"pid":"420200000000",
"pinyin":"huangshigangqu"},
{
"firstLetter":"x",
"id":"420203000000",
"jianpin":"xssq",
"level":3,
"name":"西塞山区",
"pid":"420200000000",
"pinyin":"xisaishanqu"},
{
"firstLetter":"x",
"id":"420204000000",
"jianpin":"xlq",
"level":3,
"name":"下陆区",
"pid":"420200000000",
"pinyin":"xialuqu"},
{
"firstLetter":"t",
"id":"420205000000",
"jianpin":"tsq",
"level":3,
"name":"铁山区",
"pid":"420200000000",
"pinyin":"tieshanqu"},
{
"firstLetter":"y",
"id":"420222000000",
"jianpin":"yxx",
"level":3,
"name":"阳新县",
"pid":"420200000000",
"pinyin":"yangxinxian"},
{
"firstLetter":"d",
"id":"420281000000",
"jianpin":"dys",
"level":3,
"name":"大冶市",
"pid":"420200000000",
"pinyin":"dayeshi"}],

[{
"firstLetter":"s",
"id":"420301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"420300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"m",
"id":"420302000000",
"jianpin":"mjq",
"level":3,
"name":"茅箭区",
"pid":"420300000000",
"pinyin":"maojianqu"},
{
"firstLetter":"z",
"id":"420303000000",
"jianpin":"zwq",
"level":3,
"name":"张湾区",
"pid":"420300000000",
"pinyin":"zhangwanqu"},
{
"firstLetter":"y",
"id":"420304000000",
"jianpin":"yyq",
"level":3,
"name":"郧阳区",
"pid":"420300000000",
"pinyin":"yunyangqu"},
{
"firstLetter":"y",
"id":"420322000000",
"jianpin":"yxx",
"level":3,
"name":"郧西县",
"pid":"420300000000",
"pinyin":"yunxixian"},
{
"firstLetter":"z",
"id":"420323000000",
"jianpin":"zsx",
"level":3,
"name":"竹山县",
"pid":"420300000000",
"pinyin":"zhushanxian"},
{
"firstLetter":"z",
"id":"420324000000",
"jianpin":"zxx",
"level":3,
"name":"竹溪县",
"pid":"420300000000",
"pinyin":"zhuxixian"},
{
"firstLetter":"f",
"id":"420325000000",
"jianpin":"fx",
"level":3,
"name":"房县",
"pid":"420300000000",
"pinyin":"fangxian"},
{
"firstLetter":"d",
"id":"420381000000",
"jianpin":"djks",
"level":3,
"name":"丹江口市",
"pid":"420300000000",
"pinyin":"danjiangkoushi"}],

[{
"firstLetter":"s",
"id":"420501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"420500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"420502000000",
"jianpin":"xlq",
"level":3,
"name":"西陵区",
"pid":"420500000000",
"pinyin":"xilingqu"},
{
"firstLetter":"w",
"id":"420503000000",
"jianpin":"wjgq",
"level":3,
"name":"伍家岗区",
"pid":"420500000000",
"pinyin":"wujiagangqu"},
{
"firstLetter":"d",
"id":"420504000000",
"jianpin":"djq",
"level":3,
"name":"点军区",
"pid":"420500000000",
"pinyin":"dianjunqu"},
{
"firstLetter":"V",
"id":"420505000000",
"jianpin":"Vtq",
"level":3,
"name":"猇亭区",
"pid":"420500000000",
"pinyin":"Vtingqu"},
{
"firstLetter":"y",
"id":"420506000000",
"jianpin":"ylq",
"level":3,
"name":"夷陵区",
"pid":"420500000000",
"pinyin":"yilingqu"},
{
"firstLetter":"y",
"id":"420525000000",
"jianpin":"yax",
"level":3,
"name":"远安县",
"pid":"420500000000",
"pinyin":"yuananxian"},
{
"firstLetter":"x",
"id":"420526000000",
"jianpin":"xsx",
"level":3,
"name":"兴山县",
"pid":"420500000000",
"pinyin":"xingshanxian"},
{
"firstLetter":"z",
"id":"420527000000",
"jianpin":"zgx",
"level":3,
"name":"秭归县",
"pid":"420500000000",
"pinyin":"ziguixian"},
{
"firstLetter":"z",
"id":"420528000000",
"jianpin":"zytjzzzx",
"level":3,
"name":"长阳土家族自治县",
"pid":"420500000000",
"pinyin":"zhangyangtujiazuzizhixian"},
{
"firstLetter":"w",
"id":"420529000000",
"jianpin":"wftjzzzx",
"level":3,
"name":"五峰土家族自治县",
"pid":"420500000000",
"pinyin":"wufengtujiazuzizhixian"},
{
"firstLetter":"y",
"id":"420581000000",
"jianpin":"yds",
"level":3,
"name":"宜都市",
"pid":"420500000000",
"pinyin":"yidoushi"},
{
"firstLetter":"d",
"id":"420582000000",
"jianpin":"dys",
"level":3,
"name":"当阳市",
"pid":"420500000000",
"pinyin":"dangyangshi"},
{
"firstLetter":"z",
"id":"420583000000",
"jianpin":"zjs",
"level":3,
"name":"枝江市",
"pid":"420500000000",
"pinyin":"zhijiangshi"}],

[{
"firstLetter":"s",
"id":"420601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"420600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"420602000000",
"jianpin":"xcq",
"level":3,
"name":"襄城区",
"pid":"420600000000",
"pinyin":"xiangchengqu"},
{
"firstLetter":"f",
"id":"420606000000",
"jianpin":"fcq",
"level":3,
"name":"樊城区",
"pid":"420600000000",
"pinyin":"fanchengqu"},
{
"firstLetter":"x",
"id":"420607000000",
"jianpin":"xzq",
"level":3,
"name":"襄州区",
"pid":"420600000000",
"pinyin":"xiangzhouqu"},
{
"firstLetter":"n",
"id":"420624000000",
"jianpin":"nzx",
"level":3,
"name":"南漳县",
"pid":"420600000000",
"pinyin":"nanzhangxian"},
{
"firstLetter":"g",
"id":"420625000000",
"jianpin":"gcx",
"level":3,
"name":"谷城县",
"pid":"420600000000",
"pinyin":"guchengxian"},
{
"firstLetter":"b",
"id":"420626000000",
"jianpin":"bkx",
"level":3,
"name":"保康县",
"pid":"420600000000",
"pinyin":"baokangxian"},
{
"firstLetter":"l",
"id":"420682000000",
"jianpin":"lhks",
"level":3,
"name":"老河口市",
"pid":"420600000000",
"pinyin":"laohekoushi"},
{
"firstLetter":"z",
"id":"420683000000",
"jianpin":"zys",
"level":3,
"name":"枣阳市",
"pid":"420600000000",
"pinyin":"zaoyangshi"},
{
"firstLetter":"y",
"id":"420684000000",
"jianpin":"ycs",
"level":3,
"name":"宜城市",
"pid":"420600000000",
"pinyin":"yichengshi"}],

[{
"firstLetter":"s",
"id":"420701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"420700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"420702000000",
"jianpin":"lzhq",
"level":3,
"name":"梁子湖区",
"pid":"420700000000",
"pinyin":"liangzihuqu"},
{
"firstLetter":"h",
"id":"420703000000",
"jianpin":"hrq",
"level":3,
"name":"华容区",
"pid":"420700000000",
"pinyin":"huarongqu"},
{
"firstLetter":"e",
"id":"420704000000",
"jianpin":"ecq",
"level":3,
"name":"鄂城区",
"pid":"420700000000",
"pinyin":"echengqu"}],

[{
"firstLetter":"s",
"id":"420801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"420800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"420802000000",
"jianpin":"dbq",
"level":3,
"name":"东宝区",
"pid":"420800000000",
"pinyin":"dongbaoqu"},
{
"firstLetter":"d",
"id":"420804000000",
"jianpin":"ddq",
"level":3,
"name":"掇刀区",
"pid":"420800000000",
"pinyin":"duodaoqu"},
{
"firstLetter":"j",
"id":"420821000000",
"jianpin":"jsx",
"level":3,
"name":"京山县",
"pid":"420800000000",
"pinyin":"jingshanxian"},
{
"firstLetter":"s",
"id":"420822000000",
"jianpin":"syx",
"level":3,
"name":"沙洋县",
"pid":"420800000000",
"pinyin":"shayangxian"},
{
"firstLetter":"z",
"id":"420881000000",
"jianpin":"zxs",
"level":3,
"name":"钟祥市",
"pid":"420800000000",
"pinyin":"zhongxiangshi"}],

[{
"firstLetter":"s",
"id":"420901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"420900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"420902000000",
"jianpin":"xnq",
"level":3,
"name":"孝南区",
"pid":"420900000000",
"pinyin":"xiaonanqu"},
{
"firstLetter":"x",
"id":"420921000000",
"jianpin":"xcx",
"level":3,
"name":"孝昌县",
"pid":"420900000000",
"pinyin":"xiaochangxian"},
{
"firstLetter":"d",
"id":"420922000000",
"jianpin":"dwx",
"level":3,
"name":"大悟县",
"pid":"420900000000",
"pinyin":"dawuxian"},
{
"firstLetter":"y",
"id":"420923000000",
"jianpin":"ymx",
"level":3,
"name":"云梦县",
"pid":"420900000000",
"pinyin":"yunmengxian"},
{
"firstLetter":"y",
"id":"420981000000",
"jianpin":"ycs",
"level":3,
"name":"应城市",
"pid":"420900000000",
"pinyin":"yingchengshi"},
{
"firstLetter":"a",
"id":"420982000000",
"jianpin":"als",
"level":3,
"name":"安陆市",
"pid":"420900000000",
"pinyin":"anlushi"},
{
"firstLetter":"h",
"id":"420984000000",
"jianpin":"hcs",
"level":3,
"name":"汉川市",
"pid":"420900000000",
"pinyin":"hanchuanshi"}],

[{
"firstLetter":"s",
"id":"421001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"421000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"421002000000",
"jianpin":"ssq",
"level":3,
"name":"沙市区",
"pid":"421000000000",
"pinyin":"shashiqu"},
{
"firstLetter":"j",
"id":"421003000000",
"jianpin":"jzq",
"level":3,
"name":"荆州区",
"pid":"421000000000",
"pinyin":"jingzhouqu"},
{
"firstLetter":"g",
"id":"421022000000",
"jianpin":"gax",
"level":3,
"name":"公安县",
"pid":"421000000000",
"pinyin":"gonganxian"},
{
"firstLetter":"j",
"id":"421023000000",
"jianpin":"jlx",
"level":3,
"name":"监利县",
"pid":"421000000000",
"pinyin":"jianlixian"},
{
"firstLetter":"j",
"id":"421024000000",
"jianpin":"jlx",
"level":3,
"name":"江陵县",
"pid":"421000000000",
"pinyin":"jianglingxian"},
{
"firstLetter":"j",
"id":"421071000000",
"jianpin":"jzjjjskfq",
"level":3,
"name":"荆州经济技术开发区",
"pid":"421000000000",
"pinyin":"jingzhoujingjijishukaifaqu"},
{
"firstLetter":"s",
"id":"421081000000",
"jianpin":"sss",
"level":3,
"name":"石首市",
"pid":"421000000000",
"pinyin":"shishoushi"},
{
"firstLetter":"h",
"id":"421083000000",
"jianpin":"hhs",
"level":3,
"name":"洪湖市",
"pid":"421000000000",
"pinyin":"honghushi"},
{
"firstLetter":"s",
"id":"421087000000",
"jianpin":"szs",
"level":3,
"name":"松滋市",
"pid":"421000000000",
"pinyin":"songzishi"}],

[{
"firstLetter":"s",
"id":"421101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"421100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"421102000000",
"jianpin":"hzq",
"level":3,
"name":"黄州区",
"pid":"421100000000",
"pinyin":"huangzhouqu"},
{
"firstLetter":"t",
"id":"421121000000",
"jianpin":"tfx",
"level":3,
"name":"团风县",
"pid":"421100000000",
"pinyin":"tuanfengxian"},
{
"firstLetter":"h",
"id":"421122000000",
"jianpin":"hax",
"level":3,
"name":"红安县",
"pid":"421100000000",
"pinyin":"honganxian"},
{
"firstLetter":"l",
"id":"421123000000",
"jianpin":"ltx",
"level":3,
"name":"罗田县",
"pid":"421100000000",
"pinyin":"luotianxian"},
{
"firstLetter":"y",
"id":"421124000000",
"jianpin":"ysx",
"level":3,
"name":"英山县",
"pid":"421100000000",
"pinyin":"yingshanxian"},
{
"firstLetter":"x",
"id":"421125000000",
"jianpin":"xsx",
"level":3,
"name":"浠水县",
"pid":"421100000000",
"pinyin":"xishuixian"},
{
"firstLetter":"q",
"id":"421126000000",
"jianpin":"qcx",
"level":3,
"name":"蕲春县",
"pid":"421100000000",
"pinyin":"qichunxian"},
{
"firstLetter":"h",
"id":"421127000000",
"jianpin":"hmx",
"level":3,
"name":"黄梅县",
"pid":"421100000000",
"pinyin":"huangmeixian"},
{
"firstLetter":"l",
"id":"421171000000",
"jianpin":"lghglq",
"level":3,
"name":"龙感湖管理区",
"pid":"421100000000",
"pinyin":"longganhuguanliqu"},
{
"firstLetter":"m",
"id":"421181000000",
"jianpin":"mcs",
"level":3,
"name":"麻城市",
"pid":"421100000000",
"pinyin":"machengshi"},
{
"firstLetter":"w",
"id":"421182000000",
"jianpin":"wxs",
"level":3,
"name":"武穴市",
"pid":"421100000000",
"pinyin":"wuxueshi"}],

[{
"firstLetter":"s",
"id":"421201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"421200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"421202000000",
"jianpin":"xaq",
"level":3,
"name":"咸安区",
"pid":"421200000000",
"pinyin":"xiananqu"},
{
"firstLetter":"j",
"id":"421221000000",
"jianpin":"jyx",
"level":3,
"name":"嘉鱼县",
"pid":"421200000000",
"pinyin":"jiayuxian"},
{
"firstLetter":"t",
"id":"421222000000",
"jianpin":"tcx",
"level":3,
"name":"通城县",
"pid":"421200000000",
"pinyin":"tongchengxian"},
{
"firstLetter":"c",
"id":"421223000000",
"jianpin":"cyx",
"level":3,
"name":"崇阳县",
"pid":"421200000000",
"pinyin":"chongyangxian"},
{
"firstLetter":"t",
"id":"421224000000",
"jianpin":"tsx",
"level":3,
"name":"通山县",
"pid":"421200000000",
"pinyin":"tongshanxian"},
{
"firstLetter":"c",
"id":"421281000000",
"jianpin":"cbs",
"level":3,
"name":"赤壁市",
"pid":"421200000000",
"pinyin":"chibishi"}],

[{
"firstLetter":"s",
"id":"421301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"421300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"421303000000",
"jianpin":"cdq",
"level":3,
"name":"曾都区",
"pid":"421300000000",
"pinyin":"cengdouqu"},
{
"firstLetter":"s",
"id":"421321000000",
"jianpin":"sx",
"level":3,
"name":"随县",
"pid":"421300000000",
"pinyin":"suixian"},
{
"firstLetter":"g",
"id":"421381000000",
"jianpin":"gss",
"level":3,
"name":"广水市",
"pid":"421300000000",
"pinyin":"guangshuishi"}],

[{
"firstLetter":"e",
"id":"422801000000",
"jianpin":"ess",
"level":3,
"name":"恩施市",
"pid":"422800000000",
"pinyin":"enshishi"},
{
"firstLetter":"l",
"id":"422802000000",
"jianpin":"lcs",
"level":3,
"name":"利川市",
"pid":"422800000000",
"pinyin":"lichuanshi"},
{
"firstLetter":"j",
"id":"422822000000",
"jianpin":"jsx",
"level":3,
"name":"建始县",
"pid":"422800000000",
"pinyin":"jianshixian"},
{
"firstLetter":"b",
"id":"422823000000",
"jianpin":"bdx",
"level":3,
"name":"巴东县",
"pid":"422800000000",
"pinyin":"badongxian"},
{
"firstLetter":"x",
"id":"422825000000",
"jianpin":"xex",
"level":3,
"name":"宣恩县",
"pid":"422800000000",
"pinyin":"xuanenxian"},
{
"firstLetter":"x",
"id":"422826000000",
"jianpin":"xfx",
"level":3,
"name":"咸丰县",
"pid":"422800000000",
"pinyin":"xianfengxian"},
{
"firstLetter":"l",
"id":"422827000000",
"jianpin":"lfx",
"level":3,
"name":"来凤县",
"pid":"422800000000",
"pinyin":"laifengxian"},
{
"firstLetter":"h",
"id":"422828000000",
"jianpin":"hfx",
"level":3,
"name":"鹤峰县",
"pid":"422800000000",
"pinyin":"hefengxian"}],

[{
"firstLetter":"x",
"id":"429004000000",
"jianpin":"xts",
"level":3,
"name":"仙桃市",
"pid":"429000000000",
"pinyin":"xiantaoshi"},
{
"firstLetter":"q",
"id":"429005000000",
"jianpin":"qjs",
"level":3,
"name":"潜江市",
"pid":"429000000000",
"pinyin":"qianjiangshi"},
{
"firstLetter":"t",
"id":"429006000000",
"jianpin":"tms",
"level":3,
"name":"天门市",
"pid":"429000000000",
"pinyin":"tianmenshi"},
{
"firstLetter":"s",
"id":"429021000000",
"jianpin":"snjlq",
"level":3,
"name":"神农架林区",
"pid":"429000000000",
"pinyin":"shennongjialinqu"}]],



[
[{
"firstLetter":"s",
"id":"430101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"430100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"f",
"id":"430102000000",
"jianpin":"frq",
"level":3,
"name":"芙蓉区",
"pid":"430100000000",
"pinyin":"furongqu"},
{
"firstLetter":"t",
"id":"430103000000",
"jianpin":"txq",
"level":3,
"name":"天心区",
"pid":"430100000000",
"pinyin":"tianxinqu"},
{
"firstLetter":"y",
"id":"430104000000",
"jianpin":"ylq",
"level":3,
"name":"岳麓区",
"pid":"430100000000",
"pinyin":"yueluqu"},
{
"firstLetter":"k",
"id":"430105000000",
"jianpin":"kfq",
"level":3,
"name":"开福区",
"pid":"430100000000",
"pinyin":"kaifuqu"},
{
"firstLetter":"y",
"id":"430111000000",
"jianpin":"yhq",
"level":3,
"name":"雨花区",
"pid":"430100000000",
"pinyin":"yuhuaqu"},
{
"firstLetter":"w",
"id":"430112000000",
"jianpin":"wcq",
"level":3,
"name":"望城区",
"pid":"430100000000",
"pinyin":"wangchengqu"},
{
"firstLetter":"z",
"id":"430121000000",
"jianpin":"zsx",
"level":3,
"name":"长沙县",
"pid":"430100000000",
"pinyin":"zhangshaxian"},
{
"firstLetter":"l",
"id":"430181000000",
"jianpin":"lys",
"level":3,
"name":"浏阳市",
"pid":"430100000000",
"pinyin":"liuyangshi"},
{
"firstLetter":"n",
"id":"430182000000",
"jianpin":"nxs",
"level":3,
"name":"宁乡市",
"pid":"430100000000",
"pinyin":"ningxiangshi"}],

[{
"firstLetter":"s",
"id":"430201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"430200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"430202000000",
"jianpin":"htq",
"level":3,
"name":"荷塘区",
"pid":"430200000000",
"pinyin":"hetangqu"},
{
"firstLetter":"l",
"id":"430203000000",
"jianpin":"lsq",
"level":3,
"name":"芦淞区",
"pid":"430200000000",
"pinyin":"lusongqu"},
{
"firstLetter":"s",
"id":"430204000000",
"jianpin":"sfq",
"level":3,
"name":"石峰区",
"pid":"430200000000",
"pinyin":"shifengqu"},
{
"firstLetter":"t",
"id":"430211000000",
"jianpin":"tyq",
"level":3,
"name":"天元区",
"pid":"430200000000",
"pinyin":"tianyuanqu"},
{
"firstLetter":"z",
"id":"430221000000",
"jianpin":"zzx",
"level":3,
"name":"株洲县",
"pid":"430200000000",
"pinyin":"zhuzhouxian"},
{
"firstLetter":"y",
"id":"430223000000",
"jianpin":"yx",
"level":3,
"name":"攸县",
"pid":"430200000000",
"pinyin":"youxian"},
{
"firstLetter":"c",
"id":"430224000000",
"jianpin":"clx",
"level":3,
"name":"茶陵县",
"pid":"430200000000",
"pinyin":"chalingxian"},
{
"firstLetter":"y",
"id":"430225000000",
"jianpin":"ylx",
"level":3,
"name":"炎陵县",
"pid":"430200000000",
"pinyin":"yanlingxian"},
{
"firstLetter":"y",
"id":"430271000000",
"jianpin":"ylsfq",
"level":3,
"name":"云龙示范区",
"pid":"430200000000",
"pinyin":"yunlongshifanqu"},
{
"firstLetter":"l",
"id":"430281000000",
"jianpin":"lls",
"level":3,
"name":"醴陵市",
"pid":"430200000000",
"pinyin":"lilingshi"}],

[{
"firstLetter":"s",
"id":"430301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"430300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"430302000000",
"jianpin":"yhq",
"level":3,
"name":"雨湖区",
"pid":"430300000000",
"pinyin":"yuhuqu"},
{
"firstLetter":"y",
"id":"430304000000",
"jianpin":"ytq",
"level":3,
"name":"岳塘区",
"pid":"430300000000",
"pinyin":"yuetangqu"},
{
"firstLetter":"x",
"id":"430321000000",
"jianpin":"xtx",
"level":3,
"name":"湘潭县",
"pid":"430300000000",
"pinyin":"xiangtanxian"},
{
"firstLetter":"h",
"id":"430371000000",
"jianpin":"hnxtgxjscyyq",
"level":3,
"name":"湖南湘潭高新技术产业园区",
"pid":"430300000000",
"pinyin":"hunanxiangtangaoxinjishuchanyeyuanqu"},
{
"firstLetter":"x",
"id":"430372000000",
"jianpin":"xtzssfq",
"level":3,
"name":"湘潭昭山示范区",
"pid":"430300000000",
"pinyin":"xiangtanzhaoshanshifanqu"},
{
"firstLetter":"x",
"id":"430373000000",
"jianpin":"xtjhsfq",
"level":3,
"name":"湘潭九华示范区",
"pid":"430300000000",
"pinyin":"xiangtanjiuhuashifanqu"},
{
"firstLetter":"x",
"id":"430381000000",
"jianpin":"xxs",
"level":3,
"name":"湘乡市",
"pid":"430300000000",
"pinyin":"xiangxiangshi"},
{
"firstLetter":"s",
"id":"430382000000",
"jianpin":"sss",
"level":3,
"name":"韶山市",
"pid":"430300000000",
"pinyin":"shaoshanshi"}],

[{
"firstLetter":"s",
"id":"430401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"430400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"z",
"id":"430405000000",
"jianpin":"zhq",
"level":3,
"name":"珠晖区",
"pid":"430400000000",
"pinyin":"zhuhuiqu"},
{
"firstLetter":"y",
"id":"430406000000",
"jianpin":"yfq",
"level":3,
"name":"雁峰区",
"pid":"430400000000",
"pinyin":"yanfengqu"},
{
"firstLetter":"s",
"id":"430407000000",
"jianpin":"sgq",
"level":3,
"name":"石鼓区",
"pid":"430400000000",
"pinyin":"shiguqu"},
{
"firstLetter":"z",
"id":"430408000000",
"jianpin":"zxq",
"level":3,
"name":"蒸湘区",
"pid":"430400000000",
"pinyin":"zhengxiangqu"},
{
"firstLetter":"n",
"id":"430412000000",
"jianpin":"nyq",
"level":3,
"name":"南岳区",
"pid":"430400000000",
"pinyin":"nanyuequ"},
{
"firstLetter":"h",
"id":"430421000000",
"jianpin":"hyx",
"level":3,
"name":"衡阳县",
"pid":"430400000000",
"pinyin":"hengyangxian"},
{
"firstLetter":"h",
"id":"430422000000",
"jianpin":"hnx",
"level":3,
"name":"衡南县",
"pid":"430400000000",
"pinyin":"hengnanxian"},
{
"firstLetter":"h",
"id":"430423000000",
"jianpin":"hsx",
"level":3,
"name":"衡山县",
"pid":"430400000000",
"pinyin":"hengshanxian"},
{
"firstLetter":"h",
"id":"430424000000",
"jianpin":"hdx",
"level":3,
"name":"衡东县",
"pid":"430400000000",
"pinyin":"hengdongxian"},
{
"firstLetter":"q",
"id":"430426000000",
"jianpin":"qdx",
"level":3,
"name":"祁东县",
"pid":"430400000000",
"pinyin":"qidongxian"},
{
"firstLetter":"h",
"id":"430471000000",
"jianpin":"hyzhbsq",
"level":3,
"name":"衡阳综合保税区",
"pid":"430400000000",
"pinyin":"hengyangzonghebaoshuiqu"},
{
"firstLetter":"h",
"id":"430472000000",
"jianpin":"hnhygxjscyyq",
"level":3,
"name":"湖南衡阳高新技术产业园区",
"pid":"430400000000",
"pinyin":"hunanhengyanggaoxinjishuchanyeyuanqu"},
{
"firstLetter":"h",
"id":"430473000000",
"jianpin":"hnhysmjjkfq",
"level":3,
"name":"湖南衡阳松木经济开发区",
"pid":"430400000000",
"pinyin":"hunanhengyangsongmujingjikaifaqu"},
{
"firstLetter":"l",
"id":"430481000000",
"jianpin":"lys",
"level":3,
"name":"耒阳市",
"pid":"430400000000",
"pinyin":"leiyangshi"},
{
"firstLetter":"c",
"id":"430482000000",
"jianpin":"cns",
"level":3,
"name":"常宁市",
"pid":"430400000000",
"pinyin":"changningshi"}],

[{
"firstLetter":"s",
"id":"430501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"430500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"430502000000",
"jianpin":"sqq",
"level":3,
"name":"双清区",
"pid":"430500000000",
"pinyin":"shuangqingqu"},
{
"firstLetter":"d",
"id":"430503000000",
"jianpin":"dxq",
"level":3,
"name":"大祥区",
"pid":"430500000000",
"pinyin":"daxiangqu"},
{
"firstLetter":"b",
"id":"430511000000",
"jianpin":"btq",
"level":3,
"name":"北塔区",
"pid":"430500000000",
"pinyin":"beitaqu"},
{
"firstLetter":"s",
"id":"430521000000",
"jianpin":"sdx",
"level":3,
"name":"邵东县",
"pid":"430500000000",
"pinyin":"shaodongxian"},
{
"firstLetter":"x",
"id":"430522000000",
"jianpin":"xsx",
"level":3,
"name":"新邵县",
"pid":"430500000000",
"pinyin":"xinshaoxian"},
{
"firstLetter":"s",
"id":"430523000000",
"jianpin":"syx",
"level":3,
"name":"邵阳县",
"pid":"430500000000",
"pinyin":"shaoyangxian"},
{
"firstLetter":"l",
"id":"430524000000",
"jianpin":"lhx",
"level":3,
"name":"隆回县",
"pid":"430500000000",
"pinyin":"longhuixian"},
{
"firstLetter":"d",
"id":"430525000000",
"jianpin":"dkx",
"level":3,
"name":"洞口县",
"pid":"430500000000",
"pinyin":"dongkouxian"},
{
"firstLetter":"s",
"id":"430527000000",
"jianpin":"snx",
"level":3,
"name":"绥宁县",
"pid":"430500000000",
"pinyin":"suiningxian"},
{
"firstLetter":"x",
"id":"430528000000",
"jianpin":"xnx",
"level":3,
"name":"新宁县",
"pid":"430500000000",
"pinyin":"xinningxian"},
{
"firstLetter":"c",
"id":"430529000000",
"jianpin":"cbmzzzx",
"level":3,
"name":"城步苗族自治县",
"pid":"430500000000",
"pinyin":"chengbumiaozuzizhixian"},
{
"firstLetter":"w",
"id":"430581000000",
"jianpin":"wgs",
"level":3,
"name":"武冈市",
"pid":"430500000000",
"pinyin":"wugangshi"}],

[{
"firstLetter":"s",
"id":"430601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"430600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"430602000000",
"jianpin":"yylq",
"level":3,
"name":"岳阳楼区",
"pid":"430600000000",
"pinyin":"yueyanglouqu"},
{
"firstLetter":"y",
"id":"430603000000",
"jianpin":"yxq",
"level":3,
"name":"云溪区",
"pid":"430600000000",
"pinyin":"yunxiqu"},
{
"firstLetter":"j",
"id":"430611000000",
"jianpin":"jsq",
"level":3,
"name":"君山区",
"pid":"430600000000",
"pinyin":"junshanqu"},
{
"firstLetter":"y",
"id":"430621000000",
"jianpin":"yyx",
"level":3,
"name":"岳阳县",
"pid":"430600000000",
"pinyin":"yueyangxian"},
{
"firstLetter":"h",
"id":"430623000000",
"jianpin":"hrx",
"level":3,
"name":"华容县",
"pid":"430600000000",
"pinyin":"huarongxian"},
{
"firstLetter":"x",
"id":"430624000000",
"jianpin":"xyx",
"level":3,
"name":"湘阴县",
"pid":"430600000000",
"pinyin":"xiangyinxian"},
{
"firstLetter":"p",
"id":"430626000000",
"jianpin":"pjx",
"level":3,
"name":"平江县",
"pid":"430600000000",
"pinyin":"pingjiangxian"},
{
"firstLetter":"y",
"id":"430671000000",
"jianpin":"yysqyglq",
"level":3,
"name":"岳阳市屈原管理区",
"pid":"430600000000",
"pinyin":"yueyangshiquyuanguanliqu"},
{
"firstLetter":"m",
"id":"430681000000",
"jianpin":"mls",
"level":3,
"name":"汨罗市",
"pid":"430600000000",
"pinyin":"miluoshi"},
{
"firstLetter":"l",
"id":"430682000000",
"jianpin":"lxs",
"level":3,
"name":"临湘市",
"pid":"430600000000",
"pinyin":"linxiangshi"}],

[{
"firstLetter":"s",
"id":"430701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"430700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"430702000000",
"jianpin":"wlq",
"level":3,
"name":"武陵区",
"pid":"430700000000",
"pinyin":"wulingqu"},
{
"firstLetter":"d",
"id":"430703000000",
"jianpin":"dcq",
"level":3,
"name":"鼎城区",
"pid":"430700000000",
"pinyin":"dingchengqu"},
{
"firstLetter":"a",
"id":"430721000000",
"jianpin":"axx",
"level":3,
"name":"安乡县",
"pid":"430700000000",
"pinyin":"anxiangxian"},
{
"firstLetter":"h",
"id":"430722000000",
"jianpin":"hsx",
"level":3,
"name":"汉寿县",
"pid":"430700000000",
"pinyin":"hanshouxian"},
{
"firstLetter":"l",
"id":"430723000000",
"jianpin":"lx",
"level":3,
"name":"澧县",
"pid":"430700000000",
"pinyin":"lixian"},
{
"firstLetter":"l",
"id":"430724000000",
"jianpin":"llx",
"level":3,
"name":"临澧县",
"pid":"430700000000",
"pinyin":"linlixian"},
{
"firstLetter":"t",
"id":"430725000000",
"jianpin":"tyx",
"level":3,
"name":"桃源县",
"pid":"430700000000",
"pinyin":"taoyuanxian"},
{
"firstLetter":"s",
"id":"430726000000",
"jianpin":"smx",
"level":3,
"name":"石门县",
"pid":"430700000000",
"pinyin":"shimenxian"},
{
"firstLetter":"c",
"id":"430771000000",
"jianpin":"cdsxdtglq",
"level":3,
"name":"常德市西洞庭管理区",
"pid":"430700000000",
"pinyin":"changdeshixidongtingguanliqu"},
{
"firstLetter":"j",
"id":"430781000000",
"jianpin":"jss",
"level":3,
"name":"津市市",
"pid":"430700000000",
"pinyin":"jinshishi"}],

[{
"firstLetter":"s",
"id":"430801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"430800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"430802000000",
"jianpin":"ydq",
"level":3,
"name":"永定区",
"pid":"430800000000",
"pinyin":"yongdingqu"},
{
"firstLetter":"w",
"id":"430811000000",
"jianpin":"wlyq",
"level":3,
"name":"武陵源区",
"pid":"430800000000",
"pinyin":"wulingyuanqu"},
{
"firstLetter":"c",
"id":"430821000000",
"jianpin":"clx",
"level":3,
"name":"慈利县",
"pid":"430800000000",
"pinyin":"cilixian"},
{
"firstLetter":"s",
"id":"430822000000",
"jianpin":"szx",
"level":3,
"name":"桑植县",
"pid":"430800000000",
"pinyin":"sangzhixian"}],

[{
"firstLetter":"s",
"id":"430901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"430900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"z",
"id":"430902000000",
"jianpin":"zyq",
"level":3,
"name":"资阳区",
"pid":"430900000000",
"pinyin":"ziyangqu"},
{
"firstLetter":"h",
"id":"430903000000",
"jianpin":"hsq",
"level":3,
"name":"赫山区",
"pid":"430900000000",
"pinyin":"heshanqu"},
{
"firstLetter":"n",
"id":"430921000000",
"jianpin":"nx",
"level":3,
"name":"南县",
"pid":"430900000000",
"pinyin":"nanxian"},
{
"firstLetter":"t",
"id":"430922000000",
"jianpin":"tjx",
"level":3,
"name":"桃江县",
"pid":"430900000000",
"pinyin":"taojiangxian"},
{
"firstLetter":"a",
"id":"430923000000",
"jianpin":"ahx",
"level":3,
"name":"安化县",
"pid":"430900000000",
"pinyin":"anhuaxian"},
{
"firstLetter":"y",
"id":"430971000000",
"jianpin":"yysdthglq",
"level":3,
"name":"益阳市大通湖管理区",
"pid":"430900000000",
"pinyin":"yiyangshidatonghuguanliqu"},
{
"firstLetter":"h",
"id":"430972000000",
"jianpin":"hnyygxjscyyq",
"level":3,
"name":"湖南益阳高新技术产业园区",
"pid":"430900000000",
"pinyin":"hunanyiyanggaoxinjishuchanyeyuanqu"},
{
"firstLetter":"y",
"id":"430981000000",
"jianpin":"yjs",
"level":3,
"name":"沅江市",
"pid":"430900000000",
"pinyin":"yuanjiangshi"}],

[{
"firstLetter":"s",
"id":"431001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"431000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"b",
"id":"431002000000",
"jianpin":"bhq",
"level":3,
"name":"北湖区",
"pid":"431000000000",
"pinyin":"beihuqu"},
{
"firstLetter":"s",
"id":"431003000000",
"jianpin":"sxq",
"level":3,
"name":"苏仙区",
"pid":"431000000000",
"pinyin":"suxianqu"},
{
"firstLetter":"g",
"id":"431021000000",
"jianpin":"gyx",
"level":3,
"name":"桂阳县",
"pid":"431000000000",
"pinyin":"guiyangxian"},
{
"firstLetter":"y",
"id":"431022000000",
"jianpin":"yzx",
"level":3,
"name":"宜章县",
"pid":"431000000000",
"pinyin":"yizhangxian"},
{
"firstLetter":"y",
"id":"431023000000",
"jianpin":"yxx",
"level":3,
"name":"永兴县",
"pid":"431000000000",
"pinyin":"yongxingxian"},
{
"firstLetter":"j",
"id":"431024000000",
"jianpin":"jhx",
"level":3,
"name":"嘉禾县",
"pid":"431000000000",
"pinyin":"jiahexian"},
{
"firstLetter":"l",
"id":"431025000000",
"jianpin":"lwx",
"level":3,
"name":"临武县",
"pid":"431000000000",
"pinyin":"linwuxian"},
{
"firstLetter":"r",
"id":"431026000000",
"jianpin":"rcx",
"level":3,
"name":"汝城县",
"pid":"431000000000",
"pinyin":"ruchengxian"},
{
"firstLetter":"g",
"id":"431027000000",
"jianpin":"gdx",
"level":3,
"name":"桂东县",
"pid":"431000000000",
"pinyin":"guidongxian"},
{
"firstLetter":"a",
"id":"431028000000",
"jianpin":"arx",
"level":3,
"name":"安仁县",
"pid":"431000000000",
"pinyin":"anrenxian"},
{
"firstLetter":"z",
"id":"431081000000",
"jianpin":"zxs",
"level":3,
"name":"资兴市",
"pid":"431000000000",
"pinyin":"zixingshi"}],

[{
"firstLetter":"s",
"id":"431101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"431100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"431102000000",
"jianpin":"llq",
"level":3,
"name":"零陵区",
"pid":"431100000000",
"pinyin":"linglingqu"},
{
"firstLetter":"l",
"id":"431103000000",
"jianpin":"lstq",
"level":3,
"name":"冷水滩区",
"pid":"431100000000",
"pinyin":"lengshuitanqu"},
{
"firstLetter":"q",
"id":"431121000000",
"jianpin":"qyx",
"level":3,
"name":"祁阳县",
"pid":"431100000000",
"pinyin":"qiyangxian"},
{
"firstLetter":"d",
"id":"431122000000",
"jianpin":"dax",
"level":3,
"name":"东安县",
"pid":"431100000000",
"pinyin":"donganxian"},
{
"firstLetter":"s",
"id":"431123000000",
"jianpin":"spx",
"level":3,
"name":"双牌县",
"pid":"431100000000",
"pinyin":"shuangpaixian"},
{
"firstLetter":"d",
"id":"431124000000",
"jianpin":"dx",
"level":3,
"name":"道县",
"pid":"431100000000",
"pinyin":"daoxian"},
{
"firstLetter":"j",
"id":"431125000000",
"jianpin":"jyx",
"level":3,
"name":"江永县",
"pid":"431100000000",
"pinyin":"jiangyongxian"},
{
"firstLetter":"n",
"id":"431126000000",
"jianpin":"nyx",
"level":3,
"name":"宁远县",
"pid":"431100000000",
"pinyin":"ningyuanxian"},
{
"firstLetter":"l",
"id":"431127000000",
"jianpin":"lsx",
"level":3,
"name":"蓝山县",
"pid":"431100000000",
"pinyin":"lanshanxian"},
{
"firstLetter":"x",
"id":"431128000000",
"jianpin":"xtx",
"level":3,
"name":"新田县",
"pid":"431100000000",
"pinyin":"xintianxian"},
{
"firstLetter":"j",
"id":"431129000000",
"jianpin":"jhyzzzx",
"level":3,
"name":"江华瑶族自治县",
"pid":"431100000000",
"pinyin":"jianghuayaozuzizhixian"},
{
"firstLetter":"y",
"id":"431171000000",
"jianpin":"yzjjjskfq",
"level":3,
"name":"永州经济技术开发区",
"pid":"431100000000",
"pinyin":"yongzhoujingjijishukaifaqu"},
{
"firstLetter":"y",
"id":"431172000000",
"jianpin":"yzsjdglq",
"level":3,
"name":"永州市金洞管理区",
"pid":"431100000000",
"pinyin":"yongzhoushijindongguanliqu"},
{
"firstLetter":"y",
"id":"431173000000",
"jianpin":"yzshlwglq",
"level":3,
"name":"永州市回龙圩管理区",
"pid":"431100000000",
"pinyin":"yongzhoushihuilongweiguanliqu"}],

[{
"firstLetter":"s",
"id":"431201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"431200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"431202000000",
"jianpin":"hcq",
"level":3,
"name":"鹤城区",
"pid":"431200000000",
"pinyin":"hechengqu"},
{
"firstLetter":"z",
"id":"431221000000",
"jianpin":"zfx",
"level":3,
"name":"中方县",
"pid":"431200000000",
"pinyin":"zhongfangxian"},
{
"firstLetter":"y",
"id":"431222000000",
"jianpin":"ylx",
"level":3,
"name":"沅陵县",
"pid":"431200000000",
"pinyin":"yuanlingxian"},
{
"firstLetter":"c",
"id":"431223000000",
"jianpin":"cxx",
"level":3,
"name":"辰溪县",
"pid":"431200000000",
"pinyin":"chenxixian"},
{
"firstLetter":"x",
"id":"431224000000",
"jianpin":"xpx",
"level":3,
"name":"溆浦县",
"pid":"431200000000",
"pinyin":"xupuxian"},
{
"firstLetter":"h",
"id":"431225000000",
"jianpin":"htx",
"level":3,
"name":"会同县",
"pid":"431200000000",
"pinyin":"huitongxian"},
{
"firstLetter":"m",
"id":"431226000000",
"jianpin":"mymzzzx",
"level":3,
"name":"麻阳苗族自治县",
"pid":"431200000000",
"pinyin":"mayangmiaozuzizhixian"},
{
"firstLetter":"x",
"id":"431227000000",
"jianpin":"xhdzzzx",
"level":3,
"name":"新晃侗族自治县",
"pid":"431200000000",
"pinyin":"xinhuangdongzuzizhixian"},
{
"firstLetter":"z",
"id":"431228000000",
"jianpin":"zjdzzzx",
"level":3,
"name":"芷江侗族自治县",
"pid":"431200000000",
"pinyin":"zhijiangdongzuzizhixian"},
{
"firstLetter":"j",
"id":"431229000000",
"jianpin":"jzmzdzzzx",
"level":3,
"name":"靖州苗族侗族自治县",
"pid":"431200000000",
"pinyin":"jingzhoumiaozudongzuzizhixian"},
{
"firstLetter":"t",
"id":"431230000000",
"jianpin":"tddzzzx",
"level":3,
"name":"通道侗族自治县",
"pid":"431200000000",
"pinyin":"tongdaodongzuzizhixian"},
{
"firstLetter":"h",
"id":"431271000000",
"jianpin":"hhshjglq",
"level":3,
"name":"怀化市洪江管理区",
"pid":"431200000000",
"pinyin":"huaihuashihongjiangguanliqu"},
{
"firstLetter":"h",
"id":"431281000000",
"jianpin":"hjs",
"level":3,
"name":"洪江市",
"pid":"431200000000",
"pinyin":"hongjiangshi"}],

[{
"firstLetter":"s",
"id":"431301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"431300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"431302000000",
"jianpin":"lxq",
"level":3,
"name":"娄星区",
"pid":"431300000000",
"pinyin":"louxingqu"},
{
"firstLetter":"s",
"id":"431321000000",
"jianpin":"sfx",
"level":3,
"name":"双峰县",
"pid":"431300000000",
"pinyin":"shuangfengxian"},
{
"firstLetter":"x",
"id":"431322000000",
"jianpin":"xhx",
"level":3,
"name":"新化县",
"pid":"431300000000",
"pinyin":"xinhuaxian"},
{
"firstLetter":"l",
"id":"431381000000",
"jianpin":"lsjs",
"level":3,
"name":"冷水江市",
"pid":"431300000000",
"pinyin":"lengshuijiangshi"},
{
"firstLetter":"l",
"id":"431382000000",
"jianpin":"lys",
"level":3,
"name":"涟源市",
"pid":"431300000000",
"pinyin":"lianyuanshi"}],

[{
"firstLetter":"j",
"id":"433101000000",
"jianpin":"jss",
"level":3,
"name":"吉首市",
"pid":"433100000000",
"pinyin":"jishoushi"},
{
"firstLetter":"l",
"id":"433122000000",
"jianpin":"lxx",
"level":3,
"name":"泸溪县",
"pid":"433100000000",
"pinyin":"luxixian"},
{
"firstLetter":"f",
"id":"433123000000",
"jianpin":"fhx",
"level":3,
"name":"凤凰县",
"pid":"433100000000",
"pinyin":"fenghuangxian"},
{
"firstLetter":"h",
"id":"433124000000",
"jianpin":"hyx",
"level":3,
"name":"花垣县",
"pid":"433100000000",
"pinyin":"huayuanxian"},
{
"firstLetter":"b",
"id":"433125000000",
"jianpin":"bjx",
"level":3,
"name":"保靖县",
"pid":"433100000000",
"pinyin":"baojingxian"},
{
"firstLetter":"g",
"id":"433126000000",
"jianpin":"gzx",
"level":3,
"name":"古丈县",
"pid":"433100000000",
"pinyin":"guzhangxian"},
{
"firstLetter":"y",
"id":"433127000000",
"jianpin":"ysx",
"level":3,
"name":"永顺县",
"pid":"433100000000",
"pinyin":"yongshunxian"},
{
"firstLetter":"l",
"id":"433130000000",
"jianpin":"lsx",
"level":3,
"name":"龙山县",
"pid":"433100000000",
"pinyin":"longshanxian"},
{
"firstLetter":"h",
"id":"433172000000",
"jianpin":"hnjsjjkfq",
"level":3,
"name":"湖南吉首经济开发区",
"pid":"433100000000",
"pinyin":"hunanjishoujingjikaifaqu"},
{
"firstLetter":"h",
"id":"433173000000",
"jianpin":"hnysjjkfq",
"level":3,
"name":"湖南永顺经济开发区",
"pid":"433100000000",
"pinyin":"hunanyongshunjingjikaifaqu"}]],



[
[{
"firstLetter":"s",
"id":"440101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"440100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"440103000000",
"jianpin":"lwq",
"level":3,
"name":"荔湾区",
"pid":"440100000000",
"pinyin":"liwanqu"},
{
"firstLetter":"y",
"id":"440104000000",
"jianpin":"yxq",
"level":3,
"name":"越秀区",
"pid":"440100000000",
"pinyin":"yuexiuqu"},
{
"firstLetter":"h",
"id":"440105000000",
"jianpin":"hzq",
"level":3,
"name":"海珠区",
"pid":"440100000000",
"pinyin":"haizhuqu"},
{
"firstLetter":"t",
"id":"440106000000",
"jianpin":"thq",
"level":3,
"name":"天河区",
"pid":"440100000000",
"pinyin":"tianhequ"},
{
"firstLetter":"b",
"id":"440111000000",
"jianpin":"byq",
"level":3,
"name":"白云区",
"pid":"440100000000",
"pinyin":"baiyunqu"},
{
"firstLetter":"h",
"id":"440112000000",
"jianpin":"hpq",
"level":3,
"name":"黄埔区",
"pid":"440100000000",
"pinyin":"huangpuqu"},
{
"firstLetter":"f",
"id":"440113000000",
"jianpin":"fyq",
"level":3,
"name":"番禺区",
"pid":"440100000000",
"pinyin":"fanyuqu"},
{
"firstLetter":"h",
"id":"440114000000",
"jianpin":"hdq",
"level":3,
"name":"花都区",
"pid":"440100000000",
"pinyin":"huadouqu"},
{
"firstLetter":"n",
"id":"440115000000",
"jianpin":"nsq",
"level":3,
"name":"南沙区",
"pid":"440100000000",
"pinyin":"nanshaqu"},
{
"firstLetter":"c",
"id":"440117000000",
"jianpin":"chq",
"level":3,
"name":"从化区",
"pid":"440100000000",
"pinyin":"conghuaqu"},
{
"firstLetter":"z",
"id":"440118000000",
"jianpin":"zcq",
"level":3,
"name":"增城区",
"pid":"440100000000",
"pinyin":"zengchengqu"}],

[{
"firstLetter":"s",
"id":"440201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"440200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"440203000000",
"jianpin":"wjq",
"level":3,
"name":"武江区",
"pid":"440200000000",
"pinyin":"wujiangqu"},
{
"firstLetter":"z",
"id":"440204000000",
"jianpin":"zjq",
"level":3,
"name":"浈江区",
"pid":"440200000000",
"pinyin":"zhenjiangqu"},
{
"firstLetter":"q",
"id":"440205000000",
"jianpin":"qjq",
"level":3,
"name":"曲江区",
"pid":"440200000000",
"pinyin":"qujiangqu"},
{
"firstLetter":"s",
"id":"440222000000",
"jianpin":"sxx",
"level":3,
"name":"始兴县",
"pid":"440200000000",
"pinyin":"shixingxian"},
{
"firstLetter":"r",
"id":"440224000000",
"jianpin":"rhx",
"level":3,
"name":"仁化县",
"pid":"440200000000",
"pinyin":"renhuaxian"},
{
"firstLetter":"w",
"id":"440229000000",
"jianpin":"wyx",
"level":3,
"name":"翁源县",
"pid":"440200000000",
"pinyin":"wengyuanxian"},
{
"firstLetter":"r",
"id":"440232000000",
"jianpin":"ryyzzzx",
"level":3,
"name":"乳源瑶族自治县",
"pid":"440200000000",
"pinyin":"ruyuanyaozuzizhixian"},
{
"firstLetter":"x",
"id":"440233000000",
"jianpin":"xfx",
"level":3,
"name":"新丰县",
"pid":"440200000000",
"pinyin":"xinfengxian"},
{
"firstLetter":"l",
"id":"440281000000",
"jianpin":"lcs",
"level":3,
"name":"乐昌市",
"pid":"440200000000",
"pinyin":"lechangshi"},
{
"firstLetter":"n",
"id":"440282000000",
"jianpin":"nxs",
"level":3,
"name":"南雄市",
"pid":"440200000000",
"pinyin":"nanxiongshi"}],

[{
"firstLetter":"s",
"id":"440301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"440300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"440303000000",
"jianpin":"lhq",
"level":3,
"name":"罗湖区",
"pid":"440300000000",
"pinyin":"luohuqu"},
{
"firstLetter":"f",
"id":"440304000000",
"jianpin":"ftq",
"level":3,
"name":"福田区",
"pid":"440300000000",
"pinyin":"futianqu"},
{
"firstLetter":"n",
"id":"440305000000",
"jianpin":"nsq",
"level":3,
"name":"南山区",
"pid":"440300000000",
"pinyin":"nanshanqu"},
{
"firstLetter":"b",
"id":"440306000000",
"jianpin":"baq",
"level":3,
"name":"宝安区",
"pid":"440300000000",
"pinyin":"baoanqu"},
{
"firstLetter":"l",
"id":"440307000000",
"jianpin":"lgq",
"level":3,
"name":"龙岗区",
"pid":"440300000000",
"pinyin":"longgangqu"},
{
"firstLetter":"y",
"id":"440308000000",
"jianpin":"ytq",
"level":3,
"name":"盐田区",
"pid":"440300000000",
"pinyin":"yantianqu"},
{
"firstLetter":"l",
"id":"440309000000",
"jianpin":"lhq",
"level":3,
"name":"龙华区",
"pid":"440300000000",
"pinyin":"longhuaqu"},
{
"firstLetter":"p",
"id":"440310000000",
"jianpin":"psq",
"level":3,
"name":"坪山区",
"pid":"440300000000",
"pinyin":"pingshanqu"}],

[{
"firstLetter":"s",
"id":"440401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"440400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"440402000000",
"jianpin":"xzq",
"level":3,
"name":"香洲区",
"pid":"440400000000",
"pinyin":"xiangzhouqu"},
{
"firstLetter":"d",
"id":"440403000000",
"jianpin":"dmq",
"level":3,
"name":"斗门区",
"pid":"440400000000",
"pinyin":"doumenqu"},
{
"firstLetter":"j",
"id":"440404000000",
"jianpin":"jwq",
"level":3,
"name":"金湾区",
"pid":"440400000000",
"pinyin":"jinwanqu"}],

[{
"firstLetter":"s",
"id":"440501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"440500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"440507000000",
"jianpin":"lhq",
"level":3,
"name":"龙湖区",
"pid":"440500000000",
"pinyin":"longhuqu"},
{
"firstLetter":"j",
"id":"440511000000",
"jianpin":"jpq",
"level":3,
"name":"金平区",
"pid":"440500000000",
"pinyin":"jinpingqu"},
{
"firstLetter":"h",
"id":"440512000000",
"jianpin":"hjq",
"level":3,
"name":"濠江区",
"pid":"440500000000",
"pinyin":"haojiangqu"},
{
"firstLetter":"c",
"id":"440513000000",
"jianpin":"cyq",
"level":3,
"name":"潮阳区",
"pid":"440500000000",
"pinyin":"chaoyangqu"},
{
"firstLetter":"c",
"id":"440514000000",
"jianpin":"cnq",
"level":3,
"name":"潮南区",
"pid":"440500000000",
"pinyin":"chaonanqu"},
{
"firstLetter":"c",
"id":"440515000000",
"jianpin":"chq",
"level":3,
"name":"澄海区",
"pid":"440500000000",
"pinyin":"chenghaiqu"},
{
"firstLetter":"n",
"id":"440523000000",
"jianpin":"nax",
"level":3,
"name":"南澳县",
"pid":"440500000000",
"pinyin":"nanaoxian"}],

[{
"firstLetter":"s",
"id":"440601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"440600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"440604000000",
"jianpin":"scq",
"level":3,
"name":"禅城区",
"pid":"440600000000",
"pinyin":"shanchengqu"},
{
"firstLetter":"n",
"id":"440605000000",
"jianpin":"nhq",
"level":3,
"name":"南海区",
"pid":"440600000000",
"pinyin":"nanhaiqu"},
{
"firstLetter":"s",
"id":"440606000000",
"jianpin":"sdq",
"level":3,
"name":"顺德区",
"pid":"440600000000",
"pinyin":"shundequ"},
{
"firstLetter":"s",
"id":"440607000000",
"jianpin":"ssq",
"level":3,
"name":"三水区",
"pid":"440600000000",
"pinyin":"sanshuiqu"},
{
"firstLetter":"g",
"id":"440608000000",
"jianpin":"gmq",
"level":3,
"name":"高明区",
"pid":"440600000000",
"pinyin":"gaomingqu"}],

[{
"firstLetter":"s",
"id":"440701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"440700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"p",
"id":"440703000000",
"jianpin":"pjq",
"level":3,
"name":"蓬江区",
"pid":"440700000000",
"pinyin":"pengjiangqu"},
{
"firstLetter":"j",
"id":"440704000000",
"jianpin":"jhq",
"level":3,
"name":"江海区",
"pid":"440700000000",
"pinyin":"jianghaiqu"},
{
"firstLetter":"x",
"id":"440705000000",
"jianpin":"xhq",
"level":3,
"name":"新会区",
"pid":"440700000000",
"pinyin":"xinhuiqu"},
{
"firstLetter":"t",
"id":"440781000000",
"jianpin":"tss",
"level":3,
"name":"台山市",
"pid":"440700000000",
"pinyin":"taishanshi"},
{
"firstLetter":"k",
"id":"440783000000",
"jianpin":"kps",
"level":3,
"name":"开平市",
"pid":"440700000000",
"pinyin":"kaipingshi"},
{
"firstLetter":"h",
"id":"440784000000",
"jianpin":"hss",
"level":3,
"name":"鹤山市",
"pid":"440700000000",
"pinyin":"heshanshi"},
{
"firstLetter":"e",
"id":"440785000000",
"jianpin":"eps",
"level":3,
"name":"恩平市",
"pid":"440700000000",
"pinyin":"enpingshi"}],

[{
"firstLetter":"s",
"id":"440801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"440800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"440802000000",
"jianpin":"ckq",
"level":3,
"name":"赤坎区",
"pid":"440800000000",
"pinyin":"chikanqu"},
{
"firstLetter":"x",
"id":"440803000000",
"jianpin":"xsq",
"level":3,
"name":"霞山区",
"pid":"440800000000",
"pinyin":"xiashanqu"},
{
"firstLetter":"p",
"id":"440804000000",
"jianpin":"ptq",
"level":3,
"name":"坡头区",
"pid":"440800000000",
"pinyin":"potouqu"},
{
"firstLetter":"m",
"id":"440811000000",
"jianpin":"mzq",
"level":3,
"name":"麻章区",
"pid":"440800000000",
"pinyin":"mazhangqu"},
{
"firstLetter":"s",
"id":"440823000000",
"jianpin":"sxx",
"level":3,
"name":"遂溪县",
"pid":"440800000000",
"pinyin":"suixixian"},
{
"firstLetter":"x",
"id":"440825000000",
"jianpin":"xwx",
"level":3,
"name":"徐闻县",
"pid":"440800000000",
"pinyin":"xuwenxian"},
{
"firstLetter":"l",
"id":"440881000000",
"jianpin":"ljs",
"level":3,
"name":"廉江市",
"pid":"440800000000",
"pinyin":"lianjiangshi"},
{
"firstLetter":"l",
"id":"440882000000",
"jianpin":"lzs",
"level":3,
"name":"雷州市",
"pid":"440800000000",
"pinyin":"leizhoushi"},
{
"firstLetter":"w",
"id":"440883000000",
"jianpin":"wcs",
"level":3,
"name":"吴川市",
"pid":"440800000000",
"pinyin":"wuchuanshi"}],

[{
"firstLetter":"s",
"id":"440901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"440900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"m",
"id":"440902000000",
"jianpin":"mnq",
"level":3,
"name":"茂南区",
"pid":"440900000000",
"pinyin":"maonanqu"},
{
"firstLetter":"d",
"id":"440904000000",
"jianpin":"dbq",
"level":3,
"name":"电白区",
"pid":"440900000000",
"pinyin":"dianbaiqu"},
{
"firstLetter":"g",
"id":"440981000000",
"jianpin":"gzs",
"level":3,
"name":"高州市",
"pid":"440900000000",
"pinyin":"gaozhoushi"},
{
"firstLetter":"h",
"id":"440982000000",
"jianpin":"hzs",
"level":3,
"name":"化州市",
"pid":"440900000000",
"pinyin":"huazhoushi"},
{
"firstLetter":"x",
"id":"440983000000",
"jianpin":"xys",
"level":3,
"name":"信宜市",
"pid":"440900000000",
"pinyin":"xinyishi"}],

[{
"firstLetter":"s",
"id":"441201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"441200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"441202000000",
"jianpin":"dzq",
"level":3,
"name":"端州区",
"pid":"441200000000",
"pinyin":"duanzhouqu"},
{
"firstLetter":"d",
"id":"441203000000",
"jianpin":"dhq",
"level":3,
"name":"鼎湖区",
"pid":"441200000000",
"pinyin":"dinghuqu"},
{
"firstLetter":"g",
"id":"441204000000",
"jianpin":"gyq",
"level":3,
"name":"高要区",
"pid":"441200000000",
"pinyin":"gaoyaoqu"},
{
"firstLetter":"g",
"id":"441223000000",
"jianpin":"gnx",
"level":3,
"name":"广宁县",
"pid":"441200000000",
"pinyin":"guangningxian"},
{
"firstLetter":"h",
"id":"441224000000",
"jianpin":"hjx",
"level":3,
"name":"怀集县",
"pid":"441200000000",
"pinyin":"huaijixian"},
{
"firstLetter":"f",
"id":"441225000000",
"jianpin":"fkx",
"level":3,
"name":"封开县",
"pid":"441200000000",
"pinyin":"fengkaixian"},
{
"firstLetter":"d",
"id":"441226000000",
"jianpin":"dqx",
"level":3,
"name":"德庆县",
"pid":"441200000000",
"pinyin":"deqingxian"},
{
"firstLetter":"s",
"id":"441284000000",
"jianpin":"shs",
"level":3,
"name":"四会市",
"pid":"441200000000",
"pinyin":"sihuishi"}],

[{
"firstLetter":"s",
"id":"441301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"441300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"441302000000",
"jianpin":"hcq",
"level":3,
"name":"惠城区",
"pid":"441300000000",
"pinyin":"huichengqu"},
{
"firstLetter":"h",
"id":"441303000000",
"jianpin":"hyq",
"level":3,
"name":"惠阳区",
"pid":"441300000000",
"pinyin":"huiyangqu"},
{
"firstLetter":"b",
"id":"441322000000",
"jianpin":"blx",
"level":3,
"name":"博罗县",
"pid":"441300000000",
"pinyin":"boluoxian"},
{
"firstLetter":"h",
"id":"441323000000",
"jianpin":"hdx",
"level":3,
"name":"惠东县",
"pid":"441300000000",
"pinyin":"huidongxian"},
{
"firstLetter":"l",
"id":"441324000000",
"jianpin":"lmx",
"level":3,
"name":"龙门县",
"pid":"441300000000",
"pinyin":"longmenxian"}],

[{
"firstLetter":"s",
"id":"441401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"441400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"m",
"id":"441402000000",
"jianpin":"mjq",
"level":3,
"name":"梅江区",
"pid":"441400000000",
"pinyin":"meijiangqu"},
{
"firstLetter":"m",
"id":"441403000000",
"jianpin":"mxq",
"level":3,
"name":"梅县区",
"pid":"441400000000",
"pinyin":"meixianqu"},
{
"firstLetter":"d",
"id":"441422000000",
"jianpin":"dpx",
"level":3,
"name":"大埔县",
"pid":"441400000000",
"pinyin":"dapuxian"},
{
"firstLetter":"f",
"id":"441423000000",
"jianpin":"fsx",
"level":3,
"name":"丰顺县",
"pid":"441400000000",
"pinyin":"fengshunxian"},
{
"firstLetter":"w",
"id":"441424000000",
"jianpin":"whx",
"level":3,
"name":"五华县",
"pid":"441400000000",
"pinyin":"wuhuaxian"},
{
"firstLetter":"p",
"id":"441426000000",
"jianpin":"pyx",
"level":3,
"name":"平远县",
"pid":"441400000000",
"pinyin":"pingyuanxian"},
{
"firstLetter":"j",
"id":"441427000000",
"jianpin":"jlx",
"level":3,
"name":"蕉岭县",
"pid":"441400000000",
"pinyin":"jiaolingxian"},
{
"firstLetter":"x",
"id":"441481000000",
"jianpin":"xns",
"level":3,
"name":"兴宁市",
"pid":"441400000000",
"pinyin":"xingningshi"}],

[{
"firstLetter":"s",
"id":"441501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"441500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"441502000000",
"jianpin":"cq",
"level":3,
"name":"城区",
"pid":"441500000000",
"pinyin":"chengqu"},
{
"firstLetter":"h",
"id":"441521000000",
"jianpin":"hfx",
"level":3,
"name":"海丰县",
"pid":"441500000000",
"pinyin":"haifengxian"},
{
"firstLetter":"l",
"id":"441523000000",
"jianpin":"lhx",
"level":3,
"name":"陆河县",
"pid":"441500000000",
"pinyin":"luhexian"},
{
"firstLetter":"l",
"id":"441581000000",
"jianpin":"lfs",
"level":3,
"name":"陆丰市",
"pid":"441500000000",
"pinyin":"lufengshi"}],

[{
"firstLetter":"s",
"id":"441601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"441600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"441602000000",
"jianpin":"ycq",
"level":3,
"name":"源城区",
"pid":"441600000000",
"pinyin":"yuanchengqu"},
{
"firstLetter":"z",
"id":"441621000000",
"jianpin":"zjx",
"level":3,
"name":"紫金县",
"pid":"441600000000",
"pinyin":"zijinxian"},
{
"firstLetter":"l",
"id":"441622000000",
"jianpin":"lcx",
"level":3,
"name":"龙川县",
"pid":"441600000000",
"pinyin":"longchuanxian"},
{
"firstLetter":"l",
"id":"441623000000",
"jianpin":"lpx",
"level":3,
"name":"连平县",
"pid":"441600000000",
"pinyin":"lianpingxian"},
{
"firstLetter":"h",
"id":"441624000000",
"jianpin":"hpx",
"level":3,
"name":"和平县",
"pid":"441600000000",
"pinyin":"hepingxian"},
{
"firstLetter":"d",
"id":"441625000000",
"jianpin":"dyx",
"level":3,
"name":"东源县",
"pid":"441600000000",
"pinyin":"dongyuanxian"}],

[{
"firstLetter":"s",
"id":"441701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"441700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"441702000000",
"jianpin":"jcq",
"level":3,
"name":"江城区",
"pid":"441700000000",
"pinyin":"jiangchengqu"},
{
"firstLetter":"y",
"id":"441704000000",
"jianpin":"ydq",
"level":3,
"name":"阳东区",
"pid":"441700000000",
"pinyin":"yangdongqu"},
{
"firstLetter":"y",
"id":"441721000000",
"jianpin":"yxx",
"level":3,
"name":"阳西县",
"pid":"441700000000",
"pinyin":"yangxixian"},
{
"firstLetter":"y",
"id":"441781000000",
"jianpin":"ycs",
"level":3,
"name":"阳春市",
"pid":"441700000000",
"pinyin":"yangchunshi"}],

[{
"firstLetter":"s",
"id":"441801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"441800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"q",
"id":"441802000000",
"jianpin":"qcq",
"level":3,
"name":"清城区",
"pid":"441800000000",
"pinyin":"qingchengqu"},
{
"firstLetter":"q",
"id":"441803000000",
"jianpin":"qxq",
"level":3,
"name":"清新区",
"pid":"441800000000",
"pinyin":"qingxinqu"},
{
"firstLetter":"f",
"id":"441821000000",
"jianpin":"fgx",
"level":3,
"name":"佛冈县",
"pid":"441800000000",
"pinyin":"fogangxian"},
{
"firstLetter":"y",
"id":"441823000000",
"jianpin":"ysx",
"level":3,
"name":"阳山县",
"pid":"441800000000",
"pinyin":"yangshanxian"},
{
"firstLetter":"l",
"id":"441825000000",
"jianpin":"lszzyzzzx",
"level":3,
"name":"连山壮族瑶族自治县",
"pid":"441800000000",
"pinyin":"lianshanzhuangzuyaozuzizhixian"},
{
"firstLetter":"l",
"id":"441826000000",
"jianpin":"lnyzzzx",
"level":3,
"name":"连南瑶族自治县",
"pid":"441800000000",
"pinyin":"liannanyaozuzizhixian"},
{
"firstLetter":"y",
"id":"441881000000",
"jianpin":"yds",
"level":3,
"name":"英德市",
"pid":"441800000000",
"pinyin":"yingdeshi"},
{
"firstLetter":"l",
"id":"441882000000",
"jianpin":"lzs",
"level":3,
"name":"连州市",
"pid":"441800000000",
"pinyin":"lianzhoushi"}],

[{
"firstLetter":"d",
"id":"441900003000",
"jianpin":"dcjdbsc",
"level":4,
"name":"东城街道办事处",
"pid":"441900000000",
"pinyin":"dongchengjiedaobanshichu"},
{
"firstLetter":"n",
"id":"441900004000",
"jianpin":"ncjdbsc",
"level":4,
"name":"南城街道办事处",
"pid":"441900000000",
"pinyin":"nanchengjiedaobanshichu"},
{
"firstLetter":"w",
"id":"441900005000",
"jianpin":"wjjdbsc",
"level":4,
"name":"万江街道办事处",
"pid":"441900000000",
"pinyin":"wanjiangjiedaobanshichu"},
{
"firstLetter":"g",
"id":"441900006000",
"jianpin":"gcjdbsc",
"level":4,
"name":"莞城街道办事处",
"pid":"441900000000",
"pinyin":"guanchengjiedaobanshichu"},
{
"firstLetter":"s",
"id":"441900101000",
"jianpin":"sjz",
"level":4,
"name":"石碣镇",
"pid":"441900000000",
"pinyin":"shijiezhen"},
{
"firstLetter":"s",
"id":"441900102000",
"jianpin":"slz",
"level":4,
"name":"石龙镇",
"pid":"441900000000",
"pinyin":"shilongzhen"},
{
"firstLetter":"c",
"id":"441900103000",
"jianpin":"csz",
"level":4,
"name":"茶山镇",
"pid":"441900000000",
"pinyin":"chashanzhen"},
{
"firstLetter":"s",
"id":"441900104000",
"jianpin":"spz",
"level":4,
"name":"石排镇",
"pid":"441900000000",
"pinyin":"shipaizhen"},
{
"firstLetter":"q",
"id":"441900105000",
"jianpin":"qsz",
"level":4,
"name":"企石镇",
"pid":"441900000000",
"pinyin":"qishizhen"},
{
"firstLetter":"h",
"id":"441900106000",
"jianpin":"hlz",
"level":4,
"name":"横沥镇",
"pid":"441900000000",
"pinyin":"henglizhen"},
{
"firstLetter":"q",
"id":"441900107000",
"jianpin":"qtz",
"level":4,
"name":"桥头镇",
"pid":"441900000000",
"pinyin":"qiaotouzhen"},
{
"firstLetter":"x",
"id":"441900108000",
"jianpin":"xgz",
"level":4,
"name":"谢岗镇",
"pid":"441900000000",
"pinyin":"xiegangzhen"},
{
"firstLetter":"d",
"id":"441900109000",
"jianpin":"dkz",
"level":4,
"name":"东坑镇",
"pid":"441900000000",
"pinyin":"dongkengzhen"},
{
"firstLetter":"c",
"id":"441900110000",
"jianpin":"cpz",
"level":4,
"name":"常平镇",
"pid":"441900000000",
"pinyin":"changpingzhen"},
{
"firstLetter":"l",
"id":"441900111000",
"jianpin":"lbz",
"level":4,
"name":"寮步镇",
"pid":"441900000000",
"pinyin":"liaobuzhen"},
{
"firstLetter":"z",
"id":"441900112000",
"jianpin":"zmtz",
"level":4,
"name":"樟木头镇",
"pid":"441900000000",
"pinyin":"zhangmutouzhen"},
{
"firstLetter":"d",
"id":"441900113000",
"jianpin":"dlz",
"level":4,
"name":"大朗镇",
"pid":"441900000000",
"pinyin":"dalangzhen"},
{
"firstLetter":"h",
"id":"441900114000",
"jianpin":"hjz",
"level":4,
"name":"黄江镇",
"pid":"441900000000",
"pinyin":"huangjiangzhen"},
{
"firstLetter":"q",
"id":"441900115000",
"jianpin":"qxz",
"level":4,
"name":"清溪镇",
"pid":"441900000000",
"pinyin":"qingxizhen"},
{
"firstLetter":"t",
"id":"441900116000",
"jianpin":"tsz",
"level":4,
"name":"塘厦镇",
"pid":"441900000000",
"pinyin":"tangshazhen"},
{
"firstLetter":"f",
"id":"441900117000",
"jianpin":"fgz",
"level":4,
"name":"凤岗镇",
"pid":"441900000000",
"pinyin":"fenggangzhen"},
{
"firstLetter":"d",
"id":"441900118000",
"jianpin":"dlsz",
"level":4,
"name":"大岭山镇",
"pid":"441900000000",
"pinyin":"dalingshanzhen"},
{
"firstLetter":"z",
"id":"441900119000",
"jianpin":"zaz",
"level":4,
"name":"长安镇",
"pid":"441900000000",
"pinyin":"zhanganzhen"},
{
"firstLetter":"h",
"id":"441900121000",
"jianpin":"hmz",
"level":4,
"name":"虎门镇",
"pid":"441900000000",
"pinyin":"humenzhen"},
{
"firstLetter":"h",
"id":"441900122000",
"jianpin":"hjz",
"level":4,
"name":"厚街镇",
"pid":"441900000000",
"pinyin":"houjiezhen"},
{
"firstLetter":"s",
"id":"441900123000",
"jianpin":"stz",
"level":4,
"name":"沙田镇",
"pid":"441900000000",
"pinyin":"shatianzhen"},
{
"firstLetter":"d",
"id":"441900124000",
"jianpin":"dy",
"level":4,
"name":"道滘镇",
"pid":"441900000000",
"pinyin":"daoyang"},
{
"firstLetter":"h",
"id":"441900125000",
"jianpin":"hmz",
"level":4,
"name":"洪梅镇",
"pid":"441900000000",
"pinyin":"hongmeizhen"},
{
"firstLetter":"m",
"id":"441900126000",
"jianpin":"myz",
"level":4,
"name":"麻涌镇",
"pid":"441900000000",
"pinyin":"mayongzhen"},
{
"firstLetter":"w",
"id":"441900127000",
"jianpin":"wndz",
"level":4,
"name":"望牛墩镇",
"pid":"441900000000",
"pinyin":"wangniudunzhen"},
{
"firstLetter":"z",
"id":"441900128000",
"jianpin":"ztz",
"level":4,
"name":"中堂镇",
"pid":"441900000000",
"pinyin":"zhongtangzhen"},
{
"firstLetter":"g",
"id":"441900129000",
"jianpin":"gd",
"level":4,
"name":"高埗镇",
"pid":"441900000000",
"pinyin":"gaodun"},
{
"firstLetter":"s",
"id":"441900401000",
"jianpin":"sshgwh",
"level":4,
"name":"松山湖管委会",
"pid":"441900000000",
"pinyin":"songshanhuguanweihui"},
{
"firstLetter":"d",
"id":"441900402000",
"jianpin":"dgg",
"level":4,
"name":"东莞港",
"pid":"441900000000",
"pinyin":"dongguangang"},
{
"firstLetter":"d",
"id":"441900403000",
"jianpin":"dgsty",
"level":4,
"name":"东莞生态园",
"pid":"441900000000",
"pinyin":"dongguanshengtaiyuan"}],

[{
"firstLetter":"s",
"id":"442000001000",
"jianpin":"sqqjdbsc",
"level":4,
"name":"石岐区街道办事处",
"pid":"442000000000",
"pinyin":"shiqiqujiedaobanshichu"},
{
"firstLetter":"d",
"id":"442000002000",
"jianpin":"dqjdbsc",
"level":4,
"name":"东区街道办事处",
"pid":"442000000000",
"pinyin":"dongqujiedaobanshichu"},
{
"firstLetter":"h",
"id":"442000003000",
"jianpin":"hjkfqjdbsc",
"level":4,
"name":"火炬开发区街道办事处",
"pid":"442000000000",
"pinyin":"huojukaifaqujiedaobanshichu"},
{
"firstLetter":"x",
"id":"442000004000",
"jianpin":"xqjdbsc",
"level":4,
"name":"西区街道办事处",
"pid":"442000000000",
"pinyin":"xiqujiedaobanshichu"},
{
"firstLetter":"n",
"id":"442000005000",
"jianpin":"nqjdbsc",
"level":4,
"name":"南区街道办事处",
"pid":"442000000000",
"pinyin":"nanqujiedaobanshichu"},
{
"firstLetter":"w",
"id":"442000006000",
"jianpin":"wgsjdbsc",
"level":4,
"name":"五桂山街道办事处",
"pid":"442000000000",
"pinyin":"wuguishanjiedaobanshichu"},
{
"firstLetter":"x",
"id":"442000100000",
"jianpin":"xlz",
"level":4,
"name":"小榄镇",
"pid":"442000000000",
"pinyin":"xiaolanzhen"},
{
"firstLetter":"h",
"id":"442000101000",
"jianpin":"hpz",
"level":4,
"name":"黄圃镇",
"pid":"442000000000",
"pinyin":"huangpuzhen"},
{
"firstLetter":"m",
"id":"442000102000",
"jianpin":"mzz",
"level":4,
"name":"民众镇",
"pid":"442000000000",
"pinyin":"minzhongzhen"},
{
"firstLetter":"d",
"id":"442000103000",
"jianpin":"dfz",
"level":4,
"name":"东凤镇",
"pid":"442000000000",
"pinyin":"dongfengzhen"},
{
"firstLetter":"d",
"id":"442000104000",
"jianpin":"dsz",
"level":4,
"name":"东升镇",
"pid":"442000000000",
"pinyin":"dongshengzhen"},
{
"firstLetter":"g",
"id":"442000105000",
"jianpin":"gzz",
"level":4,
"name":"古镇镇",
"pid":"442000000000",
"pinyin":"guzhenzhen"},
{
"firstLetter":"s",
"id":"442000106000",
"jianpin":"sxz",
"level":4,
"name":"沙溪镇",
"pid":"442000000000",
"pinyin":"shaxizhen"},
{
"firstLetter":"t",
"id":"442000107000",
"jianpin":"tzz",
"level":4,
"name":"坦洲镇",
"pid":"442000000000",
"pinyin":"tanzhouzhen"},
{
"firstLetter":"g",
"id":"442000108000",
"jianpin":"gkz",
"level":4,
"name":"港口镇",
"pid":"442000000000",
"pinyin":"gangkouzhen"},
{
"firstLetter":"s",
"id":"442000109000",
"jianpin":"sjz",
"level":4,
"name":"三角镇",
"pid":"442000000000",
"pinyin":"sanjiaozhen"},
{
"firstLetter":"h",
"id":"442000110000",
"jianpin":"hlz",
"level":4,
"name":"横栏镇",
"pid":"442000000000",
"pinyin":"henglanzhen"},
{
"firstLetter":"n",
"id":"442000111000",
"jianpin":"ntz",
"level":4,
"name":"南头镇",
"pid":"442000000000",
"pinyin":"nantouzhen"},
{
"firstLetter":"f",
"id":"442000112000",
"jianpin":"fsz",
"level":4,
"name":"阜沙镇",
"pid":"442000000000",
"pinyin":"fushazhen"},
{
"firstLetter":"n",
"id":"442000113000",
"jianpin":"nlz",
"level":4,
"name":"南朗镇",
"pid":"442000000000",
"pinyin":"nanlangzhen"},
{
"firstLetter":"s",
"id":"442000114000",
"jianpin":"sxz",
"level":4,
"name":"三乡镇",
"pid":"442000000000",
"pinyin":"sanxiangzhen"},
{
"firstLetter":"b",
"id":"442000115000",
"jianpin":"bfz",
"level":4,
"name":"板芙镇",
"pid":"442000000000",
"pinyin":"banfuzhen"},
{
"firstLetter":"d",
"id":"442000116000",
"jianpin":"dyz",
"level":4,
"name":"大涌镇",
"pid":"442000000000",
"pinyin":"dayongzhen"},
{
"firstLetter":"s",
"id":"442000117000",
"jianpin":"swz",
"level":4,
"name":"神湾镇",
"pid":"442000000000",
"pinyin":"shenwanzhen"}],

[{
"firstLetter":"s",
"id":"445101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"445100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"445102000000",
"jianpin":"xqq",
"level":3,
"name":"湘桥区",
"pid":"445100000000",
"pinyin":"xiangqiaoqu"},
{
"firstLetter":"c",
"id":"445103000000",
"jianpin":"caq",
"level":3,
"name":"潮安区",
"pid":"445100000000",
"pinyin":"chaoanqu"},
{
"firstLetter":"r",
"id":"445122000000",
"jianpin":"rpx",
"level":3,
"name":"饶平县",
"pid":"445100000000",
"pinyin":"raopingxian"}],

[{
"firstLetter":"s",
"id":"445201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"445200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"r",
"id":"445202000000",
"jianpin":"rcq",
"level":3,
"name":"榕城区",
"pid":"445200000000",
"pinyin":"rongchengqu"},
{
"firstLetter":"j",
"id":"445203000000",
"jianpin":"jdq",
"level":3,
"name":"揭东区",
"pid":"445200000000",
"pinyin":"jiedongqu"},
{
"firstLetter":"j",
"id":"445222000000",
"jianpin":"jxx",
"level":3,
"name":"揭西县",
"pid":"445200000000",
"pinyin":"jiexixian"},
{
"firstLetter":"h",
"id":"445224000000",
"jianpin":"hlx",
"level":3,
"name":"惠来县",
"pid":"445200000000",
"pinyin":"huilaixian"},
{
"firstLetter":"p",
"id":"445281000000",
"jianpin":"pns",
"level":3,
"name":"普宁市",
"pid":"445200000000",
"pinyin":"puningshi"}],

[{
"firstLetter":"s",
"id":"445301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"445300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"445302000000",
"jianpin":"ycq",
"level":3,
"name":"云城区",
"pid":"445300000000",
"pinyin":"yunchengqu"},
{
"firstLetter":"y",
"id":"445303000000",
"jianpin":"yaq",
"level":3,
"name":"云安区",
"pid":"445300000000",
"pinyin":"yunanqu"},
{
"firstLetter":"x",
"id":"445321000000",
"jianpin":"xxx",
"level":3,
"name":"新兴县",
"pid":"445300000000",
"pinyin":"xinxingxian"},
{
"firstLetter":"y",
"id":"445322000000",
"jianpin":"ynx",
"level":3,
"name":"郁南县",
"pid":"445300000000",
"pinyin":"yunanxian"},
{
"firstLetter":"l",
"id":"445381000000",
"jianpin":"lds",
"level":3,
"name":"罗定市",
"pid":"445300000000",
"pinyin":"luodingshi"}]],



[

[{
"firstLetter":"s",
"id":"450101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"450100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"450102000000",
"jianpin":"xnq",
"level":3,
"name":"兴宁区",
"pid":"450100000000",
"pinyin":"xingningqu"},
{
"firstLetter":"q",
"id":"450103000000",
"jianpin":"qxq",
"level":3,
"name":"青秀区",
"pid":"450100000000",
"pinyin":"qingxiuqu"},
{
"firstLetter":"j",
"id":"450105000000",
"jianpin":"jnq",
"level":3,
"name":"江南区",
"pid":"450100000000",
"pinyin":"jiangnanqu"},
{
"firstLetter":"x",
"id":"450107000000",
"jianpin":"xxtq",
"level":3,
"name":"西乡塘区",
"pid":"450100000000",
"pinyin":"xixiangtangqu"},
{
"firstLetter":"l",
"id":"450108000000",
"jianpin":"lqq",
"level":3,
"name":"良庆区",
"pid":"450100000000",
"pinyin":"liangqingqu"},
{
"firstLetter":"y",
"id":"450109000000",
"jianpin":"ynq",
"level":3,
"name":"邕宁区",
"pid":"450100000000",
"pinyin":"yongningqu"},
{
"firstLetter":"w",
"id":"450110000000",
"jianpin":"wmq",
"level":3,
"name":"武鸣区",
"pid":"450100000000",
"pinyin":"wumingqu"},
{
"firstLetter":"l",
"id":"450123000000",
"jianpin":"lax",
"level":3,
"name":"隆安县",
"pid":"450100000000",
"pinyin":"longanxian"},
{
"firstLetter":"m",
"id":"450124000000",
"jianpin":"msx",
"level":3,
"name":"马山县",
"pid":"450100000000",
"pinyin":"mashanxian"},
{
"firstLetter":"s",
"id":"450125000000",
"jianpin":"slx",
"level":3,
"name":"上林县",
"pid":"450100000000",
"pinyin":"shanglinxian"},
{
"firstLetter":"b",
"id":"450126000000",
"jianpin":"byx",
"level":3,
"name":"宾阳县",
"pid":"450100000000",
"pinyin":"binyangxian"},
{
"firstLetter":"h",
"id":"450127000000",
"jianpin":"hx",
"level":3,
"name":"横县",
"pid":"450100000000",
"pinyin":"hengxian"}],

[{
"firstLetter":"s",
"id":"450201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"450200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"450202000000",
"jianpin":"czq",
"level":3,
"name":"城中区",
"pid":"450200000000",
"pinyin":"chengzhongqu"},
{
"firstLetter":"y",
"id":"450203000000",
"jianpin":"yfq",
"level":3,
"name":"鱼峰区",
"pid":"450200000000",
"pinyin":"yufengqu"},
{
"firstLetter":"l",
"id":"450204000000",
"jianpin":"lnq",
"level":3,
"name":"柳南区",
"pid":"450200000000",
"pinyin":"liunanqu"},
{
"firstLetter":"l",
"id":"450205000000",
"jianpin":"lbq",
"level":3,
"name":"柳北区",
"pid":"450200000000",
"pinyin":"liubeiqu"},
{
"firstLetter":"l",
"id":"450206000000",
"jianpin":"ljq",
"level":3,
"name":"柳江区",
"pid":"450200000000",
"pinyin":"liujiangqu"},
{
"firstLetter":"l",
"id":"450222000000",
"jianpin":"lcx",
"level":3,
"name":"柳城县",
"pid":"450200000000",
"pinyin":"liuchengxian"},
{
"firstLetter":"l",
"id":"450223000000",
"jianpin":"lzx",
"level":3,
"name":"鹿寨县",
"pid":"450200000000",
"pinyin":"luzhaixian"},
{
"firstLetter":"r",
"id":"450224000000",
"jianpin":"rax",
"level":3,
"name":"融安县",
"pid":"450200000000",
"pinyin":"ronganxian"},
{
"firstLetter":"r",
"id":"450225000000",
"jianpin":"rsmzzzx",
"level":3,
"name":"融水苗族自治县",
"pid":"450200000000",
"pinyin":"rongshuimiaozuzizhixian"},
{
"firstLetter":"s",
"id":"450226000000",
"jianpin":"sjdzzzx",
"level":3,
"name":"三江侗族自治县",
"pid":"450200000000",
"pinyin":"sanjiangdongzuzizhixian"}],

[{
"firstLetter":"s",
"id":"450301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"450300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"450302000000",
"jianpin":"xfq",
"level":3,
"name":"秀峰区",
"pid":"450300000000",
"pinyin":"xiufengqu"},
{
"firstLetter":"d",
"id":"450303000000",
"jianpin":"dcq",
"level":3,
"name":"叠彩区",
"pid":"450300000000",
"pinyin":"diecaiqu"},
{
"firstLetter":"x",
"id":"450304000000",
"jianpin":"xsq",
"level":3,
"name":"象山区",
"pid":"450300000000",
"pinyin":"xiangshanqu"},
{
"firstLetter":"q",
"id":"450305000000",
"jianpin":"qxq",
"level":3,
"name":"七星区",
"pid":"450300000000",
"pinyin":"qixingqu"},
{
"firstLetter":"y",
"id":"450311000000",
"jianpin":"ysq",
"level":3,
"name":"雁山区",
"pid":"450300000000",
"pinyin":"yanshanqu"},
{
"firstLetter":"l",
"id":"450312000000",
"jianpin":"lgq",
"level":3,
"name":"临桂区",
"pid":"450300000000",
"pinyin":"linguiqu"},
{
"firstLetter":"y",
"id":"450321000000",
"jianpin":"ysx",
"level":3,
"name":"阳朔县",
"pid":"450300000000",
"pinyin":"yangshuoxian"},
{
"firstLetter":"l",
"id":"450323000000",
"jianpin":"lcx",
"level":3,
"name":"灵川县",
"pid":"450300000000",
"pinyin":"lingchuanxian"},
{
"firstLetter":"q",
"id":"450324000000",
"jianpin":"qzx",
"level":3,
"name":"全州县",
"pid":"450300000000",
"pinyin":"quanzhouxian"},
{
"firstLetter":"x",
"id":"450325000000",
"jianpin":"xax",
"level":3,
"name":"兴安县",
"pid":"450300000000",
"pinyin":"xinganxian"},
{
"firstLetter":"y",
"id":"450326000000",
"jianpin":"yfx",
"level":3,
"name":"永福县",
"pid":"450300000000",
"pinyin":"yongfuxian"},
{
"firstLetter":"g",
"id":"450327000000",
"jianpin":"gyx",
"level":3,
"name":"灌阳县",
"pid":"450300000000",
"pinyin":"guanyangxian"},
{
"firstLetter":"l",
"id":"450328000000",
"jianpin":"lsgzzzx",
"level":3,
"name":"龙胜各族自治县",
"pid":"450300000000",
"pinyin":"longshenggezuzizhixian"},
{
"firstLetter":"z",
"id":"450329000000",
"jianpin":"zyx",
"level":3,
"name":"资源县",
"pid":"450300000000",
"pinyin":"ziyuanxian"},
{
"firstLetter":"p",
"id":"450330000000",
"jianpin":"plx",
"level":3,
"name":"平乐县",
"pid":"450300000000",
"pinyin":"pinglexian"},
{
"firstLetter":"l",
"id":"450331000000",
"jianpin":"lpx",
"level":3,
"name":"荔浦县",
"pid":"450300000000",
"pinyin":"lipuxian"},
{
"firstLetter":"g",
"id":"450332000000",
"jianpin":"gcyzzzx",
"level":3,
"name":"恭城瑶族自治县",
"pid":"450300000000",
"pinyin":"gongchengyaozuzizhixian"}],

[{
"firstLetter":"s",
"id":"450401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"450400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"450403000000",
"jianpin":"wxq",
"level":3,
"name":"万秀区",
"pid":"450400000000",
"pinyin":"wanxiuqu"},
{
"firstLetter":"z",
"id":"450405000000",
"jianpin":"zzq",
"level":3,
"name":"长洲区",
"pid":"450400000000",
"pinyin":"zhangzhouqu"},
{
"firstLetter":"l",
"id":"450406000000",
"jianpin":"lwq",
"level":3,
"name":"龙圩区",
"pid":"450400000000",
"pinyin":"longweiqu"},
{
"firstLetter":"c",
"id":"450421000000",
"jianpin":"cwx",
"level":3,
"name":"苍梧县",
"pid":"450400000000",
"pinyin":"cangwuxian"},
{
"firstLetter":"t",
"id":"450422000000",
"jianpin":"tx",
"level":3,
"name":"藤县",
"pid":"450400000000",
"pinyin":"tengxian"},
{
"firstLetter":"m",
"id":"450423000000",
"jianpin":"msx",
"level":3,
"name":"蒙山县",
"pid":"450400000000",
"pinyin":"mengshanxian"},
{
"firstLetter":"c",
"id":"450481000000",
"jianpin":"cxs",
"level":3,
"name":"岑溪市",
"pid":"450400000000",
"pinyin":"cenxishi"}],

[{
"firstLetter":"s",
"id":"450501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"450500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"450502000000",
"jianpin":"hcq",
"level":3,
"name":"海城区",
"pid":"450500000000",
"pinyin":"haichengqu"},
{
"firstLetter":"y",
"id":"450503000000",
"jianpin":"yhq",
"level":3,
"name":"银海区",
"pid":"450500000000",
"pinyin":"yinhaiqu"},
{
"firstLetter":"t",
"id":"450512000000",
"jianpin":"tsgq",
"level":3,
"name":"铁山港区",
"pid":"450500000000",
"pinyin":"tieshangangqu"},
{
"firstLetter":"h",
"id":"450521000000",
"jianpin":"hpx",
"level":3,
"name":"合浦县",
"pid":"450500000000",
"pinyin":"hepuxian"}],

[{
"firstLetter":"s",
"id":"450601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"450600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"g",
"id":"450602000000",
"jianpin":"gkq",
"level":3,
"name":"港口区",
"pid":"450600000000",
"pinyin":"gangkouqu"},
{
"firstLetter":"f",
"id":"450603000000",
"jianpin":"fcq",
"level":3,
"name":"防城区",
"pid":"450600000000",
"pinyin":"fangchengqu"},
{
"firstLetter":"s",
"id":"450621000000",
"jianpin":"ssx",
"level":3,
"name":"上思县",
"pid":"450600000000",
"pinyin":"shangsixian"},
{
"firstLetter":"d",
"id":"450681000000",
"jianpin":"dxs",
"level":3,
"name":"东兴市",
"pid":"450600000000",
"pinyin":"dongxingshi"}],

[{
"firstLetter":"s",
"id":"450701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"450700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"q",
"id":"450702000000",
"jianpin":"qnq",
"level":3,
"name":"钦南区",
"pid":"450700000000",
"pinyin":"qinnanqu"},
{
"firstLetter":"q",
"id":"450703000000",
"jianpin":"qbq",
"level":3,
"name":"钦北区",
"pid":"450700000000",
"pinyin":"qinbeiqu"},
{
"firstLetter":"l",
"id":"450721000000",
"jianpin":"lsx",
"level":3,
"name":"灵山县",
"pid":"450700000000",
"pinyin":"lingshanxian"},
{
"firstLetter":"p",
"id":"450722000000",
"jianpin":"pbx",
"level":3,
"name":"浦北县",
"pid":"450700000000",
"pinyin":"pubeixian"}],

[{
"firstLetter":"s",
"id":"450801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"450800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"g",
"id":"450802000000",
"jianpin":"gbq",
"level":3,
"name":"港北区",
"pid":"450800000000",
"pinyin":"gangbeiqu"},
{
"firstLetter":"g",
"id":"450803000000",
"jianpin":"gnq",
"level":3,
"name":"港南区",
"pid":"450800000000",
"pinyin":"gangnanqu"},
{
"firstLetter":"t",
"id":"450804000000",
"jianpin":"ttq",
"level":3,
"name":"覃塘区",
"pid":"450800000000",
"pinyin":"tantangqu"},
{
"firstLetter":"p",
"id":"450821000000",
"jianpin":"pnx",
"level":3,
"name":"平南县",
"pid":"450800000000",
"pinyin":"pingnanxian"},
{
"firstLetter":"g",
"id":"450881000000",
"jianpin":"gps",
"level":3,
"name":"桂平市",
"pid":"450800000000",
"pinyin":"guipingshi"}],

[{
"firstLetter":"s",
"id":"450901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"450900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"450902000000",
"jianpin":"yzq",
"level":3,
"name":"玉州区",
"pid":"450900000000",
"pinyin":"yuzhouqu"},
{
"firstLetter":"f",
"id":"450903000000",
"jianpin":"fmq",
"level":3,
"name":"福绵区",
"pid":"450900000000",
"pinyin":"fumianqu"},
{
"firstLetter":"r",
"id":"450921000000",
"jianpin":"rx",
"level":3,
"name":"容县",
"pid":"450900000000",
"pinyin":"rongxian"},
{
"firstLetter":"l",
"id":"450922000000",
"jianpin":"lcx",
"level":3,
"name":"陆川县",
"pid":"450900000000",
"pinyin":"luchuanxian"},
{
"firstLetter":"b",
"id":"450923000000",
"jianpin":"bbx",
"level":3,
"name":"博白县",
"pid":"450900000000",
"pinyin":"bobaixian"},
{
"firstLetter":"x",
"id":"450924000000",
"jianpin":"xyx",
"level":3,
"name":"兴业县",
"pid":"450900000000",
"pinyin":"xingyexian"},
{
"firstLetter":"b",
"id":"450981000000",
"jianpin":"bls",
"level":3,
"name":"北流市",
"pid":"450900000000",
"pinyin":"beiliushi"}],

[{
"firstLetter":"s",
"id":"451001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"451000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"451002000000",
"jianpin":"yjq",
"level":3,
"name":"右江区",
"pid":"451000000000",
"pinyin":"youjiangqu"},
{
"firstLetter":"t",
"id":"451021000000",
"jianpin":"tyx",
"level":3,
"name":"田阳县",
"pid":"451000000000",
"pinyin":"tianyangxian"},
{
"firstLetter":"t",
"id":"451022000000",
"jianpin":"tdx",
"level":3,
"name":"田东县",
"pid":"451000000000",
"pinyin":"tiandongxian"},
{
"firstLetter":"p",
"id":"451023000000",
"jianpin":"pgx",
"level":3,
"name":"平果县",
"pid":"451000000000",
"pinyin":"pingguoxian"},
{
"firstLetter":"d",
"id":"451024000000",
"jianpin":"dbx",
"level":3,
"name":"德保县",
"pid":"451000000000",
"pinyin":"debaoxian"},
{
"firstLetter":"n",
"id":"451026000000",
"jianpin":"npx",
"level":3,
"name":"那坡县",
"pid":"451000000000",
"pinyin":"neipoxian"},
{
"firstLetter":"l",
"id":"451027000000",
"jianpin":"lyx",
"level":3,
"name":"凌云县",
"pid":"451000000000",
"pinyin":"lingyunxian"},
{
"firstLetter":"l",
"id":"451028000000",
"jianpin":"lyx",
"level":3,
"name":"乐业县",
"pid":"451000000000",
"pinyin":"leyexian"},
{
"firstLetter":"t",
"id":"451029000000",
"jianpin":"tlx",
"level":3,
"name":"田林县",
"pid":"451000000000",
"pinyin":"tianlinxian"},
{
"firstLetter":"x",
"id":"451030000000",
"jianpin":"xlx",
"level":3,
"name":"西林县",
"pid":"451000000000",
"pinyin":"xilinxian"},
{
"firstLetter":"l",
"id":"451031000000",
"jianpin":"llgzzzx",
"level":3,
"name":"隆林各族自治县",
"pid":"451000000000",
"pinyin":"longlingezuzizhixian"},
{
"firstLetter":"j",
"id":"451081000000",
"jianpin":"jxs",
"level":3,
"name":"靖西市",
"pid":"451000000000",
"pinyin":"jingxishi"}],

[{
"firstLetter":"s",
"id":"451101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"451100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"b",
"id":"451102000000",
"jianpin":"bbq",
"level":3,
"name":"八步区",
"pid":"451100000000",
"pinyin":"babuqu"},
{
"firstLetter":"p",
"id":"451103000000",
"jianpin":"pgq",
"level":3,
"name":"平桂区",
"pid":"451100000000",
"pinyin":"pingguiqu"},
{
"firstLetter":"z",
"id":"451121000000",
"jianpin":"zpx",
"level":3,
"name":"昭平县",
"pid":"451100000000",
"pinyin":"zhaopingxian"},
{
"firstLetter":"z",
"id":"451122000000",
"jianpin":"zsx",
"level":3,
"name":"钟山县",
"pid":"451100000000",
"pinyin":"zhongshanxian"},
{
"firstLetter":"f",
"id":"451123000000",
"jianpin":"fcyzzzx",
"level":3,
"name":"富川瑶族自治县",
"pid":"451100000000",
"pinyin":"fuchuanyaozuzizhixian"}],

[{
"firstLetter":"s",
"id":"451201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"451200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"451202000000",
"jianpin":"jcjq",
"level":3,
"name":"金城江区",
"pid":"451200000000",
"pinyin":"jinchengjiangqu"},
{
"firstLetter":"y",
"id":"451203000000",
"jianpin":"yzq",
"level":3,
"name":"宜州区",
"pid":"451200000000",
"pinyin":"yizhouqu"},
{
"firstLetter":"n",
"id":"451221000000",
"jianpin":"ndx",
"level":3,
"name":"南丹县",
"pid":"451200000000",
"pinyin":"nandanxian"},
{
"firstLetter":"t",
"id":"451222000000",
"jianpin":"tex",
"level":3,
"name":"天峨县",
"pid":"451200000000",
"pinyin":"tianexian"},
{
"firstLetter":"f",
"id":"451223000000",
"jianpin":"fsx",
"level":3,
"name":"凤山县",
"pid":"451200000000",
"pinyin":"fengshanxian"},
{
"firstLetter":"d",
"id":"451224000000",
"jianpin":"dlx",
"level":3,
"name":"东兰县",
"pid":"451200000000",
"pinyin":"donglanxian"},
{
"firstLetter":"l",
"id":"451225000000",
"jianpin":"lcmlzzzx",
"level":3,
"name":"罗城仫佬族自治县",
"pid":"451200000000",
"pinyin":"luochengmulaozuzizhixian"},
{
"firstLetter":"h",
"id":"451226000000",
"jianpin":"hjmnzzzx",
"level":3,
"name":"环江毛南族自治县",
"pid":"451200000000",
"pinyin":"huanjiangmaonanzuzizhixian"},
{
"firstLetter":"b",
"id":"451227000000",
"jianpin":"bmyzzzx",
"level":3,
"name":"巴马瑶族自治县",
"pid":"451200000000",
"pinyin":"bamayaozuzizhixian"},
{
"firstLetter":"d",
"id":"451228000000",
"jianpin":"dayzzzx",
"level":3,
"name":"都安瑶族自治县",
"pid":"451200000000",
"pinyin":"douanyaozuzizhixian"},
{
"firstLetter":"d",
"id":"451229000000",
"jianpin":"dhyzzzx",
"level":3,
"name":"大化瑶族自治县",
"pid":"451200000000",
"pinyin":"dahuayaozuzizhixian"}],

[{
"firstLetter":"s",
"id":"451301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"451300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"451302000000",
"jianpin":"xbq",
"level":3,
"name":"兴宾区",
"pid":"451300000000",
"pinyin":"xingbinqu"},
{
"firstLetter":"x",
"id":"451321000000",
"jianpin":"xcx",
"level":3,
"name":"忻城县",
"pid":"451300000000",
"pinyin":"xinchengxian"},
{
"firstLetter":"x",
"id":"451322000000",
"jianpin":"xzx",
"level":3,
"name":"象州县",
"pid":"451300000000",
"pinyin":"xiangzhouxian"},
{
"firstLetter":"w",
"id":"451323000000",
"jianpin":"wxx",
"level":3,
"name":"武宣县",
"pid":"451300000000",
"pinyin":"wuxuanxian"},
{
"firstLetter":"j",
"id":"451324000000",
"jianpin":"jxyzzzx",
"level":3,
"name":"金秀瑶族自治县",
"pid":"451300000000",
"pinyin":"jinxiuyaozuzizhixian"},
{
"firstLetter":"h",
"id":"451381000000",
"jianpin":"hss",
"level":3,
"name":"合山市",
"pid":"451300000000",
"pinyin":"heshanshi"}],

[{
"firstLetter":"s",
"id":"451401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"451400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"451402000000",
"jianpin":"jzq",
"level":3,
"name":"江州区",
"pid":"451400000000",
"pinyin":"jiangzhouqu"},
{
"firstLetter":"f",
"id":"451421000000",
"jianpin":"fsx",
"level":3,
"name":"扶绥县",
"pid":"451400000000",
"pinyin":"fusuixian"},
{
"firstLetter":"n",
"id":"451422000000",
"jianpin":"nmx",
"level":3,
"name":"宁明县",
"pid":"451400000000",
"pinyin":"ningmingxian"},
{
"firstLetter":"l",
"id":"451423000000",
"jianpin":"lzx",
"level":3,
"name":"龙州县",
"pid":"451400000000",
"pinyin":"longzhouxian"},
{
"firstLetter":"d",
"id":"451424000000",
"jianpin":"dxx",
"level":3,
"name":"大新县",
"pid":"451400000000",
"pinyin":"daxinxian"},
{
"firstLetter":"t",
"id":"451425000000",
"jianpin":"tdx",
"level":3,
"name":"天等县",
"pid":"451400000000",
"pinyin":"tiandengxian"},
{
"firstLetter":"p",
"id":"451481000000",
"jianpin":"pxs",
"level":3,
"name":"凭祥市",
"pid":"451400000000",
"pinyin":"pingxiangshi"}]],



[
[{
"firstLetter":"s",
"id":"460101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"460100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"460105000000",
"jianpin":"xyq",
"level":3,
"name":"秀英区",
"pid":"460100000000",
"pinyin":"xiuyingqu"},
{
"firstLetter":"l",
"id":"460106000000",
"jianpin":"lhq",
"level":3,
"name":"龙华区",
"pid":"460100000000",
"pinyin":"longhuaqu"},
{
"firstLetter":"q",
"id":"460107000000",
"jianpin":"qsq",
"level":3,
"name":"琼山区",
"pid":"460100000000",
"pinyin":"qiongshanqu"},
{
"firstLetter":"m",
"id":"460108000000",
"jianpin":"mlq",
"level":3,
"name":"美兰区",
"pid":"460100000000",
"pinyin":"meilanqu"}],

[{
"firstLetter":"s",
"id":"460201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"460200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"460202000000",
"jianpin":"htq",
"level":3,
"name":"海棠区",
"pid":"460200000000",
"pinyin":"haitangqu"},
{
"firstLetter":"j",
"id":"460203000000",
"jianpin":"jyq",
"level":3,
"name":"吉阳区",
"pid":"460200000000",
"pinyin":"jiyangqu"},
{
"firstLetter":"t",
"id":"460204000000",
"jianpin":"tyq",
"level":3,
"name":"天涯区",
"pid":"460200000000",
"pinyin":"tianyaqu"},
{
"firstLetter":"y",
"id":"460205000000",
"jianpin":"yzq",
"level":3,
"name":"崖州区",
"pid":"460200000000",
"pinyin":"yazhouqu"}],

[{
"firstLetter":"x",
"id":"460321000000",
"jianpin":"xsqd",
"level":3,
"name":"西沙群岛",
"pid":"460300000000",
"pinyin":"xishaqundao"},
{
"firstLetter":"n",
"id":"460322000000",
"jianpin":"nsqd",
"level":3,
"name":"南沙群岛",
"pid":"460300000000",
"pinyin":"nanshaqundao"},
{
"firstLetter":"z",
"id":"460323000000",
"jianpin":"zsqdddjjqhy",
"level":3,
"name":"中沙群岛的岛礁及其海域",
"pid":"460300000000",
"pinyin":"zhongshaqundaodedaojiaojiqihaiyu"}],

[{
"firstLetter":"n",
"id":"460400100000",
"jianpin":"ndz",
"level":4,
"name":"那大镇",
"pid":"460400000000",
"pinyin":"neidazhen"},
{
"firstLetter":"h",
"id":"460400101000",
"jianpin":"hqz",
"level":4,
"name":"和庆镇",
"pid":"460400000000",
"pinyin":"heqingzhen"},
{
"firstLetter":"n",
"id":"460400102000",
"jianpin":"nfz",
"level":4,
"name":"南丰镇",
"pid":"460400000000",
"pinyin":"nanfengzhen"},
{
"firstLetter":"d",
"id":"460400103000",
"jianpin":"dcz",
"level":4,
"name":"大成镇",
"pid":"460400000000",
"pinyin":"dachengzhen"},
{
"firstLetter":"y",
"id":"460400104000",
"jianpin":"yxz",
"level":4,
"name":"雅星镇",
"pid":"460400000000",
"pinyin":"yaxingzhen"},
{
"firstLetter":"l",
"id":"460400105000",
"jianpin":"lyz",
"level":4,
"name":"兰洋镇",
"pid":"460400000000",
"pinyin":"lanyangzhen"},
{
"firstLetter":"g",
"id":"460400106000",
"jianpin":"gcz",
"level":4,
"name":"光村镇",
"pid":"460400000000",
"pinyin":"guangcunzhen"},
{
"firstLetter":"m",
"id":"460400107000",
"jianpin":"mtz",
"level":4,
"name":"木棠镇",
"pid":"460400000000",
"pinyin":"mutangzhen"},
{
"firstLetter":"h",
"id":"460400108000",
"jianpin":"htz",
"level":4,
"name":"海头镇",
"pid":"460400000000",
"pinyin":"haitouzhen"},
{
"firstLetter":"e",
"id":"460400109000",
"jianpin":"emz",
"level":4,
"name":"峨蔓镇",
"pid":"460400000000",
"pinyin":"emanzhen"},
{
"firstLetter":"w",
"id":"460400111000",
"jianpin":"wwz",
"level":4,
"name":"王五镇",
"pid":"460400000000",
"pinyin":"wangwuzhen"},
{
"firstLetter":"b",
"id":"460400112000",
"jianpin":"bmjz",
"level":4,
"name":"白马井镇",
"pid":"460400000000",
"pinyin":"baimajingzhen"},
{
"firstLetter":"z",
"id":"460400113000",
"jianpin":"zhz",
"level":4,
"name":"中和镇",
"pid":"460400000000",
"pinyin":"zhonghezhen"},
{
"firstLetter":"p",
"id":"460400114000",
"jianpin":"ppz",
"level":4,
"name":"排浦镇",
"pid":"460400000000",
"pinyin":"paipuzhen"},
{
"firstLetter":"d",
"id":"460400115000",
"jianpin":"dcz",
"level":4,
"name":"东成镇",
"pid":"460400000000",
"pinyin":"dongchengzhen"},
{
"firstLetter":"x",
"id":"460400116000",
"jianpin":"xzz",
"level":4,
"name":"新州镇",
"pid":"460400000000",
"pinyin":"xinzhouzhen"},
{
"firstLetter":"y",
"id":"460400499000",
"jianpin":"ypjjkfq",
"level":4,
"name":"洋浦经济开发区",
"pid":"460400000000",
"pinyin":"yangpujingjikaifaqu"},
{
"firstLetter":"h",
"id":"460400500000",
"jianpin":"hnrzxy",
"level":4,
"name":"华南热作学院",
"pid":"460400000000",
"pinyin":"huananrezuoxueyuan"}],

[{
"firstLetter":"w",
"id":"469001000000",
"jianpin":"wzss",
"level":3,
"name":"五指山市",
"pid":"469000000000",
"pinyin":"wuzhishanshi"},
{
"firstLetter":"q",
"id":"469002000000",
"jianpin":"qhs",
"level":3,
"name":"琼海市",
"pid":"469000000000",
"pinyin":"qionghaishi"},
{
"firstLetter":"w",
"id":"469005000000",
"jianpin":"wcs",
"level":3,
"name":"文昌市",
"pid":"469000000000",
"pinyin":"wenchangshi"},
{
"firstLetter":"w",
"id":"469006000000",
"jianpin":"wns",
"level":3,
"name":"万宁市",
"pid":"469000000000",
"pinyin":"wanningshi"},
{
"firstLetter":"d",
"id":"469007000000",
"jianpin":"dfs",
"level":3,
"name":"东方市",
"pid":"469000000000",
"pinyin":"dongfangshi"},
{
"firstLetter":"d",
"id":"469021000000",
"jianpin":"dax",
"level":3,
"name":"定安县",
"pid":"469000000000",
"pinyin":"dinganxian"},
{
"firstLetter":"t",
"id":"469022000000",
"jianpin":"tcx",
"level":3,
"name":"屯昌县",
"pid":"469000000000",
"pinyin":"tunchangxian"},
{
"firstLetter":"c",
"id":"469023000000",
"jianpin":"cmx",
"level":3,
"name":"澄迈县",
"pid":"469000000000",
"pinyin":"chengmaixian"},
{
"firstLetter":"l",
"id":"469024000000",
"jianpin":"lgx",
"level":3,
"name":"临高县",
"pid":"469000000000",
"pinyin":"lingaoxian"},
{
"firstLetter":"b",
"id":"469025000000",
"jianpin":"bslzzzx",
"level":3,
"name":"白沙黎族自治县",
"pid":"469000000000",
"pinyin":"baishalizuzizhixian"},
{
"firstLetter":"c",
"id":"469026000000",
"jianpin":"cjlzzzx",
"level":3,
"name":"昌江黎族自治县",
"pid":"469000000000",
"pinyin":"changjianglizuzizhixian"},
{
"firstLetter":"l",
"id":"469027000000",
"jianpin":"ldlzzzx",
"level":3,
"name":"乐东黎族自治县",
"pid":"469000000000",
"pinyin":"ledonglizuzizhixian"},
{
"firstLetter":"l",
"id":"469028000000",
"jianpin":"lslzzzx",
"level":3,
"name":"陵水黎族自治县",
"pid":"469000000000",
"pinyin":"lingshuilizuzizhixian"},
{
"firstLetter":"b",
"id":"469029000000",
"jianpin":"btlzmzzzx",
"level":3,
"name":"保亭黎族苗族自治县",
"pid":"469000000000",
"pinyin":"baotinglizumiaozuzizhixian"},
{
"firstLetter":"q",
"id":"469030000000",
"jianpin":"qzlzmzzzx",
"level":3,
"name":"琼中黎族苗族自治县",
"pid":"469000000000",
"pinyin":"qiongzhonglizumiaozuzizhixian"}]],



[
[{
"firstLetter":"w",
"id":"500101000000",
"jianpin":"wzq",
"level":3,
"name":"万州区",
"pid":"500100000000",
"pinyin":"wanzhouqu"},
{
"firstLetter":"f",
"id":"500102000000",
"jianpin":"flq",
"level":3,
"name":"涪陵区",
"pid":"500100000000",
"pinyin":"fulingqu"},
{
"firstLetter":"y",
"id":"500103000000",
"jianpin":"yzq",
"level":3,
"name":"渝中区",
"pid":"500100000000",
"pinyin":"yuzhongqu"},
{
"firstLetter":"d",
"id":"500104000000",
"jianpin":"ddkq",
"level":3,
"name":"大渡口区",
"pid":"500100000000",
"pinyin":"dadukouqu"},
{
"firstLetter":"j",
"id":"500105000000",
"jianpin":"jbq",
"level":3,
"name":"江北区",
"pid":"500100000000",
"pinyin":"jiangbeiqu"},
{
"firstLetter":"s",
"id":"500106000000",
"jianpin":"spbq",
"level":3,
"name":"沙坪坝区",
"pid":"500100000000",
"pinyin":"shapingbaqu"},
{
"firstLetter":"j",
"id":"500107000000",
"jianpin":"jlpq",
"level":3,
"name":"九龙坡区",
"pid":"500100000000",
"pinyin":"jiulongpoqu"},
{
"firstLetter":"n",
"id":"500108000000",
"jianpin":"naq",
"level":3,
"name":"南岸区",
"pid":"500100000000",
"pinyin":"nananqu"},
{
"firstLetter":"b",
"id":"500109000000",
"jianpin":"bbq",
"level":3,
"name":"北碚区",
"pid":"500100000000",
"pinyin":"beibeiqu"},
{
"firstLetter":"q",
"id":"500110000000",
"jianpin":"qjq",
"level":3,
"name":"綦江区",
"pid":"500100000000",
"pinyin":"qijiangqu"},
{
"firstLetter":"d",
"id":"500111000000",
"jianpin":"dzq",
"level":3,
"name":"大足区",
"pid":"500100000000",
"pinyin":"dazuqu"},
{
"firstLetter":"y",
"id":"500112000000",
"jianpin":"ybq",
"level":3,
"name":"渝北区",
"pid":"500100000000",
"pinyin":"yubeiqu"},
{
"firstLetter":"b",
"id":"500113000000",
"jianpin":"bnq",
"level":3,
"name":"巴南区",
"pid":"500100000000",
"pinyin":"bananqu"},
{
"firstLetter":"q",
"id":"500114000000",
"jianpin":"qjq",
"level":3,
"name":"黔江区",
"pid":"500100000000",
"pinyin":"qianjiangqu"},
{
"firstLetter":"z",
"id":"500115000000",
"jianpin":"zsq",
"level":3,
"name":"长寿区",
"pid":"500100000000",
"pinyin":"zhangshouqu"},
{
"firstLetter":"j",
"id":"500116000000",
"jianpin":"jjq",
"level":3,
"name":"江津区",
"pid":"500100000000",
"pinyin":"jiangjinqu"},
{
"firstLetter":"h",
"id":"500117000000",
"jianpin":"hcq",
"level":3,
"name":"合川区",
"pid":"500100000000",
"pinyin":"hechuanqu"},
{
"firstLetter":"y",
"id":"500118000000",
"jianpin":"ycq",
"level":3,
"name":"永川区",
"pid":"500100000000",
"pinyin":"yongchuanqu"},
{
"firstLetter":"n",
"id":"500119000000",
"jianpin":"ncq",
"level":3,
"name":"南川区",
"pid":"500100000000",
"pinyin":"nanchuanqu"},
{
"firstLetter":"b",
"id":"500120000000",
"jianpin":"bsq",
"level":3,
"name":"璧山区",
"pid":"500100000000",
"pinyin":"bishanqu"},
{
"firstLetter":"t",
"id":"500151000000",
"jianpin":"tlq",
"level":3,
"name":"铜梁区",
"pid":"500100000000",
"pinyin":"tongliangqu"},
{
"firstLetter":"t",
"id":"500152000000",
"jianpin":"tnq",
"level":3,
"name":"潼南区",
"pid":"500100000000",
"pinyin":"tongnanqu"},
{
"firstLetter":"r",
"id":"500153000000",
"jianpin":"rcq",
"level":3,
"name":"荣昌区",
"pid":"500100000000",
"pinyin":"rongchangqu"},
{
"firstLetter":"k",
"id":"500154000000",
"jianpin":"kzq",
"level":3,
"name":"开州区",
"pid":"500100000000",
"pinyin":"kaizhouqu"},
{
"firstLetter":"l",
"id":"500155000000",
"jianpin":"lpq",
"level":3,
"name":"梁平区",
"pid":"500100000000",
"pinyin":"liangpingqu"},
{
"firstLetter":"w",
"id":"500156000000",
"jianpin":"wlq",
"level":3,
"name":"武隆区",
"pid":"500100000000",
"pinyin":"wulongqu"}],

[{
"firstLetter":"c",
"id":"500229000000",
"jianpin":"ckx",
"level":3,
"name":"城口县",
"pid":"500200000000",
"pinyin":"chengkouxian"},
{
"firstLetter":"f",
"id":"500230000000",
"jianpin":"fdx",
"level":3,
"name":"丰都县",
"pid":"500200000000",
"pinyin":"fengdouxian"},
{
"firstLetter":"d",
"id":"500231000000",
"jianpin":"djx",
"level":3,
"name":"垫江县",
"pid":"500200000000",
"pinyin":"dianjiangxian"},
{
"firstLetter":"z",
"id":"500233000000",
"jianpin":"zx",
"level":3,
"name":"忠县",
"pid":"500200000000",
"pinyin":"zhongxian"},
{
"firstLetter":"y",
"id":"500235000000",
"jianpin":"yyx",
"level":3,
"name":"云阳县",
"pid":"500200000000",
"pinyin":"yunyangxian"},
{
"firstLetter":"f",
"id":"500236000000",
"jianpin":"fjx",
"level":3,
"name":"奉节县",
"pid":"500200000000",
"pinyin":"fengjiexian"},
{
"firstLetter":"w",
"id":"500237000000",
"jianpin":"wsx",
"level":3,
"name":"巫山县",
"pid":"500200000000",
"pinyin":"wushanxian"},
{
"firstLetter":"w",
"id":"500238000000",
"jianpin":"wxx",
"level":3,
"name":"巫溪县",
"pid":"500200000000",
"pinyin":"wuxixian"},
{
"firstLetter":"s",
"id":"500240000000",
"jianpin":"sztjzzzx",
"level":3,
"name":"石柱土家族自治县",
"pid":"500200000000",
"pinyin":"shizhutujiazuzizhixian"},
{
"firstLetter":"x",
"id":"500241000000",
"jianpin":"xstjzmzzzx",
"level":3,
"name":"秀山土家族苗族自治县",
"pid":"500200000000",
"pinyin":"xiushantujiazumiaozuzizhixian"},
{
"firstLetter":"y",
"id":"500242000000",
"jianpin":"yytjzmzzzx",
"level":3,
"name":"酉阳土家族苗族自治县",
"pid":"500200000000",
"pinyin":"youyangtujiazumiaozuzizhixian"},
{
"firstLetter":"p",
"id":"500243000000",
"jianpin":"psmztjzzzx",
"level":3,
"name":"彭水苗族土家族自治县",
"pid":"500200000000",
"pinyin":"pengshuimiaozutujiazuzizhixian"}]],



[
[{
"firstLetter":"s",
"id":"510101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"510100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"510104000000",
"jianpin":"jjq",
"level":3,
"name":"锦江区",
"pid":"510100000000",
"pinyin":"jinjiangqu"},
{
"firstLetter":"q",
"id":"510105000000",
"jianpin":"qyq",
"level":3,
"name":"青羊区",
"pid":"510100000000",
"pinyin":"qingyangqu"},
{
"firstLetter":"j",
"id":"510106000000",
"jianpin":"jnq",
"level":3,
"name":"金牛区",
"pid":"510100000000",
"pinyin":"jinniuqu"},
{
"firstLetter":"w",
"id":"510107000000",
"jianpin":"whq",
"level":3,
"name":"武侯区",
"pid":"510100000000",
"pinyin":"wuhouqu"},
{
"firstLetter":"c",
"id":"510108000000",
"jianpin":"chq",
"level":3,
"name":"成华区",
"pid":"510100000000",
"pinyin":"chenghuaqu"},
{
"firstLetter":"l",
"id":"510112000000",
"jianpin":"lqyq",
"level":3,
"name":"龙泉驿区",
"pid":"510100000000",
"pinyin":"longquanyiqu"},
{
"firstLetter":"q",
"id":"510113000000",
"jianpin":"qbjq",
"level":3,
"name":"青白江区",
"pid":"510100000000",
"pinyin":"qingbaijiangqu"},
{
"firstLetter":"x",
"id":"510114000000",
"jianpin":"xdq",
"level":3,
"name":"新都区",
"pid":"510100000000",
"pinyin":"xindouqu"},
{
"firstLetter":"w",
"id":"510115000000",
"jianpin":"wjq",
"level":3,
"name":"温江区",
"pid":"510100000000",
"pinyin":"wenjiangqu"},
{
"firstLetter":"s",
"id":"510116000000",
"jianpin":"slq",
"level":3,
"name":"双流区",
"pid":"510100000000",
"pinyin":"shuangliuqu"},
{
"firstLetter":"p",
"id":"510117000000",
"jianpin":"pdq",
"level":3,
"name":"郫都区",
"pid":"510100000000",
"pinyin":"pidouqu"},
{
"firstLetter":"j",
"id":"510121000000",
"jianpin":"jtx",
"level":3,
"name":"金堂县",
"pid":"510100000000",
"pinyin":"jintangxian"},
{
"firstLetter":"d",
"id":"510129000000",
"jianpin":"dyx",
"level":3,
"name":"大邑县",
"pid":"510100000000",
"pinyin":"dayixian"},
{
"firstLetter":"p",
"id":"510131000000",
"jianpin":"pjx",
"level":3,
"name":"蒲江县",
"pid":"510100000000",
"pinyin":"pujiangxian"},
{
"firstLetter":"x",
"id":"510132000000",
"jianpin":"xjx",
"level":3,
"name":"新津县",
"pid":"510100000000",
"pinyin":"xinjinxian"},
{
"firstLetter":"d",
"id":"510181000000",
"jianpin":"djys",
"level":3,
"name":"都江堰市",
"pid":"510100000000",
"pinyin":"doujiangyanshi"},
{
"firstLetter":"p",
"id":"510182000000",
"jianpin":"pzs",
"level":3,
"name":"彭州市",
"pid":"510100000000",
"pinyin":"pengzhoushi"},
{
"firstLetter":"q",
"id":"510183000000",
"jianpin":"qls",
"level":3,
"name":"邛崃市",
"pid":"510100000000",
"pinyin":"qionglaishi"},
{
"firstLetter":"c",
"id":"510184000000",
"jianpin":"czs",
"level":3,
"name":"崇州市",
"pid":"510100000000",
"pinyin":"chongzhoushi"},
{
"firstLetter":"j",
"id":"510185000000",
"jianpin":"jys",
"level":3,
"name":"简阳市",
"pid":"510100000000",
"pinyin":"jianyangshi"}],

[{
"firstLetter":"s",
"id":"510301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"510300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"z",
"id":"510302000000",
"jianpin":"zljq",
"level":3,
"name":"自流井区",
"pid":"510300000000",
"pinyin":"ziliujingqu"},
{
"firstLetter":"g",
"id":"510303000000",
"jianpin":"gjq",
"level":3,
"name":"贡井区",
"pid":"510300000000",
"pinyin":"gongjingqu"},
{
"firstLetter":"d",
"id":"510304000000",
"jianpin":"daq",
"level":3,
"name":"大安区",
"pid":"510300000000",
"pinyin":"daanqu"},
{
"firstLetter":"y",
"id":"510311000000",
"jianpin":"ytq",
"level":3,
"name":"沿滩区",
"pid":"510300000000",
"pinyin":"yantanqu"},
{
"firstLetter":"r",
"id":"510321000000",
"jianpin":"rx",
"level":3,
"name":"荣县",
"pid":"510300000000",
"pinyin":"rongxian"},
{
"firstLetter":"f",
"id":"510322000000",
"jianpin":"fsx",
"level":3,
"name":"富顺县",
"pid":"510300000000",
"pinyin":"fushunxian"}],

[{
"firstLetter":"s",
"id":"510401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"510400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"510402000000",
"jianpin":"dq",
"level":3,
"name":"东区",
"pid":"510400000000",
"pinyin":"dongqu"},
{
"firstLetter":"x",
"id":"510403000000",
"jianpin":"xq",
"level":3,
"name":"西区",
"pid":"510400000000",
"pinyin":"xiqu"},
{
"firstLetter":"r",
"id":"510411000000",
"jianpin":"rhq",
"level":3,
"name":"仁和区",
"pid":"510400000000",
"pinyin":"renhequ"},
{
"firstLetter":"m",
"id":"510421000000",
"jianpin":"myx",
"level":3,
"name":"米易县",
"pid":"510400000000",
"pinyin":"miyixian"},
{
"firstLetter":"y",
"id":"510422000000",
"jianpin":"ybx",
"level":3,
"name":"盐边县",
"pid":"510400000000",
"pinyin":"yanbianxian"}],

[{
"firstLetter":"s",
"id":"510501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"510500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"510502000000",
"jianpin":"jyq",
"level":3,
"name":"江阳区",
"pid":"510500000000",
"pinyin":"jiangyangqu"},
{
"firstLetter":"n",
"id":"510503000000",
"jianpin":"nxq",
"level":3,
"name":"纳溪区",
"pid":"510500000000",
"pinyin":"naxiqu"},
{
"firstLetter":"l",
"id":"510504000000",
"jianpin":"lmtq",
"level":3,
"name":"龙马潭区",
"pid":"510500000000",
"pinyin":"longmatanqu"},
{
"firstLetter":"l",
"id":"510521000000",
"jianpin":"lx",
"level":3,
"name":"泸县",
"pid":"510500000000",
"pinyin":"luxian"},
{
"firstLetter":"h",
"id":"510522000000",
"jianpin":"hjx",
"level":3,
"name":"合江县",
"pid":"510500000000",
"pinyin":"hejiangxian"},
{
"firstLetter":"x",
"id":"510524000000",
"jianpin":"xyx",
"level":3,
"name":"叙永县",
"pid":"510500000000",
"pinyin":"xuyongxian"},
{
"firstLetter":"g",
"id":"510525000000",
"jianpin":"glx",
"level":3,
"name":"古蔺县",
"pid":"510500000000",
"pinyin":"gulinxian"}],

[{
"firstLetter":"s",
"id":"510601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"510600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"510603000000",
"jianpin":"jyq",
"level":3,
"name":"旌阳区",
"pid":"510600000000",
"pinyin":"jingyangqu"},
{
"firstLetter":"l",
"id":"510604000000",
"jianpin":"ljq",
"level":3,
"name":"罗江区",
"pid":"510600000000",
"pinyin":"luojiangqu"},
{
"firstLetter":"z",
"id":"510623000000",
"jianpin":"zjx",
"level":3,
"name":"中江县",
"pid":"510600000000",
"pinyin":"zhongjiangxian"},
{
"firstLetter":"g",
"id":"510681000000",
"jianpin":"ghs",
"level":3,
"name":"广汉市",
"pid":"510600000000",
"pinyin":"guanghanshi"},
{
"firstLetter":"s",
"id":"510682000000",
"jianpin":"sfs",
"level":3,
"name":"什邡市",
"pid":"510600000000",
"pinyin":"shenfangshi"},
{
"firstLetter":"m",
"id":"510683000000",
"jianpin":"mzs",
"level":3,
"name":"绵竹市",
"pid":"510600000000",
"pinyin":"mianzhushi"}],

[{
"firstLetter":"s",
"id":"510701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"510700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"f",
"id":"510703000000",
"jianpin":"fcq",
"level":3,
"name":"涪城区",
"pid":"510700000000",
"pinyin":"fuchengqu"},
{
"firstLetter":"y",
"id":"510704000000",
"jianpin":"yxq",
"level":3,
"name":"游仙区",
"pid":"510700000000",
"pinyin":"youxianqu"},
{
"firstLetter":"a",
"id":"510705000000",
"jianpin":"azq",
"level":3,
"name":"安州区",
"pid":"510700000000",
"pinyin":"anzhouqu"},
{
"firstLetter":"s",
"id":"510722000000",
"jianpin":"stx",
"level":3,
"name":"三台县",
"pid":"510700000000",
"pinyin":"santaixian"},
{
"firstLetter":"y",
"id":"510723000000",
"jianpin":"ytx",
"level":3,
"name":"盐亭县",
"pid":"510700000000",
"pinyin":"yantingxian"},
{
"firstLetter":"z",
"id":"510725000000",
"jianpin":"ztx",
"level":3,
"name":"梓潼县",
"pid":"510700000000",
"pinyin":"zitongxian"},
{
"firstLetter":"b",
"id":"510726000000",
"jianpin":"bcqzzzx",
"level":3,
"name":"北川羌族自治县",
"pid":"510700000000",
"pinyin":"beichuanqiangzuzizhixian"},
{
"firstLetter":"p",
"id":"510727000000",
"jianpin":"pwx",
"level":3,
"name":"平武县",
"pid":"510700000000",
"pinyin":"pingwuxian"},
{
"firstLetter":"j",
"id":"510781000000",
"jianpin":"jys",
"level":3,
"name":"江油市",
"pid":"510700000000",
"pinyin":"jiangyoushi"}],

[{
"firstLetter":"s",
"id":"510801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"510800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"510802000000",
"jianpin":"lzq",
"level":3,
"name":"利州区",
"pid":"510800000000",
"pinyin":"lizhouqu"},
{
"firstLetter":"z",
"id":"510811000000",
"jianpin":"zhq",
"level":3,
"name":"昭化区",
"pid":"510800000000",
"pinyin":"zhaohuaqu"},
{
"firstLetter":"c",
"id":"510812000000",
"jianpin":"ctq",
"level":3,
"name":"朝天区",
"pid":"510800000000",
"pinyin":"chaotianqu"},
{
"firstLetter":"w",
"id":"510821000000",
"jianpin":"wcx",
"level":3,
"name":"旺苍县",
"pid":"510800000000",
"pinyin":"wangcangxian"},
{
"firstLetter":"q",
"id":"510822000000",
"jianpin":"qcx",
"level":3,
"name":"青川县",
"pid":"510800000000",
"pinyin":"qingchuanxian"},
{
"firstLetter":"j",
"id":"510823000000",
"jianpin":"jgx",
"level":3,
"name":"剑阁县",
"pid":"510800000000",
"pinyin":"jiangexian"},
{
"firstLetter":"c",
"id":"510824000000",
"jianpin":"cxx",
"level":3,
"name":"苍溪县",
"pid":"510800000000",
"pinyin":"cangxixian"}],

[{
"firstLetter":"s",
"id":"510901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"510900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"510903000000",
"jianpin":"csq",
"level":3,
"name":"船山区",
"pid":"510900000000",
"pinyin":"chuanshanqu"},
{
"firstLetter":"a",
"id":"510904000000",
"jianpin":"ajq",
"level":3,
"name":"安居区",
"pid":"510900000000",
"pinyin":"anjuqu"},
{
"firstLetter":"p",
"id":"510921000000",
"jianpin":"pxx",
"level":3,
"name":"蓬溪县",
"pid":"510900000000",
"pinyin":"pengxixian"},
{
"firstLetter":"s",
"id":"510922000000",
"jianpin":"shx",
"level":3,
"name":"射洪县",
"pid":"510900000000",
"pinyin":"shehongxian"},
{
"firstLetter":"d",
"id":"510923000000",
"jianpin":"dyx",
"level":3,
"name":"大英县",
"pid":"510900000000",
"pinyin":"dayingxian"}],

[{
"firstLetter":"s",
"id":"511001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"511000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"511002000000",
"jianpin":"szq",
"level":3,
"name":"市中区",
"pid":"511000000000",
"pinyin":"shizhongqu"},
{
"firstLetter":"d",
"id":"511011000000",
"jianpin":"dxq",
"level":3,
"name":"东兴区",
"pid":"511000000000",
"pinyin":"dongxingqu"},
{
"firstLetter":"w",
"id":"511024000000",
"jianpin":"wyx",
"level":3,
"name":"威远县",
"pid":"511000000000",
"pinyin":"weiyuanxian"},
{
"firstLetter":"z",
"id":"511025000000",
"jianpin":"zzx",
"level":3,
"name":"资中县",
"pid":"511000000000",
"pinyin":"zizhongxian"},
{
"firstLetter":"n",
"id":"511071000000",
"jianpin":"njjjkfq",
"level":3,
"name":"内江经济开发区",
"pid":"511000000000",
"pinyin":"neijiangjingjikaifaqu"},
{
"firstLetter":"l",
"id":"511083000000",
"jianpin":"lcs",
"level":3,
"name":"隆昌市",
"pid":"511000000000",
"pinyin":"longchangshi"}],

[{
"firstLetter":"s",
"id":"511101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"511100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"511102000000",
"jianpin":"szq",
"level":3,
"name":"市中区",
"pid":"511100000000",
"pinyin":"shizhongqu"},
{
"firstLetter":"s",
"id":"511111000000",
"jianpin":"swq",
"level":3,
"name":"沙湾区",
"pid":"511100000000",
"pinyin":"shawanqu"},
{
"firstLetter":"w",
"id":"511112000000",
"jianpin":"wtqq",
"level":3,
"name":"五通桥区",
"pid":"511100000000",
"pinyin":"wutongqiaoqu"},
{
"firstLetter":"j",
"id":"511113000000",
"jianpin":"jkhq",
"level":3,
"name":"金口河区",
"pid":"511100000000",
"pinyin":"jinkouhequ"},
{
"firstLetter":"j",
"id":"511123000000",
"jianpin":"jwx",
"level":3,
"name":"犍为县",
"pid":"511100000000",
"pinyin":"jianweixian"},
{
"firstLetter":"j",
"id":"511124000000",
"jianpin":"jyx",
"level":3,
"name":"井研县",
"pid":"511100000000",
"pinyin":"jingyanxian"},
{
"firstLetter":"j",
"id":"511126000000",
"jianpin":"jjx",
"level":3,
"name":"夹江县",
"pid":"511100000000",
"pinyin":"jiajiangxian"},
{
"firstLetter":"m",
"id":"511129000000",
"jianpin":"mcx",
"level":3,
"name":"沐川县",
"pid":"511100000000",
"pinyin":"muchuanxian"},
{
"firstLetter":"e",
"id":"511132000000",
"jianpin":"ebyzzzx",
"level":3,
"name":"峨边彝族自治县",
"pid":"511100000000",
"pinyin":"ebianyizuzizhixian"},
{
"firstLetter":"m",
"id":"511133000000",
"jianpin":"mbyzzzx",
"level":3,
"name":"马边彝族自治县",
"pid":"511100000000",
"pinyin":"mabianyizuzizhixian"},
{
"firstLetter":"e",
"id":"511181000000",
"jianpin":"emss",
"level":3,
"name":"峨眉山市",
"pid":"511100000000",
"pinyin":"emeishanshi"}],

[{
"firstLetter":"s",
"id":"511301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"511300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"511302000000",
"jianpin":"sqq",
"level":3,
"name":"顺庆区",
"pid":"511300000000",
"pinyin":"shunqingqu"},
{
"firstLetter":"g",
"id":"511303000000",
"jianpin":"gpq",
"level":3,
"name":"高坪区",
"pid":"511300000000",
"pinyin":"gaopingqu"},
{
"firstLetter":"j",
"id":"511304000000",
"jianpin":"jlq",
"level":3,
"name":"嘉陵区",
"pid":"511300000000",
"pinyin":"jialingqu"},
{
"firstLetter":"n",
"id":"511321000000",
"jianpin":"nbx",
"level":3,
"name":"南部县",
"pid":"511300000000",
"pinyin":"nanbuxian"},
{
"firstLetter":"y",
"id":"511322000000",
"jianpin":"ysx",
"level":3,
"name":"营山县",
"pid":"511300000000",
"pinyin":"yingshanxian"},
{
"firstLetter":"p",
"id":"511323000000",
"jianpin":"pax",
"level":3,
"name":"蓬安县",
"pid":"511300000000",
"pinyin":"penganxian"},
{
"firstLetter":"y",
"id":"511324000000",
"jianpin":"ylx",
"level":3,
"name":"仪陇县",
"pid":"511300000000",
"pinyin":"yilongxian"},
{
"firstLetter":"x",
"id":"511325000000",
"jianpin":"xcx",
"level":3,
"name":"西充县",
"pid":"511300000000",
"pinyin":"xichongxian"},
{
"firstLetter":"l",
"id":"511381000000",
"jianpin":"lzs",
"level":3,
"name":"阆中市",
"pid":"511300000000",
"pinyin":"langzhongshi"}],

[{
"firstLetter":"s",
"id":"511401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"511400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"511402000000",
"jianpin":"dpq",
"level":3,
"name":"东坡区",
"pid":"511400000000",
"pinyin":"dongpoqu"},
{
"firstLetter":"p",
"id":"511403000000",
"jianpin":"psq",
"level":3,
"name":"彭山区",
"pid":"511400000000",
"pinyin":"pengshanqu"},
{
"firstLetter":"r",
"id":"511421000000",
"jianpin":"rsx",
"level":3,
"name":"仁寿县",
"pid":"511400000000",
"pinyin":"renshouxian"},
{
"firstLetter":"h",
"id":"511423000000",
"jianpin":"hyx",
"level":3,
"name":"洪雅县",
"pid":"511400000000",
"pinyin":"hongyaxian"},
{
"firstLetter":"d",
"id":"511424000000",
"jianpin":"dlx",
"level":3,
"name":"丹棱县",
"pid":"511400000000",
"pinyin":"danlengxian"},
{
"firstLetter":"q",
"id":"511425000000",
"jianpin":"qsx",
"level":3,
"name":"青神县",
"pid":"511400000000",
"pinyin":"qingshenxian"}],

[{
"firstLetter":"s",
"id":"511501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"511500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"511502000000",
"jianpin":"cpq",
"level":3,
"name":"翠屏区",
"pid":"511500000000",
"pinyin":"cuipingqu"},
{
"firstLetter":"n",
"id":"511503000000",
"jianpin":"nxq",
"level":3,
"name":"南溪区",
"pid":"511500000000",
"pinyin":"nanxiqu"},
{
"firstLetter":"y",
"id":"511521000000",
"jianpin":"ybx",
"level":3,
"name":"宜宾县",
"pid":"511500000000",
"pinyin":"yibinxian"},
{
"firstLetter":"j",
"id":"511523000000",
"jianpin":"jax",
"level":3,
"name":"江安县",
"pid":"511500000000",
"pinyin":"jianganxian"},
{
"firstLetter":"z",
"id":"511524000000",
"jianpin":"znx",
"level":3,
"name":"长宁县",
"pid":"511500000000",
"pinyin":"zhangningxian"},
{
"firstLetter":"g",
"id":"511525000000",
"jianpin":"gx",
"level":3,
"name":"高县",
"pid":"511500000000",
"pinyin":"gaoxian"},
{
"firstLetter":"g",
"id":"511526000000",
"jianpin":"gx",
"level":3,
"name":"珙县",
"pid":"511500000000",
"pinyin":"gongxian"},
{
"firstLetter":"y",
"id":"511527000000",
"jianpin":"ylx",
"level":3,
"name":"筠连县",
"pid":"511500000000",
"pinyin":"yunlianxian"},
{
"firstLetter":"x",
"id":"511528000000",
"jianpin":"xwx",
"level":3,
"name":"兴文县",
"pid":"511500000000",
"pinyin":"xingwenxian"},
{
"firstLetter":"p",
"id":"511529000000",
"jianpin":"psx",
"level":3,
"name":"屏山县",
"pid":"511500000000",
"pinyin":"pingshanxian"}],

[{
"firstLetter":"s",
"id":"511601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"511600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"g",
"id":"511602000000",
"jianpin":"gaq",
"level":3,
"name":"广安区",
"pid":"511600000000",
"pinyin":"guanganqu"},
{
"firstLetter":"q",
"id":"511603000000",
"jianpin":"qfq",
"level":3,
"name":"前锋区",
"pid":"511600000000",
"pinyin":"qianfengqu"},
{
"firstLetter":"y",
"id":"511621000000",
"jianpin":"ycx",
"level":3,
"name":"岳池县",
"pid":"511600000000",
"pinyin":"yuechixian"},
{
"firstLetter":"w",
"id":"511622000000",
"jianpin":"wsx",
"level":3,
"name":"武胜县",
"pid":"511600000000",
"pinyin":"wushengxian"},
{
"firstLetter":"l",
"id":"511623000000",
"jianpin":"lsx",
"level":3,
"name":"邻水县",
"pid":"511600000000",
"pinyin":"linshuixian"},
{
"firstLetter":"h",
"id":"511681000000",
"jianpin":"hys",
"level":3,
"name":"华蓥市",
"pid":"511600000000",
"pinyin":"huayingshi"}],

[{
"firstLetter":"s",
"id":"511701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"511700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"t",
"id":"511702000000",
"jianpin":"tcq",
"level":3,
"name":"通川区",
"pid":"511700000000",
"pinyin":"tongchuanqu"},
{
"firstLetter":"d",
"id":"511703000000",
"jianpin":"dcq",
"level":3,
"name":"达川区",
"pid":"511700000000",
"pinyin":"dachuanqu"},
{
"firstLetter":"x",
"id":"511722000000",
"jianpin":"xhx",
"level":3,
"name":"宣汉县",
"pid":"511700000000",
"pinyin":"xuanhanxian"},
{
"firstLetter":"k",
"id":"511723000000",
"jianpin":"kjx",
"level":3,
"name":"开江县",
"pid":"511700000000",
"pinyin":"kaijiangxian"},
{
"firstLetter":"d",
"id":"511724000000",
"jianpin":"dzx",
"level":3,
"name":"大竹县",
"pid":"511700000000",
"pinyin":"dazhuxian"},
{
"firstLetter":"q",
"id":"511725000000",
"jianpin":"qx",
"level":3,
"name":"渠县",
"pid":"511700000000",
"pinyin":"quxian"},
{
"firstLetter":"d",
"id":"511771000000",
"jianpin":"dzjjkfq",
"level":3,
"name":"达州经济开发区",
"pid":"511700000000",
"pinyin":"dazhoujingjikaifaqu"},
{
"firstLetter":"w",
"id":"511781000000",
"jianpin":"wys",
"level":3,
"name":"万源市",
"pid":"511700000000",
"pinyin":"wanyuanshi"}],

[{
"firstLetter":"s",
"id":"511801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"511800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"511802000000",
"jianpin":"ycq",
"level":3,
"name":"雨城区",
"pid":"511800000000",
"pinyin":"yuchengqu"},
{
"firstLetter":"m",
"id":"511803000000",
"jianpin":"msq",
"level":3,
"name":"名山区",
"pid":"511800000000",
"pinyin":"mingshanqu"},
{
"firstLetter":"y",
"id":"511822000000",
"jianpin":"yjx",
"level":3,
"name":"荥经县",
"pid":"511800000000",
"pinyin":"yingjingxian"},
{
"firstLetter":"h",
"id":"511823000000",
"jianpin":"hyx",
"level":3,
"name":"汉源县",
"pid":"511800000000",
"pinyin":"hanyuanxian"},
{
"firstLetter":"s",
"id":"511824000000",
"jianpin":"smx",
"level":3,
"name":"石棉县",
"pid":"511800000000",
"pinyin":"shimianxian"},
{
"firstLetter":"t",
"id":"511825000000",
"jianpin":"tqx",
"level":3,
"name":"天全县",
"pid":"511800000000",
"pinyin":"tianquanxian"},
{
"firstLetter":"l",
"id":"511826000000",
"jianpin":"lsx",
"level":3,
"name":"芦山县",
"pid":"511800000000",
"pinyin":"lushanxian"},
{
"firstLetter":"b",
"id":"511827000000",
"jianpin":"bxx",
"level":3,
"name":"宝兴县",
"pid":"511800000000",
"pinyin":"baoxingxian"}],

[{
"firstLetter":"s",
"id":"511901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"511900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"b",
"id":"511902000000",
"jianpin":"bzq",
"level":3,
"name":"巴州区",
"pid":"511900000000",
"pinyin":"bazhouqu"},
{
"firstLetter":"e",
"id":"511903000000",
"jianpin":"eyq",
"level":3,
"name":"恩阳区",
"pid":"511900000000",
"pinyin":"enyangqu"},
{
"firstLetter":"t",
"id":"511921000000",
"jianpin":"tjx",
"level":3,
"name":"通江县",
"pid":"511900000000",
"pinyin":"tongjiangxian"},
{
"firstLetter":"n",
"id":"511922000000",
"jianpin":"njx",
"level":3,
"name":"南江县",
"pid":"511900000000",
"pinyin":"nanjiangxian"},
{
"firstLetter":"p",
"id":"511923000000",
"jianpin":"pcx",
"level":3,
"name":"平昌县",
"pid":"511900000000",
"pinyin":"pingchangxian"},
{
"firstLetter":"b",
"id":"511971000000",
"jianpin":"bzjjkfq",
"level":3,
"name":"巴中经济开发区",
"pid":"511900000000",
"pinyin":"bazhongjingjikaifaqu"}],

[{
"firstLetter":"s",
"id":"512001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"512000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"512002000000",
"jianpin":"yjq",
"level":3,
"name":"雁江区",
"pid":"512000000000",
"pinyin":"yanjiangqu"},
{
"firstLetter":"a",
"id":"512021000000",
"jianpin":"ayx",
"level":3,
"name":"安岳县",
"pid":"512000000000",
"pinyin":"anyuexian"},
{
"firstLetter":"l",
"id":"512022000000",
"jianpin":"lzx",
"level":3,
"name":"乐至县",
"pid":"512000000000",
"pinyin":"lezhixian"}],

[{
"firstLetter":"m",
"id":"513201000000",
"jianpin":"meks",
"level":3,
"name":"马尔康市",
"pid":"513200000000",
"pinyin":"maerkangshi"},
{
"firstLetter":"w",
"id":"513221000000",
"jianpin":"wcx",
"level":3,
"name":"汶川县",
"pid":"513200000000",
"pinyin":"wenchuanxian"},
{
"firstLetter":"l",
"id":"513222000000",
"jianpin":"lx",
"level":3,
"name":"理县",
"pid":"513200000000",
"pinyin":"lixian"},
{
"firstLetter":"m",
"id":"513223000000",
"jianpin":"mx",
"level":3,
"name":"茂县",
"pid":"513200000000",
"pinyin":"maoxian"},
{
"firstLetter":"s",
"id":"513224000000",
"jianpin":"spx",
"level":3,
"name":"松潘县",
"pid":"513200000000",
"pinyin":"songpanxian"},
{
"firstLetter":"j",
"id":"513225000000",
"jianpin":"jzgx",
"level":3,
"name":"九寨沟县",
"pid":"513200000000",
"pinyin":"jiuzhaigouxian"},
{
"firstLetter":"j",
"id":"513226000000",
"jianpin":"jcx",
"level":3,
"name":"金川县",
"pid":"513200000000",
"pinyin":"jinchuanxian"},
{
"firstLetter":"x",
"id":"513227000000",
"jianpin":"xjx",
"level":3,
"name":"小金县",
"pid":"513200000000",
"pinyin":"xiaojinxian"},
{
"firstLetter":"h",
"id":"513228000000",
"jianpin":"hsx",
"level":3,
"name":"黑水县",
"pid":"513200000000",
"pinyin":"heishuixian"},
{
"firstLetter":"r",
"id":"513230000000",
"jianpin":"rtx",
"level":3,
"name":"壤塘县",
"pid":"513200000000",
"pinyin":"rangtangxian"},
{
"firstLetter":"a",
"id":"513231000000",
"jianpin":"abx",
"level":3,
"name":"阿坝县",
"pid":"513200000000",
"pinyin":"abaxian"},
{
"firstLetter":"r",
"id":"513232000000",
"jianpin":"regx",
"level":3,
"name":"若尔盖县",
"pid":"513200000000",
"pinyin":"ruoergaixian"},
{
"firstLetter":"h",
"id":"513233000000",
"jianpin":"hyx",
"level":3,
"name":"红原县",
"pid":"513200000000",
"pinyin":"hongyuanxian"}],

[{
"firstLetter":"k",
"id":"513301000000",
"jianpin":"kds",
"level":3,
"name":"康定市",
"pid":"513300000000",
"pinyin":"kangdingshi"},
{
"firstLetter":"l",
"id":"513322000000",
"jianpin":"ldx",
"level":3,
"name":"泸定县",
"pid":"513300000000",
"pinyin":"ludingxian"},
{
"firstLetter":"d",
"id":"513323000000",
"jianpin":"dbx",
"level":3,
"name":"丹巴县",
"pid":"513300000000",
"pinyin":"danbaxian"},
{
"firstLetter":"j",
"id":"513324000000",
"jianpin":"jlx",
"level":3,
"name":"九龙县",
"pid":"513300000000",
"pinyin":"jiulongxian"},
{
"firstLetter":"y",
"id":"513325000000",
"jianpin":"yjx",
"level":3,
"name":"雅江县",
"pid":"513300000000",
"pinyin":"yajiangxian"},
{
"firstLetter":"d",
"id":"513326000000",
"jianpin":"dfx",
"level":3,
"name":"道孚县",
"pid":"513300000000",
"pinyin":"daofuxian"},
{
"firstLetter":"l",
"id":"513327000000",
"jianpin":"lhx",
"level":3,
"name":"炉霍县",
"pid":"513300000000",
"pinyin":"luhuoxian"},
{
"firstLetter":"g",
"id":"513328000000",
"jianpin":"gzx",
"level":3,
"name":"甘孜县",
"pid":"513300000000",
"pinyin":"ganzixian"},
{
"firstLetter":"x",
"id":"513329000000",
"jianpin":"xlx",
"level":3,
"name":"新龙县",
"pid":"513300000000",
"pinyin":"xinlongxian"},
{
"firstLetter":"d",
"id":"513330000000",
"jianpin":"dgx",
"level":3,
"name":"德格县",
"pid":"513300000000",
"pinyin":"degexian"},
{
"firstLetter":"b",
"id":"513331000000",
"jianpin":"byx",
"level":3,
"name":"白玉县",
"pid":"513300000000",
"pinyin":"baiyuxian"},
{
"firstLetter":"s",
"id":"513332000000",
"jianpin":"sqx",
"level":3,
"name":"石渠县",
"pid":"513300000000",
"pinyin":"shiquxian"},
{
"firstLetter":"s",
"id":"513333000000",
"jianpin":"sdx",
"level":3,
"name":"色达县",
"pid":"513300000000",
"pinyin":"sedaxian"},
{
"firstLetter":"l",
"id":"513334000000",
"jianpin":"ltx",
"level":3,
"name":"理塘县",
"pid":"513300000000",
"pinyin":"litangxian"},
{
"firstLetter":"b",
"id":"513335000000",
"jianpin":"btx",
"level":3,
"name":"巴塘县",
"pid":"513300000000",
"pinyin":"batangxian"},
{
"firstLetter":"x",
"id":"513336000000",
"jianpin":"xcx",
"level":3,
"name":"乡城县",
"pid":"513300000000",
"pinyin":"xiangchengxian"},
{
"firstLetter":"d",
"id":"513337000000",
"jianpin":"dcx",
"level":3,
"name":"稻城县",
"pid":"513300000000",
"pinyin":"daochengxian"},
{
"firstLetter":"d",
"id":"513338000000",
"jianpin":"drx",
"level":3,
"name":"得荣县",
"pid":"513300000000",
"pinyin":"derongxian"}],

[{
"firstLetter":"x",
"id":"513401000000",
"jianpin":"xcs",
"level":3,
"name":"西昌市",
"pid":"513400000000",
"pinyin":"xichangshi"},
{
"firstLetter":"m",
"id":"513422000000",
"jianpin":"mlzzzzx",
"level":3,
"name":"木里藏族自治县",
"pid":"513400000000",
"pinyin":"mulizangzuzizhixian"},
{
"firstLetter":"y",
"id":"513423000000",
"jianpin":"yyx",
"level":3,
"name":"盐源县",
"pid":"513400000000",
"pinyin":"yanyuanxian"},
{
"firstLetter":"d",
"id":"513424000000",
"jianpin":"dcx",
"level":3,
"name":"德昌县",
"pid":"513400000000",
"pinyin":"dechangxian"},
{
"firstLetter":"h",
"id":"513425000000",
"jianpin":"hlx",
"level":3,
"name":"会理县",
"pid":"513400000000",
"pinyin":"huilixian"},
{
"firstLetter":"h",
"id":"513426000000",
"jianpin":"hdx",
"level":3,
"name":"会东县",
"pid":"513400000000",
"pinyin":"huidongxian"},
{
"firstLetter":"n",
"id":"513427000000",
"jianpin":"nnx",
"level":3,
"name":"宁南县",
"pid":"513400000000",
"pinyin":"ningnanxian"},
{
"firstLetter":"p",
"id":"513428000000",
"jianpin":"pgx",
"level":3,
"name":"普格县",
"pid":"513400000000",
"pinyin":"pugexian"},
{
"firstLetter":"b",
"id":"513429000000",
"jianpin":"btx",
"level":3,
"name":"布拖县",
"pid":"513400000000",
"pinyin":"butuoxian"},
{
"firstLetter":"j",
"id":"513430000000",
"jianpin":"jyx",
"level":3,
"name":"金阳县",
"pid":"513400000000",
"pinyin":"jinyangxian"},
{
"firstLetter":"z",
"id":"513431000000",
"jianpin":"zjx",
"level":3,
"name":"昭觉县",
"pid":"513400000000",
"pinyin":"zhaojuexian"},
{
"firstLetter":"x",
"id":"513432000000",
"jianpin":"xdx",
"level":3,
"name":"喜德县",
"pid":"513400000000",
"pinyin":"xidexian"},
{
"firstLetter":"m",
"id":"513433000000",
"jianpin":"mnx",
"level":3,
"name":"冕宁县",
"pid":"513400000000",
"pinyin":"mianningxian"},
{
"firstLetter":"y",
"id":"513434000000",
"jianpin":"yxx",
"level":3,
"name":"越西县",
"pid":"513400000000",
"pinyin":"yuexixian"},
{
"firstLetter":"g",
"id":"513435000000",
"jianpin":"glx",
"level":3,
"name":"甘洛县",
"pid":"513400000000",
"pinyin":"ganluoxian"},
{
"firstLetter":"m",
"id":"513436000000",
"jianpin":"mgx",
"level":3,
"name":"美姑县",
"pid":"513400000000",
"pinyin":"meiguxian"},
{
"firstLetter":"l",
"id":"513437000000",
"jianpin":"lbx",
"level":3,
"name":"雷波县",
"pid":"513400000000",
"pinyin":"leiboxian"}]],



[
[{
"firstLetter":"s",
"id":"520101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"520100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"n",
"id":"520102000000",
"jianpin":"nmq",
"level":3,
"name":"南明区",
"pid":"520100000000",
"pinyin":"nanmingqu"},
{
"firstLetter":"y",
"id":"520103000000",
"jianpin":"yyq",
"level":3,
"name":"云岩区",
"pid":"520100000000",
"pinyin":"yunyanqu"},
{
"firstLetter":"h",
"id":"520111000000",
"jianpin":"hxq",
"level":3,
"name":"花溪区",
"pid":"520100000000",
"pinyin":"huaxiqu"},
{
"firstLetter":"w",
"id":"520112000000",
"jianpin":"wdq",
"level":3,
"name":"乌当区",
"pid":"520100000000",
"pinyin":"wudangqu"},
{
"firstLetter":"b",
"id":"520113000000",
"jianpin":"byq",
"level":3,
"name":"白云区",
"pid":"520100000000",
"pinyin":"baiyunqu"},
{
"firstLetter":"g",
"id":"520115000000",
"jianpin":"gshq",
"level":3,
"name":"观山湖区",
"pid":"520100000000",
"pinyin":"guanshanhuqu"},
{
"firstLetter":"k",
"id":"520121000000",
"jianpin":"kyx",
"level":3,
"name":"开阳县",
"pid":"520100000000",
"pinyin":"kaiyangxian"},
{
"firstLetter":"x",
"id":"520122000000",
"jianpin":"xfx",
"level":3,
"name":"息烽县",
"pid":"520100000000",
"pinyin":"xifengxian"},
{
"firstLetter":"x",
"id":"520123000000",
"jianpin":"xwx",
"level":3,
"name":"修文县",
"pid":"520100000000",
"pinyin":"xiuwenxian"},
{
"firstLetter":"q",
"id":"520181000000",
"jianpin":"qzs",
"level":3,
"name":"清镇市",
"pid":"520100000000",
"pinyin":"qingzhenshi"}],

[{
"firstLetter":"z",
"id":"520201000000",
"jianpin":"zsq",
"level":3,
"name":"钟山区",
"pid":"520200000000",
"pinyin":"zhongshanqu"},
{
"firstLetter":"l",
"id":"520203000000",
"jianpin":"lztq",
"level":3,
"name":"六枝特区",
"pid":"520200000000",
"pinyin":"liuzhitequ"},
{
"firstLetter":"s",
"id":"520221000000",
"jianpin":"scx",
"level":3,
"name":"水城县",
"pid":"520200000000",
"pinyin":"shuichengxian"},
{
"firstLetter":"p",
"id":"520281000000",
"jianpin":"pzs",
"level":3,
"name":"盘州市",
"pid":"520200000000",
"pinyin":"panzhoushi"}],

[{
"firstLetter":"s",
"id":"520301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"520300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"520302000000",
"jianpin":"hhgq",
"level":3,
"name":"红花岗区",
"pid":"520300000000",
"pinyin":"honghuagangqu"},
{
"firstLetter":"h",
"id":"520303000000",
"jianpin":"hcq",
"level":3,
"name":"汇川区",
"pid":"520300000000",
"pinyin":"huichuanqu"},
{
"firstLetter":"b",
"id":"520304000000",
"jianpin":"bzq",
"level":3,
"name":"播州区",
"pid":"520300000000",
"pinyin":"bozhouqu"},
{
"firstLetter":"t",
"id":"520322000000",
"jianpin":"tzx",
"level":3,
"name":"桐梓县",
"pid":"520300000000",
"pinyin":"tongzixian"},
{
"firstLetter":"s",
"id":"520323000000",
"jianpin":"syx",
"level":3,
"name":"绥阳县",
"pid":"520300000000",
"pinyin":"suiyangxian"},
{
"firstLetter":"z",
"id":"520324000000",
"jianpin":"zax",
"level":3,
"name":"正安县",
"pid":"520300000000",
"pinyin":"zhenganxian"},
{
"firstLetter":"d",
"id":"520325000000",
"jianpin":"dzglzmzzzx",
"level":3,
"name":"道真仡佬族苗族自治县",
"pid":"520300000000",
"pinyin":"daozhengelaozumiaozuzizhixian"},
{
"firstLetter":"w",
"id":"520326000000",
"jianpin":"wcglzmzzzx",
"level":3,
"name":"务川仡佬族苗族自治县",
"pid":"520300000000",
"pinyin":"wuchuangelaozumiaozuzizhixian"},
{
"firstLetter":"f",
"id":"520327000000",
"jianpin":"fgx",
"level":3,
"name":"凤冈县",
"pid":"520300000000",
"pinyin":"fenggangxian"},
{
"firstLetter":"m",
"id":"520328000000",
"jianpin":"mtx",
"level":3,
"name":"湄潭县",
"pid":"520300000000",
"pinyin":"meitanxian"},
{
"firstLetter":"y",
"id":"520329000000",
"jianpin":"yqx",
"level":3,
"name":"余庆县",
"pid":"520300000000",
"pinyin":"yuqingxian"},
{
"firstLetter":"x",
"id":"520330000000",
"jianpin":"xsx",
"level":3,
"name":"习水县",
"pid":"520300000000",
"pinyin":"xishuixian"},
{
"firstLetter":"c",
"id":"520381000000",
"jianpin":"css",
"level":3,
"name":"赤水市",
"pid":"520300000000",
"pinyin":"chishuishi"},
{
"firstLetter":"r",
"id":"520382000000",
"jianpin":"rhs",
"level":3,
"name":"仁怀市",
"pid":"520300000000",
"pinyin":"renhuaishi"}],

[{
"firstLetter":"s",
"id":"520401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"520400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"520402000000",
"jianpin":"xxq",
"level":3,
"name":"西秀区",
"pid":"520400000000",
"pinyin":"xixiuqu"},
{
"firstLetter":"p",
"id":"520403000000",
"jianpin":"pbq",
"level":3,
"name":"平坝区",
"pid":"520400000000",
"pinyin":"pingbaqu"},
{
"firstLetter":"p",
"id":"520422000000",
"jianpin":"pdx",
"level":3,
"name":"普定县",
"pid":"520400000000",
"pinyin":"pudingxian"},
{
"firstLetter":"z",
"id":"520423000000",
"jianpin":"znbyzmzzzx",
"level":3,
"name":"镇宁布依族苗族自治县",
"pid":"520400000000",
"pinyin":"zhenningbuyizumiaozuzizhixian"},
{
"firstLetter":"g",
"id":"520424000000",
"jianpin":"glbyzmzzzx",
"level":3,
"name":"关岭布依族苗族自治县",
"pid":"520400000000",
"pinyin":"guanlingbuyizumiaozuzizhixian"},
{
"firstLetter":"z",
"id":"520425000000",
"jianpin":"zymzbyzzzx",
"level":3,
"name":"紫云苗族布依族自治县",
"pid":"520400000000",
"pinyin":"ziyunmiaozubuyizuzizhixian"}],

[{
"firstLetter":"s",
"id":"520501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"520500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"q",
"id":"520502000000",
"jianpin":"qxgq",
"level":3,
"name":"七星关区",
"pid":"520500000000",
"pinyin":"qixingguanqu"},
{
"firstLetter":"d",
"id":"520521000000",
"jianpin":"dfx",
"level":3,
"name":"大方县",
"pid":"520500000000",
"pinyin":"dafangxian"},
{
"firstLetter":"q",
"id":"520522000000",
"jianpin":"qxx",
"level":3,
"name":"黔西县",
"pid":"520500000000",
"pinyin":"qianxixian"},
{
"firstLetter":"j",
"id":"520523000000",
"jianpin":"jsx",
"level":3,
"name":"金沙县",
"pid":"520500000000",
"pinyin":"jinshaxian"},
{
"firstLetter":"z",
"id":"520524000000",
"jianpin":"zjx",
"level":3,
"name":"织金县",
"pid":"520500000000",
"pinyin":"zhijinxian"},
{
"firstLetter":"n",
"id":"520525000000",
"jianpin":"nyx",
"level":3,
"name":"纳雍县",
"pid":"520500000000",
"pinyin":"nayongxian"},
{
"firstLetter":"w",
"id":"520526000000",
"jianpin":"wnyzhzmzzzx",
"level":3,
"name":"威宁彝族回族苗族自治县",
"pid":"520500000000",
"pinyin":"weiningyizuhuizumiaozuzizhixian"},
{
"firstLetter":"h",
"id":"520527000000",
"jianpin":"hzx",
"level":3,
"name":"赫章县",
"pid":"520500000000",
"pinyin":"hezhangxian"}],

[{
"firstLetter":"s",
"id":"520601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"520600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"b",
"id":"520602000000",
"jianpin":"bjq",
"level":3,
"name":"碧江区",
"pid":"520600000000",
"pinyin":"bijiangqu"},
{
"firstLetter":"w",
"id":"520603000000",
"jianpin":"wsq",
"level":3,
"name":"万山区",
"pid":"520600000000",
"pinyin":"wanshanqu"},
{
"firstLetter":"j",
"id":"520621000000",
"jianpin":"jkx",
"level":3,
"name":"江口县",
"pid":"520600000000",
"pinyin":"jiangkouxian"},
{
"firstLetter":"y",
"id":"520622000000",
"jianpin":"ypdzzzx",
"level":3,
"name":"玉屏侗族自治县",
"pid":"520600000000",
"pinyin":"yupingdongzuzizhixian"},
{
"firstLetter":"s",
"id":"520623000000",
"jianpin":"sqx",
"level":3,
"name":"石阡县",
"pid":"520600000000",
"pinyin":"shiqianxian"},
{
"firstLetter":"s",
"id":"520624000000",
"jianpin":"snx",
"level":3,
"name":"思南县",
"pid":"520600000000",
"pinyin":"sinanxian"},
{
"firstLetter":"y",
"id":"520625000000",
"jianpin":"yjtjzmzzzx",
"level":3,
"name":"印江土家族苗族自治县",
"pid":"520600000000",
"pinyin":"yinjiangtujiazumiaozuzizhixian"},
{
"firstLetter":"d",
"id":"520626000000",
"jianpin":"djx",
"level":3,
"name":"德江县",
"pid":"520600000000",
"pinyin":"dejiangxian"},
{
"firstLetter":"y",
"id":"520627000000",
"jianpin":"yhtjzzzx",
"level":3,
"name":"沿河土家族自治县",
"pid":"520600000000",
"pinyin":"yanhetujiazuzizhixian"},
{
"firstLetter":"s",
"id":"520628000000",
"jianpin":"stmzzzx",
"level":3,
"name":"松桃苗族自治县",
"pid":"520600000000",
"pinyin":"songtaomiaozuzizhixian"}],

[{
"firstLetter":"x",
"id":"522301000000",
"jianpin":"xys",
"level":3,
"name":"兴义市",
"pid":"522300000000",
"pinyin":"xingyishi"},
{
"firstLetter":"x",
"id":"522322000000",
"jianpin":"xrx",
"level":3,
"name":"兴仁县",
"pid":"522300000000",
"pinyin":"xingrenxian"},
{
"firstLetter":"p",
"id":"522323000000",
"jianpin":"pax",
"level":3,
"name":"普安县",
"pid":"522300000000",
"pinyin":"puanxian"},
{
"firstLetter":"q",
"id":"522324000000",
"jianpin":"qlx",
"level":3,
"name":"晴隆县",
"pid":"522300000000",
"pinyin":"qinglongxian"},
{
"firstLetter":"z",
"id":"522325000000",
"jianpin":"zfx",
"level":3,
"name":"贞丰县",
"pid":"522300000000",
"pinyin":"zhenfengxian"},
{
"firstLetter":"w",
"id":"522326000000",
"jianpin":"wmx",
"level":3,
"name":"望谟县",
"pid":"522300000000",
"pinyin":"wangmoxian"},
{
"firstLetter":"c",
"id":"522327000000",
"jianpin":"chx",
"level":3,
"name":"册亨县",
"pid":"522300000000",
"pinyin":"cehengxian"},
{
"firstLetter":"a",
"id":"522328000000",
"jianpin":"alx",
"level":3,
"name":"安龙县",
"pid":"522300000000",
"pinyin":"anlongxian"}],

[{
"firstLetter":"k",
"id":"522601000000",
"jianpin":"kls",
"level":3,
"name":"凯里市",
"pid":"522600000000",
"pinyin":"kailishi"},
{
"firstLetter":"h",
"id":"522622000000",
"jianpin":"hpx",
"level":3,
"name":"黄平县",
"pid":"522600000000",
"pinyin":"huangpingxian"},
{
"firstLetter":"s",
"id":"522623000000",
"jianpin":"sbx",
"level":3,
"name":"施秉县",
"pid":"522600000000",
"pinyin":"shibingxian"},
{
"firstLetter":"s",
"id":"522624000000",
"jianpin":"ssx",
"level":3,
"name":"三穗县",
"pid":"522600000000",
"pinyin":"sansuixian"},
{
"firstLetter":"z",
"id":"522625000000",
"jianpin":"zyx",
"level":3,
"name":"镇远县",
"pid":"522600000000",
"pinyin":"zhenyuanxian"},
{
"firstLetter":"c",
"id":"522626000000",
"jianpin":"cgx",
"level":3,
"name":"岑巩县",
"pid":"522600000000",
"pinyin":"cengongxian"},
{
"firstLetter":"t",
"id":"522627000000",
"jianpin":"tzx",
"level":3,
"name":"天柱县",
"pid":"522600000000",
"pinyin":"tianzhuxian"},
{
"firstLetter":"j",
"id":"522628000000",
"jianpin":"jpx",
"level":3,
"name":"锦屏县",
"pid":"522600000000",
"pinyin":"jinpingxian"},
{
"firstLetter":"j",
"id":"522629000000",
"jianpin":"jhx",
"level":3,
"name":"剑河县",
"pid":"522600000000",
"pinyin":"jianhexian"},
{
"firstLetter":"t",
"id":"522630000000",
"jianpin":"tjx",
"level":3,
"name":"台江县",
"pid":"522600000000",
"pinyin":"taijiangxian"},
{
"firstLetter":"l",
"id":"522631000000",
"jianpin":"lpx",
"level":3,
"name":"黎平县",
"pid":"522600000000",
"pinyin":"lipingxian"},
{
"firstLetter":"r",
"id":"522632000000",
"jianpin":"rjx",
"level":3,
"name":"榕江县",
"pid":"522600000000",
"pinyin":"rongjiangxian"},
{
"firstLetter":"c",
"id":"522633000000",
"jianpin":"cjx",
"level":3,
"name":"从江县",
"pid":"522600000000",
"pinyin":"congjiangxian"},
{
"firstLetter":"l",
"id":"522634000000",
"jianpin":"lsx",
"level":3,
"name":"雷山县",
"pid":"522600000000",
"pinyin":"leishanxian"},
{
"firstLetter":"m",
"id":"522635000000",
"jianpin":"mjx",
"level":3,
"name":"麻江县",
"pid":"522600000000",
"pinyin":"majiangxian"},
{
"firstLetter":"d",
"id":"522636000000",
"jianpin":"dzx",
"level":3,
"name":"丹寨县",
"pid":"522600000000",
"pinyin":"danzhaixian"}],

[{
"firstLetter":"d",
"id":"522701000000",
"jianpin":"dys",
"level":3,
"name":"都匀市",
"pid":"522700000000",
"pinyin":"douyunshi"},
{
"firstLetter":"f",
"id":"522702000000",
"jianpin":"fqs",
"level":3,
"name":"福泉市",
"pid":"522700000000",
"pinyin":"fuquanshi"},
{
"firstLetter":"l",
"id":"522722000000",
"jianpin":"lbx",
"level":3,
"name":"荔波县",
"pid":"522700000000",
"pinyin":"liboxian"},
{
"firstLetter":"g",
"id":"522723000000",
"jianpin":"gdx",
"level":3,
"name":"贵定县",
"pid":"522700000000",
"pinyin":"guidingxian"},
{
"firstLetter":"w",
"id":"522725000000",
"jianpin":"wax",
"level":3,
"name":"瓮安县",
"pid":"522700000000",
"pinyin":"wenganxian"},
{
"firstLetter":"d",
"id":"522726000000",
"jianpin":"dsx",
"level":3,
"name":"独山县",
"pid":"522700000000",
"pinyin":"dushanxian"},
{
"firstLetter":"p",
"id":"522727000000",
"jianpin":"ptx",
"level":3,
"name":"平塘县",
"pid":"522700000000",
"pinyin":"pingtangxian"},
{
"firstLetter":"l",
"id":"522728000000",
"jianpin":"ldx",
"level":3,
"name":"罗甸县",
"pid":"522700000000",
"pinyin":"luodianxian"},
{
"firstLetter":"z",
"id":"522729000000",
"jianpin":"zsx",
"level":3,
"name":"长顺县",
"pid":"522700000000",
"pinyin":"zhangshunxian"},
{
"firstLetter":"l",
"id":"522730000000",
"jianpin":"llx",
"level":3,
"name":"龙里县",
"pid":"522700000000",
"pinyin":"longlixian"},
{
"firstLetter":"h",
"id":"522731000000",
"jianpin":"hsx",
"level":3,
"name":"惠水县",
"pid":"522700000000",
"pinyin":"huishuixian"},
{
"firstLetter":"s",
"id":"522732000000",
"jianpin":"sdszzzx",
"level":3,
"name":"三都水族自治县",
"pid":"522700000000",
"pinyin":"sandoushuizuzizhixian"}]],



[
[{
"firstLetter":"s",
"id":"530101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"530100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"530102000000",
"jianpin":"whq",
"level":3,
"name":"五华区",
"pid":"530100000000",
"pinyin":"wuhuaqu"},
{
"firstLetter":"p",
"id":"530103000000",
"jianpin":"plq",
"level":3,
"name":"盘龙区",
"pid":"530100000000",
"pinyin":"panlongqu"},
{
"firstLetter":"g",
"id":"530111000000",
"jianpin":"gdq",
"level":3,
"name":"官渡区",
"pid":"530100000000",
"pinyin":"guanduqu"},
{
"firstLetter":"x",
"id":"530112000000",
"jianpin":"xsq",
"level":3,
"name":"西山区",
"pid":"530100000000",
"pinyin":"xishanqu"},
{
"firstLetter":"d",
"id":"530113000000",
"jianpin":"dcq",
"level":3,
"name":"东川区",
"pid":"530100000000",
"pinyin":"dongchuanqu"},
{
"firstLetter":"c",
"id":"530114000000",
"jianpin":"cgq",
"level":3,
"name":"呈贡区",
"pid":"530100000000",
"pinyin":"chenggongqu"},
{
"firstLetter":"j",
"id":"530115000000",
"jianpin":"jnq",
"level":3,
"name":"晋宁区",
"pid":"530100000000",
"pinyin":"jinningqu"},
{
"firstLetter":"f",
"id":"530124000000",
"jianpin":"fmx",
"level":3,
"name":"富民县",
"pid":"530100000000",
"pinyin":"fuminxian"},
{
"firstLetter":"y",
"id":"530125000000",
"jianpin":"ylx",
"level":3,
"name":"宜良县",
"pid":"530100000000",
"pinyin":"yiliangxian"},
{
"firstLetter":"s",
"id":"530126000000",
"jianpin":"slyzzzx",
"level":3,
"name":"石林彝族自治县",
"pid":"530100000000",
"pinyin":"shilinyizuzizhixian"},
{
"firstLetter":"s",
"id":"530127000000",
"jianpin":"smx",
"level":3,
"name":"嵩明县",
"pid":"530100000000",
"pinyin":"songmingxian"},
{
"firstLetter":"l",
"id":"530128000000",
"jianpin":"lqyzmzzzx",
"level":3,
"name":"禄劝彝族苗族自治县",
"pid":"530100000000",
"pinyin":"luquanyizumiaozuzizhixian"},
{
"firstLetter":"x",
"id":"530129000000",
"jianpin":"xdhzyzzzx",
"level":3,
"name":"寻甸回族彝族自治县",
"pid":"530100000000",
"pinyin":"xundianhuizuyizuzizhixian"},
{
"firstLetter":"a",
"id":"530181000000",
"jianpin":"ans",
"level":3,
"name":"安宁市",
"pid":"530100000000",
"pinyin":"anningshi"}],

[{
"firstLetter":"s",
"id":"530301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"530300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"q",
"id":"530302000000",
"jianpin":"qlq",
"level":3,
"name":"麒麟区",
"pid":"530300000000",
"pinyin":"qilinqu"},
{
"firstLetter":"z",
"id":"530303000000",
"jianpin":"zyq",
"level":3,
"name":"沾益区",
"pid":"530300000000",
"pinyin":"zhanyiqu"},
{
"firstLetter":"m",
"id":"530321000000",
"jianpin":"mlx",
"level":3,
"name":"马龙县",
"pid":"530300000000",
"pinyin":"malongxian"},
{
"firstLetter":"l",
"id":"530322000000",
"jianpin":"llx",
"level":3,
"name":"陆良县",
"pid":"530300000000",
"pinyin":"luliangxian"},
{
"firstLetter":"s",
"id":"530323000000",
"jianpin":"szx",
"level":3,
"name":"师宗县",
"pid":"530300000000",
"pinyin":"shizongxian"},
{
"firstLetter":"l",
"id":"530324000000",
"jianpin":"lpx",
"level":3,
"name":"罗平县",
"pid":"530300000000",
"pinyin":"luopingxian"},
{
"firstLetter":"f",
"id":"530325000000",
"jianpin":"fyx",
"level":3,
"name":"富源县",
"pid":"530300000000",
"pinyin":"fuyuanxian"},
{
"firstLetter":"h",
"id":"530326000000",
"jianpin":"hzx",
"level":3,
"name":"会泽县",
"pid":"530300000000",
"pinyin":"huizexian"},
{
"firstLetter":"x",
"id":"530381000000",
"jianpin":"xws",
"level":3,
"name":"宣威市",
"pid":"530300000000",
"pinyin":"xuanweishi"}],

[{
"firstLetter":"s",
"id":"530401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"530400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"530402000000",
"jianpin":"htq",
"level":3,
"name":"红塔区",
"pid":"530400000000",
"pinyin":"hongtaqu"},
{
"firstLetter":"j",
"id":"530403000000",
"jianpin":"jcq",
"level":3,
"name":"江川区",
"pid":"530400000000",
"pinyin":"jiangchuanqu"},
{
"firstLetter":"c",
"id":"530422000000",
"jianpin":"cjx",
"level":3,
"name":"澄江县",
"pid":"530400000000",
"pinyin":"chengjiangxian"},
{
"firstLetter":"t",
"id":"530423000000",
"jianpin":"thx",
"level":3,
"name":"通海县",
"pid":"530400000000",
"pinyin":"tonghaixian"},
{
"firstLetter":"h",
"id":"530424000000",
"jianpin":"hnx",
"level":3,
"name":"华宁县",
"pid":"530400000000",
"pinyin":"huaningxian"},
{
"firstLetter":"y",
"id":"530425000000",
"jianpin":"ymx",
"level":3,
"name":"易门县",
"pid":"530400000000",
"pinyin":"yimenxian"},
{
"firstLetter":"e",
"id":"530426000000",
"jianpin":"esyzzzx",
"level":3,
"name":"峨山彝族自治县",
"pid":"530400000000",
"pinyin":"eshanyizuzizhixian"},
{
"firstLetter":"x",
"id":"530427000000",
"jianpin":"xpyzdzzzx",
"level":3,
"name":"新平彝族傣族自治县",
"pid":"530400000000",
"pinyin":"xinpingyizudaizuzizhixian"},
{
"firstLetter":"y",
"id":"530428000000",
"jianpin":"yjhnzyzdzzzx",
"level":3,
"name":"元江哈尼族彝族傣族自治县",
"pid":"530400000000",
"pinyin":"yuanjianghanizuyizudaizuzizhixian"}],

[{
"firstLetter":"s",
"id":"530501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"530500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"530502000000",
"jianpin":"lyq",
"level":3,
"name":"隆阳区",
"pid":"530500000000",
"pinyin":"longyangqu"},
{
"firstLetter":"s",
"id":"530521000000",
"jianpin":"sdx",
"level":3,
"name":"施甸县",
"pid":"530500000000",
"pinyin":"shidianxian"},
{
"firstLetter":"l",
"id":"530523000000",
"jianpin":"llx",
"level":3,
"name":"龙陵县",
"pid":"530500000000",
"pinyin":"longlingxian"},
{
"firstLetter":"c",
"id":"530524000000",
"jianpin":"cnx",
"level":3,
"name":"昌宁县",
"pid":"530500000000",
"pinyin":"changningxian"},
{
"firstLetter":"t",
"id":"530581000000",
"jianpin":"tcs",
"level":3,
"name":"腾冲市",
"pid":"530500000000",
"pinyin":"tengchongshi"}],

[{
"firstLetter":"s",
"id":"530601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"530600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"z",
"id":"530602000000",
"jianpin":"zyq",
"level":3,
"name":"昭阳区",
"pid":"530600000000",
"pinyin":"zhaoyangqu"},
{
"firstLetter":"l",
"id":"530621000000",
"jianpin":"ldx",
"level":3,
"name":"鲁甸县",
"pid":"530600000000",
"pinyin":"ludianxian"},
{
"firstLetter":"q",
"id":"530622000000",
"jianpin":"qjx",
"level":3,
"name":"巧家县",
"pid":"530600000000",
"pinyin":"qiaojiaxian"},
{
"firstLetter":"y",
"id":"530623000000",
"jianpin":"yjx",
"level":3,
"name":"盐津县",
"pid":"530600000000",
"pinyin":"yanjinxian"},
{
"firstLetter":"d",
"id":"530624000000",
"jianpin":"dgx",
"level":3,
"name":"大关县",
"pid":"530600000000",
"pinyin":"daguanxian"},
{
"firstLetter":"y",
"id":"530625000000",
"jianpin":"ysx",
"level":3,
"name":"永善县",
"pid":"530600000000",
"pinyin":"yongshanxian"},
{
"firstLetter":"s",
"id":"530626000000",
"jianpin":"sjx",
"level":3,
"name":"绥江县",
"pid":"530600000000",
"pinyin":"suijiangxian"},
{
"firstLetter":"z",
"id":"530627000000",
"jianpin":"zxx",
"level":3,
"name":"镇雄县",
"pid":"530600000000",
"pinyin":"zhenxiongxian"},
{
"firstLetter":"y",
"id":"530628000000",
"jianpin":"ylx",
"level":3,
"name":"彝良县",
"pid":"530600000000",
"pinyin":"yiliangxian"},
{
"firstLetter":"w",
"id":"530629000000",
"jianpin":"wxx",
"level":3,
"name":"威信县",
"pid":"530600000000",
"pinyin":"weixinxian"},
{
"firstLetter":"s",
"id":"530630000000",
"jianpin":"sfx",
"level":3,
"name":"水富县",
"pid":"530600000000",
"pinyin":"shuifuxian"}],

[{
"firstLetter":"s",
"id":"530701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"530700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"g",
"id":"530702000000",
"jianpin":"gcq",
"level":3,
"name":"古城区",
"pid":"530700000000",
"pinyin":"guchengqu"},
{
"firstLetter":"y",
"id":"530721000000",
"jianpin":"ylnxzzzx",
"level":3,
"name":"玉龙纳西族自治县",
"pid":"530700000000",
"pinyin":"yulongnaxizuzizhixian"},
{
"firstLetter":"y",
"id":"530722000000",
"jianpin":"ysx",
"level":3,
"name":"永胜县",
"pid":"530700000000",
"pinyin":"yongshengxian"},
{
"firstLetter":"h",
"id":"530723000000",
"jianpin":"hpx",
"level":3,
"name":"华坪县",
"pid":"530700000000",
"pinyin":"huapingxian"},
{
"firstLetter":"n",
"id":"530724000000",
"jianpin":"nlyzzzx",
"level":3,
"name":"宁蒗彝族自治县",
"pid":"530700000000",
"pinyin":"ninglangyizuzizhixian"}],

[{
"firstLetter":"s",
"id":"530801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"530800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"530802000000",
"jianpin":"smq",
"level":3,
"name":"思茅区",
"pid":"530800000000",
"pinyin":"simaoqu"},
{
"firstLetter":"n",
"id":"530821000000",
"jianpin":"nehnzyzzzx",
"level":3,
"name":"宁洱哈尼族彝族自治县",
"pid":"530800000000",
"pinyin":"ningerhanizuyizuzizhixian"},
{
"firstLetter":"m",
"id":"530822000000",
"jianpin":"mjhnzzzx",
"level":3,
"name":"墨江哈尼族自治县",
"pid":"530800000000",
"pinyin":"mojianghanizuzizhixian"},
{
"firstLetter":"j",
"id":"530823000000",
"jianpin":"jdyzzzx",
"level":3,
"name":"景东彝族自治县",
"pid":"530800000000",
"pinyin":"jingdongyizuzizhixian"},
{
"firstLetter":"j",
"id":"530824000000",
"jianpin":"jgdzyzzzx",
"level":3,
"name":"景谷傣族彝族自治县",
"pid":"530800000000",
"pinyin":"jinggudaizuyizuzizhixian"},
{
"firstLetter":"z",
"id":"530825000000",
"jianpin":"zyyzhnzlhzzzx",
"level":3,
"name":"镇沅彝族哈尼族拉祜族自治县",
"pid":"530800000000",
"pinyin":"zhenyuanyizuhanizulahuzuzizhixian"},
{
"firstLetter":"j",
"id":"530826000000",
"jianpin":"jchnzyzzzx",
"level":3,
"name":"江城哈尼族彝族自治县",
"pid":"530800000000",
"pinyin":"jiangchenghanizuyizuzizhixian"},
{
"firstLetter":"m",
"id":"530827000000",
"jianpin":"mldzlhzwzzzx",
"level":3,
"name":"孟连傣族拉祜族佤族自治县",
"pid":"530800000000",
"pinyin":"mengliandaizulahuzuwazuzizhixian"},
{
"firstLetter":"l",
"id":"530828000000",
"jianpin":"lclhzzzx",
"level":3,
"name":"澜沧拉祜族自治县",
"pid":"530800000000",
"pinyin":"lancanglahuzuzizhixian"},
{
"firstLetter":"x",
"id":"530829000000",
"jianpin":"xmwzzzx",
"level":3,
"name":"西盟佤族自治县",
"pid":"530800000000",
"pinyin":"ximengwazuzizhixian"}],

[{
"firstLetter":"s",
"id":"530901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"530900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"530902000000",
"jianpin":"lxq",
"level":3,
"name":"临翔区",
"pid":"530900000000",
"pinyin":"linxiangqu"},
{
"firstLetter":"f",
"id":"530921000000",
"jianpin":"fqx",
"level":3,
"name":"凤庆县",
"pid":"530900000000",
"pinyin":"fengqingxian"},
{
"firstLetter":"y",
"id":"530922000000",
"jianpin":"yx",
"level":3,
"name":"云县",
"pid":"530900000000",
"pinyin":"yunxian"},
{
"firstLetter":"y",
"id":"530923000000",
"jianpin":"ydx",
"level":3,
"name":"永德县",
"pid":"530900000000",
"pinyin":"yongdexian"},
{
"firstLetter":"z",
"id":"530924000000",
"jianpin":"zkx",
"level":3,
"name":"镇康县",
"pid":"530900000000",
"pinyin":"zhenkangxian"},
{
"firstLetter":"s",
"id":"530925000000",
"jianpin":"sjlhzwzblzdzzzx",
"level":3,
"name":"双江拉祜族佤族布朗族傣族自治县",
"pid":"530900000000",
"pinyin":"shuangjianglahuzuwazubulangzudaizuzizhixian"},
{
"firstLetter":"g",
"id":"530926000000",
"jianpin":"gmdzwzzzx",
"level":3,
"name":"耿马傣族佤族自治县",
"pid":"530900000000",
"pinyin":"gengmadaizuwazuzizhixian"},
{
"firstLetter":"c",
"id":"530927000000",
"jianpin":"cywzzzx",
"level":3,
"name":"沧源佤族自治县",
"pid":"530900000000",
"pinyin":"cangyuanwazuzizhixian"}],

[{
"firstLetter":"c",
"id":"532301000000",
"jianpin":"cxs",
"level":3,
"name":"楚雄市",
"pid":"532300000000",
"pinyin":"chuxiongshi"},
{
"firstLetter":"s",
"id":"532322000000",
"jianpin":"sbx",
"level":3,
"name":"双柏县",
"pid":"532300000000",
"pinyin":"shuangboxian"},
{
"firstLetter":"m",
"id":"532323000000",
"jianpin":"mdx",
"level":3,
"name":"牟定县",
"pid":"532300000000",
"pinyin":"moudingxian"},
{
"firstLetter":"n",
"id":"532324000000",
"jianpin":"nhx",
"level":3,
"name":"南华县",
"pid":"532300000000",
"pinyin":"nanhuaxian"},
{
"firstLetter":"y",
"id":"532325000000",
"jianpin":"yax",
"level":3,
"name":"姚安县",
"pid":"532300000000",
"pinyin":"yaoanxian"},
{
"firstLetter":"d",
"id":"532326000000",
"jianpin":"dyx",
"level":3,
"name":"大姚县",
"pid":"532300000000",
"pinyin":"dayaoxian"},
{
"firstLetter":"y",
"id":"532327000000",
"jianpin":"yrx",
"level":3,
"name":"永仁县",
"pid":"532300000000",
"pinyin":"yongrenxian"},
{
"firstLetter":"y",
"id":"532328000000",
"jianpin":"ymx",
"level":3,
"name":"元谋县",
"pid":"532300000000",
"pinyin":"yuanmouxian"},
{
"firstLetter":"w",
"id":"532329000000",
"jianpin":"wdx",
"level":3,
"name":"武定县",
"pid":"532300000000",
"pinyin":"wudingxian"},
{
"firstLetter":"l",
"id":"532331000000",
"jianpin":"lfx",
"level":3,
"name":"禄丰县",
"pid":"532300000000",
"pinyin":"lufengxian"}],

[{
"firstLetter":"g",
"id":"532501000000",
"jianpin":"gjs",
"level":3,
"name":"个旧市",
"pid":"532500000000",
"pinyin":"gejiushi"},
{
"firstLetter":"k",
"id":"532502000000",
"jianpin":"kys",
"level":3,
"name":"开远市",
"pid":"532500000000",
"pinyin":"kaiyuanshi"},
{
"firstLetter":"m",
"id":"532503000000",
"jianpin":"mzs",
"level":3,
"name":"蒙自市",
"pid":"532500000000",
"pinyin":"mengzishi"},
{
"firstLetter":"m",
"id":"532504000000",
"jianpin":"mls",
"level":3,
"name":"弥勒市",
"pid":"532500000000",
"pinyin":"mileshi"},
{
"firstLetter":"p",
"id":"532523000000",
"jianpin":"pbmzzzx",
"level":3,
"name":"屏边苗族自治县",
"pid":"532500000000",
"pinyin":"pingbianmiaozuzizhixian"},
{
"firstLetter":"j",
"id":"532524000000",
"jianpin":"jsx",
"level":3,
"name":"建水县",
"pid":"532500000000",
"pinyin":"jianshuixian"},
{
"firstLetter":"s",
"id":"532525000000",
"jianpin":"spx",
"level":3,
"name":"石屏县",
"pid":"532500000000",
"pinyin":"shipingxian"},
{
"firstLetter":"l",
"id":"532527000000",
"jianpin":"lxx",
"level":3,
"name":"泸西县",
"pid":"532500000000",
"pinyin":"luxixian"},
{
"firstLetter":"y",
"id":"532528000000",
"jianpin":"yyx",
"level":3,
"name":"元阳县",
"pid":"532500000000",
"pinyin":"yuanyangxian"},
{
"firstLetter":"h",
"id":"532529000000",
"jianpin":"hhx",
"level":3,
"name":"红河县",
"pid":"532500000000",
"pinyin":"honghexian"},
{
"firstLetter":"j",
"id":"532530000000",
"jianpin":"jpmzyzdzzzx",
"level":3,
"name":"金平苗族瑶族傣族自治县",
"pid":"532500000000",
"pinyin":"jinpingmiaozuyaozudaizuzizhixian"},
{
"firstLetter":"l",
"id":"532531000000",
"jianpin":"lcx",
"level":3,
"name":"绿春县",
"pid":"532500000000",
"pinyin":"lu:chunxian"},
{
"firstLetter":"h",
"id":"532532000000",
"jianpin":"hkyzzzx",
"level":3,
"name":"河口瑶族自治县",
"pid":"532500000000",
"pinyin":"hekouyaozuzizhixian"}],

[{
"firstLetter":"w",
"id":"532601000000",
"jianpin":"wss",
"level":3,
"name":"文山市",
"pid":"532600000000",
"pinyin":"wenshanshi"},
{
"firstLetter":"y",
"id":"532622000000",
"jianpin":"ysx",
"level":3,
"name":"砚山县",
"pid":"532600000000",
"pinyin":"yanshanxian"},
{
"firstLetter":"x",
"id":"532623000000",
"jianpin":"xcx",
"level":3,
"name":"西畴县",
"pid":"532600000000",
"pinyin":"xichouxian"},
{
"firstLetter":"m",
"id":"532624000000",
"jianpin":"mlpx",
"level":3,
"name":"麻栗坡县",
"pid":"532600000000",
"pinyin":"malipoxian"},
{
"firstLetter":"m",
"id":"532625000000",
"jianpin":"mgx",
"level":3,
"name":"马关县",
"pid":"532600000000",
"pinyin":"maguanxian"},
{
"firstLetter":"q",
"id":"532626000000",
"jianpin":"qbx",
"level":3,
"name":"丘北县",
"pid":"532600000000",
"pinyin":"qiubeixian"},
{
"firstLetter":"g",
"id":"532627000000",
"jianpin":"gnx",
"level":3,
"name":"广南县",
"pid":"532600000000",
"pinyin":"guangnanxian"},
{
"firstLetter":"f",
"id":"532628000000",
"jianpin":"fnx",
"level":3,
"name":"富宁县",
"pid":"532600000000",
"pinyin":"funingxian"}],

[{
"firstLetter":"j",
"id":"532801000000",
"jianpin":"jhs",
"level":3,
"name":"景洪市",
"pid":"532800000000",
"pinyin":"jinghongshi"},
{
"firstLetter":"m",
"id":"532822000000",
"jianpin":"mhx",
"level":3,
"name":"勐海县",
"pid":"532800000000",
"pinyin":"menghaixian"},
{
"firstLetter":"m",
"id":"532823000000",
"jianpin":"mlx",
"level":3,
"name":"勐腊县",
"pid":"532800000000",
"pinyin":"menglaxian"}],

[{
"firstLetter":"d",
"id":"532901000000",
"jianpin":"dls",
"level":3,
"name":"大理市",
"pid":"532900000000",
"pinyin":"dalishi"},
{
"firstLetter":"y",
"id":"532922000000",
"jianpin":"ybyzzzx",
"level":3,
"name":"漾濞彝族自治县",
"pid":"532900000000",
"pinyin":"yangbiyizuzizhixian"},
{
"firstLetter":"x",
"id":"532923000000",
"jianpin":"xyx",
"level":3,
"name":"祥云县",
"pid":"532900000000",
"pinyin":"xiangyunxian"},
{
"firstLetter":"b",
"id":"532924000000",
"jianpin":"bcx",
"level":3,
"name":"宾川县",
"pid":"532900000000",
"pinyin":"binchuanxian"},
{
"firstLetter":"m",
"id":"532925000000",
"jianpin":"mdx",
"level":3,
"name":"弥渡县",
"pid":"532900000000",
"pinyin":"miduxian"},
{
"firstLetter":"n",
"id":"532926000000",
"jianpin":"njyzzzx",
"level":3,
"name":"南涧彝族自治县",
"pid":"532900000000",
"pinyin":"nanjianyizuzizhixian"},
{
"firstLetter":"w",
"id":"532927000000",
"jianpin":"wsyzhzzzx",
"level":3,
"name":"巍山彝族回族自治县",
"pid":"532900000000",
"pinyin":"weishanyizuhuizuzizhixian"},
{
"firstLetter":"y",
"id":"532928000000",
"jianpin":"ypx",
"level":3,
"name":"永平县",
"pid":"532900000000",
"pinyin":"yongpingxian"},
{
"firstLetter":"y",
"id":"532929000000",
"jianpin":"ylx",
"level":3,
"name":"云龙县",
"pid":"532900000000",
"pinyin":"yunlongxian"},
{
"firstLetter":"e",
"id":"532930000000",
"jianpin":"eyx",
"level":3,
"name":"洱源县",
"pid":"532900000000",
"pinyin":"eryuanxian"},
{
"firstLetter":"j",
"id":"532931000000",
"jianpin":"jcx",
"level":3,
"name":"剑川县",
"pid":"532900000000",
"pinyin":"jianchuanxian"},
{
"firstLetter":"h",
"id":"532932000000",
"jianpin":"hqx",
"level":3,
"name":"鹤庆县",
"pid":"532900000000",
"pinyin":"heqingxian"}],

[{
"firstLetter":"r",
"id":"533102000000",
"jianpin":"rls",
"level":3,
"name":"瑞丽市",
"pid":"533100000000",
"pinyin":"ruilishi"},
{
"firstLetter":"m",
"id":"533103000000",
"jianpin":"ms",
"level":3,
"name":"芒市",
"pid":"533100000000",
"pinyin":"mangshi"},
{
"firstLetter":"l",
"id":"533122000000",
"jianpin":"lhx",
"level":3,
"name":"梁河县",
"pid":"533100000000",
"pinyin":"lianghexian"},
{
"firstLetter":"y",
"id":"533123000000",
"jianpin":"yjx",
"level":3,
"name":"盈江县",
"pid":"533100000000",
"pinyin":"yingjiangxian"},
{
"firstLetter":"l",
"id":"533124000000",
"jianpin":"lcx",
"level":3,
"name":"陇川县",
"pid":"533100000000",
"pinyin":"longchuanxian"}],

[{
"firstLetter":"l",
"id":"533301000000",
"jianpin":"lss",
"level":3,
"name":"泸水市",
"pid":"533300000000",
"pinyin":"lushuishi"},
{
"firstLetter":"f",
"id":"533323000000",
"jianpin":"fgx",
"level":3,
"name":"福贡县",
"pid":"533300000000",
"pinyin":"fugongxian"},
{
"firstLetter":"g",
"id":"533324000000",
"jianpin":"gsdlznzzzx",
"level":3,
"name":"贡山独龙族怒族自治县",
"pid":"533300000000",
"pinyin":"gongshandulongzunuzuzizhixian"},
{
"firstLetter":"l",
"id":"533325000000",
"jianpin":"lpbzpmzzzx",
"level":3,
"name":"兰坪白族普米族自治县",
"pid":"533300000000",
"pinyin":"lanpingbaizupumizuzizhixian"}],

[{
"firstLetter":"x",
"id":"533401000000",
"jianpin":"xglls",
"level":3,
"name":"香格里拉市",
"pid":"533400000000",
"pinyin":"xianggelilashi"},
{
"firstLetter":"d",
"id":"533422000000",
"jianpin":"dqx",
"level":3,
"name":"德钦县",
"pid":"533400000000",
"pinyin":"deqinxian"},
{
"firstLetter":"w",
"id":"533423000000",
"jianpin":"wxlszzzx",
"level":3,
"name":"维西傈僳族自治县",
"pid":"533400000000",
"pinyin":"weixilisuzuzizhixian"}]],



[
[{
"firstLetter":"s",
"id":"540101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"540100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"540102000000",
"jianpin":"cgq",
"level":3,
"name":"城关区",
"pid":"540100000000",
"pinyin":"chengguanqu"},
{
"firstLetter":"d",
"id":"540103000000",
"jianpin":"dldqq",
"level":3,
"name":"堆龙德庆区",
"pid":"540100000000",
"pinyin":"duilongdeqingqu"},
{
"firstLetter":"l",
"id":"540121000000",
"jianpin":"lzx",
"level":3,
"name":"林周县",
"pid":"540100000000",
"pinyin":"linzhouxian"},
{
"firstLetter":"d",
"id":"540122000000",
"jianpin":"dxx",
"level":3,
"name":"当雄县",
"pid":"540100000000",
"pinyin":"dangxiongxian"},
{
"firstLetter":"n",
"id":"540123000000",
"jianpin":"nmx",
"level":3,
"name":"尼木县",
"pid":"540100000000",
"pinyin":"nimuxian"},
{
"firstLetter":"q",
"id":"540124000000",
"jianpin":"qsx",
"level":3,
"name":"曲水县",
"pid":"540100000000",
"pinyin":"qushuixian"},
{
"firstLetter":"d",
"id":"540126000000",
"jianpin":"dzx",
"level":3,
"name":"达孜县",
"pid":"540100000000",
"pinyin":"dazixian"},
{
"firstLetter":"m",
"id":"540127000000",
"jianpin":"mzgkx",
"level":3,
"name":"墨竹工卡县",
"pid":"540100000000",
"pinyin":"mozhugongkaxian"},
{
"firstLetter":"g",
"id":"540171000000",
"jianpin":"gemzqgyyq",
"level":3,
"name":"格尔木藏青工业园区",
"pid":"540100000000",
"pinyin":"geermuzangqinggongyeyuanqu"},
{
"firstLetter":"l",
"id":"540172000000",
"jianpin":"lsjjjskfq",
"level":3,
"name":"拉萨经济技术开发区",
"pid":"540100000000",
"pinyin":"lasajingjijishukaifaqu"},
{
"firstLetter":"x",
"id":"540173000000",
"jianpin":"xzwhlycyyq",
"level":3,
"name":"西藏文化旅游创意园区",
"pid":"540100000000",
"pinyin":"xizangwenhualu:youchuangyiyuanqu"},
{
"firstLetter":"d",
"id":"540174000000",
"jianpin":"dzgyyq",
"level":3,
"name":"达孜工业园区",
"pid":"540100000000",
"pinyin":"dazigongyeyuanqu"}],

[{
"firstLetter":"s",
"id":"540202000000",
"jianpin":"szzq",
"level":3,
"name":"桑珠孜区",
"pid":"540200000000",
"pinyin":"sangzhuziqu"},
{
"firstLetter":"n",
"id":"540221000000",
"jianpin":"nmlx",
"level":3,
"name":"南木林县",
"pid":"540200000000",
"pinyin":"nanmulinxian"},
{
"firstLetter":"j",
"id":"540222000000",
"jianpin":"jzx",
"level":3,
"name":"江孜县",
"pid":"540200000000",
"pinyin":"jiangzixian"},
{
"firstLetter":"d",
"id":"540223000000",
"jianpin":"drx",
"level":3,
"name":"定日县",
"pid":"540200000000",
"pinyin":"dingrixian"},
{
"firstLetter":"s",
"id":"540224000000",
"jianpin":"sjx",
"level":3,
"name":"萨迦县",
"pid":"540200000000",
"pinyin":"sajiaxian"},
{
"firstLetter":"l",
"id":"540225000000",
"jianpin":"lzx",
"level":3,
"name":"拉孜县",
"pid":"540200000000",
"pinyin":"lazixian"},
{
"firstLetter":"a",
"id":"540226000000",
"jianpin":"arx",
"level":3,
"name":"昂仁县",
"pid":"540200000000",
"pinyin":"angrenxian"},
{
"firstLetter":"x",
"id":"540227000000",
"jianpin":"xtmx",
"level":3,
"name":"谢通门县",
"pid":"540200000000",
"pinyin":"xietongmenxian"},
{
"firstLetter":"b",
"id":"540228000000",
"jianpin":"blx",
"level":3,
"name":"白朗县",
"pid":"540200000000",
"pinyin":"bailangxian"},
{
"firstLetter":"r",
"id":"540229000000",
"jianpin":"rbx",
"level":3,
"name":"仁布县",
"pid":"540200000000",
"pinyin":"renbuxian"},
{
"firstLetter":"k",
"id":"540230000000",
"jianpin":"kmx",
"level":3,
"name":"康马县",
"pid":"540200000000",
"pinyin":"kangmaxian"},
{
"firstLetter":"d",
"id":"540231000000",
"jianpin":"djx",
"level":3,
"name":"定结县",
"pid":"540200000000",
"pinyin":"dingjiexian"},
{
"firstLetter":"z",
"id":"540232000000",
"jianpin":"zbx",
"level":3,
"name":"仲巴县",
"pid":"540200000000",
"pinyin":"zhongbaxian"},
{
"firstLetter":"y",
"id":"540233000000",
"jianpin":"ydx",
"level":3,
"name":"亚东县",
"pid":"540200000000",
"pinyin":"yadongxian"},
{
"firstLetter":"j",
"id":"540234000000",
"jianpin":"jlx",
"level":3,
"name":"吉隆县",
"pid":"540200000000",
"pinyin":"jilongxian"},
{
"firstLetter":"n",
"id":"540235000000",
"jianpin":"nlmx",
"level":3,
"name":"聂拉木县",
"pid":"540200000000",
"pinyin":"nielamuxian"},
{
"firstLetter":"s",
"id":"540236000000",
"jianpin":"sgx",
"level":3,
"name":"萨嘎县",
"pid":"540200000000",
"pinyin":"sagaxian"},
{
"firstLetter":"g",
"id":"540237000000",
"jianpin":"gbx",
"level":3,
"name":"岗巴县",
"pid":"540200000000",
"pinyin":"gangbaxian"}],

[{
"firstLetter":"k",
"id":"540302000000",
"jianpin":"krq",
"level":3,
"name":"卡若区",
"pid":"540300000000",
"pinyin":"karuoqu"},
{
"firstLetter":"j",
"id":"540321000000",
"jianpin":"jdx",
"level":3,
"name":"江达县",
"pid":"540300000000",
"pinyin":"jiangdaxian"},
{
"firstLetter":"g",
"id":"540322000000",
"jianpin":"gjx",
"level":3,
"name":"贡觉县",
"pid":"540300000000",
"pinyin":"gongjuexian"},
{
"firstLetter":"l",
"id":"540323000000",
"jianpin":"lwqx",
"level":3,
"name":"类乌齐县",
"pid":"540300000000",
"pinyin":"leiwuqixian"},
{
"firstLetter":"d",
"id":"540324000000",
"jianpin":"dqx",
"level":3,
"name":"丁青县",
"pid":"540300000000",
"pinyin":"dingqingxian"},
{
"firstLetter":"c",
"id":"540325000000",
"jianpin":"cyx",
"level":3,
"name":"察雅县",
"pid":"540300000000",
"pinyin":"chayaxian"},
{
"firstLetter":"b",
"id":"540326000000",
"jianpin":"bsx",
"level":3,
"name":"八宿县",
"pid":"540300000000",
"pinyin":"basuxian"},
{
"firstLetter":"z",
"id":"540327000000",
"jianpin":"zgx",
"level":3,
"name":"左贡县",
"pid":"540300000000",
"pinyin":"zuogongxian"},
{
"firstLetter":"m",
"id":"540328000000",
"jianpin":"mkx",
"level":3,
"name":"芒康县",
"pid":"540300000000",
"pinyin":"mangkangxian"},
{
"firstLetter":"l",
"id":"540329000000",
"jianpin":"llx",
"level":3,
"name":"洛隆县",
"pid":"540300000000",
"pinyin":"luolongxian"},
{
"firstLetter":"b",
"id":"540330000000",
"jianpin":"bbx",
"level":3,
"name":"边坝县",
"pid":"540300000000",
"pinyin":"bianbaxian"}],



[{
"firstLetter":"b",
"id":"540402000000",
"jianpin":"byq",
"level":3,
"name":"巴宜区",
"pid":"540400000000",
"pinyin":"bayiqu"},
{
"firstLetter":"g",
"id":"540421000000",
"jianpin":"gbjdx",
"level":3,
"name":"工布江达县",
"pid":"540400000000",
"pinyin":"gongbujiangdaxian"},
{
"firstLetter":"m",
"id":"540422000000",
"jianpin":"mlx",
"level":3,
"name":"米林县",
"pid":"540400000000",
"pinyin":"milinxian"},
{
"firstLetter":"m",
"id":"540423000000",
"jianpin":"mtx",
"level":3,
"name":"墨脱县",
"pid":"540400000000",
"pinyin":"motuoxian"},
{
"firstLetter":"b",
"id":"540424000000",
"jianpin":"bmx",
"level":3,
"name":"波密县",
"pid":"540400000000",
"pinyin":"bomixian"},
{
"firstLetter":"c",
"id":"540425000000",
"jianpin":"cyx",
"level":3,
"name":"察隅县",
"pid":"540400000000",
"pinyin":"chayuxian"},
{
"firstLetter":"l",
"id":"540426000000",
"jianpin":"lx",
"level":3,
"name":"朗县",
"pid":"540400000000",
"pinyin":"langxian"}],




[{
"firstLetter":"s",
"id":"540501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"540500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"n",
"id":"540502000000",
"jianpin":"ndq",
"level":3,
"name":"乃东区",
"pid":"540500000000",
"pinyin":"naidongqu"},
{
"firstLetter":"z",
"id":"540521000000",
"jianpin":"znx",
"level":3,
"name":"扎囊县",
"pid":"540500000000",
"pinyin":"zhanangxian"},
{
"firstLetter":"g",
"id":"540522000000",
"jianpin":"ggx",
"level":3,
"name":"贡嘎县",
"pid":"540500000000",
"pinyin":"gonggaxian"},
{
"firstLetter":"s",
"id":"540523000000",
"jianpin":"srx",
"level":3,
"name":"桑日县",
"pid":"540500000000",
"pinyin":"sangrixian"},
{
"firstLetter":"q",
"id":"540524000000",
"jianpin":"qjx",
"level":3,
"name":"琼结县",
"pid":"540500000000",
"pinyin":"qiongjiexian"},
{
"firstLetter":"q",
"id":"540525000000",
"jianpin":"qsx",
"level":3,
"name":"曲松县",
"pid":"540500000000",
"pinyin":"qusongxian"},
{
"firstLetter":"c",
"id":"540526000000",
"jianpin":"cmx",
"level":3,
"name":"措美县",
"pid":"540500000000",
"pinyin":"cuomeixian"},
{
"firstLetter":"l",
"id":"540527000000",
"jianpin":"lzx",
"level":3,
"name":"洛扎县",
"pid":"540500000000",
"pinyin":"luozhaxian"},
{
"firstLetter":"j",
"id":"540528000000",
"jianpin":"jcx",
"level":3,
"name":"加查县",
"pid":"540500000000",
"pinyin":"jiachaxian"},
{
"firstLetter":"l",
"id":"540529000000",
"jianpin":"lzx",
"level":3,
"name":"隆子县",
"pid":"540500000000",
"pinyin":"longzixian"},
{
"firstLetter":"c",
"id":"540530000000",
"jianpin":"cnx",
"level":3,
"name":"错那县",
"pid":"540500000000",
"pinyin":"cuoneixian"},
{
"firstLetter":"l",
"id":"540531000000",
"jianpin":"lkzx",
"level":3,
"name":"浪卡子县",
"pid":"540500000000",
"pinyin":"langkazixian"}],



[{
"firstLetter":"n",
"id":"542421000000",
"jianpin":"nqx",
"level":3,
"name":"那曲县",
"pid":"542400000000",
"pinyin":"neiquxian"},
{
"firstLetter":"j",
"id":"542422000000",
"jianpin":"jlx",
"level":3,
"name":"嘉黎县",
"pid":"542400000000",
"pinyin":"jialixian"},
{
"firstLetter":"b",
"id":"542423000000",
"jianpin":"brx",
"level":3,
"name":"比如县",
"pid":"542400000000",
"pinyin":"biruxian"},
{
"firstLetter":"n",
"id":"542424000000",
"jianpin":"nrx",
"level":3,
"name":"聂荣县",
"pid":"542400000000",
"pinyin":"nierongxian"},
{
"firstLetter":"a",
"id":"542425000000",
"jianpin":"adx",
"level":3,
"name":"安多县",
"pid":"542400000000",
"pinyin":"anduoxian"},
{
"firstLetter":"s",
"id":"542426000000",
"jianpin":"szx",
"level":3,
"name":"申扎县",
"pid":"542400000000",
"pinyin":"shenzhaxian"},
{
"firstLetter":"s",
"id":"542427000000",
"jianpin":"sx",
"level":3,
"name":"索县",
"pid":"542400000000",
"pinyin":"suoxian"},
{
"firstLetter":"b",
"id":"542428000000",
"jianpin":"bgx",
"level":3,
"name":"班戈县",
"pid":"542400000000",
"pinyin":"bangexian"},
{
"firstLetter":"b",
"id":"542429000000",
"jianpin":"bqx",
"level":3,
"name":"巴青县",
"pid":"542400000000",
"pinyin":"baqingxian"},
{
"firstLetter":"n",
"id":"542430000000",
"jianpin":"nmx",
"level":3,
"name":"尼玛县",
"pid":"542400000000",
"pinyin":"nimaxian"},
{
"firstLetter":"s",
"id":"542431000000",
"jianpin":"shx",
"level":3,
"name":"双湖县",
"pid":"542400000000",
"pinyin":"shuanghuxian"}],


[{
"firstLetter":"p",
"id":"542521000000",
"jianpin":"plx",
"level":3,
"name":"普兰县",
"pid":"542500000000",
"pinyin":"pulanxian"},
{
"firstLetter":"z",
"id":"542522000000",
"jianpin":"zdx",
"level":3,
"name":"札达县",
"pid":"542500000000",
"pinyin":"zhadaxian"},
{
"firstLetter":"g",
"id":"542523000000",
"jianpin":"gex",
"level":3,
"name":"噶尔县",
"pid":"542500000000",
"pinyin":"gaerxian"},
{
"firstLetter":"r",
"id":"542524000000",
"jianpin":"rtx",
"level":3,
"name":"日土县",
"pid":"542500000000",
"pinyin":"rituxian"},
{
"firstLetter":"g",
"id":"542525000000",
"jianpin":"gjx",
"level":3,
"name":"革吉县",
"pid":"542500000000",
"pinyin":"gejixian"},
{
"firstLetter":"g",
"id":"542526000000",
"jianpin":"gzx",
"level":3,
"name":"改则县",
"pid":"542500000000",
"pinyin":"gaizexian"},
{
"firstLetter":"c",
"id":"542527000000",
"jianpin":"cqx",
"level":3,
"name":"措勤县",
"pid":"542500000000",
"pinyin":"cuoqinxian"}]],


[
[{
"firstLetter":"s",
"id":"610101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"610100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"610102000000",
"jianpin":"xcq",
"level":3,
"name":"新城区",
"pid":"610100000000",
"pinyin":"xinchengqu"},
{
"firstLetter":"b",
"id":"610103000000",
"jianpin":"blq",
"level":3,
"name":"碑林区",
"pid":"610100000000",
"pinyin":"beilinqu"},
{
"firstLetter":"l",
"id":"610104000000",
"jianpin":"lhq",
"level":3,
"name":"莲湖区",
"pid":"610100000000",
"pinyin":"lianhuqu"},
{
"firstLetter":"b",
"id":"610111000000",
"jianpin":"bqq",
"level":3,
"name":"灞桥区",
"pid":"610100000000",
"pinyin":"baqiaoqu"},
{
"firstLetter":"w",
"id":"610112000000",
"jianpin":"wyq",
"level":3,
"name":"未央区",
"pid":"610100000000",
"pinyin":"weiyangqu"},
{
"firstLetter":"y",
"id":"610113000000",
"jianpin":"ytq",
"level":3,
"name":"雁塔区",
"pid":"610100000000",
"pinyin":"yantaqu"},
{
"firstLetter":"y",
"id":"610114000000",
"jianpin":"ylq",
"level":3,
"name":"阎良区",
"pid":"610100000000",
"pinyin":"yanliangqu"},
{
"firstLetter":"l",
"id":"610115000000",
"jianpin":"ltq",
"level":3,
"name":"临潼区",
"pid":"610100000000",
"pinyin":"lintongqu"},
{
"firstLetter":"z",
"id":"610116000000",
"jianpin":"zaq",
"level":3,
"name":"长安区",
"pid":"610100000000",
"pinyin":"zhanganqu"},
{
"firstLetter":"g",
"id":"610117000000",
"jianpin":"glq",
"level":3,
"name":"高陵区",
"pid":"610100000000",
"pinyin":"gaolingqu"},
{
"firstLetter":"y",
"id":"610118000000",
"jianpin":"yq",
"level":3,
"name":"鄠邑区",
"pid":"610100000000",
"pinyin":"yiqu"},
{
"firstLetter":"l",
"id":"610122000000",
"jianpin":"ltx",
"level":3,
"name":"蓝田县",
"pid":"610100000000",
"pinyin":"lantianxian"},
{
"firstLetter":"z",
"id":"610124000000",
"jianpin":"zzx",
"level":3,
"name":"周至县",
"pid":"610100000000",
"pinyin":"zhouzhixian"}],

[{
"firstLetter":"s",
"id":"610201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"610200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"610202000000",
"jianpin":"wyq",
"level":3,
"name":"王益区",
"pid":"610200000000",
"pinyin":"wangyiqu"},
{
"firstLetter":"y",
"id":"610203000000",
"jianpin":"ytq",
"level":3,
"name":"印台区",
"pid":"610200000000",
"pinyin":"yintaiqu"},
{
"firstLetter":"y",
"id":"610204000000",
"jianpin":"yzq",
"level":3,
"name":"耀州区",
"pid":"610200000000",
"pinyin":"yaozhouqu"},
{
"firstLetter":"y",
"id":"610222000000",
"jianpin":"yjx",
"level":3,
"name":"宜君县",
"pid":"610200000000",
"pinyin":"yijunxian"}],

[{
"firstLetter":"s",
"id":"610301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"610300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"610302000000",
"jianpin":"wbq",
"level":3,
"name":"渭滨区",
"pid":"610300000000",
"pinyin":"weibinqu"},
{
"firstLetter":"j",
"id":"610303000000",
"jianpin":"jtq",
"level":3,
"name":"金台区",
"pid":"610300000000",
"pinyin":"jintaiqu"},
{
"firstLetter":"c",
"id":"610304000000",
"jianpin":"ccq",
"level":3,
"name":"陈仓区",
"pid":"610300000000",
"pinyin":"chencangqu"},
{
"firstLetter":"f",
"id":"610322000000",
"jianpin":"fxx",
"level":3,
"name":"凤翔县",
"pid":"610300000000",
"pinyin":"fengxiangxian"},
{
"firstLetter":"q",
"id":"610323000000",
"jianpin":"qsx",
"level":3,
"name":"岐山县",
"pid":"610300000000",
"pinyin":"qishanxian"},
{
"firstLetter":"f",
"id":"610324000000",
"jianpin":"ffx",
"level":3,
"name":"扶风县",
"pid":"610300000000",
"pinyin":"fufengxian"},
{
"firstLetter":"m",
"id":"610326000000",
"jianpin":"mx",
"level":3,
"name":"眉县",
"pid":"610300000000",
"pinyin":"meixian"},
{
"firstLetter":"l",
"id":"610327000000",
"jianpin":"lx",
"level":3,
"name":"陇县",
"pid":"610300000000",
"pinyin":"longxian"},
{
"firstLetter":"q",
"id":"610328000000",
"jianpin":"qyx",
"level":3,
"name":"千阳县",
"pid":"610300000000",
"pinyin":"qianyangxian"},
{
"firstLetter":"l",
"id":"610329000000",
"jianpin":"lyx",
"level":3,
"name":"麟游县",
"pid":"610300000000",
"pinyin":"linyouxian"},
{
"firstLetter":"f",
"id":"610330000000",
"jianpin":"fx",
"level":3,
"name":"凤县",
"pid":"610300000000",
"pinyin":"fengxian"},
{
"firstLetter":"t",
"id":"610331000000",
"jianpin":"tbx",
"level":3,
"name":"太白县",
"pid":"610300000000",
"pinyin":"taibaixian"}],

[{
"firstLetter":"s",
"id":"610401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"610400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"q",
"id":"610402000000",
"jianpin":"qdq",
"level":3,
"name":"秦都区",
"pid":"610400000000",
"pinyin":"qindouqu"},
{
"firstLetter":"y",
"id":"610403000000",
"jianpin":"ylq",
"level":3,
"name":"杨陵区",
"pid":"610400000000",
"pinyin":"yanglingqu"},
{
"firstLetter":"w",
"id":"610404000000",
"jianpin":"wcq",
"level":3,
"name":"渭城区",
"pid":"610400000000",
"pinyin":"weichengqu"},
{
"firstLetter":"s",
"id":"610422000000",
"jianpin":"syx",
"level":3,
"name":"三原县",
"pid":"610400000000",
"pinyin":"sanyuanxian"},
{
"firstLetter":"j",
"id":"610423000000",
"jianpin":"jyx",
"level":3,
"name":"泾阳县",
"pid":"610400000000",
"pinyin":"jingyangxian"},
{
"firstLetter":"q",
"id":"610424000000",
"jianpin":"qx",
"level":3,
"name":"乾县",
"pid":"610400000000",
"pinyin":"qianxian"},
{
"firstLetter":"l",
"id":"610425000000",
"jianpin":"lqx",
"level":3,
"name":"礼泉县",
"pid":"610400000000",
"pinyin":"liquanxian"},
{
"firstLetter":"y",
"id":"610426000000",
"jianpin":"ysx",
"level":3,
"name":"永寿县",
"pid":"610400000000",
"pinyin":"yongshouxian"},
{
"firstLetter":"b",
"id":"610427000000",
"jianpin":"bx",
"level":3,
"name":"彬县",
"pid":"610400000000",
"pinyin":"binxian"},
{
"firstLetter":"z",
"id":"610428000000",
"jianpin":"zwx",
"level":3,
"name":"长武县",
"pid":"610400000000",
"pinyin":"zhangwuxian"},
{
"firstLetter":"x",
"id":"610429000000",
"jianpin":"xyx",
"level":3,
"name":"旬邑县",
"pid":"610400000000",
"pinyin":"xunyixian"},
{
"firstLetter":"c",
"id":"610430000000",
"jianpin":"chx",
"level":3,
"name":"淳化县",
"pid":"610400000000",
"pinyin":"chunhuaxian"},
{
"firstLetter":"w",
"id":"610431000000",
"jianpin":"wgx",
"level":3,
"name":"武功县",
"pid":"610400000000",
"pinyin":"wugongxian"},
{
"firstLetter":"x",
"id":"610481000000",
"jianpin":"xps",
"level":3,
"name":"兴平市",
"pid":"610400000000",
"pinyin":"xingpingshi"}],

[{
"firstLetter":"s",
"id":"610501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"610500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"610502000000",
"jianpin":"lwq",
"level":3,
"name":"临渭区",
"pid":"610500000000",
"pinyin":"linweiqu"},
{
"firstLetter":"h",
"id":"610503000000",
"jianpin":"hzq",
"level":3,
"name":"华州区",
"pid":"610500000000",
"pinyin":"huazhouqu"},
{
"firstLetter":"t",
"id":"610522000000",
"jianpin":"tgx",
"level":3,
"name":"潼关县",
"pid":"610500000000",
"pinyin":"tongguanxian"},
{
"firstLetter":"d",
"id":"610523000000",
"jianpin":"dlx",
"level":3,
"name":"大荔县",
"pid":"610500000000",
"pinyin":"dalixian"},
{
"firstLetter":"h",
"id":"610524000000",
"jianpin":"hyx",
"level":3,
"name":"合阳县",
"pid":"610500000000",
"pinyin":"heyangxian"},
{
"firstLetter":"c",
"id":"610525000000",
"jianpin":"ccx",
"level":3,
"name":"澄城县",
"pid":"610500000000",
"pinyin":"chengchengxian"},
{
"firstLetter":"p",
"id":"610526000000",
"jianpin":"pcx",
"level":3,
"name":"蒲城县",
"pid":"610500000000",
"pinyin":"puchengxian"},
{
"firstLetter":"b",
"id":"610527000000",
"jianpin":"bsx",
"level":3,
"name":"白水县",
"pid":"610500000000",
"pinyin":"baishuixian"},
{
"firstLetter":"f",
"id":"610528000000",
"jianpin":"fpx",
"level":3,
"name":"富平县",
"pid":"610500000000",
"pinyin":"fupingxian"},
{
"firstLetter":"h",
"id":"610581000000",
"jianpin":"hcs",
"level":3,
"name":"韩城市",
"pid":"610500000000",
"pinyin":"hanchengshi"},
{
"firstLetter":"h",
"id":"610582000000",
"jianpin":"hys",
"level":3,
"name":"华阴市",
"pid":"610500000000",
"pinyin":"huayinshi"}],

[{
"firstLetter":"s",
"id":"610601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"610600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"b",
"id":"610602000000",
"jianpin":"btq",
"level":3,
"name":"宝塔区",
"pid":"610600000000",
"pinyin":"baotaqu"},
{
"firstLetter":"a",
"id":"610603000000",
"jianpin":"asq",
"level":3,
"name":"安塞区",
"pid":"610600000000",
"pinyin":"ansaiqu"},
{
"firstLetter":"y",
"id":"610621000000",
"jianpin":"yzx",
"level":3,
"name":"延长县",
"pid":"610600000000",
"pinyin":"yanzhangxian"},
{
"firstLetter":"y",
"id":"610622000000",
"jianpin":"ycx",
"level":3,
"name":"延川县",
"pid":"610600000000",
"pinyin":"yanchuanxian"},
{
"firstLetter":"z",
"id":"610623000000",
"jianpin":"zzx",
"level":3,
"name":"子长县",
"pid":"610600000000",
"pinyin":"zizhangxian"},
{
"firstLetter":"z",
"id":"610625000000",
"jianpin":"zdx",
"level":3,
"name":"志丹县",
"pid":"610600000000",
"pinyin":"zhidanxian"},
{
"firstLetter":"w",
"id":"610626000000",
"jianpin":"wqx",
"level":3,
"name":"吴起县",
"pid":"610600000000",
"pinyin":"wuqixian"},
{
"firstLetter":"g",
"id":"610627000000",
"jianpin":"gqx",
"level":3,
"name":"甘泉县",
"pid":"610600000000",
"pinyin":"ganquanxian"},
{
"firstLetter":"f",
"id":"610628000000",
"jianpin":"fx",
"level":3,
"name":"富县",
"pid":"610600000000",
"pinyin":"fuxian"},
{
"firstLetter":"l",
"id":"610629000000",
"jianpin":"lcx",
"level":3,
"name":"洛川县",
"pid":"610600000000",
"pinyin":"luochuanxian"},
{
"firstLetter":"y",
"id":"610630000000",
"jianpin":"ycx",
"level":3,
"name":"宜川县",
"pid":"610600000000",
"pinyin":"yichuanxian"},
{
"firstLetter":"h",
"id":"610631000000",
"jianpin":"hlx",
"level":3,
"name":"黄龙县",
"pid":"610600000000",
"pinyin":"huanglongxian"},
{
"firstLetter":"h",
"id":"610632000000",
"jianpin":"hlx",
"level":3,
"name":"黄陵县",
"pid":"610600000000",
"pinyin":"huanglingxian"}],

[{
"firstLetter":"s",
"id":"610701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"610700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"610702000000",
"jianpin":"htq",
"level":3,
"name":"汉台区",
"pid":"610700000000",
"pinyin":"hantaiqu"},
{
"firstLetter":"n",
"id":"610703000000",
"jianpin":"nzq",
"level":3,
"name":"南郑区",
"pid":"610700000000",
"pinyin":"nanzhengqu"},
{
"firstLetter":"c",
"id":"610722000000",
"jianpin":"cgx",
"level":3,
"name":"城固县",
"pid":"610700000000",
"pinyin":"chengguxian"},
{
"firstLetter":"y",
"id":"610723000000",
"jianpin":"yx",
"level":3,
"name":"洋县",
"pid":"610700000000",
"pinyin":"yangxian"},
{
"firstLetter":"x",
"id":"610724000000",
"jianpin":"xxx",
"level":3,
"name":"西乡县",
"pid":"610700000000",
"pinyin":"xixiangxian"},
{
"firstLetter":"m",
"id":"610725000000",
"jianpin":"mx",
"level":3,
"name":"勉县",
"pid":"610700000000",
"pinyin":"mianxian"},
{
"firstLetter":"n",
"id":"610726000000",
"jianpin":"nqx",
"level":3,
"name":"宁强县",
"pid":"610700000000",
"pinyin":"ningqiangxian"},
{
"firstLetter":"l",
"id":"610727000000",
"jianpin":"lyx",
"level":3,
"name":"略阳县",
"pid":"610700000000",
"pinyin":"lu:eyangxian"},
{
"firstLetter":"z",
"id":"610728000000",
"jianpin":"zbx",
"level":3,
"name":"镇巴县",
"pid":"610700000000",
"pinyin":"zhenbaxian"},
{
"firstLetter":"l",
"id":"610729000000",
"jianpin":"lbx",
"level":3,
"name":"留坝县",
"pid":"610700000000",
"pinyin":"liubaxian"},
{
"firstLetter":"f",
"id":"610730000000",
"jianpin":"fpx",
"level":3,
"name":"佛坪县",
"pid":"610700000000",
"pinyin":"fopingxian"}],

[{
"firstLetter":"s",
"id":"610801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"610800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"610802000000",
"jianpin":"yyq",
"level":3,
"name":"榆阳区",
"pid":"610800000000",
"pinyin":"yuyangqu"},
{
"firstLetter":"h",
"id":"610803000000",
"jianpin":"hsq",
"level":3,
"name":"横山区",
"pid":"610800000000",
"pinyin":"hengshanqu"},
{
"firstLetter":"f",
"id":"610822000000",
"jianpin":"fgx",
"level":3,
"name":"府谷县",
"pid":"610800000000",
"pinyin":"fuguxian"},
{
"firstLetter":"j",
"id":"610824000000",
"jianpin":"jbx",
"level":3,
"name":"靖边县",
"pid":"610800000000",
"pinyin":"jingbianxian"},
{
"firstLetter":"d",
"id":"610825000000",
"jianpin":"dbx",
"level":3,
"name":"定边县",
"pid":"610800000000",
"pinyin":"dingbianxian"},
{
"firstLetter":"s",
"id":"610826000000",
"jianpin":"sdx",
"level":3,
"name":"绥德县",
"pid":"610800000000",
"pinyin":"suidexian"},
{
"firstLetter":"m",
"id":"610827000000",
"jianpin":"mzx",
"level":3,
"name":"米脂县",
"pid":"610800000000",
"pinyin":"mizhixian"},
{
"firstLetter":"j",
"id":"610828000000",
"jianpin":"jx",
"level":3,
"name":"佳县",
"pid":"610800000000",
"pinyin":"jiaxian"},
{
"firstLetter":"w",
"id":"610829000000",
"jianpin":"wbx",
"level":3,
"name":"吴堡县",
"pid":"610800000000",
"pinyin":"wubaoxian"},
{
"firstLetter":"q",
"id":"610830000000",
"jianpin":"qjx",
"level":3,
"name":"清涧县",
"pid":"610800000000",
"pinyin":"qingjianxian"},
{
"firstLetter":"z",
"id":"610831000000",
"jianpin":"zzx",
"level":3,
"name":"子洲县",
"pid":"610800000000",
"pinyin":"zizhouxian"},
{
"firstLetter":"s",
"id":"610881000000",
"jianpin":"sms",
"level":3,
"name":"神木市",
"pid":"610800000000",
"pinyin":"shenmushi"}],

[{
"firstLetter":"s",
"id":"610901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"610900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"h",
"id":"610902000000",
"jianpin":"hbq",
"level":3,
"name":"汉滨区",
"pid":"610900000000",
"pinyin":"hanbinqu"},
{
"firstLetter":"h",
"id":"610921000000",
"jianpin":"hyx",
"level":3,
"name":"汉阴县",
"pid":"610900000000",
"pinyin":"hanyinxian"},
{
"firstLetter":"s",
"id":"610922000000",
"jianpin":"sqx",
"level":3,
"name":"石泉县",
"pid":"610900000000",
"pinyin":"shiquanxian"},
{
"firstLetter":"n",
"id":"610923000000",
"jianpin":"nsx",
"level":3,
"name":"宁陕县",
"pid":"610900000000",
"pinyin":"ningshanxian"},
{
"firstLetter":"z",
"id":"610924000000",
"jianpin":"zyx",
"level":3,
"name":"紫阳县",
"pid":"610900000000",
"pinyin":"ziyangxian"},
{
"firstLetter":"l",
"id":"610925000000",
"jianpin":"lgx",
"level":3,
"name":"岚皋县",
"pid":"610900000000",
"pinyin":"langaoxian"},
{
"firstLetter":"p",
"id":"610926000000",
"jianpin":"plx",
"level":3,
"name":"平利县",
"pid":"610900000000",
"pinyin":"pinglixian"},
{
"firstLetter":"z",
"id":"610927000000",
"jianpin":"zpx",
"level":3,
"name":"镇坪县",
"pid":"610900000000",
"pinyin":"zhenpingxian"},
{
"firstLetter":"x",
"id":"610928000000",
"jianpin":"xyx",
"level":3,
"name":"旬阳县",
"pid":"610900000000",
"pinyin":"xunyangxian"},
{
"firstLetter":"b",
"id":"610929000000",
"jianpin":"bhx",
"level":3,
"name":"白河县",
"pid":"610900000000",
"pinyin":"baihexian"}],

[{
"firstLetter":"s",
"id":"611001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"611000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"611002000000",
"jianpin":"szq",
"level":3,
"name":"商州区",
"pid":"611000000000",
"pinyin":"shangzhouqu"},
{
"firstLetter":"l",
"id":"611021000000",
"jianpin":"lnx",
"level":3,
"name":"洛南县",
"pid":"611000000000",
"pinyin":"luonanxian"},
{
"firstLetter":"d",
"id":"611022000000",
"jianpin":"dfx",
"level":3,
"name":"丹凤县",
"pid":"611000000000",
"pinyin":"danfengxian"},
{
"firstLetter":"s",
"id":"611023000000",
"jianpin":"snx",
"level":3,
"name":"商南县",
"pid":"611000000000",
"pinyin":"shangnanxian"},
{
"firstLetter":"s",
"id":"611024000000",
"jianpin":"syx",
"level":3,
"name":"山阳县",
"pid":"611000000000",
"pinyin":"shanyangxian"},
{
"firstLetter":"z",
"id":"611025000000",
"jianpin":"zax",
"level":3,
"name":"镇安县",
"pid":"611000000000",
"pinyin":"zhenanxian"},
{
"firstLetter":"z",
"id":"611026000000",
"jianpin":"zsx",
"level":3,
"name":"柞水县",
"pid":"611000000000",
"pinyin":"zuoshuixian"}]],


[
[{
"firstLetter":"s",
"id":"620101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"620100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"620102000000",
"jianpin":"cgq",
"level":3,
"name":"城关区",
"pid":"620100000000",
"pinyin":"chengguanqu"},
{
"firstLetter":"q",
"id":"620103000000",
"jianpin":"qlhq",
"level":3,
"name":"七里河区",
"pid":"620100000000",
"pinyin":"qilihequ"},
{
"firstLetter":"x",
"id":"620104000000",
"jianpin":"xgq",
"level":3,
"name":"西固区",
"pid":"620100000000",
"pinyin":"xiguqu"},
{
"firstLetter":"a",
"id":"620105000000",
"jianpin":"anq",
"level":3,
"name":"安宁区",
"pid":"620100000000",
"pinyin":"anningqu"},
{
"firstLetter":"h",
"id":"620111000000",
"jianpin":"hgq",
"level":3,
"name":"红古区",
"pid":"620100000000",
"pinyin":"hongguqu"},
{
"firstLetter":"y",
"id":"620121000000",
"jianpin":"ydx",
"level":3,
"name":"永登县",
"pid":"620100000000",
"pinyin":"yongdengxian"},
{
"firstLetter":"g",
"id":"620122000000",
"jianpin":"glx",
"level":3,
"name":"皋兰县",
"pid":"620100000000",
"pinyin":"gaolanxian"},
{
"firstLetter":"y",
"id":"620123000000",
"jianpin":"yzx",
"level":3,
"name":"榆中县",
"pid":"620100000000",
"pinyin":"yuzhongxian"},
{
"firstLetter":"l",
"id":"620171000000",
"jianpin":"lzxq",
"level":3,
"name":"兰州新区",
"pid":"620100000000",
"pinyin":"lanzhouxinqu"}],

[{
"firstLetter":"s",
"id":"620201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"620200000000",
"pinyin":"shixiaqu"}],

[{
"firstLetter":"s",
"id":"620301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"620300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"j",
"id":"620302000000",
"jianpin":"jcq",
"level":3,
"name":"金川区",
"pid":"620300000000",
"pinyin":"jinchuanqu"},
{
"firstLetter":"y",
"id":"620321000000",
"jianpin":"ycx",
"level":3,
"name":"永昌县",
"pid":"620300000000",
"pinyin":"yongchangxian"}],

[{
"firstLetter":"s",
"id":"620401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"620400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"b",
"id":"620402000000",
"jianpin":"byq",
"level":3,
"name":"白银区",
"pid":"620400000000",
"pinyin":"baiyinqu"},
{
"firstLetter":"p",
"id":"620403000000",
"jianpin":"pcq",
"level":3,
"name":"平川区",
"pid":"620400000000",
"pinyin":"pingchuanqu"},
{
"firstLetter":"j",
"id":"620421000000",
"jianpin":"jyx",
"level":3,
"name":"靖远县",
"pid":"620400000000",
"pinyin":"jingyuanxian"},
{
"firstLetter":"h",
"id":"620422000000",
"jianpin":"hnx",
"level":3,
"name":"会宁县",
"pid":"620400000000",
"pinyin":"huiningxian"},
{
"firstLetter":"j",
"id":"620423000000",
"jianpin":"jtx",
"level":3,
"name":"景泰县",
"pid":"620400000000",
"pinyin":"jingtaixian"}],

[{
"firstLetter":"s",
"id":"620501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"620500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"q",
"id":"620502000000",
"jianpin":"qzq",
"level":3,
"name":"秦州区",
"pid":"620500000000",
"pinyin":"qinzhouqu"},
{
"firstLetter":"m",
"id":"620503000000",
"jianpin":"mjq",
"level":3,
"name":"麦积区",
"pid":"620500000000",
"pinyin":"maijiqu"},
{
"firstLetter":"q",
"id":"620521000000",
"jianpin":"qsx",
"level":3,
"name":"清水县",
"pid":"620500000000",
"pinyin":"qingshuixian"},
{
"firstLetter":"q",
"id":"620522000000",
"jianpin":"qax",
"level":3,
"name":"秦安县",
"pid":"620500000000",
"pinyin":"qinanxian"},
{
"firstLetter":"g",
"id":"620523000000",
"jianpin":"ggx",
"level":3,
"name":"甘谷县",
"pid":"620500000000",
"pinyin":"ganguxian"},
{
"firstLetter":"w",
"id":"620524000000",
"jianpin":"wsx",
"level":3,
"name":"武山县",
"pid":"620500000000",
"pinyin":"wushanxian"},
{
"firstLetter":"z",
"id":"620525000000",
"jianpin":"zjchzzzx",
"level":3,
"name":"张家川回族自治县",
"pid":"620500000000",
"pinyin":"zhangjiachuanhuizuzizhixian"}],

[{
"firstLetter":"s",
"id":"620601000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"620600000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"620602000000",
"jianpin":"lzq",
"level":3,
"name":"凉州区",
"pid":"620600000000",
"pinyin":"liangzhouqu"},
{
"firstLetter":"m",
"id":"620621000000",
"jianpin":"mqx",
"level":3,
"name":"民勤县",
"pid":"620600000000",
"pinyin":"minqinxian"},
{
"firstLetter":"g",
"id":"620622000000",
"jianpin":"glx",
"level":3,
"name":"古浪县",
"pid":"620600000000",
"pinyin":"gulangxian"},
{
"firstLetter":"t",
"id":"620623000000",
"jianpin":"tzzzzzx",
"level":3,
"name":"天祝藏族自治县",
"pid":"620600000000",
"pinyin":"tianzhuzangzuzizhixian"}],

[{
"firstLetter":"s",
"id":"620701000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"620700000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"g",
"id":"620702000000",
"jianpin":"gzq",
"level":3,
"name":"甘州区",
"pid":"620700000000",
"pinyin":"ganzhouqu"},
{
"firstLetter":"s",
"id":"620721000000",
"jianpin":"snygzzzx",
"level":3,
"name":"肃南裕固族自治县",
"pid":"620700000000",
"pinyin":"sunanyuguzuzizhixian"},
{
"firstLetter":"m",
"id":"620722000000",
"jianpin":"mlx",
"level":3,
"name":"民乐县",
"pid":"620700000000",
"pinyin":"minlexian"},
{
"firstLetter":"l",
"id":"620723000000",
"jianpin":"lzx",
"level":3,
"name":"临泽县",
"pid":"620700000000",
"pinyin":"linzexian"},
{
"firstLetter":"g",
"id":"620724000000",
"jianpin":"gtx",
"level":3,
"name":"高台县",
"pid":"620700000000",
"pinyin":"gaotaixian"},
{
"firstLetter":"s",
"id":"620725000000",
"jianpin":"sdx",
"level":3,
"name":"山丹县",
"pid":"620700000000",
"pinyin":"shandanxian"}],

[{
"firstLetter":"s",
"id":"620801000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"620800000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"k",
"id":"620802000000",
"jianpin":"ktq",
"level":3,
"name":"崆峒区",
"pid":"620800000000",
"pinyin":"kongtongqu"},
{
"firstLetter":"j",
"id":"620821000000",
"jianpin":"jcx",
"level":3,
"name":"泾川县",
"pid":"620800000000",
"pinyin":"jingchuanxian"},
{
"firstLetter":"l",
"id":"620822000000",
"jianpin":"ltx",
"level":3,
"name":"灵台县",
"pid":"620800000000",
"pinyin":"lingtaixian"},
{
"firstLetter":"c",
"id":"620823000000",
"jianpin":"cxx",
"level":3,
"name":"崇信县",
"pid":"620800000000",
"pinyin":"chongxinxian"},
{
"firstLetter":"h",
"id":"620824000000",
"jianpin":"htx",
"level":3,
"name":"华亭县",
"pid":"620800000000",
"pinyin":"huatingxian"},
{
"firstLetter":"z",
"id":"620825000000",
"jianpin":"zlx",
"level":3,
"name":"庄浪县",
"pid":"620800000000",
"pinyin":"zhuanglangxian"},
{
"firstLetter":"j",
"id":"620826000000",
"jianpin":"jnx",
"level":3,
"name":"静宁县",
"pid":"620800000000",
"pinyin":"jingningxian"},
{
"firstLetter":"p",
"id":"620871000000",
"jianpin":"plgyyq",
"level":3,
"name":"平凉工业园区",
"pid":"620800000000",
"pinyin":"pinglianggongyeyuanqu"}],

[{
"firstLetter":"s",
"id":"620901000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"620900000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"620902000000",
"jianpin":"szq",
"level":3,
"name":"肃州区",
"pid":"620900000000",
"pinyin":"suzhouqu"},
{
"firstLetter":"j",
"id":"620921000000",
"jianpin":"jtx",
"level":3,
"name":"金塔县",
"pid":"620900000000",
"pinyin":"jintaxian"},
{
"firstLetter":"g",
"id":"620922000000",
"jianpin":"gzx",
"level":3,
"name":"瓜州县",
"pid":"620900000000",
"pinyin":"guazhouxian"},
{
"firstLetter":"s",
"id":"620923000000",
"jianpin":"sbmgzzzx",
"level":3,
"name":"肃北蒙古族自治县",
"pid":"620900000000",
"pinyin":"subeimengguzuzizhixian"},
{
"firstLetter":"a",
"id":"620924000000",
"jianpin":"akshskzzzx",
"level":3,
"name":"阿克塞哈萨克族自治县",
"pid":"620900000000",
"pinyin":"akesaihasakezuzizhixian"},
{
"firstLetter":"y",
"id":"620981000000",
"jianpin":"yms",
"level":3,
"name":"玉门市",
"pid":"620900000000",
"pinyin":"yumenshi"},
{
"firstLetter":"d",
"id":"620982000000",
"jianpin":"dhs",
"level":3,
"name":"敦煌市",
"pid":"620900000000",
"pinyin":"dunhuangshi"}],

[{
"firstLetter":"s",
"id":"621001000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"621000000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"621002000000",
"jianpin":"xfq",
"level":3,
"name":"西峰区",
"pid":"621000000000",
"pinyin":"xifengqu"},
{
"firstLetter":"q",
"id":"621021000000",
"jianpin":"qcx",
"level":3,
"name":"庆城县",
"pid":"621000000000",
"pinyin":"qingchengxian"},
{
"firstLetter":"h",
"id":"621022000000",
"jianpin":"hx",
"level":3,
"name":"环县",
"pid":"621000000000",
"pinyin":"huanxian"},
{
"firstLetter":"h",
"id":"621023000000",
"jianpin":"hcx",
"level":3,
"name":"华池县",
"pid":"621000000000",
"pinyin":"huachixian"},
{
"firstLetter":"h",
"id":"621024000000",
"jianpin":"hsx",
"level":3,
"name":"合水县",
"pid":"621000000000",
"pinyin":"heshuixian"},
{
"firstLetter":"z",
"id":"621025000000",
"jianpin":"znx",
"level":3,
"name":"正宁县",
"pid":"621000000000",
"pinyin":"zhengningxian"},
{
"firstLetter":"n",
"id":"621026000000",
"jianpin":"nx",
"level":3,
"name":"宁县",
"pid":"621000000000",
"pinyin":"ningxian"},
{
"firstLetter":"z",
"id":"621027000000",
"jianpin":"zyx",
"level":3,
"name":"镇原县",
"pid":"621000000000",
"pinyin":"zhenyuanxian"}],

[{
"firstLetter":"s",
"id":"621101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"621100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"a",
"id":"621102000000",
"jianpin":"adq",
"level":3,
"name":"安定区",
"pid":"621100000000",
"pinyin":"andingqu"},
{
"firstLetter":"t",
"id":"621121000000",
"jianpin":"twx",
"level":3,
"name":"通渭县",
"pid":"621100000000",
"pinyin":"tongweixian"},
{
"firstLetter":"l",
"id":"621122000000",
"jianpin":"lxx",
"level":3,
"name":"陇西县",
"pid":"621100000000",
"pinyin":"longxixian"},
{
"firstLetter":"w",
"id":"621123000000",
"jianpin":"wyx",
"level":3,
"name":"渭源县",
"pid":"621100000000",
"pinyin":"weiyuanxian"},
{
"firstLetter":"l",
"id":"621124000000",
"jianpin":"ltx",
"level":3,
"name":"临洮县",
"pid":"621100000000",
"pinyin":"lintaoxian"},
{
"firstLetter":"z",
"id":"621125000000",
"jianpin":"zx",
"level":3,
"name":"漳县",
"pid":"621100000000",
"pinyin":"zhangxian"},
{
"firstLetter":"m",
"id":"621126000000",
"jianpin":"mx",
"level":3,
"name":"岷县",
"pid":"621100000000",
"pinyin":"minxian"}],

[{
"firstLetter":"s",
"id":"621201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"621200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"w",
"id":"621202000000",
"jianpin":"wdq",
"level":3,
"name":"武都区",
"pid":"621200000000",
"pinyin":"wudouqu"},
{
"firstLetter":"c",
"id":"621221000000",
"jianpin":"cx",
"level":3,
"name":"成县",
"pid":"621200000000",
"pinyin":"chengxian"},
{
"firstLetter":"w",
"id":"621222000000",
"jianpin":"wx",
"level":3,
"name":"文县",
"pid":"621200000000",
"pinyin":"wenxian"},
{
"firstLetter":"d",
"id":"621223000000",
"jianpin":"dcx",
"level":3,
"name":"宕昌县",
"pid":"621200000000",
"pinyin":"dangchangxian"},
{
"firstLetter":"k",
"id":"621224000000",
"jianpin":"kx",
"level":3,
"name":"康县",
"pid":"621200000000",
"pinyin":"kangxian"},
{
"firstLetter":"x",
"id":"621225000000",
"jianpin":"xhx",
"level":3,
"name":"西和县",
"pid":"621200000000",
"pinyin":"xihexian"},
{
"firstLetter":"l",
"id":"621226000000",
"jianpin":"lx",
"level":3,
"name":"礼县",
"pid":"621200000000",
"pinyin":"lixian"},
{
"firstLetter":"h",
"id":"621227000000",
"jianpin":"hx",
"level":3,
"name":"徽县",
"pid":"621200000000",
"pinyin":"huixian"},
{
"firstLetter":"l",
"id":"621228000000",
"jianpin":"ldx",
"level":3,
"name":"两当县",
"pid":"621200000000",
"pinyin":"liangdangxian"}],

[{
"firstLetter":"l",
"id":"622901000000",
"jianpin":"lxs",
"level":3,
"name":"临夏市",
"pid":"622900000000",
"pinyin":"linxiashi"},
{
"firstLetter":"l",
"id":"622921000000",
"jianpin":"lxx",
"level":3,
"name":"临夏县",
"pid":"622900000000",
"pinyin":"linxiaxian"},
{
"firstLetter":"k",
"id":"622922000000",
"jianpin":"klx",
"level":3,
"name":"康乐县",
"pid":"622900000000",
"pinyin":"kanglexian"},
{
"firstLetter":"y",
"id":"622923000000",
"jianpin":"yjx",
"level":3,
"name":"永靖县",
"pid":"622900000000",
"pinyin":"yongjingxian"},
{
"firstLetter":"g",
"id":"622924000000",
"jianpin":"ghx",
"level":3,
"name":"广河县",
"pid":"622900000000",
"pinyin":"guanghexian"},
{
"firstLetter":"h",
"id":"622925000000",
"jianpin":"hzx",
"level":3,
"name":"和政县",
"pid":"622900000000",
"pinyin":"hezhengxian"},
{
"firstLetter":"d",
"id":"622926000000",
"jianpin":"dxzzzx",
"level":3,
"name":"东乡族自治县",
"pid":"622900000000",
"pinyin":"dongxiangzuzizhixian"},
{
"firstLetter":"j",
"id":"622927000000",
"jianpin":"jssbazdxzslzzzx",
"level":3,
"name":"积石山保安族东乡族撒拉族自治县",
"pid":"622900000000",
"pinyin":"jishishanbaoanzudongxiangzusalazuzizhixian"}],

[{
"firstLetter":"h",
"id":"623001000000",
"jianpin":"hzs",
"level":3,
"name":"合作市",
"pid":"623000000000",
"pinyin":"hezuoshi"},
{
"firstLetter":"l",
"id":"623021000000",
"jianpin":"ltx",
"level":3,
"name":"临潭县",
"pid":"623000000000",
"pinyin":"lintanxian"},
{
"firstLetter":"z",
"id":"623022000000",
"jianpin":"znx",
"level":3,
"name":"卓尼县",
"pid":"623000000000",
"pinyin":"zhuonixian"},
{
"firstLetter":"z",
"id":"623023000000",
"jianpin":"zqx",
"level":3,
"name":"舟曲县",
"pid":"623000000000",
"pinyin":"zhouquxian"},
{
"firstLetter":"d",
"id":"623024000000",
"jianpin":"dbx",
"level":3,
"name":"迭部县",
"pid":"623000000000",
"pinyin":"diebuxian"},
{
"firstLetter":"m",
"id":"623025000000",
"jianpin":"mqx",
"level":3,
"name":"玛曲县",
"pid":"623000000000",
"pinyin":"maquxian"},
{
"firstLetter":"l",
"id":"623026000000",
"jianpin":"lqx",
"level":3,
"name":"碌曲县",
"pid":"623000000000",
"pinyin":"liuquxian"},
{
"firstLetter":"x",
"id":"623027000000",
"jianpin":"xhx",
"level":3,
"name":"夏河县",
"pid":"623000000000",
"pinyin":"xiahexian"}]],


[
[{
"firstLetter":"s",
"id":"630101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"630100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"c",
"id":"630102000000",
"jianpin":"cdq",
"level":3,
"name":"城东区",
"pid":"630100000000",
"pinyin":"chengdongqu"},
{
"firstLetter":"c",
"id":"630103000000",
"jianpin":"czq",
"level":3,
"name":"城中区",
"pid":"630100000000",
"pinyin":"chengzhongqu"},
{
"firstLetter":"c",
"id":"630104000000",
"jianpin":"cxq",
"level":3,
"name":"城西区",
"pid":"630100000000",
"pinyin":"chengxiqu"},
{
"firstLetter":"c",
"id":"630105000000",
"jianpin":"cbq",
"level":3,
"name":"城北区",
"pid":"630100000000",
"pinyin":"chengbeiqu"},
{
"firstLetter":"d",
"id":"630121000000",
"jianpin":"dthztzzzx",
"level":3,
"name":"大通回族土族自治县",
"pid":"630100000000",
"pinyin":"datonghuizutuzuzizhixian"},
{
"firstLetter":"h",
"id":"630122000000",
"jianpin":"hzx",
"level":3,
"name":"湟中县",
"pid":"630100000000",
"pinyin":"huangzhongxian"},
{
"firstLetter":"h",
"id":"630123000000",
"jianpin":"hyx",
"level":3,
"name":"湟源县",
"pid":"630100000000",
"pinyin":"huangyuanxian"}],

[{
"firstLetter":"l",
"id":"630202000000",
"jianpin":"ldq",
"level":3,
"name":"乐都区",
"pid":"630200000000",
"pinyin":"ledouqu"},
{
"firstLetter":"p",
"id":"630203000000",
"jianpin":"paq",
"level":3,
"name":"平安区",
"pid":"630200000000",
"pinyin":"pinganqu"},
{
"firstLetter":"m",
"id":"630222000000",
"jianpin":"mhhztzzzx",
"level":3,
"name":"民和回族土族自治县",
"pid":"630200000000",
"pinyin":"minhehuizutuzuzizhixian"},
{
"firstLetter":"h",
"id":"630223000000",
"jianpin":"hztzzzx",
"level":3,
"name":"互助土族自治县",
"pid":"630200000000",
"pinyin":"huzhutuzuzizhixian"},
{
"firstLetter":"h",
"id":"630224000000",
"jianpin":"hlhzzzx",
"level":3,
"name":"化隆回族自治县",
"pid":"630200000000",
"pinyin":"hualonghuizuzizhixian"},
{
"firstLetter":"x",
"id":"630225000000",
"jianpin":"xhslzzzx",
"level":3,
"name":"循化撒拉族自治县",
"pid":"630200000000",
"pinyin":"xunhuasalazuzizhixian"}],

[{
"firstLetter":"m",
"id":"632221000000",
"jianpin":"myhzzzx",
"level":3,
"name":"门源回族自治县",
"pid":"632200000000",
"pinyin":"menyuanhuizuzizhixian"},
{
"firstLetter":"q",
"id":"632222000000",
"jianpin":"qlx",
"level":3,
"name":"祁连县",
"pid":"632200000000",
"pinyin":"qilianxian"},
{
"firstLetter":"h",
"id":"632223000000",
"jianpin":"hyx",
"level":3,
"name":"海晏县",
"pid":"632200000000",
"pinyin":"haiyanxian"},
{
"firstLetter":"g",
"id":"632224000000",
"jianpin":"gcx",
"level":3,
"name":"刚察县",
"pid":"632200000000",
"pinyin":"gangchaxian"}],

[{
"firstLetter":"t",
"id":"632321000000",
"jianpin":"trx",
"level":3,
"name":"同仁县",
"pid":"632300000000",
"pinyin":"tongrenxian"},
{
"firstLetter":"j",
"id":"632322000000",
"jianpin":"jzx",
"level":3,
"name":"尖扎县",
"pid":"632300000000",
"pinyin":"jianzhaxian"},
{
"firstLetter":"z",
"id":"632323000000",
"jianpin":"zkx",
"level":3,
"name":"泽库县",
"pid":"632300000000",
"pinyin":"zekuxian"},
{
"firstLetter":"h",
"id":"632324000000",
"jianpin":"hnmgzzzx",
"level":3,
"name":"河南蒙古族自治县",
"pid":"632300000000",
"pinyin":"henanmengguzuzizhixian"}],

[{
"firstLetter":"g",
"id":"632521000000",
"jianpin":"ghx",
"level":3,
"name":"共和县",
"pid":"632500000000",
"pinyin":"gonghexian"},
{
"firstLetter":"t",
"id":"632522000000",
"jianpin":"tdx",
"level":3,
"name":"同德县",
"pid":"632500000000",
"pinyin":"tongdexian"},
{
"firstLetter":"g",
"id":"632523000000",
"jianpin":"gdx",
"level":3,
"name":"贵德县",
"pid":"632500000000",
"pinyin":"guidexian"},
{
"firstLetter":"x",
"id":"632524000000",
"jianpin":"xhx",
"level":3,
"name":"兴海县",
"pid":"632500000000",
"pinyin":"xinghaixian"},
{
"firstLetter":"g",
"id":"632525000000",
"jianpin":"gnx",
"level":3,
"name":"贵南县",
"pid":"632500000000",
"pinyin":"guinanxian"}],

[{
"firstLetter":"m",
"id":"632621000000",
"jianpin":"mqx",
"level":3,
"name":"玛沁县",
"pid":"632600000000",
"pinyin":"maqinxian"},
{
"firstLetter":"b",
"id":"632622000000",
"jianpin":"bmx",
"level":3,
"name":"班玛县",
"pid":"632600000000",
"pinyin":"banmaxian"},
{
"firstLetter":"g",
"id":"632623000000",
"jianpin":"gdx",
"level":3,
"name":"甘德县",
"pid":"632600000000",
"pinyin":"gandexian"},
{
"firstLetter":"d",
"id":"632624000000",
"jianpin":"drx",
"level":3,
"name":"达日县",
"pid":"632600000000",
"pinyin":"darixian"},
{
"firstLetter":"j",
"id":"632625000000",
"jianpin":"jzx",
"level":3,
"name":"久治县",
"pid":"632600000000",
"pinyin":"jiuzhixian"},
{
"firstLetter":"m",
"id":"632626000000",
"jianpin":"mdx",
"level":3,
"name":"玛多县",
"pid":"632600000000",
"pinyin":"maduoxian"}],

[{
"firstLetter":"y",
"id":"632701000000",
"jianpin":"yss",
"level":3,
"name":"玉树市",
"pid":"632700000000",
"pinyin":"yushushi"},
{
"firstLetter":"z",
"id":"632722000000",
"jianpin":"zdx",
"level":3,
"name":"杂多县",
"pid":"632700000000",
"pinyin":"zaduoxian"},
{
"firstLetter":"c",
"id":"632723000000",
"jianpin":"cdx",
"level":3,
"name":"称多县",
"pid":"632700000000",
"pinyin":"chengduoxian"},
{
"firstLetter":"z",
"id":"632724000000",
"jianpin":"zdx",
"level":3,
"name":"治多县",
"pid":"632700000000",
"pinyin":"zhiduoxian"},
{
"firstLetter":"n",
"id":"632725000000",
"jianpin":"nqx",
"level":3,
"name":"囊谦县",
"pid":"632700000000",
"pinyin":"nangqianxian"},
{
"firstLetter":"q",
"id":"632726000000",
"jianpin":"qmlx",
"level":3,
"name":"曲麻莱县",
"pid":"632700000000",
"pinyin":"qumalaixian"}],

[{
"firstLetter":"g",
"id":"632801000000",
"jianpin":"gems",
"level":3,
"name":"格尔木市",
"pid":"632800000000",
"pinyin":"geermushi"},
{
"firstLetter":"d",
"id":"632802000000",
"jianpin":"dlhs",
"level":3,
"name":"德令哈市",
"pid":"632800000000",
"pinyin":"delinghashi"},
{
"firstLetter":"w",
"id":"632821000000",
"jianpin":"wlx",
"level":3,
"name":"乌兰县",
"pid":"632800000000",
"pinyin":"wulanxian"},
{
"firstLetter":"d",
"id":"632822000000",
"jianpin":"dlx",
"level":3,
"name":"都兰县",
"pid":"632800000000",
"pinyin":"doulanxian"},
{
"firstLetter":"t",
"id":"632823000000",
"jianpin":"tjx",
"level":3,
"name":"天峻县",
"pid":"632800000000",
"pinyin":"tianjunxian"},
{
"firstLetter":"d",
"id":"632857000000",
"jianpin":"dcdxzwyh",
"level":3,
"name":"大柴旦行政委员会",
"pid":"632800000000",
"pinyin":"dachaidanxingzhengweiyuanhui"},
{
"firstLetter":"l",
"id":"632858000000",
"jianpin":"lhxzwyh",
"level":3,
"name":"冷湖行政委员会",
"pid":"632800000000",
"pinyin":"lenghuxingzhengweiyuanhui"},
{
"firstLetter":"m",
"id":"632859000000",
"jianpin":"myxzwyh",
"level":3,
"name":"茫崖行政委员会",
"pid":"632800000000",
"pinyin":"mangyaxingzhengweiyuanhui"}]],


[
[{
"firstLetter":"s",
"id":"640101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"640100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"x",
"id":"640104000000",
"jianpin":"xqq",
"level":3,
"name":"兴庆区",
"pid":"640100000000",
"pinyin":"xingqingqu"},
{
"firstLetter":"x",
"id":"640105000000",
"jianpin":"xxq",
"level":3,
"name":"西夏区",
"pid":"640100000000",
"pinyin":"xixiaqu"},
{
"firstLetter":"j",
"id":"640106000000",
"jianpin":"jfq",
"level":3,
"name":"金凤区",
"pid":"640100000000",
"pinyin":"jinfengqu"},
{
"firstLetter":"y",
"id":"640121000000",
"jianpin":"ynx",
"level":3,
"name":"永宁县",
"pid":"640100000000",
"pinyin":"yongningxian"},
{
"firstLetter":"h",
"id":"640122000000",
"jianpin":"hlx",
"level":3,
"name":"贺兰县",
"pid":"640100000000",
"pinyin":"helanxian"},
{
"firstLetter":"l",
"id":"640181000000",
"jianpin":"lws",
"level":3,
"name":"灵武市",
"pid":"640100000000",
"pinyin":"lingwushi"}],

[{
"firstLetter":"s",
"id":"640201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"640200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"640202000000",
"jianpin":"dwkq",
"level":3,
"name":"大武口区",
"pid":"640200000000",
"pinyin":"dawukouqu"},
{
"firstLetter":"h",
"id":"640205000000",
"jianpin":"hnq",
"level":3,
"name":"惠农区",
"pid":"640200000000",
"pinyin":"huinongqu"},
{
"firstLetter":"p",
"id":"640221000000",
"jianpin":"plx",
"level":3,
"name":"平罗县",
"pid":"640200000000",
"pinyin":"pingluoxian"}],

[{
"firstLetter":"s",
"id":"640301000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"640300000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"l",
"id":"640302000000",
"jianpin":"ltq",
"level":3,
"name":"利通区",
"pid":"640300000000",
"pinyin":"litongqu"},
{
"firstLetter":"h",
"id":"640303000000",
"jianpin":"hsbq",
"level":3,
"name":"红寺堡区",
"pid":"640300000000",
"pinyin":"hongsibaoqu"},
{
"firstLetter":"y",
"id":"640323000000",
"jianpin":"ycx",
"level":3,
"name":"盐池县",
"pid":"640300000000",
"pinyin":"yanchixian"},
{
"firstLetter":"t",
"id":"640324000000",
"jianpin":"txx",
"level":3,
"name":"同心县",
"pid":"640300000000",
"pinyin":"tongxinxian"},
{
"firstLetter":"q",
"id":"640381000000",
"jianpin":"qtxs",
"level":3,
"name":"青铜峡市",
"pid":"640300000000",
"pinyin":"qingtongxiashi"}],

[{
"firstLetter":"s",
"id":"640401000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"640400000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"y",
"id":"640402000000",
"jianpin":"yzq",
"level":3,
"name":"原州区",
"pid":"640400000000",
"pinyin":"yuanzhouqu"},
{
"firstLetter":"x",
"id":"640422000000",
"jianpin":"xjx",
"level":3,
"name":"西吉县",
"pid":"640400000000",
"pinyin":"xijixian"},
{
"firstLetter":"l",
"id":"640423000000",
"jianpin":"ldx",
"level":3,
"name":"隆德县",
"pid":"640400000000",
"pinyin":"longdexian"},
{
"firstLetter":"j",
"id":"640424000000",
"jianpin":"jyx",
"level":3,
"name":"泾源县",
"pid":"640400000000",
"pinyin":"jingyuanxian"},
{
"firstLetter":"p",
"id":"640425000000",
"jianpin":"pyx",
"level":3,
"name":"彭阳县",
"pid":"640400000000",
"pinyin":"pengyangxian"}],

[{
"firstLetter":"s",
"id":"640501000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"640500000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"s",
"id":"640502000000",
"jianpin":"sptq",
"level":3,
"name":"沙坡头区",
"pid":"640500000000",
"pinyin":"shapotouqu"},
{
"firstLetter":"z",
"id":"640521000000",
"jianpin":"znx",
"level":3,
"name":"中宁县",
"pid":"640500000000",
"pinyin":"zhongningxian"},
{
"firstLetter":"h",
"id":"640522000000",
"jianpin":"hyx",
"level":3,
"name":"海原县",
"pid":"640500000000",
"pinyin":"haiyuanxian"}]],


[
[{
"firstLetter":"s",
"id":"650101000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"650100000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"t",
"id":"650102000000",
"jianpin":"tsq",
"level":3,
"name":"天山区",
"pid":"650100000000",
"pinyin":"tianshanqu"},
{
"firstLetter":"s",
"id":"650103000000",
"jianpin":"sybkq",
"level":3,
"name":"沙依巴克区",
"pid":"650100000000",
"pinyin":"shayibakequ"},
{
"firstLetter":"x",
"id":"650104000000",
"jianpin":"xsq",
"level":3,
"name":"新市区",
"pid":"650100000000",
"pinyin":"xinshiqu"},
{
"firstLetter":"s",
"id":"650105000000",
"jianpin":"smgq",
"level":3,
"name":"水磨沟区",
"pid":"650100000000",
"pinyin":"shuimogouqu"},
{
"firstLetter":"t",
"id":"650106000000",
"jianpin":"tthq",
"level":3,
"name":"头屯河区",
"pid":"650100000000",
"pinyin":"toutunhequ"},
{
"firstLetter":"d",
"id":"650107000000",
"jianpin":"dbcq",
"level":3,
"name":"达坂城区",
"pid":"650100000000",
"pinyin":"dabanchengqu"},
{
"firstLetter":"m",
"id":"650109000000",
"jianpin":"mdq",
"level":3,
"name":"米东区",
"pid":"650100000000",
"pinyin":"midongqu"},
{
"firstLetter":"w",
"id":"650121000000",
"jianpin":"wlmqx",
"level":3,
"name":"乌鲁木齐县",
"pid":"650100000000",
"pinyin":"wulumuqixian"},
{
"firstLetter":"w",
"id":"650171000000",
"jianpin":"wlmqjjjskfq",
"level":3,
"name":"乌鲁木齐经济技术开发区",
"pid":"650100000000",
"pinyin":"wulumuqijingjijishukaifaqu"},
{
"firstLetter":"w",
"id":"650172000000",
"jianpin":"wlmqgxjscykfq",
"level":3,
"name":"乌鲁木齐高新技术产业开发区",
"pid":"650100000000",
"pinyin":"wulumuqigaoxinjishuchanyekaifaqu"}],

[{
"firstLetter":"s",
"id":"650201000000",
"jianpin":"sxq",
"level":3,
"name":"市辖区",
"pid":"650200000000",
"pinyin":"shixiaqu"},
{
"firstLetter":"d",
"id":"650202000000",
"jianpin":"dszq",
"level":3,
"name":"独山子区",
"pid":"650200000000",
"pinyin":"dushanziqu"},
{
"firstLetter":"k",
"id":"650203000000",
"jianpin":"klmyq",
"level":3,
"name":"克拉玛依区",
"pid":"650200000000",
"pinyin":"kelamayiqu"},
{
"firstLetter":"b",
"id":"650204000000",
"jianpin":"bjtq",
"level":3,
"name":"白碱滩区",
"pid":"650200000000",
"pinyin":"baijiantanqu"},
{
"firstLetter":"w",
"id":"650205000000",
"jianpin":"wehq",
"level":3,
"name":"乌尔禾区",
"pid":"650200000000",
"pinyin":"wuerhequ"}],

[{
"firstLetter":"g",
"id":"650402000000",
"jianpin":"gcq",
"level":3,
"name":"高昌区",
"pid":"650400000000",
"pinyin":"gaochangqu"},
{
"firstLetter":"s",
"id":"650421000000",
"jianpin":"ssx",
"level":3,
"name":"鄯善县",
"pid":"650400000000",
"pinyin":"shanshanxian"},
{
"firstLetter":"t",
"id":"650422000000",
"jianpin":"tkxx",
"level":3,
"name":"托克逊县",
"pid":"650400000000",
"pinyin":"tuokexunxian"}],

[{
"firstLetter":"y",
"id":"650502000000",
"jianpin":"yzq",
"level":3,
"name":"伊州区",
"pid":"650500000000",
"pinyin":"yizhouqu"},
{
"firstLetter":"b",
"id":"650521000000",
"jianpin":"blkhskzzx",
"level":3,
"name":"巴里坤哈萨克自治县",
"pid":"650500000000",
"pinyin":"balikunhasakezizhixian"},
{
"firstLetter":"y",
"id":"650522000000",
"jianpin":"ywx",
"level":3,
"name":"伊吾县",
"pid":"650500000000",
"pinyin":"yiwuxian"}],

[{
"firstLetter":"c",
"id":"652301000000",
"jianpin":"cjs",
"level":3,
"name":"昌吉市",
"pid":"652300000000",
"pinyin":"changjishi"},
{
"firstLetter":"f",
"id":"652302000000",
"jianpin":"fks",
"level":3,
"name":"阜康市",
"pid":"652300000000",
"pinyin":"fukangshi"},
{
"firstLetter":"h",
"id":"652323000000",
"jianpin":"htbx",
"level":3,
"name":"呼图壁县",
"pid":"652300000000",
"pinyin":"hutubixian"},
{
"firstLetter":"m",
"id":"652324000000",
"jianpin":"mnsx",
"level":3,
"name":"玛纳斯县",
"pid":"652300000000",
"pinyin":"manasixian"},
{
"firstLetter":"q",
"id":"652325000000",
"jianpin":"qtx",
"level":3,
"name":"奇台县",
"pid":"652300000000",
"pinyin":"qitaixian"},
{
"firstLetter":"j",
"id":"652327000000",
"jianpin":"jmsex",
"level":3,
"name":"吉木萨尔县",
"pid":"652300000000",
"pinyin":"jimusaerxian"},
{
"firstLetter":"m",
"id":"652328000000",
"jianpin":"mlhskzzx",
"level":3,
"name":"木垒哈萨克自治县",
"pid":"652300000000",
"pinyin":"muleihasakezizhixian"}],

[{
"firstLetter":"b",
"id":"652701000000",
"jianpin":"bls",
"level":3,
"name":"博乐市",
"pid":"652700000000",
"pinyin":"boleshi"},
{
"firstLetter":"a",
"id":"652702000000",
"jianpin":"alsks",
"level":3,
"name":"阿拉山口市",
"pid":"652700000000",
"pinyin":"alashankoushi"},
{
"firstLetter":"j",
"id":"652722000000",
"jianpin":"jhx",
"level":3,
"name":"精河县",
"pid":"652700000000",
"pinyin":"jinghexian"},
{
"firstLetter":"w",
"id":"652723000000",
"jianpin":"wqx",
"level":3,
"name":"温泉县",
"pid":"652700000000",
"pinyin":"wenquanxian"}],

[{
"firstLetter":"k",
"id":"652801000000",
"jianpin":"kels",
"level":3,
"name":"库尔勒市",
"pid":"652800000000",
"pinyin":"kuerleshi"},
{
"firstLetter":"l",
"id":"652822000000",
"jianpin":"ltx",
"level":3,
"name":"轮台县",
"pid":"652800000000",
"pinyin":"luntaixian"},
{
"firstLetter":"w",
"id":"652823000000",
"jianpin":"wlx",
"level":3,
"name":"尉犁县",
"pid":"652800000000",
"pinyin":"weilixian"},
{
"firstLetter":"r",
"id":"652824000000",
"jianpin":"rqx",
"level":3,
"name":"若羌县",
"pid":"652800000000",
"pinyin":"ruoqiangxian"},
{
"firstLetter":"q",
"id":"652825000000",
"jianpin":"qmx",
"level":3,
"name":"且末县",
"pid":"652800000000",
"pinyin":"qiemoxian"},
{
"firstLetter":"y",
"id":"652826000000",
"jianpin":"yqhzzzx",
"level":3,
"name":"焉耆回族自治县",
"pid":"652800000000",
"pinyin":"yanqihuizuzizhixian"},
{
"firstLetter":"h",
"id":"652827000000",
"jianpin":"hjx",
"level":3,
"name":"和静县",
"pid":"652800000000",
"pinyin":"hejingxian"},
{
"firstLetter":"h",
"id":"652828000000",
"jianpin":"hsx",
"level":3,
"name":"和硕县",
"pid":"652800000000",
"pinyin":"heshuoxian"},
{
"firstLetter":"b",
"id":"652829000000",
"jianpin":"bhx",
"level":3,
"name":"博湖县",
"pid":"652800000000",
"pinyin":"bohuxian"},
{
"firstLetter":"k",
"id":"652871000000",
"jianpin":"keljjjskfq",
"level":3,
"name":"库尔勒经济技术开发区",
"pid":"652800000000",
"pinyin":"kuerlejingjijishukaifaqu"}],

[{
"firstLetter":"a",
"id":"652901000000",
"jianpin":"akss",
"level":3,
"name":"阿克苏市",
"pid":"652900000000",
"pinyin":"akesushi"},
{
"firstLetter":"w",
"id":"652922000000",
"jianpin":"wsx",
"level":3,
"name":"温宿县",
"pid":"652900000000",
"pinyin":"wensuxian"},
{
"firstLetter":"k",
"id":"652923000000",
"jianpin":"kcx",
"level":3,
"name":"库车县",
"pid":"652900000000",
"pinyin":"kuchexian"},
{
"firstLetter":"s",
"id":"652924000000",
"jianpin":"syx",
"level":3,
"name":"沙雅县",
"pid":"652900000000",
"pinyin":"shayaxian"},
{
"firstLetter":"x",
"id":"652925000000",
"jianpin":"xhx",
"level":3,
"name":"新和县",
"pid":"652900000000",
"pinyin":"xinhexian"},
{
"firstLetter":"b",
"id":"652926000000",
"jianpin":"bcx",
"level":3,
"name":"拜城县",
"pid":"652900000000",
"pinyin":"baichengxian"},
{
"firstLetter":"w",
"id":"652927000000",
"jianpin":"wsx",
"level":3,
"name":"乌什县",
"pid":"652900000000",
"pinyin":"wushenxian"},
{
"firstLetter":"a",
"id":"652928000000",
"jianpin":"awtx",
"level":3,
"name":"阿瓦提县",
"pid":"652900000000",
"pinyin":"awatixian"},
{
"firstLetter":"k",
"id":"652929000000",
"jianpin":"kpx",
"level":3,
"name":"柯坪县",
"pid":"652900000000",
"pinyin":"kepingxian"}],

[{
"firstLetter":"a",
"id":"653001000000",
"jianpin":"atss",
"level":3,
"name":"阿图什市",
"pid":"653000000000",
"pinyin":"atushenshi"},
{
"firstLetter":"a",
"id":"653022000000",
"jianpin":"aktx",
"level":3,
"name":"阿克陶县",
"pid":"653000000000",
"pinyin":"aketaoxian"},
{
"firstLetter":"a",
"id":"653023000000",
"jianpin":"ahqx",
"level":3,
"name":"阿合奇县",
"pid":"653000000000",
"pinyin":"aheqixian"},
{
"firstLetter":"w",
"id":"653024000000",
"jianpin":"wqx",
"level":3,
"name":"乌恰县",
"pid":"653000000000",
"pinyin":"wuqiaxian"}],

[{
"firstLetter":"k",
"id":"653101000000",
"jianpin":"kss",
"level":3,
"name":"喀什市",
"pid":"653100000000",
"pinyin":"kashenshi"},
{
"firstLetter":"s",
"id":"653121000000",
"jianpin":"sfx",
"level":3,
"name":"疏附县",
"pid":"653100000000",
"pinyin":"shufuxian"},
{
"firstLetter":"s",
"id":"653122000000",
"jianpin":"slx",
"level":3,
"name":"疏勒县",
"pid":"653100000000",
"pinyin":"shulexian"},
{
"firstLetter":"y",
"id":"653123000000",
"jianpin":"yjsx",
"level":3,
"name":"英吉沙县",
"pid":"653100000000",
"pinyin":"yingjishaxian"},
{
"firstLetter":"z",
"id":"653124000000",
"jianpin":"zpx",
"level":3,
"name":"泽普县",
"pid":"653100000000",
"pinyin":"zepuxian"},
{
"firstLetter":"s",
"id":"653125000000",
"jianpin":"scx",
"level":3,
"name":"莎车县",
"pid":"653100000000",
"pinyin":"shachexian"},
{
"firstLetter":"y",
"id":"653126000000",
"jianpin":"ycx",
"level":3,
"name":"叶城县",
"pid":"653100000000",
"pinyin":"yechengxian"},
{
"firstLetter":"m",
"id":"653127000000",
"jianpin":"mgtx",
"level":3,
"name":"麦盖提县",
"pid":"653100000000",
"pinyin":"maigaitixian"},
{
"firstLetter":"y",
"id":"653128000000",
"jianpin":"yphx",
"level":3,
"name":"岳普湖县",
"pid":"653100000000",
"pinyin":"yuepuhuxian"},
{
"firstLetter":"j",
"id":"653129000000",
"jianpin":"jsx",
"level":3,
"name":"伽师县",
"pid":"653100000000",
"pinyin":"jiashixian"},
{
"firstLetter":"b",
"id":"653130000000",
"jianpin":"bcx",
"level":3,
"name":"巴楚县",
"pid":"653100000000",
"pinyin":"bachuxian"},
{
"firstLetter":"t",
"id":"653131000000",
"jianpin":"tskegtjkzzx",
"level":3,
"name":"塔什库尔干塔吉克自治县",
"pid":"653100000000",
"pinyin":"tashenkuergantajikezizhixian"}],

[{
"firstLetter":"h",
"id":"653201000000",
"jianpin":"hts",
"level":3,
"name":"和田市",
"pid":"653200000000",
"pinyin":"hetianshi"},
{
"firstLetter":"h",
"id":"653221000000",
"jianpin":"htx",
"level":3,
"name":"和田县",
"pid":"653200000000",
"pinyin":"hetianxian"},
{
"firstLetter":"m",
"id":"653222000000",
"jianpin":"myx",
"level":3,
"name":"墨玉县",
"pid":"653200000000",
"pinyin":"moyuxian"},
{
"firstLetter":"p",
"id":"653223000000",
"jianpin":"psx",
"level":3,
"name":"皮山县",
"pid":"653200000000",
"pinyin":"pishanxian"},
{
"firstLetter":"l",
"id":"653224000000",
"jianpin":"lpx",
"level":3,
"name":"洛浦县",
"pid":"653200000000",
"pinyin":"luopuxian"},
{
"firstLetter":"c",
"id":"653225000000",
"jianpin":"clx",
"level":3,
"name":"策勒县",
"pid":"653200000000",
"pinyin":"celexian"},
{
"firstLetter":"y",
"id":"653226000000",
"jianpin":"ytx",
"level":3,
"name":"于田县",
"pid":"653200000000",
"pinyin":"yutianxian"},
{
"firstLetter":"m",
"id":"653227000000",
"jianpin":"mfx",
"level":3,
"name":"民丰县",
"pid":"653200000000",
"pinyin":"minfengxian"}],

[{
"firstLetter":"y",
"id":"654002000000",
"jianpin":"yns",
"level":3,
"name":"伊宁市",
"pid":"654000000000",
"pinyin":"yiningshi"},
{
"firstLetter":"k",
"id":"654003000000",
"jianpin":"kts",
"level":3,
"name":"奎屯市",
"pid":"654000000000",
"pinyin":"kuitunshi"},
{
"firstLetter":"h",
"id":"654004000000",
"jianpin":"hegss",
"level":3,
"name":"霍尔果斯市",
"pid":"654000000000",
"pinyin":"huoerguosishi"},
{
"firstLetter":"y",
"id":"654021000000",
"jianpin":"ynx",
"level":3,
"name":"伊宁县",
"pid":"654000000000",
"pinyin":"yiningxian"},
{
"firstLetter":"c",
"id":"654022000000",
"jianpin":"cbcexbzzx",
"level":3,
"name":"察布查尔锡伯自治县",
"pid":"654000000000",
"pinyin":"chabuchaerxibozizhixian"},
{
"firstLetter":"h",
"id":"654023000000",
"jianpin":"hcx",
"level":3,
"name":"霍城县",
"pid":"654000000000",
"pinyin":"huochengxian"},
{
"firstLetter":"g",
"id":"654024000000",
"jianpin":"glx",
"level":3,
"name":"巩留县",
"pid":"654000000000",
"pinyin":"gongliuxian"},
{
"firstLetter":"x",
"id":"654025000000",
"jianpin":"xyx",
"level":3,
"name":"新源县",
"pid":"654000000000",
"pinyin":"xinyuanxian"},
{
"firstLetter":"z",
"id":"654026000000",
"jianpin":"zsx",
"level":3,
"name":"昭苏县",
"pid":"654000000000",
"pinyin":"zhaosuxian"},
{
"firstLetter":"t",
"id":"654027000000",
"jianpin":"tksx",
"level":3,
"name":"特克斯县",
"pid":"654000000000",
"pinyin":"tekesixian"},
{
"firstLetter":"n",
"id":"654028000000",
"jianpin":"nlkx",
"level":3,
"name":"尼勒克县",
"pid":"654000000000",
"pinyin":"nilekexian"}],

[{
"firstLetter":"t",
"id":"654201000000",
"jianpin":"tcs",
"level":3,
"name":"塔城市",
"pid":"654200000000",
"pinyin":"tachengshi"},
{
"firstLetter":"w",
"id":"654202000000",
"jianpin":"wss",
"level":3,
"name":"乌苏市",
"pid":"654200000000",
"pinyin":"wusushi"},
{
"firstLetter":"e",
"id":"654221000000",
"jianpin":"emx",
"level":3,
"name":"额敏县",
"pid":"654200000000",
"pinyin":"eminxian"},
{
"firstLetter":"s",
"id":"654223000000",
"jianpin":"swx",
"level":3,
"name":"沙湾县",
"pid":"654200000000",
"pinyin":"shawanxian"},
{
"firstLetter":"t",
"id":"654224000000",
"jianpin":"tlx",
"level":3,
"name":"托里县",
"pid":"654200000000",
"pinyin":"tuolixian"},
{
"firstLetter":"y",
"id":"654225000000",
"jianpin":"ymx",
"level":3,
"name":"裕民县",
"pid":"654200000000",
"pinyin":"yuminxian"},
{
"firstLetter":"h",
"id":"654226000000",
"jianpin":"hbksemgzzx",
"level":3,
"name":"和布克赛尔蒙古自治县",
"pid":"654200000000",
"pinyin":"hebukesaiermengguzizhixian"}],

[{
"firstLetter":"a",
"id":"654301000000",
"jianpin":"alts",
"level":3,
"name":"阿勒泰市",
"pid":"654300000000",
"pinyin":"aletaishi"},
{
"firstLetter":"b",
"id":"654321000000",
"jianpin":"bejx",
"level":3,
"name":"布尔津县",
"pid":"654300000000",
"pinyin":"buerjinxian"},
{
"firstLetter":"f",
"id":"654322000000",
"jianpin":"fyx",
"level":3,
"name":"富蕴县",
"pid":"654300000000",
"pinyin":"fuyunxian"},
{
"firstLetter":"f",
"id":"654323000000",
"jianpin":"fhx",
"level":3,
"name":"福海县",
"pid":"654300000000",
"pinyin":"fuhaixian"},
{
"firstLetter":"h",
"id":"654324000000",
"jianpin":"hbhx",
"level":3,
"name":"哈巴河县",
"pid":"654300000000",
"pinyin":"habahexian"},
{
"firstLetter":"q",
"id":"654325000000",
"jianpin":"qhx",
"level":3,
"name":"青河县",
"pid":"654300000000",
"pinyin":"qinghexian"},
{
"firstLetter":"j",
"id":"654326000000",
"jianpin":"jmnx",
"level":3,
"name":"吉木乃县",
"pid":"654300000000",
"pinyin":"jimunaixian"}],

[{
"firstLetter":"s",
"id":"659001000000",
"jianpin":"shzs",
"level":3,
"name":"石河子市",
"pid":"659000000000",
"pinyin":"shihezishi"},
{
"firstLetter":"a",
"id":"659002000000",
"jianpin":"ales",
"level":3,
"name":"阿拉尔市",
"pid":"659000000000",
"pinyin":"alaershi"},
{
"firstLetter":"t",
"id":"659003000000",
"jianpin":"tmsks",
"level":3,
"name":"图木舒克市",
"pid":"659000000000",
"pinyin":"tumushukeshi"},
{
"firstLetter":"w",
"id":"659004000000",
"jianpin":"wjqs",
"level":3,
"name":"五家渠市",
"pid":"659000000000",
"pinyin":"wujiaqushi"},
{
"firstLetter":"t",
"id":"659006000000",
"jianpin":"tmgs",
"level":3,
"name":"铁门关市",
"pid":"659000000000",
"pinyin":"tiemenguanshi"}]]];var _default=



areaData;exports.default=_default;

/***/ }),

/***/ 8:
/*!**************************************************!*\
  !*** D:/项目/商城小程序/amazing-mall/static/js/ajax.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.request = request;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // 记录调用 request 方法的次数
var ajaxTimes = 0;

// 请求地址的基本路径
// const baseUrl = 'https://api.it120.cc/llg'
var baseUrl = 'https://api.it120.cc/doufu';
var Timer = null;

function request(params) {
  // 每次调用 request 方法时，将 ajaxTimes 计数器自增一
  ajaxTimes++;
  // 显示加载数据的提示
  // Timer = setTimeout(() => {
  // uni.showLoading({
  // 	title: '加载中...',
  // 	mask: true
  // })
  // }, 0)
  return new Promise(function (resolve, reject) {
    uni.request(_objectSpread({},
    params, {
      url: baseUrl + params.url,
      method: params.method,
      timeout: '10000',
      data: params.data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' },

      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      },
      complete: function complete() {
        // console.log(Timer)
        // clearTimeout(Timer)
        // 每当完成一个请求，让 ajaxTimes 计数器自减一
        ajaxTimes--;

        if (ajaxTimes === 0) {
          // 停止加载数据的提示

          // uni.hideLoading()
        }
      } }));

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map