const board = document.querySelector(".borders");
const startBtn = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const reStartBtn = document.querySelector(".btn-restart");
const gameOverModal = document.querySelector(".game-over");
const startGame = document.querySelector(".start-game");

const highScore = document.querySelector("#high-score");
const score = document.querySelector("#score");
const time = document.querySelector("#time");

let currentScore = 0;
let currentTimeInSeconds = 0;
let highScoreValue = 0;

if (!board) {
	throw new Error("Board element not found");
}

const borderWidth = 50;
const borderHeight = 50;

const totalCol = Math.floor(board.clientWidth / borderWidth);
const totalRow = Math.floor(board.clientHeight / borderHeight);

const blocks = {};
let snake = [{ x: 1, y: 3 },];
let intervalId = null;
let timeIntervalId = null;
let direction = "right";

const parseScoreValue = (value) => {
    if (!value) {
        return 0;
    }
    const normalizedValue = String(value).replace(/,/g, "").trim();
    const parsedValue = Number(normalizedValue);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const syncHud = () => {
    if (score) {
        score.textContent = String(currentScore);
    }
    if (time) {
        time.textContent = formatTime(currentTimeInSeconds);
    }
    if (highScore) {
        highScore.textContent = String(highScoreValue);
    }
};

const stopGameLoops = () => {
    clearInterval(intervalId);
    clearInterval(timeIntervalId);
    intervalId = null;
    timeIntervalId = null;
};

const startGameLoops = () => {
    stopGameLoops();
    intervalId = setInterval(() => {
        render();
    }, 400);
    timeIntervalId = setInterval(() => {
        currentTimeInSeconds += 1;
        if (time) {
            time.textContent = formatTime(currentTimeInSeconds);
        }
    }, 1000);
};

const highScoreFromStorage = localStorage.getItem("highScore");
const highScoreFromLegacyStorage = localStorage.getItem("high-score");
highScoreValue = parseScoreValue(highScoreFromStorage || highScoreFromLegacyStorage);
syncHud();





let food = {
    x: Math.floor(Math.random() * totalRow),
    y: Math.floor(Math.random() * totalCol),
};

board.style.gridTemplateColumns = `repeat(${totalCol}, ${borderWidth}px)`;
board.style.gridTemplateRows = `repeat(${totalRow}, ${borderHeight}px)`;

// for(let i = 0; i < totalCol * totalRow; i++){
//     let block = document.createElement("div");
//     block.classList.add("block");
//     board.appendChild(block);
// }

for (let row = 0; row < totalRow; row++) {
    for (let col = 0; col < totalCol; col++) {
        let block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        
        blocks[`${row}-${col}`] = block;

    }
}

const render = () =>{
     snake?.forEach(element => {
        blocks[`${element.x}-${element.y}`].classList.add("filled");          
    });

    let head = null;
    const foodBlock = blocks[`${food.x}-${food.y}`];
    if (foodBlock) {
        foodBlock.classList.add("food");
    }
   
    
 
 if(direction === "left"){
    head = {x: snake[0].x, y: snake[0].y - 1};
 }else if(direction === "right"){
    head = {x: snake[0].x, y: snake[0].y + 1};
 }else if(direction === "down"){
    head = {x: snake[0].x + 1, y: snake[0].y};
 }else if(direction === "up"){
    head = {x: snake[0].x - 1, y: snake[0].y};
 }

 if(head.x < 0 || head.x >= totalRow || head.y <0 || head.y >= totalCol){
  
     stopGameLoops();
      modal.style.display = "flex";
   
   startGame.style.display = "none";
    gameOverModal.style.display = "flex";
     return;
  
 }
 if(head.x == food.x && head.y == food.y){
     blocks[`${food.x}-${food.y}`].classList.remove("food");

     food = {
        x: Math.floor(Math.random() * totalRow),
        y: Math.floor(Math.random() * totalCol),
     };
     blocks[`${food.x}-${food.y}`].classList.add("food");

        currentScore += 10;
        if (score) {
            score.textContent = String(currentScore);
        }
        if(currentScore > highScoreValue){
            highScoreValue = currentScore;
            localStorage.setItem("highScore", String(highScoreValue));
            localStorage.setItem("high-score", String(highScoreValue));
            if (highScore) {
                highScore.textContent = String(highScoreValue);
            }
        }

     snake.unshift(head);
    
     }

    


  snake?.forEach(element => {
        blocks[`${element.x}-${element.y}`].classList.remove("filled");        
    });
 snake.unshift(head);
 snake.pop();
 snake.forEach(element =>{
    blocks[`${element.x}-${element.y}`].classList.add("filled");
 }) 


}


// intervalId = setInterval(()=>{
 
// render();
// },400);

if (startBtn) {
    startBtn.addEventListener("click", () => {
        modal.style.display = "none";
        startGameLoops();
    });
}

reStartBtn.addEventListener("click",(e)=>{
stopGameLoops();
blocks[`${food.x}-${food.y}`].classList.remove("food");
snake.forEach(element =>{
    blocks[`${element.x}-${element.y}`].classList.remove("filled");
})

currentScore = 0;
currentTimeInSeconds = 0;
syncHud();

modal.style.display = "none";
gameOverModal.style.display = "none";
direction = "down";
snake = [{ x: 1, y: 3 }];
food = {
    x: Math.floor(Math.random() * totalRow),
    y: Math.floor(Math.random() * totalCol),
};
startGameLoops();
    
})



addEventListener("keydown",(e)=>{
    if(e.key === "ArrowLeft"){
        direction = "left";
    }else if(e.key === "ArrowRight"){
        direction = "right";
    }
    else if(e.key === "ArrowDown"){
        direction = "down";
    }
    else if(e.key === "ArrowUp"){
        direction = "up";
    }
})



