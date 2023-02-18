import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { auth, fs } from '../Config/Config'

const Signup = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const navigate = useNavigate()
    
    const handleSignUp = (e) => {
        e.preventDefault();
    }
    return (
        <div className='container'>
            <br />
            <br />
            <h1>Sign Up</h1>
            <hr />
            {
                successMsg && <div className="success-msg">{successMsg}</div>
            }
            <form className='form-group' autoComplete='off' onSubmit={handleSignUp}>
                <label htmlFor="full-name">Full Name</label>
                <input type="text" className='form-control' value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br />
                <div className="btn-box">
                    <span>Already have an account? Login <Link to='/login' className='link'>Here</Link></span>
                    <button type='submit' className="btn btn-success btn-md">SIGN UP</button>
                </div>
            </form>
            {
                errorMsg && <div className="error-msg">{errorMsg}</div>
            }
        </div>
    )
}

export default Signup