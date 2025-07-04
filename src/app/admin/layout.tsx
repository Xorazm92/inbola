import React from 'react';
import UzumHeader from '@/components/layout/UzumHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <UzumHeader />
      <main className="pt-4">
        {children}
      </main>
    </div>
  );
}
