import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, MessageSquare, Globe, Users, Captions, PhoneOff, MonitorUp, Hand, Maximize, Minimize } from 'lucide-react';
import TranslationPanel from '../components/meeting/TranslationPanel';
import ChatPanel from '../components/meeting/ChatPanel';
import ParticipantsPanel from '../components/meeting/ParticipantsPanel';
import LiveCaptions from '../components/meeting/LiveCaptions';
import VideoComponent from '../components/meeting/VideoComponent';
import { mockParticipants } from '../mockData/participants';
import { useMedia } from '../hooks/useMedia';
import { useTimer } from '../hooks/useTimer';

export default function MeetingRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [captionsOn, setCaptionsOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [inLobby, setInLobby] = useState(true);
  const [activePanel, setActivePanel] = useState<'chat' | 'participants' | 'translate' | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const {
    stream,
    displayStream,
    micEnabled,
    camEnabled,
    isScreenSharing,
    error,
    requestPermissions,
    toggleMic,
    toggleCam,
    startScreenShare,
    stopScreenShare,
    stopAllMedia
  } = useMedia();

  const { formattedTime, start: startTimer, stop: stopTimer } = useTimer();

  // Try to request permissions when mounting Lobby
  useEffect(() => {
    if (inLobby) {
      requestPermissions();
    }
  }, [inLobby, requestPermissions]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePanel = (panel: 'chat' | 'participants' | 'translate') => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const handleJoin = () => {
    setInLobby(false);
    startTimer();
  };

  const handleLeave = () => {
    stopTimer();
    stopAllMedia();
    navigate(`/meeting/${id || 'demo-room'}/summary`);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (inLobby) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans">
        <header className="h-20 flex items-center px-8 border-b border-white/10">
           <div className="flex items-center gap-2">
             <img src="/logo.jpg" alt="Lingua Meeting Logo" className="h-16 w-16 rounded-full object-contain bg-white p-2 shadow-md" />
           </div>
        </header>
        
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">
             {/* Left: Video Preview */}
             <div className="flex flex-col gap-4">
                <div className="aspect-video bg-gray-900 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl flex items-center justify-center">
                   
                   {error ? (
                     <div className="text-red-400 flex flex-col items-center gap-2 p-4 text-center">
                       <VideoOff size={48} className="opacity-50" />
                       <span className="font-medium">{error}</span>
                       <button onClick={requestPermissions} className="mt-2 px-4 py-2 bg-primary-600 rounded-full text-white hover:bg-primary-500 transition">Try Again</button>
                     </div>
                   ) : camEnabled ? (
                     stream ? (
                       <VideoComponent stream={stream} className="w-full h-full object-cover transform -scale-x-100" muted />
                     ) : (
                       <div className="w-full h-full bg-black flex items-center justify-center">
                         <span className="text-gray-500 font-medium">Camera Active</span>
                       </div>
                     )
                   ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center text-4xl font-bold text-white shadow-xl mb-4">
                          AR
                        </div>
                        <div className="text-2xl text-white font-medium">Amisha Rana</div>
                     </div>
                   )}
                   
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                     <button 
                       onClick={toggleMic}
                       className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${micEnabled ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500 hover:bg-red-600'}`}
                     >
                       {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                     </button>
                     <button 
                       onClick={toggleCam}
                       className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${camEnabled ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500 hover:bg-red-600'}`}
                     >
                       {camEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                     </button>
                   </div>
                </div>
                
                <div className="flex items-center justify-center gap-4 text-sm font-medium">
                  <div className="text-gray-400">Background:</div>
                  <button className="px-3 py-1 bg-white/10 rounded-full border border-primary-500/50 text-white">Default</button>
                  <button className="px-3 py-1 hover:bg-white/10 rounded-full text-gray-400">Blur</button>
                  <button className="px-3 py-1 hover:bg-white/10 rounded-full text-gray-400">Dark</button>
                </div>
             </div>
             
             {/* Right: Meeting Info & Join */}
             <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">Ready to join?</h1>
                <p className="text-gray-400 text-lg mb-8">Meeting: <span className="font-mono text-white">{id || 'demo-room'}</span></p>
                
                <div className="space-y-4 w-full max-w-sm">
                  <button 
                    onClick={handleJoin}
                    className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary-600/30"
                  >
                    Join Now
                  </button>
                  <Link 
                    to="/dashboard"
                    className="w-full py-4 flex items-center justify-center rounded-xl font-medium text-gray-300 hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  >
                    Go Back
                  </Link>
                </div>
                
                <div className="mt-8 p-4 bg-primary-900/20 border border-primary-500/20 rounded-xl flex items-start gap-3 w-full max-w-sm">
                  <Globe className="text-primary-500 shrink-0 mt-0.5" size={20} />
                  <div className="text-sm">
                    <div className="font-bold text-primary-400 mb-1">AI Translation Ready</div>
                    <div className="text-gray-400">Your meeting is configured for real-time translation (English ↔ Hindi).</div>
                  </div>
                </div>
             </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-screen w-full bg-[#09090b] text-white flex flex-col overflow-hidden font-sans">
      {/* Top Bar */}
      <header className="h-16 flex items-center justify-between px-4 bg-black/40 border-b border-white/10 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Lingua Meeting Logo" className="h-14 w-14 rounded-full object-contain bg-white p-1.5 shadow-md" />
          </div>
          <div className="w-px h-4 bg-white/20 mx-2"></div>
          <div className="text-sm font-medium">{id === 'new' ? 'New Meeting' : 'Meeting Room'}</div>
          <div className="bg-white/10 px-2 py-0.5 rounded text-xs ml-2 font-mono">{formattedTime}</div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleFullscreen} className="text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-white/10">
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
          <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
            Excellent connection
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Video Grid Area */}
        <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto relative">
          
          {isScreenSharing && (
            <div className="w-full h-2/3 bg-gray-900 rounded-2xl border border-primary-500/50 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl group">
               {displayStream ? (
                 <>
                   <VideoComponent stream={displayStream} className="w-full h-full object-contain bg-black" muted />
                   <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-primary-600/90 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 backdrop-blur">
                      <MonitorUp size={16} /> You are presenting
                   </div>
                   <button onClick={stopScreenShare} className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full font-medium transition-colors z-10 opacity-0 group-hover:opacity-100">
                     Stop Sharing
                   </button>
                 </>
               ) : (
                 <div className="flex flex-col items-center justify-center text-center max-w-md">
                   <div className="w-20 h-20 bg-primary-600/20 rounded-full flex items-center justify-center mb-6 border border-primary-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                      <MonitorUp size={40} className="text-primary-500" />
                   </div>
                   <h2 className="text-3xl font-bold text-white mb-3">You're presenting to everyone</h2>
                   <p className="text-gray-400 mb-8 text-lg">Your screen is currently visible to all participants in this meeting.</p>
                   <button onClick={stopScreenShare} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors shadow-lg shadow-red-600/20">
                     Stop Sharing
                   </button>
                 </div>
               )}
            </div>
          )}

          {/* Simulated Video Grid */}
          <div className={`grid gap-4 w-full ${isScreenSharing ? 'grid-cols-4 h-1/3' : 'grid-cols-2 lg:grid-cols-3 h-full'}`}>
            {/* Self View */}
            <div className={`relative rounded-2xl overflow-hidden bg-gray-900 shadow-xl group border-2 ${activePanel === null ? 'border-primary-500 glow' : 'border-transparent'}`}>
              {camEnabled ? (
                 stream ? (
                   <VideoComponent stream={stream} className="w-full h-full object-cover transform -scale-x-100" muted />
                 ) : (
                   <div className="w-full h-full bg-black flex items-center justify-center relative">
                      <span className="text-gray-500 font-medium">Camera Active</span>
                   </div>
                 )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center text-4xl font-bold text-white shadow-xl mb-3">
                    AR
                  </div>
                  <div className="text-xl text-white font-medium">Amisha Rana</div>
                </div>
              )}
              
              {handRaised && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-black p-2 rounded-full shadow-lg animate-bounce">
                  <Hand size={20} />
                </div>
              )}

              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                {!micEnabled && <MicOff size={14} className="text-red-400" />}
                {micEnabled && (
                  <div className="flex gap-[2px] h-3 items-center">
                     <div className="w-1 bg-green-400 h-full animate-pulse"></div>
                     <div className="w-1 bg-green-400 h-2/3 animate-pulse delay-75"></div>
                     <div className="w-1 bg-green-400 h-full animate-pulse delay-150"></div>
                  </div>
                )}
                Amisha Rana (You)
              </div>
            </div>

            {/* Other Participants */}
            {mockParticipants.slice(1).map(p => (
              <div key={p.id} className="relative rounded-2xl overflow-hidden bg-gray-900 group border-2 border-transparent">
                {p.cameraOn ? (
                  <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center relative">
                    <span className="text-gray-500 font-medium absolute top-4 right-4 text-xs bg-black/40 px-2 py-1 rounded">Mock Video</span>
                    {p.avatar ? (
                      <img src={p.avatar} alt={p.name} className="w-24 h-24 rounded-full object-cover mb-3 shadow-xl opacity-50" />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-accent-600/50 flex items-center justify-center text-4xl font-bold text-white/50 mb-3 shadow-xl">
                        {p.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="text-xl text-white/50 font-medium">{p.name}</div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800">
                    {p.avatar ? (
                      <img src={p.avatar} alt={p.name} className="w-24 h-24 rounded-full object-cover mb-3 shadow-xl" />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-accent-600 flex items-center justify-center text-4xl font-bold text-white shadow-xl mb-3">
                        {p.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="text-xl text-white font-medium">{p.name}</div>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                  {!p.micOn ? <MicOff size={14} className="text-red-400" /> : <Mic size={14} className="text-green-400" />}
                  {p.name}
                </div>
              </div>
            ))}
          </div>

          {/* Live Captions Overlay */}
          {captionsOn && <LiveCaptions />}
        </div>

        {/* Side Panel (Right) */}
        {activePanel && (
          <aside className="w-80 border-l border-white/10 bg-[#09090b]/95 backdrop-blur-xl flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] transition-all">
            <div className="h-14 border-b border-white/10 flex items-center px-4 font-medium text-lg">
              {activePanel === 'chat' && 'In-meeting Messages'}
              {activePanel === 'participants' && 'People'}
              {activePanel === 'translate' && 'AI Translation'}
            </div>
            <div className="flex-1 overflow-hidden">
              {activePanel === 'chat' && <ChatPanel />}
              {activePanel === 'participants' && <ParticipantsPanel />}
              {activePanel === 'translate' && <TranslationPanel />}
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Control Bar */}
      <footer className="h-20 bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center justify-center gap-3 px-6 z-30">
        <button 
          onClick={toggleMic}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${micEnabled ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500 hover:bg-red-600'}`}
          title={micEnabled ? "Mute" : "Unmute"}
        >
          {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
        </button>
        <button 
          onClick={toggleCam}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${camEnabled ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500 hover:bg-red-600'}`}
          title={camEnabled ? "Stop Video" : "Start Video"}
        >
          {camEnabled ? <Video size={20} /> : <VideoOff size={20} />}
        </button>
        
        <div className="w-px h-8 bg-white/20 mx-2"></div>

        {!isScreenSharing ? (
          <button 
            onClick={startScreenShare}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-white/10 hover:bg-white/20"
            title="Share Screen"
          >
            <MonitorUp size={20} />
          </button>
        ) : (
          <button 
            onClick={stopScreenShare}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-primary-600 hover:bg-primary-500"
            title="Stop Sharing"
          >
            <MonitorUp size={20} />
          </button>
        )}
        
        <button 
          onClick={() => setHandRaised(!handRaised)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${handRaised ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' : 'bg-white/10 hover:bg-white/20'}`}
          title={handRaised ? "Lower Hand" : "Raise Hand"}
        >
          <Hand size={20} />
        </button>

        <button 
          onClick={() => togglePanel('chat')}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activePanel === 'chat' ? 'bg-primary-600 text-white' : 'bg-white/10 hover:bg-white/20 text-gray-300'}`}
          title="Chat"
        >
          <MessageSquare size={20} />
        </button>
        <button 
          onClick={() => togglePanel('participants')}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activePanel === 'participants' ? 'bg-primary-600 text-white' : 'bg-white/10 hover:bg-white/20 text-gray-300'}`}
          title="Participants"
        >
          <Users size={20} />
        </button>
        
        <button 
          onClick={() => togglePanel('translate')}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg border ${activePanel === 'translate' ? 'bg-accent-600 border-accent-500 shadow-accent-600/40 text-white' : 'bg-white/5 border-accent-500/30 text-accent-400 hover:bg-accent-600/20'}`}
          title="AI Translation"
        >
          <Globe size={24} />
        </button>
        
        <button 
          onClick={() => setCaptionsOn(!captionsOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${captionsOn ? 'bg-primary-600/20 text-primary-400 border border-primary-500/50' : 'bg-white/10 hover:bg-white/20 text-gray-300'}`}
          title={captionsOn ? "Turn off captions" : "Turn on captions"}
        >
          <Captions size={20} />
        </button>

        <div className="w-px h-8 bg-white/20 mx-2"></div>

        <button 
          onClick={handleLeave}
          className="h-10 px-6 rounded-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition-all font-medium ml-2 shadow-lg shadow-red-600/20"
        >
          <PhoneOff size={18} />
          Leave
        </button>
      </footer>
    </div>
  );
}
