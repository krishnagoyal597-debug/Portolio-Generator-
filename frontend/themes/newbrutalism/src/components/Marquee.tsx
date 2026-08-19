import React from 'react';

export const Marquee: React.FC = () => {
  const text = "FULL-STACK DEVELOPMENT -> REACT -> NODE.JS -> PYTHON -> SYSTEM ARCHITECTURE -> GENERATIVE AI -> ";
  const repeatedText = Array(4).fill(text).join("");

  return (
    <div className="marquee-container -mx-margin-mobile w-[calc(100%+48px)] md:-mx-margin-desktop md:w-[calc(100%+128px)] mt-12 mb-4">
      <div className="marquee-content font-label-mono text-label-mono font-bold uppercase text-primary">
        {repeatedText}
      </div>
    </div>
  );
};
