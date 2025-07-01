import dotenv from "dotenv";
import path from "path";
import { getPayloadClient } from "../src/get-payload";

(async () => {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });

  const payload = await getPayloadClient();
  try {
    const res = await payload.login({
      collection: "users",
      data: {
        email: "admin@inbola.uz",
        password: "inbola123", // Using the password from your .env
      },
    });
    console.log("SUCCESS! User logged in:", {
      id: res.user.id,
      email: res.user.email,
      role: res.user.role,
      token: res.token
    });
  } catch (err) {
    console.error("Login failed:", err);
  }
})();
