'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 450000,
    items: [
      { name: 'Konstruktor To\'plami', quantity: 1, price: 180000 },
      { name: 'Robot O\'yinchoq', quantity: 1, price: 270000 }
    ]
  },
  {
    id: 'ORD-002', 
    date: '2024-01-10',
    status: 'shipping',
    total: 95000,
    items: [
      { name: 'Erkaklar Futbolka', quantity: 1, price: 95000 }
    ]
  },
  {
    id: 'ORD-003',
    date: '2024-01-05', 
    status: 'processing',
    total: 325000,
    items: [
      { name: 'Maktab Sumkasi', quantity: 1, price: 240000 },
      { name: 'Bolalar Kitob', quantity: 1, price: 85000 }
    ]
  }
];

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  if (!user) {
    router.push('/login');
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'processing':
        return {
          label: 'Tayyorlanmoqda',
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock
        };
      case 'shipping':
        return {
          label: 'Yetkazilmoqda',
          color: 'bg-blue-100 text-blue-800',
          icon: Truck
        };
      case 'delivered':
        return {
          label: 'Yetkazildi',
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle
        };
      default:
        return {
          label: 'Noma\'lum',
          color: 'bg-gray-100 text-gray-800',
          icon: Package
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/profile" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Profilga qaytish
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">
              Buyurtmalar ({mockOrders.length})
            </h1>
          </div>
          
          <p className="text-gray-600">
            Barcha buyurtmalaringiz tarixi va holati
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {mockOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <Card key={order.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Buyurtma #{order.id}</CardTitle>
                      <CardDescription>
                        {formatDate(order.date)} da berilgan
                      </CardDescription>
                    </div>
                    <Badge className={statusInfo.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Miqdor: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-primary">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-900">Jami:</span>
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(order.total)}
                    </span>
                  </div>

                  {/* Order Actions */}
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" size="sm">
                      Batafsil ko'rish
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        Qayta buyurtma berish
                      </Button>
                    )}
                    {order.status === 'processing' && (
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                        Bekor qilish
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State (if no orders) */}
        {mockOrders.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Hozircha buyurtmalar yo'q
              </h2>
              <p className="text-gray-600 mb-6">
                Birinchi buyurtmangizni bering va bu yerda kuzatib boring
              </p>
              <Link href="/">
                <Button>
                  Xaridni boshlash
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Bottom Actions */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline" className="mr-4">
              Xaridni davom ettirish
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline">
              Profilga qaytish
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
