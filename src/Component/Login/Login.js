import React from 'react';
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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const {name} = useParams();
    console.log('login ',name);

    const vehicleInfo = fakeData.find(vehicleName => vehicleName.name === name);
    console.log(vehicleInfo);

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
                        <form>
                            <input className='form-control mb-4' required type="email" name='email' placeholder='Your email' />
                            <input className='form-control mb-4' type="password" name='password' placeholder='Your password' />
                            <input className='form-control bg-danger logged-in' type="submit" value='LogIn' />
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;