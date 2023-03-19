
import { Request, Response } from 'express';
import { sqliteConnetion } from '../database/sqlite';
import { hash } from 'bcryptjs';
import { AppError } from '../Utils/AppError';

export class UsersController {

    async create(request: Request, response: Response) {
        
        const { name, email, password } = request.body;

        const database = await sqliteConnetion();

        const hashedPassword = await hash(password, 8);

        const userWithTheSameEmail = await database.get(`SELECT * FROM users WHERE email = (?)`, [email]);

        if (userWithTheSameEmail) {
            throw new AppError({ message: "O email inserido já existe! Por favor, tente outro.", statusCode:301});
        }

        await database.run('INSERT INTO users(name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]);
        
        return response.status(201).json();

    }
}