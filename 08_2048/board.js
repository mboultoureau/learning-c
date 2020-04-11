class Board {
    constructor(board = null) {
        if (board) {
            this.board = board;
        } else {
            this.board = [
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null]
            ];
            this.reset();
        }
    }

    reset() {
        this.board.forEach((row) => {
            row.forEach((item) => {
                if (item != null) {
                    item.destroy();
                }
            });
        });

        this.board = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];

        this.generateANewCard();
        this.generateANewCard();
    }

    generateANewCard() {
        let availableCells = [];
        this.board.forEach((row, rowIndex) => {
            row.forEach((item, itemIndex) => {
                if (item == null) {
                    availableCells.push({
                        row: rowIndex,
                        column: itemIndex
                    });
                }
            });
        });
        let randomCell = Math.floor(Math.random() * availableCells.length);
        let row = availableCells[randomCell].row;
        let column = availableCells[randomCell].column;
        this.board[row][column] = new Tile({
            row,
            column
        });
    }

    pushToRight(board) {
        for (let row = 0; row < 4; row++) {
            for (let origin = 3; origin > 0; origin--) {
                let originInitialValue = board[row][origin] ? board[row][origin].value : 0;
                target_loop:
                    for (let target = origin - 1; target >= 0; target--) {
                        if (board[row][origin] != null && board[row][target] != null && board[row][origin].value != board[row][target].value) {
                            break target_loop;
                        } else if (board[row][origin] == null && board[row][target] != null) {
                            originInitialValue = board[row][target].value;
                            board[row][target].move(new Vector(row, origin), board);
                        } else if (board[row][origin] != null && board[row][target] != null && originInitialValue == board[row][target].value) {
                            board[row][target].destroy(new Vector(row, origin), board);
                        }
                    }
            }
        }
        return board;
    }

    pushToLeft(board) {
        for (let row = 0; row < 4; row++) {
            for (let origin = 0; origin < 3; origin++) {
                let originInitialValue = board[row][origin] ? board[row][origin].value : 0;
                target_loop:
                    for (let target = origin + 1; target < 4; target++) {
                        if (board[row][origin] != null && board[row][target] != null && board[row][origin].value != board[row][target].value) {
                            break target_loop;
                        } else if (board[row][origin] == null && board[row][target] != null) {
                            originInitialValue = board[row][target].value;
                            board[row][target].move(new Vector(row, origin), board);
                        } else if (board[row][origin] != null && board[row][target] != null && originInitialValue == board[row][target].value) {
                            board[row][target].destroy(new Vector(row, origin), board);
                        }
                    }
            }
        }
        return board;
    }

    pushToTop(board) {
        for (let column = 0; column < 4; column++) {
            for (let origin = 0; origin < 3; origin++) {
                let originInitialValue = board[origin][column] ? board[origin][column].value : 0;
                target_loop:
                    for (let target = origin + 1; target < 4; target++) {
                        if (board[origin][column] != null && board[target][column] != null && board[origin][column].value != board[target][column].value) {
                            break target_loop;
                        } else if (board[origin][column] == null && board[target][column] != null) {
                            originInitialValue = board[target][column].value;
                            board[target][column].move(new Vector(origin, column), board);
                        } else if (board[origin][column] != null && board[target][column] != null && originInitialValue == board[target][column].value) {
                            board[target][column].destroy(new Vector(origin, column), board);
                        }
                    }
            }
        }
        return board;
    }

    pushToDown(board) {
        for (let column = 0; column < 4; column++) {
            for (let origin = 3; origin > 0; origin--) {
                let originInitialValue = board[origin][column] ? board[origin][column].value : 0;
                target_loop:
                    for (let target = origin - 1; target >= 0; target--) {
                        if (board[origin][column] != null && board[target][column] != null && board[origin][column].value != board[target][column].value) {
                            break target_loop;
                        } else if (board[origin][column] == null && board[target][column] != null) {
                            originInitialValue = board[target][column].value;
                            board[target][column].move(new Vector(origin, column), board);
                        } else if (board[origin][column] != null && board[target][column] != null && originInitialValue == board[target][column].value) {
                            board[target][column].destroy(new Vector(origin, column), board);
                        }
                    }
            }
        }
        return board;
    }

}