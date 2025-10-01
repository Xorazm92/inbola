"use client";
import { useState } from "react";
import { CreditCard, Smartphone, Wallet } from "lucide-react";
import Image from "next/image";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface PaymentMethodsProps {
  onPaymentSelect: (method: string) => void;
  selectedMethod?: string;
  amount: number;
}

const PaymentMethods = ({ onPaymentSelect, selectedMethod, amount }: PaymentMethodsProps) => {
  const [selected, setSelected] = useState<string>(selectedMethod || '');

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'payme',
      name: 'Payme',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Bank kartalar orqali xavfsiz to\'lov',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'click',
      name: 'Click',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Mobil to\'lovlar va bank kartalar',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'uzum',
      name: 'Uzum Bank',
      icon: <Wallet className="w-6 h-6" />,
      description: 'Uzum Bank orqali tezkor to\'lov',
      color: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelected(methodId);
    onPaymentSelect(methodId);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          To'lov usulini tanlang
        </h3>
        <div className="text-2xl font-bold text-indigo-600">
          {formatAmount(amount)} so'm
        </div>
      </div>

      <div className="grid gap-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handleMethodSelect(method.id)}
            className={`
              relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${selected === method.id 
                ? `${method.borderColor} ${method.bgColor} shadow-md` 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }
            `}
          >
            <div className="flex items-center space-x-4">
              <div className={`
                p-2 rounded-lg ${method.bgColor} ${method.color}
                ${selected === method.id ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}
              `}>
                {method.icon}
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-lg">
                  {method.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {method.description}
                </p>
              </div>

              <div className={`
                w-5 h-5 rounded-full border-2 transition-all
                ${selected === method.id 
                  ? 'bg-indigo-600 border-indigo-600' 
                  : 'border-gray-300'
                }
              `}>
                {selected === method.id && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Method specific info */}
            {selected === method.id && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-600">
                  {method.id === 'payme' && (
                    <div className="flex items-center space-x-2">
                      <span>✅ Visa, MasterCard, Humo, UzCard</span>
                    </div>
                  )}
                  {method.id === 'click' && (
                    <div className="flex items-center space-x-2">
                      <span>✅ Barcha bank kartalar, Click hisobi</span>
                    </div>
                  )}
                  {method.id === 'uzum' && (
                    <div className="flex items-center space-x-2">
                      <span>✅ Uzum Bank kartalar va hisobi</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-700 font-medium">
              {paymentMethods.find(m => m.id === selected)?.name} tanlandi
            </span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Keyingi bosqichda to'lov sahifasiga yo'naltirilasiz
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
