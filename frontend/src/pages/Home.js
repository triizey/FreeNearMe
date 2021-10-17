import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import SmallCard from '../components/SmallCard';
import EventsCarousel from '../components/EventsCarousel';

const Home = ({ events, defaultEvents }) => {
  // const defaultGeoCodes = geoCodes.filter(
  //   (code) => code.uid === nyDefaultEvents.uid,
  // );
  // const defaultGeoCodes = geoCodes.slice(0, 10);

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

  const getImgRandomNo = () => {
    return Math.floor(Math.random() * 9);
  };

  return (
    <div>
      <main className="main_screen">
        {/* current events */}
        <div>
          <h1 className="h1 text-cust-black font-header">Current Events</h1>
          <div className="md:relative h-full">
            <section className="scrollbar-thin mb-8 h-5/6 top-24 left-5 md:absolute md:z-10 overflow-y-scroll scrollbar-thumb-cust-black scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {events.map((event) => (
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
            </section>
            <section className="hidden md:block w-full">
              <Map width="100%" height="800px" geoCodes={nyCoords} />
            </section>
          </div>
        </div>
        {/* upcoming events */}
        <section className="mt-12">
          <h1 className="h1 text-cust-black font-header">Upcoming Events</h1>
          <EventsCarousel events={events} />
        </section>
      </main>
    </div>
  );
};

export default Home;
