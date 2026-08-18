import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export const App: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-black font-sans selection:bg-[#FFE600] selection:text-black">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Main Portfolio Content */}
      <main>
        <Hero onOpenResume={() => setIsResumeModalOpen(true)} />
        <Marquee />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default App;
