import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import SmallCard from '../components/SmallCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Zipcode = ({ events }) => {
  const getImgRandomNo = () => {
    return Math.floor(Math.random() * 9);
  };

  const params = useParams();

  // const [eventsl, setEvents] = useState([]);

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     const { data } = await axios.get(`/api/events/byzipcode/` + params.id);
  //     setEvents(data);
  //     console.log(params.id);
  //   };
  //   fetchEvents();
  // }, []);

  // useEffect(() => {
  //   console.log(events[0]);
  //   console.log(events.length);
  // }, []);

  const caCoords = [
    { latitude: 34.052235, longitude: -118.243683 },
    { latitude: 35.45861, longitude: -119.35516 },
    { latitude: 37.7749295, longitude: -122.4194155 },
    { latitude: 9.9346304, longitude: -84.0923248 },
  ];

  return (
    <div>
      <main className="main_screen">
        {/* current events */}
        <div>
          <h1 className="h1 text-cust-black font-header">
            Events for Zip Code {params.id}
          </h1>

          <div className="md:relative h-full">
            <section className="scrollbar-thin mb-8 h-5/6 top-24 left-5 md:absolute md:z-10 overflow-y-scroll scrollbar-thumb-cust-black scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {events
                .filter((event) =>
                  params.id.substring(5).length > 3
                    ? new RegExp(params.id.substring(0, 5).slice(0, -2)).test(
                        event.zipcode
                          .substr(event.zipcode.length - 5)
                          .substring(0, 3),
                      ) &&
                      Date.parse(event.date) <
                        parseInt(params.id.substring(5)) + 86400 &&
                      Date.parse(event.date) >
                        parseInt(params.id.substring(5)) - 86400
                    : new RegExp(params.id.substring(0, 5).slice(0, -2)).test(
                        event.zipcode
                          .substr(event.zipcode.length - 5)
                          .substring(0, 3),
                      ),
                )
                .map((event) => (
                  // events.filter(event => event.zipcode.includes("902")).map((event) => (
                  <SmallCard
                    key={event.uid}
                    event={event}
                    imgSrc={
                      event.imgs
                        ? event.imgs
                        : `/images/food_event${getImgRandomNo()}.jpg`
                    }
                  />
                ))}
              ​ ​ ​
            </section>
            <section className="hidden md:block w-full">
              <Map
                events={events}
                width="100%"
                height="800px"
                geoCodes={caCoords}
              />
            </section>
          </div>
        </div>
        {/* upcoming events */}
        {/* <section className="mt-12">
        <h1 className="h1 text-cust-black font-header">Upcoming Events</h1>
        //EVENT CROUSEL
      </section> */}
      </main>
    </div>
  );
};

export default Zipcode;
