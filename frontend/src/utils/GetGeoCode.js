import { useState, useEffect } from "react";
import { axios } from "axios";

const GetGeocode = ({ location }) => {
  const [coord, setCoord] = useState({});

  useEffect(() => {
    handleGeoCodes();
  }, []);

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

  const handleGeoCodes = async () => {
    try {
      var coordRes = await new Promise(coordPromise).then((res) => {
        console.log(res);
        return res;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setCoord(coordRes);
    }
  };

  return [coord];
};

export default GetGeocode;
