import api from './api';

export interface Message {
  id: string;
  content: string;
  ticketId: string;
  userId: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageRequest {
  content: string;
  ticketId: string;
}

export const messageService = {
  create: (data: CreateMessageRequest) => api.post('/messages', data),
  getByTicketId: (ticketId: string) => api.get(`/messages/${ticketId}`),
};
