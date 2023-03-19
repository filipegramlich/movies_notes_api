
import { Request, Response } from 'express';
import { sqliteConnetion } from '../database/sqlite';
import { hash, compare } from 'bcryptjs';
import { AppError } from '../Utils/AppError';

export class UsersController {

    async create(request: Request, response: Response) {

        const { name, email, password } = request.body;

        const database = await sqliteConnetion();

        const hashedPassword = await hash(password, 8);

        const userWithTheSameEmail = await database.get(`SELECT * FROM users WHERE email = (?)`, [email]);

        if (userWithTheSameEmail) {
            throw new AppError({ message: "O email inserido já existe! Por favor, tente outro.", statusCode: 301 });
        }

        await database.run('INSERT INTO users(name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]);

        return response.status(201).json();

    }

    async update(request: Request, response: Response) {

        const { id } = request.params;

        const { name, email, password, old_password } = request.body;

        const database = await sqliteConnetion();

        const user = await database.get(`SELECT * FROM users WHERE id = (?)`, [id]);

        const userWithTheSameEmail = await database.get(`SELECT * FROM users WHERE email = (?)`, [email]);

        if (!user) {
            throw new AppError({ message: " Usuário não encontrado! ", statusCode: 404 });
        }

        if (password && !old_password) {
            throw new AppError({ message: "Para atualizar senha é necessario informar a senha antiga! ", statusCode: 400 });
        } else if (password && old_password) {
            const checkPassword = compare(password, old_password);

            if (!checkPassword) {
                throw new AppError({ message: "A senha antiga não confere! ", statusCode: 400 });
            }

            user.password = await hash(password, 8);
        }

        if (userWithTheSameEmail && userWithTheSameEmail.id !== user.id) {

            throw new AppError({ message: "O email inserido já existe! Por favor, tente outro.", statusCode: 301 });

        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;


        await database.run(`
        UPDATE users SET 
        name = (?),
        email = (?),
        password = (?),
        updated_at = DATETIME('now')
        WHERE id = (?)
       `,
            [user.name, user.email, user.password, id]
        );

        return response.json();

    }
}