import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import portfolioData from '../data/portfolioData';

export const Contact: React.FC = () => {
  const { contact } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback
      }

      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 800);
  };

  return (
    <>
      <hr className="section-separator -mx-margin-mobile w-[calc(100%+48px)] md:-mx-margin-desktop md:w-[calc(100%+128px)] mt-12" />
      <section className="flex flex-col gap-6 pt-12 mb-12" id="contact">
        <h2 className="font-headline-md text-headline-md font-bold text-primary uppercase border-b-[3px] border-black pb-2 inline-block self-start">
          Let's Talk
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Contact metadata */}
          <div className="lg:col-span-4 flex flex-col gap-4 font-mono text-sm">
            <div className="brutalist-border bg-white p-6 brutalist-shadow flex flex-col gap-4">
              <span className="font-label-mono text-xs uppercase bg-[#ffeb3b] text-primary px-2.5 py-1 self-start brutalist-border font-bold">
                Direct Line
              </span>
              <div className="flex flex-col gap-2">
                <span className="font-label-mono text-xs text-on-surface-variant font-bold">EMAIL ADDRESS:</span>
                <a className="font-bold text-[#003fd8] break-all" href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
              <div className="flex flex-col gap-2 border-t-[2px] border-black pt-4">
                <span className="font-label-mono text-xs text-on-surface-variant font-bold">TELEPHONE:</span>
                <a className="font-bold text-[#003fd8]" href={`tel:${contact.phone}`}>{contact.phone}</a>
              </div>
              <div className="flex flex-col gap-2 border-t-[2px] border-black pt-4">
                <span className="font-label-mono text-xs text-on-surface-variant font-bold">NETWORKS:</span>
                <div className="flex gap-3">
                  <a className="font-bold hover:text-[#003fd8]" href={contact.github} target="_blank" rel="noreferrer">GITHUB</a>
                  <a className="font-bold hover:text-[#003fd8]" href={contact.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Form */}
          <div className="lg:col-span-8">
            <div className="brutalist-border bg-[#ffeb3b] p-6 brutalist-shadow flex flex-col gap-6">
              <h3 className="font-headline-md text-2xl font-black uppercase leading-tight text-primary">
                {submitted ? "Transmission Received!" : "Ready to build something raw?"}
              </h3>
              
              {submitted ? (
                <div className="flex flex-col gap-4">
                  <p className="font-body-md text-base text-on-surface">
                    Your message was sent successfully. Let's create something awesome together!
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="font-label-mono text-label-mono uppercase bg-primary text-white px-6 py-4 brutalist-border brutalist-shadow brutalist-button mt-2 brutalist-button-hover font-bold inline-block self-start"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-mono text-sm font-bold uppercase text-primary">Name</label>
                    <input 
                      className={`brutalist-border p-3 bg-white focus:bg-surface-bright focus:ring-0 focus:outline-none focus:shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all font-body-md rounded-none ${
                        errors.name ? 'border-[#ba1a1a]' : ''
                      }`}
                      placeholder="J. Doe" 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <span className="font-label-mono text-xs text-[#ba1a1a] font-bold">{errors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-mono text-sm font-bold uppercase text-primary">Email</label>
                    <input 
                      className={`brutalist-border p-3 bg-white focus:bg-surface-bright focus:ring-0 focus:outline-none focus:shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all font-body-md rounded-none ${
                        errors.email ? 'border-[#ba1a1a]' : ''
                      }`}
                      placeholder="hello@example.com" 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <span className="font-label-mono text-xs text-[#ba1a1a] font-bold">{errors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-mono text-sm font-bold uppercase text-primary">Message</label>
                    <textarea 
                      className={`brutalist-border p-3 bg-white focus:bg-surface-bright focus:ring-0 focus:outline-none focus:shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-all font-body-md resize-none rounded-none ${
                        errors.message ? 'border-[#ba1a1a]' : ''
                      }`}
                      placeholder="What's the project?" 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    {errors.message && <span className="font-label-mono text-xs text-[#ba1a1a] font-bold">{errors.message}</span>}
                  </div>

                  <button 
                    className="font-label-mono text-label-mono uppercase bg-primary text-white px-6 py-4 brutalist-border brutalist-shadow brutalist-button mt-2 brutalist-button-hover font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing Transmission..." : "Send Transmission"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
