import React from 'react';
import axios from 'axios';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const Map = ({ events }) => {
<<<<<<< Updated upstream
  /* Get coordinates */

  const getGeocodes = () => {
    let coordsPromises = [];
    for (let i = 0; i < events.length; i++) {
      coordsPromises.push(
        axios('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: events[i].location,
            key: 'AIzaSyAtVNovmGA72KXikxRSNX_h_MHUAbtqlgE',
          },
        })
          .then((res) => {
            if (res.data.status === 'OK') {
              return res.data.results[0].geometry.location;
            }
          })
          .catch((error) => console.error(error)),
      );
    }
    return Promise.all(coordsPromises)
      .then((result) => {
        console.log(result);
        return result?.map((coord) => ({
          latitude: coord?.lat,
          longigude: coord?.lng,
        }));
      })
      .catch((error) => console.error(error));
  };
  // Caculate the center of the array
  let coords = getGeocodes();
  console.log(coords);

  // Map config
=======
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

>>>>>>> Stashed changes
  const containerStyle = {
    width: '100%',
    height: '800px',
  };

  const center = {
<<<<<<< Updated upstream
    lat: 34.052235,
    lng: -118.243683,
=======
    lat: 37.7749,
    lng: -122.419416,
>>>>>>> Stashed changes
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
