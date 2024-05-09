import React from 'react';
import './Login.css';
import { toast } from 'react-toastify';


export default function Login() {

    const HandleLogin = e => {
        e.preventDefault();
        toast.success('Login Successful');
    }

    return (
        <div id="Login-Page" className='row'>
            <div className='col container' id='Login-Container'>
          
            <form id='login-info' className='col info' onSubmit={HandleLogin} >
            <h1>Login</h1>
                <input type="text" placeholder="Email" className='input-detail' />
                <input type="password" placeholder="Password" className='input-detail' />
                <button type="submit" className='send-button'>Login</button>
            </form>
            </div>
           <div className='col container' id='Signup-Container'>
           
            <form id='signup-info' className='col info'>
            <h1>Sign-Up</h1>
                 
                <input type="text" placeholder="Email" className='input-detail' />
                <input type="password" placeholder="Password"  className='input-detail' />
                <input type="password" placeholder="Confirm Password" className='input-detail' />
                <button type="submit" className='send-button'>Sign Up</button>
            </form>
           </div>
     
        </div>
    );
    }