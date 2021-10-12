import React from 'react';
import axios from 'axios';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const Map = ({ events }) => {
  // get coordinates
  function getGeocodes() {
    return events.map((event) => {
      axios('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: event.location,
          key: 'AIzaSyAtVNovmGA72KXikxRSNX_h_MHUAbtqlgE',
        },
      })
        .then((res) => {
          if (res.data.status === 'OK') {
            console.log(res.data);
          }
        })
        .catch((e) => console.error(e));
    });
  }

  const containerStyle = {
    width: '100%',
    height: '1000px',
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAtVNovmGA72KXikxRSNX_h_MHUAbtqlgE ',
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
