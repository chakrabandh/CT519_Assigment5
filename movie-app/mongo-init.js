// mongo-init.js
// MongoDB initialization script

// Switch to moviedb database
db = db.getSiblingDB('moviedb');

// Create collections
db.createCollection('movies');
db.createCollection('profiles');

// Insert sample movies
db.movies.insertMany([
  {
    title: 'The Dark Knight',
    year: 2008,
    imdbScore: 9.0,
    rottenTomatoScore: 94,
    posterUrl: 'https://images.unsplash.com/photo-1489599288846-c0c1a3b1c2c3?w=300&h=400&fit=crop',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Inception',
    year: 2010,
    imdbScore: 8.8,
    rottenTomatoScore: 87,
    posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=400&fit=crop',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Interstellar',
    year: 2014,
    imdbScore: 8.6,
    rottenTomatoScore: 72,
    posterUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Insert default profiles
db.profiles.insertMany([
  {
    firstName: 'จอห์น',
    lastName: 'สมิธ',
    nickname: 'โจ',
    profileImage: '/images/student-photo-01.png',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'เจน',
    lastName: 'โดย์',
    nickname: 'เจนนี่',
    profileImage: '/images/student-photo-02.png',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create indexes for better performance
db.movies.createIndex({ title: 1 });
db.movies.createIndex({ year: -1 });
db.movies.createIndex({ createdAt: -1 });

print('Database initialized successfully with sample data!');