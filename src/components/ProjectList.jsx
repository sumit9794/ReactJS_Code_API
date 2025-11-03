import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const limit = 3;
  const navigate = useNavigate();

  // Fetch projects with search & pagination
  const fetchProjects = async (searchTerm = '', page = 1) => {
    try {
      setLoading(true);
      const endpoint =
        searchTerm.trim() !== ''
          ? 'http://localhost:8000/projects/search'
          : 'http://localhost:8000/projects';

      const response = await axios.get(endpoint, {
        withCredentials: true,
        params: { search: searchTerm, page, limit },
      });

      // Normalize response
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.projects || [];

      setProjects(data);
      setTotalProjects(response.data.total || data.length);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProjects(search, currentPage);
    }, 300);
    return () => clearTimeout(delay);
  }, [search, currentPage]);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  // Delete project
  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`http://localhost:8000/projects/${projectId}`, {
        withCredentials: true,
      });
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete project');
    }
  };

  // Edit project
  const handleEdit = (projectId) => {
    navigate(`/projects/edit/${projectId}`);
  };

  return (
    <Layout handleLogout={handleLogout}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h3 style={styles.headerTitle}>Your Projects</h3>
          <Link to="/projects/create" style={styles.createProjectLink}>
            + Create Project
          </Link>
        </div>

        {/* Search */}
        <div style={styles.filterContainer}>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Project List */}
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <div style={styles.projectsContainer}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} style={styles.projectCard}>
                  {project.image && (
                    <img
                      src={`http://localhost:8000${project.image}`}
                      alt={project.name}
                      style={styles.thumbnail}
                    />
                  )}
                  <h4 style={styles.projectTitle}>{project.name}</h4>
                  <p style={styles.projectDescription}>
                    {project.description || 'No description available.'}
                  </p>
                  <div style={styles.projectActions}>
                    <button
                      style={styles.editButton}
                      onClick={() => handleEdit(project._id)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(project._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={styles.noProjects}>No projects found.</p>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalProjects > limit && (
          <div style={styles.pagination}>
            <button
              style={styles.pageButton}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: Math.ceil(totalProjects / limit) }, (_, i) => (
              <button
                key={i + 1}
                style={{
                  ...styles.pageButton,
                  backgroundColor: currentPage === i + 1 ? '#2196F3' : '#fff',
                  color: currentPage === i + 1 ? '#fff' : '#000',
                }}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              style={styles.pageButton}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(totalProjects / limit))
                )
              }
              disabled={currentPage === Math.ceil(totalProjects / limit)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  container: { padding: '20px', backgroundColor: '#f4f6f9', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: '24px', fontWeight: 'bold' },
  createProjectLink: {
    padding: '10px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
  },
  filterContainer: {
    display: 'flex',
    gap: '10px',
    margin: '20px 0',
    justifyContent: 'center',
  },
  searchInput: {
    padding: '10px',
    width: '250px',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  projectsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '10px',
  },
  projectCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '10px',
  },
  projectTitle: { fontSize: '18px', fontWeight: 'bold' },
  projectDescription: { fontSize: '14px', color: '#777', textAlign: 'center' },
  projectActions: { display: 'flex', gap: '10px', marginTop: '10px' },
  editButton: {
    padding: '8px 12px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
  },
  noProjects: { textAlign: 'center', color: '#555' },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    gap: '5px',
    flexWrap: 'wrap',
  },
  pageButton: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    minWidth: '40px',
  },
};

export default ProjectList;
