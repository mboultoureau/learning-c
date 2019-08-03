class GameManager {
    constructor({ gameHTML }) {
        this._html = gameHTML;

        this._timerHTML = this._html.querySelector('.time');
        this._timer = new Timer({ timerHTML: this._timerHTML });

        this._scoreHTML = this._html.querySelector('.score');
        this._score = new Score({ scoreHTML: this._scoreHTML, timer: this._timer });

        this._board = new Board({ width: 7, height: 7, numberOfBombs: 5, gameHTML: this._html, gameManager: this, score: this._score });
        this._board.display();

        this._resetHTML = this._html.querySelector('.reset');
        this._resetHTML.addEventListener('click', () => this.reset());
    }

    reset() {
        this._timer.reset();
        this._board.reset();
        this._score.reset();
        this._html.querySelector('.reset').textContent = '🙂';
    }

    victory() {
        this._timer.stop();
        this._html.querySelector('.reset').textContent = '😎';
    }

    defeat() {
        this._timer.stop();
        this._html.querySelector('.reset').textContent = '😭';
    }
}