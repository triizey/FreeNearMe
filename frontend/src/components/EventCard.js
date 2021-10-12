import React from 'react';

const EventCard = ({ event, imgSrc }) => {
  return (
    <div className="flex justify-between py-4 px-6 border-b first:border-t cursor-pointer hover:opacity-80 hover:shadow-lg hover:-translate-y-2 transform transition-all sm:flex-row-reverse md:justify-evenly bg-white ">
      <div className="flex flex-col sm:w-96 ">
        <h4 className="text-custBlack font-main-text text-xs">
          {`${event.date}   ${event.time}`}
        </h4>
        <h2 className="text-lg py-2">{event.name}</h2>
        <div className="w-10 border-t flex-grow mb-3" />
        <h4 className="text-gray-400 text-sm">{event.location}</h4>
      </div>
      <div className="flex-shrink-0 h-32 w-40 mx-4">
        <img src={imgSrc} className="rounded-xl mb-3 w-full h-full sm:mr-6" />
      </div>
    </div>
  );
};

export default EventCard;
