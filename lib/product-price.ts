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

export function getSalePercentage(product: ProductPricing) {
  const currentPrice = getProductPrice(product);
  if (!Number.isFinite(product.price) || currentPrice >= product.price)
    return null;

  return Math.round(((product.price - currentPrice) / product.price) * 100);
}
