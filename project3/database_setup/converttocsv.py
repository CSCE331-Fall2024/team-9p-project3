import csv
import re

# File paths
sql_file = "sales_data.sql"  # Path to your SQL file
customer_item_csv = "customer_item.csv"
customer_orders_csv = "customer_orders.csv"

# Define patterns for INSERT INTO statements
customer_item_pattern = re.compile(
    r"INSERT INTO customer_item \(item_ID,item_type,contains\)\nVALUES\((\d+),(\d+),'\[(.*?)\]'\);"
)
customer_orders_pattern = re.compile(
    r"INSERT INTO customer_orders \(order_ID,customer_item,order_time,price\)\nVALUES\((\d+),'\[(.*?)\]','(.*?)',(\d+)\);"
)

# Open the output CSV files
with open(customer_item_csv, mode="w", newline="") as item_csv_file, open(customer_orders_csv, mode="w", newline="") as orders_csv_file:
    # Create CSV writers
    item_writer = csv.writer(item_csv_file)
    orders_writer = csv.writer(orders_csv_file)
    
    # Write headers for each CSV
    item_writer.writerow(["item_ID", "item_type", "contains"])
    orders_writer.writerow(["order_ID", "customer_item", "order_time", "price"])

    # Read the SQL file
    with open(sql_file, "r") as file:
        content = file.read()

        # Find and write customer_item entries
        for match in customer_item_pattern.finditer(content):
            item_id = match.group(1)
            item_type = match.group(2)

            contains = "["
            contains += match.group(3) 
            contains += "]"



            item_writer.writerow([item_id, item_type, contains])

        # Find and write customer_orders entries
        for match in customer_orders_pattern.finditer(content):
            order_id = match.group(1)

            customer_item = "["
            customer_item += match.group(2)
            customer_item += "]"

            order_time = match.group(3)
            price = match.group(4)
            orders_writer.writerow([order_id, customer_item, order_time, price])

print("CSV files created successfully!")
