import { ResponsiveBar } from '@nivo/bar'

const MatchResultBarGraph = ({ data, isLeft }) => (
    <div style={{ width: '100%', height: '225px',}}>
        <ResponsiveBar
            data={data}
            keys={['v', 'e']}
            indexBy="values"
            margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
            padding={0.3}
            maxValue={20}
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

export default MatchResultBarGraph;