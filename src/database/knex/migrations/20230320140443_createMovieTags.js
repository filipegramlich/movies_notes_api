
exports.up = knex => {
    return knex.schema.createTable('movie_tags', table => {

        table.increments('id');
        table.integer('note_id').references('id').inTable('movie_notes').onDelete('CASCADE');
        table.integer('user_id').references('id').inTable('movie_notes');
        table.text('name').notNullable();

    });
};

exports.down = knex => {
    return knex.schema.dropTable('movie_tags');
};
