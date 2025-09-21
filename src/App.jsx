import React, { useState } from 'react';
import { Header } from './components/Header';
import { GenreSelector } from './components/GenreSelector';
import { MovieGrid } from './components/MovieGrid';
import { BackendStatus } from './components/BackendStatus';
import { LikedMoviesPanel } from './components/LikedMoviesPanel';
import { useMovies } from './hooks/useMovies';

function App() {
  const {
    movies,
    genres,
    loading,
    error,
    selectedGenres,
    likedMovies,
    getRecommendations,
    getPersonalizedRecommendations,
    toggleLikeMovie,
    isMovieLiked,
    searchMovies,
    loadPopularMovies,
  } = useMovies();

  const [localSelectedGenres, setLocalSelectedGenres] = useState([]);
  const [isLikedPanelOpen, setIsLikedPanelOpen] = useState(false);

  console.log('App render - movies:', movies.length, 'genres:', genres.length, 'loading:', loading, 'error:', error);

  const handleGenreToggle = (genre) => {
    setLocalSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleGetRecommendations = () => {
    getRecommendations(localSelectedGenres);
  };

  const handleClearAll = () => {
    setLocalSelectedGenres([]);
    loadPopularMovies();
  };

  const handleSearch = (query) => {
    setLocalSelectedGenres([]);
    searchMovies(query);
  };

  const handleShowPopular = () => {
    setLocalSelectedGenres([]);
    loadPopularMovies();
  };

  const handleGetPersonalizedRecommendations = () => {
    getPersonalizedRecommendations();
    setIsLikedPanelOpen(false);
  };

  // Show current recommendation type
  const getRecommendationType = () => {
    if (likedMovies.length > 0 && selectedGenres.length === 0) {
      return `Personalized for You (${likedMovies.length} liked movies)`;
    }
    if (selectedGenres.length > 0) {
      return 'Genre-Based Recommendations';
    }
    return 'Popular Movies';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <Header onSearch={handleSearch} onShowPopular={handleShowPopular} />

      {/* Liked Movies Panel */}
      <LikedMoviesPanel
        likedMovies={likedMovies}
        onToggleLike={toggleLikeMovie}
        onGetPersonalizedRecommendations={handleGetPersonalizedRecommendations}
        isOpen={isLikedPanelOpen}
        onToggle={() => setIsLikedPanelOpen(!isLikedPanelOpen)}
      />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Backend Status */}
        <div className="flex justify-end">
          <BackendStatus />
        </div>

        {/* Welcome Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
            Discover Amazing Movies
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get personalized movie recommendations powered by machine learning. 
            Select your favorite genres, like movies you enjoy, and discover your next favorite film.
          </p>
        </div>

        {/* Genre Selector */}
        {!loading && genres.length > 0 && (
          <GenreSelector
            genres={genres}
            selectedGenres={localSelectedGenres}
            onGenreToggle={handleGenreToggle}
            onGetRecommendations={handleGetRecommendations}
            onClearAll={handleClearAll}
          />
        )}

        {/* Movie Grid */}
        <MovieGrid
          movies={movies}
          loading={loading}
          error={error}
          title={getRecommendationType()}
          selectedGenres={selectedGenres}
          onToggleLike={toggleLikeMovie}
          isMovieLiked={isMovieLiked}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-400">
            <p className="mb-2">Powered by Machine Learning & TMDB Dataset</p>
            <p className="text-sm">Built with React, JavaScript, Flask & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;