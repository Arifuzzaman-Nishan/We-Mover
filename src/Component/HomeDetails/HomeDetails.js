import React from 'react';

const HomeDetails = (props) => {
    const { name, image } = props.vehicle;
    return (
        <div className='col-lg-3 col-md-6 col-12'>
            <div className="card p-4 border border-danger" style={{ width: '18rem', height: '350px' }}>
                <div className="card-body d-flex align-items-center">
                    <img  src={image} className="card-img-top" alt="..." />
                </div>
                <div>
                    <h5 className="card-title text-center">{name}</h5>
                </div>
            </div>
        </div>
    );
};

export default HomeDetails;