import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import TeamNameChanger from "./TeamNameChanger";
import './UserMatchPredict.css'

const UserMatchPredict = ({ isOpen, onClose, data, userId }) => {
  const navigate = useNavigate();

  const [userPredict, setUserPredict] = useState({date: data[0].match_date, userId: userId});

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserPredict((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const request = axios.post(`/api/predicts/add`, userPredict)
      .then(response => {
        if(!response.data.success) alert('오류가 발생했습니다!')
        else {
          onClose();
          navigate(`/prediction/${data[0].match_date}`);
          window.location.reload();
       }
    });
  };

  useEffect(() => {
    setUserPredict({date: data[0].match_date, userId: userId});
  }, [data]);

  console.log(data)

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id='wrapper' onClick={handleClose}>
      <div className="flex flex-col">
        <button className='text-white text-xl place-self-end' onClick={() => onClose()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="bg-white p-4 rounded">
          <div className="ms-2 mb-2 text-start">
            <h2 className="text-lg font-bold">
              <p>{data[0].match_date} 경기 예측하기</p>
            </h2>
            <p>모든 경기를 예측하지 않아도 되며, 예측된 결과는 수정할 수 없어요.</p>
          </div>
          <hr className="mb-4"/>
          <div>
            {
              data.map((d) => (
                <ul class="grid grid-cols-3 px-28 items-center UMPteamLogo" onChange={handleChange}>
                  <li>
                      <input type="radio" id={d.match_ID+"A"} name={d.match_ID} value={d.match_teamA} class="hidden peer" required/>
                      <label for={d.match_ID+"A"} class="inline-flex items-center justify-between w-full px-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:text-blue-500 hover:text-gray-600 hover:bg-gray-100">                           
                          <div class="block">
                              <div class="text-lg font-semibold me-2">{TeamNameChanger(d.match_teamA)}</div>
                          </div>
                          <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${d.match_teamA}/logo.png`}/>
                      </label>
                  </li>
                  <p className="text-center">vs</p>
                  <li>
                      <input type="radio" id={d.match_ID+"B"} name={d.match_ID} value={d.match_teamB} class="hidden peer"/>
                      <label for={d.match_ID+"B"} class="inline-flex items-center justify-between w-full px-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:text-blue-500 hover:text-gray-600 hover:bg-gray-100">
                          <div class="block">
                              <div class="text-lg font-semibold me-2">{TeamNameChanger(d.match_teamB)}</div>
                          </div>
                          <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${d.match_teamB}/logo.png`}/>
                      </label>
                  </li>
                </ul>
              ))
            }
            <div className="flex justify-center"><button type='button' onClick={handleSubmit} className="rounded-md text-white bg-blue-500 px-4 py-2 my-2">제출</button></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserMatchPredict;