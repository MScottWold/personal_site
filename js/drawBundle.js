(()=>{"use strict";function t(t,i){(null==i||i>t.length)&&(i=t.length);for(var e=0,n=new Array(i);e<i;e++)n[e]=t[e];return n}function i(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var e=function(){function e(t,i,n,o,s){!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e),this.initialX=this.x=this.cx=t,this.initialY=this.y=this.cy=i,this.id=n,this.canvas=o,this.mouse=s,this.wander=!0,this.rad=2*Math.PI/45*(Math.floor(45*Math.random())+1)}var n,o;return n=e,(o=[{key:"update",value:function(t){var i,n,o,s=e.speed*Math.min(t,33),r=this._distanceTo(this.mouse.x,this.mouse.y);if(this.mouse.x&&r<100&&!this.mouse.ignore)this.moveToMouse(t,r);else{if(this.wander){var a=(i=this._distanceTo(this.cx,this.cy))<e.range&&Math.random()>.5?e.turnRadius:-e.turnRadius;this.rad=this.rad+a,n=Math.cos(this.rad),o=Math.sin(this.rad)}else{(i=this._distanceTo(this.cx,this.cy))<.25*e.range&&(this.wander=!0,this.rad=2*Math.PI/45*(Math.floor(45*Math.random())+1));var h=18/i;n=-h*(this.x-this.cx),o=-h*(this.y-this.cy)}this.x=this.x+n*s,this.y=this.y+o*s}}},{key:"moveToMouse",value:function(t,i){var n,o,s=i||this._distanceTo(this.mouse.x,this.mouse.y);if(this.wander=!1,s<1)n=0,o=0;else{var r=9/s;n=-r*(this.x-this.mouse.x),o=-r*(this.y-this.mouse.y)}var a=e.speed*Math.min(t,33);this.x=this.x+n*a,this.y=this.y+o*a}},{key:"jumpToMouse",value:function(){this.x=this.mouse.x,this.y=this.mouse.y,this.wander=!1}},{key:"stretchToCanvas",value:function(t,i){var e=this.canvas.el.width,n=this.canvas.el.height;this.cx=this.cx/t*e,this.x=this.cx,this.cy=this.cy/i*n,this.y=this.cy}},{key:"scaleToArtboard",value:function(){var t=this.canvas.el.width,i=this.canvas.el.height,e=Math.min(t,i),n=this.initialX/100*e;t>i&&(n+=2/3*(t-i));var o=this.initialY/100*e;i>t&&(o+=2/3*(i-t)),this.x=this.cx=n,this.y=this.cy=o}},{key:"twoClosestPoints",value:function(i){if(i.length<=2)return function(i){if(Array.isArray(i))return t(i)}(e=i)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(e)||function(i,e){if(i){if("string"==typeof i)return t(i,e);var n=Object.prototype.toString.call(i).slice(8,-1);return"Object"===n&&i.constructor&&(n=i.constructor.name),"Map"===n||"Set"===n?Array.from(i):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(i,e):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}();var e,n,o,s=i[0],r=this._distanceTo(s.x,s.y),a=i[1],h=this._distanceTo(a.x,a.y);if(r>h){var c=[a,s];s=c[0],a=c[1];var u=[h,r];r=u[0],h=u[1]}for(var l=2;l<i.length;l++)n=i[l],(o=this._distanceTo(n.x,n.y))<r?(a=s,h=r,s=n,r=o):o<h&&(a=n,h=o);return[s,a]}},{key:"_distanceTo",value:function(t,i){var e=Math.pow(this.x-t,2),n=Math.pow(this.y-i,2);return Math.sqrt(e+n)}}])&&i(n.prototype,o),e}();e.speed=.01,e.range=50,e.turnRadius=2*Math.PI/45;const n=e;function o(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}const s=function(){function t(i,e){!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.point=i,this.options=e}var i,e;return i=t,(e=[{key:"draw",value:function(t){t.beginPath(),t.arc(this.point.x,this.point.y,this.options.radius,0,2*Math.PI,!1),t.closePath(),this.point.wander?t.fillStyle=this.options.fillColor:t.fillStyle=this.options.altFillColor,t.fill(),t.stroke()}},{key:"label",value:function(t){t.beginPath(),t.font="12px Arial",t.fillStyle="black",t.fillText(this.point.id,this.point.x-3,this.point.y+13)}}])&&o(i.prototype,e),t}();function r(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function a(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}const h=function(){function t(i,e,o){var s=arguments.length>3&&void 0!==arguments[3]&&arguments[3];r(this,t),i[0]instanceof n?this.points=i:this.points=i.map((function(t){return e[t]})),this.options=o,this.polygon=s}var i,e;return i=t,(e=[{key:"draw",value:function(t){t.beginPath(),t.moveTo(this.points[0].x,this.points[0].y);for(var i=1;i<this.points.length;i++)t.lineTo(this.points[i].x,this.points[i].y);this.polygon?(t.closePath(),t.fill()):t.stroke()}},{key:"removePoint",value:function(t){this.points=this.points.filter((function(i){return i!==t}))}}])&&a(i.prototype,e),t}();function c(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}const u=function(){function t(){!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.x,this.y,this.mode="default",this.clicked=!1,this.ignore=!1}var i,e;return i=t,(e=[{key:"resetPos",value:function(){this.x=null,this.y=null,this.clicked=!1}},{key:"updatePos",value:function(t,i){this.x=t,this.y=i}},{key:"click",value:function(t,i){this.x=t,this.y=i,this.clicked=!0}},{key:"setToIgnore",value:function(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3;this.ignore=!0,this.ignoreTimeout&&clearTimeout(this.ignoreTimeout),this.ignoreTimeout=setTimeout((function(){return t.ignore=!1}),i)}},{key:"near",value:function(t){var i=Math.pow(this.x-t.x,2),e=Math.pow(this.y-t.y,2);return Math.sqrt(i+e)<100}}])&&c(i.prototype,e),t}();var l={points:{},lines:[],polygons:[],options:{vertices:{strokeColor:"black",fillColor:"white",lineWidth:2,radius:4},shapes:{strokeColor:"black",fillColor:"white",lineWidth:2}}};function f(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function d(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function v(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function y(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function m(t,i){return(m=Object.setPrototypeOf||function(t,i){return t.__proto__=i,t})(t,i)}function w(t,i){return!i||"object"!==p(i)&&"function"!=typeof i?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):i}function b(t){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}const g=function(t){!function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(i&&i.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),i&&m(t,i)}(h,t);var i,e,o,r,a=(o=h,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,i=b(o);if(r){var e=b(this).constructor;t=Reflect.construct(i,arguments,e)}else t=i.apply(this,arguments);return w(this,t)});function h(){return v(this,h),a.apply(this,arguments)}return i=h,(e=[{key:"_drawArt",value:function(){var t=this.canvas.ctx;t.clearRect(0,0,this.canvas.el.width,this.canvas.el.height),this.polygons.forEach((function(i){return i.draw(t)})),this.lines.forEach((function(i){return i.draw(t)})),this.vertices.forEach((function(i){return i.draw(t)})),this.vertices.forEach((function(i){return i.label(t)}))}},{key:"_addNewPoint",value:function(t,i){var e=new n(t,i,this.points.length,this.canvas,this.mouse);this.points.push(e),this.vertices.push(new s(e,this.options.vertices))}},{key:"_showPoints",value:function(){var t=this,i=document.createElement("p");i.style.backgroundColor="white",i.style.color="black",i.style.border="2px solid black",i.style.position="absolute",i.style.top=0,i.style.zIndex=10,i.style.padding="25px",i.style.width="100px",i.style.maxHeight="80vh",i.style.overflow="scroll";var e="{\n";this.points.forEach((function(i,n){var o=Math.round(i.cx/t.canvas.el.width*100),s=Math.round(i.cy/t.canvas.el.height*100);e+="".concat(n,": [").concat(o,", ").concat(s,"],\n")})),e+="};",i.innerText=e,document.body.appendChild(i)}},{key:"_installListeners",value:function(){window.addEventListener("resize",function(){this._resizeCanvas(window.innerWidth,window.innerHeight)}.bind(this)),document.addEventListener("click",function(t){this._addNewPoint(t.clientX,t.clientY),this._drawArt()}.bind(this)),document.addEventListener("keydown",function(t){"Enter"===t.code&&this._showPoints()}.bind(this))}}])&&y(i.prototype,e),h}(function(){function t(i){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l;f(this,t),this.canvas={},this.mouse=new u,this.options=e.options,this.modified=!1,this._initCanvas(i),this._initShapes(e),this._scaleDown(),this._installListeners(),window.requestAnimationFrame(this._drawArt.bind(this))}var i,e;return i=t,(e=[{key:"changeMouseMode",value:function(t){this.mouse.mode=t}},{key:"toggleLines",value:function(){this.lines=[],this.noLines=!this.noLines}},{key:"resetArtboard",value:function(t){this._initShapes(t),this.modified=!1,this.noLines=!1}},{key:"_removePoint",value:function(t){this.points=this.points.filter((function(i){return i!==t})),this.vertices=this.vertices.filter((function(i){return i.point!==t})),this.lines.forEach((function(i){return i.removePoint(t)})),this.lines=this.lines.filter((function(t){return t.points.length>1})),this.polygons.forEach((function(i){return i.removePoint(t)})),this.polygons=this.polygons.filter((function(t){return t.points.length>1}))}},{key:"_addNewPoint",value:function(t,i){var e=this;this.modified=!0;var o=this.points.length>=1?this.points[this.points.length-1].id+1:0,r=new n(t,i,o,this.canvas,this.mouse);if(this.noLines)return this.points.push(r),void this.vertices.push(new s(r,this.options.vertices));var a=r.twoClosestPoints(this.points);this.points.push(r),this.vertices.push(new s(r,this.options.vertices)),a.forEach((function(t){return e.lines.push(new h([t,r],e.points,e.options.shapes))}))}},{key:"_teleportPoints",value:function(){this.mouse.setToIgnore(),this.points.forEach((function(t){return t.jumpToMouse()}))}},{key:"_initCanvas",value:function(t){this.canvas.el=document.getElementById(t),this.canvas.el.width=window.innerWidth,this.canvas.el.height=window.innerHeight,this.canvas.ctx=this.canvas.el.getContext("2d")}},{key:"_initShapes",value:function(t){var i=this,e=t.points,o=t.lines,r=t.polygons;for(var a in this.vertices=[],this.points=[],e){var c=new n(e[a][0],e[a][1],Number(a),this.canvas,this.mouse);c.scaleToArtboard(),this.points.push(c),this.vertices.push(new s(c,this.options.vertices))}this.lines=o.map((function(t){return new h(t,i.points,i.options.shapes)})),this.polygons=r.map((function(t){return new h(t,i.points,i.options.shapes,!0)}))}},{key:"_scaleDown",value:function(){var t=this.options.scaleDown;if(t&&window.innerWidth<t.maxWidth){var i=t.factor;this.options.vertices.lineWidth/=i,this.options.vertices.radius/=i,this.options.shapes.lineWidth/=i}}},{key:"_drawArt",value:function(t){var i=this,e=this.canvas.ctx;e.clearRect(0,0,this.canvas.el.width,this.canvas.el.height),e.lineWidth=this.options.shapes.lineWidth,e.strokeStyle=this.options.shapes.strokeColor,e.fillStyle=this.options.shapes.fillColor,this.polygons.forEach((function(t){return t.draw(e)})),this.lines.forEach((function(t){return t.draw(e)})),e.lineWidth=this.options.vertices.lineWidth,e.strokeStyle=this.options.vertices.strokeColor,this.vertices.forEach((function(t){return t.draw(e)})),this.animStart||(this.animStart=t);var n=Math.floor(t-this.animStart);this.animStart=t,"coalesce"===this.mouse.mode&&!0===this.mouse.clicked?this.points.forEach((function(t){return t.moveToMouse(n)})):this.points.forEach((function(t){i.mouse.clicked&&"destroy"===i.mouse.mode&&i.mouse.near(t)?i._removePoint(t):t.update(n)})),window.requestAnimationFrame(this._drawArt.bind(this))}},{key:"_resizeCanvas",value:function(t,i){var e=this.canvas.el.width,n=this.canvas.el.height;this.canvas.el.height=i,this.canvas.el.width=t,window.innerWidth<768||(this.modified?this.points.forEach((function(t){return t.stretchToCanvas(e,n)})):this.points.forEach((function(t){return t.scaleToArtboard()})))}},{key:"_installListeners",value:function(){window.addEventListener("resize",function(){this._resizeCanvas(window.innerWidth,window.innerHeight)}.bind(this)),document.addEventListener("pointerdown",function(t){"button"===t.target.localName||"input"===t.target.localName||"label"===t.target.localName||"a"===t.target.localName||t.target.dataset.ignoreClick||(this.mouse.click(t.clientX,t.clientY),"radiate"===this.mouse.mode?this._teleportPoints():"create"===this.mouse.mode&&(this._addNewPoint(t.clientX,t.clientY),this.mouse.setToIgnore(500)))}.bind(this)),document.addEventListener("pointerup",function(){this.mouse.resetPos(),"coalesce"===this.mouse.mode&&this.mouse.setToIgnore()}.bind(this)),document.addEventListener("pointermove",function(t){this.mouse.updatePos(t.clientX,t.clientY)}.bind(this)),document.addEventListener("pointercancel",function(){this.mouse.resetPos()}.bind(this))}}])&&d(i.prototype,e),t}());$((function(){new g("my-canvas")}))})();