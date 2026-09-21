import { useState } from 'react';

export default function LiveCaptions() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-40 pointer-events-none text-center">
      <div className="inline-block bg-black/70 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto">
        <div className="text-xs text-primary-400 font-semibold mb-1 text-left">Amisha Rana (English)</div>
        <div className="text-lg md:text-xl font-medium text-white leading-relaxed">
          Welcome everyone. Today we are going to discuss our project and the AI translation system.
        </div>
      </div>
    </div>
  );
}
