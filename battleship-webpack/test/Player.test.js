import Player from "../src/Player";

test("Places ship correctly", () => {
  const playerA = Player();
  playerA.playerBoard.placeShip(1, 1, playerA.ships.carrier);
  expect(playerA.playerBoard.grid[1][1]).not.toBe(null);
  expect(playerA.playerBoard.grid[1][2]).not.toBe(null);
  expect(playerA.playerBoard.grid[1][3]).not.toBe(null);
  expect(playerA.playerBoard.grid[1][4]).not.toBe(null);
  expect(playerA.playerBoard.grid[1][5]).not.toBe(null);
  expect(playerA.playerBoard.grid[1][6]).toBe(null);
});

test("Ship sinks correctly", () => {
  const playerA = Player();
  playerA.ships.destroyer.hit();
  playerA.ships.destroyer.hit();
  expect(playerA.ships.destroyer.isSunk()).toBe(true);
});
