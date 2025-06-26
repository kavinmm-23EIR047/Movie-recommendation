import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=e3e6f40e29cab31a02e375dc097b9d73&language=en-US`
      )
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 md:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-cyan-400">
          🎮 Trending Movies This Week
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Updated weekly with the latest hits from TMDB
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
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
                <h2 className="text-lg md:text-xl font-bold text-cyan-300">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-300 line-clamp-3 mt-1">
                  {movie.overview || 'No description available.'}
                </p>
                <div className="mt-2 text-sm flex justify-between items-center text-gray-400">
                  <span>
                    🌟 {movie.vote_average.toFixed(1)} / 10
                  </span>
                  <span>
                    📅 {movie.release_date?.split('-')[0] || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;