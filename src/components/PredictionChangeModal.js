import React, { useEffect } from "react";
import axios from "axios";

const PredictionChangeModal = ({ isOpen, onClose, data }) => {
    const [prediction, setPrediction] = React.useState("");
    const [correctPrediction, setCorrectPrediction] = React.useState("");

    useEffect(() => {
        setPrediction(data.prediction);
        setCorrectPrediction(data.correctPrediction);
    }, [data]);

    const onChangePrediction = (e) => {
        setPrediction(e.target.value);
    };
    const onChangeCorrectPrediction = (e) => {
        setCorrectPrediction(e.target.value);
    };

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    };

    const handleSubmit = async () => {
        if(prediction && correctPrediction){
            const request = axios.post(`/api/users/addpoint`, { _id: data._id, prediction: prediction, correctPrediction: correctPrediction })
                .then(response => {
                    if(!response.data.success) alert('수정에 실패했어요. 다시 확인해주세요.')
                    else {
                        alert("예측값을 변경했어요.");
                        onClose();
                        window.location.reload();
                    }
            });
        } else alert('값을 다시 확인해주세요.');
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
                            <label htmlFor="prediction" className="block text-sm font-medium leading-6 text-gray-900">
                                전체 예측
                            </label>
                            <div className="mt-2">
                                <input
                                    id="prediction"
                                    name="prediction"
                                    value={prediction}
                                    onChange={onChangePrediction}
                                    required
                                    className="block w-full rounded-md border-2 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="correctPrediction" className="block text-sm font-medium leading-6 text-gray-900">
                                맞춘 예측
                            </label>
                            <div className="mt-2 mb-4">
                                <input
                                    id="correctPrediction"
                                    name="correctPrediction"
                                    value={correctPrediction}
                                    onChange={onChangeCorrectPrediction}
                                    required
                                    className="block w-full rounded-md border-2 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center"><button type='button' onClick={handleSubmit} className="rounded-md text-white bg-blue-500 px-4 py-2 my-2">예측값 수정</button></div>
                    </div>
                </div>
            </div>
        </div>
  )
}
export default PredictionChangeModal;