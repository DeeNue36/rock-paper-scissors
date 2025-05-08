//* Get DOM Elements
const rulesBtn = document.querySelector('.rules-btn');
const closeBtn = document.querySelector('.close-modal-btn');
const rulesModal = document.querySelector('.modal-container');

//* Show & Hide Rules Modal
rulesBtn.addEventListener('click', () => {
    rulesModal.classList.toggle('show-modal');
    // rulesModal.classList.add('show-modal');
    // rulesModal.classList.remove('hide-modal');
});

closeBtn.addEventListener('click', () => {
    rulesModal.classList.toggle('show-modal');
    // rulesModal.classList.add('hide-modal');
    // rulesModal.classList.remove('show-modal');
})