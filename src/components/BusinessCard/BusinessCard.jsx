import { name, ocupation, email, skills, github } from "../../data";
import CardBack from "../CardBack/CardBack";
import CardFront from "../CardFront/CardFront";
import MatrixRain from "../MatrixRain/MatrixRain";

import "./BusinessCard.css";
import { useState } from "react";

function BusinessCard() {
  const [isFlipped, setFlipp] = useState(false);

  const flipp = () => {
    setFlipp((current) => !current);
  };

  return (
    <div
      onClick={flipp}
      className={isFlipped ? "card-container is-flipped" : "card-container"}
    >
      <MatrixRain opacity={0.08} speed={80} />
      <CardFront name={name} ocupation={ocupation} email={email} />
      <CardBack skills={skills} github={github} />
    </div>
  );
}

export default BusinessCard;
