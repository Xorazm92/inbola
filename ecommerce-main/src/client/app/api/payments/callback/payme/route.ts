import { NextRequest, NextResponse } from 'next/server';

interface PaymeRequest {
  method: string;
  params: {
    id?: string;
    time?: number;
    account?: {
      order_id: string;
    };
    amount?: number;
    reason?: number;
  };
}

interface PaymeResponse {
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

// Payme xatolik kodlari
const PAYME_ERRORS = {
  INVALID_AMOUNT: { code: -31001, message: "Noto'g'ri summa" },
  ORDER_NOT_FOUND: { code: -31050, message: "Buyurtma topilmadi" },
  ORDER_ALREADY_PAID: { code: -31051, message: "Buyurtma allaqachon to'langan" },
  TRANSACTION_NOT_FOUND: { code: -31003, message: "Tranzaksiya topilmadi" },
  INVALID_ACCOUNT: { code: -31001, message: "Noto'g'ri hisob" }
};

// Buyurtma tekshirish
async function checkOrder(orderId: string, amount: number) {
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
    throw PAYME_ERRORS.ORDER_NOT_FOUND;
  }

  if (order.status === 'paid') {
    throw PAYME_ERRORS.ORDER_ALREADY_PAID;
  }

  if (order.amount !== amount / 100) {
    throw PAYME_ERRORS.INVALID_AMOUNT;
  }

  return order;
}

// Tranzaksiya yaratish
async function createTransaction(id: string, orderId: string, amount: number, time: number) {
  // Database ga tranzaksiya saqlash
  // const transaction = await db.transaction.create({
  //   data: {
  //     id,
  //     orderId,
  //     amount: amount / 100,
  //     method: 'payme',
  //     status: 'pending',
  //     createdAt: new Date(time)
  //   }
  // });

  // Mock response
  return {
    create_time: time,
    transaction: id,
    state: 1 // pending
  };
}

// Tranzaksiya bajarish
async function performTransaction(id: string) {
  // Database da tranzaksiyani yangilash
  // await db.transaction.update({
  //   where: { id },
  //   data: { 
  //     status: 'completed',
  //     performedAt: new Date()
  //   }
  // });

  // Buyurtma statusini yangilash
  // await db.order.update({
  //   where: { id: transaction.orderId },
  //   data: { status: 'paid' }
  // });

  return {
    perform_time: Date.now(),
    transaction: id,
    state: 2 // completed
  };
}

// Tranzaksiya bekor qilish
async function cancelTransaction(id: string, reason: number) {
  // Database da tranzaksiyani bekor qilish
  // await db.transaction.update({
  //   where: { id },
  //   data: { 
  //     status: 'cancelled',
  //     cancelledAt: new Date(),
  //     cancelReason: reason
  //   }
  // });

  return {
    cancel_time: Date.now(),
    transaction: id,
    state: -reason // cancelled
  };
}

// Tranzaksiya holati tekshirish
async function checkTransaction(id: string) {
  // Database dan tranzaksiya olish
  // const transaction = await db.transaction.findUnique({ where: { id } });

  // Mock data
  const transaction = {
    id,
    amount: 50000,
    status: 'completed',
    createdAt: new Date(),
    performedAt: new Date()
  };

  if (!transaction) {
    throw PAYME_ERRORS.TRANSACTION_NOT_FOUND;
  }

  return {
    create_time: transaction.createdAt.getTime(),
    perform_time: transaction.performedAt?.getTime() || 0,
    cancel_time: 0,
    transaction: id,
    state: transaction.status === 'completed' ? 2 : 1,
    reason: null
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymeRequest = await request.json();
    const { method, params } = body;

    let response: PaymeResponse = {};

    switch (method) {
      case 'CheckPerformTransaction':
        try {
          if (!params.account?.order_id || !params.amount) {
            response.error = PAYME_ERRORS.INVALID_ACCOUNT;
            break;
          }
          
          await checkOrder(params.account.order_id, params.amount);
          response.result = { allow: true };
        } catch (error: any) {
          response.error = error;
        }
        break;

      case 'CreateTransaction':
        try {
          if (!params.id || !params.account?.order_id || !params.amount || !params.time) {
            response.error = PAYME_ERRORS.INVALID_ACCOUNT;
            break;
          }

          await checkOrder(params.account.order_id, params.amount);
          response.result = await createTransaction(
            params.id, 
            params.account.order_id, 
            params.amount, 
            params.time
          );
        } catch (error: any) {
          response.error = error;
        }
        break;

      case 'PerformTransaction':
        try {
          if (!params.id) {
            response.error = PAYME_ERRORS.TRANSACTION_NOT_FOUND;
            break;
          }

          response.result = await performTransaction(params.id);
        } catch (error: any) {
          response.error = error;
        }
        break;

      case 'CancelTransaction':
        try {
          if (!params.id) {
            response.error = PAYME_ERRORS.TRANSACTION_NOT_FOUND;
            break;
          }

          response.result = await cancelTransaction(params.id, params.reason || 1);
        } catch (error: any) {
          response.error = error;
        }
        break;

      case 'CheckTransaction':
        try {
          if (!params.id) {
            response.error = PAYME_ERRORS.TRANSACTION_NOT_FOUND;
            break;
          }

          response.result = await checkTransaction(params.id);
        } catch (error: any) {
          response.error = error;
        }
        break;

      default:
        response.error = {
          code: -32601,
          message: "Method not found"
        };
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Payme callback xatoligi:', error);
    return NextResponse.json({
      error: {
        code: -32700,
        message: "Parse error"
      }
    }, { status: 500 });
  }
}
