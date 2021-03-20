import React from 'react';
import { useHistory } from 'react-router';

const HomeDetails = (props) => {
    const { name, image } = props.vehicle;
    const history = useHistory();

    return (
        <div className='col-xl-3 col-lg-4 col-sm-6 col-12 mt-5'>
            <div className="card ml-auto mr-auto p-4 border border-danger" style={{ width: '18rem', height: '350px',cursor:"pointer" }} onClick={() => history.push(`/map/${name}`)}>
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