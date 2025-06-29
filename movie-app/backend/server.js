// server.js - JSON File Storage Version
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File paths
const DATA_DIR = path.join(__dirname, 'data');
const MOVIES_FILE = path.join(DATA_DIR, 'movies.json');
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

// Read JSON file
const readJsonFile = async (filePath, defaultData = []) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is invalid, return default data
    await writeJsonFile(filePath, defaultData);
    return defaultData;
  }
};

// Write JSON file
const writeJsonFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Generate unique ID
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Initialize data files with default data
const initializeData = async () => {
  await ensureDataDir();
  
  // Initialize movies with sample data
  const defaultMovies = [
    {
      _id: 'movie_1',
      title: 'The Dark Knight',
      year: 2008,
      imdbScore: 9.0,
      rottenTomatoScore: 94,
      posterUrl: 'https://images.unsplash.com/photo-1489599288846-c0c1a3b1c2c3?w=300&h=400&fit=crop',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: 'movie_2',
      title: 'Inception',
      year: 2010,
      imdbScore: 8.8,
      rottenTomatoScore: 87,
      posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=400&fit=crop',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: 'movie_3',
      title: 'Interstellar',
      year: 2014,
      imdbScore: 8.6,
      rottenTomatoScore: 72,
      posterUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Initialize profiles with sample data
  const defaultProfiles = [
    {
      _id: 'profile_1',
      firstName: 'จักรพันธุ์',
      lastName: 'ฤทธิแผลง',
      nickname: 'บอล',
      profileImage: '/images/student-photo-01.png',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: 'profile_2',
      firstName: 'พยุงศักดิ์',
      lastName: 'ฟูกุนนา',
      nickname: 'เอิร์ธ',
      profileImage: '/images/student-photo-02.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  await readJsonFile(MOVIES_FILE, defaultMovies);
  await readJsonFile(PROFILES_FILE, defaultProfiles);
};

// Routes

// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await readJsonFile(MOVIES_FILE, []);
    // Sort by createdAt descending
    movies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(movies);
  } catch (error) {
    console.error('Error reading movies:', error);
    res.status(500).json({ message: 'Error reading movies data' });
  }
});

// Get single movie
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movies = await readJsonFile(MOVIES_FILE, []);
    const movie = movies.find(m => m._id === req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (error) {
    console.error('Error reading movie:', error);
    res.status(500).json({ message: 'Error reading movie data' });
  }
});

// Create new movie
app.post('/api/movies', async (req, res) => {
  try {
    const { title, year, imdbScore, rottenTomatoScore, posterUrl } = req.body;
    
    // Validation
    if (!title || !year || !imdbScore || !rottenTomatoScore || !posterUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (year < 1900 || year > new Date().getFullYear() + 5) {
      return res.status(400).json({ message: 'Invalid year' });
    }

    if (imdbScore < 0 || imdbScore > 10) {
      return res.status(400).json({ message: 'IMDB score must be between 0 and 10' });
    }

    if (rottenTomatoScore < 0 || rottenTomatoScore > 100) {
      return res.status(400).json({ message: 'Rotten Tomatoes score must be between 0 and 100' });
    }

    const movies = await readJsonFile(MOVIES_FILE, []);
    
    const newMovie = {
      _id: generateId(),
      title,
      year: parseInt(year),
      imdbScore: parseFloat(imdbScore),
      rottenTomatoScore: parseInt(rottenTomatoScore),
      posterUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    movies.push(newMovie);
    await writeJsonFile(MOVIES_FILE, movies);
    
    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).json({ message: 'Error creating movie' });
  }
});

// Update movie
app.put('/api/movies/:id', async (req, res) => {
  try {
    const movies = await readJsonFile(MOVIES_FILE, []);
    const movieIndex = movies.findIndex(m => m._id === req.params.id);
    
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const { title, year, imdbScore, rottenTomatoScore, posterUrl } = req.body;
    
    // Validation
    if (!title || !year || !imdbScore || !rottenTomatoScore || !posterUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Update movie
    movies[movieIndex] = {
      ...movies[movieIndex],
      title,
      year: parseInt(year),
      imdbScore: parseFloat(imdbScore),
      rottenTomatoScore: parseInt(rottenTomatoScore),
      posterUrl,
      updatedAt: new Date().toISOString()
    };

    await writeJsonFile(MOVIES_FILE, movies);
    res.json(movies[movieIndex]);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ message: 'Error updating movie' });
  }
});

// Delete movie
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const movies = await readJsonFile(MOVIES_FILE, []);
    const movieIndex = movies.findIndex(m => m._id === req.params.id);
    
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    movies.splice(movieIndex, 1);
    await writeJsonFile(MOVIES_FILE, movies);
    
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: 'Error deleting movie' });
  }
});

// Get profile
app.get('/api/profile', async (req, res) => {
  try {
    const profiles = await readJsonFile(PROFILES_FILE, []);
    res.json(profiles);
  } catch (error) {
    console.error('Error reading profiles:', error);
    res.status(500).json({ message: 'Error reading profile data' });
  }
});

// Update profile
app.put('/api/profile/:id', async (req, res) => {
  try {
    const profiles = await readJsonFile(PROFILES_FILE, []);
    const profileIndex = profiles.findIndex(p => p._id === req.params.id);
    
    if (profileIndex === -1) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const { firstName, lastName, nickname, profileImage } = req.body;
    
    profiles[profileIndex] = {
      ...profiles[profileIndex],
      firstName,
      lastName,
      nickname,
      profileImage,
      updatedAt: new Date().toISOString()
    };

    await writeJsonFile(PROFILES_FILE, profiles);
    res.json(profiles[profileIndex]);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    storage: 'JSON Files',
    dataPath: DATA_DIR
  });
});

// Get data statistics
app.get('/api/stats', async (req, res) => {
  try {
    const movies = await readJsonFile(MOVIES_FILE, []);
    const profiles = await readJsonFile(PROFILES_FILE, []);
    
    res.json({
      movies: {
        count: movies.length,
        averageImdbScore: movies.length > 0 ? (movies.reduce((sum, m) => sum + m.imdbScore, 0) / movies.length).toFixed(1) : 0,
        averageRTScore: movies.length > 0 ? Math.round(movies.reduce((sum, m) => sum + m.rottenTomatoScore, 0) / movies.length) : 0
      },
      profiles: {
        count: profiles.length
      },
      storage: 'JSON Files'
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ message: 'Error getting statistics' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Initialize data and start server
const startServer = async () => {
  try {
    await initializeData();
    console.log('Data files initialized successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Using JSON file storage in: ${DATA_DIR}`);
      console.log(`Movies file: ${MOVIES_FILE}`);
      console.log(`Profiles file: ${PROFILES_FILE}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;