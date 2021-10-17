import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';

const EventsCarousel = ({ events }) => {
    const getImgRandomNo = () => {
        return Math.floor(Math.random() * 9);
      };

    let settings = {
        arrows:true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
      };
    

      return (
  
          <Carousel  {...settings}  className='container'>
            {events.slice(5, 20).map((event, idx) => (
              <div key={uuidv4()}>
            <Wrap >
             <img    src={
              event.imgs
                ? event.imgs
                : `/images/food_event${getImgRandomNo()}.jpg`
               }
          alt="my event"/>
          
         
              </Wrap>
              <h2 className="text-lg py-2 text-center overflow-hidden px-6">{event.name}</h2>
              </div>
            ))}
          </Carousel>
    
      );
    };
    
    export default EventsCarousel;
    
    
    const Carousel = styled(Slider)`
  
      background-color: white;
    
    
    
      ul li button {
          &:before {
              font-size: 10px;
              color: rgb(150, 158, 171);
          }
      }
     li.slick-active button::before {
    
         color:black;  
    
     }
    
    
    .slick-prev, .slick-next {
     color:blue;
      background-color: gray;
      border-radius: 50%;
      top: 110px;
      z-index:10;
    }
    
    
      .slick-list {
          overflow:hidden;
      }
    
      button {
          z-index: 1;
          color:blue;
      }
    `
    
    const Wrap = styled.div`
    display: flex;
    align-items:center;
    height: 200px;
    width: 300px;
    color: black;
    cursor: pointer; 
    img {
        border: 4px solid transparent;
        border-radius: 4px;
        height:100%;
        width: 100%;
        object-fit: cover;
        padding:10px;
    
        &:hover {
            border: 4px solid rgba(128,128,128, 0.8);
        }
    }
    `
