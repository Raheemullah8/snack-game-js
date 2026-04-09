const board = document.querySelector(".borders");

if (!board) {
	throw new Error("Board element not found");
}

const borderwidth = 30
const borderhight = 30

const totalCol = Math.floor(board.clientWidth / borderwidth);
const totalRow = Math.floor(board.clientHeight / borderhight);

// for(let i = 0; i < totalCol * totalRow; i++){
//     let block = document.createElement("div");
//     block.classList.add("block");
//     board.appendChild(block);
// }

for(let row = 0; row < totalRow; row++){
    for(let col = 0; col <totalCol; col++){
       let block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
    }
}


console.log("total-col",totalCol,"total-row",totalRow)
