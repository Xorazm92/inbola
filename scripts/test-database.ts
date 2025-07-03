import 'ignore-styles';
import dotenv from 'dotenv';
import path from 'path';
import { getPayloadClient } from '../src/get-payload';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const testDatabase = async () => {
  try {
    console.log('🔍 Testing database connection...');
    
    const payload = await getPayloadClient();
    console.log('✅ Payload CMS initialized successfully');

    // Test database connection by fetching users
    console.log('📊 Testing database operations...');
    
    const users = await payload.find({
      collection: 'users',
      limit: 5,
    });
    
    console.log(`✅ Found ${users.totalDocs} users in database`);
    console.log('Users:', users.docs.map((user: any) => ({ id: user.id, email: user.email, role: user.role })));

    // Test products
    const products = await payload.find({
      collection: 'products',
      limit: 10,
    });

    console.log(`✅ Found ${products.totalDocs} products in database`);
    console.log('Products:', products.docs.map((product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category
    })));

    // Test collections
    console.log('📋 Available collections:');
    const collections = payload.config.collections;
    collections.forEach((collection: any) => {
      console.log(`  - ${collection.slug}`);
    });

    console.log('🎉 Database test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
};

testDatabase();
