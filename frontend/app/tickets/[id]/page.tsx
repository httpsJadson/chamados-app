'use client';

import TicketDetails from '@/components/TicketDetails';
import { useAuthStore } from '@/lib/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import React from 'react';

export default function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !resolvedParams) {
    return null;
  }

  return (
    <div className="space-y-6">
      <a
        href="/tickets"
        className="text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Voltar para chamados
      </a>
      <TicketDetails ticketId={resolvedParams.id} />
    </div>
  );
}
