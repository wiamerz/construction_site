import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';




const App = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <Home/>
    </div>
  )
}

export default App;