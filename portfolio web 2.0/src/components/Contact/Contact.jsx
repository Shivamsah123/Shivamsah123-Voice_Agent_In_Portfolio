import { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Paperclip } from 'lucide-react';
import githubLogo from '../../images/github.svg';
import linkedinLogo from '../../images/linkedin.svg';
import leetcodeLogo from '../../images/leetcode.svg';
import gfgLogo from '../../images/gfg.svg';
import VoiceAgent from '../VoiceAgent/VoiceAgent';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    attachment: null
  });
  
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear error on typing
    if (name === 'email') setEmailError('');
    setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Strict Email validation using Regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('Incorrect email format! Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('_subject', formData.subject || 'New Contact from Portfolio');
    submitData.append('message', formData.message);
    if (formData.attachment) {
      submitData.append('attachment', formData.attachment);
    }
    
    // FormSubmit Configuration
    submitData.append('_captcha', 'false');

    try {
      // Sending directly to user's Gmail using FormSubmit API
      const response = await fetch('https://formsubmit.co/ajax/sahushivam7256@gmail.com', {
        method: 'POST',
        body: submitData
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '', attachment: null });
        if (formRef.current) formRef.current.reset();
        
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setSubmitError("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setSubmitError('Failed to send message. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>

        <div className="contact-content">
          <div className="contact-info">
            <div style={{ marginBottom: '2rem' }}>
  <h3>Want to talk to my AI?</h3>
  <p>
    Ask my AI assistant about my skills, projects and experience.
  </p>

  <VoiceAgent />
</div>
            <h3>Let's talk about everything!</h3>
            <p>
              Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
        
            <div className="info-items">
              <div className="info-item">
                <Mail className="info-icon" />
                
                <div>
                  <h4>Email</h4>
                  <a href="mailto:sahushivam7256@gmail.com">sahushivam7256@gmail.com</a>
                </div>
              </div>

              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>+91 72560XXXXX</p>
                </div>
              </div>

              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <h4>Location</h4>
                  <p>Pune, India</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href="https://github.com/Shivamsah123" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <img src={githubLogo} alt="GitHub" className="social-icon-img" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/shivam-kumar-sah-a29789393/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <img src={linkedinLogo} alt="LinkedIn" className="social-icon-img" /> LinkedIn
              </a>
              <a href="https://leetcode.com/u/shivamsah123/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LeetCode">
                <img src={leetcodeLogo} alt="LeetCode" className="social-icon-img" /> LeetCode
              </a>
              <a href="https://www.geeksforgeeks.org/profile/sahushivf9s0?tab=activity" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GeeksforGeeks">
                <img src={gfgLogo} alt="GeeksforGeeks" className="social-icon-img" /> GeeksforGeeks
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Shivam Kumar Sah"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="shivam@example.com"
                  className={emailError ? 'input-error' : ''}
                  required
                />
                {emailError && <span className="error-message">{emailError}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="attachment" className="file-label">
                  <Paperclip size={18} className="file-icon"/> 
                  {formData.attachment ? formData.attachment.name : 'Attach a File (Optional)'}
                </label>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  onChange={handleChange}
                  className="file-input"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                />
              </div>

              {submitError && <div className="submit-error-message">{submitError}</div>}
              {isSubmitted && <div className="submit-success-message">Message sent successfully! I will get back to you soon.</div>}

              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
