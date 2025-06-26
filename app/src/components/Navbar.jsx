import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition">
        🎥 Movie-Mania
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-cyan-300">Home</Link>
        <Link to="/recommended" className="hover:text-cyan-300">Recommended</Link>
        <Link to="/search" className="hover:text-cyan-300">Search</Link>
        <Link to="/filter" className="hover:text-cyan-300">Filter</Link>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="hover:text-cyan-300">Login</Link>
            <Link to="/signup" className="hover:text-cyan-300">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
