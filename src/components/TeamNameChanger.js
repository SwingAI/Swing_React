export default function TeamNameChanger(oldName){
    let newName = oldName
    switch (oldName){
        // 단 -> 장
        case 'KIA':
            newName += ' 타이거즈';
            break;
        case 'KT':
            newName += ' 위즈';
            break;
        case 'LG':
            newName += ' 트윈스';
            break;
        case 'NC':
            newName += ' 다이노스';
            break;
        case 'SSG':
            newName += ' 랜더스';
            break;
        case '두산':
            newName += ' 베어스';
            break;
        case '롯데':
            newName += ' 자이언츠';
            break;
        case '삼성':
            newName += ' 라이온즈';
            break;
        case '키움':
            newName += ' 히어로즈';
            break;
        case '한화':
            newName += ' 이글스';
            break;
        // 장 -> 단
        case 'KIA 타이거즈':
            newName = 'KIA';
            break;
        case 'KT 위즈':
            newName = 'KT';
            break;
        case 'LG 트윈스':
            newName = 'LG';
            break;
        case 'NC 다이노스':
            newName = 'NC';
            break;
        case 'SSG 랜더스':
            newName = 'SSG';
            break;
        case '두산 베어스':
            newName = '두산';
            break;
        case '롯데 자이언츠':
            newName = '롯데';
            break;
        case '삼성 라이온즈':
            newName = '삼성';
            break;
        case '키움 히어로즈':
            newName = '키움';
            break;
        case '한화 이글스':
            newName = '한화';
            break;
        default:
            break;
    }
    return(newName);
}