// Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.sidebarTitle}>Dashboard</h3>
      <ul style={styles.sidebarMenu}>
        <li style={styles.sidebarMenuItem} onClick={() => navigate('/dashboard')}>Home</li>
         <li style={styles.sidebarMenuItem} onClick={() => navigate('/projects')}>Projects</li>
        <li style={styles.sidebarMenuItem} onClick={() => navigate('/profile')}>Profile</li>
        
        <li style={styles.sidebarMenuItem} onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

// Inline styles for Sidebar component
const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'fixed',
    height: '100vh',
    top: '0',
  },
  sidebarTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: '20px',
  },
  sidebarMenu: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '30px',
  },
  sidebarMenuItem: {
    margin: '15px 0',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '500',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  sidebarMenuItemHover: {
    backgroundColor: '#34495e',
  },
  sidebarMenuItemActive: {
    backgroundColor: '#16a085',
    color: '#ecf0f1',
  },
};

export default Sidebar;
