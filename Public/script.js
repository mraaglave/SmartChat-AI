

// Send Message Function
async function sendMessage() {
    const userInputField = document.getElementById("user-input");
    const userInput = userInputField.value.trim();
    const chatContainer = document.getElementById("chat-container");

    if (!userInput) return;

    // Add User Message
    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.innerText = userInput;
    chatContainer.appendChild(userMessage);

    // Show Typing Indicator
    const loadingMessage = document.createElement("div");
    loadingMessage.className = "message bot loading";
    loadingMessage.innerText = "Thinking...";
    chatContainer.appendChild(loadingMessage);

    userInputField.value = ""; // Clear input
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();
        chatContainer.removeChild(loadingMessage); // Remove loading

        // Add Bot Response
        const botMessage = document.createElement("div");
        botMessage.className = "message bot";
        botMessage.innerText = data.reply;
        chatContainer.appendChild(botMessage);

        chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (error) {
        chatContainer.removeChild(loadingMessage);
        alert("Error communicating with AI!");
    }
}

// Send on Enter key
document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
