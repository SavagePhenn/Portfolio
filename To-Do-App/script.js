let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

function addTask() {
  if (taskInput.value === "") return;

  let li = document.createElement("li");
  li.textContent = taskInput.value;

  // Toggle done on click
  li.addEventListener("click", () => {
    li.classList.toggle("done");
  });

  // Right-click to delete
  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    li.remove();
  });

  taskList.appendChild(li);
  taskInput.value = "";
}
function toggleTheme() {
  document.body.classList.toggle('light-mode');

  // Save choice to localStorage
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

const themeSwitch = document.getElementById("themeSwitch");

// Update theme when toggled
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Load saved theme on page load
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeSwitch.checked = true;
  }
};
// Allow pressing "Enter" to add task
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask(); // Call your existing function
  }
});

