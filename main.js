let name, word, word_def, word_array, lives, score;
let words = ["committee", "tattoo", "electricity", "airplane", "tank", "mountain", "tomato", "apple", "military", "noxious"];
let words_defs = ["A group of people appointed for a specific function.",
                "The permanent insertion of ink below the skin.",
                "A form of energy resulting from the existence of charged particles.",
                "A powered flying vehicle with fixed wings.",
                "A heavy armored fighting vehicle.",
                "A large natural elevation of the earth's surface.",
                "The edible fruit that is eaten as a vegetable.",
                "The round fruit of a tree of the rose family.",
                "The armed forces of a country.",
                "Harmful and unpleasant."]




function addButtons() {
    for (let i = 0; i < 26; i++) {
        let button = document.createElement("button");
        button.onclick = function(){checkLetter(this.innerHTML)};
        button.innerHTML = String.fromCharCode(97 + i);
        document.getElementById("buttons").appendChild(button);
    }
}

function enableButtons() {
    let buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
    }
}

function start() {
    name = document.getElementById("name").value;
    if (name === "") {
        alert("Error! Name can't be empty.")
        return;
    }
    document.getElementById("welcome").style.display = "none";
    document.getElementById("game").style.display = "block";
    nextWord();
    resetScoreAndLives();
    updateScoreAndLives();
}

function nextWord() {
    enableButtons();
    generateWord();
    updateWord();
    document.getElementById("definition").innerHTML = word_def;
}

function generateWord() {
    let index = Math.round(Math.random() * (words.length - 1));
    word = words[index].split("");
    word_def = words_defs[index];
    word_array = [];
    for (let i = 0; i < word.length; i++) {
        word_array.push("_");
    }
    console.log(words[index]);
}

function resetScoreAndLives() {
    score = 0;
    lives = 7;
}

function updateScoreAndLives() {
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("lives").innerHTML = "Lives: " + lives;
}

function updateWord() {
    document.getElementById("word").innerHTML = word_array.join(" ");
}

function checkLetter(letter) {
    let isLetterInWord = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            word_array[i] = letter;
            score += 1;
            isLetterInWord = true;
        }
    }
    if (!isLetterInWord) {
        lives -= 1;
        score -= 1;
    }
    disableButton(letter);
    updateScoreAndLives();
    updateWord();
    isWordGuessed();
    isGameOver();
}

function isWordGuessed() {
    if (!word_array.includes("_")){
        console.log("Good job!");
        nextWord();
    }
}

function disableButton(letter) {
    let buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerHTML === letter){
            buttons[i].disabled = true;
            break;
        }
    }
}

function isGameOver() {
    if (lives === 0) {
        document.getElementById("game").style.display = "none";
        document.getElementById("gif").style.display = "block";
        document.getElementById("gif").src = "";
        document.getElementById("gif").src = "game_over.gif";
        document.getElementById("result").innerHTML = name + ": " + score;
        setTimeout(function(){
            document.getElementById("gif").style.display = "none";
            document.getElementById("game_over").style.display = "block";
        }, 10000);
    }
}

function restart() {
    resetScoreAndLives();
    updateScoreAndLives();
    nextWord();
    document.getElementById("game_over").style.display = "none";
    document.getElementById("game").style.display = "block";
}

function initialize() {
    addButtons();
    document.getElementById("welcome").style.display = "block";
}

initialize();