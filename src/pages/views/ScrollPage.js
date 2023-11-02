import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ScrollPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    const handleScroll = () => {
      // 스크롤이 발생했을 때 페이지 변경을 수행
      if (window.scrollY > 100) {
        navigate("/login"); // 스크롤 위치가 일정 값 이상이면 "/page2"로 이동
      } else {
        navigate("/seasoninfo"); // 그 외의 경우에는 "/page1"로 이동
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navigate]);

  return (
    <div className="h-screen">
      {/* ScrollPage 컴포넌트의 내용 */}
    </div>
  );
}

export default ScrollPage;
