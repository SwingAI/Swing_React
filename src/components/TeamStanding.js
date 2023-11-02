import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const TeamStanding = () => {
  const teams = [
    'SSG 랜더스', '키움 히어로즈', 'LG 트윈스', 'KT 위즈',
    'KIA 타이거즈', 'NC 다이노스', '삼성 라이온즈', '롯데 자이언츠',
    '두산 베어스', '한화 이글스'
  ];

  const [ranking, setRanking] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (name) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/team/${name}`);
      return {
        name: response.data[0]["팀명"],
        rank: response.data[0]["#"],
        games: response.data[0]["경기"],
        wins: response.data[0]["승"],
        draws: response.data[0]["무"],
        loses: response.data[0]["패"],
        wp: response.data[0]["승률"],
      };
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const promises = teams.map(fetchData);
    Promise.all(promises).then((results) => {
      setRanking(results.sort((a, b) => a.rank - b.rank));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div>
        <p>순위를 불러오고 있어요...</p>
      </div>
    );
  }

  function repeatTableRow() {
    return ranking.map((team, index) => (
      <tr
        key={index}
        className={index % 2 === 0 ? "bg-gray-100 text-center" : "bg-white text-center"}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        style={{ transform: `scale(${hoveredIndex === index ? 1.05 : 1})`, transition: "transform 0.3s" }}
      >
        <td className="py-3 px-4">{team.rank}</td>
        <td className="px-4">
          <div className="flex justify-start">
            <img
              className="mt-1"
              src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${team.name}/logo.png`}
              style={{ width: '50px', height: '50px' }}
            />
            <Link to={`/teaminfo/${team.name}`} className="mt-3 ml-2" style={{ textDecoration: 'none', color: 'inherit' }}>
              {team.name}
            </Link>

          </div>
        </td>
        <td className="py-3 px-4">{team.games}</td>
        <td className="py-3 px-4">{team.wins}</td>
        <td className="py-3 px-4">{team.draws}</td>
        <td className="py-3 px-4">{team.loses}</td>
        <td className="py-3 px-4">{team.wp}</td>
        <td className="py-3 px-4">{((ranking[0].wins - ranking[0].loses) - (team.wins - team.loses)) / 2}</td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-500 text-white text-center">
                <th className="py-2 px-4">순위</th>
                <th className="py-2 px-4">팀명</th>
                <th className="py-2 px-4">경기수</th>
                <th className="py-2 px-4">승</th>
                <th className="py-2 px-4">무</th>
                <th className="py-2 px-4">패</th>
                <th className="py-2 px-4">승률</th>
                <th className="py-2 px-4">게임차</th>
              </tr>
            </thead>
            <tbody>{repeatTableRow()}</tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default TeamStanding;
