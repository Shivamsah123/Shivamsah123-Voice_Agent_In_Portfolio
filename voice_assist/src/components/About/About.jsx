import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Hello! I'm Shivam Kumar Sah, a passionate Full Stack Developer and PG-DAC graduate from Sunbeam Institute of Information Technology, Pune. I specialize in building scalable web applications with a strong foundation in backend development.
            </p>
            <p>
              I have extensively worked with Java, Spring Boot, React.js, Node.js, and MySQL. From designing secure REST APIs using microservices architecture to crafting responsive frontend interfaces, I enjoy turning complex problems into robust digital solutions.
            </p>
            <p className="objective">
              <strong>Core Strengths:</strong> I have a deep understanding of Data Structures & Algorithms, having solved over 400+ DSA problems across LeetCode and GeeksforGeeks. I am continuously learning and always eager to tackle new technical challenges.
            </p>
          </div>
          
          <div className="about-details">
            <div className="detail-card">
              <h3>Education</h3>
              <div className="detail-item">
                <h4>PG-DAC (Advanced Computing)</h4>
                <p>Sunbeam Institute of Information Technology, Pune</p>
                <span>Aug 2025 - Feb 2026 | 70%</span>
              </div>
              <div className="detail-item">
                <h4>B.Tech in Electronics & Communication</h4>
                <p>Government Engineering College, West Champaran</p>
                <span>Nov 2021 - Jul 2025 | CGPA: 7.59/10</span>
              </div>
            </div>

            <div className="detail-card">
              <h3>Certifications & Achievements</h3>
              <ul className="achievements-list">
                <li>NPTEL Certification – Internet of Things (IoT) [71%]</li>
                <li>Solved 400+ Data Structures & Algorithms problems.</li>
                <li>Developed complex backend systems using Spring Boot and Microservices.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
