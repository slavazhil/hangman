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

// Initialize Firebase
let config = {
    apiKey: 'AIzaSyABp9GHFXn05GqA_HdqKCFitFYUxFxMn-A',
    authDomain: 'hangman-41c86.firebaseapp.com',
    databaseURL: 'https://hangman-41c86.firebaseio.com',
    projectId: 'hangman-41c86',
    storageBucket: 'hangman-41c86.appspot.com',
    messagingSenderId: '173410728369'
};

firebase.initializeApp(config);

function savePlayerScoreToDB(name, score) {
    // save player score to database
    firebase.database().ref(name).set(score);
}

function getPlayersFromDB() {
    // get first five scores from database 
    let board = ""
    let isNameInLeaderboard = false;

    firebase.database().ref().orderByValue().limitToLast(5).once('value', function(snapshot) {
        snapshot.forEach(function(data) {
            board = `${data.key}: ${data.val()}<br>` + board;
            if (name == data.key) {
                isNameInLeaderboard = true;
            }
        });

        if (!isNameInLeaderboard) {
            board += `${name}: ${score}<br>`;
        }
        
        document.getElementById('leaderboard').innerHTML = board;
    });

    
    
}

function addButtons() {
    // add buttons dynamically in alphabetic order
    for (let i = 0; i < 26; i++) {
        let button = document.createElement("button");
        button.onclick = function(){checkLetter(this.innerHTML)};
        button.innerHTML = String.fromCharCode(97 + i);
        document.getElementById("buttons").appendChild(button);
    }
}

function enableButtons() {
    // reset all buttons to 'active'
    let buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
    }
}

function start() {
    // start the game
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
    // show the next word
    enableButtons();
    generateWord();
    updateWord();
    document.getElementById("definition").innerHTML = word_def;
}

function generateWord() {
    // generate a new word
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
    // reset score and lives
    score = 0;
    lives = 7;
}

function updateScoreAndLives() {
    // update score and lives
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("lives").innerHTML = "Lives: " + lives;
}

function updateWord() {
    // update the word
    document.getElementById("word").innerHTML = word_array.join(" ");
}

function checkLetter(letter) {
    // check if letter is in the word
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
    // check if the word is guessed
    if (!word_array.includes("_")){
        console.log("Good job!");
        nextWord();
    }
}

function disableButton(letter) {
    // disable a button when clicked
    let buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerHTML === letter){
            buttons[i].disabled = true;
            break;
        }
    }
}

function isGameOver() {
    // display game-over if life is 0
    if (lives === 0) {
        document.getElementById("game").style.display = "none";
        document.getElementById("gif").style.display = "block";
        document.getElementById("gif").src = "";
        document.getElementById("gif").src = "game_over.gif";
        savePlayerScoreToDB(name, score);
        getPlayersFromDB();
        setTimeout(function(){
            document.getElementById("gif").style.display = "none";
            document.getElementById("game_over").style.display = "block";
        }, 10000);
    }
}

function restart() {
    // restart the game
    resetScoreAndLives();
    updateScoreAndLives();
    nextWord();
    document.getElementById("game_over").style.display = "none";
    document.getElementById("game").style.display = "block";
}

function initialize() {
    // initialize the game
    addButtons();
    document.getElementById("welcome").style.display = "block";
}

initialize();