import { useNavigate } from "react-router-dom";

export function User({ Name, userID }) {
    const navigate = useNavigate();
    const letter = Name.split('')[0].toUpperCase();

    return <div className="flex items-center justify-between mb-2">
        <div className="flex items-center justify-between">
            <div className="bg-slate-300 px-4 py-2 rounded-full ml-2 font-medium text-lg mr-2">{letter}</div>
            <div>{Name}</div>
        </div>
        <button onClick={() => {
            localStorage.setItem("Transfer_To", userID);
            localStorage.setItem("Name", Name);
            navigate('/send');
        }} className='bg-gray-950 text-white py-2 px-4 rounded-md hover:bg-gray-800 font-medium text-base'>Send Money</button>
    </div>
}