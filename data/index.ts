/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/

import type { Product as PrismaProduct } from "@/generated/prisma";

export interface CartItem extends PrismaProduct {
  quantity: number;
}

export type Product = PrismaProduct & {
  category: string;
};

/* Lägg till era produkter här */
export const products: Product[] = [
  {
    id: "1",
    slug: "top-1",
    category: "Tops",
    articleNumber: "112",
    image: "/assets/images/top-1.jpg",
    title: "Vintage T-shirt",
    description:
      "A soft washed T-shirt with a vintage look and feel. Designed with a relaxed fit and subtle fading for everyday comfort and style.",
    price: 200,
  },
  {
    id: "2",
    slug: "top-2",
    category: "Tops",
    articleNumber: "113",
    image: "/assets/images/top-2.jpg",
    title: "Vintage T-shirt",
    description:
      "Oversized vintage-inspired T-shirt with a loose silhouette and worn-in finish. Perfect for a laid-back, effortless outfit.",
    price: 300,
  },
  {
    id: "3",
    slug: "top-3",
    category: "Tops",
    articleNumber: "114",
    image: "/assets/images/top-3.jpg",
    title: "Vintage T-shirt",
    description:
      "Retro graphic T-shirt with a faded print and vintage character. Made for those who want a bold yet timeless look.",
    price: 450,
  },
  {
    id: "4",
    slug: "top-4",
    category: "Tops",
    articleNumber: "115",
    image: "/assets/images/top-4.jpg",
    title: "Vintage T-shirt",
    description:
      "Classic T-shirt with a vintage touch. Soft fabric and relaxed fit make it ideal for layering or wearing on its own.",
    price: 350,
  },
  {
    id: "5",
    slug: "top-5",
    category: "Tops",
    articleNumber: "116",
    image: "/assets/images/top-5.jpg",
    title: "Vintage T-shirt",
    description:
      "Comfortable T-shirt with a vintage-inspired wash and relaxed fit. Designed for effortless street wear style.",
    price: 275,
  },
  {
    id: "6",
    slug: "top-6",
    category: "Tops",
    articleNumber: "117",
    image: "/assets/images/top-6.jpg",
    title: "Vintage T-shirt",
    description:
      "Timeless T-shirt with a soft feel and worn-in look. A perfect blend of comfort and vintage style.",
    price: 275,
  },
  {
    id: "7",
    slug: "top-7",
    category: "Tops",
    articleNumber: "118",
    image: "/assets/images/top-7.jpg",
    title: "Vintage T-shirt",
    description:
      "A timeless vintage-inspired T-shirt crafted from soft, breathable cotton. Designed with a relaxed fit and a worn-in feel for effortless, everyday style",
    price: 325,
  },
  {
    id: "8",
    slug: "top-8",
    category: "Tops",
    articleNumber: "119",
    image: "/assets/images/top-8.jpg",
    title: "Vintage T-shirt",
    description:
      "Lightweight T-shirt with a classic vintage aesthetic. Designed for warm days with a relaxed and breathable fit.",
    price: 450,
  },
  {
    id: "9",
    slug: "bottom-1",
    category: "Bottoms",
    articleNumber: "889",
    image: "/assets/images/bottom-1.jpg",
    title: "Vintage Cargo Pants",
    description:
      "Classic cargo pants with a relaxed fit and authentic worn-in feel. Made from durable cotton for everyday comfort and timeless style.",
    price: 799,
  },
  {
    id: "10",
    slug: "bottom-2",
    category: "Bottoms",
    articleNumber: "890",
    image: "/assets/images/bottom-2.jpg",
    title: "Vintage Chinos",
    description:
      "Soft vintage-style chinos with a relaxed silhouette and faded finish. Designed for comfort with a laid-back vibe.",
    price: 650,
  },
  {
    id: "11",
    slug: "bottom-3",
    category: "Bottoms",
    articleNumber: "891",
    image: "/assets/images/bottom-3.jpg",
    title: "Vintage Plaid Chinos",
    description:
      "Lightweight vintage-inspired plaid chinos with a worn-in look. Perfect for warm days with a relaxed fit and effortless style.",
    price: 499,
  },
  {
    id: "12",
    slug: "bottom-4",
    category: "Bottoms",
    articleNumber: "892",
    image: "/assets/images/bottom-4.jpg",
    title: "Vintage Jeans",
    description:
      "Classic vintage jeans with a vintage finish. Featuring patches and a relaxed fit for a rustic style.",
    price: 899,
  },
  {
    id: "13",
    slug: "bottom-5",
    category: "Bottoms",
    articleNumber: "893",
    image: "/assets/images/bottom-5.jpg",
    title: "Vintage Denim Jeans",
    description:
      "Timeless denim jeans with a vintage wash and slightly distressed details. Designed for a casual, effortless look.",
    price: 550,
  },
  {
    id: "14",
    slug: "bottom-6",
    category: "Bottoms",
    articleNumber: "894",
    image: "/assets/images/bottom-6.jpg",
    title: "Vintage Cargo Pants",
    description:
      "Comfortable vintage-style cargo pants with a soft feel and tapered fit. Perfect for everyday wear with a retro touch and feel.",
    price: 699,
  },
  {
    id: "15",
    slug: "bottom-7",
    category: "Bottoms",
    articleNumber: "895",
    image: "/assets/images/bottom-7.jpg",
    title: "Vintage Blue Jeans",
    description:
      "Breathable jeans with a vintage-inspired design. Lightweight and relaxed for a clean, effortless summer style.",
    price: 750,
  },
  {
    id: "16",
    slug: "bottom-8",
    category: "Bottoms",
    articleNumber: "896",
    image: "/assets/images/bottom-8.jpg",
    title: "Vintage Blue Jeans",
    description:
      "Retro jeans with a soft texture and vintage feel. Designed with a relaxed fit for timeless everyday wear.",
    price: 820,
  },
  {
    id: "17",
    slug: "shoe-1",
    category: "Shoes",
    articleNumber: "897",
    image: "/assets/images/shoe-1.jpg",
    title: "Vintage 'All-Star' Sneakers",
    description:
      "Retro-inspired All-Star sneakers with a classic silhouette and worn-in details. Designed for everyday comfort with a timeless street wear feel.",
    price: 950,
  },
  {
    id: "18",
    slug: "shoe-2",
    category: "Shoes",
    articleNumber: "898",
    image: "/assets/images/shoe-2.jpg",
    title: "Vintage Leather Boots",
    description:
      "Durable leather boots with a vintage finish. Built for both style and longevity with a rugged, timeless look.",
    price: 1299,
  },
  {
    id: "19",
    slug: "shoe-3",
    category: "Shoes",
    articleNumber: "899",
    image: "/assets/images/shoe-3.jpg",
    title: "Vintage Boots",
    description:
      "Lightweight boots with a faded vintage look. Perfect for casual wear with a relaxed and effortless style.",
    price: 699,
  },
  {
    id: "20",
    slug: "shoe-4",
    category: "Shoes",
    articleNumber: "900",
    image: "/assets/images/shoe-4.jpg",
    title: "Vintage 'All-Star' Shoes",
    description:
      "Old-school shoes inspired by 'All-Star' design. Comfortable cushioning meets a nostalgic athletic aesthetic.",
    price: 999,
  },
  {
    id: "21",
    slug: "shoe-5",
    category: "Shoes",
    articleNumber: "901",
    image: "/assets/images/shoe-5.jpg",
    title: "Vintage Winter Boots",
    description:
      "Classic durable winter boots with a vintage touch. Classic design combined with warm layers for a relaxed and comfy look for colder weather.",
    price: 1100,
  },
  {
    id: "22",
    slug: "shoe-6",
    category: "Shoes",
    articleNumber: "902",
    image: "/assets/images/shoe-6.jpg",
    title: "Vintage Sneakers",
    description:
      "Minimalist sneakers with a vintage-inspired design. Lightweight and breathable for warm-weather comfort.",
    price: 550,
  },
  {
    id: "23",
    slug: "shoe-7",
    category: "Shoes",
    articleNumber: "903",
    image: "/assets/images/shoe-7.jpg",
    title: "Vintage Cowboy Boots",
    description:
      "Retro cowboy boots with a classic silhouette and worn-in aesthetic. Perfect for a bold vintage street style.",
    price: 1050,
  },
  {
    id: "24",
    slug: "shoe-8",
    category: "Shoes",
    articleNumber: "904",
    image: "/assets/images/shoe-8.jpg",
    title: "Vintage Suede Boots",
    description:
      "Soft suede boots with a classic finish. Designed for a clean yet relaxed look with subtle retro character.",
    price: 980,
  },

  {
    id: "25",
    slug: "accessory-1",
    category: "Accessories",
    articleNumber: "905",
    image: "/assets/images/accessory-1.jpg",
    title: "Vintage Baseball Cap",
    description:
      "Classic cap with Korean War Veteran logo. A timeless accessory that adds a casual retro touch.",
    price: 299,
  },
  {
    id: "26",
    slug: "accessory-2",
    category: "Accessories",
    articleNumber: "906",
    image: "/assets/images/accessory-2.jpg",
    title: "Vintage Baseball Cap",
    description:
      "Soft cap with a vintage-inspired look. Designed for a relaxed and effortless everyday style.",
    price: 249,
  },
  {
    id: "27",
    slug: "accessory-3",
    category: "Accessories",
    articleNumber: "907",
    image: "/assets/images/accessory-3.jpg",
    title: "Vintage Army Belt",
    description:
      "Retro army belt with a timeless design. Perfect for adding a bold vintage edge to any outfit.",
    price: 399,
  },
  {
    id: "28",
    slug: "accessory-4",
    category: "Accessories",
    articleNumber: "908",
    image: "/assets/images/accessory-4.jpg",
    title: "Vintage 'Tour de Franc' Cap",
    description:
      "Classic bike styled cap with a 'Tour de Franc'-inspired fit. Perfect for daily use with a stylish feel.",
    price: 450,
  },
  {
    id: "29",
    slug: "accessory-5",
    category: "Accessories",
    articleNumber: "909",
    image: "/assets/images/accessory-5.jpg",
    title: "Vintage Tote Bag",
    description:
      "Classic tote bag with a stylish and practical design. Adds a nice accessory details while you're out and about.",
    price: 550,
  },
  {
    id: "30",
    slug: "accessory-6",
    category: "Accessories",
    articleNumber: "910",
    image: "/assets/images/accessory-6.jpg",
    title: "Vintage Half-size Gloves",
    description:
      "Cotton half-size gloves with the perfect design for when you need to use your fingers. Add extra comfort and warmth on colder days.",
    price: 350,
  },
  {
    id: "31",
    slug: "accessory-7",
    category: "Accessories",
    articleNumber: "911",
    image: "/assets/images/accessory-7.jpg",
    title: "Vintage Tote Bag",
    description:
      "Classic tote bag with a inspired week-end design. A timeless accessory that blends style and function.",
    price: 1200,
  },
  {
    id: "32",
    slug: "accessory-8",
    category: "Accessories",
    articleNumber: "912",
    image: "/assets/images/accessory-8.jpg",
    title: "Vintage 'Chevy' Baseball Cap",
    description:
      "Durable cotton cap with a vintage aesthetic. Designed for everyday use with both style and practicality.",
    price: 799,
  },
];
