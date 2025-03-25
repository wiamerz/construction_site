import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
import { toast, Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [errors, setErrors] = useState({});
  const [taskFormData, setTaskFormData] = useState({
    Name: "",
    Description: "",
    StartDate: "",
    EndDate: "",
  });

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const [projectResponse, tasksResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/project/GetProject/${id}`),
          axios.get(`http://localhost:5000/api/tasks/GetTasksByProject/${id}`)
        ]);
        
        setProject(projectResponse.data);
        setTasks(tasksResponse.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error loading project data:", error);
        toast.error("Failed to load project data");
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateTaskForm = () => {
    const newErrors = {};
    if (!taskFormData.Name.trim()) newErrors.Name = "Task name is required";
    if (!taskFormData.Description.trim()) newErrors.Description = "Description is required";
    if (!taskFormData.StartDate.trim()) newErrors.StartDate = "Start date is required";
    if (!taskFormData.EndDate.trim()) newErrors.EndDate = "End date is required";

    if (new Date(taskFormData.StartDate) > new Date(taskFormData.EndDate)) {
      newErrors.EndDate = "End date must be after start date";
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

    try {
      const response = await axios.post("http://localhost:5000/api/tasks/AddTask", {
        ...taskFormData,
        projectId: id,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Task added successfully!");
        setTasks([...tasks, response.data]);
        resetTaskForm();
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Error adding task.");
    }
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    if (!validateTaskForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/tasks/UpdateTask/${editingTask._id}`, {
        ...taskFormData,
        projectId: id,
      });

      toast.success("Task updated successfully!");
      setTasks(tasks.map((task) => 
        task._id === editingTask._id ? { ...task, ...taskFormData } : task
      ));
      resetTaskForm();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/DeleteTask/${taskId}`);
      toast.success("Task deleted successfully");
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task.");
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setTaskFormData({
      Name: task.Name,
      Description: task.Description,
      StartDate: new Date(task.StartDate).toISOString().split("T")[0],
      EndDate: new Date(task.EndDate).toISOString().split("T")[0],
    });
    setShowAddTaskForm(true);
  };

  const resetTaskForm = () => {
    setTaskFormData({ Name: "", Description: "", StartDate: "", EndDate: "" });
    setEditingTask(null);
    setShowAddTaskForm(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <p className="text-xl">Loading project details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8 flex-grow">
        <Toaster position="top-center" />

        {/* Project Details */}
        <div className="bg-gray-100 m-16 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-red-600">{project?.Name}</h1>
          <p className="text-gray-700">{project?.Description}</p>
        </div>

        {/* Tasks Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-red-600">Project Tasks</h2>
            <button 
              onClick={() => setShowAddTaskForm(!showAddTaskForm)} 
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              {showAddTaskForm ? "Cancel" : "Add New Task"}
            </button>
          </div>

          {showAddTaskForm && (
            <form 
              onSubmit={editingTask ? handleEditTask : handleAddTask} 
              className="bg-gray-100 p-6 rounded-lg"
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  name="Name" 
                  placeholder="Task Name" 
                  value={taskFormData.Name} 
                  onChange={handleInputChange} 
                  className={`p-2 border rounded ${errors.Name ? 'border-red-500' : ''}`}
                />
                <input 
                  type="date" 
                  name="StartDate" 
                  value={taskFormData.StartDate} 
                  onChange={handleInputChange} 
                  className={`p-2 border rounded ${errors.StartDate ? 'border-red-500' : ''}`}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input 
                  type="date" 
                  name="EndDate" 
                  value={taskFormData.EndDate} 
                  onChange={handleInputChange} 
                  className={`p-2 border rounded ${errors.EndDate ? 'border-red-500' : ''}`}
                />
              </div>

              <textarea 
                name="Description" 
                placeholder="Task Description" 
                value={taskFormData.Description} 
                onChange={handleInputChange} 
                className={`w-full p-2 border rounded mb-4 ${errors.Description ? 'border-red-500' : ''}`}
                rows="3"
              ></textarea>

              <div className="flex space-x-2">
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md">
                  {editingTask ? "Update Task" : "Add Task"}
                </button>
              </div>
            </form>
          )}

          <table className="min-w-full bg-white">
            <thead className="bg-black text-white">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Description</th>
                <th className="py-2">Start Date</th>
                <th className="py-2">End Date</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-b text-center">
                  <td className="py-2">{task.Name}</td>
                  <td className="py-2">{task.Description}</td>
                  <td className="py-2">{new Date(task.StartDate).toLocaleDateString()}</td>
                  <td className="py-2">{new Date(task.EndDate).toLocaleDateString()}</td>
                  <td className="py-2 space-x-2">
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

                     <Link to={`/task/${task._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                       details
                     </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetails;