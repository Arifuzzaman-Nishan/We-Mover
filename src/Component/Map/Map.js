import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../Navbar/Navbar';
import MapSearchDetails from './MapSearchDetails';
import fakeData from '../../fakeData/data.json';

const Map = () => {
    const [search, setSearch] = useState(true);
    const [vehicleData, setVehicleData] = useState({
        name:'',
        image:'',
        quantity:',',
        price:'',
        pickFrom:'',
        pickTo:''
    });

    const { vehicleName } = useParams();

    useEffect(() => {
        const vehicleInfo = fakeData.find(vehicle => vehicle.name === vehicleName);

        const {name,image,quantity,price} = vehicleInfo;

        const vehicleDataStore = {
            name:name,
            image:image,
            quantity:quantity,
            price:price
        };
        setVehicleData(vehicleDataStore);
    }, [vehicleName])

    

    const handleSubmit = (e) => {
        setSearch(false);
        e.preventDefault();
    }

    const handleChange = (e)=>{
        const vehicleAllData = {...vehicleData}
        vehicleAllData[e.target.name] = e.target.value;
        setVehicleData(vehicleAllData);
    }
    
    console.log(vehicleData);
    return (
        <div className='container'>
            <Navbar></Navbar>
            <div className="row mt-4">
                <div className="col-3">
                    <div className='card p-4' style={{ width: "20rem", background: "gray" }}>
                        {
                            search ? <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="pickFrom">Pick From</label>
                                    <input onBlur={handleChange} className='form-control' type="text" name='pickFrom' />
                                </div>
                                <div className='mt-4'>
                                    <label htmlFor="pickTo">Pick To</label>
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
            </div>
        </div>
    );
};

export default Map;