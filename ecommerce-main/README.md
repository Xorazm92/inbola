# 🧸 Inbola.uz - Bolalar Mahsulotlari E-commerce Platformasi

**Inbola.uz** - O'zbekistondagi eng yaxshi bolalar mahsulotlari onlayn do'koni. 0-12 yosh oralig'idagi bolalar uchun xavfsiz va sifatli mahsulotlar.

## 🌟 Asosiy Xususiyatlar

### 🛍️ E-commerce Funksiyalari
- ✅ To'liq mahsulot katalogi (0-12 yosh bolalar uchun)
- ✅ Kategoriya bo'yicha qidirish va filtrlash
- ✅ Savatcha va buyurtma berish tizimi
- ✅ Foydalanuvchi profili va buyurtmalar tarixi
- ✅ Admin panel mahsulotlarni boshqarish uchun

### 💳 To'lov Tizimlari (O'zbekiston)
- 🏦 **Payme** - To'liq integratsiya
- 💰 **Click** - Signature verification bilan
- 🏪 **Uzum Bank** - Real-time status checking
- 💱 **UZS valyutasi** - O'zbek so'mi (12,500 UZS = 1 USD)

### 🌐 Lokalizatsiya
- 🇺🇿 **100% O'zbek tili** - Barcha interfeys va xabarlar
- 📱 **Mobile-responsive** - Barcha qurilmalarda ishlaydi
- 🔐 **Xavfsiz autentifikatsiya** - JWT token bilan
- ⚡ **Tez yuklash** - Optimallashtirilgan performance

### 👶 Bolalar Mahsulotlari Kategoriyalari
- 👕 Bolalar kiyimi (0-12 yosh)
- 🍼 Chaqaloq kiyimi va buyumlari
- 🧸 O'yinchoqlar (konstruktor, qo'g'irchoqlar, mashina)
- 🪑 Bolalar mebeli
- 📚 Kitoblar va ta'lim materiallari
- 📱 Bolalar texnikasi
- ⚽ Sport va faollik buyumlari
- 🎨 Ijodkorlik va san'at

## 🚀 Texnologiyalar

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Modern styling
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Multer** - File uploads

### Deployment
- **AWS S3** - Static hosting
- **CloudFront** - CDN
- **Domain:** inbola.uz

## 📦 O'rnatish va Ishga Tushirish

### Talablar
- Node.js 18+
- MongoDB
- Git

### 1. Repository ni klonlash
```bash
git clone https://github.com/Xorazm92/inbola.git
cd inbola
```

### 2. Dependencies o'rnatish

**Client (Frontend):**
```bash
cd client
npm install
```

**Server (Backend):**
```bash
cd server
npm install
```

### 3. Environment Variables sozlash

**Client (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_PAYME_MERCHANT_ID=your_payme_merchant_id
NEXT_PUBLIC_CLICK_MERCHANT_ID=your_click_merchant_id
NEXT_PUBLIC_UZUM_MERCHANT_ID=your_uzum_merchant_id
```

**Server (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inbola
JWT_SECRET=your_jwt_secret_key
PAYME_SECRET_KEY=your_payme_secret
CLICK_SECRET_KEY=your_click_secret
UZUM_SECRET_KEY=your_uzum_secret
```

### 4. Ishga tushirish

**Development rejimida:**
```bash
# Backend ishga tushirish
cd server
npm run dev

# Frontend ishga tushirish (yangi terminal)
cd client
npm run dev
```

**Production build:**
```bash
# Client build
cd client
npm run build
npm start

# Server production
cd server
npm start
```

## 🌐 AWS Deployment

### Production uchun deploy qilish:
```bash
npm run build:production
./deploy-aws.sh
```

Batafsil deployment yo'riqnomasi: [README-DEPLOYMENT.md](./README-DEPLOYMENT.md)

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Ro'yxatdan o'tish
- `POST /api/auth/login` - Kirish
- `GET /api/auth/me` - Foydalanuvchi ma'lumotlari

### Products
- `GET /api/products` - Barcha mahsulotlar
- `GET /api/products/:id` - Bitta mahsulot
- `POST /api/products` - Yangi mahsulot (Admin)
- `PUT /api/products/:id` - Mahsulotni yangilash (Admin)

### Orders
- `POST /api/orders` - Yangi buyurtma
- `GET /api/orders` - Foydalanuvchi buyurtmalari
- `GET /api/orders/:id` - Buyurtma tafsilotlari

### Payments
- `POST /api/payments/create` - To'lov yaratish
- `GET /api/payments/status/:id` - To'lov holati
- `POST /api/payments/payme/callback` - Payme callback
- `POST /api/payments/click/callback` - Click callback
- `POST /api/payments/uzum/callback` - Uzum callback

## 🔐 Xavfsizlik

- ✅ JWT token authentication
- ✅ Password hashing (bcrypt)
- ✅ Input validation va sanitization
- ✅ CORS sozlamalari
- ✅ Rate limiting
- ✅ Payment signature verification

## 🤝 Hissa Qo'shish

1. Repository ni fork qiling
2. Yangi branch yarating (`git checkout -b feature/yangi-xususiyat`)
3. O'zgarishlaringizni commit qiling (`git commit -m 'Yangi xususiyat qo'shildi'`)
4. Branch ni push qiling (`git push origin feature/yangi-xususiyat`)
5. Pull Request yarating

## 📞 Aloqa

- **Website:** [inbola.uz](https://inbola.uz)
- **Email:** inbola.uz@gmail.com
- **Phone:** +998 (97) 777-10-53
- **Telegram:** [@Zufar_Xorazmiy](https://t.me/Zufar_Xorazmiy)
- **Instagram:** [@inbola.uz](https://instagram.com/inbola.uz)

## 📄 Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatiladi. Batafsil ma'lumot uchun [LICENSE](LICENSE) faylini ko'ring.

## 🏆 Maqsad

**Inbola.uz** ning asosiy maqsadi - O'zbekiston ota-onalariga bolalari uchun eng yaxshi, xavfsiz va sifatli mahsulotlarni oson va ishonchli tarzda xarid qilish imkoniyatini berish.

---

**Baxtli bolalar, baxtli oilalar!** 🧸👶👧👦
