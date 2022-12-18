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
        onKeyUp={(event) => handleSlideInput(event)}
        role={fullScreenMode ? 'application' : ''}
      >
        <div className="slideshow-container" ref={slideshowRef} tabIndex="-1">
          {images.map((image, index) => {
            const imageUrl = imageURLs ? LoadedImageUrl(imageURLs, image.src) : image.src;
            return (
              <div className={`slide fade ${currentSlideIndex === index ? 'active' : ''}`} key={index}>
                <div className="numbertext">
                  {index + 1} / {images.length}
                </div>
                <figure>
                  <img src={imageUrl} alt={image.alt} style={{ width: '100%' }} />
                  <figcaption className="text" role="status" aria-relevant="text additions">
                    {image.caption}
                  </figcaption>
                </figure>
              </div>
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
