import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Globe, ArrowRight } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful signup toast and navigation
    alert('Account created successfully');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      <div className="hidden md:flex flex-1 bg-surface p-12 flex-col relative overflow-hidden border-r border-border">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent-900/40 via-transparent to-transparent"></div>
         <Link to="/" className="flex items-center gap-2 relative z-10 w-fit">
           <img src="/logo.jpg" alt="Lingua Meeting Logo" className="h-24 w-24 rounded-full object-contain bg-white p-3 shadow-lg" />
         </Link>
         
         <div className="mt-auto relative z-10 mb-20">
           <h2 className="text-4xl font-bold mb-6 text-white leading-tight">Start connecting globally today.</h2>
           <p className="text-gray-400 text-lg max-w-md">Experience the future of multilingual communication with a free trial of our platform.</p>
         </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8 bg-[#020617]">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-white text-center md:text-left">Create an account</h1>
          <p className="text-gray-400 mb-8 text-center md:text-left">Start your free trial today</p>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500/50 transition-all"
                placeholder="Amisha Rana"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500/50 transition-all"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm Password</label>
              <input 
                type="password" 
                required
                value={formData.confirm}
                onChange={e => setFormData({...formData, confirm: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button type="submit" className="w-full mt-6 bg-accent-600 hover:bg-accent-500 text-white rounded-xl px-4 py-3 font-medium transition-colors shadow-lg shadow-accent-600/20 flex justify-center items-center gap-2">
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>
          
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account? <Link to="/login" className="text-accent-400 hover:text-accent-300 font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
