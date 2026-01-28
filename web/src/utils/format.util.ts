export const formattedPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID").format(price);
};
