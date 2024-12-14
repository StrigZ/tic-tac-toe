const createPlayer = function ({ name, mark }) {
  return { name, mark };
};

const TicTacToe = (function () {
  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  let winner = null;
  const firstPlayer = createPlayer({ name: "First Player", mark: "X" });
  const secondPlayer = createPlayer({ name: "Second Player", mark: "O" });
  let currentPlayer = firstPlayer;

  const getBoard = () => gameBoard;
  const getWinner = () => winner;
  const getCurrentPlayer = () => currentPlayer;

  const resetBoard = () => {
    gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
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

const TicTacToeRenderer = (function (TicTacToe) {
  const boardEle = document.querySelector(".board");

  // Create game board in DOM
  const renderBoard = () => {
    boardEle.innerHTML = "";

    TicTacToe.getBoard().forEach((row, x) =>
      row.forEach((mark, y) => {
        const tile = document.createElement("li");
        tile.textContent = mark;
        tile.dataset.x = x;
        tile.dataset.y = y;

        boardEle.append(tile);
      })
    );
  };

  // Initial render
  if (boardEle.childNodes.length === 0) {
    renderBoard();
  }

  // Listen to the clicks
  boardEle.addEventListener("click", ({ target }) => {
    // If target is ul, do nothing
    if (target instanceof HTMLUListElement) {
      return;
    }

    const { x, y } = target.dataset;

    TicTacToe.placeMark(x, y);
    renderBoard();
  });
})(TicTacToe);
