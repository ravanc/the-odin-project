const Ship = function (length) {
  let hitCount = 0;
  let orientation = "horizontal";
  return {
    length: length,
    hitCount: hitCount,
    orientation: orientation,

    isSunk() {
      return this.hitCount === this.length ? true : false;
    },

    hit() {
      if (this.hitCount < this.length) this.hitCount++;
    },

    changeOrientation() {
      this.orientation =
        this.orientation === "horizontal" ? "vertical" : "horizontal";
    },
  };
};

export default Ship;
