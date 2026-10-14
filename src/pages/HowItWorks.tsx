import { Link } from 'react-router-dom';
import { ArrowLeft, Mic, Brain, Globe2, Ear, Sparkles, Users, Video, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
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
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Pipeline (Sub-40ms Latency)
            </span>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            Architecture & Visual Pipeline
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-5 tracking-tight text-white font-display">
            How Lingua Meet AI Works
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A real-time neural pipeline converting natural speech into cross-border understanding in milliseconds across Hindi, English, Tamil, Urdu & Japanese.
          </p>
        </header>

        {/* Dual Visual Showcase: Team Collaboration (cartoon.jpg) & AI Meeting Interface (page.png) */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Team Meeting Planning Cartoon (cartoon.jpg) */}
            <div className="group rounded-3xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-2xl hover:border-blue-500/50 transition-all duration-500 flex flex-col justify-between">
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                    <Users size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Hybrid Team Collaboration</h2>
                    <p className="text-xs text-slate-400">In-person & distributed teams around one table</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                  Global Meeting
                </span>
              </div>

              <div className="relative overflow-hidden bg-white/5 flex items-center justify-center p-4">
                <img 
                  src="/cartoon.jpg" 
                  alt="Team Planning Meeting Cartoon Illustration" 
                  className="w-full h-auto max-h-[340px] object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700 shadow-xl" 
                />
              </div>

              <div className="p-6 bg-slate-950/60 border-t border-white/10">
                <p className="text-sm text-slate-300 leading-relaxed">
                  Colleagues speaking different native languages converse naturally. Lingua Meet AI ingests multi-stream microphone audio, isolating distinct speakers and eliminating background ambient noise.
                </p>
              </div>
            </div>

            {/* Card 2: AI Meeting Screen Interface (page.png) */}
            <div className="group rounded-3xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-2xl hover:border-indigo-500/50 transition-all duration-500 flex flex-col justify-between">
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                    <Video size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Virtual AI Meeting Room</h2>
                    <p className="text-xs text-slate-400">Real-time live dubbed video calls & captions</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  Live Dubbing 38ms
                </span>
              </div>

              <div className="relative overflow-hidden bg-white/5 flex items-center justify-center p-4">
                <img 
                  src="/page.png" 
                  alt="Virtual AI Laptop Video Conference Interface" 
                  className="w-full h-auto max-h-[340px] object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700 shadow-xl" 
                />
              </div>

              <div className="p-6 bg-slate-950/60 border-t border-white/10">
                <p className="text-sm text-slate-300 leading-relaxed">
                  Participants receive instantaneous translated speech and bi-directional subtitles on their screen, with support for Hindi (हिंदी), English, Tamil (தமிழ்), Urdu (اردو), and Japanese (日本語).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Step Neural Pipeline */}
        <div className="max-w-4xl mx-auto space-y-8 relative mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The 4-Stage Real-Time Pipeline</h2>
            <p className="text-sm text-slate-400 mt-2">End-to-end processing with zero perceivable audio lag</p>
          </div>

          {[
            { 
              icon: Mic, 
              title: 'Step 1: Audio Capture & Neural Noise Isolation', 
              desc: 'As you speak, our WebRTC infrastructure captures high-fidelity 48kHz audio. Acoustic echo cancellation (AEC) and AI neural suppression isolate your distinct vocal signature in under 12ms.',
              badge: 'Stage 1 • Audio In'
            },
            { 
              icon: Brain, 
              title: 'Step 2: Low-Latency Speech-to-Text (ASR)', 
              desc: 'Streaming ASR converts live phonetic phonemes into text tokens with sub-word confidence scoring, calibrated for regional Indian, Japanese, and international English dialects.',
              badge: 'Stage 2 • Transcription'
            },
            { 
              icon: Globe2, 
              title: 'Step 3: Contextual Neural Machine Translation', 
              desc: 'Our specialized NMT models translate semantic intent rather than literal words, preserving formal/informal honorifics and technical terminology across Hindi, English, Tamil, Urdu & Japanese.',
              badge: 'Stage 3 • NMT Processing'
            },
            { 
              icon: Ear, 
              title: 'Step 4: Voice Synthesis (TTS) & Bi-Directional Captions', 
              desc: 'Synthesizes translated speech matching the original speaker’s vocal cadence and tone, streaming real-time dubbed audio and interactive captions directly to participants’ headsets.',
              badge: 'Stage 4 • Multi-modal Out'
            }
          ].map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 items-start relative z-10 group bg-slate-900/60 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-md transition-all">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10 group-hover:scale-110 group-hover:bg-blue-600/20 transition-all">
                <step.icon className="text-blue-400" size={28} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{step.title}</h3>
                  <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 hidden sm:inline-block">
                    {step.badge}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-950 border border-blue-500/30 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 font-display">
              Try It Live in Your Browser
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6 text-sm">
              Launch a test call or join a multilingual meeting room now with zero installations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/dashboard?newMeeting=true"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30"
              >
                Start Instant Meeting
              </Link>
              <Link
                to="/meeting/demo"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-all border border-white/15"
              >
                Join Demo Room
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
