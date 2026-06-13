import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import Chatbot from "./AIBot";

function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-end justify-end">
      <AnimatePresence initial={false}>
        {!open ? (
          <motion.div
            key="chat-button"
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 45, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
              className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-[0_10px_25px_-5px_rgba(59,130,246,0.5)] flex items-center justify-center group overflow-hidden"
              title="Open Surkhsha Chatbot"
            >
              <MessageCircle size={32} className="group-hover:scale-110 transition-transform duration-300" />
              
              {/* Notification Dot with Pulse */}
              <span className="absolute top-4 right-4 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-white"></span>
              </span>

              {/* Orbital Pulse Effect */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-white/20"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, y: 20, filter: "blur(10px)", transition: { duration: 0.2 } }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 350
            }}
            className="origin-bottom-right relative"
          >
            {/* Soft Glow Background */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none"></div>
            
            <Chatbot open={open} onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatWidget;
