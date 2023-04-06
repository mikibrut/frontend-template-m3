import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CardMate from '../components/CardMate';
import CarBand from '../components/CardMate';
import CardAdvert from '../components/CardMate';
import CardPlace from '../components/CardMate';

function Slider({ title, items }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? items.length - 1 : currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === items.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="slider-container">
      <h2>{title}</h2>
      <div className="slider">
        {items.map((item, index) => {
          let CardComponent;
          switch (item.type) {
            case 'mate':
              CardComponent = CardMate;
              break;
            case 'band':
              CardComponent = CarBand;
              break;
            case 'advert':
              CardComponent = CardAdvert;
              break;
            case 'place':
              CardComponent = CardPlace;
              break;
            default:
              return null;
          }

          return (
            <div
              key={item._id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <CardComponent {...item} />
            </div>
          );
        })}
      </div>
      <button className="prev-btn" onClick={handlePrevSlide}>
        <FaChevronLeft />
      </button>
      <button className="next-btn" onClick={handleNextSlide}>
        <FaChevronRight />
      </button>
    </div>
  );
}

export default Slider;

