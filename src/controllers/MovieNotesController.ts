
import { Request, Response } from 'express';
import { connection } from "../database/knex";

export class MovieNotesController {

    async create(request:Request, response:Response){

        const { user_id } = request.params;

        const { title, description, rating } = request.body;

        await connection('movie_notes').insert({

            title,
            description,
            rating,
            user_id
    
        })

        return response.json()
    }

}