const createPlayer = function (name, mark) {
  return { name, mark };
};

const TicTacToe = (function () {
  const gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  let winner = null;

  const resetBoard = () => {
    gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    winner = null;
    return gameBoard;
  };

  const getBoard = () => gameBoard;
  const getWinner = () => winner;

  const placeMark = (player, x, y) => {
    const isOccupied = !!gameBoard[y][x];

    if (!isOccupied) {
    gameBoard[y][x] = player.mark;
console.table(gameBoard);
    checkWin(player);
    checkIsBoardFull();

    return gameBoard;
} else {
      console.log("Already occupied");
    }
  };

  const checkWin = (player) => {
    // horizontal win
    gameBoard.forEach((row) => {
      if (row.every((mark) => mark === player.mark)) {
        winner = player.name;
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
      if (row.every((mark) => mark === player.mark)) {
        winner = player.name;
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
      if (row.every((mark) => mark === player.mark)) {
        winner = player.name;
      }
    });

    if (winner) {
      console.log(`AND THE WINNER IS ${winner}`);
    }
  };

  const checkIsBoardFull = () => {
    if (!gameBoard.flat().includes(null)) {
      winner = "DRAW";
      console.log(winner);
    }
  };

  return {
    resetBoard,
    getBoard,
    getWinner,
    placeMark,
  };
})();
