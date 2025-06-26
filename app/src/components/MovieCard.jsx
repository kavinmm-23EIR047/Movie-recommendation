// app/src/components/MovieCard.jsx
const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-gray-200 text-gray-500">
          No Image
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-600">{movie.release_date}</p>
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
