import React, { useState, useEffect } from 'react';
import { Server, AlertTriangle, CheckCircle } from 'lucide-react';
import { apiService } from '../services/api';

export function BackendStatus() {
  const [status, setStatus] = useState('checking');
  const [movieCount, setMovieCount] = useState(0);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        console.log('Checking backend status...');
        const response = await apiService.healthCheck();
        console.log('Backend response:', response);
        setStatus('connected');
        setMovieCount(response.movies_count || 0);
      } catch (error) {
        console.error('Backend check failed:', error);
        setStatus('error');
        setMovieCount(0);
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Server className="h-4 w-4 animate-pulse" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected': return `Connected (${movieCount.toLocaleString()} movies)`;
      case 'error': return 'Backend not available';
      default: return 'Connecting...';
    }
  };

  return (
    <div className={`flex items-center space-x-2 text-sm ${getStatusColor()}`}>
      {getStatusIcon()}
      <span>{getStatusText()}</span>
    </div>
  );
}