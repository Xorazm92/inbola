import { NextRequest, NextResponse } from 'next/server';

interface TokenVerifyRequest {
  token: string;
}

// Token storage (production da Redis yoki database ishlatish kerak)
const tokenStorage = new Map<string, { userId: number; expires: number; used: boolean }>();

// JWT token generatsiya qilish (oddiy versiya)
const generateJWT = (userId: number) => {
  const payload = {
    userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 soat
  };
  
  // Production da haqiqiy JWT library ishlatish kerak
  return Buffer.from(JSON.stringify(payload)).toString('base64');
};

// Token decode qilish
const decodeToken = (token: string) => {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split('_');
    
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    const userId = parseInt(parts[0]);
    const timestamp = parseInt(parts[1]);
    
    if (isNaN(userId) || isNaN(timestamp)) {
      throw new Error('Invalid token data');
    }
    
    return { userId, timestamp };
  } catch (error) {
    throw new Error('Token decode failed');
  }
};

export async function POST(request: NextRequest) {
  try {
    const body: TokenVerifyRequest = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Token talab qilinadi' },
        { status: 400 }
      );
    }

    // Token decode qilish
    let decodedToken;
    try {
      decodedToken = decodeToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Noto\'g\'ri token formati' },
        { status: 400 }
      );
    }

    const { userId, timestamp } = decodedToken;

    // Token muddatini tekshirish (15 daqiqa)
    const tokenAge = Date.now() - timestamp;
    const maxAge = 15 * 60 * 1000; // 15 daqiqa

    if (tokenAge > maxAge) {
      return NextResponse.json(
        { error: 'Token muddati tugagan' },
        { status: 400 }
      );
    }

    // Token ishlatilganligini tekshirish
    const storedToken = tokenStorage.get(token);
    if (storedToken && storedToken.used) {
      return NextResponse.json(
        { error: 'Token allaqachon ishlatilgan' },
        { status: 400 }
      );
    }

    // Token ni ishlatilgan deb belgilash
    tokenStorage.set(token, {
      userId,
      expires: Date.now() + maxAge,
      used: true,
    });

    // Foydalanuvchi ma'lumotlarini olish yoki yaratish
    // Bu yerda database bilan ishlash kerak
    const user = await getOrCreateUser(userId);

    // JWT token generatsiya qilish
    const authToken = generateJWT(userId);

    return NextResponse.json({
      success: true,
      message: 'Autentifikatsiya muvaffaqiyatli',
      authToken,
      user: {
        id: user.id,
        name: user.name,
        telegramId: user.telegramId,
      },
    });

  } catch (error) {
    console.error('Token verify error:', error);
    return NextResponse.json(
      { error: 'Serverda xatolik yuz berdi' },
      { status: 500 }
    );
  }
}

// Foydalanuvchini olish yoki yaratish
async function getOrCreateUser(telegramId: number) {
  // Bu yerda database bilan ishlash kerak
  // Hozircha mock data qaytaraman
  
  // Database dan foydalanuvchini qidirish
  // const user = await db.user.findUnique({ where: { telegramId } });
  
  // Agar topilmasa, yangi foydalanuvchi yaratish
  // if (!user) {
  //   const newUser = await db.user.create({
  //     data: {
  //       telegramId,
  //       name: `User_${telegramId}`,
  //       role: 'USER',
  //     },
  //   });
  //   return newUser;
  // }
  
  // Mock data
  return {
    id: telegramId,
    name: `Telegram User ${telegramId}`,
    telegramId: telegramId,
    role: 'USER',
    createdAt: new Date(),
  };
}

// Token storage tozalash (expired tokenlarni o'chirish)
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of tokenStorage.entries()) {
    if (now > data.expires) {
      tokenStorage.delete(token);
    }
  }
}, 5 * 60 * 1000); // 5 daqiqada bir marta
