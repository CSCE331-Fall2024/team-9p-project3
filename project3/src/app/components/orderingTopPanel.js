// This function defines the top Panel of customer ordering page. 
export default function OrderingTopPanel({ title }) {
    return (
        <div className="flex justify-center items-center h-1/6 w-full m-[12px] bg-gray-200">
        <h1 className="text-black text-4xl font-semibold">{title}</h1>
        </div>
    );
}