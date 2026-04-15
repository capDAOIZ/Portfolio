// src/components/ChatBot.tsx

import React, { useState } from "react";
import { sendMessage } from "../services/chat";

interface Message {
  role: "user" | "bot";
  text: string;
}

const ChatBot: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userText = input;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");

    try {
      const reply = await sendMessage(userText);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error al contactar con la IA." },
      ]);
      console.error(error);
    }
  };

  return (
    <div>
      <h2>🤖 Chat con IA Personal</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "user-message" : "bot-message"}
          >
            <strong>{msg.role === "user" ? "Tú" : "IA"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatBot;
