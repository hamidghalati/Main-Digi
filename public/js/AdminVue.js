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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Counter.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Counter.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _myMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../myMixin */ "./resources/js/myMixin.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Counter",
  mixins: [_myMixin__WEBPACK_IMPORTED_MODULE_0__["default"]],
  data: function data() {
    return {
      h: '',
      m: '',
      s: '',
      show_second: 0
    };
  },
  props: ['second'],
  mounted: function mounted() {
    this.show_second = this.second;
    this.counter();
    setInterval(this.counter, 1000);
  },
  methods: {
    counter: function counter() {
      var second = this.show_second;
      var h = Math.floor(second / 3600);
      second = second - h * 3600;
      var m = Math.floor(second / 60);
      var s = second - m * 60;
      if (h.toString().length == 1) {
        h = "0" + h;
      }
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      if (s.toString().length == 1) {
        s = "0" + s;
      }
      this.h = this.replaceNumber(h);
      this.m = this.replaceNumber(m);
      this.s = this.replaceNumber(s);
      this.show_second = this.show_second - 1;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IncredibleOffers.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/IncredibleOffers.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "IncredibleOffers",
  components: {},
  data: function data() {
    return {
      WarrantyList: {
        data: []
      },
      page: 1,
      formInput: {
        price1: '',
        price2: '',
        product_number: '',
        product_number_cart: ''
      },
      options: {
        numeral: true
      },
      date1: '',
      date2: '',
      select_key: -1,
      warranty_id: -1,
      send_form: true,
      show_message_box: false,
      errors: {
        price1_error: false,
        price2_error: false,
        product_number_error: false,
        product_number_cart_error: false
      },
      label: {
        price1: 'هزینه محصول',
        price2: 'هزینه محصول برای فروش',
        product_number: 'تعداد موجودی (برای فروش)',
        product_number_cart: 'تعداد قابل سفارش در سبد خرید'
      },
      search_text: '',
      server_errors: null
    };
  },
  mounted: function mounted() {
    this.getWarrantyList(1);
  },
  methods: {
    getWarrantyList: function getWarrantyList(page) {
      var _this = this;
      this.page = page;
      var url = this.$siteUrl + 'admin/ajax/getWarranty?page=' + page + "&search_text=" + this.search_text;
      this.axios.get(url).then(function (response) {
        _this.WarrantyList = response.data;
      });
    },
    getRow: function getRow(index) {
      ++index;
      var k = (this.page - 1) * 10;
      k = k + index;
      return this.replaceNumber(k);
    },
    replaceNumber: function replaceNumber(n) {
      n = n.toString();
      var find = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      var replace = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      for (var i = 0; i < find.length; i++) {
        n = n.replace(new RegExp(find[i], 'g'), replace[i]);
      }
      return n;
    },
    show_box: function show_box(item_id, key) {
      if (this.send_form == true) {
        this.server_errors = false;
        this.warranty_id = item_id;
        this.select_key = key;
        this.formInput.price1 = this.WarrantyList.data[key].price1;
        this.formInput.price2 = this.WarrantyList.data[key].price2;
        this.formInput.product_number = this.WarrantyList.data[key].product_number;
        this.formInput.product_number_cart = this.WarrantyList.data[key].product_number_cart;
        this.date1 = this.WarrantyList.data[this.select_key].offers_first_date;
        this.date2 = this.WarrantyList.data[this.select_key].offers_last_date;
        $("#priceBox").modal('show');
      }
    },
    add: function add() {
      var _this2 = this;
      this.date1 = $("#pcal1").val();
      this.date2 = $("#pcal2").val();
      if (this.validateForm()) {
        this.send_form = false;
        var formData = new FormData();
        formData.append('price1', this.formInput.price1);
        formData.append('price2', this.formInput.price2);
        formData.append('product_number', this.formInput.product_number);
        formData.append('product_number_cart', this.formInput.product_number_cart);
        formData.append('date1', this.date1);
        formData.append('date2', this.date2);
        var url = this.$siteUrl + "admin/add_incredible_offers/" + this.warranty_id;
        this.axios.post(url, formData).then(function (response) {
          if (response.data == 'ok') {
            _this2.send_form = true;
            $("#priceBox").modal('hide');
            _this2.WarrantyList.data[_this2.select_key].offers = 1;
            _this2.WarrantyList.data[_this2.select_key].price1 = _this2.formInput.price1;
            _this2.WarrantyList.data[_this2.select_key].price2 = _this2.formInput.price2;
            _this2.WarrantyList.data[_this2.select_key].product_number = _this2.formInput.product_number;
            _this2.WarrantyList.data[_this2.select_key].product_number_cart = _this2.formInput.product_number_cart;
            _this2.WarrantyList.data[_this2.select_key].offers_first_date = _this2.date1;
            _this2.WarrantyList.data[_this2.select_key].offers_last_date = _this2.date2;
          } else if (response.data.error != undefined) {
            _this2.send_form = true;
          } else {
            _this2.server_errors = response.data;
            _this2.send_form = true;
          }
        });
      }
    },
    remove_offers: function remove_offers(item_id, key) {
      this.warranty_id = item_id;
      this.select_key = key;
      this.show_message_box = true;
    },
    remove_offers_list: function remove_offers_list() {
      var _this3 = this;
      this.show_message_box = false;
      var url = this.$siteUrl + "admin/remove_incredible_offers/" + this.warranty_id;
      this.axios.post(url).then(function (response) {
        if (response.data != 'error') {
          _this3.WarrantyList.data[_this3.select_key].offers = 0;
          _this3.WarrantyList.data[_this3.select_key].price1 = response.data.price1;
          _this3.WarrantyList.data[_this3.select_key].price2 = response.data.price2;
          _this3.WarrantyList.data[_this3.select_key].product_number = response.data.product_number;
          _this3.WarrantyList.data[_this3.select_key].product_number_cart = response.data.product_number_cart;
        }
      });
    },
    validateForm: function validateForm() {
      var result = true;
      for (var formInputKey in this.formInput) {
        var k = formInputKey + "_error";
        if (this.formInput[formInputKey].toString().trim().length == 0) {
          var message = this.label[formInputKey] + "  نمی تواند خالی باشد";
          this.errors[k] = message;
          result = false;
        } else {
          this.errors[k] = false;
        }
      }
      return result;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/OrderStep.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/OrderStep.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "OrderStep",
  props: ['steps', 'send_status', 'order_id'],
  data: function data() {
    return {
      show_box: false,
      status: 0,
      order_status: 0
    };
  },
  mounted: function mounted() {
    this.order_status = this.send_status;
  },
  methods: {
    change_status: function change_status(staus) {
      this.status = staus;
      this.show_box = true;
    },
    send_data: function send_data() {
      var _this = this;
      this.show_box = false;
      $("#loading").show();
      var formData = new FormData();
      formData.append('order_id', this.order_id);
      formData.append('status', this.status);
      var url = this.$siteUrl + '/admin/order/change_status';
      this.axios.post(url, formData).then(function (response) {
        $("#loading").hide();
        if (response.data == 'ok') {
          _this.order_status = _this.status;
        } else {
          $('.error_dialog').show();
          setTimeout(function () {
            $('.error_dialog').hide();
          }, 4000);
        }
      })["catch"](function (onerror) {
        $("#loading").hide();
        $('.error_dialog').show();
        setTimeout(function () {
          $('.error_dialog').hide();
        }, 4000);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SaleReport.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SaleReport.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var highcharts_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! highcharts-vue */ "./node_modules/highcharts-vue/dist/highcharts-vue.min.js");
/* harmony import */ var highcharts_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(highcharts_vue__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "SaleReport",
  props: ['product_id'],
  data: function data() {
    return {
      default_year: '',
      years: [],
      chartOptions: {
        series: [{
          data: [],
          color: 'rgba(244,81,108)',
          dataLabels: {
            enabled: true,
            color: "#FFFFFF",
            formatter: function formatter() {
              return number_format(this.y);
            },
            rotation: -90,
            style: {
              fontSize: '16px'
            },
            y: 10,
            align: 'right'
          },
          name: 'آمار فروش'
        }],
        title: {
          text: 'نمودار آمار فروش',
          update: true
        },
        xAxis: {
          type: 'category'
        },
        chart: {
          type: 'column',
          style: {
            fontFamily: 'IRANSans'
          }
        },
        yAxis: {
          title: {
            text: ''
          },
          labels: {
            useHTML: true,
            formatter: function formatter() {
              var values = this.value;
              if (values > 1000) {
                values = new Intl.NumberFormat().format(values);
              }
              return '<div style="direction: rtl">' + '<span>' + values + '  تومان  ' + '</span>' + '</div>';
            },
            style: {
              fontsize: '15px'
            }
          }
        },
        tooltip: {
          useHTML: true,
          formatter: function formatter() {
            return '<div style="width: 210px;text-align: right;font-size: 16px;">' + '<p><span> میزان فروش در </span>' + getMonthName(this.x) + '   ماه' + '</p>' + '<div style="color: rgba(244,81,108);direction: rtl;text-align: left"><span>' + number_format(this.y) + '</span><span>  تومان</span></div>' + '</div>';
          }
        }
      },
      chartOptions2: {
        series: [{
          data: [],
          dataLabels: {
            enabled: true,
            color: "#FFFFFF",
            formatter: function formatter() {
              return number_format(this.y);
            },
            rotation: -90,
            style: {
              fontSize: '16px'
            },
            y: 10,
            align: 'right'
          },
          name: 'کمیسیون'
        }],
        title: {
          text: ' کمیسیون دریافت شده از فروش محصول',
          update: true
        },
        xAxis: {
          type: 'category'
        },
        chart: {
          type: 'column',
          style: {
            fontFamily: 'IRANSans'
          }
        },
        yAxis: {
          title: {
            text: ''
          },
          labels: {
            useHTML: true,
            formatter: function formatter() {
              var values = this.value;
              if (values > 1000) {
                values = new Intl.NumberFormat().format(values);
              }
              return '<div style="direction: rtl">' + '<span>' + values + '  تومان  ' + '</span>' + '</div>';
            },
            style: {
              fontsize: '15px'
            }
          }
        },
        tooltip: {
          useHTML: true,
          formatter: function formatter() {
            return '<div style="width: 260px;text-align: right;font-size: 13px;">' + '<p><span> میزان کمیسیون دریافت شده در </span>' + getMonthName(this.x) + '   ماه' + '</p>' + '<div style="color: rgba(244,81,108);direction: rtl;text-align: left"><span>' + number_format(this.y) + '</span><span>  تومان</span></div>' + '</div>';
          }
        }
      },
      month: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      url: ''
    };
  },
  components: {
    highcharts: highcharts_vue__WEBPACK_IMPORTED_MODULE_0__["Chart"]
  },
  mounted: function mounted() {
    if (this.product_id == undefined) {
      this.url = this.$siteUrl + '/admin/shop/get_sale_report?default_year=' + this.default_year;
    } else {
      this.url = this.$siteUrl + '/admin/product/get_sale_report?default_year=' + this.default_year + '&product_id=' + this.product_id;
    }
    this.getData();
  },
  methods: {
    getData: function getData() {
      var _this = this;
      $("#loading").show();
      var app = this;
      this.axios.get(this.url).then(function (response) {
        $("#loading").hide();
        _this.chartOptions['series'][0]['data'] = [];
        var sale = response.data.sale;
        if (sale != undefined) {
          sale.forEach(function (row, key) {
            if (key != 0) {
              app.chartOptions['series'][0]['data'].push([app.getMonthName(key), row]);
            }
          });
        }
        var commission = response.data.commission;
        if (commission != undefined) {
          commission.forEach(function (row, key) {
            if (key != 0) {
              app.chartOptions2['series'][0]['data'].push([app.getMonthName(key), row]);
            }
          });
        }
        _this.years = response.data.year_list;
        _this.default_year = response.data.default_year;
        _this.$nextTick(function () {
          $(this.$refs.default_year).selectpicker('refresh');
        });
      })["catch"](function (error) {
        $("#loading").hide();
      });
    },
    getMonthName: function getMonthName(key) {
      key = key - 1;
      if (this.month[key] != undefined) {
        return this.month[key];
      } else {
        return '';
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomOutputList.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/StockroomOutputList.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _myMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../myMixin */ "./resources/js/myMixin.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "StockroomOutputList",
  props: ['stockroom'],
  mixins: [_myMixin__WEBPACK_IMPORTED_MODULE_0__["default"]],
  data: function data() {
    return {
      stockroom_id: 0,
      tozihat: '',
      ProductList: {
        data: []
      },
      page: 1,
      product_count: [],
      selected_product: [],
      show_message_box: false,
      select_id: 0,
      select_key: 0,
      msg: 'آیا از خروج این محصول از انبار مطمئن هستید؟',
      get_data: false,
      search_text: '',
      error: [],
      show_loading: false
    };
  },
  mounted: function mounted() {},
  methods: {
    getList: function getList() {
      var _this = this;
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.page = page;
      this.get_data = true;
      var url = this.$siteUrl + "/admin/stockroom/getInventory?page=" + page + '&search_text=' + this.search_text + "&stockroom_id=" + this.stockroom_id;
      this.axios.get(url).then(function (response) {
        for (var i = 0; i < response.data.data.length; i++) {
          _this.product_count[i] = response.data.data[i].product_count;
        }
        _this.ProductList = response.data;
        _this.get_data = false;
      })["catch"](function (error) {
        _this.get_data = false;
      });
    },
    getRow: function getRow(key) {
      ++key;
      var k = (this.page - 1) * 5;
      k += key;
      return this.replaceNumber(k);
    },
    checkInList: function checkInList(id) {
      var result = false;
      this.selected_product.forEach(function (row) {
        if (row.id == id) {
          result = true;
        }
      });
      return result;
    },
    add_product: function add_product(id, key) {
      this.show_message_box = true;
      this.select_id = id;
      this.select_key = key;
    },
    add_product_to_stockroom: function add_product_to_stockroom() {
      this.show_message_box = false;
      var n = this.product_count[this.select_key];
      var maxCount = this.ProductList.data[this.select_key].product_count;
      if (parseInt(n) > 0) {
        var count = n <= maxCount ? n : maxCount;
        var item = this.ProductList.data[this.select_key];
        item.product_number = count;
        this.selected_product.push(item);
      }
    },
    removeOfList: function removeOfList(key) {
      this.$delete(this.selected_product, key);
    },
    send_data: function send_data() {
      var _this2 = this;
      this.error = [];
      var send = true;
      if (this.stockroom_id == 0) {
        send = false;
        this.error.push('لطفا انبار را انتخاب کنید');
      }
      if (this.selected_product.length == 0) {
        send = false;
        this.error.push('محصولاتی را که باید به انبار ارسال شود را انتخاب نمایید');
      }
      if (send) {
        this.show_loading = true;
        var string = '';
        this.selected_product.forEach(function (row) {
          string = string + "@" + row.get_product_warranty.id + "_" + row.product_number;
        });
        var url = this.$siteUrl + "/admin/stockroom/add_product";
        var formData = new FormData();
        formData.append('list', string);
        formData.append('stockroom_id', this.stockroom_id);
        formData.append('tozihat', this.tozihat);
        formData.append('type', "output");
        this.axios.post(url, formData).then(function (response) {
          _this2.show_loading = false;
          if (response.data == 'ok') {
            window.location = _this2.$siteUrl + "admin/stockroom/output";
          } else {
            $("#server_error_box").show();
            setTimeout(function () {
              $("#server_error_box").hide();
            }, 5000);
          }
        })["catch"](function (error) {
          _this2.show_loading = false;
          $("#server_error_box").show();
          setTimeout(function () {
            $("#server_error_box").hide();
          }, 5000);
        });
      }
    }
  },
  watch: {
    stockroom_id: function stockroom_id() {
      this.getList();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomProductList.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/StockroomProductList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _myMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../myMixin */ "./resources/js/myMixin.js");
/* harmony import */ var laravel_vue_semantic_ui_pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! laravel-vue-semantic-ui-pagination */ "./node_modules/laravel-vue-semantic-ui-pagination/src/laravel-vue-semantic-ui-pagination.js");
/* harmony import */ var laravel_vue_semantic_ui_pagination__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(laravel_vue_semantic_ui_pagination__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "StockroomProductList",
  props: ['stockroom'],
  mixins: [_myMixin__WEBPACK_IMPORTED_MODULE_0__["default"]],
  data: function data() {
    return {
      stockroom_id: 0,
      tozihat: '',
      ProductList: {
        data: []
      },
      page: 1,
      product_count: [],
      selected_product: [],
      show_message_box: false,
      select_id: 0,
      select_key: 0,
      msg: 'آیا از افزودن این محصول به انبار مطمئن هستید؟',
      get_data: false,
      search_text: '',
      error: [],
      show_loading: false
    };
  },
  mounted: function mounted() {
    this.getProductWarranty();
  },
  methods: {
    getProductWarranty: function getProductWarranty() {
      var _this = this;
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.page = page;
      this.get_data = true;
      var url = this.$siteUrl + "/admin/stockroom/getProductWarranty?page=" + page + '&search_text=' + this.search_text;
      this.axios.get(url).then(function (response) {
        for (var i = 0; i < response.data.data.length; i++) {
          _this.product_count[i] = response.data.data[i].product_number;
        }
        _this.ProductList = response.data;
        _this.get_data = false;
      })["catch"](function (error) {
        _this.get_data = false;
      });
    },
    getRow: function getRow(key) {
      ++key;
      var k = (this.page - 1) * 5;
      k += key;
      return this.replaceNumber(k);
    },
    checkInList: function checkInList(id) {
      var result = false;
      this.selected_product.forEach(function (row) {
        if (row.id == id) {
          result = true;
        }
      });
      return result;
    },
    add_product: function add_product(id, key) {
      this.show_message_box = true;
      this.select_id = id;
      this.select_key = key;
    },
    add_product_to_stockroom: function add_product_to_stockroom() {
      this.show_message_box = false;
      var n = this.product_count[this.select_key];
      if (parseInt(n) > 0) {
        var item = this.ProductList.data[this.select_key];
        item.product_number = n;
        this.selected_product.push(item);
      }
    },
    removeOfList: function removeOfList(key) {
      this.$delete(this.selected_product, key);
    },
    send_data: function send_data() {
      var _this2 = this;
      this.error = [];
      var send = true;
      if (this.stockroom_id == 0) {
        send = false;
        this.error.push('لطفا انبار را انتخاب کنید');
      }
      if (this.selected_product.length == 0) {
        send = false;
        this.error.push('محصولاتی را که باید به انبار ارسال شود را انتخاب نمایید');
      }
      if (send) {
        this.show_loading = true;
        var string = '';
        this.selected_product.forEach(function (row) {
          string = string + "@" + row.id + "_" + row.product_number;
        });
        var url = this.$siteUrl + "/admin/stockroom/add_product";
        var formData = new FormData();
        formData.append('list', string);
        formData.append('stockroom_id', this.stockroom_id);
        formData.append('tozihat', this.tozihat);
        this.axios.post(url, formData).then(function (response) {
          _this2.show_loading = false;
          if (response.data == 'ok') {
            window.location = _this2.$siteUrl + "admin/stockroom/input";
          } else {
            $("#server_error_box").show();
            setTimeout(function () {
              $("#server_error_box").hide();
            }, 5000);
          }
        })["catch"](function (error) {
          _this2.show_loading = false;
          $("#server_error_box").show();
          setTimeout(function () {
            $("#server_error_box").hide();
          }, 5000);
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Counter.vue?vue&type=template&id=68e92161&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Counter.vue?vue&type=template&id=68e92161&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.show_second > 0 ? _c("div", [_c("div", {
    staticClass: "c-counter"
  }, [_c("span", [_vm._v(_vm._s(_vm.h))]), _vm._v(":"), _c("span", [_vm._v(_vm._s(_vm.m))]), _vm._v(":"), _c("span", [_vm._v(_vm._s(_vm.s))])]), _vm._v(" "), _c("p", {
    staticClass: "discount_counter_title"
  }, [_vm._v("زمان باقی مانده تا پایان سفارش")])]) : _vm._e();
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("div", {
    staticClass: "search_form"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search_text,
      expression: "search_text"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: "کلمه مورد نظر را وارد کنید"
    },
    domProps: {
      value: _vm.search_text
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.search_text = $event.target.value;
      }
    }
  }), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary btn_search",
    on: {
      click: function click($event) {
        return _vm.getWarrantyList(1);
      }
    }
  }, [_vm._v("جستجو\n            ")])]), _vm._v(" "), _c("table", {
    staticClass: "table table-bordered"
  }, [_vm._m(0), _vm._v(" "), _c("tbody", _vm._l(_vm.WarrantyList.data, function (item, key) {
    return _c("tr", [_c("th", {
      staticStyle: {
        "vertical-align": "middle"
      },
      attrs: {
        scope: "row"
      }
    }, [_vm._v(_vm._s(_vm.getRow(key)))]), _vm._v(" "), _c("td", [_c("img", {
      staticClass: "product_pic",
      attrs: {
        src: _vm.$siteUrl + "files/thumb/" + item.get_product.image_url,
        alt: ""
      }
    })]), _vm._v(" "), _c("td", [_vm._v(_vm._s(item.get_product.title))]), _vm._v(" "), _c("td"), _vm._v(" "), _c("td", [_vm._v(_vm._s(item.get_warranty.name))]), _vm._v(" "), _c("td", {
      attrs: {
        width: "10%"
      }
    }, [item.get_color.id > 0 ? _c("span", {
      staticClass: "color_td",
      style: [item.get_color.id > 0 ? {
        background: item.get_color.code
      } : {}]
    }, [item.get_color.id > 0 ? _c("span", {
      style: [item.get_color.name == "سفید" ? {
        color: "black"
      } : {
        color: "white"
      }]
    }, [_vm._v("\n                    " + _vm._s(item.get_color.name) + "\n                ")]) : _vm._e()]) : _vm._e()]), _vm._v(" "), _c("td", [_c("p", {
      staticClass: "select_item",
      on: {
        click: function click($event) {
          return _vm.show_box(item.id, key);
        }
      }
    }, [_vm._v("انتخاب")]), _vm._v(" "), item.offers == 1 ? _c("p", {
      staticClass: "remove_item",
      on: {
        click: function click($event) {
          return _vm.remove_offers(item.id, key);
        }
      }
    }, [_vm._v("حذف")]) : _vm._e()])]);
  }), 0)]), _vm._v(" "), _vm.show_message_box ? _c("div", {
    staticClass: "message_div",
    staticStyle: {
      display: "block"
    }
  }, [_c("div", {
    staticClass: "message_box"
  }, [_c("p", [_vm._v("آیا از حذف این محصول از لیست پیشنهاد شگفت انگیز مطمئن هستید؟")]), _vm._v(" "), _c("a", {
    staticClass: "alert alert-success",
    on: {
      click: function click($event) {
        return _vm.remove_offers_list();
      }
    }
  }, [_vm._v("بلی")]), _vm._v(" "), _c("a", {
    staticClass: "alert alert-danger",
    on: {
      click: function click($event) {
        _vm.show_message_box = !_vm.show_message_box;
      }
    }
  }, [_vm._v("خیر")])])]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "modal fade",
    attrs: {
      id: "priceBox",
      role: "dialog"
    }
  }, [_c("div", {
    staticClass: "modal-dialog modal-lg"
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_vm._m(1), _vm._v(" "), _c("div", {
    staticClass: "modal-body IncredibleOffers"
  }, [_vm.server_errors ? _c("div", {
    staticClass: "alert alert-warning"
  }, [_c("ul", {
    staticClass: "list-inline"
  }, _vm._l(_vm.server_errors, function (error) {
    return _c("li", [_vm._v("\n                                    " + _vm._s(error[0]) + "\n                                ")]);
  }), 0)]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": ""
    }
  }, [_vm._v("هزینه محصول :")]), _vm._v(" "), _c("cleave", {
    staticClass: "form-control left",
    attrs: {
      options: _vm.options
    },
    model: {
      value: _vm.formInput.price1,
      callback: function callback($$v) {
        _vm.$set(_vm.formInput, "price1", $$v);
      },
      expression: "formInput.price1"
    }
  }), _vm._v(" "), _vm.errors.price1_error ? _c("span", {
    staticClass: "has_error"
  }, [_vm._v(_vm._s(_vm.errors.price1_error))]) : _vm._e()], 1), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": ""
    }
  }, [_vm._v("هزینه محصول (برای فروش) :")]), _vm._v(" "), _c("cleave", {
    staticClass: "form-control left",
    attrs: {
      options: _vm.options
    },
    model: {
      value: _vm.formInput.price2,
      callback: function callback($$v) {
        _vm.$set(_vm.formInput, "price2", $$v);
      },
      expression: "formInput.price2"
    }
  }), _vm._v(" "), _vm.errors.price2_error ? _c("span", {
    staticClass: "has_error"
  }, [_vm._v(_vm._s(_vm.errors.price2_error))]) : _vm._e()], 1), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": ""
    }
  }, [_vm._v("تعداد موجودی (برای فروش) :")]), _vm._v(" "), _c("cleave", {
    staticClass: "form-control left",
    attrs: {
      options: _vm.options
    },
    model: {
      value: _vm.formInput.product_number,
      callback: function callback($$v) {
        _vm.$set(_vm.formInput, "product_number", $$v);
      },
      expression: "formInput.product_number"
    }
  }), _vm._v(" "), _vm.errors.product_number_error ? _c("span", {
    staticClass: "has_error"
  }, [_vm._v(_vm._s(_vm.errors.product_number_error))]) : _vm._e()], 1), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": ""
    }
  }, [_vm._v("تعداد قابل سفارش در سبد خرید :")]), _vm._v(" "), _c("cleave", {
    staticClass: "form-control left",
    attrs: {
      options: _vm.options
    },
    model: {
      value: _vm.formInput.product_number_cart,
      callback: function callback($$v) {
        _vm.$set(_vm.formInput, "product_number_cart", $$v);
      },
      expression: "formInput.product_number_cart"
    }
  }), _vm._v(" "), _vm.errors.product_number_cart_error ? _c("span", {
    staticClass: "has_error"
  }, [_vm._v(_vm._s(_vm.errors.product_number_cart_error))]) : _vm._e()], 1), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": ""
    }
  }, [_vm._v("تاریخ شروع :")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.date1,
      expression: "date1"
    }],
    staticClass: "form-control pdate",
    attrs: {
      type: "text",
      id: "pcal1"
    },
    domProps: {
      value: _vm.date1
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.date1 = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": ""
    }
  }, [_vm._v("تاریخ پایان :")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.date2,
      expression: "date2"
    }],
    staticClass: "form-control pdate",
    attrs: {
      type: "text",
      id: "pcal2"
    },
    domProps: {
      value: _vm.date2
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.date2 = $event.target.value;
      }
    }
  })])]), _vm._v(" "), _c("div", {
    staticClass: "modal-footer"
  }, [_c("div", {
    staticClass: "d-grid gap-2 col-6 mx-auto",
    staticStyle: {
      "text-align": "center!important"
    }
  }, [_c("button", {
    staticClass: "btn btn-warning",
    attrs: {
      type: "submit"
    },
    on: {
      click: function click($event) {
        return _vm.add();
      }
    }
  }, [_vm._v("     ثبت اطلاعات     "), _c("i", {
    staticClass: "fa fa-check"
  })])])])])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", {
    staticClass: "table-dark"
  }, [_c("tr", [_c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v("#")]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v("تصویر")]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v("عنوان محصول")]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v("فروشنده")]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v("گارانتی")]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v("رنگ")]), _vm._v(" "), _c("th", {
    attrs: {
      scope: "col"
    }
  }, [_vm._v("عملیات")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "modal-header"
  }, [_c("h5", [_vm._v("افزودن به لیست پیشنهاد شگفت انگیز")]), _vm._v(" "), _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "modal"
    }
  }, [_c("i", {
    staticClass: "fa fa-times",
    attrs: {
      "aria-hidden": "true"
    }
  })])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/OrderStep.vue?vue&type=template&id=2121af42&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/OrderStep.vue?vue&type=template&id=2121af42&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("div", {
    staticClass: "swiper-container order_steps"
  }, [_c("div", {
    staticClass: "swiper-wrapper"
  }, _vm._l(_vm.steps, function (step, key) {
    return key > -1 ? _c("div", {
      staticClass: "swiper-slide"
    }, [_c("div", {
      "class": [_vm.order_status < key ? "step_div step_inactive" : "step_div"],
      on: {
        click: function click($event) {
          return _vm.change_status(key);
        }
      }
    }, [_c("img", {
      attrs: {
        src: _vm.$siteUrl + "files/images/steps/step" + key + ".png",
        alt: ""
      }
    }), _vm._v(" "), _c("span", {
      "class": _vm.order_status >= key ? "text-success" : ""
    }, [_vm._v(_vm._s(step))])]), _vm._v(" "), _c("hr", {
      "class": _vm.order_status >= key ? "hr_active" : ""
    })]) : _vm._e();
  }), 0), _vm._v(" "), _c("div", {
    staticClass: "swiper-button-prev"
  }), _vm._v(" "), _c("div", {
    staticClass: "swiper-button-next"
  })]), _vm._v(" "), _vm.show_box ? _c("div", {
    staticClass: "message_div",
    staticStyle: {
      display: "block"
    }
  }, [_c("div", {
    staticClass: "message_box"
  }, [_c("p", {
    attrs: {
      id: "msg"
    }
  }, [_vm._v("آیا از تغییر وضعیت این مرسوله مطمئن هستید؟")]), _vm._v(" "), _c("a", {
    staticClass: "alert alert-success",
    on: {
      click: function click($event) {
        return _vm.send_data();
      }
    }
  }, [_vm._v("بلی")]), _vm._v(" "), _c("a", {
    staticClass: "alert alert-danger",
    on: {
      click: function click($event) {
        _vm.show_box = false;
      }
    }
  }, [_vm._v("خیر")])])]) : _vm._e(), _vm._v(" "), _vm._m(0)]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "error_dialog"
  }, [_c("span", [_vm._v("خطا در ارسال اطلاعات، دوباره سعی کنید")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SaleReport.vue?vue&type=template&id=49057786&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SaleReport.vue?vue&type=template&id=49057786&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("p", [_c("span", [_vm._v("میزان فروش در سال")]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.default_year,
      expression: "default_year"
    }],
    ref: "default_year",
    staticClass: "selectpicker auto-width-select years_tag",
    on: {
      change: [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.default_year = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }, function ($event) {
        return _vm.getData();
      }]
    }
  }, _vm._l(_vm.years, function (year, key) {
    return _c("option", {
      key: key,
      domProps: {
        value: year
      }
    }, [_vm._v(_vm._s(year))]);
  }), 0)]), _vm._v(" "), _c("highcharts", {
    attrs: {
      options: _vm.chartOptions
    }
  }), _vm._v(" "), _c("div", {
    staticStyle: {
      "padding-top": "60px"
    }
  }, [_c("highcharts", {
    attrs: {
      options: _vm.chartOptions2
    }
  })], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomOutputList.vue?vue&type=template&id=9d976a16&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/StockroomOutputList.vue?vue&type=template&id=9d976a16&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_vm.show_loading ? _c("div", {
    staticClass: "loading_box2",
    staticStyle: {
      right: "0!important"
    }
  }, [_vm._m(0)]) : _vm._e(), _vm._v(" "), _vm.error.length > 0 ? _c("div", {
    staticClass: "alert alert-warning"
  }, [_c("ul", {
    staticClass: "error_ul"
  }, _vm._l(_vm.error, function (msg, key) {
    return _c("li", {
      key: key
    }, [_vm._v("\n                " + _vm._s(msg) + "\n            ")]);
  }), 0)]) : _vm._e(), _vm._v(" "), _c("div", {
    staticStyle: {
      "padding-bottom": "20px"
    }
  }, [_c("div", {
    staticClass: "form-group",
    attrs: {
      id: "add_input_select"
    }
  }, [_c("label", {
    attrs: {
      "for": "stockroom"
    }
  }, [_vm._v("انتخاب انبار :")]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.stockroom_id,
      expression: "stockroom_id"
    }],
    staticClass: "selectpicker",
    attrs: {
      id: "stockroom"
    },
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.stockroom_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c("option", {
    attrs: {
      value: "0"
    }
  }, [_vm._v("انتخاب انبار")]), _vm._v(" "), _vm._l(_vm.stockroom, function (row) {
    return _c("option", {
      key: row.id,
      domProps: {
        value: row.id
      }
    }, [_vm._v(_vm._s(row.name))]);
  })], 2)]), _vm._v(" "), _c("div", {
    staticClass: "form-group textarea_field"
  }, [_c("label", {
    attrs: {
      "for": "stockroom"
    }
  }, [_vm._v(" توضیحات :")]), _vm._v(" "), _c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.tozihat,
      expression: "tozihat"
    }],
    staticClass: "form-control",
    attrs: {
      placeholder: " توضیحات "
    },
    domProps: {
      value: _vm.tozihat
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.tozihat = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary",
    attrs: {
      type: "button",
      "data-toggle": "modal",
      "data-target": ".bd-example-modal-lg"
    }
  }, [_vm._v("افزودن\n            محصول\n        ")])]), _vm._v(" "), _c("p", {
    staticStyle: {
      "margin-top": "30px",
      "margin-bottom": "20px"
    }
  }, [_vm._v("محصولات انتخاب شده")]), _vm._v(" "), _c("table", {
    staticClass: "table table-striped"
  }, [_vm._m(1), _vm._v(" "), _c("tbody", [_vm._l(_vm.selected_product, function (item, key) {
    return _c("tr", {
      key: key
    }, [_c("td", {
      staticStyle: {
        width: "20px"
      }
    }, [_vm._v(_vm._s(_vm.getRow(key)))]), _vm._v(" "), _c("td", [_c("img", {
      staticClass: "product_pic stockroom_product",
      attrs: {
        src: _vm.$siteUrl + "files/thumb/" + item.get_product_warranty.get_product.image_url,
        alt: ""
      }
    })]), _vm._v(" "), _c("td", [_c("span", [_vm._v(_vm._s(item.get_product_warranty.get_product.title))])]), _vm._v(" "), _c("td", [_c("span", [_vm._v(_vm._s(item.get_product_warranty.get_seller.brand_name))])]), _vm._v(" "), _c("td", {
      staticStyle: {
        "font-size": "14px"
      }
    }, [_c("span", [_vm._v(_vm._s(item.get_product_warranty.get_warranty.name))])]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "150px"
      }
    }, [item.get_product_warranty.get_color.id > 0 ? _c("span", {
      staticClass: "color_td",
      staticStyle: {
        color: "white"
      },
      style: {
        background: item.get_product_warranty.get_color.code
      }
    }, [_c("span", {
      staticStyle: {
        color: "white"
      }
    }, [_vm._v(_vm._s(item.get_product_warranty.get_color.name))])]) : _vm._e()]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "70px"
      }
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.selected_product[key].product_number,
        expression: "selected_product[key].product_number"
      }],
      staticClass: "form-control",
      staticStyle: {
        width: "70px",
        "text-align": "center"
      },
      attrs: {
        type: "text",
        placeholder: "تعداد"
      },
      domProps: {
        value: _vm.selected_product[key].product_number
      },
      on: {
        input: function input($event) {
          if ($event.target.composing) return;
          _vm.$set(_vm.selected_product[key], "product_number", $event.target.value);
        }
      }
    })]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "100px"
      }
    }, [_c("span", {
      staticClass: "remove_item",
      on: {
        click: function click($event) {
          return _vm.removeOfList(key);
        }
      }
    }, [_vm._v("حذف")])])]);
  }), _vm._v(" "), _vm.selected_product.length == 0 ? _c("tr", [_c("td", {
    attrs: {
      colspan: "8"
    }
  }, [_vm._v("  محصولی انتخاب نشده ")])]) : _vm._e()], 2)]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-success",
    on: {
      click: function click($event) {
        return _vm.send_data();
      }
    }
  }, [_vm._v("\n        ثبت نهایی\n    ")]), _vm._v(" "), _c("div", {
    staticClass: "modal fade bd-example-modal-lg product_list",
    attrs: {
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": "myLargeModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog modal-lg"
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_vm._m(2), _vm._v(" "), _vm.get_data ? _c("div", {
    staticClass: "loading_box2"
  }, [_vm._m(3)]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("div", {
    staticClass: "box_header"
  }, [_c("div", {
    staticClass: "input_div"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search_text,
      expression: "search_text"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: "نام محصول ..."
    },
    domProps: {
      value: _vm.search_text
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.search_text = $event.target.value;
      }
    }
  }), _c("a", {
    staticClass: "btn btn-primary",
    staticStyle: {
      color: "white"
    },
    on: {
      click: function click($event) {
        return _vm.getList(1);
      }
    }
  }, [_vm._v("جستجو")])])]), _vm._v(" "), _c("table", {
    staticClass: "table table-striped"
  }, [_c("tbody", _vm._l(_vm.ProductList.data, function (item, key) {
    return _c("tr", {
      key: key
    }, [_c("td", [_vm._v(_vm._s(_vm.getRow(key)))]), _vm._v(" "), _c("td", [_c("img", {
      staticClass: "product_pic stockroom_product_pic",
      attrs: {
        src: _vm.$siteUrl + "files/thumb/" + item.get_product_warranty.get_product.image_url,
        alt: ""
      }
    })]), _vm._v(" "), _c("td", [_c("span", [_vm._v(_vm._s(item.get_product_warranty.get_product.title))])]), _vm._v(" "), _c("td", [_c("span", [_vm._v(_vm._s(item.get_product_warranty.get_seller.brand_name))])]), _vm._v(" "), _c("td", {
      staticStyle: {
        "font-size": "14px"
      }
    }, [_c("span", [_vm._v(_vm._s(item.get_product_warranty.get_warranty.name))])]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "150px"
      }
    }, [item.get_product_warranty.get_color.id > 0 ? _c("span", {
      staticClass: "color_td",
      staticStyle: {
        color: "white"
      },
      style: {
        background: item.get_product_warranty.get_color.code
      }
    }, [_c("span", {
      staticStyle: {
        color: "white"
      }
    }, [_vm._v(_vm._s(item.get_product_warranty.get_color.name))])]) : _vm._e()]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "70px"
      }
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.product_count[key],
        expression: "product_count[key]"
      }],
      staticClass: "form-control",
      staticStyle: {
        width: "70px",
        "text-align": "center"
      },
      attrs: {
        type: "text",
        placeholder: "تعداد"
      },
      domProps: {
        value: _vm.product_count[key]
      },
      on: {
        input: function input($event) {
          if ($event.target.composing) return;
          _vm.$set(_vm.product_count, key, $event.target.value);
        }
      }
    })]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "70px"
      }
    }, [_vm.checkInList(item.id) ? _c("span", {
      staticStyle: {
        color: "#ef5661"
      }
    }, [_vm._v("اضافه شد")]) : _c("span", {
      staticClass: "select_item",
      on: {
        click: function click($event) {
          return _vm.add_product(item.get_product_warranty.id, key);
        }
      }
    }, [_vm._v("افزودن")])])]);
  }), 0)]), _vm._v(" "), _c("pagination", {
    attrs: {
      data: _vm.ProductList,
      showDisabled: true,
      icon: "chevron"
    },
    on: {
      "change-page": _vm.getList
    }
  })], 1)])])]), _vm._v(" "), _vm.show_message_box ? _c("div", {
    staticClass: "message_div",
    staticStyle: {
      display: "block"
    }
  }, [_c("div", {
    staticClass: "message_box"
  }, [_c("p", {
    attrs: {
      id: "msg"
    }
  }, [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c("a", {
    staticClass: "alert alert-success",
    on: {
      click: function click($event) {
        return _vm.add_product_to_stockroom();
      }
    }
  }, [_vm._v("بلی")]), _vm._v(" "), _c("a", {
    staticClass: "alert alert-danger",
    on: {
      click: function click($event) {
        _vm.show_message_box = false;
      }
    }
  }, [_vm._v("خیر")])])]) : _vm._e()]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "load-10"
  }, [_c("p", [_vm._v("در حال بارگذاری...")]), _vm._v(" "), _c("div", {
    staticClass: "bar"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_vm._v("ردیف")]), _vm._v(" "), _c("th", [_vm._v("تصویر محصول")]), _vm._v(" "), _c("th", [_vm._v("عنوان محصول")]), _vm._v(" "), _c("th", [_vm._v("فروشنده")]), _vm._v(" "), _c("th", [_vm._v("گارانتی")]), _vm._v(" "), _c("th", [_vm._v("رنگ")]), _vm._v(" "), _c("th", [_vm._v("تعداد")]), _vm._v(" "), _c("th", [_vm._v("عملیات")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "modal-header"
  }, [_c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLongTitle"
    }
  }, [_vm._v("لیست محصولات")]), _vm._v(" "), _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }
  }, [_c("span", {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "load-4"
  }, [_c("p", [_vm._v("در حال بارگذاری...")]), _vm._v(" "), _c("div", {
    staticClass: "ring-1"
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomProductList.vue?vue&type=template&id=43098f67&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/StockroomProductList.vue?vue&type=template&id=43098f67&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_vm.show_loading ? _c("div", {
    staticClass: "loading_box2",
    staticStyle: {
      right: "0!important"
    }
  }, [_vm._m(0)]) : _vm._e(), _vm._v(" "), _vm.error.length > 0 ? _c("div", {
    staticClass: "alert alert-warning"
  }, [_c("ul", {
    staticClass: "error_ul"
  }, _vm._l(_vm.error, function (msg, key) {
    return _c("li", {
      key: key
    }, [_vm._v("\n                    " + _vm._s(msg) + "\n                ")]);
  }), 0)]) : _vm._e(), _vm._v(" "), _c("div", {
    staticStyle: {
      "padding-bottom": "20px"
    }
  }, [_c("div", {
    staticClass: "form-group",
    attrs: {
      id: "add_input_select"
    }
  }, [_c("label", {
    attrs: {
      "for": "stockroom"
    }
  }, [_vm._v("انتخاب انبار :")]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.stockroom_id,
      expression: "stockroom_id"
    }],
    staticClass: "selectpicker",
    attrs: {
      id: "stockroom"
    },
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.stockroom_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c("option", {
    attrs: {
      value: "0"
    }
  }, [_vm._v("انتخاب انبار")]), _vm._v(" "), _vm._l(_vm.stockroom, function (row) {
    return _c("option", {
      key: row.id,
      domProps: {
        value: row.id
      }
    }, [_vm._v(_vm._s(row.name))]);
  })], 2)]), _vm._v(" "), _c("div", {
    staticClass: "form-group textarea_field"
  }, [_c("label", {
    attrs: {
      "for": "stockroom"
    }
  }, [_vm._v(" توضیحات :")]), _vm._v(" "), _c("textarea", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.tozihat,
      expression: "tozihat"
    }],
    staticClass: "form-control",
    attrs: {
      placeholder: " توضیحات "
    },
    domProps: {
      value: _vm.tozihat
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.tozihat = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary",
    attrs: {
      type: "button",
      "data-toggle": "modal",
      "data-target": ".bd-example-modal-lg"
    }
  }, [_vm._v("افزودن\n                محصول\n            ")])]), _vm._v(" "), _c("p", {
    staticStyle: {
      "margin-top": "30px",
      "margin-bottom": "20px"
    }
  }, [_vm._v("محصولات انتخاب شده")]), _vm._v(" "), _c("table", {
    staticClass: "table table-striped"
  }, [_vm._m(1), _vm._v(" "), _c("tbody", [_vm._l(_vm.selected_product, function (item, key) {
    return _c("tr", {
      key: key
    }, [_c("td", {
      staticStyle: {
        width: "20px"
      }
    }, [_vm._v(_vm._s(_vm.getRow(key)))]), _vm._v(" "), _c("td", [_c("img", {
      staticClass: "product_pic stockroom_product",
      attrs: {
        src: _vm.$siteUrl + "files/thumb/" + item.get_product.image_url,
        alt: ""
      }
    })]), _vm._v(" "), _c("td", [_c("span", [_vm._v(_vm._s(item.get_product.title))])]), _vm._v(" "), _c("td", [_c("span", [_vm._v(_vm._s(item.get_seller.brand_name))])]), _vm._v(" "), _c("td", {
      staticStyle: {
        "font-size": "14px"
      }
    }, [_c("span", [_vm._v(_vm._s(item.get_warranty.name))])]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "150px"
      }
    }, [item.get_color.id > 0 ? _c("span", {
      staticClass: "color_td",
      staticStyle: {
        color: "white"
      },
      style: {
        background: item.get_color.code
      }
    }, [_c("span", {
      staticStyle: {
        color: "white"
      }
    }, [_vm._v(_vm._s(item.get_color.name))])]) : _vm._e()]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "70px"
      }
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.selected_product[key].product_number,
        expression: "selected_product[key].product_number"
      }],
      staticClass: "form-control",
      staticStyle: {
        width: "70px",
        "text-align": "center"
      },
      attrs: {
        type: "text",
        placeholder: "تعداد"
      },
      domProps: {
        value: _vm.selected_product[key].product_number
      },
      on: {
        input: function input($event) {
          if ($event.target.composing) return;
          _vm.$set(_vm.selected_product[key], "product_number", $event.target.value);
        }
      }
    })]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "100px"
      }
    }, [_c("span", {
      staticClass: "remove_item",
      on: {
        click: function click($event) {
          return _vm.removeOfList(key);
        }
      }
    }, [_vm._v("حذف")])])]);
  }), _vm._v(" "), _vm.selected_product.length == 0 ? _c("tr", [_c("td", {
    attrs: {
      colspan: "8"
    }
  }, [_vm._v("  محصولی انتخاب نشده ")])]) : _vm._e()], 2)]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-success",
    on: {
      click: function click($event) {
        return _vm.send_data();
      }
    }
  }, [_vm._v("\n            ثبت نهایی\n        ")]), _vm._v(" "), _c("div", {
    staticClass: "modal fade bd-example-modal-lg product_list",
    attrs: {
      tabindex: "-1",
      role: "dialog",
      "aria-labelledby": "myLargeModalLabel",
      "aria-hidden": "true"
    }
  }, [_c("div", {
    staticClass: "modal-dialog modal-lg"
  }, [_c("div", {
    staticClass: "modal-content"
  }, [_vm._m(2), _vm._v(" "), _vm.get_data ? _c("div", {
    staticClass: "loading_box2"
  }, [_vm._m(3)]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "modal-body"
  }, [_c("div", {
    staticClass: "box_header"
  }, [_c("div", {
    staticClass: "input_div"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.search_text,
      expression: "search_text"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      placeholder: "نام محصول ..."
    },
    domProps: {
      value: _vm.search_text
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.search_text = $event.target.value;
      }
    }
  }), _c("a", {
    staticClass: "btn btn-primary",
    staticStyle: {
      color: "white"
    },
    on: {
      click: function click($event) {
        return _vm.getProductWarranty(1);
      }
    }
  }, [_vm._v("جستجو")])])]), _vm._v(" "), _c("table", {
    staticClass: "table table-striped"
  }, [_c("tbody", _vm._l(_vm.ProductList.data, function (item, key) {
    return _c("tr", {
      key: key
    }, [_c("td", [_vm._v(_vm._s(_vm.getRow(key)))]), _vm._v(" "), _c("td", [_c("img", {
      staticClass: "product_pic stockroom_product_pic",
      attrs: {
        src: _vm.$siteUrl + "files/thumb/" + item.get_product.image_url,
        alt: ""
      }
    })]), _vm._v(" "), _c("td", [_c("span", [_vm._v(_vm._s(item.get_product.title))])]), _vm._v(" "), _c("td", [_c("span", [_vm._v(_vm._s(item.get_seller.brand_name))])]), _vm._v(" "), _c("td", {
      staticStyle: {
        "font-size": "14px"
      }
    }, [_c("span", [_vm._v(_vm._s(item.get_warranty.name))])]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "150px"
      }
    }, [item.get_color.id > 0 ? _c("span", {
      staticClass: "color_td",
      staticStyle: {
        color: "white"
      },
      style: {
        background: item.get_color.code
      }
    }, [_c("span", {
      staticStyle: {
        color: "white"
      }
    }, [_vm._v(_vm._s(item.get_color.name))])]) : _vm._e()]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "70px"
      }
    }, [_c("input", {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.product_count[key],
        expression: "product_count[key]"
      }],
      staticClass: "form-control",
      staticStyle: {
        width: "70px",
        "text-align": "center"
      },
      attrs: {
        type: "text",
        placeholder: "تعداد"
      },
      domProps: {
        value: _vm.product_count[key]
      },
      on: {
        input: function input($event) {
          if ($event.target.composing) return;
          _vm.$set(_vm.product_count, key, $event.target.value);
        }
      }
    })]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "70px"
      }
    }, [_vm.checkInList(item.id) ? _c("span", {
      staticStyle: {
        color: "#ef5661"
      }
    }, [_vm._v("اضافه شد")]) : _c("span", {
      staticClass: "select_item",
      on: {
        click: function click($event) {
          return _vm.add_product(item.id, key);
        }
      }
    }, [_vm._v("افزودن")])])]);
  }), 0)]), _vm._v(" "), _c("pagination", {
    attrs: {
      data: _vm.ProductList,
      showDisabled: true,
      icon: "chevron"
    },
    on: {
      "change-page": _vm.getProductWarranty
    }
  })], 1)])])]), _vm._v(" "), _vm.show_message_box ? _c("div", {
    staticClass: "message_div",
    staticStyle: {
      display: "block"
    }
  }, [_c("div", {
    staticClass: "message_box"
  }, [_c("p", {
    attrs: {
      id: "msg"
    }
  }, [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c("a", {
    staticClass: "alert alert-success",
    on: {
      click: function click($event) {
        return _vm.add_product_to_stockroom();
      }
    }
  }, [_vm._v("بلی")]), _vm._v(" "), _c("a", {
    staticClass: "alert alert-danger",
    on: {
      click: function click($event) {
        _vm.show_message_box = false;
      }
    }
  }, [_vm._v("خیر")])])]) : _vm._e()]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "load-10"
  }, [_c("p", [_vm._v("در حال بارگذاری...")]), _vm._v(" "), _c("div", {
    staticClass: "bar"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_vm._v("ردیف")]), _vm._v(" "), _c("th", [_vm._v("تصویر محصول")]), _vm._v(" "), _c("th", [_vm._v("عنوان محصول")]), _vm._v(" "), _c("th", [_vm._v("فروشنده")]), _vm._v(" "), _c("th", [_vm._v("گارانتی")]), _vm._v(" "), _c("th", [_vm._v("رنگ")]), _vm._v(" "), _c("th", [_vm._v("تعداد")]), _vm._v(" "), _c("th", [_vm._v("عملیات")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "modal-header"
  }, [_c("h5", {
    staticClass: "modal-title",
    attrs: {
      id: "exampleModalLongTitle"
    }
  }, [_vm._v("لیست محصولات")]), _vm._v(" "), _c("button", {
    staticClass: "close",
    attrs: {
      type: "button",
      "data-dismiss": "modal",
      "aria-label": "Close"
    }
  }, [_c("span", {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "load-4"
  }, [_c("p", [_vm._v("در حال بارگذاری...")]), _vm._v(" "), _c("div", {
    staticClass: "ring-1"
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/cleave.js/dist/cleave-esm.js":
/*!***************************************************!*\
  !*** ./node_modules/cleave.js/dist/cleave-esm.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var NumeralFormatter = function (numeralDecimalMark,
                                 numeralIntegerScale,
                                 numeralDecimalScale,
                                 numeralThousandsGroupStyle,
                                 numeralPositiveOnly,
                                 stripLeadingZeroes,
                                 prefix,
                                 signBeforePrefix,
                                 tailPrefix,
                                 delimiter) {
    var owner = this;

    owner.numeralDecimalMark = numeralDecimalMark || '.';
    owner.numeralIntegerScale = numeralIntegerScale > 0 ? numeralIntegerScale : 0;
    owner.numeralDecimalScale = numeralDecimalScale >= 0 ? numeralDecimalScale : 2;
    owner.numeralThousandsGroupStyle = numeralThousandsGroupStyle || NumeralFormatter.groupStyle.thousand;
    owner.numeralPositiveOnly = !!numeralPositiveOnly;
    owner.stripLeadingZeroes = stripLeadingZeroes !== false;
    owner.prefix = (prefix || prefix === '') ? prefix : '';
    owner.signBeforePrefix = !!signBeforePrefix;
    owner.tailPrefix = !!tailPrefix;
    owner.delimiter = (delimiter || delimiter === '') ? delimiter : ',';
    owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';
};

NumeralFormatter.groupStyle = {
    thousand: 'thousand',
    lakh:     'lakh',
    wan:      'wan',
    none:     'none'    
};

NumeralFormatter.prototype = {
    getRawValue: function (value) {
        return value.replace(this.delimiterRE, '').replace(this.numeralDecimalMark, '.');
    },

    format: function (value) {
        var owner = this, parts, partSign, partSignAndPrefix, partInteger, partDecimal = '';

        // strip alphabet letters
        value = value.replace(/[A-Za-z]/g, '')
            // replace the first decimal mark with reserved placeholder
            .replace(owner.numeralDecimalMark, 'M')

            // strip non numeric letters except minus and "M"
            // this is to ensure prefix has been stripped
            .replace(/[^\dM-]/g, '')

            // replace the leading minus with reserved placeholder
            .replace(/^\-/, 'N')

            // strip the other minus sign (if present)
            .replace(/\-/g, '')

            // replace the minus sign (if present)
            .replace('N', owner.numeralPositiveOnly ? '' : '-')

            // replace decimal mark
            .replace('M', owner.numeralDecimalMark);

        // strip any leading zeros
        if (owner.stripLeadingZeroes) {
            value = value.replace(/^(-)?0+(?=\d)/, '$1');
        }

        partSign = value.slice(0, 1) === '-' ? '-' : '';
        if (typeof owner.prefix != 'undefined') {
            if (owner.signBeforePrefix) {
                partSignAndPrefix = partSign + owner.prefix;
            } else {
                partSignAndPrefix = owner.prefix + partSign;
            }
        } else {
            partSignAndPrefix = partSign;
        }
        
        partInteger = value;

        if (value.indexOf(owner.numeralDecimalMark) >= 0) {
            parts = value.split(owner.numeralDecimalMark);
            partInteger = parts[0];
            partDecimal = owner.numeralDecimalMark + parts[1].slice(0, owner.numeralDecimalScale);
        }

        if(partSign === '-') {
            partInteger = partInteger.slice(1);
        }

        if (owner.numeralIntegerScale > 0) {
          partInteger = partInteger.slice(0, owner.numeralIntegerScale);
        }

        switch (owner.numeralThousandsGroupStyle) {
        case NumeralFormatter.groupStyle.lakh:
            partInteger = partInteger.replace(/(\d)(?=(\d\d)+\d$)/g, '$1' + owner.delimiter);

            break;

        case NumeralFormatter.groupStyle.wan:
            partInteger = partInteger.replace(/(\d)(?=(\d{4})+$)/g, '$1' + owner.delimiter);

            break;

        case NumeralFormatter.groupStyle.thousand:
            partInteger = partInteger.replace(/(\d)(?=(\d{3})+$)/g, '$1' + owner.delimiter);

            break;
        }

        if (owner.tailPrefix) {
            return partSign + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '') + owner.prefix;
        }

        return partSignAndPrefix + partInteger.toString() + (owner.numeralDecimalScale > 0 ? partDecimal.toString() : '');
    }
};

var NumeralFormatter_1 = NumeralFormatter;

var DateFormatter = function (datePattern, dateMin, dateMax) {
    var owner = this;

    owner.date = [];
    owner.blocks = [];
    owner.datePattern = datePattern;
    owner.dateMin = dateMin
      .split('-')
      .reverse()
      .map(function(x) {
        return parseInt(x, 10);
      });
    if (owner.dateMin.length === 2) owner.dateMin.unshift(0);

    owner.dateMax = dateMax
      .split('-')
      .reverse()
      .map(function(x) {
        return parseInt(x, 10);
      });
    if (owner.dateMax.length === 2) owner.dateMax.unshift(0);
    
    owner.initBlocks();
};

DateFormatter.prototype = {
    initBlocks: function () {
        var owner = this;
        owner.datePattern.forEach(function (value) {
            if (value === 'Y') {
                owner.blocks.push(4);
            } else {
                owner.blocks.push(2);
            }
        });
    },

    getISOFormatDate: function () {
        var owner = this,
            date = owner.date;

        return date[2] ? (
            date[2] + '-' + owner.addLeadingZero(date[1]) + '-' + owner.addLeadingZero(date[0])
        ) : '';
    },

    getBlocks: function () {
        return this.blocks;
    },

    getValidatedDate: function (value) {
        var owner = this, result = '';

        value = value.replace(/[^\d]/g, '');

        owner.blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length),
                    sub0 = sub.slice(0, 1),
                    rest = value.slice(length);

                switch (owner.datePattern[index]) {
                case 'd':
                    if (sub === '00') {
                        sub = '01';
                    } else if (parseInt(sub0, 10) > 3) {
                        sub = '0' + sub0;
                    } else if (parseInt(sub, 10) > 31) {
                        sub = '31';
                    }

                    break;

                case 'm':
                    if (sub === '00') {
                        sub = '01';
                    } else if (parseInt(sub0, 10) > 1) {
                        sub = '0' + sub0;
                    } else if (parseInt(sub, 10) > 12) {
                        sub = '12';
                    }

                    break;
                }

                result += sub;

                // update remaining string
                value = rest;
            }
        });

        return this.getFixedDateString(result);
    },

    getFixedDateString: function (value) {
        var owner = this, datePattern = owner.datePattern, date = [],
            dayIndex = 0, monthIndex = 0, yearIndex = 0,
            dayStartIndex = 0, monthStartIndex = 0, yearStartIndex = 0,
            day, month, year, fullYearDone = false;

        // mm-dd || dd-mm
        if (value.length === 4 && datePattern[0].toLowerCase() !== 'y' && datePattern[1].toLowerCase() !== 'y') {
            dayStartIndex = datePattern[0] === 'd' ? 0 : 2;
            monthStartIndex = 2 - dayStartIndex;
            day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);

            date = this.getFixedDate(day, month, 0);
        }

        // yyyy-mm-dd || yyyy-dd-mm || mm-dd-yyyy || dd-mm-yyyy || dd-yyyy-mm || mm-yyyy-dd
        if (value.length === 8) {
            datePattern.forEach(function (type, index) {
                switch (type) {
                case 'd':
                    dayIndex = index;
                    break;
                case 'm':
                    monthIndex = index;
                    break;
                default:
                    yearIndex = index;
                    break;
                }
            });

            yearStartIndex = yearIndex * 2;
            dayStartIndex = (dayIndex <= yearIndex) ? dayIndex * 2 : (dayIndex * 2 + 2);
            monthStartIndex = (monthIndex <= yearIndex) ? monthIndex * 2 : (monthIndex * 2 + 2);

            day = parseInt(value.slice(dayStartIndex, dayStartIndex + 2), 10);
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);

            fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;

            date = this.getFixedDate(day, month, year);
        }

        // mm-yy || yy-mm
        if (value.length === 4 && (datePattern[0] === 'y' || datePattern[1] === 'y')) {
            monthStartIndex = datePattern[0] === 'm' ? 0 : 2;
            yearStartIndex = 2 - monthStartIndex;
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 2), 10);

            fullYearDone = value.slice(yearStartIndex, yearStartIndex + 2).length === 2;

            date = [0, month, year];
        }

        // mm-yyyy || yyyy-mm
        if (value.length === 6 && (datePattern[0] === 'Y' || datePattern[1] === 'Y')) {
            monthStartIndex = datePattern[0] === 'm' ? 0 : 4;
            yearStartIndex = 2 - 0.5 * monthStartIndex;
            month = parseInt(value.slice(monthStartIndex, monthStartIndex + 2), 10);
            year = parseInt(value.slice(yearStartIndex, yearStartIndex + 4), 10);

            fullYearDone = value.slice(yearStartIndex, yearStartIndex + 4).length === 4;

            date = [0, month, year];
        }

        date = owner.getRangeFixedDate(date);
        owner.date = date;

        var result = date.length === 0 ? value : datePattern.reduce(function (previous, current) {
            switch (current) {
            case 'd':
                return previous + (date[0] === 0 ? '' : owner.addLeadingZero(date[0]));
            case 'm':
                return previous + (date[1] === 0 ? '' : owner.addLeadingZero(date[1]));
            case 'y':
                return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], false) : '');
            case 'Y':
                return previous + (fullYearDone ? owner.addLeadingZeroForYear(date[2], true) : '');
            }
        }, '');

        return result;
    },

    getRangeFixedDate: function (date) {
        var owner = this,
            datePattern = owner.datePattern,
            dateMin = owner.dateMin || [],
            dateMax = owner.dateMax || [];

        if (!date.length || (dateMin.length < 3 && dateMax.length < 3)) return date;

        if (
          datePattern.find(function(x) {
            return x.toLowerCase() === 'y';
          }) &&
          date[2] === 0
        ) return date;

        if (dateMax.length && (dateMax[2] < date[2] || (
          dateMax[2] === date[2] && (dateMax[1] < date[1] || (
            dateMax[1] === date[1] && dateMax[0] < date[0]
          ))
        ))) return dateMax;

        if (dateMin.length && (dateMin[2] > date[2] || (
          dateMin[2] === date[2] && (dateMin[1] > date[1] || (
            dateMin[1] === date[1] && dateMin[0] > date[0]
          ))
        ))) return dateMin;

        return date;
    },

    getFixedDate: function (day, month, year) {
        day = Math.min(day, 31);
        month = Math.min(month, 12);
        year = parseInt((year || 0), 10);

        if ((month < 7 && month % 2 === 0) || (month > 8 && month % 2 === 1)) {
            day = Math.min(day, month === 2 ? (this.isLeapYear(year) ? 29 : 28) : 30);
        }

        return [day, month, year];
    },

    isLeapYear: function (year) {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    },

    addLeadingZero: function (number) {
        return (number < 10 ? '0' : '') + number;
    },

    addLeadingZeroForYear: function (number, fullYearMode) {
        if (fullYearMode) {
            return (number < 10 ? '000' : (number < 100 ? '00' : (number < 1000 ? '0' : ''))) + number;
        }

        return (number < 10 ? '0' : '') + number;
    }
};

var DateFormatter_1 = DateFormatter;

var TimeFormatter = function (timePattern, timeFormat) {
    var owner = this;

    owner.time = [];
    owner.blocks = [];
    owner.timePattern = timePattern;
    owner.timeFormat = timeFormat;
    owner.initBlocks();
};

TimeFormatter.prototype = {
    initBlocks: function () {
        var owner = this;
        owner.timePattern.forEach(function () {
            owner.blocks.push(2);
        });
    },

    getISOFormatTime: function () {
        var owner = this,
            time = owner.time;

        return time[2] ? (
            owner.addLeadingZero(time[0]) + ':' + owner.addLeadingZero(time[1]) + ':' + owner.addLeadingZero(time[2])
        ) : '';
    },

    getBlocks: function () {
        return this.blocks;
    },

    getTimeFormatOptions: function () {
        var owner = this;
        if (String(owner.timeFormat) === '12') {
            return {
                maxHourFirstDigit: 1,
                maxHours: 12,
                maxMinutesFirstDigit: 5,
                maxMinutes: 60
            };
        }

        return {
            maxHourFirstDigit: 2,
            maxHours: 23,
            maxMinutesFirstDigit: 5,
            maxMinutes: 60
        };
    },

    getValidatedTime: function (value) {
        var owner = this, result = '';

        value = value.replace(/[^\d]/g, '');

        var timeFormatOptions = owner.getTimeFormatOptions();

        owner.blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length),
                    sub0 = sub.slice(0, 1),
                    rest = value.slice(length);

                switch (owner.timePattern[index]) {

                case 'h':
                    if (parseInt(sub0, 10) > timeFormatOptions.maxHourFirstDigit) {
                        sub = '0' + sub0;
                    } else if (parseInt(sub, 10) > timeFormatOptions.maxHours) {
                        sub = timeFormatOptions.maxHours + '';
                    }

                    break;

                case 'm':
                case 's':
                    if (parseInt(sub0, 10) > timeFormatOptions.maxMinutesFirstDigit) {
                        sub = '0' + sub0;
                    } else if (parseInt(sub, 10) > timeFormatOptions.maxMinutes) {
                        sub = timeFormatOptions.maxMinutes + '';
                    }
                    break;
                }

                result += sub;

                // update remaining string
                value = rest;
            }
        });

        return this.getFixedTimeString(result);
    },

    getFixedTimeString: function (value) {
        var owner = this, timePattern = owner.timePattern, time = [],
            secondIndex = 0, minuteIndex = 0, hourIndex = 0,
            secondStartIndex = 0, minuteStartIndex = 0, hourStartIndex = 0,
            second, minute, hour;

        if (value.length === 6) {
            timePattern.forEach(function (type, index) {
                switch (type) {
                case 's':
                    secondIndex = index * 2;
                    break;
                case 'm':
                    minuteIndex = index * 2;
                    break;
                case 'h':
                    hourIndex = index * 2;
                    break;
                }
            });

            hourStartIndex = hourIndex;
            minuteStartIndex = minuteIndex;
            secondStartIndex = secondIndex;

            second = parseInt(value.slice(secondStartIndex, secondStartIndex + 2), 10);
            minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
            hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);

            time = this.getFixedTime(hour, minute, second);
        }

        if (value.length === 4 && owner.timePattern.indexOf('s') < 0) {
            timePattern.forEach(function (type, index) {
                switch (type) {
                case 'm':
                    minuteIndex = index * 2;
                    break;
                case 'h':
                    hourIndex = index * 2;
                    break;
                }
            });

            hourStartIndex = hourIndex;
            minuteStartIndex = minuteIndex;

            second = 0;
            minute = parseInt(value.slice(minuteStartIndex, minuteStartIndex + 2), 10);
            hour = parseInt(value.slice(hourStartIndex, hourStartIndex + 2), 10);

            time = this.getFixedTime(hour, minute, second);
        }

        owner.time = time;

        return time.length === 0 ? value : timePattern.reduce(function (previous, current) {
            switch (current) {
            case 's':
                return previous + owner.addLeadingZero(time[2]);
            case 'm':
                return previous + owner.addLeadingZero(time[1]);
            case 'h':
                return previous + owner.addLeadingZero(time[0]);
            }
        }, '');
    },

    getFixedTime: function (hour, minute, second) {
        second = Math.min(parseInt(second || 0, 10), 60);
        minute = Math.min(minute, 60);
        hour = Math.min(hour, 60);

        return [hour, minute, second];
    },

    addLeadingZero: function (number) {
        return (number < 10 ? '0' : '') + number;
    }
};

var TimeFormatter_1 = TimeFormatter;

var PhoneFormatter = function (formatter, delimiter) {
    var owner = this;

    owner.delimiter = (delimiter || delimiter === '') ? delimiter : ' ';
    owner.delimiterRE = delimiter ? new RegExp('\\' + delimiter, 'g') : '';

    owner.formatter = formatter;
};

PhoneFormatter.prototype = {
    setFormatter: function (formatter) {
        this.formatter = formatter;
    },

    format: function (phoneNumber) {
        var owner = this;

        owner.formatter.clear();

        // only keep number and +
        phoneNumber = phoneNumber.replace(/[^\d+]/g, '');

        // strip non-leading +
        phoneNumber = phoneNumber.replace(/^\+/, 'B').replace(/\+/g, '').replace('B', '+');

        // strip delimiter
        phoneNumber = phoneNumber.replace(owner.delimiterRE, '');

        var result = '', current, validated = false;

        for (var i = 0, iMax = phoneNumber.length; i < iMax; i++) {
            current = owner.formatter.inputDigit(phoneNumber.charAt(i));

            // has ()- or space inside
            if (/[\s()-]/g.test(current)) {
                result = current;

                validated = true;
            } else {
                if (!validated) {
                    result = current;
                }
                // else: over length input
                // it turns to invalid number again
            }
        }

        // strip ()
        // e.g. US: 7161234567 returns (716) 123-4567
        result = result.replace(/[()]/g, '');
        // replace library delimiter with user customized delimiter
        result = result.replace(/[\s-]/g, owner.delimiter);

        return result;
    }
};

var PhoneFormatter_1 = PhoneFormatter;

var CreditCardDetector = {
    blocks: {
        uatp:          [4, 5, 6],
        amex:          [4, 6, 5],
        diners:        [4, 6, 4],
        discover:      [4, 4, 4, 4],
        mastercard:    [4, 4, 4, 4],
        dankort:       [4, 4, 4, 4],
        instapayment:  [4, 4, 4, 4],
        jcb15:         [4, 6, 5],
        jcb:           [4, 4, 4, 4],
        maestro:       [4, 4, 4, 4],
        visa:          [4, 4, 4, 4],
        mir:           [4, 4, 4, 4],
        unionPay:      [4, 4, 4, 4],
        general:       [4, 4, 4, 4]
    },

    re: {
        // starts with 1; 15 digits, not starts with 1800 (jcb card)
        uatp: /^(?!1800)1\d{0,14}/,

        // starts with 34/37; 15 digits
        amex: /^3[47]\d{0,13}/,

        // starts with 6011/65/644-649; 16 digits
        discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,

        // starts with 300-305/309 or 36/38/39; 14 digits
        diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,

        // starts with 51-55/2221–2720; 16 digits
        mastercard: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,

        // starts with 5019/4175/4571; 16 digits
        dankort: /^(5019|4175|4571)\d{0,12}/,

        // starts with 637-639; 16 digits
        instapayment: /^63[7-9]\d{0,13}/,

        // starts with 2131/1800; 15 digits
        jcb15: /^(?:2131|1800)\d{0,11}/,

        // starts with 2131/1800/35; 16 digits
        jcb: /^(?:35\d{0,2})\d{0,12}/,

        // starts with 50/56-58/6304/67; 16 digits
        maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,

        // starts with 22; 16 digits
        mir: /^220[0-4]\d{0,12}/,

        // starts with 4; 16 digits
        visa: /^4\d{0,15}/,

        // starts with 62/81; 16 digits
        unionPay: /^(62|81)\d{0,14}/
    },

    getStrictBlocks: function (block) {
      var total = block.reduce(function (prev, current) {
        return prev + current;
      }, 0);

      return block.concat(19 - total);
    },

    getInfo: function (value, strictMode) {
        var blocks = CreditCardDetector.blocks,
            re = CreditCardDetector.re;

        // Some credit card can have up to 19 digits number.
        // Set strictMode to true will remove the 16 max-length restrain,
        // however, I never found any website validate card number like
        // this, hence probably you don't want to enable this option.
        strictMode = !!strictMode;

        for (var key in re) {
            if (re[key].test(value)) {
                var matchedBlocks = blocks[key];
                return {
                    type: key,
                    blocks: strictMode ? this.getStrictBlocks(matchedBlocks) : matchedBlocks
                };
            }
        }

        return {
            type: 'unknown',
            blocks: strictMode ? this.getStrictBlocks(blocks.general) : blocks.general
        };
    }
};

var CreditCardDetector_1 = CreditCardDetector;

var Util = {
    noop: function () {
    },

    strip: function (value, re) {
        return value.replace(re, '');
    },

    getPostDelimiter: function (value, delimiter, delimiters) {
        // single delimiter
        if (delimiters.length === 0) {
            return value.slice(-delimiter.length) === delimiter ? delimiter : '';
        }

        // multiple delimiters
        var matchedDelimiter = '';
        delimiters.forEach(function (current) {
            if (value.slice(-current.length) === current) {
                matchedDelimiter = current;
            }
        });

        return matchedDelimiter;
    },

    getDelimiterREByDelimiter: function (delimiter) {
        return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');
    },

    getNextCursorPosition: function (prevPos, oldValue, newValue, delimiter, delimiters) {
      // If cursor was at the end of value, just place it back.
      // Because new value could contain additional chars.
      if (oldValue.length === prevPos) {
          return newValue.length;
      }

      return prevPos + this.getPositionOffset(prevPos, oldValue, newValue, delimiter ,delimiters);
    },

    getPositionOffset: function (prevPos, oldValue, newValue, delimiter, delimiters) {
        var oldRawValue, newRawValue, lengthOffset;

        oldRawValue = this.stripDelimiters(oldValue.slice(0, prevPos), delimiter, delimiters);
        newRawValue = this.stripDelimiters(newValue.slice(0, prevPos), delimiter, delimiters);
        lengthOffset = oldRawValue.length - newRawValue.length;

        return (lengthOffset !== 0) ? (lengthOffset / Math.abs(lengthOffset)) : 0;
    },

    stripDelimiters: function (value, delimiter, delimiters) {
        var owner = this;

        // single delimiter
        if (delimiters.length === 0) {
            var delimiterRE = delimiter ? owner.getDelimiterREByDelimiter(delimiter) : '';

            return value.replace(delimiterRE, '');
        }

        // multiple delimiters
        delimiters.forEach(function (current) {
            current.split('').forEach(function (letter) {
                value = value.replace(owner.getDelimiterREByDelimiter(letter), '');
            });
        });

        return value;
    },

    headStr: function (str, length) {
        return str.slice(0, length);
    },

    getMaxLength: function (blocks) {
        return blocks.reduce(function (previous, current) {
            return previous + current;
        }, 0);
    },

    // strip prefix
    // Before type  |   After type    |     Return value
    // PEFIX-...    |   PEFIX-...     |     ''
    // PREFIX-123   |   PEFIX-123     |     123
    // PREFIX-123   |   PREFIX-23     |     23
    // PREFIX-123   |   PREFIX-1234   |     1234
    getPrefixStrippedValue: function (value, prefix, prefixLength, prevResult, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix) {
        // No prefix
        if (prefixLength === 0) {
          return value;
        }

        // Value is prefix
        if (value === prefix && value !== '') {
          return '';
        }

        if (signBeforePrefix && (value.slice(0, 1) == '-')) {
            var prev = (prevResult.slice(0, 1) == '-') ? prevResult.slice(1) : prevResult;
            return '-' + this.getPrefixStrippedValue(value.slice(1), prefix, prefixLength, prev, delimiter, delimiters, noImmediatePrefix, tailPrefix, signBeforePrefix);
        }

        // Pre result prefix string does not match pre-defined prefix
        if (prevResult.slice(0, prefixLength) !== prefix && !tailPrefix) {
            // Check if the first time user entered something
            if (noImmediatePrefix && !prevResult && value) return value;
            return '';
        } else if (prevResult.slice(-prefixLength) !== prefix && tailPrefix) {
            // Check if the first time user entered something
            if (noImmediatePrefix && !prevResult && value) return value;
            return '';
        }

        var prevValue = this.stripDelimiters(prevResult, delimiter, delimiters);

        // New value has issue, someone typed in between prefix letters
        // Revert to pre value
        if (value.slice(0, prefixLength) !== prefix && !tailPrefix) {
            return prevValue.slice(prefixLength);
        } else if (value.slice(-prefixLength) !== prefix && tailPrefix) {
            return prevValue.slice(0, -prefixLength - 1);
        }

        // No issue, strip prefix for new value
        return tailPrefix ? value.slice(0, -prefixLength) : value.slice(prefixLength);
    },

    getFirstDiffIndex: function (prev, current) {
        var index = 0;

        while (prev.charAt(index) === current.charAt(index)) {
            if (prev.charAt(index++) === '') {
                return -1;
            }
        }

        return index;
    },

    getFormattedValue: function (value, blocks, blocksLength, delimiter, delimiters, delimiterLazyShow) {
        var result = '',
            multipleDelimiters = delimiters.length > 0,
            currentDelimiter = '';

        // no options, normal input
        if (blocksLength === 0) {
            return value;
        }

        blocks.forEach(function (length, index) {
            if (value.length > 0) {
                var sub = value.slice(0, length),
                    rest = value.slice(length);

                if (multipleDelimiters) {
                    currentDelimiter = delimiters[delimiterLazyShow ? (index - 1) : index] || currentDelimiter;
                } else {
                    currentDelimiter = delimiter;
                }

                if (delimiterLazyShow) {
                    if (index > 0) {
                        result += currentDelimiter;
                    }

                    result += sub;
                } else {
                    result += sub;

                    if (sub.length === length && index < blocksLength - 1) {
                        result += currentDelimiter;
                    }
                }

                // update remaining string
                value = rest;
            }
        });

        return result;
    },

    // move cursor to the end
    // the first time user focuses on an input with prefix
    fixPrefixCursor: function (el, prefix, delimiter, delimiters) {
        if (!el) {
            return;
        }

        var val = el.value,
            appendix = delimiter || (delimiters[0] || ' ');

        if (!el.setSelectionRange || !prefix || (prefix.length + appendix.length) <= val.length) {
            return;
        }

        var len = val.length * 2;

        // set timeout to avoid blink
        setTimeout(function () {
            el.setSelectionRange(len, len);
        }, 1);
    },

    // Check if input field is fully selected
    checkFullSelection: function(value) {
      try {
        var selection = window.getSelection() || document.getSelection() || {};
        return selection.toString().length === value.length;
      } catch (ex) {
        // Ignore
      }

      return false;
    },

    setSelection: function (element, position, doc) {
        if (element !== this.getActiveElement(doc)) {
            return;
        }

        // cursor is already in the end
        if (element && element.value.length <= position) {
          return;
        }

        if (element.createTextRange) {
            var range = element.createTextRange();

            range.move('character', position);
            range.select();
        } else {
            try {
                element.setSelectionRange(position, position);
            } catch (e) {
                // eslint-disable-next-line
                console.warn('The input element type does not support selection');
            }
        }
    },

    getActiveElement: function(parent) {
        var activeElement = parent.activeElement;
        if (activeElement && activeElement.shadowRoot) {
            return this.getActiveElement(activeElement.shadowRoot);
        }
        return activeElement;
    },

    isAndroid: function () {
        return navigator && /android/i.test(navigator.userAgent);
    },

    // On Android chrome, the keyup and keydown events
    // always return key code 229 as a composition that
    // buffers the user’s keystrokes
    // see https://github.com/nosir/cleave.js/issues/147
    isAndroidBackspaceKeydown: function (lastInputValue, currentInputValue) {
        if (!this.isAndroid() || !lastInputValue || !currentInputValue) {
            return false;
        }

        return currentInputValue === lastInputValue.slice(0, -1);
    }
};

var Util_1 = Util;

/**
 * Props Assignment
 *
 * Separate this, so react module can share the usage
 */
var DefaultProperties = {
    // Maybe change to object-assign
    // for now just keep it as simple
    assign: function (target, opts) {
        target = target || {};
        opts = opts || {};

        // credit card
        target.creditCard = !!opts.creditCard;
        target.creditCardStrictMode = !!opts.creditCardStrictMode;
        target.creditCardType = '';
        target.onCreditCardTypeChanged = opts.onCreditCardTypeChanged || (function () {});

        // phone
        target.phone = !!opts.phone;
        target.phoneRegionCode = opts.phoneRegionCode || 'AU';
        target.phoneFormatter = {};

        // time
        target.time = !!opts.time;
        target.timePattern = opts.timePattern || ['h', 'm', 's'];
        target.timeFormat = opts.timeFormat || '24';
        target.timeFormatter = {};

        // date
        target.date = !!opts.date;
        target.datePattern = opts.datePattern || ['d', 'm', 'Y'];
        target.dateMin = opts.dateMin || '';
        target.dateMax = opts.dateMax || '';
        target.dateFormatter = {};

        // numeral
        target.numeral = !!opts.numeral;
        target.numeralIntegerScale = opts.numeralIntegerScale > 0 ? opts.numeralIntegerScale : 0;
        target.numeralDecimalScale = opts.numeralDecimalScale >= 0 ? opts.numeralDecimalScale : 2;
        target.numeralDecimalMark = opts.numeralDecimalMark || '.';
        target.numeralThousandsGroupStyle = opts.numeralThousandsGroupStyle || 'thousand';
        target.numeralPositiveOnly = !!opts.numeralPositiveOnly;
        target.stripLeadingZeroes = opts.stripLeadingZeroes !== false;
        target.signBeforePrefix = !!opts.signBeforePrefix;
        target.tailPrefix = !!opts.tailPrefix;

        // others
        target.swapHiddenInput = !!opts.swapHiddenInput;
        
        target.numericOnly = target.creditCard || target.date || !!opts.numericOnly;

        target.uppercase = !!opts.uppercase;
        target.lowercase = !!opts.lowercase;

        target.prefix = (target.creditCard || target.date) ? '' : (opts.prefix || '');
        target.noImmediatePrefix = !!opts.noImmediatePrefix;
        target.prefixLength = target.prefix.length;
        target.rawValueTrimPrefix = !!opts.rawValueTrimPrefix;
        target.copyDelimiter = !!opts.copyDelimiter;

        target.initValue = (opts.initValue !== undefined && opts.initValue !== null) ? opts.initValue.toString() : '';

        target.delimiter =
            (opts.delimiter || opts.delimiter === '') ? opts.delimiter :
                (opts.date ? '/' :
                    (opts.time ? ':' :
                        (opts.numeral ? ',' :
                            (opts.phone ? ' ' :
                                ' '))));
        target.delimiterLength = target.delimiter.length;
        target.delimiterLazyShow = !!opts.delimiterLazyShow;
        target.delimiters = opts.delimiters || [];

        target.blocks = opts.blocks || [];
        target.blocksLength = target.blocks.length;

        target.root = (typeof commonjsGlobal === 'object' && commonjsGlobal) ? commonjsGlobal : window;
        target.document = opts.document || target.root.document;

        target.maxLength = 0;

        target.backspace = false;
        target.result = '';

        target.onValueChanged = opts.onValueChanged || (function () {});

        return target;
    }
};

var DefaultProperties_1 = DefaultProperties;

/**
 * Construct a new Cleave instance by passing the configuration object
 *
 * @param {String | HTMLElement} element
 * @param {Object} opts
 */
var Cleave = function (element, opts) {
    var owner = this;
    var hasMultipleElements = false;

    if (typeof element === 'string') {
        owner.element = document.querySelector(element);
        hasMultipleElements = document.querySelectorAll(element).length > 1;
    } else {
      if (typeof element.length !== 'undefined' && element.length > 0) {
        owner.element = element[0];
        hasMultipleElements = element.length > 1;
      } else {
        owner.element = element;
      }
    }

    if (!owner.element) {
        throw new Error('[cleave.js] Please check the element');
    }

    if (hasMultipleElements) {
      try {
        // eslint-disable-next-line
        console.warn('[cleave.js] Multiple input fields matched, cleave.js will only take the first one.');
      } catch (e) {
        // Old IE
      }
    }

    opts.initValue = owner.element.value;

    owner.properties = Cleave.DefaultProperties.assign({}, opts);

    owner.init();
};

Cleave.prototype = {
    init: function () {
        var owner = this, pps = owner.properties;

        // no need to use this lib
        if (!pps.numeral && !pps.phone && !pps.creditCard && !pps.time && !pps.date && (pps.blocksLength === 0 && !pps.prefix)) {
            owner.onInput(pps.initValue);

            return;
        }

        pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);

        owner.isAndroid = Cleave.Util.isAndroid();
        owner.lastInputValue = '';
        owner.isBackward = '';

        owner.onChangeListener = owner.onChange.bind(owner);
        owner.onKeyDownListener = owner.onKeyDown.bind(owner);
        owner.onFocusListener = owner.onFocus.bind(owner);
        owner.onCutListener = owner.onCut.bind(owner);
        owner.onCopyListener = owner.onCopy.bind(owner);

        owner.initSwapHiddenInput();

        owner.element.addEventListener('input', owner.onChangeListener);
        owner.element.addEventListener('keydown', owner.onKeyDownListener);
        owner.element.addEventListener('focus', owner.onFocusListener);
        owner.element.addEventListener('cut', owner.onCutListener);
        owner.element.addEventListener('copy', owner.onCopyListener);


        owner.initPhoneFormatter();
        owner.initDateFormatter();
        owner.initTimeFormatter();
        owner.initNumeralFormatter();

        // avoid touch input field if value is null
        // otherwise Firefox will add red box-shadow for <input required />
        if (pps.initValue || (pps.prefix && !pps.noImmediatePrefix)) {
            owner.onInput(pps.initValue);
        }
    },

    initSwapHiddenInput: function () {
        var owner = this, pps = owner.properties;
        if (!pps.swapHiddenInput) return;

        var inputFormatter = owner.element.cloneNode(true);
        owner.element.parentNode.insertBefore(inputFormatter, owner.element);

        owner.elementSwapHidden = owner.element;
        owner.elementSwapHidden.type = 'hidden';

        owner.element = inputFormatter;
        owner.element.id = '';
    },

    initNumeralFormatter: function () {
        var owner = this, pps = owner.properties;

        if (!pps.numeral) {
            return;
        }

        pps.numeralFormatter = new Cleave.NumeralFormatter(
            pps.numeralDecimalMark,
            pps.numeralIntegerScale,
            pps.numeralDecimalScale,
            pps.numeralThousandsGroupStyle,
            pps.numeralPositiveOnly,
            pps.stripLeadingZeroes,
            pps.prefix,
            pps.signBeforePrefix,
            pps.tailPrefix,
            pps.delimiter
        );
    },

    initTimeFormatter: function() {
        var owner = this, pps = owner.properties;

        if (!pps.time) {
            return;
        }

        pps.timeFormatter = new Cleave.TimeFormatter(pps.timePattern, pps.timeFormat);
        pps.blocks = pps.timeFormatter.getBlocks();
        pps.blocksLength = pps.blocks.length;
        pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
    },

    initDateFormatter: function () {
        var owner = this, pps = owner.properties;

        if (!pps.date) {
            return;
        }

        pps.dateFormatter = new Cleave.DateFormatter(pps.datePattern, pps.dateMin, pps.dateMax);
        pps.blocks = pps.dateFormatter.getBlocks();
        pps.blocksLength = pps.blocks.length;
        pps.maxLength = Cleave.Util.getMaxLength(pps.blocks);
    },

    initPhoneFormatter: function () {
        var owner = this, pps = owner.properties;

        if (!pps.phone) {
            return;
        }

        // Cleave.AsYouTypeFormatter should be provided by
        // external google closure lib
        try {
            pps.phoneFormatter = new Cleave.PhoneFormatter(
                new pps.root.Cleave.AsYouTypeFormatter(pps.phoneRegionCode),
                pps.delimiter
            );
        } catch (ex) {
            throw new Error('[cleave.js] Please include phone-type-formatter.{country}.js lib');
        }
    },

    onKeyDown: function (event) {
        var owner = this,
            charCode = event.which || event.keyCode;

        owner.lastInputValue = owner.element.value;
        owner.isBackward = charCode === 8;
    },

    onChange: function (event) {
        var owner = this, pps = owner.properties,
            Util = Cleave.Util;

        owner.isBackward = owner.isBackward || event.inputType === 'deleteContentBackward';

        var postDelimiter = Util.getPostDelimiter(owner.lastInputValue, pps.delimiter, pps.delimiters);

        if (owner.isBackward && postDelimiter) {
            pps.postDelimiterBackspace = postDelimiter;
        } else {
            pps.postDelimiterBackspace = false;
        }

        this.onInput(this.element.value);
    },

    onFocus: function () {
        var owner = this,
            pps = owner.properties;
        owner.lastInputValue = owner.element.value;

        if (pps.prefix && pps.noImmediatePrefix && !owner.element.value) {
            this.onInput(pps.prefix);
        }

        Cleave.Util.fixPrefixCursor(owner.element, pps.prefix, pps.delimiter, pps.delimiters);
    },

    onCut: function (e) {
        if (!Cleave.Util.checkFullSelection(this.element.value)) return;
        this.copyClipboardData(e);
        this.onInput('');
    },

    onCopy: function (e) {
        if (!Cleave.Util.checkFullSelection(this.element.value)) return;
        this.copyClipboardData(e);
    },

    copyClipboardData: function (e) {
        var owner = this,
            pps = owner.properties,
            Util = Cleave.Util,
            inputValue = owner.element.value,
            textToCopy = '';

        if (!pps.copyDelimiter) {
            textToCopy = Util.stripDelimiters(inputValue, pps.delimiter, pps.delimiters);
        } else {
            textToCopy = inputValue;
        }

        try {
            if (e.clipboardData) {
                e.clipboardData.setData('Text', textToCopy);
            } else {
                window.clipboardData.setData('Text', textToCopy);
            }

            e.preventDefault();
        } catch (ex) {
            //  empty
        }
    },

    onInput: function (value) {
        var owner = this, pps = owner.properties,
            Util = Cleave.Util;

        // case 1: delete one more character "4"
        // 1234*| -> hit backspace -> 123|
        // case 2: last character is not delimiter which is:
        // 12|34* -> hit backspace -> 1|34*
        // note: no need to apply this for numeral mode
        var postDelimiterAfter = Util.getPostDelimiter(value, pps.delimiter, pps.delimiters);
        if (!pps.numeral && pps.postDelimiterBackspace && !postDelimiterAfter) {
            value = Util.headStr(value, value.length - pps.postDelimiterBackspace.length);
        }

        // phone formatter
        if (pps.phone) {
            if (pps.prefix && (!pps.noImmediatePrefix || value.length)) {
                pps.result = pps.prefix + pps.phoneFormatter.format(value).slice(pps.prefix.length);
            } else {
                pps.result = pps.phoneFormatter.format(value);
            }
            owner.updateValueState();

            return;
        }

        // numeral formatter
        if (pps.numeral) {
            // Do not show prefix when noImmediatePrefix is specified
            // This mostly because we need to show user the native input placeholder
            if (pps.prefix && pps.noImmediatePrefix && value.length === 0) {
                pps.result = '';
            } else {
                pps.result = pps.numeralFormatter.format(value);
            }
            owner.updateValueState();

            return;
        }

        // date
        if (pps.date) {
            value = pps.dateFormatter.getValidatedDate(value);
        }

        // time
        if (pps.time) {
            value = pps.timeFormatter.getValidatedTime(value);
        }

        // strip delimiters
        value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters);

        // strip prefix
        value = Util.getPrefixStrippedValue(value, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix, pps.tailPrefix, pps.signBeforePrefix);

        // strip non-numeric characters
        value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value;

        // convert case
        value = pps.uppercase ? value.toUpperCase() : value;
        value = pps.lowercase ? value.toLowerCase() : value;

        // prevent from showing prefix when no immediate option enabled with empty input value
        if (pps.prefix) {
            if (pps.tailPrefix) {
                value = value + pps.prefix;
            } else {
                value = pps.prefix + value;
            }


            // no blocks specified, no need to do formatting
            if (pps.blocksLength === 0) {
                pps.result = value;
                owner.updateValueState();

                return;
            }
        }

        // update credit card props
        if (pps.creditCard) {
            owner.updateCreditCardPropsByValue(value);
        }

        // strip over length characters
        value = Util.headStr(value, pps.maxLength);

        // apply blocks
        pps.result = Util.getFormattedValue(
            value,
            pps.blocks, pps.blocksLength,
            pps.delimiter, pps.delimiters, pps.delimiterLazyShow
        );

        owner.updateValueState();
    },

    updateCreditCardPropsByValue: function (value) {
        var owner = this, pps = owner.properties,
            Util = Cleave.Util,
            creditCardInfo;

        // At least one of the first 4 characters has changed
        if (Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
            return;
        }

        creditCardInfo = Cleave.CreditCardDetector.getInfo(value, pps.creditCardStrictMode);

        pps.blocks = creditCardInfo.blocks;
        pps.blocksLength = pps.blocks.length;
        pps.maxLength = Util.getMaxLength(pps.blocks);

        // credit card type changed
        if (pps.creditCardType !== creditCardInfo.type) {
            pps.creditCardType = creditCardInfo.type;

            pps.onCreditCardTypeChanged.call(owner, pps.creditCardType);
        }
    },

    updateValueState: function () {
        var owner = this,
            Util = Cleave.Util,
            pps = owner.properties;

        if (!owner.element) {
            return;
        }

        var endPos = owner.element.selectionEnd;
        var oldValue = owner.element.value;
        var newValue = pps.result;

        endPos = Util.getNextCursorPosition(endPos, oldValue, newValue, pps.delimiter, pps.delimiters);

        // fix Android browser type="text" input field
        // cursor not jumping issue
        if (owner.isAndroid) {
            window.setTimeout(function () {
                owner.element.value = newValue;
                Util.setSelection(owner.element, endPos, pps.document, false);
                owner.callOnValueChanged();
            }, 1);

            return;
        }

        owner.element.value = newValue;
        if (pps.swapHiddenInput) owner.elementSwapHidden.value = owner.getRawValue();

        Util.setSelection(owner.element, endPos, pps.document, false);
        owner.callOnValueChanged();
    },

    callOnValueChanged: function () {
        var owner = this,
            pps = owner.properties;

        pps.onValueChanged.call(owner, {
            target: {
                name: owner.element.name,
                value: pps.result,
                rawValue: owner.getRawValue()
            }
        });
    },

    setPhoneRegionCode: function (phoneRegionCode) {
        var owner = this, pps = owner.properties;

        pps.phoneRegionCode = phoneRegionCode;
        owner.initPhoneFormatter();
        owner.onChange();
    },

    setRawValue: function (value) {
        var owner = this, pps = owner.properties;

        value = value !== undefined && value !== null ? value.toString() : '';

        if (pps.numeral) {
            value = value.replace('.', pps.numeralDecimalMark);
        }

        pps.postDelimiterBackspace = false;

        owner.element.value = value;
        owner.onInput(value);
    },

    getRawValue: function () {
        var owner = this,
            pps = owner.properties,
            Util = Cleave.Util,
            rawValue = owner.element.value;

        if (pps.rawValueTrimPrefix) {
            rawValue = Util.getPrefixStrippedValue(rawValue, pps.prefix, pps.prefixLength, pps.result, pps.delimiter, pps.delimiters, pps.noImmediatePrefix, pps.tailPrefix, pps.signBeforePrefix);
        }

        if (pps.numeral) {
            rawValue = pps.numeralFormatter.getRawValue(rawValue);
        } else {
            rawValue = Util.stripDelimiters(rawValue, pps.delimiter, pps.delimiters);
        }

        return rawValue;
    },

    getISOFormatDate: function () {
        var owner = this,
            pps = owner.properties;

        return pps.date ? pps.dateFormatter.getISOFormatDate() : '';
    },

    getISOFormatTime: function () {
        var owner = this,
            pps = owner.properties;

        return pps.time ? pps.timeFormatter.getISOFormatTime() : '';
    },

    getFormattedValue: function () {
        return this.element.value;
    },

    destroy: function () {
        var owner = this;

        owner.element.removeEventListener('input', owner.onChangeListener);
        owner.element.removeEventListener('keydown', owner.onKeyDownListener);
        owner.element.removeEventListener('focus', owner.onFocusListener);
        owner.element.removeEventListener('cut', owner.onCutListener);
        owner.element.removeEventListener('copy', owner.onCopyListener);
    },

    toString: function () {
        return '[Cleave Object]';
    }
};

Cleave.NumeralFormatter = NumeralFormatter_1;
Cleave.DateFormatter = DateFormatter_1;
Cleave.TimeFormatter = TimeFormatter_1;
Cleave.PhoneFormatter = PhoneFormatter_1;
Cleave.CreditCardDetector = CreditCardDetector_1;
Cleave.Util = Util_1;
Cleave.DefaultProperties = DefaultProperties_1;

// for angular directive
((typeof commonjsGlobal === 'object' && commonjsGlobal) ? commonjsGlobal : window)['Cleave'] = Cleave;

// CommonJS
var Cleave_1 = Cleave;

/* harmony default export */ __webpack_exports__["default"] = (Cleave_1);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IncredibleOffers.vue?vue&type=style&index=0&id=1ac9bd27&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/IncredibleOffers.vue?vue&type=style&index=0&id=1ac9bd27&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.message_box[data-v-1ac9bd27]{\n    width: 475px!important;\n}\n.message_box p[data-v-1ac9bd27]{\n    margin-bottom: 2rem!important;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/highcharts-vue/dist/highcharts-vue.min.js":
/*!****************************************************************!*\
  !*** ./node_modules/highcharts-vue/dist/highcharts-vue.min.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js"),__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js")):undefined}(window,function(r,n){return c={},o.m=i=[function(t,e){t.exports=r},function(t,e){t.exports=n},function(t,e,r){"use strict";r.r(e),r.d(e,"Chart",function(){return l}),r.d(e,"default",function(){return h});var e=r(0),c=r.n(e);function n(t,e){return function r(n,o,i){function t(t,e){!c.a.isObject(t,!i)||c.a.isClass(t)||c.a.isDOMElement(t)?n[e]=o[e]:n[e]=r(n[e]||c.a.isArray(t)?[]:{},t,i)}return c.a.isArray(o)?o.forEach(t):c.a.objectEach(o,t),n}({},t,e)}var o=r(1);function i(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(r="Object"===r&&t.constructor?t.constructor.name:r)||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function u(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)),n}function s(n){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?u(Object(o),!0).forEach(function(t){var e,r;e=n,t=o[r=t],r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):u(Object(o)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(o,t))})}return n}function f(){this.chart&&this.chart.destroy()}var p=function(e,t){t=t.split(".")[0]<3?{render:function(t){return t("div",{ref:"chart"})},beforeDestroy:f}:{render:function(){return Object(o.h)("div",{ref:"chart"})},beforeUnmount:f};return s({template:'<div ref="chart"></div>',props:{constructorType:{type:String,default:"chart"},options:{type:Object,required:!0},callback:Function,updateArgs:{type:Array,default:function(){return[!0,!0]}},highcharts:{type:Object},deepCopyOnUpdate:{type:Boolean,default:!0}},watch:{options:{handler:function(t){var e;(e=this.chart).update.apply(e,[n(t,this.deepCopyOnUpdate)].concat(i(this.updateArgs)))},deep:!0}},mounted:function(){var t=this.highcharts||e;this.options&&t[this.constructorType]?this.chart=t[this.constructorType](this.$refs.chart,n(this.options,!0),this.callback||null):this.options?console.warn("'".concat(this.constructorType,"' constructor-type is incorrect. Sometimes this error is caused by the fact, that the corresponding module wasn't imported.")):console.warn('The "options" parameter was not passed.')}},t)},l=p(c.a,o.version||r.n(o).a.version);function h(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};t.component(e.tagName||"highcharts",p(e.highcharts||c.a,t.version))}}],o.c=c,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=2);function o(t){if(c[t])return c[t].exports;var e=c[t]={i:t,l:!1,exports:{}};return i[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}var i,c});

/***/ }),

/***/ "./node_modules/highcharts/highcharts.js":
/*!***********************************************!*\
  !*** ./node_modules/highcharts/highcharts.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 Highcharts JS v10.3.2 (2022-11-28)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(aa,K){ true&&module.exports?(K["default"]=K,module.exports=aa.document?K(aa):K): true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return K(aa)}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):(undefined)})("undefined"!==typeof window?window:this,function(aa){function K(a,v,g,E){a.hasOwnProperty(v)||(a[v]=E.apply(null,g),"function"===typeof CustomEvent&&aa.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:v,module:a[v]}})))}
var g={};K(g,"Core/Globals.js",[],function(){var a;(function(a){a.SVG_NS="http://www.w3.org/2000/svg";a.product="Highcharts";a.version="10.3.2";a.win="undefined"!==typeof aa?aa:{};a.doc=a.win.document;a.svg=a.doc&&a.doc.createElementNS&&!!a.doc.createElementNS(a.SVG_NS,"svg").createSVGRect;a.userAgent=a.win.navigator&&a.win.navigator.userAgent||"";a.isChrome=-1!==a.userAgent.indexOf("Chrome");a.isFirefox=-1!==a.userAgent.indexOf("Firefox");a.isMS=/(edge|msie|trident)/i.test(a.userAgent)&&!a.win.opera;
a.isSafari=!a.isChrome&&-1!==a.userAgent.indexOf("Safari");a.isTouchDevice=/(Mobile|Android|Windows Phone)/.test(a.userAgent);a.isWebKit=-1!==a.userAgent.indexOf("AppleWebKit");a.deg2rad=2*Math.PI/360;a.hasBidiBug=a.isFirefox&&4>parseInt(a.userAgent.split("Firefox/")[1],10);a.hasTouch=!!a.win.TouchEvent;a.marginNames=["plotTop","marginRight","marginBottom","plotLeft"];a.noop=function(){};a.supportsPassiveEvents=function(){var g=!1;if(!a.isMS){var v=Object.defineProperty({},"passive",{get:function(){g=
!0}});a.win.addEventListener&&a.win.removeEventListener&&(a.win.addEventListener("testPassive",a.noop,v),a.win.removeEventListener("testPassive",a.noop,v))}return g}();a.charts=[];a.dateFormats={};a.seriesTypes={};a.symbolSizes={};a.chartCount=0})(a||(a={}));"";return a});K(g,"Core/Utilities.js",[g["Core/Globals.js"]],function(a){function g(b,d,k,H){var z=d?"Highcharts error":"Highcharts warning";32===b&&(b=""+z+": Deprecated member");var w=n(b),p=w?""+z+" #"+b+": www.highcharts.com/errors/"+b+"/":
b.toString();if("undefined"!==typeof H){var q="";w&&(p+="?");I(H,function(b,z){q+="\n - ".concat(z,": ").concat(b);w&&(p+=encodeURI(z)+"="+encodeURI(b))});p+=q}A(a,"displayError",{chart:k,code:b,message:p,params:H},function(){if(d)throw Error(p);h.console&&-1===g.messages.indexOf(p)&&console.warn(p)});g.messages.push(p)}function x(b,h){var z={};I(b,function(d,w){if(G(b[w],!0)&&!b.nodeType&&h[w])d=x(b[w],h[w]),Object.keys(d).length&&(z[w]=d);else if(G(b[w])||b[w]!==h[w]||w in b&&!(w in h))z[w]=b[w]});
return z}function E(b,h){return parseInt(b,h||10)}function D(b){return"string"===typeof b}function B(b){b=Object.prototype.toString.call(b);return"[object Array]"===b||"[object Array Iterator]"===b}function G(b,h){return!!b&&"object"===typeof b&&(!h||!B(b))}function r(b){return G(b)&&"number"===typeof b.nodeType}function t(b){var h=b&&b.constructor;return!(!G(b,!0)||r(b)||!h||!h.name||"Object"===h.name)}function n(b){return"number"===typeof b&&!isNaN(b)&&Infinity>b&&-Infinity<b}function f(b){return"undefined"!==
typeof b&&null!==b}function c(b,h,d){var z=D(h)&&!f(d),w,k=function(h,d){f(h)?b.setAttribute(d,h):z?(w=b.getAttribute(d))||"class"!==d||(w=b.getAttribute(d+"Name")):b.removeAttribute(d)};D(h)?k(d,h):I(h,k);return w}function l(b,h){var d;b||(b={});for(d in h)b[d]=h[d];return b}function m(){for(var b=arguments,h=b.length,d=0;d<h;d++){var H=b[d];if("undefined"!==typeof H&&null!==H)return H}}function e(b,h){a.isMS&&!a.svg&&h&&f(h.opacity)&&(h.filter="alpha(opacity=".concat(100*h.opacity,")"));l(b.style,
h)}function u(b){return Math.pow(10,Math.floor(Math.log(b)/Math.LN10))}function C(b,h){return 1E14<b?b:parseFloat(b.toPrecision(h||14))}function J(b,d,k){var z=a.getStyle||J;if("width"===d)return d=Math.min(b.offsetWidth,b.scrollWidth),k=b.getBoundingClientRect&&b.getBoundingClientRect().width,k<d&&k>=d-1&&(d=Math.floor(k)),Math.max(0,d-(z(b,"padding-left",!0)||0)-(z(b,"padding-right",!0)||0));if("height"===d)return Math.max(0,Math.min(b.offsetHeight,b.scrollHeight)-(z(b,"padding-top",!0)||0)-(z(b,
"padding-bottom",!0)||0));h.getComputedStyle||g(27,!0);if(b=h.getComputedStyle(b,void 0)){var w=b.getPropertyValue(d);m(k,"opacity"!==d)&&(w=E(w))}return w}function I(b,h,d){for(var z in b)Object.hasOwnProperty.call(b,z)&&h.call(d||b[z],b[z],z,b)}function L(b,h,d){function z(h,y){var d=b.removeEventListener||a.removeEventListenerPolyfill;d&&d.call(b,h,y,!1)}function w(d){var y;if(b.nodeName){if(h){var H={};H[h]=!0}else H=d;I(H,function(b,h){if(d[h])for(y=d[h].length;y--;)z(h,d[h][y].fn)})}}var k=
"function"===typeof b&&b.prototype||b;if(Object.hasOwnProperty.call(k,"hcEvents")){var p=k.hcEvents;h?(k=p[h]||[],d?(p[h]=k.filter(function(b){return d!==b.fn}),z(h,d)):(w(p),p[h]=[])):(w(p),delete k.hcEvents)}}function A(b,h,d,H){d=d||{};if(q.createEvent&&(b.dispatchEvent||b.fireEvent&&b!==a)){var z=q.createEvent("Events");z.initEvent(h,!0,!0);d=l(z,d);b.dispatchEvent?b.dispatchEvent(d):b.fireEvent(h,d)}else if(b.hcEvents){d.target||l(d,{preventDefault:function(){d.defaultPrevented=!0},target:b,
type:h});z=[];for(var w=b,k=!1;w.hcEvents;)Object.hasOwnProperty.call(w,"hcEvents")&&w.hcEvents[h]&&(z.length&&(k=!0),z.unshift.apply(z,w.hcEvents[h])),w=Object.getPrototypeOf(w);k&&z.sort(function(b,h){return b.order-h.order});z.forEach(function(h){!1===h.fn.call(b,d)&&d.preventDefault()})}H&&!d.defaultPrevented&&H.call(b,d)}var d=a.charts,q=a.doc,h=a.win;(g||(g={})).messages=[];Math.easeInOutSine=function(b){return-.5*(Math.cos(Math.PI*b)-1)};var k=Array.prototype.find?function(b,h){return b.find(h)}:
function(b,h){var d,z=b.length;for(d=0;d<z;d++)if(h(b[d],d))return b[d]};I({map:"map",each:"forEach",grep:"filter",reduce:"reduce",some:"some"},function(b,h){a[h]=function(d){var z;g(32,!1,void 0,(z={},z["Highcharts.".concat(h)]="use Array.".concat(b),z));return Array.prototype[b].apply(d,[].slice.call(arguments,1))}});var b,p=function(){var h=Math.random().toString(36).substring(2,9)+"-",d=0;return function(){return"highcharts-"+(b?"":h)+d++}}();h.jQuery&&(h.jQuery.fn.highcharts=function(){var b=
[].slice.call(arguments);if(this[0])return b[0]?(new (a[D(b[0])?b.shift():"Chart"])(this[0],b[0],b[1]),this):d[c(this[0],"data-highcharts-chart")]});k={addEvent:function(b,h,d,H){void 0===H&&(H={});var k="function"===typeof b&&b.prototype||b;Object.hasOwnProperty.call(k,"hcEvents")||(k.hcEvents={});k=k.hcEvents;a.Point&&b instanceof a.Point&&b.series&&b.series.chart&&(b.series.chart.runTrackerClick=!0);var z=b.addEventListener||a.addEventListenerPolyfill;z&&z.call(b,h,d,a.supportsPassiveEvents?{passive:void 0===
H.passive?-1!==h.indexOf("touch"):H.passive,capture:!1}:!1);k[h]||(k[h]=[]);k[h].push({fn:d,order:"number"===typeof H.order?H.order:Infinity});k[h].sort(function(b,h){return b.order-h.order});return function(){L(b,h,d)}},arrayMax:function(b){for(var h=b.length,d=b[0];h--;)b[h]>d&&(d=b[h]);return d},arrayMin:function(b){for(var h=b.length,d=b[0];h--;)b[h]<d&&(d=b[h]);return d},attr:c,clamp:function(b,h,d){return b>h?b<d?b:d:h},cleanRecursively:x,clearTimeout:function(b){f(b)&&clearTimeout(b)},correctFloat:C,
createElement:function(b,h,d,k,p){b=q.createElement(b);h&&l(b,h);p&&e(b,{padding:"0",border:"none",margin:"0"});d&&e(b,d);k&&k.appendChild(b);return b},css:e,defined:f,destroyObjectProperties:function(b,h){I(b,function(d,k){d&&d!==h&&d.destroy&&d.destroy();delete b[k]})},discardElement:function(b){b&&b.parentElement&&b.parentElement.removeChild(b)},erase:function(b,h){for(var d=b.length;d--;)if(b[d]===h){b.splice(d,1);break}},error:g,extend:l,extendClass:function(b,h){var d=function(){};d.prototype=
new b;l(d.prototype,h);return d},find:k,fireEvent:A,getMagnitude:u,getNestedProperty:function(b,d){for(b=b.split(".");b.length&&f(d);){var k=b.shift();if("undefined"===typeof k||"__proto__"===k)return;d=d[k];if(!f(d)||"function"===typeof d||"number"===typeof d.nodeType||d===h)return}return d},getStyle:J,inArray:function(b,d,h){g(32,!1,void 0,{"Highcharts.inArray":"use Array.indexOf"});return d.indexOf(b,h)},isArray:B,isClass:t,isDOMElement:r,isFunction:function(b){return"function"===typeof b},isNumber:n,
isObject:G,isString:D,keys:function(b){g(32,!1,void 0,{"Highcharts.keys":"use Object.keys"});return Object.keys(b)},merge:function(){var b,d=arguments,h={},k=function(b,d){"object"!==typeof b&&(b={});I(d,function(h,y){"__proto__"!==y&&"constructor"!==y&&(!G(h,!0)||t(h)||r(h)?b[y]=d[y]:b[y]=k(b[y]||{},h))});return b};!0===d[0]&&(h=d[1],d=Array.prototype.slice.call(d,2));var p=d.length;for(b=0;b<p;b++)h=k(h,d[b]);return h},normalizeTickInterval:function(b,d,h,k,p){var H=b;h=m(h,u(b));var w=b/h;d||(d=
p?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===k&&(1===h?d=d.filter(function(b){return 0===b%1}):.1>=h&&(d=[1/h])));for(k=0;k<d.length&&!(H=d[k],p&&H*h>=b||!p&&w<=(d[k]+(d[k+1]||d[k]))/2);k++);return H=C(H*h,-Math.round(Math.log(.001)/Math.LN10))},objectEach:I,offset:function(b){var d=q.documentElement;b=b.parentElement||b.parentNode?b.getBoundingClientRect():{top:0,left:0,width:0,height:0};return{top:b.top+(h.pageYOffset||d.scrollTop)-(d.clientTop||0),left:b.left+(h.pageXOffset||d.scrollLeft)-
(d.clientLeft||0),width:b.width,height:b.height}},pad:function(b,d,h){return Array((d||2)+1-String(b).replace("-","").length).join(h||"0")+b},pick:m,pInt:E,relativeLength:function(b,d,h){return/%$/.test(b)?d*parseFloat(b)/100+(h||0):parseFloat(b)},removeEvent:L,splat:function(b){return B(b)?b:[b]},stableSort:function(b,d){var h=b.length,k,p;for(p=0;p<h;p++)b[p].safeI=p;b.sort(function(b,h){k=d(b,h);return 0===k?b.safeI-h.safeI:k});for(p=0;p<h;p++)delete b[p].safeI},syncTimeout:function(b,d,h){if(0<
d)return setTimeout(b,d,h);b.call(0,h);return-1},timeUnits:{millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5},uniqueKey:p,useSerialIds:function(d){return b=m(d,b)},wrap:function(b,d,h){var k=b[d];b[d]=function(){var b=arguments,d=this;return h.apply(this,[function(){return k.apply(d,arguments.length?arguments:b)}].concat([].slice.call(arguments)))}}};"";return k});K(g,"Core/Chart/ChartDefaults.js",[],function(){return{alignThresholds:!1,panning:{enabled:!1,
type:"x"},styledMode:!1,borderRadius:0,colorCount:10,allowMutatingData:!0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},zoomBySingleTouch:!1,zooming:{singleTouch:!1,resetButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"}});K(g,"Core/Color/Color.js",[g["Core/Globals.js"],g["Core/Utilities.js"]],function(a,
g){var v=g.isNumber,E=g.merge,D=g.pInt;g=function(){function g(v){this.rgba=[NaN,NaN,NaN,NaN];this.input=v;var r=a.Color;if(r&&r!==g)return new r(v);if(!(this instanceof g))return new g(v);this.init(v)}g.parse=function(a){return a?new g(a):g.None};g.prototype.init=function(a){var r;if("object"===typeof a&&"undefined"!==typeof a.stops)this.stops=a.stops.map(function(c){return new g(c[1])});else if("string"===typeof a){this.input=a=g.names[a.toLowerCase()]||a;if("#"===a.charAt(0)){var t=a.length;var n=
parseInt(a.substr(1),16);7===t?r=[(n&16711680)>>16,(n&65280)>>8,n&255,1]:4===t&&(r=[(n&3840)>>4|(n&3840)>>8,(n&240)>>4|n&240,(n&15)<<4|n&15,1])}if(!r)for(n=g.parsers.length;n--&&!r;){var f=g.parsers[n];(t=f.regex.exec(a))&&(r=f.parse(t))}}r&&(this.rgba=r)};g.prototype.get=function(a){var r=this.input,t=this.rgba;if("object"===typeof r&&"undefined"!==typeof this.stops){var n=E(r);n.stops=[].slice.call(n.stops);this.stops.forEach(function(f,c){n.stops[c]=[n.stops[c][0],f.get(a)]});return n}return t&&
v(t[0])?"rgb"===a||!a&&1===t[3]?"rgb("+t[0]+","+t[1]+","+t[2]+")":"a"===a?"".concat(t[3]):"rgba("+t.join(",")+")":r};g.prototype.brighten=function(a){var r=this.rgba;if(this.stops)this.stops.forEach(function(n){n.brighten(a)});else if(v(a)&&0!==a)for(var t=0;3>t;t++)r[t]+=D(255*a),0>r[t]&&(r[t]=0),255<r[t]&&(r[t]=255);return this};g.prototype.setOpacity=function(a){this.rgba[3]=a;return this};g.prototype.tweenTo=function(a,r){var t=this.rgba,n=a.rgba;if(!v(t[0])||!v(n[0]))return a.input||"none";a=
1!==n[3]||1!==t[3];return(a?"rgba(":"rgb(")+Math.round(n[0]+(t[0]-n[0])*(1-r))+","+Math.round(n[1]+(t[1]-n[1])*(1-r))+","+Math.round(n[2]+(t[2]-n[2])*(1-r))+(a?","+(n[3]+(t[3]-n[3])*(1-r)):"")+")"};g.names={white:"#ffffff",black:"#000000"};g.parsers=[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[D(a[1]),D(a[2]),D(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[D(a[1]),
D(a[2]),D(a[3]),1]}}];g.None=new g("");return g}();"";return g});K(g,"Core/Color/Palettes.js",[],function(){return{colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" ")}});K(g,"Core/Time.js",[g["Core/Globals.js"],g["Core/Utilities.js"]],function(a,g){var v=a.win,E=g.defined,D=g.error,B=g.extend,G=g.isObject,r=g.merge,t=g.objectEach,n=g.pad,f=g.pick,c=g.splat,l=g.timeUnits,m=a.isSafari&&v.Intl&&v.Intl.DateTimeFormat.prototype.formatRange,e=a.isSafari&&
v.Intl&&!v.Intl.DateTimeFormat.prototype.formatRange;g=function(){function u(c){this.options={};this.variableTimezone=this.useUTC=!1;this.Date=v.Date;this.getTimezoneOffset=this.timezoneOffsetFunction();this.update(c)}u.prototype.get=function(c,e){if(this.variableTimezone||this.timezoneOffset){var m=e.getTime(),l=m-this.getTimezoneOffset(e);e.setTime(l);c=e["getUTC"+c]();e.setTime(m);return c}return this.useUTC?e["getUTC"+c]():e["get"+c]()};u.prototype.set=function(c,e,l){if(this.variableTimezone||
this.timezoneOffset){if("Milliseconds"===c||"Seconds"===c||"Minutes"===c&&0===this.getTimezoneOffset(e)%36E5)return e["setUTC"+c](l);var f=this.getTimezoneOffset(e);f=e.getTime()-f;e.setTime(f);e["setUTC"+c](l);c=this.getTimezoneOffset(e);f=e.getTime()+c;return e.setTime(f)}return this.useUTC||m&&"FullYear"===c?e["setUTC"+c](l):e["set"+c](l)};u.prototype.update=function(c){void 0===c&&(c={});var e=f(c.useUTC,!0);this.options=c=r(!0,this.options,c);this.Date=c.Date||v.Date||Date;this.timezoneOffset=
(this.useUTC=e)&&c.timezoneOffset||void 0;this.getTimezoneOffset=this.timezoneOffsetFunction();this.variableTimezone=e&&!(!c.getTimezoneOffset&&!c.timezone)};u.prototype.makeTime=function(c,m,l,u,A,d){if(this.useUTC){var q=this.Date.UTC.apply(0,arguments);var h=this.getTimezoneOffset(q);q+=h;var k=this.getTimezoneOffset(q);h!==k?q+=k-h:h-36E5!==this.getTimezoneOffset(q-36E5)||e||(q-=36E5)}else q=(new this.Date(c,m,f(l,1),f(u,0),f(A,0),f(d,0))).getTime();return q};u.prototype.timezoneOffsetFunction=
function(){var c=this,e=this.options,m=e.getTimezoneOffset,l=e.moment||v.moment;if(!this.useUTC)return function(c){return 6E4*(new Date(c.toString())).getTimezoneOffset()};if(e.timezone){if(l)return function(c){return 6E4*-l.tz(c,e.timezone).utcOffset()};D(25)}return this.useUTC&&m?function(c){return 6E4*m(c.valueOf())}:function(){return 6E4*(c.timezoneOffset||0)}};u.prototype.dateFormat=function(c,e,m){if(!E(e)||isNaN(e))return a.defaultOptions.lang&&a.defaultOptions.lang.invalidDate||"";c=f(c,"%Y-%m-%d %H:%M:%S");
var l=this,u=new this.Date(e),d=this.get("Hours",u),q=this.get("Day",u),h=this.get("Date",u),k=this.get("Month",u),b=this.get("FullYear",u),p=a.defaultOptions.lang,z=p&&p.weekdays,w=p&&p.shortWeekdays;u=B({a:w?w[q]:z[q].substr(0,3),A:z[q],d:n(h),e:n(h,2," "),w:q,b:p.shortMonths[k],B:p.months[k],m:n(k+1),o:k+1,y:b.toString().substr(2,2),Y:b,H:n(d),k:d,I:n(d%12||12),l:d%12||12,M:n(this.get("Minutes",u)),p:12>d?"AM":"PM",P:12>d?"am":"pm",S:n(u.getSeconds()),L:n(Math.floor(e%1E3),3)},a.dateFormats);t(u,
function(b,d){for(;-1!==c.indexOf("%"+d);)c=c.replace("%"+d,"function"===typeof b?b.call(l,e):b)});return m?c.substr(0,1).toUpperCase()+c.substr(1):c};u.prototype.resolveDTLFormat=function(e){return G(e,!0)?e:(e=c(e),{main:e[0],from:e[1],to:e[2]})};u.prototype.getTimeTicks=function(c,e,m,u){var A=this,d=[],q={},h=new A.Date(e),k=c.unitRange,b=c.count||1,p;u=f(u,1);if(E(e)){A.set("Milliseconds",h,k>=l.second?0:b*Math.floor(A.get("Milliseconds",h)/b));k>=l.second&&A.set("Seconds",h,k>=l.minute?0:b*
Math.floor(A.get("Seconds",h)/b));k>=l.minute&&A.set("Minutes",h,k>=l.hour?0:b*Math.floor(A.get("Minutes",h)/b));k>=l.hour&&A.set("Hours",h,k>=l.day?0:b*Math.floor(A.get("Hours",h)/b));k>=l.day&&A.set("Date",h,k>=l.month?1:Math.max(1,b*Math.floor(A.get("Date",h)/b)));if(k>=l.month){A.set("Month",h,k>=l.year?0:b*Math.floor(A.get("Month",h)/b));var z=A.get("FullYear",h)}k>=l.year&&A.set("FullYear",h,z-z%b);k===l.week&&(z=A.get("Day",h),A.set("Date",h,A.get("Date",h)-z+u+(z<u?-7:0)));z=A.get("FullYear",
h);u=A.get("Month",h);var w=A.get("Date",h),C=A.get("Hours",h);e=h.getTime();!A.variableTimezone&&A.useUTC||!E(m)||(p=m-e>4*l.month||A.getTimezoneOffset(e)!==A.getTimezoneOffset(m));e=h.getTime();for(h=1;e<m;)d.push(e),e=k===l.year?A.makeTime(z+h*b,0):k===l.month?A.makeTime(z,u+h*b):!p||k!==l.day&&k!==l.week?p&&k===l.hour&&1<b?A.makeTime(z,u,w,C+h*b):e+k*b:A.makeTime(z,u,w+h*b*(k===l.day?1:7)),h++;d.push(e);k<=l.hour&&1E4>d.length&&d.forEach(function(b){0===b%18E5&&"000000000"===A.dateFormat("%H%M%S%L",
b)&&(q[b]="day")})}d.info=B(c,{higherRanks:q,totalRange:k*b});return d};u.prototype.getDateFormat=function(c,e,m,u){var f=this.dateFormat("%m-%d %H:%M:%S.%L",e),d={millisecond:15,second:12,minute:9,hour:6,day:3},q="millisecond";for(h in l){if(c===l.week&&+this.dateFormat("%w",e)===m&&"00:00:00.000"===f.substr(6)){var h="week";break}if(l[h]>c){h=q;break}if(d[h]&&f.substr(d[h])!=="01-01 00:00:00.000".substr(d[h]))break;"week"!==h&&(q=h)}return this.resolveDTLFormat(u[h]).main};return u}();"";return g});
K(g,"Core/Defaults.js",[g["Core/Chart/ChartDefaults.js"],g["Core/Color/Color.js"],g["Core/Globals.js"],g["Core/Color/Palettes.js"],g["Core/Time.js"],g["Core/Utilities.js"]],function(a,g,x,E,D,B){g=g.parse;var v=B.merge,r={colors:E.colors,symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:{Date:void 0,getTimezoneOffset:void 0,timezone:void 0,timezoneOffset:0,useUTC:!0},chart:a,title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},caption:{margin:15,text:"",align:"left",verticalAlign:"bottom"},plotOptions:{},
labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,className:"highcharts-no-tooltip",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",cursor:"pointer",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",
width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:x.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",
month:"%B %Y",year:"%Y"},footerFormat:"",headerShape:"callout",hideDelay:500,padding:8,shape:"callout",shared:!1,snap:x.isTouchDevice?25:10,headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',backgroundColor:g("#f7f7f7").setOpacity(.85).get(),borderWidth:1,shadow:!0,stickOnContact:!1,style:{color:"#333333",cursor:"default",fontSize:"12px",whiteSpace:"nowrap"},useHTML:!1},credits:{enabled:!0,
href:"https://www.highcharts.com?credits",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};r.chart.styledMode=!1;"";var t=new D(v(r.global,r.time));a={defaultOptions:r,defaultTime:t,getOptions:function(){return r},setOptions:function(a){v(!0,r,a);if(a.time||a.global)x.time?x.time.update(v(r.global,r.time,a.global,a.time)):x.time=t;return r}};"";return a});K(g,"Core/Animation/Fx.js",[g["Core/Color/Color.js"],
g["Core/Globals.js"],g["Core/Utilities.js"]],function(a,g,x){var v=a.parse,D=g.win,B=x.isNumber,G=x.objectEach;return function(){function a(a,n,f){this.pos=NaN;this.options=n;this.elem=a;this.prop=f}a.prototype.dSetter=function(){var a=this.paths,n=a&&a[0];a=a&&a[1];var f=this.now||0,c=[];if(1!==f&&n&&a)if(n.length===a.length&&1>f)for(var l=0;l<a.length;l++){for(var m=n[l],e=a[l],u=[],C=0;C<e.length;C++){var J=m[C],I=e[C];B(J)&&B(I)&&("A"!==e[0]||4!==C&&5!==C)?u[C]=J+f*(I-J):u[C]=I}c.push(u)}else c=
a;else c=this.toD||[];this.elem.attr("d",c,void 0,!0)};a.prototype.update=function(){var a=this.elem,n=this.prop,f=this.now,c=this.options.step;if(this[n+"Setter"])this[n+"Setter"]();else a.attr?a.element&&a.attr(n,f,null,!0):a.style[n]=f+this.unit;c&&c.call(a,f,this)};a.prototype.run=function(r,n,f){var c=this,l=c.options,m=function(e){return m.stopped?!1:c.step(e)},e=D.requestAnimationFrame||function(c){setTimeout(c,13)},u=function(){for(var c=0;c<a.timers.length;c++)a.timers[c]()||a.timers.splice(c--,
1);a.timers.length&&e(u)};r!==n||this.elem["forceAnimate:"+this.prop]?(this.startTime=+new Date,this.start=r,this.end=n,this.unit=f,this.now=this.start,this.pos=0,m.elem=this.elem,m.prop=this.prop,m()&&1===a.timers.push(m)&&e(u)):(delete l.curAnim[this.prop],l.complete&&0===Object.keys(l.curAnim).length&&l.complete.call(this.elem))};a.prototype.step=function(a){var n=+new Date,f=this.options,c=this.elem,l=f.complete,m=f.duration,e=f.curAnim;if(c.attr&&!c.element)a=!1;else if(a||n>=m+this.startTime){this.now=
this.end;this.pos=1;this.update();var u=e[this.prop]=!0;G(e,function(c){!0!==c&&(u=!1)});u&&l&&l.call(c);a=!1}else this.pos=f.easing((n-this.startTime)/m),this.now=this.start+(this.end-this.start)*this.pos,this.update(),a=!0;return a};a.prototype.initPath=function(a,n,f){function c(c,d){for(;c.length<r;){var e=c[0],h=d[r-c.length];h&&"M"===e[0]&&(c[0]="C"===h[0]?["C",e[1],e[2],e[1],e[2],e[1],e[2]]:["L",e[1],e[2]]);c.unshift(e);u&&(e=c.pop(),c.push(c[c.length-1],e))}}function l(c,d){for(;c.length<
r;)if(d=c[Math.floor(c.length/C)-1].slice(),"C"===d[0]&&(d[1]=d[5],d[2]=d[6]),u){var e=c[Math.floor(c.length/C)].slice();c.splice(c.length/2,0,d,e)}else c.push(d)}var m=a.startX,e=a.endX;f=f.slice();var u=a.isArea,C=u?2:1;n=n&&n.slice();if(!n)return[f,f];if(m&&e&&e.length){for(a=0;a<m.length;a++)if(m[a]===e[0]){var J=a;break}else if(m[0]===e[e.length-m.length+a]){J=a;var I=!0;break}else if(m[m.length-1]===e[e.length-m.length+a]){J=m.length-a;break}"undefined"===typeof J&&(n=[])}if(n.length&&B(J)){var r=
f.length+J*C;I?(c(n,f),l(f,n)):(c(f,n),l(n,f))}return[n,f]};a.prototype.fillSetter=function(){a.prototype.strokeSetter.apply(this,arguments)};a.prototype.strokeSetter=function(){this.elem.attr(this.prop,v(this.start).tweenTo(v(this.end),this.pos),void 0,!0)};a.timers=[];return a}()});K(g,"Core/Animation/AnimationUtilities.js",[g["Core/Animation/Fx.js"],g["Core/Utilities.js"]],function(a,g){function v(c){return t(c)?n({duration:500,defer:0},c):{duration:c?500:0,defer:0}}function E(c,m){for(var e=a.timers.length;e--;)a.timers[e].elem!==
c||m&&m!==a.timers[e].prop||(a.timers[e].stopped=!0)}var D=g.defined,B=g.getStyle,G=g.isArray,r=g.isNumber,t=g.isObject,n=g.merge,f=g.objectEach,c=g.pick;return{animate:function(c,m,e){var u,l="",J,I;if(!t(e)){var g=arguments;e={duration:g[2],easing:g[3],complete:g[4]}}r(e.duration)||(e.duration=400);e.easing="function"===typeof e.easing?e.easing:Math[e.easing]||Math.easeInOutSine;e.curAnim=n(m);f(m,function(f,d){E(c,d);I=new a(c,e,d);J=void 0;"d"===d&&G(m.d)?(I.paths=I.initPath(c,c.pathArray,m.d),
I.toD=m.d,u=0,J=1):c.attr?u=c.attr(d):(u=parseFloat(B(c,d))||0,"opacity"!==d&&(l="px"));J||(J=f);"string"===typeof J&&J.match("px")&&(J=J.replace(/px/g,""));I.run(u,J,l)})},animObject:v,getDeferredAnimation:function(c,m,e){var u=v(m),f=0,l=0;(e?[e]:c.series).forEach(function(c){c=v(c.options.animation);f=m&&D(m.defer)?u.defer:Math.max(f,c.duration+c.defer);l=Math.min(u.duration,c.duration)});c.renderer.forExport&&(f=0);return{defer:Math.max(0,f-l),duration:Math.min(f,l)}},setAnimation:function(f,
m){m.renderer.globalAnimation=c(f,m.options.chart.animation,!0)},stop:E}});K(g,"Core/Renderer/HTML/AST.js",[g["Core/Globals.js"],g["Core/Utilities.js"]],function(a,g){var v=a.SVG_NS,E=g.attr,D=g.createElement,B=g.css,G=g.error,r=g.isFunction,t=g.isString,n=g.objectEach,f=g.splat,c=(g=a.win.trustedTypes)&&r(g.createPolicy)&&g.createPolicy("highcharts",{createHTML:function(c){return c}}),l=c?c.createHTML(""):"";try{var m=!!(new DOMParser).parseFromString(l,"text/html")}catch(e){m=!1}r=function(){function e(c){this.nodes=
"string"===typeof c?this.parseMarkup(c):c}e.filterUserAttributes=function(c){n(c,function(m,f){var u=!0;-1===e.allowedAttributes.indexOf(f)&&(u=!1);-1!==["background","dynsrc","href","lowsrc","src"].indexOf(f)&&(u=t(m)&&e.allowedReferences.some(function(c){return 0===m.indexOf(c)}));u||(G(33,!1,void 0,{"Invalid attribute in config":"".concat(f)}),delete c[f]);t(m)&&c[f]&&(c[f]=m.replace(/</g,"&lt;"))});return c};e.parseStyle=function(c){return c.split(";").reduce(function(c,e){e=e.split(":").map(function(c){return c.trim()});
var m=e.shift();m&&e.length&&(c[m.replace(/-([a-z])/g,function(c){return c[1].toUpperCase()})]=e.join(":"));return c},{})};e.setElementHTML=function(c,m){c.innerHTML=e.emptyHTML;m&&(new e(m)).addToDOM(c)};e.prototype.addToDOM=function(c){function m(c,u){var l;f(c).forEach(function(c){var d=c.tagName,q=c.textContent?a.doc.createTextNode(c.textContent):void 0,h=e.bypassHTMLFiltering;if(d)if("#text"===d)var k=q;else if(-1!==e.allowedTags.indexOf(d)||h){d=a.doc.createElementNS("svg"===d?v:u.namespaceURI||
v,d);var b=c.attributes||{};n(c,function(d,h){"tagName"!==h&&"attributes"!==h&&"children"!==h&&"style"!==h&&"textContent"!==h&&(b[h]=d)});E(d,h?b:e.filterUserAttributes(b));c.style&&B(d,c.style);q&&d.appendChild(q);m(c.children||[],d);k=d}else G(33,!1,void 0,{"Invalid tagName in config":d});k&&u.appendChild(k);l=k});return l}return m(this.nodes,c)};e.prototype.parseMarkup=function(f){var l=[];f=f.trim().replace(/ style=(["'])/g," data-style=$1");if(m)f=(new DOMParser).parseFromString(c?c.createHTML(f):
f,"text/html");else{var u=D("div");u.innerHTML=f;f={body:u}}var a=function(c,m){var d=c.nodeName.toLowerCase(),f={tagName:d};"#text"===d&&(f.textContent=c.textContent||"");if(d=c.attributes){var h={};[].forEach.call(d,function(b){"data-style"===b.name?f.style=e.parseStyle(b.value):h[b.name]=b.value});f.attributes=h}if(c.childNodes.length){var k=[];[].forEach.call(c.childNodes,function(b){a(b,k)});k.length&&(f.children=k)}m.push(f)};[].forEach.call(f.body.childNodes,function(c){return a(c,l)});return l};
e.allowedAttributes="aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align text-anchor textAnchor textLength title type valign width x x1 x2 xlink:href y y1 y2 zIndex".split(" ");
e.allowedReferences="https:// http:// mailto: / ../ ./ #".split(" ");e.allowedTags="a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text textPath thead title tbody tspan td th tr u ul #text".split(" ");e.emptyHTML=l;e.bypassHTMLFiltering=!1;return e}();
"";return r});K(g,"Core/FormatUtilities.js",[g["Core/Defaults.js"],g["Core/Utilities.js"]],function(a,g){function v(a,f,c,l){a=+a||0;f=+f;var m=E.lang,e=(a.toString().split(".")[1]||"").split("e")[0].length,u=a.toString().split("e"),C=f;if(-1===f)f=Math.min(e,20);else if(!G(f))f=2;else if(f&&u[1]&&0>u[1]){var g=f+ +u[1];0<=g?(u[0]=(+u[0]).toExponential(g).split("e")[0],f=g):(u[0]=u[0].split(".")[0]||0,a=20>f?(u[0]*Math.pow(10,u[1])).toFixed(f):0,u[1]=0)}g=(Math.abs(u[1]?u[0]:a)+Math.pow(10,-Math.max(f,
e)-1)).toFixed(f);e=String(t(g));var n=3<e.length?e.length%3:0;c=r(c,m.decimalPoint);l=r(l,m.thousandsSep);a=(0>a?"-":"")+(n?e.substr(0,n)+l:"");a=0>+u[1]&&!C?"0":a+e.substr(n).replace(/(\d{3})(?=\d)/g,"$1"+l);f&&(a+=c+g.slice(-f));u[1]&&0!==+a&&(a+="e"+u[1]);return a}var E=a.defaultOptions,D=a.defaultTime,B=g.getNestedProperty,G=g.isNumber,r=g.pick,t=g.pInt;return{dateFormat:function(a,f,c){return D.dateFormat(a,f,c)},format:function(a,f,c){var l="{",m=!1,e=/f$/,u=/\.([0-9])/,C=E.lang,g=c&&c.time||
D;c=c&&c.numberFormatter||v;for(var n=[];a;){var r=a.indexOf(l);if(-1===r)break;var A=a.slice(0,r);if(m){A=A.split(":");l=B(A.shift()||"",f);if(A.length&&"number"===typeof l)if(A=A.join(":"),e.test(A)){var d=parseInt((A.match(u)||["","-1"])[1],10);null!==l&&(l=c(l,d,C.decimalPoint,-1<A.indexOf(",")?C.thousandsSep:""))}else l=g.dateFormat(A,l);n.push(l)}else n.push(A);a=a.slice(r+1);l=(m=!m)?"}":"{"}n.push(a);return n.join("")},numberFormat:v}});K(g,"Core/Renderer/RendererUtilities.js",[g["Core/Utilities.js"]],
function(a){var g=a.clamp,x=a.pick,E=a.stableSort,D;(function(a){function v(a,t,n){var f=a,c=f.reducedLen||t,l=function(c,e){return(e.rank||0)-(c.rank||0)},m=function(c,e){return c.target-e.target},e,u=!0,C=[],J=0;for(e=a.length;e--;)J+=a[e].size;if(J>c){E(a,l);for(J=e=0;J<=c;)J+=a[e].size,e++;C=a.splice(e-1,a.length)}E(a,m);for(a=a.map(function(c){return{size:c.size,targets:[c.target],align:x(c.align,.5)}});u;){for(e=a.length;e--;)c=a[e],l=(Math.min.apply(0,c.targets)+Math.max.apply(0,c.targets))/
2,c.pos=g(l-c.size*c.align,0,t-c.size);e=a.length;for(u=!1;e--;)0<e&&a[e-1].pos+a[e-1].size>a[e].pos&&(a[e-1].size+=a[e].size,a[e-1].targets=a[e-1].targets.concat(a[e].targets),a[e-1].align=.5,a[e-1].pos+a[e-1].size>t&&(a[e-1].pos=t-a[e-1].size),a.splice(e,1),u=!0)}f.push.apply(f,C);e=0;a.some(function(c){var m=0;return(c.targets||[]).some(function(){f[e].pos=c.pos+m;if("undefined"!==typeof n&&Math.abs(f[e].pos-f[e].target)>n)return f.slice(0,e+1).forEach(function(c){return delete c.pos}),f.reducedLen=
(f.reducedLen||t)-.1*t,f.reducedLen>.1*t&&v(f,t,n),!0;m+=f[e].size;e++;return!1})});E(f,m);return f}a.distribute=v})(D||(D={}));return D});K(g,"Core/Renderer/SVG/SVGElement.js",[g["Core/Animation/AnimationUtilities.js"],g["Core/Color/Color.js"],g["Core/Globals.js"],g["Core/Utilities.js"]],function(a,g,x,E){var v=a.animate,B=a.animObject,G=a.stop,r=x.deg2rad,t=x.doc,n=x.svg,f=x.SVG_NS,c=x.win,l=E.addEvent,m=E.attr,e=E.createElement,u=E.css,C=E.defined,J=E.erase,I=E.extend,L=E.fireEvent,A=E.isArray,
d=E.isFunction,q=E.isString,h=E.merge,k=E.objectEach,b=E.pick,p=E.pInt,z=E.syncTimeout,w=E.uniqueKey;a=function(){function a(){this.element=void 0;this.onEvents={};this.opacity=1;this.renderer=void 0;this.SVG_NS=f;this.symbolCustomAttribs="x y width height r start end innerR anchorX anchorY rounded".split(" ")}a.prototype._defaultGetter=function(d){d=b(this[d+"Value"],this[d],this.element?this.element.getAttribute(d):null,0);/^[\-0-9\.]+$/.test(d)&&(d=parseFloat(d));return d};a.prototype._defaultSetter=
function(b,d,h){h.setAttribute(d,b)};a.prototype.add=function(b){var d=this.renderer,h=this.element;b&&(this.parentGroup=b);"undefined"!==typeof this.textStr&&"text"===this.element.nodeName&&d.buildText(this);this.added=!0;if(!b||b.handleZ||this.zIndex)var c=this.zIndexSetter();c||(b?b.element:d.box).appendChild(h);if(this.onAdd)this.onAdd();return this};a.prototype.addClass=function(b,d){var h=d?"":this.attr("class")||"";b=(b||"").split(/ /g).reduce(function(b,d){-1===h.indexOf(d)&&b.push(d);return b},
h?[h]:[]).join(" ");b!==h&&this.attr("class",b);return this};a.prototype.afterSetters=function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)};a.prototype.align=function(d,h,c){var k={},e=this.renderer,y=e.alignedObjects,p,H,a;if(d){if(this.alignOptions=d,this.alignByTranslate=h,!c||q(c))this.alignTo=p=c||"renderer",J(y,this),y.push(this),c=void 0}else d=this.alignOptions,h=this.alignByTranslate,p=this.alignTo;c=b(c,e[p],"scrollablePlotBox"===p?e.plotBox:void 0,e);p=d.align;var w=
d.verticalAlign;e=(c.x||0)+(d.x||0);y=(c.y||0)+(d.y||0);"right"===p?H=1:"center"===p&&(H=2);H&&(e+=(c.width-(d.width||0))/H);k[h?"translateX":"x"]=Math.round(e);"bottom"===w?a=1:"middle"===w&&(a=2);a&&(y+=(c.height-(d.height||0))/a);k[h?"translateY":"y"]=Math.round(y);this[this.placed?"animate":"attr"](k);this.placed=!0;this.alignAttr=k;return this};a.prototype.alignSetter=function(b){var d={left:"start",center:"middle",right:"end"};d[b]&&(this.alignValue=b,this.element.setAttribute("text-anchor",
d[b]))};a.prototype.animate=function(d,h,c){var e=this,p=B(b(h,this.renderer.globalAnimation,!0));h=p.defer;b(t.hidden,t.msHidden,t.webkitHidden,!1)&&(p.duration=0);0!==p.duration?(c&&(p.complete=c),z(function(){e.element&&v(e,d,p)},h)):(this.attr(d,void 0,c||p.complete),k(d,function(b,d){p.step&&p.step.call(this,b,{prop:d,pos:1,elem:this})},this));return this};a.prototype.applyTextOutline=function(b){var d=this.element;-1!==b.indexOf("contrast")&&(b=b.replace(/contrast/g,this.renderer.getContrast(d.style.fill)));
var h=b.split(" ");b=h[h.length-1];if((h=h[0])&&"none"!==h&&x.svg){this.fakeTS=!0;h=h.replace(/(^[\d\.]+)(.*?)$/g,function(b,d,h){return 2*Number(d)+h});this.removeTextOutline();var c=t.createElementNS(f,"tspan");m(c,{"class":"highcharts-text-outline",fill:b,stroke:b,"stroke-width":h,"stroke-linejoin":"round"});b=d.querySelector("textPath")||d;[].forEach.call(b.childNodes,function(b){var d=b.cloneNode(!0);d.removeAttribute&&["fill","stroke","stroke-width","stroke"].forEach(function(b){return d.removeAttribute(b)});
c.appendChild(d)});var k=0;[].forEach.call(b.querySelectorAll("text tspan"),function(b){k+=Number(b.getAttribute("dy"))});h=t.createElementNS(f,"tspan");h.textContent="\u200b";m(h,{x:Number(d.getAttribute("x")),dy:-k});c.appendChild(h);b.insertBefore(c,b.firstChild)}};a.prototype.attr=function(b,d,h,c){var p=this.element,y=this.symbolCustomAttribs,e,a=this,w,H;if("string"===typeof b&&"undefined"!==typeof d){var F=b;b={};b[F]=d}"string"===typeof b?a=(this[b+"Getter"]||this._defaultGetter).call(this,
b,p):(k(b,function(d,h){w=!1;c||G(this,h);this.symbolName&&-1!==y.indexOf(h)&&(e||(this.symbolAttr(b),e=!0),w=!0);!this.rotation||"x"!==h&&"y"!==h||(this.doTransform=!0);w||(H=this[h+"Setter"]||this._defaultSetter,H.call(this,d,h,p),!this.styledMode&&this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(h)&&this.updateShadows(h,d,H))},this),this.afterSetters());h&&h.call(this);return a};a.prototype.clip=function(b){return this.attr("clip-path",b?"url("+this.renderer.url+"#"+b.id+
")":"none")};a.prototype.crisp=function(b,d){d=d||b.strokeWidth||0;var h=Math.round(d)%2/2;b.x=Math.floor(b.x||this.x||0)+h;b.y=Math.floor(b.y||this.y||0)+h;b.width=Math.floor((b.width||this.width||0)-2*h);b.height=Math.floor((b.height||this.height||0)-2*h);C(b.strokeWidth)&&(b.strokeWidth=d);return b};a.prototype.complexColor=function(b,d,c){var p=this.renderer,e,y,a,m,f,H,F,z,M,q,l=[],u;L(this.renderer,"complexColor",{args:arguments},function(){b.radialGradient?y="radialGradient":b.linearGradient&&
(y="linearGradient");if(y){a=b[y];f=p.gradients;H=b.stops;M=c.radialReference;A(a)&&(b[y]=a={x1:a[0],y1:a[1],x2:a[2],y2:a[3],gradientUnits:"userSpaceOnUse"});"radialGradient"===y&&M&&!C(a.gradientUnits)&&(m=a,a=h(a,p.getRadialAttr(M,m),{gradientUnits:"userSpaceOnUse"}));k(a,function(b,d){"id"!==d&&l.push(d,b)});k(H,function(b){l.push(b)});l=l.join(",");if(f[l])q=f[l].attr("id");else{a.id=q=w();var T=f[l]=p.createElement(y).attr(a).add(p.defs);T.radAttr=m;T.stops=[];H.forEach(function(b){0===b[1].indexOf("rgba")?
(e=g.parse(b[1]),F=e.get("rgb"),z=e.get("a")):(F=b[1],z=1);b=p.createElement("stop").attr({offset:b[0],"stop-color":F,"stop-opacity":z}).add(T);T.stops.push(b)})}u="url("+p.url+"#"+q+")";c.setAttribute(d,u);c.gradient=l;b.toString=function(){return u}}})};a.prototype.css=function(b){var d=this.styles,c={},e=this.element,a=!d;b.color&&(b.fill=b.color);d&&k(b,function(b,h){d&&d[h]!==b&&(c[h]=b,a=!0)});if(a){d&&(b=I(d,c));if(null===b.width||"auto"===b.width)delete this.textWidth;else if("text"===e.nodeName.toLowerCase()&&
b.width)var y=this.textWidth=p(b.width);this.styles=b;y&&!n&&this.renderer.forExport&&delete b.width;var w=h(b);e.namespaceURI===this.SVG_NS&&["textOutline","textOverflow","width"].forEach(function(b){return w&&delete w[b]});u(e,w);this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),b.textOutline&&this.applyTextOutline(b.textOutline))}return this};a.prototype.dashstyleSetter=function(d){var h=this["stroke-width"];"inherit"===h&&(h=1);if(d=d&&d.toLowerCase()){var c=d.replace("shortdashdotdot",
"3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(d=c.length;d--;)c[d]=""+p(c[d])*b(h,NaN);d=c.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",d)}};a.prototype.destroy=function(){var b=this,d=b.element||{},h=b.renderer,c=d.ownerSVGElement,p=h.isSVG&&"SPAN"===d.nodeName&&b.parentGroup||void 0;d.onclick=d.onmouseout=
d.onmouseover=d.onmousemove=d.point=null;G(b);if(b.clipPath&&c){var y=b.clipPath;[].forEach.call(c.querySelectorAll("[clip-path],[CLIP-PATH]"),function(b){-1<b.getAttribute("clip-path").indexOf(y.element.id)&&b.removeAttribute("clip-path")});b.clipPath=y.destroy()}if(b.stops){for(c=0;c<b.stops.length;c++)b.stops[c].destroy();b.stops.length=0;b.stops=void 0}b.safeRemoveChild(d);for(h.styledMode||b.destroyShadows();p&&p.div&&0===p.div.childNodes.length;)d=p.parentGroup,b.safeRemoveChild(p.div),delete p.div,
p=d;b.alignTo&&J(h.alignedObjects,b);k(b,function(d,h){b[h]&&b[h].parentGroup===b&&b[h].destroy&&b[h].destroy();delete b[h]})};a.prototype.destroyShadows=function(){(this.shadows||[]).forEach(function(b){this.safeRemoveChild(b)},this);this.shadows=void 0};a.prototype.dSetter=function(b,d,h){A(b)&&("string"===typeof b[0]&&(b=this.renderer.pathToSegments(b)),this.pathArray=b,b=b.reduce(function(b,d,h){return d&&d.join?(h?b+" ":"")+d.join(" "):(d||"").toString()},""));/(NaN| {2}|^$)/.test(b)&&(b="M 0 0");
this[d]!==b&&(h.setAttribute(d,b),this[d]=b)};a.prototype.fadeOut=function(d){var h=this;h.animate({opacity:0},{duration:b(d,150),complete:function(){h.hide()}})};a.prototype.fillSetter=function(b,d,h){"string"===typeof b?h.setAttribute(d,b):b&&this.complexColor(b,d,h)};a.prototype.getBBox=function(h,c){var k=this.alignValue,p=this.element,e=this.renderer,y=this.styles,w=this.textStr,m=e.cache,f=e.cacheKeys,z=p.namespaceURI===this.SVG_NS;c=b(c,this.rotation,0);var F=e.styledMode?p&&a.prototype.getStyle.call(p,
"font-size"):y&&y.fontSize,q;if(C(w)){var M=w.toString();-1===M.indexOf("<")&&(M=M.replace(/[0-9]/g,"0"));M+=["",c,F,this.textWidth,k,y&&y.textOverflow,y&&y.fontWeight].join()}M&&!h&&(q=m[M]);if(!q){if(z||e.forExport){try{var l=this.fakeTS&&function(b){var d=p.querySelector(".highcharts-text-outline");d&&u(d,{display:b})};d(l)&&l("none");q=p.getBBox?I({},p.getBBox()):{width:p.offsetWidth,height:p.offsetHeight,x:0,y:0};d(l)&&l("")}catch(U){""}if(!q||0>q.width)q={x:0,y:0,width:0,height:0}}else q=this.htmlGetBBox();
if(e.isSVG&&(e=q.width,h=q.height,z&&(q.height=h={"11px,17":14,"13px,20":16}[""+(F||"")+",".concat(Math.round(h))]||h),c)){z=Number(p.getAttribute("y")||0)-q.y;k={right:1,center:.5}[k||0]||0;y=c*r;F=(c-90)*r;var H=e*Math.cos(y);c=e*Math.sin(y);l=Math.cos(F);y=Math.sin(F);e=q.x+k*(e-H)+z*l;F=e+H;l=F-h*l;H=l-H;z=q.y+z-k*c+z*y;k=z+c;h=k-h*y;c=h-c;q.x=Math.min(e,F,l,H);q.y=Math.min(z,k,h,c);q.width=Math.max(e,F,l,H)-q.x;q.height=Math.max(z,k,h,c)-q.y}if(M&&(""===w||0<q.height)){for(;250<f.length;)delete m[f.shift()];
m[M]||f.push(M);m[M]=q}}return q};a.prototype.getStyle=function(b){return c.getComputedStyle(this.element||this,"").getPropertyValue(b)};a.prototype.hasClass=function(b){return-1!==(""+this.attr("class")).split(" ").indexOf(b)};a.prototype.hide=function(){return this.attr({visibility:"hidden"})};a.prototype.htmlGetBBox=function(){return{height:0,width:0,x:0,y:0}};a.prototype.init=function(b,d){this.element="span"===d?e(d):t.createElementNS(this.SVG_NS,d);this.renderer=b;L(this,"afterInit")};a.prototype.on=
function(b,d){var h=this.onEvents;if(h[b])h[b]();h[b]=l(this.element,b,d);return this};a.prototype.opacitySetter=function(b,d,h){this.opacity=b=Number(Number(b).toFixed(3));h.setAttribute(d,b)};a.prototype.removeClass=function(b){return this.attr("class",(""+this.attr("class")).replace(q(b)?new RegExp("(^| )".concat(b,"( |$)")):b," ").replace(/ +/g," ").trim())};a.prototype.removeTextOutline=function(){var b=this.element.querySelector("tspan.highcharts-text-outline");b&&this.safeRemoveChild(b)};a.prototype.safeRemoveChild=
function(b){var d=b.parentNode;d&&d.removeChild(b)};a.prototype.setRadialReference=function(b){var d=this.element.gradient&&this.renderer.gradients[this.element.gradient];this.element.radialReference=b;d&&d.radAttr&&d.animate(this.renderer.getRadialAttr(b,d.radAttr));return this};a.prototype.setTextPath=function(b,d){var c=this;d=h(!0,{enabled:!0,attributes:{dy:-5,startOffset:"50%",textAnchor:"middle"}},d);var k=this.renderer.url,p=this.text||this,y=p.textPath,e=d.attributes,a=d.enabled;b=b||y&&y.path;
y&&y.undo();b&&a?(d=l(p,"afterModifyTree",function(d){if(b&&a){var h=b.attr("id");h||b.attr("id",h=w());var y={x:0,y:0};C(e.dx)&&(y.dx=e.dx,delete e.dx);C(e.dy)&&(y.dy=e.dy,delete e.dy);p.attr(y);c.attr({transform:""});c.box&&(c.box=c.box.destroy());y=d.nodes.slice(0);d.nodes.length=0;d.nodes[0]={tagName:"textPath",attributes:I(e,{"text-anchor":e.textAnchor,href:""+k+"#".concat(h)}),children:y}}}),p.textPath={path:b,undo:d}):(p.attr({dx:0,dy:0}),delete p.textPath);this.added&&(p.textCache="",this.renderer.buildText(p));
return this};a.prototype.shadow=function(b,d,h){var c=[],p=this.element,y=this.oldShadowOptions,e=this.parentGroup,a=e&&90===e.rotation;e={color:"#000000",offsetX:a?-1:1,offsetY:a?-1:1,opacity:.15,width:3};var w=!1,q;!0===b?q=e:"object"===typeof b&&(q=I(e,b));q&&(q&&y&&k(q,function(b,d){b!==y[d]&&(w=!0)}),w&&this.destroyShadows(),this.oldShadowOptions=q);if(!q)this.destroyShadows();else if(!this.shadows){e=q.opacity/q.width;var F=a?"translate(".concat(q.offsetY,", ").concat(q.offsetX,")"):"translate(".concat(q.offsetX,
", ").concat(q.offsetY,")");for(a=1;a<=q.width;a++){var f=p.cloneNode(!1);var z=2*q.width+1-2*a;m(f,{stroke:b.color||"#000000","stroke-opacity":e*a,"stroke-width":z,transform:F,fill:"none"});f.setAttribute("class",(f.getAttribute("class")||"")+" highcharts-shadow");h&&(m(f,"height",Math.max(m(f,"height")-z,0)),f.cutHeight=z);d?d.element.appendChild(f):p.parentNode&&p.parentNode.insertBefore(f,p);c.push(f)}this.shadows=c}return this};a.prototype.show=function(b){void 0===b&&(b=!0);return this.attr({visibility:b?
"inherit":"visible"})};a.prototype["stroke-widthSetter"]=function(b,d,h){this[d]=b;h.setAttribute(d,b)};a.prototype.strokeWidth=function(){if(!this.renderer.styledMode)return this["stroke-width"]||0;var b=this.getStyle("stroke-width"),d=0;if(b.indexOf("px")===b.length-2)d=p(b);else if(""!==b){var h=t.createElementNS(f,"rect");m(h,{width:b,"stroke-width":0});this.element.parentNode.appendChild(h);d=h.getBBox().width;h.parentNode.removeChild(h)}return d};a.prototype.symbolAttr=function(d){var h=this;
"x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(c){h[c]=b(d[c],h[c])});h.attr({d:h.renderer.symbols[h.symbolName](h.x,h.y,h.width,h.height,h)})};a.prototype.textSetter=function(b){b!==this.textStr&&(delete this.textPxLength,this.textStr=b,this.added&&this.renderer.buildText(this))};a.prototype.titleSetter=function(d){var h=this.element,c=h.getElementsByTagName("title")[0]||t.createElementNS(this.SVG_NS,"title");h.insertBefore?h.insertBefore(c,h.firstChild):
h.appendChild(c);c.textContent=String(b(d,"")).replace(/<[^>]*>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">")};a.prototype.toFront=function(){var b=this.element;b.parentNode.appendChild(b);return this};a.prototype.translate=function(b,d){return this.attr({translateX:b,translateY:d})};a.prototype.updateShadows=function(b,d,h){var c=this.shadows;if(c)for(var k=c.length;k--;)h.call(c[k],"height"===b?Math.max(d-(c[k].cutHeight||0),0):"d"===b?this.d:d,b,c[k])};a.prototype.updateTransform=function(){var d=
this.element,h=this.matrix,c=this.rotation;c=void 0===c?0:c;var k=this.scaleX,p=this.scaleY,y=this.translateX,e=this.translateY;y=["translate("+(void 0===y?0:y)+","+(void 0===e?0:e)+")"];C(h)&&y.push("matrix("+h.join(",")+")");c&&y.push("rotate("+c+" "+b(this.rotationOriginX,d.getAttribute("x"),0)+" "+b(this.rotationOriginY,d.getAttribute("y")||0)+")");(C(k)||C(p))&&y.push("scale("+b(k,1)+" "+b(p,1)+")");y.length&&!(this.text||this).textPath&&d.setAttribute("transform",y.join(" "))};a.prototype.visibilitySetter=
function(b,d,h){"inherit"===b?h.removeAttribute(d):this[d]!==b&&h.setAttribute(d,b);this[d]=b};a.prototype.xGetter=function(b){"circle"===this.element.nodeName&&("x"===b?b="cx":"y"===b&&(b="cy"));return this._defaultGetter(b)};a.prototype.zIndexSetter=function(b,d){var h=this.renderer,c=this.parentGroup,k=(c||h).element||h.box,y=this.element;h=k===h.box;var e=!1;var a=this.added;var w;C(b)?(y.setAttribute("data-z-index",b),b=+b,this[d]===b&&(a=!1)):C(this[d])&&y.removeAttribute("data-z-index");this[d]=
b;if(a){(b=this.zIndex)&&c&&(c.handleZ=!0);d=k.childNodes;for(w=d.length-1;0<=w&&!e;w--){c=d[w];a=c.getAttribute("data-z-index");var q=!C(a);if(c!==y)if(0>b&&q&&!h&&!w)k.insertBefore(y,d[w]),e=!0;else if(p(a)<=b||q&&(!C(b)||0<=b))k.insertBefore(y,d[w+1]||null),e=!0}e||(k.insertBefore(y,d[h?3:0]||null),e=!0)}return e};return a}();a.prototype.strokeSetter=a.prototype.fillSetter;a.prototype.yGetter=a.prototype.xGetter;a.prototype.matrixSetter=a.prototype.rotationOriginXSetter=a.prototype.rotationOriginYSetter=
a.prototype.rotationSetter=a.prototype.scaleXSetter=a.prototype.scaleYSetter=a.prototype.translateXSetter=a.prototype.translateYSetter=a.prototype.verticalAlignSetter=function(b,d){this[d]=b;this.doTransform=!0};"";return a});K(g,"Core/Renderer/RendererRegistry.js",[g["Core/Globals.js"]],function(a){var g;(function(g){g.rendererTypes={};var v;g.getRendererType=function(a){void 0===a&&(a=v);return g.rendererTypes[a]||g.rendererTypes[v]};g.registerRendererType=function(x,B,E){g.rendererTypes[x]=B;if(!v||
E)v=x,a.Renderer=B}})(g||(g={}));return g});K(g,"Core/Renderer/SVG/SVGLabel.js",[g["Core/Renderer/SVG/SVGElement.js"],g["Core/Utilities.js"]],function(a,g){var v=this&&this.__extends||function(){var a=function(f,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,a){c.__proto__=a}||function(c,a){for(var e in a)a.hasOwnProperty(e)&&(c[e]=a[e])};return a(f,c)};return function(f,c){function l(){this.constructor=f}a(f,c);f.prototype=null===c?Object.create(c):(l.prototype=c.prototype,
new l)}}(),E=g.defined,D=g.extend,B=g.isNumber,G=g.merge,r=g.pick,t=g.removeEvent;return function(g){function f(c,a,m,e,u,C,n,I,r,A){var d=g.call(this)||this;d.paddingLeftSetter=d.paddingSetter;d.paddingRightSetter=d.paddingSetter;d.init(c,"g");d.textStr=a;d.x=m;d.y=e;d.anchorX=C;d.anchorY=n;d.baseline=r;d.className=A;d.addClass("button"===A?"highcharts-no-tooltip":"highcharts-label");A&&d.addClass("highcharts-"+A);d.text=c.text(void 0,0,0,I).attr({zIndex:1});var q;"string"===typeof u&&((q=/^url\((.*?)\)$/.test(u))||
d.renderer.symbols[u])&&(d.symbolKey=u);d.bBox=f.emptyBBox;d.padding=3;d.baselineOffset=0;d.needsBox=c.styledMode||q;d.deferredAttr={};d.alignFactor=0;return d}v(f,g);f.prototype.alignSetter=function(c){c={left:0,center:.5,right:1}[c];c!==this.alignFactor&&(this.alignFactor=c,this.bBox&&B(this.xSetting)&&this.attr({x:this.xSetting}))};f.prototype.anchorXSetter=function(c,a){this.anchorX=c;this.boxAttr(a,Math.round(c)-this.getCrispAdjust()-this.xSetting)};f.prototype.anchorYSetter=function(c,a){this.anchorY=
c;this.boxAttr(a,c-this.ySetting)};f.prototype.boxAttr=function(c,a){this.box?this.box.attr(c,a):this.deferredAttr[c]=a};f.prototype.css=function(c){if(c){var l={};c=G(c);f.textProps.forEach(function(e){"undefined"!==typeof c[e]&&(l[e]=c[e],delete c[e])});this.text.css(l);var m="width"in l;"fontSize"in l||"fontWeight"in l?this.updateTextPadding():m&&this.updateBoxSize()}return a.prototype.css.call(this,c)};f.prototype.destroy=function(){t(this.element,"mouseenter");t(this.element,"mouseleave");this.text&&
this.text.destroy();this.box&&(this.box=this.box.destroy());a.prototype.destroy.call(this)};f.prototype.fillSetter=function(c,a){c&&(this.needsBox=!0);this.fill=c;this.boxAttr(a,c)};f.prototype.getBBox=function(){this.textStr&&0===this.bBox.width&&0===this.bBox.height&&this.updateBoxSize();var c=this.padding,a=r(this.paddingLeft,c);return{width:this.width,height:this.height,x:this.bBox.x-a,y:this.bBox.y-c}};f.prototype.getCrispAdjust=function(){return this.renderer.styledMode&&this.box?this.box.strokeWidth()%
2/2:(this["stroke-width"]?parseInt(this["stroke-width"],10):0)%2/2};f.prototype.heightSetter=function(c){this.heightSetting=c};f.prototype.onAdd=function(){this.text.add(this);this.attr({text:r(this.textStr,""),x:this.x||0,y:this.y||0});this.box&&E(this.anchorX)&&this.attr({anchorX:this.anchorX,anchorY:this.anchorY})};f.prototype.paddingSetter=function(c,a){B(c)?c!==this[a]&&(this[a]=c,this.updateTextPadding()):this[a]=void 0};f.prototype.rSetter=function(c,a){this.boxAttr(a,c)};f.prototype.shadow=
function(c){c&&!this.renderer.styledMode&&(this.updateBoxSize(),this.box&&this.box.shadow(c));return this};f.prototype.strokeSetter=function(c,a){this.stroke=c;this.boxAttr(a,c)};f.prototype["stroke-widthSetter"]=function(c,a){c&&(this.needsBox=!0);this["stroke-width"]=c;this.boxAttr(a,c)};f.prototype["text-alignSetter"]=function(c){this.textAlign=c};f.prototype.textSetter=function(c){"undefined"!==typeof c&&this.text.attr({text:c});this.updateTextPadding()};f.prototype.updateBoxSize=function(){var c=
this.text,a=c.element.style,m={},e=this.padding,u=this.bBox=B(this.widthSetting)&&B(this.heightSetting)&&!this.textAlign||!E(c.textStr)?f.emptyBBox:c.getBBox();this.width=this.getPaddedWidth();this.height=(this.heightSetting||u.height||0)+2*e;a=this.renderer.fontMetrics(a&&a.fontSize,c);this.baselineOffset=e+Math.min((this.text.firstLineMetrics||a).b,u.height||Infinity);this.heightSetting&&(this.baselineOffset+=(this.heightSetting-a.h)/2);this.needsBox&&!c.textPath&&(this.box||(c=this.box=this.symbolKey?
this.renderer.symbol(this.symbolKey):this.renderer.rect(),c.addClass(("button"===this.className?"":"highcharts-label-box")+(this.className?" highcharts-"+this.className+"-box":"")),c.add(this)),c=this.getCrispAdjust(),m.x=c,m.y=(this.baseline?-this.baselineOffset:0)+c,m.width=Math.round(this.width),m.height=Math.round(this.height),this.box.attr(D(m,this.deferredAttr)),this.deferredAttr={})};f.prototype.updateTextPadding=function(){var c=this.text;if(!c.textPath){this.updateBoxSize();var a=this.baseline?
0:this.baselineOffset,f=r(this.paddingLeft,this.padding);E(this.widthSetting)&&this.bBox&&("center"===this.textAlign||"right"===this.textAlign)&&(f+={center:.5,right:1}[this.textAlign]*(this.widthSetting-this.bBox.width));if(f!==c.x||a!==c.y)c.attr("x",f),c.hasBoxWidthChanged&&(this.bBox=c.getBBox(!0)),"undefined"!==typeof a&&c.attr("y",a);c.x=f;c.y=a}};f.prototype.widthSetter=function(c){this.widthSetting=B(c)?c:void 0};f.prototype.getPaddedWidth=function(){var c=this.padding,a=r(this.paddingLeft,
c);c=r(this.paddingRight,c);return(this.widthSetting||this.bBox.width||0)+a+c};f.prototype.xSetter=function(c){this.x=c;this.alignFactor&&(c-=this.alignFactor*this.getPaddedWidth(),this["forceAnimate:x"]=!0);this.xSetting=Math.round(c);this.attr("translateX",this.xSetting)};f.prototype.ySetter=function(c){this.ySetting=this.y=Math.round(c);this.attr("translateY",this.ySetting)};f.emptyBBox={width:0,height:0,x:0,y:0};f.textProps="color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
return f}(a)});K(g,"Core/Renderer/SVG/Symbols.js",[g["Core/Utilities.js"]],function(a){function g(a,g,n,f,c){var l=[];if(c){var m=c.start||0,e=G(c.r,n);n=G(c.r,f||n);var u=(c.end||0)-.001;f=c.innerR;var C=G(c.open,.001>Math.abs((c.end||0)-m-2*Math.PI)),J=Math.cos(m),I=Math.sin(m),r=Math.cos(u),A=Math.sin(u);m=G(c.longArc,.001>u-m-Math.PI?0:1);l.push(["M",a+e*J,g+n*I],["A",e,n,0,m,G(c.clockwise,1),a+e*r,g+n*A]);D(f)&&l.push(C?["M",a+f*r,g+f*A]:["L",a+f*r,g+f*A],["A",f,f,0,m,D(c.clockwise)?1-c.clockwise:
0,a+f*J,g+f*I]);C||l.push(["Z"])}return l}function x(a,g,n,f,c){return c&&c.r?E(a,g,n,f,c):[["M",a,g],["L",a+n,g],["L",a+n,g+f],["L",a,g+f],["Z"]]}function E(a,g,n,f,c){c=c&&c.r||0;return[["M",a+c,g],["L",a+n-c,g],["C",a+n,g,a+n,g,a+n,g+c],["L",a+n,g+f-c],["C",a+n,g+f,a+n,g+f,a+n-c,g+f],["L",a+c,g+f],["C",a,g+f,a,g+f,a,g+f-c],["L",a,g+c],["C",a,g,a,g,a+c,g]]}var D=a.defined,B=a.isNumber,G=a.pick;return{arc:g,callout:function(a,g,n,f,c){var l=Math.min(c&&c.r||0,n,f),m=l+6,e=c&&c.anchorX;c=c&&c.anchorY||
0;var u=E(a,g,n,f,{r:l});if(!B(e))return u;a+e>=n?c>g+m&&c<g+f-m?u.splice(3,1,["L",a+n,c-6],["L",a+n+6,c],["L",a+n,c+6],["L",a+n,g+f-l]):u.splice(3,1,["L",a+n,f/2],["L",e,c],["L",a+n,f/2],["L",a+n,g+f-l]):0>=a+e?c>g+m&&c<g+f-m?u.splice(7,1,["L",a,c+6],["L",a-6,c],["L",a,c-6],["L",a,g+l]):u.splice(7,1,["L",a,f/2],["L",e,c],["L",a,f/2],["L",a,g+l]):c&&c>f&&e>a+m&&e<a+n-m?u.splice(5,1,["L",e+6,g+f],["L",e,g+f+6],["L",e-6,g+f],["L",a+l,g+f]):c&&0>c&&e>a+m&&e<a+n-m&&u.splice(1,1,["L",e-6,g],["L",e,g-6],
["L",e+6,g],["L",n-l,g]);return u},circle:function(a,t,n,f){return g(a+n/2,t+f/2,n/2,f/2,{start:.5*Math.PI,end:2.5*Math.PI,open:!1})},diamond:function(a,g,n,f){return[["M",a+n/2,g],["L",a+n,g+f/2],["L",a+n/2,g+f],["L",a,g+f/2],["Z"]]},rect:x,roundedRect:E,square:x,triangle:function(a,g,n,f){return[["M",a+n/2,g],["L",a+n,g+f],["L",a,g+f],["Z"]]},"triangle-down":function(a,g,n,f){return[["M",a,g],["L",a+n,g],["L",a+n/2,g+f],["Z"]]}}});K(g,"Core/Renderer/SVG/TextBuilder.js",[g["Core/Renderer/HTML/AST.js"],
g["Core/Globals.js"],g["Core/Utilities.js"]],function(a,g,x){var v=g.doc,D=g.SVG_NS,B=g.win,G=x.attr,r=x.extend,t=x.fireEvent,n=x.isString,f=x.objectEach,c=x.pick;return function(){function l(c){var a=c.styles;this.renderer=c.renderer;this.svgElement=c;this.width=c.textWidth;this.textLineHeight=a&&a.lineHeight;this.textOutline=a&&a.textOutline;this.ellipsis=!(!a||"ellipsis"!==a.textOverflow);this.noWrap=!(!a||"nowrap"!==a.whiteSpace);this.fontSize=a&&a.fontSize}l.prototype.buildSVG=function(){var f=
this.svgElement,e=f.element,u=f.renderer,l=c(f.textStr,"").toString(),g=-1!==l.indexOf("<"),I=e.childNodes;u=this.width&&!f.added&&u.box;var L=/<br.*?>/g,A=[l,this.ellipsis,this.noWrap,this.textLineHeight,this.textOutline,this.fontSize,this.width].join();if(A!==f.textCache){f.textCache=A;delete f.actualWidth;for(A=I.length;A--;)e.removeChild(I[A]);g||this.ellipsis||this.width||f.textPath||-1!==l.indexOf(" ")&&(!this.noWrap||L.test(l))?""!==l&&(u&&u.appendChild(e),l=new a(l),this.modifyTree(l.nodes),
l.addToDOM(e),this.modifyDOM(),this.ellipsis&&-1!==(e.textContent||"").indexOf("\u2026")&&f.attr("title",this.unescapeEntities(f.textStr||"",["&lt;","&gt;"])),u&&u.removeChild(e)):e.appendChild(v.createTextNode(this.unescapeEntities(l)));n(this.textOutline)&&f.applyTextOutline&&f.applyTextOutline(this.textOutline)}};l.prototype.modifyDOM=function(){var c=this,a=this.svgElement,f=G(a.element,"x");a.firstLineMetrics=void 0;for(var l;l=a.element.firstChild;)if(/^[\s\u200B]*$/.test(l.textContent||" "))a.element.removeChild(l);
else break;[].forEach.call(a.element.querySelectorAll("tspan.highcharts-br"),function(e,d){e.nextSibling&&e.previousSibling&&(0===d&&1===e.previousSibling.nodeType&&(a.firstLineMetrics=a.renderer.fontMetrics(void 0,e.previousSibling)),G(e,{dy:c.getLineHeight(e.nextSibling),x:f}))});var g=this.width||0;if(g){var n=function(e,d){var q=e.textContent||"",h=q.replace(/([^\^])-/g,"$1- ").split(" "),k=!c.noWrap&&(1<h.length||1<a.element.childNodes.length),b=c.getLineHeight(d),p=0,z=a.actualWidth;if(c.ellipsis)q&&
c.truncate(e,q,void 0,0,Math.max(0,g-parseInt(c.fontSize||12,10)),function(b,d){return b.substring(0,d)+"\u2026"});else if(k){q=[];for(k=[];d.firstChild&&d.firstChild!==e;)k.push(d.firstChild),d.removeChild(d.firstChild);for(;h.length;)h.length&&!c.noWrap&&0<p&&(q.push(e.textContent||""),e.textContent=h.join(" ").replace(/- /g,"-")),c.truncate(e,void 0,h,0===p?z||0:0,g,function(b,d){return h.slice(0,d).join(" ").replace(/- /g,"-")}),z=a.actualWidth,p++;k.forEach(function(b){d.insertBefore(b,e)});
q.forEach(function(h){d.insertBefore(v.createTextNode(h),e);h=v.createElementNS(D,"tspan");h.textContent="\u200b";G(h,{dy:b,x:f});d.insertBefore(h,e)})}},L=function(c){[].slice.call(c.childNodes).forEach(function(d){d.nodeType===B.Node.TEXT_NODE?n(d,c):(-1!==d.className.baseVal.indexOf("highcharts-br")&&(a.actualWidth=0),L(d))})};L(a.element)}};l.prototype.getLineHeight=function(c){var a;c=c.nodeType===B.Node.TEXT_NODE?c.parentElement:c;this.renderer.styledMode||(a=c&&/(px|em)$/.test(c.style.fontSize)?
c.style.fontSize:this.fontSize||this.renderer.style.fontSize||12);return this.textLineHeight?parseInt(this.textLineHeight.toString(),10):this.renderer.fontMetrics(a,c||this.svgElement.element).h};l.prototype.modifyTree=function(c){var a=this,f=function(e,l){var m=e.attributes;m=void 0===m?{}:m;var u=e.children,g=e.style;g=void 0===g?{}:g;var d=e.tagName,q=a.renderer.styledMode;if("b"===d||"strong"===d)q?m["class"]="highcharts-strong":g.fontWeight="bold";else if("i"===d||"em"===d)q?m["class"]="highcharts-emphasized":
g.fontStyle="italic";g&&g.color&&(g.fill=g.color);"br"===d?(m["class"]="highcharts-br",e.textContent="\u200b",(l=c[l+1])&&l.textContent&&(l.textContent=l.textContent.replace(/^ +/gm,""))):"a"===d&&u&&u.some(function(d){return"#text"===d.tagName})&&(e.children=[{children:u,tagName:"tspan"}]);"#text"!==d&&"a"!==d&&(e.tagName="tspan");r(e,{attributes:m,style:g});u&&u.filter(function(d){return"#text"!==d.tagName}).forEach(f)};c.forEach(f);t(this.svgElement,"afterModifyTree",{nodes:c})};l.prototype.truncate=
function(c,a,f,l,g,n){var e=this.svgElement,m=e.renderer,d=e.rotation,q=[],h=f?1:0,k=(a||f||"").length,b=k,p,z=function(b,d){d=d||b;var h=c.parentNode;if(h&&"undefined"===typeof q[d])if(h.getSubStringLength)try{q[d]=l+h.getSubStringLength(0,f?d+1:d)}catch(Q){""}else m.getSpanWidth&&(c.textContent=n(a||f,b),q[d]=l+m.getSpanWidth(e,c));return q[d]};e.rotation=0;var w=z(c.textContent.length);if(l+w>g){for(;h<=k;)b=Math.ceil((h+k)/2),f&&(p=n(f,b)),w=z(b,p&&p.length-1),h===k?h=k+1:w>g?k=b-1:h=b;0===k?
c.textContent="":a&&k===a.length-1||(c.textContent=p||n(a||f,b))}f&&f.splice(0,b);e.actualWidth=w;e.rotation=d};l.prototype.unescapeEntities=function(c,a){f(this.renderer.escapes,function(e,f){a&&-1!==a.indexOf(e)||(c=c.toString().replace(new RegExp(e,"g"),f))});return c};return l}()});K(g,"Core/Renderer/SVG/SVGRenderer.js",[g["Core/Renderer/HTML/AST.js"],g["Core/Color/Color.js"],g["Core/Globals.js"],g["Core/Renderer/RendererRegistry.js"],g["Core/Renderer/SVG/SVGElement.js"],g["Core/Renderer/SVG/SVGLabel.js"],
g["Core/Renderer/SVG/Symbols.js"],g["Core/Renderer/SVG/TextBuilder.js"],g["Core/Utilities.js"]],function(a,g,x,E,D,B,G,r,t){var n=x.charts,f=x.deg2rad,c=x.doc,l=x.isFirefox,m=x.isMS,e=x.isWebKit,u=x.noop,C=x.SVG_NS,J=x.symbolSizes,I=x.win,L=t.addEvent,A=t.attr,d=t.createElement,q=t.css,h=t.defined,k=t.destroyObjectProperties,b=t.extend,p=t.isArray,z=t.isNumber,w=t.isObject,N=t.isString,H=t.merge,O=t.pick,Q=t.pInt,v=t.uniqueKey,Y;x=function(){function y(b,d,h,c,a,y,k){this.width=this.url=this.style=
this.isSVG=this.imgCount=this.height=this.gradients=this.globalAnimation=this.defs=this.chartIndex=this.cacheKeys=this.cache=this.boxWrapper=this.box=this.alignedObjects=void 0;this.init(b,d,h,c,a,y,k)}y.prototype.init=function(b,d,h,a,y,k,e){var F=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}),p=F.element;e||F.css(this.getStyle(a));b.appendChild(p);A(b,"dir","ltr");-1===b.innerHTML.indexOf("xmlns")&&A(p,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=p;this.boxWrapper=F;this.alignedObjects=
[];this.url=this.getReferenceURL();this.createElement("desc").add().element.appendChild(c.createTextNode("Created with Highcharts 10.3.2"));this.defs=this.createElement("defs").add();this.allowHTML=k;this.forExport=y;this.styledMode=e;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(d,h,!1);var f;l&&b.getBoundingClientRect&&(d=function(){q(b,{left:0,top:0});f=b.getBoundingClientRect();q(b,{left:Math.ceil(f.left)-f.left+"px",top:Math.ceil(f.top)-f.top+"px"})},d(),this.unSubPixelFix=
L(I,"resize",d))};y.prototype.definition=function(b){return(new a([b])).addToDOM(this.defs.element)};y.prototype.getReferenceURL=function(){if((l||e)&&c.getElementsByTagName("base").length){if(!h(Y)){var b=v();b=(new a([{tagName:"svg",attributes:{width:8,height:8},children:[{tagName:"defs",children:[{tagName:"clipPath",attributes:{id:b},children:[{tagName:"rect",attributes:{width:4,height:4}}]}]},{tagName:"rect",attributes:{id:"hitme",width:8,height:8,"clip-path":"url(#".concat(b,")"),fill:"rgba(0,0,0,0.001)"}}]}])).addToDOM(c.body);
q(b,{position:"fixed",top:0,left:0,zIndex:9E5});var d=c.elementFromPoint(6,6);Y="hitme"===(d&&d.id);c.body.removeChild(b)}if(Y)return I.location.href.split("#")[0].replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20")}return""};y.prototype.getStyle=function(d){return this.style=b({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},d)};y.prototype.setStyle=function(b){this.boxWrapper.css(this.getStyle(b))};y.prototype.isHidden=function(){return!this.boxWrapper.getBBox().width};
y.prototype.destroy=function(){var b=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();k(this.gradients||{});this.gradients=null;b&&(this.defs=b.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null};y.prototype.createElement=function(b){var d=new this.Element;d.init(this,b);return d};y.prototype.getRadialAttr=function(b,d){return{cx:b[0]-b[2]/2+(d.cx||0)*b[2],cy:b[1]-b[2]/2+(d.cy||0)*b[2],r:(d.r||0)*b[2]}};y.prototype.buildText=function(b){(new r(b)).buildSVG()};
y.prototype.getContrast=function(b){b=g.parse(b).rgba.map(function(b){b/=255;return.03928>=b?b/12.92:Math.pow((b+.055)/1.055,2.4)});b=.2126*b[0]+.7152*b[1]+.0722*b[2];return 1.05/(b+.05)>(b+.05)/.05?"#FFFFFF":"#000000"};y.prototype.button=function(d,h,c,y,k,e,p,f,q,z){void 0===k&&(k={});var F=this.label(d,h,c,q,void 0,void 0,z,void 0,"button"),l=this.styledMode;d=k.states||{};var M=0;k=H(k);delete k.states;var u=H({color:"#333333",cursor:"pointer",fontWeight:"normal"},k.style);delete k.style;var g=
a.filterUserAttributes(k);F.attr(H({padding:8,r:2},g));if(!l){g=H({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1},g);e=H(g,{fill:"#e6e6e6"},a.filterUserAttributes(e||d.hover||{}));var P=e.style;delete e.style;p=H(g,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},a.filterUserAttributes(p||d.select||{}));var T=p.style;delete p.style;f=H(g,{style:{color:"#cccccc"}},a.filterUserAttributes(f||d.disabled||{}));var A=f.style;delete f.style}L(F.element,m?"mouseover":"mouseenter",function(){3!==
M&&F.setState(1)});L(F.element,m?"mouseout":"mouseleave",function(){3!==M&&F.setState(M)});F.setState=function(b){1!==b&&(F.state=M=b);F.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][b||0]);l||(F.attr([g,e,p,f][b||0]),b=[u,P,T,A][b||0],w(b)&&F.css(b))};l||(F.attr(g).css(b({cursor:"default"},u)),z&&F.text.css({pointerEvents:"none"}));return F.on("touchstart",function(b){return b.stopPropagation()}).on("click",
function(b){3!==M&&y.call(F,b)})};y.prototype.crispLine=function(b,d,c){void 0===c&&(c="round");var a=b[0],y=b[1];h(a[1])&&a[1]===y[1]&&(a[1]=y[1]=Math[c](a[1])-d%2/2);h(a[2])&&a[2]===y[2]&&(a[2]=y[2]=Math[c](a[2])+d%2/2);return b};y.prototype.path=function(d){var h=this.styledMode?{}:{fill:"none"};p(d)?h.d=d:w(d)&&b(h,d);return this.createElement("path").attr(h)};y.prototype.circle=function(b,d,h){b=w(b)?b:"undefined"===typeof b?{}:{x:b,y:d,r:h};d=this.createElement("circle");d.xSetter=d.ySetter=
function(b,d,h){h.setAttribute("c"+d,b)};return d.attr(b)};y.prototype.arc=function(b,d,h,c,a,y){w(b)?(c=b,d=c.y,h=c.r,b=c.x):c={innerR:c,start:a,end:y};b=this.symbol("arc",b,d,h,h,c);b.r=h;return b};y.prototype.rect=function(b,d,h,c,a,y){a=w(b)?b.r:a;var k=this.createElement("rect");b=w(b)?b:"undefined"===typeof b?{}:{x:b,y:d,width:Math.max(h,0),height:Math.max(c,0)};this.styledMode||("undefined"!==typeof y&&(b["stroke-width"]=y,b=k.crisp(b)),b.fill="none");a&&(b.r=a);k.rSetter=function(b,d,h){k.r=
b;A(h,{rx:b,ry:b})};k.rGetter=function(){return k.r||0};return k.attr(b)};y.prototype.setSize=function(b,d,h){this.width=b;this.height=d;this.boxWrapper.animate({width:b,height:d},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:O(h,!0)?void 0:0});this.alignElements()};y.prototype.g=function(b){var d=this.createElement("g");return b?d.attr({"class":"highcharts-"+b}):d};y.prototype.image=function(b,d,h,c,a,y){var k={preserveAspectRatio:"none"},e=function(b,
d){b.setAttributeNS?b.setAttributeNS("http://www.w3.org/1999/xlink","href",d):b.setAttribute("hc-svg-href",d)};z(d)&&(k.x=d);z(h)&&(k.y=h);z(c)&&(k.width=c);z(a)&&(k.height=a);var p=this.createElement("image").attr(k);d=function(d){e(p.element,b);y.call(p,d)};y?(e(p.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),h=new I.Image,L(h,"load",d),h.src=b,h.complete&&d({})):e(p.element,b);return p};y.prototype.symbol=function(a,y,k,p,e,f){var F=this,w=/^url\((.*?)\)$/,
z=w.test(a),l=!z&&(this.symbols[a]?a:"circle"),m=l&&this.symbols[l],u;if(m){"number"===typeof y&&(u=m.call(this.symbols,Math.round(y||0),Math.round(k||0),p||0,e||0,f));var g=this.path(u);F.styledMode||g.attr("fill","none");b(g,{symbolName:l||void 0,x:y,y:k,width:p,height:e});f&&b(g,f)}else if(z){var P=a.match(w)[1];var T=g=this.image(P);T.imgwidth=O(J[P]&&J[P].width,f&&f.width);T.imgheight=O(J[P]&&J[P].height,f&&f.height);var C=function(b){return b.attr({width:b.width,height:b.height})};["width",
"height"].forEach(function(b){T[b+"Setter"]=function(b,d){this[d]=b;b=this.alignByTranslate;var c=this.element,a=this.width,y=this.height,k=this.imgwidth,p=this.imgheight,e=this["img"+d];if(h(e)){var F=1;f&&"within"===f.backgroundSize&&a&&y?(F=Math.min(a/k,y/p),e=Math.round(e*F),A(c,{width:Math.round(k*F),height:Math.round(p*F)})):c&&c.setAttribute(d,e);b||this.translate(((a||0)-e*F)/2,((y||0)-e*F)/2)}}});h(y)&&T.attr({x:y,y:k});T.isImg=!0;h(T.imgwidth)&&h(T.imgheight)?C(T):(T.attr({width:0,height:0}),
d("img",{onload:function(){var b=n[F.chartIndex];0===this.width&&(q(this,{position:"absolute",top:"-999em"}),c.body.appendChild(this));J[P]={width:this.width,height:this.height};T.imgwidth=this.width;T.imgheight=this.height;T.element&&C(T);this.parentNode&&this.parentNode.removeChild(this);F.imgCount--;if(!F.imgCount&&b&&!b.hasLoaded)b.onload()},src:P}),this.imgCount++)}return g};y.prototype.clipRect=function(b,d,h,c){var a=v()+"-",y=this.createElement("clipPath").attr({id:a}).add(this.defs);b=this.rect(b,
d,h,c,0).add(y);b.id=a;b.clipPath=y;b.count=0;return b};y.prototype.text=function(b,d,c,a){var y={};if(a&&(this.allowHTML||!this.forExport))return this.html(b,d,c);y.x=Math.round(d||0);c&&(y.y=Math.round(c));h(b)&&(y.text=b);b=this.createElement("text").attr(y);if(!a||this.forExport&&!this.allowHTML)b.xSetter=function(b,d,h){for(var c=h.getElementsByTagName("tspan"),a=h.getAttribute(d),y=0,k;y<c.length;y++)k=c[y],k.getAttribute(d)===a&&k.setAttribute(d,b);h.setAttribute(d,b)};return b};y.prototype.fontMetrics=
function(b,d){b=!this.styledMode&&/px/.test(b)||!I.getComputedStyle?b||d&&d.style&&d.style.fontSize||this.style&&this.style.fontSize:d&&D.prototype.getStyle.call(d,"font-size");b=/px/.test(b)?Q(b):12;d=24>b?b+3:Math.round(1.2*b);return{h:d,b:Math.round(.8*d),f:b}};y.prototype.rotCorr=function(b,d,h){var c=b;d&&h&&(c=Math.max(c*Math.cos(d*f),4));return{x:-b/3*Math.sin(d*f),y:c}};y.prototype.pathToSegments=function(b){for(var d=[],h=[],c={A:8,C:7,H:2,L:3,M:3,Q:5,S:5,T:3,V:2},a=0;a<b.length;a++)N(h[0])&&
z(b[a])&&h.length===c[h[0].toUpperCase()]&&b.splice(a,0,h[0].replace("M","L").replace("m","l")),"string"===typeof b[a]&&(h.length&&d.push(h.slice(0)),h.length=0),h.push(b[a]);d.push(h.slice(0));return d};y.prototype.label=function(b,d,h,c,a,y,k,e,p){return new B(this,b,d,h,c,a,y,k,e,p)};y.prototype.alignElements=function(){this.alignedObjects.forEach(function(b){return b.align()})};return y}();b(x.prototype,{Element:D,SVG_NS:C,escapes:{"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},symbols:G,
draw:u});E.registerRendererType("svg",x,!0);"";return x});K(g,"Core/Renderer/HTML/HTMLElement.js",[g["Core/Globals.js"],g["Core/Renderer/SVG/SVGElement.js"],g["Core/Utilities.js"]],function(a,g,x){var v=this&&this.__extends||function(){var c=function(a,f){c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,a){c.__proto__=a}||function(c,a){for(var e in a)a.hasOwnProperty(e)&&(c[e]=a[e])};return c(a,f)};return function(a,f){function e(){this.constructor=a}c(a,f);a.prototype=null===f?
Object.create(f):(e.prototype=f.prototype,new e)}}(),D=a.isFirefox,B=a.isMS,G=a.isWebKit,r=a.win,t=x.css,n=x.defined,f=x.extend,c=x.pick,l=x.pInt;return function(a){function e(){return null!==a&&a.apply(this,arguments)||this}v(e,a);e.compose=function(c){if(-1===e.composedClasses.indexOf(c)){e.composedClasses.push(c);var a=e.prototype,f=c.prototype;f.getSpanCorrection=a.getSpanCorrection;f.htmlCss=a.htmlCss;f.htmlGetBBox=a.htmlGetBBox;f.htmlUpdateTransform=a.htmlUpdateTransform;f.setSpanRotation=a.setSpanRotation}return c};
e.prototype.getSpanCorrection=function(c,a,e){this.xCorr=-c*e;this.yCorr=-a};e.prototype.htmlCss=function(a){var e="SPAN"===this.element.tagName&&a&&"width"in a,l=c(e&&a.width,void 0);if(e){delete a.width;this.textWidth=l;var g=!0}a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=f(this.styles,a);t(this.element,a);g&&this.htmlUpdateTransform();return this};e.prototype.htmlGetBBox=function(){var c=this.element;return{x:c.offsetLeft,y:c.offsetTop,width:c.offsetWidth,
height:c.offsetHeight}};e.prototype.htmlUpdateTransform=function(){if(this.added){var c=this.renderer,a=this.element,e=this.translateX||0,f=this.translateY||0,g=this.x||0,m=this.y||0,d=this.textAlign||"left",q={left:0,center:.5,right:1}[d],h=this.styles;h=h&&h.whiteSpace;t(a,{marginLeft:e,marginTop:f});!c.styledMode&&this.shadows&&this.shadows.forEach(function(b){t(b,{marginLeft:e+1,marginTop:f+1})});this.inverted&&[].forEach.call(a.childNodes,function(b){c.invertChild(b,a)});if("SPAN"===a.tagName){var k=
this.rotation,b=this.textWidth&&l(this.textWidth),p=[k,d,a.innerHTML,this.textWidth,this.textAlign].join(),z=void 0;z=!1;if(b!==this.oldTextWidth){if(this.textPxLength)var w=this.textPxLength;else t(a,{width:"",whiteSpace:h||"nowrap"}),w=a.offsetWidth;(b>this.oldTextWidth||w>b)&&(/[ \-]/.test(a.textContent||a.innerText)||"ellipsis"===a.style.textOverflow)&&(t(a,{width:w>b||k?b+"px":"auto",display:"block",whiteSpace:h||"normal"}),this.oldTextWidth=b,z=!0)}this.hasBoxWidthChanged=z;p!==this.cTT&&(z=
c.fontMetrics(a.style.fontSize,a).b,!n(k)||k===(this.oldRotation||0)&&d===this.oldAlign||this.setSpanRotation(k,q,z),this.getSpanCorrection(!n(k)&&this.textPxLength||a.offsetWidth,z,q,k,d));t(a,{left:g+(this.xCorr||0)+"px",top:m+(this.yCorr||0)+"px"});this.cTT=p;this.oldRotation=k;this.oldAlign=d}}else this.alignOnAdd=!0};e.prototype.setSpanRotation=function(c,a,e){var f={},l=B&&!/Edge/.test(r.navigator.userAgent)?"-ms-transform":G?"-webkit-transform":D?"MozTransform":r.opera?"-o-transform":void 0;
l&&(f[l]=f.transform="rotate("+c+"deg)",f[l+(D?"Origin":"-origin")]=f.transformOrigin=100*a+"% "+e+"px",t(this.element,f))};e.composedClasses=[];return e}(g)});K(g,"Core/Renderer/HTML/HTMLRenderer.js",[g["Core/Renderer/HTML/AST.js"],g["Core/Renderer/SVG/SVGElement.js"],g["Core/Renderer/SVG/SVGRenderer.js"],g["Core/Utilities.js"]],function(a,g,x,E){var v=this&&this.__extends||function(){var a=function(f,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,a){c.__proto__=a}||function(c,
a){for(var e in a)a.hasOwnProperty(e)&&(c[e]=a[e])};return a(f,c)};return function(f,c){function l(){this.constructor=f}a(f,c);f.prototype=null===c?Object.create(c):(l.prototype=c.prototype,new l)}}(),B=E.attr,G=E.createElement,r=E.extend,t=E.pick;return function(n){function f(){return null!==n&&n.apply(this,arguments)||this}v(f,n);f.compose=function(c){-1===f.composedClasses.indexOf(c)&&(f.composedClasses.push(c),c.prototype.html=f.prototype.html);return c};f.prototype.html=function(c,f,m){var e=
this.createElement("span"),l=e.element,n=e.renderer,J=n.isSVG,I=function(c,a){["opacity","visibility"].forEach(function(d){c[d+"Setter"]=function(e,h,k){var b=c.div?c.div.style:a;g.prototype[d+"Setter"].call(this,e,h,k);b&&(b[h]=e)}});c.addedSetters=!0};e.textSetter=function(c){c!==this.textStr&&(delete this.bBox,delete this.oldTextWidth,a.setElementHTML(this.element,t(c,"")),this.textStr=c,e.doTransform=!0)};J&&I(e,e.element.style);e.xSetter=e.ySetter=e.alignSetter=e.rotationSetter=function(c,a){"align"===
a?e.alignValue=e.textAlign=c:e[a]=c;e.doTransform=!0};e.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};e.attr({text:c,x:Math.round(f),y:Math.round(m)}).css({position:"absolute"});n.styledMode||e.css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});l.style.whiteSpace="nowrap";e.css=e.htmlCss;J&&(e.add=function(c){var a=n.box.parentNode,d=[];if(this.parentGroup=c){var f=c.div;if(!f){for(;c;)d.push(c),c=c.parentGroup;d.reverse().forEach(function(h){function c(b,
d){h[d]=b;"translateX"===d?q.left=b+"px":q.top=b+"px";h.doTransform=!0}var b=B(h.element,"class"),p=h.styles||{};f=h.div=h.div||G("div",b?{className:b}:void 0,{position:"absolute",left:(h.translateX||0)+"px",top:(h.translateY||0)+"px",display:h.display,opacity:h.opacity,cursor:p.cursor,pointerEvents:p.pointerEvents,visibility:h.visibility},f||a);var q=f.style;r(h,{classSetter:function(b){return function(d){this.element.setAttribute("class",d);b.className=d}}(f),on:function(){d[0].div&&e.on.apply({element:d[0].div,
onEvents:h.onEvents},arguments);return h},translateXSetter:c,translateYSetter:c});h.addedSetters||I(h)})}}else f=a;f.appendChild(l);e.added=!0;e.alignOnAdd&&e.htmlUpdateTransform();return e});return e};f.composedClasses=[];return f}(x)});K(g,"Core/Axis/AxisDefaults.js",[],function(){var a;(function(a){a.defaultXAxisOptions={alignTicks:!0,allowDecimals:void 0,panningEnabled:!0,zIndex:2,zoomEnabled:!0,dateTimeLabelFormats:{millisecond:{main:"%H:%M:%S.%L",range:!1},second:{main:"%H:%M:%S",range:!1},
minute:{main:"%H:%M",range:!1},hour:{main:"%H:%M",range:!1},day:{main:"%e. %b"},week:{main:"%e. %b"},month:{main:"%b '%y"},year:{main:"%Y"}},endOnTick:!1,gridLineDashStyle:"Solid",gridZIndex:1,labels:{autoRotation:void 0,autoRotationLimit:80,distance:void 0,enabled:!0,indentation:10,overflow:"justify",padding:5,reserveSpace:void 0,rotation:void 0,staggerLines:0,step:0,useHTML:!1,x:0,zIndex:7,style:{color:"#666666",cursor:"default",fontSize:"11px"}},maxPadding:.01,minorGridLineDashStyle:"Solid",minorTickLength:2,
minorTickPosition:"outside",minPadding:.01,offset:void 0,opposite:!1,reversed:void 0,reversedStacks:!1,showEmpty:!0,showFirstLabel:!0,showLastLabel:!0,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",rotation:0,useHTML:!1,x:0,y:0,style:{color:"#666666"}},type:"linear",uniqueNames:!0,visible:!0,minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",
gridLineWidth:void 0,tickColor:"#ccd6eb"};a.defaultYAxisOptions={reversedStacks:!0,endOnTick:!0,maxPadding:.05,minPadding:.05,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{animation:{},allowOverlap:!1,enabled:!1,crop:!0,overflow:"justify",formatter:function(){var a=this.axis.chart.numberFormatter;return a(this.total||0,-1)},style:{color:"#000000",fontSize:"11px",fontWeight:"bold",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0};
a.defaultLeftAxisOptions={labels:{x:-15},title:{rotation:270}};a.defaultRightAxisOptions={labels:{x:15},title:{rotation:90}};a.defaultBottomAxisOptions={labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}};a.defaultTopAxisOptions={labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}}})(a||(a={}));return a});K(g,"Core/Foundation.js",[g["Core/Utilities.js"]],function(a){var g=a.addEvent,x=a.isFunction,E=a.objectEach,D=a.removeEvent,B;(function(a){a.registerEventOptions=function(a,t){a.eventOptions=
a.eventOptions||{};E(t.events,function(n,f){a.eventOptions[f]!==n&&(a.eventOptions[f]&&(D(a,f,a.eventOptions[f]),delete a.eventOptions[f]),x(n)&&(a.eventOptions[f]=n,g(a,f,n)))})}})(B||(B={}));return B});K(g,"Core/Axis/Tick.js",[g["Core/FormatUtilities.js"],g["Core/Globals.js"],g["Core/Utilities.js"]],function(a,g,x){var v=g.deg2rad,D=x.clamp,B=x.correctFloat,G=x.defined,r=x.destroyObjectProperties,t=x.extend,n=x.fireEvent,f=x.isNumber,c=x.merge,l=x.objectEach,m=x.pick;g=function(){function e(c,a,
e,f,l){this.isNewLabel=this.isNew=!0;this.axis=c;this.pos=a;this.type=e||"";this.parameters=l||{};this.tickmarkOffset=this.parameters.tickmarkOffset;this.options=this.parameters.options;n(this,"init");e||f||this.addLabel()}e.prototype.addLabel=function(){var c=this,e=c.axis,l=e.options,g=e.chart,L=e.categories,A=e.logarithmic,d=e.names,q=c.pos,h=m(c.options&&c.options.labels,l.labels),k=e.tickPositions,b=q===k[0],p=q===k[k.length-1],z=(!h.step||1===h.step)&&1===e.tickInterval;k=k.info;var w=c.label,
N;L=this.parameters.category||(L?m(L[q],d[q],q):q);A&&f(L)&&(L=B(A.lin2log(L)));if(e.dateTime)if(k){var H=g.time.resolveDTLFormat(l.dateTimeLabelFormats[!l.grid&&k.higherRanks[q]||k.unitName]);var O=H.main}else f(L)&&(O=e.dateTime.getXDateFormat(L,l.dateTimeLabelFormats||{}));c.isFirst=b;c.isLast=p;var Q={axis:e,chart:g,dateTimeLabelFormat:O,isFirst:b,isLast:p,pos:q,tick:c,tickPositionInfo:k,value:L};n(this,"labelFormat",Q);var r=function(b){return h.formatter?h.formatter.call(b,b):h.format?(b.text=
e.defaultLabelFormatter.call(b,b),a.format(h.format,b,g)):e.defaultLabelFormatter.call(b,b)};l=r.call(Q,Q);var Y=H&&H.list;c.shortenLabel=Y?function(){for(N=0;N<Y.length;N++)if(t(Q,{dateTimeLabelFormat:Y[N]}),w.attr({text:r.call(Q,Q)}),w.getBBox().width<e.getSlotWidth(c)-2*h.padding)return;w.attr({text:""})}:void 0;z&&e._addedPlotLB&&c.moveLabel(l,h);G(w)||c.movedLabel?w&&w.textStr!==l&&!z&&(!w.textWidth||h.style.width||w.styles.width||w.css({width:null}),w.attr({text:l}),w.textPxLength=w.getBBox().width):
(c.label=w=c.createLabel({x:0,y:0},l,h),c.rotation=0)};e.prototype.createLabel=function(a,e,f){var l=this.axis,g=l.chart;if(a=G(e)&&f.enabled?g.renderer.text(e,a.x,a.y,f.useHTML).add(l.labelGroup):null)g.styledMode||a.css(c(f.style)),a.textPxLength=a.getBBox().width;return a};e.prototype.destroy=function(){r(this,this.axis)};e.prototype.getPosition=function(c,a,e,f){var l=this.axis,g=l.chart,d=f&&g.oldChartHeight||g.chartHeight;c={x:c?B(l.translate(a+e,void 0,void 0,f)+l.transB):l.left+l.offset+(l.opposite?
(f&&g.oldChartWidth||g.chartWidth)-l.right-l.left:0),y:c?d-l.bottom+l.offset-(l.opposite?l.height:0):B(d-l.translate(a+e,void 0,void 0,f)-l.transB)};c.y=D(c.y,-1E5,1E5);n(this,"afterGetPosition",{pos:c});return c};e.prototype.getLabelPosition=function(c,a,e,f,l,g,d,q){var h=this.axis,k=h.transA,b=h.isLinked&&h.linkedParent?h.linkedParent.reversed:h.reversed,p=h.staggerLines,z=h.tickRotCorr||{x:0,y:0},w=f||h.reserveSpaceDefault?0:-h.labelOffset*("center"===h.labelAlign?.5:1),m={};e=0===h.side?e.rotation?
-8:-e.getBBox().height:2===h.side?z.y+8:Math.cos(e.rotation*v)*(z.y-e.getBBox(!1,0).height/2);G(l.y)&&(e=0===h.side&&h.horiz?l.y+e:l.y);c=c+l.x+w+z.x-(g&&f?g*k*(b?-1:1):0);a=a+e-(g&&!f?g*k*(b?1:-1):0);p&&(f=d/(q||1)%p,h.opposite&&(f=p-f-1),a+=h.labelOffset/p*f);m.x=c;m.y=Math.round(a);n(this,"afterGetLabelPosition",{pos:m,tickmarkOffset:g,index:d});return m};e.prototype.getLabelSize=function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0};e.prototype.getMarkPath=function(c,
a,e,f,l,g){return g.crispLine([["M",c,a],["L",c+(l?0:-e),a+(l?e:0)]],f)};e.prototype.handleOverflow=function(c){var a=this.axis,e=a.options.labels,f=c.x,l=a.chart.chartWidth,g=a.chart.spacing,d=m(a.labelLeft,Math.min(a.pos,g[3]));g=m(a.labelRight,Math.max(a.isRadial?0:a.pos+a.len,l-g[1]));var q=this.label,h=this.rotation,k={left:0,center:.5,right:1}[a.labelAlign||q.attr("align")],b=q.getBBox().width,p=a.getSlotWidth(this),z={},w=p,u=1,n;if(h||"justify"!==e.overflow)0>h&&f-k*b<d?n=Math.round(f/Math.cos(h*
v)-d):0<h&&f+k*b>g&&(n=Math.round((l-f)/Math.cos(h*v)));else if(l=f+(1-k)*b,f-k*b<d?w=c.x+w*(1-k)-d:l>g&&(w=g-c.x+w*k,u=-1),w=Math.min(p,w),w<p&&"center"===a.labelAlign&&(c.x+=u*(p-w-k*(p-Math.min(b,w)))),b>w||a.autoRotation&&(q.styles||{}).width)n=w;n&&(this.shortenLabel?this.shortenLabel():(z.width=Math.floor(n)+"px",(e.style||{}).textOverflow||(z.textOverflow="ellipsis"),q.css(z)))};e.prototype.moveLabel=function(c,a){var e=this,f=e.label,g=e.axis,m=g.reversed,d=!1;f&&f.textStr===c?(e.movedLabel=
f,d=!0,delete e.label):l(g.ticks,function(h){d||h.isNew||h===e||!h.label||h.label.textStr!==c||(e.movedLabel=h.label,d=!0,h.labelPos=e.movedLabel.xy,delete h.label)});if(!d&&(e.labelPos||f)){var q=e.labelPos||f.xy;f=g.horiz?m?0:g.width+g.left:q.x;g=g.horiz?q.y:m?g.width+g.left:0;e.movedLabel=e.createLabel({x:f,y:g},c,a);e.movedLabel&&e.movedLabel.attr({opacity:0})}};e.prototype.render=function(c,a,e){var f=this.axis,l=f.horiz,g=this.pos,d=m(this.tickmarkOffset,f.tickmarkOffset);g=this.getPosition(l,
g,d,a);d=g.x;var q=g.y;f=l&&d===f.pos+f.len||!l&&q===f.pos?-1:1;l=m(e,this.label&&this.label.newOpacity,1);e=m(e,1);this.isActive=!0;this.renderGridLine(a,e,f);this.renderMark(g,e,f);this.renderLabel(g,a,l,c);this.isNew=!1;n(this,"afterRender")};e.prototype.renderGridLine=function(c,a,e){var f=this.axis,l=f.options,g={},d=this.pos,q=this.type,h=m(this.tickmarkOffset,f.tickmarkOffset),k=f.chart.renderer,b=this.gridLine,p=l.gridLineWidth,z=l.gridLineColor,w=l.gridLineDashStyle;"minor"===this.type&&
(p=l.minorGridLineWidth,z=l.minorGridLineColor,w=l.minorGridLineDashStyle);b||(f.chart.styledMode||(g.stroke=z,g["stroke-width"]=p||0,g.dashstyle=w),q||(g.zIndex=1),c&&(a=0),this.gridLine=b=k.path().attr(g).addClass("highcharts-"+(q?q+"-":"")+"grid-line").add(f.gridGroup));if(b&&(e=f.getPlotLinePath({value:d+h,lineWidth:b.strokeWidth()*e,force:"pass",old:c})))b[c||this.isNew?"attr":"animate"]({d:e,opacity:a})};e.prototype.renderMark=function(c,a,e){var f=this.axis,l=f.options,g=f.chart.renderer,d=
this.type,q=f.tickSize(d?d+"Tick":"tick"),h=c.x;c=c.y;var k=m(l["minor"!==d?"tickWidth":"minorTickWidth"],!d&&f.isXAxis?1:0);l=l["minor"!==d?"tickColor":"minorTickColor"];var b=this.mark,p=!b;q&&(f.opposite&&(q[0]=-q[0]),b||(this.mark=b=g.path().addClass("highcharts-"+(d?d+"-":"")+"tick").add(f.axisGroup),f.chart.styledMode||b.attr({stroke:l,"stroke-width":k})),b[p?"attr":"animate"]({d:this.getMarkPath(h,c,q[0],b.strokeWidth()*e,f.horiz,g),opacity:a}))};e.prototype.renderLabel=function(c,a,e,l){var g=
this.axis,u=g.horiz,d=g.options,q=this.label,h=d.labels,k=h.step;g=m(this.tickmarkOffset,g.tickmarkOffset);var b=c.x;c=c.y;var p=!0;q&&f(b)&&(q.xy=c=this.getLabelPosition(b,c,q,u,h,g,l,k),this.isFirst&&!this.isLast&&!d.showFirstLabel||this.isLast&&!this.isFirst&&!d.showLastLabel?p=!1:!u||h.step||h.rotation||a||0===e||this.handleOverflow(c),k&&l%k&&(p=!1),p&&f(c.y)?(c.opacity=e,q[this.isNewLabel?"attr":"animate"](c).show(!0),this.isNewLabel=!1):(q.hide(),this.isNewLabel=!0))};e.prototype.replaceMovedLabel=
function(){var c=this.label,a=this.axis,e=a.reversed;if(c&&!this.isNew){var f=a.horiz?e?a.left:a.width+a.left:c.xy.x;e=a.horiz?c.xy.y:e?a.width+a.top:a.top;c.animate({x:f,y:e,opacity:0},void 0,c.destroy);delete this.label}a.isDirty=!0;this.label=this.movedLabel;delete this.movedLabel};return e}();"";return g});K(g,"Core/Axis/Axis.js",[g["Core/Animation/AnimationUtilities.js"],g["Core/Axis/AxisDefaults.js"],g["Core/Color/Color.js"],g["Core/Defaults.js"],g["Core/Foundation.js"],g["Core/Globals.js"],
g["Core/Axis/Tick.js"],g["Core/Utilities.js"]],function(a,g,x,E,D,B,G,r){var t=a.animObject,n=E.defaultOptions,f=D.registerEventOptions,c=B.deg2rad,l=r.arrayMax,m=r.arrayMin,e=r.clamp,u=r.correctFloat,C=r.defined,J=r.destroyObjectProperties,I=r.erase,v=r.error,A=r.extend,d=r.fireEvent,q=r.isArray,h=r.isNumber,k=r.isString,b=r.merge,p=r.normalizeTickInterval,z=r.objectEach,w=r.pick,N=r.relativeLength,H=r.removeEvent,O=r.splat,Q=r.syncTimeout,S=function(b,d){return p(d,void 0,void 0,w(b.options.allowDecimals,
.5>d||void 0!==b.tickAmount),!!b.tickAmount)};a=function(){function a(b,d){this.zoomEnabled=this.width=this.visible=this.userOptions=this.translationSlope=this.transB=this.transA=this.top=this.ticks=this.tickRotCorr=this.tickPositions=this.tickmarkOffset=this.tickInterval=this.tickAmount=this.side=this.series=this.right=this.positiveValuesOnly=this.pos=this.pointRangePadding=this.pointRange=this.plotLinesAndBandsGroups=this.plotLinesAndBands=this.paddedTicks=this.overlap=this.options=this.offset=
this.names=this.minPixelPadding=this.minorTicks=this.minorTickInterval=this.min=this.maxLabelLength=this.max=this.len=this.left=this.labelFormatter=this.labelEdge=this.isLinked=this.height=this.hasVisibleSeries=this.hasNames=this.eventOptions=this.coll=this.closestPointRange=this.chart=this.bottom=this.alternateBands=void 0;this.init(b,d)}a.prototype.init=function(b,a){var c=a.isX;this.chart=b;this.horiz=b.inverted&&!this.isZAxis?!c:c;this.isXAxis=c;this.coll=this.coll||(c?"xAxis":"yAxis");d(this,
"init",{userOptions:a});this.opposite=w(a.opposite,this.opposite);this.side=w(a.side,this.side,this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(a);var e=this.options,y=e.labels,k=e.type;this.userOptions=a;this.minPixelPadding=0;this.reversed=w(e.reversed,this.reversed);this.visible=e.visible;this.zoomEnabled=e.zoomEnabled;this.hasNames="category"===k||!0===e.categories;this.categories=e.categories||(this.hasNames?[]:void 0);this.names||(this.names=[],this.names.keys={});this.plotLinesAndBandsGroups=
{};this.positiveValuesOnly=!!this.logarithmic;this.isLinked=C(e.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=e.minRange||e.maxZoom;this.range=e.range;this.offset=e.offset||0;this.min=this.max=null;a=w(e.crosshair,O(b.options.tooltip.crosshairs)[c?0:1]);this.crosshair=!0===a?{}:a;-1===b.axes.indexOf(this)&&(c?b.axes.splice(b.xAxis.length,0,this):b.axes.push(this),b[this.coll].push(this));this.series=
this.series||[];b.inverted&&!this.isZAxis&&c&&"undefined"===typeof this.reversed&&(this.reversed=!0);this.labelRotation=h(y.rotation)?y.rotation:void 0;f(this,e);d(this,"afterInit")};a.prototype.setOptions=function(h){this.options=b(g.defaultXAxisOptions,"yAxis"===this.coll&&g.defaultYAxisOptions,[g.defaultTopAxisOptions,g.defaultRightAxisOptions,g.defaultBottomAxisOptions,g.defaultLeftAxisOptions][this.side],b(n[this.coll],h));d(this,"afterSetOptions",{userOptions:h})};a.prototype.defaultLabelFormatter=
function(b){var d=this.axis;b=this.chart.numberFormatter;var a=h(this.value)?this.value:NaN,c=d.chart.time,e=this.dateTimeLabelFormat,k=n.lang,y=k.numericSymbols;k=k.numericSymbolMagnitude||1E3;var f=d.logarithmic?Math.abs(a):d.tickInterval,p=y&&y.length;if(d.categories)var l="".concat(this.value);else if(e)l=c.dateFormat(e,a);else if(p&&1E3<=f)for(;p--&&"undefined"===typeof l;)d=Math.pow(k,p+1),f>=d&&0===10*a%d&&null!==y[p]&&0!==a&&(l=b(a/d,-1)+y[p]);"undefined"===typeof l&&(l=1E4<=Math.abs(a)?b(a,
-1):b(a,-1,void 0,""));return l};a.prototype.getSeriesExtremes=function(){var b=this,a=b.chart,c;d(this,"getSeriesExtremes",null,function(){b.hasVisibleSeries=!1;b.dataMin=b.dataMax=b.threshold=null;b.softThreshold=!b.isXAxis;b.stacking&&b.stacking.buildStacks();b.series.forEach(function(d){if(d.visible||!a.options.chart.ignoreHiddenSeries){var e=d.options,k=e.threshold;b.hasVisibleSeries=!0;b.positiveValuesOnly&&0>=k&&(k=null);if(b.isXAxis){if(e=d.xData,e.length){e=b.logarithmic?e.filter(b.validatePositiveValue):
e;c=d.getXExtremes(e);var y=c.min;var f=c.max;h(y)||y instanceof Date||(e=e.filter(h),c=d.getXExtremes(e),y=c.min,f=c.max);e.length&&(b.dataMin=Math.min(w(b.dataMin,y),y),b.dataMax=Math.max(w(b.dataMax,f),f))}}else if(d=d.applyExtremes(),h(d.dataMin)&&(y=d.dataMin,b.dataMin=Math.min(w(b.dataMin,y),y)),h(d.dataMax)&&(f=d.dataMax,b.dataMax=Math.max(w(b.dataMax,f),f)),C(k)&&(b.threshold=k),!e.softThreshold||b.positiveValuesOnly)b.softThreshold=!1}})});d(this,"afterGetSeriesExtremes")};a.prototype.translate=
function(b,d,a,c,e,k){var f=this.linkedParent||this,y=c&&f.old?f.old.min:f.min;if(!h(y))return NaN;var p=f.minPixelPadding;e=(f.isOrdinal||f.brokenAxis&&f.brokenAxis.hasBreaks||f.logarithmic&&e)&&f.lin2val;var F=1,l=0;c=c&&f.old?f.old.transA:f.transA;c||(c=f.transA);a&&(F*=-1,l=f.len);f.reversed&&(F*=-1,l-=F*(f.sector||f.len));d?(k=(b*F+l-p)/c+y,e&&(k=f.lin2val(k))):(e&&(b=f.val2lin(b)),b=F*(b-y)*c,k=(f.isRadial?b:u(b))+l+F*p+(h(k)?c*k:0));return k};a.prototype.toPixels=function(b,d){return this.translate(b,
!1,!this.horiz,void 0,!0)+(d?0:this.pos)};a.prototype.toValue=function(b,d){return this.translate(b-(d?0:this.pos),!0,!this.horiz,void 0,!0)};a.prototype.getPlotLinePath=function(b){function a(b,d,a){if("pass"!==n&&b<d||b>a)n?b=e(b,d,a):C=!0;return b}var c=this,k=c.chart,f=c.left,y=c.top,p=b.old,l=b.value,g=b.lineWidth,q=p&&k.oldChartHeight||k.chartHeight,z=p&&k.oldChartWidth||k.chartWidth,m=c.transB,u=b.translatedValue,n=b.force,A,H,N,O,C;b={value:l,lineWidth:g,old:p,force:n,acrossPanes:b.acrossPanes,
translatedValue:u};d(this,"getPlotLinePath",b,function(b){u=w(u,c.translate(l,void 0,void 0,p));u=e(u,-1E5,1E5);A=N=Math.round(u+m);H=O=Math.round(q-u-m);h(u)?c.horiz?(H=y,O=q-c.bottom,A=N=a(A,f,f+c.width)):(A=f,N=z-c.right,H=O=a(H,y,y+c.height)):(C=!0,n=!1);b.path=C&&!n?null:k.renderer.crispLine([["M",A,H],["L",N,O]],g||1)});return b.path};a.prototype.getLinearTickPositions=function(b,d,a){var h=u(Math.floor(d/b)*b);a=u(Math.ceil(a/b)*b);var c=[],e;u(h+b)===h&&(e=20);if(this.single)return[d];for(d=
h;d<=a;){c.push(d);d=u(d+b,e);if(d===k)break;var k=d}return c};a.prototype.getMinorTickInterval=function(){var b=this.options;return!0===b.minorTicks?w(b.minorTickInterval,"auto"):!1===b.minorTicks?null:b.minorTickInterval};a.prototype.getMinorTickPositions=function(){var b=this.options,d=this.tickPositions,a=this.minorTickInterval,h=this.pointRangePadding||0,c=this.min-h;h=this.max+h;var e=h-c,k=[];if(e&&e/a<this.len/3){var f=this.logarithmic;if(f)this.paddedTicks.forEach(function(b,d,h){d&&k.push.apply(k,
f.getLogTickPositions(a,h[d-1],h[d],!0))});else if(this.dateTime&&"auto"===this.getMinorTickInterval())k=k.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(a),c,h,b.startOfWeek));else for(b=c+(d[0]-c)%a;b<=h&&b!==k[0];b+=a)k.push(b)}0!==k.length&&this.trimTicks(k);return k};a.prototype.adjustForMinRange=function(){var b=this.options,d=this.logarithmic,a=this.min,h=this.max,c=0,e,k,f,p;this.isXAxis&&"undefined"===typeof this.minRange&&!d&&(C(b.min)||C(b.max)||C(b.floor)||C(b.ceiling)?
this.minRange=null:(this.series.forEach(function(b){f=b.xData;p=b.xIncrement?1:f.length-1;if(1<f.length)for(e=p;0<e;e--)if(k=f[e]-f[e-1],!c||k<c)c=k}),this.minRange=Math.min(5*c,this.dataMax-this.dataMin)));if(h-a<this.minRange){var g=this.dataMax-this.dataMin>=this.minRange;var q=this.minRange;var z=(q-h+a)/2;z=[a-z,w(b.min,a-z)];g&&(z[2]=this.logarithmic?this.logarithmic.log2lin(this.dataMin):this.dataMin);a=l(z);h=[a+q,w(b.max,a+q)];g&&(h[2]=d?d.log2lin(this.dataMax):this.dataMax);h=m(h);h-a<q&&
(z[0]=h-q,z[1]=w(b.min,h-q),a=l(z))}this.min=a;this.max=h};a.prototype.getClosest=function(){var b;this.categories?b=1:this.series.forEach(function(d){var a=d.closestPointRange,h=d.visible||!d.chart.options.chart.ignoreHiddenSeries;!d.noSharedTooltip&&C(a)&&h&&(b=C(b)?Math.min(b,a):a)});return b};a.prototype.nameToX=function(b){var d=q(this.options.categories),a=d?this.categories:this.names,h=b.options.x;b.series.requireSorting=!1;C(h)||(h=this.options.uniqueNames&&a?d?a.indexOf(b.name):w(a.keys[b.name],
-1):b.series.autoIncrement());if(-1===h){if(!d&&a)var c=a.length}else c=h;"undefined"!==typeof c?(this.names[c]=b.name,this.names.keys[b.name]=c):b.x&&(c=b.x);return c};a.prototype.updateNames=function(){var b=this,d=this.names;0<d.length&&(Object.keys(d.keys).forEach(function(b){delete d.keys[b]}),d.length=0,this.minRange=this.userMinRange,(this.series||[]).forEach(function(d){d.xIncrement=null;if(!d.points||d.isDirtyData)b.max=Math.max(b.max,d.xData.length-1),d.processData(),d.generatePoints();
d.data.forEach(function(a,h){if(a&&a.options&&"undefined"!==typeof a.name){var c=b.nameToX(a);"undefined"!==typeof c&&c!==a.x&&(a.x=c,d.xData[h]=c)}})}))};a.prototype.setAxisTranslation=function(){var b=this,a=b.max-b.min,h=b.linkedParent,c=!!b.categories,e=b.isXAxis,f=b.axisPointRange||0,p=0,l=0,g=b.transA;if(e||c||f){var q=b.getClosest();h?(p=h.minPointOffset,l=h.pointRangePadding):b.series.forEach(function(d){var a=c?1:e?w(d.options.pointRange,q,0):b.axisPointRange||0,h=d.options.pointPlacement;
f=Math.max(f,a);if(!b.single||c)d=d.is("xrange")?!e:e,p=Math.max(p,d&&k(h)?0:a/2),l=Math.max(l,d&&"on"===h?0:a)});h=b.ordinal&&b.ordinal.slope&&q?b.ordinal.slope/q:1;b.minPointOffset=p*=h;b.pointRangePadding=l*=h;b.pointRange=Math.min(f,b.single&&c?1:a);e&&(b.closestPointRange=q)}b.translationSlope=b.transA=g=b.staticScale||b.len/(a+l||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=g*p;d(this,"afterSetAxisTranslation")};a.prototype.minFromRange=function(){return this.max-this.range};a.prototype.setTickInterval=
function(b){var a=this.chart,c=this.logarithmic,e=this.options,k=this.isXAxis,f=this.isLinked,p=e.tickPixelInterval,y=this.categories,l=this.softThreshold,g=e.maxPadding,q=e.minPadding,z=h(e.tickInterval)&&0<=e.tickInterval?e.tickInterval:void 0,m=h(this.threshold)?this.threshold:null;this.dateTime||y||f||this.getTickAmount();var n=w(this.userMin,e.min);var A=w(this.userMax,e.max);if(f){this.linkedParent=a[this.coll][e.linkedTo];var H=this.linkedParent.getExtremes();this.min=w(H.min,H.dataMin);this.max=
w(H.max,H.dataMax);e.type!==this.linkedParent.options.type&&v(11,1,a)}else{if(l&&C(m))if(this.dataMin>=m)H=m,q=0;else if(this.dataMax<=m){var N=m;g=0}this.min=w(n,H,this.dataMin);this.max=w(A,N,this.dataMax)}c&&(this.positiveValuesOnly&&!b&&0>=Math.min(this.min,w(this.dataMin,this.min))&&v(10,1,a),this.min=u(c.log2lin(this.min),16),this.max=u(c.log2lin(this.max),16));this.range&&C(this.max)&&(this.userMin=this.min=n=Math.max(this.dataMin,this.minFromRange()),this.userMax=A=this.max,this.range=null);
d(this,"foundExtremes");this.beforePadding&&this.beforePadding();this.adjustForMinRange();!(y||this.axisPointRange||this.stacking&&this.stacking.usePercentage||f)&&C(this.min)&&C(this.max)&&(a=this.max-this.min)&&(!C(n)&&q&&(this.min-=a*q),!C(A)&&g&&(this.max+=a*g));h(this.userMin)||(h(e.softMin)&&e.softMin<this.min&&(this.min=n=e.softMin),h(e.floor)&&(this.min=Math.max(this.min,e.floor)));h(this.userMax)||(h(e.softMax)&&e.softMax>this.max&&(this.max=A=e.softMax),h(e.ceiling)&&(this.max=Math.min(this.max,
e.ceiling)));l&&C(this.dataMin)&&(m=m||0,!C(n)&&this.min<m&&this.dataMin>=m?this.min=this.options.minRange?Math.min(m,this.max-this.minRange):m:!C(A)&&this.max>m&&this.dataMax<=m&&(this.max=this.options.minRange?Math.max(m,this.min+this.minRange):m));h(this.min)&&h(this.max)&&!this.chart.polar&&this.min>this.max&&(C(this.options.min)?this.max=this.min:C(this.options.max)&&(this.min=this.max));this.tickInterval=this.min===this.max||"undefined"===typeof this.min||"undefined"===typeof this.max?1:f&&
this.linkedParent&&!z&&p===this.linkedParent.options.tickPixelInterval?z=this.linkedParent.tickInterval:w(z,this.tickAmount?(this.max-this.min)/Math.max(this.tickAmount-1,1):void 0,y?1:(this.max-this.min)*p/Math.max(this.len,p));if(k&&!b){var O=this.min!==(this.old&&this.old.min)||this.max!==(this.old&&this.old.max);this.series.forEach(function(b){b.forceCrop=b.forceCropping&&b.forceCropping();b.processData(O)});d(this,"postProcessData",{hasExtremesChanged:O})}this.setAxisTranslation();d(this,"initialAxisTranslation");
this.pointRange&&!z&&(this.tickInterval=Math.max(this.pointRange,this.tickInterval));b=w(e.minTickInterval,this.dateTime&&!this.series.some(function(b){return b.noSharedTooltip})?this.closestPointRange:0);!z&&this.tickInterval<b&&(this.tickInterval=b);this.dateTime||this.logarithmic||z||(this.tickInterval=S(this,this.tickInterval));this.tickAmount||(this.tickInterval=this.unsquish());this.setTickPositions()};a.prototype.setTickPositions=function(){var b=this.options,a=b.tickPositions,c=b.tickPositioner,
e=this.getMinorTickInterval(),k=this.hasVerticalPanning(),f="colorAxis"===this.coll,p=(f||!k)&&b.startOnTick;k=(f||!k)&&b.endOnTick;f=[];var l;this.tickmarkOffset=this.categories&&"between"===b.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===e&&this.tickInterval?this.tickInterval/5:e;this.single=this.min===this.max&&C(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==b.allowDecimals);if(a)f=a.slice();else if(h(this.min)&&h(this.max)){if(this.ordinal&&
this.ordinal.positions||!((this.max-this.min)/this.tickInterval>Math.max(2*this.len,200)))if(this.dateTime)f=this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval,b.units),this.min,this.max,b.startOfWeek,this.ordinal&&this.ordinal.positions,this.closestPointRange,!0);else if(this.logarithmic)f=this.logarithmic.getLogTickPositions(this.tickInterval,this.min,this.max);else for(e=b=this.tickInterval;e<=2*b;)if(f=this.getLinearTickPositions(this.tickInterval,this.min,this.max),this.tickAmount&&
f.length>this.tickAmount)this.tickInterval=S(this,e*=1.1);else break;else f=[this.min,this.max],v(19,!1,this.chart);f.length>this.len&&(f=[f[0],f[f.length-1]],f[0]===f[1]&&(f.length=1));c&&(this.tickPositions=f,(l=c.apply(this,[this.min,this.max]))&&(f=l))}this.tickPositions=f;this.paddedTicks=f.slice(0);this.trimTicks(f,p,k);!this.isLinked&&h(this.min)&&h(this.max)&&(this.single&&2>f.length&&!this.categories&&!this.series.some(function(b){return b.is("heatmap")&&"between"===b.options.pointPlacement})&&
(this.min-=.5,this.max+=.5),a||l||this.adjustTickAmount());d(this,"afterSetTickPositions")};a.prototype.trimTicks=function(b,a,h){var c=b[0],e=b[b.length-1],f=!this.isOrdinal&&this.minPointOffset||0;d(this,"trimTicks");if(!this.isLinked){if(a&&-Infinity!==c)this.min=c;else for(;this.min-f>b[0];)b.shift();if(h)this.max=e;else for(;this.max+f<b[b.length-1];)b.pop();0===b.length&&C(c)&&!this.options.tickPositions&&b.push((e+c)/2)}};a.prototype.alignToOthers=function(){var b=this,d=[this],a=b.options,
c="yAxis"===this.coll&&this.chart.options.chart.alignThresholds,e=[],f;b.thresholdAlignment=void 0;if((!1!==this.chart.options.chart.alignTicks&&a.alignTicks||c)&&!1!==a.startOnTick&&!1!==a.endOnTick&&!b.logarithmic){var k=function(b){var d=b.options;return[b.horiz?d.left:d.top,d.width,d.height,d.pane].join()},p=k(this);this.chart[this.coll].forEach(function(a){var h=a.series;h.length&&h.some(function(b){return b.visible})&&a!==b&&k(a)===p&&(f=!0,d.push(a))})}if(f&&c){d.forEach(function(d){d=d.getThresholdAlignment(b);
h(d)&&e.push(d)});var l=1<e.length?e.reduce(function(b,d){return b+d},0)/e.length:void 0;d.forEach(function(b){b.thresholdAlignment=l})}return f};a.prototype.getThresholdAlignment=function(b){(!h(this.dataMin)||this!==b&&this.series.some(function(b){return b.isDirty||b.isDirtyData}))&&this.getSeriesExtremes();if(h(this.threshold))return b=e((this.threshold-(this.dataMin||0))/((this.dataMax||0)-(this.dataMin||0)),0,1),this.options.reversed&&(b=1-b),b};a.prototype.getTickAmount=function(){var b=this.options,
d=b.tickPixelInterval,a=b.tickAmount;!C(b.tickInterval)&&!a&&this.len<d&&!this.isRadial&&!this.logarithmic&&b.startOnTick&&b.endOnTick&&(a=2);!a&&this.alignToOthers()&&(a=Math.ceil(this.len/d)+1);4>a&&(this.finalTickAmt=a,a=5);this.tickAmount=a};a.prototype.adjustTickAmount=function(){var b=this,d=b.finalTickAmt,a=b.max,c=b.min,e=b.options,f=b.tickPositions,k=b.tickAmount,p=b.thresholdAlignment,l=f&&f.length,g=w(b.threshold,b.softThreshold?0:null);var q=b.tickInterval;if(h(p)){var z=.5>p?Math.ceil(p*
(k-1)):Math.floor(p*(k-1));e.reversed&&(z=k-1-z)}if(b.hasData()&&h(c)&&h(a)){p=function(){b.transA*=(l-1)/(k-1);b.min=e.startOnTick?f[0]:Math.min(c,f[0]);b.max=e.endOnTick?f[f.length-1]:Math.max(a,f[f.length-1])};if(h(z)&&h(b.threshold)){for(;f[z]!==g||f.length!==k||f[0]>c||f[f.length-1]<a;){f.length=0;for(f.push(b.threshold);f.length<k;)void 0===f[z]||f[z]>b.threshold?f.unshift(u(f[0]-q)):f.push(u(f[f.length-1]+q));if(q>8*b.tickInterval)break;q*=2}p()}else if(l<k){for(;f.length<k;)f.length%2||c===
g?f.push(u(f[f.length-1]+q)):f.unshift(u(f[0]-q));p()}if(C(d)){for(q=g=f.length;q--;)(3===d&&1===q%2||2>=d&&0<q&&q<g-1)&&f.splice(q,1);b.finalTickAmt=void 0}}};a.prototype.setScale=function(){var b=!1,a=!1;this.series.forEach(function(d){b=b||d.isDirtyData||d.isDirty;a=a||d.xAxis&&d.xAxis.isDirty||!1});this.setAxisSize();var h=this.len!==(this.old&&this.old.len);h||b||a||this.isLinked||this.forceRedraw||this.userMin!==(this.old&&this.old.userMin)||this.userMax!==(this.old&&this.old.userMax)||this.alignToOthers()?
(this.stacking&&this.stacking.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.isDirty||(this.isDirty=h||this.min!==(this.old&&this.old.min)||this.max!==(this.old&&this.old.max))):this.stacking&&this.stacking.cleanStacks();b&&this.panningState&&(this.panningState.isDirty=!0);d(this,"afterSetScale")};a.prototype.setExtremes=function(b,a,h,c,e){var f=this,k=f.chart;h=w(h,!0);f.series.forEach(function(b){delete b.kdTree});e=A(e,{min:b,max:a});d(f,"setExtremes",e,
function(){f.userMin=b;f.userMax=a;f.eventArgs=e;h&&k.redraw(c)})};a.prototype.zoom=function(b,a){var h=this,c=this.dataMin,e=this.dataMax,f=this.options,k=Math.min(c,w(f.min,c)),p=Math.max(e,w(f.max,e));b={newMin:b,newMax:a};d(this,"zoom",b,function(b){var d=b.newMin,a=b.newMax;if(d!==h.min||a!==h.max)h.allowZoomOutside||(C(c)&&(d<k&&(d=k),d>p&&(d=p)),C(e)&&(a<k&&(a=k),a>p&&(a=p))),h.displayBtn="undefined"!==typeof d||"undefined"!==typeof a,h.setExtremes(d,a,!1,void 0,{trigger:"zoom"});b.zoomed=
!0});return b.zoomed};a.prototype.setAxisSize=function(){var b=this.chart,d=this.options,a=d.offsets||[0,0,0,0],h=this.horiz,c=this.width=Math.round(N(w(d.width,b.plotWidth-a[3]+a[1]),b.plotWidth)),e=this.height=Math.round(N(w(d.height,b.plotHeight-a[0]+a[2]),b.plotHeight)),f=this.top=Math.round(N(w(d.top,b.plotTop+a[0]),b.plotHeight,b.plotTop));d=this.left=Math.round(N(w(d.left,b.plotLeft+a[3]),b.plotWidth,b.plotLeft));this.bottom=b.chartHeight-e-f;this.right=b.chartWidth-c-d;this.len=Math.max(h?
c:e,0);this.pos=h?d:f};a.prototype.getExtremes=function(){var b=this.logarithmic;return{min:b?u(b.lin2log(this.min)):this.min,max:b?u(b.lin2log(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}};a.prototype.getThreshold=function(b){var d=this.logarithmic,a=d?d.lin2log(this.min):this.min;d=d?d.lin2log(this.max):this.max;null===b||-Infinity===b?b=a:Infinity===b?b=d:a>b?b=a:d<b&&(b=d);return this.translate(b,0,1,0,1)};a.prototype.autoLabelAlign=
function(b){var a=(w(b,0)-90*this.side+720)%360;b={align:"center"};d(this,"autoLabelAlign",b,function(b){15<a&&165>a?b.align="right":195<a&&345>a&&(b.align="left")});return b.align};a.prototype.tickSize=function(b){var a=this.options,h=w(a["tick"===b?"tickWidth":"minorTickWidth"],"tick"===b&&this.isXAxis&&!this.categories?1:0),c=a["tick"===b?"tickLength":"minorTickLength"];if(h&&c){"inside"===a[b+"Position"]&&(c=-c);var e=[c,h]}b={tickSize:e};d(this,"afterTickSize",b);return b.tickSize};a.prototype.labelMetrics=
function(){var b=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize,this.ticks[b]&&this.ticks[b].label)};a.prototype.unsquish=function(){var b=this.options.labels,d=this.horiz,a=this.tickInterval,e=this.len/(((this.categories?1:0)+this.max-this.min)/a),f=b.rotation,k=this.labelMetrics(),p=Math.max(this.max-this.min,0),l=function(b){var d=b/(e||1);d=1<d?Math.ceil(d):1;d*a>p&&Infinity!==b&&Infinity!==e&&p&&(d=Math.ceil(p/a));return u(d*
a)},g=a,q=Number.MAX_VALUE;if(d){if(!b.staggerLines)if(h(f))var z=[f];else e<b.autoRotationLimit&&(z=b.autoRotation);if(z)for(var m=d=void 0,n=0,A=z;n<A.length;n++){var H=A[n];if(H===f||H&&-90<=H&&90>=H)if(d=l(Math.abs(k.h/Math.sin(c*H))),m=d+Math.abs(H/360),m<q){q=m;var N=H;g=d}}}else g=l(k.h);this.autoRotation=z;this.labelRotation=w(N,h(f)?f:0);return b.step?a:g};a.prototype.getSlotWidth=function(b){var d=this.chart,a=this.horiz,c=this.options.labels,e=Math.max(this.tickPositions.length-(this.categories?
0:1),1),f=d.margin[3];if(b&&h(b.slotWidth))return b.slotWidth;if(a&&2>c.step)return c.rotation?0:(this.staggerLines||1)*this.len/e;if(!a){b=c.style.width;if(void 0!==b)return parseInt(String(b),10);if(f)return f-d.spacing[3]}return.33*d.chartWidth};a.prototype.renderUnsquish=function(){var b=this.chart,d=b.renderer,a=this.tickPositions,h=this.ticks,c=this.options.labels,e=c.style,f=this.horiz,p=this.getSlotWidth(),l=Math.max(1,Math.round(p-2*c.padding)),g={},q=this.labelMetrics(),z=e.textOverflow,
w=0;k(c.rotation)||(g.rotation=c.rotation||0);a.forEach(function(b){b=h[b];b.movedLabel&&b.replaceMovedLabel();b&&b.label&&b.label.textPxLength>w&&(w=b.label.textPxLength)});this.maxLabelLength=w;if(this.autoRotation)w>l&&w>q.h?g.rotation=this.labelRotation:this.labelRotation=0;else if(p){var m=l;if(!z){var u="clip";for(l=a.length;!f&&l--;){var n=a[l];if(n=h[n].label)n.styles&&"ellipsis"===n.styles.textOverflow?n.css({textOverflow:"clip"}):n.textPxLength>p&&n.css({width:p+"px"}),n.getBBox().height>
this.len/a.length-(q.h-q.f)&&(n.specificTextOverflow="ellipsis")}}}g.rotation&&(m=w>.5*b.chartHeight?.33*b.chartHeight:w,z||(u="ellipsis"));if(this.labelAlign=c.align||this.autoLabelAlign(this.labelRotation))g.align=this.labelAlign;a.forEach(function(b){var d=(b=h[b])&&b.label,a=e.width,c={};d&&(d.attr(g),b.shortenLabel?b.shortenLabel():m&&!a&&"nowrap"!==e.whiteSpace&&(m<d.textPxLength||"SPAN"===d.element.tagName)?(c.width=m+"px",z||(c.textOverflow=d.specificTextOverflow||u),d.css(c)):d.styles&&d.styles.width&&
!c.width&&!a&&d.css({width:null}),delete d.specificTextOverflow,b.rotation=g.rotation)},this);this.tickRotCorr=d.rotCorr(q.b,this.labelRotation||0,0!==this.side)};a.prototype.hasData=function(){return this.series.some(function(b){return b.hasData()})||this.options.showEmpty&&C(this.min)&&C(this.max)};a.prototype.addTitle=function(d){var a=this.chart.renderer,c=this.horiz,h=this.opposite,e=this.options.title,f=this.chart.styledMode,k;this.axisTitle||((k=e.textAlign)||(k=(c?{low:"left",middle:"center",
high:"right"}:{low:h?"right":"left",middle:"center",high:h?"left":"right"})[e.align]),this.axisTitle=a.text(e.text||"",0,0,e.useHTML).attr({zIndex:7,rotation:e.rotation,align:k}).addClass("highcharts-axis-title"),f||this.axisTitle.css(b(e.style)),this.axisTitle.add(this.axisGroup),this.axisTitle.isNew=!0);f||e.style.width||this.isRadial||this.axisTitle.css({width:this.len+"px"});this.axisTitle[d?"show":"hide"](d)};a.prototype.generateTick=function(b){var d=this.ticks;d[b]?d[b].addLabel():d[b]=new G(this,
b)};a.prototype.getOffset=function(){var b=this,a=this,c=a.chart,h=a.horiz,e=a.options,f=a.side,k=a.ticks,p=a.tickPositions,l=a.coll,g=a.axisParent,q=c.renderer,m=c.inverted&&!a.isZAxis?[1,0,3,2][f]:f,u=a.hasData(),n=e.title,A=e.labels,H=c.axisOffset;c=c.clipOffset;var N=[-1,1,1,-1][f],O=e.className,t,r=0,ja=0,ea=0;a.showAxis=t=u||e.showEmpty;a.staggerLines=a.horiz&&A.staggerLines||void 0;if(!a.axisGroup){var Q=function(d,a,c){return q.g(d).attr({zIndex:c}).addClass("highcharts-".concat(l.toLowerCase()).concat(a,
" ")+(b.isRadial?"highcharts-radial-axis".concat(a," "):"")+(O||"")).add(g)};a.gridGroup=Q("grid","-grid",e.gridZIndex);a.axisGroup=Q("axis","",e.zIndex);a.labelGroup=Q("axis-labels","-labels",A.zIndex)}u||a.isLinked?(p.forEach(function(b){a.generateTick(b)}),a.renderUnsquish(),a.reserveSpaceDefault=0===f||2===f||{1:"left",3:"right"}[f]===a.labelAlign,w(A.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&p.forEach(function(b){ea=Math.max(k[b].getLabelSize(),ea)}),a.staggerLines&&
(ea*=a.staggerLines),a.labelOffset=ea*(a.opposite?-1:1)):z(k,function(b,d){b.destroy();delete k[d]});if(n&&n.text&&!1!==n.enabled&&(a.addTitle(t),t&&!1!==n.reserveSpace)){a.titleOffset=r=a.axisTitle.getBBox()[h?"height":"width"];var J=n.offset;ja=C(J)?0:w(n.margin,h?5:10)}a.renderLine();a.offset=N*w(e.offset,H[f]?H[f]+(e.margin||0):0);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};n=0===f?-a.labelMetrics().h:2===f?a.tickRotCorr.y:0;u=Math.abs(ea)+ja;ea&&(u=u-n+N*(h?w(A.y,a.tickRotCorr.y+8*N):A.x));a.axisTitleMargin=
w(J,u);a.getMaxLabelDimensions&&(a.maxLabelDimensions=a.getMaxLabelDimensions(k,p));"colorAxis"!==l&&(h=this.tickSize("tick"),H[f]=Math.max(H[f],(a.axisTitleMargin||0)+r+N*a.offset,u,p&&p.length&&h?h[0]+N*a.offset:0),e=!a.axisLine||e.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2),c[m]=Math.max(c[m],e));d(this,"afterGetOffset")};a.prototype.getLinePath=function(b){var d=this.chart,a=this.opposite,c=this.offset,h=this.horiz,e=this.left+(a?this.width:0)+c;c=d.chartHeight-this.bottom-(a?this.height:
0)+c;a&&(b*=-1);return d.renderer.crispLine([["M",h?this.left:e,h?c:this.top],["L",h?d.chartWidth-this.right:e,h?c:d.chartHeight-this.bottom]],b)};a.prototype.renderLine=function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.chart.styledMode||this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))};a.prototype.getTitlePosition=function(){var b=this.horiz,a=this.left,c=this.top,h=this.len,
e=this.options.title,f=b?a:c,k=this.opposite,p=this.offset,l=e.x,g=e.y,q=this.axisTitle,z=this.chart.renderer.fontMetrics(e.style.fontSize,q);q=q?Math.max(q.getBBox(!1,0).height-z.h-1,0):0;h={low:f+(b?0:h),middle:f+h/2,high:f+(b?h:0)}[e.align];a=(b?c+this.height:a)+(b?1:-1)*(k?-1:1)*(this.axisTitleMargin||0)+[-q,q,z.f,-q][this.side];b={x:b?h+l:a+(k?this.width:0)+p+l,y:b?a+g-(k?this.height:0)+p:h+g};d(this,"afterGetTitlePosition",{titlePosition:b});return b};a.prototype.renderMinorTick=function(b,
d){var a=this.minorTicks;a[b]||(a[b]=new G(this,b,"minor"));d&&a[b].isNew&&a[b].render(null,!0);a[b].render(null,!1,1)};a.prototype.renderTick=function(b,d,a){var c=this.ticks;if(!this.isLinked||b>=this.min&&b<=this.max||this.grid&&this.grid.isColumn)c[b]||(c[b]=new G(this,b)),a&&c[b].isNew&&c[b].render(d,!0,-1),c[b].render(d)};a.prototype.render=function(){var b=this,a=b.chart,c=b.logarithmic,e=b.options,f=b.isLinked,k=b.tickPositions,p=b.axisTitle,l=b.ticks,g=b.minorTicks,q=b.alternateBands,w=e.stackLabels,
m=e.alternateGridColor,u=b.tickmarkOffset,n=b.axisLine,A=b.showAxis,H=t(a.renderer.globalAnimation),N,O;b.labelEdge.length=0;b.overlap=!1;[l,g,q].forEach(function(b){z(b,function(b){b.isActive=!1})});if(b.hasData()||f){var C=b.chart.hasRendered&&b.old&&h(b.old.min);b.minorTickInterval&&!b.categories&&b.getMinorTickPositions().forEach(function(d){b.renderMinorTick(d,C)});k.length&&(k.forEach(function(d,a){b.renderTick(d,a,C)}),u&&(0===b.min||b.single)&&(l[-1]||(l[-1]=new G(b,-1,null,!0)),l[-1].render(-1)));
m&&k.forEach(function(d,h){O="undefined"!==typeof k[h+1]?k[h+1]+u:b.max-u;0===h%2&&d<b.max&&O<=b.max+(a.polar?-u:u)&&(q[d]||(q[d]=new B.PlotLineOrBand(b)),N=d+u,q[d].options={from:c?c.lin2log(N):N,to:c?c.lin2log(O):O,color:m,className:"highcharts-alternate-grid"},q[d].render(),q[d].isActive=!0)});b._addedPlotLB||(b._addedPlotLB=!0,(e.plotLines||[]).concat(e.plotBands||[]).forEach(function(d){b.addPlotBandOrLine(d)}))}[l,g,q].forEach(function(b){var d=[],c=H.duration;z(b,function(b,a){b.isActive||
(b.render(a,!1,0),b.isActive=!1,d.push(a))});Q(function(){for(var a=d.length;a--;)b[d[a]]&&!b[d[a]].isActive&&(b[d[a]].destroy(),delete b[d[a]])},b!==q&&a.hasRendered&&c?c:0)});n&&(n[n.isPlaced?"animate":"attr"]({d:this.getLinePath(n.strokeWidth())}),n.isPlaced=!0,n[A?"show":"hide"](A));p&&A&&(e=b.getTitlePosition(),p[p.isNew?"attr":"animate"](e),p.isNew=!1);w&&w.enabled&&b.stacking&&b.stacking.renderStackTotals();b.old={len:b.len,max:b.max,min:b.min,transA:b.transA,userMax:b.userMax,userMin:b.userMin};
b.isDirty=!1;d(this,"afterRender")};a.prototype.redraw=function(){this.visible&&(this.render(),this.plotLinesAndBands.forEach(function(b){b.render()}));this.series.forEach(function(b){b.isDirty=!0})};a.prototype.getKeepProps=function(){return this.keepProps||a.keepProps};a.prototype.destroy=function(b){var a=this,c=a.plotLinesAndBands,h=this.eventOptions;d(this,"destroy",{keepEvents:b});b||H(a);[a.ticks,a.minorTicks,a.alternateBands].forEach(function(b){J(b)});if(c)for(b=c.length;b--;)c[b].destroy();
"axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(b){a[b]&&(a[b]=a[b].destroy())});for(var e in a.plotLinesAndBandsGroups)a.plotLinesAndBandsGroups[e]=a.plotLinesAndBandsGroups[e].destroy();z(a,function(b,d){-1===a.getKeepProps().indexOf(d)&&delete a[d]});this.eventOptions=h};a.prototype.drawCrosshair=function(b,a){var c=this.crosshair,h=w(c&&c.snap,!0),e=this.chart,f,k=this.cross;d(this,"drawCrosshair",{e:b,point:a});b||(b=this.cross&&this.cross.e);if(c&&
!1!==(C(a)||!h)){h?C(a)&&(f=w("colorAxis"!==this.coll?a.crosshairPos:null,this.isXAxis?a.plotX:this.len-a.plotY)):f=b&&(this.horiz?b.chartX-this.pos:this.len-b.chartY+this.pos);if(C(f)){var p={value:a&&(this.isXAxis?a.x:w(a.stackY,a.y)),translatedValue:f};e.polar&&A(p,{isCrosshair:!0,chartX:b&&b.chartX,chartY:b&&b.chartY,point:a});p=this.getPlotLinePath(p)||null}if(!C(p)){this.hideCrosshair();return}h=this.categories&&!this.isRadial;k||(this.cross=k=e.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+
(h?"category ":"thin ")+(c.className||"")).attr({zIndex:w(c.zIndex,2)}).add(),e.styledMode||(k.attr({stroke:c.color||(h?x.parse("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":w(c.width,1)}).css({"pointer-events":"none"}),c.dashStyle&&k.attr({dashstyle:c.dashStyle})));k.show().attr({d:p});h&&!c.width&&k.attr({"stroke-width":this.transA});this.cross.e=b}else this.hideCrosshair();d(this,"afterDrawCrosshair",{e:b,point:a})};a.prototype.hideCrosshair=function(){this.cross&&this.cross.hide();
d(this,"afterHideCrosshair")};a.prototype.hasVerticalPanning=function(){var b=this.chart.options.chart.panning;return!!(b&&b.enabled&&/y/.test(b.type))};a.prototype.validatePositiveValue=function(b){return h(b)&&0<b};a.prototype.update=function(d,a){var c=this.chart;d=b(this.userOptions,d);this.destroy(!0);this.init(c,d);c.isDirtyBox=!0;w(a,!0)&&c.redraw()};a.prototype.remove=function(b){for(var d=this.chart,a=this.coll,c=this.series,h=c.length;h--;)c[h]&&c[h].remove(!1);I(d.axes,this);I(d[a],this);
d[a].forEach(function(b,d){b.options.index=b.userOptions.index=d});this.destroy();d.isDirtyBox=!0;w(b,!0)&&d.redraw()};a.prototype.setTitle=function(b,d){this.update({title:b},d)};a.prototype.setCategories=function(b,d){this.update({categories:b},d)};a.defaultOptions=g.defaultXAxisOptions;a.keepProps="extKey hcEvents names series userMax userMin".split(" ");return a}();"";return a});K(g,"Core/Axis/DateTimeAxis.js",[g["Core/Utilities.js"]],function(a){var g=a.addEvent,x=a.getMagnitude,E=a.normalizeTickInterval,
D=a.timeUnits,B;(function(a){function r(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)}function t(a){"datetime"!==a.userOptions.type?this.dateTime=void 0:this.dateTime||(this.dateTime=new f(this))}var n=[];a.compose=function(a){-1===n.indexOf(a)&&(n.push(a),a.keepProps.push("dateTime"),a.prototype.getTimeTicks=r,g(a,"init",t));return a};var f=function(){function a(a){this.axis=a}a.prototype.normalizeTimeTickInterval=function(a,c){var e=c||[["millisecond",[1,2,5,10,20,25,50,
100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];c=e[e.length-1];var f=D[c[0]],l=c[1],g;for(g=0;g<e.length&&!(c=e[g],f=D[c[0]],l=c[1],e[g+1]&&a<=(f*l[l.length-1]+D[e[g+1][0]])/2);g++);f===D.year&&a<5*f&&(l=[1,2,5]);a=E(a/f,l,"year"===c[0]?Math.max(x(a/f),1):1);return{unitRange:f,count:a,unitName:c[0]}};a.prototype.getXDateFormat=function(a,c){var e=this.axis,f=e.chart.time;return e.closestPointRange?
f.getDateFormat(e.closestPointRange,a,e.options.startOfWeek,c)||f.resolveDTLFormat(c.year).main:f.resolveDTLFormat(c.day).main};return a}();a.Additions=f})(B||(B={}));return B});K(g,"Core/Axis/LogarithmicAxis.js",[g["Core/Utilities.js"]],function(a){var g=a.addEvent,x=a.normalizeTickInterval,E=a.pick,D;(function(a){function v(a){var c=this.logarithmic;"logarithmic"!==a.userOptions.type?this.logarithmic=void 0:c||(this.logarithmic=new n(this))}function r(){var a=this.logarithmic;a&&(this.lin2val=function(c){return a.lin2log(c)},
this.val2lin=function(c){return a.log2lin(c)})}var t=[];a.compose=function(a){-1===t.indexOf(a)&&(t.push(a),a.keepProps.push("logarithmic"),g(a,"init",v),g(a,"afterInit",r));return a};var n=function(){function a(a){this.axis=a}a.prototype.getLogTickPositions=function(a,f,g,e){var c=this.axis,l=c.len,m=c.options,n=[];e||(this.minorAutoInterval=void 0);if(.5<=a)a=Math.round(a),n=c.getLinearTickPositions(a,f,g);else if(.08<=a){var t=Math.floor(f),A,d=m=void 0;for(l=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,
2,3,4,5,6,7,8,9];t<g+1&&!d;t++){var q=l.length;for(A=0;A<q&&!d;A++){var h=this.log2lin(this.lin2log(t)*l[A]);h>f&&(!e||m<=g)&&"undefined"!==typeof m&&n.push(m);m>g&&(d=!0);m=h}}}else f=this.lin2log(f),g=this.lin2log(g),a=e?c.getMinorTickInterval():m.tickInterval,a=E("auto"===a?null:a,this.minorAutoInterval,m.tickPixelInterval/(e?5:1)*(g-f)/((e?l/c.tickPositions.length:l)||1)),a=x(a),n=c.getLinearTickPositions(a,f,g).map(this.log2lin),e||(this.minorAutoInterval=a/5);e||(c.tickInterval=a);return n};
a.prototype.lin2log=function(a){return Math.pow(10,a)};a.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};return a}();a.Additions=n})(D||(D={}));return D});K(g,"Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js",[g["Core/Utilities.js"]],function(a){var g=a.erase,x=a.extend,E=a.isNumber,D;(function(a){var v=[],r;a.compose=function(a,f){r||(r=a);-1===v.indexOf(f)&&(v.push(f),x(f.prototype,t.prototype));return f};var t=function(){function a(){}a.prototype.getPlotBandPath=function(a,c,g){void 0===
g&&(g=this.options);var f=this.getPlotLinePath({value:c,force:!0,acrossPanes:g.acrossPanes}),e=[],l=this.horiz;c=!E(this.min)||!E(this.max)||a<this.min&&c<this.min||a>this.max&&c>this.max;a=this.getPlotLinePath({value:a,force:!0,acrossPanes:g.acrossPanes});g=1;if(a&&f){if(c){var n=a.toString()===f.toString();g=0}for(c=0;c<a.length;c+=2){var t=a[c],r=a[c+1],v=f[c],A=f[c+1];"M"!==t[0]&&"L"!==t[0]||"M"!==r[0]&&"L"!==r[0]||"M"!==v[0]&&"L"!==v[0]||"M"!==A[0]&&"L"!==A[0]||(l&&v[1]===t[1]?(v[1]+=g,A[1]+=
g):l||v[2]!==t[2]||(v[2]+=g,A[2]+=g),e.push(["M",t[1],t[2]],["L",r[1],r[2]],["L",A[1],A[2]],["L",v[1],v[2]],["Z"]));e.isFlat=n}}return e};a.prototype.addPlotBand=function(a){return this.addPlotBandOrLine(a,"plotBands")};a.prototype.addPlotLine=function(a){return this.addPlotBandOrLine(a,"plotLines")};a.prototype.addPlotBandOrLine=function(a,c){var f=this,g=this.userOptions,e=new r(this,a);this.visible&&(e=e.render());if(e){this._addedPlotLB||(this._addedPlotLB=!0,(g.plotLines||[]).concat(g.plotBands||
[]).forEach(function(a){f.addPlotBandOrLine(a)}));if(c){var n=g[c]||[];n.push(a);g[c]=n}this.plotLinesAndBands.push(e)}return e};a.prototype.removePlotBandOrLine=function(a){var c=this.plotLinesAndBands,f=this.options,m=this.userOptions;if(c){for(var e=c.length;e--;)c[e].id===a&&c[e].destroy();[f.plotLines||[],m.plotLines||[],f.plotBands||[],m.plotBands||[]].forEach(function(c){for(e=c.length;e--;)(c[e]||{}).id===a&&g(c,c[e])})}};a.prototype.removePlotBand=function(a){this.removePlotBandOrLine(a)};
a.prototype.removePlotLine=function(a){this.removePlotBandOrLine(a)};return a}()})(D||(D={}));return D});K(g,"Core/Axis/PlotLineOrBand/PlotLineOrBand.js",[g["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"],g["Core/Utilities.js"]],function(a,g){var v=g.arrayMax,E=g.arrayMin,D=g.defined,B=g.destroyObjectProperties,G=g.erase,r=g.fireEvent,t=g.merge,n=g.objectEach,f=g.pick;g=function(){function c(a,c){this.axis=a;c&&(this.options=c,this.id=c.id)}c.compose=function(f){return a.compose(c,f)};c.prototype.render=
function(){r(this,"render");var a=this,c=a.axis,e=c.horiz,g=c.logarithmic,C=a.options,J=C.color,I=f(C.zIndex,0),v=C.events,A={},d=c.chart.renderer,q=C.label,h=a.label,k=C.to,b=C.from,p=C.value,z=a.svgElem,w=[],N=D(b)&&D(k);w=D(p);var H=!z,O={"class":"highcharts-plot-"+(N?"band ":"line ")+(C.className||"")},Q=N?"bands":"lines";g&&(b=g.log2lin(b),k=g.log2lin(k),p=g.log2lin(p));c.chart.styledMode||(w?(O.stroke=J||"#999999",O["stroke-width"]=f(C.width,1),C.dashStyle&&(O.dashstyle=C.dashStyle)):N&&(O.fill=
J||"#e6ebf5",C.borderWidth&&(O.stroke=C.borderColor,O["stroke-width"]=C.borderWidth)));A.zIndex=I;Q+="-"+I;(g=c.plotLinesAndBandsGroups[Q])||(c.plotLinesAndBandsGroups[Q]=g=d.g("plot-"+Q).attr(A).add());H&&(a.svgElem=z=d.path().attr(O).add(g));if(w)w=c.getPlotLinePath({value:p,lineWidth:z.strokeWidth(),acrossPanes:C.acrossPanes});else if(N)w=c.getPlotBandPath(b,k,C);else return;!a.eventsAdded&&v&&(n(v,function(b,d){z.on(d,function(b){v[d].apply(a,[b])})}),a.eventsAdded=!0);(H||!z.d)&&w&&w.length?
z.attr({d:w}):z&&(w?(z.show(),z.animate({d:w})):z.d&&(z.hide(),h&&(a.label=h=h.destroy())));q&&(D(q.text)||D(q.formatter))&&w&&w.length&&0<c.width&&0<c.height&&!w.isFlat?(q=t({align:e&&N&&"center",x:e?!N&&4:10,verticalAlign:!e&&N&&"middle",y:e?N?16:10:N?6:-4,rotation:e&&!N&&90},q),this.renderLabel(q,w,N,I)):h&&h.hide();return a};c.prototype.renderLabel=function(a,c,e,f){var g=this.axis,l=g.chart.renderer,m=this.label;m||(this.label=m=l.text(this.getLabelText(a),0,0,a.useHTML).attr({align:a.textAlign||
a.align,rotation:a.rotation,"class":"highcharts-plot-"+(e?"band":"line")+"-label "+(a.className||""),zIndex:f}).add(),g.chart.styledMode||m.css(t({textOverflow:"ellipsis"},a.style)));f=c.xBounds||[c[0][1],c[1][1],e?c[2][1]:c[0][1]];c=c.yBounds||[c[0][2],c[1][2],e?c[2][2]:c[0][2]];e=E(f);l=E(c);m.align(a,!1,{x:e,y:l,width:v(f)-e,height:v(c)-l});m.alignValue&&"left"!==m.alignValue||m.css({width:(90===m.rotation?g.height-(m.alignAttr.y-g.top):g.width-(m.alignAttr.x-g.left))+"px"});m.show(!0)};c.prototype.getLabelText=
function(a){return D(a.formatter)?a.formatter.call(this):a.text};c.prototype.destroy=function(){G(this.axis.plotLinesAndBands,this);delete this.axis;B(this)};return c}();"";"";return g});K(g,"Core/Tooltip.js",[g["Core/FormatUtilities.js"],g["Core/Globals.js"],g["Core/Renderer/RendererUtilities.js"],g["Core/Renderer/RendererRegistry.js"],g["Core/Utilities.js"]],function(a,g,x,E,D){var v=a.format,G=g.doc,r=x.distribute,t=D.clamp,n=D.css,f=D.discardElement,c=D.extend,l=D.fireEvent,m=D.isArray,e=D.isNumber,
u=D.isString,C=D.merge,J=D.pick,I=D.splat,L=D.syncTimeout;a=function(){function a(a,c){this.allowShared=!0;this.container=void 0;this.crosshairs=[];this.distance=0;this.isHidden=!0;this.isSticky=!1;this.now={};this.options={};this.outside=!1;this.chart=a;this.init(a,c)}a.prototype.applyFilter=function(){var a=this.chart;a.renderer.definition({tagName:"filter",attributes:{id:"drop-shadow-"+a.index,opacity:.5},children:[{tagName:"feGaussianBlur",attributes:{"in":"SourceAlpha",stdDeviation:1}},{tagName:"feOffset",
attributes:{dx:1,dy:1}},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",attributes:{type:"linear",slope:.3}}]},{tagName:"feMerge",children:[{tagName:"feMergeNode"},{tagName:"feMergeNode",attributes:{"in":"SourceGraphic"}}]}]})};a.prototype.bodyFormatter=function(a){return a.map(function(a){var d=a.series.tooltipOptions;return(d[(a.point.formatPrefix||"point")+"Formatter"]||a.point.tooltipFormatter).call(a.point,d[(a.point.formatPrefix||"point")+"Format"]||"")})};a.prototype.cleanSplit=
function(a){this.chart.series.forEach(function(d){var c=d&&d.tt;c&&(!c.isActive||a?d.tt=c.destroy():c.isActive=!1)})};a.prototype.defaultFormatter=function(a){var d=this.points||I(this);var c=[a.tooltipFooterHeaderFormatter(d[0])];c=c.concat(a.bodyFormatter(d));c.push(a.tooltipFooterHeaderFormatter(d[0],!0));return c};a.prototype.destroy=function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(!0),this.tt=this.tt.destroy());this.renderer&&(this.renderer=this.renderer.destroy(),
f(this.container));D.clearTimeout(this.hideTimer);D.clearTimeout(this.tooltipTimeout)};a.prototype.getAnchor=function(a,c){var d=this.chart,e=d.pointer,b=d.inverted,f=d.plotTop,g=d.plotLeft,l,q,m=0,n=0;a=I(a);this.followPointer&&c?("undefined"===typeof c.chartX&&(c=e.normalize(c)),e=[c.chartX-g,c.chartY-f]):a[0].tooltipPos?e=a[0].tooltipPos:(a.forEach(function(a){l=a.series.yAxis;q=a.series.xAxis;m+=a.plotX||0;n+=a.plotLow?(a.plotLow+(a.plotHigh||0))/2:a.plotY||0;q&&l&&(b?(m+=f+d.plotHeight-q.len-
q.pos,n+=g+d.plotWidth-l.len-l.pos):(m+=q.pos-g,n+=l.pos-f))}),m/=a.length,n/=a.length,e=[b?d.plotWidth-n:m,b?d.plotHeight-m:n],this.shared&&1<a.length&&c&&(b?e[0]=c.chartX-g:e[1]=c.chartY-f));return e.map(Math.round)};a.prototype.getClassName=function(a,c,h){var d=a.series,b=d.options;return[this.options.className,"highcharts-label",h&&"highcharts-tooltip-header",c?"highcharts-tooltip-box":"highcharts-tooltip",!h&&"highcharts-color-"+J(a.colorIndex,d.colorIndex),b&&b.className].filter(u).join(" ")};
a.prototype.getLabel=function(){var a=this,c=this.chart.styledMode,h=this.options,e=this.split&&this.allowShared,b=h.style.pointerEvents||(this.shouldStickOnContact()?"auto":"none"),f,l=this.chart.renderer;if(a.label){var w=!a.label.hasClass("highcharts-label");(e&&!w||!e&&w)&&a.destroy()}if(!this.label){if(this.outside){w=this.chart.options.chart.style;var m=E.getRendererType();this.container=f=g.doc.createElement("div");f.className="highcharts-tooltip-container";n(f,{position:"absolute",top:"1px",
pointerEvents:b,zIndex:Math.max(this.options.style.zIndex||0,(w&&w.zIndex||0)+3)});g.doc.body.appendChild(f);this.renderer=l=new m(f,0,0,w,void 0,void 0,l.styledMode)}e?this.label=l.g("tooltip"):(this.label=l.label("",0,0,h.shape,void 0,void 0,h.useHTML,void 0,"tooltip").attr({padding:h.padding,r:h.borderRadius}),c||this.label.attr({fill:h.backgroundColor,"stroke-width":h.borderWidth}).css(h.style).css({pointerEvents:b}).shadow(h.shadow));c&&h.shadow&&(this.applyFilter(),this.label.attr({filter:"url(#drop-shadow-"+
this.chart.index+")"}));if(a.outside&&!a.split){var u=this.label,A=u.xSetter,t=u.ySetter;u.xSetter=function(b){A.call(u,a.distance);f.style.left=b+"px"};u.ySetter=function(b){t.call(u,a.distance);f.style.top=b+"px"}}this.label.attr({zIndex:8}).add()}return this.label};a.prototype.getPosition=function(a,c,h){var d=this.chart,b=this.distance,e={},f=d.inverted&&h.h||0,g=this.outside,l=g?G.documentElement.clientWidth-2*b:d.chartWidth,q=g?Math.max(G.body.scrollHeight,G.documentElement.scrollHeight,G.body.offsetHeight,
G.documentElement.offsetHeight,G.documentElement.clientHeight):d.chartHeight,m=d.pointer.getChartPosition(),n=function(e){var f="x"===e;return[e,f?l:q,f?a:c].concat(g?[f?a*m.scaleX:c*m.scaleY,f?m.left-b+(h.plotX+d.plotLeft)*m.scaleX:m.top-b+(h.plotY+d.plotTop)*m.scaleY,0,f?l:q]:[f?a:c,f?h.plotX+d.plotLeft:h.plotY+d.plotTop,f?d.plotLeft:d.plotTop,f?d.plotLeft+d.plotWidth:d.plotTop+d.plotHeight])},u=n("y"),A=n("x"),y;n=!!h.negative;!d.polar&&d.hoverSeries&&d.hoverSeries.yAxis&&d.hoverSeries.yAxis.reversed&&
(n=!n);var t=!this.followPointer&&J(h.ttBelow,!d.inverted===n),r=function(a,d,c,h,k,p,l){var q=g?"y"===a?b*m.scaleY:b*m.scaleX:b,z=(c-h)/2,w=h<k-b,F=k+b+h<d,n=k-q-c+z;k=k+q-z;if(t&&F)e[a]=k;else if(!t&&w)e[a]=n;else if(w)e[a]=Math.min(l-h,0>n-f?n:n-f);else if(F)e[a]=Math.max(p,k+f+c>d?k:k+f);else return!1},C=function(a,d,c,h,f){var k;f<b||f>d-b?k=!1:e[a]=f<c/2?1:f>d-h/2?d-h-2:f-c/2;return k},v=function(b){var a=u;u=A;A=a;y=b},F=function(){!1!==r.apply(0,u)?!1!==C.apply(0,A)||y||(v(!0),F()):y?e.x=
e.y=0:(v(!0),F())};(d.inverted||1<this.len)&&v();F();return e};a.prototype.hide=function(a){var d=this;D.clearTimeout(this.hideTimer);a=J(a,this.options.hideDelay);this.isHidden||(this.hideTimer=L(function(){d.getLabel().fadeOut(a?void 0:a);d.isHidden=!0},a))};a.prototype.init=function(a,c){this.chart=a;this.options=c;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=c.split&&!a.inverted&&!a.polar;this.shared=c.shared||this.split;this.outside=J(c.outside,!(!a.scrollablePixelsX&&!a.scrollablePixelsY))};
a.prototype.shouldStickOnContact=function(a){return!(this.followPointer||!this.options.stickOnContact||a&&!this.chart.pointer.inClass(a.target,"highcharts-tooltip"))};a.prototype.move=function(a,e,h,f){var b=this,d=b.now,k=!1!==b.options.animation&&!b.isHidden&&(1<Math.abs(a-d.x)||1<Math.abs(e-d.y)),g=b.followPointer||1<b.len;c(d,{x:k?(2*d.x+a)/3:a,y:k?(d.y+e)/2:e,anchorX:g?void 0:k?(2*d.anchorX+h)/3:h,anchorY:g?void 0:k?(d.anchorY+f)/2:f});b.getLabel().attr(d);b.drawTracker();k&&(D.clearTimeout(this.tooltipTimeout),
this.tooltipTimeout=setTimeout(function(){b&&b.move(a,e,h,f)},32))};a.prototype.refresh=function(a,c){var d=this.chart,e=this.options,b=d.pointer,f=I(a),g=f[0],q=[],n=e.formatter||this.defaultFormatter,u=this.shared,A=d.styledMode,t={};if(e.enabled&&g.series){D.clearTimeout(this.hideTimer);this.allowShared=!(!m(a)&&a.series&&a.series.noSharedTooltip);this.followPointer=!this.split&&g.series.tooltipOptions.followPointer;a=this.getAnchor(a,c);var r=a[0],C=a[1];u&&this.allowShared?(b.applyInactiveState(f),
f.forEach(function(b){b.setState("hover");q.push(b.getLabelConfig())}),t={x:g.category,y:g.y},t.points=q):t=g.getLabelConfig();this.len=q.length;n=n.call(t,this);u=g.series;this.distance=J(u.tooltipOptions.distance,16);if(!1===n)this.hide();else{if(this.split&&this.allowShared)this.renderSplit(n,f);else{var y=r,v=C;c&&b.isDirectTouch&&(y=c.chartX-d.plotLeft,v=c.chartY-d.plotTop);if(d.polar||!1===u.options.clip||f.some(function(a){return b.isDirectTouch||a.series.shouldShowTooltip(y,v)}))c=this.getLabel(),
e.style.width&&!A||c.css({width:d.spacingBox.width+"px"}),c.attr({text:n&&n.join?n.join(""):n}),c.addClass(this.getClassName(g),!0),A||c.attr({stroke:e.borderColor||g.color||u.color||"#666666"}),this.updatePosition({plotX:r,plotY:C,negative:g.negative,ttBelow:g.ttBelow,h:a[2]||0});else{this.hide();return}}this.isHidden&&this.label&&this.label.attr({opacity:1}).show();this.isHidden=!1}l(this,"refresh")}};a.prototype.renderSplit=function(a,e){function d(b,a,d,c,h){void 0===h&&(h=!0);d?(a=W?0:ba,b=t(b-
c/2,P.left,P.right-c-(f.outside?U:0))):(a-=Z,b=h?b-c-D:b+D,b=t(b,h?b:P.left,P.right));return{x:b,y:a}}var f=this,b=f.chart,p=f.chart,g=p.chartWidth,l=p.chartHeight,q=p.plotHeight,m=p.plotLeft,n=p.plotTop,A=p.pointer,C=p.scrollablePixelsY;C=void 0===C?0:C;var v=p.scrollablePixelsX,y=p.scrollingContainer;y=void 0===y?{scrollLeft:0,scrollTop:0}:y;var I=y.scrollLeft;y=y.scrollTop;var x=p.styledMode,D=f.distance,B=f.options,F=f.options.positioner,P=f.outside&&"number"!==typeof v?G.documentElement.getBoundingClientRect():
{left:I,right:I+g,top:y,bottom:y+l},M=f.getLabel(),X=this.renderer||b.renderer,W=!(!b.xAxis[0]||!b.xAxis[0].opposite);b=A.getChartPosition();var U=b.left;b=b.top;var Z=n+y,L=0,ba=q-C;u(a)&&(a=[!1,a]);a=a.slice(0,e.length+1).reduce(function(b,a,c){if(!1!==a&&""!==a){c=e[c-1]||{isHeader:!0,plotX:e[0].plotX,plotY:q,series:{}};var h=c.isHeader,k=h?f:c.series;a=a.toString();var p=k.tt,g=c.isHeader;var l=c.series;p||(p={padding:B.padding,r:B.borderRadius},x||(p.fill=B.backgroundColor,p["stroke-width"]=
B.borderWidth),p=X.label("",0,0,B[g?"headerShape":"shape"],void 0,void 0,B.useHTML).addClass(f.getClassName(c,!0,g)).attr(p).add(M));p.isActive=!0;p.attr({text:a});x||p.css(B.style).shadow(B.shadow).attr({stroke:B.borderColor||c.color||l.color||"#333333"});k=k.tt=p;g=k.getBBox();a=g.width+k.strokeWidth();h&&(L=g.height,ba+=L,W&&(Z-=L));l=c.plotX;l=void 0===l?0:l;p=c.plotY;p=void 0===p?0:p;var w=c.series;if(c.isHeader){l=m+l;var z=n+q/2}else{var u=w.xAxis,y=w.yAxis;l=u.pos+t(l,-D,u.len+D);w.shouldShowTooltip(0,
y.pos-n+p,{ignoreX:!0})&&(z=y.pos+p)}l=t(l,P.left-D,P.right+D);"number"===typeof z?(g=g.height+1,p=F?F.call(f,a,g,c):d(l,z,h,a),b.push({align:F?0:void 0,anchorX:l,anchorY:z,boxWidth:a,point:c,rank:J(p.rank,h?1:0),size:g,target:p.y,tt:k,x:p.x})):k.isActive=!1}return b},[]);!F&&a.some(function(b){var a=(f.outside?U:0)+b.anchorX;return a<P.left&&a+b.boxWidth<P.right?!0:a<U-P.left+b.boxWidth&&P.right-a>a})&&(a=a.map(function(b){var a=d(b.anchorX,b.anchorY,b.point.isHeader,b.boxWidth,!1);return c(b,{target:a.y,
x:a.x})}));f.cleanSplit();r(a,ba);var E=U,da=U;a.forEach(function(b){var a=b.x,d=b.boxWidth;b=b.isHeader;b||(f.outside&&U+a<E&&(E=U+a),!b&&f.outside&&E+d>da&&(da=U+a))});a.forEach(function(b){var a=b.x,d=b.anchorX,c=b.pos,h=b.point.isHeader;c={visibility:"undefined"===typeof c?"hidden":"inherit",x:a,y:(c||0)+Z,anchorX:d,anchorY:b.anchorY};if(f.outside&&a<d){var e=U-E;0<e&&(h||(c.x=a+e,c.anchorX=d+e),h&&(c.x=(da-E)/2,c.anchorX=d+e))}b.tt.attr(c)});a=f.container;C=f.renderer;f.outside&&a&&C&&(p=M.getBBox(),
C.setSize(p.width+p.x,p.height+p.y,!1),a.style.left=E+"px",a.style.top=b+"px")};a.prototype.drawTracker=function(){if(this.shouldStickOnContact()){var a=this.chart,c=this.label,h=this.shared?a.hoverPoints:a.hoverPoint;if(c&&h){var e={x:0,y:0,width:0,height:0};h=this.getAnchor(h);var b=c.getBBox();h[0]+=a.plotLeft-c.translateX;h[1]+=a.plotTop-c.translateY;e.x=Math.min(0,h[0]);e.y=Math.min(0,h[1]);e.width=0>h[0]?Math.max(Math.abs(h[0]),b.width-h[0]):Math.max(Math.abs(h[0]),b.width);e.height=0>h[1]?
Math.max(Math.abs(h[1]),b.height-Math.abs(h[1])):Math.max(Math.abs(h[1]),b.height);this.tracker?this.tracker.attr(e):(this.tracker=c.renderer.rect(e).addClass("highcharts-tracker").add(c),a.styledMode||this.tracker.attr({fill:"rgba(0,0,0,0)"}))}}else this.tracker&&this.tracker.destroy()};a.prototype.styledModeFormat=function(a){return a.replace('style="font-size: 10px"','class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"')};
a.prototype.tooltipFooterHeaderFormatter=function(a,c){var d=a.series,f=d.tooltipOptions,b=d.xAxis,p=b&&b.dateTime;b={isFooter:c,labelConfig:a};var g=f.xDateFormat,q=f[c?"footerFormat":"headerFormat"];l(this,"headerFormatter",b,function(b){p&&!g&&e(a.key)&&(g=p.getXDateFormat(a.key,f.dateTimeLabelFormats));p&&g&&(a.point&&a.point.tooltipDateKeys||["key"]).forEach(function(b){q=q.replace("{point."+b+"}","{point."+b+":"+g+"}")});d.chart.styledMode&&(q=this.styledModeFormat(q));b.text=v(q,{point:a,series:d},
this.chart)});return b.text};a.prototype.update=function(a){this.destroy();C(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,C(!0,this.options,a))};a.prototype.updatePosition=function(a){var d=this.chart,c=this.options,e=d.pointer,b=this.getLabel();e=e.getChartPosition();var f=(c.positioner||this.getPosition).call(this,b.width,b.height,a),g=a.plotX+d.plotLeft;a=a.plotY+d.plotTop;if(this.outside){c=c.borderWidth+2*this.distance;this.renderer.setSize(b.width+c,b.height+c,!1);if(1!==
e.scaleX||1!==e.scaleY)n(this.container,{transform:"scale(".concat(e.scaleX,", ").concat(e.scaleY,")")}),g*=e.scaleX,a*=e.scaleY;g+=e.left-f.x;a+=e.top-f.y}this.move(Math.round(f.x),Math.round(f.y||0),g,a)};return a}();"";return a});K(g,"Core/Series/Point.js",[g["Core/Renderer/HTML/AST.js"],g["Core/Animation/AnimationUtilities.js"],g["Core/Defaults.js"],g["Core/FormatUtilities.js"],g["Core/Utilities.js"]],function(a,g,x,E,D){var v=g.animObject,G=x.defaultOptions,r=E.format,t=D.addEvent,n=D.defined,
f=D.erase,c=D.extend,l=D.fireEvent,m=D.getNestedProperty,e=D.isArray,u=D.isFunction,C=D.isNumber,J=D.isObject,I=D.merge,L=D.objectEach,A=D.pick,d=D.syncTimeout,q=D.removeEvent,h=D.uniqueKey;g=function(){function k(){this.category=void 0;this.formatPrefix="point";this.id=void 0;this.isNull=!1;this.percentage=this.options=this.name=void 0;this.selected=!1;this.total=this.shapeArgs=this.series=void 0;this.visible=!0;this.x=void 0}k.prototype.animateBeforeDestroy=function(){var b=this,a={x:b.startXPos,
opacity:0},d=b.getGraphicalProps();d.singular.forEach(function(d){b[d]=b[d].animate("dataLabel"===d?{x:b[d].startXPos,y:b[d].startYPos,opacity:0}:a)});d.plural.forEach(function(a){b[a].forEach(function(a){a.element&&a.animate(c({x:b.startXPos},a.startYPos?{x:a.startXPos,y:a.startYPos}:{}))})})};k.prototype.applyOptions=function(b,a){var d=this.series,h=d.options.pointValKey||d.pointValKey;b=k.prototype.optionsToObject.call(this,b);c(this,b);this.options=this.options?c(this.options,b):b;b.group&&delete this.group;
b.dataLabels&&delete this.dataLabels;h&&(this.y=k.prototype.getNestedProperty.call(this,h));this.formatPrefix=(this.isNull=this.isValid&&!this.isValid())?"null":"point";this.selected&&(this.state="select");"name"in this&&"undefined"===typeof a&&d.xAxis&&d.xAxis.hasNames&&(this.x=d.xAxis.nameToX(this));"undefined"===typeof this.x&&d?this.x="undefined"===typeof a?d.autoIncrement():a:C(b.x)&&d.options.relativeXValue&&(this.x=d.autoIncrement(b.x));return this};k.prototype.destroy=function(){function b(){if(a.graphic||
a.graphics||a.dataLabel||a.dataLabels)q(a),a.destroyElements();for(g in a)a[g]=null}var a=this,c=a.series,h=c.chart;c=c.options.dataSorting;var e=h.hoverPoints,k=v(a.series.chart.renderer.globalAnimation),g;a.legendItem&&h.legend.destroyItem(a);e&&(a.setState(),f(e,a),e.length||(h.hoverPoints=null));if(a===h.hoverPoint)a.onMouseOut();c&&c.enabled?(this.animateBeforeDestroy(),d(b,k.duration)):b();h.pointCount--};k.prototype.destroyElements=function(b){var a=this;b=a.getGraphicalProps(b);b.singular.forEach(function(b){a[b]=
a[b].destroy()});b.plural.forEach(function(b){a[b].forEach(function(b){b.element&&b.destroy()});delete a[b]})};k.prototype.firePointEvent=function(b,a,d){var c=this,h=this.series.options;(h.point.events[b]||c.options&&c.options.events&&c.options.events[b])&&c.importEvents();"click"===b&&h.allowPointSelect&&(d=function(b){c.select&&c.select(null,b.ctrlKey||b.metaKey||b.shiftKey)});l(c,b,a,d)};k.prototype.getClassName=function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+
(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+("undefined"!==typeof this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")};k.prototype.getGraphicalProps=function(b){var a=this,d=[],c={singular:[],plural:[]},h;b=b||{graphic:1,dataLabel:1};b.graphic&&d.push("graphic","shadowGroup");b.dataLabel&&d.push("dataLabel",
"dataLabelPath","dataLabelUpper","connector");for(h=d.length;h--;){var e=d[h];a[e]&&c.singular.push(e)}["graphic","dataLabel","connector"].forEach(function(d){var h=d+"s";b[d]&&a[h]&&c.plural.push(h)});return c};k.prototype.getLabelConfig=function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}};k.prototype.getNestedProperty=function(b){if(b)return 0===
b.indexOf("custom.")?m(b,this.options):this[b]};k.prototype.getZone=function(){var b=this.series,a=b.zones;b=b.zoneAxis||"y";var d,c=0;for(d=a[c];this[b]>=d.value;)d=a[++c];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=d&&d.color&&!this.options.color?d.color:this.nonZonedColor;return d};k.prototype.hasNewShapeType=function(){return(this.graphic&&(this.graphic.symbolName||this.graphic.element.nodeName))!==this.shapeType};k.prototype.init=function(b,a,d){this.series=b;this.applyOptions(a,
d);this.id=n(this.id)?this.id:h();this.resolveColor();b.chart.pointCount++;l(this,"afterInit");return this};k.prototype.isValid=function(){return null!==this.x&&C(this.y)};k.prototype.optionsToObject=function(b){var a=this.series,d=a.options.keys,c=d||a.pointArrayMap||["y"],h=c.length,f={},g=0,l=0;if(C(b)||null===b)f[c[0]]=b;else if(e(b))for(!d&&b.length>h&&(a=typeof b[0],"string"===a?f.name=b[0]:"number"===a&&(f.x=b[0]),g++);l<h;)d&&"undefined"===typeof b[g]||(0<c[l].indexOf(".")?k.prototype.setNestedProperty(f,
b[g],c[l]):f[c[l]]=b[g]),g++,l++;else"object"===typeof b&&(f=b,b.dataLabels&&(a._hasPointLabels=!0),b.marker&&(a._hasPointMarkers=!0));return f};k.prototype.resolveColor=function(){var b=this.series,a=b.chart.styledMode;var d=b.chart.options.chart.colorCount;delete this.nonZonedColor;if(b.options.colorByPoint){if(!a){d=b.options.colors||b.chart.options.colors;var c=d[b.colorCounter];d=d.length}a=b.colorCounter;b.colorCounter++;b.colorCounter===d&&(b.colorCounter=0)}else a||(c=b.color),a=b.colorIndex;
this.colorIndex=A(this.options.colorIndex,a);this.color=A(this.options.color,c)};k.prototype.setNestedProperty=function(b,a,d){d.split(".").reduce(function(b,d,c,h){b[d]=h.length-1===c?a:J(b[d],!0)?b[d]:{};return b[d]},b);return b};k.prototype.shouldDraw=function(){return!this.isNull};k.prototype.tooltipFormatter=function(b){var a=this.series,d=a.tooltipOptions,c=A(d.valueDecimals,""),h=d.valuePrefix||"",e=d.valueSuffix||"";a.chart.styledMode&&(b=a.chart.tooltip.styledModeFormat(b));(a.pointArrayMap||
["y"]).forEach(function(a){a="{point."+a;if(h||e)b=b.replace(RegExp(a+"}","g"),h+a+"}"+e);b=b.replace(RegExp(a+"}","g"),a+":,."+c+"f}")});return r(b,{point:this,series:this.series},a.chart)};k.prototype.update=function(b,a,d,c){function h(){e.applyOptions(b);var c=k&&e.hasMockGraphic;c=null===e.y?!c:c;k&&c&&(e.graphic=k.destroy(),delete e.hasMockGraphic);J(b,!0)&&(k&&k.element&&b&&b.marker&&"undefined"!==typeof b.marker.symbol&&(e.graphic=k.destroy()),b&&b.dataLabels&&e.dataLabel&&(e.dataLabel=e.dataLabel.destroy()),
e.connector&&(e.connector=e.connector.destroy()));l=e.index;f.updateParallelArrays(e,l);p.data[l]=J(p.data[l],!0)||J(b,!0)?e.options:A(b,p.data[l]);f.isDirty=f.isDirtyData=!0;!f.fixedBox&&f.hasCartesianSeries&&(g.isDirtyBox=!0);"point"===p.legendType&&(g.isDirtyLegend=!0);a&&g.redraw(d)}var e=this,f=e.series,k=e.graphic,g=f.chart,p=f.options,l;a=A(a,!0);!1===c?h():e.firePointEvent("update",{options:b},h)};k.prototype.remove=function(b,a){this.series.removePoint(this.series.data.indexOf(this),b,a)};
k.prototype.select=function(b,a){var d=this,c=d.series,h=c.chart;this.selectedStaging=b=A(b,!d.selected);d.firePointEvent(b?"select":"unselect",{accumulate:a},function(){d.selected=d.options.selected=b;c.options.data[c.data.indexOf(d)]=d.options;d.setState(b&&"select");a||h.getSelectedPoints().forEach(function(b){var a=b.series;b.selected&&b!==d&&(b.selected=b.options.selected=!1,a.options.data[a.data.indexOf(b)]=b.options,b.setState(h.hoverPoints&&a.options.inactiveOtherPoints?"inactive":""),b.firePointEvent("unselect"))})});
delete this.selectedStaging};k.prototype.onMouseOver=function(b){var a=this.series.chart,d=a.pointer;b=b?d.normalize(b):d.getChartCoordinatesFromPoint(this,a.inverted);d.runPointActions(b,this)};k.prototype.onMouseOut=function(){var b=this.series.chart;this.firePointEvent("mouseOut");this.series.options.inactiveOtherPoints||(b.hoverPoints||[]).forEach(function(b){b.setState()});b.hoverPoints=b.hoverPoint=null};k.prototype.importEvents=function(){if(!this.hasImportedEvents){var b=this,a=I(b.series.options.point,
b.options).events;b.events=a;L(a,function(a,d){u(a)&&t(b,d,a)});this.hasImportedEvents=!0}};k.prototype.setState=function(b,d){var h=this.series,e=this.state,f=h.options.states[b||"normal"]||{},k=G.plotOptions[h.type].marker&&h.options.marker,g=k&&!1===k.enabled,p=k&&k.states&&k.states[b||"normal"]||{},q=!1===p.enabled,m=this.marker||{},n=h.chart,u=k&&h.markerAttribs,t=h.halo,r,v=h.stateMarkerGraphic;b=b||"";if(!(b===this.state&&!d||this.selected&&"select"!==b||!1===f.enabled||b&&(q||g&&!1===p.enabled)||
b&&m.states&&m.states[b]&&!1===m.states[b].enabled)){this.state=b;u&&(r=h.markerAttribs(this,b));if(this.graphic&&!this.hasMockGraphic){e&&this.graphic.removeClass("highcharts-point-"+e);b&&this.graphic.addClass("highcharts-point-"+b);if(!n.styledMode){e=h.pointAttribs(this,b);var F=A(n.options.chart.animation,f.animation);var P=e.opacity;h.options.inactiveOtherPoints&&C(P)&&((this.dataLabels||[]).forEach(function(b){b&&!b.hasClass("highcharts-data-label-hidden")&&b.animate({opacity:P},F)}),this.connector&&
this.connector.animate({opacity:P},F));this.graphic.animate(e,F)}r&&this.graphic.animate(r,A(n.options.chart.animation,p.animation,k.animation));v&&v.hide()}else{if(b&&p){k=m.symbol||h.symbol;v&&v.currentSymbol!==k&&(v=v.destroy());if(r)if(v)v[d?"animate":"attr"]({x:r.x,y:r.y});else k&&(h.stateMarkerGraphic=v=n.renderer.symbol(k,r.x,r.y,r.width,r.height).add(h.markerGroup),v.currentSymbol=k);!n.styledMode&&v&&"inactive"!==this.state&&v.attr(h.pointAttribs(this,b))}v&&(v[b&&this.isInside?"show":"hide"](),
v.element.point=this,v.addClass(this.getClassName(),!0))}f=f.halo;r=(v=this.graphic||v)&&v.visibility||"inherit";f&&f.size&&v&&"hidden"!==r&&!this.isCluster?(t||(h.halo=t=n.renderer.path().add(v.parentGroup)),t.show()[d?"animate":"attr"]({d:this.haloPath(f.size)}),t.attr({"class":"highcharts-halo highcharts-color-"+A(this.colorIndex,h.colorIndex)+(this.className?" "+this.className:""),visibility:r,zIndex:-1}),t.point=this,n.styledMode||t.attr(c({fill:this.color||h.color,"fill-opacity":f.opacity},
a.filterUserAttributes(f.attributes||{})))):t&&t.point&&t.point.haloPath&&t.animate({d:t.point.haloPath(0)},null,t.hide);l(this,"afterSetState",{state:b})}};k.prototype.haloPath=function(b){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-b,this.plotY-b,2*b,2*b)};return k}();"";return g});K(g,"Core/Pointer.js",[g["Core/Color/Color.js"],g["Core/Globals.js"],g["Core/Tooltip.js"],g["Core/Utilities.js"]],function(a,g,x,E){var v=a.parse,B=g.charts,G=g.noop,r=E.addEvent,t=E.attr,
n=E.css,f=E.defined,c=E.extend,l=E.find,m=E.fireEvent,e=E.isNumber,u=E.isObject,C=E.objectEach,J=E.offset,I=E.pick,L=E.splat;a=function(){function a(a,c){this.lastValidTouch={};this.pinchDown=[];this.runChartClick=!1;this.eventsToUnbind=[];this.chart=a;this.hasDragged=!1;this.options=c;this.init(a,c)}a.prototype.applyInactiveState=function(a){var d=[],c;(a||[]).forEach(function(a){c=a.series;d.push(c);c.linkedParent&&d.push(c.linkedParent);c.linkedSeries&&(d=d.concat(c.linkedSeries));c.navigatorSeries&&
d.push(c.navigatorSeries)});this.chart.series.forEach(function(a){-1===d.indexOf(a)?a.setState("inactive",!0):a.options.inactiveOtherPoints&&a.setAllPointsToState("inactive")})};a.prototype.destroy=function(){var d=this;this.eventsToUnbind.forEach(function(a){return a()});this.eventsToUnbind=[];g.chartCount||(a.unbindDocumentMouseUp&&(a.unbindDocumentMouseUp=a.unbindDocumentMouseUp()),a.unbindDocumentTouchEnd&&(a.unbindDocumentTouchEnd=a.unbindDocumentTouchEnd()));clearInterval(d.tooltipTimeout);
C(d,function(a,c){d[c]=void 0})};a.prototype.getSelectionMarkerAttrs=function(a,c){var d=this,e={args:{chartX:a,chartY:c},attrs:{},shapeType:"rect"};m(this,"getSelectionMarkerAttrs",e,function(b){var h=d.chart,e=d.mouseDownX;e=void 0===e?0:e;var f=d.mouseDownY;f=void 0===f?0:f;var k=d.zoomHor,g=d.zoomVert;b=b.attrs;b.x=h.plotLeft;b.y=h.plotTop;b.width=k?1:h.plotWidth;b.height=g?1:h.plotHeight;k&&(h=a-e,b.width=Math.abs(h),b.x=(0<h?0:h)+e);g&&(h=c-f,b.height=Math.abs(h),b.y=(0<h?0:h)+f)});return e};
a.prototype.drag=function(a){var d=this.chart,c=d.options.chart,e=d.plotLeft,b=d.plotTop,f=d.plotWidth,g=d.plotHeight,l=this.mouseDownX||0,m=this.mouseDownY||0,n=u(c.panning)?c.panning&&c.panning.enabled:c.panning,A=c.panKey&&a[c.panKey+"Key"],t=a.chartX,r=a.chartY,C=this.selectionMarker;C&&C.touch||(t<e?t=e:t>e+f&&(t=e+f),r<b?r=b:r>b+g&&(r=b+g),this.hasDragged=Math.sqrt(Math.pow(l-t,2)+Math.pow(m-r,2)),10<this.hasDragged&&(e=d.isInsidePlot(l-e,m-b,{visiblePlotOnly:!0}),r=this.getSelectionMarkerAttrs(t,
r),t=r.shapeType,r=r.attrs,!d.hasCartesianSeries&&!d.mapView||!this.zoomX&&!this.zoomY||!e||A||C||(this.selectionMarker=C=d.renderer[t](),C.attr({"class":"highcharts-selection-marker",zIndex:7}).add(),d.styledMode||C.attr({fill:c.selectionMarkerFill||v("#335cad").setOpacity(.25).get()})),C&&C.attr(r),e&&!C&&n&&d.pan(a,c.panning)))};a.prototype.dragStart=function(a){var d=this.chart;d.mouseIsDown=a.type;d.cancelClick=!1;d.mouseDownX=this.mouseDownX=a.chartX;d.mouseDownY=this.mouseDownY=a.chartY};a.prototype.getSelectionBox=
function(a){var d={args:{marker:a},result:{}};m(this,"getSelectionBox",d,function(d){d.result={x:a.attr?+a.attr("x"):a.x,y:a.attr?+a.attr("y"):a.y,width:a.attr?a.attr("width"):a.width,height:a.attr?a.attr("height"):a.height}});return d.result};a.prototype.drop=function(a){var d=this,h=this.chart,k=this.hasPinched;if(this.selectionMarker){var b=this.getSelectionBox(this.selectionMarker),g=b.x,l=b.y,w=b.width,u=b.height,A={originalEvent:a,xAxis:[],yAxis:[],x:g,y:l,width:w,height:u},t=!!h.mapView;if(this.hasDragged||
k)h.axes.forEach(function(b){if(b.zoomEnabled&&f(b.min)&&(k||d[{xAxis:"zoomX",yAxis:"zoomY"}[b.coll]])&&e(g)&&e(l)&&e(w)&&e(u)){var c=b.horiz,h="touchend"===a.type?b.minPixelPadding:0,p=b.toValue((c?g:l)+h);c=b.toValue((c?g+w:l+u)-h);A[b.coll].push({axis:b,min:Math.min(p,c),max:Math.max(p,c)});t=!0}}),t&&m(h,"selection",A,function(b){h.zoom(c(b,k?{animation:!1}:null))});e(h.index)&&(this.selectionMarker=this.selectionMarker.destroy());k&&this.scaleGroups()}h&&e(h.index)&&(n(h.container,{cursor:h._cursor}),
h.cancelClick=10<this.hasDragged,h.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])};a.prototype.findNearestKDPoint=function(a,c,h){var d;a.forEach(function(b){var a=!(b.noSharedTooltip&&c)&&0>b.options.findNearestPointBy.indexOf("y");b=b.searchPoint(h,a);if((a=u(b,!0)&&b.series)&&!(a=!u(d,!0))){a=d.distX-b.distX;var e=d.dist-b.dist,f=(b.series.group&&b.series.group.zIndex)-(d.series.group&&d.series.group.zIndex);a=0<(0!==a&&c?a:0!==e?e:0!==f?f:d.series.index>b.series.index?-1:1)}a&&
(d=b)});return d};a.prototype.getChartCoordinatesFromPoint=function(a,c){var d=a.series,f=d.xAxis;d=d.yAxis;var b=a.shapeArgs;if(f&&d){var g=I(a.clientX,a.plotX),l=a.plotY||0;a.isNode&&b&&e(b.x)&&e(b.y)&&(g=b.x,l=b.y);return c?{chartX:d.len+d.pos-l,chartY:f.len+f.pos-g}:{chartX:g+f.pos,chartY:l+d.pos}}if(b&&b.x&&b.y)return{chartX:b.x,chartY:b.y}};a.prototype.getChartPosition=function(){if(this.chartPosition)return this.chartPosition;var a=this.chart.container,c=J(a);this.chartPosition={left:c.left,
top:c.top,scaleX:1,scaleY:1};var h=a.offsetWidth;a=a.offsetHeight;2<h&&2<a&&(this.chartPosition.scaleX=c.width/h,this.chartPosition.scaleY=c.height/a);return this.chartPosition};a.prototype.getCoordinates=function(a){var d={xAxis:[],yAxis:[]};this.chart.axes.forEach(function(c){d[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return d};a.prototype.getHoverData=function(a,c,h,e,b,f){var d=[];e=!(!e||!a);var g=function(a){return a.visible&&!(!b&&a.directTouch)&&
I(a.options.enableMouseTracking,!0)},k={chartX:f?f.chartX:void 0,chartY:f?f.chartY:void 0,shared:b};m(this,"beforeGetHoverData",k);var p=c&&!c.stickyTracking?[c]:h.filter(function(b){return b.stickyTracking&&(k.filter||g)(b)});var q=e||!f?a:this.findNearestKDPoint(p,b,f);c=q&&q.series;q&&(b&&!c.noSharedTooltip?(p=h.filter(function(b){return k.filter?k.filter(b):g(b)&&!b.noSharedTooltip}),p.forEach(function(b){var a=l(b.points,function(b){return b.x===q.x&&!b.isNull});u(a)&&(b.boosted&&b.boost&&(a=
b.boost.getPoint(a)),d.push(a))})):d.push(q));k={hoverPoint:q};m(this,"afterGetHoverData",k);return{hoverPoint:k.hoverPoint,hoverSeries:c,hoverPoints:d}};a.prototype.getPointFromEvent=function(a){a=a.target;for(var d;a&&!d;)d=a.point,a=a.parentNode;return d};a.prototype.onTrackerMouseOut=function(a){a=a.relatedTarget||a.toElement;var d=this.chart.hoverSeries;this.isDirectTouch=!1;if(!(!d||!a||d.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+d.index)&&this.inClass(a,
"highcharts-tracker")))d.onMouseOut()};a.prototype.inClass=function(a,c){for(var d;a;){if(d=t(a,"class")){if(-1!==d.indexOf(c))return!0;if(-1!==d.indexOf("highcharts-container"))return!1}a=a.parentElement}};a.prototype.init=function(a,c){this.options=c;this.chart=a;this.runChartClick=!(!c.chart.events||!c.chart.events.click);this.pinchDown=[];this.lastValidTouch={};x&&(a.tooltip=new x(a,c.tooltip));this.setDOMEvents()};a.prototype.normalize=function(a,e){var d=a.touches,f=d?d.length?d.item(0):I(d.changedTouches,
a.changedTouches)[0]:a;e||(e=this.getChartPosition());d=f.pageX-e.left;f=f.pageY-e.top;d/=e.scaleX;f/=e.scaleY;return c(a,{chartX:Math.round(d),chartY:Math.round(f)})};a.prototype.onContainerClick=function(a){var d=this.chart,h=d.hoverPoint;a=this.normalize(a);var e=d.plotLeft,b=d.plotTop;d.cancelClick||(h&&this.inClass(a.target,"highcharts-tracker")?(m(h.series,"click",c(a,{point:h})),d.hoverPoint&&h.firePointEvent("click",a)):(c(a,this.getCoordinates(a)),d.isInsidePlot(a.chartX-e,a.chartY-b,{visiblePlotOnly:!0})&&
m(d,"click",a)))};a.prototype.onContainerMouseDown=function(a){var d=1===((a.buttons||a.button)&1);a=this.normalize(a);if(g.isFirefox&&0!==a.button)this.onContainerMouseMove(a);if("undefined"===typeof a.button||d)this.zoomOption(a),d&&a.preventDefault&&a.preventDefault(),this.dragStart(a)};a.prototype.onContainerMouseLeave=function(d){var c=B[I(a.hoverChartIndex,-1)],h=this.chart.tooltip;d=this.normalize(d);c&&(d.relatedTarget||d.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=void 0);h&&!h.isHidden&&
this.reset()};a.prototype.onContainerMouseEnter=function(a){delete this.chartPosition};a.prototype.onContainerMouseMove=function(a){var d=this.chart,c=d.tooltip;a=this.normalize(a);this.setHoverChartIndex();a.preventDefault||(a.returnValue=!1);("mousedown"===d.mouseIsDown||this.touchSelect(a))&&this.drag(a);d.openMenu||!this.inClass(a.target,"highcharts-tracker")&&!d.isInsidePlot(a.chartX-d.plotLeft,a.chartY-d.plotTop,{visiblePlotOnly:!0})||c&&c.shouldStickOnContact(a)||(this.inClass(a.target,"highcharts-no-tooltip")?
this.reset(!1,0):this.runPointActions(a))};a.prototype.onDocumentTouchEnd=function(d){var c=B[I(a.hoverChartIndex,-1)];c&&c.pointer.drop(d)};a.prototype.onContainerTouchMove=function(a){if(this.touchSelect(a))this.onContainerMouseMove(a);else this.touch(a)};a.prototype.onContainerTouchStart=function(a){if(this.touchSelect(a))this.onContainerMouseDown(a);else this.zoomOption(a),this.touch(a,!0)};a.prototype.onDocumentMouseMove=function(a){var d=this.chart,c=d.tooltip,e=this.chartPosition;a=this.normalize(a,
e);!e||d.isInsidePlot(a.chartX-d.plotLeft,a.chartY-d.plotTop,{visiblePlotOnly:!0})||c&&c.shouldStickOnContact(a)||this.inClass(a.target,"highcharts-tracker")||this.reset()};a.prototype.onDocumentMouseUp=function(d){var c=B[I(a.hoverChartIndex,-1)];c&&c.pointer.drop(d)};a.prototype.pinch=function(a){var d=this,h=d.chart,e=d.pinchDown,b=a.touches||[],f=b.length,g=d.lastValidTouch,l=d.hasZoom,n={},u=1===f&&(d.inClass(a.target,"highcharts-tracker")&&h.runTrackerClick||d.runChartClick),A={},t=d.chart.tooltip;
t=1===f&&I(t&&t.options.followTouchMove,!0);var r=d.selectionMarker;1<f?d.initiated=!0:t&&(d.initiated=!1);l&&d.initiated&&!u&&!1!==a.cancelable&&a.preventDefault();[].map.call(b,function(b){return d.normalize(b)});"touchstart"===a.type?([].forEach.call(b,function(b,a){e[a]={chartX:b.chartX,chartY:b.chartY}}),g.x=[e[0].chartX,e[1]&&e[1].chartX],g.y=[e[0].chartY,e[1]&&e[1].chartY],h.axes.forEach(function(b){if(b.zoomEnabled){var a=h.bounds[b.horiz?"h":"v"],d=b.minPixelPadding,c=b.toPixels(Math.min(I(b.options.min,
b.dataMin),b.dataMin)),e=b.toPixels(Math.max(I(b.options.max,b.dataMax),b.dataMax)),f=Math.max(c,e);a.min=Math.min(b.pos,Math.min(c,e)-d);a.max=Math.max(b.pos+b.len,f+d)}}),d.res=!0):t?this.runPointActions(d.normalize(a)):e.length&&(m(h,"touchpan",{originalEvent:a},function(){r||(d.selectionMarker=r=c({destroy:G,touch:!0},h.plotBox));d.pinchTranslate(e,b,n,r,A,g);d.hasPinched=l;d.scaleGroups(n,A)}),d.res&&(d.res=!1,this.reset(!1,0)))};a.prototype.pinchTranslate=function(a,c,h,e,b,f){this.zoomHor&&
this.pinchTranslateDirection(!0,a,c,h,e,b,f);this.zoomVert&&this.pinchTranslateDirection(!1,a,c,h,e,b,f)};a.prototype.pinchTranslateDirection=function(a,c,h,e,b,f,g,l){var d=this.chart,k=a?"x":"y",p=a?"X":"Y",m="chart"+p,w=a?"width":"height",n=d["plot"+(a?"Left":"Top")],q=d.inverted,z=d.bounds[a?"h":"v"],u=1===c.length,A=c[0][m],t=!u&&c[1][m];c=function(){"number"===typeof C&&20<Math.abs(A-t)&&(M=l||Math.abs(r-C)/Math.abs(A-t));P=(n-r)/M+A;F=d["plot"+(a?"Width":"Height")]/M};var F,P,M=l||1,r=h[0][m],
C=!u&&h[1][m];c();h=P;if(h<z.min){h=z.min;var v=!0}else h+F>z.max&&(h=z.max-F,v=!0);v?(r-=.8*(r-g[k][0]),"number"===typeof C&&(C-=.8*(C-g[k][1])),c()):g[k]=[r,C];q||(f[k]=P-n,f[w]=F);f=q?1/M:M;b[w]=F;b[k]=h;e[q?a?"scaleY":"scaleX":"scale"+p]=M;e["translate"+p]=f*n+(r-f*A)};a.prototype.reset=function(a,c){var d=this.chart,e=d.hoverSeries,b=d.hoverPoint,f=d.hoverPoints,g=d.tooltip,l=g&&g.shared?f:b;a&&l&&L(l).forEach(function(b){b.series.isCartesian&&"undefined"===typeof b.plotX&&(a=!1)});if(a)g&&l&&
L(l).length&&(g.refresh(l),g.shared&&f?f.forEach(function(b){b.setState(b.state,!0);b.series.isCartesian&&(b.series.xAxis.crosshair&&b.series.xAxis.drawCrosshair(null,b),b.series.yAxis.crosshair&&b.series.yAxis.drawCrosshair(null,b))}):b&&(b.setState(b.state,!0),d.axes.forEach(function(a){a.crosshair&&b.series[a.coll]===a&&a.drawCrosshair(null,b)})));else{if(b)b.onMouseOut();f&&f.forEach(function(b){b.setState()});if(e)e.onMouseOut();g&&g.hide(c);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());
d.axes.forEach(function(b){b.hideCrosshair()});this.hoverX=d.hoverPoints=d.hoverPoint=null}};a.prototype.runPointActions=function(d,c,h){var e=this.chart,b=e.tooltip&&e.tooltip.options.enabled?e.tooltip:void 0,f=b?b.shared:!1,g=c||e.hoverPoint,m=g&&g.series||e.hoverSeries;c=this.getHoverData(g,m,e.series,(!d||"touchmove"!==d.type)&&(!!c||m&&m.directTouch&&this.isDirectTouch),f,d);g=c.hoverPoint;m=c.hoverSeries;var n=c.hoverPoints;c=m&&m.tooltipOptions.followPointer&&!m.tooltipOptions.split;var q=
f&&m&&!m.noSharedTooltip;if(g&&(h||g!==e.hoverPoint||b&&b.isHidden)){(e.hoverPoints||[]).forEach(function(b){-1===n.indexOf(b)&&b.setState()});if(e.hoverSeries!==m)m.onMouseOver();this.applyInactiveState(n);(n||[]).forEach(function(b){b.setState("hover")});e.hoverPoint&&e.hoverPoint.firePointEvent("mouseOut");if(!g.series)return;e.hoverPoints=n;e.hoverPoint=g;g.firePointEvent("mouseOver",void 0,function(){b&&g&&b.refresh(q?n:g,d)})}else c&&b&&!b.isHidden&&(h=b.getAnchor([{}],d),e.isInsidePlot(h[0],
h[1],{visiblePlotOnly:!0})&&b.updatePosition({plotX:h[0],plotY:h[1]}));this.unDocMouseMove||(this.unDocMouseMove=r(e.container.ownerDocument,"mousemove",function(b){var c=B[a.hoverChartIndex];if(c)c.pointer.onDocumentMouseMove(b)}),this.eventsToUnbind.push(this.unDocMouseMove));e.axes.forEach(function(b){var a=I((b.crosshair||{}).snap,!0),c;a&&((c=e.hoverPoint)&&c.series[b.coll]===b||(c=l(n,function(a){return a.series&&a.series[b.coll]===b})));c||!a?b.drawCrosshair(d,c):b.hideCrosshair()})};a.prototype.scaleGroups=
function(a,c){var d=this.chart;d.series.forEach(function(h){var b=a||h.getPlotBox();h.group&&(h.xAxis&&h.xAxis.zoomEnabled||d.mapView)&&(h.group.attr(b),h.markerGroup&&(h.markerGroup.attr(b),h.markerGroup.clip(c?d.clipRect:null)),h.dataLabelsGroup&&h.dataLabelsGroup.attr(b))});d.clipRect.attr(c||d.clipBox)};a.prototype.setDOMEvents=function(){var c=this,e=this.chart.container,h=e.ownerDocument;e.onmousedown=this.onContainerMouseDown.bind(this);e.onmousemove=this.onContainerMouseMove.bind(this);e.onclick=
this.onContainerClick.bind(this);this.eventsToUnbind.push(r(e,"mouseenter",this.onContainerMouseEnter.bind(this)));this.eventsToUnbind.push(r(e,"mouseleave",this.onContainerMouseLeave.bind(this)));a.unbindDocumentMouseUp||(a.unbindDocumentMouseUp=r(h,"mouseup",this.onDocumentMouseUp.bind(this)));for(var f=this.chart.renderTo.parentElement;f&&"BODY"!==f.tagName;)this.eventsToUnbind.push(r(f,"scroll",function(){delete c.chartPosition})),f=f.parentElement;g.hasTouch&&(this.eventsToUnbind.push(r(e,"touchstart",
this.onContainerTouchStart.bind(this),{passive:!1})),this.eventsToUnbind.push(r(e,"touchmove",this.onContainerTouchMove.bind(this),{passive:!1})),a.unbindDocumentTouchEnd||(a.unbindDocumentTouchEnd=r(h,"touchend",this.onDocumentTouchEnd.bind(this),{passive:!1})))};a.prototype.setHoverChartIndex=function(){var c=this.chart,e=g.charts[I(a.hoverChartIndex,-1)];if(e&&e!==c)e.pointer.onContainerMouseLeave({relatedTarget:c.container});e&&e.mouseIsDown||(a.hoverChartIndex=c.index)};a.prototype.touch=function(a,
c){var d=this.chart,e;this.setHoverChartIndex();if(1===a.touches.length)if(a=this.normalize(a),(e=d.isInsidePlot(a.chartX-d.plotLeft,a.chartY-d.plotTop,{visiblePlotOnly:!0}))&&!d.openMenu){c&&this.runPointActions(a);if("touchmove"===a.type){c=this.pinchDown;var b=c[0]?4<=Math.sqrt(Math.pow(c[0].chartX-a.chartX,2)+Math.pow(c[0].chartY-a.chartY,2)):!1}I(b,!0)&&this.pinch(a)}else c&&this.reset();else 2===a.touches.length&&this.pinch(a)};a.prototype.touchSelect=function(a){return!(!this.chart.options.chart.zooming.singleTouch||
!a.touches||1!==a.touches.length)};a.prototype.zoomOption=function(a){var c=this.chart,d=c.options.chart;c=c.inverted;var e=d.zooming.type||"";/touch/.test(a.type)&&(e=I(d.zooming.pinchType,e));this.zoomX=a=/x/.test(e);this.zoomY=d=/y/.test(e);this.zoomHor=a&&!c||d&&c;this.zoomVert=d&&!c||a&&c;this.hasZoom=a||d};return a}();"";return a});K(g,"Core/MSPointer.js",[g["Core/Globals.js"],g["Core/Pointer.js"],g["Core/Utilities.js"]],function(a,g,x){function v(){var a=[];a.item=function(a){return this[a]};
l(u,function(c){a.push({pageX:c.pageX,pageY:c.pageY,target:c.target})});return a}function D(a,c,e,f){var d=G[g.hoverChartIndex||NaN];"touch"!==a.pointerType&&a.pointerType!==a.MSPOINTER_TYPE_TOUCH||!d||(d=d.pointer,f(a),d[c]({type:e,target:a.currentTarget,preventDefault:t,touches:v()}))}var B=this&&this.__extends||function(){var a=function(c,e){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])};return a(c,
e)};return function(c,e){function f(){this.constructor=c}a(c,e);c.prototype=null===e?Object.create(e):(f.prototype=e.prototype,new f)}}(),G=a.charts,r=a.doc,t=a.noop,n=a.win,f=x.addEvent,c=x.css,l=x.objectEach,m=x.pick,e=x.removeEvent,u={},C=!!n.PointerEvent;return function(g){function l(){return null!==g&&g.apply(this,arguments)||this}B(l,g);l.isRequired=function(){return!(a.hasTouch||!n.PointerEvent&&!n.MSPointerEvent)};l.prototype.batchMSEvents=function(a){a(this.chart.container,C?"pointerdown":
"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,C?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(r,C?"pointerup":"MSPointerUp",this.onDocumentPointerUp)};l.prototype.destroy=function(){this.batchMSEvents(e);g.prototype.destroy.call(this)};l.prototype.init=function(a,e){g.prototype.init.call(this,a,e);this.hasZoom&&c(a.container,{"-ms-touch-action":"none","touch-action":"none"})};l.prototype.onContainerPointerDown=function(a){D(a,"onContainerTouchStart","touchstart",
function(a){u[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})};l.prototype.onContainerPointerMove=function(a){D(a,"onContainerTouchMove","touchmove",function(a){u[a.pointerId]={pageX:a.pageX,pageY:a.pageY};u[a.pointerId].target||(u[a.pointerId].target=a.currentTarget)})};l.prototype.onDocumentPointerUp=function(a){D(a,"onDocumentTouchEnd","touchend",function(a){delete u[a.pointerId]})};l.prototype.setDOMEvents=function(){var a=this.chart.tooltip;g.prototype.setDOMEvents.call(this);
(this.hasZoom||m(a&&a.options.followTouchMove,!0))&&this.batchMSEvents(f)};return l}(g)});K(g,"Core/Legend/Legend.js",[g["Core/Animation/AnimationUtilities.js"],g["Core/FormatUtilities.js"],g["Core/Globals.js"],g["Core/Series/Point.js"],g["Core/Renderer/RendererUtilities.js"],g["Core/Utilities.js"]],function(a,g,x,E,D,B){var v=a.animObject,r=a.setAnimation,t=g.format,n=x.marginNames,f=D.distribute,c=B.addEvent,l=B.createElement,m=B.css,e=B.defined,u=B.discardElement,C=B.find,J=B.fireEvent,I=B.isNumber,
L=B.merge,A=B.pick,d=B.relativeLength,q=B.stableSort,h=B.syncTimeout;a=function(){function a(b,a){this.allItems=[];this.contentGroup=this.box=void 0;this.display=!1;this.group=void 0;this.offsetWidth=this.maxLegendWidth=this.maxItemWidth=this.legendWidth=this.legendHeight=this.lastLineHeight=this.lastItemY=this.itemY=this.itemX=this.itemMarginTop=this.itemMarginBottom=this.itemHeight=this.initialItemY=0;this.options=void 0;this.padding=0;this.pages=[];this.proximate=!1;this.scrollGroup=void 0;this.widthOption=
this.totalItemWidth=this.titleHeight=this.symbolWidth=this.symbolHeight=0;this.chart=b;this.init(b,a)}a.prototype.init=function(b,a){this.chart=b;this.setOptions(a);a.enabled&&(this.render(),c(this.chart,"endResize",function(){this.legend.positionCheckboxes()}),this.proximate?this.unchartrender=c(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems()}):this.unchartrender&&this.unchartrender())};a.prototype.setOptions=function(b){var a=A(b.padding,8);this.options=
b;this.chart.styledMode||(this.itemStyle=b.itemStyle,this.itemHiddenStyle=L(this.itemStyle,b.itemHiddenStyle));this.itemMarginTop=b.itemMarginTop||0;this.itemMarginBottom=b.itemMarginBottom||0;this.padding=a;this.initialItemY=a-5;this.symbolWidth=A(b.symbolWidth,16);this.pages=[];this.proximate="proximate"===b.layout&&!this.chart.inverted;this.baseline=void 0};a.prototype.update=function(b,a){var c=this.chart;this.setOptions(L(!0,this.options,b));this.destroy();c.isDirtyLegend=c.isDirtyBox=!0;A(a,
!0)&&c.redraw();J(this,"afterUpdate")};a.prototype.colorizeItem=function(b,a){var c=b.legendItem||{},d=c.group,e=c.label,h=c.line;c=c.symbol;if(d)d[a?"removeClass":"addClass"]("highcharts-legend-item-hidden");if(!this.chart.styledMode){var f=this.options;d=this.itemHiddenStyle.color;f=a?f.itemStyle.color:d;var g=a?b.color||d:d,k=b.options&&b.options.marker,l={fill:g};e&&e.css({fill:f,color:f});h&&h.attr({stroke:g});c&&(k&&c.isMarker&&(l=b.pointAttribs(),a||(l.stroke=l.fill=d)),c.attr(l))}J(this,"afterColorizeItem",
{item:b,visible:a})};a.prototype.positionItems=function(){this.allItems.forEach(this.positionItem,this);this.chart.isResizing||this.positionCheckboxes()};a.prototype.positionItem=function(b){var a=this,c=b.legendItem||{},d=c.group,h=c.x;h=void 0===h?0:h;c=c.y;c=void 0===c?0:c;var f=this.options,g=f.symbolPadding,l=!f.rtl;f=b.checkbox;d&&d.element&&(g={translateX:l?h:this.legendWidth-h-2*g-4,translateY:c},d[e(d.translateY)?"animate":"attr"](g,void 0,function(){J(a,"afterPositionItem",{item:b})}));
f&&(f.x=h,f.y=c)};a.prototype.destroyItem=function(b){for(var a=b.checkbox,c=b.legendItem||{},d=0,e=["group","label","line","symbol"];d<e.length;d++){var h=e[d];c[h]&&(c[h]=c[h].destroy())}a&&u(a);b.legendItem=void 0};a.prototype.destroy=function(){for(var b=0,a=this.getAllItems();b<a.length;b++)this.destroyItem(a[b]);b=0;for(a="clipRect up down pager nav box title group".split(" ");b<a.length;b++){var c=a[b];this[c]&&(this[c]=this[c].destroy())}this.display=null};a.prototype.positionCheckboxes=function(){var b=
this.group&&this.group.alignAttr,a=this.clipHeight||this.legendHeight,c=this.titleHeight;if(b){var d=b.translateY;this.allItems.forEach(function(e){var h=e.checkbox;if(h){var f=d+c+h.y+(this.scrollOffset||0)+3;m(h,{left:b.translateX+e.checkboxOffset+h.x-20+"px",top:f+"px",display:this.proximate||f>d-6&&f<d+a-6?"":"none"})}},this)}};a.prototype.renderTitle=function(){var b=this.options,a=this.padding,c=b.title,d=0;c.text&&(this.title||(this.title=this.chart.renderer.label(c.text,a-3,a-4,void 0,void 0,
void 0,b.useHTML,void 0,"legend-title").attr({zIndex:1}),this.chart.styledMode||this.title.css(c.style),this.title.add(this.group)),c.width||this.title.css({width:this.maxLegendWidth+"px"}),b=this.title.getBBox(),d=b.height,this.offsetWidth=b.width,this.contentGroup.attr({translateY:d}));this.titleHeight=d};a.prototype.setText=function(b){var a=this.options;b.legendItem.label.attr({text:a.labelFormat?t(a.labelFormat,b,this.chart):a.labelFormatter.call(b)})};a.prototype.renderItem=function(b){var a=
b.legendItem=b.legendItem||{},c=this.chart,d=c.renderer,e=this.options,h=this.symbolWidth,f=e.symbolPadding||0,g=this.itemStyle,l=this.itemHiddenStyle,k="horizontal"===e.layout?A(e.itemDistance,20):0,m=!e.rtl,n=!b.series,u=!n&&b.series.drawLegendSymbol?b.series:b,q=u.options,t=this.createCheckboxForItem&&q&&q.showCheckbox,F=e.useHTML,P=b.options.className,M=a.label;q=h+f+k+(t?20:0);M||(a.group=d.g("legend-item").addClass("highcharts-"+u.type+"-series highcharts-color-"+b.colorIndex+(P?" "+P:"")+(n?
" highcharts-series-"+b.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.label=M=d.text("",m?h+f:-f,this.baseline||0,F),c.styledMode||M.css(L(b.visible?g:l)),M.attr({align:m?"left":"right",zIndex:2}).add(a.group),this.baseline||(this.fontMetrics=d.fontMetrics(c.styledMode?12:g.fontSize,M),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,M.attr("y",this.baseline),this.symbolHeight=e.symbolHeight||this.fontMetrics.f,e.squareSymbol&&(this.symbolWidth=A(e.symbolWidth,Math.max(this.symbolHeight,
16)),q=this.symbolWidth+f+k+(t?20:0),m&&M.attr("x",this.symbolWidth+f))),u.drawLegendSymbol(this,b),this.setItemEvents&&this.setItemEvents(b,M,F));t&&!b.checkbox&&this.createCheckboxForItem&&this.createCheckboxForItem(b);this.colorizeItem(b,b.visible);!c.styledMode&&g.width||M.css({width:(e.itemWidth||this.widthOption||c.spacingBox.width)-q+"px"});this.setText(b);c=M.getBBox();d=this.fontMetrics&&this.fontMetrics.h||0;b.itemWidth=b.checkboxOffset=e.itemWidth||a.labelWidth||c.width+q;this.maxItemWidth=
Math.max(this.maxItemWidth,b.itemWidth);this.totalItemWidth+=b.itemWidth;this.itemHeight=b.itemHeight=Math.round(a.labelHeight||(c.height>1.5*d?c.height:d))};a.prototype.layoutItem=function(a){var b=this.options,c=this.padding,d="horizontal"===b.layout,e=a.itemHeight,h=this.itemMarginBottom,f=this.itemMarginTop,g=d?A(b.itemDistance,20):0,l=this.maxLegendWidth;b=b.alignColumns&&this.totalItemWidth>l?this.maxItemWidth:a.itemWidth;var k=a.legendItem||{};d&&this.itemX-c+b>l&&(this.itemX=c,this.lastLineHeight&&
(this.itemY+=f+this.lastLineHeight+h),this.lastLineHeight=0);this.lastItemY=f+this.itemY+h;this.lastLineHeight=Math.max(e,this.lastLineHeight);k.x=this.itemX;k.y=this.itemY;d?this.itemX+=b:(this.itemY+=f+e+h,this.lastLineHeight=e);this.offsetWidth=this.widthOption||Math.max((d?this.itemX-c-(a.checkbox?0:g):b)+c,this.offsetWidth)};a.prototype.getAllItems=function(){var a=[];this.chart.series.forEach(function(b){var c=b&&b.options;b&&A(c.showInLegend,e(c.linkedTo)?!1:void 0,!0)&&(a=a.concat((b.legendItem||
{}).labels||("point"===c.legendType?b.data:b)))});J(this,"afterGetAllItems",{allItems:a});return a};a.prototype.getAlignment=function(){var a=this.options;return this.proximate?a.align.charAt(0)+"tv":a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)};a.prototype.adjustMargins=function(a,c){var b=this.chart,d=this.options,h=this.getAlignment();h&&[/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/].forEach(function(f,g){f.test(h)&&!e(a[g])&&(b[n[g]]=Math.max(b[n[g]],
b.legend[(g+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][g]*d[g%2?"x":"y"]+A(d.margin,12)+c[g]+(b.titleOffset[g]||0)))})};a.prototype.proximatePositions=function(){var a=this.chart,c=[],d="left"===this.options.align;this.allItems.forEach(function(b){var e;var h=d;if(b.yAxis){b.xAxis.options.reversed&&(h=!h);b.points&&(e=C(h?b.points:b.points.slice(0).reverse(),function(a){return I(a.plotY)}));h=this.itemMarginTop+b.legendItem.label.getBBox().height+this.itemMarginBottom;var f=b.yAxis.top-a.plotTop;
b.visible?(e=e?e.plotY:b.yAxis.height,e+=f-.3*h):e=f+b.yAxis.height;c.push({target:e,size:h,item:b})}},this);for(var e,h=0,g=f(c,a.plotHeight);h<g.length;h++){var l=g[h];e=l.item.legendItem||{};l.pos&&(e.y=a.plotTop-a.spacing[0]+l.pos)}};a.prototype.render=function(){var a=this.chart,c=a.renderer,e=this.options,h=this.padding,f=this.getAllItems(),g=this.group,l=this.box;this.itemX=h;this.itemY=this.initialItemY;this.lastItemY=this.offsetWidth=0;this.widthOption=d(e.width,a.spacingBox.width-h);var k=
a.spacingBox.width-2*h-e.x;-1<["rm","lm"].indexOf(this.getAlignment().substring(0,2))&&(k/=2);this.maxLegendWidth=this.widthOption||k;g||(this.group=g=c.g("legend").addClass(e.className||"").attr({zIndex:7}).add(),this.contentGroup=c.g().attr({zIndex:1}).add(g),this.scrollGroup=c.g().add(this.contentGroup));this.renderTitle();q(f,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});e.reversed&&f.reverse();this.allItems=f;this.display=k=!!f.length;this.itemHeight=
this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;f.forEach(this.renderItem,this);f.forEach(this.layoutItem,this);f=(this.widthOption||this.offsetWidth)+h;var m=this.lastItemY+this.lastLineHeight+this.titleHeight;m=this.handleOverflow(m);m+=h;l||(this.box=l=c.rect().addClass("highcharts-legend-box").attr({r:e.borderRadius}).add(g));a.styledMode||l.attr({stroke:e.borderColor,"stroke-width":e.borderWidth||0,fill:e.backgroundColor||"none"}).shadow(e.shadow);if(0<f&&0<m)l[l.placed?"animate":
"attr"](l.crisp.call({},{x:0,y:0,width:f,height:m},l.strokeWidth()));g[k?"show":"hide"]();a.styledMode&&"none"===g.getStyle("display")&&(f=m=0);this.legendWidth=f;this.legendHeight=m;k&&this.align();this.proximate||this.positionItems();J(this,"afterRender")};a.prototype.align=function(a){void 0===a&&(a=this.chart.spacingBox);var b=this.chart,c=this.options,d=a.y;/(lth|ct|rth)/.test(this.getAlignment())&&0<b.titleOffset[0]?d+=b.titleOffset[0]:/(lbh|cb|rbh)/.test(this.getAlignment())&&0<b.titleOffset[2]&&
(d-=b.titleOffset[2]);d!==a.y&&(a=L(a,{y:d}));b.hasRendered||(this.group.placed=!1);this.group.align(L(c,{width:this.legendWidth,height:this.legendHeight,verticalAlign:this.proximate?"top":c.verticalAlign}),!0,a)};a.prototype.handleOverflow=function(a){var b=this,c=this.chart,d=c.renderer,e=this.options,h=e.y,f="top"===e.verticalAlign,g=this.padding,l=e.maxHeight,k=e.navigation,m=A(k.animation,!0),n=k.arrowSize||12,u=this.pages,q=this.allItems,t=function(a){"number"===typeof a?v.attr({height:a}):
v&&(b.clipRect=v.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+g+"px,9999px,"+(g+a)+"px,0)":"auto")},F=function(a){b[a]=d.circle(0,0,1.3*n).translate(n/2,n/2).add(C);c.styledMode||b[a].attr("fill","rgba(0,0,0,0.0001)");return b[a]},P,M,r;h=c.spacingBox.height+(f?-h:h)-g;var C=this.nav,v=this.clipRect;"horizontal"!==e.layout||"middle"===e.verticalAlign||e.floating||(h/=2);l&&(h=Math.min(h,l));u.length=0;a&&0<h&&a>h&&!1!==k.enabled?(this.clipHeight=P=
Math.max(h-20-this.titleHeight-g,0),this.currentPage=A(this.currentPage,1),this.fullHeight=a,q.forEach(function(a,b){r=a.legendItem||{};a=r.y||0;var c=Math.round(r.label.getBBox().height),d=u.length;if(!d||a-u[d-1]>P&&(M||a)!==u[d-1])u.push(M||a),d++;r.pageIx=d-1;M&&((q[b-1].legendItem||{}).pageIx=d-1);b===q.length-1&&a+c-u[d-1]>P&&c<=P&&(u.push(a),r.pageIx=d);a!==M&&(M=a)}),v||(v=b.clipRect=d.clipRect(0,g,9999,0),b.contentGroup.clip(v)),t(P),C||(this.nav=C=d.g().attr({zIndex:1}).add(this.group),
this.up=d.symbol("triangle",0,0,n,n).add(C),F("upTracker").on("click",function(){b.scroll(-1,m)}),this.pager=d.text("",15,10).addClass("highcharts-legend-navigation"),!c.styledMode&&k.style&&this.pager.css(k.style),this.pager.add(C),this.down=d.symbol("triangle-down",0,0,n,n).add(C),F("downTracker").on("click",function(){b.scroll(1,m)})),b.scroll(0),a=h):C&&(t(),this.nav=C.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a};a.prototype.scroll=function(a,c){var b=this,d=this.chart,
e=this.pages,f=e.length,g=this.clipHeight,l=this.options.navigation,k=this.pager,m=this.padding,p=this.currentPage+a;p>f&&(p=f);0<p&&("undefined"!==typeof c&&r(c,d),this.nav.attr({translateX:m,translateY:g+this.padding+7+this.titleHeight,visibility:"inherit"}),[this.up,this.upTracker].forEach(function(a){a.attr({"class":1===p?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})}),k.attr({text:p+"/"+f}),[this.down,this.downTracker].forEach(function(a){a.attr({x:18+this.pager.getBBox().width,
"class":p===f?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})},this),d.styledMode||(this.up.attr({fill:1===p?l.inactiveColor:l.activeColor}),this.upTracker.css({cursor:1===p?"default":"pointer"}),this.down.attr({fill:p===f?l.inactiveColor:l.activeColor}),this.downTracker.css({cursor:p===f?"default":"pointer"})),this.scrollOffset=-e[p-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=p,this.positionCheckboxes(),a=v(A(c,d.renderer.globalAnimation,
!0)),h(function(){J(b,"afterScroll",{currentPage:p})},a.duration))};a.prototype.setItemEvents=function(a,c,d){var b=this,e=a.legendItem||{},h=b.chart.renderer.boxWrapper,f=a instanceof E,g="highcharts-legend-"+(f?"point":"series")+"-active",l=b.chart.styledMode,k=function(c){b.allItems.forEach(function(b){a!==b&&[b].concat(b.linkedSeries||[]).forEach(function(a){a.setState(c,!f)})})},m=0;for(d=d?[c,e.symbol]:[e.group];m<d.length;m++)if(e=d[m])e.on("mouseover",function(){a.visible&&k("inactive");a.setState("hover");
a.visible&&h.addClass(g);l||c.css(b.options.itemHoverStyle)}).on("mouseout",function(){b.chart.styledMode||c.css(L(a.visible?b.itemStyle:b.itemHiddenStyle));k("");h.removeClass(g);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible();k(a.visible?"inactive":"")};h.removeClass(g);b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):J(a,"legendItemClick",b,c)})};a.prototype.createCheckboxForItem=function(a){a.checkbox=l("input",{type:"checkbox",className:"highcharts-legend-checkbox",
checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);c(a.checkbox,"click",function(b){J(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})};return a}();"";return a});K(g,"Core/Series/SeriesRegistry.js",[g["Core/Globals.js"],g["Core/Defaults.js"],g["Core/Series/Point.js"],g["Core/Utilities.js"]],function(a,g,x,E){var v=g.defaultOptions,B=E.extendClass,G=E.merge,r;(function(g){function n(a,c){var f=v.plotOptions||{},
m=c.defaultOptions,e=c.prototype;e.type=a;e.pointClass||(e.pointClass=x);m&&(f[a]=m);g.seriesTypes[a]=c}g.seriesTypes=a.seriesTypes;g.registerSeriesType=n;g.seriesType=function(a,c,l,m,e){var f=v.plotOptions||{};c=c||"";f[a]=G(f[c],l);n(a,B(g.seriesTypes[c]||function(){},m));g.seriesTypes[a].prototype.type=a;e&&(g.seriesTypes[a].prototype.pointClass=B(x,e));return g.seriesTypes[a]}})(r||(r={}));return r});K(g,"Core/Chart/Chart.js",[g["Core/Animation/AnimationUtilities.js"],g["Core/Axis/Axis.js"],
g["Core/Defaults.js"],g["Core/FormatUtilities.js"],g["Core/Foundation.js"],g["Core/Globals.js"],g["Core/Legend/Legend.js"],g["Core/MSPointer.js"],g["Core/Pointer.js"],g["Core/Renderer/RendererRegistry.js"],g["Core/Series/SeriesRegistry.js"],g["Core/Renderer/SVG/SVGRenderer.js"],g["Core/Time.js"],g["Core/Utilities.js"],g["Core/Renderer/HTML/AST.js"]],function(a,g,x,E,D,B,G,r,t,n,f,c,l,m,e){var u=a.animate,C=a.animObject,v=a.setAnimation,I=x.defaultOptions,L=x.defaultTime,A=E.numberFormat,d=D.registerEventOptions,
q=B.charts,h=B.doc,k=B.marginNames,b=B.svg,p=B.win,z=f.seriesTypes,w=m.addEvent,N=m.attr,H=m.cleanRecursively,O=m.createElement,Q=m.css,S=m.defined,Y=m.discardElement,y=m.erase,T=m.error,K=m.extend,ca=m.find,R=m.fireEvent,F=m.getStyle,P=m.isArray,M=m.isNumber,X=m.isObject,W=m.isString,U=m.merge,Z=m.objectEach,V=m.pick,ba=m.pInt,ha=m.relativeLength,da=m.removeEvent,fa=m.splat,ia=m.syncTimeout,ka=m.uniqueKey;a=function(){function a(a,b,c){this.series=this.renderTo=this.renderer=this.pointer=this.pointCount=
this.plotWidth=this.plotTop=this.plotLeft=this.plotHeight=this.plotBox=this.options=this.numberFormatter=this.margin=this.legend=this.labelCollectors=this.isResizing=this.index=this.eventOptions=this.container=this.colorCounter=this.clipBox=this.chartWidth=this.chartHeight=this.bounds=this.axisOffset=this.axes=void 0;this.sharedClips={};this.yAxis=this.xAxis=this.userOptions=this.titleOffset=this.time=this.symbolCounter=this.spacingBox=this.spacing=void 0;this.getArgs(a,b,c)}a.chart=function(b,c,
d){return new a(b,c,d)};a.prototype.getArgs=function(a,b,c){W(a)||a.nodeName?(this.renderTo=a,this.init(b,c)):this.init(a,b)};a.prototype.init=function(a,b){var c=a.plotOptions||{};R(this,"init",{args:arguments},function(){var e=U(I,a),h=e.chart;Z(e.plotOptions,function(a,b){X(a)&&(a.tooltip=c[b]&&U(c[b].tooltip)||void 0)});e.tooltip.userOptions=a.chart&&a.chart.forExport&&a.tooltip.userOptions||a.tooltip;this.userOptions=a;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=
[];this.callback=b;this.isResizing=0;var f=h.zooming=h.zooming||{};a.chart&&!a.chart.zooming&&(f.resetButton=h.resetZoomButton);f.key=V(f.key,h.zoomKey);f.pinchType=V(f.pinchType,h.pinchType);f.singleTouch=V(f.singleTouch,h.zoomBySingleTouch);f.type=V(f.type,h.zoomType);this.options=e;this.axes=[];this.series=[];this.time=a.time&&Object.keys(a.time).length?new l(a.time):B.time;this.numberFormatter=h.numberFormatter||A;this.styledMode=h.styledMode;this.hasCartesianSeries=h.showAxes;this.index=q.length;
q.push(this);B.chartCount++;d(this,h);this.xAxis=[];this.yAxis=[];this.pointCount=this.colorCounter=this.symbolCounter=0;R(this,"afterInit");this.firstRender()})};a.prototype.initSeries=function(a){var b=this.options.chart;b=a.type||b.type||b.defaultSeriesType;var c=z[b];c||T(17,!0,this,{missingModuleFor:b});b=new c;"function"===typeof b.init&&b.init(this,a);return b};a.prototype.setSeriesData=function(){this.getSeriesOrderByLinks().forEach(function(a){a.points||a.data||!a.enabledDataSorting||a.setData(a.options.data,
!1)})};a.prototype.getSeriesOrderByLinks=function(){return this.series.concat().sort(function(a,b){return a.linkedSeries.length||b.linkedSeries.length?b.linkedSeries.length-a.linkedSeries.length:0})};a.prototype.orderSeries=function(a){var b=this.series;a=a||0;for(var c=b.length;a<c;++a)b[a]&&(b[a].index=a,b[a].name=b[a].getName())};a.prototype.isInsidePlot=function(a,b,c){void 0===c&&(c={});var d=this.inverted,e=this.plotBox,h=this.plotLeft,f=this.plotTop,g=this.scrollablePlotBox,l=0;var k=0;c.visiblePlotOnly&&
this.scrollingContainer&&(k=this.scrollingContainer,l=k.scrollLeft,k=k.scrollTop);var m=c.series;e=c.visiblePlotOnly&&g||e;g=c.inverted?b:a;b=c.inverted?a:b;a={x:g,y:b,isInsidePlot:!0,options:c};if(!c.ignoreX){var p=m&&(d&&!this.polar?m.yAxis:m.xAxis)||{pos:h,len:Infinity};g=c.paneCoordinates?p.pos+g:h+g;g>=Math.max(l+h,p.pos)&&g<=Math.min(l+h+e.width,p.pos+p.len)||(a.isInsidePlot=!1)}!c.ignoreY&&a.isInsidePlot&&(d=c.axis&&!c.axis.isXAxis&&c.axis||m&&(d?m.xAxis:m.yAxis)||{pos:f,len:Infinity},c=c.paneCoordinates?
d.pos+b:f+b,c>=Math.max(k+f,d.pos)&&c<=Math.min(k+f+e.height,d.pos+d.len)||(a.isInsidePlot=!1));R(this,"afterIsInsidePlot",a);return a.isInsidePlot};a.prototype.redraw=function(a){R(this,"beforeRedraw");var b=this.hasCartesianSeries?this.axes:this.colorAxis||[],c=this.series,d=this.pointer,e=this.legend,h=this.userOptions.legend,f=this.renderer,g=f.isHidden(),l=[],k=this.isDirtyBox,m=this.isDirtyLegend;this.setResponsive&&this.setResponsive(!1);v(this.hasRendered?a:!1,this);g&&this.temporaryDisplay();
this.layOutTitles();for(a=c.length;a--;){var p=c[a];if(p.options.stacking||p.options.centerInCategory){var F=!0;if(p.isDirty){var n=!0;break}}}if(n)for(a=c.length;a--;)p=c[a],p.options.stacking&&(p.isDirty=!0);c.forEach(function(a){a.isDirty&&("point"===a.options.legendType?("function"===typeof a.updateTotals&&a.updateTotals(),m=!0):h&&(h.labelFormatter||h.labelFormat)&&(m=!0));a.isDirtyData&&R(a,"updatedData")});m&&e&&e.options.enabled&&(e.render(),this.isDirtyLegend=!1);F&&this.getStacks();b.forEach(function(a){a.updateNames();
a.setScale()});this.getMargins();b.forEach(function(a){a.isDirty&&(k=!0)});b.forEach(function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,l.push(function(){R(a,"afterSetExtremes",K(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(k||F)&&a.redraw()});k&&this.drawChartBox();R(this,"predraw");c.forEach(function(a){(k||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});d&&d.reset(!0);f.draw();R(this,"redraw");R(this,"render");g&&this.temporaryDisplay(!0);l.forEach(function(a){a.call()})};
a.prototype.get=function(a){function b(b){return b.id===a||b.options&&b.options.id===a}for(var c=this.series,d=ca(this.axes,b)||ca(this.series,b),e=0;!d&&e<c.length;e++)d=ca(c[e].points||[],b);return d};a.prototype.getAxes=function(){var a=this,b=this.options,c=b.xAxis=fa(b.xAxis||{});b=b.yAxis=fa(b.yAxis||{});R(this,"getAxes");c.forEach(function(a,b){a.index=b;a.isX=!0});b.forEach(function(a,b){a.index=b});c.concat(b).forEach(function(b){new g(a,b)});R(this,"afterGetAxes")};a.prototype.getSelectedPoints=
function(){return this.series.reduce(function(a,b){b.getPointsCollection().forEach(function(b){V(b.selectedStaging,b.selected)&&a.push(b)});return a},[])};a.prototype.getSelectedSeries=function(){return this.series.filter(function(a){return a.selected})};a.prototype.setTitle=function(a,b,c){this.applyDescription("title",a);this.applyDescription("subtitle",b);this.applyDescription("caption",void 0);this.layOutTitles(c)};a.prototype.applyDescription=function(a,b){var c=this,d="title"===a?{color:"#333333",
fontSize:this.options.isStock?"16px":"18px"}:{color:"#666666"};d=this.options[a]=U(!this.styledMode&&{style:d},this.options[a],b);var e=this[a];e&&b&&(this[a]=e=e.destroy());d&&!e&&(e=this.renderer.text(d.text,0,0,d.useHTML).attr({align:d.align,"class":"highcharts-"+a,zIndex:d.zIndex||4}).add(),e.update=function(b){c[{title:"setTitle",subtitle:"setSubtitle",caption:"setCaption"}[a]](b)},this.styledMode||e.css(d.style),this[a]=e)};a.prototype.layOutTitles=function(a){var b=[0,0,0],c=this.renderer,
d=this.spacingBox;["title","subtitle","caption"].forEach(function(a){var e=this[a],h=this.options[a],f=h.verticalAlign||"top";a="title"===a?"top"===f?-3:0:"top"===f?b[0]+2:0;var g;if(e){this.styledMode||(g=h.style&&h.style.fontSize);g=c.fontMetrics(g,e).b;e.css({width:(h.width||d.width+(h.widthAdjust||0))+"px"});var k=Math.round(e.getBBox(h.useHTML).height);e.align(K({y:"bottom"===f?g:a+g,height:k},h),!1,"spacingBox");h.floating||("top"===f?b[0]=Math.ceil(b[0]+k):"bottom"===f&&(b[2]=Math.ceil(b[2]+
k)))}},this);b[0]&&"top"===(this.options.title.verticalAlign||"top")&&(b[0]+=this.options.title.margin);b[2]&&"bottom"===this.options.caption.verticalAlign&&(b[2]+=this.options.caption.margin);var e=!this.titleOffset||this.titleOffset.join(",")!==b.join(",");this.titleOffset=b;R(this,"afterLayOutTitles");!this.isDirtyBox&&e&&(this.isDirtyBox=this.isDirtyLegend=e,this.hasRendered&&V(a,!0)&&this.isDirtyBox&&this.redraw())};a.prototype.getChartSize=function(){var a=this.options.chart,b=a.width;a=a.height;
var c=this.renderTo;S(b)||(this.containerWidth=F(c,"width"));S(a)||(this.containerHeight=F(c,"height"));this.chartWidth=Math.max(0,b||this.containerWidth||600);this.chartHeight=Math.max(0,ha(a,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))};a.prototype.temporaryDisplay=function(a){var b=this.renderTo;if(a)for(;b&&b.style;)b.hcOrigStyle&&(Q(b,b.hcOrigStyle),delete b.hcOrigStyle),b.hcOrigDetached&&(h.body.removeChild(b),b.hcOrigDetached=!1),b=b.parentNode;else for(;b&&b.style;){h.body.contains(b)||
b.parentNode||(b.hcOrigDetached=!0,h.body.appendChild(b));if("none"===F(b,"display",!1)||b.hcOricDetached)b.hcOrigStyle={display:b.style.display,height:b.style.height,overflow:b.style.overflow},a={display:"block",overflow:"hidden"},b!==this.renderTo&&(a.height=0),Q(b,a),b.offsetWidth||b.style.setProperty("display","block","important");b=b.parentNode;if(b===h.body)break}};a.prototype.setClassName=function(a){this.container.className="highcharts-container "+(a||"")};a.prototype.getContainer=function(){var a=
this.options,d=a.chart,f=ka(),g,k=this.renderTo;k||(this.renderTo=k=d.renderTo);W(k)&&(this.renderTo=k=h.getElementById(k));k||T(13,!0,this);var l=ba(N(k,"data-highcharts-chart"));M(l)&&q[l]&&q[l].hasRendered&&q[l].destroy();N(k,"data-highcharts-chart",this.index);k.innerHTML=e.emptyHTML;d.skipClone||k.offsetWidth||this.temporaryDisplay();this.getChartSize();l=this.chartWidth;var m=this.chartHeight;Q(k,{overflow:"hidden"});this.styledMode||(g=K({position:"relative",overflow:"hidden",width:l+"px",
height:m+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)",userSelect:"none","touch-action":"manipulation",outline:"none"},d.style||{}));this.container=f=O("div",{id:f},g,k);this._cursor=f.style.cursor;this.renderer=new (d.renderer||!b?n.getRendererType(d.renderer):c)(f,l,m,void 0,d.forExport,a.exporting&&a.exporting.allowHTML,this.styledMode);v(void 0,this);this.setClassName(d.className);if(this.styledMode)for(var p in a.defs)this.renderer.definition(a.defs[p]);
else this.renderer.setStyle(d.style);this.renderer.chartIndex=this.index;R(this,"afterGetContainer")};a.prototype.getMargins=function(a){var b=this.spacing,c=this.margin,d=this.titleOffset;this.resetMargins();d[0]&&!S(c[0])&&(this.plotTop=Math.max(this.plotTop,d[0]+b[0]));d[2]&&!S(c[2])&&(this.marginBottom=Math.max(this.marginBottom,d[2]+b[2]));this.legend&&this.legend.display&&this.legend.adjustMargins(c,b);R(this,"getMargins");a||this.getAxisMargins()};a.prototype.getAxisMargins=function(){var a=
this,b=a.axisOffset=[0,0,0,0],c=a.colorAxis,d=a.margin,e=function(a){a.forEach(function(a){a.visible&&a.getOffset()})};a.hasCartesianSeries?e(a.axes):c&&c.length&&e(c);k.forEach(function(c,e){S(d[e])||(a[c]+=b[e])});a.setChartSize()};a.prototype.reflow=function(a){var b=this,c=b.options.chart,d=b.renderTo,e=S(c.width)&&S(c.height),f=c.width||F(d,"width");c=c.height||F(d,"height");d=a?a.target:p;delete b.pointer.chartPosition;if(!e&&!b.isPrinting&&f&&c&&(d===p||d===h)){if(f!==b.containerWidth||c!==
b.containerHeight)m.clearTimeout(b.reflowTimeout),b.reflowTimeout=ia(function(){b.container&&b.setSize(void 0,void 0,!1)},a?100:0);b.containerWidth=f;b.containerHeight=c}};a.prototype.setReflow=function(a){var b=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):(this.unbindReflow=w(p,"resize",function(a){b.options&&b.reflow(a)}),w(this,"destroy",this.unbindReflow))};a.prototype.setSize=function(a,b,c){var d=this,e=d.renderer;d.isResizing+=1;v(c,d);c=
e.globalAnimation;d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;"undefined"!==typeof a&&(d.options.chart.width=a);"undefined"!==typeof b&&(d.options.chart.height=b);d.getChartSize();d.styledMode||(c?u:Q)(d.container,{width:d.chartWidth+"px",height:d.chartHeight+"px"},c);d.setChartSize(!0);e.setSize(d.chartWidth,d.chartHeight,c);d.axes.forEach(function(a){a.isDirty=!0;a.setScale()});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(c);d.oldChartHeight=null;R(d,
"resize");ia(function(){d&&R(d,"endResize",null,function(){--d.isResizing})},C(c).duration)};a.prototype.setChartSize=function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,e=this.chartHeight,h=this.options.chart,f=this.spacing,g=this.clipOffset,k,l,m,p;this.plotLeft=k=Math.round(this.plotLeft);this.plotTop=l=Math.round(this.plotTop);this.plotWidth=m=Math.max(0,Math.round(d-k-this.marginRight));this.plotHeight=p=Math.max(0,Math.round(e-l-this.marginBottom));this.plotSizeX=b?p:m;this.plotSizeY=
b?m:p;this.plotBorderWidth=h.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:f[3],y:f[0],width:d-f[3]-f[1],height:e-f[0]-f[2]};this.plotBox=c.plotBox={x:k,y:l,width:m,height:p};b=2*Math.floor(this.plotBorderWidth/2);d=Math.ceil(Math.max(b,g[3])/2);e=Math.ceil(Math.max(b,g[0])/2);this.clipBox={x:d,y:e,width:Math.floor(this.plotSizeX-Math.max(b,g[1])/2-d),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(b,g[2])/2-e))};a||(this.axes.forEach(function(a){a.setAxisSize();a.setAxisTranslation()}),
c.alignElements());R(this,"afterSetChartSize",{skipAxes:a})};a.prototype.resetMargins=function(){R(this,"resetMargins");var a=this,b=a.options.chart;["margin","spacing"].forEach(function(c){var d=b[c],e=X(d)?d:[d,d,d,d];["Top","Right","Bottom","Left"].forEach(function(d,h){a[c][h]=V(b[c+d],e[h])})});k.forEach(function(b,c){a[b]=V(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]};a.prototype.drawChartBox=function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,
d=this.chartHeight,e=this.styledMode,h=this.plotBGImage,f=a.backgroundColor,g=a.plotBackgroundColor,k=a.plotBackgroundImage,l=this.plotLeft,m=this.plotTop,p=this.plotWidth,F=this.plotHeight,n=this.plotBox,u=this.clipRect,q=this.clipBox,w=this.chartBackground,M=this.plotBackground,z=this.plotBorder,y,t="animate";w||(this.chartBackground=w=b.rect().addClass("highcharts-background").add(),t="attr");if(e)var P=y=w.strokeWidth();else{P=a.borderWidth||0;y=P+(a.shadow?8:0);f={fill:f||"none"};if(P||w["stroke-width"])f.stroke=
a.borderColor,f["stroke-width"]=P;w.attr(f).shadow(a.shadow)}w[t]({x:y/2,y:y/2,width:c-y-P%2,height:d-y-P%2,r:a.borderRadius});t="animate";M||(t="attr",this.plotBackground=M=b.rect().addClass("highcharts-plot-background").add());M[t](n);e||(M.attr({fill:g||"none"}).shadow(a.plotShadow),k&&(h?(k!==h.attr("href")&&h.attr("href",k),h.animate(n)):this.plotBGImage=b.image(k,l,m,p,F).add()));u?u.animate({width:q.width,height:q.height}):this.clipRect=b.clipRect(q);t="animate";z||(t="attr",this.plotBorder=
z=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());e||z.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});z[t](z.crisp({x:l,y:m,width:p,height:F},-z.strokeWidth()));this.isDirtyBox=!1;R(this,"afterDrawChartBox")};a.prototype.propFromSeries=function(){var a=this,b=a.options.chart,c=a.options.series,d,e,h;["inverted","angular","polar"].forEach(function(f){e=z[b.type||b.defaultSeriesType];h=b[f]||e&&e.prototype[f];for(d=c&&c.length;!h&&d--;)(e=z[c[d].type])&&
e.prototype[f]&&(h=!0);a[f]=h})};a.prototype.linkSeries=function(){var a=this,b=a.series;b.forEach(function(a){a.linkedSeries.length=0});b.forEach(function(b){var c=b.options.linkedTo;W(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,c.enabledDataSorting&&b.setDataSortingOptions(),b.visible=V(b.options.visible,c.options.visible,b.visible))});R(this,"afterLinkSeries")};a.prototype.renderSeries=function(){this.series.forEach(function(a){a.translate();
a.render()})};a.prototype.renderLabels=function(){var a=this,b=a.options.labels;b.items&&b.items.forEach(function(c){var d=K(b.style,c.style),e=ba(d.left)+a.plotLeft,h=ba(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(c.html,e,h).attr({zIndex:2}).css(d).add()})};a.prototype.render=function(){var a=this.axes,b=this.colorAxis,c=this.renderer,d=this.options,e=function(a){a.forEach(function(a){a.visible&&a.render()})},h=0;this.setTitle();this.legend=new G(this,d.legend);this.getStacks&&
this.getStacks();this.getMargins(!0);this.setChartSize();d=this.plotWidth;a.some(function(a){if(a.horiz&&a.visible&&a.options.labels.enabled&&a.series.length)return h=21,!0});var f=this.plotHeight=Math.max(this.plotHeight-h,0);a.forEach(function(a){a.setScale()});this.getAxisMargins();var g=1.1<d/this.plotWidth,k=1.05<f/this.plotHeight;if(g||k)a.forEach(function(a){(a.horiz&&g||!a.horiz&&k)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries?e(a):b&&b.length&&e(b);
this.seriesGroup||(this.seriesGroup=c.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0};a.prototype.addCredits=function(a){var b=this,c=U(!0,this.options.credits,a);c.enabled&&!this.credits&&(this.credits=this.renderer.text(c.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){c.href&&(p.location.href=c.href)}).attr({align:c.position.align,zIndex:8}),b.styledMode||
this.credits.css(c.style),this.credits.add().align(c.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})};a.prototype.destroy=function(){var a=this,b=a.axes,c=a.series,d=a.container,h=d&&d.parentNode,f;R(a,"destroy");a.renderer.forExport?y(q,a):q[a.index]=void 0;B.chartCount--;a.renderTo.removeAttribute("data-highcharts-chart");da(a);for(f=b.length;f--;)b[f]=b[f].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(f=c.length;f--;)c[f]=
c[f].destroy();"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy())});d&&(d.innerHTML=e.emptyHTML,da(d),h&&Y(d));Z(a,function(b,c){delete a[c]})};a.prototype.firstRender=function(){var a=this,b=a.options;if(!a.isReadyToRender||a.isReadyToRender()){a.getContainer();a.resetMargins();a.setChartSize();a.propFromSeries();
a.getAxes();(P(b.series)?b.series:[]).forEach(function(b){a.initSeries(b)});a.linkSeries();a.setSeriesData();R(a,"beforeRender");t&&(r.isRequired()?a.pointer=new r(a,b):a.pointer=new t(a,b));a.render();a.pointer.getChartPosition();if(!a.renderer.imgCount&&!a.hasLoaded)a.onload();a.temporaryDisplay(!0)}};a.prototype.onload=function(){this.callbacks.concat([this.callback]).forEach(function(a){a&&"undefined"!==typeof this.index&&a.apply(this,[this])},this);R(this,"load");R(this,"render");S(this.index)&&
this.setReflow(this.options.chart.reflow);this.warnIfA11yModuleNotLoaded();this.hasLoaded=!0};a.prototype.warnIfA11yModuleNotLoaded=function(){var a=this.options,b=this.title;a&&!this.accessibility&&(this.renderer.boxWrapper.attr({role:"img","aria-label":(b&&b.element.textContent||"").replace(/</g,"&lt;")}),a.accessibility&&!1===a.accessibility.enabled||T('Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.',
!1,this))};a.prototype.addSeries=function(a,b,c){var d=this,e;a&&(b=V(b,!0),R(d,"addSeries",{options:a},function(){e=d.initSeries(a);d.isDirtyLegend=!0;d.linkSeries();e.enabledDataSorting&&e.setData(a.data,!1);R(d,"afterAddSeries",{series:e});b&&d.redraw(c)}));return e};a.prototype.addAxis=function(a,b,c,d){return this.createAxis(b?"xAxis":"yAxis",{axis:a,redraw:c,animation:d})};a.prototype.addColorAxis=function(a,b,c){return this.createAxis("colorAxis",{axis:a,redraw:b,animation:c})};a.prototype.createAxis=
function(a,b){a=new g(this,U(b.axis,{index:this[a].length,isX:"xAxis"===a}));V(b.redraw,!0)&&this.redraw(b.animation);return a};a.prototype.showLoading=function(a){var b=this,c=b.options,d=c.loading,h=function(){f&&Q(f,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})},f=b.loadingDiv,g=b.loadingSpan;f||(b.loadingDiv=f=O("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container));g||(b.loadingSpan=g=O("span",{className:"highcharts-loading-inner"},
null,f),w(b,"redraw",h));f.className="highcharts-loading";e.setElementHTML(g,V(a,c.lang.loading,""));b.styledMode||(Q(f,K(d.style,{zIndex:10})),Q(g,d.labelStyle),b.loadingShown||(Q(f,{opacity:0,display:""}),u(f,{opacity:d.style.opacity||.5},{duration:d.showDuration||0})));b.loadingShown=!0;h()};a.prototype.hideLoading=function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",this.styledMode||u(b,{opacity:0},{duration:a.loading.hideDuration||100,
complete:function(){Q(b,{display:"none"})}}));this.loadingShown=!1};a.prototype.update=function(a,b,c,e){var h=this,f={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle",caption:"setCaption"},g=a.isResponsiveOptions,k=[],m,p;R(h,"update",{options:a});g||h.setResponsive(!1,!0);a=H(a,h.options);h.userOptions=U(h.userOptions,a);var F=a.chart;if(F){U(!0,h.options.chart,F);"className"in F&&h.setClassName(F.className);"reflow"in F&&h.setReflow(F.reflow);if("inverted"in F||"polar"in F||"type"in
F){h.propFromSeries();var n=!0}"alignTicks"in F&&(n=!0);"events"in F&&d(this,F);Z(F,function(a,b){-1!==h.propsRequireUpdateSeries.indexOf("chart."+b)&&(m=!0);-1!==h.propsRequireDirtyBox.indexOf(b)&&(h.isDirtyBox=!0);-1!==h.propsRequireReflow.indexOf(b)&&(g?h.isDirtyBox=!0:p=!0)});!h.styledMode&&F.style&&h.renderer.setStyle(h.options.chart.style||{})}!h.styledMode&&a.colors&&(this.options.colors=a.colors);a.time&&(this.time===L&&(this.time=new l(a.time)),U(!0,h.options.time,a.time));Z(a,function(b,
c){if(h[c]&&"function"===typeof h[c].update)h[c].update(b,!1);else if("function"===typeof h[f[c]])h[f[c]](b);else"colors"!==c&&-1===h.collectionsWithUpdate.indexOf(c)&&U(!0,h.options[c],a[c]);"chart"!==c&&-1!==h.propsRequireUpdateSeries.indexOf(c)&&(m=!0)});this.collectionsWithUpdate.forEach(function(b){if(a[b]){var d=[];h[b].forEach(function(a,b){a.options.isInternal||d.push(V(a.options.index,b))});fa(a[b]).forEach(function(a,e){var f=S(a.id),g;f&&(g=h.get(a.id));!g&&h[b]&&(g=h[b][d?d[e]:e])&&f&&
S(g.options.id)&&(g=void 0);g&&g.coll===b&&(g.update(a,!1),c&&(g.touched=!0));!g&&c&&h.collectionsWithInit[b]&&(h.collectionsWithInit[b][0].apply(h,[a].concat(h.collectionsWithInit[b][1]||[]).concat([!1])).touched=!0)});c&&h[b].forEach(function(a){a.touched||a.options.isInternal?delete a.touched:k.push(a)})}});k.forEach(function(a){a.chart&&a.remove&&a.remove(!1)});n&&h.axes.forEach(function(a){a.update({},!1)});m&&h.getSeriesOrderByLinks().forEach(function(a){a.chart&&a.update({},!1)},this);n=F&&
F.width;F=F&&(W(F.height)?ha(F.height,n||h.chartWidth):F.height);p||M(n)&&n!==h.chartWidth||M(F)&&F!==h.chartHeight?h.setSize(n,F,e):V(b,!0)&&h.redraw(e);R(h,"afterUpdate",{options:a,redraw:b,animation:e})};a.prototype.setSubtitle=function(a,b){this.applyDescription("subtitle",a);this.layOutTitles(b)};a.prototype.setCaption=function(a,b){this.applyDescription("caption",a);this.layOutTitles(b)};a.prototype.showResetZoom=function(){function a(){b.zoomOut()}var b=this,c=I.lang,d=b.options.chart.zooming.resetButton,
h=d.theme,e="chart"===d.relativeTo||"spacingBox"===d.relativeTo?null:"scrollablePlotBox";R(this,"beforeShowResetZoom",null,function(){b.resetZoomButton=b.renderer.button(c.resetZoom,null,null,a,h).attr({align:d.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(d.position,!1,e)});R(this,"afterShowResetZoom")};a.prototype.zoomOut=function(){R(this,"selection",{resetSelection:!0},this.zoom)};a.prototype.zoom=function(a){var b=this,c=b.pointer,d=!1,h;!a||a.resetSelection?
(b.axes.forEach(function(a){h=a.zoom()}),c.initiated=!1):a.xAxis.concat(a.yAxis).forEach(function(a){var e=a.axis;if(c[e.isXAxis?"zoomX":"zoomY"]&&S(c.mouseDownX)&&S(c.mouseDownY)&&b.isInsidePlot(c.mouseDownX-b.plotLeft,c.mouseDownY-b.plotTop,{axis:e})||!S(b.inverted?c.mouseDownX:c.mouseDownY))h=e.zoom(a.min,a.max),e.displayBtn&&(d=!0)});var e=b.resetZoomButton;d&&!e?b.showResetZoom():!d&&X(e)&&(b.resetZoomButton=e.destroy());h&&b.redraw(V(b.options.chart.animation,a&&a.animation,100>b.pointCount))};
a.prototype.pan=function(a,b){var c=this,d=c.hoverPoints;b="object"===typeof b?b:{enabled:b,type:"x"};var e=c.options.chart;e&&e.panning&&(e.panning=b);var h=b.type,f;R(this,"pan",{originalEvent:a},function(){d&&d.forEach(function(a){a.setState()});var b=c.xAxis;"xy"===h?b=b.concat(c.yAxis):"y"===h&&(b=c.yAxis);var e={};b.forEach(function(b){if(b.options.panningEnabled&&!b.options.isInternal){var d=b.horiz,g=a[d?"chartX":"chartY"];d=d?"mouseDownX":"mouseDownY";var k=c[d],l=b.minPointOffset||0,m=b.reversed&&
!c.inverted||!b.reversed&&c.inverted?-1:1,p=b.getExtremes(),F=b.toValue(k-g,!0)+l*m,n=b.toValue(k+b.len-g,!0)-(l*m||b.isXAxis&&b.pointRangePadding||0),u=n<F;m=b.hasVerticalPanning();k=u?n:F;F=u?F:n;var q=b.panningState;!m||b.isXAxis||q&&!q.isDirty||b.series.forEach(function(a){var b=a.getProcessedData(!0);b=a.getExtremes(b.yData,!0);q||(q={startMin:Number.MAX_VALUE,startMax:-Number.MAX_VALUE});M(b.dataMin)&&M(b.dataMax)&&(q.startMin=Math.min(V(a.options.threshold,Infinity),b.dataMin,q.startMin),q.startMax=
Math.max(V(a.options.threshold,-Infinity),b.dataMax,q.startMax))});m=Math.min(V(q&&q.startMin,p.dataMin),l?p.min:b.toValue(b.toPixels(p.min)-b.minPixelPadding));n=Math.max(V(q&&q.startMax,p.dataMax),l?p.max:b.toValue(b.toPixels(p.max)+b.minPixelPadding));b.panningState=q;b.isOrdinal||(l=m-k,0<l&&(F+=l,k=m),l=F-n,0<l&&(F=n,k-=l),b.series.length&&k!==p.min&&F!==p.max&&k>=m&&F<=n&&(b.setExtremes(k,F,!1,!1,{trigger:"pan"}),!c.resetZoomButton&&k!==m&&F!==n&&h.match("y")&&(c.showResetZoom(),b.displayBtn=
!1),f=!0),e[d]=g)}});Z(e,function(a,b){c[b]=a});f&&c.redraw(!1);Q(c.container,{cursor:"move"})})};return a}();K(a.prototype,{callbacks:[],collectionsWithInit:{xAxis:[a.prototype.addAxis,[!0]],yAxis:[a.prototype.addAxis,[!1]],series:[a.prototype.addSeries]},collectionsWithUpdate:["xAxis","yAxis","series"],propsRequireDirtyBox:"backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireReflow:"margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")});"";return a});K(g,"Core/Legend/LegendSymbol.js",[g["Core/Utilities.js"]],function(a){var g=a.merge,x=a.pick,E;(function(a){a.drawLineMarker=function(a){var v=this.legendItem=this.legendItem||{},r=this.options,t=a.symbolWidth,n=a.symbolHeight,f=n/2,c=this.chart.renderer,l=v.group;a=a.baseline-Math.round(.3*a.fontMetrics.b);var m={},e=r.marker;this.chart.styledMode||
(m={"stroke-width":r.lineWidth||0},r.dashStyle&&(m.dashstyle=r.dashStyle));v.line=c.path([["M",0,a],["L",t,a]]).addClass("highcharts-graph").attr(m).add(l);e&&!1!==e.enabled&&t&&(r=Math.min(x(e.radius,f),f),0===this.symbol.indexOf("url")&&(e=g(e,{width:n,height:n}),r=0),v.symbol=v=c.symbol(this.symbol,t/2-r,a-r,2*r,2*r,e).addClass("highcharts-point").add(l),v.isMarker=!0)};a.drawRectangle=function(a,g){g=g.legendItem||{};var r=a.symbolHeight,t=a.options.squareSymbol;g.symbol=this.chart.renderer.rect(t?
(a.symbolWidth-r)/2:0,a.baseline-r+1,t?r:a.symbolWidth,r,x(a.options.symbolRadius,r/2)).addClass("highcharts-point").attr({zIndex:3}).add(g.group)}})(E||(E={}));return E});K(g,"Core/Series/SeriesDefaults.js",[],function(){return{lineWidth:2,allowPointSelect:!1,crisp:!0,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{enabledThreshold:2,lineColor:"#ffffff",lineWidth:0,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",
lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{animation:{},align:"center",defer:!0,formatter:function(){var a=this.series.chart.numberFormatter;return"number"!==typeof this.y?"":a(this.y,-1)},padding:5,style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0},cropThreshold:300,opacity:1,pointRange:0,softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},
select:{animation:{duration:0}},inactive:{animation:{duration:50},opacity:.2}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"}});K(g,"Core/Series/Series.js",[g["Core/Animation/AnimationUtilities.js"],g["Core/Defaults.js"],g["Core/Foundation.js"],g["Core/Globals.js"],g["Core/Legend/LegendSymbol.js"],g["Core/Series/Point.js"],g["Core/Series/SeriesDefaults.js"],g["Core/Series/SeriesRegistry.js"],g["Core/Renderer/SVG/SVGElement.js"],g["Core/Utilities.js"]],function(a,g,x,E,D,B,G,r,t,n){var f=
a.animObject,c=a.setAnimation,l=g.defaultOptions,m=x.registerEventOptions,e=E.hasTouch,u=E.svg,C=E.win,v=r.seriesTypes,I=n.arrayMax,L=n.arrayMin,A=n.clamp,d=n.cleanRecursively,q=n.correctFloat,h=n.defined,k=n.erase,b=n.error,p=n.extend,z=n.find,w=n.fireEvent,N=n.getNestedProperty,H=n.isArray,O=n.isNumber,Q=n.isString,S=n.merge,Y=n.objectEach,y=n.pick,T=n.removeEvent,K=n.splat,ca=n.syncTimeout;a=function(){function a(){this.zones=this.yAxis=this.xAxis=this.userOptions=this.tooltipOptions=this.processedYData=
this.processedXData=this.points=this.options=this.linkedSeries=this.index=this.eventsToUnbind=this.eventOptions=this.data=this.chart=this._i=void 0}a.prototype.init=function(a,b){w(this,"init",{options:b});var c=this,d=a.series;this.eventsToUnbind=[];c.chart=a;c.options=c.setOptions(b);b=c.options;c.linkedSeries=[];c.bindAxes();p(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});m(this,b);var e=b.events;if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=
!0;c.getColor();c.getSymbol();c.parallelArrays.forEach(function(a){c[a+"Data"]||(c[a+"Data"]=[])});c.isCartesian&&(a.hasCartesianSeries=!0);var h;d.length&&(h=d[d.length-1]);c._i=y(h&&h._i,-1)+1;c.opacity=c.options.opacity;a.orderSeries(this.insert(d));b.dataSorting&&b.dataSorting.enabled?c.setDataSortingOptions():c.points||c.data||c.setData(b.data,!1);w(this,"afterInit")};a.prototype.is=function(a){return v[a]&&this instanceof v[a]};a.prototype.insert=function(a){var b=this.options.index,c;if(O(b)){for(c=
a.length;c--;)if(b>=y(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return y(c,a.length-1)};a.prototype.bindAxes=function(){var a=this,c=a.options,d=a.chart,e;w(this,"bindAxes",null,function(){(a.axisTypes||[]).forEach(function(h){var f=0;d[h].forEach(function(b){e=b.options;if(c[h]===f&&!e.isInternal||"undefined"!==typeof c[h]&&c[h]===e.id||"undefined"===typeof c[h]&&0===e.index)a.insert(b.series),a[h]=b,b.isDirty=!0;e.isInternal||f++});a[h]||
a.optionalAxis===h||b(18,!0,d)})});w(this,"afterBindAxes")};a.prototype.updateParallelArrays=function(a,b){var c=a.series,d=arguments,e=O(b)?function(d){var e="y"===d&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=e}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))};c.parallelArrays.forEach(e)};a.prototype.hasData=function(){return this.visible&&"undefined"!==typeof this.dataMax&&"undefined"!==typeof this.dataMin||this.visible&&this.yData&&0<this.yData.length};a.prototype.autoIncrement=
function(a){var b=this.options,c=b.pointIntervalUnit,d=b.relativeXValue,e=this.chart.time,h=this.xIncrement,f;h=y(h,b.pointStart,0);this.pointInterval=f=y(this.pointInterval,b.pointInterval,1);d&&O(a)&&(f*=a);c&&(b=new e.Date(h),"day"===c?e.set("Date",b,e.get("Date",b)+f):"month"===c?e.set("Month",b,e.get("Month",b)+f):"year"===c&&e.set("FullYear",b,e.get("FullYear",b)+f),f=b.getTime()-h);if(d&&O(a))return h+f;this.xIncrement=h+f;return h};a.prototype.setDataSortingOptions=function(){var a=this.options;
p(this,{requireSorting:!1,sorted:!1,enabledDataSorting:!0,allowDG:!1});h(a.pointRange)||(a.pointRange=1)};a.prototype.setOptions=function(a){var b=this.chart,c=b.options,d=c.plotOptions,e=b.userOptions||{};a=S(a);b=b.styledMode;var f={plotOptions:d,userOptions:a};w(this,"setOptions",f);var g=f.plotOptions[this.type],k=e.plotOptions||{};this.userOptions=f.userOptions;e=S(g,d.series,e.plotOptions&&e.plotOptions[this.type],a);this.tooltipOptions=S(l.tooltip,l.plotOptions.series&&l.plotOptions.series.tooltip,
l.plotOptions[this.type].tooltip,c.tooltip.userOptions,d.series&&d.series.tooltip,d[this.type].tooltip,a.tooltip);this.stickyTracking=y(a.stickyTracking,k[this.type]&&k[this.type].stickyTracking,k.series&&k.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:e.stickyTracking);null===g.marker&&delete e.marker;this.zoneAxis=e.zoneAxis;d=this.zones=(e.zones||[]).slice();!e.negativeColor&&!e.negativeFillColor||e.zones||(c={value:e[this.zoneAxis+"Threshold"]||e.threshold||0,className:"highcharts-negative"},
b||(c.color=e.negativeColor,c.fillColor=e.negativeFillColor),d.push(c));d.length&&h(d[d.length-1].value)&&d.push(b?{}:{color:this.color,fillColor:this.fillColor});w(this,"afterSetOptions",{options:e});return e};a.prototype.getName=function(){return y(this.options.name,"Series "+(this.index+1))};a.prototype.getCyclic=function(a,b,c){var d=this.chart,e=this.userOptions,f=a+"Index",g=a+"Counter",k=c?c.length:y(d.options.chart[a+"Count"],d[a+"Count"]);if(!b){var l=y(e[f],e["_"+f]);h(l)||(d.series.length||
(d[g]=0),e["_"+f]=l=d[g]%k,d[g]+=1);c&&(b=c[l])}"undefined"!==typeof l&&(this[f]=l);this[a]=b};a.prototype.getColor=function(){this.chart.styledMode?this.getCyclic("color"):this.options.colorByPoint?this.color="#cccccc":this.getCyclic("color",this.options.color||l.plotOptions[this.type].color,this.chart.options.colors)};a.prototype.getPointsCollection=function(){return(this.hasGroupedData?this.points:this.data)||[]};a.prototype.getSymbol=function(){this.getCyclic("symbol",this.options.marker.symbol,
this.chart.options.symbols)};a.prototype.findPointIndex=function(a,b){var c=a.id,d=a.x,e=this.points,h=this.options.dataSorting,f,g;if(c)h=this.chart.get(c),h instanceof B&&(f=h);else if(this.linkedParent||this.enabledDataSorting||this.options.relativeXValue)if(f=function(b){return!b.touched&&b.index===a.index},h&&h.matchByName?f=function(b){return!b.touched&&b.name===a.name}:this.options.relativeXValue&&(f=function(b){return!b.touched&&b.options.x===a.x}),f=z(e,f),!f)return;if(f){var k=f&&f.index;
"undefined"!==typeof k&&(g=!0)}"undefined"===typeof k&&O(d)&&(k=this.xData.indexOf(d,b));-1!==k&&"undefined"!==typeof k&&this.cropped&&(k=k>=this.cropStart?k-this.cropStart:k);!g&&O(k)&&e[k]&&e[k].touched&&(k=void 0);return k};a.prototype.updateData=function(a,b){var c=this.options,d=c.dataSorting,e=this.points,f=[],g=this.requireSorting,k=a.length===e.length,l,m,p,n=!0;this.xIncrement=null;a.forEach(function(a,b){var m=h(a)&&this.pointClass.prototype.optionsToObject.call({series:this},a)||{},n=m.x;
if(m.id||O(n)){if(m=this.findPointIndex(m,p),-1===m||"undefined"===typeof m?f.push(a):e[m]&&a!==c.data[m]?(e[m].update(a,!1,null,!1),e[m].touched=!0,g&&(p=m+1)):e[m]&&(e[m].touched=!0),!k||b!==m||d&&d.enabled||this.hasDerivedData)l=!0}else f.push(a)},this);if(l)for(a=e.length;a--;)(m=e[a])&&!m.touched&&m.remove&&m.remove(!1,b);else!k||d&&d.enabled?n=!1:(a.forEach(function(a,b){a!==e[b].y&&e[b].update&&e[b].update(a,!1,null,!1)}),f.length=0);e.forEach(function(a){a&&(a.touched=!1)});if(!n)return!1;
f.forEach(function(a){this.addPoint(a,!1,null,null,!1)},this);null===this.xIncrement&&this.xData&&this.xData.length&&(this.xIncrement=I(this.xData),this.autoIncrement());return!0};a.prototype.setData=function(a,c,d,e){void 0===c&&(c=!0);var h=this,f=h.points,g=f&&f.length||0,k=h.options,l=h.chart,m=k.dataSorting,p=h.xAxis,n=k.turboThreshold,F=this.xData,q=this.yData,u=h.pointArrayMap;u=u&&u.length;var w=k.keys,z,y=0,t=1,r=null;if(!l.options.chart.allowMutatingData){k.data&&delete h.options.data;h.userOptions.data&&
delete h.userOptions.data;var A=S(!0,a)}a=A||a||[];A=a.length;m&&m.enabled&&(a=this.sortData(a));l.options.chart.allowMutatingData&&!1!==e&&A&&g&&!h.cropped&&!h.hasGroupedData&&h.visible&&!h.boosted&&(z=this.updateData(a,d));if(!z){h.xIncrement=null;h.colorCounter=0;this.parallelArrays.forEach(function(a){h[a+"Data"].length=0});if(n&&A>n)if(r=h.getFirstValidPoint(a),O(r))for(d=0;d<A;d++)F[d]=this.autoIncrement(),q[d]=a[d];else if(H(r))if(u)if(r.length===u)for(d=0;d<A;d++)F[d]=this.autoIncrement(),
q[d]=a[d];else for(d=0;d<A;d++)e=a[d],F[d]=e[0],q[d]=e.slice(1,u+1);else if(w&&(y=w.indexOf("x"),t=w.indexOf("y"),y=0<=y?y:0,t=0<=t?t:1),1===r.length&&(t=0),y===t)for(d=0;d<A;d++)F[d]=this.autoIncrement(),q[d]=a[d][t];else for(d=0;d<A;d++)e=a[d],F[d]=e[y],q[d]=e[t];else b(12,!1,l);else for(d=0;d<A;d++)"undefined"!==typeof a[d]&&(e={series:h},h.pointClass.prototype.applyOptions.apply(e,[a[d]]),h.updateParallelArrays(e,d));q&&Q(q[0])&&b(14,!0,l);h.data=[];h.options.data=h.userOptions.data=a;for(d=g;d--;)f[d]&&
f[d].destroy&&f[d].destroy();p&&(p.minRange=p.userMinRange);h.isDirty=l.isDirtyBox=!0;h.isDirtyData=!!f;d=!1}"point"===k.legendType&&(this.processData(),this.generatePoints());c&&l.redraw(d)};a.prototype.sortData=function(a){var b=this,c=b.options.dataSorting.sortKey||"y",d=function(a,b){return h(b)&&a.pointClass.prototype.optionsToObject.call({series:a},b)||{}};a.forEach(function(c,e){a[e]=d(b,c);a[e].index=e},this);a.concat().sort(function(a,b){a=N(c,a);b=N(c,b);return b<a?-1:b>a?1:0}).forEach(function(a,
b){a.x=b},this);b.linkedSeries&&b.linkedSeries.forEach(function(b){var c=b.options,e=c.data;c.dataSorting&&c.dataSorting.enabled||!e||(e.forEach(function(c,h){e[h]=d(b,c);a[h]&&(e[h].x=a[h].x,e[h].index=h)}),b.setData(e,!1))});return a};a.prototype.getProcessedData=function(a){var c=this.xAxis,d=this.options,e=d.cropThreshold,h=a||this.getExtremesFromAll||d.getExtremesFromAll,f=this.isCartesian;a=c&&c.val2lin;d=!(!c||!c.logarithmic);var g=0,k=this.xData,l=this.yData,m=this.requireSorting;var p=!1;
var n=k.length;if(c){p=c.getExtremes();var F=p.min;var q=p.max;p=!(!c.categories||c.names.length)}if(f&&this.sorted&&!h&&(!e||n>e||this.forceCrop))if(k[n-1]<F||k[0]>q)k=[],l=[];else if(this.yData&&(k[0]<F||k[n-1]>q)){var u=this.cropData(this.xData,this.yData,F,q);k=u.xData;l=u.yData;g=u.start;u=!0}for(e=k.length||1;--e;)if(c=d?a(k[e])-a(k[e-1]):k[e]-k[e-1],0<c&&("undefined"===typeof w||c<w))var w=c;else 0>c&&m&&!p&&(b(15,!1,this.chart),m=!1);return{xData:k,yData:l,cropped:u,cropStart:g,closestPointRange:w}};
a.prototype.processData=function(a){var b=this.xAxis;if(this.isCartesian&&!this.isDirty&&!b.isDirty&&!this.yAxis.isDirty&&!a)return!1;a=this.getProcessedData();this.cropped=a.cropped;this.cropStart=a.cropStart;this.processedXData=a.xData;this.processedYData=a.yData;this.closestPointRange=this.basePointRange=a.closestPointRange;w(this,"afterProcessData")};a.prototype.cropData=function(a,b,c,d,e){var h=a.length,f,g=0,k=h;e=y(e,this.cropShoulder);for(f=0;f<h;f++)if(a[f]>=c){g=Math.max(0,f-e);break}for(c=
f;c<h;c++)if(a[c]>d){k=c+e;break}return{xData:a.slice(g,k),yData:b.slice(g,k),start:g,end:k}};a.prototype.generatePoints=function(){var a=this.options,b=this.processedData||a.data,c=this.processedXData,d=this.processedYData,e=this.pointClass,h=c.length,f=this.cropStart||0,g=this.hasGroupedData,k=a.keys,l=[];a=a.dataGrouping&&a.dataGrouping.groupAll?f:0;var m,n,q=this.data;if(!q&&!g){var u=[];u.length=b.length;q=this.data=u}k&&g&&(this.options.keys=!1);for(n=0;n<h;n++){u=f+n;if(g){var z=(new e).init(this,
[c[n]].concat(K(d[n])));z.dataGroup=this.groupMap[a+n];z.dataGroup.options&&(z.options=z.dataGroup.options,p(z,z.dataGroup.options),delete z.dataLabels)}else(z=q[u])||"undefined"===typeof b[u]||(q[u]=z=(new e).init(this,b[u],c[n]));z&&(z.index=g?a+n:u,l[n]=z)}this.options.keys=k;if(q&&(h!==(m=q.length)||g))for(n=0;n<m;n++)n!==f||g||(n+=h),q[n]&&(q[n].destroyElements(),q[n].plotX=void 0);this.data=q;this.points=l;w(this,"afterGeneratePoints")};a.prototype.getXExtremes=function(a){return{min:L(a),max:I(a)}};
a.prototype.getExtremes=function(a,b){var c=this.xAxis,d=this.yAxis,e=this.processedXData||this.xData,h=[],f=this.requireSorting?this.cropShoulder:0;d=d?d.positiveValuesOnly:!1;var g,k=0,l=0,m=0;a=a||this.stackedYData||this.processedYData||[];var p=a.length;if(c){var n=c.getExtremes();k=n.min;l=n.max}for(g=0;g<p;g++){var q=e[g];n=a[g];var u=(O(n)||H(n))&&(n.length||0<n||!d);q=b||this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||!c||(e[g+f]||q)>=k&&(e[g-f]||q)<=l;if(u&&q)if(u=
n.length)for(;u--;)O(n[u])&&(h[m++]=n[u]);else h[m++]=n}a={activeYData:h,dataMin:L(h),dataMax:I(h)};w(this,"afterGetExtremes",{dataExtremes:a});return a};a.prototype.applyExtremes=function(){var a=this.getExtremes();this.dataMin=a.dataMin;this.dataMax=a.dataMax;return a};a.prototype.getFirstValidPoint=function(a){for(var b=a.length,c=0,d=null;null===d&&c<b;)d=a[c],c++;return d};a.prototype.translate=function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,
c=this.xAxis,d=c.categories,e=this.enabledDataSorting,f=this.yAxis,g=this.points,k=g.length,l=this.pointPlacementToXValue(),m=!!l,p=a.threshold,n=a.startFromThreshold?p:0,u=this.zoneAxis||"y",z,t,r=Number.MAX_VALUE;for(z=0;z<k;z++){var C=g[z],v=C.x,x=void 0,I=void 0,N=C.y,J=C.low,D=b&&f.stacking&&f.stacking.stacks[(this.negStacks&&N<(n?0:p)?"-":"")+this.stackKey];if(f.positiveValuesOnly&&!f.validatePositiveValue(N)||c.positiveValuesOnly&&!c.validatePositiveValue(v))C.isNull=!0;C.plotX=t=q(A(c.translate(v,
0,0,0,1,l,"flags"===this.type),-1E5,1E5));if(b&&this.visible&&D&&D[v]){var B=this.getStackIndicator(B,v,this.index);C.isNull||(x=D[v],I=x.points[B.key])}H(I)&&(J=I[0],N=I[1],J===n&&B.key===D[v].base&&(J=y(O(p)&&p,f.min)),f.positiveValuesOnly&&0>=J&&(J=null),C.total=C.stackTotal=x.total,C.percentage=x.total&&C.y/x.total*100,C.stackY=N,this.irregularWidths||x.setOffset(this.pointXOffset||0,this.barW||0));C.yBottom=h(J)?A(f.translate(J,0,1,0,1),-1E5,1E5):null;this.dataModify&&(N=this.dataModify.modifyValue(N,
z));C.plotY=void 0;O(N)&&(x=f.translate(N,!1,!0,!1,!0),"undefined"!==typeof x&&(C.plotY=A(x,-1E5,1E5)));C.isInside=this.isPointInside(C);C.clientX=m?q(c.translate(v,0,0,0,1,l)):t;C.negative=C[u]<(a[u+"Threshold"]||p||0);C.category=y(d&&d[C.x],C.x);if(!C.isNull&&!1!==C.visible){"undefined"!==typeof E&&(r=Math.min(r,Math.abs(t-E)));var E=t}C.zone=this.zones.length?C.getZone():void 0;!C.graphic&&this.group&&e&&(C.isNew=!0)}this.closestPointRangePx=r;w(this,"afterTranslate")};a.prototype.getValidPoints=
function(a,b,c){var d=this.chart;return(a||this.points||[]).filter(function(a){return b&&!d.isInsidePlot(a.plotX,a.plotY,{inverted:d.inverted})?!1:!1!==a.visible&&(c||!a.isNull)})};a.prototype.getClipBox=function(){var a=this.chart,b=this.xAxis,c=this.yAxis,d=S(a.clipBox);b&&b.len!==a.plotSizeX&&(d.width=b.len);c&&c.len!==a.plotSizeY&&(d.height=c.len);return d};a.prototype.getSharedClipKey=function(){return this.sharedClipKey=(this.options.xAxis||0)+","+(this.options.yAxis||0)};a.prototype.setClip=
function(){var a=this.chart,b=this.group,c=this.markerGroup,d=a.sharedClips;a=a.renderer;var e=this.getClipBox(),h=this.getSharedClipKey(),f=d[h];f?f.animate(e):d[h]=f=a.clipRect(e);b&&b.clip(!1===this.options.clip?void 0:f);c&&c.clip()};a.prototype.animate=function(a){var b=this.chart,c=this.group,d=this.markerGroup,e=b.inverted,h=f(this.options.animation),g=[this.getSharedClipKey(),h.duration,h.easing,h.defer].join(),k=b.sharedClips[g],l=b.sharedClips[g+"m"];if(a&&c)h=this.getClipBox(),k?k.attr("height",
h.height):(h.width=0,e&&(h.x=b.plotHeight),k=b.renderer.clipRect(h),b.sharedClips[g]=k,l=b.renderer.clipRect({x:e?(b.plotSizeX||0)+99:-99,y:e?-b.plotLeft:-b.plotTop,width:99,height:e?b.chartWidth:b.chartHeight}),b.sharedClips[g+"m"]=l),c.clip(k),d&&d.clip(l);else if(k&&!k.hasClass("highcharts-animating")){b=this.getClipBox();var m=h.step;d&&d.element.childNodes.length&&(h.step=function(a,b){m&&m.apply(b,arguments);l&&l.element&&l.attr(b.prop,"width"===b.prop?a+99:a)});k.addClass("highcharts-animating").animate(b,
h)}};a.prototype.afterAnimate=function(){var a=this;this.setClip();Y(this.chart.sharedClips,function(b,c,d){b&&!a.chart.container.querySelector('[clip-path="url(#'.concat(b.id,')"]'))&&(b.destroy(),delete d[c])});this.finishedAnimating=!0;w(this,"afterAnimate")};a.prototype.drawPoints=function(a){void 0===a&&(a=this.points);var b=this.chart,c=this.options.marker,d=this[this.specialGroup]||this.markerGroup,e=this.xAxis,h=y(c.enabled,!e||e.isRadial?!0:null,this.closestPointRangePx>=c.enabledThreshold*
c.radius),f,g;if(!1!==c.enabled||this._hasPointMarkers)for(f=0;f<a.length;f++){var k=a[f];var l=(g=k.graphic)?"animate":"attr";var m=k.marker||{};var p=!!k.marker;if((h&&"undefined"===typeof m.enabled||m.enabled)&&!k.isNull&&!1!==k.visible){var n=y(m.symbol,this.symbol,"rect");var q=this.markerAttribs(k,k.selected&&"select");this.enabledDataSorting&&(k.startXPos=e.reversed?-(q.width||0):e.width);var u=!1!==k.isInside;g?g[u?"show":"hide"](u).animate(q):u&&(0<(q.width||0)||k.hasImage)&&(k.graphic=g=
b.renderer.symbol(n,q.x,q.y,q.width,q.height,p?m:c).add(d),this.enabledDataSorting&&b.hasRendered&&(g.attr({x:k.startXPos}),l="animate"));g&&"animate"===l&&g[u?"show":"hide"](u).animate(q);if(g&&!b.styledMode)g[l](this.pointAttribs(k,k.selected&&"select"));g&&g.addClass(k.getClassName(),!0)}else g&&(k.graphic=g.destroy())}};a.prototype.markerAttribs=function(a,b){var c=this.options,d=c.marker,e=a.marker||{},h=e.symbol||d.symbol,f=y(e.radius,d&&d.radius);b&&(d=d.states[b],b=e.states&&e.states[b],f=
y(b&&b.radius,d&&d.radius,f&&f+(d&&d.radiusPlus||0)));a.hasImage=h&&0===h.indexOf("url");a.hasImage&&(f=0);a=O(f)?{x:c.crisp?Math.floor(a.plotX-f):a.plotX-f,y:a.plotY-f}:{};f&&(a.width=a.height=2*f);return a};a.prototype.pointAttribs=function(a,b){var c=this.options.marker,d=a&&a.options,e=d&&d.marker||{},h=d&&d.color,f=a&&a.color,g=a&&a.zone&&a.zone.color,k=this.color;a=y(e.lineWidth,c.lineWidth);d=1;k=h||g||f||k;h=e.fillColor||c.fillColor||k;f=e.lineColor||c.lineColor||k;b=b||"normal";c=c.states[b]||
{};b=e.states&&e.states[b]||{};a=y(b.lineWidth,c.lineWidth,a+y(b.lineWidthPlus,c.lineWidthPlus,0));h=b.fillColor||c.fillColor||h;f=b.lineColor||c.lineColor||f;d=y(b.opacity,c.opacity,d);return{stroke:f,"stroke-width":a,fill:h,opacity:d}};a.prototype.destroy=function(a){var b=this,c=b.chart,d=/AppleWebKit\/533/.test(C.navigator.userAgent),e=b.data||[],h,f,g,l;w(b,"destroy",{keepEventsForUpdate:a});this.removeEvents(a);(b.axisTypes||[]).forEach(function(a){(l=b[a])&&l.series&&(k(l.series,b),l.isDirty=
l.forceRedraw=!0)});b.legendItem&&b.chart.legend.destroyItem(b);for(f=e.length;f--;)(g=e[f])&&g.destroy&&g.destroy();b.clips&&b.clips.forEach(function(a){return a.destroy()});n.clearTimeout(b.animationTimeout);Y(b,function(a,b){a instanceof t&&!a.survive&&(h=d&&"group"===b?"hide":"destroy",a[h]())});c.hoverSeries===b&&(c.hoverSeries=void 0);k(c.series,b);c.orderSeries();Y(b,function(c,d){a&&"hcEvents"===d||delete b[d]})};a.prototype.applyZones=function(){var a=this,b=this.chart,c=b.renderer,d=this.zones,
e=this.clips||[],h=this.graph,f=this.area,g=Math.max(b.plotWidth,b.plotHeight),k=this[(this.zoneAxis||"y")+"Axis"],l=b.inverted,m,p,n,q,u,w,z,t,r=!1;if(d.length&&(h||f)&&k&&"undefined"!==typeof k.min){var C=k.reversed;var v=k.horiz;h&&!this.showLine&&h.hide();f&&f.hide();var H=k.getExtremes();d.forEach(function(d,F){m=C?v?b.plotWidth:0:v?0:k.toPixels(H.min)||0;m=A(y(p,m),0,g);p=A(Math.round(k.toPixels(y(d.value,H.max),!0)||0),0,g);r&&(m=p=k.toPixels(H.max));q=Math.abs(m-p);u=Math.min(m,p);w=Math.max(m,
p);k.isXAxis?(n={x:l?w:u,y:0,width:q,height:g},v||(n.x=b.plotHeight-n.x)):(n={x:0,y:l?w:u,width:g,height:q},v&&(n.y=b.plotWidth-n.y));l&&c.isVML&&(n=k.isXAxis?{x:0,y:C?u:w,height:n.width,width:b.chartWidth}:{x:n.y-b.plotLeft-b.spacingBox.x,y:0,width:n.height,height:b.chartHeight});e[F]?e[F].animate(n):e[F]=c.clipRect(n);z=a["zone-area-"+F];t=a["zone-graph-"+F];h&&t&&t.clip(e[F]);f&&z&&z.clip(e[F]);r=d.value>H.max;a.resetZones&&0===p&&(p=void 0)});this.clips=e}else a.visible&&(h&&h.show(),f&&f.show())};
a.prototype.plotGroup=function(a,b,c,d,e){var f=this[a],g=!f;c={visibility:c,zIndex:d||.1};"undefined"===typeof this.opacity||this.chart.styledMode||"inactive"===this.state||(c.opacity=this.opacity);g&&(this[a]=f=this.chart.renderer.g().add(e));f.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(h(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(f.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);f.attr(c)[g?
"attr":"animate"](this.getPlotBox(b));return f};a.prototype.getPlotBox=function(a){var b=this.xAxis,c=this.yAxis,d=this.chart;a=d.inverted&&!d.polar&&b&&!1!==this.invertible&&("markers"===a||"series"===a);d.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:d.plotLeft,translateY:c?c.top:d.plotTop,rotation:a?90:0,rotationOriginX:a?(b.len-c.len)/2:0,rotationOriginY:a?(b.len+c.len)/2:0,scaleX:a?-1:1,scaleY:1}};a.prototype.removeEvents=function(a){a||T(this);this.eventsToUnbind.length&&(this.eventsToUnbind.forEach(function(a){a()}),
this.eventsToUnbind.length=0)};a.prototype.render=function(){var a=this,b=a.chart,c=a.options,d=f(c.animation),e=a.visible?"inherit":"hidden",h=c.zIndex,g=a.hasRendered,k=b.seriesGroup;b=!a.finishedAnimating&&b.renderer.isSVG?d.duration:0;w(this,"render");a.plotGroup("group","series",e,h,k);a.markerGroup=a.plotGroup("markerGroup","markers",e,h,k);!1!==c.clip&&a.setClip();a.animate&&b&&a.animate(!0);a.drawGraph&&(a.drawGraph(),a.applyZones());a.visible&&a.drawPoints();a.drawDataLabels&&a.drawDataLabels();
a.redrawPoints&&a.redrawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.animate&&b&&a.animate();g||(b&&d.defer&&(b+=d.defer),a.animationTimeout=ca(function(){a.afterAnimate()},b||0));a.isDirty=!1;a.hasRendered=!0;w(a,"afterRender")};a.prototype.redraw=function(){var a=this.isDirty||this.isDirtyData;this.translate();this.render();a&&delete this.kdTree};a.prototype.searchPoint=function(a,b){var c=this.xAxis,d=this.yAxis,e=this.chart.inverted;return this.searchKDTree({clientX:e?
c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?d.len-a.chartX+d.pos:a.chartY-d.pos},b,a)};a.prototype.buildKDTree=function(a){function b(a,d,e){var h=a&&a.length;if(h){var f=c.kdAxisArray[d%e];a.sort(function(a,b){return a[f]-b[f]});h=Math.floor(h/2);return{point:a[h],left:b(a.slice(0,h),d+1,e),right:b(a.slice(h+1),d+1,e)}}}this.buildingKdTree=!0;var c=this,d=-1<c.options.findNearestPointBy.indexOf("y")?2:1;delete c.kdTree;ca(function(){c.kdTree=b(c.getValidPoints(null,!c.directTouch),d,d);c.buildingKdTree=
!1},c.options.kdNow||a&&"touchstart"===a.type?0:1)};a.prototype.searchKDTree=function(a,b,c){function d(a,b,c,l){var m=b.point,p=e.kdAxisArray[c%l],n=m,q=h(a[f])&&h(m[f])?Math.pow(a[f]-m[f],2):null;var u=h(a[g])&&h(m[g])?Math.pow(a[g]-m[g],2):null;u=(q||0)+(u||0);m.dist=h(u)?Math.sqrt(u):Number.MAX_VALUE;m.distX=h(q)?Math.sqrt(q):Number.MAX_VALUE;p=a[p]-m[p];u=0>p?"left":"right";q=0>p?"right":"left";b[u]&&(u=d(a,b[u],c+1,l),n=u[k]<n[k]?u:m);b[q]&&Math.sqrt(p*p)<n[k]&&(a=d(a,b[q],c+1,l),n=a[k]<n[k]?
a:n);return n}var e=this,f=this.kdAxisArray[0],g=this.kdAxisArray[1],k=b?"distX":"dist";b=-1<e.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree(c);if(this.kdTree)return d(a,this.kdTree,b,b)};a.prototype.pointPlacementToXValue=function(){var a=this.options,b=a.pointRange,c=this.xAxis;a=a.pointPlacement;"between"===a&&(a=c.reversed?-.5:.5);return O(a)?a*(b||c.pointRange):0};a.prototype.isPointInside=function(a){var b=this.chart,c=this.xAxis,d=this.yAxis;
return"undefined"!==typeof a.plotY&&"undefined"!==typeof a.plotX&&0<=a.plotY&&a.plotY<=(d?d.len:b.plotHeight)&&0<=a.plotX&&a.plotX<=(c?c.len:b.plotWidth)};a.prototype.drawTracker=function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),h=a.chart,f=h.pointer,g=h.renderer,k=h.options.tooltip.snap,l=a.tracker,m=function(b){if(h.hoverSeries!==a)a.onMouseOver()},p="rgba(192,192,192,"+(u?.0001:.002)+")";l?l.attr({d:d}):a.graph&&(a.tracker=g.path(d).attr({visibility:a.visible?
"inherit":"hidden",zIndex:2}).addClass(c?"highcharts-tracker-area":"highcharts-tracker-line").add(a.group),h.styledMode||a.tracker.attr({"stroke-linecap":"round","stroke-linejoin":"round",stroke:p,fill:c?p:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*k)}),[a.tracker,a.markerGroup,a.dataLabelsGroup].forEach(function(a){if(a&&(a.addClass("highcharts-tracker").on("mouseover",m).on("mouseout",function(a){f.onTrackerMouseOut(a)}),b.cursor&&!h.styledMode&&a.css({cursor:b.cursor}),e))a.on("touchstart",
m)}));w(this,"afterDrawTracker")};a.prototype.addPoint=function(a,b,c,d,e){var h=this.options,f=this.data,g=this.chart,k=this.xAxis;k=k&&k.hasNames&&k.names;var l=h.data,m=this.xData,p;b=y(b,!0);var n={series:this};this.pointClass.prototype.applyOptions.apply(n,[a]);var u=n.x;var q=m.length;if(this.requireSorting&&u<m[q-1])for(p=!0;q&&m[q-1]>u;)q--;this.updateParallelArrays(n,"splice",q,0,0);this.updateParallelArrays(n,q);k&&n.name&&(k[u]=n.name);l.splice(q,0,a);if(p||this.processedData)this.data.splice(q,
0,null),this.processData();"point"===h.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(n,"shift"),l.shift()));!1!==e&&w(this,"addPoint",{point:n});this.isDirtyData=this.isDirty=!0;b&&g.redraw(d)};a.prototype.removePoint=function(a,b,d){var e=this,h=e.data,f=h[a],g=e.points,k=e.chart,l=function(){g&&g.length===h.length&&g.splice(a,1);h.splice(a,1);e.options.data.splice(a,1);e.updateParallelArrays(f||{series:e},"splice",a,1);f&&f.destroy();
e.isDirty=!0;e.isDirtyData=!0;b&&k.redraw()};c(d,k);b=y(b,!0);f?f.firePointEvent("remove",null,l):l()};a.prototype.remove=function(a,b,c,d){function e(){h.destroy(d);f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();y(a,!0)&&f.redraw(b)}var h=this,f=h.chart;!1!==c?w(h,"remove",null,e):e()};a.prototype.update=function(a,c){a=d(a,this.userOptions);w(this,"update",{options:a});var e=this,h=e.chart,f=e.userOptions,g=e.initialType||e.type,k=h.options.plotOptions,l=v[g].prototype,m=e.finishedAnimating&&{animation:!1},
n={},q=["eventOptions","navigatorSeries","baseSeries"],u=a.type||f.type||h.options.chart.type,z=!(this.hasDerivedData||u&&u!==this.type||"undefined"!==typeof a.pointStart||"undefined"!==typeof a.pointInterval||"undefined"!==typeof a.relativeXValue||a.joinBy||a.mapData||e.hasOptionChanged("dataGrouping")||e.hasOptionChanged("pointStart")||e.hasOptionChanged("pointInterval")||e.hasOptionChanged("pointIntervalUnit")||e.hasOptionChanged("keys"));u=u||g;z&&(q.push("data","isDirtyData","points","processedData",
"processedXData","processedYData","xIncrement","cropped","_hasPointMarkers","_hasPointLabels","clips","nodes","layout","level","mapMap","mapData","minY","maxY","minX","maxX"),!1!==a.visible&&q.push("area","graph"),e.parallelArrays.forEach(function(a){q.push(a+"Data")}),a.data&&(a.dataSorting&&p(e.options.dataSorting,a.dataSorting),this.setData(a.data,!1)));a=S(f,m,{index:"undefined"===typeof f.index?e.index:f.index,pointStart:y(k&&k.series&&k.series.pointStart,f.pointStart,e.xData[0])},!z&&{data:e.options.data},
a);z&&a.data&&(a.data=e.options.data);q=["group","markerGroup","dataLabelsGroup","transformGroup","shadowGroup"].concat(q);q.forEach(function(a){q[a]=e[a];delete e[a]});k=!1;if(v[u]){if(k=u!==e.type,e.remove(!1,!1,!1,!0),k)if(Object.setPrototypeOf)Object.setPrototypeOf(e,v[u].prototype);else{m=Object.hasOwnProperty.call(e,"hcEvents")&&e.hcEvents;for(t in l)e[t]=void 0;p(e,v[u].prototype);m?e.hcEvents=m:delete e.hcEvents}}else b(17,!0,h,{missingModuleFor:u});q.forEach(function(a){e[a]=q[a]});e.init(h,
a);if(z&&this.points){a=e.options;if(!1===a.visible)n.graphic=1,n.dataLabel=1;else if(!e._hasPointLabels){l=a.marker;var t=a.dataLabels;!l||!1!==l.enabled&&(f.marker&&f.marker.symbol)===l.symbol||(n.graphic=1);t&&!1===t.enabled&&(n.dataLabel=1)}f=0;for(l=this.points;f<l.length;f++)(t=l[f])&&t.series&&(t.resolveColor(),Object.keys(n).length&&t.destroyElements(n),!1===a.showInLegend&&t.legendItem&&h.legend.destroyItem(t))}e.initialType=g;h.linkSeries();k&&e.linkedSeries.length&&(e.isDirtyData=!0);w(this,
"afterUpdate");y(c,!0)&&h.redraw(z?void 0:!1)};a.prototype.setName=function(a){this.name=this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0};a.prototype.hasOptionChanged=function(a){var b=this.options[a],c=this.chart.options.plotOptions,d=this.userOptions[a];return d?b!==d:b!==y(c&&c[this.type]&&c[this.type][a],c&&c.series&&c.series[a],b)};a.prototype.onMouseOver=function(){var a=this.chart,b=a.hoverSeries;a.pointer.setHoverChartIndex();if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&
w(this,"mouseOver");this.setState("hover");a.hoverSeries=this};a.prototype.onMouseOut=function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&w(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();b.series.forEach(function(a){a.setState("",!0)})};a.prototype.setState=function(a,b){var c=this,d=c.options,e=c.graph,h=d.inactiveOtherPoints,f=d.states,g=y(f[a||"normal"]&&f[a||"normal"].animation,
c.chart.options.chart.animation),k=d.lineWidth,l=0,m=d.opacity;a=a||"";if(c.state!==a&&([c.group,c.markerGroup,c.dataLabelsGroup].forEach(function(b){b&&(c.state&&b.removeClass("highcharts-series-"+c.state),a&&b.addClass("highcharts-series-"+a))}),c.state=a,!c.chart.styledMode)){if(f[a]&&!1===f[a].enabled)return;a&&(k=f[a].lineWidth||k+(f[a].lineWidthPlus||0),m=y(f[a].opacity,m));if(e&&!e.dashstyle&&O(k))for(d={"stroke-width":k},e.animate(d,g);c["zone-graph-"+l];)c["zone-graph-"+l].animate(d,g),l+=
1;h||[c.group,c.markerGroup,c.dataLabelsGroup,c.labelBySeries].forEach(function(a){a&&a.animate({opacity:m},g)})}b&&h&&c.points&&c.setAllPointsToState(a||void 0)};a.prototype.setAllPointsToState=function(a){this.points.forEach(function(b){b.setState&&b.setState(a)})};a.prototype.setVisible=function(a,b){var c=this,d=c.chart,e=d.options.chart.ignoreHiddenSeries,h=c.visible,f=(c.visible=a=c.options.visible=c.userOptions.visible="undefined"===typeof a?!h:a)?"show":"hide";["group","dataLabelsGroup","markerGroup",
"tracker","tt"].forEach(function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();c.legendItem&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&d.series.forEach(function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});c.linkedSeries.forEach(function(b){b.setVisible(a,!1)});e&&(d.isDirtyBox=!0);w(c,f);!1!==b&&d.redraw()};a.prototype.show=function(){this.setVisible(!0)};a.prototype.hide=function(){this.setVisible(!1)};a.prototype.select=
function(a){this.selected=a=this.options.selected="undefined"===typeof a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);w(this,a?"select":"unselect")};a.prototype.shouldShowTooltip=function(a,b,c){void 0===c&&(c={});c.series=this;c.visiblePlotOnly=!0;return this.chart.isInsidePlot(a,b,c)};a.defaultOptions=G;a.types=r.seriesTypes;a.registerType=r.registerSeriesType;return a}();p(a.prototype,{axisTypes:["xAxis","yAxis"],coll:"series",colorCounter:0,cropShoulder:1,directTouch:!1,drawLegendSymbol:D.drawLineMarker,
isCartesian:!0,kdAxisArray:["clientX","plotY"],parallelArrays:["x","y"],pointClass:B,requireSorting:!0,sorted:!0});r.series=a;"";"";return a});K(g,"Extensions/ScrollablePlotArea.js",[g["Core/Animation/AnimationUtilities.js"],g["Core/Axis/Axis.js"],g["Core/Chart/Chart.js"],g["Core/Series/Series.js"],g["Core/Renderer/RendererRegistry.js"],g["Core/Utilities.js"]],function(a,g,x,E,D,B){var v=a.stop,r=B.addEvent,t=B.createElement,n=B.defined,f=B.merge,c=B.pick;r(x,"afterSetChartSize",function(a){var c=
this.options.chart.scrollablePlotArea,e=c&&c.minWidth;c=c&&c.minHeight;if(!this.renderer.forExport){if(e){if(this.scrollablePixelsX=e=Math.max(0,e-this.chartWidth)){this.scrollablePlotBox=this.renderer.scrollablePlotBox=f(this.plotBox);this.plotBox.width=this.plotWidth+=e;this.inverted?this.clipBox.height+=e:this.clipBox.width+=e;var l={1:{name:"right",value:e}}}}else c&&(this.scrollablePixelsY=e=Math.max(0,c-this.chartHeight),n(e)&&(this.scrollablePlotBox=this.renderer.scrollablePlotBox=f(this.plotBox),
this.plotBox.height=this.plotHeight+=e,this.inverted?this.clipBox.width+=e:this.clipBox.height+=e,l={2:{name:"bottom",value:e}}));l&&!a.skipAxes&&this.axes.forEach(function(a){l[a.side]?a.getPlotLinePath=function(){var c=l[a.side].name,e=this[c];this[c]=e-l[a.side].value;var f=g.prototype.getPlotLinePath.apply(this,arguments);this[c]=e;return f}:(a.setAxisSize(),a.setAxisTranslation())})}});r(x,"render",function(){this.scrollablePixelsX||this.scrollablePixelsY?(this.setUpScrolling&&this.setUpScrolling(),
this.applyFixed()):this.fixedDiv&&this.applyFixed()});x.prototype.setUpScrolling=function(){var a=this,c={WebkitOverflowScrolling:"touch",overflowX:"hidden",overflowY:"hidden"};this.scrollablePixelsX&&(c.overflowX="auto");this.scrollablePixelsY&&(c.overflowY="auto");this.scrollingParent=t("div",{className:"highcharts-scrolling-parent"},{position:"relative"},this.renderTo);this.scrollingContainer=t("div",{className:"highcharts-scrolling"},c,this.scrollingParent);var e;r(this.scrollingContainer,"scroll",
function(){a.pointer&&(delete a.pointer.chartPosition,a.hoverPoint&&(e=a.hoverPoint),a.pointer.runPointActions(void 0,e,!0))});this.innerContainer=t("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null};x.prototype.moveFixedElements=function(){var a=this.container,c=this.fixedRenderer,e=".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
f;this.scrollablePixelsX&&!this.inverted?f=".highcharts-yaxis":this.scrollablePixelsX&&this.inverted?f=".highcharts-xaxis":this.scrollablePixelsY&&!this.inverted?f=".highcharts-xaxis":this.scrollablePixelsY&&this.inverted&&(f=".highcharts-yaxis");f&&e.push(""+f+":not(.highcharts-radial-axis)",""+f+"-labels:not(.highcharts-radial-axis-labels)");e.forEach(function(e){[].forEach.call(a.querySelectorAll(e),function(a){(a.namespaceURI===c.SVG_NS?c.box:c.box.parentNode).appendChild(a);a.style.pointerEvents=
"auto"})})};x.prototype.applyFixed=function(){var a=!this.fixedDiv,f=this.options.chart,e=f.scrollablePlotArea,g=D.getRendererType();a?(this.fixedDiv=t("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:(f.style&&f.style.zIndex||0)+2,top:0},null,!0),this.scrollingContainer&&this.scrollingContainer.parentNode.insertBefore(this.fixedDiv,this.scrollingContainer),this.renderTo.style.overflow="visible",this.fixedRenderer=f=new g(this.fixedDiv,this.chartWidth,
this.chartHeight,this.options.chart.style),this.scrollableMask=f.path().attr({fill:this.options.chart.backgroundColor||"#fff","fill-opacity":c(e.opacity,.85),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),r(this,"afterShowResetZoom",this.moveFixedElements),r(this,"afterApplyDrilldown",this.moveFixedElements),r(this,"afterLayOutTitles",this.moveFixedElements)):this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);if(this.scrollableDirty||a)this.scrollableDirty=!1,this.moveFixedElements();
f=this.chartWidth+(this.scrollablePixelsX||0);g=this.chartHeight+(this.scrollablePixelsY||0);v(this.container);this.container.style.width=f+"px";this.container.style.height=g+"px";this.renderer.boxWrapper.attr({width:f,height:g,viewBox:[0,0,f,g].join(" ")});this.chartBackground.attr({width:f,height:g});this.scrollingContainer.style.height=this.chartHeight+"px";a&&(e.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixelsX*e.scrollPositionX),e.scrollPositionY&&(this.scrollingContainer.scrollTop=
this.scrollablePixelsY*e.scrollPositionY));g=this.axisOffset;a=this.plotTop-g[0]-1;e=this.plotLeft-g[3]-1;f=this.plotTop+this.plotHeight+g[2]+1;g=this.plotLeft+this.plotWidth+g[1]+1;var n=this.plotLeft+this.plotWidth-(this.scrollablePixelsX||0),x=this.plotTop+this.plotHeight-(this.scrollablePixelsY||0);a=this.scrollablePixelsX?[["M",0,a],["L",this.plotLeft-1,a],["L",this.plotLeft-1,f],["L",0,f],["Z"],["M",n,a],["L",this.chartWidth,a],["L",this.chartWidth,f],["L",n,f],["Z"]]:this.scrollablePixelsY?
[["M",e,0],["L",e,this.plotTop-1],["L",g,this.plotTop-1],["L",g,0],["Z"],["M",e,x],["L",e,this.chartHeight],["L",g,this.chartHeight],["L",g,x],["Z"]]:[["M",0,0]];"adjustHeight"!==this.redrawTrigger&&this.scrollableMask.attr({d:a})};r(g,"afterInit",function(){this.chart.scrollableDirty=!0});r(E,"show",function(){this.chart.scrollableDirty=!0});""});K(g,"Core/Axis/Stacking/StackItem.js",[g["Core/FormatUtilities.js"],g["Core/Series/SeriesRegistry.js"],g["Core/Utilities.js"]],function(a,g,x){var v=a.format,
D=g.series,B=x.defined,G=x.destroyObjectProperties,r=x.isNumber,t=x.pick;a=function(){function a(a,c,g,m,e){var f=a.chart.inverted;this.axis=a;this.isNegative=g;this.options=c=c||{};this.x=m;this.cumulative=this.total=null;this.points={};this.hasValidPoints=!1;this.stack=e;this.rightCliff=this.leftCliff=0;this.alignOptions={align:c.align||(f?g?"left":"right":"center"),verticalAlign:c.verticalAlign||(f?"middle":g?"bottom":"top"),y:c.y,x:c.x};this.textAlign=c.textAlign||(f?g?"right":"left":"center")}
a.prototype.destroy=function(){G(this,this.axis)};a.prototype.render=function(a){var c=this.axis.chart,f=this.options,g=f.format;g=g?v(g,this,c):f.formatter.call(this);this.label?this.label.attr({text:g,visibility:"hidden"}):(this.label=c.renderer.label(g,null,null,f.shape,null,null,f.useHTML,!1,"stack-labels"),g={r:f.borderRadius||0,text:g,rotation:f.rotation,padding:t(f.padding,5),visibility:"hidden"},c.styledMode||(g.fill=f.backgroundColor,g.stroke=f.borderColor,g["stroke-width"]=f.borderWidth,
this.label.css(f.style)),this.label.attr(g),this.label.added||this.label.add(a));this.label.labelrank=c.plotSizeY};a.prototype.setOffset=function(a,c,g,m,e){var f=this.axis,l=f.chart;m=f.translate(f.stacking.usePercentage?100:m?m:this.total,0,0,0,1);g=f.translate(g?g:0);a=t(e,l.xAxis[0].translate(this.x))+a;f=B(m)&&this.getStackBox(l,this,a,m,c,Math.abs(m-g),f);c=this.label;g=this.isNegative;var n=this.textAlign;c&&f&&(a=c.getBBox(),e=c.padding,m="justify"===t(this.options.overflow,"justify"),n="left"===
n?l.inverted?-e:e:"right"===n?a.width:l.inverted&&"center"===n?a.width/2:l.inverted?g?a.width+e:-e:a.width/2,g=l.inverted?a.height/2:g?-e:a.height,this.alignOptions.x=t(this.options.x,0),this.alignOptions.y=t(this.options.y,0),f.x-=n,f.y-=g,c.align(this.alignOptions,null,f),l.isInsidePlot(c.alignAttr.x+n-this.alignOptions.x,c.alignAttr.y+g-this.alignOptions.y)?c.show():(c.hide(),m=!1),m&&D.prototype.justifyDataLabel.call(this.axis,c,this.alignOptions,c.alignAttr,a,f),c.attr({x:c.alignAttr.x,y:c.alignAttr.y}),
t(!m&&this.options.crop,!0)&&((l=r(c.x)&&r(c.y)&&l.isInsidePlot(c.x-e+c.width,c.y)&&l.isInsidePlot(c.x+e,c.y))||c.hide()))};a.prototype.getStackBox=function(a,c,g,m,e,n,t){var f=c.axis.reversed,l=a.inverted,u=t.height+t.pos-(l?a.plotLeft:a.plotTop);c=c.isNegative&&!f||!c.isNegative&&f;return{x:l?c?m-t.right:m-n+t.pos-a.plotLeft:g+a.xAxis[0].transB-a.plotLeft,y:l?t.height-g-e:c?u-m-n:u-m,width:l?n:e,height:l?e:n}};return a}();"";return a});K(g,"Core/Axis/Stacking/StackingAxis.js",[g["Core/Animation/AnimationUtilities.js"],
g["Core/Axis/Axis.js"],g["Core/Series/SeriesRegistry.js"],g["Core/Axis/Stacking/StackItem.js"],g["Core/Utilities.js"]],function(a,g,x,E,D){function v(){var a=this,b=a.inverted;a.yAxis.forEach(function(a){a.stacking&&a.stacking.stacks&&a.hasVisibleSeries&&(a.stacking.oldStacks=a.stacking.stacks)});a.series.forEach(function(c){var d=c.xAxis&&c.xAxis.options||{};!c.options.stacking||!0!==c.visible&&!1!==a.options.chart.ignoreHiddenSeries||(c.stackKey=[c.type,h(c.options.stack,""),b?d.top:d.left,b?d.height:
d.width].join())})}function G(){var a=this.stacking;if(a){var b=a.stacks;q(b,function(a,c){I(a);b[c]=null});a&&a.stackTotalGroup&&a.stackTotalGroup.destroy()}}function r(){this.stacking||(this.stacking=new k(this))}function t(a,b,c,d){!J(a)||a.x!==b||d&&a.stackKey!==d?a={x:b,index:0,key:d,stackKey:d}:a.index++;a.key=[c,b,a.index].join();return a}function n(){var a=this,b=a.stackKey,c=a.yAxis.stacking.stacks,d=a.processedXData,e=a[a.options.stacking+"Stacker"],h;e&&[b,"-"+b].forEach(function(b){for(var f=
d.length,g,k;f--;)g=d[f],h=a.getStackIndicator(h,g,a.index,b),(k=(g=c[b]&&c[b][g])&&g.points[h.key])&&e.call(a,k,g,f)})}function f(a,b,c){b=b.total?100/b.total:0;a[0]=C(a[0]*b);a[1]=C(a[1]*b);this.stackedYData[c]=a[1]}function c(){var a=this.yAxis.stacking;this.options.centerInCategory&&(this.is("column")||this.is("columnrange"))&&!this.options.stacking&&1<this.chart.series.length?e.setStackedPoints.call(this,"group"):a&&q(a.stacks,function(b,c){"group"===c.slice(-5)&&(q(b,function(a){return a.destroy()}),
delete a.stacks[c])})}function l(a){var b=this.chart,c=a||this.options.stacking;if(c&&(!0===this.visible||!1===b.options.chart.ignoreHiddenSeries)){var d=this.processedXData,e=this.processedYData,f=[],g=e.length,k=this.options,l=k.threshold,m=h(k.startFromThreshold&&l,0);k=k.stack;a=a?""+this.type+",".concat(c):this.stackKey;var n="-"+a,p=this.negStacks;b="group"===c?b.yAxis[0]:this.yAxis;var q=b.stacking.stacks,u=b.stacking.oldStacks,t,r;b.stacking.stacksTouched+=1;for(r=0;r<g;r++){var v=d[r];var x=
e[r];var I=this.getStackIndicator(I,v,this.index);var D=I.key;var B=(t=p&&x<(m?0:l))?n:a;q[B]||(q[B]={});q[B][v]||(u[B]&&u[B][v]?(q[B][v]=u[B][v],q[B][v].total=null):q[B][v]=new E(b,b.options.stackLabels,!!t,v,k));B=q[B][v];null!==x?(B.points[D]=B.points[this.index]=[h(B.cumulative,m)],J(B.cumulative)||(B.base=D),B.touched=b.stacking.stacksTouched,0<I.index&&!1===this.singleStacks&&(B.points[D][0]=B.points[this.index+","+v+",0"][0])):B.points[D]=B.points[this.index]=null;"percent"===c?(t=t?a:n,p&&
q[t]&&q[t][v]?(t=q[t][v],B.total=t.total=Math.max(t.total,B.total)+Math.abs(x)||0):B.total=C(B.total+(Math.abs(x)||0))):"group"===c?(A(x)&&(x=x[0]),null!==x&&(B.total=(B.total||0)+1)):B.total=C(B.total+(x||0));B.cumulative="group"===c?(B.total||1)-1:h(B.cumulative,m)+(x||0);null!==x&&(B.points[D].push(B.cumulative),f[r]=B.cumulative,B.hasValidPoints=!0)}"percent"===c&&(b.stacking.usePercentage=!0);"group"!==c&&(this.stackedYData=f);b.stacking.oldStacks={}}}var m=a.getDeferredAnimation,e=x.series.prototype,
u=D.addEvent,C=D.correctFloat,J=D.defined,I=D.destroyObjectProperties,L=D.fireEvent,A=D.isArray,d=D.isNumber,q=D.objectEach,h=D.pick,k=function(){function a(a){this.oldStacks={};this.stacks={};this.stacksTouched=0;this.axis=a}a.prototype.buildStacks=function(){var a=this.axis,b=a.series,c=a.options.reversedStacks,d=b.length,e;if(!a.isXAxis){this.usePercentage=!1;for(e=d;e--;){var h=b[c?e:d-e-1];h.setStackedPoints();h.setGroupedPoints()}for(e=0;e<d;e++)b[e].modifyStacks();L(a,"afterBuildStacks")}};
a.prototype.cleanStacks=function(){if(!this.axis.isXAxis){if(this.oldStacks)var a=this.stacks=this.oldStacks;q(a,function(a){q(a,function(a){a.cumulative=a.total})})}};a.prototype.resetStacks=function(){var a=this,b=a.stacks;a.axis.isXAxis||q(b,function(b){q(b,function(c,e){d(c.touched)&&c.touched<a.stacksTouched?(c.destroy(),delete b[e]):(c.total=null,c.cumulative=null)})})};a.prototype.renderStackTotals=function(){var a=this.axis,b=a.chart,c=b.renderer,d=this.stacks;a=m(b,a.options.stackLabels&&
a.options.stackLabels.animation||!1);var e=this.stackTotalGroup=this.stackTotalGroup||c.g("stack-labels").attr({zIndex:6,opacity:0}).add();e.translate(b.plotLeft,b.plotTop);q(d,function(a){q(a,function(a){a.render(e)})});e.animate({opacity:1},a)};return a}(),b;(function(a){var b=[];a.compose=function(a,d,e){-1===b.indexOf(a)&&(b.push(a),u(a,"init",r),u(a,"destroy",G));-1===b.indexOf(d)&&(b.push(d),d.prototype.getStacks=v);-1===b.indexOf(e)&&(b.push(e),a=e.prototype,a.getStackIndicator=t,a.modifyStacks=
n,a.percentStacker=f,a.setGroupedPoints=c,a.setStackedPoints=l)}})(b||(b={}));return b});K(g,"Series/Line/LineSeries.js",[g["Core/Series/Series.js"],g["Core/Series/SeriesRegistry.js"],g["Core/Utilities.js"]],function(a,g,x){var v=this&&this.__extends||function(){var a=function(g,t){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,f){a.__proto__=f}||function(a,f){for(var c in f)f.hasOwnProperty(c)&&(a[c]=f[c])};return a(g,t)};return function(g,t){function n(){this.constructor=g}
a(g,t);g.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}(),D=x.defined,B=x.merge;x=function(g){function r(){var a=null!==g&&g.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}v(r,g);r.prototype.drawGraph=function(){var a=this,g=this.options,f=(this.gappedPath||this.getGraphPath).call(this),c=this.chart.styledMode,l=[["graph","highcharts-graph"]];c||l[0].push(g.lineColor||this.color||"#cccccc",g.dashStyle);l=a.getZonesGraphs(l);l.forEach(function(l,
e){var m=l[0],n=a[m],t=n?"animate":"attr";n?(n.endX=a.preventGraphAnimation?null:f.xMap,n.animate({d:f})):f.length&&(a[m]=n=a.chart.renderer.path(f).addClass(l[1]).attr({zIndex:1}).add(a.group));n&&!c&&(m={stroke:l[2],"stroke-width":g.lineWidth||0,fill:a.fillGraph&&a.color||"none"},l[3]?m.dashstyle=l[3]:"square"!==g.linecap&&(m["stroke-linecap"]=m["stroke-linejoin"]="round"),n[t](m).shadow(2>e&&g.shadow));n&&(n.startX=f.xMap,n.isArea=f.isArea)})};r.prototype.getGraphPath=function(a,g,f){var c=this,
l=c.options,m=[],e=[],n,t=l.step;a=a||c.points;var r=a.reversed;r&&a.reverse();(t={right:1,center:2}[t]||t&&3)&&r&&(t=4-t);a=this.getValidPoints(a,!1,!(l.connectNulls&&!g&&!f));a.forEach(function(u,r){var A=u.plotX,d=u.plotY,q=a[r-1];(u.leftCliff||q&&q.rightCliff)&&!f&&(n=!0);u.isNull&&!D(g)&&0<r?n=!l.connectNulls:u.isNull&&!g?n=!0:(0===r||n?r=[["M",u.plotX,u.plotY]]:c.getPointSpline?r=[c.getPointSpline(a,u,r)]:t?(r=1===t?[["L",q.plotX,d]]:2===t?[["L",(q.plotX+A)/2,q.plotY],["L",(q.plotX+A)/2,d]]:
[["L",A,q.plotY]],r.push(["L",A,d])):r=[["L",A,d]],e.push(u.x),t&&(e.push(u.x),2===t&&e.push(u.x)),m.push.apply(m,r),n=!1)});m.xMap=e;return c.graphPath=m};r.prototype.getZonesGraphs=function(a){this.zones.forEach(function(g,f){f=["zone-graph-"+f,"highcharts-graph highcharts-zone-graph-"+f+" "+(g.className||"")];this.chart.styledMode||f.push(g.color||this.color,g.dashStyle||this.options.dashStyle);a.push(f)},this);return a};r.defaultOptions=B(a.defaultOptions,{});return r}(a);g.registerSeriesType("line",
x);"";return x});K(g,"Series/Area/AreaSeries.js",[g["Core/Color/Color.js"],g["Core/Legend/LegendSymbol.js"],g["Core/Series/SeriesRegistry.js"],g["Core/Utilities.js"]],function(a,g,x,E){var v=this&&this.__extends||function(){var a=function(c,f){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(c,f)};return function(c,f){function g(){this.constructor=c}a(c,f);c.prototype=null===f?Object.create(f):
(g.prototype=f.prototype,new g)}}(),B=a.parse,G=x.seriesTypes.line;a=E.extend;var r=E.merge,t=E.objectEach,n=E.pick;E=function(a){function c(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.options=void 0;c.points=void 0;return c}v(c,a);c.prototype.drawGraph=function(){this.areaPath=[];a.prototype.drawGraph.apply(this);var c=this,f=this.areaPath,e=this.options,g=[["area","highcharts-area",this.color,e.fillColor]];this.zones.forEach(function(a,f){g.push(["zone-area-"+f,"highcharts-area highcharts-zone-area-"+
f+" "+a.className,a.color||c.color,a.fillColor||e.fillColor])});g.forEach(function(a){var g=a[0],l={},m=c[g],u=m?"animate":"attr";m?(m.endX=c.preventGraphAnimation?null:f.xMap,m.animate({d:f})):(l.zIndex=0,m=c[g]=c.chart.renderer.path(f).addClass(a[1]).add(c.group),m.isArea=!0);c.chart.styledMode||(l.fill=n(a[3],B(a[2]).setOpacity(n(e.fillOpacity,.75)).get()));m[u](l);m.startX=f.xMap;m.shiftUnit=e.step?2:1})};c.prototype.getGraphPath=function(a){var c=G.prototype.getGraphPath,e=this.options,f=e.stacking,
g=this.yAxis,l=[],t=[],r=this.index,A=g.stacking.stacks[this.stackKey],d=e.threshold,q=Math.round(g.getThreshold(e.threshold));e=n(e.connectNulls,"percent"===f);var h=function(b,c,e){var h=a[b];b=f&&A[h.x].points[r];var k=h[e+"Null"]||0;e=h[e+"Cliff"]||0;h=!0;if(e||k){var m=(k?b[0]:b[1])+e;var n=b[0]+e;h=!!k}else!f&&a[c]&&a[c].isNull&&(m=n=d);"undefined"!==typeof m&&(t.push({plotX:z,plotY:null===m?q:g.getThreshold(m),isNull:h,isCliff:!0}),l.push({plotX:z,plotY:null===n?q:g.getThreshold(n),doCurve:!1}))};
a=a||this.points;f&&(a=this.getStackPoints(a));for(var k=0,b=a.length;k<b;++k){f||(a[k].leftCliff=a[k].rightCliff=a[k].leftNull=a[k].rightNull=void 0);var p=a[k].isNull;var z=n(a[k].rectPlotX,a[k].plotX);var w=f?n(a[k].yBottom,q):q;if(!p||e)e||h(k,k-1,"left"),p&&!f&&e||(t.push(a[k]),l.push({x:k,plotX:z,plotY:w})),e||h(k,k+1,"right")}h=c.call(this,t,!0,!0);l.reversed=!0;p=c.call(this,l,!0,!0);(w=p[0])&&"M"===w[0]&&(p[0]=["L",w[1],w[2]]);p=h.concat(p);p.length&&p.push(["Z"]);c=c.call(this,t,!1,e);p.xMap=
h.xMap;this.areaPath=p;return c};c.prototype.getStackPoints=function(a){var c=this,e=[],f=[],g=this.xAxis,l=this.yAxis,r=l.stacking.stacks[this.stackKey],v={},A=l.series,d=A.length,q=l.options.reversedStacks?1:-1,h=A.indexOf(c);a=a||this.points;if(this.options.stacking){for(var k=0;k<a.length;k++)a[k].leftNull=a[k].rightNull=void 0,v[a[k].x]=a[k];t(r,function(a,b){null!==a.total&&f.push(b)});f.sort(function(a,b){return a-b});var b=A.map(function(a){return a.visible});f.forEach(function(a,k){var m=
0,p,u;if(v[a]&&!v[a].isNull)e.push(v[a]),[-1,1].forEach(function(e){var g=1===e?"rightNull":"leftNull",l=r[f[k+e]],m=0;if(l)for(var n=h;0<=n&&n<d;){var t=A[n].index;p=l.points[t];p||(t===c.index?v[a][g]=!0:b[n]&&(u=r[a].points[t])&&(m-=u[1]-u[0]));n+=q}v[a][1===e?"rightCliff":"leftCliff"]=m});else{for(var t=h;0<=t&&t<d;){if(p=r[a].points[A[t].index]){m=p[1];break}t+=q}m=n(m,0);m=l.translate(m,0,1,0,1);e.push({isNull:!0,plotX:g.translate(a,0,0,0,1),x:a,plotY:m,yBottom:m})}})}return e};c.defaultOptions=
r(G.defaultOptions,{threshold:0});return c}(G);a(E.prototype,{singleStacks:!1,drawLegendSymbol:g.drawRectangle});x.registerSeriesType("area",E);"";return E});K(g,"Series/Spline/SplineSeries.js",[g["Core/Series/SeriesRegistry.js"],g["Core/Utilities.js"]],function(a,g){var v=this&&this.__extends||function(){var a=function(g,t){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,f){a.__proto__=f}||function(a,f){for(var c in f)f.hasOwnProperty(c)&&(a[c]=f[c])};return a(g,t)};return function(g,
t){function n(){this.constructor=g}a(g,t);g.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}(),E=a.seriesTypes.line,D=g.merge,B=g.pick;g=function(a){function g(){var g=null!==a&&a.apply(this,arguments)||this;g.data=void 0;g.options=void 0;g.points=void 0;return g}v(g,a);g.prototype.getPointSpline=function(a,g,f){var c=g.plotX||0,l=g.plotY||0,m=a[f-1];f=a[f+1];if(m&&!m.isNull&&!1!==m.doCurve&&!g.isCliff&&f&&!f.isNull&&!1!==f.doCurve&&!g.isCliff){a=m.plotY||0;var e=f.plotX||0;f=
f.plotY||0;var n=0;var t=(1.5*c+(m.plotX||0))/2.5;var r=(1.5*l+a)/2.5;e=(1.5*c+e)/2.5;var v=(1.5*l+f)/2.5;e!==t&&(n=(v-r)*(e-c)/(e-t)+l-v);r+=n;v+=n;r>a&&r>l?(r=Math.max(a,l),v=2*l-r):r<a&&r<l&&(r=Math.min(a,l),v=2*l-r);v>f&&v>l?(v=Math.max(f,l),r=2*l-v):v<f&&v<l&&(v=Math.min(f,l),r=2*l-v);g.rightContX=e;g.rightContY=v}g=["C",B(m.rightContX,m.plotX,0),B(m.rightContY,m.plotY,0),B(t,c,0),B(r,l,0),c,l];m.rightContX=m.rightContY=void 0;return g};g.defaultOptions=D(E.defaultOptions);return g}(E);a.registerSeriesType("spline",
g);"";return g});K(g,"Series/AreaSpline/AreaSplineSeries.js",[g["Series/Spline/SplineSeries.js"],g["Core/Legend/LegendSymbol.js"],g["Core/Series/SeriesRegistry.js"],g["Core/Utilities.js"]],function(a,g,x,E){var v=this&&this.__extends||function(){var a=function(f,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(f,c)};return function(f,c){function g(){this.constructor=f}a(f,c);f.prototype=
null===c?Object.create(c):(g.prototype=c.prototype,new g)}}(),B=x.seriesTypes,G=B.area;B=B.area.prototype;var r=E.extend,t=E.merge;E=function(g){function f(){var a=null!==g&&g.apply(this,arguments)||this;a.data=void 0;a.points=void 0;a.options=void 0;return a}v(f,g);f.defaultOptions=t(a.defaultOptions,G.defaultOptions);return f}(a);r(E.prototype,{getGraphPath:B.getGraphPath,getStackPoints:B.getStackPoints,drawGraph:B.drawGraph,drawLegendSymbol:g.drawRectangle});x.registerSeriesType("areaspline",E);
"";return E});K(g,"Series/Column/ColumnSeriesDefaults.js",[],function(){"";return{borderRadius:0,centerInCategory:!1,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:void 0,verticalAlign:void 0,y:void 0},startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"}});K(g,"Series/Column/ColumnSeries.js",[g["Core/Animation/AnimationUtilities.js"],
g["Core/Color/Color.js"],g["Series/Column/ColumnSeriesDefaults.js"],g["Core/Globals.js"],g["Core/Legend/LegendSymbol.js"],g["Core/Series/Series.js"],g["Core/Series/SeriesRegistry.js"],g["Core/Utilities.js"]],function(a,g,x,E,D,B,G,r){var t=this&&this.__extends||function(){var a=function(c,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(c,d)};return function(c,d){function e(){this.constructor=
c}a(c,d);c.prototype=null===d?Object.create(d):(e.prototype=d.prototype,new e)}}(),n=a.animObject,f=g.parse,c=E.hasTouch;a=E.noop;var l=r.clamp,m=r.defined,e=r.extend,u=r.fireEvent,v=r.isArray,J=r.isNumber,I=r.merge,L=r.pick,A=r.objectEach;r=function(a){function d(){var c=null!==a&&a.apply(this,arguments)||this;c.borderWidth=void 0;c.data=void 0;c.group=void 0;c.options=void 0;c.points=void 0;return c}t(d,a);d.prototype.animate=function(a){var c=this,b=this.yAxis,d=c.options,h=this.chart.inverted,
f={},g=h?"translateX":"translateY";if(a)f.scaleY=.001,a=l(b.toPixels(d.threshold),b.pos,b.pos+b.len),h?f.translateX=a-b.len:f.translateY=a,c.clipBox&&c.setClip(),c.group.attr(f);else{var m=Number(c.group.attr(g));c.group.animate({scaleY:1},e(n(c.options.animation),{step:function(a,d){c.group&&(f[g]=m+d.pos*(b.pos-m),c.group.attr(f))}}))}};d.prototype.init=function(c,d){a.prototype.init.apply(this,arguments);var b=this;c=b.chart;c.hasRendered&&c.series.forEach(function(a){a.type===b.type&&(a.isDirty=
!0)})};d.prototype.getColumnMetrics=function(){var a=this,c=a.options,b=a.xAxis,d=a.yAxis,e=b.options.reversedStacks;e=b.reversed&&!e||!b.reversed&&e;var f={},g,l=0;!1===c.grouping?l=1:a.chart.series.forEach(function(b){var c=b.yAxis,e=b.options;if(b.type===a.type&&(b.visible||!a.chart.options.chart.ignoreHiddenSeries)&&d.len===c.len&&d.pos===c.pos){if(e.stacking&&"group"!==e.stacking){g=b.stackKey;"undefined"===typeof f[g]&&(f[g]=l++);var h=f[g]}else!1!==e.grouping&&(h=l++);b.columnIndex=h}});var m=
Math.min(Math.abs(b.transA)*(b.ordinal&&b.ordinal.slope||c.pointRange||b.closestPointRange||b.tickInterval||1),b.len),n=m*c.groupPadding,q=(m-2*n)/(l||1);c=Math.min(c.maxPointWidth||b.len,L(c.pointWidth,q*(1-2*c.pointPadding)));a.columnMetrics={width:c,offset:(q-c)/2+(n+((a.columnIndex||0)+(e?1:0))*q-m/2)*(e?-1:1),paddedWidth:q,columnCount:l};return a.columnMetrics};d.prototype.crispCol=function(a,c,b,d){var e=this.chart,h=this.borderWidth,f=-(h%2?.5:0);h=h%2?.5:1;e.inverted&&e.renderer.isVML&&(h+=
1);this.options.crisp&&(b=Math.round(a+b)+f,a=Math.round(a)+f,b-=a);d=Math.round(c+d)+h;f=.5>=Math.abs(c)&&.5<d;c=Math.round(c)+h;d-=c;f&&d&&(--c,d+=1);return{x:a,y:c,width:b,height:d}};d.prototype.adjustForMissingColumns=function(a,c,b,d){var e=this,h=this.options.stacking;if(!b.isNull&&1<d.columnCount){var f=this.yAxis.options.reversedStacks,g=0,k=f?0:-d.columnCount;A(this.yAxis.stacking&&this.yAxis.stacking.stacks,function(a){if("number"===typeof b.x){var c=a[b.x.toString()];c&&(a=c.points[e.index],
h?(a&&(g=k),c.hasValidPoints&&(f?k++:k--)):v(a)&&(a=Object.keys(c.points).filter(function(a){return!a.match(",")&&c.points[a]&&1<c.points[a].length}).map(parseFloat).sort(function(a,b){return b-a}),g=a.indexOf(e.index),k=a.length))}});a=(b.plotX||0)+((k-1)*d.paddedWidth+c)/2-c-g*d.paddedWidth}return a};d.prototype.translate=function(){var a=this,c=a.chart,b=a.options,d=a.dense=2>a.closestPointRange*a.xAxis.transA;d=a.borderWidth=L(b.borderWidth,d?0:1);var e=a.xAxis,f=a.yAxis,g=b.threshold,n=a.translatedThreshold=
f.getThreshold(g),q=L(b.minPointLength,5),u=a.getColumnMetrics(),t=u.width,r=a.pointXOffset=u.offset,y=a.dataMin,A=a.dataMax,v=a.barW=Math.max(t,1+2*d);c.inverted&&(n-=.5);b.pointPadding&&(v=Math.ceil(v));B.prototype.translate.apply(a);a.points.forEach(function(d){var h=L(d.yBottom,n),k=999+Math.abs(h),p=d.plotX||0;k=l(d.plotY,-k,f.len+k);var w=Math.min(k,h),z=Math.max(k,h)-w,C=t,x=p+r,B=v;q&&Math.abs(z)<q&&(z=q,p=!f.reversed&&!d.negative||f.reversed&&d.negative,J(g)&&J(A)&&d.y===g&&A<=g&&(f.min||
0)<g&&(y!==A||(f.max||0)<=g)&&(p=!p),w=Math.abs(w-n)>q?h-q:n-(p?q:0));m(d.options.pointWidth)&&(C=B=Math.ceil(d.options.pointWidth),x-=Math.round((C-t)/2));b.centerInCategory&&(x=a.adjustForMissingColumns(x,C,d,u));d.barX=x;d.pointWidth=C;d.tooltipPos=c.inverted?[l(f.len+f.pos-c.plotLeft-k,f.pos-c.plotLeft,f.len+f.pos-c.plotLeft),e.len+e.pos-c.plotTop-x-B/2,z]:[e.left-c.plotLeft+x+B/2,l(k+f.pos-c.plotTop,f.pos-c.plotTop,f.len+f.pos-c.plotTop),z];d.shapeType=a.pointClass.prototype.shapeType||"rect";
d.shapeArgs=a.crispCol.apply(a,d.isNull?[x,n,B,0]:[x,w,B,z])})};d.prototype.drawGraph=function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")};d.prototype.pointAttribs=function(a,c){var b=this.options,d=this.pointAttrToOptions||{},e=d.stroke||"borderColor",h=d["stroke-width"]||"borderWidth",g=a&&a.color||this.color,k=a&&a[e]||b[e]||g;d=a&&a.options.dashStyle||b.dashStyle;var l=a&&a[h]||b[h]||this[h]||0,m=L(a&&a.opacity,b.opacity,1);if(a&&this.zones.length){var n=a.getZone();
g=a.options.color||n&&(n.color||a.nonZonedColor)||this.color;n&&(k=n.borderColor||k,d=n.dashStyle||d,l=n.borderWidth||l)}c&&a&&(a=I(b.states[c],a.options.states&&a.options.states[c]||{}),c=a.brightness,g=a.color||"undefined"!==typeof c&&f(g).brighten(a.brightness).get()||g,k=a[e]||k,l=a[h]||l,d=a.dashStyle||d,m=L(a.opacity,m));e={fill:g,stroke:k,"stroke-width":l,opacity:m};d&&(e.dashstyle=d);return e};d.prototype.drawPoints=function(a){void 0===a&&(a=this.points);var c=this,b=this.chart,d=c.options,
e=b.renderer,f=d.animationLimit||250,h;a.forEach(function(a){var g=a.graphic,k=!!g,l=g&&b.pointCount<f?"animate":"attr";if(J(a.plotY)&&null!==a.y){h=a.shapeArgs;g&&a.hasNewShapeType()&&(g=g.destroy());c.enabledDataSorting&&(a.startXPos=c.xAxis.reversed?-(h?h.width||0:0):c.xAxis.width);g||(a.graphic=g=e[a.shapeType](h).add(a.group||c.group))&&c.enabledDataSorting&&b.hasRendered&&b.pointCount<f&&(g.attr({x:a.startXPos}),k=!0,l="animate");if(g&&k)g[l](I(h));if(d.borderRadius)g[l]({r:d.borderRadius});
b.styledMode||g[l](c.pointAttribs(a,a.selected&&"select")).shadow(!1!==a.allowShadow&&d.shadow,null,d.stacking&&!d.borderRadius);g&&(g.addClass(a.getClassName(),!0),g.attr({visibility:a.visible?"inherit":"hidden"}))}else g&&(a.graphic=g.destroy())})};d.prototype.drawTracker=function(a){void 0===a&&(a=this.points);var d=this,b=d.chart,e=b.pointer,f=function(a){var b=e.getPointFromEvent(a);"undefined"!==typeof b&&(e.isDirectTouch=!0,b.onMouseOver(a))},h;a.forEach(function(a){h=v(a.dataLabels)?a.dataLabels:
a.dataLabel?[a.dataLabel]:[];a.graphic&&(a.graphic.element.point=a);h.forEach(function(b){b.div?b.div.point=a:b.element.point=a})});d._hasTracking||(d.trackerGroups.forEach(function(a){if(d[a]){d[a].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){e.onTrackerMouseOut(a)});if(c)d[a].on("touchstart",f);!b.styledMode&&d.options.cursor&&d[a].css({cursor:d.options.cursor})}}),d._hasTracking=!0);u(this,"afterDrawTracker")};d.prototype.remove=function(){var a=this,c=a.chart;c.hasRendered&&
c.series.forEach(function(b){b.type===a.type&&(b.isDirty=!0)});B.prototype.remove.apply(a,arguments)};d.defaultOptions=I(B.defaultOptions,x);return d}(B);e(r.prototype,{cropShoulder:0,directTouch:!0,drawLegendSymbol:D.drawRectangle,getSymbol:a,negStacks:!0,trackerGroups:["group","dataLabelsGroup"]});G.registerSeriesType("column",r);"";return r});K(g,"Core/Series/DataLabel.js",[g["Core/Animation/AnimationUtilities.js"],g["Core/FormatUtilities.js"],g["Core/Utilities.js"]],function(a,g,x){var v=a.getDeferredAnimation,
D=g.format,B=x.defined,G=x.extend,r=x.fireEvent,t=x.isArray,n=x.isString,f=x.merge,c=x.objectEach,l=x.pick,m=x.splat,e;(function(a){function e(a,c,b,d,e){var f=this,h=this.chart,g=this.isCartesian&&h.inverted,k=this.enabledDataSorting,m=a.plotX,n=a.plotY,q=b.rotation,p=b.align,u=B(m)&&B(n)&&h.isInsidePlot(m,Math.round(n),{inverted:g,paneCoordinates:!0,series:f}),t=function(b){k&&f.xAxis&&!r&&f.setDataLabelStartPos(a,c,e,u,b)},r="justify"===l(b.overflow,k?"none":"justify"),A=this.visible&&!1!==a.visible&&
B(m)&&(a.series.forceDL||k&&!r||u||l(b.inside,!!this.options.stacking)&&d&&h.isInsidePlot(m,g?d.x+1:d.y+d.height-1,{inverted:g,paneCoordinates:!0,series:f}));if(A&&B(m)&&B(n)){q&&c.attr({align:p});p=c.getBBox(!0);var v=[0,0];var z=h.renderer.fontMetrics(h.styledMode?void 0:b.style.fontSize,c).b;d=G({x:g?this.yAxis.len-n:m,y:Math.round(g?this.xAxis.len-m:n),width:0,height:0},d);G(b,{width:p.width,height:p.height});q?(r=!1,v=h.renderer.rotCorr(z,q),z={x:d.x+(b.x||0)+d.width/2+v.x,y:d.y+(b.y||0)+{top:0,
middle:.5,bottom:1}[b.verticalAlign]*d.height},v=[p.x-Number(c.attr("x")),p.y-Number(c.attr("y"))],t(z),c[e?"attr":"animate"](z)):(t(d),c.align(b,void 0,d),z=c.alignAttr);r&&0<=d.height?this.justifyDataLabel(c,b,z,p,d,e):l(b.crop,!0)&&(d=z.x,t=z.y,d+=v[0],t+=v[1],A=h.isInsidePlot(d,t,{paneCoordinates:!0,series:f})&&h.isInsidePlot(d+p.width,t+p.height,{paneCoordinates:!0,series:f}));if(b.shape&&!q)c[e?"attr":"animate"]({anchorX:g?h.plotWidth-n:m,anchorY:g?h.plotHeight-m:n})}e&&k&&(c.placed=!1);A||
k&&!r?c.show():(c.hide(),c.placed=!1)}function g(a,c){var b=c.filter;return b?(c=b.operator,a=a[b.property],b=b.value,">"===c&&a>b||"<"===c&&a<b||">="===c&&a>=b||"<="===c&&a<=b||"=="===c&&a==b||"==="===c&&a===b?!0:!1):!0}function u(a){void 0===a&&(a=this.points);var d=this,b=d.chart,e=d.options,f=d.hasRendered||0,h=b.renderer,q=b.options.chart,u=q.backgroundColor;q=q.plotBackgroundColor;var C=h.getContrast(n(q)&&q||n(u)&&u||"#000000"),x=e.dataLabels,E;u=x.animation;u=x.defer?v(b,u,d):{defer:0,duration:0};
x=A(A(b.options.plotOptions&&b.options.plotOptions.series&&b.options.plotOptions.series.dataLabels,b.options.plotOptions&&b.options.plotOptions[d.type]&&b.options.plotOptions[d.type].dataLabels),x);r(this,"drawDataLabels");if(t(x)||x.enabled||d._hasPointLabels){var I=d.plotGroup("dataLabelsGroup","data-labels",f?"inherit":"hidden",x.zIndex||6);I.attr({opacity:+f});!f&&(f=d.dataLabelsGroup)&&(d.visible&&I.show(),f[e.animation?"animate":"attr"]({opacity:1},u));a.forEach(function(a){E=m(A(x,a.dlOptions||
a.options&&a.options.dataLabels));E.forEach(function(f,k){var m=f.enabled&&(!a.isNull||a.dataLabelOnNull)&&g(a,f),n=a.connectors?a.connectors[k]:a.connector,q=a.dataLabels?a.dataLabels[k]:a.dataLabel,p=!q,u=l(f.distance,a.labelDistance);if(m){var t=a.getLabelConfig();var r=l(f[a.formatPrefix+"Format"],f.format);t=B(r)?D(r,t,b):(f[a.formatPrefix+"Formatter"]||f.formatter).call(t,f);r=f.style;var A=f.rotation;b.styledMode||(r.color=l(f.color,r.color,d.color,"#000000"),"contrast"===r.color?(a.contrastColor=
h.getContrast(a.color||d.color),r.color=!B(u)&&f.inside||0>u||e.stacking?a.contrastColor:C):delete a.contrastColor,e.cursor&&(r.cursor=e.cursor));var v={r:f.borderRadius||0,rotation:A,padding:f.padding,zIndex:1};b.styledMode||(v.fill=f.backgroundColor,v.stroke=f.borderColor,v["stroke-width"]=f.borderWidth);c(v,function(a,b){"undefined"===typeof a&&delete v[b]})}!q||m&&B(t)&&!!q.div===!!f.useHTML&&(q.rotation&&f.rotation||q.rotation===f.rotation)||(p=!0,a.dataLabel=q=a.dataLabel&&a.dataLabel.destroy(),
a.dataLabels&&(1===a.dataLabels.length?delete a.dataLabels:delete a.dataLabels[k]),k||delete a.dataLabel,n&&(a.connector=a.connector.destroy(),a.connectors&&(1===a.connectors.length?delete a.connectors:delete a.connectors[k])));m&&B(t)?(q?v.text=t:(a.dataLabels=a.dataLabels||[],q=a.dataLabels[k]=A?h.text(t,0,0,f.useHTML).addClass("highcharts-data-label"):h.label(t,0,0,f.shape,null,null,f.useHTML,null,"data-label"),k||(a.dataLabel=q),q.addClass(" highcharts-data-label-color-"+a.colorIndex+" "+(f.className||
"")+(f.useHTML?" highcharts-tracker":""))),q.options=f,q.attr(v),b.styledMode||q.css(r).shadow(f.shadow),(k=f[a.formatPrefix+"TextPath"]||f.textPath)&&!f.useHTML&&(q.setTextPath(a.getDataLabelPath&&a.getDataLabelPath(q)||a.graphic,k),a.dataLabelPath&&!k.enabled&&(a.dataLabelPath=a.dataLabelPath.destroy())),q.added||q.add(I),d.alignDataLabel(a,q,f,null,p)):q&&q.hide()})})}r(this,"afterDrawDataLabels")}function x(a,c,b,d,e,f){var h=this.chart,g=c.align,k=c.verticalAlign,l=a.box?0:a.padding||0,m=c.x;
m=void 0===m?0:m;var n=c.y;n=void 0===n?0:n;var q=(b.x||0)+l;if(0>q){"right"===g&&0<=m?(c.align="left",c.inside=!0):m-=q;var p=!0}q=(b.x||0)+d.width-l;q>h.plotWidth&&("left"===g&&0>=m?(c.align="right",c.inside=!0):m+=h.plotWidth-q,p=!0);q=b.y+l;0>q&&("bottom"===k&&0<=n?(c.verticalAlign="top",c.inside=!0):n-=q,p=!0);q=(b.y||0)+d.height-l;q>h.plotHeight&&("top"===k&&0>=n?(c.verticalAlign="bottom",c.inside=!0):n+=h.plotHeight-q,p=!0);p&&(c.x=m,c.y=n,a.placed=!f,a.align(c,void 0,e));return p}function A(a,
c){var b=[],d;if(t(a)&&!t(c))b=a.map(function(a){return f(a,c)});else if(t(c)&&!t(a))b=c.map(function(b){return f(a,b)});else if(t(a)||t(c))for(d=Math.max(a.length,c.length);d--;)b[d]=f(a[d],c[d]);else b=f(a,c);return b}function d(a,c,b,d,e){var f=this.chart,h=f.inverted,g=this.xAxis,k=g.reversed,l=h?c.height/2:c.width/2;a=(a=a.pointWidth)?a/2:0;c.startXPos=h?e.x:k?-l-a:g.width-l+a;c.startYPos=h?k?this.yAxis.height-l+a:-l-a:e.y;d?"hidden"===c.visibility&&(c.show(),c.attr({opacity:0}).animate({opacity:1})):
c.attr({opacity:1}).animate({opacity:0},void 0,c.hide);f.hasRendered&&(b&&c.attr({x:c.startXPos,y:c.startYPos}),c.placed=!0)}var q=[];a.compose=function(a){if(-1===q.indexOf(a)){var c=a.prototype;q.push(a);c.alignDataLabel=e;c.drawDataLabels=u;c.justifyDataLabel=x;c.setDataLabelStartPos=d}}})(e||(e={}));"";return e});K(g,"Series/Column/ColumnDataLabel.js",[g["Core/Series/DataLabel.js"],g["Core/Series/SeriesRegistry.js"],g["Core/Utilities.js"]],function(a,g,x){var v=g.series,D=x.merge,B=x.pick,G;(function(g){function t(a,
c,g,m,e){var f=this.chart.inverted,l=a.series,n=(l.xAxis?l.xAxis.len:this.chart.plotSizeX)||0;l=(l.yAxis?l.yAxis.len:this.chart.plotSizeY)||0;var t=a.dlBox||a.shapeArgs,r=B(a.below,a.plotY>B(this.translatedThreshold,l)),A=B(g.inside,!!this.options.stacking);t&&(m=D(t),0>m.y&&(m.height+=m.y,m.y=0),t=m.y+m.height-l,0<t&&t<m.height&&(m.height-=t),f&&(m={x:l-m.y-m.height,y:n-m.x-m.width,width:m.height,height:m.width}),A||(f?(m.x+=r?0:m.width,m.width=0):(m.y+=r?m.height:0,m.height=0)));g.align=B(g.align,
!f||A?"center":r?"right":"left");g.verticalAlign=B(g.verticalAlign,f||A?"middle":r?"top":"bottom");v.prototype.alignDataLabel.call(this,a,c,g,m,e);g.inside&&a.contrastColor&&c.css({color:a.contrastColor})}var n=[];g.compose=function(f){a.compose(v);-1===n.indexOf(f)&&(n.push(f),f.prototype.alignDataLabel=t)}})(G||(G={}));return G});K(g,"Series/Bar/BarSeries.js",[g["Series/Column/ColumnSeries.js"],g["Core/Series/SeriesRegistry.js"],g["Core/Utilities.js"]],function(a,g,x){var v=this&&this.__extends||
function(){var a=function(g,t){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,f){a.__proto__=f}||function(a,f){for(var c in f)f.hasOwnProperty(c)&&(a[c]=f[c])};return a(g,t)};return function(g,t){function n(){this.constructor=g}a(g,t);g.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}(),D=x.extend,B=x.merge;x=function(g){function r(){var a=null!==g&&g.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}v(r,g);r.defaultOptions=
B(a.defaultOptions,{});return r}(a);D(x.prototype,{inverted:!0});g.registerSeriesType("bar",x);"";return x});K(g,"Series/Scatter/ScatterSeriesDefaults.js",[],function(){"";return{lineWidth:0,findNearestPointBy:"xy",jitter:{x:0,y:0},marker:{enabled:!0},tooltip:{headerFormat:'<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}}});K(g,"Series/Scatter/ScatterSeries.js",[g["Series/Scatter/ScatterSeriesDefaults.js"],
g["Core/Series/SeriesRegistry.js"],g["Core/Utilities.js"]],function(a,g,x){var v=this&&this.__extends||function(){var a=function(f,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(f,c)};return function(f,c){function g(){this.constructor=f}a(f,c);f.prototype=null===c?Object.create(c):(g.prototype=c.prototype,new g)}}(),D=g.seriesTypes,B=D.column,G=D.line;D=x.addEvent;var r=x.extend,t=x.merge;
x=function(g){function f(){var a=null!==g&&g.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}v(f,g);f.prototype.applyJitter=function(){var a=this,f=this.options.jitter,g=this.points.length;f&&this.points.forEach(function(c,l){["x","y"].forEach(function(e,m){var n="plot"+e.toUpperCase();if(f[e]&&!c.isNull){var u=a[e+"Axis"];var t=f[e]*u.transA;if(u&&!u.isLog){var d=Math.max(0,c[n]-t);u=Math.min(u.len,c[n]+t);m=1E4*Math.sin(l+m*g);c[n]=d+(u-d)*(m-Math.floor(m));"x"===
e&&(c.clientX=c.plotX)}}})})};f.prototype.drawGraph=function(){this.options.lineWidth?g.prototype.drawGraph.call(this):this.graph&&(this.graph=this.graph.destroy())};f.defaultOptions=t(G.defaultOptions,a);return f}(G);r(x.prototype,{drawTracker:B.prototype.drawTracker,sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1});D(x,"afterTranslate",function(){this.applyJitter()});g.registerSeriesType("scatter",x);return x});K(g,"Series/CenteredUtilities.js",
[g["Core/Globals.js"],g["Core/Series/Series.js"],g["Core/Utilities.js"]],function(a,g,x){var v=a.deg2rad,D=x.fireEvent,B=x.isNumber,G=x.pick,r=x.relativeLength,t;(function(a){a.getCenter=function(){var a=this.options,c=this.chart,l=2*(a.slicedOffset||0),m=c.plotWidth-2*l,e=c.plotHeight-2*l,n=a.center,t=Math.min(m,e),v=a.thickness,x=a.size,E=a.innerSize||0;"string"===typeof x&&(x=parseFloat(x));"string"===typeof E&&(E=parseFloat(E));a=[G(n[0],"50%"),G(n[1],"50%"),G(x&&0>x?void 0:a.size,"100%"),G(E&&
0>E?void 0:a.innerSize||0,"0%")];!c.angular||this instanceof g||(a[3]=0);for(n=0;4>n;++n)x=a[n],c=2>n||2===n&&/%$/.test(x),a[n]=r(x,[m,e,t,a[2]][n])+(c?l:0);a[3]>a[2]&&(a[3]=a[2]);B(v)&&2*v<a[2]&&0<v&&(a[3]=a[2]-2*v);D(this,"afterGetCenter",{positions:a});return a};a.getStartAndEndRadians=function(a,c){a=B(a)?a:0;c=B(c)&&c>a&&360>c-a?c:a+360;return{start:v*(a+-90),end:v*(c+-90)}}})(t||(t={}));"";return t});K(g,"Series/Pie/PiePoint.js",[g["Core/Animation/AnimationUtilities.js"],g["Core/Series/Point.js"],
g["Core/Utilities.js"]],function(a,g,x){var v=this&&this.__extends||function(){var a=function(c,f){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(c,f)};return function(c,f){function g(){this.constructor=c}a(c,f);c.prototype=null===f?Object.create(f):(g.prototype=f.prototype,new g)}}(),D=a.setAnimation,B=x.addEvent,G=x.defined;a=x.extend;var r=x.isNumber,t=x.pick,n=x.relativeLength;g=function(a){function c(){var c=
null!==a&&a.apply(this,arguments)||this;c.labelDistance=void 0;c.options=void 0;c.series=void 0;return c}v(c,a);c.prototype.getConnectorPath=function(){var a=this.labelPosition,c=this.series.options.dataLabels,e=this.connectorShapes,f=c.connectorShape;e[f]&&(f=e[f]);return f.call(this,{x:a.final.x,y:a.final.y,alignment:a.alignment},a.connectorPosition,c)};c.prototype.getTranslate=function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}};c.prototype.haloPath=function(a){var c=
this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.x,c.y,c.r+a,c.r+a,{innerR:c.r-1,start:c.start,end:c.end})};c.prototype.init=function(){var c=this;a.prototype.init.apply(this,arguments);this.name=t(this.name,"Slice");var f=function(a){c.slice("select"===a.type)};B(this,"select",f);B(this,"unselect",f);return this};c.prototype.isValid=function(){return r(this.y)&&0<=this.y};c.prototype.setVisible=function(a,c){var e=this,f=this.series,g=f.chart,l=f.options.ignoreHiddenPoint;
c=t(c,l);a!==this.visible&&(this.visible=this.options.visible=a="undefined"===typeof a?!this.visible:a,f.options.data[f.data.indexOf(this)]=this.options,["graphic","dataLabel","connector","shadowGroup"].forEach(function(c){if(e[c])e[c][a?"show":"hide"](a)}),this.legendItem&&g.legend.colorizeItem(this,a),a||"hover"!==this.state||this.setState(""),l&&(f.isDirty=!0),c&&g.redraw())};c.prototype.slice=function(a,c,e){var f=this.series;D(e,f.chart);t(c,!0);this.sliced=this.options.sliced=G(a)?a:!this.sliced;
f.options.data[f.data.indexOf(this)]=this.options;this.graphic&&this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())};return c}(g);a(g.prototype,{connectorShapes:{fixedOffset:function(a,c,g){var f=c.breakAt;c=c.touchingSliceAt;return[["M",a.x,a.y],g.softConnector?["C",a.x+("left"===a.alignment?-5:5),a.y,2*f.x-c.x,2*f.y-c.y,f.x,f.y]:["L",f.x,f.y],["L",c.x,c.y]]},straight:function(a,c){c=c.touchingSliceAt;return[["M",a.x,a.y],["L",c.x,c.y]]},crookedLine:function(a,
c,g){c=c.touchingSliceAt;var f=this.series,e=f.center[0],l=f.chart.plotWidth,t=f.chart.plotLeft;f=a.alignment;var r=this.shapeArgs.r;g=n(g.crookDistance,1);l="left"===f?e+r+(l+t-e-r)*(1-g):t+(e-r)*g;g=["L",l,a.y];e=!0;if("left"===f?l>a.x||l<c.x:l<a.x||l>c.x)e=!1;a=[["M",a.x,a.y]];e&&a.push(g);a.push(["L",c.x,c.y]);return a}}});return g});K(g,"Series/Pie/PieSeriesDefaults.js",[],function(){"";return{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,connectorPadding:5,connectorShape:"fixedOffset",
crookDistance:"70%",distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},softConnector:!0,x:0},fillColor:void 0,ignoreHiddenPoint:!0,inactiveOtherPoints:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,lineWidth:void 0,states:{hover:{brightness:.1}}}});K(g,"Series/Pie/PieSeries.js",[g["Series/CenteredUtilities.js"],g["Series/Column/ColumnSeries.js"],g["Core/Globals.js"],
g["Core/Legend/LegendSymbol.js"],g["Series/Pie/PiePoint.js"],g["Series/Pie/PieSeriesDefaults.js"],g["Core/Series/Series.js"],g["Core/Series/SeriesRegistry.js"],g["Core/Renderer/SVG/Symbols.js"],g["Core/Utilities.js"]],function(a,g,x,E,D,B,G,r,t,n){var f=this&&this.__extends||function(){var a=function(c,e){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])};return a(c,e)};return function(c,e){function d(){this.constructor=
c}a(c,e);c.prototype=null===e?Object.create(e):(d.prototype=e.prototype,new d)}}(),c=a.getStartAndEndRadians;x=x.noop;var l=n.clamp,m=n.extend,e=n.fireEvent,u=n.merge,v=n.pick,J=n.relativeLength;n=function(a){function g(){var c=null!==a&&a.apply(this,arguments)||this;c.center=void 0;c.data=void 0;c.maxLabelDistance=void 0;c.options=void 0;c.points=void 0;return c}f(g,a);g.prototype.animate=function(a){var c=this,e=c.points,f=c.startAngleRad;a||e.forEach(function(a){var b=a.graphic,d=a.shapeArgs;b&&
d&&(b.attr({r:v(a.startR,c.center&&c.center[3]/2),start:f,end:f}),b.animate({r:d.r,start:d.start,end:d.end},c.options.animation))})};g.prototype.drawEmpty=function(){var a=this.startAngleRad,c=this.endAngleRad,e=this.options;if(0===this.total&&this.center){var f=this.center[0];var g=this.center[1];this.graph||(this.graph=this.chart.renderer.arc(f,g,this.center[1]/2,0,a,c).addClass("highcharts-empty-series").add(this.group));this.graph.attr({d:t.arc(f,g,this.center[2]/2,0,{start:a,end:c,innerR:this.center[3]/
2})});this.chart.styledMode||this.graph.attr({"stroke-width":e.borderWidth,fill:e.fillColor||"none",stroke:e.color||"#cccccc"})}else this.graph&&(this.graph=this.graph.destroy())};g.prototype.drawPoints=function(){var a=this.chart.renderer;this.points.forEach(function(c){c.graphic&&c.hasNewShapeType()&&(c.graphic=c.graphic.destroy());c.graphic||(c.graphic=a[c.shapeType](c.shapeArgs).add(c.series.group),c.delayedRendering=!0)})};g.prototype.generatePoints=function(){a.prototype.generatePoints.call(this);
this.updateTotals()};g.prototype.getX=function(a,c,e){var d=this.center,f=this.radii?this.radii[e.index]||0:d[2]/2;a=Math.asin(l((a-d[1])/(f+e.labelDistance),-1,1));return d[0]+(c?-1:1)*Math.cos(a)*(f+e.labelDistance)+(0<e.labelDistance?(c?-1:1)*this.options.dataLabels.padding:0)};g.prototype.hasData=function(){return!!this.processedXData.length};g.prototype.redrawPoints=function(){var a=this,c=a.chart,e=c.renderer,f=a.options.shadow,g,b,l,m;this.drawEmpty();!f||a.shadowGroup||c.styledMode||(a.shadowGroup=
e.g("shadow").attr({zIndex:-1}).add(a.group));a.points.forEach(function(d){var h={};b=d.graphic;if(!d.isNull&&b){var k=void 0;m=d.shapeArgs;g=d.getTranslate();c.styledMode||(k=d.shadowGroup,f&&!k&&(k=d.shadowGroup=e.g("shadow").add(a.shadowGroup)),k&&k.attr(g),l=a.pointAttribs(d,d.selected&&"select"));d.delayedRendering?(b.setRadialReference(a.center).attr(m).attr(g),c.styledMode||b.attr(l).attr({"stroke-linejoin":"round"}).shadow(f,k),d.delayedRendering=!1):(b.setRadialReference(a.center),c.styledMode||
u(!0,h,l),u(!0,h,m,g),b.animate(h));b.attr({visibility:d.visible?"inherit":"hidden"});b.addClass(d.getClassName(),!0)}else b&&(d.graphic=b.destroy())})};g.prototype.sortByAngle=function(a,c){a.sort(function(a,d){return"undefined"!==typeof a.angle&&(d.angle-a.angle)*c})};g.prototype.translate=function(a){e(this,"translate");this.generatePoints();var d=this.options,f=d.slicedOffset,h=f+(d.borderWidth||0),g=c(d.startAngle,d.endAngle),b=this.startAngleRad=g.start;g=(this.endAngleRad=g.end)-b;var l=this.points,
m=d.dataLabels.distance;d=d.ignoreHiddenPoint;var n=l.length,u,t=0;a||(this.center=a=this.getCenter());for(u=0;u<n;u++){var r=l[u];var A=b+t*g;!r.isValid()||d&&!r.visible||(t+=r.percentage/100);var x=b+t*g;var C={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*A)/1E3,end:Math.round(1E3*x)/1E3};r.shapeType="arc";r.shapeArgs=C;r.labelDistance=v(r.options.dataLabels&&r.options.dataLabels.distance,m);r.labelDistance=J(r.labelDistance,C.r);this.maxLabelDistance=Math.max(this.maxLabelDistance||
0,r.labelDistance);x=(x+A)/2;x>1.5*Math.PI?x-=2*Math.PI:x<-Math.PI/2&&(x+=2*Math.PI);r.slicedTranslation={translateX:Math.round(Math.cos(x)*f),translateY:Math.round(Math.sin(x)*f)};C=Math.cos(x)*a[2]/2;var y=Math.sin(x)*a[2]/2;r.tooltipPos=[a[0]+.7*C,a[1]+.7*y];r.half=x<-Math.PI/2||x>Math.PI/2?1:0;r.angle=x;A=Math.min(h,r.labelDistance/5);r.labelPosition={natural:{x:a[0]+C+Math.cos(x)*r.labelDistance,y:a[1]+y+Math.sin(x)*r.labelDistance},"final":{},alignment:0>r.labelDistance?"center":r.half?"right":
"left",connectorPosition:{breakAt:{x:a[0]+C+Math.cos(x)*A,y:a[1]+y+Math.sin(x)*A},touchingSliceAt:{x:a[0]+C,y:a[1]+y}}}}e(this,"afterTranslate")};g.prototype.updateTotals=function(){var a=this.points,c=a.length,e=this.options.ignoreHiddenPoint,f,g=0;for(f=0;f<c;f++){var b=a[f];!b.isValid()||e&&!b.visible||(g+=b.y)}this.total=g;for(f=0;f<c;f++)b=a[f],b.percentage=0<g&&(b.visible||!e)?b.y/g*100:0,b.total=g};g.defaultOptions=u(G.defaultOptions,B);return g}(G);m(n.prototype,{axisTypes:[],directTouch:!0,
drawGraph:void 0,drawLegendSymbol:E.drawRectangle,drawTracker:g.prototype.drawTracker,getCenter:a.getCenter,getSymbol:x,isCartesian:!1,noSharedTooltip:!0,pointAttribs:g.prototype.pointAttribs,pointClass:D,requireSorting:!1,searchPoint:x,trackerGroups:["group","dataLabelsGroup"]});r.registerSeriesType("pie",n);return n});K(g,"Series/Pie/PieDataLabel.js",[g["Core/Series/DataLabel.js"],g["Core/Globals.js"],g["Core/Renderer/RendererUtilities.js"],g["Core/Series/SeriesRegistry.js"],g["Core/Utilities.js"]],
function(a,g,x,E,D){var v=g.noop,G=x.distribute,r=E.series,t=D.arrayMax,n=D.clamp,f=D.defined,c=D.merge,l=D.pick,m=D.relativeLength,e;(function(e){function g(){var a=this,e=a.data,g=a.chart,k=a.options.dataLabels||{},b=k.connectorPadding,m=g.plotWidth,n=g.plotHeight,u=g.plotLeft,v=Math.round(g.chartWidth/3),A=a.center,x=A[2]/2,C=A[1],B=[[],[]],D=[0,0,0,0],y=a.dataLabelPositioners,E,I,J,L,F,K,M,X,W,U,Z,V;a.visible&&(k.enabled||a._hasPointLabels)&&(e.forEach(function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&
(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),r.prototype.drawDataLabels.apply(a),e.forEach(function(a){a.dataLabel&&(a.visible?(B[a.half].push(a),a.dataLabel._pos=null,!f(k.style.width)&&!f(a.options.dataLabels&&a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>v&&(a.dataLabel.css({width:Math.round(.7*v)+"px"}),a.dataLabel.shortened=!0)):(a.dataLabel=a.dataLabel.destroy(),a.dataLabels&&1===a.dataLabels.length&&
delete a.dataLabels))}),B.forEach(function(c,d){var e=c.length,h=[],q;if(e){a.sortByAngle(c,d-.5);if(0<a.maxLabelDistance){var p=Math.max(0,C-x-a.maxLabelDistance);var t=Math.min(C+x+a.maxLabelDistance,g.plotHeight);c.forEach(function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,C-x-a.labelDistance),a.bottom=Math.min(C+x+a.labelDistance,g.plotHeight),q=a.dataLabel.getBBox().height||21,a.distributeBox={target:a.labelPosition.natural.y-a.top+q/2,size:q,rank:a.y},h.push(a.distributeBox))});p=
t+q-p;G(h,p,p/5)}for(Z=0;Z<e;Z++){E=c[Z];K=E.labelPosition;L=E.dataLabel;U=!1===E.visible?"hidden":"inherit";W=p=K.natural.y;h&&f(E.distributeBox)&&("undefined"===typeof E.distributeBox.pos?U="hidden":(M=E.distributeBox.size,W=y.radialDistributionY(E)));delete E.positionIndex;if(k.justify)X=y.justify(E,x,A);else switch(k.alignTo){case "connectors":X=y.alignToConnectors(c,d,m,u);break;case "plotEdges":X=y.alignToPlotEdges(L,d,m,u);break;default:X=y.radialDistributionX(a,E,W,p)}L._attr={visibility:U,
align:K.alignment};V=E.options.dataLabels||{};L._pos={x:X+l(V.x,k.x)+({left:b,right:-b}[K.alignment]||0),y:W+l(V.y,k.y)-10};K.final.x=X;K.final.y=W;l(k.crop,!0)&&(F=L.getBBox().width,p=null,X-F<b&&1===d?(p=Math.round(F-X+b),D[3]=Math.max(p,D[3])):X+F>m-b&&0===d&&(p=Math.round(X+F-m+b),D[1]=Math.max(p,D[1])),0>W-M/2?D[0]=Math.max(Math.round(-W+M/2),D[0]):W+M/2>n&&(D[2]=Math.max(Math.round(W+M/2-n),D[2])),L.sideOverflow=p)}}}),0===t(D)||this.verifyDataLabelOverflow(D))&&(this.placeDataLabels(),this.points.forEach(function(b){V=
c(k,b.options.dataLabels);if(I=l(V.connectorWidth,1)){var d;J=b.connector;if((L=b.dataLabel)&&L._pos&&b.visible&&0<b.labelDistance){U=L._attr.visibility;if(d=!J)b.connector=J=g.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+b.colorIndex+(b.className?" "+b.className:"")).add(a.dataLabelsGroup),g.styledMode||J.attr({"stroke-width":I,stroke:V.connectorColor||b.color||"#666666"});J[d?"attr":"animate"]({d:b.getConnectorPath()});J.attr("visibility",U)}else J&&(b.connector=
J.destroy())}}))}function u(){this.points.forEach(function(a){var c=a.dataLabel,d;c&&a.visible&&((d=c._pos)?(c.sideOverflow&&(c._attr.width=Math.max(c.getBBox().width-c.sideOverflow,0),c.css({width:c._attr.width+"px",textOverflow:(this.options.dataLabels.style||{}).textOverflow||"ellipsis"}),c.shortened=!0),c.attr(c._attr),c[c.moved?"animate":"attr"](d),c.moved=!0):c&&c.attr({y:-9999}));delete a.distributeBox},this)}function x(a){var c=this.center,d=this.options,e=d.center,b=d.minSize||80,f=null!==
d.size;if(!f){if(null!==e[0])var g=Math.max(c[2]-Math.max(a[1],a[3]),b);else g=Math.max(c[2]-a[1]-a[3],b),c[0]+=(a[3]-a[1])/2;null!==e[1]?g=n(g,b,c[2]-Math.max(a[0],a[2])):(g=n(g,b,c[2]-a[0]-a[2]),c[1]+=(a[0]-a[2])/2);g<c[2]?(c[2]=g,c[3]=Math.min(d.thickness?Math.max(0,g-2*d.thickness):Math.max(0,m(d.innerSize||0,g)),g),this.translate(c),this.drawDataLabels&&this.drawDataLabels()):f=!0}return f}var B=[],A={radialDistributionY:function(a){return a.top+a.distributeBox.pos},radialDistributionX:function(a,
c,e,f){return a.getX(e<c.top+2||e>c.bottom-2?f:e,c.half,c)},justify:function(a,c,e){return e[0]+(a.half?-1:1)*(c+a.labelDistance)},alignToPlotEdges:function(a,c,e,f){a=a.getBBox().width;return c?a+f:e-a-f},alignToConnectors:function(a,c,e,f){var b=0,d;a.forEach(function(a){d=a.dataLabel.getBBox().width;d>b&&(b=d)});return c?b+f:e-b-f}};e.compose=function(c){a.compose(r);-1===B.indexOf(c)&&(B.push(c),c=c.prototype,c.dataLabelPositioners=A,c.alignDataLabel=v,c.drawDataLabels=g,c.placeDataLabels=u,c.verifyDataLabelOverflow=
x)}})(e||(e={}));return e});K(g,"Extensions/OverlappingDataLabels.js",[g["Core/Chart/Chart.js"],g["Core/Utilities.js"]],function(a,g){function v(a,f){var c=!1;if(a){var g=a.newOpacity;a.oldOpacity!==g&&(a.alignAttr&&a.placed?(a[g?"removeClass":"addClass"]("highcharts-data-label-hidden"),c=!0,a.alignAttr.opacity=g,a[a.isOld?"animate":"attr"](a.alignAttr,null,function(){f.styledMode||a.css({pointerEvents:g?"auto":"none"})}),D(f,"afterHideOverlappingLabel")):a.attr({opacity:g}));a.isOld=!0}return c}
var E=g.addEvent,D=g.fireEvent,B=g.isArray,G=g.isNumber,r=g.objectEach,t=g.pick;E(a,"render",function(){var a=this,f=[];(this.labelCollectors||[]).forEach(function(a){f=f.concat(a())});(this.yAxis||[]).forEach(function(a){a.stacking&&a.options.stackLabels&&!a.options.stackLabels.allowOverlap&&r(a.stacking.stacks,function(a){r(a,function(a){a.label&&f.push(a.label)})})});(this.series||[]).forEach(function(c){var g=c.options.dataLabels;c.visible&&(!1!==g.enabled||c._hasPointLabels)&&(g=function(c){return c.forEach(function(c){c.visible&&
(B(c.dataLabels)?c.dataLabels:c.dataLabel?[c.dataLabel]:[]).forEach(function(e){var g=e.options;e.labelrank=t(g.labelrank,c.labelrank,c.shapeArgs&&c.shapeArgs.height);g.allowOverlap?(e.oldOpacity=e.opacity,e.newOpacity=1,v(e,a)):f.push(e)})})},g(c.nodes||[]),g(c.points))});this.hideOverlappingLabels(f)});a.prototype.hideOverlappingLabels=function(a){var f=this,c=a.length,g=f.renderer,m,e,n,t=!1;var r=function(a){var c,e=a.box?0:a.padding||0,f=c=0,k;if(a&&(!a.alignAttr||a.placed)){var b=a.alignAttr||
{x:a.attr("x"),y:a.attr("y")};var l=a.parentGroup;a.width||(c=a.getBBox(),a.width=c.width,a.height=c.height,c=g.fontMetrics(null,a.element).h);var m=a.width-2*e;(k={left:"0",center:"0.5",right:"1"}[a.alignValue])?f=+k*m:G(a.x)&&Math.round(a.x)!==a.translateX&&(f=a.x-a.translateX);return{x:b.x+(l.translateX||0)+e-(f||0),y:b.y+(l.translateY||0)+e-c,width:a.width-2*e,height:a.height-2*e}}};for(e=0;e<c;e++)if(m=a[e])m.oldOpacity=m.opacity,m.newOpacity=1,m.absoluteBox=r(m);a.sort(function(a,c){return(c.labelrank||
0)-(a.labelrank||0)});for(e=0;e<c;e++){var x=(r=a[e])&&r.absoluteBox;for(m=e+1;m<c;++m){var B=(n=a[m])&&n.absoluteBox;!x||!B||r===n||0===r.newOpacity||0===n.newOpacity||"hidden"===r.visibility||"hidden"===n.visibility||B.x>=x.x+x.width||B.x+B.width<=x.x||B.y>=x.y+x.height||B.y+B.height<=x.y||((r.labelrank<n.labelrank?r:n).newOpacity=0)}}a.forEach(function(a){v(a,f)&&(t=!0)});t&&D(f,"afterHideAllOverlappingLabels")}});K(g,"Core/Responsive.js",[g["Core/Utilities.js"]],function(a){var g=a.extend,x=a.find,
E=a.isArray,D=a.isObject,B=a.merge,G=a.objectEach,r=a.pick,t=a.splat,n=a.uniqueKey,f;(function(a){var c=[];a.compose=function(a){-1===c.indexOf(a)&&(c.push(a),g(a.prototype,f.prototype));return a};var f=function(){function a(){}a.prototype.currentOptions=function(a){function c(a,f,d,g){var h;G(a,function(a,b){if(!g&&-1<e.collectionsWithUpdate.indexOf(b)&&f[b])for(a=t(a),d[b]=[],h=0;h<Math.max(a.length,f[b].length);h++)f[b][h]&&(void 0===a[h]?d[b][h]=f[b][h]:(d[b][h]={},c(a[h],f[b][h],d[b][h],g+1)));
else D(a)?(d[b]=E(a)?[]:{},c(a,f[b]||{},d[b],g+1)):d[b]="undefined"===typeof f[b]?null:f[b]})}var e=this,f={};c(a,this.options,f,0);return f};a.prototype.matchResponsiveRule=function(a,c){var e=a.condition;(e.callback||function(){return this.chartWidth<=r(e.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=r(e.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=r(e.minWidth,0)&&this.chartHeight>=r(e.minHeight,0)}).call(this)&&c.push(a._id)};a.prototype.setResponsive=function(a,c){var e=this,f=this.options.responsive,
g=this.currentResponsive,l=[];!c&&f&&f.rules&&f.rules.forEach(function(a){"undefined"===typeof a._id&&(a._id=n());e.matchResponsiveRule(a,l)},this);c=B.apply(void 0,l.map(function(a){return x((f||{}).rules||[],function(c){return c._id===a})}).map(function(a){return a&&a.chartOptions}));c.isResponsiveOptions=!0;l=l.toString()||void 0;l!==(g&&g.ruleIds)&&(g&&this.update(g.undoOptions,a,!0),l?(g=this.currentOptions(c),g.isResponsiveOptions=!0,this.currentResponsive={ruleIds:l,mergedOptions:c,undoOptions:g},
this.update(c,a,!0)):this.currentResponsive=void 0)};return a}()})(f||(f={}));"";"";return f});K(g,"masters/highcharts.src.js",[g["Core/Globals.js"],g["Core/Utilities.js"],g["Core/Defaults.js"],g["Core/Animation/Fx.js"],g["Core/Animation/AnimationUtilities.js"],g["Core/Renderer/HTML/AST.js"],g["Core/FormatUtilities.js"],g["Core/Renderer/RendererUtilities.js"],g["Core/Renderer/SVG/SVGElement.js"],g["Core/Renderer/SVG/SVGRenderer.js"],g["Core/Renderer/HTML/HTMLElement.js"],g["Core/Renderer/HTML/HTMLRenderer.js"],
g["Core/Axis/Axis.js"],g["Core/Axis/DateTimeAxis.js"],g["Core/Axis/LogarithmicAxis.js"],g["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],g["Core/Axis/Tick.js"],g["Core/Tooltip.js"],g["Core/Series/Point.js"],g["Core/Pointer.js"],g["Core/MSPointer.js"],g["Core/Legend/Legend.js"],g["Core/Chart/Chart.js"],g["Core/Axis/Stacking/StackingAxis.js"],g["Core/Axis/Stacking/StackItem.js"],g["Core/Series/Series.js"],g["Core/Series/SeriesRegistry.js"],g["Series/Column/ColumnSeries.js"],g["Series/Column/ColumnDataLabel.js"],
g["Series/Pie/PieSeries.js"],g["Series/Pie/PieDataLabel.js"],g["Core/Series/DataLabel.js"],g["Core/Responsive.js"],g["Core/Color/Color.js"],g["Core/Time.js"]],function(a,g,x,E,D,B,G,r,t,n,f,c,l,m,e,u,C,J,I,K,A,d,q,h,k,b,p,z,w,N,H,O,Q,S,Y){a.animate=D.animate;a.animObject=D.animObject;a.getDeferredAnimation=D.getDeferredAnimation;a.setAnimation=D.setAnimation;a.stop=D.stop;a.timers=E.timers;a.AST=B;a.Axis=l;a.Chart=q;a.chart=q.chart;a.Fx=E;a.Legend=d;a.PlotLineOrBand=u;a.Point=I;a.Pointer=A.isRequired()?
A:K;a.Series=b;a.StackItem=k;a.SVGElement=t;a.SVGRenderer=n;a.Tick=C;a.Time=Y;a.Tooltip=J;a.Color=S;a.color=S.parse;c.compose(n);f.compose(t);a.defaultOptions=x.defaultOptions;a.getOptions=x.getOptions;a.time=x.defaultTime;a.setOptions=x.setOptions;a.dateFormat=G.dateFormat;a.format=G.format;a.numberFormat=G.numberFormat;a.addEvent=g.addEvent;a.arrayMax=g.arrayMax;a.arrayMin=g.arrayMin;a.attr=g.attr;a.clearTimeout=g.clearTimeout;a.correctFloat=g.correctFloat;a.createElement=g.createElement;a.css=
g.css;a.defined=g.defined;a.destroyObjectProperties=g.destroyObjectProperties;a.discardElement=g.discardElement;a.distribute=r.distribute;a.erase=g.erase;a.error=g.error;a.extend=g.extend;a.extendClass=g.extendClass;a.find=g.find;a.fireEvent=g.fireEvent;a.getMagnitude=g.getMagnitude;a.getStyle=g.getStyle;a.inArray=g.inArray;a.isArray=g.isArray;a.isClass=g.isClass;a.isDOMElement=g.isDOMElement;a.isFunction=g.isFunction;a.isNumber=g.isNumber;a.isObject=g.isObject;a.isString=g.isString;a.keys=g.keys;
a.merge=g.merge;a.normalizeTickInterval=g.normalizeTickInterval;a.objectEach=g.objectEach;a.offset=g.offset;a.pad=g.pad;a.pick=g.pick;a.pInt=g.pInt;a.relativeLength=g.relativeLength;a.removeEvent=g.removeEvent;a.seriesType=p.seriesType;a.splat=g.splat;a.stableSort=g.stableSort;a.syncTimeout=g.syncTimeout;a.timeUnits=g.timeUnits;a.uniqueKey=g.uniqueKey;a.useSerialIds=g.useSerialIds;a.wrap=g.wrap;w.compose(z);O.compose(b);m.compose(l);e.compose(l);H.compose(N);u.compose(l);Q.compose(q);h.compose(l,
q,b);return a});g["masters/highcharts.src.js"]._modules=g;return g["masters/highcharts.src.js"]});
//# sourceMappingURL=highcharts.js.map

/***/ }),

/***/ "./node_modules/laravel-vue-semantic-ui-pagination/src/laravel-vue-semantic-ui-pagination.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/laravel-vue-semantic-ui-pagination/src/laravel-vue-semantic-ui-pagination.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {

    template: '<div class="ui pagination menu" :class="size" v-if="data.total > data.per_page">\
        <!-- First Item -->\
        <a class="item" @click.prevent="selectPage(--data.current_page)" v-if="data.prev_page_url">\
            <i class="left icon" :class="icon"></i>\
        </a>\
        <a class="disabled item" v-if="showDisabled && !data.prev_page_url">\
            <i class="left icon" :class="icon"></i>\
        </a>\
        <!-- Pagination Menu Items -->\
        <a class="item" v-for="n in getPages()" :class="{ \'active\': n == data.current_page }" @click.prevent="selectPage(n)">\
            {{ n }}\
        </a>\
        <!-- Last Item -->\
        <a class="item" @click.prevent="selectPage(++data.current_page)" v-if="data.next_page_url">\
            <i class="right icon" :class="icon"></i>\
        </a>\
        <a class="disabled item" v-if="showDisabled && !data.next_page_url">\
            <i class="right icon" :class="icon"></i>\
        </a>\
    </div>',


    props: {
        showDisabled: {
            type: Boolean,
            default: false,
            required: false
        },
        icon: {
            type: String,
            default: 'angle double',
            required: false
        },
        size: {
            type: String,
            default: 'small',
            required: false
        },
        data: {
            type: Object,
            default: function() {
                return {
                    current_page: 1,
                    data: [],
                    from: 1,
                    last_page: 1,
                    next_page_url: null,
                    per_page: 10,
                    prev_page_url: null,
                    to: 1,
                    total: 0,
                }
            },
            required: true
        },
        limit: {
            type: Number,
            default: 0,
            required: false
        }
    },

    methods: {
        selectPage: function(page) {
            this.$emit('change-page', page);
        },
        getPages: function() {
            if (this.limit === -1) {
                return 0;
            }

            if (this.limit === 0) {
                return this.data.last_page;
            }

            var start = this.data.current_page - this.limit,
                end   = this.data.current_page + this.limit + 1,
                pages = [],
                index;

            start = start < 1 ? 1 : start;
            end   = end >= this.data.last_page ? this.data.last_page + 1 : end;

            for (index = start; index < end; index++) {
                pages.push(index);
            }

            return pages;
        }
    }
};

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IncredibleOffers.vue?vue&type=style&index=0&id=1ac9bd27&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/IncredibleOffers.vue?vue&type=style&index=0&id=1ac9bd27&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./IncredibleOffers.vue?vue&type=style&index=0&id=1ac9bd27&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IncredibleOffers.vue?vue&type=style&index=0&id=1ac9bd27&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-axios/dist/vue-axios.esm.min.js":
/*!**********************************************************!*\
  !*** ./node_modules/vue-axios/dist/vue-axios.esm.min.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return plugin; });
function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function plugin(e,n){if(!e.vueAxiosInstalled){var o=isAxiosLike(n)?migrateToMultipleInstances(n):n;if(isValidConfig(o)){var t=getVueVersion(e);if(t){var i=t<3?registerOnVue2:registerOnVue3;Object.keys(o).forEach((function(n){i(e,n,o[n])})),e.vueAxiosInstalled=!0}else console.error("[vue-axios] unknown Vue version")}else console.error("[vue-axios] configuration is invalid, expected options are either <axios_instance> or { <registration_key>: <axios_instance> }")}}function registerOnVue2(e,n,o){Object.defineProperty(e.prototype,n,{get:function(){return o}}),e[n]=o}function registerOnVue3(e,n,o){e.config.globalProperties[n]=o,e[n]=o}function isAxiosLike(e){return e&&"function"==typeof e.get&&"function"==typeof e.post}function migrateToMultipleInstances(e){return{axios:e,$http:e}}function isValidConfig(e){return"object"===_typeof(e)&&Object.keys(e).every((function(n){return isAxiosLike(e[n])}))}function getVueVersion(e){return e&&e.version&&Number(e.version.split(".")[0])}"object"==("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=plugin:"function"==typeof define&&__webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")?define([],(function(){return plugin})):window.Vue&&window.axios&&window.Vue.use&&Vue.use(plugin,window.axios);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/vue-cleave-component/dist/vue-cleave.min.js":
/*!******************************************************************!*\
  !*** ./node_modules/vue-cleave-component/dist/vue-cleave.min.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! cleave.js */ "./node_modules/cleave.js/dist/cleave-esm.js")):undefined}("undefined"!=typeof self?self:this,function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(t,n){t.exports=e},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var a={name:"cleave",render:function(e){return e("input",{attrs:{type:"text",value:this.value},on:{blur:this.onBlur}})},props:{value:{default:null,required:!0,validator:function(e){return null===e||"string"==typeof e||e instanceof String||"number"==typeof e}},options:{type:Object,default:function(){return{}}},raw:{type:Boolean,default:!0}},data:function(){return{cleave:null,onValueChangedFn:null}},mounted:function(){this.cleave||(this.cleave=new o.a(this.$el,this.getOptions(this.options)))},methods:{getOptions:function(e){return this.onValueChangedFn=e.onValueChanged,u({},e,{onValueChanged:this.onValueChanged})},onValueChanged:function(e){var t=this.raw?e.target.rawValue:e.target.value;this.$emit("input",t),"function"==typeof this.onValueChangedFn&&this.onValueChangedFn.call(this,e)},onBlur:function(e){this.$emit("blur",this.value)}},watch:{options:{deep:!0,handler:function(e){this.cleave.destroy(),this.cleave=new o.a(this.$el,this.getOptions(e)),this.cleave.setRawValue(this.value)}},value:function(e){this.cleave&&(this.raw&&e===this.cleave.getRawValue()||(this.raw||e!==this.$el.value)&&this.cleave.setRawValue(e))}},beforeDestroy:function(){this.cleave&&(this.cleave.destroy(),this.cleave=null,this.onValueChangedFn=null)}};n.d(t,"plugin",function(){return i}),n.d(t,"component",function(){return a});var i=function(e,t){var n="cleave";"string"==typeof t&&(n=t),e.component(n,a)};a.install=i;t.default=a}]).default});

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

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
  if (moduleIdentifier) {
    // server build
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
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue/dist/vue.common.dev.js":
/*!*************************************************!*\
  !*** ./node_modules/vue/dist/vue.common.dev.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.7.14
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */


const emptyObject = Object.freeze({});
const isArray = Array.isArray;
// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef(v) {
    return v === undefined || v === null;
}
function isDef(v) {
    return v !== undefined && v !== null;
}
function isTrue(v) {
    return v === true;
}
function isFalse(v) {
    return v === false;
}
/**
 * Check if value is primitive.
 */
function isPrimitive(value) {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        // $flow-disable-line
        typeof value === 'symbol' ||
        typeof value === 'boolean');
}
function isFunction(value) {
    return typeof value === 'function';
}
/**
 * Quick object check - this is primarily used to tell
 * objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const _toString = Object.prototype.toString;
function toRawType(value) {
    return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
}
function isRegExp(v) {
    return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex(val) {
    const n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
}
function isPromise(val) {
    return (isDef(val) &&
        typeof val.then === 'function' &&
        typeof val.catch === 'function');
}
/**
 * Convert a value to a string that is actually rendered.
 */
function toString(val) {
    return val == null
        ? ''
        : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
            ? JSON.stringify(val, null, 2)
            : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber(val) {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(',');
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val];
}
/**
 * Check if a tag is a built-in tag.
 */
const isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */
const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */
function remove$2(arr, item) {
    const len = arr.length;
    if (len) {
        // fast path for the only / last item
        if (item === arr[len - 1]) {
            arr.length = len - 1;
            return;
        }
        const index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1);
        }
    }
}
/**
 * Check whether an object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
    const cache = Object.create(null);
    return function cachedFn(str) {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}
/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g;
const camelize = cached((str) => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});
/**
 * Capitalize a string.
 */
const capitalize = cached((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cached((str) => {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */
/* istanbul ignore next */
function polyfillBind(fn, ctx) {
    function boundFn(a) {
        const l = arguments.length;
        return l
            ? l > 1
                ? fn.apply(ctx, arguments)
                : fn.call(ctx, a)
            : fn.call(ctx);
    }
    boundFn._length = fn.length;
    return boundFn;
}
function nativeBind(fn, ctx) {
    return fn.bind(ctx);
}
// @ts-expect-error bind cannot be `undefined`
const bind$1 = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
    start = start || 0;
    let i = list.length - start;
    const ret = new Array(i);
    while (i--) {
        ret[i] = list[i + start];
    }
    return ret;
}
/**
 * Mix properties into target object.
 */
function extend(to, _from) {
    for (const key in _from) {
        to[key] = _from[key];
    }
    return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */
function toObject(arr) {
    const res = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
}
/* eslint-disable no-unused-vars */
/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop(a, b, c) { }
/**
 * Always return false.
 */
const no = (a, b, c) => false;
/* eslint-enable no-unused-vars */
/**
 * Return the same value.
 */
const identity = (_) => _;
/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys$1(modules) {
    return modules
        .reduce((keys, m) => {
        return keys.concat(m.staticKeys || []);
    }, [])
        .join(',');
}
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
    if (a === b)
        return true;
    const isObjectA = isObject(a);
    const isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
        try {
            const isArrayA = Array.isArray(a);
            const isArrayB = Array.isArray(b);
            if (isArrayA && isArrayB) {
                return (a.length === b.length &&
                    a.every((e, i) => {
                        return looseEqual(e, b[i]);
                    }));
            }
            else if (a instanceof Date && b instanceof Date) {
                return a.getTime() === b.getTime();
            }
            else if (!isArrayA && !isArrayB) {
                const keysA = Object.keys(a);
                const keysB = Object.keys(b);
                return (keysA.length === keysB.length &&
                    keysA.every(key => {
                        return looseEqual(a[key], b[key]);
                    }));
            }
            else {
                /* istanbul ignore next */
                return false;
            }
        }
        catch (e) {
            /* istanbul ignore next */
            return false;
        }
    }
    else if (!isObjectA && !isObjectB) {
        return String(a) === String(b);
    }
    else {
        return false;
    }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (looseEqual(arr[i], val))
            return i;
    }
    return -1;
}
/**
 * Ensure a function is called only once.
 */
function once(fn) {
    let called = false;
    return function () {
        if (!called) {
            called = true;
            fn.apply(this, arguments);
        }
    };
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#polyfill
function hasChanged(x, y) {
    if (x === y) {
        return x === 0 && 1 / x !== 1 / y;
    }
    else {
        return x === x || y === y;
    }
}

const SSR_ATTR = 'data-server-rendered';
const ASSET_TYPES = ['component', 'directive', 'filter'];
const LIFECYCLE_HOOKS = [
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
    'serverPrefetch',
    'renderTracked',
    'renderTriggered'
];

var config = {
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
    productionTip: true,
    /**
     * Whether to enable devtools
     */
    devtools: true,
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
};

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
    const c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5f;
}
/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
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
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`);
function parsePath(path) {
    if (bailRE.test(path)) {
        return;
    }
    const segments = path.split('.');
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj)
                return;
            obj = obj[segments[i]];
        }
        return obj;
    };
}

// can we use __proto__?
const hasProto = '__proto__' in {};
// Browser environment sniffing
const inBrowser = typeof window !== 'undefined';
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isIE = UA && /msie|trident/.test(UA);
const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
const isEdge = UA && UA.indexOf('edge/') > 0;
UA && UA.indexOf('android') > 0;
const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
UA && /chrome\/\d+/.test(UA) && !isEdge;
UA && /phantomjs/.test(UA);
const isFF = UA && UA.match(/firefox\/(\d+)/);
// Firefox has a "watch" function on Object.prototype...
// @ts-expect-error firebox support
const nativeWatch = {}.watch;
let supportsPassive = false;
if (inBrowser) {
    try {
        const opts = {};
        Object.defineProperty(opts, 'passive', {
            get() {
                /* istanbul ignore next */
                supportsPassive = true;
            }
        }); // https://github.com/facebook/flow/issues/285
        window.addEventListener('test-passive', null, opts);
    }
    catch (e) { }
}
// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
let _isServer;
const isServerRendering = () => {
    if (_isServer === undefined) {
        /* istanbul ignore if */
        if (!inBrowser && typeof global !== 'undefined') {
            // detect presence of vue-server-renderer and avoid
            // Webpack shimming the process
            _isServer =
                global['process'] && global['process'].env.VUE_ENV === 'server';
        }
        else {
            _isServer = false;
        }
    }
    return _isServer;
};
// detect devtools
const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */
function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}
const hasSymbol = typeof Symbol !== 'undefined' &&
    isNative(Symbol) &&
    typeof Reflect !== 'undefined' &&
    isNative(Reflect.ownKeys);
let _Set; // $flow-disable-line
/* istanbul ignore if */ if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set;
}
else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = class Set {
        constructor() {
            this.set = Object.create(null);
        }
        has(key) {
            return this.set[key] === true;
        }
        add(key) {
            this.set[key] = true;
        }
        clear() {
            this.set = Object.create(null);
        }
    };
}

let currentInstance = null;
/**
 * This is exposed for compatibility with v3 (e.g. some functions in VueUse
 * relies on it). Do not use this internally, just use `currentInstance`.
 *
 * @internal this function needs manual type declaration because it relies
 * on previously manually authored types from Vue 2
 */
function getCurrentInstance() {
    return currentInstance && { proxy: currentInstance };
}
/**
 * @internal
 */
function setCurrentInstance(vm = null) {
    if (!vm)
        currentInstance && currentInstance._scope.off();
    currentInstance = vm;
    vm && vm._scope.on();
}

/**
 * @internal
 */
class VNode {
    constructor(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
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
    }
    // DEPRECATED: alias for componentInstance for backwards compat.
    /* istanbul ignore next */
    get child() {
        return this.componentInstance;
    }
}
const createEmptyVNode = (text = '') => {
    const node = new VNode();
    node.text = text;
    node.isComment = true;
    return node;
};
function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val));
}
// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode(vnode) {
    const cloned = new VNode(vnode.tag, vnode.data, 
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.fnContext = vnode.fnContext;
    cloned.fnOptions = vnode.fnOptions;
    cloned.fnScopeId = vnode.fnScopeId;
    cloned.asyncMeta = vnode.asyncMeta;
    cloned.isCloned = true;
    return cloned;
}

/* not type checking this file because flow doesn't play well with Proxy */
let initProxy;
{
    const allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' +
        'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
        'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,' +
        'require' // for Webpack/Browserify
    );
    const warnNonPresent = (target, key) => {
        warn$2(`Property or method "${key}" is not defined on the instance but ` +
            'referenced during render. Make sure that this property is reactive, ' +
            'either in the data option, or for class-based components, by ' +
            'initializing the property. ' +
            'See: https://v2.vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
    };
    const warnReservedPrefix = (target, key) => {
        warn$2(`Property "${key}" must be accessed with "$data.${key}" because ` +
            'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
            'prevent conflicts with Vue internals. ' +
            'See: https://v2.vuejs.org/v2/api/#data', target);
    };
    const hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);
    if (hasProxy) {
        const isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
        config.keyCodes = new Proxy(config.keyCodes, {
            set(target, key, value) {
                if (isBuiltInModifier(key)) {
                    warn$2(`Avoid overwriting built-in modifier in config.keyCodes: .${key}`);
                    return false;
                }
                else {
                    target[key] = value;
                    return true;
                }
            }
        });
    }
    const hasHandler = {
        has(target, key) {
            const has = key in target;
            const isAllowed = allowedGlobals(key) ||
                (typeof key === 'string' &&
                    key.charAt(0) === '_' &&
                    !(key in target.$data));
            if (!has && !isAllowed) {
                if (key in target.$data)
                    warnReservedPrefix(target, key);
                else
                    warnNonPresent(target, key);
            }
            return has || !isAllowed;
        }
    };
    const getHandler = {
        get(target, key) {
            if (typeof key === 'string' && !(key in target)) {
                if (key in target.$data)
                    warnReservedPrefix(target, key);
                else
                    warnNonPresent(target, key);
            }
            return target[key];
        }
    };
    initProxy = function initProxy(vm) {
        if (hasProxy) {
            // determine which proxy handler to use
            const options = vm.$options;
            const handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
            vm._renderProxy = new Proxy(vm, handlers);
        }
        else {
            vm._renderProxy = vm;
        }
    };
}

let uid$2 = 0;
const pendingCleanupDeps = [];
const cleanupDeps = () => {
    for (let i = 0; i < pendingCleanupDeps.length; i++) {
        const dep = pendingCleanupDeps[i];
        dep.subs = dep.subs.filter(s => s);
        dep._pending = false;
    }
    pendingCleanupDeps.length = 0;
};
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 * @internal
 */
class Dep {
    constructor() {
        // pending subs cleanup
        this._pending = false;
        this.id = uid$2++;
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    removeSub(sub) {
        // #12696 deps with massive amount of subscribers are extremely slow to
        // clean up in Chromium
        // to workaround this, we unset the sub for now, and clear them on
        // next scheduler flush.
        this.subs[this.subs.indexOf(sub)] = null;
        if (!this._pending) {
            this._pending = true;
            pendingCleanupDeps.push(this);
        }
    }
    depend(info) {
        if (Dep.target) {
            Dep.target.addDep(this);
            if (info && Dep.target.onTrack) {
                Dep.target.onTrack(Object.assign({ effect: Dep.target }, info));
            }
        }
    }
    notify(info) {
        // stabilize the subscriber list first
        const subs = this.subs.filter(s => s);
        if (!config.async) {
            // subs aren't sorted in scheduler if not running async
            // we need to sort them now to make sure they fire in correct
            // order
            subs.sort((a, b) => a.id - b.id);
        }
        for (let i = 0, l = subs.length; i < l; i++) {
            const sub = subs[i];
            if (info) {
                sub.onTrigger &&
                    sub.onTrigger(Object.assign({ effect: subs[i] }, info));
            }
            sub.update();
        }
    }
}
// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
const targetStack = [];
function pushTarget(target) {
    targetStack.push(target);
    Dep.target = target;
}
function popTarget() {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
const methodsToPatch = [
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
    const original = arrayProto[method];
    def(arrayMethods, method, function mutator(...args) {
        const result = original.apply(this, args);
        const ob = this.__ob__;
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        if (inserted)
            ob.observeArray(inserted);
        // notify change
        {
            ob.dep.notify({
                type: "array mutation" /* TriggerOpTypes.ARRAY_MUTATION */,
                target: this,
                key: method
            });
        }
        return result;
    });
});

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
const NO_INIITIAL_VALUE = {};
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
let shouldObserve = true;
function toggleObserving(value) {
    shouldObserve = value;
}
// ssr mock dep
const mockDep = {
    notify: noop,
    depend: noop,
    addSub: noop,
    removeSub: noop
};
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
class Observer {
    constructor(value, shallow = false, mock = false) {
        this.value = value;
        this.shallow = shallow;
        this.mock = mock;
        // this.value = value
        this.dep = mock ? mockDep : new Dep();
        this.vmCount = 0;
        def(value, '__ob__', this);
        if (isArray(value)) {
            if (!mock) {
                if (hasProto) {
                    value.__proto__ = arrayMethods;
                    /* eslint-enable no-proto */
                }
                else {
                    for (let i = 0, l = arrayKeys.length; i < l; i++) {
                        const key = arrayKeys[i];
                        def(value, key, arrayMethods[key]);
                    }
                }
            }
            if (!shallow) {
                this.observeArray(value);
            }
        }
        else {
            /**
             * Walk through all properties and convert them into
             * getter/setters. This method should only be called when
             * value type is Object.
             */
            const keys = Object.keys(value);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                defineReactive(value, key, NO_INIITIAL_VALUE, undefined, shallow, mock);
            }
        }
    }
    /**
     * Observe a list of Array items.
     */
    observeArray(value) {
        for (let i = 0, l = value.length; i < l; i++) {
            observe(value[i], false, this.mock);
        }
    }
}
// helpers
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe(value, shallow, ssrMockReactivity) {
    if (value && hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        return value.__ob__;
    }
    if (shouldObserve &&
        (ssrMockReactivity || !isServerRendering()) &&
        (isArray(value) || isPlainObject(value)) &&
        Object.isExtensible(value) &&
        !value.__v_skip /* ReactiveFlags.SKIP */ &&
        !isRef(value) &&
        !(value instanceof VNode)) {
        return new Observer(value, shallow, ssrMockReactivity);
    }
}
/**
 * Define a reactive property on an Object.
 */
function defineReactive(obj, key, val, customSetter, shallow, mock) {
    const dep = new Dep();
    const property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
        return;
    }
    // cater for pre-defined getter/setters
    const getter = property && property.get;
    const setter = property && property.set;
    if ((!getter || setter) &&
        (val === NO_INIITIAL_VALUE || arguments.length === 2)) {
        val = obj[key];
    }
    let childOb = !shallow && observe(val, false, mock);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val;
            if (Dep.target) {
                {
                    dep.depend({
                        target: obj,
                        type: "get" /* TrackOpTypes.GET */,
                        key
                    });
                }
                if (childOb) {
                    childOb.dep.depend();
                    if (isArray(value)) {
                        dependArray(value);
                    }
                }
            }
            return isRef(value) && !shallow ? value.value : value;
        },
        set: function reactiveSetter(newVal) {
            const value = getter ? getter.call(obj) : val;
            if (!hasChanged(value, newVal)) {
                return;
            }
            if (customSetter) {
                customSetter();
            }
            if (setter) {
                setter.call(obj, newVal);
            }
            else if (getter) {
                // #7981: for accessor properties without setter
                return;
            }
            else if (!shallow && isRef(value) && !isRef(newVal)) {
                value.value = newVal;
                return;
            }
            else {
                val = newVal;
            }
            childOb = !shallow && observe(newVal, false, mock);
            {
                dep.notify({
                    type: "set" /* TriggerOpTypes.SET */,
                    target: obj,
                    key,
                    newValue: newVal,
                    oldValue: value
                });
            }
        }
    });
    return dep;
}
function set(target, key, val) {
    if ((isUndef(target) || isPrimitive(target))) {
        warn$2(`Cannot set reactive property on undefined, null, or primitive value: ${target}`);
    }
    if (isReadonly(target)) {
        warn$2(`Set operation on key "${key}" failed: target is readonly.`);
        return;
    }
    const ob = target.__ob__;
    if (isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        // when mocking for SSR, array methods are not hijacked
        if (ob && !ob.shallow && ob.mock) {
            observe(val, false, true);
        }
        return val;
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        return val;
    }
    if (target._isVue || (ob && ob.vmCount)) {
        warn$2('Avoid adding reactive properties to a Vue instance or its root $data ' +
                'at runtime - declare it upfront in the data option.');
        return val;
    }
    if (!ob) {
        target[key] = val;
        return val;
    }
    defineReactive(ob.value, key, val, undefined, ob.shallow, ob.mock);
    {
        ob.dep.notify({
            type: "add" /* TriggerOpTypes.ADD */,
            target: target,
            key,
            newValue: val,
            oldValue: undefined
        });
    }
    return val;
}
function del(target, key) {
    if ((isUndef(target) || isPrimitive(target))) {
        warn$2(`Cannot delete reactive property on undefined, null, or primitive value: ${target}`);
    }
    if (isArray(target) && isValidArrayIndex(key)) {
        target.splice(key, 1);
        return;
    }
    const ob = target.__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
        warn$2('Avoid deleting properties on a Vue instance or its root $data ' +
                '- just set it to null.');
        return;
    }
    if (isReadonly(target)) {
        warn$2(`Delete operation on key "${key}" failed: target is readonly.`);
        return;
    }
    if (!hasOwn(target, key)) {
        return;
    }
    delete target[key];
    if (!ob) {
        return;
    }
    {
        ob.dep.notify({
            type: "delete" /* TriggerOpTypes.DELETE */,
            target: target,
            key
        });
    }
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value) {
    for (let e, i = 0, l = value.length; i < l; i++) {
        e = value[i];
        if (e && e.__ob__) {
            e.__ob__.dep.depend();
        }
        if (isArray(e)) {
            dependArray(e);
        }
    }
}

function reactive(target) {
    makeReactive(target, false);
    return target;
}
/**
 * Return a shallowly-reactive copy of the original object, where only the root
 * level properties are reactive. It also does not auto-unwrap refs (even at the
 * root level).
 */
function shallowReactive(target) {
    makeReactive(target, true);
    def(target, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, true);
    return target;
}
function makeReactive(target, shallow) {
    // if trying to observe a readonly proxy, return the readonly version.
    if (!isReadonly(target)) {
        {
            if (isArray(target)) {
                warn$2(`Avoid using Array as root value for ${shallow ? `shallowReactive()` : `reactive()`} as it cannot be tracked in watch() or watchEffect(). Use ${shallow ? `shallowRef()` : `ref()`} instead. This is a Vue-2-only limitation.`);
            }
            const existingOb = target && target.__ob__;
            if (existingOb && existingOb.shallow !== shallow) {
                warn$2(`Target is already a ${existingOb.shallow ? `` : `non-`}shallow reactive object, and cannot be converted to ${shallow ? `` : `non-`}shallow.`);
            }
        }
        const ob = observe(target, shallow, isServerRendering() /* ssr mock reactivity */);
        if (!ob) {
            if (target == null || isPrimitive(target)) {
                warn$2(`value cannot be made reactive: ${String(target)}`);
            }
            if (isCollectionType(target)) {
                warn$2(`Vue 2 does not support reactive collection types such as Map or Set.`);
            }
        }
    }
}
function isReactive(value) {
    if (isReadonly(value)) {
        return isReactive(value["__v_raw" /* ReactiveFlags.RAW */]);
    }
    return !!(value && value.__ob__);
}
function isShallow(value) {
    return !!(value && value.__v_isShallow);
}
function isReadonly(value) {
    return !!(value && value.__v_isReadonly);
}
function isProxy(value) {
    return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
    const raw = observed && observed["__v_raw" /* ReactiveFlags.RAW */];
    return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
    // non-extensible objects won't be observed anyway
    if (Object.isExtensible(value)) {
        def(value, "__v_skip" /* ReactiveFlags.SKIP */, true);
    }
    return value;
}
/**
 * @internal
 */
function isCollectionType(value) {
    const type = toRawType(value);
    return (type === 'Map' || type === 'WeakMap' || type === 'Set' || type === 'WeakSet');
}

/**
 * @internal
 */
const RefFlag = `__v_isRef`;
function isRef(r) {
    return !!(r && r.__v_isRef === true);
}
function ref$1(value) {
    return createRef(value, false);
}
function shallowRef(value) {
    return createRef(value, true);
}
function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
        return rawValue;
    }
    const ref = {};
    def(ref, RefFlag, true);
    def(ref, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, shallow);
    def(ref, 'dep', defineReactive(ref, 'value', rawValue, null, shallow, isServerRendering()));
    return ref;
}
function triggerRef(ref) {
    if (!ref.dep) {
        warn$2(`received object is not a triggerable ref.`);
    }
    {
        ref.dep &&
            ref.dep.notify({
                type: "set" /* TriggerOpTypes.SET */,
                target: ref,
                key: 'value'
            });
    }
}
function unref(ref) {
    return isRef(ref) ? ref.value : ref;
}
function proxyRefs(objectWithRefs) {
    if (isReactive(objectWithRefs)) {
        return objectWithRefs;
    }
    const proxy = {};
    const keys = Object.keys(objectWithRefs);
    for (let i = 0; i < keys.length; i++) {
        proxyWithRefUnwrap(proxy, objectWithRefs, keys[i]);
    }
    return proxy;
}
function proxyWithRefUnwrap(target, source, key) {
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            const val = source[key];
            if (isRef(val)) {
                return val.value;
            }
            else {
                const ob = val && val.__ob__;
                if (ob)
                    ob.dep.depend();
                return val;
            }
        },
        set: value => {
            const oldValue = source[key];
            if (isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
            }
            else {
                source[key] = value;
            }
        }
    });
}
function customRef(factory) {
    const dep = new Dep();
    const { get, set } = factory(() => {
        {
            dep.depend({
                target: ref,
                type: "get" /* TrackOpTypes.GET */,
                key: 'value'
            });
        }
    }, () => {
        {
            dep.notify({
                target: ref,
                type: "set" /* TriggerOpTypes.SET */,
                key: 'value'
            });
        }
    });
    const ref = {
        get value() {
            return get();
        },
        set value(newVal) {
            set(newVal);
        }
    };
    def(ref, RefFlag, true);
    return ref;
}
function toRefs(object) {
    if (!isReactive(object)) {
        warn$2(`toRefs() expects a reactive object but received a plain one.`);
    }
    const ret = isArray(object) ? new Array(object.length) : {};
    for (const key in object) {
        ret[key] = toRef(object, key);
    }
    return ret;
}
function toRef(object, key, defaultValue) {
    const val = object[key];
    if (isRef(val)) {
        return val;
    }
    const ref = {
        get value() {
            const val = object[key];
            return val === undefined ? defaultValue : val;
        },
        set value(newVal) {
            object[key] = newVal;
        }
    };
    def(ref, RefFlag, true);
    return ref;
}

const rawToReadonlyFlag = `__v_rawToReadonly`;
const rawToShallowReadonlyFlag = `__v_rawToShallowReadonly`;
function readonly(target) {
    return createReadonly(target, false);
}
function createReadonly(target, shallow) {
    if (!isPlainObject(target)) {
        {
            if (isArray(target)) {
                warn$2(`Vue 2 does not support readonly arrays.`);
            }
            else if (isCollectionType(target)) {
                warn$2(`Vue 2 does not support readonly collection types such as Map or Set.`);
            }
            else {
                warn$2(`value cannot be made readonly: ${typeof target}`);
            }
        }
        return target;
    }
    if (!Object.isExtensible(target)) {
        warn$2(`Vue 2 does not support creating readonly proxy for non-extensible object.`);
    }
    // already a readonly object
    if (isReadonly(target)) {
        return target;
    }
    // already has a readonly proxy
    const existingFlag = shallow ? rawToShallowReadonlyFlag : rawToReadonlyFlag;
    const existingProxy = target[existingFlag];
    if (existingProxy) {
        return existingProxy;
    }
    const proxy = Object.create(Object.getPrototypeOf(target));
    def(target, existingFlag, proxy);
    def(proxy, "__v_isReadonly" /* ReactiveFlags.IS_READONLY */, true);
    def(proxy, "__v_raw" /* ReactiveFlags.RAW */, target);
    if (isRef(target)) {
        def(proxy, RefFlag, true);
    }
    if (shallow || isShallow(target)) {
        def(proxy, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, true);
    }
    const keys = Object.keys(target);
    for (let i = 0; i < keys.length; i++) {
        defineReadonlyProperty(proxy, target, keys[i], shallow);
    }
    return proxy;
}
function defineReadonlyProperty(proxy, target, key, shallow) {
    Object.defineProperty(proxy, key, {
        enumerable: true,
        configurable: true,
        get() {
            const val = target[key];
            return shallow || !isPlainObject(val) ? val : readonly(val);
        },
        set() {
            warn$2(`Set operation on key "${key}" failed: target is readonly.`);
        }
    });
}
/**
 * Returns a reactive-copy of the original object, where only the root level
 * properties are readonly, and does NOT unwrap refs nor recursively convert
 * returned properties.
 * This is used for creating the props proxy object for stateful components.
 */
function shallowReadonly(target) {
    return createReadonly(target, true);
}

function computed(getterOrOptions, debugOptions) {
    let getter;
    let setter;
    const onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
        getter = getterOrOptions;
        setter = () => {
                warn$2('Write operation failed: computed value is readonly');
            }
            ;
    }
    else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    const watcher = isServerRendering()
        ? null
        : new Watcher(currentInstance, getter, noop, { lazy: true });
    if (watcher && debugOptions) {
        watcher.onTrack = debugOptions.onTrack;
        watcher.onTrigger = debugOptions.onTrigger;
    }
    const ref = {
        // some libs rely on the presence effect for checking computed refs
        // from normal refs, but the implementation doesn't matter
        effect: watcher,
        get value() {
            if (watcher) {
                if (watcher.dirty) {
                    watcher.evaluate();
                }
                if (Dep.target) {
                    if (Dep.target.onTrack) {
                        Dep.target.onTrack({
                            effect: Dep.target,
                            target: ref,
                            type: "get" /* TrackOpTypes.GET */,
                            key: 'value'
                        });
                    }
                    watcher.depend();
                }
                return watcher.value;
            }
            else {
                return getter();
            }
        },
        set value(newVal) {
            setter(newVal);
        }
    };
    def(ref, RefFlag, true);
    def(ref, "__v_isReadonly" /* ReactiveFlags.IS_READONLY */, onlyGetter);
    return ref;
}

let mark;
let measure;
{
    const perf = inBrowser && window.performance;
    /* istanbul ignore if */
    if (perf &&
        // @ts-ignore
        perf.mark &&
        // @ts-ignore
        perf.measure &&
        // @ts-ignore
        perf.clearMarks &&
        // @ts-ignore
        perf.clearMeasures) {
        mark = tag => perf.mark(tag);
        measure = (name, startTag, endTag) => {
            perf.measure(name, startTag, endTag);
            perf.clearMarks(startTag);
            perf.clearMarks(endTag);
            // perf.clearMeasures(name)
        };
    }
}

const normalizeEvent = cached((name) => {
    const passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    const once = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once ? name.slice(1) : name;
    const capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
        name,
        once,
        capture,
        passive
    };
});
function createFnInvoker(fns, vm) {
    function invoker() {
        const fns = invoker.fns;
        if (isArray(fns)) {
            const cloned = fns.slice();
            for (let i = 0; i < cloned.length; i++) {
                invokeWithErrorHandling(cloned[i], null, arguments, vm, `v-on handler`);
            }
        }
        else {
            // return handler return value for single handlers
            return invokeWithErrorHandling(fns, null, arguments, vm, `v-on handler`);
        }
    }
    invoker.fns = fns;
    return invoker;
}
function updateListeners(on, oldOn, add, remove, createOnceHandler, vm) {
    let name, cur, old, event;
    for (name in on) {
        cur = on[name];
        old = oldOn[name];
        event = normalizeEvent(name);
        if (isUndef(cur)) {
            warn$2(`Invalid handler for event "${event.name}": got ` + String(cur), vm);
        }
        else if (isUndef(old)) {
            if (isUndef(cur.fns)) {
                cur = on[name] = createFnInvoker(cur, vm);
            }
            if (isTrue(event.once)) {
                cur = on[name] = createOnceHandler(event.name, cur, event.capture);
            }
            add(event.name, cur, event.capture, event.passive, event.params);
        }
        else if (cur !== old) {
            old.fns = cur;
            on[name] = old;
        }
    }
    for (name in oldOn) {
        if (isUndef(on[name])) {
            event = normalizeEvent(name);
            remove(event.name, oldOn[name], event.capture);
        }
    }
}

function mergeVNodeHook(def, hookKey, hook) {
    if (def instanceof VNode) {
        def = def.data.hook || (def.data.hook = {});
    }
    let invoker;
    const oldHook = def[hookKey];
    function wrappedHook() {
        hook.apply(this, arguments);
        // important: remove merged hook to ensure it's called only once
        // and prevent memory leak
        remove$2(invoker.fns, wrappedHook);
    }
    if (isUndef(oldHook)) {
        // no existing hook
        invoker = createFnInvoker([wrappedHook]);
    }
    else {
        /* istanbul ignore if */
        if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
            // already a merged invoker
            invoker = oldHook;
            invoker.fns.push(wrappedHook);
        }
        else {
            // existing plain hook
            invoker = createFnInvoker([oldHook, wrappedHook]);
        }
    }
    invoker.merged = true;
    def[hookKey] = invoker;
}

function extractPropsFromVNodeData(data, Ctor, tag) {
    // we are only extracting raw values here.
    // validation and default values are handled in the child
    // component itself.
    const propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
        return;
    }
    const res = {};
    const { attrs, props } = data;
    if (isDef(attrs) || isDef(props)) {
        for (const key in propOptions) {
            const altKey = hyphenate(key);
            {
                const keyInLowerCase = key.toLowerCase();
                if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
                    tip(`Prop "${keyInLowerCase}" is passed to component ` +
                        `${formatComponentName(
                        // @ts-expect-error tag is string
                        tag || Ctor)}, but the declared prop name is` +
                        ` "${key}". ` +
                        `Note that HTML attributes are case-insensitive and camelCased ` +
                        `props need to use their kebab-case equivalents when using in-DOM ` +
                        `templates. You should probably use "${altKey}" instead of "${key}".`);
                }
            }
            checkProp(res, props, key, altKey, true) ||
                checkProp(res, attrs, key, altKey, false);
        }
    }
    return res;
}
function checkProp(res, hash, key, altKey, preserve) {
    if (isDef(hash)) {
        if (hasOwn(hash, key)) {
            res[key] = hash[key];
            if (!preserve) {
                delete hash[key];
            }
            return true;
        }
        else if (hasOwn(hash, altKey)) {
            res[key] = hash[altKey];
            if (!preserve) {
                delete hash[altKey];
            }
            return true;
        }
    }
    return false;
}

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
function simpleNormalizeChildren(children) {
    for (let i = 0; i < children.length; i++) {
        if (isArray(children[i])) {
            return Array.prototype.concat.apply([], children);
        }
    }
    return children;
}
// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren(children) {
    return isPrimitive(children)
        ? [createTextVNode(children)]
        : isArray(children)
            ? normalizeArrayChildren(children)
            : undefined;
}
function isTextNode(node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}
function normalizeArrayChildren(children, nestedIndex) {
    const res = [];
    let i, c, lastIndex, last;
    for (i = 0; i < children.length; i++) {
        c = children[i];
        if (isUndef(c) || typeof c === 'boolean')
            continue;
        lastIndex = res.length - 1;
        last = res[lastIndex];
        //  nested
        if (isArray(c)) {
            if (c.length > 0) {
                c = normalizeArrayChildren(c, `${nestedIndex || ''}_${i}`);
                // merge adjacent text nodes
                if (isTextNode(c[0]) && isTextNode(last)) {
                    res[lastIndex] = createTextVNode(last.text + c[0].text);
                    c.shift();
                }
                res.push.apply(res, c);
            }
        }
        else if (isPrimitive(c)) {
            if (isTextNode(last)) {
                // merge adjacent text nodes
                // this is necessary for SSR hydration because text nodes are
                // essentially merged when rendered to HTML strings
                res[lastIndex] = createTextVNode(last.text + c);
            }
            else if (c !== '') {
                // convert primitive to vnode
                res.push(createTextVNode(c));
            }
        }
        else {
            if (isTextNode(c) && isTextNode(last)) {
                // merge adjacent text nodes
                res[lastIndex] = createTextVNode(last.text + c.text);
            }
            else {
                // default key for nested array children (likely generated by v-for)
                if (isTrue(children._isVList) &&
                    isDef(c.tag) &&
                    isUndef(c.key) &&
                    isDef(nestedIndex)) {
                    c.key = `__vlist${nestedIndex}_${i}__`;
                }
                res.push(c);
            }
        }
    }
    return res;
}

const SIMPLE_NORMALIZE = 1;
const ALWAYS_NORMALIZE = 2;
// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement$1(context, tag, data, children, normalizationType, alwaysNormalize) {
    if (isArray(data) || isPrimitive(data)) {
        normalizationType = children;
        children = data;
        data = undefined;
    }
    if (isTrue(alwaysNormalize)) {
        normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType);
}
function _createElement(context, tag, data, children, normalizationType) {
    if (isDef(data) && isDef(data.__ob__)) {
        warn$2(`Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` + 'Always create fresh vnode data objects in each render!', context);
        return createEmptyVNode();
    }
    // object syntax in v-bind
    if (isDef(data) && isDef(data.is)) {
        tag = data.is;
    }
    if (!tag) {
        // in case of component :is set to falsy value
        return createEmptyVNode();
    }
    // warn against non-primitive key
    if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
        warn$2('Avoid using non-primitive value as key, ' +
            'use string/number value instead.', context);
    }
    // support single function children as default scoped slot
    if (isArray(children) && isFunction(children[0])) {
        data = data || {};
        data.scopedSlots = { default: children[0] };
        children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
        children = normalizeChildren(children);
    }
    else if (normalizationType === SIMPLE_NORMALIZE) {
        children = simpleNormalizeChildren(children);
    }
    let vnode, ns;
    if (typeof tag === 'string') {
        let Ctor;
        ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
        if (config.isReservedTag(tag)) {
            // platform built-in elements
            if (isDef(data) &&
                isDef(data.nativeOn) &&
                data.tag !== 'component') {
                warn$2(`The .native modifier for v-on is only valid on components but it was used on <${tag}>.`, context);
            }
            vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
        }
        else if ((!data || !data.pre) &&
            isDef((Ctor = resolveAsset(context.$options, 'components', tag)))) {
            // component
            vnode = createComponent(Ctor, data, context, children, tag);
        }
        else {
            // unknown or unlisted namespaced elements
            // check at runtime because it may get assigned a namespace when its
            // parent normalizes children
            vnode = new VNode(tag, data, children, undefined, undefined, context);
        }
    }
    else {
        // direct component options / constructor
        vnode = createComponent(tag, data, context, children);
    }
    if (isArray(vnode)) {
        return vnode;
    }
    else if (isDef(vnode)) {
        if (isDef(ns))
            applyNS(vnode, ns);
        if (isDef(data))
            registerDeepBindings(data);
        return vnode;
    }
    else {
        return createEmptyVNode();
    }
}
function applyNS(vnode, ns, force) {
    vnode.ns = ns;
    if (vnode.tag === 'foreignObject') {
        // use default namespace inside foreignObject
        ns = undefined;
        force = true;
    }
    if (isDef(vnode.children)) {
        for (let i = 0, l = vnode.children.length; i < l; i++) {
            const child = vnode.children[i];
            if (isDef(child.tag) &&
                (isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
                applyNS(child, ns, force);
            }
        }
    }
}
// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings(data) {
    if (isObject(data.style)) {
        traverse(data.style);
    }
    if (isObject(data.class)) {
        traverse(data.class);
    }
}

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList(val, render) {
    let ret = null, i, l, keys, key;
    if (isArray(val) || typeof val === 'string') {
        ret = new Array(val.length);
        for (i = 0, l = val.length; i < l; i++) {
            ret[i] = render(val[i], i);
        }
    }
    else if (typeof val === 'number') {
        ret = new Array(val);
        for (i = 0; i < val; i++) {
            ret[i] = render(i + 1, i);
        }
    }
    else if (isObject(val)) {
        if (hasSymbol && val[Symbol.iterator]) {
            ret = [];
            const iterator = val[Symbol.iterator]();
            let result = iterator.next();
            while (!result.done) {
                ret.push(render(result.value, ret.length));
                result = iterator.next();
            }
        }
        else {
            keys = Object.keys(val);
            ret = new Array(keys.length);
            for (i = 0, l = keys.length; i < l; i++) {
                key = keys[i];
                ret[i] = render(val[key], key, i);
            }
        }
    }
    if (!isDef(ret)) {
        ret = [];
    }
    ret._isVList = true;
    return ret;
}

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot(name, fallbackRender, props, bindObject) {
    const scopedSlotFn = this.$scopedSlots[name];
    let nodes;
    if (scopedSlotFn) {
        // scoped slot
        props = props || {};
        if (bindObject) {
            if (!isObject(bindObject)) {
                warn$2('slot v-bind without argument expects an Object', this);
            }
            props = extend(extend({}, bindObject), props);
        }
        nodes =
            scopedSlotFn(props) ||
                (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
    }
    else {
        nodes =
            this.$slots[name] ||
                (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
    }
    const target = props && props.slot;
    if (target) {
        return this.$createElement('template', { slot: target }, nodes);
    }
    else {
        return nodes;
    }
}

/**
 * Runtime helper for resolving filters
 */
function resolveFilter(id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity;
}

function isKeyNotMatch(expect, actual) {
    if (isArray(expect)) {
        return expect.indexOf(actual) === -1;
    }
    else {
        return expect !== actual;
    }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
    const mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
    if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
        return isKeyNotMatch(builtInKeyName, eventKeyName);
    }
    else if (mappedKeyCode) {
        return isKeyNotMatch(mappedKeyCode, eventKeyCode);
    }
    else if (eventKeyName) {
        return hyphenate(eventKeyName) !== key;
    }
    return eventKeyCode === undefined;
}

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps(data, tag, value, asProp, isSync) {
    if (value) {
        if (!isObject(value)) {
            warn$2('v-bind without argument expects an Object or Array value', this);
        }
        else {
            if (isArray(value)) {
                value = toObject(value);
            }
            let hash;
            for (const key in value) {
                if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
                    hash = data;
                }
                else {
                    const type = data.attrs && data.attrs.type;
                    hash =
                        asProp || config.mustUseProp(tag, type, key)
                            ? data.domProps || (data.domProps = {})
                            : data.attrs || (data.attrs = {});
                }
                const camelizedKey = camelize(key);
                const hyphenatedKey = hyphenate(key);
                if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
                    hash[key] = value[key];
                    if (isSync) {
                        const on = data.on || (data.on = {});
                        on[`update:${key}`] = function ($event) {
                            value[key] = $event;
                        };
                    }
                }
            }
        }
    }
    return data;
}

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic(index, isInFor) {
    const cached = this._staticTrees || (this._staticTrees = []);
    let tree = cached[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree.
    if (tree && !isInFor) {
        return tree;
    }
    // otherwise, render a fresh tree.
    tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, this._c, this // for render fns generated for functional component templates
    );
    markStatic$1(tree, `__static__${index}`, false);
    return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce(tree, index, key) {
    markStatic$1(tree, `__once__${index}${key ? `_${key}` : ``}`, true);
    return tree;
}
function markStatic$1(tree, key, isOnce) {
    if (isArray(tree)) {
        for (let i = 0; i < tree.length; i++) {
            if (tree[i] && typeof tree[i] !== 'string') {
                markStaticNode(tree[i], `${key}_${i}`, isOnce);
            }
        }
    }
    else {
        markStaticNode(tree, key, isOnce);
    }
}
function markStaticNode(node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
}

function bindObjectListeners(data, value) {
    if (value) {
        if (!isPlainObject(value)) {
            warn$2('v-on without argument expects an Object value', this);
        }
        else {
            const on = (data.on = data.on ? extend({}, data.on) : {});
            for (const key in value) {
                const existing = on[key];
                const ours = value[key];
                on[key] = existing ? [].concat(existing, ours) : ours;
            }
        }
    }
    return data;
}

function resolveScopedSlots(fns, res, 
// the following are added in 2.6
hasDynamicKeys, contentHashKey) {
    res = res || { $stable: !hasDynamicKeys };
    for (let i = 0; i < fns.length; i++) {
        const slot = fns[i];
        if (isArray(slot)) {
            resolveScopedSlots(slot, res, hasDynamicKeys);
        }
        else if (slot) {
            // marker for reverse proxying v-slot without scope on this.$slots
            // @ts-expect-error
            if (slot.proxy) {
                // @ts-expect-error
                slot.fn.proxy = true;
            }
            res[slot.key] = slot.fn;
        }
    }
    if (contentHashKey) {
        res.$key = contentHashKey;
    }
    return res;
}

// helper to process dynamic keys for dynamic arguments in v-bind and v-on.
function bindDynamicKeys(baseObj, values) {
    for (let i = 0; i < values.length; i += 2) {
        const key = values[i];
        if (typeof key === 'string' && key) {
            baseObj[values[i]] = values[i + 1];
        }
        else if (key !== '' && key !== null) {
            // null is a special value for explicitly removing a binding
            warn$2(`Invalid value for dynamic directive argument (expected string or null): ${key}`, this);
        }
    }
    return baseObj;
}
// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier(value, symbol) {
    return typeof value === 'string' ? symbol + value : value;
}

function installRenderHelpers(target) {
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

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots(children, context) {
    if (!children || !children.length) {
        return {};
    }
    const slots = {};
    for (let i = 0, l = children.length; i < l; i++) {
        const child = children[i];
        const data = child.data;
        // remove slot attribute if the node is resolved as a Vue slot node
        if (data && data.attrs && data.attrs.slot) {
            delete data.attrs.slot;
        }
        // named slots should only be respected if the vnode was rendered in the
        // same context.
        if ((child.context === context || child.fnContext === context) &&
            data &&
            data.slot != null) {
            const name = data.slot;
            const slot = slots[name] || (slots[name] = []);
            if (child.tag === 'template') {
                slot.push.apply(slot, child.children || []);
            }
            else {
                slot.push(child);
            }
        }
        else {
            (slots.default || (slots.default = [])).push(child);
        }
    }
    // ignore slots that contains only whitespace
    for (const name in slots) {
        if (slots[name].every(isWhitespace)) {
            delete slots[name];
        }
    }
    return slots;
}
function isWhitespace(node) {
    return (node.isComment && !node.asyncFactory) || node.text === ' ';
}

function isAsyncPlaceholder(node) {
    // @ts-expect-error not really boolean type
    return node.isComment && node.asyncFactory;
}

function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
    let res;
    const hasNormalSlots = Object.keys(normalSlots).length > 0;
    const isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
    const key = scopedSlots && scopedSlots.$key;
    if (!scopedSlots) {
        res = {};
    }
    else if (scopedSlots._normalized) {
        // fast path 1: child component re-render only, parent did not change
        return scopedSlots._normalized;
    }
    else if (isStable &&
        prevScopedSlots &&
        prevScopedSlots !== emptyObject &&
        key === prevScopedSlots.$key &&
        !hasNormalSlots &&
        !prevScopedSlots.$hasNormal) {
        // fast path 2: stable scoped slots w/ no normal slots to proxy,
        // only need to normalize once
        return prevScopedSlots;
    }
    else {
        res = {};
        for (const key in scopedSlots) {
            if (scopedSlots[key] && key[0] !== '$') {
                res[key] = normalizeScopedSlot(ownerVm, normalSlots, key, scopedSlots[key]);
            }
        }
    }
    // expose normal slots on scopedSlots
    for (const key in normalSlots) {
        if (!(key in res)) {
            res[key] = proxyNormalSlot(normalSlots, key);
        }
    }
    // avoriaz seems to mock a non-extensible $scopedSlots object
    // and when that is passed down this would cause an error
    if (scopedSlots && Object.isExtensible(scopedSlots)) {
        scopedSlots._normalized = res;
    }
    def(res, '$stable', isStable);
    def(res, '$key', key);
    def(res, '$hasNormal', hasNormalSlots);
    return res;
}
function normalizeScopedSlot(vm, normalSlots, key, fn) {
    const normalized = function () {
        const cur = currentInstance;
        setCurrentInstance(vm);
        let res = arguments.length ? fn.apply(null, arguments) : fn({});
        res =
            res && typeof res === 'object' && !isArray(res)
                ? [res] // single vnode
                : normalizeChildren(res);
        const vnode = res && res[0];
        setCurrentInstance(cur);
        return res &&
            (!vnode ||
                (res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode))) // #9658, #10391
            ? undefined
            : res;
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
    return normalized;
}
function proxyNormalSlot(slots, key) {
    return () => slots[key];
}

function initSetup(vm) {
    const options = vm.$options;
    const setup = options.setup;
    if (setup) {
        const ctx = (vm._setupContext = createSetupContext(vm));
        setCurrentInstance(vm);
        pushTarget();
        const setupResult = invokeWithErrorHandling(setup, null, [vm._props || shallowReactive({}), ctx], vm, `setup`);
        popTarget();
        setCurrentInstance();
        if (isFunction(setupResult)) {
            // render function
            // @ts-ignore
            options.render = setupResult;
        }
        else if (isObject(setupResult)) {
            // bindings
            if (setupResult instanceof VNode) {
                warn$2(`setup() should not return VNodes directly - ` +
                    `return a render function instead.`);
            }
            vm._setupState = setupResult;
            // __sfc indicates compiled bindings from <script setup>
            if (!setupResult.__sfc) {
                for (const key in setupResult) {
                    if (!isReserved(key)) {
                        proxyWithRefUnwrap(vm, setupResult, key);
                    }
                    else {
                        warn$2(`Avoid using variables that start with _ or $ in setup().`);
                    }
                }
            }
            else {
                // exposed for compiled render fn
                const proxy = (vm._setupProxy = {});
                for (const key in setupResult) {
                    if (key !== '__sfc') {
                        proxyWithRefUnwrap(proxy, setupResult, key);
                    }
                }
            }
        }
        else if (setupResult !== undefined) {
            warn$2(`setup() should return an object. Received: ${setupResult === null ? 'null' : typeof setupResult}`);
        }
    }
}
function createSetupContext(vm) {
    let exposeCalled = false;
    return {
        get attrs() {
            if (!vm._attrsProxy) {
                const proxy = (vm._attrsProxy = {});
                def(proxy, '_v_attr_proxy', true);
                syncSetupProxy(proxy, vm.$attrs, emptyObject, vm, '$attrs');
            }
            return vm._attrsProxy;
        },
        get listeners() {
            if (!vm._listenersProxy) {
                const proxy = (vm._listenersProxy = {});
                syncSetupProxy(proxy, vm.$listeners, emptyObject, vm, '$listeners');
            }
            return vm._listenersProxy;
        },
        get slots() {
            return initSlotsProxy(vm);
        },
        emit: bind$1(vm.$emit, vm),
        expose(exposed) {
            {
                if (exposeCalled) {
                    warn$2(`expose() should be called only once per setup().`, vm);
                }
                exposeCalled = true;
            }
            if (exposed) {
                Object.keys(exposed).forEach(key => proxyWithRefUnwrap(vm, exposed, key));
            }
        }
    };
}
function syncSetupProxy(to, from, prev, instance, type) {
    let changed = false;
    for (const key in from) {
        if (!(key in to)) {
            changed = true;
            defineProxyAttr(to, key, instance, type);
        }
        else if (from[key] !== prev[key]) {
            changed = true;
        }
    }
    for (const key in to) {
        if (!(key in from)) {
            changed = true;
            delete to[key];
        }
    }
    return changed;
}
function defineProxyAttr(proxy, key, instance, type) {
    Object.defineProperty(proxy, key, {
        enumerable: true,
        configurable: true,
        get() {
            return instance[type][key];
        }
    });
}
function initSlotsProxy(vm) {
    if (!vm._slotsProxy) {
        syncSetupSlots((vm._slotsProxy = {}), vm.$scopedSlots);
    }
    return vm._slotsProxy;
}
function syncSetupSlots(to, from) {
    for (const key in from) {
        to[key] = from[key];
    }
    for (const key in to) {
        if (!(key in from)) {
            delete to[key];
        }
    }
}
/**
 * @internal use manual type def because public setup context type relies on
 * legacy VNode types
 */
function useSlots() {
    return getContext().slots;
}
/**
 * @internal use manual type def because public setup context type relies on
 * legacy VNode types
 */
function useAttrs() {
    return getContext().attrs;
}
/**
 * Vue 2 only
 * @internal use manual type def because public setup context type relies on
 * legacy VNode types
 */
function useListeners() {
    return getContext().listeners;
}
function getContext() {
    if (!currentInstance) {
        warn$2(`useContext() called without active instance.`);
    }
    const vm = currentInstance;
    return vm._setupContext || (vm._setupContext = createSetupContext(vm));
}
/**
 * Runtime helper for merging default declarations. Imported by compiled code
 * only.
 * @internal
 */
function mergeDefaults(raw, defaults) {
    const props = isArray(raw)
        ? raw.reduce((normalized, p) => ((normalized[p] = {}), normalized), {})
        : raw;
    for (const key in defaults) {
        const opt = props[key];
        if (opt) {
            if (isArray(opt) || isFunction(opt)) {
                props[key] = { type: opt, default: defaults[key] };
            }
            else {
                opt.default = defaults[key];
            }
        }
        else if (opt === null) {
            props[key] = { default: defaults[key] };
        }
        else {
            warn$2(`props default key "${key}" has no corresponding declaration.`);
        }
    }
    return props;
}

function initRender(vm) {
    vm._vnode = null; // the root of the child tree
    vm._staticTrees = null; // v-once cached trees
    const options = vm.$options;
    const parentVnode = (vm.$vnode = options._parentVnode); // the placeholder node in parent tree
    const renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopedSlots = parentVnode
        ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots)
        : emptyObject;
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    // @ts-expect-error
    vm._c = (a, b, c, d) => createElement$1(vm, a, b, c, d, false);
    // normalization is always applied for the public version, used in
    // user-written render functions.
    // @ts-expect-error
    vm.$createElement = (a, b, c, d) => createElement$1(vm, a, b, c, d, true);
    // $attrs & $listeners are exposed for easier HOC creation.
    // they need to be reactive so that HOCs using them are always updated
    const parentData = parentVnode && parentVnode.data;
    /* istanbul ignore else */
    {
        defineReactive(vm, '$attrs', (parentData && parentData.attrs) || emptyObject, () => {
            !isUpdatingChildComponent && warn$2(`$attrs is readonly.`, vm);
        }, true);
        defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
            !isUpdatingChildComponent && warn$2(`$listeners is readonly.`, vm);
        }, true);
    }
}
let currentRenderingInstance = null;
function renderMixin(Vue) {
    // install runtime convenience helpers
    installRenderHelpers(Vue.prototype);
    Vue.prototype.$nextTick = function (fn) {
        return nextTick(fn, this);
    };
    Vue.prototype._render = function () {
        const vm = this;
        const { render, _parentVnode } = vm.$options;
        if (_parentVnode && vm._isMounted) {
            vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
            if (vm._slotsProxy) {
                syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
            }
        }
        // set parent vnode. this allows render functions to have access
        // to the data on the placeholder node.
        vm.$vnode = _parentVnode;
        // render self
        let vnode;
        try {
            // There's no need to maintain a stack because all render fns are called
            // separately from one another. Nested component's render fns are called
            // when parent component is patched.
            setCurrentInstance(vm);
            currentRenderingInstance = vm;
            vnode = render.call(vm._renderProxy, vm.$createElement);
        }
        catch (e) {
            handleError(e, vm, `render`);
            // return error render result,
            // or previous vnode to prevent render error causing blank component
            /* istanbul ignore else */
            if (vm.$options.renderError) {
                try {
                    vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
                }
                catch (e) {
                    handleError(e, vm, `renderError`);
                    vnode = vm._vnode;
                }
            }
            else {
                vnode = vm._vnode;
            }
        }
        finally {
            currentRenderingInstance = null;
            setCurrentInstance();
        }
        // if the returned array contains only a single node, allow it
        if (isArray(vnode) && vnode.length === 1) {
            vnode = vnode[0];
        }
        // return empty vnode in case the render function errored out
        if (!(vnode instanceof VNode)) {
            if (isArray(vnode)) {
                warn$2('Multiple root nodes returned from render function. Render function ' +
                    'should return a single root node.', vm);
            }
            vnode = createEmptyVNode();
        }
        // set parent
        vnode.parent = _parentVnode;
        return vnode;
    };
}

function ensureCtor(comp, base) {
    if (comp.__esModule || (hasSymbol && comp[Symbol.toStringTag] === 'Module')) {
        comp = comp.default;
    }
    return isObject(comp) ? base.extend(comp) : comp;
}
function createAsyncPlaceholder(factory, data, context, children, tag) {
    const node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data, context, children, tag };
    return node;
}
function resolveAsyncComponent(factory, baseCtor) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
        return factory.errorComp;
    }
    if (isDef(factory.resolved)) {
        return factory.resolved;
    }
    const owner = currentRenderingInstance;
    if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
        // already pending
        factory.owners.push(owner);
    }
    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
        return factory.loadingComp;
    }
    if (owner && !isDef(factory.owners)) {
        const owners = (factory.owners = [owner]);
        let sync = true;
        let timerLoading = null;
        let timerTimeout = null;
        owner.$on('hook:destroyed', () => remove$2(owners, owner));
        const forceRender = (renderCompleted) => {
            for (let i = 0, l = owners.length; i < l; i++) {
                owners[i].$forceUpdate();
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
        const resolve = once((res) => {
            // cache resolved
            factory.resolved = ensureCtor(res, baseCtor);
            // invoke callbacks only if this is not a synchronous resolve
            // (async resolves are shimmed as synchronous during SSR)
            if (!sync) {
                forceRender(true);
            }
            else {
                owners.length = 0;
            }
        });
        const reject = once(reason => {
            warn$2(`Failed to resolve async component: ${String(factory)}` +
                    (reason ? `\nReason: ${reason}` : ''));
            if (isDef(factory.errorComp)) {
                factory.error = true;
                forceRender(true);
            }
        });
        const res = factory(resolve, reject);
        if (isObject(res)) {
            if (isPromise(res)) {
                // () => Promise
                if (isUndef(factory.resolved)) {
                    res.then(resolve, reject);
                }
            }
            else if (isPromise(res.component)) {
                res.component.then(resolve, reject);
                if (isDef(res.error)) {
                    factory.errorComp = ensureCtor(res.error, baseCtor);
                }
                if (isDef(res.loading)) {
                    factory.loadingComp = ensureCtor(res.loading, baseCtor);
                    if (res.delay === 0) {
                        factory.loading = true;
                    }
                    else {
                        // @ts-expect-error NodeJS timeout type
                        timerLoading = setTimeout(() => {
                            timerLoading = null;
                            if (isUndef(factory.resolved) && isUndef(factory.error)) {
                                factory.loading = true;
                                forceRender(false);
                            }
                        }, res.delay || 200);
                    }
                }
                if (isDef(res.timeout)) {
                    // @ts-expect-error NodeJS timeout type
                    timerTimeout = setTimeout(() => {
                        timerTimeout = null;
                        if (isUndef(factory.resolved)) {
                            reject(`timeout (${res.timeout}ms)` );
                        }
                    }, res.timeout);
                }
            }
        }
        sync = false;
        // return in case resolved synchronously
        return factory.loading ? factory.loadingComp : factory.resolved;
    }
}

function getFirstComponentChild(children) {
    if (isArray(children)) {
        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                return c;
            }
        }
    }
}

function initEvents(vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    // init parent attached events
    const listeners = vm.$options._parentListeners;
    if (listeners) {
        updateComponentListeners(vm, listeners);
    }
}
let target$1;
function add$1(event, fn) {
    target$1.$on(event, fn);
}
function remove$1(event, fn) {
    target$1.$off(event, fn);
}
function createOnceHandler$1(event, fn) {
    const _target = target$1;
    return function onceHandler() {
        const res = fn.apply(null, arguments);
        if (res !== null) {
            _target.$off(event, onceHandler);
        }
    };
}
function updateComponentListeners(vm, listeners, oldListeners) {
    target$1 = vm;
    updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
    target$1 = undefined;
}
function eventsMixin(Vue) {
    const hookRE = /^hook:/;
    Vue.prototype.$on = function (event, fn) {
        const vm = this;
        if (isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                vm.$on(event[i], fn);
            }
        }
        else {
            (vm._events[event] || (vm._events[event] = [])).push(fn);
            // optimize hook:event cost by using a boolean flag marked at registration
            // instead of a hash lookup
            if (hookRE.test(event)) {
                vm._hasHookEvent = true;
            }
        }
        return vm;
    };
    Vue.prototype.$once = function (event, fn) {
        const vm = this;
        function on() {
            vm.$off(event, on);
            fn.apply(vm, arguments);
        }
        on.fn = fn;
        vm.$on(event, on);
        return vm;
    };
    Vue.prototype.$off = function (event, fn) {
        const vm = this;
        // all
        if (!arguments.length) {
            vm._events = Object.create(null);
            return vm;
        }
        // array of events
        if (isArray(event)) {
            for (let i = 0, l = event.length; i < l; i++) {
                vm.$off(event[i], fn);
            }
            return vm;
        }
        // specific event
        const cbs = vm._events[event];
        if (!cbs) {
            return vm;
        }
        if (!fn) {
            vm._events[event] = null;
            return vm;
        }
        // specific handler
        let cb;
        let i = cbs.length;
        while (i--) {
            cb = cbs[i];
            if (cb === fn || cb.fn === fn) {
                cbs.splice(i, 1);
                break;
            }
        }
        return vm;
    };
    Vue.prototype.$emit = function (event) {
        const vm = this;
        {
            const lowerCaseEvent = event.toLowerCase();
            if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
                tip(`Event "${lowerCaseEvent}" is emitted in component ` +
                    `${formatComponentName(vm)} but the handler is registered for "${event}". ` +
                    `Note that HTML attributes are case-insensitive and you cannot use ` +
                    `v-on to listen to camelCase events when using in-DOM templates. ` +
                    `You should probably use "${hyphenate(event)}" instead of "${event}".`);
            }
        }
        let cbs = vm._events[event];
        if (cbs) {
            cbs = cbs.length > 1 ? toArray(cbs) : cbs;
            const args = toArray(arguments, 1);
            const info = `event handler for "${event}"`;
            for (let i = 0, l = cbs.length; i < l; i++) {
                invokeWithErrorHandling(cbs[i], vm, args, vm, info);
            }
        }
        return vm;
    };
}

let activeInstance = null;
let isUpdatingChildComponent = false;
function setActiveInstance(vm) {
    const prevActiveInstance = activeInstance;
    activeInstance = vm;
    return () => {
        activeInstance = prevActiveInstance;
    };
}
function initLifecycle(vm) {
    const options = vm.$options;
    // locate first non-abstract parent
    let parent = options.parent;
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
    vm._provided = parent ? parent._provided : Object.create(null);
    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
}
function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
        const vm = this;
        const prevEl = vm.$el;
        const prevVnode = vm._vnode;
        const restoreActiveInstance = setActiveInstance(vm);
        vm._vnode = vnode;
        // Vue.prototype.__patch__ is injected in entry points
        // based on the rendering backend used.
        if (!prevVnode) {
            // initial render
            vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
        }
        else {
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
        let wrapper = vm;
        while (wrapper &&
            wrapper.$vnode &&
            wrapper.$parent &&
            wrapper.$vnode === wrapper.$parent._vnode) {
            wrapper.$parent.$el = wrapper.$el;
            wrapper = wrapper.$parent;
        }
        // updated hook is called by the scheduler to ensure that children are
        // updated in a parent's updated hook.
    };
    Vue.prototype.$forceUpdate = function () {
        const vm = this;
        if (vm._watcher) {
            vm._watcher.update();
        }
    };
    Vue.prototype.$destroy = function () {
        const vm = this;
        if (vm._isBeingDestroyed) {
            return;
        }
        callHook$1(vm, 'beforeDestroy');
        vm._isBeingDestroyed = true;
        // remove self from parent
        const parent = vm.$parent;
        if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
            remove$2(parent.$children, vm);
        }
        // teardown scope. this includes both the render watcher and other
        // watchers created
        vm._scope.stop();
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
        callHook$1(vm, 'destroyed');
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
function mountComponent(vm, el, hydrating) {
    vm.$el = el;
    if (!vm.$options.render) {
        // @ts-expect-error invalid type
        vm.$options.render = createEmptyVNode;
        {
            /* istanbul ignore if */
            if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
                vm.$options.el ||
                el) {
                warn$2('You are using the runtime-only build of Vue where the template ' +
                    'compiler is not available. Either pre-compile the templates into ' +
                    'render functions, or use the compiler-included build.', vm);
            }
            else {
                warn$2('Failed to mount component: template or render function not defined.', vm);
            }
        }
    }
    callHook$1(vm, 'beforeMount');
    let updateComponent;
    /* istanbul ignore if */
    if (config.performance && mark) {
        updateComponent = () => {
            const name = vm._name;
            const id = vm._uid;
            const startTag = `vue-perf-start:${id}`;
            const endTag = `vue-perf-end:${id}`;
            mark(startTag);
            const vnode = vm._render();
            mark(endTag);
            measure(`vue ${name} render`, startTag, endTag);
            mark(startTag);
            vm._update(vnode, hydrating);
            mark(endTag);
            measure(`vue ${name} patch`, startTag, endTag);
        };
    }
    else {
        updateComponent = () => {
            vm._update(vm._render(), hydrating);
        };
    }
    const watcherOptions = {
        before() {
            if (vm._isMounted && !vm._isDestroyed) {
                callHook$1(vm, 'beforeUpdate');
            }
        }
    };
    {
        watcherOptions.onTrack = e => callHook$1(vm, 'renderTracked', [e]);
        watcherOptions.onTrigger = e => callHook$1(vm, 'renderTriggered', [e]);
    }
    // we set this to vm._watcher inside the watcher's constructor
    // since the watcher's initial patch may call $forceUpdate (e.g. inside child
    // component's mounted hook), which relies on vm._watcher being already defined
    new Watcher(vm, updateComponent, noop, watcherOptions, true /* isRenderWatcher */);
    hydrating = false;
    // flush buffer for flush: "pre" watchers queued in setup()
    const preWatchers = vm._preWatchers;
    if (preWatchers) {
        for (let i = 0; i < preWatchers.length; i++) {
            preWatchers[i].run();
        }
    }
    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
        vm._isMounted = true;
        callHook$1(vm, 'mounted');
    }
    return vm;
}
function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
    {
        isUpdatingChildComponent = true;
    }
    // determine whether component has slot children
    // we need to do this before overwriting $options._renderChildren.
    // check if there are dynamic scopedSlots (hand-written or compiled but with
    // dynamic slot names). Static scoped slots compiled from template has the
    // "$stable" marker.
    const newScopedSlots = parentVnode.data.scopedSlots;
    const oldScopedSlots = vm.$scopedSlots;
    const hasDynamicScopedSlot = !!((newScopedSlots && !newScopedSlots.$stable) ||
        (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
        (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key) ||
        (!newScopedSlots && vm.$scopedSlots.$key));
    // Any static slot children from the parent may have changed during parent's
    // update. Dynamic scoped slots may also have changed. In such cases, a forced
    // update is necessary to ensure correctness.
    let needsForceUpdate = !!(renderChildren || // has new static slots
        vm.$options._renderChildren || // has old static slots
        hasDynamicScopedSlot);
    const prevVNode = vm.$vnode;
    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
    if (vm._vnode) {
        // update child tree's parent
        vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;
    // update $attrs and $listeners hash
    // these are also reactive so they may trigger child update if the child
    // used them during render
    const attrs = parentVnode.data.attrs || emptyObject;
    if (vm._attrsProxy) {
        // force update if attrs are accessed and has changed since it may be
        // passed to a child component.
        if (syncSetupProxy(vm._attrsProxy, attrs, (prevVNode.data && prevVNode.data.attrs) || emptyObject, vm, '$attrs')) {
            needsForceUpdate = true;
        }
    }
    vm.$attrs = attrs;
    // update listeners
    listeners = listeners || emptyObject;
    const prevListeners = vm.$options._parentListeners;
    if (vm._listenersProxy) {
        syncSetupProxy(vm._listenersProxy, listeners, prevListeners || emptyObject, vm, '$listeners');
    }
    vm.$listeners = vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, prevListeners);
    // update props
    if (propsData && vm.$options.props) {
        toggleObserving(false);
        const props = vm._props;
        const propKeys = vm.$options._propKeys || [];
        for (let i = 0; i < propKeys.length; i++) {
            const key = propKeys[i];
            const propOptions = vm.$options.props; // wtf flow?
            props[key] = validateProp(key, propOptions, propsData, vm);
        }
        toggleObserving(true);
        // keep a copy of raw propsData
        vm.$options.propsData = propsData;
    }
    // resolve slots + force update if has children
    if (needsForceUpdate) {
        vm.$slots = resolveSlots(renderChildren, parentVnode.context);
        vm.$forceUpdate();
    }
    {
        isUpdatingChildComponent = false;
    }
}
function isInInactiveTree(vm) {
    while (vm && (vm = vm.$parent)) {
        if (vm._inactive)
            return true;
    }
    return false;
}
function activateChildComponent(vm, direct) {
    if (direct) {
        vm._directInactive = false;
        if (isInInactiveTree(vm)) {
            return;
        }
    }
    else if (vm._directInactive) {
        return;
    }
    if (vm._inactive || vm._inactive === null) {
        vm._inactive = false;
        for (let i = 0; i < vm.$children.length; i++) {
            activateChildComponent(vm.$children[i]);
        }
        callHook$1(vm, 'activated');
    }
}
function deactivateChildComponent(vm, direct) {
    if (direct) {
        vm._directInactive = true;
        if (isInInactiveTree(vm)) {
            return;
        }
    }
    if (!vm._inactive) {
        vm._inactive = true;
        for (let i = 0; i < vm.$children.length; i++) {
            deactivateChildComponent(vm.$children[i]);
        }
        callHook$1(vm, 'deactivated');
    }
}
function callHook$1(vm, hook, args, setContext = true) {
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    const prev = currentInstance;
    setContext && setCurrentInstance(vm);
    const handlers = vm.$options[hook];
    const info = `${hook} hook`;
    if (handlers) {
        for (let i = 0, j = handlers.length; i < j; i++) {
            invokeWithErrorHandling(handlers[i], vm, args || null, vm, info);
        }
    }
    if (vm._hasHookEvent) {
        vm.$emit('hook:' + hook);
    }
    setContext && setCurrentInstance(prev);
    popTarget();
}

const MAX_UPDATE_COUNT = 100;
const queue = [];
const activatedChildren = [];
let has = {};
let circular = {};
let waiting = false;
let flushing = false;
let index$1 = 0;
/**
 * Reset the scheduler's state.
 */
function resetSchedulerState() {
    index$1 = queue.length = activatedChildren.length = 0;
    has = {};
    {
        circular = {};
    }
    waiting = flushing = false;
}
// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
let currentFlushTimestamp = 0;
// Async edge case fix requires storing an event listener's attach timestamp.
let getNow = Date.now;
// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
    const performance = window.performance;
    if (performance &&
        typeof performance.now === 'function' &&
        getNow() > document.createEvent('Event').timeStamp) {
        // if the event timestamp, although evaluated AFTER the Date.now(), is
        // smaller than it, it means the event is using a hi-res timestamp,
        // and we need to use the hi-res version for event listener timestamps as
        // well.
        getNow = () => performance.now();
    }
}
const sortCompareFn = (a, b) => {
    if (a.post) {
        if (!b.post)
            return 1;
    }
    else if (b.post) {
        return -1;
    }
    return a.id - b.id;
};
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
    currentFlushTimestamp = getNow();
    flushing = true;
    let watcher, id;
    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(sortCompareFn);
    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index$1 = 0; index$1 < queue.length; index$1++) {
        watcher = queue[index$1];
        if (watcher.before) {
            watcher.before();
        }
        id = watcher.id;
        has[id] = null;
        watcher.run();
        // in dev build, check and stop circular updates.
        if (has[id] != null) {
            circular[id] = (circular[id] || 0) + 1;
            if (circular[id] > MAX_UPDATE_COUNT) {
                warn$2('You may have an infinite update loop ' +
                    (watcher.user
                        ? `in watcher with expression "${watcher.expression}"`
                        : `in a component render function.`), watcher.vm);
                break;
            }
        }
    }
    // keep copies of post queues before resetting state
    const activatedQueue = activatedChildren.slice();
    const updatedQueue = queue.slice();
    resetSchedulerState();
    // call component updated and activated hooks
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);
    cleanupDeps();
    // devtool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
        devtools.emit('flush');
    }
}
function callUpdatedHooks(queue) {
    let i = queue.length;
    while (i--) {
        const watcher = queue[i];
        const vm = watcher.vm;
        if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
            callHook$1(vm, 'updated');
        }
    }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent(vm) {
    // setting _inactive to false here so that a render function can
    // rely on checking whether it's in an inactive tree (e.g. router-view)
    vm._inactive = false;
    activatedChildren.push(vm);
}
function callActivatedHooks(queue) {
    for (let i = 0; i < queue.length; i++) {
        queue[i]._inactive = true;
        activateChildComponent(queue[i], true /* true */);
    }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
    const id = watcher.id;
    if (has[id] != null) {
        return;
    }
    if (watcher === Dep.target && watcher.noRecurse) {
        return;
    }
    has[id] = true;
    if (!flushing) {
        queue.push(watcher);
    }
    else {
        // if already flushing, splice the watcher based on its id
        // if already past its id, it will be run next immediately.
        let i = queue.length - 1;
        while (i > index$1 && queue[i].id > watcher.id) {
            i--;
        }
        queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
        waiting = true;
        if (!config.async) {
            flushSchedulerQueue();
            return;
        }
        nextTick(flushSchedulerQueue);
    }
}

const WATCHER = `watcher`;
const WATCHER_CB = `${WATCHER} callback`;
const WATCHER_GETTER = `${WATCHER} getter`;
const WATCHER_CLEANUP = `${WATCHER} cleanup`;
// Simple effect.
function watchEffect(effect, options) {
    return doWatch(effect, null, options);
}
function watchPostEffect(effect, options) {
    return doWatch(effect, null, (Object.assign(Object.assign({}, options), { flush: 'post' }) ));
}
function watchSyncEffect(effect, options) {
    return doWatch(effect, null, (Object.assign(Object.assign({}, options), { flush: 'sync' }) ));
}
// initial value for watchers to trigger on undefined initial values
const INITIAL_WATCHER_VALUE = {};
// implementation
function watch(source, cb, options) {
    if (typeof cb !== 'function') {
        warn$2(`\`watch(fn, options?)\` signature has been moved to a separate API. ` +
            `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` +
            `supports \`watch(source, cb, options?) signature.`);
    }
    return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush = 'pre', onTrack, onTrigger } = emptyObject) {
    if (!cb) {
        if (immediate !== undefined) {
            warn$2(`watch() "immediate" option is only respected when using the ` +
                `watch(source, callback, options?) signature.`);
        }
        if (deep !== undefined) {
            warn$2(`watch() "deep" option is only respected when using the ` +
                `watch(source, callback, options?) signature.`);
        }
    }
    const warnInvalidSource = (s) => {
        warn$2(`Invalid watch source: ${s}. A watch source can only be a getter/effect ` +
            `function, a ref, a reactive object, or an array of these types.`);
    };
    const instance = currentInstance;
    const call = (fn, type, args = null) => invokeWithErrorHandling(fn, null, args, instance, type);
    let getter;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
        getter = () => source.value;
        forceTrigger = isShallow(source);
    }
    else if (isReactive(source)) {
        getter = () => {
            source.__ob__.dep.depend();
            return source;
        };
        deep = true;
    }
    else if (isArray(source)) {
        isMultiSource = true;
        forceTrigger = source.some(s => isReactive(s) || isShallow(s));
        getter = () => source.map(s => {
            if (isRef(s)) {
                return s.value;
            }
            else if (isReactive(s)) {
                return traverse(s);
            }
            else if (isFunction(s)) {
                return call(s, WATCHER_GETTER);
            }
            else {
                warnInvalidSource(s);
            }
        });
    }
    else if (isFunction(source)) {
        if (cb) {
            // getter with cb
            getter = () => call(source, WATCHER_GETTER);
        }
        else {
            // no cb -> simple effect
            getter = () => {
                if (instance && instance._isDestroyed) {
                    return;
                }
                if (cleanup) {
                    cleanup();
                }
                return call(source, WATCHER, [onCleanup]);
            };
        }
    }
    else {
        getter = noop;
        warnInvalidSource(source);
    }
    if (cb && deep) {
        const baseGetter = getter;
        getter = () => traverse(baseGetter());
    }
    let cleanup;
    let onCleanup = (fn) => {
        cleanup = watcher.onStop = () => {
            call(fn, WATCHER_CLEANUP);
        };
    };
    // in SSR there is no need to setup an actual effect, and it should be noop
    // unless it's eager
    if (isServerRendering()) {
        // we will also not call the invalidate callback (+ runner is not set up)
        onCleanup = noop;
        if (!cb) {
            getter();
        }
        else if (immediate) {
            call(cb, WATCHER_CB, [
                getter(),
                isMultiSource ? [] : undefined,
                onCleanup
            ]);
        }
        return noop;
    }
    const watcher = new Watcher(currentInstance, getter, noop, {
        lazy: true
    });
    watcher.noRecurse = !cb;
    let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
    // overwrite default run
    watcher.run = () => {
        if (!watcher.active) {
            return;
        }
        if (cb) {
            // watch(source, cb)
            const newValue = watcher.get();
            if (deep ||
                forceTrigger ||
                (isMultiSource
                    ? newValue.some((v, i) => hasChanged(v, oldValue[i]))
                    : hasChanged(newValue, oldValue))) {
                // cleanup before running cb again
                if (cleanup) {
                    cleanup();
                }
                call(cb, WATCHER_CB, [
                    newValue,
                    // pass undefined as the old value when it's changed for the first time
                    oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                    onCleanup
                ]);
                oldValue = newValue;
            }
        }
        else {
            // watchEffect
            watcher.get();
        }
    };
    if (flush === 'sync') {
        watcher.update = watcher.run;
    }
    else if (flush === 'post') {
        watcher.post = true;
        watcher.update = () => queueWatcher(watcher);
    }
    else {
        // pre
        watcher.update = () => {
            if (instance && instance === currentInstance && !instance._isMounted) {
                // pre-watcher triggered before
                const buffer = instance._preWatchers || (instance._preWatchers = []);
                if (buffer.indexOf(watcher) < 0)
                    buffer.push(watcher);
            }
            else {
                queueWatcher(watcher);
            }
        };
    }
    {
        watcher.onTrack = onTrack;
        watcher.onTrigger = onTrigger;
    }
    // initial run
    if (cb) {
        if (immediate) {
            watcher.run();
        }
        else {
            oldValue = watcher.get();
        }
    }
    else if (flush === 'post' && instance) {
        instance.$once('hook:mounted', () => watcher.get());
    }
    else {
        watcher.get();
    }
    return () => {
        watcher.teardown();
    };
}

let activeEffectScope;
class EffectScope {
    constructor(detached = false) {
        this.detached = detached;
        /**
         * @internal
         */
        this.active = true;
        /**
         * @internal
         */
        this.effects = [];
        /**
         * @internal
         */
        this.cleanups = [];
        this.parent = activeEffectScope;
        if (!detached && activeEffectScope) {
            this.index =
                (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
        }
    }
    run(fn) {
        if (this.active) {
            const currentEffectScope = activeEffectScope;
            try {
                activeEffectScope = this;
                return fn();
            }
            finally {
                activeEffectScope = currentEffectScope;
            }
        }
        else {
            warn$2(`cannot run an inactive effect scope.`);
        }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
        activeEffectScope = this;
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
        activeEffectScope = this.parent;
    }
    stop(fromParent) {
        if (this.active) {
            let i, l;
            for (i = 0, l = this.effects.length; i < l; i++) {
                this.effects[i].teardown();
            }
            for (i = 0, l = this.cleanups.length; i < l; i++) {
                this.cleanups[i]();
            }
            if (this.scopes) {
                for (i = 0, l = this.scopes.length; i < l; i++) {
                    this.scopes[i].stop(true);
                }
            }
            // nested scope, dereference from parent to avoid memory leaks
            if (!this.detached && this.parent && !fromParent) {
                // optimized O(1) removal
                const last = this.parent.scopes.pop();
                if (last && last !== this) {
                    this.parent.scopes[this.index] = last;
                    last.index = this.index;
                }
            }
            this.parent = undefined;
            this.active = false;
        }
    }
}
function effectScope(detached) {
    return new EffectScope(detached);
}
/**
 * @internal
 */
function recordEffectScope(effect, scope = activeEffectScope) {
    if (scope && scope.active) {
        scope.effects.push(effect);
    }
}
function getCurrentScope() {
    return activeEffectScope;
}
function onScopeDispose(fn) {
    if (activeEffectScope) {
        activeEffectScope.cleanups.push(fn);
    }
    else {
        warn$2(`onScopeDispose() is called when there is no active effect scope` +
            ` to be associated with.`);
    }
}

function provide(key, value) {
    if (!currentInstance) {
        {
            warn$2(`provide() can only be used inside setup().`);
        }
    }
    else {
        // TS doesn't allow symbol as index type
        resolveProvided(currentInstance)[key] = value;
    }
}
function resolveProvided(vm) {
    // by default an instance inherits its parent's provides object
    // but when it needs to provide values of its own, it creates its
    // own provides object using parent provides object as prototype.
    // this way in `inject` we can simply look up injections from direct
    // parent and let the prototype chain do the work.
    const existing = vm._provided;
    const parentProvides = vm.$parent && vm.$parent._provided;
    if (parentProvides === existing) {
        return (vm._provided = Object.create(parentProvides));
    }
    else {
        return existing;
    }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
    // fallback to `currentRenderingInstance` so that this can be called in
    // a functional component
    const instance = currentInstance;
    if (instance) {
        // #2400
        // to support `app.use` plugins,
        // fallback to appContext's `provides` if the instance is at root
        const provides = instance.$parent && instance.$parent._provided;
        if (provides && key in provides) {
            // TS doesn't allow symbol as index type
            return provides[key];
        }
        else if (arguments.length > 1) {
            return treatDefaultAsFactory && isFunction(defaultValue)
                ? defaultValue.call(instance)
                : defaultValue;
        }
        else {
            warn$2(`injection "${String(key)}" not found.`);
        }
    }
    else {
        warn$2(`inject() can only be used inside setup() or functional components.`);
    }
}

/**
 * @internal this function needs manual public type declaration because it relies
 * on previously manually authored types from Vue 2
 */
function h(type, props, children) {
    if (!currentInstance) {
        warn$2(`globally imported h() can only be invoked when there is an active ` +
                `component instance, e.g. synchronously in a component's render or setup function.`);
    }
    return createElement$1(currentInstance, type, props, children, 2, true);
}

function handleError(err, vm, info) {
    // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
    // See: https://github.com/vuejs/vuex/issues/1505
    pushTarget();
    try {
        if (vm) {
            let cur = vm;
            while ((cur = cur.$parent)) {
                const hooks = cur.$options.errorCaptured;
                if (hooks) {
                    for (let i = 0; i < hooks.length; i++) {
                        try {
                            const capture = hooks[i].call(cur, err, vm, info) === false;
                            if (capture)
                                return;
                        }
                        catch (e) {
                            globalHandleError(e, cur, 'errorCaptured hook');
                        }
                    }
                }
            }
        }
        globalHandleError(err, vm, info);
    }
    finally {
        popTarget();
    }
}
function invokeWithErrorHandling(handler, context, args, vm, info) {
    let res;
    try {
        res = args ? handler.apply(context, args) : handler.call(context);
        if (res && !res._isVue && isPromise(res) && !res._handled) {
            res.catch(e => handleError(e, vm, info + ` (Promise/async)`));
            res._handled = true;
        }
    }
    catch (e) {
        handleError(e, vm, info);
    }
    return res;
}
function globalHandleError(err, vm, info) {
    if (config.errorHandler) {
        try {
            return config.errorHandler.call(null, err, vm, info);
        }
        catch (e) {
            // if the user intentionally throws the original error in the handler,
            // do not log it twice
            if (e !== err) {
                logError(e, null, 'config.errorHandler');
            }
        }
    }
    logError(err, vm, info);
}
function logError(err, vm, info) {
    {
        warn$2(`Error in ${info}: "${err.toString()}"`, vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
        console.error(err);
    }
    else {
        throw err;
    }
}

/* globals MutationObserver */
let isUsingMicroTask = false;
const callbacks = [];
let pending = false;
function flushCallbacks() {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
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
let timerFunc;
// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve();
    timerFunc = () => {
        p.then(flushCallbacks);
        // In problematic UIWebViews, Promise.then doesn't completely break, but
        // it can get stuck in a weird state where callbacks are pushed into the
        // microtask queue but the queue isn't being flushed, until the browser
        // needs to do some other work, e.g. handle a timer. Therefore we can
        // "force" the microtask queue to be flushed by adding an empty timer.
        if (isIOS)
            setTimeout(noop);
    };
    isUsingMicroTask = true;
}
else if (!isIE &&
    typeof MutationObserver !== 'undefined' &&
    (isNative(MutationObserver) ||
        // PhantomJS and iOS 7.x
        MutationObserver.toString() === '[object MutationObserverConstructor]')) {
    // Use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    // (#6466 MutationObserver is unreliable in IE11)
    let counter = 1;
    const observer = new MutationObserver(flushCallbacks);
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
        characterData: true
    });
    timerFunc = () => {
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
    };
    isUsingMicroTask = true;
}
else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    // Fallback to setImmediate.
    // Technically it leverages the (macro) task queue,
    // but it is still a better choice than setTimeout.
    timerFunc = () => {
        setImmediate(flushCallbacks);
    };
}
else {
    // Fallback to setTimeout.
    timerFunc = () => {
        setTimeout(flushCallbacks, 0);
    };
}
/**
 * @internal
 */
function nextTick(cb, ctx) {
    let _resolve;
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx);
            }
            catch (e) {
                handleError(e, ctx, 'nextTick');
            }
        }
        else if (_resolve) {
            _resolve(ctx);
        }
    });
    if (!pending) {
        pending = true;
        timerFunc();
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve;
        });
    }
}

function useCssModule(name = '$style') {
    /* istanbul ignore else */
    {
        if (!currentInstance) {
            warn$2(`useCssModule must be called inside setup()`);
            return emptyObject;
        }
        const mod = currentInstance[name];
        if (!mod) {
            warn$2(`Current instance does not have CSS module named "${name}".`);
            return emptyObject;
        }
        return mod;
    }
}

/**
 * Runtime helper for SFC's CSS variable injection feature.
 * @private
 */
function useCssVars(getter) {
    if (!inBrowser && !false)
        return;
    const instance = currentInstance;
    if (!instance) {
        warn$2(`useCssVars is called without current active component instance.`);
        return;
    }
    watchPostEffect(() => {
        const el = instance.$el;
        const vars = getter(instance, instance._setupProxy);
        if (el && el.nodeType === 1) {
            const style = el.style;
            for (const key in vars) {
                style.setProperty(`--${key}`, vars[key]);
            }
        }
    });
}

/**
 * v3-compatible async component API.
 * @internal the type is manually declared in <root>/types/v3-define-async-component.d.ts
 * because it relies on existing manual types
 */
function defineAsyncComponent(source) {
    if (isFunction(source)) {
        source = { loader: source };
    }
    const { loader, loadingComponent, errorComponent, delay = 200, timeout, // undefined = never times out
    suspensible = false, // in Vue 3 default is true
    onError: userOnError } = source;
    if (suspensible) {
        warn$2(`The suspensiblbe option for async components is not supported in Vue2. It is ignored.`);
    }
    let pendingRequest = null;
    let retries = 0;
    const retry = () => {
        retries++;
        pendingRequest = null;
        return load();
    };
    const load = () => {
        let thisRequest;
        return (pendingRequest ||
            (thisRequest = pendingRequest =
                loader()
                    .catch(err => {
                    err = err instanceof Error ? err : new Error(String(err));
                    if (userOnError) {
                        return new Promise((resolve, reject) => {
                            const userRetry = () => resolve(retry());
                            const userFail = () => reject(err);
                            userOnError(err, userRetry, userFail, retries + 1);
                        });
                    }
                    else {
                        throw err;
                    }
                })
                    .then((comp) => {
                    if (thisRequest !== pendingRequest && pendingRequest) {
                        return pendingRequest;
                    }
                    if (!comp) {
                        warn$2(`Async component loader resolved to undefined. ` +
                            `If you are using retry(), make sure to return its return value.`);
                    }
                    // interop module default
                    if (comp &&
                        (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
                        comp = comp.default;
                    }
                    if (comp && !isObject(comp) && !isFunction(comp)) {
                        throw new Error(`Invalid async component load result: ${comp}`);
                    }
                    return comp;
                })));
    };
    return () => {
        const component = load();
        return {
            component,
            delay,
            timeout,
            error: errorComponent,
            loading: loadingComponent
        };
    };
}

function createLifeCycle(hookName) {
    return (fn, target = currentInstance) => {
        if (!target) {
            warn$2(`${formatName(hookName)} is called when there is no active component instance to be ` +
                    `associated with. ` +
                    `Lifecycle injection APIs can only be used during execution of setup().`);
            return;
        }
        return injectHook(target, hookName, fn);
    };
}
function formatName(name) {
    if (name === 'beforeDestroy') {
        name = 'beforeUnmount';
    }
    else if (name === 'destroyed') {
        name = 'unmounted';
    }
    return `on${name[0].toUpperCase() + name.slice(1)}`;
}
function injectHook(instance, hookName, fn) {
    const options = instance.$options;
    options[hookName] = mergeLifecycleHook(options[hookName], fn);
}
const onBeforeMount = createLifeCycle('beforeMount');
const onMounted = createLifeCycle('mounted');
const onBeforeUpdate = createLifeCycle('beforeUpdate');
const onUpdated = createLifeCycle('updated');
const onBeforeUnmount = createLifeCycle('beforeDestroy');
const onUnmounted = createLifeCycle('destroyed');
const onActivated = createLifeCycle('activated');
const onDeactivated = createLifeCycle('deactivated');
const onServerPrefetch = createLifeCycle('serverPrefetch');
const onRenderTracked = createLifeCycle('renderTracked');
const onRenderTriggered = createLifeCycle('renderTriggered');
const injectErrorCapturedHook = createLifeCycle('errorCaptured');
function onErrorCaptured(hook, target = currentInstance) {
    injectErrorCapturedHook(hook, target);
}

/**
 * Note: also update dist/vue.runtime.mjs when adding new exports to this file.
 */
const version = '2.7.14';
/**
 * @internal type is manually declared in <root>/types/v3-define-component.d.ts
 */
function defineComponent(options) {
    return options;
}

var vca = /*#__PURE__*/Object.freeze({
  __proto__: null,
  version: version,
  defineComponent: defineComponent,
  ref: ref$1,
  shallowRef: shallowRef,
  isRef: isRef,
  toRef: toRef,
  toRefs: toRefs,
  unref: unref,
  proxyRefs: proxyRefs,
  customRef: customRef,
  triggerRef: triggerRef,
  reactive: reactive,
  isReactive: isReactive,
  isReadonly: isReadonly,
  isShallow: isShallow,
  isProxy: isProxy,
  shallowReactive: shallowReactive,
  markRaw: markRaw,
  toRaw: toRaw,
  readonly: readonly,
  shallowReadonly: shallowReadonly,
  computed: computed,
  watch: watch,
  watchEffect: watchEffect,
  watchPostEffect: watchPostEffect,
  watchSyncEffect: watchSyncEffect,
  EffectScope: EffectScope,
  effectScope: effectScope,
  onScopeDispose: onScopeDispose,
  getCurrentScope: getCurrentScope,
  provide: provide,
  inject: inject,
  h: h,
  getCurrentInstance: getCurrentInstance,
  useSlots: useSlots,
  useAttrs: useAttrs,
  useListeners: useListeners,
  mergeDefaults: mergeDefaults,
  nextTick: nextTick,
  set: set,
  del: del,
  useCssModule: useCssModule,
  useCssVars: useCssVars,
  defineAsyncComponent: defineAsyncComponent,
  onBeforeMount: onBeforeMount,
  onMounted: onMounted,
  onBeforeUpdate: onBeforeUpdate,
  onUpdated: onUpdated,
  onBeforeUnmount: onBeforeUnmount,
  onUnmounted: onUnmounted,
  onActivated: onActivated,
  onDeactivated: onDeactivated,
  onServerPrefetch: onServerPrefetch,
  onRenderTracked: onRenderTracked,
  onRenderTriggered: onRenderTriggered,
  onErrorCaptured: onErrorCaptured
});

const seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse(val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
    return val;
}
function _traverse(val, seen) {
    let i, keys;
    const isA = isArray(val);
    if ((!isA && !isObject(val)) ||
        val.__v_skip /* ReactiveFlags.SKIP */ ||
        Object.isFrozen(val) ||
        val instanceof VNode) {
        return;
    }
    if (val.__ob__) {
        const depId = val.__ob__.dep.id;
        if (seen.has(depId)) {
            return;
        }
        seen.add(depId);
    }
    if (isA) {
        i = val.length;
        while (i--)
            _traverse(val[i], seen);
    }
    else if (isRef(val)) {
        _traverse(val.value, seen);
    }
    else {
        keys = Object.keys(val);
        i = keys.length;
        while (i--)
            _traverse(val[keys[i]], seen);
    }
}

let uid$1 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 * @internal
 */
class Watcher {
    constructor(vm, expOrFn, cb, options, isRenderWatcher) {
        recordEffectScope(this, 
        // if the active effect scope is manually created (not a component scope),
        // prioritize it
        activeEffectScope && !activeEffectScope._vm
            ? activeEffectScope
            : vm
                ? vm._scope
                : undefined);
        if ((this.vm = vm) && isRenderWatcher) {
            vm._watcher = this;
        }
        // options
        if (options) {
            this.deep = !!options.deep;
            this.user = !!options.user;
            this.lazy = !!options.lazy;
            this.sync = !!options.sync;
            this.before = options.before;
            {
                this.onTrack = options.onTrack;
                this.onTrigger = options.onTrigger;
            }
        }
        else {
            this.deep = this.user = this.lazy = this.sync = false;
        }
        this.cb = cb;
        this.id = ++uid$1; // uid for batching
        this.active = true;
        this.post = false;
        this.dirty = this.lazy; // for lazy watchers
        this.deps = [];
        this.newDeps = [];
        this.depIds = new _Set();
        this.newDepIds = new _Set();
        this.expression = expOrFn.toString() ;
        // parse expression for getter
        if (isFunction(expOrFn)) {
            this.getter = expOrFn;
        }
        else {
            this.getter = parsePath(expOrFn);
            if (!this.getter) {
                this.getter = noop;
                warn$2(`Failed watching path: "${expOrFn}" ` +
                        'Watcher only accepts simple dot-delimited paths. ' +
                        'For full control, use a function instead.', vm);
            }
        }
        this.value = this.lazy ? undefined : this.get();
    }
    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    get() {
        pushTarget(this);
        let value;
        const vm = this.vm;
        try {
            value = this.getter.call(vm, vm);
        }
        catch (e) {
            if (this.user) {
                handleError(e, vm, `getter for watcher "${this.expression}"`);
            }
            else {
                throw e;
            }
        }
        finally {
            // "touch" every property so they are all tracked as
            // dependencies for deep watching
            if (this.deep) {
                traverse(value);
            }
            popTarget();
            this.cleanupDeps();
        }
        return value;
    }
    /**
     * Add a dependency to this directive.
     */
    addDep(dep) {
        const id = dep.id;
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
                dep.addSub(this);
            }
        }
    }
    /**
     * Clean up for dependency collection.
     */
    cleanupDeps() {
        let i = this.deps.length;
        while (i--) {
            const dep = this.deps[i];
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this);
            }
        }
        let tmp = this.depIds;
        this.depIds = this.newDepIds;
        this.newDepIds = tmp;
        this.newDepIds.clear();
        tmp = this.deps;
        this.deps = this.newDeps;
        this.newDeps = tmp;
        this.newDeps.length = 0;
    }
    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    update() {
        /* istanbul ignore else */
        if (this.lazy) {
            this.dirty = true;
        }
        else if (this.sync) {
            this.run();
        }
        else {
            queueWatcher(this);
        }
    }
    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    run() {
        if (this.active) {
            const value = this.get();
            if (value !== this.value ||
                // Deep watchers and watchers on Object/Arrays should fire even
                // when the value is the same, because the value may
                // have mutated.
                isObject(value) ||
                this.deep) {
                // set new value
                const oldValue = this.value;
                this.value = value;
                if (this.user) {
                    const info = `callback for watcher "${this.expression}"`;
                    invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
                }
                else {
                    this.cb.call(this.vm, value, oldValue);
                }
            }
        }
    }
    /**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */
    evaluate() {
        this.value = this.get();
        this.dirty = false;
    }
    /**
     * Depend on all deps collected by this watcher.
     */
    depend() {
        let i = this.deps.length;
        while (i--) {
            this.deps[i].depend();
        }
    }
    /**
     * Remove self from all dependencies' subscriber list.
     */
    teardown() {
        if (this.vm && !this.vm._isBeingDestroyed) {
            remove$2(this.vm._scope.effects, this);
        }
        if (this.active) {
            let i = this.deps.length;
            while (i--) {
                this.deps[i].removeSub(this);
            }
            this.active = false;
            if (this.onStop) {
                this.onStop();
            }
        }
    }
}

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
};
function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key];
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
function initState(vm) {
    const opts = vm.$options;
    if (opts.props)
        initProps$1(vm, opts.props);
    // Composition API
    initSetup(vm);
    if (opts.methods)
        initMethods(vm, opts.methods);
    if (opts.data) {
        initData(vm);
    }
    else {
        const ob = observe((vm._data = {}));
        ob && ob.vmCount++;
    }
    if (opts.computed)
        initComputed$1(vm, opts.computed);
    if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch);
    }
}
function initProps$1(vm, propsOptions) {
    const propsData = vm.$options.propsData || {};
    const props = (vm._props = shallowReactive({}));
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    const keys = (vm.$options._propKeys = []);
    const isRoot = !vm.$parent;
    // root instance props should be converted
    if (!isRoot) {
        toggleObserving(false);
    }
    for (const key in propsOptions) {
        keys.push(key);
        const value = validateProp(key, propsOptions, propsData, vm);
        /* istanbul ignore else */
        {
            const hyphenatedKey = hyphenate(key);
            if (isReservedAttribute(hyphenatedKey) ||
                config.isReservedAttr(hyphenatedKey)) {
                warn$2(`"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`, vm);
            }
            defineReactive(props, key, value, () => {
                if (!isRoot && !isUpdatingChildComponent) {
                    warn$2(`Avoid mutating a prop directly since the value will be ` +
                        `overwritten whenever the parent component re-renders. ` +
                        `Instead, use a data or computed property based on the prop's ` +
                        `value. Prop being mutated: "${key}"`, vm);
                }
            });
        }
        // static props are already proxied on the component's prototype
        // during Vue.extend(). We only need to proxy props defined at
        // instantiation here.
        if (!(key in vm)) {
            proxy(vm, `_props`, key);
        }
    }
    toggleObserving(true);
}
function initData(vm) {
    let data = vm.$options.data;
    data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
    if (!isPlainObject(data)) {
        data = {};
        warn$2('data functions should return an object:\n' +
                'https://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
    }
    // proxy data on instance
    const keys = Object.keys(data);
    const props = vm.$options.props;
    const methods = vm.$options.methods;
    let i = keys.length;
    while (i--) {
        const key = keys[i];
        {
            if (methods && hasOwn(methods, key)) {
                warn$2(`Method "${key}" has already been defined as a data property.`, vm);
            }
        }
        if (props && hasOwn(props, key)) {
            warn$2(`The data property "${key}" is already declared as a prop. ` +
                    `Use prop default value instead.`, vm);
        }
        else if (!isReserved(key)) {
            proxy(vm, `_data`, key);
        }
    }
    // observe data
    const ob = observe(data);
    ob && ob.vmCount++;
}
function getData(data, vm) {
    // #7573 disable dep collection when invoking data getters
    pushTarget();
    try {
        return data.call(vm, vm);
    }
    catch (e) {
        handleError(e, vm, `data()`);
        return {};
    }
    finally {
        popTarget();
    }
}
const computedWatcherOptions = { lazy: true };
function initComputed$1(vm, computed) {
    // $flow-disable-line
    const watchers = (vm._computedWatchers = Object.create(null));
    // computed properties are just getters during SSR
    const isSSR = isServerRendering();
    for (const key in computed) {
        const userDef = computed[key];
        const getter = isFunction(userDef) ? userDef : userDef.get;
        if (getter == null) {
            warn$2(`Getter is missing for computed property "${key}".`, vm);
        }
        if (!isSSR) {
            // create internal watcher for the computed property.
            watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
        }
        // component-defined computed properties are already defined on the
        // component prototype. We only need to define computed properties defined
        // at instantiation here.
        if (!(key in vm)) {
            defineComputed(vm, key, userDef);
        }
        else {
            if (key in vm.$data) {
                warn$2(`The computed property "${key}" is already defined in data.`, vm);
            }
            else if (vm.$options.props && key in vm.$options.props) {
                warn$2(`The computed property "${key}" is already defined as a prop.`, vm);
            }
            else if (vm.$options.methods && key in vm.$options.methods) {
                warn$2(`The computed property "${key}" is already defined as a method.`, vm);
            }
        }
    }
}
function defineComputed(target, key, userDef) {
    const shouldCache = !isServerRendering();
    if (isFunction(userDef)) {
        sharedPropertyDefinition.get = shouldCache
            ? createComputedGetter(key)
            : createGetterInvoker(userDef);
        sharedPropertyDefinition.set = noop;
    }
    else {
        sharedPropertyDefinition.get = userDef.get
            ? shouldCache && userDef.cache !== false
                ? createComputedGetter(key)
                : createGetterInvoker(userDef.get)
            : noop;
        sharedPropertyDefinition.set = userDef.set || noop;
    }
    if (sharedPropertyDefinition.set === noop) {
        sharedPropertyDefinition.set = function () {
            warn$2(`Computed property "${key}" was assigned to but it has no setter.`, this);
        };
    }
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
function createComputedGetter(key) {
    return function computedGetter() {
        const watcher = this._computedWatchers && this._computedWatchers[key];
        if (watcher) {
            if (watcher.dirty) {
                watcher.evaluate();
            }
            if (Dep.target) {
                if (Dep.target.onTrack) {
                    Dep.target.onTrack({
                        effect: Dep.target,
                        target: this,
                        type: "get" /* TrackOpTypes.GET */,
                        key
                    });
                }
                watcher.depend();
            }
            return watcher.value;
        }
    };
}
function createGetterInvoker(fn) {
    return function computedGetter() {
        return fn.call(this, this);
    };
}
function initMethods(vm, methods) {
    const props = vm.$options.props;
    for (const key in methods) {
        {
            if (typeof methods[key] !== 'function') {
                warn$2(`Method "${key}" has type "${typeof methods[key]}" in the component definition. ` +
                    `Did you reference the function correctly?`, vm);
            }
            if (props && hasOwn(props, key)) {
                warn$2(`Method "${key}" has already been defined as a prop.`, vm);
            }
            if (key in vm && isReserved(key)) {
                warn$2(`Method "${key}" conflicts with an existing Vue instance method. ` +
                    `Avoid defining component methods that start with _ or $.`);
            }
        }
        vm[key] = typeof methods[key] !== 'function' ? noop : bind$1(methods[key], vm);
    }
}
function initWatch(vm, watch) {
    for (const key in watch) {
        const handler = watch[key];
        if (isArray(handler)) {
            for (let i = 0; i < handler.length; i++) {
                createWatcher(vm, key, handler[i]);
            }
        }
        else {
            createWatcher(vm, key, handler);
        }
    }
}
function createWatcher(vm, expOrFn, handler, options) {
    if (isPlainObject(handler)) {
        options = handler;
        handler = handler.handler;
    }
    if (typeof handler === 'string') {
        handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options);
}
function stateMixin(Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    const dataDef = {};
    dataDef.get = function () {
        return this._data;
    };
    const propsDef = {};
    propsDef.get = function () {
        return this._props;
    };
    {
        dataDef.set = function () {
            warn$2('Avoid replacing instance root $data. ' +
                'Use nested data properties instead.', this);
        };
        propsDef.set = function () {
            warn$2(`$props is readonly.`, this);
        };
    }
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);
    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;
    Vue.prototype.$watch = function (expOrFn, cb, options) {
        const vm = this;
        if (isPlainObject(cb)) {
            return createWatcher(vm, expOrFn, cb, options);
        }
        options = options || {};
        options.user = true;
        const watcher = new Watcher(vm, expOrFn, cb, options);
        if (options.immediate) {
            const info = `callback for immediate watcher "${watcher.expression}"`;
            pushTarget();
            invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
            popTarget();
        }
        return function unwatchFn() {
            watcher.teardown();
        };
    };
}

function initProvide(vm) {
    const provideOption = vm.$options.provide;
    if (provideOption) {
        const provided = isFunction(provideOption)
            ? provideOption.call(vm)
            : provideOption;
        if (!isObject(provided)) {
            return;
        }
        const source = resolveProvided(vm);
        // IE9 doesn't support Object.getOwnPropertyDescriptors so we have to
        // iterate the keys ourselves.
        const keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
        }
    }
}
function initInjections(vm) {
    const result = resolveInject(vm.$options.inject, vm);
    if (result) {
        toggleObserving(false);
        Object.keys(result).forEach(key => {
            /* istanbul ignore else */
            {
                defineReactive(vm, key, result[key], () => {
                    warn$2(`Avoid mutating an injected value directly since the changes will be ` +
                        `overwritten whenever the provided component re-renders. ` +
                        `injection being mutated: "${key}"`, vm);
                });
            }
        });
        toggleObserving(true);
    }
}
function resolveInject(inject, vm) {
    if (inject) {
        // inject is :any because flow is not smart enough to figure out cached
        const result = Object.create(null);
        const keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            // #6574 in case the inject object is observed...
            if (key === '__ob__')
                continue;
            const provideKey = inject[key].from;
            if (provideKey in vm._provided) {
                result[key] = vm._provided[provideKey];
            }
            else if ('default' in inject[key]) {
                const provideDefault = inject[key].default;
                result[key] = isFunction(provideDefault)
                    ? provideDefault.call(vm)
                    : provideDefault;
            }
            else {
                warn$2(`Injection "${key}" not found`, vm);
            }
        }
        return result;
    }
}

let uid = 0;
function initMixin$1(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        // a uid
        vm._uid = uid++;
        let startTag, endTag;
        /* istanbul ignore if */
        if (config.performance && mark) {
            startTag = `vue-perf-start:${vm._uid}`;
            endTag = `vue-perf-end:${vm._uid}`;
            mark(startTag);
        }
        // a flag to mark this as a Vue instance without having to do instanceof
        // check
        vm._isVue = true;
        // avoid instances from being observed
        vm.__v_skip = true;
        // effect scope
        vm._scope = new EffectScope(true /* detached */);
        vm._scope._vm = true;
        // merge options
        if (options && options._isComponent) {
            // optimize internal component instantiation
            // since dynamic options merging is pretty slow, and none of the
            // internal component options needs special treatment.
            initInternalComponent(vm, options);
        }
        else {
            vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
        }
        /* istanbul ignore else */
        {
            initProxy(vm);
        }
        // expose real self
        vm._self = vm;
        initLifecycle(vm);
        initEvents(vm);
        initRender(vm);
        callHook$1(vm, 'beforeCreate', undefined, false /* setContext */);
        initInjections(vm); // resolve injections before data/props
        initState(vm);
        initProvide(vm); // resolve provide after data/props
        callHook$1(vm, 'created');
        /* istanbul ignore if */
        if (config.performance && mark) {
            vm._name = formatComponentName(vm, false);
            mark(endTag);
            measure(`vue ${vm._name} init`, startTag, endTag);
        }
        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    };
}
function initInternalComponent(vm, options) {
    const opts = (vm.$options = Object.create(vm.constructor.options));
    // doing this because it's faster than dynamic enumeration.
    const parentVnode = options._parentVnode;
    opts.parent = options.parent;
    opts._parentVnode = parentVnode;
    const vnodeComponentOptions = parentVnode.componentOptions;
    opts.propsData = vnodeComponentOptions.propsData;
    opts._parentListeners = vnodeComponentOptions.listeners;
    opts._renderChildren = vnodeComponentOptions.children;
    opts._componentTag = vnodeComponentOptions.tag;
    if (options.render) {
        opts.render = options.render;
        opts.staticRenderFns = options.staticRenderFns;
    }
}
function resolveConstructorOptions(Ctor) {
    let options = Ctor.options;
    if (Ctor.super) {
        const superOptions = resolveConstructorOptions(Ctor.super);
        const cachedSuperOptions = Ctor.superOptions;
        if (superOptions !== cachedSuperOptions) {
            // super option changed,
            // need to resolve new options.
            Ctor.superOptions = superOptions;
            // check if there are any late-modified/attached options (#4976)
            const modifiedOptions = resolveModifiedOptions(Ctor);
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
    return options;
}
function resolveModifiedOptions(Ctor) {
    let modified;
    const latest = Ctor.options;
    const sealed = Ctor.sealedOptions;
    for (const key in latest) {
        if (latest[key] !== sealed[key]) {
            if (!modified)
                modified = {};
            modified[key] = latest[key];
        }
    }
    return modified;
}

function FunctionalRenderContext(data, props, children, parent, Ctor) {
    const options = Ctor.options;
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    let contextVm;
    if (hasOwn(parent, '_uid')) {
        contextVm = Object.create(parent);
        contextVm._original = parent;
    }
    else {
        // the context vm passed in is a functional context as well.
        // in this case we want to make sure we are able to get a hold to the
        // real context instance.
        contextVm = parent;
        // @ts-ignore
        parent = parent._original;
    }
    const isCompiled = isTrue(options._compiled);
    const needNormalization = !isCompiled;
    this.data = data;
    this.props = props;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = () => {
        if (!this.$slots) {
            normalizeScopedSlots(parent, data.scopedSlots, (this.$slots = resolveSlots(children, parent)));
        }
        return this.$slots;
    };
    Object.defineProperty(this, 'scopedSlots', {
        enumerable: true,
        get() {
            return normalizeScopedSlots(parent, data.scopedSlots, this.slots());
        }
    });
    // support for compiled functional template
    if (isCompiled) {
        // exposing $options for renderStatic()
        this.$options = options;
        // pre-resolve slots for renderSlot()
        this.$slots = this.slots();
        this.$scopedSlots = normalizeScopedSlots(parent, data.scopedSlots, this.$slots);
    }
    if (options._scopeId) {
        this._c = (a, b, c, d) => {
            const vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
            if (vnode && !isArray(vnode)) {
                vnode.fnScopeId = options._scopeId;
                vnode.fnContext = parent;
            }
            return vnode;
        };
    }
    else {
        this._c = (a, b, c, d) => createElement$1(contextVm, a, b, c, d, needNormalization);
    }
}
installRenderHelpers(FunctionalRenderContext.prototype);
function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
    const options = Ctor.options;
    const props = {};
    const propOptions = options.props;
    if (isDef(propOptions)) {
        for (const key in propOptions) {
            props[key] = validateProp(key, propOptions, propsData || emptyObject);
        }
    }
    else {
        if (isDef(data.attrs))
            mergeProps(props, data.attrs);
        if (isDef(data.props))
            mergeProps(props, data.props);
    }
    const renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
    const vnode = options.render.call(null, renderContext._c, renderContext);
    if (vnode instanceof VNode) {
        return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
    }
    else if (isArray(vnode)) {
        const vnodes = normalizeChildren(vnode) || [];
        const res = new Array(vnodes.length);
        for (let i = 0; i < vnodes.length; i++) {
            res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
        }
        return res;
    }
}
function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
    // #7817 clone node before setting fnContext, otherwise if the node is reused
    // (e.g. it was from a cached normal slot) the fnContext causes named slots
    // that should not be matched to match.
    const clone = cloneVNode(vnode);
    clone.fnContext = contextVm;
    clone.fnOptions = options;
    {
        (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext =
            renderContext;
    }
    if (data.slot) {
        (clone.data || (clone.data = {})).slot = data.slot;
    }
    return clone;
}
function mergeProps(to, from) {
    for (const key in from) {
        to[camelize(key)] = from[key];
    }
}

function getComponentName(options) {
    return options.name || options.__name || options._componentTag;
}
// inline hooks to be invoked on component VNodes during patch
const componentVNodeHooks = {
    init(vnode, hydrating) {
        if (vnode.componentInstance &&
            !vnode.componentInstance._isDestroyed &&
            vnode.data.keepAlive) {
            // kept-alive components, treat as a patch
            const mountedNode = vnode; // work around flow
            componentVNodeHooks.prepatch(mountedNode, mountedNode);
        }
        else {
            const child = (vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance));
            child.$mount(hydrating ? vnode.elm : undefined, hydrating);
        }
    },
    prepatch(oldVnode, vnode) {
        const options = vnode.componentOptions;
        const child = (vnode.componentInstance = oldVnode.componentInstance);
        updateChildComponent(child, options.propsData, // updated props
        options.listeners, // updated listeners
        vnode, // new parent vnode
        options.children // new children
        );
    },
    insert(vnode) {
        const { context, componentInstance } = vnode;
        if (!componentInstance._isMounted) {
            componentInstance._isMounted = true;
            callHook$1(componentInstance, 'mounted');
        }
        if (vnode.data.keepAlive) {
            if (context._isMounted) {
                // vue-router#1212
                // During updates, a kept-alive component's child components may
                // change, so directly walking the tree here may call activated hooks
                // on incorrect children. Instead we push them into a queue which will
                // be processed after the whole patch process ended.
                queueActivatedComponent(componentInstance);
            }
            else {
                activateChildComponent(componentInstance, true /* direct */);
            }
        }
    },
    destroy(vnode) {
        const { componentInstance } = vnode;
        if (!componentInstance._isDestroyed) {
            if (!vnode.data.keepAlive) {
                componentInstance.$destroy();
            }
            else {
                deactivateChildComponent(componentInstance, true /* direct */);
            }
        }
    }
};
const hooksToMerge = Object.keys(componentVNodeHooks);
function createComponent(Ctor, data, context, children, tag) {
    if (isUndef(Ctor)) {
        return;
    }
    const baseCtor = context.$options._base;
    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
        Ctor = baseCtor.extend(Ctor);
    }
    // if at this stage it's not a constructor or an async component factory,
    // reject.
    if (typeof Ctor !== 'function') {
        {
            warn$2(`Invalid Component definition: ${String(Ctor)}`, context);
        }
        return;
    }
    // async component
    let asyncFactory;
    // @ts-expect-error
    if (isUndef(Ctor.cid)) {
        asyncFactory = Ctor;
        Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
        if (Ctor === undefined) {
            // return a placeholder node for async component, which is rendered
            // as a comment node but preserves all the raw information for the node.
            // the information will be used for async server-rendering and hydration.
            return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
        }
    }
    data = data || {};
    // resolve constructor options in case global mixins are applied after
    // component constructor creation
    resolveConstructorOptions(Ctor);
    // transform component v-model data into props & events
    if (isDef(data.model)) {
        // @ts-expect-error
        transformModel(Ctor.options, data);
    }
    // extract props
    // @ts-expect-error
    const propsData = extractPropsFromVNodeData(data, Ctor, tag);
    // functional component
    // @ts-expect-error
    if (isTrue(Ctor.options.functional)) {
        return createFunctionalComponent(Ctor, propsData, data, context, children);
    }
    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    const listeners = data.on;
    // replace with listeners with .native modifier
    // so it gets processed during parent component patch.
    data.on = data.nativeOn;
    // @ts-expect-error
    if (isTrue(Ctor.options.abstract)) {
        // abstract components do not keep anything
        // other than props & listeners & slot
        // work around flow
        const slot = data.slot;
        data = {};
        if (slot) {
            data.slot = slot;
        }
    }
    // install component management hooks onto the placeholder node
    installComponentHooks(data);
    // return a placeholder vnode
    // @ts-expect-error
    const name = getComponentName(Ctor.options) || tag;
    const vnode = new VNode(
    // @ts-expect-error
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`, data, undefined, undefined, undefined, context, 
    // @ts-expect-error
    { Ctor, propsData, listeners, tag, children }, asyncFactory);
    return vnode;
}
function createComponentInstanceForVnode(
// we know it's MountedComponentVNode but flow doesn't
vnode, 
// activeInstance in lifecycle state
parent) {
    const options = {
        _isComponent: true,
        _parentVnode: vnode,
        parent
    };
    // check inline-template render functions
    const inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
        options.render = inlineTemplate.render;
        options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnode.componentOptions.Ctor(options);
}
function installComponentHooks(data) {
    const hooks = data.hook || (data.hook = {});
    for (let i = 0; i < hooksToMerge.length; i++) {
        const key = hooksToMerge[i];
        const existing = hooks[key];
        const toMerge = componentVNodeHooks[key];
        // @ts-expect-error
        if (existing !== toMerge && !(existing && existing._merged)) {
            hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge;
        }
    }
}
function mergeHook(f1, f2) {
    const merged = (a, b) => {
        // flow complains about extra args which is why we use any
        f1(a, b);
        f2(a, b);
    };
    merged._merged = true;
    return merged;
}
// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel(options, data) {
    const prop = (options.model && options.model.prop) || 'value';
    const event = (options.model && options.model.event) || 'input';
    (data.attrs || (data.attrs = {}))[prop] = data.model.value;
    const on = data.on || (data.on = {});
    const existing = on[event];
    const callback = data.model.callback;
    if (isDef(existing)) {
        if (isArray(existing)
            ? existing.indexOf(callback) === -1
            : existing !== callback) {
            on[event] = [callback].concat(existing);
        }
    }
    else {
        on[event] = callback;
    }
}

let warn$2 = noop;
let tip = noop;
let generateComponentTrace; // work around flow check
let formatComponentName;
{
    const hasConsole = typeof console !== 'undefined';
    const classifyRE = /(?:^|[-_])(\w)/g;
    const classify = str => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
    warn$2 = (msg, vm = currentInstance) => {
        const trace = vm ? generateComponentTrace(vm) : '';
        if (config.warnHandler) {
            config.warnHandler.call(null, msg, vm, trace);
        }
        else if (hasConsole && !config.silent) {
            console.error(`[Vue warn]: ${msg}${trace}`);
        }
    };
    tip = (msg, vm) => {
        if (hasConsole && !config.silent) {
            console.warn(`[Vue tip]: ${msg}` + (vm ? generateComponentTrace(vm) : ''));
        }
    };
    formatComponentName = (vm, includeFile) => {
        if (vm.$root === vm) {
            return '<Root>';
        }
        const options = isFunction(vm) && vm.cid != null
            ? vm.options
            : vm._isVue
                ? vm.$options || vm.constructor.options
                : vm;
        let name = getComponentName(options);
        const file = options.__file;
        if (!name && file) {
            const match = file.match(/([^/\\]+)\.vue$/);
            name = match && match[1];
        }
        return ((name ? `<${classify(name)}>` : `<Anonymous>`) +
            (file && includeFile !== false ? ` at ${file}` : ''));
    };
    const repeat = (str, n) => {
        let res = '';
        while (n) {
            if (n % 2 === 1)
                res += str;
            if (n > 1)
                str += str;
            n >>= 1;
        }
        return res;
    };
    generateComponentTrace = (vm) => {
        if (vm._isVue && vm.$parent) {
            const tree = [];
            let currentRecursiveSequence = 0;
            while (vm) {
                if (tree.length > 0) {
                    const last = tree[tree.length - 1];
                    if (last.constructor === vm.constructor) {
                        currentRecursiveSequence++;
                        vm = vm.$parent;
                        continue;
                    }
                    else if (currentRecursiveSequence > 0) {
                        tree[tree.length - 1] = [last, currentRecursiveSequence];
                        currentRecursiveSequence = 0;
                    }
                }
                tree.push(vm);
                vm = vm.$parent;
            }
            return ('\n\nfound in\n\n' +
                tree
                    .map((vm, i) => `${i === 0 ? '---> ' : repeat(' ', 5 + i * 2)}${isArray(vm)
                    ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)`
                    : formatComponentName(vm)}`)
                    .join('\n'));
        }
        else {
            return `\n\n(found in ${formatComponentName(vm)})`;
        }
    };
}

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
const strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */
{
    strats.el = strats.propsData = function (parent, child, vm, key) {
        if (!vm) {
            warn$2(`option "${key}" can only be used during instance ` +
                'creation with the `new` keyword.');
        }
        return defaultStrat(parent, child);
    };
}
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to, from, recursive = true) {
    if (!from)
        return to;
    let key, toVal, fromVal;
    const keys = hasSymbol
        ? Reflect.ownKeys(from)
        : Object.keys(from);
    for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        // in case the object is already observed...
        if (key === '__ob__')
            continue;
        toVal = to[key];
        fromVal = from[key];
        if (!recursive || !hasOwn(to, key)) {
            set(to, key, fromVal);
        }
        else if (toVal !== fromVal &&
            isPlainObject(toVal) &&
            isPlainObject(fromVal)) {
            mergeData(toVal, fromVal);
        }
    }
    return to;
}
/**
 * Data
 */
function mergeDataOrFn(parentVal, childVal, vm) {
    if (!vm) {
        // in a Vue.extend merge, both should be functions
        if (!childVal) {
            return parentVal;
        }
        if (!parentVal) {
            return childVal;
        }
        // when parentVal & childVal are both present,
        // we need to return a function that returns the
        // merged result of both functions... no need to
        // check if parentVal is a function here because
        // it has to be a function to pass previous merges.
        return function mergedDataFn() {
            return mergeData(isFunction(childVal) ? childVal.call(this, this) : childVal, isFunction(parentVal) ? parentVal.call(this, this) : parentVal);
        };
    }
    else {
        return function mergedInstanceDataFn() {
            // instance merge
            const instanceData = isFunction(childVal)
                ? childVal.call(vm, vm)
                : childVal;
            const defaultData = isFunction(parentVal)
                ? parentVal.call(vm, vm)
                : parentVal;
            if (instanceData) {
                return mergeData(instanceData, defaultData);
            }
            else {
                return defaultData;
            }
        };
    }
}
strats.data = function (parentVal, childVal, vm) {
    if (!vm) {
        if (childVal && typeof childVal !== 'function') {
            warn$2('The "data" option should be a function ' +
                    'that returns a per-instance value in component ' +
                    'definitions.', vm);
            return parentVal;
        }
        return mergeDataOrFn(parentVal, childVal);
    }
    return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */
function mergeLifecycleHook(parentVal, childVal) {
    const res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
    const res = [];
    for (let i = 0; i < hooks.length; i++) {
        if (res.indexOf(hooks[i]) === -1) {
            res.push(hooks[i]);
        }
    }
    return res;
}
LIFECYCLE_HOOKS.forEach(hook => {
    strats[hook] = mergeLifecycleHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(parentVal, childVal, vm, key) {
    const res = Object.create(parentVal || null);
    if (childVal) {
        assertObjectType(key, childVal, vm);
        return extend(res, childVal);
    }
    else {
        return res;
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
strats.watch = function (parentVal, childVal, vm, key) {
    // work around Firefox's Object.prototype.watch...
    //@ts-expect-error work around
    if (parentVal === nativeWatch)
        parentVal = undefined;
    //@ts-expect-error work around
    if (childVal === nativeWatch)
        childVal = undefined;
    /* istanbul ignore if */
    if (!childVal)
        return Object.create(parentVal || null);
    {
        assertObjectType(key, childVal, vm);
    }
    if (!parentVal)
        return childVal;
    const ret = {};
    extend(ret, parentVal);
    for (const key in childVal) {
        let parent = ret[key];
        const child = childVal[key];
        if (parent && !isArray(parent)) {
            parent = [parent];
        }
        ret[key] = parent ? parent.concat(child) : isArray(child) ? child : [child];
    }
    return ret;
};
/**
 * Other object hashes.
 */
strats.props =
    strats.methods =
        strats.inject =
            strats.computed =
                function (parentVal, childVal, vm, key) {
                    if (childVal && true) {
                        assertObjectType(key, childVal, vm);
                    }
                    if (!parentVal)
                        return childVal;
                    const ret = Object.create(null);
                    extend(ret, parentVal);
                    if (childVal)
                        extend(ret, childVal);
                    return ret;
                };
strats.provide = function (parentVal, childVal) {
    if (!parentVal)
        return childVal;
    return function () {
        const ret = Object.create(null);
        mergeData(ret, isFunction(parentVal) ? parentVal.call(this) : parentVal);
        if (childVal) {
            mergeData(ret, isFunction(childVal) ? childVal.call(this) : childVal, false // non-recursive
            );
        }
        return ret;
    };
};
/**
 * Default strategy.
 */
const defaultStrat = function (parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */
function checkComponents(options) {
    for (const key in options.components) {
        validateComponentName(key);
    }
}
function validateComponentName(name) {
    if (!new RegExp(`^[a-zA-Z][\\-\\.0-9_${unicodeRegExp.source}]*$`).test(name)) {
        warn$2('Invalid component name: "' +
            name +
            '". Component names ' +
            'should conform to valid custom element name in html5 specification.');
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
        warn$2('Do not use built-in or reserved HTML elements as component ' +
            'id: ' +
            name);
    }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options, vm) {
    const props = options.props;
    if (!props)
        return;
    const res = {};
    let i, val, name;
    if (isArray(props)) {
        i = props.length;
        while (i--) {
            val = props[i];
            if (typeof val === 'string') {
                name = camelize(val);
                res[name] = { type: null };
            }
            else {
                warn$2('props must be strings when using array syntax.');
            }
        }
    }
    else if (isPlainObject(props)) {
        for (const key in props) {
            val = props[key];
            name = camelize(key);
            res[name] = isPlainObject(val) ? val : { type: val };
        }
    }
    else {
        warn$2(`Invalid value for option "props": expected an Array or an Object, ` +
            `but got ${toRawType(props)}.`, vm);
    }
    options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */
function normalizeInject(options, vm) {
    const inject = options.inject;
    if (!inject)
        return;
    const normalized = (options.inject = {});
    if (isArray(inject)) {
        for (let i = 0; i < inject.length; i++) {
            normalized[inject[i]] = { from: inject[i] };
        }
    }
    else if (isPlainObject(inject)) {
        for (const key in inject) {
            const val = inject[key];
            normalized[key] = isPlainObject(val)
                ? extend({ from: key }, val)
                : { from: val };
        }
    }
    else {
        warn$2(`Invalid value for option "inject": expected an Array or an Object, ` +
            `but got ${toRawType(inject)}.`, vm);
    }
}
/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives$1(options) {
    const dirs = options.directives;
    if (dirs) {
        for (const key in dirs) {
            const def = dirs[key];
            if (isFunction(def)) {
                dirs[key] = { bind: def, update: def };
            }
        }
    }
}
function assertObjectType(name, value, vm) {
    if (!isPlainObject(value)) {
        warn$2(`Invalid value for option "${name}": expected an Object, ` +
            `but got ${toRawType(value)}.`, vm);
    }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions(parent, child, vm) {
    {
        checkComponents(child);
    }
    if (isFunction(child)) {
        // @ts-expect-error
        child = child.options;
    }
    normalizeProps(child, vm);
    normalizeInject(child, vm);
    normalizeDirectives$1(child);
    // Apply extends and mixins on the child options,
    // but only if it is a raw options object that isn't
    // the result of another mergeOptions call.
    // Only merged options has the _base property.
    if (!child._base) {
        if (child.extends) {
            parent = mergeOptions(parent, child.extends, vm);
        }
        if (child.mixins) {
            for (let i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm);
            }
        }
    }
    const options = {};
    let key;
    for (key in parent) {
        mergeField(key);
    }
    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeField(key);
        }
    }
    function mergeField(key) {
        const strat = strats[key] || defaultStrat;
        options[key] = strat(parent[key], child[key], vm, key);
    }
    return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset(options, type, id, warnMissing) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
        return;
    }
    const assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id))
        return assets[id];
    const camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId))
        return assets[camelizedId];
    const PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId))
        return assets[PascalCaseId];
    // fallback to prototype chain
    const res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (warnMissing && !res) {
        warn$2('Failed to resolve ' + type.slice(0, -1) + ': ' + id);
    }
    return res;
}

function validateProp(key, propOptions, propsData, vm) {
    const prop = propOptions[key];
    const absent = !hasOwn(propsData, key);
    let value = propsData[key];
    // boolean casting
    const booleanIndex = getTypeIndex(Boolean, prop.type);
    if (booleanIndex > -1) {
        if (absent && !hasOwn(prop, 'default')) {
            value = false;
        }
        else if (value === '' || value === hyphenate(key)) {
            // only cast empty string / same name to boolean if
            // boolean has higher priority
            const stringIndex = getTypeIndex(String, prop.type);
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
        const prevShouldObserve = shouldObserve;
        toggleObserving(true);
        observe(value);
        toggleObserving(prevShouldObserve);
    }
    {
        assertProp(prop, key, value, vm, absent);
    }
    return value;
}
/**
 * Get the default value of a prop.
 */
function getPropDefaultValue(vm, prop, key) {
    // no default, return undefined
    if (!hasOwn(prop, 'default')) {
        return undefined;
    }
    const def = prop.default;
    // warn against non-factory defaults for Object & Array
    if (isObject(def)) {
        warn$2('Invalid default value for prop "' +
            key +
            '": ' +
            'Props with type Object/Array must use a factory function ' +
            'to return the default value.', vm);
    }
    // the raw prop value was also undefined from previous render,
    // return previous default value to avoid unnecessary watcher trigger
    if (vm &&
        vm.$options.propsData &&
        vm.$options.propsData[key] === undefined &&
        vm._props[key] !== undefined) {
        return vm._props[key];
    }
    // call factory function for non-Function types
    // a value is Function if its prototype is function even across different execution context
    return isFunction(def) && getType(prop.type) !== 'Function'
        ? def.call(vm)
        : def;
}
/**
 * Assert whether a prop is valid.
 */
function assertProp(prop, name, value, vm, absent) {
    if (prop.required && absent) {
        warn$2('Missing required prop: "' + name + '"', vm);
        return;
    }
    if (value == null && !prop.required) {
        return;
    }
    let type = prop.type;
    let valid = !type || type === true;
    const expectedTypes = [];
    if (type) {
        if (!isArray(type)) {
            type = [type];
        }
        for (let i = 0; i < type.length && !valid; i++) {
            const assertedType = assertType(value, type[i], vm);
            expectedTypes.push(assertedType.expectedType || '');
            valid = assertedType.valid;
        }
    }
    const haveExpectedTypes = expectedTypes.some(t => t);
    if (!valid && haveExpectedTypes) {
        warn$2(getInvalidTypeMessage(name, value, expectedTypes), vm);
        return;
    }
    const validator = prop.validator;
    if (validator) {
        if (!validator(value)) {
            warn$2('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
        }
    }
}
const simpleCheckRE = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
function assertType(value, type, vm) {
    let valid;
    const expectedType = getType(type);
    if (simpleCheckRE.test(expectedType)) {
        const t = typeof value;
        valid = t === expectedType.toLowerCase();
        // for primitive wrapper objects
        if (!valid && t === 'object') {
            valid = value instanceof type;
        }
    }
    else if (expectedType === 'Object') {
        valid = isPlainObject(value);
    }
    else if (expectedType === 'Array') {
        valid = isArray(value);
    }
    else {
        try {
            valid = value instanceof type;
        }
        catch (e) {
            warn$2('Invalid prop type: "' + String(type) + '" is not a constructor', vm);
            valid = false;
        }
    }
    return {
        valid,
        expectedType
    };
}
const functionTypeCheckRE = /^\s*function (\w+)/;
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
    const match = fn && fn.toString().match(functionTypeCheckRE);
    return match ? match[1] : '';
}
function isSameType(a, b) {
    return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
    if (!isArray(expectedTypes)) {
        return isSameType(expectedTypes, type) ? 0 : -1;
    }
    for (let i = 0, len = expectedTypes.length; i < len; i++) {
        if (isSameType(expectedTypes[i], type)) {
            return i;
        }
    }
    return -1;
}
function getInvalidTypeMessage(name, value, expectedTypes) {
    let message = `Invalid prop: type check failed for prop "${name}".` +
        ` Expected ${expectedTypes.map(capitalize).join(', ')}`;
    const expectedType = expectedTypes[0];
    const receivedType = toRawType(value);
    // check if we need to specify expected value
    if (expectedTypes.length === 1 &&
        isExplicable(expectedType) &&
        isExplicable(typeof value) &&
        !isBoolean(expectedType, receivedType)) {
        message += ` with value ${styleValue(value, expectedType)}`;
    }
    message += `, got ${receivedType} `;
    // check if we need to specify received value
    if (isExplicable(receivedType)) {
        message += `with value ${styleValue(value, receivedType)}.`;
    }
    return message;
}
function styleValue(value, type) {
    if (type === 'String') {
        return `"${value}"`;
    }
    else if (type === 'Number') {
        return `${Number(value)}`;
    }
    else {
        return `${value}`;
    }
}
const EXPLICABLE_TYPES = ['string', 'number', 'boolean'];
function isExplicable(value) {
    return EXPLICABLE_TYPES.some(elem => value.toLowerCase() === elem);
}
function isBoolean(...args) {
    return args.some(elem => elem.toLowerCase() === 'boolean');
}

function Vue(options) {
    if (!(this instanceof Vue)) {
        warn$2('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
}
//@ts-expect-error Vue has function type
initMixin$1(Vue);
//@ts-expect-error Vue has function type
stateMixin(Vue);
//@ts-expect-error Vue has function type
eventsMixin(Vue);
//@ts-expect-error Vue has function type
lifecycleMixin(Vue);
//@ts-expect-error Vue has function type
renderMixin(Vue);

function initUse(Vue) {
    Vue.use = function (plugin) {
        const installedPlugins = this._installedPlugins || (this._installedPlugins = []);
        if (installedPlugins.indexOf(plugin) > -1) {
            return this;
        }
        // additional parameters
        const args = toArray(arguments, 1);
        args.unshift(this);
        if (isFunction(plugin.install)) {
            plugin.install.apply(plugin, args);
        }
        else if (isFunction(plugin)) {
            plugin.apply(null, args);
        }
        installedPlugins.push(plugin);
        return this;
    };
}

function initMixin(Vue) {
    Vue.mixin = function (mixin) {
        this.options = mergeOptions(this.options, mixin);
        return this;
    };
}

function initExtend(Vue) {
    /**
     * Each instance constructor, including Vue, has a unique
     * cid. This enables us to create wrapped "child
     * constructors" for prototypal inheritance and cache them.
     */
    Vue.cid = 0;
    let cid = 1;
    /**
     * Class inheritance
     */
    Vue.extend = function (extendOptions) {
        extendOptions = extendOptions || {};
        const Super = this;
        const SuperId = Super.cid;
        const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
        if (cachedCtors[SuperId]) {
            return cachedCtors[SuperId];
        }
        const name = getComponentName(extendOptions) || getComponentName(Super.options);
        if (name) {
            validateComponentName(name);
        }
        const Sub = function VueComponent(options) {
            this._init(options);
        };
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.cid = cid++;
        Sub.options = mergeOptions(Super.options, extendOptions);
        Sub['super'] = Super;
        // For props and computed properties, we define the proxy getters on
        // the Vue instances at extension time, on the extended prototype. This
        // avoids Object.defineProperty calls for each instance created.
        if (Sub.options.props) {
            initProps(Sub);
        }
        if (Sub.options.computed) {
            initComputed(Sub);
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
        return Sub;
    };
}
function initProps(Comp) {
    const props = Comp.options.props;
    for (const key in props) {
        proxy(Comp.prototype, `_props`, key);
    }
}
function initComputed(Comp) {
    const computed = Comp.options.computed;
    for (const key in computed) {
        defineComputed(Comp.prototype, key, computed[key]);
    }
}

function initAssetRegisters(Vue) {
    /**
     * Create asset registration methods.
     */
    ASSET_TYPES.forEach(type => {
        // @ts-expect-error function is not exact same type
        Vue[type] = function (id, definition) {
            if (!definition) {
                return this.options[type + 's'][id];
            }
            else {
                /* istanbul ignore if */
                if (type === 'component') {
                    validateComponentName(id);
                }
                if (type === 'component' && isPlainObject(definition)) {
                    // @ts-expect-error
                    definition.name = definition.name || id;
                    definition = this.options._base.extend(definition);
                }
                if (type === 'directive' && isFunction(definition)) {
                    definition = { bind: definition, update: definition };
                }
                this.options[type + 's'][id] = definition;
                return definition;
            }
        };
    });
}

function _getComponentName(opts) {
    return opts && (getComponentName(opts.Ctor.options) || opts.tag);
}
function matches(pattern, name) {
    if (isArray(pattern)) {
        return pattern.indexOf(name) > -1;
    }
    else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(name) > -1;
    }
    else if (isRegExp(pattern)) {
        return pattern.test(name);
    }
    /* istanbul ignore next */
    return false;
}
function pruneCache(keepAliveInstance, filter) {
    const { cache, keys, _vnode } = keepAliveInstance;
    for (const key in cache) {
        const entry = cache[key];
        if (entry) {
            const name = entry.name;
            if (name && !filter(name)) {
                pruneCacheEntry(cache, key, keys, _vnode);
            }
        }
    }
}
function pruneCacheEntry(cache, key, keys, current) {
    const entry = cache[key];
    if (entry && (!current || entry.tag !== current.tag)) {
        // @ts-expect-error can be undefined
        entry.componentInstance.$destroy();
    }
    cache[key] = null;
    remove$2(keys, key);
}
const patternTypes = [String, RegExp, Array];
// TODO defineComponent
var KeepAlive = {
    name: 'keep-alive',
    abstract: true,
    props: {
        include: patternTypes,
        exclude: patternTypes,
        max: [String, Number]
    },
    methods: {
        cacheVNode() {
            const { cache, keys, vnodeToCache, keyToCache } = this;
            if (vnodeToCache) {
                const { tag, componentInstance, componentOptions } = vnodeToCache;
                cache[keyToCache] = {
                    name: _getComponentName(componentOptions),
                    tag,
                    componentInstance
                };
                keys.push(keyToCache);
                // prune oldest entry
                if (this.max && keys.length > parseInt(this.max)) {
                    pruneCacheEntry(cache, keys[0], keys, this._vnode);
                }
                this.vnodeToCache = null;
            }
        }
    },
    created() {
        this.cache = Object.create(null);
        this.keys = [];
    },
    destroyed() {
        for (const key in this.cache) {
            pruneCacheEntry(this.cache, key, this.keys);
        }
    },
    mounted() {
        this.cacheVNode();
        this.$watch('include', val => {
            pruneCache(this, name => matches(val, name));
        });
        this.$watch('exclude', val => {
            pruneCache(this, name => !matches(val, name));
        });
    },
    updated() {
        this.cacheVNode();
    },
    render() {
        const slot = this.$slots.default;
        const vnode = getFirstComponentChild(slot);
        const componentOptions = vnode && vnode.componentOptions;
        if (componentOptions) {
            // check pattern
            const name = _getComponentName(componentOptions);
            const { include, exclude } = this;
            if (
            // not included
            (include && (!name || !matches(include, name))) ||
                // excluded
                (exclude && name && matches(exclude, name))) {
                return vnode;
            }
            const { cache, keys } = this;
            const key = vnode.key == null
                ? // same constructor may get registered as different local components
                    // so cid alone is not enough (#3269)
                    componentOptions.Ctor.cid +
                        (componentOptions.tag ? `::${componentOptions.tag}` : '')
                : vnode.key;
            if (cache[key]) {
                vnode.componentInstance = cache[key].componentInstance;
                // make current key freshest
                remove$2(keys, key);
                keys.push(key);
            }
            else {
                // delay setting the cache until update
                this.vnodeToCache = vnode;
                this.keyToCache = key;
            }
            // @ts-expect-error can vnode.data can be undefined
            vnode.data.keepAlive = true;
        }
        return vnode || (slot && slot[0]);
    }
};

var builtInComponents = {
    KeepAlive
};

function initGlobalAPI(Vue) {
    // config
    const configDef = {};
    configDef.get = () => config;
    {
        configDef.set = () => {
            warn$2('Do not replace the Vue.config object, set individual fields instead.');
        };
    }
    Object.defineProperty(Vue, 'config', configDef);
    // exposed util methods.
    // NOTE: these are not considered part of the public API - avoid relying on
    // them unless you are aware of the risk.
    Vue.util = {
        warn: warn$2,
        extend,
        mergeOptions,
        defineReactive
    };
    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;
    // 2.6 explicit observable API
    Vue.observable = (obj) => {
        observe(obj);
        return obj;
    };
    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(type => {
        Vue.options[type + 's'] = Object.create(null);
    });
    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue;
    extend(Vue.options.components, builtInComponents);
    initUse(Vue);
    initMixin(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
    get() {
        /* istanbul ignore next */
        return this.$vnode && this.$vnode.ssrContext;
    }
});
// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
    value: FunctionalRenderContext
});
Vue.version = version;

// these are reserved for web because they are directly compiled away
// during template compilation
const isReservedAttr = makeMap('style,class');
// attributes that should be using props for binding
const acceptValue = makeMap('input,textarea,option,select,progress');
const mustUseProp = (tag, type, attr) => {
    return ((attr === 'value' && acceptValue(tag) && type !== 'button') ||
        (attr === 'selected' && tag === 'option') ||
        (attr === 'checked' && tag === 'input') ||
        (attr === 'muted' && tag === 'video'));
};
const isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
const isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');
const convertEnumeratedValue = (key, value) => {
    return isFalsyAttrValue(value) || value === 'false'
        ? 'false'
        : // allow arbitrary string value for contenteditable
            key === 'contenteditable' && isValidContentEditableValue(value)
                ? value
                : 'true';
};
const isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
    'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
    'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
    'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
    'required,reversed,scoped,seamless,selected,sortable,' +
    'truespeed,typemustmatch,visible');
const xlinkNS = 'http://www.w3.org/1999/xlink';
const isXlink = (name) => {
    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};
const getXlinkProp = (name) => {
    return isXlink(name) ? name.slice(6, name.length) : '';
};
const isFalsyAttrValue = (val) => {
    return val == null || val === false;
};

function genClassForVnode(vnode) {
    let data = vnode.data;
    let parentNode = vnode;
    let childNode = vnode;
    while (isDef(childNode.componentInstance)) {
        childNode = childNode.componentInstance._vnode;
        if (childNode && childNode.data) {
            data = mergeClassData(childNode.data, data);
        }
    }
    // @ts-expect-error parentNode.parent not VNodeWithData
    while (isDef((parentNode = parentNode.parent))) {
        if (parentNode && parentNode.data) {
            data = mergeClassData(data, parentNode.data);
        }
    }
    return renderClass(data.staticClass, data.class);
}
function mergeClassData(child, parent) {
    return {
        staticClass: concat(child.staticClass, parent.staticClass),
        class: isDef(child.class) ? [child.class, parent.class] : parent.class
    };
}
function renderClass(staticClass, dynamicClass) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
        return concat(staticClass, stringifyClass(dynamicClass));
    }
    /* istanbul ignore next */
    return '';
}
function concat(a, b) {
    return a ? (b ? a + ' ' + b : a) : b || '';
}
function stringifyClass(value) {
    if (Array.isArray(value)) {
        return stringifyArray(value);
    }
    if (isObject(value)) {
        return stringifyObject(value);
    }
    if (typeof value === 'string') {
        return value;
    }
    /* istanbul ignore next */
    return '';
}
function stringifyArray(value) {
    let res = '';
    let stringified;
    for (let i = 0, l = value.length; i < l; i++) {
        if (isDef((stringified = stringifyClass(value[i]))) && stringified !== '') {
            if (res)
                res += ' ';
            res += stringified;
        }
    }
    return res;
}
function stringifyObject(value) {
    let res = '';
    for (const key in value) {
        if (value[key]) {
            if (res)
                res += ' ';
            res += key;
        }
    }
    return res;
}

const namespaceMap = {
    svg: 'http://www.w3.org/2000/svg',
    math: 'http://www.w3.org/1998/Math/MathML'
};
const isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot');
// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
const isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);
const isPreTag = (tag) => tag === 'pre';
const isReservedTag = (tag) => {
    return isHTMLTag(tag) || isSVG(tag);
};
function getTagNamespace(tag) {
    if (isSVG(tag)) {
        return 'svg';
    }
    // basic support for MathML
    // note it doesn't support other MathML elements being component roots
    if (tag === 'math') {
        return 'math';
    }
}
const unknownElementCache = Object.create(null);
function isUnknownElement(tag) {
    /* istanbul ignore if */
    if (!inBrowser) {
        return true;
    }
    if (isReservedTag(tag)) {
        return false;
    }
    tag = tag.toLowerCase();
    /* istanbul ignore if */
    if (unknownElementCache[tag] != null) {
        return unknownElementCache[tag];
    }
    const el = document.createElement(tag);
    if (tag.indexOf('-') > -1) {
        // http://stackoverflow.com/a/28210364/1070244
        return (unknownElementCache[tag] =
            el.constructor === window.HTMLUnknownElement ||
                el.constructor === window.HTMLElement);
    }
    else {
        return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()));
    }
}
const isTextInputType = makeMap('text,number,password,search,email,tel,url');

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
    if (typeof el === 'string') {
        const selected = document.querySelector(el);
        if (!selected) {
            warn$2('Cannot find element: ' + el);
            return document.createElement('div');
        }
        return selected;
    }
    else {
        return el;
    }
}

function createElement(tagName, vnode) {
    const elm = document.createElement(tagName);
    if (tagName !== 'select') {
        return elm;
    }
    // false or null will remove the attribute but undefined will not
    if (vnode.data &&
        vnode.data.attrs &&
        vnode.data.attrs.multiple !== undefined) {
        elm.setAttribute('multiple', 'multiple');
    }
    return elm;
}
function createElementNS(namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(node) {
    return node.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function setStyleScope(node, scopeId) {
    node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createElement: createElement,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

var ref = {
    create(_, vnode) {
        registerRef(vnode);
    },
    update(oldVnode, vnode) {
        if (oldVnode.data.ref !== vnode.data.ref) {
            registerRef(oldVnode, true);
            registerRef(vnode);
        }
    },
    destroy(vnode) {
        registerRef(vnode, true);
    }
};
function registerRef(vnode, isRemoval) {
    const ref = vnode.data.ref;
    if (!isDef(ref))
        return;
    const vm = vnode.context;
    const refValue = vnode.componentInstance || vnode.elm;
    const value = isRemoval ? null : refValue;
    const $refsValue = isRemoval ? undefined : refValue;
    if (isFunction(ref)) {
        invokeWithErrorHandling(ref, vm, [value], vm, `template ref function`);
        return;
    }
    const isFor = vnode.data.refInFor;
    const _isString = typeof ref === 'string' || typeof ref === 'number';
    const _isRef = isRef(ref);
    const refs = vm.$refs;
    if (_isString || _isRef) {
        if (isFor) {
            const existing = _isString ? refs[ref] : ref.value;
            if (isRemoval) {
                isArray(existing) && remove$2(existing, refValue);
            }
            else {
                if (!isArray(existing)) {
                    if (_isString) {
                        refs[ref] = [refValue];
                        setSetupRef(vm, ref, refs[ref]);
                    }
                    else {
                        ref.value = [refValue];
                    }
                }
                else if (!existing.includes(refValue)) {
                    existing.push(refValue);
                }
            }
        }
        else if (_isString) {
            if (isRemoval && refs[ref] !== refValue) {
                return;
            }
            refs[ref] = $refsValue;
            setSetupRef(vm, ref, value);
        }
        else if (_isRef) {
            if (isRemoval && ref.value !== refValue) {
                return;
            }
            ref.value = value;
        }
        else {
            warn$2(`Invalid template ref type: ${typeof ref}`);
        }
    }
}
function setSetupRef({ _setupState }, key, val) {
    if (_setupState && hasOwn(_setupState, key)) {
        if (isRef(_setupState[key])) {
            _setupState[key].value = val;
        }
        else {
            _setupState[key] = val;
        }
    }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */
const emptyNode = new VNode('', {}, []);
const hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
function sameVnode(a, b) {
    return (a.key === b.key &&
        a.asyncFactory === b.asyncFactory &&
        ((a.tag === b.tag &&
            a.isComment === b.isComment &&
            isDef(a.data) === isDef(b.data) &&
            sameInputType(a, b)) ||
            (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error))));
}
function sameInputType(a, b) {
    if (a.tag !== 'input')
        return true;
    let i;
    const typeA = isDef((i = a.data)) && isDef((i = i.attrs)) && i.type;
    const typeB = isDef((i = b.data)) && isDef((i = i.attrs)) && i.type;
    return typeA === typeB || (isTextInputType(typeA) && isTextInputType(typeB));
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    let i, key;
    const map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key;
        if (isDef(key))
            map[key] = i;
    }
    return map;
}
function createPatchFunction(backend) {
    let i, j;
    const cbs = {};
    const { modules, nodeOps } = backend;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            if (isDef(modules[j][hooks[i]])) {
                cbs[hooks[i]].push(modules[j][hooks[i]]);
            }
        }
    }
    function emptyNodeAt(elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        function remove() {
            if (--remove.listeners === 0) {
                removeNode(childElm);
            }
        }
        remove.listeners = listeners;
        return remove;
    }
    function removeNode(el) {
        const parent = nodeOps.parentNode(el);
        // element may have already been removed due to v-html / v-text
        if (isDef(parent)) {
            nodeOps.removeChild(parent, el);
        }
    }
    function isUnknownElement(vnode, inVPre) {
        return (!inVPre &&
            !vnode.ns &&
            !(config.ignoredElements.length &&
                config.ignoredElements.some(ignore => {
                    return isRegExp(ignore)
                        ? ignore.test(vnode.tag)
                        : ignore === vnode.tag;
                })) &&
            config.isUnknownElement(vnode.tag));
    }
    let creatingElmInVPre = 0;
    function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
        if (isDef(vnode.elm) && isDef(ownerArray)) {
            // This vnode was used in a previous render!
            // now it's used as a new node, overwriting its elm would cause
            // potential patch errors down the road when it's used as an insertion
            // reference node. Instead, we clone the node on-demand before creating
            // associated DOM element for it.
            vnode = ownerArray[index] = cloneVNode(vnode);
        }
        vnode.isRootInsert = !nested; // for transition enter check
        if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
            return;
        }
        const data = vnode.data;
        const children = vnode.children;
        const tag = vnode.tag;
        if (isDef(tag)) {
            {
                if (data && data.pre) {
                    creatingElmInVPre++;
                }
                if (isUnknownElement(vnode, creatingElmInVPre)) {
                    warn$2('Unknown custom element: <' +
                        tag +
                        '> - did you ' +
                        'register the component correctly? For recursive components, ' +
                        'make sure to provide the "name" option.', vnode.context);
                }
            }
            vnode.elm = vnode.ns
                ? nodeOps.createElementNS(vnode.ns, tag)
                : nodeOps.createElement(tag, vnode);
            setScope(vnode);
            createChildren(vnode, children, insertedVnodeQueue);
            if (isDef(data)) {
                invokeCreateHooks(vnode, insertedVnodeQueue);
            }
            insert(parentElm, vnode.elm, refElm);
            if (data && data.pre) {
                creatingElmInVPre--;
            }
        }
        else if (isTrue(vnode.isComment)) {
            vnode.elm = nodeOps.createComment(vnode.text);
            insert(parentElm, vnode.elm, refElm);
        }
        else {
            vnode.elm = nodeOps.createTextNode(vnode.text);
            insert(parentElm, vnode.elm, refElm);
        }
    }
    function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
        let i = vnode.data;
        if (isDef(i)) {
            const isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
            if (isDef((i = i.hook)) && isDef((i = i.init))) {
                i(vnode, false /* hydrating */);
            }
            // after calling the init hook, if the vnode is a child component
            // it should've created a child instance and mounted it. the child
            // component also has set the placeholder vnode's elm.
            // in that case we can just return the element and be done.
            if (isDef(vnode.componentInstance)) {
                initComponent(vnode, insertedVnodeQueue);
                insert(parentElm, vnode.elm, refElm);
                if (isTrue(isReactivated)) {
                    reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
                }
                return true;
            }
        }
    }
    function initComponent(vnode, insertedVnodeQueue) {
        if (isDef(vnode.data.pendingInsert)) {
            insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
            vnode.data.pendingInsert = null;
        }
        vnode.elm = vnode.componentInstance.$el;
        if (isPatchable(vnode)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            setScope(vnode);
        }
        else {
            // empty component root.
            // skip all element-related modules except for ref (#3455)
            registerRef(vnode);
            // make sure to invoke the insert hook
            insertedVnodeQueue.push(vnode);
        }
    }
    function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
        let i;
        // hack for #4339: a reactivated component with inner transition
        // does not trigger because the inner node's created hooks are not called
        // again. It's not ideal to involve module-specific logic in here but
        // there doesn't seem to be a better way to do it.
        let innerNode = vnode;
        while (innerNode.componentInstance) {
            innerNode = innerNode.componentInstance._vnode;
            if (isDef((i = innerNode.data)) && isDef((i = i.transition))) {
                for (i = 0; i < cbs.activate.length; ++i) {
                    cbs.activate[i](emptyNode, innerNode);
                }
                insertedVnodeQueue.push(innerNode);
                break;
            }
        }
        // unlike a newly created component,
        // a reactivated keep-alive component doesn't insert itself
        insert(parentElm, vnode.elm, refElm);
    }
    function insert(parent, elm, ref) {
        if (isDef(parent)) {
            if (isDef(ref)) {
                if (nodeOps.parentNode(ref) === parent) {
                    nodeOps.insertBefore(parent, elm, ref);
                }
            }
            else {
                nodeOps.appendChild(parent, elm);
            }
        }
    }
    function createChildren(vnode, children, insertedVnodeQueue) {
        if (isArray(children)) {
            {
                checkDuplicateKeys(children);
            }
            for (let i = 0; i < children.length; ++i) {
                createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
            }
        }
        else if (isPrimitive(vnode.text)) {
            nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
        }
    }
    function isPatchable(vnode) {
        while (vnode.componentInstance) {
            vnode = vnode.componentInstance._vnode;
        }
        return isDef(vnode.tag);
    }
    function invokeCreateHooks(vnode, insertedVnodeQueue) {
        for (let i = 0; i < cbs.create.length; ++i) {
            cbs.create[i](emptyNode, vnode);
        }
        i = vnode.data.hook; // Reuse variable
        if (isDef(i)) {
            if (isDef(i.create))
                i.create(emptyNode, vnode);
            if (isDef(i.insert))
                insertedVnodeQueue.push(vnode);
        }
    }
    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    function setScope(vnode) {
        let i;
        if (isDef((i = vnode.fnScopeId))) {
            nodeOps.setStyleScope(vnode.elm, i);
        }
        else {
            let ancestor = vnode;
            while (ancestor) {
                if (isDef((i = ancestor.context)) && isDef((i = i.$options._scopeId))) {
                    nodeOps.setStyleScope(vnode.elm, i);
                }
                ancestor = ancestor.parent;
            }
        }
        // for slot content they should also get the scopeId from the host instance.
        if (isDef((i = activeInstance)) &&
            i !== vnode.context &&
            i !== vnode.fnContext &&
            isDef((i = i.$options._scopeId))) {
            nodeOps.setStyleScope(vnode.elm, i);
        }
    }
    function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
        }
    }
    function invokeDestroyHook(vnode) {
        let i, j;
        const data = vnode.data;
        if (isDef(data)) {
            if (isDef((i = data.hook)) && isDef((i = i.destroy)))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
        }
        if (isDef((i = vnode.children))) {
            for (j = 0; j < vnode.children.length; ++j) {
                invokeDestroyHook(vnode.children[j]);
            }
        }
    }
    function removeVnodes(vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            const ch = vnodes[startIdx];
            if (isDef(ch)) {
                if (isDef(ch.tag)) {
                    removeAndInvokeRemoveHook(ch);
                    invokeDestroyHook(ch);
                }
                else {
                    // Text node
                    removeNode(ch.elm);
                }
            }
        }
    }
    function removeAndInvokeRemoveHook(vnode, rm) {
        if (isDef(rm) || isDef(vnode.data)) {
            let i;
            const listeners = cbs.remove.length + 1;
            if (isDef(rm)) {
                // we have a recursively passed down rm callback
                // increase the listeners count
                rm.listeners += listeners;
            }
            else {
                // directly removing
                rm = createRmCb(vnode.elm, listeners);
            }
            // recursively invoke hooks on child component root node
            if (isDef((i = vnode.componentInstance)) &&
                isDef((i = i._vnode)) &&
                isDef(i.data)) {
                removeAndInvokeRemoveHook(i, rm);
            }
            for (i = 0; i < cbs.remove.length; ++i) {
                cbs.remove[i](vnode, rm);
            }
            if (isDef((i = vnode.data.hook)) && isDef((i = i.remove))) {
                i(vnode, rm);
            }
            else {
                rm();
            }
        }
        else {
            removeNode(vnode.elm);
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
        let oldStartIdx = 0;
        let newStartIdx = 0;
        let oldEndIdx = oldCh.length - 1;
        let oldStartVnode = oldCh[0];
        let oldEndVnode = oldCh[oldEndIdx];
        let newEndIdx = newCh.length - 1;
        let newStartVnode = newCh[0];
        let newEndVnode = newCh[newEndIdx];
        let oldKeyToIdx, idxInOld, vnodeToMove, refElm;
        // removeOnly is a special flag used only by <transition-group>
        // to ensure removed elements stay in correct relative positions
        // during leaving transitions
        const canMove = !removeOnly;
        {
            checkDuplicateKeys(newCh);
        }
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (isUndef(oldStartVnode)) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
            }
            else if (isUndef(oldEndVnode)) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                // Vnode moved right
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                canMove &&
                    nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                // Vnode moved left
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                canMove &&
                    nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (isUndef(oldKeyToIdx))
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                idxInOld = isDef(newStartVnode.key)
                    ? oldKeyToIdx[newStartVnode.key]
                    : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
                if (isUndef(idxInOld)) {
                    // New element
                    createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                }
                else {
                    vnodeToMove = oldCh[idxInOld];
                    if (sameVnode(vnodeToMove, newStartVnode)) {
                        patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                        oldCh[idxInOld] = undefined;
                        canMove &&
                            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
                    }
                    else {
                        // same key but different element. treat as new element
                        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                    }
                }
                newStartVnode = newCh[++newStartIdx];
            }
        }
        if (oldStartIdx > oldEndIdx) {
            refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(oldCh, oldStartIdx, oldEndIdx);
        }
    }
    function checkDuplicateKeys(children) {
        const seenKeys = {};
        for (let i = 0; i < children.length; i++) {
            const vnode = children[i];
            const key = vnode.key;
            if (isDef(key)) {
                if (seenKeys[key]) {
                    warn$2(`Duplicate keys detected: '${key}'. This may cause an update error.`, vnode.context);
                }
                else {
                    seenKeys[key] = true;
                }
            }
        }
    }
    function findIdxInOld(node, oldCh, start, end) {
        for (let i = start; i < end; i++) {
            const c = oldCh[i];
            if (isDef(c) && sameVnode(node, c))
                return i;
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
        if (oldVnode === vnode) {
            return;
        }
        if (isDef(vnode.elm) && isDef(ownerArray)) {
            // clone reused vnode
            vnode = ownerArray[index] = cloneVNode(vnode);
        }
        const elm = (vnode.elm = oldVnode.elm);
        if (isTrue(oldVnode.isAsyncPlaceholder)) {
            if (isDef(vnode.asyncFactory.resolved)) {
                hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
            }
            else {
                vnode.isAsyncPlaceholder = true;
            }
            return;
        }
        // reuse element for static trees.
        // note we only do this if the vnode is cloned -
        // if the new node is not cloned it means the render functions have been
        // reset by the hot-reload-api and we need to do a proper re-render.
        if (isTrue(vnode.isStatic) &&
            isTrue(oldVnode.isStatic) &&
            vnode.key === oldVnode.key &&
            (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
            vnode.componentInstance = oldVnode.componentInstance;
            return;
        }
        let i;
        const data = vnode.data;
        if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
            i(oldVnode, vnode);
        }
        const oldCh = oldVnode.children;
        const ch = vnode.children;
        if (isDef(data) && isPatchable(vnode)) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            if (isDef((i = data.hook)) && isDef((i = i.update)))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
            }
            else if (isDef(ch)) {
                {
                    checkDuplicateKeys(ch);
                }
                if (isDef(oldVnode.text))
                    nodeOps.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                nodeOps.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            nodeOps.setTextContent(elm, vnode.text);
        }
        if (isDef(data)) {
            if (isDef((i = data.hook)) && isDef((i = i.postpatch)))
                i(oldVnode, vnode);
        }
    }
    function invokeInsertHook(vnode, queue, initial) {
        // delay insert hooks for component root nodes, invoke them after the
        // element is really inserted
        if (isTrue(initial) && isDef(vnode.parent)) {
            vnode.parent.data.pendingInsert = queue;
        }
        else {
            for (let i = 0; i < queue.length; ++i) {
                queue[i].data.hook.insert(queue[i]);
            }
        }
    }
    let hydrationBailed = false;
    // list of modules that can skip create hook during hydration because they
    // are already rendered on the client or has no need for initialization
    // Note: style is excluded because it relies on initial clone for future
    // deep updates (#7063).
    const isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');
    // Note: this is a browser-only function so we can assume elms are DOM nodes.
    function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
        let i;
        const { tag, data, children } = vnode;
        inVPre = inVPre || (data && data.pre);
        vnode.elm = elm;
        if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
            vnode.isAsyncPlaceholder = true;
            return true;
        }
        // assert node match
        {
            if (!assertNodeMatch(elm, vnode, inVPre)) {
                return false;
            }
        }
        if (isDef(data)) {
            if (isDef((i = data.hook)) && isDef((i = i.init)))
                i(vnode, true /* hydrating */);
            if (isDef((i = vnode.componentInstance))) {
                // child component. it should have hydrated its own tree.
                initComponent(vnode, insertedVnodeQueue);
                return true;
            }
        }
        if (isDef(tag)) {
            if (isDef(children)) {
                // empty element, allow client to pick up and populate children
                if (!elm.hasChildNodes()) {
                    createChildren(vnode, children, insertedVnodeQueue);
                }
                else {
                    // v-html and domProps: innerHTML
                    if (isDef((i = data)) &&
                        isDef((i = i.domProps)) &&
                        isDef((i = i.innerHTML))) {
                        if (i !== elm.innerHTML) {
                            /* istanbul ignore if */
                            if (typeof console !== 'undefined' &&
                                !hydrationBailed) {
                                hydrationBailed = true;
                                console.warn('Parent: ', elm);
                                console.warn('server innerHTML: ', i);
                                console.warn('client innerHTML: ', elm.innerHTML);
                            }
                            return false;
                        }
                    }
                    else {
                        // iterate and compare children lists
                        let childrenMatch = true;
                        let childNode = elm.firstChild;
                        for (let i = 0; i < children.length; i++) {
                            if (!childNode ||
                                !hydrate(childNode, children[i], insertedVnodeQueue, inVPre)) {
                                childrenMatch = false;
                                break;
                            }
                            childNode = childNode.nextSibling;
                        }
                        // if childNode is not null, it means the actual childNodes list is
                        // longer than the virtual children list.
                        if (!childrenMatch || childNode) {
                            /* istanbul ignore if */
                            if (typeof console !== 'undefined' &&
                                !hydrationBailed) {
                                hydrationBailed = true;
                                console.warn('Parent: ', elm);
                                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
                            }
                            return false;
                        }
                    }
                }
            }
            if (isDef(data)) {
                let fullInvoke = false;
                for (const key in data) {
                    if (!isRenderedModule(key)) {
                        fullInvoke = true;
                        invokeCreateHooks(vnode, insertedVnodeQueue);
                        break;
                    }
                }
                if (!fullInvoke && data['class']) {
                    // ensure collecting deps for deep class bindings for future updates
                    traverse(data['class']);
                }
            }
        }
        else if (elm.data !== vnode.text) {
            elm.data = vnode.text;
        }
        return true;
    }
    function assertNodeMatch(node, vnode, inVPre) {
        if (isDef(vnode.tag)) {
            return (vnode.tag.indexOf('vue-component') === 0 ||
                (!isUnknownElement(vnode, inVPre) &&
                    vnode.tag.toLowerCase() ===
                        (node.tagName && node.tagName.toLowerCase())));
        }
        else {
            return node.nodeType === (vnode.isComment ? 8 : 3);
        }
    }
    return function patch(oldVnode, vnode, hydrating, removeOnly) {
        if (isUndef(vnode)) {
            if (isDef(oldVnode))
                invokeDestroyHook(oldVnode);
            return;
        }
        let isInitialPatch = false;
        const insertedVnodeQueue = [];
        if (isUndef(oldVnode)) {
            // empty mount (likely as component), create new root element
            isInitialPatch = true;
            createElm(vnode, insertedVnodeQueue);
        }
        else {
            const isRealElement = isDef(oldVnode.nodeType);
            if (!isRealElement && sameVnode(oldVnode, vnode)) {
                // patch existing root node
                patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
            }
            else {
                if (isRealElement) {
                    // mounting to a real element
                    // check if this is server-rendered content and if we can perform
                    // a successful hydration.
                    if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                        oldVnode.removeAttribute(SSR_ATTR);
                        hydrating = true;
                    }
                    if (isTrue(hydrating)) {
                        if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                            invokeInsertHook(vnode, insertedVnodeQueue, true);
                            return oldVnode;
                        }
                        else {
                            warn$2('The client-side rendered virtual DOM tree is not matching ' +
                                'server-rendered content. This is likely caused by incorrect ' +
                                'HTML markup, for example nesting block-level elements inside ' +
                                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                                'full client-side render.');
                        }
                    }
                    // either not server-rendered, or hydration failed.
                    // create an empty node and replace it
                    oldVnode = emptyNodeAt(oldVnode);
                }
                // replacing existing element
                const oldElm = oldVnode.elm;
                const parentElm = nodeOps.parentNode(oldElm);
                // create new node
                createElm(vnode, insertedVnodeQueue, 
                // extremely rare edge case: do not insert if old element is in a
                // leaving transition. Only happens when combining transition +
                // keep-alive + HOCs. (#4590)
                oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm));
                // update parent placeholder node element, recursively
                if (isDef(vnode.parent)) {
                    let ancestor = vnode.parent;
                    const patchable = isPatchable(vnode);
                    while (ancestor) {
                        for (let i = 0; i < cbs.destroy.length; ++i) {
                            cbs.destroy[i](ancestor);
                        }
                        ancestor.elm = vnode.elm;
                        if (patchable) {
                            for (let i = 0; i < cbs.create.length; ++i) {
                                cbs.create[i](emptyNode, ancestor);
                            }
                            // #6513
                            // invoke insert hooks that may have been merged by create hooks.
                            // e.g. for directives that uses the "inserted" hook.
                            const insert = ancestor.data.hook.insert;
                            if (insert.merged) {
                                // start at index 1 to avoid re-invoking component mounted hook
                                for (let i = 1; i < insert.fns.length; i++) {
                                    insert.fns[i]();
                                }
                            }
                        }
                        else {
                            registerRef(ancestor);
                        }
                        ancestor = ancestor.parent;
                    }
                }
                // destroy old node
                if (isDef(parentElm)) {
                    removeVnodes([oldVnode], 0, 0);
                }
                else if (isDef(oldVnode.tag)) {
                    invokeDestroyHook(oldVnode);
                }
            }
        }
        invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
        return vnode.elm;
    };
}

var directives$1 = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives(vnode) {
        // @ts-expect-error emptyNode is not VNodeWithData
        updateDirectives(vnode, emptyNode);
    }
};
function updateDirectives(oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
        _update(oldVnode, vnode);
    }
}
function _update(oldVnode, vnode) {
    const isCreate = oldVnode === emptyNode;
    const isDestroy = vnode === emptyNode;
    const oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
    const newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
    const dirsWithInsert = [];
    const dirsWithPostpatch = [];
    let key, oldDir, dir;
    for (key in newDirs) {
        oldDir = oldDirs[key];
        dir = newDirs[key];
        if (!oldDir) {
            // new directive, bind
            callHook(dir, 'bind', vnode, oldVnode);
            if (dir.def && dir.def.inserted) {
                dirsWithInsert.push(dir);
            }
        }
        else {
            // existing directive, update
            dir.oldValue = oldDir.value;
            dir.oldArg = oldDir.arg;
            callHook(dir, 'update', vnode, oldVnode);
            if (dir.def && dir.def.componentUpdated) {
                dirsWithPostpatch.push(dir);
            }
        }
    }
    if (dirsWithInsert.length) {
        const callInsert = () => {
            for (let i = 0; i < dirsWithInsert.length; i++) {
                callHook(dirsWithInsert[i], 'inserted', vnode, oldVnode);
            }
        };
        if (isCreate) {
            mergeVNodeHook(vnode, 'insert', callInsert);
        }
        else {
            callInsert();
        }
    }
    if (dirsWithPostpatch.length) {
        mergeVNodeHook(vnode, 'postpatch', () => {
            for (let i = 0; i < dirsWithPostpatch.length; i++) {
                callHook(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
            }
        });
    }
    if (!isCreate) {
        for (key in oldDirs) {
            if (!newDirs[key]) {
                // no longer present, unbind
                callHook(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
            }
        }
    }
}
const emptyModifiers = Object.create(null);
function normalizeDirectives(dirs, vm) {
    const res = Object.create(null);
    if (!dirs) {
        // $flow-disable-line
        return res;
    }
    let i, dir;
    for (i = 0; i < dirs.length; i++) {
        dir = dirs[i];
        if (!dir.modifiers) {
            // $flow-disable-line
            dir.modifiers = emptyModifiers;
        }
        res[getRawDirName(dir)] = dir;
        if (vm._setupState && vm._setupState.__sfc) {
            const setupDef = dir.def || resolveAsset(vm, '_setupState', 'v-' + dir.name);
            if (typeof setupDef === 'function') {
                dir.def = {
                    bind: setupDef,
                    update: setupDef,
                };
            }
            else {
                dir.def = setupDef;
            }
        }
        dir.def = dir.def || resolveAsset(vm.$options, 'directives', dir.name, true);
    }
    // $flow-disable-line
    return res;
}
function getRawDirName(dir) {
    return (dir.rawName || `${dir.name}.${Object.keys(dir.modifiers || {}).join('.')}`);
}
function callHook(dir, hook, vnode, oldVnode, isDestroy) {
    const fn = dir.def && dir.def[hook];
    if (fn) {
        try {
            fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
        }
        catch (e) {
            handleError(e, vnode.context, `directive ${dir.name} ${hook} hook`);
        }
    }
}

var baseModules = [ref, directives$1];

function updateAttrs(oldVnode, vnode) {
    const opts = vnode.componentOptions;
    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
        return;
    }
    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
        return;
    }
    let key, cur, old;
    const elm = vnode.elm;
    const oldAttrs = oldVnode.data.attrs || {};
    let attrs = vnode.data.attrs || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(attrs.__ob__) || isTrue(attrs._v_attr_proxy)) {
        attrs = vnode.data.attrs = extend({}, attrs);
    }
    for (key in attrs) {
        cur = attrs[key];
        old = oldAttrs[key];
        if (old !== cur) {
            setAttr(elm, key, cur, vnode.data.pre);
        }
    }
    // #4391: in IE9, setting type can reset value for input[type=radio]
    // #6666: IE/Edge forces progress value down to 1 before setting a max
    /* istanbul ignore if */
    if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
        setAttr(elm, 'value', attrs.value);
    }
    for (key in oldAttrs) {
        if (isUndef(attrs[key])) {
            if (isXlink(key)) {
                elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
            }
            else if (!isEnumeratedAttr(key)) {
                elm.removeAttribute(key);
            }
        }
    }
}
function setAttr(el, key, value, isInPre) {
    if (isInPre || el.tagName.indexOf('-') > -1) {
        baseSetAttr(el, key, value);
    }
    else if (isBooleanAttr(key)) {
        // set attribute for blank value
        // e.g. <option disabled>Select one</option>
        if (isFalsyAttrValue(value)) {
            el.removeAttribute(key);
        }
        else {
            // technically allowfullscreen is a boolean attribute for <iframe>,
            // but Flash expects a value of "true" when used on <embed> tag
            value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
            el.setAttribute(key, value);
        }
    }
    else if (isEnumeratedAttr(key)) {
        el.setAttribute(key, convertEnumeratedValue(key, value));
    }
    else if (isXlink(key)) {
        if (isFalsyAttrValue(value)) {
            el.removeAttributeNS(xlinkNS, getXlinkProp(key));
        }
        else {
            el.setAttributeNS(xlinkNS, key, value);
        }
    }
    else {
        baseSetAttr(el, key, value);
    }
}
function baseSetAttr(el, key, value) {
    if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
    }
    else {
        // #7138: IE10 & 11 fires input event when setting placeholder on
        // <textarea>... block the first input event and remove the blocker
        // immediately.
        /* istanbul ignore if */
        if (isIE &&
            !isIE9 &&
            el.tagName === 'TEXTAREA' &&
            key === 'placeholder' &&
            value !== '' &&
            !el.__ieph) {
            const blocker = e => {
                e.stopImmediatePropagation();
                el.removeEventListener('input', blocker);
            };
            el.addEventListener('input', blocker);
            // $flow-disable-line
            el.__ieph = true; /* IE placeholder patched */
        }
        el.setAttribute(key, value);
    }
}
var attrs = {
    create: updateAttrs,
    update: updateAttrs
};

function updateClass(oldVnode, vnode) {
    const el = vnode.elm;
    const data = vnode.data;
    const oldData = oldVnode.data;
    if (isUndef(data.staticClass) &&
        isUndef(data.class) &&
        (isUndef(oldData) ||
            (isUndef(oldData.staticClass) && isUndef(oldData.class)))) {
        return;
    }
    let cls = genClassForVnode(vnode);
    // handle transition classes
    const transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
        cls = concat(cls, stringifyClass(transitionClass));
    }
    // set the class
    if (cls !== el._prevClass) {
        el.setAttribute('class', cls);
        el._prevClass = cls;
    }
}
var klass$1 = {
    create: updateClass,
    update: updateClass
};

const validDivisionCharRE = /[\w).+\-_$\]]/;
function parseFilters(exp) {
    let inSingle = false;
    let inDouble = false;
    let inTemplateString = false;
    let inRegex = false;
    let curly = 0;
    let square = 0;
    let paren = 0;
    let lastFilterIndex = 0;
    let c, prev, i, expression, filters;
    for (i = 0; i < exp.length; i++) {
        prev = c;
        c = exp.charCodeAt(i);
        if (inSingle) {
            if (c === 0x27 && prev !== 0x5c)
                inSingle = false;
        }
        else if (inDouble) {
            if (c === 0x22 && prev !== 0x5c)
                inDouble = false;
        }
        else if (inTemplateString) {
            if (c === 0x60 && prev !== 0x5c)
                inTemplateString = false;
        }
        else if (inRegex) {
            if (c === 0x2f && prev !== 0x5c)
                inRegex = false;
        }
        else if (c === 0x7c && // pipe
            exp.charCodeAt(i + 1) !== 0x7c &&
            exp.charCodeAt(i - 1) !== 0x7c &&
            !curly &&
            !square &&
            !paren) {
            if (expression === undefined) {
                // first filter, end of expression
                lastFilterIndex = i + 1;
                expression = exp.slice(0, i).trim();
            }
            else {
                pushFilter();
            }
        }
        else {
            switch (c) {
                case 0x22:
                    inDouble = true;
                    break; // "
                case 0x27:
                    inSingle = true;
                    break; // '
                case 0x60:
                    inTemplateString = true;
                    break; // `
                case 0x28:
                    paren++;
                    break; // (
                case 0x29:
                    paren--;
                    break; // )
                case 0x5b:
                    square++;
                    break; // [
                case 0x5d:
                    square--;
                    break; // ]
                case 0x7b:
                    curly++;
                    break; // {
                case 0x7d:
                    curly--;
                    break; // }
            }
            if (c === 0x2f) {
                // /
                let j = i - 1;
                let p;
                // find first non-whitespace prev char
                for (; j >= 0; j--) {
                    p = exp.charAt(j);
                    if (p !== ' ')
                        break;
                }
                if (!p || !validDivisionCharRE.test(p)) {
                    inRegex = true;
                }
            }
        }
    }
    if (expression === undefined) {
        expression = exp.slice(0, i).trim();
    }
    else if (lastFilterIndex !== 0) {
        pushFilter();
    }
    function pushFilter() {
        (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
        lastFilterIndex = i + 1;
    }
    if (filters) {
        for (i = 0; i < filters.length; i++) {
            expression = wrapFilter(expression, filters[i]);
        }
    }
    return expression;
}
function wrapFilter(exp, filter) {
    const i = filter.indexOf('(');
    if (i < 0) {
        // _f: resolveFilter
        return `_f("${filter}")(${exp})`;
    }
    else {
        const name = filter.slice(0, i);
        const args = filter.slice(i + 1);
        return `_f("${name}")(${exp}${args !== ')' ? ',' + args : args}`;
    }
}

/* eslint-disable no-unused-vars */
function baseWarn(msg, range) {
    console.error(`[Vue compiler]: ${msg}`);
}
/* eslint-enable no-unused-vars */
function pluckModuleFunction(modules, key) {
    return modules ? modules.map(m => m[key]).filter(_ => _) : [];
}
function addProp(el, name, value, range, dynamic) {
    (el.props || (el.props = [])).push(rangeSetItem({ name, value, dynamic }, range));
    el.plain = false;
}
function addAttr(el, name, value, range, dynamic) {
    const attrs = dynamic
        ? el.dynamicAttrs || (el.dynamicAttrs = [])
        : el.attrs || (el.attrs = []);
    attrs.push(rangeSetItem({ name, value, dynamic }, range));
    el.plain = false;
}
// add a raw attr (use this in preTransforms)
function addRawAttr(el, name, value, range) {
    el.attrsMap[name] = value;
    el.attrsList.push(rangeSetItem({ name, value }, range));
}
function addDirective(el, name, rawName, value, arg, isDynamicArg, modifiers, range) {
    (el.directives || (el.directives = [])).push(rangeSetItem({
        name,
        rawName,
        value,
        arg,
        isDynamicArg,
        modifiers
    }, range));
    el.plain = false;
}
function prependModifierMarker(symbol, name, dynamic) {
    return dynamic ? `_p(${name},"${symbol}")` : symbol + name; // mark the event as captured
}
function addHandler(el, name, value, modifiers, important, warn, range, dynamic) {
    modifiers = modifiers || emptyObject;
    // warn prevent and passive modifier
    /* istanbul ignore if */
    if (warn && modifiers.prevent && modifiers.passive) {
        warn("passive and prevent can't be used together. " +
            "Passive handler can't prevent default event.", range);
    }
    // normalize click.right and click.middle since they don't actually fire
    // this is technically browser-specific, but at least for now browsers are
    // the only target envs that have right/middle clicks.
    if (modifiers.right) {
        if (dynamic) {
            name = `(${name})==='click'?'contextmenu':(${name})`;
        }
        else if (name === 'click') {
            name = 'contextmenu';
            delete modifiers.right;
        }
    }
    else if (modifiers.middle) {
        if (dynamic) {
            name = `(${name})==='click'?'mouseup':(${name})`;
        }
        else if (name === 'click') {
            name = 'mouseup';
        }
    }
    // check capture modifier
    if (modifiers.capture) {
        delete modifiers.capture;
        name = prependModifierMarker('!', name, dynamic);
    }
    if (modifiers.once) {
        delete modifiers.once;
        name = prependModifierMarker('~', name, dynamic);
    }
    /* istanbul ignore if */
    if (modifiers.passive) {
        delete modifiers.passive;
        name = prependModifierMarker('&', name, dynamic);
    }
    let events;
    if (modifiers.native) {
        delete modifiers.native;
        events = el.nativeEvents || (el.nativeEvents = {});
    }
    else {
        events = el.events || (el.events = {});
    }
    const newHandler = rangeSetItem({ value: value.trim(), dynamic }, range);
    if (modifiers !== emptyObject) {
        newHandler.modifiers = modifiers;
    }
    const handlers = events[name];
    /* istanbul ignore if */
    if (Array.isArray(handlers)) {
        important ? handlers.unshift(newHandler) : handlers.push(newHandler);
    }
    else if (handlers) {
        events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
    }
    else {
        events[name] = newHandler;
    }
    el.plain = false;
}
function getRawBindingAttr(el, name) {
    return (el.rawAttrsMap[':' + name] ||
        el.rawAttrsMap['v-bind:' + name] ||
        el.rawAttrsMap[name]);
}
function getBindingAttr(el, name, getStatic) {
    const dynamicValue = getAndRemoveAttr(el, ':' + name) || getAndRemoveAttr(el, 'v-bind:' + name);
    if (dynamicValue != null) {
        return parseFilters(dynamicValue);
    }
    else if (getStatic !== false) {
        const staticValue = getAndRemoveAttr(el, name);
        if (staticValue != null) {
            return JSON.stringify(staticValue);
        }
    }
}
// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr(el, name, removeFromMap) {
    let val;
    if ((val = el.attrsMap[name]) != null) {
        const list = el.attrsList;
        for (let i = 0, l = list.length; i < l; i++) {
            if (list[i].name === name) {
                list.splice(i, 1);
                break;
            }
        }
    }
    if (removeFromMap) {
        delete el.attrsMap[name];
    }
    return val;
}
function getAndRemoveAttrByRegex(el, name) {
    const list = el.attrsList;
    for (let i = 0, l = list.length; i < l; i++) {
        const attr = list[i];
        if (name.test(attr.name)) {
            list.splice(i, 1);
            return attr;
        }
    }
}
function rangeSetItem(item, range) {
    if (range) {
        if (range.start != null) {
            item.start = range.start;
        }
        if (range.end != null) {
            item.end = range.end;
        }
    }
    return item;
}

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel(el, value, modifiers) {
    const { number, trim } = modifiers || {};
    const baseValueExpression = '$$v';
    let valueExpression = baseValueExpression;
    if (trim) {
        valueExpression =
            `(typeof ${baseValueExpression} === 'string'` +
                `? ${baseValueExpression}.trim()` +
                `: ${baseValueExpression})`;
    }
    if (number) {
        valueExpression = `_n(${valueExpression})`;
    }
    const assignment = genAssignmentCode(value, valueExpression);
    el.model = {
        value: `(${value})`,
        expression: JSON.stringify(value),
        callback: `function (${baseValueExpression}) {${assignment}}`
    };
}
/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode(value, assignment) {
    const res = parseModel(value);
    if (res.key === null) {
        return `${value}=${assignment}`;
    }
    else {
        return `$set(${res.exp}, ${res.key}, ${assignment})`;
    }
}
/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */
let len, str, chr, index, expressionPos, expressionEndPos;
function parseModel(val) {
    // Fix https://github.com/vuejs/vue/pull/7730
    // allow v-model="obj.val " (trailing whitespace)
    val = val.trim();
    len = val.length;
    if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
        index = val.lastIndexOf('.');
        if (index > -1) {
            return {
                exp: val.slice(0, index),
                key: '"' + val.slice(index + 1) + '"'
            };
        }
        else {
            return {
                exp: val,
                key: null
            };
        }
    }
    str = val;
    index = expressionPos = expressionEndPos = 0;
    while (!eof()) {
        chr = next();
        /* istanbul ignore if */
        if (isStringStart(chr)) {
            parseString(chr);
        }
        else if (chr === 0x5b) {
            parseBracket(chr);
        }
    }
    return {
        exp: val.slice(0, expressionPos),
        key: val.slice(expressionPos + 1, expressionEndPos)
    };
}
function next() {
    return str.charCodeAt(++index);
}
function eof() {
    return index >= len;
}
function isStringStart(chr) {
    return chr === 0x22 || chr === 0x27;
}
function parseBracket(chr) {
    let inBracket = 1;
    expressionPos = index;
    while (!eof()) {
        chr = next();
        if (isStringStart(chr)) {
            parseString(chr);
            continue;
        }
        if (chr === 0x5b)
            inBracket++;
        if (chr === 0x5d)
            inBracket--;
        if (inBracket === 0) {
            expressionEndPos = index;
            break;
        }
    }
}
function parseString(chr) {
    const stringQuote = chr;
    while (!eof()) {
        chr = next();
        if (chr === stringQuote) {
            break;
        }
    }
}

let warn$1;
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
const RANGE_TOKEN = '__r';
const CHECKBOX_RADIO_TOKEN = '__c';
function model$1(el, dir, _warn) {
    warn$1 = _warn;
    const value = dir.value;
    const modifiers = dir.modifiers;
    const tag = el.tag;
    const type = el.attrsMap.type;
    {
        // inputs with type="file" are read only and setting the input's
        // value will throw an error.
        if (tag === 'input' && type === 'file') {
            warn$1(`<${el.tag} v-model="${value}" type="file">:\n` +
                `File inputs are read only. Use a v-on:change listener instead.`, el.rawAttrsMap['v-model']);
        }
    }
    if (el.component) {
        genComponentModel(el, value, modifiers);
        // component v-model doesn't need extra runtime
        return false;
    }
    else if (tag === 'select') {
        genSelect(el, value, modifiers);
    }
    else if (tag === 'input' && type === 'checkbox') {
        genCheckboxModel(el, value, modifiers);
    }
    else if (tag === 'input' && type === 'radio') {
        genRadioModel(el, value, modifiers);
    }
    else if (tag === 'input' || tag === 'textarea') {
        genDefaultModel(el, value, modifiers);
    }
    else if (!config.isReservedTag(tag)) {
        genComponentModel(el, value, modifiers);
        // component v-model doesn't need extra runtime
        return false;
    }
    else {
        warn$1(`<${el.tag} v-model="${value}">: ` +
            `v-model is not supported on this element type. ` +
            "If you are working with contenteditable, it's recommended to " +
            'wrap a library dedicated for that purpose inside a custom component.', el.rawAttrsMap['v-model']);
    }
    // ensure runtime directive metadata
    return true;
}
function genCheckboxModel(el, value, modifiers) {
    const number = modifiers && modifiers.number;
    const valueBinding = getBindingAttr(el, 'value') || 'null';
    const trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
    const falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
    addProp(el, 'checked', `Array.isArray(${value})` +
        `?_i(${value},${valueBinding})>-1` +
        (trueValueBinding === 'true'
            ? `:(${value})`
            : `:_q(${value},${trueValueBinding})`));
    addHandler(el, 'change', `var $$a=${value},` +
        '$$el=$event.target,' +
        `$$c=$$el.checked?(${trueValueBinding}):(${falseValueBinding});` +
        'if(Array.isArray($$a)){' +
        `var $$v=${number ? '_n(' + valueBinding + ')' : valueBinding},` +
        '$$i=_i($$a,$$v);' +
        `if($$el.checked){$$i<0&&(${genAssignmentCode(value, '$$a.concat([$$v])')})}` +
        `else{$$i>-1&&(${genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')})}` +
        `}else{${genAssignmentCode(value, '$$c')}}`, null, true);
}
function genRadioModel(el, value, modifiers) {
    const number = modifiers && modifiers.number;
    let valueBinding = getBindingAttr(el, 'value') || 'null';
    valueBinding = number ? `_n(${valueBinding})` : valueBinding;
    addProp(el, 'checked', `_q(${value},${valueBinding})`);
    addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}
function genSelect(el, value, modifiers) {
    const number = modifiers && modifiers.number;
    const selectedVal = `Array.prototype.filter` +
        `.call($event.target.options,function(o){return o.selected})` +
        `.map(function(o){var val = "_value" in o ? o._value : o.value;` +
        `return ${number ? '_n(val)' : 'val'}})`;
    const assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
    let code = `var $$selectedVal = ${selectedVal};`;
    code = `${code} ${genAssignmentCode(value, assignment)}`;
    addHandler(el, 'change', code, null, true);
}
function genDefaultModel(el, value, modifiers) {
    const type = el.attrsMap.type;
    // warn if v-bind:value conflicts with v-model
    // except for inputs with v-bind:type
    {
        const value = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
        const typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
        if (value && !typeBinding) {
            const binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
            warn$1(`${binding}="${value}" conflicts with v-model on the same element ` +
                'because the latter already expands to a value binding internally', el.rawAttrsMap[binding]);
        }
    }
    const { lazy, number, trim } = modifiers || {};
    const needCompositionGuard = !lazy && type !== 'range';
    const event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input';
    let valueExpression = '$event.target.value';
    if (trim) {
        valueExpression = `$event.target.value.trim()`;
    }
    if (number) {
        valueExpression = `_n(${valueExpression})`;
    }
    let code = genAssignmentCode(value, valueExpression);
    if (needCompositionGuard) {
        code = `if($event.target.composing)return;${code}`;
    }
    addProp(el, 'value', `(${value})`);
    addHandler(el, event, code, null, true);
    if (trim || number) {
        addHandler(el, 'blur', '$forceUpdate()');
    }
}

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents(on) {
    /* istanbul ignore if */
    if (isDef(on[RANGE_TOKEN])) {
        // IE input[type=range] only supports `change` event
        const event = isIE ? 'change' : 'input';
        on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
        delete on[RANGE_TOKEN];
    }
    // This was originally intended to fix #4521 but no longer necessary
    // after 2.5. Keeping it for backwards compat with generated code from < 2.4
    /* istanbul ignore if */
    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
        on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
        delete on[CHECKBOX_RADIO_TOKEN];
    }
}
let target;
function createOnceHandler(event, handler, capture) {
    const _target = target; // save current target element in closure
    return function onceHandler() {
        const res = handler.apply(null, arguments);
        if (res !== null) {
            remove(event, onceHandler, capture, _target);
        }
    };
}
// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
const useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
function add(name, handler, capture, passive) {
    // async edge case #6566: inner click event triggers patch, event handler
    // attached to outer element during patch, and triggered again. This
    // happens because browsers fire microtask ticks between event propagation.
    // the solution is simple: we save the timestamp when a handler is attached,
    // and the handler would only fire if the event passed to it was fired
    // AFTER it was attached.
    if (useMicrotaskFix) {
        const attachedTimestamp = currentFlushTimestamp;
        const original = handler;
        //@ts-expect-error
        handler = original._wrapper = function (e) {
            if (
            // no bubbling, should always fire.
            // this is just a safety net in case event.timeStamp is unreliable in
            // certain weird environments...
            e.target === e.currentTarget ||
                // event is fired after handler attachment
                e.timeStamp >= attachedTimestamp ||
                // bail for environments that have buggy event.timeStamp implementations
                // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
                // #9681 QtWebEngine event.timeStamp is negative value
                e.timeStamp <= 0 ||
                // #9448 bail if event is fired in another document in a multi-page
                // electron/nw.js app, since event.timeStamp will be using a different
                // starting reference
                e.target.ownerDocument !== document) {
                return original.apply(this, arguments);
            }
        };
    }
    target.addEventListener(name, handler, supportsPassive ? { capture, passive } : capture);
}
function remove(name, handler, capture, _target) {
    (_target || target).removeEventListener(name, 
    //@ts-expect-error
    handler._wrapper || handler, capture);
}
function updateDOMListeners(oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
        return;
    }
    const on = vnode.data.on || {};
    const oldOn = oldVnode.data.on || {};
    // vnode is empty when removing all listeners,
    // and use old vnode dom element
    target = vnode.elm || oldVnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context);
    target = undefined;
}
var events = {
    create: updateDOMListeners,
    update: updateDOMListeners,
    // @ts-expect-error emptyNode has actually data
    destroy: (vnode) => updateDOMListeners(vnode, emptyNode)
};

let svgContainer;
function updateDOMProps(oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
        return;
    }
    let key, cur;
    const elm = vnode.elm;
    const oldProps = oldVnode.data.domProps || {};
    let props = vnode.data.domProps || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(props.__ob__) || isTrue(props._v_attr_proxy)) {
        props = vnode.data.domProps = extend({}, props);
    }
    for (key in oldProps) {
        if (!(key in props)) {
            elm[key] = '';
        }
    }
    for (key in props) {
        cur = props[key];
        // ignore children if the node has textContent or innerHTML,
        // as these will throw away existing DOM nodes and cause removal errors
        // on subsequent patches (#3360)
        if (key === 'textContent' || key === 'innerHTML') {
            if (vnode.children)
                vnode.children.length = 0;
            if (cur === oldProps[key])
                continue;
            // #6601 work around Chrome version <= 55 bug where single textNode
            // replaced by innerHTML/textContent retains its parentNode property
            if (elm.childNodes.length === 1) {
                elm.removeChild(elm.childNodes[0]);
            }
        }
        if (key === 'value' && elm.tagName !== 'PROGRESS') {
            // store value as _value as well since
            // non-string values will be stringified
            elm._value = cur;
            // avoid resetting cursor position when value is the same
            const strCur = isUndef(cur) ? '' : String(cur);
            if (shouldUpdateValue(elm, strCur)) {
                elm.value = strCur;
            }
        }
        else if (key === 'innerHTML' &&
            isSVG(elm.tagName) &&
            isUndef(elm.innerHTML)) {
            // IE doesn't support innerHTML for SVG elements
            svgContainer = svgContainer || document.createElement('div');
            svgContainer.innerHTML = `<svg>${cur}</svg>`;
            const svg = svgContainer.firstChild;
            while (elm.firstChild) {
                elm.removeChild(elm.firstChild);
            }
            while (svg.firstChild) {
                elm.appendChild(svg.firstChild);
            }
        }
        else if (
        // skip the update if old and new VDOM state is the same.
        // `value` is handled separately because the DOM value may be temporarily
        // out of sync with VDOM state due to focus, composition and modifiers.
        // This  #4521 by skipping the unnecessary `checked` update.
        cur !== oldProps[key]) {
            // some property updates can throw
            // e.g. `value` on <progress> w/ non-finite value
            try {
                elm[key] = cur;
            }
            catch (e) { }
        }
    }
}
function shouldUpdateValue(elm, checkVal) {
    return (
    //@ts-expect-error
    !elm.composing &&
        (elm.tagName === 'OPTION' ||
            isNotInFocusAndDirty(elm, checkVal) ||
            isDirtyWithModifiers(elm, checkVal)));
}
function isNotInFocusAndDirty(elm, checkVal) {
    // return true when textbox (.number and .trim) loses focus and its value is
    // not equal to the updated value
    let notInFocus = true;
    // #6157
    // work around IE bug when accessing document.activeElement in an iframe
    try {
        notInFocus = document.activeElement !== elm;
    }
    catch (e) { }
    return notInFocus && elm.value !== checkVal;
}
function isDirtyWithModifiers(elm, newVal) {
    const value = elm.value;
    const modifiers = elm._vModifiers; // injected by v-model runtime
    if (isDef(modifiers)) {
        if (modifiers.number) {
            return toNumber(value) !== toNumber(newVal);
        }
        if (modifiers.trim) {
            return value.trim() !== newVal.trim();
        }
    }
    return value !== newVal;
}
var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
};

const parseStyleText = cached(function (cssText) {
    const res = {};
    const listDelimiter = /;(?![^(]*\))/g;
    const propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
        if (item) {
            const tmp = item.split(propertyDelimiter);
            tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
        }
    });
    return res;
});
// merge static and dynamic style data on the same vnode
function normalizeStyleData(data) {
    const style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle ? extend(data.staticStyle, style) : style;
}
// normalize possible array / string values into Object
function normalizeStyleBinding(bindingStyle) {
    if (Array.isArray(bindingStyle)) {
        return toObject(bindingStyle);
    }
    if (typeof bindingStyle === 'string') {
        return parseStyleText(bindingStyle);
    }
    return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle(vnode, checkChild) {
    const res = {};
    let styleData;
    if (checkChild) {
        let childNode = vnode;
        while (childNode.componentInstance) {
            childNode = childNode.componentInstance._vnode;
            if (childNode &&
                childNode.data &&
                (styleData = normalizeStyleData(childNode.data))) {
                extend(res, styleData);
            }
        }
    }
    if ((styleData = normalizeStyleData(vnode.data))) {
        extend(res, styleData);
    }
    let parentNode = vnode;
    // @ts-expect-error parentNode.parent not VNodeWithData
    while ((parentNode = parentNode.parent)) {
        if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
            extend(res, styleData);
        }
    }
    return res;
}

const cssVarRE = /^--/;
const importantRE = /\s*!important$/;
const setProp = (el, name, val) => {
    /* istanbul ignore if */
    if (cssVarRE.test(name)) {
        el.style.setProperty(name, val);
    }
    else if (importantRE.test(val)) {
        el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
    }
    else {
        const normalizedName = normalize(name);
        if (Array.isArray(val)) {
            // Support values array created by autoprefixer, e.g.
            // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
            // Set them one by one, and the browser will only set those it can recognize
            for (let i = 0, len = val.length; i < len; i++) {
                el.style[normalizedName] = val[i];
            }
        }
        else {
            el.style[normalizedName] = val;
        }
    }
};
const vendorNames = ['Webkit', 'Moz', 'ms'];
let emptyStyle;
const normalize = cached(function (prop) {
    emptyStyle = emptyStyle || document.createElement('div').style;
    prop = camelize(prop);
    if (prop !== 'filter' && prop in emptyStyle) {
        return prop;
    }
    const capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (let i = 0; i < vendorNames.length; i++) {
        const name = vendorNames[i] + capName;
        if (name in emptyStyle) {
            return name;
        }
    }
});
function updateStyle(oldVnode, vnode) {
    const data = vnode.data;
    const oldData = oldVnode.data;
    if (isUndef(data.staticStyle) &&
        isUndef(data.style) &&
        isUndef(oldData.staticStyle) &&
        isUndef(oldData.style)) {
        return;
    }
    let cur, name;
    const el = vnode.elm;
    const oldStaticStyle = oldData.staticStyle;
    const oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
    // if static style exists, stylebinding already merged into it when doing normalizeStyleData
    const oldStyle = oldStaticStyle || oldStyleBinding;
    const style = normalizeStyleBinding(vnode.data.style) || {};
    // store normalized style under a different key for next diff
    // make sure to clone it if it's reactive, since the user likely wants
    // to mutate it.
    vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
    const newStyle = getStyle(vnode, true);
    for (name in oldStyle) {
        if (isUndef(newStyle[name])) {
            setProp(el, name, '');
        }
    }
    for (name in newStyle) {
        cur = newStyle[name];
        if (cur !== oldStyle[name]) {
            // ie9 setting to null has no effect, must use empty string
            setProp(el, name, cur == null ? '' : cur);
        }
    }
}
var style$1 = {
    create: updateStyle,
    update: updateStyle
};

const whitespaceRE$1 = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass(el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
        return;
    }
    /* istanbul ignore else */
    if (el.classList) {
        if (cls.indexOf(' ') > -1) {
            cls.split(whitespaceRE$1).forEach(c => el.classList.add(c));
        }
        else {
            el.classList.add(cls);
        }
    }
    else {
        const cur = ` ${el.getAttribute('class') || ''} `;
        if (cur.indexOf(' ' + cls + ' ') < 0) {
            el.setAttribute('class', (cur + cls).trim());
        }
    }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
        return;
    }
    /* istanbul ignore else */
    if (el.classList) {
        if (cls.indexOf(' ') > -1) {
            cls.split(whitespaceRE$1).forEach(c => el.classList.remove(c));
        }
        else {
            el.classList.remove(cls);
        }
        if (!el.classList.length) {
            el.removeAttribute('class');
        }
    }
    else {
        let cur = ` ${el.getAttribute('class') || ''} `;
        const tar = ' ' + cls + ' ';
        while (cur.indexOf(tar) >= 0) {
            cur = cur.replace(tar, ' ');
        }
        cur = cur.trim();
        if (cur) {
            el.setAttribute('class', cur);
        }
        else {
            el.removeAttribute('class');
        }
    }
}

function resolveTransition(def) {
    if (!def) {
        return;
    }
    /* istanbul ignore else */
    if (typeof def === 'object') {
        const res = {};
        if (def.css !== false) {
            extend(res, autoCssTransition(def.name || 'v'));
        }
        extend(res, def);
        return res;
    }
    else if (typeof def === 'string') {
        return autoCssTransition(def);
    }
}
const autoCssTransition = cached(name => {
    return {
        enterClass: `${name}-enter`,
        enterToClass: `${name}-enter-to`,
        enterActiveClass: `${name}-enter-active`,
        leaveClass: `${name}-leave`,
        leaveToClass: `${name}-leave-to`,
        leaveActiveClass: `${name}-leave-active`
    };
});
const hasTransition = inBrowser && !isIE9;
const TRANSITION = 'transition';
const ANIMATION = 'animation';
// Transition property/event sniffing
let transitionProp = 'transition';
let transitionEndEvent = 'transitionend';
let animationProp = 'animation';
let animationEndEvent = 'animationend';
if (hasTransition) {
    /* istanbul ignore if */
    if (window.ontransitionend === undefined &&
        window.onwebkittransitionend !== undefined) {
        transitionProp = 'WebkitTransition';
        transitionEndEvent = 'webkitTransitionEnd';
    }
    if (window.onanimationend === undefined &&
        window.onwebkitanimationend !== undefined) {
        animationProp = 'WebkitAnimation';
        animationEndEvent = 'webkitAnimationEnd';
    }
}
// binding to window is necessary to make hot reload work in IE in strict mode
const raf = inBrowser
    ? window.requestAnimationFrame
        ? window.requestAnimationFrame.bind(window)
        : setTimeout
    : /* istanbul ignore next */ /* istanbul ignore next */ fn => fn();
function nextFrame(fn) {
    raf(() => {
        // @ts-expect-error
        raf(fn);
    });
}
function addTransitionClass(el, cls) {
    const transitionClasses = el._transitionClasses || (el._transitionClasses = []);
    if (transitionClasses.indexOf(cls) < 0) {
        transitionClasses.push(cls);
        addClass(el, cls);
    }
}
function removeTransitionClass(el, cls) {
    if (el._transitionClasses) {
        remove$2(el._transitionClasses, cls);
    }
    removeClass(el, cls);
}
function whenTransitionEnds(el, expectedType, cb) {
    const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
    if (!type)
        return cb();
    const event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    let ended = 0;
    const end = () => {
        el.removeEventListener(event, onEnd);
        cb();
    };
    const onEnd = e => {
        if (e.target === el) {
            if (++ended >= propCount) {
                end();
            }
        }
    };
    setTimeout(() => {
        if (ended < propCount) {
            end();
        }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
}
const transformRE = /\b(transform|all)(,|$)/;
function getTransitionInfo(el, expectedType) {
    const styles = window.getComputedStyle(el);
    // JSDOM may return undefined for transition properties
    const transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
    const transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    const animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
    const animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
    const animationTimeout = getTimeout(animationDelays, animationDurations);
    let type;
    let timeout = 0;
    let propCount = 0;
    /* istanbul ignore if */
    if (expectedType === TRANSITION) {
        if (transitionTimeout > 0) {
            type = TRANSITION;
            timeout = transitionTimeout;
            propCount = transitionDurations.length;
        }
    }
    else if (expectedType === ANIMATION) {
        if (animationTimeout > 0) {
            type = ANIMATION;
            timeout = animationTimeout;
            propCount = animationDurations.length;
        }
    }
    else {
        timeout = Math.max(transitionTimeout, animationTimeout);
        type =
            timeout > 0
                ? transitionTimeout > animationTimeout
                    ? TRANSITION
                    : ANIMATION
                : null;
        propCount = type
            ? type === TRANSITION
                ? transitionDurations.length
                : animationDurations.length
            : 0;
    }
    const hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
    return {
        type,
        timeout,
        propCount,
        hasTransform
    };
}
function getTimeout(delays, durations) {
    /* istanbul ignore next */
    while (delays.length < durations.length) {
        delays = delays.concat(delays);
    }
    return Math.max.apply(null, durations.map((d, i) => {
        return toMs(d) + toMs(delays[i]);
    }));
}
// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs(s) {
    return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}

function enter(vnode, toggleDisplay) {
    const el = vnode.elm;
    // call leave callback now
    if (isDef(el._leaveCb)) {
        el._leaveCb.cancelled = true;
        el._leaveCb();
    }
    const data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
        return;
    }
    /* istanbul ignore if */
    if (isDef(el._enterCb) || el.nodeType !== 1) {
        return;
    }
    const { css, type, enterClass, enterToClass, enterActiveClass, appearClass, appearToClass, appearActiveClass, beforeEnter, enter, afterEnter, enterCancelled, beforeAppear, appear, afterAppear, appearCancelled, duration } = data;
    // activeInstance will always be the <transition> component managing this
    // transition. One edge case to check is when the <transition> is placed
    // as the root node of a child component. In that case we need to check
    // <transition>'s parent for appear check.
    let context = activeInstance;
    let transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
        context = transitionNode.context;
        transitionNode = transitionNode.parent;
    }
    const isAppear = !context._isMounted || !vnode.isRootInsert;
    if (isAppear && !appear && appear !== '') {
        return;
    }
    const startClass = isAppear && appearClass ? appearClass : enterClass;
    const activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
    const toClass = isAppear && appearToClass ? appearToClass : enterToClass;
    const beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
    const enterHook = isAppear ? (isFunction(appear) ? appear : enter) : enter;
    const afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
    const enterCancelledHook = isAppear
        ? appearCancelled || enterCancelled
        : enterCancelled;
    const explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
    if (explicitEnterDuration != null) {
        checkDuration(explicitEnterDuration, 'enter', vnode);
    }
    const expectsCSS = css !== false && !isIE9;
    const userWantsControl = getHookArgumentsLength(enterHook);
    const cb = (el._enterCb = once(() => {
        if (expectsCSS) {
            removeTransitionClass(el, toClass);
            removeTransitionClass(el, activeClass);
        }
        // @ts-expect-error
        if (cb.cancelled) {
            if (expectsCSS) {
                removeTransitionClass(el, startClass);
            }
            enterCancelledHook && enterCancelledHook(el);
        }
        else {
            afterEnterHook && afterEnterHook(el);
        }
        el._enterCb = null;
    }));
    if (!vnode.data.show) {
        // remove pending leave element on enter by injecting an insert hook
        mergeVNodeHook(vnode, 'insert', () => {
            const parent = el.parentNode;
            const pendingNode = parent && parent._pending && parent._pending[vnode.key];
            if (pendingNode &&
                pendingNode.tag === vnode.tag &&
                pendingNode.elm._leaveCb) {
                pendingNode.elm._leaveCb();
            }
            enterHook && enterHook(el, cb);
        });
    }
    // start enter transition
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
        addTransitionClass(el, startClass);
        addTransitionClass(el, activeClass);
        nextFrame(() => {
            removeTransitionClass(el, startClass);
            // @ts-expect-error
            if (!cb.cancelled) {
                addTransitionClass(el, toClass);
                if (!userWantsControl) {
                    if (isValidDuration(explicitEnterDuration)) {
                        setTimeout(cb, explicitEnterDuration);
                    }
                    else {
                        whenTransitionEnds(el, type, cb);
                    }
                }
            }
        });
    }
    if (vnode.data.show) {
        toggleDisplay && toggleDisplay();
        enterHook && enterHook(el, cb);
    }
    if (!expectsCSS && !userWantsControl) {
        cb();
    }
}
function leave(vnode, rm) {
    const el = vnode.elm;
    // call enter callback now
    if (isDef(el._enterCb)) {
        el._enterCb.cancelled = true;
        el._enterCb();
    }
    const data = resolveTransition(vnode.data.transition);
    if (isUndef(data) || el.nodeType !== 1) {
        return rm();
    }
    /* istanbul ignore if */
    if (isDef(el._leaveCb)) {
        return;
    }
    const { css, type, leaveClass, leaveToClass, leaveActiveClass, beforeLeave, leave, afterLeave, leaveCancelled, delayLeave, duration } = data;
    const expectsCSS = css !== false && !isIE9;
    const userWantsControl = getHookArgumentsLength(leave);
    const explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
    if (isDef(explicitLeaveDuration)) {
        checkDuration(explicitLeaveDuration, 'leave', vnode);
    }
    const cb = (el._leaveCb = once(() => {
        if (el.parentNode && el.parentNode._pending) {
            el.parentNode._pending[vnode.key] = null;
        }
        if (expectsCSS) {
            removeTransitionClass(el, leaveToClass);
            removeTransitionClass(el, leaveActiveClass);
        }
        // @ts-expect-error
        if (cb.cancelled) {
            if (expectsCSS) {
                removeTransitionClass(el, leaveClass);
            }
            leaveCancelled && leaveCancelled(el);
        }
        else {
            rm();
            afterLeave && afterLeave(el);
        }
        el._leaveCb = null;
    }));
    if (delayLeave) {
        delayLeave(performLeave);
    }
    else {
        performLeave();
    }
    function performLeave() {
        // the delayed leave may have already been cancelled
        // @ts-expect-error
        if (cb.cancelled) {
            return;
        }
        // record leaving element
        if (!vnode.data.show && el.parentNode) {
            (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] =
                vnode;
        }
        beforeLeave && beforeLeave(el);
        if (expectsCSS) {
            addTransitionClass(el, leaveClass);
            addTransitionClass(el, leaveActiveClass);
            nextFrame(() => {
                removeTransitionClass(el, leaveClass);
                // @ts-expect-error
                if (!cb.cancelled) {
                    addTransitionClass(el, leaveToClass);
                    if (!userWantsControl) {
                        if (isValidDuration(explicitLeaveDuration)) {
                            setTimeout(cb, explicitLeaveDuration);
                        }
                        else {
                            whenTransitionEnds(el, type, cb);
                        }
                    }
                }
            });
        }
        leave && leave(el, cb);
        if (!expectsCSS && !userWantsControl) {
            cb();
        }
    }
}
// only used in dev mode
function checkDuration(val, name, vnode) {
    if (typeof val !== 'number') {
        warn$2(`<transition> explicit ${name} duration is not a valid number - ` +
            `got ${JSON.stringify(val)}.`, vnode.context);
    }
    else if (isNaN(val)) {
        warn$2(`<transition> explicit ${name} duration is NaN - ` +
            'the duration expression might be incorrect.', vnode.context);
    }
}
function isValidDuration(val) {
    return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength(fn) {
    if (isUndef(fn)) {
        return false;
    }
    // @ts-expect-error
    const invokerFns = fn.fns;
    if (isDef(invokerFns)) {
        // invoker
        return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
    }
    else {
        // @ts-expect-error
        return (fn._length || fn.length) > 1;
    }
}
function _enter(_, vnode) {
    if (vnode.data.show !== true) {
        enter(vnode);
    }
}
var transition = inBrowser
    ? {
        create: _enter,
        activate: _enter,
        remove(vnode, rm) {
            /* istanbul ignore else */
            if (vnode.data.show !== true) {
                // @ts-expect-error
                leave(vnode, rm);
            }
            else {
                rm();
            }
        }
    }
    : {};

var platformModules = [attrs, klass$1, events, domProps, style$1, transition];

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules$1 = platformModules.concat(baseModules);
const patch = createPatchFunction({ nodeOps, modules: modules$1 });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */
/* istanbul ignore if */
if (isIE9) {
    // http://www.matts411.com/post/internet-explorer-9-oninput/
    document.addEventListener('selectionchange', () => {
        const el = document.activeElement;
        // @ts-expect-error
        if (el && el.vmodel) {
            trigger(el, 'input');
        }
    });
}
const directive = {
    inserted(el, binding, vnode, oldVnode) {
        if (vnode.tag === 'select') {
            // #6903
            if (oldVnode.elm && !oldVnode.elm._vOptions) {
                mergeVNodeHook(vnode, 'postpatch', () => {
                    directive.componentUpdated(el, binding, vnode);
                });
            }
            else {
                setSelected(el, binding, vnode.context);
            }
            el._vOptions = [].map.call(el.options, getValue);
        }
        else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
            el._vModifiers = binding.modifiers;
            if (!binding.modifiers.lazy) {
                el.addEventListener('compositionstart', onCompositionStart);
                el.addEventListener('compositionend', onCompositionEnd);
                // Safari < 10.2 & UIWebView doesn't fire compositionend when
                // switching focus before confirming composition choice
                // this also fixes the issue where some browsers e.g. iOS Chrome
                // fires "change" instead of "input" on autocomplete.
                el.addEventListener('change', onCompositionEnd);
                /* istanbul ignore if */
                if (isIE9) {
                    el.vmodel = true;
                }
            }
        }
    },
    componentUpdated(el, binding, vnode) {
        if (vnode.tag === 'select') {
            setSelected(el, binding, vnode.context);
            // in case the options rendered by v-for have changed,
            // it's possible that the value is out-of-sync with the rendered options.
            // detect such cases and filter out values that no longer has a matching
            // option in the DOM.
            const prevOptions = el._vOptions;
            const curOptions = (el._vOptions = [].map.call(el.options, getValue));
            if (curOptions.some((o, i) => !looseEqual(o, prevOptions[i]))) {
                // trigger change event if
                // no matching option found for at least one value
                const needReset = el.multiple
                    ? binding.value.some(v => hasNoMatchingOption(v, curOptions))
                    : binding.value !== binding.oldValue &&
                        hasNoMatchingOption(binding.value, curOptions);
                if (needReset) {
                    trigger(el, 'change');
                }
            }
        }
    }
};
function setSelected(el, binding, vm) {
    actuallySetSelected(el, binding, vm);
    /* istanbul ignore if */
    if (isIE || isEdge) {
        setTimeout(() => {
            actuallySetSelected(el, binding, vm);
        }, 0);
    }
}
function actuallySetSelected(el, binding, vm) {
    const value = binding.value;
    const isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
        warn$2(`<select multiple v-model="${binding.expression}"> ` +
                `expects an Array value for its binding, but got ${Object.prototype.toString
                    .call(value)
                    .slice(8, -1)}`, vm);
        return;
    }
    let selected, option;
    for (let i = 0, l = el.options.length; i < l; i++) {
        option = el.options[i];
        if (isMultiple) {
            selected = looseIndexOf(value, getValue(option)) > -1;
            if (option.selected !== selected) {
                option.selected = selected;
            }
        }
        else {
            if (looseEqual(getValue(option), value)) {
                if (el.selectedIndex !== i) {
                    el.selectedIndex = i;
                }
                return;
            }
        }
    }
    if (!isMultiple) {
        el.selectedIndex = -1;
    }
}
function hasNoMatchingOption(value, options) {
    return options.every(o => !looseEqual(o, value));
}
function getValue(option) {
    return '_value' in option ? option._value : option.value;
}
function onCompositionStart(e) {
    e.target.composing = true;
}
function onCompositionEnd(e) {
    // prevent triggering an input event for no reason
    if (!e.target.composing)
        return;
    e.target.composing = false;
    trigger(e.target, 'input');
}
function trigger(el, type) {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
}

// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
    // @ts-expect-error
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
        ? locateNode(vnode.componentInstance._vnode)
        : vnode;
}
var show = {
    bind(el, { value }, vnode) {
        vnode = locateNode(vnode);
        const transition = vnode.data && vnode.data.transition;
        const originalDisplay = (el.__vOriginalDisplay =
            el.style.display === 'none' ? '' : el.style.display);
        if (value && transition) {
            vnode.data.show = true;
            enter(vnode, () => {
                el.style.display = originalDisplay;
            });
        }
        else {
            el.style.display = value ? originalDisplay : 'none';
        }
    },
    update(el, { value, oldValue }, vnode) {
        /* istanbul ignore if */
        if (!value === !oldValue)
            return;
        vnode = locateNode(vnode);
        const transition = vnode.data && vnode.data.transition;
        if (transition) {
            vnode.data.show = true;
            if (value) {
                enter(vnode, () => {
                    el.style.display = el.__vOriginalDisplay;
                });
            }
            else {
                leave(vnode, () => {
                    el.style.display = 'none';
                });
            }
        }
        else {
            el.style.display = value ? el.__vOriginalDisplay : 'none';
        }
    },
    unbind(el, binding, vnode, oldVnode, isDestroy) {
        if (!isDestroy) {
            el.style.display = el.__vOriginalDisplay;
        }
    }
};

var platformDirectives = {
    model: directive,
    show
};

// Provides transition support for a single element/component.
const transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
};
// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild(vnode) {
    const compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
        return getRealChild(getFirstComponentChild(compOptions.children));
    }
    else {
        return vnode;
    }
}
function extractTransitionData(comp) {
    const data = {};
    const options = comp.$options;
    // props
    for (const key in options.propsData) {
        data[key] = comp[key];
    }
    // events.
    // extract listeners and pass them directly to the transition methods
    const listeners = options._parentListeners;
    for (const key in listeners) {
        data[camelize(key)] = listeners[key];
    }
    return data;
}
function placeholder(h, rawChild) {
    // @ts-expect-error
    if (/\d-keep-alive$/.test(rawChild.tag)) {
        return h('keep-alive', {
            props: rawChild.componentOptions.propsData
        });
    }
}
function hasParentTransition(vnode) {
    while ((vnode = vnode.parent)) {
        if (vnode.data.transition) {
            return true;
        }
    }
}
function isSameChild(child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag;
}
const isNotTextNode = (c) => c.tag || isAsyncPlaceholder(c);
const isVShowDirective = d => d.name === 'show';
var Transition = {
    name: 'transition',
    props: transitionProps,
    abstract: true,
    render(h) {
        let children = this.$slots.default;
        if (!children) {
            return;
        }
        // filter out text nodes (possible whitespaces)
        children = children.filter(isNotTextNode);
        /* istanbul ignore if */
        if (!children.length) {
            return;
        }
        // warn multiple elements
        if (children.length > 1) {
            warn$2('<transition> can only be used on a single element. Use ' +
                '<transition-group> for lists.', this.$parent);
        }
        const mode = this.mode;
        // warn invalid mode
        if (mode && mode !== 'in-out' && mode !== 'out-in') {
            warn$2('invalid <transition> mode: ' + mode, this.$parent);
        }
        const rawChild = children[0];
        // if this is a component root node and the component's
        // parent container node also has transition, skip.
        if (hasParentTransition(this.$vnode)) {
            return rawChild;
        }
        // apply transition data to child
        // use getRealChild() to ignore abstract components e.g. keep-alive
        const child = getRealChild(rawChild);
        /* istanbul ignore if */
        if (!child) {
            return rawChild;
        }
        if (this._leaving) {
            return placeholder(h, rawChild);
        }
        // ensure a key that is unique to the vnode type and to this transition
        // component instance. This key will be used to remove pending leaving nodes
        // during entering.
        const id = `__transition-${this._uid}-`;
        child.key =
            child.key == null
                ? child.isComment
                    ? id + 'comment'
                    : id + child.tag
                : isPrimitive(child.key)
                    ? String(child.key).indexOf(id) === 0
                        ? child.key
                        : id + child.key
                    : child.key;
        const data = ((child.data || (child.data = {})).transition =
            extractTransitionData(this));
        const oldRawChild = this._vnode;
        const oldChild = getRealChild(oldRawChild);
        // mark v-show
        // so that the transition module can hand over the control to the directive
        if (child.data.directives && child.data.directives.some(isVShowDirective)) {
            child.data.show = true;
        }
        if (oldChild &&
            oldChild.data &&
            !isSameChild(child, oldChild) &&
            !isAsyncPlaceholder(oldChild) &&
            // #6687 component root is a comment node
            !(oldChild.componentInstance &&
                oldChild.componentInstance._vnode.isComment)) {
            // replace old child transition data with fresh one
            // important for dynamic transitions!
            const oldData = (oldChild.data.transition = extend({}, data));
            // handle transition mode
            if (mode === 'out-in') {
                // return placeholder node and queue update when leave finishes
                this._leaving = true;
                mergeVNodeHook(oldData, 'afterLeave', () => {
                    this._leaving = false;
                    this.$forceUpdate();
                });
                return placeholder(h, rawChild);
            }
            else if (mode === 'in-out') {
                if (isAsyncPlaceholder(child)) {
                    return oldRawChild;
                }
                let delayedLeave;
                const performLeave = () => {
                    delayedLeave();
                };
                mergeVNodeHook(data, 'afterEnter', performLeave);
                mergeVNodeHook(data, 'enterCancelled', performLeave);
                mergeVNodeHook(oldData, 'delayLeave', leave => {
                    delayedLeave = leave;
                });
            }
        }
        return rawChild;
    }
};

// Provides transition support for list items.
const props = extend({
    tag: String,
    moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
    props,
    beforeMount() {
        const update = this._update;
        this._update = (vnode, hydrating) => {
            const restoreActiveInstance = setActiveInstance(this);
            // force removing pass
            this.__patch__(this._vnode, this.kept, false, // hydrating
            true // removeOnly (!important, avoids unnecessary moves)
            );
            this._vnode = this.kept;
            restoreActiveInstance();
            update.call(this, vnode, hydrating);
        };
    },
    render(h) {
        const tag = this.tag || this.$vnode.data.tag || 'span';
        const map = Object.create(null);
        const prevChildren = (this.prevChildren = this.children);
        const rawChildren = this.$slots.default || [];
        const children = (this.children = []);
        const transitionData = extractTransitionData(this);
        for (let i = 0; i < rawChildren.length; i++) {
            const c = rawChildren[i];
            if (c.tag) {
                if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
                    children.push(c);
                    map[c.key] = c;
                    (c.data || (c.data = {})).transition = transitionData;
                }
                else {
                    const opts = c.componentOptions;
                    const name = opts
                        ? getComponentName(opts.Ctor.options) || opts.tag || ''
                        : c.tag;
                    warn$2(`<transition-group> children must be keyed: <${name}>`);
                }
            }
        }
        if (prevChildren) {
            const kept = [];
            const removed = [];
            for (let i = 0; i < prevChildren.length; i++) {
                const c = prevChildren[i];
                c.data.transition = transitionData;
                // @ts-expect-error .getBoundingClientRect is not typed in Node
                c.data.pos = c.elm.getBoundingClientRect();
                if (map[c.key]) {
                    kept.push(c);
                }
                else {
                    removed.push(c);
                }
            }
            this.kept = h(tag, null, kept);
            this.removed = removed;
        }
        return h(tag, null, children);
    },
    updated() {
        const children = this.prevChildren;
        const moveClass = this.moveClass || (this.name || 'v') + '-move';
        if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
            return;
        }
        // we divide the work into three loops to avoid mixing DOM reads and writes
        // in each iteration - which helps prevent layout thrashing.
        children.forEach(callPendingCbs);
        children.forEach(recordPosition);
        children.forEach(applyTranslation);
        // force reflow to put everything in position
        // assign to this to avoid being removed in tree-shaking
        // $flow-disable-line
        this._reflow = document.body.offsetHeight;
        children.forEach((c) => {
            if (c.data.moved) {
                const el = c.elm;
                const s = el.style;
                addTransitionClass(el, moveClass);
                s.transform = s.WebkitTransform = s.transitionDuration = '';
                el.addEventListener(transitionEndEvent, (el._moveCb = function cb(e) {
                    if (e && e.target !== el) {
                        return;
                    }
                    if (!e || /transform$/.test(e.propertyName)) {
                        el.removeEventListener(transitionEndEvent, cb);
                        el._moveCb = null;
                        removeTransitionClass(el, moveClass);
                    }
                }));
            }
        });
    },
    methods: {
        hasMove(el, moveClass) {
            /* istanbul ignore if */
            if (!hasTransition) {
                return false;
            }
            /* istanbul ignore if */
            if (this._hasMove) {
                return this._hasMove;
            }
            // Detect whether an element with the move class applied has
            // CSS transitions. Since the element may be inside an entering
            // transition at this very moment, we make a clone of it and remove
            // all other transition classes applied to ensure only the move class
            // is applied.
            const clone = el.cloneNode();
            if (el._transitionClasses) {
                el._transitionClasses.forEach((cls) => {
                    removeClass(clone, cls);
                });
            }
            addClass(clone, moveClass);
            clone.style.display = 'none';
            this.$el.appendChild(clone);
            const info = getTransitionInfo(clone);
            this.$el.removeChild(clone);
            return (this._hasMove = info.hasTransform);
        }
    }
};
function callPendingCbs(c) {
    /* istanbul ignore if */
    if (c.elm._moveCb) {
        c.elm._moveCb();
    }
    /* istanbul ignore if */
    if (c.elm._enterCb) {
        c.elm._enterCb();
    }
}
function recordPosition(c) {
    c.data.newPos = c.elm.getBoundingClientRect();
}
function applyTranslation(c) {
    const oldPos = c.data.pos;
    const newPos = c.data.newPos;
    const dx = oldPos.left - newPos.left;
    const dy = oldPos.top - newPos.top;
    if (dx || dy) {
        c.data.moved = true;
        const s = c.elm.style;
        s.transform = s.WebkitTransform = `translate(${dx}px,${dy}px)`;
        s.transitionDuration = '0s';
    }
}

var platformComponents = {
    Transition,
    TransitionGroup
};

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;
// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);
// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;
// public mount method
Vue.prototype.$mount = function (el, hydrating) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating);
};
// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
    setTimeout(() => {
        if (config.devtools) {
            if (devtools) {
                devtools.emit('init', Vue);
            }
            else {
                // @ts-expect-error
                console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' +
                    'https://github.com/vuejs/vue-devtools');
            }
        }
        if (config.productionTip !== false &&
            typeof console !== 'undefined') {
            // @ts-expect-error
            console[console.info ? 'info' : 'log'](`You are running Vue in development mode.\n` +
                `Make sure to turn on production mode when deploying for production.\n` +
                `See more tips at https://vuejs.org/guide/deployment.html`);
        }
    }, 0);
}

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
const buildRegex = cached(delimiters => {
    const open = delimiters[0].replace(regexEscapeRE, '\\$&');
    const close = delimiters[1].replace(regexEscapeRE, '\\$&');
    return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
});
function parseText(text, delimiters) {
    //@ts-expect-error
    const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
    if (!tagRE.test(text)) {
        return;
    }
    const tokens = [];
    const rawTokens = [];
    let lastIndex = (tagRE.lastIndex = 0);
    let match, index, tokenValue;
    while ((match = tagRE.exec(text))) {
        index = match.index;
        // push text token
        if (index > lastIndex) {
            rawTokens.push((tokenValue = text.slice(lastIndex, index)));
            tokens.push(JSON.stringify(tokenValue));
        }
        // tag token
        const exp = parseFilters(match[1].trim());
        tokens.push(`_s(${exp})`);
        rawTokens.push({ '@binding': exp });
        lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
        rawTokens.push((tokenValue = text.slice(lastIndex)));
        tokens.push(JSON.stringify(tokenValue));
    }
    return {
        expression: tokens.join('+'),
        tokens: rawTokens
    };
}

function transformNode$1(el, options) {
    const warn = options.warn || baseWarn;
    const staticClass = getAndRemoveAttr(el, 'class');
    if (staticClass) {
        const res = parseText(staticClass, options.delimiters);
        if (res) {
            warn(`class="${staticClass}": ` +
                'Interpolation inside attributes has been removed. ' +
                'Use v-bind or the colon shorthand instead. For example, ' +
                'instead of <div class="{{ val }}">, use <div :class="val">.', el.rawAttrsMap['class']);
        }
    }
    if (staticClass) {
        el.staticClass = JSON.stringify(staticClass.replace(/\s+/g, ' ').trim());
    }
    const classBinding = getBindingAttr(el, 'class', false /* getStatic */);
    if (classBinding) {
        el.classBinding = classBinding;
    }
}
function genData$2(el) {
    let data = '';
    if (el.staticClass) {
        data += `staticClass:${el.staticClass},`;
    }
    if (el.classBinding) {
        data += `class:${el.classBinding},`;
    }
    return data;
}
var klass = {
    staticKeys: ['staticClass'],
    transformNode: transformNode$1,
    genData: genData$2
};

function transformNode(el, options) {
    const warn = options.warn || baseWarn;
    const staticStyle = getAndRemoveAttr(el, 'style');
    if (staticStyle) {
        /* istanbul ignore if */
        {
            const res = parseText(staticStyle, options.delimiters);
            if (res) {
                warn(`style="${staticStyle}": ` +
                    'Interpolation inside attributes has been removed. ' +
                    'Use v-bind or the colon shorthand instead. For example, ' +
                    'instead of <div style="{{ val }}">, use <div :style="val">.', el.rawAttrsMap['style']);
            }
        }
        el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
    }
    const styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
    if (styleBinding) {
        el.styleBinding = styleBinding;
    }
}
function genData$1(el) {
    let data = '';
    if (el.staticStyle) {
        data += `staticStyle:${el.staticStyle},`;
    }
    if (el.styleBinding) {
        data += `style:(${el.styleBinding}),`;
    }
    return data;
}
var style = {
    staticKeys: ['staticStyle'],
    transformNode,
    genData: genData$1
};

let decoder;
var he = {
    decode(html) {
        decoder = decoder || document.createElement('div');
        decoder.innerHTML = html;
        return decoder.textContent;
    }
};

const isUnaryTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
    'link,meta,param,source,track,wbr');
// Elements that you can, intentionally, leave open
// (and which close themselves)
const canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source');
// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
const isNonPhrasingTag = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
    'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
    'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
    'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
    'title,tr,track');

/**
 * Not type-checking this file because it's mostly vendor code.
 */
// Regular Expressions for parsing tags and attributes
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/;
const conditionalComment = /^<!\[/;
// Special Elements (can contain anything)
const isPlainTextElement = makeMap('script,style,textarea', true);
const reCache = {};
const decodingMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&amp;': '&',
    '&#10;': '\n',
    '&#9;': '\t',
    '&#39;': "'"
};
const encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
const encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;
// #5992
const isIgnoreNewlineTag = makeMap('pre,textarea', true);
const shouldIgnoreFirstNewline = (tag, html) => tag && isIgnoreNewlineTag(tag) && html[0] === '\n';
function decodeAttr(value, shouldDecodeNewlines) {
    const re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
    return value.replace(re, match => decodingMap[match]);
}
function parseHTML(html, options) {
    const stack = [];
    const expectHTML = options.expectHTML;
    const isUnaryTag = options.isUnaryTag || no;
    const canBeLeftOpenTag = options.canBeLeftOpenTag || no;
    let index = 0;
    let last, lastTag;
    while (html) {
        last = html;
        // Make sure we're not in a plaintext content element like script/style
        if (!lastTag || !isPlainTextElement(lastTag)) {
            let textEnd = html.indexOf('<');
            if (textEnd === 0) {
                // Comment:
                if (comment.test(html)) {
                    const commentEnd = html.indexOf('-->');
                    if (commentEnd >= 0) {
                        if (options.shouldKeepComment && options.comment) {
                            options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
                        }
                        advance(commentEnd + 3);
                        continue;
                    }
                }
                // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
                if (conditionalComment.test(html)) {
                    const conditionalEnd = html.indexOf(']>');
                    if (conditionalEnd >= 0) {
                        advance(conditionalEnd + 2);
                        continue;
                    }
                }
                // Doctype:
                const doctypeMatch = html.match(doctype);
                if (doctypeMatch) {
                    advance(doctypeMatch[0].length);
                    continue;
                }
                // End tag:
                const endTagMatch = html.match(endTag);
                if (endTagMatch) {
                    const curIndex = index;
                    advance(endTagMatch[0].length);
                    parseEndTag(endTagMatch[1], curIndex, index);
                    continue;
                }
                // Start tag:
                const startTagMatch = parseStartTag();
                if (startTagMatch) {
                    handleStartTag(startTagMatch);
                    if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
                        advance(1);
                    }
                    continue;
                }
            }
            let text, rest, next;
            if (textEnd >= 0) {
                rest = html.slice(textEnd);
                while (!endTag.test(rest) &&
                    !startTagOpen.test(rest) &&
                    !comment.test(rest) &&
                    !conditionalComment.test(rest)) {
                    // < in plain text, be forgiving and treat it as text
                    next = rest.indexOf('<', 1);
                    if (next < 0)
                        break;
                    textEnd += next;
                    rest = html.slice(textEnd);
                }
                text = html.substring(0, textEnd);
            }
            if (textEnd < 0) {
                text = html;
            }
            if (text) {
                advance(text.length);
            }
            if (options.chars && text) {
                options.chars(text, index - text.length, index);
            }
        }
        else {
            let endTagLength = 0;
            const stackedTag = lastTag.toLowerCase();
            const reStackedTag = reCache[stackedTag] ||
                (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
            const rest = html.replace(reStackedTag, function (all, text, endTag) {
                endTagLength = endTag.length;
                if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
                    text = text
                        .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
                        .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
                }
                if (shouldIgnoreFirstNewline(stackedTag, text)) {
                    text = text.slice(1);
                }
                if (options.chars) {
                    options.chars(text);
                }
                return '';
            });
            index += html.length - rest.length;
            html = rest;
            parseEndTag(stackedTag, index - endTagLength, index);
        }
        if (html === last) {
            options.chars && options.chars(html);
            if (!stack.length && options.warn) {
                options.warn(`Mal-formatted tag at end of template: "${html}"`, {
                    start: index + html.length
                });
            }
            break;
        }
    }
    // Clean up any remaining tags
    parseEndTag();
    function advance(n) {
        index += n;
        html = html.substring(n);
    }
    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: [],
                start: index
            };
            advance(start[0].length);
            let end, attr;
            while (!(end = html.match(startTagClose)) &&
                (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
                attr.start = index;
                advance(attr[0].length);
                attr.end = index;
                match.attrs.push(attr);
            }
            if (end) {
                match.unarySlash = end[1];
                advance(end[0].length);
                match.end = index;
                return match;
            }
        }
    }
    function handleStartTag(match) {
        const tagName = match.tagName;
        const unarySlash = match.unarySlash;
        if (expectHTML) {
            if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
                parseEndTag(lastTag);
            }
            if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
                parseEndTag(tagName);
            }
        }
        const unary = isUnaryTag(tagName) || !!unarySlash;
        const l = match.attrs.length;
        const attrs = new Array(l);
        for (let i = 0; i < l; i++) {
            const args = match.attrs[i];
            const value = args[3] || args[4] || args[5] || '';
            const shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
                ? options.shouldDecodeNewlinesForHref
                : options.shouldDecodeNewlines;
            attrs[i] = {
                name: args[1],
                value: decodeAttr(value, shouldDecodeNewlines)
            };
            if (options.outputSourceRange) {
                attrs[i].start = args.start + args[0].match(/^\s*/).length;
                attrs[i].end = args.end;
            }
        }
        if (!unary) {
            stack.push({
                tag: tagName,
                lowerCasedTag: tagName.toLowerCase(),
                attrs: attrs,
                start: match.start,
                end: match.end
            });
            lastTag = tagName;
        }
        if (options.start) {
            options.start(tagName, attrs, unary, match.start, match.end);
        }
    }
    function parseEndTag(tagName, start, end) {
        let pos, lowerCasedTagName;
        if (start == null)
            start = index;
        if (end == null)
            end = index;
        // Find the closest opened tag of the same type
        if (tagName) {
            lowerCasedTagName = tagName.toLowerCase();
            for (pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos].lowerCasedTag === lowerCasedTagName) {
                    break;
                }
            }
        }
        else {
            // If no tag name is provided, clean shop
            pos = 0;
        }
        if (pos >= 0) {
            // Close all the open elements, up the stack
            for (let i = stack.length - 1; i >= pos; i--) {
                if ((i > pos || !tagName) && options.warn) {
                    options.warn(`tag <${stack[i].tag}> has no matching end tag.`, {
                        start: stack[i].start,
                        end: stack[i].end
                    });
                }
                if (options.end) {
                    options.end(stack[i].tag, start, end);
                }
            }
            // Remove the open elements from the stack
            stack.length = pos;
            lastTag = pos && stack[pos - 1].tag;
        }
        else if (lowerCasedTagName === 'br') {
            if (options.start) {
                options.start(tagName, [], true, start, end);
            }
        }
        else if (lowerCasedTagName === 'p') {
            if (options.start) {
                options.start(tagName, [], false, start, end);
            }
            if (options.end) {
                options.end(tagName, start, end);
            }
        }
    }
}

const onRE = /^@|^v-on:/;
const dirRE = /^v-|^@|^:|^#/;
const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
const stripParensRE = /^\(|\)$/g;
const dynamicArgRE = /^\[.*\]$/;
const argRE = /:(.*)$/;
const bindRE = /^:|^\.|^v-bind:/;
const modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;
const slotRE = /^v-slot(:|$)|^#/;
const lineBreakRE = /[\r\n]/;
const whitespaceRE = /[ \f\t\r\n]+/g;
const invalidAttributeRE = /[\s"'<>\/=]/;
const decodeHTMLCached = cached(he.decode);
const emptySlotScopeToken = `_empty_`;
// configurable state
let warn;
let delimiters;
let transforms;
let preTransforms;
let postTransforms;
let platformIsPreTag;
let platformMustUseProp;
let platformGetTagNamespace;
let maybeComponent;
function createASTElement(tag, attrs, parent) {
    return {
        type: 1,
        tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        rawAttrsMap: {},
        parent,
        children: []
    };
}
/**
 * Convert HTML string to AST.
 */
function parse(template, options) {
    warn = options.warn || baseWarn;
    platformIsPreTag = options.isPreTag || no;
    platformMustUseProp = options.mustUseProp || no;
    platformGetTagNamespace = options.getTagNamespace || no;
    const isReservedTag = options.isReservedTag || no;
    maybeComponent = (el) => !!(el.component ||
        el.attrsMap[':is'] ||
        el.attrsMap['v-bind:is'] ||
        !(el.attrsMap.is ? isReservedTag(el.attrsMap.is) : isReservedTag(el.tag)));
    transforms = pluckModuleFunction(options.modules, 'transformNode');
    preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
    postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
    delimiters = options.delimiters;
    const stack = [];
    const preserveWhitespace = options.preserveWhitespace !== false;
    const whitespaceOption = options.whitespace;
    let root;
    let currentParent;
    let inVPre = false;
    let inPre = false;
    let warned = false;
    function warnOnce(msg, range) {
        if (!warned) {
            warned = true;
            warn(msg, range);
        }
    }
    function closeElement(element) {
        trimEndingWhitespace(element);
        if (!inVPre && !element.processed) {
            element = processElement(element, options);
        }
        // tree management
        if (!stack.length && element !== root) {
            // allow root elements with v-if, v-else-if and v-else
            if (root.if && (element.elseif || element.else)) {
                {
                    checkRootConstraints(element);
                }
                addIfCondition(root, {
                    exp: element.elseif,
                    block: element
                });
            }
            else {
                warnOnce(`Component template should contain exactly one root element. ` +
                    `If you are using v-if on multiple elements, ` +
                    `use v-else-if to chain them instead.`, { start: element.start });
            }
        }
        if (currentParent && !element.forbidden) {
            if (element.elseif || element.else) {
                processIfConditions(element, currentParent);
            }
            else {
                if (element.slotScope) {
                    // scoped slot
                    // keep it in the children list so that v-else(-if) conditions can
                    // find it as the prev node.
                    const name = element.slotTarget || '"default"';
                    (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
                }
                currentParent.children.push(element);
                element.parent = currentParent;
            }
        }
        // final children cleanup
        // filter out scoped slots
        element.children = element.children.filter(c => !c.slotScope);
        // remove trailing whitespace node again
        trimEndingWhitespace(element);
        // check pre state
        if (element.pre) {
            inVPre = false;
        }
        if (platformIsPreTag(element.tag)) {
            inPre = false;
        }
        // apply post-transforms
        for (let i = 0; i < postTransforms.length; i++) {
            postTransforms[i](element, options);
        }
    }
    function trimEndingWhitespace(el) {
        // remove trailing whitespace node
        if (!inPre) {
            let lastNode;
            while ((lastNode = el.children[el.children.length - 1]) &&
                lastNode.type === 3 &&
                lastNode.text === ' ') {
                el.children.pop();
            }
        }
    }
    function checkRootConstraints(el) {
        if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(`Cannot use <${el.tag}> as component root element because it may ` +
                'contain multiple nodes.', { start: el.start });
        }
        if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce('Cannot use v-for on stateful component root element because ' +
                'it renders multiple elements.', el.rawAttrsMap['v-for']);
        }
    }
    parseHTML(template, {
        warn,
        expectHTML: options.expectHTML,
        isUnaryTag: options.isUnaryTag,
        canBeLeftOpenTag: options.canBeLeftOpenTag,
        shouldDecodeNewlines: options.shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
        shouldKeepComment: options.comments,
        outputSourceRange: options.outputSourceRange,
        start(tag, attrs, unary, start, end) {
            // check namespace.
            // inherit parent ns if there is one
            const ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);
            // handle IE svg bug
            /* istanbul ignore if */
            if (isIE && ns === 'svg') {
                attrs = guardIESVGBug(attrs);
            }
            let element = createASTElement(tag, attrs, currentParent);
            if (ns) {
                element.ns = ns;
            }
            {
                if (options.outputSourceRange) {
                    element.start = start;
                    element.end = end;
                    element.rawAttrsMap = element.attrsList.reduce((cumulated, attr) => {
                        cumulated[attr.name] = attr;
                        return cumulated;
                    }, {});
                }
                attrs.forEach(attr => {
                    if (invalidAttributeRE.test(attr.name)) {
                        warn(`Invalid dynamic argument expression: attribute names cannot contain ` +
                            `spaces, quotes, <, >, / or =.`, options.outputSourceRange
                            ? {
                                start: attr.start + attr.name.indexOf(`[`),
                                end: attr.start + attr.name.length
                            }
                            : undefined);
                    }
                });
            }
            if (isForbiddenTag(element) && !isServerRendering()) {
                element.forbidden = true;
                warn('Templates should only be responsible for mapping the state to the ' +
                        'UI. Avoid placing tags with side-effects in your templates, such as ' +
                        `<${tag}>` +
                        ', as they will not be parsed.', { start: element.start });
            }
            // apply pre-transforms
            for (let i = 0; i < preTransforms.length; i++) {
                element = preTransforms[i](element, options) || element;
            }
            if (!inVPre) {
                processPre(element);
                if (element.pre) {
                    inVPre = true;
                }
            }
            if (platformIsPreTag(element.tag)) {
                inPre = true;
            }
            if (inVPre) {
                processRawAttrs(element);
            }
            else if (!element.processed) {
                // structural directives
                processFor(element);
                processIf(element);
                processOnce(element);
            }
            if (!root) {
                root = element;
                {
                    checkRootConstraints(root);
                }
            }
            if (!unary) {
                currentParent = element;
                stack.push(element);
            }
            else {
                closeElement(element);
            }
        },
        end(tag, start, end) {
            const element = stack[stack.length - 1];
            // pop stack
            stack.length -= 1;
            currentParent = stack[stack.length - 1];
            if (options.outputSourceRange) {
                element.end = end;
            }
            closeElement(element);
        },
        chars(text, start, end) {
            if (!currentParent) {
                {
                    if (text === template) {
                        warnOnce('Component template requires a root element, rather than just text.', { start });
                    }
                    else if ((text = text.trim())) {
                        warnOnce(`text "${text}" outside root element will be ignored.`, {
                            start
                        });
                    }
                }
                return;
            }
            // IE textarea placeholder bug
            /* istanbul ignore if */
            if (isIE &&
                currentParent.tag === 'textarea' &&
                currentParent.attrsMap.placeholder === text) {
                return;
            }
            const children = currentParent.children;
            if (inPre || text.trim()) {
                text = isTextTag(currentParent)
                    ? text
                    : decodeHTMLCached(text);
            }
            else if (!children.length) {
                // remove the whitespace-only node right after an opening tag
                text = '';
            }
            else if (whitespaceOption) {
                if (whitespaceOption === 'condense') {
                    // in condense mode, remove the whitespace node if it contains
                    // line break, otherwise condense to a single space
                    text = lineBreakRE.test(text) ? '' : ' ';
                }
                else {
                    text = ' ';
                }
            }
            else {
                text = preserveWhitespace ? ' ' : '';
            }
            if (text) {
                if (!inPre && whitespaceOption === 'condense') {
                    // condense consecutive whitespaces into single space
                    text = text.replace(whitespaceRE, ' ');
                }
                let res;
                let child;
                if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
                    child = {
                        type: 2,
                        expression: res.expression,
                        tokens: res.tokens,
                        text
                    };
                }
                else if (text !== ' ' ||
                    !children.length ||
                    children[children.length - 1].text !== ' ') {
                    child = {
                        type: 3,
                        text
                    };
                }
                if (child) {
                    if (options.outputSourceRange) {
                        child.start = start;
                        child.end = end;
                    }
                    children.push(child);
                }
            }
        },
        comment(text, start, end) {
            // adding anything as a sibling to the root node is forbidden
            // comments should still be allowed, but ignored
            if (currentParent) {
                const child = {
                    type: 3,
                    text,
                    isComment: true
                };
                if (options.outputSourceRange) {
                    child.start = start;
                    child.end = end;
                }
                currentParent.children.push(child);
            }
        }
    });
    return root;
}
function processPre(el) {
    if (getAndRemoveAttr(el, 'v-pre') != null) {
        el.pre = true;
    }
}
function processRawAttrs(el) {
    const list = el.attrsList;
    const len = list.length;
    if (len) {
        const attrs = (el.attrs = new Array(len));
        for (let i = 0; i < len; i++) {
            attrs[i] = {
                name: list[i].name,
                value: JSON.stringify(list[i].value)
            };
            if (list[i].start != null) {
                attrs[i].start = list[i].start;
                attrs[i].end = list[i].end;
            }
        }
    }
    else if (!el.pre) {
        // non root node in pre blocks with no attributes
        el.plain = true;
    }
}
function processElement(element, options) {
    processKey(element);
    // determine whether this is a plain element after
    // removing structural attributes
    element.plain =
        !element.key && !element.scopedSlots && !element.attrsList.length;
    processRef(element);
    processSlotContent(element);
    processSlotOutlet(element);
    processComponent(element);
    for (let i = 0; i < transforms.length; i++) {
        element = transforms[i](element, options) || element;
    }
    processAttrs(element);
    return element;
}
function processKey(el) {
    const exp = getBindingAttr(el, 'key');
    if (exp) {
        {
            if (el.tag === 'template') {
                warn(`<template> cannot be keyed. Place the key on real elements instead.`, getRawBindingAttr(el, 'key'));
            }
            if (el.for) {
                const iterator = el.iterator2 || el.iterator1;
                const parent = el.parent;
                if (iterator &&
                    iterator === exp &&
                    parent &&
                    parent.tag === 'transition-group') {
                    warn(`Do not use v-for index as key on <transition-group> children, ` +
                        `this is the same as not using keys.`, getRawBindingAttr(el, 'key'), true /* tip */);
                }
            }
        }
        el.key = exp;
    }
}
function processRef(el) {
    const ref = getBindingAttr(el, 'ref');
    if (ref) {
        el.ref = ref;
        el.refInFor = checkInFor(el);
    }
}
function processFor(el) {
    let exp;
    if ((exp = getAndRemoveAttr(el, 'v-for'))) {
        const res = parseFor(exp);
        if (res) {
            extend(el, res);
        }
        else {
            warn(`Invalid v-for expression: ${exp}`, el.rawAttrsMap['v-for']);
        }
    }
}
function parseFor(exp) {
    const inMatch = exp.match(forAliasRE);
    if (!inMatch)
        return;
    const res = {};
    res.for = inMatch[2].trim();
    const alias = inMatch[1].trim().replace(stripParensRE, '');
    const iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
        res.alias = alias.replace(forIteratorRE, '').trim();
        res.iterator1 = iteratorMatch[1].trim();
        if (iteratorMatch[2]) {
            res.iterator2 = iteratorMatch[2].trim();
        }
    }
    else {
        res.alias = alias;
    }
    return res;
}
function processIf(el) {
    const exp = getAndRemoveAttr(el, 'v-if');
    if (exp) {
        el.if = exp;
        addIfCondition(el, {
            exp: exp,
            block: el
        });
    }
    else {
        if (getAndRemoveAttr(el, 'v-else') != null) {
            el.else = true;
        }
        const elseif = getAndRemoveAttr(el, 'v-else-if');
        if (elseif) {
            el.elseif = elseif;
        }
    }
}
function processIfConditions(el, parent) {
    const prev = findPrevElement(parent.children);
    if (prev && prev.if) {
        addIfCondition(prev, {
            exp: el.elseif,
            block: el
        });
    }
    else {
        warn(`v-${el.elseif ? 'else-if="' + el.elseif + '"' : 'else'} ` +
            `used on element <${el.tag}> without corresponding v-if.`, el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']);
    }
}
function findPrevElement(children) {
    let i = children.length;
    while (i--) {
        if (children[i].type === 1) {
            return children[i];
        }
        else {
            if (children[i].text !== ' ') {
                warn(`text "${children[i].text.trim()}" between v-if and v-else(-if) ` +
                    `will be ignored.`, children[i]);
            }
            children.pop();
        }
    }
}
function addIfCondition(el, condition) {
    if (!el.ifConditions) {
        el.ifConditions = [];
    }
    el.ifConditions.push(condition);
}
function processOnce(el) {
    const once = getAndRemoveAttr(el, 'v-once');
    if (once != null) {
        el.once = true;
    }
}
// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent(el) {
    let slotScope;
    if (el.tag === 'template') {
        slotScope = getAndRemoveAttr(el, 'scope');
        /* istanbul ignore if */
        if (slotScope) {
            warn(`the "scope" attribute for scoped slots have been deprecated and ` +
                `replaced by "slot-scope" since 2.5. The new "slot-scope" attribute ` +
                `can also be used on plain elements in addition to <template> to ` +
                `denote scoped slots.`, el.rawAttrsMap['scope'], true);
        }
        el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    }
    else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
        /* istanbul ignore if */
        if (el.attrsMap['v-for']) {
            warn(`Ambiguous combined usage of slot-scope and v-for on <${el.tag}> ` +
                `(v-for takes higher priority). Use a wrapper <template> for the ` +
                `scoped slot to make it clearer.`, el.rawAttrsMap['slot-scope'], true);
        }
        el.slotScope = slotScope;
    }
    // slot="xxx"
    const slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
        el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
        el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
        // preserve slot as an attribute for native shadow DOM compat
        // only for non-scoped slots.
        if (el.tag !== 'template' && !el.slotScope) {
            addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
        }
    }
    // 2.6 v-slot syntax
    {
        if (el.tag === 'template') {
            // v-slot on <template>
            const slotBinding = getAndRemoveAttrByRegex(el, slotRE);
            if (slotBinding) {
                {
                    if (el.slotTarget || el.slotScope) {
                        warn(`Unexpected mixed usage of different slot syntaxes.`, el);
                    }
                    if (el.parent && !maybeComponent(el.parent)) {
                        warn(`<template v-slot> can only appear at the root level inside ` +
                            `the receiving component`, el);
                    }
                }
                const { name, dynamic } = getSlotName(slotBinding);
                el.slotTarget = name;
                el.slotTargetDynamic = dynamic;
                el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
            }
        }
        else {
            // v-slot on component, denotes default slot
            const slotBinding = getAndRemoveAttrByRegex(el, slotRE);
            if (slotBinding) {
                {
                    if (!maybeComponent(el)) {
                        warn(`v-slot can only be used on components or <template>.`, slotBinding);
                    }
                    if (el.slotScope || el.slotTarget) {
                        warn(`Unexpected mixed usage of different slot syntaxes.`, el);
                    }
                    if (el.scopedSlots) {
                        warn(`To avoid scope ambiguity, the default slot should also use ` +
                            `<template> syntax when there are other named slots.`, slotBinding);
                    }
                }
                // add the component's children to its default slot
                const slots = el.scopedSlots || (el.scopedSlots = {});
                const { name, dynamic } = getSlotName(slotBinding);
                const slotContainer = (slots[name] = createASTElement('template', [], el));
                slotContainer.slotTarget = name;
                slotContainer.slotTargetDynamic = dynamic;
                slotContainer.children = el.children.filter((c) => {
                    if (!c.slotScope) {
                        c.parent = slotContainer;
                        return true;
                    }
                });
                slotContainer.slotScope = slotBinding.value || emptySlotScopeToken;
                // remove children as they are returned from scopedSlots now
                el.children = [];
                // mark el non-plain so data gets generated
                el.plain = false;
            }
        }
    }
}
function getSlotName(binding) {
    let name = binding.name.replace(slotRE, '');
    if (!name) {
        if (binding.name[0] !== '#') {
            name = 'default';
        }
        else {
            warn(`v-slot shorthand syntax requires a slot name.`, binding);
        }
    }
    return dynamicArgRE.test(name)
        ? // dynamic [name]
            { name: name.slice(1, -1), dynamic: true }
        : // static name
            { name: `"${name}"`, dynamic: false };
}
// handle <slot/> outlets
function processSlotOutlet(el) {
    if (el.tag === 'slot') {
        el.slotName = getBindingAttr(el, 'name');
        if (el.key) {
            warn(`\`key\` does not work on <slot> because slots are abstract outlets ` +
                `and can possibly expand into multiple elements. ` +
                `Use the key on a wrapping element instead.`, getRawBindingAttr(el, 'key'));
        }
    }
}
function processComponent(el) {
    let binding;
    if ((binding = getBindingAttr(el, 'is'))) {
        el.component = binding;
    }
    if (getAndRemoveAttr(el, 'inline-template') != null) {
        el.inlineTemplate = true;
    }
}
function processAttrs(el) {
    const list = el.attrsList;
    let i, l, name, rawName, value, modifiers, syncGen, isDynamic;
    for (i = 0, l = list.length; i < l; i++) {
        name = rawName = list[i].name;
        value = list[i].value;
        if (dirRE.test(name)) {
            // mark element as dynamic
            el.hasBindings = true;
            // modifiers
            modifiers = parseModifiers(name.replace(dirRE, ''));
            // support .foo shorthand syntax for the .prop modifier
            if (modifiers) {
                name = name.replace(modifierRE, '');
            }
            if (bindRE.test(name)) {
                // v-bind
                name = name.replace(bindRE, '');
                value = parseFilters(value);
                isDynamic = dynamicArgRE.test(name);
                if (isDynamic) {
                    name = name.slice(1, -1);
                }
                if (value.trim().length === 0) {
                    warn(`The value for a v-bind expression cannot be empty. Found in "v-bind:${name}"`);
                }
                if (modifiers) {
                    if (modifiers.prop && !isDynamic) {
                        name = camelize(name);
                        if (name === 'innerHtml')
                            name = 'innerHTML';
                    }
                    if (modifiers.camel && !isDynamic) {
                        name = camelize(name);
                    }
                    if (modifiers.sync) {
                        syncGen = genAssignmentCode(value, `$event`);
                        if (!isDynamic) {
                            addHandler(el, `update:${camelize(name)}`, syncGen, null, false, warn, list[i]);
                            if (hyphenate(name) !== camelize(name)) {
                                addHandler(el, `update:${hyphenate(name)}`, syncGen, null, false, warn, list[i]);
                            }
                        }
                        else {
                            // handler w/ dynamic event name
                            addHandler(el, `"update:"+(${name})`, syncGen, null, false, warn, list[i], true // dynamic
                            );
                        }
                    }
                }
                if ((modifiers && modifiers.prop) ||
                    (!el.component && platformMustUseProp(el.tag, el.attrsMap.type, name))) {
                    addProp(el, name, value, list[i], isDynamic);
                }
                else {
                    addAttr(el, name, value, list[i], isDynamic);
                }
            }
            else if (onRE.test(name)) {
                // v-on
                name = name.replace(onRE, '');
                isDynamic = dynamicArgRE.test(name);
                if (isDynamic) {
                    name = name.slice(1, -1);
                }
                addHandler(el, name, value, modifiers, false, warn, list[i], isDynamic);
            }
            else {
                // normal directives
                name = name.replace(dirRE, '');
                // parse arg
                const argMatch = name.match(argRE);
                let arg = argMatch && argMatch[1];
                isDynamic = false;
                if (arg) {
                    name = name.slice(0, -(arg.length + 1));
                    if (dynamicArgRE.test(arg)) {
                        arg = arg.slice(1, -1);
                        isDynamic = true;
                    }
                }
                addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
                if (name === 'model') {
                    checkForAliasModel(el, value);
                }
            }
        }
        else {
            // literal attribute
            {
                const res = parseText(value, delimiters);
                if (res) {
                    warn(`${name}="${value}": ` +
                        'Interpolation inside attributes has been removed. ' +
                        'Use v-bind or the colon shorthand instead. For example, ' +
                        'instead of <div id="{{ val }}">, use <div :id="val">.', list[i]);
                }
            }
            addAttr(el, name, JSON.stringify(value), list[i]);
            // #6887 firefox doesn't update muted state if set via attribute
            // even immediately after element creation
            if (!el.component &&
                name === 'muted' &&
                platformMustUseProp(el.tag, el.attrsMap.type, name)) {
                addProp(el, name, 'true', list[i]);
            }
        }
    }
}
function checkInFor(el) {
    let parent = el;
    while (parent) {
        if (parent.for !== undefined) {
            return true;
        }
        parent = parent.parent;
    }
    return false;
}
function parseModifiers(name) {
    const match = name.match(modifierRE);
    if (match) {
        const ret = {};
        match.forEach(m => {
            ret[m.slice(1)] = true;
        });
        return ret;
    }
}
function makeAttrsMap(attrs) {
    const map = {};
    for (let i = 0, l = attrs.length; i < l; i++) {
        if (map[attrs[i].name] && !isIE && !isEdge) {
            warn('duplicate attribute: ' + attrs[i].name, attrs[i]);
        }
        map[attrs[i].name] = attrs[i].value;
    }
    return map;
}
// for script (e.g. type="x/template") or style, do not decode content
function isTextTag(el) {
    return el.tag === 'script' || el.tag === 'style';
}
function isForbiddenTag(el) {
    return (el.tag === 'style' ||
        (el.tag === 'script' &&
            (!el.attrsMap.type || el.attrsMap.type === 'text/javascript')));
}
const ieNSBug = /^xmlns:NS\d+/;
const ieNSPrefix = /^NS\d+:/;
/* istanbul ignore next */
function guardIESVGBug(attrs) {
    const res = [];
    for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        if (!ieNSBug.test(attr.name)) {
            attr.name = attr.name.replace(ieNSPrefix, '');
            res.push(attr);
        }
    }
    return res;
}
function checkForAliasModel(el, value) {
    let _el = el;
    while (_el) {
        if (_el.for && _el.alias === value) {
            warn(`<${el.tag} v-model="${value}">: ` +
                `You are binding v-model directly to a v-for iteration alias. ` +
                `This will not be able to modify the v-for source array because ` +
                `writing to the alias is like modifying a function local variable. ` +
                `Consider using an array of objects and use v-model on an object property instead.`, el.rawAttrsMap['v-model']);
        }
        _el = _el.parent;
    }
}

/**
 * Expand input[v-model] with dynamic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */
function preTransformNode(el, options) {
    if (el.tag === 'input') {
        const map = el.attrsMap;
        if (!map['v-model']) {
            return;
        }
        let typeBinding;
        if (map[':type'] || map['v-bind:type']) {
            typeBinding = getBindingAttr(el, 'type');
        }
        if (!map.type && !typeBinding && map['v-bind']) {
            typeBinding = `(${map['v-bind']}).type`;
        }
        if (typeBinding) {
            const ifCondition = getAndRemoveAttr(el, 'v-if', true);
            const ifConditionExtra = ifCondition ? `&&(${ifCondition})` : ``;
            const hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
            const elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
            // 1. checkbox
            const branch0 = cloneASTElement(el);
            // process for on the main node
            processFor(branch0);
            addRawAttr(branch0, 'type', 'checkbox');
            processElement(branch0, options);
            branch0.processed = true; // prevent it from double-processed
            branch0.if = `(${typeBinding})==='checkbox'` + ifConditionExtra;
            addIfCondition(branch0, {
                exp: branch0.if,
                block: branch0
            });
            // 2. add radio else-if condition
            const branch1 = cloneASTElement(el);
            getAndRemoveAttr(branch1, 'v-for', true);
            addRawAttr(branch1, 'type', 'radio');
            processElement(branch1, options);
            addIfCondition(branch0, {
                exp: `(${typeBinding})==='radio'` + ifConditionExtra,
                block: branch1
            });
            // 3. other
            const branch2 = cloneASTElement(el);
            getAndRemoveAttr(branch2, 'v-for', true);
            addRawAttr(branch2, ':type', typeBinding);
            processElement(branch2, options);
            addIfCondition(branch0, {
                exp: ifCondition,
                block: branch2
            });
            if (hasElse) {
                branch0.else = true;
            }
            else if (elseIfCondition) {
                branch0.elseif = elseIfCondition;
            }
            return branch0;
        }
    }
}
function cloneASTElement(el) {
    return createASTElement(el.tag, el.attrsList.slice(), el.parent);
}
var model = {
    preTransformNode
};

var modules = [klass, style, model];

function text(el, dir) {
    if (dir.value) {
        addProp(el, 'textContent', `_s(${dir.value})`, dir);
    }
}

function html(el, dir) {
    if (dir.value) {
        addProp(el, 'innerHTML', `_s(${dir.value})`, dir);
    }
}

var directives = {
    model: model$1,
    text,
    html
};

const baseOptions = {
    expectHTML: true,
    modules,
    directives,
    isPreTag,
    isUnaryTag,
    mustUseProp,
    canBeLeftOpenTag,
    isReservedTag,
    getTagNamespace,
    staticKeys: genStaticKeys$1(modules)
};

let isStaticKey;
let isPlatformReservedTag;
const genStaticKeysCached = cached(genStaticKeys);
/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize(root, options) {
    if (!root)
        return;
    isStaticKey = genStaticKeysCached(options.staticKeys || '');
    isPlatformReservedTag = options.isReservedTag || no;
    // first pass: mark all non-static nodes.
    markStatic(root);
    // second pass: mark static roots.
    markStaticRoots(root, false);
}
function genStaticKeys(keys) {
    return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
        (keys ? ',' + keys : ''));
}
function markStatic(node) {
    node.static = isStatic(node);
    if (node.type === 1) {
        // do not make component slot content static. this avoids
        // 1. components not able to mutate slot nodes
        // 2. static slot content fails for hot-reloading
        if (!isPlatformReservedTag(node.tag) &&
            node.tag !== 'slot' &&
            node.attrsMap['inline-template'] == null) {
            return;
        }
        for (let i = 0, l = node.children.length; i < l; i++) {
            const child = node.children[i];
            markStatic(child);
            if (!child.static) {
                node.static = false;
            }
        }
        if (node.ifConditions) {
            for (let i = 1, l = node.ifConditions.length; i < l; i++) {
                const block = node.ifConditions[i].block;
                markStatic(block);
                if (!block.static) {
                    node.static = false;
                }
            }
        }
    }
}
function markStaticRoots(node, isInFor) {
    if (node.type === 1) {
        if (node.static || node.once) {
            node.staticInFor = isInFor;
        }
        // For a node to qualify as a static root, it should have children that
        // are not just static text. Otherwise the cost of hoisting out will
        // outweigh the benefits and it's better off to just always render it fresh.
        if (node.static &&
            node.children.length &&
            !(node.children.length === 1 && node.children[0].type === 3)) {
            node.staticRoot = true;
            return;
        }
        else {
            node.staticRoot = false;
        }
        if (node.children) {
            for (let i = 0, l = node.children.length; i < l; i++) {
                markStaticRoots(node.children[i], isInFor || !!node.for);
            }
        }
        if (node.ifConditions) {
            for (let i = 1, l = node.ifConditions.length; i < l; i++) {
                markStaticRoots(node.ifConditions[i].block, isInFor);
            }
        }
    }
}
function isStatic(node) {
    if (node.type === 2) {
        // expression
        return false;
    }
    if (node.type === 3) {
        // text
        return true;
    }
    return !!(node.pre ||
        (!node.hasBindings && // no dynamic bindings
            !node.if &&
            !node.for && // not v-if or v-for or v-else
            !isBuiltInTag(node.tag) && // not a built-in
            isPlatformReservedTag(node.tag) && // not a component
            !isDirectChildOfTemplateFor(node) &&
            Object.keys(node).every(isStaticKey)));
}
function isDirectChildOfTemplateFor(node) {
    while (node.parent) {
        node = node.parent;
        if (node.tag !== 'template') {
            return false;
        }
        if (node.for) {
            return true;
        }
    }
    return false;
}

const fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
const fnInvokeRE = /\([^)]*?\);*$/;
const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
// KeyboardEvent.keyCode aliases
const keyCodes = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    delete: [8, 46]
};
// KeyboardEvent.key aliases
const keyNames = {
    // #7880: IE11 and Edge use `Esc` for Escape key name.
    esc: ['Esc', 'Escape'],
    tab: 'Tab',
    enter: 'Enter',
    // #9112: IE11 uses `Spacebar` for Space key name.
    space: [' ', 'Spacebar'],
    // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
    up: ['Up', 'ArrowUp'],
    left: ['Left', 'ArrowLeft'],
    right: ['Right', 'ArrowRight'],
    down: ['Down', 'ArrowDown'],
    // #9112: IE11 uses `Del` for Delete key name.
    delete: ['Backspace', 'Delete', 'Del']
};
// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
const genGuard = condition => `if(${condition})return null;`;
const modifierCode = {
    stop: '$event.stopPropagation();',
    prevent: '$event.preventDefault();',
    self: genGuard(`$event.target !== $event.currentTarget`),
    ctrl: genGuard(`!$event.ctrlKey`),
    shift: genGuard(`!$event.shiftKey`),
    alt: genGuard(`!$event.altKey`),
    meta: genGuard(`!$event.metaKey`),
    left: genGuard(`'button' in $event && $event.button !== 0`),
    middle: genGuard(`'button' in $event && $event.button !== 1`),
    right: genGuard(`'button' in $event && $event.button !== 2`)
};
function genHandlers(events, isNative) {
    const prefix = isNative ? 'nativeOn:' : 'on:';
    let staticHandlers = ``;
    let dynamicHandlers = ``;
    for (const name in events) {
        const handlerCode = genHandler(events[name]);
        //@ts-expect-error
        if (events[name] && events[name].dynamic) {
            dynamicHandlers += `${name},${handlerCode},`;
        }
        else {
            staticHandlers += `"${name}":${handlerCode},`;
        }
    }
    staticHandlers = `{${staticHandlers.slice(0, -1)}}`;
    if (dynamicHandlers) {
        return prefix + `_d(${staticHandlers},[${dynamicHandlers.slice(0, -1)}])`;
    }
    else {
        return prefix + staticHandlers;
    }
}
function genHandler(handler) {
    if (!handler) {
        return 'function(){}';
    }
    if (Array.isArray(handler)) {
        return `[${handler.map(handler => genHandler(handler)).join(',')}]`;
    }
    const isMethodPath = simplePathRE.test(handler.value);
    const isFunctionExpression = fnExpRE.test(handler.value);
    const isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));
    if (!handler.modifiers) {
        if (isMethodPath || isFunctionExpression) {
            return handler.value;
        }
        return `function($event){${isFunctionInvocation ? `return ${handler.value}` : handler.value}}`; // inline statement
    }
    else {
        let code = '';
        let genModifierCode = '';
        const keys = [];
        for (const key in handler.modifiers) {
            if (modifierCode[key]) {
                genModifierCode += modifierCode[key];
                // left/right
                if (keyCodes[key]) {
                    keys.push(key);
                }
            }
            else if (key === 'exact') {
                const modifiers = handler.modifiers;
                genModifierCode += genGuard(['ctrl', 'shift', 'alt', 'meta']
                    .filter(keyModifier => !modifiers[keyModifier])
                    .map(keyModifier => `$event.${keyModifier}Key`)
                    .join('||'));
            }
            else {
                keys.push(key);
            }
        }
        if (keys.length) {
            code += genKeyFilter(keys);
        }
        // Make sure modifiers like prevent and stop get executed after key filtering
        if (genModifierCode) {
            code += genModifierCode;
        }
        const handlerCode = isMethodPath
            ? `return ${handler.value}.apply(null, arguments)`
            : isFunctionExpression
                ? `return (${handler.value}).apply(null, arguments)`
                : isFunctionInvocation
                    ? `return ${handler.value}`
                    : handler.value;
        return `function($event){${code}${handlerCode}}`;
    }
}
function genKeyFilter(keys) {
    return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    `if(!$event.type.indexOf('key')&&` +
        `${keys.map(genFilterCode).join('&&')})return null;`);
}
function genFilterCode(key) {
    const keyVal = parseInt(key, 10);
    if (keyVal) {
        return `$event.keyCode!==${keyVal}`;
    }
    const keyCode = keyCodes[key];
    const keyName = keyNames[key];
    return (`_k($event.keyCode,` +
        `${JSON.stringify(key)},` +
        `${JSON.stringify(keyCode)},` +
        `$event.key,` +
        `${JSON.stringify(keyName)}` +
        `)`);
}

function on(el, dir) {
    if (dir.modifiers) {
        warn$2(`v-on without argument does not support modifiers.`);
    }
    el.wrapListeners = (code) => `_g(${code},${dir.value})`;
}

function bind(el, dir) {
    el.wrapData = (code) => {
        return `_b(${code},'${el.tag}',${dir.value},${dir.modifiers && dir.modifiers.prop ? 'true' : 'false'}${dir.modifiers && dir.modifiers.sync ? ',true' : ''})`;
    };
}

var baseDirectives = {
    on,
    bind,
    cloak: noop
};

class CodegenState {
    constructor(options) {
        this.options = options;
        this.warn = options.warn || baseWarn;
        this.transforms = pluckModuleFunction(options.modules, 'transformCode');
        this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
        this.directives = extend(extend({}, baseDirectives), options.directives);
        const isReservedTag = options.isReservedTag || no;
        this.maybeComponent = (el) => !!el.component || !isReservedTag(el.tag);
        this.onceId = 0;
        this.staticRenderFns = [];
        this.pre = false;
    }
}
function generate(ast, options) {
    const state = new CodegenState(options);
    // fix #11483, Root level <script> tags should not be rendered.
    const code = ast
        ? ast.tag === 'script'
            ? 'null'
            : genElement(ast, state)
        : '_c("div")';
    return {
        render: `with(this){return ${code}}`,
        staticRenderFns: state.staticRenderFns
    };
}
function genElement(el, state) {
    if (el.parent) {
        el.pre = el.pre || el.parent.pre;
    }
    if (el.staticRoot && !el.staticProcessed) {
        return genStatic(el, state);
    }
    else if (el.once && !el.onceProcessed) {
        return genOnce(el, state);
    }
    else if (el.for && !el.forProcessed) {
        return genFor(el, state);
    }
    else if (el.if && !el.ifProcessed) {
        return genIf(el, state);
    }
    else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
        return genChildren(el, state) || 'void 0';
    }
    else if (el.tag === 'slot') {
        return genSlot(el, state);
    }
    else {
        // component or element
        let code;
        if (el.component) {
            code = genComponent(el.component, el, state);
        }
        else {
            let data;
            const maybeComponent = state.maybeComponent(el);
            if (!el.plain || (el.pre && maybeComponent)) {
                data = genData(el, state);
            }
            let tag;
            // check if this is a component in <script setup>
            const bindings = state.options.bindings;
            if (maybeComponent && bindings && bindings.__isScriptSetup !== false) {
                tag = checkBindingType(bindings, el.tag);
            }
            if (!tag)
                tag = `'${el.tag}'`;
            const children = el.inlineTemplate ? null : genChildren(el, state, true);
            code = `_c(${tag}${data ? `,${data}` : '' // data
            }${children ? `,${children}` : '' // children
            })`;
        }
        // module transforms
        for (let i = 0; i < state.transforms.length; i++) {
            code = state.transforms[i](el, code);
        }
        return code;
    }
}
function checkBindingType(bindings, key) {
    const camelName = camelize(key);
    const PascalName = capitalize(camelName);
    const checkType = (type) => {
        if (bindings[key] === type) {
            return key;
        }
        if (bindings[camelName] === type) {
            return camelName;
        }
        if (bindings[PascalName] === type) {
            return PascalName;
        }
    };
    const fromConst = checkType("setup-const" /* BindingTypes.SETUP_CONST */) ||
        checkType("setup-reactive-const" /* BindingTypes.SETUP_REACTIVE_CONST */);
    if (fromConst) {
        return fromConst;
    }
    const fromMaybeRef = checkType("setup-let" /* BindingTypes.SETUP_LET */) ||
        checkType("setup-ref" /* BindingTypes.SETUP_REF */) ||
        checkType("setup-maybe-ref" /* BindingTypes.SETUP_MAYBE_REF */);
    if (fromMaybeRef) {
        return fromMaybeRef;
    }
}
// hoist static sub-trees out
function genStatic(el, state) {
    el.staticProcessed = true;
    // Some elements (templates) need to behave differently inside of a v-pre
    // node.  All pre nodes are static roots, so we can use this as a location to
    // wrap a state change and reset it upon exiting the pre node.
    const originalPreState = state.pre;
    if (el.pre) {
        state.pre = el.pre;
    }
    state.staticRenderFns.push(`with(this){return ${genElement(el, state)}}`);
    state.pre = originalPreState;
    return `_m(${state.staticRenderFns.length - 1}${el.staticInFor ? ',true' : ''})`;
}
// v-once
function genOnce(el, state) {
    el.onceProcessed = true;
    if (el.if && !el.ifProcessed) {
        return genIf(el, state);
    }
    else if (el.staticInFor) {
        let key = '';
        let parent = el.parent;
        while (parent) {
            if (parent.for) {
                key = parent.key;
                break;
            }
            parent = parent.parent;
        }
        if (!key) {
            state.warn(`v-once can only be used inside v-for that is keyed. `, el.rawAttrsMap['v-once']);
            return genElement(el, state);
        }
        return `_o(${genElement(el, state)},${state.onceId++},${key})`;
    }
    else {
        return genStatic(el, state);
    }
}
function genIf(el, state, altGen, altEmpty) {
    el.ifProcessed = true; // avoid recursion
    return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
}
function genIfConditions(conditions, state, altGen, altEmpty) {
    if (!conditions.length) {
        return altEmpty || '_e()';
    }
    const condition = conditions.shift();
    if (condition.exp) {
        return `(${condition.exp})?${genTernaryExp(condition.block)}:${genIfConditions(conditions, state, altGen, altEmpty)}`;
    }
    else {
        return `${genTernaryExp(condition.block)}`;
    }
    // v-if with v-once should generate code like (a)?_m(0):_m(1)
    function genTernaryExp(el) {
        return altGen
            ? altGen(el, state)
            : el.once
                ? genOnce(el, state)
                : genElement(el, state);
    }
}
function genFor(el, state, altGen, altHelper) {
    const exp = el.for;
    const alias = el.alias;
    const iterator1 = el.iterator1 ? `,${el.iterator1}` : '';
    const iterator2 = el.iterator2 ? `,${el.iterator2}` : '';
    if (state.maybeComponent(el) &&
        el.tag !== 'slot' &&
        el.tag !== 'template' &&
        !el.key) {
        state.warn(`<${el.tag} v-for="${alias} in ${exp}">: component lists rendered with ` +
            `v-for should have explicit keys. ` +
            `See https://v2.vuejs.org/v2/guide/list.html#key for more info.`, el.rawAttrsMap['v-for'], true /* tip */);
    }
    el.forProcessed = true; // avoid recursion
    return (`${altHelper || '_l'}((${exp}),` +
        `function(${alias}${iterator1}${iterator2}){` +
        `return ${(altGen || genElement)(el, state)}` +
        '})');
}
function genData(el, state) {
    let data = '{';
    // directives first.
    // directives may mutate the el's other properties before they are generated.
    const dirs = genDirectives(el, state);
    if (dirs)
        data += dirs + ',';
    // key
    if (el.key) {
        data += `key:${el.key},`;
    }
    // ref
    if (el.ref) {
        data += `ref:${el.ref},`;
    }
    if (el.refInFor) {
        data += `refInFor:true,`;
    }
    // pre
    if (el.pre) {
        data += `pre:true,`;
    }
    // record original tag name for components using "is" attribute
    if (el.component) {
        data += `tag:"${el.tag}",`;
    }
    // module data generation functions
    for (let i = 0; i < state.dataGenFns.length; i++) {
        data += state.dataGenFns[i](el);
    }
    // attributes
    if (el.attrs) {
        data += `attrs:${genProps(el.attrs)},`;
    }
    // DOM props
    if (el.props) {
        data += `domProps:${genProps(el.props)},`;
    }
    // event handlers
    if (el.events) {
        data += `${genHandlers(el.events, false)},`;
    }
    if (el.nativeEvents) {
        data += `${genHandlers(el.nativeEvents, true)},`;
    }
    // slot target
    // only for non-scoped slots
    if (el.slotTarget && !el.slotScope) {
        data += `slot:${el.slotTarget},`;
    }
    // scoped slots
    if (el.scopedSlots) {
        data += `${genScopedSlots(el, el.scopedSlots, state)},`;
    }
    // component v-model
    if (el.model) {
        data += `model:{value:${el.model.value},callback:${el.model.callback},expression:${el.model.expression}},`;
    }
    // inline-template
    if (el.inlineTemplate) {
        const inlineTemplate = genInlineTemplate(el, state);
        if (inlineTemplate) {
            data += `${inlineTemplate},`;
        }
    }
    data = data.replace(/,$/, '') + '}';
    // v-bind dynamic argument wrap
    // v-bind with dynamic arguments must be applied using the same v-bind object
    // merge helper so that class/style/mustUseProp attrs are handled correctly.
    if (el.dynamicAttrs) {
        data = `_b(${data},"${el.tag}",${genProps(el.dynamicAttrs)})`;
    }
    // v-bind data wrap
    if (el.wrapData) {
        data = el.wrapData(data);
    }
    // v-on data wrap
    if (el.wrapListeners) {
        data = el.wrapListeners(data);
    }
    return data;
}
function genDirectives(el, state) {
    const dirs = el.directives;
    if (!dirs)
        return;
    let res = 'directives:[';
    let hasRuntime = false;
    let i, l, dir, needRuntime;
    for (i = 0, l = dirs.length; i < l; i++) {
        dir = dirs[i];
        needRuntime = true;
        const gen = state.directives[dir.name];
        if (gen) {
            // compile-time directive that manipulates AST.
            // returns true if it also needs a runtime counterpart.
            needRuntime = !!gen(el, dir, state.warn);
        }
        if (needRuntime) {
            hasRuntime = true;
            res += `{name:"${dir.name}",rawName:"${dir.rawName}"${dir.value
                ? `,value:(${dir.value}),expression:${JSON.stringify(dir.value)}`
                : ''}${dir.arg ? `,arg:${dir.isDynamicArg ? dir.arg : `"${dir.arg}"`}` : ''}${dir.modifiers ? `,modifiers:${JSON.stringify(dir.modifiers)}` : ''}},`;
        }
    }
    if (hasRuntime) {
        return res.slice(0, -1) + ']';
    }
}
function genInlineTemplate(el, state) {
    const ast = el.children[0];
    if ((el.children.length !== 1 || ast.type !== 1)) {
        state.warn('Inline-template components must have exactly one child element.', { start: el.start });
    }
    if (ast && ast.type === 1) {
        const inlineRenderFns = generate(ast, state.options);
        return `inlineTemplate:{render:function(){${inlineRenderFns.render}},staticRenderFns:[${inlineRenderFns.staticRenderFns
            .map(code => `function(){${code}}`)
            .join(',')}]}`;
    }
}
function genScopedSlots(el, slots, state) {
    // by default scoped slots are considered "stable", this allows child
    // components with only scoped slots to skip forced updates from parent.
    // but in some cases we have to bail-out of this optimization
    // for example if the slot contains dynamic names, has v-if or v-for on them...
    let needsForceUpdate = el.for ||
        Object.keys(slots).some(key => {
            const slot = slots[key];
            return (slot.slotTargetDynamic || slot.if || slot.for || containsSlotChild(slot) // is passing down slot from parent which may be dynamic
            );
        });
    // #9534: if a component with scoped slots is inside a conditional branch,
    // it's possible for the same component to be reused but with different
    // compiled slot content. To avoid that, we generate a unique key based on
    // the generated code of all the slot contents.
    let needsKey = !!el.if;
    // OR when it is inside another scoped slot or v-for (the reactivity may be
    // disconnected due to the intermediate scope variable)
    // #9438, #9506
    // TODO: this can be further optimized by properly analyzing in-scope bindings
    // and skip force updating ones that do not actually use scope variables.
    if (!needsForceUpdate) {
        let parent = el.parent;
        while (parent) {
            if ((parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
                parent.for) {
                needsForceUpdate = true;
                break;
            }
            if (parent.if) {
                needsKey = true;
            }
            parent = parent.parent;
        }
    }
    const generatedSlots = Object.keys(slots)
        .map(key => genScopedSlot(slots[key], state))
        .join(',');
    return `scopedSlots:_u([${generatedSlots}]${needsForceUpdate ? `,null,true` : ``}${!needsForceUpdate && needsKey ? `,null,false,${hash(generatedSlots)}` : ``})`;
}
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}
function containsSlotChild(el) {
    if (el.type === 1) {
        if (el.tag === 'slot') {
            return true;
        }
        return el.children.some(containsSlotChild);
    }
    return false;
}
function genScopedSlot(el, state) {
    const isLegacySyntax = el.attrsMap['slot-scope'];
    if (el.if && !el.ifProcessed && !isLegacySyntax) {
        return genIf(el, state, genScopedSlot, `null`);
    }
    if (el.for && !el.forProcessed) {
        return genFor(el, state, genScopedSlot);
    }
    const slotScope = el.slotScope === emptySlotScopeToken ? `` : String(el.slotScope);
    const fn = `function(${slotScope}){` +
        `return ${el.tag === 'template'
            ? el.if && isLegacySyntax
                ? `(${el.if})?${genChildren(el, state) || 'undefined'}:undefined`
                : genChildren(el, state) || 'undefined'
            : genElement(el, state)}}`;
    // reverse proxy v-slot without scope on this.$slots
    const reverseProxy = slotScope ? `` : `,proxy:true`;
    return `{key:${el.slotTarget || `"default"`},fn:${fn}${reverseProxy}}`;
}
function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
    const children = el.children;
    if (children.length) {
        const el = children[0];
        // optimize single v-for
        if (children.length === 1 &&
            el.for &&
            el.tag !== 'template' &&
            el.tag !== 'slot') {
            const normalizationType = checkSkip
                ? state.maybeComponent(el)
                    ? `,1`
                    : `,0`
                : ``;
            return `${(altGenElement || genElement)(el, state)}${normalizationType}`;
        }
        const normalizationType = checkSkip
            ? getNormalizationType(children, state.maybeComponent)
            : 0;
        const gen = altGenNode || genNode;
        return `[${children.map(c => gen(c, state)).join(',')}]${normalizationType ? `,${normalizationType}` : ''}`;
    }
}
// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType(children, maybeComponent) {
    let res = 0;
    for (let i = 0; i < children.length; i++) {
        const el = children[i];
        if (el.type !== 1) {
            continue;
        }
        if (needsNormalization(el) ||
            (el.ifConditions &&
                el.ifConditions.some(c => needsNormalization(c.block)))) {
            res = 2;
            break;
        }
        if (maybeComponent(el) ||
            (el.ifConditions && el.ifConditions.some(c => maybeComponent(c.block)))) {
            res = 1;
        }
    }
    return res;
}
function needsNormalization(el) {
    return el.for !== undefined || el.tag === 'template' || el.tag === 'slot';
}
function genNode(node, state) {
    if (node.type === 1) {
        return genElement(node, state);
    }
    else if (node.type === 3 && node.isComment) {
        return genComment(node);
    }
    else {
        return genText(node);
    }
}
function genText(text) {
    return `_v(${text.type === 2
        ? text.expression // no need for () because already wrapped in _s()
        : transformSpecialNewlines(JSON.stringify(text.text))})`;
}
function genComment(comment) {
    return `_e(${JSON.stringify(comment.text)})`;
}
function genSlot(el, state) {
    const slotName = el.slotName || '"default"';
    const children = genChildren(el, state);
    let res = `_t(${slotName}${children ? `,function(){return ${children}}` : ''}`;
    const attrs = el.attrs || el.dynamicAttrs
        ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(attr => ({
            // slot props are camelized
            name: camelize(attr.name),
            value: attr.value,
            dynamic: attr.dynamic
        })))
        : null;
    const bind = el.attrsMap['v-bind'];
    if ((attrs || bind) && !children) {
        res += `,null`;
    }
    if (attrs) {
        res += `,${attrs}`;
    }
    if (bind) {
        res += `${attrs ? '' : ',null'},${bind}`;
    }
    return res + ')';
}
// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent(componentName, el, state) {
    const children = el.inlineTemplate ? null : genChildren(el, state, true);
    return `_c(${componentName},${genData(el, state)}${children ? `,${children}` : ''})`;
}
function genProps(props) {
    let staticProps = ``;
    let dynamicProps = ``;
    for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        const value = transformSpecialNewlines(prop.value);
        if (prop.dynamic) {
            dynamicProps += `${prop.name},${value},`;
        }
        else {
            staticProps += `"${prop.name}":${value},`;
        }
    }
    staticProps = `{${staticProps.slice(0, -1)}}`;
    if (dynamicProps) {
        return `_d(${staticProps},[${dynamicProps.slice(0, -1)}])`;
    }
    else {
        return staticProps;
    }
}
// #3895, #4268
function transformSpecialNewlines(text) {
    return text.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
const prohibitedKeywordRE = new RegExp('\\b' +
    ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
        'super,throw,while,yield,delete,export,import,return,switch,default,' +
        'extends,finally,continue,debugger,function,arguments')
        .split(',')
        .join('\\b|\\b') +
    '\\b');
// these unary operators should not be used as property/method names
const unaryOperatorsRE = new RegExp('\\b' +
    'delete,typeof,void'.split(',').join('\\s*\\([^\\)]*\\)|\\b') +
    '\\s*\\([^\\)]*\\)');
// strip strings in expressions
const stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
// detect problematic expressions in a template
function detectErrors(ast, warn) {
    if (ast) {
        checkNode(ast, warn);
    }
}
function checkNode(node, warn) {
    if (node.type === 1) {
        for (const name in node.attrsMap) {
            if (dirRE.test(name)) {
                const value = node.attrsMap[name];
                if (value) {
                    const range = node.rawAttrsMap[name];
                    if (name === 'v-for') {
                        checkFor(node, `v-for="${value}"`, warn, range);
                    }
                    else if (name === 'v-slot' || name[0] === '#') {
                        checkFunctionParameterExpression(value, `${name}="${value}"`, warn, range);
                    }
                    else if (onRE.test(name)) {
                        checkEvent(value, `${name}="${value}"`, warn, range);
                    }
                    else {
                        checkExpression(value, `${name}="${value}"`, warn, range);
                    }
                }
            }
        }
        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                checkNode(node.children[i], warn);
            }
        }
    }
    else if (node.type === 2) {
        checkExpression(node.expression, node.text, warn, node);
    }
}
function checkEvent(exp, text, warn, range) {
    const stripped = exp.replace(stripStringRE, '');
    const keywordMatch = stripped.match(unaryOperatorsRE);
    if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== '$') {
        warn(`avoid using JavaScript unary operator as property name: ` +
            `"${keywordMatch[0]}" in expression ${text.trim()}`, range);
    }
    checkExpression(exp, text, warn, range);
}
function checkFor(node, text, warn, range) {
    checkExpression(node.for || '', text, warn, range);
    checkIdentifier(node.alias, 'v-for alias', text, warn, range);
    checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
    checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}
function checkIdentifier(ident, type, text, warn, range) {
    if (typeof ident === 'string') {
        try {
            new Function(`var ${ident}=_`);
        }
        catch (e) {
            warn(`invalid ${type} "${ident}" in expression: ${text.trim()}`, range);
        }
    }
}
function checkExpression(exp, text, warn, range) {
    try {
        new Function(`return ${exp}`);
    }
    catch (e) {
        const keywordMatch = exp
            .replace(stripStringRE, '')
            .match(prohibitedKeywordRE);
        if (keywordMatch) {
            warn(`avoid using JavaScript keyword as property name: ` +
                `"${keywordMatch[0]}"\n  Raw expression: ${text.trim()}`, range);
        }
        else {
            warn(`invalid expression: ${e.message} in\n\n` +
                `    ${exp}\n\n` +
                `  Raw expression: ${text.trim()}\n`, range);
        }
    }
}
function checkFunctionParameterExpression(exp, text, warn, range) {
    try {
        new Function(exp, '');
    }
    catch (e) {
        warn(`invalid function parameter expression: ${e.message} in\n\n` +
            `    ${exp}\n\n` +
            `  Raw expression: ${text.trim()}\n`, range);
    }
}

const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + 1;
        if (count >= start) {
            for (let j = i - range; j <= i + range || end > count; j++) {
                if (j < 0 || j >= lines.length)
                    continue;
                res.push(`${j + 1}${repeat(` `, 3 - String(j + 1).length)}|  ${lines[j]}`);
                const lineLength = lines[j].length;
                if (j === i) {
                    // push underline
                    const pad = start - (count - lineLength) + 1;
                    const length = end > count ? lineLength - pad : end - start;
                    res.push(`   |  ` + repeat(` `, pad) + repeat(`^`, length));
                }
                else if (j > i) {
                    if (end > count) {
                        const length = Math.min(end - count, lineLength);
                        res.push(`   |  ` + repeat(`^`, length));
                    }
                    count += lineLength + 1;
                }
            }
            break;
        }
    }
    return res.join('\n');
}
function repeat(str, n) {
    let result = '';
    if (n > 0) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            // eslint-disable-line
            if (n & 1)
                result += str;
            n >>>= 1;
            if (n <= 0)
                break;
            str += str;
        }
    }
    return result;
}

function createFunction(code, errors) {
    try {
        return new Function(code);
    }
    catch (err) {
        errors.push({ err, code });
        return noop;
    }
}
function createCompileToFunctionFn(compile) {
    const cache = Object.create(null);
    return function compileToFunctions(template, options, vm) {
        options = extend({}, options);
        const warn = options.warn || warn$2;
        delete options.warn;
        /* istanbul ignore if */
        {
            // detect possible CSP restriction
            try {
                new Function('return 1');
            }
            catch (e) {
                if (e.toString().match(/unsafe-eval|CSP/)) {
                    warn('It seems you are using the standalone build of Vue.js in an ' +
                        'environment with Content Security Policy that prohibits unsafe-eval. ' +
                        'The template compiler cannot work in this environment. Consider ' +
                        'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
                        'templates into render functions.');
                }
            }
        }
        // check cache
        const key = options.delimiters
            ? String(options.delimiters) + template
            : template;
        if (cache[key]) {
            return cache[key];
        }
        // compile
        const compiled = compile(template, options);
        // check compilation errors/tips
        {
            if (compiled.errors && compiled.errors.length) {
                if (options.outputSourceRange) {
                    compiled.errors.forEach(e => {
                        warn(`Error compiling template:\n\n${e.msg}\n\n` +
                            generateCodeFrame(template, e.start, e.end), vm);
                    });
                }
                else {
                    warn(`Error compiling template:\n\n${template}\n\n` +
                        compiled.errors.map(e => `- ${e}`).join('\n') +
                        '\n', vm);
                }
            }
            if (compiled.tips && compiled.tips.length) {
                if (options.outputSourceRange) {
                    compiled.tips.forEach(e => tip(e.msg, vm));
                }
                else {
                    compiled.tips.forEach(msg => tip(msg, vm));
                }
            }
        }
        // turn code into functions
        const res = {};
        const fnGenErrors = [];
        res.render = createFunction(compiled.render, fnGenErrors);
        res.staticRenderFns = compiled.staticRenderFns.map(code => {
            return createFunction(code, fnGenErrors);
        });
        // check function generation errors.
        // this should only happen if there is a bug in the compiler itself.
        // mostly for codegen development use
        /* istanbul ignore if */
        {
            if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
                warn(`Failed to generate render function:\n\n` +
                    fnGenErrors
                        .map(({ err, code }) => `${err.toString()} in\n\n${code}\n`)
                        .join('\n'), vm);
            }
        }
        return (cache[key] = res);
    };
}

function createCompilerCreator(baseCompile) {
    return function createCompiler(baseOptions) {
        function compile(template, options) {
            const finalOptions = Object.create(baseOptions);
            const errors = [];
            const tips = [];
            let warn = (msg, range, tip) => {
                (tip ? tips : errors).push(msg);
            };
            if (options) {
                if (options.outputSourceRange) {
                    // $flow-disable-line
                    const leadingSpaceLength = template.match(/^\s*/)[0].length;
                    warn = (msg, range, tip) => {
                        const data = typeof msg === 'string' ? { msg } : msg;
                        if (range) {
                            if (range.start != null) {
                                data.start = range.start + leadingSpaceLength;
                            }
                            if (range.end != null) {
                                data.end = range.end + leadingSpaceLength;
                            }
                        }
                        (tip ? tips : errors).push(data);
                    };
                }
                // merge custom modules
                if (options.modules) {
                    finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
                }
                // merge custom directives
                if (options.directives) {
                    finalOptions.directives = extend(Object.create(baseOptions.directives || null), options.directives);
                }
                // copy other options
                for (const key in options) {
                    if (key !== 'modules' && key !== 'directives') {
                        finalOptions[key] = options[key];
                    }
                }
            }
            finalOptions.warn = warn;
            const compiled = baseCompile(template.trim(), finalOptions);
            {
                detectErrors(compiled.ast, warn);
            }
            compiled.errors = errors;
            compiled.tips = tips;
            return compiled;
        }
        return {
            compile,
            compileToFunctions: createCompileToFunctionFn(compile)
        };
    };
}

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
const createCompiler = createCompilerCreator(function baseCompile(template, options) {
    const ast = parse(template.trim(), options);
    if (options.optimize !== false) {
        optimize(ast, options);
    }
    const code = generate(ast, options);
    return {
        ast,
        render: code.render,
        staticRenderFns: code.staticRenderFns
    };
});

const { compile, compileToFunctions } = createCompiler(baseOptions);

// check whether current browser encodes a char inside attribute values
let div;
function getShouldDecode(href) {
    div = div || document.createElement('div');
    div.innerHTML = href ? `<a href="\n"/>` : `<div a="\n"/>`;
    return div.innerHTML.indexOf('&#10;') > 0;
}
// #3663: IE encodes newlines inside attribute values while other browsers don't
const shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
const shouldDecodeNewlinesForHref = inBrowser
    ? getShouldDecode(true)
    : false;

const idToTemplate = cached(id => {
    const el = query(id);
    return el && el.innerHTML;
});
const mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (el, hydrating) {
    el = el && query(el);
    /* istanbul ignore if */
    if (el === document.body || el === document.documentElement) {
        warn$2(`Do not mount Vue to <html> or <body> - mount to normal elements instead.`);
        return this;
    }
    const options = this.$options;
    // resolve template/el and convert to render function
    if (!options.render) {
        let template = options.template;
        if (template) {
            if (typeof template === 'string') {
                if (template.charAt(0) === '#') {
                    template = idToTemplate(template);
                    /* istanbul ignore if */
                    if (!template) {
                        warn$2(`Template element not found or is empty: ${options.template}`, this);
                    }
                }
            }
            else if (template.nodeType) {
                template = template.innerHTML;
            }
            else {
                {
                    warn$2('invalid template option:' + template, this);
                }
                return this;
            }
        }
        else if (el) {
            // @ts-expect-error
            template = getOuterHTML(el);
        }
        if (template) {
            /* istanbul ignore if */
            if (config.performance && mark) {
                mark('compile');
            }
            const { render, staticRenderFns } = compileToFunctions(template, {
                outputSourceRange: true,
                shouldDecodeNewlines,
                shouldDecodeNewlinesForHref,
                delimiters: options.delimiters,
                comments: options.comments
            }, this);
            options.render = render;
            options.staticRenderFns = staticRenderFns;
            /* istanbul ignore if */
            if (config.performance && mark) {
                mark('compile end');
                measure(`vue ${this._name} compile`, 'compile', 'compile end');
            }
        }
    }
    return mount.call(this, el, hydrating);
};
/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML(el) {
    if (el.outerHTML) {
        return el.outerHTML;
    }
    else {
        const container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML;
    }
}
Vue.compile = compileToFunctions;

// export type EffectScheduler = (...args: any[]) => any
/**
 * @internal since we are not exposing this in Vue 2, it's used only for
 * internal testing.
 */
function effect(fn, scheduler) {
    const watcher = new Watcher(currentInstance, fn, noop, {
        sync: true
    });
    if (scheduler) {
        watcher.update = () => {
            scheduler(() => watcher.run());
        };
    }
}

extend(Vue, vca);
Vue.effect = effect;

module.exports = Vue;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/vue/dist/vue.common.js":
/*!*********************************************!*\
  !*** ./node_modules/vue/dist/vue.common.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (false) {} else {
  module.exports = __webpack_require__(/*! ./vue.common.dev.js */ "./node_modules/vue/dist/vue.common.dev.js")
}


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
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

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./resources/js/AdminVue.js":
/*!**********************************!*\
  !*** ./resources/js/AdminVue.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_IncredibleOffers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/IncredibleOffers */ "./resources/js/components/IncredibleOffers.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-axios */ "./node_modules/vue-axios/dist/vue-axios.esm.min.js");
/* harmony import */ var _components_Counter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Counter */ "./resources/js/components/Counter.vue");
/* harmony import */ var _components_OrderStep__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/OrderStep */ "./resources/js/components/OrderStep.vue");
/* harmony import */ var _components_StockroomProductList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/StockroomProductList */ "./resources/js/components/StockroomProductList.vue");
/* harmony import */ var _components_StockroomOutputList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/StockroomOutputList */ "./resources/js/components/StockroomOutputList.vue");
/* harmony import */ var _components_SaleReport__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/SaleReport */ "./resources/js/components/SaleReport.vue");
window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
Vue.component('pagination', __webpack_require__(/*! laravel-vue-semantic-ui-pagination */ "./node_modules/laravel-vue-semantic-ui-pagination/src/laravel-vue-semantic-ui-pagination.js"));
Vue.component('Cleave', __webpack_require__(/*! vue-cleave-component */ "./node_modules/vue-cleave-component/dist/vue-cleave.min.js"));
Vue.config.productionTip = false;








Vue.use(vue_axios__WEBPACK_IMPORTED_MODULE_2__["default"], axios__WEBPACK_IMPORTED_MODULE_1___default.a);
Vue.prototype.$siteUrl = 'http://127.0.0.1:8000/';
var app = new Vue({
  el: '#app',
  components: {
    IncredibleOffers: _components_IncredibleOffers__WEBPACK_IMPORTED_MODULE_0__["default"],
    Counter: _components_Counter__WEBPACK_IMPORTED_MODULE_3__["default"],
    OrderStep: _components_OrderStep__WEBPACK_IMPORTED_MODULE_4__["default"],
    StockroomProductList: _components_StockroomProductList__WEBPACK_IMPORTED_MODULE_5__["default"],
    StockroomOutputList: _components_StockroomOutputList__WEBPACK_IMPORTED_MODULE_6__["default"],
    SaleReport: _components_SaleReport__WEBPACK_IMPORTED_MODULE_7__["default"]
  }
});

/***/ }),

/***/ "./resources/js/components/Counter.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/Counter.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Counter_vue_vue_type_template_id_68e92161_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Counter.vue?vue&type=template&id=68e92161&scoped=true& */ "./resources/js/components/Counter.vue?vue&type=template&id=68e92161&scoped=true&");
/* harmony import */ var _Counter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Counter.vue?vue&type=script&lang=js& */ "./resources/js/components/Counter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Counter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Counter_vue_vue_type_template_id_68e92161_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Counter_vue_vue_type_template_id_68e92161_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "68e92161",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Counter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Counter.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Counter.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Counter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Counter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Counter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Counter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Counter.vue?vue&type=template&id=68e92161&scoped=true&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Counter.vue?vue&type=template&id=68e92161&scoped=true& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Counter_vue_vue_type_template_id_68e92161_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/vue-loader/lib??vue-loader-options!./Counter.vue?vue&type=template&id=68e92161&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Counter.vue?vue&type=template&id=68e92161&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Counter_vue_vue_type_template_id_68e92161_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Counter_vue_vue_type_template_id_68e92161_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/IncredibleOffers.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/IncredibleOffers.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IncredibleOffers_vue_vue_type_template_id_1ac9bd27_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true& */ "./resources/js/components/IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true&");
/* harmony import */ var _IncredibleOffers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IncredibleOffers.vue?vue&type=script&lang=js& */ "./resources/js/components/IncredibleOffers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _IncredibleOffers_vue_vue_type_style_index_0_id_1ac9bd27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IncredibleOffers.vue?vue&type=style&index=0&id=1ac9bd27&scoped=true&lang=css& */ "./resources/js/components/IncredibleOffers.vue?vue&type=style&index=0&id=1ac9bd27&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _IncredibleOffers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IncredibleOffers_vue_vue_type_template_id_1ac9bd27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IncredibleOffers_vue_vue_type_template_id_1ac9bd27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1ac9bd27",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/IncredibleOffers.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/IncredibleOffers.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/IncredibleOffers.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./IncredibleOffers.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IncredibleOffers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/IncredibleOffers.vue?vue&type=style&index=0&id=1ac9bd27&scoped=true&lang=css&":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/IncredibleOffers.vue?vue&type=style&index=0&id=1ac9bd27&scoped=true&lang=css& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_style_index_0_id_1ac9bd27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./IncredibleOffers.vue?vue&type=style&index=0&id=1ac9bd27&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IncredibleOffers.vue?vue&type=style&index=0&id=1ac9bd27&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_style_index_0_id_1ac9bd27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_style_index_0_id_1ac9bd27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_style_index_0_id_1ac9bd27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_style_index_0_id_1ac9bd27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_template_id_1ac9bd27_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/vue-loader/lib??vue-loader-options!./IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/IncredibleOffers.vue?vue&type=template&id=1ac9bd27&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_template_id_1ac9bd27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_IncredibleOffers_vue_vue_type_template_id_1ac9bd27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/OrderStep.vue":
/*!***********************************************!*\
  !*** ./resources/js/components/OrderStep.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderStep_vue_vue_type_template_id_2121af42_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderStep.vue?vue&type=template&id=2121af42&scoped=true& */ "./resources/js/components/OrderStep.vue?vue&type=template&id=2121af42&scoped=true&");
/* harmony import */ var _OrderStep_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderStep.vue?vue&type=script&lang=js& */ "./resources/js/components/OrderStep.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrderStep_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderStep_vue_vue_type_template_id_2121af42_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OrderStep_vue_vue_type_template_id_2121af42_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2121af42",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/OrderStep.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/OrderStep.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/components/OrderStep.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderStep_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./OrderStep.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/OrderStep.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderStep_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/OrderStep.vue?vue&type=template&id=2121af42&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/OrderStep.vue?vue&type=template&id=2121af42&scoped=true& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderStep_vue_vue_type_template_id_2121af42_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/vue-loader/lib??vue-loader-options!./OrderStep.vue?vue&type=template&id=2121af42&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/OrderStep.vue?vue&type=template&id=2121af42&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderStep_vue_vue_type_template_id_2121af42_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderStep_vue_vue_type_template_id_2121af42_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/SaleReport.vue":
/*!************************************************!*\
  !*** ./resources/js/components/SaleReport.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SaleReport_vue_vue_type_template_id_49057786_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SaleReport.vue?vue&type=template&id=49057786&scoped=true& */ "./resources/js/components/SaleReport.vue?vue&type=template&id=49057786&scoped=true&");
/* harmony import */ var _SaleReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SaleReport.vue?vue&type=script&lang=js& */ "./resources/js/components/SaleReport.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SaleReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SaleReport_vue_vue_type_template_id_49057786_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SaleReport_vue_vue_type_template_id_49057786_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "49057786",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/SaleReport.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/SaleReport.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/SaleReport.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SaleReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./SaleReport.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SaleReport.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SaleReport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/SaleReport.vue?vue&type=template&id=49057786&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/SaleReport.vue?vue&type=template&id=49057786&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_SaleReport_vue_vue_type_template_id_49057786_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/vue-loader/lib??vue-loader-options!./SaleReport.vue?vue&type=template&id=49057786&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SaleReport.vue?vue&type=template&id=49057786&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_SaleReport_vue_vue_type_template_id_49057786_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_SaleReport_vue_vue_type_template_id_49057786_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/StockroomOutputList.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/StockroomOutputList.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StockroomOutputList_vue_vue_type_template_id_9d976a16_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StockroomOutputList.vue?vue&type=template&id=9d976a16&scoped=true& */ "./resources/js/components/StockroomOutputList.vue?vue&type=template&id=9d976a16&scoped=true&");
/* harmony import */ var _StockroomOutputList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StockroomOutputList.vue?vue&type=script&lang=js& */ "./resources/js/components/StockroomOutputList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StockroomOutputList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StockroomOutputList_vue_vue_type_template_id_9d976a16_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StockroomOutputList_vue_vue_type_template_id_9d976a16_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "9d976a16",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/StockroomOutputList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/StockroomOutputList.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/StockroomOutputList.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomOutputList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./StockroomOutputList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomOutputList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomOutputList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/StockroomOutputList.vue?vue&type=template&id=9d976a16&scoped=true&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/StockroomOutputList.vue?vue&type=template&id=9d976a16&scoped=true& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomOutputList_vue_vue_type_template_id_9d976a16_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/vue-loader/lib??vue-loader-options!./StockroomOutputList.vue?vue&type=template&id=9d976a16&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomOutputList.vue?vue&type=template&id=9d976a16&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomOutputList_vue_vue_type_template_id_9d976a16_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomOutputList_vue_vue_type_template_id_9d976a16_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/StockroomProductList.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/StockroomProductList.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StockroomProductList_vue_vue_type_template_id_43098f67_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StockroomProductList.vue?vue&type=template&id=43098f67&scoped=true& */ "./resources/js/components/StockroomProductList.vue?vue&type=template&id=43098f67&scoped=true&");
/* harmony import */ var _StockroomProductList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StockroomProductList.vue?vue&type=script&lang=js& */ "./resources/js/components/StockroomProductList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StockroomProductList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StockroomProductList_vue_vue_type_template_id_43098f67_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StockroomProductList_vue_vue_type_template_id_43098f67_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "43098f67",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/StockroomProductList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/StockroomProductList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/StockroomProductList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomProductList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./StockroomProductList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomProductList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomProductList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/StockroomProductList.vue?vue&type=template&id=43098f67&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/StockroomProductList.vue?vue&type=template&id=43098f67&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomProductList_vue_vue_type_template_id_43098f67_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/vue-loader/lib??vue-loader-options!./StockroomProductList.vue?vue&type=template&id=43098f67&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/StockroomProductList.vue?vue&type=template&id=43098f67&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomProductList_vue_vue_type_template_id_43098f67_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_StockroomProductList_vue_vue_type_template_id_43098f67_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/myMixin.js":
/*!*********************************!*\
  !*** ./resources/js/myMixin.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    replaceNumber: function replaceNumber(n) {
      if (n != undefined) {
        n = n.toString();
        var find = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var replace = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        for (var i = 0; i < find.length; i++) {
          n = n.replace(new RegExp(find[i], 'g'), replace[i]);
        }
        return n;
      }
    },
    check_mobile_number: function check_mobile_number() {
      if (isNaN(this.mobile)) {
        return true;
      } else {
        if (this.mobile.toString().trim().length == 11) {
          if (this.mobile.toString().charAt(0) == '0' && this.mobile.toString().charAt(1) == '9') {
            return false;
          } else {
            return true;
          }
        } else if (this.mobile.toString().trim().length == 10) {
          if (this.mobile.toString().charAt(0) == '9') {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    },
    number_format: function number_format(num) {
      num = num.toString();
      var format = '';
      var counter = 0;
      for (var i = num.length - 1; i >= 0; i--) {
        format += num[i];
        counter++;
        if (counter == 3) {
          format += ",";
          counter = 0;
        }
      }
      return format.split('').reverse().join('');
    },
    check_search_params: function check_search_params(page_url) {
      var url = page_url == undefined ? window.location.href : page_url;
      var params = url.split('?');
      if (params[1] != undefined) {
        if (params[1].indexOf('&') > -1) {
          var vars = params[1].split('&');
          for (var i in vars) {
            var k = vars[i].split('=')[0];
            var v = vars[i].split('=')[1];
            k = k.split('[');
            this.add_active_filter(k, v);
          }
        } else {
          var _k = params[1].split('=')[0];
          var _v = params[1].split('=')[1];
          _k = _k.split('[');
          this.add_active_filter(_k, _v);
        }
      }
    },
    setRangeSlider: function setRangeSlider(price) {
      var app = this;
      var slider = document.querySelector('.price_range_slider');
      if (this.noUiSlider == null) {
        if (parseInt(price) > 0) {
          this.noUiSlider = noUiSlider.create(slider, {
            start: [0, price],
            connect: true,
            direction: 'rtl',
            range: {
              'min': 0,
              'max': price
            },
            format: {
              from: function from(value) {
                return parseInt(value);
              },
              to: function to(value) {
                return parseInt(value);
              }
            }
          });
        }
      }
      if (slider.noUiSlider != undefined) {
        slider.noUiSlider.on('update', function (values, handle) {
          app.min_price = values[0];
          app.max_price = values[1];
          $("#min_price").text(app.number_format(values[0]));
          $("#max_price").text(app.number_format(values[1]));
        });
        var search = new window.URLSearchParams(window.location.search);
        var min = parseInt(search.get('price[min]')) != null ? parseInt(search.get('price[min]')) : 0;
        if (search.get('price[max]') != null) {
          this.noUiSlider.updateOptions({
            start: [min, parseInt(search.get('price[max]'))]
          });
        }
        if (search.get('price[min]') != null && search.get('price[max]') == null) {
          this.noUiSlider.updateOptions({
            start: [parseInt(search.get('price[min]')), slider.noUiSlider.get()[1]]
          });
        }
      }
    },
    setPageUrl: function setPageUrl(url) {
      window.history.pushState('data', 'title', url);
    },
    getDiscountValue: function getDiscountValue(price1, price2) {
      var a = price2 / price1 * 100;
      a = 100 - a;
      a = Math.round(a);
      return a;
    },
    set_filter_event: function set_filter_event(el, page_url) {
      var data = $(el).attr('data');
      data = data.split('_');
      if ($('.check_box', el).hasClass('active')) {
        $('.check_box', el).removeClass('active');
        this.remove_url_query_string(data[0], data[2], page_url);
        this.remove_filter_tag(data[0], data[2], page_url);
      } else {
        $('.check_box', el).addClass('active');
        this.add_url_query_string(data[0], data[2], page_url);
        this.add_filter_tag(data, data[0], data[2], page_url);
      }
    },
    remove_url_query_string: function remove_url_query_string(key, value, page_url) {
      var url = page_url == undefined ? window.location.href : page_url;
      var check = url.split(key);
      var params = url.split('?');
      var h = 0;
      if (params[1] != undefined) {
        if (params[1].indexOf('&') > -1) {
          var vars = params[1].split('&');
          for (var i in vars) {
            var k = vars[i].split('=')[0];
            var v = vars[i].split('=')[1];
            var n = k.indexOf(key);
            if (n > -1 && v != value) {
              k = k.replace(key, '');
              k = k.replace('[', '');
              k = k.replace(']', '');
              var new_string = key + "[" + h + "]=" + v;
              var old_string = key + "[" + k + "]=" + v;
              url = url.replace(old_string, new_string);
              h++;
            } else if (n > -1) {
              url = url.replace('&' + k + "=" + v, '');
              url = url.replace('?' + k + "=" + v, '');
            }
          }
        } else {
          url = url.replace('?' + key + "[0]" + "=" + value, '');
        }
      }
      var url_params = url.split('?');
      if (url_params[1] == undefined) {
        url = url.replace('&', '?');
      }
      this.changed_url(url);
    },
    get_request_url: function get_request_url(url, page) {
      var url_param = url.split('?');
      if (url_param[1] == undefined) {
        url = url + "?page=" + page;
      } else {
        url = url + "&page=" + page;
      }
      return url;
    },
    set_product_sort: function set_product_sort() {
      var params = new window.URLSearchParams(window.location.search);
      var url = window.location.href;
      if (params.get("sortby") != null) {
        var sortby = parseInt(params.get("sortby"));
        if (sortby >= 21 && sortby <= 25) {
          this.sort = sortby;
        }
      }
    },
    search_product: function search_product(event, el) {
      if (event.keyCode == 13) {
        var search_text = $(el).val();
        if (search_text.trim().length == 0) {
          if (this.search_string != "") {
            this.remove_url_params('string', this.search_string);
            this.search_string = '';
            this.getProduct(1);
          }
        } else {
          if (search_text.trim().length > 1) {
            this.search_string = search_text;
            this.add_url_param('string', search_text);
            this.getProduct(1);
          }
        }
      }
    },
    remove_url_params: function remove_url_params(key, value, page_url) {
      var params = new window.URLSearchParams(window.location.search);
      if (page_url != undefined) {
        var search_url_params = this.search_url.split('?');
        if (search_url_params[1] != undefined) {
          search_url_params = '?' + search_url_params[1];
          params = new window.URLSearchParams(search_url_params);
        }
        console.log(search_url_params);
      }
      var url = page_url == undefined ? window.location.href : page_url;
      if (params.get(key) != null) {
        value = encodeURIComponent(value);
        url = url.replace('&' + key + "=" + value, '');
        url = url.replace('?' + key + "=" + value, '');
        this.remove_filter_tag(key, value);
        var url_params = url.split('?');
        if (url_params[1] == undefined) {
          url = url.replace('&', '?');
        }
        if (page_url == undefined) {
          this.setPageUrl(url);
          this.getProduct(1);
        } else {
          this.search_url = url;
        }
      }
    },
    set_search_string: function set_search_string() {
      var params = new window.URLSearchParams(window.location.search);
      var url = window.location.href;
      if (params.get('string') != null) {
        this.search_string = params.get('string');
      }
    },
    set_enable_product_status_toggle: function set_enable_product_status_toggle() {
      if (!$("#selected_filter_box").find('div').hasClass('product_status_filter')) {
        $("#filter_div").show();
        var html = '<div class="selected_filter_item product_status_filter">' + '<span>فقط کالاهای موجود</span> <i id="selected_filter_item_remove" class="fa fa-close"></i>' + '</div>';
        $('#selected_filter_box').append(html);
      }
    },
    set_enable_status_toggle: function set_enable_status_toggle() {
      if (!$("#selected_filter_box").find('div').hasClass('send_status_filter')) {
        $("#filter_div").show();
        var html = '<div class="selected_filter_item send_status_filter">' + '<span>کالاهای آماده ارسال</span> <i id="selected_filter_item_remove" class="fa fa-close"></i>' + '</div>';
        $('#selected_filter_box').append(html);
      }
    },
    add_active_filter: function add_active_filter(k, v) {
      if (k.length > 1) {
        var data = "";
        var filter_key = k[0];
        if (k.length == 3) {
          data = k[0] + "[" + k[1] + "_param_" + v;
          data = "'" + data + "'";
          filter_key = k[0] + "[" + k[1];
        } else {
          data = k[0] + "_param_" + v;
        }
        $('li[data=' + data + '] .check_box').addClass('active');
        $('li[data=' + data + ']').parent().parent().slideDown();
        if ($('li[data=' + data + ']').length == 1) {
          this.add_filter_tag(data, filter_key, v);
        }
      } else {
        if (k == "has_product") {
          this.set_enable_product_status_toggle();
        } else if (k == "has_ready_to_shipment") {
          this.set_enable_status_toggle();
        }
      }
    },
    remove_all_filter: function remove_all_filter(page_url) {
      var url = page_url == undefined ? window.location.href : page_url;
      url = url.split('?')[0];
      $('.selected_filter_item').remove();
      $("#filter_div").hide();
      $('.filter_box .list-inline li').find('.check_box').removeClass('active');
      if ($('#product_status .toggle-slide .toggle-on').hasClass('active')) {
        $('#product_status').click();
      }
      if ($('#send_status .toggle-slide .toggle-on').hasClass('active')) {
        $('#send_status').click();
      }
      if (this.noUiSlider) {
        this.noUiSlider.reset();
      }
      if (page_url == undefined) {
        this.setPageUrl(url);
        this.getProduct(1);
      } else {
        this.search_url = url;
      }
    },
    gregorian_to_jalali: function gregorian_to_jalali(gy, gm, gd) {
      var g_d_m, jy, jm, jd, gy2, days;
      g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      gy2 = gm > 2 ? gy + 1 : gy;
      days = 355666 + 365 * gy + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
      jy = -1595 + 33 * ~~(days / 12053);
      days %= 12053;
      jy += 4 * ~~(days / 1461);
      days %= 1461;
      if (days > 365) {
        jy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
      }
      if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + days % 31;
      } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + (days - 186) % 30;
      }
      return [jy, jm, jd];
    },
    show_mobile_box: function show_mobile_box() {
      this.$nextTick(function () {
        $('body').css('overflow-y', 'hidden');
        var width = $(window).width();
        var right = "-" + width + "px";
        $(".mobile_data_box").css({
          'right': right
        });
        setTimeout(function () {
          $(".mobile_data_box").css('right', '0');
        }, 50);
      });
    },
    getLabel: function getLabel(key, key2) {
      key2 = key2 + 1;
      var a = "score" + key2;
      if (this.list.data[key]['get_score'][a] != undefined) {
        return this.scoreLabel[this.list.data[key]['get_score'][a]];
      } else {
        return 'معمولی';
      }
    },
    getWidth: function getWidth(key, key2) {
      key2 = key2 + 1;
      var a = "score" + key2;
      if (this.list.data[key]['get_score'][a] != undefined) {
        return this.list.data[key]['get_score'][a] * 25;
      } else {
        return 50;
      }
    },
    getDate: function getDate(time) {
      time *= 1000;
      var date = new Date(time);
      var jalai = this.gregorian_to_jalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
      var r = this.replaceNumber(jalai[2]) + ' ' + this.monthName[jalai[1] - 1] + ' ' + this.replaceNumber(jalai[0]);
      return r;
    },
    like: function like(element, row_id, table_name, redirect) {
      var _this = this;
      if (this.send) {
        $("#loading").show();
        this.send = false;
        var url = this.$siteUrl + "user/like";
        var formData = new FormData();
        formData.append('row_id', row_id);
        formData.append('table_name', table_name);
        this.axios.post(url, formData).then(function (response) {
          _this.send = true;
          $("#loading").hide();
          if (response.data == "add") {
            element.like = element.like + 1;
          } else if (response.data == "remove") {
            element.like = element.like - 1;
          }
        })["catch"](function (error) {
          _this.send = true;
          $("#loading").hide();
          if (error.response.status == 401) {
            if (redirect != undefined) {
              window.location.href = _this.$siteUrl + "/login";
            } else {
              $("#login_box").modal('show');
            }
          }
        });
      }
    },
    dislike: function dislike(element, row_id, table_name, redirect) {
      var _this2 = this;
      if (this.send) {
        $("#loading").show();
        this.send = false;
        var url = this.$siteUrl + "user/dislike";
        var formData = new FormData();
        formData.append('row_id', row_id);
        formData.append('table_name', table_name);
        this.axios.post(url, formData).then(function (response) {
          _this2.send = true;
          $("#loading").hide();
          if (response.data == "add") {
            element.dislike = element.dislike + 1;
          } else if (response.data == "remove") {
            element.dislike = element.dislike - 1;
          }
        })["catch"](function (error) {
          _this2.send = true;
          $("#loading").hide();
          if (error.response.status == 401) {
            if (redirect != undefined) {
              window.location.href = _this2.$siteUrl + "/login";
            } else {
              $("#login_box").modal('show');
            }
          }
        });
      }
    },
    hide_transition_box: function hide_transition_box() {
      this.show_box = false;
      $('body').css('overflow-y', 'auto');
    },
    showModalBox: function showModalBox() {
      this.$refs.data.setTitle('افزودن آدرس جدید');
      $("#myModal").modal('show');
    }
  }
});

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!******************************************************************!*\
  !*** multi ./resources/js/AdminVue.js ./resources/sass/app.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! H:\xampp\htdocs\DigiKala\resources\js\AdminVue.js */"./resources/js/AdminVue.js");
module.exports = __webpack_require__(/*! H:\xampp\htdocs\DigiKala\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });