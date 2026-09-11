import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {
  ArrowLeft, ExternalLink, ShieldCheck, CheckCircle2,
  MonitorSmartphone, Code2, Server, Database, Lightbulb,
  Mail, ChevronLeft, ChevronRight, X, ZoomIn
} from 'lucide-react';
import githubLogo from '../../images/github.svg';
import { projectsData } from '../../data/projectsData';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  // Slideshow State
  const [slideIndex, setSlideIndex] = useState(0);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = projectsData.find(p => p.id.toString() === id);
    setProject(found);
    setSlideIndex(0);
  }, [id]);

  const details = project?.details || {};
  const slides = details.screenshots || [];

  // --- Slideshow Controls ---
  const prevSlide = useCallback(() => {
    setSlideIndex(i => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setSlideIndex(i => (i + 1) % slides.length);
  }, [slides.length]);

  // Auto-play slideshow
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  // --- Lightbox Controls ---
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const prevLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex(i => (i - 1 + slides.length) % slides.length);
  };

  const nextLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex(i => (i + 1) % slides.length);
  };

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxIndex(i => (i - 1 + slides.length) % slides.length);
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i + 1) % slides.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [slides.length]);

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project Not Found</h2>
        <HashLink smooth to="/#projects" className="btn btn-primary">Return to Portfolio</HashLink>
      </div>
    );
  }

  return (
    <div className="project-detail-page">

      {/* --- Lightbox Overlay --- */}
      {lightboxOpen && slides.length > 0 && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}><X size={28} /></button>
          <button className="lightbox-prev" onClick={prevLightbox}><ChevronLeft size={36} /></button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={slides[lightboxIndex]} alt={`Screenshot ${lightboxIndex + 1}`} />
            <p className="lightbox-counter">{lightboxIndex + 1} / {slides.length}</p>
          </div>
          <button className="lightbox-next" onClick={nextLightbox}><ChevronRight size={36} /></button>
        </div>
      )}

      <div className="container">

        {/* Navigation */}
        <HashLink smooth to="/#projects" className="back-button">
          <ArrowLeft size={20} /> Back to Portfolio
        </HashLink>

        {/* Header Section */}
        <div className="project-detail-header">
          <div className="header-left">
            <span className="project-category">{project.category}</span>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-overview-text">{details.overview || project.description}</p>
          </div>
          <div className="header-right">
            <div className="action-card">
              <h3>Project Links</h3>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline full-width">
                  <img src={githubLogo} alt="GitHub" style={{ width: 18, height: 18 }} /> View Source Code
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary full-width">
                  <ExternalLink size={18} /> Live Demonstration
                </a>
              )}
              <div className="tech-tags" style={{ marginTop: '1rem' }}>
                {project.tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Slideshow (replaces static image) */}
        {slides.length > 0 ? (
          <div className="slideshow-container">
            <div className="slide-track">
              {slides.map((src, idx) => (
                <div
                  key={idx}
                  className={`slide ${idx === slideIndex ? 'active' : ''}`}
                  onClick={() => openLightbox(idx)}
                >
                  <img src={src} alt={`${project.title} - slide ${idx + 1}`} />
                  <div className="slide-zoom-hint"><ZoomIn size={24} /> Click to view</div>
                </div>
              ))}
            </div>
            {slides.length > 1 && (
              <>
                <button className="slide-btn slide-prev" onClick={prevSlide}><ChevronLeft size={28} /></button>
                <button className="slide-btn slide-next" onClick={nextSlide}><ChevronRight size={28} /></button>
                <div className="slide-dots">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      className={`slide-dot ${idx === slideIndex ? 'active' : ''}`}
                      onClick={() => setSlideIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="project-hero-image">
            <img src={project.image} alt={project.title} />
          </div>
        )}

        <div className="project-content-grid">

          {/* Main Content Column */}
          <div className="project-main-column">

            {details.problemStatement && (
              <section className="detail-section">
                <h2 className="section-heading"><span className="icon-bg red">🎯</span> Problem Statement</h2>
                <div className="section-card"><p>{details.problemStatement}</p></div>
              </section>
            )}

            {details.solution && (
              <section className="detail-section">
                <h2 className="section-heading"><span className="icon-bg green">💡</span> Proposed Solution</h2>
                <div className="section-card"><p>{details.solution}</p></div>
              </section>
            )}

            {details.features?.length > 0 && (
              <section className="detail-section">
                <h2 className="section-heading"><CheckCircle2 className="hicon primary" size={26} /> Key Features</h2>
                <div className="section-card">
                  <ul className="feature-list">
                    {details.features.map((feat, idx) => (
                      <li key={idx}><CheckCircle2 size={18} className="list-icon" /> {feat}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {details.security?.length > 0 && (
              <section className="detail-section">
                <h2 className="section-heading"><ShieldCheck className="hicon primary" size={26} /> Security Features</h2>
                <div className="section-card">
                  <ul className="feature-list">
                    {details.security.map((sec, idx) => (
                      <li key={idx}><ShieldCheck size={18} className="list-icon" /> {sec}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Images Section (Thumbnail grid - click to lightbox) */}
            {slides.length > 0 && (
              <section className="detail-section">
                <h2 className="section-heading"><MonitorSmartphone className="hicon primary" size={26} /> Images</h2>
                <p className="section-subtitle">{details.screenshotsDesc}</p>
                <div className="screenshots-gallery">
                  {slides.map((imgSrc, idx) => (
                    <div key={idx} className="screenshot-item" onClick={() => openLightbox(idx)}>
                      <img src={imgSrc} alt={`Screenshot ${idx + 1}`} loading="lazy" />
                      <div className="screenshot-overlay"><ZoomIn size={22} /></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {details.challenges?.length > 0 && (
              <section className="detail-section">
                <h2 className="section-heading"><span className="icon-bg red">⚠️</span> Challenges Faced</h2>
                <div className="section-card">
                  <ul className="feature-list">
                    {details.challenges.map((c, idx) => (
                      <li key={idx}><div className="list-bullet"></div> {c}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {details.learnings?.length > 0 && (
              <section className="detail-section">
                <h2 className="section-heading"><Lightbulb className="hicon green" size={26} /> Key Learnings</h2>
                <div className="section-card">
                  <ul className="feature-list">
                    {details.learnings.map((l, idx) => (
                      <li key={idx}><div className="list-bullet"></div> {l}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

          </div>

          {/* Sidebar Column */}
          <div className="project-sidebar-column">

            {details.techStack && (
              <div className="sidebar-widget">
                <h3>Tech Stack</h3>
                <div className="tech-categories">
                  {details.techStack.Frontend && (
                    <div className="tech-category">
                      <h4><MonitorSmartphone size={16} /> Frontend</h4>
                      <div className="tech-tags">{details.techStack.Frontend.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}</div>
                    </div>
                  )}
                  {details.techStack.Backend && (
                    <div className="tech-category">
                      <h4><Server size={16} /> Backend</h4>
                      <div className="tech-tags">{details.techStack.Backend.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}</div>
                    </div>
                  )}
                  {details.techStack.Database && (
                    <div className="tech-category">
                      <h4><Database size={16} /> Database</h4>
                      <div className="tech-tags">{details.techStack.Database.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}</div>
                    </div>
                  )}
                  {details.techStack.Tools && (
                    <div className="tech-category">
                      <h4><Code2 size={16} /> DevOps & Tools</h4>
                      <div className="tech-tags">{details.techStack.Tools.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {details.standout && (
              <div className="sidebar-widget highlight-widget">
                <h3>✨ Why this stands out</h3>
                <p>{details.standout}</p>
              </div>
            )}

            {details.contact && (
              <div className="sidebar-widget contact-widget">
                <Mail size={32} className="contact-icon" />
                <h3>Let's Connect</h3>
                <p>{details.contact}</p>
                <HashLink smooth to="/#contact" className="btn btn-primary full-width">Contact Me</HashLink>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
