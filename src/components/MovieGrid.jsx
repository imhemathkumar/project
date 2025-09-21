import React from 'react';
import { MovieCard } from './MovieCard';
import { LoadingSpinner } from './LoadingSpinner';
import { AlertCircle, Film } from 'lucide-react';

export function MovieGrid({ movies, loading, error, title, selectedGenres, onToggleLike, isMovieLiked }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700/50">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>
        <p className="text-slate-400">{error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700/50">
        <Film className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No movies found</h3>
        <p className="text-slate-400">
          Try adjusting your search criteria or selecting different genres.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title and Genre Info */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {title || (selectedGenres?.length ? 'Recommended Movies' : 'Popular Movies')}
        </h2>
        <div className="text-slate-400 text-sm">
          {movies.length} movie{movies.length !== 1 ? 's' : ''}
        </div>
      </div>

      {selectedGenres && selectedGenres.length > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 text-sm">Based on genres:</span>
          <div className="flex flex-wrap gap-1">
            {selectedGenres.map((genre, index) => (
              <span
                key={index}
                className="inline-block bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full border border-red-500/30"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <div
            key={`${movie.title}-${index}`}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <MovieCard 
              movie={movie} 
              isLiked={isMovieLiked(movie)}
              onToggleLike={onToggleLike}
            />
          </div>
        ))}
      </div>
    </div>
  );
}