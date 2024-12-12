const { query } = require("../dbconn");

// This function handles a POST request for generating the Z report. 
export async function POST(req) {
    try {
        // Parse the request body
        // Lock the z_report_metadata table. In other word, updates and selections cannot be done at the same time.
        await query("BEGIN"); 
        await query("LOCK TABLE z_report_metadata IN SHARE ROW EXCLUSIVE MODE");

        // Select the last generated time of Z report. 
        const lastGeneratedQuery = `
            SELECT last_generated_time::TEXT AS last_generated_time 
            FROM z_report_metadata 
            ORDER BY id DESC 
            LIMIT 1
        `;
        // Executes the Database command using query() function.
        const lastGeneratedResult = await query(lastGeneratedQuery);
        const lastGeneratedTime = lastGeneratedResult.rows[0].last_generated_time;
        // Unlock 
        await query("COMMIT");

        // await new Promise((resolve) => setTimeout(resolve, 1000));

        // The current time of generating a new z-report. 
        const newGeneratedTime = new Date();
        // This function converts the time to be en-US time zone and format the time display. 
        const formatDateTime = (date) => {
                    return date.toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false, // Using 24 hours format
                    });
                };
        // Using the above function to the newGeneratedTime. 
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

        // Executes the Database command using query() function.
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
        // Executes the above Database command using query() function.
        const hourlyResult = await query(hourlyQuery, totalValues);


        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // lock 
        await query("BEGIN");
        await query("LOCK TABLE z_report_metadata IN SHARE ROW EXCLUSIVE MODE");

        // Update the last generated time in the database
        const updateLastGeneratedQuery = `
            INSERT INTO z_report_metadata (last_generated_time) 
            VALUES ($1)
        `;
        
        // Executes the above Database command using query() function.
        await query(updateLastGeneratedQuery, [formattednewGenerated]);
        // Unlock 
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

