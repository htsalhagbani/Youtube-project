import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate,Link ,useOutletContext} from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Alert from './Alert'; // Import the Alert component




function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLoginSuccess } = useOutletContext();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('error'); // For alert type (success/error)
  const navigate = useNavigate();


  const validateForm = () => {
    if (!username || !password) {
      return 'All fields are required.';
    }
    if (username.length < 8 || !/^[a-zA-Z]+$/.test(username)) {
      return 'Username must be at least 8 characters long and contain only letters.';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      setAlertType('error');
      setShowAlert(true);
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Fetch all users to check for the provided username and password
      const response = await axios.get('https://66edced2380821644cde0b48.mockapi.io/SignUp');
      const users = response.data;

      // Check if user exists and password matches
      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        console.log('Login successful:', user);
        localStorage.setItem('username', username);
        handleLoginSuccess(); 
        setAlertType('success');
        setError('Login successful! Redirecting...'); // Change as needed
        setShowAlert(true);
        // handleLogin();
        navigate('/');
        // Handle success (e.g., redirect)
      } else {
        setError('This account is not registered. You should sign up.');
        setShowAlert(true);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to log in. Please try again.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
<section className="bg-lightblue w-full  min-h-screen md:min-h-[90vh] flex items-center justify-center max-sm:mt-5">
  <div className="bg-lightpink w-full h-full flex items-center justify-center">
    <div className="w-[90%] max-w-xl h-[100vh] max-sm:mb-9 xl:h-[70vh] flex justify-center items-center bg-white rounded-3xl shadow-lg dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-[90%]">
        <div className="flex justify-start items-center mb-4">
          <a href="#" className="flex items-center">
            <img className="w-24 h-20" src={logo} alt="logo" />
          </a>
        </div>
        <h1 className="text-3xl mb-5 font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          Login
        </h1>

        {showAlert && (
          <Alert 
            message={error} 
            type={alertType} 
            onClose={() => {
              setShowAlert(false);
              setError('');
            }} 
          />
        )}

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Username" className="block mb-2 md:text-2xl text-xl font-medium text-gray-900 dark:text-white">Username</label>
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
            <label htmlFor="password" className="block mb-2  md:text-2xl text-xl font-medium text-gray-900 dark:text-white">Password</label>
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
            <small className='text-gray-500 text-[1rem] max-sm:text-md '>Minimum 8 characters</small>
          </div>

          <button 
            type="submit" 
            className={`w-full bg-[#CE201F] text-white hover:bg-[gray] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
          <p className="text-lg font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet? <Link to={"/signup"} className="font-medium text-[#CE201F] hover:underline dark:text-blue-500">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>


  );
}

export default Login;
