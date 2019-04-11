const faker = require( "faker" );

const getUsers = () => {
    const numberOfUsers = Math.ceil( Math.random() * 50 ) + 50;
    let users = [];
    for ( let i = 0; i < numberOfUsers; i++ ) {
        let user = {
            first_name: faker.name.firstName(),
            last_name:  faker.name.lastName()
        };
        users.push( user );
    }
    
    return users;
};

exports.seed = function( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( "users" ).truncate().then( () => {
        return knex( "users" ).insert( getUsers() );
    } );
};
