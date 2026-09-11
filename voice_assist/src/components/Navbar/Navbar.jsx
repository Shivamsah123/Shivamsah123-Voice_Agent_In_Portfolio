import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <HashLink smooth to="/#home" className="logo">
          Portfolio.
        </HashLink>

        {/* Desktop Nav */}
        <div className="nav-links desktop-nav">
          {navLinks.map((link) => (
            <HashLink smooth key={link.name} to={link.href} className="nav-link">
              {link.name}
            </HashLink>
          ))}
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-controls">
          <button onClick={toggleTheme} className="theme-toggle mobile-theme-toggle" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button 
            className="mobile-toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <HashLink 
            smooth
            key={link.name} 
            to={link.href} 
            className="mobile-nav-link"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </HashLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
