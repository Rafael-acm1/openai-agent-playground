import "../App.css";

export default function MessageBubble({ message, loading }) {
  const { sender, text, image, agentType } = message;
  let bubbleClass = "bubble ";
  if (sender === "user") bubbleClass += "bubble-user";
  else if (sender === "agent") bubbleClass += "bubble-agent";
  else bubbleClass += "bubble-system";

  // Nome do agente
  let senderName = "";
  if (sender === "user") senderName = "Você";
  else if (sender === "agent") senderName = agentType === "imagem" ? "reconhecedor de imagens" : "Atendente";
  else senderName = "Sistema";

  return (
    <div className={bubbleClass}>
      {image && (
        <div className="bubble-image">
          <img src={image} alt="Imagem enviada" />
        </div>
      )}
      <div>
        <span className="bubble-sender">{senderName}</span>
        <div className="bubble-text">{loading ? <span className="typing">...</span> : text}</div>
      </div>
    </div>
  );
}
