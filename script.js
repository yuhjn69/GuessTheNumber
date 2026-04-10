let secretNumber;
let attempts;

function startNewGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('userGuess').value='';
    // Отладка
    console.log("Загадно число:" + secretNumber);
}

function checkGuess() {
    let inputField = document.getElementById('userGuess');
    let guess = parseInt(inputField.value);
    if (isNaN(guess)) {
        console.log("Это не число!")
        return;
    }

    attempts += 1;

    let message = "";
    if (guess > secretNumber) {
        message = "🔻 Много! Бери меньше.";
    } else if (guess < secretNumber) {
        message = "🔺 Мало! Бери больше.";
    } else {
        message = "🏆 ПОБЕДА! Загадано: " + secretNumber + ". Попыток использовано: " + attempts;
    }

    document.getElementById("messageWindow").innerText = message;

    inputField.value = '';
    inputField.focus();
}

window.onload = startNewGame;