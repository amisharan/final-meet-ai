import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Pricing() {
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
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-accent-500/10 text-accent-400 rounded-full text-sm font-medium mb-4 border border-accent-500/20">Demo Pricing</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Simple, transparent pricing</h1>
          <p className="text-xl text-gray-400">Choose the perfect plan for your multilingual communication needs.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-gray-400 text-sm mb-6">Perfect for trying out the platform.</p>
            <div className="text-4xl font-bold mb-8">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              {['Limited meeting time (45 mins)', 'Basic text translation', 'Basic transcripts', 'Up to 5 participants'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle2 size={18} className="text-primary-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/signup" className="w-full py-3 rounded-xl border border-primary-500 text-primary-500 font-medium hover:bg-primary-500/10 transition-colors text-center">Get Started</Link>
          </div>
          
          {/* Pro Tier */}
          <div className="bg-primary-900/20 border-2 border-primary-500 rounded-2xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-primary-500/10 glow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">RECOMMENDED</div>
            <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
            <p className="text-primary-200 text-sm mb-6">For professionals and small teams.</p>
            <div className="text-4xl font-bold mb-8 text-white">$29<span className="text-lg text-primary-300 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              {['Unlimited meeting time', 'Advanced voice & text translation', 'Analytics dashboard', 'Up to 50 participants', 'Priority processing'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-primary-100">
                  <CheckCircle2 size={18} className="text-primary-400 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/signup" className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors text-center shadow-lg shadow-primary-600/30">Upgrade to Pro</Link>
          </div>
          
          {/* Enterprise Tier */}
          <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <p className="text-gray-400 text-sm mb-6">For large organizations requiring control.</p>
            <div className="text-4xl font-bold mb-8">Custom</div>
            <ul className="space-y-4 mb-8 flex-1">
              {['Team management', 'Advanced security controls', 'API access & Webhooks', 'Custom integrations', 'Dedicated support manager'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle2 size={18} className="text-primary-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="w-full py-3 rounded-xl border border-border hover:bg-white/5 text-white font-medium transition-colors text-center">Contact Sales</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
