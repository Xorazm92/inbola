import { CollectionConfig } from "payload/types";

const Cart: CollectionConfig = {
  slug: "cart",
  admin: {
    hidden: true,
  },
  fields: [
    {
      name: "products",
      label: "Products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "discount",
      label: "Discount (in %)",
      type: "number",
      min: 0,
      max: 100,
      defaultValue: 0,
    },
    {
      name: "coupon",
      label: "Coupon",
      type: "relationship",
      relationTo: "coupons",
      hasMany: false,
    },
    {
      name: "user",
      label: "Owner",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
    },
  ],
};

export default Cart;
