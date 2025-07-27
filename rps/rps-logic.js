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

function getHumanChoice() {
    return prompt("Please enter your choice (Rock, Paper, or Scissors):").toLowerCase().trim();
}

function playGame(rounds) {
    let humanScore = 0, computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        const map = new Map();
        map.set("rock", "scissors");
        map.set("paper", "rock");
        map.set("scissors", "paper");

        if(humanChoice == computerChoice) {
            console.log("Tie! Both players chose " + humanChoice);
        }
        else if(humanChoice == map.get(computerChoice)) {
            console.log(`You Lose! You chose ${humanChoice} and the computer chose ${computerChoice}`);
            ++computerScore;
        }
        else {
            console.log(`You Win! You chose ${humanChoice} and the computer chose ${computerChoice}`);
            ++humanScore;
        }
    }

    for(let i = 0; i < rounds; ++i) {
        playRound(getHumanChoice(), getComputerChoice());
    }

    console.log(`You won ${humanScore} times, lost ${computerScore} times, and tied ${rounds - humanScore - computerScore} times. Thanks for playing!`);
}

// Todo: add a button to request rounds played, a restart button
playGame(5);