const WIN_GREEN = '#a7c957';
const LOSS_RED = '#bc4749';
const TIE_YELLOW = '#fdd78cff';
const GAME_ROUNDS = 5;

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

    if(humanScore + computerScore >= GAME_ROUNDS) displayEnd();
}

function retry() {
    // reset scores
    humanScore = -1, computerScore = -1, roundCount = 0;
    updateScore(document.querySelector('#computerScore'));
    updateScore(document.querySelector('#humanScore'));

    // clear results
    const results = document.querySelectorAll('.results li');
    results.forEach((element) => element.remove());

    const buttons = document.querySelector(".button-options");
    buttons.addEventListener("click", playRound);
}

function getOverallResult() {
    if(computerScore > humanScore) {
        return "You lost the best of five. ";
    }
    else if(humanScore > computerScore) {
        return "You won the best of five! ";
    }

    // should theoretically never happen
    else {
        return "You Tied? ";
    }
}

function getResultColor() {
    if(computerScore > humanScore) {
        return LOSS_RED;
    }
    else if(humanScore > computerScore) {
        return WIN_GREEN;
    }

    // should theoretically never happen
    else {
        return TIE_YELLOW;
    }
}

function displayEnd() {
    // deactivate normal buttons
    const buttons = document.querySelector(".button-options");
    buttons.removeEventListener("click", playRound);

    // create end info box & retry button
    const resultBox = document.querySelector(".results");

    const endResult = document.createElement("li");
    endResult.classList.add("end");

    const retryDiv = document.createElement("div");
    retryDiv.classList.add("retry");

    const retryButton = document.createElement("button");
    retryButton.textContent = "Play Again!";
    retryButton.addEventListener("click", retry);

    const overallResult = getOverallResult();
    const resultColor = getResultColor();

    endResult.textContent = overallResult + `You won ${humanScore} times, lost ${computerScore} times, and tied ${roundCount - humanScore - computerScore} times. Thanks for playing!`;

    endResult.style.backgroundColor = resultColor;
    retryButton.style.backgroundColor = resultColor;

    retryDiv.appendChild(retryButton);
    endResult.appendChild(retryDiv);
    resultBox.appendChild(endResult);
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

retry();
