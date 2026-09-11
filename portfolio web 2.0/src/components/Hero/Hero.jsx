import './Hero.css';
import { ArrowRight, Mail } from 'lucide-react';
import profileImage from '../../images/Pi7_Tool_Screenshot 2024-09-24 151746.png';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <div className="hero-text">
            <p className="hero-greeting">Hi, my name is</p>
            <h1 className="hero-name">Shivam Kumar Sah.</h1>
            <h2 className="hero-title">
              <span className="typing-text">I am a Full Stack Developer.</span>
            </h2>
            <p className="hero-description">
              Trained at CDAC Pune, I am a Backend-focused Software Developer skilled in building scalable web applications using Java, Spring Boot, React.js, and MySQL. I have a strong foundation in Microservices, REST APIs, and have solved 400+ DSA problems.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Me <Mail size={18} />
              </a>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="hero-profile-wrapper">
              <img src={profileImage} alt="Profile" className="hero-profile-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
