import React, { useState } from "react";
import axios from "axios";

import TeamSelect from "./TeamSelect";

const TeamChangeModal = ({ isOpen, onClose, data }) => {
    const [team, setTeam] = useState([]);

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    };
    const handleSubmit = async () => {
        if(team){
            const request = axios.post(`/api/users/teamchange`, { _id: data._id, team : team })
                .then(response => {
                    if(!response.data.success) alert('수정에 실패했어요. 다시 확인해주세요.')
                    else {
                        alert('선호 구단을 변경했어요.');
                        onClose();
                        window.location.reload();
                    }
            });
        } else alert('선택한 팀을 다시 확인해주세요.');
    };    

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id='wrapper' onClick={handleClose}>
            <div className="w-1/2 flex flex-col">
                <button className='text-white text-xl place-self-end' onClick={() => onClose()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="bg-white p-4 rounded">
                    <div className="ms-2 mb-2 text-start">
                        <h2 className="text-lg font-bold">
                            <p>선호 구단 변경</p>
                        </h2>
                        <hr className="mb-4"/>
                    </div>
                    <div className="mx-2">
                        <TeamSelect onChange={(e) => setTeam(e)}/>
                        <div className="flex justify-center"><button type='button' onClick={handleSubmit} className="rounded-md text-white bg-blue-500 px-4 py-2 my-2">구단 변경</button></div>
                    </div>
                </div>
            </div>
        </div>
  )
}
export default TeamChangeModal;