import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createProductSchema } from "../data/form";
import { getProductPrice } from "../lib/product-price";
import ProductPrice from "../components/product-price";
import { parseProductForm } from "../app/admin/product/product-data";
import ProductForm from "../app/admin/product/product-form";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

const categories = [
  { id: "glasses", name: "Sunglasses", slug: "sunglasses" },
  { id: "sale", name: "Sale", slug: "sale" },
];
const schema = createProductSchema(categories);
const product = {
  title: "Test glasses",
  description: "Test description",
  image: "/assets/images/test.webp",
  category: ["Sunglasses"],
  price: "899",
  salePrice: "",
};

test("the edit form shows the Sale price field for an existing discounted product", () => {
  const router = {
    bfcacheId: "test",
    back() {},
    forward() {},
    refresh() {},
    hmrRefresh() {},
    push() {},
    replace() {},
    prefetch() {},
  };
  const renderForm = (category: string[]) =>
    renderToStaticMarkup(
      createElement(AppRouterContext.Provider, {
        value: router,
        children: createElement(ProductForm, {
          categories,
          initialValues: {
            ...product,
            id: "existing-product",
            category,
            salePrice: "699",
          },
          action: async () => {},
        }),
      }),
    );
  const discounted = renderForm(["Sunglasses", "Sale"]);
  assert.match(discounted, /data-cy="product-sale-price"/);
  assert.match(discounted, /Regular price \(kr\)/);
  assert.match(discounted, /type="checkbox"[^>]*value="Sunglasses"/);
  assert.match(discounted, /type="checkbox"[^>]*value="Sale"/);
  assert.doesNotMatch(
    renderForm(["Sunglasses"]),
    /data-cy="product-sale-price"/,
  );
});

test("regular products and older carts need no sale price", () => {
  assert.equal(schema.safeParse(product).success, true);
  assert.equal(getProductPrice({ price: 899 }), 899);
  assert.equal(getProductPrice({ price: 899, salePrice: null }), 899);
});

test("editing an existing product adds, updates and removes Sale without losing other categories", () => {
  const form = new FormData();
  for (const [key, value] of Object.entries(product)) {
    if (!Array.isArray(value)) form.set(key, value);
  }
  form.set("id", "existing-product");
  form.append("category", "Sunglasses");
  form.append("category", "Sale");
  assert.throws(() => parseProductForm(form, categories));
  form.set("salePrice", "699");
  const discounted = parseProductForm(form, categories);
  assert.equal(discounted.id, "existing-product");
  assert.equal(discounted.salePrice, 699);
  assert.deepEqual(discounted.category, ["Sunglasses", "Sale"]);
  form.set("salePrice", "599");
  assert.equal(parseProductForm(form, categories).salePrice, 599);
  form.set("category", "Sunglasses");
  const regular = parseProductForm(form, categories);
  assert.equal(regular.salePrice, null);
  assert.deepEqual(regular.category, ["Sunglasses"]);
});

test("main's checkbox choices work before categories are created in the database", () => {
  assert.equal(
    createProductSchema([]).safeParse({
      ...product,
      category: ["Bestseller", "Reading Glasses", "Sunglasses", "Sale"],
      salePrice: "699",
    }).success,
    true,
  );
});

test("existing custom categories remain valid alongside Sale", () => {
  const withCustom = [
    ...categories,
    { id: "custom", name: "Vintage", slug: "vintage" },
  ];
  assert.equal(
    createProductSchema(withCustom).safeParse({
      ...product,
      category: ["Vintage", "Sale"],
      salePrice: "699",
    }).success,
    true,
  );
});

test("a product can keep its ordinary category while also being on sale", () => {
  const values = schema.parse({
    ...product,
    category: ["Sunglasses", "Sale"],
    salePrice: "699.50",
  });
  assert.deepEqual(values.category, ["Sunglasses", "Sale"]);
  assert.equal(
    getProductPrice({ price: 899, salePrice: Number(values.salePrice) }),
    699.5,
  );
});

test("Sale requires a finite positive discount below the regular price", () => {
  for (const salePrice of [
    undefined,
    "",
    "0",
    "-1",
    "899",
    "900",
    "Infinity",
    "NaN",
    "abc",
  ]) {
    const result = schema.safeParse({
      ...product,
      category: ["Sale"],
      salePrice,
    });
    assert.equal(
      result.success,
      false,
      `Accepted invalid sale price: ${salePrice}`,
    );
    if (!result.success)
      assert.ok(
        result.error.issues.some((issue) => issue.path[0] === "salePrice"),
      );
  }
});

test("regular price must also be finite and positive", () => {
  for (const price of ["", "0", "-1", "Infinity", "NaN"]) {
    assert.equal(schema.safeParse({ ...product, price }).success, false);
  }
});

test("categories must exist and at least one must be selected", () => {
  assert.equal(schema.safeParse({ ...product, category: [] }).success, false);
  assert.equal(
    schema.safeParse({ ...product, category: ["unknown"] }).success,
    false,
  );
});

test("invalid stored discounts never become checkout prices", () => {
  for (const salePrice of [0, -1, 899, 1000, NaN, Infinity]) {
    assert.equal(getProductPrice({ price: 899, salePrice }), 899);
  }
});

test("cart totals use discounted prices and quantities", () => {
  const items = [
    { price: 899, salePrice: 699.5, quantity: 2 },
    { price: 399, quantity: 1 },
  ];
  assert.equal(
    items.reduce(
      (total, item) => total + getProductPrice(item) * item.quantity,
      0,
    ),
    1798,
  );
});

test("sale display shows the regular price in red and crossed out", () => {
  const html = renderToStaticMarkup(
    createElement(ProductPrice, { price: 899, salePrice: 699 }),
  );
  assert.match(html, /data-cy="product-price">699 kr/);
  assert.match(html, /data-cy="product-sale-badge"[^>]*>Sale<\/span>/);
  assert.match(html, /<del[^>]*class="text-red-600">899 kr<\/del>/);
  const regular = renderToStaticMarkup(
    createElement(ProductPrice, { price: 899 }),
  );
  assert.doesNotMatch(regular, /<del|product-sale-badge/);
  const invalid = renderToStaticMarkup(
    createElement(ProductPrice, { price: 899, salePrice: 999 }),
  );
  assert.doesNotMatch(invalid, /<del|product-sale-badge/);
});

test("server form parsing validates categories, saves discounts and clears removed sales", () => {
  const form = new FormData();
  for (const [key, value] of Object.entries(product)) {
    if (!Array.isArray(value)) form.set(key, value);
  }
  form.append("category", "Sunglasses");
  form.append("category", "Sale");
  form.append("category", "Sale");
  form.set("salePrice", "699");
  const discounted = parseProductForm(form, categories);
  assert.equal(discounted.price, 899);
  assert.equal(discounted.salePrice, 699);
  assert.deepEqual(discounted.category, ["Sunglasses", "Sale"]);

  form.set("salePrice", "999");
  assert.throws(() => parseProductForm(form, categories));

  form.delete("category");
  form.append("category", "Sunglasses");
  assert.equal(parseProductForm(form, categories).salePrice, null);

  form.append("category", "unknown");
  assert.throws(() => parseProductForm(form, categories));
});
