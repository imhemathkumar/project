from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import ast
import random
from collections import Counter

app = Flask(__name__)
CORS(app)

# Global variable to store processed movies data
movies_df = None

def load_and_process_movies(file_path):
    """Load movies CSV and preprocess genres into lists."""
    try:
        movies = pd.read_csv(file_path, low_memory=False)
        movies = movies[['title', 'genres', 'vote_average', 'popularity', 'overview', 'release_date', 'homepage']].dropna(subset=['title', 'genres'])
        
        def extract_genres(x):
            try:
                lst = ast.literal_eval(x)
                return [g['name'] for g in lst]
            except:
                return []
        
        movies['genres'] = movies['genres'].apply(extract_genres)
        movies = movies[movies['genres'].apply(len) > 0]  # Remove movies with no genres
        
        # Fill missing values
        movies['overview'] = movies['overview'].fillna('')
        movies['release_date'] = movies['release_date'].fillna('')
        movies['homepage'] = movies['homepage'].fillna('')
        movies['vote_average'] = movies['vote_average'].fillna(0)
        movies['popularity'] = movies['popularity'].fillna(0)
        
        return movies
    except Exception as e:
        print(f"Error loading movies: {e}")
        return pd.DataFrame()

def get_all_genres(movies):
    """Return a sorted list of all genres in the dataset."""
    if movies.empty:
        return []
    return sorted({g for sub in movies['genres'] for g in sub if g})

def recommend_movies(movies, selected_genres=None, top_n=20, match_all=False):
    """Return top N movies that match genres, sorted by rating and popularity."""
    if movies.empty:
        return []
    
    df = movies.copy()
    
    if selected_genres:
        if match_all:
            df = df[df['genres'].apply(lambda g: all(sg in g for sg in selected_genres))]
        else:
            df = df[df['genres'].apply(lambda g: any(sg in g for sg in selected_genres))]
    
    if df.empty:
        return []
    
    # Sort by vote_average (descending) and popularity (descending)
    df = df.sort_values(['vote_average', 'popularity'], ascending=[False, False])
    
    # Take top movies and then randomize to add variety
    top_movies = df.head(min(top_n * 2, len(df)))
    result = top_movies.sample(min(top_n, len(top_movies)))
    
    return result.to_dict('records')

def get_personalized_recommendations(movies, liked_movies, top_n=20):
    """Get personalized recommendations based on liked movies' characteristics."""
    if movies.empty or not liked_movies:
        return []
    
    # Extract characteristics from liked movies
    liked_genres = []
    liked_titles = set()
    
    for movie in liked_movies:
        liked_genres.extend(movie.get('genres', []))
        liked_titles.add(movie.get('title', ''))
    
    # Count genre preferences
    genre_counts = Counter(liked_genres)
    preferred_genres = [genre for genre, count in genre_counts.most_common()]
    
    if not preferred_genres:
        return []
    
    # Score movies based on genre overlap and quality
    df = movies.copy()
    
    # Exclude already liked movies
    df = df[~df['title'].isin(liked_titles)]
    
    def calculate_score(row):
        movie_genres = row['genres']
        
        # Genre similarity score (weighted by preference)
        genre_score = 0
        for genre in movie_genres:
            if genre in genre_counts:
                # Weight by how often this genre appears in liked movies
                genre_score += genre_counts[genre] / len(liked_movies)
        
        # Normalize genre score
        if len(movie_genres) > 0:
            genre_score = genre_score / len(movie_genres)
        
        # Quality score (rating and popularity)
        rating_score = row['vote_average'] / 10.0
        popularity_score = min(row['popularity'] / 1000.0, 1.0)  # Cap at 1.0
        
        # Combined score (genre similarity is most important)
        total_score = (genre_score * 0.6) + (rating_score * 0.3) + (popularity_score * 0.1)
        
        return total_score
    
    # Calculate scores for all movies
    df['recommendation_score'] = df.apply(calculate_score, axis=1)
    
    # Filter movies that have at least some genre overlap
    df = df[df['recommendation_score'] > 0]
    
    if df.empty:
        return []
    
    # Sort by recommendation score and take top movies
    df = df.sort_values('recommendation_score', ascending=False)
    
    # Add some randomization to avoid always showing the same movies
    top_candidates = df.head(min(top_n * 3, len(df)))
    result = top_candidates.sample(min(top_n, len(top_candidates)))
    
    return result.to_dict('records')

def initialize():
    """Load movies at startup."""
    global movies_df
    movies_df = load_and_process_movies("tmdb_5000_movies.csv")
    print(f"Loaded {len(movies_df)} movies")

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({"status": "healthy", "movies_count": len(movies_df) if movies_df is not None else 0})

@app.route('/api/genres', methods=['GET'])
def get_genres():
    """Get all available genres."""
    try:
        if movies_df is None or movies_df.empty:
            return jsonify({"error": "No movie data available"}), 500
        
        genres = get_all_genres(movies_df)
        return jsonify({"genres": genres})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/movies/recommend', methods=['POST'])
def get_recommendations():
    """Get movie recommendations based on selected genres."""
    try:
        if movies_df is None or movies_df.empty:
            return jsonify({"error": "No movie data available"}), 500
        
        data = request.get_json()
        selected_genres = data.get('genres', [])
        top_n = data.get('limit', 20)
        match_all = data.get('match_all', False)
        
        recommendations = recommend_movies(movies_df, selected_genres, top_n, match_all)
        
        return jsonify({
            "movies": recommendations,
            "total": len(recommendations),
            "selected_genres": selected_genres
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/movies/personalized', methods=['POST'])
def get_personalized_recommendations_endpoint():
    """Get personalized movie recommendations based on liked movies."""
    try:
        if movies_df is None or movies_df.empty:
            return jsonify({"error": "No movie data available"}), 500
        
        data = request.get_json()
        liked_movies = data.get('liked_movies', [])
        top_n = data.get('limit', 20)
        
        if not liked_movies:
            return jsonify({"error": "No liked movies provided"}), 400
        
        recommendations = get_personalized_recommendations(movies_df, liked_movies, top_n)
        
        return jsonify({
            "movies": recommendations,
            "total": len(recommendations),
            "based_on": len(liked_movies)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/movies/popular', methods=['GET'])
def get_popular_movies():
    """Get popular movies (default recommendations)."""
    try:
        if movies_df is None or movies_df.empty:
            return jsonify({"error": "No movie data available"}), 500
        
        limit = request.args.get('limit', 20, type=int)
        popular_movies = recommend_movies(movies_df, None, limit, False)
        
        return jsonify({
            "movies": popular_movies,
            "total": len(popular_movies)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/movies/search', methods=['GET'])
def search_movies():
    """Search movies by title."""
    try:
        if movies_df is None or movies_df.empty:
            return jsonify({"error": "No movie data available"}), 500
        
        query = request.args.get('q', '').strip().lower()
        limit = request.args.get('limit', 20, type=int)
        
        if not query:
            return jsonify({"movies": [], "total": 0})
        
        # Filter movies by title containing the search query
        filtered_movies = movies_df[movies_df['title'].str.lower().str.contains(query, na=False)]
        
        if filtered_movies.empty:
            return jsonify({"movies": [], "total": 0})
        
        # Sort by rating and popularity
        filtered_movies = filtered_movies.sort_values(['vote_average', 'popularity'], ascending=[False, False])
        result = filtered_movies.head(limit).to_dict('records')
        
        return jsonify({
            "movies": result,
            "total": len(result),
            "query": query
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    initialize()  # ✅ Load dataset at startup
    app.run(debug=True, host='0.0.0.0', port=5000)