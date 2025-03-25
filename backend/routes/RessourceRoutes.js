import express from "express";
import { CreatRessource, GetRessource, getRessourcesByTask, UpdateRessource, DeleteRessource } from "../controllers/RessourceControllers.js";

const RessourceRoute = express.Router();

RessourceRoute.post("/AddRessource", CreatRessource);
RessourceRoute.get("/GetRessources", GetRessource); // Correction du nom pour récupérer toutes les ressources
RessourceRoute.get("/GetRessourcesByTask/:taskID", getRessourcesByTask); // taskId doit être utilisé au lieu de id
RessourceRoute.put("/UpdateRessource/:id", UpdateRessource);
RessourceRoute.delete("/DeleteRessource/:id", DeleteRessource);

export default RessourceRoute;
