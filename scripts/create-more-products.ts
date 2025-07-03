import 'ignore-styles';
import { getPayloadClient } from '../src/get-payload';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function createMoreProducts() {
  try {
    const payload = await getPayloadClient();
    
    console.log('🌱 Creating more products...');
    
    const products = [
      {
        name: "Robot O'yinchoq",
        description: "Interaktiv robot o'yinchoq - bolalar uchun ajoyib sovg'a",
        price: 320000,
        category: "toys",
        approvedForSale: "approved",
        featured: true,
        inStock: true,
        rating: 4.8,
        ageGroup: "6-8",
        images: [],
        stripeId: `stripe_${Math.random().toString(36).substring(7)}`,
        priceId: `price_${Math.random().toString(36).substring(7)}`,
      },
      {
        name: "Bolalar Kitob",
        description: "Qiziqarli ertaklar to'plami - bolalar uchun foydali kitob",
        price: 85000,
        category: "books",
        approvedForSale: "approved",
        featured: false,
        inStock: true,
        rating: 4.5,
        ageGroup: "3-5",
        images: [],
        stripeId: `stripe_${Math.random().toString(36).substring(7)}`,
        priceId: `price_${Math.random().toString(36).substring(7)}`,
      },
      {
        name: "Maktab Sumkasi",
        description: "Sifatli va chiroyli maktab sumkasi",
        price: 240000,
        category: "school_supplies",
        approvedForSale: "approved",
        featured: true,
        inStock: true,
        rating: 4.7,
        ageGroup: "6-8",
        images: [],
        stripeId: `stripe_${Math.random().toString(36).substring(7)}`,
        priceId: `price_${Math.random().toString(36).substring(7)}`,
      },
      {
        name: "Erkaklar Futbolka",
        description: "Sportiv erkaklar futbolkasi - faol bolalar uchun",
        price: 95000,
        category: "clothing",
        approvedForSale: "approved",
        featured: false,
        inStock: true,
        rating: 4.3,
        size: ["S", "M", "L"],
        color: ["Ko'k", "Yashil"],
        ageGroup: "9-12",
        images: [],
        stripeId: `stripe_${Math.random().toString(36).substring(7)}`,
        priceId: `price_${Math.random().toString(36).substring(7)}`,
      },
      {
        name: "Konstruktor To'plami",
        description: "500 qismdan iborat konstruktor to'plami",
        price: 180000,
        category: "toys",
        approvedForSale: "approved",
        featured: true,
        inStock: true,
        rating: 4.9,
        ageGroup: "3-5",
        images: [],
        stripeId: `stripe_${Math.random().toString(36).substring(7)}`,
        priceId: `price_${Math.random().toString(36).substring(7)}`,
      }
    ];
    
    for (const productData of products) {
      try {
        const product = await payload.create({
          collection: 'products',
          data: productData,
        });
        
        console.log(`✅ Created product: ${product.name} (ID: ${product.id})`);
      } catch (error) {
        console.error(`❌ Error creating product ${productData.name}:`, error);
      }
    }
    
    console.log('🎉 All products created successfully!');
  } catch (error) {
    console.error('❌ Error creating products:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

createMoreProducts();
