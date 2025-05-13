// £125.00
const convertToCurrency = (value) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(value);
};

export default convertToCurrency;
