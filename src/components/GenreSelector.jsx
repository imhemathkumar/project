import React from 'react';
import { X } from 'lucide-react';

export function GenreSelector({
  genres,
  selectedGenres,
  onGenreToggle,
  onGetRecommendations,
  onClearAll,
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
          <span>Select Your Favorite Genres</span>
        </h2>
        {selectedGenres.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors duration-200"
          >
            <X className="h-4 w-4" />
            <span className="text-sm">Clear All</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <button
              key={genre}
              onClick={() => onGenreToggle(genre)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105
                ${isSelected
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                }
              `}
            >
              {genre}
            </button>
          );
        })}
      </div>

      {selectedGenres.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">
            {selectedGenres.length} genre{selectedGenres.length !== 1 ? 's' : ''} selected
          </div>
          <button
            onClick={onGetRecommendations}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Get Recommendations
          </button>
        </div>
      )}
    </div>
  );
}