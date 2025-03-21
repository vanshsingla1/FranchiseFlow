import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import './Footer.css';

const Footer = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <motion.div 
            className="footer-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div className="footer-column brand-column" variants={fadeIn}>
              <div className="footer-logo">
                <span className="logo-primary">Franchise</span>
                <span className="logo-secondary">Flow</span>
              </div>
              <p className="footer-description">
                Empowering franchise owners with cutting-edge management tools and resources to streamline operations and maximize growth potential.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </motion.div>

            <motion.div className="footer-column" variants={fadeIn}>
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#benefits">Benefits</a></li>
                <li><a href="#testimonials">Success Stories</a></li>
                <li><a href="#register">Register Now</a></li>
                <li><a href="#login">Login</a></li>
              </ul>
            </motion.div>

            <motion.div className="footer-column" variants={fadeIn}>
              <h3 className="footer-heading">Resources</h3>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Franchise Guide</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Webinars</a></li>
                <li><a href="#">Case Studies</a></li>
              </ul>
            </motion.div>

            <motion.div className="footer-column contact-column" variants={fadeIn}>
              <h3 className="footer-heading">Contact Us</h3>
              <ul className="contact-info">
                <li>
                  <MdLocationOn className="contact-icon" />
                  <span>Barnala<br />Punjab</span>
                </li>
                <li>
                  <MdPhone className="contact-icon" />
                  <span>+91-9914199057</span>
                </li>
                <li>
                  <MdEmail className="contact-icon" />
                  <span>support@franchiseflow.com</span>
                </li>
              </ul>
              {/* <div className="newsletter">
                <h4 className="newsletter-heading">Stay Updated</h4>
                <div className="newsletter-form">
                  <input type="email" placeholder="Your email address" />
                  <button type="submit">Subscribe</button>
                </div>
              </div> */}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} FranchiseHub. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Accessibility</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-decoration">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#ffffff" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,181.3C672,203,768,213,864,218.7C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;