// pages/api/uploadCartItems.js
import { uploadCustomerItems } from "@/app/api/upload/uploadCartToDatabase";
import { Cart } from "@/app/objects/cartObject";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { cartData } = req.body;
            // Recreate Cart instance from data
            const cart = new Cart(...cartData.items);
            const result = await uploadCustomerItems(cart);
            res.status(200).json({ success: true, result });
        } catch (error) {
            console.error("Error uploading cart items:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
