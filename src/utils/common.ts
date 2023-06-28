export type Currency = 'EUR' | 'GBP' | 'USD';

export enum CurrencyValue {
  EUR = '€',
  GBP = '£',
  USD = '$',
}
/**
 *
 * @param value: value convert
 * @param currencyCode: currency
 * @returns price with currency
 */

export const getSymbolCurrency = (value: number | string, currencyCode: Currency = 'USD') => {
  return (
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(Number(value)) ||
    `${currencyCode === 'EUR' ? CurrencyValue.EUR : CurrencyValue.USD}${value}`
  );
};

/**
 *
 * @param params: query string => { search: 'search', limit: 2, category: 'Phone' }
 * @returns queryString with value of key !== null
 */
export const formatQueryString = (params: Object) =>
  Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null && v !== ''));
