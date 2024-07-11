import Gameboard from "../src/Gameboard";
import Ship from "../src/Ship";

test("Gameboard initialises correctly", () => {
  expect(Gameboard()).toHaveProperty("placeShip");
});

test("Horizontal ship places correctly", () => {
  const game = Gameboard();
  const submarine = Ship(3);
  game.placeShip(1, 1, submarine);
  expect(game.grid[1][1]).not.toBe(null);
  expect(game.grid[1][2]).not.toBe(null);
  expect(game.grid[1][3]).not.toBe(null);
});

test("Vertical ship places correctly", () => {
  const game = Gameboard();
  const submarine = Ship(3);
  submarine.changeOrientation();
  game.placeShip(1, 1, submarine);
  expect(game.grid[1][1]).not.toBe(null);
  expect(game.grid[2][1]).not.toBe(null);
  expect(game.grid[3][1]).not.toBe(null);
});

test("Ship exceeding limit will not be placed", () => {
  const game = Gameboard();
  const carrier = Ship(5);
  game.placeShip(7, 9, carrier);
  expect(game.grid[9][7]).toBe(null);
  expect(game.grid[9][8]).toBe(null);
  expect(game.grid[9][9]).toBe(null);
});

test("Ship placed is hit correctly", () => {
  const game = Gameboard();
  const carrier = Ship(5);
  game.placeShip(1, 1, carrier);
  game.receiveAttack(1, 1);
  expect(carrier.hitCount).toBe(1);
  expect(game.grid[1][1]).toBe("hit");
});

test("Attack misses correctly", () => {
  const game = Gameboard();
  const carrier = Ship(5);
  game.placeShip(1, 1, carrier);
  expect(game.grid[2][1]).toBe(null);
  game.receiveAttack(1, 2);
  expect(carrier.hitCount).toBe(0);
  expect(game.grid[2][1]).toBe("miss");
});

test("Able to change positions on gameboard", () => {
  const game = Gameboard();
  const cruiser = Ship(3);
  game.placeShip(1, 1, cruiser);
  expect(game.grid[1][1]).not.toBe(null);
  expect(game.grid[1][2]).not.toBe(null);
  expect(game.grid[1][3]).not.toBe(null);
  game.placeShip(2, 2, cruiser);
  expect(game.grid[1][1]).toBe(null);
  expect(game.grid[2][1]).toBe(null);
  expect(game.grid[3][1]).toBe(null);
  expect(game.grid[2][2]).not.toBe(null);
  expect(game.grid[2][3]).not.toBe(null);
  expect(game.grid[2][4]).not.toBe(null);
});

test("No overlapping allowed", () => {
  const game = Gameboard();
  const cruiser = Ship(3);
  const carrier = Ship(5);
  game.placeShip(1, 1, cruiser);
  game.placeShip(3, 1, carrier);
  expect(game.grid[1][4]).toBe(null);
  expect(game.grid[1][3]).not.toBe(null);
});

test("Unable to place ships adjacently", () => {
  const game = Gameboard();
  const cruiser = Ship(3);
  const carrier = Ship(5);
  game.placeShip(1, 1, cruiser);
  game.placeShip(1, 2, carrier);
  expect(game.grid[1][1]).not.toBe(null);
  expect(game.grid[2][1]).toBe(null);
});
