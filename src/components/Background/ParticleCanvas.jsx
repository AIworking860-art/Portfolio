import React, { useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const { particleType, customColors } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || particleType === "none") return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: width / 2, y: height / 2 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Dynamic settings based on particleType
    if (particleType === "synaptic") {
      const nodeCount = Math.min(Math.floor(width / 18), 70);
      const nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
      }));

      const render = () => {
        ctx.clearRect(0, 0, width, height);

        nodes.forEach((node, i) => {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          // Mouse attraction
          const dxMouse = mouse.x - node.x;
          const dyMouse = mouse.y - node.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 150) {
            node.x += dxMouse * 0.01;
            node.y += dyMouse * 0.01;
          }

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = customColors.primary || "#10b981";
          ctx.fill();

          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = customColors.primary || "#10b981";
              ctx.globalAlpha = (1 - dist / 130) * 0.25;
              ctx.lineWidth = 1;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        });

        animationFrameId = requestAnimationFrame(render);
      };
      render();
    } else if (particleType === "starfield") {
      const starCount = 120;
      const stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
      }));

      const render = () => {
        ctx.clearRect(0, 0, width, height);
        stars.forEach((star) => {
          star.alpha += star.speed;
          if (star.alpha > 1 || star.alpha < 0.1) star.speed *= -1;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = customColors.accent || "#fbbf24";
          ctx.globalAlpha = Math.abs(star.alpha);
          ctx.fill();
          ctx.globalAlpha = 1;
        });
        animationFrameId = requestAnimationFrame(render);
      };
      render();
    } else if (particleType === "matrix") {
      const chars = "0101010101010101010101010101010101010101010101010101";
      const fontSize = 14;
      const columns = Math.floor(width / fontSize);
      const drops = Array.from({ length: columns }, () => Math.random() * -100);

      const render = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = customColors.primary || "#22c55e";
        ctx.font = `${fontSize}px monospace`;

        drops.forEach((y, i) => {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          } else {
            drops[i] = y + fontSize;
          }
        });
        animationFrameId = requestAnimationFrame(render);
      };
      render();
    } else if (particleType === "aurora" || particleType === "rgb") {
      let t = 0;
      const render = () => {
        t += 0.005;
        ctx.clearRect(0, 0, width, height);

        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          50,
          mouse.x,
          mouse.y,
          450
        );
        gradient.addColorStop(0, (customColors.primary || "#a78bfa") + "33");
        gradient.addColorStop(0.5, (customColors.secondary || "#f472b6") + "18");
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        animationFrameId = requestAnimationFrame(render);
      };
      render();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleType, customColors]);

  if (particleType === "none") return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}

export default ParticleCanvas;
