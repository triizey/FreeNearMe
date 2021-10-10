import React from 'react';
import EventCard from '../components/EventCard';

const Home = ({ events }) => {
  return (
    <div>
      <main className="main_screen">
        {/* current events */}
        <div>
          <h1 className="h1 text-cust-black font-header">Current Events</h1>
          <div className="md:relative">
            <section className="mb-8 md:absolute z-10">
              {events.slice(0, 20).map((event) => (
                <EventCard key={event.uid} event={event} imgSrc={event.imgs} />
              ))}
            </section>
            <section className="hidden md:block w-full">Map</section>
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
