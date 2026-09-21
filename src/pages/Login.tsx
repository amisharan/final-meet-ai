import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Globe, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      {/* Left Panel */}
      <div className="hidden md:flex flex-1 bg-surface p-12 flex-col relative overflow-hidden border-r border-border">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary-900/40 via-transparent to-transparent"></div>
         <Link to="/" className="flex items-center gap-2 relative z-10 w-fit">
           <img src="/logo.jpg" alt="Lingua Meeting Logo" className="h-24 w-24 rounded-full object-contain bg-white p-3 shadow-lg" />
         </Link>
         
         <div className="mt-auto relative z-10 mb-20">
           <h2 className="text-4xl font-bold mb-6 text-white leading-tight">Translate your world.<br/>One meeting at a time.</h2>
           <p className="text-gray-400 text-lg max-w-md">Join thousands of professionals breaking language barriers with real-time AI translation.</p>
         </div>
      </div>
      
      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#020617]">
        <div className="w-full max-w-md">
          <div className="mb-8 md:hidden flex items-center gap-2 justify-center">
             <img src="/logo.jpg" alt="Lingua Meeting Logo" className="h-24 w-24 rounded-full object-contain bg-white p-3 shadow-lg" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2 text-white text-center md:text-left">Welcome back</h1>
          <p className="text-gray-400 mb-8 text-center md:text-left">Sign in to your account to continue</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <a href="#" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">Forgot Password?</a>
              </div>
              <input 
                type="password" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="rounded border-gray-600 bg-gray-800 text-primary-500 focus:ring-primary-500/50" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">Remember me</label>
            </div>
            
            <button type="submit" className="w-full bg-primary-600 hover:bg-primary-500 text-white rounded-xl px-4 py-3 font-medium transition-colors shadow-lg shadow-primary-600/20 flex justify-center items-center gap-2">
              Sign In
              <ArrowRight size={18} />
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-[#020617] text-gray-500">Or continue with</span></div>
            </div>
            
            <button type="button" className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3 font-medium transition-colors flex justify-center items-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Google
            </button>
          </form>
          
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account? <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-medium">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
