import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import HorizontalBarChart from "../../components/HorizontalBar";
import PlayerCircle from "../../components/Rechart";
import Example from "../../components/SimpleBarChart";
import SimpleLineChart from "../../components/SimpleLineChart";
import HitterLineChart from "../../components/HitterLineChart";

function PlayerDetailPage() {
    const { playerId } = useParams();

    const [players, setPlayers] = useState([]); // 선수 데이터 배열 상태
    const [hitterdaters, setHitterDaters] = useState([]); // 선수 데이터 배열 상태
    const [pitcherdaters, setPitcherDaters] = useState([]);
    const [playerNew, setPlayerNews] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩창
    const [playerPredict, setPlayerPredict] = useState([]);

    const [showDiv, setShowDiv] = useState(false);
    // div가 처음 렌더링될 때 나타날 수 있도록 useEffect를 사용
    useEffect(() => {
        // 일정 시간 후에 div를 나타나게 설정 (예: 2초 후)
        const timer = setTimeout(() => {
            setShowDiv(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행


    useEffect(() => {
        // 외부 서버에서 선수 데이터를 가져오는 부분입니다.
        axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/player/${playerId}`)
            .then((response) => {
                setPlayers(response.data); // 선수 데이터를 상태에 저장
                setLoading(false); // 데이터를 성공적으로 받았을 때 로딩 상태를 false로 설정
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false); // 데이터를 받아오지 못한 경우에도 로딩 상태를 false로 설정
            });
    }, [playerId]);

    useEffect(() => {
        async function fetchHitterData() {
            try {
                const hitterResponse = await axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/player_bat_date/${players[0]?.선수명.replace(/\*/g, '')}`);
                setHitterDaters(hitterResponse.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if (players[0]?.선수명) {
            fetchHitterData();
        }
    }, [players]);

    useEffect(() => {
        async function fetchPitcherData() {
            try {
                const pitcherResponse = await axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/player_pitch_date/${players[0]?.선수명.replace(/\*/g, '')}`);
                setPitcherDaters(pitcherResponse.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if (players[0]?.선수명) {
            fetchPitcherData();
        }
    }, [players]);

    useEffect(() => {
        async function fetchNewPlayerData() {
            try {
                const pitcherResponse = await axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/playernew/${players[0]?.선수명.replace(/\*/g, '')}`);
                setPlayerNews(pitcherResponse.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if (players[0]?.선수명) {
            fetchNewPlayerData();
        }
    }, [players]);

    useEffect(()=>{
        async function fetchPlayerPredict() {
            try {
                const pitcherResponse = await axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/playerpredict/${players[0]?.선수명}`);
                setPlayerPredict(pitcherResponse.data[0]);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if (players[0]?.선수명) {
            fetchPlayerPredict();
        }
    }, [players])
    console.log(players, playerPredict)

    if (loading) {
        return (
            <div className="h-screen bg-cover bg-fixed bg-center bg-no-repeat" style={{ backgroundImage: 'url("/bgimg7_2.png")' }}>

            </div>
        );
    }

    // console.log(pitcherdaters)


    // isPit 값을 선수 데이터에서 가져온다고 가정
    const isPit = players[0]?.is_pit;

    const hitter_circle_data = [
        { name: '안타', value: players[0]?.안타 },
        { name: '홈런', value: players[0]?.홈런 },
        { name: '아웃', value: players[0]?.타석 - players[0]?.안타 - players[0]?.볼넷 },
        { name: '삼진', value: players[0]?.삼진 },
    ];

    const pitchers_circle_data = [
        { name: '승리', value: players[0]?.승 },
        { name: '패배', value: players[0]?.패 },
        { name: '홀드', value: players[0]?.홀 },
        { name: '세이브', value: players[0]?.세 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // console.log(players)

    const hitter_bar_data = [
        {
            name: '안타',
            리그평균: 76.5,
            선수기록: players[0]?.안타,
        },
        {
            name: '홈런',
            리그평균: 15.5,
            선수기록: players[0]?.홈런,
        },
        {
            name: '타점',
            리그평균: 50.5,
            선수기록: players[0]?.타점,
        },
        {
            name: '삼진',
            리그평균: 59,
            선수기록: players[0]?.삼진,
        },
        {
            name: '도루',
            리그평균: 1,
            선수기록: players[0]?.도루,
        },
    ];

    const pitchers_bar_data = [
        {
            name: 'ERA',
            리그평균: 4.555,
            선수기록: players[0]?.ERA,
        },
        {
            name: 'BABIP',
            리그평균: 0.306,
            선수기록: players[0]?.BABIP,
        },
        {
            name: '9이닝당볼넷',
            리그평균: 3.93,
            선수기록: players[0]['볼넷/9'],
        }, {
            name: '9이닝당삼진',
            리그평균: 8.13,
            선수기록: players[0]['삼진/9'],
        },
    ];

    const pitchers_line_data = [
        {
            name: pitcherdaters[4]?.매치일자.split('T')[0],
            피안타: pitcherdaters[4]?.안타,
            볼넷: pitcherdaters[4]?.볼넷,
            탈삼진: pitcherdaters[4]?.삼진,
            자책점: pitcherdaters[4]?.자책,
        },
        {
            name: pitcherdaters[3]?.매치일자.split('T')[0],
            피안타: pitcherdaters[3]?.안타,
            볼넷: pitcherdaters[3]?.볼넷,
            탈삼진: pitcherdaters[3]?.삼진,
            자책점: pitcherdaters[3]?.자책,
        },
        {
            name: pitcherdaters[2]?.매치일자.split('T')[0],
            피안타: pitcherdaters[2]?.안타,
            볼넷: pitcherdaters[2]?.볼넷,
            탈삼진: pitcherdaters[2]?.삼진,
            자책점: pitcherdaters[2]?.자책,
        },
        {
            name: pitcherdaters[1]?.매치일자.split('T')[0],
            피안타: pitcherdaters[1]?.안타,
            볼넷: pitcherdaters[1]?.볼넷,
            탈삼진: pitcherdaters[1]?.삼진,
            자책점: pitcherdaters[1]?.자책,
        },
        {
            name: pitcherdaters[0]?.매치일자.split('T')[0],
            피안타: pitcherdaters[0]?.안타,
            볼넷: pitcherdaters[0]?.볼넷,
            탈삼진: pitcherdaters[0]?.삼진,
            자책점: pitcherdaters[0]?.자책,
        },
    ];

    const hitter_line_data = [
        {
            name: hitterdaters[4]?.매치일자.split('T')[0],
            안타: hitterdaters[4]?.안타,
            홈런: hitterdaters[4]?.홈런,
            삼진: hitterdaters[4]?.삼진,
        },
        {
            name: hitterdaters[3]?.매치일자.split('T')[0],
            안타: hitterdaters[3]?.안타,
            홈런: hitterdaters[3]?.홈런,
            삼진: hitterdaters[3]?.삼진,
        },
        {
            name: hitterdaters[2]?.매치일자.split('T')[0],
            안타: hitterdaters[2]?.안타,
            홈런: hitterdaters[2]?.홈런,
            삼진: hitterdaters[2]?.삼진,
        },
        {
            name: hitterdaters[1]?.매치일자.split('T')[0],
            안타: hitterdaters[1]?.안타,
            홈런: hitterdaters[1]?.홈런,
            삼진: hitterdaters[1]?.삼진,
        },
        {
            name: hitterdaters[0]?.매치일자.split('T')[0],
            안타: hitterdaters[0]?.안타,
            홈런: hitterdaters[0]?.홈런,
            삼진: hitterdaters[0]?.삼진,
        },
    ];

    return (
        <div className="h-auto bg-cover bg-fixed bg-center bg-no-repeat" style={{ backgroundImage: 'url("/bgimg7_2.png")' }}>
            {isPit === 1 ? (
                <div>
                    <PitcherDetail players={players} playerNew={playerNew} dati={pitchers_bar_data} dato={pitchers_circle_data} COLORS={COLORS} linedata={pitchers_line_data} playerPredict={playerPredict} />
                </div>

            ) : (
                <div>
                    <BatterDetail players={players} playerNew={playerNew} dati={hitter_bar_data} dato={hitter_circle_data} COLORS={COLORS} linedata={hitter_line_data} playerPredict={playerPredict}/>
                </div>
            )}
        </div>
    );
}


function PitcherDetail({ players, playerNew, dato, dati, COLORS, linedata, playerPredict }) {
    // 투수에 대한 상세 정보 렌더링 로직을 구현 
    return (
        <div>
            <div className="container mx-auto p-6 min-w-1/2 min-h-1/2">
                <div>
                    <div className="flex justify-start my-auto">
                        <div>
                            <div className="flex items-center ml-10">
                                
                                <img
                                    src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${players[0]?.팀명}/logo.png`}
                                    style={{ width: '100px', height: '100px' }} // 원하는 크기로 설정
                                />
                                <h2 className="text-7xl font-semibold mt-3 text-white">{players.map((player) => (
                                    <p>{player.등번호}</p>
                                ))}</h2>

                                <div className="ml-4 text-white">
                                    <p className="text-white font-semibold text-4xl mt-3">
                                        {players.map((player) => (
                                            <p>{player.선수명.slice(0, 3)}</p>
                                        ))}
                                    </p>
                                    
                                    
                                    <p className="text-white">
                                        {players.map((player) => (
                                            <p>{player.팀명}</p>
                                        ))}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center ml-10">
                                <div className="ml-4 text-white">
                                    <p className="text-white font-semibold">
                                        {players.map((player) => (
                                            <p>{player.포지션}</p>
                                        ))}
                                    </p>
                                </div>
                                <div className="ml-4 text-white">
                                    <p className="text-white font-semibold">
                                        생년월일
                                    </p>
                                </div>
                                <div className="ml-5">
                                    <p className="text-white font-semibold">
                                        {players.map((player) => (
                                            <p>{new Date(player.생년월일).toISOString().split("T")[0]}</p>
                                        ))}
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mr-10">
                    <div className="w-[60%] mt-10 h-64"><SimpleLineChart data={linedata} /></div>
                    <div className="w-[60%] mt-10 h-64"><Example data={dati} /></div>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-white">2023 시즌</h2>
                <div className="mt-10">
                    <PitcherTabs players={players} playerPredict={playerPredict}/>
                </div>
            </div>
        </div>
    );
}

function BatterDetail({ players, playerNew, dato, dati, COLORS, linedata, playerPredict }) {
    // 타자에 대한 상세 정보 렌더링 로직을 구현
    return (
        <div>
            <div className="container mx-auto p-6 min-w-1/2 min-h-1/2">
                <div>
                    <div className="flex justify-start my-auto">
                        
                        <div className="w-1/3">
                            <div className="flex items-center ml-10">
                                <img
                                    src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${players[0]?.팀명}/logo.png`}
                                    style={{ width: '100px', height: '100px' }} // 원하는 크기로 설정
                                />

                                <h2 className="text-7xl font-semibold mt-3 text-white">{players.map((player) => (
                                    <p>{player.등번호}</p>
                                ))}</h2>

                                <div className="ml-4 text-white">
                                    <p className="text-white font-semibold text-4xl mt-3">
                                        {players.map((player) => (
                                            <p>{player.선수명.slice(0, 3)}</p>
                                        ))}
                                    </p>
                                    <p className="text-white">
                                        {players.map((player) => (
                                            <p>{player.팀명}</p>
                                        ))}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center ml-10">
                                <div className="ml-4 text-white">
                                    <p className="text-white font-semibold">
                                        {players.map((player) => (
                                            <p>{player.포지션}</p>
                                        ))}
                                    </p>
                                </div>
                                <div className="ml-4 text-white">
                                    <p className="text-white font-semibold">
                                        생년월일
                                    </p>
                                </div>
                                <div className="ml-5">
                                    <p className="text-white font-semibold">
                                        {players.map((player) => (
                                            <p>{new Date(player.생년월일).toISOString().split("T")[0]}</p>
                                        ))}
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mr-10">
                    <div className="w-[60%] mt-10 h-64"><HitterLineChart data={linedata} /></div>
                    <div className="w-[60%] mt-10 h-64"><Example data={dati} /></div>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-white">2023 시즌</h2>
                <div className="mt-10">
                    <HitterTabs players={players} playerNew={playerNew} playerPredict={playerPredict}/>
                </div>
            </div>
        </div>
    );
}

function HitterTabs({ players, playerNew, playerPredict }) {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab1")}>
                    <p className="text-white text-xl font-semibold mb-2">타율</p>
                    <p className="text-3xl text-blue-600">{players.map((player) => (
                        <p>{player.타율}</p>
                    ))}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab2")}>
                    <p className="text-white text-xl font-semibold mb-2">홈런</p>
                    <p className="text-3xl text-blue-600">{players.map((player) => (
                        <p>{player.홈런}</p>
                    ))}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab3")}>
                    <p className="text-white text-xl font-semibold mb-2">타점</p>
                    <p className="text-3xl text-blue-600">{players.map((player) => (
                        <p>{player.타점}</p>
                    ))}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab4")}>
                    <p className="text-white text-xl font-semibold mb-2">안타</p>
                    <p className="text-3xl text-blue-600">{players[0]?.안타}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab5")}>
                    <p className="text-white text-xl font-semibold mb-2">OPS</p>
                    <p className="text-3xl text-blue-600">{players[0]?.OPS}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab6")}>
                    <p className="text-white text-xl font-semibold mb-2">장타율</p>
                    <p className="text-3xl text-blue-600">{players[0]?.장타율}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab7")}>
                    <p className="text-white text-xl font-semibold mb-2">볼넷</p>
                    <p className="text-3xl text-blue-600">{players[0]?.볼넷}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab8")}>
                    <p className="text-white text-xl font-semibold mb-2">득점</p>
                    <p className="text-3xl text-blue-600">{players[0]?.득점}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab9")}>
                    <p className="text-white text-xl font-semibold mb-2">도루</p>
                    <p className="text-3xl text-blue-600">{players[0]?.도루}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab10")}>
                    <p className="text-white text-xl font-semibold mb-2">WRC+</p>
                    <p className="text-3xl text-blue-600">{playerNew[0]?.['wRC+']}</p>
                </div>
            </div>

            <div className="mt-4">
                {activeTab === "tab1" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">타율</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.타율*200} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players[0]?.타율}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 타율</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict?.타율 * 200} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{Number(playerPredict?.타율).toFixed(3)}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab2" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">홈런</p>
                            <div className="flex">
                            <HorizontalBarChart value={players[0]?.홈런} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{player.홈런}</p>
                                ))}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 홈런</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict?.홈런} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{Math.floor(playerPredict?.홈런)}</p>
                                ))}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab3" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">타점</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.타점} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{player.타점}</p>
                                ))}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 타점</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict?.타점} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{Math.floor(playerPredict?.타점)}</p>
                                ))}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab4" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">안타</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.안타*0.5} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players[0]?.안타}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 안타</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict?.안타*0.5} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{Math.floor(playerPredict?.안타)}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab5" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">OPS</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.OPS * 80} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players[0]?.OPS}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 OPS</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict?.OPS * 80} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{Number(playerPredict?.OPS).toFixed(3)}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab6" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">장타율</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.장타율 * 100} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players[0]?.장타율}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 장타율</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict?.장타율 * 100} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{Number(playerPredict?.장타율).toFixed(3)}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab7" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">볼넷</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.볼넷} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players[0]?.볼넷}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 볼넷</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict?.볼넷} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{Math.floor(playerPredict?.볼넷)}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab8" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">득점</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.득점} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players[0]?.득점}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 득점</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict?.득점} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{Math.floor(playerPredict?.득점)}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab9" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">도루</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.도루} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players[0]?.도루}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 도루</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict?.도루} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{Math.floor(playerPredict?.도루)}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab10" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">wRC+</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerNew[0]?.['wRC+'] - 50} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{playerNew[0]?.['wRC+']}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 wRC+</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerNew[0]?.['wRC+'] - 50} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{playerNew[0]?.['wRC+']}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}

function PitcherTabs({ players, playerPredict }) {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab1")}>
                    <p className="text-white text-xl font-semibold mb-2">WAR</p>
                    <p className="text-3xl text-blue-600">{players.map((player) => (
                        <p>{player.WAR}</p>
                    ))}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab2")}>
                    <p className="text-white text-xl font-semibold mb-2">방어율</p>
                    <p className="text-3xl text-blue-600">{players.map((player) => (
                        <p>{player.ERA}</p>
                    ))}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab5")}>
                    <p className="text-white text-xl font-semibold mb-2">승리</p>
                    <p className="text-3xl text-blue-600">{players.map((player) => (
                        <p>{player.승}</p>
                    ))}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab6")}>
                    <p className="text-white text-xl font-semibold mb-2">패배</p>
                    <p className="text-3xl text-blue-600">{players.map((player) => (
                        <p>{player.패}</p>
                    ))}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab7")}>
                    <p className="text-white text-xl font-semibold mb-2">홀드</p>
                    <p className="text-3xl text-blue-600">{players.map((player) => (
                        <p>{player.홀드}</p>
                    ))}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab8")}>
                    <p className="text-white text-xl font-semibold mb-2">세이브</p>
                    <p className="text-3xl text-blue-600">{players.map((player) => (
                        <p>{player.세}</p>
                    ))}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab3")}>
                    <p className="text-white text-xl font-semibold mb-2">삼진</p>
                    <p className="text-3xl text-blue-600">{players.map((player) => (
                        <p>{Math.floor(player['삼진/9'] / 9 * player.이닝)}</p>
                    ))}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4" onClick={() => handleTabClick("tab4")}>
                    <p className="text-white text-xl font-semibold mb-2">볼넷</p>
                    <p className="text-3xl text-blue-600">{players.map((player) => (
                        <p>{Math.floor(player['볼넷/9'] / 9 * player.이닝)}</p>
                    ))}</p>
                </div>
            </div>

            <div className="mt-4">
                {activeTab === "tab1" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">WAR</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.WAR * 15} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{player.WAR}</p>
                                ))}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 WAR</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict.WAR * 15} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{Number(playerPredict.WAR).toFixed(2)}</p>
                                ))}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab2" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">방어율</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.ERA * 15} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{player.ERA}</p>
                                ))}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 ERA</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict.ERA * 15} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{Number(playerPredict.ERA).toFixed(2)}</p>
                                ))}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab3" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">탈삼진</p>
                            <div className="flex">
                                <HorizontalBarChart value={(players[0]['삼진/9'] / 9 * players[0]['이닝']) / 2} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{Math.floor(player['삼진/9'] / 9 * player.이닝)}</p>
                                ))}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 탈삼진</p>
                            <div className="flex">
                                <HorizontalBarChart value={(playerPredict['삼진/9'] / 9 * players[0]['이닝']) / 2} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{Math.floor(Number(playerPredict['삼진/9']).toFixed(2) / 9 * player.이닝)}</p>
                                ))}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab4" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">볼넷</p>
                            <div className="flex">
                                <HorizontalBarChart value={(players[0]['볼넷/9'] / 9 * players[0]['이닝']) / 2} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{Math.floor(player['볼넷/9'] / 9 * player.이닝)}</p>
                                ))}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 볼넷</p>
                            <div className="flex">
                                <HorizontalBarChart value={(playerPredict['볼넷/9'] / 9 * players[0]['이닝']) / 2} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{Math.floor(Number(playerPredict['볼넷/9']).toFixed(2) / 9 * player.이닝)}</p>
                                ))}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab5" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">승리</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.승 * 5} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{player.승}</p>
                                ))}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 승리</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict.승 * 5} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{Math.floor(playerPredict.승)}</p>
                                ))}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab6" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">패배</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.패 * 5} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{player.패}</p>
                                ))}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 패배</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict.패 * 5} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{Math.floor(playerPredict.패)}</p>
                                ))}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab7" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">홀드</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.홀드 * 5} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{player.홀드}</p>
                                ))}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 홀드</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict.홀드 * 5} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{Math.floor(playerPredict.홀드)}</p>
                                ))}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "tab8" && (
                    <div className="rounded-md shadow-md">
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">세이브</p>
                            <div className="flex">
                                <HorizontalBarChart value={players[0]?.세 * 5} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{player.세}</p>
                                ))}</p>
                            </div>
                        </div>
                        <div className="mt-8 w-2/3">
                            <p className="text-blue-400 text-xl font-semibold mb-2">Swing AI 예상 세이브</p>
                            <div className="flex">
                                <HorizontalBarChart value={playerPredict.세 * 5} />
                                <p className="text-blue-400 text-xl font-semibold ml-5">{players.map((player) => (
                                    <p>{Math.floor(playerPredict.세)}</p>
                                ))}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}

export default PlayerDetailPage;
