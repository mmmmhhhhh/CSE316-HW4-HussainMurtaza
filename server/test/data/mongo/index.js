const dotenv = require('dotenv').config({ path: __dirname + '/../../../.env' });
const MongoDBManager = require('../../../db/mongodb');

async function resetMongo() {
    const dbManager = new MongoDBManager();
    const testData = require("../example-db-data.json");
    
    console.log("Resetting the Mongo DB");

    try {
        // Connect to database
        await dbManager.connect(process.env.DB_CONNECT);

        // Clear existing data
        await dbManager.deleteAllPlaylists();
        console.log("Playlists cleared");
        
        await dbManager.deleteAllUsers();
        console.log("Users cleared");

        // Fill playlists
        for (let i = 0; i < testData.playlists.length; i++) {
            await dbManager.createPlaylist(testData.playlists[i]);
        }
        console.log("Playlists filled");

        // Fill users
        for (let i = 0; i < testData.users.length; i++) {
            await dbManager.createUser(testData.users[i]);
        }
        console.log("Users filled");

        console.log("Mongo DB reset complete!");
        process.exit(0);
    } catch (error) {
        console.error("Error resetting Mongo DB:", error);
        process.exit(1);
    }
}

resetMongo();