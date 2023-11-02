import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class SimpleLineChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';


  render() {

    const { data } = this.props;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={300}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="자책점" stroke="#82ca9d" />
          <Line type="monotone" dataKey="탈삼진" stroke="#0000FF" />
          <Line type="monotone" dataKey="볼넷" stroke="#FFFF00" />
          <Line type="monotone" dataKey="피안타" stroke="#FF0000" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
