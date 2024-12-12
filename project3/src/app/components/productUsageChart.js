
// This function defines the productUsageChart
export default function productUsageChart({data}) {

    if (data) {
        return (
        <div>
            {data.map((item) => (
                <p key={item['inventory_string']} className="text-lg font-medium text-gray-800 mb-2">{item['inventory_string']} : {item['count']}</p>
            ))}
        </div>
        )
    }
    return("no data")

}