const STARTING_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const createPlayer = function ({ name, mark }) {
  return { name, mark };
};

const TicTacToe = (function () {
  let gameBoard = STARTING_GAME_BOARD;
  let winner = null;
  const firstPlayer = createPlayer({ name: "First Player", mark: "X" });
  const secondPlayer = createPlayer({ name: "Second Player", mark: "O" });
  let currentPlayer = firstPlayer;

  const getBoard = () => gameBoard;
  const getWinner = () => winner;
  const getCurrentPlayer = () => currentPlayer;

  const resetBoard = () => {
    gameBoard = STARTING_GAME_BOARD;
    winner = null;
    return gameBoard;
  };

  const placeMark = (x, y) => {
    if (x > 2 || x < 0 || y < 0 || y > 2) {
      return console.log("Out of bounds");
    }

    const isOccupied = !!gameBoard[x][y];

    if (!isOccupied) {
      gameBoard[x][y] = currentPlayer.mark;
      console.table(gameBoard);
      checkWin(currentPlayer);
      checkIsBoardFull();

      currentPlayer =
        currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
    } else {
      // Show error somewhere
      console.log("Already occupied");
    }
  };

  const checkWin = () => {
    // horizontal win
    gameBoard.forEach((row) => {
      if (row.every((mark) => mark === currentPlayer.mark)) {
        winner = currentPlayer.name;
      }
    });

    // vertical win
    const rotatedGameBoard = gameBoard.reduce(
      (returnArray, row) => {
        returnArray[0].push(row[0]);
        returnArray[1].push(row[1]);
        returnArray[2].push(row[2]);
        return returnArray;
      },
      [[], [], []]
    );

    rotatedGameBoard.forEach((row) => {
      if (row.every((mark) => mark === currentPlayer.mark)) {
        winner = currentPlayer.name;
      }
    });

    // diagonal win
    const diagonalLines = gameBoard.reduce(
      (returnArray, row, rowIndex) => {
        if (rowIndex === 0) {
          returnArray[0].push(row[0]);
          returnArray[1].push(row[2]);
        } else if (rowIndex === 1) {
          returnArray[0].push(row[1]);
          returnArray[1].push(row[1]);
        } else if (rowIndex === 2) {
          returnArray[0].push(row[2]);
          returnArray[1].push(row[0]);
        }
        return returnArray;
      },
      [[], []]
    );

    diagonalLines.forEach((row) => {
      if (row.every((mark) => mark === currentPlayer.mark)) {
        winner = currentPlayer.name;
      }
    });

    if (winner) {
      // Show winner somewhere on the page
      // Disable board
      // Show restart button
      console.log(`AND THE WINNER IS ${winner}`);
    }
  };

  const checkIsBoardFull = () => {
    // Do nothing if last move won the game
    if (winner) {
      return;
    }

    if (!gameBoard.flat().includes(null)) {
      winner = "DRAW";
      console.log(winner);
    }
  };

  return {
    resetBoard,
    getBoard,
    getWinner,
getCurrentPlayer,
    placeMark,
  };
})();
