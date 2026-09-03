import "dotenv/config";
import { db } from "@/prisma/db";

const email = process.argv[2]?.trim().toLowerCase();

if (!email) {
  throw new Error("Provide the user's email address.");
}

async function promoteAdmin() {
  const user = await db.user.update({
    where: { email },
    data: { role: "admin" },
  });

  console.log(`${user.email} is now an admin.`);
}

promoteAdmin()
  .finally(async () => {
    await db.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
