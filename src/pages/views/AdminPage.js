import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UsersTable from '../../components/UsersTable';
import ShowUserInfo from '../../components/ShowUserInfo';
import PredictionChangeModal from '../../components/PredictionChangeModal';
import TeamChangeModal from '../../components/TeamChangeModal';

function AdminPage() {
  // 예측 모달 열림 여부 상태
  const [isPrdictionOpen, setIsPrdictionOpen] = useState(false);
  // 구단 변경 모달 열림 여부 상태
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  // 주의사항 체크 상태
  const [isChecked, setIsChecked] = useState(false);
  const changeCheck = (e) => {
    if (e.target.checked) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }

  // 전체 사용자 데이터
  const [userData, setUserData] = useState([]);
  // 선택 사용자 데이터
  const [selected, setSelected] = useState({});

  const handleDelete = async () => {
    if(selected){
      const request = axios.post(`/api/users/delete`, { _id: selected._id })
        .then(response => {
          if(!response.data.success) alert('삭제에 실패했어요. 다시 확인해주세요.')
          else {
            alert('사용자를 삭제했어요..');
            window.location.reload();
          }
      });
    } else alert('오류가 발생했어요. 다시 시도해주세요.');
  };    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/all`);
        if(response)
          setUserData(response.data.users);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  console.log(selected)

  if(!userData) return null
  else return(
    <div className="py-5 bg-gray-100">
      <div className="container">
        <div className="row">
          <div className="col-10 my-4 mx-auto d-flex justify-content-center flex-column">
            <p className="font-bold text-2xl">사용자 검색</p>
            <div className='ms-4'>
              <UsersTable tableData={userData} func={(e) => setSelected(e)}/>
            </div>
          </div>
          <div className="col-10 my-4 mx-auto d-flex justify-content-center flex-column">
            <p className="font-bold text-2xl">사용자 데이터 수정</p>
            <div className='ms-4'>
              {
                selected._id
                ? <div> 
                  <ShowUserInfo data={selected}/>
                  <>
                    <div className='flex justify-end'>
                      <button onClick={() => setIsPrdictionOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ms-2 w-4 h-4 inline">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        <p className="inline align-bottom text-xs">예측값 수정</p>
                      </button>
                    </div>
                    <PredictionChangeModal isOpen={isPrdictionOpen} onClose={() => setIsPrdictionOpen(false)} data={selected}/>
                  </>
                  <div className='ms-4 my-2'>
                    <p>선호 구단</p>
                    <div className='ms-4'>
                      <p className="me-1 font-bold text-2xl inline">{selected.team}</p>
                      <button onClick={() => setIsTeamOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ms-2 w-4 h-4 inline">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        <p className="inline align-bottom text-xs">구단 수정</p>
                      </button>
                    </div>
                    <TeamChangeModal isOpen={isTeamOpen} onClose={() => setIsTeamOpen(false)} data={selected}/>
                  </div>
                  <div className='ms-4 mt-10'>
                    <p>사용자 삭제</p>
                    <div className="flex flex-col">
                      <p className='text-center font-bold'>사용자를 삭제하면 취소할 수 없습니다! 작업 시 주의를 요합니다.</p>
                      <div className='text-center'>
                        <input type="checkbox" id="checkDelete" onClick={e => changeCheck(e)}/>
                        <label for="checkDelete" className='ms-2'>주의사항을 이해했습니다.</label>
                      </div>
                      <div className='flex justify-center'><button type='button' onClick={handleDelete} disabled={!isChecked} className={`rounded-md text-white ${isChecked?'bg-pink-500':'bg-gray-500'} px-3 py-2 my-4`}>사용자 삭제</button></div>
                    </div>
                  </div>
                </div>
                : <div><p>상단에서 사용자를 선택하세요.</p></div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage;