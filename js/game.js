const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const jogadas = document.querySelector('.jogadas');

const characters = [
    'aries',
    'touro',
    'gemeos',
    'cancer',
    'leao',
    'virgem',
    'libra',
    'sagitario',
    'escorpiao',
    'capricornio',
    'aquario',
    'peixes',
];

/* const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
]; */

let firstCard = '';
let secondCard = '';
let sec = '0';
let min = '0';

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disable-card');

    /*if(disabledCards.length == 20){*/
    if (disabledCards.length == 24) {
        clearInterval(this.loop);
        setTimeout(() => {
            const gameOverLayer = document.getElementById('gameOver'); // Caso tenha gameOver vamos pegar pelo ID a nossa tela de gameOver
            const msgGameOver = document.getElementById('msgGameOver');

            msgGameOver.innerHTML = `Parabéns, ${spanPlayer.innerHTML}!<br><br> Seu tempo foi: ${timer.innerHTML} em ${jogadas.innerHTML} jogadas.`;
            gameOverLayer.style.display = 'flex'; // Mudar o display dela pra flex
            /*alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);*/
        }, 500);
    }
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
    const currentJogada = +jogadas.innerHTML;
    jogadas.innerHTML = currentJogada + 1;
};

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
};

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    /*     front.style.backgroundImage = `url('../images/${character}.png')`;*/
    front.style.backgroundImage = `url('../images/cdz/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    grid.appendChild(card);

    card.addEventListener('click', revealCard);

    card.setAttribute('data-character', character);

    return card;
};

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

const twodigits = (digit) => {
    if (digit < 10) {
        return '0' + digit;
    } else {
        return digit;
    }
};

const startTimer = () => {
    this.loop = setInterval(() => {
        sec++;
        if (sec == 60) {
            min++;
            sec = 0;
        }
        /*const currentTime = +timer.innerHTML;*/
        timer.innerText = twodigits(min) + ':' + twodigits(sec);
    }, 1000);
};

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');

    startTimer();
    loadGame();
};

const restart = () => {
    grid.innerHTML = '';
    timer.innerHTML = '';
    sec = '0';
    min = '0';
    jogadas.innerHTML = '';
    firstCard = '';
    secondCard = '';

    let gameOverLayer = document.getElementById('gameOver'); // Escondendo nossa tela de Game Over
    gameOverLayer.style.display = 'none';

    startTimer();
    loadGame();
};

const inicio = () => {
    window.location = '../index.html';
};
