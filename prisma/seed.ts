import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import { PrismaClient } from "generated/prisma/client";

dotenv.config({
  path: [".env", ".env.development", ".env.production"],
});

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const db = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clear existing products
  await db.product.deleteMany();

  await db.product.createMany({
    data: [
      {
        name: "Laptop Dell XPS 15",
        description:
          "High-performance laptop with 15.6-inch display, Intel i7 processor, 16GB RAM",
        amount: 15000000,
        qty: 25,
      },
      {
        name: "iPhone 15 Pro",
        description:
          "Latest Apple smartphone with A17 Pro chip, 256GB storage, titanium design",
        amount: 18000000,
        qty: 50,
      },
      {
        name: "Samsung Galaxy S24 Ultra",
        description:
          "Premium Android smartphone with S Pen, 200MP camera, 512GB storage",
        amount: 17500000,
        qty: 40,
      },
      {
        name: "Sony WH-1000XM5",
        description:
          "Premium noise-cancelling wireless headphones with 30-hour battery life",
        amount: 4500000,
        qty: 100,
      },
      {
        name: "iPad Pro 12.9-inch",
        description:
          "Professional tablet with M2 chip, Liquid Retina XDR display, 256GB",
        amount: 14000000,
        qty: 30,
      },
      {
        name: "MacBook Pro 14-inch",
        description:
          "Professional laptop with M3 Pro chip, 18GB RAM, 512GB SSD",
        amount: 28000000,
        qty: 15,
      },
      {
        name: "Logitech MX Master 3S",
        description:
          "Premium wireless mouse with ergonomic design and multi-device support",
        amount: 1500000,
        qty: 150,
      },
      {
        name: "Keychron K8 Pro",
        description:
          "Wireless mechanical keyboard with hot-swappable switches and RGB lighting",
        amount: 2000000,
        qty: 80,
      },
      {
        name: "LG UltraWide Monitor 34-inch",
        description:
          "34-inch curved monitor with 3440x1440 resolution and 144Hz refresh rate",
        amount: 8000000,
        qty: 35,
      },
      {
        name: "Nintendo Switch OLED",
        description:
          "Gaming console with 7-inch OLED screen and enhanced audio",
        amount: 4500000,
        qty: 60,
      },
      {
        name: "PlayStation 5",
        description:
          "Next-gen gaming console with 825GB SSD and 4K gaming support",
        amount: 7500000,
        qty: 45,
      },
      {
        name: "Xbox Series X",
        description:
          "Powerful gaming console with 1TB SSD and Game Pass compatibility",
        amount: 7000000,
        qty: 40,
      },
      {
        name: "Apple Watch Series 9",
        description:
          "Advanced smartwatch with health tracking and always-on display",
        amount: 6000000,
        qty: 70,
      },
      {
        name: "Samsung Galaxy Watch 6",
        description:
          "Premium smartwatch with advanced fitness tracking and sleek design",
        amount: 4500000,
        qty: 65,
      },
      {
        name: "AirPods Pro (2nd Gen)",
        description:
          "Premium wireless earbuds with active noise cancellation and spatial audio",
        amount: 3500000,
        qty: 120,
      },
      {
        name: "GoPro Hero 12",
        description:
          "Action camera with 5.3K video recording and advanced stabilization",
        amount: 6500000,
        qty: 50,
      },
      {
        name: "Canon EOS R6 Mark II",
        description:
          "Professional mirrorless camera with 24.2MP sensor and 4K 60fps video",
        amount: 35000000,
        qty: 10,
      },
      {
        name: "DJI Mini 4 Pro",
        description:
          "Compact drone with 4K HDR video, omnidirectional obstacle sensing",
        amount: 12000000,
        qty: 25,
      },
      {
        name: "Anker PowerCore 26800mAh",
        description:
          "High-capacity portable charger with fast charging support for multiple devices",
        amount: 800000,
        qty: 200,
      },
      {
        name: "Bose SoundLink Revolve+",
        description:
          "Portable Bluetooth speaker with 360-degree sound and 16-hour battery",
        amount: 4000000,
        qty: 75,
      },
    ],
  });

  const count = await db.product.count();
  console.log(`Seeding completed! Created ${count} products.`);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
