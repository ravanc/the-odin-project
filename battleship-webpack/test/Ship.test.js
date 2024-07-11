import Ship from "../src/Ship";

test("Ship initialises", () => {
  const carrier = Ship(5);
  expect(carrier).toHaveProperty("length", 5);
  expect(carrier).toHaveProperty("hitCount", 0);
  expect(carrier).toHaveProperty("orientation", "horizontal");
  expect(carrier).toHaveProperty("isSunk");
  expect(carrier).toHaveProperty("hit");
  expect(carrier).toHaveProperty("changeOrientation");
});

test("Ship is not initially sunk", () => {
  const submarine = Ship(3);
  expect(submarine.isSunk()).toBe(false);
});

test("Hit works correctly", () => {
  const carrier = Ship(5);
  carrier.hit();
  expect(carrier.hitCount).toBe(1);
});

test("Ship is sunk with the correct number of hits", () => {
  const submarine = Ship(3);
  submarine.hit();
  submarine.hit();
  submarine.hit();
  expect(submarine.isSunk()).toBe(true);
});

test("Ship changes orientation correctly", () => {
  const carrier = Ship(5);
  expect(carrier.orientation).toBe("horizontal");
  carrier.changeOrientation();
  expect(carrier.orientation).toBe("vertical");
  carrier.changeOrientation();
  expect(carrier.orientation).toBe("horizontal");
});
