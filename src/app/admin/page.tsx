'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Package, Users, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  approvedForSale: string;
  featured: boolean;
  inStock: boolean;
  rating: number;
  createdAt: string;
}

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  ageGroup: string;
  color: string[];
  size: string[];
}

const [formData, setFormData] = useState<ProductFormData>({
  name: '',
  description: '',
  price: '',
  category: 'clothing',
  ageGroup: '',
  color: [],
  size: [],
});
const [images, setImages] = useState<File[]>([]);
const [productFiles, setProductFiles] = useState<File[]>([]);
const [imagePreviews, setImagePreviews] = useState<string[]>([]);
const [fileNames, setFileNames] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products?limit=50');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const [submitLoading, setSubmitLoading] = useState(false);
const [formError, setFormError] = useState<string | null>(null);
const [formSuccess, setFormSuccess] = useState<string | null>(null);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    // Client-side validation
    if (!formData.name.trim() || !formData.price.trim() || !formData.category.trim()) {
      setFormError('Barcha majburiy maydonlarni to‘ldiring.');
      return;
    }
    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      setFormError('Narx musbat raqam bo‘lishi kerak.');
      return;
    }

    setSubmitLoading(true);
    try {
      // Prepare FormData for file/image upload
      const fd = new FormData();
      fd.append('name', formData.name.trim());
      fd.append('description', formData.description.trim());
      fd.append('price', formData.price);
      fd.append('category', formData.category);
      fd.append('ageGroup', formData.ageGroup);
      formData.color.forEach((c, i) => fd.append(`color[${i}]`, c));
      formData.size.forEach((s, i) => fd.append(`size[${i}]`, s));
      images.forEach((img, i) => fd.append('images', img));
      productFiles.forEach((f, i) => fd.append('product_files', f));

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: fd,
      });

      if (response.ok) {
        setFormSuccess('Mahsulot muvaffaqiyatli qo‘shildi!');
        setFormData({ name: '', description: '', price: '', category: 'clothing', ageGroup: '', color: [], size: [] });
        setImages([]);
        setProductFiles([]);
        setImagePreviews([]);
        setFileNames([]);
        setShowAddForm(false);
        fetchProducts();
      } else {
        const data = await response.json();
        setFormError(data.error || 'Xatolik yuz berdi.');
      }
    } catch (error) {
      setFormError('Server bilan bog‘lanishda xatolik.');
    } finally {
      setSubmitLoading(false);
    }
  };



  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">INBOLA Admin</h1>
              <p className="text-gray-600">Mahsulotlarni boshqarish va nazorat qilish</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Jami Mahsulotlar</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Faol Mahsulotlar</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.approvedForSale === 'approved').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Featured</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.featured).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Omborda</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.inStock).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <Button variant="outline" className="bg-white">
              <Package className="w-4 h-4 mr-2" />
              Mahsulotlar
            </Button>
            <Button variant="ghost">
              <Users className="w-4 h-4 mr-2" />
              Foydalanuvchilar
            </Button>
            <Button variant="ghost">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buyurtmalar
            </Button>
          </div>

          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yangi Mahsulot
          </Button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Yangi Mahsulot Qo'shish</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-sm">{formError}</div>
                )}
                {formSuccess && (
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-2 text-sm">{formSuccess}</div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Mahsulot Nomi</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Narx (UZS)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Kategoriya</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="clothing">Kiyim-kechak</option>
                      <option value="toys">O'yinchoqlar</option>
                      <option value="books">Kitoblar</option>
                      <option value="school_supplies">Maktab buyumlari</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="ageGroup">Yosh guruhi</Label>
                    <select
                      id="ageGroup"
                      value={formData.ageGroup}
                      onChange={(e) => setFormData({...formData, ageGroup: e.target.value})}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Tanlang</option>
                      <option value="0-2">0-2</option>
                      <option value="3-5">3-5</option>
                      <option value="6-9">6-9</option>
                      <option value="10+">10+</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Ranglar (vergul bilan ajrating)</Label>
                    <Input
                      value={formData.color.join(', ')}
                      onChange={e => setFormData({...formData, color: e.target.value.split(',').map(c => c.trim()).filter(Boolean)})}
                      placeholder="Qizil, Ko'k, Yashil"
                    />
                  </div>
                  <div>
                    <Label>O'lchamlar (vergul bilan ajrating)</Label>
                    <Input
                      value={formData.size.join(', ')}
                      onChange={e => setFormData({...formData, size: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                      placeholder="S, M, L, XL"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Tavsif</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Rasmlar (bir nechta)</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={e => {
                        const files = Array.from(e.target.files || []);
                        setImages(files);
                        setImagePreviews(files.map(file => URL.createObjectURL(file)));
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {imagePreviews.map((src, i) => (
                        <img key={i} src={src} alt="rasm preview" className="w-16 h-16 object-cover rounded border" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Fayllar (pdf yoki boshqa, bir nechta)</Label>
                    <Input
                      type="file"
                      multiple
                      onChange={e => {
                        const files = Array.from(e.target.files || []);
                        setProductFiles(files);
                        setFileNames(files.map(f => f.name));
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {fileNames.map((name, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">{name}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {formError && (
                  <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-sm">{formError}</div>
                )}
                {formSuccess && (
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-2 text-sm">{formSuccess}</div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Mahsulot Nomi</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Narx (UZS)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category">Kategoriya</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="clothing">Kiyim-kechak</option>
                    <option value="toys">O'yinchoqlar</option>
                    <option value="books">Kitoblar</option>
                    <option value="school_supplies">Maktab buyumlari</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Tavsif</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={submitLoading}>
                    {submitLoading ? 'Saqlanmoqda...' : 'Saqlash'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddForm(false)}
                  >
                    Bekor qilish
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Mahsulotlar Ro'yxati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Nomi</th>
                    <th className="text-left p-2">Narx</th>
                    <th className="text-left p-2">Kategoriya</th>
                    <th className="text-left p-2">Holat</th>
                    <th className="text-left p-2">Featured</th>
                    <th className="text-left p-2">Sana</th>
                    <th className="text-left p-2">Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{product.name}</td>
                      <td className="p-2">{formatPrice(product.price)}</td>
                      <td className="p-2 capitalize">{product.category}</td>
                      <td className="p-2">
                        <Badge 
                          variant={product.approvedForSale === 'approved' ? 'default' : 'secondary'}
                        >
                          {product.approvedForSale}
                        </Badge>
                      </td>
                      <td className="p-2">
                        {product.featured ? (
                          <Badge variant="outline">Featured</Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-2 text-sm text-gray-600">
                        {new Date(product.createdAt).toLocaleDateString('uz-UZ')}
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
