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

  const pollStatus = (taskId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const data = await botService.getTaskStatus(taskId);
          
          if (data.status === 'SUCCESS') {
            clearInterval(interval);
            resolve(data.result || "I'm sorry, I couldn't generate a response.");
          } else if (data.status === 'FAILURE') {
            clearInterval(interval);
            reject(new Error('Bot failed to generate an answer.'));
          }
          // If status is PENDING, we just wait for the next interval
        } catch (error) {
          clearInterval(interval);
          reject(error);
        }
      }, 1500); // Poll every 1.5 seconds
    });
  };

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
      // 1. Submit Query
      const { task_id, result } = await botService.generateAnswer(messageText);

      // 2. Get Results (Use immediate result if available, otherwise poll)
      let resultText = result;
      
      if (!resultText) {
        resultText = await pollStatus(task_id);
      }

      const botMessage: Message = {
        sender: "bot",
        text: resultText || "I'm sorry, I couldn't generate a response.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
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
