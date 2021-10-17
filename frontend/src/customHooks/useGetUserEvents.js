import { useState, useEffect } from "react";
import { firebase } from "../firebase";

const useGetUserEvents = (userID) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection(`users/${userID}/myevents`)
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setEvents(documents);
      });

    return () => unsub();
  }, [userID]);

  return { events };
};

export default useGetUserEvents;
