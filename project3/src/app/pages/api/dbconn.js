const {Client} = require('pg');


const teamName = "team_9p";
const dbName = `${teamName}_db`;
const dbConnectionString = `postgresql://csce-315-db.engr.tamu.edu/${dbName}`;
const dbUser = "team_9p"; 
const dbPassword = "bumpyice26"; 
const dbHost = "csce-315-db.engr.tamu.edu"; 

let conn;
console.log('initializing db file');

async function getConn() {
    console.log('Setting up conn');
    if (!conn) {
        conn = new Client ({
            connectionString: dbConnectionString,
            host: dbHost,
            user: dbUser,
            password: dbPassword,
        });        
        await conn.connect();
        console.log("Connected to the database successfully.");

    }
    return conn;
}

async function query(text, params) {
    getConn();
    return conn.query(text, params);  
}

module.exports = { query };