//* Get DOM Elements
const rulesBtn = document.querySelector('.rules-btn');
const closeBtn = document.querySelector('.close-modal-btn');
const rulesModal = document.querySelector('.modal-container');

const gameLogic = [
    {
        id: 1,
        name: 'rock',
        beats: ['lizard', 'scissors'],
        losesTo: ['paper', 'spock'],
    },
    {
        id: 2,
        name: 'paper',
        beats: ['rock','spock'],
        losesTo: ['scissors', 'lizard'],
    },
    {
        id: 3,
        name: 'scissors',
        beats: ['paper','lizard'],
        losesTo: ['rock', 'spock'],
    },
    {
        id: 4,
        name: 'lizard',
        beats: ['spock', 'paper'],
        losesTo: ['rock', 'scissors'],
    },
    {
        id: 5,
        name: 'spock',
        beats: ['scissors', 'rock'],
        losesTo: ['lizard', 'paper'],
    }
]


const gameButtons = document.querySelectorAll('.choice-btn');
const gameArea = document.querySelector('.game');
const resultsContainer = document.querySelector('.results');
const resultsDivs = document.querySelectorAll('.result');


const playAgainBtn = document.querySelector('.new-game-btn');
const winnerOrLoser = document.querySelector('.winner-or-loser');
const winLoseText = document.querySelector('.win-lose-text');


const scoreCount = document.querySelector('#score-count');
let playerScore = 0;


//* Rock Paper Scissors Lizard Spock Game Logic

gameButtons.forEach(gameButton => {
    gameButton.addEventListener('click', () => {
        const playerChoiceName = gameButton.dataset.choice;
        const playerChoice = gameLogic.find(playerChoice => playerChoice.name === playerChoiceName);
        thePlayerChose(playerChoice);
    });
});


function thePlayerChose(playerChoice) {
    const houseChoice = houseChose();
    displayResults([playerChoice, houseChoice]);
    displayWinner([playerChoice, houseChoice]);
}


function houseChose() {
    const randomChoice = Math.floor( Math.random() * gameLogic.length );
    return gameLogic[randomChoice];
}


function displayResults(results) {
    resultsDivs.forEach((resultDiv, index) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class= "choice ${results[index].name}">
                    <img src="../assets/icon-${results[index].name}.svg" alt="${results[index].name}" />
                </div>    
            `
        }, index * 1200);
    });

    gameArea.classList.toggle('hidden');
    resultsContainer.classList.toggle('hidden');
}


function displayWinner(results) {
    setTimeout(() => {
        if (isPlayerWinner(results)) {
            winLoseText.textContent = 'You Win!';
            resultsDivs[0].classList.toggle('winner');
            trackScore(1);
        } 
        else if (isHouseWinner(results)) {
            winLoseText.textContent = 'You Lose!';
            resultsDivs[1].classList.toggle('winner');
            trackScore(-1);
        } 
        else {
            winLoseText.textContent = 'Draw!';
        }

        winnerOrLoser.classList.toggle('hidden');
        resultsContainer.classList.toggle('show-winner-or-loser');

    }, 1200);

    
}


function isPlayerWinner(results) {
    return results[0].beats.includes(results[1].name) || results[1].losesTo.includes(results[0].name);
    /* 
        results[0] is the player's choice and results[1] is the house's choice
        results[0].beats is the array/list of choices that the player's choice can beat
        .includes(results[1].name) checks if the house's choice is included in the beats array/list and returns true or false
        All together, this line of code checks if the player's choice beats the house's choice

        results[1].losesTo is the array/list of choices that the house's choice can lose to
        .includes(results[0].name) checks if the player's choice is included in the losesTo array/list and returns true or false
        All together, this line of code checks if the house's choice loses to the player's choice

        Starting from the OR(||) operator the statement can be removed as the function isHouseWinner does the opposite check i.e . if the house wins

        The function returns true if the player's choice beats the house's choice or the house's choice loses to the player's choice
    */
}


function isHouseWinner(results) {
    return results[1].beats.includes(results[0].name) || results[0].losesTo.includes(results[1].name);
    /* 
        results[1] is the house's choice and results[0] is the player's choice
        results[1].beats is the array/list of choices that the house's choice can beat
        .includes(results[0].name) checks if the player's choice is included in the beats array/list and returns true or false
        All together, this line of code checks if the house's choice beats the player's choice

        results[0].losesTo is the array/list of choices that the player's choice can lose to
        .includes(results[1].name) checks if the house's choice is included in the losesTo array/list and returns true or false
        All together, this line of code checks if the player's choice loses to the house's choice

        Starting from the OR(||) operator the statement can be removed as the function isPlayerWinner does the opposite check i.e . if the player wins

        The function returns true if the house's choice beats the player's choice or the player's choice loses to the house's choice
    */
}


function trackScore(points) {
    playerScore += points;
    scoreCount.textContent = playerScore;
}


playAgainBtn.addEventListener('click', () => {
    //? Show the game div and hide the results div
    gameArea.classList.toggle('hidden');
    resultsContainer.classList.toggle('hidden');

    //? Clear the player's choice and the house's choice divs
    resultsDivs.forEach(resultDiv => {
        resultDiv.innerHTML = '';
        resultDiv.classList.remove('winner');
    });

    //? Clear the winner or loser text
    winLoseText.textContent = "";

    //? Hide the winner or loser div
    winnerOrLoser.classList.toggle('hidden');
    resultsContainer.classList.toggle('show-winner-or-loser');
});

//* Disable Play Beginner button if the results div is displayed to prevent users from going back to the beginner game
const beginnerGameBtn = document.querySelector('.beginner-game-btn');
beginnerGameBtn.addEventListener('click', function(e) {
    if (!resultsContainer.classList.contains('hidden')) {
        e.preventDefault(); //? Prevents the default action of the button when the result is being displayed
    }
});


//* Show & Hide the Rules Modal
rulesBtn.addEventListener('click', () => {
    rulesModal.classList.toggle('show-modal');
    //OR rulesModal.classList.add('show-modal');
    // rulesModal.classList.remove('hide-modal');
});

closeBtn.addEventListener('click', () => {
    rulesModal.classList.toggle('show-modal');
    //OR rulesModal.classList.add('hide-modal');
    // rulesModal.classList.remove('show-modal');
})