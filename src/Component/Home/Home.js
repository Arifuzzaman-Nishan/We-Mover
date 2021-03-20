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
            <div className="container margin">
                <div className="row d-flex align-items-center">
                    {
                        vehicleInfos.map(vehicle => <HomeDetails key={vehicle.id} vehicle={vehicle}></HomeDetails>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;