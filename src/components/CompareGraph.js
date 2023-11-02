import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

const CompareGraph = ({ data }) => (
    <ResponsiveRadar
        data={data}
        keys={['a', 'b']}
        indexBy="taste"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color', modifiers: [] }}
        gridShape="linear"
        gridLabelOffset={60} // 조정된 값
        dotSize={0}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color', modifiers: [] }}
        colors={{ scheme: 'nivo' }}
        blendMode="multiply"
        motionConfig={{
            mass: 1,
            tension: 170,
            friction: 26,
            clamp: false,
            precision: 0.01,
            velocity: 0,
        }}
    />
);

export default CompareGraph;
