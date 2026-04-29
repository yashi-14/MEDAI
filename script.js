// =========================
// BUTTONS & POPUP LOGIC (UNCHANGED)
// =========================
document.getElementById("chat").addEventListener("click", function () {
  document.getElementById("ai-chat").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

document.getElementById("doc").addEventListener("click", function () {
  console.log("Milgya docter");
  window.location.href = "doc.html";
});

document.getElementById("about").addEventListener("click", function () {
  document.getElementById("aboutPopup").style.display = "flex";
});

document.getElementById("closePopup").addEventListener("click", function () {
  document.getElementById("aboutPopup").style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === document.getElementById("aboutPopup")) {
    document.getElementById("aboutPopup").style.display = "none";
  }
});

// =========================
// AI CHAT FUNCTIONALITY
// =========================
const sendBtn = document.getElementById("sendMessage");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatMessages");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // User message bubble
  const userMsg = document.createElement("div");
  userMsg.className = "message user-message";
  userMsg.textContent = text;
  chatBox.appendChild(userMsg);
  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // AI typing bubble
  const aiMsg = document.createElement("div");
  aiMsg.className = "message bot-message typing";
  aiMsg.textContent = "Typing";
  chatBox.appendChild(aiMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  let dots = 0;
  const typingInterval = setInterval(() => {
    aiMsg.textContent = "Typing" + ".".repeat(dots % 4);
    dots++;
  }, 500);

  try {
    const res = await fetch("http://127.0.0.1:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    clearInterval(typingInterval);
    aiMsg.classList.remove("typing");
    aiMsg.textContent = data.reply;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    clearInterval(typingInterval);
    aiMsg.classList.remove("typing");
    aiMsg.textContent = "⚠️ Server not responding. Please check backend.";
    chatBox.scrollTop = chatBox.scrollHeight;
    console.error(err);
  }
}
