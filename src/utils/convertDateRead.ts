import dayjs from "dayjs";

export const convertDateRead = (date: string) => {

    const lastReadingDate = dayjs(date)
        const today = dayjs()
    
        let formattedDate: string;
    
        if (lastReadingDate.isSame(today, 'day')) {
            formattedDate = 'Hoje';
        } else {
            const daysDiff = today.diff(lastReadingDate, 'day');
            const monthsDiff = today.diff(lastReadingDate, 'month');
            const yearsDiff = today.diff(lastReadingDate, 'year');
    
            if (daysDiff < 30) {
                formattedDate = `Há ${daysDiff} dia${daysDiff > 1 ? 's' : ''}`;
            } else if (monthsDiff < 12) {
                formattedDate = `Há ${monthsDiff} mês${monthsDiff > 1 ? 'es' : ''}`;
            } else {
                formattedDate = `Há ${yearsDiff} ano${yearsDiff > 1 ? 's' : ''}`;
            }
    }
    console.log('Formatted Date na função:', formattedDate);
    return formattedDate;
}