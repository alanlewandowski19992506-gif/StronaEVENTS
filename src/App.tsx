import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { HomePage } from './components/pages/HomePage';
import { EventsPage } from './components/pages/EventsPage';
import { CalendarPage } from './components/pages/CalendarPage';
import { OrganizerDashboard } from './components/dashboard/OrganizerDashboard';
import { AttendeeDashboard } from './components/dashboard/AttendeeDashboard';
import { useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const { user } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'events':
        return <EventsPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'dashboard':
        if (!user) return <HomePage onNavigate={setCurrentPage} />;
        return user.role === 'organizer' 
          ? <OrganizerDashboard /> 
          : <AttendeeDashboard />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;