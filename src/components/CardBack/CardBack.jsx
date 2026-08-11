function CardBack({ skills, github }) {
  return (
    <div className="card-face card-back">
      <div className="card-top">
        <span>// SKILLS</span>
        <span>02 / 02</span>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <span key={skill.name} className="skill-tag">
              <Icon className="skill-icon" />
              {skill.name}
            </span>
          );
        })}
      </div>

      <div className="card-bottom">
        <span>● SYSTEM ONLINE</span>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          onClick={(e) => e.stopPropagation()}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default CardBack;
