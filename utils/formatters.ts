
export const formatPrice = (price: number, currency: string = 'TRY') => {
    if (isNaN(price)) {
        return 'Fiyat Belirtilmemiş';
    }
    return new Intl.NumberFormat('tr-TR', { 
        style: 'currency', 
        currency: currency, 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};
