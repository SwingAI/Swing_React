import React from "react";

function MatchResultTable({ data, team }) {
    // 타격
    let bat_K = [ '타석', '타수', '득점', '안타', '홈런', 
                '타점', '볼넷', '사구', '삼진', '땅볼', 
                '뜬공', '투구수', '병살', '잔루', '타율', 
                'OPS', 'LI', 'WPA', 'RE24' ];
    let bat_E = [ 'TPA', 'AB', 'R', 'H', 'HR', 
                'RBI', 'BB', 'HBP', 'SO', 'GO', 
                'FO', 'PIT', 'GDP', 'LOB', 'AVG', 
                'OPS', 'LI', 'WPA', 'RE24' ];
    let bat_val = [];
    for (let i = 0; i < bat_K.length; i++) {
        if (bat_E[i] == 'AVG')
            bat_val.push((data[`bat_${team}_${bat_E[i]}`]).toFixed(3));
        else
            bat_val.push(data[`bat_${team}_${bat_E[i]}`]);
    }
    // 투구
    let pit_K = ['투구이닝', '자책', '삼진', '승계주자', '승계주자득점허용', 
                '병살', 'ERA', 'WHIP', 'LI' ];
    let pit_E = ['IP', 'ER', 'S', 'IR', 'IS', 
                'GSC', 'ERA', 'WHIP', 'LI' ];
    let pit_val = [];
    for (let i = 0; i < pit_K.length; i++) {
        pit_val.push(data[`pit_${team}_${pit_E[i]}`]);
    }
    // 수비    
    let def_K = [ '수비이닝', '아웃', '보조', '실책', '패스트볼', '폭투', '병살' ];
    let def_E = [ 'IP', 'PO', 'A', 'E', '_P', '_A', 'GDP' ];
    let def_val = [];
    for (let i = 0; i < def_K.length; i++) {
        if (def_E[i] == 'IP')
            def_val.push((data[`def_${team}_${def_E[i]}`]/9).toFixed(1));
        else
            def_val.push(data[`def_${team}_${def_E[i]}`]);
    }

    return (
        <div className="col-10 mx-auto my-4 text-center">
            <div className="flex items-center">
                <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${data[`match_team${team}`]}/logo.png`} style={{height: '40px'}}/>
                <p className="ms-2 mt-3 text-start text-xl">{data[`match_team${team}`]}</p>
            </div>
            <div className="mt-2 mb-4">
                <div>
                    <p className="text-start ms-1 mb-1">타격기록</p>
                    <div className="overflow-x-auto mb-2">
                        <table className="border mb-3" style={{ whiteSpace: 'nowrap', width: '100%' }}>
                            <thead>
                                <tr className="bg-blue-400 text-white text-center text-sm">
                                    {bat_K.map((item) => (
                                        <th width={`100/${bat_K.length}%`}>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-center text-sm'>
                                    {bat_val.map((item) => (
                                        <td width={`100/${bat_val.length}%`}>{item}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <p className="text-start ms-1 mb-1">투구기록</p>
                    <div className="overflow-x-auto mb-2">
                        <table className="border mb-3" style={{ whiteSpace: 'nowrap', width: '100%' }}>
                            <thead>
                                <tr className="bg-blue-400 text-white text-center text-sm">
                                    {pit_K.map((item) => (
                                        <th width={`100/${pit_K.length}%`}>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-center text-sm'>
                                    {pit_val.map((item) => (
                                        <td width={`100/${pit_val.length}%`}>{item}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <p className="text-start ms-1 mb-1">수비기록</p>
                    <div className="overflow-x-auto mb-2">
                        <table className="border mb-3" style={{ whiteSpace: 'nowrap', width: '100%' }}>
                            <thead>
                                <tr className="bg-blue-400 text-white text-center text-sm">
                                    {def_K.map((item) => (
                                        <th width={`100/${def_K.length}%`}>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-center text-sm'>
                                    {def_val.map((item) => (
                                        <td width={`100/${def_val.length}%`}>{item}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatchResultTable;
