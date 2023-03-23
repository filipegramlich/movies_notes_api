
import { Request, Response } from 'express';
import { connection } from "../database/knex";

export class MoviesTagsController {

    async index(request:Request, response: Response){

        const { user_id } = request.params;

        const tags = await connection('movie_tags').where({user_id});

        return response.json(tags);
        
    }
}