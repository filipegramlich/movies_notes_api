import sqlite3 from "sqlite3";
import { open } from 'sqlite';
const path = require("path");

export async function sqliteConnetion() {

    const database = await open({
        filename: path.resolve(__dirname, '..','database.db'), 
        driver: sqlite3.Database
    });

    return database;

}