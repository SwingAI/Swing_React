import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 3000,
    };

    return (
      <div>
        <Slider {...settings}>
          <div>
            <AnimatedSlide />
          </div>
          <div>
            <AnimatedSlide />
          </div>
          <div>
            <AnimatedSlide />
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
      }, 3000);
    });
  }

  render() {
    const { showDiv } = this.state;
    return (
      <div>
        <div className={`w-[50%] mx-auto p-6 ${showDiv ? 'opacity-100 scale-100' : 'opacity-0 scale-0 transform'} transition-transform duration-1000 ease-in-out`}>
          This is the animated div.
        </div>
      </div>
    );
  }
}
