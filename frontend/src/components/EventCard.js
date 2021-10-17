import React from "react";
import { CalendarIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";

const EventCard = ({ event, location }) => {
  const history = useHistory();

  const getImgRandomNo = () => {
    return Math.floor(Math.random() * 9);
  };
  return (
    <div className="flex flex-col rounded-xl w-60 mb-10  border border-gray-300">
      <div className="max-w-60 h-40">
        <img src={event.imgs ? event.imgs : `/images/food_event${getImgRandomNo()}.jpg`} alt="my event" className="w-full h-full rounded-t-xl" />
      </div>
      <div className="p-2 flex-grow">
        <h1 className="text-cust-black font-semibold font-header mb-5">{event.name}</h1>
        <div className="text-gray-400 text-sm flex items-start mb-3">
          <CalendarIcon className="h-4 mr-1" />
          <div>
            <h4>{event.date}</h4>
            <h4>{event.time}</h4>
          </div>
        </div>
        <div className="text-gray-400 text-sm flex items-start">
          <PaperAirplaneIcon className="h-4 mr-1" />
          <h4>{event.zipcode}</h4>
        </div>
      </div>
      <div className="p-2">
        <button
          className="relative flex items-center cursor-pointer py-2 px-6 rounded-full border border-gray-500 w-32 mb-3 hover:text-white hover:bg-black transition-all ease-out"
          onClick={() => {
            history.push(`/events/${event.uid}`);
          }}
        >
          <h4 className="relative text-md mr-5">Details</h4>
          <ArrowNarrowRightIcon className="h-4 flex-shrink-0" />
        </button>
      </div>
    </div>
  );
};

export default EventCard;
