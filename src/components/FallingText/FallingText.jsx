import { useState, useEffect, useRef } from "react";
import "./FallingText.css";

const CHARS = "01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ";

function FallingLetter({ char, delay, duration, scrambleSpeed = 40 }) {
  const [display, setDisplay] = useState(char);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (char === " ") return;
    const startTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setDisplay(CHARS[Math.floor(Math.random() * CHARS.length)]);
      }, scrambleSpeed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalRef.current);
    };
  }, [char, delay, scrambleSpeed]);

  const handleAnimationEnd = () => {
    clearInterval(intervalRef.current);
    setDisplay(char);
  };

  return (
    <span
      className="falling-letter"
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
      onAnimationEnd={handleAnimationEnd}
    >
      {char === " " ? "\u00A0" : display}
    </span>
  );
}

function FallingText({
  text,
  as: Tag = "span",
  className = "",
  stagger = 40,
  duration = 600,
  scrambleSpeed = 40,
}) {
  return (
    <Tag className={`falling-text ${className}`}>
      {text.split("").map((char, index) => (
        <FallingLetter
          key={index}
          char={char}
          delay={index * stagger}
          duration={duration}
          scrambleSpeed={scrambleSpeed}
        />
      ))}
    </Tag>
  );
}

export default FallingText;
