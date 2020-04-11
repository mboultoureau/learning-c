class Score {
    constructor({ scoreHTML, timer }) {
        this._html = scoreHTML;
        this.timer = timer;
        this.score = 0;
        this.display();
    }

    display() {
        if (this.score < 10) {
            this._html.textContent = `00${this.score}`;
        } else if (this.score < 100) {
            this._html.textContent = `0${this.score}`;
        } else if (this.score > 999) {
            this._html.textContent = `999`;
        }
    }

    reset() {
        this._html.textContent = `000`;
        this.score = 0;
    }

    increment() {
        this.score = this.score + 1;
        if (this.score === 1) {
            this.timer.start();
        }
        this.display();
    }
}