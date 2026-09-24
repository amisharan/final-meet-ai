import { Link } from 'react-router-dom';
import { Globe, Users, Brain, Shield, ChevronRight, Play } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Navigation */}
      <nav className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Lingua Meeting Logo" className="h-20 w-20 rounded-full object-contain bg-white p-2 shadow-md" />
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
            <Link to="/research" className="text-gray-300 hover:text-white transition-colors">Research</Link>
            <Link to="/technology" className="text-gray-300 hover:text-white transition-colors">Technology</Link>
            <Link to="/applications" className="text-gray-300 hover:text-white transition-colors">Applications</Link>
            <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-primary-400 transition-colors">Log in</Link>
            <Link to="/signup" className="text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-full transition-colors shadow-lg shadow-primary-600/20">Sign up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-background to-background"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Speak Naturally.<br />Connect Globally.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Real-time AI-powered language translation for meetings and conversations. Lingua Meet AI combines video meetings, speech recognition, live captions, and intelligent voice assistance into one seamless experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard?newMeeting=true" className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-500 transition-colors rounded-full font-semibold text-white shadow-xl shadow-primary-600/30 flex items-center justify-center gap-2 group">
                Start a Meeting
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/research" className="w-full sm:w-auto px-8 py-4 bg-surface hover:bg-surface-hover border border-border transition-colors rounded-full font-semibold flex items-center justify-center gap-2">
                <Play size={18} />
                Explore Research
              </Link>
            </div>
          </div>
          
          {/* Simulated Meeting Interface Preview */}
          <div className="max-w-5xl mx-auto mt-20 px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 top-1/2"></div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-2xl bg-[#09090b] aspect-video relative flex">
               {/* Left: Video Grid */}
               <div className="flex-1 p-4 grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 rounded-xl relative overflow-hidden group">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80')] bg-cover bg-center"></div>
                     <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs">Amisha (English)</div>
                     <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-primary-400">Speaking...</div>
                  </div>
                  <div className="bg-slate-800 rounded-xl relative overflow-hidden">
                     <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs">Rahul (Hindi)</div>
                  </div>
               </div>
               {/* Right: Translation Panel Preview */}
               <div className="w-64 border-l border-white/10 bg-black/40 p-4 hidden md:block">
                 <div className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Live Translation</div>
                 <div className="space-y-4">
                   <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                     <div className="text-[10px] text-primary-400 mb-1">English</div>
                     <div className="text-xs text-gray-300">Welcome everyone to the meeting.</div>
                   </div>
                   <div className="bg-white/5 p-3 rounded-lg border border-white/10 border-l-2 border-l-accent-500">
                     <div className="text-[10px] text-accent-400 mb-1">Hindi</div>
                     <div className="text-sm font-medium">मीटिंग में सभी का स्वागत है।</div>
                   </div>
                 </div>
               </div>
               
               {/* Bottom Captions Overlay */}
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center">
                 <div className="bg-black/80 backdrop-blur px-4 py-2 rounded-xl text-sm md:text-base border border-white/10">
                   <span className="text-primary-400 font-medium mr-2">Amisha:</span>
                   Welcome everyone to the meeting.
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Promotional Section */}
        <section className="py-12 bg-background relative z-20 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/10 border border-white/10 hover:border-primary-500/50 transition-colors duration-500">
              <img src="/image3.jpg" alt="AI Meeting Assistants" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">One meeting. Multiple languages. One conversation.</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Break down language barriers with state-of-the-art AI infrastructure designed for real-time collaboration.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Globe, title: 'Real-time Translation', desc: 'Instantly translate speech and text across 100+ languages with near-zero latency.' },
                { icon: Brain, title: 'Context-Aware AI', desc: 'Our advanced NLP models understand context, idioms, and industry-specific terminology.' },
                { icon: Users, title: 'Seamless Collaboration', desc: 'Join from anywhere. Experience HD video, spatial audio, and interactive tools.' },
                { icon: Shield, title: 'Enterprise Security', desc: 'End-to-end encryption ensures your cross-border conversations remain private.' }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl bg-background border border-border hover:border-primary-500/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-6">
                    <feature.icon className="text-primary-500" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img src="/logo.jpg" alt="Lingua Meeting Logo" className="h-16 w-16 rounded-full object-contain bg-white p-2 shadow-md" />
          </div>
          <div className="text-sm text-gray-500">
            &copy; 2026 Lingua Meet AI Project. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
