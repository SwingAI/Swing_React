import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerCircle from "./Rechart";
import { Link } from "react-router-dom";
import PlayerDetailPage from "../pages/views/PlayerDetailPage";

function PredictModal({ data, hitter, pitcher, isOpen, onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부 상태
    const [result, setResults] = useState([]); // 선수 데이터 배열 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [showDiv, setShowDiv] = useState(false);

    // div가 처음 렌더링될 때 나타날 수 있도록 useEffect를 사용
    useEffect(() => {
        // 일정 시간 후에 div를 나타나게 설정 (예: 2초 후)
        const timer = setTimeout(() => {
            setShowDiv(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

    useEffect(() => {
        // 외부 서버에서 선수 데이터를 가져오는 부분입니다.
        axios
            .get(`http://3.39.10.26/predict/${hitter}/${pitcher}`)
            .then((response) => {
                setResults(response.data); // 선수 데이터를 상태에 저장
                setIsLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 변경
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    if (!isOpen) return null;

    console.log(result)

    const circle_data = [
        { name: '안타', value: result['안타'] * 100 },
        { name: '2타', value: result['2타'] * 100 },
        { name: '삼진', value: result['삼진'] * 100 },
        { name: '홈런', value: result['홈런'] * 100 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex items-center justify-center container mx-auto p-6 max-h-screen overflow-y-auto">
                    <div className="w-2/3 bg-black rounded-lg shadow-xl p-6 text-white">
                        <div className="flex justify-end">
                            <button onClick={onClose} className="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {isLoading ? (
                            <div className="w-full h-auto mx-auto flex items-center justify-center">
                                 <h2 className="text-2xl font-semibold mx-5 mt-2 text-white">Swing AI 예측중...</h2>
                                <div className="animate-spin rounded-full border-t-4 border-b-4 border-white h-12 w-12"></div>
                            </div>
                        ) : (
                            <div className="mt-8 items-center">
                                <div className="text-center">
                                    <h2 className="text-2xl font-semibold mb-4 text-white">
                                        {pitcher} vs {hitter}{" "}
                                        <span className="text-blue-600">Swing</span> 예상 지표
                                    </h2>
                                </div>
                                <div className="w-[30%] mx-auto mb-3 items-center">
                                    <PlayerCircle data={circle_data} COLORS={COLORS} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">예상 단타율</p>
                                        <p className="text-3xl text-blue-600">
                                            {result ? (result['안타'] * 100).toFixed(1) + "%" : "N/A"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">예상 2루타율</p>
                                        <p className="text-3xl text-blue-600">
                                            {result ? (result['2타'] * 100).toFixed(1) + "%" : "N/A"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">예상 삼진율</p>
                                        <p className="text-3xl text-blue-600">
                                            {result ? (result['삼진'] * 100).toFixed(1) + "%" : "N/A"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">예상 홈런율</p>
                                        <p className="text-3xl text-blue-600">
                                            {result ? (result['홈런'] * 100).toFixed(1) + "%" : "N/A"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">예상 볼넷율</p>
                                        <p className="text-3xl text-blue-600">
                                            {result ? (result['볼넷'] * 100).toFixed(1) + "%" : "N/A"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">예상 사구율</p>
                                        <p className="text-3xl text-blue-600">
                                            {result ? (result['사구'] * 100).toFixed(1) + "%" : "N/A"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">득점 기댓값</p>
                                        <p className="text-3xl text-blue-600">
                                            {result ? result['득점'].toFixed(3) : "N/A"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">진루 기댓값</p>
                                        <p className="text-3xl text-blue-600">
                                            {result ? result['루타'].toFixed(3) : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PredictModal;
