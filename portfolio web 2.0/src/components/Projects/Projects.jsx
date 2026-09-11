import { useState, useEffect } from 'react';
import { projectsData } from '../../data/projectsData';
import ProjectCard from './ProjectCard';
import { PlusCircle, X } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech: '',
    github: '',
    demo: '',
    image: '',
    category: 'Frontend'
  });

  useEffect(() => {
    // Load initial data
    setProjects(projectsData);
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    
    // Create new project object
    const projectToAdd = {
      id: Date.now(),
      title: newProject.title,
      description: newProject.description,
      tech: newProject.tech.split(',').map(item => item.trim()),
      github: newProject.github,
      demo: newProject.demo,
      image: newProject.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: newProject.category
    };

    // Update state
    setProjects([projectToAdd, ...projects]);
    
    // Reset and close
    setNewProject({
      title: '',
      description: '',
      tech: '',
      github: '',
      demo: '',
      image: '',
      category: 'Frontend'
    });
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="projects-controls">
          <div className="filters">
            {categories.map(category => (
              <button 
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => handleFilterChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <button 
            className="btn btn-primary add-project-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircle size={18} /> Add Project
          </button>
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Add Project Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-modal" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
              <h3>Add New Project</h3>
              <p className="modal-subtitle">Temporarily add a project to the UI (Local State)</p>
              
              <form onSubmit={handleAddProject} className="add-project-form">
                <div className="form-group">
                  <label>Project Title *</label>
                  <input type="text" name="title" value={newProject.title} onChange={handleInputChange} required />
                </div>
                
                <div className="form-group">
                  <label>Description *</label>
                  <textarea name="description" value={newProject.description} onChange={handleInputChange} required rows="3"></textarea>
                </div>
                
                <div className="form-group">
                  <label>Tech Stack (comma separated) *</label>
                  <input type="text" name="tech" placeholder="React, Node.js, CSS" value={newProject.tech} onChange={handleInputChange} required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>GitHub Link</label>
                    <input type="url" name="github" value={newProject.github} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Live Demo Link</label>
                    <input type="url" name="demo" value={newProject.demo} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Image URL</label>
                    <input type="url" name="image" placeholder="Leave blank for placeholder" value={newProject.image} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select name="category" value={newProject.category} onChange={handleInputChange} className="category-select" required>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Full Stack">Full Stack</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary submit-project-btn">Add Project</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
