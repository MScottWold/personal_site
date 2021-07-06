class Shape {
  constructor(pointIds, points, options, type) {
    if (pointIds[0].constructor.name === "Point") {
      this.points = pointIds;
    } else {
      this.points = pointIds.map(id => points[id]);
    }
    this.options = options;
    this.type = type;
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

    if (this.type === 'polygon') {
      ctx.closePath();
      ctx.fillStyle = this.options.fillColor;
      ctx.fill();
    }

    if (this.type === 'line') {
      ctx.lineWidth = this.options.lineWidth;
      ctx.strokeStyle = this.options.strokeColor;
      ctx.stroke();
    }
  }

  removePoint(point) {
    this.points = this.points.filter((pt) => pt !== point);
  }
}

export default Shape;