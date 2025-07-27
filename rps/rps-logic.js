const WIN_GREEN = '#a7c957';
const LOSS_RED = '#bc4749';
const TIE_YELLOW = '#fdd78cff';


function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);

    switch(choice) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}

function getHumanChoice(event) {
    return event.target.id;
}

let humanScore = 0, computerScore = 0, roundCount = 0;

function playRound(event) {
    const humanChoice = getHumanChoice(event);
    const computerChoice = getComputerChoice();

    const map = new Map();
    map.set("rock", "scissors");
    map.set("paper", "rock");
    map.set("scissors", "paper");

    if(humanChoice == computerChoice) {
        displayResult(0, humanChoice, computerChoice);
    }
    else if(humanChoice == map.get(computerChoice)) {
        updateScore(document.querySelector('#computerScore'));
        displayResult(1, humanChoice, computerChoice);
    }
    else {
        updateScore(document.querySelector('#humanScore'));
        displayResult(2, humanChoice, computerChoice);
    }

    ++roundCount;
}

function printResult() {
    console.log(`You won ${humanScore} times, lost ${computerScore} times, and tied ${1 - humanScore - computerScore} times. Thanks for playing!`);
}

// Implement UI

function displayResult(outcomeCode, humanChoice, computerChoice) {
    const resultSelector = document.querySelector(".results");
    const newResult = document.createElement("li");
    newResult.classList.add("result");

    switch(outcomeCode) {
        case 0:
            newResult.style.backgroundColor = TIE_YELLOW;
            newResult.textContent = "Tie! Both players chose " + humanChoice;
            break;
        case 1:
            newResult.style.backgroundColor = LOSS_RED;
            newResult.textContent = `You Lose! You chose ${humanChoice} and the computer chose ${computerChoice}`;
            break;
        case 2:
            newResult.style.backgroundColor = WIN_GREEN;
            newResult.textContent = `You Win! You chose ${humanChoice} and the computer chose ${computerChoice}`;
            break;
    }

    resultSelector.appendChild(newResult);
}

function updateScore(scoreToUpdate) {
    if(scoreToUpdate.id == 'humanScore') {
        ++humanScore;
        scoreToUpdate.textContent = "Your score: " + humanScore; 
    }
    else {
        ++computerScore;
        scoreToUpdate.textContent = "Computer score: " + computerScore;
    }
}

const buttons = document.querySelector("button");
buttons.parentElement.addEventListener("click", playRound);

// Todo: add a button to request rounds played, a restart button
