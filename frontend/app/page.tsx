'use client';

import TicketsList from '@/components/TicketsList';
import { useAuthStore } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-2">Bem-vindo, {user?.name}!</h1>
        <p className="text-blue-100">Sistema de gerenciamento de chamados de TI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">📋</div>
          <h3 className="text-lg font-semibold text-gray-800">Seus Chamados</h3>
          <p className="text-gray-600 text-sm">Acompanhe todos os seus chamados abertos</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-green-600 mb-2">✅</div>
          <h3 className="text-lg font-semibold text-gray-800">Status</h3>
          <p className="text-gray-600 text-sm">Visualize o status de cada chamado</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-orange-600 mb-2">🔧</div>
          <h3 className="text-lg font-semibold text-gray-800">Atribuição</h3>
          <p className="text-gray-600 text-sm">Técnicos podem atribuir chamados</p>
        </div>
      </div>

      <TicketsList />
    </div>
  );
}
