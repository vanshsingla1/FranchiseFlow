// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import './App.css';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import BenefitsSection from './BenefitsSection';
import TestimonialsSection from './TestimonialsSection';
// import RegistrationForm from './RegistrationForm';
import Footer from './Footer';
import Apply from '../components/Apply';
import Navbar from './Navbar';

function Landingpage() {
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

  return (
    
      <div className="App">
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
          <div className="container">
            {/* <nav>
              <div className="logo">
                <span className="primary">Franchise</span>
                <span className="secondary">Flow</span>
              </div>
              <ul className="nav-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#benefits">Benefits</a></li>
                <li><a href="#testimonials">Success Stories</a></li>
                <li><a href="#register" className="btn-secondary">Login</a></li>
                <li><a href="#register" className="btn-primary">Register Now</a></li>
              </ul>
            </nav> */}
            <Navbar></Navbar>
          </div>
        </header>

        <main>
          <HeroSection />
          <FeaturesSection />
          <BenefitsSection />
          <TestimonialsSection />
          {/* <RegistrationForm /> */}
          {/* <Apply></Apply> */}
        </main>

        <Footer />
      </div>
  );
}

export default Landingpage;