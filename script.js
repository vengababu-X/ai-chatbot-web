const avatar = document.getElementById("avatar");
const textBox = document.getElementById("text-box");

const demoAnswers = [
  "I am XKING AI, always active.",
  "I move even when you are silent.",
  "This answer is shown while I gesture.",
  "You are watching a living interface.",
  "Text and motion together feel natural."
];

function ask() {
  const input = document.getElementById("userInput");
  if (!input.value) return;

  avatar.classList.add("present");

  // Fake thinking delay
  setTimeout(() => {
    const reply = demoAnswers[Math.floor(Math.random() * demoAnswers.length)];
    textBox.textContent = reply;

    // Stop presenting after a bit
    setTimeout(() => {
      avatar.classList.remove("present");
    }, 3000);
  }, 600);

  input.value = "";
}

/* Idle random movement even without interaction */
setInterval(() => {
  avatar.classList.toggle("present");
  setTimeout(() => avatar.classList.remove("present"), 1500);
}, 9000);
