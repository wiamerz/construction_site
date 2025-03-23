import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState({}); 
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
      Name: '',
      Description: '',
      Startdate: '',
      Enddate: '',
      Budget: '',
    });

    const handleInputChange = (e) => {
      const { name, value, type, files } = e.target;
      setFormData (prev => ({
        ...prev,
        [name]: type === "file" ? files [0] : value
      }))
    }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/project/GetProject")
      .then((response) => {
        console.log("Raw response:", response);
        console.log("Projects fetched:", response.data);
  
        if (Array.isArray(response.data)) { 
          setProjects(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((err) => console.error("Error retrieving projects:", err));
  }, []);




  

  const handleEditClick = (project) => { 
    const formatDate = (dateString) => { // Format dates to YYYY-MM-DD
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };
  
    setEditingProject(project);
    setFormData({
      Name: project.Name,
      Description: project.Description,
      Startdate: formatDate(project.Startdate),
      Enddate: formatDate(project.Enddate),
      Budget: project.Budget,
    });
  };

  // handle project edition
  const handleEdit = (e) => {
    e.preventDefault();
    
    if (editingProject) {
      axios.put(`http://localhost:5000/api/project/UpdateProject/${editingProject._id}`, formData)
        .then(response => {
        
          setProjects(projects.map(project => 
            project._id === editingProject._id ? {...project, ...formData} : project
          ));
          setEditingProject(null); 
        })
        .catch(err => console.error("Update error:", err));
    }
  };
 




  // handle project deletion
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/project/DeleteProject/${id}`)
    .then(() => {
      setProjects(prev => prev.filter(project => project._id !== id));
      console.log("project deleted successfully");

    })
    .catch(err => console.error("Delete error:", err));

  };
  

  return (
    <div className="container mx-auto p-8">
      {/* Title */}
      <div className='text-2xl m-15 font-bold text-red-600 flex justify-start items-center'>
        # Projects
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Titre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Début</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Fin</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Budget</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y text-black divide-gray-200">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.tr
                  key={project._id}
                  className="hover:bg-gray-100 transition duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                >
                  <td className="px-6 py-4 text-sm">{project.Name}</td>
                  <td className="px-6 py-4 text-sm">{project.Description}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(project.Startdate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(project.Enddate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">{project.Budget} DH</td>
                  <td className="px-6 py-4">
                    <motion.div 
                      className="flex gap-2"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button  onClick={()=> handleEditClick(project)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(project._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                        Delete
                      </button >
                      {/* <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                         details
                      </button> */}
                      <Link to={`/project/${project._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                      details
                      </Link>

                    </motion.div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Aucun projet disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>



{/* --------------editing card----------------- */}

        {editingProject && (
       <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">

             <h2 className="text-xl  font-semibold flex text-red-600 items-center gap-2 mb-6">
               # Edit project
             </h2>
             <form onSubmit={handleEdit} className=" text-black space-y-4"> 
               <label htmlFor="Name" className="text-gray-700 font-semibold">Project Name</label>
               <input
                 type="text"
                 name="Name"
                 value={formData.Name}
                 onChange={handleInputChange}
                 className="w-full p-2 border border-gray-600 rounded-md"
               />
               {errors.Name && <p className="text-red-500 text-sm">{errors.Name}</p>}
   
               <label htmlFor="Description" className="text-gray-700 font-semibold">Project Description</label>
               <input
                 type="text"
                 name="Description"
                 value={formData.Description}
                 onChange={handleInputChange}
                 className="w-full p-2 border border-gray-600 rounded-md"
               />
               {errors.Description && <p className="text-red-500 text-sm">{errors.Description}</p>}
   
               <label htmlFor="Startdate" className="text-gray-700 font-semibold">Start Date</label>
               <input
                 type="date"
                 name="Startdate"
                 value={formData.Startdate}
                 onChange={handleInputChange}
                 className="w-full p-2 border border-gray-600 rounded-md"
               />
               {errors.Startdate && <p className="text-red-500 text-sm">{errors.Startdate}</p>}
   
               <label htmlFor="Enddate" className="text-gray-700 font-semibold">End Date</label>
               <input
                 type="date"
                 name="Enddate"
                 value={formData.Enddate}
                 onChange={handleInputChange}
                 className="w-full p-2 border border-gray-600 rounded-md"
               />
               {errors.Enddate && <p className="text-red-500 text-sm">{errors.Enddate}</p>}
   
               <label htmlFor="Budget" className="text-gray-700 font-semibold">Budget (in MAD)</label>
               <input
                 type="number"
                 name="Budget"
                 value={formData.Budget}
                 onChange={handleInputChange}
                 className="w-full p-2 border border-gray-600 rounded-md"
               />
               {errors.Budget && <p className="text-red-500 text-sm">{errors.Budget}</p>}
   
               <button
                 type="submit"
                 className="flex justify-end items-end bg-red-600 text-white py-2 font-semibold hover:bg-red-700 transition"
               >
                 Edit
               </button>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="flex justify-end items-end bg-gray-600 text-white py-2 px-4 font-semibold hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
   
   
             </form>
           </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
