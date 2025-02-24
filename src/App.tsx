import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Calendar, Users, BookOpen, Settings } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Interviews from './pages/Interviews';
import QuestionBank from './pages/QuestionBank';
import SettingsPage from './pages/Settings';

function App() {
  const navItems = [
    { label: 'Dashboard', icon: Calendar, path: '/' },
    { label: 'Interviews', icon: Users, path: '/interviews' },
    { label: 'Question Bank', icon: BookOpen, path: '/questions' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar items={navItems} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/questions" element={<QuestionBank />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;