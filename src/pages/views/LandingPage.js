import React from 'react'
import RecentMatchPredictionCard from '../../components/RecentMatchPredictionCard';
import FunctionSlider from '../../components/FunctionSlider';

import '../../components/LandingPage.css';

function LandingPage() {
  return (
    <div>
      <div className="py-5 bg-gray-100 h-auto bg-cover bg-fixed bg-center bg-no-repeat" style={{ backgroundImage: 'url("/bgimg2.png")' }}>
        <div className="container">
          <div className="row text-white">
            <div className="col-lg-8 col-md-7 my-5 mx-auto d-flex justify-content-center flex-column text_shadow">
              <p className="text-gradient text-primary font-medium text-6xl">Swing AI</p>
              <p className="mb-4 font-medium text-4xl">프로야구 승부 예측 AI</p>
              <p className="pe-5 me-5 text-2xl font-light">Swing AI는 전적과 기록을 기반으로 한<br/>머신러닝 KBO 승부 예측 AI입니다.</p>
            </div>
            <div className="col-lg-8 col-md-7 my-5 mx-auto d-flex justify-content-center flex-column text_shadow">
              <p className="text-2xl">프로젝트 소개</p>
              <div className='ms-4 mt-4'>
                <p className='text-xl font-light inline text-blue-500'>Swing AI</p>
                <p className='text-xl font-light inline'>는 한국 프로야구(KBO)에 대한 정보와 승부 예측 기능을 제공하여 야구를 보다 쉽고 재밌게 접근할 수 있도록 개발되었습니다.</p>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 my-5 mx-auto d-flex justify-content-center flex-column">
              <p className="text-2xl text_shadow">기능 소개</p>
              <FunctionSlider/>
            </div>
            <div className="col-lg-8 col-md-7 my-5 mx-auto d-flex justify-content-center flex-column">
              <h1 className="mb-4 text-center font-medium text_shadow">
                <p className='text-primary inline-block'>Swing AI</p>
                <p className='ms-3 inline-block'>예측 예시</p>
              </h1>
              <div className="flex justify-center items-center">
                <RecentMatchPredictionCard/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
