"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle, RefreshCw, ArrowLeft, Phone, Mail, MessageCircle, CreditCard } from "lucide-react";
import MainLayout from "@/app/components/templates/MainLayout";
import Link from "next/link";

interface FailedPaymentDetails {
  orderId: string;
  transactionId?: string;
  amount: number;
  method: string;
  errorCode?: string;
  errorMessage?: string;
  failedAt: string;
}

const PaymentFailedPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<FailedPaymentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    const transactionId = searchParams.get('transaction_id');
    const method = searchParams.get('method') || 'payme';
    const errorCode = searchParams.get('error_code');
    const errorMessage = searchParams.get('error_message');

    if (!orderId) {
      router.push('/');
      return;
    }

    // Mock failed payment details
    setTimeout(() => {
      setPaymentDetails({
        orderId,
        transactionId: transactionId || undefined,
        amount: 3250000,
        method: method.charAt(0).toUpperCase() + method.slice(1),
        errorCode: errorCode || 'PAYMENT_DECLINED',
        errorMessage: errorMessage || 'Karta bo\'yicha to\'lov rad etildi',
        failedAt: new Date().toISOString()
      });
      setIsLoading(false);
    }, 1000);
  }, [searchParams, router]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case 'payme': return 'bg-blue-100 text-blue-800';
      case 'click': return 'bg-orange-100 text-orange-800';
      case 'uzum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getErrorSolution = (errorCode: string) => {
    switch (errorCode) {
      case 'INSUFFICIENT_FUNDS':
        return {
          title: 'Kartada mablag\' yetarli emas',
          solutions: [
            'Kartangizda yetarli mablag\' borligini tekshiring',
            'Boshqa karta bilan to\'lovni amalga oshiring',
            'Bank hisobingizni to\'ldiring'
          ]
        };
      case 'PAYMENT_DECLINED':
        return {
          title: 'To\'lov rad etildi',
          solutions: [
            'Karta ma\'lumotlarini to\'g\'ri kiritganingizni tekshiring',
            'Kartangiz onlayn to\'lovlar uchun faollashtirilganligini tekshiring',
            'Bankingiz bilan bog\'laning'
          ]
        };
      case 'CARD_EXPIRED':
        return {
          title: 'Karta muddati tugagan',
          solutions: [
            'Yangi karta bilan to\'lovni amalga oshiring',
            'Kartangizni yangilash uchun bankingizga murojaat qiling'
          ]
        };
      case 'NETWORK_ERROR':
        return {
          title: 'Tarmoq xatoligi',
          solutions: [
            'Internet aloqangizni tekshiring',
            'Bir necha daqiqadan keyin qaytadan urinib ko\'ring',
            'Boshqa to\'lov usulini tanlang'
          ]
        };
      default:
        return {
          title: 'To\'lovda xatolik yuz berdi',
          solutions: [
            'Karta ma\'lumotlarini qaytadan tekshiring',
            'Boshqa to\'lov usulini tanlang',
            'Qo\'llab-quvvatlash xizmati bilan bog\'laning'
          ]
        };
    }
  };

  const handleRetryPayment = () => {
    if (!paymentDetails) return;
    
    setIsRetrying(true);
    // Redirect to payment page with order details
    setTimeout(() => {
      router.push(`/checkout/payment?orderId=${paymentDetails.orderId}&total=${paymentDetails.amount}`);
    }, 1000);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">To'lov ma'lumotlari tekshirilmoqda...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!paymentDetails) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              To'lov ma'lumotlari topilmadi
            </h1>
            <p className="text-gray-600 mb-6">
              To'lov ma'lumotlarini yuklashda xatolik yuz berdi
            </p>
            <Link
              href="/"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Bosh sahifaga qaytish
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const errorSolution = getErrorSolution(paymentDetails.errorCode || '');

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Failed Animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              To'lov amalga oshmadi 😔
            </h1>
            <p className="text-lg text-gray-600">
              Afsuski, to'lovingizda xatolik yuz berdi
            </p>
          </div>

          {/* Payment Details Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                To'lov Ma'lumotlari
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Buyurtma raqami
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      #{paymentDetails.orderId}
                    </p>
                  </div>
                  
                  {paymentDetails.transactionId && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Tranzaksiya ID
                      </label>
                      <p className="text-sm font-mono text-gray-700 bg-gray-50 p-2 rounded">
                        {paymentDetails.transactionId}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      To'lov usuli
                    </label>
                    <div className="flex items-center space-x-2 mt-1">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(paymentDetails.method)}`}>
                        {paymentDetails.method}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      To'lov miqdori
                    </label>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatAmount(paymentDetails.amount)} so'm
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Xatolik vaqti
                    </label>
                    <p className="text-sm text-gray-700">
                      {formatDate(paymentDetails.failedAt)}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Holat
                    </label>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium text-red-700">
                        Muvaffaqiyatsiz
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Details */}
              {paymentDetails.errorMessage && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="text-sm font-medium text-red-800 mb-2">
                    Xatolik tafsilotlari:
                  </h4>
                  <p className="text-sm text-red-700">
                    {paymentDetails.errorMessage}
                  </p>
                  {paymentDetails.errorCode && (
                    <p className="text-xs text-red-600 mt-1">
                      Kod: {paymentDetails.errorCode}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Solutions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {errorSolution.title}
            </h3>
            <div className="space-y-2">
              {errorSolution.solutions.map((solution, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700">{solution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={handleRetryPayment}
              disabled={isRetrying}
              className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRetrying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Yo'naltirilmoqda...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Qaytadan urinish</span>
                </>
              )}
            </button>
            
            <Link
              href="/cart"
              className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Savatchaga qaytish</span>
            </Link>
            
            <Link
              href="/shop"
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              <span>Xaridni davom ettirish</span>
            </Link>
          </div>

          {/* Contact Support */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Yordam kerakmi?
            </h3>
            <p className="text-sm text-blue-800 mb-4">
              Agar muammo davom etsa, bizning qo'llab-quvvatlash xizmati bilan bog'laning:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="tel:+998977771053"
                className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Telefon</p>
                  <p className="text-xs text-blue-700">+998 (97) 777-10-53</p>
                </div>
              </a>
              
              <a
                href="mailto:inbola.uz@gmail.com"
                className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Email</p>
                  <p className="text-xs text-blue-700">inbola.uz@gmail.com</p>
                </div>
              </a>
              
              <a
                href="https://t.me/Zufar_Xorazmiy"
                target="_blank"
                className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Telegram</p>
                  <p className="text-xs text-blue-700">@Zufar_Xorazmiy</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentFailedPage;
