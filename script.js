gameBoard = (function () {
    gameGridArray = new Array(9);
    const clearArray = function (array) {
        for (i = 0; i < array.length; i++) {
            array[i] = 0;
        };
    };
    const clearGridArray = function () {
        clearArray(gameGridArray);
    };
    clearGridArray();
    //set all grid values to 0
    const executeMove = function (playerNumber, position) {
        gameGridArray[position] = playerNumber;
    }
    const currentScore = function () {
        return (gameGridArray);
    }
    return {clearGridArray, executeMove, currentScore};
})();


setupGame = (function () {
    const Player = function (name, playerNumber, symbol) {
        let winCount = 0
        const playerWin = function () {
            winCount++;
        };
        return { name, playerNumber, symbol, playerWin };
    };

    //createPlayers
    //returns 2 player objects

    const loadScreen = function () {
        //Add more code to allow player name inputs in the future
        document.querySelector('.game-type-selector').style.display = 'block';
        const startGameButton = document.querySelector('.start-game-button');
        if (!startGameButton.classList.contains('listener-added')) {
            startGameButton.addEventListener('click', startGame);
            startGameButton.classList.add('listener-added');
        };
    }
    const startGame = function () {
        // set players with creatplayers
        // clear inputs, set defualt radio button
        const playerVsPlayer = document.querySelector('#player-vs-player');
        if (playerVsPlayer.checked) {
            document.querySelector('.game-type-selector').style.display = 'none';
            playGame.createBoard();
        } else {
            alert('You must select a game type to continue!')
        };    
    }
    return {loadScreen/*, createPlayers*/};
})();

//create players with factories
Player = function (name, playerNumber, symbol) {
    let winCount = 0
    const playerWin = function () {
        winCount++;
    };
    //check code below to see of keys for values are created
    return { name, playerNumber, symbol, playerWin };

};



//test code below, remove when function to add players works
player1 = new Player('"X"', 1, 'x');
player2 = new Player('"O"', 2, 'o');
// remove code above when function to add players works



playGame = (function () {
    //get players somehow (add to an object or array?)and set current player to 1 as below
    let currentPlayer = player1
    //write code to add home button to top of page
    let winner = 0;
    const createBoard = function () {
        const gameGrid = document.createElement('div');
        gameGrid.classList.add('game-board');
        document.querySelector('.main').appendChild(gameGrid);
        for (i = 0; i < 9; i++) {
            gameGrid.appendChild(document.createElement('div'));

            gameGrid.lastChild.dataset.gridCell = i;            
        };
        allGridCells = gameGrid.childNodes;
        allGridCells.forEach((cell) => {
        cell.addEventListener('click', cellClick);
        });
    };

    const switchCurrentPlayer = function () {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        };
    };

    const cellClick = function () {
        const position = parseInt(this.dataset.gridCell);
        if (this.classList.contains('x-selected' )|| this.classList.contains('o-selected')) {
            alert("That space is already slected! Try another move.");
            // look up code for Drum thing on youtube
        } else {
            this.classList.add(`${currentPlayer.symbol}-selected`);
            gameBoard.executeMove(currentPlayer.playerNumber, position);
            checkforWinner(currentPlayer);
            checkForTie();
            switchCurrentPlayer();
        };
    };
    const checkforWinner = function (player) {
        const winLegend = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        const score = gameBoard.currentScore();
        for (i = 0; i < winLegend.length; i++) {
            let winSequence = winLegend[i];
            if (score[winSequence[0]] === player.playerNumber && score[winSequence[1]] === player.playerNumber && score[winSequence[2]] === player.playerNumber) {
                player.playerWin();
                winner = player.playerNumber;
                document.querySelector('.container-cover').style.display = 'block';
                setTimeout(() => { declareWinner(player); }, 700);
                break;
            };
        };
    
    };
    const checkForTie = function () {
        score = gameBoard.currentScore();
        if (score.every(index => index > 0) && winner < 1 ) {
            document.querySelector('.container-cover').style.display = 'block';
            setTimeout(() => { declareTie(); }, 700);
        };
    };

    const declareWinner = function (player) {
        alert(`${player.name} wins the game! Click 'ok' to play again`);
        gameBoard.clearGridArray();
        playGame.newGame();
        document.querySelector('.container-cover').style.display = 'none';
    };

    const declareTie = function () {
        alert(`You tied! Click 'ok' to play again`);
        gameBoard.clearGridArray();
        playGame.newGame();
        document.querySelector('.container-cover').style.display = 'none';
    };
    

    const newGame = function () {
        closeBoard();
        createBoard();
        winner = 0;
    };

    const closeBoard = function () {
        document.querySelector('.main').removeChild(document.querySelector('.game-board'));
        winner = 0;
    };

    return { createBoard, newGame, closeBoard, cellClick, winner};
})();

setupGame.loadScreen();