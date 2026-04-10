let secretNumber;
let attempts;
let history = [];

function startNewGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('userGuess').value='';

    let button = document.getElementById("checkButton");
    button.disabled = false;

    updateMessage("Загадано новое число от 1 до 100!");
    // Отладка
    console.log("Загадано число:" + secretNumber);

    history = [];
    updateHistoryDisplay();
    updateAttemptsDisplay();
}

function checkGuess() {
    let inputField = document.getElementById('userGuess');
    let guess = parseInt(inputField.value);
    let message = "";

    //проверка на число
    if (isNaN(guess)) {
        updateMessage("Это не число! Введите цифры.")
        clearAndFocusInput(inputField);
        return;
    }

    if (guess < 1 || guess > 100) {
        updateMessage("Число должно быть от 1 до 100! Попытка не засчитана.")
        clearAndFocusInput(inputField);
        return;
    }

    attempts++;
    updateAttemptsDisplay();

    let resultText = '';

    // Подсказки пользователю
    if (guess > secretNumber) {
        message = "Много! Бери меньше.";
        resultText = `${guess} → Много`;
    } else if (guess < secretNumber) {
        message = "Мало! Бери больше.";
        resultText = `${guess} → Мало`;
    } else {
        message = `ПОБЕДА! Загадано: ${secretNumber}. Попыток использовано: ${attempts}. Нажмите «Новая игра» для продолжения.`;
        resultText = `${guess} → ПОБЕДА!`;
        let button = document.getElementById("checkButton");
        button.disabled = true;
    }

    history.push(resultText);
    updateHistoryDisplay();

    updateMessage(message);
    clearAndFocusInput(inputField);
}

function updateHistoryDisplay() {
    let historyDiv = document.getElementById("historyList");
    if (!historyDiv) return;
    historyDiv.innerHTML = '';

    for (let i = 0; i < history.length; i++) {
        let p = document.createElement('p');
        p.style.margin = '2px 0';
        p.innerText = (i + 1) + '. ' + history[i];
        historyDiv.appendChild(p);
    }
}

function updateMessage(text) {
    document.getElementById("messageWindow").innerText = text;
}

function clearAndFocusInput(field) {
    field.value = '';
    field.focus();
}

function updateAttemptsDisplay() {
    document.getElementById("attemptsDisplay").innerText = `Попыток: ${attempts}`;
}

window.onload = startNewGame;