import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface UzumCallback {
  transaction_id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: 'success' | 'failed' | 'cancelled';
  payment_method: string;
  timestamp: number;
  signature: string;
  error_code?: string;
  error_message?: string;
}

// Uzum Bank xatolik kodlari
const UZUM_ERRORS = {
  SUCCESS: { success: true, message: "Payment processed successfully" },
  INVALID_SIGNATURE: { success: false, error: "Invalid signature" },
  ORDER_NOT_FOUND: { success: false, error: "Order not found" },
  ORDER_ALREADY_PAID: { success: false, error: "Order already paid" },
  INVALID_AMOUNT: { success: false, error: "Invalid amount" },
  PROCESSING_ERROR: { success: false, error: "Payment processing error" }
};

// Imzo tekshirish
function verifyUzumSignature(params: UzumCallback, secretKey: string): boolean {
  const {
    transaction_id,
    order_id,
    amount,
    currency,
    status,
    timestamp
  } = params;

  const signString = `${transaction_id}${order_id}${amount}${currency}${status}${timestamp}${secretKey}`;
  const hash = crypto.createHash('sha256').update(signString).digest('hex');
  
  return hash === params.signature;
}

// Buyurtma tekshirish
async function checkUzumOrder(orderId: string, amount: number) {
  // Database dan buyurtmani tekshirish
  // const order = await db.order.findUnique({ where: { id: orderId } });
  
  // Mock data
  const order = {
    id: orderId,
    amount: amount / 100, // tiyin dan so'm ga
    status: 'pending',
    userId: 'user123'
  };

  if (!order) {
    return UZUM_ERRORS.ORDER_NOT_FOUND;
  }

  if (order.status === 'paid') {
    return UZUM_ERRORS.ORDER_ALREADY_PAID;
  }

  if (order.amount !== amount / 100) {
    return UZUM_ERRORS.INVALID_AMOUNT;
  }

  return UZUM_ERRORS.SUCCESS;
}

// To'lovni tasdiqlash
async function confirmUzumPayment(orderId: string, transactionId: string, paymentMethod: string) {
  try {
    // Database da tranzaksiyani yangilash
    // await db.transaction.update({
    //   where: { orderId },
    //   data: { 
    //     status: 'completed',
    //     uzumTransactionId: transactionId,
    //     paymentMethod,
    //     completedAt: new Date()
    //   }
    // });

    // Buyurtma statusini yangilash
    // await db.order.update({
    //   where: { id: orderId },
    //   data: { status: 'paid' }
    // });

    console.log(`Order ${orderId} successfully paid via Uzum Bank`);
    return UZUM_ERRORS.SUCCESS;
  } catch (error) {
    console.error('Error confirming Uzum payment:', error);
    return UZUM_ERRORS.PROCESSING_ERROR;
  }
}

// To'lovni bekor qilish
async function cancelUzumPayment(orderId: string, transactionId: string, reason: string) {
  try {
    // Database da tranzaksiyani bekor qilish
    // await db.transaction.update({
    //   where: { orderId },
    //   data: { 
    //     status: 'cancelled',
    //     cancelReason: reason,
    //     cancelledAt: new Date()
    //   }
    // });

    console.log(`Order ${orderId} payment cancelled: ${reason}`);
    return UZUM_ERRORS.SUCCESS;
  } catch (error) {
    console.error('Error cancelling Uzum payment:', error);
    return UZUM_ERRORS.PROCESSING_ERROR;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: UzumCallback = await request.json();
    const {
      transaction_id,
      order_id,
      amount,
      currency,
      status,
      payment_method,
      timestamp,
      signature,
      error_code,
      error_message
    } = body;

    const UZUM_SECRET_KEY = process.env.UZUM_SECRET_KEY;

    if (!UZUM_SECRET_KEY) {
      return NextResponse.json({
        success: false,
        error: "Configuration error"
      });
    }

    // Imzo tekshirish
    if (!verifyUzumSignature(body, UZUM_SECRET_KEY)) {
      return NextResponse.json(UZUM_ERRORS.INVALID_SIGNATURE);
    }

    // Valyuta tekshirish
    if (currency !== 'UZS') {
      return NextResponse.json({
        success: false,
        error: "Invalid currency"
      });
    }

    // Buyurtma tekshirish
    const orderCheck = await checkUzumOrder(order_id, amount);
    if (!orderCheck.success) {
      return NextResponse.json(orderCheck);
    }

    // Status bo'yicha ishlov berish
    switch (status) {
      case 'success':
        // Muvaffaqiyatli to'lov
        const confirmResult = await confirmUzumPayment(
          order_id,
          transaction_id,
          payment_method
        );

        // Mijozga email yuborish
        // await sendPaymentConfirmationEmail(order_id);

        return NextResponse.json({
          ...confirmResult,
          transaction_id,
          order_id
        });

      case 'failed':
        // Muvaffaqiyatsiz to'lov
        console.log(`Uzum payment failed for order ${order_id}: ${error_message}`);
        
        return NextResponse.json({
          success: true,
          message: "Payment failure processed",
          transaction_id,
          order_id
        });

      case 'cancelled':
        // Bekor qilingan to'lov
        const cancelResult = await cancelUzumPayment(
          order_id,
          transaction_id,
          error_message || 'User cancelled'
        );

        return NextResponse.json({
          ...cancelResult,
          transaction_id,
          order_id
        });

      default:
        return NextResponse.json({
          success: false,
          error: "Invalid payment status"
        });
    }

  } catch (error) {
    console.error('Uzum callback error:', error);
    return NextResponse.json({
      success: false,
      error: "Internal server error"
    });
  }
}

// GET endpoint - to'lov holatini tekshirish uchun
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('order_id');
    const transactionId = searchParams.get('transaction_id');

    if (!orderId && !transactionId) {
      return NextResponse.json({
        success: false,
        error: "Order ID or Transaction ID required"
      });
    }

    // Database dan to'lov holatini tekshirish
    // const payment = await db.transaction.findFirst({
    //   where: orderId ? { orderId } : { uzumTransactionId: transactionId }
    // });

    // Mock data
    const payment = {
      id: 'trans123',
      orderId: orderId || 'order123',
      status: 'completed',
      amount: 50000,
      method: 'uzum',
      createdAt: new Date(),
      completedAt: new Date()
    };

    if (!payment) {
      return NextResponse.json({
        success: false,
        error: "Payment not found"
      });
    }

    return NextResponse.json({
      success: true,
      payment: {
        order_id: payment.orderId,
        transaction_id: payment.id,
        status: payment.status,
        amount: payment.amount,
        method: payment.method,
        created_at: payment.createdAt,
        completed_at: payment.completedAt
      }
    });

  } catch (error) {
    console.error('Uzum status check error:', error);
    return NextResponse.json({
      success: false,
      error: "Internal server error"
    });
  }
}
