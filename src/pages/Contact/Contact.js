import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheck } from 'react-icons/fa';
import './Contact.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, sending, sent, error
  const [focusedField, setFocusedField] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    // Simulate sending
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/Ayushdubey5', label: 'GitHub', color: '#333' },
    { icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/ayush-dubey-694629307/', label: 'LinkedIn', color: '#0077b5' },
    { icon: FaTwitter, url: 'https://x.com/AyushD12011992/', label: 'Twitter', color: '#1da1f2' },
    { icon: FaInstagram, url: 'https://instagram.com/full_coded_developer?rpxt=MTg5dngzd3A3aWl3NA%3D%3D', label: 'Instagram', color: '#e84393' },
  ];

  return (
    <motion.div
      className="contact-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="section-container">
        <ScrollReveal>
          <h1 className="page-title">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="page-subtitle" style={{ marginTop: -30, marginBottom: 50, textAlign: 'center', color: 'var(--text-secondary)' }}>
            I'd love to hear from you! Drop me a message 💬
          </p>
        </ScrollReveal>

        <div className="contact-grid">
          {/* Form */}
          <ScrollReveal direction="left" delay={200}>
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <div className={`form-group ${focusedField === 'name' || formData.name ? 'focused' : ''} ${errors.name ? 'error' : ''}`}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="form-input hoverable"
                  autoComplete="name"
                />
                <label className="form-label">Ayush Dubey</label>
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className={`form-group ${focusedField === 'email' || formData.email ? 'focused' : ''} ${errors.email ? 'error' : ''}`}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="form-input hoverable"
                  autoComplete="email"
                />
                <label className="form-label">Your Email</label>
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className={`form-group ${focusedField === 'subject' || formData.subject ? 'focused' : ''}`}>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className="form-input hoverable"
                />
                <label className="form-label">Subject (Optional)</label>
              </div>

              <div className={`form-group ${focusedField === 'message' || formData.message ? 'focused' : ''} ${errors.message ? 'error' : ''}`}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="form-input form-textarea hoverable"
                  rows="5"
                />
                <label className="form-label">Your Message</label>
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className={`submit-btn hoverable ${status}`}
                disabled={status === 'sending' || status === 'sent'}
              >
                {status === 'idle' && <><FaPaperPlane /> Send Message</>}
                {status === 'sending' && <><span className="spinner" /> Sending...</>}
                {status === 'sent' && <><FaCheck /> Sent Successfully!</>}
                {status === 'error' && <>Error. Try Again</>}
              </button>
            </form>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal direction="right" delay={400}>
            <div className="contact-info">
              <div className="info-card glass-card">
                <h3>Contact Info</h3>
                <div className="info-items">
                  <div className="info-item">
                    <FaEnvelope className="info-icon" />
                    <div>
                      <span className="info-label">Email</span>
                      <a href="mailto:your@email.com" className="info-value hoverable">
                        dubeyayush545@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaMapMarkerAlt className="info-icon" />
                    <div>
                      <span className="info-label">Location</span>
                      <span className="info-value">New Delhi, India</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="social-card glass-card">
                <h3>Find Me Online</h3>
                <div className="contact-socials">
                  {socialLinks.map(social => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-social-link hoverable"
                      aria-label={social.label}
                    >
                      <social.icon />
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="availability-card glass-card">
                <div className="status-dot" />
                <span>Currently available for freelance work</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </motion.div>
  );
}