import { NextRequest, NextResponse } from 'next/server';

interface PaymentStatusRequest {
  orderId?: string;
  transactionId?: string;
  method?: 'payme' | 'click' | 'uzum';
}

interface PaymentStatusResponse {
  success: boolean;
  payment?: {
    orderId: string;
    transactionId: string;
    amount: number;
    method: string;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    createdAt: string;
    completedAt?: string;
    failedAt?: string;
    errorCode?: string;
    errorMessage?: string;
  };
  error?: string;
}

// Payme to'lov holatini tekshirish
async function checkPaymeStatus(transactionId: string) {
  const PAYME_MERCHANT_ID = process.env.PAYME_MERCHANT_ID;
  const PAYME_SECRET_KEY = process.env.PAYME_SECRET_KEY;

  if (!PAYME_MERCHANT_ID || !PAYME_SECRET_KEY) {
    throw new Error('Payme konfiguratsiyasi mavjud emas');
  }

  try {
    // Payme API ga so'rov yuborish
    const response = await fetch('https://checkout.paycom.uz/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': `${PAYME_MERCHANT_ID}:${PAYME_SECRET_KEY}`
      },
      body: JSON.stringify({
        method: 'CheckTransaction',
        params: {
          id: transactionId
        }
      })
    });

    const result = await response.json();
    
    if (result.error) {
      return {
        status: 'failed',
        errorCode: result.error.code.toString(),
        errorMessage: result.error.message
      };
    }

    // Payme state kodlari: 1=pending, 2=completed, -1=cancelled
    let status = 'pending';
    if (result.result.state === 2) {
      status = 'completed';
    } else if (result.result.state < 0) {
      status = 'cancelled';
    }

    return {
      status,
      transactionId: result.result.transaction,
      completedAt: result.result.perform_time ? new Date(result.result.perform_time).toISOString() : undefined
    };

  } catch (error) {
    console.error('Payme status check error:', error);
    throw error;
  }
}

// Click to'lov holatini tekshirish
async function checkClickStatus(transactionId: string) {
  const CLICK_MERCHANT_ID = process.env.CLICK_MERCHANT_ID;
  const CLICK_SECRET_KEY = process.env.CLICK_SECRET_KEY;

  if (!CLICK_MERCHANT_ID || !CLICK_SECRET_KEY) {
    throw new Error('Click konfiguratsiyasi mavjud emas');
  }

  try {
    // Click API ga so'rov yuborish
    const response = await fetch('https://api.click.uz/v2/merchant/payment/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${CLICK_MERCHANT_ID}:${CLICK_SECRET_KEY}`).toString('base64')}`
      },
      body: JSON.stringify({
        click_trans_id: transactionId
      })
    });

    const result = await response.json();
    
    if (result.error_code !== 0) {
      return {
        status: 'failed',
        errorCode: result.error_code.toString(),
        errorMessage: result.error_note
      };
    }

    // Click status kodlari
    let status = 'pending';
    if (result.payment_status === 2) {
      status = 'completed';
    } else if (result.payment_status === -1) {
      status = 'cancelled';
    } else if (result.payment_status === -2) {
      status = 'failed';
    }

    return {
      status,
      transactionId: result.click_trans_id,
      completedAt: result.payment_status === 2 ? new Date().toISOString() : undefined
    };

  } catch (error) {
    console.error('Click status check error:', error);
    throw error;
  }
}

// Uzum Bank to'lov holatini tekshirish
async function checkUzumStatus(transactionId: string) {
  const UZUM_SECRET_KEY = process.env.UZUM_SECRET_KEY;
  const UZUM_MERCHANT_ID = process.env.UZUM_MERCHANT_ID;

  if (!UZUM_SECRET_KEY || !UZUM_MERCHANT_ID) {
    throw new Error('Uzum Bank konfiguratsiyasi mavjud emas');
  }

  try {
    // Uzum Bank API ga so'rov yuborish
    const response = await fetch(`https://api.uzumbank.uz/api/v1/payments/${transactionId}/status`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${UZUM_SECRET_KEY}`,
        'X-Merchant-ID': UZUM_MERCHANT_ID
      }
    });

    const result = await response.json();
    
    if (!result.success) {
      return {
        status: 'failed',
        errorCode: result.error_code || 'UNKNOWN',
        errorMessage: result.message || 'Unknown error'
      };
    }

    return {
      status: result.payment.status, // success, failed, cancelled, pending
      transactionId: result.payment.transaction_id,
      completedAt: result.payment.status === 'success' ? result.payment.completed_at : undefined
    };

  } catch (error) {
    console.error('Uzum status check error:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const transactionId = searchParams.get('transactionId');
    const method = searchParams.get('method') as 'payme' | 'click' | 'uzum' | null;

    if (!orderId && !transactionId) {
      return NextResponse.json({
        success: false,
        error: 'orderId yoki transactionId talab qilinadi'
      }, { status: 400 });
    }

    // Database dan to'lov ma'lumotlarini olish
    // const payment = await db.transaction.findFirst({
    //   where: orderId ? { orderId } : { 
    //     OR: [
    //       { id: transactionId },
    //       { paymeTransactionId: transactionId },
    //       { clickTransId: transactionId },
    //       { uzumTransactionId: transactionId }
    //     ]
    //   }
    // });

    // Mock payment data
    const payment = {
      id: transactionId || 'trans_123',
      orderId: orderId || 'order_123',
      amount: 3250000,
      method: method || 'payme',
      status: 'pending',
      createdAt: new Date().toISOString(),
      paymeTransactionId: method === 'payme' ? transactionId : null,
      clickTransId: method === 'click' ? transactionId : null,
      uzumTransactionId: method === 'uzum' ? transactionId : null
    };

    if (!payment) {
      return NextResponse.json({
        success: false,
        error: 'To\'lov topilmadi'
      }, { status: 404 });
    }

    // Agar to'lov allaqachon yakunlangan bo'lsa, database ma'lumotlarini qaytarish
    if (payment.status === 'completed' || payment.status === 'failed' || payment.status === 'cancelled') {
      const response: PaymentStatusResponse = {
        success: true,
        payment: {
          orderId: payment.orderId,
          transactionId: payment.id,
          amount: payment.amount,
          method: payment.method,
          status: payment.status as any,
          createdAt: payment.createdAt,
          completedAt: payment.status === 'completed' ? new Date().toISOString() : undefined,
          failedAt: payment.status === 'failed' ? new Date().toISOString() : undefined
        }
      };
      return NextResponse.json(response);
    }

    // To'lov provider dan holat tekshirish
    let providerStatus;
    const txId = transactionId || payment.paymeTransactionId || payment.clickTransId || payment.uzumTransactionId;

    if (!txId) {
      return NextResponse.json({
        success: false,
        error: 'Transaction ID topilmadi'
      }, { status: 400 });
    }

    try {
      switch (payment.method) {
        case 'payme':
          providerStatus = await checkPaymeStatus(txId);
          break;
        case 'click':
          providerStatus = await checkClickStatus(txId);
          break;
        case 'uzum':
          providerStatus = await checkUzumStatus(txId);
          break;
        default:
          throw new Error('Noto\'g\'ri to\'lov usuli');
      }

      // Database ni yangilash
      // await db.transaction.update({
      //   where: { id: payment.id },
      //   data: {
      //     status: providerStatus.status,
      //     completedAt: providerStatus.completedAt ? new Date(providerStatus.completedAt) : null,
      //     failedAt: providerStatus.status === 'failed' ? new Date() : null,
      //     errorCode: providerStatus.errorCode,
      //     errorMessage: providerStatus.errorMessage
      //   }
      // });

      const response: PaymentStatusResponse = {
        success: true,
        payment: {
          orderId: payment.orderId,
          transactionId: providerStatus.transactionId || payment.id,
          amount: payment.amount,
          method: payment.method,
          status: providerStatus.status as any,
          createdAt: payment.createdAt,
          completedAt: providerStatus.completedAt,
          failedAt: providerStatus.status === 'failed' ? new Date().toISOString() : undefined,
          errorCode: providerStatus.errorCode,
          errorMessage: providerStatus.errorMessage
        }
      };

      return NextResponse.json(response);

    } catch (error) {
      console.error('Payment status check error:', error);
      return NextResponse.json({
        success: false,
        error: 'To\'lov holatini tekshirishda xatolik yuz berdi'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Payment status API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Serverda xatolik yuz berdi'
    }, { status: 500 });
  }
}
