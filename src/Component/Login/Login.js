import React, { useContext,useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import './Login.css';
import { useHistory, useLocation } from 'react-router';
import { useForm } from "react-hook-form";
import { userContext } from '../../App';
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, updateUserName, signInWithEmailAndPassword } from './LoginManager';

initializeLoginFramework();

const Login = () => {

    const { register, handleSubmit, watch, errors, reset } = useForm();
    
    const password = useRef({});
    password.current = watch("password", "");
    


    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [message, setMessage] = useState({
        success: '',
        error: '',
        value: true
    })



    const errorAndSuccessMessage = (text, value) => {
        const info = { ...message };
        value ? info.success = `${text} ${newUser ? "created account" : "log in"}` : info.error = text;
        setMessage(info);
    }

    // google sign In
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setLoggedInUser(res);
                history.replace(from);
            })
    }

    // sign UP and sing In
    const onSubmit = (data, e) => {
        if (newUser && data.email && data.password) {
            createUserWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    let value = false;
                    if(res === 'successfully'){
                        errorAndSuccessMessage(res,true);
                        value = true;
                    }
                    else{
                        errorAndSuccessMessage(res,false);
                    }
                    
                    const user = updateUserName(data.name)
                    user.updateProfile({
                        displayName: data.name
                    }).then(() => {
                        if(value){
                            setLoggedInUser(user) 
                            history.replace(from);
                        }
                    })
                })
        }
        else {
            signInWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    setLoggedInUser(res);

                    if (typeof res === 'string' || res instanceof String) {
                        errorAndSuccessMessage(res, false);
                    }
                    else {
                        errorAndSuccessMessage("successfully", true);
                        history.replace(from);
                    }
                })
        }
    }




    const [newUser, setNewUser] = useState(false);
    const handleNewUser = (e) => {
        setNewUser(!newUser);
        setMessage({});
        reset();
    }



    return (
        <div>
            <div className="container d-flex justify-content-center">
                <div className="card pl-5 pr-5 pt-5 pb-3 mt-2" style={{ width: "23rem" }}>
                    {
                        newUser ? <h2 className='text-center text-primary'>Sign Up</h2>
                            :
                            <h2 className='text-center text-primary'>Login</h2>
                    }

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* for name */}
                        {newUser && <input className='mt-3 form-control' type="name" name='name' placeholder='Your name' ref={register({ required: true })} />}
                        {errors.name && <span className='text-danger'>name field is required</span>}

                        {/* for email */}
                        <input className='mt-3 form-control' type="email" name='email' placeholder='Your email' ref={register({ required: true })} />
                        {errors.email && <span className='text-danger'>Email field is required</span>}

                        {/* for password */}
                        <input className='mt-3 form-control' type="password" name='password' placeholder='Your password' ref={register({
                            required: "You must specify a password",
                            pattern: /(?=.*?[a-z])(?=.*?[0-9])/,
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })} />
                        {errors.password && <span className='text-danger'>{errors.password.message || 'password should contain at least 1 letter and 1 number'}</span>}

                        {/* for confirm password */}
                        {newUser && <input className='mt-3 form-control' type="password" name='confirmPassword' placeholder='Confirm password' ref={register({
                            validate: value =>
                                value === password.current || "The passwords do not match"
                        })} />}
                        {
                            errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>
                        }

                        {/* for submit button */}
                        {
                            newUser ? <input className='mt-3 btn bg-danger form-control text-white' type="submit" value='Create an account' /> : <input className='mt-4 btn btn-danger form-control text-white' type="submit" value='Log In' />
                        }
                    </form>
                    <div>
                        <small>
                            <p className='mt-3 text-center'>Or Sign Up Using</p>
                        </small>

                        {/* for icons */}
                        <div className='d-flex justify-content-around mt-3'>
                            <div onClick={googleSignIn} className='icon google'>
                                <FontAwesomeIcon icon={faGoogle} />
                            </div>

                        </div>

                        {/* for last text */}
                        {
                            newUser ?
                                <div>
                                    <small>
                                        <p className='mt-3 text-center'>Already have an account</p>
                                    </small>
                                    <p onClick={handleNewUser} className='link text-center'>Log In</p>
                                </div>
                                :
                                <div>
                                    <small>
                                        <p onClick={handleNewUser} className='mt-3 text-center'>Don't have an account</p>
                                    </small>
                                    <p onClick={handleNewUser} className='link text-center'>Sign Up</p>
                                </div>
                        }
                    </div>
                    {
                        message.success ? <p className='text-success font-weight-bold'>{message.success}</p>
                            :
                            <p className='text-danger font-weight-bold'>{message.error}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;