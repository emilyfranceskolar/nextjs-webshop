/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/

import { Product as PrismaProduct } from "@prisma/client";

export interface CartItem extends PrismaProduct {
  quantity: number;
}

export type Product = PrismaProduct;

/* Lägg till era produkter här */
export const products: Product[] = [
  {
    id: "1",
    slug: "top-1",
    category: "Top",
    articleNumber: "112",
    image: "/images/shirt-1.jpg",
    title: "Vintage T-shirt",
    description:
      "A soft washed T-shirt with a vintage look and feel. Designed with a relaxed fit and subtle fading for everyday comfort and style.",
    price: 200,
  },
  {
    id: "2",
    slug: "top-2",
    category: "Top",
    articleNumber: "113",
    image: "/images/shirt-2.jpg",
    title: "Vintage T-shirt",
    description:
      "Oversized vintage-inspired T-shirt with a loose silhouette and worn-in finish. Perfect for a laid-back, effortless outfit.",
    price: 300,
  },
  {
    id: "3",
    slug: "top-3",
    category: "Top",
    articleNumber: "114",
    image: "/images/shirt-3.jpg",
    title: "Vintage T-shirt",
    description:
      "Retro graphic T-shirt with a faded print and vintage character. Made for those who want a bold yet timeless look.",
    price: 450,
  },
  {
    id: "4",
    slug: "top-4",
    category: "Top",
    articleNumber: "115",
    image: "/images/shirt-4.jpg",
    title: "Vintage T-shirt",
    description:
      "Classic long sleeve top with a vintage touch. Soft fabric and relaxed fit make it ideal for layering or wearing on its own.",
    price: 350,
  },
  {
    id: "5",
    slug: "top-5",
    category: "Top",
    articleNumber: "116",
    image: "/images/shirt-5.jpg",
    title: "Vintage T-shirt",
    description:
      "Comfortable hoodie with a vintage-inspired wash and relaxed fit. Designed for warmth and effortless streetwear style.",
    price: 275,
  },
  {
    id: "6",
    slug: "top-6",
    category: "Top",
    articleNumber: "117",
    image: "/images/shirt-6.jpg",
    title: "Vintage T-shirt",
    description:
      "Timeless crewneck sweatshirt with a soft feel and worn-in look. A perfect blend of comfort and vintage style.",
    price: 275,
  },
  {
    id: "7",
    slug: "top-7",
    category: "Top",
    articleNumber: "118",
    image: "/images/shirt-7.jpg",
    title: "Vintage T-shirt",
    description:
      "A timeless vintage-inspired T-shirt crafted from soft, breathable cotton. Designed with a relaxed fit and a worn-in feel for effortless, everyday style",
    price: 325,
  },
  {
    id: "8",
    slug: "top-8",
    category: "Top",
    articleNumber: "119",
    image: "/images/shirt-8.jpg",
    title: "Vintage T-shirt",
    description:
      "Lightweight tank top with a vintage aesthetic. Designed for warm days with a relaxed and breathable fit.",
    price: 450,
  },
  {
    id: "9",
    slug: "bottom-1",
    category: "Bottoms",
    articleNumber: "889",
    image: "/images/jeans-1.jpg",
    title: "Vintage Jeans",
    description:
      "Classic vintage-inspired jeans with a relaxed fit and authentic worn-in feel. Made from durable denim for everyday comfort and timeless style.",
    price: 799,
  },
  {
    id: "10",
    slug: "bottom-2",
    category: "Bottoms",
    articleNumber: "890",
    image: "/images/jeans-2.jpg",
    title: "Vintage Sweatpants",
    description:
      "Soft vintage-style sweatpants with a relaxed silhouette and faded finish. Designed for comfort with a laid-back, retro vibe.",
    price: 650,
  },
  {
    id: "11",
    slug: "bottom-3",
    category: "Bottoms",
    articleNumber: "891",
    image: "/images/jeans-3.jpg",
    title: "Vintage Shorts",
    description:
      "Lightweight vintage-inspired shorts with a worn-in look. Perfect for warm days with a relaxed fit and effortless style.",
    price: 499,
  },
  {
    id: "12",
    slug: "bottom-4",
    category: "Bottoms",
    articleNumber: "892",
    image: "/images/jeans-4.jpg",
    title: "Vintage Cargo Pants",
    description:
      "Utility-inspired cargo pants with a vintage finish. Featuring multiple pockets and a relaxed fit for both function and style.",
    price: 899,
  },
  {
    id: "13",
    slug: "bottom-5",
    category: "Bottoms",
    articleNumber: "893",
    image: "/images/jeans-5.jpg",
    title: "Vintage Denim Shorts",
    description:
      "Timeless denim shorts with a vintage wash and slightly distressed details. Designed for a casual, effortless look.",
    price: 550,
  },
  {
    id: "14",
    slug: "bottom-6",
    category: "Bottoms",
    articleNumber: "894",
    image: "/images/jeans-6.jpg",
    title: "Vintage Joggers",
    description:
      "Comfortable vintage-style joggers with a soft feel and tapered fit. Perfect for everyday wear with a retro touch.",
    price: 699,
  },
  {
    id: "15",
    slug: "bottom-7",
    category: "Bottoms",
    articleNumber: "895",
    image: "/images/jeans-7.jpg",
    title: "Vintage Linen Pants",
    description:
      "Breathable linen pants with a vintage-inspired design. Lightweight and relaxed for a clean, effortless summer style.",
    price: 750,
  },
  {
    id: "16",
    slug: "bottom-8",
    category: "Bottoms",
    articleNumber: "896",
    image: "/images/jeans-8.jpg",
    title: "Vintage Corduroy Pants",
    description:
      "Retro corduroy pants with a soft texture and vintage feel. Designed with a relaxed fit for timeless everyday wear.",
    price: 820,
  },
  {
    id: "17",
    slug: "shoes-1",
    category: "Shoes",
    articleNumber: "897",
    image: "/images/shoe-1.jpg",
    title: "Vintage Sneakers",
    description:
      "Retro-inspired sneakers with a classic silhouette and worn-in details. Designed for everyday comfort with a timeless streetwear feel.",
    price: 950,
  },
  {
    id: "18",
    slug: "shoes-2",
    category: "Shoes",
    articleNumber: "898",
    image: "/images/shoe-2.jpg",
    title: "Vintage Leather Boots",
    description:
      "Durable leather boots with a vintage finish. Built for both style and longevity with a rugged, timeless look.",
    price: 1299,
  },
  {
    id: "19",
    slug: "shoes-3",
    category: "Shoes",
    articleNumber: "899",
    image: "/images/shoe-3.jpg",
    title: "Vintage Canvas Shoes",
    description:
      "Lightweight canvas shoes with a faded vintage look. Perfect for casual wear with a relaxed and effortless style.",
    price: 699,
  },
  {
    id: "20",
    slug: "shoes-4",
    category: "Shoes",
    articleNumber: "900",
    image: "/images/shoe-4.jpg",
    title: "Vintage Running Shoes",
    description:
      "Old-school running shoes inspired by retro designs. Comfortable cushioning meets a nostalgic athletic aesthetic.",
    price: 999,
  },
  {
    id: "21",
    slug: "shoes-5",
    category: "Shoes",
    articleNumber: "901",
    image: "/images/shoe-5.jpg",
    title: "Vintage Loafers",
    description:
      "Classic loafers with a vintage touch. Sleek design combined with all-day comfort for a refined yet relaxed look.",
    price: 1100,
  },
  {
    id: "22",
    slug: "shoes-6",
    category: "Shoes",
    articleNumber: "902",
    image: "/images/shoe-6.jpg",
    title: "Vintage Sandals",
    description:
      "Minimalist sandals with a vintage-inspired design. Lightweight and breathable for warm-weather comfort.",
    price: 550,
  },
  {
    id: "23",
    slug: "shoes-7",
    category: "Shoes",
    articleNumber: "903",
    image: "/images/shoe-7.jpg",
    title: "Vintage High-Tops",
    description:
      "Retro high-top sneakers with a classic silhouette and worn-in aesthetic. Perfect for a bold vintage street style.",
    price: 1050,
  },
  {
    id: "24",
    slug: "shoes-8",
    category: "Shoes",
    articleNumber: "904",
    image: "/images/shoe-8.jpg",
    title: "Vintage Suede Shoes",
    description:
      "Soft suede shoes with a vintage finish. Designed for a clean yet relaxed look with subtle retro character.",
    price: 980,
  },

  {
    id: "25",
    slug: "accessory-1",
    category: "Accessories",
    articleNumber: "905",
    image: "/images/accessories-1.jpg",
    title: "Vintage Cap",
    description:
      "Classic cap with a vintage wash and relaxed fit. A timeless accessory that adds a casual retro touch.",
    price: 299,
  },
  {
    id: "26",
    slug: "accessory-2",
    category: "Accessories",
    articleNumber: "906",
    image: "/images/accessories-2.jpg",
    title: "Vintage Beanie",
    description:
      "Soft knit beanie with a vintage-inspired look. Designed for warmth and effortless everyday style.",
    price: 249,
  },
  {
    id: "27",
    slug: "accessory-3",
    category: "Accessories",
    articleNumber: "907",
    image: "/images/accessories-3.jpg",
    title: "Vintage Sunglasses",
    description:
      "Retro sunglasses with a timeless frame design. Perfect for adding a bold vintage edge to any outfit.",
    price: 399,
  },
  {
    id: "28",
    slug: "accessory-4",
    category: "Accessories",
    articleNumber: "908",
    image: "/images/accessories-4.jpg",
    title: "Vintage Leather Belt",
    description:
      "Classic leather belt with a worn-in vintage finish. Durable and versatile for everyday wear.",
    price: 450,
  },
  {
    id: "29",
    slug: "accessory-5",
    category: "Accessories",
    articleNumber: "909",
    image: "/images/accessories-5.jpg",
    title: "Vintage Tote Bag",
    description:
      "Spacious tote bag with a vintage-inspired design. Perfect for daily use with a relaxed and stylish feel.",
    price: 550,
  },
  {
    id: "30",
    slug: "accessory-6",
    category: "Accessories",
    articleNumber: "910",
    image: "/images/accessories-6.jpg",
    title: "Vintage Scarf",
    description:
      "Lightweight scarf with a vintage pattern. Adds a subtle retro touch while keeping you comfortable.",
    price: 350,
  },
  {
    id: "31",
    slug: "accessory-7",
    category: "Accessories",
    articleNumber: "911",
    image: "/images/accessories-7.jpg",
    title: "Vintage Watch",
    description:
      "Classic watch with a vintage-inspired design. A timeless accessory that blends style and function.",
    price: 1200,
  },
  {
    id: "32",
    slug: "accessory-8",
    category: "Accessories",
    articleNumber: "912",
    image: "/images/accessories-8.jpg",
    title: "Vintage Backpack",
    description:
      "Durable backpack with a vintage aesthetic. Designed for everyday use with both style and practicality.",
    price: 799,
  },
];
