'use client';

import CreateTicketForm from '@/components/CreateTicketForm';
import { useAuthStore } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NewTicketPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
    if (user?.role === 'TECHNICIAN') {
      router.push('/tickets');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role === 'TECHNICIAN') {
    return null;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
      <h1 className="text-4xl font-bold text-gray-800">Novo Chamado</h1>
      <CreateTicketForm />
    </div>
  );
}
