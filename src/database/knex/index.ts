import { config } from '../../../knexfile';
import knex from 'knex';

export const connection = knex(config.development);
