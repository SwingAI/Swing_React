import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerInfocard from "../../components/PlayerInfoCard";
import HorizontalBarChart from "../../components/HorizontalBar";
import HorizontalBarChart2 from "../../components/HorizontalBar2";
import HexaRadarChart from "../../components/HexaRadarChart";

function ComparePitcher() {
    const [players, setPlayers] = useState([]); // 선수 데이터 배열 상태
    const [firstdetailplayers, setfirstDetailPlayers] = useState([]);
    const [seconddetailplayers, setsecondDetailPlayers] = useState([]);
    const [selectedTeam1, setSelectedTeam1] = useState(""); // 왼쪽 팀 상태
    const [selectedTeam2, setSelectedTeam2] = useState(""); // 오른쪽 팀 상태
    const [selectedPlayerId1, setSelectedPlayerId1] = useState(""); // 왼쪽 선수의 id 상태
    const [selectedPlayerId2, setSelectedPlayerId2] = useState(""); // 오른쪽 선수의 id 상태

    useEffect(() => {
        // 외부 서버에서 선수 데이터를 가져오는 부분입니다.
        axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/allplayer/1`)
            .then((response) => {
                setPlayers(response.data); // 선수 데이터를 상태에 저장
                console.log(response.data); // 데이터 출력 또는 원하는 작업 수행
            })
            .catch((error) => {
                console.error("Error fetching player data:", error);
            });
    }, []);

    useEffect(() => {
        async function fetchDetailPlayerData() {
            try {
                const detailplayersResponse = await axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/playernew/${players[selectedPlayerId1 - 1]?.선수명.replace(/\*/g, '')}`);
                setfirstDetailPlayers(detailplayersResponse.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if (players[selectedPlayerId1 - 1]?.선수명) {
            fetchDetailPlayerData();
        }
    }, [players[selectedPlayerId1 - 1]?.선수명]);

    useEffect(() => {
        async function fetchDetailPlayerData() {
            try {
                const detailplayersResponse = await axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/playernew/${players[selectedPlayerId2 - 1]?.선수명.replace(/\*/g, '')}`);
                setsecondDetailPlayers(detailplayersResponse.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if (players[selectedPlayerId2 - 1]?.선수명) {
            fetchDetailPlayerData();
        }
    }, [players[selectedPlayerId2 - 1]?.선수명]);
    

    console.log(players)

    // 왼쪽 선수의 id를 업데이트
    const handlePlayerSelection1 = (id) => {
        setSelectedPlayerId1(id);
    };

    // 오른쪽 선수의 id를 업데이트
    const handlePlayerSelection2 = (id) => {
        setSelectedPlayerId2(id);
    };

    // 팀 선택 시 해당 팀의 선수만 출력
    const handleTeamSelection1 = (team) => {
        setSelectedTeam1(team);
        setSelectedPlayerId1("");
    };

    const handleTeamSelection2 = (team) => {
        setSelectedTeam2(team);
        setSelectedPlayerId2("");
    };

    const filteredPlayers1 = players.filter(player => player.팀명 === selectedTeam1);
    const filteredPlayers2 = players.filter(player => player.팀명 === selectedTeam2);

    const data = [
        {
            subject: "행운",
            "A": players[selectedPlayerId1 - 287]?.BABIP * 300,
            "B": players[selectedPlayerId2 - 287]?.BABIP * 300,
        },
        {
            subject: "탈삼진",
            "A":  players[selectedPlayerId1 - 287]?.['삼진/9'] * 14,
            "B":  players[selectedPlayerId2 - 287]?.['삼진/9'] * 14,
        },
        {
            subject: "제구력",
            "A": 1 / (players[selectedPlayerId1 - 287]?.['볼넷/9'] ) * 200,
            "B": 1 / (players[selectedPlayerId2 - 287]?.['볼넷/9'] ) * 200, 
        },
        {
            subject: "스태미너",
            "A": players[selectedPlayerId1 - 287]?.이닝-30,
            "B": players[selectedPlayerId2 - 287]?.이닝-30,
        },
        {
            subject: "위기관리",
            "A":  players[selectedPlayerId1 - 287]?.['LOB%'] ,
            "B":  players[selectedPlayerId2 - 287]?.['LOB%'] ,
        },
        {
            subject: "장타 면역",
            "A": 1 / (players[selectedPlayerId1 - 287]?.['홈런/9']) * 30,
            "B": 1 / (players[selectedPlayerId2 - 287]?.['홈런/9']) * 30,
        },
    ];

    return (
        <div className="h-auto bg-cover bg-fixed bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: 'url("/bgimg7_2.png")' }}>
            <div className="container mx-auto">
                <div className="flex items-start">
                    <div className="flex w-full">
                        {/* Left Player Photo */}
                        <div className="w-1/3 p-4 items-center justify-center">
                            <PlayerInfocard id={selectedPlayerId1} name={players[selectedPlayerId1 - 287]?.선수명} team={players[selectedPlayerId1 - 287]?.팀명} />
                            {/* Select box for left team */}
                            <select
                                className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => handleTeamSelection1(e.target.value)}
                            >
                                <option value="">Select a team</option>
                                {Array.from(new Set(players.map(player => player.팀명))).map((team, index) => (
                                    <option key={index} value={team}>
                                        {team}
                                    </option>
                                ))}
                            </select>
                            {/* Select box for left player */}
                            <select
                                className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => handlePlayerSelection1(e.target.value)}
                            >
                                <option value="">Select a player</option>
                                {filteredPlayers1.map((player) => (
                                    <option key={player["#"]} value={player["#"]}>
                                        {player.선수명}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Center Graph */}
                        <div className="justify center w-2/3 p-4">
                            <div className="h-96">
                                {/* <CompareGraph data={data} /> */}
                                <HexaRadarChart data={data} player1={players[selectedPlayerId1 - 287]?.선수명} player2={players[selectedPlayerId2 - 287]?.선수명} />
                            </div>
                        </div>


                        {/* Right Player Photo */}
                        <div className="w-1/3 p-4 items-center justify-center">
                            <PlayerInfocard id={selectedPlayerId2} name={players[selectedPlayerId2 - 287]?.선수명} team={players[selectedPlayerId2 - 287]?.팀명} />
                            {/* Select box for right team */}
                            <select
                                className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => handleTeamSelection2(e.target.value)}>
                                <option value="">Select a team</option>
                                {Array.from(new Set(players.map(player => player.팀명))).map((team, index) => (
                                    <option key={index} value={team}>
                                        {team}
                                    </option>
                                ))}
                            </select>
                            {/* Select box for right player */}
                            <select className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => handlePlayerSelection2(e.target.value)}>
                                <option value="">Select a player</option>
                                {filteredPlayers2.map((player) => (
                                    <option key={player["#"]} value={player["#"]}>
                                        {player.선수명}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {selectedPlayerId1 && selectedPlayerId2 && (<div><div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                    <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-white text-xl font-semibold mb-2">WAR</p>
                        <p className="text-3xl text-blue-600">
                            {players[selectedPlayerId1 - 287]?.WAR}
                        </p>
                    </div>
                    <HorizontalBarChart value={players[selectedPlayerId1 - 287]?.WAR * 10} />
                    <HorizontalBarChart2 value={100 - (players[selectedPlayerId2 - 287]?.WAR * 10)} />
                    <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-white text-xl font-semibold mb-2">WAR</p>
                        <p className="text-3xl text-blue-600">
                            {players[selectedPlayerId2 - 287]?.WAR}
                        </p>
                    </div>
                </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">방어율</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 287]?.ERA}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 287]?.ERA * 10} />
                        <HorizontalBarChart2 value={100 - (players[selectedPlayerId2 - 287]?.ERA * 10)} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">방어율</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 287]?.ERA}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">승리</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 287]?.승}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 287]?.승 * 7} />
                        <HorizontalBarChart2 value={100 - (players[selectedPlayerId2 - 287]?.승 * 7)} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">승</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 287]?.승}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">패배</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 287]?.패}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 287]?.패 * 7} />
                        <HorizontalBarChart2 value={100 - (players[selectedPlayerId2 - 287]?.패 * 7)} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">패배</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 287]?.패}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">세이브</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 287]?.세}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 287]?.세 * 5} />
                        <HorizontalBarChart2 value={100 - (players[selectedPlayerId2 - 287]?.세 * 5)} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">세이브</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 287]?.세}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">홀드</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 287]?.홀드}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 287]?.홀드 * 5} />
                        <HorizontalBarChart2 value={100 - (players[selectedPlayerId2 - 287]?.홀드 * 5)} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">홀드</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 287]?.홀드}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">삼진/9이닝</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 287]['삼진/9']}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 287]['삼진/9'] * 9} />
                        <HorizontalBarChart2 value={100 - (players[selectedPlayerId2 - 287]['삼진/9'] * 9)} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">삼진/9이닝</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 287]['삼진/9']}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">볼넷/9이닝</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 287]['볼넷/9']}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 287]['볼넷/9'] * 9} />
                        <HorizontalBarChart2 value={100 - (players[selectedPlayerId2 - 287]['볼넷/9'] * 9)} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">볼넷/9이닝</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 287]['볼넷/9']}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">홈런/9이닝</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 287]['홈런/9']}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 287]['홈런/9'] * 100} />
                        <HorizontalBarChart2 value={100 - (players[selectedPlayerId2 - 287]['홈런/9'] * 100)} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">홈런/9이닝</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 287]['홈런/9']}
                            </p>
                        </div>
                    </div>
            

                </div>)}
                {/* 스탯이 보여지는 부분 */}

            </div>
        </div>
    );
}

export default ComparePitcher;