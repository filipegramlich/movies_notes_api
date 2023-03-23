import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { moviesNotesRoutes } from "./movie_notes.routes";
import { moviesTagsRoutes } from "./movie_tags.routes";


export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/notes', moviesNotesRoutes);
routes.use('/tags', moviesTagsRoutes);