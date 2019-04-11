exports.up = function( knex, Promise ) {
    return knex.schema.createTable( "pictures", pictures => {
        pictures.increments();
        pictures.string( "url" ).notNullable();
        pictures.integer( "user_id" ).
            references( "id" ).
            inTable( "users" ).
            onUpdate( "CASCADE" ).
            onDelete( "CASCADE" ).
            notNullable();
    } );
};

exports.down = function( knex, Promise ) {
    return knex.schema.dropTableIfExists( "pictures" );
};
