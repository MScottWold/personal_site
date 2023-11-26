import Constellation from './constellation';
import Point from './point';
import Vertex from './vertex';

class CreateConstellation extends Constellation {
  _drawArt() {
    const { ctx } = this.canvas;
    ctx.clearRect(0, 0, this.canvas.el.width, this.canvas.el.height);

    // order of shapes drawn is important for visual appeal
    this.polygons.forEach((shape) => shape.draw(ctx));
    this.lines.forEach((shape) => shape.draw(ctx));
    this.vertices.forEach((vtx) => vtx.draw(ctx));
    this.vertices.forEach((vtx) => vtx.label(ctx));
  }

  _addNewPoint(x, y) {
    const newPt = new Point(
      x,
      y,
      this.points.length,
      this.canvas,
      this.mouse
    );
    this.points.push(newPt);
    this.vertices.push(new Vertex(newPt));
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
    window.addEventListener('resize', function () {
      this._resizeCanvas(window.innerWidth, window.innerHeight);
    }.bind(this));

    document.addEventListener('click', function (e) {
      this._addNewPoint(e.clientX, e.clientY);
      this._drawArt();
    }.bind(this));

    document.addEventListener('keydown', function (e) {
      if (e.code === 'Enter') {
        this._showPoints();
      }

    }.bind(this))
  }
}

export default CreateConstellation;