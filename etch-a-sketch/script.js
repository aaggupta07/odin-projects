const MAX_GRID_SIZE = 64;
const MIN_GRID_SIZE = 4;

let gridSize = 16;
const gridSizeInputBox = document.querySelector("#grid-size");

// function debounce(fn, delay) {
//     let timeoutID;

//     return function(...args) {
//         clearTimeout(timeoutID);
//         timeoutID = setTimeout(() => fn(...args), delay);
//     }
// }


function validateGridSize() {
    const errorBox = document.querySelector(".error-msg");

    if(gridSize > MAX_GRID_SIZE) {
        errorBox.textContent = "Grid size cannot exceed 100";
        return false;
    }
    else if(gridSize < MIN_GRID_SIZE) {
        errorBox.textContent = "Grid must be at least 1 square large";
        return false;
    }
    else {
        errorBox.textContent = "";
        return true;
    }
}

function createBoard() {
    const container = document.querySelector(".container");
    const curElements = container.querySelectorAll(".row");
    curElements.forEach((element) => element.remove());

    for(let i = 0; i < gridSize; ++i) {
        const row = document.createElement("div");
        row.classList.add("row");

        const height = Math.floor(container.clientWidth / gridSize);
        console.log("Called! Width: " + container.clientWidth + " Height: " + height);
        row.style.height = `${height}px`;

        for(let j = 0; j < gridSize; ++j) {
            const square = document.createElement("div");
            square.classList.add("square");
            row.appendChild(square);
        }

        container.appendChild(row);
    }
}

function onHover(event) {
    console.log("Called! " + event.button + " " + event.target);
    if(event.buttons == 1) event.target.classList.add("hovered");
}

function resetGrid() {
    gridSize = Number(gridSizeInputBox.value);
    if(validateGridSize()) createBoard();
}

createBoard(gridSize);

addEventListener("resize", createBoard);

gridSizeInputBox.value = 16;

const resetButton = document.querySelector(".reset button");
resetButton.addEventListener("click", resetGrid);

const container = document.querySelector(".container");
container.addEventListener("mouseover", onHover)

