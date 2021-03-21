import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Marker from 'react-google-maps/lib/components/Marker';
import { useState } from 'react';
import InfoWindow from 'react-google-maps/lib/components/InfoWindow';
// import { GoogleMap, Marker } from "react-google-maps"

const containerStyle = {
    width: '100%',
    height: '70vh'
};

const center = {
    lat: 23.810331,
    lng: 90.412521
};




const GoogleMapShow = (props) => {

    const [marker, setMarker] = useState({})

    const onMarkerClick = (props, marker, e) => {
        setMarker({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }



    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCx3UD6tq654GJB8eRXdyuKiUNoh7tzIy8"
    })

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])


    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker
                onClick={onMarkerClick}
                name={'Kenyatta International Convention Centre'}
            />
            
        </GoogleMap>
    ) : <></>
};

export default GoogleMapShow;