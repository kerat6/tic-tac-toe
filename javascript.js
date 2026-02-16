const starter = document.querySelector(".starter");
starter.showModal();

const ender = document.querySelector(".ender");

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.score = 0;

  this.getName = function() {
    return this.name;
  }

  this.getMarker = function() {
    return this.marker;
  }

  this.getScore = function() {
    return this.score;
  }

  this.addScore = function() {
    this.score++;
  }

  this.resetScore = function() {
    this.score = 0;
  }
}

let player1;
let player2;

const startGame = document.querySelector(".submitBtn");

startGame.addEventListener("click", () => {
    let player1Name = document.querySelector("#player1Input").value;
    let player2Name = document.querySelector("#player2Input").value;
    player1 = new Player(player1Name, "X");
    player2 = new Player(player2Name, "O");
    player1Score.textContent = player1Name + ": " + player1.getScore();
    player2Score.textContent = player2Name + ": " + player2.getScore();
    gameController.start();
})

let player1Score = document.querySelector(".player1Score");
let player2Score = document.querySelector(".player2Score");

const gameboard = (function() {
    const board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ]

    const placeMark = (row, col, marker) => {
        if (board[row][col] !== "") {
            return false;
        }

            board[row][col] = marker;
            return true;
    }

    const getBoard = () => board;
    
    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = "";
            }
        }
    }

    return {
        placeMark, resetBoard, getBoard
    }
}())



    const tiles = document.querySelectorAll(".tile");

    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => {
            let row = Math.floor(index/3);
            let col = index % 3;

            gameController.playTurn(row, col, tile);

        })
    })


const continueBtn = document.querySelector(".continueBtn");

continueBtn.addEventListener("click", () => {
    gameController.resetGame();
})

    const gameController = (function() {
        let currentPlayer;
        let gameOver = false;
        
        const start = () => {
            currentPlayer = player1;
        }

        const switchPlayer = () => {
            if (currentPlayer == player1) {
                currentPlayer = player2;
            }
            else currentPlayer = player1;
        }

        const checkWinner = () => {
    const board = gameboard.getBoard();

    // Check rows
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] !== "" &&
            board[i][0] === board[i][1] &&
            board[i][0] === board[i][2]
        ) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (
            board[0][i] !== "" &&
            board[0][i] === board[1][i] &&
            board[0][i] === board[2][i]
        ) {
            return true;
        }
    }

    // Main diagonal
    if (
        board[0][0] !== "" &&
        board[0][0] === board[1][1] &&
        board[0][0] === board[2][2]
    ) {
        return true;
    }

    // Other diagonal
    if (
        board[0][2] !== "" &&
        board[0][2] === board[1][1] &&
        board[0][2] === board[2][0]
    ) {
        return true;
    }

    return false;
};


        const checkTie = () => {
            const board = gameboard.getBoard();
            //Checks all tiles for 0 empty spaces
            for(let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === "") {
                        //Empty spots still available
                        return false;
                    }
                }
            }
            return true;
        }

        const playTurn = (row, col, tile) => {
            if (!currentPlayer || gameOver) return;

            const success = gameboard.placeMark(row, col, currentPlayer.marker);
            if (!success) return;

            tile.textContent = currentPlayer.marker;
            
            if (checkWinner()) {
                const winnerText = document.querySelector(".gameWinner");
                currentPlayer.addScore();

                player1Score.textContent = player1.getName() + ": " + player1.getScore();
                player2Score.textContent = player2.getName() + ": " + player2.getScore();

                winnerText.textContent = currentPlayer.getName() + " wins!";
                gameOver = true;

                ender.showModal();
                return;
            }

            if (checkTie()) {
                const tieText = document.querySelector(".gameWinner");
                tieText.textContent = "Draw!"
                gameOver = true;

                ender.showModal();
                return;
            }

            switchPlayer();
        }

        const resetGame = () => {
            gameboard.resetBoard();
            gameOver = false;
            currentPlayer = player1;

            tiles.forEach(tile => {
              tile.textContent = "";
            });
            
            ender.close();
        }

        return {start, playTurn, resetGame};
    })();