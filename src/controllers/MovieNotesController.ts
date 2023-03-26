
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

    async delete(request: Request, response: Response){

        const { id } = request.params;

        await connection('movie_notes').where({ id }).delete();

        return response.json()

    }

    async index(request: Request, response: Response){

        const { user_id, title, tags } = request.query;

        let notes;


        if(tags){
            
            const filterTags = (tags as string).split(',').map((tag: string) => tag.trim());

            notes = await connection('movie_tags').select([
                'movie_notes.id',
                'movie_notes.title',
                'movie_notes.user_id'
            ]).where('movie_notes.user_id', user_id)
                .whereLike('title',`%${title}%`)
                .whereIn('name', filterTags)
                .innerJoin('movie_notes','movie_notes.id', "movie_tags.note_id")
                .orderBy('movie_notes.title');


        } else {
            notes = await connection('movie_notes').where({ user_id }).whereLike('title',`%${title}%`).orderBy('title');
        }

        const userTags = await connection('movie_tags').where({ user_id });

        const notesWithTags = notes.map((note: any) => {

            const noteTags = userTags.filter((tag: any) => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            }
        });

        response.json(notesWithTags);

    }
}