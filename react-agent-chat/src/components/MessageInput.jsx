import { useState } from "react";
import "../App.css";

export default function MessageInput({ agent, onSend, disabled }) {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (agent === "imagem" && !input && !imageUrl) return;
    if (agent === "atendente" && !input) return;
    onSend(input, agent === "imagem" ? imageUrl : null);
    setInput("");
    setImageUrl("");
  };

  return (
    <form className="message-input" onSubmit={handleSend}>
      {agent === "imagem" && (
        <input
          type="url"
          placeholder="URL da imagem (opcional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={disabled}
          className="image-url-input"
        />
      )}
      <input
        type="text"
        placeholder={
          agent === "imagem"
            ? "Pergunte ou envie uma URL de imagem..."
            : "Digite sua pergunta para o atendente..."
        }
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        className="main-input"
      />
      <button type="submit" disabled={disabled || (!input && agent === "atendente")}>Enviar</button>
    </form>
  );
}
