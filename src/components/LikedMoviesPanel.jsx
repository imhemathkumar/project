import React from 'react';
import { Heart, X, Sparkles } from 'lucide-react';

export function LikedMoviesPanel({ 
  likedMovies, 
  onToggleLike, 
  onGetPersonalizedRecommendations,
  isOpen,
  onToggle 
}) {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed top-20 right-4 z-40 p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
          likedMovies.length > 0
            ? 'bg-red-500/80 text-white hover:bg-red-600/80'
            : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700/80'
        }`}
        title={`Liked Movies (${likedMovies.length})`}
      >
        <Heart className={`h-5 w-5 ${likedMovies.length > 0 ? 'fill-current' : ''}`} />
        {likedMovies.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {likedMovies.length}
          </span>
        )}
      </button>

      {/* Slide-out Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-sm border-l border-slate-700/50 z-30 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-400 fill-current" />
              <h2 className="text-xl font-bold text-white">Liked Movies</h2>
              <span className="bg-red-500/20 text-red-300 text-sm px-2 py-1 rounded-full">
                {likedMovies.length}
              </span>
            </div>
            <button
              onClick={onToggle}
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Get Recommendations Button */}
          {likedMovies.length > 0 && (
            <button
              onClick={onGetPersonalizedRecommendations}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg mb-6 flex items-center justify-center space-x-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Refresh Recommendations</span>
            </button>
          )}

          {/* Liked Movies List */}
          <div className="flex-1 overflow-y-auto">
            {likedMovies.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 mb-2">No liked movies yet</p>
                <p className="text-slate-500 text-sm">
                  Click the heart icon on movies you enjoy to get automatic personalized recommendations
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {likedMovies.map((movie, index) => (
                  <div
                    key={`${movie.title}-${index}`}
                    className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">
                          {movie.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-xs text-slate-400 mb-2">
                          <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                          <span>•</span>
                          <span>★ {Number(movie.vote_average).toFixed(1)}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {movie.genres.slice(0, 2).map((genre, genreIndex) => (
                            <span
                              key={genreIndex}
                              className="inline-block bg-slate-700/50 text-slate-300 text-xs px-2 py-1 rounded-full"
                            >
                              {genre}
                            </span>
                          ))}
                          {movie.genres.length > 2 && (
                            <span className="inline-block bg-slate-700/50 text-slate-400 text-xs px-2 py-1 rounded-full">
                              +{movie.genres.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => onToggleLike(movie)}
                        className="ml-2 p-1 text-red-400 hover:text-red-300 transition-colors duration-200"
                        title="Remove from liked movies"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={onToggle}
        />
      )}
    </>
  );
}