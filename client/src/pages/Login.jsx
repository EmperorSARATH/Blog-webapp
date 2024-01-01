import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login =  () =>{

    const [input,setInput] = useState({
        username:"",
        password:"",
    })
    
    console.log(input);
    const [err,setErr] = useState(null);

    const { login } = useContext(AuthContext);
    


    const navigate = useNavigate();


    const handleChange = e =>{
        setInput(prev=> ({...prev, [e.target.name] : e.target.value }));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
       try{
        await login(input)
        navigate("/");
       } catch(err){
        setErr(err.response.data);
       }
        
    }

    return (
        <div className='auth'>
            <h1>Login</h1>
            <form>
                <input required type="text" placeholder='username' name='username' onChange={handleChange}/>
                <input required type="password" placeholder='password'name='password' onChange={handleChange}/>
                <button onClick={handleSubmit}>Login</button>
                { err && <p>{err}</p>}
                <span>Don't you have an account?<Link to="/register">Register</Link></span>
            </form>
           
        </div>
    )
}
export default Login;