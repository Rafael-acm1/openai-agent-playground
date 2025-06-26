import "../App.css";

export default function AgentSelector({ agents, selected, onSelect }) {
  return (
    <div className="agent-selector">
      {agents.map((agent) => (
        <button
          key={agent.key}
          className={
            "agent-btn" + (selected === agent.key ? " agent-btn-selected" : "")
          }
          onClick={() => onSelect(agent.key)}
        >
          {agent.label}
        </button>
      ))}
    </div>
  );
}
