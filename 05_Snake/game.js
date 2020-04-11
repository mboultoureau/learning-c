var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var snake = [{x: 7, y: 10}, {x: 6, y: 10}, {x: 5, y: 10}, {x: 4, y: 10}, {x: 3, y: 10}];
var bonus = null;
var bonusAcquired = false;
var previousDirection = 'RIGHT';
var direction = 'RIGHT';

// KEYBOARD EVENT
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowLeft':
        case 'q':
            direction = 'LEFT';
            break;
        case 'ArrowRight':
        case 'd':
            direction = 'RIGHT';
            break;
        case 'ArrowUp':
        case 'z':
            direction = 'UP';
            break;
        case 'ArrowDown':
        case 's':
            direction = 'DOWN';
            break;
    }
});

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// DEFEAT SCREEN
function defeat() {
    clearInterval(ticker);
    setTimeout(() => {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 600, 600);
        ctx.fillStyle = '#FFF';
        ctx.font = '48px sans-serif';
        ctx.textAlign = "center"; 
        ctx.fillText('Vous avez perdu 😭', 300, 300);
    }, 700)
}

// MAIN THREAD
var ticker = setInterval(() => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 600, 600);

    // GENERATE BONUS
    if (bonus == null) {
        validPosition = true;
        var position = {x: random(0, 19), y: random(0, 19)};
        snake.forEach(i => {
            if(position.x == i.x && position.y == i.y) {
                validPosition = false;
            }
        });
        if (validPosition) {
            bonus = position;
        }
    }

    ctx.fillStyle = '#0F0';
    ctx.fillRect(bonus.x * 30, bonus.y * 30, 30, 30);

    ctx.fillStyle = '#FFF';
    if(!bonusAcquired) {
        snake.pop();
    }
    bonusAcquired = false;


    // UPDATE SNAKE ARRAY
    switch(direction) {
        case 'LEFT':
            snake.unshift({x: snake[0].x - 1, y: snake[0].y});
            break;
        case 'RIGHT':
            snake.unshift({x: snake[0].x + 1, y: snake[0].y});
            break;
        case 'UP':
            snake.unshift({x: snake[0].x, y: snake[0].y - 1});
            break;
        case 'DOWN':
            snake.unshift({x: snake[0].x, y: snake[0].y + 1});
            break;
    }

    // CHECK DEFEAT
    if (snake[0].x >= 20 || 
        snake[0].x < 0 || 
        snake[0].y >= 20 || 
        snake[0].y < 0) {
        defeat();
    }

    if (previousDirection == 'LEFT' && direction == 'RIGHT' ||
        previousDirection == 'RIGHT' && direction == 'LEFT' ||
        previousDirection == 'UP' && direction == 'DOWN' ||
        previousDirection == 'DOWN' && direction == 'UP') {
        defeat();
    }

    snake.forEach((i, index) => {
        ctx.fillStyle = '#FFF';
        // CHECK SELF-COLLISION
        if(i.x == snake[0].x && i.y == snake[0].y && index != 0) {
            defeat();
        }

        // CHECK IF BODY TOUCH A BONUS
        if (bonus != null) {
            if (i.x == bonus.x && i.y == bonus.y) {
                bonusAcquired = true;
                bonus = null;
            }
        }

        // COLOR HEAD
        if(index == 0) {
            ctx.fillStyle = '#F00';
        }

        // DISPLAY SNAKE
        ctx.fillRect(i.x * 30, i.y * 30, 30, 30);
    });

    previousDirection = direction;
}, 500);
