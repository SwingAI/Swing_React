import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../components/TeamInfoPage.css';

function TeamInfoPage() {
    const teams = ['SSG 랜더스', '키움 히어로즈', 'LG 트윈스', 'KT 위즈',
        'KIA 타이거즈', 'NC 다이노스', '삼성 라이온즈', '롯데 자이언츠',
        '두산 베어스', '한화 이글스'];

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
        <div className="h-auto bg-cover bg-fixed bg-center bg-no-repeat min-h-screen py-5" style={{ backgroundImage: 'url("/bgimg7.png")' }}>
            <div className={`container ${showDiv ? 'opacity-100 scale-100' : 'opacity-0 scale-0 transform'} transition-opacity duration-1000 ease-in-out transition-transform duration-3000 ease-in-out`}>
                <div className="row">
                    <div className="col-lg-8 col-md-7 my-4 mx-auto d-flex justify-content-center flex-column">
                        <p className="text-2xl font-bold mb-5 text-white">구단 선택</p>
                        <div class="grid grid-cols-4 gap-4 text-center mb-4 TIPteamLogo">
                            {teams.map(function (name) {
                                return (
                                    <Link to={`/teaminfo/${name}`} className="card p-6 w-full border border-white rounded-lg shadow hover:bg-gray-200" style={{ textDecoration: 0 }}>
                                        <div className="card-body p-2">
                                            <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${name}/logo.png`} />
                                            <p className="mt-2 font-medium antialiased">{name}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                        <p className="ms-2 text-white">구단 목록은 작년 시즌 최종 성적을 기준으로 정렬되었습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamInfoPage;