const FormattedDate = (delta) => {
    const today = new Date();

    if (!delta)
        return `${today.getFullYear()}-${('0' + (today.getMonth()+1)).slice(-2)}-${('0' + (today.getDate() )).slice(-2)}`;
    else {
        const day = new Date(today.setDate(today.getDate()-delta));
        return `${day.getFullYear()}-${('0' + (day.getMonth()+1)).slice(-2)}-${('0' + (day.getDate())).slice(-2)}`;
    }
}

export default FormattedDate;