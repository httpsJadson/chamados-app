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
    if (user?.role === 'TECH') {
      router.push('/tickets');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role === 'TECH') {
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-800">Novo Chamado</h1>
      <CreateTicketForm />
    </div>
  );
}
