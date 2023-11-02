import React from "react";

const TeamSelect = ({ onChange }) => {
    const teamList = [ ['SSG 랜더스', '키움 히어로즈', 'LG 트윈스'], 
                        ['KT 위즈', 'KIA 타이거즈', 'NC 다이노스'], 
                        ['삼성 라이온즈', '롯데 자이언츠', '두산 베어스'], 
                        ['한화 이글스']
    ];

    return (
        <div className="btn-group row" role="group" aria-label="Basic radio toggle button group">
            {teamList.map((g) => (
                <div>
                    {g.map((t)=>(
                        <>
                            <input type="radio" className="btn-check" name="btnradio" id={t} autocomplete="off" onClick={(e) => onChange(e.currentTarget.id)}/>
                            <label className="btn btn-outline-secondary w-1/3" for={t} style={{border: 0}}>
                                <img src={`https://raw.githubusercontent.com/coreswing/swingimages/main/${t}/logo.png`} className="mx-auto" style={{width: 60}}/>
                                <p className='my-0'>{t}</p>
                            </label>
                        </>
                    ))}
                </div>
            ))}
        </div>
    )
}
export default TeamSelect;