import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import portfolioData from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Contact: React.FC = () => {
  const { contact } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
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

      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-[#FFFDF0] border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 bg-[#00F0FF] text-black px-6 py-3 border-4 border-black shadow-[6px_6px_0px_#000000] transform rotate-1 mb-3">
            <Mail className="w-7 h-7 stroke-[3]" />
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase">LET'S BUILD SOMETHING.</h2>
          </div>
          <p className="font-mono text-base font-bold text-gray-800 uppercase max-w-xl mt-2">
            Have an idea, project or internship opportunity? Let's connect and build something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFE600] p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_#000000]">
              <span className="bg-black text-white font-mono text-xs font-extrabold px-3 py-1 border border-black uppercase mb-4 inline-block">
                DIRECT CHANNELS
              </span>
              <h3 className="text-3xl font-extrabold text-black uppercase mb-6 leading-tight">
                GET IN TOUCH <br />WITH AARAV
              </h3>

              <div className="space-y-4 font-mono text-sm font-bold">
                
                {/* Email Card */}
                <a 
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 bg-white p-3.5 border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-black hover:text-[#FFE600] transition-all group"
                >
                  <div className="p-2 bg-[#FF597B] text-white border-2 border-black group-hover:bg-[#FFE600] group-hover:text-black">
                    <Mail className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-600 group-hover:text-gray-300">EMAIL</div>
                    <div className="text-xs sm:text-sm font-extrabold">{contact.email}</div>
                  </div>
                </a>

                {/* Phone Card */}
                <a 
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 bg-white p-3.5 border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-black hover:text-[#FFE600] transition-all group"
                >
                  <div className="p-2 bg-[#00F0FF] text-black border-2 border-black">
                    <Phone className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-600 group-hover:text-gray-300">PHONE</div>
                    <div className="text-xs sm:text-sm font-extrabold">{contact.phone}</div>
                  </div>
                </a>

                {/* LinkedIn Card */}
                <a 
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white p-3.5 border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-black hover:text-[#FFE600] transition-all group"
                >
                  <div className="p-2 bg-[#9D4EDD] text-white border-2 border-black">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-600 group-hover:text-gray-300">LINKEDIN</div>
                    <div className="text-xs sm:text-sm font-extrabold">linkedin.com/in/aaravsharma</div>
                  </div>
                </a>

                {/* GitHub Card */}
                <a 
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white p-3.5 border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-black hover:text-[#FFE600] transition-all group"
                >
                  <div className="p-2 bg-[#CCFF00] text-black border-2 border-black">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-600 group-hover:text-gray-300">GITHUB</div>
                    <div className="text-xs sm:text-sm font-extrabold">github.com/aaravsharma</div>
                  </div>
                </a>

                {/* Location Card */}
                <div className="flex items-center gap-3 bg-white p-3.5 border-3 border-black shadow-[4px_4px_0px_#000000]">
                  <div className="p-2 bg-[#FF9F29] text-black border-2 border-black">
                    <MapPin className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-600">LOCATION</div>
                    <div className="text-xs sm:text-sm font-extrabold">{contact.location}</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT: Large Neo-Brutalist Interactive Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border-4 border-black shadow-[12px_12px_0px_#000000]">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="inline-flex p-4 bg-[#CCFF00] border-4 border-black shadow-[6px_6px_0px_#000000] text-black">
                  <CheckCircle2 className="w-12 h-12 stroke-[3]" />
                </div>
                <h3 className="text-3xl font-extrabold uppercase text-black">MESSAGE RECEIVED!</h3>
                <p className="text-base text-gray-800 font-medium max-w-md mx-auto">
                  Thank you for reaching out. Aarav will review your message and respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 inline-block bg-black text-[#FFE600] font-extrabold px-6 py-3 border-3 border-black shadow-[4px_4px_0px_#00F0FF] hover:bg-[#FFE600] hover:text-black transition-all"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="flex items-center justify-between border-b-3 border-black pb-3">
                  <h3 className="text-xl font-extrabold font-mono uppercase text-black flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FF597B]" />
                    <span>SEND A DIRECT MESSAGE</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-gray-600">* ALL FIELDS REQUIRED</span>
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-xs font-mono font-extrabold uppercase text-black mb-1.5">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Verma"
                    className={`w-full bg-[#FFFDF0] px-4 py-3 font-medium text-black border-3 border-black shadow-[3px_3px_0px_#000000] focus:outline-none focus:bg-white focus:shadow-[5px_5px_0px_#00F0FF] transition-all ${
                      errors.name ? 'border-[#FF597B] bg-[#FFF0F2]' : ''
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs font-mono font-bold text-[#FF597B] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-mono font-extrabold uppercase text-black mb-1.5">
                    YOUR EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul.verma@company.com"
                    className={`w-full bg-[#FFFDF0] px-4 py-3 font-medium text-black border-3 border-black shadow-[3px_3px_0px_#000000] focus:outline-none focus:bg-white focus:shadow-[5px_5px_0px_#00F0FF] transition-all ${
                      errors.email ? 'border-[#FF597B] bg-[#FFF0F2]' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs font-mono font-bold text-[#FF597B] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-xs font-mono font-extrabold uppercase text-black mb-1.5">
                    SUBJECT / OPPORTUNITY TITLE
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Frontend Internship / Project Inquiry"
                    className={`w-full bg-[#FFFDF0] px-4 py-3 font-medium text-black border-3 border-black shadow-[3px_3px_0px_#000000] focus:outline-none focus:bg-white focus:shadow-[5px_5px_0px_#00F0FF] transition-all ${
                      errors.subject ? 'border-[#FF597B] bg-[#FFF0F2]' : ''
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs font-mono font-bold text-[#FF597B] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-mono font-extrabold uppercase text-black mb-1.5">
                    YOUR MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project details or internship role..."
                    className={`w-full bg-[#FFFDF0] px-4 py-3 font-medium text-black border-3 border-black shadow-[3px_3px_0px_#000000] focus:outline-none focus:bg-white focus:shadow-[5px_5px_0px_#00F0FF] transition-all ${
                      errors.message ? 'border-[#FF597B] bg-[#FFF0F2]' : ''
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs font-mono font-bold text-[#FF597B] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFE600] text-black font-extrabold py-4 px-6 text-base uppercase tracking-wider border-4 border-black shadow-[6px_6px_0px_#000000] hover:bg-[#00F0FF] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[9px_9px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>SENDING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE NOW</span>
                      <Send className="w-5 h-5 stroke-[3]" />
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
};
