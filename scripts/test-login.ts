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
        password: "supersecret",
      },
    });
    console.log("SUCCESS!", res);
  } catch (err) {
    console.error("FAILED", err);
  }
})();
