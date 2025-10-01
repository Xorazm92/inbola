"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowLeft, Shield, Clock } from "lucide-react";
import MainLayout from "@/app/components/templates/MainLayout";
import PaymentMethods from "@/app/components/molecules/PaymentMethods";

interface OrderSummary {
  orderId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
}

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // URL dan buyurtma ma'lumotlarini olish
    const orderId = searchParams.get('orderId');
    const total = searchParams.get('total');
    
    if (!orderId || !total) {
      router.push('/cart');
      return;
    }

    // Mock order data (haqiqiy loyihada API dan olinadi)
    setOrderSummary({
      orderId,
      items: [
        {
          id: '1',
          name: 'Premium Smartfon',
          price: 2500000,
          quantity: 1,
          image: '/products/phone.jpg'
        },
        {
          id: '2',
          name: 'Wireless Quloqchin',
          price: 350000,
          quantity: 2,
          image: '/products/headphones.jpg'
        }
      ],
      subtotal: 3200000,
      shipping: 50000,
      total: parseInt(total)
    });
  }, [searchParams, router]);

  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
    setError('');
  };

  const handlePayment = async () => {
    if (!selectedPayment || !orderSummary) {
      setError('To\'lov usulini tanlang');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: selectedPayment,
          amount: orderSummary.total,
          orderId: orderSummary.orderId,
          returnUrl: `${window.location.origin}/payment/success`,
          description: `Inbola - Buyurtma #${orderSummary.orderId}`
        }),
      });

      const result = await response.json();

      if (result.success && result.paymentUrl) {
        // To'lov sahifasiga yo'naltirish
        window.location.href = result.paymentUrl;
      } else {
        setError(result.error || 'To\'lov yaratishda xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Serverda xatolik yuz berdi. Qaytadan urinib ko\'ring.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  if (!orderSummary) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Orqaga qaytish
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900">
              To'lov
            </h1>
            <p className="text-gray-600 mt-2">
              Buyurtma #{orderSummary.orderId}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* To'lov usullari */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                To'lov usuli
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <PaymentMethods
                onPaymentSelect={handlePaymentSelect}
                selectedMethod={selectedPayment}
                amount={orderSummary.total}
              />

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <Shield className="w-4 h-4" />
                  <span>Barcha to'lovlar SSL sertifikat bilan himoyalangan</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>To'lov 15 daqiqa ichida amalga oshirilishi kerak</span>
                </div>
              </div>
            </div>

            {/* Buyurtma xulosasi */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Buyurtma xulosasi
              </h2>

              {/* Mahsulotlar ro'yxati */}
              <div className="space-y-4 mb-6">
                {orderSummary.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="text-gray-400 text-xs">IMG</div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Miqdor: {item.quantity}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatAmount(item.price * item.quantity)} so'm
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hisob-kitob */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Mahsulotlar:</span>
                  <span className="text-gray-900">
                    {formatAmount(orderSummary.subtotal)} so'm
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Yetkazib berish:</span>
                  <span className="text-gray-900">
                    {formatAmount(orderSummary.shipping)} so'm
                  </span>
                </div>
                
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                  <span className="text-gray-900">Jami:</span>
                  <span className="text-indigo-600">
                    {formatAmount(orderSummary.total)} so'm
                  </span>
                </div>
              </div>

              {/* To'lov tugmasi */}
              <button
                onClick={handlePayment}
                disabled={!selectedPayment || isProcessing}
                className={`
                  w-full mt-6 py-3 px-4 rounded-md font-medium text-white transition-colors
                  ${selectedPayment && !isProcessing
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span>To'lov yaratilmoqda...</span>
                  </div>
                ) : (
                  `${formatAmount(orderSummary.total)} so'm to'lash`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                To'lov tugmasini bosish orqali siz{" "}
                <a href="/terms" className="text-indigo-600 hover:underline">
                  foydalanish shartlari
                </a>{" "}
                bilan roziligiznigizni bildirasiz
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentPage;
