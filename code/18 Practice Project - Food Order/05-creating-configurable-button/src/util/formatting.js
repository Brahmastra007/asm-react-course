// Defining a currency formatter for displaying numbers in currency format of specific country
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
