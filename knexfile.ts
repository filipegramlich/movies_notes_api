import path from 'node:path';

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src','database','database.db')
    },
    pool: {
      // @ts-ignore
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
    },
    migrations: {
      directory: path.resolve(__dirname,'src', 'database','knex', 'migrations')
    },
    useNullAsDefault:true
  }
};
