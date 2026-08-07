import React, { useState } from "react";
import { FaRobot, FaPaperPlane, FaMicrochip, FaPlay, FaPalette } from "react-icons/fa";
import { useSwarm } from "../context/SwarmContext";
import { useAgent } from "../context/AgentContext";
import { useTheme } from "../context/ThemeContext";

function AssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Welcome to the AI Assistant Command Studio. You can ask me to inspect code, trigger workflow automation recipes, or switch profile themes." }
  ]);

  const { dispatchEvent } = useSwarm();
  const { runOrchestratorPipeline } = useAgent();
  const { setIsCustomizerOpen } = useTheme();

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: userText }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "ai", text: `Processed query: "${userText}". Executed LLM Routing Agent.` },
      ]);
      dispatchEvent("chat.received", { query: userText });
    }, 400);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
          🤖 Interactive Assistant Studio
        </div>
        <h1 className="text-4xl font-extrabold text-white">AI Assistant & Command Center</h1>
      </div>

      <div className="p-6 rounded-2xl bg-black/70 border border-white/10 flex flex-col h-[500px] shadow-2xl">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar text-xs font-mono">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${m.sender === "user" ? "bg-primary text-black font-bold" : "bg-white/10 text-slate-200 border border-white/5"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="pt-4 border-t border-white/10 flex gap-2">
          <input
            type="text"
            placeholder="Type your instruction or prompt for the AI Swarm..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-textMuted focus:outline-none focus:border-primary font-mono"
          />
          <button type="submit" className="px-6 py-3 rounded-xl bg-primary text-black font-bold text-xs uppercase flex items-center gap-2">
            <FaPaperPlane /> Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssistantPage;
