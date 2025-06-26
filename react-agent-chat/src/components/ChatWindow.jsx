import MessageBubble from "./MessageBubble";
import "../App.css";

export default function ChatWindow({ messages, loading }) {
  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} />
      ))}
      {loading && (
        <MessageBubble message={{ sender: "agent", text: "..." }} loading />
      )}
    </div>
  );
}
