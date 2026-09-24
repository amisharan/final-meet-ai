import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { mockAnalytics } from '../mockData/analytics';
import { mockMeetings } from '../mockData/meetings';
import { mockLanguages } from '../mockData/languages';
import { 
  LayoutDashboard, Video, Globe2, BarChart2, Users, 
  Settings, CreditCard, Plug, LogOut, Plus, Search, 
  Play, Calendar, Clock, X, Check, CheckCircle2, FileText, ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNewMeetingModalOpen, setIsNewMeetingModalOpen] = useState(false);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('newMeeting') === 'true') {
      setIsNewMeetingModalOpen(true);
      navigate('/dashboard', { replace: true });
    }
  }, [location, navigate]);
  
  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Meetings', path: '/dashboard/meetings', icon: Video },
    { name: 'Transcripts', path: '/dashboard/transcripts', icon: FileText },
    { name: 'Languages', path: '/dashboard/languages', icon: Globe2 },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Team', path: '/dashboard/team', icon: Users },
    { name: 'Integrations', path: '/dashboard/integrations', icon: Plug },
    { name: 'Billing', path: '/dashboard/billing', icon: CreditCard },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewMeetingModalOpen(false);
    navigate('/meeting/new');
  };

  return (
    <div className="flex h-screen bg-background text-foreground font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col relative z-10 shadow-xl">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <Globe2 className="text-primary-500" size={24} />
            <span className="font-bold text-xl tracking-tight">
              <span className="text-sky-400">Lingua</span>
              <span className="text-yellow-400"> Meet</span>
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'bg-primary-500/10 text-primary-500 font-medium' : 'text-gray-400 hover:bg-surface-hover hover:text-white'}`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-border mt-auto">
           <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white text-xs">AR</div>
              <div>
                 <div className="text-sm font-medium text-white">Amisha Rana</div>
                 <div className="text-xs text-gray-400">Pro Plan</div>
              </div>
           </div>
           <Link to="/login" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
             <LogOut size={18} />
             Log out
           </Link>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#020617]">
        {/* Header */}
        <header className="h-20 border-b border-border bg-surface/80 backdrop-blur flex items-center justify-between px-8 z-10 sticky top-0">
          <div>
            <h1 className="text-2xl font-bold">Good morning, Amisha 👋</h1>
            <p className="text-sm text-gray-400 mt-0.5">Your multilingual workspace is ready.</p>
          </div>
          <button 
            onClick={() => setIsNewMeetingModalOpen(true)}
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-xl text-white font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary-600/20"
          >
            <Plus size={18} />
            New Meeting
          </button>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8 relative">
          <Routes>
            {/* Overview */}
            <Route path="/" element={
              <div className="space-y-8 max-w-6xl mx-auto">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Meetings', value: mockAnalytics.totalMeetings, icon: Video, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Meeting Hours', value: `${mockAnalytics.meetingHours}h`, icon: Clock, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'Translation Minutes', value: mockAnalytics.translationMinutes, icon: Globe2, color: 'text-accent-500', bg: 'bg-accent-500/10' },
                    { label: 'Languages Used', value: mockAnalytics.languagesUsed, icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10' }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-border bg-surface shadow-lg hover:border-gray-600 transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                           <stat.icon size={20} />
                         </div>
                         <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                      </div>
                      <div className="text-3xl font-bold">{stat.value}</div>
                    </div>
                  ))}
                </div>
                
                {/* Recent Meetings */}
                <div>
                   <div className="flex items-center justify-between mb-4">
                     <h2 className="text-xl font-bold">Recent Meetings</h2>
                     <Link to="/dashboard/meetings" className="text-sm text-primary-400 hover:text-primary-300">View all</Link>
                   </div>
                   <div className="grid md:grid-cols-2 gap-4">
                     {mockMeetings.slice(0,2).map(m => (
                       <div key={m.id} className="p-5 rounded-2xl border border-border bg-surface hover:bg-white/5 transition-colors flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400">
                               <Calendar size={20} />
                            </div>
                            <div>
                               <div className="font-bold mb-0.5 group-hover:text-primary-400 transition-colors">{m.title}</div>
                               <div className="text-xs text-gray-400 flex items-center gap-2">
                                 {m.date} • {m.time} • {m.duration} • <span className="flex items-center gap-1"><Users size={12}/>{m.participants}</span>
                               </div>
                            </div>
                          </div>
                          <Link to="/meeting/demo" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">Details</Link>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            } />
            
            {/* Meetings List */}
            <Route path="/meetings" element={
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">All Meetings</h2>
                <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-border flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input type="text" placeholder="Search meetings..." className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50" />
                    </div>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-sm text-gray-400 bg-black/20">
                        <th className="p-4 font-medium">Meeting Title</th>
                        <th className="p-4 font-medium">Date & Time</th>
                        <th className="p-4 font-medium">Duration</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockMeetings.map((m, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 font-medium">{m.title}</td>
                          <td className="p-4 text-gray-400 text-sm">{m.date}, {m.time}</td>
                          <td className="p-4 text-gray-400 text-sm">{m.duration}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${m.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : m.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                              {m.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                             {m.status === 'Live' ? (
                               <Link to="/meeting/demo" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">Join Now</Link>
                             ) : m.status === 'Completed' ? (
                               <Link to={`/meeting/${m.id}/summary`} className="text-sm text-primary-400 hover:text-primary-300 font-medium">Transcript</Link>
                             ) : (
                               <a href="#" className="text-sm text-gray-400 hover:text-white font-medium">Edit</a>
                             )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            } />
            
            {/* Languages List */}
            <Route path="/languages" element={
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Supported Languages</h2>
                  <button className="px-4 py-2 border border-border hover:bg-white/5 rounded-xl text-sm font-medium transition-colors">Request Language</button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {mockLanguages.map(lang => (
                    <div key={lang.code} className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="text-2xl">{lang.flag}</div>
                         <div>
                           <div className="font-bold">{lang.name}</div>
                           <div className="text-xs text-gray-400">{lang.translationMode}</div>
                         </div>
                       </div>
                       <div className={`px-2 py-1 rounded text-xs font-medium ${lang.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                         {lang.status}
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            } />

            {/* Transcripts */}
            <Route path="/transcripts" element={
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Transcripts & History</h2>
                <div className="bg-surface border border-border rounded-2xl overflow-hidden p-6 text-center">
                   <FileText className="mx-auto mb-4 text-gray-400 opacity-50" size={48} />
                   <h3 className="text-xl font-bold mb-2">Centralized Transcripts</h3>
                   <p className="text-gray-400 max-w-md mx-auto mb-6">All your past meeting transcripts are stored here securely. View, export, and search through all your multilingual conversations.</p>
                   <Link to="/dashboard/meetings" className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors">Browse Past Meetings</Link>
                </div>
              </div>
            } />
            
            {/* Analytics */}
            <Route path="/analytics" element={
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                   <div className="bg-surface border border-border rounded-2xl p-6">
                     <h3 className="font-bold mb-4 text-gray-300">Meeting Activity (Last 30 Days)</h3>
                     <div className="h-64 flex items-end justify-between gap-2">
                        {[40, 70, 45, 90, 65, 85, 30].map((h, i) => (
                           <div key={i} className="w-full bg-primary-600/20 hover:bg-primary-500 rounded-t-lg transition-colors relative group" style={{ height: `${h}%` }}>
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">{h}</div>
                           </div>
                        ))}
                     </div>
                     <div className="flex justify-between text-xs text-gray-500 mt-2">
                       <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                     </div>
                   </div>
                   <div className="bg-surface border border-border rounded-2xl p-6">
                     <h3 className="font-bold mb-4 text-gray-300">Translation Usage by Language</h3>
                     <div className="space-y-4 mt-8">
                        <div>
                          <div className="flex justify-between text-sm mb-1"><span>Hindi</span><span>45%</span></div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-accent-500 w-[45%]"></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1"><span>French</span><span>30%</span></div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[30%]"></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1"><span>Spanish</span><span>25%</span></div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-[25%]"></div></div>
                        </div>
                     </div>
                   </div>
                </div>
              </div>
            } />
            
            {/* Team */}
            <Route path="/team" element={
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Team Workspace</h2>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors">Invite Member</button>
                </div>
                <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-black/20 text-sm text-gray-400 border-b border-white/5">
                        <th className="p-4 font-medium">Name</th>
                        <th className="p-4 font-medium">Role</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Amisha Rana', email: 'amisha@example.com', role: 'Owner', status: 'Active' },
                        { name: 'Rahul', email: 'rahul@example.com', role: 'Admin', status: 'Active' },
                        { name: 'Priya', email: 'priya@example.com', role: 'Member', status: 'Away' }
                      ].map((u, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                          <td className="p-4">
                            <div className="font-medium text-white">{u.name}</div>
                            <div className="text-xs text-gray-500">{u.email}</div>
                          </td>
                          <td className="p-4 text-sm text-gray-300">{u.role}</td>
                          <td className="p-4">
                             <span className={`px-2 py-1 rounded text-xs ${u.status === 'Active' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>{u.status}</span>
                          </td>
                          <td className="p-4 text-right text-sm text-gray-400 hover:text-white cursor-pointer">Edit</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            } />
            
            {/* Integrations */}
            <Route path="/integrations" element={
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Integrations</h2>
                <div className="grid md:grid-cols-3 gap-4">
                   {['Google Meet', 'Zoom', 'Microsoft Teams', 'Slack', 'Google Calendar', 'API Access'].map((int, i) => (
                     <div key={i} className="bg-surface border border-border rounded-2xl p-6 flex flex-col items-start">
                        <div className="w-12 h-12 bg-white/5 rounded-xl mb-4 flex items-center justify-center"><Plug size={24} className="text-primary-400"/></div>
                        <h3 className="font-bold text-lg mb-1">{int}</h3>
                        <p className="text-sm text-gray-400 mb-6 flex-1">Connect Lingua Meet AI with {int}.</p>
                        <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">Connect</button>
                     </div>
                   ))}
                </div>
              </div>
            } />
            
            {/* Billing */}
            <Route path="/billing" element={
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Billing & Plans</h2>
                <div className="bg-surface border border-primary-500/50 rounded-2xl p-8 mb-6 flex justify-between items-center relative overflow-hidden">
                   <div className="absolute right-0 top-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
                   <div>
                     <div className="text-sm text-primary-400 font-bold mb-1 uppercase tracking-wide">Current Plan</div>
                     <h3 className="text-3xl font-bold text-white mb-2">Pro</h3>
                     <p className="text-gray-400 text-sm">Next billing date: Nov 1, 2026</p>
                   </div>
                   <div className="text-right">
                     <div className="text-3xl font-bold mb-2">$29<span className="text-lg text-gray-500">/mo</span></div>
                     <button className="px-4 py-2 border border-border hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">Manage Plan</button>
                   </div>
                </div>
              </div>
            } />
            
            {/* Settings */}
            <Route path="/settings" element={
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Preferences</h2>
                <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                  <div className="border-b border-white/5 p-6 flex items-center justify-between">
                     <div>
                       <div className="font-bold text-white">Dark Mode</div>
                       <div className="text-sm text-gray-400">Toggle application appearance</div>
                     </div>
                     <button className="w-12 h-6 bg-primary-600 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></button>
                  </div>
                  <div className="border-b border-white/5 p-6 flex items-center justify-between">
                     <div>
                       <div className="font-bold text-white">Default Source Language</div>
                       <div className="text-sm text-gray-400">Language you speak most often</div>
                     </div>
                     <select className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none"><option>English</option><option>Hindi</option></select>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                     <div>
                       <div className="font-bold text-white">Email Notifications</div>
                       <div className="text-sm text-gray-400">Receive meeting summaries via email</div>
                     </div>
                     <button className="w-12 h-6 bg-gray-600 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></button>
                  </div>
                </div>
              </div>
            } />

          </Routes>
        </div>
      </main>

      {/* New Meeting Modal */}
      {isNewMeetingModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-xl shadow-2xl relative">
            <button 
              onClick={() => setIsNewMeetingModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="p-6 border-b border-white/5">
              <h2 className="text-2xl font-bold">Create New Meeting</h2>
            </div>
            
            <form onSubmit={handleCreateMeeting} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Meeting Name</label>
                <input 
                  type="text" 
                  defaultValue="MCA Project Discussion"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Your Language</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 appearance-none">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Target Translation</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 appearance-none">
                    <option>Hindi</option>
                    <option>English</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Meeting Options</label>
                {[
                  { id: 'opt1', label: 'Enable AI Translation Panel', default: true },
                  { id: 'opt2', label: 'Enable Live Captions', default: true },
                  { id: 'opt3', label: 'Auto-generate Transcript', default: true },
                  { id: 'opt4', label: 'AI Noise Suppression', default: false }
                ].map((opt) => (
                  <div key={opt.id} className="flex items-center">
                    <input type="checkbox" id={opt.id} defaultChecked={opt.default} className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-primary-500 focus:ring-primary-500/50" />
                    <label htmlFor={opt.id} className="ml-3 text-sm text-gray-300">{opt.label}</label>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsNewMeetingModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-gray-400 font-medium hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-primary-600/20 flex items-center gap-2"
                >
                  Create Meeting
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
