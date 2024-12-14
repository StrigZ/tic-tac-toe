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
    currentPlayer = firstPlayer;
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
        return (winner = currentPlayer.name);
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
        return (winner = currentPlayer.name);
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
        return (winner = currentPlayer.name);
      }
    });

    if (!gameBoard.flat().includes(null)) {
      return (winner = "DRAW");
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

const TicTacToeRenderer = function (game) {
  const boardEle = document.querySelector(".board");
  const winnerDialogEle = document.querySelector("dialog");
  const playAgainButton = document.querySelector("#play-again");

  // Create game board in DOM
  const renderBoard = () => {
    boardEle.innerHTML = "";

    game.getBoard().forEach((row, x) =>
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

  const renderWinner = () => {
    const winner = game.getWinner();

    if (!winner) {
      return;
    }
    const winnerNameEle = document.querySelector("#winner-name");

    if (winner === "DRAW") {
      winnerNameEle.textContent = "DRAW";
      console.log("IT'S A DRAW");
    } else {
      winnerNameEle.textContent = `${winner} is a winner`;
      console.log(`${winner} is a winner`);
    }

    boardEle.style["pointer-events"] = "none";
    setTimeout(() => {
      openWinnerModal();
      boardEle.style["pointer-events"] = "all";
    }, 500);
  };

  const closeWinnerModal = () => winnerDialogEle.close();
  const openWinnerModal = () => winnerDialogEle.showModal();

  const restartGame = () => {
    game.resetBoard();
    renderBoard();
  };

  // Listen to the clicks
  boardEle.addEventListener("click", ({ target }) => {
    // If target is ul, do nothing
    if (target instanceof HTMLUListElement) {
      return;
    }

    const { x, y } = target.dataset;
    game.placeMark(x, y);
    renderBoard();
    renderWinner();
  });

  playAgainButton.addEventListener("click", () => {
    closeWinnerModal();
    restartGame();
  });
};

const GameManager = (() => {
  const startGameButton = document.querySelector("#start-game");

  const hideStartButton = () => {
    startGameButton.classList.add("hidden");
  };

  startGameButton.addEventListener("click", () => {
    hideStartButton();
    TicTacToeRenderer(TicTacToe);
  });
})();
