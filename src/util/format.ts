import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    
});

export const dateFormat = (date: string) => {

    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return day+'/'+month+'/'+year;
}

const currentDate = (date: Date) => {

    const currentDay = date.getDate().toString().length === 1 ? date.getDate().toString().padStart(2, '0') : date.getDate();

    const currentMonth = date.getMonth().toString().length === 1 ? (date.getMonth()+1).toString().padStart(2, '0') : date.getMonth();

    return `${date.getFullYear()}-${currentMonth}-${currentDay}`;

}

export { currentDate };