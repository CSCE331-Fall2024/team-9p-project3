const { query } = require('./dbconn'); 

export default async function handler(req, res) {
  try {
    const query = `
      SELECT
          co.order_id,
          co.price,
          co.order_time,
          mi.type AS menu_item,
          ARRAY_AGG(si.name) AS servable_items
      FROM customer_orders co
      JOIN LATERAL jsonb_array_elements(co.customer_item) AS u(item_id) ON true
      JOIN customer_item ci ON ci.item_id = (u.item_id)::INTEGER
      JOIN menu_items mi ON mi.item_id = ci.item_type::INTEGER
      JOIN LATERAL jsonb_array_elements(ci.contains) AS uc(item_id) ON true
      JOIN servable_items si ON si.item_id = (uc.item_id)::INTEGER
      WHERE co.order_id BETWEEN 1 AND 5
      GROUP BY co.order_id, co.price, co.order_time, mi.type
      ORDER BY co.order_id;
    `;

    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
