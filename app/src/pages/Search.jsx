import { useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      // 1. Search from TMDB
      const tmdbRes = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=e3e6f40e29cab31a02e375dc097b9d73&query=${query}`
      );
      setResults(tmdbRes.data.results);
      setSearched(true);

      // 2. Save search to backend
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.email && user?.name) {
        await axios.post(`${API}/search`, {
          query,
          userName: user.name,
          userEmail: user.email,
        });
      } else {
        console.warn('User not logged in, search not saved.');
      }
    } catch (err) {
      console.error('Search or save failed:', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start pt-32 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-cyan-400">🔍 Search Movies</h1>
        <p className="text-slate-400 mt-2">Your searches are automatically saved</p>
      </div>

      {/* Search Input */}
      <div className="w-full max-w-2xl flex mb-10 rounded overflow-hidden shadow-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter movie title..."
          className="w-full px-5 py-3 text-slate-900 placeholder:text-slate-500 bg-slate-100 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="w-full max-w-7xl px-4">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {results.map((movie) => (
              <div
                key={movie.id}
                className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition duration-300"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg md:text-xl font-bold text-cyan-300">{movie.title}</h2>
                  <p className="text-sm text-gray-300 line-clamp-3 mt-1">
                    {movie.overview || 'No description available.'}
                  </p>
                  <div className="mt-2 text-sm flex justify-between items-center text-gray-400">
                    <span>⭐ {movie.vote_average?.toFixed(1) || 'N/A'} / 10</span>
                    <span>📅 {movie.release_date?.split('-')[0] || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          searched && (
            <p className="text-center text-slate-400 text-lg mt-20">
              No movies found. Try another title.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Search;
