import React, { useState, useEffect } from "react";

function HorizontalBarChart({ value }) {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // value 값이 변경될 때마다 barWidth 상태를 변경하여 효과를 줍니다.
    setBarWidth(value);
  }, [value]);

  return (
    <div className="w-full bg-gray-300 h-8 rounded-lg overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${barWidth}%` }}
      ></div>
    </div>
  );
}

export default HorizontalBarChart;
