import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { moviesNotesRoutes } from "./movie_notes.routes";

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/notes', moviesNotesRoutes);