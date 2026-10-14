import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Stethoscope, GraduationCap, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Applications() {
  const industries = [
    { 
      icon: Building2, 
      title: 'Global Enterprise & Boardrooms', 
      desc: 'Conduct seamless cross-border board meetings without hiring expensive live interpreters. Ensure executives, partners, and teams across India, the US, UK, and Japan are completely aligned in real time.' 
    },
    { 
      icon: Stethoscope, 
      title: 'Healthcare & Telemedicine', 
      desc: 'Connect doctors with international patients or global specialists. High-accuracy medical translation across Hindi, English, Tamil, Urdu & Japanese ensures patient safety and crystal-clear clinical diagnoses.' 
    },
    { 
      icon: GraduationCap, 
      title: 'Global Education & Universities', 
      desc: 'Make international classrooms truly accessible. Students can follow complex academic lectures in their native language with synchronized bi-directional captions and natural AI voice dubbing.' 
    },
    { 
      icon: Briefcase, 
      title: 'Consulting & International Commerce', 
      desc: 'Expand your client base globally. Pitch proposals, negotiate contracts, and close cross-border transactions effortlessly with instantaneous translated speech and automated meeting minutes.' 
    }
  ];

  return (
    <div className="min-h-screen bg-[#050814] text-foreground font-sans relative overflow-hidden">
      {/* Background ambient pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/background.jpeg')" }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#050814]/80 via-[#050814]/95 to-[#050814] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="border-b border-white/10 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full">
              Enterprise Solutions
            </span>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            Real-World Impact
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-5 tracking-tight text-white font-display">
            Multilingual Applications
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover how modern teams and global organizations use Lingua Meet AI to break language barriers in real time.
          </p>
        </header>

        {/* Visual Showcase Banners using cartoon.jpg and page.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur-md p-6 group hover:border-blue-500/50 transition-all duration-300">
            <div className="rounded-2xl overflow-hidden bg-slate-950 mb-5 relative">
              <img 
                src="/cartoon.jpg" 
                alt="Global Team Collaboration Cartoon" 
                className="w-full h-56 object-contain group-hover:scale-105 transition-transform duration-500" 
              />
              <span className="absolute top-3 left-3 bg-blue-600/80 backdrop-blur text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                Team Table Meetings
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cross-Border In-Person & Hybrid Teams</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Enable diverse multilingual workforces to sit together or dial in remotely while holding free-flowing discussions translated in sub-40 milliseconds.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur-md p-6 group hover:border-indigo-500/50 transition-all duration-300">
            <div className="rounded-2xl overflow-hidden bg-slate-950 mb-5 relative">
              <img 
                src="/page.png" 
                alt="Virtual Video Conference Interface Cartoon" 
                className="w-full h-56 object-contain group-hover:scale-105 transition-transform duration-500" 
              />
              <span className="absolute top-3 left-3 bg-indigo-600/80 backdrop-blur text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                Virtual Video Calls
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Browser-Based AI Video Conferences</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Zero software installation required. Participants join in one click with live dubbed audio channels and multi-language live captions.
            </p>
          </div>
        </div>

        {/* Industry Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {industries.map((ind, i) => (
            <div key={i} className="bg-slate-900/60 border border-white/10 p-8 rounded-2xl backdrop-blur-md hover:border-blue-500/40 hover:bg-slate-900/80 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6 border border-blue-500/30 group-hover:border-blue-400 group-hover:bg-blue-600/20 transition-all">
                <ind.icon className="text-blue-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{ind.title}</h3>
              <p className="text-slate-300 leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/20 p-10 rounded-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to deploy Lingua Meet AI for your organization?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
            Get started with real-time translation across Hindi, English, Tamil, Urdu, and Japanese today.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30">
              Schedule Enterprise Demo
            </Link>
            <Link to="/pricing" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-all border border-white/15">
              Explore Plans
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
