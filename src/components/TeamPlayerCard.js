import React from "react";
import { Link } from 'react-router-dom';

import './TeamPlayerCard.css'

function TeamPlayerCard({ player }) {
    const onErrorImg = (e) => {
        e.target.src = "https://raw.githubusercontent.com/coreswing/swingimages/main/noimg.png";
    }

    return (
        <Link to={`/playerdetail/${player['#']}`} className="container w-[45%] min-w-[320px] me-4 p-6 TPCplayerImg text-black border border-gray-200 rounded-md shadow bg-white" style={{textDecoration: 0}}>
            <div className="flex justify-between px-3 mb-2">
                <p className='text-3xl font-bold subpixel-antialiased'>{player['선수명'].replace(/\*|\(.+\)/g, '')}</p>
                <p className='text-xl font-bold text-gray-500'>{player['포지션']}</p>
            </div>
            <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${player['팀명']}/${player['선수명'].replace(/\*|\(.+\)/g, '')}.png`} onError={onErrorImg}/>
        </Link>
    );
}

export default TeamPlayerCard;