let board = new Board();
let previousState = JSON.stringify(board.board);

function play(action) {
    if (action.type == 'direction') {
        switch (action.direction) {
            case 'right':
                board.pushToRight(board.board);
                break;
            case 'left':
                board.pushToLeft(board.board);
                break;
            case 'up':
                board.pushToTop(board.board);
                break;
            case 'down':
                board.pushToDown(board.board);
                break;
        }

        if(previousState != JSON.stringify(board.board)) {
            board.generateANewCard();
        }

        previousState = JSON.stringify(board.board)
    }

    if (action.type == 'manage') {
        switch (action.action) {
            case 'reset':
                board.reset();
                break;
        }

        previousState = JSON.stringify(board.board)
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            play({
                type: 'direction',
                direction: 'right'
            });
            break;
        case 'ArrowLeft':
            play({
                type: 'direction',
                direction: 'left'
            });
            break;
        case 'ArrowUp':
            play({
                type: 'direction',
                direction: 'up'
            });
            break;
        case 'ArrowDown':
            play({
                type: 'direction',
                direction: 'down'
            });
            break;
        case 'r':
            play({
                type: 'manage',
                action: 'reset'
            });
            break;
    }
});

document.querySelector('.play-again').addEventListener('click', (event) => {
    play({
        type: 'manage',
        action: 'reset'
    });
})