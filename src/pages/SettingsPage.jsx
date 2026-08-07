import React, { useState } from "react";
import { FaCog, FaKey, FaBell, FaRobot, FaCheck } from "react-icons/fa";

function SettingsPage() {
  const [model, setModel] = useState("Gemini-Flash-3.6");
  const [autoSync, setAutoSync] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
          ⚙️ OS Configuration
        </div>
        <h1 className="text-4xl font-extrabold text-white">System Settings</h1>
      </div>

      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
            <FaRobot /> LLM Model Selection Agent Target
          </h3>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-white font-mono"
          >
            <option value="Gemini-Flash-3.6">Gemini 3.6 Flash (Ultra High Speed)</option>
            <option value="Claude-3.5-Sonnet">Claude 3.5 Sonnet (Architectural Analysis)</option>
            <option value="GPT-4o">GPT-4o (General Purpose Swarm Routing)</option>
          </select>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-secondary uppercase tracking-wider flex items-center gap-2">
            <FaCog /> Automation Toggles
          </h3>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Automatic GitHub Push Sync</div>
              <div className="text-xs text-textMuted">Auto-analyze commits and update portfolio state</div>
            </div>
            <input
              type="checkbox"
              checked={autoSync}
              onChange={(e) => setAutoSync(e.target.checked)}
              className="accent-primary w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white">Browser Event Notifications</div>
              <div className="text-xs text-textMuted">Receive alerts when agent pipeline finishes execution</div>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="accent-primary w-4 h-4 cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase flex items-center gap-2"
          >
            {saved ? <><FaCheck /> Saved!</> : "Save Preferences"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
