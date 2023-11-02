import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerInfocard from "./PlayerInfoCard.js";
import PlayerModal from "./PlayerModal.js";

function PlayerRankList({ ratio, stat, ispit, isAscending, title }) {
  const [players, setPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [loading, setLoading] = useState(true);

  const openModal = (playerId) => {
    setIsModalOpen(true);
    setSelectedPlayerId(playerId);
    document.body.style.overflow = "auto";
  };

  const closeModal = (playerId) => {
    setIsModalOpen(false);
    setSelectedPlayerId(null);
    document.body.style.overflow = "auto";
  };

  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/legalplayer`).then((response) => {
  //     // ispit 값에 따라 타자 또는 투수만 필터링
  //     const filteredPlayers = response.data.filter((player) => player.is_pit === ispit);
  //     setPlayers(filteredPlayers);
  //     setLoading(false);
  //   });
  // }, [ispit]);

  useEffect(() => {
    let apiEndpoint = `${process.env.REACT_APP_DATA_ADDRESS}/legalplayer`;
    
    if (ratio !== 1) {
      apiEndpoint = `${process.env.REACT_APP_DATA_ADDRESS}/allplayers`;
    }
    
    axios.get(apiEndpoint).then((response) => {
      // ispit 값에 따라 타자 또는 투수만 필터링
      const filteredPlayers = response.data.filter((player) => player.is_pit === ispit);
      setPlayers(filteredPlayers);
      setLoading(false);
    });
  }, [ispit, ratio]);

  if (loading) {
    return (
      <div className="w-auto h-auto flex items-center justify-center">
        <div className="animate-spin rounded-full border-t-4 border-b-4 border-white h-12 w-12"></div>
      </div>
    );
  }

  const sortedPlayers = players.slice().sort((a, b) => {
    const aValue = a[stat];
    const bValue = b[stat];
    return isAscending ? aValue - bValue : bValue - aValue;
  });

  console.log(players)

  const renderPlayerGroups = () => {
    const groups = [];
    const topPlayers = sortedPlayers.slice(0, 1).map((player) => (
      <div key={player['#']}>
        <PlayerInfocard
          id={player['#']}
          name={player.선수명}
          team={player.팀명}
          imageSrc={player.imageSrc}
        />
      </div>
    ));

    const remainingPlayers = sortedPlayers.slice(0, 5).map((player, index) => (
      <div key={player['#']} className="my-3">
        <div
          className="flex items-baseline border-b-2 border-gray-300 cursor-pointer transition-transform hover:scale-105 hover:border-black"
          onClick={() => openModal(player['#'])}
        >
          <p className="w-[10%] text-gray-600 mt-3 ml-2 ml-4">{index + 1}</p>
          <p className="w-[25%] text-blue-600 text-bold">{player.선수명.length > 3 ? player.선수명.substring(0, 3) : player.선수명}</p>
          <p className="w-[50%] text-gray-500">{player.팀명.split(' ')[0]}</p>
          <p className="w-[5%] text-blue-600 mr-9">{player[stat]}</p>
        </div>
      </div>
    ));

    groups.push(<div className="w-1/2 min-w-1/2" key="topPlayers">{topPlayers}</div>);
    groups.push(<div className="ml-4 w-1/2 min-w-1/2" key="remainingPlayers">{remainingPlayers}</div>);

    return groups;
  };

  return (
    <div className="mt-3">
      <h2 className="text-3xl text-blue-500 flex justify-center font-semibold mb-2">{title} 랭킹</h2>
      <div className="bg-gray-100 shadow-lg flex items-center px-4 py-4 border border-solid rounded-md mx-2">
        {renderPlayerGroups()}
        {isModalOpen && selectedPlayerId !== null && (
          <PlayerModal id={selectedPlayerId} isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>
    </div>
  );
}

export default PlayerRankList;
