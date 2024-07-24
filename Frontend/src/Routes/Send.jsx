import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";

export function Send() {
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    const Name = localStorage.getItem("Name");
    const letter = Name.split('')[0].toUpperCase();

    return <div className='flex items-center justify-center h-screen bg-slate-100'>
        <div className='rounded-md p-4 pt-8 px-8 bg-white w-80 shadow-lg shadow-slate-400'>
            <div className='text-3xl font-bold flex justify-center mb-16'>Send Money</div>
            <div className="flex items-center">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full ml-2 font-medium text-lg">{letter}</div>
                <div className="ml-3 text-lg font-bold">{Name}</div>
            </div>
            <div className="font-semibold mb-3">Amount(in Rs)</div>
            <div>
            <Input placeholder="Enter amount" onChange={(e) => {
                setAmount(e.target.value);
            }}></Input>
            </div>
            <button onClick={() => {
                const to = localStorage.getItem("Transfer_To");
                axios.post(`http://localhost:3000/api/v1/account/transfer`, {
                    to: to,
                    amount: amount
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }).then(() => {
                    localStorage.setItem("Transfer_To", "");
                    navigate('/dashboard');
                })
            }} className='bg-green-500 text-white w-full mt-4 mb-3 p-2 rounded-md hover:bg-green-400 font-medium text-sm'>Initiate Transaction</button>
        </div>
    </div>
}