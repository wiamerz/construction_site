import React, { useEffect, useState } from 'react';
import axios from 'axios';

import myImage from "/src/assets/bg.jpg";
import about from "/src/assets/about.jpg"
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
  const [projects, setProjects] = useState([]);
    
  useEffect(() => {
    axios.get("http://localhost:5000/api/project/GetProject")
      .then(response => {
        console.log("Projects retrieved:", response.data);
        if (response.data && response.data.data) {
          setProjects(response.data.data);
        }
      })
      .catch(err => console.error("Error retrieving projects:", err));
  }, []);
  
  return (
    <>
      <Navbar/>

      <div className="h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${myImage})` }}>
        <h1 className="text-white text-4xl font-bold flex justify-center items-center h-full">
          Snozy services for lasting quality
        </h1>
      </div>

      {/* About us */}
      <div className='text-2xl m-15 font-bold text-red-600 flex justify-start items-center'>
        # About us
      </div>
     
      <div className='flex justify-around items-center'>
        <div className='text-black text-lg w-100 m-15'>
          <p>At Snozy we believe in innovation and excellence. Since our inception, 
            we have been committed to delivering high-quality solutions tailored to our clients' needs.
          </p>
          <p>Our Mission: To provide innovative services and products that simplify lives and create value.</p> 
          <p>Our Vision: To become a leader in our industry by combining expertise and passion.</p>
          <p>Our Values: Commitment, transparency, and continuous improvement.</p>
          <p>Our team of dedicated professionals works every day to deliver exceptional experiences and build a better future.</p>
        </div>
        <div className='flex justify-end'>
          <img src={about} alt="About us" />
        </div>
      </div>
      
      {/* Projects display */}
      <div className='text-2xl m-15 font-bold text-red-600 flex justify-start'>
        # Projects
        <div className="flex flex-col items-center justify-center min-h-screen p-8 m-10 rounded-2xl bg-gray-100">
          <div className="w-full max-w-4xl">
            {projects.length === 0 ? (
              <p className="text-center text-gray-500">No projects added.</p>
            ) : (
              projects.map((project) => (
                <div key={project._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h2 className="text-xl font-semibold">{project.Name}</h2>
                  <p className="text-gray-700">{project.Description}</p>
                  <p className="text-gray-500">
                    {new Date(project.StartDate).toLocaleDateString()} → {new Date(project.EndDate).toLocaleDateString()}
                  </p>
                  <p className="text-red-600 font-bold">Budget: {project.Budget} MAD</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default Home;
