import React, { useState, useEffect } from 'react';
import BattervsPitcher from './BattervsPitcher';
import CompareHitter from './CompareHitter';
import ComparePitcher from './ComparePitcher';
import './SlideExample.css'; // CSS 파일을 import

function SlideExample() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [showDiv, setShowDiv] = useState(false);

    // div가 처음 렌더링될 때 나타날 수 있도록 useEffect를 사용
    useEffect(() => {
        // 일정 시간 후에 div를 나타나게 설정 (예: 2초 후)
        const timer = setTimeout(() => {
            setShowDiv(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

  const slides = [
    <div key={1}>
      <BattervsPitcher />
    </div>,
    <div key={2}>
      <CompareHitter />
    </div>,
    <div key={3}>
      <ComparePitcher />
    </div>,
  ];

  const handleSlideChange = (slideNumber) => {
    setActiveSlide(slideNumber);
  };

  const slideButtons = ["투타 비교", "타자 비교", "투수 비교"];

  return (
    <div>
      <div className="slide-navigation" style={{ backgroundImage: 'url("/bgimg7_2.png")' }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index + 1)}
            className={`slide-button ${activeSlide === index + 1 ? 'active' : ''}`}
          >
            {slideButtons[index ]}
          </button>
        ))}
      </div>
      <div className="slide-content" style={{ opacity: activeSlide === 1 ? 1 : 0 }}>
        {slides[0]}
      </div>
      <div className="slide-content" style={{ opacity: activeSlide === 2 ? 1 : 0 }}>
        {slides[1]}
      </div>
      <div className="slide-content" style={{ opacity: activeSlide === 3 ? 1 : 0 }}>
        {slides[2]}
      </div>
    </div>
  );
}

export default SlideExample;
