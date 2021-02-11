const bodyParts = document.querySelectorAll('.body-part');

const keyboardBtn = document.querySelector('.toggle-keyboard');
const keyboard = document.querySelector('.screen-keyboard');
const keyboardBtns = document.querySelectorAll('.alphabet-letter');
const wrongLetters = document.querySelector('.letters-list');
const wordList = document.querySelector('.word-list');
const gameInfoBlock = document.querySelector('.game-info');
const gameInfo = document.querySelector('.line-1');

const formLayer = document.querySelector('.form-layer');
const input = document.querySelector('.input');
const startBtn = document.querySelector('.start-btn');

const countdownCounter = document.querySelector('.counter');
const countdownLayer = document.querySelector('.countdown-layer');

const wordSpan = document.querySelector('.word');

let isStart = false;
let isGame = true;
let counter = 0;
let word = "";


startBtn.addEventListener('click', (e) => {

    word = input.value;
    
    if(word !== "") {
        isStart = true;
        formLayer.style.display = "none";

        let i = 2;
        const countdown = setInterval(() => { 
            countdownCounter.innerText = i;
            i--;
            if(i == -1) {
                clearInterval(countdown);
                countdownLayer.style.display = "none";
            }
        }, 1000);

    }

    if(isStart === true) {

        drawLetters(word);
    
        keyboardBtn.addEventListener('click', toggleKeyboard);
            
        document.addEventListener('keyup', (e) => writeLetters(word, e.key));
    
        keyboardBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                writeLetters(word, btn.innerText.toLowerCase())
            })
        })
    
    }

});

const drawLetters = (word) => {
    for(let i = 0; i < word.length; i++) {
        const wordLetter = document.createElement('li');
        wordLetter.classList.add('word-letter');
        wordList.appendChild(wordLetter);
    }
}

const toggleKeyboard = () => {
    if(keyboardBtn.innerText.toLowerCase() === "hide keyboard") {
        keyboard.style.opacity = "0";
        keyboardBtn.innerText = "keyboard";
    } else {
        keyboard.style.opacity = "1";
        keyboardBtn.innerText = "hide keyboard";
    }
}

const letterPositions = (word, key) => {
    const positionsArray = [];

    for(let i = 0; i < word.length; i++) {
        if(word[i] === key) {
            positionsArray.push(i);
        }
    }

    return positionsArray;
}

const drawBody = (word) => {
    if(counter === 5) {
        bodyParts[counter].style.opacity = "1";
        isGame = false;
        finishGame("lost", word);
    } else {
        bodyParts[counter].style.opacity = "1";
        counter++;
    }
}

const writeLetters = (word, key) => {
    const positionsArray = letterPositions(word, key);

    if(positionsArray.length === 0) {
        const wrongLetter = document.createElement('li');
        drawBody(word);
        wrongLetter.classList.add('wrong-letter');
        wrongLetter.innerText = key;
        wrongLetters.appendChild(wrongLetter);
    } else {
        const wordLetters = document.querySelectorAll('.word-letter');
        for(let i = 0; i < positionsArray.length; i++) {
            wordLetters[positionsArray[i]].innerText = key;
        }
        checkStatusGame(wordLetters);
        finishGame("win", word);
    }

}

const checkStatusGame = (wordLetters) => {
    let emptySpots = 0;

    wordLetters.forEach(letter => {
        if(letter.innerHTML == "") {
            emptySpots++;
        }
    })

    if(emptySpots === 0) {
        isGame = false;
    } else {
        isGame = true;
    }
}

const finishGame = (status, word) => {
    if(!isGame) {
        if(status === "win") {
            gameInfoBlock.style.display = "flex";
            gameInfo.innerText = "you won!";
            document.body.style.overflow = "hidden";
        } else if(status === "lost") {
            gameInfoBlock.style.display = "flex";
            gameInfo.innerText = "you lost :(";
            document.body.style.overflow = "hidden";
        }
        wordSpan.innerText = `${word} was the word to guess`;
    }
}


