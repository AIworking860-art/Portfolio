import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FaPalette, FaCheck, FaPaintBrush } from "react-icons/fa";

function ThemeStorePage() {
  const { THEME_PRESETS, activeThemeId, applyPreset, setIsCustomizerOpen } = useTheme();

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
            🎨 Profile Aesthetics Store
          </div>
          <h1 className="text-4xl font-extrabold text-white">12 Futuristic Theme Store</h1>
          <p className="text-textMuted text-sm mt-1">
            Explore curated developer profile themes managed by the Theme Agent
          </p>
        </div>

        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2"
        >
          <FaPalette /> Custom Theme Studio
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(THEME_PRESETS).map((preset) => {
          const isActive = activeThemeId === preset.id;
          return (
            <div
              key={preset.id}
              onClick={() => applyPreset(preset.id)}
              className={`p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 cursor-pointer space-y-4 flex flex-col justify-between group ${
                isActive
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{preset.icon}</span>
                  {isActive && (
                    <span className="px-2.5 py-1 rounded bg-primary text-black text-[10px] font-bold flex items-center gap-1">
                      <FaCheck /> ACTIVE THEME
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                  {preset.name}
                </h3>
                <p className="text-xs text-textMuted leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.colors.primary }} />
                  <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.colors.secondary }} />
                  <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.colors.accent }} />
                </div>

                <span className="text-xs font-mono text-primary font-bold">Apply Preset →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ThemeStorePage;
