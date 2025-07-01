
import dotenv from "dotenv";
import path from "path";
import { getPayloadClient } from "../src/get-payload";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const createAdmin = async () => {
  const payload = await getPayloadClient();
  
  try {
    // Admin user yaratish
    const admin = await payload.create({
      collection: "users",
      data: {
        email: "admin@inbola.uz",
        password: "inbola123",
        role: "admin",
        _verified: true,
      },
    });
    
    console.log("✅ Admin user yaratildi:", admin.email);
    
    // Test mahsulot yaratish
    const product = await payload.create({
      collection: "products",
      data: {
        name: "Test Mahsulot",
        description: "Bu test mahsulotidir",
        price: 50000,
        category: "toys",
        approvedForSale: "approved",
        priceId: "test-price-id",
        stripeId: "test-stripe-id",
      },
    });
    
    console.log("✅ Test mahsulot yaratildi:", product.name);
    
  } catch (error) {
    console.error("❌ Xatolik:", error);
  }
  
  process.exit(0);
};

createAdmin();
