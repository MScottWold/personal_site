class Shape {
  constructor(pointIds, points, options, line, fill) {
    this.points = pointIds.map(id => points[id]);
    this.options = options;
    this.line = line;
    this.fill = fill;
  }

  draw(ctx) {
    ctx.beginPath();
    let x_pos = this.points[0].x;
    let y_pos = this.points[0].y;
    ctx.moveTo(x_pos, y_pos);

    for (let i = 1; i < this.points.length; i++) {
      x_pos = this.points[i].x;
      y_pos = this.points[i].y;
      ctx.lineTo(x_pos, y_pos);
    }

    if (this.fill) {
      ctx.closePath();
      ctx.fillStyle = this.options.fillColor;
      ctx.fill();
    }

    if (this.line) {
      ctx.lineWidth = this.options.lineWidth;
      ctx.strokeStyle = this.options.strokeColor;
      ctx.stroke();
    }
  }
}


export default Shape;