import dotenv from "dotenv";
import path from "path";
import { getPayloadClient } from "../src/get-payload";
import fs from "fs";
import FormData from "form-data";

(async () => {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });

  const payload = await getPayloadClient();
  
  try {
    // Login first
    const { user, token } = await payload.login({
      collection: "users",
      data: {
        email: "admin@inbola.uz",
        password: "inbola123",
      },
    });

    console.log("Logged in as:", user.email);

    // Test media upload
    const form = new FormData();
    form.append("file", fs.createReadStream(path.join(__dirname, "test-image.jpg"))); // Make sure to add a test image
    
    const mediaRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/media`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: form,
    });

    const mediaData = await mediaRes.json();
    console.log("Media upload result:", mediaData);

  } catch (error) {
    console.error("Test failed:", error);
  }
})();
