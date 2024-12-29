import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../context/user.context.jsx";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/');
  };

  return (
    <div className=" min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 ">
      <div className='w-11/12 mx-auto'>
        <ul className="flex justify-end space-x-4">
          {user ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="font-semibold text-blue-300 hover:text-blue-500"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="font-semibold text-blue-300 hover:text-blue-500"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="font-semibold text-blue-300 hover:text-blue-500"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
        </ul>
      </div>
      </nav>
      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="text-4xl font-bold pt-16">Welcome to the Home Page</h1>
        <h1>{user ? JSON.stringify(user.email).split('"')[1] : "NULL"
        }</h1>
      </div>
    </div>
  );
};

export default Home;
