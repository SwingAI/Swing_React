import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import './Navbar.css';

function NavBar() {
  const navigate = useNavigate();

  const [isToken, setIsToken] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['x_auth']);
  const [userData, setUserData] = useState([]);

  const authCheck = () => { 
		setIsToken(cookies.x_auth? true : false)
	};

  const onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if(response.data.success){
          removeCookie('x_auth');
          navigate('/');
        } else {
          alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
        }
      })
  }

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

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to={'/'} className="-m-1.5 p-1.5 NavbarMenu">
            <span className="sr-only">Swing</span>
            <div className="text-3xl font-extrabold text-blue-500">Swing</div>
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to={'/seasoninfo'} className="text-sm font-semibold leading-6 text-gray-900 NavbarMenu">
            시즌정보
          </Link>
          <Link to={'/teaminfo'} className="text-sm font-semibold leading-6 text-gray-900 NavbarMenu">
            구단정보
          </Link>
          <Link to={'/prediction'} className="text-sm font-semibold leading-6 text-gray-900 NavbarMenu">
            경기예측
          </Link>
          <Link to={'/compare'} className="text-sm font-semibold leading-6 text-gray-900 NavbarMenu">
            선수비교
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {
              isToken 
              ? <div>
                  <Link to={'/userinfo'} className="me-3 text-sm leading-6 text-gray-900 NavbarMenu navbarImg">
                    <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${userData.team}/logo.png`} className='inline-block me-1'/>
                    {userData.nickname}님
                  </Link>
                  <button onClick={onClickHandler} className="text-sm font-semibold leading-6 text-gray-900 NavbarMenu">
                    로그아웃
                  </button>
                </div>
              : <Link to={'/login'} className="text-sm font-semibold leading-6 text-gray-900 NavbarMenu">
                  로그인
                </Link>
            }
        </div>
      </nav>
    </header>
  )
}

export default NavBar;