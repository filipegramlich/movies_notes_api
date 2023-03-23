import { Router } from "express";
import { MoviesTagsController } from "../controllers/TagsController";

export const moviesTagsRoutes = Router();

const moviesTagsController  = new MoviesTagsController;

moviesTagsRoutes.get('/:user_id', moviesTagsController.index);

