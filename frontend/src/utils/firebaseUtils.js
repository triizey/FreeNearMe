import { firebase } from '../firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const handleUserProfile = async (userID) => {
  if (!userID) return;

  const userRef = firestore.doc(`users/${userID}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const displayName = 'UserName';
    const email = 'userEmail';
    const userRoles = ['user'];

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
