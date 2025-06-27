import dotenv from "dotenv";
import path from "path";
import { getPayloadClient } from "../src/get-payload";

(async () => {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });

  const email = process.env.SEED_ADMIN_EMAIL || "admin@inbola.uz";
  const password = process.env.SEED_ADMIN_PASSWORD || "supersecret";

  try {
    const payload = await getPayloadClient();
    // Delete all users and carts for a clean seed
    await payload.delete({ collection: "users", where: {} });
    await payload.delete({ collection: "cart", where: {} });
    // Now create admin user (NO cart field!)
    await payload.create({
      collection: "users",
      data: {
        email,
        password,
        role: "admin",
        _verified: true,
        products: [],
        product_files: [],
      },
    });
    console.log("✅ Admin user created via Payload API:");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
  } catch (err) {
    console.error("❌ Failed to seed admin user", err);
    process.exit(1);
  }
})();