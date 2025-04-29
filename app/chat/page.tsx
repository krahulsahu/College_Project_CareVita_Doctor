"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Paperclip, Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

interface Message {
  id: string
  content: string
  sender: "doctor" | "patient" | "ai"
  timestamp: Date
}

export default function ChatPage() {
  const params = useParams()
  const patientId = params.id
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [patientName, setPatientName] = useState("")

  useEffect(() => {
    // In a real app, fetch chat history and patient info from API
    setTimeout(() => {
      setPatientName(
        patientId === "1"
          ? "Rahul"
          : patientId === "2" || patientId === "3"
            ? "Dinanath Kumar"
            : patientId === "4"
              ? "Priya Sharma"
              : patientId === "5"
                ? "Amit Patel"
                : patientId === "6"
                  ? "Sneha Gupta"
                  : patientId === "7"
                    ? "Rajesh Singh"
                    : "Patient",
      )

      setMessages([
        {
          id: "1",
          content: `Hello Doctor, I've been experiencing some symptoms and would like your advice.`,
          sender: "patient",
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: "2",
          content: `Hello! I'm happy to help. Could you please describe your symptoms in detail?`,
          sender: "doctor",
          timestamp: new Date(Date.now() - 3500000),
        },
        {
          id: "3",
          content: `I've been having headaches and feeling dizzy for the past two days. Also, I have a slight fever.`,
          sender: "patient",
          timestamp: new Date(Date.now() - 3400000),
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [patientId])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const doctorMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "doctor",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, doctorMessage])
    setNewMessage("")
    setIsSending(true)

    // Simulate patient response
    setTimeout(() => {
      const patientMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for the information, Doctor. I'll follow your advice.",
        sender: "patient",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, patientMessage])
      setIsSending(false)
    }, 2000)
  }

  const handleAIAssistance = async () => {
    setIsSending(true)

    try {
      // Get the last few messages for context
      const recentMessages = messages
        .slice(-3)
        .map((msg) => msg.content)
        .join("\n")

      // In a real app, you would use the AI SDK to get a response
      const result = streamText({
        model: openai("gpt-4o"),
        prompt: `You are a medical assistant helping a doctor. Based on this conversation:\n${recentMessages}\n\nProvide a helpful medical suggestion or possible diagnosis:`,
      })

      // Create a placeholder for the AI message
      const aiMessageId = Date.now().toString()
      const aiMessage: Message = {
        id: aiMessageId,
        content: "",
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])

      // Update the message as chunks come in
      result.onChunk(({ chunk }) => {
        if (chunk.type === "text-delta") {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === aiMessageId ? { ...msg, content: msg.content + chunk.text } : msg)),
          )
        }
      })

      await result.text
    } catch (error) {
      console.error("Error getting AI assistance:", error)

      // Add a fallback message if AI fails
      const aiMessage: Message = {
        id: Date.now().toString(),
        content:
          "Based on the symptoms described, this could be a case of a viral infection or migraine. I recommend rest, hydration, and monitoring temperature. If symptoms persist for more than 3 days or worsen, further examination would be necessary.",
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } finally {
      setIsSending(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (isLoading) {
    return (
      <DashboardLayout title="Chat">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title={`Chat with ${patientName}`}>
      <div className="flex flex-col h-[calc(100vh-10rem)]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-lg border bg-white">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "doctor" ? "justify-end" : "justify-start"}`}>
              {message.sender === "patient" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" alt={patientName} />
                  <AvatarFallback>{patientName[0]}</AvatarFallback>
                </Avatar>
              )}

              <Card
                className={`max-w-[80%] ${
                  message.sender === "ai"
                    ? "bg-purple-50 border-purple-200"
                    : message.sender === "doctor"
                      ? "bg-blue-50 border-blue-200"
                      : ""
                }`}
              >
                <CardContent className="p-3">
                  <div className="flex flex-col">
                    <div className="text-sm">{message.content}</div>
                    <div className="text-xs text-gray-500 mt-1 self-end">{formatTime(message.timestamp)}</div>
                  </div>
                </CardContent>
              </Card>

              {message.sender === "doctor" && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarImage src="/placeholder.svg" alt="Doctor" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isSending && (
            <div className="flex justify-start">
              <div className="bg-gray-200 rounded-full px-4 py-2">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce animation-delay-200"></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce animation-delay-400"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2 items-center">
          <Button variant="outline" size="icon" title="Attach file">
            <Paperclip className="h-4 w-4" />
          </Button>

          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="flex-1"
          />

          <Button onClick={handleSendMessage} disabled={!newMessage.trim() || isSending}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>

          <Button variant="secondary" onClick={handleAIAssistance} disabled={isSending} title="Get AI assistance">
            AI Assist
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
