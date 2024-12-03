// const { query } = require('../dbconn'); 

// export async function POST(req) {
//     try {
//         // Parse the request body
//         const { dateFrom, dateTo } = await req.json();

//         console.log("dateFrom: ", dateFrom); 
//         console.log("dateTo: ", dateTo);

//         // SQL query to fetch orders between dateFrom and dateTo
//         const sqlQuery = `
//             SELECT 
//                 COUNT(*) AS order_count, 
//                 SUM(price) AS total_price 
//             FROM customer_orders
//             WHERE order_time BETWEEN $1 AND $2
//         `;
//         const values = [dateFrom, dateTo];

//         // Execute the query
//         const result = await query(sqlQuery, values);

//         console.log("xreport result: ", result);

//         // Return the results as JSON
//         return new Response(JSON.stringify(result.rows), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (error) {
//         console.error("Error in xreport API:", error);

//         // Return an error response
//         return new Response(JSON.stringify({ error: error.message }), {
//             status: 500,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     }
// }

const { query } = require("../dbconn");

export async function POST(req) {
    try {
        // Parse the request body
        const { dateFrom, dateTo } = await req.json();

        console.log("dateFrom: ", dateFrom);
        console.log("dateTo: ", dateTo);

        // SQL query to fetch total orders and price
        const totalQuery = `
            SELECT 
                COUNT(*) AS order_count, 
                COALESCE(SUM(price), 0) AS total_price 
            FROM customer_orders
            WHERE order_time BETWEEN $1 AND $2
        `;
        const totalValues = [dateFrom, dateTo];
        const totalResult = await query(totalQuery, totalValues);

        // SQL query to fetch hourly sales and orders
        const hourlyQuery = `
            SELECT 
                DATE_TRUNC('hour', order_time) AS hour, 
                COUNT(*) AS order_count, 
                SUM(price) AS total_price
            FROM customer_orders
            WHERE order_time BETWEEN $1 AND $2
            GROUP BY hour
            ORDER BY hour
        `;
        const hourlyResult = await query(hourlyQuery, totalValues);

        console.log("xreport total result: ", totalResult);
        console.log("xreport hourly result: ", hourlyResult);

        // Return both total and hourly data
        return new Response(
            JSON.stringify({
                total: totalResult.rows[0],
                hourly: hourlyResult.rows,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error in xreport API:", error);

        // Return an error response
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

