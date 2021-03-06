let numRounds;
let roundsPlayed;
let options = ['rock', 'paper', 'scissors'];
let cpuSelect;
let numWin, numLoss, numTie;

function startGame() {
    //test query selector later
    numRounds = parseInt(document.forms["my-form"]["number"].value);

    //validates number
    if (numRounds < 1 || numRounds > 100) {
        document.getElementById("warning-dialog").style.display = "block";
        return;
    }

    clearValues();

    document.getElementById("warning-dialog").style.display = "none";
    document.getElementById("title-1").style.display = "none";

    document.getElementById("title-2").style.display = "block";

    //make the form disappear
    document.getElementsByName("my-form")[0].style.display = "none";
    //make the buttons appear
    document.getElementById("game").style.display = "block";

    document.getElementById("round-count").innerHTML = "Rounds: " + roundsPlayed + "/" + numRounds;

}

function resetGame() {
    clearHTMLValues();
    document.getElementById("game").style.display = "none";
    document.getElementById("rematch-container").style.display = "none";
    document.getElementsByName("my-form")[0].style.display = "block";
    document.getElementById("title-1").style.display = "block";
    document.getElementById("title-2").style.display = "none";
}

function clearValues() {
    clearBackground();
    numWin = 0;
    numLoss = 0;
    numTie = 0;
    roundsPlayed = 0;
}

function clearHTMLValues() {
    document.getElementById("game-console").innerHTML = "Select an option.";
    document.getElementById("won-count").innerHTML = "Won: 0";
    document.getElementById("lost-count").innerHTML = "Lost: 0";
    document.getElementById("tied-count").innerHTML = "Tied: 0"
    document.getElementById("round-count").innerHTML = "Round 0/0";
}

function playRound(playerChoice) {
    clearBackground();
    if (roundsPlayed < numRounds) {
        cpuChoice = Math.floor(Math.random() * 3);
        calcRoundWinner(playerChoice, cpuChoice);
        if (roundsPlayed === numRounds) {
            calcGameWinner();
        }
    }
}

function clearBackground() {
    document.getElementsByClassName("option-button")[0].style.background = "#F8F8F8";
    document.getElementsByClassName("option-button")[1].style.background = "#F8F8F8";
    document.getElementsByClassName("option-button")[2].style.background = "#F8F8F8";
}

function calcGameWinner() {
    if (numWin > numLoss) {
        document.getElementById("game-console").innerHTML += "<br>Congratulations! You won " + numWin + " to " + numLoss + ".";
    } else if (numWin < numLoss) {
        document.getElementById("game-console").innerHTML += "<br>You lost " + numWin + " to " + numLoss + ". Try again.";
    } else {
        document.getElementById("game-console").innerHTML += "<br>You tied " + numWin + " to " + numLoss + ". Rematch?";
    }
    document.getElementById("rematch-container").style.display = "block";
}

function calcRoundWinner(pChoice, cChoice) {
    if (pChoice === cChoice) {
        //tie game
        numTie++;
        document.getElementById("tied-count").innerHTML = "Tied: " + numTie;
        document.getElementById("game-console").innerHTML = "The CPU also chose " + options[cChoice] + ". Its a tie.";
        document.getElementsByClassName("option-button")[pChoice].style.background = "#E2F6FF";
    } else if (pChoice === 0 && cChoice === 2 || pChoice === 1 && cChoice === 0 || pChoice == 2 && cChoice === 1) {
        //player wins
        numWin++;
        document.getElementById("won-count").innerHTML = "Won: " + numWin;
        document.getElementById("game-console").innerHTML = "The CPU chose " + options[cChoice] + ". You won!";
        document.getElementsByClassName("option-button")[pChoice].style.background = "#E2FFE5";
    } else {
        //cpu wins
        numLoss++;
        document.getElementById("lost-count").innerHTML = "Lost: " + numLoss;
        document.getElementById("game-console").innerHTML = "The CPU chose " + options[cChoice] + ". You lost.";
        document.getElementsByClassName("option-button")[pChoice].style.background = "#FFE2E2";
    }

    roundsPlayed++;
    document.getElementById("round-count").innerHTML = "Round: " + roundsPlayed + "/" + numRounds;
}