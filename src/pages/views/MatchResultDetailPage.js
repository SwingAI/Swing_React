import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

import "../../components/MatchResultDetailPage.css";
import TeamNameChanger from "../../components/TeamNameChanger";
import TeamStatBarGraph from "../../components/TeamStatBarGraph";
import MatchResultBarGraph from "../../components/MatchResultBarGraph";
import MatchResultTable from "../../components/MatchResultTable";
import ScoreBox from "../../components/ScoreBox";
import MatchPlayers from "../../components/MatchPlayers";

function MatchResultDetailPage() {
    // 주소 파라미터에서 정보 추출
    let params = useParams();
    const date = params.date
    const stadium = params.stadium

    // 경기 정보 저장
    const [matchRes, setMatchRes] = useState([]);
    // 구단 정보 저장
    const [teamA, setTeamA] = useState([]);
    const [teamB, setTeamB] = useState([]);
    // AI 경기 예측 정보 저장
    const [preRes, setPreRes] = useState([]);

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
        const fetchMatchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_DATA_ADDRESS}/match/${date}/${stadium}`
                );
                setMatchRes(response.data[0]);
            } catch (e) {
                console.log(e);
            }
        }
        const fetchPreData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_DATA_ADDRESS}/matchPredict/${date}/${stadium}`
                );
                if(response.data.length !== 0)
                    setPreRes(response.data[0]);
                else
                    setPreRes([]);
            } catch (e) {
                console.log(e);
            }
        }
        fetchMatchData();
        fetchPreData();
    }, []);

    useEffect(() => {
        if (matchRes.length != 0) {
            // 경기에 참여한 구단 데이터 호출
            const fetchTeamAData = async () => {
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_DATA_ADDRESS}/team/${matchRes.match_teamA}`
                    );
                    setTeamA(response.data);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchTeamAData();
            const fetchTeamBData = async () => {
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_DATA_ADDRESS}/team/${matchRes.match_teamB}`
                    );
                    setTeamB(response.data);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchTeamBData();
        }
    }, [matchRes]);

    console.log(preRes)

    if (teamA.length===0||teamB.length===0) {
        return null;
    } else return (
        <div>
            <div className="h-auto bg-cover bg-fixed bg-center bg-no-repeat py-5" style={{ backgroundImage: 'url("/bgimg7.png")' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto mt-4 text-center">
                            <div className="py-2 card card-blog card-plain border border-gray-200 rounded-lg">
                                <div className="card-body px-0">
                                    <div className="flex flex-row justify-center items-center grid grid-cols-3 px-28 MRDteamLogo">
                                        <Link to={`/teaminfo/${teamA[0]['팀명']}`} style={{ textDecoration: 'none', color: 'inherit' }} className="flex flex-row-reverse gap-2 place-items-center justify-items-end">
                                            <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${teamA[0]['팀명']}/logo.png`} />
                                            <div className="text-end">
                                                <h4 className="font-medium mb-0">
                                                    {TeamNameChanger(matchRes.match_teamA)}
                                                </h4>
                                                <div className="text-sm">
                                                    <p className="text-sm inline tracking-tighter">{teamA[0]['승']}승 {teamA[0]['무']}무 {teamA[0]['패']}패 </p>
                                                    <p className="text-blue-500 font-semibold inline">{teamA[0]['#']}위</p>
                                                </div>
                                            </div>
                                        </Link>
                                        <div>
                                            {
                                                matchRes.is_done
                                                ? <div className="flex flex-row grid grid-cols-3 px-4">
                                                    <h3 className="flex-1 font-semibold">{matchRes.score_A}</h3>
                                                    <h3 className="flex-1 font-semibold">:</h3>
                                                    <h3 className="flex-1 font-semibold">{matchRes.score_B}</h3>
                                                </div>
                                                : <p>경기취소</p>
                                            }
                                        </div>
                                        <Link to={`/teaminfo/${teamB[0]['팀명']}`} style={{ textDecoration: 'none', color: 'inherit' }} className="flex flex-row gap-2 place-items-center">
                                            <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${teamB[0]['팀명']}/logo.png`} />
                                            <div className="text-start">
                                                <h4 className="font-medium mb-0">
                                                    {TeamNameChanger(matchRes.match_teamB)}
                                                </h4>
                                                <div className="text-sm">
                                                    <p className="text-blue-500 font-semibold inline">{teamB[0]['#']}위 </p>
                                                    <p className="text-sm inline tracking-tighter">{teamB[0]['승']}승 {teamB[0]['무']}무 {teamB[0]['패']}패</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <p className="text-sm mt-0 mb-0">{matchRes.match_stadium}</p>
                                        <p className="text-sm mt-0 mb-3">{matchRes.match_date} {matchRes.match_hour}</p>
                                    </div>
                                    {
                                        matchRes.is_done && matchRes.bat_A_TPA
                                        ? <>
                                            <ScoreBox data={matchRes}/>
                                            <MatchPlayers data={matchRes}/>
                                        </>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 mx-auto text-center mt-5">
                            <div className="py-2 card card-blog card-plain border border-gray-200 rounded-lg">
                                <div className="card-body px-0 pt-4">
                                    <div>
                                        <div className='mb-3'>
                                            <h5 className='text-lg text-start font-semibold antialiased ms-16'>기록비교</h5>
                                            <div className='flex flex-row grid grid-cols-3 justify-center items-center px-10'>
                                                <div className="flex flex-row-reverse">
                                                    <TeamStatBarGraph data={[
                                                        { "values": "ERA", "v": teamA[1].ERA / 10, "e": 1 - teamA[1].ERA / 10 },
                                                        { "values": "AVG", "v": teamA[0]['타율'], "e": 1 - teamA[0]['타율'] },
                                                        { "values": "WLP", "v": teamA[0]['승률'], "e": 1 - teamA[0]['승률'] },
                                                    ]} isLeft={true} />
                                                </div>
                                                <div className='flex flex-row grid grid-cols-3 justify-center items-center mx-2 pt-3 gap-4'>
                                                    <div className="text-end">
                                                        <p className='mb-2.5'>{teamA[0]['승률']}</p>
                                                        <p className='mb-2.5'>{teamA[0]['타율']}</p>
                                                        <p>{teamA[1].ERA}</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className='mb-2.5'>승률</p>
                                                        <p className='mb-2.5'>타율</p>
                                                        <p>평균자책</p>
                                                    </div>
                                                    <div className="text-start">
                                                        <p className='mb-2.5'>{teamB[0]['승률']}</p>
                                                        <p className='mb-2.5'>{teamB[0]['타율']}</p>
                                                        <p>{teamB[1].ERA}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <TeamStatBarGraph data={[
                                                        { "values": "ERA", "v": teamB[1].ERA / 10, "e": 1 - teamB[1].ERA / 10 },
                                                        { "values": "AVG", "v": teamB[0]['타율'], "e": 1 - teamB[0]['타율'] },
                                                        { "values": "WLP", "v": teamB[0]['승률'], "e": 1 - teamB[0]['승률'] },
                                                    ]} isLeft={false} />
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='mx-10 my-4' />
                                        <div>
                                            <div>   
                                                <h5 className='text-lg text-start font-semibold antialiased ms-16 mb-3'>Swing AI 승부예측</h5>
                                            </div>
                                            <div>
                                                {
                                                    preRes.length !== 0
                                                    ? <>
                                                        <div className="flex flex-row grid grid-cols-3 justify-center items-center px-28 mb-3 MRDteamLogo">
                                                            <div className="flex flex-row-reverse">
                                                                <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${teamA[0]['팀명']}/logo.png`}/>
                                                            </div>
                                                            <div className="flex flex-row grid grid-cols-3 px-4">
                                                                <h3 className="font-semibold">{preRes.pred_score_A}</h3>
                                                                <h3 className="font-semibold">:</h3>
                                                                <h3 className="font-semibold">{preRes.pred_score_B}</h3>
                                                            </div>
                                                            <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${teamB[0]['팀명']}/logo.png`} />
                                                        </div>
                                                        {
                                                            preRes.pred_score_A === preRes.pred_score_B
                                                            ? <p>Swing AI 분석 결과 이 경기는 두 구단이 비길 것으로 예측됐어요.</p>
                                                            : <p>Swing AI 분석 결과 이 경기는 {preRes.pred_score_A > preRes.pred_score_B ? preRes.match_teamA : preRes.match_teamB} 구단이 승리할 것으로 예측됐어요.</p>
                                                        }
                                                    </>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 mx-auto text-center mt-5 mb-4">
                            <div className="py-2 card card-blog card-plain border border-gray-200 rounded-lg teamLogo">
                                <div className="card-body px-0 pt-4">
                                    <div>
                                        <div>
                                            <h5 className='text-lg text-start font-semibold antialiased ms-16 mt-2 mb-2'>주요 경기기록</h5>
                                            {
                                                matchRes.is_done && matchRes.bat_A_TPA
                                                ? <div className='flex flex-row grid grid-cols-3 justify-center items-center px-32'>
                                                    <div className="flex flex-row-reverse">
                                                        <MatchResultBarGraph data={[
                                                            { "values": "E", "v": matchRes.def_A_E, "e": 20 - matchRes.def_A_E },
                                                            { "values": "DP", "v": matchRes.bat_A_GDP, "e": 20 - matchRes.bat_A_GDP },
                                                            { "values": "SO", "v": matchRes.bat_A_SO, "e": 20 - matchRes.bat_A_SO },
                                                            { "values": "HR", "v": matchRes.bat_A_HR, "e": 20 - matchRes.bat_A_HR },
                                                            { "values": "H", "v": matchRes.bat_A_H, "e": 20 - matchRes.bat_A_H },
                                                        ]} isLeft={true} />
                                                    </div>
                                                    <div>
                                                        <div className='flex flex-row grid grid-cols-3 justify-center items-center mx-3 pt-3 gap-4 px-2'>
                                                            <div className="text-end">
                                                                <p className='mb-2.5'>{matchRes.bat_A_H}</p>
                                                                <p className='mb-2.5'>{matchRes.bat_A_HR}</p>
                                                                <p className='mb-2.5'>{matchRes.bat_A_SO}</p>
                                                                <p className='mb-2.5'>{matchRes.bat_A_GDP}</p>
                                                                <p>{matchRes.def_A_E}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className='mb-2.5'>안타</p>
                                                                <p className='mb-2.5'>홈런</p>
                                                                <p className='mb-2.5'>삼진</p>
                                                                <p className='mb-2.5'>병살</p>
                                                                <p>실책</p>
                                                            </div>
                                                            <div className="text-start">
                                                                <p className='mb-2.5'>{matchRes.bat_B_H}</p>
                                                                <p className='mb-2.5'>{matchRes.bat_B_HR}</p>
                                                                <p className='mb-2.5'>{matchRes.bat_B_SO}</p>
                                                                <p className='mb-2.5'>{matchRes.bat_B_GDP}</p>
                                                                <p>{matchRes.def_B_E}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <MatchResultBarGraph data={[
                                                            { "values": "E", "v": matchRes.def_B_E, "e": 20 - matchRes.def_B_E },
                                                            { "values": "DP", "v": matchRes.bat_B_GDP, "e": 20 - matchRes.bat_B_GDP },
                                                            { "values": "SO", "v": matchRes.bat_B_SO, "e": 20 - matchRes.bat_B_SO },
                                                            { "values": "HR", "v": matchRes.bat_B_HR, "e": 20 - matchRes.bat_B_HR },
                                                            { "values": "H", "v": matchRes.bat_B_H, "e": 20 - matchRes.bat_B_H },
                                                        ]} isLeft={false} />
                                                    </div>
                                                </div>
                                                : <p className="mt-4 mb-4">경기 기록이 존재하지 않아요.</p>
                                            }
                                        </div>
                                        <div>
                                            {
                                                matchRes.is_done && matchRes.bat_A_TPA
                                                ? <>
                                                    <hr className='mx-10 my-4' />
                                                    <h5 className='text-lg text-start font-semibold antialiased ms-16 mt-4'>세부 경기기록</h5>
                                                    <MatchResultTable data={matchRes} team={'A'} />
                                                    <MatchResultTable data={matchRes} team={'B'} />
                                                </>
                                                : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchResultDetailPage;