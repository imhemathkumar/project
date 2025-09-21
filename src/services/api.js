const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async fetchWithError(url, options) {
    try {
      console.log(`Making API request to: ${API_BASE_URL}${url}`);
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`API response for ${url}:`, data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getGenres() {
    return this.fetchWithError('/genres');
  }

  async getRecommendations(request) {
    return this.fetchWithError('/movies/recommend', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getPersonalizedRecommendations(request) {
    return this.fetchWithError('/movies/personalized', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }
  async getPopularMovies(limit = 20) {
    return this.fetchWithError(`/movies/popular?limit=${limit}`);
  }

  async searchMovies(query, limit = 20) {
    return this.fetchWithError(`/movies/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  }

  async healthCheck() {
    return this.fetchWithError('/health');
  }
}

export const apiService = new ApiService();