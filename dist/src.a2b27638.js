// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Object/Ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Ball = /*#__PURE__*/function () {
  function Ball(_ref) {
    var x = _ref.x,
      y = _ref.y,
      dx = _ref.dx,
      dy = _ref.dy,
      maxEnergy = _ref.maxEnergy,
      radius = _ref.radius,
      canvas = _ref.canvas,
      fillStyle = _ref.fillStyle;
    _classCallCheck(this, Ball);
    _defineProperty(this, "outOfBounds", false);
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.energy = maxEnergy;
    this.radius = radius;
    this.canvas = canvas;
    this.fillStyle = fillStyle;
  }
  _createClass(Ball, [{
    key: "updateMovement",
    value: function updateMovement(ball) {
      var canvas = ball.canvas,
        radius = ball.radius;
      if (ball.energy > 0) {
        ball.energy -= 0.01;
      }
      ball.x += ball.dx * ball.energy;
      ball.y += ball.dy * ball.energy;
      var outCanvasWidth = ball.x <= 0 + radius || ball.x >= canvas.width - radius;
      var outCanvasHeight = ball.y <= 0 + radius || ball.y >= canvas.height - radius;
      // flip direction if ball reaches edge of canvas
      if (outCanvasWidth && !ball.outOfBounds) {
        ball.dx = -ball.dx;
      }
      if (outCanvasHeight && !ball.outOfBounds) {
        ball.dy = -ball.dy;
      }
      var isOutOfBounds = (outCanvasWidth || outCanvasHeight) && !ball.outOfBounds;
      if (isOutOfBounds) {
        ball.outOfBounds = true;
      } else {
        ball.outOfBounds = false;
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      var canvas = this.canvas,
        radius = this.radius,
        fillStyle = this.fillStyle,
        x = this.x,
        y = this.y,
        updateMovement = this.updateMovement;
      var ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.globalAlpha = 1;
      ctx.fillStyle = fillStyle;
      ctx.fill(); // fill the circle with the current fill color
      ctx.closePath();
      updateMovement(this);
    }
  }]);
  return Ball;
}();
exports.Ball = Ball;
},{}],"src/Object/ClickBubble.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickBubble = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ClickBubble = /*#__PURE__*/function () {
  function ClickBubble(_ref) {
    var _ref$x = _ref.x,
      x = _ref$x === void 0 ? -50 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? -50 : _ref$y,
      fadeOutRate = _ref.fadeOutRate,
      radius = _ref.radius,
      canvas = _ref.canvas,
      fillStyle = _ref.fillStyle,
      energy = _ref.energy;
    _classCallCheck(this, ClickBubble);
    _defineProperty(this, "alpha", 1);
    this.x = x;
    this.y = y;
    this.fadeOutRate = fadeOutRate;
    this.radius = radius;
    this.canvas = canvas;
    this.fillStyle = fillStyle;
    this.energy = energy;
  }
  _createClass(ClickBubble, [{
    key: "draw",
    value: function draw(mouseOnClickEvent) {
      var fillStyle = this.fillStyle,
        alpha = this.alpha,
        fadeOutRate = this.fadeOutRate,
        radius = this.radius,
        y = this.y,
        x = this.x,
        canvas = this.canvas;
      if (mouseOnClickEvent) {
        var offsetX = mouseOnClickEvent.offsetX,
          offsetY = mouseOnClickEvent.offsetY;
        this.x = offsetX;
        this.y = offsetY;
        this.alpha = 1;
      }
      var ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      this.alpha -= fadeOutRate;
      ctx.globalAlpha = alpha >= 0 ? alpha : 0;
      ctx.fillStyle = fillStyle;
      ctx.fill(); // fill the circle with the current fill color
      ctx.closePath();
    }
  }, {
    key: "clickBall",
    value: function clickBall(ball) {
      var x = this.x,
        y = this.y,
        radius = this.radius,
        energy = this.energy;
      var clickXFromBall = x + radius > ball.x ? x - ball.x : x + radius - ball.x;
      var clickYFromBall = y + radius > ball.y ? y - ball.y : y + radius - ball.y;
      var distance = Math.sqrt(clickXFromBall * clickXFromBall + clickYFromBall * clickYFromBall);
      if (distance > ball.radius) {
        return;
      }
      var angle = Math.atan2(clickYFromBall, clickXFromBall);
      // - angle is north hemi, + angle is south hemi.
      var half = Math.PI / 2;
      if (angle < 0) {
        angle = Math.abs(angle);
        if (angle < half) {
          var percent = angle / half;
          ball.dx = -(energy * (1 - percent));
          ball.dy = energy * percent;
        } else {
          var _percent = (angle - half) / half;
          ball.dx = energy * _percent;
          ball.dy = energy * (1 - _percent);
        }
      } else {
        if (angle < half) {
          var _percent2 = angle / half;
          ball.dx = -(energy * (1 - _percent2));
          ball.dy = -(energy * _percent2);
        } else {
          var _percent3 = (angle - half) / half;
          ball.dx = energy * _percent3;
          ball.dy = -(energy * (1 - _percent3));
        }
      }
      ball.energy = 1;
    }
  }]);
  return ClickBubble;
}();
exports.ClickBubble = ClickBubble;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _Ball = require("./Object/Ball");
var _ClickBubble = require("./Object/ClickBubble");
// TODO - Refactor. Create classes for each drawn object.

var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');
var ball = new _Ball.Ball({
  x: canvas.width / 2,
  y: canvas.width / 2,
  dx: 0,
  dy: 0,
  maxEnergy: 1,
  radius: 12,
  fillStyle: 'red',
  canvas: canvas
});
var clickBubble = new _ClickBubble.ClickBubble({
  canvas: canvas,
  energy: 6,
  fadeOutRate: 0.03,
  fillStyle: 'lightgreen',
  radius: 6
});
canvas.addEventListener('click', function (e) {
  clickBubble.draw(e);
  clickBubble.clickBall(ball);
});
function animate() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  clickBubble.draw();
  requestAnimationFrame(animate);
}
animate();
},{"./Object/Ball":"src/Object/Ball.js","./Object/ClickBubble":"src/Object/ClickBubble.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65172" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map