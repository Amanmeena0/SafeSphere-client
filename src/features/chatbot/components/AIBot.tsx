import { useState, useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Send, 
  X, 
  Bot, 
  User, 
  Loader2, 
  Trash2, 
  Copy, 
  Check, 
  Info,
  Sparkles
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 400, damping: 28 }
    }
  };

  return (
    <div className="w-[90vw] max-w-md h-[600px] max-h-[80vh] bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 flex flex-col overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
      
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-5 flex justify-between items-center shadow-lg relative z-10"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-inner border border-white/30"
            >
              <Bot size={28} />
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow-sm"
            ></motion.div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-lg tracking-tight">Surkhsha AI</h2>
              <Sparkles size={14} className="text-blue-200 animate-pulse" />
            </div>
            <p className="text-blue-100 text-[11px] font-medium flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Always here to help
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            whileTap={{ scale: 0.9 }}
            onClick={clearChat}
            className="p-2 text-blue-100 hover:text-white rounded-xl transition-all"
            title="Clear chat"
          >
            <Trash2 size={20} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 text-blue-100 hover:text-white rounded-xl transition-all"
          >
            <X size={22} />
          </motion.button>
        </div>
      </motion.div>

      {/* Messages Area */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-grow overflow-y-auto p-5 space-y-6 bg-transparent relative z-0 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={`${idx}-${msg.timestamp}`}
              variants={itemVariants}
              layout
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[88%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`mt-auto w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                    msg.sender === "user" 
                      ? "bg-blue-600 text-white" 
                      : "bg-white border border-gray-100 text-indigo-600"
                  }`}
                >
                  {msg.sender === "user" ? <User size={18} /> : <Bot size={18} />}
                </motion.div>
                
                <div className={`flex flex-col gap-1.5 ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <motion.div 
                    layoutId={`bubble-${idx}`}
                    className={`relative px-4 py-3 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.05)] text-sm group transition-all duration-300 ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-none hover:border-blue-100"
                    }`}
                  >
                    <div className={`leading-relaxed ${msg.sender === "user" ? "text-white" : "text-gray-800"}`}>
                      {msg.sender === "bot" ? (
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                            a: ({node, ...props}) => <a className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                            code: ({node, ...props}) => <code className="bg-gray-100 px-1 rounded text-xs font-mono" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        <p>{msg.text}</p>
                      )}
                    </div>
                    
                    {msg.sender === "bot" && (
                      <motion.button 
                        initial={{ opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="absolute -right-9 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all bg-white rounded-lg shadow-sm border border-gray-100"
                        onClick={() => copyToClipboard(msg.text, idx)}
                        title="Copy message"
                      >
                        {copiedIndex === idx ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </motion.button>
                    )}
                  </motion.div>
                  <span className="text-[10px] font-medium text-gray-400 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-start items-center gap-3"
          >
            <div className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
              <Bot size={18} />
            </div>
            <div className="bg-white border border-gray-100 px-5 py-3 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-2 items-center h-4">
                {[0, 0.15, 0.3].map((delay) => (
                  <motion.span 
                    key={delay}
                    animate={{ 
                      scale: [1, 1.4, 1],
                      backgroundColor: ["#cbd5e1", "#4f46e5", "#cbd5e1"]
                    }} 
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1, 
                      delay 
                    }}
                    className="w-2 h-2 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </motion.div>

      {/* Suggested Questions */}
      <AnimatePresence>
        {messages.length < 3 && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-5 py-3 flex flex-wrap gap-2 relative z-10"
          >
            {suggestedQuestions.map((q, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2, backgroundColor: "#f8fafc", borderColor: "#3b82f6" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage(q)}
                className="text-[11px] font-semibold bg-white/80 backdrop-blur-sm border border-gray-200 text-blue-600 px-4 py-2 rounded-xl shadow-sm transition-all"
              >
                {q}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-5 bg-white border-t border-gray-100/50 relative z-10"
      >
        <div className="relative flex items-center gap-3 bg-gray-50 p-1.5 rounded-[1.25rem] border border-gray-100 focus-within:border-blue-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-300">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="How can Surkhsha help you?"
            className="flex-grow pl-3 pr-10 py-3 bg-transparent border-none outline-none resize-none text-sm font-medium text-gray-700 placeholder:text-gray-400"
          />
          <motion.button
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className={`absolute right-2 p-3 rounded-2xl shadow-lg transition-all ${
              loading || !input.trim() 
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" 
                : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/25"
            }`}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </motion.button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="h-[1px] w-4 bg-gray-100"></div>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <Info size={10} className="text-blue-400" />
            AI Assistant by SafeSphere
          </p>
          <div className="h-[1px] w-4 bg-gray-100"></div>
        </div>
      </motion.div>
    </div>
  );
}
