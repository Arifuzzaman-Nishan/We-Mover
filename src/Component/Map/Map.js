import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MapSearchDetails from '../MapSearchDetails/MapSearchDetails';
import fakeData from '../../fakeData/data.json';
import './Map.css';
import GoogleMapShow from '../GoogleMapShow/GoogleMapShow';
// import GoogleMapShow from '../GoogleMapShow/GoogleMapShow';

const Map = () => {

    const [search, setSearch] = useState(true);
    const [vehicleData, setVehicleData] = useState({
        id: '',
        name: '',
        image: '',
        quantity: '',
        price: '',
        pickFrom: '',
        pickTo: '',
        journeyDate: '',
        returnDate: ''
    });

    let { vehicleName } = useParams();
    if (!vehicleName) {
        vehicleName = 'BIKE';
    }

    useEffect(() => {
        const vehicleInfo = fakeData.find(vehicle => vehicle.name === vehicleName);

        const { name, image, quantity, price, id } = vehicleInfo;

        const vehicleDataStore = {
            id: id,
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
                <div className="col-xl-3 mr-5 col-lg-4 col-md-5 mb-5">
                    <div className='card p-4 ml-auto mr-auto bg-map'>
                        {
                            search ? <form onSubmit={handleSubmit}>
                                <div>
                                    <label className="font-weight-bold" htmlFor="pickFrom">From</label>
                                    <input required onBlur={handleChange} className='form-control' type="text" name='pickFrom' />
                                </div>
                                <div className='mt-4'>
                                    <label className="font-weight-bold" htmlFor="journeyDate">Date of journey</label>
                                    <input required className='form-control' onBlur={handleChange} type="date" name="journeyDate" id="" />
                                </div>
                                <div className='mt-4'>
                                    <label className="font-weight-bold" htmlFor="pickTo">To</label>
                                    <input required onBlur={handleChange} className='form-control' type="text" name='pickTo' />
                                </div>
                                <div className='mt-4'>
                                    <label className="font-weight-bold" htmlFor="returnDate">Date of return</label>
                                    <input required className='form-control' onBlur={handleChange} type="date" name="returnDate" id="" />
                                </div>
                                <div className='mt-4'>
                                    <input className='btn btn-danger form-control' type="submit" name='pick_to' value='Search' />
                                </div>
                            </form>
                                :
                                <MapSearchDetails key={vehicleData.id} vehicleData={vehicleData}></MapSearchDetails>
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