import TextRain from "../TextRain/TextRain";
import FallingText from "../FallingText/FallingText";

function CardFront({ name, ocupation, email }) {
  return (
    <div className="card-face card-front">
      <div className="card-top">
        <span>// IDENTITY</span>
        <span>01 / 02</span>
      </div>

      <div className="card-identity">
        <div className="name-wrapper">
          <TextRain
            text={name}
            fontFamily="GlitchGoblin"
            fontSize={48}
            stagger={70}
            fallSpeed={4}
            className="card-name"
          />
        </div>

        <FallingText
          as="h2"
          className="card-role"
          text={`// ${ocupation.toUpperCase()}`}
          stagger={20}
          duration={500}
          scrambleSpeed={30}
        />

        <FallingText
          as="p"
          className="card-email"
          text={`> ${email}`}
          stagger={15}
          duration={400}
          scrambleSpeed={25}
        />
      </div>

      <div className="card-bottom">
        <span>● SYSTEM ONLINE</span>
        <span>↻ FLIP CARD</span>
      </div>
    </div>
  );
}

export default CardFront;
