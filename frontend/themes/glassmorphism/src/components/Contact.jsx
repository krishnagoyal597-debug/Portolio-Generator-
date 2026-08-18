import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import portfolioData from '../data/portfolioData';

const Contact = () => {
  const { personal, contact } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) errs.message = 'Please type your message';
    
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate Client-Side Submission Delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-purple-300 mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something <span className="text-gradient-vibrant">Amazing Together</span>
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Cards & Info */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-8 rounded-3xl glass-panel border border-white/15 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

            <h3 className="text-2xl font-bold text-white mb-3">
              Contact Information
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed font-light mb-8">
              {contact?.availability || "Available for full-time roles, freelance projects, and technical consultations."}
            </p>

            <div className="space-y-4 mb-8">
              
              <a 
                href={`mailto:${contact?.email || personal.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl glass-pill hover:border-purple-400/40 hover:bg-white/15 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-purple-300 uppercase font-semibold">Email</div>
                  <div className="text-sm font-bold text-white">{contact?.email || personal.email}</div>
                </div>
              </a>

              <a 
                href={`tel:${contact?.phone || personal.phone}`}
                className="flex items-center gap-4 p-4 rounded-2xl glass-pill hover:border-purple-400/40 hover:bg-white/15 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-300 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-purple-300 uppercase font-semibold">Phone</div>
                  <div className="text-sm font-bold text-white">{contact?.phone || personal.phone}</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-pill">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-purple-300 uppercase font-semibold">Location</div>
                  <div className="text-sm font-bold text-white">{contact?.location || personal.location}</div>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div>
              <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">
                Connect on Socials
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={personal.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-400/50 hover:bg-white/20 transition-all"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href={personal.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-400/50 hover:bg-white/20 transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                <a
                  href={personal.twitter || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-400/50 hover:bg-white/20 transition-all"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Interactive Glass Contact Form */}
        <div className="lg:col-span-7">
          
          <div className="p-8 sm:p-10 rounded-3xl glass-panel-deep border border-white/20 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
            
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span>Send Me A Message</span>
            </h3>

            {/* Success Toast Banner */}
            {isSubmitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-start gap-3 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-300">Message Sent Successfully!</h4>
                  <p className="text-xs text-gray-200 mt-0.5">Thank you for reaching out. I will get back to you shortly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-purple-200 uppercase mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alex Sharma"
                    className={`w-full px-4 py-3 rounded-2xl glass-input text-sm ${
                      errors.name ? 'border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : ''
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-pink-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-purple-200 uppercase mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className={`w-full px-4 py-3 rounded-2xl glass-input text-sm ${
                      errors.email ? 'border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-pink-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-purple-200 uppercase mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration Inquiry"
                  className="w-full px-4 py-3 rounded-2xl glass-input text-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-purple-200 uppercase mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Alex, I'd like to discuss a project..."
                  className={`w-full px-4 py-3 rounded-2xl glass-input text-sm resize-none ${
                    errors.message ? 'border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : ''
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-pink-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl glass-button-primary text-sm sm:text-base font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(139,92,246,0.4)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Contact;
