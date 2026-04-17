const board = document.querySelector(".borders");

if (!board) {
	throw new Error("Board element not found");
}

const borderWidth = 50;
const borderHeight = 50;

const totalCol = Math.floor(board.clientWidth / borderWidth);
const totalRow = Math.floor(board.clientHeight / borderHeight);

const blocks = {};
const snake = [{ x: 1, y: 3 },];
let intervalId = null;
let direction = "right";




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
         block.innerHTML = `${row}-${col}`;
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
    alert("Game Over");
    clearInterval(intervalId);
   
 }
 if(head.x == food.x && head.y == food.y){
     blocks[`${food.x}-${food.y}`].classList.remove("food");

     food = {
        x: Math.floor(Math.random() * totalRow),
        y: Math.floor(Math.random() * totalCol),
     };
     blocks[`${food.x}-${food.y}`].classList.add("food");
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


intervalId = setInterval(()=>{
 
render();
},400);

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

