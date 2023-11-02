import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import { getMonth, getDate, getYear } from "date-fns";
import range from "lodash/range";

import MatchPredictionCard from '../../components/MatchPredictionCard';
import UserMatchPredict from '../../components/UserMatchPredict';

import "react-datepicker/dist/react-datepicker.css";
import "../../components/MatchDatePicker.css"
import { useParams } from 'react-router-dom';

function MatchPredictionPage() {
    const params = useParams();
    const navigate = useNavigate();

    // 사용자 로그인 시 토큰 사용을 위함
    const [isToken, setIsToken] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['x_auth']);
    const [userData, setUserData] = useState([]);

    // 사용자 예측 데이터
    const [userPreData, setUserPreData] = useState([]);
    const [correct, setCorrect] = useState({});
    const [isReceive, setIsReceive] = useState(false);

    // datepicker
    const [startDate, setStartDate] = useState(params.date?new Date(params.date):new Date());
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ];

    // 모달 열림 여부 상태
    const [isOpen, setIsOpen] = useState(false)

    // 매칭 데이터
    const [gameData, setGameData] = useState([]);
    let tmpGameData = [];
    
    // AI 예측 데이터
    const [aiPredict, setAiPredict] = useState([]);
    let tmpAiData = [];

    // 경험치 수령
    const handleReceive = async () => {
        let receiveBody = {
            userId: userData._id, 
            date: String(getYear(startDate)+'-'+('0'+(getMonth(startDate)+1)).slice(-2)+'-'+('0'+getDate(startDate)).slice(-2))
        }
      
        // 예측 경기 수 기록
        axios.post(`/api/users/addpoint`, { _id: userData._id, prediction: userData.prediction + userPreData.length, correctPrediction: userData.correctPrediction + correct.length })
            .then(response => {
                if(!response.data.success) alert('포인트 지급에 실패했어요. 관리자에게 문의하세요.')
            })
        // 경험치 수령 체크
        axios.post(`/api/predicts/receive`, receiveBody)
            .then(response => {
                if(!response.data.success) alert('오류가 발생했습니다. 다시 확인해주세요.')
                else {
                    alert('경험치 수령이 완료되었어요.');
                    navigate(`/prediction/${receiveBody.date}`);
                    window.location.reload();
                }
        });
    };

    // 쿠키 확인
    const authCheck = () => { 
		setIsToken(cookies.x_auth? true : false)
	};
    useEffect(() => {
		authCheck();
	}, [cookies]);

    // 유저 데이터 호출
    useEffect(() => {
        if(isToken){
            axios.get(`/api/users/auth`).then((response) => {
                setUserData(response.data);
        });}
    }, [isToken]);

    // 경기 결과, AI 예측 결과 호출
    useEffect(() => {
        const fetchGameData = async () => {
          try {
            setCorrect([]);
            
            const response = await axios.get(
              `${process.env.REACT_APP_DATA_ADDRESS}/matchdate/${String(getYear(startDate)+'-'+('0'+(getMonth(startDate)+1)).slice(-2)+'-'+('0'+getDate(startDate)).slice(-2))}`
            );
            for (let i = 0; i < response.data.length; i++) {
              tmpGameData.push(response.data[i])
            }
            if(tmpGameData.length !== 0){
                setGameData(tmpGameData);
                tmpGameData = [];
            } else {
                setGameData([]);
            }
          } catch (e) {
            console.log(e);
          }
        }
        const fetchPredictData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_DATA_ADDRESS}/matchPredictdate/${String(getYear(startDate)+'-'+('0'+(getMonth(startDate)+1)).slice(-2)+'-'+('0'+getDate(startDate)).slice(-2))}`
                );
                if(response.data.length !== 0){
                    for (let i = 0; i < response.data.length; i++) {
                        tmpAiData.push(response.data[i])
                    }
                    setAiPredict(tmpAiData);
                    tmpAiData = [];
                } else {
                    setAiPredict([]);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchGameData();
        fetchPredictData();
      }, [startDate]);

    // 사용자 예측 데이터 호출
    useEffect(() => {
        if(userData.length!==0 && startDate){
            const params = {
                userId: userData._id,
                date: String(getYear(startDate)+'-'+('0'+(getMonth(startDate)+1)).slice(-2)+'-'+('0'+getDate(startDate)).slice(-2))
            };

            axios.get(`/api/predicts/get`, {params:params}).then((response) => {
                if(response.data.data) {
                    setIsReceive(response.data.isReceive);
                    setUserPreData(Object.entries(response.data.data));
                }
                else setUserPreData([])
        });}
    }, [userData, startDate]);

    const [showDiv, setShowDiv] = useState(false);
    // div가 처음 렌더링될 때 나타날 수 있도록 useEffect를 사용
    useEffect(() => {
        // 일정 시간 후에 div를 나타나게 설정 (예: 2초 후)
        const timer = setTimeout(() => {
            setShowDiv(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행
    
    console.log(userPreData);

    return (
        <div className="flex justify-center items-center h-auto bg-cover bg-fixed bg-center bg-no-repeat py-5" style={{ backgroundImage: 'url("/bgimg1.png")' }}>
            <div className={`container items-center ${showDiv ? 'opacity-100 scale-100' : 'opacity-0 scale-0 transform'} transition-opacity duration-1000 ease-in-out transition-transform duration-3000 ease-in-out`}>
                <div className="row">
                    <div className="col-lg-8 col-md-7 my-4 mx-auto d-flex justify-content-center flex-column bg-gray-100 rounded-lg p-5">
                        <div>
                            <div>
                                <p className="font-bold text-3xl inline text-blue-500">Swing AI</p>
                                <p className="font-bold text-2xl inline"> 예측</p>
                                { 
                                    isToken
                                    ? <div className='inline'>
                                        <p className='font-bold text-3xl inline mx-4'> vs </p>
                                        <p className="font-bold text-3xl inline text-blue-500">{userData.nickname}</p>
                                        <p className="font-bold text-2xl inline">의 예측</p>
                                    </div>
                                    : <p className='ms-4 mt-4'>
                                        Swing AI가 예측한 경기 결과를 확인할 수 있어요. <br/> 
                                        아래에서 날짜를 선택한 뒤, 카드를 클릭하면 세부 경기 결과 및 예측 데이터를 확인할 수 있어요. <br/>
                                        로그인을 하면 경기를 직접 예측하고, Swing AI의 예측 결과와 비교할 수 있어요.
                                    </p>
                                }
                            </div>
                                
                        </div>
                        <div className="text-center mt-10 mb-2">
                            <div>
                                <DatePicker 
                                    className="datePicker"
                                    renderCustomHeader={({
                                        date,
                                        changeYear,
                                        changeMonth,
                                        decreaseMonth,
                                        increaseMonth,
                                        prevMonthButtonDisabled,
                                        nextMonthButtonDisabled,
                                    }) => (
                                    <div className="flex justify-center items-center border-0">
                                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                        </button>
                                        <div className="mx-4 my-0">
                                        <select
                                            className="year"
                                            value={getYear(date)}
                                            onChange={({ target: { value } }) => changeYear(value)}
                                        >
                                            {years.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                            ))}
                                        </select>
                                        <select
                                            className="month"
                                            value={months[getMonth(date)]}
                                            onChange={({ target: { value } }) =>
                                            changeMonth(months.indexOf(value))
                                            }
                                        >
                                            {months.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                            ))}
                                        </select>
                                        </div>
                                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                        </button>
                                    </div>
                                    )}
                                    closeOnScroll={(e) => e.target === document}
                                    selected={startDate} 
                                    onChange={(date) => setStartDate(date)} 
                                    dateFormat="yyyy년 MM월 dd일 ▾" 
                                    locale={ko}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                />
                                {
                                    gameData.length === 0
                                    ? <p className="my-2 text-center">이 날의 경기 데이터가 존재하지 않아요. 다른 날짜를 선택해보세요.</p>
                                    : gameData.map((gData) => (
                                        aiPredict.length!== 0
                                        ? aiPredict.map((aData) => (
                                            aData.match_ID === gData.match_ID
                                            ? <MatchPredictionCard data={gData} userPredict={userPreData} aiPredict={aData} isCorrect={(e) => {setCorrect(prevCorrect => [...new Set([...prevCorrect, e])]); } }/>
                                            : null
                                        ))
                                        : <MatchPredictionCard data={gData} userPredict={userPreData} aiPredict={aiPredict} isCorrect={(e) => {setCorrect(prevCorrect => [...new Set([...prevCorrect, e])]); } }/>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7 my-4 mx-auto d-flex justify-content-center flex-column bg-gray-100 rounded-lg p-5">
                        {
                            isToken 
                            ? <div>
                                {
                                    gameData.length === 0 || userPreData.length !== 0
                                    ? <div>
                                        {
                                            gameData.length === 0
                                            ? <div className='flex justify-center flex-col'>
                                                <p className='mt-6 text-center block'>이 날에는 경기 데이터가 없어요.</p>
                                            </div>
                                            : <div>
                                                <p className="font-bold text-2xl">이 날의 예측결과</p>
                                                <div className='mt-10'>
                                                    <div className="flex justify-evenly text-center">
                                                        <div>
                                                            <p className="font-bold text-2xl">{userPreData.length}</p>
                                                            <p>예측 경기</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-2xl">{correct.length}</p>
                                                            <p>적중 예측</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-2xl">{(correct.length/userPreData.length*100===0)?0:`${parseInt(correct.length/userPreData.length*100)}%`}</p>
                                                            <p>총 적중률</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    isReceive
                                                    ? null
                                                    : <div className='flex justify-center mt-4'>
                                                        <button onClick={handleReceive} className="rounded-md text-white bg-blue-500 p-2">경험치 수령</button>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                    : <div className='flex justify-center flex-col'>
                                        <p className='mt-6 text-center block'>이 날에는 예측된 경기 데이터가 없어요. 승부를 예측해볼까요?</p>
                                        <button onClick={() => setIsOpen(true)} className="rounded-md text-white bg-blue-500 mx-10 py-2 my-4">예측하기</button>
                                        <UserMatchPredict isOpen={isOpen} onClose={() => setIsOpen(false)} data={gameData} userId={userData._id}/>
                                    </div>
                                }
                            </div>
                            : <div>
                                <p className="font-bold text-2xl inline">나만의 예측을 기록하고 싶나요?</p>
                                <div className='flex justify-content-center items-center'>
                                    <p className='mt-5'>Swing AI와 함께 경기를 예측하려면 로그인해주세요.</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchPredictionPage;