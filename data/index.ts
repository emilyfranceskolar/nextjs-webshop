/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/

import type { Product as PrismaProduct } from "@/generated/client";

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
    slug: "athens-tortoise",
    category: "Bestseller",
    articleNumber: "112",
    image: "/assets/images/Athens_tortoise_1.webp",
    title: "Athens Tortoise",
    description:
      "A timeless tortoise frame with a refined shape and an effortless everyday look.",
    price: 899,
  },
  {
    id: "2",
    slug: "cartagena-tortoise",
    category: "Bestseller",
    articleNumber: "113",
    image: "/assets/images/Cartagena_tortoise_1.webp",
    title: "Cartagena Tortoise",
    description:
      "A bold tortoise frame designed to add character while keeping a classic feel.",
    price: 949,
  },
  {
    id: "3",
    slug: "kingston-tortoise",
    category: "Bestseller",
    articleNumber: "114",
    image: "/assets/images/Kingston_tortoise_1.webp",
    title: "Kingston Tortoise",
    description:
      "A versatile tortoise design with a confident silhouette and comfortable fit.",
    price: 899,
  },
  {
    id: "4",
    slug: "marrakech-brown",
    category: "Bestseller",
    articleNumber: "115",
    image: "/assets/images/Marrakech_Brown_1.webp",
    title: "Marrakech Brown",
    description:
      "A warm brown frame with a sophisticated shape and a relaxed everyday feel.",
    price: 929,
  },
  {
    id: "5",
    slug: "melbourne-black",
    category: "Bestseller",
    articleNumber: "116",
    image: "/assets/images/Melbourne_black_1.webp",
    title: "Melbourne Black",
    description:
      "A clean black frame with a modern silhouette made for effortless everyday wear.",
    price: 899,
  },
  {
    id: "6",
    slug: "paris-black",
    category: "Sunglasses",
    articleNumber: "117",
    image: "/assets/images/Paris_black_1.webp",
    title: "Paris Black",
    description:
      "A sleek black frame with a timeless shape that works from city streets to sunny days.",
    price: 949,
  },
  {
    id: "7",
    slug: "naples-black",
    category: "Sunglasses",
    articleNumber: "118",
    image: "/assets/images/Naples_black_1.webp",
    title: "Naples Black",
    description:
      "A bold black frame with a refined silhouette and effortless summer style.",
    price: 979,
  },
  {
    id: "8",
    slug: "paris-tortoise",
    category: "Sunglasses",
    articleNumber: "119",
    image: "/assets/images/Paris_tortoise_1.webp",
    title: "Paris Tortoise",
    description:
      "A classic tortoise frame combining a warm pattern with a sophisticated modern shape.",
    price: 949,
  },
  {
    id: "9",
    slug: "rio-black",
    category: "Sale",
    articleNumber: "120",
    image: "/assets/images/Rio_Black_1.webp",
    title: "Rio Black",
    description:
      "A confident black frame with a bold shape, now available at a special price.",
    price: 699,
  },
  {
    id: "10",
    slug: "vienna-black",
    category: "Sale",
    articleNumber: "121",
    image: "/assets/images/Vienna_black_1.webp",
    title: "Vienna Black",
    description:
      "A sleek black frame with a classic silhouette, available now at a reduced price.",
    price: 649,
  },
  {
    id: "11",
    slug: "vienna-tortoise",
    category: "Sale",
    articleNumber: "122",
    image: "/assets/images/Vienna_tortoise_1.webp",
    title: "Vienna Tortoise",
    description:
      "A timeless tortoise frame with a soft, elegant shape at a special price.",
    price: 679,
  },

  {
    id: "12",
    slug: "bilbao-cloudy-brown",
    category: "Reading Glasses",
    articleNumber: "123",
    image: "/assets/images/Bilbao_Cloudy_Brown.jpg",
    title: "Bilbao Cloudy Brown",
    description:
      "A comfortable reading frame with soft brown tones and a modern everyday shape.",
    price: 399,
  },
  {
    id: "13",
    slug: "bilbao-forest-camo",
    category: "Reading Glasses",
    articleNumber: "124",
    image: "/assets/images/Bilbao_Forest_Camo.jpg",
    title: "Bilbao Forest Camo",
    description:
      "A distinctive reading frame with a subtle camo finish and a comfortable fit.",
    price: 429,
  },
  {
    id: "14",
    slug: "bilbao-meadow-green",
    category: "Reading Glasses",
    articleNumber: "125",
    image: "/assets/images/Bilbao_Meadow_Green.jpg",
    title: "Bilbao Meadow Green",
    description:
      "A fresh green frame with a relaxed shape designed for comfortable reading.",
    price: 399,
  },
  {
    id: "15",
    slug: "bilbao-tortoise-classic",
    category: "Reading Glasses",
    articleNumber: "126",
    image: "/assets/images/Bilbao_Tortoise_Classic.jpg",
    title: "Bilbao Tortoise",
    description:
      "A classic tortoise frame with a timeless look and comfortable everyday fit.",
    price: 419,
  },
  {
    id: "16",
    slug: "bilbao-transparent-grey",
    category: "Reading Glasses",
    articleNumber: "127",
    image: "/assets/images/Bilbao_Transparent_Grey.jpg",
    title: "Bilbao Transparent Grey",
    description:
      "A lightweight transparent-grey frame with a clean and understated design.",
    price: 389,
  },
  {
    id: "17",
    slug: "bilbao-transparent-sand",
    category: "Reading Glasses",
    articleNumber: "128",
    image: "/assets/images/Bilbao_Transparent_Sand.jpg",
    title: "Bilbao Transparent Sand",
    description:
      "A soft transparent frame with warm tones and a minimal modern appearance.",
    price: 389,
  },
  {
    id: "18",
    slug: "cartagena-transparent-brown",
    category: "Reading Glasses",
    articleNumber: "129",
    image: "/assets/images/Cartagena_Transparent_Brown.jpg",
    title: "Cartagena Transparent Brown",
    description:
      "A subtle transparent-brown frame combining modern style with everyday comfort.",
    price: 429,
  },
  {
    id: "19",
    slug: "paris-crystal-clear",
    category: "Reading Glasses",
    articleNumber: "130",
    image: "/assets/images/Paris_Crystal_Clear.jpg",
    title: "Paris Crystal Clear",
    description:
      "A clean crystal-clear frame with a lightweight feel and timeless silhouette.",
    price: 399,
  },
  {
    id: "20",
    slug: "paris-sepia-grey",
    category: "Reading Glasses",
    articleNumber: "131",
    image: "/assets/images/Paris_Sepia_Grey.jpg",
    title: "Paris Sepia Grey",
    description:
      "A sophisticated grey frame with warm sepia tones and a comfortable fit.",
    price: 419,
  },
  {
    id: "21",
    slug: "paris-tortoise-reading",
    category: "Reading Glasses",
    articleNumber: "132",
    image: "/assets/images/Paris_Tortoise.jpg",
    title: "Paris Tortoise Reading",
    description:
      "A warm tortoise reading frame with a classic shape and effortless style.",
    price: 429,
  },
  {
    id: "22",
    slug: "paris-yellow-amber",
    category: "Reading Glasses",
    articleNumber: "133",
    image: "/assets/images/Paris_Yellow_Amber.jpg",
    title: "Paris Yellow Amber",
    description:
      "A soft amber frame that adds a warm touch to a clean and modern design.",
    price: 419,
  },
  {
    id: "23",
    slug: "vienna-crystal-clear",
    category: "Reading Glasses",
    articleNumber: "134",
    image: "/assets/images/Vienna_Crystal_Clear.jpg",
    title: "Vienna Crystal Clear",
    description:
      "A minimal clear frame designed for a light, clean and contemporary look.",
    price: 399,
  },
  {
    id: "24",
    slug: "vienna-sepia-grey",
    category: "Reading Glasses",
    articleNumber: "135",
    image: "/assets/images/Vienna_Sepia_Grey.jpg",
    title: "Vienna Sepia Grey",
    description:
      "A refined grey frame with soft tones and a comfortable shape for everyday use.",
    price: 409,
  },
  {
    id: "25",
    slug: "vienna-yellow-amber",
    category: "Reading Glasses",
    articleNumber: "136",
    image: "/assets/images/Vienna_Yellow_Amber.jpg",
    title: "Vienna Yellow Amber",
    description:
      "A warm amber frame with a refined silhouette and a modern everyday feel.",
    price: 419,
  },
];
