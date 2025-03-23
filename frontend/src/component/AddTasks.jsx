import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from "react-hot-toast";
import Navbar from './Navbar';
import Footer from './Footer';

const AddTasks = () => {
    const[errors, setErrors] = useState({});
    const[formData, setFormData] = useState({
        Name:'',
        Description: '',
        StartDate: '',
        EndDate: '',
        projectId: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors, [e.target.name]:""
        });

    };

    const validateForm = () => {
        let newErrors = {};
        if(!formData.Name.trim()) newErrors.Name ='Name is required';
        if(!formData.Description.trim()) newErrors.Description= 'Description in required'
        if (!formData.StartDate.trim()) newErrors.StartDate = 'Start date is required';
        if (!formData.EndDate.trim()) newErrors.EndDate = 'End date is required';     
        
        const startDate = new Date(formData.StartDate);
        const endDate = new Date (formData.EndDate);
        if( startDate > endDate ){
           newErrors.EndDate = 'End date must be after start date'
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
            StartDate: formData.StartDate, 
            EndDate: formData.EndDate,
        };

    try { 
        console.log("sending data", data);
        const response = await axios.post("http://localhost:5000/api/tasks/AddTask", data, {
            headers:{
                'Content-Type': 'application/json'
            },

        });
        console.log("response:", response);
        if (response.status === 200 || response.status === 201) {
            toast.success("Task added successfully!");
            setFormData({ Name: '', Description: '', StartDate: '', EndDate: '' });
        }
        
    } catch (error) {
        console.error("Error adding tasks", error.response ? error.response.data : error.message);
        toast.error("error adding task",  + (error.response ? error.response.data.message : error.message));
        
    }
        
    };

    

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
        <Toaster position="top-center" />

        <h1 className="text-3xl font-bold text-black m-10 p-10 text-center mb-8">
          Here where you can add your project's taks
        </h1>

        <div className="bg-gray-100 rounded-lg shadow-md p-8 text-black w-full max-w-xl">
          <h2 className="text-xl font-semibold flex text-red-600 items-center gap-2 mb-6">
            # Add a task
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4"> 

            <label htmlFor="Name" className="text-gray-700 font-semibold">Task Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />
            {errors.Name && <p className="text-red-500 text-sm">{errors.Name}</p>}

            <label htmlFor="Description" className="text-gray-700 font-semibold">Task Description</label>
            <input
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />
            {errors.Description && <p className="text-red-500 text-sm">{errors.Description}</p>}

            <label htmlFor="StartDate" className="text-gray-700 font-semibold">Start Date</label>
            <input
              type="date"
              name="StartDate"
              value={formData.StartDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />
            {errors.StartDate && <p className="text-red-500 text-sm">{errors.StartDate}</p>}

            <label htmlFor="EndDate" className="text-gray-700 font-semibold">End Date</label>
            <input
              type="date"
              name="EndDate"
              value={formData.EndDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md"
            />
            {errors.EndDate && <p className="text-red-500 text-sm">{errors.EndDate}</p>}

            <button
              type="submit"
              className="flex justify-end items-end bg-red-600 text-white py-2 font-semibold hover:bg-red-700 transition"
            >
              Submit
            </button>


          </form>
        </div>

        <button
              type="submit"
              className="flex justify-end items-end bg-red-600 text-white py-2 font-semibold hover:bg-red-700 transition"
            >
              Add Resources
            </button>
      </div>
      <Footer/>
    </>
  )
}

export default AddTasks;