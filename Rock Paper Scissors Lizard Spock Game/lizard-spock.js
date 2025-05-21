//* Get DOM Elements
const rulesBtn = document.querySelector('.rules-btn');
const closeBtn = document.querySelector('.close-modal-btn');
const rulesModal = document.querySelector('.modal-container');

const gameLogic = [
    {
        id: 1,
        name: 'rock',
        beats: 'lizard',
        beats: 'scissors'
    },
    {
        id: 2,
        name: 'paper',
        beats: 'rock',
        beats: 'spock'
    },
    {
        id: 3,
        name: 'scissors',
        beats: 'paper',
        beats: 'lizard'
    },
    {
        id: 4,
        name: 'lizard',
        beats: 'spock',
        beats: 'paper'
    },
    {
        id: 5,
        name: 'spock',
        beats: 'scissors',
        beats: 'rock'
    }
]

const gameButtons = document.querySelectorAll('.choice-btn');
const gameArea = document.querySelector('.game');
const resultsContainer = document.querySelector('.results');
const resultsDivs = document.querySelectorAll('.result');

const playAgainBtn = document.querySelector('.play-again-btn');
const winnerOrLoser = document.querySelector('.winner-or-loser');
const winLoseText = document.querySelector('.win-lose-text');


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
    // displayWinner([playerChoice, houseChoice]);
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
        const playerWins = isWinner(results);
        const houseWins = isWinner(results.reverse()); //? Reverses the array to check if the house won i.e  in the playerChose function displayWinner([playerChoice, houseChoice]) becomes displayWinner([houseChoice, playerChoice])

        if (playerWins) {
        winLoseText.textContent = 'You Win!';
        resultsDivs[0].classList.toggle('winner');
        trackScore(1);
        } 
        else if (houseWins) {
            winLoseText.textContent = 'You Lose!';
            resultsDivs[1].classList.toggle('winner');
            trackScore(-1);
        } 
        else {
            winLoseText.textContent = 'Draw!';
        }
    }, 1200);

    winnerOrLoser.classList.toggle('hidden');
    resultsContainer.classList.toggle('show-winner-or-loser');

}

function isWinner(results) {
    return results[0].beats === results[1].name;
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