import React from 'react';
import Map from '../components/Map';
import SmallCard from '../components/SmallCard';

const Home = ({ events }) => {
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
            <section className="scrollbar-thin mb-8 h-5/6 top-24 left-5 absolute z-10 overflow-y-scroll scrollbar-thumb-cust-black scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {events.slice(0, 25).map((event) => (
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
              <Map events={events} />
            </section>
          </div>
        </div>
        {/* upcoming events */}
        <section className="mt-12">
          <h1 className="h1 text-cust-black font-header">Upcoming Events</h1>
          //EVENT CROUSEL
        </section>
      </main>
    </div>
  );
};

export default Home;
