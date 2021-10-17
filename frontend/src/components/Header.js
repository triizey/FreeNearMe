import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Slider, { SliderTooltip } from "rc-slider";
// import Slider, { Range } from 'rc-slider';
import "rc-slider/assets/index.css";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { Calendar } from "react-date-range";
import SignIn from "../pages/SignIn";
import { firebase } from "../firebase";
import useFirestore from "../customHooks/useFirestore";

import EventContext from "../utils/EventContext";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip prefixCls="rc-slider-tooltip" overlay={`${value} miles`} visible={dragging} placement="top" key={index}>
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const wrapperStyle = { width: 200 };

function is_usZipCode(str) {
  let regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;

  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
}

//   const wrapperStyle = { width: 200, margin: 50 };

export default function Header({ user }) {
  const userInfo = useContext(EventContext);
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const events = useFirestore(`users/${userInfo.userID}/myevents`);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
      history.goBack();
    }
  }, [user]);

  const handleLogout = () => {
    setLoggedIn(false);
    firebase.auth().signOut();
    history.push("/");
  };

  const handleLogIn = () => {
    if (!loggedIn) {
      history.push("/SignIn");
    }
  };
  let date = new Date();

  const [zipcode, setZip] = useState("");
  const [selecteddate, setDate] = useState("");
  const [errormsg, setError] = useState("");
  return (
    <div className="main_screen">
      <div className=" bg-white flex flex-row items-center justify-around">
        <div className="h-28 cursor-pointer flex-shrink-0">
          <img
            src="./images/logo.png"
            className="h-full ml-2 py-4 object-contain"
            onClick={() => {
              history.push("/");
              setZip("");
            }}
          />
        </div>
        <div className="flex flex-row items-center justify-center bg-gray-600 rounded">
          <div className="m-3">
            <input
              className="appearance-none block w-28 h-1/2 bg-white placeholder-cust-orange border border-cust-orange rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Zip Code"
              value={zipcode}
              onInput={(e) => setZip(e.target.value)}
            ></input>
          </div>
          <div className="m-2">
            {/* <div className="w-3 h-3 bg-cust-orange rounded-full"></div>
                      <div className="h-1 w-40  bg-gray-900 rounded"></div> */}
            {/* <div style={wrapperStyle}>
              <Slider
                min={0}
                max={100}
                defaultValue={3}
                handle={handle}
                handleStyle={{
                  backgroundColor: 'orange',
                  borderColor: 'orange',
                }}
                trackStyle={{ backgroundColor: 'orange' }}
              />
            </div> */}
            {/* <Range /> */}
          </div>
          <div className="m-2 ">
            <Flatpickr
              className="m-2 h-10 px-3 placeholder-cust-orange border border-cust-orange rounded text-yellow-500"
              options={{
                minDate: "today",
                altInput: true,
                enableTime: false,
                altFormat: "F j, Y",
                dateFormat: "Y-m-d",
              }}
              value={date}
              onChange={([date]) => {
                setDate({ date });
                // console.log(selecteddate);
              }}
            />
            {/* <Calendar date={new Date()} /> */}
            {/* <DateRangePicker ranges={[selectionRange]}/> */}
          </div>
          <div className="m-3 w-8 h-8 cursor-pointer">
            <img
              className="cursor-pointer hover:opacity-50"
              src="./images/search.png"
              onClick={() => {
                console.log(zipcode);
                let addressnav = "/zipcode/" + zipcode;
                if (is_usZipCode(zipcode)) {
                  history.push(addressnav);
                  setError("");
                } else {
                  console.log("invalid zipcode format ");
                  setError("Invalid Zipcode Format.");
                }
              }}
            />
          </div>
        </div>

        <div className="flex mr-8">
          {loggedIn && (
            <>
              <button
                className="flex-shrink-0 font-black border-transparent border-4 text-teal-500 hover:text-cust-orange text-sm rounded"
                type="button"
                onClick={() => {
                  history.push("/myEvents");
                }}
              >
                My Events
              </button>
              <span
                className="flex-shrink-0 font-black border-transparent border-4 text-teal-500 hover:text-cust-orange text-sm rounded"
                type="button"
                onClick={() => {
                  history.push("/myEvents");
                }}
              >
                {events.length}
              </span>
            </>
          )}

          {!loggedIn ? (
            <button
              className="ml-8 mr-2 bg-cust-orange hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogIn}
            >
              Sign In
            </button>
          ) : (
            <button
              className="ml-8 mr-2 bg-cust-red hover:bg-red-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
      <h1 className="w-full center text-center h-auto">{errormsg}</h1>
    </div>
  );
}
