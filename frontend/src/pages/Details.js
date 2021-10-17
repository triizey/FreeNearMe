import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Details.css';
import {
  CalendarIcon,
  LocationMarkerIcon,
  ClockIcon,
  BookmarkIcon,
  LinkIcon,
} from '@heroicons/react/outline';
import Map from '../components/Map';

const Details = ({ location, history, match }) => {
  const redirect = location.search ? location.search.split('=')[1] : '/';
  console.log(location.search);

  const saveHandler = () => {
    history.push('/login?redirect=myEvents');
  };

  const [event, setEvent] = useState({});
  const [coords, setCoords] = useState({
    lat: 34.052235,
    lng: -118.243683,
  });

  const getImgRandomNo = () => {
    return Math.floor(Math.random() * 9);
  };

  useEffect(() => {
    axios.get(`/api/events/${match.params.uuid}`).then((resolve) => {
      setEvent(resolve.data);
    });

    axios('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: event.location,
        key: 'AIzaSyAtVNovmGA72KXikxRSNX_h_MHUAbtqlgE',
      },
    })
      .then((res) => {
        if (res.data.status === 'OK') {
          console.log(res.data.results[0].geometry.location);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <div className="main">
        <div className="main-left">
          <div className="hidden md:block main-left__image">
            <img
              src={
                event.imgs
                  ? event.imgs
                  : `/images/food_event${getImgRandomNo()}.jpg`
              }
              alt=""
            />
          </div>
          <div className="main-body">
            <h2 className="main__title">Description</h2>
            <p>{event.description}</p>
          </div>
        </div>
        <div className="main-right">
          <h1 className="main-right__title">{event.name}</h1>
          <div className="main-right__meta">
            <div className="meta__date">
              <CalendarIcon />
              <span>{event.date}</span>
            </div>
            <div className="meta__time">
              <ClockIcon />
              <span>{event.time}</span>
            </div>
            <div className="meta__location">
              <LocationMarkerIcon />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="main-right__buttons">
            {/* <button className="btn btn__orange">
              <MapIcon />
              <span>Get direction</span>
            </button> */}
            <button className="btn btn__link" onClick={saveHandler}>
              <BookmarkIcon />
              <span>Save</span>
            </button>
            <button className="btn btn__link">
              <LinkIcon />
              <a href={event.description_link} tar="_blank">
                Learn More
              </a>
            </button>
          </div>

          <h2 className="main__title">Map</h2>
          <Map width="500px" height="300px" center={coords} />
        </div>
      </div>
    </>
  );
};

export default Details;
