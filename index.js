const createPlayer = function ({ name, mark }) {
  return { name, mark };
};

const TicTacToe = function (playerOneName, playerTwoName) {
  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  let winner = null;
  const firstPlayer = createPlayer({ name: playerOneName, mark: "X" });
  const secondPlayer = createPlayer({ name: playerTwoName, mark: "O" });
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

    if (!winner && !gameBoard.flat().includes(null)) {
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
};

const TicTacToeRenderer = function (game) {
  const boardEle = document.querySelector("#board");
  const winnerDialogEle = document.querySelector("dialog");
  const playAgainButton = document.querySelector("#play-again");
  const winnerNameEle = document.querySelector("#winner-name");
  const currentTurnEle = document.querySelector(".current-turn");

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

  const renderWhoseTurn = () => {
    currentTurnEle.textContent = `${game.getCurrentPlayer().name}'s turn`;
  };

  // Initial render
  if (boardEle.childNodes.length === 0) {
    boardEle.classList.add("board");
    renderBoard();
    renderWhoseTurn();
  }

  const renderWinner = () => {
    const winner = game.getWinner();

    if (!winner) {
      return;
    }

    if (winner === "DRAW") {
      winnerNameEle.textContent = "DRAW";
    } else {
      winnerNameEle.textContent = `${winner} is a winner`;
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
    closeWinnerModal();
    game.resetBoard();
    renderBoard();
  };

  const makeTurn = ({ target }) => {
    // If target is ul, do nothing
    if (target instanceof HTMLUListElement) {
      return;
    }

    const { x, y } = target.dataset;
    game.placeMark(x, y);
    renderBoard();
    renderWinner();
    renderWhoseTurn();
  };

  // Listen to the clicks
  boardEle.addEventListener("click", makeTurn);
  playAgainButton.addEventListener("click", restartGame);
};

const GameManager = (() => {
  const startGameButton = document.querySelector("#start-game");
  const playerOneNameInput = document.querySelector("#player-one-name");
  const playerTwoNameInput = document.querySelector("#player-two-name");
  const playerNameInputDiv = document.querySelector(".player-name-input");
  const titleEle = document.querySelector("h1");

  const hideStartUI = () => {
    playerNameInputDiv.classList.add("hidden");
  };

  const hideTitle = () => titleEle.classList.add("hidden");

  const getPlayerNames = () => {
    const playerOneName = !!playerOneNameInput.value
      ? playerOneNameInput.value
      : "Player 1";
    const playerTwoName = !!playerTwoNameInput.value
      ? playerOneNameInput.value
      : "Player 2";

    return [playerOneName, playerTwoName];
  };

  startGameButton.addEventListener("click", () => {
    hideStartUI();
    hideTitle();
    const [playerOneName, playerTwoName] = getPlayerNames();
    TicTacToeRenderer(TicTacToe(playerOneName, playerTwoName));
  });
})();
