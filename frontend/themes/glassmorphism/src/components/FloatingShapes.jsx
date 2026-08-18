import React from 'react';

const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary Ambient Gradient Background */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at 50% 10%, #240044 0%, #16002B 45%, #090014 90%)'
        }}
      />

      {/* Floating Glowing Orbs inspired by Glassmorphism design */}
      {/* Orb 1: Upper Left Purple/Pink Blob */}
      <div className="absolute top-[5%] left-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-purple-700/30 to-pink-600/30 blur-[100px] animate-pulse-glow" />

      {/* Orb 2: Top Right Cyan/Blue Blob */}
      <div 
        className="absolute top-[12%] right-[8%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-cyan-600/25 via-indigo-600/20 to-purple-800/30 blur-[120px] animate-pulse-glow"
        style={{ animationDelay: '2s' }}
      />

      {/* Orb 3: Center Magenta Glow behind Hero Card */}
      <div className="absolute top-[28%] left-[50%] -translate-x-[50%] w-[600px] h-[400px] rounded-full bg-gradient-to-r from-fuchsia-600/20 via-purple-600/25 to-pink-500/20 blur-[130px]" />

      {/* Orb 4: Mid-Page Left Purple/Pink Orbs */}
      <div className="absolute top-[55%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-800/30 to-pink-700/25 blur-[110px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Orb 5: Bottom Right Cyan Orb */}
      <div className="absolute bottom-[5%] right-[-5%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-purple-700/25 to-pink-600/20 blur-[110px]" />

      {/* Subtle Geometry Grid Overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />
    </div>
  );
};

export default FloatingShapes;
