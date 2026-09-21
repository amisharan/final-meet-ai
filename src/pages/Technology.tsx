import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Database, BrainCircuit, Globe, Volume2 } from 'lucide-react';

export default function Technology() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Built with modern tech</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Lingua Meet AI leverages cutting-edge web technologies and AI infrastructure.</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Code, title: 'React & TypeScript', desc: 'A robust, scalable frontend architecture ensuring type safety and seamless UI updates.' },
            { icon: Database, title: 'Tailwind CSS', desc: 'Utility-first CSS framework for creating a premium, responsive, and dynamic design system.' },
            { icon: BrainCircuit, title: 'NLP Models', desc: 'Advanced Natural Language Processing for contextual understanding of spoken conversations.' },
            { icon: Globe, title: 'Machine Translation', desc: 'Neural Machine Translation (NMT) engines providing real-time text translation across dialects.' },
            { icon: Volume2, title: 'Speech Recognition', desc: 'Automatic Speech Recognition (ASR) mapping audio to text with high accuracy.' },
            { icon: Volume2, title: 'Text-to-Speech', desc: 'Generating natural-sounding translated audio using state-of-the-art TTS synthesis.' }
          ].map((tech, i) => (
            <div key={i} className="bg-surface border border-border p-6 rounded-2xl hover:border-primary-500/50 transition-colors group">
               <tech.icon size={32} className="text-primary-500 mb-4 group-hover:scale-110 transition-transform" />
               <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
               <p className="text-gray-400 text-sm leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
