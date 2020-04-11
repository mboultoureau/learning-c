try {
    let gameHTML = document.querySelector('.game');
    let gameManager = new GameManager({ gameHTML });
} catch (error) {
    console.error(error);
}
