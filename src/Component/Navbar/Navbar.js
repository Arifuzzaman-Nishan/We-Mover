import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logo from '../../images/logo.png';
import { userContext } from '../../App';

const Navbar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);



    return (
        <nav className="container bg-color navbar navbar-expand-lg navbar-light rounded">
            <Link className="navbar-brand text-info font-weight-bolder" to="/">
                <img src={logo} alt="" className="img-style" />
            </Link>
            <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
                    <Link to="/home" className="navi nav-link text-white ml-auto" >Home</Link>
                    <Link className="navi nav-link text-white" to="/map">Destination</Link>
                    <Link className="navi nav-link text-white" to = "/blog">Blog</Link>
                    <Link className="navi nav-link text-white" to ="/contact">Contact</Link>
                    {
                        loggedInUser.displayName? <p className='mt-3 ml-3 font-weight-bold text-success'>{loggedInUser.displayName}</p> : <Link to="/map" className="nav-link text-white">
                        <button className='btn btn-danger'>Log in</button>
                    </Link>
                    }
                    {
                        loggedInUser.displayName && <button onClick={() => setLoggedInUser({})} className='ml-3 btn btn-danger'>Sign Out</button>
                    }
            </div>
        </nav>
    );
};

export default Navbar;