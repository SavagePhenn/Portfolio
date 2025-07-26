const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Typing animation
function showTyping() {
  if (document.getElementById("typing-indicator")) return;

  const typingDiv = document.createElement("div");
  typingDiv.classList.add("bot");
  typingDiv.id = "typing-indicator";
  typingDiv.innerHTML = `
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  `;
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const typingDiv = document.getElementById("typing-indicator");
  if (typingDiv) typingDiv.remove();
}

function generateMockReply(userMsg) {
  const replies = [
    "Hmm, interesting question 🤔",
    "Tell me more!",
    "I'm not a real AI... yet 👀",
    "That's cool! What else?",
    "Haha, I like how you think!",
    "Wait... say that again?",
    "Okay okay, let me think... 💭",
    "Nice one! You got jokes? 😂",
    "I'm here for it. Keep going.",
  ];

  // Optionally customize based on user message
  if (userMsg.toLowerCase().includes("hello")) return "Hey there! 👋";
  if (userMsg.toLowerCase().includes("name")) return "I'm Chat-App Bot 😄";
  if (userMsg.toLowerCase().includes("bye")) return "Bye! Come back soon ✨";

  return replies[Math.floor(Math.random() * replies.length)];
}

sendBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  messageInput.value = "";

  showTyping();

  setTimeout(() => {
    removeTyping();
    const reply = generateMockReply(message);
    addMessage(reply, "bot");
  }, 1200);
});

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
