import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router
import Login from './components/Login'; // Login component
import Signup from './components/Signup'; // Signup component
import Dashboard from './components/Dashboard'; // Dashboard component
import Profile from './components/Profile'; // Profile component
import ProjectCreate from './components/ProjectCreate';
import ProjectList from './components/ProjectList';  // Project creation component (if needed)
import NotFound from './components/NotFound'; // Optional: 404 page for unmatched routes
import ProjectEdit from './components/ProjectEdit';
import GenAIChat from './components/GenAIChat';
import GenAIImage from './components/GenAIImage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Login */}
        <Route path="/login" element={<Login />} />
        {/* Route for Signup */}
        <Route path="/signup" element={<Signup />} />
        {/* Route for Dashboard (Protected Route) */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Route for Profile (Protected Route) */}
        <Route path="/profile" element={<Profile />} />
      <Route path="/genai/chat" element={<GenAIChat />} />
         <Route path="/genai/image" element={<GenAIImage />} />
        {/* Route for Project Create */}
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/create" element={<ProjectCreate />} />
          <Route path="/projects/edit/:id" element={<ProjectEdit />} />
        
        {/* Route for 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
