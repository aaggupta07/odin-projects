let gridSize = 16;

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

createBoard(gridSize);

addEventListener("resize", createBoard);

const container = document.querySelector(".container");
container.addEventListener("mouseover", onHover)

