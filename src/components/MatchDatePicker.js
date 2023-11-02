import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import { getMonth, getDate, getYear } from "date-fns";
import range from "lodash/range";

import MatchPredictionCard from "./MatchPredictionCard";

import "react-datepicker/dist/react-datepicker.css";
import "./MatchDatePicker.css"

const MatchDatePicker = (teamName) => {
  const [startDate, setStartDate] = useState(new Date());
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ];

  const [gameData, setGameData] = useState([]);
  const [predictData, setPredictData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchResponse = await axios.get(
          `${process.env.REACT_APP_DATA_ADDRESS}/matchdate/${String(getYear(startDate)+'-'+('0'+(getMonth(startDate)+1)).slice(-2)+'-'+('0'+getDate(startDate)).slice(-2))}`
        );
        if(matchResponse.data.length > 0){
          for (let i = 0; i < matchResponse.data.length; i++) {
            if (matchResponse.data[i].match_teamA === teamName || matchResponse.data[i].match_teamB === teamName)
              setGameData(matchResponse.data[i]);
          }
          // AI 예측 결과 데이터 호출 및 저장
          const predictResponse = await axios.get(
            `${process.env.REACT_APP_DATA_ADDRESS}/matchPredictdate/${String(getYear(startDate)+'-'+('0'+(getMonth(startDate)+1)).slice(-2)+'-'+('0'+getDate(startDate)).slice(-2))}`
          );
          if(predictResponse.data.length > 0){
            for (let i = 0; i < predictResponse.data.length; i++) {
              if (predictResponse.data[i].match_teamA === teamName || predictResponse.data[i].match_teamB === teamName)
                setPredictData(predictResponse.data[i]);
            }
          } else {
            setPredictData([]);
          }
        }
        else {
          setGameData([]);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [startDate]);
  console.log(predictData)
  
  return (
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
        ? <p>이 날의 경기 데이터가 존재하지 않아요. 다른 날짜를 선택해보세요.</p>
        : <MatchPredictionCard data={gameData} userPredict={[]} aiPredict={predictData}/>
      }
    </div>
  );
};

export default MatchDatePicker;