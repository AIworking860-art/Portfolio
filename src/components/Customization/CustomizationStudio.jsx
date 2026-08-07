import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  FaPalette,
  FaFont,
  FaMagic,
  FaTimes,
  FaCheck,
  FaDesktop,
  FaSlidersH,
  FaMoon,
  FaSun,
  FaAtom,
} from "react-icons/fa";

function CustomizationStudio() {
  const {
    THEME_PRESETS,
    activeThemeId,
    applyPreset,
    customColors,
    updateCustomColor,
    fontFamily,
    setFontFamily,
    particleType,
    setParticleType,
    enableCursor,
    setEnableCursor,
    enableTilt,
    setEnableTilt,
    enableGlass,
    setEnableGlass,
    isDarkMode,
    setIsDarkMode,
    isCustomizerOpen,
    setIsCustomizerOpen,
  } = useTheme();

  const [activeTab, setActiveTab] = useState("presets"); // 'presets' | 'colors' | 'effects' | 'fonts'

  if (!isCustomizerOpen) return null;

  const fontOptions = [
    { name: "JetBrains Mono (Code)", value: "'JetBrains Mono', monospace" },
    { name: "Orbitron (Futuristic)", value: "'Orbitron', sans-serif" },
    { name: "Outfit (Modern Tech)", value: "'Outfit', sans-serif" },
    { name: "Inter (Clean Minimal)", value: "'Inter', sans-serif" },
    { name: "Syne (Luxury Display)", value: "'Syne', sans-serif" },
    { name: "Fira Code (Developer)", value: "'Fira Code', monospace" },
  ];

  const particleOptions = [
    { id: "synaptic", label: "Synaptic Nodes", icon: "🧬" },
    { id: "starfield", label: "Cosmic Starfield", icon: "🌌" },
    { id: "matrix", label: "Matrix Digital Rain", icon: "🟢" },
    { id: "aurora", label: "Ambient Aurora", icon: "🪟" },
    { id: "rgb", label: "RGB Gaming Pulse", icon: "🎮" },
    { id: "none", label: "Geometric Grid Only", icon: "⚪" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-full max-w-md h-full bg-[#0b0f19]/95 border-l border-white/10 p-6 overflow-y-auto flex flex-col shadow-2xl relative animate-slide-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/20 text-primary text-xl border border-primary/30">
              <FaPalette />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Customization Studio
              </h2>
              <p className="text-xs text-textMuted">
                Customize colors, fonts, 3D effects & profile themes
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="p-2 rounded-lg text-textMuted hover:text-white hover:bg-white/10 transition-colors"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-white/5 rounded-xl mb-6 border border-white/5">
          <button
            onClick={() => setActiveTab("presets")}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "presets"
                ? "bg-primary text-black shadow-lg shadow-primary/20"
                : "text-textMuted hover:text-white"
            }`}
          >
            <FaDesktop /> Themes
          </button>
          <button
            onClick={() => setActiveTab("colors")}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "colors"
                ? "bg-primary text-black shadow-lg shadow-primary/20"
                : "text-textMuted hover:text-white"
            }`}
          >
            <FaSlidersH /> Colors
          </button>
          <button
            onClick={() => setActiveTab("effects")}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "effects"
                ? "bg-primary text-black shadow-lg shadow-primary/20"
                : "text-textMuted hover:text-white"
            }`}
          >
            <FaMagic /> Effects
          </button>
          <button
            onClick={() => setActiveTab("fonts")}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "fonts"
                ? "bg-primary text-black shadow-lg shadow-primary/20"
                : "text-textMuted hover:text-white"
            }`}
          >
            <FaFont /> Fonts
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 space-y-6">
          {/* TAB 1: PRESET THEMES */}
          {activeTab === "presets" && (
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted">
                12 Profile Themes
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.values(THEME_PRESETS).map((preset) => {
                  const isActive = activeThemeId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${
                        isActive
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{preset.icon}</span>
                        <div>
                          <h4 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                            {preset.name}
                          </h4>
                          <p className="text-xs text-textMuted line-clamp-1">
                            {preset.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.colors.primary }}
                        />
                        {isActive && <FaCheck className="text-primary text-sm" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOM COLOR PICKER */}
          {activeTab === "colors" && (
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted">
                Live Color Palette Engine
              </h3>
              <div className="space-y-3">
                {[
                  { key: "primary", label: "Primary Accent" },
                  { key: "secondary", label: "Secondary Color" },
                  { key: "accent", label: "Highlight Color" },
                  { key: "background", label: "Background Color" },
                  { key: "glow", label: "Neon Glow" },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between"
                  >
                    <span className="text-xs font-medium text-white">{label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-textMuted uppercase">
                        {customColors[key] || "#10b981"}
                      </span>
                      <input
                        type="color"
                        value={customColors[key] || "#10b981"}
                        onChange={(e) => updateCustomColor(key, e.target.value)}
                        className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EFFECTS & PARTICLES */}
          {activeTab === "effects" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted mb-3">
                  Background Particle Engine
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {particleOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setParticleType(opt.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center gap-2 transition-all ${
                        particleType === opt.id
                          ? "border-primary bg-primary/10 text-white"
                          : "border-white/10 bg-white/5 text-textMuted hover:text-white"
                      }`}
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted mb-3">
                  Interactive Features
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                    <span className="text-xs font-medium text-white flex items-center gap-2">
                      <FaAtom className="text-primary" /> Dynamic Glow Cursor
                    </span>
                    <input
                      type="checkbox"
                      checked={enableCursor}
                      onChange={(e) => setEnableCursor(e.target.checked)}
                      className="accent-primary w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                    <span className="text-xs font-medium text-white flex items-center gap-2">
                      <FaMagic className="text-secondary" /> 3D Tilt Card Physics
                    </span>
                    <input
                      type="checkbox"
                      checked={enableTilt}
                      onChange={(e) => setEnableTilt(e.target.checked)}
                      className="accent-primary w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                    <span className="text-xs font-medium text-white flex items-center gap-2">
                      <FaSlidersH className="text-accent" /> Frosted Glass Depth
                    </span>
                    <input
                      type="checkbox"
                      checked={enableGlass}
                      onChange={(e) => setEnableGlass(e.target.checked)}
                      className="accent-primary w-4 h-4 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TYPOGRAPHY */}
          {activeTab === "fonts" && (
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-textMuted">
                Typography Engine
              </h3>
              <div className="space-y-2">
                {fontOptions.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => setFontFamily(font.value)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                      fontFamily === font.value
                        ? "border-primary bg-primary/10 text-white font-bold"
                        : "border-white/10 bg-white/5 text-textMuted hover:text-white"
                    }`}
                    style={{ fontFamily: font.value }}
                  >
                    <div className="text-sm">{font.name}</div>
                    <div className="text-xs opacity-70 mt-1">
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-white/10 mt-6 text-center text-xs text-textMuted">
          Master AI Portfolio • 2026 Edition
        </div>
      </div>
    </div>
  );
}

export default CustomizationStudio;
