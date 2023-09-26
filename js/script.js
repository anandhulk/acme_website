/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@iabtcf/stub/lib/stub.js":
/*!***********************************************!*\
  !*** ./node_modules/@iabtcf/stub/lib/stub.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(){var t=function(){var t,e,o=[],n=window,r=n;for(;r;){try{if(r.frames.__tcfapiLocator){t=r;break}}catch(t){}if(r===n.top)break;r=r.parent}t||(!function t(){var e=n.document,o=!!n.frames.__tcfapiLocator;if(!o)if(e.body){var r=e.createElement("iframe");r.style.cssText="display:none",r.name="__tcfapiLocator",e.body.appendChild(r)}else setTimeout(t,5);return!o}(),n.__tcfapi=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if(!n.length)return o;"setGdprApplies"===n[0]?n.length>3&&2===parseInt(n[1],10)&&"boolean"==typeof n[3]&&(e=n[3],"function"==typeof n[2]&&n[2]("set",!0)):"ping"===n[0]?"function"==typeof n[2]&&n[2]({gdprApplies:e,cmpLoaded:!1,cmpStatus:"stub"}):o.push(n)},n.addEventListener("message",(function(t){var e="string"==typeof t.data,o={};if(e)try{o=JSON.parse(t.data)}catch(t){}else o=t.data;var n="object"===_typeof(o)&&null!==o?o.__tcfapiCall:null;n&&window.__tcfapi(n.command,n.version,(function(o,r){var a={__tcfapiReturn:{returnValue:o,success:r,callId:n.callId}};t&&t.source&&t.source.postMessage&&t.source.postMessage(e?JSON.stringify(a):a,"*")}),n.parameter)}),!1))}; true?module.exports=t:0}();

/***/ }),

/***/ "./node_modules/classlist-polyfill/src/index.js":
/*!******************************************************!*\
  !*** ./node_modules/classlist-polyfill/src/index.js ***!
  \******************************************************/
/***/ (() => {

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in window.self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) 
	|| document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
	  classListProp = "classList"
	, protoProp = "prototype"
	, elemCtrProto = view.Element[protoProp]
	, objCtr = Object
	, strTrim = String[protoProp].trim || function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
	, arrIndexOf = Array[protoProp].indexOf || function (item) {
		var
			  i = 0
			, len = this.length
		;
		for (; i < len; i++) {
			if (i in this && this[i] === item) {
				return i;
			}
		}
		return -1;
	}
	// Vendors: please allow content code to instantiate DOMExceptions
	, DOMEx = function (type, message) {
		this.name = type;
		this.code = DOMException[type];
		this.message = message;
	}
	, checkTokenAndGetIndex = function (classList, token) {
		if (token === "") {
			throw new DOMEx(
				  "SYNTAX_ERR"
				, "An invalid or illegal string was specified"
			);
		}
		if (/\s/.test(token)) {
			throw new DOMEx(
				  "INVALID_CHARACTER_ERR"
				, "String contains an invalid character"
			);
		}
		return arrIndexOf.call(classList, token);
	}
	, ClassList = function (elem) {
		var
			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length
		;
		for (; i < len; i++) {
			this.push(classes[i]);
		}
		this._updateClassName = function () {
			elem.setAttribute("class", this.toString());
		};
	}
	, classListProto = ClassList[protoProp] = []
	, classListGetter = function () {
		return new ClassList(this);
	}
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
	return this[i] || null;
};
classListProto.contains = function (token) {
	token += "";
	return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
	;
	do {
		token = tokens[i] + "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.push(token);
			updated = true;
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.remove = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
		, index
	;
	do {
		token = tokens[i] + "";
		index = checkTokenAndGetIndex(this, token);
		while (index !== -1) {
			this.splice(index, 1);
			updated = true;
			index = checkTokenAndGetIndex(this, token);
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.toggle = function (token, force) {
	token += "";

	var
		  result = this.contains(token)
		, method = result ?
			force !== true && "remove"
		:
			force !== false && "add"
	;

	if (method) {
		this[method](token);
	}

	if (force === true || force === false) {
		return force;
	} else {
		return !result;
	}
};
classListProto.toString = function () {
	return this.join(" ");
};

if (objCtr.defineProperty) {
	var classListPropDesc = {
		  get: classListGetter
		, enumerable: true
		, configurable: true
	};
	try {
		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	} catch (ex) { // IE 8 doesn't support enumerable:true
		// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
		// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
		if (ex.number === undefined || ex.number === -0x7FF5EC54) {
			classListPropDesc.enumerable = false;
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		}
	}
} else if (objCtr[protoProp].__defineGetter__) {
	elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(window.self));

}

// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
	"use strict";

	var testElement = document.createElement("_");

	testElement.classList.add("c1", "c2");

	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
	// classList.remove exist but support only one argument at a time.
	if (!testElement.classList.contains("c2")) {
		var createMethod = function(method) {
			var original = DOMTokenList.prototype[method];

			DOMTokenList.prototype[method] = function(token) {
				var i, len = arguments.length;

				for (i = 0; i < len; i++) {
					token = arguments[i];
					original.call(this, token);
				}
			};
		};
		createMethod('add');
		createMethod('remove');
	}

	testElement.classList.toggle("c3", false);

	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	// support the second argument.
	if (testElement.classList.contains("c3")) {
		var _toggle = DOMTokenList.prototype.toggle;

		DOMTokenList.prototype.toggle = function(token, force) {
			if (1 in arguments && !this.contains(token) === !force) {
				return force;
			} else {
				return _toggle.call(this, token);
			}
		};

	}

	testElement = null;
}());

}


/***/ }),

/***/ "./node_modules/custom-event-polyfill/polyfill.js":
/*!********************************************************!*\
  !*** ./node_modules/custom-event-polyfill/polyfill.js ***!
  \********************************************************/
/***/ (() => {

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

(function() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    var ce = new window.CustomEvent('test', { cancelable: true });
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
      // IE has problems with .preventDefault() on custom events
      // http://stackoverflow.com/questions/23349191
      throw new Error('Could not prevent default');
    }
  } catch (e) {
    var CustomEvent = function(event, params) {
      var evt, origPrevent;
      params = params || {};
      params.bubbles = !!params.bubbles;
      params.cancelable = !!params.cancelable;

      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );
      origPrevent = evt.preventDefault;
      evt.preventDefault = function() {
        origPrevent.call(this);
        try {
          Object.defineProperty(this, 'defaultPrevented', {
            get: function() {
              return true;
            }
          });
        } catch (e) {
          this.defaultPrevented = true;
        }
      };
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent; // expose definition to window
  }
})();


/***/ }),

/***/ "./node_modules/navigator.sendbeacon/dist/navigator.sendbeacon.es.js":
/*!***************************************************************************!*\
  !*** ./node_modules/navigator.sendbeacon/dist/navigator.sendbeacon.es.js ***!
  \***************************************************************************/
/***/ (() => {

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var isString = function isString(val) {
  return typeof val === 'string';
};

var isBlob = function isBlob(val) {
  return val instanceof Blob;
};

polyfill.call((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window :  false || {});

function polyfill() {
  if (!('navigator' in this)) {
    this.navigator = {};
  }

  if (typeof this.navigator.sendBeacon !== 'function') {
    this.navigator.sendBeacon = sendBeacon.bind(this);
  }
}

function sendBeacon(url, data) {
  var event = this.event && this.event.type;
  var sync = event === 'unload' || event === 'beforeunload';
  var xhr = 'XMLHttpRequest' in this ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('POST', url, !sync);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Accept', '*/*');

  if (isString(data)) {
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    xhr.responseType = 'text';
  } else if (isBlob(data) && data.type) {
    xhr.setRequestHeader('Content-Type', data.type);
  }

  try {
    xhr.send(data);
  } catch (error) {
    return false;
  }

  return true;
}


/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOMException": () => (/* binding */ DOMException),
/* harmony export */   "Headers": () => (/* binding */ Headers),
/* harmony export */   "Request": () => (/* binding */ Request),
/* harmony export */   "Response": () => (/* binding */ Response),
/* harmony export */   "fetch": () => (/* binding */ fetch)
/* harmony export */ });
var global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global)

var support = {
  searchParams: 'URLSearchParams' in global,
  iterable: 'Symbol' in global && 'iterator' in Symbol,
  blob:
    'FileReader' in global &&
    'Blob' in global &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in global,
  arrayBuffer: 'ArrayBuffer' in global
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name: "' + name + '"')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    this.bodyUsed = this.bodyUsed
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this)
        if (isConsumed) {
          return isConsumed
        }
        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          )
        } else {
          return Promise.resolve(this._bodyArrayBuffer)
        }
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }

  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/
      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime())
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime()
      }
    }
  }
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(function(header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
    })
    .forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = options.statusText === undefined ? '' : '' + options.statusText
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = global.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      setTimeout(function() {
        resolve(new Response(body, options))
      }, 0)
    }

    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException('Aborted', 'AbortError'))
      }, 0)
    }

    function fixUrl(url) {
      try {
        return url === '' && global.location.href ? global.location.href : url
      } catch (e) {
        return url
      }
    }

    xhr.open(request.method, fixUrl(request.url), true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob'
      } else if (
        support.arrayBuffer &&
        request.headers.get('Content-Type') &&
        request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
      ) {
        xhr.responseType = 'arraybuffer'
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]))
      })
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!global.fetch) {
  global.fetch = fetch
  global.Headers = Headers
  global.Request = Request
  global.Response = Response
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!***************************!*\
  !*** ./data/polyfills.js ***!
  \***************************/
__webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");

__webpack_require__(/*! custom-event-polyfill */ "./node_modules/custom-event-polyfill/polyfill.js");

__webpack_require__(/*! classlist-polyfill */ "./node_modules/classlist-polyfill/src/index.js");

__webpack_require__(/*! navigator.sendbeacon */ "./node_modules/navigator.sendbeacon/dist/navigator.sendbeacon.es.js");

if (!Element.prototype.toggleAttribute) {
  Element.prototype.toggleAttribute = function (name, force) {
    if (force !== void 0) force = !!force;

    if (this.hasAttribute(name)) {
      if (force) return true;
      this.removeAttribute(name);
      return false;
    }

    if (force === false) return false;
    this.setAttribute(name, "");
    return true;
  };
}

if (!Element.prototype.remove) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*******************************************!*\
  !*** ./d1UJNckHh4ZrsGzW3K6Su-original.js ***!
  \*******************************************/
function _ckyCheckDomain() {
  try {
    const registered = "anandhulk.github.io".replace(/^www\./, "");
    const domains = window.location.hostname.replace(/^www\./, "").split(".");

    for (let index = 0; index < domains.length; index++) {
      const domain = domains.slice(index).join(".");
      if (domain === registered) return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

if (!_ckyCheckDomain()) throw new Error(`It looks like your website URL has been changed. To ensure the proper functioning of your banner, update the registered URL on your CookieYes account (More > Site Settings) and reload this page to retry. If the issue persists, contact us at https://www.cookieyes.com/support.`);
window.cookieyes = window.cookieyes || {};
const ref = window.cookieyes;

ref._ckyGetCookieMap = function () {
  const cookieMap = {};

  try {
    document.cookie.split(";").map(cookie => {
      const [key, value] = cookie.split("=");
      if (!key) return;
      cookieMap[key.trim()] = value;
    });
  } catch (error) {}

  return cookieMap;
};

ref._ckySetCookie = function (name, value, days = 0, domain = ref._ckyStore._rootDomain) {
  const date = new Date();
  const toSetTime = days === 0 ? 0 : date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${new Date(toSetTime).toUTCString()}; path=/;domain=${domain}; SameSite=Strict;`;
};

ref._ckyRandomString = function (length, allChars = true) {
  const chars = `${allChars ? `0123456789` : ""}ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz`;
  const response = [];

  for (let i = 0; i < length; i++) response.push(chars[Math.floor(Math.random() * chars.length)]);

  if (!allChars) return response.join("");
  return btoa(response.join("")).replace(/\=+$/, "");
};

ref._ckyIsCategoryToBeBlocked = function (category) {
  const cookieValue = ref._ckyGetFromStore(category);

  return cookieValue === "no" || !cookieValue && ref._ckyStore._categories.some(cat => cat.slug === category && !cat.isNecessary);
};

function _ckyCleanHostName(name) {
  return name.replace(/^www./, "");
}

function _ckyEscapeRegex(literal) {
  return literal.replace(/[.*+?^${}()[\]\\]/g, "\\$&");
}

ref._ckyShouldBlockProvider = function (formattedRE) {
  const provider = ref._ckyStore._providersToBlock.find(({
    url
  }) => new RegExp(_ckyEscapeRegex(url)).test(formattedRE));

  return provider && provider.categories.some(category => ref._ckyIsCategoryToBeBlocked(category));
};

ref._ckyStore = {
  _backupNodes: [],
  _categories: [{
    "slug": "necessary",
    "isNecessary": true,
    "defaultConsent": {
      "gdpr": true,
      "ccpa": true
    },
    "cookies": [{
      "cookieID": "cookieyes-consent",
      "domain": ".anandhulk.github.io"
    }, {
      "cookieID": "euconsent",
      "domain": ".anandhulk.github.io"
    }]
  }, {
    "slug": "functional",
    "isNecessary": false,
    "defaultConsent": {
      "gdpr": false,
      "ccpa": true
    },
    "cookies": [{
      "cookieID": "username",
      "domain": "anandhulk.github.io"
    }, {
      "cookieID": "functionalDummy1",
      "domain": "anandhulk.github.io"
    }, {
      "cookieID": "functionalDummy2",
      "domain": "anandhulk.github.io"
    }]
  }, {
    "slug": "analytics",
    "isNecessary": false,
    "defaultConsent": {
      "gdpr": false,
      "ccpa": false
    },
    "cookies": [{
      "cookieID": "AnalyticsDummy1",
      "domain": "anandhulk.github.io"
    }, {
      "cookieID": "AnalyticsDummy2",
      "domain": "anandhulk.github.io"
    }, {
      "cookieID": "_ga",
      "domain": ".anandhulk.github.io"
    }, {
      "cookieID": "_ga_*",
      "domain": ".anandhulk.github.io"
    }]
  }, {
    "slug": "performance",
    "isNecessary": false,
    "defaultConsent": {
      "gdpr": false,
      "ccpa": false
    },
    "cookies": [{
      "cookieID": "perfomanceDummy1",
      "domain": "anandhulk.github.io"
    }, {
      "cookieID": "perfomanceDummy2",
      "domain": "anandhulk.github.io"
    }]
  }, {
    "slug": "advertisement",
    "isNecessary": false,
    "defaultConsent": {
      "gdpr": false,
      "ccpa": false
    },
    "cookies": []
  }, {
    "slug": "other",
    "isNecessary": false,
    "defaultConsent": {
      "gdpr": false,
      "ccpa": false
    },
    "cookies": [{
      "cookieID": "AdvertisementDummy1",
      "domain": "anandhulk.github.io"
    }, {
      "cookieID": "AdvertisementDummy2",
      "domain": "anandhulk.github.io"
    }]
  }],
  _providersToBlock: [{
    "url": "google-analytics.com|googletagmanager.com/gtag/js",
    "categories": ["analytics"],
    "fullPath": false
  }],
  _rootDomain: "anandhulk.github.io",
  _commonShortCodes: [{
    "key": "cky_audit_table",
    "content": {
      "container": "<ul class=\"cky-cookie-des-table\">[CONTENT]</ul>"
    },
    "uiTag": "audit-table",
    "type": "data",
    "customTag": "",
    "attributes": {}
  }, {
    "key": "cky_outside_audit_table",
    "content": {
      "container": "<h3>[cky_preference_{{category_slug}}_title]</h3><div class=\"cky-table-wrapper\"><table class=\"cky-cookie-audit-table\">[CONTENT]</tbody></table></div>"
    },
    "uiTag": "video-placeholder",
    "type": "data",
    "customTag": "",
    "attributes": {}
  }, {
    "key": "cky_audit_table_empty",
    "content": {
      "container": "<p class=\"cky-empty-cookies-text\">[cky_audit_table_empty_text]</p>"
    },
    "uiTag": "audit-table",
    "type": "data",
    "customTag": "",
    "attributes": {}
  }],
  _resetConsentID: false,
  _bannerAttached: false,
  _gpcStatus: !!navigator.globalPrivacyControl
};
ref._ckyConsentStore = new Map();

ref._ckyGetFromStore = function (key) {
  return ref._ckyConsentStore.get(key) || "";
};

let currentCookieMap = ref._ckyGetCookieMap();

ref._ckySetInStore = function (key, value) {
  ref._ckyConsentStore.set(key, value);

  const cookieStringArray = [];

  for (const [key, value] of ref._ckyConsentStore) {
    cookieStringArray.push(`${key}:${value}`);
  }

  const scriptExpiry = ref._ckyStore._bannerConfig && ref._ckyStore._bannerConfig.scriptExpiry ? ref._ckyStore._bannerConfig.scriptExpiry : 365;

  ref._ckySetCookie("cookieyes-consent", cookieStringArray.join(","), scriptExpiry);
};

let cookieyesConsentMap = (currentCookieMap["cookieyes-consent"] || "").split(",").reduce((prev, curr) => {
  if (!curr) return prev;
  const [key, value] = curr.split(":");
  prev[key] = value;
  return prev;
}, {});
["consentid", "consent", "action"].concat(ref._ckyStore._categories.map(({
  slug
}) => slug)).map(item => ref._ckyConsentStore.set(item, cookieyesConsentMap[item] || ""));
const currentTCFData = (currentCookieMap["euconsent"] || "").split(",");
Object.assign(ref._ckyStore, {
  _prevTCString: currentTCFData[0] || "",
  _prevGoogleACMString: currentTCFData[1] || ""
});

function _ckySetConsentID() {
  const cookieyesID = ref._ckyGetFromStore("consentid");

  if (cookieyesID) return;

  const consentID = ref._ckyRandomString(32);

  ref._ckySetInStore("consentid", consentID);

  ref._ckyStore._resetConsentID = true;
}

ref._ckySendPageViewLog = function (requestType, bannerID = "") {
  try {
    const payload = {
      consent_session_id: ref._ckyGetFromStore("consentid"),
      banner_id: bannerID
    };
    const data = new FormData();
    data.append("key", "3a8196c3494857295a4ab43b");
    data.append("request_type", requestType);
    data.append("event_log_time", Math.round(Date.now() / 1000));
    data.append("payload", JSON.stringify(payload));
    navigator.sendBeacon("https://phpstack-273836-2851169.cloudwaysapps.com/api/v1/log", data);
  } catch (err) {
    console.error(err);
  }
};

const cmpstub = __webpack_require__(/*! @iabtcf/stub */ "./node_modules/@iabtcf/stub/lib/stub.js");

cmpstub();

_ckySetConsentID();

ref._ckySendPageViewLog("banner_load");

try {
  ref._ckyCreateElementBackup = document.createElement;

  document.createElement = (...args) => {
    const createdElement = ref._ckyCreateElementBackup.call(document, ...args);

    if (createdElement.nodeName.toLowerCase() !== "script") return createdElement;
    const originalSetAttribute = createdElement.setAttribute.bind(createdElement);
    Object.defineProperties(createdElement, {
      src: {
        get: function () {
          return createdElement.getAttribute("src");
        },
        set: function (value) {
          if (_ckyShouldChangeType(createdElement, value)) originalSetAttribute("type", "javascript/blocked");
          originalSetAttribute("src", value);
          return true;
        },
        configurable: true
      },
      type: {
        get: function () {
          return createdElement.getAttribute("type");
        },
        set: function (value) {
          value = _ckyShouldChangeType(createdElement) ? "javascript/blocked" : value;
          originalSetAttribute("type", value);
          return true;
        },
        configurable: true
      }
    });

    createdElement.setAttribute = (name, value) => {
      if (name === "type" || name === "src") return createdElement[name] = value;
      originalSetAttribute(name, value);
      if (name === "data-cookieyes" && !_ckyShouldChangeType(createdElement)) originalSetAttribute("type", "text/javascript");
    };

    return createdElement;
  };
} catch (error) {
  console.error(error);
}

function _ckyMutationObserver(mutations) {
  for (const {
    addedNodes
  } of mutations) {
    for (const node of addedNodes) {
      if (!node.src || !node.nodeName || !["script", "iframe"].includes(node.nodeName.toLowerCase())) continue;

      try {
        const urlToParse = node.src.startsWith("//") ? `${window.location.protocol}${node.src}` : node.src;
        const {
          hostname,
          pathname
        } = new URL(urlToParse);

        const cleanedHostname = _ckyCleanHostName(`${hostname}${pathname}`);

        _ckyAddProviderToList(node, cleanedHostname);

        if (!ref._ckyShouldBlockProvider(cleanedHostname)) continue;

        const uniqueID = ref._ckyRandomString(8, false);

        if (node.nodeName.toLowerCase() === "iframe") {
          _ckyAddPlaceholder(node, uniqueID);

          if (ref._ckyStore._bannerAttached && ref._ckySetPlaceHolder) ref._ckySetPlaceHolder(uniqueID);
        } else {
          node.type = "javascript/blocked";

          const scriptEventListener = function (event) {
            event.preventDefault();
            node.removeEventListener("beforescriptexecute", scriptEventListener);
          };

          node.addEventListener("beforescriptexecute", scriptEventListener);
        }

        const position = document.head.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY ? "head" : "body";
        node.remove();

        ref._ckyStore._backupNodes.push({
          position,
          node: node.cloneNode(),
          uniqueID
        });
      } catch (error) {}
    }
  }
}

function _ckyAddProviderToList(node, cleanedHostname) {
  const nodeCategory = node.hasAttribute("data-cookieyes") && node.getAttribute("data-cookieyes");
  if (!nodeCategory) return;
  const categoryName = nodeCategory.replace("cookieyes-", "");

  for (const category of ref._ckyStore._categories) if (category.isNecessary && category.slug === categoryName) return;

  const provider = ref._ckyStore._providersToBlock.find(({
    url
  }) => url === cleanedHostname);

  if (!provider) ref._ckyStore._providersToBlock.push({
    url: cleanedHostname,
    categories: [categoryName],
    fullPath: false
  });else if (!provider.isOverriden) {
    provider.categories = [categoryName];
    provider.isOverriden = true;
  } else if (!provider.categories.includes(categoryName)) provider.categories.push(categoryName);
}

function _ckyAddPlaceholder(htmlElm, uniqueID) {
  const {
    offsetWidth,
    offsetHeight
  } = htmlElm;
  if (offsetWidth === 0 || offsetHeight === 0) return;
  htmlElm.insertAdjacentHTML("beforebegin", `<div class="video-placeholder-normal" data-cky-tag="video-placeholder" id="[UNIQUEID]"><p class="video-placeholder-text-normal" data-cky-tag="placeholder-title">[cky_video_placeholder_title]</p></div>`.replace("[UNIQUEID]", uniqueID));
  const addedNode = document.getElementById(uniqueID);
  addedNode.style.width = `${offsetWidth}px`;
  addedNode.style.height = `${offsetHeight}px`;
  const innerTextElement = document.querySelector(`#${uniqueID} .video-placeholder-text-normal`);
  innerTextElement.style.display = "none";

  const youtubeID = _ckyGetYoutubeID(htmlElm.src);

  if (!youtubeID) return;
  addedNode.classList.replace("video-placeholder-normal", "video-placeholder-youtube");
  addedNode.style.backgroundImage = `linear-gradient(rgba(76,72,72,.7),rgba(76,72,72,.7)),url('https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg')`;
  innerTextElement.classList.replace("video-placeholder-text-normal", "video-placeholder-text-youtube");
}

function _ckyGetYoutubeID(src) {
  const match = src.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
  if (match && Array.isArray(match) && match[2] && match[2].length === 11) return match[2];
  return false;
}

function _ckyShouldChangeType(element, src) {
  return element.hasAttribute("data-cookieyes") && ref._ckyIsCategoryToBeBlocked(element.getAttribute("data-cookieyes").replace("cookieyes-", "")) || ref._ckyShouldBlockProvider(src ? src : element.src);
}

ref._nodeListObserver = new MutationObserver(_ckyMutationObserver);

ref._nodeListObserver.observe(document.documentElement, {
  childList: true,
  subtree: true
});

const bannerScript = document.createElement("script");
bannerScript.src = `./js/banner.js`;
bannerScript.async = true;
bannerScript.id = "cookieyes-banner";
document.head.appendChild(bannerScript);
})();

/******/ })()
;
