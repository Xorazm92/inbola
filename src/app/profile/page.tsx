'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { ArrowLeft, User, ShoppingBag, Heart, Settings, Package, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { getTotalItems, getTotalPrice } = useCart();
  const { favoritesCount } = useFavorites();
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  // Redirect if not logged in
  if (!user) {
    router.push('/sign-in');
    return null;
  }

  const handleSaveProfile = () => {
    // In a real app, this would call an API to update user profile
    toast.success('Profil muvaffaqiyatli yangilandi!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast.success('Tizimdan muvaffaqiyatli chiqildi');
    router.push('/');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Bosh sahifaga qaytish
        </Link>

        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name || 'Foydalanuvchi'}</h1>
              <p className="text-gray-600">{user.email}</p>
              {user.role === 'admin' && (
                <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded-full mt-1">
                  Administrator
                </span>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Umumiy</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="orders">Buyurtmalar</TabsTrigger>
            <TabsTrigger value="settings">Sozlamalar</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cart Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Savatdagi mahsulotlar</p>
                      <p className="text-2xl font-bold">{getTotalItems()}</p>
                      <p className="text-sm text-gray-500">{formatPrice(getTotalPrice())}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Favorites Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sevimli mahsulotlar</p>
                      <p className="text-2xl font-bold">{favoritesCount}</p>
                      <p className="text-sm text-gray-500">ta mahsulot</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Orders Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Jami buyurtmalar</p>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-gray-500">ta buyurtma</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Tezkor amallar</CardTitle>
                <CardDescription>Eng ko'p ishlatiladigan funksiyalar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/cart">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                      <ShoppingBag className="w-6 h-6" />
                      <span>Savat</span>
                    </Button>
                  </Link>
                  <Link href="/favorites">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                      <Heart className="w-6 h-6" />
                      <span>Sevimlilar</span>
                    </Button>
                  </Link>
                  <Link href="/orders">
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                      <Package className="w-6 h-6" />
                      <span>Buyurtmalar</span>
                    </Button>
                  </Link>
                  {user.role === 'admin' && (
                    <Link href="/admin">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                        <Settings className="w-6 h-6" />
                        <span>Admin</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Shaxsiy ma'lumotlar</CardTitle>
                <CardDescription>
                  Shaxsiy ma'lumotlaringizni tahrirlang
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">To'liq ism</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon raqam</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={!isEditing}
                      placeholder="+998 90 123 45 67"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Manzil</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Shahar, ko'cha, uy raqami"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveProfile}>
                        Saqlash
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Bekor qilish
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Tahrirlash
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Buyurtmalar tarixi</CardTitle>
                <CardDescription>
                  Barcha buyurtmalaringiz ro'yxati
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Hozircha buyurtmalar yo'q
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Birinchi buyurtmangizni bering va bu yerda ko'ring
                  </p>
                  <Link href="/">
                    <Button>
                      Xaridni boshlash
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hisob sozlamalari</CardTitle>
                  <CardDescription>
                    Hisobingiz va xavfsizlik sozlamalari
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Parolni o'zgartirish</h4>
                      <p className="text-sm text-gray-600">Hisobingiz xavfsizligi uchun parolni yangilang</p>
                    </div>
                    <Button variant="outline">
                      O'zgartirish
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Email bildirishnomalar</h4>
                      <p className="text-sm text-gray-600">Yangi mahsulotlar va aksiyalar haqida xabar olish</p>
                    </div>
                    <Button variant="outline">
                      Sozlash
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg border-red-200">
                    <div>
                      <h4 className="font-medium text-red-600">Hisobni o'chirish</h4>
                      <p className="text-sm text-gray-600">Hisobingizni butunlay o'chirish</p>
                    </div>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      O'chirish
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Tizimdan chiqish
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
