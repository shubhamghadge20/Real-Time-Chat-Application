import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import MessageBubble from "./MessageBubble";
import axios from "axios";
import { Container, Form, Button, InputGroup } from "react-bootstrap";

const Chat = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState("");

  useEffect(() => {
    // Load chat history from database
    axios.get("http://localhost:5000/messages")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));

    // Handler for receiving messages
    const handleReceiveMessage = (data) => {
      setMessages((prev) => {
        const isDuplicate = prev.some((msg) => msg.timestamp === data.timestamp);
        return isDuplicate ? prev : [...prev, data];
      });
    };

    // Typing indicator handler
    const handleTyping = (user) => {
      setTyping(`${user} is typing...`);
      setTimeout(() => setTyping(""), 2000);
    };

    socket?.on("receiveMessage", handleReceiveMessage);
    socket?.on("userTyping", handleTyping);

    return () => {
      socket?.off("receiveMessage", handleReceiveMessage);
      socket?.off("userTyping", handleTyping);
    };
  }, [socket]);

  const sendMessage = async () => {
    if (message.trim()) {
      const newMsg = { sender: "User", content: message, timestamp: new Date().toISOString() };

      // Emit message via socket only (No state update here)
      socket.emit("sendMessage", newMsg);

      try {
        // Save to database
        await axios.post("http://localhost:5000/messages", newMsg);
      } catch (error) {
        console.error("Error saving message:", error);
      }

      setMessage(""); // Clear input field
    }
  };

  return (
    <Container className="d-flex flex-column vh-100 p-4 bg-light">
      <h2 className="text-center mb-3">Chat Room</h2>

      <div className="flex-grow-1 overflow-auto border p-3 rounded bg-white">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} isMine={msg.sender === "User"} />
        ))}
      </div>

      {typing && <p className="text-muted small mt-2">{typing}</p>}

      <InputGroup className="mt-3">
        <Form.Control
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            socket.emit("typing", "User");
          }}
        />
        <Button variant="primary" onClick={sendMessage}>
          Send
        </Button>
      </InputGroup>
    </Container>
  );
};

export default Chat;
