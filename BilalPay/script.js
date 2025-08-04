// === Utility ===
const getUsers = () => JSON.parse(localStorage.getItem('bilalpay_users')) || [];
const setUsers = (users) => localStorage.setItem('bilalpay_users', JSON.stringify(users));
const getCurrentUser = () => localStorage.getItem('bilalpay_current_user');
const setCurrentUser = (username) => localStorage.setItem('bilalpay_current_user', username);
const clearCurrentUser = () => localStorage.removeItem('bilalpay_current_user');

// === Page Routing ===
const page = location.pathname.split("/").pop();

// === Signup ===
if (page === "signup.html") {
  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value;

    const users = getUsers();
    const exists = users.find(u => u.username === username);
    if (exists) {
      document.getElementById("signup-error").innerText = "Username already exists.";
      return;
    }

    users.push({ username, password, balance: 0, history: [] });
    setUsers(users);
    setCurrentUser(username);
    location.href = "dashboard.html";
  });
}

// === Login ===
if (page === "index.html" || page === "") {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    const users = getUsers();
    const found = users.find(u => u.username === username && u.password === password);

    if (!found) {
      document.getElementById("login-error").innerText = "Invalid username or password.";
      return;
    }

    setCurrentUser(username);
    location.href = "dashboard.html";
  });
}

// === Dashboard ===
if (page === "dashboard.html") {
  const user = getCurrentUser();
  if (!user) location.href = "index.html";

  const users = getUsers();
  const currentUser = users.find(u => u.username === user);

  document.getElementById("usernameDisplay").innerText = currentUser.username;
  document.getElementById("sidebar-username").innerText = "@" + currentUser.username;
  updateBalance();
  renderHistory();

  function updateBalance() {
    document.getElementById("balanceDisplay").innerText = `KSH ${currentUser.balance.toFixed(2)}`;
    setUsers(users);
  }

  function renderHistory() {
    const list = document.getElementById("historyList");
    list.innerHTML = "";
    currentUser.history.slice().reverse().forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  }

  document.getElementById("addFundsBtn").addEventListener("click", () => {
    currentUser.balance += 1000;
    currentUser.history.push("💰 +1000 KSH added to your account.");
    updateBalance();
    renderHistory();
  });

  document.getElementById("transferBtn").addEventListener("click", () => {
    const to = document.getElementById("transfer-to").value.trim();
    const amount = parseFloat(document.getElementById("transfer-amount").value);
    const errorBox = document.getElementById("transfer-error");
    errorBox.innerText = "";

    if (!to || isNaN(amount) || amount <= 0) {
      errorBox.innerText = "Enter valid recipient and amount.";
      return;
    }

    if (to === currentUser.username) {
      errorBox.innerText = "You can't send money to yourself.";
      return;
    }

    const recipient = users.find(u => u.username === to);
    if (!recipient) {
      errorBox.innerText = "Recipient not found.";
      return;
    }

    if (currentUser.balance < amount) {
      errorBox.innerText = "Insufficient funds.";
      return;
    }

    // Transfer
    currentUser.balance -= amount;
    recipient.balance += amount;
    const time = new Date().toLocaleString();

    currentUser.history.push(`📤 Sent ${amount} KSH to @${to} — ${time}`);
    recipient.history.push(`📥 Received ${amount} KSH from @${currentUser.username} — ${time}`);
    updateBalance();
    renderHistory();
    setUsers(users);

    document.getElementById("transfer-to").value = "";
    document.getElementById("transfer-amount").value = "";
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    clearCurrentUser();
    location.href = "index.html";
  });
}

// === Settings ===
if (page === "settings.html") {
  const user = getCurrentUser();
  if (!user) location.href = "index.html";

  const users = getUsers();
  const currentUser = users.find(u => u.username === user);

  document.getElementById("toggleThemeBtn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.getElementById("settings-status").innerText = "Theme toggled.";
  });

  document.getElementById("deleteAccountBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete your account? This can't be undone.")) {
      const updatedUsers = users.filter(u => u.username !== currentUser.username);
      setUsers(updatedUsers);
      clearCurrentUser();
      location.href = "signup.html";
    }
  });
}
