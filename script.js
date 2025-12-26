
const GOOGLE_API_KEY = "AIzaSyAckcdmt5Ia_taaG-g2NE3TgZQZzYXFxNg";

const avatar = document.getElementById("avatar");
const answerBox = document.getElementById("answerBox");

const videos = {
  idle: "assets/idle.mp4",
  thinking: "assets/thinking.mp4",
  answering: "assets/answering.mp4"
};

function setState(state) {
  avatar.src = videos[state];
  avatar.play();
}

async function ask() {
  const input = document.getElementById("question");
  const question = input.value.trim();
  if (!question) return;

  setState("thinking");
  answerBox.textContent = "Thinking...";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: question }] }
          ]
        })
      }
    );

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received.";

    setState("answering");
    answerBox.textContent = reply;

    setTimeout(() => setState("idle"), 4000);

  } catch (err) {
    setState("idle");
    answerBox.textContent = "Error getting response.";
  }

  input.value = "";
}
