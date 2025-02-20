"use client";
import { useState } from "react";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error connecting to chatbot.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Chat with the Bot</h2>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={sendMessage}
          className="w-full mt-4 p-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition disabled:bg-gray-600"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
        {response && (
          <div className="mt-4 p-3 bg-gray-700 rounded-lg text-gray-300">
            <strong>Bot:</strong> {response}
          </div>
        )}
      </div>
    </div>
  );
}
