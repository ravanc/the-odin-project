let game = (function() {

    const dialog = document.querySelector("dialog");
    const startGame = document.querySelector(".startGame");
    const squares = document.querySelectorAll(".square");
    const inputX = document.querySelector("#playerX");
    const inputO = document.querySelector("#playerO");
    const restart = document.querySelector(".restart")
    const result = document.querySelector(".result");

    let counter = 0;
    let gameState = true;
    let playerXname = "Player X";
    let playerOname = "Player O";

    dialog.showModal();

    startGame.addEventListener("click", () => {
        if (inputX.value) {
            playerXname = inputX.value;
        }
        if (inputO.value) {
            playerOname = inputO.value;
        }
        dialog.close();
    });

    let instance = [[ , , ],
                    [ , , ],
                    [ , , ]];


    function fillBox(row, column, player) {
        instance[row][column] = player;
    };

    function checkWin() {
        const axes = [
            [instance[0][0], instance[0][1], instance[0][2]],
            [instance[1][0], instance[1][1], instance[1][2]],
            [instance[2][0], instance[2][1], instance[2][2]],
            [instance[0][0], instance[1][0], instance[2][0]],
            [instance[0][1], instance[1][1], instance[2][1]],
            [instance[0][2], instance[1][2], instance[2][2]],
            [instance[0][0], instance[1][1], instance[2][2]],
            [instance[0][2], instance[1][1], instance[2][0]]
        ];
        axes.forEach((axis) => {
            let [a, b, c] = axis;
            if (a === b && a === c && a == "X") {
                gameState = false;
                result.textContent = `${playerXname} won!`;
            } else if (a == b && a == c && a == "O"){
                gameState = false;
                result.textContent = `${playerOname} won!`;
            }
        })
        return false;
    }

    function checkDraw() {
        if (counter == 9 && !checkWin() && gameState == true) {
            result.textContent = "It's a Draw!";
        }
    }

    function checkBox(row, column, player) {
        if (column < 0 || column > 2) {
            console.log("Invalid input!");
            return false;
        }
        if (instance[row][column]) {
            console.log("That box is taken up!");
            return false;
        } else {
            fillBox(row, column, player);
            counter++;
            return true;
        }
    };
    
    let currentPlayer = (function() {
        let currentSymbol = "X";
        function selectBox(row, column) {
            if (checkBox(row, column, currentSymbol) && gameState){
                checkWin();
                checkDraw();
                if (currentSymbol == "X") {
                    currentSymbol = "O";
                } else { 
                    currentSymbol = "X"; 
                };
            };
        }
        return selectBox;
    })();
          
    let squareCounter = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            squares[squareCounter].addEventListener("click", (event) => {
                currentPlayer(i, j);
                event.target.textContent = instance[i][j];
                event.target.classList.add(instance[i][j]);
            })
            squareCounter++;
        }
    }

    restart.addEventListener("click", () => {
        counter = 0;
        instance = [[ , , ],
                    [ , , ],
                    [ , , ]];
        squares.forEach((square) => {
            square.textContent = '';
            square.classList.remove("X");
            square.classList.remove("O");
        });
        result.textContent = '';
        gameState = true;
    });
    
})();



