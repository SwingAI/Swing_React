import React,{ useEffect,useState } from "react";
import axios from "axios";

function PlayerNameCard({id}) {

    const [players, setPlayers] = useState([]); // 데이터 상태


    useEffect(() => {
        // 외부 서버에서 선수 데이터를 가져오는 부분입니다.
        axios.get(`${process.env.REACT_APP_DATA_ADDRESS}/player/${id}`).then((response) => {
          setPlayers(response.data); // 선수 데이터를 상태에 저장
        });
      }, []);
    
      console.log(players);

    return (
        <div>
            <div className="flex my-2 border border-gray-300 rounded-md mx-auto" >
                <p className="w-[10%] text-gray-600 ml-2 mt-3 ml-4">99</p> {/* index + 2를 사용하여 순위를 표시합니다. */}
                <p className="w-[25%] text-gray-600 text-bold mt-3">{players.map((player) => (
                                        <p>{player.등번호}</p>
                                    ))}</p>
                <p className="w-[50%] text-gray-300 mt-3">토론토</p>
                <p className="w-[5%]text-gray-600 mt-3 mr-4">3</p>
            </div>
        </div>
    );
}

export default PlayerNameCard;