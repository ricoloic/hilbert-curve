class PointV {
  constructor(a, b) {
    this[0] = a;
    this[1] = b;
  }

  mult(time) {
    this[0] *= time;
    this[1] *= time;
    return this;
  }

  add(a, b) {
    this[0] += a;
    if (!b) {
      this[1] += a;
      return this;
    }
    this[1] += b;
    return this;
  }

  set(a,b) {
    this[0] = a;
    this[1] = b;
    return this;
  }
}
