//* Get DOM Elements
const rulesBtn = document.querySelector('.rules-btn');
const resetBtn = document.querySelector('.reset-btn');
const closeBtn = document.querySelector('.close-modal-btn');
const rulesModal = document.querySelector('.modal-container');

const gameLogic = [
    {
        id: 1,
        name: 'rock',
        beats: 'scissors',
    },
    {
        id: 2,
        name: 'paper',
        beats: 'rock',
    },
    {
        id: 3,
        name: 'scissors',
        beats: 'paper'
    }
]


//* Get Game & Game Results Section DOM Elements
const playerChoice = document.querySelectorAll('.choice-btn');
const gameArea = document.querySelector('.game');
const resultsContainer = document.querySelector('.results');
const resultsDivs = document.querySelectorAll('.result');
// const playerChoiceResult = document.querySelector('.player-choice-result');
// const houseChoiceResult = document.querySelector('.house-choice-result');

const winnerOrLoser = document.querySelector('.winner-or-loser');
const winLoseText = document.querySelector('.win-lose-text');

const playAgainBtn = document.querySelector('.new-game-btn');

//* Keeping track of the player's score
const scoreCount = document.getElementById('score-count');
let playerScore = 0;

// * Keeping track of the house's/AI's score
const houseScoreCount = document.getElementById('house-score-count');
let houseScore = 0;

//*  Retrieve the stored score from local storage
let storedScore = localStorage.getItem('playerScore');

//*  If a stored score exists, update the playerScore variable and the score display
if (storedScore) {
    playerScore = parseInt(storedScore);
    scoreCount.innerText = playerScore;
}


//*  Game Logic

//? Adds a click event listener to each button & passes the value to the choice variable which calls the choose function
playerChoice.forEach( button => {
    button.addEventListener( 'click', () => {
        //? Get the player's choice
        const playerChoiceName = button.dataset.choice;

        //? Finds the choice by looping through the gameLogic array & checking if the name property matches the playerChoiceName variable when the button is clicked.
        const choice = gameLogic.find(choice => choice.name === playerChoiceName); 
        thePlayerChose(choice);
    });
});


function thePlayerChose(choice) {
    const houseChoice = houseChose();
    displayResults([choice, houseChoice]);
    displayWinner([choice, houseChoice]);
}

function houseChose() {
    // ? Returns a random number between 0 and the length of the gameLogic array and floors(approximates) it
    // ? In simpler terms, it randomly selects the index number of an object in the gameLogic array and returns that object
    const randomChoice = Math.floor( Math.random() * gameLogic.length )
    return gameLogic[randomChoice];
}

function displayResults(results) {
    //? Loop through the results array and display the player's choice and the house's choice
    resultsDivs.forEach((resultDiv, index) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="choice ${results[index].name}">
                    <img src="assets/icon-${results[index].name}.svg" alt="${results[index].name}" />
                </div>
            `
        }, index * 1200);
    });

    gameArea.classList.toggle('hidden');
    resultsContainer.classList.toggle('hidden');

    //! Another way to do it using playerChoiceResult & houseChoiceResult variables
    // results.forEach((result, index) => {
    //     setTimeout(() => {
    //         if(index === 0) {
    //             playerChoiceResult.innerHTML = `
    //                 <div class="choice ${result.name}">
    //                     <img src="assets/icon-${result.name}.svg" alt="${result.name}" />
    //                 </div>
    //             `
    //         } else {
    //             houseChoiceResult.innerHTML = `
    //                 <div class="choice ${result.name}">
    //                     <img src="assets/icon-${result.name}.svg" alt="${result.name}" />
    //                 </div>
    //             `
    //         }
    //     }, index * 1000);
    // });

}


function displayWinner(results) {
    setTimeout(() => {
        const playerWins = isWinner(results);
        const houseWins = isWinner(results.reverse());

        if(playerWins) {
            winLoseText.innerText = 'You Win!';
            resultsDivs[0].classList.toggle('winner');
            trackScore(1);
        } 
        else if(houseWins) {
            winLoseText.innerText = 'You Lose!';
            resultsDivs[1].classList.toggle('winner');
            trackHouseScore(1);
        } 
        else {
            winLoseText.innerText = 'Draw!';
        }

        winnerOrLoser.classList.toggle('hidden');
        resultsContainer.classList.toggle('show-winner-or-loser');
    }, 1000);


}


function isWinner(results) {
    return results[0].beats === results[1].name;
}

playAgainBtn.addEventListener('click', () => {
    gameArea.classList.toggle('hidden');
    resultsContainer.classList.toggle('hidden');

    resultsDivs.forEach(resultDiv => {
        resultDiv.innerHTML = '';
        resultDiv.classList.remove('winner');
    });

    winLoseText.innerText = "";
    winnerOrLoser.classList.toggle('hidden');
    resultsContainer.classList.toggle('show-winner-or-loser');
});

function trackScore(point) {
    if ( point < 0 ) {
        return;
    }
    else {
        playerScore += point;
        scoreCount.innerText = playerScore;
    }
    storeScore();  // Save the score to local storage
}

function trackHouseScore (point) {
    if (point<0) {
        return;
    }
    else {
        houseScore += point;
        houseScoreCount.innerText = houseScore;
    }
    storeScore();  // Save the score to local storage
}


//* Maintain the state of the score when the browser is reloaded
function storeScore() {
    localStorage.setItem('playerScore', playerScore);
}


//* Show & Hide Rules Modal
rulesBtn.addEventListener('click', () => {
    rulesModal.classList.toggle('show-modal');
    //OR rulesModal.classList.add('show-modal');
    // rulesModal.classList.remove('hide-modal');
});

closeBtn.addEventListener('click', () => {
    rulesModal.classList.toggle('show-modal');
    //OR rulesModal.classList.add('hide-modal');
    // rulesModal.classList.remove('show-modal');
});


// * Close the modal when the user clicks outside of it
window.addEventListener('click', e => {
    if(e.target === rulesModal) {
        rulesModal.classList.toggle('show-modal');
    }
});

// * Reset the score when the reset button is clicked
resetBtn.addEventListener('click', () => {
    //?  If the results are being shown, do not reset the score
    if ( !resultsContainer.classList.contains('hidden') ) {
        return; // returns without executing the rest of the function
    }

    playerScore = 0;
    scoreCount.innerText = playerScore;
    localStorage.removeItem('playerScore'); // Clear the score from local storage. Not doing this will display your last score on page reload
});


// Todo: Prevent the score from going below zero and instead add a score section for the computer
// Todo:  Add a reset button — DONE
// Todo:  Add a high score tracker
// Todo:  Do Rock Paper Scissors Lizard Spock in a new branch