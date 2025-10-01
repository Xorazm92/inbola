import { NextRequest, NextResponse } from 'next/server';

interface PaymentRequest {
  method: 'payme' | 'click' | 'uzum';
  amount: number;
  orderId: string;
  returnUrl?: string;
  description?: string;
}

interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  transactionId?: string;
  error?: string;
}

// Payme to'lov yaratish
async function createPaymePayment(amount: number, orderId: string, returnUrl: string) {
  // Payme merchant konfiguratsiyasi
  const PAYME_MERCHANT_ID = process.env.PAYME_MERCHANT_ID;
  const PAYME_SECRET_KEY = process.env.PAYME_SECRET_KEY;
  
  if (!PAYME_MERCHANT_ID || !PAYME_SECRET_KEY) {
    throw new Error('Payme konfiguratsiyasi to\'liq emas');
  }

  // Payme checkout URL yaratish
  const paymentUrl = `https://checkout.paycom.uz/${Buffer.from(`m=${PAYME_MERCHANT_ID};ac.order_id=${orderId};a=${amount * 100}`).toString('base64')}`;
  
  return {
    paymentUrl,
    transactionId: `payme_${orderId}_${Date.now()}`
  };
}

// Click to'lov yaratish
async function createClickPayment(amount: number, orderId: string, returnUrl: string) {
  const CLICK_MERCHANT_ID = process.env.CLICK_MERCHANT_ID;
  const CLICK_SERVICE_ID = process.env.CLICK_SERVICE_ID;
  const CLICK_SECRET_KEY = process.env.CLICK_SECRET_KEY;

  if (!CLICK_MERCHANT_ID || !CLICK_SERVICE_ID || !CLICK_SECRET_KEY) {
    throw new Error('Click konfiguratsiyasi to\'liq emas');
  }

  try {
    // Click API ga so'rov yuborish
    const response = await fetch('https://api.click.uz/v2/merchant/invoice/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${CLICK_MERCHANT_ID}:${CLICK_SECRET_KEY}`).toString('base64')}`
      },
      body: JSON.stringify({
        service_id: CLICK_SERVICE_ID,
        amount: amount,
        phone_number: '',
        merchant_trans_id: orderId,
        return_url: returnUrl,
        description: `Inbola - Buyurtma #${orderId}`
      })
    });

    const result = await response.json();
    
    if (result.error_code === 0) {
      return {
        paymentUrl: result.invoice_url,
        transactionId: result.invoice_id
      };
    } else {
      throw new Error(`Click xatoligi: ${result.error_note}`);
    }
  } catch (error) {
    console.error('Click to\'lov yaratishda xatolik:', error);
    throw error;
  }
}

// Uzum Bank to'lov yaratish
async function createUzumPayment(amount: number, orderId: string, returnUrl: string) {
  const UZUM_MERCHANT_ID = process.env.UZUM_MERCHANT_ID;
  const UZUM_SECRET_KEY = process.env.UZUM_SECRET_KEY;

  if (!UZUM_MERCHANT_ID || !UZUM_SECRET_KEY) {
    throw new Error('Uzum Bank konfiguratsiyasi to\'liq emas');
  }

  try {
    // Uzum Bank API ga so'rov yuborish
    const response = await fetch('https://api.uzumbank.uz/api/v1/payments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UZUM_SECRET_KEY}`,
        'X-Merchant-ID': UZUM_MERCHANT_ID
      },
      body: JSON.stringify({
        amount: amount * 100, // tiyin hisobida
        currency: 'UZS',
        order_id: orderId,
        return_url: returnUrl,
        description: `Inbola - Buyurtma #${orderId}`,
        ttl: 3600 // 1 soat
      })
    });

    const result = await response.json();
    
    if (result.success) {
      return {
        paymentUrl: result.payment_url,
        transactionId: result.transaction_id
      };
    } else {
      throw new Error(`Uzum Bank xatoligi: ${result.message}`);
    }
  } catch (error) {
    console.error('Uzum Bank to\'lov yaratishda xatolik:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json();
    const { method, amount, orderId, returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`, description } = body;

    // Validatsiya
    if (!method || !amount || !orderId) {
      return NextResponse.json(
        { success: false, error: 'Method, amount va orderId talab qilinadi' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount 0 dan katta bo\'lishi kerak' },
        { status: 400 }
      );
    }

    let paymentResult;

    // To'lov usuli bo'yicha to'lov yaratish
    switch (method) {
      case 'payme':
        paymentResult = await createPaymePayment(amount, orderId, returnUrl);
        break;
      case 'click':
        paymentResult = await createClickPayment(amount, orderId, returnUrl);
        break;
      case 'uzum':
        paymentResult = await createUzumPayment(amount, orderId, returnUrl);
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Noto\'g\'ri to\'lov usuli' },
          { status: 400 }
        );
    }

    // To'lov ma'lumotlarini database ga saqlash
    // await savePaymentTransaction({
    //   orderId,
    //   method,
    //   amount,
    //   transactionId: paymentResult.transactionId,
    //   status: 'pending',
    //   createdAt: new Date()
    // });

    const response: PaymentResponse = {
      success: true,
      paymentUrl: paymentResult.paymentUrl,
      transactionId: paymentResult.transactionId
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('To\'lov yaratishda xatolik:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Noma\'lum xatolik' 
      },
      { status: 500 }
    );
  }
}
