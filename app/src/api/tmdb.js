// src/api/tmdb.js
const API_KEY = 'e3e6f40e29cab31a02e375dc097b9d73';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  return res.json();
};

export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  return res.json();
};

export const fetchRecommendedMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  return res.json();
};

export const fetchMoviesByGenre = async (genreId) => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  return res.json();
};