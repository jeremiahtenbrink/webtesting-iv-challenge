const db = require( "../data/dbConfig" );
const users = require( "./usersModel" );

const user = {
    first_name: "Jeremiah",
    last_name:  "Tenbrink",
};

const user2 = {
    first_name: "Jeremiah2",
    last_name:  "Tenbrink2",
};

const user3 = {
    first_name: "Jeremiah3",
    last_name:  "Tenbrink3",
};

describe( "Users model", () => {
    beforeEach( async () => {
        await db( "users" ).truncate();
    } );
    
    describe( "insert()", () => {
        it( "should insert 2 users", async () => {
            await users.insert(
                user );
            await users.insert(
                user2 );
            
            const usersTable = await db( "users" );
            expect( usersTable ).toHaveLength( 2 );
        } );
        it( "should insert user3", async () => {
                await users.insert( user3 );
                const usersTable = await db( "users" );
                console.log( usersTable );
                expect( usersTable[ 0 ] ).toEqual( { ...user3, id: 1 } );
            }
        );
    } );
    
    describe( "delete()", async () => {
            it( "should delete a user from the db", async () => {
                    await users.insert( user );
                    await users.insert( user2 );
                    let table = await db( "users" );
                    expect( table ).toHaveLength( 2 );
                    await users.remove( 2 );
                    table = await db( "users" );
                    expect( table ).toHaveLength( 1 );
                }
            );
            it( "should remove user from the db and leave user2", async () => {
                await users.insert( user );
                await users.insert( user2 );
                await users.remove( 1 );
                let usersTable = await db( "users" );
                expect( usersTable ).
                    toHaveLength( 1 );
                expect( usersTable ).
                    toEqual( [ { ...user2, id: 2 } ] );
            } );
        }
    );
} );