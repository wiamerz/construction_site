import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from "react-hot-toast";
import Navbar from './Navbar';
import Footer from './Footer';

const AddDetails = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredRessources, setFilteredRessources] = useState([]); 
    const [selectedTask, setSelectedTask] = useState(""); 
    const [editingResource, setEditingResource] = useState(null); 

    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        quantite: '',
        taskID: '',
    });

    // Charger les tâches existantes
    useEffect(() => {
        axios.get("http://localhost:5000/api/tasks/GetTask")
            .then((response) => setTasks(response.data))
            .catch((err) => console.error("Error retrieving tasks:", err));
    }, []);

    // Récupérer les ressources liées à une tâche
    const fetchRessourcesByTask = async (taskID) => {
        setSelectedTask(taskID);
        try {
            const response = await axios.get(`http://localhost:5000/api/ressources/GetRessourcesByTask/${taskID}`);
            setFilteredRessources(response.data);
        } catch (error) {
            console.error("Error fetching ressources:", error);
            toast.error("Failed to load ressources.");
        }
    };

    // Gérer le changement de valeur des inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Ajouter une ressource
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.taskID) {
            toast.error("Please select a task.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/ressources/AddRessource", formData);
            toast.success("Resource added successfully!");
            fetchRessourcesByTask(formData.taskID);
            setFormData({ Name: '', Description: '', quantite: '', taskID: '' });
        } catch (error) {
            console.error("Error adding resource:", error);
            toast.error("Failed to add resource.");
        }
    };

    // Activer le mode édition
    const handleEditClick = (resource) => {
        setEditingResource(resource);
        setFormData({
            Name: resource.Name,
            Description: resource.Description,
            quantite: resource.quantite,
            taskID: resource.taskID,
        });
    };

    // Mettre à jour une ressource
    const handleEdit = async (e) => {
        e.preventDefault();
        if (!editingResource) return;

        try {
            await axios.put(`http://localhost:5000/api/ressources/UpdateRessource/${editingResource._id}`, formData);
            toast.success("Resource updated successfully!");
            fetchRessourcesByTask(selectedTask);
            setEditingResource(null);
            setFormData({ Name: '', Description: '', quantite: '', taskID: '' });
        } catch (error) {
            console.error("Error updating resource:", error);
            toast.error("Failed to update resource.");
        }
    };

    // Supprimer une ressource
    const handleDelete = async (resourceId) => {
        try {
            await axios.delete(`http://localhost:5000/api/ressources/DeleteRessource/${resourceId}`);
            toast.success("Resource deleted successfully!");
            fetchRessourcesByTask(selectedTask);
        } catch (error) {
            console.error("Error deleting resource:", error);
            toast.error("Failed to delete resource.");
        }
    };

    return (
        <>
            <Navbar />
            <Toaster position="top-center" />

            {/* Formulaire d'ajout de ressource */}
            <div className="bg-gray-100 rounded-lg shadow-md p-10 text-black w-full max-w-xl mx-auto mt-8">
                <h2 className="text-xl font-semibold text-red-600 mb-6">
                    {editingResource ? "Edit Resource" : "Add Resource"}
                </h2>
                <form onSubmit={editingResource ? handleEdit : handleSubmit} className="space-y-4">
                    <input type="text" name="Name" placeholder="Nom" value={formData.Name} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md" />
                    <input type="text" name="Description" placeholder="Description" value={formData.Description} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md" />
                    <input type="number" name="quantite" placeholder="Quantité" value={formData.quantite} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md" />
                    
                    <select name="taskID" value={formData.taskID} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded-md">
                        <option value="">Sélectionner un task</option>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <option key={task._id} value={task._id}>
                                    {task.Name}
                                </option>
                            ))
                        ) : (
                            <option disabled>Aucune tâche disponible</option>
                        )}
                    </select>

                    <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                        {editingResource ? "Update" : "Ajouter"}
                    </button>
                </form>
            </div>

            {/* Affichage des ressources */}
            <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-lg mt-6">
                <table className="min-w-full bg-white">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Quantité</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-black divide-gray-200">
                        {filteredRessources.length > 0 ? (
                            filteredRessources.map((resource) => (
                                <tr key={resource._id} className="hover:bg-gray-100 transition duration-300">
                                    <td className="px-6 py-4 text-sm">{resource.Name}</td>
                                    <td className="px-6 py-4 text-sm">{resource.Description}</td>
                                    <td className="px-6 py-4 text-sm">{resource.quantite}</td>
                                    
                                    <td className="px-6 py-4 flex gap-2">
                                        <button onClick={() => handleEditClick(resource)} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Edit</button>
                                        <button onClick={() => handleDelete(resource._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className="text-center text-gray-500 py-4">No resources found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Footer />
        </>
    );
};

export default AddDetails;












