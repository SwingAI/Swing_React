const ScoreBox = ({ data }) => {
    // 데이터 저장
    let scoreA = [];
    let scoreB = [];
    for (let i = 1; i < 19; i++) {
        let tmpA = data[`A_inning_${i}`];
        let tmpB = data[`B_inning_${i}`];

        if(tmpA !== 'NaN')
            scoreA.push(tmpA);
        if(tmpB !== 'NaN')
            scoreB.push(tmpB);
    }

    return (
        <div className="col-11 mx-auto text-center">
            <div className="overflow-x-auto">
                <table className="border" style={{ whiteSpace: 'nowrap', width: '100%' }}>
                    <thead>
                        <tr className="bg-blue-400 text-white text-center text-sm">
                            {scoreA.map((item, index) => (
                                <th width={`100/${scoreA.length+1}%`}>{index+1}</th>
                            ))}
                            <th width={`100/${scoreA.length+1}%`}>R</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center text-sm'>
                            {scoreA.map((item) => (
                                <td width={`100/${scoreA.length+1}%`}>{item}</td>
                            ))}
                            <td width={`100/${scoreA.length+1}%`}>{data.score_A}</td>
                        </tr>
                        <tr className='text-center text-sm'>
                            {scoreB.map((item) => (
                                <td width={`100/${scoreB.length+1}%`}>{item}</td>
                            ))}
                            <td width={`100/${scoreB.length+1}%`}>{data.score_B}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>  
    )
}
export default ScoreBox;