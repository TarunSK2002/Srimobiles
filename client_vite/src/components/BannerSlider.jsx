// // src/components/BannerSlider.jsx
// import React from 'react';

// const BannerSlider = () => {
//   // Dummy banners, replace images/URLs with your own
//   const banners = [
//     'https://via.placeholder.com/1200x300?text=Banner+1',
//     'https://via.placeholder.com/1200x300?text=Banner+2',
//     'https://via.placeholder.com/1200x300?text=Banner+3',
//   ];

//   return (
//     <div style={{ margin: '20px 0', overflow: 'hidden' }}>
//       {banners.map((url, idx) => (
//         <img
//           key={idx}
//           src={url}
//           alt={`Banner ${idx + 1}`}
//           style={{ width: '100%', marginBottom: '10px', borderRadius: '8px' }}
//         />
//       ))}
//     </div>
//   );
// };

// export default BannerSlider;






















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const BannerSlider = () => {
//   const [banners, setBanners] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/offers/all');
//         // Assuming response.data is an array of offers with `image` field as filename
//         const bannerUrls = response.data.map(offer => 
//           `http://localhost:5000/uploads/offers/${offer.image}`
//         );
//         setBanners(bannerUrls);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load banners');
//       }
//     };

//     fetchBanners();
//   }, []);

//   if (error) return <div>{error}</div>;

//   return (
//     <div style={{ margin: '20px 0', overflow: 'hidden' }}>
//       {banners.map((url, idx) => (
//         <img
//           crossOrigin="ananymous"
//           key={idx}
//           src={url}
//           alt={`Banner ${idx + 1}`}
//           style={{ width: '100%', marginBottom: '10px', borderRadius: '8px' }}
//         />
//       ))}
//     </div>
//   );
// };

// export default BannerSlider;



















import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/offers/all');
        const bannerUrls = response.data.map(
          (offer) => `http://localhost:5000/uploads/offers/${offer.image}`
        );
        setBanners(bannerUrls);
      } catch (err) {
        console.error(err);
        setError('Failed to load banners');
      }
    };

    fetchBanners();
  }, []);

  // Reset currentIndex if it goes out of bounds after banners update
  useEffect(() => {
    if (currentIndex >= banners.length) {
      setCurrentIndex(0);
    }
  }, [banners.length, currentIndex]);

  // Auto slide logic
  const startAutoSlide = useCallback(() => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prev) => (banners.length ? (prev + 1) % banners.length : 0));
    }, 4000);
  }, [banners.length]);

  const stopAutoSlide = useCallback(() => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      startAutoSlide();
      return () => stopAutoSlide();
    }
  }, [banners, startAutoSlide, stopAutoSlide]);

  // Manual navigation handlers
  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  if (error) return <div>{error}</div>;
  if (banners.length === 0) return <div>Loading...</div>;

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 8,
        maxWidth: '100%',
        userSelect: 'none',
      }}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* Slider track */}
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * (100 / banners.length)}%)`,
          width: `${banners.length * 100}%`,
        }}
      >
        {banners.map((url, idx) => (
          <div
            key={idx}
            style={{
              width: `${100 / banners.length}%`,
              flexShrink: 0,
            }}
          >
            <img
              src={url}
              alt={`Banner ${idx + 1}`}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
              crossOrigin="anonymous"
            />
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <LeftOutlined
        onClick={goPrev}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          fontSize: '24px',
          color: 'rgba(0,0,0,0.5)',
          cursor: 'pointer',
          zIndex: 10,
          userSelect: 'none',
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderRadius: '50%',
          padding: '6px',
        }}
      />

      {/* Right arrow */}
      <RightOutlined
        onClick={goNext}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          fontSize: '24px',
          color: 'rgba(0,0,0,0.5)',
          cursor: 'pointer',
          zIndex: 10,
          userSelect: 'none',
          backgroundColor: 'rgba(255,255,255,0.7)',
          borderRadius: '50%',
          padding: '6px',
        }}
      />

      {/* Navigation dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          zIndex: 10,
        }}
      >
        {banners.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: idx === currentIndex ? '#2874f0' : '#ccc',
              cursor: 'pointer',
              border: '2px solid white',
              boxShadow: idx === currentIndex ? '0 0 5px #2874f0' : 'none',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
