import React from 'react';
import { Star, Calendar, TrendingUp, ExternalLink, Heart } from 'lucide-react';

export function MovieCard({ movie, isLiked, onToggleLike }) {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = Number(movie.vote_average).toFixed(1);
  const hasHomepage = movie.homepage && movie.homepage.trim() !== '';
  
  const handleTitleClick = (e) => {
    if (hasHomepage) {
      e.preventDefault();
      window.open(movie.homepage, '_blank', 'noopener,noreferrer');
    }
  };
  
  const handleLikeClick = (e) => {
    e.stopPropagation();
    onToggleLike(movie);
  };
  
  return (
    <div className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
      {/* Movie Poster Placeholder */}
      <div className="aspect-[2/3] bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4">
            {hasHomepage ? (
              <h3 
                className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-300 transition-colors duration-200 cursor-pointer hover:underline flex items-center justify-center gap-1"
                onClick={handleTitleClick}
                title="Click to visit movie homepage"
              >
                {movie.title}
                <ExternalLink className="h-3 w-3 opacity-70" />
              </h3>
            ) : (
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-300 transition-colors duration-200">
                {movie.title}
              </h3>
            )}
            <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-2">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </div>

        {/* Like Button */}
        <div className="absolute top-2 left-2">
          <button
            onClick={handleLikeClick}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
              isLiked
                ? 'bg-red-500/80 text-white hover:bg-red-600/80'
                : 'bg-black/50 text-white hover:bg-black/70 hover:text-red-400'
            }`}
            title={isLiked ? 'Unlike this movie' : 'Like this movie'}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1 text-slate-400">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">{releaseYear}</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-400">
            <TrendingUp className="h-3 w-3" />
            <span className="text-xs">{Math.round(movie.popularity)}</span>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genres.slice(0, 3).map((genre, index) => (
            <span
              key={index}
              className="inline-block bg-slate-700/50 text-slate-300 text-xs px-2 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
          {movie.genres.length > 3 && (
            <span className="inline-block bg-slate-700/50 text-slate-400 text-xs px-2 py-1 rounded-full">
              +{movie.genres.length - 3}
            </span>
          )}
        </div>

        {/* Overview */}
        {movie.overview && (
          <p className="text-slate-400 text-xs line-clamp-3 group-hover:text-slate-300 transition-colors duration-200">
            {movie.overview}
          </p>
        )}
      </div>
    </div>
  );
}