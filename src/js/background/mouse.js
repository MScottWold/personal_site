class Mouse {
  constructor() {
    this.x, this.y;
    this.mode = 'default';
    this.clicked = false;
    this.ignore = false;
  }

  resetPos() {
    this.x = null;
    this.y = null;
    this.clicked = false;
  }

  updatePos(x, y) {
    this.x = x;
    this.y = y;
  }

  click(x, y) {
    this.x = x;
    this.y = y;
    this.clicked = true;
  }

  setToIgnore(time = 1000) {
    this.ignore = true;
    if (this.ignoreTimeout) clearTimeout(this.ignoreTimeout);

    this.ignoreTimeout = setTimeout(() => this.ignore = false, time);
  }

  near(pt) {
    const sideSq1 = (this.x - pt.x) ** 2;
    const sideSq2 = (this.y - pt.y) ** 2;
    return Math.sqrt(sideSq1 + sideSq2) < 100;
  }
}

export default Mouse;