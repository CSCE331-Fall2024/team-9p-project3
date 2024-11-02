// Import the client class from pg library. // using the 'pg' package for PostgreSQL
//const { Client } = require('pg');

export class Cart {
    constructor(...CartObjects) {
        this.items = [];
        CartObjects.forEach(cartObject => {
            if(cartObject instanceof CartObject) {
                this.items.push(cartObject);
            } else {
                console.log("Tried to construct Cart class with not a cartObjct");
            }
        });
    }
    addItem(item) {
        if(item instanceof CartObject) {
        this.items.push(item);
        } else {
            console.log("Tried to add a non CartObject to a Cart");
        }
    }
    getCartPrice() {
        let totalPrice = 0;
        this.items.forEach(cartObject => {
            totalPrice+=cartObject.getPrice();
        })
        return totalPrice;
    }
}

export class CartObject {
    //price = 0;
    constructor(sideOrAppetizer, entreeItems = []) {
        this.sideOrAppetizer = sideOrAppetizer;
        this.entreeItems = entreeItems;
    }
    getPrice() {
        //return this.price;
        switch (this.entreeItems.length) {
            case 0:
                return 3.00;
            case 1:
                return 8.00;
            case 2:
                return 10.00;
            case 3:
                return 12.00;
            default:
                break;
        }
    }
    getItemType() {
        switch (this.entreeItems.length) {
            case 0:
                return 'Appetizer';
            case 1:
                return 'Bowl';
            case 2:
                return 'Plate';
            case 3:
                return 'Bigger Plate';
            default:
                break;
        }
    }
    getItems() {
        //check if it's an appetizer
        if(this.entreeItems.length == 0) {
            return [this.sideOrAppetizer];
        } else {
            return [this.sideOrAppetizer, ...this.entreeItems];
        }
    }
}

// Define connection parameters
/* const teamName = "team_9p";
const dbName = `${teamName}_db`;
const dbConnectionString = `postgresql://csce-315-db.engr.tamu.edu/${dbName}`;
const dbUser = "YuanWang"; // p.s. I don't know whether this dbUser name is necessary. 
const dbPassword = "bumpyice26"; 

// Function to get a new database connection
function getConnection() {
    return new Client({
        connectionString: dbConnectionString,
        user: dbUser,
        password: dbPassword,
    });
}
/**
 * Uploads a Cart object to the database
 * @param {Cart} cart - The Cart object containing CartObjects to be uploaded
 */
/** 
async function uploadCartToDatabase(cart) {
    const client = getConnection();

    try{
        // Connect to the database; 
        await client.connect();
        console.log("Connected to the database.");

        // Start a transaction
        await client.query('BEGIN');

        // Insert each CartObject from the Cart object into the database
        for (const cartObject of cart.items) {
            const itemType = cartObject.getItemType();
            const items = cartObject.getItems().join(', '); // Convert items to a comma-separated string
            const price = cartObject.getPrice();

            // Insert into the database
            await client.query(
                // TODO: cart_items table, we need to create one. 
                'INSERT INTO cart_items (item_type, items, price) VALUES ($1, $2, $3)',
                [itemType, items, price]
            );
        }

        // Commit the transaction after successful insertion of all items
        await client.query('COMMIT');
        console.log("Cart successfully uploaded to the database.");
    }catch(error){
        // Roll back transaction if there’s an error
        await client.query('ROLLBACK');
        console.error("Failed to upload cart to database:", error);
    }finally{
        // Close the connection
        await client.end();
        console.log("Disconnected from the database.");
    }
}
 */