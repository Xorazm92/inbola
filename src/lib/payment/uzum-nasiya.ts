export interface UzumNasiyaConfig {
  merchantId: string;
  secretKey: string;
  baseUrl: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface UzumNasiyaPaymentRequest {
  orderId: string;
  amount: number;
  currency: 'UZS';
  description: string;
  customerPhone: string;
  customerEmail?: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    category?: string;
  }>;
  installmentMonths?: 3 | 6 | 9 | 12 | 18 | 24;
}

export interface UzumNasiyaPaymentResponse {
  success: boolean;
  paymentUrl?: string;
  transactionId?: string;
  error?: string;
  errorCode?: string;
}

export interface UzumNasiyaStatusResponse {
  status: 'pending' | 'approved' | 'rejected' | 'paid' | 'cancelled';
  transactionId: string;
  orderId: string;
  amount: number;
  installmentMonths?: number;
  monthlyPayment?: number;
  firstPayment?: number;
  approvedAt?: string;
  paidAt?: string;
}

export class UzumNasiyaService {
  private config: UzumNasiyaConfig;

  constructor(config: UzumNasiyaConfig) {
    this.config = config;
  }

  private generateSignature(data: Record<string, any>): string {
    // Implement HMAC-SHA256 signature generation
    const crypto = require('crypto');
    const sortedKeys = Object.keys(data).sort();
    const signString = sortedKeys.map(key => `${key}=${data[key]}`).join('&');
    return crypto.createHmac('sha256', this.config.secretKey).update(signString).digest('hex');
  }

  async createPayment(request: UzumNasiyaPaymentRequest): Promise<UzumNasiyaPaymentResponse> {
    try {
      const paymentData = {
        merchant_id: this.config.merchantId,
        order_id: request.orderId,
        amount: request.amount,
        currency: request.currency,
        description: request.description,
        customer_phone: request.customerPhone,
        customer_email: request.customerEmail,
        return_url: this.config.returnUrl,
        cancel_url: this.config.cancelUrl,
        items: JSON.stringify(request.items),
        installment_months: request.installmentMonths || 3,
        timestamp: Date.now(),
      };

      const signature = this.generateSignature(paymentData);
      paymentData.signature = signature;

      const response = await fetch(`${this.config.baseUrl}/api/v1/payments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        return {
          success: true,
          paymentUrl: result.payment_url,
          transactionId: result.transaction_id,
        };
      } else {
        return {
          success: false,
          error: result.error || 'Payment creation failed',
          errorCode: result.error_code,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred',
      };
    }
  }

  async checkPaymentStatus(transactionId: string): Promise<UzumNasiyaStatusResponse | null> {
    try {
      const requestData = {
        merchant_id: this.config.merchantId,
        transaction_id: transactionId,
        timestamp: Date.now(),
      };

      const signature = this.generateSignature(requestData);
      requestData.signature = signature;

      const response = await fetch(`${this.config.baseUrl}/api/v1/payments/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        return {
          status: result.status,
          transactionId: result.transaction_id,
          orderId: result.order_id,
          amount: result.amount,
          installmentMonths: result.installment_months,
          monthlyPayment: result.monthly_payment,
          firstPayment: result.first_payment,
          approvedAt: result.approved_at,
          paidAt: result.paid_at,
        };
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  async cancelPayment(transactionId: string): Promise<boolean> {
    try {
      const requestData = {
        merchant_id: this.config.merchantId,
        transaction_id: transactionId,
        timestamp: Date.now(),
      };

      const signature = this.generateSignature(requestData);
      requestData.signature = signature;

      const response = await fetch(`${this.config.baseUrl}/api/v1/payments/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      return response.ok && result.success;
    } catch (error) {
      return false;
    }
  }

  calculateInstallment(amount: number, months: number): {
    monthlyPayment: number;
    firstPayment: number;
    totalAmount: number;
    interestRate: number;
  } {
    // Uzum nasiya interest rates (example rates)
    const interestRates = {
      3: 0.15,   // 15% for 3 months
      6: 0.18,   // 18% for 6 months
      9: 0.20,   // 20% for 9 months
      12: 0.22,  // 22% for 12 months
      18: 0.25,  // 25% for 18 months
      24: 0.28,  // 28% for 24 months
    };

    const interestRate = interestRates[months] || 0.15;
    const totalAmount = amount * (1 + interestRate);
    const monthlyPayment = Math.ceil(totalAmount / months);
    const firstPayment = Math.ceil(amount * 0.2); // 20% down payment

    return {
      monthlyPayment,
      firstPayment,
      totalAmount,
      interestRate,
    };
  }
}

// Initialize Uzum Nasiya service
export const uzumNasiyaService = new UzumNasiyaService({
  merchantId: process.env.UZUM_NASIYA_MERCHANT_ID || '',
  secretKey: process.env.UZUM_NASIYA_SECRET_KEY || '',
  baseUrl: process.env.UZUM_NASIYA_BASE_URL || 'https://api.uzumnasiya.uz',
  returnUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/uzum-nasiya/success`,
  cancelUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/uzum-nasiya/cancel`,
});

export default UzumNasiyaService;
