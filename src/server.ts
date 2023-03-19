import express from 'express';
import { runMigrations } from './database/sqlite/migrations';

const app = express();
const port = 3001;

app.use(express.json());

runMigrations();

app.listen(port, () => { console.log(`Server is running on Port: ${port}`) });
