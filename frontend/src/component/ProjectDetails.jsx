import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProjectDetails = () => {
  const { id } = useParams(); 
  const [projects, setProjects] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [errors, setErrors] = useState({});
  const [taskFormData, setTaskFormData] = useState({
    Name: '',
    Description: '',
    StartDate: '',
    EndDate: '',
  });

  
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        
       
        const projectResponse = await axios.get(`http://localhost:5000/api/project/GetProject/${id}`);
        setProjects(projectResponse.data);
        
        
        const tasksResponse = await axios.get(`http://localhost:5000/api/tasks/GetTasksByProject/${id}`);
        console.log("Project ID:", id);
        console.log("Fetched tasks:", tasksResponse.data);
        
        if (Array.isArray(tasksResponse.data)) {
          setTasks(tasksResponse.data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading project data:", error);
        toast.error("Failed to load project data");
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  const handleTaskInputChange = (e) => {
    setTaskFormData({
      ...taskFormData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };


  const validateTaskForm = () => {
    let newErrors = {};
    if (!taskFormData.Name.trim()) newErrors.Name = 'Name is required';
    if (!taskFormData.Description.trim()) newErrors.Description = 'Description is required';
    if (!taskFormData.StartDate.trim()) newErrors.StartDate = 'Start date is required';
    if (!taskFormData.EndDate.trim()) newErrors.EndDate = 'End date is required';

    const startDate = new Date(taskFormData.StartDate);
    const endDate = new Date(taskFormData.EndDate);
    if (startDate > endDate) {
      newErrors.EndDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!validateTaskForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    
    const data = {
      ...taskFormData,
      projectId: id
    };

    try {
      const response = await axios.post("http://localhost:5000/api/tasks/AddTask", data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Task added successfully!");
        
        
        setTaskFormData({ Name: '', Description: '', StartDate: '', EndDate: '' });
        setShowAddTaskForm(false);
        
       
        const tasksResponse = await axios.get(`http://localhost:5000/api/tasks/GetTasksByProject/${id}`);
        if (Array.isArray(tasksResponse.data)) {
          setTasks(tasksResponse.data);
        }
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Error adding task: " + (error.response ? error.response.data.message : error.message));
    }
  };

  const handleEditClick = (task) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };

    setEditingTask(task);
    setTaskFormData({
      Name: task.Name,
      Description: task.Description,
      StartDate: formatDate(task.StartDate),
      EndDate: formatDate(task.EndDate),
    });
  };

  //handle edit task 
  const handleEditTask = async (e) => {
    e.preventDefault();

    if (!validateTaskForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    if (editingTask) {
      try {
        const response = await axios.put(`http://localhost:5000/api/tasks/UpdateTask/${editingTask._id}`, taskFormData);

        if (response.status === 200 || response.status === 201) {
          toast.success("Task updated successfully!");
          
          
          setTasks(tasks.map(task => 
            task._id === editingTask._id ? {...task, ...taskFormData} : task
          ));
          
          
          setTaskFormData({ Name: '', Description: '', StartDate: '', EndDate: '' });
          setEditingTask(null);
        }
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Error updating task: " + (error.response ? error.response.data.message : error.message));
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/DeleteTask/${taskId}`);
      toast.success("Task deleted successfully");
      
      
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl">Loading project details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!projects) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-red-600">Project not found</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <Toaster position="top-center" />
        
        {/* Project Details Header */}
        <div className="bg-gray-100 m-16 rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">{projects.Name}</h1>
          <p className="text-gray-700 mb-4">{projects.Description}</p>
          
          <div className="grid text-black grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-gray-700">Start Date</h3>
              <p>{new Date(projects.Startdate).toLocaleDateString()}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-gray-700">End Date</h3>
              <p>{new Date(projects.Enddate).toLocaleDateString()}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-gray-700">Budget</h3>
              <p>{projects.Budget} MAD</p>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-red-600">Project Tasks</h2>
            <button 
              onClick={() => {
                setShowAddTaskForm(!showAddTaskForm);
                setEditingTask(null);
                setTaskFormData({ Name: '', Description: '', StartDate: '', EndDate: '' });
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              {showAddTaskForm ? 'Cancel' : 'Add New Task'}
            </button>
          </div>

          {/* Add Task Form */}
          {showAddTaskForm && !editingTask && (
            <div className="bg-gray-100 rounded-lg text-black shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-red-600 mb-4">Add New Task</h3>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label htmlFor="Name" className="text-gray-700 font-semibold">Task Name</label>
                  <input
                    type="text"
                    name="Name"
                    value={taskFormData.Name}
                    onChange={handleTaskInputChange}
                    className="w-full p-2 border border-gray-600 rounded-md"
                  />
                  {errors.Name && <p className="text-red-500 text-sm">{errors.Name}</p>}
                </div>

                <div>
                  <label htmlFor="Description" className="text-gray-700 font-semibold">Task Description</label>
                  <textarea
                    name="Description"
                    value={taskFormData.Description}
                    onChange={handleTaskInputChange}
                    className="w-full p-2 border border-gray-600 rounded-md"
                    rows="3"
                  ></textarea>
                  {errors.Description && <p className="text-red-500 text-sm">{errors.Description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="StartDate" className="text-gray-700 font-semibold">Start Date</label>
                    <input
                      type="date"
                      name="StartDate"
                      value={taskFormData.StartDate}
                      onChange={handleTaskInputChange}
                      className="w-full p-2 border border-gray-600 rounded-md"
                    />
                    {errors.StartDate && <p className="text-red-500 text-sm">{errors.StartDate}</p>}
                  </div>

                  <div>
                    <label htmlFor="EndDate" className="text-gray-700 font-semibold">End Date</label>
                    <input
                      type="date"
                      name="EndDate"
                      value={taskFormData.EndDate}
                      onChange={handleTaskInputChange}
                      className="w-full p-2 border border-gray-600 rounded-md"
                    />
                    {errors.EndDate && <p className="text-red-500 text-sm">{errors.EndDate}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  Add Task
                </button>
              </form>
            </div>
          )}

          {/* Edit Task Form */}
          {editingTask && (
            <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-red-600 mb-4">Edit Task</h3>
              <form onSubmit={handleEditTask} className="text-black space-y-4">
                <div>
                  <label htmlFor="Name" className="text-gray-700 font-semibold">Task Name</label>
                  <input
                    type="text"
                    name="Name"
                    value={taskFormData.Name}
                    onChange={handleTaskInputChange}
                    className="w-full  p-2 border border-gray-600 rounded-md"
                  />
                  {errors.Name && <p className="text-red-500 text-sm">{errors.Name}</p>}
                </div>

                <div>
                  <label htmlFor="Description" className="text-gray-700 font-semibold">Task Description</label>
                  <textarea
                    name="Description"
                    value={taskFormData.Description}
                    onChange={handleTaskInputChange}
                    className="w-full p-2 border border-gray-600 rounded-md"
                    rows="3"
                  ></textarea>
                  {errors.Description && <p className="text-red-500 text-sm">{errors.Description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="StartDate" className="text-gray-700 font-semibold">Start Date</label>
                    <input
                      type="date"
                      name="StartDate"
                      value={taskFormData.StartDate}
                      onChange={handleTaskInputChange}
                      className="w-full p-2 border border-gray-600 rounded-md"
                    />
                    {errors.StartDate && <p className="text-red-500 text-sm">{errors.StartDate}</p>}
                  </div>

                  <div>
                    <label htmlFor="EndDate" className="text-gray-700 font-semibold">End Date</label>
                    <input
                      type="date"
                      name="EndDate"
                      value={taskFormData.EndDate}
                      onChange={handleTaskInputChange}
                      className="w-full p-2 border border-gray-600 rounded-md"
                    />
                    {errors.EndDate && <p className="text-red-500 text-sm">{errors.EndDate}</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
                  >
                    Update Task
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    type="button"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tasks Table */}
          <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Task Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Start Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">End Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-black divide-gray-200">
                {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <motion.tr
                      key={task._id}
                      className="hover:bg-gray-100 transition duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                    >
                      <td className="px-6 py-4 text-sm">{task.Name}</td>
                      <td className="px-6 py-4 text-sm">{task.Description}</td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(task.StartDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(task.EndDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <motion.div 
                          className="flex gap-2"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <button 
                            onClick={() => handleEditClick(task)} 
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteTask(task._id)} 
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm"
                          >
                            Delete
                          </button>
                        </motion.div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No tasks available for this project. Add a task to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        
        <div className="mt-8">
          <Link 
            to="/" 
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Back to Projects
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetails;