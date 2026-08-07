import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

function CustomCursor() {
  const { enableCursor, customColors } = useTheme();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (!enableCursor) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button";

      setIsPointer(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enableCursor]);

  if (!enableCursor) return null;

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out rounded-full"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isPointer ? "36px" : "12px",
          height: isPointer ? "36px" : "12px",
          transform: "translate(-50%, -50%)",
          backgroundColor: isPointer ? "transparent" : customColors.primary || "#10b981",
          border: isPointer ? `2px solid ${customColors.primary || "#10b981"}` : "none",
          boxShadow: `0 0 15px ${customColors.glow || "#10b981"}`,
          mixBlendMode: "screen",
        }}
      />
      {/* Ambient Cursor Glow Aura */}
      <div
        className="fixed pointer-events-none z-40 transition-transform duration-300 ease-out rounded-full opacity-30"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: "250px",
          height: "250px",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${customColors.primary || "#10b981"} 0%, transparent 70%)`,
        }}
      />
    </>
  );
}

export default CustomCursor;
