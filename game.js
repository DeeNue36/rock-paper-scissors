//* Get DOM Elements
const rulesBtn = document.querySelector('.rules-btn');
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


//* Rock Paper Scissors Game Logic


//* Adds a click function to each button & passes the value to the choice variable which calls the choose function
playerChoice.forEach( button => {
    button.addEventListener( 'click', () => {
        //? Get the player's choice
        const playerChoiceName = button.dataset.choice;

        //? Finds the player's choice by looping through the gameLogic array & checking if the name matches the name of the button that  it is clicked.
        const choice = gameLogic.find(choice => choice.name === playerChoiceName); 
        thePlayerChose(choice);
    });
});


//? The player's choice is passed to the thePlayerChose function which calls the houseChose function
// * Function to display the player's choice & the house's choice, display the results & determine the winner/loser/tie
function thePlayerChose(choice) {
    const houseChoice = houseChose();
    displayResults([choice, houseChoice]);
    displayWinner([choice, houseChoice]);
}


// * Function to randomly select the house's choice
function houseChose() {
    // ? Returns a random number between 0 and the length of the gameLogic array and floors(approximates) it
    // ? In simpler terms, it randomly selects the index number of an object in the gameLogic array and returns that object
    const randomChoice = Math.floor( Math.random() * gameLogic.length )
    return gameLogic[randomChoice];
}


//* Display the player's choice & the house's choice e.g  Player — Rock & House — Scissors
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


// * Determines the winner of a round by checking if the player or the house(AI) won 
function displayWinner(results) {
    setTimeout(() => {
        const playerWins = isWinner(results);
        const houseWins = isWinner(results.reverse()); //? Reverses the array to check if the house won i.e  in the playerChose function displayWinner([choice, houseChoice]) becomes displayWinner([houseChoice, choice])

        //? Win, Lose or Draw Conditions
        if(playerWins) {
            winLoseText.innerText = 'You Win!';
            resultsDivs[0].classList.toggle('winner');
            trackScore(1);
        } 
        else if(houseWins) {
            winLoseText.innerText = 'You Lose!';
            resultsDivs[1].classList.toggle('winner');
            trackScore(-1);
        } 
        else {
            winLoseText.innerText = 'Draw!';
        }

        winnerOrLoser.classList.toggle('hidden');
        resultsContainer.classList.toggle('show-winner-or-loser');
    }, 1000);


}


// * Function to determine who wins
function isWinner(results) {
    return results[0].beats === results[1].name;
}


// *  Start a new round of rock paper scissors and reset the page to its initial state
playAgainBtn.addEventListener('click', () => {
    gameArea.classList.toggle('hidden');
    resultsContainer.classList.toggle('hidden');

    //? Clear the player's choice and the house's choice
    resultsDivs.forEach(resultDiv => {
        resultDiv.innerHTML = '';
        resultDiv.classList.remove('winner');
    });

    winLoseText.innerText = "";
    winnerOrLoser.classList.toggle('hidden');
    resultsContainer.classList.toggle('show-winner-or-loser');
});


// * Keep track of the player's score
function trackScore(point) {
    playerScore += point;
    scoreCount.innerText = playerScore;
}


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