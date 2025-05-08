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
const displayResults = document.querySelectorAll('.result');
// const playerChoiceResult = document.querySelector('.player-choice-result');
// const houseChoiceResult = document.querySelector('.house-choice-result');


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