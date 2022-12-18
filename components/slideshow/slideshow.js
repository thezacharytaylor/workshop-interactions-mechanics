import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import LoadedImageUrl from 'components/utils/loaded-image-url';

import 'components/slideshow/slideshow.scss';

const Slideshow = ({ images = [], imageURLs }) => {
  let [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  let [fullScreenMode, setFullScreenMode] = useState(false);

  const btnFullScreenRef = useRef(null);
  const btnCloseRef = useRef(null);
  const slideshowRef = useRef(null);

  const decrementSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      setCurrentSlideIndex(images.length - 1);
    }
  };
  const incrementSlide = () => {
    if (currentSlideIndex < images.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setCurrentSlideIndex(0);
    }
  };
  const changeSlide = (index) => {
    setCurrentSlideIndex(index);
  };
  const enterFullScreen = () => {
    setFullScreenMode(true);
    slideshowRef.current.focus();
  };
  const closeFullScreen = () => {
    if (fullScreenMode) {
      btnFullScreenRef.current.focus();
    }
    setFullScreenMode(false);
  };
  const preventDefaultFunc = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  };
  const handleScreenClick = (event) => {
    if (!slideshowRef.current.contains(event.target)) {
      setFullScreenMode(false);
    }
  };
  const handleSlideInput = (event) => {
    switch (event.key) {
      case 'Escape':
        closeFullScreen();
        break;
      case 'ArrowLeft':
        decrementSlide();
        break;
      case 'ArrowRight':
        incrementSlide();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button
        className="btn-slideshow-fullscreen"
        onClick={enterFullScreen}
        ref={btnFullScreenRef}
        aria-label="Make slideshow fullscreen"
      >
        <span className="icon" aria-hidden="true"></span>
      </button>
      <div
        className={`inspiration-slideshow ${fullScreenMode ? 'fullscreen' : ''}`}
        onClick={(event) => handleScreenClick(event)}
        onKeyDown={preventDefaultFunc}
        onKeyUp={(event) => handleSlideInput(event)}
      >
        <button
          aria-label="Close Full Screen mode"
          className="btn-slideshow-close"
          onClick={closeFullScreen}
          ref={btnCloseRef}
        >
          <span aria-hidden="true" className="icon"></span>
        </button>
        <div
          aria-live="polite"
          aria-roledescription="Image Slideshow"
          className="slideshow-container"
          ref={slideshowRef}
          role={fullScreenMode ? 'application' : 'region'}
          tabIndex="-1"
        >
          {images.map((image, index) => {
            const imageUrl = imageURLs ? LoadedImageUrl(imageURLs, image.src) : image.src;
            return (
              <figure
                aria-describedby={`count-${index}`}
                aria-labelledby={`img-${index} caption-${index}`}
                className={`slide fade ${currentSlideIndex === index ? 'active' : ''}`}
                key={index}
              >
                <p id={`count-${index}`} className="numbertext">
                  {index + 1} / {images.length}
                </p>
                <img src={imageUrl} alt={image.alt} style={{ width: '100%' }} id={`img-${index}`} />
                <figcaption className="text" role="status" aria-relevant="text additions" id={`caption-${index}`}>
                  {image.caption}
                </figcaption>
              </figure>
            );
          })}

          <button className="prev" onClick={() => decrementSlide()} aria-label="Previous slide button">
            &#10094;
          </button>
          <button className="next" onClick={() => incrementSlide()} aria-label="Next slide button">
            &#10095;
          </button>
        </div>
        <br />

        <ul className="dots">
          {images.map((image, index) => (
            <li className={`dot ${currentSlideIndex === index ? 'active' : ''}`} key={index}>
              <button
                onClick={() => changeSlide(index)}
                aria-label={`Slideshow nav button${currentSlideIndex === index ? ', current active slide' : ''}`}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

Slideshow.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      caption: PropTypes.string,
    })
  ),
  imageURLs: PropTypes.object,
};

export default Slideshow;
