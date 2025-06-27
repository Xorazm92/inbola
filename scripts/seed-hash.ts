import dotenv from "dotenv";
import path from "path";
import { getPayloadClient } from "../src/get-payload";

(async () => {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });

  const email = process.env.SEED_ADMIN_EMAIL || "admin@inbola.uz";
  const password = process.env.SEED_ADMIN_PASSWORD || "supersecret";

  try {
    const { MongoClient } = await import("mongodb");
    const bcrypt = await import("bcryptjs");
    const url = process.env.MONGODB_URL || process.env.MONGODB_URI;
    if (!url) throw new Error("MONGODB_URL is missing");
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db();
    const users = db.collection("users");
    const hash = await bcrypt.hash(password, 10);
    const existing = await users.findOne({ email });
    if (existing) {
      console.log(`\u2705 Admin user already exists (${email}). Skipping seeding.`);
      process.exit(0);
    }
    await users.insertOne({
      email,
      password: hash,
      role: "admin",
      _verified: true,
      loginAttempts: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await client.close();
    console.log("✅ Admin user with bcrypt hash created:");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
  } catch (err) {
    console.error("❌ Failed to seed admin user", err);
    process.exit(1);
  }
})();
