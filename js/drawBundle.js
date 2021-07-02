/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/background/animated_background.js":
/*!**************************************************!*\
  !*** ./src/js/background/animated_background.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ \"./src/js/background/point.js\");\n/* harmony import */ var _vertex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vertex */ \"./src/js/background/vertex.js\");\n/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shape */ \"./src/js/background/shape.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\nvar AnimatedBackground = /*#__PURE__*/function () {\n  function AnimatedBackground(tagId, artboard) {\n    var drawMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n\n    _classCallCheck(this, AnimatedBackground);\n\n    this.canvas = {};\n    this.mouse = {\n      x: 0,\n      y: 0\n    };\n    this.drawMode = drawMode;\n    this.options = artboard.options;\n    this.modified = false;\n\n    this._initCanvas(tagId);\n\n    this._initShapes(artboard);\n\n    window.requestAnimationFrame(this._drawArt.bind(this));\n\n    this._installListeners();\n  }\n\n  _createClass(AnimatedBackground, [{\n    key: \"addNewPoint\",\n    value: function addNewPoint(x, y) {\n      this.modified = true;\n      var newPt = new _point__WEBPACK_IMPORTED_MODULE_0__.default(x, y, this.points.length, this.canvas, this.mouse);\n      this.points.push(newPt); // vertex will handle visual aspect\n\n      this.vertices.push(new _vertex__WEBPACK_IMPORTED_MODULE_1__.default(newPt, this.options.vertices));\n    }\n  }, {\n    key: \"_initCanvas\",\n    value: function _initCanvas(tagId) {\n      this.canvas.el = document.getElementById(tagId);\n      this.canvas.el.width = window.innerWidth;\n      this.canvas.el.height = window.innerHeight;\n      this.canvas.ctx = this.canvas.el.getContext('2d');\n    }\n  }, {\n    key: \"_initShapes\",\n    value: function _initShapes(_ref) {\n      var _this = this;\n\n      var points = _ref.points,\n          lines = _ref.lines,\n          polygons = _ref.polygons;\n      this.vertices = [];\n      this.points = [];\n\n      for (var id in points) {\n        var ptObj = new _point__WEBPACK_IMPORTED_MODULE_0__.default(points[id][0], points[id][1], id, this.canvas, this.mouse);\n        ptObj.scaleToArtboard();\n        this.points.push(ptObj); // vertex will handle visual aspect\n\n        this.vertices.push(new _vertex__WEBPACK_IMPORTED_MODULE_1__.default(ptObj, this.options.vertices));\n      }\n\n      this.lines = lines.map(function (pointIds) {\n        return new _shape__WEBPACK_IMPORTED_MODULE_2__.default(pointIds, _this.points, _this.options.shapes, true, false);\n      });\n      this.polygons = polygons.map(function (pointIds) {\n        return new _shape__WEBPACK_IMPORTED_MODULE_2__.default(pointIds, _this.points, _this.options.shapes, false, true);\n      });\n    }\n  }, {\n    key: \"_drawArt\",\n    value: function _drawArt(timestamp) {\n      var ctx = this.canvas.ctx;\n      ctx.clearRect(0, 0, this.canvas.el.width, this.canvas.el.height); // order of shapes drawn is important for visual appeal\n\n      this.polygons.forEach(function (shape) {\n        return shape.draw(ctx);\n      });\n      this.lines.forEach(function (shape) {\n        return shape.draw(ctx);\n      });\n      this.vertices.forEach(function (vtx) {\n        return vtx.draw(ctx);\n      });\n\n      if (this.drawMode) {\n        this.vertices.forEach(function (vtx) {\n          return vtx.label(ctx);\n        });\n      } else {\n        if (!this.animStart) this.animStart = timestamp;\n        var elapsed = timestamp - this.animStart;\n        this.animStart = timestamp;\n        this.points.forEach(function (pt) {\n          return pt.update(elapsed);\n        });\n        window.requestAnimationFrame(this._drawArt.bind(this));\n      }\n    }\n  }, {\n    key: \"_resizeCanvas\",\n    value: function _resizeCanvas(newW, newH) {\n      var oldW = this.canvas.el.width;\n      var oldH = this.canvas.el.height;\n      this.canvas.el.height = newH;\n      this.canvas.el.width = newW; // when an artboard is modified, the scaling will change\n\n      if (this.modified) {\n        this.points.forEach(function (pt) {\n          return pt.stretchToCanvas(oldW, oldH);\n        });\n      } else {\n        this.points.forEach(function (pt) {\n          return pt.scaleToArtboard();\n        });\n      }\n    }\n  }, {\n    key: \"_showPoints\",\n    value: function _showPoints() {\n      var _this2 = this;\n\n      // Only used while creating artboard\n      var report = document.createElement('p');\n      report.style.backgroundColor = 'white';\n      report.style.color = 'black';\n      report.style.border = '2px solid black';\n      report.style.position = 'absolute';\n      report.style.top = 0;\n      report.style.zIndex = 10;\n      report.style.padding = '25px';\n      report.style.width = '100px';\n      report.style.maxHeight = '80vh';\n      report.style.overflow = 'scroll';\n      var pointList = '{\\n';\n      this.points.forEach(function (pt, idx) {\n        /**\n         * Drawn points are stored as percentages of width & height to allow for\n         * proper scaling\n         * */\n        var x = Math.round(pt.cx / _this2.canvas.el.width * 100);\n        var y = Math.round(pt.cy / _this2.canvas.el.height * 100);\n        pointList += \"\".concat(idx, \": [\").concat(x, \", \").concat(y, \"],\\n\");\n      });\n      pointList += '};';\n      report.innerText = pointList;\n      document.body.appendChild(report);\n    }\n  }, {\n    key: \"_installListeners\",\n    value: function _installListeners() {\n      window.addEventListener('resize', function (e) {\n        this._resizeCanvas(window.innerWidth, window.innerHeight);\n      }.bind(this));\n      document.addEventListener('mousemove', function (e) {\n        this.mouse.x = e.clientX;\n        this.mouse.y = e.clientY;\n      }.bind(this));\n\n      if (this.drawMode) {\n        document.addEventListener('click', function (e) {\n          this.addNewPoint(e.clientX, e.clientY);\n\n          this._drawArt();\n        }.bind(this));\n        document.addEventListener('keydown', function (e) {\n          if (e.code === 'Enter') {\n            this._showPoints();\n          }\n        }.bind(this));\n      }\n    }\n  }]);\n\n  return AnimatedBackground;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AnimatedBackground);\n\n//# sourceURL=webpack://personal_site/./src/js/background/animated_background.js?");

/***/ }),

/***/ "./src/js/background/artboard.js":
/*!***************************************!*\
  !*** ./src/js/background/artboard.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"artboard\": () => (/* binding */ artboard),\n/* harmony export */   \"drawArtboard\": () => (/* binding */ drawArtboard)\n/* harmony export */ });\n/**\n * points are sparated from lines and polygons so points can be re-used\n * without duplication. Lines can extend from any point to another. Polygons\n * will auto close to the first point.\n * */\nvar artboard = {\n  points: {\n    0: [70, 0],\n    1: [91, 9],\n    2: [89, 29],\n    3: [60, 40],\n    4: [43, 24],\n    5: [48, 8],\n    6: [80, 1],\n    7: [61, 41],\n    8: [55, 6],\n    9: [74, 14],\n    10: [63, 28],\n    11: [72, 48],\n    12: [69, 73],\n    13: [41, 84],\n    14: [7, 81],\n    15: [7, 57],\n    16: [21, 36],\n    17: [29, 39],\n    18: [48, 54],\n    19: [35, 64],\n    20: [17, 56],\n    21: [100, 22],\n    22: [100, 37],\n    23: [5, 36],\n    24: [0, 49],\n    25: [0, 61],\n    26: [37, 95],\n    27: [8, 100],\n    28: [95, 2],\n    29: [100, 4],\n    30: [15, 25],\n    31: [0, 80]\n  },\n  lines: [[8, 0, 1, 2, 11, 12, 13, 26, 27, 14, 15, 24, 16, 4, 5, 0, 9, 10, 3, 18, 19, 14, 25, 15, 17, 4, 8, 1, 21, 2, 22, 11, 18, 12, 19, 20, 24, 14, 13, 19, 17, 7, 10, 2, 9, 6, 8, 5, 10, 4, 23, 16, 15, 20, 18, 7, 2, 3, 16, 17, 3, 4, 9, 8, 10, 17, 24, 30, 4], [31, 14, 20, 16, 18, 17, 20, 25, 19, 31, 25, 27, 19, 26, 14], [4, 7, 11, 3, 9, 1, 10, 11], [6, 5, 9, 21, 29, 6], [29, 1, 6, 28, 21, 22], [30, 16]],\n  polygons: [],\n  options: {\n    vertices: {\n      strokeColor: '#1F2833',\n      fillColor: '#66FCF1',\n      lineWidth: 2,\n      radius: 4\n    },\n    shapes: {\n      strokeColor: '#1F2833',\n      fillColor: '#2C5F5D',\n      lineWidth: 2\n    }\n  }\n};\nvar drawArtboard = {\n  points: {},\n  lines: [],\n  polygons: [],\n  options: {\n    vertices: {\n      strokeColor: 'black',\n      fillColor: 'white',\n      lineWidth: 2,\n      radius: 4\n    },\n    shapes: {\n      strokeColor: 'black',\n      fillColor: 'white',\n      lineWidth: 2\n    }\n  }\n};\n\n//# sourceURL=webpack://personal_site/./src/js/background/artboard.js?");

/***/ }),

/***/ "./src/js/background/point.js":
/*!************************************!*\
  !*** ./src/js/background/point.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Point = /*#__PURE__*/function () {\n  function Point(initialX, initialY, id, canvas, mouse) {\n    _classCallCheck(this, Point);\n\n    this.initialX = this.x = this.cx = initialX;\n    this.initialY = this.y = this.cy = initialY;\n    this.id = id;\n    this.canvas = canvas;\n    this.mouse = mouse;\n    this.wander = true; // assign point a random angle\n\n    this.rad = Math.PI * 2 / 45 * (Math.floor(Math.random() * 45) + 1);\n  }\n\n  _createClass(Point, [{\n    key: \"update\",\n    value: function update(elapsed) {\n      var distToCenter = this._distanceTo(this.cx, this.cy);\n\n      var distToMouse = this._distanceTo(this.mouse.x, this.mouse.y);\n\n      var distanceFactor = Point.speed * Math.min(elapsed, 33);\n      var dx, dy;\n\n      if (distToMouse < 100) {\n        /**\n         * setting wander as a boolean value allows point to restart it's normal\n         * motion once it gets close to the center, rather than the perimeter\n         */\n        this.wander = false;\n\n        if (distToMouse < 1) {\n          // If the point is close enough to the mouse, don't move it\n          dx = 0;\n          dy = 0;\n        } else {\n          // Move point toward mouse\n          var adjFactor = 9 / distToMouse;\n          dx = -(adjFactor * (this.x - this.mouse.x));\n          dy = -(adjFactor * (this.y - this.mouse.y));\n        }\n      } else if (this.wander) {\n        /** \n          * Randomly turn point by a defined radian value. If the point gets far\n          * enough away from the center, it will turn in one direction.\n          */\n        var turn = distToCenter < Point.range && Math.random() > 0.5 ? Point.turnRadius : -Point.turnRadius;\n        this.rad += turn;\n        dx = Math.cos(this.rad);\n        dy = Math.sin(this.rad);\n      } else {\n        // Don't reset the point until it gets close to center\n        if (distToCenter < Point.range * 0.25) {\n          this.wander = true;\n          this.rad = Math.PI * 2 / 45 * (Math.floor(Math.random() * 45) + 1);\n        }\n\n        var _adjFactor = 18 / distToCenter;\n\n        dx = -(_adjFactor * (this.x - this.cx));\n        dy = -(_adjFactor * (this.y - this.cy));\n      }\n\n      this.x += dx * distanceFactor;\n      this.y += dy * distanceFactor;\n    } // Canvas will stretch and not scale\n\n  }, {\n    key: \"stretchToCanvas\",\n    value: function stretchToCanvas(oldW, oldH) {\n      var w = this.canvas.el.width;\n      var h = this.canvas.el.height;\n      this.cx = this.cx / oldW * w;\n      this.x = this.cx;\n      this.cy = this.cy / oldH * h;\n      this.y = this.cy;\n    } // Canvas will scale and not stretch\n\n  }, {\n    key: \"scaleToArtboard\",\n    value: function scaleToArtboard() {\n      var w = this.canvas.el.width;\n      var h = this.canvas.el.height;\n      var minDim = Math.min(w, h);\n      var x = this.initialX / 100 * minDim;\n\n      if (w > h) {\n        x += (w - h) * (2 / 3);\n      }\n\n      var y = this.initialY / 100 * minDim;\n\n      if (h > w) {\n        y += (h - w) * (2 / 3);\n      }\n\n      this.x = this.cx = x;\n      this.y = this.cy = y;\n    }\n  }, {\n    key: \"_distanceTo\",\n    value: function _distanceTo(x, y) {\n      var sideSq1 = Math.pow(this.x - x, 2);\n      var sideSq2 = Math.pow(this.y - y, 2);\n      return Math.sqrt(sideSq1 + sideSq2);\n    }\n  }]);\n\n  return Point;\n}();\n\nPoint.speed = 0.01;\nPoint.range = 50;\nPoint.turnRadius = 2 * Math.PI / 45;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Point);\n\n//# sourceURL=webpack://personal_site/./src/js/background/point.js?");

/***/ }),

/***/ "./src/js/background/shape.js":
/*!************************************!*\
  !*** ./src/js/background/shape.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Shape = /*#__PURE__*/function () {\n  function Shape(pointIds, points, options, line, fill) {\n    _classCallCheck(this, Shape);\n\n    this.points = pointIds.map(function (id) {\n      return points[id];\n    });\n    this.options = options;\n    this.line = line;\n    this.fill = fill;\n  }\n\n  _createClass(Shape, [{\n    key: \"draw\",\n    value: function draw(ctx) {\n      ctx.beginPath();\n      var x_pos = this.points[0].x;\n      var y_pos = this.points[0].y;\n      ctx.moveTo(x_pos, y_pos);\n\n      for (var i = 1; i < this.points.length; i++) {\n        x_pos = this.points[i].x;\n        y_pos = this.points[i].y;\n        ctx.lineTo(x_pos, y_pos);\n      }\n\n      if (this.fill) {\n        ctx.closePath();\n        ctx.fillStyle = this.options.fillColor;\n        ctx.fill();\n      }\n\n      if (this.line) {\n        ctx.lineWidth = this.options.lineWidth;\n        ctx.strokeStyle = this.options.strokeColor;\n        ctx.stroke();\n      }\n    }\n  }]);\n\n  return Shape;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Shape);\n\n//# sourceURL=webpack://personal_site/./src/js/background/shape.js?");

/***/ }),

/***/ "./src/js/background/vertex.js":
/*!*************************************!*\
  !*** ./src/js/background/vertex.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Vertex = /*#__PURE__*/function () {\n  function Vertex(point, options) {\n    _classCallCheck(this, Vertex);\n\n    this.point = point;\n    this.options = options;\n  }\n\n  _createClass(Vertex, [{\n    key: \"draw\",\n    value: function draw(ctx) {\n      ctx.beginPath();\n      ctx.arc(this.point.x, this.point.y, 4, 0, Math.PI * 2, false);\n      ctx.closePath();\n\n      if (this.options.fillColor) {\n        ctx.fillStyle = this.options.fillColor;\n        ctx.fill();\n      }\n\n      if (this.options.strokeColor) {\n        ctx.lineWidth = this.options.lineWidth;\n        ctx.strokeStyle = this.options.strokeColor;\n        ctx.stroke();\n      }\n    }\n  }, {\n    key: \"label\",\n    value: function label(ctx) {\n      ctx.beginPath();\n      ctx.font = '12px Arial';\n      ctx.fillStyle = 'black';\n      ctx.fillText(this.point.id, this.point.x - 3, this.point.y + 13);\n    }\n  }]);\n\n  return Vertex;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vertex);\n\n//# sourceURL=webpack://personal_site/./src/js/background/vertex.js?");

/***/ }),

/***/ "./src/js/draw.js":
/*!************************!*\
  !*** ./src/js/draw.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _background_artboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background/artboard */ \"./src/js/background/artboard.js\");\n/* harmony import */ var _background_animated_background__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./background/animated_background */ \"./src/js/background/animated_background.js\");\n\n\n$(function () {\n  new _background_animated_background__WEBPACK_IMPORTED_MODULE_1__.default('my-canvas', _background_artboard__WEBPACK_IMPORTED_MODULE_0__.drawArtboard, true);\n});\n\n//# sourceURL=webpack://personal_site/./src/js/draw.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/draw.js");
/******/ 	
/******/ })()
;