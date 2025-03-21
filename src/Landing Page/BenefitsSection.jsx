// BenefitsSection.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './BenefitsSection.css';

const BenefitsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const benefits = [
    {
      id: 1,
      title: "Brand Recognition",
      description: "Leverage our nationally recognized brand with 90% consumer awareness in target markets.",
      icon: "🏆",
      // image: "/api/placeholder/600/400",
      stats: "85% of franchisees report customers chose them due to brand recognition"
    },
    {
      id: 2,
      title: "Comprehensive Training",
      description: "Access our 4-week intensive training program covering operations, management, and customer service.",
      icon: "🎓",
      image: "/api/placeholder/600/400",
      stats: "100+ hours of personalized training for you and your team"
    },
    {
      id: 3,
      title: "Marketing Support",
      description: "Benefit from national advertising campaigns and localized marketing strategies customized for your area.",
      icon: "📢",
      image: "/api/placeholder/600/400",
      stats: "Average 32% increase in customer acquisition after first marketing campaign"
    },
    {
      id: 4,
      title: "Technology Platform",
      description: "Utilize our proprietary management system that streamlines operations and enhances customer experience.",
      icon: "💻",
      image: "/api/placeholder/600/400",
      stats: "Reduces administrative work by 40% compared to traditional systems"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section className="benefits-section" id="benefits" ref={sectionRef}>
      <div className="benefits-container">
        <motion.div
          className="benefits-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="benefits-title">Why Our Franchise Partners Succeed</h2>
          <div className="benefits-title-underline"></div>
          <p className="benefits-subtitle">
            Join a network of successful entrepreneurs who benefit from our proven systems and ongoing support
          </p>
        </motion.div>

        <div className="benefits-content">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className={`benefit-item ${index % 2 === 0 ? '' : 'reverse'}`}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div className="benefit-text" variants={itemVariants}>
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
                <div className="benefit-stats">
                  <div className="stats-icon">📊</div>
                  <div className="stats-text">{benefit.stats}</div>
                </div>
                <motion.div 
                  className="benefit-number"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  {benefit.id}
                </motion.div>
              </motion.div>

              <motion.div 
                className="benefit-image-container"
                variants={imageVariants}
              >
                <div className="benefit-image-wrapper">
                  {/* <img src={benefit.image} alt={benefit.title} className="benefit-image" /> */}
                  <div className="image-overlay"></div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="benefits-testimonial"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="testimonial-quote">"</div>
          <p>
            Joining this franchise was the best business decision I've made. The support system, brand recognition, and proven model helped me achieve profitability in half the time I expected.
          </p>
          <div className="testimonial-author">
            {/* <img src="/api/placeholder/60/60" alt="Franchisee" className="author-image" /> */}
            <div className="author-info">
              <h4>Michael Roberts</h4>
              <p>Franchise Owner since 2022 • Chicago, IL</p>
            </div>
          </div>
        </motion.div>

          {/* <motion.div 
            className="benefits-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button className="benefits-button">Discover All Benefits</button>
          </motion.div> */}
      </div>
      
      <div className="benefits-shape-1"></div>
      <div className="benefits-shape-2"></div>
    </section>
  );
};

export default BenefitsSection;