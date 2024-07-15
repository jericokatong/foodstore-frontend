export const formatRupiah = (number) => {
  if (isNaN(parseInt(number))) return '';

  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'IDR',
  }).format(number);
};
