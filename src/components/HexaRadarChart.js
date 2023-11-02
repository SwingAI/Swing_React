import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


export default class HexaRadarChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/radar-chart-specified-domain-mfl04';

  render() {

    const { data, player1, player2 } = this.props;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'white' }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar name={player1} dataKey="A" stroke="red" fill="lightcoral" fillOpacity={0.3} />
          <Radar name={player2} dataKey="B" stroke="blue" fill="lightblue" fillOpacity={0.3} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
