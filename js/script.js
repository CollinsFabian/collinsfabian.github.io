// Theme Toggle
const toggleBtn = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  toggleBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}
toggleBtn.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
});

// Particle Animation
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    speedX: Math.random() - 0.5,
    speedY: Math.random() - 0.5
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(108,99,255,0.5)';
    ctx.fill();
  });
}

function updateParticles(mouse) {
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    // Mouse attraction
    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      p.x -= dx / 20;
      p.y -= dy / 20;
    }
  });
}

let mouse = { x: null, y: null };
window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function animate() {
  drawParticles();
  updateParticles(mouse);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const profilePic = document.querySelector('.profile-pic');
profilePic.addEventListener('mousemove', (e) => {
  const { width, height, left, top } = profilePic.getBoundingClientRect();
  const x = e.clientX - left - width / 2;
  const y = e.clientY - top - height / 2;
  const rotateX = (y / height) * 10; // vertical tilt
  const rotateY = (x / width) * -10; // horizontal tilt
  profilePic.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
});
profilePic.addEventListener('mouseleave', () => { profilePic.style.transform = 'rotateX(0) rotateY(0) scale(1)' });
