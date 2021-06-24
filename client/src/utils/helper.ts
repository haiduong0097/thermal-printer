export const formatToCurrency = (amount: string) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // $1234.00
  const currency = formatter.format(Number(amount));

  return currency.substring(1, currency.length - 3).concat(" VND");
};
