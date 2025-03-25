import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Gestion from './component/Gestion';
import ProjectDetails from './component/ProjectDetails';
import TaskDetails from './component/TaskDetails';




const App = () => {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/gestion' element={<Gestion/>}/>
      <Route path='/project/:id' element={<ProjectDetails/>}/>
      <Route path='/task/:id' element={<TaskDetails/>}/>
    </Routes>
  </Router>
  )
}

export default App;