class Point {
  constructor(initialX, initialY, id, canvas, mouse) {
    // keeping track of inital x and y allows for scaling the image
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
    const distToMouse = this._distanceTo(this.mouse.x, this.mouse.y);

    if (this.mouse.x && distToMouse < 100 && !this.mouse.ignore) {
      this.moveToMouse(elapsed, distToMouse);
    } else if (this.wander) {
      this._wander(elapsed);
    } else {
      this._returnToCenter(elapsed);
    }
  }

  moveToMouse(elapsed, distanceToMouse) {
    const distToMouse = distanceToMouse 
      || this._distanceTo(this.mouse.x, this.mouse.y);

    /**
      * setting wander as a boolean value allows point to restart it's normal
      * motion once it gets close to the center, rather than the perimeter
      */
    this.wander = false;
    let dx, dy;

    if (distToMouse < 1) {

      // If the point is close enough to the mouse, don't move it
      dx = 0;
      dy = 0;
    } else {

      // Move point toward mouse
      const adjFactor = 9 / distToMouse;
      dx = -(adjFactor * (this.x - this.mouse.x));
      dy = -(adjFactor * (this.y - this.mouse.y));
    }

    const distanceFactor = Point.speed * Math.min(elapsed, 33);
    this.x = this.x + (dx * distanceFactor);
    this.y = this.y + (dy * distanceFactor);
  }

  jumpToMouse() {
    this.x = this.mouse.x;
    this.y = this.mouse.y;
    this.wander = false;
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

  twoClosestPoints(points) {
    if (points.length <= 2) return [...points];

    let closestPt = points[0];
    let closestDist = this._distanceTo(closestPt.x, closestPt.y);
    let secondClosestPt = points[1];
    let secondClosestDist = this._distanceTo(
      secondClosestPt.x,
      secondClosestPt.y
    );

    // check order of closest points
    if (closestDist > secondClosestDist) {
      [closestPt, secondClosestPt] = [secondClosestPt, closestPt];
      [closestDist, secondClosestDist] = [secondClosestDist, closestDist];
    }

    let pt, dist;
    for (let i = 2; i < points.length; i++) {
      pt = points[i];
      dist = this._distanceTo(pt.x, pt.y);
      if (dist < closestDist) {
        secondClosestPt = closestPt;
        secondClosestDist = closestDist;
        closestPt = pt;
        closestDist = dist;
      } else if (dist < secondClosestDist) {
        secondClosestPt = pt;
        secondClosestDist = dist;
      }
    }

    return [closestPt, secondClosestPt];
  }

  _wander(elapsed) {
    const distToCenter = this._distanceTo(this.cx, this.cy);

    /** 
      * Randomly turn point by a defined radian value. If the point gets far
      * enough away from the center, it will turn in one direction.
      */
    let turn = (distToCenter < Point.range && Math.random() > 0.5)
      ? Point.turnRadius
      : -(Point.turnRadius);
    this.rad = this.rad + turn;
    const dx = Math.cos(this.rad);
    const dy = Math.sin(this.rad);
    const distanceFactor = Point.speed * Math.min(elapsed, 33);
    this.x = this.x + dx * distanceFactor;
    this.y = this.y + dy * distanceFactor;
  }

  _returnToCenter(elapsed) {
    const distToCenter = this._distanceTo(this.cx, this.cy);
    const adjFactor = 18 / distToCenter;
    const distanceFactor = Point.speed * Math.min(elapsed, 33);
    const dx = -(adjFactor * (this.x - this.cx));
    const dy = -(adjFactor * (this.y - this.cy));
    this.x = this.x + dx * distanceFactor;
    this.y = this.y + dy * distanceFactor;

    // Don't reset the point until it gets close to center
    if (distToCenter < Point.range * 0.25) {
      this.wander = true;
      this.rad = Math.PI * 2 / 45 * (Math.floor(Math.random() * 45) + 1);
    }
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