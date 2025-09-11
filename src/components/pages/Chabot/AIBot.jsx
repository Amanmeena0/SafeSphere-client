import { useState } from "react";
import axios from "axios";
import backend from "@/config";


export default function Chatbot({ open, onClose }) {
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

  if (!open) return null;
  return (
    <div className="fixed bottom-8 right-8 z-50 w-[90vw] max-w-md bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl shadow-2xl border border-blue-200 flex flex-col items-center p-0">
      <div className="w-full flex justify-between items-center px-6 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-blue-800 drop-shadow-lg tracking-wide">🔐 Surkhsha Chatbot</h1>
        <button
          className="text-blue-700 text-2xl font-bold hover:text-red-500 transition-colors duration-200"
          onClick={onClose}
          aria-label="Close Chatbot"
        >
          ×
        </button>
      </div>
      <div className="w-full flex flex-col gap-3 bg-white/90 rounded-2xl px-6 py-4 shadow-inner border border-blue-100 overflow-y-auto transition-all duration-300" style={{height: '55vh', minHeight: '300px'}}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`relative px-4 py-2 rounded-xl max-w-[80%] break-words shadow-md transition-all duration-300 ${
              msg.sender === "user"
                ? "self-end bg-gradient-to-l from-blue-400 to-blue-200 text-white text-right animate-fadeIn"
                : "self-start bg-gradient-to-r from-gray-200 to-gray-100 text-gray-800 animate-fadeIn"
            }`}
            style={{ marginBottom: '0.25rem' }}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="text-sm text-blue-500 flex items-center gap-2 animate-pulse">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
            Typing...
          </div>
        )}
      </div>
      <div className="flex w-full px-6 pb-4 pt-2">
        <input
          type="text"
          value={input}
          placeholder="Type your question..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow px-4 py-3 border-2 border-blue-200 rounded-l-xl focus:outline-none focus:border-blue-400 text-lg bg-white/80 shadow-sm transition-all duration-200"
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-r-xl font-semibold text-lg shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
      {/* Animations for fadeIn */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s;
        }
      `}</style>
    </div>
  );
}
