import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class FunctionSlider extends Component {
    render() {
        const settings = {
          dots: true,
          infinite: true,
          speed: 2000,
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          autoplay: true,
          autoplaySpeed: 5000,
        };

    return (
      <div>
        <Slider {...settings}>
          <div>
            <AnimatedSlide 
                linkTo={'seasoninfo'} 
                contents={['시즌정보', '이번 시즌 구단들의 성적과 선수들의 지표 랭킹을 확인할 수 있어요.']} 
                imageLink={'2'}
            />
          </div>
          <div>
            <AnimatedSlide 
                linkTo={'teaminfo'} 
                contents={['구단정보', '각 구단의 경기 기록과 시즌 성적, 소속 선수 리스트를 볼 수 있어요.']} 
                imageLink={'3'}
            />
          </div>
          <div>
            <AnimatedSlide 
                linkTo={'prediction'} 
                contents={['경기예측', 'Swing AI의 경기예측 결과를 확인하고 자신만의 예측 결과를 저장할 수 있어요.']} 
                imageLink={'1'}
            />
          </div>
          <div>
            <AnimatedSlide 
                linkTo={'compare'} 
                contents={['선수비교', 'Swing AI가 예측한 투타대결 결과를 확인하고 투수/타자간 기록을 비교할 수 있어요.']} 
                imageLink={'4'}
            />
          </div>
        </Slider>
      </div>
    );
  }
}

class AnimatedSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDiv: false,
    };
    this.linkTo = props.linkTo;
    this.contents = props.contents;
    this.imageLink = props.imageLink;
  }

  componentDidMount() {
    // 슬라이드가 마운트될 때 애니메이션을 시작
    this.startAnimation();
  }

  componentDidUpdate(prevProps) {
    // 슬라이드가 바뀔 때 애니메이션을 재시작
    if (prevProps !== this.props) {
      this.startAnimation();
    }
  }

  startAnimation() {
    this.setState({ showDiv: false }, () => {
      setTimeout(() => {
        this.setState({ showDiv: true });
      }, 200);
    });
  }

  render() {
    const { showDiv } = this.state;
    const linkTo = this.linkTo;
    const contents = this.contents;
    return (
      <div>
        <div 
            className={`w-[90%] mx-auto p-10 my-4 ${showDiv ? 'opacity-100 scale-100' : 'opacity-0 scale-0 transform'} transition-transform duration-1000 ease-in-out bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50`}
            style={{ backgroundImage: `url("/${linkTo}.png")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        >
            <div className="grid grid-cols-2">
                <div/>
                <div className="ms-7 text-black">
                    <p>{contents[0]}</p>
                    <p>{contents[1]}</p>
                    <Link to={`/${linkTo}`} className="text-gray-500" style={{ textDecoration : 'none' }}>
                        <p className="inline">페이지 이동 </p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 pb-1 inline">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    );
  }
}