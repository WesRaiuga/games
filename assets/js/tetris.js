/* ----- AUDIO ----- */

const bgMusic = document.querySelector('audio');
bgMusic.loop = true;
bgMusic.volume = 0.1;
bgMusic.autoplay = false;

const arenaSweepAudio = document.createElement('audio');
arenaSweepAudio.src = 'assets/audio/tetris/arena-sweep.mp3';
arenaSweepAudio.volume = 0.6;
arenaSweepAudio.autoplay = false;

const gameOverAudio = document.createElement('audio');
gameOverAudio.src = 'assets/audio/tetris/game-over.mp3';
gameOverAudio.volume = 1;
gameOverAudio.autoplay = false;

const mute = document.querySelector('#mute');

const playAudio = async (audio) => {
    try {
        await audio.play();
    } catch(err) {
        console.log('Erro no áudio:\n' + audio);
    }
}

mute.addEventListener('click', event => {
    bgMusic.muted = !bgMusic.muted;
    arenaSweepAudio.muted = !arenaSweepAudio.muted;
    gameOverAudio.muted = !gameOverAudio.muted;
    if (bgMusic.muted) {
        mute.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        mute.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});

/* ----- GAME ----- */

const canvas = document.querySelector('#tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

const arenaSweep = () => {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
        playAudio(arenaSweepAudio);
    }
};

const collide = (arena, player) => {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) { 
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0 ) {
                    return true;
                }
        }
    }
    return false;
};

const createMatrix = (w, h) => {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
};

const createPiece = (type) => {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2]
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0]
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0]
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0]
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0]
        ];
    } else if (type === 'C') {
        return [
            [9, 9],
            [9, 0]
        ];
    } else if (type === '.') {
        return [
            [8]
        ];
    }
};

const draw = () => {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

const drawMatrix = (matrix, offset) => {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = '#83868a';
                context.fillRect(x + offset.x,
                                 y + offset.y, 
                                 1, 1);
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y, 
                                 0.95, 0.95);
            }
        });
    });
};

const merge = (arena, player) => {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
};

const playerDrop = () => {
    player.pos.y++;
    if (collide(arena,player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
};

const playerMove = (dir) => {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
};

const playerReset = () => {
    const pieces = 'TOLJISZC.';
    player.matrix = createPiece( pieces[pieces.length * Math.random() | 0] );
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                    (player.matrix[0].length / 2 | 0);
    
    if (collide(arena, player)) {
        playAudio(gameOverAudio);
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
};

const playerRotate = (dir) => {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
};

const rotate = (matrix, dir) => {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x]
            ] = [
                matrix[y][x],
                matrix[x][y]
            ]; 
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
};

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
const update = (time = 0) => {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
};

const updateScore = () => {
    document.querySelector('#score').innerText = player.score;
};

const colors = [
    null,
    '#5610A7',
    '#F8EC05',
    '#F76204',
    '#0A03D1',
    '#05A3F8',
    '#05F120',
    '#F052DD',
    '#F00606',
    '#01550B'
];

const arena = createMatrix(12, 20);

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0
};

document.addEventListener('keydown', event => {
    if (event.keyCode === 37 || event.keyCode === 65) {
        playerMove(-1);
    } else if (event.keyCode === 39 || event.keyCode === 68) {
        playerMove(1);
    } else if (event.keyCode === 40 || event.keyCode === 83) {
        playerDrop();
    } else if (event.keyCode === 38 || event.keyCode === 87) {
        playerRotate(1);
    }
});

const startGame = () => {
    playerReset();
    updateScore();
    update();
};

const startButton = document.querySelector('#start-btn');
startButton.addEventListener('click', event => {
    document.querySelector('#start-menu').style.display = 'none';
    document.querySelector('#game').style.display = 'initial';
    document.querySelector('#mute').style.display = 'initial';
    document.querySelector('footer').style.display = 'initial';

    startGame();
    playAudio(bgMusic);
});