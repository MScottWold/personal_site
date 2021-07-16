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
    this._scaleDown();
    this._installListeners();
    window.requestAnimationFrame(this._drawArt.bind(this));
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

    /**
     * Connect new point to two closest points (if any). Multipath lines are
     * avoided for performance concerns
     * */ 
    const shapePoints = newPt.twoClosestPoints(this.points);
    this.points.push(newPt);
    this.vertices.push(new Vertex(newPt, this.options.vertices));
    shapePoints.forEach((pt) => this.lines.push(new Shape(
      [pt, newPt],
      this.points,
      this.options.shapes
    )));
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
        this.options.shapes
      )
    });

    this.polygons = polygons.map((pointIds) => {
      return new Shape(
        pointIds, 
        this.points, 
        this.options.shapes, 
        true
      );
    });
  }

  _scaleDown() {
    const { scaleDown } = this.options;
    if (scaleDown && window.innerWidth < scaleDown.maxWidth) {
      const factor = scaleDown.factor;
      this.options.vertices.lineWidth /= factor;
      this.options.vertices.radius /= factor;
      this.options.shapes.lineWidth /= factor;
    }
  }

  _drawArt(timestamp) {
    const { ctx } = this.canvas;

    ctx.clearRect(0, 0, this.canvas.el.width, this.canvas.el.height);

    // Order of shapes drawn is important for visual appeal

    // Draw all shapes
    ctx.lineWidth = this.options.shapes.lineWidth;
    ctx.strokeStyle = this.options.shapes.strokeColor;
    ctx.fillStyle = this.options.shapes.fillColor;
    this.polygons.forEach((shape) => shape.draw(ctx));
    this.lines.forEach((shape) => shape.draw(ctx));

    // Draw all vertices
    ctx.lineWidth = this.options.vertices.lineWidth;
    ctx.strokeStyle = this.options.vertices.strokeColor;
    this.vertices.forEach((vtx) => vtx.draw(ctx));

    // Calc elapsed time for smooth animation
    if (!this.animStart) this.animStart = timestamp;
    const elapsed = Math.floor(timestamp - this.animStart);
    this.animStart = timestamp;

    /**
     * Move the logic below to the point object
     */
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
    if (window.innerWidth > 768) {
      window.addEventListener('resize', function () {
        this._resizeCanvas(window.innerWidth, window.innerHeight);
      }.bind(this));
    }

    document.addEventListener('pointerdown', function (e) {
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

      this.mouse.click(e.clientX, e.clientY);
      if (this.mouse.mode === 'radiate') {
        this._teleportPoints();
      } else if (this.mouse.mode === 'create') {
        this._addNewPoint(e.clientX, e.clientY);
        this.mouse.setToIgnore(500);
      }
    }.bind(this));

    document.addEventListener('pointerup', function () {
      this.mouse.resetPos();
      if (this.mouse.mode === 'coalesce') {
        this.mouse.setToIgnore();
      }
    }.bind(this));

    document.addEventListener('pointermove', function (e) {
      this.mouse.updatePos(e.clientX, e.clientY);
    }.bind(this));

    document.addEventListener('pointercancel', function () {
      this.mouse.resetPos();
    }.bind(this));
  }
}

export default AnimatedBackground;