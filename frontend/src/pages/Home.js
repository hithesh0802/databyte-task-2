import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styling/home.css'

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        navigate('/login');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        // <div className="home-container">
        //     <nav className="navbar">
        //         <div className="logo">
        //             <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M0 128h2048v1792H0zm1920 128H128v256h1792zM128 1792h1792V640H128zm128-640V768h384v384zm128-256v128h128V896zm-128 768v-384h384v384zm128-256v128h128v-128zm512-384V896h768v128zm0 512v-128h768v128z"/></svg>
        //             <h3>Taskify</h3>
        //         </div>
        //         <ul className="nav-links">
        //             <li><a href="/">Home</a></li>
        //             <li><a href="/">About</a></li>
        //             <li><a href="/">Features</a></li>
        //             <li><a href="/">Contact</a></li>
        //         </ul>
        //         <div className="auth-buttons">
        //             <button className="btn login-btn" onClick={handleLogin}>Login</button>
        //             <button className="btn register-btn" onClick={handleRegister}>Register</button>
        //         </div>
        //     </nav>
        //     <div className="overlay"></div>
        //     <div className="home-content">
        //         <h1>Welcome to Taskify</h1>
        //         <p>Manage your tasks efficiently and collaborate with your team seamlessly.</p>
        //         <div className="buttons">
        //             <button className="btn register-btn" onClick={handleRegister}>Register</button>
        //             <button className="btn login-btn" onClick={handleLogin}>Login</button>
        //         </div>
        //     </div>
        // </div>

        <div className="home-container">
  <nav className="navbar">
    <div className="logo">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M0 128h2048v1792H0zm1920 128H128v256h1792zM128 1792h1792V640H128zm128-640V768h384v384zm128-256v128h128V896zm-128 768v-384h384v384zm128-256v128h128v-128zm512-384V896h768v128zm0 512v-128h768v128z"/></svg>
      <h3>Taskify</h3>
    </div>
    <ul className="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/">About</a></li>
      <li><a href="/">Features</a></li>
      <li><a href="/">Contact</a></li>
    </ul>
    <div className="auth-buttons">
      <button className="btn login-btn" onClick={handleLogin}>Login</button>
      <button className="btn register-btn" onClick={handleRegister}>Register</button>
    </div>
  </nav>
  <div className="overlay"></div>
  <div className="home-content">
    <h1>Welcome to Taskify</h1>
    <p>Manage your tasks efficiently and collaborate with your team seamlessly.</p>
    <div className="buttons">
      <button className="btn register-btn" onClick={handleRegister}>Register</button>
      <button className="btn login-btn" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>

    );
};


export default Home;
