// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Separate HomePage component
const HomePage = ({
  movies,
  loading,
  error,
  editingMovie,
  showAddForm,
  formData,
  setShowAddForm,
  handleSubmit,
  handleEdit,
  handleDelete,
  resetForm,
  handleInputChange,
  selectedMovie,
  handleImageClick,
  closeMovieModal
}) => (
  <div className="home-container">
    <div className="home-header">
      <h2>Movie Database</h2>
      <button 
        className="add-btn"
        onClick={() => setShowAddForm(true)}
        disabled={loading}
      >
        เพิ่มภาพยนตร์
      </button>
    </div>

    {error && (
      <div className="error-message">
        {error}
      </div>
    )}

    {showAddForm && (
      <div className="form-overlay">
        <div className="form-container">
          <h3>{editingMovie ? 'แก้ไขภาพยนตร์' : 'เพิ่มภาพยนตร์ใหม่'}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="ชื่อภาพยนตร์"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="year"
              placeholder="ปีที่ฉาย"
              value={formData.year}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="imdbScore"
              placeholder="คะแนน IMDB (0-10)"
              step="0.1"
              min="0"
              max="10"
              value={formData.imdbScore}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="rottenTomatoScore"
              placeholder="คะแนน Rotten Tomatoes (0-100)"
              min="0"
              max="100"
              value={formData.rottenTomatoScore}
              onChange={handleInputChange}
              required
            />
            <input
              type="url"
              name="posterUrl"
              placeholder="URL ภาพโปสเตอร์"
              value={formData.posterUrl}
              onChange={handleInputChange}
              required
            />
            <div className="form-buttons">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'กำลังบันทึก...' : (editingMovie ? 'อัปเดต' : 'เพิ่ม')}
              </button>
              <button type="button" className="cancel-btn" onClick={resetForm}>
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {loading && movies.length === 0 && (
      <div className="loading-message">
        กำลังโหลดข้อมูล...
      </div>
    )}

    <div className="movies-grid">
      {movies.map(movie => (
        <div key={movie._id} className="movie-card">
          <img 
            src={movie.posterUrl} 
            alt={movie.title} 
            className="movie-poster clickable-poster" 
            onClick={() => handleImageClick(movie)}
          />
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p className="year">ปี: {movie.year}</p>
            <div className="scores">
              <span className="imdb">IMDB: {movie.imdbScore}/10</span>
              <span className="rotten">RT: {movie.rottenTomatoScore}%</span>
            </div>
            <div className="movie-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEdit(movie)}
                disabled={loading}
              >
                แก้ไข
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(movie._id)}
                disabled={loading}
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Movie Detail Modal */}
    {selectedMovie && (
      <div className="movie-modal-overlay" onClick={closeMovieModal}>
        <div className="movie-modal-container" onClick={(e) => e.stopPropagation()}>
          <button className="movie-modal-close" onClick={closeMovieModal}>
            ×
          </button>
          <div className="movie-modal-content">
            <div className="movie-modal-poster">
              <img src={selectedMovie.posterUrl} alt={selectedMovie.title} />
            </div>
            <div className="movie-modal-details">
              <h2>{selectedMovie.title}</h2>
              <div className="movie-modal-info">
                <div className="info-row">
                  <span className="info-label">ปีที่ฉาย:</span>
                  <span className="info-value">{selectedMovie.year}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">คะแนน IMDB:</span>
                  <span className="info-value imdb-score">{selectedMovie.imdbScore}/10</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Rotten Tomatoes:</span>
                  <span className="info-value rt-score">{selectedMovie.rottenTomatoScore}%</span>
                </div>
                <div className="info-row">
                  <span className="info-label">เพิ่มเมื่อ:</span>
                  <span className="info-value">{new Date(selectedMovie.createdAt).toLocaleDateString('th-TH')}</span>
                </div>
                {selectedMovie.updatedAt !== selectedMovie.createdAt && (
                  <div className="info-row">
                    <span className="info-label">แก้ไขล่าสุด:</span>
                    <span className="info-value">{new Date(selectedMovie.updatedAt).toLocaleDateString('th-TH')}</span>
                  </div>
                )}
              </div>
              <div className="movie-modal-actions">
                <button 
                  className="modal-edit-btn"
                  onClick={() => {
                    handleEdit(selectedMovie);
                    closeMovieModal();
                  }}
                >
                  แก้ไขภาพยนตร์
                </button>
                <button 
                  className="modal-delete-btn"
                  onClick={() => {
                    handleDelete(selectedMovie._id);
                    closeMovieModal();
                  }}
                >
                  ลบภาพยนตร์
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {movies.length === 0 && !loading && (
      <div className="empty-message">
        ไม่มีข้อมูลภาพยนตร์ กดปุ่ม "เพิ่มภาพยนตร์" เพื่อเริ่มต้น
      </div>
    )}
  </div>
);

// Separate AboutPage component  
const AboutPage = ({ profiles, currentProfileIndex, setCurrentProfileIndex }) => {
  const currentProfile = profiles[currentProfileIndex];
  
  return (
    <div className="about-container">
      <div className="profile-card">
        <img 
          src={currentProfile.profileImage} 
          alt="Profile" 
          className="profile-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b586?w=200&h=200&fit=crop&crop=face';
          }}
        />
        <div className="profile-info">
          <h2>{currentProfile.firstName}</h2>
          <h3>{currentProfile.lastName}</h3>
          <p className="nickname">ชื่อเล่น: {currentProfile.nickname}</p>
          <p className="profile-id">ID: {currentProfile._id}</p>
        </div>
        
        <div className="profile-navigation">
          <button 
            className="nav-profile-btn"
            onClick={() => setCurrentProfileIndex((prev) => 
              prev === 0 ? profiles.length - 1 : prev - 1
            )}
          >
            ← ก่อนหน้า
          </button>
          <span className="profile-indicator">
            {currentProfileIndex + 1} / {profiles.length}
          </span>
          <button 
            className="nav-profile-btn"
            onClick={() => setCurrentProfileIndex((prev) => 
              prev === profiles.length - 1 ? 0 : prev + 1
            )}
          >
            ถัดไป →
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [movies, setMovies] = useState([]);
  const [profiles] = useState([
    {
      _id: '67130401',
      firstName: 'จักรพันธุ์',
      lastName: 'ฤทธิแผลง',
      nickname: 'บอล',
      profileImage: '/images/student-photo-01.png'
    },
    {
      _id: '67130643',
      firstName: 'พยุงศักดิ์',
      lastName: 'ฟูกุนนา',
      nickname: 'เอิร์ธ',
      profileImage: '/images/student-photo-02.jpg'
    }
  ]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null); // เพิ่มสำหรับ movie modal

  const [editingMovie, setEditingMovie] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    imdbScore: '',
    rottenTomatoScore: '',
    posterUrl: ''
  });

  // API Base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Fetch movies from API
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/movies`);
      setMovies(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('ไม่สามารถโหลดข้อมูลภาพยนตร์ได้');
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const movieData = {
        ...formData,
        year: parseInt(formData.year),
        imdbScore: parseFloat(formData.imdbScore),
        rottenTomatoScore: parseInt(formData.rottenTomatoScore)
      };

      if (editingMovie) {
        // Update existing movie
        await axios.put(`${API_BASE_URL}/movies/${editingMovie._id}`, movieData);
        setEditingMovie(null);
      } else {
        // Add new movie
        await axios.post(`${API_BASE_URL}/movies`, movieData);
        setShowAddForm(false);
      }
      
      // Refresh movies list
      await fetchMovies();
      resetForm();
      setError('');
    } catch (err) {
      console.error('Error saving movie:', err);
      setError('ไม่สามารถบันทึกข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      year: movie.year.toString(),
      imdbScore: movie.imdbScore.toString(),
      rottenTomatoScore: movie.rottenTomatoScore.toString(),
      posterUrl: movie.posterUrl
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบภาพยนตร์นี้?')) {
      setLoading(true);
      try {
        await axios.delete(`${API_BASE_URL}/movies/${id}`);
        await fetchMovies(); // Refresh list
        setError('');
      } catch (err) {
        console.error('Error deleting movie:', err);
        setError('ไม่สามารถลบข้อมูลได้');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      year: '',
      imdbScore: '',
      rottenTomatoScore: '',
      posterUrl: ''
    });
    setEditingMovie(null);
    setShowAddForm(false);
  };

  // เพิ่มฟังก์ชันสำหรับ movie modal
  const handleImageClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">Movie App</div>
        <div className="nav-links">
          <button 
            className={currentPage === 'home' ? 'nav-link active' : 'nav-link'}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </button>
          <button 
            className={currentPage === 'about' ? 'nav-link active' : 'nav-link'}
            onClick={() => setCurrentPage('about')}
          >
            About
          </button>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === 'home' ? (
          <HomePage 
            movies={movies}
            loading={loading}
            error={error}
            editingMovie={editingMovie}
            showAddForm={showAddForm}
            formData={formData}
            setShowAddForm={setShowAddForm}
            handleSubmit={handleSubmit}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            resetForm={resetForm}
            handleInputChange={handleInputChange}
            selectedMovie={selectedMovie}
            handleImageClick={handleImageClick}
            closeMovieModal={closeMovieModal}
          />
        ) : (
          <AboutPage 
            profiles={profiles}
            currentProfileIndex={currentProfileIndex}
            setCurrentProfileIndex={setCurrentProfileIndex}
          />
        )}
      </main>
    </div>
  );
};

export default App;