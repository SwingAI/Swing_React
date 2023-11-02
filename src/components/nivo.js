import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

const MyResponsiveRadar = ({ data }) => (
  <ResponsiveRadar
    data={data}
    keys={['chardonay']} // Only include the keys you want to show
    indexBy="taste"
    valueFormat=">-.2f"
    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
    borderColor={{ from: 'color' }}
    gridLabelOffset={36}
    dotSize={10}
    dotColor={{ theme: 'background' }}
    dotBorderWidth={2}
    colors={['red']} // Change the color to red
    blendMode="multiply"
    motionConfig="wobbly"
    legends={[
      {
        anchor: 'top-left',
        direction: 'column',
        translateX: -50,
        translateY: -40,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: '#999',
        symbolSize: 12,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000'
            }
          }
        ]
      }
    ]}
  />
);

export default MyResponsiveRadar;
