import React, { useState, useEffect } from "react";
import axios from "axios";

import "./RecentMatchPredictionCard.css";

import MatchPredictionCard from './MatchPredictionCard';

function RecentMatchPredictionCard() {
    const gameDate = '2023-04-01';

    // 서버에서 구단 정보, AI 예측 결과 호출
    const [gameData, setGameData] = useState([]);
    const [predictData, setPredictData] = useState([]);
    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const matchResponse = await axios.get(
                    `${process.env.REACT_APP_DATA_ADDRESS}/matchdate/${gameDate}`
                );
                if(matchResponse){
                    setGameData(matchResponse.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        const fetchPredictData = async () => {
            try {
                const predictResponse = await axios.get(
                    `${process.env.REACT_APP_DATA_ADDRESS}/matchPredictdate/${gameDate}`
                );
                if(predictResponse){
                    setPredictData(predictResponse.data);
                } else {
                    setPredictData([]);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchMatchData();
        fetchPredictData();
    }, []);

    if (gameData.length === 0) {
        return null;
    } else return(
        <div className='w-full'>
            <p className='mb-1'>{gameDate}</p>
            {gameData.map((gData) => (
                predictData.length !== 0
                ? predictData.map((pData) => (
                    gData.match_ID === pData.match_ID
                    ? <MatchPredictionCard data={gData} userPredict={[]} aiPredict={pData}/>
                    : null
                ))
                : <MatchPredictionCard data={gData} userPredict={[]} aiPredict={predictData}/>
            ))}
        </div>
    );
};

export default RecentMatchPredictionCard;