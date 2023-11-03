import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerInfocard from "../../components/PlayerInfoCard";
import Modal from 'react-modal'; // Import react-modal
import PredictModal from "../../components/PredictModal";

Modal.setAppElement('#root'); // Set app root element for modal

function BattervsPitcher() {
    const [pitchers, setPitchers] = useState([]); // 선수 데이터 배열 상태
    const [hitters, setHitters] = useState([]); // 선수 데이터 배열 상태
    const [selectedTeam1, setSelectedTeam1] = useState(""); // 왼쪽 팀 상태
    const [selectedTeam2, setSelectedTeam2] = useState(""); // 오른쪽 팀 상태
    const [selectedPlayerId1, setSelectedPlayerId1] = useState(""); // 왼쪽 선수의 id 상태
    const [selectedPlayerId2, setSelectedPlayerId2] = useState(""); // 오른쪽 선수의 id 상태
    const [results, setResults] = useState([]); // 선수 데이터 배열 상태
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/allplayer/1`).then((response) => {
            setPitchers(response.data); // 선수 데이터를 상태에 저장
        });
    }, []);

    useEffect(() => {
        // 외부 서버에서 선수 데이터를 가져오는 부분입니다.
        axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/allplayer/0`).then((response) => {
            setHitters(response.data); // 선수 데이터를 상태에 저장
        });
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto"; // 스크롤 허용
      };

      const handleButtonClick = () => {
        // Check if both players are selected
        if (!selectedPlayerId1 || !selectedPlayerId2) {
            // Show an alert using react-toastify
            alert("선수를 선택해주세요!"); // 수정된 부분: 선수가 선택되지 않았을 때 경고창);
        } else {
            // If both players are selected, open the Predict modal
            setIsModalOpen(true);
        }
    };



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

    const filteredPlayers1 = pitchers.filter(pitchers => pitchers.팀명 === selectedTeam1);
    const filteredPlayers2 = hitters.filter(hitters => hitters.팀명 === selectedTeam2);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // 외부 서버에서 선수 데이터를 가져오는 부분입니다.
                const response = await axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/compareplayer/${hitters[selectedPlayerId2 - 1]?.선수명.replace(/\*/g, '')}/${pitchers[selectedPlayerId1 - 300]?.선수명.replace(/\*/g, '')}`);
                setResults(response.data); // 선수 데이터를 상태에 저장
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData(); // 컴포넌트가 처음 렌더링될 때 데이터를 가져옴
    }, [selectedPlayerId1, selectedPlayerId2]);

    // console.log(selectedPlayerId1)
    // console.log(selectedPlayerId2) 

    // let data = {
    //     player1 : selectedPlayerId1,
    //     player2 : selectedPlayerId2,
    // }

    return (
        <div className="h-auto bg-cover bg-fixed bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: 'url("/bgimg7_2.png")' }}>
            <div className="container mx-auto">
                <div className="flex items-start">
                    <div className="flex w-full justify-between">
                        {/* Left Player Photo */}
                        <div className="w-1/3 p-4 items-center">
                            <PlayerInfocard id={selectedPlayerId1} name={pitchers[selectedPlayerId1 - 300]?.선수명} team={pitchers[selectedPlayerId1 - 300]?.팀명} />
                            {/* Select box for left team */}
                            <select
                                className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => handleTeamSelection1(e.target.value)}
                            >
                                <option value="">Select a team</option>
                                {Array.from(new Set(pitchers.map(pitchers => pitchers.팀명))).map((team, index) => (
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
                                {filteredPlayers1.map((pitchers) => (
                                    <option key={pitchers["#"]} value={pitchers["#"]}>
                                        {pitchers.선수명}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex w-2/3 justify-center items-center">
                            <button
                                className="justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                                onClick={handleButtonClick}
                            >
                                승자 예측하기
                            </button>
                        </div>

                        {isModalOpen && <PredictModal hitter={hitters[selectedPlayerId2 - 1]?.선수명.replace(/\*/g, '')} pitcher={pitchers[selectedPlayerId1 - 300]?.선수명.replace(/\*/g, '')} isOpen={isModalOpen} onClose={closeModal} />} {/* 모달 컴포넌트 */}



                        {/* Right Player Photo */}
                        <div className="w-1/3 p-4 items-center justify-center">
                            <PlayerInfocard id={selectedPlayerId2} name={hitters[selectedPlayerId2 - 1]?.선수명} team={hitters[selectedPlayerId2 - 1]?.팀명} />
                            {/* Select box for right team */}
                            <select
                                className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => handleTeamSelection2(e.target.value)}>
                                <option value="">Select a team</option>
                                {Array.from(new Set(hitters.map(hitters => hitters.팀명))).map((team, index) => (
                                    <option key={index} value={team}>
                                        {team}
                                    </option>
                                ))}
                            </select>
                            {/* Select box for right player */}
                            <select className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => handlePlayerSelection2(e.target.value)}>
                                <option value="">Select a player</option>
                                {filteredPlayers2.map((hitters) => (
                                    <option key={hitters["#"]} value={hitters["#"]}>
                                        {hitters.선수명}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    {selectedPlayerId1 && selectedPlayerId2 ? (
                        results.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            년도
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            타수
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            안타
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            홈런
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            2루타
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            3루타
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            삼진
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            볼넷
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                            타율
                                        </th>
                                        {/* 다른 데이터 필드에 대한 테이블 헤더를 여기에 추가하세요. */}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {results.map((result, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">{result.년도}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{result.타수}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{result.안타}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{result.홈런}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{result['2타']}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{result['3타']}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{result.삼진}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{result.볼넷}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{result.타율}</td>
                                            {/* 다른 데이터 필드를 여기에 추가하세요. */}
                                        </tr>
                                    ))}
                                    {/* 통산 기록을 추가합니다. */}
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">통산</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">{results.reduce((total, result) => total + result.타수, 0)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">{results.reduce((total, result) => total + result.안타, 0)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">{results.reduce((total, result) => total + result.홈런, 0)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">{results.reduce((total, result) => total + result['2타'], 0)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">{results.reduce((total, result) => total + result['3타'], 0)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">{results.reduce((total, result) => total + result.삼진, 0)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">{results.reduce((total, result) => total + result.볼넷, 0)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                                            {(results.reduce((total, result) => total + result.안타, 0) / results.reduce((total, result) => total + result.타수, 0)).toFixed(3)}
                                        </td>
                                        {/* 다른 데이터 필드에 대한 통산 기록을 여기에 추가하세요. */}
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <div><h2 className="text-2xl font-semibold mb-4 text-white">상대 전적이 없습니다</h2></div>
                        )
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default BattervsPitcher;