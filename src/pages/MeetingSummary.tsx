import { Link, useNavigate } from 'react-router-dom';
import { mockTranscripts } from '../mockData/transcripts';
import { ArrowLeft, Clock, Users, Globe2, FileText, CheckSquare, Download } from 'lucide-react';

export default function MeetingSummary() {
  const navigate = useNavigate();

  const downloadTranscript = () => {
    const transcriptText = mockTranscripts[0].messages.map(msg => 
      `[${msg.time}] ${msg.speaker}:\nOriginal: ${msg.original}\nTranslated: ${msg.translated}\n`
    ).join('\n');
    
    const blob = new Blob([transcriptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Meeting_Transcript_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <nav className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="font-bold text-lg">Meeting Summary</div>
          <button onClick={downloadTranscript} className="flex items-center gap-2 text-primary-400 hover:text-primary-300">
            <Download size={18} />
            Export
          </button>
        </div>
      </nav>
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">MCA Project Discussion</h1>
        <p className="text-gray-400 mb-8">Completed • Today, 10:00 AM</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Duration', value: '45 min', icon: Clock },
            { label: 'Participants', value: '4', icon: Users },
            { label: 'Languages', value: 'English, Hindi', icon: Globe2 },
            { label: 'Translation Time', value: '32 min', icon: Globe2 }
          ].map((stat, i) => (
            <div key={i} className="bg-surface border border-border p-4 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-400">{stat.label}</div>
                <div className="font-bold">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Transcript */}
            <section className="bg-surface border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <FileText className="text-primary-500" />
                <h2 className="text-xl font-bold">Transcript</h2>
              </div>
              <div className="space-y-6">
                {mockTranscripts[0].messages.map((msg, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-900/50 flex items-center justify-center font-bold text-sm shrink-0">
                      {msg.speaker.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{msg.speaker}</span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{msg.original}</p>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10 border-l-2 border-l-accent-500">
                        <p className="text-white text-sm font-medium">{msg.translated}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Action Items */}
            <section className="bg-surface border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <CheckSquare className="text-accent-500" />
                <h2 className="text-xl font-bold">AI Action Items</h2>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-3"><input type="checkbox" className="mt-1 rounded bg-black/40 border-gray-600" /> Share architecture doc</li>
                <li className="flex gap-3"><input type="checkbox" className="mt-1 rounded bg-black/40 border-gray-600" /> Schedule follow-up sync</li>
                <li className="flex gap-3"><input type="checkbox" className="mt-1 rounded bg-black/40 border-gray-600" /> Review translation latency metrics</li>
              </ul>
            </section>

            {/* Translation Activity */}
            <section className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Language Distribution</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>English</span><span>70%</span></div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[70%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span>Hindi</span><span>30%</span></div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-[30%]"></div></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
