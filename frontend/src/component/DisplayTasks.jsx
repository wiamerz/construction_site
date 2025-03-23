import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import Footer from './Footer';
import Navbar from './Navbar';


const DisplayTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [errors, setErrors] = useState({}); 
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({
        Name:'',
        Description: '',
        StartDate: '',
        EndDate: '',
      });

      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData (prev => ({
          ...prev,
          [name]: type === "file" ? files [0] : value
        }))
      }
  
      useEffect(() => {
        axios
          .get("http://localhost:5000/api/tasks/GetTask")
          .then((response) => {
            console.log("Raw response:", response);
            console.log("tasks fetched:", response.data);
      
            if (Array.isArray(response.data)) { 
              setTasks(response.data);
            } else {
              console.error("Unexpected response format:", response.data);
            }
          })
          .catch((err) => console.error("Error retrieving tasks:", err));
      }, []);
    

      const handleEditClick = (task) => {
        const formatDate = (dateString) => {
          const date = new Date(dateString);
          return date.toISOString().split('T')[0];
        };

        setEditingTask(task);
        setFormData({
          Name: task.Name,
          Description: task.Description,
          StartDate: formatDate(task.StartDate),
          EndDate: formatDate(task.EndDate),
        });
      };


      //handle edit task 
      const handleEdit = (e) => {
        e.preventDefault();

        if(editingTask){
          axios.put(`http://localhost:5000/api/tasks/UpdateTask/${editingTask._id}`, formData)
          .then(response => {

            setTasks(tasks.map(task => 
              task._id === editingTask._id ? {...task, ...formData} : task
            ));
            setEditingTask(null);
          })
          .catch(err => console.error("update error:", err));
        }
      };

      // handle task delete
      const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/tasks/DeleteTask/${id}`)
        .then(() => {
          setTasks(prev => prev.filter(task => task._id !== id ));
          console.log("task deleted successfully");
        })
        .catch(err => console.error("Delete error:",err))
      }

  return (
    <>
    <Navbar/>
   <div className="container mx-auto p-8">
    {/* Title */}
    <div className='text-3xl m-15 font-bold text-red-600 flex justify-center items-center'>
      # tasks
    </div>

    {/* Table Container */}
    <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Task title </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">task Description</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">start date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">end date</th>
            
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
                    
                    <button  onClick={()=> handleEditClick(task)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                     Edit
                    </button>
                    <button onClick={() => handleDelete(task._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm">
                      Delete
                    </button>
                  </motion.div>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                Aucun task disponible.
              </td>
            </tr>
          )}
        </tbody>
      </table>





      {/* ------------------------edit card------------------- */}

      { editingTask && (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">

        <div className="bg-gray-50 rounded-lg shadow-md p-8 text-black w-full max-w-xl">
          <h2 className="text-xl font-semibold flex text-red-600 items-center gap-2 mb-6">
            # edit task
          </h2>
          
          <form onSubmit={handleEdit} className="space-y-4"> 
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
              edit
            </button>
            <button
              onClick={() => setEditingTask(null)}
              type="submit"
              className="flex justify-end items-end bg-gray-600 text-white py-2 font-semibold hover:bg-red-700 transition"
            >
              cancel 
            </button>


          </form>
        </div>

      </div>
      )}

    </div>
  </div>
  <Footer/>
  </>
  )
}

export default DisplayTasks;




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// const ProjectDetails = () => {
//   const { id } = useParams(); // Récupère l'ID du projet depuis l'URL
//   const [project, setProject] = useState(null);
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     // Récupérer les détails du projet
//     axios.get(`http://localhost:5000/api/projects/${id}`)
//       .then(response => setProject(response.data))
//       .catch(error => console.error("Erreur lors du chargement du projet", error));

//     // Récupérer les tâches associées à ce projet
//     axios.get(`http://localhost:5000/api/tasks?projectId=${id}`)
//       .then(response => setTasks(response.data))
//       .catch(error => console.error("Erreur lors du chargement des tâches", error));
//   }, [id]);

//   if (!project) return <p>Chargement...</p>;

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto p-8">
//         <h1 className="text-3xl font-bold text-red-600">{project.Name}</h1>
//         <p className="text-gray-700 mt-4">{project.Description}</p>

//         {/* Liste des tâches du projet */}
//         <h2 className="text-2xl font-semibold mt-6">Tâches associées</h2>
//         <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-lg mt-4">
//           <table className="min-w-full bg-white">
//             <thead className="bg-black text-white">
//               <tr>
//                 <th className="px-6 py-3 text-left">Nom de la tâche</th>
//                 <th className="px-6 py-3 text-left">Description</th>
//                 <th className="px-6 py-3 text-left">Date de début</th>
//                 <th className="px-6 py-3 text-left">Date de fin</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {tasks.length > 0 ? (
//                 tasks.map(task => (
//                   <tr key={task._id} className="hover:bg-gray-100 transition">
//                     <td className="px-6 py-4">{task.Name}</td>
//                     <td className="px-6 py-4">{task.Description}</td>
//                     <td className="px-6 py-4">{new Date(task.StartDate).toLocaleDateString()}</td>
//                     <td className="px-6 py-4">{new Date(task.EndDate).toLocaleDateString()}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
//                     Aucune tâche disponible.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProjectDetails;
