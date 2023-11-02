import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerInfocard from "../../components/PlayerInfoCard";
import HorizontalBarChart from "../../components/HorizontalBar";
import HorizontalBarChart2 from "../../components/HorizontalBar2";
import HexaRadarChart from "../../components/HexaRadarChart";

function CompareHitter() {
    const [players, setPlayers] = useState([]); // 선수 데이터 배열 상태
    const [firstdetailplayers, setfirstDetailPlayers] = useState([]);
    const [seconddetailplayers, setsecondDetailPlayers] = useState([]);
    const [selectedTeam1, setSelectedTeam1] = useState(""); // 왼쪽 팀 상태
    const [selectedTeam2, setSelectedTeam2] = useState(""); // 오른쪽 팀 상태
    const [selectedPlayerId1, setSelectedPlayerId1] = useState(""); // 왼쪽 선수의 id 상태
    const [selectedPlayerId2, setSelectedPlayerId2] = useState(""); // 오른쪽 선수의 id 상태

    useEffect(() => {
        // 외부 서버에서 선수 데이터를 가져오는 부분입니다.
        axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/allplayer/0`).then((response) => {
            setPlayers(response.data); // 선수 데이터를 상태에 저장
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

    console.log(firstdetailplayers)



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
            subject: "컨택",
            "A": players[selectedPlayerId1 - 1]?.타율 * 250,
            "B": players[selectedPlayerId2 - 1]?.타율 * 250,
        },
        {
            subject: "파워",
            "A": parseInt(players[selectedPlayerId1 - 1]?.장타율 * 200),
            "B": parseInt(players[selectedPlayerId2 - 1]?.장타율 * 200),
        },
        {
            subject: "출루",
            "A": parseInt(players[selectedPlayerId1 - 1]?.출루율 * 180),
            "B": parseInt(players[selectedPlayerId2 - 1]?.출루율 * 180),
        },
        {
            subject: "주력",
            "A": players[selectedPlayerId1 - 1]?.도루 <= 10 ? players[selectedPlayerId1 - 1]?.도루 * 20 : (players[selectedPlayerId1 - 1]?.도루 <= 15 ? players[selectedPlayerId1 - 1]?.도루 * 10 : players[selectedPlayerId1 - 1]?.도루 * 5),
            "B": players[selectedPlayerId2 - 1]?.도루 <= 10 ? players[selectedPlayerId2 - 1]?.도루 * 20 : (players[selectedPlayerId2 - 1]?.도루 <= 15 ? players[selectedPlayerId2 - 1]?.도루 * 10 : players[selectedPlayerId2 - 1]?.도루 * 5),
        },
        {
            subject: "선구안",
            "A": (parseInt(players[selectedPlayerId1 - 1]?.볼넷) / parseInt(players[selectedPlayerId1 - 1]?.삼진)) * 100,
            "B": (parseInt(players[selectedPlayerId2 - 1]?.볼넷) / parseInt(players[selectedPlayerId2 - 1]?.삼진)) * 100,
        },
        {
            subject: "장타력",
            "A": players[selectedPlayerId1 - 1]?.장타율 * 200,
            "B": players[selectedPlayerId2 - 1]?.장타율 * 200,
        },

    ];

    return (
        <div className="h-auto bg-cover bg-fixed bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: 'url("/bgimg7_2.png")' }}>
            <div className="container mx-auto">
                <div className="flex items-start">
                    <div className="flex w-full">
                        {/* Left Player Photo */}
                        <div className="w-1/3 p-4 items-center justify-center">
                            <PlayerInfocard id={selectedPlayerId1} name={players[selectedPlayerId1 - 1]?.선수명} team={players[selectedPlayerId1 - 1]?.팀명} />
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
                                <HexaRadarChart data={data} player1={players[selectedPlayerId1 - 1]?.선수명} player2={players[selectedPlayerId2 - 1]?.선수명} />
                            </div>
                        </div>


                        {/* Right Player Photo */}
                        <div className="w-1/3 p-4 items-center justify-center">
                            <PlayerInfocard id={selectedPlayerId2} name={players[selectedPlayerId2 - 1]?.선수명} team={players[selectedPlayerId2 - 1]?.팀명} />
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
                        <p className="text-white text-xl font-semibold mb-2">타율</p>
                        <p className="text-3xl text-blue-600">
                            {players[selectedPlayerId1 - 1]?.타율}
                        </p>
                    </div>
                    <HorizontalBarChart value={players[selectedPlayerId1 - 1]?.타율 * 200} />
                    <HorizontalBarChart2 value={100 - players[selectedPlayerId2 - 1]?.타율 * 200} />
                    <div className="bg-gray-900 rounded-lg p-4">
                        <p className="text-white text-xl font-semibold mb-2">타율</p>
                        <p className="text-3xl text-blue-600">
                            {players[selectedPlayerId2 - 1]?.타율}
                        </p>
                    </div>
                </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">wRC+</p>
                            <p className="text-3xl text-blue-600">
                                {firstdetailplayers[0]?.['wRC+']}
                            </p>
                        </div>
                        <HorizontalBarChart value={firstdetailplayers[0]?.['wRC+']-50} />
                        <HorizontalBarChart2 value={100 - (seconddetailplayers[0]?.['wRC+']-50 )} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">wRC+</p>
                            <p className="text-3xl text-blue-600">
                                {seconddetailplayers[0]?.['wRC+']}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">OPS</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 1]?.OPS}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 1]?.OPS * 70} />
                        <HorizontalBarChart2 value={100 - players[selectedPlayerId2 - 1]?.OPS * 70} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">OPS</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 1]?.OPS}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">WAR</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 1]?.WAR}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 1]?.WAR * 15} />
                        <HorizontalBarChart2 value={100 - players[selectedPlayerId2 - 1]?.WAR * 15} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">WAR</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 1]?.WAR}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">장타율</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 1]?.장타율}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 1]?.장타율 * 100} />
                        <HorizontalBarChart2 value={100 - players[selectedPlayerId2 - 1]?.장타율 * 100} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">장타율</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 1]?.장타율}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">출루율</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 1]?.출루율}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 1]?.출루율 * 100} />
                        <HorizontalBarChart2 value={100 - players[selectedPlayerId2 - 1]?.출루율 * 100} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">출루율</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 1]?.출루율}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">홈런</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 1]?.홈런}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 1]?.홈런 * 2} />
                        <HorizontalBarChart2 value={100 - players[selectedPlayerId2 - 1]?.홈런 * 2} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">홈런</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 1]?.홈런}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">타점</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 1]?.타점}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 1]?.타점} />
                        <HorizontalBarChart2 value={100 - players[selectedPlayerId2 - 1]?.타점} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">타점</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 1]?.타점}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center grid grid-cols-4 gap-4 mb-2">
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">안타</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId1 - 1]?.안타}
                            </p>
                        </div>
                        <HorizontalBarChart value={players[selectedPlayerId1 - 1]?.안타 / 3} />
                        <HorizontalBarChart2 value={100 - players[selectedPlayerId2 - 1]?.안타 / 3} />
                        <div className="bg-gray-900 rounded-lg p-4">
                            <p className="text-white text-xl font-semibold mb-2">안타</p>
                            <p className="text-3xl text-blue-600">
                                {players[selectedPlayerId2 - 1]?.안타}
                            </p>
                        </div>
                    </div>

                </div>)}
                {/* 스탯이 보여지는 부분 */}
            </div>
        </div>
    );
}

export default CompareHitter;