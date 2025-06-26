import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/login`, formData);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage(res.data.message);
      setIsError(false);
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
      setIsError(true);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800/60 backdrop-blur-lg border border-slate-700 shadow-2xl rounded-3xl p-8 md:p-10 transition-all text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-cyan-400 mb-8">
          👋 Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-cyan-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border-2 border-slate-600 rounded-xl bg-slate-700 text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-cyan-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border-2 border-slate-600 rounded-xl bg-slate-700 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition-transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        {message && (
          <p
            className={`mt-5 text-center text-sm font-medium ${
              isError ? 'text-red-400' : 'text-green-400'
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
