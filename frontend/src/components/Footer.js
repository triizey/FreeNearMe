import React from 'react';
import { useHistory } from 'react-router';

export default function Footer() {
  const history = useHistory();

  return (
    <div className="footer">
      <div className="w-auto h-64 bg-gray-900">
        <div className="flex justify-center">
          <p className="text-purple-50 text-opacity-80 w-1/3 ml-10 pt-9 mr-20">
            Disclaimer: This site is a student generated project to serve as an
            educational experience for the contributors, and is made for the
            sole purpose of learning. This site is not intended for use by
            minors and any data provided by lawful users of this site is done so
            at their own volition.
          </p>

          <div className="flex flex-col text-white m-10">
            <h1 className="text-cust-orange">ABOUT</h1>
            <button
              className="hover:text-cust-orange cursor-pointer"
              type="button"
              onClick={() => {
                history.push('/story');
              }}
            >
              Our Story
            </button>
            <button
              className="hover:text-cust-orange cursor-pointer"
              type="button"
              onClick={() => {
                history.push('/team');
              }}
            >
              Team
            </button>
          </div>

          <div className="flex flex-col text-white  m-10 ">
            <h1 className="text-cust-orange">FOLLOW US</h1>
            <button className="hover:text-cust-orange cursor-pointer">
              Facebook
            </button>
            <button className="hover:text-cust-orange cursor-pointer">
              Twitter
            </button>
            <button className="hover:text-cust-orange cursor-pointer">
              Instagram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
