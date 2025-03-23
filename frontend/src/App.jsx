import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Gestion from './component/Gestion';
import AddTasks from './component/AddTasks';
import DisplayTasks from './component/DisplayTasks';
import ProjectDetails from './component/ProjectDetails';




const App = () => {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/gestion' element={<Gestion/>}/>
      {/* <Route path='/addtasks' element={<AddTasks/>}/>
      <Route path='/displaytasks' element={<DisplayTasks/>}/> */}
      <Route path='/project/:id' element={<ProjectDetails/>}/>
    </Routes>
  </Router>
  )
}

export default App;