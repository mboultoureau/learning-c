class Tile {
    constructor(coordinates) {
        this.coordinates = coordinates;
        this.value = 2;
        this.display();
    }

    detectVictory() {
        this.board.forEach((row) => {
            row.forEach((tile) => {
                if(tile != null && tile.value == 2048) {
                    document.querySelector('.victory').classList.add('displayed');
                }
            })
        })
    }

    display() {
        this.HTMLRef = document.createElement('div');
        this.HTMLRef.className = `tile number-${this.value}`;
        this.HTMLRef.textContent = this.value;
        this.HTMLRef.style = `top: ${this.coordinates.row * 110 + 25}px; left: ${this.coordinates.column * 110 + 25}px;`;
        document.querySelector('.tiles').appendChild(this.HTMLRef);
    }

    move(destination, board) {
        board[destination.row][destination.column] = board[this.coordinates.row][this.coordinates.column];
        board[this.coordinates.row][this.coordinates.column] = null;
        this.coordinates = destination;
        this.HTMLRef.style = `top: ${this.coordinates.row * 110 + 25}px; left: ${this.coordinates.column * 110 + 25}px;`;
    }

    doubleValue() {
        this.value *= 2;
        this.HTMLRef.className = `tile number-${this.value}`;
        this.HTMLRef.textContent = this.value;
    }

    destroy(destination, board) {
        if(destination != undefined && board != undefined) {
            board[this.coordinates.row][this.coordinates.column] = null;
            board[destination.row][destination.column].doubleValue();
    
            this.coordinates = destination;
            let HTMLRef = this.HTMLRef;
            HTMLRef.style = `top: ${this.coordinates.row * 110 + 25}px; left: ${this.coordinates.column * 110 + 25}px;`;
        }

        let HTMLRef = this.HTMLRef;

        setTimeout(function() {
            document.querySelector('.tiles').removeChild(HTMLRef);
        }, 100);
    }
}

class Vector {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}