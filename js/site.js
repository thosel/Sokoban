let mainElement = document.querySelector('main');

let game = new Sokoban(mainElement, tileMap01);

window.addEventListener('keydown', function (e) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

window.addEventListener('keyup', event => {

    switch (event.key) {
        case 'ArrowUp':
            game.movePlayer(0, -1);
            break;
        case 'ArrowRight':
            game.movePlayer(1, 0);
            break;
        case 'ArrowDown':
            game.movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            game.movePlayer(-1, 0);
            break;
        default:
            break;
    }
});
