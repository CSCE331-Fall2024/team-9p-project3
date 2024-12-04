

export default function productUsageChart({data}) {


    if (data) {
        return (
        <div>
            {data.map((item) => (
                <p key={item['inventory_string']}>{item['inventory_string']} : {item['count']}</p>
            ))}
        </div>
        )
    }
    return("no data")

}