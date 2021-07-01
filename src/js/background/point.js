class Point {
  constructor(initialX, initialY, id, canvas, mouse) {
    this.initialX = this.x = this.cx = initialX;
    this.initialY = this.y = this.cy = initialY;
    this.id = id;
    this.canvas = canvas;
    this.mouse = mouse;
    this.wander = true;

    // assign point a random angle
    this.rad = (Math.PI * 2 / 45) * (Math.floor(Math.random() * 45) + 1);
  }

  update(elapsed) {
    const distToCenter = this._distanceTo(this.cx, this.cy);
    const distToMouse = this._distanceTo(this.mouse.x, this.mouse.y);
    const distanceFactor = Point.speed * Math.min(elapsed, 33);
    let dx, dy;

    if (distToMouse < 100) {

      /**
       * setting wander as a boolean value allows point to restart it's normal
       * motion once it gets close to the center, rather than the perimeter
       */
      this.wander = false;
      if (distToMouse < 1) {

        // If the point is close enough to the mouse, don't move it
        dx = 0;
        dy = 0;
      } else {

        // Move point toward mouse
        let adjFactor = 9 / distToMouse;
        dx = -(adjFactor * (this.x - this.mouse.x));
        dy = -(adjFactor * (this.y - this.mouse.y));
      }

    } else if (this.wander) {

      /** 
        * Randomly turn point by a defined radian value. If the point gets far
        * enough away from the center, it will turn in one direction.
        */
      let turn = (distToCenter < Point.range && Math.random() > 0.5)
        ? Point.turnRadius
        : -(Point.turnRadius);
      this.rad += turn;
      dx = Math.cos(this.rad);
      dy = Math.sin(this.rad);
    } else {

      // Don't reset the point until it gets close to center
      if (distToCenter < Point.range * 0.25) {
        this.wander = true;
        this.rad = Math.PI * 2 / 45 * (Math.floor(Math.random() * 45) + 1)
      }

      let adjFactor = 18 / distToCenter;
      dx = -(adjFactor * (this.x - this.cx));
      dy = -(adjFactor * (this.y - this.cy));
    }

    this.x += dx * distanceFactor;
    this.y += dy * distanceFactor;
  }

  // Canvas will stretch and not scale
  stretchToCanvas(oldW, oldH) {
    const w = this.canvas.el.width;
    const h = this.canvas.el.height;

    this.cx = this.cx / oldW * w;
    this.x = this.cx;
    this.cy = this.cy / oldH * h;
    this.y = this.cy; 
  }

  // Canvas will scale and not stretch
  scaleToArtboard() {
    const w = this.canvas.el.width;
    const h = this.canvas.el.height;

    const minDim = Math.min(w, h);
    let x = this.initialX / 100 * minDim;
    if (w > h) {
      x += (w - h) * (2 / 3);
    }

    let y = this.initialY / 100 * minDim;
    if (h > w) {
      y += (h - w) * (2 / 3);
    }

    this.x = this.cx = x;
    this.y = this.cy = y;
  }

  _distanceTo(x, y) {
    const sideSq1 = (this.x - x) ** 2;
    const sideSq2 = (this.y - y) ** 2;
    return Math.sqrt(sideSq1 + sideSq2);
  }

}

Point.speed = 0.01;
Point.range = 50;
Point.turnRadius = 2 * Math.PI / 45;

export default Point;