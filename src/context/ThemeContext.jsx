import React, { createContext, useContext, useState, useEffect } from "react";

export const THEME_PRESETS = {
  developer: {
    id: "developer",
    name: "Developer Theme",
    icon: "💻",
    description: "Cyber-slate glass with emerald & purple tech accents.",
    colors: {
      primary: "#10b981",
      secondary: "#8b5cf6",
      accent: "#06b6d4",
      background: "#090d16",
      cardBg: "rgba(15, 23, 42, 0.75)",
      border: "rgba(16, 185, 129, 0.25)",
      text: "#f8fafc",
      textMuted: "#94a3b8",
      glow: "#10b981",
    },
    fontFamily: "'JetBrains Mono', monospace",
    particleType: "synaptic",
  },
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk Theme",
    icon: "🌆",
    description: "High-contrast neon cyan & magenta with grid overlays.",
    colors: {
      primary: "#00f0ff",
      secondary: "#ff007f",
      accent: "#ffe600",
      background: "#05050a",
      cardBg: "rgba(10, 10, 20, 0.85)",
      border: "rgba(0, 240, 255, 0.35)",
      text: "#ffffff",
      textMuted: "#a0a5c0",
      glow: "#00f0ff",
    },
    fontFamily: "'Orbitron', sans-serif",
    particleType: "matrix",
  },
  ai_scientist: {
    id: "ai_scientist",
    name: "AI Scientist Theme",
    icon: "🧬",
    description: "Deep space midnight with synaptic node networks.",
    colors: {
      primary: "#38bdf8",
      secondary: "#6366f1",
      accent: "#a855f7",
      background: "#030712",
      cardBg: "rgba(17, 24, 39, 0.8)",
      border: "rgba(56, 189, 248, 0.3)",
      text: "#f3f4f6",
      textMuted: "#9ca3af",
      glow: "#38bdf8",
    },
    fontFamily: "'Outfit', sans-serif",
    particleType: "synaptic",
  },
  minimal: {
    id: "minimal",
    name: "Minimal Theme",
    icon: "⚪",
    description: "Clean monochrome with razor-thin borders and refined type.",
    colors: {
      primary: "#e2e8f0",
      secondary: "#94a3b8",
      accent: "#38bdf8",
      background: "#0a0a0a",
      cardBg: "rgba(23, 23, 23, 0.8)",
      border: "rgba(255, 255, 255, 0.12)",
      text: "#fafafa",
      textMuted: "#737373",
      glow: "#ffffff",
    },
    fontFamily: "'Inter', sans-serif",
    particleType: "none",
  },
  glass: {
    id: "glass",
    name: "Glass Theme",
    icon: "🪟",
    description: "High backdrop-blur frosted glass with vibrant auroras.",
    colors: {
      primary: "#a78bfa",
      secondary: "#f472b6",
      accent: "#38bdf8",
      background: "#0c0a1d",
      cardBg: "rgba(255, 255, 255, 0.07)",
      border: "rgba(255, 255, 255, 0.2)",
      text: "#ffffff",
      textMuted: "#cbd5e1",
      glow: "#a78bfa",
    },
    fontFamily: "'Syne', sans-serif",
    particleType: "aurora",
  },
  space: {
    id: "space",
    name: "Space Theme",
    icon: "🌌",
    description: "Cosmic nebula background with floating starfield.",
    colors: {
      primary: "#818cf8",
      secondary: "#c084fc",
      accent: "#fbbf24",
      background: "#050515",
      cardBg: "rgba(15, 15, 40, 0.75)",
      border: "rgba(129, 140, 248, 0.3)",
      text: "#f1f5f9",
      textMuted: "#94a3b8",
      glow: "#fbbf24",
    },
    fontFamily: "'Outfit', sans-serif",
    particleType: "starfield",
  },
  matrix: {
    id: "matrix",
    name: "Matrix Theme",
    icon: "🟢",
    description: "CRT digital rain with glowing green scanlines.",
    colors: {
      primary: "#22c55e",
      secondary: "#15803d",
      accent: "#4ade80",
      background: "#020d04",
      cardBg: "rgba(4, 26, 12, 0.85)",
      border: "rgba(34, 197, 94, 0.35)",
      text: "#dcfce7",
      textMuted: "#86efac",
      glow: "#22c55e",
    },
    fontFamily: "'Fira Code', monospace",
    particleType: "matrix",
  },
  gaming: {
    id: "gaming",
    name: "Gaming Theme",
    icon: "🎮",
    description: "High-energy dark charcoal with dynamic RGB pulsing accents.",
    colors: {
      primary: "#ff4655",
      secondary: "#00e676",
      accent: "#00b0ff",
      background: "#0e1015",
      cardBg: "rgba(22, 26, 35, 0.85)",
      border: "rgba(255, 70, 85, 0.35)",
      text: "#ffffff",
      textMuted: "#8e9bb0",
      glow: "#ff4655",
    },
    fontFamily: "'Orbitron', sans-serif",
    particleType: "rgb",
  },
  luxury: {
    id: "luxury",
    name: "Luxury Theme",
    icon: "👑",
    description: "Deep obsidian & metallic gold with velvet shadow depth.",
    colors: {
      primary: "#fbbf24",
      secondary: "#d97706",
      accent: "#fef08a",
      background: "#0c0a09",
      cardBg: "rgba(28, 25, 23, 0.85)",
      border: "rgba(251, 191, 36, 0.3)",
      text: "#fafaf9",
      textMuted: "#a8a29e",
      glow: "#fbbf24",
    },
    fontFamily: "'Syne', serif",
    particleType: "starfield",
  },
  corporate: {
    id: "corporate",
    name: "Corporate Theme",
    icon: "🏢",
    description: "Executive navy & platinum with clean structure.",
    colors: {
      primary: "#2563eb",
      secondary: "#0284c7",
      accent: "#38bdf8",
      background: "#0f172a",
      cardBg: "rgba(30, 41, 59, 0.8)",
      border: "rgba(37, 99, 235, 0.25)",
      text: "#f8fafc",
      textMuted: "#94a3b8",
      glow: "#2563eb",
    },
    fontFamily: "'Inter', sans-serif",
    particleType: "none",
  },
  terminal: {
    id: "terminal",
    name: "Terminal Theme",
    icon: "📟",
    description: "Vintage retro amber/green phosphor CRT monitor glow.",
    colors: {
      primary: "#f59e0b",
      secondary: "#d97706",
      accent: "#fbbf24",
      background: "#0c0904",
      cardBg: "rgba(30, 20, 8, 0.85)",
      border: "rgba(245, 158, 11, 0.35)",
      text: "#fef3c7",
      textMuted: "#fde68a",
      glow: "#f59e0b",
    },
    fontFamily: "'Fira Code', monospace",
    particleType: "matrix",
  },
  hologram_3d: {
    id: "hologram_3d",
    name: "3D Hologram Theme",
    icon: "🔮",
    description: "Cyan holographic wireframe shaders with 3D grid overlays.",
    colors: {
      primary: "#06b6d4",
      secondary: "#3b82f6",
      accent: "#67e8f9",
      background: "#04111d",
      cardBg: "rgba(8, 30, 50, 0.8)",
      border: "rgba(6, 182, 212, 0.4)",
      text: "#ecfeff",
      textMuted: "#a5f3fc",
      glow: "#06b6d4",
    },
    fontFamily: "'Orbitron', sans-serif",
    particleType: "synaptic",
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [activeThemeId, setActiveThemeId] = useState(() => {
    return localStorage.getItem("portfolio_theme_id") || "developer";
  });

  const [activeTheme, setActiveTheme] = useState(
    THEME_PRESETS[activeThemeId] || THEME_PRESETS.developer
  );

  const [customColors, setCustomColors] = useState(() => {
    const saved = localStorage.getItem("portfolio_custom_colors");
    return saved ? JSON.parse(saved) : activeTheme.colors;
  });

  const [fontFamily, setFontFamily] = useState(activeTheme.fontFamily);
  const [particleType, setParticleType] = useState(activeTheme.particleType);
  const [enableCursor, setEnableCursor] = useState(true);
  const [enableTilt, setEnableTilt] = useState(true);
  const [enableGlass, setEnableGlass] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Apply theme preset changes
  const applyPreset = (presetId) => {
    const preset = THEME_PRESETS[presetId];
    if (!preset) return;
    setActiveThemeId(presetId);
    setActiveTheme(preset);
    setCustomColors(preset.colors);
    setFontFamily(preset.fontFamily);
    setParticleType(preset.particleType);
    localStorage.setItem("portfolio_theme_id", presetId);
  };

  // Synchronize CSS variables with state
  useEffect(() => {
    const root = document.documentElement;
    const colors = customColors || activeTheme.colors;

    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-bg", colors.background);
    root.style.setProperty("--color-card-bg", colors.cardBg);
    root.style.setProperty("--color-border", colors.border);
    root.style.setProperty("--color-text", colors.text);
    root.style.setProperty("--color-text-muted", colors.textMuted);
    root.style.setProperty("--color-glow", colors.glow);
    root.style.setProperty("--font-primary", fontFamily);

    localStorage.setItem("portfolio_custom_colors", JSON.stringify(colors));
  }, [customColors, activeTheme, fontFamily]);

  const updateCustomColor = (key, value) => {
    setCustomColors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ThemeContext.Provider
      value={{
        THEME_PRESETS,
        activeThemeId,
        activeTheme,
        applyPreset,
        customColors,
        updateCustomColor,
        setCustomColors,
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
