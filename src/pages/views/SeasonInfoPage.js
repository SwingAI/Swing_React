import React, { useState, useEffect } from 'react';
import TeamStanding from "../../components/TeamStanding";
import PlayerRankList from "../../components/PlayerRankList";


function SeasonInfoPage() {

    const [showDiv, setShowDiv] = useState(false);

    // div가 처음 렌더링될 때 나타날 수 있도록 useEffect를 사용
    useEffect(() => {
        // 일정 시간 후에 div를 나타나게 설정 (예: 2초 후)
        const timer = setTimeout(() => {
            setShowDiv(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <div className="bg-cover bg-fixed bg-center bg-no-repeat" style={{ backgroundImage: 'url("/bgimg7.jpg")' }}>
            <div className='container col-10 mx-auto d-flex justify-content-center flex-column'>
                <div className='mt-14'>
                    <div className={`w-4/5 mx-auto ${showDiv ? 'opacity-100 scale-100' : 'opacity-0 scale-0 transform'} transition-opacity duration-1000 ease-in-out transition-transform duration-3000 ease-in-out`}>
                        <TeamStanding />
                    </div>
                </div>
                <div>
                    <div className={`w-[80%] mx-auto flex overflow-x-auto p-4 bg-white rounded-lg mt-5`}>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={0} stat={'WAR'} ispit={0} isAscending={0} title={'타자 WAR'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={0} stat={'홈런'} ispit={0} isAscending={0} title={'홈런'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={1} stat={'타율'} ispit={0} isAscending={0} title={'타율'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={0} stat={'타점'} ispit={0} isAscending={0} title={'타점'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={0} stat={'득점'} ispit={0} isAscending={0} title={'득점'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={1} stat={'OPS'} ispit={0} isAscending={0} title={'OPS'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={0} stat={'도루'} ispit={0} isAscending={0} title={'도루'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={1} stat={'출루율'} ispit={0} isAscending={0} title={'출루율'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={1} stat={'장타율'} ispit={0} isAscending={0} title={'장타율'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={1} stat={'BABIP'} ispit={0} isAscending={0} title={'BABIP'} />
                        </div>
                    </div>
                </div>
                <div className='mb-14'>
                    <div className={`w-[80%] mx-auto flex overflow-x-auto p-4 bg-white rounded-lg mt-5`}>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={1} stat={'WAR'} ispit={1} isAscending={0} title={'투수 WAR'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={1} stat={'ERA'} ispit={1} isAscending={1} title={'방어율'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={0} stat={'승'} ispit={1} isAscending={0} title={'승리'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={0} stat={'세'} ispit={1} isAscending={0} title={'세이브'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={0} stat={'홀드'} ispit={1} isAscending={0} title={'홀드'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={1} stat={'삼진/9'} ispit={1} isAscending={0} title={'9이닝당 최다 삼진'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={1} stat={'볼넷/9'} ispit={1} isAscending={1} title={'9이닝당 최소 볼넷'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={1} stat={'홈런/9'} ispit={1} isAscending={1} title={'9이닝당 최소 홈런 허용률'} />
                        </div>
                        <div className="w-[45%] min-w-[650px] mx-auto">
                            <PlayerRankList ratio={0} stat={'이닝'} ispit={1} isAscending={0} title={'최다 이닝'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeasonInfoPage;