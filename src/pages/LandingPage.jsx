import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { Layers, Wand2, Palette, Rocket, CheckCircle2, ChevronRight, Menu, X, ArrowRight, UploadCloud, LayoutDashboard, Share2 } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Themes', href: '#themes' },
    { label: 'Features', href: '#features' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-gray-100 overflow-x-hidden transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                ✦ PortfolioForge
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <Button onClick={() => navigate('/dashboard')} variant="primary" iconRight={<LayoutDashboard size={16} />}>
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button onClick={() => navigate('/login')} variant="ghost">
                    Log in
                  </Button>
                  <Button onClick={() => navigate('/signup')} variant="primary">
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 pb-4 px-4 shadow-xl">
            <div className="flex flex-col space-y-4 pt-2">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-700 dark:text-gray-200">
                  {link.label}
                </a>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-col space-y-2">
                 {isAuthenticated ? (
                  <Button onClick={() => navigate('/dashboard')} fullWidth variant="primary">Dashboard</Button>
                 ) : (
                   <>
                    <Button onClick={() => navigate('/login')} fullWidth variant="secondary">Log in</Button>
                    <Button onClick={() => navigate('/signup')} fullWidth variant="primary">Get Started</Button>
                   </>
                 )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-900/50 border border-indigo-700/50 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
                ✦ Powered by Gemini AI
              </div>
              <h1 className="text-4xl tracking-tight font-black text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl leading-tight">
                Turn Your Resume Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Portfolio</span> That Stands Out.
              </h1>
              <p className="mt-6 text-base text-indigo-200 sm:mt-8 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-8 md:text-xl lg:mx-0">
                Upload your JSON resume or PDF. Our AI generates a stunning, personalized portfolio in seconds. Pick a theme, customize content, and publish instantly.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="primary" onClick={() => navigate('/signup')} iconRight={<ArrowRight size={20} />}>
                  Start Building Free
                </Button>
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" onClick={() => document.getElementById('themes').scrollIntoView({ behavior: 'smooth'})}>
                  View Themes
                </Button>
              </div>
              <div className="mt-6 text-sm text-indigo-300 flex items-center justify-center lg:justify-start gap-4">
                <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-indigo-400"/> No credit card required</span>
                <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-indigo-400"/> 6 Premium Themes</span>
              </div>
            </div>
            
            {/* Hero Right: Stacked Cards Preview */}
            <div className="mt-16 lg:mt-0 lg:col-span-6 relative h-[400px] sm:h-[500px] flex items-center justify-center">
               <div className="relative w-full max-w-md mx-auto">
                 {/* Card 3: Futuristic (Back) */}
                 <div className="absolute top-12 -left-8 md:-left-16 w-full h-[320px] bg-gray-950 border border-green-500/30 rounded-2xl shadow-2xl transform -rotate-6 scale-90 transition-transform hover:scale-95 z-10 flex flex-col overflow-hidden">
                    <div className="h-8 bg-gray-900 border-b border-green-500/20 flex items-center px-4">
                       <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"/><div className="w-2.5 h-2.5 rounded-full bg-green-500/50"/></div>
                    </div>
                    <div className="p-4 font-mono text-xs text-green-500/70">
                      <p>{`> init portfolio.exe`}</p>
                      <p>{`> loading modules... [OK]`}</p>
                      <p className="mt-4 text-green-400 text-lg">{`SYS.ADMIN // DEV`}</p>
                      <div className="mt-4 border-l-2 border-green-500/50 pl-2">
                        <p>{`SKILLS:`}</p>
                        <p>{`[React] [Node] [Go]`}</p>
                      </div>
                    </div>
                 </div>

                 {/* Card 2: Bento (Middle) */}
                 <div className="absolute top-6 left-4 md:left-12 w-full h-[320px] bg-slate-100 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transform rotate-3 scale-95 transition-transform hover:scale-100 z-20 p-3 grid grid-cols-2 grid-rows-3 gap-2">
                    <div className="col-span-2 row-span-1 bg-white rounded-2xl p-4 shadow-sm flex items-end">
                      <div className="text-xl font-bold text-slate-800 tracking-tight">Jane Smith<br/><span className="text-sm text-slate-500 font-normal">Product Designer</span></div>
                    </div>
                    <div className="col-span-1 row-span-2 bg-indigo-500 rounded-2xl p-4 text-white flex flex-col justify-between">
                       <Palette size={20} className="opacity-80"/>
                       <div className="text-sm font-medium mt-auto">UI/UX<br/>Design</div>
                    </div>
                    <div className="col-span-1 row-span-1 bg-rose-200 rounded-2xl p-3 flex items-center justify-center">
                       <span className="text-rose-700 font-bold text-xs">8+ Projects</span>
                    </div>
                    <div className="col-span-1 row-span-1 bg-emerald-200 rounded-2xl p-3 flex items-center justify-center">
                       <span className="text-emerald-700 font-bold text-xs">Figma Pro</span>
                    </div>
                 </div>

                 {/* Card 1: Brutalist (Front) */}
                 <div className="absolute top-0 right-0 w-full h-[320px] bg-white border-4 border-black rounded-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-2 hover:translate-x-2 z-30 p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-4xl font-black uppercase leading-none tracking-tighter text-black border-b-4 border-black pb-4">
                        ALEX<br/>CHEN.
                      </h2>
                      <div className="mt-4 flex gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-yellow-300 border-2 border-black text-black font-bold text-xs uppercase">Frontend</span>
                        <span className="px-2 py-1 bg-black text-white font-bold text-xs uppercase">Engineer</span>
                      </div>
                    </div>
                    <div className="border-t-4 border-black pt-2 flex justify-between items-center">
                      <span className="font-bold text-black text-sm">EST. 2024</span>
                      <ArrowRight size={24} className="text-black" />
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Workflow</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
              From resume to portfolio in minutes.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-slate-800 z-0"></div>
            
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
              {[
                { num: '01', icon: <UploadCloud size={24}/>, title: 'Upload', desc: 'Import your JSON Resume or PDF.' },
                { num: '02', icon: <Wand2 size={24}/>, title: 'Analyze', desc: 'Gemini AI extracts and structures your data.' },
                { num: '03', icon: <Layers size={24}/>, title: 'Improve', desc: 'AI suggests better wording for achievements.' },
                { num: '04', icon: <Palette size={24}/>, title: 'Theme', desc: 'Select from 6 premium developer themes.' },
                { num: '05', icon: <Rocket size={24}/>, title: 'Publish', desc: 'Deploy instantly with one click.' },
              ].map((step, idx) => (
                <div key={idx} className="relative bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800 transition-colors group">
                  <div className="h-12 w-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-indigo-500 group-hover:text-white">
                    {step.icon}
                  </div>
                  <div className="absolute top-4 right-4 text-4xl font-black text-slate-700/30 select-none group-hover:text-slate-600/50 transition-colors">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Themes Showpiece Section */}
      <section id="themes" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Your Story. Your Style.
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Stop looking like everyone else. Choose a theme that matches your personality. 
              Our themes are built with Tailwind CSS and look incredible on any device.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Brutalist Theme Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-48 bg-white border-b-2 border-black p-4 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                 <div className="h-full border-4 border-black p-4 flex flex-col justify-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-3xl font-black uppercase text-black leading-none">J. DOE</h3>
                    <div className="mt-2 bg-black text-white text-xs inline-block px-2 py-1 font-bold">SOFTWARE DEV</div>
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Brutalist</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Raw, expressive, high-contrast.</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    Bold
                  </span>
                </div>
                <div className="mt-auto pt-4 flex gap-3">
                  <Button variant="secondary" className="flex-1">Preview</Button>
                  <Button variant="primary" className="flex-1" onClick={() => navigate('/signup')}>Use Theme</Button>
                </div>
              </div>
            </div>

            {/* Bento Theme Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-48 bg-slate-100 dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 p-4 relative overflow-hidden flex gap-2">
                 <div className="w-1/2 flex flex-col gap-2">
                   <div className="flex-1 bg-white dark:bg-gray-700 rounded-xl shadow-sm p-3 flex flex-col justify-center">
                     <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-2"></div>
                     <div className="h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
                   </div>
                   <div className="h-12 bg-blue-500 rounded-xl shadow-sm"></div>
                 </div>
                 <div className="w-1/2 flex flex-col gap-2">
                   <div className="h-16 bg-emerald-400 rounded-xl shadow-sm"></div>
                   <div className="flex-1 bg-white dark:bg-gray-700 rounded-xl shadow-sm p-3">
                     <div className="h-2 w-full bg-gray-100 dark:bg-gray-600 rounded mb-2"></div>
                     <div className="h-2 w-3/4 bg-gray-100 dark:bg-gray-600 rounded mb-2"></div>
                     <div className="h-2 w-1/2 bg-gray-100 dark:bg-gray-600 rounded"></div>
                   </div>
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bento Grid</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Playful, structured, modern layout.</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    Popular
                  </span>
                </div>
                <div className="mt-auto pt-4 flex gap-3">
                  <Button variant="secondary" className="flex-1">Preview</Button>
                  <Button variant="primary" className="flex-1" onClick={() => navigate('/signup')}>Use Theme</Button>
                </div>
              </div>
            </div>

            {/* Minimal Theme Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-48 bg-white border-b border-gray-200 dark:border-gray-700 p-8 relative flex flex-col justify-center items-center">
                 <div className="w-full max-w-[200px] border-b border-gray-200 pb-4 text-center">
                   <h3 className="text-2xl font-serif italic text-gray-900 tracking-wide">Jane Doe</h3>
                   <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-2">Curated Works</p>
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Minimal</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Clean, typography-focused, elegant.</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    Clean
                  </span>
                </div>
                <div className="mt-auto pt-4 flex gap-3">
                  <Button variant="secondary" className="flex-1">Preview</Button>
                  <Button variant="primary" className="flex-1" onClick={() => navigate('/signup')}>Use Theme</Button>
                </div>
              </div>
            </div>

             {/* Futuristic Theme Card */}
             <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-48 bg-gray-950 border-b border-gray-800 p-4 relative font-mono overflow-hidden">
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
                 <p className="text-green-500/70 text-xs">{`> root@portfolio:~$ ./start.sh`}</p>
                 <h3 className="text-green-400 text-xl font-bold mt-2">{`USER: JOHN_DOE`}</h3>
                 <div className="mt-2 text-green-500/50 text-xs">
                   <p>{`[SYSTEM_ONLINE]`}</p>
                   <p>{`LOADING_SKILLS... [||||||||||] 100%`}</p>
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Terminal</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">For the hardcore developers.</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Geek
                  </span>
                </div>
                <div className="mt-auto pt-4 flex gap-3">
                  <Button variant="secondary" className="flex-1">Preview</Button>
                  <Button variant="primary" className="flex-1" onClick={() => navigate('/signup')}>Use Theme</Button>
                </div>
              </div>
            </div>

            {/* Spatial Theme Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-48 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950 dark:to-blue-900 border-b border-gray-200 dark:border-gray-700 p-6 relative flex items-center justify-center">
                 <div className="w-3/4 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-gray-700/50 p-4 transform -rotate-2 hover:rotate-0 transition-transform">
                    <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-600 rounded-full mb-3"></div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full mb-2"></div>
                    <div className="h-2 w-3/4 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Spatial</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Soft shadows, gradients, depth.</p>
                  </div>
                </div>
                <div className="mt-auto pt-4 flex gap-3">
                  <Button variant="secondary" className="flex-1">Preview</Button>
                  <Button variant="primary" className="flex-1" onClick={() => navigate('/signup')}>Use Theme</Button>
                </div>
              </div>
            </div>

            {/* Glassmorphic Theme Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-48 bg-gradient-to-r from-fuchsia-600 to-purple-600 border-b border-gray-200 dark:border-gray-700 p-6 relative flex items-center justify-center overflow-hidden">
                 <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-400 rounded-full mix-blend-screen filter blur-xl opacity-70"></div>
                 <div className="absolute bottom-4 right-4 w-20 h-20 bg-blue-400 rounded-full mix-blend-screen filter blur-xl opacity-70"></div>
                 <div className="relative w-4/5 h-24 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4 text-white shadow-xl">
                    <div className="text-lg font-bold">Hello World</div>
                    <div className="text-xs text-white/70 mt-1">UI Developer</div>
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Glassmorphic</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Vibrant colors with frosted glass panels.</p>
                  </div>
                </div>
                <div className="mt-auto pt-4 flex gap-3">
                  <Button variant="secondary" className="flex-1">Preview</Button>
                  <Button variant="primary" className="flex-1" onClick={() => navigate('/signup')}>Use Theme</Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to stand out
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: <UploadCloud className="text-indigo-600" size={32}/>, title: 'One-Click Import', desc: 'Upload your JSON Resume or PDF and let our AI parse and structure it perfectly.' },
               { icon: <Wand2 className="text-indigo-600" size={32}/>, title: 'AI Enhancements', desc: 'Gemini AI rewrites your bullet points to highlight impact and results.' },
               { icon: <Palette className="text-indigo-600" size={32}/>, title: 'Custom Themes', desc: 'Switch between radically different visual identities with a single click.' },
               { icon: <Share2 className="text-indigo-600" size={32}/>, title: 'Instant Publishing', desc: 'Get a unique URL instantly. Share your new portfolio with recruiters.' },
             ].map((feature, idx) => (
               <div key={idx} className="p-6 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{feature.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to upgrade your professional presence?
          </h2>
          <p className="mt-4 text-xl leading-6 text-indigo-100">
            Join thousands of developers who have leveled up their portfolio game.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-50" onClick={() => navigate('/signup')}>
              Create Your Portfolio Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              ✦ PortfolioForge
            </span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} PortfolioForge. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-500 hover:text-white">Twitter</a>
            <a href="#" className="text-slate-500 hover:text-white">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
