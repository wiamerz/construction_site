import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/project/GetProject")
      .then((response) => {
        console.log("Raw response:", response);
        console.log("Projects fetched:", response.data);
  
        if (Array.isArray(response.data)) {  // Vérifier si c'est bien un tableau
          setProjects(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((err) => console.error("Error retrieving projects:", err));
  }, []);

  // handle project edition
  const handleEdit = (id) => {
    
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
        # About us
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
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                        Modifier
                      </button>
                      <button onClick={() => handleDelete(project._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                        Supprimer
                      </button>
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
      </div>
    </div>
  );
};

export default Projects;
