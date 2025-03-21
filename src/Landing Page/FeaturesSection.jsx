// FeaturesSection.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './FeaturesSection.css';

import { useNavigate } from 'react-router-dom';
const FeaturesSection = () => {
  const featuresRef = useRef(null);
  const navigate = useNavigate();

  const features = [
    {
      icon: '🚀',
      title: 'Quick Startup',
      description: 'Launch your franchise in as little as 90 days with our streamlined onboarding process and dedicated support team.',
      color: '#4361ee'
    },
    {
      icon: '💼',
      title: 'Proven Business Model',
      description: 'Leverage our established systems that have been perfected over years, with a 95% success rate across all locations.',
      color: '#3a0ca3'
    },
    {
      icon: '📊',
      title: 'Comprehensive Analytics',
      description: 'Access real-time performance data through our custom dashboard to make informed business decisions.',
      color: '#4cc9f0'
    },
    {
      icon: '🛠️',
      title: 'Complete Training',
      description: 'Receive extensive training programs for you and your staff, covering operations, marketing, and customer service.',
      color: '#7209b7'
    },
    {
      icon: '🔍',
      title: 'Location Selection',
      description: 'Our experts help you select and secure the ideal location with demographic analysis and traffic pattern studies.',
      color: '#560bad'
    },
    {
      icon: '📱',
      title: 'Marketing Support',
      description: 'Benefit from national marketing campaigns and localized strategies to drive customer acquisition.',
      color: '#480ca8'
    }
  ];
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="features-section" id="features" ref={featuresRef}>
      <div className="features-container">
        <div className="features-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Why Choose Our Franchise
          </motion.h2>
          
          <motion.div 
            className="title-underline"
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="section-subtitle"
          >
            We provide everything you need to build a successful business
          </motion.p>
        </div>
        
        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              className="feature-card"
              key={index}
              variants={itemVariants}
            >
              <div className="feature-icon-container" style={{ backgroundColor: `${feature.color}20` }}>
                <span className="feature-icon" style={{ color: feature.color }}>{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-hover-effect" style={{ backgroundColor: feature.color }}></div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="features-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3>Ready to explore our franchise opportunity?</h3>
         <button className="cta-button" onClick={()=>navigate('/apply')} >Request Information</button>
        </motion.div>
      </div>
      
      <div className="background-dots"></div>
    </section>
  );
};

export default FeaturesSection;