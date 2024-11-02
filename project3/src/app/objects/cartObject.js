// Import the client class from pg library. // using the 'pg' package for PostgreSQL
const { Client } = require('pg');

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

async function uploadCartToDatabase(cart) {
    const client = new Client({
        user: 'your_db_user',
        host: 'your_db_host',
        database: 'your_database',
        password: 'your_password',
        port: 5432,
    });
}
