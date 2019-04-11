const db = require( "../data/dbConfig.js" );

module.exports = {
    insert,
    remove,
    getAll,
    getById
};

async function getById( id ) {
    return await db( "users" ).where( { id } ).first();
}

async function insert( user ) {
    return await db( "users" ).
        insert( user );
}

async function remove( id ) {
    return await db( "users" ).where( { id: id } ).delete();
}

async function getAll() {
    return await db( "users" );
}

