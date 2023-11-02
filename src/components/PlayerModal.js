import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerCircle from "./Rechart";
import { Link } from "react-router-dom";

function PlayerModal({ id, isOpen, onClose }) {
    const [data, setData] = useState([]); // 데이터 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부 상태


    useEffect(() => {
        // 데이터 가져오는 로직
        axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/player/${id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching player data:", error);
            });
    }, [id]);

    console.log(data)

    // const dato = [
    //     { name: '안타', value: data[0]?.안타 },
    //     { name: '홈런', value: data[0]?.홈런 },
    //     { name: '아웃', value: data[0]?.타석 - data[0]?.안타 - data[0]?.볼넷 },
    //     { name: '삼진', value: data[0]?.삼진 },
    // ];

    const dato = [
        { name: '볼넷', value: data[0]?.볼넷 },
        { name: '삼진', value: data[0]?.삼진 },
    ];

    const pitchers_circle_data = [
        { name: '승리', value: data[0]?.승 },
        { name: '패배', value: data[0]?.패 },
        { name: '홀드', value: data[0]?.홀 },
        { name: '세이브', value: data[0]?.세 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    if (!isOpen) return null;

    console.log(data[0]?.isP)
    const isPit = data[0]?.is_pit

    return (
        <div>
            {isPit === 0 ? (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    {/* <div className="bg-white p-4 rounded-lg shadow-lg max-h-screen overflow-y-auto"> */}
                    <div className="flex items-center justify-center container mx-auto p-6 max-h-screen overflow-y-auto">
                        <div className="w-2/3 bg-black rounded-lg shadow-xl p-6">
                            <div className="flex justify-end">
                                <button onClick={onClose} className="text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 flex items-center justify-center">
                                    <img src={`https://github.com/coreswing/swingimages/blob/main/${data[0]?.팀명}/${data[0]?.선수명.replace(/\*/g, '')}.png?raw=true`} alt="Player" onError={(e) => {
                                        e.target.src = `https://raw.githubusercontent.com/coreswing/swingimages/main/noimg.png`; // 기본 이미지 경로로 변경해주세요
                                    }} />
                                </div>

                                <div className="w-1/2  bg-black ml-5">
                                    <div className="flex items-center">
                                        <h2 className="text-8xl font-semibold mb-3 text-white mt-4">
                                            {data[0]?.등번호}
                                        </h2>
                                        <div className="ml-4 mt-3 text-white">
                                            <p className="text-white font-semibold text-4xl mt-3">
                                                {data[0]?.선수명}
                                            </p>
                                            <p className="text-gray-500">
                                                {data[0]?.팀명}
                                            </p>
                                        </div>
                                        <div className="ml-4 mb-4"><Link to={`/playerdetail/${id}`} className="text-sm font-semibold leading-6 text-gray-900 NavbarMenu" style={{ textDecoration: 'none' }}>
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                                상세 정보
                                            </button>
                                        </Link> </div>
                                    </div>
                                    <div className="flex">
                                        <img src={`${process.env.PUBLIC_URL}/ico_player_pitcher.png`} className="w-20 h-20"/>
                                        <div>
                                            <p className="ml-4 text-white font-semibold text-3xl">
                                                {data[0]?.포지션}
                                            </p>
                                            <p className="ml-4 flex text-white text-xl">
                                                {data[0]?.투수}&nbsp;
                                                {data[0]?.타격}
                                            </p>
                                        </div>
                                    </div>


                                    <div className="flex items-center">
                                        <div className="ml-4 text-white">
                                            <p className="text-gray-500 font-semibold">
                                                생년월일
                                            </p>
                                            {/* <p className="text-gray-500 font-semibold">
                                            체격
                                        </p> */}
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-white font-semibold">
                                                {data[0]?.생년월일.split("T")[0]}
                                            </p>
                                            {/* <p className="text-white font-semibold">
                                            180cm 80kg
                                        </p> */}
                                        </div>
                                    </div>
                                    <div className="mr-10 mt-5">
                                        <PlayerCircle data={dato} COLORS={COLORS} />
                                    </div>
                                </div>
                            </div>
                            {/* <Link to="/players/1">페이지 이동</Link> */}


                            <div className="mt-8 text-start">
                                <h2 className="text-2xl font-semibold mb-4 text-white">2023 시즌</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">WAR</p>
                                        <p className="text-3xl text-blue-600">{data[0]?.WAR}</p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">타율</p>
                                        <p className="text-3xl text-blue-600">{data[0]?.타율}</p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">홈런</p>
                                        <p className="text-3xl text-blue-600">{data[0]?.홈런}</p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">안타</p>
                                        <p className="text-3xl text-blue-600">{data[0]?.안타}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            ) : (
                <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
                    {/* <div className="bg-white p-4 rounded-lg shadow-lg max-h-screen overflow-y-auto"> */}
                    <div className="flex items-center justify-center container mx-auto p-6 max-h-screen overflow-y-auto">
                        <div className="w-2/3 bg-black rounded-lg shadow-xl p-6">
                            <div className="flex justify-end">
                                <button onClick={onClose} className="text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 flex items-center justify-center">
                                    <img src={`https://github.com/coreswing/swingimages/blob/main/${data[0]?.팀명}/${data[0]?.선수명.replace(/\*/g, '')}.png?raw=true`} alt="Player" onError={(e) => {
                                        e.target.src = `https://raw.githubusercontent.com/coreswing/swingimages/main/noimg.png`; // 기본 이미지 경로로 변경해주세요
                                    }} />
                                </div>

                                <div className="w-1/2  bg-black ml-5">
                                    <div className="flex items-center">
                                        <h2 className="text-8xl font-semibold mb-3 text-white mt-4">
                                            {data[0]?.등번호}
                                        </h2>
                                        <div className="ml-4 mt-3  text-white">
                                            <p className="text-white font-semibold text-4xl mt-3">
                                                {data[0]?.선수명}
                                            </p>
                                            <p className="text-gray-500">
                                                {data[0]?.팀명}
                                            </p>
                                        </div>
                                        <div className="ml-4 mb-4"><Link to={`/playerdetail/${id}`} className="text-sm font-semibold leading-6 text-gray-900 NavbarMenu" style={{ textDecoration: 'none' }}>
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                                상세 정보
                                            </button>
                                        </Link> </div>
                                    </div>
                                    <div className="flex">
                                        <img src={`${process.env.PUBLIC_URL}/ico_player_pitcher.png`} className="w-20 h-20"/>
                                        <div>
                                            <p className="ml-4 text-white font-semibold text-3xl">
                                                {data[0]?.포지션}
                                            </p>
                                            <p className="ml-4 flex text-white text-xl">
                                                {data[0]?.투수}&nbsp;
                                                {data[0]?.타격}
                                            </p>
                                        </div>
                                    </div>


                                    <div className="flex items-center">
                                        <div className="ml-4 text-white">
                                            <p className="text-gray-500 font-semibold">
                                                생년월일
                                            </p>
                                            {/* <p className="text-gray-500 font-semibold">
                                        체격
                                    </p> */}
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-white font-semibold">
                                                {data[0]?.생년월일.split("T")[0]}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mr-10 mt-5">
                                        <PlayerCircle data={pitchers_circle_data} COLORS={COLORS} />
                                    </div>
                                </div>
                            </div>
                            {/* <Link to="/players/1">페이지 이동</Link> */}


                            <div className="mt-8 text-start">
                                <h2 className="text-2xl font-semibold mb-4 text-white">2023 시즌</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">WAR</p>
                                        <p className="text-3xl text-blue-600">{data[0]?.WAR}</p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">방어율</p>
                                        <p className="text-3xl text-blue-600">{data[0]?.ERA}</p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">승리</p>
                                        <p className="text-3xl text-blue-600">{data[0]?.승}</p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">패배</p>
                                        <p className="text-3xl text-blue-600">{data[0]?.패}</p>
                                    </div>
                                    {/* <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">홀드</p>
                                        <p className="text-3xl text-blue-600">{data[0]?.홀드}</p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-white text-xl font-semibold mb-2">세이브</p>
                                        <p className="text-3xl text-blue-600">{data[0]?.세}</p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            )}
        </div>
    );
}



export default PlayerModal;
