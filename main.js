let usedLetters = [];
let word = "";
let tries = 6;
let key = "";
let wordArray = [];
let answer = ["", "", "", "", ""];
let gameOver = false;
const buttons = document.querySelectorAll(".letter-button");

getWord();
for (let button of buttons) {
    button.addEventListener("click", () => {
    key = button.innerHTML;
    if (tries > 0 && !gameOver) {
        game(button);
    } else {
        setMessage("gameOver");
        }
    });
}

async function getWord() {
    const res = await fetch(
    "https://words.dev-apis.com/word-of-the-day?random=1"
    );
    const { word: wordRes } = await res.json();
    word = wordRes.toUpperCase();
    wordArray = word.split("");
}

function game(button) {
    if (usedLetters.includes(key)) {
    setMessage("retry");
    } else if (wordArray.includes(key)) {
    button.style.backgroundColor = "green";
    placeLetter(key);
    usedLetters.push(key);
    updateAnswer();
    evaluateAnswer();
    } else {
    button.style.backgroundColor = "red";
    tries -= 1;
    setMessage("incorrect");
    usedLetters.push(key);
    }
}

function setMessage(status) {
    const message = document.querySelector("#message");
    if (status === "correct") {
    message.innerHTML = "Good job!";
    } else if (status === "incorrect" && tries === 0) {
    message.innerHTML = "Nice try! The word was " + word + "<br>Game Over!";
    restart();
    } else if (status === "incorrect") {
    message.innerHTML = `This letter is not in the word!<br>Tries remaining: ${tries}`;
    } else if (status === "retry") {
    message.innerHTML = "This letter was already used!";
    } else if (status === "gameOver") {
    message.innerHTML = "Game Over!";
    } else if (status === "win") {
    message.innerHTML = "Congrations, you won!";
    restart();
    }
}

function placeLetter(key) {
    for (let i = 0; i <= wordArray.length; i++) {
        if (key === wordArray[i]) {
        const slot = document.querySelector("#slot-" + i);
        slot.innerHTML = key;
        }
    }
}

function restart() {
    const restartButton = document.querySelector("#restart-button");
    restartButton.style.visibility = "visible";
    const refreshPage = () => {
    window.location.reload();
    };
        restartButton.addEventListener("click", refreshPage);
}

function updateAnswer() {
    for (let i = 0; i < wordArray.length; i++) {
    if (key === wordArray[i]) {
        answer.splice(i, 1, key);
        }
    }
}

function evaluateAnswer() {
    if (arraysEqual(answer, wordArray)) {
    setMessage("win");
    gameOver = true;
    } else {
    setMessage("correct");
    }
}

function arraysEqual(a1, a2) {
    return JSON.stringify(a1) === JSON.stringify(a2);
}
