import { Router } from "express";
import { MovieNotesController } from "../controllers/MovieNotesController";

export const moviesNotesRoutes = Router();

const movieNotesController  = new MovieNotesController;

moviesNotesRoutes.post('/:user_id', movieNotesController.create);

