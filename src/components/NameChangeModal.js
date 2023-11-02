import React from "react";
import axios from "axios";

const NameChangeModal = ({ isOpen, onClose, data }) => {
    const [nickname, setNickname] = React.useState("");
    const [nicknameMessage, setNicknameMessage] = React.useState("2~16자의 한글, 영문 대·소문자, 숫자를 사용하세요.");
    const [isNickname, setIsNickname] = React.useState(false);

    const onChangeNickname = (e) => {
        const currentNickname = e.target.value;
        setNickname(currentNickname);
        const nicknameRegExp = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$/;
     
        if (!nicknameRegExp.test(currentNickname)) {
            setNicknameMessage("2~16자의 한글, 영문 대·소문자, 숫자를 사용하세요.");
            setIsNickname(false);
        } else {
            setNicknameMessage("사용 가능한 닉네임 입니다.");
            setIsNickname(true);
        }
    };

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    };

    const handleSubmit = async () => {
        if(isNickname){
            const request = axios.post(`/api/users/nicknamechange`, { _id: data._id, nickname : nickname })
                .then(response => {
                    if(!response.data.success) alert('수정에 실패했어요. 다시 확인해주세요.')
                    else {
                        alert("닉네임을 변경했어요.");
                        onClose();
                        window.location.reload();
                    }
            });
        } else alert('닉네임을 다시 확인해주세요.');
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
                            <p>닉네임 변경</p>
                        </h2>
                        <hr className="mb-4"/>
                    </div>
                    <div className="mx-2">
                        <div className="mb-4">
                            <label htmlFor="oldNickname" className="block text-sm font-medium leading-6 text-gray-900">
                                기존 닉네임
                            </label>
                            <div className="mt-2">
                                <input
                                    id="oldNickname"
                                    name="oldNickname"
                                    type="nickname"
                                    value={data.nickname}
                                    onChange={onChangeNickname}
                                    disabled
                                    className="block w-full rounded-md border-2 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="newNickname" className="block text-sm font-medium leading-6 text-gray-900">
                                새 닉네임
                            </label>
                            <div className="mt-2">
                                <input
                                    id="newNickname"
                                    name="newNickname"
                                    type="nickname"
                                    autoComplete="on"
                                    onChange={onChangeNickname}
                                    required
                                    className="block w-full rounded-md border-2 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="mt-2 ms-1 mb-3 text-start text-sm text-gray-500">
                                {nicknameMessage}
                            </p>
                        </div>
                        <div className="flex justify-center"><button type='button' onClick={handleSubmit} className="rounded-md text-white bg-blue-500 px-4 py-2 my-2">닉네임 수정</button></div>
                    </div>
                </div>
            </div>
        </div>
  )
}
export default NameChangeModal;