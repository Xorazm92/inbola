import crypto from "crypto";

// Helper to sign Click API requests. This is a simplified example.
// REAL formula: md5(click_trans_id + merchant_id + amount + action + sign_time + secret_key)
// Adjust according to Click docs.
export function signClickRequest(orderId: string, amount: number) {
  const payload = `${orderId}:${amount}`;
  return crypto.createHash("md5").update(payload + process.env.CLICK_SECRET!).digest("hex");
}
