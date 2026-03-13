'use client';

import { Ticket, ticketService } from '@/lib/ticket-service';
import { useAuthStore } from '@/lib/auth-store';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const statusMap: Record<string, string> = {
  OPEN: 'Aberto',
  IN_PROGRESS: 'Em Progresso',
  WAITING_CUSTOMER: 'Aguardando Cliente',
  RESOLVED: 'Resolvido',
  CLOSED: 'Fechado',
};

const statusColors: Record<string, string> = {
  OPEN: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-orange-100 text-orange-800',
  WAITING_CUSTOMER: 'bg-yellow-100 text-yellow-800',
  RESOLVED: 'bg-green-100 text-green-800',
  CLOSED: 'bg-gray-100 text-gray-800',
};

const priorityMap: Record<string, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
};

const priorityColors: Record<string, string> = {
  LOW: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-red-100 text-red-800',
};

export default function TicketsList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setIsLoading(true);
      const response = await ticketService.getAll();
      setTickets(response.data);
    } catch (err: any) {
      setError('Erro ao carregar chamados');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Carregando chamados...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div id='lista' className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Chamados</h2>
        {user?.role !== 'TECHNICIAN' && (
          <Link
            href="/tickets/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            + Novo Chamado
          </Link>
        )}
      </div>

      {tickets.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Nenhum chamado encontrado
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Título
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Prioridade
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Técnico
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Criado em
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {ticket.title}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        statusColors[ticket.status] || 'bg-gray-100'
                      }`}
                    >
                      {statusMap[ticket.status] || ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        priorityColors[ticket.priority] || 'bg-gray-100'
                      }`}
                    >
                      {priorityMap[ticket.priority] || ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {ticket.assignedTo?.id ? ticket.assignedTo?.name   : 'Não atribuído'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/tickets/${ticket.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                    >
                      Ver detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
