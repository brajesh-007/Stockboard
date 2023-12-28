import React, {useState} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import '../App.css'
 import {   toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'
 
const Login = () => {
  const nav = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   

  const handleLogin = () =>{
    if(email === 'abc@gmail.com' && password === '12345'){
       
      
      toast.success(`Login Successful`);
      
      nav('/dashboard');
      
      
    }else{
       
         
        toast.error(`Login Failed`);
        
        nav('/');

      };
         
    }
      // <Navigate replace to='/login'/>

    
  


  return (
    <div className="container">
      
      <form className='form'>
      <h1 id="header">Login</h1>
        <div  >
           
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inp"
          />
        </div>
        <div  >
           
          <input
            type="password"
            // id="password"
            placeholder='password'
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inp"
          />
        </div>
        <button
          type="submit"
          
          className="btn"
          onClick={handleLogin}
        >
          Log In
        </button>
        <p className="mt-4">
        Don't have an account?{' '}
        <Link to="/signup" className="link font-bold">
          Register
        </Link>
      </p>
      </form>
      
     
    </div>
  );
};

export default Login;
