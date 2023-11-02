import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import "./RecentMatchPredictionCard.css";
import TeamNameChanger from './TeamNameChanger';

function MatchPredictionCard({data, userPredict, isCorrect, aiPredict}) {
    const [winPre, setWinPre] = useState([]);

    useEffect(() => {
        if(userPredict.length !== 0){
            userPredict.map(function(i){
                if(i[0] == data.match_ID){
                    setWinPre(i[1])
                    
                    if(isCorrect){
                        if(data.score_A > data.score_B){
                            if(data.match_teamA == i[1]){
                                isCorrect(i[1]);
                            }
                        } else if(data.score_A < data.score_B) {
                            if(data.match_teamB == i[1]){
                                isCorrect(i[1]);
                            }
                        }
                    }
                }
            })
        } else {
            setWinPre([])
        }
    }, [data, userPredict]);


    const [showDiv, setShowDiv] = useState(false);
    // div가 처음 렌더링될 때 나타날 수 있도록 useEffect를 사용
    useEffect(() => {
        // 일정 시간 후에 div를 나타나게 설정 (예: 2초 후)
        const timer = setTimeout(() => {
            setShowDiv(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

    return(
        <div className={`w-full ${showDiv ? 'opacity-100 scale-100' : 'opacity-0 scale-0 transform'} transition-opacity duration-500 ease-in-out transition-transform duration-3000 ease-in-out`}>
            <Link to={`/matchresult/${data.match_date}/${data.match_stadium}`} className="card p-6 mt-2 mb-4 w-full border border-gray-200 rounded-lg shadow hover:bg-gray-50" style={{textDecoration : 0}}>
                    <div className="card-body">
                        <div className='grid grid-cols-3 px-20 items-center RMPteamLogo'>
                            <div className='text-end'>
                                <div className='inline-block'>
                                    <h4 className="font-medium mb-0">{TeamNameChanger(data.match_teamA)}</h4>
                                    <p className="text-sm">{data.match_teamA}</p>
                                </div>
                                <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${data.match_teamA}/logo.png`} className='ms-3 inline-block'/>
                            </div>
                            <div className='text-center'>
                                {
                                    data.is_cancel
                                    ? <div>
                                        <h4 className='text-center text-sm'>경기취소</h4>
                                    </div>
                                    : <div className='grid grid-cols-3 px-7'>
                                        <h4 className='text-center font-semibold'>{data.score_A}</h4>
                                        <h4 className='text-center font-semibold'>:</h4>
                                        <h4 className='text-center font-semibold'>{data.score_B}</h4>
                                    </div>
                                }
                                <p>{data.match_stadium}</p>
                            </div>
                            <div className='text-start'>
                                <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${data.match_teamB}/logo.png`} className='me-3 inline-block'/>
                                <div className='inline-block'>
                                    <h4 className="font-medium mb-0">{TeamNameChanger(data.match_teamB)}</h4>
                                    <p className="text-sm">{data.match_teamB}</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            {
                                aiPredict.length !== 0
                                ? <div className="grid grid-cols-3 px-30 items-center">
                                    <>
                                        {
                                            aiPredict.pred_score_A > aiPredict.pred_score_B
                                            ? <p className='text-blue-500 text-end'>승</p>
                                            : <p className='text-end'>
                                                {aiPredict.pred_score_A === aiPredict.pred_score_B?'무':'패'}
                                            </p>
                                        }
                                    </>
                                    <p className="font-medium mx-3 text-center">Swing AI 예측</p>
                                    <>
                                        {
                                            aiPredict.pred_score_A < aiPredict.pred_score_B
                                            ? <p className='text-blue-500 text-start'>승</p>
                                            : <p className='text-start'>
                                                {aiPredict.pred_score_A === aiPredict.pred_score_B?'무':'패'}
                                            </p>
                                        }
                                    </>
                                </div>
                                : <p className='mt-4 items-center text-center'>Swing AI 예측 데이터가 존재하지 않아요.</p>
                            }
                            {
                                userPredict.length !== 0
                                ? <div className="grid grid-cols-3 px-30 items-center">
                                    {
                                        winPre.length !== 0
                                        ?(
                                            winPre==data.match_teamA
                                                ?<p className='text-end text-blue-600'>승</p>
                                                :<p className='text-end'>패</p>
                                            )
                                        :<p className='text-end'>-</p>
                                    }
                                    <p className="font-medium mx-3 text-center">나의 예측</p>
                                    {
                                        winPre.length !== 0
                                        ?(
                                            winPre==data.match_teamA
                                                ?<p className='text-start'>패</p>
                                                :<p className='text-start text-blue-600'>승</p>
                                            )
                                        :<p className='text-start'>-</p>
                                    }
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </Link>
        </div>
    );
};

export default MatchPredictionCard;