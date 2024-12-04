import { useState, useEffect } from 'react';

export default function AllergenText({cart}) {
    const [ingredients, setIngredients] = useState(null);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    let menuItemsSet = new Set();
    cart.items.forEach((item) => {
        item.getItems().forEach((newItem) => {
            menuItemsSet.add(newItem);
        });
    });
    menuItemsSet = Array.from(menuItemsSet)

    async function getIngredients() {
        const response = await fetch('./pages/api/allergen',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "menuItems":menuItemsSet
            })
        })
        const data = await response.json()
        return data
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const ingredientsData = await getIngredients();  
                setIngredients(ingredientsData); 
                setLoading(false);  
            } catch (error) {
                setError(error); 
                setLoading(false);  
            }
        }

        fetchData(); 
    }, []);  

        if (loading) return <p>Loading...</p>; 
        if (error) return <p>Error: {error.message}</p>;  
    

        return (
            <p>
                {ingredients.map((item, index) => item.inventory_item).join(', ')}
            </p>
        );

}