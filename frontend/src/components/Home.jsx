import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../context/user.context.jsx";
import { useContext,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../config/axios.js";
const Home = () => {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/');
  };
  const [isModalOpen, setIsModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const [project,setProject] = useState([]);

  function createProject(e){
    e.preventDefault();
    axios.post("/api/project/create",{
      name: projectName
    })
    .then((res)=>{
      console.log(res.data);
      setIsModal(false);
      setProjectName("");
      setError("");
    })
    .catch((error)=>{
      if (error.response && error.response.status === 400) {
        setError("Project name already exists");
      } else {
        setError("An error occurred while creating the project");
      }
      console.log(error);
    })
    console.log(projectName);
  }

  useEffect(() => {
    axios.get("/api/project/all")
    .then((res)=>{
      console.log(res.data);
      setProject(res.data.projects);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[projectName])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className='w-11/12 mx-auto flex justify-between items-center'>
          <h1 className="text-2xl font-bold text-blue-300">Project Zenith</h1>
          <ul className="flex space-x-4">
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
      <main className='p-4'>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-96">
              <h2 className="text-xl font-bold mb-4">Create Project</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <input
                type="text"
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
                placeholder="Project Name"
                className="w-full p-2 border border-gray-600 rounded mb-4 bg-gray-700 text-white"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setIsModal(false);
                    setProjectName("");
                    setError("");
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={createProject}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Projects</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsModal(true)}
          >
            Create Project
          </button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {project.map((project) => (
            <div key={project._id} className="project p-4 border border-slate-700 rounded-md bg-gray-800 shadow-md">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <Link to={`/project/${project._id}`} className="text-blue-500">View</Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
