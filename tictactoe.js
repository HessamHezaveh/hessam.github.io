"use strict";

class TicTacToe {
    constructor() {
        this.resetButton = document.getElementById("reset");
        this.winMessage = document.getElementById("win-message");
        this.canvas = document.getElementById("game-canvas");
        this.context = this.canvas.getContext("2d");
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.lineWidth = 3;
        this.cellLength = (this.canvasWidth - (this.lineWidth * 3)) / 3;
        this.turn = "x";
        this.turnCount = 0;
        this.gameOver = false;
        this.drawBoard();
        this.setupGrid();
        this.canvas.addEventListener("click", function (evt) { this.click(evt); }.bind(this));
        this.resetButton.addEventListener("click", function () { this.reset(); }.bind(this));
    }

    drawBoard() {
        this.context.strokeStyle = "white";

        this.context.beginPath();
        this.context.lineWidth = this.lineWidth;
        this.context.moveTo(this.cellLength, 0);
        this.context.lineTo(this.cellLength, this.canvasHeight);
        this.context.stroke();

        this.context.moveTo(this.cellLength * 2, 0);
        this.context.lineTo(this.cellLength * 2, this.canvasHeight);
        this.context.stroke();

        this.context.moveTo(0, this.cellLength);
        this.context.lineTo(this.canvasWidth, this.cellLength);
        this.context.stroke();

        this.context.moveTo(0, this.cellLength * 2);
        this.context.lineTo(this.canvasWidth, this.cellLength * 2);
        this.context.stroke();
    }

    setupGrid() {
        this.grid = Array(3).fill().map(() => Array(3).fill(null));

        for (let j = 0; j < 3; j++) {
            let y = j * (this.cellLength + this.lineWidth);
            for (let i = 0; i < 3; i++) {
                let x = i * (this.cellLength + this.lineWidth);
                let cell = new Cell(x, y, this.cellLength, this.context);
                this.grid[j][i] = cell;
            }
        }

    }

    getMouseXY(e) {
        let boundingRect = this.canvas.getBoundingClientRect();
        let offsetX = boundingRect.left;
        let offsetY = boundingRect.top;
        let mx = Math.round(e.clientX - offsetX);
        let my = Math.round(e.clientY - offsetY);
        return { x: mx, y: my };
    }

    checkWin(player) {
        for (let i = 0; i < 3; i++) {
            if (this.stringMatchesList(player, [this.grid[i][0].player, this.grid[i][1].player, this.grid[i][2].player])) {
                return true;
            }
            if (this.stringMatchesList(player, [this.grid[0][i].player, this.grid[1][i].player, this.grid[2][i].player])) {
                return true;
            }
        }

        if (this.stringMatchesList(player, [this.grid[0][0].player, this.grid[1][1].player, this.grid[2][2].player])) {
            return true;
        }
        if (this.stringMatchesList(player, [this.grid[0][2].player, this.grid[1][1].player, this.grid[2][0].player])) {
            return true;
        }
        return false;
    }

    stringMatchesList(inputString, stringList) {
        for (let i = 0; i < stringList.length; i++) {
            if (inputString !== stringList[i]) {
                return false;
            }
        }
        return true;
    }

    displayWin(player) {
        if (player == "x") {
            this.winMessage.textContent = "Crosses win!";
        }
        else if (player == "o") {
            this.winMessage.textContent = "Noughts win!";
        }
        else {
            this.winMessage.textContent = "Draw!";
        }
        this.winMessage.style.visibility = "visible";
    }

    click(evt) {
        if (!this.gameOver) {
            let mouseLocation = this.getMouseXY(evt);
            let row = 0;
            let column = 0;
            if (mouseLocation.y >= this.cellLength + this.lineWidth && mouseLocation.y <= this.cellLength * 2 + this.lineWidth) {
                row = 1;
            }
            else if (mouseLocation.y >= this.cellLength * 2 + this.lineWidth * 2 && mouseLocation.y <=
                this.cellLength * 3 + this.lineWidth * 2) {
                row = 2;
            }

            if (mouseLocation.x >= this.cellLength + this.lineWidth && mouseLocation.x <= this.cellLength * 2 + this.lineWidth) {
                column = 1;
            }
            else if (mouseLocation.x >= this.cellLength * 2 + this.lineWidth * 2 && mouseLocation.x <=
                this.cellLength * 3 + this.lineWidth * 2) {
                column = 2;
            }

            let change = this.grid[row][column].press(this.turn);

            if (change) {
                if (this.turn == "x") {
                    if (this.checkWin("x")) {
                        this.gameOver = true;
                        this.displayWin("x");
                    }
                    this.turn = "o";
                }
                else {
                    if (this.checkWin("o")) {
                        this.gameOver = true;
                        this.displayWin("o");
                    }
                    this.turn = "x";
                }
                this.turnCount++;
            }
            if (this.turnCount == 9 && !this.gameOver) {
                this.gameOver = true;
                this.displayWin("d");
            }

        }

    }

    reset() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.winMessage.textContent = "";
        this.drawBoard();
        this.setupGrid();
        this.gameOver = false;
        this.turn = "x";
        this.turnCount = 0;
    }

}

class Cell {
    constructor(x, y, cellLength, context) {
        this.xStart = x;
        this.yStart = y;
        this.cellLength = cellLength;
        this.xEnd = this.xStart + this.cellLength;
        this.yEnd = this.yStart + this.cellLength;
        this.player = "-";
        this.context = context;
        this.playerLineWidth = 6;
    }

    press(turn) {
        if (this.player == "-") {
            if (turn == "x") {
                this.player = "x";
                this.drawCross();
            }
            else {
                this.player = "o";
                this.drawNought();
            }
            return true;
        }
        return false;
    }

    drawCross() {
        let reduction = 20;
        this.context.lineWidth = this.playerLineWidth;
        this.context.strokeStyle = "orange";
        this.context.beginPath();
        this.context.moveTo(this.xStart + reduction, this.yStart + reduction);
        this.context.lineTo(this.xEnd - reduction, this.yEnd - reduction);
        this.context.stroke();

        this.context.beginPath();
        this.context.moveTo(this.xStart + this.cellLength - reduction, this.yStart + reduction);
        this.context.lineTo(this.xEnd - this.cellLength + reduction, this.yEnd - reduction);
        this.context.stroke();
    }

    drawNought() {
        let radius = this.cellLength / 3;
        this.context.lineWidth = this.playerLineWidth;
        this.context.strokeStyle = "lightgreen";
        this.context.beginPath();
        this.context.arc((this.xStart + this.xEnd) / 2, (this.yStart + this.yEnd) / 2,
            radius, 0, 2 * Math.PI);
        this.context.stroke();
    }

}

new TicTacToe();
