// To get the user Id from using this hook you will first need
//  to import it at the top of you component
// import useGetUserID from "./customHooks/useGetUserID";
// then to extract the id from this hook simply put this line of code
// with the rest of the state variables
// const [userID] = useGetUserID();

// MUST be logged in, in order for a return or the promise will get rejected :)

import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { handleUserProfile } from "../utils/firebaseUtils";

const useGetUserID = () => {
  const [userID, setUserID] = useState("");

  useEffect(() => {
    getUserID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged((userAuth) => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

  const getUserID = async () => {
    try {
      const userAuth = getCurrentUser();
      if (!userAuth) return;
      var userID = await userAuth.then((response) => {
        const { uid } = response;
        return uid;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUserID(userID);
      handleUserProfile(userID);
    }
  };

  return [userID];
};

export default useGetUserID;
