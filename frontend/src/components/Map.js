import React from 'react';
import axios from 'axios';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { getCenter } from 'geolib';

const Map = ({ events }) => {
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
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  getGeocodes();

  // Transfer getGeocode array in the format of [{latitude:..., longitude...}]

  // const formattedCoords = coordinates.map((coord) => ({
  //   latitude: coord.lat,
  //   longigude: coord.lng,
  // }));

  // Map config
  const containerStyle = {
    width: '100%',
    height: '800px',
  };

  const center = {
    lat: 34.052235,
    lng: -118.243683,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAtVNovmGA72KXikxRSNX_h_MHUAbtqlgE',
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
      <>
        {/* {events.map((event) => (
          <Marker
            key={event.uid}
            // position={{
            //   lat: artWork.geometry.coordinates[0],
            //   lng: artWork.geometry.coordinates[1],
            // }}
            // onClick={() => {
            //   this.setSelectedArt(artWork);
            //   this.setModalShow(true);
            // }}
            // icon={{
            //   url: './image/marker.png',
            //   scaledSize: {
            //     width: 40,
            //     height: 40,
            //   },
            // }}
          />
        ))} */}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
