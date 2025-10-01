import { NextRequest, NextResponse } from 'next/server';

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    chat: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      type: string;
    };
    date: number;
    text?: string;
  };
}

// Telegram bot token va webhook secret
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

// Telegram API orqali xabar yuborish
const sendTelegramMessage = async (chatId: number, text: string, replyMarkup?: any) => {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('Telegram bot token mavjud emas');
  }

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
      reply_markup: replyMarkup,
    }),
  });

  if (!response.ok) {
    throw new Error('Telegram xabar yuborishda xatolik');
  }

  return response.json();
};

// Autentifikatsiya uchun inline keyboard
const getAuthKeyboard = (userId: number) => ({
  inline_keyboard: [
    [
      {
        text: '✅ Tasdiqlash',
        callback_data: `auth_confirm_${userId}`,
      },
      {
        text: '❌ Bekor qilish',
        callback_data: `auth_cancel_${userId}`,
      },
    ],
    [
      {
        text: '🌐 Inbola saytiga o\'tish',
        url: 'https://inbola.uz',
      },
    ],
  ],
});

// Webhook endpoint
export async function POST(request: NextRequest) {
  try {
    // Webhook secret tekshirish
    const secretToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    if (secretToken !== TELEGRAM_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const update: TelegramUpdate = await request.json();

    // Message mavjudligini tekshirish
    if (!update.message) {
      return NextResponse.json({ ok: true });
    }

    const { message } = update;
    const chatId = message.chat.id;
    const userId = message.from.id;
    const text = message.text || '';
    const firstName = message.from.first_name;
    const username = message.from.username;

    // /start komandasi
    if (text.startsWith('/start')) {
      const params = text.split(' ');
      
      if (params.length > 1 && (params[1] === 'auth' || params[1] === 'register')) {
        const action = params[1] === 'auth' ? 'kirish' : 'ro\'yxatdan o\'tish';
        
        const welcomeText = `
🔐 <b>Inbola - Xavfsiz ${action}</b>

Salom, ${firstName}! 👋

Inbola platformasiga ${action} uchun quyidagi tugmani bosing.

<i>Bu jarayon to'liq xavfsiz va sizning shaxsiy ma'lumotlaringiz himoyalangan.</i>
        `;

        await sendTelegramMessage(chatId, welcomeText, getAuthKeyboard(userId));
        
        return NextResponse.json({ ok: true });
      }

      // Oddiy start xabari
      const welcomeText = `
🛍️ <b>Inbola'ga xush kelibsiz!</b>

Premium onlayn do'kon - Inbola!

🔹 Yuqori sifatli mahsulotlar
🔹 Tezkor yetkazib berish
🔹 Xavfsiz to'lovlar
🔹 24/7 qo'llab-quvvatlash

<a href="https://inbola.uz">🌐 Saytga o'tish</a>
      `;

      await sendTelegramMessage(chatId, welcomeText);
      return NextResponse.json({ ok: true });
    }

    // Yordam komandasi
    if (text === '/help') {
      const helpText = `
📋 <b>Yordam</b>

<b>Mavjud komandalar:</b>
/start - Botni ishga tushirish
/help - Yordam
/auth - Saytga kirish
/register - Ro'yxatdan o'tish

<b>Qo'llab-quvvatlash:</b>
📧 support@inbola.uz
📞 +998 (99) 123-45-67
      `;

      await sendTelegramMessage(chatId, helpText);
      return NextResponse.json({ ok: true });
    }

    // Auth komandasi
    if (text === '/auth') {
      const authText = `
🔐 <b>Saytga kirish</b>

Inbola saytiga xavfsiz kirish uchun quyidagi tugmani bosing:
      `;

      await sendTelegramMessage(chatId, authText, getAuthKeyboard(userId));
      return NextResponse.json({ ok: true });
    }

    // Register komandasi
    if (text === '/register') {
      const registerText = `
📝 <b>Ro'yxatdan o'tish</b>

Inbola saytida ro'yxatdan o'tish uchun quyidagi tugmani bosing:
      `;

      await sendTelegramMessage(chatId, registerText, getAuthKeyboard(userId));
      return NextResponse.json({ ok: true });
    }

    // Noma'lum komanda
    const unknownText = `
❓ <b>Noma'lum komanda</b>

Yordam olish uchun /help komandasini yuboring.
    `;

    await sendTelegramMessage(chatId, unknownText);
    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Telegram webhook xatoligi:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Callback query lar uchun (inline keyboard bosilganda)
export async function PUT(request: NextRequest) {
  try {
    const update = await request.json();
    
    if (update.callback_query) {
      const { callback_query } = update;
      const chatId = callback_query.message.chat.id;
      const userId = callback_query.from.id;
      const data = callback_query.callback_data;

      if (data.startsWith('auth_confirm_')) {
        // Autentifikatsiya tasdiqlandi
        const authToken = generateAuthToken(userId);
        
        const successText = `
✅ <b>Autentifikatsiya muvaffaqiyatli!</b>

Sizning autentifikatsiya tokeningiz:
<code>${authToken}</code>

Bu tokenni saytda ishlatishingiz mumkin.

<a href="https://inbola.uz/auth/telegram?token=${authToken}">🔗 Saytga o'tish</a>
        `;

        await sendTelegramMessage(chatId, successText);
      } else if (data.startsWith('auth_cancel_')) {
        // Autentifikatsiya bekor qilindi
        const cancelText = `
❌ <b>Autentifikatsiya bekor qilindi</b>

Agar kerak bo'lsa, qaytadan /auth komandasini yuboring.
        `;

        await sendTelegramMessage(chatId, cancelText);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram callback xatoligi:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Auth token generatsiya qilish
function generateAuthToken(userId: number): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2);
  return Buffer.from(`${userId}_${timestamp}_${randomStr}`).toString('base64');
}
