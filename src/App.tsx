import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// We'll lazy load pages for better performance
// Public Pages
const Home = lazy(() => import('./pages/Home'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Research = lazy(() => import('./pages/Research'));
const Technology = lazy(() => import('./pages/Technology'));
const Applications = lazy(() => import('./pages/Applications'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const JoinMeeting = lazy(() => import('./pages/JoinMeeting'));
// SaaS Dashboard Pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MeetingRoom = lazy(() => import('./pages/MeetingRoom'));
const MeetingSummary = lazy(() => import('./pages/MeetingSummary'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-background text-foreground"><div className="text-xl">Loading Lingua Meet AI...</div></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/research" element={<Research />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/join" element={<JoinMeeting />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/meeting/:id" element={<MeetingRoom />} />
          <Route path="/meeting/:id/summary" element={<MeetingSummary />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
