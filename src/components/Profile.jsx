// Profile.jsx
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null); // State for user data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // For navigation on logout

  // Memoize the fetchUser function to prevent unnecessary re-renders
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get('https://node-api-products-erq0.onrender.com/dashboard', {
        withCredentials: true, // Important for session management (cookie-based)
      });

      // On successful response, set user state and stop loading
      setUser(res.data.user);
      setLoading(false);
    } catch (err) {
      // If session is expired or invalid, redirect to login page
      console.error('Error fetching user:', err);
      alert('Session expired or unauthorized. Please log in again.');
      navigate('/login'); // Redirect to login page
    }
  }, [navigate]);

  useEffect(() => {
    fetchUser(); // Call fetchUser on mount to get the user data
  }, [fetchUser]);

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      const res = await axios.post('https://node-api-products-erq0.onrender.com/logout', {}, {
        withCredentials: true, // Send session cookie to clear the session
      });
      alert(res.data.message); // Optional: Show success message
      navigate('/login'); // Redirect to login page after successful logout
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Logout failed. Please try again.');
    }
  };

  // Show loading state while data is being fetched
  if (loading) {
    return <p>Loading user profile...</p>;
  }

  return (
    <Layout handleLogout={handleLogout}>
      <header style={styles.header}>
        <h1>My Profile</h1>
      </header>

      {user ? (
        <div style={styles.profileCard}>
          <p style={styles.profileInfo}>
            <strong>Name:</strong> {user.name}
          </p>
          <p style={styles.profileInfo}>
            <strong>Username:</strong> {user.user_name}
          </p>
          <p style={styles.profileInfo}>
            <strong>Email:</strong> {user.email}
          </p>
          <p style={styles.profileInfo}>
            <strong>ID:</strong> {user.id}
          </p>
        </div>
      ) : (
        <p>No user data found</p>
      )}
    </Layout>
  );
};

// Inline styles for Profile component
const styles = {
  header: {
    marginBottom: '20px',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  profileCard: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    marginTop: '20px',
  },
  profileInfo: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#2c3e50',
  },
};

export default Profile;
