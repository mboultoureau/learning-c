class Tile {
    constructor({ x, y, value = 0, isBomb = false, isReveal = false }) {
        if (Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(value) && typeof isBomb === 'boolean' && typeof isReveal === 'boolean') {
            if (x >= 0 && y >= 0 && value >= 0 && value <= 9) {
                this._x = x;
                this._y = y;
                this._value = value;
                this._isBomb = isBomb;
                this._isReveal = isReveal;
                this._isChecked = false;
                this._hasFlag = false;

                // HTML
                this._html = document.createElement('div');
                this._html.classList.add('tile');
            } else {
                throw RangeError(`La classe Tile nécessite des coordonnées x, y positives et une valeur value positive et inférieure à 10.
                Initiation : new Tile({x: integer, y: integer[, value: integer, isBomb: boolean, isReveal: boolean]})`);
            }
        } else {
            throw new TypeError(`La classe Tile nécessite des entiers ainsi qu'un booléan pour isBomb
            Initiation : new Tile({x: integer, y: integer[, value: integer, isBomb: boolean, isReveal: boolean]})`);
        }
    }

    reset() {
        this._value = 0;
        this._isBomb = false;
        this._isReveal = false;
        this._isChecked = false;
        this._hasFlag = false;
        this._html.className = 'tile';
        this._html.textContent = '';
    }

    display(columnHTML) {
        if (this._isReveal) {
            this._html.classList.add('reveal');
            this._html.classList.add(`value-${this._value}`);
            if (this._html.classList.contains('flag')) {
                this._html.classList.remove('flag');
            }
            if (this.isBomb) {
                this._html.classList.add('bomb');
            } else if (this._value != 0) {
                this._html.textContent = this._value;
            }
        } else if (this._hasFlag) {
            this._html.classList.add('flag');
        }

        columnHTML.appendChild(this._html);
    }

    addEventsListener(board) {
        this._html.addEventListener('click', () => {
            if (!this.isReveal && !this._hasFlag) {
                board.play({ x: this._x, y: this._y })
            }
        });

        this._html.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            this.toggleHasFlag(board);
            board.display();
            return false;
        }, false);


        let timer;

        this._html.addEventListener('touchstart', (event) => {
            timer = setTimeout(() => {
                event.preventDefault();
                this.toggleHasFlag(board);
                board.display();
                return false;
            }, 1000);
        });

        this._html.addEventListener('touchend', () => {
            if (timer) {
                clearTimeout(timer);
            }
        });
    }

    toggleHasFlag() {
        if (this._hasFlag) {
            this._hasFlag = false;
            this._html.classList.remove('flag');
        } else {
            this._hasFlag = true;
        }
    }

    get value() {
        return this._value;
    }

    get isBomb() {
        return this._isBomb;
    }

    get isReveal() {
        return this._isReveal;
    }

    get isChecked() {
        return this._isChecked;
    }

    setIsBomb(isBomb) {
        this._isBomb = isBomb;
    }

    setIsReveal(isReveal) {
        this._isReveal = isReveal;
    }

    setValue(newValue) {
        this._value = newValue;
    }

    setIsChecked(isChecked) {
        this._isChecked = isChecked;
    }

    set value(newValue) {
        if (Number.isInteger(newValue)) {
            if (newValue >= 0 && newValue <= 9) {
                _value = newValue;
            } else {
                throw RangeError(`Vous devez fournir une valeur positive et inférieure à 9 à set value(newValue).`);
            }
        } else {
            throw new TypeError(`Vous devez fournir une valeur entière à set value(newValue).`);
        }
    }

    set isBomb(isBomb) {
        if (typeof isBomb === 'boolean') {
            this._isBomb = isBomb;
        } else {
            throw new TypeError(`Vous devez fournir un boolean à set isBomb(isBomb).`);
        }
    }

    set isReveal(isReveal) {
        if (typeof isReveal === 'boolean') {
            this._isReveal = isReveal;
        } else {
            throw new TypeError(`Vous devez fournir un boolean à set isReveal(isReveal).`);
        }
    }

    set isChecked(isChecked) {
        if (typeof isChecked === 'boolean') {
            this._isChecked = isChecked;
        } else {
            throw new TypeError(`Vous devez fournir un boolean à set isChecked(isChecked).`);
        }
    }
}