import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default class PlayerCircle extends PureComponent {
  render() {
    // 외부에서 전달받은 데이터
    const { data, COLORS } = this.props;

    return (
      <div className="flex">
        <ResponsiveContainer width="70%" height={180}>
          <PieChart onMouseEnter={this.onPieEnter}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col items-start ml-2">
          {data.map((entry, index) => (
            <span className="flex mt-3" key={`legend-${index}`} style={{ color: 'white' }}>
              <div className="w-4 h-4 mr-1 mt-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              {`${entry.name}`}
            </span>
          ))}
        </div>
      </div>
    );
  }
}
