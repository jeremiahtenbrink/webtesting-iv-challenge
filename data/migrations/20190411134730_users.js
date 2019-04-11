exports.up = function( knex, Promise ) {
    return knex.schema.createTable( "users", users => {
        users.increments();
        users.string( "first_name", 255 ).notNullable();
        users.string( "last_name", 255 ).notNullable();
    } );
};

exports.down = function( knex, Promise ) {
    return knex.schema.dropTableIfExists( "users" );
};
