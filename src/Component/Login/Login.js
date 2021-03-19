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
                            {newUser && <input className='form-control' type="name" name='name' placeholder='Your name' ref={register({ required: true })} />}
                            {errors.name && <span className='text-danger'>name field is required</span>}

                            <input className='mt-4 form-control' type="email" name='email' placeholder='Your email' ref={register({ required: true })} />
                            {errors.email && <span className='text-danger'>Email field is required</span>}

                            <input className='mt-4 form-control' type="password" name='password' placeholder='Your password' ref={register({ required: true })} />
                            {errors.password && <span className='text-danger'>Password field is required</span>}

                            {newUser && <input className='mt-4 form-control' type="password" name='confirmPassword' placeholder='Confirm password' ref={register({ required: true })} />}
                            {errors.confirmPassword && <span className='text-danger'>Confirm password field is required</span>}

                            <input className='mt-4 form-control bg-danger logged-in text-white' type="submit" value='LogIn' />
                        </form>
                        <div>
                            <small>
                                <p className='mt-5 text-center'>Or Sign Up Using</p>
                            </small>
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
                            <small>
                                <p className='mt-5 text-center'>Don't have an account</p>
                            </small>
                            <Link onClick={() => setNewUser(!newUser)}><p className='text-center'>Sign Up</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;