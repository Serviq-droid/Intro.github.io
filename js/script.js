// Configuración canvas y animación de burbujas
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

// Controles video
const video = document.getElementById('video-niñas');
const title = document.querySelector('.content h1');
const startBtn = document.getElementById('start-btn');

// Quitar autoplay del video (eliminar el atributo autoplay del HTML)
// Video inicialmente pausado y sin mute
video.volume = 1;
video.pause();

// Cursor mano para título
title.style.cursor = 'pointer';

// Al hacer clic en video, alternar play/pause
video.addEventListener('click', () => {
  if (video.paused) {
    video.play().catch(() => {});
  } else {
    video.pause();
  }
});

// Botón "Comenzar" solo redirige a la URL indicada
startBtn.addEventListener('click', () => {
  window.location.href = 'https://vcruzsal.wixsite.com/my-site-2';
});

