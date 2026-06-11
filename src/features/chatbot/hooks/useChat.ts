import { useState } from 'react';
import { botService } from '../services/bot.service';

export interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const useChat = (initialMessages: Message[] = []) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    const messageText = text.trim();
    if (!messageText) return;

    const userMessage: Message = {
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await botService.sendMessage(messageText);
      const botMessage: Message = {
        sender: "bot",
        text: data.result || "No response received.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Sorry, I'm having trouble connecting right now. Please try again later.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages(initialMessages);
  };

  return {
    messages,
    loading,
    sendMessage,
    clearMessages
  };
};
