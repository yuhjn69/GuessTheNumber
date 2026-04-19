'use strict';
(() => {
    let secretNumber;
    let attempts;
    let history = [];
    let lastGuess = null;
    
function startNewGame() {
    lastGuess = null;
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('userGuess').value='';

    let button = document.getElementById("checkButton");
    button.disabled = false;

    updateMessage("Загадано новое число от 1 до 100!");
    // Debugging
    console.log("Загадано число:" + secretNumber);

    history = [];
    updateHistoryDisplay();
    updateAttemptsDisplay();

    loadRecord();
}

function checkGuess() {
    let inputField = document.getElementById('userGuess');
    let guess = parseInt(inputField.value);
    let message = "";

    // check for number
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
    let isWin = false;

    // User Hints
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
        isWin = true;
        checkRecord();
    }

    // hot-cold
    if (!isWin) {
        let currentDiff = Math.abs(secretNumber - guess);
        if (lastGuess !== null) {
            let previousDiff = Math.abs(secretNumber - lastGuess);

            if (currentDiff < previousDiff) {
                message = message + ' Горячее!';
            } else if (currentDiff > previousDiff) {
                message = message + ' Холоднее!';
            } else {
                message = message + ' На том же расстоянии...';
            }
        }
    lastGuess = guess;
    }
    
    history.push(resultText);
    updateHistoryDisplay();
    updateMessage(message);
    clearAndFocusInput(inputField);
}

// Cancel move
function undoLastGuess() {
    if (history.length === 0) {
        updateMessage(" Нечего отменять!!!");
        return;
    }

    history = history.slice(0, -1);

    if (attempts > 0) {
        attempts--;
    }
    
    if (history.length > 0) {
        let lastEntry = history[history.length - 1];
        let numberPart = lastEntry.split(' ')[0];
        lastGuess = parseInt(numberPart);
    } else {
        lastGuess = null;
    }

    updateHistoryDisplay();
    updateAttemptsDisplay();
    updateMessage('Последний ход отменён');
}



function checkRecord() {
    let currentRecord = localStorage.getItem('record');
    
    if (currentRecord === null || currentRecord === 'null') {
        localStorage.setItem('record', attempts);
    } else if (attempts < Number(currentRecord)) {
        localStorage.setItem('record', attempts);
    }
    
    loadRecord();
}

function loadRecord() {
    let currentRecord = localStorage.getItem('record');
    let recordElement = document.getElementById('recordDisplay');

    if (!currentRecord || currentRecord === 'null') {
        recordElement.innerText = 'Рекорд: нет';
    } else {
        recordElement.innerText = 'Рекорд: ' + currentRecord;
    }
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

window.startNewGame = startNewGame;
window.checkGuess = checkGuess;
window.undoLastGuess = undoLastGuess;

document.addEventListener('DOMContentLoaded', startNewGame);
})();