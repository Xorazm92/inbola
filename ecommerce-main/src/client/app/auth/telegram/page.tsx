"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle, MessageCircle } from "lucide-react";
import MainLayout from "@/app/components/templates/MainLayout";

const TelegramAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Token topilmadi. Telegram botdan qaytadan urinib ko\'ring.');
      return;
    }

    // Token orqali autentifikatsiya
    authenticateWithToken(token);
  }, [searchParams]);

  const authenticateWithToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/telegram/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setMessage('Muvaffaqiyatli kirdingiz! Bosh sahifaga yo\'naltirilmoqda...');
        
        // Local storage ga token saqlash
        localStorage.setItem('auth_token', result.authToken);
        
        // 2 sekund kutib bosh sahifaga yo'naltirish
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setStatus('error');
        setMessage(result.message || 'Autentifikatsiyada xatolik yuz berdi.');
      }
    } catch (error) {
      console.error('Telegram auth error:', error);
      setStatus('error');
      setMessage('Serverda xatolik yuz berdi. Qaytadan urinib ko\'ring.');
    }
  };

  const handleRetry = () => {
    window.open('https://t.me/inbola_auth_bot?start=auth', '_blank');
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
          <div className="mb-6">
            <MessageCircle size={48} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Telegram Autentifikatsiya
            </h2>
          </div>

          {status === 'loading' && (
            <div className="space-y-4">
              <Loader2 className="animate-spin mx-auto text-indigo-600" size={32} />
              <p className="text-gray-600">
                Telegram orqali autentifikatsiya qilinmoqda...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <CheckCircle className="mx-auto text-green-500" size={48} />
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  Muvaffaqiyat!
                </h3>
                <p className="text-gray-600">{message}</p>
              </div>
              <div className="animate-pulse">
                <div className="h-2 bg-green-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <XCircle className="mx-auto text-red-500" size={48} />
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-2">
                  Xatolik
                </h3>
                <p className="text-gray-600 mb-4">{message}</p>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handleRetry}
                  className="w-full py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle size={16} className="inline mr-2" />
                  Telegram botni qayta ochish
                </button>
                
                <button
                  onClick={() => router.push('/sign-in')}
                  className="w-full py-2.5 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors"
                >
                  Kirish sahifasiga qaytish
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Telegram bot orqali xavfsiz va tezkor autentifikatsiya
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TelegramAuth;
