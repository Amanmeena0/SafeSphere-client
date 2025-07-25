import { useState } from "react";
import Chatbot from "./AIBot"; // Your full chat UI component

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-6 z-50 shadow-lg rounded-lg border border-gray-300">
          <Chatbot />
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-10 right-20 z-50 bg-blue-500 hover:bg-blue-700 text-white p-6 rounded-full shadow-xl focus:outline-none"
        title="Open Chatbot"
      >
        <img src="src/assets/LOGO.png" alt="Chat Icon" className="w-6 h-6" />
      </button>
    </>
  );
}
