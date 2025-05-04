// Seleciona os elementos do DOM
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const controlsEl = document.getElementById('controls');
const timerEl = document.getElementById('timer');

let interval = null;
let totalSeconds = 0;
let isEditing = false; // Variável para controlar o estado de edição

// Função para habilitar/desabilitar edição
function toggleEditMode() {
  if (interval) {
    alert("Pause o temporizador antes de editar.");
    return;
  }

  isEditing = !isEditing;

  hoursEl.contentEditable = isEditing;
  minutesEl.contentEditable = isEditing;
  secondsEl.contentEditable = isEditing;

  if (isEditing) {
    hoursEl.style.border = "6px solid #333";
    minutesEl.style.border = "6px solid #333";
    secondsEl.style.border = "6px solid #333";
  } else {
    hoursEl.style.border = "none";
    minutesEl.style.border = "none";
    secondsEl.style.border = "none";
    readInput();
  }
}

// Função para atualizar a exibição do temporizador
function updateDisplay() {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  hoursEl.innerText = hours;
  minutesEl.innerText = mins;
  secondsEl.innerText = secs;
}

// Função para iniciar o temporizador
function startTimer() {
  if (interval) return;

  if (isEditing) {
    isEditing = false;
    hoursEl.contentEditable = false;
    minutesEl.contentEditable = false;
    secondsEl.contentEditable = false;
    hoursEl.style.border = "none";
    minutesEl.style.border = "none";
    secondsEl.style.border = "none";
    readInput();
  }

  interval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();

      // Verifica se está nos últimos 10 segundos
      if (totalSeconds === 10) {
        startFinalCountdown();
      }
    } else {
      clearInterval(interval);
      interval = null;
    }
  }, 1000);
}

// Função para iniciar a contagem regressiva final
function startFinalCountdown() {
  clearInterval(interval); // Para o temporizador principal

  // Oculta os elementos da tela
  timerEl.style.display = "none";
  controlsEl.style.display = "none";

  let countdown = 10;

  const countdownInterval = setInterval(() => {
    // Pisca a tela
    document.body.style.backgroundColor =
      countdown % 2 === 0 ? "black" : "red";

    // Exibe a contagem regressiva
    document.body.innerHTML = `<h1 style="font-size: 5rem; color: white; text-align: center;">${countdown}</h1>`;

    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      document.body.innerHTML = `<h1 style="font-size: 5rem; color: white; text-align: center;">Tempo esgotado!</h1>`;
      document.body.style.backgroundColor = "black";
    }
  }, 1000);
}

// Função para pausar o temporizador
function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

// Função para resetar o temporizador
function resetTimer() {
  pauseTimer();
  totalSeconds = 0;
  updateDisplay();
  timerEl.style.display = "flex";
  controlsEl.style.display = "flex";
}

// Função para ler os valores dos campos e atualizar totalSeconds
function readInput() {
  const hours = parseInt(hoursEl.innerText) || 0;
  const mins = parseInt(minutesEl.innerText) || 0;
  const secs = parseInt(secondsEl.innerText) || 0;
  totalSeconds = hours * 3600 + mins * 60 + secs;
  updateDisplay();
}

// Configura os eventos dos botões
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('edit').addEventListener('click', toggleEditMode);