import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerInfocard from "./PlayerInfoCard.js"; // PlayerInfocard 컴포넌트 임포트
import PlayerModal from "./PlayerModal.js";

function PitcherRankList({ stat }) {
  const [players, setPlayers] = useState([]); // 선수 데이터 배열 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부 상태
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const openModal = (playerId) => {
    setIsModalOpen(true);
    setSelectedPlayerId(playerId);
    document.body.style.overflow = "auto"; // 스크롤 막기
  };

  const closeModal = (playerId) => {
    setIsModalOpen(false);
    setSelectedPlayerId(null);
    document.body.style.overflow = "auto"; // 스크롤 허용
  };

  useEffect(() => {
    // 외부 서버에서 선수 데이터를 가져오는 부분입니다.
    axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/allplayer/1`).then((response) => {
      setPlayers(response.data); // 선수 데이터를 상태에 저장
    });
  }, []);

  console.log(players);

  // 선수 카드를 5명씩 그룹화하여 렌더링하는 함수
  const renderPlayerGroups = () => {
    const groups = [];
    const sortedPlayers = players.slice().sort((a, b) => b[stat] - a[stat]); // 홈런 수치를 기준으로 내림차순 정렬

    // 홈런 수치가 가장 높은 상위 3명을 PlayerInfocard로 보여주기
    const topPlayers = sortedPlayers.slice(0, 1).map((player) => (
      <div>
        <PlayerInfocard
          key={player['#']}
          id={player['#']}
          name={player.name}
          team={player.team}
          imageSrc={player.imageSrc}
        />
        {/* <p className="mt-3">
            {player.팀명}
            {player.선수명}
          </p> */}
      </div>
    ));

    // 나머지 선수들은 텍스트로 나열하고 페이지별로 나누기
    const remainingPlayers = sortedPlayers.slice(0, 5).map((player, index) => (
      <div>
        <div key={player['#']} className="flex my-2 border border-gray-300 rounded-md" onClick={() => openModal(player['#'])}>
          <p className="w-[10%] text-gray-600 ml-2 mt-3 ml-4">{index + 1}</p> {/* index + 2를 사용하여 순위를 표시합니다. */}
          <p className="w-[25%] text-gray-600 text-bold mt-3">{player.선수명}</p>
          <p className="w-[50%] text-gray-300 mt-3">{player.팀명}</p>
          <p className="w-[5%]text-gray-600 mt-3 mr-4">{player[stat]}</p>
        </div>
      </div>
    ));



    groups.push(<div className="gap-5" key="topPlayers">{topPlayers}</div>);
    groups.push(<div className="mt-5" key="remainingPlayers">{remainingPlayers}</div>);

    return groups;
  };

  return (
    <div className="px-4 py-4 border border-solid border-black rounded-lg mx-2">
      <h2 className="text-3xl flex justify-center font-semibold mb-4">{stat} 랭킹</h2>
      {renderPlayerGroups()}
      {isModalOpen && selectedPlayerId !== null && (
        <PlayerModal id={selectedPlayerId} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
}

export default PitcherRankList;
