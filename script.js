// === Setup Canvas ===
const canvas = document.getElementById("ripple-canvas");
const ctx = canvas.getContext("2d");
let width, height;
function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// === Water Background Animation (wavy flow) ===
let t = 0;
function drawBackgroundWave() {
  let gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#0f172a");
  gradient.addColorStop(1, "#1e293b");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      let y = Math.sin((x + t * (i + 1) * 0.5) * 0.01 + i * 2) * 10 + height / 2 + i * 15;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(255, 255, 255, 0.02)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  t += 1;
}

// === Ripples ===
let ripples = [];
function addRipple(x, y) {
  ripples.push({ x, y, radius: 0, opacity: 0.4 });
}

document.addEventListener("mousemove", (e) => {
  addRipple(e.clientX, e.clientY);
});
document.addEventListener("click", (e) => {
  addRipple(e.clientX, e.clientY); // Splash on click
});

// === Main Animation Loop ===
function animate() {
  drawBackgroundWave();

  // Ripple rendering
  for (let i = 0; i < ripples.length; i++) {
    let r = ripples[i];
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    r.radius += 2.2;
    r.opacity -= 0.012;
  }

  ripples = ripples.filter(r => r.opacity > 0);
  requestAnimationFrame(animate);
}
animate();

// === Popup logic stays the same ===
function showSection(section) {
  const contentMap = {
    about: `
      <h2>About Me</h2>
      <p>I'm a 19-year-old front-end developer learning back-end on my journey to becoming a full-stack developer. I love building clean, interactive web experiences.</p>
    `,
    projects: `
      <h2>My Projects</h2>
      <button class="project-button" onclick="window.open('./To-Do-App/index.html', '_blank')">📝 Project 1 – To-Do App</button>
      <button class="project-button" onclick="window.open('./Calculator-App/index.html', '_blank')">🧮 Project 2 – Calculator App</button>
      <button class="project-button" onclick="window.open('./Chat-App/index.html', '_blank')">💬 Project 3 – Chat App</button>
    `,
    contact: `
      <h2>Contact Me</h2>
      <p>Email: thairbilal14@gmail.com</p>
      <p>LinkedIn: <a href="https://linkedin.com/in/bilalthair" target="_blank">linkedin.com/in/bilalthair</a></p>
    `
  };

  document.getElementById("popup-content").innerHTML = contentMap[section];
  document.getElementById("popup-overlay").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup-overlay").classList.add("hidden");
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopup();
});

// === Show menu after name appears ===
setTimeout(() => {
  document.getElementById("menu").classList.remove("hidden");
}, 2500);
