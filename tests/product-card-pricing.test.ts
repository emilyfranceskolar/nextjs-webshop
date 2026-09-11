import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ProductPrice from "../components/product-price";
import ProductSaleBadge from "../components/product-sale-badge";
import { getSalePercentage } from "../lib/product-price";

test("sale percentages are calculated from the current discount", () => {
  assert.equal(getSalePercentage({ price: 1000, salePrice: 750 }), 25);
  assert.equal(getSalePercentage({ price: 899, salePrice: 699 }), 22);
  assert.equal(getSalePercentage({ price: 679, salePrice: 645 }), 5);
  for (const salePrice of [undefined, null, 0, -1, 899, 999, NaN, Infinity]) {
    assert.equal(getSalePercentage({ price: 899, salePrice }), null);
    assert.equal(
      renderToStaticMarkup(
        createElement(ProductSaleBadge, { price: 899, salePrice }),
      ),
      "",
    );
  }
});

test("card pricing shows the original price first and only one percentage badge", () => {
  const prices = renderToStaticMarkup(
    createElement(ProductPrice, {
      price: 899,
      salePrice: 699,
      variant: "card",
    }),
  );
  const badge = renderToStaticMarkup(
    createElement(ProductSaleBadge, {
      price: 899,
      salePrice: 699,
    }),
  );
  assert.ok(
    prices.indexOf('data-cy="product-regular-price"') <
      prices.indexOf('data-cy="product-price"'),
  );
  assert.match(prices, /text-red-600/);
  assert.doesNotMatch(prices, /product-sale-badge/);
  assert.match(badge, /SALE 22%/);
  assert.equal(
    (prices + badge).match(/data-cy="product-sale-badge"/g)?.length,
    1,
  );
});

test("regular card prices have neither a crossed-out price nor a sale badge", () => {
  const html = renderToStaticMarkup(
    createElement(ProductPrice, { price: 899, variant: "card" }),
  );
  assert.match(html, /899 kr/);
  assert.doesNotMatch(html, /<del|product-sale-badge|text-red-600/);
});
