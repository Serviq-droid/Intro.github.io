// Configuración canvas y animación de burbujas (tu código original)
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

resize();
window.addEventListener('resize', resize);

class Bubble {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = height + Math.random() * 200;
    this.radius = 10 + Math.random() * 20;
    this.speed = 0.5 + Math.random();
    this.angle = Math.random() * Math.PI * 2;
    this.angularSpeed = (Math.random() - 0.5) * 0.02;
    this.color = `hsl(${Math.random() * 50 + 30}, 90%, 70%)`;
    this.alpha = 0.7 + Math.random() * 0.3;
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.angle) * 0.5;
    this.angle += this.angularSpeed;
    if (this.y + this.radius < 0) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const bubbles = [];
const bubblesCount = 50;
for (let i = 0; i < bubblesCount; i++) {
  bubbles.push(new Bubble());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  bubbles.forEach(bubble => {
    bubble.update();
    bubble.draw();
  });
  requestAnimationFrame(animate);
}

animate();

// Control de música y volumen
const music = document.getElementById('bg-music');
const video = document.getElementById('video-niñas');
const volumeSlider = document.getElementById('volume-slider');
const volumePercentage = document.getElementById('volume-percentage');
const title = document.querySelector('.content h1');
const startBtn = document.getElementById('start-btn');

// Inicializar volumen audio de fondo
function setVolume(vol) {
  if (!music) return;
  music.volume = vol;
  volumeSlider.value = vol * 100;
  volumePercentage.textContent = Math.round(vol * 100) + '%';
}

// Control slider volumen audio fondo
volumeSlider.addEventListener('input', e => {
  setVolume(e.target.value / 100);
});

// Reproducir audio de fondo con volumen inicial bajo al cargar página
window.addEventListener('load', () => {
  setVolume(0.25); // 5%
  music.play().catch(error => {
    console.warn('Autoplay bloqueado por navegador:', error);
  });
});

// Cursor mano para título
title.style.cursor = 'pointer';

// Alternar play/pause audio fondo al hacer clic en título
title.addEventListener('click', () => {
  if (music.paused) {
    music.play().catch(() => {});
  } else {
    music.pause();
  }
});

// Inicializar video con volumen 0 y silenciado para no interferir
video.volume = 0;
video.muted = true;

// Al hacer clic en video alternar sonido del video (no afecta audio fondo)
video.addEventListener('click', () => {
  if (video.muted) {
    video.muted = false;
    video.volume = 1;
    video.play().catch(() => {});
  } else {
    video.muted = true;
    video.volume = 0;
    video.pause();
  }
});

// Botón "Comenzar" SOLO redirige a la URL, no controla audio ni video
startBtn.addEventListener('click', () => {
  window.location.href = 'https://vcruzsal.wixsite.com/my-site-2';
});
