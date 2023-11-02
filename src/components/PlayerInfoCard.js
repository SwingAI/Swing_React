import React, { useState } from "react";
import PlayerModal from "./PlayerModal";

function PlayerInfocard({ id, name, team }) {
  const [isHovered, setIsHovered] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부 상태

  const openModal = () => {
    if (id) {
      setIsModalOpen(true);
      document.body.style.overflow = "auto"; // 스크롤 막기
    } else {
      alert("선수를 선택해주세요!"); // 수정된 부분: 선수가 선택되지 않았을 때 경고창
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // 스크롤 허용
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={` rounded-lg shadow-md min-w-[200px] relative ${isHovered ? "hovered border-black scale-105" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`w-auto h-auto transition-opacity ${isHovered ? "opacity-50" : ""}`}>
          <img
            src={`https://github.com/coreswing/swingimages/blob/main/${team}/${name?.replace(/\*/g, '')}.png?raw=true`}
            alt="Player"
            onError={(e) => {
              e.target.src = `https://raw.githubusercontent.com/coreswing/swingimages/main/noimg.png`; // 기본 이미지 경로로 변경해주세요
            }}
          />
          {isHovered && (
            <div>
              <button
                onClick={openModal}
                className="bg-transparent border border-black text-black px-4 py-2 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                프로필
              </button>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <PlayerModal id={id} isOpen={isModalOpen} onClose={closeModal} />} {/* 모달 컴포넌트 */}
    </div>
  );
}

export default PlayerInfocard;
