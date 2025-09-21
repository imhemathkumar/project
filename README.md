# 🎬 Machine Learning Movie Recommendation System

A modern, full-stack movie recommendation system powered by machine learning algorithms and built with React and Flask. Get personalized movie recommendations based on your preferences and viewing history.

![Movie Recommendation System](https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

- **🤖 Machine Learning Recommendations**: Advanced algorithms analyze your preferences to suggest movies you'll love
- **🎭 Genre-Based Filtering**: Select your favorite genres to get targeted recommendations
- **❤️ Personal Movie Library**: Like movies to build your taste profile and get personalized suggestions
- **🔍 Smart Search**: Find movies by title with intelligent search functionality
- **📱 Responsive Design**: Beautiful, mobile-first design that works on all devices
- **⚡ Real-time Updates**: Instant recommendations as you interact with the system
- **🎨 Modern UI**: Sleek interface with smooth animations and micro-interactions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

### Backend
- **Flask** - Lightweight Python web framework
- **Pandas** - Data manipulation and analysis
- **Flask-CORS** - Cross-origin resource sharing
- **Python 3.8+** - Backend runtime

### Dataset
- **TMDB 5000 Movies Dataset** - Comprehensive movie database with genres, ratings, and metadata

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **pip** (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie-recommendation-system
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Set up Backend Environment**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Download Dataset**
   - Download the TMDB 5000 Movies dataset
   - Place `tmdb_5000_movies.csv` in the `backend/` directory
   - The dataset should contain columns: title, genres, vote_average, popularity, overview, release_date, homepage

### Running the Application

#### Start the Backend Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Flask server:
   ```bash
   python app.py
   ```

   The backend will start on `http://localhost:5000`

#### Start the Frontend Development Server

1. In a new terminal, navigate to the project root:
   ```bash
   cd ..  # if you're in the backend directory
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

3. Open your browser and visit `http://localhost:5173`

## 📖 Usage Guide

### Getting Recommendations

1. **Popular Movies**: Browse trending and highly-rated movies on the homepage
2. **Genre-Based**: Select your favorite genres and click "Get Recommendations"
3. **Personalized**: Like movies by clicking the heart icon to get AI-powered personal recommendations
4. **Search**: Use the search bar to find specific movies

### Features Walkthrough

- **❤️ Like System**: Click the heart icon on any movie to add it to your favorites
- **🎯 Smart Recommendations**: The more movies you like, the better your personalized recommendations become
- **📱 Liked Movies Panel**: Click the heart button in the top-right to view and manage your liked movies
- **🔄 Real-time Updates**: Recommendations update automatically as you interact with movies

## 🏗️ Project Structure

```
movie-recommendation-system/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Navigation and search
│   │   ├── MovieCard.jsx    # Individual movie display
│   │   ├── MovieGrid.jsx    # Movie grid layout
│   │   ├── GenreSelector.jsx # Genre selection interface
│   │   ├── LikedMoviesPanel.jsx # Liked movies sidebar
│   │   ├── BackendStatus.jsx # API connection status
│   │   └── LoadingSpinner.jsx # Loading animations
│   ├── hooks/
│   │   └── useMovies.js     # Custom hook for movie data
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles and animations
├── backend/
│   ├── app.py               # Flask application and ML algorithms
│   ├── requirements.txt     # Python dependencies
│   └── tmdb_5000_movies.csv # Movie dataset (not included)
├── public/                  # Static assets
├── package.json             # Node.js dependencies and scripts
└── README.md               # Project documentation
```

## 🤖 Machine Learning Features

### Recommendation Algorithms

1. **Genre-Based Filtering**
   - Matches movies based on selected genres
   - Weighted by rating and popularity
   - Includes randomization for variety

2. **Personalized Recommendations**
   - Analyzes liked movies to understand preferences
   - Calculates genre preference weights
   - Combines similarity scoring with quality metrics
   - Excludes already-liked movies

3. **Hybrid Scoring System**
   - Genre similarity: 60% weight
   - Movie rating: 30% weight  
   - Popularity: 10% weight

## 🔧 API Endpoints

### Backend API Routes

- `GET /api/health` - Health check and system status
- `GET /api/genres` - Get all available movie genres
- `POST /api/movies/recommend` - Get genre-based recommendations
- `POST /api/movies/personalized` - Get personalized recommendations
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/search` - Search movies by title

### Example API Usage

```javascript
// Get personalized recommendations
const response = await fetch('http://localhost:5000/api/movies/personalized', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    liked_movies: [...],
    limit: 20
  })
});
```

## 🎨 Customization

### Styling
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme customization
- Component styles use Tailwind CSS classes

### Recommendation Logic
- Adjust weights in `backend/app.py` functions
- Modify scoring algorithms for different recommendation strategies
- Add new recommendation endpoints as needed

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment
- Deploy Flask app to services like Heroku, Railway, or DigitalOcean
- Ensure dataset file is included in deployment
- Set environment variables for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](#license) section below for details.

## 🙏 Acknowledgments

- **TMDB** for providing the comprehensive movie dataset
- **React Team** for the amazing frontend framework
- **Flask Team** for the lightweight backend framework
- **Tailwind CSS** for the utility-first styling approach

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) section
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Movie ratings and reviews
- [ ] Social features (share recommendations)
- [ ] Advanced ML models (collaborative filtering)
- [ ] Movie trailers and additional metadata
- [ ] Watchlist functionality
- [ ] Export recommendations

---

## License

MIT License

Copyright (c) 2025 Movie Recommendation System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

**Built with ❤️ for movie lovers everywhere** 🍿
