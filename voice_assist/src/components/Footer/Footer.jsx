import githubLogo from '../../images/github.svg';
import linkedinLogo from '../../images/linkedin.svg';
import leetcodeLogo from '../../images/leetcode.svg';
import gfgLogo from '../../images/gfg.svg';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <a href="#home">Portfolio.</a>
          </div>
          
          <div className="footer-social">
            <a href="https://github.com/Shivamsah123" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src={githubLogo} alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/shivam-kumar-sah-a29789393/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src={linkedinLogo} alt="LinkedIn" />
            </a>
            <a href="https://leetcode.com/u/shivamsah123/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <img src={leetcodeLogo} alt="LeetCode" />
            </a>
            <a href="https://www.geeksforgeeks.org/profile/sahushivf9s0?tab=activity" target="_blank" rel="noopener noreferrer" aria-label="GeeksforGeeks">
              <img src={gfgLogo} alt="GeeksforGeeks" />
            </a>
          </div>

          <p className="copyright">
            &copy; {currentYear} Shivam Kumar Sah. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
