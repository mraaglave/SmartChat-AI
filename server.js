const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "AIzaSyCK8Foyj9LZ0wyh0wXvmsNW35q5pVHmua4"; // Replace this with your Gemini API key
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

app.post("/chat", async (req, res) => {
    try {
        const userInput = req.body.message;

        const response = await axios.post(GEMINI_URL, {
            contents: [{ parts: [{ text: userInput }] }]
        });

        const reply = response.data.candidates[0].content.parts[0].text;
        res.json({ reply });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ reply: "Error processing your request" });
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
app.get("/", (req, res) => {
    res.send("Server is running! Chatbot API is ready.");
});

