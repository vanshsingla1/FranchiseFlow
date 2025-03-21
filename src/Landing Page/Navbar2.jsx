import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';
import {Link} from 'react-router-dom';
const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state based on scroll position
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = ['home', 'features', 'benefits', 'testimonials', 'register'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } }
  };

  return (
    <>
    
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/" className="logo-link">
              <span className="logo-primary">Franchise</span>
              <span className="logo-secondary">Flow</span>
            </Link>
          </div>

          {/* <div className="navbar-desktop">
            <ul className="navbar-links">
              <li className="navbar-item">
                <a href="#home" className={activeSection === 'home' ? 'active' : ''}>
                  Home
                </a>
              </li>
              <li className="navbar-item">
                <a href="#features" className={activeSection === 'features' ? 'active' : ''}>
                  Features
                </a>
              </li>
              <li className="navbar-item">
                <a href="#benefits" className={activeSection === 'benefits' ? 'active' : ''}>
                  Benefits
                </a>
              </li>
              <li className="navbar-item">
                <a href="#testimonials" className={activeSection === 'testimonials' ? 'active' : ''}>
                  Success Stories
                </a>
              </li>
            </ul>

            <div className="navbar-actions">
              <Link to="/login"  className="btn-login">
                <FaUserCircle className="login-icon" />
                <span>Login</span>
              </Link>
              <Link to="/apply"  className="btn-register">
                Register Now
              </Link>
            </div>
          </div> */}

          <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            {/* <div className="mobile-menu-content">
              <ul className="mobile-links">
                <li>
                  <a href="#home" onClick={closeMenu} className={activeSection === 'home' ? 'active' : ''}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features" onClick={closeMenu} className={activeSection === 'features' ? 'active' : ''}>
                    Features
                  </a>
                </li>
                <li>
                  <a href="#benefits" onClick={closeMenu} className={activeSection === 'benefits' ? 'active' : ''}>
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#testimonials" onClick={closeMenu} className={activeSection === 'testimonials' ? 'active' : ''}>
                    Success Stories
                  </a>
                </li>
                <li className="mobile-divider"></li>
                <li>
                  <a href="#login" onClick={closeMenu} className="mobile-login">
                    <FaUserCircle className="login-icon" />
                    <span>Login</span>
                  </a>
                </li>
                <li>
                  <a href="#register" onClick={closeMenu} className="mobile-register">
                    Register Now
                  </a>
                </li>
              </ul>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar2;