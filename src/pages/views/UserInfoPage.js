import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import ShowUserInfo from '../../components/ShowUserInfo';
import TeamChangeModal from '../../components/TeamChangeModal';

import '../../components/TeamDetailPage.css';

function UserInfoPage() {
    const [isToken, setIsToken] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['x_auth']);
    const [userData, setUserData] = useState([]);
    const [teamData, setTeamData] = useState([]);

    // 닉네임 변경 모달 열림 여부 상태
    const [isNameOpen, setIsNameOpen] = useState(false)
    // 구단 변경 모달 열림 여부 상태
    const [isTeamOpen, setIsTeamOpen] = useState(false)

    const authCheck = () => { 
		setIsToken(cookies.x_auth? true : false)
	};

    useEffect(() => {
		authCheck();
	}, [cookies]);

    useEffect(() => {
        if(isToken){
            axios.get(`/api/users/auth`).then((response) => {
                setUserData(response.data);
            });
        }
    }, [isToken]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_DATA_ADDRESS}/team/${userData.team}`
                );
                setTeamData(response.data[0]);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [userData]);

    console.log(userData, teamData)

    if(!userData || !teamData) return(null)
    else return(
        <div className="py-5 bg-gray-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-7 my-4 mx-auto d-flex justify-content-center flex-column">
                        <p className="font-bold text-2xl inline">내 정보</p>
                        <div className='ms-4'><ShowUserInfo data={userData}/></div>   
                    </div>
                    <div className="col-lg-8 col-md-7 my-4 mx-auto d-flex justify-content-center flex-column TDPteamLogo">
                        <p className="font-bold text-2xl inline">선호 구단</p>
                        <div className='ms-4'>
                            <div className='flex flex-row'>
                                <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${teamData["팀명"]}/logo.png`}/>
                                <div className="ms-4 mt-4">
                                    <div className='flex flex-row'>
                                        <p className="font-bold text-4xl">{teamData["팀명"]}</p>
                                        <button onClick={() => setIsTeamOpen(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ms-2 w-4 h-4 inline">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                            <p className="inline align-bottom text-xs">수정</p>
                                        </button>
                                        <TeamChangeModal isOpen={isTeamOpen} onClose={() => setIsTeamOpen(false)} data={userData}/>
                                    </div>
                                    <div>
                                        <p className="text-blue-500 text-2xl font-semibold inline">{teamData["#"]}등 </p>
                                        <p className="text-2xl inline tracking-tighter">{teamData["승"]}승 {teamData["무"]}무 {teamData["패"]}패</p>
                                        <div>
                                            <p className="inline-block text-sm text-gray-600 me-2">승률 </p>
                                            <p className="inline-block text-md me-2">{teamData["승률"]} </p>
                                            <p className="inline-block text-sm text-gray-600 me-2">기대승률 </p>
                                            <p className="inline-block text-md">{teamData["기대승률"]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to={`/teaminfo/${teamData["팀명"]}`} className="text-sm leading-6 text-gray-900 NavbarMenu flex flex-row mt-4 ms-2">
                                <p>{teamData["팀명"]} 페이지로 이동</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ms-2 mt-1 w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoPage;