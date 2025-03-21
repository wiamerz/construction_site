import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Gestion from './component/Gestion';




const App = () => {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/gestion' element={<Gestion/>}/>
    </Routes>
  </Router>
  )
}

export default App;