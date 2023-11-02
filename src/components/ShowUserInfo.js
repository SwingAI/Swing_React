import React, { useState } from "react";

import NameChangeModal from "./NameChangeModal";
import HorizontalBarChart from "./HorizontalBar";

const ShowUserInfo = ({ data }) => {
    // 닉네임 변경 모달 열림 여부 상태
    const [isNameOpen, setIsNameOpen] = useState(false)

    return (
        <div className='ms-4 mt-4'>
            <div className='flex flex-row'>
                <div className="flex justify-center drop-shadow-lg bg-blue-500 rounded-tl-lg rounded-br-lg" style={{ width: 40, height: 40 }}>
                    <p className="text-white font-bold text-lg mt-1">{parseInt(data.correctPrediction/20)+1}</p>
                </div>
                <p className='ms-3 mt-1 text-2xl'>{data.nickname}</p>
                <button onClick={() => setIsNameOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ms-2 w-4 h-4 inline">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                    <p className="inline align-bottom text-xs">수정</p>
                </button>
                <NameChangeModal isOpen={isNameOpen} onClose={() => setIsNameOpen(false)} data={data}/>
            </div>
            <div className="mt-4">
                <span class="inline-block align-bottom">경험치</span>
                <HorizontalBarChart value={(data.correctPrediction%20)*5}/>
                <p className="text-end">다음 레벨까지 {100-((data.correctPrediction%20)*5)} EXP / 전체 {data.correctPrediction*5} EXP</p>
            </div>
            <div className="mt-12">
                <p className="mb-5 inline-block text-xl">전체 예측 정보</p>
                <div className="flex justify-evenly text-center">
                    <div>
                        <p className="font-bold text-2xl">{data.prediction}</p>
                        <p>전체 예측</p>
                    </div>
                    <div>
                        <p className="font-bold text-2xl">{data.correctPrediction}</p>
                        <p>맞춘 예측</p>
                    </div>
                    <div>
                        <p className="font-bold text-2xl">{data.prediction===0?0:((data.correctPrediction/data.prediction)*100).toFixed(3)}%</p>
                        <p>정확도</p>
                    </div>
                </div>
            </div>
        </div>   
    )
}
export default ShowUserInfo;