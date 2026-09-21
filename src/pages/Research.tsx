import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Zap, Lock, Cpu, Globe } from 'lucide-react';

export default function Research() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary-500/30">
      <nav className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <div className="mx-auto flex items-center gap-2">
            <BookOpen className="text-accent-500" size={24} />
            <span className="font-bold text-xl tracking-tight">Lingua Meet AI Research</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-20">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">The Research Behind<br/>Lingua Meet AI</h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Lingua Meet AI explores how artificial intelligence can support real-time multilingual communication by combining speech recognition, natural language processing, machine translation, and text-to-speech technologies.
          </p>
        </header>

        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Cpu className="text-primary-500" />
            System Architecture
          </h2>
          <div className="bg-surface border border-border rounded-2xl p-8 mb-8 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 to-transparent"></div>
             {/* Animated Flow Diagram Simulation */}
             <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 text-sm font-medium">
                <div className="p-4 bg-gray-900 rounded-xl border border-gray-700 shadow-lg">Microphone<br/><span className="text-xs text-gray-500">Audio Input</span></div>
                <div className="w-px h-8 md:w-8 md:h-px bg-primary-500 animate-pulse"></div>
                <div className="p-4 bg-primary-900/30 rounded-xl border border-primary-500/50 shadow-lg glow">Speech-to-Text<br/><span className="text-xs text-primary-300">ASR Model</span></div>
                <div className="w-px h-8 md:w-8 md:h-px bg-accent-500 animate-pulse delay-75"></div>
                <div className="p-4 bg-accent-900/30 rounded-xl border border-accent-500/50 shadow-lg shadow-accent-500/20">Translation Engine<br/><span className="text-xs text-accent-300">NMT Processing</span></div>
                <div className="w-px h-8 md:w-8 md:h-px bg-cyan-500 animate-pulse delay-150"></div>
                <div className="p-4 bg-cyan-900/30 rounded-xl border border-cyan-500/50 shadow-lg">Text-to-Speech<br/><span className="text-xs text-cyan-300">Voice Synthesis</span></div>
             </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Layers className="text-primary-500" />
            Research Gap
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Real-Time Processing', desc: 'Achieving sub-500ms latency for end-to-end translation in video conferences.' },
              { title: 'Context Preservation', desc: 'Maintaining semantic meaning across sentence boundaries during live speech.' },
              { title: 'Accent Recognition', desc: 'Handling diverse global accents accurately in the speech-to-text pipeline.' },
              { title: 'Privacy-Aware Processing', desc: 'Ensuring on-the-fly ephemeral processing without storing raw audio data.' },
            ].map((gap, i) => (
              <div key={i} className="bg-surface p-6 rounded-xl border border-border hover:border-gray-600 transition-colors">
                <h3 className="font-bold text-lg mb-2">{gap.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{gap.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Globe className="text-primary-500" />
            Future Scope
          </h2>
          <div className="flex flex-wrap gap-3">
            {['More languages', 'Better contextual translation', 'Speaker identification', 'Improved accent recognition', 'Noise reduction', 'Offline translation', 'Mobile app', 'Browser extension', 'Meeting summaries', 'AI action items'].map((scope, i) => (
              <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-colors cursor-default">
                {scope}
              </span>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
