"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;
    setLoading(true);

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const assistantMessage: Message = {
      role: "assistant",
      content: data.response,
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>💬 Chat assistant</CardTitle>
        <p className="text-gray-500 text-sm">How can I help you today?</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center">Асуулт бичээрэй...</p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-black text-white ml-8"
                  : "bg-gray-100 text-gray-800 mr-8"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="bg-gray-100 text-gray-800 mr-8 p-3 rounded-lg">
              Бодож байна...
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} disabled={!input || loading}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
