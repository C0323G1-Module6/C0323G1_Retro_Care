export const getDiscount = (price) => {
  let discountPercentage;
  switch (true) {
    case price < 20000:
      discountPercentage = 5;
      break;
    case price < 50000:
      discountPercentage = 10;
      break;
    case price < 100000:
      discountPercentage = 15;
      break;
    default:
      discountPercentage = 20; // Default discount percentage if price exceeds 150,000
  }
  return discountPercentage;
};
