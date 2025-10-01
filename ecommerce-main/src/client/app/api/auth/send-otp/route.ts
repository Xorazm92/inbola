import { NextRequest, NextResponse } from 'next/server';

interface OTPRequest {
  phone: string;
}

// In-memory OTP storage (production da Redis yoki database ishlatish kerak)
const otpStorage = new Map<string, { code: string; expires: number }>();

// Eskiz SMS API
const sendSMS = async (phone: string, message: string) => {
  const SMS_TOKEN = process.env.SMS_TOKEN;
  const SMS_FROM = process.env.SMS_FROM;
  const SMS_PROVIDER_URL = process.env.SMS_PROVIDER_URL;

  if (!SMS_TOKEN || !SMS_FROM || !SMS_PROVIDER_URL) {
    throw new Error('SMS konfiguratsiyasi to\'liq emas');
  }

  try {
    const response = await fetch(`${SMS_PROVIDER_URL}/message/sms/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SMS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile_phone: phone.replace('+', ''),
        message: message,
        from: SMS_FROM,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`SMS yuborishda xatolik: ${result.message || 'Noma\'lum xatolik'}`);
    }

    return result;
  } catch (error) {
    console.error('SMS yuborish xatoligi:', error);
    throw error;
  }
};

export async function POST(request: NextRequest) {
  try {
    const body: OTPRequest = await request.json();
    const { phone } = body;

    // Telefon raqam validatsiyasi
    if (!phone || !phone.match(/^\+998[0-9]{9}$/)) {
      return NextResponse.json(
        { error: 'Noto\'g\'ri telefon raqam formati' },
        { status: 400 }
      );
    }

    // 6 raqamli OTP kod generatsiya qilish
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // OTP ni saqlash (15 daqiqa amal qiladi)
    const expiresAt = Date.now() + (15 * 60 * 1000); // 15 daqiqa
    otpStorage.set(phone, { code: otpCode, expires: expiresAt });

    // SMS yuborish
    const message = `Inbola tasdiqlash kodi: ${otpCode}. Kod 15 daqiqa amal qiladi.`;
    
    await sendSMS(phone, message);

    return NextResponse.json({ 
      success: true, 
      message: 'SMS kod yuborildi',
      expiresIn: 15 * 60 // 15 daqiqa sekund hisobida
    });

  } catch (error) {
    console.error('OTP yuborish xatoligi:', error);
    return NextResponse.json(
      { error: 'SMS yuborishda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// OTP tekshirish uchun GET endpoint
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const phone = searchParams.get('phone');
  const code = searchParams.get('code');

  if (!phone || !code) {
    return NextResponse.json(
      { error: 'Telefon raqam va kod talab qilinadi' },
      { status: 400 }
    );
  }

  const storedOTP = otpStorage.get(phone);
  
  if (!storedOTP) {
    return NextResponse.json(
      { error: 'OTP kod topilmadi yoki muddati tugagan' },
      { status: 400 }
    );
  }

  if (Date.now() > storedOTP.expires) {
    otpStorage.delete(phone);
    return NextResponse.json(
      { error: 'OTP kod muddati tugagan' },
      { status: 400 }
    );
  }

  if (storedOTP.code !== code) {
    return NextResponse.json(
      { error: 'Noto\'g\'ri OTP kod' },
      { status: 400 }
    );
  }

  // OTP to'g'ri - uni o'chirish
  otpStorage.delete(phone);
  
  return NextResponse.json({ 
    success: true, 
    message: 'OTP tasdiqlandi' 
  });
}
