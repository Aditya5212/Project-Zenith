import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import eyeIcon from '../assets/eye-svgrepo-com (1).svg';
import eyeOffIcon from '../assets/eye-off-svgrepo-com (1).svg';
import { UserContext } from '../context/user.context';
import { useContext } from 'react';
import axios from '../config/axios';
const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    axios.post("/api/users/register",{
        email:email,
        password:password
    })
    .then((response) => {
        console.log(response.data);
        localStorage.setItem("token",response.data.token);
        setUser(response.data.user);
        navigate('/');
    })
    .catch((error) => {
        // navigate('/Error404')
        console.error(error);
    })
    // console.log(JSON.stringify({ email, password }));
    // navigate('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 pt-6 right-0 pr-3 flex items-center text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={showPassword ? eyeOffIcon : eyeIcon} alt="Toggle Password Visibility" className="h-5 w-5" />
            </button>
          </div>
          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2.5 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 pt-6 right-0 pr-3 flex items-center text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <img src={showConfirmPassword ? eyeOffIcon : eyeIcon} alt="Toggle Password Visibility" className="h-5 w-5" />
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;