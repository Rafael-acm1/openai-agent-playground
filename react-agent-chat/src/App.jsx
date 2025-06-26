import { useState, useEffect } from "react";
import AgentSelector from "./components/AgentSelector";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import "./App.css";

const AGENTS = [
  { key: "atendente", label: "Atendente" },
  { key: "imagem", label: "Imagem" },
];

const DEFAULT_MESSAGES = {
  atendente: [
    { sender: "system", text: "Você está conversando com o Atendente. Envie sua mensagem!" },
  ],
  imagem: [
    { sender: "system", text: "Você está conversando com o reconhecedor de imagens. Envie uma pergunta ou uma imagem!" },
  ],
};

function getStorageKey(agent) {
  return `chat-history-${agent}`;
}

function loadMessages(agent) {
  const data = localStorage.getItem(getStorageKey(agent));
  return data ? JSON.parse(data) : DEFAULT_MESSAGES[agent];
}

function saveMessages(agent, messages) {
  localStorage.setItem(getStorageKey(agent), JSON.stringify(messages));
}

function App() {
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0].key);
  const [messages, setMessages] = useState(() => loadMessages(AGENTS[0].key));
  const [loading, setLoading] = useState(false);

  // Carregar histórico ao trocar de agente
  useEffect(() => {
    setMessages(loadMessages(selectedAgent));
  }, [selectedAgent]);

  // Salvar histórico ao mudar mensagens
  useEffect(() => {
    saveMessages(selectedAgent, messages);
  }, [messages, selectedAgent]);

  const handleSend = async (input, imageUrl = null) => {
    if (!input && !imageUrl) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: input, image: imageUrl },
    ]);
    setLoading(true);
    try {
      let response;
      if (selectedAgent === "atendente") {
        const res = await fetch("http://localhost:3001/api/atendente", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        });
        const data = await res.json();
        response = data.response;
      } else {
        const res = await fetch("http://localhost:3001/api/imagem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input, imageUrl }),
        });
        const data = await res.json();
        response = data.response;
      }
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "agent",
          text: response,
          agentType: selectedAgent,
        },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "system", text: "Erro ao conectar ao agente. Tente novamente." },
      ]);
    }
    setLoading(false);
  };

  // Resetar chat atual
  const handleReset = () => {
    setMessages(DEFAULT_MESSAGES[selectedAgent]);
    saveMessages(selectedAgent, DEFAULT_MESSAGES[selectedAgent]);
  };

  return (
    <div className="deepseek-bg">
      <div className="chat-container">
        <AgentSelector
          agents={AGENTS}
          selected={selectedAgent}
          onSelect={setSelectedAgent}
        />
        <button className="reset-chat-btn" onClick={handleReset} disabled={loading}>
          Apagar chat
        </button>
        <ChatWindow messages={messages} loading={loading} />
        <MessageInput
          agent={selectedAgent}
          onSend={handleSend}
          disabled={loading}
        />
      </div>
    </div>
  );
}

export default App;
