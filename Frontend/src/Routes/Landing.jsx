import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function Landing() {
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
    return <div></div>
}