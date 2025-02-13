import { Card } from "react-bootstrap";

const MessageBubble = ({ message, isMine }) => {
  return (
    <div className={`d-flex ${isMine ? "justify-content-end" : "justify-content-start"} mb-2`}>
      <Card
        className={`p-2 ${isMine ? "bg-primary text-white" : "bg-light text-dark"}`}
        style={{ maxWidth: "75%" }}
      >
        <Card.Text>{message.content}</Card.Text>
        <div className="text-end text-muted small">
          {new Date(message.timestamp).toLocaleTimeString()} 
          {isMine && message.read && " ✅"} 
        </div>
      </Card>
    </div>
  );
};

export default MessageBubble;
