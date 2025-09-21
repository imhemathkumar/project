import React, { useState } from 'react';
import { Search, Film, Sparkles } from 'lucide-react';

export function Header({ onSearch, onShowPopular }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    onShowPopular();
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={handleLogoClick}
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-lg">
              <Film className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">MovieFlix</span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </form>

          {/* Popular Button */}
          <button
            onClick={onShowPopular}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Popular</span>
          </button>
        </div>
      </div>
    </header>
  );
}