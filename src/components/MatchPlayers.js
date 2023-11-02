import React, { useState, useEffect } from 'react';
import axios from "axios";

import PlayerInfocard from './PlayerInfoCard';

export default function MatchPlayers(data){
    const [allData, setAllData] = useState([]);
    const [winPit, setWinPit] = useState([]);
    const [defPit, setDefPit] = useState([]);
    const [bestPlayer, setBestPlayer] = useState([]);
    const [worstPlayer, setWorstPlayer] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_DATA_ADDRESS}/allplayers`
                );
                setAllData(response.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(allData.length!==0){
            allData.map((i)=>{
                if(i['선수명'] === data.data.win_pit)
                    setWinPit(i);
                if(i['선수명'] === data.data.def_pit)
                    setDefPit(i);
                if(i['선수명'] === data.data.best_player)
                    setBestPlayer(i);
                if(i['선수명'] === data.data.worst_player)
                    setWorstPlayer(i);
            })
        }
    }, [allData])
    
    if(!bestPlayer||!worstPlayer||!winPit||!defPit) return null;
    else return (
        <>
            <div className='grid grid-cols-4 mt-5 mx-4'>
                <div className='mx-4'>
                    <h5 className='font-semibold antialiased'>승리투수</h5>
                    <div>
                        <PlayerInfocard id={winPit[`#`]} name={winPit[`선수명`]} team={winPit[`팀명`]}/>
                        <h5 className='mt-2 antialiased'>{winPit[`선수명`]}</h5>
                    </div>
                </div>
                <div className='mx-4'>
                    <h5 className='font-semibold antialiased'>패전투수</h5>
                    <div>
                        <PlayerInfocard id={defPit[`#`]} name={defPit[`선수명`]} team={defPit[`팀명`]}/>
                        <h5 className='mt-2 antialiased'>{defPit[`선수명`]}</h5>
                    </div>
                </div>
                <div className='mx-4'>
                    <h5 className='font-semibold antialiased'>베스트 플레이어</h5>
                    <div>
                        <PlayerInfocard id={bestPlayer[`#`]} name={bestPlayer[`선수명`]} team={bestPlayer[`팀명`]}/>
                        <h5 className='mt-2 antialiased'>{bestPlayer[`선수명`]}</h5>
                    </div>
                </div>
                <div className='mx-4'>
                    <h5 className='font-semibold antialiased'>워스트 플레이어</h5>
                    <div>
                        <PlayerInfocard id={worstPlayer[`#`]} name={worstPlayer[`선수명`]} team={worstPlayer[`팀명`]}/>
                        <h5 className='mt-2 antialiased'>{worstPlayer[`선수명`]}</h5>
                    </div>
                </div>
            </div>
        </>
    )
};