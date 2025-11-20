function createHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.classList.add("heart");

  // Улучшенная адаптация под мобильные
  const screenWidth = window.innerWidth;
  const xPos = Math.random() * screenWidth;
  heart.style.left = `${xPos}px`;

  const delay = Math.random() * 1.5; // Немного быстрее
  heart.style.animationDelay = `${delay}s`;

  document.getElementById("hearts-container").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000); // Чуть быстрее исчезают
}

// Запускаем сердечки каждые 250ms для лучшей плавности
setInterval(createHeart, 150);

class Particle {
  constructor(x, y, color, angle, speed, life) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = angle;
    this.speed = speed;
    this.life = life;
    this.gravity = 0.02;

    this.element = document.createElement("div");
    this.element.className = "particle";
    this.element.style.color = color; // для box-shadow
    document.body.appendChild(this.element);
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity * 5;
    this.speed *= 0.96;
    this.life -= 0.02;
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.opacity = this.life;
    if (this.life <= 0) {
      this.element.remove();
      return false;
    }
    return true;
  }
}

function createFirework() {
  const x = Math.random() * window.innerWidth;
  const y = (Math.random() * window.innerHeight) / 2 + 50;
  const colors = [
    "#ff0000",
    "#ff8000",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#8000ff",
    "#00ff00",
    "#ff0080",
  ];
  const particles = [];

  // центральная вспышка
  particles.push(new Particle(x, y, "#ffff00", 0, 0, 0.4));

  const count = Math.floor(Math.random() * 50 + 75);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 5 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, color, angle, speed, 3));
  }

  function animate() {
    let alive = false;
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].update()) alive = true;
    }
    if (alive) requestAnimationFrame(animate);
  }
  animate();
}

// Несколько салютов подряд
let fireworksInterval = setInterval(createFirework, 800);
setTimeout(() => clearInterval(fireworksInterval), 13000);
