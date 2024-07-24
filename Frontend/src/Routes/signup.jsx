import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Input } from '../components/Input';

export function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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

    return <div className='flex items-center justify-center h-screen bg-gray-300'>
        <div className='rounded-md p-4 pt-8 bg-white'>
            <div className='text-3xl font-bold flex justify-center mb-1'>Sign up</div>
            <div className='text-gray-500 flex justify-center mb-4'>Enter your information to create an account</div>
            <Input placeholder={'John'} label={'First Name'} onChange={(e) => {
                setFirstName(e.target.value);
            }}></Input>
            <Input placeholder={'Doe'} label={'Last Name'} onChange={(e) => {
                setLastName(e.target.value);
            }}></Input>
            <Input placeholder={'xyz@gmail.com'} label={'Email'} onChange={(e) => {
                setEmail(e.target.value);
            }}></Input>
            <Input placeholder={'123456'} label={'Password'} onChange={(e) => {
                setPassword(e.target.value);
            }}></Input>
            <button onClick={() => {
                axios.post("http://localhost:3000/api/v1/user/signup", {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                }).then((res) => {
                    localStorage.setItem("token", res.data.tkn);
                    navigate('/dashboard');
                })
            }} className='bg-gray-950 text-white w-full mt-4 mb-3 p-2 rounded-md hover:bg-gray-800 font-medium'>Sign up</button>
            <div className='text-center'>Already have an account?<a className='hover:text-blue-800 font-normal' href='http://localhost:5173/signin'>Login</a></div>
        </div>
    </div>
}
