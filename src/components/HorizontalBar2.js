import React, { useState, useEffect } from "react";

function HorizontalBarChart2({ value }) {
  const [barWidth, setBarWidth] = useState(100 - value); // 파란색 바가 디폴트로 오른쪽에서 100% 차있음

  useEffect(() => {
    // value 값이 변경될 때마다 barWidth 상태를 변경하여 효과를 줍니다.
    setBarWidth(100 - value); // 파란색 바의 크기를 업데이트하여 파란색이 오른쪽에서부터 차오르게 변경
  }, [value]);

  return (
    <div className="w-full bg-gray-300 h-8 rounded-lg overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{
          width: `${barWidth}%`,
          marginLeft: `${100 - barWidth}%`, // 파란색 바의 크기에 따라 marginLeft 설정
        }}
      ></div>
    </div>
  );
}

export default HorizontalBarChart2;
