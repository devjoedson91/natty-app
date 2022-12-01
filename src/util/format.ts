import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
    
});

export const dateFormat = (date: string) => {

    const getDate = new Date(date);

    return `${(getDate.getDate()+1).toString().padStart(2, '0')}/${getDate.getMonth()+1}/${getDate.getFullYear()}`;
}