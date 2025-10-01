import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface ClickCallback {
  click_trans_id: string;
  service_id: string;
  click_paydoc_id: string;
  merchant_trans_id: string;
  amount: string;
  action: string;
  error: string;
  error_note: string;
  sign_time: string;
  sign_string: string;
}

// Click xatolik kodlari
const CLICK_ERRORS = {
  SUCCESS: { error: 0, error_note: "Success" },
  INVALID_AMOUNT: { error: -2, error_note: "Incorrect parameter amount" },
  ORDER_NOT_FOUND: { error: -5, error_note: "Order not found" },
  ORDER_ALREADY_PAID: { error: -4, error_note: "Already paid" },
  INVALID_ACTION: { error: -3, error_note: "Action not found" },
  INVALID_SIGN: { error: -1, error_note: "SIGN CHECK FAILED!" },
  TRANSACTION_CANCELLED: { error: -6, error_note: "Transaction cancelled" }
};

// Imzo tekshirish
function verifySignature(params: ClickCallback, secretKey: string): boolean {
  const {
    click_trans_id,
    service_id,
    click_paydoc_id,
    merchant_trans_id,
    amount,
    action,
    sign_time
  } = params;

  const signString = `${click_trans_id}${service_id}${secretKey}${merchant_trans_id}${amount}${action}${sign_time}`;
  const hash = crypto.createHash('md5').update(signString).digest('hex');
  
  return hash === params.sign_string;
}

// Buyurtma tekshirish
async function checkOrder(orderId: string, amount: number) {
  // Database dan buyurtmani tekshirish
  // const order = await db.order.findUnique({ where: { id: orderId } });
  
  // Mock data
  const order = {
    id: orderId,
    amount: amount,
    status: 'pending',
    userId: 'user123'
  };

  if (!order) {
    return CLICK_ERRORS.ORDER_NOT_FOUND;
  }

  if (order.status === 'paid') {
    return CLICK_ERRORS.ORDER_ALREADY_PAID;
  }

  if (order.amount !== amount) {
    return CLICK_ERRORS.INVALID_AMOUNT;
  }

  return CLICK_ERRORS.SUCCESS;
}

// To'lovni tasdiqlash
async function confirmPayment(orderId: string, clickTransId: string, clickPaydocId: string) {
  try {
    // Database da tranzaksiyani yangilash
    // await db.transaction.update({
    //   where: { orderId },
    //   data: { 
    //     status: 'completed',
    //     clickTransId,
    //     clickPaydocId,
    //     completedAt: new Date()
    //   }
    // });

    // Buyurtma statusini yangilash
    // await db.order.update({
    //   where: { id: orderId },
    //   data: { status: 'paid' }
    // });

    console.log(`Order ${orderId} successfully paid via Click`);
    return CLICK_ERRORS.SUCCESS;
  } catch (error) {
    console.error('Error confirming payment:', error);
    return { error: -9, error_note: "Database error" };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ClickCallback = await request.json();
    const {
      click_trans_id,
      service_id,
      merchant_trans_id,
      amount,
      action,
      error,
      error_note
    } = body;

    const CLICK_SECRET_KEY = process.env.CLICK_SECRET_KEY;
    const CLICK_SERVICE_ID = process.env.CLICK_SERVICE_ID;

    if (!CLICK_SECRET_KEY || !CLICK_SERVICE_ID) {
      return NextResponse.json({
        error: -8,
        error_note: "Configuration error"
      });
    }

    // Service ID tekshirish
    if (service_id !== CLICK_SERVICE_ID) {
      return NextResponse.json({
        error: -5,
        error_note: "Service not found"
      });
    }

    // Imzo tekshirish
    if (!verifySignature(body, CLICK_SECRET_KEY)) {
      return NextResponse.json(CLICK_ERRORS.INVALID_SIGN);
    }

    const orderAmount = parseFloat(amount);

    if (action === "0") {
      // PREPARE - To'lovni tayyorlash
      const orderCheck = await checkOrder(merchant_trans_id, orderAmount);
      
      if (orderCheck.error !== 0) {
        return NextResponse.json(orderCheck);
      }

      // Tranzaksiyani database ga saqlash
      // await db.transaction.create({
      //   data: {
      //     orderId: merchant_trans_id,
      //     amount: orderAmount,
      //     method: 'click',
      //     status: 'pending',
      //     clickTransId: click_trans_id,
      //     createdAt: new Date()
      //   }
      // });

      return NextResponse.json({
        ...CLICK_ERRORS.SUCCESS,
        click_trans_id,
        merchant_trans_id,
        merchant_prepare_id: Date.now(),
        merchant_confirm_id: ""
      });

    } else if (action === "1") {
      // COMPLETE - To'lovni yakunlash
      if (error !== "0") {
        // To'lovda xatolik bo'lgan
        console.log(`Click payment failed: ${error_note}`);
        return NextResponse.json({
          ...CLICK_ERRORS.TRANSACTION_CANCELLED,
          click_trans_id,
          merchant_trans_id,
          merchant_confirm_id: ""
        });
      }

      // To'lovni tasdiqlash
      const confirmResult = await confirmPayment(
        merchant_trans_id, 
        click_trans_id, 
        body.click_paydoc_id
      );

      return NextResponse.json({
        ...confirmResult,
        click_trans_id,
        merchant_trans_id,
        merchant_confirm_id: Date.now()
      });

    } else {
      return NextResponse.json(CLICK_ERRORS.INVALID_ACTION);
    }

  } catch (error) {
    console.error('Click callback error:', error);
    return NextResponse.json({
      error: -9,
      error_note: "Internal server error"
    });
  }
}
