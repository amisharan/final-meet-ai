import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Globe, Video, ArrowRight } from 'lucide-react';

export default function JoinMeeting() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if(code.trim()) {
      navigate(`/meeting/${code}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <nav className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 relative z-10 w-fit">
            <img src="/logo.jpg" alt="Lingua Meeting Logo" className="h-20 w-20 rounded-full object-contain bg-white p-2 shadow-md" />
          </Link>
          <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Log in</Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-8 bg-[#020617] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent"></div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="w-16 h-16 bg-surface border border-border rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-primary-500/10 mx-auto">
             <Video size={32} className="text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-white text-center">Join a Meeting</h1>
          <p className="text-gray-400 mb-8 text-center">Enter your meeting code or link to join.</p>
          
          <form onSubmit={handleJoin} className="space-y-6">
            <div>
              <input 
                type="text" 
                required
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-xl font-medium tracking-wider text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all placeholder-gray-600"
                placeholder="xxx-yyyy-zzz"
              />
            </div>
            
            <button type="submit" className="w-full bg-primary-600 hover:bg-primary-500 text-white rounded-xl px-4 py-4 font-bold transition-colors shadow-lg shadow-primary-600/20 flex justify-center items-center gap-2">
              Join Meeting
              <ArrowRight size={18} />
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account? <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-medium">Sign up for free</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
