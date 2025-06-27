import dotenv from "dotenv";
import path from "path";
import { getPayloadClient } from "../src/get-payload";

(async () => {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });

  const email = process.env.SEED_ADMIN_EMAIL || "admin@inbola.uz";
  const password = process.env.SEED_ADMIN_PASSWORD || "password";

  try {
    const payload = await getPayloadClient();

    // Check if admin user already exists
    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
    });

    if (users.length > 0) {
      console.log(`\u2705 Admin user already exists (${email}). Skipping seeding.`);
      process.exit(0);
    }

    await payload.create({
      collection: "users",
      data: {
        email,
        password,
        role: "admin",
      },
    });

    console.log("\u2705 Admin user created:");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
  } catch (err) {
    console.error("❌ Failed to seed admin user", err);
    process.exit(1);
  }
})();
