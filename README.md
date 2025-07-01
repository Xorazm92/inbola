# INBOLA — Bolalar uchun zamonaviy marketplace (Next.js + Payload)

## Loyihaning qisqacha tavsifi
INBOLA — bu zamonaviy Next.js frontend va Payload CMS backend asosida ishlaydigan bolalar uchun mahsulotlar do‘koni. Mahsulotlar, buyurtmalar, foydalanuvchilar va admin panel to‘liq boshqariladi. Email orqali tasdiqlash va xabarnoma yuborish ham ishlaydi.

---

## Ishga tushirish uchun ko‘rsatma

### 1. Talablar
- Node.js v20+
- MongoDB (lokal yoki cloud)
- Gmail (SMTP uchun App password)

### 2. .env fayl namunasi
```env
MONGODB_URL=mongodb://localhost:27017/inbola
PAYLOAD_SECRET=super-secret-key
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Email uchun
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=info@inbola.uz
EMAIL_NAME=Inbola
```
**Eslatma:** Gmail uchun App password olish uchun 2-step verification yoqing va [bu yerda](https://myaccount.google.com/apppasswords) yarating.

### 3. O‘rnatish va ishga tushirish
```bash
# 1. Barcha paketlarni o‘rnating
npm install

# 2. Serverni ishga tushiring (Payload + Next.js)
npm run dev
```

### 4. Admin panel va frontend
- **Admin panel:** http://localhost:3000/admin
- **Asosiy sahifa:** http://localhost:3000/


---

## Texnik stack
- **Frontend:** Next.js, TailwindCSS, Shadcn UI
- **Backend:** Payload CMS, tRPC
- **Ma’lumotlar bazasi:** MongoDB
- **Email:** Nodemailer (Gmail SMTP orqali)

---

## Muammolar va tezkor yechimlar

**1. Email ishlamasa:**
- .env fayldagi SMTP_USER, SMTP_PASS (faqat App password!) va boshqa email maydonlarini tekshiring.
- Gmail uchun oddiy parol emas, faqat App password ishlaydi!

**2. 404 yoki sahifa ochilmasa:**
- `npm run dev` buyrug‘idan so‘ng, brauzerda http://localhost:3000 ni yangilang.
- Terminalda xatolik chiqsa, to‘liq logni tekshiring.

**3. Port bandligi yoki boshqa server xatolari:**
- 3000-port band bo‘lsa, eski processni o‘chiring: `lsof -i :3000` va `kill -9 PID`

**4. Admin panel ochilmasa:**
- http://localhost:3000/admin ga kiring. Login uchun admin foydalanuvchi yarating yoki mavjudini ishlating.

---

## Foydali scriptlar
- `npm run dev` — Backend va frontendni birga ishga tushiradi
- `npm install` — Barcha paketlarni o‘rnatadi

---

## Muallif va yordam
Agar muammo yoki savol bo‘lsa, shu README asosida barcha yechimlarni topasiz. Yana savollar bo‘lsa, Telegram yoki GitHub orqali bog‘laning.

---

**INBOLA loyihasi — bolalar uchun eng yaxshi marketplace!**
