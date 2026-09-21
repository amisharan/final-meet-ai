import { useState } from 'react';
import { mockParticipants } from '../../mockData/participants';
import { Mic, MicOff, Video, VideoOff, MoreVertical } from 'lucide-react';

export default function ParticipantsPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/10">
        <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
          Invite People
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {mockParticipants.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-900 text-primary-300 flex items-center justify-center font-bold text-xs">
                {p.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{p.name} {p.id === '1' && '(You)'}</div>
                <div className="text-[10px] text-gray-500">{p.role}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              {p.micOn ? <Mic size={14} className="text-green-400" /> : <MicOff size={14} className="text-red-400" />}
              {p.cameraOn ? <Video size={14} /> : <VideoOff size={14} />}
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-md transition-all">
                <MoreVertical size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
