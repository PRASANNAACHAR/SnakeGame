let playBoard = document.querySelector(".wrapper .play-board");
let score_val = document.querySelector(".wrapper .score .score-val");
let gameOverBox = document.querySelector(".wrapper .game-over-box");
let gameOverScore = document.querySelector(".wrapper .game-over-score");
let restartBtn = document.querySelector(".wrapper .restart-btn");

let gameEnd = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let moveX = 0, moveY = 0;
let snakeBody = [];
let IntervalId;
let score = 0;

let createGame = () => {
    if (gameEnd) {
        return EndGame();
    }

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([snakeX, snakeY]);
        score++;
        score_val.innerHTML = score;
        gameOverScore.innerHTML = score;
    }

    // moving snake
    snakeX += moveX;
    snakeY += moveY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    // game end when snake collides with the wall
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameEnd = true;
        return EndGame();
    }

    // create food
    let li = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;
    for (let i = 0; i < snakeBody.length; i++) {
        li += `<div class="snake" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameEnd = true;
        }
    }
    playBoard.innerHTML = li;
}

let changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// Update direction based on arrow key press
let changeDirection = (e) => {
    switch (e.key) {
        case "ArrowLeft":
            if (moveX !== 1) { // Prevent reversing direction
                moveX = -1;
                moveY = 0;
            }
            break;
        case "ArrowUp":
            if (moveY !== 1) { // Prevent reversing direction
                moveX = 0;
                moveY = -1;
            }
            break;
        case "ArrowDown":
            if (moveY !== -1) { // Prevent reversing direction
                moveX = 0;
                moveY = 1;
            }
            break;
        case "ArrowRight":
            if (moveX !== -1) { // Prevent reversing direction
                moveX = 1;
                moveY = 0;
            }
            break;
    }
}

let EndGame = () => {
    clearInterval(IntervalId);
    gameOverBox.style.left = "0%";
}

restartBtn.addEventListener("click", () => {
    location.reload();
})

// Listen for keydown events on the entire document
document.addEventListener("keydown", changeDirection);

changeFoodPosition();
IntervalId = setInterval(createGame, 125);
createGame();
