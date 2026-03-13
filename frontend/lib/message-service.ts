import api from './api';

export interface Message {
  id: string;
  content: string;
  ticketId: string;
  createdAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'TECHNICIAN' | 'EMPLOYEE';
    perfilUrl?: string;
  };
}

export interface CreateMessageRequest {
  content: string;
  ticketId: string;
}

export const messageService = {
  create: (data: CreateMessageRequest) => api.post('/messages', data),
  getByTicketId: (ticketId: string) => api.get(`/messages/${ticketId}`),
};
