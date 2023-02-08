//game constants & variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3')
const musicSound = new Audio('music/music.mp3');
let speed = 30;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 5, y: 14 }
]
food = { x: 14, y: 5 };


//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}

//ISCOLLIDE FUNCTION
function isColloide(snake) {
    //IF SNAKE BUMP INTO ITSELF
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
        //if snake collide to walls 
    }
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    //PART 1:UPDATING THE SNAKE ARRAY & FOOD
    //(HERE WE WILL STORE THE DIFFERENT POSITIONS OF SNAKE)
    if (isColloide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over , Press any key to play again!")
        snakeArr = [{ x: 5, y: 14 }];
        musicSound.play();
        score = 0;
    }

    //IF SNAKE HAVE EATEN THE FOOD,INCREMENT THE SCORE AND REGRENERATE THE FOOD
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score +=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore " + hiscoreval;
        }
         scoreBox.innerHTML = "Score " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 19;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }

    //moving the snake(doubt)
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[element];
        snakeArr[i + 1] = { ...snakeArr[i] };

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //PART 2: DISPLAY THE SNAKE AND FOOd
    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        //  snakeElement.classList.add('snake');
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //display te food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore ");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));     //we can't set it 0 normally
}
else{
      hiscoreval = JSON.parse(hiscore);
      hiscoreBox.innerHTML = "HiScore " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };    //start te game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

});

