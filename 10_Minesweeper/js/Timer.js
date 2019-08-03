class Timer {
    constructor({ timerHTML }) {
        this._html = timerHTML;
        this.time = 0;
        this.timer = null;
    }

    start() {
        this.timer = setInterval(() => {
            this.time++;

            if (this.time < 10) {
                this._html.textContent = `00${this.time}`;
            } else if (this.time < 100) {
                this._html.textContent = `0${this.time}`;
            } else if (this.time > 999) {
                this._html.textContent = `999`;
            }
        }, 1000);
    }

    reset() {
        this.stop();
        this._html.textContent = `000`;
        this.time = 0;
    }

    stop() {
        window.clearInterval(this.timer);
    }
}