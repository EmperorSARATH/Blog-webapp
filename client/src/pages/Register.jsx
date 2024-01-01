import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Register =  () =>{

    const [input,setInput] = useState({
        username:"",
        email:"",
        password:"",
    })
    
    console.log(input);
    const [err,setErr] = useState(null);

    const navigate = useNavigate();
    const handleChange = e =>{
        setInput(prev=> ({...prev, [e.target.name] : e.target.value }));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
       
            await axios.post("api/auth/register",input).then((res)=>{
                console.log(res);
            }).then(()=>{
                navigate("/login")
            }).catch((err)=>{
                setErr(err.response.data);
            })
    }
    return (
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <input required type="text" placeholder='username' name='username' onChange={handleChange}/>
                <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
                <input required type="email" placeholder='email' name='email' onChange={handleChange}/>
                <button onClick={handleSubmit}>Register</button>
               { err && <p>{err}</p>}
                <span>Already have an account?<Link to="/login">Login</Link></span>
            </form>
           
        </div>
    )
}
export default Register;