import dotenv from "dotenv";
import path from "path";
import { getPayloadClient } from "../src/get-payload";

(async () => {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });

  const email = process.env.SEED_ADMIN_EMAIL || "admin@inbola.uz";
  const password = process.env.SEED_ADMIN_PASSWORD || "password";

  try {
    const payload = await getPayloadClient();

    // Create admin user directly (no afterChange hooks)
    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`\u2705 Admin user already exists (${email}). Skipping seeding.`);
      process.exit(0);
    }

    try {
      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "admin",
          _verified: true,
        },
        overrideAccess: true,
      });
      console.log("\u2705 Admin user created:");
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
    } catch (e: any) {
      // Fallback: direct MongoDB insert if NotFound error
      if (e && e.status === 404) {
        const { MongoClient } = await import('mongodb');
        const url = process.env.MONGODB_URL || process.env.MONGODB_URI;
        if (!url) throw new Error('MONGODB_URL is missing');
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db();
        const users = db.collection('users');
        const hash = password; // For demo only: payload uses bcrypt, but for dev, insert as plain
        await users.insertOne({
          email,
          password: hash,
          role: 'admin',
          _verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await client.close();
        console.log('✅ Admin user inserted directly into MongoDB.');
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password}`);
      } else {
        throw e;
      }
    }
  } catch (err) {
    console.error("❌ Failed to seed admin user", err);
    process.exit(1);
  }
})();
