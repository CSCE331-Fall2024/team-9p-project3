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
}

export class CartObject {
    constructor(sideOrAppetizer, entreeItems = []) {
        this.sideOrAppetizer = sideOrAppetizer;
        this.entreeItems = entreeItems;
    }
}