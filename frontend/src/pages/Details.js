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
import useGetUserID from '../customHooks/useGetUserID';
import { handleUserFavorites } from '../utils/firebaseUtils';

const Details = ({ location, history, match, user }) => {
  const [event, setEvent] = useState({});
  // const redirect = location.search ? location.search.split('=')[1] : '/';
  // console.log(location.search);
  const [userID] = useGetUserID();

  useEffect(() => {
    axios.get(`/api/events/${match.params.uuid}`).then((resolve) => {
      setEvent(resolve.data);
    });

    // axios('https://maps.googleapis.com/maps/api/geocode/json', {
    //   params: {
    //     address: event.location,
    //     key: 'AIzaSyAtVNovmGA72KXikxRSNX_h_MHUAbtqlgE',
    //   },
    // })
    //   .then((res) => {
    //     if (res.data.status === 'OK') {
    //       console.log(res.data.results[0].geometry.location);
    //     }
    //   })
    //   .catch((error) => console.error(error));
  }, []);

  const nyCoords = [
    { latitude: 43.083313, longitude: -73.809898 },
    { latitude: 40.981613, longitude: 73.691925 },
    { latitude: 43.227978, longitude: -75.484924 },
    { latitude: 42.644516, longitude: -73.747253 },
    { latitude: 44.699764, longitude: -73.471428 },
    { latitude: 41.292282, longitude: -73.930725 },
    { latitude: 40.922794, longitude: -73.791809 },
    { latitude: 40.916695, longitude: -73.836815 },
    { latitude: 41.450123, longitude: -74.429253 },
  ];

  const saveHandler = () => {
    if (!user) {
      history.push('/SignIn');
    }
    handleUserFavorites({ userID, event });
    // history.push('/login?redirect=myEvents');
  };

  const [coords, setCoords] = useState({
    lat: 34.052235,
    lng: -118.243683,
  });

  const getImgRandomNo = () => {
    return Math.floor(Math.random() * 9);
  };

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
        </div>
      </div>
    </>
  );
};

export default Details;
