import { useRef, useEffect } from "react";
import "./MatrixRain.css";

function MatrixRain({ opacity, speed }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const CHARS = "01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ@.!?";
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    let animationId;
    let lastTime = 0;

    const draw = (time) => {
      if (time - lastTime > speed) {
        lastTime = time;

        ctx.fillStyle = "rgba(15, 15, 15, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00FF00";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillText(char, x, y);

          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [speed]);

  return <canvas ref={canvasRef} className="matrix-rain" style={{ opacity }} />;
}

export default MatrixRain;
