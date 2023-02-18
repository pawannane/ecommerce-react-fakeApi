import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(username, password)
        await fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            body:JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res=>{console.log(res);res.json()})
            .then(json=>console.log(json))
    }
    return (
        <div className='container'>
            <br />
            <br />
            <h1>Login</h1>
            <hr />
            {
                successMsg && <div className="success-msg">{successMsg}</div>
            }
            <form className='form-group' autoComplete='off' onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input type="username" className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} required />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br />
                <div className="btn-box">
                    <span>Don't have an account? Sign Up <Link to='/signup' className='link'>Here</Link></span>
                    <button type='submit' className="btn btn-success btn-md">LOGIN</button>
                </div>
            </form>
            {
                errorMsg && <div className="error-msg">{errorMsg}</div>
            }
        </div>
    )
}

export default Login