import { Router } from "express";
import { MovieNotesController } from "../controllers/MovieNotesController";

export const moviesNotesRoutes = Router();

const movieNotesController  = new MovieNotesController;

moviesNotesRoutes.get('/', movieNotesController.index);
moviesNotesRoutes.post('/:user_id', movieNotesController.create);
moviesNotesRoutes.get('/:id', movieNotesController.show);
moviesNotesRoutes.delete('/:id', movieNotesController.delete);

