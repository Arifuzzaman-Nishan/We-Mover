import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const MapSearchDetails = (props) => {
    const { name, image, quantity, price, pickFrom, pickTo } = props.vehicleData;
    console.log(props.vehicleData);
    const totalTimes = 3;
    const array = [1, 2, 3];
    return (
        <div>
            <div className='card p-3' style={{ background: 'orange' }}>
                <div className='d-flex'>
                    <div>
                        <FontAwesomeIcon icon={faRoute} size='4x' />
                    </div>
                    <div style={{ textTransform: 'capitalize' }} className="ml-3">
                        <h3>{pickFrom}</h3>
                        <h3>{pickTo}</h3>
                    </div>
                </div>
            </div>

            {
                array.map(() => <div className='card mt-3'>
                    <div className='d-flex justify-content-between align-items-center font-weight-bold mt-2 p-3'>
                        <img className="w-25" src={image} alt="" />
                        <h5 style={{ textTransform: 'lowercase' }}>{name}</h5>
                        <div>
                            <FontAwesomeIcon className="ml-2" icon={faUserFriends} />
                            <span className='ml-1 '>{quantity}</span>
                        </div>
                        <h5 >{price}</h5>
                    </div>
                </div>)
            }

        </div>
    );
};

export default MapSearchDetails;