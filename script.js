let timer;
let isRunning = false;
let workMinutes;
let breakMinutes;
let seconds = 0;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    workMinutes = parseInt(workTimeInput.value) || 25;
    breakMinutes = parseInt(breakTimeInput.value) || 5;
    seconds = 0;
    isWorkTime = true;
    updateDisplay();
}

function updateTimer() {
    if (seconds === 0) {
        if (isWorkTime) {
            if (workMinutes === 0) {
                isWorkTime = false;
                alert('Work time is over! Time for a break.');
                workMinutes = parseInt(workTimeInput.value);
                breakMinutes--;
            } else {
                workMinutes--;
                seconds = 59;
            }
        } else {
            if (breakMinutes === 0) {
                isWorkTime = true;
                alert('Break time is over! Time to work.');
                breakMinutes = parseInt(breakTimeInput.value);
                workMinutes--;
            } else {
                breakMinutes--;
                seconds = 59;
            }
        }
    } else {
        seconds--;
    }
    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = isWorkTime ? String(workMinutes).padStart(2, '0') : String(breakMinutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

// Initialize the timer display with the user input values when the page loads
resetTimer();