import 'ignore-styles';
import { getPayloadClient } from '../src/get-payload';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function createSimpleProduct() {
  try {
    const payload = await getPayloadClient();
    
    console.log('🌱 Creating simple product...');
    
    // Create a simple product without user requirement
    const product = await payload.create({
      collection: 'products',
      data: {
        name: "Test Bolalar Ko'ylagi",
        description: "Bu test mahsulotidir - chiroyli bolalar ko'ylagi",
        price: 150000,
        category: "clothing",
        approvedForSale: "approved",
        featured: true,
        inStock: true,
        rating: 4.5,
        size: ["S", "M", "L"],
        color: ["Pushti", "Ko'k"],
        ageGroup: "3-5",
        images: [],
        stripeId: `stripe_${Math.random().toString(36).substring(7)}`,
        priceId: `price_${Math.random().toString(36).substring(7)}`,
      },
    });
    
    console.log(`✅ Created product: ${product.name} (ID: ${product.id})`);
    
    // Create another product
    const product2 = await payload.create({
      collection: 'products',
      data: {
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
    });
    
    console.log(`✅ Created product: ${product2.name} (ID: ${product2.id})`);
    
    console.log('🎉 Products created successfully!');
  } catch (error) {
    console.error('❌ Error creating products:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

createSimpleProduct();
