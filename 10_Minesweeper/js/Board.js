class Board {

    _grid = [];

    constructor({ width, height, numberOfBombs, gameHTML, gameManager, score }) {
        if (Number.isInteger(width) && Number.isInteger(height) && Number.isInteger(numberOfBombs)) {
            if (width >= 0 && height >= 0 && numberOfBombs > 0 && numberOfBombs < width * height - 1) {
                this._width = width;
                this._height = height;
                this._numberOfBombs = numberOfBombs;
                this._boardHTML = gameHTML.querySelector('.board');
                this._gameManager = gameManager;
                this._score = score;
                this.generateBlankGrid();
                this.generateBombs();
                this.calculateGrid();
            } else {
                throw RangeError(`La classe Board nécessite des dimensions width, height positives et une valeur numberOfBombs positive, non nulle et inférieure aux nombres de cases - 1 (width * height -1).
                Initiation : new Board({width: integer, height: integer, numberOfBombs: integer})`);
            }
        } else {
            throw new TypeError(`La classe Board nécessite des entiers.
            Initiation : new Board({width: integer, height: integer, numberOfBombs: integer})`);
        }
    }

    reset() {
        this._grid = [];

        this.generateBlankGrid();
        this.generateBombs();
        this.calculateGrid();
        this.display();

        console.log(this._grid);
    }

    generateBlankGrid() {
        for (let i = 0; i < this._width; i++) {
            this._grid.push([]);
            for (let j = 0; j < this._height; j++) {
                try {
                    let tile = new Tile({ x: i, y: j, value: 0 });
                    this._grid[i].push(tile);
                } catch (error) {
                    console.error(error);
                    return new Error('Impossible de créer des cases (objet Tile).');
                }

            }
        }
    }

    generateBombs() {
        let availablesPosition = [];
        let bombsLeftToPlace = this._numberOfBombs;

        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                availablesPosition.push({ x: i, y: j });
            }
        }

        while (bombsLeftToPlace > 0) {
            let randomNumber = Math.floor(Math.random() * availablesPosition.length);
            let randomPosition = availablesPosition[randomNumber];
            let x = randomPosition.x;
            let y = randomPosition.y;
            this._grid[x][y].setIsBomb(true);
            availablesPosition.splice(randomNumber, 1);
            bombsLeftToPlace--;
        }
    }

    calculateGrid() {
        this._grid.forEach((column, columnIndex) => {
            column.forEach((tile, rowIndex) => {
                tile.addEventsListener(this);

                if (!tile.isBomb) {
                    let count = 0;
                    // 0 * *
                    // * T *
                    // * * *
                    if (columnIndex > 0 && rowIndex > 0) {
                        count = this._grid[columnIndex - 1][rowIndex - 1].isBomb ? count + 1 : count;
                    }
                    // * 0 *
                    // * T *
                    // * * *
                    if (rowIndex > 0) {
                        count = this._grid[columnIndex][rowIndex - 1].isBomb ? count + 1 : count;
                    }
                    // * * 0
                    // * T *
                    // * * *
                    if (columnIndex < this._width - 1 && rowIndex > 0) {
                        count = this._grid[columnIndex + 1][rowIndex - 1].isBomb ? count + 1 : count;
                    }

                    // * * *
                    // 0 T *
                    // * * *
                    if (columnIndex > 0) {
                        count = this._grid[columnIndex - 1][rowIndex].isBomb ? count + 1 : count;
                    }

                    // * * *
                    // * T 0
                    // * * *
                    if (columnIndex < this._width - 1) {
                        count = this._grid[columnIndex + 1][rowIndex].isBomb ? count + 1 : count;
                    }

                    // * * *
                    // * T *
                    // 0 * *
                    if (columnIndex > 0 && rowIndex < this._height - 1) {
                        count = this._grid[columnIndex - 1][rowIndex + 1].isBomb ? count + 1 : count;
                    }


                    // * * *
                    // * T *
                    // * 0 *
                    if (rowIndex < this._height - 1) {
                        count = this._grid[columnIndex][rowIndex + 1].isBomb ? count + 1 : count;
                    }

                    // * * *
                    // * T *
                    // * * 0
                    if (columnIndex < this._width - 1 && rowIndex < this._height - 1) {
                        count = this._grid[columnIndex + 1][rowIndex + 1].isBomb ? count + 1 : count;
                    }

                    tile.setValue(count);
                }
            });
        });
    }

    propagateRevelation({ x, y }) {
        let tile = this._grid[x][y];
        if (Number.isInteger(x) && Number.isInteger(y)) {
            if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
                tile.setIsReveal(true);
                tile.setIsChecked(true);

                // * * *
                // * 0 *
                // * * *
                if (tile.value !== 0) {
                    return;
                }

                // * 0 *
                // * T *
                // * * *
                if (y > 0 && !this._grid[x][y - 1].isChecked) {
                    this.propagateRevelation({ x: x, y: y - 1 });
                }

                // * * *
                // 0 T *
                // * * *
                if (x > 0 && !this._grid[x - 1][y].isChecked) {
                    this.propagateRevelation({ x: x - 1, y: y });
                }

                // * * *
                // * T 0
                // * * *
                if (x < this._width - 1 && !this._grid[x + 1][y].isChecked) {
                    this.propagateRevelation({ x: x + 1, y: y });
                }

                // * * *
                // * T *
                // * 0 *
                if (y < this._height - 1 && !this._grid[x][y + 1].isChecked) {
                    this.propagateRevelation({ x: x, y: y + 1 });
                }

            } else {
                throw RangeError(`La fonction propagateRevelation nécessite des coordonnées positives et inférieures aux dimensions de la grille.
                propagateRevelation({x, y})`);
            }
        } else {
            throw new TypeError(`La fonction propagateRevelation nécessite des entiers pour coordonnées.
            play({x, y})`);
        }
    }

    display() {
        this.clearHTML();
        this._grid.forEach((column) => {
            let columnHTML = document.createElement('div');
            columnHTML.classList.add('column');

            column.forEach((tile, rowIndex) => {
                tile.display(columnHTML);
            });

            this._boardHTML.appendChild(columnHTML);
        });
    }

    clearChecking() {
        this._grid.forEach((column) => {
            column.forEach((tile, rowIndex) => {
                tile.setIsChecked(false);
            });
        });
    }

    play({ x, y }) {
        if (Number.isInteger(x) && Number.isInteger(y)) {
            if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
                let tile = this._grid[x][y];

                if (tile.isBomb) {
                    this.defeat();
                    return;
                } else {
                    this._score.increment();
                    tile.setIsReveal(true);
                    if (tile.value === 0) {
                        this.propagateRevelation({ x, y });
                    }
                    this.display();
                    this.clearChecking();
                    this.isVictory();
                }
            } else {
                throw RangeError(`La fonction play nécessite des coordonnées positives et inférieures aux dimensions de la grille.
                play({x, y})`);
            }
        } else {
            throw new TypeError(`La fonction play nécessite des entiers pour coordonnées.
            play({x, y})`);
        }
    }

    defeat() {
        this.clearHTML();
        this._gameManager.defeat();
        this._grid.forEach((column) => {
            column.forEach((tile) => {
                tile.setIsReveal(true);
            });
        });
        this.display();
    }

    isVictory() {
        let win = true;
        this._grid.forEach((column) => {
            column.forEach((tile) => {
                if (!tile.isBomb && !tile.isReveal) {
                    win = false;
                }
            });
        });

        if (win) {
            this._gameManager.victory();
        }
        return;
    }

    clearHTML() {
        this._boardHTML.innerHTML = '';
    }

    get grid() {
        return this._grid;
    }

    event
}