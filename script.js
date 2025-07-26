// Show buttons after name
setTimeout(() => {
  document.getElementById("menu").classList.remove("hidden");
}, 2500);

// Button click = popup content
function showSection(section) {
  const contentMap = {
    about: `
      <h2>About Me</h2>
      <p>I'm a 19-year-old front-end developer learning back-end on my journey to becoming a full-stack developer. I'm eager to work in front-end now while I master the rest. I love building clean, interactive, and life-changing web experiences.</p>
    `,

    projects: `
      <h2>My Projects</h2>
      <button class="project-button" onclick="window.open('./To-Do-App/index.html', '_blank')">
        📝 Project 1 – To-Do App
      </button>
      <button class="project-button" onclick="window.open('./Calculator-App/index.html', '_blank')">
        🧮 Project 2 – Calculator App
      </button>
      <button class="project-button" onclick="window.open('./Chat-App/index.html', '_blank')">
        💬 Project 3 – Chat App
      </button>
    `,

    contact: `
      <h2>Contact Me</h2>
      <p>Email: thairbilal14@gmail.com</p>
      <p>LinkedIn: linkedin.com/in/bilalthair</p>
    `
  };

  document.getElementById("popup-content").innerHTML = contentMap[section];
  document.getElementById("popup-overlay").classList.remove("hidden");
}

// Close popup
function closePopup() {
  document.getElementById("popup-overlay").classList.add("hidden");
}

// ESC key to close popup
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup();
  }
});
