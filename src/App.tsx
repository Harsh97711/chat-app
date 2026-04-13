import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  const messages = useQuery(api.chat.getMessages);
  const sendMessage = useMutation(api.chat.sendMessage);

  const [text, setText] = useState("");
  const [username, setUsername] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>💬 Real-Time Chat</h2>

      {/* Username input */}
      <input
        placeholder="Enter your name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          marginBottom: 10,
          padding: 10,
          width: "100%",
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />

      {/* Chat box */}
      <div
        style={{
          height: 400,
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: 10,
          padding: 10,
          background: "#f5f5f5",
          marginBottom: 10,
        }}
      >
        {messages.map((msg: any, i: number) => {
          const isMe = msg.user === username;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: isMe ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  background: isMe ? "#dcf8c6" : "#fff",
                  padding: "8px 12px",
                  borderRadius: 10,
                  marginBottom: 8,
                  maxWidth: "70%",
                }}
              >
                {/* Username */}
                <div style={{ fontSize: 12, fontWeight: "bold" }}>
                  {msg.user}
                </div>

                {/* Message */}
                <div>{msg.text}</div>

                {/* Time */}
                <div
                  style={{
                    fontSize: 10,
                    textAlign: "right",
                    marginTop: 4,
                  }}
                >
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input box */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={async () => {
            if (!text.trim() || !username.trim()) return;

            await sendMessage({
              text,
              user: username,
            });

            setText("");
          }}
          style={{
            padding: "10px 15px",
            borderRadius: 8,
            border: "none",
            background: "#25D366",
            color: "white",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}