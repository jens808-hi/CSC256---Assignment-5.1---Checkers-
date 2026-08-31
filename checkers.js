/* Checks to see if JavaScript is actually running and connected to the HTML page */
console.log("🍄 Mario Checkers JavaScript is working!");

/* Finds the checkers board from the HTML page, JavaScript creates the 64 squares for the checkers board */
const board = document.getElementById("checkers-board");

/* Find the message paragraph from the HTML page, JavaScript changes the messages during the game */
const gameMessage = document.getElementById("game-message");

/* Game variables - object that stores which checker piece the player selected. 
At the beginning default is no piece is selected */
let selectedPiece = null;

/* Game variables - object that keeps track of whose turn it is. Red player always starts the game first */
let currentPlayer = "red";

/* Reset button - creates the button to clear the board back to it's default setting before the game started */
const resetButton = document.createElement("button");

/* Add the text name & icon of the button to it */
resetButton.textContent = "🔄 Reset Game";

/* Shows the button has a CSS styling class called "checkers reset button" */
resetButton.classList.add("checkers-reset-button");

/* Puts the reset button underneath the changing game messages */
gameMessage.after(resetButton);

/* Function that creates the entire 8 x 8 checkers board */
function createBoard() {

   /* Clears the checkers board at first */
    board.innerHTML = "";

    /* Forget any previously selected piece */
    selectedPiece = null;

    /* Resets the game back to the RED player */
    currentPlayer = "red";

    /* Creates 8 rows */
    for (let row = 0; row < 8; row++) {

        /* Create 8 columns in each row */
        for (let column = 0; column < 8; column++) {

            /* Creates one square */
            const square = document.createElement("div");

            /* Gives the square its CSS class */
            square.classList.add("checker-square");

            /* Creates the checkerboard pattern, both light & dark squares */
            if ((row + column) % 2 === 0) { /* checks if the square should be light or dark when adding the rows & column numbers together, uses % to see if result is an even number */
                square.classList.add("light-square"); /* if condition is true, than add the CSS class to make it a light square */
            } else {
                square.classList.add("dark-square"); /* if condition is true, than add the CSS class to make it a dark square */
            }

            /* Saves the row number of the square */
            square.dataset.row = row;

            /* Saves the column number of the square */
            square.dataset.column = column;

           /* Adds a click event to the square were JavaScript watches for the player clicking an empty square */
            square.addEventListener("click", function () { 
                /* Function that run when the player clicks an empty square */
                movePiece(square);
            });

            /* Puts the square onto the checkers board */
            board.appendChild(square);
        }
    }

    /* Creates the checker pieces after all 64 squares have been created */
    createPieces();

    /* Tells the player whose turn it currently is */
    gameMessage.textContent =
        "🔴 Red Player: Choose a piece to move!";
}

/* Function that creates the 24 checkers; 12 red pieces & 12 blue pieces */
function createPieces() {

    /* Finds every square that JavaScript created */
    const squares =
        document.querySelectorAll(".checker-square");

    /* Keeps track of how many red checker pieces were created */
    let redCount = 0;

    /* Keeps track of how many blue checker pieces were created */
    let blueCount = 0;

    /* Looks at every individual square on the board */
    squares.forEach(function (square) {

        /* Gets the row number from the square */
        const row = Number(square.dataset.row);

        /* Gets the column number from the square */
        const column = Number(square.dataset.column);

        /* Checks whether the current square is a dark (red) square because traditional checkers pieces were positioned on
        dark squares at the start of the board game */
        const isDarkSquare =
            (row + column) % 2 !== 0; /* Uses the modulos operator to determine if the square is dark, if it's not an even number */

        /* Sets the red checker pieces on the first 3 rows */
        if (
            isDarkSquare && /* Only puts a red checker piece on the square if all 3 conditions are met */
            row < 3 && /* row has to be under 3 - rows 0, 1, 2 */
            redCount < 12 /* Checks to see how many red checker pieces have been already created to prevent creating more than 12 pieces */
        ) {

            /* Creates a new checker piece */
            const piece = document.createElement("div");

            /* Gives the checker piece it's 2 CSS classes; making the piece look red */
            piece.classList.add(
                "checker-piece",
                "red-piece"
            );

            /* Remembers that the piece belongs to the red checker player */
            piece.dataset.player = "red";

            /* Adds the clickable event function to the red checker piece when it is clicked and selects it */
            piece.addEventListener("click", function (event) {

                /* Stops the click from also propagating the event to the square underneath */
                event.stopPropagation();

                /* Function that runs when the selectPiece is clicked */
                selectPiece(piece);
            });

            /* Puts the red checker piece inside the square */
            square.appendChild(piece);

            /* Increases the red piece count by 1 */
            redCount++;
        }

        /* Sets the blue checker pieces on the last 3 rows */
        if (
            isDarkSquare && /* Only puts a blue checker piece on the square if all 3 conditions are met */
            row > 4 && /* row must be greater than 4 - rows 5, 6, 7 */
            blueCount < 12 /* Checks to see how many blue checker pieces have been already created to prevent creating more than 12 pieces */
        ) {
            /* Creates a new checker piece */
            const piece = document.createElement("div");
           /* Gives the checker piece it's 2 CSS classes; making the piece look blue */
            piece.classList.add(
                "checker-piece",
                "blue-piece"
            );

           /* Remembers that the piece belongs to the red checker player */
            piece.dataset.player = "blue";

           /* Adds the clickable event function to the blue checker piece when it is clicked and selects it */
            piece.addEventListener("click", function (event) {

                /* Stops the click from also propagating the event to the square underneath */
                event.stopPropagation();

                /* Function that runs when the selectPiece is clicked */
                selectPiece(piece);
            });

            /* Puts the blue checker inside the square */
            square.appendChild(piece);

            /* Increases the blue piece count by 1 */
            blueCount++;
        }
    });
}

/* Function that runs when the player clicks one of the checker pieces */
function selectPiece(piece) {
    /* Checks to see whose turn it currently is. Will not allow a red player to select a blue piece.
    Will not allow a blue player to select a red piece */
    if (piece.dataset.player !== currentPlayer) {
        /* Show an error message */
        gameMessage.textContent =
            "⚠️ It is not your turn!";
        /* Stops the function */
        return;
    }

    /* Removes the yellow glow if another piece was already selected */
    if (selectedPiece) {
        selectedPiece.classList.remove("selected");
    }

    /* Remembers the new piece that was selected */
    selectedPiece = piece;

    /* Adds the selected css class to make the checker piece glow */
    selectedPiece.classList.add("selected");

    /* Game message that tells the player what to do next */
    gameMessage.textContent =
        "⭐ Choose a square ONE space away!";
}

/* Function that runs when the player clicks an empty square */
function movePiece(square) {

    /* If no piece has been selected, there is nothing to move */
    if (!selectedPiece) {
        /* Game message that tells the player to select a checker piece first */
        gameMessage.textContent =
            "⚠️ Choose a checker piece first!";
        /* Stops the function */
        return;
    }

    /* Checks whether the square already contains a checker piece */
    if (square.children.length > 0) {
        /* Game message that tells the player that a piece cannot move onto square that's already occupied */
        gameMessage.textContent =
            "⚠️ That square is already occupied!";
        /* Stops the function */
        return;
    }

/* Function that checks whether all of one player's checker pieces have reached the opposite side */
function checkWinner() {
    /* Finds all the red checker pieces currently on the board */
    const redPieces = document.querySelectorAll(".red-piece");
    /* Finds all the blue checker pieces currently on the board */
    const bluePieces = document.querySelectorAll(".blue-piece");
    /* Checks whether all the red checker pieces have reached the bottom row (row 7)*/
    let redWon = true; /* means red checker player won */
    /* Runs the code to loop through every red piece in the collection */
    redPieces.forEach(function (piece) {
        /* Finds the square the checker piece is currently on */
        const square = piece.parentElement;
        /* Gets the row number that the square is currently on */
        const row = Number(square.dataset.row);
        /* Checks whether the red checker piece is not on row 7 */
        if (row !== 7) {
            redWon = false; /* means red checker player didn't win */
        }

    });

    /* Checks whether all the blue pieces have reached the top row (row 0) */
    let blueWon = true; /* means blue checker player won */
    /* Runs the code to loop through every blue piece in the collection */
    bluePieces.forEach(function (piece) {
        /* Finds the square the checker piece is currently on */
        const square = piece.parentElement;
        /* Gets the row number that the square is currently on */
        const row = Number(square.dataset.row);
        /* Checks whether the blue checker piece is not on row 0 */
        if (row !== 0) {
            blueWon = false; /* means blue checker player didn't win */
        }
    });

    /* Checks if all the red checker pieces have reached the bottom and runs the code, if true red checker player wins! */
    if (redWon) {
        /* Creates a popup window to display winning message */
        alert("🎉 Congratulations! 🔴 Red Player wins! 🎉");
        /* Updates the game message */
        gameMessage.textContent =
            "🏆 Congratulations! Red Player wins!";
        /* Game is over and means red checker player has won */
        return true;
    }

    /* Checks if all the blue checker pieces have reached the bottom and runs the code, if true blue checker player wins! */
    if (blueWon) {
        /* Creates a popup window to display winning message */
        alert("🎉 Congratulations! 🔵 Blue Player wins! 🎉");
        /* Updates the game message */
        gameMessage.textContent =
            "🏆 Congratulations! Blue Player wins!";
        /* Game is over and means blue checker player has won */
        return true;
    }
    /* Means nobody has won yet */
    return false;
}

    /* Finds the square where the selected piece is currently on */
    const oldSquare = selectedPiece.parentElement;

    /* Gets the old row to see where the checker piece started from */
    const oldRow =
        Number(oldSquare.dataset.row);

    /* Gets the old column to see where the checker piece started from */
    const oldColumn =
        Number(oldSquare.dataset.column);

    /* Gets the new row of the checker piece's destination */
    const newRow =
        Number(square.dataset.row);
  
    /* Gets the new column of the checker piece's destination */
    const newColumn =
        Number(square.dataset.column);

    /* Calculates how many rows the checker piece moved */
    const rowDifference =
        Math.abs(newRow - oldRow); /* Subtracts old row position from new row positon to get the distance */

    /* Calculate how many columns the checker piece moved */
    const columnDifference =
        Math.abs(newColumn - oldColumn); /* Subtracts old column position from new column positon to get the distance */

    /* Meeting the minimum requirement of the assignment to only move one square at a time. 
    - Checks if the checker piece moved 1 row and 1 column at the very least 
    - Required to create the one square diagonal move */
    if (
        rowDifference !== 1 || /* Row movement is not equal to 1 or */
        columnDifference !== 1 /* Column movement is not equal to 1 */
    ) {
        /* Game message that tells the player if the move is too far */
        gameMessage.textContent =
            "⚠️ You can only move ONE square diagonally!";
        /* Exits the function and does not move the checker piece */
        return;
    }

    /* Moves the selected checker piece into the new square , automatically removing the checker piece from it's old square */
    square.appendChild(selectedPiece);

    /* Removes the yellow selection glow from the checker after it has been moved to the new destination */
    selectedPiece.classList.remove("selected");

    /* No value is stored in variable currently so no checker is selected, basically forgets which piece was selected */
    selectedPiece = null;

    /* Checks whose turn is it currently. If red checker piece move, than change the players turn to the blue checker piece, otherwise make it red's turn */
    if (currentPlayer === "red") { /* Is the current turn equal to red checker player? */
        currentPlayer = "blue"; /* Is the current turn equal to blue checker player? */
    } else { /* if not then */
        /* Otherwise switch the turn back to red checker player */
        currentPlayer = "red";
    }

    /* Tells the player whose turn it is now. Is it Red's? */
    if (currentPlayer === "red") { 
        /* Game message that tells the user it's red player's turn */
        gameMessage.textContent =
            "🔴 Red Player: Your turn!";
    } else { /* if not then */
        /* Game message that tells the user it's blue player's turn */
        gameMessage.textContent =
            "🔵 Blue Player: Your turn!";
    }
}

/* Creates a completely new board to start from when the Reset Game button is clicked */
resetButton.addEventListener("click", function () {
    /* Function that creates the checker board when the player clicks reset game button */
    createBoard();
});

/* Function that runs the when the page loads to create the checker board with 64 squares, 12 red checker pieces, and 12 blue checker pieces */
createBoard();

/* Creates the help instructions pop up background */
const helpPopup = document.createElement("div");

/* Gives the CSS class for the help instructions pop-up */
helpPopup.classList.add("help-popup");

/* Creates the actual instruction box */
const helpBox = document.createElement("div");

/* Gives the instruction box its CSS class */
helpBox.classList.add("help-box");

/* Help instructions - displays help instructions message to the player 
innerHTML lets JavaScript change the HTML element
`` enables multi-line string containing HTML */
helpBox.innerHTML = `
    <h2>🎮 How to Play Checkers</h2>

    <h3>🎯 Objective</h3>
    <p>
        The objective is to move all of your checker pieces
        across the board and reach the opposite side.
    </p>

    <h3>🕹️ How to Play</h3>
    <ol>
        <li>🔴 Red Checker Player will move first.</li>
        <li>Click on one of your chosen <strong>color</strong> checker pieces.</li>
        <li>The selected checker piece will <strong>glow yellow</strong> to indicate current selection.</li>
        <li>Click on an empty square that is <strong>one space</strong> away diagonally.</li>
        <li>Players take turns moving their pieces across the board.</li>
        <li>🔵 Blue Checker Player moves after 🔴 Red Checker Player completes their move.</li>
    </ol>

    <h3>🏆 How to Win</h3>
    <p>
        Move all 12 of your checker pieces to the
        opposite side of the board.
    </p>

    <p>
        🔴 Red wins when all the red checker pieces reaches the bottom row.
    </p>

    <p>
        🔵 Blue wins when all the blue checker pieces reaches the top row.
    </p>

    <p class="help-tip">
        ⭐ Strategize! Checkers is won by controlling the board, limiting your opponent's options,
        and creating opportunities for capture. Carefully make your moves and try to block your opponent! Without planning your moves, you risk being trapped, losing mobility, or failing into traps your opponent sets.
    </p>
`;

/* Puts the instruction box inside the pop-up background */
helpPopup.appendChild(helpBox);

/* Add the pop-up to the webpage */
document.body.appendChild(helpPopup);

/* Opens the help pop up */
helpButton.addEventListener("click", function () {
    /* Displays the the help pop-up */
    helpPopup.classList.add("show-help");

});




