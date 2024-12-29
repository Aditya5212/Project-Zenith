import React from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Error404 from '../components/Error404';
import Home from '../components/Home';
const AppRoutes = () => { 
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />    {/*<Home />*/}
          <Route path="/login" element={<Login />} />   {/*<Login />*/}
          <Route path="/register" element={<Register />} />   {/*<Register />*/}
          <Route path="/Error404" element={<Error404 />} />
          {/* Add more routes here */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes
