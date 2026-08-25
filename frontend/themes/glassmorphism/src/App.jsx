import React, { useState } from 'react';
import FloatingShapes from './components/FloatingShapes';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="relative min-h-screen bg-[#f6f5fb] text-slate-900 font-sans selection:bg-purple-600 selection:text-white">
      {/* Background Animated Blobs & Glow Effects */}
      <FloatingShapes />

      {/* Sticky Glass Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Flow */}
      <main className="relative z-10 space-y-12">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      {/* Glass Footer */}
      <Footer />
    </div>
  );
}

export default App;
