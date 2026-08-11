import { useRef, useEffect } from "react";
import "./TextRain.css";

const CHARS = "01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

function TextRain({
  text,
  fontFamily,
  fontSize = 40,
  color,
  stagger = 60,
  fallSpeed = 3,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let cancelled = false;
    let animationId;

    const resolvedColor =
      color ||
      getComputedStyle(document.documentElement)
        .getPropertyValue("--text")
        .trim();

    document.fonts.load(`${fontSize}px "${fontFamily}"`).then(() => {
      if (!cancelled) start();
    });

    function start() {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      ctx.font = `bold ${fontSize}px "${fontFamily}"`;
      ctx.textBaseline = "alphabetic";

      const metrics = ctx.measureText(text);
      const visualWidth =
        metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
      let cursorX = (width - visualWidth) / 2 - metrics.actualBoundingBoxLeft;
      const targetY = height / 2 + fontSize / 3;

      const columns = text.split("").map((char, index) => {
        const charWidth = ctx.measureText(char).width;
        const col = {
          char,
          x: cursorX,
          isSpace: char === " ",
          headY: -20,
          landed: char === " ",
          landDelay: index * stagger,
          elapsed: 0,
        };
        cursorX += charWidth;
        return col;
      });

      let lastTime = performance.now();

      const draw = (time) => {
        const dt = time - lastTime;
        lastTime = time;

        ctx.fillStyle = "rgba(15, 15, 15, 0.3)";
        ctx.fillRect(0, 0, width, height);

        let allLanded = true;

        for (const col of columns) {
          if (col.isSpace) continue;

          if (!col.landed) {
            col.elapsed += dt;
            if (col.elapsed < col.landDelay) {
              allLanded = false;
              continue; // todavía no le toca empezar
            }

            allLanded = false;
            col.headY += fallSpeed * (dt / 16);

            if (col.headY >= targetY) {
              col.landed = true;
            } else {
              ctx.fillStyle = resolvedColor;
              ctx.globalAlpha = 1;
              ctx.fillText(randomChar(), col.x, col.headY);
              ctx.globalAlpha = 0.45;
              ctx.fillText(randomChar(), col.x, col.headY - fontSize * 0.9);
              ctx.globalAlpha = 0.2;
              ctx.fillText(randomChar(), col.x, col.headY - fontSize * 1.8);
              ctx.globalAlpha = 1;
            }
          }

          if (col.landed) {
            ctx.fillStyle = resolvedColor;
            ctx.fillText(col.char, col.x, targetY);
          }
        }

        if (!allLanded || document.hidden === false) {
          animationId = requestAnimationFrame(draw);
        }
      };

      animationId = requestAnimationFrame(draw);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationId);
    };
  }, [text, fontFamily, fontSize, color, stagger, fallSpeed]);

  return <canvas ref={canvasRef} className={`text-rain ${className}`} />;
}

export default TextRain;
