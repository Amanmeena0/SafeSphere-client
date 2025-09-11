
import { useState } from "react";
import Chatbot from "./AIBot"; // Your full chat UI component

function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating circle button, only show when closed */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-2xl flex items-center justify-center text-white text-3xl hover:scale-105 transition-all duration-200"
          title="Open Chatbot"
        >
          <img src="src/assets/LOGO.png" alt="Chat Icon" className="w-8 h-8" />
        </button>
      )}
      {/* Chatbot box, only show when open */}
      <Chatbot open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default ChatWidget;
