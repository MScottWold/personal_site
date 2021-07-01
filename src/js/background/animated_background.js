import Point from './point';
import Vertex from './vertex';
import Shape from './shape';

class AnimatedBackground {
  constructor(tagId, artboard, drawMode = false) {
    this.canvas = {};
    this.mouse = { x: 0, y: 0 };
    this.drawMode = drawMode;
    this.options = artboard.options;
    this.modified = false;

    this._initCanvas(tagId);
    this._initShapes(artboard);
    window.requestAnimationFrame(this._drawArt.bind(this));
    this._installListeners();
  }

  addNewPoint(x, y) {
    this.modified = true;
    const newPt = new Point( 
      x, 
      y, 
      this.points.length,
      this.canvas, 
      this.mouse 
    );
    this.points.push(newPt);

    // vertex will handle visual aspect
    this.vertices.push(new Vertex(newPt, this.options.vertices));
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
        id,
        this.canvas, 
        this.mouse
      );
      ptObj.scaleToArtboard();
      this.points.push(ptObj);

      // vertex will handle visual aspect
      this.vertices.push(new Vertex(ptObj, this.options.vertices));
    }

    this.lines = lines.map((pointIds) => {
      return new Shape(
        pointIds, 
        this.points, 
        this.options.shapes, 
        true, 
        false
      )
    });

    this.polygons = polygons.map((pointIds) => {
      return new Shape(
        pointIds, 
        this.points, 
        this.options.shapes, 
        false, 
        true
      );
    });
  }

  _drawArt(timestamp) {
    const { ctx } = this.canvas;

    ctx.clearRect(0, 0, this.canvas.el.width, this.canvas.el.height);

    // order of shapes drawn is important for visual appeal
    this.polygons.forEach((shape) => shape.draw(ctx))
    this.lines.forEach((shape) => shape.draw(ctx))
    this.vertices.forEach((vtx) => vtx.draw(ctx));
    if (this.drawMode) {
      this.vertices.forEach((vtx) => vtx.label(ctx));
    } else {
      if (!this.animStart) this.animStart = timestamp;
      const elapsed = timestamp - this.animStart;
      this.animStart = timestamp;
      this.points.forEach(pt => pt.update(elapsed));
      window.requestAnimationFrame(this._drawArt.bind(this));
    }
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

  _showPoints() {
    // Only used while creating artboard
    const report = document.createElement('p');
    report.style.backgroundColor = 'white';
    report.style.color = 'black';
    report.style.border = '2px solid black';
    report.style.position = 'absolute';
    report.style.top = 0;
    report.style.zIndex = 10;
    report.style.padding = '25px';
    report.style.width = '100px';
    report.style.maxHeight = '80vh';
    report.style.overflow = 'scroll';

    let pointList = '{\n';
    this.points.forEach((pt, idx) => {

      /**
       * Drawn points are stored as percentages of width & height to allow for
       * proper scaling
       * */ 
      const x = Math.round(pt.cx / this.canvas.el.width * 100);
      const y = Math.round(pt.cy / this.canvas.el.height * 100);

      pointList += `${idx}: [${x}, ${y}],\n`
    });

  
    pointList += '};';
    report.innerText = pointList;
    document.body.appendChild(report);
  }

  _installListeners() {
    window.addEventListener('resize', function(e) {
      this._resizeCanvas(window.innerWidth, window.innerHeight);
    }.bind(this));

    document.addEventListener('mousemove', function(e) {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }.bind(this));

    if (this.drawMode) {
      document.addEventListener('click', function(e) {
        this.addNewPoint(e.clientX, e.clientY);
        this._drawArt();
      }.bind(this));

      document.addEventListener('keydown', function(e) {
        if (e.code === 'Enter') {
          this._showPoints();
        }
      }.bind(this))
    }
  }
}

export default AnimatedBackground;