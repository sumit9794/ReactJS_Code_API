import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

export default function Profile() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get('http://localhost:8000/profile', {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        navigate('/login');
      }
    }
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
    layout: { display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
    sidebar: { width: '250px', backgroundColor: '#1e293b', color: '#fff', display: 'flex', flexDirection: 'column', padding: '20px' },
    sidebarTitle: { fontSize: '24px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' },
    sidebarItem: { padding: '15px 10px', cursor: 'pointer', borderRadius: '8px', marginBottom: '10px', transition: '0.3s' },
    sidebarItemHover: { backgroundColor: '#374151' },
    content: { flex: 1, padding: '30px', backgroundColor: '#f3f4f6' },
    title: { textAlign: 'center', marginBottom: '30px', fontSize: '24px', fontWeight: 'bold' },
    infoItem: { display: 'flex', justifyContent: 'space-between', padding: '12px 20px', backgroundColor: '#e6f0ff', borderRadius: '5px', marginBottom: '10px' },
    label: { fontWeight: 'bold', color: '#0066cc' },
  };

  return (
      <Layout handleLogout={handleLogout}>
    <div style={styles.layout}>
      {/* Sidebar */}
      

      {/* Main Content */}
      <main style={styles.content}>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '30px' 
        }}>
        <h1>User Profile</h1>
        <button 
          style={{ 
            backgroundColor: '#ef4444', 
            color: '#fff', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            transition: '0.3s'
          }}
          onClick={handleLogout}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dc2626'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ef4444'}
        >
          Logout
        </button>
      </header>
        {user && (
          <>
            <div style={styles.infoItem}><span style={styles.label}>Name:</span> {user.name}</div>
            <div style={styles.infoItem}><span style={styles.label}>Username:</span> {user.user_name}</div>
            <div style={styles.infoItem}><span style={styles.label}>Email:</span> {user.email}</div>
            <div style={styles.infoItem}><span style={styles.label}>ID:</span> {user.id}</div>
          </>
        )}
      </main>
    </div>
    </Layout>
  );
}
