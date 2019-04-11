const express = require( "express" );
const users = require( "../users/usersModel" );

const server = express();
const usersRouter = express.Router();

server.use( express.json() );
server.use( "/users", usersRouter );
server.get( "/", ( req, res ) => {
    res.status( 200 ).json( { api: "up" } );
    // res.status(200).send('hello');
} );

usersRouter.get( "/", ( req, res ) => {
    
    users.getAll().then( usersArray => {
        res.status( 200 ).json( usersArray );
        
    } ).catch( err => {
        res.status( 500 ).json( err );
    } );
} );

usersRouter.post( "/", async ( req, res ) => {
    try {
        
        const user = req.body;
        if ( !user || !user.first_name || !user.last_name ) {
            res.status( 500 ).
                json(
                    { message: "Please include the users first and last name in the request. " } );
            return;
        }
        const [ id ] = await users.insert( user );
        if ( id ) {
            const newUser = await users.getById( id );
            res.status( 201 ).json( newUser );
        }
    } catch ( e ) {
        res.status( 500 ).json( e );
    }
} );

usersRouter.delete( "/:id", async ( req, res ) => {
    const id = req.params.id;
    if ( !id ) {
        return res.status( 400 ).
            json( { message: "Please include a user id in the params." } );
    }
    
    try {
        const result = await users.remove( id );
        if ( result === 1 ) {
            return res.status( 200 ).
                json(
                    { message: `User with id ${ id } has been removed from the database.` } );
        }
    } catch ( e ) {
        return res.status( 500 ).json( e );
    }
} );

module.exports = server;
