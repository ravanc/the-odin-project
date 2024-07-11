const Gameboard = function () {
  const grid = [];

  for (let i = 0; i < 10; i++) {
    const column = [];
    for (let j = 0; j < 10; j++) {
      column.push(null);
    }
    grid.push(column);
  }

  return {
    grid: grid,

    placeShip(x, y, ship) {
      const length = ship.length;

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (this.grid[i][j] === ship) this.grid[i][j] = null;
        }
      }

      if (ship.orientation === "horizontal") {
        if (x + length > 10) return;

        for (let i = 0; i < length; i++) {
          if (this.grid[y][x + i] !== null) return;
        }

        for (let i = -1; i < length + 1; i++) {
          for (let j = -1; j < 2; j++) {
            this.grid[y + j][x + 1] = ship.deadzone;
          }
        }

        for (let i = 0; i < length; i++) {
          this.grid[y][x + i] = ship;
        }
      } else if (ship.orientation === "vertical") {
        if (y + length > 10) return;

        for (let i = 0; i < length; i++) {
          if (this.grid[y + i][x] !== null) return;
        }

        for (let i = 0; i < length; i++) {
          this.grid[y + i][x] = ship;
        }
      }
    },

    receiveAttack(x, y) {
      if (this.grid[y][x] && Object.hasOwn(this.grid[y][x], "hit")) {
        this.grid[y][x].hit();
        this.grid[y][x] = "hit";
      } else {
        this.grid[y][x] = "miss";
      }
    },
  };
};

export default Gameboard;
