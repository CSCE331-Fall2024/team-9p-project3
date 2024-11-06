import random
from datetime import datetime, timedelta


def convert_to_time(days_since_jan1, decimal_hours):
    # Define the starting point: January 1, 2024
    start_date = datetime(2024, 1, 1)
    
    # Calculate the number of full hours and minutes from the decimal hours
    full_hours = int(decimal_hours)  # Get the integer part for hours
    minutes = int((decimal_hours - full_hours) * 60)  # Convert the decimal part to minutes
    
    # Create a timedelta for the number of days and the time during the day
    time_delta = timedelta(days=days_since_jan1, hours=full_hours, minutes=minutes)
    
    # Add the timedelta to the start date
    result_date = start_date + time_delta
    
    # Return the result as a formatted string
    return result_date.strftime('%Y-%m-%d %H:%M:%S')


filename = "sales_data.sql"
sqlCommand = ""
# 39 weeks 750k = $2750 per day
# 1 peak day total
# 16 menu items
# bowl, plate, big plate
# sides - 5
# entree - 11
# appetizers - 2

# order attributes: Order_ID, Item, Time, Price

BOWL_PRICE = 8
PLATE_PRICE = 10
BIGGER_PLATE_PRICE = 12
APP_PRICE = 6
order_ID = 0
item_ID = 0
net_Sales = 0
currentTotal = 0

for day in range(39*7 + 1):
    daytotal = 2900 + random.randint(-500,600)

    # outlier day
    if day == 83:
        daytotal = 6000

    net_Sales += currentTotal
    currentTotal = 0
    while (currentTotal < daytotal):
        # create more orders
        print("DAY NUMBER ", day)
        # set order time with fluctuations
        timeGenerator = random.randint(1,100)
        if (timeGenerator < 40):
            # dinner rush
            time = random.normalvariate(17,0.5)
            while (time < 10 or time > 22):
                time = random.normalvariate(17,0.5)
        elif (timeGenerator < 70):
            # lunch rush
            time = random.normalvariate(13,0.5)
            while (time < 10 or time > 22):
                time = random.normalvariate(13,0.5)
        else:
            # other
            time = random.uniform(10,22)

        str_time = str(convert_to_time(day,time))

        order_ID += 1

        # determine how many items this order will contain
        itemsInThisOrder = 1
        while (random.randint(1,9) == 1):
            itemsInThisOrder +=1
        print("Day: ", day, "\torder: ", order_ID, "\ttime: ", str_time)

        item_IDS = "\'["
        order_price = 0
        for i in range(itemsInThisOrder):
            # add more items to order
            item_ID += 1
            item_IDS = item_IDS + str(item_ID) + ","
            orderType = random.randint(1,100)
            side = random.randint(0,4)
            if orderType < 40:
                # bowl - 1 side 1 entree - menu_item 0
                entrees = [random.randint(5,16)]
                currentTotal += BOWL_PRICE
                order_price += BOWL_PRICE
                print("item: ", i, "bowl with ", side, "side and ", entrees, " entrees")

                # CREATE ITEM HERE
                sqlCommand += "INSERT INTO customer_item (item_ID,item_type,contains)\nVALUES(" + str(item_ID) + "," + "0" + "," + "\'[" + str(side) +  "," + str(entrees[0]) + "]\');\n"


            elif orderType < 70:
                # plate 1 side 2 entrees - menu_item 1
                entrees = [random.randint(5,16), random.randint(5,16)]
                currentTotal += PLATE_PRICE
                order_price += PLATE_PRICE
                print("item: ", i, "plate with ", side, "side and ", entrees, " entrees")

                # CREATE ITEM HERE
                sqlCommand += "INSERT INTO customer_item (item_ID,item_type,contains)\nVALUES(" + str(item_ID) + "," + "1" + "," + "\'[" + str(side) +  "," + str(entrees[0]) + "," + str(entrees[1]) + "]\');\n"



            elif orderType < 95:
                # bigplate 1 side 3 entrees - menu_item 2
                entrees = [random.randint(5,16), random.randint(5,16),random.randint(5,16)]
                currentTotal += BIGGER_PLATE_PRICE
                order_price += BIGGER_PLATE_PRICE
                print("item: ", i, "bigger plate with ", side, "side and ", entrees, " entrees")

                # CREATE ITEM HERE
                sqlCommand += "INSERT INTO customer_item (item_ID,item_type,contains)\nVALUES(" + str(item_ID) + "," + "2" + "," + "\'[" + str(side) +  "," + str(entrees[0]) + "," + str(entrees[1]) + "," + str(entrees[2]) + "]\');\n"


            else:
                #app - menu_item 3
                appetizer = random.randint(17,19)
                currentTotal += APP_PRICE
                order_price += APP_PRICE
                print("item: ", i, "appetizer ", appetizer)

                # CREATE ITEM HERE
                sqlCommand += "INSERT INTO customer_item (item_ID,item_type,contains)\nVALUES(" + str(item_ID) + "," + "3" + "," + "\'[" + str(appetizer) + "]\');\n"


            
        # CREATE ORDER HERE
        item_IDS = item_IDS[:len(item_IDS)-1] + "]\'"
        sqlCommand += "INSERT INTO customer_orders (order_ID,customer_item,order_time,price)\nVALUES(" + str(order_ID) + "," + str(item_IDS) + ",\'" + str_time + "\'," + str(order_price) + ");\n"

print("net sales: ", net_Sales)
            

with open(filename, 'w') as sqlFile:
    sqlFile.write(sqlCommand)