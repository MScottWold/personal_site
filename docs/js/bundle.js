(()=>{"use strict";function t(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function i(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}const e=function(){function e(i){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1500;t(this,e),this.$faces=i,this.delay=n,this.showIdx=1}var n,s;return n=e,(s=[{key:"startAnimation",value:function(){this.interval=setInterval(this._rotateClasses.bind(this),this.delay)}},{key:"stopAnimation",value:function(){this.interval=clearInterval(this.interval)}},{key:"_rotateClasses",value:function(){var t=this,i=this.$faces.length,e=(this.showIdx+1)%i,n=(this.showIdx-1+i)%i,s=(n-1+i)%i;this.$faces.each((function(i,o){switch(i){case e:o.className="next";break;case t.showIdx:o.className="front";break;case n:o.className="bottom";break;case s:o.className="back";break;default:o.className="waiting"}})),this.showIdx=(this.showIdx+1)%i}}])&&i(n.prototype,s),e}();var n={points:{0:[70,0],1:[91,9],2:[89,29],3:[60,40],4:[43,24],5:[48,8],6:[80,1],7:[61,41],8:[55,6],9:[74,14],10:[63,28],11:[72,48],12:[69,73],13:[41,84],14:[7,81],15:[7,57],16:[21,36],17:[29,39],18:[48,54],19:[35,64],20:[17,56],21:[100,22],22:[100,37],23:[5,36],24:[0,49],25:[0,61],26:[37,95],27:[8,100],28:[95,2],29:[100,4],30:[15,25],31:[0,80]},lines:[[8,0],[0,1],[1,2],[2,11],[11,12],[12,13],[13,26],[26,27],[27,14],[14,15],[15,24],[24,16],[16,4],[4,5],[5,0],[0,9],[9,10],[10,3],[3,18],[18,19],[19,14],[14,25],[25,15],[15,17],[17,4],[4,8],[8,1],[1,21],[21,2],[2,22],[22,11],[11,18],[18,12],[12,19],[19,20],[20,24],[24,14],[14,13],[13,19],[19,17],[17,7],[7,10],[10,2],[2,9],[9,6],[6,8],[8,5],[5,10],[10,4],[4,23],[23,16],[16,15],[15,20],[20,18],[18,7],[7,2],[2,3],[3,16],[16,17],[17,3],[3,4],[4,9],[9,8],[8,10],[10,17],[17,24],[24,30],[30,4],[31,14],[14,20],[20,16],[16,18],[18,17],[17,20],[20,25],[25,19],[19,31],[31,25],[25,27],[27,19],[19,26],[26,14],[4,7],[7,11],[11,3],[3,9],[9,1],[1,10],[10,11],[6,5],[5,9],[9,21],[21,29],[29,6],[29,1],[1,6],[6,28],[28,21],[21,22],[30,16]],polygons:[],options:{vertices:{strokeColor:"#1F2833",fillColor:"#66FCF1",altFillColor:"#B41A4E",lineWidth:2,radius:4},shapes:{strokeColor:"#1F2833",fillColor:"#2C5F5D",lineWidth:2},scaleDown:{maxWidth:380,factor:2}}},s={points:{},lines:[],polygons:[]};function o(t,i){(null==i||i>t.length)&&(i=t.length);for(var e=0,n=new Array(i);e<i;e++)n[e]=t[e];return n}function a(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var r=function(){function t(i,e,n,s,o){!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.initialX=this.x=this.cx=i,this.initialY=this.y=this.cy=e,this.id=n,this.canvas=s,this.mouse=o,this.wander=!0,this.rad=2*Math.PI/45*(Math.floor(45*Math.random())+1)}var i,e;return i=t,(e=[{key:"update",value:function(t){var i=this._distanceTo(this.mouse.x,this.mouse.y);this.mouse.x&&i<100&&!this.mouse.ignore?this.moveToMouse(t,i):this.wander?this._wander(t):this._returnToCenter(t)}},{key:"moveToMouse",value:function(i,e){var n,s,o=e||this._distanceTo(this.mouse.x,this.mouse.y);if(this.wander=!1,o<1)n=0,s=0;else{var a=9/o;n=-a*(this.x-this.mouse.x),s=-a*(this.y-this.mouse.y)}var r=t.speed*Math.min(i,33);this.x=this.x+n*r,this.y=this.y+s*r}},{key:"jumpToMouse",value:function(){this.x=this.mouse.x,this.y=this.mouse.y,this.wander=!1}},{key:"stretchToCanvas",value:function(t,i){var e=this.canvas.el.width,n=this.canvas.el.height;this.cx=this.cx/t*e,this.x=this.cx,this.cy=this.cy/i*n,this.y=this.cy}},{key:"scaleToArtboard",value:function(){var t=this.canvas.el.width,i=this.canvas.el.height,e=Math.min(t,i),n=this.initialX/100*e;t>i&&(n+=2/3*(t-i));var s=this.initialY/100*e;i>t&&(s+=2/3*(i-t)),this.x=this.cx=n,this.y=this.cy=s}},{key:"twoClosestPoints",value:function(t){if(t.length<=2)return function(t){if(Array.isArray(t))return o(t)}(i=t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(i)||function(t,i){if(t){if("string"==typeof t)return o(t,i);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?o(t,i):void 0}}(i)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}();var i,e,n,s=t[0],a=this._distanceTo(s.x,s.y),r=t[1],h=this._distanceTo(r.x,r.y);if(a>h){var l=[r,s];s=l[0],r=l[1];var c=[h,a];a=c[0],h=c[1]}for(var u=2;u<t.length;u++)e=t[u],(n=this._distanceTo(e.x,e.y))<a?(r=s,h=a,s=e,a=n):n<h&&(r=e,h=n);return[s,r]}},{key:"_wander",value:function(i){var e=this._distanceTo(this.cx,this.cy)<t.range&&Math.random()>.5?t.turnRadius:-t.turnRadius;this.rad=this.rad+e;var n=Math.cos(this.rad),s=Math.sin(this.rad),o=t.speed*Math.min(i,33);this.x=this.x+n*o,this.y=this.y+s*o}},{key:"_returnToCenter",value:function(i){var e=this._distanceTo(this.cx,this.cy),n=18/e,s=t.speed*Math.min(i,33),o=-n*(this.x-this.cx),a=-n*(this.y-this.cy);this.x=this.x+o*s,this.y=this.y+a*s,e<.25*t.range&&(this.wander=!0,this.rad=2*Math.PI/45*(Math.floor(45*Math.random())+1))}},{key:"_distanceTo",value:function(t,i){var e=Math.pow(this.x-t,2),n=Math.pow(this.y-i,2);return Math.sqrt(e+n)}}])&&a(i.prototype,e),t}();r.speed=.01,r.range=50,r.turnRadius=2*Math.PI/45;const h=r;function l(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var c=function(){function t(i){!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.point=i}var i,e;return i=t,(e=[{key:"draw",value:function(i){i.beginPath(),i.arc(this.point.x,this.point.y,t.options.radius,0,2*Math.PI,!1),i.closePath(),this.point.wander?i.fillStyle=t.options.fillColor:i.fillStyle=t.options.altFillColor,i.fill(),i.stroke()}},{key:"label",value:function(t){t.beginPath(),t.font="12px Arial",t.fillStyle="black",t.fillText(this.point.id,this.point.x-3,this.point.y+13)}}])&&l(i.prototype,e),t}();c.options={fillColor:"white",altFillColor:"black",strokeColor:"black",radius:4};const u=c;function d(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function f(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var v=function(){function t(i,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];d(this,t),i[0]instanceof h?this.points=i:this.points=i.map((function(t){return e[t]})),this.polygon=n}var i,e;return i=t,(e=[{key:"draw",value:function(t){t.beginPath(),t.moveTo(this.points[0].x,this.points[0].y);for(var i=1;i<this.points.length;i++)t.lineTo(this.points[i].x,this.points[i].y);this.polygon?(t.closePath(),t.fill()):t.stroke()}},{key:"removePoint",value:function(t){this.points=this.points.filter((function(i){return i!==t}))}}])&&f(i.prototype,e),t}();v.options={strokeColor:"black",fillColor:"white",lineWidth:2};const p=v;function m(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}const y=function(){function t(){!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.x,this.y,this.mode="default",this.clicked=!1,this.ignore=!1}var i,e;return i=t,(e=[{key:"resetPos",value:function(){this.x=null,this.y=null,this.clicked=!1}},{key:"updatePos",value:function(t,i){this.x=t,this.y=i}},{key:"click",value:function(t,i){this.x=t,this.y=i,this.clicked=!0}},{key:"setToIgnore",value:function(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3;this.ignore=!0,this.ignoreTimeout&&clearTimeout(this.ignoreTimeout),this.ignoreTimeout=setTimeout((function(){return t.ignore=!1}),i)}},{key:"near",value:function(t){var i=Math.pow(this.x-t.x,2),e=Math.pow(this.y-t.y,2);return Math.sqrt(i+e)<100}}])&&m(i.prototype,e),t}();function g(t,i){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);i&&(n=n.filter((function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable}))),e.push.apply(e,n)}return e}function b(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{};i%2?g(Object(e),!0).forEach((function(i){w(t,i,e[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):g(Object(e)).forEach((function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}))}return t}function w(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}function k(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function C(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}const x=function(){function t(i){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s;k(this,t),this.canvas={},this.mouse=new y,this.modified=!1,this._initCanvas(i),this._initShapes(e),this._installListeners(),window.requestAnimationFrame(this._drawArt.bind(this))}var i,e;return i=t,(e=[{key:"changeMouseMode",value:function(t){this.mouse.mode=t}},{key:"toggleLines",value:function(){this.lines=[],this.noLines=!this.noLines}},{key:"resetArtboard",value:function(t){this._initShapes(t),this.modified=!1,this.noLines=!1}},{key:"_removePoint",value:function(t){this.points=this.points.filter((function(i){return i!==t})),this.vertices=this.vertices.filter((function(i){return i.point!==t})),this.lines.forEach((function(i){return i.removePoint(t)})),this.lines=this.lines.filter((function(t){return t.points.length>1})),this.polygons.forEach((function(i){return i.removePoint(t)})),this.polygons=this.polygons.filter((function(t){return t.points.length>2}))}},{key:"_addNewPoint",value:function(t,i){var e=this;this.modified=!0;var n=this.points.length>=1?this.points[this.points.length-1].id+1:0,s=new h(t,i,n,this.canvas,this.mouse);if(this.noLines)return this.points.push(s),void this.vertices.push(new u(s));var o=s.twoClosestPoints(this.points);this.points.push(s),this.vertices.push(new u(s)),o.forEach((function(t){e.lines.push(new p([t,s],e.points))}))}},{key:"_teleportPoints",value:function(){this.mouse.setToIgnore(),this.points.forEach((function(t){return t.jumpToMouse()}))}},{key:"_initCanvas",value:function(t){this.canvas.el=document.getElementById(t),this.canvas.el.width=window.innerWidth,this.canvas.el.height=window.innerHeight,this.canvas.ctx=this.canvas.el.getContext("2d")}},{key:"_initShapes",value:function(t){var i=this,e=t.points,n=t.lines,s=t.polygons,o=t.options;for(var a in o&&this._setShapeOptions(o),this.vertices=[],this.points=[],e){var r=new h(e[a][0],e[a][1],Number(a),this.canvas,this.mouse);r.scaleToArtboard(),this.points.push(r),this.vertices.push(new u(r))}this.lines=n.map((function(t){return new p(t,i.points)})),this.polygons=s.map((function(t){return new p(t,i.points,!0)}))}},{key:"_setShapeOptions",value:function(t){var i=t.scaleDown,e=t.vertices,n=t.shapes;if(u.options=b({},t.vertices),p.options=b({},t.shapes),i&&window.innerWidth<i.maxWidth){var s=i.factor;u.options.lineWidth=e.lineWidth/s,u.options.radius=e.radius/s,p.options.lineWidth=n.lineWidth/s}}},{key:"_drawArt",value:function(t){var i=this,e=this.canvas.ctx;e.clearRect(0,0,this.canvas.el.width,this.canvas.el.height),e.lineWidth=p.options.lineWidth,e.strokeStyle=p.options.strokeColor,e.fillStyle=p.options.fillColor,this.polygons.forEach((function(t){return t.draw(e)})),this.lines.forEach((function(t){return t.draw(e)})),e.lineWidth=u.options.lineWidth,e.strokeStyle=u.options.strokeColor,this.vertices.forEach((function(t){return t.draw(e)})),this.animStart||(this.animStart=t);var n=Math.floor(t-this.animStart);this.animStart=t,"coalesce"===this.mouse.mode&&!0===this.mouse.clicked?this.points.forEach((function(t){return t.moveToMouse(n)})):this.points.forEach((function(t){i.mouse.clicked&&"destroy"===i.mouse.mode&&i.mouse.near(t)?i._removePoint(t):t.update(n)})),window.requestAnimationFrame(this._drawArt.bind(this))}},{key:"_resizeCanvas",value:function(t,i){var e=this.canvas.el.width,n=this.canvas.el.height;this.canvas.el.height=i,this.canvas.el.width=t,window.innerWidth<768||(this.modified?this.points.forEach((function(t){return t.stretchToCanvas(e,n)})):this.points.forEach((function(t){return t.scaleToArtboard()})))}},{key:"_installListeners",value:function(){window.addEventListener("resize",function(){this._resizeCanvas(window.innerWidth,window.innerHeight)}.bind(this)),document.addEventListener("pointerdown",function(t){"button"===t.target.localName||"input"===t.target.localName||"label"===t.target.localName||"a"===t.target.localName||t.target.dataset.ignoreClick||(this.mouse.click(t.clientX,t.clientY),"radiate"===this.mouse.mode?this._teleportPoints():"create"===this.mouse.mode&&(this._addNewPoint(t.clientX,t.clientY),this.mouse.setToIgnore(500)))}.bind(this)),document.addEventListener("pointerup",function(){this.mouse.resetPos(),"coalesce"===this.mouse.mode&&this.mouse.setToIgnore()}.bind(this)),document.addEventListener("pointermove",function(t){this.mouse.updatePos(t.clientX,t.clientY)}.bind(this)),document.addEventListener("pointercancel",function(){this.mouse.resetPos()}.bind(this))}}])&&C(i.prototype,e),t}();$((function(){({constellation:new x("background-canvas",n),$hideableElements:$(".hideable"),$contactSection:$("#contact"),$viewCtrPanelButton:$("#view-ctr-panel"),$bkgdButtons:$("#bkgd-buttons"),$modeButtons:$("#bkgd-modes button"),hideLinesOption:document.getElementById("hide-lines"),elementsHidden:!1,_toggleElementsVisibility:function(){this.elementsHidden||window.scrollTo(0,document.body.scrollHeight),this.$hideableElements.toggleClass("invisible"),this.$contactSection.toggleClass("no-touch"),this.elementsHidden=!this.elementsHidden},_hideControls:function(){this.$viewCtrPanelButton.removeClass("active").html("&xutri;"),this.$bkgdButtons.removeClass("show")},_showElements:function(){this._toggleElementsVisibility(),this._hideControls(),$(document).off("scroll.showElem")},_toggleCtrPanel:function(t){var i=this,e=$(t.currentTarget);e.toggleClass("active"),e.is(".active")?(e.html("&xdtri;"),this.elementsHidden||(this._toggleElementsVisibility(),setTimeout((function(){$(document).on("scroll.showElem",i._showElements.bind(i))}),1e3))):e.html("&xutri;"),this.$bkgdButtons.toggleClass("show")},_changeMode:function(t){var i=$(t.currentTarget);this.constellation.changeMouseMode(i.data("bkgdMode")),this.$modeButtons.removeClass("active"),i.addClass("active"),"default"===i.data("bkgdMode")&&(this.constellation.resetArtboard(n),this.hideLinesOption.checked=!1,this._showElements()),this._hideControls()},init:function(){var t=this;this.$viewCtrPanelButton.on("click",this._toggleCtrPanel.bind(this)),$("#bkgd-modes").on("click","button",this._changeMode.bind(this)),this.hideLinesOption.addEventListener("click",(function(){t.constellation.toggleLines()}))}}).init(),{rotatable:new e($(".rotatable > *")),rotating:!0,intro:document.getElementById("intro"),_rotateWhenVisible:function(){var t=this.intro.getBoundingClientRect();t.top<window.innerHeight&&t.bottom>=0&&!this.rotating?(this.rotatable.startAnimation(),this.rotating=!0):t.top<0&&t.bottom<0&&this.rotating&&(this.rotatable.stopAnimation(),this.rotating=!1)},init:function(){window.addEventListener("scroll",this._rotateWhenVisible.bind(this)),this.rotatable.startAnimation()}}.init(),$("#nav-menu").on("click",(function(t){t.target.classList.contains("inert")||$(this).toggleClass("expanded")})),{$tabList:$(".tab-list"),_changeTab:function(t){t.preventDefault();var i=$(t.currentTarget),e=t.currentTarget.hash;e&&!i.is(".active")&&(this.$panel.removeClass("active"),this.$activeLink.removeClass("active"),this.$panel=$(e).addClass("active"),this.$activeLink=i.addClass("active"))},init:function(){this.$activeLink=this.$tabList.find("a.active"),this.$panel=$(this.$activeLink.attr("href")),this.$tabList.on("click",".panel-title",this._changeTab.bind(this))}}.init(),{$modal:$(".gallery .modal"),_openImg:function(t){this.currentPanelIdx=Number(t.currentTarget.dataset.idx),this.$previews.eq(this.currentPanelIdx).addClass("display"),this.$modal.addClass("display")},_closeImg:function(t){t.stopPropagation(),$(t.target).is(".close-modal")&&(this.$previews.removeClass("display"),this.$modal.removeClass("display"),this.currentPanelIdx=void 0)},_navImgs:function(t){var i=Number(t.currentTarget.dataset.deltaIdx),e=(this.currentPanelIdx+i)%this.$previews.length;e<0&&(e=this.$previews.length-1),this.$previews.eq(this.currentPanelIdx).removeClass("display"),this.$previews.eq(e).addClass("display"),this.currentPanelIdx=e},init:function(){this.$previews=this.$modal.find(".img-preview"),$(".thumbs").on("click",".thumb-panel",this._openImg.bind(this)),this.$modal.on("click",this._closeImg.bind(this)),this.$modal.find(".img-control").on("click",this._navImgs.bind(this))}}.init(),{$appearReady:$(".appear-ready"),_elementPopIn:function(){var t=this;this.$appearReady.each((function(i,e){var n=e.getBoundingClientRect();(n.top<.65*window.innerHeight||n.bottom<0)&&($(e).removeClass("appear-ready"),t.$appearReady=$(".appear-ready"))})),0===this.$appearReady.length&&$(window).off("scroll.popInManager")},init:function(){$(window).on("scroll.popInManager",this._elementPopIn.bind(this))}}.init()}))})();