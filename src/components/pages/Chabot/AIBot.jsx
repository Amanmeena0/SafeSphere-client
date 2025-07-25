import { useState } from "react";
import axios from "axios";
import backend from "@/config";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${backend.apiUrl}/generate`, {
        query: input,
      });

      const botMessage = {
        sender: "bot",
        text: response.data.result || "No response received.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error reaching backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col items-center h-fit bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold mb-4 text-blue-700">🔐 Surkhsha chatbot</h1>
      
      <div className="w-full max-w-2xl flex flex-col gap-2 bg-white rounded-lg p-4 shadow-md overflow-y-auto h-[70vh]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.sender === "user"
                ? "self-end bg-blue-100 text-right"
                : "self-start bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">Typing...</div>}
      </div>

      <div className="flex w-full max-w-2xl mt-4">
        <input
          type="text"
          value={input}
          placeholder="Type your question..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
