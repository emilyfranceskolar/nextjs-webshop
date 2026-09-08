type ProductPricing = {
  price: number;
  salePrice?: number | null;
};

export function getProductPrice(product: ProductPricing) {
  const { price, salePrice } = product;
  return salePrice != null &&
    Number.isFinite(salePrice) &&
    salePrice > 0 &&
    salePrice < price
    ? salePrice
    : price;
}
