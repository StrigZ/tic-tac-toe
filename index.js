const TicTacToe = (function () {
  const gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const resetBoard = () => {
    gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    return gameBoard;
  };

  const getBoard = () => gameBoard;

  const placeMark = (player, x, y) => {
    gameBoard[y][x] = player.mark;
    checkWin(player);
    return gameBoard;
  };

  const checkWin = (player) => {
    const winner = null;
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
  };

  return { resetBoard, getBoard, placeMark };
})();
