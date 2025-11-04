import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('https://node-api-products-erq0.onrender.com/profile', { withCredentials: true });
        setUserId(userRes.data.user._id);

        if (id) {
          const projectRes = await axios.get(`https://node-api-products-erq0.onrender.com/projects/edit/${id}`, { withCredentials: true });
          const projectData = projectRes.data.project;
          setName(projectData.name);
          setDescription(projectData.description);
          setCurrentThumbnail(projectData.thumbnail || null);
        } else {
          setError('Project ID missing in URL');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load project or user data');
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!userId) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (thumbnail) formData.append('thumbnail', thumbnail);

      await axios.put(`https://node-api-products-erq0.onrender.com/projects/update/${id}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Project updated successfully');
      navigate('/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Project update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Edit Project</h2>
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Project Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
                placeholder="Enter project name"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ ...styles.input, height: '120px', resize: 'none' }}
                placeholder="Describe your project..."
              ></textarea>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Current Thumbnail</label>
              {currentThumbnail ? (
                <img
                  src={`https://node-api-products-erq0.onrender.com${currentThumbnail}`}
                  alt="current thumbnail"
                  style={styles.thumbnail}
                />
              ) : (
                <p style={styles.noThumbnail}>No thumbnail uploaded</p>
              )}
              <label style={styles.fileLabel}>
                Upload New Thumbnail
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  style={styles.fileInput}
                />
              </label>
            </div>

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Updating...' : 'Update Project'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
    padding: '40px',
    transition: 'transform 0.3s',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '28px',
    color: '#333',
  },
  error: {
    color: '#ff4d4f',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontWeight: '600',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  thumbnail: {
    width: '150px',
    borderRadius: '10px',
    marginBottom: '10px',
    objectFit: 'cover',
    border: '1px solid #ddd',
  },
  noThumbnail: {
    fontStyle: 'italic',
    color: '#999',
    marginBottom: '10px',
  },
  fileLabel: {
    display: 'inline-block',
    padding: '10px 15px',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    cursor: 'pointer',
    width: 'fit-content',
    fontWeight: '500',
    color: '#333',
    marginTop: '5px',
  },
  fileInput: {
    display: 'none',
  },
  button: {
    padding: '15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
};

export default ProjectEdit;
