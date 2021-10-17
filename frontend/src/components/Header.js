import React, { useState } from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
// import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'flatpickr/dist/themes/airbnb.css';
import Flatpickr from 'react-flatpickr';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { Calendar } from 'react-date-range';
<<<<<<< HEAD
import SignIn from '../pages/SignIn';
import {firebase} from '../firebase'
=======
import { useHistory } from 'react-router-dom';
>>>>>>> c2c9fe4ac0b08f53fabb9e7a06645ad1ca0dd227

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

// const selectionRange = {
//     startDate: new Date(),
//     endDate: new Date(),
//     key: 'selection',
//   }

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} miles`}
      visible={dragging}
      placement="top"
      key={index}
    >
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

export default function Header() {
  let date = new Date();
<<<<<<< HEAD
  const history = useHistory();


  

=======
  const [zipcode, setZip] = useState('');
  const [selecteddate, setDate] = useState('');
  const [errormsg, setError] = useState('');
  let history = useHistory();
<<<<<<< HEAD

||||||| ef78a26
=======
>>>>>>> c2c9fe4ac0b08f53fabb9e7a06645ad1ca0dd227
>>>>>>> ecb28e47a304c1072335f856d1e0f1a35e0525bf
  return (
    <div className="main_screen">
      <div className=" bg-white flex flex-row items-center justify-around">
        <div className="h-28 cursor-pointer flex-shrink-0">
          <img
            src="./images/logo.png"
            className="h-full ml-2 py-4 object-contain"
            onClick={() => {
              history.push('/');
              setZip('');
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
                minDate: 'today',
                altInput: true,
                enableTime: false,
                altFormat: 'F j, Y',
                dateFormat: 'Y-m-d',
              }}
              value={date}
              onChange={([date]) => {
                setDate({ date });
                console.log(selecteddate);
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
                let addressnav = '/zipcode/' + zipcode;
                if (is_usZipCode(zipcode)) {
                  history.push(addressnav);
                  setError('');
                } else {
                  console.log('invalid zipcode format ');
                  setError('Invalid Zipcode Format.');
                }
              }}
            />
          </div>
        </div>

        <div className="flex mr-8">
          <button
            className="flex-shrink-0 font-black border-transparent border-4 text-teal-500 hover:text-cust-orange text-sm rounded"
            type="button"
            onClick={() => {
              history.push('/myEvents');
            }}
          >
            My Events
          </button>
<<<<<<< HEAD
      
           <button
             onClick={() => {
              history.push("/SignIn");
            }}
          className="ml-8 mr-2 bg-cust-orange hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Sign In
        </button>
     
       
=======
          <img
            className="cursor-pointer hover:opacity-50"
            src="./images/notifications.png"
          />
          <button
            className="ml-8 mr-2 bg-cust-orange hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
>>>>>>> c2c9fe4ac0b08f53fabb9e7a06645ad1ca0dd227
        </div>
      </div>
      <h1 className="w-full center text-center h-auto">{errormsg}</h1>
    </div>
  );
}
