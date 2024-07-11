const possibleMoves = [
  [2, 1],
  [1, 2],
  [2, -1],
  [1, -2],
  [-1, 2],
  [-2, 1],
  [-1, -2],
  [-2, -1],
];

function checkMoves([positionX, positionY]) {
  const endPositions = [];
  possibleMoves.forEach(([changeX, changeY]) => {
    let finalX = positionX + changeX;
    let finalY = positionY + changeY;
    if (finalX >= 0 && finalX <= 7 && finalY >= 0 && finalY <= 7)
      endPositions.push([finalX, finalY]);
  });
  return endPositions;
}

function fillArray(item) {
  const array = [];
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      row.push(item);
    }
    array.push(row);
  }
  return array;
}

function solve([startX, startY]) {
  const queue = [];
  queue.push([startX, startY]);

  const visited = fillArray(false);
  visited[startX][startY] = true;

  const prev = fillArray(null);
  //   console.log(queue);
  //   console.log(visited);
  //   console.log(prev);

  while (queue.length !== 0) {
    let [currentX, currentY] = queue.shift();
    let moves = checkMoves([currentX, currentY]);

    moves.forEach(([nextX, nextY]) => {
      if (!visited[nextX][nextY]) {
        queue.push([nextX, nextY]);
        visited[nextX][nextY] = true;
        prev[nextX][nextY] = [currentX, currentY];
      }
    });
  }

  return prev;
}

function reconstructPath([startX, startY], [endX, endY], prev) {
  const path = [];
  for (let at = [endX, endY]; at !== null; at = prev[at[0]][at[1]]) {
    // console.log(at);
    path.push(at);
  }
  path.reverse();
  return path;
}

function knightMoves(start, end) {
  const prev = solve(start);
  //   console.log(prev);
  //   console.log("reconstruct path");
  const path = reconstructPath(start, end, prev);
  console.log(`You made it in ${path.length} moves! Here is your path:`);
  path.forEach((step) => console.log(step));
}

knightMoves([0, 0], [6, 7]);
