import { Link } from 'react-router-dom';
import { ArrowLeft, Mic, Brain, Globe2, Ear } from 'lucide-react';

export default function HowItWorks() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">How Lingua Meet AI Works</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">A seamless pipeline turning spoken language into global understanding in milliseconds.</p>
        </header>

        <div className="max-w-5xl mx-auto mb-20 rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/10 border border-white/10 hover:border-primary-500/50 transition-colors duration-500">
          <img src="/image1.jpg" alt="Team Planning Meeting" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
        </div>

        <div className="max-w-4xl mx-auto space-y-12 relative">
          <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-primary-900/30 hidden md:block"></div>
          
          {[
            { icon: Mic, title: 'Step 1: Audio Capture', desc: 'As you speak, our WebRTC infrastructure captures high-fidelity audio, immediately applying AI noise suppression to isolate your voice.' },
            { icon: Brain, title: 'Step 2: Speech-to-Text (ASR)', desc: 'The audio stream is transcribed into text in real-time. Our models are trained to recognize diverse accents and dialects.' },
            { icon: Globe2, title: 'Step 3: Neural Translation', desc: 'The transcribed text is passed through our contextual Neural Machine Translation (NMT) engine, translating the meaning, not just words.' },
            { icon: Ear, title: 'Step 4: Delivery (Captions & Voice)', desc: 'The translated result is instantly displayed as live captions on the recipient\'s screen, and optionally synthesized into a natural-sounding voice.' }
          ].map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 items-start relative z-10 group">
              <div className="w-20 h-20 rounded-2xl bg-surface border border-primary-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/10 group-hover:scale-110 transition-transform">
                <step.icon className="text-primary-500" size={32} />
              </div>
              <div className="pt-4">
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
