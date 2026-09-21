import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <nav className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </nav>
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-20 w-full flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Get in touch</h1>
          <p className="text-xl text-gray-400 mb-12">Whether you have questions about our enterprise plans, need support, or want to explore our API, our team is ready to help.</p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center border border-border"><Mail className="text-primary-500" /></div>
              <div>
                <div className="font-medium">Email us</div>
                <div className="text-primary-400">support@linguameet.ai</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center border border-border"><Phone className="text-primary-500" /></div>
              <div>
                <div className="font-medium">Call us</div>
                <div className="text-primary-400">+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center border border-border"><MapPin className="text-primary-500" /></div>
              <div>
                <div className="font-medium">Visit us</div>
                <div className="text-primary-400">123 AI Boulevard, Tech District</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-surface border border-border rounded-2xl p-8">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent simulated!'); }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-primary-600/20">Send Message</button>
          </form>
        </div>
      </main>
    </div>
  );
}
