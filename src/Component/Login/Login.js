import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.confiq';
import './Login.css';
import { useParams } from 'react-router';
import fakeData from '../../fakeData/data.json';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    const { name } = useParams();
    const vehicleInfo = fakeData.find(vehicleName => vehicleName.name === name);

    const [user, setUser] = useState({
        email: '',
        name: '',
        password: '',
    })
    const [newUser, setNewUser] = useState(false);
    const handleNewUser = () => {
        setNewUser(!newUser);
        errors.password = false;
        errors.email = false;
    }
    // const [error,setError] = useState(false);

    const handleSignUp = () => {
    }

    // const handleFb = () => {
    //     const fbProvider = new firebase.auth.FacebookAuthProvider();

    //     firebase
    //         .auth()
    //         .signInWithPopup(fbProvider)
    //         .then((result) => {
    //             var credential = result.credential;

    //             // The signed-in user info.
    //             var user = result.user;
    //             console.log(user);

    //         })
    //         .catch((error) => {
    //             // Handle Errors here.
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             // The email of the user's account used.
    //             var email = error.email;
    //             // The firebase.auth.AuthCredential type that was used.
    //             var credential = error.credential;
    //             console.log(errorCode, errorMessage, email, credential);

    //             // ...
    //         });
    // }

    return (
        <>
            <div className="container d-flex justify-content-center">
                <div className="card mt-5" style={{ width: "18rem" }}>
                    <div style={{ border: 'none' }} className='card-header'>
                        <h2 className='text-center'>Login</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* for name */}
                            {newUser && <input className='form-control' type="name" name='name' placeholder='Your name' ref={register({ required: true })} />}
                            {newUser && errors.name && <span className='text-danger'>name field is required</span>}

                            {/* for email */}
                            <input className='mt-4 form-control' type="email" name='email' placeholder='Your email' ref={register({ required: true })} />
                            {errors.email && <span className='text-danger'>Email field is required</span>}

                            {/* for password */}
                            <input className='mt-4 form-control' type="password" name='password' placeholder='Your password' ref={register({
                                required: "You must specify a password",
                                pattern: /[a-zA-Z][0-9]/,
                                minLength: {
                                    value: 8,
                                    message: "Password must have at least 8 characters"
                                }
                            })} />
                            {errors.password && <span className='text-danger'>{errors.password.message || 'password should contain at least 1 letter and 1 number'}</span>}

                            {/* for confirm password */}
                            {newUser && <input className='mt-4 form-control' type="password" name='confirmPassword' placeholder='Confirm password' ref={register({ required: true })} />}
                            {newUser && errors.confirmPassword && <span className='text-danger'>Confirm password field is required</span>}

                            {/* for submit button */}
                            {
                                newUser ? <input className='mt-4 form-control bg-danger logged-in text-white' type="submit" value='Create an account' /> : <input className='mt-4 form-control bg-danger logged-in text-white' type="submit" value='LogIn' />
                            }
                        </form>
                        <div>
                            <small>
                                <p className='mt-5 text-center'>Or Sign Up Using</p>
                            </small>

                            {/* for icons */}
                            <div className='d-flex justify-content-around mt-4'>
                                <div className='icon facebook'>
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </div>
                                <div className='icon google'>
                                    <FontAwesomeIcon icon={faGoogle} />
                                </div>

                                <div className='icon twitter'>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </div>
                            </div>

                            {/* for last text */}
                            {
                                newUser ?
                                    <div>
                                        <small>
                                            <p className='mt-5 text-center'>Already have an account</p>
                                        </small>
                                        <Link onClick={handleNewUser}><p className='text-center'>Log In</p></Link>
                                    </div>
                                    :
                                    <div>
                                        <small>
                                            <p className='mt-5 text-center'>Don't have an account</p>
                                        </small>
                                        <Link onClick={ handleNewUser}><p className='text-center'>Sign Up</p></Link>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;