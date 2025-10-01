"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Download, Eye, ArrowRight, Clock, CreditCard } from "lucide-react";
import MainLayout from "@/app/components/templates/MainLayout";
import Link from "next/link";

interface PaymentDetails {
  orderId: string;
  transactionId: string;
  amount: number;
  method: string;
  status: string;
  paidAt: string;
}

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    const transactionId = searchParams.get('transaction_id');
    const method = searchParams.get('method') || 'payme';

    if (!orderId) {
      router.push('/');
      return;
    }

    // Mock payment details (haqiqiy loyihada API dan olinadi)
    setTimeout(() => {
      setPaymentDetails({
        orderId,
        transactionId: transactionId || `${method}_${Date.now()}`,
        amount: 3250000,
        method: method.charAt(0).toUpperCase() + method.slice(1),
        status: 'completed',
        paidAt: new Date().toISOString()
      });
      setIsLoading(false);
    }, 1500);
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

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
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

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              To'lov muvaffaqiyatli amalga oshirildi! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Buyurtmangiz qabul qilindi va tez orada qayta ishlanadi
            </p>
          </div>

          {/* Payment Details Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
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
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Tranzaksiya ID
                    </label>
                    <p className="text-sm font-mono text-gray-700 bg-gray-50 p-2 rounded">
                      {paymentDetails.transactionId}
                    </p>
                  </div>
                  
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
                    <p className="text-2xl font-bold text-green-600">
                      {formatAmount(paymentDetails.amount)} so'm
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      To'lov vaqti
                    </label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-700">
                        {formatDate(paymentDetails.paidAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Holat
                    </label>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-700">
                        To'langan
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Chekni yuklab olish</span>
            </button>
            
            <Link
              href={`/orders/${paymentDetails.orderId}`}
              className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Buyurtmani ko'rish</span>
            </Link>
            
            <Link
              href="/shop"
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              <span>Xaridni davom ettirish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Keyingi qadamlar
            </h3>
            <div className="space-y-3 text-sm text-blue-800">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium">Buyurtma tasdiqlandi</p>
                  <p className="text-blue-600">Buyurtmangiz qabul qilindi va qayta ishlanmoqda</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium">Tayyorlanmoqda</p>
                  <p className="text-blue-600">Mahsulotlar tayyorlanib, qadoqlanadi (1-2 ish kuni)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium">Yetkazib beriladi</p>
                  <p className="text-blue-600">Buyurtma sizning manzilingizga yetkazib beriladi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center mt-8 text-sm text-gray-600">
            <p>Savollaringiz bormi? Bizga murojaat qiling:</p>
            <div className="flex justify-center space-x-6 mt-2">
              <a href="tel:+998977771053" className="text-indigo-600 hover:underline">
                +998 (97) 777-10-53
              </a>
              <a href="mailto:inbola.uz@gmail.com" className="text-indigo-600 hover:underline">
                inbola.uz@gmail.com
              </a>
              <a href="https://t.me/Zufar_Xorazmiy" target="_blank" className="text-indigo-600 hover:underline">
                Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentSuccessPage;
