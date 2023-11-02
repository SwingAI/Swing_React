import React, { useState, useEffect } from "react";
import axios from "axios";

import TeamPlayerCard from './TeamPlayerCard'

function TeamPlayerList({ team }) {
    const [players, setPlayers] = useState([]);
    const [pitcher, setPitcher] = useState([]);
    const [hitter, setHitter] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_DATA_ADDRESS}/playerteam/${team}`
                );
                setPlayers(response.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(players.length!==0){
            players.map((player) => {
                if(player['포지션'] == '투수'){
                    pitcher.push(player);
                } else {
                    hitter.push(player);
                }
            })
        }
    }, [players])

    if(pitcher.length===0 || hitter.length===0){
        return(
            <div>데이터를 불러오고 있어요.</div>
        )
    } else {
        return (
            <div>
                <div>
                    <p className="text-xl px-4 mb-0">투수</p>
                    <div className="mx-auto flex overflow-x-auto p-4">
                        {pitcher.map((p) => (
                            <TeamPlayerCard player={p}/>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-xl px-4 mt-4 mb-0">타자</p>
                    <div className="mx-auto flex overflow-x-auto p-4">
                        {hitter.map((p) => (
                            <TeamPlayerCard player={p}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}


export default TeamPlayerList;