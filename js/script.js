// atributos htrtml
const inputs = document.querySelector(".inputs"),
    resetBtn = document.querySelector(".reset-btn"),
    hint = document.querySelector(".hint span"),
    wrongLetter = document.querySelector(".wrongLetter span"),
    intentos = document.querySelector(".intentos span"),
    typingInput = document.querySelector(".typing-input");
// variable globales
let word, maxIntentos, corrects = [],
    incorrects = [];

function randomWord() {
    // Get randow Objeto
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.palabra; // Getting palabra
    //let hint = ranObj.pista; //Getting pista
    maxIntentos = 6;
    corrects = [];
    incorrects = [];

    hint.innerText = ranObj.pista;
    intentos.innerText = maxIntentos;
    wrongLetter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += '<input type="text"  class="text">';

    }
    inputs.innerHTML = html;
}
randomWord();
// Iniciar
function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(` ${key}`)) {

        if (word.includes(key)) { //if user letter found in the word
            for (let j = 0; j < word.length; j++) {
                // Show matched lleter on Input
                if (word[j] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[j].value = key;
                }
            }
        } else {
            maxIntentos--; // gusses left -1
            incorrects.push(` ${key}`)
        }
        wrongLetter.innerText = incorrects;
        intentos.innerText = maxIntentos;
    }
    typingInput.value = "";
    // GAME / GAME OVER
    setTimeout(() => {
        if (corrects.length === word.length) {
            alert("VICTORY!!!");
            randomWord(); // reset Gamed
        } else if (maxIntentos < 1) { // Lose
            alert("GAME OVER!!!");
            for (let j = 0; j < word.length; j++) {
                // Show matched lleter on Input
                inputs.querySelectorAll("input")[j].value = word[j];
            }
        }
    });
}
// addd Event
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("keydown", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());