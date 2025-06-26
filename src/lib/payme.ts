import crypto from "crypto";

// Helper to sign Payme API requests - placeholder (depends on method/version)
export function signPaymeRequest(orderId: string, amount: number) {
  return crypto.createHmac("sha256", process.env.PAYME_SECRET!)
    .update(`${orderId}:${amount}`)
    .digest("hex");
}
