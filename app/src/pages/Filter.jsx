import { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = () => {
  const [genreMovies, setGenreMovies] = useState([]);
  const [genre, setGenre] = useState('28'); // Default: Action
  const [language, setLanguage] = useState('en');
  const [year, setYear] = useState(new Date().getFullYear());

  const genres = [
    { id: '28', name: 'Action' },
    { id: '35', name: 'Comedy' },
    { id: '18', name: 'Drama' },
    { id: '10749', name: 'Romance' },
    { id: '27', name: 'Horror' },
    { id: '16', name: 'Animation' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'fr', name: 'French' },
  ];

  const years = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i);

  const fetchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=e3e6f40e29cab31a02e375dc097b9d73&with_genres=${genre}&language=${language}&primary_release_year=${year}`
      )
      .then(res => setGenreMovies(res.data.results))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchMovies();
  }, [genre, language, year]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 md:px-10 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-emerald-400 drop-shadow-lg">
        🎯 Discover by Filter
      </h1>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        <select
          value={genre}
          onChange={e => setGenre(e.target.value)}
          className="bg-white text-slate-800 font-medium px-4 py-2 rounded-lg border border-emerald-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {genres.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="bg-white text-slate-800 font-medium px-4 py-2 rounded-lg border border-cyan-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>

        <select
          value={year}
          onChange={e => setYear(e.target.value)}
          className="bg-white text-slate-800 font-medium px-4 py-2 rounded-lg border border-rose-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Movie Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {genreMovies.length > 0 ? (
          genreMovies.map(movie => (
            <div
              key={movie.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/30 transition duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg md:text-xl font-bold text-emerald-300">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-300 line-clamp-3 mt-1">
                  {movie.overview || 'No description available.'}
                </p>
                <div className="mt-2 text-sm flex justify-between items-center text-gray-400">
                  <span>
                    ⭐ {movie.vote_average.toFixed(1)} / 10
                  </span>
                  <span>
                    📅 {movie.release_date?.split('-')[0] || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-lg text-slate-400">
            No movies found for selected filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default Filter;