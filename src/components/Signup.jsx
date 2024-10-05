import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom'; 
import logo from '../assets/logo.png';
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await axios.post('https://66edced2380821644cde0b48.mockapi.io/SignUp', { username, password });

      navigate('/login'); 
    } catch (err) {
      console.error('Error signing up:', err);
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen max-sm:mt-5 md:min-h-[90vh] flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[90%] max-w-xl xl:h-[70vh] h-[90vh] flex justify-center items-center bg-white rounded-3xl shadow-lg dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="w-[90%]">
            <div className="flex justify-start items-center mb-4">
              <a href="#" className="flex items-center">
                <img className="w-24 h-20" src={logo} alt="logo" />
              </a>
            </div>
            <h1 className="text-3xl mb-5 font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Sign Up
            </h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Username" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Username</label>
                <input 
                  type="text" 
                  name="Username" 
                  id="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Username" 
                  required 
                />
                <small className='text-gray-500 md:text-[1rem] text-md'>Username must be at least 8 characters long and contain only letters.</small>
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required 
                />
                <small className='text-gray-500 md:text-[1rem] text-md'>Minimum 8 characters</small>
              </div>

              <button 
                type="submit" 
                className={`w-full bg-[#CE201F] text-white hover:bg-[gray] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
              <p className="text-lg font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link to={'/login'} className="font-medium text-[#CE201F] hover:underline dark:text-blue-500">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
