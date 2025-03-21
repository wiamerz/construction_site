import React, { useState } from 'react';
import Navbar from './Navbar';

function Gestion() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startdate: '',
    enddate: '',
    budget: ''
   
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        
        <h1 className="text-3xl font-bold text-black m-10 p-10 text-center mb-8">
          Here where you can add your projects
        </h1>

        
        <div className="bg-gray-50 rounded-lg shadow-md p-8 text-black w-full max-w-xl">
          <h2 className="text-xl font-semibold flex text-red-600 items-center gap-2 mb-6">
            #Add a project
          </h2>
          <label htmlFor="startdate" className="text-gray-700 font-semibold">Project title</label>
          <form className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />
             <label htmlFor="startdate" className="text-gray-700 font-semibold">Project description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />
           <label htmlFor="startdate" className="text-gray-700 font-semibold">Start Date</label>
            <input
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />
             <label htmlFor="startdate" className="text-gray-700 font-semibold">End Date</label>
            <input
                type="date"
                name="enddate"
                value={formData.enddate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md"
                />

            <label htmlFor="startdate" className="text-gray-700 font-semibold">Budget(in Mad)</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />

            

            <button
              type="submit"
              className=" flex justify-end items-end bg-red-600 text-white py-2 font-semibold hover:bg-red-700 transition"
            >
              Submit
            </button>
          </form>
          
        </div>
        <button
              type="submit"
              className=" m-3 flex justify-end items-end bg-red-600 text-white py-2 font-semibold hover:bg-red-700 transition"
            >
             Add tasks
            </button>
      </div>
    </>
  );
}

export default Gestion;
