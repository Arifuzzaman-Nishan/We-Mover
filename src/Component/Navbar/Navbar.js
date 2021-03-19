import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logo from '../../images/logo.png';

const Navbar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <nav className="container bg-color navbar navbar-expand-lg navbar-light rounded">
            <a className="navbar-brand text-info font-weight-bolder" href="/">
                <img src={logo} alt="" height="36" className="vertical-align-middle" />
                {/* <span classNameName="mx-5">We Mover</span> */}
            </a>
            <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
                    <Link to="/home" className="nav-link text-info ml-auto" >Home</Link>
                    <Link className="nav-link text-info" to="/login">Destination</Link>
                    <Link className="nav-link text-info" to = "/blog">Blog</Link>
                    <Link className="nav-link text-info" to ="/contact">Contact</Link>
                    <Link to="/login" className="nav-link text-white">
                        <button className='btn btn-danger'>Log in</button>
                    </Link>
            </div>
        </nav>
    );
};

export default Navbar;