"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, User, Bot } from "lucide-react";

// Define a type for chat messages for better type safety
interface ChatMessage {
  role: "user" | "bot";
  content: string;
}

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    // Initial message remains
    { role: "bot", content: "Hello! I'm your AI health assistant. How can I help you today? Remember, I provide general information and cannot offer medical advice. Please consult a healthcare professional for medical concerns." },
  ]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for scrolling behavior

  // --- Function to scroll chat to the bottom ---
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // --- Scroll to bottom when messages change ---
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // --- Handle sending a message (Keeps all functional logic) ---
  const handleSendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    const newUserMessage: ChatMessage = { role: "user", content: trimmedMessage };
    const updatedMessages = [...chatMessages, newUserMessage];
    setChatMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {
      // Fetch call remains the same
      const response = await fetch("/ai-assistant/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
        }),
      });

      if (!response.ok) {
        let errorMsg = `API request failed with status ${response.status}`;
        try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorMsg;
        } catch (parseError) {
            console.error("Could not parse error response:", parseError)
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      const botMessage: ChatMessage = { role: "bot", content: data.reply || "Sorry, I received an empty response." };
      setChatMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", content: `Sorry, I encountered an error: ${errorMessage}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // --- Allow sending message with Enter key (Keeps functional logic) ---
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !loading && message.trim()) {
      handleSendMessage();
    }
  };

  // --- Render the component ---
  return (
    <div className="flex flex-col h-screen bg-gray-50"> {/* Keep bg-gray-50 or match dashboard bg */}
      {/* Header - Keep consistent functional header */}
      <div className="p-4 border-b bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center max-w-4xl mx-auto">
          <Link href="/dashboard" legacyBehavior>
            <a className="flex items-center text-gray-600 hover:text-primary mr-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </a>
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">AI Health Assistant</h1>
        </div>
      </div>

      {/* Chat Messages Area - Keep flex-1 layout */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl w-full mx-auto"
        ref={chatContainerRef}
      >
        {chatMessages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {/* --- Apply STYLING from target UI example --- */}
            <div
              className={`flex items-start max-w-[80%] ${ // Keep max-w
                msg.role === "user"
                  ? "bg-primary text-white ml-auto" // Style for User
                  : "bg-gray-100 text-gray-800 mr-auto" // Style for Bot
              } rounded-2xl p-3 shadow-sm`} // Use rounded-2xl, p-3, add shadow
            >
              {/* Bot Icon - Use styling from target UI example */}
              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              {/* Message Content */}
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p> {/* Keep whitespace */}
              {/* User Icon - Use styling from target UI example */}
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center ml-2 flex-shrink-0"> {/* Changed bg opacity */}
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            {/* --- End STYLING changes for message bubble --- */}
          </div>
        ))}
        {/* Loading Indicator - Keep functional loading state */}
        {loading && (
          <div className="flex justify-start">
             {/* Apply Bot bubble styling to loading indicator */}
             <div className="flex items-start max-w-[80%] bg-gray-100 text-gray-800 mr-auto rounded-2xl p-3 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                   <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="flex space-x-1 items-center h-full py-1">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-0"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-300"></span>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Input Area - Keep sticky layout */}
      <div className="p-4 bg-white border-t sticky bottom-0">
        <div className="relative max-w-4xl mx-auto">
          {/* --- Apply STYLING from target UI example --- */}
          <Input
            placeholder="Type your health question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pr-12 pl-4 h-12 rounded-xl input-shadow border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary" // Use rounded-xl, input-shadow, pr-12
            disabled={loading}
            aria-label="Chat message input"
          />
          <Button
            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full p-0" // Use h-10 w-10
            variant="ghost" // Use ghost variant
            size="icon"
            title="Send message"
            onClick={handleSendMessage}
            disabled={loading || !message.trim()}
          >
            <Send className="h-5 w-5 text-primary" /> {/* Use text-primary icon */}
          </Button>
          {/* --- End STYLING changes for input area --- */}
        </div>
         {/* Disclaimer Text - Keep functional disclaimer */}
         <p className="text-xs text-gray-500 text-center mt-2 max-w-4xl mx-auto px-2">
           AI Health Assistant provides general information only and is not a substitute for professional medical advice. Always consult a qualified healthcare provider for health concerns.
         </p>
      </div>
       {/* Remember to integrate the shared Bottom Navigation Bar via a Layout component */}
    </div>
  );
}

// Add CSS for bounce animation & input-shadow if not globally available
/*
@keyframes bounce { ... }
.animate-bounce { ... }
.delay-0 { ... }
.delay-150 { ... }
.delay-300 { ... }

.input-shadow { // Example - adjust as needed
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
*/