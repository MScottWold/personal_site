class Rotatable {
  constructor($faces, delay = 1500) {
    this.$faces = $faces;
    this.delay = delay;
    this.showIdx = 1;
  }

  startAnimation() {
    this.interval = setInterval(this._rotateClasses.bind(this), this.delay);
  }

  stopAnimation() {
    this.interval = clearInterval(this.interval);
  }

  _rotateClasses() {
    // get indices for each face of box; allows for any number of panels
    const maxLength = this.$faces.length;
    const nextIdx = (this.showIdx + 1) % maxLength;
    const bottomIdx = (this.showIdx - 1 + maxLength) % maxLength;
    const backIdx = (bottomIdx - 1 + maxLength) % maxLength;

    this.$faces.each((idx, ele) => {
      switch (idx) {
        case nextIdx:
          ele.className = 'next';
          break;
        case this.showIdx:
          ele.className = 'front';
          break;
        case bottomIdx:
          ele.className = 'bottom';
          break;
        case backIdx:
          ele.className = 'back';
          break;
        default:
          ele.className = 'waiting';
          break;
      }
    });

    this.showIdx = (this.showIdx + 1) % maxLength;
  }
}

export default Rotatable;