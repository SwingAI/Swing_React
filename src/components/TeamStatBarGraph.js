import { ResponsiveBar } from '@nivo/bar'

const TeamStatBarGraph = ({ data, isLeft }) => (
    <div style={{ width: '70%', height: '150px' }}>
        <ResponsiveBar
            data={data}
            keys={['v', 'e']}
            indexBy="values"
            margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
            padding={0.35}
            maxValue={1}
            layout="horizontal"
            reverse={isLeft}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={isLeft?['pink', '#f3f4f6']:['skyblue', '#f3f4f6']}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            enableLabel={false}
            enableGridY={false}
            isInteractive={false}
            role="application"
        />
    </div>
)

export default TeamStatBarGraph;