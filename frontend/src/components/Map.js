import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { getCenter } from "geolib";

const Map = ({ events, width, height, center }) => {
  // const [centerCalced, setCenterCalced] = useState({
  //   latitude: 34.052235,
  //   longitude: -118.243683,
  // });

  /* Calculate center of all the events to locate the map */

  /* Map Config */
  const containerStyle = {
    width: width,
    height: height,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAtVNovmGA72KXikxRSNX_h_MHUAbtqlgE",
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
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
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
