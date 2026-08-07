import React, { useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaMicrochip, FaPalette, FaPlay } from "react-icons/fa";
import { useSwarm } from "../../context/SwarmContext";
import { useTheme } from "../../context/ThemeContext";
import { useAgent } from "../../context/AgentContext";

function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I am your Autonomous AI Portfolio Assistant. How can I help you navigate projects, switch themes, or run multi-agent workflows?",
    },
  ]);

  const { dispatchEvent } = useSwarm();
  const { applyPreset, setIsCustomizerOpen } = useTheme();
  const { runOrchestratorPipeline } = useAgent();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const userMsg = { id: Date.now(), sender: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI response logic with action routing
    setTimeout(() => {
      let replyText = "I have processed your query through the Multi-Agent LLM Router.";
      const lower = userText.toLowerCase();

      if (lower.includes("theme") || lower.includes("cyberpunk") || lower.includes("matrix")) {
        if (lower.includes("cyberpunk")) applyPreset("cyberpunk");
        else if (lower.includes("matrix")) applyPreset("matrix");
        else setIsCustomizerOpen(true);
        replyText = "Customization Studio triggered! Applied requested theme settings.";
      } else if (lower.includes("push") || lower.includes("trigger") || lower.includes("run")) {
        runOrchestratorPipeline();
        replyText = "Simulating Git Push event... Multi-agent workflow has been launched across all 10 pipeline steps!";
      } else if (lower.includes("project") || lower.includes("repo")) {
        replyText = "We currently have 3+ indexed repositories. Try running the 80+ Agent Swarm Cascade in the Orchestrator panel to auto-generate more!";
      } else if (lower.includes("resume") || lower.includes("cv")) {
        replyText = "The AI Agent automatically updates resume bullet points whenever code diffs are ingested!";
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: "ai", text: replyText },
      ]);

      // Emit event on Bus
      dispatchEvent("chat.received", { query: userText });
    }, 500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-black font-bold shadow-2xl shadow-primary/40 hover:scale-110 transition-all duration-300 flex items-center justify-center border border-white/20"
        title="Open AI Assistant"
      >
        <FaRobot className="text-xl" />
      </button>

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-[#0b0f19]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col h-96 animate-fade-in">
          {/* Header */}
          <div className="p-3.5 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FaRobot className="text-primary" /> AI Portfolio Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-textMuted hover:text-white transition-colors p-1"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>

          {/* Quick Action Chips */}
          <div className="p-2 bg-black/30 border-b border-white/5 flex gap-1.5 overflow-x-auto text-[10px] custom-scrollbar">
            <button
              onClick={() => {
                runOrchestratorPipeline();
                setMessages((prev) => [
                  ...prev,
                  { id: Date.now(), sender: "ai", text: "Launching Git Push Multi-Agent pipeline..." },
                ]);
              }}
              className="px-2.5 py-1 rounded-md bg-white/5 text-primary border border-primary/20 hover:bg-primary hover:text-black font-bold whitespace-nowrap flex items-center gap-1"
            >
              <FaPlay className="text-[8px]" /> Trigger Git Push
            </button>
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="px-2.5 py-1 rounded-md bg-white/5 text-secondary border border-secondary/20 hover:bg-secondary hover:text-black font-bold whitespace-nowrap flex items-center gap-1"
            >
              <FaPalette className="text-[8px]" /> Change Theme
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 custom-scrollbar text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-black font-semibold rounded-br-none"
                      : "bg-white/10 text-slate-200 border border-white/5 rounded-bl-none font-mono"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-2.5 bg-black/40 border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder="Ask AI Assistant..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-textMuted focus:outline-none focus:border-primary font-mono"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-primary text-black font-bold disabled:opacity-50 hover:scale-105 transition-all"
            >
              <FaPaperPlane className="text-xs" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AIAssistantWidget;
