// Matrix rain effect
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "アァイィウヴエカキクケコサシスセソタチツナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 40);

const typewriterText = document.getElementById("typewriter-text");
const introString = "Initializing Code Engine...";
let i = 0;

function typeEffect() {
  if (i < introString.length) {
    typewriterText.textContent += introString.charAt(i);
    i++;
    setTimeout(typeEffect, 50); // typing speed
  }
}
window.addEventListener("load", () => {
  typeEffect();
  setTimeout(() => {
    document.getElementById("cinematic-loader").style.display = "none";
  }, 5000); // hides after 5s
});


// === Run button logic ===

document.getElementById("run-btn").addEventListener("click", () => {
  const html = document.getElementById("html-code").value;
  const css = `<style>${document.getElementById("css-code").value}</style>`;
  const js = `<script>${document.getElementById("js-code").value}<\/script>`;
  const output = document.getElementById("output");

  const fullCode = html + css + js;
  output.srcdoc = fullCode;
});
