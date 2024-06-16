import React from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../library/firebase';
import { doc, setDoc } from 'firebase/firestore';
import uploadImage from '../library/Upload'
export default function Login() {

    const [loadingSignup, setLoadingSignup] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);


    const [Avatar, setAvatar] = useState({
        file: null,
        url: 'https://via.placeholder.com/150'
    });
    const HandleImageUpload = e => {
        try {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar({
                    file: file,
                    url: reader.result
                });
            };
            reader.readAsDataURL(file);
        } catch (error) {
            toast.error('Image Upload Failed');
        }
    };


    const HandleLogin = async (e) => {
        e.preventDefault();
        setLoadingLogin(true);

        const formData = new FormData(e.target);
        console.log(formData.entries());
        const { Email, Password } = Object.fromEntries(formData.entries());
        console.log(Email, Password);
        try {
            await signInWithEmailAndPassword(auth, Email, Password);
            toast.success('Logged In Successfully');
        } catch (error) {
            toast.error(error.message);
            return;
        }

        finally {
            setLoadingLogin(false);
        }
    }

    function checkPasswordStrength(password) {
        const regexLowercase = /[a-z]/;
        const regexUppercase = /[A-Z]/;
        const regexNumbers = /[0-9]/;
        const regexSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

        // Check if password meets all criteria
        const hasLowercase = regexLowercase.test(password);
        const hasUppercase = regexUppercase.test(password);
        const hasNumbers = regexNumbers.test(password);
        const hasSpecial = regexSpecial.test(password);

        // Return true if all criteria are met, false otherwise
        return hasLowercase && hasUppercase && hasNumbers && hasSpecial;
    }

    const HandleRegister = async (e) => {
        e.preventDefault();
        setLoadingSignup(true);

        const formData = new FormData(e.target);//e.target is the form element that was submitted
        const { Username, Email, Password } = Object.fromEntries(formData.entries()); // Object.fromEntries() method transforms a list of key-value pairs into an object.

        try {
            if (Username === '' || Email === '' || Password === '') {
                toast.error('All fields are required');
            }
            if (checkPasswordStrength(Password) === false) {
                toast.error('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character');
            }
            const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
            const imageUrl = await uploadImage(Avatar.file);
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                Username: Username,
                Email: Email,
                Avatar: imageUrl,
                Password: Password,
                id: userCredential.user.uid,
                blockedUsers: [],
            });

            await setDoc(doc(db, 'userchats', userCredential.user.uid), {
                chats: []

            })

            toast.success('Account Created! Please Login to Continue');

        } catch (error) {
            toast.error(error.message);
            return;
        }

        finally {
            setLoadingSignup(false);
        }
    }

    return (
        <div id="Login-Page" className='row'>
            <div className='col container' id='Login-Container'>

                <form id='login-info' className='col info' onSubmit={HandleLogin} >
                    <h1>Login</h1>
                    <input type="text" placeholder="Email" className='input-detail' name="Email" />
                    <input type="password" placeholder="Password" className='input-detail' name="Password" />

                    <button type="submit" className='send-button' id='Login_btn' >
                        {loadingLogin ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
            <div className='col container' id='Signup-Container'>

                <form id='signup-info' className='col info' onSubmit={HandleRegister}>
                    <h1>Sign-Up</h1>
                    <img src={Avatar.url} alt='profile' className='image' />

                    {/* Instead of directly clicking the input, users will click the label, which is linked to the input using the htmlFor attribute. */}
                    <input type="file" id="image-upload" onChange={HandleImageUpload} className="send-button" style={{ display: 'none' }} />
                    <label htmlFor="image-upload" className="custom-file-upload"> Choose Image </label>

                    <input type="text" placeholder="Username" className='input-detail' name='Username' />
                    <input type="text" placeholder="Email" className='input-detail' name='Email' />
                    <input type="password" placeholder="Set Password" className='input-detail' name='Password' />
                    <button type="submit" className='send-button' id='signUp_btn'  >
                        {loadingSignup ? 'Loading...' : 'Sign-Up'}
                    </button>
                </form>
            </div>

        </div>
    );
}