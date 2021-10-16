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

const Details = (props) => {
  const [event, setEvent] = useState({});

  const getImgRandomNo = () => {
    return Math.floor(Math.random() * 9);
  };

  useEffect(() => {
    axios.get(`/api/events/${props.match.params.uuid}`).then((resolve) => {
      setEvent(resolve.data);
    });
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
            <button className="btn btn__link">
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
          <Map width="500px" height="600px" />
        </div>
      </div>
    </>
  );
};

export default Details;
