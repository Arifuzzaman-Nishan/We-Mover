import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Home.css';
import data from '../../fakeData/data.json';
import HomeDetails from '../HomeDetails/HomeDetails';

const Home = () => {
    const [vehicleInfos,setVehicleInfos] = useState([]);

    useEffect(()=>{
        setVehicleInfos(data);
    },[])

    return (
        <div className='bg-pic'>
            <Navbar></Navbar>
            <div style={{height:'90vh'}} className="container d-flex align-items-center">
                <div className="row">
                    {
                        vehicleInfos.map(vehicle => <HomeDetails key={vehicle.id} vehicle={vehicle}></HomeDetails>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;