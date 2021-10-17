import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

const Map = ({ width, height, geoCodes }) => {
  // const formattedCoords = geoCodes
  //   .map((code) => ({
  //     latitude: code.lat,
  //     longitude: code.lng,
  //   }))
  //   .filter((coord) => coord.latitude && coord.longitude);
  const [selectedLocation, setSelectedLocation] = useState({});

  const center = getCenter(geoCodes);
  console.log(center);

  const [viewPort, setViewPort] = useState({
    width: width,
    height: height,
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 3,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/sunmengyue/cktp2b47f17xq18l28qtjklv9"
      mapboxApiAccessToken="pk.eyJ1Ijoic3VubWVuZ3l1ZSIsImEiOiJja2owY3o0Z3Ywa3E5MnhrbGV2a3M3aDM4In0.uK5_xMb75lXraq02u0Htjg"
      {...viewPort}
      onViewportChange={(nextViewPort) => setViewPort(nextViewPort)}
    >
      {geoCodes.map((event, idx) => (
        <div key={idx}>
          <Marker longitude={event.longitude} latitude={event.latitude}>
            <p
              className="cursor-pointer animate-bounce"
              onClick={() => {
                setSelectedLocation(event);
              }}
            >
              📍
            </p>
          </Marker>
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
