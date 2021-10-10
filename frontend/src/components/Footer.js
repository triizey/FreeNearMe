import React from 'react';

export default function Footer() {
  return (
    <div className="footer">
      <div className="w-auto h-64 bg-gray-900">
        <div className="flex justify-center">
          <p className="text-purple-50 text-opacity-80 w-1/3 ml-10 pt-9 mr-20">
            Integer porta turpis ac luctus imperdiet. Suspendisse potenti. Donec
            tempor accumsan dictum. Nam malesuada rhoncus finibus. Proin et
            malesuada mauris. Nam pulvinar velit ac leo euismod, eu dapibus quam
            semper. Class aptent taciti.
          </p>

          <div className="flex flex-col text-white m-10">
            <h1 className="text-cust-orange">ABOUT</h1>
            <button className="hover:text-cust-orange cursor-pointer">
              Our Story
            </button>
            <button className="hover:text-cust-orange cursor-pointer">
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
