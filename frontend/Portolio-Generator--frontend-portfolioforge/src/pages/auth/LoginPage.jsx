import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  
  const { login, loading, error: authError } = useAuth();
  const { addToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email) {
      setLocalError('Email is required');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    try {
      const user = await login(email, password);
      addToast('success', 'Logged in successfully!');
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      // Auth context handles error state, but we can catch to prevent navigation
      console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    addToast('info', 'Google login is mocked for this demo.');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Left side - Branding/Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-900 via-slate-900 to-black overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        
        <div className="relative z-10 flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
           <span className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400">✦</span> PortfolioForge
           </span>
        </div>

        <div className="relative z-10 flex-grow flex flex-col justify-center max-w-lg">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
            From Resume to <br/><span className="text-indigo-400">Remarkable Portfolio.</span>
          </h1>
          <p className="text-indigo-200 text-lg mb-12">
            Log in to manage your AI-generated portfolios, track views, and update your personal brand.
          </p>

          {/* Mini Portfolio Mockup */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform">
             <div className="flex gap-4 items-center mb-6 border-b border-white/10 pb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400"></div>
                <div>
                  <div className="text-white font-bold text-lg">Alex Developer</div>
                  <div className="text-indigo-300 text-sm">Frontend Engineer</div>
                </div>
             </div>
             <div className="space-y-3">
               <div className="flex gap-2">
                 <span className="px-2 py-1 bg-white/10 rounded text-xs text-white">React</span>
                 <span className="px-2 py-1 bg-white/10 rounded text-xs text-white">TypeScript</span>
               </div>
               <div className="h-2 w-3/4 bg-white/20 rounded-full mt-4"></div>
               <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
             </div>
          </div>
        </div>

        <div className="relative z-10 text-indigo-300 text-sm">
          &copy; {new Date().getFullYear()} PortfolioForge.
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center cursor-pointer" onClick={() => navigate('/')}>
             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                ✦ PortfolioForge
             </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h2>
            <p className="text-gray-500 dark:text-gray-400">Please enter your details to sign in.</p>
          </div>

          {/* Hint for mock creds */}
          <div className="mb-6 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-100 dark:border-indigo-800/50 text-sm text-indigo-800 dark:text-indigo-300">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>User: anshika@example.com / password123</p>
            <p>Admin: admin@portfolioforge.com / admin123</p>
          </div>

          {(localError || authError) && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm rounded-xl border border-red-200 dark:border-red-800">
              {localError || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              icon={<Mail size={18} className="text-gray-400" />}
              autoComplete="email"
            />

            <div>
              <Input
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock size={18} className="text-gray-400" />}
                autoComplete="current-password"
              />
              <div className="flex justify-end mt-1">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              iconRight={<ArrowRight size={18} />}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="secondary"
                fullWidth
                onClick={handleGoogleLogin}
                icon={<Github size={18} />}
              >
                Sign in with Github (Demo)
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
