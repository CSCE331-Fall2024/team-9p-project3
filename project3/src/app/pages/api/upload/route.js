import { uploadCustomerItems, uploadCartToDatabase } from "@/app/pages/api/uploadCartToDatabase";
import { Cart } from "@/app/objects/cartObject";
import { CartObject } from "@/app/objects/cartObject";

// This function handles a POST request for updating all related database tables when submitting a new order. 
export async function POST(req) {
    try {
        const { cartData } = await req.json();  // Parse JSON
        console.log("Received cartData:", cartData);

        // Check if items exist before creating Cart instance
        if (!cartData || !cartData.items) {
            throw new Error("Invalid cart data");
        }
        console.log("cartData.items: ", cartData.items);
        
        // Array to collect the results of each upload
        const results = [];
        const allgenerateIds = [];
        const allCartObject = []; 

        for(const cartDataItem of cartData.items){
            const cartobject = new CartObject(cartDataItem.sideOrAppetizer, cartDataItem.entreeItems);
            console.log("Created cartobject instance:", cartobject);

            allCartObject.push(cartobject);

            const cart = new Cart(cartobject);
            console.log("Created cart instance:", cart);

            const result = await uploadCustomerItems(cart);
            console.log("Database result:", result);
            
            results.push(result);

            for(const generateIds of result){
                allgenerateIds.push(generateIds);
            }
        }

        console.log("Database results: ", results); 
        console.log("All Generate Ids results: ", allgenerateIds); 
        console.log("All Cart Objects", allCartObject);


        const cartTotal = new Cart(...allCartObject);
        const cartresult = await uploadCartToDatabase(cartTotal, allgenerateIds);


        return new Response(JSON.stringify({ success: true, results }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in POST /api/upload:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}



