import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Users,
  Brain,
  Shield,
  ChevronRight,
  ChevronLeft,
  Play,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Check,
  ArrowRight,
  Video,
  Zap,
  MessageSquare,
  FileText,
  Lock,
  Headphones,
  Languages,
  RefreshCw,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample Live Translation Streams for Marquee (Target: Hindi, English, Tamil, Urdu, Japanese)
const translationStreams = [
  {
    flagFrom: '🇬🇧',
    langFrom: 'English',
    speaker: 'Amisha R.',
    source: 'Let\'s finalize the rollout timeline and verify real-time voice cloning latency.',
    flagTo: '🇮🇳',
    langTo: 'Hindi',
    translated: 'आइए रोलआउट समयसीमा को अंतिम रूप दें और रीयल-टाइम वॉइस क्लोनिंग की पुष्टि करें।',
    latency: '38ms',
  },
  {
    flagFrom: '🇮🇳',
    langFrom: 'Hindi',
    speaker: 'Rahul S.',
    source: 'हमारी टीम अब बिना किसी भाषा रुकावट के स्वाभाविक रूप से बातचीत कर सकती है।',
    flagTo: '🇯🇵',
    langTo: 'Japanese',
    translated: '私たちのチームは言語の壁なしに自然に対話できるようになりました。',
    latency: '42ms',
  },
  {
    flagFrom: '🇮🇳',
    langFrom: 'Tamil',
    speaker: 'Karthik V.',
    source: 'நிகழ்நேர குரல் மொழிபெயர்ப்பு மற்றும் இரட்டை வசனங்கள் மிகச் சிறப்பாக இயங்குகின்றன.',
    flagTo: '🇬🇧',
    langTo: 'English',
    translated: 'The real-time voice translation and dual captions are performing exceptionally well.',
    latency: '39ms',
  },
  {
    flagFrom: '🇵🇰',
    langFrom: 'Urdu',
    speaker: 'Zainab K.',
    source: 'اے آئی صوتی ترجمہ بولنے والے کا اصل لہجہ اور آواز کا سر برقرار رکھتا ہے۔',
    flagTo: '🇮🇳',
    langTo: 'Tamil',
    translated: 'AI குரல் மொழிபெயர்ப்பு பேச்சாளரின் அசல் தொனியையும் குரல் வகையையும் பாதுகாக்கிறது.',
    latency: '41ms',
  },
  {
    flagFrom: '🇯🇵',
    langFrom: 'Japanese',
    speaker: 'Kenji T.',
    source: 'リアルタイムでの字幕生成と文脈理解が素晴らしいです。',
    flagTo: '🇬🇧',
    langTo: 'English',
    translated: 'The real-time subtitle generation and contextual intelligence are outstanding.',
    latency: '44ms',
  },
  {
    flagFrom: '🇬🇧',
    langFrom: 'English',
    speaker: 'David P.',
    source: 'Security review confirmed full SOC-2 compliance with ephemeral voice encryption.',
    flagTo: '🇵🇰',
    langTo: 'Urdu',
    translated: 'سیکیورٹی جائزہ نے مکمل خفیہ کاری اور رازداری کی توثیق کی ہے۔',
    latency: '40ms',
  },
];

// Highlight Badges for second marquee track
const highlightChips = [
  { icon: Zap, label: 'Sub-45ms Neural Dubbing', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  { icon: Headphones, label: 'Zero-Shot Voice Timbre Cloning', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  { icon: Globe, label: '5 Core Languages (Hindi, English, Tamil, Urdu, Japanese)', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { icon: Lock, label: 'Military-Grade AES-256 E2EE', color: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
  { icon: FileText, label: 'Automated Executive Action Minutes', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
  { icon: Brain, label: 'Context-Aware Technical Lexicon', color: 'text-pink-400 bg-pink-400/10 border-pink-400/20' },
  { icon: Shield, label: 'Zero Audio Data Retention Policy', color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' },
  { icon: BarChart3, label: 'Real-time Sentiment & Topic Tracker', color: 'text-teal-400 bg-teal-400/10 border-teal-400/20' },
];

// Interactive Horizontal Highlight Cards (Scroll Left to Right)
const horizontalHighlightCards = [
  {
    id: 1,
    tag: 'VOICE FIDELITY',
    title: 'Neural Voice Cloning & Timbre Match',
    description: 'When you speak in English, teammates in Tokyo or Berlin hear your exact vocal pitch, timbre, and emotional cadence rendered in fluent Japanese or German.',
    accent: 'from-blue-600/30 via-indigo-600/20 to-transparent',
    borderColor: 'group-hover:border-blue-500/50',
    glowColor: 'hover:shadow-[0_20px_45px_rgba(59,130,246,0.3)]',
    stat: '99.8%',
    statLabel: 'Vocal Similarity Score',
    sample: 'Preserves your natural pauses, enthusiasm & accent nuance',
  },
  {
    id: 2,
    tag: 'ULTRA-LOW LATENCY',
    title: 'Sub-45ms Edge Neural Streaming',
    description: 'Proprietary edge inference nodes deployed across 42 global regions guarantee instantaneous speech-to-speech translation without unnatural pauses.',
    accent: 'from-cyan-600/30 via-blue-600/20 to-transparent',
    borderColor: 'group-hover:border-cyan-500/50',
    glowColor: 'hover:shadow-[0_20px_45px_rgba(6,182,212,0.3)]',
    stat: '42ms',
    statLabel: 'Average End-to-End Latency',
    sample: 'Feels as instantaneous as sharing the same conference room',
  },
  {
    id: 3,
    tag: 'DEEP CONTEXT NLP',
    title: 'Industry-Specific Jargon & Slang',
    description: 'Trained on 10M+ hours of technical engineering, medical, legal, and financial meetings. Never suffers from literal, awkward translations.',
    accent: 'from-purple-600/30 via-pink-600/20 to-transparent',
    borderColor: 'group-hover:border-purple-500/50',
    glowColor: 'hover:shadow-[0_20px_45px_rgba(168,85,247,0.3)]',
    stat: '99.4%',
    statLabel: 'Semantic Context Accuracy',
    sample: 'Understands Kubernetes, EBITDA, and local idioms fluently',
  },
  {
    id: 4,
    tag: 'AUTONOMOUS AGENT',
    title: 'Real-Time Meeting Minutes & Action Matrix',
    description: 'Lingua AI transcribes dual streams, extracts commitments, marks action items with designated owners, and emails structured digests the second you leave.',
    accent: 'from-emerald-600/30 via-teal-600/20 to-transparent',
    borderColor: 'group-hover:border-emerald-500/50',
    glowColor: 'hover:shadow-[0_20px_45px_rgba(16,185,129,0.3)]',
    stat: '100%',
    statLabel: 'Hands-Free Note Automation',
    sample: 'Instant exported Markdown, Notion, and Slack summaries',
  },
  {
    id: 5,
    tag: 'ENTERPRISE SECURITY',
    title: 'Zero Data Retention & Ephemeral Memory',
    description: 'Audio streams are processed in volatilized GPU memory and purged immediately. Full SOC-2 Type II, HIPAA, and GDPR compliance ready for global enterprises.',
    accent: 'from-rose-600/30 via-orange-600/20 to-transparent',
    borderColor: 'group-hover:border-rose-500/50',
    glowColor: 'hover:shadow-[0_20px_45px_rgba(244,63,94,0.3)]',
    stat: 'AES-256',
    statLabel: 'End-to-End Encryption',
    sample: 'Your private boardroom conversations stay completely yours',
  },
  {
    id: 6,
    tag: 'STUDIO AUDIO',
    title: 'AI Spatial Noise Cancellation 2.0',
    description: 'Eliminates sirens, keyboard clatter, coffee shop chatter, and room reverb while crystallizing natural human voice harmonics before translation.',
    accent: 'from-amber-600/30 via-yellow-600/20 to-transparent',
    borderColor: 'group-hover:border-amber-500/50',
    glowColor: 'hover:shadow-[0_20px_45px_rgba(245,158,11,0.3)]',
    stat: '-48dB',
    statLabel: 'Background Noise Isolation',
    sample: 'Studio-grade vocal clarity in any bustling remote environment',
  },
];

// Interactive Translation Demo Presets targeting Hindi, English, Tamil, Urdu, Japanese
const interactivePresets = [
  {
    sourceText: 'Welcome everyone! Let\'s review our project roadmap and verify real-time voice cloning latency.',
    sourceLang: 'English',
    sourceFlag: '🇬🇧',
    targetLang: 'Hindi',
    targetFlag: '🇮🇳',
    translatedText: 'सभी का स्वागत है! आइए हमारे प्रोजेक्ट रोडमैप की समीक्षा करें और रीयल-टाइम वॉइस क्लोनिंग की पुष्टि करें।',
    phonetic: 'Sabhi ka swaagat hai! Aaiye hamaare project roadmap ki sameeksha karein...',
    actionItem: 'Core Target: Hindi & English Synchronized Audio',
  },
  {
    sourceText: 'The neural translation engine preserves natural voice timbre and emotional inflection.',
    sourceLang: 'English',
    sourceFlag: '🇬🇧',
    targetLang: 'Tamil',
    targetFlag: '🇮🇳',
    translatedText: 'நியூரல் மொழிபெயர்ப்பு இயந்திரம் இயற்கையான குரல் தொனியையும் உணர்ச்சி வெளிப்பாட்டையும் பாதுகாக்கிறது.',
    phonetic: 'Neural mozlipeyarppu yanthiram iyarkkaiyaana kural thoniyaiyum paadhukaakkiradhu...',
    actionItem: 'Tamil Engine: High-Fidelity Timbre Cloning',
  },
  {
    sourceText: 'Our latency benchmarks demonstrate under 40 milliseconds for cross-border speech dubbing.',
    sourceLang: 'English',
    sourceFlag: '🇬🇧',
    targetLang: 'Urdu',
    targetFlag: '🇵🇰',
    translatedText: 'ہمارے تاخیر کے معیارات سرحد پار آواز کے ترجمے کے لیے چالیس ملی سیکنڈ سے بھی کم رفتار دکھاتے ہیں۔',
    phonetic: 'Hamaare taakheer ke meyaaraat sarhad paar aawaaz ke tarjumay ke liye 40ms se kam...',
    actionItem: 'Urdu Neural Model: Ultra-Low Latency Edge Processing',
  },
  {
    sourceText: 'Contextual AI accurately interprets complex technical terminology and medical jargon.',
    sourceLang: 'English',
    sourceFlag: '🇬🇧',
    targetLang: 'Japanese',
    targetFlag: '🇯🇵',
    translatedText: 'コンテキストAIは、複雑な技術用語や専門用語を文脈に合わせて高精度に翻訳します。',
    phonetic: 'Kontepisuto AI wa, fukuzatsu na gijutsu yōgo ya senmon yōgo o kōseido ni hon\'yaku shimasu.',
    actionItem: 'Japanese Model: Context-Aware Technical Dubbing',
  },
];

export default function Home() {
  // State for interactive simulation
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [heroSpeakerActive, setHeroSpeakerActive] = useState(true);
  const [heroMuted, setHeroMuted] = useState(false);
  const [heroTargetLang, setHeroTargetLang] = useState<'hi' | 'en' | 'ta' | 'ur' | 'ja'>('hi');
  const [activeVisualTab, setActiveVisualTab] = useState<'page' | 'cartoon' | 'laptop'>('page');

  // Horizontal scroll container ref
  const highlightScrollRef = useRef<HTMLDivElement>(null);

  const scrollHighlights = (direction: 'left' | 'right') => {
    if (highlightScrollRef.current) {
      const scrollAmount = 380;
      highlightScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Trigger audio visualizer playback
  const handlePlayDemo = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4500);
  };

  // Change interactive preset with simulated latency
  const handleSelectPreset = (index: number) => {
    if (index === activePresetIndex) return;
    setIsTranslating(true);
    setTimeout(() => {
      setActivePresetIndex(index);
      setIsTranslating(false);
    }, 280);
  };

  // Hero interactive translation texts for targeted 5 languages
  const heroTranslations = {
    hi: {
      lang: 'Hindi',
      flag: '🇮🇳',
      text: 'हम Q4 की वैश्विक विस्तार रणनीति और अगली पीढ़ी के AI इंजन एकीकरण पर चर्चा करेंगे।',
      speakerStatus: 'Listening in Mumbai (Translated Audio Live)',
    },
    en: {
      lang: 'English',
      flag: '🇬🇧',
      text: 'We will discuss the Q4 global expansion strategy and next-gen AI engine integration.',
      speakerStatus: 'Listening in London (Original Audio Live)',
    },
    ta: {
      lang: 'Tamil',
      flag: '🇮🇳',
      text: 'நாங்கள் Q4 உலகளாவிய விரிவாக்க உத்தி மற்றும் அடுத்த தலைமுறை AI இயந்திர ஒருங்கிணைப்பு பற்றி விவாதிப்போம்.',
      speakerStatus: 'Listening in Chennai (Translated Audio Live)',
    },
    ur: {
      lang: 'Urdu',
      flag: '🇵🇰',
      text: 'ہم Q4 کی عالمی توسیعی حکمت عملی اور اگلی نسل کے AI انجن انضمام پر بات کریں گے۔',
      speakerStatus: 'Listening in Lahore (Translated Audio Live)',
    },
    ja: {
      lang: 'Japanese',
      flag: '🇯🇵',
      text: '第4四半期のグローバル展開戦略と、次世代AI翻訳エンジンの統合について議論します。',
      speakerStatus: 'Listening in Tokyo (Translated Audio Live)',
    },
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative overflow-hidden bg-[#050814]">
      {/* Dynamic Background Image from public/background.jpeg */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-55 scale-105"
          style={{ backgroundImage: "url('/background.jpeg')" }}
        />
        {/* Transparent dark gradient and spotlight mask allowing the vibrant neon backdrop to glow through */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/40 via-[#050814]/70 to-[#050814]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,_transparent_15%,_#050814_85%)]" />
      </div>

      {/* Background Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-blue-600/20 via-violet-600/15 to-transparent blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[800px] left-[-200px] w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[1600px] right-[-200px] w-[700px] h-[700px] bg-purple-600/10 blur-[160px] pointer-events-none z-0" />

      {/* Floating Modern Header / Navbar */}
      <header className="sticky top-4 z-50 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <nav className="glass rounded-2xl px-5 py-3 flex items-center justify-between border border-white/10 shadow-2xl shadow-black/60 transition-all duration-300">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300" />
              <img
                src="/logo.png"
                alt="Lingua Meet AI Logo"
                className="relative h-11 w-11 rounded-full object-cover bg-slate-900 border border-white/20 p-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-400">
                Lingua Meet AI
              </span>
              <span className="text-[10px] text-blue-400 font-mono tracking-wider uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                Neural Engine 4.2
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#highlights" className="hover:text-blue-400 transition-colors">
              Highlights
            </a>
            <a href="#features" className="hover:text-blue-400 transition-colors">
              Features
            </a>
            <a href="#interactive-demo" className="hover:text-blue-400 transition-colors">
              Live Demo
            </a>
            <Link to="/how-it-works" className="hover:text-blue-400 transition-colors">
              How It Works
            </Link>
            <Link to="/research" className="hover:text-blue-400 transition-colors">
              Research
            </Link>
            <Link to="/pricing" className="hover:text-blue-400 transition-colors">
              Pricing
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-xl transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/join"
              className="text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 px-3.5 py-2 rounded-xl transition-all hover:border-blue-400/50 shadow-sm"
            >
              Join Room
            </Link>
            <Link
              to="/dashboard?newMeeting=true"
              className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 flex items-center gap-1.5 group"
            >
              <span>Start Instant Meeting</span>
              <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 relative z-10">
        <section className="relative pt-12 sm:pt-20 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            {/* Top Innovation Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 backdrop-blur-md mb-8 hover:bg-blue-500/15 transition-all shadow-lg shadow-blue-500/5"
            >
              <Sparkles size={15} className="text-blue-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
                World's First Real-Time Voice Cloning Meeting AI
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-xs text-slate-400 hidden sm:inline">&lt;45ms Latency</span>
            </motion.div>

            {/* Magnetic Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] mb-7 font-display"
            >
              <span className="text-white">Speak Naturally.</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
                Connect Globally.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-xl md:text-2xl text-slate-300/90 mb-10 max-w-3xl mx-auto leading-relaxed font-normal"
            >
              Real-time AI-powered language translation for meetings and conversations. Lingua Meet AI combines video meetings, speech recognition, live captions, and intelligent voice assistance into one seamless experience.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-14"
            >
              <Link
                to="/dashboard?newMeeting=true"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-2xl font-bold text-white shadow-xl shadow-blue-600/35 hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group text-base"
              >
                <span>Start Free Meeting</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#interactive-demo"
                className="w-full sm:w-auto px-7 py-4 glass hover:bg-white/10 border border-white/15 hover:border-blue-400/50 rounded-2xl font-semibold text-slate-200 transition-all flex items-center justify-center gap-2.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:-translate-y-0.5"
              >
                <Play size={16} className="text-blue-400 fill-blue-400/20" />
                <span>Test Live Voice Demo</span>
              </a>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 text-left"
            >
              {[
                { label: 'Speech-to-Speech Latency', val: '< 45ms', sub: 'Instant bi-directional' },
                { label: 'Target Core Languages', val: '5 Languages', sub: 'Hindi, English, Tamil, Urdu, Japanese' },
                { label: 'Semantic Context Accuracy', val: '99.4%', sub: 'Industry specialized' },
                { label: 'Data Security Standard', val: 'AES-256', sub: 'Zero audio retention' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all hover:shadow-[0_8px_25px_rgba(59,130,246,0.15)]"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{item.val}</div>
                  <div className="text-xs font-semibold text-blue-400 mt-1">{item.label}</div>
                  <div className="text-[11px] text-slate-400">{item.sub}</div>
                </div>
              ))}
            </motion.div>

            {/* High-Tech Simulated Meeting Interface Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="max-w-5xl mx-auto relative group"
            >
              {/* Glowing Aura behind window */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-700 -z-10" />

              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#080d1a] backdrop-blur-xl relative flex flex-col">
                {/* Simulated Top Window Bar */}
                <div className="h-11 bg-slate-900/90 border-b border-white/10 px-4 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-3 font-mono text-[11px] text-slate-300">
                      Room #849-291 • Global AI Sprint
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Dubbing Active (38ms)
                    </span>
                    <span className="text-[11px] text-slate-400">3 Participants</span>
                  </div>
                </div>

                {/* Main Video Grid and Translation Panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 min-h-[380px] sm:min-h-[460px]">
                  {/* Left 2 cols: Video Streams */}
                  <div className="md:col-span-2 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/70 relative">
                    {/* Speaker 1: Amisha (English - Active Speaker) */}
                    <div className="rounded-xl relative overflow-hidden bg-slate-900 border border-blue-500/40 shadow-lg shadow-blue-500/10 flex flex-col justify-end p-4 min-h-[190px]">
                      {/* Simulated background avatar / video */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-800/80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 shadow-xl">
                          <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Amisha&backgroundColor=b6e3f4"
                            alt="Amisha Rana"
                            className="w-full h-full rounded-full object-cover bg-slate-900"
                          />
                        </div>
                      </div>

                      {/* Speaking Pulse Badge & Sound Bars */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-black/70 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-medium text-slate-200 border border-white/10 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                            Amisha R. (US - English)
                          </span>
                        </div>
                        {/* Audio Waveform Bars */}
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-1 rounded-lg border border-white/10">
                          <span className="w-1 bg-blue-400 rounded-full sound-bar" style={{ animationDelay: '0.1s' }} />
                          <span className="w-1 bg-indigo-400 rounded-full sound-bar" style={{ animationDelay: '0.3s' }} />
                          <span className="w-1 bg-blue-300 rounded-full sound-bar" style={{ animationDelay: '0.2s' }} />
                          <span className="w-1 bg-cyan-400 rounded-full sound-bar" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </div>

                    {/* Speaker 2: Hiroshi (Tokyo - Translated Target Listener) */}
                    <div className="rounded-xl relative overflow-hidden bg-slate-900 border border-white/10 flex flex-col justify-end p-4 min-h-[190px]">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-800/80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-1 shadow-xl">
                          <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi&backgroundColor=c0aede"
                            alt="Hiroshi Tanaka"
                            className="w-full h-full rounded-full object-cover bg-slate-900"
                          />
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center justify-between">
                        <span className="bg-black/70 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-medium text-slate-200 border border-white/10">
                          Hiroshi T. (Tokyo - Japanese)
                        </span>
                        <span className="bg-purple-500/20 text-purple-300 text-[11px] px-2 py-0.5 rounded-full border border-purple-500/30">
                          Hearing AI {heroTranslations[heroTargetLang].lang} Audio
                        </span>
                      </div>
                    </div>

                    {/* Bottom Floating Live Caption Overlay */}
                    <div className="col-span-full relative mt-1">
                      <div className="bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">
                              Live Transcription (EN)
                            </span>
                            <span className="text-xs text-slate-400">Amisha speaking:</span>
                          </div>
                          <p className="text-sm text-slate-200 font-medium">
                            "Let's review our Q4 international rollout and verify the neural voice cloning latency."
                          </p>
                        </div>
                        <div className="sm:border-l sm:border-white/10 sm:pl-4 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                              Neural Translation ({heroTranslations[heroTargetLang].flag})
                            </span>
                          </div>
                          <p className="text-sm text-emerald-300 font-medium">
                            {heroTranslations[heroTargetLang].text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right 1 col: Live Translation Feed & Interactive Language Picker */}
                  <div className="p-4 bg-slate-900/60 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Languages size={14} className="text-blue-400" />
                          Live Dubbing Feed
                        </span>
                        <span className="text-[10px] text-blue-400 font-mono">Stream: Sync</span>
                      </div>

                      {/* Interactive Target Language Selector */}
                      <div className="mb-4">
                        <div className="text-[11px] text-slate-400 mb-1.5">Change Listener Language:</div>
                        <div className="grid grid-cols-5 gap-1.5">
                          {(
                            [
                              { key: 'hi', flag: '🇮🇳', name: 'Hindi' },
                              { key: 'en', flag: '🇬🇧', name: 'English' },
                              { key: 'ta', flag: '🇮🇳', name: 'Tamil' },
                              { key: 'ur', flag: '🇵🇰', name: 'Urdu' },
                              { key: 'ja', flag: '🇯🇵', name: 'Japanese' },
                            ] as const
                          ).map((item) => (
                            <button
                              key={item.key}
                              onClick={() => setHeroTargetLang(item.key)}
                              className={`px-1.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-all ${
                                heroTargetLang === item.key
                                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400'
                                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                              }`}
                            >
                              <span>{item.flag}</span>
                              <span className="hidden sm:inline">{item.name}</span>
                              <span className="sm:hidden">{item.key.toUpperCase()}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Real-time translated message card */}
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                            <span>🇺🇸 Original English</span>
                            <span className="text-blue-400">10:04 AM</span>
                          </div>
                          <div className="text-xs text-slate-300">
                            "Let's review our Q4 international rollout..."
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30">
                          <div className="flex items-center justify-between text-[11px] text-blue-300 mb-1">
                            <span className="flex items-center gap-1 font-semibold">
                              <span>{heroTranslations[heroTargetLang].flag}</span>
                              <span>{heroTranslations[heroTargetLang].lang} (AI Voice)</span>
                            </span>
                            <span className="text-emerald-400 font-mono text-[10px]">38ms Latency</span>
                          </div>
                          <div className="text-xs font-medium text-slate-100">
                            {heroTranslations[heroTargetLang].text}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Conference Control Mockup */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2">
                      <button
                        onClick={() => setHeroMuted(!heroMuted)}
                        className={`p-2.5 rounded-xl border transition-all ${
                          heroMuted
                            ? 'bg-red-500/20 text-red-400 border-red-500/40'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 border-white/10'
                        }`}
                        title="Toggle Mic"
                      >
                        {heroMuted ? <MicOff size={16} /> : <Mic size={16} />}
                      </button>
                      <button className="p-2.5 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10">
                        <Video size={16} />
                      </button>
                      <button
                        onClick={handlePlayDemo}
                        className="px-3.5 py-2 rounded-xl bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 border border-blue-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                      >
                        <Volume2 size={15} />
                        <span>{isPlayingAudio ? 'Playing AI Voice...' : 'Listen to Dub'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: SCROLL LEFT TO RIGHT TICKER & LIVE STREAM (User Highlight Requirement)
            ========================================================================= */}
        <section id="highlights" className="py-16 bg-slate-950/40 backdrop-blur-md border-y border-white/10 relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap size={13} className="text-blue-400 animate-pulse" />
              Continuous Real-Time Streams
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Live Cross-Border Translation Streams
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-2">
              Watch real conversation feeds being translated across continents in milliseconds. Hover over any stream card to inspect details.
            </p>
          </div>

          {/* Marquee Track 1: Scroll Left to Right (Live Translated Conversations) */}
          <div className="relative w-full overflow-hidden mb-6 py-2">
            {/* Fade gradients at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050814] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050814] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-left flex gap-5">
              {[...translationStreams, ...translationStreams].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card group p-4 rounded-2xl border border-white/10 hover:border-blue-500/50 w-[380px] sm:w-[440px] flex-shrink-0 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(59,130,246,0.25)] hover:-translate-y-1 text-left"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.flagFrom}</span>
                      <span className="text-xs font-bold text-slate-300">{item.speaker}</span>
                      <span className="text-[10px] text-slate-500">({item.langFrom})</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      {item.latency}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-3 bg-white/[0.02] p-2.5 rounded-lg border border-white/5 line-clamp-2">
                    "{item.source}"
                  </p>

                  <div className="flex items-center gap-2 mb-1.5">
                    <ArrowRight size={13} className="text-blue-400" />
                    <span className="text-lg">{item.flagTo}</span>
                    <span className="text-xs font-semibold text-blue-300">
                      AI Translated ({item.langTo})
                    </span>
                  </div>

                  <p className="text-xs font-medium text-emerald-300 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20 line-clamp-2">
                    "{item.translated}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Track 2: Scroll Right to Left (Key Feature Chips & Technology Highlights) */}
          <div className="relative w-full overflow-hidden py-2">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050814] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050814] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-right flex gap-4">
              {[...highlightChips, ...highlightChips].map((chip, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-lg ${chip.color} flex-shrink-0 cursor-default`}
                >
                  <chip.icon size={15} />
                  <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-100">
                    {chip.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: INTERACTIVE HORIZONTAL HIGHLIGHT CAROUSEL (Scroll Left to Right)
            ========================================================================= */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles size={13} />
                Next-Gen Breakthroughs
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
                Scroll to Explore Core Capabilities
              </h2>
              <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
                Slide horizontally through the proprietary neural pipeline powering real-time cross-border collaboration.
              </p>
            </div>

            {/* Left and Right Scroll Navigation Buttons */}
            <div className="flex items-center gap-3 mt-6 md:mt-0">
              <button
                onClick={() => scrollHighlights('left')}
                className="p-3.5 rounded-2xl glass hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group"
                aria-label="Scroll Highlights Left"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => scrollHighlights('right')}
                className="p-3.5 rounded-2xl glass hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group"
                aria-label="Scroll Highlights Right"
              >
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Track */}
          <div
            ref={highlightScrollRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {horizontalHighlightCards.map((card) => (
              <div
                key={card.id}
                className={`snap-start w-[320px] sm:w-[380px] flex-shrink-0 rounded-3xl p-7 glass-card border border-white/10 ${card.borderColor} ${card.glowColor} transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden`}
              >
                {/* Background Card Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-300">
                      {card.tag}
                    </span>
                    <div className="text-right">
                      <div className="text-xl font-black text-white">{card.stat}</div>
                      <div className="text-[10px] text-slate-400">{card.statLabel}</div>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-300/90 leading-relaxed mb-6 font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10">
                  <div className="text-xs text-slate-400 italic flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                    <span>{card.sample}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION: INTERACTIVE LIVE VOICE TRANSLATION PLAYGROUND
            ========================================================================= */}
        <section id="interactive-demo" className="py-24 bg-slate-950/40 backdrop-blur-md border-t border-white/10 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Headphones size={13} />
              Interactive Experience
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
              Test Real-Time Neural Translation Now
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-12">
              Select any conversation sample below to experience our sub-second speech synthesis, phonetic alignment, and automated action takeaway extraction.
            </p>

            {/* Preset Selector Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {interactivePresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    activePresetIndex === idx
                      ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20 text-white'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base">{preset.targetFlag}</span>
                    <span className="text-[10px] font-mono text-blue-400">Sample 0{idx + 1}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 truncate">
                    Into {preset.targetLang}
                  </div>
                </button>
              ))}
            </div>

            {/* Interactive Translation Console Card */}
            <div className="glass rounded-3xl p-6 sm:p-8 border border-white/15 text-left relative overflow-hidden shadow-2xl shadow-black/80 hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Input Speech Simulation */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <span>{interactivePresets[activePresetIndex].sourceFlag}</span>
                        <span>Source Speech ({interactivePresets[activePresetIndex].sourceLang})</span>
                      </span>
                      <span className="text-[11px] text-blue-400 font-mono">Input: Audio Mic</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 min-h-[120px] text-slate-200 text-sm leading-relaxed mb-4">
                      {interactivePresets[activePresetIndex].sourceText}
                    </div>
                  </div>

                  {/* Audio Controls */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={handlePlayDemo}
                      disabled={isPlayingAudio}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    >
                      <Volume2 size={16} />
                      <span>{isPlayingAudio ? 'Synthesizing...' : 'Synthesize Audio'}</span>
                    </button>
                    {isPlayingAudio && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                        Speaking in target timbre...
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: AI Translated Result & Summary */}
                <div className="flex flex-col justify-between md:border-l md:border-white/10 md:pl-8">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                        <span>{interactivePresets[activePresetIndex].targetFlag}</span>
                        <span>Neural Dubbed ({interactivePresets[activePresetIndex].targetLang})</span>
                      </span>
                      <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        {isTranslating ? 'Translating...' : 'Processed in 38ms'}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 min-h-[120px] text-emerald-200 text-sm font-medium leading-relaxed mb-3">
                      {isTranslating ? (
                        <div className="flex items-center gap-2 text-slate-400">
                          <RefreshCw size={16} className="animate-spin" />
                          <span>Streaming neural inference tokens...</span>
                        </div>
                      ) : (
                        interactivePresets[activePresetIndex].translatedText
                      )}
                    </div>

                    <div className="text-[11px] text-slate-400 italic mb-4">
                      Phonetic guide: "{interactivePresets[activePresetIndex].phonetic}"
                    </div>
                  </div>

                  {/* Autonomous Meeting Intelligence Action Item Extract */}
                  <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-500/30 flex items-center gap-3">
                    <FileText size={18} className="text-violet-400 flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-violet-300 font-bold">
                        AI Autonomous Meeting Minute
                      </div>
                      <div className="text-xs text-slate-200 font-medium">
                        {interactivePresets[activePresetIndex].actionItem}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: ENTERPRISE CAPABILITIES GRID WITH HOVER SHADOWS
            ========================================================================= */}
        <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Globe size={13} />
              Enterprise Architecture
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
              Everything Your Global Team Needs
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              Engineered from the ground up for high-stakes multinational executive boardrooms, global engineering standups, and medical conferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Real-Time Neural Dubbing across 5 Languages',
                desc: 'Near-instantaneous speech-to-speech translation with speaker accent adaptation and local dialect comprehension.',
                gradient: 'from-blue-600/20 to-transparent',
                hoverGlow: 'hover:shadow-[0_15px_35px_rgba(59,130,246,0.3)]',
                borderColor: 'hover:border-blue-500/50',
              },
              {
                icon: Brain,
                title: 'Context-Aware NLP Engines',
                desc: 'Understands industry nuances across software engineering, pharmaceuticals, legal arbitration, and financial reporting.',
                gradient: 'from-purple-600/20 to-transparent',
                hoverGlow: 'hover:shadow-[0_15px_35px_rgba(168,85,247,0.3)]',
                borderColor: 'hover:border-purple-500/50',
              },
              {
                icon: Headphones,
                title: 'Neural Timbre Preservation',
                desc: 'Your colleagues hear your familiar voice character, enthusiasm, and intonation, never a robotic monotonic synthesizer.',
                gradient: 'from-cyan-600/20 to-transparent',
                hoverGlow: 'hover:shadow-[0_15px_35px_rgba(6,182,212,0.3)]',
                borderColor: 'hover:border-cyan-500/50',
              },
              {
                icon: Users,
                title: 'HD Multi-Party Video Rooms',
                desc: 'Crystal-clear 4K video infrastructure, low-bandwidth WebRTC optimization, and seamless screen sharing across any device.',
                gradient: 'from-emerald-600/20 to-transparent',
                hoverGlow: 'hover:shadow-[0_15px_35px_rgba(16,185,129,0.3)]',
                borderColor: 'hover:border-emerald-500/50',
              },
              {
                icon: Shield,
                title: 'Ephemeral Zero-Retention Security',
                desc: 'Military-grade AES-256 E2E encryption. Audio streams are discarded after inference. SOC-2, HIPAA, and GDPR compliant.',
                gradient: 'from-rose-600/20 to-transparent',
                hoverGlow: 'hover:shadow-[0_15px_35px_rgba(244,63,94,0.3)]',
                borderColor: 'hover:border-rose-500/50',
              },
              {
                icon: FileText,
                title: 'Auto Action Items & Summaries',
                desc: 'Instant post-meeting intelligence digests with decisions made, assigned tasks, and downloadable bilingual transcripts.',
                gradient: 'from-amber-600/20 to-transparent',
                hoverGlow: 'hover:shadow-[0_15px_35px_rgba(245,158,11,0.3)]',
                borderColor: 'hover:border-amber-500/50',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`glass-card p-8 rounded-3xl border border-white/10 ${feature.borderColor} ${feature.hoverGlow} transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden text-left`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-white/20 transition-all shadow-inner">
                    <feature.icon className="text-blue-400 group-hover:text-blue-300 transition-colors" size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>

                <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span>Explore technology specs</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION: APPLICATION SPOTLIGHT (Laptop Video Call Asset Showcase)
            ========================================================================= */}
        <section className="py-20 bg-slate-950/40 backdrop-blur-md border-y border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Descriptive text */}
              <div className="text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Video size={13} />
                  Seamless Onboarding
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-6">
                  One Link. Zero Downloads. Instant Multilingual Collaboration.
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                  Guests join in one click from any modern browser. No extensions or specialized hardware needed. Lingua Meet AI auto-detects their spoken language and instantly begins streaming translated speech.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'Automatic dialect and accent calibration in under 3 seconds',
                    'Bi-directional subtitles displayed alongside video feeds',
                    'Instant download of translated transcripts and meeting summaries',
                    'Integrates seamlessly with Google Calendar and Outlook',
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                        <Check size={12} />
                      </div>
                      <span className="text-sm text-slate-200 font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    to="/dashboard?newMeeting=true"
                    className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] flex items-center gap-2"
                  >
                    <span>Launch a Test Call</span>
                    <ChevronRight size={16} />
                  </Link>
                  <Link
                    to="/how-it-works"
                    className="px-6 py-3.5 glass hover:bg-white/10 text-slate-300 font-semibold rounded-xl text-sm transition-all border border-white/10"
                  >
                    View System Workflow
                  </Link>
                </div>
              </div>

              {/* Right Column: Interactive Visual Showcase using page.png, cartoon.jpg, and laptop-video-call */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition duration-500 -z-10" />

                {/* Tab Switcher */}
                <div className="flex items-center gap-2 mb-3 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 w-fit">
                  <button
                    onClick={() => setActiveVisualTab('page')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      activeVisualTab === 'page'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Video size={13} />
                    <span>AI Video Room</span>
                  </button>
                  <button
                    onClick={() => setActiveVisualTab('cartoon')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      activeVisualTab === 'cartoon'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Users size={13} />
                    <span>Team Meeting</span>
                  </button>
                  <button
                    onClick={() => setActiveVisualTab('laptop')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      activeVisualTab === 'laptop'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Sparkles size={13} />
                    <span>Live Conference</span>
                  </button>
                </div>

                <div className="rounded-3xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl relative">
                  {activeVisualTab === 'page' && (
                    <div className="bg-slate-950 p-3 flex items-center justify-center">
                      <img
                        src="/page.png"
                        alt="Virtual AI Laptop Video Conference Interface"
                        className="w-full h-auto max-h-[380px] object-contain rounded-2xl hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  )}

                  {activeVisualTab === 'cartoon' && (
                    <div className="bg-slate-950 p-3 flex items-center justify-center">
                      <img
                        src="/cartoon.jpg"
                        alt="Global Team Collaboration Meeting Cartoon"
                        className="w-full h-auto max-h-[380px] object-contain rounded-2xl hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  )}

                  {activeVisualTab === 'laptop' && (
                    <img
                      src="/laptop-video-call-complete.png"
                      alt="AI Video Meeting Call Interface"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}

                  {/* Floating Status Glass Badge */}
                  <div className="absolute bottom-4 left-4 right-4 glass p-3.5 rounded-2xl border border-white/20 shadow-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <div>
                        <div className="text-xs font-bold text-white">
                          {activeVisualTab === 'page' && 'Virtual Video Call Interface (page.png)'}
                          {activeVisualTab === 'cartoon' && 'Hybrid Team Collaboration (cartoon.jpg)'}
                          {activeVisualTab === 'laptop' && 'Real-time Browser Video Conference'}
                        </div>
                        <div className="text-[11px] text-slate-300">
                          Hindi • English • Tamil • Urdu • Japanese
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/20 px-2.5 py-1 rounded-lg border border-blue-500/30">
                      38ms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: MEET OUR GLOBAL MULTILINGUAL PARTICIPANTS (Cartoon Avatars & Names)
            ========================================================================= */}
        <section className="py-20 bg-slate-950/30 backdrop-blur-md relative border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Users size={13} />
                Global Community & Meeting Room Cast
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mb-4">
                Meet Our Multilingual Participants
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                Expressive cartoon avatar characters communicating effortlessly across Hindi, English, Tamil, Urdu & Japanese.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {[
                {
                  name: 'Amisha Rana',
                  role: 'Meeting Host',
                  lang: 'English / Hindi',
                  flag: '🇮🇳',
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amisha&backgroundColor=b6e3f4',
                  active: true
                },
                {
                  name: 'Hiroshi T.',
                  role: 'Tokyo Lead',
                  lang: 'Japanese',
                  flag: '🇯🇵',
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi&backgroundColor=c0aede',
                  active: true
                },
                {
                  name: 'Sonika',
                  role: 'Admin & Lead',
                  lang: 'Hindi / Urdu',
                  flag: '🇮🇳',
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sonika&backgroundColor=ffd5dc',
                  active: false
                },
                {
                  name: 'Priya',
                  role: 'Research',
                  lang: 'Tamil / English',
                  flag: '🇮🇳',
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=c0aede',
                  active: true
                },
                {
                  name: 'Olibha',
                  role: 'Localization',
                  lang: 'Urdu / Hindi',
                  flag: '🇵🇰',
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olibha&backgroundColor=ffdfbf',
                  active: false
                },
                {
                  name: 'Amrit',
                  role: 'Full-Stack',
                  lang: 'Hindi / English',
                  flag: '🇮🇳',
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amrit&backgroundColor=d1d4f9',
                  active: true
                },
                {
                  name: 'Abhishek',
                  role: 'WebRTC Infra',
                  lang: 'Hindi / English',
                  flag: '🇮🇳',
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abhishek&backgroundColor=c0aede',
                  active: false
                }
              ].map((participant, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-4 bg-slate-900/70 border border-white/10 hover:border-blue-500/40 hover:bg-slate-900 transition-all text-center flex flex-col items-center group relative overflow-hidden shadow-lg"
                >
                  <div className="relative mb-3">
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/20 group-hover:border-blue-400 group-hover:scale-105 transition-all shadow-md bg-slate-800"
                    />
                    {participant.active && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    {participant.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-2">{participant.role}</p>
                  <div className="mt-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
                    <span>{participant.flag}</span>
                    <span>{participant.lang}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: HIGH-IMPACT FINAL CALL TO ACTION (CTA)
            ========================================================================= */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="rounded-3xl p-10 sm:p-16 relative overflow-hidden bg-gradient-to-b from-blue-900/40 via-indigo-950/50 to-slate-950 border border-blue-500/30 shadow-2xl shadow-blue-900/30 text-center hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] transition-shadow">
              {/* Radial glow background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 blur-[100px] pointer-events-none -z-10" />

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles size={14} className="text-blue-400" />
                Zero Friction Multilingual Meetings
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-display tracking-tight mb-6">
                Ready to Experience Meetings Without Borders?
              </h2>

              <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Connect with global colleagues, overseas clients, and international students in their native languages today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/dashboard?newMeeting=true"
                  className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-2xl font-bold text-white shadow-xl shadow-blue-600/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] hover:-translate-y-1 transition-all text-base flex items-center justify-center gap-2"
                >
                  <span>Start Free Instant Meeting</span>
                  <ChevronRight size={18} />
                </Link>
                <Link
                  to="/join"
                  className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 border border-white/20 hover:border-blue-400/50 rounded-2xl font-semibold text-slate-200 transition-all text-base flex items-center justify-center gap-2"
                >
                  <span>Join with Meeting Code</span>
                </Link>
              </div>

              <div className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-6 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-emerald-400" /> No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-emerald-400" /> Free 40-minute trial meetings
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-emerald-400" /> Hindi, English, Tamil, Urdu & Japanese supported
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Refined Footer */}
      <footer className="bg-slate-950 border-t border-white/10 py-14 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 text-left">
            {/* Col 1: Brand */}
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4 group">
                <img
                  src="/logo.png"
                  alt="Lingua Meet AI Logo"
                  className="h-10 w-10 rounded-full object-cover bg-slate-900 border border-white/20 p-0.5"
                />
                <span className="font-extrabold text-lg text-white font-display">Lingua Meet AI</span>
              </Link>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-4 leading-relaxed">
                Next-generation AI video conferencing with real-time neural speech dubbing, voice timbre preservation, and bilingual captions.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                All Global Edge Inference Nodes Operational
              </div>
            </div>

            {/* Col 2: Product */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Product</div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link to="/how-it-works" className="hover:text-blue-400 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/technology" className="hover:text-blue-400 transition-colors">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link to="/applications" className="hover:text-blue-400 transition-colors">
                    Applications
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-blue-400 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Research */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Research</div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link to="/research" className="hover:text-blue-400 transition-colors">
                    Benchmarks
                  </Link>
                </li>
                <li>
                  <a href="#highlights" className="hover:text-blue-400 transition-colors">
                    Speech Dubbing
                  </a>
                </li>
                <li>
                  <a href="#interactive-demo" className="hover:text-blue-400 transition-colors">
                    Live Demo
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-400 transition-colors">
                    Whitepaper
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Platform */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Rooms</div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link to="/join" className="hover:text-blue-400 transition-colors">
                    Join Meeting
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard?newMeeting=true" className="hover:text-blue-400 transition-colors">
                    Host Meeting
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-blue-400 transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-blue-400 transition-colors">
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <div>&copy; 2026 Lingua Meet AI Project. All rights reserved.</div>
            <div className="flex items-center gap-6 mt-4 sm:mt-0">
              <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-400 transition-colors cursor-pointer">SOC-2 Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
