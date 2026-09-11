import { Code2 } from 'lucide-react';
import { skillsData } from '../../data/skillsData';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3 className="category-title">{category}</h3>
              <div className="skills-list">
                {skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    {skill.icon ? (
                      <img src={skill.icon} alt={skill.name} className="skill-icon" />
                    ) : (
                      <Code2 size={18} className="skill-icon-placeholder" />
                    )}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
