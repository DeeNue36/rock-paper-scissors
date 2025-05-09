//* Get DOM Elements
const rulesBtn = document.querySelector('.rules-btn');
const closeBtn = document.querySelector('.close-modal-btn');
const rulesModal = document.querySelector('.modal-container');

const gameLogic = [
    {
        id: 1,
        name: 'rock',
        beats: 'scissors',
        // loses: 'paper'
    },
    {
        id: 2,
        name: 'paper',
        beats: 'rock',
        // loses: 'scissors'
    },
    {
        id: 3,
        name: 'scissors',
        beats: 'paper',
        // loses: 'rock'
    }
]

const playerChoice = document.querySelectorAll('.choice-btn');
const gameArea = document.querySelector('.game');
const resultsArea = document.querySelector('.results');
const resultsDivs = document.querySelectorAll('.result');
// const playerChoiceResult = document.querySelector('.player-choice-result');
// const houseChoiceResult = document.querySelector('.house-choice-result');


//* Game Logic

//? Adds a click event listener to each button & passes the value to the choice variable which calls the choose function
playerChoice.forEach( button => {
    button.addEventListener( 'click', () => {
        //? Get the player's choice
        const playerChoiceName = button.dataset.choice;
        // console.log(playerChoiceName);

        //? Finds the choice by looping through the gameLogic array & checking if the name property matches the playerChoiceName variable when the button is clicked.
        const choice = gameLogic.find(choice => choice.name === playerChoiceName); 
        choose(choice);
    });
});

function choose(choice) {
    const houseChoice = houseChose();
    displayResults([choice, houseChoice]);
}

function houseChose() {
    // ? Generate a random number between 0 and the length of the gameLogic array and floor(approximate) it
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

    // console.log(results);

    gameArea.classList.toggle('hidden');
    resultsArea.classList.toggle('hidden');

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
})