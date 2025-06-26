import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Signup the user
      await axios.post(`${API}/auth/signup`, formData);

      // Auto login after successful signup
      const loginRes = await axios.post(`${API}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      // Save user info in localStorage and navigate
      localStorage.setItem('user', JSON.stringify(loginRes.data.user));
      setMessage('Signup successful. Redirecting...');
      setIsError(false);
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
      setIsError(true);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800/60 backdrop-blur-lg border border-slate-700 shadow-2xl rounded-3xl p-8 md:p-10 transition-all text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-cyan-400 mb-8">
          🚀 Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-cyan-300 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border-2 border-slate-600 rounded-xl bg-slate-700 text-white"
            />
          </div>

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
              placeholder="Create a password"
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border-2 border-slate-600 rounded-xl bg-slate-700 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition-transform hover:scale-[1.02]"
          >
            Sign Up
          </button>
        </form>

        {/* Message Box */}
        {message && (
          <p
            className={`mt-5 text-center text-sm font-medium ${
              isError ? 'text-red-400' : 'text-green-400'
            }`}
          >
            {message}
          </p>
        )}

        {/* Already have account link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
