import { useState } from 'react';
import { mockChatMessages } from '../../mockData/messages';
import { Send, Paperclip, Smile } from 'lucide-react';

export default function ChatPanel() {
  const [messages, setMessages] = useState(mockChatMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'You',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.senderId === 'me' ? 'items-end' : 'items-start'}`}>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xs font-medium text-gray-300">{msg.senderName}</span>
              <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
            </div>
            <div className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm ${msg.senderId === 'me' ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-white/10 text-white rounded-bl-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-2 bg-black/40 rounded-xl px-3 py-2 border border-white/10">
          <button className="text-gray-400 hover:text-white transition-colors"><Smile size={18} /></button>
          <button className="text-gray-400 hover:text-white transition-colors"><Paperclip size={18} /></button>
          <input 
            type="text" 
            placeholder="Send a message..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className={`transition-colors ${input.trim() ? 'text-primary-500 hover:text-primary-400' : 'text-gray-600'}`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
