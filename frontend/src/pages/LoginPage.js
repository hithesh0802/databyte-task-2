import React from 'react'
import { loginUser } from '../context/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            console.log('API response:', response, response.token);
            localStorage.setItem('token', response.token);
            navigate('/dashboard');
        } catch (error) {
            console.log('Login error:', error);
        }
    };

    return (
        // <div className="login-container">
        //     <form onSubmit={handleSubmit} className="login-form">
        //         <h2>Welcome Back</h2>
        //         <p className="subtext">Please login to your account</p>
        //         <input 
        //             type='email' 
        //             value={email} 
        //             onChange={(e) => setEmail(e.target.value)} 
        //             placeholder='Enter Email' 
        //             className="input-field"
        //             required
        //         />
        //         <input 
        //             type='password' 
        //             value={password} 
        //             onChange={(e) => setPassword(e.target.value)} 
        //             placeholder='Enter Password' 
        //             className="input-field"
        //             required
        //         />
        //         <button type='submit' className="login-button">Login</button>
        //         <p className="signup-link">Don't have an account? <a href="/register">Sign up</a></p>
        //     </form>
        // </div>

//         <div className="login-container">
//     <form onSubmit={handleSubmit} className="login-form">
//         <h2 className="form-heading">Welcome Back</h2>
//         <p className="form-subtext">Please login to your account</p>
//         <input 
//             type='email' 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             placeholder='Enter Email' 
//             className="input-field"
//             required
//         />
//         <input 
//             type='password' 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             placeholder='Enter Password' 
//             className="input-field"
//             required
//         />
//         <button type='submit' className="login-button">Login</button>
//         <p className="signup-link">Don't have an account? <a href="/register">Sign up</a></p>
//     </form>
// </div>

<div className="login-container">
    <div className="login-bg-overlay"></div>
    <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-heading">Welcome Back</h2>
        <p className="form-subtext">Please login to your account</p>
        
        <div className="input-group">
            <div className='emaillabel'>
            <label htmlFor="email" >Enter Email</label>
            </div>
            <input 
                type='email' 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder=' ' 
                className="input-field"
                required
            />
            
        </div>
        <div className="input-group">
            <label htmlFor="password">Enter Password</label>
            <input 
                type='password' 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder=' ' 
                className="input-field"
                required
            />
        </div>

        <button type='submit' className="login-button">Login</button>

        <p className="signup-link">Don't have an account? <a href="/register">Sign up</a></p>
    </form>
</div>

    );
};


export default Login;
