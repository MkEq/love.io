document.addEventListener("DOMContentLoaded", () => {
  // ====================== ЭЛЕМЕНТЫ ======================
  const content = document.querySelector(".content");
  const timeContainer = document.getElementById("time-container");
  const finalContainer = document.getElementById("final-container");
  const waitBox = document.getElementById("wait-box");

  const sureBtn = document.getElementById("sure-button");
  const maybeBtn = document.getElementById("maybe-later");
  const foreverBtn = document.getElementById("forever-button");
  const replayBtn = document.getElementById("replay-button");

  const heartsContainer = document.getElementById("hearts-container");

  // ====================== ПЕРЕМЕННЫЕ ======================
  let timerInterval = null;

  const messages = [
    "Remember when we first met?",
    "So many memories!",
    "You are my person!",
    "Thank you for being here!",
    "Here’s more time together!",
    "All the love!",
    "Forever and always!",
    "Counting every moment!",
    "You make my heart smile!",
    "My favourite story is ours!",
    "You are the best thing ever!",
    "Cherishing every moment!",
  ];

  // правильная дата: 22 ноября 2024
  const startDate = new Date(2024, 10, 22);

  // ====================== ТОЧНЫЙ РАСЧЁТ ДАТЫ ======================
  function getDateDiff(start, end) {
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    // Если дни ушли в минус → берём дни из предыдущего месяца
    if (days < 0) {
      months--;
      let prevMonthDays = new Date(
        end.getFullYear(),
        end.getMonth(),
        0
      ).getDate();
      days += prevMonthDays;
    }

    // Если месяцы ушли в минус → забираем один год
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  // ====================== ОБНОВЛЕНИЕ ВРЕМЕНИ ======================
  function updateTime() {
    const now = new Date();

    // точные года / месяцы / дни
    const { years, months, days } = getDateDiff(startDate, now);

    // часы / минуты / секунды считаем по разнице миллисекунд
    const diff = now - startDate;

    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diff % (60 * 1000)) / 1000);

    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }

  function startTimeCounter() {
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTime, 1000);
    updateTime();
  }

  // ====================== СООБЩЕНИЯ ======================
  function createMessage(text) {
    const msg = document.createElement("div");
    msg.classList.add("message-box");
    msg.textContent = text;

    const sw = window.innerWidth;
    const sh = window.innerHeight;

    msg.style.left = `${Math.random() * (sw - 200)}px`;
    msg.style.top = `${Math.random() * (sh - 120)}px`;

    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 3000);
  }

  function showMessages() {
    const interval = 1500;

    messages.forEach((message, i) => {
      setTimeout(() => createMessage(message), i * interval);
    });

    // Показ кнопки после последнего сообщения
    setTimeout(() => {
      foreverBtn.style.display = "block";
    }, messages.length * interval + 500);
  }

  // ====================== КНОПКИ ======================

  // --- Sure ---
  sureBtn.addEventListener("click", () => {
    content.style.display = "none";
    timeContainer.style.display = "flex";

    startTimeCounter();
    setTimeout(showMessages, 1000);
  });

  // --- Maybe Later ---
  maybeBtn.addEventListener("click", () => {
    content.style.display = "none";
    waitBox.style.display = "block";

    setTimeout(() => {
      waitBox.style.display = "none";
      window.location.href = "../index.html";
    }, 3000);
  });

  // --- Click for Forever ---
  foreverBtn.addEventListener("click", () => {
    timeContainer.style.display = "none";
    foreverBtn.style.display = "none";
    finalContainer.style.display = "flex";
  });

  // --- Replay ---
  replayBtn.addEventListener("click", () => {
    finalContainer.style.display = "none";
    content.style.display = "flex";
  });

  // ====================== СЕРДЕЧКИ ======================
  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = `${Math.random() * window.innerWidth}px`;
    heart.style.animationDelay = `${Math.random() * 2}s`;

    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
  }

  setInterval(createHeart, 350);
});
