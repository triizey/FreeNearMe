import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Item from './Item';
// import '../style.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';

const EventsCarousel = ({ events }) => {

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
              <Item key={uuidv4()}>
               <Wrap><img src={`/images/event${idx + 6}.jpg`}/>
             
              </Wrap>
                {event.title}
              </Item>
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
 */
    
    .slick-prev, .slick-next {
     color:blue;
      background-color: gray;
      border-radius: 50%;
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
    
    cursor: pointer; 
    img {
        border: 4px solid transparent;
        border-radius: 4px;
        height: 100%;
        width: 100%;
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    
        &:hover {
            border: 4px solid rgba(249, 249, 249, 0.8);
        }
    }
    `
