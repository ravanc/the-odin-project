import Gameboard from "./Gameboard";
import Ship from "./Ship";

const Player = function () {
  const playerBoard = Gameboard();
  return {
    playerBoard: playerBoard,
    ships: {
      carrier: Ship(5),
      battleship: Ship(4),
      cruiser: Ship(3),
      submarine: Ship(3),
      destroyer: Ship(2),
    },
  };
};

export default Player;
