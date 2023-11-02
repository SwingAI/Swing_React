import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: '안타',
//     리그평균: 3000,
//     선수기록: 2400,
//     amt: 100,
//   },
//   {
//     name: '홈런',
//     리그평균: 3000,
//     선수기록: 1398,
//     amt: 2210,
//   },
//   {
//     name: '타율',
//     리그평균: 2000,
//     선수기록: 3000,
//     amt: 0,
//   },
//   {
//     name: '타점',
//     리그평균: 2780,
//     선수기록: 3908,
//     amt: 2000,
//   },
//   {
//     name: '득점',
//     리그평균: 1890,
//     선수기록: 4800,
//     amt: 2181,
//   },
//   {
//     name: '2루타',
//     리그평균: 2390,
//     선수기록: 3800,
//     amt: 2500,
//   },
//   {
//     name: '3루타',
//     리그평균: 3490,
//     선수기록: 4300,
//     amt: 2100,
//   },
// ];

export default class statchart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {

    const { data } = this.props;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Tooltip labelStyle={{ color: 'black' }} />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="선수기록" fill="#0067a3" />
          <Bar dataKey="리그평균" fill="#525252" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
