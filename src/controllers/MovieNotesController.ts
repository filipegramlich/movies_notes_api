
import { Request, Response } from 'express';
import { connection } from "../database/knex";
import { AppError } from '../Utils/AppError';

export class MovieNotesController {

    async create(request: Request, response: Response) {

        const { user_id } = request.params;

        const { title, description, rating, tags } = request.body;

        if (rating > 5) {
            throw new AppError({ message: 'O rating para o filme deve ser de 0 até 5!', statusCode: 400 })
        }

        const [note_id] = await connection('movie_notes').insert({

            title,
            description,
            rating,
            user_id

        });

        const tagsOfMovie = await tags.map((name: any) => {

            return {
                note_id,
                name,
                user_id
            }

        });

        await connection('movie_tags').insert(tagsOfMovie);

        return response.json()
    }

    async show(request: Request, response: Response) {
        
        const { id } = request.params;

        const note = await connection('movie_notes').where({id});

        response.json(note);

    }
}