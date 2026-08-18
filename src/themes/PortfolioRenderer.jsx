import React from 'react';
import BrutalistPortfolio from './BrutalistPortfolio';
import BentoPortfolio from './BentoPortfolio';
import MinimalPortfolio from './MinimalPortfolio';
import SpatialPortfolio from './SpatialPortfolio';
import GlassmorphicPortfolio from './GlassmorphicPortfolio';
import FuturisticPortfolio from './FuturisticPortfolio';

const THEME_MAP = {
  brutalist: BrutalistPortfolio,
  bento: BentoPortfolio,
  minimal: MinimalPortfolio,
  spatial: SpatialPortfolio,
  glassmorphic: GlassmorphicPortfolio,
  futuristic: FuturisticPortfolio
};

export default function PortfolioRenderer({ data, theme = 'bento' }) {
  if (!data) {
    return <div className="p-8 text-center text-red-500 font-bold">Error: Portfolio data is missing.</div>;
  }

  const Component = THEME_MAP[theme.toLowerCase()] || BentoPortfolio;
  
  return <Component data={data} />;
}
