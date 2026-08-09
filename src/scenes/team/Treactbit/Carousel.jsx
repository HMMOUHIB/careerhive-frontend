import React, { useEffect, useRef, useState } from 'react';
import './Carousel.css';
import Team1 from './Team1';
import Team2 from './Team2';
import Team3 from './Team3';
import Team4 from './Team4';
import Team5 from './Team5';
import Team6 from './Team6';
import Team7 from './Team7';

const CarouselComponent = () => {
  const [active, setActive] = useState(3);
  const itemsRef = useRef([]);

  const slidesData = [
    { content: <Team1 /> },
    {
      content: <Team2 />
    },
    {
      content : <Team3 />
    },
    {
      content : <Team4 />
    },
    {
     content : <Team5 />
    },
    {
     content : <Team6 />
    },
    {
      content : <Team7 />
    },
  ];

  useEffect(() => {
    loadShow();
  }, [active]);

  const loadShow = () => {
    const items = itemsRef.current;
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    for (let i = active + 1; i < items.length; i++) {
      stt++;
      items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = 'blur(5px)';
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
      stt++;
      items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = 'blur(5px)';
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1 < itemsRef.current.length ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  const slides = slidesData.map((slide, index) => (
    <div
      key={index}
      className="item"
      ref={(el) => (itemsRef.current[index] = el)}
      style={{ backgroundColor: slide.color || 'white' }}
    >
      {/* Optional Image */}
      {slide.imgSrc && (
        <img src={slide.imgSrc} alt={slide.title || 'Slide'} className="slide-img" />
      )}

      {/* Slide Content */}
      <div className="info-container">
        {slide.content ? (
          slide.content
        ) : (
          <>
            <h2>{slide.name}</h2>
            <p>{slide.description}</p>
          </>
        )}
      </div>

      {/* Buttons */}
      {!slide.content && (
        <div className="buttons-container">
          <button className="btn-primary">Remove from Team</button>
          <button className="btn-secondary">Rate Member</button>
        </div>
      )}
    </div>
  ));

  return (
    <div className="slider">
      {slides}
      <button onClick={handleNext} className="gallery-arrow" id="next">
        &gt;
      </button>
      <button onClick={handlePrev} className="gallery-arrow" id="prev">
        &lt;
      </button>
    </div>
  );
};

export default CarouselComponent;
