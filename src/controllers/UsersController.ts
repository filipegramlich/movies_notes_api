import express, { Request, Response } from 'express';

export class UsersController {

    async create(request: Request, response: Response) {

        const { name, email, password } = request.body;



    }



}