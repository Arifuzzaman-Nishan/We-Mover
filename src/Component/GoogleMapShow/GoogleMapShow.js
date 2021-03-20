import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import { GoogleMap, Marker } from "react-google-maps"

const containerStyle = {
    width: '100%',
    height: '70vh'
};

const center = {
    lat: 23.777176,
    lng: 90.399452
};


const GoogleMapShow = () => {
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
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <></>
};

export default GoogleMapShow;