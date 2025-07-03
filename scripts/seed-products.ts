import 'ignore-styles';
import { getPayloadClient } from '../src/get-payload';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sampleProducts = [
  // Bolalar kiyimlari
  {
    name: "Chiroyli Princess Dress",
    description: "3-8 yosh qizlar uchun prinsessa ko'ylagi. Yumshoq mato, yorqin ranglar.",
    price: 150000,
    category: "clothing",
    subcategory: "girls_clothing",
    images: [],
    approvedForSale: "approved",
    featured: true,
    user: null,
    stripeId: null,
    priceId: null,
    attributes: [
      { name: "Rang", value: "Pushti, Ko'k, Qizil" },
      { name: "O'lcham", value: "3, 4, 5, 6, 7, 8" },
      { name: "Material", value: "100% Cotton" }
    ]
  },
  {
    name: "Sportiv Erkaklar Futbolka",
    description: "Faol o'g'il bolalar uchun qulay sportiv futbolka.",
    price: 85000,
    category: "clothing",
    subcategory: "boys_clothing",
    images: [],
    approvedForSale: "approved",
    featured: false,
    user: null,
    stripeId: null,
    priceId: null,
    attributes: [
      { name: "Rang", value: "Ko'k, Yashil, Qora" },
      { name: "O'lcham", value: "4, 6, 8, 10, 12" },
      { name: "Material", value: "Cotton Blend" }
    ]
  },
  // O'yinchoqlar
  {
    name: "Interaktiv Robot Transformer",
    description: "Zamonaviy robot o'yinchog'i. Ovozli va yorug'lik effektlari bilan.",
    price: 320000,
    category: "toys",
    subcategory: "electronic_toys",
    images: [],
    approvedForSale: "approved",
    featured: true,
    user: null,
    stripeId: null,
    priceId: null,
    attributes: [
      { name: "Yosh", value: "5+ yosh" },
      { name: "Batareya", value: "3xAA (kiritilmagan)" },
      { name: "Material", value: "ABS Plastik" }
    ]
  },
  {
    name: "Konstruktor Bloklar To'plami",
    description: "Ijodiy fikrlash uchun 500 qismdan iborat konstruktor to'plami.",
    price: 180000,
    category: "toys",
    subcategory: "educational_toys",
    images: [],
    approvedForSale: "approved",
    featured: false,
    user: null,
    stripeId: null,
    priceId: null,
    attributes: [
      { name: "Qismlar soni", value: "500 dona" },
      { name: "Yosh", value: "3+ yosh" },
      { name: "Material", value: "Xavfsiz plastik" }
    ]
  },
  // Kitoblar
  {
    name: "Bolalar Ensiklopediyasi",
    description: "Hayvonlar dunyosi haqida qiziqarli ma'lumotlar bilan to'la kitob.",
    price: 95000,
    category: "books",
    subcategory: "educational_books",
    images: [],
    approvedForSale: "approved",
    featured: true,
    user: null,
    stripeId: null,
    priceId: null,
    attributes: [
      { name: "Sahifalar", value: "128 sahifa" },
      { name: "Yosh", value: "6-12 yosh" },
      { name: "Til", value: "O'zbek" }
    ]
  },
  {
    name: "Ertaklar To'plami",
    description: "Mashhur jahon ertak​lari to'plami. Rangli tasvirlar bilan.",
    price: 65000,
    category: "books",
    subcategory: "storybooks",
    images: [],
    approvedForSale: "approved",
    featured: false,
    user: null,
    stripeId: null,
    priceId: null,
    attributes: [
      { name: "Sahifalar", value: "96 sahifa" },
      { name: "Yosh", value: "3-8 yosh" },
      { name: "Til", value: "O'zbek" }
    ]
  },
  // Maktab buyumlari
  {
    name: "Premium Maktab Sumkasi",
    description: "Ergonomik dizayn bilan tayyorlangan maktab sumkasi. Suv o'tkazmaydi.",
    price: 240000,
    category: "school_supplies",
    subcategory: "backpacks",
    images: [],
    approvedForSale: "approved",
    featured: true,
    user: null,
    stripeId: null,
    priceId: null,
    attributes: [
      { name: "Rang", value: "Ko'k, Qizil, Qora" },
      { name: "Hajm", value: "25L" },
      { name: "Material", value: "Oxford Fabric" }
    ]
  },
  {
    name: "Rangbalo Qalamlar To'plami",
    description: "48 xil rangda sifatli qalamlar to'plami. Metall qutida.",
    price: 125000,
    category: "school_supplies",
    subcategory: "art_supplies",
    images: [],
    approvedForSale: "approved",
    featured: false,
    user: null,
    stripeId: null,
    priceId: null,
    attributes: [
      { name: "Ranglar soni", value: "48 rang" },
      { name: "Turi", value: "Rangli qalamlar" },
      { name: "Qadoq", value: "Metall quti" }
    ]
  }
];

async function seedProducts() {
  try {
    const payload = await getPayloadClient();
    
    console.log('🌱 Seeding products...');
    
    // Get admin user
    const adminUser = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@inbola.uz'
        }
      }
    });

    if (!adminUser.docs.length) {
      console.error('❌ Admin user not found');
      return;
    }

    const adminId = adminUser.docs[0].id;

    for (const product of sampleProducts) {
      try {
        const productData = {
          ...product,
          user: adminId,
          stripeId: `stripe_${Math.random().toString(36).substring(7)}`,
          priceId: `price_${Math.random().toString(36).substring(7)}`,
        };

        const result = await payload.create({
          collection: 'products',
          data: productData,
        });
        console.log(`✅ Created product: ${result.name}`);
      } catch (error) {
        console.error(`❌ Error creating product ${product.name}:`, error);
      }
    }
    
    console.log('🎉 Product seeding completed!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedProducts();
}

export { seedProducts };
