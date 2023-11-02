import React, { useEffect, useState } from "react";
import axios from "axios";

function Modal({ id, isOpen, onClose }) {
    const [data, setData] = useState([]); // 데이터 상태

    useEffect(() => {
        if (isOpen) {
            // 모달이 열릴 때 데이터를 가져오는 로직
            // 예를 들어 axios.get 등을 사용하여 데이터를 가져올 수 있음
            // 가져온 데이터를 setData로 설정
            axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/player/${id}`)
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error("Error fetching player data:", error);
                });
        }
    }, [isOpen, id]);

    console.log(data)

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            {/* <div className="bg-white p-4 rounded-lg shadow-lg max-h-screen overflow-y-auto"> */}
            <div className="container mx-auto p-6 max-h-screen overflow-y-auto">
                <div className="bg-black rounded-lg shadow-xl p-6">
                    <div className="flex justify-end">
                        <button onClick={onClose} className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex">
                        <div className="w-1/2">
                            <img
                                src="player2.png"
                                alt="Player"
                                className="object-cover w-auto h-auto rounded-lg shadow-xl"
                            />
                        </div>
                        <div className="w-1/2 mt-5 bg-black rounded-lg shadow-md ml-20">
                            <div className="flex items-center">
                                <h2 className="text-8xl font-semibold mb-2 text-white">1</h2>
                                <div className="ml-4 text-white">
                                    <p className="text-white font-semibold text-4xl mt-3">
                                        {data.map((player) => (
                                            <p>{player.name}</p>
                                        ))}
                                    </p>
                                    <p className="text-gray-500">
                                        {data.map((player) => (
                                            <p>{player.team}</p>
                                        ))}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 text-white">
                                    <p className="text-gray-500 font-semibold">
                                        생년월일
                                    </p>
                                    <p className="text-gray-500 font-semibold">
                                        체격
                                    </p>
                                    <p className="text-gray-500 font-semibold">
                                        출신학교
                                    </p>
                                    <p className="text-gray-500 font-semibold">
                                        주요경력
                                    </p>
                                </div>
                                <div className="ml-5">
                                    <p className="text-white font-semibold">
                                        2003.01.01
                                    </p>
                                    <p className="text-white font-semibold">
                                        180cm 80kg
                                    </p>
                                    <p className="text-white font-semibold">
                                        광주 진흥고
                                    </p>
                                    <p className="text-white font-semibold">
                                        2023 한화이글스 입단
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-white">2023 시즌</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-900 rounded-lg p-4">
                                <p className="text-white text-xl font-semibold mb-2">승리</p>
                                <p className="text-3xl text-blue-600">15</p>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4">
                                <p className="text-white text-xl font-semibold mb-2">패배</p>
                                <p className="text-3xl text-red-600">7</p>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4">
                                <p className="text-white text-xl font-semibold mb-2">방어율</p>
                                <p className="text-3xl text-green-600">2.85</p>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4">
                                <p className="text-white text-xl font-semibold mb-2">이닝</p>
                                <p className="text-3xl text-purple-600">180</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
}

export default Modal;
