import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../Navbar/Navbar';
import MapSearchDetails from './MapSearchDetails';
import fakeData from '../../fakeData/data.json';
import GoogleMapShow from './GoogleMapShow';

const Map = () => {
    const [search, setSearch] = useState(true);
    const [vehicleData, setVehicleData] = useState({
        name: '',
        image: '',
        quantity: ',',
        price: '',
        pickFrom: '',
        pickTo: ''
    });

    let { vehicleName } = useParams();
    if(!vehicleName){
        vehicleName = 'BIKE';
    }

    useEffect(() => {
        const vehicleInfo = fakeData.find(vehicle => vehicle.name === vehicleName);

        const { name, image, quantity, price } = vehicleInfo;

        const vehicleDataStore = {
            name: name,
            image: image,
            quantity: quantity,
            price: price
        };
        setVehicleData(vehicleDataStore);
    }, [vehicleName])



    const handleSubmit = (e) => {
        setSearch(false);
        e.preventDefault();
    }

    const handleChange = (e) => {
        const vehicleAllData = { ...vehicleData }
        vehicleAllData[e.target.name] = e.target.value;
        setVehicleData(vehicleAllData);
    }

    console.log(vehicleData);
    return (
        <div className='container'>
            <div className="row mt-4">
                <div className="col-xl-3 mr-4 col-lg-4 col-md-5 mb-5">
                    <div className='card p-4 ml-auto mr-auto' style={{ width: "", background: "gray" }}>
                        {
                            search ? <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="pickFrom">From</label>
                                    <input onBlur={handleChange} className='form-control' type="text" name='pickFrom' />
                                </div>
                                <div className='mt-4'>
                                    <label htmlFor="pickTo">To</label>
                                    <input onBlur={handleChange} className='form-control' type="text" name='pickTo' />
                                </div>
                                <div className='mt-4'>
                                    <input className='btn btn-danger form-control' type="submit" name='pick_to' value='Search' />
                                </div>
                            </form>
                                :
                                <MapSearchDetails vehicleData={vehicleData}></MapSearchDetails>
                        }
                    </div>
                </div>
                <div className='col-xl-8 col-lg-7 col-md-6'>
                    <GoogleMapShow></GoogleMapShow>
                </div>
            </div>
        </div>
    );
};

export default Map;