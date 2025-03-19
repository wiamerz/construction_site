import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import ProjectRoutes from './routes/ProjectsRoutes.js';
import TasksRoutes from './routes/TaskRoutes.js';
import RessourcesRoutes from './routes/RessourceRoutes.js';

dotenv.config();
const app = express();

// Add middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/construction';
mongoose.connect(mongoURI)
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => {
    console.error('MongoDB connection error:', err);
 });

// Routes
app.use('/api/project', ProjectRoutes);
app.use('/api/tasks', TasksRoutes);
app.use('/api/ressources', RessourcesRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});