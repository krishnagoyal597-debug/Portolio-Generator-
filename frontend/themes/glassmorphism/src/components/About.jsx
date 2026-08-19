import React from 'react';
import { MapPin, User, Sparkles, Heart, CheckCircle2, Award, Zap, Code } from 'lucide-react';
import portfolioData from '../data/portfolioData';

const About = () => {
  const { personal } = portfolioData;

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-purple-300 mb-3">
          <User className="w-3.5 h-3.5" />
          <span>Professional Summary</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About <span className="text-gradient-vibrant">Me</span>
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
      </div>

      {/* Grid Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Glass Profile Summary Card & Highlights */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <div className="p-8 rounded-3xl glass-panel border border-white/15 backdrop-blur-xl relative overflow-hidden flex-1">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl p-1 bg-gradient-to-tr from-purple-500 to-pink-500 flex-shrink-0 shadow-lg">
                <img
                  src={personal.profileImage}
                  alt={personal.name}
                  className="w-full h-full object-cover rounded-xl border border-white/30"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{personal.name}</h3>
                <p className="text-sm text-purple-300 font-medium">{personal.headline}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  <span>{personal.location}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
              {personal.summary}
            </p>

            <div className="space-y-3">
              {personal.aboutHighlights?.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl glass-pill hover:bg-white/10 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-gray-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Bio Narrative & Interests */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 backdrop-blur-xl relative overflow-hidden flex-1 flex flex-col justify-between">
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-600/15 rounded-full blur-2xl pointer-events-none" />

            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Crafting Digital Excellence</span>
              </h3>

              <p className="text-gray-300 text-base leading-relaxed mb-6 font-light">
                {personal.aboutBio || personal.summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl glass-card border border-white/10">
                  <Zap className="w-6 h-6 text-purple-400 mb-2" />
                  <h4 className="text-sm font-bold text-white">Fast & Scalable</h4>
                  <p className="text-xs text-gray-300 mt-1">High-performance code architecture optimized for speed.</p>
                </div>
                <div className="p-4 rounded-2xl glass-card border border-white/10">
                  <Code className="w-6 h-6 text-pink-400 mb-2" />
                  <h4 className="text-sm font-bold text-white">Modern Tech Stack</h4>
                  <p className="text-xs text-gray-300 mt-1">React 19, TypeScript, Node.js & AI API integrations.</p>
                </div>
              </div>
            </div>

            {/* Interest Tags */}
            {personal.interests && (
              <div>
                <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span>Key Interests & Focus Areas</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {personal.interests.map((interest, idx) => (
                    <span 
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-gray-200 hover:text-white hover:border-purple-400/40 transition-colors"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default About;
