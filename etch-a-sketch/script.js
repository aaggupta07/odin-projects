const MAX_GRID_SIZE = 64;
const MIN_GRID_SIZE = 4;

const MODE = Object.freeze({
    BLACK: 0,
    RAINBOW: 1,
    ERASER: 2,
});

let gridSize = 16;
let currentMode = MODE.BLACK;
const gridSizeInputBox = document.querySelector("#grid-size");
const container = document.querySelector(".container");
const toolBox = document.querySelector(".tools");

const BACKGROUND_COLOR = container.style.backgroundColor;

function createBoard() {
    const container = document.querySelector(".container");
    const curElements = container.querySelectorAll(".row");
    curElements.forEach((element) => element.remove());

    for(let i = 0; i < gridSize; ++i) {
        const row = document.createElement("div");
        row.classList.add("row");

        const height = Math.floor(container.clientWidth / gridSize);
        row.style.height = `${height}px`;

        for(let j = 0; j < gridSize; ++j) {
            const square = document.createElement("div");
            square.classList.add("square");
            row.appendChild(square);
        }

        container.appendChild(row);
    }
}

function randRGB() {
    return Math.floor(Math.random() * 256);
}

function onHover(event) {
    if(event.buttons == 1) {
        let toColor;
        
        if(currentMode == MODE.RAINBOW) toColor = `rgb(${randRGB()}, ${randRGB()}, ${randRGB()})`;
        else if(currentMode == MODE.ERASER) toColor = BACKGROUND_COLOR;
        else toColor = "black";
        
        event.target.style.backgroundColor = toColor;
    }
}

function switchMode(event) {
    const newButton = event.target;
    const oldButton = event.target.parentElement.querySelector(".selected");

    if(newButton != toolBox && oldButton != null) oldButton.classList.remove("selected");
    if(newButton != null) newButton.classList.add("selected");

    switch(newButton.id) {
        case "black":
            currentMode = MODE.BLACK;
            break;
        case "rainbow":
            currentMode = MODE.RAINBOW;
            break;
        case "eraser":
            currentMode = MODE.ERASER;
            break;
    }
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

container.addEventListener("mouseover", onHover);

toolBox.addEventListener("click", switchMode);

