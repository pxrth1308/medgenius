"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, User, Bot } from "lucide-react"

export default function AIAssistant() {
  const [message, setMessage] = useState("")

  // Sample chat messages
  const chatMessages = [
    { role: "bot", content: "Hello! I'm your AI health assistant. How can I help you today?" },
    { role: "user", content: "I've been having headaches for the past few days." },
    {
      role: "bot",
      content:
        "I'm sorry to hear that. Can you tell me more about your headaches? When did they start, and how would you describe the pain?",
    },
    {
      role: "user",
      content:
        "They started about 3 days ago. The pain is mostly on one side of my head and gets worse in the afternoon.",
    },
    {
      role: "bot",
      content:
        "Thank you for sharing that information. There could be several causes for your headaches, including tension, dehydration, or migraines. Have you noticed any triggers or other symptoms accompanying the headaches?",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8 mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">AI Health Assistant</h1>
        </div>

        <div className="flex flex-col h-[calc(100vh-180px)]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start max-w-[80%] ${msg.role === "user" ? "bg-primary text-white" : "bg-gray-100"} rounded-2xl p-3`}
                >
                  {msg.role === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center ml-2 flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-white">
            <div className="relative">
              <Input
                placeholder="Type your health question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="pr-12 h-12 rounded-xl input-shadow"
              />
              <Button
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full p-0"
                variant="ghost"
              >
                <Send className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

