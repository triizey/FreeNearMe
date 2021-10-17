import React, { useContext } from "react";
import MyEventsCard from "../components/MyEventsCard";
import useFirestore from "../customHooks/useFirestore";
import EventContext from "../utils/EventContext";

const MyEvents = () => {
  const userInfo = useContext(EventContext);
  const events = useFirestore(`users/${userInfo.userID}/myevents`);

  return (
    <div className="main_screen">
      {!events.length ? <h1 className="h1">You have not saved any event yet</h1> : <h1 className="h1">My Events: {events.length}</h1>}

      <div className="max-w-screen-2xl m-auto grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {events.map((event) => (
          <MyEventsCard event={event} key={event.uid} userID={userInfo.userID} />
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
