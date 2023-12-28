import React from 'react';
import './login.css'
import { Link,useNavigate } from 'react-router-dom';
import {   toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const nav = useNavigate();


  const handleRegister = ()=>{
    toast.success(`Login Successfull`);
      
    nav('/login');
  }





    
  return (
    <div className="regcontainer">
      
      <form className='form'>
      <h1 id="header">Sign Up</h1>
        <div className="">
           
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Your name'
            className="inp"
          />
        </div>
        <div className="">
           
          <input
            type="email"
            id="email"
            placeholder='email'
            name="email"
            className="inp"
          />
        </div>
        <div className="">
          
          <input
            type="password"
            id="password"
            placeholder='password'
            name="password"
            className="inp"
          />
        </div>
        <div className="">
          
          <input
            type="password"
            id="password"
            
            placeholder='Confirm password'
            name="password"
            className="inp"
          />
        </div>
        <button
          type="submit"
          className="btn"
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="mt-4">
        Already have an account?{' '}
        <Link to="/" className="link font-bold">
          Login
        </Link>
      </p>
      </form>
    </div>
  );
};

export default Register;
