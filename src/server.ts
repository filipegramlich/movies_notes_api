import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { runMigrations } from './database/sqlite/migrations';
import { routes } from './routes';

import { AppError } from './Utils/AppError';

const app = express();
const port = 3001;

app.use(express.json());

runMigrations();

app.use(routes)

app.use((error:Error, request: Request, response: Response, next:NextFunction) => {

    if (error instanceof AppError) {
        
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });

    }

    console.log(error.message)

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error - index.ts'
    });

});

app.listen(port, () => { console.log(`Server is running on Port: ${port}`) });
