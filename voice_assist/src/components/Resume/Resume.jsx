import { Download } from 'lucide-react';
import resumeFile from '../../images/Shivam_Resume (4).pdf';
import './Resume.css';

const Resume = () => {
  return (
    <section id="resume" className="resume">
      <div className="container">
        <div className="resume-content">
          <h2 className="section-title">Resume</h2>
          <p className="resume-description">
            Want to know more about my experience and skills? Download my complete resume below.
          </p>
          <a href={resumeFile} className="btn btn-primary resume-btn" download="Shivam_Resume.pdf">
            <Download size={20} /> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
