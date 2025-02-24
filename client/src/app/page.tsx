"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io();

export default function Chat() {
  const [messages, setMessages] = useState<{ id: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const message = { senderId: "user1", receiverId: "user2", content: input };

    await axios.post("/api/messages/send", message);
    socket.emit("send-message", message);
    setInput("");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="border rounded-lg p-4 h-96 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="p-2 bg-gray-100 my-2 rounded">
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded mt-2"
      />
      <button onClick={sendMessage} className="w-full bg-blue-500 text-white p-2 mt-2 rounded">
        Send
      </button>
    </div>
  );
}
