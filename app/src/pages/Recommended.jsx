import { useEffect, useState } from 'react';
import axios from 'axios';

const Recommended = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=e3e6f40e29cab31a02e375dc097b9d73`
      )
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 md:px-10 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400 drop-shadow-md">
          ⭐ Top Rated Movies
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Handpicked global favorites from TMDB
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/30 transition duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg md:text-xl font-bold text-purple-300">
                {movie.title}
              </h2>
              <p className="text-sm text-gray-300 line-clamp-3 mt-1">
                {movie.overview || 'No description available.'}
              </p>
              <div className="mt-2 text-sm flex justify-between items-center text-gray-400">
                <span>⭐ {movie.vote_average.toFixed(1)} / 10</span>
                <span>📅 {movie.release_date?.split('-')[0] || 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
