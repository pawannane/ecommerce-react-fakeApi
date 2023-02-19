import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(username, password)
        await fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            body:JSON.stringify({
                username: `"${username}"`,
                password: `"${password}"`
            })
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
            .catch(err => console.log(err))
    }
    return (
        <div className='container'>
            <br />
            <br />
            <h1>Login</h1>
            <hr />
            <form className='form-group' autoComplete='off' onSubmit={(e) => handleLogin(e)}>
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
        </div>
    )
}

export default Login