import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Stethoscope, GraduationCap, Briefcase } from 'lucide-react';

export default function Applications() {
  const industries = [
    { icon: Building2, title: 'Global Enterprise', desc: 'Conduct seamless cross-border board meetings without hiring expensive live interpreters. Ensure everyone is aligned, regardless of their native tongue.' },
    { icon: Stethoscope, title: 'Healthcare', desc: 'Connect doctors with international patients or specialists. Accurate medical terminology translation ensures patient safety and clear communication.' },
    { icon: GraduationCap, title: 'Education', desc: 'Make global classrooms truly accessible. International students can follow complex lectures in their native language via live captions.' },
    { icon: Briefcase, title: 'Freelance & Consulting', desc: 'Expand your client base globally. Pitch ideas, negotiate contracts, and consult with clients anywhere in the world effortlessly.' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <nav className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-20">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Applications</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Discover how different industries are using Lingua Meet AI to break boundaries.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {industries.map((ind, i) => (
            <div key={i} className="bg-surface border border-border p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-primary-900/30 flex items-center justify-center mb-6 border border-primary-500/30 group-hover:border-primary-500 transition-colors">
                <ind.icon className="text-primary-500" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{ind.title}</h3>
              <p className="text-gray-400 leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
