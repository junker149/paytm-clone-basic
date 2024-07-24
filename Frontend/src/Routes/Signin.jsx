import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from '../components/Input';

export function Signin(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        axios.post("http://localhost:3000/api/v1/user/me", {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            navigate('/dashboard');
        }).catch(() => {
            navigate('/signin');
        })
    }, [])

    return <div className="flex items-center justify-center h-screen bg-gray-300">
        <div className='rounded-md p-4 pt-8 bg-white'>
        <div className='text-3xl font-bold flex justify-center mb-1'>Sign in</div>
        <div className='text-gray-500 flex justify-center mb-4'>Enter your information to access your account</div>
            <Input placeholder={"xyz@gmail.com"} label={'Email'} onChange={(e) => {
                setEmail(e.target.value);
            }}></Input>
            <Input placeholder={"123456"} label={'Password'} onChange={(e) => {
                setPassword(e.target.value);
            }}></Input>
            <button onClick={() => {
                axios.post("http://localhost:3000/api/v1/user/signin", {
                    email: email,
                    password: password
                }).then((res) => {
                    localStorage.setItem("token", res.data.tkn);
                    navigate('/dashboard');
                })
            }} className='bg-gray-950 text-white w-full mt-4 mb-3 p-2 rounded-md hover:bg-gray-800 font-medium'>Sign in</button>
             <div className='text-center'>Don't have an account?<a className='hover:text-blue-800 font-normal' href='http://localhost:5173/signup'>Signup</a></div>
        </div>
    </div>
}