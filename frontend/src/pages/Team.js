import React from 'react';
import { LinkIcon } from '@heroicons/react/outline';

const Team = () => {
  const team = [
    {
      name: 'Trey White',
      img: '/images/trey.jpg',
      reference: 'https://www.linkedin.com/in/trey-white-a6a705b/',
    },
    {
      name: 'Thomas Eruchie',
      img: '/images/thomas.jpg',
      reference: 'https://www.linkedin.com/in/thomas-eruchie-783b2153/',
    },
    {
      name: 'Jasveer Shaw',
      img: '/images/jasveer.png',
      reference: 'https://www.linkedin.com/in/jasveer-shah-002a24189/',
    },
    {
      name: ' Sebastian Moreno Breser',
      img: '/images/juan.jpg',
      reference: 'https://www.linkedin.com/in/juansemoreno/',
    },
    {
      name: 'Simon Sun',
      img: '/images/simon.png',
      reference: 'https://www.linkedin.com/in/simon-sun-64398985/',
    },
    {
      name: 'James Jager',
      img: '/images/james.jpg',
      reference: 'https://www.linkedin.com/in/james-jager-a85476162/',
    },
    {
      name: 'Jean-Arnaud Tanoe',
      img: '/images/jean.PNG',
      reference: 'https://www.linkedin.com/in/jean-arnaud-tanoe-896601125/',
    },
    {
      name: 'Michael Marcucci',
      img: '/images/mike.jpg',
      reference: 'https://www.linkedin.com/in/michael-marcucci-1a577293/',
    },
  ];

  const showMembers = () => {
    return team.map((member) => (
      <div className="flex flex-col rounded-xl w-60 mb-10  border border-gray-300">
        <div className="max-w-60 h-40">
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full rounded-t-xl"
          />
        </div>
        <div className="p-2 flex-grow">
          <h1 className="text-cust-black font-semibold font-header mb-5">
            {member.name}
          </h1>
          <div className="text-gray-400 text-sm flex items-start">
            <LinkIcon className="h-4 mr-1" />
            <a href={member.reference}>Learn more about {member.name}</a>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="main_screen max-w-screen-2xl m-auto grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {showMembers()}
    </div>
  );
};

export default Team;
