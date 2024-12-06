const { query } = require("../dbconn");

export async function POST(req) {
    try {
        // Parse the request body
        await query("BEGIN");
        await query("LOCK TABLE z_report_metadata IN SHARE ROW EXCLUSIVE MODE");
        const lastGeneratedQuery = `
            SELECT last_generated_time::TEXT AS last_generated_time 
            FROM z_report_metadata 
            ORDER BY id DESC 
            LIMIT 1
        `;
        const lastGeneratedResult = await query(lastGeneratedQuery);
        const lastGeneratedTime = lastGeneratedResult.rows[0].last_generated_time;
        await query("COMMIT");

        // await new Promise((resolve) => setTimeout(resolve, 1000));

        const newGeneratedTime = new Date();
        const formatDateTime = (date) => {
                    return date.toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                    });
                };
        const formattednewGenerated = formatDateTime(newGeneratedTime);

        // SQL query to fetch total orders and price
        const totalQuery = `
            SELECT 
                COUNT(*) AS order_count, 
                COALESCE(SUM(price), 0) AS total_price 
            FROM customer_orders
            WHERE order_time BETWEEN $1 AND $2
        `;
        const totalValues = [lastGeneratedTime, formattednewGenerated];
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


        await new Promise((resolve) => setTimeout(resolve, 1000));

        await query("BEGIN");
        await query("LOCK TABLE z_report_metadata IN SHARE ROW EXCLUSIVE MODE");


        // Update the last generated time in the database
        const updateLastGeneratedQuery = `
            INSERT INTO z_report_metadata (last_generated_time) 
            VALUES ($1)
        `;
        await query(updateLastGeneratedQuery, [formattednewGenerated]);

        await query("COMMIT");

        // Return both total and hourly data
        return new Response(
            JSON.stringify({
                total: totalResult.rows[0],
                hourly: hourlyResult.rows,
                dateFrom: lastGeneratedTime,
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

