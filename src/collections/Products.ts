import {
  AfterChangeHook,
  BeforeChangeHook,
} from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";
import { PRODUCT_CATEGORIES } from "../lib/kids-config";

import { Product, User } from "../payload-types";

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
  const user = req.user;

  // If user is provided in data, use it; otherwise use req.user
  if (data.user) {
    return { ...data };
  }

  if (!user) {
    throw new Error('User is required');
  }

  return { ...data, user: user.id };
};

const syncUser: AfterChangeHook<Product> = async ({ req, doc }) => {
  // Skip if no user in request (for seeding)
  if (!req.user) {
    return;
  }

  const fullUser = await req.payload.findByID({
    collection: "users",
    id: req.user.id,
  });

  if (fullUser && typeof fullUser === "object") {
    const { products } = fullUser as unknown as User;

    const allIDs = [
      ...(products?.map((product: string | Product) =>
        typeof product === "object" ? product.id : product
      ) || []),
    ];

    const createdProductIDs = allIDs.filter(
      (id, index) => allIDs.indexOf(id) === index
    );

    const dataToUpdate = [...createdProductIDs, doc.id];

    await req.payload.update({
      collection: "users",
      id: fullUser.id,
      data: {
        products: dataToUpdate,
      },
    });
  }
};

const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;

    const userProductIDs = (user.products || []).reduce<Array<string>>(
      (acc, product) => {
        if (!product) return acc;
        if (typeof product === "string") {
          acc.push(product);
        } else {
          acc.push(product.id);
        }

        return acc;
      },
      []
    );

    return {
      id: {
        in: userProductIDs,
      },
    };
  };

const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isAdminOrHasAccess(),
    update: isAdminOrHasAccess(),
    delete: isAdminOrHasAccess(),
  },
  hooks: {
    afterChange: [syncUser],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: false,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Product details",
    },
    {
      name: "price",
      label: "Price in UZS",
      min: 0,
      max: 10000000,
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: "product_files",
      label: "Product file(s)",
      type: "relationship",
      required: false,
      relationTo: "product_files",
      hasMany: false,
    },
    {
      name: "approvedForSale",
      label: "Product Status",
      type: "select",
      defaultValue: "pending",
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "size",
      label: "Available Sizes",
      type: "select",
      hasMany: true,
      options: [
        { label: "XS", value: "XS" },
        { label: "S", value: "S" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "XL", value: "XL" },
      ],
    },
    {
      name: "color",
      label: "Colors",
      type: "text",
      hasMany: true,
    },
    {
      name: "ageGroup",
      label: "Age Group",
      type: "select",
      options: [
        { label: "0-2 years", value: "0-2" },
        { label: "3-5 years", value: "3-5" },
        { label: "6-8 years", value: "6-8" },
        { label: "9-12 years", value: "9-12" },
        { label: "13+ years", value: "13+" },
      ],
    },
    {
      name: "images",
      type: "array",
      label: "Product images",
      minRows: 0,
      maxRows: 4,
      required: false,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: "SEO Settings",
      fields: [
        {
          name: "title",
          type: "text",
          label: "SEO Title",
          maxLength: 60,
        },
        {
          name: "description",
          type: "textarea",
          label: "SEO Description",
          maxLength: 160,
        },
        {
          name: "keywords",
          type: "text",
          label: "Keywords",
          hasMany: true,
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Featured Product",
      defaultValue: false,
    },
    {
      name: "inStock",
      type: "checkbox",
      label: "In Stock",
      defaultValue: true,
    },
    {
      name: "rating",
      type: "number",
      label: "Average Rating",
      min: 0,
      max: 5,
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
  ],
};

export default Products;