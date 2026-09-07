import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createProductSchema } from "../data/form";
import { getProductPrice } from "../lib/product-price";
import ProductPrice from "../components/product-price";
import { parseProductForm } from "../app/admin/product/product-data";

const categories = [
  { id: "glasses", name: "Sunglasses", slug: "sunglasses" },
  { id: "sale", name: "Sale", slug: "sale" },
];
const schema = createProductSchema(categories);
const product = {
  title: "Test glasses",
  description: "Test description",
  image: "/assets/images/test.webp",
  categoryIds: ["glasses"],
  price: "899",
  salePrice: "",
};

test("regular products and older carts need no sale price", () => {
  assert.equal(schema.safeParse(product).success, true);
  assert.equal(getProductPrice({ price: 899 }), 899);
  assert.equal(getProductPrice({ price: 899, salePrice: null }), 899);
});

test("editing accepts a typed category and still validates Sale prices", () => {
  const editSchema = createProductSchema(categories, true);
  const edited = { ...product, categoryIds: [], category: "New category" };
  assert.equal(editSchema.safeParse(edited).success, true);
  assert.equal(editSchema.safeParse({ ...edited, category: "" }).success, true);
  assert.equal(
    editSchema.safeParse({ ...edited, category: " Sale " }).success,
    false,
  );
  assert.equal(
    editSchema.safeParse({ ...edited, category: " sale ", salePrice: "699" })
      .success,
    true,
  );

  const form = new FormData();
  for (const [key, value] of Object.entries(edited)) {
    if (!Array.isArray(value)) form.set(key, value);
  }
  form.set("category", "Sale");
  form.set("salePrice", "699");
  assert.equal(parseProductForm(form, categories, true).salePrice, 699);
  form.set("category", "Sunglasses");
  assert.equal(parseProductForm(form, categories, true).salePrice, null);
});

test("a product can keep its ordinary category while also being on sale", () => {
  const values = schema.parse({
    ...product,
    categoryIds: ["glasses", "sale"],
    salePrice: "699.50",
  });
  assert.deepEqual(values.categoryIds, ["glasses", "sale"]);
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
      categoryIds: ["sale"],
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
  assert.equal(
    schema.safeParse({ ...product, categoryIds: [] }).success,
    false,
  );
  assert.equal(
    schema.safeParse({ ...product, categoryIds: ["unknown"] }).success,
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
  assert.match(html, /<del[^>]*class="text-red-600">899 kr<\/del>/);
  const regular = renderToStaticMarkup(
    createElement(ProductPrice, { price: 899 }),
  );
  assert.doesNotMatch(regular, /<del/);
});

test("server form parsing validates categories, saves discounts and clears removed sales", () => {
  const form = new FormData();
  for (const [key, value] of Object.entries(product)) {
    if (!Array.isArray(value)) form.set(key, value);
  }
  form.append("categoryIds", "glasses");
  form.append("categoryIds", "sale");
  form.append("categoryIds", "sale");
  form.set("salePrice", "699");
  const discounted = parseProductForm(form, categories);
  assert.equal(discounted.price, 899);
  assert.equal(discounted.salePrice, 699);
  assert.deepEqual(discounted.categoryIds, ["glasses", "sale"]);

  form.set("salePrice", "999");
  assert.throws(() => parseProductForm(form, categories));

  form.delete("categoryIds");
  form.append("categoryIds", "glasses");
  assert.equal(parseProductForm(form, categories).salePrice, null);

  form.append("categoryIds", "unknown");
  assert.throws(() => parseProductForm(form, categories));
});
