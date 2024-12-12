const {Client} = require('pg');

// Basic information of backend database 
const teamName = "team_9p";
const dbName = `${teamName}_db`;
const dbConnectionString = `postgresql://csce-315-db.engr.tamu.edu/${dbName}`;
const dbUser = "team_9p"; 
const dbPassword = "bumpyice26"; 
const dbHost = "csce-315-db.engr.tamu.edu"; 

let conn;
console.log('initializing db file');

// This function implements the connection of database 
async function getConn() {
    // Console Message
    console.log('Setting up conn'); 
    if (!conn) {
        // Create the object of database connection 
        conn = new Client ({
            host: dbHost,
            user: dbUser,
            password: dbPassword,
            database: dbName,
            port: 5432,
        });    
        // connect the database
        await conn.connect();
        // Console message
        console.log("Connected to the database successfully.");

    }
    return conn;
}

async function query(text, params) {
    getConn();
    return conn.query(text, params);  
}

module.exports = { query };