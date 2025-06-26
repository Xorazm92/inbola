import { CollectionConfig } from "payload/types";

const Coupons: CollectionConfig = {
  slug: "coupons",
  labels: {
    singular: "Coupon",
    plural: "Coupons",
  },
  admin: {
    defaultColumns: ["code", "type", "value", "active", "expiresAt"],
    useAsTitle: "code",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "code",
      label: "Code",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "type",
      label: "Discount Type",
      type: "select",
      required: true,
      options: [
        { label: "Percentage", value: "percent" },
        { label: "Fixed amount", value: "fixed" },
      ],
      defaultValue: "percent",
    },
    {
      name: "value",
      label: "Value",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "active",
      label: "Active",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "stripeId",
      label: "Stripe Coupon ID",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "expiresAt",
      label: "Expires At",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
  ],
};

export default Coupons;
