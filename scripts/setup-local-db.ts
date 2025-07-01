
import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'inbola';

async function setupLocalDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ MongoDB ga muvaffaqiyatli ulanildi');
    
    const db = client.db(DB_NAME);
    
    // Collections yaratish
    const collections = ['users', 'products', 'orders', 'cart', 'media', 'product_files', 'list', 'coupons'];
    
    for (const collection of collections) {
      try {
        await db.createCollection(collection);
        console.log(`✅ ${collection} collection yaratildi`);
      } catch (error: any) {
        if (error.code === 48) {
          console.log(`ℹ️  ${collection} collection allaqachon mavjud`);
        } else {
          console.error(`❌ ${collection} yaratishda xatolik:`, error.message);
        }
      }
    }
    
    // Indexes yaratish
    await db.collection('products').createIndex({ name: 'text', description: 'text' });
    await db.collection('products').createIndex({ category: 1 });
    await db.collection('products').createIndex({ price: 1 });
    await db.collection('products').createIndex({ featured: 1 });
    await db.collection('products').createIndex({ approvedForSale: 1 });
    
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    
    console.log('✅ Indexlar yaratildi');
    
    // Test admin user yaratish
    const adminExists = await db.collection('users').findOne({ email: 'admin@inbola.uz' });
    
    if (!adminExists) {
      await db.collection('users').insertOne({
        email: 'admin@inbola.uz',
        role: 'admin',
        loginAttempts: 0,
        products: [],
        product_files: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('✅ Test admin user yaratildi: admin@inbola.uz');
    }
    
  } catch (error) {
    console.error('❌ Database setup xatoligi:', error);
  } finally {
    await client.close();
  }
}

setupLocalDatabase();
