import React, { useState } from 'react';
import { registerUser } from '../context/api';
import { useNavigate } from 'react-router-dom';
import '../styling/Register.css';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser({ username, email, password });
            console.log('API response:', response);
            navigate('/login');
        } catch (error) {
            console.log('Registration error:', error);
        }
    };

    return (
        // <div className="register-container">
        //     <form onSubmit={handleSubmit} className="register-form">
        //         <h2>Create Your Account</h2>
        //         <p className="subtext">Join us to manage your tasks efficiently</p>
        //         <input 
        //             type='email' 
        //             value={email} 
        //             onChange={(e) => setEmail(e.target.value)} 
        //             placeholder='Enter Email' 
        //             className="input-field"
        //             required
        //         />
        //         <input 
        //             type='text' 
        //             value={username} 
        //             onChange={(e) => setUsername(e.target.value)} 
        //             placeholder='Enter Username' 
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
        //         <button type='submit' className="register-button">Register</button>
        //         <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
        //     </form>
        // </div>

        <div className="register-container">
  <form onSubmit={handleSubmit} className="register-form">
    <h2>Create Your Account</h2>
    <p className="subtext">Join us to manage your tasks efficiently</p>
    <input 
      type='email' 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      placeholder='Enter Email' 
      className="input-field"
      required
    />
    <input 
      type='text' 
      value={username} 
      onChange={(e) => setUsername(e.target.value)} 
      placeholder='Enter Username' 
      className="input-field"
      required
    />
    <input 
      type='password' 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} 
      placeholder='Enter Password' 
      className="input-field"
      required
    />
    <button type='submit' className="register-button">Register</button>
    <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
  </form>
</div>

    );
}

export default Register;

