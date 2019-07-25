class Board {
    constructor(board = null) {
        if(board) {
            this.board = board;
        } else {
            this.reset();
        }
    }

    reset() {
        this.board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.generateANewCard();
        this.generateANewCard();
    }

    test(input, actions, expectedOutput) {
        this.board = input;
        actions.forEach(action => {
            switch(action) {
                case 'reset':
                    this.reset();
                    break;
                case 'right':
                    this.pushToRight();
                    break;
                case 'left':
                    this.pushToLeft();
                    break;
                case 'up':
                    this.pushToTop();
                    break;
                case 'down':
                    this.pushToBottom();
                    break;
                case 'generate':
                    this.generateANewCard();
                    break;
            }
        });

        return {
            input,
            actions,
            expectedOutput,
            result: this.board.toString() == expectedOutput.toString(),
            output: this.board
        }
    }

    generateANewCard() {
        let a = Math.floor(Math.random() * 4);
        let b = Math.floor(Math.random() * 4);
        while(this.board[a][b] != 0) {
            a = Math.floor(Math.random() * 4);
            b = Math.floor(Math.random() * 4);
        }
        this.board[a][b] = 2;
    }

    display() {
        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 4; j++) {
                let HTMLRef = document.getElementsByClassName('row')[i].getElementsByClassName('cell')[j].getElementsByClassName('card')[0];
                if(this.board[i][j] != 0) {
                    HTMLRef.textContent = this.board[i][j];
                } else {
                    HTMLRef.textContent = '';
                }
                HTMLRef.className = `card number-${this.board[i][j]}`;
            }
        }
    }

    pushToRight() {
        for(let r = 0; r < 4; r++) {
            let row = this.board[r];
            for(let origin = 3; origin > 0; origin--) {
                stack_loop:
                for(let i = origin - 1; i >= 0; i--) {
                    if(row[origin] == 0 && row[i] != 0) {
                        row[origin] = row[i];
                        row[i] = 0;
                    } else if(row[i] != 0 && row[i] != row[origin]) {
                        break stack_loop;
                    } else if(row[i] == row[origin]) {
                        row[origin] = row[i] * 2;
                        row[i] = 0;
                    }
                }
            }
        }
    }

    pushToLeft() {
        for(let r = 0; r < 4; r++) {
            let row = this.board[r];
            for(let origin = 0; origin < 3; origin++) {
                stack_loop:
                for(let i = origin + 1; i < 4; i++) {
                    if(row[origin] == 0 && row[i] != 0) {
                        row[origin] = row[i];
                        row[i] = 0;
                    } else if(row[i] != 0 && row[i] != row[origin]) {
                        break stack_loop;
                    } else if(row[i] == row[origin]) {
                        row[origin] = row[i] * 2;
                        row[i] = 0;
                    }
                }
            }
        }
    }

    pushToTop() {
        for(let c = 0; c < 4; c++) {
            for(let origin = 0; origin < 3; origin++) {
                stack_loop:
                for(let i = origin + 1; i < 4; i++) {
                    if(this.board[origin][c] == 0 && this.board[i][c] != 0) {
                        this.board[origin][c] = this.board[i][c];
                        this.board[i][c] = 0;
                    } else if(this.board[i][c] != 0 && this.board [i][c] != this.board[origin][c]) {
                        break stack_loop;
                    } else if(this.board[i][c] == this.board[origin][c]) {
                        this.board[origin][c] = this.board[i][c] * 2;
                        this.board[i][c] = 0;
                    }
                }
            }
        }
    }

    pushToBottom() {
        for(let c = 0; c < 4; c++) {
            for(let origin = 3; origin > 0; origin--) {
                stack_loop:
                for(let i = origin - 1; i >= 0; i--) {
                    if(this.board[origin][c] == 0 && this.board[i][c] != 0) {
                        this.board[origin][c] = this.board[i][c];
                        this.board[i][c] = 0;
                    } else if(this.board[i][c] != 0 && this.board [i][c] != this.board[origin][c]) {
                        break stack_loop;
                    } else if(this.board[i][c] == this.board[origin][c]) {
                        this.board[origin][c] = this.board[i][c] * 2;
                        this.board[i][c] = 0;
                    }
                }
            }
        }
    }
}