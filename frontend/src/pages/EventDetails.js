import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import axios from "axios";

const EventDetails = (props) => {
  const [eventdetails, setEventDetails] = useState({});
  // axios.get('/api/events/:eventid)

  // const event = props.events.find((obj) => obj.uid === props.match.params.uuid);

  useEffect(() => {
    axios.get(`/api/events/${props.match.params.uuid}`).then((resolve) => {
      setEventDetails(resolve.data);
    });
  }, []);

  console.log(eventdetails);

  return <Event {...props} event={eventdetails} />;
};

export default EventDetails;
