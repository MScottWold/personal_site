import Point from './point';
import Vertex from './vertex';
import Shape from './shape';
import Mouse from './mouse';
import { defaultArtboard } from './artboard';

class AnimatedBackground {
  constructor(tagId, artboard = defaultArtboard) {
    this.canvas = {};
    this.mouse = new Mouse;
    this.options = artboard.options;
    this.modified = false;

    this._initCanvas(tagId);
    this._initShapes(artboard);
    window.requestAnimationFrame(this._drawArt.bind(this));
    this._installListeners();
  }

  changeMouseMode(mode) {
    this.mouse.mode = mode;
  }

  toggleLines() {
    this.lines = [];
    this.noLines = !this.noLines;
  }

  resetArtboard(artboard) {
    this._initShapes(artboard)
    this.modified = false;
    this.noLines = false;
  }

  _removePoint(point) {
    // remove point from points array
    this.points = this.points.filter((pt) => pt !== point);

    // remove associated vtx
    this.vertices = this.vertices.filter((vtx) => vtx.point !== point);

    // remove point from lines
    this.lines.forEach((ln) => ln.removePoint(point));
    this.lines = this.lines.filter((ln) => ln.points.length > 1);
    
    // remove point from polygons
    this.polygons.forEach((plygn) => plygn.removePoint(point));
    this.polygons = this.polygons.filter((plygn) => plygn.points.length > 1);
  }

  _addNewPoint(x, y) {
    this.modified = true;
    const nextId = this.points.length >= 1 
      ? this.points[this.points.length - 1].id + 1
      : 0;
    const newPt = new Point( 
      x, 
      y, 
      nextId,
      this.canvas, 
      this.mouse 
    );

    if (this.noLines) {
      this.points.push(newPt);
      this.vertices.push(new Vertex(newPt, this.options.vertices));
      return;
    }

    // Connect new point to two closest points (if any)
    const shapePoints = newPt.twoClosestPoints(this.points);
    this.points.push(newPt);
    this.vertices.push(new Vertex(newPt, this.options.vertices));
    if (shapePoints.length === 0) return;
    if (shapePoints.length === 1) {
      shapePoints.push(newPt);
    } else {
      shapePoints.splice(1, 0, newPt);
    }
    
    this.lines.push(new Shape(
      shapePoints,
      this.points,
      this.options.shapes,
      'line'
    ));
  }

  _teleportPoints() {
    this.mouse.setToIgnore();
    this.points.forEach((pt) => pt.jumpToMouse());
  }

  _initCanvas(tagId) {
    this.canvas.el = document.getElementById(tagId);
    this.canvas.el.width = window.innerWidth;
    this.canvas.el.height = window.innerHeight;
    this.canvas.ctx = this.canvas.el.getContext('2d');
  }

  _initShapes({ points, lines, polygons }) {
    this.vertices = [];
    this.points = [];
    for (const id in points) {
      const ptObj = new Point(
        points[id][0], 
        points[id][1],
        Number(id),
        this.canvas, 
        this.mouse
      );
      ptObj.scaleToArtboard();
      this.points.push(ptObj);

      // vertex will handle visual aspect of a point
      this.vertices.push(new Vertex(ptObj, this.options.vertices));
    }

    this.lines = lines.map((pointIds) => {
      return new Shape(
        pointIds, 
        this.points, 
        this.options.shapes, 
        'line'
      )
    });

    this.polygons = polygons.map((pointIds) => {
      return new Shape(
        pointIds, 
        this.points, 
        this.options.shapes, 
        'polygon'
      );
    });
  }

  _drawArt(timestamp) {
    const { ctx } = this.canvas;

    ctx.clearRect(0, 0, this.canvas.el.width, this.canvas.el.height);

    // order of shapes drawn is important for visual appeal
    this.polygons.forEach((shape) => shape.draw(ctx));
    this.lines.forEach((shape) => shape.draw(ctx));
    this.vertices.forEach((vtx) => vtx.draw(ctx));
    if (!this.animStart) this.animStart = timestamp;
    const elapsed = timestamp - this.animStart;
    this.animStart = timestamp;

    // Points' movement will depend on the mouse position and mode
    if (this.mouse.mode === 'coalesce' && this.mouse.clicked === true) {
      this.points.forEach(pt => pt.moveToMouse(elapsed));
    } else {
      this.points.forEach(pt => {
        if (
          this.mouse.clicked
          && this.mouse.mode === 'destroy'
          && this.mouse.near(pt)
        ) {
          this._removePoint(pt);
        } else {
          pt.update(elapsed);
        }
      });
    }

    window.requestAnimationFrame(this._drawArt.bind(this));
  }

  _resizeCanvas(newW, newH) {
    const oldW = this.canvas.el.width;
    const oldH = this.canvas.el.height;
    this.canvas.el.height = newH;
    this.canvas.el.width = newW;
    
    // when an artboard is modified, the scaling will change
    if (this.modified) {
      this.points.forEach((pt) => pt.stretchToCanvas(oldW, oldH));
    } else {
      this.points.forEach((pt) => pt.scaleToArtboard());
    }
  }

  _installListeners() {
    window.addEventListener('resize', function () {
      this._resizeCanvas(window.innerWidth, window.innerHeight);
    }.bind(this));

    document.addEventListener('mousedown', function (e) {
      // prevent chosen elements from reacting to click event
      if (
        e.target.localName === 'button'
        || e.target.localName === 'input'
        || e.target.localName === 'label'
        || e.target.localName === 'a'
        || e.target.dataset.ignoreClick
      ) {
        return;
      }

      this.mouse.clicked = true;
      if (this.mouse.mode === 'emit') {
        this._teleportPoints();
      } else if (this.mouse.mode === 'create') {
        this._addNewPoint(e.clientX, e.clientY);
        this.mouse.setToIgnore(500);
      }

    }.bind(this));

    document.addEventListener('mouseup', function () {
      this.mouse.clicked = false;
      if (this.mouse.mode === 'coalesce') {
        this.mouse.setToIgnore();
      }
    }.bind(this));

    document.addEventListener('mousemove', function (e) {
      this.mouse.updatePos(e.clientX, e.clientY);
    }.bind(this));
  }
}

export default AnimatedBackground;