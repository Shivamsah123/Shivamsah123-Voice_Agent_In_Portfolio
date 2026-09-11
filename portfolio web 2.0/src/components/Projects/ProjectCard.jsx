import { Link } from 'react-router-dom';
import { Code, ExternalLink, ArrowRight } from 'lucide-react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <Link to={`/project/${project.id}`}>
          <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
        </Link>
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub Repository">
            <Code size={20} />
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Live Demo">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
      <div className="project-info">
        <Link to={`/project/${project.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="project-title hover-title">{project.title}</h3>
        </Link>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.tech.map((techItem, index) => (
            <span key={index} className="tech-tag">
              {techItem}
            </span>
          ))}
        </div>
        <Link to={`/project/${project.id}`} className="view-details-btn">
          View Full Details <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
