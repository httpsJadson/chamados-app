'use client';

import { Ticket, ticketService } from '@/lib/ticket-service';
import { Message, messageService } from '@/lib/message-service';
import { useAuthStore } from '@/lib/auth-store';
import { useEffect, useState } from 'react';

const statusColors: Record<string, string> = {
  ABERTO: 'bg-blue-100 text-blue-800',
  ATRIBUIDO: 'bg-yellow-100 text-yellow-800',
  EM_PROGRESSO: 'bg-orange-100 text-orange-800',
  RESOLVIDO: 'bg-green-100 text-green-800',
  FECHADO: 'bg-gray-100 text-gray-800',
};

const priorityColors: Record<string, string> = {
  BAIXA: 'bg-green-100 text-green-800',
  MEDIA: 'bg-yellow-100 text-yellow-800',
  ALTA: 'bg-red-100 text-red-800',
  CRITICA: 'bg-red-600 text-white',
};

interface TicketDetailsProps {
  ticketId: string;
}

export default function TicketDetails({ ticketId }: TicketDetailsProps) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    loadData();
  }, [ticketId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const ticketResponse = await ticketService.getById(ticketId);
      setTicket(ticketResponse.data);
      setNewStatus(ticketResponse.data.status);
      setNewPriority(ticketResponse.data.priority);
      setNewDiagnosis(ticketResponse.data.diagnosis || '');

      const messagesResponse = await messageService.getByTicketId(ticketId);
      setMessages(messagesResponse.data);
    } catch (err: any) {
      setError('Erro ao carregar dados do chamado');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setIsSubmitting(true);
      await messageService.create({
        content: newMessage,
        ticketId,
      });
      setNewMessage('');
      await loadData();
    } catch (err: any) {
      setError('Erro ao adicionar mensagem');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async () => {
    try {
      await ticketService.updateStatus(ticketId, { status: newStatus as any });
      await loadData();
      setError('');
    } catch (err: any) {
      setError('Erro ao atualizar status');
    }
  };

  const handlePriorityChange = async () => {
    try {
      await ticketService.updatePriority(ticketId, {
        priority: newPriority as any,
      });
      await loadData();
      setError('');
    } catch (err: any) {
      setError('Erro ao atualizar prioridade');
    }
  };

  const handleDiagnosisUpdate = async () => {
    try {
      await ticketService.updateDiagnosis(ticketId, { diagnosis: newDiagnosis });
      await loadData();
      setError('');
    } catch (err: any) {
      setError('Erro ao atualizar diagnóstico');
    }
  };

  const handleAssignToMe = async () => {
    try {
      await ticketService.updateAssigned(ticketId);
      await loadData();
      setError('');
    } catch (err: any) {
      setError('Erro ao atribuir chamado');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Carregando chamado...</div>;
  }

  if (!ticket) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Chamado não encontrado
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{ticket.title}</h1>
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                statusColors[ticket.status]
              }`}
            >
              {ticket.status}
            </span>
            <span
              className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                priorityColors[ticket.priority]
              }`}
            >
              {ticket.priority}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-6">{ticket.description}</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {user?.role === 'TECH' && (
          <div className="border-t pt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <div className="flex gap-2">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="ABERTO">Aberto</option>
                  <option value="ATRIBUIDO">Atribuído</option>
                  <option value="EM_PROGRESSO">Em Progresso</option>
                  <option value="RESOLVIDO">Resolvido</option>
                  <option value="FECHADO">Fechado</option>
                </select>
                <button
                  onClick={handleStatusChange}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Atualizar
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prioridade
              </label>
              <div className="flex gap-2">
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="BAIXA">Baixa</option>
                  <option value="MEDIA">Média</option>
                  <option value="ALTA">Alta</option>
                  <option value="CRITICA">Crítica</option>
                </select>
                <button
                  onClick={handlePriorityChange}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Atualizar
                </button>
              </div>
            </div>

            {!ticket.assignedTechId && (
              <button
                onClick={handleAssignToMe}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Atribuir a mim
              </button>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Diagnóstico
              </label>
              <div className="flex gap-2">
                <textarea
                  value={newDiagnosis}
                  onChange={(e) => setNewDiagnosis(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 h-24"
                  placeholder="Descreva o diagnóstico do problema..."
                />
                <button
                  onClick={handleDiagnosisUpdate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg h-fit"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Mensagens</h2>

        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Nenhuma mensagem ainda
            </p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-gray-800">
                    {msg.user?.name || 'Usuário'}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleString('pt-BR')}
                  </span>
                </div>
                <p className="text-gray-700">{msg.content}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleAddMessage} className="space-y-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Adicionar comentário..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 h-24"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar comentário'}
          </button>
        </form>
      </div>
    </div>
  );
}
