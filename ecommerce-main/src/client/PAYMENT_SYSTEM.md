# 💳 Inbola To'lov Tizimi

O'zbekiston uchun to'liq integratsiya qilingan to'lov tizimi - **Payme**, **Click**, va **Uzum Bank** bilan.

## 🚀 Xususiyatlar

### ✅ Qo'llab-quvvatlanadigan To'lov Usullari
- **🔵 Payme** - Bank kartalar orqali xavfsiz to'lov
- **🟠 Click** - Mobil to'lovlar va bank kartalar  
- **🟣 Uzum Bank** - Uzum Bank orqali tezkor to'lov

### ✅ To'liq Funksionallik
- 📱 **Responsive UI** - Barcha qurilmalarda ishlaydi
- 🔒 **Xavfsiz** - SSL sertifikat va imzo tekshiruvi
- ⚡ **Tezkor** - Real-time to'lov holati
- 🇺🇿 **O'zbek tili** - To'liq mahalliylashtirish
- 📧 **Bildirishnomalar** - Email va SMS xabarlar

## 📁 Fayl Tuzilishi

```
src/client/
├── app/
│   ├── api/payments/
│   │   ├── create/route.ts          # To'lov yaratish
│   │   ├── status/route.ts          # To'lov holati
│   │   └── callback/
│   │       ├── payme/route.ts       # Payme callback
│   │       ├── click/route.ts       # Click callback
│   │       └── uzum/route.ts        # Uzum callback
│   ├── components/molecules/
│   │   └── PaymentMethods.tsx       # To'lov usullari UI
│   ├── checkout/payment/
│   │   └── page.tsx                 # To'lov sahifasi
│   └── payment/
│       ├── success/page.tsx         # Muvaffaqiyat sahifasi
│       └── failed/page.tsx          # Xatolik sahifasi
└── .env.local                       # Konfiguratsiya
```

## ⚙️ Konfiguratsiya

`.env.local` faylida quyidagi o'zgaruvchilarni sozlang:

```env
# Payme
PAYME_MERCHANT_ID=your_payme_merchant_id
PAYME_SECRET_KEY=your_payme_secret_key

# Click
CLICK_MERCHANT_ID=your_click_merchant_id
CLICK_SERVICE_ID=your_click_service_id
CLICK_SECRET_KEY=your_click_secret_key

# Uzum Bank
UZUM_MERCHANT_ID=your_uzum_merchant_id
UZUM_SECRET_KEY=your_uzum_secret_key

# Site URL
NEXT_PUBLIC_SITE_URL=https://inbola.uz
```

## 🔄 To'lov Jarayoni

### 1. To'lov Yaratish
```javascript
const response = await fetch('/api/payments/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    method: 'payme', // 'payme' | 'click' | 'uzum'
    amount: 100000,  // so'm hisobida
    orderId: 'order_123',
    returnUrl: 'https://inbola.uz/payment/success'
  })
});

const { paymentUrl } = await response.json();
window.location.href = paymentUrl; // To'lov sahifasiga yo'naltirish
```

### 2. To'lov Holati Tekshirish
```javascript
const response = await fetch(`/api/payments/status?orderId=order_123`);
const { payment } = await response.json();

console.log(payment.status); // 'pending' | 'completed' | 'failed' | 'cancelled'
```

### 3. Callback Handling
Har bir to'lov tizimi o'z callback URL'iga ega:
- **Payme**: `https://inbola.uz/api/payments/callback/payme`
- **Click**: `https://inbola.uz/api/payments/callback/click`  
- **Uzum**: `https://inbola.uz/api/payments/callback/uzum`

## 🎨 UI Komponentlari

### PaymentMethods Komponenti
```tsx
import PaymentMethods from '@/app/components/molecules/PaymentMethods';

<PaymentMethods
  onPaymentSelect={(method) => setSelectedMethod(method)}
  selectedMethod={selectedMethod}
  amount={100000}
/>
```

### To'lov Sahifasi
- **URL**: `/checkout/payment?orderId=123&total=100000`
- **Xususiyatlar**: 
  - To'lov usuli tanlash
  - Buyurtma xulosasi
  - Xavfsizlik ko'rsatkichlari
  - Real-time validatsiya

## 🔐 Xavfsizlik

### Imzo Tekshiruvi
Har bir callback so'rovi uchun imzo tekshiriladi:

```typescript
// Payme
const signString = `${params.id}${params.account.order_id}${params.amount}${secretKey}`;
const hash = crypto.createHash('md5').update(signString).digest('hex');

// Click  
const signString = `${click_trans_id}${service_id}${secret_key}${merchant_trans_id}${amount}${action}${sign_time}`;
const hash = crypto.createHash('md5').update(signString).digest('hex');

// Uzum
const signString = `${transaction_id}${order_id}${amount}${currency}${status}${timestamp}${secret_key}`;
const hash = crypto.createHash('sha256').update(signString).digest('hex');
```

### SSL Sertifikat
Barcha API so'rovlar HTTPS orqali amalga oshiriladi.

## 📊 To'lov Holatlari

| Holat | Tavsif | Keyingi Harakat |
|-------|--------|-----------------|
| `pending` | To'lov kutilmoqda | Holatni tekshirish |
| `completed` | To'lov muvaffaqiyatli | Buyurtmani qayta ishlash |
| `failed` | To'lov muvaffaqiyatsiz | Qaytadan urinish |
| `cancelled` | To'lov bekor qilindi | Yangi to'lov yaratish |

## 🚨 Xatolik Kodlari

### Payme Xatoliklari
- `-31001`: Noto'g'ri summa
- `-31050`: Buyurtma topilmadi  
- `-31051`: Buyurtma allaqachon to'langan
- `-31003`: Tranzaksiya topilmadi

### Click Xatoliklari
- `-2`: Noto'g'ri summa
- `-5`: Buyurtma topilmadi
- `-4`: Allaqachon to'langan
- `-1`: Imzo xatoligi

### Uzum Bank Xatoliklari
- `INVALID_SIGNATURE`: Noto'g'ri imzo
- `ORDER_NOT_FOUND`: Buyurtma topilmadi
- `INVALID_AMOUNT`: Noto'g'ri summa

## 🧪 Test Rejimi

Development muhitida test kartalar:

### Payme Test
- Karta: `8600 0691 9540 6311`
- Muddat: `03/99`
- CVV: `666`

### Click Test  
- Karta: `9860 0601 2345 6789`
- Muddat: `12/99`
- CVV: `123`

### Uzum Test
- Karta: `8600 4954 1234 5678`
- Muddat: `12/25`
- CVV: `321`

## 📞 Qo'llab-quvvatlash

Texnik yordam uchun:
- 📱 **Telefon**: +998 (97) 777-10-53
- 📧 **Email**: inbola.uz@gmail.com
- 💬 **Telegram**: [@Zufar_Xorazmiy](https://t.me/Zufar_Xorazmiy)

## 🔄 Yangilanishlar

### v1.0.0 (2025-01-01)
- ✅ Payme integratsiyasi
- ✅ Click integratsiyasi  
- ✅ Uzum Bank integratsiyasi
- ✅ O'zbek tili qo'llab-quvvatlashi
- ✅ Responsive UI
- ✅ Xatolik boshqaruvi
- ✅ Real-time holat tekshiruvi

---

**© 2025 Inbola - O'zbekiston uchun zamonaviy e-commerce platformasi** 🇺🇿
