const API_KEY = "AIzaSyAckcdmt5Ia_taaG-g2NE3TgZQZzYXFxNg";

async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;

    addMessage("You", message);
    input.value = "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful AI chatbot." },
                { role: "user", content: message }
            ]
        })
    });

    const data = await response.json();

    if (data.error) {
        addMessage("Bot", "Error: " + data.error.message);
        return;
    }

    addMessage("Bot", data.choices[0].message.content);
}

function addMessage(sender, text) {
    const chatBox = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<span class="${sender.toLowerCase()}">${sender}:</span> ${text}`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}
