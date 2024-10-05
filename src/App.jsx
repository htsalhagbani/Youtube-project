import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Navbarall from './components/Navbarall';

function App() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // localStorage.setItem('token', ); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false); 
    navigate('/'); 
  };

  return (
    <div className="max-h-screen flex flex-col overflow-hidden dark:bg-neutral-900">
      {isAuthenticated ? (
        <Navbar 
          toggleSidebar={toggleSidebar} 
          setSearchQuery={setSearchQuery} 
          onLogout={handleLogout} 
        />
      ) : (
        <Navbarall toggleSidebar={toggleSidebar} setSearchQuery={setSearchQuery} />
      )}
      
      <div className="flex overflow-auto">
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout} 

        />
        
        <div className={`w-full md:px-4 px-2 overflow-x-hidden ${isSidebarOpen ? 'hide_thumb' : ''}`}>
          <Outlet context={{ searchQuery, handleLoginSuccess }} />
        </div>
      </div>
    </div>
  );
}

export default App;
