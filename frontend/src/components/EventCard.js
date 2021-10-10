import React from 'react';

const EventCard = ({ event, imgSrc }) => {
  return (
    <div className="flex justify-between py-4 px-6 border-b first:border-t cursor-pointer hover:opacity-80 hover:shadow-lg hover:-translate-y-2 transform transition-all sm:flex-row-reverse md:justify-evenly bg-white bg-opacity-25">
      <div className="flex flex-col sm:w-96 ">
        <h4 className="text-custBlack font-main-text text-xs">
          {`${event.date}   ${event.time}`}
        </h4>
        <h2 className="text-lg py-2">{event.title}</h2>
        <div className="w-10 border-t flex-grow" />
      </div>
      <div className="flex-shrink-0">
        <img
          src={imgSrc}
          width="150px"
          height="48px"
          className="rounded-xl mb-3 sm:mr-6"
        />
      </div>
    </div>
  );
};

export default EventCard;
