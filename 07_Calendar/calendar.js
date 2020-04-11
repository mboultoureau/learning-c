const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

class Calendar {
    constructor(date) {
        this.date = date;
        this.update(date);
    }

    update(date) {
        this.month = date.getMonth();
        this.year = date.getFullYear();
        this.day = date.getDate();
        this.numberOfDays = this.getNumberOfDays(this.year, this.month);
        this.firstDay = new Date(this.year, this.month, 1).getDay();
    }

    clear() {
        document.getElementById('date-grid').innerHTML = '';
    }

    displayCalendar() {
        this.clear();

        document.getElementById('calendar-title').textContent = `${months[this.month]} ${this.year}`;

        for(let day = 1; day <= this.numberOfDays; day++) {
            let dayHTML = document.createElement('div');
            if(day == 1) {
                if(this.firstDay == 0) {
                    dayHTML.style = `grid-column: 7;`;
                } else {
                    dayHTML.style = `grid-column: ${this.firstDay};`;
                }
            }
            let timeHTML = document.createElement('time');
            timeHTML.textContent = `${day}`;
            timeHTML.setAttribute('datetime', `${this.year}-${this.month + 1}-${day}`);

            if (this.year == new Date().getFullYear() && this.month == new Date().getMonth() && day == new Date().getDate()) {
                timeHTML.classList.add('today');
            }

            dayHTML.appendChild(timeHTML);
            document.getElementById('date-grid').appendChild(dayHTML);
        }
        if(this.year != new Date().getFullYear()) {
            document.getElementById('back-to-present').style = 'display: block;';
        } else {
            document.getElementById('back-to-present').style = 'display: none;';
        }
    }

    getNumberOfDays(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    previousMonth() {
        this.month = this.month - 1;
        if(this.month < 0) {
            this.month = 11;
            this.year = this.year - 1;
        }
        this.date = new Date(this.year, this.month, this.day);
        this.update(this.date);
        this.displayCalendar();
    }

    nextMonth() {
        this.month = this.month + 1;
        if(this.month > 11) {
            this.month = 0;
            this.year = this.year + 1;
        }
        this.date = new Date(this.year, this.month, this.day);
        this.update(this.date);
        this.displayCalendar();
    }

    backToPresent() {
        this.date = new Date();
        this.update(this.date);
        this.displayCalendar();
    }
}

const date = new Date();
const calendar = new Calendar(date);


// DISPLAY CALENDAR
calendar.displayCalendar();


// BUTTONS AND KEYBOARD SUPPORT
document.getElementById('previous-month').addEventListener('click', () => calendar.previousMonth());
document.getElementById('next-month').addEventListener('click', () => calendar.nextMonth());
document.getElementById('back-to-present').addEventListener('click', () => calendar.backToPresent());
document.body.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowRight':
            calendar.nextMonth();
            break;
        case 'ArrowLeft':
            calendar.previousMonth();
            break;
        case 'b':
            calendar.backToPresent();
    }
});


// LOADER ANIMATION
let iconDay = 1;
let iconAnimation = window.setInterval(() => {
    document.getElementById('icon-day').textContent = iconDay;
    iconDay++;

    if(iconDay > 31) {
        window.clearInterval(iconAnimation);
        document.getElementsByClassName('splash')[0].style = 'animation: disappear 3s forwards;';
        document.getElementsByClassName('calendar')[0].style = 'display: block; animation: appear 3s forwards;';
        document.getElementsByClassName('events')[0].style = 'display: block; animation: appear 3s forwards;';
    }
}, 25)
