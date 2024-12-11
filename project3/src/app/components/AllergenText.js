import { useState, useEffect } from 'react';

// Defines a React component called AllergenText. 
// Used for showing allergen warning text. 
export default function AllergenText({cart}) {
    // Declare state variables and functions to update it. 
    const [ingredients, setIngredients] = useState(null); 
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    
    // Create a Set for unique element (that is, duplicate elements are not allowed)
    let menuItemsSet = new Set();

    // cart.items is a list of lists. Double through cart.items to get each menu item. 
    cart.items.forEach((item) => {
        item.getItems().forEach((newItem) => {
            // Add the menu item to the Set. 
            menuItemsSet.add(newItem);
        });
    });

    // Convert the Set to an Array. Now menuItemsSet is an array with unique menu item. 
    menuItemsSet = Array.from(menuItemsSet)

    // This function sends a POST request and returns a value sent by the server. 
    async function getIngredients() {
        // Sends a POST request to the API endpoint and save the return result to the variable called response. 
        const response = await fetch('./pages/api/allergen',{ // The path of API endpoint.
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                // Send this array within the POST request. 
                "menuItems":menuItemsSet  
            })
        })
        // Get the value which is returned by the API endpoint
        const data = await response.json()
        return data
    }

    // useEffect is a React Hook. It defines and runs a function. 
    useEffect(() => {
        // fetchData function assigns the return value of getIngredients function to the state variable named ingredients. 
        async function fetchData() {
            try {
                const ingredientsData = await getIngredients();  
                setIngredients(ingredientsData); 
                // assign false to the state variable loading. 
                setLoading(false);  
            } catch (error) {
                setError(error); 
                setLoading(false);  
            }
        }
        // run above function 
        fetchData(); 
    }, []);  // [] means that userEffect runs only once. 

        if (loading) return <p>Loading...</p>; 
        if (error) return <p>Error: {error.message}</p>;  
    
        // output on the frontend interface page. 
        return (
            <p>
                {ingredients.map((item, index) => item.inventory_item).join(', ')}
            </p>
        );

}