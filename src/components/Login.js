import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:8000/login', // backend login endpoint
        {
          user_name: userName, // must match backend field
          password,
        },
        { withCredentials: true } // important for session cookies
      );

      setMessage(res.data.message || 'Login successful');
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>Login</h2>

        <input
          placeholder="Username"
          value={userName}
          onChange={(e) => { setUserName(e.target.value); setMessage(''); }}
          required
          style={styles.input}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setMessage(''); }}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Login</button>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.linkText}>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#e6f0ff',
  },
  form: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    width: '350px',
    textAlign: 'center',
  },
  title: { marginBottom: '20px', color: '#333' },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    marginTop: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#0066cc',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  message: { marginTop: '15px', color: '#ff4d4f', fontWeight: 'bold' },
  linkText: { textAlign: 'center', marginTop: '10px' },
};
