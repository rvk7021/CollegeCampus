import React, { useEffect, useState } from 'react';
import '../css files/Slider.css'; 

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of images
  const images = [
    { src: '/slide1.jpg' },
    { src: '/slide2.jpg' },
    { src: '/slide3.jpg' },
    { src: '/slide4.jpg' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval); 
  }, [images.length]);

  // Function to handle dot click
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slider-item ${index === currentIndex ? 'active' : ''}`}
        >
          <img
            src={image.src}
            alt={`Slide ${index + 1}`} 
            className="slider-image"
          />
        </div>
      ))}
      {/* Navigation Dots */}
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
