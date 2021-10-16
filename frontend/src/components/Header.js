import React from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import { useHistory } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import 'flatpickr/dist/themes/airbnb.css';
import Flatpickr from 'react-flatpickr';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { Calendar } from 'react-date-range';

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

//   const wrapperStyle = { width: 200, margin: 50 };

export default function Header() {
  let date = new Date();
  const history = useHistory();

  return (
    <div className="main_screen">
      <div className=" bg-white flex flex-row items-center justify-around">
        <div
          className="h-28 cursor-pointer flex-shrink-0"
          onClick={() => {
            history.push('/');
          }}
        >
          <img
            src="./images/logo.png"
            className="h-full ml-2 py-4 object-contain"
          />
        </div>
        <div className="flex flex-row items-center justify-center bg-gray-100 rounded">
          <div className="m-3">
            <input
              className="appearance-none block w-28 h-1/2 bg-white placeholder-cust-orange border border-cust-orange rounded- py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Location"
            ></input>
          </div>
          <div className="m-2">
            {/* <div className="w-3 h-3 bg-cust-orange rounded-full"></div>
                      <div className="h-1 w-40  bg-gray-900 rounded"></div> */}
            <div style={wrapperStyle}>
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
            </div>
            {/* <Range /> */}
          </div>
          <div className="m-2">
            <Flatpickr
              value={date}
              onChange={([date]) => {
                this.setState({ date });
              }}
            />
            {/* <Calendar date={new Date()} /> */}
            {/* <DateRangePicker ranges={[selectionRange]}/> */}
          </div>
          <div className="m-3 w-8 h-8 cursor-pointer">
            <img
              className="cursor-pointer hover:opacity-50"
              src="./images/search.png"
            />
          </div>
        </div>
        <div className="flex mr-8">
          <button
            onClick={() => {
              history.push('/myEvents');
            }}
            className="flex items-center"
          >
            <h4
              className="flex-shrink-0 font-black border-transparent border-4 text-teal-500 hover:text-cust-orange text-sm rounded"
              type="button"
            >
              My Events
            </h4>
            <img
              className="cursor-pointer hover:opacity-50"
              src="./images/notifications.png"
            />
          </button>
          <button
            className="ml-8 mr-2 bg-cust-orange hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
