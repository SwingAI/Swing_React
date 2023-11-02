import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerInfocard from "./PlayerInfoCard.js"; // PlayerInfocard 컴포넌트 임포트

function PlayersList() {
  const [players, setPlayers] = useState([]); // 선수 데이터 배열 상태

  useEffect(() => {
    // 외부 서버에서 선수 데이터를 가져오는 부분입니다.
    axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/allplayer/0`).then((response) => {
      setPlayers(response.data); // 선수 데이터를 상태에 저장
    });
  }, []);

  console.log(players)

  // 선수 카드를 5명씩 그룹화하여 렌더링하는 함수
  const renderPlayerGroups = () => {
    const groups = [];
    for (let i = 0; i < players.length; i += 5) {
      groups.push(
        <div className="flex gap-5 mt-5" key={i}>
          {players.slice(i, i + 5).map((player) => (
            <PlayerInfocard
              id={player['#']}
              name={player.name}
              team={player.team}
              imageSrc={player.imageSrc}
            />
          ))}
        </div>
      );
    }
    return groups;
  };

  return (
    <div>
      {renderPlayerGroups()}
    </div>
  );
}

export default PlayersList;
