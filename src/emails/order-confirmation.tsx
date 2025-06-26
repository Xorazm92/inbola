import { Product } from "@/payload-types";

export const renderOrderConfirmation = (
  orderId: string,
  products: Pick<Product, "name" | "price">[],
  total: number
) => `
  <div style="font-family: Arial, sans-serif; line-height:1.5;">
    <h2>Order #${orderId} Confirmation</h2>
    <p>Thank you for your purchase! Here is a summary of your order:</p>
    <ul>
      ${products
        .map((p) => `<li>${p.name} — $${p.price}</li>`) 
        .join("")}
    </ul>
    <p><strong>Total: $${total}</strong></p>
    <p style="margin-top:24px">We will notify you when your order ships.<br/>INBOLA Team</p>
  </div>
`;
