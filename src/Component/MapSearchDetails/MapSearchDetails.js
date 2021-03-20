import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './MapSearchDetails.css';

const MapSearchDetails = (props) => {
    const { name, image, quantity, price, pickFrom, pickTo, journeyDate, returnDate } = props.vehicleData;
    console.log(props.vehicleData);

    const array = [1, 2, 3];
    return (
        <div>
            <div className='card p-3 bg'>
                <div className='d-flex'>
                    <div className='my-auto'>
                        <FontAwesomeIcon className='text-warning' icon={faRoute} size='4x' />
                    </div>
                    <div style={{ textTransform: 'capitalize' }} className="ml-3 text-white">
                            <h4>{pickFrom}</h4>
                            <p className='ml-auto'>{journeyDate}</p>
            
                            <h4>{pickTo}</h4>
                            <p className='ml-auto'>{returnDate}</p>
                        
                    </div>
                </div>
            </div>

            {
                array.map(() => <div className='card bg-vehicle mt-3'>
                    <div className='d-flex justify-content-between align-items-center font-weight-bold mt-2 p-3'>
                        <img className="w-25" src={image} alt="" />
                        <h5 style={{ textTransform: 'lowercase' }}>{name}</h5>
                        <div>
                            <FontAwesomeIcon className="ml-2" icon={faUserFriends} />
                            <span className='ml-1 '>{quantity}</span>
                        </div>
                        <h5 className='font-weight-bold text-danger'>{price}</h5>
                    </div>
                </div>)
            }

        </div>
    );
};

export default MapSearchDetails;