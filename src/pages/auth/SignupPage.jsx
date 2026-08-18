import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Lock, User, Github } from 'lucide-react';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [localError, setLocalError] = useState('');
  
  const { signup, loading, error: authError } = useAuth();
  const { addToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!name || !email || !password || !confirmPassword) {
      setLocalError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }
    if (!terms) {
      setLocalError('You must accept the Terms & Conditions');
      return;
    }

    try {
      await signup(name, email, password);
      addToast('success', 'Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignup = () => {
    addToast('info', 'Github signup is mocked for this demo.');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Left side - Branding/Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-bl from-slate-900 via-indigo-950 to-slate-900 overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        
        <div className="relative z-10 flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
           <span className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400">✦</span> PortfolioForge
           </span>
        </div>

        <div className="relative z-10 flex-grow flex flex-col justify-center max-w-lg">
          <blockquote className="text-2xl font-medium text-white leading-relaxed mb-6">
            "I used to spend days tweaking my portfolio HTML. With PortfolioForge, I uploaded my resume and had a stunning Brutalist site deployed in under two minutes."
          </blockquote>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
               S
             </div>
             <div>
               <div className="text-white font-semibold">Sarah Jenkins</div>
               <div className="text-indigo-300 text-sm">Fullstack Developer</div>
             </div>
          </div>
        </div>

        <div className="relative z-10 flex gap-4 text-indigo-300 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center cursor-pointer" onClick={() => navigate('/')}>
             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                ✦ PortfolioForge
             </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create your account</h2>
            <p className="text-gray-500 dark:text-gray-400">Start building your next-gen portfolio today.</p>
          </div>

          {(localError || authError) && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm rounded-xl border border-red-200 dark:border-red-800">
              {localError || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              icon={<User size={18} className="text-gray-400" />}
            />

            <Input
              label="Email address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={<Mail size={18} className="text-gray-400" />}
            />

            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              icon={<Lock size={18} className="text-gray-400" />}
            />

            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              icon={<Lock size={18} className="text-gray-400" />}
            />

            <div className="flex items-start mt-4 mb-6">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-500 dark:text-gray-400">
                  I accept the{' '}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                    Terms & Conditions
                  </a>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="secondary"
                fullWidth
                onClick={handleGoogleSignup}
                icon={<Github size={18} />}
              >
                Github (Demo)
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
