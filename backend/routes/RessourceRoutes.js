import express from "express";
import { CreatRessource, GetRessource, UpdateRessource, DeleteRessource } from "../controllers/RessourceControllers.js";

const RessourceRoute = express.Router();

RessourceRoute.post("/AddRessource", CreatRessource);
RessourceRoute.get("/GetRessource", GetRessource);
RessourceRoute.put("/UpdateRessource/:id", UpdateRessource);
RessourceRoute.delete("/DeleteRessource/:id", DeleteRessource);

export default RessourceRoute;