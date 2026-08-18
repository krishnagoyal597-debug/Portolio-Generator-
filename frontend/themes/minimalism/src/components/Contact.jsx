import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, Loader2 } from 'lucide-react';
import portfolioData from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setIsSuccess(false);

    // Simulate client-side form submission latency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 border-t border-minimal-border bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center space-x-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-minimal-subtle">
            07 / CONTACT
          </span>
          <span className="h-[1px] w-12 bg-neutral-300" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Contact Info */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold tracking-tight text-minimal-dark leading-tight">
                Let's work together.
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Have a project in mind or interested in collaborating? Feel free to reach out via email or submit the form.
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-4">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="flex items-center space-x-3.5 p-4 rounded-xl border border-minimal-border bg-minimal-card hover:bg-white hover:border-neutral-400 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-white border border-neutral-200 text-minimal-dark group-hover:bg-minimal-dark group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Email
                  </div>
                  <div className="text-sm font-semibold text-minimal-dark group-hover:underline">
                    {portfolioData.contact.email}
                  </div>
                </div>
              </a>

              <a
                href={`tel:${portfolioData.contact.phone}`}
                className="flex items-center space-x-3.5 p-4 rounded-xl border border-minimal-border bg-minimal-card hover:bg-white hover:border-neutral-400 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-white border border-neutral-200 text-minimal-dark group-hover:bg-minimal-dark group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Phone
                  </div>
                  <div className="text-sm font-semibold text-minimal-dark group-hover:underline">
                    {portfolioData.contact.phone}
                  </div>
                </div>
              </a>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center space-x-4">
              <a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-full border border-neutral-200 text-neutral-600 hover:text-minimal-dark hover:border-neutral-400 transition-all hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href={portfolioData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-full border border-neutral-200 text-neutral-600 hover:text-minimal-dark hover:border-neutral-400 transition-all hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="md:col-span-7 bg-minimal-card p-6 sm:p-8 rounded-3xl border border-minimal-border shadow-2xs">
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-minimal-dark">
                  Message sent successfully!
                </h3>
                <p className="text-sm text-neutral-600 max-w-sm">
                  Thank you for reaching out. I'll respond to your message as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-minimal-dark">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Aarav Sharma"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-hidden transition-all ${
                      errors.name
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-neutral-200 focus:border-minimal-dark'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-500 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-minimal-dark">
                    Your Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. aarav@example.com"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-hidden transition-all ${
                      errors.email
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-neutral-200 focus:border-minimal-dark'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-minimal-dark">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, question, or opportunity..."
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-hidden transition-all resize-none ${
                      errors.message
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-neutral-200 focus:border-minimal-dark'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-500 font-medium">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-minimal-dark rounded-xl hover:bg-neutral-800 transition-all duration-200 shadow active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
