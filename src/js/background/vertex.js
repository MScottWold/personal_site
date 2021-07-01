class Vertex {
  constructor(point, options) {
    this.point = point;
    this.options = options;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.point.x, this.point.y, 4, 0, Math.PI * 2, false);
    ctx.closePath();
    
    if (this.options.fillColor) {
      ctx.fillStyle = this.options.fillColor;
      ctx.fill();
    }
    
    if (this.options.strokeColor) {
      ctx.lineWidth = this.options.lineWidth;
      ctx.strokeStyle = this.options.strokeColor;
      ctx.stroke();
    }
  }

  label(ctx) {
    ctx.beginPath();
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(this.point.id, this.point.x - 3, this.point.y + 13);
  }
}

export default Vertex;