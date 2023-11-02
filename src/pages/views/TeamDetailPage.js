import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import TeamPlayerList from '../../components/TeamPlayerList';
import MatchDatePicker from '../../components/MatchDatePicker';

import '../../components/TeamDetailPage.css';

function TeamDetailPage() {
    const [showDiv, setShowDiv] = useState(false);

    // div가 처음 렌더링될 때 나타날 수 있도록 useEffect를 사용
    useEffect(() => {
        // 일정 시간 후에 div를 나타나게 설정 (예: 2초 후)
        const timer = setTimeout(() => {
            setShowDiv(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

    // 주소 파라미터에서 구단 이름 추출
    let params = useParams();
    const teamName = params.team

    // 서버에서 구단 정보 호출
    const [hittingData, setHittingData] = useState([]);
    const [pitchingData, setPitchingData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_DATA_ADDRESS}/team/${teamName}`
                );
                setHittingData(response.data[0]);
                setPitchingData(response.data[1]);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex justify-center items-center h-auto bg-cover bg-fixed bg-center bg-no-repeat py-5" style={{ backgroundImage: 'url("/bgimg7.png")' }}>
            <div className={`container items-center ${showDiv ? 'opacity-100 scale-100' : 'opacity-0 scale-0 transform'} transition-opacity duration-1000 ease-in-out transition-transform duration-3000 ease-in-out`}>
                <div className="row">
                    <div className="col-lg-8 col-md-7 my-4 mx-auto flex bg-white rounded-lg p-4">
                        <div className="flex flex-row mx-3 my-2 TDPteamLogo">
                            <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${teamName}/logo.png`} />
                            <div className="ms-4 mt-4">
                                <p className="font-bold text-4xl">{hittingData["팀명"]}</p>
                                <div>
                                    <p className="text-blue-500 text-2xl font-semibold inline">{hittingData["#"]}등 </p>
                                    <p className="text-2xl inline tracking-tighter">{hittingData["승"]}승 {hittingData["무"]}무 {hittingData["패"]}패</p>
                                    <div>
                                        <p className="inline-block text-sm text-gray-600 me-2">승률 </p>
                                        <p className="inline-block text-md me-2">{hittingData["승률"]} </p>
                                        <p className="inline-block text-sm text-gray-600 me-2">기대승률</p>
                                        <p className="inline-block text-md">{hittingData["기대승률"]}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                    <div className="col-lg-8 col-md-7 my-4 mx-auto d-flex justify-content-center flex-column bg-white rounded-lg p-4">
                        <div className="mx-4 my-2">
                            <p className="font-bold text-2xl">경기 기록</p>
                            <div className="text-center">{MatchDatePicker(teamName)}</div>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-7 my-4 mx-auto d-flex justify-content-center flex-column bg-white rounded-lg p-4">
                        <div className="mx-4 my-3">
                            <p className="font-bold text-2xl">시즌 투구기록</p>
                            <div className="mt-4 flex justify-center items-center" style={{ justifyContent: 'space-around' }}>
                                <div className="text-center">
                                    <h2 className="mb-2 font-medium">{pitchingData.ERA}</h2>
                                    <p className="lead">평균자책</p>
                                </div>
                                <div className="text-center">
                                    <h2 className="mb-2 font-medium">{pitchingData["삼진%"]}%</h2>
                                    <p className="lead">삼진비율</p>
                                </div>
                            </div>
                            <div className="mt-4 px-4 flex row justify-center items-center">
                                <p>기타 투구지표</p>
                                <table className="border rounded-lg">
                                    <thead>
                                        <tr className="bg-blue-400 text-white text-center text-sm">
                                            <th className="">BABIP</th>
                                            <th className="">FIP</th>
                                            <th className="">LOB%</th>
                                            <th className="">RA/G</th>
                                            <th className="">RA9-WAR</th>
                                            <th className="">WAR</th>
                                            <th className="">kFIP</th>
                                            <th className="">볼넷%</th>
                                            <th className="">실점</th>
                                            <th className="">자책</th>
                                            <th className="">피홈런</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='text-center text-sm'>
                                            <td>{pitchingData.BABIP}</td>
                                            <td>{pitchingData.FIP}</td>
                                            <td>{pitchingData["LOB%"]}</td>
                                            <td>{pitchingData["RA/G"]}</td>
                                            <td>{pitchingData["RA9-WAR"]}</td>
                                            <td>{pitchingData.WAR}</td>
                                            <td>{pitchingData.kFIP}</td>
                                            <td>{pitchingData["볼넷%"]}</td>
                                            <td>{pitchingData["실점"]}</td>
                                            <td>{pitchingData["자책"]}</td>
                                            <td>{pitchingData["피홈런"]}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-7 my-4 mx-auto d-flex justify-content-center flex-column bg-white rounded-lg p-4">
                        <div className="mx-4 my-3">
                            <p className="font-bold text-2xl">시즌 타격기록</p>
                            <div>
                                <div className="mt-4 flex justify-center items-center" style={{ justifyContent: 'space-around' }}>
                                    <div className="text-center">
                                        <h2 className="mb-2 font-medium">{hittingData["득점"]}</h2>
                                        <p className="lead">득점</p>
                                    </div>
                                    <div className="text-center">
                                        <h2 className="mb-2 font-medium">{hittingData["홈런"]}</h2>
                                        <p className="lead">홈런</p>
                                    </div>
                                    <div className="text-center">
                                        <h2 className="mb-2 font-medium">{hittingData["도루"]}</h2>
                                        <p className="lead">도루</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-center items-center" style={{ justifyContent: 'space-around' }}>
                                    <div className="text-center">
                                        <h2 className="mb-2 font-medium">{hittingData["장타율"]}</h2>
                                        <p className="lead">장타율</p>
                                    </div>
                                    <div className="text-center">
                                        <h2 className="mb-2 font-medium">{hittingData["출루율"]}</h2>
                                        <p className="lead">출루율</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 px-4 flex row justify-center items-center">
                                <p>기타 타격지표</p>
                                <table className="border rounded-lg">
                                    <thead>
                                        <tr className="bg-blue-400 text-white text-center text-sm">
                                            <th className="">BABIP</th>
                                            <th className="">OPS</th>
                                            <th className="">R/G</th>
                                            <th className="">WAR</th>
                                            <th className="">wOBA</th>
                                            <th className="">볼넷%</th>
                                            <th className="">삼진%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='text-center text-sm'>
                                            <td>{hittingData.BABIP}</td>
                                            <td>{hittingData.OPS}</td>
                                            <td>{hittingData["R/G"]}</td>
                                            <td>{hittingData.WAR}</td>
                                            <td>{hittingData.wOBA}</td>
                                            <td>{hittingData["볼넷%"]}</td>
                                            <td>{hittingData["삼진%"]}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7 my-4 mx-auto d-flex justify-content-center flex-column bg-white rounded-lg p-4">
                        <div className="mx-4 my-3">
                            <p className="font-bold text-2xl">선수</p>
                            <TeamPlayerList team={teamName}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamDetailPage;