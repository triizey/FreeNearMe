import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import SmallCard from '../components/SmallCard';
import EventsCarousel from '../components/EventsCarousel';



const Home = ({ events }) => {
  const [filteredEvent, setFilteredEvent] = useState([events]);

  useEffect(() => {}, [filteredEvent]);

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
              <Map events={events} width="100%" height="800px" />
            </section>
          </div>
        </div>
        {/* upcoming events */}
        <section className="mt-12">
          <h1 className="h1 text-cust-black font-header">Upcoming Events</h1>
          <EventsCarousel events={events} 
           />
        </section>
      </main>
    </div>
  );
};

export default Home;
