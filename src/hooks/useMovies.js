import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);

  // Load initial data
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        setError(null);
        
        // Load genres first
        const genresData = await apiService.getGenres();
        setGenres(genresData.genres || []);
        
        // Then load popular movies
        const popularMovies = await apiService.getPopularMovies(24);
        setMovies(popularMovies.movies || []);
        
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
        // Set empty arrays on error so UI can still render
        setGenres([]);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // Load liked movies from localStorage on mount
  useEffect(() => {
    const savedLikedMovies = localStorage.getItem('likedMovies');
    if (savedLikedMovies) {
      try {
        setLikedMovies(JSON.parse(savedLikedMovies));
      } catch (err) {
        console.error('Error loading liked movies:', err);
      }
    }
  }, []);

  // Save liked movies to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
  }, [likedMovies]);

  const getRecommendations = async (genresList) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getRecommendations({
        genres: genresList,
        limit: 24,
        match_all: false
      });
      
      setMovies(response.movies || []);
      setSelectedGenres(genresList);
    } catch (err) {
      console.error('Error getting recommendations:', err);
      setError(err instanceof Error ? err.message : 'Failed to get recommendations');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const getPersonalizedRecommendations = async () => {
    if (likedMovies.length === 0) {
      setError('Please like some movies first to get personalized recommendations');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getPersonalizedRecommendations({
        liked_movies: likedMovies,
        limit: 24
      });
      
      setMovies(response.movies || []);
      setSelectedGenres([]);
    } catch (err) {
      console.error('Error getting personalized recommendations:', err);
      setError(err instanceof Error ? err.message : 'Failed to get personalized recommendations');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleLikeMovie = (movie) => {
    setLikedMovies(prev => {
      const isAlreadyLiked = prev.some(liked => liked.title === movie.title);
      if (isAlreadyLiked) {
        return prev.filter(liked => liked.title !== movie.title);
      } else {
        const newLikedMovies = [...prev, movie];
        // Automatically get personalized recommendations when liking a movie
        if (newLikedMovies.length >= 1) {
          setTimeout(() => {
            getPersonalizedRecommendationsForMovies(newLikedMovies);
          }, 100);
        }
        return newLikedMovies;
      }
    });
  };

  const getPersonalizedRecommendationsForMovies = async (likedMoviesList) => {
    if (likedMoviesList.length === 0) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getPersonalizedRecommendations({
        liked_movies: likedMoviesList,
        limit: 24
      });
      
      setMovies(response.movies || []);
      setSelectedGenres([]);
    } catch (err) {
      console.error('Error getting automatic personalized recommendations:', err);
      // Don't set error for automatic recommendations to avoid disrupting UX
    } finally {
      setLoading(false);
    }
  };

  const isMovieLiked = (movie) => {
    return likedMovies.some(liked => liked.title === movie.title);
  };

  const searchMovies = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!query.trim()) {
        const popularMovies = await apiService.getPopularMovies(24);
        setMovies(popularMovies.movies || []);
        setSelectedGenres([]);
        return;
      }
      
      const response = await apiService.searchMovies(query, 24);
      setMovies(response.movies || []);
      setSelectedGenres([]);
    } catch (err) {
      console.error('Error searching movies:', err);
      setError(err instanceof Error ? err.message : 'Failed to search movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getPopularMovies(24);
      setMovies(response.movies || []);
      setSelectedGenres([]);
    } catch (err) {
      console.error('Error loading popular movies:', err);
      setError(err instanceof Error ? err.message : 'Failed to load popular movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}