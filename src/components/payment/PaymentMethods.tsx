'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Calendar,
  Shield,
  Clock,
  CheckCircle,
  Info
} from 'lucide-react';
import Image from 'next/image';
import { formatUZS } from '@/lib/utils';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  logo?: string;
  fee?: number;
  processingTime: string;
  features: string[];
  popular?: boolean;
  installment?: boolean;
  minAmount?: number;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'uzum-nasiya',
    name: 'Uzum Nasiya',
    description: 'Bo\'lib to\'lash 3-24 oy muddatga',
    icon: <Calendar className="w-5 h-5" />,
    logo: '/payment/placeholder.svg',
    fee: 0,
    processingTime: 'Darhol',
    features: ['0% birinchi to\'lov', '3-24 oy muddatga', 'Onlayn tasdiqlash', 'Hujjatsiz'],
    popular: true,
    installment: true,
    minAmount: 100000,
  },
  {
    id: 'click',
    name: 'Click',
    description: 'Click orqali tez va xavfsiz to\'lov',
    icon: <Smartphone className="w-5 h-5" />,
    logo: '/payment/placeholder.svg',
    fee: 0,
    processingTime: 'Darhol',
    features: ['Kartasiz to\'lov', 'QR kod', 'SMS tasdiqlash', '24/7 qo\'llab-quvvatlash'],
    popular: true,
  },
  {
    id: 'payme',
    name: 'Payme',
    description: 'Payme orqali qulay to\'lov',
    icon: <CreditCard className="w-5 h-5" />,
    logo: '/payment/placeholder.svg',
    fee: 0,
    processingTime: 'Darhol',
    features: ['Barcha kartalar', 'Mobil to\'lov', 'Cashback', 'Xavfsiz'],
  },
  {
    id: 'humo',
    name: 'Humo',
    description: 'Humo kartalar orqali to\'lov',
    icon: <CreditCard className="w-5 h-5" />,
    logo: '/payment/placeholder.svg',
    fee: 0,
    processingTime: 'Darhol',
    features: ['Mahalliy karta', 'Past komissiya', 'Tez o\'tkazma', 'Xavfsiz'],
  },
  {
    id: 'uzcard',
    name: 'UzCard',
    description: 'UzCard orqali to\'lov',
    icon: <CreditCard className="w-5 h-5" />,
    logo: '/payment/placeholder.svg',
    fee: 0,
    processingTime: 'Darhol',
    features: ['Mahalliy karta', 'Keng tarqalgan', 'Ishonchli', 'Tez'],
  },
  {
    id: 'cash',
    name: 'Naqd to\'lov',
    description: 'Yetkazib berishda naqd to\'lov',
    icon: <Banknote className="w-5 h-5" />,
    fee: 0,
    processingTime: 'Yetkazib berishda',
    features: ['Mahsulotni ko\'rib to\'lash', 'Hech qanday komissiya', 'Xavfsiz', 'Qulay'],
  },
];

interface PaymentMethodsProps {
  totalAmount: number;
  onPaymentMethodSelect: (methodId: string, installmentMonths?: number) => void;
  selectedMethod?: string;
}

export default function PaymentMethods({ 
  totalAmount, 
  onPaymentMethodSelect, 
  selectedMethod 
}: PaymentMethodsProps) {
  const [selectedInstallmentMonths, setSelectedInstallmentMonths] = useState<number>(3);

  const installmentOptions = [3, 6, 9, 12, 18, 24];

  const calculateInstallment = (months: number) => {
    const interestRates = { 3: 0.15, 6: 0.18, 9: 0.20, 12: 0.22, 18: 0.25, 24: 0.28 };
    const rate = interestRates[months] || 0.15;
    const totalWithInterest = totalAmount * (1 + rate);
    const monthlyPayment = Math.ceil(totalWithInterest / months);
    const firstPayment = Math.ceil(totalAmount * 0.2);
    
    return { monthlyPayment, firstPayment, totalWithInterest };
  };

  const handleMethodSelect = (methodId: string) => {
    if (methodId === 'uzum-nasiya') {
      onPaymentMethodSelect(methodId, selectedInstallmentMonths);
    } else {
      onPaymentMethodSelect(methodId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">To'lov usulini tanlang</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>Xavfsiz to'lov</span>
        </div>
      </div>

      <RadioGroup value={selectedMethod} onValueChange={handleMethodSelect}>
        <div className="grid gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="relative">
              <Label htmlFor={method.id} className="cursor-pointer">
                <Card className={`transition-all duration-200 hover:shadow-md ${
                  selectedMethod === method.id 
                    ? 'ring-2 ring-primary border-primary' 
                    : 'border-gray-200'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                      
                      <div className="flex-1 space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {method.logo ? (
                              <div className="relative w-8 h-8">
                                <Image
                                  src={method.logo}
                                  alt={method.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                {method.icon}
                              </div>
                            )}
                            
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-900">{method.name}</h4>
                                {method.popular && (
                                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                                    Mashhur
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              {method.fee > 0 ? `+${formatUZS(method.fee)}` : 'Bepul'}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {method.processingTime}
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {method.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        {/* Installment Options for Uzum Nasiya */}
                        {method.id === 'uzum-nasiya' && selectedMethod === method.id && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                            <h5 className="font-medium text-gray-900">Bo'lib to'lash muddatini tanlang:</h5>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {installmentOptions.map((months) => {
                                const { monthlyPayment, firstPayment } = calculateInstallment(months);
                                return (
                                  <Label
                                    key={months}
                                    htmlFor={`installment-${months}`}
                                    className="cursor-pointer"
                                  >
                                    <Card className={`p-3 transition-all duration-200 ${
                                      selectedInstallmentMonths === months
                                        ? 'ring-2 ring-primary border-primary bg-primary/5'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                      <RadioGroup
                                        value={selectedInstallmentMonths.toString()}
                                        onValueChange={(value) => setSelectedInstallmentMonths(parseInt(value))}
                                      >
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value={months.toString()}
                                            id={`installment-${months}`}
                                            className="w-4 h-4"
                                          />
                                          <div className="flex-1 text-center">
                                            <div className="font-medium text-sm">{months} oy</div>
                                            <div className="text-xs text-gray-600">
                                              {formatUZS(monthlyPayment)}/oy
                                            </div>
                                            <div className="text-xs text-primary">
                                              Birinchi: {formatUZS(firstPayment)}
                                            </div>
                                          </div>
                                        </div>
                                      </RadioGroup>
                                    </Card>
                                  </Label>
                                );
                              })}
                            </div>

                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="flex items-start gap-2">
                                <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                                <div className="text-sm text-blue-800">
                                  <p className="font-medium">Uzum Nasiya haqida:</p>
                                  <ul className="mt-1 space-y-1 text-xs">
                                    <li>• Hujjat talab qilinmaydi</li>
                                    <li>• 5 daqiqada tasdiqlash</li>
                                    <li>• Birinchi to'lov 20% dan boshlanadi</li>
                                    <li>• Muddatidan oldin to'lash mumkin</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Minimum amount warning */}
                        {method.minAmount && totalAmount < method.minAmount && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-yellow-800">
                              <Info className="w-4 h-4" />
                              <span className="text-sm">
                                Minimal summa: {formatUZS(method.minAmount)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      {/* Security Notice */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield className="w-4 h-4" />
          <span>
            Barcha to'lovlar SSL shifrlash bilan himoyalangan. 
            Sizning karta ma'lumotlaringiz xavfsiz saqlanadi.
          </span>
        </div>
      </div>
    </div>
  );
}
