import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Gestion = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Startdate: '',
    Enddate: '',
    Budget: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors, [e.target.name]: "" 
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.Name.trim()) newErrors.Name = 'Name is required.';
    if (!formData.Description.trim()) newErrors.Description = 'Description is required';
    if (!formData.Startdate.trim()) newErrors.Startdate = 'Start date is required';
    if (!formData.Enddate.trim()) newErrors.Enddate = 'End date is required'; 
    if (!formData.Budget || formData.Budget < 0) newErrors.Budget = 'Budget should not be negative';
   
    
    const startDate = new Date(formData.Startdate);
    const endDate = new Date(formData.Enddate);
    if (startDate > endDate) {
      newErrors.Enddate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!validateForm()) {
      toast.error("You should correct the errors.");
      return;
    }
     
     const data = { 
      Name: formData.Name, 
      Description: formData.Description, 
      Startdate: formData.Startdate, 
      Enddate: formData.Enddate, 
      Budget: formData.Budget
    };
  

  try {
    console.log("Sending data:", data);
    const response = await axios.post("http://localhost:5000/api/project/AddProject", data, { 
      headers: { 
        'Content-Type': 'application/json' 
      },
    });
    console.log("Response:", response);
    
    if (response.status === 200 || response.status === 201) {
      toast.success("Project added successfully!");
      setFormData({ Name: '', Description: '', Startdate: '', Enddate: '', Budget: '' });
    }
  } catch (error) {
    console.error("Error adding project:", error.response ? error.response.data : error.message);
    toast.error("Error adding project: " + (error.response ? error.response.data.message : error.message));
  }


  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
        <Toaster position="top-center" />

        <h1 className="text-3xl font-bold text-black m-10 p-10 text-center mb-8">
          Here where you can add your projects
        </h1>

        <div className="bg-gray-100 rounded-lg shadow-md p-8 text-black w-full max-w-xl">
          <h2 className="text-xl font-semibold flex text-red-600 items-center gap-2 mb-6">
            # Add a project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4"> 
            <label htmlFor="Name" className="text-gray-700 font-semibold">Project Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />
            {errors.Name && <p className="text-red-500 text-sm">{errors.Name}</p>}

            <label htmlFor="Description" className="text-gray-700 font-semibold">Project Description</label>
            <input
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />
            {errors.Description && <p className="text-red-500 text-sm">{errors.Description}</p>}

            <label htmlFor="Startdate" className="text-gray-700 font-semibold">Start Date</label>
            <input
              type="date"
              name="Startdate"
              value={formData.Startdate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />
            {errors.Startdate && <p className="text-red-500 text-sm">{errors.Startdate}</p>}

            <label htmlFor="Enddate" className="text-gray-700 font-semibold">End Date</label>
            <input
              type="date"
              name="Enddate"
              value={formData.Enddate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />
            {errors.Enddate && <p className="text-red-500 text-sm">{errors.Enddate}</p>}

            <label htmlFor="Budget" className="text-gray-700 font-semibold">Budget (in MAD)</label>
            <input
              type="number"
              name="Budget"
              value={formData.Budget}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />
            {errors.Budget && <p className="text-red-500 text-sm">{errors.Budget}</p>}

            <button
              type="submit"
              className="flex justify-end items-end bg-red-600 text-white py-2 font-semibold hover:bg-red-700 transition"
            >
              Submit
            </button>


          </form>
        </div>


      </div>

      <Footer/>
    </>
  );
}

export default Gestion;
