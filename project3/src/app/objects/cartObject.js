// Defination of Cart class
export class Cart {
    // constructor of the Cart class. 
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
    // Add a type of CartObject value to the items list. 
    addItem(item) {
        if(item instanceof CartObject) {
        this.items.push(item);
        } else {
            console.log("Tried to add a non CartObject to a Cart");
        }
    }

    // Get the price of a customer's cart
    getCartPrice() {
        let totalPrice = 0;
        // Loop through the cart to calculate the total price. 
        this.items.forEach(cartObject => {
            totalPrice+=cartObject.getPrice();
        })
        return totalPrice;
    }

    // Remove a cartObject such as Bowl from the customer's cart. 
    removeItem(item) {
        if(item instanceof CartObject) { 
            console.log(item);
            console.log(this.items);
            const ind = this.items.indexOf(item);
            if(ind > -1) {
                this.items.splice(ind, 1);
            } else {
                console.log("When rmeoving item from cart, item not found.");
            }
        } else {
            // Error message if the item is not type of CartObject. 
            console.log("Tried to remove a non CartObject item from cart");
        }
    }
}

// Definition of CartObject class 
export class CartObject {
    // Constructor of CartObject class 
    constructor(sideOrAppetizer, entreeItems = []) {
        this.sideOrAppetizer = sideOrAppetizer;
        this.entreeItems = entreeItems;
    }
    // Get the price of a CartObject such as Bowl, Plate, Bigger Plate, and Appetizer. 
    getPrice() {
        // Based on different types, return different prices. 
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
    // Get the ItemType of this CartObject. 
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
    // Return the Itemtype of this CartObject as a Number
    getItemTypeAsNumber() {
        switch (this.entreeItems.length) {
            case 0:
                return 3;
            case 1:
                return 0;
            case 2:
                return 1;
            case 3:
                return 2;
            default:
                break;
        }
    }
    // Return a list of menu items inside the CartObject, such as [Orange Chicken, Mushroom Chicken]; 
    getItems() {
        //check if it's an appetizer
        if(this.entreeItems.length == 0) {
            return [this.sideOrAppetizer];
        } else {
            return [this.sideOrAppetizer, ...this.entreeItems];
        }
    }
}