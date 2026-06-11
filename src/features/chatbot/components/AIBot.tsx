import { useState, useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  X, 
  Bot, 
  User, 
  Loader2, 
  Trash2, 
  Copy, 
  Check, 
  Info
} from "lucide-react";

export default function Chatbot({ onClose }: any) {
  const { messages, loading, sendMessage, clearMessages } = useChat([
    { 
      sender: "bot", 
      text: "Hello! I'm your Surkhsha assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    clearMessages();
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const suggestedQuestions = [
    "How to register an FIR?",
    "Safety tips for women",
    "Report a cyber crime",
    "Emergency contacts"
  ];

  return (
    <div className="w-[90vw] max-w-md h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-3 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
              <Bot size={24} />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="text-white font-bold leading-tight">Surkhsha AI</h2>
            <p className="text-blue-100 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Online Assistant
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={clearChat}
            className="p-1.5 text-blue-100 hover:text-white hover:bg-blue-500 rounded-lg transition-colors"
            title="Clear chat"
          >
            <Trash2 size={18} />
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 text-blue-100 hover:text-white hover:bg-blue-500 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`mt-auto w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.sender === "user" ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600"
              }`}>
                {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className="flex flex-col gap-1">
                <div className={`relative px-4 py-2.5 rounded-2xl shadow-sm text-sm group ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                }`}>
                  {msg.text}
                  
                  {msg.sender === "bot" && (
                    <button 
                      onClick={() => copyToClipboard(msg.text, idx)}
                      className="absolute -right-8 top-0 p-1 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy message"
                    >
                      {copiedIndex === idx ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
                <span className={`text-[10px] text-gray-400 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start items-center gap-2"
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-gray-100 px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <motion.span 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                ></motion.span>
                <motion.span 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                ></motion.span>
                <motion.span 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                ></motion.span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length < 3 && !loading && (
        <div className="px-4 py-2 bg-gray-50/50 flex flex-wrap gap-2">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              className="text-xs bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="relative flex items-center gap-2">
          <textarea
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full pl-4 pr-12 py-3 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none resize-none text-sm"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className={`absolute right-1.5 p-2 rounded-lg transition-all ${
              loading || !input.trim() 
                ? "text-gray-400 cursor-not-allowed" 
                : "text-blue-600 hover:bg-blue-50"
            }`}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
          <Info size={10} />
          Surkhsha AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}
