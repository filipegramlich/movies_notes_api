
import { createUsersTable } from "./createUsersTable";
import { sqliteConnetion } from "..";

export async function runMigrations() {

    const schemas =
        [createUsersTable].join('');

    sqliteConnetion()
        .then(db => db.exec(schemas))
        .catch(error => {
            console.log(error);
        });
}