$(document).ready(function () {

    var numberOfPlayers = checkMaxPlayers();
    displayPlayers(numberOfPlayers);

    var playerTurn = 1;
    var colours = ['', '#f00', '#00f', '#080', '#ff0'];

    // Player constructor function.
    function Player(name, pieceId, player, currentPosition, startPosition, endPosition) {
        this.name = name;
        this.movesToMake = 0;
        this.piecesOut = 4;
        this.playerNumber = player;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.pieces = [
            {},
            new Piece(pieceId, player, 1, currentPosition),
            new Piece(pieceId, player, 2, currentPosition),
            new Piece(pieceId, player, 3, currentPosition),
            new Piece(pieceId, player, 4, currentPosition)
        ];
    }

    // Piece constructor function.
    function Piece(id, player, piece, currentPosition) {
        this.inPlay = false;
        this.movable = false;
        this.inTheZone = false;
        this.id = id + piece;
        this.player = player;
        this.currentPosition = currentPosition;
        this.originalTop = originalTopSetter(player, piece);
        this.originalLeft = originalLeftSetter(player, piece);
        this.processMove = function (player) {
            switch (player) {
                case 1:
                    processMoveRed(piece);
                    break;
                case 2:
                    processMoveBlue(piece);
                    break;
                case 3:
                    processMoveGreen(piece);
                    break;
                case 4:
                    processMoveYellow(piece);
                    break;
            }
        }
    }

    // Position constructor function.
    function Position(top, left, position) {
        this.top = top + 'px';
        this.left = left + 'px';
        this.player = 0;
        this.position = position;
        this.piecesOnThisPosition = 0;
    }

    function originalTopSetter(player, piece) {
        switch (player) {
            case 1:
            case 2:
                switch (piece) {
                    case 1:
                    case 2:
                        return '50px';
                    case 3:
                    case 4:
                        return '130px';
                }
            case 3:
            case 4:
                switch (piece) {
                    case 1:
                    case 2:
                        return '610px';
                    case 3:
                    case 4:
                        return '690px';
                }
        }
    }

    function originalLeftSetter(player, piece) {
        switch (player) {
            case 1:
            case 4:
                switch (piece) {
                    case 1:
                    case 3:
                        return '40px';
                    case 2:
                    case 4:
                        return '120px';
                }
            case 2:
            case 3:
                switch (piece) {
                    case 1:
                    case 3:
                        return '620px';
                    case 2:
                    case 4:
                        return '700px';
                }
        }
    }

    // Players initialization.
    var redPlayer = new Player('Red', 'red_piece_', 1, '', 0, 39);
    var bluePlayer = new Player('Blue', 'blue_piece_', 2, '', 10, 9);
    var greenPlayer = new Player('Green', 'green_piece_', 3, '', 20, 19);
    var yellowPlayer = new Player('Yellow', 'yellow_piece_', 4, '', 30, 29);

    // Board positions.
    var positions = [
        new Position(295, 10, 0),
        new Position(295, 80, 1),
        new Position(295, 150, 2),
        new Position(295, 220, 3),
        new Position(295, 290, 4),
        new Position(220, 290, 5),
        new Position(150, 290, 6),
        new Position(80, 290, 7),
        new Position(10, 290, 8),
        new Position(10, 367, 9),
        new Position(10, 445, 10),
        new Position(80, 445, 11),
        new Position(150, 445, 12),
        new Position(220, 445, 13),
        new Position(295, 445, 14),
        new Position(295, 515, 15),
        new Position(295, 585, 16),
        new Position(295, 655, 17),
        new Position(295, 730, 18),
        new Position(370, 730, 19),
        new Position(448, 730, 20),
        new Position(448, 655, 21),
        new Position(448, 585, 22),
        new Position(448, 515, 23),
        new Position(448, 445, 24),
        new Position(520, 445, 25),
        new Position(590, 445, 26),
        new Position(660, 445, 27),
        new Position(730, 445, 28),
        new Position(730, 367, 29),
        new Position(730, 290, 30),
        new Position(660, 290, 31),
        new Position(590, 290, 32),
        new Position(520, 290, 33),
        new Position(448, 290, 34),
        new Position(448, 220, 35),
        new Position(448, 150, 36),
        new Position(448, 80, 37),
        new Position(448, 10, 38),
        new Position(370, 10, 39),
        new Position(370, 80, 40),
        new Position(370, 150, 41),
        new Position(370, 220, 42),
        new Position(370, 290, 43), {}, {}, {}, {}, {}, {},
        new Position(80, 367, 50),
        new Position(150, 367, 51),
        new Position(220, 367, 52),
        new Position(295, 367, 53), {}, {}, {}, {}, {}, {},
        new Position(370, 655, 60),
        new Position(370, 585, 61),
        new Position(370, 515, 62),
        new Position(370, 445, 63), {}, {}, {}, {}, {}, {},
        new Position(660, 367, 70),
        new Position(590, 367, 71),
        new Position(520, 367, 72),
        new Position(448, 367, 73)];

    var diceSides = [
        { source: 'images/dice-0.png' },
        { source: 'images/dice-1.png' },
        { source: 'images/dice-2.png' },
        { source: 'images/dice-3.png' },
        { source: 'images/dice-4.png' },
        { source: 'images/dice-5.png' },
        { source: 'images/dice-6.png' }];

    $('#red-player-dice').on('click', redPlayerDiceClick); 

    function redPlayerDiceClick() {
        var self = $(this);
        var side = getDiceSide();
        redPlayer.movesToMake = side;
        self.attr('src', diceSides[side].source);
        self.off('click');
        self.removeClass('active');
        redPlayerMakeMove();
    } // End red-player-dice click.

    $('#blue-player-dice').on('click', bluePlayerDiceClick);

    function bluePlayerDiceClick () {
        var self = $(this);
        var side = getDiceSide();
        bluePlayer.movesToMake = side;
        self.attr('src', diceSides[side].source);
        self.off('click');
        self.removeClass('active');
        bluePlayerMakeMove();
    } // End blue-player-dice click.

    $('#green-player-dice').on('click', greenPlayerDiceClick);  

    function greenPlayerDiceClick () {
        var self = $(this);
        var side = getDiceSide();
        greenPlayer.movesToMake = side;
        self.attr('src', diceSides[side].source);
        self.off('click');
        self.removeClass('active');
        greenPlayerMakeMove();
    } // End green-player-dice click.

    $('#yellow-player-dice').on('click', yellowPlayerDiceClick); 

    function yellowPlayerDiceClick () {
        var self = $(this);
        var side = getDiceSide();
        yellowPlayer.movesToMake = side;
        self.attr('src', diceSides[side].source);
        self.off('click');
        self.removeClass('active');
        yellowPlayerMakeMove();
    } // End yellow-player-dice click.

    $('#finish').on('click', function () {
        var self = $(this);
        playerTurn = getNextPlayer();
        switchToNextPlayer(playerTurn);
        $('#current-player-color').css('background-color', colours[playerTurn]);
        self.hide()
    }); // End finish button click.

    function selectPlayerDiceClick(playerNumber) {
        switch (playerNumber) {
            case 1:
                return redPlayerDiceClick;
            case 2:
                return bluePlayerDiceClick;
            case 3:
                return greenPlayerDiceClick;
            case 4:
                return yellowPlayerDiceClick;
        }
    }

    function processMoveRed(piece) {
        var self = $('#' + redPlayer.pieces[piece].id);
        var redPlayerDice = '#red-player-dice';

        if (redPlayer.pieces[piece].inPlay === false && redPlayer.pieces[piece].movable === true) {

            processInitialMove(redPlayer, piece, redPlayer.startPosition, self, redPlayerDice);
            return;

        } else if (redPlayer.pieces[piece].inPlay === false && redPlayer.pieces[piece].movable === false) {
            return;
        } else if (redPlayer.pieces[piece].inPlay === true && redPlayer.pieces[piece].movable === true) {
            var futurePositionRed = redPlayer.pieces[piece].currentPosition + redPlayer.movesToMake;

            if (futurePositionRed > 43) {
                self.removeClass('active');
                $('#pop-up-message').text('Invalid move!').show().fadeOut(1500);
                $('#finish').show();
                redPlayer.pieces[piece].movable = false;
                return;

            }

            var isPossibleMoveRed = checkMovesInTheZone(redPlayer, piece, redPlayerDice, futurePositionRed, 39, self);

            if (isPossibleMoveRed === false) {
                return;
            }

            updatePositionsData(redPlayer, piece, futurePositionRed);

            inTheZoneSetter(redPlayer, piece, 40, 41, 42, 43);

            updatePiecePositionOnBoard(redPlayer, piece, self);

            inPlaySetter(redPlayer, piece, 40, 41, 42, 43);
        }

        var isWinRedOne = checkForWin(redPlayer);
        if (isWinRedOne === true) {
            return;
        }

        proceedWithNextMove(redPlayer, redPlayerDice, redPlayerDiceClick);
    }

    function processMoveBlue(piece) {
        var self = $('#' + bluePlayer.pieces[piece].id);
        var bluePlayerDice = '#blue-player-dice';

        if (bluePlayer.pieces[piece].inPlay === false && bluePlayer.pieces[piece].movable === true) {

            processInitialMove(bluePlayer, piece, bluePlayer.startPosition, self, bluePlayerDice);
            return;

        } else if (bluePlayer.pieces[piece].inPlay === false && bluePlayer.pieces[piece].movable === false) {
            return;
        } else if (bluePlayer.pieces[piece].inPlay === true && bluePlayer.pieces[piece].movable === true) {
            var futurePositionBlue = bluePlayer.pieces[piece].currentPosition + bluePlayer.movesToMake;

            var tempPositionBlue = resolveOverlapAndGameEnd(bluePlayer, piece, futurePositionBlue, 50, 53, self);

            if (tempPositionBlue === false) {
                return;
            }

            futurePositionBlue = tempPositionBlue === undefined ? futurePositionBlue : tempPositionBlue;

            var isPosibbleMoveBlue = checkMovesInTheZone(bluePlayer, piece, bluePlayerDice, futurePositionBlue, 49, self);

            if (isPosibbleMoveBlue === false) {
                return;
            }

            updatePositionsData(bluePlayer, piece, futurePositionBlue);

            inTheZoneSetter(bluePlayer, piece, 50, 51, 52, 53);

            updatePiecePositionOnBoard(bluePlayer, piece, self);

            inPlaySetter(bluePlayer, piece, 50, 51, 52, 53);
        }

        var isWinBlueOne = checkForWin(bluePlayer);
        if (isWinBlueOne === true) {
            return;
        }

        proceedWithNextMove(bluePlayer, bluePlayerDice, bluePlayerDiceClick);
    }

    function processMoveGreen(piece) {
        var self = $('#' + greenPlayer.pieces[piece].id);
        var greenPlayerDice = '#green-player-dice';

        if (greenPlayer.pieces[piece].inPlay === false && greenPlayer.pieces[piece].movable === true) {
            
            processInitialMove(greenPlayer, piece, greenPlayer.startPosition, self, greenPlayerDice);
            return;

        } else if (greenPlayer.pieces[piece].inPlay === false && greenPlayer.pieces[piece].movable === false) {
            return;
        } else if (greenPlayer.pieces[piece].inPlay === true && greenPlayer.pieces[piece].movable === true) {
            var futurePositionGreen = greenPlayer.pieces[piece].currentPosition + greenPlayer.movesToMake;

            var tempPositionGreen = resolveOverlapAndGameEnd(greenPlayer, piece, futurePositionGreen, 60, 63, self);

            if (tempPositionGreen === false) {
                return;
            }

            futurePositionGreen = tempPositionGreen === undefined ? futurePositionGreen : tempPositionGreen;

            var isPossibleMoveGreen = checkMovesInTheZone(greenPlayer, piece, greenPlayerDice, futurePositionGreen, 59, self);

            if (isPossibleMoveGreen === false) {
                return;
            }

            updatePositionsData(greenPlayer, piece, futurePositionGreen);

            inTheZoneSetter(greenPlayer, piece, 60, 61, 62, 63);

            updatePiecePositionOnBoard(greenPlayer, piece, self);

            inPlaySetter(greenPlayer, piece, 60, 61, 62, 63);
        }

        var isWinGreenOne = checkForWin(greenPlayer);
        if (isWinGreenOne === true) {
            return;
        }

        proceedWithNextMove(greenPlayer, greenPlayerDice, greenPlayerDiceClick);
    }

    function processMoveYellow(piece) {
        var self = $('#' + yellowPlayer.pieces[piece].id);
        var yellowPlayerDice = '#yellow-player-dice';

        if (yellowPlayer.pieces[piece].inPlay === false && yellowPlayer.pieces[piece].movable === true) {
            
            processInitialMove(yellowPlayer, piece, yellowPlayer.startPosition, self, yellowPlayerDice);
            return;

        } else if (yellowPlayer.pieces[piece].inPlay === false && yellowPlayer.pieces[piece].movable === false) {
            return;
        } else if (yellowPlayer.pieces[piece].inPlay === true && yellowPlayer.pieces[piece].movable === true) {
            var futurePositionYellow = yellowPlayer.pieces[piece].currentPosition + yellowPlayer.movesToMake;

            var tempPositionYellow = resolveOverlapAndGameEnd(yellowPlayer, piece, futurePositionYellow, 70, 73, self);

            if (tempPositionYellow === false) {
                return;
            }

            futurePositionYellow = tempPositionYellow === undefined ? futurePositionYellow : tempPositionYellow;

            var isPossibleMoveYellow = checkMovesInTheZone(yellowPlayer, piece, yellowPlayerDice, futurePositionYellow, 69, self);

            if (isPossibleMoveYellow === false) {
                return;
            }

            updatePositionsData(yellowPlayer, piece, futurePositionYellow);

            inTheZoneSetter(yellowPlayer, piece, 70, 71, 72, 73);

            updatePiecePositionOnBoard(yellowPlayer, piece, self);

            inPlaySetter(yellowPlayer, piece, 70, 71, 72, 73);
        }

        var isWinYellowOne = checkForWin(yellowPlayer);
        if (isWinYellowOne === true) {
            return;
        }
        proceedWithNextMove(yellowPlayer, yellowPlayerDice, yellowPlayerDiceClick);
    }

    function processInitialMove(player, piece, position, self, playerDice) {

        self.css('margin-top', positions[position].top).css('margin-left', positions[position].left);
        $('#pop-up-message').text('Roll the dice again!').show().fadeOut(2000);
        $(playerDice).css('display', 'inline').on('click', selectPlayerDiceClick(player.playerNumber)).addClass('active');
        player.piecesOut--;
        positions[position].piecesOnThisPosition++;
        if (positions[position].piecesOnThisPosition > 1) {
            $('#div_position_' + position).text(positions[position].piecesOnThisPosition).show();
        }
        player.pieces[piece].inPlay = true;
        player.pieces[piece].currentPosition = positions[position].position;
        if (positions[position].player === 0 || positions[position].player === player.playerNumber) {
            positions[position].player = player.pieces[piece].player;
        } else {
            pushAllPiecesOut(positions[position].player, position);
            positions[position].player = player.pieces[piece].player;
            positions[position].piecesOnThisPosition = 1;
            updateNumberOfPieces(player, piece);
        }

        removeMovable(player);
        removeActive(player);
    }

    function resolveOverlapAndGameEnd(player, piece, playerFuturePosition, startPositionInTheZone, endPositionInTheZone, self) {
        if (playerFuturePosition > 39 && player.pieces[piece].currentPosition < startPositionInTheZone) {
            playerFuturePosition = playerFuturePosition % 10;
            return playerFuturePosition;
        } else if (player.pieces[piece].currentPosition < player.startPosition && playerFuturePosition > player.endPosition) {
            if (playerFuturePosition > player.startPosition + 3) {
                $('#pop-up-message').text('Invalid move!').show().fadeOut(1500);
                self.removeClass('active');
                player.pieces[piece].movable = false;
                $('#finish').show();
                return false;
            } else {
                playerFuturePosition = startPositionInTheZone + (playerFuturePosition % 10);
                return playerFuturePosition;
            }
        } else if (playerFuturePosition > endPositionInTheZone) {
            $('#pop-up-message').text('Invalid move!').show().fadeOut(1500);
            self.removeClass('active');
            player.pieces[piece].movable = false;
            $('#finish').show();
            return false;
        }
    }

    function inPlaySetter(player, piece, positionOne, positionTwo, positionThree, positionFour) {
        if (player.pieces[piece].currentPosition === positionFour) {
            player.pieces[piece].inPlay = false;
        } else if (positions[positionFour].player === player.playerNumber && player.pieces[piece].currentPosition === positionThree) {
            player.pieces[piece].inPlay = false;
        } else if (positions[positionThree].player === player.playerNumber && player.pieces[piece].currentPosition === positionTwo) {
            player.pieces[piece].inPlay = false;
        } else if (positions[positionTwo].player === player.playerNumber && player.pieces[piece].currentPosition === positionOne) {
            player.pieces[piece].inPlay = false;
        }

        removeActive(player);
    }

    function inTheZoneSetter(player, piece, positionOne, positionTwo, positionThree, positionFour) {

        if (player.pieces[piece].currentPosition === positionFour || player.pieces[piece].currentPosition === positionThree ||
                    player.pieces[piece].currentPosition === positionTwo || player.pieces[piece].currentPosition === positionOne) {
            player.pieces[piece].inTheZone = true;
        }
    }

    function resolvePiecesCollision(player, piece) {
        if (positions[player.pieces[piece].currentPosition].player === 0 || positions[player.pieces[piece].currentPosition].player === player.playerNumber) {
            positions[player.pieces[piece].currentPosition].player = player.pieces[piece].player;
        } else {
            pushAllPiecesOut(positions[player.pieces[piece].currentPosition].player, player.pieces[piece].currentPosition);
            positions[player.pieces[piece].currentPosition].player = player.pieces[piece].player;
            positions[player.pieces[piece].currentPosition].piecesOnThisPosition = 1;
            updateNumberOfPieces(player, piece);
        }

        removeMovable(player);
    }

    function checkMovesInTheZone(player, piece, playerDice, playerFuturePosition, positionToCheck, self) {
        if (positions[playerFuturePosition].player === player.playerNumber && playerFuturePosition > positionToCheck) {

            if (player.movesToMake === 6) {
                $('#pop-up-message').text('Invalid move! Roll!').show().fadeOut(1500);
                $(playerDice).css('display', 'inline').on('click', selectPlayerDiceClick(player.playerNumber)).addClass('active');
                self.removeClass('active');
                player.pieces[piece].movable = false;
                return false;
            }

            $('#pop-up-message').text('Invalid move!').show().fadeOut(1500);
            self.removeClass('active');
            player.pieces[piece].movable = false;
            $('#finish').show();
            return false;
        }
    }

    function updatePositionsData(player, piece, futurePositionPlayer) {
        if (positions[player.pieces[piece].currentPosition].piecesOnThisPosition === 1) {
            positions[player.pieces[piece].currentPosition].player = 0;
        }

        positions[player.pieces[piece].currentPosition].piecesOnThisPosition--;
        updateNumberOfPieces(player, piece);

        player.pieces[piece].currentPosition = futurePositionPlayer;
        positions[player.pieces[piece].currentPosition].piecesOnThisPosition++;
        updateNumberOfPieces(player, piece);
    }

    function updatePiecePositionOnBoard(player, piece, self) {
        self.css('margin-top', positions[player.pieces[piece].currentPosition].top)
                    .css('margin-left', positions[player.pieces[piece].currentPosition].left);

        resolvePiecesCollision(player, piece);
    }

    $('#red_piece_1').on('click', function () {
        redPlayer.pieces[1].processMove(1);
    }); // End red_piece_1 click.

    $('#red_piece_2').on('click', function () {
        redPlayer.pieces[2].processMove(1);
    }); // End red_piece_2 click.

    $('#red_piece_3').on('click', function () {
        redPlayer.pieces[3].processMove(1);
    }); // End red_piece_3 click.

    $('#red_piece_4').on('click', function () {
        redPlayer.pieces[4].processMove(1);
    }); // End red_piece_4 click.

    $('#blue_piece_1').on('click', function () {
        bluePlayer.pieces[1].processMove(2);
    }); // End blue_piece_1 click.

    $('#blue_piece_2').on('click', function () {
        bluePlayer.pieces[2].processMove(2);
    }); // End blue_piece_2 click.

    $('#blue_piece_3').on('click', function () {
        bluePlayer.pieces[3].processMove(2);
    }); // End blue_piece_3 click.

    $('#blue_piece_4').on('click', function () {
        bluePlayer.pieces[4].processMove(2);
    }); // End blue_piece_4 click.

    $('#green_piece_1').on('click', function () {
        greenPlayer.pieces[1].processMove(3);
    }); // End green_piece_1 click.

    $('#green_piece_2').on('click', function () {
        greenPlayer.pieces[2].processMove(3);
    }); // End green_piece_2 click.

    $('#green_piece_3').on('click', function () {
        greenPlayer.pieces[3].processMove(3);
    }); // End green_piece_3 click.

    $('#green_piece_4').on('click', function () {
        greenPlayer.pieces[4].processMove(3);
    }); // End green_piece_4 click.

    $('#yellow_piece_1').on('click', function () {
        yellowPlayer.pieces[1].processMove(4);
    }); // End yellow_piece_1 click.

    $('#yellow_piece_2').on('click', function () {
        yellowPlayer.pieces[2].processMove(4);
    }); // End yellow_piece_2 click.

    $('#yellow_piece_3').on('click', function () {
        yellowPlayer.pieces[3].processMove(4);
    }); // End yellow_piece_3 click.

    $('#yellow_piece_4').on('click', function () {
        yellowPlayer.pieces[4].processMove(4);
    }); // End yellow_piece_4 click.

    function redPlayerMakeMove() {

        if (redPlayer.piecesOut === 4 && redPlayer.movesToMake !== 6) {
            $('#pop-up-message').text('Click finish!').show().fadeOut(2000);
            $('#finish').show();
            return;
        } else if (redPlayer.movesToMake === 6) {
            for (var i = 1; i < redPlayer.pieces.length; i+=1) {
                if (redPlayer.pieces[i].inTheZone === false) {
                    redPlayer.pieces[i].movable = true;
                    $('#red_piece_' + i).addClass('active');
                }
            }
        } else if (redPlayer.piecesOut < 4 && redPlayer.movesToMake !== 6) {
            var redsInPlayCounter = 0;
            for (var i = 1; i < redPlayer.pieces.length; i+=1) {
                if (redPlayer.pieces[i].inPlay === true) {
                    redPlayer.pieces[i].movable = true;
                    $('#red_piece_' + i).addClass('active');
                    redsInPlayCounter++;
                }
            }

            if (redsInPlayCounter === 0) {
                $('#pop-up-message').text('Click finish!').show().fadeOut(2000);
                $('#finish').show();
            }

            redsInPlayCounter = 0;
        }
    }

    function bluePlayerMakeMove() {
        if (bluePlayer.piecesOut === 4 && bluePlayer.movesToMake !== 6) {
            $('#pop-up-message').text('Click finish!').show().fadeOut(2000);
            $('#finish').show();
            return;
        } else if (bluePlayer.movesToMake === 6) {
            for (var i = 1; i < bluePlayer.pieces.length; i += 1) {
                if (bluePlayer.pieces[i].inTheZone === false) {
                    bluePlayer.pieces[i].movable = true;
                    $('#blue_piece_' + i).addClass('active');
                }
            }
        } else if (bluePlayer.piecesOut < 4 && bluePlayer.movesToMake !== 6) {
            var bluesInPlayCounter = 0;
            for (var i = 1; i < bluePlayer.pieces.length; i += 1) {
                if (bluePlayer.pieces[i].inPlay === true) {
                    bluePlayer.pieces[i].movable = true;
                    $('#blue_piece_' + i).addClass('active');
                    bluesInPlayCounter++;
                }
            }

            if (bluesInPlayCounter === 0) {
                $('#pop-up-message').text('Click finish!').show().fadeOut(2000);
                $('#finish').show();
            }

            bluesInPlayCounter = 0;
        }
    }

    function greenPlayerMakeMove() {
        if (greenPlayer.piecesOut === 4 && greenPlayer.movesToMake !== 6) {
            $('#pop-up-message').text('Click finish!').show().fadeOut(2000);
            $('#finish').show();
            return;
        } else if (greenPlayer.movesToMake === 6) {
            for (var i = 1; i < greenPlayer.pieces.length; i += 1) {
                if (greenPlayer.pieces[i].inTheZone === false) {
                    greenPlayer.pieces[i].movable = true;
                    $('#green_piece_' + i).addClass('active');
                }
            }
        } else if (greenPlayer.piecesOut < 4 && greenPlayer.movesToMake !== 6) {
            var greensInPlayCounter = 0;
            for (var i = 1; i < greenPlayer.pieces.length; i += 1) {
                if (greenPlayer.pieces[i].inPlay === true) {
                    greenPlayer.pieces[i].movable = true;
                    $('#green_piece_' + i).addClass('active');
                    greensInPlayCounter++;
                }
            }

            if (greensInPlayCounter === 0) {
                $('#pop-up-message').text('Click finish!').show().fadeOut(2000);
                $('#finish').show();
            }

            greensInPlayCounter = 0;
        }
    }

    function yellowPlayerMakeMove() {
        if (yellowPlayer.piecesOut === 4 && yellowPlayer.movesToMake !== 6) {
            $('#pop-up-message').text('Click finish!').show().fadeOut(2000);
            $('#finish').show();
            return;
        } else if (yellowPlayer.movesToMake === 6) {
            for (var i = 1; i < yellowPlayer.pieces.length; i += 1) {
                if (yellowPlayer.pieces[i].inTheZone === false) {
                    yellowPlayer.pieces[i].movable = true;
                    $('#yellow_piece_' + i).addClass('active');
                }
            }
        } else if (yellowPlayer.piecesOut < 4 && yellowPlayer.movesToMake !== 6) {
            var yellowsInPlayCounter = 0;
            for (var i = 1; i < yellowPlayer.pieces.length; i += 1) {
                if (yellowPlayer.pieces[i].inPlay === true) {
                    yellowPlayer.pieces[i].movable = true;
                    $('#yellow_piece_' + i).addClass('active');
                    yellowsInPlayCounter++;
                }
            }

            if (yellowsInPlayCounter === 0) {
                $('#pop-up-message').text('Click finish!').show().fadeOut(2000);
                $('#finish').show();
            }

            yellowsInPlayCounter = 0;
        }
    }

    function pushAllPiecesOut(playerOnPosition, position){
        if (playerOnPosition === 1) {
            for (var i = 1; i < redPlayer.pieces.length; i++) {
                if (redPlayer.pieces[i].currentPosition === position) {
                    $('#red_piece_' + i).css('margin-top', redPlayer.pieces[i].originalTop)
                                        .css('margin-left', redPlayer.pieces[i].originalLeft);
                    redPlayer.pieces[i].currentPosition = '';
                    redPlayer.pieces[i].inPlay = false;
                    redPlayer.pieces[i].movable = false;
                    redPlayer.pieces[i].inTheZone = false;
                    redPlayer.piecesOut++;
                }
            }
        } else if (playerOnPosition === 2) {
            for (var j = 1; j < bluePlayer.pieces.length; j++) {
                if (bluePlayer.pieces[j].currentPosition === position) {
                    $('#blue_piece_' + j).css('margin-top', bluePlayer.pieces[j].originalTop)
                                         .css('margin-left', bluePlayer.pieces[j].originalLeft);
                    bluePlayer.pieces[j].currentPosition = '';
                    bluePlayer.pieces[j].inPlay = false;
                    bluePlayer.pieces[j].movable = false;
                    bluePlayer.pieces[j].inTheZone = false;
                    bluePlayer.piecesOut++;
                }
            }
        } else if (playerOnPosition === 3) {
            for (var k = 1; k < greenPlayer.pieces.length; k++) {
                if (greenPlayer.pieces[k].currentPosition === position) {
                    $('#green_piece_' + k).css('margin-top', greenPlayer.pieces[k].originalTop)
                                         .css('margin-left', greenPlayer.pieces[k].originalLeft);
                    greenPlayer.pieces[k].currentPosition = '';
                    greenPlayer.pieces[k].inPlay = false;
                    greenPlayer.pieces[k].movable = false;
                    greenPlayer.pieces[k].inTheZone = false;
                    greenPlayer.piecesOut++;
                }
            }
        } else if (playerOnPosition === 4) {
            for (var m = 1; m < yellowPlayer.pieces.length; m++) {
                if (yellowPlayer.pieces[m].currentPosition === position) {
                    $('#yellow_piece_' + m).css('margin-top', yellowPlayer.pieces[m].originalTop)
                                           .css('margin-left', yellowPlayer.pieces[m].originalLeft);
                    yellowPlayer.pieces[m].currentPosition = '';
                    yellowPlayer.pieces[m].inPlay = false;
                    yellowPlayer.pieces[m].movable = false;
                    yellowPlayer.pieces[m].inTheZone = false;
                    yellowPlayer.piecesOut++;
                }
            }
        }
    }

    function updateNumberOfPieces(player, piece) {
        if (positions[player.pieces[piece].currentPosition].piecesOnThisPosition > 1) {
            $('#div_position_' + player.pieces[piece].currentPosition).text(positions[player.pieces[piece].currentPosition].piecesOnThisPosition).show();
        } else {
            $('#div_position_' + player.pieces[piece].currentPosition).hide();
        }
    }

    function proceedWithNextMove(player, diceID, diceEvent) {

        if (player.movesToMake === 6) {
            $('#pop-up-message').text('Roll the dice again!').show().fadeOut(2000);
            $(diceID).css('display', 'inline').on('click', diceEvent).addClass('active');
        } else {
            $('#pop-up-message').text('Click finish!').show().fadeOut(2500);
            $('#finish').show();
        }
    }

    function checkForWin(player) {
        var inTheZoneCounter = 0;

        for (var i = 1; i < player.pieces.length; i++) {
            if (player.pieces[i].inTheZone === true) {
                inTheZoneCounter++;
            }
        }

        if (inTheZoneCounter === 4) {
            $('#pop-up-message').text(player.name + ' player wins!').show().fadeOut(3500);
            return true;
        }

        return false;
    }

    function removeActive(player) {
        for (var i = 1; i < player.pieces.length; i++) {
            $('#' + player.pieces[i].id).removeClass('active');
        }
    }

    function removeMovable(player) {
        for (var i = 1; i < player.pieces.length; i++) {
            player.pieces[i].movable = false;
        }
    }

    function getCurrentPlayerMovesToMake() {
        switch (playerTurn) {
            case 1: return redPlayer.movesToMake;
            case 2: return bluePlayer.movesToMake;
            case 3: return greenPlayer.movesToMake;
            case 4: return yellowPlayer.movesToMake;
        }
    }

    function switchToNextPlayer(playerTurn) {
        if (playerTurn === 1) {
            $('#yellow-player-dice').fadeOut(1000);
            $('#blue-player-dice').fadeOut(1000);
            $('#green-player-dice').fadeOut(1000);
            $('#red-player-dice').css('display', 'inline').attr('src', diceSides[0].source).on('click', redPlayerDiceClick).addClass('active');
        }
        else if (playerTurn === 2) {
            $('#red-player-dice').fadeOut(1000);
            $('#yellow-player-dice').fadeOut(1000);
            $('#green-player-dice').fadeOut(1000);
            $('#blue-player-dice').css('display', 'inline').attr('src', diceSides[0].source).on('click', bluePlayerDiceClick).addClass('active');
        }
        else if (playerTurn === 3) {
            $('#blue-player-dice').fadeOut(1000);
            $('#red-player-dice').fadeOut(1000);
            $('#yellow-player-dice').fadeOut(1000);
            $('#green-player-dice').css('display', 'inline').attr('src', diceSides[0].source).on('click', greenPlayerDiceClick).addClass('active');
        }
        else if (playerTurn === 4) {
            $('#green-player-dice').fadeOut(1000);
            $('#blue-player-dice').fadeOut(1000);
            $('#red-player-dice').fadeOut(1000);
            $('#yellow-player-dice').css('display', 'inline').attr('src', diceSides[0].source).on('click', yellowPlayerDiceClick).addClass('active');
        }
    }

    function getNextPlayer() {
        playerTurn++;
        if (playerTurn > numberOfPlayers) {
            playerTurn = 1;
        }

        return playerTurn;
    }

    function getDiceSide() {
        var r = Math.floor((Math.random() * 6) + 1);

        return r;
    }

    function checkMaxPlayers() {
        var players = prompt('How many players will play?', '');

        while (isNaN(players) || players < 2 || players > 4) {
            players = prompt('How many players will play?', '');
        }

        return players;
    }

    function displayPlayers(numberOfPlayers) {
        switch (numberOfPlayers) {
            case '2':
                hideYellowPlayer();
                hideGreenPlayer();
                break;
            case '3':
                hideYellowPlayer();
                break;
        }
    }

    function hideYellowPlayer() {
        $('#yellow_piece_1').hide();
        $('#yellow_piece_2').hide();
        $('#yellow_piece_3').hide();
        $('#yellow_piece_4').hide();
    }

    function hideGreenPlayer() {
        $('#green_piece_1').hide();
        $('#green_piece_2').hide();
        $('#green_piece_3').hide();
        $('#green_piece_4').hide();
    }
}); // End ready.