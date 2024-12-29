import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">Page Not Found</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;