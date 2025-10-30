// Layout.js
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, handleLogout }) => {
  return (
    <div style={styles.layoutContainer}>
      <Sidebar handleLogout={handleLogout} />
      <div style={styles.mainContent}>
        {children}
      </div>
    </div>
  );
};

// Inline styles for Layout component
const styles = {
  layoutContainer: {
    display: 'flex',
  },
  mainContent: {
    flex: '1',
    marginLeft: '250px', // So content doesn't overlap the sidebar
    padding: '10px',
    backgroundColor: '#f9f9f9',
  },
};

export default Layout;
