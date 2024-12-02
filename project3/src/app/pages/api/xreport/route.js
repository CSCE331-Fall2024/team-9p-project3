const { query } = require('../dbconn'); 

export async function POST(req) {
    try {
        // Parse the request body
        const { dateFrom, dateTo } = await req.json();

        console.log("dateFrom: ", dateFrom); 
        console.log("dateTo: ", dateTo);

        // SQL query to fetch orders between dateFrom and dateTo
        const sqlQuery = `
            SELECT 
                COUNT(*) AS order_count, 
                SUM(price) AS total_price 
            FROM customer_orders
            WHERE order_time BETWEEN $1 AND $2
        `;
        const values = [dateFrom, dateTo];

        // Execute the query
        const result = await query(sqlQuery, values);

        console.log("xreport result: ", result);

        // Return the results as JSON
        return new Response(JSON.stringify(result.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error in xreport API:", error);

        // Return an error response
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
