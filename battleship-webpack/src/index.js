import "./style.css";
import { createTag } from "./helper";
import Player from "./Player";
import Gameboard from "./Gameboard";
import Ship from "./Ship";

const grid = document.querySelector(".grid");
const playerA = Player();
let selectedShip = null;

function loadGrids() {
  grid.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let box = createTag("div", "box", "");
      if (playerA.playerBoard.grid[i][j] !== null) box.classList.add("filled");
      box.addEventListener("click", () => {
        if (selectedShip !== null) {
          console.log(selectedShip);
          playerA.playerBoard.placeShip(j, i, selectedShip);
          selectedShip = null;
          loadGrids();
        }
        if (selectedShip === null && box.classList.contains("filled")) {
          selectedShip = playerA.playerBoard.grid[i][j];
        }
      });
      grid.appendChild(box);
    }
  }
}

loadGrids();

const shipRows = document.querySelectorAll(".ship-row");
const ships = Object.keys(playerA.ships);
shipRows.forEach((row, index) => {
  let shipLength = playerA.ships[ships[index]].length;
  let shipDisplay = createTag(
    "div",
    ["ship", playerA.ships[ships[index]].orientation],
    ""
  );
  for (let i = 0; i < shipLength; i++) {
    let square = createTag("div", "ship-box", "");
    shipDisplay.appendChild(square);
  }
  shipDisplay.addEventListener("click", () => {
    selectedShip = playerA.ships[ships[index]];
    console.log(selectedShip);
  });
  row.appendChild(shipDisplay);

  let rotateButton = createTag("div", "rotate-button", "R");
  rotateButton.addEventListener("click", () => {
    playerA.ships[ships[index]].changeOrientation();
    shipDisplay.classList.remove("vertical");
    shipDisplay.classList.remove("horizontal");
    shipDisplay.classList.add(playerA.ships[ships[index]].orientation);
  });
  row.appendChild(rotateButton);
});
