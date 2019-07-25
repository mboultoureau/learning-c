let board = new Board();
board.display();

function play() {
    board.generateANewCard();
    board.display();
}

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowRight':
            board.pushToRight();
            play();
            break;
        case 'ArrowLeft':
            board.pushToLeft();
            play();
            break;
        case 'ArrowUp':
            board.pushToTop();
            play();
            break;
        case 'ArrowDown':
            board.pushToBottom();
            play();
            break;
    }
});