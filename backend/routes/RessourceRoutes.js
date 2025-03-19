import express from "express";
import { CreatRessource, GetRessource, UpdateRessource, DeleteRessource } from "../controllers/RessourceControllers";

const RessourceRoute = express.Router();

RessourceRoute.post("/AddRessource", CreatRessource);
RessourceRoute.get("/GetRessource", GetRessource);
RessourceRoute.put("/UpdateRessource", UpdateRessource);
RessourceRoute.delete("/DeleteRessource", DeleteRessource);

export default RessourceRoute;