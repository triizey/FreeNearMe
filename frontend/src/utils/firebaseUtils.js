import axios from "axios";
import { useState, useEffect } from "react";

import { firebase } from "../firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const handleUserProfile = async (userID) => {
  if (!userID) return;

  const userRef = firestore.doc(`users/${userID}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const displayName = "UserName";
    const email = "userEmail";
    const userRoles = ["user"];

    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        userRoles,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userRef;
};

export const handleUserFavorites = async ({ userID, event }) => {
  if (!userID) return;
  const { uid } = event;

  const eventRef = firestore.doc(`users/${userID}/myevents/${uid}`);
  const snapshot = await eventRef.get();

  if (!snapshot.exists) {
    try {
      await eventRef.set({
        ...event,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return eventRef;
};

export const deleteUserFavorite = async ({ userID, event }) => {
  if (!userID) return;
  const { uid } = event;

  const eventRef = firestore.collection(`users/${userID}/myevents`);
  const snapshot = await eventRef.get();

  if (!snapshot.exists) {
    try {
      await eventRef.doc(uid).delete();
    } catch (error) {
      console.log(error);
    }
  }

  return eventRef;
};

export const handleGeoCodes = async (event) => {
  if (!event) return;
  const { uid, location } = event;

  const locationRef = firestore.doc(`eventlocations/${uid}`);
  const snapshot = await locationRef.get();

  const coordPromise = axios("https://maps.googleapis.com/maps/api/geocode/json", {
    params: {
      address: location,
      key: "AIzaSyAtVNovmGA72KXikxRSNX_h_MHUAbtqlgE",
    },
  })
    .then((res) => {
      if (res.data.status === "OK") {
        return res.data.results[0].geometry.location;
      }
    })
    .catch((error) => console.error(error));

  if (!snapshot.exists) {
    const handleLocation = async () => {
      try {
        await coordPromise.then((res) => {
          locationRef.set({
            ...res,
          });
        });
      } catch (error) {
        console.error(error);
      }
    };
    handleLocation();
  }

  return locationRef;
};
