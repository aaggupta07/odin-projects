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

function onGridResize() {
    const displayBox = document.querySelector(".grid-size-display");
    gridSize = Math.min(Math.max(0, Number(gridSizeInputBox.value)), 64);
    displayBox.textContent = gridSize;
}

createBoard(gridSize);

addEventListener("resize", createBoard);

gridSizeInputBox.addEventListener("input", onGridResize);
gridSizeInputBox.value = 16;
onGridResize();

const resetButton = document.querySelector(".reset button");
resetButton.addEventListener("click", createBoard);

const container = document.querySelector(".container");
container.addEventListener("mouseover", onHover)

