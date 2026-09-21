import { useState } from 'react';
import { mockTranslations } from '../../mockData/messages';
import { ArrowLeftRight, Mic } from 'lucide-react';

export default function TranslationPanel() {
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Hindi');
  const [mode, setMode] = useState<'Text' | 'Voice' | 'Dual'>('Dual');

  return (
    <div className="flex flex-col h-full">
      {/* Header Controls */}
      <div className="p-4 border-b border-white/10 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="font-medium text-emerald-400">Live</span>
          </div>
          <div className="flex bg-black/40 rounded-lg p-1">
            <button onClick={() => setMode('Text')} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${mode === 'Text' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'}`}>Text</button>
            <button onClick={() => setMode('Voice')} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${mode === 'Voice' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'}`}>Voice</button>
            <button onClick={() => setMode('Dual')} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${mode === 'Dual' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'}`}>Dual</button>
          </div>
        </div>

        <div className="flex items-center justify-between bg-black/20 p-2 rounded-xl border border-white/5">
          <div className="flex-1 text-center font-medium">{sourceLang}</div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-primary-400" onClick={() => { setSourceLang(targetLang); setTargetLang(sourceLang); }}>
            <ArrowLeftRight size={16} />
          </button>
          <div className="flex-1 text-center font-medium">{targetLang}</div>
        </div>
      </div>

      {/* Translations List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockTranslations.map(msg => (
          <div key={msg.id} className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-primary-400">{msg.speaker}</span>
              <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
            </div>
            
            {(mode === 'Text' || mode === 'Dual') && (
              <div className="space-y-2">
                <p className="text-sm text-gray-300 border-l-2 border-gray-600 pl-2">{msg.originalText}</p>
                <p className="text-[15px] font-medium text-white">{msg.translatedText}</p>
              </div>
            )}
            
            {(mode === 'Voice' || mode === 'Dual') && (
              <div className="mt-3 flex items-center gap-2 bg-black/40 rounded-lg p-2 border border-white/5">
                <button className="w-6 h-6 rounded-full bg-accent-600 flex items-center justify-center text-white shrink-0">
                  <Mic size={12} />
                </button>
                {/* Simulated waveform */}
                <div className="flex-1 flex items-center gap-[2px] h-4">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-1 bg-accent-400 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
                <span className="text-[10px] text-accent-400 font-medium">Ready</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
