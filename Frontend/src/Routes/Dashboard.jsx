import axios from "axios"
import { useEffect, useState } from "react"
import { User } from "../components/user";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const [balance, setBalance] = useState(0);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        axios.post("http://localhost:3000/api/v1/user/me", {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            navigate('/dashboard');
        }).catch(() => {
            navigate('/signup');
        })
    }, [])
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                setBalance(res.data.balance);
                setName(res.data.firstName);
            })
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${search}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                setUsers(res.data.users);
            })
    }, [search]);

    const letter = name.split('')[0];

    return <div>
        <div className="flex justify-between font-normal py-2 items-center px-6 shadow-gray-200 shadow-sm">
            <div>
                PayTM App
            </div>
            <div className="flex items-center justify-between">
                Hello
                <div className="bg-slate-300 px-4 py-2 rounded-full ml-2 font-medium text-lg">
                    {letter}
                </div>
                <button onClick={() => {
                    localStorage.setItem("token", "");
                    navigate('/signup');
                }} className='bg-gray-950 text-white w-full mt-3 mb-3 p-2 rounded-md hover:bg-gray-800 font-medium ml-3'>Log Out</button>
            </div>
        </div>
        <div className="p-8">
            <div className="font-bold text-lg">Your Balance &nbsp;&nbsp;&nbsp;&nbsp;Rs&nbsp;{balance.toFixed(2)}</div>
            <div className="mt-5 font-bold text-lg">Users</div>
            <Input placeholder={'Search Users...'} onChange={(e) => {
                setSearch(e.target.value);
            }}></Input>
            <div>{users.filter((user) => {
                return user.firstName !== name
            }).map((user) => {
                return <User Name={user.firstName} userID={user.userID} key={user.userID}></User>
            })}</div>
        </div>
    </div>
}