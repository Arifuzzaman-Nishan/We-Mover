import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.confiq';
import './Login.css';
import { useHistory, useLocation, useParams } from 'react-router';
import fakeData from '../../fakeData/data.json';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { userContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const { register, handleSubmit, watch, errors, reset } = useForm();
    const password = useRef({});
    // password.current = watch("password", "");


    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // sign UP and sing In
    const onSubmit = (data) => {
        if (newUser && data.email && data.password) {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    // var user = userCredential.user;
                    console.log('successfully created account');

                    const user = firebase.auth().currentUser;

                    user.updateProfile({
                        displayName: data.name
                    }).then(function () {
                        setLoggedInUser(user);
                        history.replace(from);
                    }).catch(function (error) {
                        // An error happened.
                    });
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // console.log(errorCode, errorMessage);
                    // ..
                });

        }
        else {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    // console.log(user);
                    // setNewUserInfo(data);
                    setLoggedInUser(user);
                    console.log('successfully log in');
                    history.replace(from);
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }
    }

    console.log(loggedInUser);

    // google sign In
    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                setLoggedInUser(user);
                history.replace(from);
                // console.log(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log(errorCode, errorMessage);
                // ...
            });
    }



    const { name } = useParams();
    const vehicleInfo = fakeData.find(vehicleName => vehicleName.name === name);


    const [newUser, setNewUser] = useState(false);
    const handleNewUser = () => {
        setNewUser(!newUser);
        reset();
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
                            {errors.name && <span className='text-danger'>name field is required</span>}

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
                            {newUser && <input className='mt-4 form-control' type="password" name='confirmPassword' placeholder='Confirm password' ref={register({
                                validate: value =>
                                    value === password.current || "The passwords do not match"
                            })} />}
                            {
                                errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>
                            }

                            {/* for submit button */}
                            {
                                newUser ? <input className='mt-4 form-control bg-danger logged-in text-white' type="submit" value='Create an account' /> : <input className='mt-4 form-control bg-danger logged-in text-white' type="submit" value='Log In' />
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
                                <div onClick={handleGoogleSignIn} className='icon google'>
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
                                        <p onClick={handleNewUser} className='text-center'>Log In</p>
                                    </div>
                                    :
                                    <div>
                                        <small>
                                            <p className='mt-5 text-center'>Don't have an account</p>
                                        </small>
                                        <p onClick={handleNewUser} className='text-center'>Sign Up</p>
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